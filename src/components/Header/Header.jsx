import { ReactComponent } from '../img/logo.svg';
import './header.css';
export const Header = () => {
  return (
    <div className="header">
      <ReactComponent className="header__logotip" />
      <span className="header__titlle">
        Повеселись
        <br />с нами
      </span>
      <button
        className="header__button"
        type="button"
        onClick={() => console.log('Есть контакт!')}
      >
        Создание поста
      </button>
    </div>
  );
};
