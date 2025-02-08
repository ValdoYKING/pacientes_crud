# CRUD PACIENTES

Proyecto CRUD de Pacientes con Node.js, Express, MongoDB y React

Este proyecto es una aplicación full-stack que maneja operaciones CRUD para una base de datos de pacientes. Utiliza Node.js con Express para el backend, Next.js para el frontend y MongoDB como base de datos.

## 🚀 Tecnologías Utilizadas

- **Backend:** Node.js + Express
- **Frontend:** Next.js
- **Base de Datos:** MongoDB
- **Autenticación:** JWT (JSON Web Tokens)

## Configuración

1. **Clonar el repositorio**

    ```bash
    git clone https://github.com/ValdoYKING/pacientes_crud.git
    ```

2. **Configurar variables de entorno**

    Crear un archivo `.env` dentro de la carpeta `backend` con los siguientes valores:
    Para la prueba con MongoDb se recomienda el uso de nombre para base de datos "pacientes_crud" junto con la coleccion pacientes.
    La implementacion de JWT_SECRET se puede obtener uno desde https://jwtsecret.com/generate (opcional).

    ```env
    PORT=5000
    MONGO_URI= mongodb://localhost:27017/pacientes_crud
    JWT_SECRET= clavesecreta
    ```

3. **Instalación de dependencias para el backend**

    Ejecutar `npm install` dentro de `backend` para la instalación de dependencias necesarias.

4. **Ejecución del backend**

    ```bash
    npm run dev
    ```

5. **Instalación de dependencias para el frontend**

    Ejecutar `npm install` dentro de `frontend` para la instalación de dependencias necesarias.

6. **Ejecución del frontend**

    ```bash
    npm run dev
    ```

7. **Probar el CRUD**

    Dirigirse al puerto recomendado por frontend y realizar el proceso de registro para después iniciar sesión y probar los endpoints.

## 📋 Endpoints Principales

### Autenticación

- **POST** `/api/auth/register` → Registrar un usuario
- **POST** `/api/auth/login` → Iniciar sesión y obtener un token JWT

### 🏥 Pacientes

- **GET** `/api/pacientes` → Obtener todos los pacientes
- **POST** `/api/pacientes` → Crear un paciente
- **PUT** `/api/pacientes/:id` → Actualizar paciente
- **DELETE** `/api/pacientes/:id` → Eliminar paciente
