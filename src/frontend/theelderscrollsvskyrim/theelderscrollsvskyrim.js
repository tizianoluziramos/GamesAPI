const baseURL = "/api/theelderscrollsvskyrim";

function showResult(data) {
  const out = document.getElementById("output");
  out.textContent = JSON.stringify(data, null, 2);
}

async function fetchData(endpoint) {
  try {
    const res = await fetch(baseURL + endpoint);
    if (!res.ok) {
      throw new Error("Request error: " + res.status);
    }
    const data = await res.json();
    showResult(data);
  } catch (error) {
    showResult({ error: error.message });
  }
}

// Characters
document.getElementById("btn-characters-all").addEventListener("click", () => {
  fetchData("/characters/");
});

document.getElementById("btn-characters-pageid").addEventListener("click", () => {
  const pageid = document.getElementById("input-characters-pageid").value;
  if (!pageid) return alert("Enter a page number");
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
  if (!name) return alert("Enter a name");
  fetchData("/quests/name/" + encodeURIComponent(name));
});
document.getElementById("btn-quests-location").addEventListener("click", () => {
  const loc = document.getElementById("input-quests-location").value.trim();
  if (!loc) return alert("Enter a location");
  fetchData("/quests/location/" + encodeURIComponent(loc));
});
document.getElementById("btn-quests-hold").addEventListener("click", () => {
  const hold = document.getElementById("input-quests-hold").value.trim();
  if (!hold) return alert("Enter a hold");
  fetchData("/quests/hold/" + encodeURIComponent(hold));
});

// Weapons
document.getElementById("btn-weapons-all").addEventListener("click", () => {
  fetchData("/weapons/");
});
document.getElementById("btn-weapons-lang").addEventListener("click", () => {
  const lang = document.getElementById("input-weapons-lang").value.trim();
  if (!lang) return alert("Enter a language");
  fetchData("/weapons/" + encodeURIComponent(lang));
});
document.getElementById("btn-weapons-name").addEventListener("click", () => {
  const lang = document.getElementById("input-weapons-lang").value.trim();
  const name = document.getElementById("input-weapons-name").value.trim();
  if (!lang || !name) return alert("Enter language and name");
  fetchData("/weapons/" + encodeURIComponent(lang) + "/" + encodeURIComponent(name));
});

document.getElementById("btn-books-all").addEventListener("click", () => {
  fetchData("/books/");
});

document.getElementById("btn-books-title").addEventListener("click", () => {
  const title = document.getElementById("input-books-title").value.trim();
  if (!title) return alert("Enter a valid title.");
  fetchData("/books/title/" + encodeURIComponent(title));
});

document.getElementById("btn-books-author").addEventListener("click", () => {
  const author = document.getElementById("input-books-author").value.trim();
  if (!author) return alert("Insert a valid author.");
  fetchData("/books/author/" + encodeURIComponent(author));
});

document.getElementById("btn-spells-all").addEventListener("click", () => {
  fetchData("/spells/");
});

document.getElementById("btn-spells-name").addEventListener("click", () => {
  const name = document.getElementById("input-spells-name").value.trim();
  if (!name) return alert("Insert a valid name.");
  fetchData("/spells/name/" + encodeURIComponent(name));
});

document.getElementById("btn-spells-school").addEventListener("click", () => {
  const school = document.getElementById("input-spells-school").value.trim();
  if (!school) return alert("Insert a valid school.");
  fetchData("/spells/school/" + encodeURIComponent(school));
});

window.addEventListener("load", () => {
  const output = document.getElementById("output");
  const rect = output.getBoundingClientRect();

  output.style.width = rect.width + "px";
  output.style.height = rect.height + "px";

  output.style.flex = "none";
});
