# MatiasTanoni-TP1-PROG4-2025-C2
🕹️ Sala de Juegos

Bienvenido a Sala de Juegos, una plataforma web interactiva donde los usuarios pueden jugar a distintos juegos, consultar resultados y participar en un chat en tiempo real.

📌 Características

Múltiples juegos: incluye juegos como Ahorcado, Mayor o Menor, Preguntados y El Tesoro Escondido.

Autenticación de usuarios: iniciar sesión, registrarse y cerrar sesión de forma segura.

Confirmaciones de acciones críticas: mensajes de confirmación al cerrar sesión para evitar pérdida de progreso.

Resultados y estadísticas: los usuarios pueden ver sus puntajes y resultados acumulados.

Responsive: interfaz adaptativa para escritorio y dispositivos móviles, con menú hamburguesa en mobile.

Chat en tiempo real: los usuarios registrados pueden comunicarse entre sí dentro de la plataforma.

🛠️ Tecnologías utilizadas

Frontend: Angular (Standalone Components, Signals)

Backend / Servicios: Supabase (Autenticación y base de datos)

Estilos: Tailwind CSS

Gestión de rutas: Angular Router

Componentes personalizados: Dialogs, Menú hamburguesa, Formularios reactivos

⚡ Funcionalidades principales

Navbar dinámico:

Muestra opciones distintas según si el usuario está logueado o no.

Botón de “Cerrar sesión” con confirmación para evitar perder progreso.

Responsive: menú normal en escritorio y hamburguesa en mobile.

Gestión de usuario:

Login / Registro con actualización automática del navbar.

Logout con confirmación y limpieza de datos de usuario en la interfaz.

Juegos interactivos:

Cada juego bloquea la navegación mientras está activo para evitar pérdida de progreso.

Resultados guardados automáticamente en la base de datos.

Chat:

Solo disponible para usuarios registrados.

Interfaz simple para comunicación en tiempo real.

💾 Instalación

Clona el repositorio:

git clone https://github.com/tu-usuario/sala-de-juegos.git
cd sala-de-juegos


Instala dependencias:

npm install


Configura Supabase:

Crea un proyecto en Supabase

Copia tu URL y ANON_KEY en environment.ts

Ejecuta la aplicación:

ng serve


Abre tu navegador en http://localhost:4200

📁 Estructura del proyecto
src/
├─ app/
│  ├─ components/        # Componentes reutilizables (navbar, confirm dialog, spinner)
│  ├─ pages/             # Páginas principales (home, about, games, results, chat)
│  ├─ services/          # Servicios (auth, databases, surveys)
│  ├─ app-routing.module.ts
│  └─ app.module.ts
├─ assets/               # Imágenes y recursos
├─ environments/         # Variables de entorno
