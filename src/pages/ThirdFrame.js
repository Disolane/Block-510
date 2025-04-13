import React from 'react';
import '../styles/main.css';
import buildingImg from '../img/1stBuildingSmallPicture.png';

const ThirdFrame = () => {
  const cards = [
    {
      title: "Возле корпуса №1",
      subtitle: "Главная",
      image: buildingImg,
      onClick: () => alert("Переход к 'Главная'"), // Пример действия
    },
    {
      title: "Этаж №1",
      subtitle: "Главный этаж корпуса №1",
      image: buildingImg,
      onClick: () => alert("Переход к 'Этаж №1'"),
    },
    {
      title: "Этаж №2",
      subtitle: "Вторичный этаж корпуса №1",
      image: buildingImg,
      onClick: () => alert("Переход к 'Этаж №2'"),
    },
    {
      title: "Этаж №3",
      subtitle: "Дополнительный этаж корпуса №1",
      image: buildingImg,
      onClick: () => alert("Переход к 'Этаж №3'"),
    },
  ];

  return (
    <div className="body">
      <div className="container" style={{ marginTop: '40px', marginLeft: '250px', display: 'flex' }}>
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={card.onClick}
            style={{
              width: '217px',
              borderRadius: '15px',
              overflow: 'hidden',
              background: '#FFC5C5',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              textAlign: 'center',
              marginRight: '20px',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img
              src={card.image}
              alt={card.title}
              style={{ width: '100%', height: '149px', objectFit: 'cover' }}
            />

            <div style={{ backgroundColor: '#FF7878', padding: '10px' }}>
              <h3 style={{ fontSize: '20px', margin: 0 }}>{card.title}</h3>
            </div>

            <div style={{ backgroundColor: '#FFC5C5', padding: '10px', flexGrow: 1 }}>
              <p style={{ fontSize: '16px', margin: 0 }}>{card.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThirdFrame;