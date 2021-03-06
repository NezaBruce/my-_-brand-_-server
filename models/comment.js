import mongoose from "mongoose"
const commentSchema = new mongoose.Schema({
    comment: {type: String},
    created: {type: Date, default: Date.now},
    blog: { type: mongoose.Types.ObjectId, ref: 'blog' }
});

var comment = mongoose.model('comment', commentSchema);

export default comment;