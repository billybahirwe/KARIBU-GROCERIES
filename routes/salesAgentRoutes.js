const express = require("express");
const router = express.Router();

router.get("/salesAgentDash", (req, res) => {
    res.render("salesAgentDashboard");
});

module.exports = router;