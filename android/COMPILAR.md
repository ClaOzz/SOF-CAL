# Recompilar Android

Se utilizó Android SDK platform 35, build-tools 35.0.0 (la carpeta del ZIP oficial se llama android-15), Java 21 y Eclipse ECJ 3.33.0 como compilador Java. No hay dependencias Gradle ni librerías nativas.

1. Compile MainActivity.java con nivel Java 8, android.jar y core-lambda-stubs.jar en el bootclasspath.
2. Genere classes.dex con d8 --min-api 26.
3. Copie la carpeta web completa a assets/web; empaquete manifiesto, res y assets con aapt.
4. Agregue classes.dex al ZIP APK, ejecute zipalign y firme con apksigner usando la clave conservada por el titular. Incremente versionCode en futuras actualizaciones.
5. Verifique firma con apksigner verify y pruebe instalación sobre la versión anterior, conservación de datos, acceso Google, modo avión, sincronización y exportación en Android real.

El código carga únicamente los recursos locales de la aplicación en WebView. Los enlaces remotos se abren en el navegador; el retorno de Google utiliza un ticket de un uso vinculado a un verificador que permanece en el dispositivo. Los tokens no se pasan en enlaces profundos Android. CSP bloquea frames/objetos externos. No se permite HTTP ni acceso a archivos del sistema mediante file://.

Documentación técnica: https://developer.android.com/develop/ui/views/layout/webapps/load-local-content y https://developer.android.com/privacy-and-security/risks/insecure-webview-native-bridges
