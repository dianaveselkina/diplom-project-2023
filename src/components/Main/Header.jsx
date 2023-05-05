import { ReactComponent } from '../img/logo.svg';
import './style.css';
// import { Link } from 'react-router-dom';
export const Header = () => {
  return (
    <div className="header">
      <ReactComponent className="header__logotip" />
      <span className="header__titlle">
        Журнал
        <br />
        Весёлые заметки
      </span>
      <button className="header__button" type="button">
        Прислать заметку
      </button>
    </div>
  );
};
