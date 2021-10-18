import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    commenterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    articleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model('Comment', commentSchema);