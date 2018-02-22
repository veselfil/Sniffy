/**
 * Represents an analyzed network packet.
 */
export default class Packet {
  data = null;
  port = null;
  sourceIP = null;
  targetIP = null;
  // isIpv4 = null;


  constructor(data) {
    this.data = data;
  }
}
