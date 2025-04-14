import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../Context/DataContext';

const DP = () => {
  const {profilePicUrl,setProfilePicUrl} = useContext(DataContext);

  const fetchProfilePic = async (url) => {
    const img = new Image();
    img.onload = function () {
      setProfilePicUrl(url);
    };
    img.onerror = function () {
      console.log('Invalid image URL');
    };
    img.src = url;
  };
  
  useEffect(() => {
    
    fetchProfilePic('https://avatars.githubusercontent.com/rax-2');
  }, []);

  return (
    <div className=''>
      {profilePicUrl && (
        <img 
          src={profilePicUrl} 
          alt="GitHub Profile" 
          className=" rounded-full h-[60vw] sm:h-auto sm:w-auto max-w-[350px] "
        />
      )}
    </div>
  );
};

export default DP;
