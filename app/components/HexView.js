import React from 'react';
import PropTypes from 'prop-types';

class HexView extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.displayTextView !== nextProps.displayTextView
      || this.props.hexString !== nextProps.hexString;
  }

  render() {

  }
}


HexView.propTypes = {
  hexString: PropTypes.string,
  displayTextView: PropTypes.bool
};
