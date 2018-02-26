import React from 'react';
import PacketTable from '../components/PacketTable';
import PacketContents from "../components/PacketContents";
import PacketCaptureInterface from '../packet_capture/PacketCaptureInterface'
import StartStopButton from '../components/StartStopButton'

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
      .listen();
  }

  render() {
    const shouldRenderPacketDetails = this.state.currentPacket != null && typeof(this.state.currentPacket) !== "undefined";

    return (
      <div>
        <PacketTable packetData={this.state.packets}
                     displayDetails={(x, packet) => this.handleDisplayDetails(x, packet)}
                     disableAutoscroll={this.captureEngine.isRunning()}/>

        {shouldRenderPacketDetails && <PacketContents packet={this.state.currentPacket}/>}

        <StartStopButton onChangeState={(started) => this.handleChangeCaptureState(started)}
                         startedText={"Stop capture"} stoppedText={"Start capture"}/>
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
      this.captureEngine.pause()
  }
}
