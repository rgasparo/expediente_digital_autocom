import {useEffect, useState } from "react"
import useDocuments from '../../hooks/useDocuments';
import Modal from "../../components/Modal/DocumentsModal";
import Camera from "react-html5-camera-photo";
import Complete from "../../assets/complete.svg";
import { useNavigate } from 'react-router-dom';
import { imgDomicilio, imgFactura, imgIne, imgLicencia } from '../../assets/images';
import { upload } from "../../utils/modal";
import "./styles.css";

const Documents = () => {

    const [docFlag, setDocFlag]=useState(false);
    const navigate = useNavigate();
    const querystring = window.location.search
    const params = new URLSearchParams(querystring)
    const expediente=params.get('expediente');
    const token=params.get('token'); 
    const src=params.get('src');

    if(!expediente || !token ){
        navigate("/notfound")
    }
    
    console.log(docFlag)

    const {
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
        setOpen,
        setTipo,
        uploadDocument,
        setExpedient,
        setToken,
        isComplete, 
        exists,
        sendMessage
    } = useDocuments()

    useEffect(() => {
        setExpedient(expediente);
        setToken(token);
    }, [expediente, token])


    const handlerClick = (e) =>{
        if(e.currentTarget.name==="Tarjeta de circulación"){
            if(exists("Tarjeta de circulación")){
                setStep(5);
                setTipo("Tarjeta de circulación (vuelta)");
                setOpen(true);
            }else{
                setStep(1);
                setTipo(e.currentTarget.name);
                setOpen(true);
            }
        }else if(e.currentTarget.name==="identificacion"){
            if(exists("identificacion")){
                setStep(5);
                setTipo("identificacion reverso");
                setOpen(true);
            }else{
                setStep(1);
                setTipo(e.currentTarget.name);
                setOpen(true);
            }
        }else{
            setStep(1);
            setTipo(e.currentTarget.name);
            setOpen(true);
        }
    }

    return (
        <div className="customContainer">
            <div className="tw-mx-auto tw-max-w-6xl tw-w-11/12">
                <h1 className="title">{src==='cr'?'COTIZADOR RÁPIDO':'VENDE TU AUTO'} <br className='lg:tw-hidden' /><span className="subtitle">CARGA DE DOCUMENTOS</span></h1>
            </div>

            <div className="container-main tw-mx-auto tw-max-w-6xl tw-w-11/12 tw-text-center tw-bg-white tw-rounded-2xl">
                <h2 className="unidad pt-2.5"><span className="color-gris-oscuro">{ano}</span> <span className="color-black">{marca}</span> <span className="color-black">{modelo}</span></h2>
                <h2 className="unidad2 color-rojo"><span className="color-gris-oscuro">{version}</span> | <span className="color-gris-oscuro">{color}</span> | <span className="color-gris-oscuro"> {kilometraje} KM</span></h2>
                <p className="oferta">NO. DE OFERTA: {oferta}</p>
                <p className="inspeccion">NO. DE INSPECCIÓN AGENDADA: {inspeccion}</p>

                <p className="copy">Necesitamos estos 4 documentos* previo a tu inspección del <span className="fecha-hora color-black">{fecha}</span> a las <span className="fecha-hora color-black">{hora}</span></p>
            
                <p className="instrucciones">Selecciona una opción para comenzar</p>    

             
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4 tw-w-11/12 lg:tw-w-8/12 tw-mx-auto">
                    <button 
                        name="identificacion" 
                        type='button' 
                        className={`${isComplete('identificacion') ? 'loaded tw-flex tw-items-center tw-justify-center' : 'modalBtn'} `}
                        disabled={isComplete('identificacion')} 
                        onClick={handlerClick}>
                            {isComplete('identificacion')?<img src={Complete} className="tw-mr-2"/>:<></>}IDENTIFICACIÓN (INE o PASAPORTE)
                    </button>
                    <button 
                        name="Comprobante de Domicilio" 
                        type='button' 
                        className={`${isComplete('Comprobante de Domicilio') ? 'loaded tw-flex tw-items-center tw-justify-center' : 'modalBtn'} `} 
                        disabled={isComplete('Comprobante de Domicilio')}
                        onClick={handlerClick}>
                            {isComplete('Comprobante de Domicilio')?<img src={Complete} className="tw-mr-2" />:<></>}COMPROBANTE DE DOMICILIO
                    </button>
                    <button 
                        name="Tarjeta de circulación" 
                        type='button' 
                        disabled={isComplete('Tarjeta de circulación')}
                        className={`${isComplete('Tarjeta de circulación')?'loaded tw-flex tw-items-center tw-justify-center' : 'modalBtn'} `}
                        onClick={handlerClick}>
                        {isComplete('Tarjeta de circulación')?<img src={Complete} className="tw-mr-2" />:<></>}TARJETA DE CIRCULACIÓN ACTUAL
                    </button>
                    <button 
                        name="factura actual" 
                        type='button' 
                        disabled={isComplete('factura actual')}
                        className={`${isComplete('factura actual')?'loaded tw-flex tw-items-center tw-justify-center' : 'modalBtn'} `}
                        onClick={handlerClick}>
                        {isComplete('factura actual')?<img src={Complete} className="tw-mr-2" />:<></>}FACTURA ACTUAL
                    </button>
                </div>

                <div className="sm: tw-p-5 lg:tw-p-0">
                    <p className="tips tw-text-left">Algunos tips para cargarlos con buena calidad:</p>

                    <ul className="lista tw-list-disc tw-text-left">
                        <li>Limpia la cámara y enfoca bien</li>
                        <li>Asegúrate que el documento se vea de forma completa</li>
                        <li>Toma las fotos en una superficie plana, sin brillos, sin reflejos y que no salgan oscuras</li>
                    </ul>
                </div>


                <p className="copy2">¿Quieres continuar después?</p>
                <p className="tips">En el mail de confirmación del agendamiento podrás encontrar el link para acceder a esta página en otro momento.</p>
                <p className="nota">*Puedes tomar fotos y/o cargarlos en .pdf con excelente calidad.</p>
                <button className="modalBtn tw-px-4 tw-px-2 tw-my-4">IR A LA PÁGINA PRINCIPAL</button>

                <p className="contacto">Si necesitas ayuda comunicate a <a className="contacto-bold">contacto@autocom.mx</a> o al tel: <a className="contacto-bold">800-711-2886</a></p>
            </div>
            {open?<Modal
                tipo={tipo}
                setOpen={setOpen}
                uploadDocument={uploadDocument}
                tipoFactura={tipoFactura} 
                anoFactura={anoFactura} 
                setAnoFactura={setAnoFactura}
                setTipoFactura={setTipoFactura}
                step={step} 
                setStep={setStep}
                title={title}
                setTitle={setTitle}
                identificacion={identificacion}
                setIdentificacion={setIdentificacion}
                sendMessage={sendMessage}
                imgDomicilio={imgDomicilio}
                imgFactura={imgFactura}
                imgIne={imgIne}
                imgLicencia={imgLicencia}
                Camera={Camera}
                upload={upload}
                setDocFlag={setDocFlag}
            />:<></>}    
        </div>
    );
}

export default Documents;
