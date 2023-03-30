const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario');



const validarJWT = (req, res, next) => {

    // Leer el Token
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
 
}

const validarAdminRole=async (req, res, next)=>{
    try{
        const uid=req.uid;

        const usuarioDB=await usuario.findById(uid);

        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if(usuarioDB.role!=='ADMIN_ROLE'){
            return res.status(403).json({
                ok: false,
                msg: 'Usuario no tiene privilegios'
            });
        }
        next();

    }catch(error){
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const validarAdminRoleOMismoUsuario=async (req, res, next)=>{
    try{
        const uid=req.uid;
        const id=req.params.id;

        const usuarioDB=await usuario.findById(uid);

        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if(usuarioDB.role==='ADMIN_ROLE' || uid===id){
            next();
        }else{
            return res.status(403).json({
                ok: false,
                msg: 'Usuario no tiene privilegios'
            });
        }
        

    }catch(error){
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
module.exports = {
    validarJWT,
    validarAdminRole,
    validarAdminRoleOMismoUsuario
}