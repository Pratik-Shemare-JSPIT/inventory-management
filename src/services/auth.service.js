import bcrypt from "bcrypt";
import {
  createUserWithOrganization,
  findUserByEmail,
  findUserWithOrgByEmail,
} from "@/repositories/auth.repository";
import { generateToken } from "@/lib/jwt";

export const signupService = async ({ email, password, organizationName }) => {
  // check user exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user + org
  const org = await createUserWithOrganization({
    email,
    password: hashedPassword,
    organizationName,
  });

  return {
    message: "User created successfully",
    user: org.users[0],
  };
};

export const loginService = async ({ email, password }) => {
  const user = await findUserWithOrgByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({
    userId: user.id,
    organizationId: user.organizationId,
  });

  return {
    message: "Login successful",
    token,
    user: {
      id: user.id,
      email: user.email,
      organizationId: user.organizationId,
    },
  };
};
