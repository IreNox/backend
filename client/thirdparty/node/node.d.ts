// Type definitions for Node.js v0.12.0
// Project: http://nodejs.org/
// Definitions by: Microsoft TypeScript <http://typescriptlang.org>, DefinitelyTyped <https://github.com/borisyankov/DefinitelyTyped>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/************************************************
*                                               *
*               Node.js v0.12.0 API             *
*                                               *
************************************************/

interface Error {
    stack?: string;
}


// compat for TypeScript 1.5.3
// if you use with --target es3 or --target es5 and use below definitions,
// use the lib.es6.d.ts that is bundled with TypeScript 1.5.3.
interface MapConstructor {}
interface WeakMapConstructor {}
interface SetConstructor {}
interface WeakSetConstructor {}

/************************************************
*                                               *
*                   GLOBAL                      *
*                                               *
************************************************/
declare var process: NodeJS.Process;
declare var global: NodeJS.Global;

declare var __filename: string;
declare var __dirname: string;

declare function setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): NodeJS.Timer;
declare function clearTimeout(timeoutId: NodeJS.Timer): void;
declare function setInterval(callback: (...args: any[]) => void, ms: number, ...args: any[]): NodeJS.Timer;
declare function clearInterval(intervalId: NodeJS.Timer): void;
declare function setImmediate(callback: (...args: any[]) => void, ...args: any[]): any;
declare function clearImmediate(immediateId: any): void;

interface NodeRequireFunction {
    (id: string): any;
}

interface NodeRequire extends NodeRequireFunction {
    resolve(id:string): string;
    cache: any;
    extensions: any;
    main: any;
}

declare var require: NodeRequire;

interface NodeModule {
    exports: any;
    require: NodeRequireFunction;
    id: string;
    filename: string;
    loaded: boolean;
    parent: any;
    children: any[];
}

declare var module: NodeModule;

// Same as module.exports
declare var exports: any;
declare var SlowBuffer: {
    new (str: string, encoding?: string): Buffer;
    new (size: number): Buffer;
    new (size: Uint8Array): Buffer;
    new (array: any[]): Buffer;
    prototype: Buffer;
    isBuffer(obj: any): boolean;
    byteLength(string: string, encoding?: string): number;
    concat(list: Buffer[], totalLength?: number): Buffer;
};


// Buffer class
interface Buffer extends NodeBuffer {}

/**
 * Raw data is stored in instances of the Buffer class.
 * A Buffer is similar to an array of integers but corresponds to a raw memory allocation outside the V8 heap.  A Buffer cannot be resized.
 * Valid string encodings: 'ascii'|'utf8'|'utf16le'|'ucs2'(alias of 'utf16le')|'base64'|'binary'(deprecated)|'hex'
 */
declare var Buffer: {
    /**
     * Allocates a new buffer containing the given {str}.
     *
     * @param str String to store in buffer.
     * @param encoding encoding to use, optional.  Default is 'utf8'
     */
    new (str: string, encoding?: string): Buffer;
    /**
     * Allocates a new buffer of {size} octets.
     *
     * @param size count of octets to allocate.
     */
    new (size: number): Buffer;
    /**
     * Allocates a new buffer containing the given {array} of octets.
     *
     * @param array The octets to store.
     */
    new (array: Uint8Array): Buffer;
    /**
     * Allocates a new buffer containing the given {array} of octets.
     *
     * @param array The octets to store.
     */
    new (array: any[]): Buffer;
    prototype: Buffer;
    /**
     * Returns true if {obj} is a Buffer
     *
     * @param obj object to test.
     */
    isBuffer(obj: any): obj is Buffer;
    /**
     * Returns true if {encoding} is a valid encoding argument.
     * Valid string encodings in Node 0.12: 'ascii'|'utf8'|'utf16le'|'ucs2'(alias of 'utf16le')|'base64'|'binary'(deprecated)|'hex'
     *
     * @param encoding string to test.
     */
    isEncoding(encoding: string): boolean;
    /**
     * Gives the actual byte length of a string. encoding defaults to 'utf8'.
     * This is not the same as String.prototype.length since that returns the number of characters in a string.
     *
     * @param string string to test.
     * @param encoding encoding used to evaluate (defaults to 'utf8')
     */
    byteLength(string: string, encoding?: string): number;
    /**
     * Returns a buffer which is the result of concatenating all the buffers in the list together.
     *
     * If the list has no items, or if the totalLength is 0, then it returns a zero-length buffer.
     * If the list has exactly one item, then the first item of the list is returned.
     * If the list has more than one item, then a new Buffer is created.
     *
     * @param list An array of Buffer objects to concatenate
     * @param totalLength Total length of the buffers when concatenated.
     *   If totalLength is not provided, it is read from the buffers in the list. However, this adds an additional loop to the function, so it is faster to provide the length explicitly.
     */
    concat(list: Buffer[], totalLength?: number): Buffer;
    /**
     * The same as buf1.compare(buf2).
     */
    compare(buf1: Buffer, buf2: Buffer): number;
};

/************************************************
*                                               *
*               GLOBAL INTERFACES               *
*                                               *
************************************************/
declare module NodeJS {
    interface ErrnoException extends Error {
        errno?: number;
        code?: string;
        path?: string;
        syscall?: string;
        stack?: string;
    }

    interface EventEmitter {
        addListener(event: string, listener: Function): EventEmitter;
        on(event: string, listener: Function): EventEmitter;
        once(event: string, listener: Function): EventEmitter;
        removeListener(event: string, listener: Function): EventEmitter;
        removeAllListeners(event?: string): EventEmitter;
        setMaxListeners(n: number): void;
        listeners(event: string): Function[];
        emit(event: string, ...args: any[]): boolean;
    }

    interface ReadableStream extends EventEmitter {
        readable: boolean;
        read(size?: number): string|Buffer;
        setEncoding(encoding: string): void;
        pause(): void;
        resume(): void;
        pipe<T extends WritableStream>(destination: T, options?: { end?: boolean; }): T;
        unpipe<T extends WritableStream>(destination?: T): void;
        unshift(chunk: string): void;
        unshift(chunk: Buffer): void;
        wrap(oldStream: ReadableStream): ReadableStream;
    }

    interface WritableStream extends EventEmitter {
        writable: boolean;
        write(buffer: Buffer|string, cb?: Function): boolean;
        write(str: string, encoding?: string, cb?: Function): boolean;
        end(): void;
        end(buffer: Buffer, cb?: Function): void;
        end(str: string, cb?: Function): void;
        end(str: string, encoding?: string, cb?: Function): void;
    }

    interface ReadWriteStream extends ReadableStream, WritableStream {}

    interface Process extends EventEmitter {
        stdout: WritableStream;
        stderr: WritableStream;
        stdin: ReadableStream;
        argv: string[];
        execPath: string;
        abort(): void;
        chdir(directory: string): void;
        cwd(): string;
        env: any;
        exit(code?: number): void;
        getgid(): number;
        setgid(id: number): void;
        setgid(id: string): void;
        getuid(): number;
        setuid(id: number): void;
        setuid(id: string): void;
        version: string;
        versions: {
            http_parser: string;
            node: string;
            v8: string;
            ares: string;
            uv: string;
            zlib: string;
            openssl: string;
        };
        config: {
            target_defaults: {
                cflags: any[];
                default_configuration: string;
                defines: string[];
                include_dirs: string[];
                libraries: string[];
            };
            variables: {
                clang: number;
                host_arch: string;
                node_install_npm: boolean;
                node_install_waf: boolean;
                node_prefix: string;
                node_shared_openssl: boolean;
                node_shared_v8: boolean;
                node_shared_zlib: boolean;
                node_use_dtrace: boolean;
                node_use_etw: boolean;
                node_use_openssl: boolean;
                target_arch: string;
                v8_no_strict_aliasing: number;
                v8_use_snapshot: boolean;
                visibility: string;
            };
        };
        kill(pid: number, signal?: string): void;
        pid: number;
        title: string;
        arch: string;
        platform: string;
        memoryUsage(): { rss: number; heapTotal: number; heapUsed: number; };
        nextTick(callback: Function): void;
        umask(mask?: number): number;
        uptime(): number;
        hrtime(time?:number[]): number[];

        // Worker
        send?(message: any, sendHandle?: any): void;
    }

    interface Global {
        Array: typeof Array;
        ArrayBuffer: typeof ArrayBuffer;
        Boolean: typeof Boolean;
        Buffer: typeof Buffer;
        DataView: typeof DataView;
        Date: typeof Date;
        Error: typeof Error;
        EvalError: typeof EvalError;
        Float32Array: typeof Float32Array;
        Float64Array: typeof Float64Array;
        Function: typeof Function;
        GLOBAL: Global;
        Infinity: typeof Infinity;
        Int16Array: typeof Int16Array;
        Int32Array: typeof Int32Array;
        Int8Array: typeof Int8Array;
        Intl: typeof Intl;
        JSON: typeof JSON;
        Map: MapConstructor;
        Math: typeof Math;
        NaN: typeof NaN;
        Number: typeof Number;
        Object: typeof Object;
        Promise: Function;
        RangeError: typeof RangeError;
        ReferenceError: typeof ReferenceError;
        RegExp: typeof RegExp;
        Set: SetConstructor;
        String: typeof String;
        Symbol: Function;
        SyntaxError: typeof SyntaxError;
        TypeError: typeof TypeError;
        URIError: typeof URIError;
        Uint16Array: typeof Uint16Array;
        Uint32Array: typeof Uint32Array;
        Uint8Array: typeof Uint8Array;
        Uint8ClampedArray: Function;
        WeakMap: WeakMapConstructor;
        WeakSet: WeakSetConstructor;
        clearImmediate: (immediateId: any) => void;
        clearInterval: (intervalId: NodeJS.Timer) => void;
        clearTimeout: (timeoutId: NodeJS.Timer) => void;
        console: typeof console;
        decodeURI: typeof decodeURI;
        decodeURIComponent: typeof decodeURIComponent;
        encodeURI: typeof encodeURI;
        encodeURIComponent: typeof encodeURIComponent;
        escape: (str: string) => string;
        eval: typeof eval;
        global: Global;
        isFinite: typeof isFinite;
        isNaN: typeof isNaN;
        parseFloat: typeof parseFloat;
        parseInt: typeof parseInt;
        process: Process;
        root: Global;
        setImmediate: (callback: (...args: any[]) => void, ...args: any[]) => any;
        setInterval: (callback: (...args: any[]) => void, ms: number, ...args: any[]) => NodeJS.Timer;
        setTimeout: (callback: (...args: any[]) => void, ms: number, ...args: any[]) => NodeJS.Timer;
        undefined: typeof undefined;
        unescape: (str: string) => string;
        gc: () => void;
    }

    interface Timer {
        ref() : void;
        unref() : void;
    }
}

/**
 * @deprecated
 */
interface NodeBuffer {
    [index: number]: number;
    write(string: string, offset?: number, length?: number, encoding?: string): number;
    toString(encoding?: string, start?: number, end?: number): string;
    toJSON(): any;
    length: number;
    equals(otherBuffer: Buffer): boolean;
    compare(otherBuffer: Buffer): number;
    copy(targetBuffer: Buffer, targetStart?: number, sourceStart?: number, sourceEnd?: number): number;
    slice(start?: number, end?: number): Buffer;
    writeUIntLE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    writeUIntBE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    writeIntLE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    writeIntBE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    readUIntLE(offset: number, byteLength: number, noAssert?: boolean): number;
    readUIntBE(offset: number, byteLength: number, noAssert?: boolean): number;
    readIntLE(offset: number, byteLength: number, noAssert?: boolean): number;
    readIntBE(offset: number, byteLength: number, noAssert?: boolean): number;
    readUInt8(offset: number, noAsset?: boolean): number;
    readUInt16LE(offset: number, noAssert?: boolean): number;
    readUInt16BE(offset: number, noAssert?: boolean): number;
    readUInt32LE(offset: number, noAssert?: boolean): number;
    readUInt32BE(offset: number, noAssert?: boolean): number;
    readInt8(offset: number, noAssert?: boolean): number;
    readInt16LE(offset: number, noAssert?: boolean): number;
    readInt16BE(offset: number, noAssert?: boolean): number;
    readInt32LE(offset: number, noAssert?: boolean): number;
    readInt32BE(offset: number, noAssert?: boolean): number;
    readFloatLE(offset: number, noAssert?: boolean): number;
    readFloatBE(offset: number, noAssert?: boolean): number;
    readDoubleLE(offset: number, noAssert?: boolean): number;
    readDoubleBE(offset: number, noAssert?: boolean): number;
    writeUInt8(value: number, offset: number, noAssert?: boolean): number;
    writeUInt16LE(value: number, offset: number, noAssert?: boolean): number;
    writeUInt16BE(value: number, offset: number, noAssert?: boolean): number;
    writeUInt32LE(value: number, offset: number, noAssert?: boolean): number;
    writeUInt32BE(value: number, offset: number, noAssert?: boolean): number;
    writeInt8(value: number, offset: number, noAssert?: boolean): number;
    writeInt16LE(value: number, offset: number, noAssert?: boolean): number;
    writeInt16BE(value: number, offset: number, noAssert?: boolean): number;
    writeInt32LE(value: number, offset: number, noAssert?: boolean): number;
    writeInt32BE(value: number, offset: number, noAssert?: boolean): number;
    writeFloatLE(value: number, offset: number, noAssert?: boolean): number;
    writeFloatBE(value: number, offset: number, noAssert?: boolean): number;
    writeDoubleLE(value: number, offset: number, noAssert?: boolean): number;
    writeDoubleBE(value: number, offset: number, noAssert?: boolean): number;
    fill(value: any, offset?: number, end?: number): Buffer;
}

/************************************************
*                                               *
*                   MODULES                     *
*                                               *
************************************************/
declare module "buffer" {
    var INSPECT_MAX_BYTES: number;
}

declare module "querystring" {
    function stringify(obj: any, sep?: string, eq?: string): string;
    function parse(str: string, sep?: string, eq?: string, options?: { maxKeys?: number; }): any;
    function escape(str: string): string;
    function unescape(str: string): string;
}

declare module "events" {
    class EventEmitter implements NodeJS.EventEmitter {
        static listenerCount(emitter: EventEmitter, event: string): number;

        addListener(event: string, listener: Function): EventEmitter;
        on(event: string, listener: Function): EventEmitter;
        once(event: string, listener: Function): EventEmitter;
        removeListener(event: string, listener: Function): EventEmitter;
        removeAllListeners(event?: string): EventEmitter;
        setMaxListeners(n: number): void;
        listeners(event: string): Function[];
        emit(event: string, ...args: any[]): boolean;
   }
}

declare module "http" {
    import * as events from "events";
    import * as net from "net";
    import * as stream from "stream";

    interface Server extends events.EventEmitter {
        listen(port: number, hostname?: string, backlog?: number, callback?: Function): Server;
        listen(port: number, hostname?: string, callback?: Function): Server;
        listen(path: string, callback?: Function): Server;
        listen(handle: any, listeningListener?: Function): Server;
        close(cb?: any): Server;
        address(): { port: number; family: string; address: string; };
        maxHeadersCount: number;
    }
    /**
     * @deprecated Use IncomingMessage
     */
    interface ServerRequest extends IncomingMessage {
        connection: net.Socket;
    }
    interface ServerResponse extends events.EventEmitter, stream.Writable {
        // Extended base methods
        write(buffer: Buffer): boolean;
        write(buffer: Buffer, cb?: Function): boolean;
        write(str: string, cb?: Function): boolean;
        write(str: string, encoding?: string, cb?: Function): boolean;
        write(str: string, encoding?: string, fd?: string): boolean;

        writeContinue(): void;
        writeHead(statusCode: number, reasonPhrase?: string, headers?: any): void;
        writeHead(statusCode: number, headers?: any): void;
        statusCode: number;
        statusMessage: string;
        setHeader(name: string, value: string): void;
        sendDate: boolean;
        getHeader(name: string): string;
        removeHeader(name: string): void;
        write(chunk: any, encoding?: string): any;
        addTrailers(headers: any): void;

        // Extended base methods
        end(): void;
        end(buffer: Buffer, cb?: Function): void;
        end(str: string, cb?: Function): void;
        end(str: string, encoding?: string, cb?: Function): void;
        end(data?: any, encoding?: string): void;
    }
    interface ClientRequest extends events.EventEmitter, stream.Writable {
        // Extended base methods
        write(buffer: Buffer): boolean;
        write(buffer: Buffer, cb?: Function): boolean;
        write(str: string, cb?: Function): boolean;
        write(str: string, encoding?: string, cb?: Function): boolean;
        write(str: string, encoding?: string, fd?: string): boolean;

        write(chunk: any, encoding?: string): void;
        abort(): void;
        setTimeout(timeout: number, callback?: Function): void;
        setNoDelay(noDelay?: boolean): void;
        setSocketKeepAlive(enable?: boolean, initialDelay?: number): void;

        // Extended base methods
        end(): void;
        end(buffer: Buffer, cb?: Function): void;
        end(str: string, cb?: Function): void;
        end(str: string, encoding?: string, cb?: Function): void;
        end(data?: any, encoding?: string): void;
    }
    interface IncomingMessage extends events.EventEmitter, stream.Readable {
        httpVersion: string;
        headers: any;
        rawHeaders: string[];
        trailers: any;
        rawTrailers: any;
        setTimeout(msecs: number, callback: Function): NodeJS.Timer;
        /**
         * Only valid for request obtained from http.Server.
         */
        method?: string;
        /**
         * Only valid for request obtained from http.Server.
         */
        url?: string;
        /**
         * Only valid for response obtained from http.ClientRequest.
         */
        statusCode?: number;
        /**
         * Only valid for response obtained from http.ClientRequest.
         */
        statusMessage?: string;
        socket: net.Socket;
    }
    /**
     * @deprecated Use IncomingMessage
     */
    interface ClientResponse extends IncomingMessage { }

	interface AgentOptions {
		/**
		 * Keep sockets around in a pool to be used by other requests in the future. Default = false
		 */
		keepAlive?: boolean;
		/**
		 * When using HTTP KeepAlive, how often to send TCP KeepAlive packets over sockets being kept alive. Default = 1000.
		 * Only relevant if keepAlive is set to true.
		 */
		keepAliveMsecs?: number;
		/**
		 * Maximum number of sockets to allow per host. Default for Node 0.10 is 5, default for Node 0.12 is Infinity
		 */
		maxSockets?: number;
		/**
		 * Maximum number of sockets to leave open in a free state. Only relevant if keepAlive is set to true. Default = 256.
		 */
		maxFreeSockets?: number;
	}

    class Agent {
		maxSockets: number;
		sockets: any;
		requests: any;

		constructor(opts?: AgentOptions);

		/**
		 * Destroy any sockets that are currently in use by the agent.
		 * It is usually not necessary to do this. However, if you are using an agent with KeepAlive enabled,
		 * then it is best to explicitly shut down the agent when you know that it will no longer be used. Otherwise,
		 * sockets may hang open for quite a long time before the server terminates them.
		 */
		destroy(): void;
	}

    var METHODS: string[];

    var STATUS_CODES: {
        [errorCode: number]: string;
        [errorCode: string]: string;
    };
    function createServer(requestListener?: (request: IncomingMessage, response: ServerResponse) =>void ): Server;
    function createClient(port?: number, host?: string): any;
    function request(options: any, callback?: (res: IncomingMessage) => void): ClientRequest;
    function get(options: any, callback?: (res: IncomingMessage) => void): ClientRequest;
    var globalAgent: Agent;
}

declare module "cluster" {
    import * as child from "child_process";
    import * as events from "events";

    interface ClusterSettings {
        exec?: string;
        args?: string[];
        silent?: boolean;
    }

    class Worker extends events.EventEmitter {
        id: string;
        process: child.ChildProcess;
        suicide: boolean;
        send(message: any, sendHandle?: any): void;
        kill(signal?: string): void;
        destroy(signal?: string): void;
        disconnect(): void;
    }

    var settings: ClusterSettings;
    var isMaster: boolean;
    var isWorker: boolean;
    function setupMaster(settings?: ClusterSettings): void;
    function fork(env?: any): Worker;
    function disconnect(callback?: Function): void;
    var worker: Worker;
    var workers: Worker[];

    // Event emitter
    function addListener(event: string, listener: Function): void;
    function on(event: string, listener: Function): any;
    function once(event: string, listener: Function): void;
    function removeListener(event: string, listener: Function): void;
    function removeAllListeners(event?: string): void;
    function setMaxListeners(n: number): void;
    function listeners(event: string): Function[];
    function emit(event: string, ...args: any[]): boolean;
}

declare module "zlib" {
    import * as stream from "stream";
    interface ZlibOptions { chunkSize?: number; windowBits?: number; level?: number; memLevel?: number; strategy?: number; dictionary?: any; }

    interface Gzip extends stream.Transform { }
    interface Gunzip extends stream.Transform { }
    interface Deflate extends stream.Transform { }
    interface Inflate extends stream.Transform { }
    interface DeflateRaw extends stream.Transform { }
    interface InflateRaw extends stream.Transform { }
    interface Unzip extends stream.Transform { }

    function createGzip(options?: ZlibOptions): Gzip;
    function createGunzip(options?: ZlibOptions): Gunzip;
    function createDeflate(options?: ZlibOptions): Deflate;
    function createInflate(options?: ZlibOptions): Inflate;
    function createDeflateRaw(options?: ZlibOptions): DeflateRaw;
    function createInflateRaw(options?: ZlibOptions): InflateRaw;
    function createUnzip(options?: ZlibOptions): Unzip;

    function deflate(buf: Buffer, callback: (error: Error, result: any) =>void ): void;
    function deflateSync(buf: Buffer, options?: ZlibOptions): any;
    function deflateRaw(buf: Buffer, callback: (error: Error, result: any) =>void ): void;
    function deflateRawSync(buf: Buffer, options?: ZlibOptions): any;
    function gzip(buf: Buffer, callback: (error: Error, result: any) =>void ): void;
    function gzipSync(buf: Buffer, options?: ZlibOptions): any;
    function gunzip(buf: Buffer, callback: (error: Error, result: any) =>void ): void;
    function gunzipSync(buf: Buffer, options?: ZlibOptions): any;
    function inflate(buf: Buffer, callback: (error: Error, result: any) =>void ): void;
    function inflateSync(buf: Buffer, options?: ZlibOptions): any;
    function inflateRaw(buf: Buffer, callback: (error: Error, result: any) =>void ): void;
    function inflateRawSync(buf: Buffer, options?: ZlibOptions): any;
    function unzip(buf: Buffer, callback: (error: Error, result: any) =>void ): void;
    function unzipSync(buf: Buffer, options?: ZlibOptions): any;

    // Constants
    var Z_NO_FLUSH: number;
    var Z_PARTIAL_FLUSH: number;
    var Z_SYNC_FLUSH: number;
    var Z_FULL_FLUSH: number;
    var Z_FINISH: number;
    var Z_BLOCK: number;
    var Z_TREES: number;
    var Z_OK: number;
    var Z_STREAM_END: number;
    var Z_NEED_DICT: number;
    var Z_ERRNO: number;
    var Z_STREAM_ERROR: number;
    var Z_DATA_ERROR: number;
    var Z_MEM_ERROR: number;
    var Z_BUF_ERROR: number;
    var Z_VERSION_ERROR: number;
    var Z_NO_COMPRESSION: number;
    var Z_BEST_SPEED: number;
    var Z_BEST_COMPRESSION: number;
    var Z_DEFAULT_COMPRESSION: number;
    var Z_FILTERED: number;
    var Z_HUFFMAN_ONLY: number;
    var Z_RLE: number;
    var Z_FIXED: number;
    var Z_DEFAULT_STRATEGY: number;
    var Z_BINARY: number;
    var Z_TEXT: number;
    var Z_ASCII: number;
    var Z_UNKNOWN: number;
    var Z_DEFLATED: number;
    var Z_NULL: number;
}

declare module "os" {
    function tmpdir(): string;
    function hostname(): string;
    function type(): string;
    function platform(): string;
    function arch(): string;
    function release(): string;
    function uptime(): number;
    function loadavg(): number[];
    function totalmem(): number;
    function freemem(): number;
    function cpus(): { model: string; speed: number; times: { user: number; nice: number; sys: number; idle: number; irq: number; }; }[];
    function networkInterfaces(): any;
    var EOL: string;
}

declare module "https" {
    import * as tls from "tls";
    import * as events from "events";
    import * as http from "http";

    interface ServerOptions {
        pfx?: any;
        key?: any;
        passphrase?: string;
        cert?: any;
        ca?: any;
        crl?: any;
        ciphers?: string;
        honorCipherOrder?: boolean;
        requestCert?: boolean;
        rejectUnauthorized?: boolean;
        NPNProtocols?: any;
        SNICallback?: (servername: string) => any;
    }

    interface RequestOptions {
        host?: string;
        hostname?: string;
        port?: number;
        path?: string;
        method?: string;
        headers?: any;
        auth?: string;
        agent?: any;
        pfx?: any;
        key?: any;
        passphrase?: string;
        cert?: any;
        ca?: any;
        ciphers?: string;
        rejectUnauthorized?: boolean;
    }

    interface Agent {
        maxSockets: number;
        sockets: any;
        requests: any;
    }
    var Agent: {
        new (options?: RequestOptions): Agent;
    };
    interface Server extends tls.Server { }
    function createServer(options: ServerOptions, requestListener?: Function): Server;
    function request(options: RequestOptions, callback?: (res: http.IncomingMessage) =>void ): http.ClientRequest;
    function get(options: RequestOptions, callback?: (res: http.IncomingMessage) =>void ): http.ClientRequest;
    var globalAgent: Agent;
}

declare module "punycode" {
    function decode(string: string): string;
    function encode(string: string): string;
    function toUnicode(domain: string): string;
    function toASCII(domain: string): string;
    var ucs2: ucs2;
    interface ucs2 {
        decode(string: string): string;
        encode(codePoints: number[]): string;
    }
    var version: any;
}

declare module "repl" {
    import * as stream from "stream";
    import * as events from "events";

    interface ReplOptions {
        prompt?: string;
        input?: NodeJS.ReadableStream;
        output?: NodeJS.WritableStream;
        terminal?: boolean;
        eval?: Function;
        useColors?: boolean;
        useGlobal?: boolean;
        ignoreUndefined?: boolean;
        writer?: Function;
    }
    function start(options: ReplOptions): events.EventEmitter;
}

declare module "readline" {
    import * as events from "events";
    import * as stream from "stream";

    interface ReadLine extends events.EventEmitter {
        setPrompt(prompt: string): void;
        prompt(preserveCursor?: boolean): void;
        question(query: string, callback: Function): void;
        pause(): void;
        resume(): void;
        close(): void;
        write(data: any, key?: any): void;
    }
    interface ReadLineOptions {
        input: NodeJS.ReadableStream;
        output: NodeJS.WritableStream;
        completer?: Function;
        terminal?: boolean;
    }
    function createInterface(options: ReadLineOptions): ReadLine;
}

declare module "vm" {
    interface Context { }
    interface Script {
        runInThisContext(): void;
        runInNewContext(sandbox?: Context): void;
    }
    function runInThisContext(code: string, filename?: string): void;
    function runInNewContext(code: string, sandbox?: Context, filename?: string): void;
    function runInContext(code: string, context: Context, filename?: string): void;
    function createContext(initSandbox?: Context): Context;
    function createScript(code: string, filename?: string): Script;
}

declare module "child_process" {
    import * as events from "events";
    import * as stream from "stream";

    interface ChildProcess extends events.EventEmitter {
        stdin:  stream.Writable;
        stdout: stream.Readable;
        stderr: stream.Readable;
        pid: number;
        kill(signal?: string): void;
        send(message: any, sendHandle?: any): void;
        disconnect(): void;
        unref(): void;
    }

    function spawn(command: string, args?: string[], options?: {
        cwd?: string;
        stdio?: any;
        custom?: any;
        env?: any;
        detached?: boolean;
    }): ChildProcess;
    function exec(command: string, options: {
        cwd?: string;
        stdio?: any;
        customFds?: any;
        env?: any;
        encoding?: string;
        timeout?: number;
        maxBuffer?: number;
        killSignal?: string;
    }, callback?: (error: Error, stdout: Buffer, stderr: Buffer) =>void ): ChildProcess;
    function exec(command: string, callback?: (error: Error, stdout: Buffer, stderr: Buffer) =>void ): ChildProcess;
    function execFile(file: string,
        callback?: (error: Error, stdout: Buffer, stderr: Buffer) =>void ): ChildProcess;
    function execFile(file: string, args?: string[],
        callback?: (error: Error, stdout: Buffer, stderr: Buffer) =>void ): ChildProcess;
    function execFile(file: string, args?: string[], options?: {
        cwd?: string;
        stdio?: any;
        customFds?: any;
        env?: any;
        encoding?: string;
        timeout?: number;
        maxBuffer?: number;
        killSignal?: string;
    }, callback?: (error: Error, stdout: Buffer, stderr: Buffer) =>void ): ChildProcess;
    function fork(modulePath: string, args?: string[], options?: {
        cwd?: string;
        env?: any;
        encoding?: string;
    }): ChildProcess;
    function spawnSync(command: string, args?: string[], options?: {
        cwd?: string;
        input?: string | Buffer;
        stdio?: any;
        env?: any;
        uid?: number;
        gid?: number;
        timeout?: number;
        maxBuffer?: number;
        killSignal?: string;
        encoding?: string;
    }): {
        pid: number;
        output: string[];
        stdout: string | Buffer;
        stderr: string | Buffer;
        status: number;
        signal: string;
        error: Error;
    };
    function execSync(command: string, options?: {
        cwd?: string;
        input?: string|Buffer;
        stdio?: any;
        env?: any;
        uid?: number;
        gid?: number;
        timeout?: number;
        maxBuffer?: number;
        killSignal?: string;
        encoding?: string;
    }): string | Buffer;
    function execFileSync(command: string, args?: string[], options?: {
        cwd?: string;
        input?: string|Buffer;
        stdio?: any;
        env?: any;
        uid?: number;
        gid?: number;
        timeout?: number;
        maxBuffer?: number;
        killSignal?: string;
        encoding?: string;
    }): string | Buffer;
}

declare module "url" {
    interface Url {
        href: string;
        protocol: string;
        auth: string;
        hostname: string;
        port: string;
        host: string;
        pathname: string;
        search: string;
        query: any; // string | Object
        slashes: boolean;
        hash?: string;
        path?: string;
    }

    interface UrlOptions {
        protocol?: string;
        auth?: string;
        hostname?: string;
        port?: string;
        host?: string;
        pathname?: string;
        search?: string;
        query?: any;
        hash?: string;
        path?: string;
    }

    function parse(urlStr: string, parseQueryString?: boolean , slashesDenoteHost?: boolean ): Url;
    function format(url: UrlOptions): string;
    function resolve(from: string, to: string): string;
}

declare module "dns" {
    function lookup(domain: string, family: number, callback: (err: Error, address: string, family: number) =>void ): string;
    function lookup(domain: string, callback: (err: Error, address: string, family: number) =>void ): string;
    function resolve(domain: string, rrtype: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    function resolve(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    function resolve4(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    function resolve6(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    function resolveMx(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    function resolveTxt(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    function resolveSrv(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    function resolveNs(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    function resolveCname(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    function reverse(ip: string, callback: (err: Error, domains: string[]) =>void ): string[];
}

declare module "net" {
    import * as stream from "stream";

    interface Socket extends stream.Duplex {
        // Extended base methods
        write(buffer: Buffer): boolean;
        write(buffer: Buffer, cb?: Function): boolean;
        write(str: string, cb?: Function): boolean;
        write(str: string, encoding?: string, cb?: Function): boolean;
        write(str: string, encoding?: string, fd?: string): boolean;

        connect(port: number, host?: string, connectionListener?: Function): void;
        connect(path: string, connectionListener?: Function): void;
        bufferSize: number;
        setEncoding(encoding?: string): void;
        write(data: any, encoding?: string, callback?: Function): void;
        destroy(): void;
        pause(): void;
        resume(): void;
        setTimeout(timeout: number, callback?: Function): void;
        setNoDelay(noDelay?: boolean): void;
        setKeepAlive(enable?: boolean, initialDelay?: number): void;
        address(): { port: number; family: string; address: string; };
        unref(): void;
        ref(): void;

        remoteAddress: string;
        remoteFamily: string;
        remotePort: number;
        localAddress: string;
        localPort: number;
        bytesRead: number;
        bytesWritten: number;

        // Extended base methods
        end(): void;
        end(buffer: Buffer, cb?: Function): void;
        end(str: string, cb?: Function): void;
        end(str: string, encoding?: string, cb?: Function): void;
        end(data?: any, encoding?: string): void;
    }

    var Socket: {
        new (options?: { fd?: string; type?: string; allowHalfOpen?: boolean; }): Socket;
    };

    interface Server extends Socket {
        listen(port: number, host?: string, backlog?: number, listeningListener?: Function): Server;
        listen(path: string, listeningListener?: Function): Server;
        listen(handle: any, listeningListener?: Function): Server;
        close(callback?: Function): Server;
        address(): { port: number; family: string; address: string; };
        maxConnections: number;
        connections: number;
    }
    function createServer(connectionListener?: (socket: Socket) =>void ): Server;
    function createServer(options?: { allowHalfOpen?: boolean; }, connectionListener?: (socket: Socket) =>void ): Server;
    function connect(options: { allowHalfOpen?: boolean; }, connectionListener?: Function): Socket;
    function connect(port: number, host?: string, connectionListener?: Function): Socket;
    function connect(path: string, connectionListener?: Function): Socket;
    function createConnection(options: { allowHalfOpen?: boolean; }, connectionListener?: Function): Socket;
    function createConnection(port: number, host?: string, connectionListener?: Function): Socket;
    function createConnection(path: string, connectionListener?: Function): Socket;
    function isIP(input: string): number;
    function isIPv4(input: string): boolean;
    function isIPv6(input: string): boolean;
}

declare module "dgram" {
    import * as events from "events";

    interface RemoteInfo {
        address: string;
        port: number;
        size: number;
    }

    interface AddressInfo {
        address: string;
        family: string;
        port: number;
    }

    function createSocket(type: string, callback?: (msg: Buffer, rinfo: RemoteInfo) => void): Socket;

    interface Socket extends events.EventEmitter {
        send(buf: Buffer, offset: number, length: number, port: number, address: string, callback?: (error: Error, bytes: number) => void): void;
        bind(port: number, address?: string, callback?: () => void): void;
        close(): void;
        address(): AddressInfo;
        setBroadcast(flag: boolean): void;
        setMulticastTTL(ttl: number): void;
        setMulticastLoopback(flag: boolean): void;
        addMembership(multicastAddress: string, multicastInterface?: string): void;
        dropMembership(multicastAddress: string, multicastInterface?: string): void;
    }
}

declare module "fs" {
    import * as stream from "stream";
    import * as events from "events";

    interface Stats {
        isFile(): boolean;
        isDirectory(): boolean;
        isBlockDevice(): boolean;
        isCharacterDevice(): boolean;
        isSymbolicLink(): boolean;
        isFIFO(): boolean;
        isSocket(): boolean;
        dev: number;
        ino: number;
        mode: number;
        nlink: number;
        uid: number;
        gid: number;
        rdev: number;
        size: number;
        blksize: number;
        blocks: number;
        atime: Date;
        mtime: Date;
        ctime: Date;
        birthtime: Date;
    }

    interface FSWatcher extends events.EventEmitter {
        close(): void;
    }

    interface ReadStream extends stream.Readable {
        close(): void;
    }
    interface WriteStream extends stream.Writable {
        close(): void;
        bytesWritten: number;
    }

    /**
     * Asynchronous rename.
     * @param oldPath
     * @param newPath
     * @param callback No arguments other than a possible exception are given to the completion callback.
     */
    function rename(oldPath: string, newPath: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    /**
     * Synchronous rename
     * @param oldPath
     * @param newPath
     */
    function renameSync(oldPath: string, newPath: string): void;
    function truncate(path: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    function truncate(path: string, len: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    function truncateSync(path: string, len?: number): void;
    function ftruncate(fd: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    function ftruncate(fd: number, len: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    function ftruncateSync(fd: number, len?: number): void;
    function chown(path: string, uid: number, gid: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    function chownSync(path: string, uid: number, gid: number): void;
    function fchown(fd: number, uid: number, gid: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    function fchownSync(fd: number, uid: number, gid: number): void;
    function lchown(path: string, uid: number, gid: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    function lchownSync(path: string, uid: number, gid: number): void;
    function chmod(path: string, mode: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    function chmod(path: string, mode: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    function chmodSync(path: string, mode: number): void;
    function chmodSync(path: string, mode: string): void;
    function fchmod(fd: number, mode: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    function fchmod(fd: number, mode: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    function fchmodSync(fd: number, mode: number): void;
    function fchmodSync(fd: number, mode: string): void;
    function lchmod(path: string, mode: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    function lchmod(path: string, mode: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    function lchmodSync(path: string, mode: number): void;
    function lchmodSync(path: string, mode: string): void;
    function stat(path: string, callback?: (err: NodeJS.ErrnoException, stats: Stats) => any): void;
    function lstat(path: string, callback?: (err: NodeJS.ErrnoException, stats: Stats) => any): void;
    function fstat(fd: number, callback?: (err: NodeJS.ErrnoException, stats: Stats) => any): void;
    function statSync(path: string): Stats;
    function lstatSync(path: string): Stats;
    function fstatSync(fd: number): Stats;
    function link(srcpath: string, dstpath: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    function linkSync(srcpath: string, dstpath: string): void;
    function symlink(srcpath: string, dstpath: string, type?: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    function symlinkSync(srcpath: string, dstpath: string, type?: string): void;
    function readlink(path: string, callback?: (err: NodeJS.ErrnoException, linkString: string) => any): void;
    function readlinkSync(path: string): string;
    function realpath(path: string, callback?: (err: NodeJS.ErrnoException, resolvedPath: string) => any): void;
    function realpath(path: string, cache: {[path: string]: string}, callback: (err: NodeJS.ErrnoException, resolvedPath: string) =>any): void;
    function realpathSync(path: string, cache?: { [path: string]: string }): string;
    /*
     * Asynchronous unlink - deletes the file specified in {path}
     *
     * @param path
     * @param callback No arguments other than a possible exception are given to the completion callback.
     */
    function unlink(path: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    /*
     * Synchronous unlink - deletes the file specified in {path}
     *
     * @param path
     */
    function unlinkSync(path: string): void;
    /*
     * Asynchronous rmdir - removes the directory specified in {path}
     *
     * @param path
     * @param callback No arguments other than a possible exception are given to the completion callback.
     */
    function rmdir(path: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    /*
     * Synchronous rmdir - removes the directory specified in {path}
     *
     * @param path
     */
    function rmdirSync(path: string): void;
    /*
     * Asynchronous mkdir - creates the directory specified in {path}.  Parameter {mode} defaults to 0777.
     *
     * @param path
     * @param callback No arguments other than a possible exception are given to the completion callback.
     */
    function mkdir(path: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    /*
     * Asynchronous mkdir - creates the directory specified in {path}.  Parameter {mode} defaults to 0777.
     *
     * @param path
     * @param mode
     * @param callback No arguments other than a possible exception are given to the completion callback.
     */
    function mkdir(path: string, mode: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    /*
     * Asynchronous mkdir - creates the directory specified in {path}.  Parameter {mode} defaults to 0777.
     *
     * @param path
     * @param mode
     * @param callback No arguments other than a possible exception are given to the completion callback.
     */
    function mkdir(path: string, mode: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    /*
     * Synchronous mkdir - creates the directory specified in {path}.  Parameter {mode} defaults to 0777.
     *
     * @param path
     * @param mode
     * @param callback No arguments other than a possible exception are given to the completion callback.
     */
    function mkdirSync(path: string, mode?: number): void;
    /*
     * Synchronous mkdir - creates the directory specified in {path}.  Parameter {mode} defaults to 0777.
     *
     * @param path
     * @param mode
     * @param callback No arguments other than a possible exception are given to the completion callback.
     */
    function mkdirSync(path: string, mode?: string): void;
    function readdir(path: string, callback?: (err: NodeJS.ErrnoException, files: string[]) => void): void;
    function readdirSync(path: string): string[];
    function close(fd: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    function closeSync(fd: number): void;
    function open(path: string, flags: string, callback?: (err: NodeJS.ErrnoException, fd: number) => any): void;
    function open(path: string, flags: string, mode: number, callback?: (err: NodeJS.ErrnoException, fd: number) => any): void;
    function open(path: string, flags: string, mode: string, callback?: (err: NodeJS.ErrnoException, fd: number) => any): void;
    function openSync(path: string, flags: string, mode?: number): number;
    function openSync(path: string, flags: string, mode?: string): number;
    function utimes(path: string, atime: number, mtime: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    function utimes(path: string, atime: Date, mtime: Date, callback?: (err?: NodeJS.ErrnoException) => void): void;
    function utimesSync(path: string, atime: number, mtime: number): void;
    function utimesSync(path: string, atime: Date, mtime: Date): void;
    function futimes(fd: number, atime: number, mtime: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    function futimes(fd: number, atime: Date, mtime: Date, callback?: (err?: NodeJS.ErrnoException) => void): void;
    function futimesSync(fd: number, atime: number, mtime: number): void;
    function futimesSync(fd: number, atime: Date, mtime: Date): void;
    function fsync(fd: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    function fsyncSync(fd: number): void;
    function write(fd: number, buffer: Buffer, offset: number, length: number, position: number, callback?: (err: NodeJS.ErrnoException, written: number, buffer: Buffer) => void): void;
    function write(fd: number, buffer: Buffer, offset: number, length: number, callback?: (err: NodeJS.ErrnoException, written: number, buffer: Buffer) => void): void;
    function write(fd: number, data: any, callback?: (err: NodeJS.ErrnoException, written: number, str: string) => void): void;
    function write(fd: number, data: any, offset: number, callback?: (err: NodeJS.ErrnoException, written: number, str: string) => void): void;
    function write(fd: number, data: any, offset: number, encoding: string, callback?: (err: NodeJS.ErrnoException, written: number, str: string) => void): void;
    function writeSync(fd: number, buffer: Buffer, offset: number, length: number, position: number): number;
    function read(fd: number, buffer: Buffer, offset: number, length: number, position: number, callback?: (err: NodeJS.ErrnoException, bytesRead: number, buffer: Buffer) => void): void;
    function readSync(fd: number, buffer: Buffer, offset: number, length: number, position: number): number;
    /*
     * Asynchronous readFile - Asynchronously reads the entire contents of a file.
     *
     * @param fileName
     * @param encoding
     * @param callback - The callback is passed two arguments (err, data), where data is the contents of the file.
     */
    function readFile(filename: string, encoding: string, callback: (err: NodeJS.ErrnoException, data: string) => void): void;
    /*
     * Asynchronous readFile - Asynchronously reads the entire contents of a file.
     *
     * @param fileName
     * @param options An object with optional {encoding} and {flag} properties.  If {encoding} is specified, readFile returns a string; otherwise it returns a Buffer.
     * @param callback - The callback is passed two arguments (err, data), where data is the contents of the file.
     */
    function readFile(filename: string, options: { encoding: string; flag?: string; }, callback: (err: NodeJS.ErrnoException, data: string) => void): void;
    /*
     * Asynchronous readFile - Asynchronously reads the entire contents of a file.
     *
     * @param fileName
     * @param options An object with optional {encoding} and {flag} properties.  If {encoding} is specified, readFile returns a string; otherwise it returns a Buffer.
     * @param callback - The callback is passed two arguments (err, data), where data is the contents of the file.
     */
    function readFile(filename: string, options: { flag?: string; }, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void;
    /*
     * Asynchronous readFile - Asynchronously reads the entire contents of a file.
     *
     * @param fileName
     * @param callback - The callback is passed two arguments (err, data), where data is the contents of the file.
     */
    function readFile(filename: string, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void;
    /*
     * Synchronous readFile - Synchronously reads the entire contents of a file.
     *
     * @param fileName
     * @param encoding
     */
    function readFileSync(filename: string, encoding: string): string;
    /*
     * Synchronous readFile - Synchronously reads the entire contents of a file.
     *
     * @param fileName
     * @param options An object with optional {encoding} and {flag} properties.  If {encoding} is specified, readFileSync returns a string; otherwise it returns a Buffer.
     */
    function readFileSync(filename: string, options: { encoding: string; flag?: string; }): string;
    /*
     * Synchronous readFile - Synchronously reads the entire contents of a file.
     *
     * @param fileName
     * @param options An object with optional {encoding} and {flag} properties.  If {encoding} is specified, readFileSync returns a string; otherwise it returns a Buffer.
     */
    function readFileSync(filename: string, options?: { flag?: string; }): Buffer;
    function writeFile(filename: string, data: any, callback?: (err: NodeJS.ErrnoException) => void): void;
    function writeFile(filename: string, data: any, options: { encoding?: string; mode?: number; flag?: string; }, callback?: (err: NodeJS.ErrnoException) => void): void;
    function writeFile(filename: string, data: any, options: { encoding?: string; mode?: string; flag?: string; }, callback?: (err: NodeJS.ErrnoException) => void): void;
    function writeFileSync(filename: string, data: any, options?: { encoding?: string; mode?: number; flag?: string; }): void;
    function writeFileSync(filename: string, data: any, options?: { encoding?: string; mode?: string; flag?: string; }): void;
    function appendFile(filename: string, data: any, options: { encoding?: string; mode?: number; flag?: string; }, callback?: (err: NodeJS.ErrnoException) => void): void;
    function appendFile(filename: string, data: any, options: { encoding?: string; mode?: string; flag?: string; }, callback?: (err: NodeJS.ErrnoException) => void): void;
    function appendFile(filename: string, data: any, callback?: (err: NodeJS.ErrnoException) => void): void;
    function appendFileSync(filename: string, data: any, options?: { encoding?: string; mode?: number; flag?: string; }): void;
    function appendFileSync(filename: string, data: any, options?: { encoding?: string; mode?: string; flag?: string; }): void;
    function watchFile(filename: string, listener: (curr: Stats, prev: Stats) => void): void;
    function watchFile(filename: string, options: { persistent?: boolean; interval?: number; }, listener: (curr: Stats, prev: Stats) => void): void;
    function unwatchFile(filename: string, listener?: (curr: Stats, prev: Stats) => void): void;
    function watch(filename: string, listener?: (event: string, filename: string) => any): FSWatcher;
    function watch(filename: string, options: { persistent?: boolean; }, listener?: (event: string, filename: string) => any): FSWatcher;
    function exists(path: string, callback?: (exists: boolean) => void): void;
    function existsSync(path: string): boolean;
    /** Constant for fs.access(). File is visible to the calling process. */
    var F_OK: number;
    /** Constant for fs.access(). File can be read by the calling process. */
    var R_OK: number;
    /** Constant for fs.access(). File can be written by the calling process. */
    var W_OK: number;
    /** Constant for fs.access(). File can be executed by the calling process. */
    var X_OK: number;
    /** Tests a user's permissions for the file specified by path. */
    function access(path: string, callback: (err: NodeJS.ErrnoException) => void): void;
    function access(path: string, mode: number, callback: (err: NodeJS.ErrnoException) => void): void;
    /** Synchronous version of fs.access. This throws if any accessibility checks fail, and does nothing otherwise. */
    function accessSync(path: string, mode ?: number): void;
    function createReadStream(path: string, options?: {
        flags?: string;
        encoding?: string;
        fd?: number;
        mode?: number;
        autoClose?: boolean;
    }): ReadStream;
    function createWriteStream(path: string, options?: {
        flags?: string;
        encoding?: string;
        fd?: number;
        mode?: number;
    }): WriteStream;
}

declare module "path" {

    /**
     * A parsed path object generated by path.parse() or consumed by path.format().
     */
    interface ParsedPath {
        /**
         * The root of the path such as '/' or 'c:\'
         */
        root: string;
        /**
         * The full directory path such as '/home/user/dir' or 'c:\path\dir'
         */
        dir: string;
        /**
         * The file name including extension (if any) such as 'index.html'
         */
        base: string;
        /**
         * The file extension (if any) such as '.html'
         */
        ext: string;
        /**
         * The file name without extension (if any) such as 'index'
         */
        name: string;
    }

    /**
     * Normalize a string path, reducing '..' and '.' parts.
     * When multiple slashes are found, they're replaced by a single one; when the path contains a trailing slash, it is preserved. On Windows backslashes are used.
     *
     * @param p string path to normalize.
     */
    function normalize(p: string): string;
    /**
     * Join all arguments together and normalize the resulting path.
     * Arguments must be strings. In v0.8, non-string arguments were silently ignored. In v0.10 and up, an exception is thrown.
     *
     * @param paths string paths to join.
     */
    function join(...paths: any[]): string;
    /**
     * Join all arguments together and normalize the resulting path.
     * Arguments must be strings. In v0.8, non-string arguments were silently ignored. In v0.10 and up, an exception is thrown.
     *
     * @param paths string paths to join.
     */
    function join(...paths: string[]): string;
    /**
     * The right-most parameter is considered {to}.  Other parameters are considered an array of {from}.
     *
     * Starting from leftmost {from} paramter, resolves {to} to an absolute path.
     *
     * If {to} isn't already absolute, {from} arguments are prepended in right to left order, until an absolute path is found. If after using all {from} paths still no absolute path is found, the current working directory is used as well. The resulting path is normalized, and trailing slashes are removed unless the path gets resolved to the root directory.
     *
     * @param pathSegments string paths to join.  Non-string arguments are ignored.
     */
    function resolve(...pathSegments: any[]): string;
    /**
     * Determines whether {path} is an absolute path. An absolute path will always resolve to the same location, regardless of the working directory.
     *
     * @param path path to test.
     */
    function isAbsolute(path: string): boolean;
    /**
     * Solve the relative path from {from} to {to}.
     * At times we have two absolute paths, and we need to derive the relative path from one to the other. This is actually the reverse transform of path.resolve.
     *
     * @param from
     * @param to
     */
    function relative(from: string, to: string): string;
    /**
     * Return the directory name of a path. Similar to the Unix dirname command.
     *
     * @param p the path to evaluate.
     */
    function dirname(p: string): string;
    /**
     * Return the last portion of a path. Similar to the Unix basename command.
     * Often used to extract the file name from a fully qualified path.
     *
     * @param p the path to evaluate.
     * @param ext optionally, an extension to remove from the result.
     */
    function basename(p: string, ext?: string): string;
    /**
     * Return the extension of the path, from the last '.' to end of string in the last portion of the path.
     * If there is no '.' in the last portion of the path or the first character of it is '.', then it returns an empty string
     *
     * @param p the path to evaluate.
     */
    function extname(p: string): string;
    /**
     * The platform-specific file separator. '\\' or '/'.
     */
    var sep: string;
    /**
     * The platform-specific file delimiter. ';' or ':'.
     */
    var delimiter: string;
    /**
     * Returns an object from a path string - the opposite of format().
     *
     * @param pathString path to evaluate.
     */
    function parse(pathString: string): ParsedPath;
    /**
     * Returns a path string from an object - the opposite of parse().
     *
     * @param pathString path to evaluate.
     */
    function format(pathObject: ParsedPath): string;

    module posix {
      function normalize(p: string): string;
      function join(...paths: any[]): string;
      function resolve(...pathSegments: any[]): string;
      function isAbsolute(p: string): boolean;
      function relative(from: string, to: string): string;
      function dirname(p: string): string;
      function basename(p: string, ext?: string): string;
      function extname(p: string): string;
      var sep: string;
      var delimiter: string;
      function parse(p: string): ParsedPath;
      function format(pP: ParsedPath): string;
    }

    module win32 {
      function normalize(p: string): string;
      function join(...paths: any[]): string;
      function resolve(...pathSegments: any[]): string;
      function isAbsolute(p: string): boolean;
      function relative(from: string, to: string): string;
      function dirname(p: string): string;
      function basename(p: string, ext?: string): string;
      function extname(p: string): string;
      var sep: string;
      var delimiter: string;
      function parse(p: string): ParsedPath;
      function format(pP: ParsedPath): string;
    }
}

declare module "string_decoder" {
    interface NodeStringDecoder {
        write(buffer: Buffer): string;
        detectIncompleteChar(buffer: Buffer): number;
    }
    var StringDecoder: {
        new (encoding: string): NodeStringDecoder;
    };
}

declare module "tls" {
    import * as crypto from "crypto";
    import * as net from "net";
    import * as stream from "stream";

    var CLIENT_RENEG_LIMIT: number;
    var CLIENT_RENEG_WINDOW: number;

    interface TlsOptions {
        pfx?: any;   //string or buffer
        key?: any;   //string or buffer
        passphrase?: string;
        cert?: any;
        ca?: any;    //string or buffer
        crl?: any;   //string or string array
        ciphers?: string;
        honorCipherOrder?: any;
        requestCert?: boolean;
        rejectUnauthorized?: boolean;
        NPNProtocols?: any;  //array or Buffer;
        SNICallback?: (servername: string) => any;
    }

    interface ConnectionOptions {
        host?: string;
        port?: number;
        socket?: net.Socket;
        pfx?: any;   //string | Buffer
        key?: any;   //string | Buffer
        passphrase?: string;
        cert?: any;  //string | Buffer
        ca?: any;    //Array of string | Buffer
        rejectUnauthorized?: boolean;
        NPNProtocols?: any;  //Array of string | Buffer
        servername?: string;
    }

    interface Server extends net.Server {
        // Extended base methods
        listen(port: number, host?: string, backlog?: number, listeningListener?: Function): Server;
        listen(path: string, listeningListener?: Function): Server;
        listen(handle: any, listeningListener?: Function): Server;

        listen(port: number, host?: string, callback?: Function): Server;
        close(): Server;
        address(): { port: number; family: string; address: string; };
        addContext(hostName: string, credentials: {
            key: string;
            cert: string;
            ca: string;
        }): void;
        maxConnections: number;
        connections: number;
    }

    interface ClearTextStream extends stream.Duplex {
        authorized: boolean;
        authorizationError: Error;
        getPeerCertificate(): any;
        getCipher: {
            name: string;
            version: string;
        };
        address: {
            port: number;
            family: string;
            address: string;
        };
        remoteAddress: string;
        remotePort: number;
    }

    interface SecurePair {
        encrypted: any;
        cleartext: any;
    }

    interface SecureContextOptions {
        pfx?: any;   //string | buffer
        key?: any;   //string | buffer
        passphrase?: string;
        cert?: any;  // string | buffer
        ca?: any;    // string | buffer
        crl?: any;   // string | string[]
        ciphers?: string;
        honorCipherOrder?: boolean;
    }

    interface SecureContext {
        context: any;
    }

    function createServer(options: TlsOptions, secureConnectionListener?: (cleartextStream: ClearTextStream) =>void ): Server;
    function connect(options: TlsOptions, secureConnectionListener?: () =>void ): ClearTextStream;
    function connect(port: number, host?: string, options?: ConnectionOptions, secureConnectListener?: () =>void ): ClearTextStream;
    function connect(port: number, options?: ConnectionOptions, secureConnectListener?: () =>void ): ClearTextStream;
    function createSecurePair(credentials?: crypto.Credentials, isServer?: boolean, requestCert?: boolean, rejectUnauthorized?: boolean): SecurePair;
    function createSecureContext(details: SecureContextOptions): SecureContext;
}

declare module "crypto" {
    interface CredentialDetails {
        pfx: string;
        key: string;
        passphrase: string;
        cert: string;
        ca: any;    //string | string array
        crl: any;   //string | string array
        ciphers: string;
    }
    interface Credentials { context?: any; }
    function createCredentials(details: CredentialDetails): Credentials;
    function createHash(algorithm: string): Hash;
    function createHmac(algorithm: string, key: string): Hmac;
    function createHmac(algorithm: string, key: Buffer): Hmac;
    interface Hash {
        update(data: any, input_encoding?: string): Hash;
        digest(encoding: 'buffer'): Buffer;
        digest(encoding: string): any;
        digest(): Buffer;
    }
    interface Hmac {
        update(data: any, input_encoding?: string): Hmac;
        digest(encoding: 'buffer'): Buffer;
        digest(encoding: string): any;
        digest(): Buffer;
    }
    function createCipher(algorithm: string, password: any): Cipher;
    function createCipheriv(algorithm: string, key: any, iv: any): Cipher;
    interface Cipher {
        update(data: Buffer): Buffer;
        update(data: string, input_encoding?: string, output_encoding?: string): string;
        final(): Buffer;
        final(output_encoding: string): string;
        setAutoPadding(auto_padding: boolean): void;
    }
    function createDecipher(algorithm: string, password: any): Decipher;
    function createDecipheriv(algorithm: string, key: any, iv: any): Decipher;
    interface Decipher {
        update(data: Buffer): Buffer;
        update(data: string, input_encoding?: string, output_encoding?: string): string;
        final(): Buffer;
        final(output_encoding: string): string;
        setAutoPadding(auto_padding: boolean): void;
    }
    function createSign(algorithm: string): Signer;
    interface Signer extends NodeJS.WritableStream {
        update(data: any): void;
        sign(private_key: string, output_format: string): string;
    }
    function createVerify(algorith: string): Verify;
    interface Verify extends NodeJS.WritableStream {
        update(data: any): void;
        verify(object: string, signature: string, signature_format?: string): boolean;
    }
    function createDiffieHellman(prime_length: number): DiffieHellman;
    function createDiffieHellman(prime: number, encoding?: string): DiffieHellman;
    interface DiffieHellman {
        generateKeys(encoding?: string): string;
        computeSecret(other_public_key: string, input_encoding?: string, output_encoding?: string): string;
        getPrime(encoding?: string): string;
        getGenerator(encoding: string): string;
        getPublicKey(encoding?: string): string;
        getPrivateKey(encoding?: string): string;
        setPublicKey(public_key: string, encoding?: string): void;
        setPrivateKey(public_key: string, encoding?: string): void;
    }
    function getDiffieHellman(group_name: string): DiffieHellman;
    function pbkdf2(password: string, salt: string, iterations: number, keylen: number, callback: (err: Error, derivedKey: Buffer) => any): void;
    function pbkdf2(password: string, salt: string, iterations: number, keylen: number, digest: string, callback: (err: Error, derivedKey: Buffer) => any): void;
    function pbkdf2Sync(password: string, salt: string, iterations: number, keylen: number) : Buffer;
    function pbkdf2Sync(password: string, salt: string, iterations: number, keylen: number, digest: string) : Buffer;
    function randomBytes(size: number): Buffer;
    function randomBytes(size: number, callback: (err: Error, buf: Buffer) =>void ): void;
    function pseudoRandomBytes(size: number): Buffer;
    function pseudoRandomBytes(size: number, callback: (err: Error, buf: Buffer) =>void ): void;
}

declare module "stream" {
    import * as events from "events";

    interface Stream extends events.EventEmitter {
        pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean; }): T;
    }

    interface ReadableOptions {
        highWaterMark?: number;
        encoding?: string;
        objectMode?: boolean;
    }

    class Readable extends events.EventEmitter implements NodeJS.ReadableStream {
        readable: boolean;
        constructor(opts?: ReadableOptions);
        _read(size: number): void;
        read(size?: number): any;
        setEncoding(encoding: string): void;
        pause(): void;
        resume(): void;
        pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean; }): T;
        unpipe<T extends NodeJS.WritableStream>(destination?: T): void;
        unshift(chunk: any): void;
        wrap(oldStream: NodeJS.ReadableStream): NodeJS.ReadableStream;
        push(chunk: any, encoding?: string): boolean;
    }

    interface WritableOptions {
        highWaterMark?: number;
        decodeStrings?: boolean;
        objectMode?: boolean;
    }

    class Writable extends events.EventEmitter implements NodeJS.WritableStream {
        writable: boolean;
        constructor(opts?: WritableOptions);
        _write(chunk: any, encoding: string, callback: Function): void;
        write(chunk: any, cb?: Function): boolean;
        write(chunk: any, encoding?: string, cb?: Function): boolean;
        end(): void;
        end(chunk: any, cb?: Function): void;
        end(chunk: any, encoding?: string, cb?: Function): void;
    }

    interface DuplexOptions extends ReadableOptions, WritableOptions {
        allowHalfOpen?: boolean;
    }

    // Note: Duplex extends both Readable and Writable.
    class Duplex extends Readable implements NodeJS.ReadWriteStream {
        writable: boolean;
        constructor(opts?: DuplexOptions);
        _write(chunk: any, encoding: string, callback: Function): void;
        write(chunk: any, cb?: Function): boolean;
        write(chunk: any, encoding?: string, cb?: Function): boolean;
        end(): void;
        end(chunk: any, cb?: Function): void;
        end(chunk: any, encoding?: string, cb?: Function): void;
    }

    interface TransformOptions extends ReadableOptions, WritableOptions {}

    // Note: Transform lacks the _read and _write methods of Readable/Writable.
    class Transform extends events.EventEmitter implements NodeJS.ReadWriteStream {
        readable: boolean;
        writable: boolean;
        constructor(opts?: TransformOptions);
        _transform(chunk: any, encoding: string, callback: Function): void;
        _flush(callback: Function): void;
        read(size?: number): any;
        setEncoding(encoding: string): void;
        pause(): void;
        resume(): void;
        pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean; }): T;
        unpipe<T extends NodeJS.WritableStream>(destination?: T): void;
        unshift(chunk: any): void;
        wrap(oldStream: NodeJS.ReadableStream): NodeJS.ReadableStream;
        push(chunk: any, encoding?: string): boolean;
        write(chunk: any, cb?: Function): boolean;
        write(chunk: any, encoding?: string, cb?: Function): boolean;
        end(): void;
        end(chunk: any, cb?: Function): void;
        end(chunk: any, encoding?: string, cb?: Function): void;
    }

    class PassThrough extends Transform {}
}

declare module "util" {
    interface InspectOptions {
        showHidden?: boolean;
        depth?: number;
        colors?: boolean;
        customInspect?: boolean;
    }

    function format(format: any, ...param: any[]): string;
    function debug(string: string): void;
    function error(...param: any[]): void;
    function puts(...param: any[]): void;
    function print(...param: any[]): void;
    function log(string: string): void;
    function inspect(object: any, showHidden?: boolean, depth?: number, color?: boolean): string;
    function inspect(object: any, options: InspectOptions): string;
    function isArray(object: any): boolean;
    function isRegExp(object: any): boolean;
    function isDate(object: any): boolean;
    function isError(object: any): boolean;
    function inherits(constructor: any, superConstructor: any): void;
    function debuglog(key:string): (msg:string,...param: any[])=>void;
}

declare module "assert" {
    function internal (value: any, message?: string): void;
    module internal {
        class AssertionError implements Error {
            name: string;
            message: string;
            actual: any;
            expected: any;
            operator: string;
            generatedMessage: boolean;

            constructor(options?: {message?: string; actual?: any; expected?: any;
                                  operator?: string; stackStartFunction?: Function});
        }

        function fail(actual?: any, expected?: any, message?: string, operator?: string): void;
        function ok(value: any, message?: string): void;
        function equal(actual: any, expected: any, message?: string): void;
        function notEqual(actual: any, expected: any, message?: string): void;
        function deepEqual(actual: any, expected: any, message?: string): void;
        function notDeepEqual(acutal: any, expected: any, message?: string): void;
        function strictEqual(actual: any, expected: any, message?: string): void;
        function notStrictEqual(actual: any, expected: any, message?: string): void;
        var throws: {
            (block: Function, message?: string): void;
            (block: Function, error: Function, message?: string): void;
            (block: Function, error: RegExp, message?: string): void;
            (block: Function, error: (err: any) => boolean, message?: string): void;
        };

        var doesNotThrow: {
            (block: Function, message?: string): void;
            (block: Function, error: Function, message?: string): void;
            (block: Function, error: RegExp, message?: string): void;
            (block: Function, error: (err: any) => boolean, message?: string): void;
        };

        function ifError(value: any): void;
    }

    export  = internal;
}

declare module "tty" {
    import * as net from "net";

    function isatty(fd: number): boolean;
    interface ReadStream extends net.Socket {
        isRaw: boolean;
        setRawMode(mode: boolean): void;
    }
    interface WriteStream extends net.Socket {
        columns: number;
        rows: number;
    }
}

declare module "domain" {
    import * as events from "events";

    class Domain extends events.EventEmitter {
        run(fn: Function): void;
        add(emitter: events.EventEmitter): void;
        remove(emitter: events.EventEmitter): void;
        bind(cb: (err: Error, data: any) => any): any;
        intercept(cb: (data: any) => any): any;
        dispose(): void;

        addListener(event: string, listener: Function): Domain;
        on(event: string, listener: Function): Domain;
        once(event: string, listener: Function): Domain;
        removeListener(event: string, listener: Function): Domain;
        removeAllListeners(event?: string): Domain;
    }

    function create(): Domain;
}

declare module "constants" {
    var E2BIG: number;
    var EACCES: number;
    var EADDRINUSE: number;
    var EADDRNOTAVAIL: number;
    var EAFNOSUPPORT: number;
    var EAGAIN: number;
    var EALREADY: number;
    var EBADF: number;
    var EBADMSG: number;
    var EBUSY: number;
    var ECANCELED: number;
    var ECHILD: number;
    var ECONNABORTED: number;
    var ECONNREFUSED: number;
    var ECONNRESET: number;
    var EDEADLK: number;
    var EDESTADDRREQ: number;
    var EDOM: number;
    var EEXIST: number;
    var EFAULT: number;
    var EFBIG: number;
    var EHOSTUNREACH: number;
    var EIDRM: number;
    var EILSEQ: number;
    var EINPROGRESS: number;
    var EINTR: number;
    var EINVAL: number;
    var EIO: number;
    var EISCONN: number;
    var EISDIR: number;
    var ELOOP: number;
    var EMFILE: number;
    var EMLINK: number;
    var EMSGSIZE: number;
    var ENAMETOOLONG: number;
    var ENETDOWN: number;
    var ENETRESET: number;
    var ENETUNREACH: number;
    var ENFILE: number;
    var ENOBUFS: number;
    var ENODATA: number;
    var ENODEV: number;
    var ENOENT: number;
    var ENOEXEC: number;
    var ENOLCK: number;
    var ENOLINK: number;
    var ENOMEM: number;
    var ENOMSG: number;
    var ENOPROTOOPT: number;
    var ENOSPC: number;
    var ENOSR: number;
    var ENOSTR: number;
    var ENOSYS: number;
    var ENOTCONN: number;
    var ENOTDIR: number;
    var ENOTEMPTY: number;
    var ENOTSOCK: number;
    var ENOTSUP: number;
    var ENOTTY: number;
    var ENXIO: number;
    var EOPNOTSUPP: number;
    var EOVERFLOW: number;
    var EPERM: number;
    var EPIPE: number;
    var EPROTO: number;
    var EPROTONOSUPPORT: number;
    var EPROTOTYPE: number;
    var ERANGE: number;
    var EROFS: number;
    var ESPIPE: number;
    var ESRCH: number;
    var ETIME: number;
    var ETIMEDOUT: number;
    var ETXTBSY: number;
    var EWOULDBLOCK: number;
    var EXDEV: number;
    var WSAEINTR: number;
    var WSAEBADF: number;
    var WSAEACCES: number;
    var WSAEFAULT: number;
    var WSAEINVAL: number;
    var WSAEMFILE: number;
    var WSAEWOULDBLOCK: number;
    var WSAEINPROGRESS: number;
    var WSAEALREADY: number;
    var WSAENOTSOCK: number;
    var WSAEDESTADDRREQ: number;
    var WSAEMSGSIZE: number;
    var WSAEPROTOTYPE: number;
    var WSAENOPROTOOPT: number;
    var WSAEPROTONOSUPPORT: number;
    var WSAESOCKTNOSUPPORT: number;
    var WSAEOPNOTSUPP: number;
    var WSAEPFNOSUPPORT: number;
    var WSAEAFNOSUPPORT: number;
    var WSAEADDRINUSE: number;
    var WSAEADDRNOTAVAIL: number;
    var WSAENETDOWN: number;
    var WSAENETUNREACH: number;
    var WSAENETRESET: number;
    var WSAECONNABORTED: number;
    var WSAECONNRESET: number;
    var WSAENOBUFS: number;
    var WSAEISCONN: number;
    var WSAENOTCONN: number;
    var WSAESHUTDOWN: number;
    var WSAETOOMANYREFS: number;
    var WSAETIMEDOUT: number;
    var WSAECONNREFUSED: number;
    var WSAELOOP: number;
    var WSAENAMETOOLONG: number;
    var WSAEHOSTDOWN: number;
    var WSAEHOSTUNREACH: number;
    var WSAENOTEMPTY: number;
    var WSAEPROCLIM: number;
    var WSAEUSERS: number;
    var WSAEDQUOT: number;
    var WSAESTALE: number;
    var WSAEREMOTE: number;
    var WSASYSNOTREADY: number;
    var WSAVERNOTSUPPORTED: number;
    var WSANOTINITIALISED: number;
    var WSAEDISCON: number;
    var WSAENOMORE: number;
    var WSAECANCELLED: number;
    var WSAEINVALIDPROCTABLE: number;
    var WSAEINVALIDPROVIDER: number;
    var WSAEPROVIDERFAILEDINIT: number;
    var WSASYSCALLFAILURE: number;
    var WSASERVICE_NOT_FOUND: number;
    var WSATYPE_NOT_FOUND: number;
    var WSA_E_NO_MORE: number;
    var WSA_E_CANCELLED: number;
    var WSAEREFUSED: number;
    var SIGHUP: number;
    var SIGINT: number;
    var SIGILL: number;
    var SIGABRT: number;
    var SIGFPE: number;
    var SIGKILL: number;
    var SIGSEGV: number;
    var SIGTERM: number;
    var SIGBREAK: number;
    var SIGWINCH: number;
    var SSL_OP_ALL: number;
    var SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION: number;
    var SSL_OP_CIPHER_SERVER_PREFERENCE: number;
    var SSL_OP_CISCO_ANYCONNECT: number;
    var SSL_OP_COOKIE_EXCHANGE: number;
    var SSL_OP_CRYPTOPRO_TLSEXT_BUG: number;
    var SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS: number;
    var SSL_OP_EPHEMERAL_RSA: number;
    var SSL_OP_LEGACY_SERVER_CONNECT: number;
    var SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER: number;
    var SSL_OP_MICROSOFT_SESS_ID_BUG: number;
    var SSL_OP_MSIE_SSLV2_RSA_PADDING: number;
    var SSL_OP_NETSCAPE_CA_DN_BUG: number;
    var SSL_OP_NETSCAPE_CHALLENGE_BUG: number;
    var SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG: number;
    var SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG: number;
    var SSL_OP_NO_COMPRESSION: number;
    var SSL_OP_NO_QUERY_MTU: number;
    var SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION: number;
    var SSL_OP_NO_SSLv2: number;
    var SSL_OP_NO_SSLv3: number;
    var SSL_OP_NO_TICKET: number;
    var SSL_OP_NO_TLSv1: number;
    var SSL_OP_NO_TLSv1_1: number;
    var SSL_OP_NO_TLSv1_2: number;
    var SSL_OP_PKCS1_CHECK_1: number;
    var SSL_OP_PKCS1_CHECK_2: number;
    var SSL_OP_SINGLE_DH_USE: number;
    var SSL_OP_SINGLE_ECDH_USE: number;
    var SSL_OP_SSLEAY_080_CLIENT_DH_BUG: number;
    var SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG: number;
    var SSL_OP_TLS_BLOCK_PADDING_BUG: number;
    var SSL_OP_TLS_D5_BUG: number;
    var SSL_OP_TLS_ROLLBACK_BUG: number;
    var ENGINE_METHOD_DSA: number;
    var ENGINE_METHOD_DH: number;
    var ENGINE_METHOD_RAND: number;
    var ENGINE_METHOD_ECDH: number;
    var ENGINE_METHOD_ECDSA: number;
    var ENGINE_METHOD_CIPHERS: number;
    var ENGINE_METHOD_DIGESTS: number;
    var ENGINE_METHOD_STORE: number;
    var ENGINE_METHOD_PKEY_METHS: number;
    var ENGINE_METHOD_PKEY_ASN1_METHS: number;
    var ENGINE_METHOD_ALL: number;
    var ENGINE_METHOD_NONE: number;
    var DH_CHECK_P_NOT_SAFE_PRIME: number;
    var DH_CHECK_P_NOT_PRIME: number;
    var DH_UNABLE_TO_CHECK_GENERATOR: number;
    var DH_NOT_SUITABLE_GENERATOR: number;
    var NPN_ENABLED: number;
    var RSA_PKCS1_PADDING: number;
    var RSA_SSLV23_PADDING: number;
    var RSA_NO_PADDING: number;
    var RSA_PKCS1_OAEP_PADDING: number;
    var RSA_X931_PADDING: number;
    var RSA_PKCS1_PSS_PADDING: number;
    var POINT_CONVERSION_COMPRESSED: number;
    var POINT_CONVERSION_UNCOMPRESSED: number;
    var POINT_CONVERSION_HYBRID: number;
    var O_RDONLY: number;
    var O_WRONLY: number;
    var O_RDWR: number;
    var S_IFMT: number;
    var S_IFREG: number;
    var S_IFDIR: number;
    var S_IFCHR: number;
    var S_IFLNK: number;
    var O_CREAT: number;
    var O_EXCL: number;
    var O_TRUNC: number;
    var O_APPEND: number;
    var F_OK: number;
    var R_OK: number;
    var W_OK: number;
    var X_OK: number;
    var UV_UDP_REUSEADDR: number;
}