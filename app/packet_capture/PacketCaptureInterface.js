import net from 'net';
import dgram from 'dgram';
import PacketAnalyzer from "../packet_analysis/PacketAnalyzer";

export default class PacketCaptureInterface {
  constructor(port) {
    this.port = port;
    this.packets = [];
    this.analyzer = new PacketAnalyzer();
    this.ignoreNonIPv4 = true;
  }

  setIngnoreNonIpv4(value) {
    this.ignoreNonIPv4 = value;
    return this;
  }

  onUpdate(callback) {
    this.updateCallback = callback;
    return this;
  }

  onError(error) {
    this.errorCallback = error;
    return this;
  }

  listen() {
    this.resume();
    const analyzer = this.analyzer;
    this.server = dgram.createSocket("udp4");

    this.server.on("message", (msg, rinfo) => {
      if (!this.listen) return;

      const dataBuffer = Buffer.from(msg);
      const analyzedPacket = analyzer.analyzePacket(dataBuffer);

      if (!this.ignoreNonIPv4 || analyzedPacket.isIpv4) {
        this.packets.push(analyzer.analyzePacket(dataBuffer));
        this.updateCallback(this.getPacketList());
      }
    });

    this.server.bind(5005);
    return this;
  }

  resume() {
    this.listen = true;
  }

  pause() {
    this.listen = false;
  }

  getPacketList() {
    return this.packets;
  }

  isRunning() {
    return this.listen;
  }
}
