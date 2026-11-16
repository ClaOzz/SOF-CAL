# SOF-CAL 4.5.2 — Editar destinatarios de avisos

## Uso

Ajustes → Google y respaldo → Avisos de registros nuevos → **Editar correos**.

El administrador puede agregar, modificar o quitar direcciones. Se aceptan correos separados por líneas, comas o punto y coma. Al pulsar **Guardar correos**, se validan, se normalizan y se eliminan los duplicados. Los errores de formato mantienen abierto el editor para poder corregirlos.

La lista guardada sustituye los destinatarios automáticos de estos avisos. Puede incluir correos corporativos; no es necesario crearles una cuenta en la app. No otorga ni modifica roles. Los destinatarios recibirán los resúmenes de registros nuevos y la lista no se recalculará desde Usuarios mientras exista una configuración guardada.

Hasta que guarde una lista por primera vez, se conserva la selección automática de administradores activos. Los avisos de solicitud de reapertura y las alertas de calibración mantienen sus destinatarios y configuración propios.

Guardar no envía correos de prueba ni reenvía avisos ya completados. La próxima ejecución usa la lista nueva para avisos nuevos o todavía pendientes. Los envíos ya realizados no pueden retirarse. Se conserva la activación/desactivación y la periodicidad de cinco minutos.

Si desea vaciar toda la lista, desactive primero los avisos. Para volver a activarlos debe haber al menos un correo válido. Límite de configuración: 100 direcciones y 8.000 caracteres serializados. Se conserva quién cambió la lista y cuándo.

## Actualizar desde 4.5.1

1. En Apps Script, reemplace **Notificaciones44.gs** y **Code.gs** con los archivos incluidos en `google`. Mantenga los demás archivos.
2. Guarde y publique una **Nueva versión de la implementación existente**, conservando la misma URL `/exec`.
3. Web: sustituya `web` completa en el repositorio y haga Commit/Push. Espere a que finalice Publicar SOF-CAL y recargue la página.
4. Android: instale **SOF-CAL-4.5.2.apk** encima de la versión anterior, sin desinstalar ni borrar datos. Usa la misma clave de firma y un código de versión superior.
5. Como administrador, abra Avisos de registros nuevos y use Editar correos. Como usuario normal, la gestión permanece bloqueada también en el servidor.

Si viene de una versión anterior a 4.5.1, actualice todos los archivos de `google`, incluidos `Android45.gs`, `Edicion45.gs` y `Documental451.gs`. No ejecute restablecimientos ni borre hojas.

## Validación

26 comprobaciones locales, incluida la prueba ampliada de notificaciones: permisos, correos inválidos, separadores, duplicados, cambio de destinatarios, exclusión de correos retirados, listas vacías y ausencia de reenvíos históricos. Envíos simulados; no se enviaron correos reales ni se modificó su configuración activa.

APK compilado y firma verificada. Quedan pendientes la instalación y la prueba en su teléfono/servidor. Las mejoras de 4.5.1 —seguimiento documental y plano/revisión opcional— se conservan.
