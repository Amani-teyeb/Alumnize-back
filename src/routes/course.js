const express = require('express');
const router = express();
const { requireSignin, adminMiddleware } = require('../common-middleware')


const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const { addCourse, getCoursesBySlug, getAllCourses } = require('../controllers/course');

const storage = multer.diskStorage({
    destination: function (res, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})
const upload = multer({ storage });

router.post('/course/create', requireSignin, upload.single('url'), addCourse)
router.get('/courses/:slug', getCoursesBySlug)
router.get('/course/allcourses', getAllCourses)
module.exports = router;