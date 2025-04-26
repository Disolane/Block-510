import React from 'react';
import buildingImg from '../img/1stBuildingSmallPicture.png';

const ThirdFrame = () => {
  const cards = [
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
    <div style={{ 
      minHeight: '100vh',
      padding: '40px 0',
      backgroundColor: '#F8EBE2',
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        padding: '0 20px 30px', // Добавлен отступ снизу 30px
        position: 'absolute',
        top:'300px',
        left:'500px'
      }}>
        <div style={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: '30px',
          justifyContent: 'center',
          paddingBottom: '30px' // Альтернативный вариант добавления отступа
        }}>
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={card.onClick}
              style={{
                width: '346px',
                height: '554px',
                borderRadius: '15px',
                overflow: 'hidden',
                background: '#F89696', 
                boxShadow: '0 4px 15px rgba(67, 16, 26, 0.2)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                marginBottom: '30px' // Отступ для каждой карточки
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(67, 16, 26, 0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(67, 16, 26, 0.2)';
              }}
            >
              <div style={{
                width: '100%',
                height: '400px',
                overflow: 'hidden'
              }}>
                <img
                  src={card.image}
                  alt={card.title}
                  style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>

              <div style={{ 
                backgroundColor: '#FF7878', 
                padding: '20px',
                flexShrink: 0
              }}>
                <h3 style={{ 
                  fontSize: '24px', 
                  margin: 0,
                  color: '#F8EBE2', // Изменено на #F8EBE2
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}>
                  {card.title}
                </h3>
              </div>

              <div style={{ 
                backgroundColor: '#F89696', 
                padding: '20px',
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <p style={{ 
                  fontSize: '18px', 
                  margin: 0,
                  color: '#F8EBE2', // Изменено на #F8EBE2
                  textShadow: '1px 1px 1px rgba(0,0,0,0.2)'
                }}>
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThirdFrame;