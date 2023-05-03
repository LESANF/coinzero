const dataEncoder = (wsData: any) => {
  const encoder = new TextDecoder("utf-8");
  const unitArray = new Uint8Array(wsData);
  return JSON.parse(encoder.decode(unitArray));
};

export default dataEncoder;
