
export const mapColor = (protoName) => {
  switch(protoName) {
    case "TCP":
      return "#a5c7ff";
    case "UDP":
      return "#ffbe70";
    default:
      return "#76af8c"
  }
};
