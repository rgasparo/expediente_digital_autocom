import CameraBtn from '../../../src/assets/camera.svg';
import ImageBtn from '../../../src/assets/icoImg.svg';
import CloseBtn from '../../../src/assets/close.svg';
import { handleTakePhoto, handleFileChange } from "../../utils/modal";
import styles from './styles.module.css';

const CameraStep = ({ setSelectedFile = '', setStep = '', handleClose, Camera }) => {
  const handleFileInputClick = (fileId) => document.getElementById(fileId).click();

  const getIdealResolution = () => {
    const isMobile = window.innerWidth <= 768;
    return {
      width: isMobile ? (window.innerWidth / 1.8) : (window.innerWidth / 5),
      height: (window.innerHeight / 2)
    };
  };

  return (
    <div className={`${styles['wrapper-camera']} tw-w-10/12 md:tw-w-2/3 lg:tw-w-2/6`}>
      <div className={`${styles['wrapper-close']} tw-relative tw-p-0`}>
      <div className='tw-w-full tw-flex tw-justify-end'>
          <button type="button" onClick={handleClose}>
            <img src={CloseBtn} alt="close icon" />
          </button>
      </div>
      </div>
      <p className={`${styles['copy']}`}>Toma la foto centrada dentro del recuadro</p>
      <div id="cam" className={`${styles['camera']} tw-mx-auto tw-w-9/12 tw-mt-8`}>

        <Camera
          onTakePhoto={(dataUri) => {
           handleTakePhoto(dataUri, setSelectedFile, setStep);
          }}
          isDisplayStartCameraError={true}
          isFullscreen={false}
          imageCompression={0.97}
          idealResolution={getIdealResolution()}
        />

      </div>
      <div className="tw-grid tw-grid-cols-5 tw-gap-4 tw-mt-8">
        <div></div>
        <div></div>
        <div>
          <button onClick={() => {document.getElementById('inner-circle').click();}}>
            <img src={CameraBtn} alt="Camera" />
          </button>
        </div>
        <div>
          <button className="tw-mt-2" onClick={() => handleFileInputClick('fileScanner')}>
            <img src={ImageBtn} alt="Image" />
          </button>
        </div>
        <div></div>
      </div>
      <input
        id="fileScanner"
        type="file"
        accept="image/*"
        onChange={(event) => handleFileChange(event, 1, setSelectedFile, setStep)}
        className="tw-hidden"
      />
    </div>
  );
};

export default CameraStep;