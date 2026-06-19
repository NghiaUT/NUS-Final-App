import React from 'react';
import { useState } from 'react';

const PhotoCard = ({data} : any) => {
  const {
    author: { name, avatar_initials, avatar_url, is_following },
    content: { title, body },
    media: { type, image_stack },
    interactions: { likes_count, is_liked },
    metadata: { formatted_date }
  } = data;

  const [isFollowing, setIsFollowing] = useState(data.author.is_following);
  const [isLiked, setIsLiked] = useState(data.interactions.is_liked);
  const [likesCount, setLikesCount] = useState(data.interactions.likes_count);
  const commonImgConfig = "w-60 mx-auto aspect-square object-cover border-4 border-white shadow-md ";
  console.log(data);
  console.log(type);
  console.log(image_stack)
  return (
    <div className="flex box-border w-full mx-auto md:h-[300px] md:max-w-[550px] p-2.5 bg-graywhite shadow-2xs transition duration-300 ease-in-out">
      <div className="group flex-1 m-7.5 relative cursor-pointer">
        {/* Render các ảnh */}
        {
          image_stack.map((img) => {
            let imgConfig = commonImgConfig + (img.order === 1 ?  "relative z-3 group-hover:-translate-y-2" : img.order === 2 ? "absolute top-[5px] -left-[5px] z-2 -rotate-[4deg] group-hover:-translate-y-6 group-hover:-translate-x-4" : "absolute -top-[2px] left-[8px] z-1 rotate-[5deg] group-hover:-translate-y-8 group-hover:translate-x-4");

            return (
              <img key={img.order} src={img.url} alt={img.alt_text} className={imgConfig}></img>
            )
          })
        }
      </div>
      {/* Phần chứa các thông tin của ảnh */}
      <div className="flex-1 flex flex-col shrink-0 w-full">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src={avatar_url} alt="ảnh avatar" className="w-10 md:w-11 aspect-square rounded-full object-cover border-none cursor-pointer" />
            <p className="text-blue font-semibold">{name}</p>
          </div>
          {is_following ? 
            <div className="px-2 py-2 rounded-full font-semibold text-white text-xs bg-orange cursor-pointer">
              Following
            </div>
            : 
            <div className="px-2 py-2 rounded-full font-semibold text-orange bg-white text-xs border border-orange cursor-pointer">
              Follow
            </div>
          }
        </div>
        <div className="flex-1 flex flex-col gap-2 flex-start">
          <h1 className="font-semibold text-lg">{title}</h1>
          <p className="overflow-hidden text-sm">{body}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-start items-center cursor-pointer">
            {is_liked ?
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 text-blue"><path fill="#3c5a9a" d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z"/></svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 text-blue"><path fill="#3c5a9a" d="M442.9 144C415.6 144 389.9 157.1 373.9 179.2L339.5 226.8C335 233 327.8 236.7 320.1 236.7C312.4 236.7 305.2 233 300.7 226.8L266.3 179.2C250.3 157.1 224.6 144 197.3 144C150.3 144 112.2 182.1 112.2 229.1C112.2 279 144.2 327.5 180.3 371.4C221.4 421.4 271.7 465.4 306.2 491.7C309.4 494.1 314.1 495.9 320.2 495.9C326.3 495.9 331 494.1 334.2 491.7C368.7 465.4 419 421.3 460.1 371.4C496.3 327.5 528.2 279 528.2 229.1C528.2 182.1 490.1 144 443.1 144zM335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1C576 297.7 533.1 358 496.9 401.9C452.8 455.5 399.6 502 363.1 529.8C350.8 539.2 335.6 543.9 320 543.9C304.4 543.9 289.2 539.2 276.9 529.8C240.4 502 187.2 455.5 143.1 402C106.9 358.1 64 297.7 64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1L320 171.8L335 151.1z"/></svg>}
            <p>{likes_count}</p>
          </div>
          <p className="text-xs opacity-80">{formatted_date}</p>
        </div>
      </div>
    </div>
  )
}

export default PhotoCard