import "../styles/main.css";
import React,{ useState } from 'react';
import image from "../img/Roads.png";
import image1 from "../img/SecondBuilding.png";
import image2 from "../img/FourthyBuilding.png";
import image3 from "../img/SixthyBuilding.png";
import image4 from "../img/FirstBuilding.png";
import image5 from "../img/FifthyBuilding.png";

import image6 from "../img/Tree 07-1.png";
import image7 from "../img/Tree 05-3.png";
import image10 from "../img/Tree 05-3.png";
import image11 from "../img/Tree 06-1.png"
import image12 from "../img/Tree 06-2.png"

import image13 from "../img/Tree 03-1.png"
import image14 from "../img/Tree 03-2.png"
import image15 from "../img/Tree 03-3.png"
import image16 from "../img/Tree 07-2.png"
import image17 from "../img/Tree 07-3.png"
import image18 from "../img/Tree 08-1.png"
import image29 from"../img/PictureOfFirstBuildingForBuldingFrame.png"
import image30 from"../img/Name.png"
import image31 from"../img/Description.png"
import image32 from"../img/Coordinates.png"
import image33 from"../img/Type.png"
import image34 from"../img/ButtonOfClickForEvents.png"
const Modal = ({ showModal, onClose, images }) => {
if (!showModal) return null; 
return (
<div className="modal-overlay">
<div className="modal-content">
<div className="modal-images">
{images.map((image, index) => (
<img src={image} alt={`image-${index}`} className="modal-image" key={index} />
))}
</div>
<button className="close-button" onClick={onClose}>X
</button>
</div>
</div>
);
};
const Home = () => {
const [showModal, setShowModal] = useState(false); 
const [selectedImages, setSelectedImages] = useState([]); 
const [selectedImage, setSelectedImage] = useState(null); 
const handleImageClick = (index) => { 
if (index === 4){
const images = [image29, image30, image31, image32, image33, image34];
setSelectedImages(images); 
setSelectedImage(index); 
setShowModal(true);  
  }  };
const handleCloseModal = () => {
setShowModal(false); 
setSelectedImage(null);
      };
    
return (
<div className="body">
<img src={image} alt="" className="img" />
<img
src={image1}
alt="Second Building"
className={`img1 ${selectedImage === 1 ? "highlighted" : ""}`}
onClick={() => handleImageClick(1)} 
/>
<img
 src={image2}
alt="Fourth Building"
className={`img2 ${selectedImage === 2 ? "highlighted" : ""}`}
 onClick={() => handleImageClick(2)} 
/>
<img
src={image3}
 alt="Sixth Building"
className={`img3 ${selectedImage === 3 ? "highlighted" : ""}`}
onClick={() => handleImageClick(3)} 
/>
<img
src={image4}
alt="First Building"
className={`img4 ${selectedImage === 4 ? "highlighted" : ""}`}
onClick={() => handleImageClick(4)} 
 />
<img
 src={image5}
alt="Fifth Building"
className={`img5 ${selectedImage === 5 ? "highlighted" : ""}`}
onClick={() => handleImageClick(5)} 
  />
<Modal showModal={showModal} onClose={handleCloseModal} images={selectedImages} />
    

<img src={image6} alt="" className="img6"/>
<img src={image7} alt="" className="img7"/>
<img src={image10} alt="" className="img10"/>
<img src={image11} alt="" className="img11" />
<img src={image12} alt="" className="img12" />

<img src={image13} alt="" className="img13" />
<img src={image14} alt="" className="img14" />
<img src={image15} alt="" className="img15" />
<img src={image16} alt="" className="img16" />
<img src={image17} alt="" className="img17" />
<img src={image18} alt="" className="img18" />
<img src={image11} alt="" className="img19" />
<img src={image13} alt="" className="img20" />
<img src={image14} alt="" className="img21" />
 </div>
);
}
export default Home;