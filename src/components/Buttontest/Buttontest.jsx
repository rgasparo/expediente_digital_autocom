
import styles from './styles.module.css';

const Btn = () => {
 
  const handleClick = () => {
    alert('¡Botón clickeado!');
  };

  return (
    <button onClick={handleClick} className={`${styles.btn} hidden lg:block`}>
      Haz clic aquí
    </button>
  );
};


export default Btn;