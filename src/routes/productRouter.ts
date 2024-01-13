import { Router } from "express";

const router = Router();

router.get("/", (req, res) => res.send("Getting products..."));
router.get("/:id", (req, res) => res.send(`Getting product ${req.params.id}...`));
router.post("/", (req, res) => res.send("Posting new product..."));
router.put("/:id", (req, res) => res.send(`Putting product ${req.params.id}...`));
router.delete("/:id", (req, res) => res.send(`Deleting product ${req.params.id}...`));

export default router;
