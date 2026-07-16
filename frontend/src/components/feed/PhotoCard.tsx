import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhotoModal from './PhotoModal';
import { twMerge } from 'tailwind-merge';
import { formatDate } from '../../utils/formatDate';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useFollow } from '../../hooks/useFollow';

const PhotoCard = ({ data }: any) => {
  const {
    id,
    author: { authorId, name, avatarUrl, isFollowing },
    content: { title, body },
    media: { type, image_stack },
    interactions: { likesCount, isLiked },
    metadata: { createdDate },
  } = data;

  // State để theo dõi các giá trị này và thực hiện chỉnh sửa.
  const [isStateFollowing, setIsStateFollowing] = useState(isFollowing ?? false);
  const [isStateLiked, setIsStateLiked] = useState(isLiked ?? false);
  const [likeCount, setLikeCount] = useState(likesCount);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const { toggleFollow } = useFollow();

  const navigate = useNavigate();

  const handleFollowClick = () => {
    toggleFollow(authorId, isStateFollowing);
    setIsStateFollowing(!isStateFollowing);
  };

  const handleLikedClick = () => {
    if (!user) {
      toast.error("Đăng nhập ngay để thả cảm xúc!");
      return;
    }
    setLikeCount((prev) => (isStateLiked ? prev - 1 : prev + 1));
    setIsStateLiked(!isStateLiked);
  };

  const handleProfileClick = () => {
    navigate(`/profile/${authorId}`);
  };

  const handleLike = () => {
    if (!isStateLiked) {
      handleLikedClick();
    }
  }
  return (
    <div className="flex flex-col sm:flex-row items-center w-full mx-auto md:h-[300px] p-2 md:p-2.5 bg-graywhite shadow-xs transition duration-300 ease-in-out gap-2.5">
      <div
        className="group flex-1 max-h-[300px] md:h-full m-1.5 sm:m-2 relative cursor-pointer w-40 sm:w-60"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Render các ảnh */}
        {type === 'album' ? (
          // Nếu là album thì chỉ render 3 ảnh đầu tiên.
          image_stack.slice(0, 3).map((img) => {
            return (
              <img
                key={img.order}
                src={
                  img.url ||
                  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80'
                }
                alt={img.alt_text}
                className={twMerge('w-40 sm:w-60 mx-auto aspect-square object-cover border-4 border-white shadow-md', img.order === 1 && 'relative z-3 group-hover:-translate-y-2', img.order === 2 && 'absolute z-2 left-0 right-0 mx-auto w-fit top-[2px] sm:top-[5px] text-center -rotate-[4deg] group-hover:-translate-y-6 group-hover:-translate-x-4', img.order > 2 && 'absolute z-1 left-0 right-0 mx-auto w-fit -top-[2px] rotate-[5deg] group-hover:-translate-y-8 group-hover:translate-x-4')}
              ></img>
            );
          }) // Nếu là ảnh thì render kiểu khác
        ) : (
          <img
            src={
              image_stack[0].url ||
              'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80'
            }
            alt={image_stack[0].alt_text}
            className="relative w-full h-full mx-auto aspect-square object-cover hover:scale-105"
          />
        )}
      </div>
      {/* Phần chứa các thông tin của ảnh */}
      <div className="flex-1 flex flex-col shrink-0 w-full h-full">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={handleProfileClick}>
            <img
              src={
                avatarUrl ||
                'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80'
              }
              alt="ảnh avatar"
              className="w-8 sm:w-9 md:w-10 aspect-square rounded-full object-cover border-none"
            />
            <p className="text-sm sm:text-base text-blue font-semibold line-clamp-1">{name}</p>
          </div>
          {user && (isStateFollowing ? (
            <div
              className="px-1.5 py-1.5 sm:px-2 sm:py-2 rounded-full font-semibold text-white text-xs bg-orange cursor-pointer select-none"
              onClick={handleFollowClick}
            >
              Following
            </div>
          ) : (
            <div
              className="px-1.5 py-1.5 sm:px-2 sm:py-2 rounded-full font-semibold text-orange bg-white text-xs border border-orange cursor-pointer select-none"
              onClick={handleFollowClick}
            >
              Follow
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-2 flex-start overflow-hidden">
          <h1 className="text-sm font-semibold sm:text-lg">{title}</h1>
          <p className="text-xs sm:text-sm overflow-hidden line-clamp-2 sm:line-clamp-6">{body}</p>
        </div>
        <div className="flex items-center justify-between">
          <div
            className="flex justify-start items-center cursor-pointer"
            onClick={handleLikedClick}
          >
            {isStateLiked ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                className="w-4 h-4 sm:w-6 sm:h-6 text-blue"
              >
                <path
                  fill="#3c5a9a"
                  d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                className="w-4 h-4 sm:w-6 sm:h-6 text-blue"
              >
                <path
                  fill="#3c5a9a"
                  d="M442.9 144C415.6 144 389.9 157.1 373.9 179.2L339.5 226.8C335 233 327.8 236.7 320.1 236.7C312.4 236.7 305.2 233 300.7 226.8L266.3 179.2C250.3 157.1 224.6 144 197.3 144C150.3 144 112.2 182.1 112.2 229.1C112.2 279 144.2 327.5 180.3 371.4C221.4 421.4 271.7 465.4 306.2 491.7C309.4 494.1 314.1 495.9 320.2 495.9C326.3 495.9 331 494.1 334.2 491.7C368.7 465.4 419 421.3 460.1 371.4C496.3 327.5 528.2 279 528.2 229.1C528.2 182.1 490.1 144 443.1 144zM335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1C576 297.7 533.1 358 496.9 401.9C452.8 455.5 399.6 502 363.1 529.8C350.8 539.2 335.6 543.9 320 543.9C304.4 543.9 289.2 539.2 276.9 529.8C240.4 502 187.2 455.5 143.1 402C106.9 358.1 64 297.7 64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1L320 171.8L335 151.1z"
                />
              </svg>
            )}
            <p className="text-xs sm:text-base text-blue ml-1">{likeCount}</p>
          </div>
          <p className="text-xs opacity-80">{formatDate(createdDate)}</p>
        </div>
      </div>

      {/* Render modal hiển thị chi tiết ảnh */}
      {isModalOpen && (
        <PhotoModal data={data} handleModalClose={() => setIsModalOpen(false)} handleLike={handleLike} />
      )}
    </div>
  );
};

export default PhotoCard;
