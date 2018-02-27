import Packet from "./Packet";
import {
  DEST_PORT, ETHERNET_HEADER_LENGTH, L3_PROTOCOL_MAP, L2_PROTOCOL_MAP, PROTOCOL_TCP, PROTOCOL_UDP,
  SOURCE_PORT
} from "../constants/packets";
import { readBufferBytesAsBuffer, readBufferBytesAsInt, readBufferBytesAsString } from "../actions/buffer-utils";

export default class PacketAnalyzer {
  /** Ethernet frame analysis */
  analyzeL2(packetData, packet) {
    packet.targetMAC = readBufferBytesAsString(packetData, 0, 6);
    packet.sourceMAC = readBufferBytesAsString(packetData, 6, 6);

    const etherTypeValue = readBufferBytesAsInt(packetData, 12, 2);
    packet.etherType = etherTypeValue;
    packet.L3Protocol = L2_PROTOCOL_MAP.find(x => parseInt(x.key) === etherTypeValue);
    packet.isIpv4 = packet.etherType === 0x0800; // 0x0800 is IPv4 EtherType

    return packet;
  }

  /* IP packet analysis. */
  analyzeL3(packetData, packet) {
    if (!packet.isIpv4) return packet;

    packet.sourceIP = this.getIPv4Address(packetData, ETHERNET_HEADER_LENGTH + 12);
    packet.targetIP = this.getIPv4Address(packetData, ETHERNET_HEADER_LENGTH + 16);
    packet.L4Protocol = this.getProtocolName(this.getProtocolNumber(packetData));

    return packet;
  }

  /* TCP or UDP analysis */
  analyzeL4(packetData, packet) {
    console.log(packet.protocol);
    switch (packet.protocol) {
      case "TCP":
        packet.sourcePort = this.getPort(packetData, SOURCE_PORT);
        packet.destinationPort = this.getPort(packetData, DEST_PORT);
        return packet;
      case "UDP":
        packet.sourcePort = this.getPort(packetData, SOURCE_PORT);
        packet.destinationPort = this.getPort(packetData, DEST_PORT);
        return packet;
      default:
        return packet;
    }
  }

  /* Application layer analysis. */
  analyzeL7(packetData, packet) {
    switch (packet.targetPort) {
      case 80:
        packet.L7Protocol = "HTTP";
        return packet;
    }

    return packet;
  }

  /**
   * Analyzes a packet, gets more info about it and packs it into a Packet object.
   * @param packetData A node buffer with the packet data.
   */
  analyzePacket(packetData) {
    let packet = new Packet(packetData);

    packet = this.analyzeL2(packetData, packet);
    packet = this.analyzeL3(packetData, packet);
    packet = this.analyzeL4(packetData, packet);
    packet = this.analyzeL7(packetData, packet);

    return packet;
  }

  isIpv4Packet(dataBuffer) {
    const versionHalfByte = (dataBuffer[ 14 ] >> 4);
    return versionHalfByte === 4;
  };

  getIpv4HeaderLength(dataBuffer) {
    const sizeHalfByte = (dataBuffer[ 14 ]) & 0b00001111;
    return sizeHalfByte << 2;
  }

  getProtocolNumber(dataBuffer) {
    const protoNumber = dataBuffer[ 23 ];
    return protoNumber;
  };

  getProtocolName(protoNumber) {
    let protoName = L3_PROTOCOL_MAP.find(x => x.number === protoNumber.toString());
    if (typeof protoName === 'undefined') {
      protoName = 'unknown';
    } else protoName = protoName.proto;

    return protoName;
  };

  getIPv4Address(dataBuffer, startIndex) {
    const elements = [];
    for (let i = startIndex; i < (startIndex + 4); i++) {
      elements.push(dataBuffer[ i ]);
    }

    return elements.join('.');
  };

  getPort(dataBuffer, dir) {
    const l4HeaderLength = this.getIpv4HeaderLength(dataBuffer);
    const index = (i) => ETHERNET_HEADER_LENGTH + l4HeaderLength + i;

    if (dir === SOURCE_PORT) {
      return dataBuffer[ index(0) << 8 | index(1) ]
    } else {
      return dataBuffer[ index(2) << 8 | index(3) ]
    }
  }
}
