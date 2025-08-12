import React, { useState } from 'react';
import {
  MapPin, Users, Star, Phone, User, CheckCircle, Clock,
  Shield, ShieldCheck, Wifi, Car, Coffee, Utensils, Fan, Table,
  ChevronsUp, MessageCircle, Home, Calendar, Plus, X, Upload,
  Building, FileText, Settings, Save, Loader
} from 'lucide-react';
import axios from 'axios';
const ListRooms = () => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    type: 'PG',
    description: '',
    location: {
      city: 'Thiruvananthapuram',
      area: '',
      latitude: 0,
      longitude: 0
    },
    state: 'Kerala',
    pincode: '',
    occupancy: {
      allowed: [],
      gender: 'Any'
    },
    shared_with: 0,
    current_occupants: 0,
    is_occupied: false,
    amenities: [],
    restrictions: [],
    monthly_rent: 0,
    images: [],
    availability: {
      is_available: true,
      available_from: ''
    },
    reviews: {
      rating: 0,
      count: 0
    },
    owner: {
      name: '',
      contact: ''
    }
  });

  const [uploading, setUploading] = useState(false);
  const [newAmenity, setNewAmenity] = useState('');
  const [newRestriction, setNewRestriction] = useState('');

  const propertyTypes = ['PG', '1BHK', '2BHK', '3BHK', 'Single Room', 'Shared Room'];
  const genderOptions = ['Any', 'Male', 'Female'];
  const commonAmenities = ['WiFi', 'AC', 'Fan', 'Laundry', 'Meals Included', 'Parking', 'Lift', 'Security', 'Table'];
  const commonRestrictions = ['No pets', 'No parties', 'No smoking', 'No alcohol'];
  const commonOccupancyTypes = ['Students', 'Working Professionals', 'Families', 'Married Couples', 'Ladies only', 'Gents only'];

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleInputChange = (field, value) => {
    if (field === 'title') {
      setFormData(prev => ({
        ...prev,
        title: value,
        slug: generateSlug(value)
      }));
    } else if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: field.includes('latitude') || field.includes('longitude') ? parseFloat(value) || 0 : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const addToArray = (field, value) => {
    if (value.trim() && !formData[field].includes(value.trim())) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
    }
  };

  const removeFromArray = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

const handleSubmit = async () => {
  if (formData.images.length < 3) {
    alert('Please upload at least 3 images');
    return;
  }

  const token = localStorage.getItem('token'); 

  if (!token) {
    alert('You must be logged in to submit.');
    return;
  }

  const submitData = new FormData();

  submitData.append('title', formData.title);
  submitData.append('slug', formData.slug);
  submitData.append('type', formData.type);
  submitData.append('description', formData.description);
  submitData.append('location', JSON.stringify(formData.location));
  submitData.append('state', formData.state);
  submitData.append('pincode', formData.pincode);

  // Clean occupancy.allowed before sending, set ["0"] if empty
  let cleanedAllowed = formData.occupancy.allowed.filter(item => item.trim() !== '');
  if (cleanedAllowed.length === 0) {
    cleanedAllowed = ["0"];
  }
  submitData.append('occupancy', JSON.stringify({
    ...formData.occupancy,
    allowed: cleanedAllowed
  }));

  submitData.append('shared_with', formData.shared_with.toString());
  submitData.append('current_occupants', formData.current_occupants.toString());
  submitData.append('is_occupied', formData.is_occupied.toString());
  submitData.append('amenities', JSON.stringify(formData.amenities));
  submitData.append('restrictions', JSON.stringify(formData.restrictions));
  submitData.append('monthly_rent', formData.monthly_rent.toString());

  submitData.append(
    'availability',
    JSON.stringify({
      ...formData.availability,
      available_from: formData.availability.available_from
        ? new Date(formData.availability.available_from)
        : new Date(),
    })
  );

  submitData.append('owner', JSON.stringify(formData.owner));

  formData.images.forEach((file) => {
    submitData.append('images', file);
  });

  try {
    const response = await axios.post('http://localhost:5001/api/listroom', submitData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      alert('Property listed successfully!');
      // Reset form or redirect logic here
    }
  } catch (error) {
    console.error('Submit error:', error);
    const message =
      error.response?.data?.message || error.message || 'Failed to list property';
    alert(`Error: ${message}`);
  }
};


  const getAmenityIcon = (amenity) => {
    const iconMap = {
      'WiFi': Wifi, 'AC': Fan, 'Laundry': Coffee, 'Meals Included': Utensils,
      'Parking': Car, 'Lift': ChevronsUp, 'Security': ShieldCheck, 'Fan': Fan, 'Table': Table,
    };
    return iconMap[amenity] || Home;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1E1E2F] to-[#00C49A] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">List Your Property</h1>
          <p className="text-white/80">Share the details of your room or property to find the perfect tenant</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">

            {/* Basic Information */}
            <div className="bg-[#2B2B40] rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Building className="w-5 h-5 text-[#00C49A]" />
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Property Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                    placeholder="e.g., Cozy PG for Ladies near Technopark"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Slug (Auto-generated)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 text-gray-400"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Property Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                    required
                  >
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows="4"
                    className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none resize-none"
                    placeholder="Describe your property in detail..."
                    required
                  />
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="bg-[#2B2B40] rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#00C49A]" />
                Location Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Area *</label>
                  <input
                    type="text"
                    value={formData.location.area}
                    onChange={(e) => handleInputChange('location.area', e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                    placeholder="e.g., Kazhakkoottam"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Pincode *</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                    placeholder="e.g., 695582"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Latitude *</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.location.latitude || ''}
                    onChange={(e) => handleInputChange('location.latitude', e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                    placeholder="e.g., 8.5566"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Longitude *</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.location.longitude || ''}
                    onChange={(e) => handleInputChange('location.longitude', e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                    placeholder="e.g., 76.8752"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Occupancy Details */}
            <div className="bg-[#2B2B40] rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#00C49A]" />
                Occupancy Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Shared With *</label>
                  <input
                    type="number"
                    value={formData.shared_with || ''}
                    onChange={(e) => handleInputChange('shared_with', parseInt(e.target.value) || 0)}
                    className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Current Occupants *</label>
                  <input
                    type="number"
                    value={formData.current_occupants || ''}
                    onChange={(e) => handleInputChange('current_occupants', parseInt(e.target.value) || 0)}
                    className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Gender *</label>
                  <select
                    value={formData.occupancy.gender}
                    onChange={(e) => handleInputChange('occupancy.gender', e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                    required
                  >
                    {genderOptions.map(gender => (
                      <option key={gender} value={gender}>{gender}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.is_occupied}
                      onChange={(e) => handleInputChange('is_occupied', e.target.checked)}
                      className="w-4 h-4 text-[#00C49A]"
                    />
                    <span className="text-sm">Currently Occupied</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Allowed Types</label>
                <div className="flex gap-2 mb-2">
                  <select
                    onChange={(e) => {
                      if (e.target.value && !formData.occupancy.allowed.includes(e.target.value)) {
                        setFormData(prev => ({
                          ...prev,
                          occupancy: {
                            ...prev.occupancy,
                            allowed: [...prev.occupancy.allowed, e.target.value]
                          }
                        }));
                      }
                      e.target.value = '';
                    }}
                    className="flex-1 p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                  >
                    <option value="">Select type</option>
                    {commonOccupancyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.occupancy.allowed.map((type, index) => (
                    <span key={index} className="inline-flex items-center gap-1 bg-[#00C49A] px-3 py-1 rounded-full text-sm">
                      {type}
                      <button type="button" onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          occupancy: {
                            ...prev.occupancy,
                            allowed: prev.occupancy.allowed.filter((_, i) => i !== index)
                          }
                        }));
                      }}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Amenities & Restrictions */}
            <div className="bg-[#2B2B40] rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#00C49A]" />
                Amenities & Restrictions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Amenities</label>
                  <div className="flex gap-2 mb-2">
                    <select
                      value={newAmenity}
                      onChange={(e) => setNewAmenity(e.target.value)}
                      className="flex-1 p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                    >
                      <option value="">Select amenity</option>
                      {commonAmenities.map(amenity => (
                        <option key={amenity} value={amenity}>{amenity}</option>
                      ))}
                    </select>
                    <button type="button" onClick={() => {
                      if (newAmenity) {
                        addToArray('amenities', newAmenity);
                        setNewAmenity('');
                      }
                    }} className="px-4 py-3 bg-[#00C49A] hover:bg-[#00b388] rounded-lg">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.amenities.map((amenity, index) => {
                      const Icon = getAmenityIcon(amenity);
                      return (
                        <div key={index} className="flex items-center justify-between p-2 bg-[#00C49A]/10 rounded">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-[#00C49A]" />
                            <span className="text-sm">{amenity}</span>
                          </div>
                          <button type="button" onClick={() => removeFromArray('amenities', index)}>
                            <X className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Restrictions</label>
                  <div className="flex gap-2 mb-2">
                    <select
                      value={newRestriction}
                      onChange={(e) => setNewRestriction(e.target.value)}
                      className="flex-1 p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                    >
                      <option value="">Select restriction</option>
                      {commonRestrictions.map(restriction => (
                        <option key={restriction} value={restriction}>{restriction}</option>
                      ))}
                    </select>
                    <button type="button" onClick={() => {
                      if (newRestriction) {
                        addToArray('restrictions', newRestriction);
                        setNewRestriction('');
                      }
                    }} className="px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.restrictions.map((restriction, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-purple-600/20 rounded">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-purple-400" />
                          <span className="text-sm">{restriction}</span>
                        </div>
                        <button type="button" onClick={() => removeFromArray('restrictions', index)}>
                          <X className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rent & Availability */}
            <div className="bg-[#2B2B40] rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Rent & Availability</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Monthly Rent (₹) *</label>
                  <input
                    type="number"
                    value={formData.monthly_rent || ''}
                    onChange={(e) => handleInputChange('monthly_rent', parseInt(e.target.value) || 0)}
                    className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Available From</label>
                  <input
                    type="date"
                    value={formData.availability.available_from}
                    onChange={(e) => handleInputChange('availability.available_from', e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.availability.is_available}
                    onChange={(e) => handleInputChange('availability.is_available', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label className="text-sm">Available immediately</label>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-[#2B2B40] rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Initial Reviews</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Rating (0-5)</label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.reviews.rating || ''}
                    onChange={(e) => handleInputChange('reviews.rating', parseFloat(e.target.value) || 0)}
                    className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Review Count</label>
                  <input
                    type="number"
                    value={formData.reviews.count || ''}
                    onChange={(e) => handleInputChange('reviews.count', parseInt(e.target.value) || 0)}
                    className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Owner Details */}
            <div className="bg-[#2B2B40] rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[#00C49A]" />
                Owner Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.owner.name}
                    onChange={(e) => handleInputChange('owner.name', e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Number *</label>
                  <input
                    type="tel"
                    value={formData.owner.contact}
                    onChange={(e) => handleInputChange('owner.contact', e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Images Upload */}
            <div className="bg-[#2B2B40] rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#00C49A]" />
                Property Images (3-5 required)
              </h3>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center mb-4">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  disabled={uploading || formData.images.length >= 5}
                />
                <label htmlFor="image-upload" className={`cursor-pointer ${uploading || formData.images.length >= 5 ? 'opacity-50' : ''}`}>
                  {uploading ? (
                    <Loader className="w-8 h-8 text-gray-400 mx-auto mb-2 animate-spin" />
                  ) : (
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  )}
                  <p className="text-sm text-gray-400 mb-2">
                    {uploading ? 'Uploading...' : 'Click to upload images'}
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB each</p>
                </label>
              </div>


              {formData.images.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">{formData.images.length}/5 images uploaded</p>
                  <div className="grid grid-cols-2 gap-2">
                    {formData.images.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-20 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={formData.images.length < 3 || uploading}
              className="w-full bg-purple-600 hover:bg-purple-800 disabled:bg-gray-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 text-lg"
            >
              <Save className="w-5 h-5" />
              List My Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListRooms;