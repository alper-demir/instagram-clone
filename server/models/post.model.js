import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    media: [{ type: String, required: true }],
    caption: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    savedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    active: { type: Boolean, default: true }
}, { timestamps: true })

export default mongoose.model("Post", PostSchema);