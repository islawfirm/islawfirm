'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // No mostrar el Footer en rutas de admin
  if (pathname.startsWith('/admin')) {
    return null;
  }
  
  return <Footer />;
}

