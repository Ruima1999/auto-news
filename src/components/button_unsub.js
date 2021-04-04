

import PropTypes from 'prop-types'

const Button_unsub = ({ color, text }) => {
  return (
    <button
 
      style={{ backgroundColor: color }}
      className='btn'
    >
    <a href="http://localhost:3000/unsub">    {text} </a>
    </button>
  )
}

Button_unsub.defaultProps = {
  color: 'steelblue',
}

Button_unsub.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button_unsub