import { Client } from 'faunadb';

export const fauna = new Client({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  secret: process.env.FAUNADB_KEY!,
});
