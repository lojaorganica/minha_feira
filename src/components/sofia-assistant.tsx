
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Mic, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { askSofia } from '@/ai/flows/ask-sofia';
import { generateSpeech } from '@/ai/flows/text-to-speech';
import { transcribeAudio } from '@/ai/flows/speech-to-text';
import { useToast } from '@/hooks/use-toast';
import { usePathname } from 'next/navigation';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useUser } from '@/hooks/use-user';


const publicPaths = [
    '/welcome',
    '/login/customer',
    '/login/farmer',
    '/register/farmer',
    '/register/farmer/security-check',
    '/terms',
    '/privacy',
    '/faq',
    '/conheca',
];

export default function SofiaAssistant() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [showMicAlert, setShowMicAlert] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();
  const pathname = usePathname();
  const { user } = useUser();

  const isPublicPage = publicPaths.includes(pathname);
  const isRomaneioPage = pathname === '/dashboard/romaneio';

  useEffect(() => {
    // Não mostra o balão de dica se o assistente não for ser exibido
    if (isPublicPage || isRomaneioPage) {
      return;
    }
    
    const hintShown = localStorage.getItem('sofia_hint_shown');
    if (!hintShown) {
      const timer = setTimeout(() => {
        setShowHint(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isPublicPage, isRomaneioPage]);

  const handleInteractionStart = () => {
    if (showHint) {
      setShowHint(false);
      localStorage.setItem('sofia_hint_shown', 'true');
    }
    startRecording();
  };
  
  const handleInteractionEnd = () => {
    stopRecording();
  };

  const playResponse = useCallback(async (text: string) => {
    try {
      const result = await generateSpeech({
        text,
        voiceName: 'Erinome',
      });
      setAudioSrc(result.audioDataUri);
    } catch (error) {
      console.error('Erro ao gerar a fala da Sofia:', error);
      toast({
        variant: 'destructive',
        title: "Erro na Voz",
        description: "Não consegui gerar o áudio da resposta.",
      });
    }
  }, [toast]);

  const startRecording = async () => {
    if (isRecording || isProcessing) return;

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('API de mídia não suportada neste navegador.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      setShowMicAlert(false);
      setAudioSrc(null);
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        setIsProcessing(true);
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result as string;
          
          try {
            const { text: transcribedText } = await transcribeAudio({ audioDataUri: base64Audio });

            if (!transcribedText) {
                throw new Error("Não foi possível transcrever o áudio.");
            }

            const userName = user?.name.split(' ')[0];
            const { answer } = await askSofia({ 
                question: transcribedText,
                userName 
            });
            
            playResponse(answer);

          } catch (e) {
            console.error(e);
            const errorText = "Desculpe, ocorreu um erro ao processar sua pergunta. Por favor, tente novamente.";
            playResponse(errorText);
            toast({
              variant: 'destructive',
              title: "Erro ao Processar Pergunta",
              description: "Não foi possível entender sua pergunta. Tente novamente.",
            });
          } finally {
            setIsProcessing(false);
          }
        };
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

    } catch (err) {
      console.error("Erro ao iniciar a gravação:", err);
      setIsRecording(false);
      setShowMicAlert(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Não mostra o botão flutuante em páginas públicas ou na página do romaneio (que já tem um botão dedicado)
  if (isPublicPage || isRomaneioPage) {
    return null;
  }

  return (
    <>
      {showMicAlert && (
        <div className="fixed bottom-24 right-6 z-50 w-80">
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Microfone Bloqueado</AlertTitle>
                <AlertDescription>
                    Permita o acesso ao microfone nas configurações do seu navegador para falar com a Sofia.
                </AlertDescription>
            </Alert>
        </div>
      )}
    
      <div className="fixed bottom-6 right-6 z-40">
        {showHint && (
            <div className="absolute bottom-full right-0 mb-3 w-60 rounded-lg bg-accent text-accent-foreground p-3 shadow-lg text-center">
                <p className="font-bold">Olá! Sou a Sofia.</p>
                <p className="text-sm">Pressione e segure para falar comigo!</p>
                <div className="absolute right-6 -bottom-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-accent"></div>
            </div>
        )}
        <Button
            onMouseDown={handleInteractionStart}
            onMouseUp={handleInteractionEnd}
            onTouchStart={(e) => { e.preventDefault(); handleInteractionStart(); }}
            onTouchEnd={handleInteractionEnd}
            disabled={isProcessing}
            size="icon"
            className={cn(
                "rounded-full h-16 w-16 shadow-lg transition-all duration-300 transform active:scale-110",
                isRecording 
                    ? "bg-red-600 hover:bg-red-700 animate-pulse scale-110" 
                    : "bg-primary hover:bg-primary/90"
            )}
            aria-label={isRecording ? "Solte para parar de gravar" : "Pressione e segure para falar com a Sofia"}
        >
            {isProcessing ? (
                <Loader2 className="h-8 w-8 animate-spin" />
            ) : (
                <Mic className="h-8 w-8" />
            )}
        </Button>
      </div>

       {audioSrc && (
        <audio
          src={audioSrc}
          autoPlay
          onEnded={() => setAudioSrc(null)}
          className="hidden"
        >
          Seu navegador não suporta o elemento de áudio.
        </audio>
       )}
    </>
  );
}
