import express from 'express';
import { get, getByNamespaceId, getHotPrice, getLatest } from '../controllers/Product.controller'

const router = express.Router();

router.use(express.json());

router.get('/', get);

router.get('/:namespaceId', getByNamespaceId);

router.get('/latest', getLatest);

router.get('/hot-price', getHotPrice);

export default router
