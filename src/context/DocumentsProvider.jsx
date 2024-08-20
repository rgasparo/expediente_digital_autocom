import { useState, createContext, useEffect } from "react";
import clienteAxios, {clienteAxiosNotification} from '../config/axios';
//import * as Constants from '../utils/Constants';

//import { UNSAFE_DataRouterStateContext } from "react-router-dom";

const DocumentsContext = createContext();

const DocumentsProvider = ({ children }) => {

  //const {expediente, token, src} =useParams();

  const [ano, setAno] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [version, setVersion] = useState('');
  const [color, setColor] = useState('ROJO');
  const [kilometraje, setKilometrake] = useState('50,000');
  const [oferta, setOferta] = useState('')
  const [inspeccion, setInspeccion] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [open, setOpen] = useState(false);
  const [tipo, setTipo] = useState('');
  const [expediente, setExpedient] = useState(undefined);
  const [token, setToken] = useState(undefined);
  const [tipoFactura, setTipoFactura]=useState('');
  const [anoFactura, setAnoFactura]=useState('');
  const [step, setStep] = useState(1);
  const [title, setTitle]=useState('');
  const [docs, setDocuments]=useState([]);
  const [identificacion, setIdentificacion]=useState('INE');
  const [mobile, setMobile]=useState('');


  const config = {
    headers: {
      Accept:'*/*',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const getData= async ()=>{
    try {
        const {data} = await clienteAxios.get(
            `/expedients/${expediente}`,
            config
        );
        // console.log("Data: "+JSON.stringify(data));
        setAno(data.content.Year);
        setMarca(data.content.Make);
        setModelo(data.content.Model);
        setVersion(data.content.Version);
        setColor(data.content.Color);
        setKilometrake(Number(data.content.Milage).toLocaleString('es-MX'))

        setOferta(data.content.Folio_Gestor_Precios);
        setInspeccion(data.content.Folio_Autocheck);
        setMobile(data.phone);
        

        setFecha(data.scheduling_date);
        const time=data.scheduling_time.split("T")[1].split(":");
        setHora(time[0]+":"+time[1]);
        setDocuments(data.documents);

    } catch (error) {
        console.log(JSON.stringify(error));
    }
  }

  const isComplete = (doc) => {
    if (doc === 'Comprobante de Domicilio' || doc === 'factura actual') {
      const document = (docs || [])?.find((d) => d.doc_type === doc);
      if (document) return true;
    }
  
    if (doc === 'Tarjeta de circulación') {
      const document = (docs || [])?.find((d) => d.doc_type === doc);
      const document1 = (docs || [])?.find((d) => d.doc_type === 'Tarjeta de circulación (vuelta)');
      if (document && document1) return true;
    }
  
    if (doc === 'identificacion') {
      const document = (docs || [])?.find((d) => d.doc_type === 'Pasaporte');
      if (document) return true;
      const document1 = (docs || [])?.find((d) => d.doc_type === 'INE (Frente)');
      const document2 = (docs || [])?.find((d) => d.doc_type === 'INE (vuelta)');
      if (document1 && document2) return true;
    }
  
    return false;
  };
  
  const exists = (doc) => {
    if (doc === 'Tarjeta de circulación') {
      const document = (docs || [])?.find((d) => d.doc_type === doc);
      if (document) return true;
    }
  
    if (doc === 'identificacion') {
      const document1 = (docs || [])?.find((d) => d.doc_type === 'INE (Frente)');
      if (document1) return true;
    }
    
    return false;
  };
  

  const uploadDocument= async (datos)=>{
    try {
        const {data} = await clienteAxios.post(
            `/expedients/${expediente}/documents`, datos,
            {
              headers: {
                  Accept:'*/*',
                  Authorization:`Bearer ${token}`,
                  "content-type": "multipart/form-data",
              },
            }
        );

        if(tipo==='factura actual'){
          updateExpedients();
        }else{
          if(tipo==="identificacion"){
            if(identificacion==="INE"){
              setStep(5);
              setTipo("identificacion reverso");
            }else{
              setIdentificacion("INE");
              setOpen(false);
            }
          }else if(tipo==="Tarjeta de circulación"){
            setStep(5);
            setTipo("Tarjeta de circulación (vuelta)");
          }else{
            setIdentificacion("INE");
            setOpen(false);
          }
        }

        getData();
        
    } catch (error) {
      //console.log(error);
        setOpen(false);
    }
  }

  const sendMessage = async(doc) => {
    const datos={
      "from": "MGc74a1535c4981448d75077f816409ceb",
      "to": mobile,
      "templateId": "HXac9f0dd984b8bcb478c7d986e5aae065",
      "parametros": "{'1': '"+doc+"'}"
    }

    try {
      const data = await clienteAxiosNotification.post(
          `/envia-whatsapp-plantilla`, datos
      );
      
    } catch (error) {
      console.log(JSON.stringify(error))
    }
  }

  const updateExpedients = async () =>{
    const datos={"questions": {"¿Qué tipo de factura es?": tipoFactura, "¿En qué año fue emitida la factura?": anoFactura}}
    try {
      const {data} = await clienteAxios.patch(
          `/expedients/${expediente}`, datos,
          config
      );
      setOpen(false);
  } catch (error) {
      setOpen(false);
  }
  }

  //https://documents.clikauto.com/api/expedients/1d91f05e-9572-48d3-99fc-8bebd503d979

  useEffect(() => {

      // console.log("Expedeinte: "+expediente)
      if(expediente!==undefined){
        getData();
      }
  }, [expediente, token])

  return (
      <DocumentsContext.Provider
        value={{
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
          setExpedient,
          setToken,
          isComplete, 
          exists,
          sendMessage
        }}
      >
        {children}
      </DocumentsContext.Provider>
    );
};
    
export { DocumentsProvider };
export default DocumentsContext;