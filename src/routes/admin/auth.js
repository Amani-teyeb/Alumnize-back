const express = require('express');
const { signup, signin, signout } = require('../../controllers/admin/auth');
const router = express();


router.post('/admin/signin', signin)

router.post('/admin/signup', signup)
router.post('/admin/signout', signout)

module.exports = router;