const formatByteString = (bytes) => {
  let lines = splitStringToSegments(bytes, 32);
  return lines.map(x => splitStringToSegments(x, 2).join(" "));
};

const formatTextString = (bytes) => {
  let converted = hex2a(bytes);
  return splitStringToSegments(converted, 32);
};

const splitStringToSegments = (str, length) => {
  let elements = [];
  while (str.length > 0) {
    elements.push(str.substring(0, length));
    str = str.substring(length);
  }

  return elements;
};

const hex2a = (hexx) => {
  const hex = hexx.toString();//force conversion
  let str = '';
  for (let i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
};

export { formatByteString, formatTextString, hex2a, splitStringToSegments };
