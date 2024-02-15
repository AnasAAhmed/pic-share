import React, { useState, useEffect } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';


const UserProf = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();

  const randomimg = "https://source.unsplash.com/1600x900/?nature,technology"

  const activeBtnStyles = "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none "
  const notActiveBtnStyles = "bg-primary-500  text-black font-bold p-2 rounded-full w-20 outline-none hover:bg-slate-200"




  const Logout = () => {
    googleLogout();
    localStorage.clear();
    navigate('/login');
  }
  const isUserLoggedin = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();


  useEffect(() => {
    

      const query = userQuery(userId);
      
      client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      })
    
      // eslint-disable-next-line
  },[userId])

  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery)
        .then((data) => {
          setPins(data);
        })
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery)
        .then((data) => {
          setPins(data);
        })
    }
  }, [text, userId])

  if (!user) {
    return <Spinner message="Loading profile..." />
  }
  return (
    <div className='relative pb-2 h-full justify-center items-center '>
      <div className="flex flex-col pb-5 ">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img src={randomimg} alt="banner" className="w-full h-370 2xl:h-510 shadow-lg object-cover " />
            <img src={user.image} alt="user-pic" className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover" />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user.userName}
            </h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              
              {userId === isUserLoggedin.sub  && (
                <button
                  type='button'
                  className='bg-white p-2 rounded-full cursor-pointer outline-none shadow-md flex gap-2 font-bold px-3 hover:opacity-70'
                  onClick={Logout}
                >
                  Logout<AiOutlineLogout color='red' fontSize={21} />
                </button>
              )}
            </div>
          </div>
          <div className="text-center mt-5 mb-7">
            <button
              type='button'
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("created")
              }}
              className={`${activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Created
            </button>
            <button
              type='button'
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("saved")
              }}
              className={`${activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Saved
            </button>
          </div>
          {pins?.length? (

            <div className="px-2">
              <MasonryLayout pins={pins}/>
            </div>
          ):(
            <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
              No Posts Found!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProf
