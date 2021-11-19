import React from 'react'
import IconButton from '@mui/material/IconButton';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

export const IndividualProduct = ({individualProduct, addToCart}) => {
    const [audioPlaying, setAudiPlaying] = React.useState(false);
    // console.log(individualProduct);
    const handleAddToCart=()=>{
        addToCart(individualProduct);
    }
    
    
    return (
        <div className='product'>
        {
          audioPlaying && <audio src={individualProduct.audioUrl} autoPlay></audio>
        }
            <div className="audio-button">
                <IconButton styles={{padding: '10px'}}>
                  <VolumeUpIcon color={audioPlaying ? "default" : 'primary'} onClick={() => setAudiPlaying(!audioPlaying)} />
                </IconButton>
            </div>
            <div className='product-img'>
                <img src={individualProduct.url} alt="product-img"/>
            </div>
            <div className='product-text title'>{individualProduct.title}</div>
            <div className='product-text description'>{individualProduct.description}</div>
            <div className='product-text price'>$ {individualProduct.price}</div>
            <div className='btn btn-danger btn-md cart-btn' onClick={handleAddToCart}>ADD TO CART</div>
        </div> 
    )
}
