import express from 'express';
import { get, getByNamespaceId, getHotPrice, getLatest } from '../controllers/Product.controller'

const router = express.Router();

router.use(express.json());

router.get('/', get);

router.get('/:namespaceId', getByNamespaceId);

router.get('/specials/latest', getLatest);

router.get('/specials/hot-price', getHotPrice);

export default router
