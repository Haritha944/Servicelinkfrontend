import React from 'react'
import AdminSidebarComponent from '../components/AdminSidebarComponent'
import AdminBookingComponent from '../components/AdminBookingComponent'

function AdminBookingPage  () {
  return (
    <>
    <div className='flex'>
    <AdminSidebarComponent/>
    <div className='p-4 sm:ml-1/3 md:ml-1/4 lg:ml-1/5 w-full'>
    <div className='p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700'>
        <div>
                <h3 className='text-rose-600 font-bold text-2xl mb-5'>Service Bookings</h3>
            </div>
            <AdminBookingComponent/>
            </div>
            </div>
            </div>
    </>
  )
}

export default AdminBookingPage