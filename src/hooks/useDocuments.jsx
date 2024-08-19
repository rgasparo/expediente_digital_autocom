import {useContext} from 'react';
import DocumentsContext from '../context/DocumentsProvider';

const useDocuments = () => {
    return useContext(DocumentsContext);
}

export default useDocuments;