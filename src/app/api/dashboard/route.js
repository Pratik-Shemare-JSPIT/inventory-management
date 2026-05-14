import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { getDashboardService } from "@/services/product.service";

export async function GET(req) {
  try {
    const user = getAuthUser(req);

    const data = await getDashboardService(user);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
