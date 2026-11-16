# SOF-CAL 4.2.0 — Actualización de la app existente

## Instalación
1. Respalde el repositorio y los borradores. No use restablecimiento ni borre datos del navegador.
2. En Apps Script, sustituya los archivos de `google` que ya existen y agregue **Gestion42.gs** y **Firmas42.gs**. Conserve IDs, propiedades y credenciales de su instalación.
3. Ejecute **actualizarSOFCAL42** una vez desde el editor. Crea las hojas nuevas y habilita equipos y seguimiento para Calidad. Conserva registros y consecutivos. Crea una captura diaria de indicadores; no activa correos.
4. Implemente una nueva versión sobre el mismo `/exec`. El paquete conserva la URL facilitada por Oscar: termina en `...D70B4LrWz3u6okdC-IPnq7/exec`.
5. Reemplace **toda la carpeta web** en GitHub Desktop, confirme y haga Push a main. Pages debe usar GitHub Actions y publicar ./web. Incluya foda-template.pptx y guia-puertas42.png. El HTML supera 25 MB: use GitHub Desktop.
6. Abra la app y compruebe versión **4.2.0**. Cierre y abra si seguía cargada la anterior. No borre almacenamiento sin respaldar borradores.
7. En Ajustes revise usuarios, perfiles, LME, destinatarios y textos. Para alertas, primero guarde destinatarios y active la opción; después ejecute **activarAlertasSOFCAL42**. El proceso diario usa la zona America/Santo_Domingo.
8. Actualice Power Automate con `power-automate/ACTUALIZAR-LME-42.md`. Haga una sincronización manual y compruebe documentos antes de programarla.

## Banco de firmas
- Funciones → Banco de firmas, o Ajustes → Firmas registradas.
- Dibujar o cargar PNG/JPEG; nombre, cargo, correo y confirmación de autorización del titular.
- El administrador asigna correos autorizados. El titular puede usar su firma. La imagen se almacena en Drive privado; la hoja Firmas guarda metadatos. No publique estas imágenes en GitHub.
- En Inspecciones y Participantes: **Usar firma guardada**. Se selecciona y confirma cada aplicación. Para el inspector, el nombre debe coincidir.
- En Solicitudes de personal → Revisión: **Adjuntar firma del solicitante**. Se coloca en su casilla del formato. No completa aprobaciones de RRHH.
- Uso_Firmas conserva documento, hash de contenido, versión de firma, cuenta y fecha. Al cambiar contenido se requieren firmas de la revisión nueva.
- Desactivar impide nuevos usos; conserva documentos emitidos. Una imagen de firma no es una firma digital criptográfica.

## Cambios incluidos
- LME configurable y consulta agrupada por sistema/proveedor; enlaces adicionales administrables.
- RRHH: solicitud directa, sin Datos de inspección; diez casillas mapeadas en Horas Extras. Se conservan originales y aprobaciones externas.
- Eliminación de registros en todas las funciones: los centrales requieren Admin, usan retirada lógica y no reutilizan códigos.
- AQL provisional mientras se responde; no modifica la tabla corporativa ni sustituye Ac/Re.
- Catálogo: publicación al guardar, marcador de cambios pendientes y migración que no reaplica textos sobre posteriores ediciones.
- Inspectores: deduplicación visible por nombre normalizado, sin borrar referencias históricas.
- Sesión recordada hasta 8 horas (ajuste vigente en 4.4.0), verificada en cada acceso; Cambiar cuenta y Cerrar sesión revocan el acceso del dispositivo.
- Equipos: inventario, historial de calibración, filtros, costos por moneda, BoQ, disponibilidad objetivo 90%, Excel/PDF/CSV y reportes por período.
- Calidad: FNC/FHC/INF/IAT/RL, criticidad, acciones, seguimientos, evidencias, indicadores, resumen semanal PDF/PPTX. Vincular documentos existentes conserva su código y evita otro seguimiento duplicado.
- Editor compartido de textos/apariencia; esquema editable de los nuevos módulos. Los IDs y los tipos necesarios para cálculos/permisos permanecen protegidos.

## Reglas y límites explícitos
- Calibración: >=90 días Disponible; 30–89 Próximo; <30 Vencido/bloqueo operativo. Se muestra aparte si el certificado aún es cronológicamente vigente. Sin certificado no se cuenta conforme. Averiado/Desvinculado prevalecen.
- Presupuestos BoQ expresados en DOP. Costos por proveedor/proyecto/categoría se separan por moneda; no hay conversión automática.
- Nuevos módulos trabajan contra Google y requieren conexión para guardar. Los cambios se conservan como borrador local y se ofrecen al reabrir la función; no representan una escritura central hasta confirmar Guardar.
- Los reportes por período agrupan registros por apertura/última calibración y muestran su estado actual. Indicadores42 conserva capturas diarias desde la instalación; no reconstruye disponibilidad histórica anterior.
- Power BI: exportación CSV para importar; no se crea ni publica un modelo en su cuenta Power BI.
- La guía ilustrada inicial cubre controles de puertas (marco, cierrapuertas, identificación), basada en páginas 19–20 del manual aportado. El administrador puede cargar imágenes documentadas en cualquier criterio. No se han generado guías técnicas para todos los manuales/sistemas.
- No se importó automáticamente el Excel privado de seguimiento de calidad. El módulo usa los campos y reglas indicados por Oscar. La importación histórica requiere leer y conciliar ese archivo.
- Cambiar LME requiere que el flujo consulte la nueva configuración. Si cambia el sitio/biblioteca y el conector no permite parámetros dinámicos, se ajustan esos selectores del flujo.
- El envío automático está desactivado hasta configurar destinatarios y activar el proceso. No se enviaron correos de prueba.

## Validación realizada
Pruebas locales de reglas, permisos, conflictos, secuencias, borrado lógico, banco de firmas e inicio de sesión. Comprobación visual de inicio, funciones, inventario y mapeo de Horas Extras en navegador de prueba. Exportaciones Excel/PDF/PowerPoint generadas y reabiertas para validar contenido. No se han desplegado los cambios en Google/GitHub ni probado una sincronización real con Power Automate.
