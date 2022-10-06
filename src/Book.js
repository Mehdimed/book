import {  useEffect, useState } from 'react';
import './Book.css';
import Glass from './Glass';

let loaded = false;
export default function Book({ isMagic }) {

    const [currentPages, setCurrentPages] = useState([-1,0]);
    let debluring = false;
    let timer;
    useEffect(() => {
            loaded = true;
    }, []);

    const book = [...Array(56).keys()];
    const audios = [new Audio('/tunic_sound/turn_page1.wav'), new Audio('/tunic_sound/turn_page2.wav'), new Audio('/tunic_sound/turn_page3.wav')];
    audios.forEach(audio => audio.preload = 'auto');
    
    const turnPage = (e) => {
        const pageNum = parseInt(e.target.id.split('-')[1])+1;
        // play sound
        let random = Math.floor(Math.random() * 3);
        audios[random].play();
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
        const pageNumber = parseInt(e.target.id.split('-')[1]);
        if(!img.classList.contains('blurred')){
            const currentBaseUrl = window.location.href;    

            const glass = e.target.querySelector('.img-magnifier-glass');
            glass.style.backgroundImage = `url(${currentBaseUrl}/tunic_translated_jpg/${pageNumber}.jpg)`;

            img.src = `${currentBaseUrl}/tunic_translated_jpg/${pageNumber}.jpg`;

            // img.src = `${currentBaseUrl}/tunic_translated/${pageNumber}.png`;
        } else {
            if(pageNumber % 2 === 0){
                const nextImg = e.target.nextElementSibling.querySelector('img');
                nextImg.classList.remove('blurred');
            } else {
                const prevImg = e.target.previousElementSibling.querySelector('img');
                prevImg.classList.remove('blurred');
            }
            img.classList.remove('blurred');
        }
    }

    
  return (
    <div id="book" className="book">
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
                        { (currentPages.includes(page) && loaded) && <Glass page={page} zoom={2} isMagic={isMagic}/> }
                        { validRange(currentPages, page-2, page +2) && <img id={`image-${page}`} src={`/tunic_jpg/${page}.jpg`} alt={`page-${page}`}/>}
                        {/* <img src={`/tunic/${page}.png`} alt={`page-${page}`}/> */}
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  );
}
