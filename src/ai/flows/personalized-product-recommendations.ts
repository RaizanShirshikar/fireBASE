'use server';
/**
 * @fileOverview AI-powered product recommendation flow based on user history and cart contents.
 *
 * - getPersonalizedRecommendations - A function that retrieves personalized product recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  viewHistory: z.array(z.string()).describe('The list of product IDs the user has viewed.'),
  cartContents: z.array(z.string()).describe('The list of product IDs currently in the user\'s cart.'),
});
export type PersonalizedRecommendationsInput = z.infer<typeof PersonalizedRecommendationsInputSchema>;

const PersonalizedRecommendationsOutputSchema = z.object({
  productRecommendations: z.array(z.string()).describe('The list of product IDs recommended to the user based on their history and cart.'),
});
export type PersonalizedRecommendationsOutput = z.infer<typeof PersonalizedRecommendationsOutputSchema>;

export async function getPersonalizedRecommendations(input: PersonalizedRecommendationsInput): Promise<PersonalizedRecommendationsOutput> {
  return personalizedProductRecommendationsFlow(input);
}

const personalizedProductRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedProductRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an expert e-commerce product recommendation engine.

  Given the user\'s viewing history and current cart contents, recommend a list of product IDs that the user might be interested in purchasing.
  Ensure the recommendations are relevant to the user\'s past activity and current needs.

  Viewing History: {{viewHistory}}
  Cart Contents: {{cartContents}}

  Product Recommendations:`, // Ensure the AI outputs a list of product IDs here
});

const personalizedProductRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedProductRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await personalizedProductRecommendationsPrompt(input);
    return output!;
  }
);
