// Defino un objeto con las rutas y etiquetas para futuras ampliaciones
const apiEndpoints = {
  gameinfo: {
    label: "Game Info",
    url: "/api/portal/gameinfo",
  },
  // Ejemplo: en el futuro podrías agregar:
  // characters: { label: 'Characters', url: 'http://localhost:3000/api/portal/characters' },
  // weapons: { label: 'Weapons', url: 'http://localhost:3000/api/portal/weapons' },
};

const nav = document.getElementById("api-buttons");
const content = document.getElementById("content");

// Función para crear botones de navegación desde apiEndpoints
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
  // Activar el primero por defecto
  const firstBtn = nav.querySelector("button");
  if (firstBtn) {
    firstBtn.classList.add("active");
    fetchAndRender(firstBtn.dataset.endpoint);
  }
}

// Maneja clase active en botones
function setActiveButton(button) {
  nav.querySelectorAll("button").forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");
}

// Función para obtener datos de la API
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
  } else {
    // Render predeterminado para futuros endpoints
    content.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  }
}

renderNavButtons();
