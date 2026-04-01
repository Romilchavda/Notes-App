// No imports needed here
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Hum App ki jagah window.MyNotesApp use kar rahe hain
root.render(
  <React.StrictMode>
    <window.MyNotesApp />
  </React.StrictMode>
);