import { Response } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async registrarUsuario({ request }: HttpContextContract) {

    const user = new User()
    user.name = request.input('name')
    user.email = request.input('email')
    user.password = request.input('password')
    user.ap_materno = request.input('ap_materno')
    user.ap_paterno = request.input('ap_paterno')
    user.telefono = request.input('telefono')
    await user.save()

  }

}
