const { response } = require('express');
const {Task,validateTask} = require('../models/task');




const list_task = (req, res) =>{
    Task.find().sort({name: 1})
        .then(result =>{
            res.render('listview',{tasks: result })
        })
        .catch(err =>{
            console.log(err);
        });
};

const detail_task = (req,res) =>{
    const id = req.params.id;
    Task.findById(id)
        .then(result =>{

            res.render('details',{task:result, title:'detail'})
        })
        .catch(err =>{

            res.render('404',{title:'task dont found'})
        });
    
}
const create_task_get = (req,res) =>{
    res.render('create', {title:'Create a new task'});
};
// const update_task_get =(req,res)=>{
//     res.render('update',{title:'update task'});
// }

const create_task_post = async(req,res) =>{
    console.log('the request body is: ',req.body);
    const {error,value} = validateTask(req.body);
    if(error){
        return res.render('create',{error:error.details[0].message});

    }

    const task = new Task({
        name:req.body.name,
        description:req.body.description,
    });
    try{
        await task.save();
        res.redirect('/tasks');
    }
    catch(err){
        console.log(err);
        return res.render('create',{error:'An error occurred. please try again later.'});

    }

    
};

const delete_task = async(req,res)=>{
    id = req.params.id;
    Task.findByIdAndRemove(id)
        .then(result =>{
            res.json({redirect:'/tasks'});
        })
        .catch(err =>{
            console.log(err);
        });
};

const update_task_get = (req,res)=>{
    
    const id = req.params.id;
    Task.findById(id)
        .then(result =>{
            res.render('update',{task:result,error:null})
        })
        .catch(err =>{
            console.log('error is occurd by uknown thing')
            res.render('404',{title:'task dont found', error: err.message })
        });

}



const update_task_post = async (req, res) => {
    console.log("this is befor validation:",req.body);

    const { error, value } = validateTask(req.body);
    if (error) {

        console.log("this is about error happend:",req.body);
        const task = { name: req.body.name, description: req.body.description };
        return res.status(400).render('update', { error: error.details[0].message, task: task });
    }
    try {
        console.log("this is lookslike valid:",req.body);

        const task = await Task.findByIdAndUpdate(req.params.id, { name: req.body.name, description: req.body.description }, { new: true })
        if (!task) return res.status(404).render('update', { error: 'something wrong try again later', task: task });
        res.json({redirect:'/tasks'});

    } catch (err) {
      console.log('error is occurd by uknown thing')
      res.status(404).render('404', { title: 'task dont found' })
    }
  }




module.exports = {
    list_task,
    detail_task,
    create_task_get,
    create_task_post,
    delete_task,
    update_task_get,
    update_task_post,

}
