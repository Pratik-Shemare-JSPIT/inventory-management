import { prisma } from "@/lib/prisma";

export const createUserWithOrganization = async ({
  email,
  password,
  organizationName,
}) => {
  return prisma.organization.create({
    data: {
      name: organizationName,
      users: {
        create: {
          email,
          password,
        },
      },
    },
    include: {
      users: true,
    },
  });
};

export const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const findUserWithOrgByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
    include: {
      organization: true,
    },
  });
};
