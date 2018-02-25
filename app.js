var express    = require("express"),
app            = express(),
//to override PUT requrest because forms only support get/post request
methodOverride = require("method-override"),
//to make sure nobody passes JS code in our inputs
expressSanitizer = require("express-sanitizer"),
mongoose       = require("mongoose"),
bodyParser     = require("body-parser");


//CONNECTING mongoose,bodyParser and setting ejs
mongoose.connect("mongodb://localhost:27017/blog", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
app.use(expressSanitizer());//needs to go after bodyParser


//MODEL AND SCHEMA
var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {type: Date, default: Date.now} //setting date as a type of informaton given to "created" parameter
});
var Blog = mongoose.model("Blog", blogSchema);


//ROUTES - RESTfull

   // ROOT route
app.get("/", function(req, res) {
    res.redirect("/blogs");
})

   // INDEX - GET
app.get("/blogs", function(req, res){
   Blog.find({}, function(err, blogs){
      if(err){
         console.log("error");
      } else{
         res.render("index", {blogs: blogs});   
      }
   });
});

// NEW ROUTE - GET
app.get("/blogs/new", function(req, res){
    res.render("new");
});



// CREATE ROUTE 
app.post("/blogs", function(req, res){
    //santizie input
    req.body.blog.body = req.sanitize(req.body.blog.body);
    //create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else{    //redirect index
            res.redirect("/blogs");
        }
    });
});

// SHOW ROUTE - GET
app.get("/blogs/:id",function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            res.render("show", {blog: foundBlog});
        }
    });
});

// EDIT ROUTE - GET
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            res.render("edit", {blog: foundBlog});
        }
    });
});

// UPDATE ROUTE - PUT 
app.put("/blogs/:id", function(req, res){
    //santizie input
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            res.redirect("/blogs/" + req.params.id);
        }
    })
});

// DELETE ROUTE - DELETE
app.delete("/blogs/:id", function(req, res){
    //destroy  blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else{
            res.redirect("/blogs");
        }
    });
    //redirect to /blogs
});



// APP LISTENER
app.listen(process.env.PORT || 3000, function(){
   console.log("Blog server activated."); 
});
