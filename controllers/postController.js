import Post from "../models/PostModel.js";

//CREATE POST******************************
export const addPost = async (req, res) => {
    try {
        //console.log("add post here", req.body);
        //console.log("file is ", req.file);

        if (req.file) req.body.image = req.file.path;

        //const newPost = await Post.create(req.body);
        const newPost = await (await Post.create(req.body)).populate({path: 'nameId', select: 'name username email image'})
        //console.log("🚀 ~ addPost ~ newPost:", newPost);
        res.json({success: true, post: newPost});
    } catch (error) {
        console.error("Error creating post:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

//GET POST******************************
export const getAll = async (req, res) => {
    try {
        //console.log("get all posts");
        const posts = await Post.find().populate('nameId', 'name createdAt')
        .populate('comments.commenter', "name")
        .sort('-_id');
        res.json({success: true,  posts});
    } catch (error) {
        console.error("Error creating post:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

//DELETE POST******************************
export const deletePost = async (req, res) => {
    try {
        //const postId = req.params.postId
        const { postId } = req.params;
        //console.log("req", req.params);
        
        await Post.findByIdAndDelete(postId);
        res.json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
        console.error("Error deleting post:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

//UPDATE POST******************************
export const likePost = async (req, res) => {
    try {
        console.log("handle here", req.body);
        const post = await Post.findOne({
        _id: req.body.postID,
        likes: req.body.userID});

        let likedPost

        console.log("🚀 post:", post);
        if (!post) {
           console.log("🚀 post has NOT been liked:")
           likedPost = await  Post.findByIdAndUpdate(req.body.postID ,{ $addToSet : {likes: req.body.userID}}, {new:true} );
           console.log("🚀likedPost:", likedPost)
           
        } else{
            console.log("🚀 post has  been liked:");
             likedPost = await  Post.findByIdAndUpdate(req.body.postID ,{ $pull : {likes: req.body.userID}}, {new:true} );
           console.log("🚀 likePost:", likedPost)
        }
      
          res.send({ success: true, post: likedPost });
    } catch (error) {
        console.error("Error updating post:", error.message); 
        res.status(500).json({ success: false, error: error.message });
    }
};






