# SOF-CAL 3.0 · Alcance y validación

## Incluido

Portal de actividades con marca SOF-CAL y colores corporativos. Conserva el motor de inspecciones, el catálogo anterior, las firmas del inspector y la recuperación de PDF. Incorpora los formatos recibidos como 66 recursos PDF de referencia/captura y los 285 enlaces extraídos del libro de planos.

Los IAT, SAT, liberaciones y recepciones se completan sobre las páginas originales, mediante casillas detectadas y herramientas para texto, marcas, imágenes y firmas. La detección facilita la captura; no determina por sí sola los campos técnicamente obligatorios de cada ensayo. El operador revisa todas las páginas antes de finalizar. No se genera una conformidad automática.

FNC se genera en el Word original. FHC convierte las páginas del formato recibido a un fondo fijo en Word y agrega campos editables encima: el diseño impreso se conserva, aunque no todos sus elementos de fondo son editables como una tabla nativa. Las firmas se completan posteriormente. Se recomienda revisar el DOCX en la versión de Word que utilizará la empresa antes de emitir documentos oficiales.

La importación de la orden de compra diferencia la orden formal de las cotizaciones anexas y permite revisar las partidas. El traspaso de partidas a recepción cubre las filas disponibles del original; el resto se presenta en el anexo. Cantidades recibidas, conformidad y observaciones requieren captura y revisión.

Rayados incluye directrices del procedimiento recibido, plano y revisión, respaldo del cambio, cotas X/Y/Z, unidad, instrumento, tolerancia, comentarios y fotografías. Causa raíz contiene cinco porqués, cinco categorías del Ishikawa, seis criterios ponderados, riesgos, oportunidades, SSOMA, ambiente y gestión del cambio. Exporta el Excel original rellenado y un PDF complementario.

Solicitudes de personal solo preparan la solicitud; sus aprobaciones son externas. El administrador puede agregar revisiones PDF y enlaces de manuales, planos, contratistas y presentaciones. Las revisiones anteriores se conservan para abrir registros históricos.

Google Apps Script centraliza Gmail autorizado, perfiles, consecutivos, registros, versiones, autorizaciones de emisión sin firmas, carpeta de Drive y consultas. La hoja Control incluye filtros, indicadores y gráfico. Documentacion contiene los enlaces compartidos; Detalle_Campos conserva el detalle por versión.

## Validación realizada

- Sintaxis JavaScript de la app y pruebas locales del servidor.
- Doce casos del backend: semana ISO y cambio de año; números distintos; reintentos; cambio de semana; ámbito de reservas; permisos; proyectos heredados; inicio oficial de FNC; conflictos de versión; autoría; pendientes; tratamiento de texto como fórmulas; y política de firmas. Varios aspectos se agrupan en el mismo caso.
- Dieciocho comprobaciones funcionales en navegador: formatos y enlaces, perfiles, semanas, generación de Word, excepción de Instalaciones, estabilidad de firmas al sincronizar, nombre de liberación, recuperación del UUID desde PDF, ponderación RCA, extracción de las 15 partidas de la orden formal y validaciones de inspección.
- Renderizado de muestras FNC y FHC en tres páginas para revisión visual; revisión de solicitudes y recepción después de retirar datos del ejemplo.

La validación del servidor utiliza servicios simulados para probar las reglas. No equivale a una prueba de Google real: OAuth, permisos de cuenta, acceso entre orígenes, carga a Drive, actualización del Sheet y cuotas deben verificarse después del despliegue en la cuenta propietaria. No se ha publicado ni activado una conexión real desde esta entrega.

## Elementos que requieren configuración o documentación adicional

- Gmail del administrador y de los usuarios, cliente OAuth, implementación de Apps Script, dirección del Sheet y carpeta destino.
- Últimos consecutivos oficiales de FNC/FHC por proyecto y año; no se copiaron números de los ejemplos.
- No se identificó un formato controlado específico de permisos ni un registro de asistencia separado con su PPT de sensibilización. Los módulos disponibles están rotulados como registros provisionales cuando corresponde. El administrador puede cargar el documento o enlace aprobado.
- Cambiar un código o revisión impreso exige incorporar el formato aprobado correspondiente. Esta app no convierte una plantilla no aprobada en una aprobada ni modifica sus encabezados por su cuenta.
- Se retiró la conexión a Microsoft 365. Esta entrega no envía correos automáticos. Los documentos se sincronizan con Drive al exportar y las inspecciones generan su PDF mediante guardar/exportar. La información capturada se sincroniza como datos mientras la app está conectada.
- La sincronización se realiza al guardar y mediante consultas periódicas. No hay garantía de latencia cero. Los borradores locales requieren respaldo; los nuevos consecutivos necesitan conexión.

## Conservación y uso

La carpeta destino elegida por el administrador se utiliza para las nuevas versiones. Los archivos existentes no se mueven. Los cambios de estado y versiones se conservan para consulta; una reserva cancelada puede dejar un salto en la secuencia.

No borres los registros, reservas o contadores para corregir una duplicación. Identifica el UUID y la versión, conserva una copia local, revisa la base y luego descarga la versión central. Mantén respaldos periódicos del libro y de Drive.
