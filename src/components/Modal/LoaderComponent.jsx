import LoaderIcon from '../../../src/assets/loader.svg';
import styles from './styles.module.css';

const LoaderComponent = () => (
  <div className={`${styles['wrapper-loader']} tw-w-11/12 md:tw-w-2/3 lg:tw-w-1/3 tw-flex tw-items-center tw-justify-center`}>
    <div className={`${styles['wrapper-loader']}`}>
      <p className="tw-mt-4 tw-mb-4">Estamos cargando la foto</p>
      <img className="tw-mx-auto" src={LoaderIcon} alt="Loading" />
      <p className="tw-mt-4 tw-mb-4">Espera unos segundos...</p>
    </div>
  </div>
);

export default LoaderComponent;
