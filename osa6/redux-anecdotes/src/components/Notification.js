import React from 'react';
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const { message } = props.message;

  return (
    <div>
      { message && message !== '' &&
        <div style={style}>
          { message }
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}

export default connect(
  mapStateToProps,
  null,
)(Notification)
