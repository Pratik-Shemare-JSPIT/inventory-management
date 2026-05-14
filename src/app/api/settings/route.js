import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import {
  getSettingsService,
  updateSettingsService,
} from "@/services/settings.service";

export async function GET(req) {
  try {
    const user = getAuthUser(req);
    const data = await getSettingsService(user);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req) {
  try {
    const user = getAuthUser(req);
    const body = await req.json();

    const result = await updateSettingsService(user, body);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
