import React, { useState, useEffect } from 'react';
import {
  MapPin, Users, Star, Phone, User, CheckCircle, Clock,
  Shield, ShieldCheck, Wifi, Car, Coffee, Utensils, Fan, Table,
  ChevronsUp, MessageCircle, Home, Calendar, Plus, X, Upload,
  DollarSign, Building, FileText, Settings, Save, Edit, Trash2,
  Eye, MoreVertical, Filter, Search
} from 'lucide-react';
import DemoListing from './demolisting';

const ManageListing = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [editingListing, setEditingListing] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  useEffect(() => {
    setListings(DemoListing);
    setFilteredListings(DemoListing);
  }, []);

  useEffect(() => {
    let filtered = listings;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(listing =>
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.area.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(listing => listing.type === filterType);
    }

    setFilteredListings(filtered);
  }, [listings, searchTerm, filterType]);

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

  const handleDelete = (id) => {
    setListings(prev => prev.filter(listing => listing.id !== id));
    setShowDeleteModal(null);
    alert('Listing deleted successfully!');
  };

  const handleEdit = (listing) => {
    setEditingListing({ ...listing });
  };

  const handleSaveEdit = () => {
    setListings(prev => prev.map(listing => 
      listing.id === editingListing.id ? editingListing : listing
    ));
    setEditingListing(null);
    alert('Listing updated successfully!');
  };

  const toggleAvailability = (id) => {
    setListings(prev => prev.map(listing => 
      listing.id === id 
        ? { 
            ...listing, 
            availability: { 
              ...listing.availability, 
              is_available: !listing.availability.is_available 
            } 
          } 
        : listing
    ));
  };

  const propertyTypes = ['all', 'PG', '1BHK', '2BHK', '3BHK', 'Single Room', 'Shared Room', 'Shared'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1E1E2F] to-[#00C49A] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Manage Your Listings</h1>
          <p className="text-white/80">View, edit, and manage all your property listings</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-[#2B2B40] rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title or area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#1E1E2F] border border-gray-600 rounded-lg focus:border-[#00C49A] focus:outline-none"
              />
            </div>
            <div className="md:w-48">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full p-3 bg-[#1E1E2F] border border-gray-600 rounded-lg focus:border-[#00C49A] focus:outline-none"
              >
                {propertyTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Listings Count */}
        <div className="mb-6">
          <p className="text-white/80">
            Showing {filteredListings.length} of {listings.length} listings
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <div key={listing.id} className="bg-[#2B2B40] rounded-lg overflow-hidden shadow-lg">
              {/* Image */}
              <div className="relative h-48">
                <img 
                  src={listing.images[0]} 
                  alt={listing.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  {listing.availability.is_available ? (
                    <span className="inline-flex items-center gap-1 bg-[#00C49A]/90 px-2 py-1 rounded-full text-xs font-medium">
                      <CheckCircle className="w-3 h-3" /> Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-purple-600/80 px-2 py-1 rounded-full text-xs font-medium">
                      <Clock className="w-3 h-3" /> Not Available
                    </span>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-[#00C49A]/80 px-2 py-1 rounded-full text-xs font-medium">
                    {listing.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{listing.title}</h3>
                
                <div className="flex items-center gap-2 text-sm text-white/80 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{listing.location.area}, {listing.location.city}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#00C49A]" />
                    <span className="text-sm">{listing.current_occupants}/{listing.shared_with}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm">{listing.reviews.rating}/5</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-2xl font-bold text-[#00C49A]">₹{listing.monthly_rent.toLocaleString()}</p>
                  <p className="text-xs text-white/60">per month</p>
                </div>

                {/* Amenities Preview */}
                <div className="mb-4">
                  <p className="text-xs text-white/60 mb-2">Amenities:</p>
                  <div className="flex flex-wrap gap-1">
                    {listing.amenities.slice(0, 3).map((amenity, idx) => {
                      const Icon = getAmenityIcon(amenity);
                      return (
                        <div key={idx} className="flex items-center gap-1 bg-[#00C49A]/20 px-2 py-1 rounded text-xs">
                          <Icon className="w-3 h-3" />
                          <span>{amenity}</span>
                        </div>
                      );
                    })}
                    {listing.amenities.length > 3 && (
                      <span className="text-xs text-white/60">+{listing.amenities.length - 3} more</span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleEdit(listing)}
                    className="flex items-center justify-center gap-2 bg-[#00C49A] hover:bg-[#00b388] px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(listing.id)}
                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>

                {/* Toggle Availability */}
                <button
                  onClick={() => toggleAvailability(listing.id)}
                  className={`w-full mt-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    listing.availability.is_available
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'bg-[#00C49A] hover:bg-[#00b388]'
                  }`}
                >
                  {listing.availability.is_available ? 'Mark as Unavailable' : 'Mark as Available'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <Building className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No listings found</h3>
            <p className="text-white/60 mb-4">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2B2B40] rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
              <p className="text-white/80 mb-6">
                Are you sure you want to delete this listing? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDelete(showDeleteModal)}
                  className="flex-1 bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg font-medium"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 px-4 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editingListing && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-[#2B2B40] rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Edit Listing</h3>
                <button
                  onClick={() => setEditingListing(null)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={editingListing.title}
                    onChange={(e) => setEditingListing(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Monthly Rent</label>
                    <input
                      type="number"
                      value={editingListing.monthly_rent}
                      onChange={(e) => setEditingListing(prev => ({ ...prev, monthly_rent: parseInt(e.target.value) || 0 }))}
                      className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Type</label>
                    <select
                      value={editingListing.type}
                      onChange={(e) => setEditingListing(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                    >
                      {propertyTypes.slice(1).map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={editingListing.description}
                    onChange={(e) => setEditingListing(prev => ({ ...prev, description: e.target.value }))}
                    rows="4"
                    className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Current Occupants</label>
                    <input
                      type="number"
                      value={editingListing.current_occupants}
                      onChange={(e) => setEditingListing(prev => ({ ...prev, current_occupants: parseInt(e.target.value) || 0 }))}
                      className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Total Capacity</label>
                    <input
                      type="number"
                      value={editingListing.shared_with}
                      onChange={(e) => setEditingListing(prev => ({ ...prev, shared_with: parseInt(e.target.value) || 0 }))}
                      className="w-full p-3 rounded-lg bg-[#1E1E2F] border border-gray-600 focus:border-[#00C49A] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSaveEdit}
                    className="flex-1 bg-[#00C49A] hover:bg-[#00b388] py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditingListing(null)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 py-3 px-4 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageListing;