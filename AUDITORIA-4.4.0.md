# SOF-CAL 4.4.0 · Auditoría y correcciones

Fecha: 6 de noviembre de 2026. Se conserva la versión 4.4.0.

## Correcciones realizadas

- Fechas imposibles o mal formadas ya no clasifican un equipo como disponible. Se validan también fechas de calibraciones, compromisos y cierres.
- Un registro importado sin evaluación de riesgo ya no detiene todas las alertas diarias. Se identifica como pendiente de evaluación.
- Los pendientes de inspección conservan el responsable y la fecha de seguimiento capturados; también los valores cero, los títulos generales y el número de fotografías.
- La ficha de equipos y calidad incluye Guardar cambios para quien tiene permiso de edición; permite persistir adjuntos y calibraciones añadidos desde la ficha.
- Las respuestas de una sesión anterior se descartan al cambiar de cuenta. Las nuevas colas locales de registros y adjuntos identifican la cuenta que las generó.
- Las consultas de equipos y BoQ se ejecutan en paralelo y sin duplicaciones simultáneas. La actualización automática del módulo se limita a cada dos minutos; Actualizar permite consultar inmediatamente.
- Un cambio de módulo mientras se consulta no coloca equipos en la lista de calidad ni sobrescribe la pantalla recién abierta.
- El visor de formatos descarta renderizados atrasados al cambiar de registro, página o pantalla.
- La LME admite enlaces de ambos dominios corporativos SharePoint, incluido el dominio personal corporativo. Muestra los errores de actualización en lugar de ocultarlos.
- Se bloquea la carga de documentos sobre registros eliminados y se valida la estructura de listas recibidas por el servidor.
- Se conserva la carga bajo demanda de 67 PDF, la sesión de ocho horas, las carpetas por contratista y los avisos de nuevos registros a administradores.

## Validación

Se ejecutaron las 11 suites de pruebas incluidas en pruebas/, más la comprobación de renderizado simulado de tablas, tableros, fichas, permisos de guardado, documentación, contratistas y las cuatro tarjetas de Ajustes. Se verificó la sintaxis de los scripts ensamblados y la integridad del ZIP.

Las pruebas utilizan servicios simulados. No se accedió a las cuentas reales ni se enviaron correos. El navegador automatizado no pudo iniciarse en este entorno; no se certifica la presentación visual en todos los dispositivos. Esta revisión corrige los problemas reproducidos, pero no garantiza ausencia absoluta de errores.

## Actualización sin perder datos

1. Conserva una copia de seguridad del despliegue actual y de la hoja central.
2. Sustituye el contenido publicado de web/ por el incluido en este paquete, incluyendo formatos/ y sw.js. Conserva la configuración de conexión propia si la personalizaste.
3. Actualiza en tu proyecto Apps Script los archivos Code.gs, Gestion42.gs, Pendientes44.gs y DocumentacionLME.gs con los de google/. Conserva los demás archivos, incluido Notificaciones44.gs. No ejecutes restablecimientos ni importes nuevamente las copias iniciales.
4. En Apps Script, abre Implementar → Administrar implementaciones → Editar → Nueva versión y actualiza la implementación existente para conservar su URL /exec. Esto actualiza el código del servidor, sin cambiar el número de versión 4.4.0 de SOF-CAL.
5. Recarga la app y ciérrala/ábrela si la versión instalada conserva el caché anterior.
6. Prueba con una cuenta de administrador y otra de consulta: consulta compartida, guardado, exportación FNC/FHC, pendientes, certificados, LME y cambio de cuenta.
7. Si los avisos aún no están activados, usa Ajustes → Google y respaldo → Avisos de registros a administradores. Autoriza los permisos solicitados por Google. La comprobación de entrega real queda pendiente; el paquete no activa remotamente tu servidor.

IMPORTACION-PRIVADA contiene datos de respaldo. No publiques esa carpeta en GitHub Pages.
