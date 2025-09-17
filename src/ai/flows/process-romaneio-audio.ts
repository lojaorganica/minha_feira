
'use server';

/**
 * @fileOverview An AI agent that processes audio from a farmer to fill out a packing slip (romaneio).
 *
 * - processRomaneioAudio - A function that handles the audio processing.
 * - ProcessRomaneioAudioInput - The input type for the function.
 * - ProcessRomaneioAudioOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ProcessRomaneioAudioInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "The recorded audio as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ),
  productList: z.array(z.string()).describe('A list of all possible products the farmer sells.'),
});
export type ProcessRomaneioAudioInput = z.infer<typeof ProcessRomaneioAudioInputSchema>;


const ProcessRomaneioAudioOutputSchema = z.object({
    clearAll: z.boolean().describe("If true, indicates that the user wants to clear all quantities in the packing slip."),
    items: z.array(z.object({
        product: z.string().describe('The name of the product identified in the audio. Must be one of the provided productList.'),
        quantity: z.string().describe('The quantity of the product mentioned, including the unit (e.g., "5 kg", "10 cx"). If the command is to remove or zero out an item, this should be an empty string.'),
        fornecedor: z.string().optional().describe('The name of the supplier for the product, if mentioned. E.g., "Matias Ponte".')
    })).describe('A list of products, their quantities, and optional suppliers extracted from the audio.'),
    conversationalResponse: z.string().optional().describe("If the user's audio is a general question or greeting (e.g., 'What's your name?', 'Hello'), provide a helpful, conversational response here. This field should only be used when no packing slip items are detected.")
});
export type ProcessRomaneioAudioOutput = z.infer<typeof ProcessRomaneioAudioOutputSchema>;


export async function processRomaneioAudio(
  input: ProcessRomaneioAudioInput
): Promise<ProcessRomaneioAudioOutput> {
  return processRomaneioAudioFlow(input);
}

const extractionPrompt = ai.definePrompt({
    name: 'extractRomaneioItemsPrompt',
    input: { schema: ProcessRomaneioAudioInputSchema },
    output: { schema: ProcessRomaneioAudioOutputSchema },
    prompt: `Você é Sofia (ou Fia), uma assistente de IA especialista em preencher um romaneio (lista de embalagem) for agricultores. Sua tarefa principal é analisar um áudio de um agricultor ditando os itens do romaneio e extrair as informações.

    **MODOS DE OPERAÇÃO:**

    **1. MODO DE EXTRAÇÃO (PRINCIPAL):** Se o áudio contiver nomes de produtos e quantidades, sua tarefa é extrair esses dados e preencher a lista de 'items'.
    
    A lista de produtos possíveis que o agricultor vende é:
    {{#each productList}}
    - {{this}}
    {{/each}}
    
    **REGRAS DE EXTRAÇÃO:**
    *   **LIMPEZA TOTAL:** Se o agricultor disser "zerar o romaneio", "limpar tudo", etc., defina 'clearAll' como 'true' e deixe 'items' vazio.
    *   **REMOÇÃO DE ITENS:** Se disser "remover", "zerar", "cancelar" para um produto, defina 'quantity' como uma string vazia ("").
    *   **CORREÇÃO:** A última quantidade mencionada para um produto é a que vale.
    *   **ABREVIAÇÃO:** Abreviar unidades (quilos -> kg, caixas -> cx, etc.).
    *   **FORNECEDOR:** Se mencionar um fornecedor, preencha o campo 'fornecedor'.
    
    **2. MODO CONVERSACIONAL (SECUNDÁRIO):** Se o áudio do usuário **NÃO** contiver um comando de romaneio, mas sim uma pergunta geral, saudação ou conversa (ex: "Qual seu nome?", "Olá Sofia", "O que você faz?", "Quem é você?"), você **DEVE** usar o campo 'conversationalResponse' para responder de forma amigável e útil. Neste caso, a lista de 'items' deve ficar vazia e 'clearAll' deve ser 'false'.
    *   Se perguntarem seu nome, diga que se chama Sofia (ou Fia) e que é a assistente de IA do app Minha Feira.
    *   Se perguntarem o que você faz, explique que sua função principal é ajudar a preencher o romaneio por voz, mas que também pode responder a algumas perguntas.
    *   Sempre seja breve, amigável e profissional.
    
    **Priorize o MODO DE EXTRAÇÃO.** Somente use o MODO CONVERSACIONAL se tiver certeza de que o usuário não está tentando ditar um item para o romaneio.

    Use o áudio a seguir como fonte primária:
    {{media url=audioDataUri}}
    `,
});


const processRomaneioAudioFlow = ai.defineFlow(
  {
    name: 'processRomaneioAudioFlow',
    inputSchema: ProcessRomaneioAudioInputSchema,
    outputSchema: ProcessRomaneioAudioOutputSchema,
  },
  async (input) => {
    const { output } = await extractionPrompt(input);
    return output!;
  }
);
