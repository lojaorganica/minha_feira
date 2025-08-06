
"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      Voltar
    </Button>
  );
}
