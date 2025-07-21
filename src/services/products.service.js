import * as Model from '../models/products.model.js'

export const getAllProducts = () => {
  return products;
};

export const getProductById = async (id) => {
  return products.find(product => product.id == id);
};

export const getFilteredProducts = () => {
  // Aquí tengo que implementar la lógica de filtrado.
  const productToFilterOut = Model.getAllProducts();
  return productToFilterOut.filter(productToFilterOut => productToFilterOut.price > 1500);
};
