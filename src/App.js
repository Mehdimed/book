import { useState } from 'react';
import './App.css';
import Book from './Book';

const secretSound = new Audio('/tunic_sound/secretFound.wav');
secretSound.preload = 'auto';
secretSound.load();

function App() {
  const [isMagic, setIsMagic] = useState(false);
  const [rotation, setRotation] = useState(16); // -5 to 16
  
  const toggleMagic = () => {
    setIsMagic(!isMagic);
  }
  
  let buffer = [];
    

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

  const rotateHead = (e) => {
    const mouseY = e.clientY;

    const screenHeight = window.innerHeight;

    // -5 is the minimum rotation equivalent to the top of the screen and 16 is the maximum rotation equivalent to the bottom of the screen
    const deg = Math.round((mouseY / screenHeight) * 21) - 5;
    setRotation(deg);
  }

  return (
    <div className="App" onMouseMove={rotateHead}>
      <Book isMagic={isMagic}/>
      <img className='tetePensante' src="/tetePensante.png" alt="renard-pensant" style={{transform: `rotate(${rotation}deg)`}} />
      <img className='renardPensantSansTete' src="/renardPensantSansTete.png" alt="renard-pensant" />

    </div>
  );
}

export default App;
