import { Request, Response } from "express";
import axios from "axios";

class uuid {
  public async getInfo(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      res.json({ error: "Param id is required." });
      return;
    }
    try {
      const response = await axios.get(`https://api.minetools.eu/uuid/${id}`);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Cant obtain UUID information." });
    }
  }
}

export default new uuid();
