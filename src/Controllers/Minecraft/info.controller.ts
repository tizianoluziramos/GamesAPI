import { Request, Response } from "express";
import infoRepository from "../../repositories/Minecraft/info.repository";

class info {
  public async getFile(req: Request, res: Response) {
    try {
      const { version, file } = req.params;
      const data = await infoRepository.getFile(version, file);
      res.json(data);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  }

  public async getVersions(req: Request, res: Response) {
    try {
      const versions = await infoRepository.getVersions();
      res.json(versions);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  public async getFilesOnVersion(req: Request, res: Response) {
    try {
      const { version } = req.params;
      const files = await infoRepository.getFilesOnVersion(version);
      res.json(files);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  }
}

export default new info();
