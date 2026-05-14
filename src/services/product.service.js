import {
  createProduct,
  deleteProduct,
  getDashboardStats,
  getProductById,
  getProductsByOrganization,
  updateProduct,
} from "@/repositories/product.repository";
import { getSettings } from "@/repositories/settings.repository";

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

export const getDashboardService = async (user) => {
  const products = await getDashboardStats(user.organizationId);

  const settings = await getSettings(user.organizationId);

  const defaultThreshold = settings?.defaultLowStockThreshold ?? 5;

  let totalProducts = products.length;
  let totalQuantity = 0;

  const lowStockItems = [];

  for (let product of products) {
    totalQuantity += product.quantity;

    const threshold = product.lowStockThreshold ?? defaultThreshold;

    if (product.quantity <= threshold) {
      lowStockItems.push({
        id: product.id,
        name: product.name,
        sku: product.sku,
        quantity: product.quantity,
        lowStockThreshold: threshold,
      });
    }
  }

  return {
    totalProducts,
    totalQuantity,
    lowStockItems,
    defaultThreshold,
  };
};
