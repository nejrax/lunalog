import jwt from "jsonwebtoken";

export type JwtUser = {
  userId: string;
  role: "PATIENT" | "ADMIN";
};

export function assertJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Missing JWT_SECRET in environment");
  return secret;
}

export function signAccessToken(payload: JwtUser): string {
  return jwt.sign(payload, assertJwtSecret(), {
    expiresIn: "7d",
  });
}

export function verifyAccessToken(token: string): JwtUser {
  const decoded = jwt.verify(token, assertJwtSecret());
  if (typeof decoded !== "object" || decoded === null) throw new Error("Invalid token");

  const { userId, role } = decoded as { userId?: unknown; role?: unknown };
  if (typeof userId !== "string") throw new Error("Invalid token payload");
  if (role !== "PATIENT" && role !== "ADMIN") throw new Error("Invalid token payload");

  return { userId, role };
}

export function getBearerTokenFromRequest(req: Request): string | null {
  const header = req.headers.get("authorization") ?? req.headers.get("Authorization");
  if (!header) return null;
  const [scheme, token] = header.split(" ");
  if (scheme?.toLowerCase() !== "bearer") return null;
  if (!token) return null;
  return token;
}
