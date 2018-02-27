const readBufferBytesAsString = (buffer, start, count) =>
  readBufferBytesAsBuffer(buffer, start, count).toString("hex");

const readBufferBytesAsInt = (buffer, start, count = 4) => {
  if (count > 4) // for safety reasons, never read more than 32 bits
    throw "Cannot read more than four bytes as an integer!";

  let result = 0;
  while (count-- > 0) {
    result = result << 8;
    result = result | buffer[ start++ ];
  }

  return result;
};

const readBufferBytesAsBuffer = (buffer, start, count) => {
  const resultBuffer = Buffer.alloc(count);

  for (let i = 0; i < count; i++) {
    resultBuffer[ i ] = buffer[ start + i ];
  }

  return resultBuffer;
};

export { readBufferBytesAsString, readBufferBytesAsInt, readBufferBytesAsBuffer };
