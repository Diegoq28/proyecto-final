
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
    res.render('reg_servicio',{documento:req.session.documento});
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

        cnn.query('INSERT INTO tl_servicio SET?',{nombre_serv:nom,documento:doc,categoria:cat,descripcion:des,valor_serv:val},(err,resdb)=>{
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
            res.render('vistaservicioxcategoria',{datos:results,nomcat:req.session.tipocategoria,nombre:req.session.nombre,apellido:req.session.apellido});
            
            console
        }

    });
}

/*---------------------------------------------------------------*/

/*------------->>>destalles del servicio y reseñas<<<------------*/


    /*--->>>renderisado de datos del servicio y sus reseñas<<<---*/

        controller.servicioinvidual=async(req,res,next)=>{
            const idser=await req.body.id;
            
            cnn.query('SELECT * FROM tl_servicio INNER JOIN tl_usuarios ON(tl_usuarios.documento=tl_servicio.documento) WHERE id_servicio=?',[idser],(err,results)=>{

                const idserv=results[0].id_servicio;
                req.session.idservicio=idserv;

                if(err){
                    next(new Error("error de consulta",err));
                    
                }
                else{
                    const idser=req.session.idservicio;
                console.log("entra al controlador"+idser);
                cnn.query('SELECT  * FROM tl_resenna INNER JOIN tl_usuarios ON (tl_usuarios.documento=tl_resenna.doc_cliente) WHERE servicio_id=?',[idser],(err,resulta)=>{
                if(err){
                    next(new Error("error de consulta del la reseña",err));
                    
                }
                else{
                    console.log(results);
                    console.log(resulta);
                    const cantidad=resulta.length;
                    const doc=req.session.documento;
                    //const docaso=resulta[0].doc_asociado;
                    console.log(doc);
                    res.render('vistaservicioindividual',{datosresena:resulta,datos:results,
                        cantidad:cantidad,
                        documento:doc,
                        //docaso:docaso,
                        id:idser,
                        nombre:req.session.nombre,
                        apellido:req.session.apellido
                    });
                }
            });
                }
                
            });
        
        }
    /*-----------------------------------------------------------*/


/*---------------------------------------------------------------*/


/*------------------->>>revicion de contratos<<<------------------*/

controller.consultacontratoscliente=(req,res,next)=>{

    const documento=req.session.documento;
    const nombre1= req.session.nombre;
    console.log(documento+nombre1);

    cnn.query('SELECT * FROM `tl_contrato` INNER JOIN tl_servicio ON(tl_servicio.id_servicio=tl_contrato.id_servicio) INNER JOIN tl_usuarios ON(tl_usuarios.documento=tl_contrato.doc_asociado) WHERE doc_cliente=?',[documento],(err,results)=>{
        if(err){
            next(new Error("error de consulta del contratos",err));
            
        }
        else{
            console.log(results);
            res.render('contratos_del_cliente',{
                datos:results,
                nombre:nombre1,
                documento:documento,
                apellido:req.session.apellido,
                telefono:req.session.telefono,
                correo:req.session.correo,
            });
        }
    });
}

/*---------------------------------------------------------------*/

/*-------------------->>>servicios del asociado <<<--------------*/

    controller.consultamisservicios=(req,res,next)=>{
        const documento=req.session.documento;
        console.log(documento);
        
        cnn.query('SELECT * FROM tl_servicio WHERE documento=?',[documento],(err,results)=>{
            if(err){
                next(new Error("error de consulta del servicio",err));
                
            }
            else{
                console.log(results);
                res.render('serviciosdelasociado',{datos:results});
            }
        });

    }

/*---------------------------------------------------------------*/

/*-------------------->>>ingresar reseña<<<----------------------*/

    controller.ingresarresena=(req,res,next)=>{
        const documentodelcliente=req.body.doccliente;
        const documentoasociado=req.body.docasociado;
        const idservicio=req.body.idservicio;
        const texto=req.body.texto;

        console.log(documentodelcliente);
        console.log(documentoasociado);
        console.log(idservicio);
        console.log(texto);

        cnn.query('INSERT INTO tl_resenna SET?',{doc_asociado:documentoasociado,doc_cliente:documentodelcliente,servicio_id:idservicio,texto:texto},(err,resdb)=>{
            if(err){
                console.log("error al insertar la reseña");
                throw err;
                res.redirect('vistausu');
            }
            else{
                console.log("reseña Insertada");
                res.redirect('vistausu');
            }
        });

    }

/*---------------------------------------------------------------*/


/*---------------------->>>consultar servicio<<<------------------*/

controller.consultaservicios=(req,res,next)=>{
    cnn.query('SELECT * FROM tl_servicio',(err,results)=>{
        if(err){
            console.log("error al consultar los servicios");
            throw err;
            res.redirect('vistausu');
        }
        else{
            console.log("res");
            res.render('consultaservicios',{datos:results});
        }
    })
}
/*---------------------------------------------------------------*/


/*----------------->>>insertar contrato<<<-----------------------*/

    controller.insertatcontrato=(req,res,next)=>{
        const idservicio=req.body.id;
        const documentocli=req.body.doccli;
        const documentoaso=req.body.docaso;
        const valor=req.body.valor;
        
        console.log(idservicio);
        console.log(documentocli);
        console.log(documentoaso);
        console.log(valor);

        cnn.query('INSERT INTO tl_contrato SET?',{id_servicio:idservicio,doc_cliente:documentocli,doc_asociado:documentoaso,valor_servicio:valor},(err,resdb)=>{
            if(err){
                console.log("error al insertar el contrato");
                throw err;
                res.redirect('vistausu');
            }
            else{
                console.log("reseña Insertada");
                res.redirect('miscontratos');
            }
        });

    }

/*---------------------------------------------------------------*/

/*-------------------------------->>><<<-------------------------------*/
controller.consultacontratosasociado=(req,res,next)=>{

    const documento=req.session.documento;
    const nombre1= req.session.nombre;
    console.log(documento+nombre1);

    cnn.query('SELECT * FROM `tl_contrato` INNER JOIN tl_servicio ON(tl_servicio.id_servicio=tl_contrato.id_servicio) INNER JOIN tl_usuarios ON(tl_usuarios.documento=tl_contrato.doc_asociado) WHERE doc_asociado=?',[documento],(err,results)=>{
        if(err){
            next(new Error("error de consulta del contratos",err));
            
        }
        else{
            console.log(results);
            res.render('contratosasociado',{
                datos:results,
                nombre:nombre1,
                documento:documento,
                apellido:req.session.apellido,
                telefono:req.session.telefono,
                correo:req.session.correo,
            });
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