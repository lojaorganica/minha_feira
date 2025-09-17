
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
    clearAll: z.boolean().describe("If true, indicates that the user wants to clear all quantities and suppliers in the packing slip."),
    clearQuantitiesOnly: z.boolean().describe("If true, indicates the user wants to clear only the quantities, preserving the suppliers."),
    clearSuppliersOnly: z.boolean().describe("If true, indicates the user wants to clear only the supplier names, preserving the quantities."),
    items: z.array(z.object({
        product: z.string().describe('The name of the product identified in the audio. Must be one of the provided productList.'),
        quantity: z.string().describe('The quantity of the product mentioned. For commands to set a specific value (e.g., "put 10"), just use the number and unit (e.g. "10 caixas"). If the command is to add (e.g., "add 5 more"), prefix with a "+". If the command is to subtract (e.g., "remove 2"), prefix with a "-". If the command is to remove or zero out, this should be an empty string.'),
        fornecedor: z.string().optional().describe('The name of the supplier for the product, if mentioned. E.g., "Matias Ponte". If the command is to remove a supplier (e.g., "remover fornecedor da couve"), this field should be an empty string.')
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
    prompt: `Você é Sofia (ou Fia), uma assistente de IA especialista em preencher um romaneio (lista de embalagem) para agricultores. Sua tarefa principal é analisar um áudio e extrair as informações.

    **MODOS DE OPERAÇÃO:**

    **1. MODO DE EXTRAÇÃO (PRINCIPAL):** Se o áudio contiver nomes de produtos e/ou fornecedores, sua tarefa é extrair esses dados e preencher a lista de 'items'.
    
    A lista de produtos possíveis que o agricultor vende é:
    {{#each productList}}
    - {{this}}
    {{/each}}
    
    **REGRAS DE EXTRAÇÃO DE QUANTIDADE:**
    *   **DEFINIR VALOR:** Se o comando for para "colocar", "botar", "definir" uma quantidade (ex: "10 caixas de tomate"), o campo 'quantity' deve ser a string exata, incluindo a unidade. Ex: "10 caixas".
    *   **ADICIONAR/SOMAR:** Se o comando for para "adicionar", "acrescentar", "mais" (ex: "colocar mais 5 quilos"), o campo 'quantity' DEVE ser prefixado com "+". Ex: "+5 quilos".
    *   **SUBTRAIR/REMOVER:** Se o comando for para "remover", "tirar", "diminuir" uma quantidade (ex: "tirar 2 maços"), o campo 'quantity' DEVE ser prefixado com "-". Ex: "-2 maços".
    *   **ZERAR ITEM:** Se o comando for "zerar", "cancelar" ou "remover tudo" de um item (ex: "zerar a couve-flor"), o campo 'quantity' deve ser uma string vazia ("").
    *   **CORREÇÃO:** A última quantidade mencionada para um produto é a que vale.

    **REGRAS DE EXTRAÇÃO DE FORNECEDOR:**
    *   **ADICIONAR FORNECEDOR:** Se mencionar um fornecedor para um produto (ex: "colocar Matias Ponte como fornecedor da couve"), preencha o campo 'fornecedor'. Mesmo que não haja quantidade, a menção do fornecedor com um produto é um comando de extração válido.
    *   **REMOVER FORNECEDOR:** Se o comando for "remover fornecedor" ou "tirar o fornecedor" de um produto (ex: "remover fornecedor da couve"), o campo 'fornecedor' deve ser uma string vazia ("").

    **REGRAS DE LIMPEZA GERAL:**
    *   **LIMPEZA TOTAL:** Se o agricultor disser "zerar o romaneio", "limpar tudo", etc., defina 'clearAll' como 'true' e os outros campos de limpeza como 'false'.
    *   **LIMPAR SÓ QUANTIDADES:** Se o agricultor disser "limpar as quantidades", "zerar quantidades", etc., defina 'clearQuantitiesOnly' como 'true' e os outros campos de limpeza como 'false'.
    *   **LIMPAR SÓ FORNECEDORES:** Se o agricultor disser "limpar os fornecedores", "remover todos os fornecedores", etc., defina 'clearSuppliersOnly' como 'true' e os outros campos de limpeza como 'false'.
    
    **2. MODO CONVERSACIONAL (SECUNDÁRIO):** Se o áudio do usuário **NÃO** contiver um comando de romaneio (nem produto, nem quantidade, nem fornecedor), mas sim uma pergunta geral, saudação ou conversa (ex: "Qual seu nome?", "Olá Sofia", "O que você faz?", "Quem é você?"), você **DEVE** usar o campo 'conversationalResponse' para responder de forma amigável e útil. Neste caso, a lista de 'items' deve ficar vazia e os campos de limpeza devem ser 'false'.
    *   Se perguntarem seu nome, diga que se chama Sofia (ou Fia) e que é a assistente de IA do app Minha Feira.
    *   Se perguntarem o que você faz, explique que sua função principal é ajudar a preencher o romaneio por voz.
    *   Sempre seja breve, amigável e profissional.
    
    **Priorize o MODO DE EXTRAÇÃO.** Somente use o MODO CONVERSACIONAL se tiver certeza de que o usuário não está tentando ditar um item para o romaneio. A menção de um nome de produto, mesmo sem quantidade, já caracteriza MODO DE EXTRAÇÃO.

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
