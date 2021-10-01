const express =  require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const checkAuth = require('../auth/checkAuth');


router.post('/create',userController.addUser)

router.post('/login',userController.login)

router.get('/get',checkAuth,userController.getUsers)


module.exports = router;
