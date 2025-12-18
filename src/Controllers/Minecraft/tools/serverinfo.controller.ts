import { Request, Response } from "express";
import { status } from "minecraft-server-util";

class serverinfo {
  async getServerInfo(req: Request, res: Response) {
    const ip = req.params.ip;
    const port = req.params.port ? parseInt(req.params.port) : 25565;

    if (!ip) {
      res.status(400).json({ error: "Server IP is required." });
      return;
    }

    try {
      const start = Date.now();

      const data = await status(ip, port, { timeout: 3000 });

      const latency = Date.now() - start;

      res.json({
        status: "success",
        online: true,
        motd: "",
        motd_json:
          typeof data.motd?.clean === "string"
            ? data.motd.clean
            : data.motd?.clean ?? "",
        favicon: data.favicon ?? null,
        error: null,
        players: {
          max: data.players?.max ?? 0,
          now: data.players?.online ?? 0,
          sample: data.players?.sample ?? [],
        },
        server: {
          name: data.version?.name ?? "unknown",
          protocol: data.version?.protocol ?? 0,
        },
        last_updated: Math.floor(Date.now() / 1000).toString(),
        duration: latency.toString(),
      });
    } catch (err: any) {
      let errorMsg = "Server offline";
      if (err?.message?.includes("ETIMEDOUT")) errorMsg = "timeout";

      res.json({
        status: "error",
        online: false,
        error: errorMsg,
      });
    }
  }
}

export default new serverinfo();
