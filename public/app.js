const metricsGrid = document.querySelector("#metrics-grid");
const nextLaunchPanel = document.querySelector("#next-launch-panel");
const yearlyChart = document.querySelector("#yearly-chart");
const companyCard = document.querySelector("#company-card");
const rocketUsage = document.querySelector("#rocket-usage");
const recentLaunches = document.querySelector("#recent-launches");
const statusMessage = document.querySelector("#status-message");

function formatNumber(value) {
  return new Intl.NumberFormat("pt-BR").format(value);
}

function formatDate(value) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC"
  }).format(new Date(value));
}

function buildCountdown(dateUtc) {
  const difference = new Date(dateUtc).getTime() - Date.now();

  if (difference <= 0) {
    return "Em preparacao final";
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

  return `${days}d ${hours}h restantes`;
}

function renderMetrics(metrics) {
  const items = [
    { label: "Lancamentos concluidos", value: formatNumber(metrics.totalPastLaunches) },
    { label: "Lancamentos futuros", value: formatNumber(metrics.totalUpcomingLaunches) },
    { label: "Taxa de sucesso", value: `${metrics.successRate}%` },
    { label: "Foguetes ativos", value: formatNumber(metrics.activeRockets) }
  ];

  metricsGrid.innerHTML = items
    .map(
      (item) => `
        <article class="metric-card">
          <p>${item.label}</p>
          <strong>${item.value}</strong>
        </article>
      `
    )
    .join("");
}

function renderNextLaunch(nextLaunch) {
  if (!nextLaunch) {
    nextLaunchPanel.innerHTML = `
      <p class="panel-label">Proximo lancamento</p>
      <h2>Nenhuma missao confirmada</h2>
      <p class="hero-text">A API nao retornou eventos futuros no momento da consulta.</p>
    `;
    return;
  }

  nextLaunchPanel.innerHTML = `
    <p class="panel-label">Proximo lancamento</p>
    <h2>${nextLaunch.name}</h2>
    <p class="countdown-chip">${buildCountdown(nextLaunch.dateUtc)}</p>
    <dl class="launch-meta">
      <div>
        <dt>Data UTC</dt>
        <dd>${formatDate(nextLaunch.dateUtc)}</dd>
      </div>
      <div>
        <dt>Foguete</dt>
        <dd>${nextLaunch.rocketName}</dd>
      </div>
      <div>
        <dt>Flight #</dt>
        <dd>${nextLaunch.flightNumber}</dd>
      </div>
    </dl>
    <p class="hero-text">${nextLaunch.details}</p>
  `;
}

function renderYearlyChart(yearlyLaunches) {
  const maxLaunches = Math.max(...yearlyLaunches.map((item) => item.launches), 1);

  yearlyChart.innerHTML = yearlyLaunches
    .map(
      (item) => `
        <div class="bar-group">
          <span class="bar-value">${item.launches}</span>
          <div class="bar-track">
            <div class="bar-fill" style="height:${Math.max((item.launches / maxLaunches) * 100, 8)}%"></div>
          </div>
          <span class="bar-label">${item.year}</span>
        </div>
      `
    )
    .join("");
}

function renderCompany(company, metrics) {
  companyCard.innerHTML = `
    <article class="company-card">
      <div class="company-ring" style="--success-rate:${metrics.successRate};">
        <span>${metrics.successRate}%</span>
        <small>sucesso</small>
      </div>
      <div class="company-copy">
        <h3>${company.name}</h3>
        <p>${company.summary}</p>
        <dl>
          <div>
            <dt>Fundacao</dt>
            <dd>${company.founded}</dd>
          </div>
          <div>
            <dt>Fundador</dt>
            <dd>${company.founder}</dd>
          </div>
          <div>
            <dt>Funcionarios</dt>
            <dd>${formatNumber(company.employees)}</dd>
          </div>
          <div>
            <dt>Valuation</dt>
            <dd>${company.valuation}</dd>
          </div>
        </dl>
      </div>
    </article>
  `;
}

function renderRocketUsage(items) {
  const peak = Math.max(...items.map((item) => item.launches), 1);

  rocketUsage.innerHTML = items
    .map(
      (item) => `
        <article class="usage-row">
          <div>
            <p>${item.rocketName}</p>
            <span>${item.launches} missoes</span>
          </div>
          <div class="usage-track">
            <div class="usage-fill" style="width:${(item.launches / peak) * 100}%"></div>
          </div>
        </article>
      `
    )
    .join("");
}

function renderRecentLaunches(items) {
  recentLaunches.innerHTML = items
    .map(
      (item) => `
        <article class="mission-card">
          <div class="mission-topline">
            <p>${item.name}</p>
            <span class="mission-badge ${item.successLabel === "Sucesso" ? "success" : "failure"}">${item.successLabel}</span>
          </div>
          <strong>${item.rocketName}</strong>
          <time>${formatDate(item.dateUtc)}</time>
          <p>${item.details}</p>
        </article>
      `
    )
    .join("");
}

async function loadDashboard() {
  try {
    const response = await fetch("/api/dashboard");

    if (!response.ok) {
      throw new Error("Nao foi possivel carregar o dashboard.");
    }

    const payload = await response.json();

    renderMetrics(payload.metrics);
    renderNextLaunch(payload.nextLaunch);
    renderYearlyChart(payload.yearlyLaunches);
    renderCompany(payload.company, payload.metrics);
    renderRocketUsage(payload.rocketUsage);
    renderRecentLaunches(payload.recentLaunches);
  } catch (error) {
    statusMessage.hidden = false;
    statusMessage.textContent = error instanceof Error ? error.message : "Erro inesperado ao buscar dados.";
  }
}

loadDashboard();