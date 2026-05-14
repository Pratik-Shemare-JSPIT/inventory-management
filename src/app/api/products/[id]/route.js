import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import {
  updateProductService,
  deleteProductService,
} from "@/services/product.service";

export async function PUT(req, { params }) {
  try {
    const user = getAuthUser(req);
    const { id } = await params;

    const body = await req.json();

    const updated = await updateProductService(id, body, user);

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const user = getAuthUser(req);
    const { id } = await params;

    await deleteProductService(id, user);

    return NextResponse.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
