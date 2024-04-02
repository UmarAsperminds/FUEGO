$(document).ready(function () {
    var LanguageList = [ "English", "Hindi", "Bengali", "Marathi", "Telugu", "Tamil", "Gujarati", "Urdu", "Kannada", "Odia", "Malayalam", "Punjabi", "Assamese", "Maithili", "Sanskrit" ];
    LanguageList.forEach((e, i)=>$('#OtherLanguage').append("<option value='"+e+"'>"+e+"</option>"));
    for(i = 0; i <= 12; i++){
        $('#Grade').append("<option value='"+(i == 0 ? 1 : i)+"'>Grade "+i+"</option>")
    }
    var EditProfileChildID = JSON.parse(localStorage.getItem('EditProfileChildID') || '[]'); 
    if(!EditProfileChildID.length){
        Object.keys(EditProfileChildID).forEach((key, index)=>{
            if(typeof $('#'+key)[0] !== 'undefined'){
                if($('#'+key)[0].tagName === 'INPUT')
                    $('#'+key).val(EditProfileChildID[key]).text(EditProfileChildID[key])
                else if($('#'+key)[0].tagName === 'SELECT')
                    $('#'+key).val(EditProfileChildID[key]).trigger('liszt:updated')
            }
        })
        $('#ChildID').val(EditProfileChildID._id)
    }
    $('#OtherLanguage, #Grade, #Handedness, #Gestation, #MedicalHistory, #FamilyHistory').chosen()
});

$("form").submit(function (event) {
    event.preventDefault();
    var formData = {
        ChildName: $("#ChildName").val(),
        DateOfBirth: $("#DateOfBirth").val(),
        Gender: $("input[name='Gender']:checked").val(),
        Grade: $("#Grade").val(),
        OtherLanguage: $("#OtherLanguage").val(),
        Handedness:$('#Handedness').val(),
        Gestation:$('#Gestation').val(),
        MedicalHistory:$('#MedicalHistory').val(),
        FamilyHistory:$('#FamilyHistory').val(),
        ParentDetails:JSON.parse(localStorage.getItem('ParentDetails')),
        ChildID:$('#ChildID').val()
    };
    AjaxScripts('ChildDetailsInsUp', formData, 'ChildDetailsInsUp')
});