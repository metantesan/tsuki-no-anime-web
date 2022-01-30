module.exports=(req,res,nuxt)=>{
   
    res.setHeader("X-Powered-By","")
    nuxt()
}