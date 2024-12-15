import React ,{useState,useEffect} from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL;
function ServicerProfileComponent  ()  {
    const [servicerDetails, setServicerDetails] = useState(() => {
        const savedServicerDetails = localStorage.getItem('servicerDetails');
        return savedServicerDetails ? JSON.parse(savedServicerDetails) : null;
    });
    
    const [showModal, setShowModal] = useState(false);
    const [confirmUpdate, setConfirmUpdate] = useState(false);

    const user = useSelector((state) => state.user); // accessing 'name' from the 'user' slice
    const Token = useSelector(state => state.user.token);
    const accessToken = Token.access
    const navigate=useNavigate()
    
   

    useEffect(() => {
        const fetchServicerDetails = async () => {
    
            try {
                const response = await axios.get(`${BASE_URL}provider/servicer_profile/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json', // Include access token in the Authorization header
                    }
                });
                console.log('Servicer Details:', response.data);
                setServicerDetails(response.data);
                localStorage.setItem('servicerDetails', JSON.stringify(response.data));

            } catch (error) {
                console.error('Error fetching servicer details:', error);
            }
        };
        

        
        fetchServicerDetails();
        
    }, [user]);


    const updateServicerProfile = async () =>{
        try {
            const servicerId = servicerDetails.id;
            const response = await axios.put(
                `${BASE_URL}provider/servicer_profile/update/${servicerId}/`,
                servicerDetails,
                {
                    headers:{
                        Authorization:`Bearer ${accessToken}`
                    }
                }
            );
            console.log('Updated Servicer Details:',response.data);
            localStorage.setItem('servicerDetails', JSON.stringify(response.data));
            setServicerDetails(response.data);
            setConfirmUpdate(false);
            setShowModal(false);

        } catch (error){
            console.error('Error updating servicer details:',error);
        }
    };

    useEffect (()=>{
        if (confirmUpdate) {
            updateServicerProfile();
        }
    }, [confirmUpdate]);

  return (
    <>
     <h1 className="text-3xl font-bold text-blue-600 text-center mb-5">Profile Details</h1>
     <div className="h-full">
        <div className='w-full md:w-3/5 p-8 bg-gradient-to-tr from-lime-600 to-sky-400 lg:ml-56 shadow-md'>
        <div className='flex justify-center '>
        <span className="text-black">Feel Free to Edit Your Details!!</span>
        </div>
        <div className='pb-6 mt-10'>
            <label htmlFor='name'  className="font-semibold text-gray-700 block pb-1">Name</label>
            <div className='flex'>
                <input 
                  id="username"
                  className='border border-gray-200 bg-white rounded-r px-4 py-2 w-full'
                  type='text'
                  value={servicerDetails ? servicerDetails.name :''}
                  onChange={(e) => setServicerDetails({ ...servicerDetails, name: e.target.value })}/>
            </div>
        </div>
        <div className='pb-4'>
        <label htmlFor='about'  className="font-semibold text-gray-700 block pb-1">Email</label>
        <input
            id="email"
            className="border border-gray-200 bg-gray-300 rounded-r px-4 py-2 w-full"
            type="email"
            value={servicerDetails ? servicerDetails.email : ''}
            readOnly
                    />
        </div>
        <div className="pb-4">
                    <label htmlFor="about" className="font-semibold text-gray-700 block pb-1">Phone Number</label>
                    <input
                        id="number"
                        className="border border-gray-200 bg-white rounded-r px-4 py-2 w-full"
                        type="text"
                        value={servicerDetails ? servicerDetails.phone_number : ''}
                        onChange={(e) => setServicerDetails({ ...servicerDetails, phone_number: e.target.value })}
                    />
                </div>
        <div className='pb-4'>
        <label htmlFor="about" className="font-semibold text-gray-700 block pb-1">Address</label>
                    <input
                        id="number"
                        className="border border-gray-200 bg-white rounded-r px-4 py-2 w-full"
                        type="text"
                        value={servicerDetails ? servicerDetails.address : ''}
                        onChange={(e) => setServicerDetails({ ...servicerDetails, address: e.target.value })}
                    />
        </div>
        <div className='pb-4'>
        <label htmlFor="about" className="font-semibold text-gray-700 block pb-1">Experience</label>
                    <input
                        id="number"
                        className="border border-gray-200 bg-white rounded-r px-4 py-2 w-full"
                        type="text"
                        value={servicerDetails ? servicerDetails.experience : ''}
                        onChange={(e) => setServicerDetails({ ...servicerDetails, experience: e.target.value })}
                    />
        </div>
        <button
            onClick ={()=>{
                setShowModal(true);
                setConfirmUpdate(false);
            }}
             className="mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
                    type="button">
                    Save Changes
        </button>
        {showModal && (
                <div id="popup-modal" tabindex="-1" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="p-4 md:p-5 text-center">
                                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to Edit?</h3>
                                <button 
                                onClick={() => {
                                    setConfirmUpdate(true);
                                    setShowModal(false);
                                }}
                                data-modal-hide="popup-modal" 
                                type="button" 
                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                    Yes, I'm sure
                                </button>
                                <button onClick={() => setShowModal(false)} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                )}

        </div>
        </div>
    </>
  )
}

export default ServicerProfileComponent