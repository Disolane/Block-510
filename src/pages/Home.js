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
import { Link } from 'react-router-dom';

import "../styles/main.css";
import "../styles/testhome.css"


const Modal = ({ showModal, onClose, images, buildingData }) => {
    if (!showModal) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <Link className="button4" to="second-page">
            <span className="button-text">Подробнее о корпусе</span>
          </Link>
  
          <div className="image-segment">  {/* Оборачиваем в новый контейнер */}
            <div className="modal-images">
              {images.length > 0 ? (
                images.map((imgSrc, index) => (
                  <img src={imgSrc} alt={`image-${index}`} className="modal-image" key={index} />
                ))
              ) : (
                <p>Фото отсутствует</p>
              )}
            </div>
          </div> {/* Закрываем контейнер */}
  
          {buildingData && (
            <div className="building-info">
              <div className="info-segment">
                <div className="info-label">Название:</div>
                <div className="info-value">{buildingData.name}</div>
              </div>
  
              <div className="info-segment">
                <div className="info-label">Описание:</div>
                <div className="info-value">{buildingData.description}</div>
              </div>
  
              <div className="info-segment">
                <div className="info-label">Адрес:</div>
                <div className="info-value">{buildingData.address}</div>
              </div>
  
              <div className="info-segment">
                <div className="info-label">Тип корпуса:</div>
                <div className="info-value">{buildingData.types}</div>
              </div>
            </div>
          )}
  
          <button className="close-button" onClick={onClose}>X</button>
        </div>
      </div>
    );
  };
  


  const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedBuildingId, setSelectedBuildingId] = useState(null);
    const [buildings, setBuildings] = useState([]);
    const [selectedBuilding, setSelectedBuilding] = useState(null);

    // Загрузка данных о зданиях
    useEffect(() => {
        fetch("/api/buildings")
          .then(response => response.json())
          .then(data => {
            console.log("Buildings from API:", data); // <-- проверь здесь
            const buildingsFormatted = data.map(b => ({
              id: b.ID,
              name: b.Name,
              image: b.Image,
              description: b.Description,
              address: b.Address,
              types: b.Types,
              facts: b.Facts,
            }));
            setBuildings(buildingsFormatted);
          })
          .catch(error => console.error('Ошибка при загрузке данных:', error));
      }, []);
      

    // Соответствие: индекс здания на карте → реальный ID здания из базы
    const mapIndexToBuildingId = {
        1: 2, // корпус с индексом 1 на карте - это здание с ID=2 в базе // Второй корпус
        2: 3, // Четвертый корпус
        3: 5, // Шестой корпус
        4: 1, // Первый корпус
        5: 4, // Пятый корпус
    };

  // Объект сопоставления id здания -> картинка
  const imageMap = {
    1: image1, //SecondBuilding
    2: image2, //FourthyBuilding
    3: image3, //SixthyBuilding
    4: image4, //FirstBuilding
    5: image5, //FifthyBuilding
  };


  const handleImageClick = (indexOnMap) => {
    const buildingId = mapIndexToBuildingId[indexOnMap];
    console.log("Clicked map index:", indexOnMap, "maps to building ID:", buildingId);
    const buildingData = buildings.find(b => b.id === buildingId);
    console.log("Building data:", buildingData);
  
    const images = buildingData && buildingData.image
      ? [`/img/${buildingData.image}`]
      : [];
    console.log("Images to show:", images);
  
    setSelectedImages(images);
    setSelectedBuildingId(buildingId);
    setSelectedBuilding(buildingData || null);
    setShowModal(true);
  };
  

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBuildingId(null);
    setSelectedBuilding(null);
  };


  return (
    <div className="body">
      <img src={image} alt="Background" className="img" />

      {[1, 2, 3, 4, 5].map(indexOnMap => {
        const buildingId = mapIndexToBuildingId[indexOnMap];
        const building = buildings.find(b => b.id === buildingId);
        return (
          <img
            key={indexOnMap}
            src={imageMap[indexOnMap] || ''}
            alt={building ? building.name : `Building ${indexOnMap}`}
            className={`img${indexOnMap} ${selectedBuildingId === buildingId ? "highlighted" : ""}`}
            onClick={() => handleImageClick(indexOnMap)}
            style={{ cursor: 'pointer' }}
          />
        );
      })}

      
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
