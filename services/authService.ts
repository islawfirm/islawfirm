// Servicio de autenticación con Prisma
// Usa la base de datos para autenticación

import { StorageService } from './storageService';

export interface LoginResponse {
  success: boolean;
  data?: {
    id: string;
    email: string;
    nombre: string | null;
    token: string;
  };
  error?: string;
}

export class AuthService {
  // Login con email y contraseña
  static async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await response.json();

      if (data.success && data.data) {
        // Guardar token en localStorage
        StorageService.saveAuth(data.data.token);
        // Guardar información del usuario
        StorageService.saveUser(data.data);
      }

      return data;
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        error: 'Error de conexión. Por favor, intente nuevamente.',
      };
    }
  }

  // Logout
  static logout(): void {
    StorageService.clearAuth();
    StorageService.clearUser();
  }

  // Verificar si está autenticado
  static isAuthenticated(): boolean {
    const token = StorageService.getAuth();
    if (!token) return false;
    
    try {
      // Decodificar base64 en el navegador (sin usar Buffer)
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

  // Obtener token
  static getToken(): string | null {
    return StorageService.getAuth();
  }

  // Obtener usuario actual
  static getCurrentUser(): { id: string; email: string; nombre: string | null } | null {
    return StorageService.getUser();
  }

  // Verificar token válido
  static validateToken(): boolean {
    return this.isAuthenticated();
  }
}


