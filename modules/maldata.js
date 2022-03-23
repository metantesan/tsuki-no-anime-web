module.exports = (mal_data) => {
    var stats = String(mal_data.scoreStats)
    stats = Number(stats.split(' ')[2])
    var data = {
        id: mal_data.id,
        titles:
        {
            title: mal_data.title,
            en: mal_data.englishTitle,
            jp: mal_data.japaneseTitle,
            others: mal_data.sysnonyms
        },
        description: mal_data.synopsis,
        thumbnail: mal_data.picture,
        trailer: mal_data.trailer,
        info: {
            type: mal_data.type,
            source: mal_data.source,
            episodes: mal_data.episodes,
            duration: mal_data.duration,
            score:
            {
                score: mal_data.score,
                stats: stats
            },
            rating: mal_data.rating,
            genres: mal_data.genres,
            aired: mal_data.aired,
            premiered: mal_data.premiered,
            status: mal_data.status,
            broadcast: mal_data.broadcast,
            producers: mal_data.producers,
            studios: mal_data.studios,
            ranked: mal_data.ranked,
            popularity: mal_data.popularity,
            members: mal_data.members,
            favorites: mal_data.favorites
        }
    }
}