# Estado punto por punto — 4.5.0

“Implementado” describe el código del paquete. Las pruebas locales no sustituyen la instalación y las pruebas en el servidor/los teléfonos reales. No se afirma que todos los botones hayan sido probados visualmente en producción.

| Nº | Solicitud | Estado del paquete |
|---|---|---|
| 1 | Compartir registros automáticamente cada 2 horas desde el último registro | Implementado: cola por última modificación; reanudación al volver online. App abierta; sin servicio en segundo plano. |
| 2 | Recursos en Datos, sin duplicación y respetando No/N/A | Implementado; validaciones locales. |
| 3 | Pantallas desplazadas a la izquierda | Reglas comunes de anchura y adaptación; comprobación visual en dispositivos pendiente. |
| 4 | Editar borradores propios, cerrar y pedir reapertura por correo | Cliente y servidor implementados; correo simulado, entrega real pendiente. |
| 5 | Resolver consecutivos duplicados | Descartar el borrador conflictivo o solicitar siguiente disponible; no borra el registro ajeno existente. |
| 6 | Texto de RRHH y cargar PDF completado | Ajuste de texto y carga implementados; PDF de hasta 17 MB. |
| 7 | Autocompletar datos del personal/inspector | Implementado con datos disponibles; sin inventar datos faltantes. |
| 8 | Firmas simples y aprobación administrativa | Incorporación pendiente de aprobación para usuarios; administración gestiona banco. |
| 9 | Pantalla al abrir borradores | Mismas correcciones globales; validación visual pendiente. |
| 10 | Inspección anterior real | Búsqueda por serie en registros disponibles; no se fabrica restando uno. |
| 11 | Referencias de manual/norma con clic | Implementado; requiere documento/enlace existente. |
| 12 | Quitar hoja anexa de solicitudes de personal | Eliminada del flujo de exportación de RRHH. |
| 13 | Código interno en esquina de liberaciones | Incorporado en exportación PDF. |
| 14 | Privacidad RRHH | Autor/administración en cliente y servidor; filtros generales no la eliminan. |
| 15 | Sesión de 8 horas | Implementado con renovación por actividad; necesita backend actualizado. |
| 16 | FNC/FHC en PDF | Incorporado sobre formatos controlados; PDFs comprobados localmente. |
| 17 | Firma del inspector en su casilla, No aplica en otras | Incorporado en el cuadro de firmas de inspección. |
| 18 | Sustituir captura por casillas | RRHH mantiene datos de solicitud y previsualización. IAT/SAT se retiraron por la instrucción posterior: ahora son Excel en Documentación. |
| 19 | Autollenado y errores IAT | Formulario IAT retirado. Se abre el documento original; no se autocompletan sus celdas desde SOF-CAL. |
| 20 | Hallazgos sin datos duplicados ni criticidad; también FNC | Datos comunes vinculados y criticidad retirada de FNC/FHC. |
| 21 | Quitar FODA semanal | Botón retirado del flujo. |
| 22 | Finalizar al pie de FNC/FHC | Incorporado con validación de cierre. |
| 23 | Más de dos fotos | Sin máximo por cantidad; paginación en PDF. Persisten límites técnicos de tamaño: Android exporta hasta 24 MB por archivo. |
| 24 | Alertas de borrador únicamente al originador | Incorporado por identidad/correo. |
| 25 | Reinspección desde pendientes | Incorporado. |
| 26 | Falsos requisitos BTE | Validación corregida; exige instrumento solo cuando aplica a la medición. |
| 27 | Evitar cierre antes de 8 horas | Mismo cambio de sesión que 15; comprobación temporal real pendiente. |
| 28 | Indicadores del usuario por defecto | Incorporado; filtro explícito para ampliar vista, manteniendo privacidad RRHH. |
| 29 | IAT/SAT bajo Documentación → Protocolos | Incorporado; fuera del menú de funciones, sin creación de formularios y con historial conservado. 16 Excel, 7 pendientes de enlace Excel. |
| 30 | APK offline | Compilado y firmado. Interfaz/documentos incorporados, IndexedDB local, acceso offline verificado limitado a 8 horas, apertura externa Google y exportación Android. Prueba en teléfono pendiente. |

También se mantienen la agrupación documental por contratista, notificaciones administrativas y mejoras de carga de documentos de versiones anteriores. Los archivos PDF de formatos se cargan bajo demanda en la web.

## Comprobaciones ejecutadas

- Suite local: permisos de propietario/administrador, privacidad, consecutivos, sesión, notificaciones simuladas, pendientes/reinspección, recursos y registros.
- Nueva ruta de Protocolos: menú, redirección de accesos antiguos, impedir formularios nuevos, enlaces originales/configurados, archivo físico e historial.
- Android: intercambio de retorno de un solo uso, vínculo al verificador/estado, rechazo de repetición, acceso offline vinculado al token, expiración y limpieza al salir.
- PDF: generación y lectura de resultados; las pruebas antiguas de formularios IAT/SAT se conservan como pruebas de desarrollo y no implican que ese flujo siga activo.
- Sintaxis del JavaScript generado, compilación Java/DEX, manifiesto APK y firma Android.

## Pendiente en el entorno real

Instalación/uso en teléfono; retorno Google con el backend desplegado; guardado y exportación Android; pantallas móvil/tablet/escritorio; recepción real de correos; sesión transcurridas 8 horas; sincronización con su hoja y flujos de SharePoint/Power Automate. No se enviaron correos ni se modificaron registros reales desde este entorno.
