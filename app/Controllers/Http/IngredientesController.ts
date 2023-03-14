import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ingredientes from 'App/Models/Ingrediente'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { Readable } from 'stream';
export default class IngredientesController {
  public async registrarIngrediente({ request, response }: HttpContextContract) {
    const validationSchema = schema.create({
      nombre: schema.string({ trim: true }, [
        rules.required(),
        rules.unique({ table: 'ingredientes', column: 'nombre' }),
      ]),
      tipo: schema.string({ trim: true }, [rules.required()]),
      cantidad: schema.number([rules.required()]),
    })
    const data = await request.validate({
      schema: validationSchema,
      messages: {
        'nombre.required': 'El nombre es requerido',
        'nombre.unique': 'El nombre ya existe',
        'tipo.required': 'El tipo es requerido',
        'cantidad.required': 'La cantidad es requerida',
      },
    })
    if (data) {
    const ingrediente = new Ingredientes()
    ingrediente.nombre = request.input('nombre')
    ingrediente.tipo = request.input('tipo')
    ingrediente.cantidad = request.input('cantidad')
    await ingrediente.save()
    const respuesta = {
      status : 200,
      message: 'Ingrediente registrado',
      data: ingrediente,
      error: false

    }
    response.send(respuesta)
  }
  }
  public async obtenerIngredientes({ response }: HttpContextContract) {
    const ingredientes = await Ingredientes.all()
    response.send(ingredientes)
  }
  public async obtenerIngrediente({ params, response }: HttpContextContract) {
    const ingrediente = await Ingredientes.find(params.id)
    response.send(ingrediente)
  }
  public async stream({ response }) {
    const stream = new Readable();
    stream._read = () => {};
    const sendEvent = async () => {
      const ingredientes = await Ingredientes.all();
      const data = {
        message: 'Nuevos datos disponibles',
        ingredientes
      };
      stream.push(`data: ${JSON.stringify(data)}\n\n`);
    };
    const intervalId = setInterval(sendEvent, 5000);
    response.on('close', () => {
      clearInterval(intervalId);
      stream.destroy();
    });
    response.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    stream.pipe(response.response);
  }


  public async actualizarIngrediente({ params, request, response }: HttpContextContract) {
    const ingrediente = await Ingredientes.find(params.id)
    const validationSchema = schema.create({
      nombre: schema.string({ trim: true }, [
        rules.required()]),
      tipo: schema.string({ trim: true }, [rules.required()]),
      cantidad: schema.number([rules.required()]),
    })
    const data = await request.validate({
      schema: validationSchema,
      messages: {
        'nombre.required': 'El nombre es requerido',
        'tipo.required': 'El tipo es requerido',
        'cantidad.required': 'La cantidad es requerida',
      },
    })
    if (ingrediente) {
      if (data) {
      ingrediente.nombre = request.input('nombre')
      ingrediente.tipo = request.input('tipo')
      ingrediente.cantidad = request.input('cantidad')
      await ingrediente.save()
      response.send(ingrediente)
      }
    } else {
      response.status(404).send({ message: 'Ingrediente no encontrado' })
    }
  }
  public async eliminarIngrediente({ params, response }: HttpContextContract) {
    const ingrediente = await Ingredientes.find(params.id)
    if (ingrediente) {
      await ingrediente.delete()
      response.send({ message: 'Ingrediente eliminado' })
    } else {
      response.status(404).send({ message: 'Ingrediente no encontrado' })
    }
  }


}
