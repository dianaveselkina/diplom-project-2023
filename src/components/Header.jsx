import { ReactComponent } from './img/logo.svg';
import './style.css';
export const Header = () => {
  return (
    <div className="header">
      <ReactComponent className="header__logotip" />
      <span className="header__titlle">
        Журнал
        <br />Весёлые заметки
      </span>
      <button
        className="header__button"
        type="button"
        onClick={() => console.log('Есть контакт!')}
      >
        Прислать заметку
      </button>
    </div>
  );
};
