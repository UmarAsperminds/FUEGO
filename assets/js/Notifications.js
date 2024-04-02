async function notifications(Type, Content, AlertType, CallBack) {
    if(AlertType === 'Corner'){
        const Toast = await Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000
        });
        await Toast.fire({
            title: Content,
            icon:Type
        })
    }
    else if(AlertType === 'CenterBig'){
        await Swal.fire({
            title: Content,
            icon:Type,
            onOpen:()=>{ Swal.getConfirmButton().focus(); $('.swal2-container').css({ "z-index":99999999999 }); }
        }).then((res)=>{
            CallBack();
        })
    }
}