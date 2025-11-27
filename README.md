# Proyecto de Programación Web - Tiendara

## Descripción
Esta es una aplicación web desarrollada como trabajo práctico integrador en el marco de la asignatura de Programación Web.  
La aplicación es una SPA (Single Page Application) construida en **React** y permite realizar un CRUD completo sobre dos entidades principales: **Productos** y **Categorías**, junto con la gestión de usuarios y carrito de compras.

Permite:
- Visualizar productos y categorías.
- Filtrar y buscar productos.
- Gestión de carrito de compras.
- Registro y autenticación de usuarios.
- Integración con pagos mediante Stripe.

---

## Funcionalidades Principales

1. **Autenticación**
   - Registro de usuarios con validaciones.
   - Login con persistencia de sesión.
   - Control de roles de usuario (`user` y `admin`).

2. **Módulo ABMC (Alta, Baja, Modificación, Consulta)**
   - Productos:
     - Listado con filtros, búsqueda y paginación.
     - Crear, actualizar y eliminar productos.
     - Visualización de detalle de producto.
   - Categorías:
     - Listado y creación de categorías.
     - Actualización parcial y eliminación.

3. **Navegación SPA**
   - Ruteo dinámico con React Router DOM.
   - Navegación entre páginas: Home, Productos, Detalle, Carrito, Checkout, Login, Register, Dashboard.

4. **Uso de Hooks**
   - Contextos para autenticación (`AuthContext`) y carrito (`CartContext`).
   - Hooks personalizados para consumir la API: `useProducts`, `useCategories`, `useCart`, `useRegister`, `useAuth`.

---

## Tecnologías Utilizadas

- **React** 19
- **React Router DOM** 7
- **TailwindCSS** 4
- **SweetAlert2** para notificaciones.
- **Stripe** para integración de pagos.
- **Lucide React** para íconos.
- **dotenv-cli** para variables de entorno.
- Hosting gratuito: Despliegue en **Netlify**
- Control de versiones: **Git**.

---

## Estructura del Proyecto

![Estructura de directorios](./src/assets/ElectronicC.jpg)

```
src/
├─ assets/
│  └─ ElectronicC.jpg
├─ components/
├─ hooks/
│  ├─ AuthContext.jsx
│  ├─ AuthProvider.jsx
│  ├─ CartContext.jsx
│  ├─ CartProvider.jsx
│  ├─ useApi.jsx
│  ├─ useAuth.jsx
│  ├─ useCart.jsx
│  ├─ useCategories.jsx
│  ├─ useProducts.jsx
│  └─ useRegister.jsx
├─ pages/
│  ├─ Cart.jsx
│  ├─ Category.jsx
│  ├─ Categorys.jsx
│  ├─ Checkout.jsx
│  ├─ Dashboard.jsx
│  ├─ ErrorPay.jsx
│  ├─ Home.jsx
│  ├─ Login.jsx
│  ├─ ProductDetail.jsx
│  ├─ Products.jsx
│  ├─ Register.jsx
│  └─ SuccessPay.jsx
├─ App.jsx
├─ index.css
└─ main.jsx
```

---

## Instrucciones de Uso

### 1. Clonar el repositorio
```bash
git clone https://github.com/MarielGorbolino/frontTiendara.git
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crear un archivo `.env.dev` o `.env.prod` con las variables necesarias:
```
VITE_URL_BACK=http://localhost:3008
VITE_STRIPE_SECRET=pk_test_51SXLL0JVjF1xIP00jrK5mfEYMakoWrbSB7xIu624hLHQI1YAZF1cdbV0xflJsmGDCWLGQBbQqbZopS6hqAxL2igC00xFZFymks
```

### 4. Iniciar el servidor de desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` (por defecto Vite).

---

## Imágenes de la aplicación


![](/public/imagen_005.png)
![](/public/imagen_004.png)
![](/public/imagen_006.png)
![](/public/imagen_007.png)
![](/public/imagen_008.png)
![](/public/imagen_009.png)
![](/public/imagen_010.png)
![](/public/imagen_011.png)
![](/public/imagen_012.png)
![](/public/imagen_002.png)
![](/public/imagen_003.png)
---


## Próximas Funcionalidades (Versión 2)

1. **Rol de Super Usuario**
    - Capacidad para eliminar o modificar categorías, independientemente de los productos asociados.
    - Gestión avanzada de usuarios y control total del sitio.

2. **Perfil de Usuario**
    - Historial de compras y productos adquiridos.
    - Posibilidad de cambiar contraseña y preferencias.

---

## Contribuidores
- Mariel Gorbolino
