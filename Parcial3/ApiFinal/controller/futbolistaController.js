const { validationResult } = require('express-validator');
const Jugador = require('../model/futbolistaModel');

async function consultaFutbolista(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

        const { id } = req.query;
        const resultado = id
            ? await Jugador.findOne({ id: parseInt(id) })
            : await Jugador.find();

        if (!resultado || (Array.isArray(resultado) && resultado.length === 0)) {
            return res.status(404).json({ error: "No hay registros" });
        }

        res.json({ resultado });
    } catch (err) {
        next(err);
    }
}

async function eliminarFutbolista(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

        const { id } = req.query;
        const resultado = await Jugador.findOneAndDelete({ id: parseInt(id) });

        if (resultado) {
            res.json({ mensaje: "Jugador eliminado correctamente" });
        } else {
            res.status(404).json({ error: "Jugador no encontrado" });
        }
    } catch (err) {
        next(err);
    }
}

async function insertarFutbolista(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

        const { nombre, apellido, posicion, dorsal, equipo, seleccion } = req.body;
        const nuevoJugador = new Jugador({ nombre, apellido, posicion, dorsal, equipo, seleccion });

        const resultado = await nuevoJugador.save();
        res.status(201).json({ mensaje: "Jugador insertado correctamente", id: resultado.id });
    } catch (err) {
        next(err);
    }
}

async function actualizarFutbolistaCompleto(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

        const { id } = req.query;
        const { nombre, apellido, posicion, dorsal, equipo, seleccion } = req.body;

        const jugadorActualizado = await Jugador.findOneAndUpdate(
            { id: parseInt(id) },
            { nombre, apellido, posicion, dorsal, equipo, seleccion },
            { new: true }
        );

        if (jugadorActualizado) {
            res.json({ mensaje: "Jugador actualizado correctamente", jugador: jugadorActualizado });
        } else {
            res.status(404).json({ error: "Jugador no encontrado" });
        }
    } catch (err) {
        next(err);
    }
}

async function actualizarFutbolistaParcial(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

        const { id } = req.query;
        const camposActualizar = req.body;

        const jugadorActualizado = await Jugador.findOneAndUpdate(
            { id: parseInt(id) },
            camposActualizar,
            { new: true }
        );

        if (jugadorActualizado) {
            res.json({ mensaje: "Jugador actualizado parcialmente", jugador: jugadorActualizado });
        } else {
            res.status(404).json({ error: "Jugador no encontrado" });
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    consultaFutbolista,
    eliminarFutbolista,
    insertarFutbolista,
    actualizarFutbolistaCompleto,
    actualizarFutbolistaParcial
};
