
'use server';

/**
 * @fileOverview An AI agent that processes audio from a farmer to fill out a packing slip (romaneio).
 *
 * - processRomaneioAudio - A function that handles the audio processing.
 * - ProcessRomaneioAudioInput - The input type for the function.
 * - ProcessRomaneioAudioOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ProcessRomaneioAudioInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "The recorded audio as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  productList: z.array(z.string()).describe('A list of all possible products the farmer sells.'),
});
export type ProcessRomaneioAudioInput = z.infer<typeof ProcessRomaneioAudioInputSchema>;


const ProcessRomaneioAudioOutputSchema = z.object({
    items: z.array(z.object({
        product: z.string().describe('The name of the product identified in the audio. Must be one of the provided productList.'),
        quantity: z.string().describe('The quantity of the product mentioned, including the unit (e.g., "5 kg", "10 cx"). If the command is to remove or zero out an item, this should be an empty string.'),
    })).describe('A list of products and their quantities extracted from the audio.')
});
export type ProcessRomaneioAudioOutput = z.infer<typeof ProcessRomaneioAudioOutputSchema>;


export async function processRomaneioAudio(
  input: ProcessRomaneioAudioInput
): Promise<ProcessRomaneioAudioOutput> {
  return processRomaneioAudioFlow(input);
}


const processRomaneioAudioFlow = ai.defineFlow(
  {
    name: 'processRomaneioAudioFlow',
    inputSchema: ProcessRomaneioAudioInputSchema,
    outputSchema: ProcessRomaneioAudioOutputSchema,
  },
  async (input) => {
    const { text } = await ai.generate({
        model: 'googleai/gemini-2.0-flash', // Using a powerful model for transcription
        prompt: [
            { media: { url: input.audioDataUri } },
            { text: 'Transcreva este áudio em português.' }
        ],
    });

    if (!text) {
        throw new Error("A transcrição do áudio falhou.");
    }
    
    const extractionPrompt = ai.definePrompt({
        name: 'extractRomaneioItemsPrompt',
        input: { schema: z.object({ transcript: z.string(), productList: z.array(z.string()) }) },
        output: { schema: ProcessRomaneioAudioOutputSchema },
        prompt: `Você é um assistente de IA para agricultores. Sua tarefa é extrair os itens e suas quantidades de uma transcrição de áudio para preencher um romaneio (lista de embalagem).

        A seguir, a transcrição de um agricultor ditando as quantidades de produtos para levar para a feira:
        
        "{{transcript}}"
        
        A lista de produtos possíveis que o agricultor vende é:
        {{#each productList}}
        - {{this}}
        {{/each}}
        
        Analise a transcrição e identifique cada produto e sua respectiva quantidade. Combine os produtos mencionados com os nomes exatos da lista de produtos fornecida. Ignore qualquer outra fala que não seja um item do romaneio.

        IMPORTANTE 1: Se o agricultor usar palavras como "remover", "zerar", "tirar" ou "nenhum" para um produto, você deve definir o campo 'quantity' como uma string vazia ("") para esse produto.
        Exemplo: "remover cenoura" ou "tomate, zerar" deve resultar em { product: 'Cenouras Orgânicas', quantity: '' }.

        IMPORTANTE 2: Sempre abrevie as unidades de medida da seguinte forma:
        - quilos ou kilos: kg
        - gramas: g
        - unidades: un
        - litros: L
        - mililitros: ml
        - caixas: cx
        - maços: mç
        - molhos: mlh
        - potes: pt
        - dúzias: dz
        Exemplo de output esperado: { product: 'Tomates Italianos Orgânicos', quantity: '10 cx' }.`,
    });

    const { output } = await extractionPrompt({ transcript: text, productList: input.productList });

    return output!;
  }
);
