
/*--------------------->>>REQUERIMIENTO DE PAQUETES<<<--------------------*/

    const connection=require('../Connection/conexion');
    const cnn=connection();
    const {render}=require('ejs');
    const { query } = require('express');
    const res = require('express/lib/response');
    const controller={};

/*---------------------------------------------------------------*/

/*------------------>>>controlador del home<<<---------------------*/

controller.casa=(req,res,next)=>{
    res.render('registro_asociado');
}

controller.login=async(req,res,next)=>{
    res.render('login');
    //const usu=await req.body[0];
    //const cla=await req.body[1];
    //console.log(usu+cla);
    /* cnn.query('SELECT * FROM tl_usuarios  WHERE correo=? AND password=?',[usu,cla],(err,results)=>{
        if(err){
            next(new Error("error de consulta login",err));
            
        }
        else if(results!=0){
            uss= results[0].nombre_usuario;
            console.log(".."+uss);
            req.session.login=true;
            res.redirect('/');
                }
        else{
            //console.log("datos Incorrectos");
            res.redirect('/');
        }
    }); */
}


/*---------------------------------------------------------------*/

/*------------------>>>exportar controlador<<<-------------------*/
module.exports=controller;
/*---------------------------------------------------------------*/



/*-------------------------------->>><<<-------------------------------*/
//separador de bloques de codigo
/*---------------------------------------------------------------*/