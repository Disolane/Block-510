import React, { useState } from 'react'
import image28 from "../img/ButtonForMoveToFloors.png";
import image22 from"../img/изображение 5.png"
import image24 from"../img/Group 105.png"
import image23 from"../img/MainBlock (2).png"
import image25 from"../img/Group 106.png"
import image26 from"../img/SoundButton.png"
import image27 from"../img/Group 108.png"
import image35 from "../img/PictureOfFirstBuildingForBuldingFrame.png"
const SecondFrame = () => {
  const [imageSrc, setImageSrc] = useState(image26);
  const handleImageClick = () => {
    if (imageSrc === image26) {
      setImageSrc(image27); 
    } else {
      setImageSrc(image26); 
    }
  }; 
  return (
  <div className="fon1">
  <img src={image22} alt="" className="img22"/>
  <div className="fon2"></div>
  <img src={image23} alt="" className="img23"/>
  <img src={image24} alt="" className="img24"/>
  <img src={image25} alt="" className="img25"/>
  <img src={image35} alt=''className='img35'/>
  <button onClick={handleImageClick}>
  <img src={imageSrc} alt="" className="img26" />
   </button>
      <div 
        onClick={handleImageClick} 
        style={{ 
        cursor: 'pointer' 
          
        }}
      >
  </div>
  <img src={image28} alt="" className='img28'/>
  </div>
    );
  };

export default SecondFrame;
  