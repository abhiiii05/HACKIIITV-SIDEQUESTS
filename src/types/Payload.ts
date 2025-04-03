import { JWTPayload } from "jose";

export interface Payload extends JWTPayload{
  id: string;
  username: string;
}