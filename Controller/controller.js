
/*--------------------->>>REQUERIMIENTO DE PAQUETES<<<--------------------*/

    const connection=require('../Connection/conexion');
    const cnn=connection();
    const {render}=require('ejs');
    const { query } = require('express');
    const res = require('express/lib/response');
    const controller={};

/*---------------------------------------------------------------*/

/*----------------------->>>controladores<<<---------------------*/



/*------------------>>>renderisados sencillos<<<----------------*/
controller.casa=(req,res,next)=>{
    res.render('registro_asociado');
}

controller.vistadeusu=(req,res,next)=>{
    res.render('home_usuario');
}

controller.login=(req,res,next)=>{
    res.render=('login');
}

controller.resgitrousu=(res,req,next)=>{
    res.render=('registro_usu');
}

controller.resgitroaso=(res,req)=>{
    res.render=('registro_asociado');
} 

controller.redirigisaregistro=(res,req,next)=>{
    res.redirect('/regtrousu');
}

/*---------------------------------------------------------------*/

controller.iniciosesion=async(req,res,next)=>{
    const usu=await req.body.username;
    const cla=await req.body.password;
    console.log(usu+" "+cla);
    
     cnn.query('SELECT * FROM tl_usuarios  WHERE correo=? AND password=?',[usu,cla],(err,results)=>{
        if(err){
            next(new Error("error de consulta login",err));
            
        }
        else if(results!=0){
            uss= results[0].nombre;
            console.log(".."+uss);
            res.session
            //console.log(nombres);
            res.redirect('/vistausu');
                }
        else{
            //console.log("datos Incorrectos");
            res.redirect('/');
        }
    }); 
}

/*--------------------->>>registro de asociado<<<-----------------*/

    controller.ingresoaso=(res,req,next)=>{

        console.log("hola este es el controlador antes");
        
        console.log(req.body);

        //const {dd}=req.body;

        /* const docx=req.body.dd;
        const nomx=req.body.nn;
        const apex=req.body.aa;
        const corx=req.body.cc;
        const pasx=req.body.pp;
        const telx=req.body.tt;
        const dicx=req.body.di; */

        console.log("hola este es el controlador despues");

    }

/*---------------------------------------------------------------*/

/*------------------>>>exportar controlador<<<-------------------*/
module.exports=controller;
/*---------------------------------------------------------------*/



/*-------------------------------->>><<<-------------------------------*/
//separador de bloques de codigo
/*---------------------------------------------------------------*/