import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    text: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
}, { timestamps: true })

export default mongoose.model("Comment", CommentSchema);