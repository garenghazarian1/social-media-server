import mongoose from "mongoose";

const {Schema} = mongoose;
const postSchema = new Schema({
    title: {type: String, required: true},
    date: {type: String, required: false},
    content: {type: String, required: false},
    image: {type: String, required: false },
    nameId:{type:mongoose.Schema.Types.ObjectId, ref: "Auth"},
    likes:[ {type:mongoose.Schema.Types.ObjectId, ref: "Auth"}],
    comments:[
        {
            text: { type: String ,required :true}, 
            commenter: { type: mongoose.Schema.Types.ObjectId,ref:"Auth" } 
        }
    ],

    imagePublicId: { type: String, required: false }, // Field to store Cloudinary image public ID
},
            {timestamps: true} //creates createdAt and updatedAt fields
);

const Post = mongoose.model('Post', postSchema);

export default Post;