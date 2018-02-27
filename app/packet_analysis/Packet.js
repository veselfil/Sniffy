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
  sourceMAC = null;
  targetMAC = null;
  L3Protocol = null;
  L4Protocol = null;
  L7Protocol = null;
  etherType = null;


  constructor(data) {
    this.data = data;
    this.content = data.toString('hex');
  }

  getLength() {
    return this.data.length;
  }

  getProtocol() {
    if (this.L7Protocol !== null)
      return this.L7Protocol;
    else if (this.L4Protocol !== null)
      return this.L4Protocol;
    else
      return this.L3Protocol;
  }
}

