const downloader = require('./filedownloader');
const Mal = require('mal-scraper');
const { v4: uuid, stringify } = require('uuid');
module.exports.convert = (mal_data) => {
    // season to num 
    var s = ["Winter", "Spring", "Summer", "Fall"]
    var p = String(mal_data.premiered)
    p = p.split(' ');
    let years = p[1]
    let season = p[0]
    var des = mal_data.synopsis;
    // 
    var stats = String(mal_data.scoreStats)
    stats = stats.split(' ')[2].replace(',', "").replace(",", "")
    //
    if (mal_data.score === "N/A") {
        var score = "N/A"
    }
    else {
        var score = Number(mal_data.score)
    }
    var data = {
        id: mal_data.id, 
        mal: {

            titles:
            {
                title: mal_data.title,
                en: mal_data.englishTitle,
                jp: mal_data.japaneseTitle,
                others: mal_data.sysnonyms
            },
            description: des,
            thumbnail: mal_data.picture,
            trailer: mal_data.trailer,
            info: {
                type: mal_data.type,
                source: mal_data.source,
                episodes: mal_data.episodes,
                duration: mal_data.duration,
                score:
                {
                    score: score,
                    stats: Number(stats)
                },
                rating: mal_data.rating,
                genres: mal_data.genres,
                aired: mal_data.aired,
                premiered: {
                    years: Number(years),
                    season: s.indexOf(season) + 1,
                },
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
    return data;
}
module.exports.getbyid = async (id) => {
    try {


        var s = 'https://myanimelist.net/anime/' + String(id)
        var m = await Mal.getInfoFromURL(s)
        var c = this.convert(m)
        var fname = uuid().replaceAll("-", "") + ".jpg";
        await downloader(c.thumbnail, fname)
        c.thumbnail = fname
        return c;
    }
    catch (e) {
        console.log(e);
    }
}
// type Seasons = 'spring' | 'summer' | 'fall' | 'winter';
// type FullRatings =
// | 'G - All ages'
// | 'PG - Children'
// | 'PG-13 - Teens 13 or older'
// | 'R - 17+'
// | 'R+ - Mild Nudity'
// | 'Rx - Hentai';