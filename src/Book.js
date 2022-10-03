import { useState } from 'react';
import './Book.css';

export default function Book() {

    const [currentPages, setCurrentPages] = useState([-1,0]);

    const book = [...Array(56).keys()];
    
    const turnPage = (e) => {
        const pageNum = parseInt(e.target.id.split('-')[1])+1;
        if (pageNum % 2 === 0)
              {
                e.target.classList.remove('flipped');
                e.target.previousElementSibling.classList.remove('flipped');
                setCurrentPages([currentPages[0]-2, currentPages[1]-2]);
            }
            else
            {
                e.target.classList.add('flipped');
                e.target.nextElementSibling.classList.add('flipped');
                setCurrentPages([currentPages[0]+2, currentPages[1]+2]);
              }
    }
    
  return (
    <div className="book">
      <div id="pages" className="pages">
        {book.map((page, index) => {
            return(
                <div 
                key={page}
                id={`page-${page}`}
                className="page"
                style={{
                    zIndex: currentPages.includes(page) ? 55 : 0,
                    pointerEvents: currentPages.includes(page) ? 'all': 'none'
                }}
                onClick={turnPage}
                >{page}</div>
            )
        })}
      </div>
    </div>
  );
}
