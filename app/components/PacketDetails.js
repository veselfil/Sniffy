import React from 'react';
import PropTypes from 'prop-types';
import stylesheet from './PacketDetails.css';

export default class PacketDetails extends React.Component {

  constructor() {
    super();
  }

  renderInfoRow(fields) {
    return (
      <div className={"row"}>
        {fields.map(x => (
          <div className={"col-md-6"}>
            <div className={"center " + stylesheet.cellTitle}>
              {x.title}
            </div>
            <div className={"center" + stylesheet.cellValue}>
              {x.value}
            </div>
          </div>
        ))}
      </div>
    )
  }

  render() {
    const packet = this.props.packet;
    const getField = (name) => packet != null ? packet[ name ] : "";
    const packetProtocol = packet != null ? packet.getProtocol() : 0;

    return (
      <div className={stylesheet.container}>
        {this.renderInfoRow([
          { title: "Source IP", value: getField("sourceIP") },
          { title: "Target IP", value: getField("targetIP") } ])
        }

        {this.renderInfoRow([
          { title: "Length", value: getField("data").length },
          { title: "Protocol", value: packetProtocol } ])
        }

        {this.renderInfoRow([
          { title: "Source port", value: getField("sourcePort") },
          { title: "Target port", value: getField("targetPort") } ])
        }
      </div>
    );
  }

};

PacketDetails.propTypes = {
  packet: PropTypes.object
};
