import React from 'react';
import type { Image } from '../../types/media.types';
/* data = {
    title: "",
    media: {
        type: "album" or "photo"
        image_stack: [] -> 1 or many
    }
}
*/
const MediaCard = ({ data, type, editable }: { data: any; type: string, editable: boolean }) => {
  const commonImgConfig =
    'w-32 sm:w-50 mx-auto aspect-square object-cover border-4 border-white shadow-md shrink-0 ';

  return (
    <div className="flex flex-col items-center w-60 gap-2.5 mx-auto">
      <div
        className={
          'w-60 h-60 relative group cursor-pointer flex justify-center items-center tranform-all duration-300 ease-in-out ' +
          (type === 'photo' ? 'hover:scale-105 ' : '')
        }
      >
        {type === 'album' ? (
          data.media.image_stack.slice(0, 3).map((img: Image) => {
            const imgConfig =
              commonImgConfig +
              (img.order === 1
                ? 'relative z-3 group-hover:-translate-y-2 w-fit'
                : img.order === 2
                  ? 'absolute z-2 left-0 right-0 mx-auto w-fit top-[2px] sm:top-[5px] text-center -rotate-[4deg] group-hover:-translate-y-6 group-hover:-translate-x-4'
                  : 'absolute z-1 left-0 right-0 mx-auto w-fit -top-[2px] rotate-[5deg] group-hover:-translate-y-8 group-hover:translate-x-4');
            return (
              <img
                key={img.order}
                src={img.url || undefined}
                alt={img.alt_text || 'None'}
                className={imgConfig}
              ></img>
            );
          })
        ) : (
          <img
            src={data.media.image_stack[0].url}
            alt={data.content.title}
            className="w-40 sm:w-50 h-40 sm:h-50 object-cover rounded-lg"
          />
        )}

        {editable && type === 'album' && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-28 h-28 rounded-full bg-white/30 backdrop-blur-md flex flex-col items-center justify-center text-white shadow-lg">
              <span className="text-3xl font-semibold">{data.media.image_stack.length}</span>
              <span className="text-xs tracking-wider uppercase">Photos</span>
            </div>
          </div>
        )}

        {editable && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Edit clicked");
            }}
            className="absolute bottom-6 right-6 sm:bottom-4 sm:right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 hover:bg-black/80 text-white text-xs font-bold px-4 py-1.5 rounded-full backdrop-blur-sm cursor-pointer"
          >
            EDIT
          </button>
        )}
      </div>
      <p className="text-xs sm:text-base line-clamp-1 overflow-hidden text-ellipsis text-center">
        {data.content.title}
      </p>
    </div>
  );
};

export default MediaCard;
