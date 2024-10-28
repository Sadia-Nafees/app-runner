const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Sample data
const sampleData = [
  { id: 1, name: 'Item 1', description: 'This is the first item' },
  { id: 2, name: 'Item 2', description: 'This is the second item' }
];

// API 1: Get all items
app.get('/api/items', (req, res) => {
  res.status(200).json({ data: sampleData });
});

// API 2: Get item by ID
app.get('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const item = sampleData.find(i => i.id === itemId);

  if (item) {
    res.status(200).json({ data: item });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
