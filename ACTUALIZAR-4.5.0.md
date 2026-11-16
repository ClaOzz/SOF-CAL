# SOF-CAL 4.5.0 — Actualización y Android

## Instalar la actualización web

1. Exporte un respaldo desde la versión actual, especialmente de los borradores que aún existen únicamente en cada teléfono. Conserve el respaldo.
2. En el proyecto existente de Apps Script, actualice TODOS los archivos de la carpeta `google`, incluidos los nuevos `Edicion45.gs` y `Android45.gs`. Mantenga las propiedades del script, su hoja Google y los identificadores existentes. No ejecute restablecimientos ni borre hojas.
3. En Apps Script: Implementar → Administrar implementaciones → Editar → Nueva versión → Implementar. Conserve la URL `/exec`, la configuración de ejecución y el acceso existentes.
4. En GitHub Desktop, copie `web` y `.github` del paquete a la raíz del repositorio SOF-CAL, sustituyendo los archivos correspondientes. Haga Commit y Push; espere que termine “Publicar SOF-CAL”. No suba el ZIP como si fuera la aplicación.
5. Cierre y abra SOF-CAL o recargue con Ctrl+F5. Mantenga el mismo dominio y ruta para conservar el almacenamiento del navegador.

El paquete se ha emitido, pero no se ha publicado desde este entorno en su GitHub ni en su Apps Script.

## IAT y SAT

Ruta única: **Documentación → Protocolos**. Ya no aparecen como funciones independientes ni permiten crear formularios nuevos. Los registros anteriores se conservan como historial de consulta.

Se incluyen 16 Excel originales, entre ellos SCADI ETP E04. Se abren/descargan en Excel, sin reconstruirlos como formularios. Conservan contenido, ejemplos, firmas y filtros que traían los originales: no son copias vacías certificadas. Antes de poner estos archivos en un repositorio público, revise los datos del documento; alternativamente sustituya la descarga por un enlace a SharePoint y retire el archivo de `web/protocolos` del repositorio público.

Administración puede pulsar **Configurar enlace Excel** en cada protocolo para guardar una dirección HTTPS compartida en la configuración central. El enlace configurado tiene prioridad sobre la copia incluida. Los permisos del documento se mantienen en SharePoint. Editar o descargar un Excel no incorpora automáticamente sus resultados a Sheets ni genera registros de ejecución en SOF-CAL.

Siete documentos tienen únicamente fuente PDF y quedan indicados como **Excel pendiente de enlace**: SAT ASC, SAT AAC-PRE V0 (sí existe Excel V0A aparte), SAT FDS, SAT VID; IAT ESC, IAT VENTILACIÓN e IAT VID. No se fabricaron Excel a partir de PDF.

En el SAT PDA original hay filtros guardados que ocultan pruebas: en Excel, quite los filtros para ver el contenido completo. En SCADI SAT utilice la hoja `new` para el esquema vigente; la hoja `old` se conserva como parte del archivo original. No se han modificado las celdas de los libros.

## Instalar el APK

1. Actualice primero Apps Script siguiendo los pasos 2 y 3. El acceso Android necesita `Android45.gs` y `Code.gs` de esta entrega.
2. Descargue `SOF-CAL-4.5.0.apk` en Android 8 o superior y ábralo. Autorice instalar desde la aplicación que está abriendo el archivo, si Android lo solicita.
3. Abra SOF-CAL con internet. Pulse Continuar con Google; la autenticación abre el navegador externo. Tras verificar su cuenta, pulse **Volver a SOF-CAL** para regresar al APK.
4. Verifique que su usuario y registros sean correctos. Cree un borrador de prueba, cierre y abra el APK, active modo avión y compruebe que puede retomarlo. Al recuperar internet, vuelva a abrir la app y compruebe el envío.
5. Para continuar usando borradores del navegador en el APK, sincronícelos primero o utilice el respaldo/importación existente. El navegador y el APK tienen almacenamientos separados.

El APK contiene la interfaz y los documentos incluidos: no necesita descargar la página para abrirla. Requiere una primera autenticación online; después permite retomar trabajo local durante el acceso verificado de 8 horas. El acceso vencido requiere conexión para verificar la cuenta; no borra borradores. Los consecutivos definitivos y la sincronización central requieren conexión. La cola automática se procesa con la app abierta: no se ha implementado un servicio Android que sincronice mientras la app está cerrada.

Las descargas/exportaciones usan “Guardar como” de Android. Para editar Excel sin internet, guarde primero una copia y ábrala con una aplicación compatible. Los enlaces remotos no se vuelven offline por instalar el APK.

No desinstale ni borre los datos de Android para actualizar: instale futuras versiones firmadas con la misma clave encima de la existente. Conserve `SOF-CAL-Android-clave-privada.zip` en un lugar privado; contiene la clave y su contraseña para firmar futuras actualizaciones. Nunca lo suba a GitHub.

## Validación y límites

APK compilado; paquete, versión y firma v2/v3 verificados. Pruebas locales automatizadas y verificación de PDF realizadas; detalle en `VALIDACION-4.5.0.md`. No hubo teléfono/emulador disponible para probar instalación, interfaz Android, selectores de archivos y retorno Google de extremo a extremo. El APK es una primera compilación para validación en dispositivo, no una certificación de ausencia de errores.

No se ejecutaron cambios ni correos reales en su servidor. El envío a administradores necesita activar `activarNotificacionesRegistros44` en Apps Script; consulte `NOTIFICACIONES-4.4.0.md` para el procedimiento, que sigue vigente. La integración LME/Control Excel debe comprobarse en su Power Automate/SharePoint real.
