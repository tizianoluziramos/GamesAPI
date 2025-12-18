import { Request, Response } from "express";
import axios from "axios";

class player {
  public async getInfo(req: Request, res: Response): Promise<void> {
    let { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Param 'id' is required." });
      return;
    }

    try {
      const isUuid = (str: string) => /^[0-9a-f]{32}$|^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

      if (!isUuid(id)) {
        const profileResp = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${id}`);
        if (!profileResp.data || !profileResp.data.id) {
          res.status(404).json({ error: "Player not found" });
          return;
        }
        id = profileResp.data.id;
      }

      const sessionResp = await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${id}`);
      res.json(sessionResp.data);

    } catch (err: any) {
      if (err.response?.status === 204 || err.response?.status === 404) {
        res.status(404).json({ error: "Player not found" });
      } else {
        res.status(500).json({ error: "Cannot obtain UUID information" });
      }
    }
  }
}

export default new player();
