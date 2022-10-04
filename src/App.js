import { useState } from 'react';
import './App.css';
import Book from './Book';


function App() {
  const [isAllVisible, setIsAllVisible] = useState(false);

  const toggleBlur = () => {
    setIsAllVisible(!isAllVisible);
  }

  return (
    <div className="App">
      <button onClick={toggleBlur}>toggle blur on locked pages</button>
      <Book isAllVisible={isAllVisible}/>
    </div>
  );
}

export default App;
