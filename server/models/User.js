import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String
    },
    role: {
        type: String,
        default: 'guest'
    }
});

export default mongoose.model('User', userSchema);