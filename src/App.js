import { useState } from 'react';
import './App.css';
import Book from './Book';


function App() {
  const [isMagic, setIsMagic] = useState(false);

  const toggleMagic = () => {
    setIsMagic(!isMagic);
  }

  let buffer = [];
  const secretSound = new Audio('/tunic_sound/secretFound.wav');
  secretSound.preload = 'auto';

  document.addEventListener('keydown', (e) => {
    buffer.push(e.key);
    if (buffer.length > 6) {
      buffer.shift();
    }
    if (buffer.join('') === 'ArrowDownArrowRightArrowUpArrowLeftArrowUpArrowRight') {
      secretSound.play();
      setTimeout(() => {
        toggleMagic();
      }, 2000);
    }
  });

  return (
    <div className="App">
      <Book isMagic={isMagic}/>
    </div>
  );
}

export default App;
