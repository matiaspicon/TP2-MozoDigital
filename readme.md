# TRABAJO PRACTICO: MOZO DIGITAL

## Descripción: 
    Mozo Digital es una aplicación virtual, la cual te permite realizar pedidos dentro de un local gastronómico de manera rápida y sencilla con e beneficio de generar el mínimo contacto necesario para prevenir contagios en los tiempos que corren.


## Listado de funcionalidades (casos de uso):
    •	Restaurantes y sucursales: administración (CRUD) de restaurantes y de sus sucursales.

    •	Menú: consulta de los platos disponibles para cada sucursal de un restaurante como usuario y administración de los mismos desde un perfil de encargado.

    •	Pedidos:
        Realizar pedido: un usuario puede generar pedidos y también puede visualizar el estado del pedido realizado e histórico de pedidos.

        Consultar pedido: un encargado puede consultar todos los pedidos realizados y ver los detalles de los mismos (mesa, usuario, pedido, estado, fecha y hora). A su vez puede consultar el histórico de pedidos de la sucursal.

        Administrar estado de pedido: el mismo debe poder ser consultado tanto por el encargado como por los empleados (cocinero y mozo), con la posibilidad de actualizar el mismo de ser necesario.


## Listado de actores/roles
    Cliente
    Mozo
    Cocinero
    Encargado


## Listado de las entidades principales
    Restaurante
    Sucursal
    Menú
    Menú Item
    Pedido
    Usuario (Cliente, Mozo, Cocinero, Encargado)


## Instrucciones técnicas:
   ### Instalación:
    - git clone
    - npm install
    - Solicitar archivo .env
    
   ### Ejecución:
    - npm start 
    - npm run nodemon (debug)


## Listado de los endpoints de la API
   ### GET:
    /api/restaurantes/
    /api/restaurantes/:idRestaurante
    /api/restaurantes/:idRestaurante/sucursales
    /api/restaurantes/:idRestaurante/sucursales/:idSucursal
    /api/restaurantes/:idRestaurante/sucursales/:idSucursal/menu
    /api/restaurantes/:idRestaurante/sucursales/:idSucursal/menu/:idMenuItem

    /api/pedidos/
    /api/pedidos/:idPedido

    /api/usuarios/
    /api/usuarios/me
    /api/usuarios/:idUsuario


### POST:
    /api/restaurantes/    
    /api/restaurantes/:idRestaurante/sucursales
    /api/restaurantes/:idRestaurante/sucursales/:idSucursal/menu

    /api/pedidos/

    /api/usuarios/


### PUT:
    /api/restaurantes/:idRestaurante
    /api/restaurantes/:idRestaurante/sucursales/:idSucursal
    /api/restaurantes/:idRestaurante/sucursales/:idSucursal/menu/:idMenuItem

    /api/pedidos/:idPedido

    /api/usuarios/:idUsuario


### DELETE:
    /api/restaurantes/:idRestaurante
    /api/restaurantes/:idRestaurante/sucursales/:idSucursal
    /api/restaurantes/:idRestaurante/sucursales/:idSucursal/menu/:idMenuItem

    /api/pedidos/:idPedido

    /api/usuarios/:idUsuario