Blog App
Hi,there this is a blog website build using MERN stack, MongoDB, Express js, React js and Node js... followed by a CRUD operations.


Table of Contents
1.Features
2.Technologies
3.Installation
4.Usage
5.API Endpoints
6.UI example and screenshots

Features
1.User authentication with JWT(JSON web Tokens)
2.Create,Read,Update and Delete blog posts
3.Commenting on posts
4.User profile Management
5.Responsive design 

Technologies
1.Front-End:React js,CSS, react-router,axios
2.Backend:Node js, Express js
3.Database: MongoDB Atlas, moongoose
4.Authentication:JWT, bcrypt.js

Installation
1.Prerequisties
   Node js
   Visual studio code editor

 2.For Backend
   a.Clone the repository
   b.navigate to server
   c.Install dependencies
       (npm 
   d.Make .env file with mongo_db_url and aws_authentication_key
   e.run server (npm start)

   3.For Frontend
    a.navigate to client
    b.npm run start


   ( Your application should be running on loclhost://3000 and backend running on localhost://5000)

    Usage
    1.Register: Navigate to /register to create a new account.
    2.Login: Navigate to /login to sign in.
    3.Create Post: Go to /posts/new to write a new blog post
    4.View Posts: Access all posts at /posts.
    5.Profile: Manage your profile and view your posts at /profile

    API Endpoints
    Authentications
       a.POST /api/auth/register - Register a new user
        b.POST /api/auth/login - Login a user
   Login
      a.GET /api/posts - Get all posts
      b.POST /api/posts - Create a new post
      c.GET /api/posts/:id - Get a single post by ID
      d.PUT /api/posts/:id - Update a post by ID
      e.DELETE /api/posts/:id - Delete a post by ID


Screenshots of UI
  



   
   Vi
