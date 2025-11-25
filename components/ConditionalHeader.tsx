'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  // No mostrar el Header en rutas de admin
  if (pathname.startsWith('/admin')) {
    return null;
  }
  
  return <Header />;
}

