import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
//import { Queue, Worker } from 'bullmq'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class UsersController {
  public async registrarUsuario({ request }: HttpContextContract) {
    const newPostSchema = schema.create({
      name: schema.string(),
      email: schema.string(),
      password: schema.string(),
      ap_materno: schema.string(),
      ap_paterno: schema.string(),
      telefono: schema.string(),
    })
    const payload = await request.validate({ schema: newPostSchema })
    if (payload) {
      const user = new User()
      user.name = request.input('name')
      user.email = request.input('email')
      user.password = request.input('password')
      user.ap_materno = request.input('ap_materno')
      user.ap_paterno = request.input('ap_paterno')
      user.telefono = request.input('telefono')
      //await user.save()
      if (await user.save) {
        await Mail.send((message) => {
          message
            .from('abelardoreyes256@gmail.com')
            .to(user.email)
            .subject('Welcome Onboard!')
            .htmlView('emails/welcome')
        })
        return 'ok'
      }

    }
    return 'error'
  }

}
