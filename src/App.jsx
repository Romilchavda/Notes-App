const { useState, useEffect } = React;

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');

  // Storage se purane notes uthana
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('notes-data')) || [];
    setNotes(saved);
  }, []);

  // Naye notes save karna
  useEffect(() => {
    localStorage.setItem('notes-data', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!text.trim()) return;
    const newNote = {
      id: Date.now(),
      content: text,
      date: new Date().toLocaleDateString()
    };
    setNotes([newNote, ...notes]);
    setText('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100 p-5 font-sans">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-black text-slate-800 mb-6 text-center tracking-tight">
          POCKET NOTES 📒
        </h1>

        {/* Input Card */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <textarea 
            className="w-full border-none outline-none text-lg resize-none"
            placeholder="Kuch yaad rakhna hai?..."
            rows="3"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button 
            onClick={addNote}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold mt-2 active:scale-95 transition-all shadow-blue-200 shadow-lg"
          >
            Add Note
          </button>
        </div>

        {/* List of Notes */}
        <div className="space-y-4">
          {notes.map(note => (
            <div key={note.id} className="bg-yellow-50 p-4 rounded-xl shadow-sm border-l-4 border-yellow-400 flex justify-between items-start animate-in fade-in duration-500">
              <div className="flex-1">
                <p className="text-slate-700 text-lg">{note.content}</p>
                <span className="text-[10px] font-bold text-slate-400 mt-2 block uppercase uppercase">{note.date}</span>
              </div>
              <button onClick={() => deleteNote(note.id)} className="text-red-400 p-1">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                </svg>
              </button>
            </div>
          ))}
          {notes.length === 0 && <p className="text-center text-slate-400 mt-10">Khali hai! Kuch likhiye...</p>}
        </div>
      </div>
    </div>
  );
}