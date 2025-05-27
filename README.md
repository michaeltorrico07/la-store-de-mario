
# La Store de Mario

**Trabajo grupal para Prácticas Profesionalizantes**  
**Estado: En desarrollo 🚧**

Este proyecto es una tienda virtual que estamos desarrollando en grupo con el objetivo de **agilizar la compra de productos en el buffet de la escuela**, especialmente durante los recreos, donde se forman largas filas. La tienda lleva el nombre de *Mario*, en referencia al encargado del buffet.

---

## 🎯 Propósito del proyecto

- Evitar demoras en los recreos por filas largas.
- Permitir que estudiantes y docentes hagan pedidos anticipados.
- Facilitar el proceso de compra desde sus celulares.
- Aplicar conocimientos de desarrollo frontend y backend en un proyecto realista.

---

## 🛠️ Tecnologías utilizadas

- **React** + **TypeScript** – Para la estructura principal de la app.
- **Vite** – Herramienta de desarrollo moderna y rápida.
- **Firebase Auth** – Para registro, login y recuperación de cuentas.
- **React Hook Form** + **Zod** – Para validación robusta de formularios.
- **React Router DOM** – Para la navegación entre vistas.
- **Context API** – Para manejar el estado global del usuario.

---

## 📁 Estructura del proyecto

```
src/
├── app/                     # Rutas principales
├── features/
│   └── auth/                # Lógica de autenticación
│       ├── pages/           # login, register, reset, etc.
│       ├── hooks/           # useAuth, useAuthContext
│       ├── schemas/         # Validaciones de formularios
│       └── authContext.tsx  # Contexto del usuario
├── services/                # Conexión con Firebase
├── main.tsx                 # Entrada de la app
├── index.css                # Estilos generales
```

---

## 🧩 Funcionalidades actuales

### 🔐 Login (`login.tsx`)

- Formulario con validación de email y contraseña usando `Zod`.
- Usa el hook `useAuth()` para gestionar el inicio de sesión.
- Muestra errores si los datos son inválidos o si Firebase devuelve un error.

### ✉️ Recuperar contraseña (`sendEmail.tsx`)

- Permite enviar un correo de recuperación si el usuario olvidó la contraseña.
- Usa validaciones y `SubmitResetPasswordEmail`.

### 🔒 Resetear contraseña (`Reset-Password.tsx`)

- Permite establecer una nueva contraseña.
- Valida que la contraseña y la confirmación coincidan.

---

## 🧠 Validaciones

Se usa `Zod` junto con `React Hook Form` para definir reglas claras:

```ts
// ejemplo de login
email: z.string().email(),
password: z.string().min(6)
```

Esto garantiza que solo se envíen datos válidos al backend.

---

## 🔥 Firebase

- Se configura en `firebase.ts` usando variables `.env`.
- Se usa Firebase Authentication para:
  - Registro
  - Inicio de sesión
  - Envío de email de recuperación
  - Reseteo de contraseña

---

## 🗺️ Ruteo

Definido en `AppRoutes.tsx`:

```tsx
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/forgot-password" element={<SendEmail />} />
<Route path="/reset-password" element={<ResetPassword />} />
```

---

## 🖼️ Diseño

- Interfaz clara y centrada.
- Fondo con imagen del buffet/Mario.
- Botones grandes, accesibles para celular.

---

## 🚧 Estado actual

- [x] Login con validación
- [x] Registro de usuario
- [x] Recuperación de cuenta por email
- [x] Reset de contraseña
- [ ] Sistema de pedidos del buffet
- [ ] Visualización de productos
- [ ] Panel de administración para Mario

---

## 📦 Cómo ejecutarlo

```bash
npm install
npm run dev
```

📌 Recordá configurar las variables de entorno en un archivo `.env`.

---

## 🙌 Conclusión

Este proyecto grupal nos permite aplicar lo aprendido en el curso y resolver un problema real del colegio. Aunque aún está en desarrollo, ya cuenta con un sistema de usuarios funcional y sienta las bases para agregar el sistema de pedidos. La idea es seguir trabajando en equipo hasta tener una herramienta útil tanto para el buffet como para los estudiantes.
