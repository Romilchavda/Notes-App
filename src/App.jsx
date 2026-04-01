// No imports needed here
const { useState, useEffect } = React;

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('my_notes')) || [];
    setNotes(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('my_notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!text.trim()) return;
    const newNote = { id: Date.now(), text, date: new Date().toLocaleDateString() };
    setNotes([newNote, ...notes]);
    setText('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">My Notes 📝</h1>
      
      <div className="bg-white p-4 rounded-xl shadow-md mb-6 border border-gray-100">
        <textarea 
          className="w-full p-2 outline-none text-gray-700"
          placeholder="Yahan likhein..."
          rows="3"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button 
          onClick={addNote}
          className="w-full bg-blue-500 text-white py-2 rounded-lg mt-2 font-semibold active:scale-95 transition-all"
        >
          Save Note
        </button>
      </div>

      <div className="space-y-4">
        {notes.map(note => (
          <div key={note.id} className="bg-yellow-100 p-4 rounded-lg shadow flex justify-between items-start border-l-4 border-yellow-400">
            <div>
              <p className="text-gray-800">{note.text}</p>
              <span className="text-[10px] text-gray-400 mt-2 block">{note.date}</span>
            </div>
            <button onClick={() => deleteNote(note.id)} className="text-red-400 font-bold px-2">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Ye line zaroori hai taaki main.jsx ko ye mil sake
window.MyNotesApp = App;