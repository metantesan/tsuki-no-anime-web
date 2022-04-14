const Downloader = require("nodejs-file-downloader");

module.exports=async (Url,file) => {
    const downloader = new Downloader({
        url: Url,
        directory: "./public/anime/",
        fileName: file,

    });

    try {
        console.time("a")
        await downloader.download();
        console.timeEnd("a")
    } catch (error) {
        console.log(error);
    }
}