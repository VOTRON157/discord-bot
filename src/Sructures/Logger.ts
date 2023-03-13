import chalk from 'chalk'

export default class Logger {
    private getCurrentTime(): string {
        const date: Date = new Date()
        const times = {
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds()
        }
        return `${times.hours}:${times.minutes}:${times.seconds}`
    }
    public Log(message: string): void{
        console.log(`${chalk.magenta(`[${this.getCurrentTime()}]`)} ${message}`)
    }
    public Error(message: string): void{
        console.error(`${chalk.magenta(`[${this.getCurrentTime()}]`)} ${chalk.red(message)}`)
    }
    public Alert(message: string): void{
        console.warn(`${chalk.magenta(`[${this.getCurrentTime()}]`)} ${chalk.yellow(message)}`)
    }
}