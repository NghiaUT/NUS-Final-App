import React from 'react'

const MediaAdd = () => {
    return (
        <div className='flex-1 w-full bg-white md:max-w-[1200px] flex flex-col items-center min-h-screen min-w-0'>
            <div className='w-full h-full flex flex-col justify-start p-6'>
                <div>
                    <p className='text-base md:text-xl xl:text-2xl font-bold mb-6'>New Photo</p>
                    <div className='w-full h-0.75 bg-gray'></div>
                </div>
                <div>
                    <form onSubmit={() => { }}>
                        {/* Chia layout 2 cột */}
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6'>
                            {/* Cột trái */}
                            <div className='flex flex-col gap-6'>
                                <div>
                                    <label htmlFor="title" className='block text-sm font-medium text-gray-700 mb-1'>Title<span className='text-red-500'>*</span></label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={""}
                                        onChange={() => { }}
                                        placeholder='Photo title'
                                        className='w-full px-3 py-2 border borde-rgraay-300 rounded focus:outline-none focus:ring-green-500'
                                    />
                                </div>
                                <div>
                                    <label htmlFor="sharingMode" className="block text-sm font-medium text-gray-700 mb-1">
                                        Sharing mode
                                    </label>
                                    <select
                                        id="sharingMode"
                                        name="sharingMode"
                                        value={""}
                                        onChange={() => { }}
                                        className="w-48 px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-green-500"
                                    >
                                        <option value="public">Public</option>
                                        <option value="private">Private</option>
                                    </select>
                                </div>
                            </div>
                            {/* Cột phải */}
                            <div className="flex flex-col">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={""}
                                    onChange={() => { }}
                                    placeholder="Photo Description"
                                    className="w-full h-40 px-3 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-green-500"
                                ></textarea>
                            </div>
                            <div>
                                <div
                                    onClick={() => { console.log("Tải hình ảnh ") }}
                                    className="w-40 h-40 border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                                >
                                    {/* {formData.photo ? (
                                        <span className="text-xs text-gray-500 px-2 text-center break-all">
                                            {formData.photo.name}
                                        </span>
                                    ) : ( */}
                                    <span className="text-4xl text-gray-300 font-bold">+</span>
                                    {/* )} */}
                                </div>
                                {/* Input file ẩn đi */}
                                <input
                                    type="file"
                                    // ref={}
                                    onChange={() => { }}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded transition-colors cursor-pointer"
                            onClick={(e) => { e.preventDefault(); console.log("gửi dữ liệu lên") }}
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MediaAdd