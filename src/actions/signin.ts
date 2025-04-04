"use server";

import bcrypt from "bcrypt";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { admin } from "@/db/schema";
import { Errors } from "@/classes/Error";
import { cookies } from "next/headers";
import { Payload } from "@/types/Payload";
import { generateJWT } from "@/functions/auth";

export async function signIn(username: string, password: string) {
  try {
    const user = await db.query.admin.findFirst({
      where: eq(admin.name, username),
    });

    if (!user) {
      return Errors.NotFound("User not found");
    }

    const match = await bcrypt.compare(password, user.hashedPass);

    if (!match) {
      return Errors.Unsuccessful("Incorrect password");
    }

    const payload = {
      id: user.id,
      username: user.name,
    } as Payload;

    const token = await generateJWT(payload);
    (await cookies()).set("access_token", token);

    return {
      message: "Sign in successful",
      error: false,
      data: payload,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Errors.DBError({
        message: error.message,
        stack: error.stack,
      });
    }
    return Errors.DBError({
      message: "An unknown database error occurred",
    });
  }
}
