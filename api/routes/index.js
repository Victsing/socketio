const { Router } = require('express');
const controllers = require('../controllers');
const {authenticationToken, authenticationRefreshToken} = require("../middleware");
const router = Router();

router.get('/', (req, res) => res.send('This is root!'))
router.get('/me', authenticationToken, (req, res) =>{res.send(req.user)})

router.post('/users/post', controllers.createUser)
router.get('/users/get-all', controllers.getAllUsers)
router.get('/users/get/:id', controllers.getUserById)
router.put('/users/update/:id', controllers.updateUser)
router.delete('/users/delete/:id', controllers.deleteUser)
router.post('/login', controllers.authenticate)


module.exports = router