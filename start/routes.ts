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


Route.post('/', 'UsersController.registrarUsuario')

Route.post('/chef', 'ChefsController.registrarChef')
Route.get('/chef', 'ChefsController.obtenerChefs')
Route.get('/chef/:id', 'ChefsController.obtenerChef')
Route.put('/chef/:id', 'ChefsController.actualizarChef')
Route.delete('/chef/:id', 'ChefsController.eliminarChef')

Route.post('/receta', 'RecetasController.registrarReceta')
Route.get('/receta', 'RecetasController.obtenerRecetas')
Route.get('/receta/:id', 'RecetasController.obtenerReceta')
Route.put('/receta/:id', 'RecetasController.actualizarReceta')
Route.delete('/receta/:id', 'RecetasController.eliminarReceta')
