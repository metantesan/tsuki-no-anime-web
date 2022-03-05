const crypto = require('crypto');
const getbystring =(filename)=>{
    var name=String(filename)

    var an=name.split('.')
    return an[an.length-1]
}

var getHash = ( content ) => {				
    var hash = crypto.createHash('sha256')
    //passing the data to be hashed
    var data = hash.update(content, 'utf-8');
    //Creating the hash in the required format
    var gen_hash= data.digest('hex');
    return gen_hash;
}
module.exports=(buf,fileneme)=>{
var name
name=getHash(buf)
// name=md5
name+="."+getbystring(fileneme)
return name
}