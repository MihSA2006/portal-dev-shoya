import Modal from '../ui/Modal';
import AccountForm from './AccountForm';

export default function UpdateAccountModal({ user, onClose, onUpdate }) {
  const { name, username, githubUsername, email, role, twoFactor, status } = user;

  return (
    <Modal title="Modifier le compte" description={`Mettez à jour les informations de ${user.name}.`} onClose={onClose}>
      <AccountForm
        showStatus
        initial={{ name, username, githubUsername, email, role, twoFactor, status }}
        submitLabel="Enregistrer les modifications"
        onCancel={onClose}
        onSubmit={(values) => { onUpdate(values); onClose(); }}
      />
    </Modal>
  );
}
