const express = require("express");
const router = express.Router();

//import the user model
const User = require("../models/users");


router.get("/users", (req, res) => {
    res.render("users");
});

router.post("/users", async (req, res) => {
  console.log("Received body:", req.body);

  try {
    const { name, email, role } = req.body;

    const usersArray = name.map((_, i) => ({
      name: name[i],
      email: email[i],
      role: role[i],
    }));

    // Find existing users by email
    const existingUsers = await User.find({
      email: { $in: usersArray.map((u) => u.email) },
    }).select("email");

    const existingEmails = new Set(existingUsers.map((u) => u.email));

    // Filter out already existing ones
    const newUsers = usersArray.filter(
      (user) => !existingEmails.has(user.email)
    );

    if (newUsers.length > 0) {
      await User.insertMany(newUsers);
    }

    res.send("Submit successful");
  } catch (err) {
    console.error("Error saving users:", err);
    res.status(500).send("Failed to save users");
  }
});

  


module.exports = router;