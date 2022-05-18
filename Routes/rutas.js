
/*---------------->>>Requerimiento de paquetes<<<--------------------*/

    const express=require('express');
    const controller=require('../Controller/controller');
    const rutas=express.Router();

/*---------------------------------------------------------------*/

/*----------------------------->>>Enrutamiento<<<----------------------------*/
rutas.get("/",controller.casa);
rutas.get("/login",controller.login);
rutas.post("/",controller.login);

/*---------------------------------------------------------------*/

/*-------------------------------->>>Exportar modulo<<<-------------------------------*/
    module.exports=rutas;
/*---------------------------------------------------------------*/

/*-------------------------------->>><<<-------------------------------*/
//separador de bloques de codigo
/*---------------------------------------------------------------*/