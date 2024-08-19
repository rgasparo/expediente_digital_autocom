// src/components/Modal/ModalWrapper.jsx
import DocumentsModal from './DocumentsModal';
import CameraStep from './CameraStep';
import PreviewStep from './PreviewStep';
import LoaderComponent from './LoaderComponent';
import ReverseStep from './ReverseStep';

const ModalWrapper = (props) => <DocumentsModal {...props} />;

ModalWrapper.CameraStep = CameraStep;
ModalWrapper.PreviewStep = PreviewStep;
ModalWrapper.LoaderComponent = LoaderComponent;
ModalWrapper.ReverseStep = ReverseStep;

export default ModalWrapper;