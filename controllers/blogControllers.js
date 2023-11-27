const Post = require('../models/Post.js');


// Display all the posts
const blog_display = (request, response) => {
    Post.find().sort({ date: -1 }).then((posts) => {
        response.render('pages/index', { title: 'Posts', posts });

    }).catch((err) => {
        console.log("Error occured while fetching data from DB " + err);
        response.status(500).send('Internal Server Error');
    });
};

// Display error page
const blog_error = (request, response) => {
    response.status(404).render('pages/404', { title: '404 Not Found' });
};

// Display post details and comments
const blog_details_and_comments = (request, response) => {
    Post.findById(request.params.id).then((post) => {
        post.comments.sort(function(a, b) {
            return b.date - a.date;
        });
        response.render('pages/post_details', { title: 'Details', post});
    }).catch((err) => {
        console.log("Error occured while fetching data from DB " + err);
        response.status(500).send('Internal Server Error');
    });
};

// Add comment to the post
const add_comment = (request, response) => {
    async function updateComments() {
        try {
            const comment = {
                author: request.body.author,
                text: request.body.comment,
                date: new Date(),
            }
            const filter = { _id: request.params.id };
            const update = { $push: {
                comments: comment,
            }};

            const post_doc = await Post.findOneAndUpdate(filter, update);
            response.json({comment: comment});
        }
        catch(err) {
            console.log("Error occured while updating data in DB " + err);
            response.status(500).send('Internal Server Error');
        }
    }
    updateComments();
};

// Display About-Us
const blog_about_us = (request, response) => {
    response.render('pages/about_us', { title: "About Us"})
}

//Display Add Post page
const display_add_post = (request, response) => {
    response.render('pages/add_post', {title: "Add Post"});
}

//Add a post to DB
const add_post_to_DB = (request, response) => {
    const newPost = new Post({
        title: request.body.title,
        author: request.body.author,
        body: request.body.body,
        date: new Date(),
        category: request.body.category,
        comments: [],
    });

    newPost.save().then((success) => {
        response.redirect("/");
    }).catch((err) => {
        console.log("Error occured while updating data in DB " + err);
        response.status(500).send('Internal Server Error');
    })
}

module.exports = { 
    blog_display, 
    blog_error, 
    blog_details_and_comments, 
    add_comment,
    blog_about_us,
    display_add_post,
    add_post_to_DB
};




