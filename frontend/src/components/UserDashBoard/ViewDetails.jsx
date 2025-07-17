import React, { useEffect, useState } from 'react';
import DemoListing from './demolisting';
import { useParams } from 'react-router-dom';
import {
  MapPin, Users, Star, Phone, User, CheckCircle, Clock,
  Shield, ShieldCheck, Wifi, Car, Coffee, Utensils, Fan, Table,
  ChevronsUp, MessageCircle, Home, Calendar
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

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

  const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1E1E2F] to-[#00C49A] overflow-hidden text-white">
      {filteredListing.map((list, index) => (
        <div key={index} className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">

          {/* Hero */}
          <div className="relative h-[300px] md:h-[450px] rounded-xl overflow-hidden shadow-lg">
            <img src={list.images[0]} alt={list.title} className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute top-4 left-4">
              {list.availability.is_available ? (
                <span className="inline-flex items-center gap-1 bg-[#00C49A]/90 px-3 py-1 rounded-full text-xs font-medium">
                  <CheckCircle className="w-4 h-4" /> Available Now
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 bg-purple-600/80 px-3 py-1 rounded-full text-xs font-medium">
                  <Clock className="w-4 h-4" /> Available from {new Date(list.availability.available_from).toLocaleDateString()}
                </span>
              )}
            </div>
            <div className="absolute bottom-6 left-6">
              <h1 className="text-2xl md:text-4xl font-bold">{list.title}</h1>
              <div className="flex gap-2 flex-wrap mt-1 text-sm text-white/90">
                <span className="bg-[#00C49A]/80 px-2 py-0.5 rounded-full">{list.type}</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {list.location.area}, {list.location.city}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="space-y-6 lg:col-span-2">

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: Users, label: 'Occupancy', value: `${list.current_occupants}/${list.shared_with}` },
                  { icon: Star, label: 'Rating', value: `${list.reviews.rating}/5` },
                  { icon: Home, label: 'Type', value: list.type },
                ].map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-lg bg-[#2B2B40]">
                    <stat.icon className="w-6 h-6 text-[#00C49A]" />
                    <div>
                      <p className="text-xs uppercase opacity-60">{stat.label}</p>
                      <p className="text-lg font-semibold">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
                 {/* Description */}
              <div className="bg-[#2B2B40] rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-sm opacity-90">{list.description}</p>
              </div>
              {/* Allowed & Gender */}
              <div className="bg-[#2B2B40] rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-3">Occupancy Details</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm opacity-70">Allowed:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {list.occupancy.allowed.map((a, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-full bg-[#00C49A] text-white text-xs"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm opacity-70">Gender Preference:</p>
                    <p className="font-medium">{list.occupancy.gender}</p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-[#2B2B40] rounded-lg p-5">
                <h3 className="text-lg font-semibold">Address</h3>
                <p className="text-sm opacity-80">{list.location.area}, {list.location.city}, {list.state} - {list.pincode}</p>
              </div>

              {/* Location Map */}
              <div className="bg-[#2B2B40] rounded-lg p-5 space-y-3">
                <h3 className="text-lg font-semibold">Location Map</h3>
                <MapContainer
                  center={[list.location.latitude, list.location.longitude]}
                  zoom={15}
                  scrollWheelZoom={false}
                  className="h-[300px] rounded-lg z-0"
                >
                  <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[list.location.latitude, list.location.longitude]} icon={customIcon}>
                    <Popup>{list.title}<br />{list.location.area}, {list.location.city}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Container 1: Rent + Owner + Actions */}
              <div className="space-y-4">
                <div className="bg-purple-600 p-5 rounded-lg">
                  <p className="text-sm opacity-80">Monthly Rent</p>
                  <p className="text-3xl font-bold">₹{list.monthly_rent.toLocaleString()}</p>
                </div>
                <div className="bg-[#2B2B40] rounded-lg p-5 space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <User className="w-5 h-5" /> Owner Details
                    </h4>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#00C49A]/30 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-[#00C49A]" />
                      </div>
                      <div>
                        <p className="font-semibold">{list.owner.name}</p>
                        <p className="text-xs opacity-60">Property Owner</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-[#00C49A]/10 rounded mt-3">
                      <Phone className="w-4 h-4 text-[#00C49A]" />
                      <span className="text-sm">{list.owner.contact}</span>
                    </div>
                  </div>
                  <button className="w-full bg-[#00C49A] hover:bg-[#00b388] text-white py-2 rounded-lg flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" /> Message Owner
                  </button>
                  <button className="w-full bg-[#00C49A] hover:bg-[#00b388] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5" /> Schedule Visit
                  </button>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" /> Book Property
                  </button>
                </div>
              </div>

              {/* Container 2: Amenities + Restrictions */}
              <div className="bg-[#2B2B40] rounded-lg p-5 space-y-5">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Amenities</h3>
                  <div className="flex flex-col gap-2">
                    {list.amenities.map((amenity, i) => {
                      const Icon = getAmenityIcon(amenity);
                      return (
                        <div key={i} className="flex items-center gap-2 p-2 bg-[#00C49A]/10 rounded">
                          <Icon className="w-5 h-5 text-[#00C49A]" />
                          <span className="text-sm">{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Restrictions</h3>
                  <div className="flex flex-col gap-2">
                    {list.restrictions.map((restriction, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-purple-600/20 rounded">
                        <Shield className="w-5 h-5 text-purple-400" />
                        <span className="text-sm">{restriction}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewDetails;
