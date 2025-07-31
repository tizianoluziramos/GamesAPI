import { Request, Response } from "express";
import Mechanics from "../repositories/mechanics.repository";

class mechanics {
    public async getAll(req: Request, res: Response) {
        try {
            const data = await Mechanics.getAll();
            res.json(data);
        } catch (err) {
            res.status(500).json({ message: "Failed to retrieve mechanics.", error: err });
        }
    }

    public async searchByName(req: Request, res: Response) {
        const { name } = req.query;

        if (typeof name !== "string") {
            return res.status(400).json({ message: "Missing or invalid 'name' query parameter." });
        }

        try {
            const result = await Mechanics.searchByName(name);
            res.json(result ?? []);
        } catch (err) {
            res.status(500).json({ message: "Error searching by name.", error: err });
        }
    }
}

export default new mechanics();
