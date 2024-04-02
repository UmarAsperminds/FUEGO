var mongoose=require("mongoose")

var ChildAnswers = mongoose.Schema({
    Answer:{
        type:Object
    },
    ChildDetails:{
        type:Object
    },
    ParentDetails:{
        type:Object
    }
})
module.exports=mongoose.model('ChildAnswers',ChildAnswers,'ChildAnswers')