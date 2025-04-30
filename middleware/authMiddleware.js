function authenticate(allowedRoles) {
  return function (req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.redirect("/login");
    }

    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).send("Access denied: insufficient role.");
    }

    next();
  };
}

// Additional strict check for Director Orban only
function directorOnly(req, res, next) {
  if (
    req.isAuthenticated && 
    req.isAuthenticated() &&
    req.user.role === "director" &&
    req.user.name === "Orban"
  ) {
    next();
  } else {
    return res.status(403).send("Access denied. Director only.");
  }
}

module.exports = {
  authenticate,
  directorOnly,
};
