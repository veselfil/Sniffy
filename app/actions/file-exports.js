import { ipcRenderer } from 'electron';

const PACKET_EXPORT_FIELDS = [
  "sourceIP",
  "targetIP",
  "isIpv4",
  "sourcePort",
  "targetPort",
  "sourceMAC",
  "targetMAC",
  "L3Protocol",
  "L4Protocol",
  "L7Protocol",
  "etherType",
  "descriptionText",
  "content",
];

const exportFile = (packetList) => {
  ipcRenderer.send("export-file", convertToCsv(packetList));
};

const mapToArray = (packet) => {
  let values = [];
  PACKET_EXPORT_FIELDS.forEach(x => values.push(packet[x]));
  return values;
};

const convertToCsv = (packetList) => {
  const mappedList = packetList.map(mapToArray);
  mappedList.unshift(PACKET_EXPORT_FIELDS);

  return mappedList.join("\n");
};

export { exportFile };
