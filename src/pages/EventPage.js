import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
    <div style={{ /* стили */ }}>
      {/* Левая часть: картинка */}
      <div style={{ flex: '0 0 320px', marginRight: '40px' }}>
        <img
          src={`/img/${event.image}`}
          alt={event.title}
          style={{ width: '320px', height: 'auto', borderRadius: '16px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}
        />
      </div>
  
      {/* Правая часть: описание */}
      <div style={{ flex: '1 1 0', background: '#f8f8f8', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
        <h2 style={{ marginTop: 0 }}>{event.title}</h2>
        <p style={{ fontSize: '18px', marginBottom: 24 }}>{event.description}</p>
        <h3 style={{ marginBottom: 8 }}>Место проведения</h3>
        {event.cabinet && event.cabinet.floor && event.cabinet.floor.building ? (
          <p>
            <b>Кабинет:</b> {event.cabinet.name} ({event.cabinet.description})<br/>
            <b>Этаж:</b> {event.cabinet.floor.name}<br/>
            <b>Здание:</b> {event.cabinet.floor.building.name}<br/>
            <b>Адрес:</b> {event.cabinet.floor.building.address}
          </p>
        ) : (
          <p>Данные о месте проведения отсутствуют</p>
        )}
      </div>
    </div>
  );
  
};

export default EventPage;
