const express = require('express');
const taskcontroller = require('../controllers/taskcontroller')


const router = express.Router();

// router.get('/create',taskcontroller.create_task_get);
// router.put('/update',taskcontroller.update_task);
router.get('/',taskcontroller.list_task);
// router.post('/',taskcontroller.create_task_post);
router.get('/:id',taskcontroller.detail_task);
// router.get('/:id',taskcontroller.delete_task);


module.exports = router;
