interface clientConfig {
    clientId: string
    token: string
    embedColor: number
}

const clientConfig: clientConfig = {
    clientId: process.env.clientID as string,
    token: process.env.TOKEN as string,
    embedColor: 0x00fe08
}

export default clientConfig