import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
//import { Queue, Worker } from 'bullmq'
import Mail from '@ioc:Adonis/Addons/Mail'
import Route from '@ioc:Adonis/Core/Route'
import Hash from '@ioc:Adonis/Core/Hash'
const local = 'http://127.0.0.1:3333'




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
      user.password = await Hash.make(request.input('password'))
      user.ap_materno = request.input('ap_materno')
      user.ap_paterno = request.input('ap_paterno')
      user.telefono = request.input('telefono')

      if (await user.save()) {
        const url = local + Route.makeSignedUrl('verify', { id: user.id },
          { expiresIn: '1 day' })
        await Mail.send((message) => {
          message
            .from('abelardoreyes256@gmail.com')
            .to(user.email)
            .subject('Welcome Onboard!')
            .htmlView('emails/welcome', { name: user.name, url: url })
        })
        return 'ok'
      }

    }
    return 'error'
  }
  public async verify({ request, params, response }: HttpContextContract) {
    if (!request.hasValidSignature()) {
      response.abort('Invalid signature', 401)
    }
    console.log(params.id)
    const user = await User.findOrFail(params.id)
    const nRandom = Math.floor(Math.random() * 9000) + 1000

    user.codigo = nRandom
    await user.save()
  }



  public async login({ auth, request, response }) {
    const validarLogin = schema.create({
      email: schema.string(),
      password: schema.string(),
    })
    const payload = await request.validate({ schema: validarLogin })

    if (payload) {
      const user = await User.query().where('email', request.input('email')).where('activo', '1').first()
      if (!user) {
        return response.badRequest({
          'status': 400,
          'mensaje': 'No existe ningún usuario con este correo o su cuenta está desactivada.',
          'error': [],
          'data': [],
        })
      }

      if (!await Hash.verify(user.password, request.input('password'))) {
        return response.badRequest({
          'status': 400,
          'mensaje': 'Credenciales de usuario incorrectas.',
          'error': [],
          'data': [],
        })
      }
      const token = await auth.use('api').generate(user)

      return response.ok({ 'token': token.token })
    }
  }
}
