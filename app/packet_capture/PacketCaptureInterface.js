import net from 'net';
import dgram from 'dgram';
import PacketAnalyzer from "../packet_analysis/PacketAnalyzer";

export default class PacketCaptureInterface {
  constructor(port) {
    this.port = port;
    this.packets = [];
    this.analyzer = new PacketAnalyzer();
    this.displayCount = 100;
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
    let counter = 0;

    this.server = dgram.createSocket("udp4");

    this.server.on("message", (msg, rinfo) => {
      console.log("Packet index: " + counter++);

      const dataBuffer = Buffer.from(msg);
      this.packets.push(analyzer.analyzePacket(dataBuffer));
      this.updateCallback(this.getPacketList(this.displayCount));
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

  getPacketList(count) {
    return this.packets.slice(this.packets.length - count);
  }

  isRunning() {
    return this.listen;
  }

  setDisplayCount(count) {
    this.displayCount = count;
  }
}
