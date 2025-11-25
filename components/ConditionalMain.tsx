'use client';

import { usePathname } from 'next/navigation';

export default function ConditionalMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Si es admin, no aplicar padding superior (ya tiene su propio layout)
  const isAdmin = pathname.startsWith('/admin');
  const paddingClass = isAdmin ? '' : 'pt-20 md:pt-24';
  
  return (
    <main className={`flex-grow ${paddingClass}`}>
      {children}
    </main>
  );
}

