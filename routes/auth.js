function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    //req.isAuthenticated checks if the session.passport.user exists
    next();
  } else {
    res.status(401).send("You are not authorized to view this page");
  }
}

export { isAuth };
