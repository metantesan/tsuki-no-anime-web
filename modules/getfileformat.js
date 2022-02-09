module.exports.getbystring=(filename)=>{
    var name=String(filename)

    var an=name.split('.')
    return an[an.length-1]
}