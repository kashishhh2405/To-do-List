let express = require('express')
let app = express()
app.use(express.json())
require('dotenv').config()

let tasks = [];
let idCounter = 1;

app.post('/tasks', (req,res)=>{
    try{
        const{title,description,status} = req.body;
        if (!title) {
            return res.status(400).json({ message:'Title is required' });
        }
        const newTask = {
            id: idCounter++,
                title,
            description: description || '',
            status: status || 'pending'
        };
        tasks.push(newTask);
        res.status(201).json(newTask);
       } catch(error) {
        res.status=(500).json({ message: 'Error creating task',
                                  error:'error.message' });
       }    
    });

app.get('/gettasks',(req,res)=>{
    try{

        res.json(tasks);
       }
       catch (error) {
        res.status(500).json({message:'Something went wrong!',
            error: error.message
        });
       }
    });

    app.get('/getsingletasks/:id',(req,res)=>{
        try{
            const task = tasks.find(t => t.id == req.params.id);
            if (!task) {
                return
                res.status(404).json({message: 'Task not found'});
            }
            res.json(task);
        } catch (error) {
            res.status(500).json({message: 'Error fetching task',
                error: error.message
            });
        }
    });

// PUT update a task
    app.put('/tasksupdate/:id', (req,res)=>{
    try{
        let id = parseInt(req.params.id); //ensure its number
        let body = req.body;
        let idx = tasks.findIndex((Item) => Item.id === id);

        if(idx !== -1) {
            tasks[idx] = {...tasks[idx], ...body };
            console.log(req.body);
            res.status(200).send({ isSuccess: true, tasks: tasks[idx] });
         } else{
            res.status(404).send({isSuccess: false, message:"tasks not found "});
         } 
        } catch (err) {
            console.error(err); //log the actual error for debugging
            res.status(500).send({ isSuccess: false, message: "Internal Server Error"});
        }
    })

 app.delete('/deletetasks/:id', (req,res) =>{
    try{
          const id =parseInt(req.params.id);  //Get ID from query and convert to number:-

          //find index of the product using splice:-
          const idx = tasks.findIndex((item) => item.id === id);

          if (idx !==  -1)  {
            //remove the product using splice:-
            tasks.splice(idx, 1);
            console.log('Remaining Tasks:', tasks);
            res.send({ isSuccess: true, deletedId: id});
          } else {
            res.status(404).send({ isSuccess: false, message: "Task not found"});
          }
      } catch (err){
        console.log(err);
        res.status(404).send({ isSuccess: false, message: "Internal serevr error"});
      }
 });

    app.listen(process.env.PORT,(err)=>{
    if(!err){
        console.log("server started at this port")
    }
})    




