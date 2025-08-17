
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
    clearAll: z.boolean().describe('If true, indicates that the user wants to clear all quantities in the packing slip.'),
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

const extractionPrompt = ai.definePrompt({
    name: 'extractRomaneioItemsPrompt',
    input: { schema: z.object({ transcript: z.string(), productList: z.array(z.string()) }) },
    output: { schema: ProcessRomaneioAudioOutputSchema },
    prompt: `Você é Sofia (ou Fia), uma assistente de IA especialista em preencher um romaneio (lista de embalagem) para agricultores. Sua tarefa é extrair os itens e suas quantidades de uma transcrição de áudio.

    A seguir, a transcrição de um agricultor ditando as quantidades de produtos para levar para a feira:
    
    "{{transcript}}"
    
    A lista de produtos possíveis que o agricultor vende é:
    {{#each productList}}
    - {{this}}
    {{/each}}
    
    Analise a transcrição e identifique cada produto e sua respectiva quantidade. Combine os produtos mencionados com os nomes exatos da lista de produtos fornecida. Ignore qualquer outra fala que não seja um item do romaneio.

    **REGRAS CRÍTICAS DE PROCESSAMENTO:**

    **REGRA 1: LIMPEZA TOTAL.** Se o agricultor disser "zerar o romaneio", "limpar tudo", "zerar tudo" ou um comando similar de limpeza geral, você **DEVE** definir o campo 'clearAll' como 'true' e pode deixar a lista de 'items' vazia. Esta regra tem a maior prioridade.
    *   Exemplo: "ok fia, vamos começar de novo, pode zerar o romaneio" deve resultar em { clearAll: true, items: [] }.

    **REGRA 2: REMOÇÃO E ZERAGEM DE ITENS.** Se o agricultor usar palavras como "remover", "zerar", "tirar", "cancelar" ou "nenhum" para um produto, você **DEVE** definir o campo 'quantity' como uma string vazia ("") para esse produto.
    *   Exemplo 1: "remover cenoura" ou "tomate, zerar" deve resultar em { product: '[Nome Exato do Produto]', quantity: '' }.
    *   Exemplo 2: "para alface, não quero nenhum" deve resultar em { product: '[Nome Exato da Alface]', quantity: '' }.

    **REGRA 3: CORREÇÃO DE QUANTIDADES.** Se o agricultor se corrigir ou trocar uma quantidade, a última quantidade mencionada para um produto é a que vale.
    *   Exemplo: "Tomate, 5 caixas... não, minto, 7 caixas" deve resultar em { product: 'Tomates Italianos Orgânicos', quantity: '7 cx' }.
    *   Exemplo: "Cebola, 2 quilos. Ah, troca pra 3 quilos" deve resultar em { product: 'Cebola Orgânica', quantity: '3 kg' }.

    **REGRA 4: ABREVIAÇÃO DE UNIDADES.** Sempre abrevie as unidades de medida da seguinte forma, mesmo que o agricultor fale a palavra por extenso:
    *   quilos ou kilos: **kg**
    *   gramas: **g**
    *   unidades: **un**
    *   litros: **L**
    *   mililitros: **ml**
    *   caixas: **cx**
    *   maços: **mç**
    *   molhos: **mlh**
    *   potes: **pt**
    *   dúzias: **dz**
    *   Exemplo de output esperado: { product: 'Tomates Italianos Orgânicos', quantity: '10 cx' }.`,
});


const processRomaneioAudioFlow = ai.defineFlow(
  {
    name: 'processRomaneioAudioFlow',
    inputSchema: ProcessRomaneioAudioInputSchema,
    outputSchema: ProcessRomaneioAudioOutputSchema,
  },
  async (input) => {
    const { text } = await ai.generate({
        model: 'googleai/gemini-2.0-flash', // Usando um poderoso model para transcrição
        prompt: [
            { media: { url: input.audioDataUri } },
            { text: 'Transcreva este áudio em português.' }
        ],
    });

    if (!text) {
        throw new Error("A transcrição do áudio falhou.");
    }
    
    const { output } = await extractionPrompt({ transcript: text, productList: input.productList });

    return output!;
  }
);
