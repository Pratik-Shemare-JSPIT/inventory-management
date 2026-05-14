import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import {
  createProductService,
  getProductsService,
} from "@/services/product.service";

export async function POST(req) {
  try {
    const user = getAuthUser(req);

    const body = await req.json();

    const { name, sku, quantity, sellingPrice } = body;

    if (!name || !sku) {
      return NextResponse.json(
        { error: "Name and SKU required" },
        { status: 400 },
      );
    }

    const product = await createProductService(
      {
        name,
        sku,
        quantity: quantity || 0,
        sellingPrice,
      },
      user,
    );

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(req) {
  try {
    const user = getAuthUser(req);

    const products = await getProductsService(user);

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
