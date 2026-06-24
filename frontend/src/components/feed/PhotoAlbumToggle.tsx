import React from 'react'

const PhotoAlbumToggle = ({ media, handleOnClick } : any) => {

    return (
      <div className="relative mt-5 mb-5 border border-blue rounded-lg">
        {/* Thanh trượt bên dưới */}
        <div className={`absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-blue rounded-lg transition-transform duration-300 ease-out ${media === "photo" ? 'translate-x-0' : 'translate-x-full'}`}></div>
        <button className={`relative z-10 md:w-28 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-xl font-bold text-center cursor-pointer transition-colors duration-300 bg-transparent border-none outline-none ${media === "photo" ? "text-white" : "text-blue"}`} onClick={() => handleOnClick("photo")}>PHOTO</button>
        <button className={`relative z-10 md:w-28 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-xl font-bold text-center cursor-pointer transition-colors duration-300 bg-transparent border-none outline-none ${media === "album" ? "text-white" : "text-blue"}`} onClick={() => handleOnClick("album")}>ALBUM</button>
      </div>
    )
}

export default PhotoAlbumToggle