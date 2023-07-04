const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Routes = require('./routes/taskRouts');




const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(morgan('dev'));
app.use((req,res, next)=>{
  res.locals.path = req.path;
  next();
});


mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to MongoDB....');
  const port = process.env.PORT || 3000;

  app.listen(port,()=>{
      console.log(`listnening port ${port}....`);
}) 
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


//routes
app.get('/', (req, res)=>{
  res.redirect('/tasks');
});

app.use('/tasks', Routes);

//404

app.use((req,res) =>{
  res.status(404).render('404', {title: '404'});

});
