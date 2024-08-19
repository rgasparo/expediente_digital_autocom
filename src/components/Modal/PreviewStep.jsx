import CloseGrayBtn from '../../../src/assets/closeGray.svg';
import styles from './styles.module.css';

const PreviewStep = ({
  title,
  image,
  upload,
  setStep,
  tipo,
  identificacion,
  selectedFile,
  uploadDocument,
  handlerStep,
  handleClose,
  handlerClick,
  sendMessage,
}) => (
  <div className={`${styles['wrapper-preview']} tw-w-10/12 md:tw-w-2/3 lg:tw-w-1/3`}>
    <div className={`${styles['wrapper-close']} tw-relative tw-p-0`}>
      <p>
        <button type="button" onClick={handleClose}>
          <img src={CloseGrayBtn} alt="close icon" />
        </button>
      </p>
    </div>
    <div className={`${styles['wrapper-info']}`} >
      <h2>{title}</h2>
      <p className='tw-text-left'>Revisa que la imagen y los datos se vean claros y confirma</p>
    </div>
    <div className="camera tw-mx-auto tw-w-9/12">
      <img className={`tw-mx-auto ${styles.document}`} src={image} alt="Document" />
    </div>
    <div className={`${styles['wrapper-info']} tw-flex tw-mx-auto tw-gap-2 md:tw-gap-4`}>
      <button
        type="button"
        onClick={() => upload(setStep, tipo, identificacion, selectedFile, uploadDocument, sendMessage)}
        className={`${styles.modalBtn} tw-w-full tw-mb-4 md:tw-order-2`}
      >
        CONFIRMAR
      </button>
      <button type="button" onClick={handlerStep} className={`${styles.secondary} tw-w-full tw-mb-4 md:tw-order-1`}>
        REPETIR
      </button>
    </div>
  </div>
);

export default PreviewStep;
