
'use server';

/**
 * @fileOverview Converts a text response into audio using Text-to-Speech.
 *
 * - generateAudio - A function that handles the text-to-speech conversion.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';
import { Readable } from 'stream';

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
      format: 1, // PCM
    });

    const chunks: Buffer[] = [];
    writer.on('data', (chunk) => {
      chunks.push(chunk);
    });
    writer.on('end', () => {
      const wavBuffer = Buffer.concat(chunks);
      resolve(wavBuffer.toString('base64'));
    });
    writer.on('error', reject);

    const pcmStream = new Readable();
    pcmStream.push(pcmData);
    pcmStream.push(null); // End of stream

    pcmStream.pipe(writer);
  });
}

const generateRomaneioResponseAudioFlow = ai.defineFlow(
  {
    name: 'generateRomaneioResponseAudioFlow',
    inputSchema: z.string(),
    outputSchema: z.object({
        audioDataUri: z.string().describe("The generated audio as a data URI in WAV format.")
    }),
  },
  async (text) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Vega' }, // A standard female voice
          },
        },
      },
      prompt: text,
    });
    if (!media) {
      throw new Error('No media returned from TTS model');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    
    const wavBase64 = await toWav(audioBuffer);

    return {
      audioDataUri: 'data:audio/wav;base64,' + wavBase64,
    };
  }
);


export async function generateAudio(text: string): Promise<{ audioDataUri: string }> {
    return generateRomaneioResponseAudioFlow(text);
}
