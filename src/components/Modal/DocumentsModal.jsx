import { useState, useEffect, useCallback } from "react";
import { upload } from "../../utils/modal";
import InitialStep from "./InitialStep";
import PreviewStep from "./PreviewStep";
import LoaderComponent from "./LoaderComponent";
import CameraStep from "./CameraStep";
import ReverseStep from "./ReverseStep";
import styles from './styles.module.css';

const DocumentsModal = ({
  ano,
  marca,
  modelo,
  version,
  color,
  kilometraje,
  oferta,
  inspeccion,
  fecha,
  hora,
  open,
  tipo,
  tipoFactura, 
  anoFactura, 
  step, 
  title, 
  identificacion, 
  setIdentificacion,
  setTitle,
  setStep,
  setAnoFactura,
  setTipoFactura,
  setAno,
  setMarca,
  setModelo,
  setVersion,
  setColor,
  setKilometrake,
  setOferta,
  setInspeccion,
  setFecha,
  setHora,
  setOpen,
  setTipo,
  uploadDocument,
  setExpediente,
  setToken,
  isComplete, 
  exists,
  sendMessage,
  imgDomicilio,
  imgFactura,
  imgIne,
  imgLicencia,
  Camera
}) => {

    const STEPS = {
      INITIAL: 1,
      CAMERA: 2,
      PREVIEW: 3,
      LOADING: 4,
      REVERSE: 5,
    };

    const [selectedFile, setSelectedFile] = useState(null);
    const [image, setImage] = useState('');
    const [header, setHeader] = useState('');
    const [years, setYears] = useState([]); 
    
    const imageMap = {
        'identificacion': imgIne,
        'Comprobante de Domicilio': imgDomicilio,
        'Tarjeta de circulación': imgLicencia,
        'factura actual': imgFactura,
    };
    
    useEffect(() => {
        setYears(Array.from({ length: new Date().getFullYear() - 1949 }, (_, i) => new Date().getFullYear() - i));
    }, []);
    
    useEffect(() => {
        if (selectedFile) {
          const reader = new FileReader();
          reader.onloadend = () => setImage(reader.result);
          reader.readAsDataURL(selectedFile);
        }
    }, [selectedFile]);

    useEffect(() => {
        if (tipo) {
          const titles = {
            identificacion: "Identificación - FRENTE",
            "Comprobante de Domicilio": "Comprobante de domicilio",
            "Tarjeta de circulación": "Tarjeta de circulación - FRENTE",
            "factura actual": "Factura actual - FRENTE",
            "identificacion reverso": "Identificación - REVERSO",
            "Tarjeta de circulación (vuelta)": "Tarjeta de circulación - REVERSO",
          };
      
          if (titles[tipo]) {
            setTitle(titles[tipo]);
            setHeader(imageMap[tipo] || "");
          } else {
            setTitle("");
            setHeader("");
          }
        }
    }, [tipo, setTitle, setHeader, imgIne, imgDomicilio, imgLicencia, imgFactura ]);

    const handleClose = () => setOpen(false);
    
    const handlerStep = () => setStep(STEPS.CAMERA);

    const renderStepsContent = useCallback(() => {
        switch (step) {
        case STEPS.INITIAL:
            return (
            <InitialStep
                tipo={tipo}
                title={title}
                identificacion={identificacion}
                setIdentificacion={setIdentificacion}
                tipoFactura={tipoFactura}
                setTipoFactura={setTipoFactura}
                anoFactura={anoFactura}
                setAnoFactura={setAnoFactura}
                years={years}
                handlerStep={handlerStep}
                header={header}
                handleClose={handleClose}
            />
            );
        case STEPS.CAMERA:
            return (
            <CameraStep
              setSelectedFile={setSelectedFile}
              setStep={setStep}
              handleClose={handleClose}
              Camera={Camera}
            />);
        case STEPS.PREVIEW:
            return (
            <PreviewStep
                title={title}
                image={image}
                upload={upload}
                setStep={setStep}
                tipo={tipo}
                identificacion={identificacion}
                selectedFile={selectedFile}
                uploadDocument={uploadDocument}
                handlerStep={handlerStep}
                handleClose={handleClose}
                sendMessage={sendMessage}
            />
            );
        case STEPS.LOADING:
            return <LoaderComponent />;
        case STEPS.REVERSE:
            return <ReverseStep title={title} tipo={tipo} handlerStep={handlerStep} handleClose={handleClose} />;
        default:
            return null;
        }
    }, [step, tipo, title, identificacion, tipoFactura, anoFactura, years, image, selectedFile]);

    return (
      <div 
        className={`${styles['wrapper-modal']} tw-fixed tw-size-full tw-top-0 tw-place-items-center tw-text-center tw-flex tw-justify-center`}
      >
        {renderStepsContent()}
      </div>
    );
    
};

export default DocumentsModal;
