import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { bodySchema } from "@/app/schemas/checkout-session";
import { stripe } from "@/app/utils/stripe";

type BodyInterface = z.infer<typeof bodySchema>;

export async function POST(req: NextRequest, res: NextResponse) {
  const body: BodyInterface = await req.json();
  const validation = bodySchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const { customer, product_id, price } = body;

  // TODO: only create customer and price if it doesnt exist already

  const { id: customerId } = await stripe.customers.create(customer);

  let priceId: string | undefined;
  const existingPrice = await checPriceExistance(product_id, price);
  if (typeof existingPrice != "string") {
    const { id } = await stripe.prices.create({
      product: product_id,
      currency: "jpy",
      // amount passed from the body
      unit_amount: price,
    });
    priceId = id;
  } else {
    priceId = await existingPrice;
  }

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    customer: customerId,
    payment_method_types: ["card", "konbini"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    automatic_tax: { enabled: false },
    mode: "payment",
    return_url: `${req.headers.get(
      "origin"
    )}/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  return NextResponse.json({
    id: session.id,
    client_secret: session.client_secret,
    priceId,
  });
}

const checPriceExistance = async (productId: string, amount: number) => {
  const prices = await stripe.prices.list({
    product: productId,
  });

  const matchingPrice = prices.data.find(
    (price) => price.unit_amount === amount
  );

  if (matchingPrice) {
    console.log("Price exists:", matchingPrice.id);
    return matchingPrice.id;
  } else {
    console.log("Price not found for the given amount");
    return undefined;
  }
};
