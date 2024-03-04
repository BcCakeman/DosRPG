import zlib from 'zlib';
import config from './../config.json' assert {type: "json"};

export function encode(input) {
    if (input === null) {
        return null
    } else {
        return config.compressSaveState ? (zlib.deflateSync(JSON.stringify(input))).toString('base64') : JSON.stringify(input);
    }
}

export function decode(input) {
    if (input === null) {
        return null
    } else {
        return config.compressSaveState ? JSON.parse(zlib.inflateSync(Buffer.from(input, 'base64')).toString()) : JSON.parse(input);
    }
}

export default { encode, decode }