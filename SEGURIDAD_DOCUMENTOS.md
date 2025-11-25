# Seguridad de Documentos Privados - Análisis y Soluciones

## Situación Actual

Actualmente, el sistema usa **Signed URLs de Cloudflare R2** para documentos privados, pero hay un problema de seguridad:

**Problema**: La API `/api/documents/[key]` no valida que el documento pertenezca al caso consultado. Cualquiera que conozca el `cloudflareId` de un documento podría generar una URL firmada, incluso sin tener el código del caso.

## Soluciones Propuestas

### ✅ **Solución Recomendada: Validación de Pertenencia + Control de Visibilidad**

Esta es la solución más segura y profesional:

#### 1. **Agregar Campo de Visibilidad**
- Agregar campo `visibleParaCliente: Boolean` al modelo `Documento`
- El admin controla qué documentos puede ver el cliente
- Por defecto: `false` (solo el admin puede ver)

#### 2. **Validación en la API de Documentos**
- La API `/api/documents/[key]` debe recibir el código del caso
- Validar que el documento pertenece a ese caso
- Validar que el documento está marcado como `visibleParaCliente: true`
- Solo entonces generar la URL firmada

#### 3. **Filtrado en la Respuesta del Caso**
- Al consultar un caso, solo devolver documentos con `visibleParaCliente: true`
- Los documentos privados solo los ve el admin

#### 4. **Expiración Corta de URLs**
- Reducir tiempo de expiración a 15-30 minutos (en lugar de 1 hora)
- Las URLs expiran rápidamente para mayor seguridad

#### 5. **Logging de Acceso (Opcional)**
- Registrar quién accede a qué documentos y cuándo
- Útil para auditoría y seguridad

### Ventajas de esta Solución:
- ✅ **Máxima seguridad**: Solo el cliente puede ver sus documentos autorizados
- ✅ **Control granular**: El admin decide qué documentos son visibles
- ✅ **Sin URLs públicas**: Los documentos nunca son públicos
- ✅ **Validación doble**: Código del caso + visibilidad del documento
- ✅ **Fácil de implementar**: Cambios mínimos en el código existente

### Implementación:

1. **Migración de BD**: Agregar campo `visibleParaCliente`
2. **Modificar API de documentos**: Validar pertenencia y visibilidad
3. **Modificar API de casos**: Filtrar documentos visibles
4. **Actualizar interfaz admin**: Checkbox para controlar visibilidad
5. **Actualizar interfaz cliente**: Solo mostrar documentos visibles

---

## Otras Opciones Consideradas (No Recomendadas)

### ❌ **Opción 2: Autenticación de Cliente**
- Sistema de login para clientes con email/contraseña
- **Desventaja**: Más complejo, requiere gestión de usuarios cliente

### ❌ **Opción 3: Tokens Únicos por Sesión**
- Generar tokens únicos al consultar el caso
- **Desventaja**: Más complejo, requiere gestión de sesiones

### ❌ **Opción 4: API Proxy Completa**
- Servir documentos directamente desde el servidor
- **Desventaja**: Mayor carga en el servidor, más lento

---

## Recomendación Final

**Implementar la Solución Recomendada** porque:
1. Es la más segura sin complicar demasiado el sistema
2. Da control total al admin sobre qué documentos ver
3. Mantiene los documentos completamente privados
4. Es fácil de usar tanto para admin como para cliente
5. Escalable y mantenible

¿Procedo con la implementación de esta solución?

