# SOF-CAL 4.3 · Tableros y expedientes

## Instalación

1. En Apps Script actualice `Gestion42.gs` y añada `Importacion43.gs`. Mantenga los otros archivos de la versión 4.2. Si aún no instaló 4.2, siga primero ACTUALIZAR-4.2.md.
2. Guarde y publique una nueva versión de la implementación existente. Conserve su URL /exec.
3. Reemplace la carpeta `web` de GitHub usando GitHub Desktop y publique. Espere a que Actions finalice. Recargue la app.
4. Entre como Administrador → Ajustes → Importar copias Excel. Seleccione `datos-iniciales.json` de la carpeta **IMPORTACION-PRIVADA**, que está fuera de la carpeta SOF-CAL del ZIP. Espere a que termine; si se interrumpe, repita con el mismo archivo. Los ID ya incorporados se omiten.
5. Consulte los módulos Equipos de medición y FNC/FHC. Las 39 acciones de asociación ambigua se conservan en la hoja `Importacion_Revision43`, sin asignarlas a un caso incorrecto.

**No suba IMPORTACION-PRIVADA a GitHub.** Contiene información real de calidad y equipos. Solo debe cargarse desde la app por el administrador. El sitio web no lleva esos datos incrustados.

## Datos de las copias recibidas

- 154 equipos, con sus códigos y seriales originales.
- 368 registros: 141 FNC, 138 FHC, 34 IAT, 34 INF y 21 RL.
- 130 acciones asociadas inequívocamente y 39 conservadas para revisión.
- 10 códigos repetidos en 20 filas, con descripciones distintas: se conservan por separado con advertencia.
- 15 registros sin estado: se muestran como Sin estado. No se presupone su cierre.
- Números de certificado, últimas/próximas fechas y datos de órdenes/costos del Excel conservados. No se convierten números de certificado en enlaces ni se considera una orden de compra una calibración.
- La moneda no está identificada por el registro de costos importado; se muestra como no especificada, sin sumarla artificialmente a DOP.
- No hay fotos de equipo ni hipervínculos de certificado en la hoja fuente. Cada expediente permite agregar imagen, certificados y documentos. La foto puede subirse en Documentos o indicarse mediante URL en Editar.

## Diseño y navegación

FNC/FHC es el único acceso visible al seguimiento. Se retira la tarjeta independiente Seguimiento de calidad. Los documentos anteriores no se borran del histórico.

Equipos y seguimiento tienen tabla y tablero, filtros, indicadores y ficha individual. Las tarjetas abren el registro; mover entre vistas no cambia estados ni aprobaciones. La ficha de equipo muestra identificación, documentos y trazabilidad metrológica, con campos de laboratorio, acreditación, patrones, incertidumbre y resultado. Los valores faltantes se identifican como pendientes.

Documentación usa carpetas por sistema/proveedor y tabla con revisión, estado y consulta. Mantiene el reporte de enlace faltante. Liberaciones conserva los formatos y controles de firmas, con una guía por pasos y pestañas horizontales táctiles.

Se usan microtransiciones y porcentajes de datos reales, sin premios, puntuaciones inventadas ni cierres automáticos. La preferencia del dispositivo de movimiento reducido desactiva las transiciones.

## Conexión con los archivos originales

Ajustes permite guardar las URL de los dos Excel. Todavía falta recibirlas y configurar Power Automate. Esta entrega **no escribe en esos archivos originales**. La importación escribe en Google Sheets y los cambios posteriores se guardan allí.

Antes de habilitar sincronización, hay que mapear tablas/columnas de cada archivo, comprobar permisos de la cuenta del flujo, resolver códigos ambiguos y definir cómo se detectarán conflictos entre cambios en Excel y en la app. Los identificadores de origen (archivo, hoja, fila y valores originales) quedan guardados para esa conciliación; no debe usarse únicamente el número de fila como clave futura porque puede cambiar al ordenar.

## Verificación

Se comprobaron sintaxis, generación de las vistas, unicidad de identificadores, importación completa, repetición sin duplicados y permisos, además de las pruebas existentes de gestión y firmas. Las pruebas usaron servicios simulados, no los archivos ni las cuentas en línea. La comprobación visual en navegador y la prueba de integración real quedan pendientes: el navegador de pruebas de este entorno no pudo iniciarse.
