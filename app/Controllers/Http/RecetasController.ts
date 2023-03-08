import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Receta from 'App/Models/Receta'
import Chef from 'App/Models/Chef'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class RecetasController {
  public async registrarReceta({ request, response }: HttpContextContract) {
    const newPostSchema = schema.create({
      nombre: schema.string({ trim: true }, [
        rules.required(),
        rules.unique({ table: 'recetas', column: 'nombre' }),
      ]),
      duracion: schema.string({ trim: true }, [rules.required()]),
      preparacion: schema.string({ trim: true }, [rules.required()]),
      chef_id: schema.number([rules.required()]),
    })
    const data = await request.validate({
      schema: newPostSchema,
      messages: {
        'nombre.required': 'El nombre es requerido',
        'nombre.unique': 'El nombre ya existe',
        'duracion.required': 'La duracion es requerida',
        'preparacion.required': 'La preparacion es requerida',
        'chef_id.required': 'El chef es requerido',
      },
    })
    if (data) {
    const receta = new Receta()
    receta.nombre = request.input('nombre')
    receta.duracion = request.input('duracion')
    receta.preparacion = request.input('preparacion')
    receta.chef = request.input('chef_id')
    await receta.save()
    const respuesta = {
      status : 200,
      message: 'Receta registrada',
      data: receta,
      error: false

    }
    response.send(respuesta)
  }
  }
  public async obtenerRecetas({ response }: HttpContextContract) {
    const recetas = await Receta.all()
    response.send(recetas)
  }
  public async obtenerReceta({ params, response }: HttpContextContract) {
    const receta = await Receta.find(params.id)
    response.send(receta)
  }
  public async actualizarReceta({ params, request, response }: HttpContextContract) {
    const receta = await Receta.find(params.id)
    const newPostSchema = schema.create({
      nombre: schema.string({ trim: true }, [
        rules.required()]),
      duracion: schema.string({ trim: true }, [rules.required()]),
      preparacion: schema.string({ trim: true }, [rules.required()]),
      chef: schema.number([rules.required()]),
    })
    const data = await request.validate({
      schema: newPostSchema,
      messages: {
        'nombre.required': 'El nombre es requerido',
        'duracion.required': 'La duracion es requerida',
        'preparacion.required': 'La preparacion es requerida',
        'chef.required': 'El chef es requerido',
      },
    })
    if (!data){
      return response.status(400).send({ message: 'Datos invalidos' })
    }
    if (receta) {
      if (data) {
      receta.nombre = request.input('nombre')
      receta.duracion = request.input('duracion')
      receta.preparacion = request.input('preparacion')
      receta.chef = request.input('chef')
      await receta.save()
      response.send(receta)
      }
    } else {
      response.status(404).send({ message: 'Receta no encontrada' })
    }
  }
  public async eliminarReceta({ params, response }: HttpContextContract) {
    const receta = await Receta.find(params.id)
    if (receta) {
      await receta.delete()
      response.send({ message: 'Receta eliminada' })
    } else {
      response.status(404).send({ message: 'Receta no encontrada' })
    }
  }

  async getChefs({ response }) {
    const chefs = await Chef.query().select('id', 'nombre').exec();
    return response.status(200).json(chefs);
  }


}
