var express    = require("express"),
app            = express(),
mongoose       = require("mongoose"),
bodyParser     = require("body-parser");


//CONNECTING mongoose,bodyParser and setting ejs
mongoose.connect("mongodb://localhost:27017/blog", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));


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
    //create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else{    //redirect index
            res.redirect("/blogs");
        }
    });
});



// APP LISTENER
app.listen(port=3000, function(){
   console.log("Blog server activated."); 
});
