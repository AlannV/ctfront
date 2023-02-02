Continuar refactorizacion de las siguientes rutas del back =>

[] shoppingCart,
[] schedules,
[] rating,
[] purchaseHistory,
[] purchase

Refactorizacion de los siguientes controllers =>

[] favorite,
[] history,



Asociar las siguientes relaciones =>

[] Movie tiene un solo Language,
[] Language puede tener muchas Movie,
[] Movie puede tener muchas Genre,
[] Genre puede tener muchas Movie,
[] Movie puede tener muchos Display,
[] Display puede tener muchas Movie,
[] Movie puede tener muchos Rating,
[] Rating puede tener solo una Movie,
[] User puede tener solo un Role,
[] Role puede tener muchos User,

200 OK => for gets

201 Created => for creates

400 => bad request

401 => unauthorized

404 => not found

412 => condition failed
