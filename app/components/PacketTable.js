import React from 'react';
import PropTypes from 'prop-types';
import stylesheet from './PacketTable.css'
import {mapColor} from '../actions/proto-color-mapping'

export default class PacketTable extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.disableAutoscroll);
    console.log(this.autoscrollIntervalHandle);

    if (!nextProps.disableAutoscroll)
      if (this.autoscrollIntervalHandle === -1)
        this.autoscrollIntervalHandle = setInterval(() => this.messagesEnd.scrollIntoView({behavior: "smooth"}))
    else {
      clearInterval(this.autoscrollIntervalHandle);
      this.autoscrollIntervalHandle = -1;
    }
  }

  componentWillUnmount() {
    clearInterval(this.autoscrollIntervalHandle);
  }

  render() {
    const packetData = this.props.packetData || [];

    return (
      <div className={stylesheet.tableContainer}>
        <table border="1">
          {packetData.map((x, idx) => (
            <tr onClick={(e) => this.processClick(e, {x})} key={idx} style={{background: mapColor(x.Protocol)}}>
              <td className={stylesheet.lengthCol}>{x.PacketLength}</td>
              <td className={stylesheet.protoCol}>{x.Protocol}</td>
              <td className={stylesheet.ipCol}>{x.SourceIP}</td>
              <td className={stylesheet.ipCol}>{x.TargetIP}</td>
              <td className={stylesheet.portCol}>{x.Port}</td>
            </tr>
          ))}

          <div style={{float: "left", clear: "both"}}
               ref={(el) => {
                 this.messagesEnd = el;
               }}>
          </div>
        </table>
      </div>
    );
  }

  processClick(e, x) {
    this.props.displayDetails(e, x.x);
  }
}
