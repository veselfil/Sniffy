/**
 * Represents an analyzed network packet.
 */
export default class Packet {
  data = null;
  port = null;
  sourceIP = null;
  targetIP = null;
  isIpv4 = null;
  content = null;
  sourcePort = null;
  targetPort = null;

  constructor(data) {
    this.data = data;
    this.content = data.toString('hex');
  }

  getLength() {
    return this.data.length;
  }
}

