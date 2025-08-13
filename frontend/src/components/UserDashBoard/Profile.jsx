import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Camera,
  Shield, ShieldCheck, Star, Home, Building, Eye, EyeOff,
  Settings, Settings2, Bell, Lock, CreditCard, FileText, Award,
  Heart, MessageSquare, Clock, CheckCircle, Users, DollarSign
} from 'lucide-react';

const Profile = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [showPassword, setShowPassword] = useState(false);

  const [profileData, setProfileData] = useState(null);
  const [tempData, setTempData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // assuming token is stored as 'token'
        const res = await axios.get(
          `http://localhost:5001/api/user/profile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setProfileData(res.data);
        setTempData(res.data);
        console.log("response data",res.data)
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);


  const handleEdit = () => {
    setIsEditing(true);
    setTempData({ ...profileData });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5001/api/user/profile/${id}`, tempData);
      setProfileData(tempData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (section, field, value) => {
    setTempData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'address', label: 'Address', icon: MapPin },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'account', label: 'Account', icon: Shield }
  ];

  if (loading) return <p>Loading profile...</p>;
  if (!profileData) return <p>No profile data found.</p>;

  const data = isEditing ? tempData : profileData;
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1E1E2F] to-[#00C49A] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Profile</h1>
          <p className="text-white/80">Manage your personal information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#2B2B40] rounded-lg p-6 sticky top-8">
              {/* Profile Image */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={data?.personal?.profileImage || "https://via.placeholder.com/150?text=No+Image"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-[#00C49A]"
                  />

                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-[#00C49A] p-2 rounded-full hover:bg-[#00b388]">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <h3 className="font-semibold text-lg mt-3">
                  {data.personal.firstName} {data.personal.lastName}
                </h3>
                <p className="text-sm text-white/60">{data.personal.occupation}</p>
                {data.account.verified && (
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <ShieldCheck className="w-4 h-4 text-[#00C49A]" />
                    <span className="text-xs text-[#00C49A]">Verified User</span>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-[#1E1E2F] rounded-lg">
                  <p className="text-2xl font-bold text-[#00C49A]">{data.account.totalListings}</p>
                  <p className="text-xs text-white/60">Listings</p>
                </div>
                <div className="text-center p-3 bg-[#1E1E2F] rounded-lg">
                  <p className="text-2xl font-bold text-[#00C49A]">{data.account.rating}</p>
                  <p className="text-xs text-white/60">Rating</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${activeTab === tab.id
                          ? 'bg-[#00C49A] text-white'
                          : 'hover:bg-[#1E1E2F] text-white/80'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-[#2B2B40] rounded-lg p-6">
              {/* Header with Edit Button */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </h2>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-[#00C49A] hover:bg-[#00b388] px-4 py-2 rounded-lg font-medium"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg font-medium"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleEdit}
                      className="flex items-center gap-2 bg-[#00C49A] hover:bg-[#00b388] px-4 py-2 rounded-lg font-medium"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                  )}
                </div>
              </div>

              {/* Content based on active tab */}
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={data.personal.firstName}
                          onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        />
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg">{data.personal.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={data.personal.lastName}
                          onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        />
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg">{data.personal.lastName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={data.personal.email}
                          onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        />
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg flex items-center gap-2">
                          <Mail className="w-4 h-4 text-[#00C49A]" />
                          {data.personal.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={data.personal.phone}
                          onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        />
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg flex items-center gap-2">
                          <Phone className="w-4 h-4 text-[#00C49A]" />
                          {data.personal.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Date of Birth</label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={data.personal.dateOfBirth}
                          onChange={(e) => handleInputChange('personal', 'dateOfBirth', e.target.value)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        />
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#00C49A]" />
                          {new Date(data.personal.dateOfBirth).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Gender</label>
                      {isEditing ? (
                        <select
                          value={data.personal.gender}
                          onChange={(e) => handleInputChange('personal', 'gender', e.target.value)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg">{data.personal.gender}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Occupation</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={data.personal.occupation}
                        onChange={(e) => handleInputChange('personal', 'occupation', e.target.value)}
                        className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                      />
                    ) : (
                      <p className="p-3 bg-[#1E1E2F] rounded-lg">{data.personal.occupation}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Bio</label>
                    {isEditing ? (
                      <textarea
                        value={data.personal.bio}
                        onChange={(e) => handleInputChange('personal', 'bio', e.target.value)}
                        rows="4"
                        className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none resize-none"
                      />
                    ) : (
                      <p className="p-3 bg-[#1E1E2F] rounded-lg">{data.personal.bio}</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'address' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Street Address</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={data.address.street}
                          onChange={(e) => handleInputChange('address', 'street', e.target.value)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        />
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg">{data.address.street}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Area</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={data.address.area}
                          onChange={(e) => handleInputChange('address', 'area', e.target.value)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        />
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg">{data.address.area}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">City</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={data.address.city}
                          onChange={(e) => handleInputChange('address', 'city', e.target.value)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        />
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg">{data.address.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">State</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={data.address.state}
                          onChange={(e) => handleInputChange('address', 'state', e.target.value)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        />
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg">{data.address.state}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Pincode</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={data.address.pincode}
                          onChange={(e) => handleInputChange('address', 'pincode', e.target.value)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        />
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg">{data.address.pincode}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Property Types</label>
                    {isEditing ? (
                      <div className="flex flex-wrap gap-2">
                        {propertyTypes.map(type => (
                          <button
                            key={type}
                            onClick={() => {
                              const currentTypes = data.preferences.propertyTypes;
                              const newTypes = currentTypes.includes(type)
                                ? currentTypes.filter(t => t !== type)
                                : [...currentTypes, type];
                              handleInputChange('preferences', 'propertyTypes', newTypes);
                            }}
                            className={`px-3 py-2 rounded-lg text-sm font-medium ${data.preferences.propertyTypes.includes(type)
                                ? 'bg-[#00C49A] text-white'
                                : 'bg-[#1E1E2F] text-white/80 hover:bg-[#00C49A]/20'
                              }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {data.preferences.propertyTypes.map(type => (
                          <span key={type} className="px-3 py-2 bg-[#00C49A] rounded-lg text-sm">
                            {type}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Budget Range (Min)</label>
                      {isEditing ? (
                        <input
                          type="number"
                          value={data.preferences.budgetMin}
                          onChange={(e) => handleInputChange('preferences', 'budgetMin', parseInt(e.target.value) || 0)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        />
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg">₹{data.preferences.budgetMin.toLocaleString()}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Budget Range (Max)</label>
                      {isEditing ? (
                        <input
                          type="number"
                          value={data.preferences.budgetMax}
                          onChange={(e) => handleInputChange('preferences', 'budgetMax', parseInt(e.target.value) || 0)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        />
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg">₹{data.preferences.budgetMax.toLocaleString()}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Amenities</label>
                    {isEditing ? (
                      <div className="flex flex-wrap gap-2">
                        {amenitiesList.map(amenity => (
                          <button
                            key={amenity}
                            onClick={() => {
                              const currentAmenities = data.preferences.amenities;
                              const newAmenities = currentAmenities.includes(amenity)
                                ? currentAmenities.filter(a => a !== amenity)
                                : [...currentAmenities, amenity];
                              handleInputChange('preferences', 'amenities', newAmenities);
                            }}
                            className={`px-3 py-2 rounded-lg text-sm font-medium ${data.preferences.amenities.includes(amenity)
                                ? 'bg-[#00C49A] text-white'
                                : 'bg-[#1E1E2F] text-white/80 hover:bg-[#00C49A]/20'
                              }`}
                          >
                            {amenity}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {data.preferences.amenities.map(amenity => (
                          <span key={amenity} className="px-3 py-2 bg-[#1E1E2F] rounded-lg text-sm">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Gender Preference</label>
                      {isEditing ? (
                        <select
                          value={data.preferences.gender}
                          onChange={(e) => handleInputChange('preferences', 'gender', e.target.value)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        >
                          <option value="Any">Any</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg">{data.preferences.gender}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Food Preference</label>
                      {isEditing ? (
                        <select
                          value={data.preferences.foodPreference}
                          onChange={(e) => handleInputChange('preferences', 'foodPreference', e.target.value)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        >
                          <option value="Vegetarian">Vegetarian</option>
                          <option value="Non-Vegetarian">Non-Vegetarian</option>
                          <option value="Vegan">Vegan</option>
                          <option value="Any">Any</option>
                        </select>
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg">{data.preferences.foodPreference}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'account' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-[#1E1E2F] rounded-lg">
                      <Calendar className="w-8 h-8 text-[#00C49A] mx-auto mb-2" />
                      <p className="text-2xl font-bold">{new Date(data.account.memberSince).getFullYear()}</p>
                      <p className="text-sm text-white/60">Member Since</p>
                    </div>
                    <div className="text-center p-4 bg-[#1E1E2F] rounded-lg">
                      <Building className="w-8 h-8 text-[#00C49A] mx-auto mb-2" />
                      <p className="text-2xl font-bold">{data.account.totalListings}</p>
                      <p className="text-sm text-white/60">Total Listings</p>
                    </div>
                    <div className="text-center p-4 bg-[#1E1E2F] rounded-lg">
                      <Home className="w-8 h-8 text-[#00C49A] mx-auto mb-2" />
                      <p className="text-2xl font-bold">{data.account.totalBookings}</p>
                      <p className="text-sm text-white/60">Bookings</p>
                    </div>
                    <div className="text-center p-4 bg-[#1E1E2F] rounded-lg">
                      <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <p className="text-2xl font-bold">{data.account.rating}</p>
                      <p className="text-sm text-white/60">Rating</p>
                    </div>
                  </div>

                  <div className="bg-[#1E1E2F] rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Account Status</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <ShieldCheck className="w-5 h-5 text-[#00C49A]" />
                          <span>Email Verified</span>
                        </div>
                        <CheckCircle className="w-5 h-5 text-[#00C49A]" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-[#00C49A]" />
                          <span>Phone Verified</span>
                        </div>
                        <CheckCircle className="w-5 h-5 text-[#00C49A]" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-[#00C49A]" />
                          <span>Document Verified</span>
                        </div>
                        <CheckCircle className="w-5 h-5 text-[#00C49A]" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1E1E2F] rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-[#2B2B40] rounded-lg">
                        <MessageSquare className="w-5 h-5 text-[#00C49A]" />
                        <div>
                          <p className="text-sm">Received a new message from property owner</p>
                          <p className="text-xs text-white/60">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-[#2B2B40] rounded-lg">
                        <Home className="w-5 h-5 text-purple-400" />
                        <div>
                          <p className="text-sm">Updated listing: "Cozy PG near Technopark"</p>
                          <p className="text-xs text-white/60">1 day ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-[#2B2B40] rounded-lg">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <div>
                          <p className="text-sm">Received a 5-star review</p>
                          <p className="text-xs text-white/60">3 days ago</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Account Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="flex items-center gap-3 p-4 bg-[#1E1E2F] hover:bg-[#00C49A]/20 rounded-lg transition-colors">
                      <Lock className="w-5 h-5 text-[#00C49A]" />
                      <div className="text-left">
                        <p className="font-medium">Change Password</p>
                        <p className="text-xs text-white/60">Update your account password</p>
                      </div>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-[#1E1E2F] hover:bg-[#00C49A]/20 rounded-lg transition-colors">
                      <Bell className="w-5 h-5 text-[#00C49A]" />
                      <div className="text-left">
                        <p className="font-medium">Notification Settings</p>
                        <p className="text-xs text-white/60">Manage your notifications</p>
                      </div>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-[#1E1E2F] hover:bg-[#00C49A]/20 rounded-lg transition-colors">
                      <CreditCard className="w-5 h-5 text-[#00C49A]" />
                      <div className="text-left">
                        <p className="font-medium">Payment Methods</p>
                        <p className="text-xs text-white/60">Manage payment options</p>
                      </div>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-[#1E1E2F] hover:bg-[#00C49A]/20 rounded-lg transition-colors">
                      <FileText className="w-5 h-5 text-[#00C49A]" />
                      <div className="text-left">
                        <p className="font-medium">Download Data</p>
                        <p className="text-xs text-white/60">Export your account data</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;