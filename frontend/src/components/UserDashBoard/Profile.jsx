import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Camera,
  Shield, ShieldCheck, Star, Home, Building, Eye, EyeOff,
  CheckCircle, Upload
} from 'lucide-react';
import  axios from 'axios'
import Swal from 'sweetalert2';
const Profile = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [profileData, setProfileData] = useState(null);
  const [tempData, setTempData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);


 useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const res = await axios.get(`http://localhost:5001/api/user/profile/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log("Fetched profile data:", res.data);
      
      
      const userData = res.data.data || res.data;
      
      setProfileData(userData);
      setTempData(userData);
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, [id]);

const handleImageUpload = async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  // Show preview immediately
  const previewUrl = URL.createObjectURL(file);
  setTempData((prev) => ({
    ...prev,
    profileImage: previewUrl,
  }));

  setImageUploading(true);

  const formData = new FormData();
  formData.append("profileImage", file);

  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `http://localhost:5001/api/user/profile/${id}/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Update BOTH tempData and profileData with the real Cloudinary URL
    const newImageUrl = res.data.data.profileImage;
    setTempData((prev) => ({
      ...prev,
      profileImage: newImageUrl,
    }));
    
    // IMPORTANT: Also update profileData so it persists
    setProfileData((prev) => ({
      ...prev,
      profileImage: newImageUrl,
    }));

    // Clean up the preview URL
    URL.revokeObjectURL(previewUrl);
    
    Swal.fire({
  icon: 'success',
  title: 'Uploaded!',
  text: 'Image uploaded successfully!',
  showConfirmButton: false,
  timer: 1500
});
  } catch (err) {
    console.error("Error uploading image:", err);
    setTempData((prev) => ({
      ...prev,
      profileImage: profileData?.profileImage || null,
    }));
    URL.revokeObjectURL(previewUrl);
   Swal.fire({
  icon: 'error',
  title: 'Upload Failed',
  text: 'Error uploading image',
  confirmButtonColor: '#d33'
});
  } finally {
    setImageUploading(false);
  }
};


  const handleEdit = () => {
    setIsEditing(true);
    setTempData({ ...profileData });
  };

  const handleSave = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.put(`http://localhost:5001/api/user/profile/${id}`, tempData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    const updatedData = res.data.data || res.data;
    
    setProfileData(updatedData);
    setIsEditing(false);
   Swal.fire({
  icon: 'success',
  title: 'Success!',
  text: 'Profile updated successfully!',
  showConfirmButton: false,
  timer: 1500
});
  } catch (err) {
    console.error("Error updating profile:", err);
    Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Error updating profile',
  confirmButtonColor: '#d33'
});
  }
};
  const handleCancel = () => {
    setTempData({ ...profileData });
    setIsEditing(false);
  };

  const handleInputChange = (section, field, value) => {
    if (section === 'root') {
      setTempData(prev => ({ ...prev, [field]: value }));
    } else {
      setTempData(prev => ({
        ...prev,
        [section]: { ...prev[section], [field]: value }
      }));
    }
  };

  const propertyTypes = ["PG", "Apartment", "Room", "Hostel", "House"];
  const amenitiesList = ["WiFi", "AC", "Parking", "Gym", "Pool", "Security", "Laundry", "Kitchen"];

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'address', label: 'Address', icon: MapPin },
    { id: 'preferences', label: 'Preferences', icon: Star },
    { id: 'account', label: 'Account', icon: Shield }
  ];

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-b from-[#1E1E2F] to-[#00C49A] flex items-center justify-center">
      <p className="text-white text-xl">Loading profile...</p>
    </div>
  );

  if (!profileData) return (
    <div className="min-h-screen bg-gradient-to-b from-[#1E1E2F] to-[#00C49A] flex items-center justify-center">
      <p className="text-white text-xl">No profile data found.</p>
    </div>
  );

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
                    src={data?.profileImage || "https://via.placeholder.com/150?text=No+Image"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-[#00C49A]"
                  />
                  {isEditing && (
                    <div className="absolute bottom-0 right-0">
                      <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="imageUpload"
                        className="bg-[#00C49A] p-2 rounded-full hover:bg-[#00b388] cursor-pointer flex items-center justify-center"
                      >
                        {imageUploading ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Camera className="w-4 h-4" />
                        )}
                      </label>
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-lg mt-3">
                  {data.firstName} {data.lastName}
                </h3>
                <p className="text-sm text-white/60">{data.occupation}</p>
                {data.emailVerified && data.phoneVerified && (
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <ShieldCheck className="w-4 h-4 text-[#00C49A]" />
                    <span className="text-xs text-[#00C49A]">Verified User</span>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-[#1E1E2F] rounded-lg">
                  <p className="text-2xl font-bold text-[#00C49A]">{data.listedProperties?.length || 0}</p>
                  <p className="text-xs text-white/60">Properties</p>
                </div>
                <div className="text-center p-3 bg-[#1E1E2F] rounded-lg">
                  <p className="text-2xl font-bold text-[#00C49A]">{data.savedListings?.length || 0}</p>
                  <p className="text-xs text-white/60">Saved</p>
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
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
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

              {/* Personal Info Tab */}
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={data.firstName}
                          onChange={(e) => handleInputChange('root', 'firstName', e.target.value)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        />
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg">{data.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={data.lastName}
                          onChange={(e) => handleInputChange('root', 'lastName', e.target.value)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        />
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg">{data.lastName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <p className="p-3 bg-[#1E1E2F] rounded-lg flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#00C49A]" />
                        {data.email}
                        {data.emailVerified && <CheckCircle className="w-4 h-4 text-[#00C49A]" />}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={data.phone || ''}
                          onChange={(e) => handleInputChange('root', 'phone', e.target.value)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        />
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg flex items-center gap-2">
                          <Phone className="w-4 h-4 text-[#00C49A]" />
                          {data.phone || 'Not provided'}
                          {data.phoneVerified && <CheckCircle className="w-4 h-4 text-[#00C49A]" />}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Date of Birth</label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={data.dateOfBirth?.split('T')[0]}
                          onChange={(e) => handleInputChange('root', 'dateOfBirth', e.target.value)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        />
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#00C49A]" />
                          {new Date(data.dateOfBirth).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Gender</label>
                      {isEditing ? (
                        <select
                          value={data.gender}
                          onChange={(e) => handleInputChange('root', 'gender', e.target.value)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg capitalize">{data.gender}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Occupation</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={data.occupation || ''}
                        onChange={(e) => handleInputChange('root', 'occupation', e.target.value)}
                        className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                      />
                    ) : (
                      <p className="p-3 bg-[#1E1E2F] rounded-lg">{data.occupation || 'Not specified'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Bio</label>
                    {isEditing ? (
                      <textarea
                        value={data.bio || ''}
                        onChange={(e) => handleInputChange('root', 'bio', e.target.value)}
                        rows="4"
                        className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none resize-none"
                        placeholder="Tell us about yourself..."
                      />
                    ) : (
                      <p className="p-3 bg-[#1E1E2F] rounded-lg">{data.bio || 'No bio provided'}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Address Tab */}
              {activeTab === 'address' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Street Address</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={data.address?.street || ''}
                          onChange={(e) => handleInputChange('address', 'street', e.target.value)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        />
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg">{data.address?.street || 'Not provided'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Area</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={data.address?.area || ''}
                          onChange={(e) => handleInputChange('address', 'area', e.target.value)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        />
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg">{data.address?.area || 'Not provided'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">City</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={data.address?.city || ''}
                          onChange={(e) => handleInputChange('address', 'city', e.target.value)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        />
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg">{data.address?.city || 'Not provided'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">State</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={data.address?.state || ''}
                          onChange={(e) => handleInputChange('address', 'state', e.target.value)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        />
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg">{data.address?.state || 'Not provided'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Pincode</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={data.address?.pincode || ''}
                          onChange={(e) => handleInputChange('address', 'pincode', e.target.value)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        />
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg">{data.address?.pincode || 'Not provided'}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
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
                              const currentTypes = data.preferences?.propertyTypes || [];
                              const newTypes = currentTypes.includes(type)
                                ? currentTypes.filter(t => t !== type)
                                : [...currentTypes, type];
                              handleInputChange('preferences', 'propertyTypes', newTypes);
                            }}
                            className={`px-3 py-2 rounded-lg text-sm font-medium ${
                              (data.preferences?.propertyTypes || []).includes(type)
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
                        {(data.preferences?.propertyTypes || []).map(type => (
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
                          value={data.preferences?.budgetMin || 0}
                          onChange={(e) => handleInputChange('preferences', 'budgetMin', parseInt(e.target.value) || 0)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        />
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg">₹{(data.preferences?.budgetMin || 0).toLocaleString()}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Budget Range (Max)</label>
                      {isEditing ? (
                        <input
                          type="number"
                          value={data.preferences?.budgetMax || 0}
                          onChange={(e) => handleInputChange('preferences', 'budgetMax', parseInt(e.target.value) || 0)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        />
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg">₹{(data.preferences?.budgetMax || 0).toLocaleString()}</p>
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
                              const currentAmenities = data.preferences?.amenities || [];
                              const newAmenities = currentAmenities.includes(amenity)
                                ? currentAmenities.filter(a => a !== amenity)
                                : [...currentAmenities, amenity];
                              handleInputChange('preferences', 'amenities', newAmenities);
                            }}
                            className={`px-3 py-2 rounded-lg text-sm font-medium ${
                              (data.preferences?.amenities || []).includes(amenity)
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
                        {(data.preferences?.amenities || []).map(amenity => (
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
                          value={data.preferences?.genderPreference || 'any'}
                          onChange={(e) => handleInputChange('preferences', 'genderPreference', e.target.value)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        >
                          <option value="any">Any</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg capitalize">{data.preferences?.genderPreference || 'Any'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Food Preference</label>
                      {isEditing ? (
                        <select
                          value={data.preferences?.foodPreference || 'any'}
                          onChange={(e) => handleInputChange('preferences', 'foodPreference', e.target.value)}
                          className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                        >
                          <option value="Vegetarian">Vegetarian</option>
                          <option value="Non-Vegetarian">Non-Vegetarian</option>
                          <option value="any">Any</option>
                        </select>
                      ) : (
                        <p className="p-3 bg-[#1E1E2F] rounded-lg">{data.preferences?.foodPreference || 'Any'}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Account Tab */}
              {activeTab === 'account' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-[#1E1E2F] rounded-lg">
                      <Calendar className="w-8 h-8 text-[#00C49A] mx-auto mb-2" />
                      <p className="text-2xl font-bold">{new Date(data.createdAt).getFullYear()}</p>
                      <p className="text-sm text-white/60">Member Since</p>
                    </div>
                    <div className="text-center p-4 bg-[#1E1E2F] rounded-lg">
                      <Building className="w-8 h-8 text-[#00C49A] mx-auto mb-2" />
                      <p className="text-2xl font-bold">{data.listedProperties?.length || 0}</p>
                      <p className="text-sm text-white/60">Total Properties</p>
                    </div>
                    <div className="text-center p-4 bg-[#1E1E2F] rounded-lg">
                      <Home className="w-8 h-8 text-[#00C49A] mx-auto mb-2" />
                      <p className="text-2xl font-bold">{data.savedListings?.length || 0}</p>
                      <p className="text-sm text-white/60">Saved Listings</p>
                    </div>
                  </div>

                  <div className="bg-[#1E1E2F] rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Account Status</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-[#00C49A]" />
                          <span>Email Verified</span>
                        </div>
                        {data.emailVerified ? (
                          <CheckCircle className="w-5 h-5 text-[#00C49A]" />
                        ) : (
                          <X className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-[#00C49A]" />
                          <span>Phone Verified</span>
                        </div>
                        {data.phoneVerified ? (
                          <CheckCircle className="w-5 h-5 text-[#00C49A]" />
                        ) : (
                          <X className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1E1E2F] rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Account Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">User ID:</span>
                        <span className="font-mono text-sm bg-[#2B2B40] px-2 py-1 rounded">{data._id}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Member Since:</span>
                        <span>{new Date(data.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Account Type:</span>
                        <span className="bg-[#00C49A] px-2 py-1 rounded text-sm">Standard User</span>
                      </div>
                    </div>
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