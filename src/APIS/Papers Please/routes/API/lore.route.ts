import { Router } from "express";
import LoreController from "../../controllers/lore.controller";

const router = Router();

router.get("/", LoreController.getAll);

router.get("/:lang", LoreController.supportedLenguages);

router.get("/:lang/html/", LoreController.getHtmlByLanguage);
router.get("/:lang/html/:ids", LoreController.getHtmlByLanguage);

router.get("/:lang/xml/", LoreController.getXmlByLanguage);
router.get("/:lang/xml/:ids", LoreController.getXmlByLanguage);

router.get("/:lang/md/", LoreController.getMarkdownByLanguage);
router.get("/:lang/md/:ids", LoreController.getMarkdownByLanguage);

router.get("/:lang/json/", LoreController.getByLanguage);
router.get("/:lang/json/:id", LoreController.getByLanguageAndIDs);

router.get("/:lang/yaml/", LoreController.getYamlByLanguage);
router.get("/:lang/yaml/:ids", LoreController.getYamlByLanguage);

router.get("/:lang/csv", LoreController.getCsvByLanguage);
router.get("/:lang/csv/:ids", LoreController.getCsvByLanguage);

router.get("/:lang/pdf", LoreController.getPdfByLanguage);
router.get("/:lang/pdf/:ids", LoreController.getPdfByLanguage);

router.get("/:lang/rdf", LoreController.getRdfByLanguage);
router.get("/:lang/rdf/:ids", LoreController.getRdfByLanguage);

router.get("/:lang/txt", LoreController.getTxtByLanguage);
router.get("/:lang/txt/:ids", LoreController.getTxtByLanguage);

export default router;
