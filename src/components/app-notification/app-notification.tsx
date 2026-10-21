"use client";

import { toast, type ExternalToast } from "sonner";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Loader2,
} from "lucide-react";
import { type ReactElement } from "react";

/**
 * AppNotification - Professional toast notification system
 *
 * Usage:
 *   import { AppNotification } from '@/components/app-notification';
 *
 *   // Basic notifications
 *   AppNotification.success('Saved successfully');
 *   AppNotification.error('Failed to save');
 *   AppNotification.warning('Please review your changes');
 *   AppNotification.info('New updates available');
 *
 *   // With description
 *   AppNotification.success('Order placed', { description: 'Your order #12345 has been confirmed' });
 *
 *   // With action button
 *   AppNotification.info('Update available', {
 *     description: 'A new version is ready to install',
 *     action: { label: 'Update', onClick: () => handleUpdate() }
 *   });
 *
 *   // Loading state
 *   const id = AppNotification.loading('Processing...');
 *   // Later:
 *   AppNotification.success('Complete!', { id });
 *
 *   // Promise-based
 *   AppNotification.promise(saveData(), {
 *     loading: 'Saving...',
 *     success: 'Saved successfully',
 *     error: 'Failed to save'
 *   });
 */

type NotificationOptions = ExternalToast;

type PromiseOptions<T> = {
  loading: string;
  success: string | ((data: T) => string);
  error: string | ((error: Error) => string);
} & NotificationOptions;

const AppNotification = {
  /**
   * Success notification - green checkmark
   */
  success: (message: string, options?: NotificationOptions) => {
    return toast.success(message, {
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
      ...options,
      closeButton: false,
    });
  },

  /**
   * Error notification - red X icon
   */
  error: (message: string, options?: NotificationOptions) => {
    return toast.error(message, {
      icon: <XCircle className="h-4 w-4 text-red-500" />,
      ...options,
      closeButton: false,
    });
  },

  /**
   * Warning notification - amber triangle
   */
  warning: (message: string, options?: NotificationOptions) => {
    return toast.warning(message, {
      icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
      ...options,
      closeButton: false,
    });
  },

  /**
   * Info notification - blue info icon
   */
  info: (message: string, options?: NotificationOptions) => {
    return toast.info(message, {
      icon: <Info className="h-4 w-4 text-blue-500" />,
      ...options,
      closeButton: false,
    });
  },

  /**
   * Loading notification - spinning loader
   */
  loading: (message: string, options?: NotificationOptions) => {
    return toast.loading(message, {
      icon: <Loader2 className="h-4 w-4 animate-spin text-primary" />,
      ...options,
      closeButton: false,
    });
  },

  /**
   * Promise-based notification
   * Automatically shows loading -> success/error
   */
  promise: <T,>(promise: Promise<T>, options: PromiseOptions<T>) => {
    const { loading, success, error, ...rest } = options;
    return toast.promise(promise, {
      loading,
      success,
      error,
      ...rest,
      closeButton: false,
    });
  },

  /**
   * Custom notification with full control
   */
  custom: (content: ReactElement, options?: NotificationOptions) => {
    return toast.custom(() => content, {
      ...options,
      closeButton: false,
    });
  },

  /**
   * Dismiss a specific notification by ID
   */
  dismiss: (id?: string | number) => {
    if (id) {
      toast.dismiss(id);
    } else {
      toast.dismiss();
    }
  },
};

export { AppNotification, type NotificationOptions, type PromiseOptions };
