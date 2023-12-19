
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal.jsx';
import { thunkDeleteGroup } from '../../store/groups.js';

import './DeleteConfirmationModal.css';

function DeleteConfirmationModal( { groupId } ) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = () => {
    dispatch(thunkDeleteGroup(groupId))
      .then(closeModal)
  };

  const handleCancel = () => {

    return closeModal();
  }

  return (
    <>
      <h1>Confirm Delete</h1>
      <h3>Are you sure you want to remove this group?</h3>
      <button onClick={handleSubmit}>Yes &#40;Delete Group&#41;</button>
      <button onClick={handleCancel}>No &#40;Keep Group&#41;</button>
    </>
  );
}

export default DeleteConfirmationModal;