
$(Document).ready(function(){
    $('.btn').on('click',function(){
        console.log("entro a qjr");
        let btn=$('.btn').index(this);
        let cat=$('.cate').eq(btn);

        let cate=cat.val();
        //alert("la categoria que va a buscar es: "+cate);
$.ajax({
    
    type:"POST",
    url:'/serviciosporcategoria',
    data:{
        categoria:cate,
    }
        }); 
    });
});