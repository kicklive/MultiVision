var mongoose = require("mongoose");
var courseSchema = mongoose.Schema({
  title: { type: String, required: "{PATH} is required" },
  featured: { type: Boolean, required: "{PATH} is required" },
  published: { type: Date, required: "{PATH} is required" },
  tags: [ String ]
});

 var Course = mongoose.model("Course", courseSchema);
function createDefaultCourses() {
  
  Course.find({}).exec(function(err, collection) {
     
    if (collection.length === 0) {
         console.log("dd");
      Course.create({
        title: "C# for Sociopaths",
        featured: true,
        published: new Date('10/5/2013'),
        tags: [ "C#" ]
      });
     
    }
  });
}
exports.createDefaultCourses = createDefaultCourses;
