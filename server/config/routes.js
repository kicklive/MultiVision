var auth = require("./auth");
var mongoose = require("mongoose");
//var User = mongoose.model("User");
//var Course = mongoose.model("Course");
var users = require("../controllers/users");
var courses = require("../controllers/courses");
module.exports = function(app) {
  app.get("/api/users", auth.requiresRole("Admin"), users.getUsers);
  app.post("/api/users", users.createUser);
  app.put("/api/users", users.updateUser);
  app.get("/api/courses", courses.getCourses);
  app.get("/partials/*", function(req, res) {
    res.render("../../public/app/" + req.params[0]);
  });

  // goes to auth.js authenticate
  app.post("/login", auth.authenticate);

  app.post("/logout", function(req, res) {
    req.logout();
    res.end();
  });

  app.all("/api/*", function(req, res) {
    //Anything in the api folder when there is no server object associated, respone with 404
    res.send(404);
  });

  app.get("*", function(req, res) {
    res.render("index", { bootstrappedUser: req.user });
  });
};
