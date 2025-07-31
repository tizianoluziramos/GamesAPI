const BASE_URL = "/api/fnaf/fnaf1";

function powerDown() {
  document.body.classList.add("power-down");

  const audio = new Audio("./powerdown.mp3");
  audio.play();

  setTimeout(() => {
    document.body.classList.remove("power-down");
  }, 5000);
}

function showPreloader() {
  document.getElementById("preloader").style.display = "flex";
}

function hidePreloader() {
  document.getElementById("preloader").style.display = "none";
}

function renderCharacter(c) {
  return `
        <div class="card">
          <div class="title">${c.name}</div>
          <div><strong>Role:</strong> ${c.role}</div>
          <div><strong>Type:</strong> ${c.type}</div>
          <p>${c.description}</p>
          <p><strong>Behavior:</strong> ${c.behavior}</p>
          <div class="subtitle">Appearance:</div>
          <ul>
            <li><strong>Color:</strong> ${c.appearance.color}</li>
            <li><strong>Eyes:</strong> ${c.appearance.eyes}</li>
            <li><strong>Height:</strong> ${c.appearance.height_cm} cm</li>
          </ul>
          ${c.voice_lines.length ? `<div class="subtitle">Voice Lines:</div><ul>${c.voice_lines.map((v) => `<li>"${v}"</li>`).join("")}</ul>` : ""}
        </div>`;
}

function renderGameInfo(g) {
  return `
        <div class="card">
          <div class="title">${g.title} (${g.release_year})</div>
          <div><strong>Developer:</strong> ${g.developer}</div>
          <div><strong>Publisher:</strong> ${g.publisher}</div>
          <div><strong>Genres:</strong> ${g.genre.join(", ")}</div>
          <div><strong>Platforms:</strong> ${g.platforms.join(", ")}</div>
          <p>${g.description}</p>
          <div><strong>Game Modes:</strong> ${g.game_modes.join(", ")}</div>
          <div class="subtitle">Difficulty:</div>
          <ul>
            <li><strong>Nights:</strong> ${g.difficulty.nights}</li>
            <li><strong>Scale:</strong> ${g.difficulty.difficulty_scale}</li>
          </ul>
          <div class="subtitle">Technical:</div>
          <ul>
            <li><strong>Engine:</strong> ${g.technical.engine}</li>
            <li><strong>Resolution:</strong> ${g.technical.original_resolution}</li>
            <li><strong>Size:</strong> ${g.technical.approx_size}</li>
            <li><strong>Frame Rate:</strong> ${g.technical.frame_rate}</li>
            <li><strong>Formats:</strong> ${g.technical.file_formats.join(", ")}</li>
          </ul>
        </div>`;
}

function renderLocation(l) {
  return `
        <div class="card">
          <div class="title">${l.name}</div>
          <p>${l.description}</p>
          <div><strong>Features:</strong></div>
          <ul>${l.features.map((f) => `<li>${f}</li>`).join("")}</ul>
        </div>`;
}

async function loadCharacters() {
  showPreloader();
  const res = await fetch(`${BASE_URL}/characters`);
  const data = await res.json();
  document.getElementById("output").innerHTML = data.map(renderCharacter).join("");
  hidePreloader();
}

async function loadGameInfo() {
  showPreloader();
  const res = await fetch(`${BASE_URL}/gameinfo`);
  const data = await res.json();
  document.getElementById("output").innerHTML = renderGameInfo(data);
  hidePreloader();
}

async function loadLocations() {
  showPreloader();
  const res = await fetch(`${BASE_URL}/locations`);
  const data = await res.json();
  document.getElementById("output").innerHTML = data.map(renderLocation).join("");
  hidePreloader();
}

async function loadAll() {
  showPreloader();
  const [charactersRes, gameInfoRes, locationsRes] = await Promise.all([fetch(`${BASE_URL}/characters`), fetch(`${BASE_URL}/gameinfo`), fetch(`${BASE_URL}/locations`)]);

  const characters = await charactersRes.json();
  const gameInfo = await gameInfoRes.json();
  const locations = await locationsRes.json();

  document.getElementById("output").innerHTML = `
        ${renderGameInfo(gameInfo)}
        <h2>Characters</h2>
        ${characters.map(renderCharacter).join("")}
        <h2>Locations</h2>
        ${locations.map(renderLocation).join("")}
      `;
  hidePreloader();
}

async function searchCharacter() {
  const name = document.getElementById("searchName").value;
  if (!name.trim()) {
    alert("Please enter a name");
    return;
  }
  showPreloader();
  const res = await fetch(`${BASE_URL}/characters/name/${encodeURIComponent(name)}`);
  const data = await res.json();
  document.getElementById("output").innerHTML = `<h2>Search Results</h2>${data.map(renderCharacter).join("")}`;
  hidePreloader();
}

document.getElementById("btnAll").addEventListener("click", loadAll);
document.getElementById("btnCharacters").addEventListener("click", loadCharacters);
document.getElementById("btnGameInfo").addEventListener("click", loadGameInfo);
document.getElementById("btnLocations").addEventListener("click", loadLocations);
document.getElementById("btnSearch").addEventListener("click", searchCharacter);

document.addEventListener("DOMContentLoaded", () => {
  loadAll();
});

const notification = document.getElementById("copy-notification");

document.getElementById("output").addEventListener("click", async (event) => {
  const el = event.target;
  if (el.classList.contains("title")) {
    try {
      await navigator.clipboard.writeText(el.textContent.trim());
      // Mostrar notificación
      notification.textContent = `Copied: "${el.textContent.trim()}"`;
      notification.classList.add("show");
      // Ocultar después de 2 segundos
      setTimeout(() => {
        notification.classList.remove("show");
      }, 2000);
    } catch (err) {
      console.error("Error while copying to clipboard:", err);
    }
  }
});

let canClick = true;
const btnPower = document.getElementById("btnPowerOff");

btnPower.addEventListener("click", () => {
  if (!canClick) return;

  canClick = false;
  btnPower.disabled = true;
  powerDown();

  setTimeout(() => {
    mostrarJumpscare();

    // Rehabilitar botón después que termine el jumpscare
    const video = document.getElementById("jumpscareVideo");
    video.onended = () => {
      ocultarJumpscare();
      canClick = true;
      btnPower.disabled = false;
    };
  }, 5000);
});

function mostrarJumpscare() {
  const jumpscare = document.getElementById("jumpscare");
  const video = document.getElementById("jumpscareVideo");

  jumpscare.style.display = "block";
  video.currentTime = 0; // Reinicia el video
  video.play();
}

function ocultarJumpscare() {
  const jumpscare = document.getElementById("jumpscare");
  const video = document.getElementById("jumpscareVideo");

  video.pause();
  jumpscare.style.display = "none";
}

function updateClock() {
  const clock = document.getElementById("game-clock");
  if (!clock) return;

  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  clock.textContent = `${hours}:${minutes} ${ampm}`;
}

setInterval(updateClock, 1000);
updateClock();

const audio = document.getElementById("ambientAudio");
const btn = document.getElementById("btnToggleSound");

btn.addEventListener("click", () => {
  if (audio.muted) {
    audio.muted = false;
    btn.textContent = "🔇 Mute";
    if (audio.paused) audio.play();
  } else {
    audio.muted = true;
    btn.textContent = "🔊 Unmute";
  }
});

async function initMicDetection() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.fftSize);
    const btnPower = document.getElementById("btnPowerOff");
    const noiseBar = document.getElementById("noise-level");

    const THRESHOLD = 0.2;
    let lastTrigger = 0;

    function checkNoise() {
      analyser.getByteTimeDomainData(dataArray);

      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        const value = (dataArray[i] - 128) / 128;
        sum += value * value;
      }
      const rms = Math.sqrt(sum / dataArray.length);

      const percentage = Math.min((rms / THRESHOLD) * 100, 100);
      if (noiseBar) noiseBar.style.width = percentage + "%";

      const now = Date.now();
      if (rms > THRESHOLD && btnPower && now - lastTrigger > 3000) {
        console.log("Ruido detectado! Ejecutando click en btnPowerOff");
        btnPower.click();
        lastTrigger = now;
      }

      requestAnimationFrame(checkNoise);
    }

    checkNoise();
  } catch (err) {
    console.warn("Micrófono no disponible o acceso denegado:", err);

    // 🔴 Ocultar la barra si no hay micrófono
    const meter = document.getElementById("noise-meter");
    if (meter) meter.style.display = "none";

    // 🔴 Ocultar el botón para que no pueda usarse
    const btnPower = document.getElementById("btnPowerOff");
    if (btnPower) btnPower.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", initMicDetection);

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("keydown", (e) => {
    switch (e.key.toLowerCase()) {
      case "r": // Reset
        document.getElementById("btnAll")?.click();
        break;
      case "c": // Characters
        document.getElementById("btnCharacters")?.click();
        break;
      case "g": // Game Info
        document.getElementById("btnGameInfo")?.click();
        break;
      case "l": // Locations
        document.getElementById("btnLocations")?.click();
        break;
      case "p": // Power off / Easter Egg
        document.getElementById("btnPowerOff")?.click();
        break;
      case "s":
        document.getElementById("btnToggleSound")?.click();
        break;
      case "f":
        document.getElementById("searchName")?.focus();
        break;
      case "enter":
        const input = document.activeElement;
        if (input?.id === "searchName") {
          document.getElementById("btnSearch")?.click();
        }
        break;
    }
  });
});

document.getElementById("btnGame").addEventListener("click", () => {
  window.location.href = "/fnaf1/fnaf1game/";
});
