const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const JugadorSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    posicion: { type: String, required: true },
    dorsal: { type: Number, required: true },
    equipo: { type: String, required: true },
    seleccion: { type: String, required: true } // Nuevo campo
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.__v;
        }
    }
});

JugadorSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('Jugador', JugadorSchema);
