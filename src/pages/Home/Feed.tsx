import React from 'react';


const MOCK_DATA = [
  {
    "id": "post_982374",
    "author": {
      "id": "user_012",
      "name": "Hieu Nguyen",
      "avatar_initials": "HN",
      "avatar_url": "https://example.com/avatars/hieu-nguyen.jpg",
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
          "url": "https://example.com/photos/hieu-1.jpg",
          "alt_text": "Chân dung nam đeo kính"
        },
        {
          "order": 2,
          "url": "https://example.com/photos/hieu-2.jpg",
          "alt_text": "Phong cảnh mùa thu"
        },
        {
          "order": 3,
          "url": "https://example.com/photos/hieu-3.jpg",
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
      "avatar_url": "https://example.com/avatars/anna-tran.jpg",
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
          "url": "https://example.com/photos/anna-leaf.jpg",
          "alt_text": "Cô gái với chiếc lá che nửa mặt"
        },
        {
          "order": 2,
          "url": "https://example.com/photos/nature-1.jpg",
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
      "avatar_url": "https://example.com/avatars/sarah-connor.jpg",
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
          "url": "https://example.com/photos/sarah-crown.jpg",
          "alt_text": "Cô gái đội vòng hoa"
        },
        {
          "order": 2,
          "url": "https://example.com/photos/friends.jpg",
          "alt_text": "Nhóm bạn bè vui vẻ"
        },
        {
          "order": 3,
          "url": "https://example.com/photos/party.jpg",
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
      "avatar_url": "https://example.com/avatars/minh-le.jpg",
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
          "url": "https://example.com/photos/city-girl.jpg",
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
      "avatar_url": "https://example.com/avatars/hoang-vu.jpg",
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
          "url": "https://example.com/photos/dog-1.jpg",
          "alt_text": "Chó Golden Retriever"
        },
        {
          "order": 2,
          "url": "https://example.com/photos/dog-park.jpg",
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
      "avatar_url": "https://example.com/avatars/linh-pham.jpg",
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
          "url": "https://example.com/photos/photobook.jpg",
          "alt_text": "Sách ảnh đặt trên bàn gỗ"
        },
        {
          "order": 2,
          "url": "https://example.com/photos/coffee-cup.jpg",
          "alt_text": "Tách cà phê"
        },
        {
          "order": 3,
          "url": "https://example.com/photos/glasses.jpg",
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
          "url": "https://example.com/photos/architecture.jpg",
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
      "avatar_url": "https://example.com/avatars/elena-smith.jpg",
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
          "url": "https://example.com/photos/food-1.jpg",
          "alt_text": "Món tráng miệng đẹp mắt"
        },
        {
          "order": 2,
          "url": "https://example.com/photos/food-2.jpg",
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
    <>
      <header>
        <div>Fotobook</div>
        <input type="text" name="" id="" placeholder='Search Photo/ Album' />
        <div>
          <img></img>
          <p>Hieu Nguyen</p>
        </div>
        <div>Logout</div>
      </header>

      <div>
        <aside>
          <ul>
            <li>Feeds</li>
            <li>Discover</li>
          </ul>
        </aside>

        <div>
          <div>
            <button>PHOTO</button>
            <button>ALBUM</button>
          </div>
        </div>

        <aside>
          {/* Thẻ mẫu để chiếm chỗ đảm bảo cho main luôn chiếm chừng đấy */}
        </aside>
      </div>      
    </>
  )
}

export default Feed;