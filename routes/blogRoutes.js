const express = require('express');
const multer = require('multer');
const blog_controller = require('../controllers/blogControllers.js');


const router = new express.Router();
const upload = multer();

router.get('/', blog_controller.blog_display);
router.get('/post/:id', blog_controller.blog_details_and_comments);
router.get('/about-us', blog_controller.blog_about_us);
router.get('/add-post', blog_controller.display_add_post);
router.post('/add-post', upload.none(), blog_controller.add_post_to_DB);
router.put('/comments/:id', upload.none(), blog_controller.add_comment);

router.use(blog_controller.blog_error);

module.exports = router;