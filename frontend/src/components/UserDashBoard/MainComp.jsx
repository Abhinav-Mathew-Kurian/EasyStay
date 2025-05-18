import React from 'react'
import SideBar from '../UserDashBoard/SideBar'
import AppBar from './AppBar'
import ViewRooms from './ViewRooms'

const MainComp = () => {
  return (
    <>
    
      <div className="flex flex-col min-h-screen w-full bg-gradient-to-b from-[#1E1E2F] to-[#00C49A] overflow-hidden">
          <AppBar />
          <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <ViewRooms />
      </div>
      </div>
    </>
  );
}

export default MainComp
