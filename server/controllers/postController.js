import { errorHandler } from "../utils/error.js";
import Post from "../models/Post.js"

{/*export const createPost = async ( req, res, next ) => {
    console.log(req.user);

    if (!req.user.isAdmin){
        return next(errorHandler(403, 'You are not allowed to create a post'));
    }

    if(!req.body.title || !req.body.content)
    {
        return next(errorHandler( 400,' Please provide all the required fields'));
    }

    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-z0-9-]/g,'-');
    const newPost = new Post({
        ...req.body,
         slug, 
         userId : req.user.id,
    });

    try{
     const savedPost = await newPost.save();
     res.status(201).json(savedPost);
    }
    catch(error){
        next(error);

    }
};

import { errorHandler } from "../utils/error.js";
import Post from "../models/Post.js";

export const createPost = async (req, res, next) => {
    console.log(req.user);

    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create a post'));
    }

    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Please provide all the required fields'));
    }

const slug = req.body.title
  .split(' ')
  .join('-')
  .toLowerCase()
  .replace(/[^a-zA-Z0-9-]/g, '-');

const newPost = new Post({
  title: req.body.title,
  content: req.body.content,
  category: req.body.category || 'uncategorized',
  // image: req.body.image || <-- no need here if mongoose default is set
  slug,
  userId: req.user.id,
});


    try {
        const savedPost = await newPost.save();

        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            slug: savedPost.slug,
            post: savedPost,
        });
    } catch (error) {
        next(error);
    }
};*/}


export const createPost = async (req, res, next) => {
  console.log(req.user); // Debug: log the user from middleware

  // Check for admin privileges
  if (!req.user?.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a post'));
  }

  // Basic validation
  const { title, content, category, image } = req.body;
  if (!title || !content) {
    return next(errorHandler(400, 'Please provide all the required fields'));
  }

  // Generate slug
  const slug = title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-');

  // Prepare post data
  const postData = {
    title,
    content,
    category: category?.trim() || 'uncategorized',
    image: image?.trim() || 'data:image/jpeg;base64,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',
    slug,
    userId: req.user.id,
  };

  try {
    const savedPost = await new Post(postData).save();

    // Structured response
    res.status(201).json({
      success: true,
      slug: savedPost.slug,
      post: savedPost,
    });
  } catch (err) {
    next(err);
  }
};


//getting posts on dashboard

export const getPosts = async ( req, res, next ) => {

    try{
        const startIndex =  parseInt(req.query.startIndex) || 0 ;
        const limit =  parseInt(req.query.limit) || 9 ;
        const sortDirection =  req.query.order === 'asc' ? 1 : -1 ;
        
        const posts =await Post.find({
            ...(req.query.userId && { userId : req.query.userId }),
            ...(req.query.category && { category : req.query.category}),
            ...(req.query.slug&& { slug: req.query.slug }),
            ...(req.query.postId && { _id : req.query.postId }),
            ...(req.query.searchTerm && {
                 $or : [
                    { title : { $regex : req.query.searchTerm, $options : 'i'}},
                    { content : { $regex : req.query.searchTerm, $options : 'i'}},
                 ],
                }),
    }). sort( { updatedAt : sortDirection }).skip(startIndex).limit(limit);

        const totalPosts = await Post.countDocuments();
        
        const now = new Date();

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const lastMonthPosts = await Post.countDocuments({
            createdAt : { $gte : oneMonthAgo },
        });

        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts
        });
    }
    catch(error){
        next(error);
    }
};

export const deletePost = async (req,res,next) => {
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(errorHandler(403,'You are not allowed to delete the post'));
    }
      try{
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json({message : 'The post has been deleted'});
      }
      catch (error){
        next(error);
      }
};

export const updatePost = async ( req, res, next ) => {
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(errorHandler( 403, ' You are not allowed to delete the post'));
    }
    try{
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId, 
            {
                $set : {
                    title : req.body.title,
                    content : req.body.content,
                    category : req.body.category,
                    image : req.body.image,
                }
            } , { new : true}
        )
        res.status(200).json(updatedPost);
    }
    catch(error){
        next(error);
    }
}