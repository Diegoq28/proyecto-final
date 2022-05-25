
/*---------------->>>Requerimiento de paquetes<<<--------------------*/

    const express=require('express');
    const controller=require('../Controller/controller');
    const rutas=express.Router();

/*---------------------------------------------------------------*/

/*----------------------------->>>Enrutamiento<<<----------------------------*/
rutas.get("/",controller.casa);

rutas.get("/login",controller.login);
rutas.post("/iniciosesion",controller.iniciosesion);

rutas.get("/regtrousu",controller.resgitrousu);


/* rutas.get("/regtroaso",controller.registroaso); */
rutas.post("/ingresarasociado",controller.ingresoaso);


rutas.get("/vistausu",controller.vistadeusu);

/*---------------------------------------------------------------*/

/*-------------------------------->>>Exportar modulo<<<-------------------------------*/
    module.exports=rutas;
/*---------------------------------------------------------------*/

/*-------------------------------->>><<<-------------------------------*/
//separador de bloques de codigo
/*---------------------------------------------------------------*/