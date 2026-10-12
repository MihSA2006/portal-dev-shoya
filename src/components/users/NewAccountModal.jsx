import Modal from '../ui/Modal';
import AccountForm from './AccountForm';

export default function NewAccountModal({ onClose, onCreate }) {
  return (
    <Modal title="Nouveau compte" description="Créez un accès pour un nouveau membre de l'équipe." onClose={onClose}>
      <AccountForm
        submitLabel="Créer le compte"
        onCancel={onClose}
        onSubmit={(values) => { onCreate(values); onClose(); }}
      />
    </Modal>
  );
}
