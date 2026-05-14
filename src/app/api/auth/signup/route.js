import { signupService } from "@/services/auth.service";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const { email, password, organizationName } = body;

    if (!email || !password || !organizationName) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const result = await signupService({
      email,
      password,
      organizationName,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
