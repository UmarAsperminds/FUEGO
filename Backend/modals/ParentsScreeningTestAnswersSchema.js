var mongoose= require("mongoose")

var ParentsScreeningTestAnswers = mongoose.Schema({
    ChildDetails:{
        type:Object
    },
    Result:{
        type:[Object],
        required:true
    }
})
module.exports=mongoose.model('ParentsScreeningTestAnswers',ParentsScreeningTestAnswers,'ParentsScreeningTestAnswers')