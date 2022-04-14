const Downloader = require("nodejs-file-downloader");

module.exports=async (Url,file) => {
    const downloader = new Downloader({
        url: Url,
        directory: "./public/ani/",
        fileName: file,

    });

    try {
        await downloader.download();
    } catch (error) {
        console.log(error);
    }
}