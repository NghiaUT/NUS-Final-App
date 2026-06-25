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
const MediaCard = ({ data, type } : {data: any, type: string}) => {
  let commonImgConfig = "w-40 sm:w-50 mx-auto aspect-square object-cover border-4 border-white shadow-md ";

  return (
    <div className="flex flex-col items-center w-60 gap-2.5">
      <div className={"w-60 h-60 relative group cursor-pointer tranform-all duration-300 ease-in-out " + (type === "photo" ? "hover:scale-105 ": "")}>
        {
          type === "album" ?
          data.media.image_stack.slice(0, 3).map((img : Image) => {
            let imgConfig = commonImgConfig + (img.order === 1 ? "relative z-3 group-hover:-translate-y-2" : img.order === 2 ? "absolute z-2 left-0 right-0 mx-auto w-fit top-[2px] sm:top-[5px] text-center -rotate-[4deg] group-hover:-translate-y-6 group-hover:-translate-x-4" : "absolute z-1 left-0 right-0 mx-auto w-fit -top-[2px] rotate-[5deg] group-hover:-translate-y-8 group-hover:translate-x-4");
            return (
              <img key={img.order} src={img.url || undefined} alt={img.alt_text || "None"} className={imgConfig}>
              </img>
            )
          }) :
          <img src={data.media.image_stack[0].url} alt={data.content.title} className="w-full h-full object-cover rounded-lg" />
        }
      </div>
      <p className="text-xs sm:text-base line-clamp-1 overflow-hidden text-ellipsis">{data.content.title}</p>
    </div>
  )
}

export default MediaCard