'use server';

/**
 * @fileOverview An AI agent that suggests complementary products based on items in the current order.
 *
 * - suggestComplementaryProducts - A function that suggests complementary products.
 * - SuggestComplementaryProductsInput - The input type for the suggestComplementaryProducts function.
 * - SuggestComplementaryProductsOutput - The return type for the suggestComplementaryProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestComplementaryProductsInputSchema = z.object({
  orderItems: z
    .array(z.string())
    .describe('A list of items currently in the order.'),
});
export type SuggestComplementaryProductsInput = z.infer<
  typeof SuggestComplementaryProductsInputSchema
>;

const SuggestComplementaryProductsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('A list of complementary product suggestions.'),
});
export type SuggestComplementaryProductsOutput = z.infer<
  typeof SuggestComplementaryProductsOutputSchema
>;

export async function suggestComplementaryProducts(
  input: SuggestComplementaryProductsInput
): Promise<SuggestComplementaryProductsOutput> {
  return suggestComplementaryProductsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestComplementaryProductsPrompt',
  input: {schema: SuggestComplementaryProductsInputSchema},
  output: {schema: SuggestComplementaryProductsOutputSchema},
  prompt: `You are an AI assistant that suggests complementary products based on the items in the current order.

  Suggest products that would enhance the user's experience with the items they have already selected. Return the suggestions as a list of strings.

  Current order items: {{orderItems}}`,
});

const suggestComplementaryProductsFlow = ai.defineFlow(
  {
    name: 'suggestComplementaryProductsFlow',
    inputSchema: SuggestComplementaryProductsInputSchema,
    outputSchema: SuggestComplementaryProductsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
