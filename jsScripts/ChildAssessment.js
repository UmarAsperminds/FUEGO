let FunctionProgressBar = () =>{
    var TotalQuestions = JSON.parse(localStorage.getItem('ChildAssessmentQuestions')).length;
    var ProgressBarWidthPercentage = (((Number($('#QuestionCaption').attr('QuestionIndex'))) / 15) * 100) + "%";
    if(parseFloat(ProgressBarWidthPercentage) >= 100){
        location.href = 'ChildAssessment.html';
        return;
    }
    $(document).find('.cssProgress-bar').animate({
        width: ProgressBarWidthPercentage
    }, {
        duration: 100,
        step: function(x) {
            $('.cssProgress-label').text(Math.round(parseFloat(ProgressBarWidthPercentage)) + " %");// progress_label.text(Math.round(x) + '%');
        }
    });
}

let ReloadQuestion = async (PrevNext) =>{
    var ChildDatas = JSON.parse(localStorage.getItem('ChildDetails'));
    ChildDatas.ChildID = ChildDatas._id;
    delete ChildDatas._id;
    if(localStorage.getItem('ChildAssessmentQuestions') === null){
        var Questions = await AjaxScripts('FetchParentScreeningQuestions', { ChildDetails:ChildDatas }, 'FetchParentScreeningQuestions')
        localStorage.setItem('ChildAssessmentQuestions', JSON.stringify(Questions.data))
        $('#Question').text(Questions.data[Questions.NextStep]).attr('QuestionIndex', Questions.NextStep)
    }
    else{
        Questions = { data:JSON.parse(localStorage.getItem('ChildAssessmentQuestions')) };
        var QuestionIndex = PrevNext === 'Next' ? Number($('#Question').attr('QuestionIndex')) + 1 : Number($('#Question').attr('QuestionIndex')) - 1;
        console.log(Questions)
        $('#Question').text(Questions.data[QuestionIndex]).attr('QuestionIndex', QuestionIndex)
    }
    FunctionProgressBar();
    if(Number($('#Question').attr('QuestionIndex')) > 0){
        $('#PrevButton').show();
    }
    else
        $('#PrevButton').hide();
    $('input[name="Answer"]:visible').prop('checked', false);
    var AnswerSelected = JSON.parse(localStorage.getItem('Answers') || '[]');
    if(AnswerSelected.length - 1 >= QuestionIndex){
        $('input[name="Answer"]:visible:eq('+(AnswerSelected[QuestionIndex].toUpperCase() === 'YES' ? 0 : 1)+')').prop('checked', true)
    }
    // else AnswerSelected.push(Answer)
}

let LoadAudioToLanguage = () =>{
    const appDiv = document.getElementById('AudioDiv');
    // appDiv.innerHTML = `<h1>Click here to start audio</h1>`;
    var audio = $("audio");      
    $("audio").attr("src", "https://translate.google.com/translate_tts?ie=UTF-&&client=tw-ob&tl="+($('select').val() || 'en')+"&q="+$('#Question').text());
    /****************/
    audio[0].pause();
    audio[0].load();//suspends and restores all audio element

    //audio[0].play(); changed based on Sprachprofi's comment below

    // const sound = new Audio("https://translate.google.com/translate_tts?ie=UTF-&&client=tw-ob&tl=en&q="+$('#Question').text());

    // function soundHandler() {
    //     sound.play()
    // }

    // $('audio').attr('src', "https://translate.google.com/translate_tts?ie=UTF-&amp;&amp;client=tw-ob&amp;tl=ta&amp;q="+)[0].play()
    $('iframe').remove()
}

$(document).ready(async ()=>{
    ReloadQuestion('Next');
    setTimeout(()=>{ LoadAudioToLanguage(); },500);
    var FetchChildQuestions = await AjaxScripts('FetchChildAssessmentReading', { ChildDetails:JSON.parse(localStorage.ChildDetails), QuestionType:"Reading" }, 'FetchChildAssessmentReading')
    console.log(FetchChildQuestions)
    localStorage.setItem('ChildAssessmentQuestions', JSON.stringify(FetchChildQuestions.data))
})

$('#NextButton').on('click', async ()=>{
    if(!$('input[name="Answer"]:visible:checked').length){
        window.notifications('info', 'Please Select an Option', 'Corner');
        return
    }
    var ChildDatas = JSON.parse(localStorage.getItem('ChildDetails'));
    ChildDatas.ChildID = ChildDatas._id;
    delete ChildDatas._id;
    var Answer = $('input[name="Answer"]:checked').val(), QuestionIndex = Number($('#Question').attr('QuestionIndex'));

    var AnswerSelected = JSON.parse(localStorage.getItem('Answers') || '[]');
    ReloadQuestion('Next');
    var AjaxResult = await AjaxScripts('SaveScreeningAnswer', { ChildDetails:ChildDatas, QuestionIndex:QuestionIndex, Answer:Answer }, 'SaveScreeningAnswer')
    if(AnswerSelected.length - 1 < QuestionIndex){
        AnswerSelected.push(Answer)
    }
    else
        AnswerSelected[QuestionIndex] = Answer
    localStorage.setItem('Answers', JSON.stringify(AnswerSelected))
    if(Number($('#Question').attr('QuestionIndex')) + 1 > JSON.parse(localStorage.getItem('ChildAssessmentQuestions')).length){
        var CallBack = () =>{ 
            window.location.href = 'Dashboard.html';
        };
        window.notifications('success', 'Congratulations! Screen test for '+ChildDatas.ChildName+' is Completed!', 'CenterBig', CallBack);
    }
    LoadAudioToLanguage();
})

$('#PrevButton').on('click', async ()=>{
    var ChildDatas = JSON.parse(localStorage.getItem('ChildDetails'));
    ChildDatas.ChildID = ChildDatas._id;
    delete ChildDatas._id;
    ReloadQuestion('Prev')
    if(Number($('#Question').attr('QuestionIndex')) + 1 > JSON.parse(localStorage.getItem('ChildAssessmentQuestions')).length){
        var CallBack = () =>{ 
            window.location.href = 'Dashboard.html';
        };
        window.notifications('success', 'Congratulations! Screen test for '+ChildDatas.ChildName+' is Completed!', 'CenterBig', CallBack);
    }
    LoadAudioToLanguage();
})