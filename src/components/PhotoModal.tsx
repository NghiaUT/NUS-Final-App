import React, { useState } from 'react';

const PhotoModal = ({data, handleModalClose} : any) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const image_stack = data.media.image_stack;
    const image_type = data.media.type;
    const title = data.content.title;
    const body = data.content.body;

    const prevSlide = () => {   
        setCurrentIndex((index) => {
        return index === 0 ? image_stack.length - 1 : index - 1;
        });
    };

    const nextSlide = () => {
        setCurrentIndex((index) => {
        return index === image_stack.length - 1 ? 0 : index + 1;
        });
    };
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-black/50 flex justify-center items-center z-1000">
        <div className="rounded-sm w-[90vw] max-w-[1200px] aspect-square sm:aspect-4/3 max-h-[85vh] object-contain bg-white p-2.5 flex flex-col items-center gap-2.5">
          {/* Modal chứa title, các ảnh và description ảnh*/}
          <div className="flex flex-row items-center justify-between w-full">
            <span className="font-semibold text-xl md:text-2xl line-clamp-1">{title}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" onClick={() => {handleModalClose(); setCurrentIndex(0);}}><path fill="#848585" d="M504.6 148.5C515.9 134.9 514.1 114.7 500.5 103.4C486.9 92.1 466.7 93.9 455.4 107.5L320 270L184.6 107.5C173.3 93.9 153.1 92.1 139.5 103.4C125.9 114.7 124.1 134.9 135.4 148.5L278.3 320L135.4 491.5C124.1 505.1 125.9 525.3 139.5 536.6C153.1 547.9 173.3 546.1 184.6 532.5L320 370L455.4 532.5C466.7 546.1 486.9 547.9 500.5 536.6C514.1 525.3 515.9 505.1 504.6 491.5L361.7 320L504.6 148.5z"/></svg>
          </div>
          <div className="relative flex-1 w-full h-full overflow-hidden flex items-center justify-center">
            {image_type === "album" && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="absolute top-1/2 left-4 -translate-y-1/2 w-10 sm:w-20 h-20 sm:h-40 hover:text-gray-200 transition-colors z-10 cursor-pointer select-none" onClick={prevSlide}>
              <path fill="#848585" d="M169.4 297.4C156.9 309.9 156.9 330.2 169.4 342.7L361.4 534.7C373.9 547.2 394.2 547.2 406.7 534.7C419.2 522.2 419.2 501.9 406.7 489.4L237.3 320L406.6 150.6C419.1 138.1 419.1 117.8 406.6 105.3C394.1 92.8 373.8 92.8 361.3 105.3L169.3 297.3z"/>
            </svg>)}

            {<img src={image_stack[currentIndex].url} alt={image_stack[currentIndex].alt_text} className="w-full h-full object-contain"/>}

            {image_type === "album" && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="absolute top-1/2 right-4 -translate-y-1/2 w-10 sm:w-20 h-20 sm:h-40 hover:text-gray-200 transition-colors z-10 cursor-pointer select-none" onClick={nextSlide}>
              <path fill="#848585" d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z"/>
            </svg>)}
          </div>
          <p className="text-xs md:text-base line-clamp-2">{body}</p>
        </div>
      </div>
  )
}

export default PhotoModal;