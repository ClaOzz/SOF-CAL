# Corrección de FHC y rapidez — SOF-CAL 4.4.0

La versión sigue siendo 4.4.0. Esta corrección requiere reemplazar Code.gs y actualizar la implementación existente de Apps Script para aplicar las sesiones de 8 horas.

## Instalar

1. En Apps Script, reemplace Code.gs por el incluido en google/Code.gs. En Implementar → Administrar implementaciones → Editar, seleccione Nueva versión y publique sobre la misma implementación para conservar /exec. No cambie propiedades ni inicialice los datos.
2. Reemplace la carpeta web completa del repositorio, incluida la nueva subcarpeta web/formatos. No copie únicamente index.html.
3. Envíe los cambios a main y espere que GitHub Actions termine correctamente.
4. Cierre las pestañas de SOF-CAL y vuelva a abrir. Si aún aparece la interfaz anterior, recargue una segunda vez. No borre datos del navegador: contienen borradores locales.
5. Abra un registro FHC existente y vuelva a exportarlo. Los documentos ya descargados no se modifican solos.

## Cambios

- Notificaciones por correo a administradores activos al recibir registros nuevos. Instale google/Notificaciones44.gs y siga NOTIFICACIONES-4.4.0.md para activar el envío cada cinco minutos.

- Sesiones nuevas de 8 horas desde el inicio de sesión, sin prolongación por actividad. Las sesiones anteriores de mayor duración se limitan a un máximo de 8 horas desde su próxima validación. Las vencidas o revocadas no se reactivan. Cerrar sesión continúa revocando el acceso.

- Documentación → Contratistas abre primero carpetas por nombre de empresa. Dentro se muestran solo sus documentos, con regreso al listado de contratistas. El sistema deja de definir la carpeta en esta categoría. Al agregar un documento dentro de ella, se propone la categoría y el contratista seleccionado. Los registros sin nombre se conservan en Sin contratista asignado para corregirlos desde Editar.

- FHC conserva saltos de párrafo, mantiene proporciones de imágenes, coloca una evidencia por página y añade páginas de continuación para textos largos. Incluye referencia y número de página. Conserva los fondos del formato controlado.
- Los 67 PDF originales se descargan al abrir o exportar el formato, no al iniciar la app. La primera apertura de cada formato necesita conexión; después el navegador puede reutilizar su caché.
- La página inicial pasa de aproximadamente 40 MB a 9,5 MB sin compresión de transporte. No es una medición del tiempo de Google.
- Se reutiliza la respuesta de configuración durante la carga; historial y configuración iniciales se consultan en paralelo.
- Al navegar se abre la función antes de actualizar el historial compartido. Consultas simultáneas al historial comparten la petición en curso. Registros mantiene su consulta central al entrar.
- Recursos estáticos se reutilizan desde la caché del navegador. La autenticación y los datos centrales no se sirven desde esa caché.

## Validación

Pruebas locales de interfaz, equipos, pendientes, consulta entre usuarios y descarga bajo demanda superadas. FHC adjunto regenerado y revisado en sus cuatro páginas. Pendiente prueba de usuario con Word y cuentas reales Google/Microsoft. El acceso a Google y las consultas de Apps Script conservan su tiempo de red.

Para conectar la LME siga power-automate/LME-PASO-A-PASO-4.4.0.html. La conexión no está activada por descargar este paquete.
