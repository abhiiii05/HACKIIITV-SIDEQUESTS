
"use server";

import bcrypt from "bcrypt";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { admin } from "@/db/schema";
import { Errors } from "@/classes/Error";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { Payload } from "@/types/Payload";
import { generateJWT } from "@/functions/auth";
import { p } from "framer-motion/client";

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

    // const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    // const alg = "HS256";

    const token = await generateJWT(payload);
    (await cookies()).set("access_token", token);

    return {
      message: "Sign in successful",
      error: false,
      data: payload,
    };
  }  catch (e) {
    return Errors.DBError(e);
  }
}
