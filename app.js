const express = require('express');
const mongoose = require('mongoose');
const blog_router = require('./routes/blogRoutes');
const favicon = require('serve-favicon');
const path = require('path'); 


const app = express();
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
app.use(express.static('public'));
app.use(blog_router);

const PORT = 4000;

const uri = 'mongodb+srv://smadzar90:<my-password>@cluster1.oqd2m1l.mongodb.net/blog-database?retryWrites=true&w=majority';
mongoose.connect(uri)
    .then((success) => {
        console.log("Successfully connected to MongoDB!");

        app.listen(PORT, 'localhost', () => {
            console.log(`Listening for requests on port ${PORT}`)
        });
    }).catch((err) => {
        console.log("Error connecting to MongoDB! " + err);
});

