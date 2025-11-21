# Guía para Subir el Proyecto a GitHub

## Pasos para Subir el Proyecto

### 1. Verificar que no hay archivos sensibles

Asegúrate de que no hay archivos `.env` o credenciales en el proyecto. El `.gitignore` ya está configurado para ignorarlos.

### 2. Inicializar Git (si no está inicializado)

```bash
git init
```

### 3. Configurar tu identidad de Git (si no lo has hecho antes)

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"
```

### 4. Agregar todos los archivos

```bash
git add .
```

### 5. Hacer el primer commit

```bash
git commit -m "Initial commit: I.S. Law Firm website with admin panel structure"
```

### 6. Cambiar a rama main (si es necesario)

```bash
git branch -M main
```

### 7. Agregar el repositorio remoto

**IMPORTANTE:** Reemplaza `islawfirm` con tu nombre de usuario de GitHub si es diferente.

```bash
git remote add origin https://github.com/islawfirm/islawfirm.git
```

Si el repositorio ya existe y quieres reemplazarlo:

```bash
git remote set-url origin https://github.com/islawfirm/islawfirm.git
```

### 8. Subir el código

```bash
git push -u origin main
```

## Si el repositorio ya existe en GitHub

Si el repositorio remoto ya tiene commits y quieres fusionar:

```bash
git pull origin main --allow-unrelated-histories
```

Luego resuelve cualquier conflicto y haz:

```bash
git push -u origin main
```

## Verificar que todo está bien

Después de subir, verifica en GitHub que:
- ✅ Todos los archivos están presentes
- ✅ No hay archivos `.env` o `node_modules`
- ✅ El README.md se muestra correctamente

## Comandos Útiles

### Ver el estado del repositorio
```bash
git status
```

### Ver qué archivos se van a subir
```bash
git diff --cached
```

### Ver el historial de commits
```bash
git log --oneline
```

## Notas Importantes

1. **Nunca subas archivos `.env`** - Contienen información sensible
2. **`node_modules` está ignorado** - No se subirá automáticamente
3. **El panel admin está en desarrollo** - La estructura base está lista
4. **La contraseña del admin** debe configurarse en `.env.local` (no se sube)

## Solución de Problemas

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/islawfirm/islawfirm.git
```

### Error: "failed to push some refs"
```bash
git pull origin main --rebase
git push -u origin main
```

### Error de autenticación
Necesitarás usar un Personal Access Token en lugar de tu contraseña:
1. Ve a GitHub → Settings → Developer settings → Personal access tokens
2. Genera un nuevo token con permisos de `repo`
3. Úsalo como contraseña cuando Git lo solicite

