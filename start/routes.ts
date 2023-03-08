/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'


Route.post('/usuario/crear', 'UsersController.registrarUsuario')
Route.post('/usuario/login', 'UsersController.login')
Route.post('/usuario/recuperarCuenta', 'UsersController.recuperarCuenta')
Route.post('/usuario/cambiarPassword', 'UsersController.cambiarPassword')
Route.post('/usuario/logout', 'UsersController.logout').middleware('auth')



Route.get('/usuario/infoObjeto', 'UsersController.infoUserObjeto').middleware('auth')

Route.put('/usuario/update/:id', 'UsersController.updateUser').middleware('auth').where('id', '[0-9]+')
Route.put('/usuario/updateRole/:id', 'UsersController.soloRol').middleware('auth').where('id', '[0-9]+')
Route.put('/usuario/desactivar/:id', 'UsersController.desactivar').middleware('auth').where('id', '[0-9]+')
Route.get('/usuario/validarToken', 'UsersController.validarToken').middleware('auth')

Route.get('/verify/:id', 'UsersController.verify').as('verify')
Route.post('/codigo/:id', 'UsersController.codigo').as('codigo')


Route.group(() => {
  //Usuarios
  Route.get('/usuario/info/:id', 'UsersController.infoIDUser').middleware('auth').where('id', '[0-9]+')
  Route.get('/usuario', 'UsersController.infoUsuario')
  Route.get('/usuario/info', 'UsersController.infoUser')
  //Chef
  Route.post('/chef', 'ChefsController.registrarChef').middleware('checkRole:1,2')
  Route.get('/chef', 'ChefsController.obtenerChefs').middleware('checkRole:1,2,3')
  Route.get('/chef/:id', 'ChefsController.obtenerChef').middleware('checkRole:1,2')
  Route.put('/chef/:id', 'ChefsController.actualizarChef').middleware('checkRole:1,2')
  Route.delete('/chef/:id', 'ChefsController.eliminarChef').middleware('checkRole:1')
  //Recetas
  Route.post('/receta', 'RecetasController.registrarReceta').middleware('checkRole:1,2')
  Route.get('/receta', 'RecetasController.obtenerRecetas').middleware('checkRole:1,2,3')
  Route.get('/receta/:id', 'RecetasController.obtenerReceta').middleware('checkRole:1,2')
  Route.put('/receta/:id', 'RecetasController.actualizarReceta').middleware('checkRole:1,2')
  Route.delete('/receta/:id', 'RecetasController.eliminarReceta').middleware('checkRole:1')
  //ingredientes
  Route.post('/ingrediente', 'IngredientesController.registrarIngrediente').middleware('checkRole:1,2')
  Route.get('/ingrediente', 'IngredientesController.obtenerIngredientes').middleware('checkRole:1,2,3')
  Route.get('/ingrediente/:id', 'IngredientesController.obtenerIngrediente').middleware('checkRole:1,2')
  Route.put('/ingrediente/:id', 'IngredientesController.actualizarIngrediente').middleware('checkRole:1,2')
  Route.delete('/ingrediente/:id', 'IngredientesController.eliminarIngrediente').middleware('checkRole:1')
  //Objetos
  Route.post('/objeto', 'ObjetosController.registrarObjeto').middleware('checkRole:1,2')
  Route.get('/objeto', 'ObjetosController.obtenerObjetos').middleware('checkRole:1,2,3')
  Route.get('/objeto/:id', 'ObjetosController.obtenerObjeto').middleware('checkRole:1,2')
  Route.put('/objeto/:id', 'ObjetosController.actualizarObjeto').middleware('checkRole:1,2')
  Route.delete('/objeto/:id', 'ObjetosController.eliminarObjeto').middleware('checkRole:1')
  //Mapas
  Route.post('/mapa', 'MapasController.registrarMapa').middleware('checkRole:1,2')
  Route.get('/mapa', 'MapasController.obtenerMapas').middleware('checkRole:1,2,3')
  Route.get('/mapa/:id', 'MapasController.obtenerMapa').middleware('checkRole:1,2')
  Route.put('/mapa/:id', 'MapasController.actualizarMapa').middleware('checkRole:1,2')
  Route.delete('/mapa/:id', 'MapasController.eliminarMapa').middleware('checkRole:1')

}).middleware(['activo', 'auth'])

