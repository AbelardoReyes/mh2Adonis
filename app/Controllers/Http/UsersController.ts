import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
//import { Queue, Worker } from 'bullmq'
import Mail from '@ioc:Adonis/Addons/Mail'
import Route from '@ioc:Adonis/Core/Route'
import Hash from '@ioc:Adonis/Core/Hash'
import axios from 'axios'
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
    const user = await User.findOrFail(params.id)
    const nRandom = Math.floor(Math.random() * 9000) + 1000

    user.codigo = nRandom
    if (await user.save()) {

      const url = local + Route.makeSignedUrl('codigo', { id: user.id },
        { expiresIn: '1 day' })
/*
      axios.post('https://rest.nexmo.com/sms/json', {
        from: 'Nexmo',
        to: '528714733996',
        text: 'Tu codigo de verificacion es: ' + nRandom,
        api_key: '22bd2a4a',
        api_secret: 'KPOZLO3r34vSCZGw'
      })*/

      await Mail.send((message) => {
        message
          .from('abelardoreyes256@gmail.com')
          .to(user.email)
          .subject('Welcome Onboard!')
          .htmlView('emails/correo_enviado', { name: user.name, nRandom: nRandom, url: url })
      })
    }
  }


  public async codigo({ request, params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    const codigoUsuario = user.codigo
    if (codigoUsuario == request.input('codigo')) {
      user.activo = true
      if (await user.save()) {
        return [{
          "status": 200,
          "mensaje": "Usuario activado correctamente.",
          "error": [],
          "data": []
        }, 200]
      } else {
        return [{
          "status": 400,
          "mensaje": "Error al activar usuario.",
          "error": [],
          "data": []
        }, 400]
      }
    }
  }


  public async login({ auth, request, response }) {
    const validarLogin = schema.create({
      email: schema.string(),
      password: schema.string(),
    })
    const payload = await request.validate({ schema: validarLogin })

    if (!payload) {
      return response.badRequest('Invalido')
    }
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

  public async infoUserObjeto({ auth, response }) {
    const user = await auth.authenticate()
    return response.ok(user)
  }

  public async infoUser({ auth, response }) {
    const user = await auth.authenticate()
    const infoUser = await User.query().where('id', user.id).first()
    return response.ok(infoUser)
  }

  public async logout({ auth, response }) {
    await auth.use('api').revoke()
    return response.ok({ 'status': 200, 'mensaje': 'Sesión cerrada correctamente.', 'error': [], 'data': [] })
  }
}
