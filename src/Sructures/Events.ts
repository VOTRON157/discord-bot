export default interface EventSettings {
    name: string
    run: Function
    default?: EventSettings
}