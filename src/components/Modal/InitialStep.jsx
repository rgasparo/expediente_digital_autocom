import { useEffect, useState } from 'react';
import CloseBtn from '../../../src/assets/close.svg';
import styles from './styles.module.css';

const InitialStep = ({ 
  tipo,
  title,
  identificacion,
  setIdentificacion,
  tipoFactura,
  setTipoFactura,
  anoFactura,
  setAnoFactura,
  years,
  handlerStep,
  handleClose,
  header 
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [buttonClass, setButtonClass] = useState('modalBtnDisabled');

  useEffect(() => {
    const isDisabled = (tipo === "factura actual" && (!tipoFactura || !anoFactura)) || 
                      (tipo === "identificacion" && !identificacion);

    setIsButtonDisabled(isDisabled);
    setButtonClass(isDisabled ? `${styles.modalBtnDisabled}` : `${styles.modalBtn}`);
  }, [tipo, identificacion, tipoFactura, anoFactura]);

  const modalContent = [
    {
      id: 1,
      tipo: "identificacion",
      content: (
        <>
          <p>Enfoca bien y captura el documento completo.</p>
          <p className="md:tw-mt-0">Evita reflejos o sombras.</p>
          <div className="tw-grid tw-grid-cols-1 tw-gap-4 tw-mt-4">
            <label className={`${styles['label']}`}>
              <span className={`${styles['labelSpan']}`}>¿Qué identificación es?</span>
            </label>
            <select 
              className={`${styles.select}`} 
              value={identificacion || ""}
              onChange={(e) => setIdentificacion(e.target.value)}
            >
              <option value="INE">INE</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>
          </div>
        </>
      ),
    },
    
    {
      id: 2,
      tipo: "Comprobante de Domicilio",
      content: (
        <>
          <p>Los documentos permitidos son:</p>
          <ul className={`${styles['list-disc']} modal-lista`}>
            <li>Recibo de luz</li>
            <li>Recibo de agua</li>
            <li>Recibo predial</li>
            <li>Estado de cuenta bancario con domicilio</li>
            <li>Recibo de teléfono</li>
          </ul>
        </>
      ),
    },
    {
      id: 3,
      tipo: "Tarjeta de circulación",
      content: (
        <>
          <p>Enfoca bien y captura el documento completo.</p>
          <p className="md:tw-mt-0">Evita reflejos o sombras.</p>
          <p>
            Si la tarjeta de circulación no está a tu nombre necesitarás llevar copia de la identificación del propietario de la tarjeta de circulación el día de la inspección para poder realizar la venta.
          </p>
        </>
      ),
    },
    {
      id: 4,
      tipo: "factura actual",
      content: (
        <>
          <p>Enfoca bien y captura el documento completo.</p>
          <p className="md:tw-mt-0">Evita reflejos o sombras.</p>
          <div className="tw-grid tw-grid-cols-1 tw-gap-4 tw-mt-4">
            <label className={`${styles['label']}`}>
              <span className={`${styles['labelSpan']}`}>¿Qué tipo de factura es?</span>
            </label>
            <select className={`${styles.select}`}  value={tipoFactura || ""} onChange={(e) => setTipoFactura(e.target.value)}>
              <option value="">Elige una opción</option>
              <option value="Factura original">Factura original</option>
              <option value="Refactura de agencia">Refactura de agencia</option>
              <option value="Refactura de aseguradora">Refactura de aseguradora</option>
              <option value="Refactura de empresa">Refactura de empresa</option>
            </select>
            <label className={`${styles['label']}`}>
              <span className={`${styles['labelSpan']}`}>¿En qué año fue emitida la factura?</span>
            </label>
            <select className={`${styles.select}`}  value={anoFactura || ""} onChange={(e) => setAnoFactura(e.target.value)}>
              <option value="">Elige una opción</option>
              {years?.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <h3 className={`${styles['nota-factura']} tw-mt-8`}>Para autos con factura original</h3>
          <p>
            Antes de concretar la venta de tu auto, necesitarás los archivos PDF y XML de la factura. Si no los tienes, solicítalos a la agencia que emitió la factura.
          </p>
          <h3 className={`${styles['nota-factura']} tw-mt-2`}>Para autos refacturados:</h3>
          <p>
            Antes de concretar la venta de tu auto necesitarás la factura original actual y copia de todas las anteriores (en caso de existir).
          </p>
        </>
      ),
    },
  ];

  const content = modalContent.find(item => item.tipo === tipo)?.content;

  return (
    <div className={`${styles['modal']} tw-w-3/4 md:tw-w-2/3 lg:tw-w-2/6 tw-mx-auto`}>
      <div className={`${styles['wrapper-close']} tw-relative tw-p-0`}>
        <div className='tw-w-full tw-flex tw-justify-end'>
          <button type="button" onClick={handleClose}>
            <img src={CloseBtn} alt="close Icon" className={`${styles.closeIcon}`}/>
          </button>
        </div>
      </div>
      <img className={`${styles['bgImg']} tw-w-full`} src={header} alt={tipo} />
      <div className={`${styles['wrapper-info']}`}>
        <h2>{title}</h2>
        {content}
        <button 
          type="button" 
          onClick={handlerStep} 
          className={`${buttonClass} tw-w-full md:tw-w-2/3 tw-mt-8 tw-mb-4`} 
          disabled={isButtonDisabled}
        >
          TOMAR O CARGAR FOTO
        </button>
      </div>
    </div>
  );
};

export default InitialStep;
