import { Request, Response } from "express";
import axios from "axios";

class serverstatus {
  public async getServerStatus(req: Request, res: Response) {
    const ip = req.params.ip as string;
    const port = req.params.port as string | undefined;

    if (!ip) {
      res.status(400).json({ error: "Server IP is required." });
      return;
    }

    let url = `https://mcapi.us/server/status?ip=${encodeURIComponent(ip)}`;
    if (port) {
      url += `&port=${encodeURIComponent(port)}`;
    }

    try {
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error: any) {
      res.status(500).json({ error: ("Error: " + error) as string });
    }
  }
}

export default new serverstatus();
