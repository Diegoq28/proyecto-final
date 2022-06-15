
/*--------------------->>>REQUERIMIENTO DE PAQUETES<<<--------------------*/

    const connection=require('../Connection/conexion');
    const cnn=connection();
    const {render}=require('ejs');
    const { query } = require('express');
    const res = require('express/lib/response');
const { redirect } = require('express/lib/response');
    const controller={};

/*---------------------------------------------------------------*/

/*----------------------->>>controladores<<<---------------------*/



/*------------------>>>renderisados sencillos<<<----------------*/



controller.casa=(req,res,next)=>{
    res.render('home');
}

controller.vistadeusu=(req,res,next)=>{
    if(req.session.nombre===undefined){
        res.redirect('/')
    }
    else{
        res.render('home_usuario',{
            nombre: req.session.nombre,
            apellido: req.session.apellido,
            documento:req.session.documento
        });
    }
}

controller.vistaaso=(req,res,next)=>{

    if(req.session.nombre===undefined){
        res.redirect('login')
    }
    else{
        res.render('home_asociado',{nombre: req.session.nombre});
    }
    
}

controller.vistaadmin=(req,res,next)=>{
    if(req.session.nombre===undefined){
        res.redirect('login')
    }
    else{
        res.render('home_administrador',{
            nombre: req.session.nombre,
            apellido: req.session.apellido,
            documento:req.session.documento
        });
    }
    
}

controller.login=(req,res,next)=>{
    res.render('login');
}

controller.vistaregistroasociado=(req,res,next)=>{
    res.render('registro_asociado');
}

controller.vistaregistrousuario=(req,res,next)=>{
    res.render('registro_usu');
}

controller.vistaregser=(req,res,next)=>{
    res.render('reg_servicio');
}

controller.datospersonales=(req,res,next)=>{

    if(req.session.nombre===undefined){
        res.redirect('/')
    }
    else{
        res.render('actualizardatospersonales',{
            documento:req.session.documento,
            nombre: req.session.nombre,
            apellido: req.session.apellido,
            correo:req.session.correo,
            telefono:req.session.telefono,
            direccion:req.session.direccion,
            contra:req.session.pass
        });
    }
    
}

/* controller.vistadeserviciosf=(rq,res,next)=>{
    res.render('vistaservicioxcategoria');
} */

/*---------------------------------------------------------------*/



/*------------------------>>> inicio de sesion<<<-----------------*/

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
            rol=results[0].rol;
            doc=results[0].documento;

            req.session.documento=results[0].documento;
            req.session.nombre=results[0].nombre;
            req.session.apellido=results[0].apellido;
            req.session.correo=results[0].correo;
            req.session.rolusu=results[0].rol;
            req.session.telefono=results[0].num_tel;
            req.session.direccion=results[0].direccion;
            req.session.pass=results[0].password;
            console.log(rol+".."+uss+".."+doc);
            //res.redirect('vistausu');
            if(rol=="Asociado"){
                res.redirect('vistsdeaso');
            }
            else if(rol=="Cliente"){
                res.redirect('vistausu');
            }
            else{
                res.redirect('vistaadmin');
            }
        }
            
        else{
            //console.log("datos Incorrectos");
            res.redirect('login');
        }
    }); 
}

/*---------------------------------------------------------------*/

/*-------------------------->>>cerrar sesion<<<---------------------*/

controller.cerrarsesion=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    });
}

/*----------------------------------------------------------------*/
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


/*--------------------->>>registro de Usuario<<<-----------------*/

controller.registrarausuario=(req,res,next)=>{
    console.log("hola este es el controlador antes");
    const doc=req.body.doc;
    const nom=req.body.user_name;
    const ape=req.body.user_ape;
    const cor=req.body.user_mail;
    const pas=req.body.user_pass;
    const tel=req.body.user_tel;
    const dic=req.body.user_direc;
    const rol="Cliente";
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

/*-------------------------Insert de Servicios--------------------------------------*/
controller.registroservicio=(req,res,next)=>{
    const ids=req.body.ids;
    const nom=req.body.nom_ser;
    const doc=req.body.doc;
    const cat=req.body.categoria;
    const des=req.body.des;
    const val=req.body.val;
    console.log(doc+nom+ids);

        cnn.query('INSERT INTO tl_servicio SET?',{id_servicio:ids,nombre_serv:nom,documento:doc,categoria:cat,descripcion:des,valor_sev:val},(err,resdb)=>{
            if(err){
                console.log("error al insertar el servicio");
                throw err;
                res.redirect('vistaregser');
            }
            else{
                console.log("Servicio Insertado");
                res.redirect('vistsdeaso');
            }
        })
    }
/*---------------------------------------------------------------*/

/*--------------------->>>modificar datos personales<<<----------*/

controller.actudatospersonales=(req,res,next)=>{
    const documento=req.body.user_doc;
    const nombre=req.body.user_name;
    const apellido=req.body.user_ape;
    const correo=req.body.user_mail;
    const telefono=req.body.user_tel;
    const direccion=req.body.user_direc;
    rol=req.session.rolusu;
    console.log(documento+"\n"+nombre+"\n"+apellido+"\n"+correo+"\n"+telefono+"\n"+direccion);

    cnn.query('UPDATE tl_usuarios SET nombre="'+nombre+'",apellido="'+apellido+'",correo="'+correo+'",num_tel="'+telefono+'",direccion="'+direccion+'" WHERE documento="'+documento+'" ',async(err,resdb)=>{

        if(err){
            console.log("Error al actualizar")
            res.redirect('datosusuario');
            throw err;
        }
        else{
                res.redirect('/login');
        }
    })
}

/*---------------------------------------------------------------*/

/*----------------->>>flitro de categorias<<<--------------------*/

controller.vistaflitrocate=(req,res,next)=>{
    cnn.query('SELECT categoria,COUNT(tl_servicio.categoria)AS"Cantidad" FROM `tl_servicio` GROUP BY categoria',(err,results)=>{
        if(err){
            next(new Error("error de consulta",err));
            
        }
        else{
            res.render('vista_flitro_categoria',{datos:results});
        }
    });
}

/*---------------------------------------------------------------*/

/*------------->>>flitro de servicio por categoria<<<-------------*/

controller.filtrodeservicioporcategoria=(req,res,next)=>{

    const categoria= req.body.categorian;
    req.session.tipocategoria=categoria;
    console.log(categoria);

    cnn.query('SELECT * FROM tl_servicio WHERE categoria=?',[categoria],(err,results)=>{
        
        if(err){
            next(new Error("error de consulta",err));
            
        }
        else{
            console.log(results);
            res.render('vistaservicioxcategoria',{datos:results,nomcat:req.session.tipocategoria});
            
            console
        }

    });
}

/*---------------------------------------------------------------*/


/*------------------>>>exportar controlador<<<-------------------*/
module.exports=controller;
/*---------------------------------------------------------------*/



/*-------------------------------->>><<<-------------------------------*/
//separador de bloques de codigo
/*---------------------------------------------------------------*/