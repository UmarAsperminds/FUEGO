$(document).ready(function () {
    var LanguageList = [ "English", "Hindi", "Bengali", "Marathi", "Telugu", "Tamil", "Gujarati", "Urdu", "Kannada", "Odia", "Malayalam", "Punjabi", "Assamese", "Maithili", "Sanskrit" ];
    LanguageList.forEach((e, i)=>$('#MotherTongue, #OtherLanguage').append("<option value='"+e+"'>"+e+"</option>"));
    $('#MotherTongue, #OtherLanguage').chosen()
});

$("form").submit(function (event) {
    event.preventDefault();
    var formData = {
        FatherName: $("#FatherName").val(),
        MotherName: $("#MotherName").val(),
        Email: $("#Email").val(),
        Password: $("#Password").val(),
        MobileNumber: $("#MobileNumber").val(),
        DateOfBirth: $("#DateOfBirth").val(),
        MotherTongue: $("#MotherTongue").val(),
        Address: $("#Address").val(),
        Gender: $("#Gender").val(),
        OtherLanguage: $("#OtherLanguage").val(),
    };
    AjaxScripts('ParentDetailsInsUp', formData, 'ParentDetailsInsUp')
});
