const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
const port = 3000
mongoose.connect("mongodb+srv://igorcabila:BT79445544@starwars.qhn4z.mongodb.net/?retryWrites=true&w=majority&appName=starwars")


const Film =mongoose.model('Film',{
    title: String,
    description: String,
    image_url: String,
    trailer_url: String
})


app.get('/', async(req,res)=>{
    const films = await Film.find()
   return res.send(films)
})

app.post("/",async(req,res)=>{
  
        try {
            const { title, description, image_url, trailer_url } = req.body;
        
            if (!title || !description || !image_url || !trailer_url) {
              return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
            }
        
    
    const film = new Film({
        title,
        description,
        image_url,
        trailer_url
    })

   await  film.save()
    return res.send(film)
}catch(error){
console.error("Erro ao criar filme:", error)
res.status(500).json({error:'Erro interno do servidor'})
}
})


app.delete("/:id", async(req,res)=>{
    const films = await Film.findByIdAndDelete(req.params.id)
    return res.send(films)
})
app.delete("/",async(req,res)=>{
    const films = await Film.deleteMany({})
    return res.send(films)

})

app.put("/:id",async(req,res)=>{
    const films = await Film.findByIdAndUpdate(req.params.id,{
       
            title : req.body.title,
            description: req.body.description,
            image_url:req.body.image_url,
            trailer_url: req.body.trailer_url
 

      
    },{
        new: true
    }) 
    return res.send(films)
            
})


app.listen(port,()=>{
   
    console.log('app running')
})