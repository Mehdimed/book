import { useState } from 'react';
import './Book.css';

export default function Book() {

    const [currentPages, setCurrentPages] = useState([-1,0]);
    let debluring = false;
    let timer;

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

    function validRange(x, y, z) {
            if((x[0] >= y && x[0] <= z) || (x[1] >= y && x[1] <= z)){
                return true;
            }
            else{
                return false;
            }
    }

    const deblurOrTranslate = (e) => {
        // find the first img child of the target
        // delete the filter property css
        const img = e.target.querySelector('img');
        if(img.style.filter === 'none'){
            const pageNumber = e.target.id.split('-')[1];
            // recupere l'url 
            const currentBaseUrl = window.location.href;
            img.src = `${currentBaseUrl}/tunic_translated_jpg/${pageNumber}.jpg`;
            // img.src = `${currentBaseUrl}/tunic_translated/${pageNumber}.png`;
        }
        img.style.filter = 'none';
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
                    zIndex: currentPages.includes(page) ? 55 : validRange(currentPages, page-2, page +2) ? 10 : 0,
                    pointerEvents: currentPages.includes(page) ? 'all': 'none'
                }}
                
                onMouseDown={(e) => {
                    e.preventDefault();
                    debluring = true;
                    timer = setTimeout(() => {
                        deblurOrTranslate(e);
                        debluring = false;
                    }, 1000);

                }}
                onTouchStart={(e) => {
                    e.preventDefault();
                    debluring = true;
                    timer = setTimeout(() => {
                        deblurOrTranslate(e);
                        debluring = false;
                    }, 1000);

                }}
                onMouseUp={(e) => {
                    e.preventDefault();
                    if(debluring){
                        turnPage(e);
                    }
                    clearTimeout(timer);
                }}
                onTouchEnd={(e) => {
                    e.preventDefault();
                    if(debluring){
                        turnPage(e);
                    }
                    clearTimeout(timer);
                }}
                >
                    <div className="imgcontainer">
                        <img src={`/tunic_jpg/${page}.jpg`} alt={`page-${page}`}/>
                        {/* <img src={`/tunic/${page}.png`} alt={`page-${page}`}/> */}
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  );
}
