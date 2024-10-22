/** @format */

import express from 'express';
import Product from '../schemas/Product.js';
import {upload} from "../utils/multer.js"
const router = express.Router();


router.get('/products',  async (req, res, next) => {
    try {
       
        // many to One
        const products = await Product.find().populate([{path :"categoryId" , select : 'title -_id description'}]);
        res.status(200).send({ data: products });
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
});


router.post("/products" , upload.array('images') ,  async (req, res, next) => {
    try {
        const images =  req.files.map((file) => file.filename)
        console.log(images);
        if(images.length === 0) {
           return  res.status(400).send({ message :"Images required"})
        }
        const product =  new Product({...req.body , images});
        await product.save()
        res.status(201).send({ data: product });
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
})

export default router;
