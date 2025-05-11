import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/Floors.css";

const API_URL = 'http://localhost:3001/api/floors'; 

const TestFloor = () => {
  const { floorId } = useParams();
  const navigate = useNavigate();

  const [floor, setFloor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!floorId) {
      setError('Не указан ID этажа');
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/${floorId}`)
      .then(res => {
        if (!res.ok) throw new Error('Ошибка загрузки этажа');
        return res.json();
      })
      .then(data => {
        setFloor(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [floorId]);

  if (loading) return <div className="loading">Загрузка этажа...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!floor) return <div className="error">Этаж не найден</div>;

    return (
        <div className="fon1">
            <div className="floor-page-wrapper">
                <div className="floor-title-container">
                    <h1 className="floor-title">{floor.number ? `Этаж №${floor.number}` : 'Этаж'}</h1>
                </div>

                <div className="floor-description-container">
                    <p className="floor-description">{floor.description}</p>
                </div>

                <div className="floor-image-container">
                    <img 
                        src={`/img/${floor.image}`} 
                        alt={`Этаж №${floor.number}`} 
                        className="floor-image"
                    />
                </div>

                <button onClick={() => navigate(-1)} className="back-button">Назад</button>
            </div>
        </div>
    );


};

export default TestFloor;
