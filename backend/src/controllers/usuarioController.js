const Empleado = require('../models/Empleado');
const Usuario = require('../models/Usuario');

exports.createUsuario = async (req, res) => {
    try {
        const usuario = new Usuario(req.body);
        await usuario.save();

        res.status(201).json(usuario);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al crear el usuario'})
    }
}

exports.getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find()
        .populate('empleado');

        res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los usuarios'})
    }
};

exports.getUsuarioById = async (req, res) => {
    const {id} = req.params;

    try {
        const usuario = await Usuario.findById(id)
        .populate('empleado');

        if(!usuario){
            return res.status(404).json({ error: 'No se encontro el usuario.'})
        }

        res.status(200).json(usuario)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el usuario'})
    }
}

exports.updateUsuario = async (req, res) => {
    const {id} = req.params;
    const updateData = req.body;

    try {
        const usuario = await Usuario.findById(id);

        if(!usuario){
            return res.status(404).json({ error: 'No se encontro el usuario.'})
        }

        //si se actualiza el empleado
        if(updateData.empleado){
            const empleado = await Empleado.findById(updateData.empleado)
            if(!empleado){
                return res.status(404).json({ error: 'Empleado no encontrado'})
            }
        }

        for(let key in updateData){
            if(updateData.hasOwnProperty(key)){
                usuario[key] = updateData[key];
            }
        };

        await usuario.save();
        res.status(200).json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el usuario'})
    }
}

exports.deleteUsuario = async (req, res) => {
    const {id} = req.params;

    try {
        const usuario = await Usuario.findByIdAndDelete(id);

        if(!usuario){
            return res.status(404).json({ error: 'No se encontro el usuario.'})
        }

        res.status(200).json({ message: 'El usuario se elimino con éxito.'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el usuario.'})
    }
}