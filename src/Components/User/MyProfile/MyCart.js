import React from 'react'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { Link } from 'react-router-dom';

export const MyCart = () => {
   return (
      <div className="movie--detail--button--container movie--detail--button__goback">
         <Link className="movie--detail--button" to={'/myprofile'}>
            <ArrowCircleLeftIcon fontSize='large' />
            GO BACK
         </Link>
      </div>
   )
}
