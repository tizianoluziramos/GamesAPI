import { Router } from "express";
import theMovieController from "../../controllers/TheMovie.controller";

const router = Router();

router.get("/", theMovieController.getAll);
router.get("/:lang", theMovieController.getByLanguage);
router.get("/:lang/title", theMovieController.getTitle);
router.get("/:lang/duration", theMovieController.getDuration);
router.get("/:lang/directors", theMovieController.getDirectors);
router.get("/:lang/original-creator", theMovieController.getOriginalCreator);
router.get("/:lang/genres", theMovieController.getGenres);
router.get("/:lang/synopsis", theMovieController.getSynopsis);
router.get("/:lang/cast", theMovieController.getCast);
router.get("/:lang/links", theMovieController.getLinks);
router.get("/:lang/themes", theMovieController.getThemes);
router.get("/:lang/images", theMovieController.getImages);
router.get("/:lang/awards", theMovieController.getAwards);
router.get("/:lang/inspiration", theMovieController.getInspiration);
router.get("/:lang/relation", theMovieController.getRelationToGame);
router.get("/:lang/reception", theMovieController.getReception);

export default router;
