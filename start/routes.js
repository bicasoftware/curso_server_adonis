'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')

Route.get(() => {
  return { "status": ok }
})

Route.group(() => {
  Route
    .post('/register', 'AuthController.register')
    .validator('User')

  Route
    .post('/authenticate', 'AuthController.authenticate')
    .validator('User')

  Route
    .post('/unregister', 'AuthController.unregister')
    .middleware(['auth'])

  Route
    .post('/refresh', 'AuthController.refreshToken')
}).prefix('auth')

Route.group(() => {
  Route
    .resource('', 'PeriodoController')
    .validator(
      new Map([
        [['store'], ['PostPeriodo']]
      ])
    )
    .apiOnly()
}).middleware(['auth']).prefix('periodos');

Route.group(() => {
  Route
    .resource('/', "FaltaController")
    .except(['update', 'index'])
    .validator(
      new Map([
        [['store'], ['PostFaltas']]
      ])
    )
    .apiOnly()
}).middleware(['auth']).prefix('faltas');


Route.group(() => {
  Route
    .resource('', 'NotaController')
    .apiOnly()
    .except(['index', 'create'])
    .validator(
      new Map([
        [['store'], ['PostNotas']],
        [['update'], ['PutNotas']],
      ])
    )
}).middleware(['auth']).prefix('notas');

Route.group(() => {
  Route
    .post('/', 'AulaController.create')
    .validator('PostAula')

  Route
    .get('/:id', 'AulaController.findByMateria')

  Route
    .delete('/:id', 'AulaController.deleteById')
}).middleware(['auth']).prefix('aulas');

Route.group(() => {
  Route.post('/', 'HorarioController.createMany').validator('PostHorarios')
  Route.get('/:id', 'HorarioController.findByPeriodo')
  Route.delete('/:id', 'HorarioController.deleteByPeriodo')
}).prefix('/horarios').middleware(['auth']);

Route.group(() => {
  Route
    .resource('', "MateriaController")
    .apiOnly()
    .except(['index'])
    .validator(
      new Map([
        [['store'], ['PostMaterias']],
        [['update'], ['PostMaterias']],
      ])
    )
}).middleware(['auth']).prefix('/materias');


Route.group(() => {
  Route.get('', "ConfiguracoeController.find")
  Route.put('', 'ConfiguracoeController.update').validator('PutConfigs')
}).middleware(['auth']).prefix('configurations');