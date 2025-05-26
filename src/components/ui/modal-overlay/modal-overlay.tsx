import styles from './modal-overlay.module.css';

export const ModalOverlayUI = ({ onClick }: { onClick: () => void }) => (
  <div
    data-test='modal-overlay'
    data-cy='overlay'
    className={styles.overlay}
    onClick={onClick}
  />
);
