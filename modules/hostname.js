
const fs=require('fs');

module.exports=async (req,res,next)=>{
    var hosts=JSON.parse(await  fs.readFileSync("./config/hostname.json"));
   var {hostname}=req
   var host=hosts.find(c=>c==hostname);
   if (host!==undefined)
   {
    next()
   }
   else{
     res.statuscode=401;
     res.send("bad request")
   }
    // console.log(req.hostname);
   
}