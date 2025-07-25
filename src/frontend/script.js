document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("recomendar-btn");
  if (button) {
    button.addEventListener("click", getRecommendation);
  }
});

async function getRecommendation() {
  const textarea = document.getElementById("favorites");
  const resultDiv = document.getElementById("result");

  const titles = textarea.value
    .split("\n")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  if (titles.length === 0) {
    resultDiv.textContent = "Please, select at least one title.";
    return;
  }

  resultDiv.textContent = "Searching for recomendation...";

  try {
    const response = await fetch("/api/tools/gamerecommender", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ favoriteGames: titles }),
    });

    if (!response.ok) {
      const error = await response.json();
      resultDiv.textContent = `Error: ${error.error || response.statusText}`;
      return;
    }

    const data = await response.json();
    const game = data.recommendation;
    const score = data.similarityScore.toFixed(3);

    resultDiv.innerHTML = `
      <h3>🎮 Recomendation: ${game.title}</h3>
      <p><strong>Genre:</strong> ${game.genre}</p>
      <p><strong>Difficulty:</strong> ${game.difficulty}</p>
      <p><strong>Popularity:</strong> ${game.popularity}</p>
      <p><strong>Duration:</strong> ${game.duration} hours</p>
      <p><strong>Description:</strong> ${game.description}</p>
      <p><strong>Score of similarity:</strong> ${score}</p>
    `;
  } catch (err) {
    resultDiv.textContent = "500 Internal Server Error.";
    console.error(err);
  }
}
