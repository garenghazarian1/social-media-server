import Post from "../models/PostModel.js";

// CREATE COMMENT
export const addComment = async (req, res) => {
    try {
        console.log("add comment here", req.body);
        const { postID, userID, comment } = req.body;

        // Corrected method name from findByIdAnsUpdate to findByIdAndUpdate
        const post = await Post.findByIdAndUpdate(
            postID,
            { $push: { comments: { text: comment, commenter: userID } } },
            { new: true }
        ).populate("comments.commenter", "name")

        res.json({ success: true, post });
    } catch (error) {
        console.error("Error adding comment:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

// DELETE COMMENT
export const deleteComment = async (req, res) => {
    try {
        console.log("delete comment here", req.body);
        const { postID, commentID } = req.body;
        const post = await Post.findByIdAndUpdate(
            postID,
            { $pull: { comments: { _id: commentID } } },
            { new: true }
        );
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        res.json({ success: true, post  });
    } catch (error) {
        console.error("Error adding comment:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};



