import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getPrisma } from "@/lib/prisma";
import { signAccessToken } from "@/lib/auth";

export const runtime = "nodejs";

const SignupSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(8).max(256),
  researchOptIn: z.boolean().optional(),
  intimateFieldsOptIn: z.boolean().optional(),
});

export async function POST(req: Request) {
  try {
    const prisma = getPrisma();
    const body = SignupSchema.parse(await req.json());

    const existing = await prisma.user.findUnique({ where: { email: body.email } });
    if (existing) {
      return NextResponse.json(
        { error: "Email already in use." },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(body.password, 12);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        passwordHash,
        consent: {
          create: {
            researchOptIn: Boolean(body.researchOptIn),
            intimateFieldsOptIn: Boolean(body.intimateFieldsOptIn),
          },
        },
      },
      select: {
        id: true,
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

    const message =
      err instanceof Error
        ? err.message
        : "Signup failed.";

    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "production"
            ? "Signup failed."
            : message,
      },
      { status: 500 },
    );
  }
}
