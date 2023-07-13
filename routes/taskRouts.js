const express = require('express');
const taskcontroller = require('../controllers/taskcontroller')


const router = express.Router();

router.get('/create',taskcontroller.create_task_get);
router.get('/',taskcontroller.list_task);
router.post('/create',taskcontroller.create_task_post);
router.get('/:id',taskcontroller.detail_task);
router.get('/:id/update',taskcontroller.update_task_get);
router.put('/:id',taskcontroller.update_task_post);
router.delete('/:id',taskcontroller.delete_task);


module.exports = router;

