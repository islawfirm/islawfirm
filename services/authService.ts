// Servicio de autenticación básico
// Ahora usa localStorage, después se puede cambiar a Supabase Auth fácilmente

import { StorageService } from './storageService';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'; // Cambiar en producción

export class AuthService {
  // Login
  static login(password: string): boolean {
    if (password === ADMIN_PASSWORD) {
      const token = btoa(`admin:${Date.now()}`); // Token simple
      StorageService.saveAuth(token);
      return true;
    }
    return false;
  }

  // Logout
  static logout(): void {
    StorageService.clearAuth();
  }

  // Verificar si está autenticado
  static isAuthenticated(): boolean {
    const token = StorageService.getAuth();
    return token !== null;
  }

  // Obtener token
  static getToken(): string | null {
    return StorageService.getAuth();
  }

  // Verificar token válido (básico)
  static validateToken(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      // Decodificar y verificar que no sea muy viejo (24 horas)
      const decoded = atob(token);
      const [, timestamp] = decoded.split(':');
      const tokenTime = parseInt(timestamp);
      const now = Date.now();
      const maxAge = 24 * 60 * 60 * 1000; // 24 horas
      
      return (now - tokenTime) < maxAge;
    } catch {
      return false;
    }
  }
}


