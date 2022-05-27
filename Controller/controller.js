
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
    res.render('home');
}

controller.vistadeusu=(req,res,next)=>{
    res.render('home_usuario');
}

controller.login=(req,res,next)=>{
    res.render('login');
}

controller.vistaregistroasociado=(req,res,next)=>{
    res.render('registro_asociado');
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
            res.redirect('vistausu');
                }
        else{
            //console.log("datos Incorrectos");
            res.redirect('vistalogin');
        }
    }); 
}

/*--------------------->>>registro de asociado<<<-----------------*/

    controller.registrarasociado=(req,res,next)=>{
        console.log("hola este es el controlador antes");
        const doc=req.body.doc;
        const nom=req.body.user_name;
        const ape=req.body.user_ape;
        const cor=req.body.user_mail;
        const pas=req.body.user_pass;
        const tel=req.body.user_tel;
        const dic=req.body.user_direc;
        const rol="Asociado";
        console.log(doc+nom+ape);

        if(doc==null ||doc==0){
            res.redirect('vistaregistraraso');
            console.log("campo vasio");
        }
        else{
            cnn.query('INSERT INTO tl_usuarios SET?',{documento:doc,nombre:nom,apellido:ape,correo:cor,password:pas,num_tel:tel,direccion:dic,	rol:rol},(err,resdb)=>{
                if(err){
                    console.log("usuarios no registrado");
                    next(new Error(err))
                    res.redirect('vistaregistraraso');
                }
                else{
                    console.log("usuarios registrado");
                    res.redirect('login');
                }
            })
        }
        
    }

/*---------------------------------------------------------------*/

/*------------------>>>exportar controlador<<<-------------------*/
module.exports=controller;
/*---------------------------------------------------------------*/



/*-------------------------------->>><<<-------------------------------*/
//separador de bloques de codigo
/*---------------------------------------------------------------*/