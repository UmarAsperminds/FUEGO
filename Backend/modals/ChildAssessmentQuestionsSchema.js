var mongoose=require("mongoose")

var ChildAssessmentQuestions=mongoose.Schema({
    QuestionSet:{
        type:Object
    }
})
module.exports = mongoose.model('ChildAssessmentQuestions',ChildAssessmentQuestions,'ChildAssessmentQuestions')
