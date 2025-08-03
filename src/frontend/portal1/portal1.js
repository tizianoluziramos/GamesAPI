const apiEndpoints = {
  gameinfo: {
    label: "Game Info",
    url: "/api/portal/gameinfo",
  },
  blocks: {
    label: "In game blocks",
    url: "/api/portal/blocks",
  },
  characters: {
    label: "Characters",
    url: "/api/portal/characters",
  },
  items: {
    label: "Items",
    url: "/api/portal/items",
  },
  mechanics: {
    label: "Mechanics",
    url: "/api/portal/mechanics",
  },
  testchambers: {
    label: "Test chambers",
    url: "/api/portal/testchambers",
  },
  walkthrough: {
    label: "Walkthroughs",
    url: "/api/portal/walkthrough",
  },
};

const nav = document.getElementById("api-buttons");
const content = document.getElementById("content");

function formatChamberName(key) {
  return key.replace("chamber", "Chamber ");
}

function formatCategoryName(key) {
  const names = {
    main: "Main Chambers",
    advanced: "Advanced Chambers",
    challenge: "Challenge Chambers",
    stillAliveBonus: "Still Alive Bonus Chambers",
  };
  return names[key] || key;
}

function renderValue(val) {
  if (Array.isArray(val)) {
    return `<ul>${val.map((v) => `<li>${v}</li>`).join("")}</ul>`;
  }
  if (typeof val === "object" && val !== null) {
    return `<ul>${Object.entries(val)
      .map(([k, v]) => `<li><strong>${k}:</strong> ${renderValue(v)}</li>`)
      .join("")}</ul>`;
  }
  return typeof val === "boolean" ? (val ? "Yes" : "No") : val;
}

function renderNavButtons() {
  Object.entries(apiEndpoints).forEach(([key, { label }]) => {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.dataset.endpoint = key;
    btn.addEventListener("click", () => {
      setActiveButton(btn);
      fetchAndRender(key);
    });
    nav.appendChild(btn);
  });
  const firstBtn = nav.querySelector("button");
  if (firstBtn) {
    firstBtn.classList.add("active");
    fetchAndRender(firstBtn.dataset.endpoint);
  }
}

function setActiveButton(button) {
  nav.querySelectorAll("button").forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");
}

async function fetchAndRender(endpointKey) {
  content.innerHTML = "<p>Cargando información...</p>";
  try {
    const res = await fetch(apiEndpoints[endpointKey].url);
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    const data = await res.json();
    renderContent(endpointKey, data);
  } catch (e) {
    content.innerHTML = `<p style="color: #ff4c4c;">Error al cargar datos: ${e.message}</p>`;
  }
}

// Renderiza la info según el endpoint (de momento solo gameinfo)
function renderContent(endpointKey, data) {
  if (endpointKey === "gameinfo") {
    content.innerHTML = `
        <h2>${data.title}</h2>
        <div class="section"><strong>Developer:</strong> ${data.developer}</div>
        <div class="section"><strong>Publisher:</strong> ${data.publisher}</div>
        <div class="section"><strong>Release Dates:</strong>
          <ul>
            <li>Worldwide: ${data.release_date.worldwide}</li>
            ${Object.entries(data.release_date.regions)
              .map(([region, date]) => `<li>${region}: ${date}</li>`)
              .join("")}
          </ul>
        </div>
        <div class="section"><strong>Platforms:</strong>
          <ul>${data.platforms.map((p) => `<li>${p}</li>`).join("")}</ul>
        </div>
        <div class="section"><strong>Modes:</strong> ${data.modes.join(", ")}</div>
        <div class="section"><strong>Genre:</strong> ${data.genre.join(", ")}</div>
        <div class="section description"><strong>Description:</strong> ${data.description}</div>
        <div class="section"><strong>Engine:</strong> ${data.engine}</div>
        <div class="section"><strong>Series:</strong> ${data.series}</div>
        <div class="section"><strong>Languages:</strong>
          <ul>${data.languages.map((l) => `<li>${l}</li>`).join("")}</ul>
        </div>
      `;
  } else if (endpointKey === "blocks") {
    content.innerHTML = `
      <h2>In-Game Blocks</h2>
      <div class="blocks-list">
        ${data
          .map(
            (block) => `
          <div class="block-card">
            <h3>${block.name}</h3>
            <div class="section description">${block.description}</div>
            <div class="section"><strong>Interactable:</strong> ${block.interactable ? "Yes" : "No"}</div>
            <div class="section"><strong>Portal Surface:</strong> ${block.portalSurface ? "Yes" : "No"}</div>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  } else if (endpointKey === "characters") {
    content.innerHTML = `
      <h2>Characters</h2>
      <div class="characters-list">
        ${data
          .map(
            (char) => `
          <div class="character-card">
            <h3>${char.name}</h3>
            <div class="section"><strong>Role:</strong> ${char.role}</div>
            <div class="section description">${char.description}</div>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  } else if (endpointKey === "items") {
    content.innerHTML = `
      <h2>Items</h2>
      <div class="items-list">
        ${data
          .map(
            (item) => `
          <div class="item-card">
            <h3>${item.name}</h3>
            <div class="section description">${item.description}</div>
            <div class="section"><strong>Interactable:</strong> ${item.interactable ? "Yes" : "No"}</div>
            <div class="section"><strong>Portable:</strong> ${item.portable ? "Yes" : "No"}</div>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  } else if (endpointKey === "mechanics") {
    content.innerHTML = `
      <h2>Game Mechanics</h2>
      <div class="mechanics-list">
        ${data
          .map(
            (mech) => `
          <div class="mechanic-card">
            <h3>${mech.name}</h3>
            <div class="section description">${mech.description}</div>
            ${Object.entries(mech)
              .filter(([key]) => key !== "name" && key !== "description")
              .map(
                ([key, value]) => `
                <div class="section">
                  <strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                  ${renderValue(value)}
                </div>
              `
              )
              .join("")}
          </div>
        `
          )
          .join("")}
      </div>
    `;
  } else if (endpointKey === "testchambers") {
    content.innerHTML = `
      <h2>Test Chambers</h2>
      <div class="testchambers-list">
        ${Object.entries(data)
          .map(
            ([category, chambers]) => `
            <div class="testchamber-category">
              <h3>${formatCategoryName(category)}</h3>
              <ul>
                ${chambers.map((chamber) => `<li>${chamber}</li>`).join("")}
              </ul>
            </div>
          `
          )
          .join("")}
      </div>
    `;
  } else if (endpointKey === "walkthrough") {
    content.innerHTML = `
      <h2>Walkthrough</h2>
      <div class="walkthrough">
        <div class="section">
          <strong>Complete Walkthrough:</strong>
          <a href="${data.complete}" target="_blank">${data.complete}</a>
        </div>
        <h3>Chamber Guides</h3>
        <ul class="walkthrough-links">
          ${Object.entries(data.links)
            .map(
              ([chamber, obj]) => `
              <li><strong>${formatChamberName(chamber)}:</strong> 
                <a href="${obj.url}" target="_blank">${obj.url}</a>
              </li>
            `
            )
            .join("")}
        </ul>
      </div>
    `;
  } else {
    content.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  }
}

renderNavButtons();
