/** @format */

import Category from '../schemas/Category.js';
export async function createCategory(req, res, xt) {
    try {

        console.log("hello");
        const category =  Category.find()
        const data  =  await category.populate('products' , "name  -_id price -categoryId");
        

        res.status(200).send({ data });
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
}

export async function postCategory(req, res, xt) {
    try {
        const titleExists = await Category.findOne({ title: req.body?.title });
        if (titleExists) {
            return res.status(400).send({ msg: 'Category already exists', success: false });
        }
        const category = new Category(req.body);
        await category.save();
        res.status(201).send({ data: category, msg: 'Category saved successfully' });
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
}


export async function updateCategory(req, res, xt) {
    try {
        const { id } = req.params;
        const titleExists = await Category.findOne({ title: req.body?.title });
        if (titleExists) {
            return res.status(400).send({ msg: 'Category already exists', success: false });
        }
        const category = await Category.findByIdAndUpdate(id, { ...req.body }, { new: true });

        res.status(201).send({ data: category, msg: 'Category updated successfully' });
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
}

export async function deleteCategory(req, res, xt) {
    try {
        const { id } = req.params;

        const category = await Category.findByIdAndDelete(id, { new: true });

        if (!category) {
            return res.status(404).send({ msg: 'Category not found', success: false });
        }
        res.status(201).send({ data: category, msg: 'Category updated successfully' });
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
}
