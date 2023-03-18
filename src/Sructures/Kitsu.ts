import axios from 'axios'

export default class KistsuAPI {
    private baseURL = 'https://kitsu.io/api/edge/'

    public async findAnimes(animeName: string): Promise<any> {
        const response = await axios.get(this.baseURL + 'anime?filter[text]=' + encodeURIComponent(animeName))
        return response.data
    }
    public async findAnime(animeName: string): Promise<any> {
        const animes = await this.findAnimes(animeName)
        const anime = animes.data[0]
        if(!anime) return false
        const response = await axios.get(anime.relationships.genres.links.related)
        anime.genres = response.data.data.map((data: any) => data.attributes.name)
        if(!anime.genres.length) anime.genres = ['not found']
        return anime
    }
}