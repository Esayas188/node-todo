const Task = require('../models/task');



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
            res.render('details',{tasks:result, title:detail})
        })
        .catch(err =>{
            console.log('error')
            res.render('404',{title:'blog dont found'})
        });
    
}
module.exports = {
    list_task,
    detail_task,
}