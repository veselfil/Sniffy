import net from 'net';
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

    this.server = net.createServer((socket) => {
      socket.on('data', (data) => {
        console.log("Received packet number: " + (counter++));
        console.log("Length: " + data.length);
        if (!this.listen) return;

        const dataBuffer = Buffer.from(data);

        // console.log(dataBuffer.toString("hex"));

        this.packets.push(analyzer.analyzePacket(dataBuffer));
        this.updateCallback(this.getPacketList(this.displayCount));
      });
    }).on('error', (err) => {
      this.errorCallback(err);
    });

    this.server.listen({
      port: this.port,
      host: "localhost",
      exclusive: true
    }, () => console.log("a callback"));

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
