import React from 'react'
import './postTag.css'

export const PostTag = ({index, tag}) => {
  return (
    <>
    <div className='post__Tag__block'>
       <div className='post__tag__index'>{ index + 1 }</div>
       <p className='post__tag__text'>{tag}</p>
    </div>
    </>
  )
}
