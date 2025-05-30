import React, { useState, useEffect } from 'react';
import DemoListing from './demolisting';
import { Save, Hotel, Star, StarHalf } from "lucide-react";

const ViewRooms = () => {
  const [listing, setListing] = useState([]);

  const getStars = (rating, count) => {
    // return <p> {rating}({count} Reviews)</p>
    const fullStars = Math.floor(rating);
    const halfStars = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStars ? 1 : 0);
    return (
      <div className="flex items-center space-x-1">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} size={16} className="text-yellow-500 fill-yellow-500" />
        ))}

        {halfStars && (
          <StarHalf size={16} className="text-yellow-500 fill-yellow-500" />
        )}

        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} size={16} className="text-gray-400" />
        ))}

        <span className="ml-2 text-sm text-white">{rating.toFixed(1)} ({count} reviews)</span>
      </div>
    );
  };

  useEffect(() => {
    setListing(DemoListing);
  }, []);

  return (
    <div className="flex-1 h-screen overflow-y-auto md:ml-15 ">
      <div className="flex flex-wrap gap-4 p-4">
        {listing.map((list, index) => (
          <div
            key={index}
            className="w-128 rounded border border-[#B388EB] border-opacity-50 bg-gradient-to-br from-[#1E1E2F]/90 to-[#1E1E2F]/70 backdrop-blur-sm shadow-lg p-4 overflow-hidden"
          >
            <div className="p-6 flex flex-col h-full">
              <div className="text-center mb-6">
                <h3 className="text-2xl md:text-2xl font-bold text-[#B388EB] mb-2">{list.title}</h3>
              </div>

              <div className="relative mb-6 overflow-hidden rounded-xl h-94 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E2F]/80 via-transparent to-[#1E1E2F]/40 z-10"></div>
                <img
                  src={list.images}
                  alt="EasyStay Accommodations"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
                  <p className="text-[#FAFAFA] text-base font-semibold">
                    {list.location.city} {", "} {list.location.area}
                  </p>
                </div>
              </div>

            <div className="grid grid-cols-2 gap-4 mt-auto">
            <div className="w-full p-2 rounded col-span-2">
                <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between md:items-center text-sm text-[#fafafa]">
                <span className="font-extrabold text-2xl  md:font-bold ">₹ {list.monthly_rent}/mo</span>
                {getStars(list.reviews.rating, list.reviews.count)}
                </div>
            </div>
                <div className="bg-gradient-to-r from-[#1E1E2F]/70 to-[#1E1E2F]/50 border-2 border-[#00C49A] p-3 rounded-lg flex items-center">
                  <Save className="text-[#00C49A] mr-2" size={18} />
                  <span className="text-[#FAFAFA] text-sm">Save</span>
                </div>
                <div className="bg-gradient-to-r from-[#1E1E2F]/70 to-[#1E1E2F]/50 border-2 border-[#00C49A] p-3 rounded-lg flex items-center">
                  <Hotel className="text-[#00C49A] mr-2" size={18} />
                  <span className="text-[#FAFAFA] text-sm">View More Details</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewRooms;