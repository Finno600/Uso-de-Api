import express from "express";
import path from "node:path";

type Company = {
  name: string;
  founder: string;
  founded: number;
  employees: number;
  vehicles: number;
  launch_sites: number;
  valuation: number;
  summary: string;
};

type Rocket = {
  id: string;
  name: string;
  active: boolean;
  stages: number;
  boosters: number;
};

type Launch = {
  id: string;
  name: string;
  date_utc: string;
  success: boolean | null;
  upcoming: boolean;
  flight_number: number;
  rocket: string;
  details: string | null;
};

type QueryResponse<T> = {
  docs: T[];
};

type DashboardPayload = {
  company: {
    name: string;
    founded: number;
    founder: string;
    employees: number;
    valuation: string;
    summary: string;
  };
  metrics: {
    totalPastLaunches: number;
    totalUpcomingLaunches: number;
    successRate: number;
    activeRockets: number;
  };
  nextLaunch: {
    name: string;
    dateUtc: string;
    rocketName: string;
    flightNumber: number;
    details: string;
  } | null;
  yearlyLaunches: Array<{
    year: number;
    launches: number;
  }>;
  rocketUsage: Array<{
    rocketName: string;
    launches: number;
  }>;
  recentLaunches: Array<{
    id: string;
    name: string;
    dateUtc: string;
    rocketName: string;
    successLabel: string;
    details: string;
  }>;
};

const app = express();
const port = Number(process.env.PORT) || 3000;
const publicDir = path.join(__dirname, "../public");

let cachedDashboard: DashboardPayload | null = null;
let cachedAt = 0;
const cacheTtlMs = 10 * 60 * 1000;

async function fetchJson<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw new Error(`Erro ao buscar ${input}: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function buildDashboardPayload(
  company: Company,
  rockets: Rocket[],
  upcomingLaunches: Launch[],
  pastLaunches: Launch[]
): DashboardPayload {
  const rocketMap = new Map(rockets.map((rocket) => [rocket.id, rocket.name]));
  const successfulLaunches = pastLaunches.filter((launch) => launch.success === true).length;
  const successRate = pastLaunches.length ? Math.round((successfulLaunches / pastLaunches.length) * 100) : 0;

  const nextLaunch = [...upcomingLaunches]
    .sort((left, right) => new Date(left.date_utc).getTime() - new Date(right.date_utc).getTime())[0] ?? null;

  const currentYear = new Date().getUTCFullYear();
  const yearlyLaunches = Array.from({ length: 6 }, (_, index) => currentYear - 5 + index).map((year) => ({
    year,
    launches: pastLaunches.filter((launch) => new Date(launch.date_utc).getUTCFullYear() === year).length
  }));

  const rocketUsage = Array.from(
    pastLaunches.reduce((usage, launch) => {
      const rocketName = rocketMap.get(launch.rocket) ?? "Rocket desconhecido";
      usage.set(rocketName, (usage.get(rocketName) ?? 0) + 1);
      return usage;
    }, new Map<string, number>())
  )
    .sort((left, right) => right[1] - left[1])
    .slice(0, 4)
    .map(([rocketName, launches]) => ({ rocketName, launches }));

  const recentLaunches = [...pastLaunches]
    .sort((left, right) => new Date(right.date_utc).getTime() - new Date(left.date_utc).getTime())
    .slice(0, 4)
    .map((launch) => ({
      id: launch.id,
      name: launch.name,
      dateUtc: launch.date_utc,
      rocketName: rocketMap.get(launch.rocket) ?? "Rocket desconhecido",
      successLabel: launch.success ? "Sucesso" : "Falha",
      details: launch.details ?? "Sem detalhes divulgados para esta missao."
    }));

  return {
    company: {
      name: company.name,
      founded: company.founded,
      founder: company.founder,
      employees: company.employees,
      valuation: formatCurrency(company.valuation),
      summary: company.summary
    },
    metrics: {
      totalPastLaunches: pastLaunches.length,
      totalUpcomingLaunches: upcomingLaunches.length,
      successRate,
      activeRockets: rockets.filter((rocket) => rocket.active).length
    },
    nextLaunch: nextLaunch
      ? {
          name: nextLaunch.name,
          dateUtc: nextLaunch.date_utc,
          rocketName: rocketMap.get(nextLaunch.rocket) ?? "Rocket desconhecido",
          flightNumber: nextLaunch.flight_number,
          details: nextLaunch.details ?? "Missao sem descricao divulgada ate o momento."
        }
      : null,
    yearlyLaunches,
    rocketUsage,
    recentLaunches
  };
}

async function loadDashboard(): Promise<DashboardPayload> {
  const now = Date.now();

  if (cachedDashboard && now - cachedAt < cacheTtlMs) {
    return cachedDashboard;
  }

  const [company, rockets, upcomingLaunches, pastLaunchQuery] = await Promise.all([
    fetchJson<Company>("https://api.spacexdata.com/v4/company"),
    fetchJson<Rocket[]>("https://api.spacexdata.com/v4/rockets"),
    fetchJson<Launch[]>("https://api.spacexdata.com/v4/launches/upcoming"),
    fetchJson<QueryResponse<Launch>>("https://api.spacexdata.com/v4/launches/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: {
          upcoming: false
        },
        options: {
          pagination: false,
          sort: {
            date_utc: "desc"
          },
          select: ["id", "name", "date_utc", "success", "upcoming", "flight_number", "rocket", "details"]
        }
      })
    })
  ]);

  cachedDashboard = buildDashboardPayload(company, rockets, upcomingLaunches, pastLaunchQuery.docs);
  cachedAt = now;

  return cachedDashboard;
}

app.use(express.static(publicDir));

app.get("/api/dashboard", async (_request, response) => {
  try {
    const payload = await loadDashboard();
    response.json(payload);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido ao carregar dados.";
    response.status(502).json({ message });
  }
});

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.get("/{*route}", (_request, response) => {
  response.sendFile(path.join(publicDir, "index.html"));
});

app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});