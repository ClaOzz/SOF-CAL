# SOF-CAL · Configuración de Google y Android

Versión 3.0 · 28 de octubre de 2026

La app y el servidor están preparados. Este paquete no está conectado todavía a una cuenta real de Google: hay que ejecutar la configuración siguiente. No contiene contraseñas de Gmail ni secretos OAuth.

## 1. Archivos del paquete

- `web/index.html`: SOF-CAL con los formatos recibidos, el catálogo y el motor de exportación.
- `web/manifest.webmanifest`, `web/sw.js` e iconos: instalación como aplicación web en Android.
- `web/config.json`: dirección del servidor y del libro, inicialmente vacías.
- `google/Code.gs`, `google/Dashboard.gs`, `google/appsscript.json`: servidor Google Apps Script.
- `CONFIGURACION-GOOGLE.html`: esta guía para abrirla en un navegador.
- `ALCANCE-Y-VALIDACION.md`: funcionamiento, comprobaciones y límites de esta entrega.

El HTML suelto permite revisar la app y preparar datos mediante la administración local. Para Gmail y sincronización debe abrirse desde una dirección HTTPS. Una ruta `content://` o `file://` de Android no sirve para el retorno de Google.

## 2. Publicar la carpeta web

Puedes utilizar un alojamiento HTTPS que controles. Para GitHub Pages, publica únicamente el contenido de `web/` como fuente del sitio. En Settings → Pages selecciona la rama y la carpeta que contienen `index.html`; GitHub mostrará la dirección definitiva. Conserva esa dirección, incluida la carpeta del repositorio y la barra final.

Este HTML incluye los formatos y enlaces de consulta. Quien pueda descargar el sitio puede obtener esos recursos incorporados; el login protege las operaciones del servidor, no el código ni los archivos incrustados. Publica estos recursos solo en un alojamiento cuya visibilidad sea adecuada para la documentación de la empresa. Los registros de campo se guardan en la cuenta Google configurada, no en GitHub.

Por el tamaño del HTML, si la carga desde la web de GitHub no lo acepta, utiliza GitHub Desktop o Git para subirlo. No subas inspecciones, respaldos, claves o credenciales al repositorio.

Fuente: [publicación de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## 3. Crear el servidor y la base

Haz estos pasos preferiblemente desde una computadora, con el Gmail que será propietario del servicio.

1. En Google Apps Script crea un proyecto nuevo llamado `SOF-CAL`.
2. Pega el contenido de `google/Code.gs` en el archivo Código/Code.gs.
3. Crea otro archivo de secuencia de comandos llamado `Dashboard` y pega `google/Dashboard.gs`.
4. En Configuración del proyecto activa la visualización de `appsscript.json`. Sustituye su contenido por el archivo incluido.
5. En Propiedades del script agrega `ADMIN_EMAIL` con tu Gmail. No uses aquí el correo corporativo si no es una cuenta Gmail: esta versión permite las cuentas `@gmail.com` solicitadas.
6. Opcional: agrega `SPREADSHEET_ID` si quieres usar un libro creado por ti. Es el segmento de su URL entre `/d/` y `/edit`. Usa un libro dedicado a SOF-CAL; el inicializador prepara y protege sus hojas.
7. Ejecuta `configurarSOFCAL` desde el editor. Google solicitará al propietario los permisos para administrar el libro, los archivos y el servicio. Si una política de la cuenta bloquea la autorización, resuelve esa configuración antes de continuar.
8. El registro de ejecución mostrará la URL del libro. Si no indicaste un libro, se crea `SOF-CAL · Base de datos y Control`. Las carpetas iniciales también se crean en el Drive del propietario.
9. Abre Implementar → Nueva implementación → Aplicación web. Ejecutar como: tu cuenta propietaria. Acceso al punto de entrada: Cualquier usuario. La API exige además una sesión Google y un correo activo en Usuarios para cada operación. No compartas públicamente el Sheet ni las carpetas por este paso.
10. Implementa y copia la URL terminada en `/exec`. No uses la dirección de prueba `/dev`.

Fuente: [aplicaciones web de Google Apps Script](https://developers.google.com/apps-script/guides/web).

## 4. Configurar el acceso con Gmail

1. En Google Cloud crea o selecciona un proyecto y configura Google Auth Platform / pantalla de consentimiento: nombre SOF-CAL, correo de asistencia y correo de contacto.
2. Para cuentas Gmail personales, configura audiencia externa. Durante las pruebas agrega cada Gmail participante como usuario de prueba. Antes de un uso general completa la publicación/verificación que Google indique para tu proyecto.
3. Crea un cliente OAuth de tipo **Aplicación web**. Agrega como URI de redirección autorizada la URL exacta de Apps Script terminada en `/exec` del paso anterior. No agregues el enlace del Sheet como redirección.
4. Copia el ID del cliente y su secreto **directamente en Propiedades del script**. Nunca los pongas en `index.html`, `config.json` ni en un repositorio.
5. Completa las propiedades siguientes:

| Propiedad | Valor |
| --- | --- |
| `ADMIN_EMAIL` | Gmail del administrador inicial |
| `SPREADSHEET_ID` | Ya creado por el inicializador, o el libro dedicado que seleccionaste |
| `GOOGLE_CLIENT_ID` | ID del cliente OAuth web |
| `GOOGLE_CLIENT_SECRET` | Secreto del cliente; permanece en Apps Script |
| `WEB_APP_URL` | Dirección exacta de la implementación `/exec` |
| `APP_URL` | Dirección HTTPS exacta de SOF-CAL a la que volverá el usuario |

`DATA_FOLDER_ID` y `DOCUMENT_FOLDER_ID` se crean durante la inicialización. No es necesario modificarlos a mano. La app cambia su destino desde el panel del administrador.

La autorización de los usuarios solicita identidad, nombre y correo. El servidor accede a Sheets y Drive con los permisos del propietario que publicó Apps Script. No solicita la contraseña Gmail dentro de SOF-CAL. La sesión de la app dura como máximo una hora; al vencer se vuelve a iniciar sesión.

Fuente: [flujo OAuth para aplicaciones web](https://developers.google.com/identity/protocols/oauth2/web-server).

## 5. Vincular la app

Edita `web/config.json` con este contenido, sustituyendo los valores de ejemplo:

```json
{
  "endpoint": "URL_DE_APPS_SCRIPT_TERMINADA_EN_EXEC",
  "sheetURL": "URL_DE_TU_GOOGLE_SHEET"
}
```

Publica ese archivo junto a `index.html`. Solo contiene direcciones, nunca secretos. Así cada teléfono recibe la configuración al abrir el sitio. Como alternativa, el administrador puede usar **Configurar conexión** desde la pantalla de acceso; esa configuración se conserva solo en ese navegador.

Entra con **Continuar con Google**, elige un Gmail autorizado y pulsa **Volver a SOF-CAL** en la página de retorno. El administrador puede publicar los catálogos iniciales desde **Administración → Publicar catálogos en Sheets**. Los demás usuarios los descargan al entrar; también existe un botón de actualización manual. Los cambios en los enlaces se publican al guardarlos si el administrador está conectado.

El administrador local conserva la contraseña de la versión anterior en el mismo navegador/origen. En una instalación sin datos previos, el valor inicial heredado es `1234`; cámbialo desde Administración → Seguridad. Ese acceso sirve para preparar datos antes de configurar Google. No concede acceso al servidor.

## 6. Autorizar usuarios y perfiles

En la hoja `Usuarios`, completa una fila por persona:

| Columna | Qué escribir |
| --- | --- |
| Correo Gmail | Gmail personal autorizado, completo |
| Nombre | Nombre y apellido que aparecerán como responsable |
| Perfil | `admin`, `calidad` o `instalaciones` |
| Activo | `Sí` o `No` |
| Trigrama | Trigrama del inspector, igual al catálogo de SOF-CAL |
| Google sub | Dejar vacío inicialmente: se completa al primer acceso |

Instalaciones tiene Liberaciones, IAT, SAT, Rayados y Sensibilizaciones. Calidad tiene todas las actividades. Administración añade configuración y autorizaciones. El servidor revisa el perfil y el estado activo en cada llamada.

Selecciona en las inspecciones el inspector vinculado a tu Gmail. La cuenta administradora puede migrar registros de otros inspectores. No compartas la contraseña de Google entre trabajadores.

## 7. Designar la carpeta de Google Drive

1. Crea o identifica la carpeta destino en Google Drive.
2. Asegúrate de que el propietario que publicó Apps Script pueda crear archivos en ella.
3. Copia el enlace de la carpeta.
4. Entra a SOF-CAL con un Gmail cuyo perfil sea `admin`.
5. En la pantalla de actividades pulsa **Carpeta de Google Drive**.
6. Pega el enlace o el ID y pulsa **Usar esta carpeta**.

En esa carpeta se crean `SOF-CAL - Datos y versiones` y `SOF-CAL - Documentos`. Los documentos se organizan por responsable → actividad → sistema. Por ejemplo: `SOF-CAL - Documentos / Wandry Parra / Liberaciones / PAT`.

Los archivos de FNC y FHC son Word. Los PDF de inspecciones y otras actividades, y el Excel de causa raíz, se cargan desde sus respectivas exportaciones. Sheets conserva los enlaces.

Cambiar la carpeta afecta a nuevos archivos y versiones. No mueve ni borra documentos anteriores; sus enlaces siguen funcionando. El acceso directo a los archivos respeta los permisos de Drive de esa carpeta. Utiliza una carpeta cuya lista de personas con acceso corresponda a la información que vas a guardar.

## 8. Consecutivos y prevención de duplicados

- El número definitivo lo asigna Apps Script bajo bloqueo central. Dos solicitudes no leen e incrementan libremente el mismo contador.
- Una misma reserva se identifica por UUID; reintentar no crea un nuevo número.
- Las liberaciones siguen `PAT4426-001`: sistema PAT, semana ISO 44, año ISO 2026, secuencia 001. El siguiente lunes comienza 001 para ese sistema. Se comparte el contador de liberaciones entre proyectos para evitar códigos idénticos.
- El nombre del PDF contiene código de ficha, actividad, ubicación y consecutivo. Los caracteres no válidos para un archivo se reemplazan por guiones.
- Las inspecciones mantienen su esquema `INSP-CAL-SISTEMA-TRIGRAMA-NÚMERO`.
- FNC/FHC necesitan que el administrador indique el último número oficial usado en `Consecutivos`. Ejemplo de clave: `FNC|D220|2026`; si el último usado fue 25, escribe 25 y el próximo será 026. No se deducen números de las fichas de ejemplo.
- Una reserva no se reutiliza si el trabajo se cancela: puede haber saltos, pero no se reasigna un número ya reservado. No reduzcas ni borres contadores o reservas.
- Sin conexión se conserva el borrador. Para obtener un nuevo número definitivo se requiere conexión y sesión Google vigente.

## 9. Dashboard y seguimiento

Abre la hoja `Control`. Cambia Actividad, Responsable, Estado, Desde y Hasta. Se recalculan registros, finalizadas, pendientes, vencidas, porcentaje finalizado, OK/NOK/N/A/PEND/Sin responder y totales de semana/mes.

Cada actividad tiene su propia pestaña, alimentada desde `Registros`. No escribas sobre las fórmulas de esas vistas. `Detalle_Campos` conserva los campos por UUID y versión. `Documentos` contiene los archivos exportados; `Auditoria` registra operaciones.

En SOF-CAL, **Control central** permite filtrar, abrir registros y actualizar seguimiento. La app consulta aproximadamente cada 30 segundos mientras está visible y en línea; también puedes actualizar manualmente. No es una conexión continua de tiempo real. Las fórmulas del libro muestran las escrituras que ya llegaron al servidor.

El propietario del Sheet puede actualizar el seguimiento en `Registros`, columnas T–V. Para otros usuarios, utiliza el botón Seguimiento en la app. Los datos técnicos de una ejecución se modifican desde SOF-CAL para conservar versiones.

## 10. Firmas y excepciones

En inspecciones se requiere la firma del inspector; los demás participantes son opcionales. FNC/FHC dejan sus espacios de firmas para el trámite posterior.

En liberaciones, Calidad requiere firmas válidas de los presentes. Si faltan, el inspector solicita una excepción indicando el motivo. El administrador consulta el registro y autoriza desde **Excepciones de firmas**. El inspector vuelve a exportar. Si cambia el contenido, esa autorización deja de corresponder a la nueva versión. Instalaciones puede emitir sin confirmación administrativa, dejando constancia en el PDF. La excepción de firmas no sustituye la aprobación técnica de la ejecución.

## 11. Instalar en Android y actualizar

1. En Chrome abre la dirección HTTPS publicada de SOF-CAL, no el HTML desde RAR o Descargas.
2. Espera la primera carga completa; el paquete incluye numerosos formatos.
3. Configura o verifica la conexión y accede con Gmail.
4. En el menú de Chrome, elige **Instalar aplicación** o **Agregar a pantalla principal**, según la versión del navegador.
5. Abre SOF-CAL desde el icono. Para trabajar sin señal, entra antes con conexión; puedes continuar el borrador durante la sesión. Tras cerrar la app o vencer la sesión puede ser necesario volver a conectarte para autenticarte.

Para actualizar, sustituye los archivos del sitio manteniendo la misma dirección. Los datos locales se conservan por navegador y origen. Cambiar de dominio, borrar datos de Chrome o abrir otra copia local crea otro almacenamiento: exporta un respaldo antes de migrar.

## 12. Migrar el histórico y restaurar

Desde la versión anterior exporta el respaldo y/o los PDF recuperables antes de sustituirla. La versión nueva mantiene el nombre de la base local, de modo que puede reutilizarla si se abre desde el mismo origen.

Los PDF de inspección generados por SOF-CAL conservan datos recuperables. Los PDF de actividades de esta versión también incluyen su registro. Un escaneo o un PDF ajeno no basta para recuperar todos los campos. Importa los PDF desde el historial correspondiente, o restaura el archivo de respaldo.

Después de revisar la importación, el administrador puede usar **Control central → Exportar todos los registros locales**. Los consecutivos históricos válidos se conservan y los contadores suben hasta el mayor utilizado. Los conflictos se presentan para revisión; no se sobreescriben silenciosamente.

## 13. Comprobar la instalación real

Antes de usarla en producción, prueba en un libro dedicado de ensayo: dos Gmail autorizados; un tercero no autorizado; perfiles Calidad/Instalaciones; una liberación desde cada teléfono; actualización del dashboard; carga de PDF y Word en la carpeta elegida; excepción de firmas; desconexión/reconexión; recuperación de un PDF; y conflicto de edición desde dos dispositivos.

Si aparece “no devolvió JSON”, revisa URL `/exec`, acceso de la implementación, cuenta propietaria y versión publicada. Si aparece `redirect_uri_mismatch`, compara exactamente `WEB_APP_URL` y la redirección OAuth. Si aparece “sesión vencida”, vuelve a entrar. Si hay un conflicto, respalda los cambios locales y descarga la versión central desde Control.

Para cambiar el código Apps Script, actualiza la implementación existente a una nueva versión, conservando su URL. Los límites y cuotas de Apps Script se aplican a la cuenta propietaria; esta solución está orientada a un equipo de trabajo y requiere revisar capacidad si aumentan los registros, evidencias o usuarios.

Referencia: [cuotas de Apps Script](https://developers.google.com/apps-script/guides/services/quotas).
