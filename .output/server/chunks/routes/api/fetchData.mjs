import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import http, { Server as Server$1 } from 'node:http';
import https, { Server } from 'node:https';
import { promises, existsSync } from 'fs';
import { dirname as dirname$1, resolve as resolve$1, join } from 'path';
import { createConsola as createConsola$1 } from 'consola/core';
import mongoose from 'mongoose';
import { promises as promises$1 } from 'node:fs';
import { fileURLToPath } from 'node:url';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}
function isSamePath(p1, p2) {
  return decode(withoutTrailingSlash(p1)) === decode(withoutTrailingSlash(p2));
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  const [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  const { pathname, search, hash } = parsePath(
    path.replace(/\/(?=[A-Za-z]:)/, "")
  );
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const defaults = Object.freeze({
  ignoreUnknown: false,
  respectType: false,
  respectFunctionNames: false,
  respectFunctionProperties: false,
  unorderedObjects: true,
  unorderedArrays: false,
  unorderedSets: false,
  excludeKeys: void 0,
  excludeValues: void 0,
  replacer: void 0
});
function objectHash(object, options) {
  if (options) {
    options = { ...defaults, ...options };
  } else {
    options = defaults;
  }
  const hasher = createHasher(options);
  hasher.dispatch(object);
  return hasher.toString();
}
const defaultPrototypesKeys = Object.freeze([
  "prototype",
  "__proto__",
  "constructor"
]);
function createHasher(options) {
  let buff = "";
  let context = /* @__PURE__ */ new Map();
  const write = (str) => {
    buff += str;
  };
  return {
    toString() {
      return buff;
    },
    getContext() {
      return context;
    },
    dispatch(value) {
      if (options.replacer) {
        value = options.replacer(value);
      }
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    },
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      if (objectLength < 10) {
        objType = "unknown:[" + objString + "]";
      } else {
        objType = objString.slice(8, objectLength - 1);
      }
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = context.get(object)) === void 0) {
        context.set(object, context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        write("buffer:");
        return write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else if (!options.ignoreUnknown) {
          this.unkown(object, objType);
        }
      } else {
        let keys = Object.keys(object);
        if (options.unorderedObjects) {
          keys = keys.sort();
        }
        let extraKeys = [];
        if (options.respectType !== false && !isNativeFunction(object)) {
          extraKeys = defaultPrototypesKeys;
        }
        if (options.excludeKeys) {
          keys = keys.filter((key) => {
            return !options.excludeKeys(key);
          });
          extraKeys = extraKeys.filter((key) => {
            return !options.excludeKeys(key);
          });
        }
        write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          write(":");
          if (!options.excludeValues) {
            this.dispatch(object[key]);
          }
          write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    },
    array(arr, unordered) {
      unordered = unordered === void 0 ? options.unorderedArrays !== false : unordered;
      write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = createHasher(options);
        hasher.dispatch(entry);
        for (const [key, value] of hasher.getContext()) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    },
    date(date) {
      return write("date:" + date.toJSON());
    },
    symbol(sym) {
      return write("symbol:" + sym.toString());
    },
    unkown(value, type) {
      write(type);
      if (!value) {
        return;
      }
      write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          Array.from(value.entries()),
          true
          /* ordered */
        );
      }
    },
    error(err) {
      return write("error:" + err.toString());
    },
    boolean(bool) {
      return write("bool:" + bool);
    },
    string(string) {
      write("string:" + string.length + ":");
      write(string);
    },
    function(fn) {
      write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
      if (options.respectFunctionNames !== false) {
        this.dispatch("function-name:" + String(fn.name));
      }
      if (options.respectFunctionProperties) {
        this.object(fn);
      }
    },
    number(number) {
      return write("number:" + number);
    },
    xml(xml) {
      return write("xml:" + xml.toString());
    },
    null() {
      return write("Null");
    },
    undefined() {
      return write("Undefined");
    },
    regexp(regex) {
      return write("regex:" + regex.toString());
    },
    uint8array(arr) {
      write("uint8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint8clampedarray(arr) {
      write("uint8clampedarray:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int8array(arr) {
      write("int8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint16array(arr) {
      write("uint16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int16array(arr) {
      write("int16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint32array(arr) {
      write("uint32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int32array(arr) {
      write("int32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float32array(arr) {
      write("float32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float64array(arr) {
      write("float64array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    arraybuffer(arr) {
      write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    },
    url(url) {
      return write("url:" + url.toString());
    },
    map(map) {
      write("map:");
      const arr = [...map];
      return this.array(arr, options.unorderedSets !== false);
    },
    set(set) {
      write("set:");
      const arr = [...set];
      return this.array(arr, options.unorderedSets !== false);
    },
    file(file) {
      write("file:");
      return this.dispatch([file.name, file.size, file.type, file.lastModfied]);
    },
    blob() {
      if (options.ignoreUnknown) {
        return write("[blob]");
      }
      throw new Error(
        'Hashing Blob objects is currently not supported\nUse "options.replacer" or "options.ignoreUnknown"\n'
      );
    },
    domwindow() {
      return write("domwindow");
    },
    bigint(number) {
      return write("bigint:" + number.toString());
    },
    /* Node.js standard native objects */
    process() {
      return write("process");
    },
    timer() {
      return write("timer");
    },
    pipe() {
      return write("pipe");
    },
    tcp() {
      return write("tcp");
    },
    udp() {
      return write("udp");
    },
    tty() {
      return write("tty");
    },
    statwatcher() {
      return write("statwatcher");
    },
    securecontext() {
      return write("securecontext");
    },
    connection() {
      return write("connection");
    },
    zlib() {
      return write("zlib");
    },
    context() {
      return write("context");
    },
    nodescript() {
      return write("nodescript");
    },
    httpparser() {
      return write("httpparser");
    },
    dataview() {
      return write("dataview");
    },
    signal() {
      return write("signal");
    },
    fsevent() {
      return write("fsevent");
    },
    tlswrap() {
      return write("tlswrap");
    }
  };
}
const nativeFunc = "[native code] }";
const nativeFuncLength = nativeFunc.length;
function isNativeFunction(f) {
  if (typeof f !== "function") {
    return false;
  }
  return Function.prototype.toString.call(f).slice(-nativeFuncLength) === nativeFunc;
}

class WordArray {
  constructor(words, sigBytes) {
    words = this.words = words || [];
    this.sigBytes = sigBytes === void 0 ? words.length * 4 : sigBytes;
  }
  toString(encoder) {
    return (encoder || Hex).stringify(this);
  }
  concat(wordArray) {
    this.clamp();
    if (this.sigBytes % 4) {
      for (let i = 0; i < wordArray.sigBytes; i++) {
        const thatByte = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
        this.words[this.sigBytes + i >>> 2] |= thatByte << 24 - (this.sigBytes + i) % 4 * 8;
      }
    } else {
      for (let j = 0; j < wordArray.sigBytes; j += 4) {
        this.words[this.sigBytes + j >>> 2] = wordArray.words[j >>> 2];
      }
    }
    this.sigBytes += wordArray.sigBytes;
    return this;
  }
  clamp() {
    this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8;
    this.words.length = Math.ceil(this.sigBytes / 4);
  }
  clone() {
    return new WordArray([...this.words]);
  }
}
const Hex = {
  stringify(wordArray) {
    const hexChars = [];
    for (let i = 0; i < wordArray.sigBytes; i++) {
      const bite = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      hexChars.push((bite >>> 4).toString(16), (bite & 15).toString(16));
    }
    return hexChars.join("");
  }
};
const Base64 = {
  stringify(wordArray) {
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const base64Chars = [];
    for (let i = 0; i < wordArray.sigBytes; i += 3) {
      const byte1 = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      const byte2 = wordArray.words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
      const byte3 = wordArray.words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
      const triplet = byte1 << 16 | byte2 << 8 | byte3;
      for (let j = 0; j < 4 && i * 8 + j * 6 < wordArray.sigBytes * 8; j++) {
        base64Chars.push(keyStr.charAt(triplet >>> 6 * (3 - j) & 63));
      }
    }
    return base64Chars.join("");
  }
};
const Latin1 = {
  parse(latin1Str) {
    const latin1StrLength = latin1Str.length;
    const words = [];
    for (let i = 0; i < latin1StrLength; i++) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
    }
    return new WordArray(words, latin1StrLength);
  }
};
const Utf8 = {
  parse(utf8Str) {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
};
class BufferedBlockAlgorithm {
  constructor() {
    this._data = new WordArray();
    this._nDataBytes = 0;
    this._minBufferSize = 0;
    this.blockSize = 512 / 32;
  }
  reset() {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }
  _append(data) {
    if (typeof data === "string") {
      data = Utf8.parse(data);
    }
    this._data.concat(data);
    this._nDataBytes += data.sigBytes;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _doProcessBlock(_dataWords, _offset) {
  }
  _process(doFlush) {
    let processedWords;
    let nBlocksReady = this._data.sigBytes / (this.blockSize * 4);
    if (doFlush) {
      nBlocksReady = Math.ceil(nBlocksReady);
    } else {
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }
    const nWordsReady = nBlocksReady * this.blockSize;
    const nBytesReady = Math.min(nWordsReady * 4, this._data.sigBytes);
    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += this.blockSize) {
        this._doProcessBlock(this._data.words, offset);
      }
      processedWords = this._data.words.splice(0, nWordsReady);
      this._data.sigBytes -= nBytesReady;
    }
    return new WordArray(processedWords, nBytesReady);
  }
}
class Hasher extends BufferedBlockAlgorithm {
  update(messageUpdate) {
    this._append(messageUpdate);
    this._process();
    return this;
  }
  finalize(messageUpdate) {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
  }
}

const H = [
  1779033703,
  -1150833019,
  1013904242,
  -1521486534,
  1359893119,
  -1694144372,
  528734635,
  1541459225
];
const K = [
  1116352408,
  1899447441,
  -1245643825,
  -373957723,
  961987163,
  1508970993,
  -1841331548,
  -1424204075,
  -670586216,
  310598401,
  607225278,
  1426881987,
  1925078388,
  -2132889090,
  -1680079193,
  -1046744716,
  -459576895,
  -272742522,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  -1740746414,
  -1473132947,
  -1341970488,
  -1084653625,
  -958395405,
  -710438585,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  -2117940946,
  -1838011259,
  -1564481375,
  -1474664885,
  -1035236496,
  -949202525,
  -778901479,
  -694614492,
  -200395387,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  -2067236844,
  -1933114872,
  -1866530822,
  -1538233109,
  -1090935817,
  -965641998
];
const W = [];
class SHA256 extends Hasher {
  constructor() {
    super(...arguments);
    this._hash = new WordArray([...H]);
  }
  reset() {
    super.reset();
    this._hash = new WordArray([...H]);
  }
  _doProcessBlock(M, offset) {
    const H2 = this._hash.words;
    let a = H2[0];
    let b = H2[1];
    let c = H2[2];
    let d = H2[3];
    let e = H2[4];
    let f = H2[5];
    let g = H2[6];
    let h = H2[7];
    for (let i = 0; i < 64; i++) {
      if (i < 16) {
        W[i] = M[offset + i] | 0;
      } else {
        const gamma0x = W[i - 15];
        const gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
        const gamma1x = W[i - 2];
        const gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
      }
      const ch = e & f ^ ~e & g;
      const maj = a & b ^ a & c ^ b & c;
      const sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
      const sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
      const t1 = h + sigma1 + ch + K[i] + W[i];
      const t2 = sigma0 + maj;
      h = g;
      g = f;
      f = e;
      e = d + t1 | 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 | 0;
    }
    H2[0] = H2[0] + a | 0;
    H2[1] = H2[1] + b | 0;
    H2[2] = H2[2] + c | 0;
    H2[3] = H2[3] + d | 0;
    H2[4] = H2[4] + e | 0;
    H2[5] = H2[5] + f | 0;
    H2[6] = H2[6] + g | 0;
    H2[7] = H2[7] + h | 0;
  }
  finalize(messageUpdate) {
    super.finalize(messageUpdate);
    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = this._data.sigBytes * 8;
    this._data.words[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(
      nBitsTotal / 4294967296
    );
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
    this._data.sigBytes = this._data.words.length * 4;
    this._process();
    return this._hash;
  }
}
function sha256base64(message) {
  return new SHA256().finalize(message).toString(Base64);
}

function hash(object, options = {}) {
  const hashed = typeof object === "string" ? object : objectHash(object, options);
  return sha256base64(hashed).slice(0, 10);
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function rawHeaders(headers) {
  const rawHeaders2 = [];
  for (const key in headers) {
    if (Array.isArray(headers[key])) {
      for (const h of headers[key]) {
        rawHeaders2.push(key, h);
      }
    } else {
      rawHeaders2.push(key, headers[key]);
    }
  }
  return rawHeaders2;
}
function mergeFns(...functions) {
  return function(...args) {
    for (const fn of functions) {
      fn(...args);
    }
  };
}
function createNotImplementedError(name) {
  throw new Error(`[unenv] ${name} is not implemented yet!`);
}

let defaultMaxListeners = 10;
let EventEmitter$1 = class EventEmitter {
  __unenv__ = true;
  _events = /* @__PURE__ */ Object.create(null);
  _maxListeners;
  static get defaultMaxListeners() {
    return defaultMaxListeners;
  }
  static set defaultMaxListeners(arg) {
    if (typeof arg !== "number" || arg < 0 || Number.isNaN(arg)) {
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + "."
      );
    }
    defaultMaxListeners = arg;
  }
  setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
      throw new RangeError(
        'The value of "n" is out of range. It must be a non-negative number. Received ' + n + "."
      );
    }
    this._maxListeners = n;
    return this;
  }
  getMaxListeners() {
    return _getMaxListeners(this);
  }
  emit(type, ...args) {
    if (!this._events[type] || this._events[type].length === 0) {
      return false;
    }
    if (type === "error") {
      let er;
      if (args.length > 0) {
        er = args[0];
      }
      if (er instanceof Error) {
        throw er;
      }
      const err = new Error(
        "Unhandled error." + (er ? " (" + er.message + ")" : "")
      );
      err.context = er;
      throw err;
    }
    for (const _listener of this._events[type]) {
      (_listener.listener || _listener).apply(this, args);
    }
    return true;
  }
  addListener(type, listener) {
    return _addListener(this, type, listener, false);
  }
  on(type, listener) {
    return _addListener(this, type, listener, false);
  }
  prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  }
  once(type, listener) {
    return this.on(type, _wrapOnce(this, type, listener));
  }
  prependOnceListener(type, listener) {
    return this.prependListener(type, _wrapOnce(this, type, listener));
  }
  removeListener(type, listener) {
    return _removeListener(this, type, listener);
  }
  off(type, listener) {
    return this.removeListener(type, listener);
  }
  removeAllListeners(type) {
    return _removeAllListeners(this, type);
  }
  listeners(type) {
    return _listeners(this, type, true);
  }
  rawListeners(type) {
    return _listeners(this, type, false);
  }
  listenerCount(type) {
    return this.rawListeners(type).length;
  }
  eventNames() {
    return Object.keys(this._events);
  }
};
function _addListener(target, type, listener, prepend) {
  _checkListener(listener);
  if (target._events.newListener !== void 0) {
    target.emit("newListener", type, listener.listener || listener);
  }
  if (!target._events[type]) {
    target._events[type] = [];
  }
  if (prepend) {
    target._events[type].unshift(listener);
  } else {
    target._events[type].push(listener);
  }
  const maxListeners = _getMaxListeners(target);
  if (maxListeners > 0 && target._events[type].length > maxListeners && !target._events[type].warned) {
    target._events[type].warned = true;
    const warning = new Error(
      `[unenv] Possible EventEmitter memory leak detected. ${target._events[type].length} ${type} listeners added. Use emitter.setMaxListeners() to increase limit`
    );
    warning.name = "MaxListenersExceededWarning";
    warning.emitter = target;
    warning.type = type;
    warning.count = target._events[type]?.length;
    console.warn(warning);
  }
  return target;
}
function _removeListener(target, type, listener) {
  _checkListener(listener);
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  const lenBeforeFilter = target._events[type].length;
  target._events[type] = target._events[type].filter((fn) => fn !== listener);
  if (lenBeforeFilter === target._events[type].length) {
    return target;
  }
  if (target._events.removeListener) {
    target.emit("removeListener", type, listener.listener || listener);
  }
  if (target._events[type].length === 0) {
    delete target._events[type];
  }
  return target;
}
function _removeAllListeners(target, type) {
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  if (target._events.removeListener) {
    for (const _listener of target._events[type]) {
      target.emit("removeListener", type, _listener.listener || _listener);
    }
  }
  delete target._events[type];
  return target;
}
function _wrapOnce(target, type, listener) {
  let fired = false;
  const wrapper = (...args) => {
    if (fired) {
      return;
    }
    target.removeListener(type, wrapper);
    fired = true;
    return args.length === 0 ? listener.call(target) : listener.apply(target, args);
  };
  wrapper.listener = listener;
  return wrapper;
}
function _getMaxListeners(target) {
  return target._maxListeners ?? EventEmitter$1.defaultMaxListeners;
}
function _listeners(target, type, unwrap) {
  let listeners = target._events[type];
  if (typeof listeners === "function") {
    listeners = [listeners];
  }
  return unwrap ? listeners.map((l) => l.listener || l) : listeners;
}
function _checkListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' + typeof listener
    );
  }
}

const EventEmitter = globalThis.EventEmitter || EventEmitter$1;

class _Readable extends EventEmitter {
  __unenv__ = true;
  readableEncoding = null;
  readableEnded = true;
  readableFlowing = false;
  readableHighWaterMark = 0;
  readableLength = 0;
  readableObjectMode = false;
  readableAborted = false;
  readableDidRead = false;
  closed = false;
  errored = null;
  readable = false;
  destroyed = false;
  static from(_iterable, options) {
    return new _Readable(options);
  }
  constructor(_opts) {
    super();
  }
  _read(_size) {
  }
  read(_size) {
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  isPaused() {
    return true;
  }
  unpipe(_destination) {
    return this;
  }
  unshift(_chunk, _encoding) {
  }
  wrap(_oldStream) {
    return this;
  }
  push(_chunk, _encoding) {
    return false;
  }
  _destroy(_error, _callback) {
    this.removeAllListeners();
  }
  destroy(error) {
    this.destroyed = true;
    this._destroy(error);
    return this;
  }
  pipe(_destenition, _options) {
    return {};
  }
  compose(stream, options) {
    throw new Error("[unenv] Method not implemented.");
  }
  [Symbol.asyncDispose]() {
    this.destroy();
    return Promise.resolve();
  }
  async *[Symbol.asyncIterator]() {
    throw createNotImplementedError("Readable.asyncIterator");
  }
  iterator(options) {
    throw createNotImplementedError("Readable.iterator");
  }
  map(fn, options) {
    throw createNotImplementedError("Readable.map");
  }
  filter(fn, options) {
    throw createNotImplementedError("Readable.filter");
  }
  forEach(fn, options) {
    throw createNotImplementedError("Readable.forEach");
  }
  reduce(fn, initialValue, options) {
    throw createNotImplementedError("Readable.reduce");
  }
  find(fn, options) {
    throw createNotImplementedError("Readable.find");
  }
  findIndex(fn, options) {
    throw createNotImplementedError("Readable.findIndex");
  }
  some(fn, options) {
    throw createNotImplementedError("Readable.some");
  }
  toArray(options) {
    throw createNotImplementedError("Readable.toArray");
  }
  every(fn, options) {
    throw createNotImplementedError("Readable.every");
  }
  flatMap(fn, options) {
    throw createNotImplementedError("Readable.flatMap");
  }
  drop(limit, options) {
    throw createNotImplementedError("Readable.drop");
  }
  take(limit, options) {
    throw createNotImplementedError("Readable.take");
  }
  asIndexedPairs(options) {
    throw createNotImplementedError("Readable.asIndexedPairs");
  }
}
const Readable = globalThis.Readable || _Readable;

class _Writable extends EventEmitter {
  __unenv__ = true;
  writable = true;
  writableEnded = false;
  writableFinished = false;
  writableHighWaterMark = 0;
  writableLength = 0;
  writableObjectMode = false;
  writableCorked = 0;
  closed = false;
  errored = null;
  writableNeedDrain = false;
  destroyed = false;
  _data;
  _encoding = "utf-8";
  constructor(_opts) {
    super();
  }
  pipe(_destenition, _options) {
    return {};
  }
  _write(chunk, encoding, callback) {
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return;
    }
    if (this._data === void 0) {
      this._data = chunk;
    } else {
      const a = typeof this._data === "string" ? Buffer.from(this._data, this._encoding || encoding || "utf8") : this._data;
      const b = typeof chunk === "string" ? Buffer.from(chunk, encoding || this._encoding || "utf8") : chunk;
      this._data = Buffer.concat([a, b]);
    }
    this._encoding = encoding;
    if (callback) {
      callback();
    }
  }
  _writev(_chunks, _callback) {
  }
  _destroy(_error, _callback) {
  }
  _final(_callback) {
  }
  write(chunk, arg2, arg3) {
    const encoding = typeof arg2 === "string" ? this._encoding : "utf-8";
    const cb = typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    this._write(chunk, encoding, cb);
    return true;
  }
  setDefaultEncoding(_encoding) {
    return this;
  }
  end(arg1, arg2, arg3) {
    const callback = typeof arg1 === "function" ? arg1 : typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return this;
    }
    const data = arg1 === callback ? void 0 : arg1;
    if (data) {
      const encoding = arg2 === callback ? void 0 : arg2;
      this.write(data, encoding, callback);
    }
    this.writableEnded = true;
    this.writableFinished = true;
    this.emit("close");
    this.emit("finish");
    return this;
  }
  cork() {
  }
  uncork() {
  }
  destroy(_error) {
    this.destroyed = true;
    delete this._data;
    this.removeAllListeners();
    return this;
  }
  compose(stream, options) {
    throw new Error("[h3] Method not implemented.");
  }
}
const Writable = globalThis.Writable || _Writable;

const __Duplex = class {
  allowHalfOpen = true;
  _destroy;
  constructor(readable = new Readable(), writable = new Writable()) {
    Object.assign(this, readable);
    Object.assign(this, writable);
    this._destroy = mergeFns(readable._destroy, writable._destroy);
  }
};
function getDuplex() {
  Object.assign(__Duplex.prototype, Readable.prototype);
  Object.assign(__Duplex.prototype, Writable.prototype);
  return __Duplex;
}
const _Duplex = /* @__PURE__ */ getDuplex();
const Duplex = globalThis.Duplex || _Duplex;

class Socket extends Duplex {
  __unenv__ = true;
  bufferSize = 0;
  bytesRead = 0;
  bytesWritten = 0;
  connecting = false;
  destroyed = false;
  pending = false;
  localAddress = "";
  localPort = 0;
  remoteAddress = "";
  remoteFamily = "";
  remotePort = 0;
  autoSelectFamilyAttemptedAddresses = [];
  readyState = "readOnly";
  constructor(_options) {
    super();
  }
  write(_buffer, _arg1, _arg2) {
    return false;
  }
  connect(_arg1, _arg2, _arg3) {
    return this;
  }
  end(_arg1, _arg2, _arg3) {
    return this;
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  setTimeout(_timeout, _callback) {
    return this;
  }
  setNoDelay(_noDelay) {
    return this;
  }
  setKeepAlive(_enable, _initialDelay) {
    return this;
  }
  address() {
    return {};
  }
  unref() {
    return this;
  }
  ref() {
    return this;
  }
  destroySoon() {
    this.destroy();
  }
  resetAndDestroy() {
    const err = new Error("ERR_SOCKET_CLOSED");
    err.code = "ERR_SOCKET_CLOSED";
    this.destroy(err);
    return this;
  }
}

class IncomingMessage extends Readable {
  __unenv__ = {};
  aborted = false;
  httpVersion = "1.1";
  httpVersionMajor = 1;
  httpVersionMinor = 1;
  complete = true;
  connection;
  socket;
  headers = {};
  trailers = {};
  method = "GET";
  url = "/";
  statusCode = 200;
  statusMessage = "";
  closed = false;
  errored = null;
  readable = false;
  constructor(socket) {
    super();
    this.socket = this.connection = socket || new Socket();
  }
  get rawHeaders() {
    return rawHeaders(this.headers);
  }
  get rawTrailers() {
    return [];
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  get headersDistinct() {
    return _distinct(this.headers);
  }
  get trailersDistinct() {
    return _distinct(this.trailers);
  }
}
function _distinct(obj) {
  const d = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key) {
      d[key] = (Array.isArray(value) ? value : [value]).filter(
        Boolean
      );
    }
  }
  return d;
}

class ServerResponse extends Writable {
  __unenv__ = true;
  statusCode = 200;
  statusMessage = "";
  upgrading = false;
  chunkedEncoding = false;
  shouldKeepAlive = false;
  useChunkedEncodingByDefault = false;
  sendDate = false;
  finished = false;
  headersSent = false;
  strictContentLength = false;
  connection = null;
  socket = null;
  req;
  _headers = {};
  constructor(req) {
    super();
    this.req = req;
  }
  assignSocket(socket) {
    socket._httpMessage = this;
    this.socket = socket;
    this.connection = socket;
    this.emit("socket", socket);
    this._flush();
  }
  _flush() {
    this.flushHeaders();
  }
  detachSocket(_socket) {
  }
  writeContinue(_callback) {
  }
  writeHead(statusCode, arg1, arg2) {
    if (statusCode) {
      this.statusCode = statusCode;
    }
    if (typeof arg1 === "string") {
      this.statusMessage = arg1;
      arg1 = void 0;
    }
    const headers = arg2 || arg1;
    if (headers) {
      if (Array.isArray(headers)) ; else {
        for (const key in headers) {
          this.setHeader(key, headers[key]);
        }
      }
    }
    this.headersSent = true;
    return this;
  }
  writeProcessing() {
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  appendHeader(name, value) {
    name = name.toLowerCase();
    const current = this._headers[name];
    const all = [
      ...Array.isArray(current) ? current : [current],
      ...Array.isArray(value) ? value : [value]
    ].filter(Boolean);
    this._headers[name] = all.length > 1 ? all : all[0];
    return this;
  }
  setHeader(name, value) {
    this._headers[name.toLowerCase()] = value;
    return this;
  }
  getHeader(name) {
    return this._headers[name.toLowerCase()];
  }
  getHeaders() {
    return this._headers;
  }
  getHeaderNames() {
    return Object.keys(this._headers);
  }
  hasHeader(name) {
    return name.toLowerCase() in this._headers;
  }
  removeHeader(name) {
    delete this._headers[name.toLowerCase()];
  }
  addTrailers(_headers) {
  }
  flushHeaders() {
  }
  writeEarlyHints(_headers, cb) {
    if (typeof cb === "function") {
      cb();
    }
  }
}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Error extends Error {
  constructor(message, opts = {}) {
    super(message, opts);
    __publicField$2(this, "statusCode", 500);
    __publicField$2(this, "fatal", false);
    __publicField$2(this, "unhandled", false);
    __publicField$2(this, "statusMessage");
    __publicField$2(this, "data");
    __publicField$2(this, "cause");
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
__publicField$2(H3Error, "__h3_error__", true);
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function isMethod(event, expected, allowHead) {
  if (allowHead && event.method === "HEAD") {
    return true;
  }
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected, allowHead)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}

const RawBodySymbol = Symbol.for("h3RawBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "")) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= opts.modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(name, value);
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders(
    getProxyRequestHeaders(event),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  const response = await _getFetch(opts.fetch)(target, {
    headers: opts.headers,
    ignoreResponseError: true,
    // make $ofetch.raw transparent
    ...opts.fetchOptions
  });
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name)) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    for (const [key, value] of Object.entries(input)) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Event {
  constructor(req, res) {
    __publicField(this, "__is_event__", true);
    // Context
    __publicField(this, "node");
    // Node
    __publicField(this, "web");
    // Web
    __publicField(this, "context", {});
    // Shared
    // Request
    __publicField(this, "_method");
    __publicField(this, "_path");
    __publicField(this, "_headers");
    __publicField(this, "_requestBody");
    // Response
    __publicField(this, "_handled", false);
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. **/
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. **/
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const { pathname } = parseURL(info.url || "/");
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, void 0, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      await sendError(event, error, !!app.options.debug);
    }
  };
  return toNodeHandle;
}

const s=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function mergeFetchOptions(input, defaults, Headers = globalThis.Headers) {
  const merged = {
    ...defaults,
    ...input
  };
  if (defaults?.params && input?.params) {
    merged.params = {
      ...defaults?.params,
      ...input?.params
    };
  }
  if (defaults?.query && input?.query) {
    merged.query = {
      ...defaults?.query,
      ...input?.query
    };
  }
  if (defaults?.headers && input?.headers) {
    merged.headers = new Headers(defaults?.headers || {});
    for (const [key, value] of new Headers(input?.headers || {})) {
      merged.headers.set(key, value);
    }
  }
  return merged;
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  //  Gateway Timeout
]);
const nullBodyResponses$1 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch$1(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: mergeFetchOptions(_options, globalOptions.defaults, Headers),
      response: void 0,
      error: void 0
    };
    context.options.method = context.options.method?.toUpperCase();
    if (context.options.onRequest) {
      await context.options.onRequest(context);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query || context.options.params) {
        context.request = withQuery(context.request, {
          ...context.options.params,
          ...context.options.query
        });
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(
        () => controller.abort(),
        context.options.timeout
      );
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await context.options.onRequestError(context);
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = context.response.body && !nullBodyResponses$1.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await context.options.onResponse(context);
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await context.options.onResponseError(context);
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}) => createFetch$1({
    ...globalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch || createNodeFetch();
const Headers$1 = globalThis.Headers || s;
const AbortController = globalThis.AbortController || i;
const ofetch = createFetch$1({ fetch, Headers: Headers$1, AbortController });
const $fetch = ofetch;

const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createCall(handle) {
  return function callHandle(context) {
    const req = new IncomingMessage();
    const res = new ServerResponse(req);
    req.url = context.url || "/";
    req.method = context.method || "GET";
    req.headers = {};
    if (context.headers) {
      const headerEntries = typeof context.headers.entries === "function" ? context.headers.entries() : Object.entries(context.headers);
      for (const [name, value] of headerEntries) {
        if (!value) {
          continue;
        }
        req.headers[name.toLowerCase()] = value;
      }
    }
    req.headers.host = req.headers.host || context.host || "localhost";
    req.connection.encrypted = // @ts-ignore
    req.connection.encrypted || context.protocol === "https";
    req.body = context.body || null;
    req.__unenv__ = context.context;
    return handle(req, res).then(() => {
      let body = res._data;
      if (nullBodyResponses.has(res.statusCode) || req.method.toUpperCase() === "HEAD") {
        body = null;
        delete res._headers["content-length"];
      }
      const r = {
        body,
        headers: res._headers,
        status: res.statusCode,
        statusText: res.statusMessage
      };
      req.destroy();
      res.destroy();
      return r;
    });
  };
}

function createFetch(call, _fetch = global.fetch) {
  return async function ufetch(input, init) {
    const url = input.toString();
    if (!url.startsWith("/")) {
      return _fetch(url, init);
    }
    try {
      const r = await call({ url, ...init });
      return new Response(r.body, {
        status: r.status,
        statusText: r.statusText,
        headers: Object.fromEntries(
          Object.entries(r.headers).map(([name, value]) => [
            name,
            Array.isArray(value) ? value.join(",") : String(value) || ""
          ])
        )
      });
    } catch (error) {
      return new Response(error.toString(), {
        status: Number.parseInt(error.statusCode || error.code) || 500,
        statusText: error.statusText
      });
    }
  };
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = separators ?? STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner ?? "-") : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /{{(.*?)}}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const defineAppConfig = (config) => config;

const appConfig0 = defineAppConfig({
  nuxtIcon: {},
  nui: {},
  tairo: {
    title: "SaaS Bear",
    sidebar: {
      toolbar: {
        showNavBurger: true,
        tools: [
          {
            component: "DemoThemeToggle",
            props: {
              disableTransitions: true
            }
          },
          {
            component: "DemoToolbarNotifications"
          },
          {
            component: "DemoToolbarLanguage"
          },
          {
            component: "DemoToolbarAccountMenu"
          }
        ]
      },
      circularMenu: {
        enabled: true,
        tools: [
          {
            component: "DemoThemeToggle",
            props: {
              class: "ms-auto",
              disableTransitions: true,
              inverted: true
            }
          },
          {
            component: "DemoCircularMenuLanguage"
          },
          {
            component: "DemoCircularMenuNotifications"
          },
          {
            component: "DemoCircularMenuActivity"
          }
        ]
      },
      navigation: {
        logo: {
          component: "TairoLogo",
          props: { class: "text-primary-600 h-6" }
        },
        items: [
          {
            title: "Search",
            icon: { name: "ph:magnifying-glass-duotone", class: "w-5 h-5" },
            click: () => {
              const isOpen = useState("search-open", () => false);
              isOpen.value = true;
            },
            position: "end"
          },
          {
            title: "My Account",
            component: "DemoAccountMenu",
            position: "end"
          }
        ]
      }
    },
    collapse: {
      toolbar: {
        enabled: true,
        showTitle: true,
        showNavBurger: true,
        tools: [
          {
            component: "DemoThemeToggle"
          },
          {
            component: "DemoToolbarLanguage"
          },
          {
            component: "DemoToolbarNotifications"
          },
          {
            component: "DemoToolbarActivity"
          },
          {
            component: "DemoToolbarAccountMenu"
          }
        ]
      },
      circularMenu: {
        enabled: true,
        tools: [
          {
            component: "DemoThemeToggle",
            props: {
              class: "ms-auto",
              disableTransitions: true,
              inverted: true
            }
          },
          {
            component: "DemoCircularMenuLanguage"
          },
          {
            component: "DemoCircularMenuNotifications"
          },
          {
            component: "DemoCircularMenuActivity"
          }
        ]
      },
      navigation: {
        enabled: true,
        header: {
          component: "DemoCollapseNavigationHeader"
        },
        footer: {
          component: "DemoCollapseNavigationFooter"
        },
        items: [
          {
            name: "Dashboards",
            icon: { name: "ph:sidebar-duotone", class: "w-5 h-5" },
            activePath: "/dashboards",
            children: [
              {
                name: "Personal v1",
                to: "/dashboards",
                icon: { name: "ph:coffee-duotone", class: "w-4 h-4" }
              },
              {
                name: "Personal v2",
                to: "/dashboards/personal-2",
                icon: { name: "ph:chart-pie-slice-duotone", class: "w-4 h-4" }
              },
              {
                name: "Personal v3",
                to: "/dashboards/personal-3",
                icon: { name: "ph:cactus-duotone", class: "w-4 h-4" }
              },
              {
                name: "Analytics",
                to: "/dashboards/analytics",
                icon: { name: "ph:gauge-duotone", class: "w-4 h-4" }
              },
              {
                name: "Stocks",
                to: "/dashboards/stocks",
                icon: { name: "ph:coin-duotone", class: "w-4 h-4" }
              },
              {
                name: "Sales",
                to: "/dashboards/sales",
                icon: { name: "ph:shopping-cart-duotone", class: "w-4 h-4" }
              }
            ]
          },
          {
            name: "Layouts",
            icon: { name: "ph:app-window-duotone", class: "w-5 h-5" },
            activePath: "/layouts",
            children: [
              {
                name: "List view v1",
                to: "/layouts",
                icon: { name: "ph:list-bullets-duotone", class: "w-4 h-4" }
              },
              {
                name: "Flex list v1",
                to: "/layouts/flex-list-1",
                icon: { name: "ph:list-checks-duotone", class: "w-4 h-4" }
              },
              {
                name: "Table list v1",
                to: "/layouts/table-list-1",
                icon: { name: "ph:table-duotone", class: "w-4 h-4" }
              },
              {
                name: "Card grid v1",
                to: "/layouts/card-grid-1",
                icon: { name: "ph:circles-four-duotone", class: "w-4 h-4" }
              }
            ]
          },
          {
            name: "Projects",
            icon: { name: "ph:suitcase-duotone", class: "w-5 h-5" },
            activePath: "/layouts/projects/",
            children: [
              {
                name: "Projects",
                to: "/layouts/projects/project-list-3",
                icon: { name: "ph:leaf-duotone", class: "w-4 h-4" }
              },
              {
                name: "Project Details",
                to: "/layouts/projects/details",
                icon: {
                  name: "ph:note-duotone",
                  class: "w-4 h-4"
                }
              },
              {
                name: "Kanban Board",
                to: "/layouts/projects/board",
                icon: { name: "ph:circles-four-duotone", class: "w-4 h-4" }
              }
            ]
          },
          {
            name: "Auth",
            icon: { name: "ph:lock-duotone", class: "w-5 h-5" },
            activePath: "/layouts/projects/",
            children: [
              {
                name: "Login",
                to: "/auth",
                icon: { name: "ph:fingerprint-duotone", class: "w-4 h-4" }
              },
              {
                name: "Signup",
                to: "/auth/signup-1",
                icon: {
                  name: "ph:plus-circle-duotone",
                  class: "w-4 h-4"
                }
              },
              {
                name: "Recover",
                to: "/auth",
                icon: { name: "ph:lightning-duotone", class: "w-4 h-4" }
              }
            ]
          },
          {
            name: "Widgets",
            icon: { name: "ph:nut-duotone", class: "w-5 h-5" },
            activePath: "/dashboards/widgets",
            children: [
              {
                name: "UI Widgets",
                to: "/dashboards/widgets",
                icon: { name: "ph:square-half-duotone", class: "w-4 h-4" }
              },
              {
                name: "Creative Widgets",
                to: "/dashboards/widgets/creative",
                icon: {
                  name: "ph:square-half-bottom-duotone",
                  class: "w-4 h-4"
                }
              },
              {
                name: "List Widgets",
                to: "/dashboards/widgets/list",
                icon: { name: "ph:square-half-duotone", class: "w-4 h-4" }
              }
            ]
          },
          {
            name: "Divider",
            divider: true
          },
          {
            name: "Charts",
            icon: { name: "ph:chart-pie-slice-duotone", class: "w-5 h-5" },
            to: "/dashboards/charts"
          },
          {
            name: "Wizard",
            icon: { name: "ph:magic-wand-duotone", class: "w-5 h-5" },
            to: "/wizard"
          },
          {
            name: "Messaging",
            icon: { name: "ph:chats-circle-duotone", class: "w-5 h-5" },
            to: "/dashboards/messaging"
          },
          {
            name: "Customize",
            icon: { name: "ph:drop-half-bottom-duotone", class: "w-5 h-5" },
            click: () => {
              const isSwitcherOpen = useState("switcher-open", () => false);
              isSwitcherOpen.value = true;
            },
            position: "end"
          }
        ]
      }
    },
    topnav: {
      navigation: {
        enabled: true,
        logo: {
          component: "TairoLogo",
          props: { class: "text-primary-600 h-10 w-10" }
        },
        header: {
          component: "DemoTopnavWorkspaceDropdown"
        },
        items: [
          {
            name: "Home",
            icon: { name: "ph:gauge-duotone", class: "w-6 h-6" },
            activePath: "/",
            to: "/"
          },
          {
            name: "Solutions",
            icon: { name: "ph:suitcase-duotone", class: "w-6 h-6" },
            activePath: "/layouts/projects/project-list-3",
            to: "/layouts/projects/project-list-3"
          },
          {
            name: "Pricing",
            icon: { name: "ph:users-duotone", class: "w-6 h-6" },
            activePath: "/layouts/flex-list-1",
            to: "/layouts/flex-list-1"
          },
          {
            name: "Resources",
            icon: { name: "ph:note-duotone", class: "w-6 h-6" },
            activePath: "/layouts/table-list-3",
            to: "/layouts/table-list-3"
          }
        ]
      },
      circularMenu: {
        enabled: false,
        tools: [
          {
            component: "DemoThemeToggle",
            props: {
              class: "ms-auto",
              disableTransitions: true,
              inverted: true
            }
          },
          {
            component: "DemoCircularMenuLanguage"
          },
          {
            component: "DemoCircularMenuNotifications"
          },
          {
            component: "DemoCircularMenuActivity"
          }
        ]
      },
      toolbar: {
        enabled: true,
        showTitle: false,
        tools: [
          {
            component: "DemoThemeToggle",
            props: {
              disableTransitions: true
            }
          },
          {
            component: "DemoToolbarNotifications"
          },
          {
            component: "DemoAccountMenu",
            props: {
              horizontal: true
            }
          }
        ]
      },
      footer: {
        enabled: true,
        logoSeparator: {
          component: "TairoLogo",
          props: { class: "text-primary-500 h-5 w-5" }
        },
        logo: {
          component: "TairoLogoText",
          props: {
            class: "text-muted-300 ltablet:mx-0 mx-auto h-4 transition-all duration-200 lg:mx-0"
          }
        },
        copyright: {
          name: "\u{1F43B} SaaS Bear",
          to: "https://www.sassybear.ai",
          since: "2024"
        },
        links: [
          {
            name: "Home",
            to: "/"
          },
          {
            name: "Solutions",
            to: "/solutions"
          },
          {
            name: "Pricing",
            to: "/pricing"
          },
          {
            name: "Resources",
            to: "/resources"
          }
        ]
      }
    },
    panels: [
      {
        name: "language",
        position: "right",
        component: "DemoPanelLanguage"
      },
      {
        name: "activity",
        position: "right",
        component: "DemoPanelActivity"
      },
      {
        name: "search",
        position: "left",
        component: "DemoPanelSearch"
      },
      {
        name: "task",
        position: "right",
        component: "DemoPanelTask"
      }
    ],
    error: {
      logo: {
        component: "img",
        props: {
          src: "/img/illustrations/system/404-1.svg",
          class: "relative z-20 w-full max-w-lg mx-auto"
        }
      }
    }
  }
});

const appConfig1 = {
  tairo: {
    sidebar: {
      circularMenu: {
        enabled: false,
        tools: []
      },
      toolbar: {
        enabled: true,
        showTitle: true,
        showNavBurger: false,
        tools: []
      },
      navigation: {
        enabled: true,
        startOpen: true,
        logo: {
          component: "TairoLogo",
          props: { class: "text-primary-600 h-10" }
        },
        items: []
      }
    }
  }
};

const appConfig2 = {
  tairo: {
    collapse: {
      navigation: {
        enabled: true,
        header: {
          component: ""
        },
        footer: {
          component: ""
        },
        items: []
      },
      circularMenu: {
        enabled: true,
        tools: []
      },
      toolbar: {
        enabled: true,
        showTitle: false,
        showNavBurger: false,
        tools: []
      }
    }
  }
};

const appConfig3 = {
  tairo: {
    topnav: {
      navigation: {
        enabled: true,
        logo: {
          component: "TairoLogo",
          props: { class: "text-primary-500 h-10 w-10" }
        },
        header: {
          component: void 0
        },
        items: []
      },
      circularMenu: {
        enabled: true,
        tools: []
      },
      toolbar: {
        enabled: true,
        showTitle: false,
        tools: []
      },
      footer: {
        enabled: false,
        logoSeparator: {
          component: "TairoLogo",
          props: { class: "text-primary-500 h-7 w-7" }
        },
        logo: {
          component: "TairoLogoText",
          props: {
            class: "text-muted-300 ltablet:mx-0 mx-auto h-4 transition-all duration-200 lg:mx-0"
          }
        },
        copyright: {
          name: "",
          to: "",
          since: ""
        },
        links: []
      }
    }
  }
};

const appConfig4 = {
  tairo: {
    title: "Tairo",
    error: {
      logo: {
        component: "TairoLogo",
        props: { class: "text-primary-500 mx-auto h-40 p-6" }
      }
    },
    panels: []
  },
  toaster: {
    duration: 6e3,
    dismissible: false,
    theme: {
      maxToasts: 1,
      containerClass: [
        "fixed",
        "inset-0",
        "pointer-events-none",
        "p-4",
        "flex",
        "flex-col",
        "overflow-hidden",
        "z-[200]",
        "items-start",
        "gap-2",
        "space-y-3"
      ],
      wrapperClass: [
        "pointer-events-auto",
        "focus:outline-none",
        "rounded",
        "outline-slate-300",
        "outline-offset-2",
        "focus:outline",
        "focus:outline-2",
        "focus-within:outline",
        "focus-within:outline-2"
      ],
      transition: {
        enterActiveClass: "transition duration-300 ease-out",
        enterFromClass: "transform translate-y-full opacity-0",
        enterToClass: "transform translate-y-0 opacity-100",
        leaveActiveClass: "transition duration-200 ease-in",
        leaveFromClass: "transform translate-y-0 opacity-100",
        leaveToClass: "transform translate-y-full opacity-0"
      }
    }
  }
};

const appConfig5 = {
  nui: {
    // #region base
    BaseAccordion: {
      action: "dot",
      color: "default",
      dotColor: "primary",
      rounded: "sm"
    },
    BaseAvatar: {
      color: "muted",
      rounded: "full",
      size: "sm"
    },
    BaseAvatarGroup: {
      limit: 4,
      size: "sm"
    },
    BaseBreadcrumb: {
      color: "primary"
    },
    BaseButton: {
      color: "default",
      rounded: "sm",
      size: "md",
      variant: "solid"
    },
    BaseButtonAction: {
      color: "default",
      rounded: "sm"
    },
    BaseButtonClose: {
      color: "default",
      rounded: "full",
      size: "sm"
    },
    BaseButtonGroup: {},
    BaseButtonIcon: {
      color: "default",
      rounded: "sm",
      size: "md"
    },
    BaseCard: {
      color: "default",
      rounded: "sm"
    },
    BaseDropdown: {
      buttonColor: "default",
      color: "default",
      placement: "bottom-start",
      rounded: "sm",
      size: "md",
      variant: "button"
    },
    BaseDropdownDivider: {},
    BaseDropdownItem: {
      color: "primary",
      contrast: "default",
      rounded: "sm"
    },
    BaseHeading: {
      as: "p",
      lead: "normal",
      size: "xl",
      weight: "semibold"
    },
    BaseIconBox: {
      color: "default",
      rounded: "sm",
      size: "xs",
      variant: "solid"
    },
    BaseKbd: {
      color: "default",
      rounded: "sm",
      size: "sm"
    },
    BaseLink: {},
    BaseList: {},
    BaseListItem: {},
    BaseMessage: {
      color: "default",
      rounded: "sm",
      defaultIcons: {
        muted: "akar-icons:info-fill",
        "muted-contrast": "akar-icons:info-fill",
        default: "akar-icons:info-fill",
        "default-contrast": "akar-icons:info-fill",
        info: "akar-icons:info-fill",
        success: "carbon:checkmark-filled",
        warning: "ci:warning",
        danger: "ph:warning-octagon-fill",
        primary: "akar-icons:info-fill"
      }
    },
    BasePagination: {
      color: "primary",
      rounded: "sm"
    },
    BaseParagraph: {
      as: "p",
      lead: "normal",
      size: "md",
      weight: "normal"
    },
    BasePlaceholderPage: {
      imageSize: "xs"
    },
    BasePlaceload: {},
    BaseProgress: {
      color: "primary",
      contrast: "default",
      rounded: "full",
      size: "sm"
    },
    BaseProgressCircle: {
      color: "primary"
    },
    BaseProse: {
      rounded: "none"
    },
    BaseSnack: {
      color: "default",
      size: "md"
    },
    BaseTabs: {
      color: "primary",
      justify: "start",
      type: "tabs"
    },
    BaseTabSlider: {
      color: "default",
      justify: "start",
      rounded: "lg",
      size: "md"
    },
    BaseTag: {
      color: "default",
      rounded: "lg",
      size: "md",
      variant: "solid"
    },
    BaseText: {
      lead: "normal",
      size: "md",
      weight: "normal"
    },
    BaseThemeSwitch: {
      disableTransitions: false
    },
    BaseThemeToggle: {
      disableTransitions: false
    },
    // #endregion
    // #region form
    BaseAutocomplete: {
      contrast: "default",
      i18n: {
        empty: "Nothing found.",
        pending: "Loading ..."
      },
      rounded: "sm",
      size: "md"
    },
    BaseAutocompleteItem: {
      rounded: "sm"
    },
    BaseCheckbox: {
      color: "default",
      rounded: "sm"
    },
    BaseCheckboxAnimated: {
      color: "primary"
    },
    BaseCheckboxHeadless: {},
    BaseFullscreenDropfile: {
      color: "primary"
    },
    BaseInput: {
      contrast: "default",
      rounded: "sm",
      size: "md"
    },
    BaseInputFile: {
      contrast: "default",
      rounded: "sm",
      size: "md",
      i18n: {
        empty: "No file chosen",
        invalid: "Invalid file selected",
        multiple: "{count} files selected"
      }
    },
    BaseInputFileHeadless: {},
    BaseInputNumber: {
      contrast: "default",
      rounded: "sm",
      size: "md"
    },
    BaseInputHelpText: {
      color: "default"
    },
    BaseListbox: {
      contrast: "default",
      placement: "bottom-start",
      rounded: "sm",
      size: "md"
    },
    BaseListboxItem: {},
    BaseRadio: {
      color: "default"
    },
    BaseRadioHeadless: {},
    BaseSelect: {
      contrast: "default",
      rounded: "sm",
      size: "md"
    },
    BaseSwitchBall: {
      color: "primary"
    },
    BaseSwitchThin: {
      color: "primary"
    },
    BaseTextarea: {
      contrast: "default",
      rounded: "sm",
      size: "md"
    },
    BaseTreeSelect: {},
    BaseTreeSelectItem: {
      rounded: "sm"
    }
    // #endregion
  }
};

const inlineAppConfig = {
  "nuxt": {
    "buildId": "53000625-b389-4bcc-a236-7ca7439f1dee"
  }
};

const appConfig = defuFn(appConfig0, appConfig1, appConfig2, appConfig3, appConfig4, appConfig5, inlineAppConfig);

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {
    "mongoose": {
      "uri": "mongodb+srv://saasbear:Faraz123.$@cluster0.jbsks3h.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"
    }
  },
  "mongodbUri": "mongodb+srv://saasbear:Faraz123.$@cluster0.jbsks3h.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0",
  "mongoose": {
    "uri": "mongodb+srv://saasbear:Faraz123.$@cluster0.jbsks3h.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0",
    "options": {},
    "devtools": true,
    "modelsDir": "C:/Users/Thomas/Desktop/Belens Application/.app/server/models"
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
function checkBufferSupport() {
  if (typeof Buffer === void 0) {
    throw new TypeError("[unstorage] Buffer is not supported!");
  }
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  checkBufferSupport();
  const base64 = Buffer.from(value).toString("base64");
  return BASE64_PREFIX + base64;
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  checkBufferSupport();
  return Buffer.from(value.slice(BASE64_PREFIX.length), "base64");
}

const storageKeyProperties = [
  "hasItem",
  "getItem",
  "getItemRaw",
  "setItem",
  "setItemRaw",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    options: {},
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return Array.from(data.keys());
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      for (const mount of mounts) {
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        const keys = rawKeys.map((key) => mount.mountpoint + normalizeKey$1(key)).filter((key) => !maskedMounts.some((p) => key.startsWith(p)));
        allKeys.push(...keys);
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      return base ? allKeys.filter((key) => key.startsWith(base) && !key.endsWith("$")) : allKeys.filter((key) => !key.endsWith("$"));
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    }
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        const dirFiles = await readdirRecursive(entryPath, ignore);
        files.push(...dirFiles.map((f) => entry.name + "/" + f));
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.\:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys() {
      return readdirRecursive(r("."), opts.ignore);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"C:\\Users\\Thomas\\Desktop\\Belens Application\\.app\\.data\\kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          const promise = useStorage().setItem(cacheKey, entry).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event && event.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      const _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        variableHeaders[header] = incomingEvent.node.req.headers[header];
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        event.node.res.setHeader(name, value);
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const basicReporter = {
  log(logObj) {
    (console[logObj.type] || console.log)(...logObj.args);
  }
};
function createConsola(options = {}) {
  return createConsola$1({
    reporters: [basicReporter],
    ...options
  });
}
const consola = createConsola();
consola.consola = consola;

const _colorize = String;
const colors = new Proxy({}, {
  get(_, colorName) {
    return _colorize;
  }
});

async function defineMongooseConnection({ uri, options } = {}) {
  const config = useRuntimeConfig().mongoose;
  const mongooseUri = uri || config.uri;
  const mongooseOptions = options || config.options;
  try {
    await mongoose.connect(mongooseUri, { ...mongooseOptions });
    consola.success("Connected to MongoDB");
  } catch (err) {
    consola.error(colors.red(`Error connecting to MongoDB: ${err}`));
  }
}

function defineNitroPlugin(def) {
  return def;
}
const _3bPgOCRuGj = defineNitroPlugin(() => {
  defineMongooseConnection();
});

const script = "\"use strict\";(()=>{const a=window,e=document.documentElement,c=window.localStorage,d=[\"dark\",\"light\"],n=c&&c.getItem&&c.getItem(\"nuxt-color-mode\")||\"system\";let l=n===\"system\"?f():n;const i=e.getAttribute(\"data-color-mode-forced\");i&&(l=i),r(l),a[\"__NUXT_COLOR_MODE__\"]={preference:n,value:l,getColorScheme:f,addColorScheme:r,removeColorScheme:u};function r(o){const t=\"\"+o+\"\",s=\"\";e.classList?e.classList.add(t):e.className+=\" \"+t,s&&e.setAttribute(\"data-\"+s,o)}function u(o){const t=\"\"+o+\"\",s=\"\";e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp(t,\"g\"),\"\"),s&&e.removeAttribute(\"data-\"+s)}function m(o){return a.matchMedia(\"(prefers-color-scheme\"+o+\")\")}function f(){if(a.matchMedia&&m(\"\").media!==\"not all\"){for(const o of d)if(m(\":\"+o).matches)return o}return\"light\"}})();\n";

const _5fSlMFOJmg = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins = [
  _3bPgOCRuGj,
_5fSlMFOJmg
];

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: "",
    // TODO: check and validate error.data for serialisation into query
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (!res) {
    const { template } = await import('../../_/error-500.mjs');
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  return send(event, html);
});

const assets = {
  "/favicon.png": {
    "type": "image/png",
    "etag": "\"8a35-QnSMiMZAHaFMgFiRLQjTqdKWXAY\"",
    "mtime": "2024-05-19T06:48:19.712Z",
    "size": 35381,
    "path": "../public/favicon.png"
  },
  "/img/eagleright.png": {
    "type": "image/png",
    "etag": "\"103d24-KNsTMdDhJglHrKGRuV8J1ydl230\"",
    "mtime": "2024-05-19T08:01:20.713Z",
    "size": 1064228,
    "path": "../public/img/eagleright.png"
  },
  "/img/favicon.png": {
    "type": "image/png",
    "etag": "\"8a35-QnSMiMZAHaFMgFiRLQjTqdKWXAY\"",
    "mtime": "2024-05-19T06:48:19.712Z",
    "size": 35381,
    "path": "../public/img/favicon.png"
  },
  "/img/polarbear.png": {
    "type": "image/png",
    "etag": "\"8a35-QnSMiMZAHaFMgFiRLQjTqdKWXAY\"",
    "mtime": "2024-05-19T06:48:19.712Z",
    "size": 35381,
    "path": "../public/img/polarbear.png"
  },
  "/_nuxt/27bQY4ce.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4c0-e2esD/TW4A8aAKvD4gq0P2/QjAs\"",
    "mtime": "2024-12-16T03:45:13.229Z",
    "size": 1216,
    "path": "../public/_nuxt/27bQY4ce.js"
  },
  "/_nuxt/2onfG7Bk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3968-5vpGDqMh5swYSgDZhrkFKlTZ5cs\"",
    "mtime": "2024-12-16T03:45:13.241Z",
    "size": 14696,
    "path": "../public/_nuxt/2onfG7Bk.js"
  },
  "/_nuxt/3SsSAhYZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15e9-VSVDJ5p0ba8lXItE17AkP4Qzois\"",
    "mtime": "2024-12-16T03:45:13.239Z",
    "size": 5609,
    "path": "../public/_nuxt/3SsSAhYZ.js"
  },
  "/_nuxt/AIR4ZCVe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2c6-MUNv6ewYyOc3iycNbDjPl29U+Es\"",
    "mtime": "2024-12-16T03:45:13.239Z",
    "size": 710,
    "path": "../public/_nuxt/AIR4ZCVe.js"
  },
  "/_nuxt/Bb-cajjs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"52-HIwNNQq5YgwqYHq77HDZIQqFebY\"",
    "mtime": "2024-12-16T03:45:13.225Z",
    "size": 82,
    "path": "../public/_nuxt/Bb-cajjs.js"
  },
  "/_nuxt/BcdKrAMO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"556-wwsDlUFZY8wVOI1D9N1n8KAS3rU\"",
    "mtime": "2024-12-16T03:45:13.230Z",
    "size": 1366,
    "path": "../public/_nuxt/BcdKrAMO.js"
  },
  "/_nuxt/BdTB-59g.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3c0b5-YDBzDv/znWLCuBJYz7gdJEwOmWk\"",
    "mtime": "2024-12-16T03:45:13.244Z",
    "size": 245941,
    "path": "../public/_nuxt/BdTB-59g.js"
  },
  "/_nuxt/BDzpu_pW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"40a-iJo5ZskN+wkWx6R5U7K+gzrQU8E\"",
    "mtime": "2024-12-16T03:45:13.239Z",
    "size": 1034,
    "path": "../public/_nuxt/BDzpu_pW.js"
  },
  "/_nuxt/BEc5SVrF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"43b-xZCoS5JiN/EIkdWmNSHFn9oUycY\"",
    "mtime": "2024-12-16T03:45:13.241Z",
    "size": 1083,
    "path": "../public/_nuxt/BEc5SVrF.js"
  },
  "/_nuxt/BGscbd7u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"283-tqMXLusHdx2jN+Dpiq5t+eZd8+I\"",
    "mtime": "2024-12-16T03:45:13.201Z",
    "size": 643,
    "path": "../public/_nuxt/BGscbd7u.js"
  },
  "/_nuxt/BHAjzfTM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1565-aE2o3TPHsZUfwOC6Coh30kFMN8Y\"",
    "mtime": "2024-12-16T03:45:13.239Z",
    "size": 5477,
    "path": "../public/_nuxt/BHAjzfTM.js"
  },
  "/_nuxt/BL69-MhK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a92-5u/l/BGadRNuKLwUGfkSv7w5+LU\"",
    "mtime": "2024-12-16T03:45:13.239Z",
    "size": 6802,
    "path": "../public/_nuxt/BL69-MhK.js"
  },
  "/_nuxt/BRAHGUHj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2e56-ogCbIPSI3cKKhmq7iFB3vQhtrtc\"",
    "mtime": "2024-12-16T03:45:13.229Z",
    "size": 11862,
    "path": "../public/_nuxt/BRAHGUHj.js"
  },
  "/_nuxt/BtwKVcU1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"125-T3N1jM+0EdyUCYn6UnlX2e+NN0Y\"",
    "mtime": "2024-12-16T03:45:13.229Z",
    "size": 293,
    "path": "../public/_nuxt/BtwKVcU1.js"
  },
  "/_nuxt/BUkPELon.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"635-LvkfEIlRFtYk8EYw9sHpCaerUfQ\"",
    "mtime": "2024-12-16T03:45:13.219Z",
    "size": 1589,
    "path": "../public/_nuxt/BUkPELon.js"
  },
  "/_nuxt/Bw-m4_ow.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"28d0-7vz/WCiGEGT64Oy5HgZE9utY/Rs\"",
    "mtime": "2024-12-16T03:45:13.238Z",
    "size": 10448,
    "path": "../public/_nuxt/Bw-m4_ow.js"
  },
  "/_nuxt/ByFXh7Ap.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6d-rnslOk2z+6BOGBemrwL6/W3+Dys\"",
    "mtime": "2024-12-16T03:45:13.199Z",
    "size": 109,
    "path": "../public/_nuxt/ByFXh7Ap.js"
  },
  "/_nuxt/BZ9MYVZO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a5-igZvy2RN9GdwUyNo3c/wsRkjgl8\"",
    "mtime": "2024-12-16T03:45:13.212Z",
    "size": 421,
    "path": "../public/_nuxt/BZ9MYVZO.js"
  },
  "/_nuxt/B_EutbAO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"278-+4oR1v7JQ4SQw8ScThV96edm4K0\"",
    "mtime": "2024-12-16T03:45:13.221Z",
    "size": 632,
    "path": "../public/_nuxt/B_EutbAO.js"
  },
  "/_nuxt/C1mlRjRH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"273-dGYRaBw6WM6qriI6/Ll5et7AVY0\"",
    "mtime": "2024-12-16T03:45:13.230Z",
    "size": 627,
    "path": "../public/_nuxt/C1mlRjRH.js"
  },
  "/_nuxt/C6lSRgZ_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2255-XFsxWrafckk58MpbJNkFwYVgZxo\"",
    "mtime": "2024-12-16T03:45:13.221Z",
    "size": 8789,
    "path": "../public/_nuxt/C6lSRgZ_.js"
  },
  "/_nuxt/C7Y8PJsf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5dbf-M033Nrd0wInotpgDgPCn6dwhkMw\"",
    "mtime": "2024-12-16T03:45:13.229Z",
    "size": 23999,
    "path": "../public/_nuxt/C7Y8PJsf.js"
  },
  "/_nuxt/C9D4Id5w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"bc-Ncxh1EYksugzGQhJbnAipJtQ7Ik\"",
    "mtime": "2024-12-16T03:45:13.228Z",
    "size": 188,
    "path": "../public/_nuxt/C9D4Id5w.js"
  },
  "/_nuxt/CH9UQFu0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"74-nxqQo5dNBzwuUvqb70RuKvW8rCs\"",
    "mtime": "2024-12-16T03:45:13.221Z",
    "size": 116,
    "path": "../public/_nuxt/CH9UQFu0.js"
  },
  "/_nuxt/CHIkifRQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f8-g/DUzhRXse/pXFOTMlKh+K5C7Go\"",
    "mtime": "2024-12-16T03:45:13.238Z",
    "size": 248,
    "path": "../public/_nuxt/CHIkifRQ.js"
  },
  "/_nuxt/CjDFwcOM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"580-kQ8S+mIK2mLum9CZjN/Wqo3VRnk\"",
    "mtime": "2024-12-16T03:45:13.218Z",
    "size": 1408,
    "path": "../public/_nuxt/CjDFwcOM.js"
  },
  "/_nuxt/CqBCENUc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3d2a-/gv0/dqktMuJZk75rfH3adIZoiE\"",
    "mtime": "2024-12-16T03:45:13.244Z",
    "size": 15658,
    "path": "../public/_nuxt/CqBCENUc.js"
  },
  "/_nuxt/CqL88-41.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d3-23gn1rClt0PfbfFpDZ/BYGCNslE\"",
    "mtime": "2024-12-16T03:45:13.221Z",
    "size": 211,
    "path": "../public/_nuxt/CqL88-41.js"
  },
  "/_nuxt/Cu6bPGJ3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"518-vgkYmSCEd0U7zE+FhG+av5KNqdA\"",
    "mtime": "2024-12-16T03:45:13.221Z",
    "size": 1304,
    "path": "../public/_nuxt/Cu6bPGJ3.js"
  },
  "/_nuxt/CZKiTu4_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"118a-18/2pYqUJANTIghndeQ+CNB2B20\"",
    "mtime": "2024-12-16T03:45:13.238Z",
    "size": 4490,
    "path": "../public/_nuxt/CZKiTu4_.js"
  },
  "/_nuxt/D0lkcGEz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6fe-M+IVypAYI/w42sz2DdfF9Y/n/6w\"",
    "mtime": "2024-12-16T03:45:13.240Z",
    "size": 1790,
    "path": "../public/_nuxt/D0lkcGEz.js"
  },
  "/_nuxt/D4mdBJfd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"46ac-V5xY/jHghsklBrK+WYhSjw2svv4\"",
    "mtime": "2024-12-16T03:45:13.239Z",
    "size": 18092,
    "path": "../public/_nuxt/D4mdBJfd.js"
  },
  "/_nuxt/D5oVWPAX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8ce1-7JsRLjQjDZk/fDKeWQJRcosbw4I\"",
    "mtime": "2024-12-16T03:45:13.240Z",
    "size": 36065,
    "path": "../public/_nuxt/D5oVWPAX.js"
  },
  "/_nuxt/D5UYIh7n.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"296-CC00BdvYZr3KOWjp3z1DVWvI64w\"",
    "mtime": "2024-12-16T03:45:13.221Z",
    "size": 662,
    "path": "../public/_nuxt/D5UYIh7n.js"
  },
  "/_nuxt/DbLm-Aro.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"562-QwumyV6H4I16DSmk65IuB/ncGXo\"",
    "mtime": "2024-12-16T03:45:13.228Z",
    "size": 1378,
    "path": "../public/_nuxt/DbLm-Aro.js"
  },
  "/_nuxt/DbYh5XI3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3f9c-AK2EgKIoKJAUOxtjGosqyiYtl0o\"",
    "mtime": "2024-12-16T03:45:13.229Z",
    "size": 16284,
    "path": "../public/_nuxt/DbYh5XI3.js"
  },
  "/_nuxt/DcI7UQCK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"42a-1uIxJZ3X45Shnwn2ih/fAlU6t04\"",
    "mtime": "2024-12-16T03:45:13.231Z",
    "size": 1066,
    "path": "../public/_nuxt/DcI7UQCK.js"
  },
  "/_nuxt/Dcknteu9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"da4-iZWVp8ld1LOTo/FD6y1ffC1qw/U\"",
    "mtime": "2024-12-16T03:45:13.229Z",
    "size": 3492,
    "path": "../public/_nuxt/Dcknteu9.js"
  },
  "/_nuxt/DDzF2AEt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"187c-NFZMARcBP0jm/7Z2SnpVQQ1EJSU\"",
    "mtime": "2024-12-16T03:45:13.221Z",
    "size": 6268,
    "path": "../public/_nuxt/DDzF2AEt.js"
  },
  "/_nuxt/DeMFEWLY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"75-JCDUhbc+BYRy8YAFnhMIl0N/zIU\"",
    "mtime": "2024-12-16T03:45:13.230Z",
    "size": 117,
    "path": "../public/_nuxt/DeMFEWLY.js"
  },
  "/_nuxt/DemoPanelAccount.XyjDcPa4.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2146-P060CibVn/CMttcPoOPcIPNW5gw\"",
    "mtime": "2024-12-16T03:45:13.199Z",
    "size": 8518,
    "path": "../public/_nuxt/DemoPanelAccount.XyjDcPa4.css"
  },
  "/_nuxt/DemoThemeToggle.BlC-ZT_2.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"59-6lTSYooJh8zXPYFAFmz595HWDz8\"",
    "mtime": "2024-12-16T03:45:13.199Z",
    "size": 89,
    "path": "../public/_nuxt/DemoThemeToggle.BlC-ZT_2.css"
  },
  "/_nuxt/DGjagq-c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3739-Hx3Igw3SHcLan6eQAjxf7dc/wiE\"",
    "mtime": "2024-12-16T03:45:13.239Z",
    "size": 14137,
    "path": "../public/_nuxt/DGjagq-c.js"
  },
  "/_nuxt/DhyhZ8eq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1066-RU6fvl6qJi26CBTBc88ijnqJtcc\"",
    "mtime": "2024-12-16T03:45:13.219Z",
    "size": 4198,
    "path": "../public/_nuxt/DhyhZ8eq.js"
  },
  "/_nuxt/DIaQ9P19.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"154-Hxzfxu01xsornGpemrj+hUXMErE\"",
    "mtime": "2024-12-16T03:45:13.239Z",
    "size": 340,
    "path": "../public/_nuxt/DIaQ9P19.js"
  },
  "/_nuxt/DJQMLLkD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f8a-J+5xWFg/C0kW90tIbV1LC+s9oFA\"",
    "mtime": "2024-12-16T03:45:13.240Z",
    "size": 8074,
    "path": "../public/_nuxt/DJQMLLkD.js"
  },
  "/_nuxt/DjZhNEt8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"db3-m6mTeM8ADTwwtU7PFs7T7Av5gvI\"",
    "mtime": "2024-12-16T03:45:13.228Z",
    "size": 3507,
    "path": "../public/_nuxt/DjZhNEt8.js"
  },
  "/_nuxt/Dkxy4BUq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"532-0ofl3kxiAQEOxXk6tUV/EFyafC0\"",
    "mtime": "2024-12-16T03:45:13.229Z",
    "size": 1330,
    "path": "../public/_nuxt/Dkxy4BUq.js"
  },
  "/_nuxt/DpK3YqkO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"270-7GwTU0lt9KftU4eiv6HsOfV8LZM\"",
    "mtime": "2024-12-16T03:45:13.238Z",
    "size": 624,
    "path": "../public/_nuxt/DpK3YqkO.js"
  },
  "/_nuxt/DPwofR4Z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c4b-XZek8LSwAk1TJeU9znHBSyZwHtc\"",
    "mtime": "2024-12-16T03:45:13.239Z",
    "size": 3147,
    "path": "../public/_nuxt/DPwofR4Z.js"
  },
  "/_nuxt/DUqREMfG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"389-V/AoePZWGVbk8XVFmqiH7CQnxx8\"",
    "mtime": "2024-12-16T03:45:13.230Z",
    "size": 905,
    "path": "../public/_nuxt/DUqREMfG.js"
  },
  "/_nuxt/Dw2gPVgo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"49a-aAUcOuWMWVSngGl4/le1VBAqcxk\"",
    "mtime": "2024-12-16T03:45:13.239Z",
    "size": 1178,
    "path": "../public/_nuxt/Dw2gPVgo.js"
  },
  "/_nuxt/Dxjtr6Ew.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a9a-7xW0GW5H62dqYSivs7VFfAXcMfM\"",
    "mtime": "2024-12-16T03:45:13.220Z",
    "size": 6810,
    "path": "../public/_nuxt/Dxjtr6Ew.js"
  },
  "/_nuxt/DxvQY_B8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"340c-oxnZlqOZzM8ZQe8mhfj52P4Tyys\"",
    "mtime": "2024-12-16T03:45:13.236Z",
    "size": 13324,
    "path": "../public/_nuxt/DxvQY_B8.js"
  },
  "/_nuxt/DzKKKXDy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"52-FGkdm838+r/jzYl286yI0R9sUa8\"",
    "mtime": "2024-12-16T03:45:13.218Z",
    "size": 82,
    "path": "../public/_nuxt/DzKKKXDy.js"
  },
  "/_nuxt/entry.BOwOP5IJ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c6-vD+O2tim7QG45oTlW7kvMTcltdk\"",
    "mtime": "2024-12-16T03:45:13.199Z",
    "size": 198,
    "path": "../public/_nuxt/entry.BOwOP5IJ.css"
  },
  "/_nuxt/EpwHHwaE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"df-BPGi+SwJg3LCs/OTY72+56Hr6DU\"",
    "mtime": "2024-12-16T03:45:13.229Z",
    "size": 223,
    "path": "../public/_nuxt/EpwHHwaE.js"
  },
  "/_nuxt/gkZ7sznU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1fe-fmF0cktp3eY1ki5rb/8l+IKyZzE\"",
    "mtime": "2024-12-16T03:45:13.228Z",
    "size": 510,
    "path": "../public/_nuxt/gkZ7sznU.js"
  },
  "/_nuxt/H0yGCRTY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"125-69m/yYmLe0HM59HcHfaa0Hq7+g0\"",
    "mtime": "2024-12-16T03:45:13.229Z",
    "size": 293,
    "path": "../public/_nuxt/H0yGCRTY.js"
  },
  "/_nuxt/IconCSS.CJ6kZqT-.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"102-P1gQcsEs57OsZqszzOM4vmJfSb0\"",
    "mtime": "2024-12-16T03:45:13.199Z",
    "size": 258,
    "path": "../public/_nuxt/IconCSS.CJ6kZqT-.css"
  },
  "/_nuxt/index.ezq3fwCj.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"dd-tuWFCYjleZPO3KN9F0VsXWYcG9c\"",
    "mtime": "2024-12-16T03:45:13.199Z",
    "size": 221,
    "path": "../public/_nuxt/index.ezq3fwCj.css"
  },
  "/_nuxt/inter-cyrillic-ext-wght-normal.DIEz8p5i.woff2": {
    "type": "font/woff2",
    "etag": "\"6a94-p7ZBseVEPLFzwr2bLKPEBds+s3Y\"",
    "mtime": "2024-12-16T03:45:13.186Z",
    "size": 27284,
    "path": "../public/_nuxt/inter-cyrillic-ext-wght-normal.DIEz8p5i.woff2"
  },
  "/_nuxt/inter-cyrillic-wght-normal.BmJJXa8e.woff2": {
    "type": "font/woff2",
    "etag": "\"44c0-Jt/1moqAs9SnNh30zblI3A4YOnk\"",
    "mtime": "2024-12-16T03:45:13.198Z",
    "size": 17600,
    "path": "../public/_nuxt/inter-cyrillic-wght-normal.BmJJXa8e.woff2"
  },
  "/_nuxt/inter-greek-ext-wght-normal.D5AYLNiq.woff2": {
    "type": "font/woff2",
    "etag": "\"31bc-SyzyE2bnRK/a6w+Slw669+p1mHg\"",
    "mtime": "2024-12-16T03:45:13.198Z",
    "size": 12732,
    "path": "../public/_nuxt/inter-greek-ext-wght-normal.D5AYLNiq.woff2"
  },
  "/_nuxt/inter-greek-wght-normal.DyIDNIyN.woff2": {
    "type": "font/woff2",
    "etag": "\"57d0-YJqZ3TJ+G4oaD17iIJ9w4JzoLMg\"",
    "mtime": "2024-12-16T03:45:13.199Z",
    "size": 22480,
    "path": "../public/_nuxt/inter-greek-wght-normal.DyIDNIyN.woff2"
  },
  "/_nuxt/inter-latin-ext-wght-normal.CN1pIXkb.woff2": {
    "type": "font/woff2",
    "etag": "\"13844-NO6dhCwNDkYyWuYI/NdZKeeycmk\"",
    "mtime": "2024-12-16T03:45:13.199Z",
    "size": 79940,
    "path": "../public/_nuxt/inter-latin-ext-wght-normal.CN1pIXkb.woff2"
  },
  "/_nuxt/inter-latin-wght-normal.BgVq2Tq4.woff2": {
    "type": "font/woff2",
    "etag": "\"b670-OTMRveJrmaStk1+lW60dznmUOIs\"",
    "mtime": "2024-12-16T03:45:13.198Z",
    "size": 46704,
    "path": "../public/_nuxt/inter-latin-wght-normal.BgVq2Tq4.woff2"
  },
  "/_nuxt/inter-vietnamese-wght-normal._GQuwPVU.woff2": {
    "type": "font/woff2",
    "etag": "\"292c-Y8sHnyFc8scLABqcKYLA+rVGWkA\"",
    "mtime": "2024-12-16T03:45:13.198Z",
    "size": 10540,
    "path": "../public/_nuxt/inter-vietnamese-wght-normal._GQuwPVU.woff2"
  },
  "/_nuxt/jhny_kVU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b56-gQypVEA5V3gP/Wy2VSt/TePkKfQ\"",
    "mtime": "2024-12-16T03:45:13.221Z",
    "size": 2902,
    "path": "../public/_nuxt/jhny_kVU.js"
  },
  "/_nuxt/k5M_ZLJu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d5b-JI0mUNHpVOsPhukwJq2xGw+VNkI\"",
    "mtime": "2024-12-16T03:45:13.221Z",
    "size": 3419,
    "path": "../public/_nuxt/k5M_ZLJu.js"
  },
  "/_nuxt/karla-latin-ext-wght-normal.DZr4N-ae.woff2": {
    "type": "font/woff2",
    "etag": "\"3ab4-ecSFqF9iGM6LnN2ovHPanOxRIKQ\"",
    "mtime": "2024-12-16T03:45:13.198Z",
    "size": 15028,
    "path": "../public/_nuxt/karla-latin-ext-wght-normal.DZr4N-ae.woff2"
  },
  "/_nuxt/karla-latin-wght-normal.C-PIW0WO.woff2": {
    "type": "font/woff2",
    "etag": "\"7e54-5qnlWGMPVpu8k3U3KWlBzutDIl4\"",
    "mtime": "2024-12-16T03:45:13.198Z",
    "size": 32340,
    "path": "../public/_nuxt/karla-latin-wght-normal.C-PIW0WO.woff2"
  },
  "/_nuxt/kGORId8s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1864-8Wofb2IFKcASqUSFSa6dJ6PNO/I\"",
    "mtime": "2024-12-16T03:45:13.219Z",
    "size": 6244,
    "path": "../public/_nuxt/kGORId8s.js"
  },
  "/_nuxt/Lk-1axkz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d3-W8aPdPc75ApBEjJ2R139iPi6ECE\"",
    "mtime": "2024-12-16T03:45:13.221Z",
    "size": 467,
    "path": "../public/_nuxt/Lk-1axkz.js"
  },
  "/_nuxt/mlDp25Jy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d0e-gXQUlryNBjUGHXI5njcAg1VLQMQ\"",
    "mtime": "2024-12-16T03:45:13.219Z",
    "size": 7438,
    "path": "../public/_nuxt/mlDp25Jy.js"
  },
  "/_nuxt/pw0acHvw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"838-vxQSEDJg7K/bciQVd990NM04EhE\"",
    "mtime": "2024-12-16T03:45:13.199Z",
    "size": 2104,
    "path": "../public/_nuxt/pw0acHvw.js"
  },
  "/_nuxt/QWsLdsNk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1cf-QTZUAhEyKPcao6BAKqV84ozgFm4\"",
    "mtime": "2024-12-16T03:45:13.221Z",
    "size": 463,
    "path": "../public/_nuxt/QWsLdsNk.js"
  },
  "/_nuxt/ROXZJFNz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c1-L3p+BG6MC8xl3a+u1pDN3zzV0zE\"",
    "mtime": "2024-12-16T03:45:13.199Z",
    "size": 449,
    "path": "../public/_nuxt/ROXZJFNz.js"
  },
  "/_nuxt/twpHJD_k.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e12-pwJm/pJJTQDbA6kXb8TnCx9PuMs\"",
    "mtime": "2024-12-16T03:45:13.219Z",
    "size": 3602,
    "path": "../public/_nuxt/twpHJD_k.js"
  },
  "/_nuxt/vWbe_5mK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1252-WHP032to2uPXbMEwcayDk3u6ujE\"",
    "mtime": "2024-12-16T03:45:13.230Z",
    "size": 4690,
    "path": "../public/_nuxt/vWbe_5mK.js"
  },
  "/_nuxt/_id_.4-2txrzq.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"f8-b/W3PTiK9gLar75HB2UtkWGTDhM\"",
    "mtime": "2024-12-16T03:45:13.199Z",
    "size": 248,
    "path": "../public/_nuxt/_id_.4-2txrzq.css"
  },
  "/_nuxt/_id_.D1xRUxmd.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"63-7EyHkMVUkmBna7sCaFmSh3z7P7Y\"",
    "mtime": "2024-12-16T03:45:13.199Z",
    "size": 99,
    "path": "../public/_nuxt/_id_.D1xRUxmd.css"
  },
  "/img/apps/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"7e37-dGdEtvvUeLkxJOGtGF5Cpns1Ox8\"",
    "mtime": "2024-05-16T10:42:05.594Z",
    "size": 32311,
    "path": "../public/img/apps/1.jpg"
  },
  "/img/apps/10.png": {
    "type": "image/png",
    "etag": "\"5851f-MlPwC6+5zY7b+YorRzNK8W7Dpzs\"",
    "mtime": "2024-05-16T10:42:04.565Z",
    "size": 361759,
    "path": "../public/img/apps/10.png"
  },
  "/img/apps/11.png": {
    "type": "image/png",
    "etag": "\"25c5f-DhuXCm4EIW5Um5KboNMxRqEHFxA\"",
    "mtime": "2024-05-16T10:42:04.598Z",
    "size": 154719,
    "path": "../public/img/apps/11.png"
  },
  "/img/apps/12.jpg": {
    "type": "image/jpeg",
    "etag": "\"70c5-2Nl9Y/Ju8PLYZSdn6ytBW2vmrDY\"",
    "mtime": "2024-05-16T10:42:05.758Z",
    "size": 28869,
    "path": "../public/img/apps/12.jpg"
  },
  "/img/apps/13.png": {
    "type": "image/png",
    "etag": "\"2e11b-m75LXHOyQqu+p+g2eW2Vl6dTKPo\"",
    "mtime": "2024-05-16T10:42:06.246Z",
    "size": 188699,
    "path": "../public/img/apps/13.png"
  },
  "/img/apps/14.jpg": {
    "type": "image/jpeg",
    "etag": "\"246b7-KsgntYO/x3jF5AXdqCX4h3pMuYs\"",
    "mtime": "2024-05-16T10:42:05.826Z",
    "size": 149175,
    "path": "../public/img/apps/14.jpg"
  },
  "/img/apps/15.png": {
    "type": "image/png",
    "etag": "\"2e8f1-laJGEUQbLDB0Ap0nLtTWeZE+4EY\"",
    "mtime": "2024-05-16T10:42:05.466Z",
    "size": 190705,
    "path": "../public/img/apps/15.png"
  },
  "/img/apps/2.png": {
    "type": "image/png",
    "etag": "\"14088-/OzpoPlafyLTiEnSZXinEITE3iQ\"",
    "mtime": "2024-05-16T10:42:04.921Z",
    "size": 82056,
    "path": "../public/img/apps/2.png"
  },
  "/img/apps/3.jpg": {
    "type": "image/jpeg",
    "etag": "\"34c10-wvR+ZZ10ZbJqW5jzOnHCmnJ1SLk\"",
    "mtime": "2024-05-16T10:42:05.896Z",
    "size": 216080,
    "path": "../public/img/apps/3.jpg"
  },
  "/img/apps/3.png": {
    "type": "image/png",
    "etag": "\"211f3-WPBCqV2K7NZJsWc7VcWrIJLjjqs\"",
    "mtime": "2024-05-16T10:42:06.065Z",
    "size": 135667,
    "path": "../public/img/apps/3.png"
  },
  "/img/apps/4.jpg": {
    "type": "image/jpeg",
    "etag": "\"3a432-ZF1immLAviUKmTGITQ4ofJOVbiE\"",
    "mtime": "2024-05-16T10:42:05.083Z",
    "size": 238642,
    "path": "../public/img/apps/4.jpg"
  },
  "/img/apps/4.png": {
    "type": "image/png",
    "etag": "\"30da1-0li68502ypDc4tnT0AWv83BVaR0\"",
    "mtime": "2024-05-16T10:42:04.665Z",
    "size": 200097,
    "path": "../public/img/apps/4.png"
  },
  "/img/apps/5.jpg": {
    "type": "image/jpeg",
    "etag": "\"39f71-foG+L54RFhRyylpWOOgQUy24nBA\"",
    "mtime": "2024-05-16T10:42:05.194Z",
    "size": 237425,
    "path": "../public/img/apps/5.jpg"
  },
  "/img/apps/5.png": {
    "type": "image/png",
    "etag": "\"a35a3-39vd1qu7TPkq5NqqcGDVT1RJNJk\"",
    "mtime": "2024-05-16T10:42:06.138Z",
    "size": 669091,
    "path": "../public/img/apps/5.png"
  },
  "/img/apps/6.png": {
    "type": "image/png",
    "etag": "\"2f3e2-REGc8IgZTlYyCER+pBMOawHxj/s\"",
    "mtime": "2024-05-16T10:42:05.563Z",
    "size": 193506,
    "path": "../public/img/apps/6.png"
  },
  "/img/apps/7.png": {
    "type": "image/png",
    "etag": "\"1fb3a-XcxZhVtin5JZHoubkoa8al2veBs\"",
    "mtime": "2024-05-16T10:42:05.295Z",
    "size": 129850,
    "path": "../public/img/apps/7.png"
  },
  "/img/apps/8.png": {
    "type": "image/png",
    "etag": "\"199bb-sEcF+zNtiy57Rn9CdNUtnLHo7AM\"",
    "mtime": "2024-05-16T10:42:05.661Z",
    "size": 104891,
    "path": "../public/img/apps/8.png"
  },
  "/img/apps/9.png": {
    "type": "image/png",
    "etag": "\"29756-y+w1S/BVLqn+XeJsVuQRFetSquU\"",
    "mtime": "2024-05-16T10:42:04.728Z",
    "size": 169814,
    "path": "../public/img/apps/9.png"
  },
  "/img/apps/customizer-dark.png": {
    "type": "image/png",
    "etag": "\"3a18f-lLaLvebNQT8NwdzBXa/OP48Oc5I\"",
    "mtime": "2024-05-16T10:42:05.862Z",
    "size": 237967,
    "path": "../public/img/apps/customizer-dark.png"
  },
  "/img/apps/customizer.png": {
    "type": "image/png",
    "etag": "\"3b7d0-DaiXeNhGVpWMJz3T3/HmQDcfrLw\"",
    "mtime": "2024-05-16T10:42:05.630Z",
    "size": 243664,
    "path": "../public/img/apps/customizer.png"
  },
  "/img/apps/tairo-circular-menu-dark.png": {
    "type": "image/png",
    "etag": "\"1ac02-tbNjsA3XcrzyT4Sl763KeLuQa7o\"",
    "mtime": "2024-05-16T10:42:05.531Z",
    "size": 109570,
    "path": "../public/img/apps/tairo-circular-menu-dark.png"
  },
  "/img/apps/tairo-circular-menu.png": {
    "type": "image/png",
    "etag": "\"2357e-66iHtnYjGjFwheHGh1VzvewOIcQ\"",
    "mtime": "2024-05-16T10:42:05.260Z",
    "size": 144766,
    "path": "../public/img/apps/tairo-circular-menu.png"
  },
  "/img/apps/tairo-layout-collapse-circular-menu-dark.png": {
    "type": "image/png",
    "etag": "\"21958-sFSK4XYAsx/DreJwzdn2a+MdPXs\"",
    "mtime": "2024-05-16T10:42:06.170Z",
    "size": 137560,
    "path": "../public/img/apps/tairo-layout-collapse-circular-menu-dark.png"
  },
  "/img/apps/tairo-layout-collapse-circular-menu.png": {
    "type": "image/png",
    "etag": "\"2a68e-9bWZAOdfNRpnC19pdhx/z7nThb4\"",
    "mtime": "2024-05-16T10:42:06.348Z",
    "size": 173710,
    "path": "../public/img/apps/tairo-layout-collapse-circular-menu.png"
  },
  "/img/apps/tairo-layout-collapse-collapsed-dark.png": {
    "type": "image/png",
    "etag": "\"18ae5-tyq31/SHU9x8q+qjnIXEgI8VjAs\"",
    "mtime": "2024-05-16T10:42:04.985Z",
    "size": 101093,
    "path": "../public/img/apps/tairo-layout-collapse-collapsed-dark.png"
  },
  "/img/apps/tairo-layout-collapse-collapsed.png": {
    "type": "image/png",
    "etag": "\"18ba4-7x46VAuRo/JcE0UydTuF0eNcbFM\"",
    "mtime": "2024-05-16T10:42:04.695Z",
    "size": 101284,
    "path": "../public/img/apps/tairo-layout-collapse-collapsed.png"
  },
  "/img/apps/tairo-layout-collapse-dark.png": {
    "type": "image/png",
    "etag": "\"1f41c-FZEeZwBhgqDKLsI5i7gInHvvkXI\"",
    "mtime": "2024-05-16T10:42:06.427Z",
    "size": 128028,
    "path": "../public/img/apps/tairo-layout-collapse-dark.png"
  },
  "/img/apps/tairo-layout-collapse.png": {
    "type": "image/png",
    "etag": "\"1f348-BqzCm0XgGXczK1NWzodAdNB+A3E\"",
    "mtime": "2024-05-16T10:42:05.359Z",
    "size": 127816,
    "path": "../public/img/apps/tairo-layout-collapse.png"
  },
  "/img/apps/tairo-layout-dark.png": {
    "type": "image/png",
    "etag": "\"178b5-NPP9vIrvLc2xW+30PEM127vCwok\"",
    "mtime": "2024-05-16T10:42:05.115Z",
    "size": 96437,
    "path": "../public/img/apps/tairo-layout-dark.png"
  },
  "/img/apps/tairo-layout-iconnav-circular-menu-dark.png": {
    "type": "image/png",
    "etag": "\"200a6-1/NuAWLVFnKFy8I15AXoohcct+E\"",
    "mtime": "2024-05-16T10:42:06.315Z",
    "size": 131238,
    "path": "../public/img/apps/tairo-layout-iconnav-circular-menu-dark.png"
  },
  "/img/apps/tairo-layout-iconnav-circular-menu.png": {
    "type": "image/png",
    "etag": "\"288ad-qdWFQmBOCAb2dfWkbeZEeUZhIbQ\"",
    "mtime": "2024-05-16T10:42:05.228Z",
    "size": 166061,
    "path": "../public/img/apps/tairo-layout-iconnav-circular-menu.png"
  },
  "/img/apps/tairo-layout-iconnav-dark.png": {
    "type": "image/png",
    "etag": "\"197fa-wwMjxii9k3uSk5dYy75+DqJo//M\"",
    "mtime": "2024-05-16T10:42:06.280Z",
    "size": 104442,
    "path": "../public/img/apps/tairo-layout-iconnav-dark.png"
  },
  "/img/apps/tairo-layout-iconnav-footer-dark.png": {
    "type": "image/png",
    "etag": "\"1d9c5-4JtDoQO4hRX9/A8ENENTPKj7RWo\"",
    "mtime": "2024-05-16T10:42:05.792Z",
    "size": 121285,
    "path": "../public/img/apps/tairo-layout-iconnav-footer-dark.png"
  },
  "/img/apps/tairo-layout-iconnav-footer.png": {
    "type": "image/png",
    "etag": "\"1d0a0-DybqhGZ8clquqVzcS/V7fYPBDcc\"",
    "mtime": "2024-05-16T10:42:05.693Z",
    "size": 118944,
    "path": "../public/img/apps/tairo-layout-iconnav-footer.png"
  },
  "/img/apps/tairo-layout-iconnav.png": {
    "type": "image/png",
    "etag": "\"18e3d-OddbibGRnr4Ecpdc2k/lDrrMPnQ\"",
    "mtime": "2024-05-16T10:42:04.952Z",
    "size": 101949,
    "path": "../public/img/apps/tairo-layout-iconnav.png"
  },
  "/img/apps/tairo-layout-tabbed-dark.png": {
    "type": "image/png",
    "etag": "\"d190-YtiX0t9jpt8XwWdoiKD2eupsu1I\"",
    "mtime": "2024-05-16T10:42:04.819Z",
    "size": 53648,
    "path": "../public/img/apps/tairo-layout-tabbed-dark.png"
  },
  "/img/apps/tairo-layout-tabbed.png": {
    "type": "image/png",
    "etag": "\"d9c3-fmr/qVDP6itNyKU0R9zj/f8dZ0g\"",
    "mtime": "2024-05-16T10:42:05.725Z",
    "size": 55747,
    "path": "../public/img/apps/tairo-layout-tabbed.png"
  },
  "/img/apps/tairo-layout-topnav-circular-menu-dark.png": {
    "type": "image/png",
    "etag": "\"1ce26-cj0wtII14rbd1iujj6/af80kX6I\"",
    "mtime": "2024-05-16T10:42:04.887Z",
    "size": 118310,
    "path": "../public/img/apps/tairo-layout-topnav-circular-menu-dark.png"
  },
  "/img/apps/tairo-layout-topnav-circular-menu.png": {
    "type": "image/png",
    "etag": "\"25ad1-jDlwRJ8Ie8OV3HNtwmzc7rpyZXE\"",
    "mtime": "2024-05-16T10:42:05.997Z",
    "size": 154321,
    "path": "../public/img/apps/tairo-layout-topnav-circular-menu.png"
  },
  "/img/apps/tairo-layout-topnav-dark.png": {
    "type": "image/png",
    "etag": "\"16579-YG40zDR69WOVxfMqW4htRPiK5i8\"",
    "mtime": "2024-05-16T10:42:04.852Z",
    "size": 91513,
    "path": "../public/img/apps/tairo-layout-topnav-dark.png"
  },
  "/img/apps/tairo-layout-topnav-footer-dark.png": {
    "type": "image/png",
    "etag": "\"1a5a8-EqVQncF3XsyyF5K7zq6iIIzRRzs\"",
    "mtime": "2024-05-16T10:42:05.048Z",
    "size": 107944,
    "path": "../public/img/apps/tairo-layout-topnav-footer-dark.png"
  },
  "/img/apps/tairo-layout-topnav-footer.png": {
    "type": "image/png",
    "etag": "\"1a214-hNRvfBktBzbvhkxSaftDPCeydd4\"",
    "mtime": "2024-05-16T10:42:04.758Z",
    "size": 107028,
    "path": "../public/img/apps/tairo-layout-topnav-footer.png"
  },
  "/img/apps/tairo-layout-topnav-workspaces-dark.png": {
    "type": "image/png",
    "etag": "\"2095f-xXzJS0vb48IjcoBAHhPLfttN0Bc\"",
    "mtime": "2024-05-16T10:42:05.931Z",
    "size": 133471,
    "path": "../public/img/apps/tairo-layout-topnav-workspaces-dark.png"
  },
  "/img/apps/tairo-layout-topnav-workspaces.png": {
    "type": "image/png",
    "etag": "\"21eb7-cxI+xfrj7jm6WiKugMgPvGfPkBQ\"",
    "mtime": "2024-05-16T10:42:04.632Z",
    "size": 138935,
    "path": "../public/img/apps/tairo-layout-topnav-workspaces.png"
  },
  "/img/apps/tairo-layout-topnav.png": {
    "type": "image/png",
    "etag": "\"16190-EV24vU4WMU8/axq5DkB7lvWaGVc\"",
    "mtime": "2024-05-16T10:42:05.498Z",
    "size": 90512,
    "path": "../public/img/apps/tairo-layout-topnav.png"
  },
  "/img/apps/tairo-layout.png": {
    "type": "image/png",
    "etag": "\"17d5a-CiGrjbYNhX/44iUlHXLlg4ss3As\"",
    "mtime": "2024-05-16T10:42:05.428Z",
    "size": 97626,
    "path": "../public/img/apps/tairo-layout.png"
  },
  "/img/apps/tairo-map-dark.png": {
    "type": "image/png",
    "etag": "\"1060b9-FIPYdDa/OWFB33FuUfXMk44RMes\"",
    "mtime": "2024-05-16T10:42:05.161Z",
    "size": 1073337,
    "path": "../public/img/apps/tairo-map-dark.png"
  },
  "/img/apps/tairo-map.png": {
    "type": "image/png",
    "etag": "\"100ce9-/l0hqxvO2pWwocswFC9uYt5mbps\"",
    "mtime": "2024-05-16T10:42:06.396Z",
    "size": 1051881,
    "path": "../public/img/apps/tairo-map.png"
  },
  "/img/apps/tairo-screen-full-dark.png": {
    "type": "image/png",
    "etag": "\"5ac54-hN6d2DkXbljc7I9Km01iaH1NsLE\"",
    "mtime": "2024-05-16T10:42:06.209Z",
    "size": 371796,
    "path": "../public/img/apps/tairo-screen-full-dark.png"
  },
  "/img/apps/tairo-screen-full.png": {
    "type": "image/png",
    "etag": "\"57b5f-ddKDrPKP0HKdXKouyATK7qS9fus\"",
    "mtime": "2024-05-16T10:42:06.033Z",
    "size": 359263,
    "path": "../public/img/apps/tairo-screen-full.png"
  },
  "/img/apps/tairo-subsidebar-dark.png": {
    "type": "image/png",
    "etag": "\"26e89-pL18vESGm5RM39zdUcTupnZs7b8\"",
    "mtime": "2024-05-16T10:42:04.789Z",
    "size": 159369,
    "path": "../public/img/apps/tairo-subsidebar-dark.png"
  },
  "/img/apps/tairo-subsidebar.png": {
    "type": "image/png",
    "etag": "\"263fa-Tv9utP2lpF+jkYX23Joem3EjBs0\"",
    "mtime": "2024-05-16T10:42:05.394Z",
    "size": 156666,
    "path": "../public/img/apps/tairo-subsidebar.png"
  },
  "/img/apps/tairo-toc-dark.png": {
    "type": "image/png",
    "etag": "\"190c8-R8bDYuQKzdQo2BeOqNPhziXREj8\"",
    "mtime": "2024-05-16T10:42:05.963Z",
    "size": 102600,
    "path": "../public/img/apps/tairo-toc-dark.png"
  },
  "/img/apps/tairo-toc.png": {
    "type": "image/png",
    "etag": "\"18cbd-IMcnWaZ1L0yX86Aeq8Vr57aDqrE\"",
    "mtime": "2024-05-16T10:42:05.017Z",
    "size": 101565,
    "path": "../public/img/apps/tairo-toc.png"
  },
  "/img/apps/tairo-toolbar-dark.png": {
    "type": "image/png",
    "etag": "\"3c71-exQOs+hn/sRWGXhrcd25eUplngA\"",
    "mtime": "2024-05-16T10:42:05.324Z",
    "size": 15473,
    "path": "../public/img/apps/tairo-toolbar-dark.png"
  },
  "/img/apps/tairo-toolbar.png": {
    "type": "image/png",
    "etag": "\"3e1d-Ff+tH6rsf8Svta28MxiD1/P6EuA\"",
    "mtime": "2024-05-16T10:42:06.098Z",
    "size": 15901,
    "path": "../public/img/apps/tairo-toolbar.png"
  },
  "/img/avatars/1.svg": {
    "type": "image/svg+xml",
    "etag": "\"5e2a-mBPSyvquJjrIcP+86azmIo5Y8DI\"",
    "mtime": "2024-05-16T10:42:41.673Z",
    "size": 24106,
    "path": "../public/img/avatars/1.svg"
  },
  "/img/avatars/10.svg": {
    "type": "image/svg+xml",
    "etag": "\"5c98-Ov7FWR0kSwle4MFLA9fodfPDCAg\"",
    "mtime": "2024-05-16T10:42:41.906Z",
    "size": 23704,
    "path": "../public/img/avatars/10.svg"
  },
  "/img/avatars/11.svg": {
    "type": "image/svg+xml",
    "etag": "\"3af5-xbrbL44NYxjFVr2KdDSFkqjipIc\"",
    "mtime": "2024-05-16T10:42:41.322Z",
    "size": 15093,
    "path": "../public/img/avatars/11.svg"
  },
  "/img/avatars/12.svg": {
    "type": "image/svg+xml",
    "etag": "\"5e7d-7rpEZ+UADgqAmHQcl2EswH+3aPI\"",
    "mtime": "2024-05-16T10:42:41.023Z",
    "size": 24189,
    "path": "../public/img/avatars/12.svg"
  },
  "/img/avatars/13.svg": {
    "type": "image/svg+xml",
    "etag": "\"816d-e7ja0dr7tjM7vZnSX/EwcglU9MY\"",
    "mtime": "2024-05-16T10:42:42.035Z",
    "size": 33133,
    "path": "../public/img/avatars/13.svg"
  },
  "/img/avatars/14.svg": {
    "type": "image/svg+xml",
    "etag": "\"69ab-7soe7ZtuwMXZ2Rv05V5tBhOdbEI\"",
    "mtime": "2024-05-16T10:42:41.279Z",
    "size": 27051,
    "path": "../public/img/avatars/14.svg"
  },
  "/img/avatars/15.svg": {
    "type": "image/svg+xml",
    "etag": "\"797e-+UP5xVJbOrx9zZiG+T3YdDEPX64\"",
    "mtime": "2024-05-16T10:42:41.448Z",
    "size": 31102,
    "path": "../public/img/avatars/15.svg"
  },
  "/img/avatars/16.svg": {
    "type": "image/svg+xml",
    "etag": "\"6272-sScMaCCWjvJS+okMl8nD+b2MytU\"",
    "mtime": "2024-05-16T10:42:42.081Z",
    "size": 25202,
    "path": "../public/img/avatars/16.svg"
  },
  "/img/avatars/17.svg": {
    "type": "image/svg+xml",
    "etag": "\"c298-MPSqABXGPWinGO6F/1v20SD+1Zg\"",
    "mtime": "2024-05-16T10:42:41.153Z",
    "size": 49816,
    "path": "../public/img/avatars/17.svg"
  },
  "/img/avatars/18.svg": {
    "type": "image/svg+xml",
    "etag": "\"965c-K01VyKriScibD7CYcITVqfhpQ6I\"",
    "mtime": "2024-05-16T10:42:41.950Z",
    "size": 38492,
    "path": "../public/img/avatars/18.svg"
  },
  "/img/avatars/19.svg": {
    "type": "image/svg+xml",
    "etag": "\"974e-pgmD3JMCOWcxoml9f8UJZW7C0so\"",
    "mtime": "2024-05-16T10:42:41.992Z",
    "size": 38734,
    "path": "../public/img/avatars/19.svg"
  },
  "/img/avatars/2.svg": {
    "type": "image/svg+xml",
    "etag": "\"62ae-WwFSpfCmL6Yy0Cdl6RHndl4z1Qw\"",
    "mtime": "2024-05-16T10:42:41.632Z",
    "size": 25262,
    "path": "../public/img/avatars/2.svg"
  },
  "/img/avatars/20.svg": {
    "type": "image/svg+xml",
    "etag": "\"a197-gTxVvj0Ii8vAbEzT1BUs1tsQwLc\"",
    "mtime": "2024-05-16T10:42:41.407Z",
    "size": 41367,
    "path": "../public/img/avatars/20.svg"
  },
  "/img/avatars/21.svg": {
    "type": "image/svg+xml",
    "etag": "\"bf4d-kIHHRD+bkQ1teaS8J3hrp9MBGCM\"",
    "mtime": "2024-05-16T10:42:41.194Z",
    "size": 48973,
    "path": "../public/img/avatars/21.svg"
  },
  "/img/avatars/22.svg": {
    "type": "image/svg+xml",
    "etag": "\"6b4d-9EQWcwk+cMLhtNI3HzYNWUFvMhc\"",
    "mtime": "2024-05-16T10:42:40.897Z",
    "size": 27469,
    "path": "../public/img/avatars/22.svg"
  },
  "/img/avatars/23.svg": {
    "type": "image/svg+xml",
    "etag": "\"762c-yumVuXaPI1EGnGyCVbvVlUbzSLE\"",
    "mtime": "2024-05-16T10:42:41.592Z",
    "size": 30252,
    "path": "../public/img/avatars/23.svg"
  },
  "/img/avatars/24.svg": {
    "type": "image/svg+xml",
    "etag": "\"4e12-88eJfhlFXvYbBKw3j1sfw6Ok0hc\"",
    "mtime": "2024-05-16T10:42:40.939Z",
    "size": 19986,
    "path": "../public/img/avatars/24.svg"
  },
  "/img/avatars/25.svg": {
    "type": "image/svg+xml",
    "etag": "\"7991-Eaw7H6UsRYmBHMbmxHrL7OdAVvU\"",
    "mtime": "2024-05-16T10:42:41.866Z",
    "size": 31121,
    "path": "../public/img/avatars/25.svg"
  },
  "/img/avatars/26.svg": {
    "type": "image/svg+xml",
    "etag": "\"db85-shfQgoKwhh4hhobqD9DR4FltGSM\"",
    "mtime": "2024-05-16T10:42:41.068Z",
    "size": 56197,
    "path": "../public/img/avatars/26.svg"
  },
  "/img/avatars/3.svg": {
    "type": "image/svg+xml",
    "etag": "\"2cbf-O4GpzSIz6IWq3tMjIN6adYtzwMI\"",
    "mtime": "2024-05-16T10:42:41.363Z",
    "size": 11455,
    "path": "../public/img/avatars/3.svg"
  },
  "/img/avatars/4.svg": {
    "type": "image/svg+xml",
    "etag": "\"80fb-I4/MQ2oTmzXSfgOZGmO92BKkb9w\"",
    "mtime": "2024-05-16T10:42:41.747Z",
    "size": 33019,
    "path": "../public/img/avatars/4.svg"
  },
  "/img/avatars/5.svg": {
    "type": "image/svg+xml",
    "etag": "\"8054-R1BodGMGLOicNSe4mr8h2haqsgo\"",
    "mtime": "2024-05-16T10:42:41.552Z",
    "size": 32852,
    "path": "../public/img/avatars/5.svg"
  },
  "/img/avatars/6.svg": {
    "type": "image/svg+xml",
    "etag": "\"6774-a0r/18U663TxeJX3tAB2Mtyx6WQ\"",
    "mtime": "2024-05-16T10:42:41.238Z",
    "size": 26484,
    "path": "../public/img/avatars/6.svg"
  },
  "/img/avatars/7.svg": {
    "type": "image/svg+xml",
    "etag": "\"6ee1-GX1EMSu1q4ujRd25iCc48+TSnNU\"",
    "mtime": "2024-05-16T10:42:40.982Z",
    "size": 28385,
    "path": "../public/img/avatars/7.svg"
  },
  "/img/avatars/8.svg": {
    "type": "image/svg+xml",
    "etag": "\"38d1-ypZ0Jevd5EcQHcbocW9ZXnBssro\"",
    "mtime": "2024-05-16T10:42:41.820Z",
    "size": 14545,
    "path": "../public/img/avatars/8.svg"
  },
  "/img/avatars/9.svg": {
    "type": "image/svg+xml",
    "etag": "\"97e7-wSzcU6BIbOhS50h9VM58r207/2A\"",
    "mtime": "2024-05-16T10:42:40.855Z",
    "size": 38887,
    "path": "../public/img/avatars/9.svg"
  },
  "/img/avatars/company.svg": {
    "type": "image/svg+xml",
    "etag": "\"50e-nzlqMtFbySfFf8rVi11mVIZseaM\"",
    "mtime": "2024-05-16T10:42:41.110Z",
    "size": 1294,
    "path": "../public/img/avatars/company.svg"
  },
  "/img/avatars/default-female.jpg": {
    "type": "image/jpeg",
    "etag": "\"3261-7v2Jae9XpwEPtDGpfKIk8HBJJRk\"",
    "mtime": "2024-05-16T10:42:41.705Z",
    "size": 12897,
    "path": "../public/img/avatars/default-female.jpg"
  },
  "/img/avatars/default-male.jpg": {
    "type": "image/jpeg",
    "etag": "\"2a84-LJKfR9S+mbwPltRGO66pv6H35/w\"",
    "mtime": "2024-05-16T10:42:41.510Z",
    "size": 10884,
    "path": "../public/img/avatars/default-male.jpg"
  },
  "/img/avatars/default-other.jpg": {
    "type": "image/jpeg",
    "etag": "\"48a-wQuhn+NZqsi1NNEutgLY8jMdejY\"",
    "mtime": "2024-05-16T10:42:41.479Z",
    "size": 1162,
    "path": "../public/img/avatars/default-other.jpg"
  },
  "/img/avatars/placeholder-file.png": {
    "type": "image/png",
    "etag": "\"182f-afd5QJcf77zlfYsa0I7phe4+lCo\"",
    "mtime": "2024-05-16T10:42:41.779Z",
    "size": 6191,
    "path": "../public/img/avatars/placeholder-file.png"
  },
  "/img/illustrations/card-chip.svg": {
    "type": "image/svg+xml",
    "etag": "\"573-4XImCceuq+8e4y3ohfGlDR6gKBM\"",
    "mtime": "2024-05-16T10:42:12.101Z",
    "size": 1395,
    "path": "../public/img/illustrations/card-chip.svg"
  },
  "/img/illustrations/gridlines-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"63a-ZYhhDDaLzCH3pk5VQbex8qSPxK4\"",
    "mtime": "2024-05-16T10:42:12.143Z",
    "size": 1594,
    "path": "../public/img/illustrations/gridlines-dark.svg"
  },
  "/img/illustrations/gridlines-predark.svg": {
    "type": "image/svg+xml",
    "etag": "\"63a-N8ASyhaMJE0v3E4u30Xl0OZ4RSk\"",
    "mtime": "2024-05-16T10:42:11.886Z",
    "size": 1594,
    "path": "../public/img/illustrations/gridlines-predark.svg"
  },
  "/img/illustrations/gridlines.svg": {
    "type": "image/svg+xml",
    "etag": "\"63a-inUpa2ycgJeHYh5J/VtX4bp1x0o\"",
    "mtime": "2024-05-16T10:42:12.234Z",
    "size": 1594,
    "path": "../public/img/illustrations/gridlines.svg"
  },
  "/img/illustrations/magician.svg": {
    "type": "image/svg+xml",
    "etag": "\"3451-e0230LovOMWSXpZ2uSvH++ZYUP8\"",
    "mtime": "2024-05-16T10:42:12.056Z",
    "size": 13393,
    "path": "../public/img/illustrations/magician.svg"
  },
  "/img/illustrations/man-looking.svg": {
    "type": "image/svg+xml",
    "etag": "\"266e-/+ownCtVuy8XJWSqpIeeJy9IIm0\"",
    "mtime": "2024-05-16T10:42:11.969Z",
    "size": 9838,
    "path": "../public/img/illustrations/man-looking.svg"
  },
  "/img/illustrations/nation.svg": {
    "type": "image/svg+xml",
    "etag": "\"88b1c-Td1FCjK6yVUEBXXybf5qXYuFQno\"",
    "mtime": "2024-05-16T10:42:12.195Z",
    "size": 559900,
    "path": "../public/img/illustrations/nation.svg"
  },
  "/img/illustrations/people.svg": {
    "type": "image/svg+xml",
    "etag": "\"6290-DohU2NMiBf9zbMzFlEOmXkRUmH8\"",
    "mtime": "2024-05-16T10:42:11.928Z",
    "size": 25232,
    "path": "../public/img/illustrations/people.svg"
  },
  "/img/illustrations/station.svg": {
    "type": "image/svg+xml",
    "etag": "\"2e686-9Fbn2YalISfPkaCj+ntsw+9Xd6Q\"",
    "mtime": "2024-05-16T10:42:12.323Z",
    "size": 190086,
    "path": "../public/img/illustrations/station.svg"
  },
  "/img/illustrations/text-hand.svg": {
    "type": "image/svg+xml",
    "etag": "\"bca2-7XYjTBRi8CPmgpptI+nv34sbl6U\"",
    "mtime": "2024-05-16T10:42:11.843Z",
    "size": 48290,
    "path": "../public/img/illustrations/text-hand.svg"
  },
  "/img/illustrations/translation-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"148e7-o8BVFXjEG24Aj6lqzQsB+y5Ewcw\"",
    "mtime": "2024-05-16T10:42:12.014Z",
    "size": 84199,
    "path": "../public/img/illustrations/translation-dark.svg"
  },
  "/img/illustrations/translation.svg": {
    "type": "image/svg+xml",
    "etag": "\"147ed-Gk02XnzIovB3NID5mztXcrIwPQ8\"",
    "mtime": "2024-05-16T10:42:12.279Z",
    "size": 83949,
    "path": "../public/img/illustrations/translation.svg"
  },
  "/img/logos/cssninja-logo-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"254-ZtzSkd9i9swzNeqzLntL4kBLiCk\"",
    "mtime": "2024-05-16T10:42:36.639Z",
    "size": 596,
    "path": "../public/img/logos/cssninja-logo-icon.svg"
  },
  "/img/logos/logo-text.svg": {
    "type": "image/svg+xml",
    "etag": "\"dea-5hPfTsqxi3LEe+ypdVbvc+L+hMM\"",
    "mtime": "2024-05-16T10:42:36.689Z",
    "size": 3562,
    "path": "../public/img/logos/logo-text.svg"
  },
  "/img/logos/logo.svg": {
    "type": "image/svg+xml",
    "etag": "\"82c-i1lMmRweaAPBLlR0siy0nD3r+SA\"",
    "mtime": "2024-05-16T10:42:36.737Z",
    "size": 2092,
    "path": "../public/img/logos/logo.svg"
  },
  "/img/stacks/alpinejs.svg": {
    "type": "image/svg+xml",
    "etag": "\"143-AXulLYBSJgWiMYqGCM/FpJvdBeg\"",
    "mtime": "2024-05-16T10:42:23.909Z",
    "size": 323,
    "path": "../public/img/stacks/alpinejs.svg"
  },
  "/img/stacks/android.svg": {
    "type": "image/svg+xml",
    "etag": "\"4f8-SbIoJCBNeUliQHd2c7AYPeaj1fk\"",
    "mtime": "2024-05-16T10:42:23.321Z",
    "size": 1272,
    "path": "../public/img/stacks/android.svg"
  },
  "/img/stacks/angular.svg": {
    "type": "image/svg+xml",
    "etag": "\"271-oCr4OMvPAOhop+SwC2uUTE+xGp4\"",
    "mtime": "2024-05-16T10:42:23.486Z",
    "size": 625,
    "path": "../public/img/stacks/angular.svg"
  },
  "/img/stacks/bulma.svg": {
    "type": "image/svg+xml",
    "etag": "\"a7-HSri+dh7q4Hskb0B/B4QJmWvI2k\"",
    "mtime": "2024-05-16T10:42:22.813Z",
    "size": 167,
    "path": "../public/img/stacks/bulma.svg"
  },
  "/img/stacks/cplus.svg": {
    "type": "image/svg+xml",
    "etag": "\"7f8-cRDkWP+PRYDLYIVFYIh+U5R3ub8\"",
    "mtime": "2024-05-16T10:42:23.111Z",
    "size": 2040,
    "path": "../public/img/stacks/cplus.svg"
  },
  "/img/stacks/csharp.svg": {
    "type": "image/svg+xml",
    "etag": "\"833-6QhZ1GE9fvatFX2Mo0qtESiiZGE\"",
    "mtime": "2024-05-16T10:42:24.202Z",
    "size": 2099,
    "path": "../public/img/stacks/csharp.svg"
  },
  "/img/stacks/css3.svg": {
    "type": "image/svg+xml",
    "etag": "\"29c-nki2o8fPpIEaUtjASiIkzruKghA\"",
    "mtime": "2024-05-16T10:42:23.528Z",
    "size": 668,
    "path": "../public/img/stacks/css3.svg"
  },
  "/img/stacks/figma.svg": {
    "type": "image/svg+xml",
    "etag": "\"324-hgDwVlR3fnA9Gp1rOWLiSx73FY4\"",
    "mtime": "2024-05-16T10:42:23.951Z",
    "size": 804,
    "path": "../public/img/stacks/figma.svg"
  },
  "/img/stacks/github.svg": {
    "type": "image/svg+xml",
    "etag": "\"465-aHhZUDREXMrxHq9bA4gU6wbEnxU\"",
    "mtime": "2024-05-16T10:42:22.984Z",
    "size": 1125,
    "path": "../public/img/stacks/github.svg"
  },
  "/img/stacks/gulp.svg": {
    "type": "image/svg+xml",
    "etag": "\"7bf-ciemgwrxsb2FFsw8agfhjR1vDnA\"",
    "mtime": "2024-05-16T10:42:23.992Z",
    "size": 1983,
    "path": "../public/img/stacks/gulp.svg"
  },
  "/img/stacks/html5-nobg.svg": {
    "type": "image/svg+xml",
    "etag": "\"418-5W3EkAZGjfeMI6K94oyog5jlkxY\"",
    "mtime": "2024-05-16T10:42:23.868Z",
    "size": 1048,
    "path": "../public/img/stacks/html5-nobg.svg"
  },
  "/img/stacks/html5.svg": {
    "type": "image/svg+xml",
    "etag": "\"2d5-eE+9Wm/HnOcHeXW/1wMeWWNog9A\"",
    "mtime": "2024-05-16T10:42:23.068Z",
    "size": 725,
    "path": "../public/img/stacks/html5.svg"
  },
  "/img/stacks/illustrator.svg": {
    "type": "image/svg+xml",
    "etag": "\"34c-jl4NEBD7eGsjNX7QTlvzDbuCNIw\"",
    "mtime": "2024-05-16T10:42:24.117Z",
    "size": 844,
    "path": "../public/img/stacks/illustrator.svg"
  },
  "/img/stacks/java.svg": {
    "type": "image/svg+xml",
    "etag": "\"b0b-1J6riAaWrx9UwV0mnE2iaasx7cE\"",
    "mtime": "2024-05-16T10:42:23.447Z",
    "size": 2827,
    "path": "../public/img/stacks/java.svg"
  },
  "/img/stacks/js-nobg.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c5-2W2XGcvr23fWT87/wmNk2H1uF4w\"",
    "mtime": "2024-05-16T10:42:24.076Z",
    "size": 965,
    "path": "../public/img/stacks/js-nobg.svg"
  },
  "/img/stacks/js.svg": {
    "type": "image/svg+xml",
    "etag": "\"2cc-Y9MckFnohU8kfNs50wQ42PsMP7s\"",
    "mtime": "2024-05-16T10:42:23.276Z",
    "size": 716,
    "path": "../public/img/stacks/js.svg"
  },
  "/img/stacks/laravel.svg": {
    "type": "image/svg+xml",
    "etag": "\"2e7-k76qv4CdNRKHMdPXiAtsCSi3Y2k\"",
    "mtime": "2024-05-16T10:42:22.942Z",
    "size": 743,
    "path": "../public/img/stacks/laravel.svg"
  },
  "/img/stacks/next.svg": {
    "type": "image/svg+xml",
    "etag": "\"2e0-RI5rBzdOLL+toDTOdwlNLBZGUrI\"",
    "mtime": "2024-05-16T10:42:23.152Z",
    "size": 736,
    "path": "../public/img/stacks/next.svg"
  },
  "/img/stacks/nodejs.svg": {
    "type": "image/svg+xml",
    "etag": "\"4d8-2FwdQC8j7/jebHAGPp/ulDRLfI4\"",
    "mtime": "2024-05-16T10:42:23.027Z",
    "size": 1240,
    "path": "../public/img/stacks/nodejs.svg"
  },
  "/img/stacks/nuxt.svg": {
    "type": "image/svg+xml",
    "etag": "\"2f7-FUtmBOiPb1Kpeq3z/8+xJ2d6AKI\"",
    "mtime": "2024-05-16T10:42:23.657Z",
    "size": 759,
    "path": "../public/img/stacks/nuxt.svg"
  },
  "/img/stacks/photoshop.svg": {
    "type": "image/svg+xml",
    "etag": "\"3fd-Q0BU1ICSEwPtSnYNitvS+mY5wHM\"",
    "mtime": "2024-05-16T10:42:22.726Z",
    "size": 1021,
    "path": "../public/img/stacks/photoshop.svg"
  },
  "/img/stacks/php.svg": {
    "type": "image/svg+xml",
    "etag": "\"83c-Gwsbf+GuFQCONO7fZkYLbICYZUg\"",
    "mtime": "2024-05-16T10:42:22.642Z",
    "size": 2108,
    "path": "../public/img/stacks/php.svg"
  },
  "/img/stacks/prettier.svg": {
    "type": "image/svg+xml",
    "etag": "\"17d0-Bj/UKtJssl5iSKukz8alOFlVd1s\"",
    "mtime": "2024-05-16T10:42:23.615Z",
    "size": 6096,
    "path": "../public/img/stacks/prettier.svg"
  },
  "/img/stacks/python.svg": {
    "type": "image/svg+xml",
    "etag": "\"54b-NRdLHPboPjOjaqV09x4SBSeEC/o\"",
    "mtime": "2024-05-16T10:42:23.364Z",
    "size": 1355,
    "path": "../public/img/stacks/python.svg"
  },
  "/img/stacks/reactjs.svg": {
    "type": "image/svg+xml",
    "etag": "\"a31-kQ4sqmXGCWJ7B+pk3bA8pRzhGM4\"",
    "mtime": "2024-05-16T10:42:23.236Z",
    "size": 2609,
    "path": "../public/img/stacks/reactjs.svg"
  },
  "/img/stacks/reactjsnobg.svg": {
    "type": "image/svg+xml",
    "etag": "\"a0f-Aug6PviFXXKBkq4/KWnXv4DHhHc\"",
    "mtime": "2024-05-16T10:42:23.196Z",
    "size": 2575,
    "path": "../public/img/stacks/reactjsnobg.svg"
  },
  "/img/stacks/ruby.svg": {
    "type": "image/svg+xml",
    "etag": "\"1fa7-ceTNbPyPrwYdyGRGZtopQ0eqR5E\"",
    "mtime": "2024-05-16T10:42:22.769Z",
    "size": 8103,
    "path": "../public/img/stacks/ruby.svg"
  },
  "/img/stacks/sass.svg": {
    "type": "image/svg+xml",
    "etag": "\"afc-ibtXEBd3OKNt8fT0fDKEddVMSXM\"",
    "mtime": "2024-05-16T10:42:23.743Z",
    "size": 2812,
    "path": "../public/img/stacks/sass.svg"
  },
  "/img/stacks/sketch.svg": {
    "type": "image/svg+xml",
    "etag": "\"325-kydM8osHWpox2soU7A5tCJsp64Y\"",
    "mtime": "2024-05-16T10:42:24.160Z",
    "size": 805,
    "path": "../public/img/stacks/sketch.svg"
  },
  "/img/stacks/strapi.svg": {
    "type": "image/svg+xml",
    "etag": "\"40a-URWCvwFftJgWCDHFSB96zPULeDw\"",
    "mtime": "2024-05-16T10:42:22.900Z",
    "size": 1034,
    "path": "../public/img/stacks/strapi.svg"
  },
  "/img/stacks/stylelint-reverse.svg": {
    "type": "image/svg+xml",
    "etag": "\"40c-DnuAYBbSxUjjVPAaDtI7EZhpmj8\"",
    "mtime": "2024-05-16T10:42:24.034Z",
    "size": 1036,
    "path": "../public/img/stacks/stylelint-reverse.svg"
  },
  "/img/stacks/stylelint.svg": {
    "type": "image/svg+xml",
    "etag": "\"3fa-9I+hdrkRLVDjCYFCWbuxu7I8Ugs\"",
    "mtime": "2024-05-16T10:42:23.699Z",
    "size": 1018,
    "path": "../public/img/stacks/stylelint.svg"
  },
  "/img/stacks/swift.svg": {
    "type": "image/svg+xml",
    "etag": "\"791-NdzYoY+zByVWOgMJwJt9vvW/8Jw\"",
    "mtime": "2024-05-16T10:42:23.785Z",
    "size": 1937,
    "path": "../public/img/stacks/swift.svg"
  },
  "/img/stacks/tailwind.svg": {
    "type": "image/svg+xml",
    "etag": "\"32a-5BvTVMlo045GhT7FYFzZ1BVk5j4\"",
    "mtime": "2024-05-16T10:42:23.572Z",
    "size": 810,
    "path": "../public/img/stacks/tailwind.svg"
  },
  "/img/stacks/typescript-square.svg": {
    "type": "image/svg+xml",
    "etag": "\"3d3-LKVsj/tupj9KiPnMu9SeuMDiZzc\"",
    "mtime": "2024-05-16T10:42:23.825Z",
    "size": 979,
    "path": "../public/img/stacks/typescript-square.svg"
  },
  "/img/stacks/vite.svg": {
    "type": "image/svg+xml",
    "etag": "\"4b5-u3CTTagPZ6/DeFN3L+MRaNLb3HM\"",
    "mtime": "2024-05-16T10:42:22.682Z",
    "size": 1205,
    "path": "../public/img/stacks/vite.svg"
  },
  "/img/stacks/vscode.svg": {
    "type": "image/svg+xml",
    "etag": "\"886-1qpN+q9fRLDFO/wV8sBg9l0/LbM\"",
    "mtime": "2024-05-16T10:42:24.244Z",
    "size": 2182,
    "path": "../public/img/stacks/vscode.svg"
  },
  "/img/stacks/vuejs.svg": {
    "type": "image/svg+xml",
    "etag": "\"1b5-nENUViz9EedTVjTMfRrmLpIS5II\"",
    "mtime": "2024-05-16T10:42:22.856Z",
    "size": 437,
    "path": "../public/img/stacks/vuejs.svg"
  },
  "/img/stacks/xd.svg": {
    "type": "image/svg+xml",
    "etag": "\"479-FeSv9GOcKps0wJQq71+z2vg3q0k\"",
    "mtime": "2024-05-16T10:42:23.405Z",
    "size": 1145,
    "path": "../public/img/stacks/xd.svg"
  },
  "/img/screens/auth-login-1-dark.png": {
    "type": "image/png",
    "etag": "\"17f8e-N0HTY6MDXgiAciRUzD0VrE4WFgs\"",
    "mtime": "2024-05-16T10:42:27.768Z",
    "size": 98190,
    "path": "../public/img/screens/auth-login-1-dark.png"
  },
  "/img/screens/auth-login-1.png": {
    "type": "image/png",
    "etag": "\"17ff9-NXU3E1fFWbdYDncAP4BD0zQSfNY\"",
    "mtime": "2024-05-16T10:42:33.562Z",
    "size": 98297,
    "path": "../public/img/screens/auth-login-1.png"
  },
  "/img/screens/auth-login-2-dark.png": {
    "type": "image/png",
    "etag": "\"18ae8-aclNPm/SAWg4QZcsz7fBXfyn7eA\"",
    "mtime": "2024-05-16T10:42:25.491Z",
    "size": 101096,
    "path": "../public/img/screens/auth-login-2-dark.png"
  },
  "/img/screens/auth-login-2.png": {
    "type": "image/png",
    "etag": "\"1895c-Xxjwqz1XCSH+pPn7Eb/JjgR2Ukg\"",
    "mtime": "2024-05-16T10:42:34.342Z",
    "size": 100700,
    "path": "../public/img/screens/auth-login-2.png"
  },
  "/img/screens/auth-login-3-dark.png": {
    "type": "image/png",
    "etag": "\"154de-8kO5NzOBAuh3CT5+jTIHe+pHvd0\"",
    "mtime": "2024-05-16T10:42:25.808Z",
    "size": 87262,
    "path": "../public/img/screens/auth-login-3-dark.png"
  },
  "/img/screens/auth-login-3.png": {
    "type": "image/png",
    "etag": "\"1508c-FJQ/jKfJe9XsrhJngi5CZP60ulU\"",
    "mtime": "2024-05-16T10:42:32.101Z",
    "size": 86156,
    "path": "../public/img/screens/auth-login-3.png"
  },
  "/img/screens/auth-login-4-dark.png": {
    "type": "image/png",
    "etag": "\"18efe-VEIoIgK4gBWbxCwe8jTdRaZuGqc\"",
    "mtime": "2024-05-16T10:42:34.783Z",
    "size": 102142,
    "path": "../public/img/screens/auth-login-4-dark.png"
  },
  "/img/screens/auth-login-4.png": {
    "type": "image/png",
    "etag": "\"18d77-FAdAskfWa+HUzF1Mj6f91dvJ0Fo\"",
    "mtime": "2024-05-16T10:42:31.176Z",
    "size": 101751,
    "path": "../public/img/screens/auth-login-4.png"
  },
  "/img/screens/auth-recover-dark.png": {
    "type": "image/png",
    "etag": "\"1185c-sOnCq6zvgLTagcbfoBJjRlMyuRs\"",
    "mtime": "2024-05-16T10:42:34.527Z",
    "size": 71772,
    "path": "../public/img/screens/auth-recover-dark.png"
  },
  "/img/screens/auth-recover.png": {
    "type": "image/png",
    "etag": "\"117f8-Wttl28jvRAEEVZqxbUJu7CU7YOA\"",
    "mtime": "2024-05-16T10:42:25.670Z",
    "size": 71672,
    "path": "../public/img/screens/auth-recover.png"
  },
  "/img/screens/auth-signup-1-dark.png": {
    "type": "image/png",
    "etag": "\"71cda-M2ximwKq9AqkK8VLYaoJFzdmOCg\"",
    "mtime": "2024-05-16T10:42:33.605Z",
    "size": 466138,
    "path": "../public/img/screens/auth-signup-1-dark.png"
  },
  "/img/screens/auth-signup-1.png": {
    "type": "image/png",
    "etag": "\"71492-LC9gj37nD4VelyfZAjyRwrtNPew\"",
    "mtime": "2024-05-16T10:42:35.805Z",
    "size": 464018,
    "path": "../public/img/screens/auth-signup-1.png"
  },
  "/img/screens/auth-signup-2-dark.png": {
    "type": "image/png",
    "etag": "\"16b47-Qb/6aCXvsf1+Hqe8KYI1QnBGTr8\"",
    "mtime": "2024-05-16T10:42:27.301Z",
    "size": 92999,
    "path": "../public/img/screens/auth-signup-2-dark.png"
  },
  "/img/screens/auth-signup-2.png": {
    "type": "image/png",
    "etag": "\"1668f-zgOlGcPKCkWdV/e61EbkR0EXrIQ\"",
    "mtime": "2024-05-16T10:42:30.343Z",
    "size": 91791,
    "path": "../public/img/screens/auth-signup-2.png"
  },
  "/img/screens/auth-signup-3-dark.png": {
    "type": "image/png",
    "etag": "\"2c4e2-SMpk8RowFOU6q0/gSRW8gK6efKA\"",
    "mtime": "2024-05-16T10:42:25.386Z",
    "size": 181474,
    "path": "../public/img/screens/auth-signup-3-dark.png"
  },
  "/img/screens/auth-signup-3.png": {
    "type": "image/png",
    "etag": "\"2bd7c-KypU5e//ohqnzh6AAdHfUw+lY40\"",
    "mtime": "2024-05-16T10:42:32.972Z",
    "size": 179580,
    "path": "../public/img/screens/auth-signup-3.png"
  },
  "/img/screens/dashboard-calendar-dark.png": {
    "type": "image/png",
    "etag": "\"4774e-s+iIUPtcV8sIeNVwd6RuDD1n+po\"",
    "mtime": "2024-05-16T10:42:32.862Z",
    "size": 292686,
    "path": "../public/img/screens/dashboard-calendar-dark.png"
  },
  "/img/screens/dashboard-calendar.png": {
    "type": "image/png",
    "etag": "\"475df-ZDf5/+i0Ls7/L0lsYhX3sEk7I0E\"",
    "mtime": "2024-05-16T10:42:25.775Z",
    "size": 292319,
    "path": "../public/img/screens/dashboard-calendar.png"
  },
  "/img/screens/dashboards-analytics-dark.png": {
    "type": "image/png",
    "etag": "\"44f83-CVK+39KKgzKDbYxhTPQZXKtwdF4\"",
    "mtime": "2024-05-16T10:42:28.643Z",
    "size": 282499,
    "path": "../public/img/screens/dashboards-analytics-dark.png"
  },
  "/img/screens/dashboards-analytics.png": {
    "type": "image/png",
    "etag": "\"43d50-NLrmV0dYlQB3mjQoIZUTnGHt86o\"",
    "mtime": "2024-05-16T10:42:34.270Z",
    "size": 277840,
    "path": "../public/img/screens/dashboards-analytics.png"
  },
  "/img/screens/dashboards-balance-dark.png": {
    "type": "image/png",
    "etag": "\"6341e-9lxOoNPx7ow6FyYWfJDgU1mKpbQ\"",
    "mtime": "2024-05-16T10:42:25.884Z",
    "size": 406558,
    "path": "../public/img/screens/dashboards-balance-dark.png"
  },
  "/img/screens/dashboards-balance.png": {
    "type": "image/png",
    "etag": "\"6197a-4Ee/gb5Ih+pz0BugXyaYkd3VUBc\"",
    "mtime": "2024-05-16T10:42:35.731Z",
    "size": 399738,
    "path": "../public/img/screens/dashboards-balance.png"
  },
  "/img/screens/dashboards-banking-1-dark.png": {
    "type": "image/png",
    "etag": "\"4a09e-HCVUiRgF/EYidx+Lb8Dv/u2TjWM\"",
    "mtime": "2024-05-16T10:42:33.647Z",
    "size": 303262,
    "path": "../public/img/screens/dashboards-banking-1-dark.png"
  },
  "/img/screens/dashboards-banking-1.png": {
    "type": "image/png",
    "etag": "\"49efe-H5NuZgYKZMJGYFGCntYzXFeCQYA\"",
    "mtime": "2024-05-16T10:42:34.457Z",
    "size": 302846,
    "path": "../public/img/screens/dashboards-banking-1.png"
  },
  "/img/screens/dashboards-banking-2-dark.png": {
    "type": "image/png",
    "etag": "\"43172-sBdq0PjXZmo5YilrOSBoflBrKJQ\"",
    "mtime": "2024-05-16T10:42:27.236Z",
    "size": 274802,
    "path": "../public/img/screens/dashboards-banking-2-dark.png"
  },
  "/img/screens/dashboards-banking-2.png": {
    "type": "image/png",
    "etag": "\"4292d-NKdsW8KCyzNk76NrYcvL/tbzMAM\"",
    "mtime": "2024-05-16T10:42:30.000Z",
    "size": 272685,
    "path": "../public/img/screens/dashboards-banking-2.png"
  },
  "/img/screens/dashboards-banking-3-dark.png": {
    "type": "image/png",
    "etag": "\"50eb9-ahZUHC5NSLuJ/w5oT5mgUZBRFFs\"",
    "mtime": "2024-05-16T10:42:26.056Z",
    "size": 331449,
    "path": "../public/img/screens/dashboards-banking-3-dark.png"
  },
  "/img/screens/dashboards-banking-3.png": {
    "type": "image/png",
    "etag": "\"51300-BiAljtDGDg4Yqi0Urz1B+Zaf4oE\"",
    "mtime": "2024-05-16T10:42:28.455Z",
    "size": 332544,
    "path": "../public/img/screens/dashboards-banking-3.png"
  },
  "/img/screens/dashboards-banking-4-dark.png": {
    "type": "image/png",
    "etag": "\"583d4-uSZN3PK9cM8hAHKK3nHJdHiYGbg\"",
    "mtime": "2024-05-16T10:42:29.012Z",
    "size": 361428,
    "path": "../public/img/screens/dashboards-banking-4-dark.png"
  },
  "/img/screens/dashboards-banking-4.png": {
    "type": "image/png",
    "etag": "\"5682a-fnDIZRZRdJM7BGpGbTxdPrVMyDY\"",
    "mtime": "2024-05-16T10:42:35.955Z",
    "size": 354346,
    "path": "../public/img/screens/dashboards-banking-4.png"
  },
  "/img/screens/dashboards-banking-5-dark.png": {
    "type": "image/png",
    "etag": "\"67ec1-ttT7DJCSzAU1KbYntWCvFOPl1OU\"",
    "mtime": "2024-05-16T10:42:36.003Z",
    "size": 425665,
    "path": "../public/img/screens/dashboards-banking-5-dark.png"
  },
  "/img/screens/dashboards-banking-5.png": {
    "type": "image/png",
    "etag": "\"6599c-LOD2jP4zh4ZHubhFINUCiCr3K9Q\"",
    "mtime": "2024-05-16T10:42:31.069Z",
    "size": 416156,
    "path": "../public/img/screens/dashboards-banking-5.png"
  },
  "/img/screens/dashboards-charts-dark.png": {
    "type": "image/png",
    "etag": "\"2f94f-Xydwc81KhZ+F0Fxn1w6tDG83Lh4\"",
    "mtime": "2024-05-16T10:42:29.793Z",
    "size": 194895,
    "path": "../public/img/screens/dashboards-charts-dark.png"
  },
  "/img/screens/dashboards-charts.png": {
    "type": "image/png",
    "etag": "\"2f652-2TjJOkYdNDIPTelXPXQcAMNhYVM\"",
    "mtime": "2024-05-16T10:42:28.067Z",
    "size": 194130,
    "path": "../public/img/screens/dashboards-charts.png"
  },
  "/img/screens/dashboards-company-dark.png": {
    "type": "image/png",
    "etag": "\"3e446-M9g/QhenNuC50JCGKs7ag++YWoM\"",
    "mtime": "2024-05-16T10:42:31.619Z",
    "size": 255046,
    "path": "../public/img/screens/dashboards-company-dark.png"
  },
  "/img/screens/dashboards-company.png": {
    "type": "image/png",
    "etag": "\"3db63-wkNG+Bd64suQCa/JAMODEbxjgRE\"",
    "mtime": "2024-05-16T10:42:33.342Z",
    "size": 252771,
    "path": "../public/img/screens/dashboards-company.png"
  },
  "/img/screens/dashboards-course-dark.png": {
    "type": "image/png",
    "etag": "\"43989-vcp+Y6xGPIID1eKiJsR0YT5D5xk\"",
    "mtime": "2024-05-16T10:42:29.529Z",
    "size": 276873,
    "path": "../public/img/screens/dashboards-course-dark.png"
  },
  "/img/screens/dashboards-course.png": {
    "type": "image/png",
    "etag": "\"43a5b-XBUe6bKeherfuEzo0cJe3Iwi928\"",
    "mtime": "2024-05-16T10:42:25.308Z",
    "size": 277083,
    "path": "../public/img/screens/dashboards-course.png"
  },
  "/img/screens/dashboards-delivery-dark.png": {
    "type": "image/png",
    "etag": "\"68e07-xq1e2cva+E4F51XsSrKrCxmuebY\"",
    "mtime": "2024-05-16T10:42:34.418Z",
    "size": 429575,
    "path": "../public/img/screens/dashboards-delivery-dark.png"
  },
  "/img/screens/dashboards-delivery.png": {
    "type": "image/png",
    "etag": "\"6a74a-lOfaydXQt+E/wos+g5kF5R+UmTU\"",
    "mtime": "2024-05-16T10:42:31.029Z",
    "size": 436042,
    "path": "../public/img/screens/dashboards-delivery.png"
  },
  "/img/screens/dashboards-ecommerce-dark.png": {
    "type": "image/png",
    "etag": "\"3f990-gtauoDoL14shmUozvY3LDvKSq0E\"",
    "mtime": "2024-05-16T10:42:28.794Z",
    "size": 260496,
    "path": "../public/img/screens/dashboards-ecommerce-dark.png"
  },
  "/img/screens/dashboards-ecommerce.png": {
    "type": "image/png",
    "etag": "\"3f0b9-epXpyGZK06vev4evkknYAdELuLM\"",
    "mtime": "2024-05-16T10:42:28.177Z",
    "size": 258233,
    "path": "../public/img/screens/dashboards-ecommerce.png"
  },
  "/img/screens/dashboards-flights-dark.png": {
    "type": "image/png",
    "etag": "\"45f29-3ipjhw2bBPNn9lcLUKB6ph1nstI\"",
    "mtime": "2024-05-16T10:42:28.141Z",
    "size": 286505,
    "path": "../public/img/screens/dashboards-flights-dark.png"
  },
  "/img/screens/dashboards-flights.png": {
    "type": "image/png",
    "etag": "\"456e1-h6WBeMpN/ZDEJtXPNZlujh3npg4\"",
    "mtime": "2024-05-16T10:42:25.460Z",
    "size": 284385,
    "path": "../public/img/screens/dashboards-flights.png"
  },
  "/img/screens/dashboards-health-dark.png": {
    "type": "image/png",
    "etag": "\"4c36d-u3qTy7irqkbU1f0eyLa8oNK74Uw\"",
    "mtime": "2024-05-16T10:42:36.582Z",
    "size": 312173,
    "path": "../public/img/screens/dashboards-health-dark.png"
  },
  "/img/screens/dashboards-health.png": {
    "type": "image/png",
    "etag": "\"4edda-jRBmL2oMExQisTulavKaBdQS0qA\"",
    "mtime": "2024-05-16T10:42:36.442Z",
    "size": 323034,
    "path": "../public/img/screens/dashboards-health.png"
  },
  "/img/screens/dashboards-hobbies-dark.png": {
    "type": "image/png",
    "etag": "\"78268-orUet9Y6V+eu4QBCNY8yzHZfIjc\"",
    "mtime": "2024-05-16T10:42:29.256Z",
    "size": 492136,
    "path": "../public/img/screens/dashboards-hobbies-dark.png"
  },
  "/img/screens/dashboards-hobbies.png": {
    "type": "image/png",
    "etag": "\"779b0-Y+b08NkVSZAFW4iR8MDDfqxOTb4\"",
    "mtime": "2024-05-16T10:42:35.144Z",
    "size": 489904,
    "path": "../public/img/screens/dashboards-hobbies.png"
  },
  "/img/screens/dashboards-human-resources-dark.png": {
    "type": "image/png",
    "etag": "\"53b23-bKhky0v8VMalWKRnmpRw3H8C37U\"",
    "mtime": "2024-05-16T10:42:28.902Z",
    "size": 342819,
    "path": "../public/img/screens/dashboards-human-resources-dark.png"
  },
  "/img/screens/dashboards-human-resources.png": {
    "type": "image/png",
    "etag": "\"5300f-X8octLZjE89D7G6QCcDT6VOY6VE\"",
    "mtime": "2024-05-16T10:42:36.118Z",
    "size": 339983,
    "path": "../public/img/screens/dashboards-human-resources.png"
  },
  "/img/screens/dashboards-inbox-dark.png": {
    "type": "image/png",
    "etag": "\"4adc4-vnQ9K/MJkMWAI1WqHPvrC4WlYjI\"",
    "mtime": "2024-05-16T10:42:30.917Z",
    "size": 306628,
    "path": "../public/img/screens/dashboards-inbox-dark.png"
  },
  "/img/screens/dashboards-inbox.png": {
    "type": "image/png",
    "etag": "\"4aa68-Di6KqRoiU3dWbKhrQxUNl2VmYuA\"",
    "mtime": "2024-05-16T10:42:25.168Z",
    "size": 305768,
    "path": "../public/img/screens/dashboards-inbox.png"
  },
  "/img/screens/dashboards-influencer-dark.png": {
    "type": "image/png",
    "etag": "\"3ccae-MaScmPFNVSOjv8d429wypwbnOew\"",
    "mtime": "2024-05-16T10:42:33.853Z",
    "size": 249006,
    "path": "../public/img/screens/dashboards-influencer-dark.png"
  },
  "/img/screens/dashboards-influencer.png": {
    "type": "image/png",
    "etag": "\"3d863-yCZxTvmDEgXH5P+fgWJCyb/uv/0\"",
    "mtime": "2024-05-16T10:42:30.839Z",
    "size": 252003,
    "path": "../public/img/screens/dashboards-influencer.png"
  },
  "/img/screens/dashboards-jobs-dark.png": {
    "type": "image/png",
    "etag": "\"53656-mmXyYhWrsTAtqc1AAEoK8KAh+20\"",
    "mtime": "2024-05-16T10:42:26.386Z",
    "size": 341590,
    "path": "../public/img/screens/dashboards-jobs-dark.png"
  },
  "/img/screens/dashboards-jobs.png": {
    "type": "image/png",
    "etag": "\"52b1a-jwBdcZol7G5DY4mj4iJHsH7G6lY\"",
    "mtime": "2024-05-16T10:42:25.204Z",
    "size": 338714,
    "path": "../public/img/screens/dashboards-jobs.png"
  },
  "/img/screens/dashboards-map-left-dark.png": {
    "type": "image/png",
    "etag": "\"184b2d-QXqkA6iT8vndY/6uSRbZeWm05PE\"",
    "mtime": "2024-05-16T10:42:29.627Z",
    "size": 1592109,
    "path": "../public/img/screens/dashboards-map-left-dark.png"
  },
  "/img/screens/dashboards-map-left.png": {
    "type": "image/png",
    "etag": "\"17cfde-Um9wZZJY5hKGna25DQq6aXbhvoQ\"",
    "mtime": "2024-05-16T10:42:33.817Z",
    "size": 1560542,
    "path": "../public/img/screens/dashboards-map-left.png"
  },
  "/img/screens/dashboards-map-right-dark.png": {
    "type": "image/png",
    "etag": "\"18722d-OGKvoQahyF5Oi/BI47zS6lKMdY8\"",
    "mtime": "2024-05-16T10:42:25.063Z",
    "size": 1602093,
    "path": "../public/img/screens/dashboards-map-right-dark.png"
  },
  "/img/screens/dashboards-map-right.png": {
    "type": "image/png",
    "etag": "\"18200f-DNr+RMpVf1CGnZlSwJ0ilFm0zEk\"",
    "mtime": "2024-05-16T10:42:30.473Z",
    "size": 1581071,
    "path": "../public/img/screens/dashboards-map-right.png"
  },
  "/img/screens/dashboards-messaging-2-dark.png": {
    "type": "image/png",
    "etag": "\"64617-IcFomh7e8iKuvjGAdx1uPLuCYOQ\"",
    "mtime": "2024-05-16T10:42:25.349Z",
    "size": 411159,
    "path": "../public/img/screens/dashboards-messaging-2-dark.png"
  },
  "/img/screens/dashboards-messaging-2.png": {
    "type": "image/png",
    "etag": "\"623ae-q7sRUgCZeOr5RCpb3fqLZ+4zhHk\"",
    "mtime": "2024-05-16T10:42:28.216Z",
    "size": 402350,
    "path": "../public/img/screens/dashboards-messaging-2.png"
  },
  "/img/screens/dashboards-messaging-dark.png": {
    "type": "image/png",
    "etag": "\"3fdbe-MwFFyWEj3jneO+cRxqYeyFWYspo\"",
    "mtime": "2024-05-16T10:42:31.878Z",
    "size": 261566,
    "path": "../public/img/screens/dashboards-messaging-dark.png"
  },
  "/img/screens/dashboards-messaging.png": {
    "type": "image/png",
    "etag": "\"3f853-iXDVscGNEmBsWi7jNSdXElg7Cho\"",
    "mtime": "2024-05-16T10:42:34.709Z",
    "size": 260179,
    "path": "../public/img/screens/dashboards-messaging.png"
  },
  "/img/screens/dashboards-overview-dark.png": {
    "type": "image/png",
    "etag": "\"51a36-h4IjZhqpnnEBBNGdp76Vci8jjWw\"",
    "mtime": "2024-05-16T10:42:34.122Z",
    "size": 334390,
    "path": "../public/img/screens/dashboards-overview-dark.png"
  },
  "/img/screens/dashboards-overview.png": {
    "type": "image/png",
    "etag": "\"50c07-8aZ2Nk0eD7gLec1q6EENSCneD7s\"",
    "mtime": "2024-05-16T10:42:30.310Z",
    "size": 330759,
    "path": "../public/img/screens/dashboards-overview.png"
  },
  "/img/screens/dashboards-personal-1-dark.png": {
    "type": "image/png",
    "etag": "\"4de9b-onP1/O3V5WUwJCDK1y/I796uPd4\"",
    "mtime": "2024-05-16T10:42:27.120Z",
    "size": 319131,
    "path": "../public/img/screens/dashboards-personal-1-dark.png"
  },
  "/img/screens/dashboards-personal-1.png": {
    "type": "image/png",
    "etag": "\"4c6bf-Cz++7M7IIQq58IOFLjaDBgFLPJY\"",
    "mtime": "2024-05-16T10:42:36.316Z",
    "size": 313023,
    "path": "../public/img/screens/dashboards-personal-1.png"
  },
  "/img/screens/dashboards-personal-2-dark.png": {
    "type": "image/png",
    "etag": "\"51767-Djq5N7Ehh65j/2Qu6ZPnXYKKAec\"",
    "mtime": "2024-05-16T10:42:30.878Z",
    "size": 333671,
    "path": "../public/img/screens/dashboards-personal-2-dark.png"
  },
  "/img/screens/dashboards-personal-2.png": {
    "type": "image/png",
    "etag": "\"502e5-oxBAH7cj4IVvViY5ynQl2UHMv38\"",
    "mtime": "2024-05-16T10:42:27.907Z",
    "size": 328421,
    "path": "../public/img/screens/dashboards-personal-2.png"
  },
  "/img/screens/dashboards-personal-3-dark.png": {
    "type": "image/png",
    "etag": "\"4968e-hriz2+ONQExS09cgMLm9lprTPaU\"",
    "mtime": "2024-05-16T10:42:27.525Z",
    "size": 300686,
    "path": "../public/img/screens/dashboards-personal-3-dark.png"
  },
  "/img/screens/dashboards-personal-3.png": {
    "type": "image/png",
    "etag": "\"47af5-AwRnja6lLeCUmtqlpTxpQQkRckU\"",
    "mtime": "2024-05-16T10:42:30.544Z",
    "size": 293621,
    "path": "../public/img/screens/dashboards-personal-3.png"
  },
  "/img/screens/dashboards-quickviews-dark.png": {
    "type": "image/png",
    "etag": "\"5ec5c-K+DfBZyzNemNxuXS0oPr8caYKaQ\"",
    "mtime": "2024-05-16T10:42:25.601Z",
    "size": 388188,
    "path": "../public/img/screens/dashboards-quickviews-dark.png"
  },
  "/img/screens/dashboards-quickviews.png": {
    "type": "image/png",
    "etag": "\"5dd33-CBR0rsskMg6T8DTU1P4vsbh/Eak\"",
    "mtime": "2024-05-16T10:42:34.639Z",
    "size": 384307,
    "path": "../public/img/screens/dashboards-quickviews.png"
  },
  "/img/screens/dashboards-sales-dark.png": {
    "type": "image/png",
    "etag": "\"43477-DwWoZRA2kov7rfO0Z+gi64fXi7E\"",
    "mtime": "2024-05-16T10:42:34.908Z",
    "size": 275575,
    "path": "../public/img/screens/dashboards-sales-dark.png"
  },
  "/img/screens/dashboards-sales.png": {
    "type": "image/png",
    "etag": "\"43d1c-vGugxfRZnFa7se8924GRLGPq3yA\"",
    "mtime": "2024-05-16T10:42:29.762Z",
    "size": 277788,
    "path": "../public/img/screens/dashboards-sales.png"
  },
  "/img/screens/dashboards-soccer-dark.png": {
    "type": "image/png",
    "etag": "\"50c95-ZFkULfpDSjON5xuIYPPae41dzxE\"",
    "mtime": "2024-05-16T10:42:30.689Z",
    "size": 330901,
    "path": "../public/img/screens/dashboards-soccer-dark.png"
  },
  "/img/screens/dashboards-soccer.png": {
    "type": "image/png",
    "etag": "\"4fa71-w5dTtc5OIts1dPBEuV8fuZhHXdc\"",
    "mtime": "2024-05-16T10:42:28.606Z",
    "size": 326257,
    "path": "../public/img/screens/dashboards-soccer.png"
  },
  "/img/screens/dashboards-stocks-dark.png": {
    "type": "image/png",
    "etag": "\"43634-bvxd8s08U8Yxo7G57Js59PovwDI\"",
    "mtime": "2024-05-16T10:42:26.274Z",
    "size": 276020,
    "path": "../public/img/screens/dashboards-stocks-dark.png"
  },
  "/img/screens/dashboards-stocks.png": {
    "type": "image/png",
    "etag": "\"447d4-0FaEe5CIEgF0IZSNTQPCP3jhVkY\"",
    "mtime": "2024-05-16T10:42:32.441Z",
    "size": 280532,
    "path": "../public/img/screens/dashboards-stocks.png"
  },
  "/img/screens/dashboards-trading-dark.png": {
    "type": "image/png",
    "etag": "\"56e2a-nXY/Gm+uIn4xlUBSFShPckrp4ds\"",
    "mtime": "2024-05-16T10:42:29.156Z",
    "size": 355882,
    "path": "../public/img/screens/dashboards-trading-dark.png"
  },
  "/img/screens/dashboards-trading.png": {
    "type": "image/png",
    "etag": "\"53fd8-dneuYtEmG/tZTRzm9tVj/z/xwOg\"",
    "mtime": "2024-05-16T10:42:29.215Z",
    "size": 344024,
    "path": "../public/img/screens/dashboards-trading.png"
  },
  "/img/screens/dashboards-video-dark.png": {
    "type": "image/png",
    "etag": "\"d6eb3-ASD16H/LV46TcisKWYfjADwRhC8\"",
    "mtime": "2024-05-16T10:42:29.371Z",
    "size": 880307,
    "path": "../public/img/screens/dashboards-video-dark.png"
  },
  "/img/screens/dashboards-video.png": {
    "type": "image/png",
    "etag": "\"d4d62-XmARGkP7S6LAGcl5KjrCv0h7/dw\"",
    "mtime": "2024-05-16T10:42:32.528Z",
    "size": 871778,
    "path": "../public/img/screens/dashboards-video.png"
  },
  "/img/screens/dashboards-widgets-creative-dark.png": {
    "type": "image/png",
    "etag": "\"6b193-HFCE3Sp7dYmBmjy7QR4o36x+kK4\"",
    "mtime": "2024-05-16T10:42:35.594Z",
    "size": 438675,
    "path": "../public/img/screens/dashboards-widgets-creative-dark.png"
  },
  "/img/screens/dashboards-widgets-creative.png": {
    "type": "image/png",
    "etag": "\"68ff1-lw9ZIMtmAZ1thzKBeTNduKFmOGA\"",
    "mtime": "2024-05-16T10:42:26.095Z",
    "size": 430065,
    "path": "../public/img/screens/dashboards-widgets-creative.png"
  },
  "/img/screens/dashboards-widgets-lists-dark.png": {
    "type": "image/png",
    "etag": "\"3eaa1-8x+bLTNrYft2n/I6ud8C4PBozio\"",
    "mtime": "2024-05-16T10:42:29.450Z",
    "size": 256673,
    "path": "../public/img/screens/dashboards-widgets-lists-dark.png"
  },
  "/img/screens/dashboards-widgets-lists.png": {
    "type": "image/png",
    "etag": "\"3db73-Nhel/gGvGbeiFpCeFtcvf+2aNKE\"",
    "mtime": "2024-05-16T10:42:34.307Z",
    "size": 252787,
    "path": "../public/img/screens/dashboards-widgets-lists.png"
  },
  "/img/screens/dashboards-widgets-ui-dark.png": {
    "type": "image/png",
    "etag": "\"63062-mtBz1P+FDZjCG/EErWcP8Dhocq0\"",
    "mtime": "2024-05-16T10:42:34.379Z",
    "size": 405602,
    "path": "../public/img/screens/dashboards-widgets-ui-dark.png"
  },
  "/img/screens/dashboards-widgets-ui.png": {
    "type": "image/png",
    "etag": "\"6251f-7a6V7IeOYoz3OVWllBbhT0oFYXI\"",
    "mtime": "2024-05-16T10:42:33.049Z",
    "size": 402719,
    "path": "../public/img/screens/dashboards-widgets-ui.png"
  },
  "/img/screens/dashboards-writer-dark.png": {
    "type": "image/png",
    "etag": "\"64aa9-1jTbISzStJ26xrpqcK3khUBZGVs\"",
    "mtime": "2024-05-16T10:42:30.162Z",
    "size": 412329,
    "path": "../public/img/screens/dashboards-writer-dark.png"
  },
  "/img/screens/dashboards-writer.png": {
    "type": "image/png",
    "etag": "\"636cd-gJRHNdU+zxshLT/xiTK6OtjSpIU\"",
    "mtime": "2024-05-16T10:42:33.493Z",
    "size": 407245,
    "path": "../public/img/screens/dashboards-writer.png"
  },
  "/img/screens/documentation-hub-dark.png": {
    "type": "image/png",
    "etag": "\"42542-eFoWMoj7+TaeKPQjsobUgKHCTLw\"",
    "mtime": "2024-05-16T10:42:34.045Z",
    "size": 271682,
    "path": "../public/img/screens/documentation-hub-dark.png"
  },
  "/img/screens/documentation-hub.png": {
    "type": "image/png",
    "etag": "\"40f49-6aLvX6OdGHG4e6GUIhICp1ShysI\"",
    "mtime": "2024-05-16T10:42:28.300Z",
    "size": 266057,
    "path": "../public/img/screens/documentation-hub.png"
  },
  "/img/screens/error-dark.png": {
    "type": "image/png",
    "etag": "\"25769-QhSLq78RyGXgrMhJUXMAu8fsiPw\"",
    "mtime": "2024-05-16T10:42:26.647Z",
    "size": 153449,
    "path": "../public/img/screens/error-dark.png"
  },
  "/img/screens/error.png": {
    "type": "image/png",
    "etag": "\"25cac-Uqs3KE6WIo+3POQLTupssAFVuco\"",
    "mtime": "2024-05-16T10:42:36.488Z",
    "size": 154796,
    "path": "../public/img/screens/error.png"
  },
  "/img/screens/layouts-accounts-dark.png": {
    "type": "image/png",
    "etag": "\"3e998-HJhjxopwz3EyqVk3KKC9+J7V5LI\"",
    "mtime": "2024-05-16T10:42:31.691Z",
    "size": 256408,
    "path": "../public/img/screens/layouts-accounts-dark.png"
  },
  "/img/screens/layouts-accounts-linked-dark.png": {
    "type": "image/png",
    "etag": "\"36f94-o8gOsCQWsbjXqF2adAno6gi3Y5s\"",
    "mtime": "2024-05-16T10:42:33.201Z",
    "size": 225172,
    "path": "../public/img/screens/layouts-accounts-linked-dark.png"
  },
  "/img/screens/layouts-accounts-linked.png": {
    "type": "image/png",
    "etag": "\"35634-+stlFSvT5bDMwNemOEFUp07p1TA\"",
    "mtime": "2024-05-16T10:42:26.965Z",
    "size": 218676,
    "path": "../public/img/screens/layouts-accounts-linked.png"
  },
  "/img/screens/layouts-accounts-rules-dark.png": {
    "type": "image/png",
    "etag": "\"3dd9a-Jx32REdvL+gsmH3rVv1JQ1PB9Gw\"",
    "mtime": "2024-05-16T10:42:25.920Z",
    "size": 253338,
    "path": "../public/img/screens/layouts-accounts-rules-dark.png"
  },
  "/img/screens/layouts-accounts-rules.png": {
    "type": "image/png",
    "etag": "\"3f607-pr6fEiiSRiUcdfu8J/rwvcIK018\"",
    "mtime": "2024-05-16T10:42:27.562Z",
    "size": 259591,
    "path": "../public/img/screens/layouts-accounts-rules.png"
  },
  "/img/screens/layouts-accounts.png": {
    "type": "image/png",
    "etag": "\"3c80b-pxYByjab0r7u2+oQc9CJ/LRNBB0\"",
    "mtime": "2024-05-16T10:42:28.829Z",
    "size": 247819,
    "path": "../public/img/screens/layouts-accounts.png"
  },
  "/img/screens/layouts-card-grid-1-dark.png": {
    "type": "image/png",
    "etag": "\"3ee5a-T5AEi3HhylglffRi+UZwyiIl8EA\"",
    "mtime": "2024-05-16T10:42:31.328Z",
    "size": 257626,
    "path": "../public/img/screens/layouts-card-grid-1-dark.png"
  },
  "/img/screens/layouts-card-grid-1.png": {
    "type": "image/png",
    "etag": "\"3ebd5-kRzHh9Te+XiRLm15E7sL+P50sIc\"",
    "mtime": "2024-05-16T10:42:27.044Z",
    "size": 256981,
    "path": "../public/img/screens/layouts-card-grid-1.png"
  },
  "/img/screens/layouts-card-grid-2-dark.png": {
    "type": "image/png",
    "etag": "\"b86c9-dzX7zlpDqRvAJvxWas48LQSIqyk\"",
    "mtime": "2024-05-16T10:42:30.042Z",
    "size": 755401,
    "path": "../public/img/screens/layouts-card-grid-2-dark.png"
  },
  "/img/screens/layouts-card-grid-2.png": {
    "type": "image/png",
    "etag": "\"b7ed2-VYoX1atoY9O3YREHHf9JApIRNgU\"",
    "mtime": "2024-05-16T10:42:27.165Z",
    "size": 753362,
    "path": "../public/img/screens/layouts-card-grid-2.png"
  },
  "/img/screens/layouts-card-grid-3-dark.png": {
    "type": "image/png",
    "etag": "\"4b979-8ZzZx784B7Pj6DV3iINwKJ5eX/0\"",
    "mtime": "2024-05-16T10:42:26.461Z",
    "size": 309625,
    "path": "../public/img/screens/layouts-card-grid-3-dark.png"
  },
  "/img/screens/layouts-card-grid-3.png": {
    "type": "image/png",
    "etag": "\"4a89b-xt/IcRut2B4u/52/9Hw5QLQutzQ\"",
    "mtime": "2024-05-16T10:42:27.082Z",
    "size": 305307,
    "path": "../public/img/screens/layouts-card-grid-3.png"
  },
  "/img/screens/layouts-card-grid-4-dark.png": {
    "type": "image/png",
    "etag": "\"6edfe-qs004nMsC7aMiuRdDKFkv0GZtfc\"",
    "mtime": "2024-05-16T10:42:34.162Z",
    "size": 454142,
    "path": "../public/img/screens/layouts-card-grid-4-dark.png"
  },
  "/img/screens/layouts-card-grid-4.png": {
    "type": "image/png",
    "etag": "\"6e865-f9CEl12y9eA+QICCdtFYKeMiat4\"",
    "mtime": "2024-05-16T10:42:27.947Z",
    "size": 452709,
    "path": "../public/img/screens/layouts-card-grid-4.png"
  },
  "/img/screens/layouts-card-new-dark.png": {
    "type": "image/png",
    "etag": "\"24bd2-tlizY39Fvvs8rf4UHbHsCuPyWLU\"",
    "mtime": "2024-05-16T10:42:31.510Z",
    "size": 150482,
    "path": "../public/img/screens/layouts-card-new-dark.png"
  },
  "/img/screens/layouts-card-new.png": {
    "type": "image/png",
    "etag": "\"259ed-KlOsu3ohLM1HcB1jy4gO/+51GC0\"",
    "mtime": "2024-05-16T10:42:36.353Z",
    "size": 154093,
    "path": "../public/img/screens/layouts-card-new.png"
  },
  "/img/screens/layouts-cards-dark.png": {
    "type": "image/png",
    "etag": "\"489ea-5ZO8p4CAAraOmvmjr2z0DZWx0sE\"",
    "mtime": "2024-05-16T10:42:36.275Z",
    "size": 297450,
    "path": "../public/img/screens/layouts-cards-dark.png"
  },
  "/img/screens/layouts-cards.png": {
    "type": "image/png",
    "etag": "\"44dbe-jCBSgBIWlpaw6SkQHrFk6gv0de8\"",
    "mtime": "2024-05-16T10:42:28.865Z",
    "size": 282046,
    "path": "../public/img/screens/layouts-cards.png"
  },
  "/img/screens/layouts-company-dark.png": {
    "type": "image/png",
    "etag": "\"4030f-Pdw17dfJbNeLhfktN2GCt1+l+hs\"",
    "mtime": "2024-05-16T10:42:35.212Z",
    "size": 262927,
    "path": "../public/img/screens/layouts-company-dark.png"
  },
  "/img/screens/layouts-company-edit-dark.png": {
    "type": "image/png",
    "etag": "\"3f27e-8OqNdbWfbwdqWtC6NlcmsgcXCng\"",
    "mtime": "2024-05-16T10:42:28.262Z",
    "size": 258686,
    "path": "../public/img/screens/layouts-company-edit-dark.png"
  },
  "/img/screens/layouts-company-edit.png": {
    "type": "image/png",
    "etag": "\"3b443-7BgIojQsSAiGE9GyYXPBQues9HQ\"",
    "mtime": "2024-05-16T10:42:33.891Z",
    "size": 242755,
    "path": "../public/img/screens/layouts-company-edit.png"
  },
  "/img/screens/layouts-company.png": {
    "type": "image/png",
    "etag": "\"3e9db-jcl04LsJrm7XXjhbpUZdDG1UThU\"",
    "mtime": "2024-05-16T10:42:35.313Z",
    "size": 256475,
    "path": "../public/img/screens/layouts-company.png"
  },
  "/img/screens/layouts-contacts-create-dark.png": {
    "type": "image/png",
    "etag": "\"3db91-uvWTpSvmOPo0mVkX4JKMU7678GE\"",
    "mtime": "2024-05-16T10:42:28.974Z",
    "size": 252817,
    "path": "../public/img/screens/layouts-contacts-create-dark.png"
  },
  "/img/screens/layouts-contacts-create.png": {
    "type": "image/png",
    "etag": "\"3aeea-fwkwcP1rjtmEF34yxkSF/BY44WI\"",
    "mtime": "2024-05-16T10:42:26.238Z",
    "size": 241386,
    "path": "../public/img/screens/layouts-contacts-create.png"
  },
  "/img/screens/layouts-credit-dark.png": {
    "type": "image/png",
    "etag": "\"4cb8b-zBDsW8Uf9ielDRELJ1k4EvXTAYg\"",
    "mtime": "2024-05-16T10:42:26.795Z",
    "size": 314251,
    "path": "../public/img/screens/layouts-credit-dark.png"
  },
  "/img/screens/layouts-credit.png": {
    "type": "image/png",
    "etag": "\"4c7c0-DhUs+HMl03E8pjIK9R4qGkVuLNc\"",
    "mtime": "2024-05-16T10:42:33.686Z",
    "size": 313280,
    "path": "../public/img/screens/layouts-credit.png"
  },
  "/img/screens/layouts-documents-dark.png": {
    "type": "image/png",
    "etag": "\"3a73b-CUB86p1piZsaneX2L8/ZdV0X2lQ\"",
    "mtime": "2024-05-16T10:42:34.007Z",
    "size": 239419,
    "path": "../public/img/screens/layouts-documents-dark.png"
  },
  "/img/screens/layouts-documents.png": {
    "type": "image/png",
    "etag": "\"39255-S8VlETGi6r+kJwMTFHKD3KHycAs\"",
    "mtime": "2024-05-16T10:42:32.212Z",
    "size": 234069,
    "path": "../public/img/screens/layouts-documents.png"
  },
  "/img/screens/layouts-downloads-dark.png": {
    "type": "image/png",
    "etag": "\"3a1d5-i+j0WMZ3XMPk05Nx1XD5bPvh0gg\"",
    "mtime": "2024-05-16T10:42:27.372Z",
    "size": 238037,
    "path": "../public/img/screens/layouts-downloads-dark.png"
  },
  "/img/screens/layouts-downloads.png": {
    "type": "image/png",
    "etag": "\"38e15-ksJPbjeHuj8E6IIVRqCd7WGtDz0\"",
    "mtime": "2024-05-16T10:42:30.762Z",
    "size": 232981,
    "path": "../public/img/screens/layouts-downloads.png"
  },
  "/img/screens/layouts-form-1-dark.png": {
    "type": "image/png",
    "etag": "\"304cd-3Ah9XpLHDyz6VnUkbzv/pvMK2tI\"",
    "mtime": "2024-05-16T10:42:32.249Z",
    "size": 197837,
    "path": "../public/img/screens/layouts-form-1-dark.png"
  },
  "/img/screens/layouts-form-1.png": {
    "type": "image/png",
    "etag": "\"2f739-QTg/er0baBNkk7iTFS1Kxg36XfQ\"",
    "mtime": "2024-05-16T10:42:32.479Z",
    "size": 194361,
    "path": "../public/img/screens/layouts-form-1.png"
  },
  "/img/screens/layouts-form-2-dark.png": {
    "type": "image/png",
    "etag": "\"3cd06-QapsPTombW5g9xfaUKJTXENAT7k\"",
    "mtime": "2024-05-16T10:42:33.087Z",
    "size": 249094,
    "path": "../public/img/screens/layouts-form-2-dark.png"
  },
  "/img/screens/layouts-form-2.png": {
    "type": "image/png",
    "etag": "\"3b7eb-ZVRwxcwPflNas0XVygQakYdjgAY\"",
    "mtime": "2024-05-16T10:42:25.240Z",
    "size": 243691,
    "path": "../public/img/screens/layouts-form-2.png"
  },
  "/img/screens/layouts-form-3-dark.png": {
    "type": "image/png",
    "etag": "\"35ff6-ga9dOwoHKDr3AemQTNkqdJ09pu4\"",
    "mtime": "2024-05-16T10:42:30.417Z",
    "size": 221174,
    "path": "../public/img/screens/layouts-form-3-dark.png"
  },
  "/img/screens/layouts-form-3.png": {
    "type": "image/png",
    "etag": "\"3601b-mczN/af8MbK58QR9Q4WidUjUDLw\"",
    "mtime": "2024-05-16T10:42:30.616Z",
    "size": 221211,
    "path": "../public/img/screens/layouts-form-3.png"
  },
  "/img/screens/layouts-form-4-dark.png": {
    "type": "image/png",
    "etag": "\"2f198-8xp7324+YcNevWswUalnWlWZvxQ\"",
    "mtime": "2024-05-16T10:42:31.211Z",
    "size": 192920,
    "path": "../public/img/screens/layouts-form-4-dark.png"
  },
  "/img/screens/layouts-form-4.png": {
    "type": "image/png",
    "etag": "\"2d9cc-nfmEvf351/osLRgJwbmxD/syURY\"",
    "mtime": "2024-05-16T10:42:32.756Z",
    "size": 186828,
    "path": "../public/img/screens/layouts-form-4.png"
  },
  "/img/screens/layouts-form-5-dark.png": {
    "type": "image/png",
    "etag": "\"2f586-Mtdl8HcZll6se1C7D2wnlob/J4w\"",
    "mtime": "2024-05-16T10:42:25.004Z",
    "size": 193926,
    "path": "../public/img/screens/layouts-form-5-dark.png"
  },
  "/img/screens/layouts-form-5.png": {
    "type": "image/png",
    "etag": "\"2ed50-1h/a6coi7D20NLBOHjy6GEP6TUk\"",
    "mtime": "2024-05-16T10:42:31.763Z",
    "size": 191824,
    "path": "../public/img/screens/layouts-form-5.png"
  },
  "/img/screens/layouts-form-6-dark.png": {
    "type": "image/png",
    "etag": "\"354a7-WESnkVrvy2eG+bJ1jkm/cxtJUBk\"",
    "mtime": "2024-05-16T10:42:29.964Z",
    "size": 218279,
    "path": "../public/img/screens/layouts-form-6-dark.png"
  },
  "/img/screens/layouts-form-6.png": {
    "type": "image/png",
    "etag": "\"34596-cT5yAg8C0Cn9QIG7uttl3saCtoc\"",
    "mtime": "2024-05-16T10:42:26.613Z",
    "size": 214422,
    "path": "../public/img/screens/layouts-form-6.png"
  },
  "/img/screens/layouts-integrations-dark.png": {
    "type": "image/png",
    "etag": "\"45785-eJl8uUlBnzsSMlVBgAkVCIDM9P0\"",
    "mtime": "2024-05-16T10:42:36.158Z",
    "size": 284549,
    "path": "../public/img/screens/layouts-integrations-dark.png"
  },
  "/img/screens/layouts-integrations.png": {
    "type": "image/png",
    "etag": "\"4433a-Ueg/92bu/pjVvLqtUeafThRIA8U\"",
    "mtime": "2024-05-16T10:42:29.894Z",
    "size": 279354,
    "path": "../public/img/screens/layouts-integrations.png"
  },
  "/img/screens/layouts-invest-dark.png": {
    "type": "image/png",
    "etag": "\"73e57-QjI+d+3qoSUucoTBm/XKclWE7k0\"",
    "mtime": "2024-05-16T10:42:31.443Z",
    "size": 474711,
    "path": "../public/img/screens/layouts-invest-dark.png"
  },
  "/img/screens/layouts-invest.png": {
    "type": "image/png",
    "etag": "\"71afa-T6lmbn90BfBmpTb1f0O0ec/Sr1E\"",
    "mtime": "2024-05-16T10:42:26.688Z",
    "size": 465658,
    "path": "../public/img/screens/layouts-invest.png"
  },
  "/img/screens/layouts-invite-dark.png": {
    "type": "image/png",
    "etag": "\"176c6-Db0CaMsB0+oO//q7THo8lg8vCtY\"",
    "mtime": "2024-05-16T10:42:27.270Z",
    "size": 95942,
    "path": "../public/img/screens/layouts-invite-dark.png"
  },
  "/img/screens/layouts-invite-permissions-dark.png": {
    "type": "image/png",
    "etag": "\"2dfac-Mq7cK36Rle607P77OwsE+lWgXhg\"",
    "mtime": "2024-05-16T10:42:35.839Z",
    "size": 188332,
    "path": "../public/img/screens/layouts-invite-permissions-dark.png"
  },
  "/img/screens/layouts-invite-permissions.png": {
    "type": "image/png",
    "etag": "\"2e72f-x0qAt3WZnlBr+c57KZQllnjiazg\"",
    "mtime": "2024-05-16T10:42:30.082Z",
    "size": 190255,
    "path": "../public/img/screens/layouts-invite-permissions.png"
  },
  "/img/screens/layouts-invite-review-dark.png": {
    "type": "image/png",
    "etag": "\"26d5b-4Bl0lRjj9u3obzDs/3DLzcR3i9s\"",
    "mtime": "2024-05-16T10:42:25.132Z",
    "size": 159067,
    "path": "../public/img/screens/layouts-invite-review-dark.png"
  },
  "/img/screens/layouts-invite-review.png": {
    "type": "image/png",
    "etag": "\"26e5c-tVNZEa97DOFdOOdalXxsHQGbf80\"",
    "mtime": "2024-05-16T10:42:31.105Z",
    "size": 159324,
    "path": "../public/img/screens/layouts-invite-review.png"
  },
  "/img/screens/layouts-invite.png": {
    "type": "image/png",
    "etag": "\"169f1-Zj5vo0BlWD2NkEpHtxCzFE+EHmc\"",
    "mtime": "2024-05-16T10:42:32.789Z",
    "size": 92657,
    "path": "../public/img/screens/layouts-invite.png"
  },
  "/img/screens/layouts-list-flex-1-dark.png": {
    "type": "image/png",
    "etag": "\"4b380-kPK1ulDnUR1rq/GjyBvrKHzTdU0\"",
    "mtime": "2024-05-16T10:42:26.020Z",
    "size": 308096,
    "path": "../public/img/screens/layouts-list-flex-1-dark.png"
  },
  "/img/screens/layouts-list-flex-1.png": {
    "type": "image/png",
    "etag": "\"4a438-ajJRklu2HTTi/0ooE4//krRn+uY\"",
    "mtime": "2024-05-16T10:42:35.556Z",
    "size": 304184,
    "path": "../public/img/screens/layouts-list-flex-1.png"
  },
  "/img/screens/layouts-list-flex-2-dark.png": {
    "type": "image/png",
    "etag": "\"4fe21-YJfFPemhXeLSz16+Xnl0xszXgMw\"",
    "mtime": "2024-05-16T10:42:35.768Z",
    "size": 327201,
    "path": "../public/img/screens/layouts-list-flex-2-dark.png"
  },
  "/img/screens/layouts-list-flex-2.png": {
    "type": "image/png",
    "etag": "\"4e3fd-P4sp/wMsMklThhqjdf3NPLx5PI8\"",
    "mtime": "2024-05-16T10:42:25.844Z",
    "size": 320509,
    "path": "../public/img/screens/layouts-list-flex-2.png"
  },
  "/img/screens/layouts-list-flex-3-dark.png": {
    "type": "image/png",
    "etag": "\"4fadb-8OC/+MmiAGeeH/3OpkoOyL+c02o\"",
    "mtime": "2024-05-16T10:42:35.877Z",
    "size": 326363,
    "path": "../public/img/screens/layouts-list-flex-3-dark.png"
  },
  "/img/screens/layouts-list-flex-3.png": {
    "type": "image/png",
    "etag": "\"4f064-EZ89D6Ontl6CBLS+idV5o0lBpXU\"",
    "mtime": "2024-05-16T10:42:29.827Z",
    "size": 323684,
    "path": "../public/img/screens/layouts-list-flex-3.png"
  },
  "/img/screens/layouts-list-view-1-dark.png": {
    "type": "image/png",
    "etag": "\"4859f-xmnB5+LZrKB7/BnPLn3KN5RKzMA\"",
    "mtime": "2024-05-16T10:42:35.100Z",
    "size": 296351,
    "path": "../public/img/screens/layouts-list-view-1-dark.png"
  },
  "/img/screens/layouts-list-view-1.png": {
    "type": "image/png",
    "etag": "\"47135-4mV+Qw/yytEFbmdQFAtaBGY7CO8\"",
    "mtime": "2024-05-16T10:42:31.403Z",
    "size": 291125,
    "path": "../public/img/screens/layouts-list-view-1.png"
  },
  "/img/screens/layouts-list-view-2-dark.png": {
    "type": "image/png",
    "etag": "\"43c97-rFVPhEvyDzNq+9eZO3tZl6s74Dc\"",
    "mtime": "2024-05-16T10:42:29.859Z",
    "size": 277655,
    "path": "../public/img/screens/layouts-list-view-2-dark.png"
  },
  "/img/screens/layouts-list-view-2.png": {
    "type": "image/png",
    "etag": "\"43094-o1WDFtl3JbQ1EfuTl6PNVK7Ie/E\"",
    "mtime": "2024-05-16T10:42:27.835Z",
    "size": 274580,
    "path": "../public/img/screens/layouts-list-view-2.png"
  },
  "/img/screens/layouts-list-view-3-dark.png": {
    "type": "image/png",
    "etag": "\"3b529-4KCjc0OnDpwq9/zUbaXrbFYFlzM\"",
    "mtime": "2024-05-16T10:42:29.084Z",
    "size": 242985,
    "path": "../public/img/screens/layouts-list-view-3-dark.png"
  },
  "/img/screens/layouts-list-view-3.png": {
    "type": "image/png",
    "etag": "\"39ad2-JtMOPD5q0iPu46GtT2R8Y+M4/pc\"",
    "mtime": "2024-05-16T10:42:33.128Z",
    "size": 236242,
    "path": "../public/img/screens/layouts-list-view-3.png"
  },
  "/img/screens/layouts-list-view-4-dark.png": {
    "type": "image/png",
    "etag": "\"46307-fuslJR+EGTASn8cIJZGcNN+EHRE\"",
    "mtime": "2024-05-16T10:42:28.938Z",
    "size": 287495,
    "path": "../public/img/screens/layouts-list-view-4-dark.png"
  },
  "/img/screens/layouts-list-view-4.png": {
    "type": "image/png",
    "etag": "\"44764-OQLEtczU3oLninSkC2ISBPc7/aw\"",
    "mtime": "2024-05-16T10:42:34.944Z",
    "size": 280420,
    "path": "../public/img/screens/layouts-list-view-4.png"
  },
  "/img/screens/layouts-members-john-baxter-dark.png": {
    "type": "image/png",
    "etag": "\"4722a-/kziFW8IorVTGx08KP33Eq64Ti4\"",
    "mtime": "2024-05-16T10:42:27.667Z",
    "size": 291370,
    "path": "../public/img/screens/layouts-members-john-baxter-dark.png"
  },
  "/img/screens/layouts-members-john-baxter.png": {
    "type": "image/png",
    "etag": "\"449a2-QZwLfpoHI2rU7boXW5lGz4IBwBY\"",
    "mtime": "2024-05-16T10:42:28.029Z",
    "size": 280994,
    "path": "../public/img/screens/layouts-members-john-baxter.png"
  },
  "/img/screens/layouts-members-maya-rosselini-dark.png": {
    "type": "image/png",
    "etag": "\"471dc-MQWwVIiXgULg3eWLZzw6auNYlfs\"",
    "mtime": "2024-05-16T10:42:26.578Z",
    "size": 291292,
    "path": "../public/img/screens/layouts-members-maya-rosselini-dark.png"
  },
  "/img/screens/layouts-members-maya-rosselini.png": {
    "type": "image/png",
    "etag": "\"4493b-Fxyr/UJyr39yOPHKpOOI6SpxHAk\"",
    "mtime": "2024-05-16T10:42:29.692Z",
    "size": 280891,
    "path": "../public/img/screens/layouts-members-maya-rosselini.png"
  },
  "/img/screens/layouts-offers-dark.png": {
    "type": "image/png",
    "etag": "\"414da-kRFiy3k+VuDApxW8CJPA0CSN0tI\"",
    "mtime": "2024-05-16T10:42:27.704Z",
    "size": 267482,
    "path": "../public/img/screens/layouts-offers-dark.png"
  },
  "/img/screens/layouts-offers.png": {
    "type": "image/png",
    "etag": "\"3f69b-dLxDbYRyJ6m4F5PmcF3tDp2aX0I\"",
    "mtime": "2024-05-16T10:42:27.597Z",
    "size": 259739,
    "path": "../public/img/screens/layouts-offers.png"
  },
  "/img/screens/layouts-onboarding-1-dark.png": {
    "type": "image/png",
    "etag": "\"20f8d-mwyNeN16jvlg7eDwqbwY9U66uqU\"",
    "mtime": "2024-05-16T10:42:25.562Z",
    "size": 135053,
    "path": "../public/img/screens/layouts-onboarding-1-dark.png"
  },
  "/img/screens/layouts-onboarding-1.png": {
    "type": "image/png",
    "etag": "\"2077f-42QTNw5msUhpcTSsUp9pz2Z4EJE\"",
    "mtime": "2024-05-16T10:42:25.528Z",
    "size": 132991,
    "path": "../public/img/screens/layouts-onboarding-1.png"
  },
  "/img/screens/layouts-onboarding-2-dark.png": {
    "type": "image/png",
    "etag": "\"23b61-kpKwGTq8IjMhf9+j8QcY6wgg898\"",
    "mtime": "2024-05-16T10:42:36.077Z",
    "size": 146273,
    "path": "../public/img/screens/layouts-onboarding-2-dark.png"
  },
  "/img/screens/layouts-onboarding-2.png": {
    "type": "image/png",
    "etag": "\"23eb3-BnygMjUZOXMTH7BQy4J3uVjn0Lc\"",
    "mtime": "2024-05-16T10:42:28.568Z",
    "size": 147123,
    "path": "../public/img/screens/layouts-onboarding-2.png"
  },
  "/img/screens/layouts-onboarding-3-dark.png": {
    "type": "image/png",
    "etag": "\"240ef-2UJ6XfF6eX2xUUrcAE1Bj2rN6WU\"",
    "mtime": "2024-05-16T10:42:29.658Z",
    "size": 147695,
    "path": "../public/img/screens/layouts-onboarding-3-dark.png"
  },
  "/img/screens/layouts-onboarding-3.png": {
    "type": "image/png",
    "etag": "\"24398-6NBEXpOw5r+tmQQf1FEZPV0H/lw\"",
    "mtime": "2024-05-16T10:42:25.985Z",
    "size": 148376,
    "path": "../public/img/screens/layouts-onboarding-3.png"
  },
  "/img/screens/layouts-payments-dark.png": {
    "type": "image/png",
    "etag": "\"4774f-vQvUFr/4BzOENq2/GNVWjMcLplc\"",
    "mtime": "2024-05-16T10:42:33.758Z",
    "size": 292687,
    "path": "../public/img/screens/layouts-payments-dark.png"
  },
  "/img/screens/layouts-payments-incoming-dark.png": {
    "type": "image/png",
    "etag": "\"55385-ycc0VQFduQAz0yTjc9ujm25K61Y\"",
    "mtime": "2024-05-16T10:42:35.059Z",
    "size": 349061,
    "path": "../public/img/screens/layouts-payments-incoming-dark.png"
  },
  "/img/screens/layouts-payments-incoming.png": {
    "type": "image/png",
    "etag": "\"51f07-1iOtDjSByvHgP63TMUDKQvIxKfI\"",
    "mtime": "2024-05-16T10:42:32.175Z",
    "size": 335623,
    "path": "../public/img/screens/layouts-payments-incoming.png"
  },
  "/img/screens/layouts-payments-recipients-dark.png": {
    "type": "image/png",
    "etag": "\"4fa12-Jf55CeWFzmyoFb6s4n/mWFrAdYU\"",
    "mtime": "2024-05-16T10:42:34.199Z",
    "size": 326162,
    "path": "../public/img/screens/layouts-payments-recipients-dark.png"
  },
  "/img/screens/layouts-payments-recipients.png": {
    "type": "image/png",
    "etag": "\"4c6a9-+saMxesBuRhGwmbT/NgkpfRQ7LQ\"",
    "mtime": "2024-05-16T10:42:30.233Z",
    "size": 313001,
    "path": "../public/img/screens/layouts-payments-recipients.png"
  },
  "/img/screens/layouts-payments.png": {
    "type": "image/png",
    "etag": "\"446d7-bBIpoA6q1t2HTUVS3BfZRun+k6Y\"",
    "mtime": "2024-05-16T10:42:30.382Z",
    "size": 280279,
    "path": "../public/img/screens/layouts-payments.png"
  },
  "/img/screens/layouts-placeload-1-dark.png": {
    "type": "image/png",
    "etag": "\"31a06-GLrnX1fKP/+eZZOfR0l9gSPBhkI\"",
    "mtime": "2024-05-16T10:42:35.176Z",
    "size": 203270,
    "path": "../public/img/screens/layouts-placeload-1-dark.png"
  },
  "/img/screens/layouts-placeload-1.png": {
    "type": "image/png",
    "etag": "\"27543-OosHPBu3/RYtYDDUDwVPMy63WMo\"",
    "mtime": "2024-05-16T10:42:33.306Z",
    "size": 161091,
    "path": "../public/img/screens/layouts-placeload-1.png"
  },
  "/img/screens/layouts-placeload-2-dark.png": {
    "type": "image/png",
    "etag": "\"307c1-c6LqsmQr4fIl2RWjrxTPPyyiLLU\"",
    "mtime": "2024-05-16T10:42:25.738Z",
    "size": 198593,
    "path": "../public/img/screens/layouts-placeload-2-dark.png"
  },
  "/img/screens/layouts-placeload-2.png": {
    "type": "image/png",
    "etag": "\"29ad4-VIVJdusDLsV3MyB9n3pG91LVQSg\"",
    "mtime": "2024-05-16T10:42:28.337Z",
    "size": 170708,
    "path": "../public/img/screens/layouts-placeload-2.png"
  },
  "/img/screens/layouts-placeload-3-dark.png": {
    "type": "image/png",
    "etag": "\"2e9eb-Qk9hmeeEciOYXn/ru9jCzzMmvxg\"",
    "mtime": "2024-05-16T10:42:31.800Z",
    "size": 190955,
    "path": "../public/img/screens/layouts-placeload-3-dark.png"
  },
  "/img/screens/layouts-placeload-3.png": {
    "type": "image/png",
    "etag": "\"28c00-G13crWNG/mcEU32+a+7BclvUasM\"",
    "mtime": "2024-05-16T10:42:30.989Z",
    "size": 166912,
    "path": "../public/img/screens/layouts-placeload-3.png"
  },
  "/img/screens/layouts-placeload-4-dark.png": {
    "type": "image/png",
    "etag": "\"3622c-vJ64OtIcL+73h8iDRXY2s63QobM\"",
    "mtime": "2024-05-16T10:42:35.660Z",
    "size": 221740,
    "path": "../public/img/screens/layouts-placeload-4-dark.png"
  },
  "/img/screens/layouts-placeload-4.png": {
    "type": "image/png",
    "etag": "\"29bec-YAijEMqk9bPl4G3SDwG2ohgZqlQ\"",
    "mtime": "2024-05-16T10:42:27.869Z",
    "size": 170988,
    "path": "../public/img/screens/layouts-placeload-4.png"
  },
  "/img/screens/layouts-projects-1-dark.png": {
    "type": "image/png",
    "etag": "\"82532-RrybvTJhoaq8AOG5refgC+Yp2Mo\"",
    "mtime": "2024-05-16T10:42:28.684Z",
    "size": 533810,
    "path": "../public/img/screens/layouts-projects-1-dark.png"
  },
  "/img/screens/layouts-projects-1.png": {
    "type": "image/png",
    "etag": "\"81bd7-psTiuN7dIa/A9s4I6boqy0tBUGk\"",
    "mtime": "2024-05-16T10:42:32.573Z",
    "size": 531415,
    "path": "../public/img/screens/layouts-projects-1.png"
  },
  "/img/screens/layouts-projects-2-dark.png": {
    "type": "image/png",
    "etag": "\"80f01-jx0lQ/j0Q1hvah4A0x1v9A7qFlM\"",
    "mtime": "2024-05-16T10:42:26.540Z",
    "size": 528129,
    "path": "../public/img/screens/layouts-projects-2-dark.png"
  },
  "/img/screens/layouts-projects-2.png": {
    "type": "image/png",
    "etag": "\"8000c-yd7x6HS8rey9e7k5SN4zVrrjqqI\"",
    "mtime": "2024-05-16T10:42:27.988Z",
    "size": 524300,
    "path": "../public/img/screens/layouts-projects-2.png"
  },
  "/img/screens/layouts-projects-3-dark.png": {
    "type": "image/png",
    "etag": "\"a8a07-JnbLbncMjXPjste1nFgebbckmGY\"",
    "mtime": "2024-05-16T10:42:26.135Z",
    "size": 690695,
    "path": "../public/img/screens/layouts-projects-3-dark.png"
  },
  "/img/screens/layouts-projects-3.png": {
    "type": "image/png",
    "etag": "\"a7b41-RUyHpdUZnc9l6X0w5NkfIV8u2xU\"",
    "mtime": "2024-05-16T10:42:27.007Z",
    "size": 686913,
    "path": "../public/img/screens/layouts-projects-3.png"
  },
  "/img/screens/layouts-projects-board-dark.png": {
    "type": "image/png",
    "etag": "\"41d0a-qkvJL6i775+V0+IgeUj+4SW7FJc\"",
    "mtime": "2024-05-16T10:42:34.494Z",
    "size": 269578,
    "path": "../public/img/screens/layouts-projects-board-dark.png"
  },
  "/img/screens/layouts-projects-board-hub-dark.png": {
    "type": "image/png",
    "etag": "\"3819f-fmK3K5hIXZiS5GSdr2ce8XNyVxQ\"",
    "mtime": "2024-05-16T10:42:31.140Z",
    "size": 229791,
    "path": "../public/img/screens/layouts-projects-board-hub-dark.png"
  },
  "/img/screens/layouts-projects-board-hub.png": {
    "type": "image/png",
    "etag": "\"37143-ptC+5r0HWmOwJOcgYuGMdqbFD8w\"",
    "mtime": "2024-05-16T10:42:26.827Z",
    "size": 225603,
    "path": "../public/img/screens/layouts-projects-board-hub.png"
  },
  "/img/screens/layouts-projects-board.png": {
    "type": "image/png",
    "etag": "\"408e2-jXUP2zzZGHfi4s+3yt3eyhNcRto\"",
    "mtime": "2024-05-16T10:42:35.481Z",
    "size": 264418,
    "path": "../public/img/screens/layouts-projects-board.png"
  },
  "/img/screens/layouts-projects-details-dark.png": {
    "type": "image/png",
    "etag": "\"5cc8e-XCONhvip1A8zIOWF4T/XDE8TUoA\"",
    "mtime": "2024-05-16T10:42:30.124Z",
    "size": 380046,
    "path": "../public/img/screens/layouts-projects-details-dark.png"
  },
  "/img/screens/layouts-projects-details-hub-dark.png": {
    "type": "image/png",
    "etag": "\"2f949-od1H0Z0F5oJEF8XfmCrX6hH2fKQ\"",
    "mtime": "2024-05-16T10:42:33.236Z",
    "size": 194889,
    "path": "../public/img/screens/layouts-projects-details-hub-dark.png"
  },
  "/img/screens/layouts-projects-details-hub.png": {
    "type": "image/png",
    "etag": "\"2ee6a-TL5/fsbbQHxNTzvKSgyN9GHoBz8\"",
    "mtime": "2024-05-16T10:42:36.040Z",
    "size": 192106,
    "path": "../public/img/screens/layouts-projects-details-hub.png"
  },
  "/img/screens/layouts-projects-details.png": {
    "type": "image/png",
    "etag": "\"5b413-+mrROO8f9A6kFqwEKlf554TDZQQ\"",
    "mtime": "2024-05-16T10:42:30.581Z",
    "size": 373779,
    "path": "../public/img/screens/layouts-projects-details.png"
  },
  "/img/screens/layouts-receive-dark.png": {
    "type": "image/png",
    "etag": "\"1dc01-ygldc3343v2qCgN54uaqQ54BDIU\"",
    "mtime": "2024-05-16T10:42:35.020Z",
    "size": 121857,
    "path": "../public/img/screens/layouts-receive-dark.png"
  },
  "/img/screens/layouts-receive-review-dark.png": {
    "type": "image/png",
    "etag": "\"23aea-Q5pBHVb65u3Yv6QdSEADphqlJZY\"",
    "mtime": "2024-05-16T10:42:36.532Z",
    "size": 146154,
    "path": "../public/img/screens/layouts-receive-review-dark.png"
  },
  "/img/screens/layouts-receive-review.png": {
    "type": "image/png",
    "etag": "\"23224-iSNgXvq931MCw1poHpfAlh/m+4g\"",
    "mtime": "2024-05-16T10:42:30.195Z",
    "size": 143908,
    "path": "../public/img/screens/layouts-receive-review.png"
  },
  "/img/screens/layouts-receive-transfer-dark.png": {
    "type": "image/png",
    "etag": "\"20426-GT13+frMwl17K4Yx0SWnQsfEhM8\"",
    "mtime": "2024-05-16T10:42:26.929Z",
    "size": 132134,
    "path": "../public/img/screens/layouts-receive-transfer-dark.png"
  },
  "/img/screens/layouts-receive-transfer.png": {
    "type": "image/png",
    "etag": "\"1fc1d-zYe3Bf4Loee0/GySjDnnFlRuGzk\"",
    "mtime": "2024-05-16T10:42:27.737Z",
    "size": 130077,
    "path": "../public/img/screens/layouts-receive-transfer.png"
  },
  "/img/screens/layouts-receive.png": {
    "type": "image/png",
    "etag": "\"1e22f-CORaZod2w4XG+C50A2609uqnOsM\"",
    "mtime": "2024-05-16T10:42:27.336Z",
    "size": 123439,
    "path": "../public/img/screens/layouts-receive.png"
  },
  "/img/screens/layouts-recipient-airbnb-dark.png": {
    "type": "image/png",
    "etag": "\"6218b-GHBUpG2wmQm4OwBRXNmQFKvu8Ec\"",
    "mtime": "2024-05-16T10:42:34.084Z",
    "size": 401803,
    "path": "../public/img/screens/layouts-recipient-airbnb-dark.png"
  },
  "/img/screens/layouts-recipient-airbnb.png": {
    "type": "image/png",
    "etag": "\"6022b-t97/pa01YwRPYdYy3rIIHmkMdPc\"",
    "mtime": "2024-05-16T10:42:36.199Z",
    "size": 393771,
    "path": "../public/img/screens/layouts-recipient-airbnb.png"
  },
  "/img/screens/layouts-recipient-jackie-strauss-dark.png": {
    "type": "image/png",
    "etag": "\"6638e-Vjie8j67hnLgOHZjF9xdhSPhg6s\"",
    "mtime": "2024-05-16T10:42:29.410Z",
    "size": 418702,
    "path": "../public/img/screens/layouts-recipient-jackie-strauss-dark.png"
  },
  "/img/screens/layouts-recipient-jackie-strauss.png": {
    "type": "image/png",
    "etag": "\"6400e-qNlueOPE8mgqui0mhikNzcUPRcc\"",
    "mtime": "2024-05-16T10:42:29.569Z",
    "size": 409614,
    "path": "../public/img/screens/layouts-recipient-jackie-strauss.png"
  },
  "/img/screens/layouts-send-address-dark.png": {
    "type": "image/png",
    "etag": "\"258ad-zMaeXy+C0cgWRFAcxL353kla+60\"",
    "mtime": "2024-05-16T10:42:33.161Z",
    "size": 153773,
    "path": "../public/img/screens/layouts-send-address-dark.png"
  },
  "/img/screens/layouts-send-address.png": {
    "type": "image/png",
    "etag": "\"23ed4-w77qkFRMNyrFUhJKnra0shDoWA0\"",
    "mtime": "2024-05-16T10:42:30.651Z",
    "size": 147156,
    "path": "../public/img/screens/layouts-send-address.png"
  },
  "/img/screens/layouts-send-amount-dark.png": {
    "type": "image/png",
    "etag": "\"1de97-UHQ43eIrrVEEtoWIGftlXIppEmQ\"",
    "mtime": "2024-05-16T10:42:33.969Z",
    "size": 122519,
    "path": "../public/img/screens/layouts-send-amount-dark.png"
  },
  "/img/screens/layouts-send-amount.png": {
    "type": "image/png",
    "etag": "\"1d3e1-ycLGB93HuCbpPfloxYn27I0C57w\"",
    "mtime": "2024-05-16T10:42:25.272Z",
    "size": 119777,
    "path": "../public/img/screens/layouts-send-amount.png"
  },
  "/img/screens/layouts-send-dark.png": {
    "type": "image/png",
    "etag": "\"17fbe-Hy7e3nGP4ZEPiNTjZW5A3TWBRj0\"",
    "mtime": "2024-05-16T10:42:32.325Z",
    "size": 98238,
    "path": "../public/img/screens/layouts-send-dark.png"
  },
  "/img/screens/layouts-send-method-dark.png": {
    "type": "image/png",
    "etag": "\"20e3d-K9jyoFIQdFoxX2I7thPRdTLhfLw\"",
    "mtime": "2024-05-16T10:42:26.168Z",
    "size": 134717,
    "path": "../public/img/screens/layouts-send-method-dark.png"
  },
  "/img/screens/layouts-send-method.png": {
    "type": "image/png",
    "etag": "\"2131d-CjxaZpgVqKEC0t35xaWVhBoz4uM\"",
    "mtime": "2024-05-16T10:42:27.801Z",
    "size": 135965,
    "path": "../public/img/screens/layouts-send-method.png"
  },
  "/img/screens/layouts-send-recipient-dark.png": {
    "type": "image/png",
    "etag": "\"1d7c9-EDc/v4mfHt0AqxKJUdcTk6xcU+s\"",
    "mtime": "2024-05-16T10:42:35.446Z",
    "size": 120777,
    "path": "../public/img/screens/layouts-send-recipient-dark.png"
  },
  "/img/screens/layouts-send-recipient.png": {
    "type": "image/png",
    "etag": "\"1c827-e4KKb2EOe2JrEeu9ldgK/pHInzg\"",
    "mtime": "2024-05-16T10:42:35.247Z",
    "size": 116775,
    "path": "../public/img/screens/layouts-send-recipient.png"
  },
  "/img/screens/layouts-send-review-dark.png": {
    "type": "image/png",
    "etag": "\"25b77-3DJmqmmWXuAlVEmIPQMh1De4OUw\"",
    "mtime": "2024-05-16T10:42:31.990Z",
    "size": 154487,
    "path": "../public/img/screens/layouts-send-review-dark.png"
  },
  "/img/screens/layouts-send-review.png": {
    "type": "image/png",
    "etag": "\"24d0f-ToByl9Etbob9DUHCAeyf+XrF0HM\"",
    "mtime": "2024-05-16T10:42:27.447Z",
    "size": 150799,
    "path": "../public/img/screens/layouts-send-review.png"
  },
  "/img/screens/layouts-send.png": {
    "type": "image/png",
    "etag": "\"17775-+W55Hb4m9uJdYuPdZGvqysQULSk\"",
    "mtime": "2024-05-16T10:42:31.653Z",
    "size": 96117,
    "path": "../public/img/screens/layouts-send.png"
  },
  "/img/screens/layouts-settings-dark.png": {
    "type": "image/png",
    "etag": "\"26263-BgJwKYrUKXxi57hiyrKc6Ao7uQU\"",
    "mtime": "2024-05-16T10:42:34.745Z",
    "size": 156259,
    "path": "../public/img/screens/layouts-settings-dark.png"
  },
  "/img/screens/layouts-settings-notifications-dark.png": {
    "type": "image/png",
    "etag": "\"2a231-ICcL8IjhcPODhhtS4fPd1kdasyU\"",
    "mtime": "2024-05-16T10:42:34.863Z",
    "size": 172593,
    "path": "../public/img/screens/layouts-settings-notifications-dark.png"
  },
  "/img/screens/layouts-settings-notifications.png": {
    "type": "image/png",
    "etag": "\"29b38-V1+LcH2b9pM5HPsTFkmzhJsOuVk\"",
    "mtime": "2024-05-16T10:42:34.673Z",
    "size": 170808,
    "path": "../public/img/screens/layouts-settings-notifications.png"
  },
  "/img/screens/layouts-settings-security-dark.png": {
    "type": "image/png",
    "etag": "\"294cc-0xi5JP8DGxCdzmnHgr1AbEqe13A\"",
    "mtime": "2024-05-16T10:42:29.725Z",
    "size": 169164,
    "path": "../public/img/screens/layouts-settings-security-dark.png"
  },
  "/img/screens/layouts-settings-security.png": {
    "type": "image/png",
    "etag": "\"288a0-uDWal6sNlR55cKVBarCefZOz4XY\"",
    "mtime": "2024-05-16T10:42:32.135Z",
    "size": 166048,
    "path": "../public/img/screens/layouts-settings-security.png"
  },
  "/img/screens/layouts-settings-tokens-dark.png": {
    "type": "image/png",
    "etag": "\"164a6-vKKT0s/EjvaQGqktSaJUAvfpzxI\"",
    "mtime": "2024-05-16T10:42:32.647Z",
    "size": 91302,
    "path": "../public/img/screens/layouts-settings-tokens-dark.png"
  },
  "/img/screens/layouts-settings-tokens.png": {
    "type": "image/png",
    "etag": "\"1685d-2h6kDB8IXdivApN9nW+jGfW7w58\"",
    "mtime": "2024-05-16T10:42:36.234Z",
    "size": 92253,
    "path": "../public/img/screens/layouts-settings-tokens.png"
  },
  "/img/screens/layouts-settings.png": {
    "type": "image/png",
    "etag": "\"25a57-Mx5quOtkE594LXCbttkqHSuo7Yk\"",
    "mtime": "2024-05-16T10:42:31.475Z",
    "size": 154199,
    "path": "../public/img/screens/layouts-settings.png"
  },
  "/img/screens/layouts-subpages-action-1-dark.png": {
    "type": "image/png",
    "etag": "\"316d3-8Y1+wt6J/l1IC+3H5akzpBPyYO4\"",
    "mtime": "2024-05-16T10:42:26.203Z",
    "size": 202451,
    "path": "../public/img/screens/layouts-subpages-action-1-dark.png"
  },
  "/img/screens/layouts-subpages-action-1.png": {
    "type": "image/png",
    "etag": "\"31ae7-c6G01slxBxOeRTnByBcpOf2T170\"",
    "mtime": "2024-05-16T10:42:27.486Z",
    "size": 203495,
    "path": "../public/img/screens/layouts-subpages-action-1.png"
  },
  "/img/screens/layouts-subpages-action-2-dark.png": {
    "type": "image/png",
    "etag": "\"3d4e3-T6Mx/OXW82jrZStQkuVu7ycazbM\"",
    "mtime": "2024-05-16T10:42:34.234Z",
    "size": 251107,
    "path": "../public/img/screens/layouts-subpages-action-2-dark.png"
  },
  "/img/screens/layouts-subpages-action-2.png": {
    "type": "image/png",
    "etag": "\"3f664-5upeaFwufj/q8us4cX9YxJyHhSw\"",
    "mtime": "2024-05-16T10:42:30.270Z",
    "size": 259684,
    "path": "../public/img/screens/layouts-subpages-action-2.png"
  },
  "/img/screens/layouts-subpages-billing-dark.png": {
    "type": "image/png",
    "etag": "\"48d12-L1Za38qDzvzO/2d78ItpDQAhVow\"",
    "mtime": "2024-05-16T10:42:30.725Z",
    "size": 298258,
    "path": "../public/img/screens/layouts-subpages-billing-dark.png"
  },
  "/img/screens/layouts-subpages-billing.png": {
    "type": "image/png",
    "etag": "\"482c1-P7cKDs811u+r+ZoI6QE6JJ1QRpM\"",
    "mtime": "2024-05-16T10:42:26.727Z",
    "size": 295617,
    "path": "../public/img/screens/layouts-subpages-billing.png"
  },
  "/img/screens/layouts-subpages-notifications-dark.png": {
    "type": "image/png",
    "etag": "\"49be1-RFC+aZfbuMU1HVUgC5aCQwFZOGA\"",
    "mtime": "2024-05-16T10:42:31.840Z",
    "size": 302049,
    "path": "../public/img/screens/layouts-subpages-notifications-dark.png"
  },
  "/img/screens/layouts-subpages-notifications.png": {
    "type": "image/png",
    "etag": "\"48ec9-JSzw2bymyyn8cGI7b4qPcOP97G4\"",
    "mtime": "2024-05-16T10:42:25.638Z",
    "size": 298697,
    "path": "../public/img/screens/layouts-subpages-notifications.png"
  },
  "/img/screens/layouts-subpages-profile-dark.png": {
    "type": "image/png",
    "etag": "\"48f7b-90DQ+Ms9FTnV6fZS0s8O+bicnIU\"",
    "mtime": "2024-05-16T10:42:29.928Z",
    "size": 298875,
    "path": "../public/img/screens/layouts-subpages-profile-dark.png"
  },
  "/img/screens/layouts-subpages-profile-edit-1-dark.png": {
    "type": "image/png",
    "etag": "\"342a7-FdOcg/uFhNvMDjrvFGBRmQBxvjc\"",
    "mtime": "2024-05-16T10:42:26.500Z",
    "size": 213671,
    "path": "../public/img/screens/layouts-subpages-profile-edit-1-dark.png"
  },
  "/img/screens/layouts-subpages-profile-edit-1.png": {
    "type": "image/png",
    "etag": "\"32624-tlKAHarewAaHDCca49M0TMv0Mos\"",
    "mtime": "2024-05-16T10:42:26.759Z",
    "size": 206372,
    "path": "../public/img/screens/layouts-subpages-profile-edit-1.png"
  },
  "/img/screens/layouts-subpages-profile-edit-2-dark.png": {
    "type": "image/png",
    "etag": "\"3ce54-1mnHCFYrDevmH/+QLefDWV1/raQ\"",
    "mtime": "2024-05-16T10:42:26.896Z",
    "size": 249428,
    "path": "../public/img/screens/layouts-subpages-profile-edit-2-dark.png"
  },
  "/img/screens/layouts-subpages-profile-edit-2.png": {
    "type": "image/png",
    "etag": "\"3a740-evvUY3bscN+qvXPBLvnmezDX/5k\"",
    "mtime": "2024-05-16T10:42:31.915Z",
    "size": 239424,
    "path": "../public/img/screens/layouts-subpages-profile-edit-2.png"
  },
  "/img/screens/layouts-subpages-profile-edit-3-dark.png": {
    "type": "image/png",
    "etag": "\"36f78-R5kzVvOCMAwX5iAsR/SL6g3TvFg\"",
    "mtime": "2024-05-16T10:42:29.049Z",
    "size": 225144,
    "path": "../public/img/screens/layouts-subpages-profile-edit-3-dark.png"
  },
  "/img/screens/layouts-subpages-profile-edit-3.png": {
    "type": "image/png",
    "etag": "\"35847-vrtcQPe4s/m1TkI9Fh+p45I6rVU\"",
    "mtime": "2024-05-16T10:42:28.104Z",
    "size": 219207,
    "path": "../public/img/screens/layouts-subpages-profile-edit-3.png"
  },
  "/img/screens/layouts-subpages-profile-edit-4-dark.png": {
    "type": "image/png",
    "etag": "\"386b1-KXdw9e4GzvlUi0jX6qa2sKNEJ+g\"",
    "mtime": "2024-05-16T10:42:35.917Z",
    "size": 231089,
    "path": "../public/img/screens/layouts-subpages-profile-edit-4-dark.png"
  },
  "/img/screens/layouts-subpages-profile-edit-4.png": {
    "type": "image/png",
    "etag": "\"37460-wDreN/Jyg+JJ2e57eB1FwjTfAJ0\"",
    "mtime": "2024-05-16T10:42:29.119Z",
    "size": 226400,
    "path": "../public/img/screens/layouts-subpages-profile-edit-4.png"
  },
  "/img/screens/layouts-subpages-profile.png": {
    "type": "image/png",
    "etag": "\"47522-G6YahgnQ+B3CozAR4Cmm8iWapWM\"",
    "mtime": "2024-05-16T10:42:28.495Z",
    "size": 292130,
    "path": "../public/img/screens/layouts-subpages-profile.png"
  },
  "/img/screens/layouts-subpages-search-empty-dark.png": {
    "type": "image/png",
    "etag": "\"3108d-F21AT7Rh2Nhv/x7XpLJhSVhNCw4\"",
    "mtime": "2024-05-16T10:42:26.861Z",
    "size": 200845,
    "path": "../public/img/screens/layouts-subpages-search-empty-dark.png"
  },
  "/img/screens/layouts-subpages-search-empty.png": {
    "type": "image/png",
    "etag": "\"30986-Ij87jDagCPMUNluJEv9bT2TJFn0\"",
    "mtime": "2024-05-16T10:42:35.380Z",
    "size": 199046,
    "path": "../public/img/screens/layouts-subpages-search-empty.png"
  },
  "/img/screens/layouts-subpages-search-results-dark.png": {
    "type": "image/png",
    "etag": "\"3ee22-5OumTL63QgzbCT2sn/+0yPqKiMg\"",
    "mtime": "2024-05-16T10:42:32.289Z",
    "size": 257570,
    "path": "../public/img/screens/layouts-subpages-search-results-dark.png"
  },
  "/img/screens/layouts-subpages-search-results.png": {
    "type": "image/png",
    "etag": "\"3dc19-ugc9yM/iediW1HvDYppW84d1RMc\"",
    "mtime": "2024-05-16T10:42:35.347Z",
    "size": 252953,
    "path": "../public/img/screens/layouts-subpages-search-results.png"
  },
  "/img/screens/layouts-subpages-settings-dark.png": {
    "type": "image/png",
    "etag": "\"363bd-qO/JaS6uxfLOAcGMEK/NUd1WsiE\"",
    "mtime": "2024-05-16T10:42:36.397Z",
    "size": 222141,
    "path": "../public/img/screens/layouts-subpages-settings-dark.png"
  },
  "/img/screens/layouts-subpages-settings.png": {
    "type": "image/png",
    "etag": "\"34d90-Yr2dACgz4ftClYoUa5GMQEP091w\"",
    "mtime": "2024-05-16T10:42:33.378Z",
    "size": 216464,
    "path": "../public/img/screens/layouts-subpages-settings.png"
  },
  "/img/screens/layouts-table-list-1-dark.png": {
    "type": "image/png",
    "etag": "\"43f4a-wU/sH7nNK9uOoVZugTrBnyRx+FU\"",
    "mtime": "2024-05-16T10:42:30.954Z",
    "size": 278346,
    "path": "../public/img/screens/layouts-table-list-1-dark.png"
  },
  "/img/screens/layouts-table-list-1.png": {
    "type": "image/png",
    "etag": "\"4392b-60jcEnPXWgDIcXEsc5brbfmw2JU\"",
    "mtime": "2024-05-16T10:42:28.534Z",
    "size": 276779,
    "path": "../public/img/screens/layouts-table-list-1.png"
  },
  "/img/screens/layouts-table-list-2-dark.png": {
    "type": "image/png",
    "etag": "\"311fe-eepCYhH8NLgBv2JgrFVHWKmbZUU\"",
    "mtime": "2024-05-16T10:42:33.720Z",
    "size": 201214,
    "path": "../public/img/screens/layouts-table-list-2-dark.png"
  },
  "/img/screens/layouts-table-list-2.png": {
    "type": "image/png",
    "etag": "\"30c2a-/LK4dIIkqbkybHT9D/Sdino6wjg\"",
    "mtime": "2024-05-16T10:42:31.363Z",
    "size": 199722,
    "path": "../public/img/screens/layouts-table-list-2.png"
  },
  "/img/screens/layouts-table-list-3-dark.png": {
    "type": "image/png",
    "etag": "\"3ffda-SjIBdc5UiCckdyb3ear3X00iXww\"",
    "mtime": "2024-05-16T10:42:27.200Z",
    "size": 262106,
    "path": "../public/img/screens/layouts-table-list-3-dark.png"
  },
  "/img/screens/layouts-table-list-3.png": {
    "type": "image/png",
    "etag": "\"411eb-Yi90BXL+beMKIYBDLKsBoF52HrU\"",
    "mtime": "2024-05-16T10:42:25.098Z",
    "size": 266731,
    "path": "../public/img/screens/layouts-table-list-3.png"
  },
  "/img/screens/layouts-tile-grid-1-dark.png": {
    "type": "image/png",
    "etag": "\"487f8-VTVErGvTGx9QEW+TfDLsO+bpvVM\"",
    "mtime": "2024-05-16T10:42:32.825Z",
    "size": 296952,
    "path": "../public/img/screens/layouts-tile-grid-1-dark.png"
  },
  "/img/screens/layouts-tile-grid-1.png": {
    "type": "image/png",
    "etag": "\"47361-B8z1LdIOY83skW30pgxhji+nkHc\"",
    "mtime": "2024-05-16T10:42:33.415Z",
    "size": 291681,
    "path": "../public/img/screens/layouts-tile-grid-1.png"
  },
  "/img/screens/layouts-tile-grid-2-dark.png": {
    "type": "image/png",
    "etag": "\"41540-ns609zSOZEcJgoQGVy3uRr+DQpM\"",
    "mtime": "2024-05-16T10:42:26.309Z",
    "size": 267584,
    "path": "../public/img/screens/layouts-tile-grid-2-dark.png"
  },
  "/img/screens/layouts-tile-grid-2.png": {
    "type": "image/png",
    "etag": "\"3f9d0-m6wlkXoARhyQVA/15w4xMDD69i8\"",
    "mtime": "2024-05-16T10:42:33.008Z",
    "size": 260560,
    "path": "../public/img/screens/layouts-tile-grid-2.png"
  },
  "/img/screens/layouts-tile-grid-3-dark.png": {
    "type": "image/png",
    "etag": "\"38783-Tr1Q3H3dZu4l3Jf1M925q92sQso\"",
    "mtime": "2024-05-16T10:42:25.423Z",
    "size": 231299,
    "path": "../public/img/screens/layouts-tile-grid-3-dark.png"
  },
  "/img/screens/layouts-tile-grid-3.png": {
    "type": "image/png",
    "etag": "\"37a4a-k3z5H1DXLObYrWJVVVLelTkCKko\"",
    "mtime": "2024-05-16T10:42:34.825Z",
    "size": 227914,
    "path": "../public/img/screens/layouts-tile-grid-3.png"
  },
  "/img/screens/layouts-transactions-dark.png": {
    "type": "image/png",
    "etag": "\"60a96-g6+IBakCIHfZeBueSkOc3HEZhdg\"",
    "mtime": "2024-05-16T10:42:32.720Z",
    "size": 395926,
    "path": "../public/img/screens/layouts-transactions-dark.png"
  },
  "/img/screens/layouts-transactions.png": {
    "type": "image/png",
    "etag": "\"5cf73-b5i2PE7iym+TUhrAoZbQpLmuUxA\"",
    "mtime": "2024-05-16T10:42:31.255Z",
    "size": 380787,
    "path": "../public/img/screens/layouts-transactions.png"
  },
  "/img/screens/layouts-user-dark.png": {
    "type": "image/png",
    "etag": "\"401e6-FCJaDJgy5zoyg4QnUNlVUCw9lnA\"",
    "mtime": "2024-05-16T10:42:32.612Z",
    "size": 262630,
    "path": "../public/img/screens/layouts-user-dark.png"
  },
  "/img/screens/layouts-user-edit-dark.png": {
    "type": "image/png",
    "etag": "\"3ba5c-mrDzXqRAK72xtplnFvg/zUzqz/w\"",
    "mtime": "2024-05-16T10:42:33.272Z",
    "size": 244316,
    "path": "../public/img/screens/layouts-user-edit-dark.png"
  },
  "/img/screens/layouts-user-edit.png": {
    "type": "image/png",
    "etag": "\"38d2a-SFncakTf/WwI5OnNJxh8TOqVcCo\"",
    "mtime": "2024-05-16T10:42:26.422Z",
    "size": 232746,
    "path": "../public/img/screens/layouts-user-edit.png"
  },
  "/img/screens/layouts-user-grid-1-dark.png": {
    "type": "image/png",
    "etag": "\"4e4a7-eGqfkL4UQG1IwljcjPZ42ifOzGE\"",
    "mtime": "2024-05-16T10:42:32.029Z",
    "size": 320679,
    "path": "../public/img/screens/layouts-user-grid-1-dark.png"
  },
  "/img/screens/layouts-user-grid-1.png": {
    "type": "image/png",
    "etag": "\"4d3de-xX4UP8TZAWr5JwE6gZ1pEBEqbvM\"",
    "mtime": "2024-05-16T10:42:28.720Z",
    "size": 316382,
    "path": "../public/img/screens/layouts-user-grid-1.png"
  },
  "/img/screens/layouts-user-grid-2-dark.png": {
    "type": "image/png",
    "etag": "\"4c03c-XFGksg71s1tIJNJD2QUPVQFSxqw\"",
    "mtime": "2024-05-16T10:42:32.900Z",
    "size": 311356,
    "path": "../public/img/screens/layouts-user-grid-2-dark.png"
  },
  "/img/screens/layouts-user-grid-2.png": {
    "type": "image/png",
    "etag": "\"4aab3-CK5JtApFKiM+C7gGyjHOCsOCun8\"",
    "mtime": "2024-05-16T10:42:34.985Z",
    "size": 305843,
    "path": "../public/img/screens/layouts-user-grid-2.png"
  },
  "/img/screens/layouts-user-grid-3-dark.png": {
    "type": "image/png",
    "etag": "\"4e45e-6BVIHecI4U9ackk0tjAd0nRRuns\"",
    "mtime": "2024-05-16T10:42:30.801Z",
    "size": 320606,
    "path": "../public/img/screens/layouts-user-grid-3-dark.png"
  },
  "/img/screens/layouts-user-grid-3.png": {
    "type": "image/png",
    "etag": "\"4c724-OJ8faKfZcIXCq5YPl+3NUo3XguQ\"",
    "mtime": "2024-05-16T10:42:26.349Z",
    "size": 313124,
    "path": "../public/img/screens/layouts-user-grid-3.png"
  },
  "/img/screens/layouts-user-grid-4-dark.png": {
    "type": "image/png",
    "etag": "\"4cf04-jhMpOeD7SQK0sebY+tRtAMbtaLQ\"",
    "mtime": "2024-05-16T10:42:31.582Z",
    "size": 315140,
    "path": "../public/img/screens/layouts-user-grid-4-dark.png"
  },
  "/img/screens/layouts-user-grid-4.png": {
    "type": "image/png",
    "etag": "\"4b05d-3v9TKekpbiV79VJvgaW01Fpb8B4\"",
    "mtime": "2024-05-16T10:42:29.489Z",
    "size": 307293,
    "path": "../public/img/screens/layouts-user-grid-4.png"
  },
  "/img/screens/layouts-user.png": {
    "type": "image/png",
    "etag": "\"3e927-cDHa6jExw+0PHNVYr9Lc14W2bXc\"",
    "mtime": "2024-05-16T10:42:33.452Z",
    "size": 256295,
    "path": "../public/img/screens/layouts-user.png"
  },
  "/img/screens/layouts-utility-confirm-dark.png": {
    "type": "image/png",
    "etag": "\"2a9b7-iN7mJe12F919tS+TC7pAh0oFeLI\"",
    "mtime": "2024-05-16T10:42:29.290Z",
    "size": 174519,
    "path": "../public/img/screens/layouts-utility-confirm-dark.png"
  },
  "/img/screens/layouts-utility-confirm.png": {
    "type": "image/png",
    "etag": "\"2a20b-SnOAIbfLPUAnvN5clsfzRWebGBs\"",
    "mtime": "2024-05-16T10:42:32.064Z",
    "size": 172555,
    "path": "../public/img/screens/layouts-utility-confirm.png"
  },
  "/img/screens/layouts-utility-error-dark.png": {
    "type": "image/png",
    "etag": "\"3579d-RLLFp6rUYBz9ddrH94QBWk2uKQg\"",
    "mtime": "2024-05-16T10:42:30.507Z",
    "size": 219037,
    "path": "../public/img/screens/layouts-utility-error-dark.png"
  },
  "/img/screens/layouts-utility-error.png": {
    "type": "image/png",
    "etag": "\"354d8-Hy+Y/tBGojlnOHaEtiaz15U5cYs\"",
    "mtime": "2024-05-16T10:42:32.401Z",
    "size": 218328,
    "path": "../public/img/screens/layouts-utility-error.png"
  },
  "/img/screens/layouts-utility-invoice-2-dark.png": {
    "type": "image/png",
    "etag": "\"5cbab-nnk67HI1nMqGD4eBJWgZTejlsvk\"",
    "mtime": "2024-05-16T10:42:28.416Z",
    "size": 379819,
    "path": "../public/img/screens/layouts-utility-invoice-2-dark.png"
  },
  "/img/screens/layouts-utility-invoice-2.png": {
    "type": "image/png",
    "etag": "\"5a387-IPNXPqXX1hh3/Me10QmAr2eyY9Q\"",
    "mtime": "2024-05-16T10:42:33.933Z",
    "size": 369543,
    "path": "../public/img/screens/layouts-utility-invoice-2.png"
  },
  "/img/screens/layouts-utility-invoice-dark.png": {
    "type": "image/png",
    "etag": "\"34cc1-D1M5h6Gm1wOjuUxr/0aesnAIMYs\"",
    "mtime": "2024-05-16T10:42:25.705Z",
    "size": 216257,
    "path": "../public/img/screens/layouts-utility-invoice-dark.png"
  },
  "/img/screens/layouts-utility-invoice.png": {
    "type": "image/png",
    "etag": "\"34110-xTf4RAo3gAr0NIGueJWV+c/BJvY\"",
    "mtime": "2024-05-16T10:42:27.412Z",
    "size": 213264,
    "path": "../public/img/screens/layouts-utility-invoice.png"
  },
  "/img/screens/layouts-utility-promotion-dark.png": {
    "type": "image/png",
    "etag": "\"3a5a9-7dGG9ddpLh1vXzPFgjygORQwxrE\"",
    "mtime": "2024-05-16T10:42:28.757Z",
    "size": 239017,
    "path": "../public/img/screens/layouts-utility-promotion-dark.png"
  },
  "/img/screens/layouts-utility-promotion.png": {
    "type": "image/png",
    "etag": "\"3bbb6-LCk8RH5RxYzlrtOuHDas1qiIIsY\"",
    "mtime": "2024-05-16T10:42:31.727Z",
    "size": 244662,
    "path": "../public/img/screens/layouts-utility-promotion.png"
  },
  "/img/screens/layouts-utility-status-dark.png": {
    "type": "image/png",
    "etag": "\"1c0bf-BD8k+g4tixValJDC4+J7Rjk9mmk\"",
    "mtime": "2024-05-16T10:42:32.362Z",
    "size": 114879,
    "path": "../public/img/screens/layouts-utility-status-dark.png"
  },
  "/img/screens/layouts-utility-status.png": {
    "type": "image/png",
    "etag": "\"1bdff-cZjX6vLf4WIRxbgdRbZf6NDeTiE\"",
    "mtime": "2024-05-16T10:42:32.933Z",
    "size": 114175,
    "path": "../public/img/screens/layouts-utility-status.png"
  },
  "/img/screens/layouts-vault-dark.png": {
    "type": "image/png",
    "etag": "\"7c14c-OueFCImCBvL/EuSOg6wd3RD9DKk\"",
    "mtime": "2024-05-16T10:42:34.599Z",
    "size": 508236,
    "path": "../public/img/screens/layouts-vault-dark.png"
  },
  "/img/screens/layouts-vault.png": {
    "type": "image/png",
    "etag": "\"79b01-IbQsyEIs+jDN8ltGOsMa/H2QJS0\"",
    "mtime": "2024-05-16T10:42:35.521Z",
    "size": 498433,
    "path": "../public/img/screens/layouts-vault.png"
  },
  "/img/screens/wizard-1-dark.png": {
    "type": "image/png",
    "etag": "\"2cb45-LMPfnusIKaGK7kHivOYl7fKAI/o\"",
    "mtime": "2024-05-16T10:42:28.373Z",
    "size": 183109,
    "path": "../public/img/screens/wizard-1-dark.png"
  },
  "/img/screens/wizard-1.png": {
    "type": "image/png",
    "etag": "\"2c6b7-HNY5bsuZ8uNUPhMzN8Xe+NhUBu8\"",
    "mtime": "2024-05-16T10:42:27.631Z",
    "size": 181943,
    "path": "../public/img/screens/wizard-1.png"
  },
  "/img/screens/wizard-2-dark.png": {
    "type": "image/png",
    "etag": "\"1cb13-nQqR+KBSTzzxV6nbwnoyEyoWlus\"",
    "mtime": "2024-05-16T10:42:32.681Z",
    "size": 117523,
    "path": "../public/img/screens/wizard-2-dark.png"
  },
  "/img/screens/wizard-2.png": {
    "type": "image/png",
    "etag": "\"1db7e-o5dzNpaUCeDScz31SztLTYsxDRM\"",
    "mtime": "2024-05-16T10:42:31.546Z",
    "size": 121726,
    "path": "../public/img/screens/wizard-2.png"
  },
  "/img/screens/wizard-3-dark.png": {
    "type": "image/png",
    "etag": "\"1e422-lDjF0jJ5+82CplEMkTDe4xR9Ab0\"",
    "mtime": "2024-05-16T10:42:35.626Z",
    "size": 123938,
    "path": "../public/img/screens/wizard-3-dark.png"
  },
  "/img/screens/wizard-3.png": {
    "type": "image/png",
    "etag": "\"1eee4-klXxrFLd0Grxm+rdYSFZWMzKF20\"",
    "mtime": "2024-05-16T10:42:35.278Z",
    "size": 126692,
    "path": "../public/img/screens/wizard-3.png"
  },
  "/img/screens/wizard-4-dark.png": {
    "type": "image/png",
    "etag": "\"185ac-XXZZ828QTAzsMTdd8p5t7FGAG0o\"",
    "mtime": "2024-05-16T10:42:31.953Z",
    "size": 99756,
    "path": "../public/img/screens/wizard-4-dark.png"
  },
  "/img/screens/wizard-4.png": {
    "type": "image/png",
    "etag": "\"19391-5g/B6rhmbxrxWUEbLfzJE6aDXW4\"",
    "mtime": "2024-05-16T10:42:25.953Z",
    "size": 103313,
    "path": "../public/img/screens/wizard-4.png"
  },
  "/img/screens/wizard-5-dark.png": {
    "type": "image/png",
    "etag": "\"1f932-vLzl99FI64/PH0h6p8lBLsLL4bo\"",
    "mtime": "2024-05-16T10:42:29.324Z",
    "size": 129330,
    "path": "../public/img/screens/wizard-5-dark.png"
  },
  "/img/screens/wizard-5.png": {
    "type": "image/png",
    "etag": "\"20533-qW8EJniq+38p3BB4XUQUr4/mfes\"",
    "mtime": "2024-05-16T10:42:34.558Z",
    "size": 132403,
    "path": "../public/img/screens/wizard-5.png"
  },
  "/img/screens/wizard-6-dark.png": {
    "type": "image/png",
    "etag": "\"26a2a-dMRCNiVn56wcc2cg7p+CsBdAoVs\"",
    "mtime": "2024-05-16T10:42:35.693Z",
    "size": 158250,
    "path": "../public/img/screens/wizard-6-dark.png"
  },
  "/img/screens/wizard-6.png": {
    "type": "image/png",
    "etag": "\"2ad85-akyiIXWcGBkJ7ZAEHHDlb+gMkKQ\"",
    "mtime": "2024-05-16T10:42:33.528Z",
    "size": 175493,
    "path": "../public/img/screens/wizard-6.png"
  },
  "/img/screens/wizard-7-dark.png": {
    "type": "image/png",
    "etag": "\"256f3-0M8TD6sdZX/mN3VqUuTQc+IMWUg\"",
    "mtime": "2024-05-16T10:42:31.290Z",
    "size": 153331,
    "path": "../public/img/screens/wizard-7-dark.png"
  },
  "/img/screens/wizard-7.png": {
    "type": "image/png",
    "etag": "\"26247-P+IP3QloPdqiQCKEI4yUw5DTg48\"",
    "mtime": "2024-05-16T10:42:35.413Z",
    "size": 156231,
    "path": "../public/img/screens/wizard-7.png"
  },
  "/img/ux/1.jpg": {
    "type": "image/jpeg",
    "etag": "\"7e37-dGdEtvvUeLkxJOGtGF5Cpns1Ox8\"",
    "mtime": "2024-05-16T10:42:42.434Z",
    "size": 32311,
    "path": "../public/img/ux/1.jpg"
  },
  "/img/ux/1.png": {
    "type": "image/png",
    "etag": "\"229c9-GRxvvZWtKyCgQi1v6lHZ/azmz0E\"",
    "mtime": "2024-05-16T10:42:42.297Z",
    "size": 141769,
    "path": "../public/img/ux/1.png"
  },
  "/img/ux/10.png": {
    "type": "image/png",
    "etag": "\"5851f-MlPwC6+5zY7b+YorRzNK8W7Dpzs\"",
    "mtime": "2024-05-16T10:42:42.124Z",
    "size": 361759,
    "path": "../public/img/ux/10.png"
  },
  "/img/ux/11.png": {
    "type": "image/png",
    "etag": "\"25c5f-DhuXCm4EIW5Um5KboNMxRqEHFxA\"",
    "mtime": "2024-05-16T10:42:42.157Z",
    "size": 154719,
    "path": "../public/img/ux/11.png"
  },
  "/img/ux/12.jpg": {
    "type": "image/jpeg",
    "etag": "\"70c5-2Nl9Y/Ju8PLYZSdn6ytBW2vmrDY\"",
    "mtime": "2024-05-16T10:42:42.499Z",
    "size": 28869,
    "path": "../public/img/ux/12.jpg"
  },
  "/img/ux/13.png": {
    "type": "image/png",
    "etag": "\"2e11b-m75LXHOyQqu+p+g2eW2Vl6dTKPo\"",
    "mtime": "2024-05-16T10:42:42.679Z",
    "size": 188699,
    "path": "../public/img/ux/13.png"
  },
  "/img/ux/14.jpg": {
    "type": "image/jpeg",
    "etag": "\"246b7-KsgntYO/x3jF5AXdqCX4h3pMuYs\"",
    "mtime": "2024-05-16T10:42:42.535Z",
    "size": 149175,
    "path": "../public/img/ux/14.jpg"
  },
  "/img/ux/15.png": {
    "type": "image/png",
    "etag": "\"2e8f1-laJGEUQbLDB0Ap0nLtTWeZE+4EY\"",
    "mtime": "2024-05-16T10:42:42.365Z",
    "size": 190705,
    "path": "../public/img/ux/15.png"
  },
  "/img/ux/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"13735-72KYSQBWjdU/0NsxFhcZ9k5ix2U\"",
    "mtime": "2024-05-16T10:42:42.573Z",
    "size": 79669,
    "path": "../public/img/ux/2.jpg"
  },
  "/img/ux/2.png": {
    "type": "image/png",
    "etag": "\"46eef-2WzwOu+Mc5nWhrq6ceCFWkdj3qw\"",
    "mtime": "2024-05-16T10:42:42.264Z",
    "size": 290543,
    "path": "../public/img/ux/2.png"
  },
  "/img/ux/3.png": {
    "type": "image/png",
    "etag": "\"211f3-WPBCqV2K7NZJsWc7VcWrIJLjjqs\"",
    "mtime": "2024-05-16T10:42:42.605Z",
    "size": 135667,
    "path": "../public/img/ux/3.png"
  },
  "/img/ux/4.png": {
    "type": "image/png",
    "etag": "\"30da1-0li68502ypDc4tnT0AWv83BVaR0\"",
    "mtime": "2024-05-16T10:42:42.192Z",
    "size": 200097,
    "path": "../public/img/ux/4.png"
  },
  "/img/ux/5.png": {
    "type": "image/png",
    "etag": "\"a35a3-39vd1qu7TPkq5NqqcGDVT1RJNJk\"",
    "mtime": "2024-05-16T10:42:42.647Z",
    "size": 669091,
    "path": "../public/img/ux/5.png"
  },
  "/img/ux/6.png": {
    "type": "image/png",
    "etag": "\"2f3e2-REGc8IgZTlYyCER+pBMOawHxj/s\"",
    "mtime": "2024-05-16T10:42:42.402Z",
    "size": 193506,
    "path": "../public/img/ux/6.png"
  },
  "/img/ux/7.png": {
    "type": "image/png",
    "etag": "\"1fb3a-XcxZhVtin5JZHoubkoa8al2veBs\"",
    "mtime": "2024-05-16T10:42:42.332Z",
    "size": 129850,
    "path": "../public/img/ux/7.png"
  },
  "/img/ux/8.png": {
    "type": "image/png",
    "etag": "\"199bb-sEcF+zNtiy57Rn9CdNUtnLHo7AM\"",
    "mtime": "2024-05-16T10:42:42.467Z",
    "size": 104891,
    "path": "../public/img/ux/8.png"
  },
  "/img/ux/9.png": {
    "type": "image/png",
    "etag": "\"29756-y+w1S/BVLqn+XeJsVuQRFetSquU\"",
    "mtime": "2024-05-16T10:42:42.225Z",
    "size": 169814,
    "path": "../public/img/ux/9.png"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-i2JTIr5ditlWh90AtoAlRY8iuYE\"",
    "mtime": "2024-12-16T03:46:05.693Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/img/icons/animated/chart.gif": {
    "type": "image/gif",
    "etag": "\"12a78-6b8unjENcG7742uBIoD0aqH/0+w\"",
    "mtime": "2024-05-16T10:42:08.793Z",
    "size": 76408,
    "path": "../public/img/icons/animated/chart.gif"
  },
  "/img/icons/animated/check.gif": {
    "type": "image/gif",
    "etag": "\"e5f9-0CF35xohM8k+x6OEelLEbVPdCM0\"",
    "mtime": "2024-05-16T10:42:08.588Z",
    "size": 58873,
    "path": "../public/img/icons/animated/check.gif"
  },
  "/img/icons/animated/diamond.gif": {
    "type": "image/gif",
    "etag": "\"28974-Elc4phTk+bvypFdXnEMQXl9s1wA\"",
    "mtime": "2024-05-16T10:42:08.657Z",
    "size": 166260,
    "path": "../public/img/icons/animated/diamond.gif"
  },
  "/img/icons/animated/image.gif": {
    "type": "image/gif",
    "etag": "\"37713-d15sqhvYJIXCAgkCXfr+25xOmOo\"",
    "mtime": "2024-05-16T10:42:08.624Z",
    "size": 227091,
    "path": "../public/img/icons/animated/image.gif"
  },
  "/img/icons/animated/lightbulb.gif": {
    "type": "image/gif",
    "etag": "\"4559-wxqLpfDzWfkMv5on4Aw84RsTlgQ\"",
    "mtime": "2024-05-16T10:42:08.827Z",
    "size": 17753,
    "path": "../public/img/icons/animated/lightbulb.gif"
  },
  "/img/icons/animated/pencil.gif": {
    "type": "image/gif",
    "etag": "\"1cdcf-rG+gmQ9NRHYxj5HuQLKSgQ9KWIE\"",
    "mtime": "2024-05-16T10:42:08.759Z",
    "size": 118223,
    "path": "../public/img/icons/animated/pencil.gif"
  },
  "/img/icons/animated/responsive.gif": {
    "type": "image/gif",
    "etag": "\"16668-YaK8T5y3VLCHsGM1Sgrib3z6/+8\"",
    "mtime": "2024-05-16T10:42:08.520Z",
    "size": 91752,
    "path": "../public/img/icons/animated/responsive.gif"
  },
  "/img/icons/animated/rocket.gif": {
    "type": "image/gif",
    "etag": "\"12c4e-yMDJh0na3/ClXw3aM0M/K95wQP4\"",
    "mtime": "2024-05-16T10:42:08.722Z",
    "size": 76878,
    "path": "../public/img/icons/animated/rocket.gif"
  },
  "/img/icons/animated/search.gif": {
    "type": "image/gif",
    "etag": "\"17bd6-iGF0gtaHaVJWeG4RDOPiZMzdREU\"",
    "mtime": "2024-05-16T10:42:08.554Z",
    "size": 97238,
    "path": "../public/img/icons/animated/search.gif"
  },
  "/img/icons/animated/settings.gif": {
    "type": "image/gif",
    "etag": "\"1940a-RONt9nyK0cS9paQcK2FP9kOE9KE\"",
    "mtime": "2024-05-16T10:42:08.689Z",
    "size": 103434,
    "path": "../public/img/icons/animated/settings.gif"
  },
  "/img/icons/banking/bank-1.svg": {
    "type": "image/svg+xml",
    "etag": "\"324-XfSkMIHTVGEmWuUvBbnD2j8GuHE\"",
    "mtime": "2024-05-16T10:42:08.220Z",
    "size": 804,
    "path": "../public/img/icons/banking/bank-1.svg"
  },
  "/img/icons/banking/bank-2.svg": {
    "type": "image/svg+xml",
    "etag": "\"381-dzVzGE5b54m7foVq3lK2rkgxono\"",
    "mtime": "2024-05-16T10:42:08.392Z",
    "size": 897,
    "path": "../public/img/icons/banking/bank-2.svg"
  },
  "/img/icons/banking/bank-3.svg": {
    "type": "image/svg+xml",
    "etag": "\"74e-lKg0RvXkYT8n/xChafo/uxYn9sk\"",
    "mtime": "2024-05-16T10:42:08.305Z",
    "size": 1870,
    "path": "../public/img/icons/banking/bank-3.svg"
  },
  "/img/icons/banking/visa-squared-color.svg": {
    "type": "image/svg+xml",
    "etag": "\"5bb-K4PBfJ7jzoNvTQ/82HkTWDsUmRI\"",
    "mtime": "2024-05-16T10:42:08.263Z",
    "size": 1467,
    "path": "../public/img/icons/banking/visa-squared-color.svg"
  },
  "/img/icons/banking/visa-squared-white.svg": {
    "type": "image/svg+xml",
    "etag": "\"586-8tRH6/piVGN/LoFwpVoE97OqU6A\"",
    "mtime": "2024-05-16T10:42:08.433Z",
    "size": 1414,
    "path": "../public/img/icons/banking/visa-squared-white.svg"
  },
  "/img/icons/banking/visa-text-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"8b6-fdFEO1/CLCQCzTt/YUWzvc3qfrw\"",
    "mtime": "2024-05-16T10:42:08.351Z",
    "size": 2230,
    "path": "../public/img/icons/banking/visa-text-dark.svg"
  },
  "/img/icons/banking/visa-text-white.svg": {
    "type": "image/svg+xml",
    "etag": "\"8b0-/bT3S0rNOxZDNSDHVyhAzLfmKds\"",
    "mtime": "2024-05-16T10:42:08.479Z",
    "size": 2224,
    "path": "../public/img/icons/banking/visa-text-white.svg"
  },
  "/img/icons/files/ai.svg": {
    "type": "image/svg+xml",
    "etag": "\"31e-pujXH8r6bd+mCwcS4lzgkDFOYQM\"",
    "mtime": "2024-05-16T10:42:06.605Z",
    "size": 798,
    "path": "../public/img/icons/files/ai.svg"
  },
  "/img/icons/files/doc-2.svg": {
    "type": "image/svg+xml",
    "etag": "\"664-7vTmd1B1ajQVbJARNibZjL6jvqE\"",
    "mtime": "2024-05-16T10:42:06.561Z",
    "size": 1636,
    "path": "../public/img/icons/files/doc-2.svg"
  },
  "/img/icons/files/doc.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c9-xMaj9CuH86MiRfz8Gxt468fIGCo\"",
    "mtime": "2024-05-16T10:42:06.764Z",
    "size": 969,
    "path": "../public/img/icons/files/doc.svg"
  },
  "/img/icons/files/pdf.svg": {
    "type": "image/svg+xml",
    "etag": "\"561-faIQ4i97RT6Rmy2Br8BMYhXHBUA\"",
    "mtime": "2024-05-16T10:42:06.807Z",
    "size": 1377,
    "path": "../public/img/icons/files/pdf.svg"
  },
  "/img/icons/files/ppt.svg": {
    "type": "image/svg+xml",
    "etag": "\"5c9-14Qp7W0i4MXi5i8YlQQHtwfJIGE\"",
    "mtime": "2024-05-16T10:42:06.686Z",
    "size": 1481,
    "path": "../public/img/icons/files/ppt.svg"
  },
  "/img/icons/files/presentation.svg": {
    "type": "image/svg+xml",
    "etag": "\"2e7-VueO5pvhhG5HrIm3HRn7ZEpAsIc\"",
    "mtime": "2024-05-16T10:42:06.520Z",
    "size": 743,
    "path": "../public/img/icons/files/presentation.svg"
  },
  "/img/icons/files/sheet.svg": {
    "type": "image/svg+xml",
    "etag": "\"4b7-mr8L9Tmq4tKeE1DYfbMwOj5sVCI\"",
    "mtime": "2024-05-16T10:42:06.480Z",
    "size": 1207,
    "path": "../public/img/icons/files/sheet.svg"
  },
  "/img/icons/files/video.svg": {
    "type": "image/svg+xml",
    "etag": "\"3b5-vAvsWB49GXr9AbX4Z7lTfWnIfWk\"",
    "mtime": "2024-05-16T10:42:06.725Z",
    "size": 949,
    "path": "../public/img/icons/files/video.svg"
  },
  "/img/icons/files/zip-format.svg": {
    "type": "image/svg+xml",
    "etag": "\"40f-mWI6RsJHDJKlPeQL0r9L4nVjnKc\"",
    "mtime": "2024-05-16T10:42:06.646Z",
    "size": 1039,
    "path": "../public/img/icons/files/zip-format.svg"
  },
  "/img/icons/flags/australia.svg": {
    "type": "image/svg+xml",
    "etag": "\"b96-QD5JXdjYovTWCFoNzI568S1+KrE\"",
    "mtime": "2024-05-16T10:42:11.465Z",
    "size": 2966,
    "path": "../public/img/icons/flags/australia.svg"
  },
  "/img/icons/flags/canada.svg": {
    "type": "image/svg+xml",
    "etag": "\"493-cZ0Nh9pIwys5gzyzYxpgbmSgc8g\"",
    "mtime": "2024-05-16T10:42:11.255Z",
    "size": 1171,
    "path": "../public/img/icons/flags/canada.svg"
  },
  "/img/icons/flags/china.svg": {
    "type": "image/svg+xml",
    "etag": "\"4ea-+aX4xvhfrDSLSHZ8M8GjpvSsw08\"",
    "mtime": "2024-05-16T10:42:11.668Z",
    "size": 1258,
    "path": "../public/img/icons/flags/china.svg"
  },
  "/img/icons/flags/dominican-republic.svg": {
    "type": "image/svg+xml",
    "etag": "\"59b-PzJZXCn4LfSkRz6obbw4SdrphPo\"",
    "mtime": "2024-05-16T10:42:11.214Z",
    "size": 1435,
    "path": "../public/img/icons/flags/dominican-republic.svg"
  },
  "/img/icons/flags/england.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c0-KtUYOArSt4jSFA7ZsSShgRt7E1U\"",
    "mtime": "2024-05-16T10:42:11.589Z",
    "size": 960,
    "path": "../public/img/icons/flags/england.svg"
  },
  "/img/icons/flags/finland.svg": {
    "type": "image/svg+xml",
    "etag": "\"3ae-FOoNYO/XGz9AErHoh3PmXtoBTgE\"",
    "mtime": "2024-05-16T10:42:11.708Z",
    "size": 942,
    "path": "../public/img/icons/flags/finland.svg"
  },
  "/img/icons/flags/france.svg": {
    "type": "image/svg+xml",
    "etag": "\"323-I6t9zquAF8Ep7mm1ZktXWQ4v7BI\"",
    "mtime": "2024-05-16T10:42:11.297Z",
    "size": 803,
    "path": "../public/img/icons/flags/france.svg"
  },
  "/img/icons/flags/germany.svg": {
    "type": "image/svg+xml",
    "etag": "\"3b0-D7gnqQsvx3QQ5vyfn6DBocn35II\"",
    "mtime": "2024-05-16T10:42:11.750Z",
    "size": 944,
    "path": "../public/img/icons/flags/germany.svg"
  },
  "/img/icons/flags/italy.svg": {
    "type": "image/svg+xml",
    "etag": "\"349-P9GXWz0FUxRs3eqrrYsrCQqrdSY\"",
    "mtime": "2024-05-16T10:42:11.791Z",
    "size": 841,
    "path": "../public/img/icons/flags/italy.svg"
  },
  "/img/icons/flags/mexico.svg": {
    "type": "image/svg+xml",
    "etag": "\"532-Emtp6Tf1If+TmQuejWzRiNPvOnM\"",
    "mtime": "2024-05-16T10:42:11.506Z",
    "size": 1330,
    "path": "../public/img/icons/flags/mexico.svg"
  },
  "/img/icons/flags/new-zealand.svg": {
    "type": "image/svg+xml",
    "etag": "\"8a2-EJMHpTDdzz5Ve8GmsbyrsH+Zups\"",
    "mtime": "2024-05-16T10:42:11.339Z",
    "size": 2210,
    "path": "../public/img/icons/flags/new-zealand.svg"
  },
  "/img/icons/flags/south-africa.svg": {
    "type": "image/svg+xml",
    "etag": "\"5ae-ow5LOIXVxngbCGu6T/3pknEr68A\"",
    "mtime": "2024-05-16T10:42:11.381Z",
    "size": 1454,
    "path": "../public/img/icons/flags/south-africa.svg"
  },
  "/img/icons/flags/spain.svg": {
    "type": "image/svg+xml",
    "etag": "\"3cf-6ViKLi4u/sAdVo9jUdZSHdRUPiM\"",
    "mtime": "2024-05-16T10:42:11.628Z",
    "size": 975,
    "path": "../public/img/icons/flags/spain.svg"
  },
  "/img/icons/flags/thailand.svg": {
    "type": "image/svg+xml",
    "etag": "\"3e9-51xseruPAAL95iOjRxNOII0YjXw\"",
    "mtime": "2024-05-16T10:42:11.424Z",
    "size": 1001,
    "path": "../public/img/icons/flags/thailand.svg"
  },
  "/img/icons/flags/united-states-of-america.svg": {
    "type": "image/svg+xml",
    "etag": "\"8c2-xjY1NslKCCFbcDPd1gb4F82PQDY\"",
    "mtime": "2024-05-16T10:42:11.548Z",
    "size": 2242,
    "path": "../public/img/icons/flags/united-states-of-america.svg"
  },
  "/img/icons/food/icon-1.svg": {
    "type": "image/svg+xml",
    "etag": "\"1628-Xs5OT7+wc7P3i+pKj224NjcAa0k\"",
    "mtime": "2024-05-16T10:42:10.245Z",
    "size": 5672,
    "path": "../public/img/icons/food/icon-1.svg"
  },
  "/img/icons/food/icon-10.svg": {
    "type": "image/svg+xml",
    "etag": "\"6a9-qfcchlZ0eF1t8NWO4FPCq2ABXqE\"",
    "mtime": "2024-05-16T10:42:10.030Z",
    "size": 1705,
    "path": "../public/img/icons/food/icon-10.svg"
  },
  "/img/icons/food/icon-11.svg": {
    "type": "image/svg+xml",
    "etag": "\"5a8-y1rjW0rRA0ZFzKkOAT7bCBTz9n4\"",
    "mtime": "2024-05-16T10:42:09.990Z",
    "size": 1448,
    "path": "../public/img/icons/food/icon-11.svg"
  },
  "/img/icons/food/icon-12.svg": {
    "type": "image/svg+xml",
    "etag": "\"c2f-a0Z2OMg0dhRC4xVL7AA65G85eec\"",
    "mtime": "2024-05-16T10:42:09.947Z",
    "size": 3119,
    "path": "../public/img/icons/food/icon-12.svg"
  },
  "/img/icons/food/icon-13.svg": {
    "type": "image/svg+xml",
    "etag": "\"13a7-VZs6ND0xtYv51MypOXEHuX2mY/k\"",
    "mtime": "2024-05-16T10:42:09.906Z",
    "size": 5031,
    "path": "../public/img/icons/food/icon-13.svg"
  },
  "/img/icons/food/icon-2.svg": {
    "type": "image/svg+xml",
    "etag": "\"e15-5wjRNX+s3x/SepldCktI/IkpKoE\"",
    "mtime": "2024-05-16T10:42:09.862Z",
    "size": 3605,
    "path": "../public/img/icons/food/icon-2.svg"
  },
  "/img/icons/food/icon-3.svg": {
    "type": "image/svg+xml",
    "etag": "\"c03-qaa6+9GL6vYHHCn1e/nMwiH61qc\"",
    "mtime": "2024-05-16T10:42:10.330Z",
    "size": 3075,
    "path": "../public/img/icons/food/icon-3.svg"
  },
  "/img/icons/food/icon-4.svg": {
    "type": "image/svg+xml",
    "etag": "\"2551-L/eURemMe7gnrlnxJKXlvBZD97M\"",
    "mtime": "2024-05-16T10:42:09.820Z",
    "size": 9553,
    "path": "../public/img/icons/food/icon-4.svg"
  },
  "/img/icons/food/icon-5.svg": {
    "type": "image/svg+xml",
    "etag": "\"127d-EcI8lqiJNLnjTZuCdQPhKAMCfDY\"",
    "mtime": "2024-05-16T10:42:10.287Z",
    "size": 4733,
    "path": "../public/img/icons/food/icon-5.svg"
  },
  "/img/icons/food/icon-6.svg": {
    "type": "image/svg+xml",
    "etag": "\"1f6a-VU4TEe8seLnEGJCYu9YwYI6l9C8\"",
    "mtime": "2024-05-16T10:42:10.157Z",
    "size": 8042,
    "path": "../public/img/icons/food/icon-6.svg"
  },
  "/img/icons/food/icon-7.svg": {
    "type": "image/svg+xml",
    "etag": "\"9a7-1KzosBrySHtlo39/a715BFUdubo\"",
    "mtime": "2024-05-16T10:42:10.199Z",
    "size": 2471,
    "path": "../public/img/icons/food/icon-7.svg"
  },
  "/img/icons/food/icon-8.svg": {
    "type": "image/svg+xml",
    "etag": "\"9a0-qApeZ9QOj8ac+i/O1edjmj5AFcY\"",
    "mtime": "2024-05-16T10:42:10.114Z",
    "size": 2464,
    "path": "../public/img/icons/food/icon-8.svg"
  },
  "/img/icons/food/icon-9.svg": {
    "type": "image/svg+xml",
    "etag": "\"6ba-exFFgkZMwMzK3f+lRG3zsbMlgYw\"",
    "mtime": "2024-05-16T10:42:10.070Z",
    "size": 1722,
    "path": "../public/img/icons/food/icon-9.svg"
  },
  "/img/icons/layouts/layout-1-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"949-XQdl+2+H3K5fmF+tvL/IBItwWsY\"",
    "mtime": "2024-05-16T10:42:07.075Z",
    "size": 2377,
    "path": "../public/img/icons/layouts/layout-1-dark.svg"
  },
  "/img/icons/layouts/layout-1.svg": {
    "type": "image/svg+xml",
    "etag": "\"949-Thb/e7UAxfT4P72vuGEG6t4DfGc\"",
    "mtime": "2024-05-16T10:42:07.203Z",
    "size": 2377,
    "path": "../public/img/icons/layouts/layout-1.svg"
  },
  "/img/icons/layouts/layout-10-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"b49-C8+vIx8RfniJJNGH+le7C7dvbbI\"",
    "mtime": "2024-05-16T10:42:06.984Z",
    "size": 2889,
    "path": "../public/img/icons/layouts/layout-10-dark.svg"
  },
  "/img/icons/layouts/layout-10.svg": {
    "type": "image/svg+xml",
    "etag": "\"b49-u058A1gV3344PFlqYTaZoiNA84o\"",
    "mtime": "2024-05-16T10:42:07.999Z",
    "size": 2889,
    "path": "../public/img/icons/layouts/layout-10.svg"
  },
  "/img/icons/layouts/layout-11-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"b97-QQ+J7t41sWreKYp2bamYozCOe98\"",
    "mtime": "2024-05-16T10:42:07.700Z",
    "size": 2967,
    "path": "../public/img/icons/layouts/layout-11-dark.svg"
  },
  "/img/icons/layouts/layout-11.svg": {
    "type": "image/svg+xml",
    "etag": "\"b97-0h2Nqqp721nmK6EbUPJkyqMcac4\"",
    "mtime": "2024-05-16T10:42:07.914Z",
    "size": 2967,
    "path": "../public/img/icons/layouts/layout-11.svg"
  },
  "/img/icons/layouts/layout-12-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"b91-ZE56OdyF4e5kQ+RZnhx2qMGPwPs\"",
    "mtime": "2024-05-16T10:42:08.172Z",
    "size": 2961,
    "path": "../public/img/icons/layouts/layout-12-dark.svg"
  },
  "/img/icons/layouts/layout-12.svg": {
    "type": "image/svg+xml",
    "etag": "\"b91-uqMabMT4EOxUJ1YQ6Ec+GNczp9M\"",
    "mtime": "2024-05-16T10:42:06.944Z",
    "size": 2961,
    "path": "../public/img/icons/layouts/layout-12.svg"
  },
  "/img/icons/layouts/layout-13-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"a49-MPghdziDFIx/ZXEFKynJE6atJSQ\"",
    "mtime": "2024-05-16T10:42:08.082Z",
    "size": 2633,
    "path": "../public/img/icons/layouts/layout-13-dark.svg"
  },
  "/img/icons/layouts/layout-13.svg": {
    "type": "image/svg+xml",
    "etag": "\"a01-MOG7Q/qmyxCJUnNSsCdmwFNfP98\"",
    "mtime": "2024-05-16T10:42:07.615Z",
    "size": 2561,
    "path": "../public/img/icons/layouts/layout-13.svg"
  },
  "/img/icons/layouts/layout-14-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"a87-+W8jM1IMHdolGenCV2VzRmw7Y3w\"",
    "mtime": "2024-05-16T10:42:07.957Z",
    "size": 2695,
    "path": "../public/img/icons/layouts/layout-14-dark.svg"
  },
  "/img/icons/layouts/layout-14.svg": {
    "type": "image/svg+xml",
    "etag": "\"a3f-GPi46JhqD/PkbKQ4IYsvavjVxZc\"",
    "mtime": "2024-05-16T10:42:08.127Z",
    "size": 2623,
    "path": "../public/img/icons/layouts/layout-14.svg"
  },
  "/img/icons/layouts/layout-15-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"b15-rQ6kpQnkGQgdMS7cIl8KS8dvo9s\"",
    "mtime": "2024-05-16T10:42:07.743Z",
    "size": 2837,
    "path": "../public/img/icons/layouts/layout-15-dark.svg"
  },
  "/img/icons/layouts/layout-15.svg": {
    "type": "image/svg+xml",
    "etag": "\"acd-mOJ3Kv+BU4ZJdMPRwL2ilCfVcE4\"",
    "mtime": "2024-05-16T10:42:07.871Z",
    "size": 2765,
    "path": "../public/img/icons/layouts/layout-15.svg"
  },
  "/img/icons/layouts/layout-16-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"b53-IkY4+Z2sYCfvDYbIZ6lAgNHrNpg\"",
    "mtime": "2024-05-16T10:42:07.328Z",
    "size": 2899,
    "path": "../public/img/icons/layouts/layout-16-dark.svg"
  },
  "/img/icons/layouts/layout-16.svg": {
    "type": "image/svg+xml",
    "etag": "\"b0b-piUMbOumI+3WErjRMnBoZwBUiq0\"",
    "mtime": "2024-05-16T10:42:07.286Z",
    "size": 2827,
    "path": "../public/img/icons/layouts/layout-16.svg"
  },
  "/img/icons/layouts/layout-2-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"9a7-gaJES7cggLzTtD2BuBOvpl84ISg\"",
    "mtime": "2024-05-16T10:42:07.533Z",
    "size": 2471,
    "path": "../public/img/icons/layouts/layout-2-dark.svg"
  },
  "/img/icons/layouts/layout-2.svg": {
    "type": "image/svg+xml",
    "etag": "\"9a7-QK83DxHPuV3MM1RICHy7zRhn6fA\"",
    "mtime": "2024-05-16T10:42:07.031Z",
    "size": 2471,
    "path": "../public/img/icons/layouts/layout-2.svg"
  },
  "/img/icons/layouts/layout-3-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"9b2-ZiRAjU3SsQPbGW1t2rBrXbROvmE\"",
    "mtime": "2024-05-16T10:42:07.828Z",
    "size": 2482,
    "path": "../public/img/icons/layouts/layout-3-dark.svg"
  },
  "/img/icons/layouts/layout-3.svg": {
    "type": "image/svg+xml",
    "etag": "\"96b-Z4GHAWlBXifz9J+lqeyhZmEljYo\"",
    "mtime": "2024-05-16T10:42:07.368Z",
    "size": 2411,
    "path": "../public/img/icons/layouts/layout-3.svg"
  },
  "/img/icons/layouts/layout-4-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"a28-aH3IvyuqV4cKbmG6HF3OuG3RVSg\"",
    "mtime": "2024-05-16T10:42:06.856Z",
    "size": 2600,
    "path": "../public/img/icons/layouts/layout-4-dark.svg"
  },
  "/img/icons/layouts/layout-4.svg": {
    "type": "image/svg+xml",
    "etag": "\"9df-a8ZV9woFO0g38IAt64PLivHWMwI\"",
    "mtime": "2024-05-16T10:42:07.574Z",
    "size": 2527,
    "path": "../public/img/icons/layouts/layout-4.svg"
  },
  "/img/icons/layouts/layout-5-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"a9f-WwTWRiqN5CIXX6Uv5vm2aSOmnvk\"",
    "mtime": "2024-05-16T10:42:07.786Z",
    "size": 2719,
    "path": "../public/img/icons/layouts/layout-5-dark.svg"
  },
  "/img/icons/layouts/layout-5.svg": {
    "type": "image/svg+xml",
    "etag": "\"a45-OYXoW0MbfOJa3L4Q1lhrqzNX7J8\"",
    "mtime": "2024-05-16T10:42:07.246Z",
    "size": 2629,
    "path": "../public/img/icons/layouts/layout-5.svg"
  },
  "/img/icons/layouts/layout-6-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"974-WNxWasgduA8kb5jhNVlpU+ytj3E\"",
    "mtime": "2024-05-16T10:42:07.493Z",
    "size": 2420,
    "path": "../public/img/icons/layouts/layout-6-dark.svg"
  },
  "/img/icons/layouts/layout-6.svg": {
    "type": "image/svg+xml",
    "etag": "\"974-0QRPcC55tPHQI6QZAmiO5AKriaI\"",
    "mtime": "2024-05-16T10:42:07.454Z",
    "size": 2420,
    "path": "../public/img/icons/layouts/layout-6.svg"
  },
  "/img/icons/layouts/layout-7-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"aad-OmQ0F2AWzmgsMgBZsmJsXAPR5sY\"",
    "mtime": "2024-05-16T10:42:07.657Z",
    "size": 2733,
    "path": "../public/img/icons/layouts/layout-7-dark.svg"
  },
  "/img/icons/layouts/layout-7.svg": {
    "type": "image/svg+xml",
    "etag": "\"a4f-7bDX2dSmp60TAjuHVj1GIlEmxLE\"",
    "mtime": "2024-05-16T10:42:08.042Z",
    "size": 2639,
    "path": "../public/img/icons/layouts/layout-7.svg"
  },
  "/img/icons/layouts/layout-8-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"a8d-MTqAZkHBCU+ytBhNtqxV8eIhtDc\"",
    "mtime": "2024-05-16T10:42:07.118Z",
    "size": 2701,
    "path": "../public/img/icons/layouts/layout-8-dark.svg"
  },
  "/img/icons/layouts/layout-8.svg": {
    "type": "image/svg+xml",
    "etag": "\"a2f-/PP1W2trHNEgPYpWSnz0ALvjwXg\"",
    "mtime": "2024-05-16T10:42:07.161Z",
    "size": 2607,
    "path": "../public/img/icons/layouts/layout-8.svg"
  },
  "/img/icons/layouts/layout-9-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"b4c-jR01Jjs6eDCN+liB7rcIUfrdHcw\"",
    "mtime": "2024-05-16T10:42:06.898Z",
    "size": 2892,
    "path": "../public/img/icons/layouts/layout-9-dark.svg"
  },
  "/img/icons/layouts/layout-9.svg": {
    "type": "image/svg+xml",
    "etag": "\"b4c-bUz0gt5KwbPUvYqtWUU/GAZSfeI\"",
    "mtime": "2024-05-16T10:42:07.413Z",
    "size": 2892,
    "path": "../public/img/icons/layouts/layout-9.svg"
  },
  "/img/icons/logos/bankaria.svg": {
    "type": "image/svg+xml",
    "etag": "\"73b-KYccr7O4Q4BuufuTZtON7boyGAg\"",
    "mtime": "2024-05-16T10:42:09.254Z",
    "size": 1851,
    "path": "../public/img/icons/logos/bankaria.svg"
  },
  "/img/icons/logos/bingo.svg": {
    "type": "image/svg+xml",
    "etag": "\"3ba-tYy59wfp7VPaUMd7263XXUx2BSk\"",
    "mtime": "2024-05-16T10:42:09.380Z",
    "size": 954,
    "path": "../public/img/icons/logos/bingo.svg"
  },
  "/img/icons/logos/clover.svg": {
    "type": "image/svg+xml",
    "etag": "\"48b-C2U6F1l1cl7BCQbGJSawFbVB9ic\"",
    "mtime": "2024-05-16T10:42:09.469Z",
    "size": 1163,
    "path": "../public/img/icons/logos/clover.svg"
  },
  "/img/icons/logos/courserio.svg": {
    "type": "image/svg+xml",
    "etag": "\"2cb-phrKU/88099wLi6I2pC9HqEwoF0\"",
    "mtime": "2024-05-16T10:42:09.554Z",
    "size": 715,
    "path": "../public/img/icons/logos/courserio.svg"
  },
  "/img/icons/logos/drop.svg": {
    "type": "image/svg+xml",
    "etag": "\"322-NiK4SLfI/+JElEQRyR6Wkkdp+Mg\"",
    "mtime": "2024-05-16T10:42:08.916Z",
    "size": 802,
    "path": "../public/img/icons/logos/drop.svg"
  },
  "/img/icons/logos/envato.svg": {
    "type": "image/svg+xml",
    "etag": "\"571-or2oT/6J+DcBuclSAUhn6nloswg\"",
    "mtime": "2024-05-16T10:42:09.169Z",
    "size": 1393,
    "path": "../public/img/icons/logos/envato.svg"
  },
  "/img/icons/logos/fastpizza.svg": {
    "type": "image/svg+xml",
    "etag": "\"53c-CTgBuAnHY6TOQxVrHSL+8J0RVck\"",
    "mtime": "2024-05-16T10:42:09.128Z",
    "size": 1340,
    "path": "../public/img/icons/logos/fastpizza.svg"
  },
  "/img/icons/logos/flashlite.svg": {
    "type": "image/svg+xml",
    "etag": "\"2f6-MjEvifA5ZfvcFtDDOcT8Gza/4rg\"",
    "mtime": "2024-05-16T10:42:09.000Z",
    "size": 758,
    "path": "../public/img/icons/logos/flashlite.svg"
  },
  "/img/icons/logos/fresco.svg": {
    "type": "image/svg+xml",
    "etag": "\"ac4b-NwUAwLXDAaAXkW/HSvc5472Z+50\"",
    "mtime": "2024-05-16T10:42:09.298Z",
    "size": 44107,
    "path": "../public/img/icons/logos/fresco.svg"
  },
  "/img/icons/logos/gradius.svg": {
    "type": "image/svg+xml",
    "etag": "\"41c-lAn2F5EYZCC4tcjpysosyUmNqew\"",
    "mtime": "2024-05-16T10:42:09.725Z",
    "size": 1052,
    "path": "../public/img/icons/logos/gradius.svg"
  },
  "/img/icons/logos/hairz.svg": {
    "type": "image/svg+xml",
    "etag": "\"76e-dRWdZ1DiKXc7GtgBVGO3TI3rGBM\"",
    "mtime": "2024-05-16T10:42:09.082Z",
    "size": 1902,
    "path": "../public/img/icons/logos/hairz.svg"
  },
  "/img/icons/logos/lipflow.svg": {
    "type": "image/svg+xml",
    "etag": "\"5a8-LnLdfB+N5TdndQ4yV8z5dL/IoQY\"",
    "mtime": "2024-05-16T10:42:09.513Z",
    "size": 1448,
    "path": "../public/img/icons/logos/lipflow.svg"
  },
  "/img/icons/logos/masterio.svg": {
    "type": "image/svg+xml",
    "etag": "\"394-rR3PoDQAO+bTAdmgynyR1DL8fg8\"",
    "mtime": "2024-05-16T10:42:09.040Z",
    "size": 916,
    "path": "../public/img/icons/logos/masterio.svg"
  },
  "/img/icons/logos/meatboy.svg": {
    "type": "image/svg+xml",
    "etag": "\"6db-pE+9j6gYjaoo8L3OR1f3iOaTX/k\"",
    "mtime": "2024-05-16T10:42:09.339Z",
    "size": 1755,
    "path": "../public/img/icons/logos/meatboy.svg"
  },
  "/img/icons/logos/metamovies.svg": {
    "type": "image/svg+xml",
    "etag": "\"302-xMFo8bcGX6kvyYtAgJU+MsVvcj0\"",
    "mtime": "2024-05-16T10:42:08.957Z",
    "size": 770,
    "path": "../public/img/icons/logos/metamovies.svg"
  },
  "/img/icons/logos/mobilol.svg": {
    "type": "image/svg+xml",
    "etag": "\"998-OT0dxG4JF267ID4Jlxc/I1drL3o\"",
    "mtime": "2024-05-16T10:42:09.686Z",
    "size": 2456,
    "path": "../public/img/icons/logos/mobilol.svg"
  },
  "/img/icons/logos/nitro.svg": {
    "type": "image/svg+xml",
    "etag": "\"140-ED/CP+4LaI8YIAWli6Y8dHphank\"",
    "mtime": "2024-05-16T10:42:09.644Z",
    "size": 320,
    "path": "../public/img/icons/logos/nitro.svg"
  },
  "/img/icons/logos/okano.svg": {
    "type": "image/svg+xml",
    "etag": "\"84f-4CKYgDaHPf0UvKTY1/342LoX3s4\"",
    "mtime": "2024-05-16T10:42:09.210Z",
    "size": 2127,
    "path": "../public/img/icons/logos/okano.svg"
  },
  "/img/icons/logos/rekrew.svg": {
    "type": "image/svg+xml",
    "etag": "\"440-+tE9lPshH3EH55hEATo97crDseg\"",
    "mtime": "2024-05-16T10:42:09.602Z",
    "size": 1088,
    "path": "../public/img/icons/logos/rekrew.svg"
  },
  "/img/icons/logos/slicer.svg": {
    "type": "image/svg+xml",
    "etag": "\"443-k5RdsBBXkXSq00bLFnZhaybPC1k\"",
    "mtime": "2024-05-16T10:42:08.875Z",
    "size": 1091,
    "path": "../public/img/icons/logos/slicer.svg"
  },
  "/img/icons/logos/spiral.svg": {
    "type": "image/svg+xml",
    "etag": "\"c43-/tWo7f+QSPTvl65FHxKJStUR6/Y\"",
    "mtime": "2024-05-16T10:42:09.770Z",
    "size": 3139,
    "path": "../public/img/icons/logos/spiral.svg"
  },
  "/img/icons/logos/vego.svg": {
    "type": "image/svg+xml",
    "etag": "\"768e-z+zadsARgRh9QJwHZ4UObROO0zo\"",
    "mtime": "2024-05-16T10:42:09.424Z",
    "size": 30350,
    "path": "../public/img/icons/logos/vego.svg"
  },
  "/img/illustrations/components/accordion-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"486-pMUBJCHPAZID8DmGQbJf2Kue6Bs\"",
    "mtime": "2024-05-16T10:42:17.731Z",
    "size": 1158,
    "path": "../public/img/illustrations/components/accordion-icon.svg"
  },
  "/img/illustrations/components/anchor-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"3ff-C8hBi7oGozrhB8nBBFfjeZebzHo\"",
    "mtime": "2024-05-16T10:42:18.147Z",
    "size": 1023,
    "path": "../public/img/illustrations/components/anchor-icon.svg"
  },
  "/img/illustrations/components/apexcharts-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"51a-cKoAj9sf7+ql2jWs01kcpKnGmT4\"",
    "mtime": "2024-05-16T10:42:18.846Z",
    "size": 1306,
    "path": "../public/img/illustrations/components/apexcharts-icon.svg"
  },
  "/img/illustrations/components/autocomplete-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"340-5S9/3RjIWSrqWdswaCoTWzaISc4\"",
    "mtime": "2024-05-16T10:42:18.554Z",
    "size": 832,
    "path": "../public/img/illustrations/components/autocomplete-icon.svg"
  },
  "/img/illustrations/components/avatar-group-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"35e-rUiy5uvkII1vWX5C33niHpu7Gvc\"",
    "mtime": "2024-05-16T10:42:18.760Z",
    "size": 862,
    "path": "../public/img/illustrations/components/avatar-group-icon.svg"
  },
  "/img/illustrations/components/avatar-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"6eb-TfGbm6Nx1z1jeooVHDJWmv7hAc8\"",
    "mtime": "2024-05-16T10:42:18.717Z",
    "size": 1771,
    "path": "../public/img/illustrations/components/avatar-icon.svg"
  },
  "/img/illustrations/components/breadcrumb-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"5f3-yNx0yOLcaHM+HF/E8fvK9cMS/FA\"",
    "mtime": "2024-05-16T10:42:17.609Z",
    "size": 1523,
    "path": "../public/img/illustrations/components/breadcrumb-icon.svg"
  },
  "/img/illustrations/components/button-action-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"45e-H8Px7RymcBUt7yt6JsEhQhEiA0A\"",
    "mtime": "2024-05-16T10:42:17.237Z",
    "size": 1118,
    "path": "../public/img/illustrations/components/button-action-icon.svg"
  },
  "/img/illustrations/components/button-close-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"51a-mou1+Co5/ZzIGOORznLwyUtBPu8\"",
    "mtime": "2024-05-16T10:42:18.187Z",
    "size": 1306,
    "path": "../public/img/illustrations/components/button-close-icon.svg"
  },
  "/img/illustrations/components/button-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"41a-0P8SzP/AmmJLKbHIShpzfMUpeWY\"",
    "mtime": "2024-05-16T10:42:18.804Z",
    "size": 1050,
    "path": "../public/img/illustrations/components/button-icon.svg"
  },
  "/img/illustrations/components/calendar-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"4f7-UPRPMmF/DBxvku67+70SBsKOYU8\"",
    "mtime": "2024-05-16T10:42:17.197Z",
    "size": 1271,
    "path": "../public/img/illustrations/components/calendar-icon.svg"
  },
  "/img/illustrations/components/card-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"3ef-UFMTTd/iQ2PyR2/HGmkFXjdcpb4\"",
    "mtime": "2024-05-16T10:42:17.525Z",
    "size": 1007,
    "path": "../public/img/illustrations/components/card-icon.svg"
  },
  "/img/illustrations/components/carousel-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"77c-JLKCNERLRd5LGsDw4TTB3V65NWc\"",
    "mtime": "2024-05-16T10:42:17.358Z",
    "size": 1916,
    "path": "../public/img/illustrations/components/carousel-icon.svg"
  },
  "/img/illustrations/components/checkbox-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"3b3-hmc6vGUMD9mPVl0SrBxPLpCULNM\"",
    "mtime": "2024-05-16T10:42:18.429Z",
    "size": 947,
    "path": "../public/img/illustrations/components/checkbox-icon.svg"
  },
  "/img/illustrations/components/circular-menu-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"559-T5z9YcHzpUGo2fnseSFWZhPAS2M\"",
    "mtime": "2024-05-16T10:42:17.277Z",
    "size": 1369,
    "path": "../public/img/illustrations/components/circular-menu-icon.svg"
  },
  "/img/illustrations/components/dropdown-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"5fc-RNOhxng5GuU8guVdVb1tbS6w6co\"",
    "mtime": "2024-05-16T10:42:17.944Z",
    "size": 1532,
    "path": "../public/img/illustrations/components/dropdown-icon.svg"
  },
  "/img/illustrations/components/focus-loop-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"426-vcKjha/jKaQRvKEugPei6ohm8go\"",
    "mtime": "2024-05-16T10:42:17.568Z",
    "size": 1062,
    "path": "../public/img/illustrations/components/focus-loop-icon.svg"
  },
  "/img/illustrations/components/iconbox-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"3ba-vYwVwycSg0fhWWqa1pGQFdUebzw\"",
    "mtime": "2024-05-16T10:42:17.438Z",
    "size": 954,
    "path": "../public/img/illustrations/components/iconbox-icon.svg"
  },
  "/img/illustrations/components/input-file-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"598-KYFZ54OfG5kt7aCUtBme1OzS1Jk\"",
    "mtime": "2024-05-16T10:42:17.904Z",
    "size": 1432,
    "path": "../public/img/illustrations/components/input-file-icon.svg"
  },
  "/img/illustrations/components/input-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"3fd-lXPgZ8RnEpZoRCQA2lv9IacQMqw\"",
    "mtime": "2024-05-16T10:42:18.636Z",
    "size": 1021,
    "path": "../public/img/illustrations/components/input-icon.svg"
  },
  "/img/illustrations/components/listbox-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"50b-3iXHFo2Y7gViodeclvvGoR/ab/Q\"",
    "mtime": "2024-05-16T10:42:17.774Z",
    "size": 1291,
    "path": "../public/img/illustrations/components/listbox-icon.svg"
  },
  "/img/illustrations/components/logo-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"406-aJ11NBFStqLwTSTkFAq/7Jlubqc\"",
    "mtime": "2024-05-16T10:42:18.268Z",
    "size": 1030,
    "path": "../public/img/illustrations/components/logo-icon.svg"
  },
  "/img/illustrations/components/map-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"706-9WsKHAReuAM4N8s/jp8BIT323XU\"",
    "mtime": "2024-05-16T10:42:18.390Z",
    "size": 1798,
    "path": "../public/img/illustrations/components/map-icon.svg"
  },
  "/img/illustrations/components/markdown-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"4e0-LoCK6BzNprh51S5QpM5VOetdr4s\"",
    "mtime": "2024-05-16T10:42:18.471Z",
    "size": 1248,
    "path": "../public/img/illustrations/components/markdown-icon.svg"
  },
  "/img/illustrations/components/message-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"4e0-2GZT3RmzZR9k/fBDGwKTd3H/NjE\"",
    "mtime": "2024-05-16T10:42:18.350Z",
    "size": 1248,
    "path": "../public/img/illustrations/components/message-icon.svg"
  },
  "/img/illustrations/components/modal-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"4ea-mV33ULRCcXG3QNVyZpDBUjInTBA\"",
    "mtime": "2024-05-16T10:42:17.481Z",
    "size": 1258,
    "path": "../public/img/illustrations/components/modal-icon.svg"
  },
  "/img/illustrations/components/pagination-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"3d7-X4eZTM8OxgTQI2ZCdmk4XV0S5Pg\"",
    "mtime": "2024-05-16T10:42:18.674Z",
    "size": 983,
    "path": "../public/img/illustrations/components/pagination-icon.svg"
  },
  "/img/illustrations/components/placeholder-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"6ba-xXHqiS83r1NYVezpvQuCoLSgCVM\"",
    "mtime": "2024-05-16T10:42:17.319Z",
    "size": 1722,
    "path": "../public/img/illustrations/components/placeholder-icon.svg"
  },
  "/img/illustrations/components/placeload-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"3bf-DQaDpfw253J+/Ib3W1s03tGjpkE\"",
    "mtime": "2024-05-16T10:42:17.649Z",
    "size": 959,
    "path": "../public/img/illustrations/components/placeload-icon.svg"
  },
  "/img/illustrations/components/popover-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"466-628Re6/bW5xJgw3CNwlbFQfqvDc\"",
    "mtime": "2024-05-16T10:42:19.014Z",
    "size": 1126,
    "path": "../public/img/illustrations/components/popover-icon.svg"
  },
  "/img/illustrations/components/progress-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"37a-xcjH7lBh+faq//l6fe6OyQhbB6M\"",
    "mtime": "2024-05-16T10:42:17.982Z",
    "size": 890,
    "path": "../public/img/illustrations/components/progress-icon.svg"
  },
  "/img/illustrations/components/prose-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"45c-OLwMCaDau/6GVEnwlkxRB1gcLcQ\"",
    "mtime": "2024-05-16T10:42:18.888Z",
    "size": 1116,
    "path": "../public/img/illustrations/components/prose-icon.svg"
  },
  "/img/illustrations/components/radio-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"423-ounoqaz/jfnDi8CjvgH3KAcDTsU\"",
    "mtime": "2024-05-16T10:42:18.310Z",
    "size": 1059,
    "path": "../public/img/illustrations/components/radio-icon.svg"
  },
  "/img/illustrations/components/select-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"5af-pXlMsSkMHmKQQ9psaAv39zJuvHk\"",
    "mtime": "2024-05-16T10:42:17.398Z",
    "size": 1455,
    "path": "../public/img/illustrations/components/select-icon.svg"
  },
  "/img/illustrations/components/sidebar-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"4ca-PD37XwXMTHuarmPYOewZYgHg4v4\"",
    "mtime": "2024-05-16T10:42:18.929Z",
    "size": 1226,
    "path": "../public/img/illustrations/components/sidebar-icon.svg"
  },
  "/img/illustrations/components/snack-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"751-ka8StrKVNSOBO2om3kKYSs970nY\"",
    "mtime": "2024-05-16T10:42:18.972Z",
    "size": 1873,
    "path": "../public/img/illustrations/components/snack-icon.svg"
  },
  "/img/illustrations/components/switch-ball-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"4f0-ySGlwZ6/ciVdAt+fqNdV1YKZxvg\"",
    "mtime": "2024-05-16T10:42:19.058Z",
    "size": 1264,
    "path": "../public/img/illustrations/components/switch-ball-icon.svg"
  },
  "/img/illustrations/components/switch-thin-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"4ef-XV8LuHzDaCXd8P3HumMErmEVYrQ\"",
    "mtime": "2024-05-16T10:42:18.226Z",
    "size": 1263,
    "path": "../public/img/illustrations/components/switch-thin-icon.svg"
  },
  "/img/illustrations/components/tab-slider-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"46a-MMuTNmp9lUPnPshf3u1dW8QfVYA\"",
    "mtime": "2024-05-16T10:42:17.690Z",
    "size": 1130,
    "path": "../public/img/illustrations/components/tab-slider-icon.svg"
  },
  "/img/illustrations/components/table-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"40e-oAbv/O3v4wJpP/7wo+u2NEJTylQ\"",
    "mtime": "2024-05-16T10:42:18.023Z",
    "size": 1038,
    "path": "../public/img/illustrations/components/table-icon.svg"
  },
  "/img/illustrations/components/tabs-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"6fc-SwbAklcJzCVfL8p1iWYTy3eJ/jM\"",
    "mtime": "2024-05-16T10:42:19.100Z",
    "size": 1788,
    "path": "../public/img/illustrations/components/tabs-icon.svg"
  },
  "/img/illustrations/components/tag-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"4d6-+W6CIoqKePIzCLsX1nD2hKDzeJI\"",
    "mtime": "2024-05-16T10:42:18.106Z",
    "size": 1238,
    "path": "../public/img/illustrations/components/tag-icon.svg"
  },
  "/img/illustrations/components/textarea-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"5ab-PRRfy+YB+AA9LwJe7D2BGG+BNoY\"",
    "mtime": "2024-05-16T10:42:18.596Z",
    "size": 1451,
    "path": "../public/img/illustrations/components/textarea-icon.svg"
  },
  "/img/illustrations/components/theme-toggle-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"84c-4colF5eUF65ZViJrALbfrqjx4lE\"",
    "mtime": "2024-05-16T10:42:17.157Z",
    "size": 2124,
    "path": "../public/img/illustrations/components/theme-toggle-icon.svg"
  },
  "/img/illustrations/components/toc-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"512-61rqcBOjQuKq/xBa3jHzGRz60rQ\"",
    "mtime": "2024-05-16T10:42:18.515Z",
    "size": 1298,
    "path": "../public/img/illustrations/components/toc-icon.svg"
  },
  "/img/illustrations/components/toolbar-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"4c7-5PTLTVQebwqLkr9tX9lyzWbGVMc\"",
    "mtime": "2024-05-16T10:42:18.065Z",
    "size": 1223,
    "path": "../public/img/illustrations/components/toolbar-icon.svg"
  },
  "/img/illustrations/components/typography-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"54c-rB/LWK/P8jLIexFM/tRSwicdeOs\"",
    "mtime": "2024-05-16T10:42:17.863Z",
    "size": 1356,
    "path": "../public/img/illustrations/components/typography-icon.svg"
  },
  "/img/illustrations/components/wrapper-icon.svg": {
    "type": "image/svg+xml",
    "etag": "\"4c6-Cz6jb5wB+B0UxBhngyX4zlnmKx0\"",
    "mtime": "2024-05-16T10:42:17.817Z",
    "size": 1222,
    "path": "../public/img/illustrations/components/wrapper-icon.svg"
  },
  "/img/illustrations/dashboards/travel-cases.svg": {
    "type": "image/svg+xml",
    "etag": "\"38ed-V85D9+hltrCasfXxD5TsaXpY0mY\"",
    "mtime": "2024-05-16T10:42:19.906Z",
    "size": 14573,
    "path": "../public/img/illustrations/dashboards/travel-cases.svg"
  },
  "/img/illustrations/layouts/cake-1.svg": {
    "type": "image/svg+xml",
    "etag": "\"4825-LlT0jWwyoo8XZLnf8lVVQWTWAOI\"",
    "mtime": "2024-05-16T10:42:15.178Z",
    "size": 18469,
    "path": "../public/img/illustrations/layouts/cake-1.svg"
  },
  "/img/illustrations/layouts/cake-10.svg": {
    "type": "image/svg+xml",
    "etag": "\"3f8f-uDHeRubEBiLux0v/d1hu9QDUI+8\"",
    "mtime": "2024-05-16T10:42:16.656Z",
    "size": 16271,
    "path": "../public/img/illustrations/layouts/cake-10.svg"
  },
  "/img/illustrations/layouts/cake-2.svg": {
    "type": "image/svg+xml",
    "etag": "\"3651-B+Wo0bQQwxtwxFfHyS9jMIrCJiQ\"",
    "mtime": "2024-05-16T10:42:14.421Z",
    "size": 13905,
    "path": "../public/img/illustrations/layouts/cake-2.svg"
  },
  "/img/illustrations/layouts/cake-3.svg": {
    "type": "image/svg+xml",
    "etag": "\"3bc0-PAXN+nlVszIS3AMllq/aA3OdUL8\"",
    "mtime": "2024-05-16T10:42:16.697Z",
    "size": 15296,
    "path": "../public/img/illustrations/layouts/cake-3.svg"
  },
  "/img/illustrations/layouts/cake-4.svg": {
    "type": "image/svg+xml",
    "etag": "\"5f15-xjvtRCu89agiEbeZ0uA3hnefhgo\"",
    "mtime": "2024-05-16T10:42:14.806Z",
    "size": 24341,
    "path": "../public/img/illustrations/layouts/cake-4.svg"
  },
  "/img/illustrations/layouts/cake-5.svg": {
    "type": "image/svg+xml",
    "etag": "\"339a-cBRLMT5OCP8jqiQpxwXX6BJBNfY\"",
    "mtime": "2024-05-16T10:42:15.304Z",
    "size": 13210,
    "path": "../public/img/illustrations/layouts/cake-5.svg"
  },
  "/img/illustrations/layouts/cake-6.svg": {
    "type": "image/svg+xml",
    "etag": "\"654f-bbe0n4nk0BCy5gdlXuILfkTcnwk\"",
    "mtime": "2024-05-16T10:42:16.781Z",
    "size": 25935,
    "path": "../public/img/illustrations/layouts/cake-6.svg"
  },
  "/img/illustrations/layouts/cake-7.svg": {
    "type": "image/svg+xml",
    "etag": "\"2fc0-LtU4Zn6MVbwIHfrQwjdRfAxwM+Q\"",
    "mtime": "2024-05-16T10:42:16.434Z",
    "size": 12224,
    "path": "../public/img/illustrations/layouts/cake-7.svg"
  },
  "/img/illustrations/layouts/cake-8.svg": {
    "type": "image/svg+xml",
    "etag": "\"100f-+2vVOGI1r7yGcLIbtHbAR6oLVFY\"",
    "mtime": "2024-05-16T10:42:16.476Z",
    "size": 4111,
    "path": "../public/img/illustrations/layouts/cake-8.svg"
  },
  "/img/illustrations/layouts/cake-9.svg": {
    "type": "image/svg+xml",
    "etag": "\"1375-jHmArrSlaBrq0PuG2ALozI9UBgg\"",
    "mtime": "2024-05-16T10:42:14.623Z",
    "size": 4981,
    "path": "../public/img/illustrations/layouts/cake-9.svg"
  },
  "/img/illustrations/layouts/course-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"79ee-IQlt28bsuoskkDILbwtHqxNAxr8\"",
    "mtime": "2024-05-16T10:42:16.111Z",
    "size": 31214,
    "path": "../public/img/illustrations/layouts/course-1.jpg"
  },
  "/img/illustrations/layouts/course-11.jpg": {
    "type": "image/jpeg",
    "etag": "\"45c1-oC7hebxDgTmx2jndyqN8fjoHsmI\"",
    "mtime": "2024-05-16T10:42:16.351Z",
    "size": 17857,
    "path": "../public/img/illustrations/layouts/course-11.jpg"
  },
  "/img/illustrations/layouts/course-12.jpg": {
    "type": "image/jpeg",
    "etag": "\"7a6b-wXL80VPe6wv671U40NqkEYFiyU8\"",
    "mtime": "2024-05-16T10:42:14.260Z",
    "size": 31339,
    "path": "../public/img/illustrations/layouts/course-12.jpg"
  },
  "/img/illustrations/layouts/course-2.png": {
    "type": "image/png",
    "etag": "\"7d7d-MQ07zIYoIV9zVeNCpPV1OPnPQsI\"",
    "mtime": "2024-05-16T10:42:15.464Z",
    "size": 32125,
    "path": "../public/img/illustrations/layouts/course-2.png"
  },
  "/img/illustrations/layouts/course-3.jpg": {
    "type": "image/jpeg",
    "etag": "\"7c0a-mCIWE69mEvOEJCajRpGXRWWrl9I\"",
    "mtime": "2024-05-16T10:42:14.540Z",
    "size": 31754,
    "path": "../public/img/illustrations/layouts/course-3.jpg"
  },
  "/img/illustrations/layouts/course-4.png": {
    "type": "image/png",
    "etag": "\"5dfd-UbvJVjGfqrEGUhvecbfzNzd/6SA\"",
    "mtime": "2024-05-16T10:42:14.333Z",
    "size": 24061,
    "path": "../public/img/illustrations/layouts/course-4.png"
  },
  "/img/illustrations/layouts/course-5.jpeg": {
    "type": "image/jpeg",
    "etag": "\"8dc6-Xgf9W4wM3aCF2E1gi9m62bU/+WM\"",
    "mtime": "2024-05-16T10:42:15.538Z",
    "size": 36294,
    "path": "../public/img/illustrations/layouts/course-5.jpeg"
  },
  "/img/illustrations/layouts/course-6.jpg": {
    "type": "image/jpeg",
    "etag": "\"d17b-nUpTVHIFXweQ0pjQMVyjQ3I7lOg\"",
    "mtime": "2024-05-16T10:42:14.840Z",
    "size": 53627,
    "path": "../public/img/illustrations/layouts/course-6.jpg"
  },
  "/img/illustrations/layouts/course-7.png": {
    "type": "image/png",
    "etag": "\"b015-Tq5gc4KvrmfyYJvv3dhYLkrguAI\"",
    "mtime": "2024-05-16T10:42:17.109Z",
    "size": 45077,
    "path": "../public/img/illustrations/layouts/course-7.png"
  },
  "/img/illustrations/layouts/course-9.jpg": {
    "type": "image/jpeg",
    "etag": "\"61e2-EZHVVWa1k4TwNdQ9e1rcU7H18qU\"",
    "mtime": "2024-05-16T10:42:14.962Z",
    "size": 25058,
    "path": "../public/img/illustrations/layouts/course-9.jpg"
  },
  "/img/illustrations/layouts/furniture-1.svg": {
    "type": "image/svg+xml",
    "etag": "\"8cd-TH58Ltwy7/2mXH5rolxVHoZgvyQ\"",
    "mtime": "2024-05-16T10:42:16.152Z",
    "size": 2253,
    "path": "../public/img/illustrations/layouts/furniture-1.svg"
  },
  "/img/illustrations/layouts/furniture-10.svg": {
    "type": "image/svg+xml",
    "etag": "\"dc4-+5vOuyIWd278Aj1bzOvJbI5FQSI\"",
    "mtime": "2024-05-16T10:42:14.508Z",
    "size": 3524,
    "path": "../public/img/illustrations/layouts/furniture-10.svg"
  },
  "/img/illustrations/layouts/furniture-11.svg": {
    "type": "image/svg+xml",
    "etag": "\"ec2-lwnQvAjiC6M0JkHH6pJ3T0N0/ik\"",
    "mtime": "2024-05-16T10:42:16.277Z",
    "size": 3778,
    "path": "../public/img/illustrations/layouts/furniture-11.svg"
  },
  "/img/illustrations/layouts/furniture-12.svg": {
    "type": "image/svg+xml",
    "etag": "\"400a-CNOCgAZJz41PGHdtt2q4nUk85o0\"",
    "mtime": "2024-05-16T10:42:15.093Z",
    "size": 16394,
    "path": "../public/img/illustrations/layouts/furniture-12.svg"
  },
  "/img/illustrations/layouts/furniture-13.svg": {
    "type": "image/svg+xml",
    "etag": "\"733-usoel6OYjRAXUtu3vJ4WnuJHUkw\"",
    "mtime": "2024-05-16T10:42:14.467Z",
    "size": 1843,
    "path": "../public/img/illustrations/layouts/furniture-13.svg"
  },
  "/img/illustrations/layouts/furniture-14.svg": {
    "type": "image/svg+xml",
    "etag": "\"1b60-nPFtIjjXF5S8b/MQj+B4jyYlizg\"",
    "mtime": "2024-05-16T10:42:14.714Z",
    "size": 7008,
    "path": "../public/img/illustrations/layouts/furniture-14.svg"
  },
  "/img/illustrations/layouts/furniture-15.svg": {
    "type": "image/svg+xml",
    "etag": "\"1b8d-iZmMNFHkObcdyvpdAq2pJUxVzfE\"",
    "mtime": "2024-05-16T10:42:16.318Z",
    "size": 7053,
    "path": "../public/img/illustrations/layouts/furniture-15.svg"
  },
  "/img/illustrations/layouts/furniture-16.svg": {
    "type": "image/svg+xml",
    "etag": "\"b04-/bX5pNtCFbDY9Cwrf0ct7IFmVto\"",
    "mtime": "2024-05-16T10:42:15.701Z",
    "size": 2820,
    "path": "../public/img/illustrations/layouts/furniture-16.svg"
  },
  "/img/illustrations/layouts/furniture-17.svg": {
    "type": "image/svg+xml",
    "etag": "\"d40-H4R/gB0GogCnZTzKrPAcmwC1dNM\"",
    "mtime": "2024-05-16T10:42:15.578Z",
    "size": 3392,
    "path": "../public/img/illustrations/layouts/furniture-17.svg"
  },
  "/img/illustrations/layouts/furniture-18.svg": {
    "type": "image/svg+xml",
    "etag": "\"1579-xjUSqh3TKRK1ni8mrKQXTg7ibC4\"",
    "mtime": "2024-05-16T10:42:16.236Z",
    "size": 5497,
    "path": "../public/img/illustrations/layouts/furniture-18.svg"
  },
  "/img/illustrations/layouts/furniture-19.svg": {
    "type": "image/svg+xml",
    "etag": "\"5bfd-P4t/O6BdEWtpZWa1WsD/CY/xbGg\"",
    "mtime": "2024-05-16T10:42:15.005Z",
    "size": 23549,
    "path": "../public/img/illustrations/layouts/furniture-19.svg"
  },
  "/img/illustrations/layouts/furniture-2.svg": {
    "type": "image/svg+xml",
    "etag": "\"1685-d5iWpACMmyueSg2WizmuHHvY9QE\"",
    "mtime": "2024-05-16T10:42:14.884Z",
    "size": 5765,
    "path": "../public/img/illustrations/layouts/furniture-2.svg"
  },
  "/img/illustrations/layouts/furniture-20.svg": {
    "type": "image/svg+xml",
    "etag": "\"148d-qg1grPQgJVu8igLLK82tEKDIG+A\"",
    "mtime": "2024-05-16T10:42:16.196Z",
    "size": 5261,
    "path": "../public/img/illustrations/layouts/furniture-20.svg"
  },
  "/img/illustrations/layouts/furniture-3.svg": {
    "type": "image/svg+xml",
    "etag": "\"2850-7DYD2t2kBMj5LdE4ekBEDxz7Rlw\"",
    "mtime": "2024-05-16T10:42:15.263Z",
    "size": 10320,
    "path": "../public/img/illustrations/layouts/furniture-3.svg"
  },
  "/img/illustrations/layouts/furniture-4.svg": {
    "type": "image/svg+xml",
    "etag": "\"1089-k+9O5XqxBxQgV85RRXa5f/f8Dz8\"",
    "mtime": "2024-05-16T10:42:15.742Z",
    "size": 4233,
    "path": "../public/img/illustrations/layouts/furniture-4.svg"
  },
  "/img/illustrations/layouts/furniture-5.svg": {
    "type": "image/svg+xml",
    "etag": "\"7e6-qP8qMqvCpnSavqE1yGf4Gg6jvOk\"",
    "mtime": "2024-05-16T10:42:15.506Z",
    "size": 2022,
    "path": "../public/img/illustrations/layouts/furniture-5.svg"
  },
  "/img/illustrations/layouts/furniture-6.svg": {
    "type": "image/svg+xml",
    "etag": "\"1c49-GIMgkh6rffvt1pHUo75S2Yd4V08\"",
    "mtime": "2024-05-16T10:42:15.620Z",
    "size": 7241,
    "path": "../public/img/illustrations/layouts/furniture-6.svg"
  },
  "/img/illustrations/layouts/furniture-7.svg": {
    "type": "image/svg+xml",
    "etag": "\"d99-7Qd6N/Nb2O3egI0GHeD+922wxjo\"",
    "mtime": "2024-05-16T10:42:15.952Z",
    "size": 3481,
    "path": "../public/img/illustrations/layouts/furniture-7.svg"
  },
  "/img/illustrations/layouts/furniture-8.svg": {
    "type": "image/svg+xml",
    "etag": "\"159b-Ou+ayv1zPqyx+P2cz6nS77ef+J4\"",
    "mtime": "2024-05-16T10:42:15.430Z",
    "size": 5531,
    "path": "../public/img/illustrations/layouts/furniture-8.svg"
  },
  "/img/illustrations/layouts/furniture-9.svg": {
    "type": "image/svg+xml",
    "etag": "\"a38-ZFa1CcZI+wGjT903J8yFS3uux78\"",
    "mtime": "2024-05-16T10:42:14.581Z",
    "size": 2616,
    "path": "../public/img/illustrations/layouts/furniture-9.svg"
  },
  "/img/illustrations/layouts/post-1.svg": {
    "type": "image/svg+xml",
    "etag": "\"15f40-JLW1loH6OPJE/VAAji3JxJkb3eE\"",
    "mtime": "2024-05-16T10:42:16.570Z",
    "size": 89920,
    "path": "../public/img/illustrations/layouts/post-1.svg"
  },
  "/img/illustrations/layouts/post-10.svg": {
    "type": "image/svg+xml",
    "etag": "\"15cb6-jA8IvxYO+Izibo4M2RSFakjVj74\"",
    "mtime": "2024-05-16T10:42:16.956Z",
    "size": 89270,
    "path": "../public/img/illustrations/layouts/post-10.svg"
  },
  "/img/illustrations/layouts/post-11.svg": {
    "type": "image/svg+xml",
    "etag": "\"779d-N/J60X3zHbPY3xPSDWNYKX4/rTg\"",
    "mtime": "2024-05-16T10:42:16.827Z",
    "size": 30621,
    "path": "../public/img/illustrations/layouts/post-11.svg"
  },
  "/img/illustrations/layouts/post-12.svg": {
    "type": "image/svg+xml",
    "etag": "\"11845-17CL+hX1JMPE3YO4HwBZBZIUob4\"",
    "mtime": "2024-05-16T10:42:15.047Z",
    "size": 71749,
    "path": "../public/img/illustrations/layouts/post-12.svg"
  },
  "/img/illustrations/layouts/post-13.svg": {
    "type": "image/svg+xml",
    "etag": "\"17770-pN9ef1NpES2kB7XSbeCD3SfetaE\"",
    "mtime": "2024-05-16T10:42:16.527Z",
    "size": 96112,
    "path": "../public/img/illustrations/layouts/post-13.svg"
  },
  "/img/illustrations/layouts/post-14.svg": {
    "type": "image/svg+xml",
    "etag": "\"8a83-tp+9dTpx1HQgjD2AGWQBGqsuCHo\"",
    "mtime": "2024-05-16T10:42:15.222Z",
    "size": 35459,
    "path": "../public/img/illustrations/layouts/post-14.svg"
  },
  "/img/illustrations/layouts/post-15.svg": {
    "type": "image/svg+xml",
    "etag": "\"5154-xUT8aci0lEqhIRoHtIxOOQI2I2o\"",
    "mtime": "2024-05-16T10:42:16.614Z",
    "size": 20820,
    "path": "../public/img/illustrations/layouts/post-15.svg"
  },
  "/img/illustrations/layouts/post-16.svg": {
    "type": "image/svg+xml",
    "etag": "\"7414-jQW7AD+FADaoVwp3a6uVUxCwzMY\"",
    "mtime": "2024-05-16T10:42:15.137Z",
    "size": 29716,
    "path": "../public/img/illustrations/layouts/post-16.svg"
  },
  "/img/illustrations/layouts/post-17.svg": {
    "type": "image/svg+xml",
    "etag": "\"5871-aDLBHKHVPxKmqqM/SMTogTWrUuc\"",
    "mtime": "2024-05-16T10:42:16.080Z",
    "size": 22641,
    "path": "../public/img/illustrations/layouts/post-17.svg"
  },
  "/img/illustrations/layouts/post-18.svg": {
    "type": "image/svg+xml",
    "etag": "\"e32c-xxLp7VmH8aosp83l1Tn9ibaesxs\"",
    "mtime": "2024-05-16T10:42:15.388Z",
    "size": 58156,
    "path": "../public/img/illustrations/layouts/post-18.svg"
  },
  "/img/illustrations/layouts/post-19.svg": {
    "type": "image/svg+xml",
    "etag": "\"7f1b-QT+Z3xjQKQUK10v38jQ8uVEoF0s\"",
    "mtime": "2024-05-16T10:42:17.077Z",
    "size": 32539,
    "path": "../public/img/illustrations/layouts/post-19.svg"
  },
  "/img/illustrations/layouts/post-2.svg": {
    "type": "image/svg+xml",
    "etag": "\"126ac-sK63wT/RgP7R61YagvY31T0ymps\"",
    "mtime": "2024-05-16T10:42:15.346Z",
    "size": 75436,
    "path": "../public/img/illustrations/layouts/post-2.svg"
  },
  "/img/illustrations/layouts/post-20.svg": {
    "type": "image/svg+xml",
    "etag": "\"1416e-5W+JMicuqkJ3tzFlf5094UfvY7M\"",
    "mtime": "2024-05-16T10:42:14.668Z",
    "size": 82286,
    "path": "../public/img/illustrations/layouts/post-20.svg"
  },
  "/img/illustrations/layouts/post-3.svg": {
    "type": "image/svg+xml",
    "etag": "\"c196-JStYaTuEgpMF1cHpvqDs6yAT4UM\"",
    "mtime": "2024-05-16T10:42:16.997Z",
    "size": 49558,
    "path": "../public/img/illustrations/layouts/post-3.svg"
  },
  "/img/illustrations/layouts/post-4.svg": {
    "type": "image/svg+xml",
    "etag": "\"12f0c-aMu5Gz1+llPUPkkfBUC4sO1CJkg\"",
    "mtime": "2024-05-16T10:42:16.040Z",
    "size": 77580,
    "path": "../public/img/illustrations/layouts/post-4.svg"
  },
  "/img/illustrations/layouts/post-5.svg": {
    "type": "image/svg+xml",
    "etag": "\"10365-dLy5wNlPp2iCXnNkOL5CXdBjsYw\"",
    "mtime": "2024-05-16T10:42:16.912Z",
    "size": 66405,
    "path": "../public/img/illustrations/layouts/post-5.svg"
  },
  "/img/illustrations/layouts/post-6.svg": {
    "type": "image/svg+xml",
    "etag": "\"11e99-G0lU74j/Dv5RUjeUux2SMIGprag\"",
    "mtime": "2024-05-16T10:42:17.036Z",
    "size": 73369,
    "path": "../public/img/illustrations/layouts/post-6.svg"
  },
  "/img/illustrations/layouts/post-7.svg": {
    "type": "image/svg+xml",
    "etag": "\"a86e-WcmvGBMFvsroN7XNpSThTwzM3AQ\"",
    "mtime": "2024-05-16T10:42:15.869Z",
    "size": 43118,
    "path": "../public/img/illustrations/layouts/post-7.svg"
  },
  "/img/illustrations/layouts/post-8.svg": {
    "type": "image/svg+xml",
    "etag": "\"1a795-Hw5PHpUJvqqeJjDcf052LF+kar8\"",
    "mtime": "2024-05-16T10:42:14.762Z",
    "size": 108437,
    "path": "../public/img/illustrations/layouts/post-8.svg"
  },
  "/img/illustrations/layouts/post-9.svg": {
    "type": "image/svg+xml",
    "etag": "\"cb40-g0P7BJFBldeGjJGw6nPDDluEFIw\"",
    "mtime": "2024-05-16T10:42:15.782Z",
    "size": 52032,
    "path": "../public/img/illustrations/layouts/post-9.svg"
  },
  "/img/illustrations/layouts/rental-1.svg": {
    "type": "image/svg+xml",
    "etag": "\"11f84-NfLDud0NX3vUDAhgUFytX5snFgU\"",
    "mtime": "2024-05-16T10:42:15.661Z",
    "size": 73604,
    "path": "../public/img/illustrations/layouts/rental-1.svg"
  },
  "/img/illustrations/layouts/rental-10.svg": {
    "type": "image/svg+xml",
    "etag": "\"419d-yXnS+1iLY/3S2K6zGOX+NzatW3c\"",
    "mtime": "2024-05-16T10:42:14.379Z",
    "size": 16797,
    "path": "../public/img/illustrations/layouts/rental-10.svg"
  },
  "/img/illustrations/layouts/rental-2.svg": {
    "type": "image/svg+xml",
    "etag": "\"f5e1-XuOxVstFkPSp/+fBrZezlx3KGQs\"",
    "mtime": "2024-05-16T10:42:14.929Z",
    "size": 62945,
    "path": "../public/img/illustrations/layouts/rental-2.svg"
  },
  "/img/illustrations/layouts/rental-3.svg": {
    "type": "image/svg+xml",
    "etag": "\"d4b4-v0aUSUILmq6/iFeeJkw+eravN/M\"",
    "mtime": "2024-05-16T10:42:15.995Z",
    "size": 54452,
    "path": "../public/img/illustrations/layouts/rental-3.svg"
  },
  "/img/illustrations/layouts/rental-4.svg": {
    "type": "image/svg+xml",
    "etag": "\"da9e-yDS/JqBOOb4g/YLc4kFK0/M1zi4\"",
    "mtime": "2024-05-16T10:42:15.910Z",
    "size": 55966,
    "path": "../public/img/illustrations/layouts/rental-4.svg"
  },
  "/img/illustrations/layouts/rental-5.svg": {
    "type": "image/svg+xml",
    "etag": "\"ab21-toJaqgb4cDU+YPxKzQBiJBg9bIo\"",
    "mtime": "2024-05-16T10:42:16.739Z",
    "size": 43809,
    "path": "../public/img/illustrations/layouts/rental-5.svg"
  },
  "/img/illustrations/layouts/rental-6.svg": {
    "type": "image/svg+xml",
    "etag": "\"9104-g7qIYkJWgAiOlUl/RjvkiHDLVD0\"",
    "mtime": "2024-05-16T10:42:16.393Z",
    "size": 37124,
    "path": "../public/img/illustrations/layouts/rental-6.svg"
  },
  "/img/illustrations/layouts/rental-7.svg": {
    "type": "image/svg+xml",
    "etag": "\"bf50-cc+qS42dmRMf2+En0bJ8oQNslkA\"",
    "mtime": "2024-05-16T10:42:16.868Z",
    "size": 48976,
    "path": "../public/img/illustrations/layouts/rental-7.svg"
  },
  "/img/illustrations/layouts/rental-8.svg": {
    "type": "image/svg+xml",
    "etag": "\"602d-F66axTOUoRNeCvHH8o0e8vmio9M\"",
    "mtime": "2024-05-16T10:42:15.827Z",
    "size": 24621,
    "path": "../public/img/illustrations/layouts/rental-8.svg"
  },
  "/img/illustrations/layouts/rental-9.svg": {
    "type": "image/svg+xml",
    "etag": "\"106b9-tWX0bQtIVziC2iObAglSYv3FU/E\"",
    "mtime": "2024-05-16T10:42:14.303Z",
    "size": 67257,
    "path": "../public/img/illustrations/layouts/rental-9.svg"
  },
  "/img/illustrations/onboarding/2fa-app.svg": {
    "type": "image/svg+xml",
    "etag": "\"3512-HokGE/E27GOgYuEn1DalJuT52D4\"",
    "mtime": "2024-05-16T10:42:14.050Z",
    "size": 13586,
    "path": "../public/img/illustrations/onboarding/2fa-app.svg"
  },
  "/img/illustrations/onboarding/2fa-sms.svg": {
    "type": "image/svg+xml",
    "etag": "\"207c-TqWV+rzuSPo4ElbfeSm4VDHxxfY\"",
    "mtime": "2024-05-16T10:42:14.220Z",
    "size": 8316,
    "path": "../public/img/illustrations/onboarding/2fa-sms.svg"
  },
  "/img/illustrations/onboarding/2fa-web.svg": {
    "type": "image/svg+xml",
    "etag": "\"c2e-rawK4tjsIvwjgn9EJ0W30MruKVA\"",
    "mtime": "2024-05-16T10:42:14.092Z",
    "size": 3118,
    "path": "../public/img/illustrations/onboarding/2fa-web.svg"
  },
  "/img/illustrations/onboarding/pricing-1.svg": {
    "type": "image/svg+xml",
    "etag": "\"20ff-Ix9lLsme1+P5ZeGL2jwPq9t5huQ\"",
    "mtime": "2024-05-16T10:42:14.011Z",
    "size": 8447,
    "path": "../public/img/illustrations/onboarding/pricing-1.svg"
  },
  "/img/illustrations/onboarding/pricing-2.svg": {
    "type": "image/svg+xml",
    "etag": "\"45ee-Xrw1JohYeRBn9sg2jJezEo5NwGs\"",
    "mtime": "2024-05-16T10:42:14.177Z",
    "size": 17902,
    "path": "../public/img/illustrations/onboarding/pricing-2.svg"
  },
  "/img/illustrations/onboarding/pricing-3.svg": {
    "type": "image/svg+xml",
    "etag": "\"5292-AbGaA7JvvfRTt+AhZ793xDF/bvU\"",
    "mtime": "2024-05-16T10:42:14.135Z",
    "size": 21138,
    "path": "../public/img/illustrations/onboarding/pricing-3.svg"
  },
  "/img/illustrations/switcher/layout-collapse-curved-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"a87-+W8jM1IMHdolGenCV2VzRmw7Y3w\"",
    "mtime": "2024-05-16T10:42:21.890Z",
    "size": 2695,
    "path": "../public/img/illustrations/switcher/layout-collapse-curved-dark.svg"
  },
  "/img/illustrations/switcher/layout-collapse-curved.svg": {
    "type": "image/svg+xml",
    "etag": "\"a3f-GPi46JhqD/PkbKQ4IYsvavjVxZc\"",
    "mtime": "2024-05-16T10:42:21.772Z",
    "size": 2623,
    "path": "../public/img/illustrations/switcher/layout-collapse-curved.svg"
  },
  "/img/illustrations/switcher/layout-collapse-default-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"a49-MPghdziDFIx/ZXEFKynJE6atJSQ\"",
    "mtime": "2024-05-16T10:42:22.032Z",
    "size": 2633,
    "path": "../public/img/illustrations/switcher/layout-collapse-default-dark.svg"
  },
  "/img/illustrations/switcher/layout-collapse-default.svg": {
    "type": "image/svg+xml",
    "etag": "\"a01-MOG7Q/qmyxCJUnNSsCdmwFNfP98\"",
    "mtime": "2024-05-16T10:42:21.922Z",
    "size": 2561,
    "path": "../public/img/illustrations/switcher/layout-collapse-default.svg"
  },
  "/img/illustrations/switcher/layout-iconnav-default-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"a2f-X1XI7Tqu9FITvk1X+3A29HxboD8\"",
    "mtime": "2024-05-16T10:42:21.708Z",
    "size": 2607,
    "path": "../public/img/illustrations/switcher/layout-iconnav-default-dark.svg"
  },
  "/img/illustrations/switcher/layout-iconnav-default.svg": {
    "type": "image/svg+xml",
    "etag": "\"a2f-SzW/ep+LQpQQwFsg/jdAoUG4JOU\"",
    "mtime": "2024-05-16T10:42:21.858Z",
    "size": 2607,
    "path": "../public/img/illustrations/switcher/layout-iconnav-default.svg"
  },
  "/img/illustrations/switcher/layout-sidebar-default-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"949-XQdl+2+H3K5fmF+tvL/IBItwWsY\"",
    "mtime": "2024-05-16T10:42:21.999Z",
    "size": 2377,
    "path": "../public/img/illustrations/switcher/layout-sidebar-default-dark.svg"
  },
  "/img/illustrations/switcher/layout-sidebar-default.svg": {
    "type": "image/svg+xml",
    "etag": "\"949-Thb/e7UAxfT4P72vuGEG6t4DfGc\"",
    "mtime": "2024-05-16T10:42:21.814Z",
    "size": 2377,
    "path": "../public/img/illustrations/switcher/layout-sidebar-default.svg"
  },
  "/img/illustrations/switcher/layout-topnav-default-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"a8d-MTqAZkHBCU+ytBhNtqxV8eIhtDc\"",
    "mtime": "2024-05-16T10:42:21.955Z",
    "size": 2701,
    "path": "../public/img/illustrations/switcher/layout-topnav-default-dark.svg"
  },
  "/img/illustrations/switcher/layout-topnav-default.svg": {
    "type": "image/svg+xml",
    "etag": "\"a2f-/PP1W2trHNEgPYpWSnz0ALvjwXg\"",
    "mtime": "2024-05-16T10:42:21.740Z",
    "size": 2607,
    "path": "../public/img/illustrations/switcher/layout-topnav-default.svg"
  },
  "/img/illustrations/system/404-1.svg": {
    "type": "image/svg+xml",
    "etag": "\"56a98-eo5bIiwQ2Xmz6kNoBnOwvp04iX0\"",
    "mtime": "2024-05-16T10:42:19.158Z",
    "size": 354968,
    "path": "../public/img/illustrations/system/404-1.svg"
  },
  "/img/illustrations/ui/cashback.svg": {
    "type": "image/svg+xml",
    "etag": "\"4741-0kW216mxPViihGohdBXv0XMgLuU\"",
    "mtime": "2024-05-16T10:42:19.549Z",
    "size": 18241,
    "path": "../public/img/illustrations/ui/cashback.svg"
  },
  "/img/illustrations/ui/collapse-layout-master-dark.png": {
    "type": "image/png",
    "etag": "\"2fce4-/6XE1NE4HQhGVZK85+Ai3H2wGro\"",
    "mtime": "2024-05-16T10:42:19.584Z",
    "size": 195812,
    "path": "../public/img/illustrations/ui/collapse-layout-master-dark.png"
  },
  "/img/illustrations/ui/collapse-layout-master.png": {
    "type": "image/png",
    "etag": "\"307c7-P0zBvHfoXSFtP3gECrLlix4aBus\"",
    "mtime": "2024-05-16T10:42:19.753Z",
    "size": 198599,
    "path": "../public/img/illustrations/ui/collapse-layout-master.png"
  },
  "/img/illustrations/ui/iconnav-layout-master-dark.png": {
    "type": "image/png",
    "etag": "\"2c267-JpgjRbwceolyZ4zCSW0L55cPC9c\"",
    "mtime": "2024-05-16T10:42:19.819Z",
    "size": 180839,
    "path": "../public/img/illustrations/ui/iconnav-layout-master-dark.png"
  },
  "/img/illustrations/ui/iconnav-layout-master.png": {
    "type": "image/png",
    "etag": "\"2bff0-jPnSgMC9fPDPfzOIpC5lwxs0R3A\"",
    "mtime": "2024-05-16T10:42:19.720Z",
    "size": 180208,
    "path": "../public/img/illustrations/ui/iconnav-layout-master.png"
  },
  "/img/illustrations/ui/invest.svg": {
    "type": "image/svg+xml",
    "etag": "\"1875d-vATKc8UtX5o2zmiKqFgh78Pnlfc\"",
    "mtime": "2024-05-16T10:42:19.653Z",
    "size": 100189,
    "path": "../public/img/illustrations/ui/invest.svg"
  },
  "/img/illustrations/ui/recurring.svg": {
    "type": "image/svg+xml",
    "etag": "\"5320-oritTtNT5Um/SF8XKD6nWLP9xZo\"",
    "mtime": "2024-05-16T10:42:19.508Z",
    "size": 21280,
    "path": "../public/img/illustrations/ui/recurring.svg"
  },
  "/img/illustrations/ui/sidebar-layout-master-dark.png": {
    "type": "image/png",
    "etag": "\"38c45-2v8tmk7Vo9DSfBCRwVmgvWHWgH4\"",
    "mtime": "2024-05-16T10:42:19.854Z",
    "size": 232517,
    "path": "../public/img/illustrations/ui/sidebar-layout-master-dark.png"
  },
  "/img/illustrations/ui/sidebar-layout-master.png": {
    "type": "image/png",
    "etag": "\"38467-FB0t95n1RzXZnSfxvl5n6z9YR+I\"",
    "mtime": "2024-05-16T10:42:19.466Z",
    "size": 230503,
    "path": "../public/img/illustrations/ui/sidebar-layout-master.png"
  },
  "/img/illustrations/ui/topnav-layout-master-dark.png": {
    "type": "image/png",
    "etag": "\"2aab3-5yvpBRVm+lLQd8ixmd82KoMS2FA\"",
    "mtime": "2024-05-16T10:42:19.787Z",
    "size": 174771,
    "path": "../public/img/illustrations/ui/topnav-layout-master-dark.png"
  },
  "/img/illustrations/ui/topnav-layout-master.png": {
    "type": "image/png",
    "etag": "\"2aa31-UBP7pdceF4IpSL1xmNvyx0oeM2c\"",
    "mtime": "2024-05-16T10:42:19.687Z",
    "size": 174641,
    "path": "../public/img/illustrations/ui/topnav-layout-master.png"
  },
  "/img/illustrations/widgets/1.svg": {
    "type": "image/svg+xml",
    "etag": "\"4fdf-Wx84D+EzUD0a6f48EnaC43ISpz4\"",
    "mtime": "2024-05-16T10:42:22.394Z",
    "size": 20447,
    "path": "../public/img/illustrations/widgets/1.svg"
  },
  "/img/illustrations/widgets/2.svg": {
    "type": "image/svg+xml",
    "etag": "\"4b65-GK/SglPNmxpukl0AdgBlhbJKbuI\"",
    "mtime": "2024-05-16T10:42:22.350Z",
    "size": 19301,
    "path": "../public/img/illustrations/widgets/2.svg"
  },
  "/img/illustrations/widgets/3.svg": {
    "type": "image/svg+xml",
    "etag": "\"1ffd-GxHWfUca2bvZjD5VH3KISjMpU4Y\"",
    "mtime": "2024-05-16T10:42:22.257Z",
    "size": 8189,
    "path": "../public/img/illustrations/widgets/3.svg"
  },
  "/img/illustrations/widgets/4.svg": {
    "type": "image/svg+xml",
    "etag": "\"4a01-+PIamQ/M4/AeF1/3C7jYi8APtcA\"",
    "mtime": "2024-05-16T10:42:22.438Z",
    "size": 18945,
    "path": "../public/img/illustrations/widgets/4.svg"
  },
  "/img/illustrations/widgets/5.svg": {
    "type": "image/svg+xml",
    "etag": "\"7d60-jnPqCUOOM996rzr7ZaMfVoMAk0c\"",
    "mtime": "2024-05-16T10:42:22.299Z",
    "size": 32096,
    "path": "../public/img/illustrations/widgets/5.svg"
  },
  "/img/illustrations/widgets/6.svg": {
    "type": "image/svg+xml",
    "etag": "\"679d-MHapjQv+yHI5d2AQC3U4XXyq3IQ\"",
    "mtime": "2024-05-16T10:42:22.172Z",
    "size": 26525,
    "path": "../public/img/illustrations/widgets/6.svg"
  },
  "/img/illustrations/widgets/7.svg": {
    "type": "image/svg+xml",
    "etag": "\"5290-BsB6tEcxTmg08CtYFFOtOOx/tfI\"",
    "mtime": "2024-05-16T10:42:22.085Z",
    "size": 21136,
    "path": "../public/img/illustrations/widgets/7.svg"
  },
  "/img/illustrations/widgets/8.svg": {
    "type": "image/svg+xml",
    "etag": "\"7d85-4XoMZ72/XIXzH7zunQ4Gw75Ga8k\"",
    "mtime": "2024-05-16T10:42:22.529Z",
    "size": 32133,
    "path": "../public/img/illustrations/widgets/8.svg"
  },
  "/img/illustrations/widgets/mountain-picture.svg": {
    "type": "image/svg+xml",
    "etag": "\"1e2b9e-ndNC8D4tCD80a885xl2AlhqNsSA\"",
    "mtime": "2024-05-16T10:42:22.596Z",
    "size": 1977246,
    "path": "../public/img/illustrations/widgets/mountain-picture.svg"
  },
  "/img/illustrations/widgets/watch-1.svg": {
    "type": "image/svg+xml",
    "etag": "\"379e-9JApdpWssBefsoGfarWecOmKBJI\"",
    "mtime": "2024-05-16T10:42:22.215Z",
    "size": 14238,
    "path": "../public/img/illustrations/widgets/watch-1.svg"
  },
  "/img/illustrations/widgets/watch-2.svg": {
    "type": "image/svg+xml",
    "etag": "\"379e-9qQ2kHt6vzCDBKHkocAD0NwSFLA\"",
    "mtime": "2024-05-16T10:42:22.125Z",
    "size": 14238,
    "path": "../public/img/illustrations/widgets/watch-2.svg"
  },
  "/img/illustrations/widgets/watch-3.svg": {
    "type": "image/svg+xml",
    "etag": "\"379e-XwOWSvNu2AQqxV5qMXNA80lcGcs\"",
    "mtime": "2024-05-16T10:42:22.487Z",
    "size": 14238,
    "path": "../public/img/illustrations/widgets/watch-3.svg"
  },
  "/img/illustrations/wizard/design.svg": {
    "type": "image/svg+xml",
    "etag": "\"48e8-ykr66lazw2ounDgFhJm7bl+YAKY\"",
    "mtime": "2024-05-16T10:42:19.252Z",
    "size": 18664,
    "path": "../public/img/illustrations/wizard/design.svg"
  },
  "/img/illustrations/wizard/development.svg": {
    "type": "image/svg+xml",
    "etag": "\"594c-OxfuJUJxa/uZX14XUfByM1y/1tc\"",
    "mtime": "2024-05-16T10:42:19.209Z",
    "size": 22860,
    "path": "../public/img/illustrations/wizard/development.svg"
  },
  "/img/illustrations/wizard/finish.svg": {
    "type": "image/svg+xml",
    "etag": "\"76fb-nUPfr4KeXhCym7PQUUW9Xcx5E7o\"",
    "mtime": "2024-05-16T10:42:19.294Z",
    "size": 30459,
    "path": "../public/img/illustrations/wizard/finish.svg"
  },
  "/img/illustrations/wizard/marketing.svg": {
    "type": "image/svg+xml",
    "etag": "\"3b9f-/aDKXhkGhY7wlps5KkGzTQZg2KI\"",
    "mtime": "2024-05-16T10:42:19.380Z",
    "size": 15263,
    "path": "../public/img/illustrations/wizard/marketing.svg"
  },
  "/img/illustrations/wizard/team.svg": {
    "type": "image/svg+xml",
    "etag": "\"602b-3xv5LgOnBrx/MFlZFjyYvvIbTrY\"",
    "mtime": "2024-05-16T10:42:19.423Z",
    "size": 24619,
    "path": "../public/img/illustrations/wizard/team.svg"
  },
  "/img/illustrations/wizard/upload.svg": {
    "type": "image/svg+xml",
    "etag": "\"6bcb-tzW+LGvw1JWWqPT1WIcg5NBXmTw\"",
    "mtime": "2024-05-16T10:42:19.338Z",
    "size": 27595,
    "path": "../public/img/illustrations/wizard/upload.svg"
  },
  "/img/logos/brands/airbnb.svg": {
    "type": "image/svg+xml",
    "etag": "\"7e4-iHsrqOhy2AUzjz7Tfv+58fQqF+w\"",
    "mtime": "2024-05-16T10:42:38.055Z",
    "size": 2020,
    "path": "../public/img/logos/brands/airbnb.svg"
  },
  "/img/logos/brands/atlassian.svg": {
    "type": "image/svg+xml",
    "etag": "\"49e-3Gss3paS4kgHwe0beqdaR1eD6NQ\"",
    "mtime": "2024-05-16T10:42:37.880Z",
    "size": 1182,
    "path": "../public/img/logos/brands/atlassian.svg"
  },
  "/img/logos/brands/dribbble.svg": {
    "type": "image/svg+xml",
    "etag": "\"5bd-TMGWOnui5DvBJN9E3URPUYT522w\"",
    "mtime": "2024-05-16T10:42:37.836Z",
    "size": 1469,
    "path": "../public/img/logos/brands/dribbble.svg"
  },
  "/img/logos/brands/facebook.svg": {
    "type": "image/svg+xml",
    "etag": "\"255-ZyTh1IagFlv1+70rQx3+Xmx/5J0\"",
    "mtime": "2024-05-16T10:42:37.570Z",
    "size": 597,
    "path": "../public/img/logos/brands/facebook.svg"
  },
  "/img/logos/brands/figma.svg": {
    "type": "image/svg+xml",
    "etag": "\"47e-GJzjR238tgv1ZLMEAFhWtN14ZKg\"",
    "mtime": "2024-05-16T10:42:38.530Z",
    "size": 1150,
    "path": "../public/img/logos/brands/figma.svg"
  },
  "/img/logos/brands/github.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c5-Mcvcwiv0Z7qkgzsDuL8fiv7zefo\"",
    "mtime": "2024-05-16T10:42:37.792Z",
    "size": 965,
    "path": "../public/img/logos/brands/github.svg"
  },
  "/img/logos/brands/gitlab.svg": {
    "type": "image/svg+xml",
    "etag": "\"405-mhE/qNvB4J7DWvbMgz6gUpTimSQ\"",
    "mtime": "2024-05-16T10:42:37.969Z",
    "size": 1029,
    "path": "../public/img/logos/brands/gitlab.svg"
  },
  "/img/logos/brands/google.svg": {
    "type": "image/svg+xml",
    "etag": "\"45a-ZicnJFv5EoFnl8n+6ITC99TeUM4\"",
    "mtime": "2024-05-16T10:42:38.012Z",
    "size": 1114,
    "path": "../public/img/logos/brands/google.svg"
  },
  "/img/logos/brands/hanzo.svg": {
    "type": "image/svg+xml",
    "etag": "\"149a-jOiDsgiuMJGv5htPruq3l1gaWwM\"",
    "mtime": "2024-05-16T10:42:38.142Z",
    "size": 5274,
    "path": "../public/img/logos/brands/hanzo.svg"
  },
  "/img/logos/brands/hubspot.svg": {
    "type": "image/svg+xml",
    "etag": "\"445-XQ4IxdEHXNABDoxjKITBeusDTo8\"",
    "mtime": "2024-05-16T10:42:37.923Z",
    "size": 1093,
    "path": "../public/img/logos/brands/hubspot.svg"
  },
  "/img/logos/brands/jira.svg": {
    "type": "image/svg+xml",
    "etag": "\"627-knRoLZct2QEM/CzQse1Up/sBE6U\"",
    "mtime": "2024-05-16T10:42:37.660Z",
    "size": 1575,
    "path": "../public/img/logos/brands/jira.svg"
  },
  "/img/logos/brands/nuxt-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"9c6-GxTWY+gneAZGSGy5ydja3wow8VM\"",
    "mtime": "2024-05-16T10:42:37.749Z",
    "size": 2502,
    "path": "../public/img/logos/brands/nuxt-dark.svg"
  },
  "/img/logos/brands/nuxt-light.svg": {
    "type": "image/svg+xml",
    "etag": "\"9e2-l+KeWBoX+EzfvPcRWsezBd8LBaE\"",
    "mtime": "2024-05-16T10:42:38.619Z",
    "size": 2530,
    "path": "../public/img/logos/brands/nuxt-light.svg"
  },
  "/img/logos/brands/office.svg": {
    "type": "image/svg+xml",
    "etag": "\"28c-nsujdXoVLQUXtq2gH8LUHHMCebY\"",
    "mtime": "2024-05-16T10:42:38.315Z",
    "size": 652,
    "path": "../public/img/logos/brands/office.svg"
  },
  "/img/logos/brands/shuriken-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"1655-cDnsWfwLvQf8paDi+5LLUz8BTyo\"",
    "mtime": "2024-05-16T10:42:38.670Z",
    "size": 5717,
    "path": "../public/img/logos/brands/shuriken-dark.svg"
  },
  "/img/logos/brands/shuriken-gradient-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"fc4-bZcMGygjXCL4JMao5RN1Ve9RCk8\"",
    "mtime": "2024-05-16T10:42:38.358Z",
    "size": 4036,
    "path": "../public/img/logos/brands/shuriken-gradient-dark.svg"
  },
  "/img/logos/brands/shuriken-gradient-light.svg": {
    "type": "image/svg+xml",
    "etag": "\"fcd-SS3rC7OWFFo5LFlzuEgpiUz4b1E\"",
    "mtime": "2024-05-16T10:42:37.615Z",
    "size": 4045,
    "path": "../public/img/logos/brands/shuriken-gradient-light.svg"
  },
  "/img/logos/brands/shuriken-gradient.svg": {
    "type": "image/svg+xml",
    "etag": "\"535-Nj1IebRLnODai24o3yt0mVXqxAs\"",
    "mtime": "2024-05-16T10:42:37.706Z",
    "size": 1333,
    "path": "../public/img/logos/brands/shuriken-gradient.svg"
  },
  "/img/logos/brands/shuriken-light.svg": {
    "type": "image/svg+xml",
    "etag": "\"163f-+/gOicMiK2CwKapN1NV6b7sjISU\"",
    "mtime": "2024-05-16T10:42:38.487Z",
    "size": 5695,
    "path": "../public/img/logos/brands/shuriken-light.svg"
  },
  "/img/logos/brands/slack.svg": {
    "type": "image/svg+xml",
    "etag": "\"683-D2K17i45lHrG3RiE3xODNLi9Pnw\"",
    "mtime": "2024-05-16T10:42:38.401Z",
    "size": 1667,
    "path": "../public/img/logos/brands/slack.svg"
  },
  "/img/logos/brands/tailwindcss-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"12ea-iRlcJEWuR5awezlgg20Cw5VleHg\"",
    "mtime": "2024-05-16T10:42:38.230Z",
    "size": 4842,
    "path": "../public/img/logos/brands/tailwindcss-dark.svg"
  },
  "/img/logos/brands/tailwindcss-light.svg": {
    "type": "image/svg+xml",
    "etag": "\"1288-GQ6jepWogkE6Ebzs/4LVVAVFoLo\"",
    "mtime": "2024-05-16T10:42:38.273Z",
    "size": 4744,
    "path": "../public/img/logos/brands/tailwindcss-light.svg"
  },
  "/img/logos/brands/tnw.svg": {
    "type": "image/svg+xml",
    "etag": "\"3ab-w0HZBZaIC0cQmXW5wxa9AzN2/qQ\"",
    "mtime": "2024-05-16T10:42:38.573Z",
    "size": 939,
    "path": "../public/img/logos/brands/tnw.svg"
  },
  "/img/logos/brands/typescript-text.svg": {
    "type": "image/svg+xml",
    "etag": "\"d64-0hOFDH30gMbcDW6socU2D+yjkKI\"",
    "mtime": "2024-05-16T10:42:38.714Z",
    "size": 3428,
    "path": "../public/img/logos/brands/typescript-text.svg"
  },
  "/img/logos/brands/udemy-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"513-AjpcThDnzNGi3kWgcA4C/YcCgMs\"",
    "mtime": "2024-05-16T10:42:38.187Z",
    "size": 1299,
    "path": "../public/img/logos/brands/udemy-dark.svg"
  },
  "/img/logos/brands/udemy.svg": {
    "type": "image/svg+xml",
    "etag": "\"513-+Y9GPAoVuwf/1UkQI74MKaYr3qM\"",
    "mtime": "2024-05-16T10:42:38.444Z",
    "size": 1299,
    "path": "../public/img/logos/brands/udemy.svg"
  },
  "/img/logos/brands/xd.svg": {
    "type": "image/svg+xml",
    "etag": "\"4e6-UFZRfdQ4JWGV8tvSjaipRae54X4\"",
    "mtime": "2024-05-16T10:42:38.099Z",
    "size": 1254,
    "path": "../public/img/logos/brands/xd.svg"
  },
  "/img/logos/companies/airbnb.svg": {
    "type": "image/svg+xml",
    "etag": "\"66f-cfOv+i4335WpKna5YoYHKzBiZFQ\"",
    "mtime": "2024-05-16T10:42:39.902Z",
    "size": 1647,
    "path": "../public/img/logos/companies/airbnb.svg"
  },
  "/img/logos/companies/amazon.svg": {
    "type": "image/svg+xml",
    "etag": "\"81f-XYSLhoUvdiLo87pW4JGHFXxKxA4\"",
    "mtime": "2024-05-16T10:42:40.071Z",
    "size": 2079,
    "path": "../public/img/logos/companies/amazon.svg"
  },
  "/img/logos/companies/apple.svg": {
    "type": "image/svg+xml",
    "etag": "\"245-Zu2h7LS+9/D3QHe2USvyEHxf0+U\"",
    "mtime": "2024-05-16T10:42:39.614Z",
    "size": 581,
    "path": "../public/img/logos/companies/apple.svg"
  },
  "/img/logos/companies/atlassian.svg": {
    "type": "image/svg+xml",
    "etag": "\"385-s5v3QLeR3PKc68fnz623hS9S/C4\"",
    "mtime": "2024-05-16T10:42:39.408Z",
    "size": 901,
    "path": "../public/img/logos/companies/atlassian.svg"
  },
  "/img/logos/companies/att.svg": {
    "type": "image/svg+xml",
    "etag": "\"703-hojmCWkZANEzefbr2cFmKesZjbg\"",
    "mtime": "2024-05-16T10:42:40.441Z",
    "size": 1795,
    "path": "../public/img/logos/companies/att.svg"
  },
  "/img/logos/companies/bank-of-america-full.svg": {
    "type": "image/svg+xml",
    "etag": "\"401-SmcwCWdIz30MlKF2zJNb3nbsSwY\"",
    "mtime": "2024-05-16T10:42:40.234Z",
    "size": 1025,
    "path": "../public/img/logos/companies/bank-of-america-full.svg"
  },
  "/img/logos/companies/bank-of-america.svg": {
    "type": "image/svg+xml",
    "etag": "\"3ec-IjRI9/JBWE42ZuNSZAvc+zSFE8w\"",
    "mtime": "2024-05-16T10:42:39.694Z",
    "size": 1004,
    "path": "../public/img/logos/companies/bank-of-america.svg"
  },
  "/img/logos/companies/chase-full.svg": {
    "type": "image/svg+xml",
    "etag": "\"1ac-D/SX1NP5sLCYGNATSW/HqdMduf8\"",
    "mtime": "2024-05-16T10:42:40.481Z",
    "size": 428,
    "path": "../public/img/logos/companies/chase-full.svg"
  },
  "/img/logos/companies/chase.svg": {
    "type": "image/svg+xml",
    "etag": "\"1ab-x2DD5L3J2yyzbv1pXVf+mauNhdk\"",
    "mtime": "2024-05-16T10:42:39.818Z",
    "size": 427,
    "path": "../public/img/logos/companies/chase.svg"
  },
  "/img/logos/companies/eurasian-full.svg": {
    "type": "image/svg+xml",
    "etag": "\"634-qnUv1WS4xrMwe6ekAGNgtMFgXTQ\"",
    "mtime": "2024-05-16T10:42:40.566Z",
    "size": 1588,
    "path": "../public/img/logos/companies/eurasian-full.svg"
  },
  "/img/logos/companies/eurasian.svg": {
    "type": "image/svg+xml",
    "etag": "\"5b8-PkXUQyyv1Dd/NYCREw8/kV8vfH8\"",
    "mtime": "2024-05-16T10:42:40.608Z",
    "size": 1464,
    "path": "../public/img/logos/companies/eurasian.svg"
  },
  "/img/logos/companies/freshbooks-full.svg": {
    "type": "image/svg+xml",
    "etag": "\"281-YT0Xvf68vB2lDLzTiBwYI8Wmtak\"",
    "mtime": "2024-05-16T10:42:40.111Z",
    "size": 641,
    "path": "../public/img/logos/companies/freshbooks-full.svg"
  },
  "/img/logos/companies/freshbooks.svg": {
    "type": "image/svg+xml",
    "etag": "\"227-s42nV3YwnHM/W5qjLCLP3JJWnic\"",
    "mtime": "2024-05-16T10:42:39.574Z",
    "size": 551,
    "path": "../public/img/logos/companies/freshbooks.svg"
  },
  "/img/logos/companies/gitlab.svg": {
    "type": "image/svg+xml",
    "etag": "\"285-bZIdzjwMaKP50zuNBhez2lfMHa4\"",
    "mtime": "2024-05-16T10:42:39.533Z",
    "size": 645,
    "path": "../public/img/logos/companies/gitlab.svg"
  },
  "/img/logos/companies/google-full.svg": {
    "type": "image/svg+xml",
    "etag": "\"392-vMoM04e2W6f2es1gaYyAhVbyjYo\"",
    "mtime": "2024-05-16T10:42:40.028Z",
    "size": 914,
    "path": "../public/img/logos/companies/google-full.svg"
  },
  "/img/logos/companies/google.svg": {
    "type": "image/svg+xml",
    "etag": "\"324-qFdzd3D9CejVI+q15D7vdj6RI1s\"",
    "mtime": "2024-05-16T10:42:39.654Z",
    "size": 804,
    "path": "../public/img/logos/companies/google.svg"
  },
  "/img/logos/companies/kaspi-full.svg": {
    "type": "image/svg+xml",
    "etag": "\"43a-VukjuyRjNWxr/AG+kCyudk+I9vg\"",
    "mtime": "2024-05-16T10:42:40.358Z",
    "size": 1082,
    "path": "../public/img/logos/companies/kaspi-full.svg"
  },
  "/img/logos/companies/kaspi.svg": {
    "type": "image/svg+xml",
    "etag": "\"414-FFDtQEtGqKEtktorwj5EvldsuDA\"",
    "mtime": "2024-05-16T10:42:39.986Z",
    "size": 1044,
    "path": "../public/img/logos/companies/kaspi.svg"
  },
  "/img/logos/companies/monday.svg": {
    "type": "image/svg+xml",
    "etag": "\"26e-MjqF6EVKkzms7jiRHyBBae9WB5k\"",
    "mtime": "2024-05-16T10:42:40.399Z",
    "size": 622,
    "path": "../public/img/logos/companies/monday.svg"
  },
  "/img/logos/companies/paypal-full.svg": {
    "type": "image/svg+xml",
    "etag": "\"61a-8bTqXgjAZftw6B4vubMfnwGfNIM\"",
    "mtime": "2024-05-16T10:42:40.153Z",
    "size": 1562,
    "path": "../public/img/logos/companies/paypal-full.svg"
  },
  "/img/logos/companies/paypal.svg": {
    "type": "image/svg+xml",
    "etag": "\"5ba-X4W4uuq8v7PvALfxaF1AF5J4SlA\"",
    "mtime": "2024-05-16T10:42:40.316Z",
    "size": 1466,
    "path": "../public/img/logos/companies/paypal.svg"
  },
  "/img/logos/companies/quickbooks-full.svg": {
    "type": "image/svg+xml",
    "etag": "\"1f1-9DUG2NXS0ZSfjLaIw7enaPsNxwA\"",
    "mtime": "2024-05-16T10:42:40.273Z",
    "size": 497,
    "path": "../public/img/logos/companies/quickbooks-full.svg"
  },
  "/img/logos/companies/quickbooks.svg": {
    "type": "image/svg+xml",
    "etag": "\"1e1-V+9JwQm4B4WaLsxu3GTvGB4RWfA\"",
    "mtime": "2024-05-16T10:42:39.735Z",
    "size": 481,
    "path": "../public/img/logos/companies/quickbooks.svg"
  },
  "/img/logos/companies/spotify.svg": {
    "type": "image/svg+xml",
    "etag": "\"283-x8DUhAJ5FlK2Q0vnPB+/u8jI4vM\"",
    "mtime": "2024-05-16T10:42:39.321Z",
    "size": 643,
    "path": "../public/img/logos/companies/spotify.svg"
  },
  "/img/logos/companies/stripe-full.svg": {
    "type": "image/svg+xml",
    "etag": "\"235-gx9jTjQo2qSodMcS3fLokrOkYo0\"",
    "mtime": "2024-05-16T10:42:39.450Z",
    "size": 565,
    "path": "../public/img/logos/companies/stripe-full.svg"
  },
  "/img/logos/companies/stripe.svg": {
    "type": "image/svg+xml",
    "etag": "\"1db-bCj0cRvRoFZEiPJdYuXO7CnYyPc\"",
    "mtime": "2024-05-16T10:42:39.365Z",
    "size": 475,
    "path": "../public/img/logos/companies/stripe.svg"
  },
  "/img/logos/companies/td-full.svg": {
    "type": "image/svg+xml",
    "etag": "\"247-t1lXWO8J6O6jcNs0SULL2DmoqMU\"",
    "mtime": "2024-05-16T10:42:39.859Z",
    "size": 583,
    "path": "../public/img/logos/companies/td-full.svg"
  },
  "/img/logos/companies/td.svg": {
    "type": "image/svg+xml",
    "etag": "\"22f-7LaFxVceDOf6SbMElASSVcNh/dU\"",
    "mtime": "2024-05-16T10:42:39.942Z",
    "size": 559,
    "path": "../public/img/logos/companies/td.svg"
  },
  "/img/logos/companies/ups.svg": {
    "type": "image/svg+xml",
    "etag": "\"6b6-9fai883GmsKR9FGtZVgVJ5IO2xM\"",
    "mtime": "2024-05-16T10:42:39.777Z",
    "size": 1718,
    "path": "../public/img/logos/companies/ups.svg"
  },
  "/img/logos/companies/xero-full.svg": {
    "type": "image/svg+xml",
    "etag": "\"4a1-uI8NnMSs4Ik6P2o9ifvhEB+my9M\"",
    "mtime": "2024-05-16T10:42:40.650Z",
    "size": 1185,
    "path": "../public/img/logos/companies/xero-full.svg"
  },
  "/img/logos/companies/xero.svg": {
    "type": "image/svg+xml",
    "etag": "\"4c6-euBd4Z1iNkF7u58SmVYlH/FxX1c\"",
    "mtime": "2024-05-16T10:42:39.491Z",
    "size": 1222,
    "path": "../public/img/logos/companies/xero.svg"
  },
  "/img/logos/companies/zapier-full.svg": {
    "type": "image/svg+xml",
    "etag": "\"409-O25kJKartqjOv82YKIPdrOhO2tc\"",
    "mtime": "2024-05-16T10:42:40.522Z",
    "size": 1033,
    "path": "../public/img/logos/companies/zapier-full.svg"
  },
  "/img/logos/companies/zapier.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c4-KzPWwnoecWp/CCOw5WrPNo2aNKY\"",
    "mtime": "2024-05-16T10:42:40.191Z",
    "size": 964,
    "path": "../public/img/logos/companies/zapier.svg"
  },
  "/img/logos/stacks/android.svg": {
    "type": "image/svg+xml",
    "etag": "\"3fd-raSPSb5iH2EJsjs0NiZkrE9O6Ls\"",
    "mtime": "2024-05-16T10:42:37.011Z",
    "size": 1021,
    "path": "../public/img/logos/stacks/android.svg"
  },
  "/img/logos/stacks/bulma.svg": {
    "type": "image/svg+xml",
    "etag": "\"24e-nKGJYRJyCsd39N4pH8kDz83D8v0\"",
    "mtime": "2024-05-16T10:42:36.887Z",
    "size": 590,
    "path": "../public/img/logos/stacks/bulma.svg"
  },
  "/img/logos/stacks/css3.svg": {
    "type": "image/svg+xml",
    "etag": "\"32b-A5OKQDKoGgLtQy4XQbqZI1OUHIA\"",
    "mtime": "2024-05-16T10:42:37.094Z",
    "size": 811,
    "path": "../public/img/logos/stacks/css3.svg"
  },
  "/img/logos/stacks/flutter.svg": {
    "type": "image/svg+xml",
    "etag": "\"390-cDNBZBrfA7UZpqWD0PqUzFHqahI\"",
    "mtime": "2024-05-16T10:42:37.350Z",
    "size": 912,
    "path": "../public/img/logos/stacks/flutter.svg"
  },
  "/img/logos/stacks/html5.svg": {
    "type": "image/svg+xml",
    "etag": "\"41e-E4n30/m2e9kJBxG1g3KrpX2tUvU\"",
    "mtime": "2024-05-16T10:42:36.971Z",
    "size": 1054,
    "path": "../public/img/logos/stacks/html5.svg"
  },
  "/img/logos/stacks/illustrator.svg": {
    "type": "image/svg+xml",
    "etag": "\"493-/bnRvP6A0Z1UxpBPYlPuaEG1Q8U\"",
    "mtime": "2024-05-16T10:42:37.435Z",
    "size": 1171,
    "path": "../public/img/logos/stacks/illustrator.svg"
  },
  "/img/logos/stacks/javascript.svg": {
    "type": "image/svg+xml",
    "etag": "\"40b-7qH3yvPSdPM+NZJ/4xzocrU9JWY\"",
    "mtime": "2024-05-16T10:42:37.309Z",
    "size": 1035,
    "path": "../public/img/logos/stacks/javascript.svg"
  },
  "/img/logos/stacks/photoshop.svg": {
    "type": "image/svg+xml",
    "etag": "\"541-WxRBajUAtTjr9MNb7CLTvVWed4M\"",
    "mtime": "2024-05-16T10:42:36.846Z",
    "size": 1345,
    "path": "../public/img/logos/stacks/photoshop.svg"
  },
  "/img/logos/stacks/react.svg": {
    "type": "image/svg+xml",
    "etag": "\"ca8-1iQ6IxLlZvv1LyyHFxks7JzSj40\"",
    "mtime": "2024-05-16T10:42:37.522Z",
    "size": 3240,
    "path": "../public/img/logos/stacks/react.svg"
  },
  "/img/logos/stacks/sass.svg": {
    "type": "image/svg+xml",
    "etag": "\"d49-EoEPpUnJ7FvnyrPaLQdUAZcTRj0\"",
    "mtime": "2024-05-16T10:42:37.183Z",
    "size": 3401,
    "path": "../public/img/logos/stacks/sass.svg"
  },
  "/img/logos/stacks/sketch.svg": {
    "type": "image/svg+xml",
    "etag": "\"517-k7mDzeaGS3vANugStTP/hiIxZ4Y\"",
    "mtime": "2024-05-16T10:42:37.480Z",
    "size": 1303,
    "path": "../public/img/logos/stacks/sketch.svg"
  },
  "/img/logos/stacks/strapi.svg": {
    "type": "image/svg+xml",
    "etag": "\"5b8-l9drViEyizMn7IfZj3QDW7RHVC4\"",
    "mtime": "2024-05-16T10:42:36.929Z",
    "size": 1464,
    "path": "../public/img/logos/stacks/strapi.svg"
  },
  "/img/logos/stacks/swift.svg": {
    "type": "image/svg+xml",
    "etag": "\"86d-AhmoW7W5JJEPWrc2UD17caNWNv4\"",
    "mtime": "2024-05-16T10:42:37.224Z",
    "size": 2157,
    "path": "../public/img/logos/stacks/swift.svg"
  },
  "/img/logos/stacks/tailwind-purple.svg": {
    "type": "image/svg+xml",
    "etag": "\"3eb-BvjxqOEwG36MalygpOjf16Fvqh0\"",
    "mtime": "2024-05-16T10:42:37.393Z",
    "size": 1003,
    "path": "../public/img/logos/stacks/tailwind-purple.svg"
  },
  "/img/logos/stacks/tailwind.svg": {
    "type": "image/svg+xml",
    "etag": "\"305-Uo+nK9UTlMdERVX48H3Lh1g+TDU\"",
    "mtime": "2024-05-16T10:42:37.136Z",
    "size": 773,
    "path": "../public/img/logos/stacks/tailwind.svg"
  },
  "/img/logos/stacks/typescript.svg": {
    "type": "image/svg+xml",
    "etag": "\"56a-1g35HaN8QW5+GOLZPA8XrQM3Zxo\"",
    "mtime": "2024-05-16T10:42:37.267Z",
    "size": 1386,
    "path": "../public/img/logos/stacks/typescript.svg"
  },
  "/img/logos/stacks/vite.svg": {
    "type": "image/svg+xml",
    "etag": "\"64e-C6SpFiddLW2lyiyFeDli3oLXgBM\"",
    "mtime": "2024-05-16T10:42:36.800Z",
    "size": 1614,
    "path": "../public/img/logos/stacks/vite.svg"
  },
  "/img/logos/stacks/vue.svg": {
    "type": "image/svg+xml",
    "etag": "\"353-zC7paWvU/EBm8TB8peBy5AEOhxE\"",
    "mtime": "2024-05-16T10:42:37.051Z",
    "size": 851,
    "path": "../public/img/logos/stacks/vue.svg"
  },
  "/img/logos/tools/airtable.svg": {
    "type": "image/svg+xml",
    "etag": "\"78f-mimbVBGK62JBBGNWwGBaeSuQJgA\"",
    "mtime": "2024-05-16T10:42:39.033Z",
    "size": 1935,
    "path": "../public/img/logos/tools/airtable.svg"
  },
  "/img/logos/tools/asana.svg": {
    "type": "image/svg+xml",
    "etag": "\"499-oT9glhW77oRsr0kn6LBZB7/pmEQ\"",
    "mtime": "2024-05-16T10:42:38.957Z",
    "size": 1177,
    "path": "../public/img/logos/tools/asana.svg"
  },
  "/img/logos/tools/figma.svg": {
    "type": "image/svg+xml",
    "etag": "\"47e-9a0KljfTaeW6F4MwMFSa5dxxGvA\"",
    "mtime": "2024-05-16T10:42:39.242Z",
    "size": 1150,
    "path": "../public/img/logos/tools/figma.svg"
  },
  "/img/logos/tools/github.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c8-ZHwrD1gAWQGGkosv7bsqFxgUv9o\"",
    "mtime": "2024-05-16T10:42:38.830Z",
    "size": 968,
    "path": "../public/img/logos/tools/github.svg"
  },
  "/img/logos/tools/gitlab.svg": {
    "type": "image/svg+xml",
    "etag": "\"3de-tGSdPit6+m1l1lGakcTU/Z6uPns\"",
    "mtime": "2024-05-16T10:42:38.870Z",
    "size": 990,
    "path": "../public/img/logos/tools/gitlab.svg"
  },
  "/img/logos/tools/illustrator.svg": {
    "type": "image/svg+xml",
    "etag": "\"493-/bnRvP6A0Z1UxpBPYlPuaEG1Q8U\"",
    "mtime": "2024-05-16T10:42:39.275Z",
    "size": 1171,
    "path": "../public/img/logos/tools/illustrator.svg"
  },
  "/img/logos/tools/invision.svg": {
    "type": "image/svg+xml",
    "etag": "\"99d-sFhcFjul9GKgEmv+OE31aJ6pAmc\"",
    "mtime": "2024-05-16T10:42:38.913Z",
    "size": 2461,
    "path": "../public/img/logos/tools/invision.svg"
  },
  "/img/logos/tools/jira.svg": {
    "type": "image/svg+xml",
    "etag": "\"627-knRoLZct2QEM/CzQse1Up/sBE6U\"",
    "mtime": "2024-05-16T10:42:38.791Z",
    "size": 1575,
    "path": "../public/img/logos/tools/jira.svg"
  },
  "/img/logos/tools/office.svg": {
    "type": "image/svg+xml",
    "etag": "\"28c-nsujdXoVLQUXtq2gH8LUHHMCebY\"",
    "mtime": "2024-05-16T10:42:39.113Z",
    "size": 652,
    "path": "../public/img/logos/tools/office.svg"
  },
  "/img/logos/tools/photoshop.svg": {
    "type": "image/svg+xml",
    "etag": "\"541-WxRBajUAtTjr9MNb7CLTvVWed4M\"",
    "mtime": "2024-05-16T10:42:38.757Z",
    "size": 1345,
    "path": "../public/img/logos/tools/photoshop.svg"
  },
  "/img/logos/tools/slack.svg": {
    "type": "image/svg+xml",
    "etag": "\"55d-poilD62l79glm8g9ET9273J0oAs\"",
    "mtime": "2024-05-16T10:42:39.154Z",
    "size": 1373,
    "path": "../public/img/logos/tools/slack.svg"
  },
  "/img/logos/tools/taiga.svg": {
    "type": "image/svg+xml",
    "etag": "\"78d-ZOvgsRxaxL9Ns7ASR+3M85ngQ6Y\"",
    "mtime": "2024-05-16T10:42:39.197Z",
    "size": 1933,
    "path": "../public/img/logos/tools/taiga.svg"
  },
  "/img/logos/tools/teamwork.svg": {
    "type": "image/svg+xml",
    "etag": "\"773-PEcvogxUxMqcBh91gw0s1ii/jbY\"",
    "mtime": "2024-05-16T10:42:39.078Z",
    "size": 1907,
    "path": "../public/img/logos/tools/teamwork.svg"
  },
  "/img/logos/tools/xd.svg": {
    "type": "image/svg+xml",
    "etag": "\"4e6-UFZRfdQ4JWGV8tvSjaipRae54X4\"",
    "mtime": "2024-05-16T10:42:38.990Z",
    "size": 1254,
    "path": "../public/img/logos/tools/xd.svg"
  },
  "/img/stacks/build_tools/gulp.svg": {
    "type": "image/svg+xml",
    "etag": "\"7bf-ciemgwrxsb2FFsw8agfhjR1vDnA\"",
    "mtime": "2024-05-16T10:42:24.314Z",
    "size": 1983,
    "path": "../public/img/stacks/build_tools/gulp.svg"
  },
  "/img/stacks/build_tools/vitejs.svg": {
    "type": "image/svg+xml",
    "etag": "\"4b5-u3CTTagPZ6/DeFN3L+MRaNLb3HM\"",
    "mtime": "2024-05-16T10:42:24.282Z",
    "size": 1205,
    "path": "../public/img/stacks/build_tools/vitejs.svg"
  },
  "/img/stacks/framework/alpinejs.svg": {
    "type": "image/svg+xml",
    "etag": "\"143-AXulLYBSJgWiMYqGCM/FpJvdBeg\"",
    "mtime": "2024-05-16T10:42:24.881Z",
    "size": 323,
    "path": "../public/img/stacks/framework/alpinejs.svg"
  },
  "/img/stacks/framework/html5.svg": {
    "type": "image/svg+xml",
    "etag": "\"2d5-eE+9Wm/HnOcHeXW/1wMeWWNog9A\"",
    "mtime": "2024-05-16T10:42:24.785Z",
    "size": 725,
    "path": "../public/img/stacks/framework/html5.svg"
  },
  "/img/stacks/framework/nextjs.svg": {
    "type": "image/svg+xml",
    "etag": "\"2e0-RI5rBzdOLL+toDTOdwlNLBZGUrI\"",
    "mtime": "2024-05-16T10:42:24.850Z",
    "size": 736,
    "path": "../public/img/stacks/framework/nextjs.svg"
  },
  "/img/stacks/framework/nuxtjs.svg": {
    "type": "image/svg+xml",
    "etag": "\"2f7-FUtmBOiPb1Kpeq3z/8+xJ2d6AKI\"",
    "mtime": "2024-05-16T10:42:24.753Z",
    "size": 759,
    "path": "../public/img/stacks/framework/nuxtjs.svg"
  },
  "/img/stacks/framework/reactjs.svg": {
    "type": "image/svg+xml",
    "etag": "\"a31-kQ4sqmXGCWJ7B+pk3bA8pRzhGM4\"",
    "mtime": "2024-05-16T10:42:24.817Z",
    "size": 2609,
    "path": "../public/img/stacks/framework/reactjs.svg"
  },
  "/img/stacks/framework/vuejs.svg": {
    "type": "image/svg+xml",
    "etag": "\"1b5-nENUViz9EedTVjTMfRrmLpIS5II\"",
    "mtime": "2024-05-16T10:42:24.721Z",
    "size": 437,
    "path": "../public/img/stacks/framework/vuejs.svg"
  },
  "/img/stacks/framework_css/bootstrap.svg": {
    "type": "image/svg+xml",
    "etag": "\"3e2-jwg2WYxlC+uoMWKWztXTPPKB/Ec\"",
    "mtime": "2024-05-16T10:42:24.683Z",
    "size": 994,
    "path": "../public/img/stacks/framework_css/bootstrap.svg"
  },
  "/img/stacks/framework_css/bulma.svg": {
    "type": "image/svg+xml",
    "etag": "\"a7-HSri+dh7q4Hskb0B/B4QJmWvI2k\"",
    "mtime": "2024-05-16T10:42:24.607Z",
    "size": 167,
    "path": "../public/img/stacks/framework_css/bulma.svg"
  },
  "/img/stacks/framework_css/tailwindcss.svg": {
    "type": "image/svg+xml",
    "etag": "\"32a-5BvTVMlo045GhT7FYFzZ1BVk5j4\"",
    "mtime": "2024-05-16T10:42:24.640Z",
    "size": 810,
    "path": "../public/img/stacks/framework_css/tailwindcss.svg"
  },
  "/img/stacks/language/javascript.svg": {
    "type": "image/svg+xml",
    "etag": "\"2cc-Y9MckFnohU8kfNs50wQ42PsMP7s\"",
    "mtime": "2024-05-16T10:42:24.963Z",
    "size": 716,
    "path": "../public/img/stacks/language/javascript.svg"
  },
  "/img/stacks/language/typescript.svg": {
    "type": "image/svg+xml",
    "etag": "\"3e2-NAq6ryzB6KUs7sZGxbjtOg6hU3k\"",
    "mtime": "2024-05-16T10:42:24.930Z",
    "size": 994,
    "path": "../public/img/stacks/language/typescript.svg"
  },
  "/img/stacks/pricing/free.svg": {
    "type": "image/svg+xml",
    "etag": "\"266-dHHfPeMc3MsVrBxU5DZ1QLsfLYM\"",
    "mtime": "2024-05-16T10:42:24.566Z",
    "size": 614,
    "path": "../public/img/stacks/pricing/free.svg"
  },
  "/img/stacks/pricing/premium.svg": {
    "type": "image/svg+xml",
    "etag": "\"3c9-OSKVG0Hma7nQvM+5aQTDVZzaP7s\"",
    "mtime": "2024-05-16T10:42:24.526Z",
    "size": 969,
    "path": "../public/img/stacks/pricing/premium.svg"
  },
  "/img/stacks/purpose/dashboard.svg": {
    "type": "image/svg+xml",
    "etag": "\"1c9-loJQ2HaJiASw2PrgEarJ1MibKjE\"",
    "mtime": "2024-05-16T10:42:24.479Z",
    "size": 457,
    "path": "../public/img/stacks/purpose/dashboard.svg"
  },
  "/img/stacks/purpose/ecommerce.svg": {
    "type": "image/svg+xml",
    "etag": "\"35d-5WsDix2o2CMW6GB3ZEJACD8RoXc\"",
    "mtime": "2024-05-16T10:42:24.398Z",
    "size": 861,
    "path": "../public/img/stacks/purpose/ecommerce.svg"
  },
  "/img/stacks/purpose/landing.svg": {
    "type": "image/svg+xml",
    "etag": "\"1e3-0Y5GKh1nh38KQ5ElkFlqM8m2KJE\"",
    "mtime": "2024-05-16T10:42:24.360Z",
    "size": 483,
    "path": "../public/img/stacks/purpose/landing.svg"
  },
  "/img/stacks/purpose/saas.svg": {
    "type": "image/svg+xml",
    "etag": "\"266-zLemGDa+JkSHpvZbUsJ75GHi/54\"",
    "mtime": "2024-05-16T10:42:24.441Z",
    "size": 614,
    "path": "../public/img/stacks/purpose/saas.svg"
  },
  "/_nuxt/builds/meta/53000625-b389-4bcc-a236-7ca7439f1dee.json": {
    "type": "application/json",
    "etag": "\"8b-qCvpWLshE3/xYwqb/kHChtI/8JM\"",
    "mtime": "2024-12-16T03:46:05.694Z",
    "size": 139,
    "path": "../public/_nuxt/builds/meta/53000625-b389-4bcc-a236-7ca7439f1dee.json"
  },
  "/img/icons/soccer/leagues/bundesliga.svg": {
    "type": "image/svg+xml",
    "etag": "\"b2e-HvKPky0b8WzYdFfHvlAP2YrlsTI\"",
    "mtime": "2024-05-16T10:42:11.164Z",
    "size": 2862,
    "path": "../public/img/icons/soccer/leagues/bundesliga.svg"
  },
  "/img/icons/soccer/leagues/champions-league.svg": {
    "type": "image/svg+xml",
    "etag": "\"24f0-OA2l41KOzb+C5LcgNHSJ+fYwhTk\"",
    "mtime": "2024-05-16T10:42:11.032Z",
    "size": 9456,
    "path": "../public/img/icons/soccer/leagues/champions-league.svg"
  },
  "/img/icons/soccer/leagues/laliga.svg": {
    "type": "image/svg+xml",
    "etag": "\"1288-S/Y+0STVUeH0TFdmOpwyu/FOVss\"",
    "mtime": "2024-05-16T10:42:11.119Z",
    "size": 4744,
    "path": "../public/img/icons/soccer/leagues/laliga.svg"
  },
  "/img/icons/soccer/leagues/liga.svg": {
    "type": "image/svg+xml",
    "etag": "\"2438-5hhCF6R7TjY+yC8bW4ra3RsBgMs\"",
    "mtime": "2024-05-16T10:42:10.991Z",
    "size": 9272,
    "path": "../public/img/icons/soccer/leagues/liga.svg"
  },
  "/img/icons/soccer/leagues/ligue-1.svg": {
    "type": "image/svg+xml",
    "etag": "\"1623-nPmWo/krRnTY42fJvXmAjUqvSlA\"",
    "mtime": "2024-05-16T10:42:11.074Z",
    "size": 5667,
    "path": "../public/img/icons/soccer/leagues/ligue-1.svg"
  },
  "/img/icons/soccer/teams/arsenal.svg": {
    "type": "image/svg+xml",
    "etag": "\"49f8-AOXTVkp3QHjXAVoTwyjUqj0Vg/w\"",
    "mtime": "2024-05-16T10:42:10.725Z",
    "size": 18936,
    "path": "../public/img/icons/soccer/teams/arsenal.svg"
  },
  "/img/icons/soccer/teams/barcelona.svg": {
    "type": "image/svg+xml",
    "etag": "\"2037-ooxIxsoOh1FGV8QWl4KCuKo2oW4\"",
    "mtime": "2024-05-16T10:42:10.898Z",
    "size": 8247,
    "path": "../public/img/icons/soccer/teams/barcelona.svg"
  },
  "/img/icons/soccer/teams/chelsea.svg": {
    "type": "image/svg+xml",
    "etag": "\"6ff3-bzOPSxtjCLAScx50iqLkSaanmfQ\"",
    "mtime": "2024-05-16T10:42:10.855Z",
    "size": 28659,
    "path": "../public/img/icons/soccer/teams/chelsea.svg"
  },
  "/img/icons/soccer/teams/everton.svg": {
    "type": "image/svg+xml",
    "etag": "\"602d-RCfJ/65NxuMHTA9AcNkeuWeq/8I\"",
    "mtime": "2024-05-16T10:42:10.387Z",
    "size": 24621,
    "path": "../public/img/icons/soccer/teams/everton.svg"
  },
  "/img/icons/soccer/teams/fiorentina.svg": {
    "type": "image/svg+xml",
    "etag": "\"bf5-nQY7+y1pdiRSYbZdYcgbG0Zro08\"",
    "mtime": "2024-05-16T10:42:10.646Z",
    "size": 3061,
    "path": "../public/img/icons/soccer/teams/fiorentina.svg"
  },
  "/img/icons/soccer/teams/juventus.svg": {
    "type": "image/svg+xml",
    "etag": "\"2235-vvSi2Bu13QDo5O5dAdy4IqvWuJk\"",
    "mtime": "2024-05-16T10:42:10.429Z",
    "size": 8757,
    "path": "../public/img/icons/soccer/teams/juventus.svg"
  },
  "/img/icons/soccer/teams/leverkusen.svg": {
    "type": "image/svg+xml",
    "etag": "\"75ac-wJ7O5ll8y3Hsq3iFa8eCbRa4WLo\"",
    "mtime": "2024-05-16T10:42:10.769Z",
    "size": 30124,
    "path": "../public/img/icons/soccer/teams/leverkusen.svg"
  },
  "/img/icons/soccer/teams/liverpool.svg": {
    "type": "image/svg+xml",
    "etag": "\"16c0f-mGTTfQVwuy3G5I6aT2kNfUMFrkA\"",
    "mtime": "2024-05-16T10:42:10.940Z",
    "size": 93199,
    "path": "../public/img/icons/soccer/teams/liverpool.svg"
  },
  "/img/icons/soccer/teams/madrid.svg": {
    "type": "image/svg+xml",
    "etag": "\"da63-POujWYvYvgQW3eht7BxvxS1vHPk\"",
    "mtime": "2024-05-16T10:42:10.471Z",
    "size": 55907,
    "path": "../public/img/icons/soccer/teams/madrid.svg"
  },
  "/img/icons/soccer/teams/milan.svg": {
    "type": "image/svg+xml",
    "etag": "\"15f7-mafVpviTwH0kW4L7Y+JdmxxK+2Q\"",
    "mtime": "2024-05-16T10:42:10.686Z",
    "size": 5623,
    "path": "../public/img/icons/soccer/teams/milan.svg"
  },
  "/img/icons/soccer/teams/psg.svg": {
    "type": "image/svg+xml",
    "etag": "\"2660-jop7/8x9i/nKpBi/U+b5pTm/J8A\"",
    "mtime": "2024-05-16T10:42:10.514Z",
    "size": 9824,
    "path": "../public/img/icons/soccer/teams/psg.svg"
  },
  "/img/icons/soccer/teams/valladolid.svg": {
    "type": "image/svg+xml",
    "etag": "\"1c182-DVxZoRWJSs91W9r/69lAgp//qm8\"",
    "mtime": "2024-05-16T10:42:10.601Z",
    "size": 115074,
    "path": "../public/img/icons/soccer/teams/valladolid.svg"
  },
  "/img/icons/soccer/teams/zagreb.svg": {
    "type": "image/svg+xml",
    "etag": "\"2df4-Z56buypjpcKIZzqfL4xclvxEg2s\"",
    "mtime": "2024-05-16T10:42:10.809Z",
    "size": 11764,
    "path": "../public/img/icons/soccer/teams/zagreb.svg"
  },
  "/img/icons/soccer/teams/zaragoza.svg": {
    "type": "image/svg+xml",
    "etag": "\"12499-X6oZO5n+bYHuGyCPoKvoPOwWHN4\"",
    "mtime": "2024-05-16T10:42:10.557Z",
    "size": 74905,
    "path": "../public/img/icons/soccer/teams/zaragoza.svg"
  },
  "/img/illustrations/dashboards/delivery/header.svg": {
    "type": "image/svg+xml",
    "etag": "\"7453-6Kv9w2g6x0esUWv+truBukyXZno\"",
    "mtime": "2024-05-16T10:42:20.219Z",
    "size": 29779,
    "path": "../public/img/illustrations/dashboards/delivery/header.svg"
  },
  "/img/illustrations/dashboards/delivery/meal-1.png": {
    "type": "image/png",
    "etag": "\"7ce9-fy4Ov1bpSwxA3S/OWczpQvSSOIA\"",
    "mtime": "2024-05-16T10:42:20.056Z",
    "size": 31977,
    "path": "../public/img/illustrations/dashboards/delivery/meal-1.png"
  },
  "/img/illustrations/dashboards/delivery/meal-2.png": {
    "type": "image/png",
    "etag": "\"9913-o/x2aAolJC3IelKHM15PTmknIrg\"",
    "mtime": "2024-05-16T10:42:20.280Z",
    "size": 39187,
    "path": "../public/img/illustrations/dashboards/delivery/meal-2.png"
  },
  "/img/illustrations/dashboards/delivery/meal-3.png": {
    "type": "image/png",
    "etag": "\"6c60-uBV9M8tfCAJJTC8c4bbiI9T8q6g\"",
    "mtime": "2024-05-16T10:42:20.023Z",
    "size": 27744,
    "path": "../public/img/illustrations/dashboards/delivery/meal-3.png"
  },
  "/img/illustrations/dashboards/delivery/meal-4.png": {
    "type": "image/png",
    "etag": "\"711e-TndZLo1S/5gziAXlNc1oKe/BIBQ\"",
    "mtime": "2024-05-16T10:42:20.180Z",
    "size": 28958,
    "path": "../public/img/illustrations/dashboards/delivery/meal-4.png"
  },
  "/img/illustrations/dashboards/delivery/meal-5.png": {
    "type": "image/png",
    "etag": "\"81b2-4b4Jf6jUJSqB1JYQ9s16c3S1wkM\"",
    "mtime": "2024-05-16T10:42:19.993Z",
    "size": 33202,
    "path": "../public/img/illustrations/dashboards/delivery/meal-5.png"
  },
  "/img/illustrations/dashboards/delivery/meal-6.png": {
    "type": "image/png",
    "etag": "\"7693-FP8AP1to5cOxDTroOlZRQKzwfFs\"",
    "mtime": "2024-05-16T10:42:20.119Z",
    "size": 30355,
    "path": "../public/img/illustrations/dashboards/delivery/meal-6.png"
  },
  "/img/illustrations/dashboards/delivery/meal-7.png": {
    "type": "image/png",
    "etag": "\"42f5-Mz13zXS1YxaGPElCUOHj4Cx8Ycg\"",
    "mtime": "2024-05-16T10:42:20.150Z",
    "size": 17141,
    "path": "../public/img/illustrations/dashboards/delivery/meal-7.png"
  },
  "/img/illustrations/dashboards/delivery/meal-8.png": {
    "type": "image/png",
    "etag": "\"5ea7-+Bsc9eQveHs+0zOVXIvCT79RYtQ\"",
    "mtime": "2024-05-16T10:42:20.088Z",
    "size": 24231,
    "path": "../public/img/illustrations/dashboards/delivery/meal-8.png"
  },
  "/img/illustrations/dashboards/delivery/meal-9.png": {
    "type": "image/png",
    "etag": "\"5e70-TcH5P/7IhsSIQWrIOAp901NshyM\"",
    "mtime": "2024-05-16T10:42:20.249Z",
    "size": 24176,
    "path": "../public/img/illustrations/dashboards/delivery/meal-9.png"
  },
  "/img/illustrations/dashboards/health/doctor.svg": {
    "type": "image/svg+xml",
    "etag": "\"ac37-9kLsCvZJj9YKT7LeqNw4ZhzZcXA\"",
    "mtime": "2024-05-16T10:42:19.956Z",
    "size": 44087,
    "path": "../public/img/illustrations/dashboards/health/doctor.svg"
  },
  "/img/illustrations/dashboards/hobbies/hobby-1.svg": {
    "type": "image/svg+xml",
    "etag": "\"eddbe-Zdd0FPZmbqmnDL5cRZ+LnXQm36U\"",
    "mtime": "2024-05-16T10:42:21.168Z",
    "size": 974270,
    "path": "../public/img/illustrations/dashboards/hobbies/hobby-1.svg"
  },
  "/img/illustrations/dashboards/hobbies/hobby-2.svg": {
    "type": "image/svg+xml",
    "etag": "\"8058-cxuN74oQqOO+bPhlwMSNVQw9JKI\"",
    "mtime": "2024-05-16T10:42:20.993Z",
    "size": 32856,
    "path": "../public/img/illustrations/dashboards/hobbies/hobby-2.svg"
  },
  "/img/illustrations/dashboards/hobbies/hobby-3.svg": {
    "type": "image/svg+xml",
    "etag": "\"10cd7-6kqfI0SZnFFJJdE4dnO5fwdZbIg\"",
    "mtime": "2024-05-16T10:42:21.360Z",
    "size": 68823,
    "path": "../public/img/illustrations/dashboards/hobbies/hobby-3.svg"
  },
  "/img/illustrations/dashboards/hobbies/hobby-4.svg": {
    "type": "image/svg+xml",
    "etag": "\"1a9b24-OUvFtutLhR7J9nBkeLVW+CkOyT4\"",
    "mtime": "2024-05-16T10:42:21.230Z",
    "size": 1743652,
    "path": "../public/img/illustrations/dashboards/hobbies/hobby-4.svg"
  },
  "/img/illustrations/dashboards/hobbies/landscape-thumb-1.svg": {
    "type": "image/svg+xml",
    "etag": "\"e59-m7qj7U3WLcUo870Cx8Wd3LeR+K8\"",
    "mtime": "2024-05-16T10:42:20.951Z",
    "size": 3673,
    "path": "../public/img/illustrations/dashboards/hobbies/landscape-thumb-1.svg"
  },
  "/img/illustrations/dashboards/hobbies/landscape-thumb-2.svg": {
    "type": "image/svg+xml",
    "etag": "\"320a-KFHvKkoxw4OypbRX0uGZwSkXL50\"",
    "mtime": "2024-05-16T10:42:21.448Z",
    "size": 12810,
    "path": "../public/img/illustrations/dashboards/hobbies/landscape-thumb-2.svg"
  },
  "/img/illustrations/dashboards/hobbies/landscape-thumb-3.svg": {
    "type": "image/svg+xml",
    "etag": "\"d02-5DKMdl1ONh8WSwGiJpwEi6zttho\"",
    "mtime": "2024-05-16T10:42:21.315Z",
    "size": 3330,
    "path": "../public/img/illustrations/dashboards/hobbies/landscape-thumb-3.svg"
  },
  "/img/illustrations/dashboards/hobbies/landscape-thumb-4.svg": {
    "type": "image/svg+xml",
    "etag": "\"1d87-0JMHKsJ0Zpc4Sh5SvSVaC5X0icY\"",
    "mtime": "2024-05-16T10:42:21.115Z",
    "size": 7559,
    "path": "../public/img/illustrations/dashboards/hobbies/landscape-thumb-4.svg"
  },
  "/img/illustrations/dashboards/hobbies/landscape-thumb-5.svg": {
    "type": "image/svg+xml",
    "etag": "\"106b-hYnuuLx/8k5+wWl492QsD/YKiec\"",
    "mtime": "2024-05-16T10:42:21.403Z",
    "size": 4203,
    "path": "../public/img/illustrations/dashboards/hobbies/landscape-thumb-5.svg"
  },
  "/img/illustrations/dashboards/hobbies/landscape-thumb-6.svg": {
    "type": "image/svg+xml",
    "etag": "\"17e9-Os8+MS4H5RRT0iyW7IEcfglJ8f0\"",
    "mtime": "2024-05-16T10:42:21.271Z",
    "size": 6121,
    "path": "../public/img/illustrations/dashboards/hobbies/landscape-thumb-6.svg"
  },
  "/img/illustrations/dashboards/hobbies/landscape-thumb-7.svg": {
    "type": "image/svg+xml",
    "etag": "\"229c-EEocW0H663Gqlvv11Lw4sAs/fP8\"",
    "mtime": "2024-05-16T10:42:21.034Z",
    "size": 8860,
    "path": "../public/img/illustrations/dashboards/hobbies/landscape-thumb-7.svg"
  },
  "/img/illustrations/dashboards/hobbies/landscape-thumb-8.svg": {
    "type": "image/svg+xml",
    "etag": "\"d1d-l1cdcHIXuyYxWxFxGiISLQaeFuE\"",
    "mtime": "2024-05-16T10:42:21.075Z",
    "size": 3357,
    "path": "../public/img/illustrations/dashboards/hobbies/landscape-thumb-8.svg"
  },
  "/img/illustrations/dashboards/soccer/soccer-player.svg": {
    "type": "image/svg+xml",
    "etag": "\"4dcb-HDlCxHKersBjOPtQOzcxAtn4ylQ\"",
    "mtime": "2024-05-16T10:42:21.656Z",
    "size": 19915,
    "path": "../public/img/illustrations/dashboards/soccer/soccer-player.svg"
  },
  "/img/illustrations/dashboards/video/1.png": {
    "type": "image/png",
    "etag": "\"8851b-9He6CrklP8E8LNJngNLf0nuJ/4c\"",
    "mtime": "2024-05-16T10:42:20.537Z",
    "size": 558363,
    "path": "../public/img/illustrations/dashboards/video/1.png"
  },
  "/img/illustrations/dashboards/video/10.png": {
    "type": "image/png",
    "etag": "\"10043a-Vlq8k3MX4Z9K8Lu1cO8td3ckNyo\"",
    "mtime": "2024-05-16T10:42:20.333Z",
    "size": 1049658,
    "path": "../public/img/illustrations/dashboards/video/10.png"
  },
  "/img/illustrations/dashboards/video/11.png": {
    "type": "image/png",
    "etag": "\"6ed4a-RgivtRT6bEixhnuJswk//8lmWPY\"",
    "mtime": "2024-05-16T10:42:20.376Z",
    "size": 453962,
    "path": "../public/img/illustrations/dashboards/video/11.png"
  },
  "/img/illustrations/dashboards/video/12.png": {
    "type": "image/png",
    "etag": "\"5c958-s7wr8PvVsnpF3eYJhnRCnGEenpQ\"",
    "mtime": "2024-05-16T10:42:20.583Z",
    "size": 379224,
    "path": "../public/img/illustrations/dashboards/video/12.png"
  },
  "/img/illustrations/dashboards/video/13.png": {
    "type": "image/png",
    "etag": "\"55dc4-auDf/dAYGdYLYEjGtOlyYRBmTbI\"",
    "mtime": "2024-05-16T10:42:20.902Z",
    "size": 351684,
    "path": "../public/img/illustrations/dashboards/video/13.png"
  },
  "/img/illustrations/dashboards/video/14.png": {
    "type": "image/png",
    "etag": "\"1cc8cd-WC68PhoeAx2/CQ1cGV31OgPjnJQ\"",
    "mtime": "2024-05-16T10:42:20.773Z",
    "size": 1886413,
    "path": "../public/img/illustrations/dashboards/video/14.png"
  },
  "/img/illustrations/dashboards/video/2.jpg": {
    "type": "image/jpeg",
    "etag": "\"a7dc3-SpTWe0tBw9pmYks9Ij/eTFS3KWg\"",
    "mtime": "2024-05-16T10:42:20.715Z",
    "size": 687555,
    "path": "../public/img/illustrations/dashboards/video/2.jpg"
  },
  "/img/illustrations/dashboards/video/3.png": {
    "type": "image/png",
    "etag": "\"bfd6c-gM0YU+c1zirNpwyNWh9EZvku6f8\"",
    "mtime": "2024-05-16T10:42:20.817Z",
    "size": 785772,
    "path": "../public/img/illustrations/dashboards/video/3.png"
  },
  "/img/illustrations/dashboards/video/4.png": {
    "type": "image/png",
    "etag": "\"44990-bPN0iE9Rv+XM32erh98YoKlx8M4\"",
    "mtime": "2024-05-16T10:42:20.412Z",
    "size": 280976,
    "path": "../public/img/illustrations/dashboards/video/4.png"
  },
  "/img/illustrations/dashboards/video/5.png": {
    "type": "image/png",
    "etag": "\"ad1bf-YNi4paLJyWEyoQCW2TRO30Ctw8k\"",
    "mtime": "2024-05-16T10:42:20.862Z",
    "size": 709055,
    "path": "../public/img/illustrations/dashboards/video/5.png"
  },
  "/img/illustrations/dashboards/video/6.png": {
    "type": "image/png",
    "etag": "\"646cc-9tSzapLwpr/OtHMjY6Oo/ltyXfE\"",
    "mtime": "2024-05-16T10:42:20.631Z",
    "size": 411340,
    "path": "../public/img/illustrations/dashboards/video/6.png"
  },
  "/img/illustrations/dashboards/video/7.jpg": {
    "type": "image/jpeg",
    "etag": "\"67c12-T1CvWIheb+gmD5WLXQaisv9vXeE\"",
    "mtime": "2024-05-16T10:42:20.672Z",
    "size": 424978,
    "path": "../public/img/illustrations/dashboards/video/7.jpg"
  },
  "/img/illustrations/dashboards/video/8.jpg": {
    "type": "image/jpeg",
    "etag": "\"91fb2-zxajyJZSH4qi24KDkp8CWDBoVuw\"",
    "mtime": "2024-05-16T10:42:20.497Z",
    "size": 597938,
    "path": "../public/img/illustrations/dashboards/video/8.jpg"
  },
  "/img/illustrations/dashboards/video/9.png": {
    "type": "image/png",
    "etag": "\"5cccb-e6DI25lQ0h/VPQcwHPTcM6XfxWw\"",
    "mtime": "2024-05-16T10:42:20.454Z",
    "size": 380107,
    "path": "../public/img/illustrations/dashboards/video/9.png"
  },
  "/img/illustrations/dashboards/writer/post-1.svg": {
    "type": "image/svg+xml",
    "etag": "\"bc30-oOj/1smfplQ+WfG+WW1Wuxyo6Jc\"",
    "mtime": "2024-05-16T10:42:21.555Z",
    "size": 48176,
    "path": "../public/img/illustrations/dashboards/writer/post-1.svg"
  },
  "/img/illustrations/dashboards/writer/post-2.svg": {
    "type": "image/svg+xml",
    "etag": "\"988d-h92XItbYNmU26qKsLRW2n9G/AFk\"",
    "mtime": "2024-05-16T10:42:21.501Z",
    "size": 39053,
    "path": "../public/img/illustrations/dashboards/writer/post-2.svg"
  },
  "/img/illustrations/dashboards/writer/readers.svg": {
    "type": "image/svg+xml",
    "etag": "\"c8c3-PXHzNR3YM+apdgf4bD2yTrFLuqs\"",
    "mtime": "2024-05-16T10:42:21.603Z",
    "size": 51395,
    "path": "../public/img/illustrations/dashboards/writer/readers.svg"
  },
  "/img/illustrations/placeholders/flat/chart-guy-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"c637-yNGt3d1KqSHlnhtaZUBAusxzxhc\"",
    "mtime": "2024-05-16T10:42:12.807Z",
    "size": 50743,
    "path": "../public/img/illustrations/placeholders/flat/chart-guy-dark.svg"
  },
  "/img/illustrations/placeholders/flat/chart-guy.svg": {
    "type": "image/svg+xml",
    "etag": "\"c540-Nnk1lvBoeV52SUFd8ABSKbOka7U\"",
    "mtime": "2024-05-16T10:42:13.653Z",
    "size": 50496,
    "path": "../public/img/illustrations/placeholders/flat/chart-guy.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-cooking-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"a664-MYWFStFwh3RSY1FM5zYO5swmRmk\"",
    "mtime": "2024-05-16T10:42:13.385Z",
    "size": 42596,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-cooking-dark.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-cooking.svg": {
    "type": "image/svg+xml",
    "etag": "\"a565-aqsiM2KiLHFOMocRA3P5z98+f2s\"",
    "mtime": "2024-05-16T10:42:13.111Z",
    "size": 42341,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-cooking.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-courses-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"d071-2395eN1xsC/ClmXA0hsoPfpThps\"",
    "mtime": "2024-05-16T10:42:13.028Z",
    "size": 53361,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-courses-dark.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-courses.svg": {
    "type": "image/svg+xml",
    "etag": "\"cf96-sc9p6rWE/VXyPwBrNLHSyHPjiVk\"",
    "mtime": "2024-05-16T10:42:13.562Z",
    "size": 53142,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-courses.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-having-coffee-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"1bdf6-7DUSULXVJrr5qAzq35+1pXaVKiI\"",
    "mtime": "2024-05-16T10:42:13.158Z",
    "size": 114166,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-having-coffee-dark.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-having-coffee.svg": {
    "type": "image/svg+xml",
    "etag": "\"1b9d0-X9ST4Ry9/HnNfvxZS3YtGIcVWfo\"",
    "mtime": "2024-05-16T10:42:13.337Z",
    "size": 113104,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-having-coffee.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-instagram-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"f8e8-hl7AbpwSHO2y9Y2ZdGqiKbgKe9k\"",
    "mtime": "2024-05-16T10:42:13.292Z",
    "size": 63720,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-instagram-dark.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-instagram.svg": {
    "type": "image/svg+xml",
    "etag": "\"f658-Kk1y/OfVCRdxdfReUA3eVxYb4Ew\"",
    "mtime": "2024-05-16T10:42:12.766Z",
    "size": 63064,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-instagram.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-launch-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"a142-U2cYqumfVEjzBChHOiVMvDjU770\"",
    "mtime": "2024-05-16T10:42:12.557Z",
    "size": 41282,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-launch-dark.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-launch.svg": {
    "type": "image/svg+xml",
    "etag": "\"a304-QJ8tIpqH3ioFkHchHOC7Be2a4AM\"",
    "mtime": "2024-05-16T10:42:12.427Z",
    "size": 41732,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-launch.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-paypal.svg": {
    "type": "image/svg+xml",
    "etag": "\"782e-Et3tO62XSv8mUggZaSqsQxK3Vdw\"",
    "mtime": "2024-05-16T10:42:12.944Z",
    "size": 30766,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-paypal.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-projects-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"13a6a-Mq+i6OFtkVSuZCAAlxN+TxgLLK0\"",
    "mtime": "2024-05-16T10:42:13.199Z",
    "size": 80490,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-projects-dark.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-projects.svg": {
    "type": "image/svg+xml",
    "etag": "\"1381e-jXGR5HdAtFRM/oxf/XjdaDfIO1I\"",
    "mtime": "2024-05-16T10:42:12.684Z",
    "size": 79902,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-projects.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-promotion-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"143a2-INZ2hky45piVSDzu+n+j5ff9NTE\"",
    "mtime": "2024-05-16T10:42:12.852Z",
    "size": 82850,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-promotion-dark.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-promotion.svg": {
    "type": "image/svg+xml",
    "etag": "\"13d18-3sl9Q5ZOFCPVNiiyo+kDS7i4w/0\"",
    "mtime": "2024-05-16T10:42:12.600Z",
    "size": 81176,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-promotion.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-search-1-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"1122b-slhJgQPZnTXnPCQK5LTJ+CvUYwI\"",
    "mtime": "2024-05-16T10:42:12.726Z",
    "size": 70187,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-search-1-dark.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-search-1.svg": {
    "type": "image/svg+xml",
    "etag": "\"10e2d-jZC4nNMYiF2vStJvurR1+aTXPa4\"",
    "mtime": "2024-05-16T10:42:13.520Z",
    "size": 69165,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-search-1.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-search-2-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"b6d8-OGiEhif3fQXPXUDgk9hA8t684DM\"",
    "mtime": "2024-05-16T10:42:12.640Z",
    "size": 46808,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-search-2-dark.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-search-2.svg": {
    "type": "image/svg+xml",
    "etag": "\"b5d1-6Mo2saGthiqZKdCNMiGniuAEob4\"",
    "mtime": "2024-05-16T10:42:13.786Z",
    "size": 46545,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-search-2.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-search-3-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"773d-mymDAeWn+EwGHBGzfY4mDfsDER4\"",
    "mtime": "2024-05-16T10:42:13.828Z",
    "size": 30525,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-search-3-dark.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-search-3.svg": {
    "type": "image/svg+xml",
    "etag": "\"7546-IuUmsdOKA/PL37UI58vWvZTfieA\"",
    "mtime": "2024-05-16T10:42:13.242Z",
    "size": 30022,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-search-3.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-search-4-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"b6b5-8cFMd1YE3diXAHdzrlGyelLhW7c\"",
    "mtime": "2024-05-16T10:42:13.609Z",
    "size": 46773,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-search-4-dark.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-search-4.svg": {
    "type": "image/svg+xml",
    "etag": "\"b57e-4rtcCxEqaW4cbeB+kixN8+8AF84\"",
    "mtime": "2024-05-16T10:42:13.474Z",
    "size": 46462,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-search-4.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-search-5-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"e843-KCWEtws6/7cASNo+RArXFdf7tK0\"",
    "mtime": "2024-05-16T10:42:13.429Z",
    "size": 59459,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-search-5-dark.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-search-5.svg": {
    "type": "image/svg+xml",
    "etag": "\"e7df-p+2TjVETK7vFsWosLTFMs5Eq9Eo\"",
    "mtime": "2024-05-16T10:42:12.469Z",
    "size": 59359,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-search-5.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-search-6-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"b34e-xp4tVcmjKvSGvTr51EJoe8i8P7k\"",
    "mtime": "2024-05-16T10:42:13.698Z",
    "size": 45902,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-search-6-dark.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-search-6.svg": {
    "type": "image/svg+xml",
    "etag": "\"c91a-eFxYzqTdl+8L/V0ZEkLOLmernm0\"",
    "mtime": "2024-05-16T10:42:13.069Z",
    "size": 51482,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-search-6.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-search-7-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"c899-BCHoGXNQ5oh4FLCXLi4i3eilbtU\"",
    "mtime": "2024-05-16T10:42:12.513Z",
    "size": 51353,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-search-7-dark.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-search-7.svg": {
    "type": "image/svg+xml",
    "etag": "\"c263-Ug/bAu32KFdCj61rzV3AAFxO/78\"",
    "mtime": "2024-05-16T10:42:13.870Z",
    "size": 49763,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-search-7.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-team-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"2562e-3UCsLGFA885W7si83AkryfJygac\"",
    "mtime": "2024-05-16T10:42:12.383Z",
    "size": 153134,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-team-dark.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-team.svg": {
    "type": "image/svg+xml",
    "etag": "\"24de2-bwyJNPaD+xK/sldA1i0zPPOqutw\"",
    "mtime": "2024-05-16T10:42:12.901Z",
    "size": 151010,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-team.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-thinking-canvas-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"89cf-jXAdTl9DyNuGc0/gFJbbKh3ojS4\"",
    "mtime": "2024-05-16T10:42:13.743Z",
    "size": 35279,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-thinking-canvas-dark.svg"
  },
  "/img/illustrations/placeholders/flat/placeholder-thinking-canvas.svg": {
    "type": "image/svg+xml",
    "etag": "\"872b-pIcYUOUwN7BLJ+JgxF1OBmygnQc\"",
    "mtime": "2024-05-16T10:42:12.985Z",
    "size": 34603,
    "path": "../public/img/illustrations/placeholders/flat/placeholder-thinking-canvas.svg"
  },
  "/img/illustrations/placeholders/people/1.svg": {
    "type": "image/svg+xml",
    "etag": "\"3fe7-nE8DZto5FY5vCFCN1gDKFGWs8Uw\"",
    "mtime": "2024-05-16T10:42:13.962Z",
    "size": 16359,
    "path": "../public/img/illustrations/placeholders/people/1.svg"
  },
  "/img/illustrations/placeholders/people/2.svg": {
    "type": "image/svg+xml",
    "etag": "\"614b-2Vd853sK+S+6CrduaOuLkfuJFQM\"",
    "mtime": "2024-05-16T10:42:13.920Z",
    "size": 24907,
    "path": "../public/img/illustrations/placeholders/people/2.svg"
  },
  "/img/logos/companies/flights/1.svg": {
    "type": "image/svg+xml",
    "etag": "\"479-D3EMi6nTvoBxqZs4S6ye3Onehqo\"",
    "mtime": "2024-05-16T10:42:40.778Z",
    "size": 1145,
    "path": "../public/img/logos/companies/flights/1.svg"
  },
  "/img/logos/companies/flights/2.svg": {
    "type": "image/svg+xml",
    "etag": "\"3b6-T0EzoC5aOZHiWBiltZI+EpUKQc8\"",
    "mtime": "2024-05-16T10:42:40.735Z",
    "size": 950,
    "path": "../public/img/logos/companies/flights/2.svg"
  },
  "/img/logos/companies/flights/3.svg": {
    "type": "image/svg+xml",
    "etag": "\"313-FvNqV/2/kXrw/yqHK/6rbwGQjy4\"",
    "mtime": "2024-05-16T10:42:40.697Z",
    "size": 787,
    "path": "../public/img/logos/companies/flights/3.svg"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises$1.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta":{"maxAge":31536000},"/_nuxt/builds":{"maxAge":1},"/_nuxt":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    setResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_g1tyjO = () => import('./index.mjs');
const _lazy_WuA2Ss = () => Promise.resolve().then(function () { return fetchData; });
const _lazy_0KpW9d = () => import('../renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/api/demos', handler: _lazy_g1tyjO, lazy: true, middleware: false, method: undefined },
  { route: '/api/fetchData', handler: _lazy_WuA2Ss, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_0KpW9d, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_0KpW9d, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((_err) => {
      console.error("Error while capturing another error", _err);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  for (const plugin of plugins) {
    try {
      plugin(app);
    } catch (err) {
      captureError(err, { tags: ["plugin"] });
      throw err;
    }
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((err) => {
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
  }
  server.on("request", function(req, res) {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", function() {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", function(socket) {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", function() {
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    if (options.development) {
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        return Promise.resolve(false);
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((err) => {
      const errString = typeof err === "string" ? err : JSON.stringify(err);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT, 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((err) => {
          console.error(err);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

const fetchData = /*#__PURE__*/Object.freeze({
  __proto__: null
});

export { $fetch as $, useRuntimeConfig as A, getQuery as B, getRouteRules as C, getResponseStatusText as D, nodeServer as E, defu as a, defuFn as b, createError$1 as c, defineEventHandler as d, parseQuery as e, createHooks as f, withTrailingSlash as g, hasProtocol as h, isScriptProtocol as i, joinURL as j, klona as k, withoutTrailingSlash as l, isSamePath as m, createRouter$1 as n, eventHandler as o, parseURL as p, setResponseHeader as q, send as r, sanitizeStatusCode as s, toRouteMatcher as t, getResponseStatus as u, setResponseStatus as v, withQuery as w, useNitroApp as x, setResponseHeaders as y, joinRelativeURL as z };
//# sourceMappingURL=fetchData.mjs.map
