import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Comment from "../models/comment.model.js";

export const getTimelinePosts = async (req, res) => {
    const { userId } = req.params;
    console.log(req.params);

    const { page = 1, limit = 10 } = req.query;  // Sayfa numarası ve kaç post çekileceği

    console.log("API Request:", userId, page, limit);  // Hata ayıklama için

    try {
        const user = await User.findById(userId);
        if (!user) {
            console.log("User not found:", userId);
            return res.status(404).json({ message: "User not found" });
        }

        // Kullanıcının takip ettiği kişilerin ID'lerini al
        const followingIds = user.followings;

        // Eğer kullanıcı kimseyi takip etmiyorsa boş döndür
        if (followingIds.length === 0) {
            return res.status(200).json({ posts: [] });
        }

        // Takip edilen kişilerin postlarını al (pagination ile)
        const posts = await Post.find({ userId: { $in: followingIds } }).populate({ path: "userId", select: ["profilePicture", "username"] })
            .sort({ createdAt: -1 })  // En yeni postlar en üstte
            .skip((page - 1) * limit) // Sayfalama için kaç post atlanacak
            .limit(Number(limit));    // Kaç post çekilecek

        console.log("Fetched posts:", posts.length);

        return res.status(200).json({ posts });
    } catch (error) {
        console.error("Error in getTimelinePosts:", error); // Terminale yazdır
        return res.status(500).json({ message: "Error getting timeline posts", error });
    }
};

export const createPost = async (req, res) => {
    const { userId, media, caption } = req.body;

    if (!userId || !media || !caption) {
        console.log(userId, media, caption);

        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        const post = await Post.create({ userId, media, caption });
        if (post) {
            const updatedUserWithPost = await User.findByIdAndUpdate(userId, { $push: { posts: post._id } });
            if (!updatedUserWithPost) {
                res.status(500).json({ message: "Error create post", error });
            }
        }

        res.status(201).json({ message: "User registered successfully!" });

    } catch (error) {
        res.status(500).json({ message: "Error create post", error });
    }
}

export const updatePost = async (req, res) => { // Only caption can be updated, not media.
    const { postId } = req.params;
    const { caption } = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(postId, { caption });
        if (!updatedPost) { return res.status(404).json({ message: "Post update error" }); }
        res.status(200).json({ message: "Post updated successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error update post", error });
    }
}

export const deletePost = async (req, res) => {
    const { postId } = req.params;
    try {
        await Post.findByIdAndUpdate(postId, { active: false });
        res.status(204).json({ message: "Post deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error delete post", error });
    }
}

export const getOnePost = async (req, res) => {
    const { postId, userId } = req.params;
    try {
        const post = await Post.findById(postId)
            .populate([
                { path: "userId", select: ['username', 'profilePicture'] },
                { path: "likes", select: "username profilePicture" },
                { path: "comments", populate: [{ path: "userId", select: ['profilePicture', 'username'] }, { path: "likes", select: "username profilePicture" }] }
            ]);
        if (!post) { return res.status(404).json({ message: "Post not found" }); }
        const user = await User.findById(userId);
        const isSaved = user.savedPosts.includes(postId);

        res.status(200).json({ post, isSaved: !!isSaved });
    } catch (error) {
        res.status(500).json({ message: "Error getting post", error });
    }
}

export const createComment = async (req, res) => {
    const { postId } = req.params;
    const { userId, text } = req.body;

    if (!postId || !userId || !text) { return res.status(400).json({ message: "All fields are required!" }); }

    try {
        const comment = await Comment.create({ postId, userId, text });
        if (comment) {
            const updatedPostWithComment = await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
            const updatedUserWithComment = await User.findByIdAndUpdate(userId, { $push: { comments: comment._id } });
            if (!updatedUserWithComment && !updatedPostWithComment) {
                res.status(500).json({ message: "Error create comment", error });
            }
        }

        res.status(201).json({ message: "Comment created successfully!" });

    } catch (error) {
        res.status(500).json({ message: "Error create comment", error });
    }
}

export const likePost = async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.body;
    console.log(postId, userId);

    try {
        const post = await Post.findById(postId).populate({ path: "userId", select: ["profilePicture", "username"] });

        if (!post) return res.status(404).json({ message: "Post not found" });

        const liked = post.likes.includes(userId);

        if (liked) {
            // Post'tan kaldır
            post.likes = post.likes.filter(id => id.toString() !== userId);
        } else {
            // Post'a ekle
            post.likes.push(userId);
        }

        await post.save();

        res.status(200).json({
            message: liked ? "Like removed" : "Post liked",
            likes: post.likes.length,
            updatedPost: post
        });
    } catch (error) {
        res.status(500).json({ message: "Error liking post", error });
    }
};

export const savePost = async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);
        let updatedPost = {}
        if (!user) return res.status(404).json({ message: "User not found" });

        const saved = user.savedPosts.includes(postId);
        if (saved) {
            user.savedPosts = user.savedPosts.filter(id => id.toString() !== postId);
            updatedPost = await Post.findByIdAndUpdate(postId, { $pull: { savedBy: userId } }, { new: true }).populate({ path: "userId", select: ["username", "profilePicture"] })
        } else {
            user.savedPosts.push(postId);
            updatedPost = await Post.findByIdAndUpdate(postId, { $push: { savedBy: userId } }, { new: true }).populate({ path: "userId", select: ["username", "profilePicture"] })
        }
        await user.save();

        res.status(200).json({
            message: saved ? "Post unsaved" : "Post saved",
            isSaved: !saved,  // Güncellenen kaydetme durumunu döndürüyoruz
            updatedPost
        });
    } catch (error) {
        res.status(500).json({ message: "Error saving post", error });
    }
};

export const likeComment = async (req, res) => {
    const { commentId } = req.params;
    const { userId } = req.body;

    try {
        const comment = await Comment.findById(commentId);
        if (!comment) return res.status(404).json({ message: "Comment not found" });

        const liked = comment.likes.includes(userId);

        if (liked) {
            comment.likes = comment.likes.filter(id => id.toString() !== userId);
        } else {
            comment.likes.push(userId);
        }

        await comment.save();

        res.status(200).json({
            message: liked ? "Like removed" : "Comment liked",
            likes: comment.likes.length
        });
    } catch (error) {
        res.status(500).json({ message: "Error liking comment", error });
    }
};