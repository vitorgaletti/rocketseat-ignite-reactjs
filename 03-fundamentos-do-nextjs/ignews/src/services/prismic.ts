import Prismic from '@prismicio/client';

export function getPrismicClient() {
  const prismic = Prismic.client(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACESS_TOKEN
  });

  return prismic;
}
