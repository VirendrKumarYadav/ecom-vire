import React from 'react'
import "../css/new-order.css"
const ProductCard = (prop) => {


    return (
        <div className='product-card-main'>
            <div className='product-Card'>

                <div>
                    <img src={prop.img} height={100} width={100}></img>
                </div>
                <div>
                    <h3>{prop.title}</h3>
                    <p><span>{prop.type}</span></p>
                    <h4>{prop.amount}</h4>
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={1}
                        min="1"
                        required
                    />
                </div>

                <div className='remove-btn'>
               
                    <button onClick={prop.removeFromCart}>Remove</button>
                </div>
            </div>
            <hr></hr>
        </div>
    )
}

export default ProductCard