"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { AlertTriangle, Info, AlertCircle, Trash2, X } from "lucide-react";

export type ConfirmVariant = "danger" | "warning" | "info";

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmVariant;
  icon?: "trash" | "warning" | "info";
}

export interface AlertOptions {
  title?: string;
  message: string;
  buttonText?: string;
  variant?: ConfirmVariant;
}

interface ConfirmContextType {
  confirm: (options: ConfirmOptions | string) => Promise<boolean>;
  alert: (options: AlertOptions | string) => Promise<void>;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export function useConfirm() {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }
  return context;
}

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertMode, setIsAlertMode] = useState(false);
  const [dialogState, setDialogState] = useState<ConfirmOptions>({
    title: "",
    message: "",
    confirmText: "Confirm",
    cancelText: "Cancel",
    variant: "danger",
  });

  const resolverRef = useRef<((value: boolean) => void) | null>(null);
  const confirmBtnRef = useRef<HTMLButtonElement | null>(null);

  const confirm = useCallback(
    (options: ConfirmOptions | string): Promise<boolean> => {
      return new Promise((resolve) => {
        resolverRef.current = resolve;
        setIsAlertMode(false);

        if (typeof options === "string") {
          setDialogState({
            title: "Are you sure?",
            message: options,
            confirmText: "Confirm",
            cancelText: "Cancel",
            variant: "danger",
          });
        } else {
          setDialogState({
            title: options.title || "Confirm Action",
            message: options.message,
            confirmText: options.confirmText || "Confirm",
            cancelText: options.cancelText || "Cancel",
            variant: options.variant || "danger",
            icon: options.icon,
          });
        }

        setIsOpen(true);
      });
    },
    []
  );

  const alert = useCallback(
    (options: AlertOptions | string): Promise<void> => {
      return new Promise((resolve) => {
        resolverRef.current = () => resolve();
        setIsAlertMode(true);

        if (typeof options === "string") {
          setDialogState({
            title: "Notice",
            message: options,
            confirmText: "OK",
            cancelText: "",
            variant: "info",
          });
        } else {
          setDialogState({
            title: options.title || "Notice",
            message: options.message,
            confirmText: options.buttonText || "OK",
            cancelText: "",
            variant: options.variant || "info",
          });
        }

        setIsOpen(true);
      });
    },
    []
  );

  const handleConfirm = () => {
    setIsOpen(false);
    if (resolverRef.current) {
      resolverRef.current(true);
      resolverRef.current = null;
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (resolverRef.current) {
      resolverRef.current(false);
      resolverRef.current = null;
    }
  };

  // Keyboard navigation: Escape cancels, Enter confirms
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleCancel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Auto-focus the action button when dialog opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        confirmBtnRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const variant = dialogState.variant || "danger";

  // Variant styling configs
  const variantConfig = {
    danger: {
      badgeBg: "bg-rose-500/10 text-rose-500 border-rose-500/20",
      confirmBtn:
        "bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-md shadow-rose-600/25",
      defaultIcon: dialogState.icon === "trash" ? Trash2 : AlertTriangle,
    },
    warning: {
      badgeBg: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      confirmBtn:
        "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-md shadow-amber-600/25",
      defaultIcon: AlertCircle,
    },
    info: {
      badgeBg: "bg-blue-500/10 text-(--brand-primary) border-blue-500/20",
      confirmBtn:
        "bg-(--brand-primary) hover:bg-(--brand-primary)/90 text-white shadow-md shadow-blue-500/20",
      defaultIcon: Info,
    },
  }[variant];

  const IconComponent = variantConfig.defaultIcon;

  return (
    <ConfirmContext.Provider value={{ confirm, alert }}>
      {children}

      {/* Global Confirm Modal Backdrop & Container */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-dialog-title"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs transition-opacity duration-200"
          onClick={handleCancel}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-(--border-primary) bg-(--bg-card) p-6 sm:p-7 shadow-2xl text-(--text-primary) transition-all transform scale-100 animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleCancel}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-surface) transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon & Title Row */}
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-xl border flex-shrink-0 ${variantConfig.badgeBg}`}
              >
                <IconComponent className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0 pr-6">
                <h3
                  id="confirm-dialog-title"
                  className="text-lg font-bold text-(--text-primary) leading-snug"
                >
                  {dialogState.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
                  {dialogState.message}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex items-center justify-end gap-3 pt-2">
              {!isAlertMode && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2.5 rounded-xl border border-(--border-primary) bg-(--bg-surface) hover:bg-(--border-primary)/30 text-(--text-primary) text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                >
                  {dialogState.cancelText}
                </button>
              )}

              <button
                ref={confirmBtnRef}
                type="button"
                onClick={handleConfirm}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${variantConfig.confirmBtn}`}
              >
                {dialogState.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}
