const express = require('express');
const faker = require('faker');
const ProductsService = require('../services/products.service');
const ValidatorHandler = require('../middlewares/validator.handler');
const {
  createProdcutsSchema,
  updateProdcutsSchema,
  getProdcutsSchema,
} = require('../schema/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});
router.get('/filter', async (req, res) => {
  res.send('Yo soy un filter');
});
router.get(
  '/:id',
  ValidatorHandler(createProdcutsSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  ValidatorHandler(getProdcutsSchema, 'params'),
  async (req, res) => {
    const body = req.body;
    const newProd = await service.create(body);
    res.status(201).json(newProd);
  }
);
router.patch(
  '/:id',
  ValidatorHandler(getProdcutsSchema, 'params'),
  ValidatorHandler(updateProdcutsSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await service.delete(id);
  res.json(response);
});

module.exports = router;
