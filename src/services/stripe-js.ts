import { loadStripe } from '@stripe/stripe-js';

export async function getStripeJs() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

  return stripeJs;
}
