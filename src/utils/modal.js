
export const upload = async(setStep, tipo, identificacion, selectedFile, uploadDocument, sendMessage) => {
    setStep(4);
    if(tipo==="identificacion"){
        if(identificacion==="Pasaporte"){
            const datos = {
                doc_type: identificacion,
                attachment:selectedFile,
            };
            await uploadDocument(datos);
            await sendMessage("Pasaporte");
        }else{
            const datos = {
                doc_type: "INE (Frente)",
                attachment:selectedFile,
            };
            await uploadDocument(datos);
            await sendMessage("INE (Frente)");
        }
    }else if(tipo==="identificacion reverso"){
        const datos = {
            doc_type: "INE (vuelta)",
            attachment:selectedFile,
        };
        await uploadDocument(datos);
        await sendMessage("INE (Vuelta)");
    }else{
        const datos = {
            doc_type: tipo,
            attachment:selectedFile,
        };
        await uploadDocument(datos);
        await sendMessage(tipo);
    }
}

export const b64toBlob = (b64Data, contentType, sliceSize) => {
    contentType = contentType || "";
    sliceSize = sliceSize || 512;
    let byteCharacters = atob(b64Data);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);
        let byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        let byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    let blob = new Blob(byteArrays, {
        type: contentType,
    });
    return blob;
}

export const handleTakePhoto = (dataUri, setSelectedFile, setStep) => {
    let block = dataUri.split(";");
    let contentType = block[0].split(":")[1];
    let realData = block[1].split(",")[1];

    let blob = b64toBlob(realData, contentType);
    blob = new File([blob], "image.jpg", {
        type: "image/jpeg",
    });

    setSelectedFile(blob);
    setStep(3);
}

export const convertToDataUri = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = (error) => {
            reject(error);
        };
    });
}

export const dataURLtoFile = (dataURL, fileName) => {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    const newFile = new File([ab], fileName, {type: mimeString});
    return newFile;
};

export const resizeImage = (file) => {
    const MAX_SIZE = 1024;

    return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const image = new Image();
        image.src = URL.createObjectURL(file);

        image.onload = () => {
            let {width, height} = image;

            if (width > height) {
                if (width > MAX_SIZE) {
                    height *= MAX_SIZE / width;
                    width = MAX_SIZE;
                }
            } else {
                if (height > MAX_SIZE) {
                    width *= MAX_SIZE / height;
                    height = MAX_SIZE;
                }
            }

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(image, 0, 0, width, height);

            const dataURL = canvas.toDataURL("image/jpeg");
            const resizedFile = dataURLtoFile(dataURL, file.name);

            resolve(resizedFile);
        };

        image.onerror = reject;
    });
};

export const handleFileChange = async (event, option, setSelectedFile, setStep ) => {
    if (option === 1) {
        const imageCut = await resizeImage(event.target.files[0]);
        const image = await convertToDataUri(imageCut);

        let block = image.split(";");
        let contentType = block[0].split(":")[1];
        let realData = block[1].split(",")[1];

        let blob = b64toBlob(realData, contentType);
        blob = new File([blob], "image.jpg", {
            type: "image/jpeg",
        });
        setSelectedFile(blob)
        setStep(3);

    }
};