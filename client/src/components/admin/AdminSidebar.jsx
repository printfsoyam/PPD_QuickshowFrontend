import { LayoutDashboardIcon, ListCollapseIcon, ListIcon, PlusSquareIcon } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const AdminSidebar = () => {

  const user = {
    firstName: 'Admin',
    lastName: 'User',
    imageUrl: assets.profile || '', // Fallback in case image is missing
  }

  const adminNavlinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboardIcon },
    { name: 'Add Shows', path: '/admin/add-shows', icon: PlusSquareIcon },
    { name: 'List Shows', path: '/admin/list-shows', icon: ListIcon },
    { name: 'List Bookings', path: '/admin/list-bookings', icon: ListCollapseIcon },
  ]

  return (
    <div className='h-[calc(100vh-64px)] flex flex-col items-center pt-8 w-16 md:w-60 border-r border-gray-300/20 text-sm'>
      {/* User Profile Section */}
      <img 
        className='h-9 w-9 md:h-14 md:w-14 rounded-full mx-auto object-cover' 
        src={user.imageUrl} 
        alt="profile" 
      />
      <p className='mt-2 text-base hidden md:block font-medium'>
        {user.firstName} {user.lastName}
      </p>

      {/* Navigation Links */}
      <div className='w-full mt-6'>
        {adminNavlinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            // "end" ensures Dashboard isn't highlighted when on "Add Shows"
            end={link.path === '/admin'}
            className={({ isActive }) =>
              `relative flex items-center justify-center md:justify-start gap-3 w-full py-3 md:pl-8 transition-all ${
                isActive ? 'bg-primary/15 text-primary' : 'text-gray-500 hover:bg-gray-50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <link.icon size={20} />
                <span className="hidden md:block">{link.name}</span>
                
                {/* Active Indicator Bar */}
                {isActive && (
                  <span className='absolute right-0 w-1 h-8 bg-primary rounded-l-full' />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default AdminSidebar