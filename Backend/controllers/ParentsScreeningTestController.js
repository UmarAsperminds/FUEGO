var ParentScreeningTest = require('../modals/ParentsScreeningTestSchema')
var ParentsScreeningTestAnswers = require('../modals/ParentsScreeningTestAnswersSchema')

exports.FetchParentScreeningQuestions = async(req, res) =>{
    try{
        var data = req.body;
        var ParentScreeningTestList = await ParentScreeningTest.find({});
        var ParentsScreeningTestAnswersList = await ParentsScreeningTestAnswers.find({ "ChildDetails.ChildID":data.ChildDetails.ChildID });
        var NextStep = 0;
        if(ParentsScreeningTestAnswersList.length){
            NextStep = ParentsScreeningTestAnswersList[0].Result.length
        }
        return res.status(200).json({ data:ParentScreeningTestList[0].Questions, NextStep:NextStep })
    }
    catch(err){
        console.log(err);
    }
}

exports.SaveScreeningAnswer = async (req, res) =>{
    try{
        var data = req.body;
        var ParentScreeningTestList = await ParentScreeningTest.find({});
        const CheckExist = await ParentsScreeningTestAnswers.find({ "ChildDetails.ChildID":data.ChildDetails.ChildID });console.log(CheckExist)
        if(!CheckExist.length){
            await ParentsScreeningTestAnswers.create({ ChildDetails:data.ChildDetails, Result:{ Question:ParentScreeningTestList[0].Questions[data.QuestionIndex], Answer:data.Answer } })
            return res.status(200).json({ data:"", notifier:"success", Message:"Record Created" })
        }
        else{
            if(typeof CheckExist[0].Result[data.QuestionIndex] !== 'undefined'){
                await ParentsScreeningTestAnswers.updateOne({ _id:CheckExist[0]._id },{ $set:{ ["Result."+(data.QuestionIndex)+".Answer"]:data.Answer } })    
            }
            else{
                await ParentsScreeningTestAnswers.updateOne({ _id:CheckExist[0]._id },{ $push:{ Result:{ Question:ParentScreeningTestList[0].Questions[data.QuestionIndex], Answer:data.Answer } } })
            }
            return res.status(200).json({ data:"", notifier:"success", Message:"Answer updated" })
        }
    }
    catch(err){
        console.log(err);
    }
}
