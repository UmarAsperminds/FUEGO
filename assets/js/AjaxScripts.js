var AjaxScripts = async (Action, PostData, Api) =>{
    console.log(Action, PostData, Api)
    var AjaxRequest = {
        type: "POST",
        url: "http://localhost:5000/api/"+Api,
        data: PostData,
        dataType: "json",
        headers: { 'IsAjax': 'true' },
        processData: typeof PostData.entries === 'function' ? false : true,
        success:(data)=>{
            if(Action === 'ParentDetailsInsUp'){
                var CallBack = () =>{ window.location.href = "Login.html"; }
                window.notifications(data.notifier, data.Message, 'CenterBig', CallBack)
            }
            else if(Action === 'VerifyLogin'){
                if(data.notifier === 'success'){
                    var CallBack = () =>{ 
                        localStorage.setItem('ParentDetails', JSON.stringify(data.data))
                        window.location.href = "Dashboard.html"; 
                    }
                }
                else
                    CallBack = {};
                window.notifications(data.notifier, data.Message, 'CenterBig', CallBack)
            }
            else if(Action === 'ChildDetailsInsUp'){
                var CallBack = () =>{ window.location.href = "Dashboard.html"; }
                console.log(data.notifier, data.Message, 'CenterBig', CallBack)
                window.notifications(data.notifier, data.Message, 'CenterBig', CallBack)
            }
            else{
                return data
            }
        }
    };
    var AjaxResult = await $.ajax(AjaxRequest);
    return AjaxResult;
}