var mongoose= require("mongoose")

var ParentDetails = mongoose.Schema({
    FatherName:{
        type:String,required:true
    },
    MotherName:{
        type:String,required:true
    },
    Email:{
        type:String
    },
    Password:{
        type:String,required:true
    },
    MobileNumber:{
        type:String,required:true
    },
    DateOfBirth:{
        type:String,required:true
    },
    MotherTongue:{
        type:String
    },
    Address:{
        type:String,required:true
    },
    Gender:{
        type:String
    },
    OtherLanguage:{
        type:Object,required:true
    }
})
module.exports=mongoose.model('ParentDetails',ParentDetails,'ParentDetails')