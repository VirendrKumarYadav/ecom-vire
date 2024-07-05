import React from 'react'

const Card = (prop) => {
  // console.log(prop.key);
  return (
    <div className='card-container'>
      <div className='img-cont'>
        <img alt='_blank' height={300} width={300} src={prop.img}></img>
      </div>
      <div className='card-name'>
        <p>{prop.name}</p>
        <span>men's clothing</span>
        </div>

      <div className='card-prize'> ${prop.price}</div>
    </div>

  )
}

export default Card