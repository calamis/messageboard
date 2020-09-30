const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        unique: true,
        trim: true,
        maxlength: [40, 'Title cannot be more than 40 Characters']
    },
    description: {
        type: String,
        required: true,
        maxlength: [200, 'Description cannot be more than 200 Characters']
    }
}, {
    timestamps: { currentTime: () => Math.floor(Date.now()) }
});

// module.exports = mongoose.model('Note', NoteSchema);

export default (mongoose.models && mongoose.models.Note
    ? mongoose.models.Note
    : mongoose.model('Note', NoteSchema));