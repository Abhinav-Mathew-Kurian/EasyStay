import React, { useState, useEffect } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

const SideBar = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile on initial render and when resized
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // FilterButton component for mobile - appears as a fixed button at bottom
  const FilterButton = () => (
    <button
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-[#00C49A] text-white px-6 py-3 rounded-full shadow-lg z-30 md:hidden"
      onClick={toggleFilter}
    >
      <Filter size={20} />
      <span>Filters</span>
    </button>
  );

  // Categories Section
  const CategoriesSection = () => (
    <div className="py-4">
      <div 
        className="flex justify-between items-center mb-4 cursor-pointer"
        onClick={() => toggleSection('categories')}
      >
        <h3 className="text-[#B388EB] font-semibold text-lg">Categories</h3>
        {(isMobile || true) && (
          <div>
            {expandedSection === 'categories' ? <ChevronUp size={20} className="text-[#B388EB]" /> : <ChevronDown size={20} className="text-[#B388EB]" />}
          </div>
        )}
      </div>
      {(!isMobile || expandedSection === 'categories') && (
        <ul className="space-y-2">
          <li>
            <button className="text-[#FAFAFA] hover:text-[#00C49A] w-full text-left py-2">All Listings</button>
          </li>
          <li>
            <button className="text-[#FAFAFA] hover:text-[#00C49A] w-full text-left py-2">Apartments</button>
          </li>
          <li>
            <button className="text-[#FAFAFA] hover:text-[#00C49A] w-full text-left py-2">Houses</button>
          </li>
          <li>
            <button className="text-[#FAFAFA] hover:text-[#00C49A] w-full text-left py-2">Shared Rooms</button>
          </li>
        </ul>
      )}
    </div>
  );

  // Price Range Section
  const PriceRangeSection = () => (
    <div className="py-4 border-t border-[#B388EB] border-opacity-30">
      <div 
        className="flex justify-between items-center mb-4 mt-2 cursor-pointer"
        onClick={() => toggleSection('price')}
      >
        <h3 className="text-[#B388EB] font-semibold text-lg">Price Range</h3>
        {(isMobile || true) && (
          <div>
            {expandedSection === 'price' ? <ChevronUp size={20} className="text-[#B388EB]" /> : <ChevronDown size={20} className="text-[#B388EB]" />}
          </div>
        )}
      </div>
      {(!isMobile || expandedSection === 'price') && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[#FAFAFA] text-xs mb-1">Min (₹)</label>
              <input 
                type="number" 
                className="w-full bg-[#2D2D2D] text-[#FAFAFA] p-2 rounded border border-[#B388EB] border-opacity-50"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-[#FAFAFA] text-xs mb-1">Max (₹)</label>
              <input 
                type="number" 
                className="w-full bg-[#2D2D2D] text-[#FAFAFA] p-2 rounded border border-[#B388EB] border-opacity-50"
                placeholder="50000"
              />
            </div>
          </div>
          <button className="w-full bg-[#00C49A] text-[#FAFAFA] py-2 rounded hover:bg-[#00A37A] transition-colors duration-300">
            Apply Filter
          </button>
        </div>
      )}
    </div>
  );

  // Location Section
  const LocationSection = () => (
    <div className="py-4 border-t border-[#B388EB] border-opacity-30">
      <div 
        className="flex justify-between items-center mb-4 mt-2 cursor-pointer"
        onClick={() => toggleSection('location')}
      >
        <h3 className="text-[#B388EB] font-semibold text-lg">Location</h3>
        {(isMobile || true) && (
          <div>
            {expandedSection === 'location' ? <ChevronUp size={20} className="text-[#B388EB]" /> : <ChevronDown size={20} className="text-[#B388EB]" />}
          </div>
        )}
      </div>
      {(!isMobile || expandedSection === 'location') && (
        <select className="w-full bg-[#2D2D2D] text-[#FAFAFA] p-2 rounded border border-[#B388EB] border-opacity-50">
          <option value="">All Locations</option>
          <option value="bangalore">Bangalore</option>
          <option value="delhi">Delhi</option>
          <option value="mumbai">Mumbai</option>
          <option value="hyderabad">Hyderabad</option>
        </select>
      )}
    </div>
  );

  // Render desktop sidebar
  const DesktopSidebar = () => (
    <div className="hidden md:block w-64 h-screen sticky mt-4 ml-10 top-0 z-10 border rounded border-[#B388EB] border-opacity-50 bg-gradient-to-br from-[#1E1E2F]/90 to-[#1E1E2F]/70 backdrop-blur-sm shadow-lg p-4 flex-shrink-0 mb-5">
      <CategoriesSection />
      <PriceRangeSection />
      <LocationSection />
    </div>
  );

  // Render mobile filter bottom sheet
  const MobileFilterSheet = () => (
    <>
      {/* Filter Sheet - Slides up from the bottom */}
      <div 
        className={`
          fixed bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto z-40
          bg-[#1E1E2F] rounded-t-xl border-t border-[#B388EB] border-opacity-50
          transform ${isFilterOpen ? 'translate-y-0' : 'translate-y-full'}
          transition-transform duration-300 ease-in-out
          md:hidden
        `}
      >
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b border-[#B388EB] border-opacity-30 sticky top-0 bg-[#1E1E2F]">
          <h2 className="text-[#B388EB] font-bold text-xl">Filters</h2>
          <button onClick={toggleFilter} className="text-[#FAFAFA]">
            <X size={24} />
          </button>
        </div>
        
        {/* Filter content */}
        <div className="p-4">
          <CategoriesSection />
          <PriceRangeSection />
          <LocationSection />
          
          {/* Apply and Clear buttons */}
          <div className="grid grid-cols-2 gap-4 mt-6 sticky bottom-0 bg-[#1E1E2F] py-4">
            <button className="w-full border border-[#B388EB] text-[#B388EB] py-3 rounded">
              Clear All
            </button>
            <button className="w-full bg-[#00C49A] text-[#FAFAFA] py-3 rounded hover:bg-[#00A37A]" onClick={toggleFilter}>
              Apply
            </button>
          </div>
        </div>
      </div>
      
      {/* Overlay when filter sheet is open */}
      {isFilterOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleFilter}
        />
      )}
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <DesktopSidebar />
      
      {/* Mobile components */}
      {isMobile && (
        <>
          <FilterButton />
          <MobileFilterSheet />
        </>
      )}
    </>
  );
};

export default SideBar;