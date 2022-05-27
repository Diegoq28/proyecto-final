
$(Document).ready(function(){
    $('#btn').on('click',function(){
        console.log("entro a qjr");
        let btn=$('#btn').index(this);
        let doc=$('#doc').eq(btn);
        let nom=$('#nom').eq(btn);
        let ape=$('#ape').eq(btn);
        let corr=$('#corr').eq(btn);
        let pas=$('#pas').eq(btn);
        let tel=$('#tel').eq(btn);
        let dic=$('#dic').eq(btn);


        let d=doc.val();
        let m=nom.val();
        let a=ape.val();
        let c=corr.val();
        let p=pas.val();
        let t=tel.val();
        let di=dic.val();

        alert(d+m+a+c+p+t+di);

        //const datos={d,m,a,c,p,t,di}

        /* fetch('/ingresarasociado',{
            method:'post',

            headers: {
                'Content-Type': 'application/json',

                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:JSON.stringify(datos)
            
        })
        
        .then(respse=>respse.json())
        .catch(error=>console.log(error)) */

        //console.console.log(datos)
$.ajax({
    
    type:"POST",
    url:'/registraraso',
    data:{
        dd:d,
        mm:m,
        aa:a,
        cc:c,
        pp:p,
        tt:t,
        di:di
    }
        });
    });
});


