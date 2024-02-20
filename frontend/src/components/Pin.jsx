import React, { useState } from 'react'
import { client, urlFor } from '../client'
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { fetchUser } from '../utils/fetchUser'
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

const Pin = ({ pin }) => {

    const [postHovered, setPostHovered] = useState(false)
    const [savingPost, setSavingPost] = useState(false);
    const navigate = useNavigate();
    const { postedBy, image, _id, destination } = pin;
    const user = fetchUser();


    const deletePin = (id) => {
        client
            .delete(id)
            .then(() => {
                window.location.reload();
            });
    };
    let alreadySaved = pin?.save?.filter((item) => item?.postedBy?._id === user?.sub);

    alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

    const savePin = (id) => {
        if (alreadySaved?.length === 0) {
            setSavingPost(true);

            client
                .patch(id)
                .setIfMissing({ save: [] })
                .insert('after', 'save[-1]', [{
                    _key: uuidv4(),
                    userId: user?.sub,
                    postedBy: {
                        _type: 'postedBy',
                        _ref: user?.sub,
                    },
                }])
                .commit()
                .then(() => {
                    window.location.reload();
                    setSavingPost(false);
                });
        }
    };

    return (
        <div className='m-2'>
            <div
                className=" hidden md:flex relative cursor-zoom-in w-auto hover:shadow-g rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/pin-details/${_id}`)}
            >
                {image && (
                    <img className="rounded-lg w-full " src={(urlFor(image).width(250).url())} alt="user-post" />)}
                {postHovered && (
                    <div
                        className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50" >
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <a
                                    href={`${image?.asset?.url}?dl=`}
                                    download
                                    onClick={(e) => e.stopPropagation()}
                                    className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                                >
                                    <MdDownloadForOffline />
                                </a>
                            </div>
                            {user ? <>
                                {alreadySaved?.length !== 0 ? (
                                    <button type="button" className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                                        {pin?.save?.length}  Saved
                                    </button>
                                ) : (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            savePin(_id);
                                        }}
                                        type="button"
                                        className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                                    >
                                        {pin?.save?.length}   {savingPost ? 'Saving' : 'Save'}
                                    </button>
                                )}
                            </> : ""}
                        </div>
                        <div className="flex justify-between items-center gap-2 w-full">
                            {destination?.slice(8).length > 0 ? (
                                <a href={destination}
                                    target='blank'
                                    rel="noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hoover:opacity-100 hover:shadow-md'
                                >
                                    <BsFillArrowRightCircleFill />
                                    {destination?.slice(8, 17)}...
                                </a>
                            ) : undefined}
                            {postedBy?._id === user?.sub && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); deletePin(_id); }}
                                    type='button'
                                    className='bg-white p-2 opacity-70 hover:opacity-100 text-dark font-bold   text-base rounded-3xl hover:shadow-md outline-none'>
                                    <AiTwotoneDelete />
                                </button>
                            )}
                        </div>
                    </div>
                )}


            </div>
            <div
                className=" md:hidden relative cursor-zoom-in w-auto hover:shadow-g rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
                
                // onClick={() => setPostHovered(!postHovered)}
                onMouseOut={() => setPostHovered(false)}
                onMouseOver={() => setPostHovered(true)}
            >
                {image && (
                    <img className="rounded-lg w-full " src={(urlFor(image).width(250).url())} alt="user-post" />)}
                {postHovered && (
                    <div
                        className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <a
                                    href={`${image?.asset?.url}?dl=`}
                                    download
                                    onClick={(e) => e.stopPropagation()}
                                    className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                                >
                                    <MdDownloadForOffline />
                                </a>
                            </div>
                            {user ? <>
                                {alreadySaved?.length !== 0 ? (
                                    <button type="button" className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                                        {pin?.save?.length}  Saved
                                    </button>
                                ) : (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            savePin(_id);
                                        }}
                                        type="button"
                                        className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                                    >
                                        {pin?.save?.length}   {savingPost ? 'Saving' : 'Save'}
                                    </button>
                                )}
                            </> : ""}
                        </div>
                        <div className="flex justify-between items-center gap-2 w-full">
                           
                            {postedBy?._id === user?.sub && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); deletePin(_id); }}
                                    type='button'
                                    className='bg-white p-2 opacity-70 hover:opacity-100 text-dark font-bold   text-base rounded-3xl hover:shadow-md outline-none'>
                                    <AiTwotoneDelete />
                                </button>
                            )}
                            <button
                                onClick={() => navigate(`/pin-details/${_id}`)}
                                type="button"
                                className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                            >
                                See details
                            </button>
                        </div>
                    </div>
                )}


            </div>
            <Link to={user ? `user-profile/${postedBy?._id}` : ""} className='flex gap-2 mt-2 items-center'>
                <img src={postedBy?.image} className="w-8 h-8 rounded-full object-cover" alt="user-profile" />
                <p className="font-semibold text-dark capitalize">{postedBy?.userName}</p>
            </Link>
        </div>
    )
}

export default Pin
