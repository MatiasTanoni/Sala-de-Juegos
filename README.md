# 🕹️ Sala de Juegos

[![Angular](https://img.shields.io/badge/Angular-FF0033?logo=angular&logoColor=white)](https://angular.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## 🎮 Descripción

PROYECTO PROGRAMACIÓN 4 | 1ER PARCIAL | UTN

**Sala de Juegos** es una plataforma web interactiva donde los usuarios pueden jugar a distintos juegos, consultar resultados y participar en un chat en tiempo real.  
La aplicación es **responsive**, con menú hamburguesa para móviles, confirmaciones para acciones críticas y actualización automática de la interfaz al iniciar o cerrar sesión.

---

## 🚀 Características principales

- Juegos incluidos: **Ahorcado**, **Mayor o Menor**, **Preguntados**, **El Tesoro Escondido**  
- **Autenticación de usuarios:** login, registro y logout con confirmación  
- **Resultados y estadísticas** de cada usuario  
- **Chat en tiempo real** solo para usuarios registrados  
- **Navbar dinámico:** muestra opciones según el estado del usuario  
- **Responsive**: menú normal en escritorio y hamburguesa en mobile  
- Bloqueo de navegación durante los juegos para proteger el progreso  

---

## 🛠 Tecnologías

- **Frontend:** Angular (Standalone Components, Signals)  
- **Estilos:** Tailwind CSS  
- **Backend / Base de datos:** Supabase  
- **Routing:** Angular Router  
- **Componentes personalizados:** Confirm dialog, Navbar, Spinner  

---

## 💻 Instalación
Sigue estos pasos para levantar la aplicación localmente:
```
1. **Clonar el repositorio:**
```bash
git clone https://github.com/tu-usuario/sala-de-juegos.git
cd /TP-1
```
2. **Instalar dependencias:**
```bash
npm install
```
3. **Ejecutar la aplicación:**
```bash
ng serve
```
4. **Abrir en el navegador:**
 ```bash
http://localhost:4200

```
---

📁 Estructura del proyecto
src/
├─ app/
│  ├─ components/      # Componentes reutilizables (navbar, confirm dialog, spinner)
│  ├─ pages/           # Páginas principales (home, about, games, results, chat)
│  ├─ services/        # Servicios (auth, databases, surveys)
│  ├─ app-routing.module.ts
│  └─ app.module.ts
├─ assets/             # Imágenes y recursos
├─ environments/       # Variables de entorno
