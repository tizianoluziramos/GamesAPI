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

  resultDiv.textContent = "Searching for recommendation...";

  try {
    const query = titles.map((t) => `favoriteGames=${encodeURIComponent(t)}`).join("&");

    const response = await fetch(`/api/tools/gamerecommender?${query}`, {
      method: "GET",
    });

    if (!response.ok) {
      const text = await response.text();
      try {
        const error = JSON.parse(text);
        resultDiv.textContent = `Error: ${error.error || response.statusText}`;
      } catch {
        resultDiv.textContent = `Server error: ${response.status} ${response.statusText}`;
      }
      return;
    }

    const data = await response.json();
    console.log("API response:", data);

    const game = data.recommendation;
    const score = data.diagnostics?.finalScore !== undefined ? data.diagnostics.finalScore.toFixed(3) : "N/A";

    resultDiv.innerHTML = `
      <h3>🎮 Recommendation: ${game.title}</h3>
      <p><strong>Genre:</strong> ${game.genre}</p>
      <p><strong>Difficulty:</strong> ${game.difficulty}</p>
      <p><strong>Popularity:</strong> ${game.popularity}</p>
      <p><strong>Duration:</strong> ${game.duration} hours</p>
      <p><strong>Description:</strong> ${game.description}</p>
      <p><strong>Score of similarity:</strong> ${score}</p>
    `;
  } catch (err) {
    resultDiv.textContent = "Unexpected client-side error.";
    console.error(err);
  }
}
