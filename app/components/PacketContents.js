import React from 'react';
import { formatByteString, formatTextString } from "../actions/packet-content-formatting";
import stylesheet from './PacketContents.css'

export default class PacketContents extends React.Component {
  render() {
    if (this.props.packet == null)
      return <span></span>;

    return (
      <div className={"row " + stylesheet.contentContainer}>
        <div className={"col-md-6"}>
          <div><strong>Source IP address: </strong>{this.props.packet.SourceIP}</div>
          <div><strong>Target IP address: </strong>{this.props.packet.TargetIP}</div>
          <div><strong>Packet length: </strong>{this.props.packet.PacketLength}</div>
        </div>
        <div className={"col-md-6"}>
          <div><strong>Packet content: </strong><br /><div style={{fontFamily: "monospace", wordWrap: "break-word"}}>
            <div className={"row"}>
              <div className={"col-md-6"}>
                {formatByteString(this.props.packet.Content).map((x, index) => (
                  <div className={"bytes-row"} key={index}>{x}</div>
                ))}
              </div>
              <div className={"col-md-6"}>
                {formatTextString(this.props.packet.Content).map((x, index) => (
                  <div className={"text-row"} key={index}>{x}</div>
                ))}
              </div>
            </div>

            </div></div>
        </div>
      </div>
    );
  }
}
