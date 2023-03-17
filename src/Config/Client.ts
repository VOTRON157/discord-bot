interface clientConfig {
    clientId: string
    token: string
    embedColor: number
    cooldown: number
}

const clientConfig: clientConfig = {
    clientId: process.env.clientID as string,
    token: process.env.TOKEN as string,
    embedColor: 0xFFFFFF,
    cooldown: 8,
}


export default clientConfig