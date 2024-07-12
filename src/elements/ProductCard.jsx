import React, { useState } from 'react'
import "../css/new-order.css"
const ProductCard = ({ id, img, amount, title, type, removeFromCart }) => {

    const [qty, setQty] = useState(1)


    return (
        <div className='product-card-main'>
            <div className='product-Card'>

                <div>
                    <img src={img} height={100} width={100}></img>
                </div>
                <div>
                    <h3>{title}</h3>

                </div>

                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={qty}
                        min="1"
                        required
                        onChange={(e) => { setQty(e.target.value) }}

                    />
                </div>
                <div className='card-amount'>

                    <h4>{amount}</h4>
                </div>
                <div className='remove-btn'>

                    <button onClick={() => removeFromCart(id)}>Remove</button>
                </div>
            </div>
            <hr></hr>
        </div>
    )
}

export default ProductCard