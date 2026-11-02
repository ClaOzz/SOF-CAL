# SOF-CAL 4.1.0 — actualización y conexión

Este paquete actualiza la aplicación existente. La conexión remota requiere publicar el código de Google y crear el flujo con una cuenta Microsoft autorizada. No se ha publicado ni enviado ningún correo real durante las pruebas.

## 1. Actualizar la aplicación

1. Conserva una copia del repositorio y de los datos actuales. No uses Restablecer ni Eliminar registros.
2. Reemplaza la carpeta `web` de tu repositorio por la del paquete. Usa GitHub Desktop para cargar el HTML, cuyo tamaño supera el límite del cargador web de GitHub.
3. Confirma y envía los cambios a `main`. En Settings > Pages conserva **GitHub Actions** como origen: el flujo publica `./web`.
4. Espera el despliegue correcto en Actions. Cierra y vuelve a abrir la app. Si continúa la versión anterior, recarga sin caché; antes de borrar datos del sitio, respalda los borradores locales.

## 2. Actualizar Google Apps Script

En el proyecto que ya utiliza SOF-CAL, reemplaza el contenido de los archivos homónimos de la carpeta `google` y agrega `DocumentacionLME.gs`. Actualiza `appsscript.json` con el manifiesto incluido. Conserva las propiedades existentes, credenciales OAuth, identificadores de Sheet y carpetas. No ejecutes una inicialización que borre información.

En Configuración del proyecto > Propiedades del script, crea `LME_SYNC_SECRET` con un valor aleatorio privado de al menos 32 caracteres. Guárdalo únicamente aquí y en Power Automate; no lo incluyas en GitHub, HTML ni capturas.

En Implementar > Administrar implementaciones > Editar, selecciona **Nueva versión** y publica sobre la implementación existente para conservar la URL. Revisa la autorización adicional de envío de correo requerida por MailApp.

URL configurada:
https://script.google.com/macros/s/AKfycbztvXUgPcnr25n9LRuLMzHjq63q091xKjOzZvU56Uqi-MD70B4LrWz3u6okdC-IPnq7/exec

El acceso y la identidad de Gmail siguen siendo verificados por el servidor. No compartas públicamente el Sheet ni los documentos para solucionar problemas de acceso.

## 3. Preparar Excel

Abre el Excel original de la lista maestra en SharePoint, hoja LME. En Automatizar > Nuevo script, pega `Exportar-LME.ts` y guarda como `SOFCAL_Exportar_LME`.

El script espera las tablas `T_D220_LME` y `Tabla4`, con su estructura actual. Obtiene código, título, estado, revisión y demás filtros. Lee los enlaces de J; para las fórmulas existentes reconstruye el enlace solo cuando la versión está incluida en el inventario Tabla4. No ejecuta macros, no refresca Power Query y no comprueba que cada PDF pueda abrirse. El responsable debe mantener actualizado el inventario del Excel mediante su proceso habitual.

## 4. Crear un primer flujo manual

1. En https://make.powerautomate.com/ crea un flujo instantáneo con desencadenador manual.
2. Agrega **Excel Online (Business) > Ejecutar script**. Selecciona sitio D220, biblioteca Documentos compartidos, el Excel original y `SOFCAL_Exportar_LME`. Renombra la acción `Exportar_LME`.
3. Agrega la acción **HTTP**, método POST y la URL `/exec` del apartado anterior. Esta acción puede requerir licencia Premium y permiso de las políticas de la organización para comunicar Microsoft con Google.
4. Encabezado: `Content-Type` = `application/json`.
5. Cuerpo:

```json
{
  "action": "lmeSync",
  "secret": "PEGA_AQUI_TU_VALOR_PRIVADO",
  "payload": "@{body('Exportar_LME')?['result']}"
}
```

Inserta `result` como contenido dinámico de Ejecutar script si el diseñador no reconoce la expresión. El servidor acepta el contenido JSON devuelto por el script como texto.

6. Activa Entradas seguras y Salidas seguras en la acción que contiene el secreto. No lo pongas en parámetros de la URL.
7. Guarda y ejecuta una prueba. Comprueba en la respuesta JSON `ok: true`, no solamente el estado HTTP 200. Verifica también el número guardado y la fecha de sincronización. Si hay una redirección de Apps Script, comprueba que HTTP sigue la redirección y lee la respuesta final antes de dar la prueba por válida.
8. Revisa la hoja `Documentacion_LME` y, en la app, Documentación > Actualizar. Consulta un documento conocido y comprueba código, revisión y enlace.
9. Después de validar, puedes usar un flujo programado, por ejemplo cada 30 minutos, con concurrencia 1. La actualización será periódica, no instantánea.

## 5. Avisos de enlaces faltantes

Un usuario autenticado pulsa **Reportar enlace faltante** y confirma. El servidor envía el aviso a `dmontero@sofratesa.com` desde la cuenta propietaria de Apps Script, e incluye la identificación del documento y del solicitante. No se envía por Outlook ni al importar automáticamente el catálogo.

La hoja `Reportes_Enlaces` registra los avisos. No se repite un aviso pendiente para el mismo código y revisión. La siguiente sincronización que aporte el enlace lo marca como resuelto. Realiza un envío de prueba únicamente cuando quieras que el encargado reciba el correo.

Los archivos de SharePoint conservan sus permisos: iniciar sesión con Gmail en SOF-CAL no concede acceso Microsoft. El administrador puede seguir agregando enlaces propios, independientes de la LME. La importación JSON manual es una alternativa si no está disponible la acción HTTP, pero no proporciona sincronización automática.

## Mejoras incluidas y límites de validación

- Materiales integrado en Inspecciones; se retira su acceso duplicado y se conservan los registros históricos.
- Criterios técnicos actualizados, controles de etiquetado y cableado, equipos de prueba y planos obligatorios; PEND exige observación, responsable y fecha de seguimiento.
- Edición administrativa de campos existentes y corrección del área de campos adicionales; se protegen identificadores y campos de seguridad.
- Cambio de contraseña del administrador local desde Ajustes. No modifica la contraseña de Gmail.
- Solicitud de permiso FOR-RRHp-GRL-015, revisión 003, como tarjeta junto a Horas Extras y Vacaciones, sobre el documento original. Las aprobaciones se tramitan externamente.
- Documentación con filtros de LME, enlaces manuales y reporte de enlace faltante.

Los criterios que un administrador ya personalizó se conservan: debe revisar esos puntos frente a los cambios nuevos. No se inventan valores técnicos del fabricante. La validación de instrumentos comprueba los datos requeridos y su asociación al punto, pero no certifica automáticamente vigencia o validez de una calibración. Las nuevas comprobaciones de cierre se aplican en la app.

Las pruebas locales de backend, inicio de sesión, LME y validaciones nuevas pasaron. Falta la prueba integral con las cuentas reales de Google/Microsoft y los permisos del entorno. No publiques el Excel privado ni su catálogo completo en GitHub.

Documentación de Microsoft:
- https://learn.microsoft.com/en-us/office/dev/scripts/develop/macros-power-automate
- https://learn.microsoft.com/en-us/office/dev/scripts/testing/power-automate-troubleshooting
