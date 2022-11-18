import PropTypes from 'prop-types';

function GenericInput({
  type,
  name,
  value,
  handleChange,
  placeholder,
  className,
  labelClassname,
  labelName,
}) {
  return (
    <label
      className={ `${labelClassname}` }
      htmlFor={ `${name}` }
    >
      <span>{labelName}</span>
      <input
        className={ `${className}` }
        type={ `${type}` }
        name={ `${name}` }
        value={ `${value}` }
        placeholder={ `${placeholder}` }
        onChange={ handleChange }
      />
    </label>
  );
}

GenericInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  labelClassname: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
};

export default GenericInput;
