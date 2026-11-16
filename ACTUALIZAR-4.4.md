# SOF-CAL 4.4 · Consulta compartida y pendientes

## Aplicar la actualización

1. En Apps Script reemplace **Code.gs** y **Gestion42.gs** y agregue **Pendientes44.gs**. Mantenga los otros archivos, incluidos Importacion43.gs y Firmas42.gs.
2. Guarde y publique una nueva versión de la implementación existente, conservando la URL /exec.
3. Reemplace el contenido de **web** en el repositorio GitHub con GitHub Desktop. Espere que Actions termine y recargue con Ctrl+F5. En Android cierre y vuelva a abrir la app después de la actualización.
4. No es necesario importar otra vez los Excel para corregir los indicadores. No se eliminan ni restauran registros durante esta actualización.

## Registros de otras personas

Registros consulta la base central al entrar y comienza con todas las personas y sin filtros de texto/función. Las listas de documentos incluyen registros centrales de la función además de los locales. Inspecciones muestra una lista compartida, con acceso al historial completo.

Si una captura todavía vive únicamente en el teléfono del inspector, no puede aparecer en otro dispositivo. Desde ese teléfono: **Registros → Compartir mis registros locales**. Se muestra el número de registros antes de enviarlos, se respetan los errores de campos obligatorios y se informa el resultado. Al compartirlos, los demás pueden consultarlos y solo Administración puede editar los registros centrales. Todas las personas deben apuntar a la misma implementación y hoja Google.

No se ha accedido a la base real del usuario para comprobar si faltan cargas o si distintos teléfonos tienen diferentes URL configuradas.

## FNC/FHC

Dentro de la misma función se restauran **Nueva FNC**, **Nueva FHC**, **Documentos FNC/FHC generados** y **Vincular al seguimiento**. Se conserva la exportación Word y el trámite de firmas fuera de la app. El seguimiento existente no se elimina.

## Listado de asistencia

En **Documentación → Sensibilizaciones** está el formato Word **FOR-RRHp-GRL-005 · Revisión 3**, adjuntado por el usuario. El documento se incorpora sin modificar su contenido. Esta entrega añade la descarga del formato; no cambia el documento controlado a un formulario web.

## Indicadores de equipos

Se separan dos conceptos:

- **Calibración vigente según ficha / disponibilidad según ficha:** número de certificado o enlace, fecha válida y al menos 30 días restantes, equipo operativo.
- **Vigentes con certificado enlazado:** además existe enlace al certificado para consulta.

La falta del enlace ya no provoca un cero en la vigencia registrada. La revisión del certificado y la aceptación metrológica siguen siendo necesarias para confirmar su conformidad. Los indicadores no inventan certificados, resultados ni fechas.

La copia original contiene 154 equipos y, al 06/11/2026, 125 cumplen el criterio de vigencia registrada. La pantalla recibida muestra 153: no se presupone la razón ni se restaura automáticamente un equipo que pudo eliminarse. Si la importación quedó incompleta, repetir el mismo JSON incorpora los ID faltantes y omite los ya existentes; no restaura eliminados.

## Pendientes de campo

Nuevo módulo consultable por todos los usuarios autenticados:

- Extrae PEND y NOK de inspecciones sincronizadas, con código, criterio del catálogo capturado, dato, unidad y observación.
- En Liberaciones incorpora una lista explícita: punto, descripción, responsable, compromiso y estado. También reconoce campos del formato cuyo valor exacto es PEND/NOK/Pendiente.
- Filtra por función, proyecto, sistema, ubicación, persona y estado. Permite abrir el registro de origen para consultar las evidencias.
- Se actualiza desde los registros originales. No interpreta automáticamente texto libre como un pendiente, ni convierte NOK en FNC.
- Las modificaciones de liberaciones conservan la política de permisos y de invalidez de firmas cuando cambia el contenido. Los pendientes manuales se incluyen también en el anexo PDF de la liberación.
- Si un archivo central no se puede leer, se muestra la advertencia en vez de omitirlo silenciosamente.

## Ajustes

Todas las opciones se integran en las cuatro tarjetas originales: Usuarios y perfiles, Campos y catálogos, Google y respaldo, y Mantenimiento. Se eliminan las tarjetas adicionales de versiones anteriores.

## Comprobaciones

Pruebas locales: sintaxis, indicadores con/sin enlace, márgenes de calibración, generación de las vistas, cuatro tarjetas de Ajustes, presencia de botones FNC/FHC, extracción de pendientes y conservación íntegra del DOCX. Se mantienen las pruebas de importación, versiones, permisos y banco de firmas.

La publicación en GitHub/Google, la consulta de registros reales y la comprobación visual en el navegador del usuario permanecen pendientes. Esta entrega no configura la sincronización con los Excel de SharePoint, cuyos enlaces y flujo aún faltan.
