const API = "/api/undertale";

const nav = document.getElementById("nav");
const sections = {
  characters: document.getElementById("section-characters"),
  locations: document.getElementById("section-locations"),
  items: document.getElementById("section-items"),
  endings: document.getElementById("section-endings"),
};

// Utilidades
function clearSection(sec) {
  sec.innerHTML = "";
}
function showSection(name) {
  for (const key in sections) {
    sections[key].classList.toggle("active", key === name);
  }
  for (const btn of nav.children) {
    btn.classList.toggle("active", btn.dataset.section === name);
  }
}
function createList(arr, onClick) {
  const ul = document.createElement("ul");
  arr.forEach((obj) => {
    const li = document.createElement("li");
    li.textContent = obj.title || obj.name || obj;
    li.onclick = () => onClick(obj);
    ul.appendChild(li);
  });
  return ul;
}
function showError(sec, msg) {
  sec.innerHTML = `<div class="error">${msg}</div>`;
}

// Navegación principal
async function setupNav() {
  let routes = ["characters", "locations", "items", "endings"];
  try {
    const res = await fetch(API + "/");
    if (res.ok) {
      const data = await res.json();
      if (data.routes) routes = data.routes;
    }
  } catch {}
  nav.innerHTML = "";
  routes.forEach((route) => {
    const btn = document.createElement("button");
    btn.textContent = route.charAt(0).toUpperCase() + route.slice(1);
    btn.dataset.section = route;
    btn.onclick = () => {
      showSection(route);
      loadSection(route);
    };
    nav.appendChild(btn);
  });
  showSection(routes[0]);
  loadSection(routes[0]);
}

// Characters
async function loadSection(name) {
  if (name === "characters") {
    await loadCharacters();
  } else if (name === "locations") {
    await loadLocations();
  } else if (name === "items") {
    await loadItems();
  } else if (name === "endings") {
    await loadEndings();
  }
}

async function loadCharacters() {
  const sec = sections.characters;
  clearSection(sec);
  sec.innerHTML = `<h2>Characters</h2>
        <div class="category-btns">
          <button data-type="enemies">Enemies</button>
          <button data-type="maincharacters">Principal</button>
          <button data-type="npcs">NPCs</button>
        </div>
        <div id="char-list"></div>
        <div id="char-details"></div>
      `;
  const btns = sec.querySelectorAll(".category-btns button");
  const listDiv = sec.querySelector("#char-list");
  const detailsDiv = sec.querySelector("#char-details");
  btns.forEach((btn) => {
    btn.onclick = async () => {
      btns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      detailsDiv.innerHTML = "";
      let type = btn.dataset.type;
      let url = `${API}/characters/${type}`;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Error trying to load characters");
        const data = await res.json();
        if (type === "npcs") {
          // NPCs tiene common y shops
          listDiv.innerHTML = "<h3>Commons</h3>";
          listDiv.appendChild(createList(data.common, showChar));
          listDiv.innerHTML += "<h3>Shops</h3>";
          listDiv.appendChild(createList(data.shops, showChar));
        } else {
          listDiv.innerHTML = "";
          listDiv.appendChild(createList(data, showChar));
        }
      } catch (e) {
        showError(listDiv, e.message);
      }
    };
  });
  function showChar(char) {
    detailsDiv.innerHTML = `<div class="details">
          <b>Nombre:</b> ${char.title || char.name}<br>
          <b>PageID:</b> ${char.pageid || "-"}<br>
          <b>NS:</b> ${char.ns || "-"}
        </div>`;
  }
  btns[0].click();
}

// Locations
async function loadLocations() {
  const sec = sections.locations;
  clearSection(sec);
  sec.innerHTML = `<h2>Locations</h2>
        <div class="category-btns" id="loc-cats"></div>
        <div class="search-bar">
          <input type="text" id="loc-search" placeholder="Search by name...">
          <button id="loc-search-btn">Search</button>
        </div>
        <div id="loc-list"></div>
        <div id="loc-details"></div>
      `;
  const catsDiv = sec.querySelector("#loc-cats");
  const listDiv = sec.querySelector("#loc-list");
  const detailsDiv = sec.querySelector("#loc-details");
  const searchInput = sec.querySelector("#loc-search");
  const searchBtn = sec.querySelector("#loc-search-btn");
  // Obtener categorías
  let categories = [];
  try {
    const res = await fetch(API + "/locations");
    if (!res.ok) throw new Error("Error al cargar categorías");
    const data = await res.json();
    categories = Object.keys(data);
  } catch (e) {
    showError(listDiv, e.message);
    return;
  }
  catsDiv.innerHTML = "";
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.onclick = async () => {
      catsDiv.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      detailsDiv.innerHTML = "";
      let url = `${API}/locations/category/${encodeURIComponent(cat)}`;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Error al cargar lugares");
        const data = await res.json();
        // Hotland es especial
        if (cat === "hotland") {
          listDiv.innerHTML = "<h3>Amalgamates</h3>";
          listDiv.appendChild(createList(data.amalgamates, showLoc));
          listDiv.innerHTML += "<h3>Locations</h3>";
          listDiv.appendChild(createList(data.locations, showLoc));
        } else {
          listDiv.innerHTML = "";
          listDiv.appendChild(createList(data, showLoc));
        }
      } catch (e) {
        showError(listDiv, e.message);
      }
    };
    catsDiv.appendChild(btn);
  });
  // Buscar
  searchBtn.onclick = async () => {
    const name = searchInput.value.trim();
    if (!name) return;
    detailsDiv.innerHTML = "";
    try {
      const res = await fetch(`${API}/locations/search/${encodeURIComponent(name)}`);
      if (!res.ok) throw new Error("Error en búsqueda");
      const data = await res.json();
      listDiv.innerHTML = `<h3>Resultados para "${name}"</h3>`;
      listDiv.appendChild(createList(data, showLoc));
    } catch (e) {
      showError(listDiv, e.message);
    }
  };
  function showLoc(loc) {
    detailsDiv.innerHTML = `<div class="details">
          <b>Nombre:</b> ${loc.title}<br>
          <b>PageID:</b> ${loc.pageid}<br>
          <b>NS:</b> ${loc.ns}
        </div>`;
  }
  catsDiv.querySelector("button").click();
}

// Items
async function loadItems() {
  const sec = sections.items;
  clearSection(sec);
  sec.innerHTML = `<h2>Items</h2>
        <div class="category-btns" id="item-cats"></div>
        <div class="search-bar">
          <input type="text" id="item-search" placeholder="Search by name...">
          <button id="item-search-btn">Search</button>
        </div>
        <div id="item-list"></div>
        <div id="item-details"></div>
      `;
  const catsDiv = sec.querySelector("#item-cats");
  const listDiv = sec.querySelector("#item-list");
  const detailsDiv = sec.querySelector("#item-details");
  const searchInput = sec.querySelector("#item-search");
  const searchBtn = sec.querySelector("#item-search-btn");
  // Obtener categorías
  let categories = [];
  try {
    const res = await fetch(API + "/items");
    if (!res.ok) throw new Error("Error al cargar ítems");
    const data = await res.json();
    categories = Object.keys(data);
  } catch (e) {
    showError(listDiv, e.message);
    return;
  }
  catsDiv.innerHTML = "";
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.onclick = async () => {
      catsDiv.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      detailsDiv.innerHTML = "";
      let url = `${API}/items`;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Error al cargar ítems");
        const data = await res.json();
        listDiv.innerHTML = "";
        listDiv.appendChild(createList(data[cat], showItem));
      } catch (e) {
        showError(listDiv, e.message);
      }
    };
    catsDiv.appendChild(btn);
  });
  // Buscar
  searchBtn.onclick = async () => {
    const name = searchInput.value.trim();
    if (!name) return;
    detailsDiv.innerHTML = "";
    try {
      const res = await fetch(`${API}/items/${encodeURIComponent(name)}`);
      if (!res.ok) throw new Error("Error en búsqueda");
      const data = await res.json();
      listDiv.innerHTML = `<h3>Resultados para "${name}"</h3>`;
      for (const cat in data) {
        if (data[cat].length) {
          listDiv.innerHTML += `<h4>${cat}</h4>`;
          listDiv.appendChild(createList(data[cat], showItem));
        }
      }
    } catch (e) {
      showError(listDiv, e.message);
    }
  };
  function showItem(item) {
    detailsDiv.innerHTML = `<div class="details">
          <b>Nombre:</b> ${item.title}<br>
          <b>PageID:</b> ${item.pageid}<br>
          <b>NS:</b> ${item.ns}
        </div>`;
  }
  catsDiv.querySelector("button").click();
}

// Endings
async function loadEndings() {
  const sec = sections.endings;
  clearSection(sec);
  sec.innerHTML = `<h2>Endings</h2>
        <div class="category-btns">
          <button data-type="branches">Branches</button>
          <button data-type="neutralroutes">Neutral Routes</button>
          <button data-type="neutralendings">Neutral Endings</button>
        </div>
        <div id="ending-tree"></div>
      `;
  const btns = sec.querySelectorAll(".category-btns button");
  const treeDiv = sec.querySelector("#ending-tree");
  btns.forEach((btn) => {
    btn.onclick = async () => {
      btns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      let type = btn.dataset.type;
      let url = `${API}/endings/${type}`;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Error al cargar finales");
        const data = await res.json();
        treeDiv.innerHTML = "";
        if (type === "branches") {
          treeDiv.appendChild(renderBranch(data));
        } else if (type === "neutralroutes") {
          treeDiv.appendChild(renderNeutralRoutes(data));
        } else if (type === "neutralendings") {
          treeDiv.appendChild(renderNeutralEndings(data));
        }
      } catch (e) {
        showError(treeDiv, e.message);
      }
    };
  });
  // Recursivo para ramas
  function renderBranch(node) {
    const div = document.createElement("div");
    div.innerHTML = `<b>${node.name}</b>`;
    if (node.note) div.innerHTML += `<span class="note">(${node.note})</span>`;
    if (node.children && node.children.length) {
      const tree = document.createElement("div");
      tree.className = "tree";
      node.children.forEach((child) => tree.appendChild(renderBranch(child)));
      div.appendChild(tree);
    }
    return div;
  }
  function renderNeutralRoutes(node) {
    const div = document.createElement("div");
    div.innerHTML = `<b>${node.name}</b>`;
    if (node.children && node.children.length) {
      const tree = document.createElement("div");
      tree.className = "tree";
      node.children.forEach((child) => {
        const cdiv = document.createElement("div");
        cdiv.innerHTML = `<b>${child.name}</b>`;
        if (child.children && child.children.length) {
          const sub = document.createElement("div");
          sub.className = "tree";
          child.children.forEach((grand) => {
            const gdiv = document.createElement("div");
            gdiv.textContent = grand.name;
            if (grand.children && grand.children.length) {
              const sub2 = document.createElement("div");
              sub2.className = "tree";
              grand.children.forEach((g2) => {
                const g2div = document.createElement("div");
                g2div.textContent = g2.name;
                sub2.appendChild(g2div);
              });
              gdiv.appendChild(sub2);
            }
            sub.appendChild(gdiv);
          });
          cdiv.appendChild(sub);
        }
        tree.appendChild(cdiv);
      });
      div.appendChild(tree);
    }
    return div;
  }
  function renderNeutralEndings(node) {
    const div = document.createElement("div");
    div.innerHTML = `<b>${node.name}</b>`;
    if (node.children && node.children.length) {
      const tree = document.createElement("div");
      tree.className = "tree";
      node.children.forEach((child) => {
        const cdiv = document.createElement("div");
        cdiv.innerHTML = `<b>${child.name}</b> <span class="note">${child.condition}</span>`;
        if (child.children && child.children.length) {
          const sub = document.createElement("div");
          sub.className = "tree";
          child.children.forEach((grand) => {
            const gdiv = document.createElement("div");
            gdiv.textContent = grand.name;
            sub.appendChild(gdiv);
          });
          cdiv.appendChild(sub);
        }
        tree.appendChild(cdiv);
      });
      div.appendChild(tree);
    }
    return div;
  }
  btns[0].click();
}

setupNav();
