
/*---------------->>>Requerimiento de paquetes<<<--------------------*/

    const express=require('express');
    const controller=require('../Controller/controller');
    const rutas=express.Router();

/*---------------------------------------------------------------*/

/*----------------------------->>>Enrutamiento<<<----------------------------*/
rutas.get("/",controller.casa);

rutas.get("/login",controller.login);
rutas.post("/iniciosesion",controller.iniciosesion);
rutas.get("/cerrar",controller.cerrarsesion);

rutas.get("/vistaregistraraso",controller.vistaregistroasociado);
rutas.post("/registraraso",controller.registrarasociado);

rutas.get("/vistaregistrousu",controller.vistaregistrousuario);
rutas.post("/registrarusu",controller.registrarausuario);

rutas.get("/vistaregser",controller.vistaregser);
rutas.post("/registroservi",controller.registroservicio);

rutas.get("/vistsdeaso",controller.vistaaso);
rutas.get("/vistausu",controller.vistadeusu);
rutas.get("/vistaadmin",controller.vistaadmin);

rutas.get("/datosusuario",controller.datospersonales);
rutas.post("/actualizardatos",controller.actudatospersonales);

rutas.get("/seleccioncategoria",controller.vistaflitrocate);
rutas.post("/serviciosporcategoria",controller.filtrodeservicioporcategoria);
rutas.post("/servicioindividula",controller.servicioinvidual);

rutas.post("/servicioindividula",controller.resenas);

/*---------------------------------------------------------------*/

/*-------------------------------->>>Exportar modulo<<<-------------------------------*/
    module.exports=rutas;
/*---------------------------------------------------------------*/

/*-------------------------------->>><<<-------------------------------*/
//separador de bloques de codigo
/*---------------------------------------------------------------*/