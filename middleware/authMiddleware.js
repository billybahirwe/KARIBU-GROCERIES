// middleware/authMiddleware.js

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

function ensureRole(role) {
  return function (req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.redirect("/login");
    }

    if (req.user.role !== role) {
      return res.status(403).send(`Access denied. Must be a ${role}.`);
    }

    next();
  };
}

function directorOnly(req, res, next) {
  if (
    req.isAuthenticated &&
    req.isAuthenticated() &&
    req.user.role === "director" &&
    req.user.name === "Orban"
  ) {
    return next();
  } else {
    return res.status(403).send("Access denied. Director only.");
  }
}

function branchAccessOnly(branchName) {
  return function (req, res, next) {
    if (
      req.isAuthenticated &&
      req.isAuthenticated() &&
      req.user.branch === branchName
    ) {
      return next();
    } else {
      return res.status(403).send(`Access denied. Branch ${branchName} only.`);
    }
  };
}

function attachBranchToQuery(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    req.query.branch = req.user.branch;
  }
  next();
}

module.exports = {
  authenticate,
  ensureRole,
  directorOnly,
  branchAccessOnly,
  attachBranchToQuery
};
