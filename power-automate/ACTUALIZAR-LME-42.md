# Fuente LME configurable desde SOF-CAL 4.2

El enlace inicial es la copia compartida por Darbet en su OneDrive empresarial, carpeta `2026.11.03 - Oscar LME para prueba de Aplicación`. La hoja sigue siendo LME; los enlaces se leen de J. La biblioteca donde residen los PDF puede seguir siendo la original del sitio D220: no se cambia por mover el Excel.

El flujo debe consultar la configuración en cada ejecución. Si conserva un archivo fijo en Ejecutar script, cambiar el enlace en SOF-CAL NO cambiará el archivo procesado.

## Actualizar el flujo
1. Conserve el Office Script `Exportar-LME.ts` y su conexión Microsoft con acceso al Excel.
2. Antes de leer Excel, agregue HTTP POST a su `/exec` vigente. Cuerpo:
   `{"action":"lmeSource","secret":"VALOR_PRIVADO_LME_SYNC_SECRET"}`
   Active entradas y salidas seguras en esta acción y en la sincronización. No guarde la clave en GitHub.
3. El resultado JSON contiene `ok` y `data`: `url`, `site`, `path`, `sheet`, `linkColumn`, `revision`. Si `ok` es falso, termine con error.
4. Agregue SharePoint → Obtener metadatos de archivo usando la ruta de acceso. En Dirección del sitio, use valor personalizado `body('Leer_fuente_LME')?['data']?['site']`; en Ruta del archivo use `body('Leer_fuente_LME')?['data']?['path']`. Estos valores se obtienen del enlace guardado por Administración. La conexión debe tener acceso al sitio personal compartido.
5. En Excel Online (Business) → Ejecutar script, use la ubicación devuelta y el identificador de archivo obtenido en el paso anterior. Seleccione la biblioteca del sitio y el script `SOFCAL_Exportar_LME`. Los nombres de campos y la selección dinámica pueden variar según el conector habilitado; valide una ejecución manual. Si el conector no admite sitio/biblioteca dinámicos, habrá que actualizar esos selectores cuando se cambie de sitio (la ruta de archivo sí debe venir del paso 3).
6. En el HTTP POST que envía la LME a Apps Script use:
   `{"action":"lmeSync","secret":"VALOR_PRIVADO_LME_SYNC_SECRET","sourceRevision":"REVISION_DEL_PASO_3","payload":"RESULTADO_DEL_SCRIPT"}`
   Inserte **contenido dinámico**, no esos textos literales: `sourceRevision` es `body('Leer_fuente_LME')?['data']?['revision']`; `payload` es el resultado completo de Ejecutar script. Puede ser objeto o cadena JSON.
7. Valide `ok=true`, número de documentos y fecha de sincronización. En SOF-CAL, Documentación → Actualizar catálogo. Compruebe un enlace real y un registro sin enlace.
8. Solo tras esa prueba cambie el desencadenador a Recurrencia con la frecuencia acordada.

No se ha ejecutado ni activado este flujo desde el paquete. No cambie permisos del Excel ni publique documentos para solucionar un error de conexión. Si Excel cambió de estructura, ajuste primero el mapeo del Office Script. HTTP puede requerir licencia Premium.
