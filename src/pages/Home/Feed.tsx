import React from 'react';
import PhotoCard from '../../components/PhotoCard';


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
      "isLiked": false
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
      "isLiked": true
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
      "isLiked": true
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
      "isLiked": false
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
      "isLiked": true
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
      "isLiked": false
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
      "isLiked": true
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
      "isLiked": false
    },
    "metadata": {
      "created_at": "2018-04-09T08:00:00Z",
      "formatted_date": "8:00 am 09/04/2018"
    }
  }
];
const Feed = () => {
  // Page for the feed layout:
  // Header is here too, it will be split later for the layout.
  return (
    <div className=''>
      <header className="bg-blue h-15 flex items-center justify-between pl-[5%] pr-[5%]">
        <div className="text-3xl text-white text-right pr-4 md:w-[150px]">Fotobook</div>
        <div className='flex-1 md:max-w-[1200px] flex items-center justify-between'>
          <input type="text" name="" id="" placeholder='Search Photo/ Album' className="flex-1 bg-white px-6 py-3 rounded-md md:max-w-[650px] focus:outline-2 focus:outline-graywhite focus:border focus:border-black"/>
          <div className="flex flex-row items-center gap-2 justify-between">
            <img src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80' alt="anh avatar" className="w-12 aspect-square md:w-14 object-cover border-none cursor-pointer rounded-full"/>
            <p className="text-white text-xl font-semibold">Hieu Nguyen</p>
          </div>
        </div>
        <button className="text-center cursor-pointer font-bold text-white text-xl md:w-[150px]">Logout</button>
      </header>

      <div className="flex flex-row justify-between pt-5 pl-[5%] pr-[5%] h-[calc(100vh-60px)] bg-graywhite">
        <aside className="md:w-[150px]">
          <ul className="mt-5 flex flex-col items-start justify-start gap-2 w-full">
            <li className="font-semibold text-blue text-lg cursor-pointer">Feeds</li>
            <li className="font-semibold text-lg cursor-pointer">Discover</li>
          </ul>
        </aside>

        <div className="flex-1 bg-white md:max-w-[1200px] flex flex-col items-center">
          <div className="mt-5 mb-5 border border-blue rounded-lg">
            <button className="md:w-28 px-4 py-2 text-blue text-xl font-bold text-center cursor-pointer">PHOTO</button>
            <button className="md:w-28 px-4 py-2 text-white text-xl font-bold text-center bg-blue cursor-pointer">ALBUM</button>
          </div>
          <div className="flex-1 w-full grid md:grid-cols-2 gap-2.5">
            {
              MOCK_DATA.map((data) => {
                return (
                  <PhotoCard data={data}/>
                )
              })
            }
          </div>
        </div>

        <aside className="md:w-[150px] invisible">
          {/* Thẻ mẫu để chiếm chỗ đảm bảo cho main luôn chiếm chừng đấy */}
          Hello đi nhờ
        </aside>
      </div>      
    </div>
  )
}

export default Feed;