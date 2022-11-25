const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {
  constructor() {
    this.products = [];
    this.generateRandom();
  }

  generateRandom() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isPrivate: faker.datatype.boolean(),
      });
    }
  }

  async find() {
    return this.products;
  }

  async findOne(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound(`Product with id ${id} not found`);
    }
    if ( product.isPrivate) {
      throw boom.forbidden(`Product with id ${id} is private`);
    }
    return product;
  }

  async create(data) {
    const newProd = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProd);
    return newProd;
  }
  async update(id, changes) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw boom.notFound(' Product not found');
    }

    const product = this.products[productIndex];

    this.products[productIndex] = {
      ...product,
      ...changes,
    };

    return this.products[index];
  }
  async delete() {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw boom.notFound(' Product not found');
    }
    this.products[productIndex].splice(productIndex, 1);
    return { id };
  }
}

module.exports = ProductsService;
