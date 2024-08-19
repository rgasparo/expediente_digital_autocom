import "./styles.css";

const NotFound = () => {

    return (
        <div className="customContainer">
            <div className="container tw-mx-auto tw-max-w-6xl tw-w-11/12">
                <h1 className="title">VENDE TU AUTO <br className='lg:tw-hidden' /><span className="subtitle">CARGA DE DOCUMENTOS</span></h1>
            </div>

            <div className="container container-main tw-mx-auto tw-max-w-6xl tw-w-11/12 tw-text-center tw-bg-white tw-rounded-2xl">
                <h2 className="unidad tw-pt-2.5"><span className="color-gris-oscuro">NOT FOUND</span></h2>
                <button className="modalBtn tw-px-4 tw-px-2 tw-my-8 lg:tw-my-4">IR A LA PÁGINA PRINCIPAL</button>
                <p className="contacto">Si necesitas ayuda comunicate a <a className="contacto-bold">contacto@autocom.mx</a> o al tel: <a className="contacto-bold">800-711-2886</a></p>
            </div>
        </div>
        
    );
}

export default NotFound;
