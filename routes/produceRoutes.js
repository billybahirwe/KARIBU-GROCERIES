const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Produce = require("../models/produce");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/img"),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

// 1. Get list of produce filtered by branch
router.get("/produce/list", async (req, res) => {
  try {
    const branch = req.user.branch;
    const produceList = await Produce.find({ branch }).lean();
    res.render("produceList", { produceList });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to retrieve produce list");
  }
});

// 2. Render produce registration form
router.get("/produce/register", (req, res) => {
  res.render("produce", { produce: {}, isEdit: false });
});

// 3. Create new produce with branch
router.post("/produce/register", upload.single("image"), async (req, res) => {
  try {
    const produceData = req.body;
    produceData.branch = req.user.branch; // Attach current user's branch

    if (req.file) {
      produceData.image = req.file.filename;
    }

    const produce = new Produce(produceData);
    await produce.save();
    res.redirect("/produce/list");
  } catch (err) {
    console.error(err);
    res.status(400).render("produce", {
      error: "Failed to save produce.",
      produce: req.body,
      isEdit: false,
    });
  }
});

// 4. Load update form (only if produce belongs to user's branch)
router.get("/produce/update/:id", async (req, res) => {
  try {
    const produce = await Produce.findOne({
      _id: req.params.id,
      branch: req.user.branch,
    }).lean();

    if (!produce) return res.status(403).send("Access denied.");

    res.render("produce", { produce, isEdit: true });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading produce for update");
  }
});

// 5. Update produce (only if from same branch)
router.post("/produce/update/:id", upload.single("image"), async (req, res) => {
  try {
    const produceData = req.body;

    if (req.file) {
      produceData.image = req.file.filename;
    }

    const result = await Produce.findOneAndUpdate(
      { _id: req.params.id, branch: req.user.branch },
      produceData
    );

    if (!result) return res.status(403).send("Update not allowed.");

    res.redirect("/produce/list");
  } catch (err) {
    console.error(err);
    res.status(400).send("Failed to update produce");
  }
});

// 6. Delete produce (only if from same branch)
router.post("/produce/delete", upload.none(), async (req, res) => {
  try {
    const result = await Produce.findOneAndDelete({
      _id: req.body.id,
      branch: req.user.branch,
    });

    if (!result) return res.status(403).send("Delete not allowed.");

    res.redirect("/produce/list");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to delete produce");
  }
});

module.exports = router;
