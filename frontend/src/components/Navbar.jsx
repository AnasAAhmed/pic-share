import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from "react-icons/io"


const Navbar = ({ setSearchTerm, searchTerm, user }) => {
  const navigate = useNavigate();



  return (
    <div className='flex gap-2 md:gap-5 mt-5 w-full pb-7'>

      <div className="flex justify-start items-center w-full px-2 rounded-full bg-slate-100 border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className='ml-1' />
        <input type="text" onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search'
          value={searchTerm}
          onFocus={() => navigate('/search')}
          className='p-2 w-full bg-slate-100 outline-none'
        />
      </div>
      <div className="flex gap-3 ">
     

  {user ?
    (<>
            <Link to={`user-profile/${user?._id}`} className='hidden md:block'>
            <img src={user.image} alt="user" className='w-14 h-12 rounded-full' />
            </Link>
            <Link to="create-pin" className='bg-black text-white rounded-full w-12 h-12 md:w-14 md:h-12 flex justify-center items-center'>
            <IoMdAdd />
              </Link>
          </>):(<>
            <Link
                to="/login"
                className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none hidden md:block"           
                >
                Login
                </Link>
          </>
          )}
          

        
            
      </div>
    </div>
  )
}

export default Navbar
