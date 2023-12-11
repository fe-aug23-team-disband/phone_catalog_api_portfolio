import express from 'express';
import {get, getByNamespaceId, getRecommended, getSpecials} from '../controllers/Product.controller'

const router = express.Router();

router.use(express.json());

router.get('/', get);

router.get('/:namespaceId', getByNamespaceId);

router.get('/:namespaceId/recommended/', getRecommended);

router.get('/specials/latest', getSpecials('latest'));

router.get('/specials/hot-price', getSpecials('discount'));

export default router
