import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { Payload } from "@/types/Payload";

export async function auth() {
  if (!process.env.AUTH_SECRET) {
    throw new Error("AUTH_SECRET is not defined");
  }

  const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
  const jwt = (await cookies()).get("access_token")?.value;

  if (!jwt) {
    throw new Error("No token found");
  }

  try {
    const { payload } = await jwtVerify(jwt, secret, {
      algorithms: ["HS256"] // Explicitly specify the algorithm
    });
    return payload as Payload;
  } catch (e: any) {
    throw new Error("Invalid token");
  }
}

export async function generateJWT(payload: Payload) {
  if (!process.env.AUTH_SECRET) {
    throw new Error("AUTH_SECRET is not defined");
  }

  const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
  const alg = "HS256";

  return await new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("4w")
    .sign(secret);
}