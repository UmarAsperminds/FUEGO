var express=require('express');
var routes=express.Router();


var ParentDetailsController=require('./controllers/ParentDetailsController');
routes.post('/ParentDetailsInsUp',ParentDetailsController.ParentDetailsInsUp);

var ChildDetailsController=require('./controllers/ChildDetailsController');
routes.post('/ChildDetailsInsUp',ChildDetailsController.ChildDetailsInsUp);
routes.post('/FetchChildDetails',ChildDetailsController.FetchChildDetails);

var LoginController=require('./controllers/LoginController');
routes.post('/VerifyLogin',LoginController.VerifyLogin);

var ParentsScreeningTestController=require('./controllers/ParentsScreeningTestController');
routes.post('/FetchParentScreeningQuestions', ParentsScreeningTestController.FetchParentScreeningQuestions);
routes.post('/SaveScreeningAnswer', ParentsScreeningTestController.SaveScreeningAnswer);

var ChildAssessmentQuestionsController = require('./controllers/ChildAssessmentQuestionsController');
routes.post('/FetchChildAssessmentReading', ChildAssessmentQuestionsController.FetchChildAssessmentReading);
routes.post('/FetchQuestionsForChildAssessment', ChildAssessmentQuestionsController.FetchQuestionsForChildAssessment);
routes.post('/SaveChildAssessment', ChildAssessmentQuestionsController.SaveChildAssessment);
routes.post('/TotalPercentage', ChildAssessmentQuestionsController.TotalPercentage);

routes.post('/UploadImagesToPath', ChildAssessmentQuestionsController.UploadImagesToPath);

routes.post('/TestingGajana' , async (req, res)=>{
    try{
        console.log(req.body)
        return res.send("Success")
    }
    catch(err){
        console.log(err)
    }
})




// routes.get('/RestoreDatabase',async (req, res)=>{
//     await require('fs').readFile('E:/SIH/EntireDatabaseBackup.json', 'utf8', async (err, data)=>{
//         if(err) console.log(err);
//         data = JSON.parse(data.trim());
//         console.log(data)
//         await require('./modals/ChildAssessmentQuestionsSchema').insertMany(data)
//         res.send(data)
//         // require('./modals/ParentsScreeningTestSchema').create({ Questions:data })
//     });
// })
// routes.get('/asd',async (req, res)=>{
//     await require('fs').readFile('C:/Users/hp/Downloads/Mongodb SIH/listening and understanding/soundrecognition.json', 'utf8', async (err, data)=>{
//         if(err) console.log(err);
//         data = JSON.parse(data.trim());
//         data[0].GradewiseDataSet.forEach((value, index)=>{
//             if([1,3,5].includes(value.Grade[0])){
//                 value.DataSet.forEach((val, ind)=>{
//                     val.Options.forEach((v, i)=>{
//                         data[0].GradewiseDataSet[index].DataSet[ind].Options[i] = v+".png"
//                         // v = v+".png"
//                     })
//                 })
//             }
//         })
//         res.send(data[0])
//         // require('./modals/ParentsScreeningTestSchema').create({ Questions:data })
//     });
// });
// routes.get('/asd',async ()=>{
//     await require('fs').readFile('ParentsScreeningTest.json', 'utf8', async (err, data)=>{
//         if(err) console.log(err);
//         data = JSON.parse(data.trim());
//         require('./modals/ParentsScreeningTestSchema').create({ Questions:data })
//     });
// });

// });

module.exports = routes