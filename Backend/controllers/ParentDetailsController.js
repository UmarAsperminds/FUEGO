var ParentDetails=require('../modals/ParentDetailsSchema');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('@FUEGO#1999');

exports.ParentDetailsInsUp=async(req,res)=>{
    try{
        var data = req.body;
        var CheckExist = await ParentDetails.find({ Email:data.Email, MobileNumber:data.MobileNumber });
        if(CheckExist.length){
            var InsUp = await ParentDetails.updateOne({ _id:CheckExist[0]._id },{ $set:data });
        }
        else{
            // data.Password = cryptr.encrypt(data.Password)
            console.log(data)
            InsUp = await ParentDetails.create(data)
        }
        if(InsUp)
            return res.status(200).json({ "data":"", notifier:"success", Message:"Details Recorded Successfully" })
        else
            return res.status(200).json({ "data":"", notifier:"error", Message:"Something went wrong!" })
    }
    catch(err){
        console.log(err)
    }
}