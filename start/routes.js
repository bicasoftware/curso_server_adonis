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
    .apiOnly()
}).middleware(['auth']);


Route.group(() => {
  Route
    .resource('notas', "NotaController")
    .apiOnly()
}).middleware(['auth']);

Route.group(() => {
  Route
    .resource('aulas', "AulaController")
    .apiOnly()
}).middleware(['auth']);

Route.group(() => {
  Route
    .resource('horarios', "HorarioController")
    .apiOnly()
}).middleware(['auth']);

Route.group(() => {
  Route
    .resource('materias', "MateriaController")
    .apiOnly()
}).middleware(['auth']);


Route.group(() => {
  Route
    .resource('configurations', "ConfiguracoeController")
    .except(['destroy', 'create', 'store'])
    .apiOnly()
}).middleware(['auth']);