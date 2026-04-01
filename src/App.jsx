import React, { useState, useEffect } from 'react';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');

  // Mobile storage se notes lana
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('my-notes')) || [];
    setNotes(saved);
  }, []);

  // Notes save karna
  useEffect(() => {
    localStorage.setItem('my-notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!text.trim()) return;
    const newNote = { id: Date.now(), text, date: new Date().toLocaleTimeString() };
    setNotes([newNote, ...notes]);
    setText('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-extrabold text-indigo-900 mb-6 text-center">Pocket Notes 📝</h1>
        
        {/* Input area */}
        <div className="bg-white p-4 rounded-2xl shadow-xl mb-6">
          <textarea 
            className="w-full p-2 outline-none text-gray-700 resize-none"
            placeholder="Kuch yaad rakhna hai?..."
            rows="3"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button 
            onClick={addNote}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold mt-2 active:scale-95 transition-transform"
          >
            Save Note
          </button>
        </div>

        {/* Notes List */}
        <div className="space-y-4">
          {notes.map(note => (
            <div key={note.id} className="bg-white p-4 rounded-xl shadow-md border-l-4 border-indigo-500 animate-fade-in">
              <p className="text-gray-800 text-lg mb-2">{note.text}</p>
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>{note.date}</span>
                <button onClick={() => deleteNote(note.id)} className="text-red-400 font-semibold">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}