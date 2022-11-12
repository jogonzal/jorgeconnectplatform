import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { StripeClient } from "../../config/StripeUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const name: string = req.body.name;
    console.log("Name is ", name);
    const type: string = req.body.type;
    console.log("Type is ", type);
    const email: string = req.body.email;
    console.log("Email is ", email);

    const account = await StripeClient.accounts.create({
      type: type as Stripe.Account.Type,
      country: "US",
      ...(email ? { email } : {}),
      business_profile: {
        name: name,
      },
      ...(type === "standard"
        ? {}
        : {
            capabilities: {
              card_payments: {
                requested: true,
              },
              transfers: {
                requested: true,
              },
            },
          }),
    });

    console.log("Created!", account);

    res.status(200).json(account);
  } catch (error) {
    const errorAsAny = error as any;
    const errorMessage =
      errorAsAny && errorAsAny.message ? errorAsAny.message : "unknown";
    console.log("Error while creating", error);
    res.status(500).json({ error: errorMessage });
  }
}
