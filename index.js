
/*-------------->>>Requerimiento de paquetes<<<-----------------------*/
    const express=require('express');
    const morgan =require('morgan');
    const path=require('path');
    const session=require('express-session');

    const app=express();

/*---------------------------------------------------------------*/

/*----------------->>>Generacon de funciones<<<--------------------*/

    app.use(morgan('dev'));
    
    app.engine('html',require('ejs').renderFile);
    app.use(express.static(path.join(__dirname,'Public')));
    
    app.set('view engine','ejs');
    app.set('views',path.join(__dirname,'Views'));

    app.use(session({
        secret: '12345',
        resave: false,
        saveUninitialized: true
    }));
    
    app.use(express.urlencoded({extended:true}));
    app.use(require('./Routes/rutas'));
    app.use((err,res,req,next)=>{
        res.send({err:err.message});
    })

/*---------------------------------------------------------------*/

/*------------------->>>Configuracion del servidor<<<------------------*/

    app.set('port',process.env.PORT || 3000);
    app.listen(app.get('port'),()=>{
        console.log(`Server on port hola  ${app.get('port')}`)
    });

/*---------------------------------------------------------------*/

/*-------------------------------->>><<<-------------------------------*/
//separador de bloques de codigo
/*---------------------------------------------------------------*/