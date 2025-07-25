document.addEventListener("DOMContentLoaded", () => {
  const BASE = "/api/papersplease";
  const output = document.getElementById("output");
  const container = document.getElementById("api-sections");

  const endpoints = {
    Credits: [
      { label: "Filtered", path: "credits" },
      { label: "Creator", path: "credits/creator" },
      { label: "Copyright", path: "credits/copyright" },
      { label: "Development", path: "credits/development" },
      { label: "Fonts", path: "credits/fonts" },
      { label: "Localizations", path: "credits/localizations" },
      { label: "Sound Contributors", path: "credits/sound-contributors" },
      { label: "Sound Source", path: "credits/sound-source" },
      { label: "Special Thanks", path: "credits/special-thanks" },
      { label: "Teams", path: "credits/teams" },
      { label: "Technologies", path: "credits/technologies" },
    ],
    Countries: [
      { label: "Filtered", path: "countries" },
      { label: "By Name", path: "countries/name/:name", param: "name" },
      { label: "By City", path: "countries/city/:city", param: "city" },
    ],
    Characters: [
      { label: "Available Languages", path: "characters" },
      { label: "All Languages Data", path: "characters/all" },
      { label: "By Language", path: "characters/:lang", param: "lang" },
      { label: "By ID", path: "characters/:lang/id/:id", param: "id" },
      { label: "By Name", path: "characters/:lang/name/:name", param: "name" },
      { label: "By Nationality", path: "characters/:lang/nationality/:nationality", param: "nationality" },
      { label: "By Type", path: "characters/:lang/type/:type", param: "type" },
      { label: "By Role", path: "characters/:lang/role/:role", param: "role" },
      { label: "Random", path: "characters/:lang/random", param: "lang" },
    ],
    Assets: [
      { label: "All Assets", path: "assets" },
      { label: "In-Game Fonts", path: "assets/fonts" },
      { label: "Sound Effects", path: "assets/soundeffects" },
      { label: "Sound Effects By ID", path: "assets/soundeffects/id/:id", param: "id" },
      { label: "Sound Effects By Name", path: "assets/soundeffects/name/:name", param: "name" },
      { label: "Sound Effects By ID and Name", path: "assets/soundeffects/id/:id/name/:name", param: ["id", "name"] },
    ],
    Movies: [
      { label: "All Movies", path: "movie" },
      { label: "By Language", path: "movie/:lang", param: ["lang"] },
      { label: "Title", path: "movie/:lang/title", param: ["lang"] },
      { label: "Duration", path: "movie/:lang/duration", param: ["lang"] },
      { label: "Directors", path: "movie/:lang/directors", param: ["lang"] },
      { label: "Original Creator", path: "movie/:lang/original-creator", param: ["lang"] },
      { label: "Genres", path: "movie/:lang/genres", param: ["lang"] },
      { label: "Synopsis", path: "movie/:lang/synopsis", param: ["lang"] },
      { label: "Cast", path: "movie/:lang/cast", param: ["lang"] },
      { label: "Links", path: "movie/:lang/links", param: ["lang"] },
      { label: "Themes", path: "movie/:lang/themes", param: ["lang"] },
      { label: "Images", path: "movie/:lang/images", param: ["lang"] },
      { label: "Awards", path: "movie/:lang/awards", param: ["lang"] },
      { label: "Inspiration", path: "movie/:lang/inspiration", param: ["lang"] },
      { label: "Relation to Game", path: "movie/:lang/relation", param: ["lang"] },
      { label: "Reception", path: "movie/:lang/reception", param: ["lang"] },
    ],
    Shops: [
      { label: "All Shops", path: "shops" },
      { label: "By ID", path: "shops/id/:id", param: "id" },
      { label: "By Name", path: "shops/name/:name", param: "name" },
    ],
    Records: [
      { label: "All Records", path: "record" },
      { label: "All Records by Language", path: "record/:lang", param: "lang" },
      { label: "All Places", path: "record/:lang/place/", param: "lang" },
      { label: "By Place", path: "record/:lang/place/:place", param: ["lang", "place"] },
      { label: "By ID", path: "record/:lang/id/:id", param: ["lang", "id"] },
    ],
    "Online Stats": [
      { label: "Show Stores", path: "online_stats" },
      { label: "Show Options", path: "online_stats/:game", param: "game" },
      { label: "Steam Achievements", path: "online_stats/:game/archivements", param: "game" },
      { label: "Active Players", path: "online_stats/:game/online_players", param: "game" },
    ],
    Mechanics: [
      { label: "Available Languages", path: "mechanics" },
      { label: "Filtered", path: "mechanics/:lang", param: ["lang"] },
      { label: "All Mechanics", path: "mechanics/:lang/mecanicas", param: ["lang"] },
      { label: "Documents", path: "mechanics/:lang/documents", param: ["lang"] },
      { label: "Documents by Type", path: "mechanics/:lang/documents/type/:tipo", param: ["lang", "tipo"] },
      { label: "Documents by Camp", path: "mechanics/:lang/documents/camp/:campo", param: ["lang", "campo"] },
      { label: "Documents by Validation", path: "mechanics/:lang/documents/validation/:validacion", param: ["lang", "validacion"] },
      { label: "Rules", path: "mechanics/:lang/rules", param: ["lang"] },
      { label: "Events", path: "mechanics/:lang/events", param: ["lang"] },
      { label: "Event by ID", path: "mechanics/:lang/events/id/:id_evento", param: ["lang", "id_evento"] },
      { label: "Event by Name", path: "mechanics/:lang/events/name/:nombre", param: ["lang", "nombre"] },
      { label: "Penalties", path: "mechanics/:lang/penalties", param: ["lang"] },
      { label: "Penalties by Type", path: "mechanics/:lang/penalties/type/:tipo", param: ["lang", "tipo"] },
      { label: "Penalties by Reason", path: "mechanics/:lang/penalties/reason/:razon", param: ["lang", "razon"] },
      { label: "Player Statistics", path: "mechanics/:lang/statistics", param: ["lang"] },
      { label: "Time", path: "mechanics/:lang/time", param: ["lang"] },
    ],
    Lore: [
      { label: "All Lore", path: "lore" },
      { label: "Supported Languages", path: "lore/:lang", param: "lang" },
      { label: "HTML by Language", path: "lore/:lang/html/", param: "lang" },
      { label: "HTML by IDs", path: "lore/:lang/html/:ids", param: "ids" },
      { label: "XML by Language", path: "lore/:lang/xml/", param: "lang" },
      { label: "XML by IDs", path: "lore/:lang/xml/:ids", param: "ids" },
      { label: "Markdown by Language", path: "lore/:lang/md/", param: "lang" },
      { label: "Markdown by IDs", path: "lore/:lang/md/:ids", param: "ids" },
      { label: "JSON by Language", path: "lore/:lang/json/", param: "lang" },
      { label: "JSON by ID", path: "lore/:lang/json/:id", param: ["lang", "id"] },
      { label: "YAML by Language", path: "lore/:lang/yaml/", param: "lang" },
      { label: "YAML by IDs", path: "lore/:lang/yaml/:ids", param: "ids" },
      { label: "CSV by Language", path: "lore/:lang/csv", param: "lang" },
      { label: "CSV by IDs", path: "lore/:lang/csv/:ids", param: "ids" },
      { label: "PDF by Language", path: "lore/:lang/pdf", param: "lang" },
      { label: "PDF by IDs", path: "lore/:lang/pdf/:ids", param: "ids" },
      { label: "RDF by Language", path: "lore/:lang/rdf", param: "lang" },
      { label: "RDF by IDs", path: "lore/:lang/rdf/:ids", param: "ids" },
      { label: "TXT by Language", path: "lore/:lang/txt", param: "lang" },
      { label: "TXT by IDs", path: "lore/:lang/txt/:ids", param: "ids" },
    ],
    Endings: [
      { label: "Available Languages", path: "endings" },
      { label: "Filtered", path: "endings/:lang", param: "lang" },
      { label: "By ID", path: "endings/:lang/id/:id", param: ["lang", "id"] },
      { label: "By Title", path: "endings/:lang/title/:titulo", param: ["lang", "titulo"] },
      { label: "By Consequences", path: "endings/:lang/consecuencias/:texto", param: ["lang", "texto"] },
      { label: "By Conditions", path: "endings/:lang/conditions/:texto", param: ["lang", "texto"] },
      { label: "By Type", path: "endings/:lang/type/:tipo", param: ["lang", "tipo"] },
      { label: "By Day", path: "endings/:lang/day/:dia", param: ["lang", "dia"] },
      { label: "By EZIC", path: "endings/:lang/ezic/:ezic", param: ["lang", "ezic"] },
    ],
  };

  function createEndpointElement(route) {
    const endpointDiv = document.createElement("div");
    endpointDiv.className = "endpoint";

    // Etiqueta
    const label = document.createElement("label");
    label.textContent = route.label;
    endpointDiv.appendChild(label);

    const params = Array.isArray(route.param) ? route.param : route.param ? [route.param] : [];

    const inputs = {};

    // Crear inputs para cada param
    params.forEach((param) => {
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = param;
      input.id = `${param}-${Math.random().toString(36).slice(2)}`;
      input.style.marginRight = "10px";
      endpointDiv.appendChild(input);
      inputs[param] = input;
    });

    // Botón GET
    const button = document.createElement("button");
    button.textContent = "GET";

    button.addEventListener("click", async () => {
      let fullPath = route.path;

      for (const param of params) {
        const val = inputs[param].value.trim();
        if (!val) {
          alert(`Please insert a value for: "${param}"`);
          return;
        }
        fullPath = fullPath.replace(`:${param}`, encodeURIComponent(val));
      }

      callApi(fullPath);
    });

    endpointDiv.appendChild(button);

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
        output.textContent = JSON.stringify(data, null, 2);
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
