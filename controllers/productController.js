const Products = require('../models/product');
const Users = require('../models/user');

const addProduct = async (req,res) => {
 
    try {

        const url = req.protocol + '://' + req.get("host");
        const fileUrl = url + '/upload/' + req.file.filename
        const fileType = req.file.mimetype
        
        let product = new Products({
            title: req.body.title,
            type: req.body.type,
            description:req.body.description,
            cover:fileUrl,
            price:req.body.price,
            rating:req.body.rating,
            fileType:fileType
        })

        product = await product.save();
        res.status(201).json(product)
    } catch(err) {
        console.log(err)
        res.status(400).json(err);
    }
}


const getProducts = async (req,res) => {
    try {
        let products = await Products.find();
        res.status(200).json(products);
    } catch(err) {
        res.status(500).json(err)
    }
} 

const deleteProduct = async (req,res) => {
    try {
        const id = req.params.id;

        const product = await Products.findById(id);

        if(!product) {
           return res.json({
                message:'No Product Found'
            })
        }
        await product.remove();
        res.status(200).json({
            message:'Product deleted Succesfully'
        })

    } catch(err) {
        res.status(500).json('Server error');
    }
}

const getProductById = async( req,res) =>{
    try {
        
        const product = await Products.findById( req.params.id );
        if( !product ){
           return res.status(404).json({msg:'No proudct found..!!'})
        }
        res.json( product )

    } catch (err) {
        res.status(500).json("Server error")
    }
}

const assignProduct = async( req,res) =>{
    try {
        const user = await Users.findOne({user:req.params.id} );
        for(i in user.products) {
            if(user.products[0].id.toString() == req.body.pid) {
                return res.status(400).json({
                    message:"Product already assigned"
                });
            }
        }
        
        user.products.unshift( {id: req.body.pid} );
        await user.save();

        res.json( user );
    } catch (err) {
        res.status(500).json("Server error");
    }
}

module.exports = {
    addProduct,
    getProducts,
    deleteProduct,
    getProductById,
    assignProduct
}