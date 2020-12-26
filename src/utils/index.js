import xml2js from 'xml2js';

// eslint-disable-next-line import/prefer-default-export
export async function parse(dataStr) {
  const data = await xml2js.parseStringPromise(dataStr);

  const result = [];
  const entries = data['gesmes:Envelope'].Cube[0].Cube;

  entries.forEach((current) => {
    const { time } = current.$;
    const rates = {};

    current.Cube.forEach((item) => {
      const { currency } = item.$;
      rates[currency] = parseFloat(item.$.rate);
    });

    result.push({ time, rates });
  });

  return result;
}
