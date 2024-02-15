import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { client } from "../client"
import { MasonryLayout,  Spinner } from "../components/index"
import { feedQuery, searchQuery } from '../utils/data';


const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(false);
  const { categoryId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);
  
  if (loading) {
    return (
      <Spinner message={`We are adding new ideas to your feed!`} />
    );
  }
  if(pins?.length === 0) return <h1 className='text-center mt-20 text-3xl'>No pins available</h1>
  return (
    <div>
     {pins && (<MasonryLayout pins={pins}/>)}
    </div>
  )
}

export default Feed
