import {
  createProduct,
  deleteProduct,
  getProductById,
  getProductsByOrganization,
  updateProduct,
} from "@/repositories/product.repository";

export const createProductService = async (data, user) => {
  return createProduct({
    ...data,
    organizationId: user.organizationId,
  });
};

export const getProductsService = async (user) => {
  return getProductsByOrganization(user.organizationId);
};

export const updateProductService = async (id, data, user) => {
  const product = await getProductById(id);

  if (!product || product.organizationId !== user.organizationId) {
    throw new Error("Product not found or unauthorized");
  }

  return updateProduct(id, data);
};

export const deleteProductService = async (id, user) => {
  const product = await getProductById(id);

  if (!product || product.organizationId !== user.organizationId) {
    throw new Error("Product not found or unauthorized");
  }

  return deleteProduct(id);
};
