# Laboratorios/Informes: Individual Desarrollar un Sistema de Gestión de Tareas (To-Do List) con LitElement

**Nombre:** DARWIN ANDRES TOAPANTA PAEZ  
**Docente:** PAULO CESAR GALARZA SANCHEZ 
**Materia:** PROGRAMACIÓN INTEGRATIVA

# 🚀 ESPE Tasks App

¡Bienvenido a la aplicación **ESPE Tasks**, un gestor de tareas moderno y responsivo construido con LitElement y Tailwind CSS

Este proyecto es un ejemplo de cómo construir componentes web reutilizables y con un diseño llamativo.

<p align="center">
  <img src="/imagenes/Ejecucion.png" alt="Ejecución de la aplicación" width="600"/>
</p>
---

## 🌟 Características

- **Gestión de Tareas:** Organiza tus tareas por fecha y prioridad.
- **Componentes Web Reutilizables:** Desarrollado con LitElement.
- **Estilizado con Tailwind CSS:** Para un diseño rápido y consistente.
- **Diseño Responsivo:** Se adapta a diferentes tamaños de pantalla.
- **Modal para Añadir/Editar Tareas:** Interfaz para la gestión de detalles de tareas.

---

## 🛠️ Tecnologías Utilizadas

- **[LitElement](https://lit.dev/):** Una librería simple, rápida y ligera para construir componentes web.
- **[Tailwind CSS](https://tailwindcss.com/):** Un framework CSS "utility-first" para construir diseños personalizados rápidamente.
- **[Webpack](https://webpack.js.org/):** Empaquetador de módulos para la aplicación JavaScript.
- **[npm](https://www.npmjs.com/):** Gestor de paquetes.

---

## 🚀 Cómo Empezar

### ✅ Pre-requisitos

Asegúrate de tener instalado en tu sistema:

- [Node.js](https://nodejs.org/) (se recomienda la versión LTS)
- [npm](https://www.npmjs.com/) (viene incluido con Node.js)

### 📦 Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/DarwinToapanta01/lab01-parcial2.git
   cd lab01-parcial2

2. **Instala las dependencias:**
    ```bash
    npm install
### 📂 Estructura del Proyecto
En esta imagen podemos ver la estructura del proyecto:

<p align="center">
  <img src="imagenes/Estructura.png" alt="Estructura del proyecto" width="600"/>
</p>

### 💻 Componentes LitElement
La aplicación **ESPE Tasks** está construida sobre un conjunto de componentes web modulares y reutilizables, desarrollados con **LitElement**. Cada componente encapsula su propia lógica, marcado HTML y estilos (incluyendo Tailwind CSS), garantizando una arquitectura limpia y mantenible.

---

- **🧩 Descripción de Componentes**

#### `espe-app.js`  
**Propósito:** Componente raíz de la aplicación.  
**Funciones clave:**  
✅ Contiene el layout global.  
✅ Orquesta la UI usando `espe-header` y `espe-task-list`.  
✅ Inyecta los estilos de Tailwind al Shadow DOM global.  

---
#### `espe-header.js`  
**Propósito:** Barra de navegación superior.  
**Funciones clave:**  
✅ Muestra el logo de la aplicación ("ESPE Tasks").  
✅ Contiene navegación: Inicio, Tareas, Calendario, Notas.  
✅ Incluye íconos de perfil, notificaciones y avatar.  
✅ Usa Tailwind CSS para un diseño moderno y responsivo.  

---
#### `espe-task-list.js`  
**Propósito:** Componente principal para gestionar y visualizar tareas.  
**Funciones clave:**  
✅ Muestra la sección "Mis Tareas".  
✅ Permite filtrar por fecha y prioridad.  
✅ Agrupa tareas por categorías como Hoy, Mañana, Esta Semana.  
✅ Renderiza múltiples `espe-task-item`.  
✅ Gestiona la lógica del estado de las tareas.  

---

#### `espe-task-item.js`  
**Propósito:** Representa visualmente una sola tarea.  
**Funciones clave:**  
✅ Muestra el título, la hora y el estado (completada o no).  
✅ Incluye botones para editar (✏️) y eliminar (🗑️) la tarea.  
✅ Se comunica con `espe-task-list` a través de eventos personalizados.  
✅ Es autónomo y reutilizable.  

---

#### `espe-add-task-modal.js`  
**Propósito:** Modal interactivo para crear nuevas tareas.  
**Funciones clave:**  
✅ Formulario para ingresar título, descripción, fecha, hora y prioridad.  
✅ Validación de campos obligatorios.  
✅ Permite guardar la tarea o cancelar la operación.  
✅ Interfaz clara y amigable para el usuario.  

---

#### `espe-task-detail-modal.js`  
**Propósito:** Modal de vista detallada y edición de tareas.  
**Funciones clave:**  
✅ Muestra todos los datos de una tarea seleccionada.  
✅ Permite editar los campos directamente.  
✅ Opciones para guardar cambios o eliminar la tarea.  
✅ Se activa al hacer clic en una tarea existente.

---
### 🏃 Demostración de Ejecución e Interacción
Aquí te mostramos cómo funciona la aplicación ESPE Tasks desde su inicio hasta las operaciones básicas de gestión de tareas.

1. Inicio de la Aplicación
Una vez que hayas clonado el repositorio e instalado las dependencias (`npm install`), puedes iniciar el servidor de desarrollo.
    ```bash
    npm start

Esto compilará el proyecto y lo abrirá automáticamente en tu navegador. Verás la interfaz principal de la aplicación, con el encabezado, la sección de tareas y el botón para agregar una nueva tarea.
<p align="center">
  <img src="/imagenes/Ejecucion.png" alt="Ejecución de la aplicación" width="600"/>
</p>

2. Agregando una Nueva Tarea
Para añadir una nueva tarea, haz clic en el botón flotante "+ Agregar Tarea" ubicado en la esquina inferior derecha. Esto abrirá un modal donde podrás ingresar los detalles de la tarea.

Ingresa la información necesaria (Título, Descripción, Fecha, Hora, Prioridad) y haz clic en el botón para guardar la tarea.
<p align="center">
  <img src="/imagenes/Nuevatarea.png" alt="Ejecución de la aplicación" width="600"/>
</p>

3. Actualizando una Tarea Existente
Puedes editar los detalles de una tarea haciendo clic en el icono de lápiz (`✏️`) junto a la tarea que deseas modificar. Esto abrirá el modal de detalles de la tarea, donde podrás ajustar la información.

Realiza los cambios deseados y luego haz clic en el botón para guardar las modificaciones.
<p align="center">
  <img src="/imagenes/Actualizar.png" alt="Ejecución de la aplicación" width="600"/>
</p>

4. Eliminando una Tarea
Si necesitas eliminar una tarea, haz clic en el icono de papelera (🗑️) al lado de la tarea correspondiente. La aplicación te pedirá una confirmación (o la eliminará directamente, dependiendo de la implementación actual).
<p align="center">
  <img src="/imagenes/Eliminar.png" alt="Ejecución de la aplicación" width="600"/>
</p>