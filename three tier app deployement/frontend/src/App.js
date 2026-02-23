import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API_URL}/items`);
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  const addItem = async () => {
    if (!newItem.trim()) return;
    try {
      await axios.post(`${API_URL}/items`, { name: newItem });
      setNewItem('');
      fetchItems();
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Three-Tier App</h1>
      <div>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter item name"
        />
        <button onClick={addItem}>Add Item</button>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={item._id || index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
