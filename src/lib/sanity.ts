import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'ofwtuaq3',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: true
}); 
