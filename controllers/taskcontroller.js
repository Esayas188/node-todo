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
            console.log('this tasks:',result);
            res.render('details',{task:result, title:'detail'})
        })
        .catch(err =>{
            console.log('error is occurd by uknown thing')
            res.render('404',{title:'blog dont found'})
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




module.exports = {
    list_task,
    detail_task,
    create_task_get,
    create_task_post,
    delete_task,
    // update_task_get,

}
// router.get('/create',taskcontroller.create_task_get);
// router.put('/update',taskcontroller.update_task_get);
//router.get('/',taskcontroller.list_task);
// router.post('/',taskcontroller.create_task_post);
//router.get('/:id',taskcontroller.detail_task);
// router.get('/:id',taskcontroller.delete_task);