export default class PacketFilter {

  compTargetIP = null;
  compSourceIP = null;
  compProtocol = null;

  constructor(filterExpression) {
    this.filterExpression = filterExpression;
    this._parseFilterExpression(this.filterExpression);
  }

  _parseFilterExpression() {
    const tokens = this.filterExpression.split(" ");

    let currentToken = tokens.shift();
    while (tokens.length > 0) {
      switch (currentToken) {
        case "srcIP":
          this.compSourceIP = tokens.shift();
          break;
        case "tarIP":
          this.compTargetIP = tokens.shift();
          break;
        case "proto":
          this.compProtocol = tokens.shift();
          break;
      }

      currentToken = tokens.shift();
    }
  }

  filterPacketList(packets, displayCount) {
    const filterFunc = (packet) => {
      let protocol = packet.getProtocol();
      if (typeof protocol === "undefined")
        protocol = "";

      if (this.compSourceIP != null && packet.sourceIP !== this.compSourceIP)
        return false;
      else if (this.compTargetIP != null && packet.targetIP !== this.compTargetIP)
        return false;
      else if (this.compProtocol != null && protocol.indexOf(this.compProtocol) === -1)
        return false;
      else return true;
    };

    return packets.filter(filterFunc).slice(0, packets.length - displayCount);
  }

}
