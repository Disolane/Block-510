

import React, { useState,useEffect } from 'react';
import image from "../img/Roads.png";
import image1 from "../img/SecondBuilding.png";
import image2 from "../img/FourthyBuilding.png";
import image3 from "../img/SixthyBuilding.png";
import image4 from "../img/FirstBuilding.png";
import image5 from "../img/FifthyBuilding.png";
import image6 from "../img/Tree 07-1.png";
import image7 from "../img/Tree 05-3.png";
import image10 from "../img/Tree 05-3.png";
import image11 from "../img/Tree 06-1.png";
import image12 from "../img/Tree 06-2.png";
import image13 from "../img/Tree 03-1.png";
import image14 from "../img/Tree 03-2.png";
import image15 from "../img/Tree 03-3.png";
import image16 from "../img/Tree 07-2.png";
import image17 from "../img/Tree 07-3.png";
import image18 from "../img/Tree 08-1.png";
import image29 from "../img/PictureOfFirstBuildingForBuldingFrame.png";
import { Link } from 'react-router-dom';
const Modal = ({ showModal, onClose, images,buildingData }) => {
  if (!showModal) return null; 
  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <Link className="button4" to="second-page">
  <span className="button-text">Подробнее о корпусе</span>
</Link>
{/* Добавляем отображение данных о здании */}
{buildingData && (
          <div className="building-info">
            <h2>{buildingData.name}</h2>
            <p>{buildingData.description}</p>
            <p>Адрес: {buildingData.address}</p>
            <p>Тип: {buildingData.type}</p>
          </div>
        )}
        <div className="modal-images">
          {images.map((image, index) => (
            <img src={image} alt={`image-${index}`} className="modal-image" key={index} />
          ))}
        </div>
        <button className="close-button" onClick={onClose}>X</button>
      </div>
    </div>
  );
};

const Home = () => {
  const [showModal, setShowModal] = useState(false); 
  const [selectedImages, setSelectedImages] = useState([]); 
  const [selectedImage, setSelectedImage] = useState(null); 
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  // Загружаем данные о зданиях при монтировании компонента
  useEffect(() => {
    fetch("/api/buildings") 
      .then(response => response.json())
      .then(data => setBuildings(data))
      .catch(error => console.error('Ошибка при загрузке данных:', error));
  }, []);


  const handleImageClick = (index) => {
    let images = [];
    switch(index) {
      case 1: images = [image1]; break;
      case 2: images = [image2]; break;
      case 3: images = [image3]; break;
      case 4: images = [image29]; break; // Для FirstBuilding (image4)
      case 5: images = [image5]; break;
      default: images = [];  
  };
  // Находим данные здания в базе (если есть)
  const buildingData = buildings.find(b => b.id === index);
    
  setSelectedImages(images);
  setSelectedImage(index);
  setSelectedBuilding(buildingData || null); // Может быть null если данные не загрузились
  setShowModal(true);
};

const handleCloseModal = () => {
  setShowModal(false);
  setSelectedImage(null);
  setSelectedBuilding(null);
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
     {/* Модальное окно */}
     <Modal 
        showModal={showModal} 
        onClose={handleCloseModal} 
        images={selectedImages}
        buildingData={selectedBuilding}
      />
      {/*Деревья*/}
      <img src={image6} alt="" className="img6" />
      <img src={image7} alt="" className="img7" />
      <img src={image10} alt="" className="img10" />
      <img src={image11} alt="" className="img11" />
      <img src={image12} alt="" className="img12" />
      <img src={image13} alt="" className="img13" />
      <img src={image14} alt="" className="img14" />
      <img src={image15} alt="" className="img15" />
      <img src={image16} alt="" className="img16" />
      <img src={image17} alt="" className="img17" />
      <img src={image18} alt="" className="img18" />
      <img src={image10} alt="" className="img30" />
      <img src={image11} alt="" className="img31" />
      <img src={image12} alt="" className="img32" />
      <img src={image13} alt="" className="img33" />
      <img src={image14} alt="" className="img34" />
      <img src={image15} alt="" className="img39" />
      <img src={image16} alt="" className="img36" />
      <img src={image17} alt="" className="img37" />
      <img src={image18} alt="" className="img38" />
      <img src={image10} alt="" className="img40" />
      <img src={image11} alt="" className="img41" />
      <img src={image12} alt="" className="img42" />
      <img src={image13} alt="" className="img43" />
      <img src={image14} alt="" className="img44" />
      <img src={image15} alt="" className="img45" />
      <img src={image16} alt="" className="img46" />
      <img src={image17} alt="" className="img47" />
      <img src={image18} alt="" className="img48" />
      <img src={image11} alt="" className="img49" />
      <img src={image11} alt="" className="img50" />
      <img src={image10} alt="" className="img51" />
      <img src={image11} alt="" className="img52" />
      <img src={image12} alt="" className="img53" />
      <img src={image13} alt="" className="img54" />
      <img src={image14} alt="" className="img55" />
      <img src={image15} alt="" className="img56" />
      <img src={image16} alt="" className="img57" />
      <img src={image17} alt="" className="img58" />
      <img src={image18} alt="" className="img59" />
      <img src={image10} alt="" className="img60" />
    </div>
  );
}
export default Home;
