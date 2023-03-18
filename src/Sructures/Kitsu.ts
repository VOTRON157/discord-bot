import axios from 'axios'

interface NecessaryAPIResponse { // ainda vai dar pra acessar as outra propriedades que retornam da API, so fiz isso pro vscode mostrar no auto completar
    data: [{
        id: string
        type: string
        attributes: {
            titles: {
                en: string
                en_jp: string
                ja_jp: string
            }
            episodeCount: string
            synopsis: string
            posterImage: {
                tiny: string
                large: string
                small: string
                medium: string
                original: string
            }
        }
        relationships: {
            genres: {
                links: {
                    related: string
                }
            }
        }
        genres: Array<string>
    }]
}

export default class KistsuAPI {
    private baseURL = 'https://kitsu.io/api/edge/'

    public async findAnimes(animeName: string): Promise<NecessaryAPIResponse> {
        const response = await axios.get(this.baseURL + 'anime?filter[text]=' + encodeURIComponent(animeName))
        return response.data
    }
    public async findAnime(animeName: string): Promise<NecessaryAPIResponse['data'][0]> {
        const animes = await this.findAnimes(animeName)
        const anime = animes.data[0]
        const response = await axios.get(anime.relationships.genres.links.related)
        anime.genres = response.data.data.map((data: any) => data.attributes.name)
        if(!anime.genres.length) anime.genres = ['not found']
        //console.log(anime)
        return anime
    }
}