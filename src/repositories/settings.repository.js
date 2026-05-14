import { prisma } from "@/lib/prisma";

export const getSettings = async (organizationId) => {
  return prisma.setting.findUnique({
    where: { organizationId },
  });
};

export const upsertSettings = async (organizationId, data) => {
  return prisma.setting.upsert({
    where: { organizationId },
    update: data,
    create: {
      organizationId,
      ...data,
    },
  });
};
