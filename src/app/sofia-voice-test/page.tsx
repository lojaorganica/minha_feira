
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateSpeech } from '@/ai/flows/text-to-speech';
import { Loader2, Volume2 } from 'lucide-react';
import BackButton from '@/components/back-button';

export default function SofiaVoiceTestPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);

  const handleTestVoice = async () => {
    setIsLoading(true);
    setAudioSrc(null);
    try {
      const result = await generateSpeech({
        text: 'Olá! Eu sou a Sofia, sua assistente virtual no Minha Feira. Estou aqui para ajudar você a encontrar os melhores produtos orgânicos e facilitar sua experiência de compra. Como posso ajudar hoje?',
      });
      setAudioSrc(result.audioDataUri);
    } catch (error) {
      console.error('Erro ao gerar a voz:', error);
      // Aqui você pode adicionar um toast de erro se quiser
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-4">
        <BackButton />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl sm:text-3xl text-primary">Teste de Voz da Sofia</CardTitle>
          <CardDescription className="text-lg font-semibold text-foreground/90">
            Clique no botão abaixo para ouvir uma amostra da voz da nossa assistente de IA, Sofia.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-6 py-10">
          <Button onClick={handleTestVoice} disabled={isLoading} size="lg">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Gerando Áudio...
              </>
            ) : (
              <>
                <Volume2 className="mr-2 h-5 w-5" />
                Ouvir a Voz da Sofia
              </>
            )}
          </Button>

          {audioSrc && (
            <audio
              src={audioSrc}
              autoPlay
              controls
              className="w-full mt-4"
              onEnded={() => setAudioSrc(null)} // Opcional: remove o player após tocar
            >
              Seu navegador não suporta o elemento de áudio.
            </audio>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
