import React from 'react'
import {IndividualProduct} from './IndividualProduct'

export const Products = ({products,addToCart}) => {

    // console.log(products);
    
    return products.map((individualProduct)=>(
        <IndividualProduct audioUrl={individualProduct.audioUrl} key = {individualProduct.ID} individualProduct={individualProduct}
           addToCart={addToCart}
        />
    ))
}
