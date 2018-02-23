import React from 'react';
import stylesheet from './PacketTable.css'
import { mapColor } from '../actions/proto-color-mapping'

export default class PacketTable extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.disableAutoscroll)
      if (this.autoscrollIntervalHandle === -1)
        this.autoscrollIntervalHandle = setInterval(() => this.messagesEnd.scrollIntoView({ behavior: "smooth" }))
      else {
        clearInterval(this.autoscrollIntervalHandle);
        this.autoscrollIntervalHandle = -1;
      }
  }

  componentWillUnmount() {
    clearInterval(this.autoscrollIntervalHandle);
  }

  renderHeader() {
    return (
      <thead>
      <tr>
        <th>Length</th>
        <th>Protocol</th>
        <th>Source IP</th>
        <th>Target IP</th>
        <th>Source port</th>
        <th>Target port</th>
      </tr>
      </thead>
    )
  }

  render() {
    const packetData = this.props.packetData || [];

    return (
      <div className={stylesheet.tableContainer}>
        <table border="1">
          {this.renderHeader()}
          <tbody>
          {packetData.map((x, idx) => (
            <tr onClick={(e) => this.processClick(e, { x })} key={idx} style={{ background: mapColor(x.protocol) }}>
              <td className={stylesheet.lengthCol}>{x.getLength()}</td>
              <td className={stylesheet.protoCol}>{x.protocol}</td>
              <td className={stylesheet.ipCol}>{x.sourceIP}</td>
              <td className={stylesheet.ipCol}>{x.targetIP}</td>
              <td className={stylesheet.portCol}>{x.sourcePort}</td>
              <td className={stylesheet.portCol}>{x.targetPort}</td>
            </tr>
          ))}
          </tbody>
        </table>
        <div style={{ float: "left", clear: "both" }}
             ref={(el) => {
               this.messagesEnd = el;
             }}>
        </div>
      </div>
    );
  }

  processClick(e, x) {
    this.props.displayDetails(e, x.x);
  }
}
