import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { entriesPriceId } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({message: "Method NOT allowed!"})
  } 

  if (!entriesPriceId) {
    return res.status(400).json({message: "Price not found!"})
  }

  const cancelUrl = `${process.env.NEXT_URL}/`;
  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`; 

  const checkoutSession = await stripe.checkout.sessions.create({
    cancel_url: cancelUrl,
    success_url: successUrl,
    mode: "payment",
    line_items: entriesPriceId,
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}