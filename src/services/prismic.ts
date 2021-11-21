/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Prismic from '@prismicio/client';

export function getPrismicClient(req?: unknown) {
  const prismic = Prismic.client(process.env.PRISMIC_URL!, {
    req,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN!,
  });

  return prismic;
}
