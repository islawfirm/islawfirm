'use client';

import { AuthService } from '@/services/authService';
import { useEffect, useState } from 'react';

export default function Header() {
  const [user, setUser] = useState<{ email: string; nombre: string | null } | null>(null);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
  }, []);

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-gradient-to-r from-white via-white to-gray-50/30 border-b border-gray-200/50 shadow-soft z-30 backdrop-blur-sm">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Breadcrumb o título de página */}
        <div>
          <h1 className="text-xl font-serif font-bold bg-gradient-to-r from-[#8B0000] to-[#9B0000] bg-clip-text text-transparent">
            Panel de Administración
          </h1>
        </div>

        {/* User info */}
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {user.nombre || 'Administrador'}
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-[#8B0000] to-[#9B0000] rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                {user.nombre ? user.nombre.charAt(0).toUpperCase() : 'A'}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

