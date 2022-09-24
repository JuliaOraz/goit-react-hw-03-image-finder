import PropTypes from 'prop-types';
import styles from './Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <div className={styles.Button_container}>
      <button className={styles.Button} type="button" onClick={onClick}>
        Load More
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
