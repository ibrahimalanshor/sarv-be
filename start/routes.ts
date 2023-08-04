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

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('/login', 'AuthController.login').as('login')
  Route.post('/register', 'AuthController.register').as('register')

  Route.group(() => {
    Route.post('/google', 'AuthSocialController.google').as('google')
  }).prefix('/auth-social').as('auth-social')
  
  Route.group(() => {
    Route.post('/send', 'EmailController.send').as('send').middleware(['auth', 'unverified'])
    Route.get('/verify', 'EmailController.verify').as('verify').middleware('signed')
  }).prefix('/email').as('email')

  Route.group(() => {
    Route.post('/forgot', 'PasswordController.forgot').as('forgot')
    Route.post('/reset', 'PasswordController.reset').as('reset')
  }).prefix('/password').as('password')

  Route.group(() => {
    Route.post('/logout', 'AuthController.logout').as('logout')

    Route.get('/me', 'MeController.getMe').as('me')
    Route.patch('/me', 'MeController.updateMe').as('me.update')
    Route.patch('/me/photo', 'MeController.updateMePhoto').as('me.update.photo')
    Route.patch('/me/email', 'MeController.updateMeEmail').as('me.update.email')
    Route.patch('/me/password', 'MeController.updateMePassword').as('me.update.password')
  }).middleware(['auth'])

  Route.group(() => {
    Route.resource('task-categories', 'TaskCategoriesController').except(['create', 'edit'])
  }).middleware(['auth', 'resource'])

  Route.group(() => {
    Route.resource('tasks', 'TaskController').except(['create', 'edit'])

    Route.patch('/tasks/:id/status', 'TaskController.updateStatus').as('tasks.update.status')
  }).middleware(['auth', 'resource'])

  Route.group(() => {
    Route.get('/overview/task', 'OverviewController.getTaskOverview').as('overview.task')
  }).middleware('auth')
}).prefix('/api').as('api')