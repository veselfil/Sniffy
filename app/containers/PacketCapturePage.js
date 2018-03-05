import React from 'react';
import stylesheet from './PacketCapturePage.css'

import PacketTable from '../components/PacketTable';
import PacketContents from "../components/PacketContents";
import PacketCaptureInterface from '../packet_capture/PacketCaptureInterface'
import StartStopButton from '../components/StartStopButton'
import TopControlRow from "../components/TopControlRow";

export default class PacketCapturePage extends React.Component {
  constructor() {
    super();
    this.captureEngine = new PacketCaptureInterface(5005);
    this.state = { "packets": [], currentPacket: null };
  }

  componentDidMount() {
    this.captureEngine
      .onUpdate((packets) => this.setState(Object.assign(this.state, { "packets": packets })))
      .onError((err) => console.log(err.toString()))
      .setIngnoreNonIpv4(true)
      .listen()
      .pause();
  }

  render() {
    const shouldRenderPacketDetails = this.state.currentPacket != null && typeof(this.state.currentPacket) !== "undefined";

    return (
      <div>
        <TopControlRow onCaptureStarted={started => this.handleChangeCaptureState(started)}
                       onDisplayCountChanged={count => this.handleDisplayCountChanged(count)}
                       onFilterChanged={filterText => this.handleFilterTextChanged(filterText)} />

        <PacketTable packetData={this.state.packets}
                     displayDetails={(x, packet) => this.handleDisplayDetails(x, packet)}
                     enableAutoscroll={this.captureEngine.isRunning()}/>

        <div className={stylesheet.packetDetailsContiner}>
          {shouldRenderPacketDetails && <PacketContents packet={this.state.currentPacket}/>}
        </div>
      </div>
    );
  }

  handleDisplayDetails(x, packet) {
    this.setState(Object.assign(this.state, { "currentPacket": packet }));
  }

  handleChangeCaptureState(started) {
    if (started)
      this.captureEngine.resume();
    else
      this.captureEngine.pause();
  }

  handleFilterTextChanged(filterText) {
    this.setState(Object.assign(this.state, { filterText: filterText }));
  }

  handleDisplayCountChanged(count) {
    this.captureEngine.setDisplayCount(count);
    this.setState(Object.assign(this.state, { displayCount: count }));
  }
}
