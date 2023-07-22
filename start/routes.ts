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
    Route.post('/logout', 'AuthController.logout').as('logout')

    Route.get('/me', 'AuthController.me').as('me')
    Route.patch('/me', 'AuthController.updateMe').as('me.update')
    Route.patch('/me/photo', 'AuthController.updateMePhoto').as('me.update.photo')
    Route.patch('/me/email', 'AuthController.updateMeEmail').as('me.update.email')
    Route.patch('/me/password', 'AuthController.updateMePassword').as('me.update.password')
  }).middleware(['auth'])

  Route.group(() => {
    Route.resource('task-categories', 'TaskCategoriesController').except(['create', 'edit'])
  }).middleware(['auth', 'resource'])

  Route.group(() => {
    Route.resource('tasks', 'TasksController').except(['create', 'edit'])

    Route.patch('/tasks/:id/status', 'TasksController.updateStatus').as('tasks.update.status')
  }).middleware(['auth', 'resource'])
}).prefix('/api').as('api')