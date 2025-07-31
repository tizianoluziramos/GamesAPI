function renderReadable(data) {
  if (data === null || data === undefined) return "<i>(empty)</i>";

  if (typeof data !== "object") {
    return `<span class="value">${data}</span>`;
  }

  if (Array.isArray(data)) {
    return `<ul class="array">${data.map((item) => `<li>${renderReadable(item)}</li>`).join("")}</ul>`;
  }

  return `<div class="object">${Object.entries(data)
    .map(([key, val]) => `<div class="entry"><strong>${key}:</strong> ${renderReadable(val)}</div>`)
    .join("")}</div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const BASE = "/api/terminatorsalvation";
  const output = document.getElementById("output");
  const container = document.getElementById("api-sections");

  const endpoints = {
    Characters: [
      { label: "All", path: "characters" },
      { label: "By ID", path: "characters/id/:id", param: "id" },
      { label: "By Name", path: "characters/name/:name", param: "name" },
    ],
    Weapons: [
      { label: "All", path: "weapons" },
      { label: "Handguns", path: "weapons/handguns" },
      { label: "Launchers", path: "weapons/launchers" },
      { label: "Machine Guns", path: "weapons/machineguns" },
      { label: "Rifles", path: "weapons/rifles" },
      { label: "Shotguns", path: "weapons/shotguns" },
      { label: "Submachine Guns", path: "weapons/submachinehandguns" },
    ],
    "Game Info": [
      { label: "All", path: "gameinfo" },
      { label: "Title", path: "gameinfo/title" },
      { label: "Developer", path: "gameinfo/developer" },
      { label: "Publisher", path: "gameinfo/publisher" },
      { label: "Directors", path: "gameinfo/directors" },
      { label: "Producers", path: "gameinfo/producers" },
      { label: "Writers", path: "gameinfo/writers" },
      { label: "Composer", path: "gameinfo/composer" },
      { label: "Series", path: "gameinfo/series" },
      { label: "Game Engine", path: "gameinfo/engine" },
      { label: "Platforms", path: "gameinfo/platforms" },
      { label: "Release Dates", path: "gameinfo/releasedates" },
      { label: "Genre", path: "gameinfo/genre" },
      { label: "Game Modes", path: "gameinfo/modes" },
      { label: "Description", path: "gameinfo/description" },
      { label: "Plot Summary", path: "gameinfo/plotsummary" },
      { label: "iOS Version Summary", path: "gameinfo/iosversionsummary" },
      { label: "Development", path: "gameinfo/development" },
      { label: "General Reception", path: "gameinfo/reception" },
      { label: "Review Scores", path: "gameinfo/reception/reviewscores" },
      { label: "Aggregated Scores", path: "gameinfo/reception/aggregatedscores" },
      { label: "Game Rankings", path: "gameinfo/reception/aggregatedscores/gamerankings" },
      { label: "Metacritic", path: "gameinfo/reception/aggregatedscores/metacritic" },
      { label: "Overall Reception", path: "gameinfo/reception/generalreception" },
    ],
  };

  function createEndpointElement(route) {
    const endpointDiv = document.createElement("div");
    endpointDiv.className = "endpoint";

    // Label or input + label
    if (route.param) {
      const label = document.createElement("label");
      label.textContent = route.label;
      label.htmlFor = route.param + "-" + Math.random().toString(36).slice(2);
      endpointDiv.appendChild(label);

      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = route.param;
      input.id = label.htmlFor;
      input.style.marginRight = "10px";
      endpointDiv.appendChild(input);

      const button = document.createElement("button");
      button.textContent = "GET";
      button.addEventListener("click", async () => {
        const val = input.value.trim();
        if (!val) {
          alert(`Please insert a value for: "${route.param}"`);
          return;
        }
        callApi(route.path.replace(`:${route.param}`, encodeURIComponent(val)));
      });
      endpointDiv.appendChild(button);
    } else {
      const span = document.createElement("span");
      span.textContent = route.label;
      endpointDiv.appendChild(span);

      const button = document.createElement("button");
      button.textContent = "GET";
      button.addEventListener("click", () => {
        callApi(route.path);
      });
      endpointDiv.appendChild(button);
    }

    return endpointDiv;
  }

  function callApi(path) {
    output.textContent = `🔄 GET ${BASE}/${path}`;
    fetch(`${BASE}/${path}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        output.innerHTML = renderReadable(data);
        output.scrollIntoView({ behavior: "smooth", block: "start" });
      })
      .catch((err) => {
        output.textContent = `❌ Error: ${err.message}`;
      });
  }

  // Generar secciones con endpoint grid
  for (const [sectionName, routes] of Object.entries(endpoints)) {
    const section = document.createElement("div");
    section.className = "section";

    const title = document.createElement("h2");
    title.textContent = sectionName;
    section.appendChild(title);

    const endpointGrid = document.createElement("div");
    endpointGrid.className = "endpoint-grid";

    routes.forEach((route) => {
      const endpointElem = createEndpointElement(route);
      endpointGrid.appendChild(endpointElem);
    });

    section.appendChild(endpointGrid);
    container.appendChild(section);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("backgroundmusic");
  const muteBtn = document.getElementById("muteBtn");

  muteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;

    muteBtn.textContent = audio.muted ? "🔇 Unmute" : "🔊 Mute";
  });
});
