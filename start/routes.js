'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route
  .post('/register', 'AuthController.register')
  .validator('User')

Route
  .post('/authenticate', 'AuthController.authenticate')
  .validator('User')


Route.group(() => {
  Route
    .resource('periodos', 'PeriodoController')
    .apiOnly()
}).middleware(['auth']);

Route.group(() => {
  Route
    .resource('faltas', "FaltaController")
    .except(['update', 'index'])
    .apiOnly()
}).middleware(['auth']);


Route.group(() => {
  Route
    .resource('notas', "NotaController")
    .except(['index'])
    .apiOnly()
}).middleware(['auth']);

Route.group(() => {
  Route
    .resource('aulas', "AulaController")
    .except(['update', 'index'])
    .apiOnly()
}).middleware(['auth']);

Route.group(() => {
  Route.post('horarios', 'HorarioController.createMany')  
  Route.get('horarios/:id', 'HorarioController.findByPeriodo')
  Route.delete('horarios/:id', 'HorarioController.deleteByPeriodo') 
}).middleware(['auth']);

Route.group(() => {
  Route
    .resource('materias', "MateriaController")
    .except(['index'])
    .apiOnly()
}).middleware(['auth']);


Route.group(() => {
  Route
    .resource('configurations', "ConfiguracoeController")
    .except(['destroy', 'create', 'store'])
    .apiOnly()
}).middleware(['auth']);