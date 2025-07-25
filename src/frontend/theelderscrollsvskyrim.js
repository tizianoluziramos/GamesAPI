const baseURL = "/api/theelderscrollsvskyrim";

function mostrarResultado(data) {
  const out = document.getElementById("output");
  out.textContent = JSON.stringify(data, null, 2);
}

async function fetchData(endpoint) {
  try {
    const res = await fetch(baseURL + endpoint);
    if (!res.ok) {
      throw new Error("Error en la petición: " + res.status);
    }
    const data = await res.json();
    mostrarResultado(data);
  } catch (error) {
    mostrarResultado({ error: error.message });
  }
}

// Characters
document.getElementById("btn-characters-all").addEventListener("click", () => {
  fetchData("/characters/");
});

document.getElementById("btn-characters-pageid").addEventListener("click", () => {
  const pageid = document.getElementById("input-characters-pageid").value;
  if (!pageid) return alert("Ingrese un número de página");
  fetchData("/characters/pageid/" + encodeURIComponent(pageid));
});

// Locations
document.getElementById("btn-locations-all").addEventListener("click", () => {
  fetchData("/locations/");
});
document.getElementById("btn-locations-locs").addEventListener("click", () => {
  fetchData("/locations/locations");
});
document.getElementById("btn-locations-images").addEventListener("click", () => {
  fetchData("/locations/images");
});
document.getElementById("btn-locations-links").addEventListener("click", () => {
  fetchData("/locations/externallinks");
});

// Quests
document.getElementById("btn-quests-all").addEventListener("click", () => {
  fetchData("/quests/");
});
document.getElementById("btn-quests-name").addEventListener("click", () => {
  const name = document.getElementById("input-quests-name").value.trim();
  if (!name) return alert("Ingrese un nombre");
  fetchData("/quests/name/" + encodeURIComponent(name));
});
document.getElementById("btn-quests-location").addEventListener("click", () => {
  const loc = document.getElementById("input-quests-location").value.trim();
  if (!loc) return alert("Ingrese una location");
  fetchData("/quests/location/" + encodeURIComponent(loc));
});
document.getElementById("btn-quests-hold").addEventListener("click", () => {
  const hold = document.getElementById("input-quests-hold").value.trim();
  if (!hold) return alert("Ingrese un hold");
  fetchData("/quests/hold/" + encodeURIComponent(hold));
});

// Weapons
document.getElementById("btn-weapons-all").addEventListener("click", () => {
  fetchData("/weapons/");
});
document.getElementById("btn-weapons-lang").addEventListener("click", () => {
  const lang = document.getElementById("input-weapons-lang").value.trim();
  if (!lang) return alert("Ingrese un lenguaje");
  fetchData("/weapons/" + encodeURIComponent(lang));
});
document.getElementById("btn-weapons-name").addEventListener("click", () => {
  const lang = document.getElementById("input-weapons-lang").value.trim();
  const name = document.getElementById("input-weapons-name").value.trim();
  if (!lang || !name) return alert("Ingrese lenguaje y nombre");
  fetchData("/weapons/" + encodeURIComponent(lang) + "/" + encodeURIComponent(name));
});

window.addEventListener("load", () => {
  const output = document.getElementById("output");
  const rect = output.getBoundingClientRect();

  output.style.width = rect.width + "px";
  output.style.height = rect.height + "px";

  output.style.flex = "none";
});
