
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateSpeech } from '@/ai/flows/text-to-speech';
import { Loader2, Volume2 } from 'lucide-react';
import BackButton from '@/components/back-button';
import { useToast } from '@/hooks/use-toast';

const voices = [
    { id: 'Despina', name: 'Voz 1 (Despina)' },
    { id: 'Callirrhoe', name: 'Voz 2 (Callirrhoe)' },
    { id: 'Aoede', name: 'Voz 3 (Aoede)' },
    { id: 'Erinome', name: 'Voz 4 (Erinome)' },
];

export default function SofiaVoiceTestPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const { toast } = useToast();

  const handleTestVoice = async (voiceName: string) => {
    setIsLoading(voiceName);
    setAudioSrc(null);
    try {
      const result = await generateSpeech({
        text: 'Olá! Eu sou a Sofia, sua assistente virtual no Minha Feira. Como posso ajudar hoje?',
        voiceName: voiceName,
      });

      if (result.error) {
          toast({
              variant: 'destructive',
              title: 'Erro de Geração de Voz',
              description: result.error,
          });
      } else if (result.audioDataUri) {
          setAudioSrc(result.audioDataUri);
      }

    } catch (error) {
      console.error('Erro ao gerar a voz:', error);
      toast({
          variant: 'destructive',
          title: 'Erro Inesperado',
          description: 'Ocorreu uma falha ao tentar gerar o áudio.',
      });
    } finally {
      setIsLoading(null);
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
            Clique nos botões abaixo para ouvir diferentes opções de voz para a nossa assistente de IA, Sofia.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-6 py-10">
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full'>
                {voices.map((voice) => (
                    <Button key={voice.id} onClick={() => handleTestVoice(voice.id)} disabled={!!isLoading} size="lg">
                        {isLoading === voice.id ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Gerando...
                        </>
                        ) : (
                        <>
                            <Volume2 className="mr-2 h-5 w-5" />
                            Ouvir {voice.name}
                        </>
                        )}
                    </Button>
                ))}
            </div>

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
