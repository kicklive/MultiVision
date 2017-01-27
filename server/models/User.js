var mongoose = require("mongoose");
var encrypt = require("../utilities/encryption");

var userSchema = mongoose.Schema({
  //firstName: {type: String, required: "{PATH} is required"},
  firstName: String,
  lastName: {type: String, required: "{PATH} is required"},
  username: {type: String, required: "{PATH} is required", unique: true},
  salt: {type: String, required: "{PATH} is required"},
  hashed_pwd: {type: String, required: "{PATH} is required"},
  // [] indicates array
  roles: [String]
});

userSchema.methods = {
  authenticate: function(passwordToMatch) {
    return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
  },
  hasRole: function(role) {
    return this.roles.indexOf(role) > -1;
  }
};
function createDefaultUsers() {
  var User = mongoose.model("User", userSchema);
  User.find({}).exec(function(err, collection) {
    if (collection.length === 0) {
      var salt, hash;
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, "kicklive");
      User.create({
        firstName: "Darryl",
        lastName: "Payton",
        username: "kicklive",
        salt: salt,
        hashed_pwd: hash,
        roles: ["Admin"]
      });
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, "jsmith");
      User.create({
        firstName: "Joe",
        lastName: "Smith",
        username: "jsmith",
        salt: salt,
        hashed_pwd: hash,
        roles: []
      });
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, "jbrown");
      User.create({
        firstName: "John",
        lastName: "Brown",
        username: "jbrown",
        salt: salt,
        hashed_pwd: hash
      });
    }
  });
}
exports.createDefaultUsers = createDefaultUsers;
