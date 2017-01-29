var Course=require("mongoose").model("Course"); //this is the model for courses
exports.getCourses=function(req,res,next){
Course.find({})/exec(function(err,collection){
    res.send(collection);
})

}