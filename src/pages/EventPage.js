import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../styles/Event.css"

import img from "../img/Images.png";

const API_URL = 'http://localhost:3001/api/events'; // Укажи свой адрес API

const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/${eventId}`)
      .then(res => res.json())
      .then(data => {
        setEvent(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Ошибка загрузки данных');
        setLoading(false);
      });
  }, [eventId]);

  if (loading) return <div style={{ padding: 40 }}>Загрузка...</div>;
  if (error || !event) return <div style={{ padding: 40 }}>{error || 'Мероприятие не найдено'}</div>;

  return (
    <div className="fon1">
      <div className="page-wrapper">
        <div className="event-container">
          {/* Левая часть: картинка */}
          <div className="image-container">
            <img
              src={`/img/${event.image}`}
              alt={event.title}
              className="event-image"
            />
          </div>

          {/* Правая часть: описание */}
          <div className="description-container">
            <h2>{event.title}</h2>
            <p className="description-text">{event.description}</p>
            <h3>Место проведения</h3>
            {event.cabinet && event.cabinet.floor && event.cabinet.floor.building ? (
              <p>
                <b>Кабинет:</b> {event.cabinet.name} ({event.cabinet.description})<br />
                <b>Этаж:</b> {event.cabinet.floor.name}<br />
                <b>Здание:</b> {event.cabinet.floor.building.name}<br />
                <b>Адрес:</b> {event.cabinet.floor.building.address}
              </p>
            ) : (
              <p>Данные о месте проведения отсутствуют</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
