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
Route.get('/usuario/info', 'UsersController.infoUser').middleware('auth')
Route.post('/usuario/logout', 'UsersController.logout').middleware('auth')
Route.get('/usuario', 'UsersController.infoUsuario').middleware('auth')

Route.get('/usuario/infoObjeto', 'UsersController.infoUserObjeto').middleware('auth')
Route.get('/usuario/info/:id', 'UsersController.infoIDUser').middleware('auth').where('id', '[0-9]+')
Route.put('/usuario/update/:id', 'UsersController.updateUser').middleware('auth').where('id', '[0-9]+')

Route.get('/verify/:id', 'UsersController.verify').as('verify')
Route.post('/codigo/:id', 'UsersController.codigo').as('codigo')

Route.post('/chef', 'ChefsController.registrarChef').middleware('checkRole:1')
Route.get('/chef', 'ChefsController.obtenerChefs')
Route.get('/chef/:id', 'ChefsController.obtenerChef')
Route.put('/chef/:id', 'ChefsController.actualizarChef')
Route.delete('/chef/:id', 'ChefsController.eliminarChef')

Route.post('/receta', 'RecetasController.registrarReceta')
Route.get('/receta', 'RecetasController.obtenerRecetas')
Route.get('/receta/:id', 'RecetasController.obtenerReceta')
Route.put('/receta/:id', 'RecetasController.actualizarReceta')
Route.delete('/receta/:id', 'RecetasController.eliminarReceta')

Route.post('/ingrediente', 'IngredientesController.registrarIngrediente')
Route.get('/ingrediente', 'IngredientesController.obtenerIngredientes')
Route.get('/ingrediente/:id', 'IngredientesController.obtenerIngrediente')
Route.put('/ingrediente/:id', 'IngredientesController.actualizarIngrediente')
Route.delete('/ingrediente/:id', 'IngredientesController.eliminarIngrediente')

