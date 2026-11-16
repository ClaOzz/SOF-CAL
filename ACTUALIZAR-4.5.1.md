# SOF-CAL 4.5.1 — Seguimiento documental y plano opcional

## Cambios solicitados

- En Registros aparece **✓ Seguimiento documental**, solo para administradores autenticados. Permite marcar o desmarcar **Validado**, **Exportado** y **Notificado**, de forma independiente.
- Los filtros administrativos permiten ver validados, exportados, notificados, gestión completa, sin gestionar y sin información central.
- Cada guardado conserva la cuenta administrativa, fecha, revisión del seguimiento y versión del registro. No cambia la ficha ni invalida sus firmas. El servidor rechaza cambios de otros perfiles y modificaciones concurrentes.
- Las marcas son confirmaciones manuales. Marcar “Exportado” no genera un documento; marcar “Notificado” no envía un correo.
- Si la ficha cambia después, sus marcas se muestran pendientes de revisión. Los registros todavía locales deben sincronizarse antes de gestionar su seguimiento central.
- **Plano / revisión deja de ser obligatorio** al finalizar inspecciones, aunque el catálogo anterior lo tenga configurado como requerido. Tampoco se exige código/revisión ni la presencia de un recurso Plano. Los campos y datos existentes se conservan como información opcional. Se mantienen las otras validaciones de campos, instrumentos, pendientes y firmas.

## Actualizar

1. En Apps Script, reemplace `Code.gs` y agregue **Documental451.gs** desde la carpeta `google`. Conserve los demás archivos de 4.5.0. Si aún usa una versión anterior, actualice todos los archivos de `google` del paquete.
2. Guarde y publique **Nueva versión** de la implementación existente; mantenga la misma URL `/exec`. La hoja `_Documental451` se crea al guardar el primer seguimiento. No necesita ejecutar un restablecimiento ni importar registros.
3. Para la web, sustituya la carpeta `web` completa del repositorio y haga Commit/Push con GitHub Desktop. Espere a que termine “Publicar SOF-CAL” y recargue. La versión visible será **4.5.1**.
4. Para Android, instale `SOF-CAL-4.5.1.apk` sobre la versión anterior **sin desinstalar ni borrar los datos**. Está firmado con la misma clave de 4.5.0 y usa un código de versión superior. Conserve su respaldo.
5. Como administrador, entre a Registros, pulse Actualizar y abra **✓ Seguimiento documental** en un registro sincronizado. Guarde una marca y compruebe el filtro correspondiente. Con un usuario normal, el botón y los filtros administrativos no deben aparecer.
6. Abra una inspección borrador sin plano/revisión y revise antes de finalizar. Pueden seguir apareciendo otros requisitos auténticamente pendientes, pero no el requisito de plano/revisión.

## Comprobaciones

Pruebas locales de permisos del servidor, marcas independientes, desmarcado, concurrencia, cambios de versión, filtros y exclusión de usuarios normales. Se probó que un catálogo que todavía exige `plano` no lo incluya entre los datos faltantes; la validación de otros campos permanece.

Suite completa: 26 comprobaciones locales. APK compilado y firma verificada. No se ha publicado en su GitHub/Apps Script ni probado físicamente el APK en un teléfono. Las instrucciones y limitaciones generales de 4.5.0 siguen vigentes.
