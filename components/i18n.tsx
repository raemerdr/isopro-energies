'use client';
import { createContext, use, useMemo, type ReactNode } from 'react';
import type { ClientCopy, Lang } from '@/lib/i18n';

const I18nContext = createContext<{ lang: Lang; copy: ClientCopy } | null>(null);

/** Hands the runtime strings (the `client` part of the copy) to Client Components. */
export function I18nProvider({ lang, copy, children }: { lang: Lang; copy: ClientCopy; children: ReactNode }) {
  const value = useMemo(() => ({ lang, copy }), [lang, copy]);
  return <I18nContext value={value}>{children}</I18nContext>;
}

function useI18n() {
  const context = use(I18nContext);
  if (!context) throw new Error('I18nProvider is missing');
  return context;
}

export const useCopy = () => useI18n().copy;
export const useLang = () => useI18n().lang;
