
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
    res.render('home');
}

/*---------------------------------------------------------------*/

/*------------------>>>exportar controlador<<<-------------------*/
module.exports=controller;
/*---------------------------------------------------------------*/



/*-------------------------------->>><<<-------------------------------*/
//separador de bloques de codigo
/*---------------------------------------------------------------*/