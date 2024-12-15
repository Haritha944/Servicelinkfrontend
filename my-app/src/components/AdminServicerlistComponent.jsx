import React ,{useEffect,useState} from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const AdminServicerlistComponent = () => {
  const [servicers, setServicers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchServicers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}admin/servicer-list`);
        setServicers(response.data);
      } catch (error) {
        console.error('Error fetching servicers:', error);
      }
    };

    fetchServicers();
  }, []);
  const handleToggleServicer = (servicerId, currentStatus) => {
    setServicers((prevServicers) =>
      prevServicers.map((servicer) =>
        servicer.id === servicerId
          ? { ...servicer, is_active: !currentStatus } 
          : servicer
      )
    );
  }
  const filteredServicers = servicers.filter((servicer) =>
    servicer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(filteredServicers)
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className="flex sm:flex-row flex-wrap items-center justify-between pb-4 space-x-4">
      <label htmlFor="table-search" className="sr-only">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
          </svg>
        </div>
        <input
          type="text"
          id="table-search"
          className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th className="px-5 py-3">ID</th>
          <th className="px-5 py-3">Name</th>
          <th className="px-5 py-3 hidden sm:table-cell">Email</th>
          <th className="px-5 py-3">Phone Number</th>
          <th className="px-5 py-3 hidden md:table-cell">Address</th>
          <th className="px-5 py-3">Experience</th>
          <th className="px-5 py-3">Status</th>
          <th className="px-5 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredServicers.map((servicer) => (
          <tr key={servicer.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{servicer.id}</td>
            <td className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{servicer.name}</td>
            <td className="px-5 py-4 hidden sm:table-cell">{servicer.email}</td>
            <td className="px-5 py-4">{servicer.phone_number}</td>
            <td className="px-5 py-4 hidden md:table-cell">{servicer.address}</td>
            <td className="px-5 py-4">{servicer.experience}</td>
            <td className="px-5 py-4">
              <span className={`px-2 py-1 rounded-md ${servicer.is_active ? 'bg-green-700 text-white' : 'bg-red-700 text-white'}`}>
                {servicer.is_active ? 'Active' : 'Inactive'}
              </span>
            </td>
            <td className="px-5 py-4">
              <button
                onClick={() => handleToggleServicer(servicer.id, servicer.is_active)}
                className={`${servicer.is_active ? 'bg-red-700 hover:bg-red-800' : 'bg-green-700 hover:bg-green-800'} text-white px-2 py-1 rounded-md`}
                aria-label={servicer.is_active ? 'Block Servicer' : 'Unblock Servicer'}
              >
                {servicer.is_active ? 'Block' : 'Unblock'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  )
}

export default AdminServicerlistComponent