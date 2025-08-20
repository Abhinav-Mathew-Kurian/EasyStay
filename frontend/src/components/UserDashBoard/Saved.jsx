import React, { useState, useEffect } from "react";
import { Save, Hotel, Star, StarHalf, Heart, Trash2, MapPin } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Saved = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ get userId from route params
  const [savedRooms, setSavedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Navigate to details page
  const handleViewMore = (roomId) => {
    navigate(`/${id}/dashboard/view-details/${roomId}`); // ✅ dynamic user id
  };

  // Remove from saved (calls backend)
  const handleRemoveSaved = async (roomId) => {
    try {
      await axios.delete(`http://localhost:5001/api/user/save/${id}`, {
        data: { listingId: roomId },
      });
      setSavedRooms((prev) => prev.filter((room) => room._id !== roomId));
    } catch (error) {
      console.error("Error removing saved listing:", error);
    }
  };

  // Render stars
  const getStars = (rating, count) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStars ? 1 : 0);
    return (
      <div className="flex items-center space-x-1 mt-2">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} size={16} className="text-yellow-400 fill-yellow-400" />
        ))}
        {halfStars && <StarHalf size={16} className="text-yellow-400 fill-yellow-400" />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} size={16} className="text-gray-500" />
        ))}
        <span className="ml-2 text-sm text-gray-300 font-medium">
          {rating?.toFixed(1)} ({count})
        </span>
      </div>
    );
  };

  const handleBrowseRooms = () => {
    navigate(`/${id}/dashboard`);
  };

  // Fetch saved rooms from API
  useEffect(() => {
    const fetchSavedRooms = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5001/api/user/save/${id}`);
        setSavedRooms(res.data.savedListings || []);
      } catch (error) {
        console.error("Error fetching saved listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedRooms();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-lg">
        Loading saved rooms...
      </div>
    );
  }

  if (savedRooms.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <div className="text-center max-w-md">
              <div className="mb-8">
                <div className="relative">
                  <Heart size={120} className="text-purple-400/30 mx-auto" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Heart size={60} className="text-purple-400/60" />
                  </div>
                </div>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                No Saved Rooms Yet
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Discover amazing accommodations and save your favorites to see them here
              </p>
              <button
                onClick={handleBrowseRooms}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold px-8 py-4 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
              >
                Browse Rooms
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1E1E2F] to-[#00C49A]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-[#00C49A] bg-clip-text text-transparent mb-3">
              Saved Rooms
            </h1>
            <p className="text-gray-300 text-lg">
              Your favorite accommodations • {savedRooms.length} saved
            </p>
          </div>
          <div className="hidden sm:block">
            <Heart size={48} className="text-purple-400/50" />
          </div>
        </div>

        {/* Saved Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {savedRooms.map((room) => (
            <div
              key={room._id}
              className="group relative bg-gradient-to-br from-[#1E1E2F]/90 to-[#1E1E2F]/70 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 shadow-2xl hover:shadow-purple-500/20 transform hover:-translate-y-2 transition-all duration-500 ease-out"
            >
              {/* Saved Heart Icon */}
              <div className="absolute top-4 right-4 z-30">
                <div className="bg-white/20 backdrop-blur-md rounded-full p-2">
                  <Heart size={20} className="text-red-400 fill-red-400 drop-shadow-lg" />
                </div>
              </div>

              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                <img
                  src={room.images?.[0] || "/placeholder.jpg"}
                  alt={room.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Location Badge */}
                <div className="absolute bottom-4 left-4 z-20">
                  <div className="bg-black/40 backdrop-blur-md rounded-full px-3 py-1 flex items-center space-x-2">
                    <MapPin size={14} className="text-emerald-400" />
                    <span className="text-white text-sm font-medium">{room.location?.city}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{room.title}</h3>
                <p className="text-gray-300 text-sm mb-4">
                  {room.location?.area}, {room.location?.city}
                </p>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-2xl font-bold text-emerald-400">
                    ₹{room.monthly_rent?.toLocaleString()}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">/month</span>
                </div>

                {/* Rating */}
                {room.reviews && getStars(room.reviews.rating, room.reviews.count)}

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => handleRemoveSaved(room._id)}
                    className="flex-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 hover:border-red-500/70 text-red-400 hover:text-red-300 py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 font-medium text-sm"
                  >
                    <Trash2 size={16} />
                    <span>Remove</span>
                  </button>

                  <button
                    onClick={() => handleViewMore(room._id)}
                    className="flex-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-500/50 hover:border-emerald-500/70 text-emerald-400 hover:text-emerald-300 py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 font-medium text-sm"
                  >
                    <Hotel size={16} />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default Saved;
