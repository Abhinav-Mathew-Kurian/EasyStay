import React, { useEffect, useState } from 'react';
import DemoListing from './demolisting';
import { useParams } from 'react-router-dom';
import { MapPin, Users, Star, Phone, User, CheckCircle, Calendar, Home,Shield, ShieldCheck, Wifi, Car, Coffee, Utensils, Fan, Table, ChevronsUp, Clock, MessageCircle } from 'lucide-react';

const ViewDetails = () => {
  const [listing, setListing] = useState([]);
  const { roomId } = useParams();

  useEffect(() => {
    setListing(DemoListing);
  }, []);

  const filteredListing = listing.filter(item => item.id === roomId);

  const getAmenityIcon = (amenity) => {
    const iconMap = {
      'WiFi': Wifi,
      'AC': Fan,
      'Laundry': Coffee,
      'Meals Included': Utensils,
      'Parking': Car,
      'Lift': ChevronsUp,
      'Security': ShieldCheck,
      'Fan': Fan,
      'Table': Table,
    };
    return iconMap[amenity] || Home;
  };

  return (
  <div className="min-h-screen bg-gray-50">
    {filteredListing.map((list, index) => (
      <div key={index} className="pb-20">
        {/* Hero */}
        <div className="relative h-[400px] overflow-hidden">
          <img
            src={list.images[0]}
            alt={list.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/10"></div>

          {/* Availability */}
          <div className="absolute top-6 left-6">
            {list.availability.is_available ? (
              <span className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow">
                <CheckCircle className="w-4 h-4" /> Available Now
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow">
                <Clock className="w-4 h-4" /> Available from{' '}
                {new Date(list.availability.available_from).toLocaleDateString()}
              </span>
            )}
          </div>

          {/* Title */}
          <div className="absolute bottom-10 left-10 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{list.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-base">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">{list.type}</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {list.location.area}, {list.location.city}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="space-y-8 lg:col-span-2">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Users,
                  label: 'Occupancy',
                  value: `${list.current_occupants}/${list.shared_with}`,
                  color: 'bg-blue-100 text-blue-600'
                },
                {
                  icon: Star,
                  label: 'Rating',
                  value: `${list.reviews.rating}/5`,
                  color: 'bg-yellow-100 text-yellow-600'
                },
                {
                  icon: Home,
                  label: 'Type',
                  value: list.type,
                  color: 'bg-green-100 text-green-600'
                }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border shadow-sm flex gap-4 items-center">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-lg font-semibold">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Occupancy */}
            <div className="bg-white rounded-xl p-6 border shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" /> Occupancy Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Allowed</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {list.occupancy.allowed.map((a, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">{a}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender Preference</p>
                    <p className="font-medium">{list.occupancy.gender}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-gray-500">Shared With</p>
                  <p className="font-medium">{list.shared_with} people</p>
                  <p className="text-sm text-gray-500">Current Occupants</p>
                  <p className="font-medium">{list.current_occupants} people</p>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl p-6 border shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {list.amenities.map((amenity, i) => {
                  const Icon = getAmenityIcon(amenity);
                  return (
                    <div key={i} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                      <Icon className="w-5 h-5 text-green-600" />
                      <span className="text-green-700">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Restrictions */}
            <div className="bg-white rounded-xl p-6 border shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Restrictions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {list.restrictions.map((restriction, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                    <Shield className="w-5 h-5 text-red-600" />
                    <span className="text-red-700">{restriction}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-6 rounded-xl shadow">
              <p className="text-sm opacity-80 mb-1">Monthly Rent</p>
              <p className="text-3xl font-bold">₹{list.monthly_rent.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl p-6 border shadow-sm">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5" /> Owner Details
              </h4>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-semibold">{list.owner.name}</p>
                  <p className="text-sm text-gray-500">Property Owner</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg mb-4">
                <Phone className="w-5 h-5 text-gray-600" />
                <span>{list.owner.contact}</span>
              </div>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" /> Message Owner
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

};

export default ViewDetails;
