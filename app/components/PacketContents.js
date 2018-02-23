import React from 'react';
import HexView from './HexView'
import PropTypes from 'prop-types';
import stylesheet from './PacketContents.css'

export default class PacketContents extends React.Component {
  render() {
    if (this.props.packet == null)
      return <span/>;

    return (
      <div className={"row " + stylesheet.contentContainer}>
        <div className={"col-md-6"}>
          <div><strong>Source IP address: </strong>{this.props.packet.sourceIP}</div>
          <div><strong>Target IP address: </strong>{this.props.packet.targetIP}</div>
          <div><strong>Packet length: </strong>{this.props.packet.getLength()}</div>
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
