import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import man from '../Images/use2.png';


const Servicersidelist = ({ receivers = [], searchResults = [], searchQuery, onSearch, onSelectUser }) => {
    
  
  const handleSearchChange = (e) => {
        onSearch(e.target.value);
        console.log(e.target.value, 'from userlist');
      };
    
      const receiversToDisplay = searchQuery ? searchResults : receivers;
      
  return (
   <>
    <div className="w-1/4 bg-shadow-lg shadow-black h-screen overflow-y-auto pt-20 sticky top-0 mr-2">
    <input
        type="search"
        value={searchQuery}
        onChange={handleSearchChange}
        className="flex m-10 px-4 py-2 bg-gray-200 font-semibold text-black rounded-md"
        placeholder="Search users"
      />
    <ul>
        {receiversToDisplay.length === 0 ? (
          <p className='m-10 px-4 py-2'>No users found</p>
        ) : (
          
          receiversToDisplay.map((receiver) => (
            <li
              key={receiver.id}
              className="p-4 hover:bg-gray-200 cursor-pointer bg-gray-100 rounded-md mb-2 mx-2"
              onClick={() => onSelectUser(receiver)}
            >
            
              <div className="flex gap-3">
              <img
               src={man} // Replace with actual URL or a default avatar
                alt="Servicer Avatar"
                  className="w-16 h-16 rounded-full mr-4" // Adjust size and shape of the avatar
                 />
                <p className="mr-10 font-bold text-gray-700">{receiver.name}</p>
                <p className="font-thin text-sm">{receiver.phone_number}</p>
              </div>
            </li>
          ))
        )}
      </ul>
    
    </div>
   </>
  )
}

export default Servicersidelist