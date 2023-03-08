import { BaseCommand } from '@adonisjs/core/build/standalone'
import Env from '@ioc:Adonis/Core/Env'
import { Job, Worker } from 'bullmq'
import Route from '@ioc:Adonis/Core/Route'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class BullJobs extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'bull:jobs'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: false,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }
  // aqui van las definiciones de los jobs
  public async run() {
    const emails = new Worker('email', async (job: Job) => {
      console.log(`Procesando job ${job.id}`, JSON.stringify(job.data))
      const { email, name, url } = job.data
      await Mail.send((message) => {
        message
          .from('abelardoreyes256@gmail.com')
          .to(email)
          .subject('Welcome Onboard!')
          .htmlView('emails/welcome', { name:name, url: url })
      })
    })
    emails.on('completed', (job) => {
      console.log(`Job ${job.id} completado!`)
    })
    emails.on('failed', (job, err) => {
      console.log(`Job ${job!.id} fallo en: ${err.message}`)
    })

  const sms = new Worker('sms', async (job: Job) => {
    console.log(`Procesando job ${job.id}`, JSON.stringify(job.data))
    const { telefono, name, url } = job.data
    console.log(`Enviando sms a ${telefono}...`)

    // aqui va el codigo para enviar el sms
  })
  sms.on('completed', (job) => {
    console.log(`Job ${job.id} completado!`)

  })
  sms.on('failed', (job, err) => {
    console.log(`Job ${job!.id} fallo en: ${err.message}`)

  })
  }
}
