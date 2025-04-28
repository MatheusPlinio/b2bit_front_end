'use client';

import { toast } from 'sonner';

type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

interface ShowToastProps {
  title: string;
  description?: string;
  variant?: ToastVariant;
}

export function useCustomToast() {
  const showToast = ({ title, description, variant = 'default' }: ShowToastProps) => {
    toast[variant === 'default' ? 'message' : variant](
      title,
      description ? { description } : undefined
    );
  };

  return { showToast };
}
