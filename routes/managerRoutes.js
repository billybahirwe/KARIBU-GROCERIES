const express = require("express");
const router = express.Router();

router.get("/managerDash", (req, res) => {
    res.render("managerDashboard");
});

module.exports = router;