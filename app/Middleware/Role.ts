import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class Role {
  public async handle ({ auth, response }: HttpContextContract, next: () => Promise<void>, allowedRoles: string[]) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({ error: 'Usuario no autorizado' })
    }

    const userRole = user.role_id.toString()

    if (!allowedRoles.includes(userRole)) {
      return response.forbidden({ error: 'Rol no autorizado' })
    }
    await next()
  }
}
