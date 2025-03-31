import Navbar_second from "../nav/Navbar_second";
import CardBuilding from "../img/Group 105.png";
import CardDescription from "../img/Group 106.png";
import CardSound from "../img/SoundButton.png";
import CardButton from "../img/ButtonForMoveToFloors.png";
import Building from "../img/PictureOfFirstBuildingForBuldingFrame.png";


const SecondFrame = () => {
    return (
      <div className="body">
        <Navbar_second />
        
        <div className="main-container">
          <div className="central-window">
            <div className="left-content">
              <div className="CardBuilding">
                <span className="card-text">Корпус 1</span>
              </div>
              <div className="CardDescription">
                <span className="card-text">Описание</span>
              </div>
              <div className="CardSound">
                <div className="sound-control">
                  <button className="sound-button" onClick={() => handleSoundClick()}>
                    <span className="sound-icon">🔊</span>
                    <span className="sound-text">Включить звук</span>
                  </button>
                  <div className="sound-animation"></div>
                </div>
              </div>
              <div className="CardButton">
                <button className="nav-button" onClick={() => handleButtonClick()}>
                  <span className="button-text">Перейти к выбору этажа</span>
                </button>
              </div>
            </div>
            <img src={Building} alt="" className="Building" />
          </div>
        </div>
      </div>
    );
  };
  
  // Обработчики
  const handleSoundClick = () => {
    // Логика для звука и анимации
  };
  
  const handleButtonClick = () => {
    // Логика для перехода
  };
  
  
 
export default SecondFrame;
  