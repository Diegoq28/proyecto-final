
$(Document).ready(function(){
    $('#btn').on('click',function(){
        console.log("entro a qjr");
        let btn=$('.btn').index(this);
        let doc=$('#doc').eq(btn);


        let d=doc.val();

        alert(d);



$.ajax({
    
    type:"POST",
    url:'/ingresarasociado',
    data:{
        dd:d
    }
        });
    });
});