import React from 'react';
import HexView from './HexView'
import PropTypes from 'prop-types';
import stylesheet from './PacketContents.css'
import PacketDetails from './PacketDetails'

export default class PacketContents extends React.Component {
  render() {
    if (this.props.packet == null)
      return <span/>;

    return (
      <div className={"row " + stylesheet.contentContainer}>
        <div className={"col-md-6"}>
          <PacketDetails packet={this.props.packet} />
        </div>
        <div className={"col-md-6"}>
          <div><strong>Packet content: </strong>
            <hr/>
            <HexView hexString={this.props.packet.content} displayTextView={false}/>
          </div>
        </div>
      </div>
    );
  }
};

PacketContents.propTypes = {
  packet: PropTypes.object
};
