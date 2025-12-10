import React from 'react';

const sizeClasses = {
  sm: 'w-[18rem] h-[18rem]',
  md: 'w-[25rem] h-[25rem]',
  lg: 'w-[32rem] h-[32rem]',
};

export function InvertedCard({
  image,
  title,
  price,
  alt = '',
  size = 'md',
}) {
  return (
    <div className="relative">
      {/* Main Card */}
      <div
        className={`${sizeClasses[size]} rounded-[1.25rem] border-[0.5rem] border-[#4a4e69] overflow-hidden relative`}
      >
        <img src={image} alt={alt || title} className="w-full h-full object-cover" />
      </div>

      {/* Title Tag (Top Left) */}
      <div className="inverted-corner-top-left w-[12.5rem] h-[3.75rem] flex justify-center items-center absolute top-0 left-0 bg-[#22223b] border-b-[0.5rem] border-r-[0.5rem] border-[#4a4e69] rounded-br-[1rem] p-1.5">
        <p className="bg-[#4a4e69] text-white text-sm px-2.5 py-1.5 w-[95%] flex justify-center items-center gap-1.5 rounded-[0.3125rem]">
          <span className="font-semibold text-xl">{title}</span>
        </p>
      </div>
      <div className="inverted-corner-title-left-outer" />
      <div className="inverted-corner-title-left-inner" />

      {/* Price Tag (Bottom Right) */}
      <div className="inverted-corner-top-right w-[12.5rem] h-[3.75rem] flex justify-center items-center absolute right-0 bottom-0 bg-[#22223b] border-t-[0.5rem] border-l-[0.5rem] border-[#4a4e69] rounded-tl-[1rem] p-1.5">
        <p className="bg-[#4a4e69] text-white text-sm px-2.5 py-1.5 w-[95%] flex justify-center items-center gap-1.5 rounded-[0.3125rem]">
          <span className="font-semibold text-xl">{price}</span>
        </p>
      </div>
      <div className="inverted-corner-bottom-left-outer" />
      <div className="inverted-corner-bottom-left-inner" />
    </div>
  );
}

export default InvertedCard;