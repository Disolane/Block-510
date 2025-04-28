import React, { useState } from 'react';
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
import image61 from"../img/Image.png"
import image62 from"../img/Image (2).png"
import image63 from"../img/Image (3).png"
import image64 from"../img/Image (4).png"
import { Link } from 'react-router-dom';
const Modal = ({ showModal, onClose, images, buildingData, loading, error }) => {
  if (!showModal) return null;

  if (loading) return <div className="modal-overlay"><div style={{ padding: 40 }}>Загрузка...</div></div>;
  if (error) return <div className="modal-overlay"><div style={{ padding: 40 }}>{error}</div></div>;
  if (!buildingData) return <div className="modal-overlay"><div style={{ padding: 40 }}>Данные о корпусе не найдены</div></div>;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>

        <div className="event-container">
          {/* Левая часть — изображение */}
          <div className="image-container">
            {images && images.length > 0 ? (
              images.map((imgSrc, index) => (
                <img
                  src={imgSrc}
                  alt={`building-${index}`}
                  className="event-image"
                  key={index}
                />
              ))
            ) : (
              <img
                src={`/img/${buildingData.image}`} // Путь к изображению из базы
                alt={buildingData.name}
                className="event-image"
              />
            )}
          </div>

          {/* Правая часть — текст */}
          <div className="description-container">
            <h2>{buildingData.name}</h2>
            <p className="description-text">{buildingData.description}</p>
            <h3>Информация</h3>
            <p>
              <b>Тип:</b> {buildingData.types || 'Не указан'}<br />
              <b>Адрес:</b> {buildingData.address || 'Адрес отсутствует'}
            </p>

            <Link className="button4" to={`/building/${buildingData.id}`}>
              <span className="button-text">Подробнее о корпусе</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
const API_URL = 'http://localhost:3001/api/buildings';
const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageClick = async (index) => {
    // Здесь вы можете заранее определить изображения для каждого здания
    let images = [];
    switch (index) {
      case 1: images = [image61]; break;
      case 2: images = [image62]; break;
      case 3: images = [image64]; break;
      case 4: images = [image29]; break;
      case 5: images = [image63]; break;
      default: images = [];
    }

    setSelectedImages(images);
    setSelectedImage(index);
    setShowModal(true);
    setLoading(true);
    setError(null);

    try {
      // Запрос данных о здании по ID (используем index как buildingId)
      const response = await fetch(`${API_URL}/${index}`);
      if (!response.ok) throw new Error('Здание не найдено');
      const data = await response.json();
      setSelectedBuilding(data); // Устанавливаем данные о здании в состояние
    } catch (err) {
      setError(err.message);
      setSelectedBuilding(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
    setSelectedBuilding(null);
    setError(null);
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
      
      <Modal 
        showModal={showModal} 
        onClose={handleCloseModal} 
        images={selectedImages}
        buildingData={selectedBuilding}
        loading={loading}
        error={error}
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
