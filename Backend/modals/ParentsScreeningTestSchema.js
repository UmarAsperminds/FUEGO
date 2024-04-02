var mongoose= require("mongoose")

var ParentScreeningQuestions = mongoose.Schema({
    Questions:{
        type:[String],
        required:true
    }
})
module.exports=mongoose.model('ParentScreeningQuestions',ParentScreeningQuestions,'ParentScreeningQuestions')