# Avisos de registros nuevos a administradores

SOF-CAL continúa en 4.4.0. El paquete incorpora el envío; debe instalarse y activarse en el proyecto real de Apps Script.

## Instalar y activar

1. En el proyecto Apps Script de SOF-CAL, agregue un archivo llamado Notificaciones44.gs y copie su contenido desde google/Notificaciones44.gs del paquete.
2. Reemplace Code.gs por google/Code.gs. Conserve las propiedades del proyecto, la base de datos y las demás funciones.
3. Compruebe en Usuarios que los destinatarios tengan su correo, Activo = Sí y perfil admin o admin_calidad. La lista de destinatarios se calcula desde esa hoja: no se añaden correos inventados ni todos los inspectores.
4. En el selector de funciones, ejecute activarNotificacionesRegistros44 y acepte los permisos de correo y desencadenadores si Google los solicita. La activación no envía avisos históricos ni un correo de prueba.
5. Publique una nueva implementación interna sobre la existente: Implementar → Administrar implementaciones → Editar → Nueva versión → Implementar. Conserve el mismo /exec.
6. Actualice la carpeta web completa en GitHub para disponer del control en Ajustes → Google y respaldo → Avisos de registros a administradores. Allí podrá consultar los destinatarios y activar/desactivar el envío. No se agrega una tarjeta nueva en Ajustes.
7. Cargue un registro nuevo en la base compartida. Espere la ejecución periódica y compruebe el correo y la hoja _Avisos_Registros44. También puede ejecutar notificarRegistros44 para procesar los avisos pendientes: esa función sí envía correos reales si hay registros nuevos.

## Comportamiento

- Revisión cada cinco minutos, sujeta a ejecución y cuotas de Google; no se promete entrega instantánea.
- Un resumen individual para cada administrador activo, con hasta 50 registros pendientes por ejecución. Incluye código, función, proyecto, sistema, autor, fecha y enlace a SOF-CAL.
- Cubre registros compartidos de las funciones generales, equipos de medición, seguimiento de Calidad y BoQ. Las importaciones nuevas posteriores a la activación también se notifican.
- No avisa por borradores guardados solo en el teléfono, asignación de consecutivo sin envío o cada edición del mismo registro. Los registros que ya existían al activar se marcan como anteriores a activación.
- Los destinatarios se vuelven a comprobar en cada envío; un administrador desactivado deja de recibir avisos.
- El envío se ejecuta aparte del guardado para no agregar demora al uso de la app.
- Si falta cuota o falla un destinatario, queda pendiente para un siguiente intento; se conserva qué destinatarios ya recibieron cada aviso. Un corte excepcional entre el envío del correo y el registro de su confirmación podría provocar repetición en el reintento.
- Para detener el proceso, use Desactivar en Ajustes o ejecute desactivarNotificacionesRegistros44. Los avisos que ya estaban pendientes se conservan para una reactivación; no se borra su historial.
- Esta función es independiente de las alertas diarias de calibración/acciones y de los avisos de enlaces LME faltantes. No necesita configurar un enlace LME para activarse.

## Validación realizada

Pruebas simuladas de destinatarios activos, correos duplicados, exclusión de registros históricos, activación idempotente, envíos nuevos, reintentos por destinatario, cuotas, permisos y desactivación superadas. No se ha enviado correo real ni activado un desencadenador en la cuenta del usuario desde este entorno.
