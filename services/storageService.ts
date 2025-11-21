// Servicio abstracto de almacenamiento
// Ahora usa localStorage, después se puede cambiar a Supabase fácilmente

const STORAGE_KEY = 'islawfirm_casos';
const STORAGE_KEY_AUTH = 'islawfirm_auth';

export class StorageService {
  // ============ CASOS ============
  
  static getCasos(): Record<string, any> {
    if (typeof window === 'undefined') return {};
    
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error al leer casos del storage:', error);
      return {};
    }
  }

  static saveCasos(casos: Record<string, any>): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(casos));
      return true;
    } catch (error) {
      console.error('Error al guardar casos en storage:', error);
      return false;
    }
  }

  static clearCasos(): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error al limpiar casos del storage:', error);
      return false;
    }
  }

  // ============ AUTENTICACIÓN ============
  
  static saveAuth(token: string): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      localStorage.setItem(STORAGE_KEY_AUTH, token);
      return true;
    } catch (error) {
      console.error('Error al guardar auth:', error);
      return false;
    }
  }

  static getAuth(): string | null {
    if (typeof window === 'undefined') return null;
    
    try {
      return localStorage.getItem(STORAGE_KEY_AUTH);
    } catch (error) {
      console.error('Error al leer auth:', error);
      return null;
    }
  }

  static clearAuth(): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      localStorage.removeItem(STORAGE_KEY_AUTH);
      return true;
    } catch (error) {
      console.error('Error al limpiar auth:', error);
      return false;
    }
  }

  // ============ EXPORTAR/IMPORTAR ============
  
  static exportData(): string {
    const casos = this.getCasos();
    return JSON.stringify(casos, null, 2);
  }

  static importData(jsonString: string): boolean {
    try {
      const casos = JSON.parse(jsonString);
      return this.saveCasos(casos);
    } catch (error) {
      console.error('Error al importar datos:', error);
      return false;
    }
  }
}


