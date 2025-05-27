const express = require('express');
const { body, query } = require('express-validator');
const futbolistaController = require('../controller/futbolistaController');

const router = express.Router();

/**
 * @swagger
 * /futbolista:
 *   get:
 *     summary: Obtener uno o todos los futbolistas
 *     description: Devuelve un futbolista si se proporciona un ID, o todos si no se pasa ningún parámetro.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID del futbolista
 *     responses:
 *       200:
 *         description: Éxito. Retorna uno o varios futbolistas.
 *       400:
 *         description: Parámetro inválido.
 *       404:
 *         description: Futbolista no encontrado.
 */
router.get(
  '/',
  [
    query('id').optional().isInt().withMessage('El ID debe ser un número entero')
  ],
  futbolistaController.consultaFutbolista
);

/**
 * @swagger
 * /futbolista:
 *   delete:
 *     summary: Eliminar un futbolista por ID
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del futbolista a eliminar
 *     responses:
 *       200:
 *         description: Futbolista eliminado correctamente.
 *       400:
 *         description: Parámetro inválido.
 *       404:
 *         description: Futbolista no encontrado.
 */
router.delete(
  '/',
  [
    query('id').isInt().withMessage('El ID debe ser un número entero')
  ],
  futbolistaController.eliminarFutbolista
);

/**
 * @swagger
 * /futbolista:
 *   post:
 *     summary: Insertar un nuevo futbolista
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Futbolista'
 *     responses:
 *       201:
 *         description: Futbolista insertado correctamente.
 *       400:
 *         description: Datos inválidos.
 */
router.post(
  '/',
  [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('apellido').notEmpty().withMessage('El apellido es obligatorio'),
    body('posicion').notEmpty().withMessage('La posición es obligatoria'),
    body('dorsal').isInt().withMessage('El dorsal debe ser un número'),
    body('equipo').notEmpty().withMessage('El equipo es obligatorio'),
    body('seleccion').notEmpty().withMessage('La selección es obligatoria')
  ],
  futbolistaController.insertarFutbolista
);

/**
 * @swagger
 * /futbolista:
 *   put:
 *     summary: Actualizar completamente un futbolista
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del futbolista a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Futbolista'
 *     responses:
 *       200:
 *         description: Futbolista actualizado correctamente.
 *       400:
 *         description: Datos inválidos.
 *       404:
 *         description: Futbolista no encontrado.
 */
router.put(
  '/',
  [
    query('id').isInt().withMessage('El ID debe ser un número entero'),
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('apellido').notEmpty().withMessage('El apellido es obligatorio'),
    body('posicion').notEmpty().withMessage('La posición es obligatoria'),
    body('dorsal').isInt().withMessage('El dorsal debe ser un número'),
    body('equipo').notEmpty().withMessage('El equipo es obligatorio'),
    body('seleccion').notEmpty().withMessage('La selección es obligatoria')
  ],
  futbolistaController.actualizarFutbolistaCompleto
);

/**
 * @swagger
 * /futbolista:
 *   patch:
 *     summary: Actualizar parcialmente un futbolista
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del futbolista a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre: { type: string }
 *               apellido: { type: string }
 *               posicion: { type: string }
 *               dorsal: { type: integer }
 *               equipo: { type: string }
 *               seleccion: { type: string }
 *     responses:
 *       200:
 *         description: Futbolista actualizado parcialmente.
 *       400:
 *         description: Datos inválidos.
 *       404:
 *         description: Futbolista no encontrado.
 */
router.patch(
  '/',
  [
    query('id').isInt().withMessage('El ID debe ser un número entero'),
    body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
    body('apellido').optional().notEmpty().withMessage('El apellido no puede estar vacío'),
    body('posicion').optional().notEmpty().withMessage('La posición no puede estar vacía'),
    body('dorsal').optional().isInt().withMessage('El dorsal debe ser un número'),
    body('equipo').optional().notEmpty().withMessage('El equipo no puede estar vacío'),
    body('seleccion').optional().notEmpty().withMessage('La selección no puede estar vacía')
  ],
  futbolistaController.actualizarFutbolistaParcial
);

module.exports.router = router;
