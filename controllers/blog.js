const Blog = require("../models/blog.js");
module.exports.getall= (req, res) => {
  let query = Blog.find({});
  query.exec((err, Blogs) => {
    if(err) res.send(err);
    res.json(Blogs);
});
};
module.exports.createNew= (req, res) => {
  var blog = new Blog({
...req.body,
author:"Declan rice"
  });
  blog.save(((err,blog) => {
    if(err) {
        res.send(err);
    }
    else {
        res.json({message: "Blog successfully added!", blog });
    }
}))
};
module.exports.commentblog= async (req, res) => {
  const {id}=req.params;
  const {comment}=req.body;
  const commentedBlog=await Blog.findByIdAndUpdate(id,{
 $push:{
   comments:{
     user:user.user_id,
     comments:comment,
   }
  } 
},{new:true});
  res.send(commentedBlog);
};
module.exports.likeblog= async (req, res) => {
  const {id}=req.params;
  const blog=await Blog.findById(id);
  const us=req.user.user_id;
if(blog && !blog.like.includes(req.user.user_id)){
 const likedBlog= await Blog.findByIdAndUpdate({_id:id},{
   $push:{like:req.user.user_id}
  },{new:true});
   res.json({message:"liked",likedBlog});
}
};
module.exports.getone = async (req, res) => {
  try {
    Blog.findById(req.params.id, (err, blog) => {
      if(err) res.send(err);
      res.json(blog);
  }); 
  } catch {
    res.status(404);
    res.send({ error: "Blog doesn't exist!" });
  }
}
module.exports.updateblog=  (req, res) => {
  try {
    Blog.findById({_id: req.params.id}, (err, blog) => {
      if(err) res.send(err);
      Object.assign(blog, req.body).save((err, blog) => {
        if(err) {res.send(err)};
          res.json({ message: 'Blog updated!', blog });
      });
  });
    } catch {
      res.status(404);
    res.send({ error: "Blog doesn't exist!" });
  }
};
module.exports.deleteblog=(req, res) => {
     Blog.deleteOne({ _id: req.params.id }, (err, result) => {
      res.json({ message: "Blog successfully deleted!", result });    
});
}
    // export{createNew,updateblog,deleteblog,likeblog,getall,getone,commentblog}
