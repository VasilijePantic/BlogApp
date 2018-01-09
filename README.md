BlogApp is a simple project created in Express with a lot of CSS styling using Semantic UI. App follows RESTfull convention and it is a CRUD App. The App stores Blog post information using MongoDB.

It is supposed to be a simple Blog page where you can add a Blog with 3 parameters - Title, Image and Blog Content(description).

You basically have 2 pages on the App and you can swich between them using 2 buttons on a navbar on the top.

First page is a Home page where all the blogs are displayed along with their Title,Date of the upload,Image,Short Description and a "Read More" button.

Second page is a New Blog page. There, you are able to create a new blog and submit it. The form is sanitized so you are not able to enter JS code in it.

By clicking "Read More" button on a specific blog on a home page, you will be taken to that Blog post Show page and you will be able to see all the content,including full Blog content description. There are also 2 buttons bellow the Blog post.

Edit button lets you edit a specific Blog post however you like and when you submit the changes,you will be returned to that specific Show page of the blog.

Delete button ables you delete a Blog post. That blog post will also be deleted from the Database.

This app is my first project that combines Express, REST routes and MongoDB with some extensive styling and it is a part of my learning process using Udemy's "Web Developer Bootcamp" course.




