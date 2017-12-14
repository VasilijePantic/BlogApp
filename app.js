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

   // root route
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

// app.get("/sisajga", function(req, res){
//     Blog.create(
//         {
//             title: "Kotez", 
//             image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
//             body: "This is Kotez. No bathrooms,no water. Only Ice Neegruteen!"
//         }, function(err, blog){
//             if(err){
//                 console.log(err);
//                 res.send('Doslo je do greske');
//             } else {
//                 console.log("NEWLY CREATED BLOG");
//                 console.log(blog);
//                 res.send('Dodao sam novi blog');
//             }
//         });
// });


// APP LISTENER
app.listen(port=3000, function(){
   console.log("Blog server activated."); 
});
