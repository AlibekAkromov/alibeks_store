/** @format */

import express from 'express';
import {
    createCategory,
    deleteCategory,
    postCategory,
    updateCategory,
} from '../controllers/category.js';

const router = express.Router();

router.get('/category', createCategory);

router.post('/category', postCategory);

router.patch('/category/:id', updateCategory);

router.delete('/category/:id', deleteCategory);

export default router;
