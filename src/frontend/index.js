document.addEventListener("DOMContentLoaded", () => {
  const bg1 = document.getElementById("bg1");
  const bg2 = document.getElementById("bg2");
  let showingBg1 = true;

  const images = {
    minecraft: "./minecraft/minecraft-background.png",
    fnaf1: "./fnaf1/fnaf1-background.webp",
    papersplease: "./papersplease/papersplease-background.webp",
    skyrim: "./theelderscrollsvskyrim/theelderscrollsvskyrim-background.jpg",
    terminator: "./terminatorsalvation/terminatorsalvation-background.jpg",
    portal1: "./portal1/portal1-background.jpg",
    undertale: "./undertale/undertale-background.jpg",
    default: "./background.jpg",
  };

  // ===== PRELOAD IMÁGENES Y CALCULAR PORCENTAJE =====
  const imgTags = document.querySelectorAll("img");
  const allSources = [...Object.values(images)]; // fondos + imgs reales
  imgTags.forEach((img) => allSources.push(img.src));

  let loaded = 0;
  const total = allSources.length;
  const progress = document.getElementById("progress");

  allSources.forEach((src) => {
    const img = new Image();
    img.onload = img.onerror = () => {
      loaded++;
      updateProgress();
    };
    img.src = src;
  });

  function updateProgress() {
    const percent = Math.round((loaded / total) * 100);
    progress.innerText = percent + "%";
    if (percent >= 100) finishLoading();
  }

  function finishLoading() {
    setTimeout(() => {
      document.getElementById("preloader").style.opacity = "0";
      setTimeout(() => (document.getElementById("preloader").style.display = "none"), 300);
    }, 300);
  }

  Object.values(images).forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  function setDefaultBackground() {
    const frontBg = showingBg1 ? bg2 : bg1;
    const backBg = showingBg1 ? bg1 : bg2;

    frontBg.style.backgroundImage = "";
    frontBg.style.background = "linear-gradient(135deg, #0f2027, #203a43, #2c5364)";
    document.body.style.backgroundColor = "";

    frontBg.classList.add("visible");
    backBg.classList.remove("visible");

    showingBg1 = !showingBg1;
  }

  function setBackground(imageUrl, bgColor, setdefault = false) {
    if (setdefault === true) {
      setDefaultBackground();
      return;
    }
    const frontBg = showingBg1 ? bg2 : bg1;
    const backBg = showingBg1 ? bg1 : bg2;

    frontBg.style.backgroundImage = `url('${imageUrl}')`;
    document.body.style.backgroundColor = bgColor;

    frontBg.classList.add("visible");
    backBg.classList.remove("visible");

    showingBg1 = !showingBg1;
  }

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (card.classList.contains("minecraft-theme")) {
        setBackground(images.minecraft, "#003300");
      } else if (card.classList.contains("fnaf1-theme")) {
        setBackground(images.fnaf1, "#330000");
      } else if (card.classList.contains("papersplease-theme")) {
        setBackground(images.papersplease, "#000000");
      } else if (card.classList.contains("skyrim-theme")) {
        setBackground(images.skyrim, "#000000");
      } else if (card.classList.contains("terminator-theme")) {
        setBackground(images.terminator, "#000000");
      } else if (card.classList.contains("portal1-theme")) {
        setBackground(images.portal1, "#000000");
      } else if (card.classList.contains("undertale-theme")) {
        setBackground(images.undertale, "#000000");
      }
      card.addEventListener("mouseleave", () => {
        setBackground(images.default, "#0a0a0a");
      });
    });
  });
});

const searchInput = document.getElementById("search-input");
const cards = document.querySelectorAll(".card");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  cards.forEach((card) => {
    const title = card.querySelector("h2").textContent.toLowerCase();
    const description = card.querySelector("p").textContent.toLowerCase();

    if (title.includes(query) || description.includes(query)) {
      card.parentElement.style.display = "block"; // el padre es el <a> que envuelve la card
    } else {
      card.parentElement.style.display = "none";
    }
  });
});

window.addEventListener("load", () => {
  document.getElementById("preloader").style.display = "none";
});
