import CloseGrayBtn from '../../../src/assets/closeGray.svg';
import styles from './styles.module.css';

const ReverseStep = ({ title, tipo, handlerStep, handleClose }) => {

  const reverseContent = [
    {
      tipo: "identificacion reverso",
      content: (
        <>
          <p>Ya guardamos la foto que tomaste</p>
          <p className="mt-0">
            Ahora captura el <span className="negrita">REVERSO</span> de tu identificación.
          </p>
          <p className="mt-0">Tienes que hacer lo mismo que al tomar la foto anterior.</p>
        </>
      ),
    },
    {
      tipo: "Tarjeta de circulación (vuelta)",
      content: (
        <>
          <p>Ya guardamos la foto que tomaste</p>
          <p className="mt-0">
            Ahora captura el <span className="negrita">REVERSO</span> de la tarjeta de circulación.
          </p>
          <p className="mt-0">Tienes que hacer lo mismo que al tomar la foto anterior.</p>
        </>
      ),
    },
  ];
  
  const content = reverseContent.find(item => item.tipo === tipo)?.content;

  return (
    <div className={`${styles.modal} tw-w-3/4 md:tw-w-2/3 lg:tw-w-1/3 tw-mx-auto`}>
      <div>
        <div className={`${styles['wrapper-close']} tw-relative tw-p-0`}>
          <p>
            <button type="button" onClick={handleClose}>
              <img className="close-ico" src={CloseGrayBtn} alt="close icon" />
            </button>
          </p>
        </div>
        <div className={`${styles['wrapper-info']}`}>
          <h2>{title}</h2>
          {content}
          <button type="button" onClick={handlerStep} className={`${styles.modalBtn} tw-w-full md:tw-w-3/3 tw-mt-8 tw-mb-4 tw-h-12`}>
            TOMAR O CARGAR FOTO DEL REVERSO
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReverseStep;
