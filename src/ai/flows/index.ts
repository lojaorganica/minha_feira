'use server';

import { suggestComplementaryProducts } from './suggest-complementary-products';
import { processRomaneioAudio } from './process-romaneio-audio';
import { generateSpeech } from './text-to-speech';
import { askSofia } from './ask-sofia';
import { transcribeAudio } from './speech-to-text';

export {
  suggestComplementaryProducts,
  processRomaneioAudio,
  generateSpeech,
  askSofia,
  transcribeAudio
};
