import { prisma } from "@/lib/prisma";

export const createProduct = async (data) => {
  return prisma.product.create({
    data,
  });
};

export const getProductsByOrganization = async (organizationId) => {
  return prisma.product.findMany({
    where: { organizationId },
    orderBy: { createdAt: "desc" },
  });
};

export const getProductById = async (id) => {
  return prisma.product.findUnique({
    where: { id },
  });
};

export const updateProduct = async (id, data) => {
  return prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id) => {
  return prisma.product.delete({
    where: { id },
  });
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

export const getDashboardStats = async (organizationId) => {
  const products = await prisma.product.findMany({
    where: { organizationId },
  });

  return products;
};
