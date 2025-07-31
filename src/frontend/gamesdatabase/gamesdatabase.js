const baseURL = "/api/tools/gamesdatabase";

function clearElement(id) {
  document.getElementById(id).innerHTML = "";
}

function renderGames(games, containerId) {
  var container = document.getElementById(containerId);
  container.innerHTML = "";
  if (!games || games.length === 0) {
    container.textContent = "No se encontraron resultados.";
    return;
  }
  games.forEach(function (game) {
    var div = document.createElement("div");
    div.className = "game";
    var desc = game.description.replace(/<[^>]*>?/gm, "").substring(0, 150) + "...";
    div.innerHTML = '<img src="' + game.image + '" alt="' + game.name + '" />' + "<div>" + "<h3>" + game.name + " (SID: " + game.sid + ")</h3>" + "<p>" + desc + "</p>" + "</div>";
    container.appendChild(div);
  });
}

document.getElementById("loadPageBtn").addEventListener("click", function () {
  var page = Number(document.getElementById("page").value);
  var pageSize = Number(document.getElementById("pageSize").value);
  clearElement("pagination-results");

  if (isNaN(page) || page < 1 || isNaN(pageSize) || pageSize < 1 || pageSize > 100) {
    document.getElementById("pagination-results").textContent = "Parámetros inválidos.";
    return;
  }

  fetch(baseURL + "?page=" + page + "&pagesize=" + pageSize)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      renderGames(data, "pagination-results");
    })
    .catch(function () {
      document.getElementById("pagination-results").textContent = "Error cargando datos.";
    });
});

document.getElementById("searchBtn").addEventListener("click", function () {
  var name = document.getElementById("searchName").value.trim();
  clearElement("search-results");

  if (!name) {
    document.getElementById("search-results").textContent = "Escribe un nombre para buscar.";
    return;
  }

  fetch(baseURL + "/search/" + encodeURIComponent(name))
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      renderGames(data, "search-results");
    })
    .catch(function () {
      document.getElementById("search-results").textContent = "Error en la búsqueda.";
    });
});

document.getElementById("totalBtn").addEventListener("click", function () {
  clearElement("total-result");
  fetch(baseURL + "/total")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      document.getElementById("total-result").textContent = "Total of games: " + data.total;
    })
    .catch(function () {
      document.getElementById("total-result").textContent = "Error obtaining total.";
    });
});

document.getElementById("sidBtn").addEventListener("click", function () {
  var sid = Number(document.getElementById("sidInput").value);
  clearElement("sid-result");

  if (isNaN(sid) || sid < 1) {
    document.getElementById("sid-result").textContent = "SID inválido.";
    return;
  }

  fetch(baseURL + "/" + sid)
    .then(function (res) {
      if (res.status === 404) {
        throw new Error("Juego no encontrado");
      }
      return res.json();
    })
    .then(function (game) {
      renderGames([game], "sid-result");
    })
    .catch(function () {
      document.getElementById("sid-result").textContent = "Error buscando juego.";
    });
});

document.getElementById("clearAllBtn").addEventListener("click", function () {
  // Limpiar resultados
  clearElement("pagination-results");
  clearElement("search-results");
  clearElement("total-result");
  clearElement("sid-result");

  // Limpiar inputs
  document.getElementById("page").value = "";
  document.getElementById("pageSize").value = "";
  document.getElementById("searchName").value = "";
  document.getElementById("sidInput").value = "";
});
