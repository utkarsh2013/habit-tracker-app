const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// In-memory habits array
let habits = [
  { id: 1, name: 'Jogging', description: 'Do 30 mins of jogging daily', completed: false },
  { id: 2, name: 'Working Out', description: 'Do for at least 20 mins daily', completed: true },
];

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Routes
// Add your routes here
// Route to display all habits
app.get('/', (req, res) => {
    res.render('index', { habits });
  });
  
  // Route to add a new habit
  app.post('/habits', (req, res) => {
    const { name, description } = req.body;
    const newHabit = {
      id: habits.length + 1,
      name,
      description,
      completed: false,
    };
    habits.push(newHabit);
    res.redirect('/');
  });
  


  
  // Route to delete a habit
  app.post('/habits/:id/delete', (req, res) => {
    const { id } = req.params;
    habits = habits.filter((habit) => habit.id !== parseInt(id));
    res.redirect('/');
  });
  
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

  
