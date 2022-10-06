import { useEffect } from 'react';
import './Glass.css';

export default function Glass({ page, zoom, isMagic }) {

    useEffect(() => {
    const currentPage = document.getElementById(`page-${page}`);
    const img = document.getElementById(`image-${page}`);
    const glass = document.getElementById(`glass-${page}`);
    const newSrc = `${window.location.href}tunic_translated_jpg/${page}.jpg`;
    isMagic === true ? glass.style.backgroundImage = `url(${newSrc})` : glass.style.backgroundImage = `url(${img.src})`;
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = `${img.width * zoom}px ${img.height * zoom}px`;
    const bw = 3;
    const w = glass.offsetWidth / 2;
    const h = glass.offsetHeight / 2;
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
    currentPage.addEventListener("mousemove", moveMagnifier);
    

    function moveMagnifier(e) {
        let glass = e.target.querySelector('.img-magnifier-glass');
        if(!glass) {
            glass = document.getElementById(`glass-${page}`);
        } else {
            glass.style.visibility = 'visible';
        }
        var pos, x, y;
        /* Prevent any other actions that may occur when moving over the image */
        e.preventDefault();
        /* Get the cursor's x and y positions: */
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;
        /* Prevent the magnifier glass from being positioned outside the image: */
        if (x-60 > img.width - (w / zoom)) {x = img.width - (w / zoom);glass.style.visibility = 'hidden';}
        if (x < w / zoom) {x = w / zoom;glass.style.visibility = 'hidden';}
        if (y-60 > img.height - (h / zoom)) {y = img.height - (h / zoom);glass.style.visibility = 'hidden';}
        if (y < h / zoom) {y = h / zoom;glass.style.visibility = 'hidden';}
        /* Set the position of the magnifier glass: */
        if (glass !== null) {
          glass.style.left = (x - w) + "px";
        glass.style.top = (y - h) + "px";
        /* Display what the magnifier glass "sees": */
        glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
        }
      }
    
      function getCursorPos(e) {
        var a, x = 0, y = 0;
        e = e || window.event;
        /* Get the x and y positions of the image: */
        a = img.getBoundingClientRect();
        /* Calculate the cursor's x and y coordinates, relative to the image: */
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /* Consider any page scrolling: */
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return {x : x, y : y};
      }
    }, [page, zoom, isMagic]);
  return (
    <div id={`glass-${page}`} className={`img-magnifier-glass ${isMagic ? 'magic' : null}`}></div>
  )
}
