import bcrypt from "bcrypt";
import {
  createUserWithOrganization,
  findUserByEmail,
} from "@/repositories/auth.repository";

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
