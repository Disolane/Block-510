import "../styles/main.css";
import image8 from "../img/BackFirstButton.png";
import image9 from "../img/BackSecButt.png";

const Navbar=()=>{
return(
      <nav className="nav">
        <div className="container">
          <button className="button">
            <span className="text">
              <p>Выбрать</p>
              <p>мероприятие</p>
            </span>
          </button>
          <button className="button1">
           <img src={image8} width="114" height="106" alt="" className="img8" />
           </button>
           <button className="button2">
           <img src={image9} width="114" height="106" alt="" className="img9" />
         </button>
        </div>
      </nav>
);
}
export default Navbar;