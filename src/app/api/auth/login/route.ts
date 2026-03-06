import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getPrisma } from "@/lib/prisma";
import { signAccessToken } from "@/lib/auth";

export const runtime = "nodejs";

const LoginSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(1).max(256),
});

export async function POST(req: Request) {
  try {
    const prisma = getPrisma();
    const body = LoginSchema.parse(await req.json());

    const user = await prisma.user.findUnique({
      where: { email: body.email },
      select: {
        id: true,
        publicId: true,
        email: true,
        role: true,
        passwordHash: true,
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
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const ok = await bcrypt.compare(body.password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const token = signAccessToken({ userId: user.id, role: user.role });

    return NextResponse.json({
      token,
      user: {
        publicId: user.publicId,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        consent: user.consent,
      },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.flatten() }, { status: 400 });
    }

    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}
