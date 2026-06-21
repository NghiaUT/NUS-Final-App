import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import PhotoCard from '../../components/PhotoCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/LoadingSpinner';


const MOCK_DATA = [
  {
    "id": "post_982374",
    "author": {
      "id": "user_012",
      "name": "Hieu Nguyen",
      "avatar_initials": "HN",
      "avatar_url": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      "is_following": true
    },
    "content": {
      "title": "Nam tempor posuere faucibus",
      "body": "Aliquam dictum nec massa ac consequat. Etiam dignissim tincidunt tellus sed vestibulum. Sed vitae vestibulum purus. Curabitur malesuada libero in nibh pretium, sed malesuada nisi feugiat."
    },
    "media": {
      "type": "album",
      "image_stack": [
        {
          "order": 1,
          "url": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80",
          "alt_text": "Chân dung nam đeo kính"
        },
        {
          "order": 2,
          "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80",
          "alt_text": "Phong cảnh mùa thu"
        },
        {
          "order": 3,
          "url": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=500&q=80",
          "alt_text": "Hồ nước tĩnh lặng"
        }
      ]
    },
    "interactions": {
      "likes_count": 123,
      "is_liked": true
    },
    "metadata": {
      "created_at": "2018-04-01T16:56:00Z",
      "formatted_date": "4:56 pm 01/04/2018"
    }
  },
  {
    "id": "post_982375",
    "author": {
      "id": "user_045",
      "name": "Anna Tran",
      "avatar_initials": "AT",
      "avatar_url": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      "is_following": false
    },
    "content": {
      "title": "Vestibulum ante ipsum primis",
      "body": "Nullam rutrum, mi et tempor vulputate, sem lectus mattis mauris, ac interdum urna neque eu felis. Pellentesque habitant morbi tristique senectus et netus et malesuada."
    },
    "media": {
      "type": "album",
      "image_stack": [
        {
          "order": 1,
          "url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
          "alt_text": "Cô gái với chiếc lá che nửa mặt"
        },
        {
          "order": 2,
          "url": "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=500&q=80",
          "alt_text": "Rừng cây xanh"
        }
      ]
    },
    "interactions": {
      "likes_count": 89,
      "is_liked": true
    },
    "metadata": {
      "created_at": "2018-04-02T09:15:00Z",
      "formatted_date": "9:15 am 02/04/2018"
    }
  },
  {
    "id": "post_982376",
    "author": {
      "id": "user_077",
      "name": "Sarah Connor",
      "avatar_initials": "SC",
      "avatar_url": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
      "is_following": true
    },
    "content": {
      "title": "Pellentesque habitant morbi",
      "body": "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum."
    },
    "media": {
      "type": "album",
      "image_stack": [
        {
          "order": 1,
          "url": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80",
          "alt_text": "Cô gái đội vòng hoa"
        },
        {
          "order": 2,
          "url": "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=500&q=80",
          "alt_text": "Nhóm bạn bè vui vẻ"
        },
        {
          "order": 3,
          "url": "https://images.unsplash.com/photo-1496024840928-4c417aaf2217?auto=format&fit=crop&w=500&q=80",
          "alt_text": "Bữa tiệc ngoài trời"
        }
      ]
    },
    "interactions": {
      "likes_count": 452,
      "is_liked": true
    },
    "metadata": {
      "created_at": "2018-04-03T20:30:00Z",
      "formatted_date": "8:30 pm 03/04/2018"
    }
  },
  {
    "id": "post_982377",
    "author": {
      "id": "user_092",
      "name": "Minh Le",
      "avatar_initials": "ML",
      "avatar_url": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
      "is_following": false
    },
    "content": {
      "title": "Maecenas faucibus mollis interdum",
      "body": "Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis. Nullam quis risus eget urna mollis ornare vel eu leo."
    },
    "media": {
      "type": "photo",
      "image_stack": [
        {
          "order": 1,
          "url": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80",
          "alt_text": "Cô gái ở bối cảnh thành phố"
        }
      ]
    },
    "interactions": {
      "likes_count": 56,
      "is_liked": false
    },
    "metadata": {
      "created_at": "2018-04-05T14:10:00Z",
      "formatted_date": "2:10 pm 05/04/2018"
    }
  },
  {
    "id": "post_982378",
    "author": {
      "id": "user_110",
      "name": "Hoang Vu",
      "avatar_initials": "HV",
      "avatar_url": "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=150&q=80",
      "is_following": true
    },
    "content": {
      "title": "Donec id elit non mi porta",
      "body": "Maecenas sed diam eget risus varius blandit sit amet non magna. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."
    },
    "media": {
      "type": "album",
      "image_stack": [
        {
          "order": 1,
          "url": "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=500&q=80",
          "alt_text": "Chó Golden Retriever"
        },
        {
          "order": 2,
          "url": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=500&q=80",
          "alt_text": "Công viên cho chó"
        }
      ]
    },
    "interactions": {
      "likes_count": 890,
      "is_liked": true
    },
    "metadata": {
      "created_at": "2018-04-06T10:05:00Z",
      "formatted_date": "10:05 am 06/04/2018"
    }
  },
  {
    "id": "post_982379",
    "author": {
      "id": "user_155",
      "name": "Linh Pham",
      "avatar_initials": "LP",
      "avatar_url": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      "is_following": false
    },
    "content": {
      "title": "Aenean eu leo quam",
      "body": "Pellentesque ornare sem lacinia quam venenatis vestibulum. Curabitur blandit tempus porttitor. Morbi leo risus, porta ac consectetur ac, vestibulum at eros."
    },
    "media": {
      "type": "album",
      "image_stack": [
        {
          "order": 1,
          "url": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=80",
          "alt_text": "Sách ảnh đặt trên bàn gỗ"
        },
        {
          "order": 2,
          "url": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=500&q=80",
          "alt_text": "Tách cà phê"
        },
        {
          "order": 3,
          "url": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80",
          "alt_text": "Kính râm"
        }
      ]
    },
    "interactions": {
      "likes_count": 12,
      "is_liked": false
    },
    "metadata": {
      "created_at": "2018-04-07T11:45:00Z",
      "formatted_date": "11:45 am 07/04/2018"
    }
  },
  {
    "id": "post_982380",
    "author": {
      "id": "user_201",
      "name": "David Chen",
      "avatar_initials": "DC",
      "avatar_url": "",
      "is_following": true
    },
    "content": {
      "title": "Cras mattis consectetur",
      "body": "Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nullam id dolor id nibh ultricies vehicula ut id elit. Praesent commodo cursus magna."
    },
    "media": {
      "type": "photo",
      "image_stack": [
        {
          "order": 1,
          "url": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=80",
          "alt_text": "Kiến trúc tòa nhà hiện đại"
        }
      ]
    },
    "interactions": {
      "likes_count": 334,
      "is_liked": true
    },
    "metadata": {
      "created_at": "2018-04-08T15:20:00Z",
      "formatted_date": "3:20 pm 08/04/2018"
    }
  },
  {
    "id": "post_982381",
    "author": {
      "id": "user_304",
      "name": "Elena Smith",
      "avatar_initials": "ES",
      "avatar_url": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      "is_following": false
    },
    "content": {
      "title": "Nullam quis risus eget urna",
      "body": "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Sed posuere consectetur est at lobortis."
    },
    "media": {
      "type": "album",
      "image_stack": [
        {
          "order": 1,
          "url": "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=500&q=80",
          "alt_text": "Món tráng miệng đẹp mắt"
        },
        {
          "order": 2,
          "url": "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=500&q=80",
          "alt_text": "Cốc sinh tố"
        }
      ]
    },
    "interactions": {
      "likes_count": 1056,
      "is_liked": false
    },
    "metadata": {
      "created_at": "2018-04-09T08:00:00Z",
      "formatted_date": "8:00 am 09/04/2018"
    }
  }
];
const fetchData = async (pageParam) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_DATA);
    }, 1500); //-> Set time out 1500 for delaying;
  });
};

const Feed = () => {
  // Page for the feed layout:
  // Header is here too, it will be split later for the layout.
  // 1. Set the observer:
  const { ref: bottomRef, inView } = useInView();

  // 2. Infinite Query:
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({queryKey:['albums'], queryFn: fetchData, initialPageParam: 1, getNextPageParam: (lastPage, allPages) => {
    return lastPage.length === 8 ? allPages.length + 1 : null;
  }});

  useEffect(() => {
    if(inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  // State for modal viewing photo/album
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleModalOpen = (data) => {
    console.log(data);
    setSelectedItem(data);
    setIsModalOpen(true);
    setCurrentIndex(0);
  };

  const handleModalClose = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
    setCurrentIndex(0);
  };

  const prevSlide = () => {   
    setCurrentIndex((index) => {
      return index === 0 ? selectedItem.media.image_stack.length - 1 : index - 1;
    });
  };

  const nextSlide = () => {
    setCurrentIndex((index) => {
      return index === selectedItem.media.image_stack.length - 1 ? 0 : index + 1;
    });
  };

  if (status === 'error') return <div>Error fetching data</div>;

  return (
    <div className=''>
      <header className="bg-blue h-14 sm:h-15 flex items-center justify-between pl-3 pr-3 md:pl-[2%] md:pr-[2%] xl:pl-[5%] xl:pr-[5%]">
        <div className="text-xl sm:text-3xl text-white text-right pr-4 md:w-[150px]">Fotobook</div>
        <div className='flex-1 md:max-w-[1200px] flex gap-5 items-center justify-between'>
          <input type="text" name="" id="" placeholder='Search Photo/ Album' className="hidden sm:flex flex-1 bg-white px-4 py-2 md:px-6 md:py-3 rounded-md md:max-w-[650px] focus:outline-2 focus:outline-graywhite focus:border focus:border-black"/>
          <div className="flex flex-row items-center gap-2 justify-between">
            <img src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80' alt="anh avatar" className="w-7 sm:w-8 md:w-10 aspect-square xl:w-13 object-cover border-none cursor-pointer rounded-full"/>
            <p className="hidden xl:flex text-white xl:text-xl xl:font-semibold">Hieu Nguyen</p>
          </div>
        </div>
        <button className="text-xs sm:text-base md:text-xl text-center cursor-pointer font-bold text-white md:w-[150px]">Logout</button>
      </header>

      <div className="flex flex-row justify-between pt-5 pl-3 pr-3 md:pl-[2%] md:pr-[2%] xl:pl-[5%] xl:pr-[5%] bg-graywhite">
        <aside className="hidden sm:block md:w-[150px]">
          <ul className="mt-5 flex flex-col items-start justify-start gap-2 w-full">
            <li className="font-semibold text-blue text-lg cursor-pointer">Feeds</li>
            <li className="font-semibold text-lg cursor-pointer">Discover</li>
          </ul>
        </aside>

        <div className="flex-1 bg-white md:max-w-[1200px] flex flex-col items-center">
          <div className="mt-5 mb-5 border border-blue rounded-lg">
            <button className="md:w-28 px-3 sm:px-4 py-1.5 sm:py-2 text-blue text-sm sm:text-xl font-bold text-center cursor-pointer">PHOTO</button>
            <button className="md:w-28 px-3 sm:px-4 py-1.5 sm:py-2 text-white text-sm sm:text-xl font-bold text-center bg-blue cursor-pointer">ALBUM</button>
          </div>
          {status === 'pending' ? <LoadingSpinner /> : <>
          <div className="flex-1 w-full grid grid-cols-1 xl:grid-cols-2 gap-1.5 sm:gap-2.5 p-2.5">
            {
              data?.pages.flatMap(page => page).map((data) => {
                return (
                  <PhotoCard key={data.id} data={data} onImgClick={handleModalOpen}/>
                )
              })
            }
          </div>
          {/* Attach the ref to this invisible div at the bottom */}
          <div ref={bottomRef} style={{ height: '50px' }}></div>
          {isFetchingNextPage && <LoadingSpinner />}
          {!hasNextPage && <div>You've caught up on everything! 🎉</div>}
          </>}
        </div>

        <aside className="hidden sm:block md:w-[150px] invisible">
          {/* Thẻ mẫu để chiếm chỗ đảm bảo cho main luôn chiếm chừng đấy */}
          Hello đi nhờ
        </aside>
      </div>

      <div className="fixed bottom-0 right-0 left-0 sm:hidden bg-white border-t border-gray flex justify-around h-16 z-50">
        <button className="flex-1 flex flex-col items-center justify-center gap-1 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="flex-1 h-8 w-8"><path fill="#3c5a9a" d="M213.1 128.8L202.7 160L128 160C92.7 160 64 188.7 64 224L64 480C64 515.3 92.7 544 128 544L512 544C547.3 544 576 515.3 576 480L576 224C576 188.7 547.3 160 512 160L437.3 160L426.9 128.8C420.4 109.2 402.1 96 381.4 96L258.6 96C237.9 96 219.6 109.2 213.1 128.8zM320 256C373 256 416 299 416 352C416 405 373 448 320 448C267 448 224 405 224 352C224 299 267 256 320 256z"/></svg>
          <span className="text-xs text-blue font-semibold">Feeds</span>
        </button>
        <button className="flex-1 flex flex-col items-center justify-center gap-1 text-gray font-semibold cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="flex-1 h-8 w-8"><path fill="#3c5a9a" d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"/></svg>
          <span className="text-xs">Discover</span>
        </button>
      </div>

      {/* Render modal hiển thị chi tiết ảnh */}
      {isModalOpen && selectedItem && <div className="fixed top-0 bottom-0 right-0 left-0 bg-black/50 flex justify-center items-center z-1000">
        <div className="rounded-sm w-[400px] h-[300px] sm:w-[500px] md:w-[800px] sm:h-[400px] md:h-[600px] bg-white p-2.5 flex flex-col items-center gap-2.5">
          {/* Modal chứa title, các ảnh và description ảnh*/}
          <div className="flex flex-row items-center justify-between w-full">
            <span className="font-semibold text-xl line-clamp-1">{selectedItem.content.title}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 cursor-pointer" onClick={() => handleModalClose()}><path fill="#848585" d="M504.6 148.5C515.9 134.9 514.1 114.7 500.5 103.4C486.9 92.1 466.7 93.9 455.4 107.5L320 270L184.6 107.5C173.3 93.9 153.1 92.1 139.5 103.4C125.9 114.7 124.1 134.9 135.4 148.5L278.3 320L135.4 491.5C124.1 505.1 125.9 525.3 139.5 536.6C153.1 547.9 173.3 546.1 184.6 532.5L320 370L455.4 532.5C466.7 546.1 486.9 547.9 500.5 536.6C514.1 525.3 515.9 505.1 504.6 491.5L361.7 320L504.6 148.5z"/></svg>
          </div>
          <div className="relative flex-1 w-full h-full overflow-hidden flex items-center justify-center">
            {selectedItem.media.type === "album" && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="absolute top-1/2 left-4 -translate-y-1/2 w-20 h-40 hover:text-gray-200 transition-colors z-10 cursor-pointer select-none" onClick={prevSlide}>
              <path fill="#848585" d="M169.4 297.4C156.9 309.9 156.9 330.2 169.4 342.7L361.4 534.7C373.9 547.2 394.2 547.2 406.7 534.7C419.2 522.2 419.2 501.9 406.7 489.4L237.3 320L406.6 150.6C419.1 138.1 419.1 117.8 406.6 105.3C394.1 92.8 373.8 92.8 361.3 105.3L169.3 297.3z"/>
            </svg>)}

            {<img src={selectedItem.media.image_stack[currentIndex].url} alt={selectedItem.media.image_stack[currentIndex].alt_text} className="w-full h-full object-contain"/>}

            {selectedItem.media.type === "album" && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="absolute top-1/2 right-4 -translate-y-1/2 w-20 h-40 hover:text-gray-200 transition-colors z-10 cursor-pointer select-none" onClick={nextSlide}>
              <path fill="#848585" d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z"/>
            </svg>)}
          </div>
          <p className="text-xs line-clamp-2">{selectedItem.content.body}</p>
        </div>
      </div>}
      {/* Thêm padding để main content không bị che lấp bởi tab bar */}
      <div className="pb-16 sm:pb-0">
        {/* Content của tab bar hiển thị ở đây. */}
      </div>
    </div>
  )
}

export default Feed;