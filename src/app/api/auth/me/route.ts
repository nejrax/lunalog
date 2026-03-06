import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { getBearerTokenFromRequest, verifyAccessToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const prisma = getPrisma();
    const token = getBearerTokenFromRequest(req);
    if (!token) {
      return NextResponse.json({ error: "Missing bearer token" }, { status: 401 });
    }

    const payload = verifyAccessToken(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        publicId: true,
        email: true,
        role: true,
        createdAt: true,
        consent: {
          select: {
            researchOptIn: true,
            intimateFieldsOptIn: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
