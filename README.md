# Proyecto de Seguimiento de Paquetes

Este proyecto es una aplicación web diseñada para conectar con una API y mostrar información detallada sobre paquetes y entregas. Utiliza React con Vite como herramienta de desarrollo y está optimizado para manejar múltiples componentes, rutas y estados.

## Descripción del Proyecto

La aplicación consume datos de una API para mostrar información sobre:

- Pedidos próximos (Upcoming Orders).
- Información general de todos los pedidos.

### APIs Consumidas
Se utilizan las siguientes URLs para obtener información:

- **Upcoming Orders**:
  ```
  https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders/upcoming
  ```
  Esta API proporciona datos sobre pedidos próximos, incluyendo información como el número de pedido, estado, tipo de transporte, y detalles de recogida y entrega.

- **All Orders**:
  ```
  https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders
  ```
  Esta API devuelve una lista completa de todos los pedidos registrados en el sistema.

### Información Mostrada

La aplicación extrae y presenta la siguiente información:

- **Número de pedido**: Identificador único de cada pedido.
- **Estado del pedido**: Estado actual como "Orden asignada" o "En progreso".
- **Información de recogida y entrega**: Dirección, ciudad, fecha, y hora.

### Características principales

1. **Consumo de API**: Las APIs mencionadas son consumidas usando `fetch` para obtener y manejar datos en formato JSON.
2. **Navegación**: Incluye navegación entre páginas utilizando `react-router-dom`. La página principal muestra los pedidos próximos por defecto.
3. **Diseño responsivo**: La interfaz está diseñada para adaptarse a pantallas de diferentes tamaños, incluyendo dispositivos móviles.
4. **Componentes reutilizables**: Se implementaron componentes como tarjetas de pedidos y barras de búsqueda para mejorar la reutilización del código.

## Tecnologías Usadas

- **React**: Librería principal para construir la interfaz.
- **Vite**: Herramienta de desarrollo rápido y eficiente.
- **CSS**: Para estilizar la aplicación y asegurar un diseño atractivo y responsivo.

## Instalación y Uso

1. Clona este repositorio:
   ```bash
   git clone https://github.com/diegovitela/reto-trabajo-Diego-Vitela.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd reto-trabajo-Diego-Vitela
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abre el navegador en [http://localhost:3000](http://localhost:3000) para ver la aplicación.

