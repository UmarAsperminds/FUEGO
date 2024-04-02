var ChildProfileCardClick = (e) =>{
    localStorage.setItem('ChildDetails', $(e).find('.ChildDetails').text())
    window.location.href = 'Temp.html';
}
$(document).ready(async ()=>{
    var ChildDetails = await AjaxScripts('FetchChildDetails', { ParentID:JSON.parse(localStorage.getItem('ParentDetails'))._id }, 'FetchChildDetails');
    var ChildCardTheme = "";
    var Animations = ["up","down","left","right"];
    ChildDetails.data.forEach((value, index)=>{
        ChildCardTheme += '<div class="col-xxl-4 col-md-6"  data-aos="fade-'+Animations[Math.floor(Math.random() * Animations.length)]+'" onclick="ChildProfileCardClick(this)"><font class="ChildDetails d-none">'+(JSON.stringify(value))+'</font><div class="card info-card sales-card"> <div class="card-body"> <br/> <div class="d-flex align-items-center"> <div class="card-icon rounded-circle d-flex align-items-center justify-content-center"> <i class="bi bi-person"></i> </div> <div class="ps-3"> <h6>'+value.ChildName+' </h6> <span class="text-success small pt-1 fw-bold">Grade : </span> <span class="text-muted small pt-2 ps-1"><b>'+value.Grade+'</b></span> </div> </div> </div> </div> </div>'
    })
    $('#ChildCardThemeDiv').append(ChildCardTheme)
})