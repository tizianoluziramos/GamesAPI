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
    gamesdb: "./gamesdatabase/gamesdb-background.png",
    portal1: "./portal1/portal1-background.jpg",
  };

  Object.values(images).forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  function setBackground(imageUrl, bgColor) {
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
      } else if (card.classList.contains("gamesdb-theme")) {
        setBackground(images.gamesdb, "#000000");
      } else if (card.classList.contains("portal1-theme")) {
        setBackground(images.portal1, "#000000");
      }
    });
  });
});
