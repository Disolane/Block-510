import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "../styles/Floors.css";
const TestThirdFrame = () => {
  const { buildingId } = useParams();

  const [floors, setFloors] = useState([]);
  const [buildingName, setBuildingName] = useState('');
  const [buildingImage, setBuildingImage] = useState(''); // Добавлено состояние для изображения
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка этажей
  useEffect(() => {
    if (!buildingId) {
      setError('Не указан ID корпуса');
      setLoading(false);
      return;
    }

    // Параллельно загружаем этажи и название корпуса
    Promise.all([
      fetch(`http://localhost:3001/api/buildings/${buildingId}/floors`)
        .then(res => {
          if (!res.ok) throw new Error('Ошибка загрузки этажей');
          return res.json();
        }),
      fetch(`http://localhost:3001/api/buildings/${buildingId}`)
        .then(res => {
          if (!res.ok) throw new Error('Ошибка загрузки корпуса');
          return res.json();
        })
    ])
      .then(([floorsData, buildingData]) => {
        console.log('Received buildingData:', buildingData);
        setFloors(floorsData);

        // Используем правильные ключи с учётом регистра
        const name = buildingData.Name; // с большой буквы!
        const image = buildingData.Image; // сохраняем изображение в состоянии

        setBuildingName(name || `Корпус №${buildingId}`);
        setBuildingImage(image || ''); // Устанавливаем изображение
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [buildingId]);

  const navigate = useNavigate();

  const handleFloorClick = (floorId) => {
    console.log('Selected floor ID:', floorId);
    navigate(`/floor/${floorId}`);
  };

  if (loading) return <div className="loading">Загрузка этажей...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="floors-page">
      <h1 className="building-title"> {buildingName}: Этажи</h1>
      
      <div className="floors-container">
        {floors.map(floor => (
          <div 
            key={floor.id}
            className="floor-card"
            onClick={() => handleFloorClick(floor.id)}
          >
            <div className="floor-image-container">
              {buildingImage && (
                <img 
                  src={`/img/${buildingImage}`} 
                  alt={`Этаж №${floor.number}`} 
                  className="floor-image"
                />
              )}
            </div>
            
            <div className="floor-info">
              <h2 className="floor-number">Этаж №{floor.number}</h2>
              <p className="floor-description">{floor.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestThirdFrame;
