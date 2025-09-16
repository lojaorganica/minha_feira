import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-complementary-products.ts';
import '@/ai/flows/process-romaneio-audio.ts';
import '@/ai/flows/text-to-speech.ts';
import '@/ai/flows/ask-sofia.ts';
