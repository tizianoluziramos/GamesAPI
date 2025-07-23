class OnlineStatsRepositories {
  public async getGlobalSteamAchievements() {
    const gameId = 239030;
    const url = `https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?gameid=${gameId}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

      const data: any = await response.json();
      return data.achievementpercentages.achievements;
    } catch (error) {
      console.error("Error obteniendo logros globales:", error);
      throw error;
    }
  }
  public async getActiveSteamPlayers() {
    const appId = 239030;
    const url = `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appId}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error al obtener datos: ${response.status}`);
      const steamData: any = await response.json();

      return steamData;
    } catch (error) {
      console.error("Error actualizando OnlineStats.json:", error);
      throw error;
    }
  }
}

export default new OnlineStatsRepositories();
