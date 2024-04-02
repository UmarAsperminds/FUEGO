var ChildDetails=require('../modals/ChildDetailsSchema');
var ObjectId=require('mongoose').Types.ObjectId;

exports.ChildDetailsInsUp=async(req,res)=>{
    try{
        var data =req.body;
        if(data.ChildID !== ""){
            var InsUp = await ChildDetails.updateOne({_id:data.ChildID},{$set:data});
            return res.status(200).json({"data":"success", notifier:"success", Message:"Child Profile Updated Successfully"})
        }
        else{
            InsUp = await ChildDetails.create(data)
            return res.status(200).json({"data":"success", notifier:"success", Message:"Child Added Successfully"})
        }
        return res.status(200).json({"data":"", notifier:"error", Message:"Input Error"})
    }
    catch(err){
        console.log(err)        
    }
}

exports.FetchChildDetails = async(req, res) =>{
    try{
        var data = req.body;
        var ChildList = await ChildDetails.find({ "ParentDetails._id":data.ParentID });
        return res.status(200).json({ data:ChildList, notifier:"", Message:"" })
    }
    catch(err){
        console.log(err);
    }
}