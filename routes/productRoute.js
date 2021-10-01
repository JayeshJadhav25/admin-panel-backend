const express =  require('express');
const router = express.Router();
const checkAuth = require('../auth/checkAuth');

const multer = require('multer');


//middleware for storing images in upload folder using multer
const storage = multer.diskStorage({
    destination: (req,file,cb) => { 
      console.log(file)
      cb(null, 'upload');
    },
    filename: (req,file,cb) => {
      
      cb(null,Date.now() + file.originalname);
    }
  })


const productController = require('../controllers/productController')


router.get('/getProductById/:id',checkAuth,productController.getProductById);

router.put('/assignProduct/:id', checkAuth,productController.assignProduct)

router.post('/addProduct',checkAuth,multer({storage: storage}).single('files'),productController.addProduct )


router.get('/getProducts',checkAuth, productController.getProducts)


router.delete('/deleteProduct/:id',checkAuth,productController.deleteProduct)

module.exports = router;