"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const signUpAction = async (email: string, password: string) => {
  try {
    // Validate input
    if (!email || !password)
      throw new Error("Please provide an email and password");

    const hashedPassword = await bcrypt.hash(password, 8);

    // Create user
    await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    return {
      success: true,
      message: "Sign up successful! Welcome to our platform.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An error occurred. Please try again.",
    };
  }
};
