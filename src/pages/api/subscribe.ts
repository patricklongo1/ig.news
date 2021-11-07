/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import { stripe } from '~/services/stripe';

export default async function subscribe(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const session = await getSession({ req });

    const stripeCustomer = await stripe.customers.create({
      email: session!.user!.email!,
      // metadata
    });

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [{ price: 'price_1JtCquCDILY822v3ZfPve9Jr', quantity: 1 }],
      mode: 'subscription',
      allow_promotion_codes: true,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      success_url: process.env.STRIPE_SUCCESS_URL!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      cancel_url: process.env.STRIPE_CANCEL_URL!,
    });

    return res.status(200).json({ sessionId: stripeCheckoutSession.id });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ status: 'Error', message: 'Method not allowed' });
  }
}
