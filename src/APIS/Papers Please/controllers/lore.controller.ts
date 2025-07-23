import { Request, Response } from "express";
import LoreRepository from "../repositories/lore.repository";
import { loreToXml, escapeXMLVanilla } from "../utils/XMLUtil";
import yaml from "js-yaml";
import PDFDocument from "pdfkit";

class LoreController {
  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const lore = await LoreRepository.getAll();
      res.json(lore);
    } catch (error) {
      res.status(500).json({ message: "Error fetching lore data", error });
    }
  }

  public async getByLanguage(req: Request, res: Response): Promise<void> {
    try {
      const lang = req.params.lang;

      const loreAll = await LoreRepository.getAll();
      if (!(lang in loreAll)) {
        res
          .status(400)
          .json({ message: `Invalid language parameter: ${lang}` });
        return;
      }

      const loreLang = await LoreRepository.getByLanguage(lang);
      if (!loreLang) {
        res
          .status(404)
          .json({ message: `Lore not found for language: ${lang}` });
        return;
      }
      res.json(loreLang);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching lore by language", error });
    }
  }

  public async getByLanguageAndIDs(req: Request, res: Response): Promise<void> {
    try {
      const lang = req.params.lang;
      const idsParam = req.params.id; // aquí recibimos los ids, puede ser undefined

      // Validar idioma
      const loreAll = await LoreRepository.getAll();
      if (!(lang in loreAll)) {
        res
          .status(400)
          .json({ message: `Invalid language parameter: ${lang}` });
        return;
      }

      const loreLang = await LoreRepository.getByLanguage(lang);
      if (!loreLang) {
        res
          .status(404)
          .json({ message: `Lore not found for language: ${lang}` });
        return;
      }

      let secciones = loreLang.secciones;

      if (idsParam) {
        // Parsear IDs múltiples separados por "&"
        const ids = idsParam
          .split("&")
          .map((id) => parseInt(id))
          .filter((n) => !isNaN(n));

        if (ids.length === 0) {
          res.status(400).json({ message: "No valid IDs provided." });
          return;
        }

        secciones = secciones.filter((s) => ids.includes(s.id));
        if (secciones.length === 0) {
          res
            .status(404)
            .json({ message: "No sections found for provided IDs." });
          return;
        }
        res.json(secciones);
      } else {
        // Si no pasan ids, devolvemos todo el lore en ese idioma
        res.json(loreLang);
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching lore sections", error });
    }
  }

  public async getHtmlByLanguage(req: Request, res: Response): Promise<void> {
    try {
      const lang = req.params.lang;
      const idsParam = req.params.ids; // puede ser undefined

      const loreLang = await LoreRepository.getByLanguage(lang);

      if (!loreLang) {
        res.status(404).send(`<h1>Lore not found for language: ${lang}</h1>`);
        return;
      }

      let secciones = loreLang.secciones;

      if (idsParam) {
        const ids = idsParam
          .split("&")
          .map((id) => parseInt(id))
          .filter((n) => !isNaN(n));

        if (ids.length === 0) {
          res.status(400).send(`<h1>No valid IDs provided.</h1>`);
          return;
        }

        secciones = secciones.filter((s) => ids.includes(s.id));

        if (secciones.length === 0) {
          res.status(404).send(`<h1>No sections found for provided IDs.</h1>`);
          return;
        }
      }

      let html = `
      <!DOCTYPE html>
      <html lang="${lang}">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${loreLang.titulo}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; padding: 0; background: #f9f9f9; color: #333; }
          h1 { color: #2c3e50; }
          h2 { color: #34495e; margin-top: 2em; }
          p { line-height: 1.6; }
        </style>
      </head>
      <body>
        <h1>${loreLang.titulo}</h1>
    `;

      secciones.forEach((section) => {
        html += `<section>
        <h2>${section.titulo}</h2>
        <p>${section.contenido.replace(/\n/g, "<br>")}</p>
      </section>`;
      });

      html += `
      </body>
      </html>
    `;

      res.setHeader("Content-Type", "text/html");
      res.send(html);
    } catch (error) {
      res.status(500).send(`<h1>Error generating HTML</h1><p>${error}</p>`);
    }
  }

  public async getXmlByLanguage(req: Request, res: Response): Promise<void> {
    try {
      const lang = req.params.lang as string;
      const idsParam = req.params.ids; // parámetro opcional

      const loreLang = await LoreRepository.getByLanguage(lang);
      if (!loreLang) {
        res
          .status(404)
          .json({ message: `Lore not found for language: ${lang}` });
        return;
      }

      let secciones = loreLang.secciones;

      if (idsParam) {
        const ids = idsParam
          .split("&")
          .map((id) => parseInt(id))
          .filter((n) => !isNaN(n));

        if (ids.length === 0) {
          res.status(400).json({ message: "No valid IDs provided." });
          return;
        }

        secciones = secciones.filter((s) => ids.includes(s.id));
        if (secciones.length === 0) {
          res
            .status(404)
            .json({ message: "No sections found for provided IDs." });
          return;
        }
      }

      const filteredLoreLang = { ...loreLang, secciones };

      const xml = loreToXml(lang, filteredLoreLang);
      res.setHeader("Content-Type", "application/xml");
      res.send(xml);
    } catch (error) {
      res.status(500).json({ message: "Error fetching lore XML", error });
    }
  }

  public async getMarkdownByLanguage(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const lang = req.params.lang.toLowerCase();
      const idsParam = req.params.ids;

      const loreLang = await LoreRepository.getByLanguage(lang);
      if (!loreLang) {
        res.status(404).send(`# Lore not found for language: ${lang}`);
        return;
      }

      let secciones = loreLang.secciones;

      if (idsParam) {
        const ids = idsParam
          .split("&")
          .map((id) => parseInt(id))
          .filter((n) => !isNaN(n));

        if (ids.length === 0) {
          res.status(400).send(`# No valid IDs provided.`);
          return;
        }

        secciones = secciones.filter((s) => ids.includes(s.id));
        if (secciones.length === 0) {
          res.status(404).send(`# No sections found for provided IDs.`);
          return;
        }
      }

      let markdown = `# ${loreLang.titulo}\n\n`;

      for (const section of secciones) {
        markdown += `## ${section.titulo}\n\n${section.contenido.trim()}\n\n`;
      }

      res.setHeader("Content-Type", "text/markdown");
      res.send(markdown);
    } catch (error) {
      res.status(500).send(`# Error generating markdown\n\n${String(error)}`);
    }
  }
  public async getYamlByLanguage(req: Request, res: Response): Promise<void> {
    try {
      const lang = req.params.lang.toLowerCase();
      const idsParam = req.params.ids;

      const loreLang = await LoreRepository.getByLanguage(lang);
      if (!loreLang) {
        res.status(404).send(`Lore not found for language: ${lang}`);
        return;
      }

      let secciones = loreLang.secciones;

      if (idsParam) {
        const ids = idsParam
          .split("&")
          .map((id) => parseInt(id))
          .filter((n) => !isNaN(n));

        if (ids.length === 0) {
          res.status(400).send("No valid IDs provided.");
          return;
        }

        secciones = secciones.filter((s) => ids.includes(s.id));
        if (secciones.length === 0) {
          res.status(404).send("No sections found for provided IDs.");
          return;
        }
      }

      const filteredLore = {
        ...loreLang,
        secciones,
      };

      const yamlStr = yaml.dump(filteredLore);
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.send(yamlStr);
    } catch (error) {
      res.status(500).send(`Error generating YAML: ${error}`);
    }
  }
  public async getCsvByLanguage(req: Request, res: Response): Promise<void> {
    try {
      const lang = req.params.lang.toLowerCase();
      const idsParam = req.params.ids;

      const loreLang = await LoreRepository.getByLanguage(lang);
      if (!loreLang) {
        res.status(404).send(`Lore not found for language: ${lang}`);
        return;
      }

      let secciones = loreLang.secciones;

      if (idsParam) {
        const ids = idsParam
          .split("&")
          .map((id) => parseInt(id))
          .filter((n) => !isNaN(n));

        if (ids.length === 0) {
          res.status(400).send("No valid IDs provided.");
          return;
        }

        secciones = secciones.filter((s) => ids.includes(s.id));
        if (secciones.length === 0) {
          res.status(404).send("No sections found for provided IDs.");
          return;
        }
      }

      // Construir CSV (escape básico de comillas dobles)
      let csv = `"id","titulo","contenido"\n`;
      for (const section of secciones) {
        const titulo = section.titulo.replace(/"/g, '""');
        const contenido = section.contenido
          .replace(/"/g, '""')
          .replace(/\n/g, "\\n");
        csv += `"${section.id}","${titulo}","${contenido}"\n`;
      }

      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        `inline; filename="${lang}_lore.csv"`
      );
      res.send(csv);
    } catch (error) {
      res.status(500).send(`Error generating CSV: ${String(error)}`);
    }
  }
  public async getPdfByLanguage(req: Request, res: Response): Promise<void> {
    try {
      const lang = req.params.lang;
      const idsParam = req.params.ids;
      const loreLang = await LoreRepository.getByLanguage(lang);

      if (!loreLang) {
        res.status(404).send(`Lore not found for language: ${lang}`);
        return;
      }

      let secciones = loreLang.secciones;

      if (idsParam) {
        const ids = idsParam
          .split("&")
          .map((id) => parseInt(id))
          .filter((n) => !isNaN(n));

        if (ids.length === 0) {
          res.status(400).send("No valid IDs provided.");
          return;
        }

        secciones = secciones.filter((s) => ids.includes(s.id));
        if (secciones.length === 0) {
          res.status(404).send("No sections found for provided IDs.");
          return;
        }
      }

      const doc = new PDFDocument();

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `inline; filename="${lang}_lore.pdf"`
      );

      doc.pipe(res);

      doc
        .font("Helvetica-Bold")
        .fontSize(20)
        .text(loreLang.titulo, { underline: true });
      doc.moveDown();

      for (const section of secciones) {
        doc.font("Helvetica-Bold").fontSize(16).text(section.titulo);
        doc.moveDown(0.5);
        doc.font("Helvetica").fontSize(12).text(section.contenido);
        doc.moveDown();
      }

      doc.end();
    } catch (error) {
      res.status(500).send(`Error generating PDF: ${error}`);
    }
  }
  public async getRdfByLanguage(req: Request, res: Response): Promise<void> {
    try {
      const lang = req.params.lang.toLowerCase();
      const idsParam = req.params.ids;

      const loreLang = await LoreRepository.getByLanguage(lang);
      if (!loreLang) {
        res
          .status(404)
          .send(
            `<?xml version="1.0"?>\n<!-- Lore not found for language: ${lang} -->`
          );
        return;
      }

      let secciones = loreLang.secciones;

      if (idsParam) {
        const ids = idsParam
          .split("&")
          .map((id) => parseInt(id))
          .filter((n) => !isNaN(n));
        if (ids.length === 0) {
          res
            .status(400)
            .send(`<?xml version="1.0"?>\n<!-- No valid IDs provided -->`);
          return;
        }
        secciones = secciones.filter((s) => ids.includes(s.id));
        if (secciones.length === 0) {
          res
            .status(404)
            .send(
              `<?xml version="1.0"?>\n<!-- No sections found for provided IDs -->`
            );
          return;
        }
      }

      let rdf =
        `<?xml version="1.0"?>\n` +
        `<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"\n` +
        `         xmlns:dc="http://purl.org/dc/elements/1.1/">\n`;

      // Describe the lore overall
      rdf += `  <rdf:Description rdf:about="http://example.com/lore/${lang}">\n`;
      rdf += `    <dc:title>${escapeXMLVanilla(loreLang.titulo)}</dc:title>\n`;
      rdf += `  </rdf:Description>\n`;

      // Describe each section
      secciones.forEach((section) => {
        rdf += `  <rdf:Description rdf:about="http://example.com/lore/${lang}/section/${section.id}">\n`;
        rdf += `    <dc:title>${escapeXMLVanilla(section.titulo)}</dc:title>\n`;
        rdf += `    <dc:description>${escapeXMLVanilla(
          section.contenido
        )}</dc:description>\n`;
        rdf += `  </rdf:Description>\n`;
      });

      rdf += `</rdf:RDF>`;

      res.setHeader("Content-Type", "application/rdf+xml");
      res.send(rdf);
    } catch (error) {
      res
        .status(500)
        .send(
          `<?xml version="1.0"?><error>Error generating RDF: ${error}</error>`
        );
    }
  }
  public async getTxtByLanguage(req: Request, res: Response): Promise<void> {
    try {
      const lang = req.params.lang.toLowerCase();
      const idsParam = req.params.ids;

      const loreLang = await LoreRepository.getByLanguage(lang);
      if (!loreLang) {
        res.status(404).send(`Lore not found for language: ${lang}`);
        return;
      }

      let secciones = loreLang.secciones;

      // Filtrado por IDs si se proporciona
      if (idsParam) {
        const ids = idsParam
          .split("&")
          .map((id) => parseInt(id))
          .filter((n) => !isNaN(n));

        if (ids.length === 0) {
          res.status(400).send(`No valid IDs provided.`);
          return;
        }

        secciones = secciones.filter((s) => ids.includes(s.id));
        if (secciones.length === 0) {
          res.status(404).send(`No sections found for provided IDs.`);
          return;
        }
      }

      // Generar texto plano
      let text = `${loreLang.titulo}\n\n`;

      for (const section of secciones) {
        text += `${section.titulo}\n\n${section.contenido.trim()}\n\n`;
      }

      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.send(text);
    } catch (error) {
      res.status(500).send(`Error generating TXT\n\n${String(error)}`);
    }
  }

  public async supportedLenguages(req: Request, res: Response): Promise<void> {
    res.json({
      supportedConversions: [
        "html",
        "xml",
        "md",
        "json",
        "yaml",
        "csv",
        "pdf",
        "rdf",
        "txt",
      ],
    });
  }
}

export default new LoreController();
