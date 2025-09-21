declare module 'react-hot-toast' {
  import * as React from 'react';

  export interface ToastOptions {
    duration?: number;
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    style?: React.CSSProperties;
    className?: string;
    icon?: string | React.ReactNode;
    iconTheme?: {
      primary: string;
      secondary: string;
    };
    ariaProps?: {
      role: string;
      'aria-live': 'polite' | 'assertive';
    };
  }

  export interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'loading' | 'blank';
    duration?: number;
    createdAt: number;
    visible: boolean;
    height?: number;
    position: ToastOptions['position'];
  }

  export interface ToasterProps {
    position?: ToastOptions['position'];
    reverseOrder?: boolean;
    gutter?: number;
    containerStyle?: React.CSSProperties;
    containerClassName?: string;
    toastOptions?: ToastOptions;
  }

  export const Toaster: React.FC<ToasterProps>;
  
  interface ToastMethods {
    (message: string, options?: ToastOptions): string;
    success(message: string, options?: ToastOptions): string;
    error(message: string, options?: ToastOptions): string;
    loading(message: string, options?: ToastOptions): string;
    custom(t: React.ReactNode, options?: ToastOptions): string;
    dismiss(toastId?: string): void;
    remove(toastId?: string): void;
    promise<T>(
      promise: Promise<T>,
      msgs: {
        loading: string;
        success: string | ((data: T) => string);
        error: string | ((error: any) => string);
      },
      opts?: ToastOptions
    ): Promise<T>;
  }

  const toast: ToastMethods;
  export default toast;
}