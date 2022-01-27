const express = require('express')
const app = express()
const fs = require('fs')
const PORT = 8899


app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set('view engine','ejs')
app.get('/',(req,res)=>{
    fs.readFile('data.json',(err,data)=>{
        if(err) throw err
        const user = JSON.parse(data)
        res.render('table',({user:user}))
    })
})
app.post('/',(req,res)=>{
    fs.readFile('data.json',(err,data)=>{
        if(err) throw err
        let user = JSON.parse(data)
        let form={"name":req.body.name,"email":req.body.email,"age":req.body.age,"city":req.body.city}
        user.push(form)
        fs.writeFileSync('data.json',JSON.stringify(user))
        res.redirect('/')
        
    })
})

app.post('/:id',(req,res)=>{
    fs.readFile('data.json',(err,data)=>{
        if(err) throw err
        let user = JSON.parse(data)
        let form={"name":req.body.name,"email":req.body.email,"age":req.body.age,"city":req.body.city}
        user[parseInt(req.params.id)] = form
        fs.writeFileSync('data.json',JSON.stringify(user))
        res.redirect('/')
    })
})

app.get('/register',(req,res)=>{
    res.render('register')
})

app.post('/update/:id',(req,res)=>{
    fs.readFile('data.json',(err,data)=>{
        if(err) throw err
        let user = JSON.parse(data)
        res.render('updateData',({user:user[req.params.id],id:req.params.id}))
    })
})

app.post('/delete/:id',(req,res)=>{
    fs.readFile('data.json',(err,data)=>{
        if(err) throw err
        let user = JSON.parse(data)
        user.splice(parseInt(req.params.id),1)
        fs.writeFileSync('data.json',JSON.stringify(user))
        res.redirect('/')
        
    })
})


app.listen(PORT,err=>{
    if(err) throw err
    console.log(`Server Started at PORT:${PORT}`)
})

