"use strict";
let $rt_seed = 2463534242,
$rt_nextId = () => {
    let x = $rt_seed;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    $rt_seed = x;
    return x;
},
$rt_wrapFunction0 = f => function() {
    return f(this);
},
$rt_wrapFunction1 = f => function(p1) {
    return f(this, p1);
},
$rt_wrapFunction2 = f => function(p1, p2) {
    return f(this, p1, p2);
},
$rt_mainStarter = f => (args, callback) => {
    if (!args) {
        args = [];
    }
    let javaArgs = $rt_createArray($rt_objcls(), args.length);
    for (let i = 0;i < args.length;++i) {
        javaArgs.data[i] = $rt_str(args[i]);
    }
    $rt_startThread(() => {
        f.call(null, javaArgs);
    }, callback);
},
$rt_eraseClinit = target => target.$clinit = () => {
},
$dbg_class = obj => {
    let cls = obj.constructor;
    let arrayDegree = 0;
    while (cls[$rt_meta] && cls[$rt_meta].item) {
        ++arrayDegree;
        cls = cls[$rt_meta].item;
    }
    let clsName = "";
    if (cls[$rt_meta].primitiveKind !== 0) {
        clsName = cls[$rt_meta].name;
    } else {
        clsName = cls[$rt_meta] ? cls[$rt_meta].name || "a/" + cls.name : "@" + cls.name;
    }
    while (arrayDegree-- > 0) {
        clsName += "[]";
    }
    return clsName;
},
$rt_classWithoutFields = superclass => {
    if (superclass === 0) {
        return function() {
        };
    }
    if (superclass === void 0) {
        superclass = $rt_objcls();
    }
    return function() {
        superclass.call(this);
    };
},
$rt_meta = Symbol("teavm_meta"),
$rt_cls = cls => {
    if (cls[$rt_meta].classObject === null) {
        cls[$rt_meta].classObject = jl_Class_createClass(cls);
    }
    return cls[$rt_meta].classObject;
},
$rt_objcls = () => jl_Object,
$rt_getThread = () => {
    {
        return jl_Thread_currentThread();
    }
},
$rt_setThread = t => {
    {
        return jl_Thread_setCurrentThread(t);
    }
},
$rt_callWithReceiver = f => function() {
    return f.apply(null, [this].concat(Array.prototype.slice.call(arguments)));
},
$rt_newClassMetadata = source => {
    return Object.assign({ name: null, binaryName: null, parent: null, superinterfaces: [], modifiers: 0, primitiveKind: 0, itemType: null, arrayType: null, enclosingClass: null, declaringClass: null, simpleName: null, clinit: () => {
    }, constructor: null, enumConstants: () => null, resolvedEnumConstants: null, reflection: null, classObject: null, assignableCache: null, valueToObject: o => o, objectToValue: o => o }, source || {  });
},
$rt_createPrimitiveCls = (name, binaryName, kind, config) => {
    let cls = () => {
    };
    let meta = $rt_newClassMetadata({ name: name, binaryName: binaryName, modifiers: 1 | 1 << 4, primitiveKind: kind });
    cls[$rt_meta] = meta;
    if (typeof config === 'function') {
        config(meta);
    }
    return cls;
},
$rt_booleancls = $rt_createPrimitiveCls("boolean", "Z", 1, meta => {
}),
$rt_bytecls = $rt_createPrimitiveCls("byte", "B", 2, meta => {
}),
$rt_shortcls = $rt_createPrimitiveCls("short", "S", 3, meta => {
}),
$rt_charcls = $rt_createPrimitiveCls("char", "C", 4, meta => {
}),
$rt_intcls = $rt_createPrimitiveCls("int", "I", 5, meta => {
}),
$rt_voidcls = $rt_createPrimitiveCls("void", "V", 9, meta => {
    meta.valueToObject = () => null;
}),
$rt_compare = (a, b) => a === b ? 0 : a < b ?  -1 : 1,
$rt_imul = Math.imul || function(a, b) {
    let ah = a >>> 16 & 0xFFFF;
    let al = a & 0xFFFF;
    let bh = b >>> 16 & 0xFFFF;
    let bl = b & 0xFFFF;
    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
},
$rt_udiv = (a, b) => (a >>> 0) / (b >>> 0) >>> 0,
$rt_umod = (a, b) => (a >>> 0) % (b >>> 0) >>> 0,
$rt_ucmp = (a, b) => {
    a >>>= 0;
    b >>>= 0;
    return a < b ?  -1 : a > b ? 1 : 0;
},
Long_ZERO = BigInt(0),
Long_create = (lo, hi) => BigInt.asIntN(64, BigInt.asUintN(64, BigInt(lo)) | BigInt.asUintN(64, BigInt(hi) << BigInt(32))),
Long_fromInt = val => BigInt.asIntN(64, BigInt(val | 0)),
Long_fromNumber = val => BigInt.asIntN(64, BigInt(val >= 0 ? Math.floor(val) : Math.ceil(val))),
Long_lo = val => Number(BigInt.asIntN(32, val)) | 0,
Long_lt = (a, b) => a < b,
Long_le = (a, b) => a <= b,
Long_add = (a, b) => BigInt.asIntN(64, a + b),
Long_sub = (a, b) => BigInt.asIntN(64, a - b),
Long_mul = (a, b) => BigInt.asIntN(64, a * b),
Long_and = (a, b) => BigInt.asIntN(64, a & b),
Long_xor = (a, b) => BigInt.asIntN(64, a ^ b),
Long_shr = (a, b) => BigInt.asIntN(64, a >> BigInt(b & 63)),
$rt_createArray = (cls, sz) => {
    let data = new Array(sz);
    data.fill(null);
    return new ($rt_arraycls(cls))(data);
},
$rt_createUnfilledArray = (cls, sz) => new ($rt_arraycls(cls))(new Array(sz)),
$rt_createCharArray = sz => new $rt_charArrayCls(new Uint16Array(sz)),
$rt_createByteArray = sz => new $rt_byteArrayCls(new Int8Array(sz)),
$rt_createByteArrayFromData = data => {
    let buffer = new Int8Array(data.length);
    buffer.set(data);
    return new $rt_byteArrayCls(buffer);
},
$rt_createShortArray = sz => new $rt_shortArrayCls(new Int16Array(sz)),
$rt_createIntArray = sz => new $rt_intArrayCls(new Int32Array(sz)),
$rt_createIntArrayFromData = data => {
    let buffer = new Int32Array(data.length);
    buffer.set(data);
    return new $rt_intArrayCls(buffer);
},
$rt_createBooleanArray = sz => new $rt_booleanArrayCls(new Int8Array(sz));
let $rt_arraycls = cls => {
    let result = cls[$rt_meta].arrayType;
    if (result === null) {
        function JavaArray(data) {
            ($rt_objcls()).call(this);
            this.data = data;
        }
        JavaArray.prototype = Object.create(($rt_objcls()).prototype);
        JavaArray.prototype.type = cls;
        JavaArray.prototype.constructor = JavaArray;
        JavaArray.prototype.toString = function() {
            let str = "[";
            for (let i = 0;i < this.data.length;++i) {
                if (i > 0) {
                    str += ", ";
                }
                str += this.data[i].toString();
            }
            str += "]";
            return str;
        };
        JavaArray.prototype.$clone = function() {
            let dataCopy;
            if ('slice' in this.data) {
                dataCopy = this.data.slice();
            } else {
                dataCopy = new this.data.constructor(this.data.length);
                for (let i = 0;i < dataCopy.length;++i) {
                    dataCopy[i] = this.data[i];
                }
            }
            return new ($rt_arraycls(this.type))(dataCopy);
        };
        let name = "[" + cls[$rt_meta].binaryName;
        JavaArray[$rt_meta] = $rt_newClassMetadata({ name: name, binaryName: name, parent: $rt_objcls(), itemType: cls });
        result = JavaArray;
        cls[$rt_meta].arrayType = JavaArray;
    }
    return result;
},
$rt_createMultiArray = (cls, dimensions) => {
    let first = 0;
    for (let i = dimensions.length - 1;i >= 0;i = i - 1 | 0) {
        if (dimensions[i] === 0) {
            first = i;
            break;
        }
    }
    if (first > 0) {
        for (let i = 0;i < first;i = i + 1 | 0) {
            cls = $rt_arraycls(cls);
        }
        if (first === dimensions.length - 1) {
            return $rt_createArray(cls, dimensions[first]);
        }
    }
    let arrays = new Array($rt_primitiveArrayCount(dimensions, first));
    let firstDim = dimensions[first] | 0;
    for (let i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createArray(cls, firstDim);
    }
    return $rt_createMultiArrayImpl(cls, arrays, dimensions, first, 0);
},
$rt_createShortMultiArray = dimensions => {
    let arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_shortcls, dimensions);
    }
    let firstDim = dimensions[0] | 0;
    for (let i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createShortArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_shortcls, arrays, dimensions, 0);
},
$rt_primitiveArrayCount = (dimensions, start) => {
    let val = dimensions[start + 1] | 0;
    for (let i = start + 2;i < dimensions.length;i = i + 1 | 0) {
        val = val * (dimensions[i] | 0) | 0;
        if (val === 0) {
            break;
        }
    }
    return val;
},
$rt_createMultiArrayImpl = (cls, arrays, dimensions, start) => {
    let limit = arrays.length;
    for (let i = start + 1 | 0;i < dimensions.length;i = i + 1 | 0) {
        cls = $rt_arraycls(cls);
        let dim = dimensions[i];
        let index = 0;
        let packedIndex = 0;
        while (index < limit) {
            let arr = $rt_createUnfilledArray(cls, dim);
            for (let j = 0;j < dim;j = j + 1 | 0) {
                arr.data[j] = arrays[index];
                index = index + 1 | 0;
            }
            arrays[packedIndex] = arr;
            packedIndex = packedIndex + 1 | 0;
        }
        limit = packedIndex;
    }
    return arrays[0];
};
function $rt_arrayLength(array) {
    return array.data.length;
}
let $rt_stringPool_instance,
$rt_stringPool = strings => {
    $rt_stringClassInit();
    $rt_stringPool_instance = new Array(strings.length);
    for (let i = 0;i < strings.length;++i) {
        $rt_stringPool_instance[i] = $rt_intern($rt_str(strings[i]));
    }
},
$rt_s = index => $rt_stringPool_instance[index],
$rt_charArrayToString = (array, offset, count) => {
    let result = "";
    let limit = offset + count;
    if (count <= 16) {
        for (let i = offset;i < limit;i = i + 1 | 0) {
            result += String.fromCharCode(array[i]);
        }
    } else {
        for (let i = offset;i < limit;i = i + 1024 | 0) {
            let next = Math.min(limit, i + 1024 | 0);
            result += String.fromCharCode.apply(null, array.subarray(i, next));
        }
    }
    return result;
},
$rt_str = str => str === null ? null : jl_String__init_(str),
$rt_ustr = str => str === null ? null : str.$nativeString,
$rt_stringClassInit = () => jl_String_$callClinit(),
$rt_intern;
{
    $rt_intern = str => str;
}
let $rt_isAssignable = (from, to) => {
    if (to === $rt_objcls()) {
        return from[$rt_meta].primitiveKind === 0;
    }
    if (from === to) {
        return true;
    }
    let map = from[$rt_meta].assignableCache;
    if (map === null) {
        map = new Map();
        from[$rt_meta].assignableCache = map;
    }
    let cachedResult = map.get(to);
    if (typeof cachedResult !== 'undefined') {
        return cachedResult;
    }
    if (to[$rt_meta].itemType !== null) {
        let result = from[$rt_meta].itemType !== null && $rt_isAssignable(from[$rt_meta].itemType, to[$rt_meta].itemType);
        map.set(to, result);
        return result;
    }
    let parent = from[$rt_meta].parent;
    if (parent !== null && parent !== from) {
        if ($rt_isAssignable(parent, to)) {
            map.set(to, true);
            return true;
        }
    }
    let superinterfaces = from[$rt_meta].superinterfaces;
    for (let i = 0;i < superinterfaces.length;i = i + 1 | 0) {
        if ($rt_isAssignable(superinterfaces[i], to)) {
            map.set(to, true);
            return true;
        }
    }
    map.set(to, false);
    return false;
},
$rt_throw = ex => {
    throw $rt_exception(ex);
},
$rt_javaExceptionProp = Symbol("javaException"),
$rt_exception = ex => {
    if (!ex.$jsException) {
        $rt_fillNativeException(ex);
    }
    return ex.$jsException;
},
$rt_fillNativeException = ex => {
    let javaCause = $rt_throwableCause(ex);
    let jsCause = javaCause !== null ? javaCause.$jsException : void 0;
    let cause = typeof jsCause === "object" ? { cause: jsCause } : void 0;
    let err = new JavaError("Java exception thrown", cause);
    if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(err);
    }
    err[$rt_javaExceptionProp] = ex;
    ex.$jsException = err;
    $rt_fillStack(err, ex);
},
$rt_fillStack = (err, ex) => {
    if (typeof $rt_decodeStack === "function" && err.stack) {
        let stack = $rt_decodeStack(err.stack);
        let javaStack = $rt_createArray($rt_stecls(), stack.length);
        let elem;
        let noStack = false;
        for (let i = 0;i < stack.length;++i) {
            let element = stack[i];
            elem = $rt_createStackElement($rt_str(element.className), $rt_str(element.methodName), $rt_str(element.fileName), element.lineNumber);
            if (elem == null) {
                noStack = true;
                break;
            }
            javaStack.data[i] = elem;
        }
        if (!noStack) {
            $rt_setStack(ex, javaStack);
        }
    }
},
JavaError;
if (typeof Reflect === 'object') {
    let defaultMessage = Symbol("defaultMessage");
    JavaError = function JavaError(message, cause) {
        let self = Reflect.construct(Error, [void 0, cause], JavaError);
        Object.setPrototypeOf(self, JavaError.prototype);
        self[defaultMessage] = message;
        return self;
    }
    ;
    JavaError.prototype = Object.create(Error.prototype, { constructor: { configurable: true, writable: true, value: JavaError }, message: { get() {
        try {
            let javaException = this[$rt_javaExceptionProp];
            if (typeof javaException === 'object') {
                let javaMessage = $rt_throwableMessage(javaException);
                if (typeof javaMessage === "object") {
                    return javaMessage !== null ? javaMessage.toString() : null;
                }
            }
            return this[defaultMessage];
        } catch (e){
            return "Exception occurred trying to extract Java exception message: " + e;
        }
    } } });
} else {
    JavaError = Error;
}
let $rt_javaException = e => e instanceof Error && typeof e[$rt_javaExceptionProp] === 'object' ? e[$rt_javaExceptionProp] : null,
$rt_wrapException = err => {
    let ex = err[$rt_javaExceptionProp];
    if (!ex) {
        ex = $rt_createException($rt_str("(JavaScript) " + err.toString()));
        err[$rt_javaExceptionProp] = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return ex;
},
$rt_createException = message => jl_RuntimeException__init_1(message),
$rt_throwableMessage = t => jl_Throwable_getMessage(t),
$rt_throwableCause = t => jl_Throwable_getCause(t),
$rt_stecls = () => $rt_objcls(),
$rt_createStackElement = (className, methodName, fileName, lineNumber) => {
    {
        return null;
    }
},
$rt_setStack = (e, stack) => {
},
$rt_createOutputFunction = outputFunction => {
    let buffer = "";
    return msg => {
        let index = 0;
        while (true) {
            let next = msg.indexOf('\n', index);
            if (next < 0) {
                break;
            }
            outputFunction(buffer + msg.substring(index, next));
            buffer = "";
            index = next + 1;
        }
        buffer += msg.substring(index);
    };
},
$rt_putStderr = typeof $rt_putStderrCustom === "function" ? $rt_putStderrCustom : typeof console === "object" ? $rt_createOutputFunction(msg => console.error(msg)) : () => {
},
$rt_packageData = null,
$rt_packages = data => {
    let i = 0;
    let packages = new Array(data.length);
    for (let j = 0;j < data.length;++j) {
        let prefixIndex = data[i++];
        let prefix = prefixIndex >= 0 ? packages[prefixIndex] : "";
        packages[j] = prefix + data[i++] + ".";
    }
    $rt_packageData = packages;
},
$rt_allClasses = [],
$rt_metadata = data => {
    let packages = $rt_packageData;
    let i = 0;
    while (i < data.length) {
        let cls = data[i++];
        $rt_allClasses.push(cls);
        let m = $rt_newClassMetadata();
        cls[$rt_meta] = m;
        let className = data[i++];
        m.name = className !== 0 ? className : null;
        if (m.name !== null) {
            let packageIndex = data[i++];
            if (packageIndex >= 0) {
                m.name = packages[packageIndex] + m.name;
            }
        }
        m.binaryName = "L" + m.name + ";";
        let superclass = data[i++];
        m.parent = superclass !== 0 ? superclass : null;
        m.superinterfaces = data[i++];
        if (m.parent) {
            cls.prototype = Object.create(m.parent.prototype);
        } else {
            cls.prototype = {  };
        }
        cls.prototype.constructor = cls;
        m.modifiers = data[i++];
        m.primitiveKind = 0;
        if ((m.modifiers & 1 << 9) !== 0) {
            m.parent = null;
        }
        let innerClassInfo = data[i++];
        if (innerClassInfo !== 0) {
            let enclosingClass = innerClassInfo[0];
            m.enclosingClass = enclosingClass !== 0 ? enclosingClass : null;
            let declaringClass = innerClassInfo[1];
            m.declaringClass = declaringClass !== 0 ? declaringClass : null;
            let simpleName = innerClassInfo[2];
            m.simpleName = simpleName !== 0 ? simpleName : null;
        }
        let clinit = data[i++];
        m.clinit = clinit !== 0 ? () => {
            m.clinit = () => {
            };
            clinit();
        } : () => {
        };
        let virtualMethods = data[i++];
        if (virtualMethods !== 0) {
            for (let j = 0;j < virtualMethods.length;j += 2) {
                let name = virtualMethods[j];
                let func = virtualMethods[j + 1];
                if (typeof name === 'string') {
                    name = [name];
                }
                for (let k = 0;k < name.length;++k) {
                    cls.prototype[name[k]] = func;
                }
            }
        }
    }
};
function TeaVMThread(runner) {
    this.status = 3;
    this.stack = [];
    this.suspendCallback = null;
    this.runner = runner;
    this.attribute = null;
    this.completeCallback = null;
}
TeaVMThread.prototype.push = function() {
    for (let i = 0;i < arguments.length;++i) {
        this.stack.push(arguments[i]);
    }
    return this;
};
TeaVMThread.prototype.s = TeaVMThread.prototype.push;
TeaVMThread.prototype.pop = function() {
    return this.stack.pop();
};
TeaVMThread.prototype.l = TeaVMThread.prototype.pop;
TeaVMThread.prototype.isResuming = function() {
    return this.status === 2;
};
TeaVMThread.prototype.isSuspending = function() {
    return this.status === 1;
};
TeaVMThread.prototype.suspend = function(callback) {
    this.suspendCallback = callback;
    this.status = 1;
};
TeaVMThread.prototype.start = function(callback) {
    if (this.status !== 3) {
        throw new Error("Thread already started");
    }
    if ($rt_currentNativeThread !== null) {
        throw new Error("Another thread is running");
    }
    this.status = 0;
    this.completeCallback = callback ? callback : result => {
        if (result instanceof Error) {
            throw result;
        }
    };
    this.run();
};
TeaVMThread.prototype.resume = function() {
    if ($rt_currentNativeThread !== null) {
        throw new Error("Another thread is running");
    }
    this.status = 2;
    this.run();
};
TeaVMThread.prototype.run = function() {
    $rt_currentNativeThread = this;
    let result;
    try {
        result = this.runner();
    } catch (e){
        result = e;
    } finally {
        $rt_currentNativeThread = null;
    }
    if (this.suspendCallback !== null) {
        let self = this;
        let callback = this.suspendCallback;
        this.suspendCallback = null;
        callback(() => self.resume());
    } else if (this.status === 0) {
        this.completeCallback(result);
    }
};
let $rt_suspending = () => {
    let thread = $rt_nativeThread();
    return thread != null && thread.isSuspending();
},
$rt_resuming = () => {
    let thread = $rt_nativeThread();
    return thread != null && thread.isResuming();
},
$rt_requireNativeThread = () => {
    let nativeThread = $rt_nativeThread();
    if (nativeThread === null) {
        throw new Error("Suspension point reached from non-threading context " + "(perhaps, from native JS method). See https://teavm.org/docs/runtime/coroutines.html " + "('Interaction with JavaScript' section)");
    }
    return nativeThread;
},
$rt_startThread = (runner, callback) => (new TeaVMThread(runner)).start(callback),
$rt_currentNativeThread = null,
$rt_nativeThread = () => $rt_currentNativeThread,
$rt_invalidPointer = () => {
    throw new Error("Invalid recorded state");
};
function jl_Object() {
    this.$monitor = null;
    this.$id$ = 0;
}
let jl_Object_monitorEnterSync = $o => {
    let var$2, var$3;
    if (jl_Thread_currentThread() !== null) {
        if ($o.$monitor === null)
            jl_Object_createMonitor($o);
        var$2 = $o.$monitor;
        var$3 = var$2.$owner;
        if (var$3 === null)
            var$2.$owner = jl_Thread_currentThread();
        else if (var$3 !== jl_Thread_currentThread()) {
            var$2 = new jl_IllegalStateException;
            jl_Exception__init_(var$2, $rt_s(0));
            $rt_throw(var$2);
        }
        $o = $o.$monitor;
        $o.$count = $o.$count + 1 | 0;
        return;
    }
},
jl_Object_monitorExitSync = $o => {
    let var$2, var$3;
    if (jl_Thread_currentThread() !== null) {
        if (!jl_Object_isEmptyMonitor($o) && $o.$monitor.$owner === jl_Thread_currentThread()) {
            var$2 = $o.$monitor;
            var$3 = var$2.$count - 1 | 0;
            var$2.$count = var$3;
            if (!var$3)
                var$2.$owner = null;
            jl_Object_isEmptyMonitor($o);
            return;
        }
        $o = new jl_IllegalMonitorStateException;
        jl_Exception__init_0($o);
        $rt_throw($o);
    }
},
jl_Object_monitorEnter = $o => {
    let var$2, var$3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        let $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();$o = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$2 = 1;
        if ($o.$monitor === null)
            jl_Object_createMonitor($o);
        var$3 = $o.$monitor;
        if (var$3.$owner === null)
            var$3.$owner = jl_Thread_currentThread();
        if ($o.$monitor.$owner !== jl_Thread_currentThread()) {
            $ptr = 1;
            continue main;
        }
        $o = $o.$monitor;
        $o.$count = $o.$count + var$2 | 0;
        return;
    case 1:
        jl_Object_monitorEnterWait$_asyncCall_$($o, var$2);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($o, var$2, var$3, $ptr);
},
jl_Object_createMonitor = $o => {
    let var$2;
    var$2 = new jl_Object$Monitor;
    var$2.$owner = jl_Thread_currentThread();
    $o.$monitor = var$2;
},
jl_Object_monitorEnterWait = ($o, $count, $callback) => {
    let $thread_0, $monitor, var$6, var$7, var$8, var$9, var$10, var$11, var$12;
    $thread_0 = jl_Thread_currentThread();
    $monitor = $o.$monitor;
    if ($monitor !== null) {
        if ($monitor.$owner !== null) {
            if ($monitor.$enteringThreads === null) {
                var$6 = new ju_ArrayDeque;
                var$6.$array = $rt_createArray(jl_Object, 9);
                $monitor.$enteringThreads = var$6;
            }
            $monitor = $monitor.$enteringThreads;
            var$6 = new jl_Object$monitorEnterWait$lambda$_6_0;
            var$6.$_00 = $thread_0;
            var$6.$_1 = $o;
            var$6.$_2 = $count;
            var$6.$_3 = $callback;
            $o = $monitor;
            $count = $o.$tail;
            var$7 = $o.$head;
            $count = ($count >= var$7 ? $count - var$7 | 0 : ($o.$array.data.length - var$7 | 0) + $count | 0) + 1 | 0;
            var$7 = $o.$array.data.length;
            if ($count >= var$7) {
                $count = jl_Math_max(var$7 * 2 | 0, (($count * 3 | 0) / 2 | 0) + 1 | 0);
                if ($count < 1)
                    $count = 2147483647;
                var$8 = $rt_createArray(jl_Object, $count);
                $count = 0;
                var$7 = $o.$head;
                var$9 = $o.$tail;
                if (var$7 <= var$9) {
                    var$10 = var$8.data;
                    while (var$7 < var$9) {
                        var$11 = $count + 1 | 0;
                        var$10[$count] = $o.$array.data[var$7];
                        var$7 = var$7 + 1 | 0;
                        $count = var$11;
                    }
                } else {
                    var$10 = var$8.data;
                    while (true) {
                        var$12 = $o.$array.data;
                        if (var$7 >= var$12.length)
                            break;
                        var$11 = $count + 1 | 0;
                        var$10[$count] = var$12[var$7];
                        var$7 = var$7 + 1 | 0;
                        $count = var$11;
                    }
                    var$7 = 0;
                    while (var$7 < var$9) {
                        var$11 = $count + 1 | 0;
                        var$10[$count] = var$12[var$7];
                        var$7 = var$7 + 1 | 0;
                        $count = var$11;
                    }
                }
                $o.$head = 0;
                $o.$tail = $count;
                $o.$array = var$8;
            }
            var$8 = $o.$array.data;
            $count = $o.$tail;
            var$8[$count] = var$6;
            $o.$tail = ju_ArrayDeque_modInc($count, var$8.length);
            $o.$version = $o.$version + 1 | 0;
            return;
        }
        $monitor.$owner = $thread_0;
        jl_Thread_setCurrentThread($thread_0);
        $o = $o.$monitor;
        $o.$count = $o.$count + $count | 0;
        $o = null;
        otpp_AsyncCallbackWrapper_complete($callback, $o);
        return;
    }
    jl_Object_createMonitor($o);
    jl_Thread_setCurrentThread($thread_0);
    $o = $o.$monitor;
    $o.$count = $o.$count + $count | 0;
    $o = null;
    otpp_AsyncCallbackWrapper_complete($callback, $o);
},
jl_Object_monitorExit = $o => {
    let var$2, var$3;
    if (!jl_Object_isEmptyMonitor($o) && $o.$monitor.$owner === jl_Thread_currentThread()) {
        var$2 = $o.$monitor;
        var$3 = var$2.$count - 1 | 0;
        var$2.$count = var$3;
        if (var$3 <= 0) {
            var$2.$owner = null;
            var$2 = var$2.$enteringThreads;
            if (!(var$2 !== null && !ju_ArrayDeque_isEmpty(var$2)))
                jl_Object_isEmptyMonitor($o);
            else {
                var$2 = new jl_Object$monitorExit$lambda$_8_1;
                var$2.$_0 = $o;
                otp_Platform_schedule(var$2, 0);
            }
        }
        return;
    }
    $o = new jl_IllegalMonitorStateException;
    jl_Exception__init_0($o);
    $rt_throw($o);
},
jl_Object_isEmptyMonitor = $this => {
    let $monitor, var$2;
    $monitor = $this.$monitor;
    if ($monitor !== null) {
        a: {
            if ($monitor.$owner === null) {
                var$2 = $monitor.$enteringThreads;
                if (!(var$2 !== null && !ju_ArrayDeque_isEmpty(var$2))) {
                    $monitor = $monitor.$notifyListeners;
                    if ($monitor === null)
                        break a;
                    if ($monitor.$isEmpty())
                        break a;
                }
            }
            return 0;
        }
        $this.$monitor = null;
        return 1;
    }
    return 1;
},
jl_Object__init_ = $this => {
    return;
},
jl_Object__init_0 = () => {
    let var_0 = new jl_Object();
    jl_Object__init_(var_0);
    return var_0;
},
jl_Object_getClass = $this => {
    return $rt_cls(jl_Object_getObjectClassInfo($this));
},
jl_Object_getObjectClassInfo = var$1 => {
    return var$1.constructor;
},
jl_Object_equals = ($this, var$1) => {
    return $this !== var$1 ? 0 : 1;
},
jl_Object_toString = $this => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10;
    var$1 = jl_Class_getName(jl_Object_getClass($this));
    var$2 = $this;
    if (!var$2.$id$)
        var$2.$id$ = $rt_nextId();
    var$3 = $this.$id$;
    jl_Integer_$callClinit();
    if (!var$3)
        var$4 = $rt_s(1);
    else {
        if (!var$3)
            var$5 = 32;
        else {
            var$6 = 0;
            var$5 = var$3 >>> 16 | 0;
            if (var$5)
                var$6 = 16;
            else
                var$5 = var$3;
            var$7 = var$5 >>> 8 | 0;
            if (!var$7)
                var$7 = var$5;
            else
                var$6 = var$6 | 8;
            var$5 = var$7 >>> 4 | 0;
            if (!var$5)
                var$5 = var$7;
            else
                var$6 = var$6 | 4;
            var$7 = var$5 >>> 2 | 0;
            if (!var$7)
                var$7 = var$5;
            else
                var$6 = var$6 | 2;
            if (var$7 >>> 1 | 0)
                var$6 = var$6 | 1;
            var$5 = (32 - var$6 | 0) - 1 | 0;
        }
        var$5 = (((32 - var$5 | 0) + 4 | 0) - 1 | 0) / 4 | 0;
        var$8 = $rt_createCharArray(var$5);
        var$9 = var$8.data;
        var$6 = (var$5 - 1 | 0) * 4 | 0;
        var$7 = 0;
        while (var$6 >= 0) {
            var$10 = var$7 + 1 | 0;
            var$9[var$7] = jl_Character_forDigit((var$3 >>> var$6 | 0) & 15, 16);
            var$6 = var$6 - 4 | 0;
            var$7 = var$10;
        }
        var$4 = jl_String__init_1(var$8);
    }
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$2, var$1), 64), var$4);
    return jl_AbstractStringBuilder_toString(var$2);
},
jl_Object_monitorEnterWait$_asyncCall_$ = (var$1, var$2) => {
    let thread = $rt_requireNativeThread();
    let javaThread = $rt_getThread();
    if (thread.isResuming()) {
        thread.status = 0;
        let result = thread.attribute;
        if (result instanceof Error) {
            throw result;
        }
        return result;
    }
    let callback = function() {
    };
    callback.$complete = val => {
        thread.attribute = val;
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback.$error = e => {
        thread.attribute = $rt_exception(e);
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback = otpp_AsyncCallbackWrapper_create(callback);
    thread.suspend(() => {
        try {
            jl_Object_monitorEnterWait(var$1, var$2, callback);
            ;
        } catch ($e){
            callback.$error($e);
        }
    });
    return null;
},
ji_Serializable = $rt_classWithoutFields(0),
jl_Comparable = $rt_classWithoutFields(0),
jl_CharSequence = $rt_classWithoutFields(0);
function jl_String() {
    jl_Object.call(this);
    this.$hashCode0 = 0;
}
let jl_String_EMPTY_CHARS = null,
jl_String_EMPTY = null,
jl_String_CASE_INSENSITIVE_ORDER = null,
jl_String_$callClinit = () => {
    jl_String_$callClinit = $rt_eraseClinit(jl_String);
    jl_String__clinit_();
},
jl_String__init_2 = ($this, var$1) => {
    jl_String_$callClinit();
    $this.$nativeString = $rt_charArrayToString(var$1.data, 0, var$1.data.length);
},
jl_String__init_1 = var_0 => {
    let var_1 = new jl_String();
    jl_String__init_2(var_1, var_0);
    return var_1;
},
jl_String__init_3 = (var$0, var$1) => {
    var$0.$nativeString = var$1;
},
jl_String__init_ = var_0 => {
    let var_1 = new jl_String();
    jl_String__init_3(var_1, var_0);
    return var_1;
},
jl_String__init_4 = (var$0, var$1, $offset, $count) => {
    let var$4, var$5;
    jl_String_$callClinit();
    var$4 = var$1.data.length;
    if ($offset >= 0 && $count >= 0 && $count <= (var$4 - $offset | 0)) {
        var$0.$nativeString = $rt_charArrayToString(var$1.data, $offset, $count);
        return;
    }
    var$5 = new jl_IndexOutOfBoundsException;
    jl_Exception__init_0(var$5);
    $rt_throw(var$5);
},
jl_String__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jl_String();
    jl_String__init_4(var_3, var_0, var_1, var_2);
    return var_3;
},
jl_String_charAt = ($this, $index) => {
    let var$2;
    if ($index >= 0 && $index < $this.$nativeString.length)
        return $this.$nativeString.charCodeAt($index);
    var$2 = new jl_StringIndexOutOfBoundsException;
    jl_Exception__init_0(var$2);
    $rt_throw(var$2);
},
jl_String_length = $this => {
    return $this.$nativeString.length;
},
jl_String_startsWith = ($this, $prefix) => {
    let var$2, var$3, var$4, var$5;
    if ($this !== $prefix) {
        a: {
            var$2 = 0;
            if ((var$2 + $prefix.$nativeString.length | 0) > $this.$nativeString.length)
                var$2 = 0;
            else {
                var$3 = 0;
                b: {
                    while (var$3 < $prefix.$nativeString.length) {
                        var$4 = $prefix.$nativeString.charCodeAt(var$3);
                        var$5 = var$2 + 1 | 0;
                        if (var$4 != $this.$nativeString.charCodeAt(var$2))
                            break b;
                        var$3 = var$3 + 1 | 0;
                        var$2 = var$5;
                    }
                    var$2 = 1;
                    break a;
                }
                var$2 = 0;
            }
        }
        return var$2;
    }
    return 1;
},
jl_String_substring = ($this, $beginIndex, $endIndex) => {
    let $length, var$4, var$5;
    $length = $this.$nativeString.length;
    var$4 = $rt_compare($beginIndex, $endIndex);
    if (var$4) {
        if (!$beginIndex && $endIndex == $length)
            return $this;
        if ($beginIndex >= 0 && var$4 <= 0 && $endIndex <= $length)
            return jl_String__init_($this.$nativeString.substring($beginIndex, $endIndex));
        var$5 = new jl_StringIndexOutOfBoundsException;
        jl_Exception__init_0(var$5);
        $rt_throw(var$5);
    }
    return jl_String_EMPTY;
},
jl_String_substring0 = ($this, $beginIndex) => {
    return jl_String_substring($this, $beginIndex, $this.$nativeString.length);
},
jl_String_valueOf = $obj => {
    jl_String_$callClinit();
    return $obj === null ? $rt_s(2) : $obj;
},
jl_String_equals = ($this, $other) => {
    let $str;
    if ($this !== $other) {
        if ($other instanceof jl_String) {
            $str = $other;
            return $this.$nativeString !== $str.$nativeString ? 0 : 1;
        }
        return 0;
    }
    return 1;
},
jl_String_hashCode = $this => {
    let $i;
    a: {
        if (!$this.$hashCode0) {
            $i = 0;
            while (true) {
                if ($i >= $this.$nativeString.length)
                    break a;
                $this.$hashCode0 = (31 * $this.$hashCode0 | 0) + $this.$nativeString.charCodeAt($i) | 0;
                $i = $i + 1 | 0;
            }
        }
    }
    return $this.$hashCode0;
},
jl_String_toLowerCase = $this => {
    let $lowerCase;
    $lowerCase = $this.$nativeString.toLowerCase();
    if ($lowerCase !== $this.$nativeString)
        $this = jl_String__init_($lowerCase);
    return $this;
},
jl_String__clinit_ = () => {
    let var$1;
    jl_String_EMPTY_CHARS = $rt_createCharArray(0);
    var$1 = new jl_String;
    jl_String_$callClinit();
    var$1.$nativeString = "";
    jl_String_EMPTY = var$1;
    jl_String_CASE_INSENSITIVE_ORDER = new jl_String$_clinit_$lambda$_118_0;
},
jlr_AnnotatedElement = $rt_classWithoutFields(0),
jlr_GenericDeclaration = $rt_classWithoutFields(0),
jlr_Type = $rt_classWithoutFields(0);
function jl_Class() {
    let a = this; jl_Object.call(a);
    a.$flags = 0;
    a.$classInfo = null;
    a.$name0 = null;
}
let jl_Class_createClass = $classInfo => {
    let var$2;
    var$2 = new jl_Class;
    var$2.$classInfo = $classInfo;
    return var$2;
},
jl_Class_getName = $this => {
    let var$1, $metadataName, $result, $itemType, $itemName;
    var$1 = $this.$flags;
    if (!(var$1 & 1)) {
        $this.$flags = var$1 | 1;
        $metadataName = $this.$classInfo[$rt_meta].name;
        $result = $metadataName === null ? null : $rt_str($metadataName);
        if ($result === null) {
            $itemType = $this.$classInfo[$rt_meta].itemType;
            if ($itemType !== null) {
                $itemName = jl_Class_getName($rt_cls($itemType));
                if ($itemName !== null) {
                    if ($itemType[$rt_meta].itemType !== null) {
                        $metadataName = new jl_StringBuilder;
                        jl_AbstractStringBuilder__init_($metadataName);
                        jl_StringBuilder_append(jl_StringBuilder_append0($metadataName, 91), $itemName);
                        $result = jl_AbstractStringBuilder_toString($metadataName);
                    } else {
                        $metadataName = new jl_StringBuilder;
                        jl_AbstractStringBuilder__init_($metadataName);
                        jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append($metadataName, $rt_s(3)), $itemName), 59);
                        $result = jl_AbstractStringBuilder_toString($metadataName);
                    }
                }
            }
        }
        $this.$name0 = $result;
    }
    return $this.$name0;
},
jl_Class_isPrimitive = $this => {
    return !$this.$classInfo[$rt_meta].primitiveKind ? 0 : 1;
},
jl_Class_getComponentType = $this => {
    let $itemTypeInfo;
    $itemTypeInfo = $this.$classInfo[$rt_meta].itemType;
    return $itemTypeInfo === null ? null : $rt_cls($itemTypeInfo);
},
jl_Number = $rt_classWithoutFields(),
jl_Number_shortValue = $this => {
    return $this.$value1 << 16 >> 16;
};
function jl_Integer() {
    jl_Number.call(this);
    this.$value1 = 0;
}
let jl_Integer_TYPE = null,
jl_Integer_$callClinit = () => {
    jl_Integer_$callClinit = $rt_eraseClinit(jl_Integer);
    jl_Integer__clinit_();
},
jl_Integer__init_0 = ($this, $value) => {
    jl_Integer_$callClinit();
    $this.$value1 = $value;
},
jl_Integer__init_ = var_0 => {
    let var_1 = new jl_Integer();
    jl_Integer__init_0(var_1, var_0);
    return var_1;
},
jl_Integer_parseIntImpl = ($s, $beginIndex, $endIndex, $radix) => {
    let $negative, var$6, $value, $maxValue, var$9, $digit, var$11, var$12, var$13;
    jl_Integer_$callClinit();
    if ($beginIndex != $endIndex) {
        if ($radix >= 2 && $radix <= 36) {
            a: {
                b: {
                    c: {
                        $negative = 0;
                        $s = $s;
                        switch (jl_String_charAt($s, $beginIndex)) {
                            case 43:
                                break c;
                            case 45:
                                break b;
                            default:
                        }
                        var$6 = $beginIndex;
                        break a;
                    }
                    var$6 = $beginIndex + 1 | 0;
                    break a;
                }
                $negative = 1;
                var$6 = $beginIndex + 1 | 0;
            }
            $value = 0;
            $maxValue = 1 + (2147483647 / $radix | 0) | 0;
            if (var$6 != $endIndex) {
                while (var$6 < $endIndex) {
                    var$9 = var$6 + 1 | 0;
                    $digit = jl_String_charAt($s, var$6);
                    $digit = $digit >= 48 && $digit <= 57 ? $digit - 48 | 0 : $digit >= 97 && $digit <= 122 ? ($digit - 97 | 0) + 10 | 0 : !($digit >= 65 && $digit <= 90) ? (-1) : ($digit - 65 | 0) + 10 | 0;
                    if ($digit < 0) {
                        var$11 = new jl_NumberFormatException;
                        $s = jl_String_valueOf(jl_String_substring($s, $beginIndex, $endIndex));
                        var$12 = new jl_StringBuilder;
                        jl_AbstractStringBuilder__init_(var$12);
                        jl_StringBuilder_append(jl_StringBuilder_append(var$12, $rt_s(4)), $s);
                        jl_Exception__init_(var$11, jl_AbstractStringBuilder_toString(var$12));
                        $rt_throw(var$11);
                    }
                    if ($digit >= $radix) {
                        var$11 = new jl_NumberFormatException;
                        $s = jl_String_valueOf(jl_String_substring($s, $beginIndex, $endIndex));
                        var$12 = new jl_StringBuilder;
                        jl_AbstractStringBuilder__init_(var$12);
                        var$13 = jl_StringBuilder_append(var$12, $rt_s(5));
                        jl_AbstractStringBuilder_append(var$13, $radix);
                        jl_StringBuilder_append(jl_StringBuilder_append(var$13, $rt_s(6)), $s);
                        jl_Exception__init_(var$11, jl_AbstractStringBuilder_toString(var$12));
                        $rt_throw(var$11);
                    }
                    if ($value > $maxValue) {
                        $s = new jl_NumberFormatException;
                        jl_Exception__init_($s, $rt_s(7));
                        $rt_throw($s);
                    }
                    $value = $rt_imul($radix, $value) + $digit | 0;
                    if ($value < 0) {
                        if (var$9 == $endIndex && $value == (-2147483648) && $negative)
                            return (-2147483648);
                        var$11 = new jl_NumberFormatException;
                        $s = jl_String_valueOf(jl_String_substring($s, $beginIndex, $endIndex));
                        var$12 = new jl_StringBuilder;
                        jl_AbstractStringBuilder__init_(var$12);
                        jl_StringBuilder_append(jl_StringBuilder_append(var$12, $rt_s(8)), $s);
                        jl_Exception__init_(var$11, jl_AbstractStringBuilder_toString(var$12));
                        $rt_throw(var$11);
                    }
                    var$6 = var$9;
                }
                if ($negative)
                    $value =  -$value | 0;
                return $value;
            }
            $s = new jl_NumberFormatException;
            jl_Exception__init_0($s);
            $rt_throw($s);
        }
        $s = new jl_NumberFormatException;
        var$11 = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_(var$11);
        jl_AbstractStringBuilder_append(jl_StringBuilder_append(var$11, $rt_s(9)), $radix);
        jl_Exception__init_($s, jl_AbstractStringBuilder_toString(var$11));
        $rt_throw($s);
    }
    $s = new jl_NumberFormatException;
    jl_Exception__init_($s, $rt_s(10));
    $rt_throw($s);
},
jl_Integer_parseInt = $s => {
    jl_Integer_$callClinit();
    if ($s === null) {
        $s = new jl_NumberFormatException;
        jl_Exception__init_($s, $rt_s(11));
        $rt_throw($s);
    }
    return jl_Integer_parseIntImpl($s, 0, $s.$nativeString.length, 10);
},
jl_Integer__clinit_ = () => {
    jl_Integer_TYPE = $rt_cls($rt_intcls);
};
function jl_AbstractStringBuilder() {
    let a = this; jl_Object.call(a);
    a.$buffer = null;
    a.$length0 = 0;
}
let jl_AbstractStringBuilder__init_ = $this => {
    jl_AbstractStringBuilder__init_0($this, 16);
},
jl_AbstractStringBuilder__init_2 = () => {
    let var_0 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_(var_0);
    return var_0;
},
jl_AbstractStringBuilder__init_0 = ($this, $capacity) => {
    $this.$buffer = $rt_createCharArray($capacity);
},
jl_AbstractStringBuilder__init_1 = var_0 => {
    let var_1 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_0(var_1, var_0);
    return var_1;
},
jl_AbstractStringBuilder_insert = ($this, $index, $string) => {
    let $i, $i_0, var$5, var$6;
    if ($index >= 0 && $index <= $this.$length0) {
        if ($string === null)
            $string = $rt_s(2);
        else if ($string.$nativeString.length ? 0 : 1)
            return $this;
        $this.$ensureCapacity($this.$length0 + $string.$nativeString.length | 0);
        $i = $this.$length0 - 1 | 0;
        while ($i >= $index) {
            $this.$buffer.data[$i + $string.$nativeString.length | 0] = $this.$buffer.data[$i];
            $i = $i + (-1) | 0;
        }
        $this.$length0 = $this.$length0 + $string.$nativeString.length | 0;
        $i_0 = 0;
        while ($i_0 < $string.$nativeString.length) {
            var$5 = $this.$buffer.data;
            var$6 = $index + 1 | 0;
            var$5[$index] = jl_String_charAt($string, $i_0);
            $i_0 = $i_0 + 1 | 0;
            $index = var$6;
        }
        return $this;
    }
    $string = new jl_StringIndexOutOfBoundsException;
    jl_Exception__init_0($string);
    $rt_throw($string);
},
jl_AbstractStringBuilder_append = ($this, $value) => {
    return jl_AbstractStringBuilder_append0($this, $value, 10);
},
jl_AbstractStringBuilder_append0 = ($this, $value, $radix) => {
    return jl_AbstractStringBuilder_insert0($this, $this.$length0, $value, $radix);
},
jl_AbstractStringBuilder_insert0 = ($this, $target, $value, $radix) => {
    let $positive, var$5, var$6, $pos, $sz, $posLimit, var$10;
    $positive = 1;
    if ($value < 0) {
        $positive = 0;
        $value =  -$value | 0;
    }
    a: {
        if ($rt_ucmp($value, $radix) < 0) {
            if ($positive)
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 1 | 0);
            else {
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 2 | 0);
                var$5 = $this.$buffer.data;
                var$6 = $target + 1 | 0;
                var$5[$target] = 45;
                $target = var$6;
            }
            $this.$buffer.data[$target] = jl_Character_forDigit($value, $radix);
        } else {
            $pos = 1;
            $sz = 1;
            $posLimit = $rt_udiv((-1), $radix);
            b: {
                c: {
                    while (true) {
                        var$10 = $rt_imul($pos, $radix);
                        if ($rt_ucmp(var$10, $value) > 0)
                            break c;
                        $sz = $sz + 1 | 0;
                        if ($rt_ucmp(var$10, $posLimit) > 0)
                            break;
                        $pos = var$10;
                    }
                    break b;
                }
                var$10 = $pos;
            }
            if (!$positive)
                $sz = $sz + 1 | 0;
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + $sz | 0);
            if ($positive)
                $positive = $target;
            else {
                var$5 = $this.$buffer.data;
                $positive = $target + 1 | 0;
                var$5[$target] = 45;
            }
            while (true) {
                if (!var$10)
                    break a;
                var$5 = $this.$buffer.data;
                $target = $positive + 1 | 0;
                var$5[$positive] = jl_Character_forDigit($rt_udiv($value, var$10), $radix);
                $value = $rt_umod($value, var$10);
                var$10 = $rt_udiv(var$10, $radix);
                $positive = $target;
            }
        }
    }
    return $this;
},
jl_AbstractStringBuilder_ensureCapacity = ($this, $capacity) => {
    let var$2, $newLength, var$4, var$5, var$6;
    var$2 = $this.$buffer.data.length;
    if (var$2 < $capacity) {
        $newLength = var$2 >= 1073741823 ? 2147483647 : jl_Math_max($capacity, jl_Math_max(var$2 * 2 | 0, 5));
        var$4 = $this.$buffer.data;
        var$5 = $rt_createCharArray($newLength);
        var$6 = var$5.data;
        $capacity = jl_Math_min($newLength, var$4.length);
        var$2 = 0;
        while (var$2 < $capacity) {
            var$6[var$2] = var$4[var$2];
            var$2 = var$2 + 1 | 0;
        }
        $this.$buffer = var$5;
        return;
    }
},
jl_AbstractStringBuilder_toString = $this => {
    return jl_String__init_0($this.$buffer, 0, $this.$length0);
},
jl_AbstractStringBuilder_insertSpace = ($this, $start, $end) => {
    let var$3, $sz, $i, var$6;
    var$3 = $this.$length0;
    $sz = var$3 - $start | 0;
    $this.$ensureCapacity((var$3 + $end | 0) - $start | 0);
    $i = $sz - 1 | 0;
    while ($i >= 0) {
        var$6 = $this.$buffer.data;
        var$6[$end + $i | 0] = var$6[$start + $i | 0];
        $i = $i + (-1) | 0;
    }
    $this.$length0 = $this.$length0 + ($end - $start | 0) | 0;
},
jl_Appendable = $rt_classWithoutFields(0),
jl_StringBuilder = $rt_classWithoutFields(jl_AbstractStringBuilder),
jl_StringBuilder_append = ($this, $obj) => {
    let var$2, var$3;
    var$2 = $this.$length0;
    var$3 = $this;
    $obj = $obj === null ? $rt_s(2) : $obj;
    jl_AbstractStringBuilder_insert(var$3, var$2, $obj);
    return $this;
},
jl_StringBuilder_append0 = ($this, $c) => {
    let var$2, var$3;
    var$2 = $this.$length0;
    var$3 = $this;
    jl_AbstractStringBuilder_insertSpace(var$3, var$2, var$2 + 1 | 0);
    var$3.$buffer.data[var$2] = $c;
    return $this;
},
jl_StringBuilder_toString = $this => {
    return jl_AbstractStringBuilder_toString($this);
},
jl_StringBuilder_ensureCapacity = ($this, var$1) => {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
};
function jl_Throwable() {
    let a = this; jl_Object.call(a);
    a.$message = null;
    a.$cause = null;
    a.$suppressionEnabled = 0;
    a.$writableStackTrace = 0;
    a.$suppressed = null;
    a.$stackTrace = null;
}
let jl_Throwable_fillInStackTrace = $this => {
    return $this;
},
jl_Throwable_initNativeException = $this => {
    $rt_fillNativeException($this);
},
jl_Throwable_getMessage = $this => {
    return $this.$message;
},
jl_Throwable_getLocalizedMessage = $this => {
    return $this.$message;
},
jl_Throwable_getCause = $this => {
    let var$1;
    var$1 = $this.$cause;
    if (var$1 === $this)
        var$1 = null;
    return var$1;
},
jl_Throwable_printStackTrace = $this => {
    let var$1, var$2, var$3;
    if (jl_System_errCache === null) {
        var$1 = new otcic_JSStderrPrintStream;
        var$2 = null;
        var$3 = null;
        ji_FilterOutputStream__init_(var$1, var$2);
        var$2 = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_(var$2);
        var$1.$sb = var$2;
        var$1.$buffer0 = $rt_createCharArray(32);
        var$1.$autoFlush = 0;
        var$1.$charset = var$3;
        jl_System_errCache = var$1;
    }
    jl_Throwable_printStackTrace0($this, jl_System_errCache);
},
jl_Throwable_printStackTrace0 = ($this, $stream) => {
    let var$2, var$3, $element, var$5, var$6, var$7, var$8;
    var$2 = jl_Class_getName(jl_Object_getClass($this));
    var$3 = $stream;
    otcic_JSStderrPrintStream_print(var$3, var$2);
    $element = $this.$message;
    if ($element !== null) {
        var$2 = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_(var$2);
        jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(6)), $element);
        otcic_JSStderrPrintStream_print(var$3, jl_AbstractStringBuilder_toString(var$2));
    }
    a: {
        var$5 = $stream;
        otcic_JSStderrPrintStream_print(var$5, $rt_s(12));
        var$6 = $this.$stackTrace;
        if (var$6 !== null) {
            var$6 = var$6.data;
            var$7 = var$6.length;
            var$8 = 0;
            while (true) {
                if (var$8 >= var$7)
                    break a;
                $element = var$6[var$8];
                otcic_JSStderrPrintStream_print(var$3, $rt_s(13));
                var$2 = $rt_s(2);
                if ($element !== null)
                    var$2 = $element.$toString();
                otcic_JSStderrPrintStream_print(var$5, var$2);
                otcic_JSStderrPrintStream_print(var$5, $rt_s(12));
                var$8 = var$8 + 1 | 0;
            }
        }
    }
    var$2 = $this.$cause;
    if (var$2 !== null && var$2 !== $this) {
        otcic_JSStderrPrintStream_print(var$3, $rt_s(14));
        $this.$cause.$printStackTrace($stream);
    }
},
jl_Exception = $rt_classWithoutFields(jl_Throwable),
jl_Exception__init_0 = $this => {
    $this.$suppressed = $rt_createArray(jl_Throwable, 0);
    jl_Throwable_initNativeException($this);
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
},
jl_Exception__init_1 = () => {
    let var_0 = new jl_Exception();
    jl_Exception__init_0(var_0);
    return var_0;
},
jl_Exception__init_ = ($this, $message) => {
    $this.$suppressed = $rt_createArray(jl_Throwable, 0);
    jl_Throwable_initNativeException($this);
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$message = $message;
},
jl_Exception__init_2 = var_0 => {
    let var_1 = new jl_Exception();
    jl_Exception__init_(var_1, var_0);
    return var_1;
},
jl_RuntimeException = $rt_classWithoutFields(jl_Exception),
jl_RuntimeException__init_ = $this => {
    jl_Exception__init_0($this);
},
jl_RuntimeException__init_2 = () => {
    let var_0 = new jl_RuntimeException();
    jl_RuntimeException__init_(var_0);
    return var_0;
},
jl_RuntimeException__init_0 = ($this, $message) => {
    jl_Exception__init_($this, $message);
},
jl_RuntimeException__init_1 = var_0 => {
    let var_1 = new jl_RuntimeException();
    jl_RuntimeException__init_0(var_1, var_0);
    return var_1;
},
otrr_ReflectionInfo = $rt_classWithoutFields(),
otrr_ClassInfo = $rt_classWithoutFields(otrr_ReflectionInfo),
otrr_ClassInfo_newArrayInstance = (var$0, var$1) => {
    switch (var$0.primitiveKind) {
        default: return $rt_createArray(var$0, var$1);
    }
},
otr_StringInfo = $rt_classWithoutFields(otrr_ReflectionInfo),
BrowserGame = $rt_classWithoutFields(),
BrowserGame_$callClinit = () => {
    BrowserGame_$callClinit = $rt_eraseClinit(BrowserGame);
    BrowserGame__clinit_();
},
BrowserGame_main = var$1 => {
    let $game, $display, var$4, var$5, var$6, var$7, var$8, var$9, var$10;
    BrowserGame_$callClinit();
    $game = GameMIDlet__init_0();
    $display = jml_Display_getDisplay($game);
    var$4 = new BrowserGame$main$lambda$_1_0;
    var$4.$_07 = $game;
    var$4.$_11 = $display;
    var$5 = new BrowserGame$main$lambda$_1_1;
    var$5.$_03 = $display;
    var$6 = new BrowserGame$main$lambda$_1_2;
    var$6.$_06 = $display;
    var$7 = new BrowserGame$main$lambda$_1_3;
    var$7.$_02 = $display;
    var$8 = new BrowserGame$main$lambda$_1_4;
    var$8.$_05 = $display;
    var$9 = new BrowserGame$main$lambda$_1_5;
    var$9.$_01 = $game;
    var$9.$_10 = $display;
    var$10 = new BrowserGame$main$lambda$_1_6;
    var$10.$_04 = $game;
    w_Browser_bind$js_body$_1(otji_JS_function(otji_JSWrapper_unwrap(var$4), "run"), otji_JS_function(otji_JSWrapper_unwrap(var$5), "run"), otji_JS_function(otji_JSWrapper_unwrap(var$6), "run"), otji_JS_function(otji_JSWrapper_unwrap(var$7), "run"), otji_JS_function(otji_JSWrapper_unwrap(var$8), "run"), otji_JS_function(otji_JSWrapper_unwrap(var$9), "run"), otji_JS_function(otji_JSWrapper_unwrap(var$10), "get"));
    GameMIDlet_startApp($game);
    jml_Display_flush($display);
},
BrowserGame__clinit_ = () => {
    return;
},
jl_ClassCastException = $rt_classWithoutFields(jl_RuntimeException),
otp_Platform = $rt_classWithoutFields(),
otp_Platform_launchThread = $runnable => {
    let var$2, var$3, var$4, var$5;
    a: {
        b: {
            $runnable = $runnable.$_0;
            if (!jl_Object_isEmptyMonitor($runnable)) {
                var$2 = $runnable.$monitor;
                if (var$2.$owner === null)
                    break b;
            }
            break a;
        }
        $runnable = var$2.$enteringThreads;
        if ($runnable !== null && !ju_ArrayDeque_isEmpty($runnable)) {
            $runnable = var$2.$enteringThreads;
            var$3 = $runnable.$head;
            if (var$3 == $runnable.$tail)
                var$4 = null;
            else {
                var$5 = $runnable.$array.data;
                var$4 = var$5[var$3];
                var$5[var$3] = null;
                $runnable.$head = ju_ArrayDeque_modInc(var$3, var$5.length);
                $runnable.$version = $runnable.$version + 1 | 0;
            }
            if (var$4 !== null) {
                var$4 = var$4;
                var$2.$enteringThreads = null;
                $runnable = var$4;
                var$2 = $runnable.$_00;
                var$4 = $runnable.$_1;
                var$3 = $runnable.$_2;
                $runnable = $runnable.$_3;
                jl_Thread_setCurrentThread(var$2);
                var$4 = var$4.$monitor;
                var$4.$owner = var$2;
                var$4.$count = var$4.$count + var$3 | 0;
                var$2 = null;
                otpp_AsyncCallbackWrapper_complete($runnable, var$2);
            } else {
                $runnable = new ju_NoSuchElementException;
                jl_Exception__init_0($runnable);
                $rt_throw($runnable);
            }
        }
    }
},
otp_Platform_schedule = (var$1, var$2) => {
    setTimeout(() => {
        otp_Platform_launchThread(var$1);
    }, var$2);
},
otji_JS = $rt_classWithoutFields(),
otji_JS_function = (var$1, var$2) => {
    if (var$1 === null || var$1 === undefined) {
        return null;
    }
    let name = 'jso$functor$' + var$2;
    let result = var$1[name];
    if (typeof result !== 'function') {
        let fn = function() {
            return var$1[var$2].apply(var$1, arguments);
        };
        result = () => fn;
        var$1[name] = result;
    }
    return result();
},
otci_IntegerUtil = $rt_classWithoutFields(),
jmm_MIDlet = $rt_classWithoutFields(),
jmm_MIDlet_notifyDestroyed = $this => {
    globalThis.mikiPlatform.exit();
},
jl_Runnable = $rt_classWithoutFields(0);
function GameMIDlet() {
    let a = this; jmm_MIDlet.call(a);
    a.$null0 = null;
    a.$case2 = null;
    a.$int3 = null;
    a.$try4 = 0;
    a.$long3 = 0;
    a.$for7 = 0;
    a.$new4 = 0;
    a.$else2 = 0;
    a.$do5 = null;
    a.$byte3 = 0;
    a.$a33 = 0;
    a.$if9 = 0;
}
let GameMIDlet_goto = null,
GameMIDlet_if = (var$0, var$1) => {
    return GameMIDlet_goto.data[var$1];
},
GameMIDlet_a = var$1 => {
    return GameMIDlet_goto.data[18 + var$1 | 0];
},
GameMIDlet_int = () => {
    return GameMIDlet_goto.data.length - 18 | 0;
},
GameMIDlet__init_ = var$0 => {
    let var$1, var$2, var$3, var$4, var$5, $$je;
    var$0.$try4 = 1;
    var$0.$long3 = (-1);
    var$0.$for7 = 0;
    var$0.$new4 = 0;
    var$0.$byte3 = (-1);
    var$0.$a33 = 0;
    var$0.$if9 = 0;
    a: {
        b: {
            try {
                var$1 = null;
                c: {
                    d: {
                        try {
                            var$2 = jl_System_getProperty($rt_s(15));
                            var$1 = var$2;
                            if (jl_String_length(var$2) > 2) {
                                var$1 = var$2;
                                var$2 = jl_String_substring(var$2, 0, 2);
                                var$1 = var$2;
                            }
                            break c;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof jl_Exception) {
                                break d;
                            } else {
                                throw $$e;
                            }
                        }
                    }
                    var$2 = var$1;
                }
                var$1 = var$2 === null ? $rt_s(16) : jl_StringBuffer_toString(jl_StringBuffer_append(jl_StringBuffer_append(jl_StringBuffer__init_(), $rt_s(17)), jl_String_toLowerCase(var$2)));
                var$2 = w_Resources_open(jl_Object_getClass(var$0), var$1);
                if (var$2 === null)
                    var$2 = w_Resources_open(jl_Object_getClass(var$0), $rt_s(16));
                var$3 = ji_DataInputStream__init_(var$2);
                GameMIDlet_goto = $rt_createArray(jl_String, ji_DataInputStream_readByte(var$3));
                var$4 = 0;
                while (true) {
                    var$5 = GameMIDlet_goto.data;
                    if (var$4 >= var$5.length)
                        break;
                    var$5[var$4] = ji_DataInputStream_readUTF(var$3);
                    var$4 = var$4 + 1 | 0;
                }
                ji_ByteArrayInputStream_close(var$2);
                var$1 = w_Resources_open(jl_Object_getClass(var$0), jl_StringBuffer_toString(jl_StringBuffer_append(jl_StringBuffer_append(jl_StringBuffer__init_(), var$1), $rt_s(18))));
                if (var$1 === null)
                    var$1 = w_Resources_open(jl_Object_getClass(var$0), $rt_s(19));
                var$3 = ji_DataInputStream_readUTF(ji_DataInputStream__init_(var$1));
                ji_ByteArrayInputStream_close(var$1);
                e: {
                    f: {
                        try {
                            var$0.$do5 = k__init_($rt_s(20), $rt_s(21), 0, 1, 10, 1);
                            break e;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof jl_Throwable) {
                                break f;
                            } else {
                                throw $$e;
                            }
                        }
                    }
                    var$0.$do5 = null;
                }
                var$0.$null0 = jml_Display_getDisplay(var$0);
                var$1 = b__init_();
                var$0.$int3 = var$1;
                b_a4(var$1, var$3);
                b_a2(var$0.$int3, var$0.$do5);
                j_a1(var$0.$int3, var$0);
                b_a3(var$0.$int3, null);
                var$1 = var$0.$int3;
                jml_Displayable_setCommandListener(var$1, var$1);
                var$1 = g__init_();
                var$2 = d__init_();
                var$0.$case2 = var$2;
                j_a1(var$2, var$0);
                d_a10(var$0.$case2, var$1);
                jml_Displayable_setCommandListener(var$0.$case2, var$0.$int3);
                c_a4(var$0);
                b_a5(var$0.$int3, var$0.$case2);
                j_a(d_g(var$0.$case2));
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    var$1 = $$je;
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        jl_Throwable_printStackTrace(var$1);
        jmm_MIDlet_notifyDestroyed(var$0);
    }
},
GameMIDlet__init_0 = () => {
    let var_0 = new GameMIDlet();
    GameMIDlet__init_(var_0);
    return var_0;
},
GameMIDlet_startApp = var$0 => {
    let var$1, $$je;
    a: {
        b: {
            try {
                var$0.$a33 = 0;
                var$0.$if9 = 0;
                var$0.$new4 = 0;
                if (var$0.$try4) {
                    b_long(var$0.$int3);
                    h_if();
                    jml_Display_setCurrent(var$0.$null0, var$0.$int3);
                    var$0.$byte3 = (-1);
                    var$0.$long3 = 0;
                } else if (var$0.$long3)
                    d_goto(var$0.$case2);
                else
                    j_goto(var$0.$int3);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    var$1 = $$je;
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        jl_Throwable_printStackTrace(var$1);
        jmm_MIDlet_notifyDestroyed(var$0);
    }
},
GameMIDlet_run = var$0 => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, $$je;
    var$1 = var$0.$case2;
    var$2 = var$1.$av;
    var$3 = var$0.$new4;
    if (!var$3 && !var$0.$if9) {
        var$4 = 0;
        var$5 = var$0.$long3;
        if (!var$5) {
            j_int0(var$0.$int3);
            var$4 = var$0.$int3.$dG;
            if (var$4 && var$0.$byte3 == (-1))
                var$0.$byte3 = 1;
        } else if (var$5 == 1) {
            j_int0(var$1);
            var$4 = var$0.$case2.$b5;
            if (var$4 && var$0.$byte3 == (-1))
                var$0.$byte3 = 0;
        }
        if (!var$4 && var$0.$byte3 == (-1)) {
            var$4 = var$0.$case2.$av;
            if (var$2 != var$4)
                j_a(var$4);
        } else {
            a: {
                b: {
                    switch (var$0.$byte3) {
                        case 0:
                            break b;
                        case 1:
                            break;
                        default:
                            break a;
                    }
                    j_a(1);
                    b_for(var$0.$int3);
                    var$0.$long3 = 1;
                    if (!var$0.$else2) {
                        var$1 = var$0.$case2;
                        if (!var$1.$b5)
                            d_goto(var$1);
                        else
                            d_long(var$1);
                        jml_Display_setCurrent(var$0.$null0, var$0.$case2);
                    } else {
                        var$1 = var$0.$case2;
                        if (!var$1.$b5 && !var$0.$try4)
                            d_for1(var$1);
                        jml_Canvas_repaint(var$0.$case2);
                        var$1 = var$0.$do5;
                        if (var$1 !== null)
                            k_a(var$1, 0, 0);
                        d_long(var$0.$case2);
                        jml_Display_setCurrent(var$0.$null0, var$0.$case2);
                    }
                    var$0.$try4 = 0;
                    break a;
                }
                if (var$0.$long3) {
                    var$0.$long3 = 0;
                    var$3 = 0;
                    var$1 = var$0.$case2;
                    if (!(var$1.$b5 && !var$1.$av)) {
                        if (var$1.$d)
                            j_a(var$1.$av);
                        else {
                            j_if(var$1);
                            j_a(var$0.$case2.$av);
                        }
                    } else {
                        d_for1(var$1);
                        j_a(0);
                        var$1 = var$0.$do5;
                        if (var$1 !== null) {
                            var$2 = var$0.$case2.$a60;
                            var$4 = var$1.$if8.data[0].data[var$1.$new2 - 1 | 0];
                            if (!var$1.$int6 ? (var$2 >= var$4 ? 0 : 1) : var$2 <= var$4 ? 0 : 1)
                                var$3 = 1;
                        }
                    }
                    b_long(var$0.$int3);
                    var$1 = var$0.$int3;
                    var$1.$ds = 0;
                    if (!var$3)
                        jml_Display_setCurrent(var$0.$null0, var$1);
                    else {
                        var$1.$dH = var$0.$case2.$a60;
                        var$1.$dx = 0;
                        jml_Display_setCurrent(jml_Display_getDisplay(var$1.$goto1), var$1.$du);
                        var$1.$ds = 100000;
                    }
                }
            }
            var$0.$byte3 = (-1);
        }
        if (var$0.$for7) {
            if (var$0.$long3)
                d_for1(var$0.$case2);
            else
                b_for(var$0.$int3);
            var$0.$new4 = 1;
        }
        return;
    }
    if (var$3) {
        c: {
            d: {
                try {
                    var$6 = jmr_RecordStore_openRecordStore($rt_s(22), 0);
                    var$7 = var$1.$G;
                    jmr_RecordStore_setRecord(var$6, 1, var$7, 0, var$7.data.length);
                    jmr_RecordStore_closeRecordStore(var$6);
                    break c;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_Exception) {
                        var$1 = $$je;
                        break d;
                    } else {
                        throw $$e;
                    }
                }
            }
            jl_Throwable_printStackTrace(var$1);
        }
        if (!var$0.$a33)
            jmm_MIDlet_notifyDestroyed(var$0);
    }
    if (var$0.$if9) {
        if (var$0.$long3)
            j_if(var$0.$case2);
        else
            j_if(var$0.$int3);
    }
};
function jml_Display() {
    jl_Object.call(this);
    this.$current = null;
}
let jml_Display_INSTANCE = null,
jml_Display_dirty = 0,
jml_Display_$callClinit = () => {
    jml_Display_$callClinit = $rt_eraseClinit(jml_Display);
    jml_Display__clinit_();
},
jml_Display_getDisplay = $midlet => {
    jml_Display_$callClinit();
    return jml_Display_INSTANCE;
},
jml_Display_getCurrent = $this => {
    return $this.$current;
},
jml_Display_setCurrent = ($this, $next) => {
    let $canvas;
    $canvas = $this.$current;
    if ($canvas !== $next) {
        if ($canvas instanceof jml_Canvas)
            $canvas.$hideNotify();
        $this.$current = $next;
        jml_Display_$callClinit();
        jml_Display_dirty = 1;
        if ($next instanceof jml_Canvas) {
            $canvas = $next;
            $canvas.$showNotify();
            jml_Canvas_repaint($canvas);
        }
        return;
    }
},
jml_Display_flush = $this => {
    let $canvas;
    $canvas = $this.$current;
    if ($canvas !== null) {
        jml_Display_$callClinit();
        if (jml_Display_dirty) {
            jml_Display_dirty = 0;
            $canvas.$render();
            globalThis.mikiPlatform.endUI();
        }
        $canvas = $this.$current;
        if ($canvas instanceof jml_Canvas)
            jml_Canvas_serviceRepaints($canvas);
        return;
    }
},
jml_Display__clinit_ = () => {
    let var$1;
    var$1 = new jml_Display;
    jml_Display_$callClinit();
    jml_Display_INSTANCE = var$1;
    jml_Display_dirty = 1;
},
otj_JSObject = $rt_classWithoutFields(0),
w_Browser$Tick = $rt_classWithoutFields(0);
function BrowserGame$main$lambda$_1_0() {
    let a = this; jl_Object.call(a);
    a.$_07 = null;
    a.$_11 = null;
}
let BrowserGame$main$lambda$_1_0_run$exported$0 = var$1 => {
    let var$2;
    var$1 = var$1;
    var$2 = var$1.$_07;
    var$1 = var$1.$_11;
    BrowserGame_$callClinit();
    GameMIDlet_run(var$2);
    jml_Display_flush(var$1);
},
w_Browser$Pair = $rt_classWithoutFields(0);
function BrowserGame$main$lambda$_1_1() {
    jl_Object.call(this);
    this.$_03 = null;
}
let BrowserGame$main$lambda$_1_1_run$exported$0 = (var$1, var$2, var$3) => {
    let var$4, var$5;
    var$4 = var$2;
    var$5 = var$3;
    var$1 = var$1.$_03;
    BrowserGame_$callClinit();
    var$5 = !var$5 ? 0 : 1;
    var$2 = var$1.$current;
    if (var$2 instanceof jml_Canvas) {
        var$2 = var$2;
        if (!var$5)
            j_keyReleased(var$2, var$4);
        else
            j_keyPressed(var$2, var$4);
    }
    jml_Display_flush(var$1);
},
w_Browser$Number = $rt_classWithoutFields(0);
function BrowserGame$main$lambda$_1_2() {
    jl_Object.call(this);
    this.$_06 = null;
}
let BrowserGame$main$lambda$_1_2_run$exported$0 = (var$1, var$2) => {
    let var$3, var$4, var$5;
    var$3 = var$2;
    var$1 = var$1.$_06;
    BrowserGame_$callClinit();
    var$2 = var$1.$current;
    if (var$2 !== null && var$3 >= 0) {
        var$4 = var$2.$commands;
        if (var$3 < var$4.$size0) {
            var$5 = var$2.$listener;
            if (var$5 !== null)
                var$5.$commandAction(ju_ArrayList_get(var$4, var$3), var$2);
            jml_Display_flush(var$1);
            return;
        }
    }
    var$2 = new jl_IllegalArgumentException;
    jl_Exception__init_(var$2, $rt_s(23));
    $rt_throw(var$2);
};
function BrowserGame$main$lambda$_1_3() {
    jl_Object.call(this);
    this.$_02 = null;
}
let BrowserGame$main$lambda$_1_3_run$exported$0 = (var$1, var$2) => {
    let var$3, var$4;
    var$3 = var$2;
    var$1 = var$1.$_02;
    BrowserGame_$callClinit();
    var$2 = var$1.$current;
    if (var$2 instanceof jml_List) {
        var$2 = var$2;
        if (var$3 >= 0 && var$3 < var$2.$items.$size0) {
            var$2.$selected = var$3;
            jml_Display_$callClinit();
            jml_Display_dirty = 1;
            var$4 = var$2.$listener;
            if (var$4 !== null) {
                jml_List_$callClinit();
                var$4.$commandAction(jml_List_SELECT_COMMAND, var$2);
            }
            jml_Display_flush(var$1);
            return;
        }
        var$2 = new jl_IllegalArgumentException;
        jl_Exception__init_(var$2, $rt_s(24));
        $rt_throw(var$2);
    }
    var$2 = new jl_IllegalStateException;
    jl_Exception__init_(var$2, $rt_s(25));
    $rt_throw(var$2);
},
w_Browser$Text = $rt_classWithoutFields(0);
function BrowserGame$main$lambda$_1_4() {
    jl_Object.call(this);
    this.$_05 = null;
}
let BrowserGame$main$lambda$_1_4_run$exported$0 = (var$1, var$2, var$3) => {
    let var$4;
    var$4 = var$2;
    var$2 = $rt_str(var$3);
    var$1 = var$1.$_05;
    BrowserGame_$callClinit();
    var$1 = var$1.$current;
    if (var$1 instanceof jml_Form) {
        var$1 = ju_ArrayList_get(var$1.$items0, var$4);
        if (var$1 instanceof jml_TextField) {
            jml_TextField_setString(var$1, var$2);
            return;
        }
    }
    var$2 = new jl_IllegalArgumentException;
    jl_Exception__init_(var$2, $rt_s(26));
    $rt_throw(var$2);
};
function BrowserGame$main$lambda$_1_5() {
    let a = this; jl_Object.call(a);
    a.$_01 = null;
    a.$_10 = null;
}
let BrowserGame$main$lambda$_1_5_run$exported$0 = (var$1, var$2) => {
    let var$3;
    var$3 = var$2;
    var$1 = var$1;
    var$2 = var$1.$_01;
    var$1 = var$1.$_10;
    BrowserGame_$callClinit();
    if (!var$3)
        GameMIDlet_startApp(var$2);
    else {
        var$2.$if9 = 1;
        GameMIDlet_run(var$2);
    }
    jml_Display_flush(var$1);
},
w_Browser$State = $rt_classWithoutFields(0);
function BrowserGame$main$lambda$_1_6() {
    jl_Object.call(this);
    this.$_04 = null;
}
let BrowserGame$main$lambda$_1_6_get$exported$0 = var$1 => {
    let var$2, var$3, var$4, var$5, var$6;
    var$1 = var$1.$_04;
    BrowserGame_$callClinit();
    var$2 = var$1.$long3;
    var$1 = var$1.$case2;
    var$3 = var$1.$cX;
    var$4 = var$1.$aR;
    var$5 = var$1.$aQ;
    var$1 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$1);
    var$6 = jl_StringBuilder_append(var$1, $rt_s(27));
    jl_AbstractStringBuilder_append(var$6, var$2);
    var$6 = jl_StringBuilder_append(var$6, $rt_s(28));
    jl_AbstractStringBuilder_append(var$6, var$3);
    var$6 = jl_StringBuilder_append(var$6, $rt_s(29));
    jl_AbstractStringBuilder_append(var$6, var$4);
    var$6 = jl_StringBuilder_append(var$6, $rt_s(30));
    jl_AbstractStringBuilder_append(var$6, var$5);
    jl_StringBuilder_append0(var$6, 125);
    return $rt_ustr(jl_AbstractStringBuilder_toString(var$1));
};
function otji_JSWrapper() {
    jl_Object.call(this);
    this.$js = null;
}
let otji_JSWrapper_unwrap = $o => {
    if ($o !== null)
        return !($o instanceof otji_JSWrapper) ? $o : $o.$js;
    return null;
},
w_Browser = $rt_classWithoutFields(),
w_Browser_clock = () => {
    return Long_fromNumber(globalThis.mikiPlatform.clock);
},
w_Browser_bind$js_body$_1 = (var$1, var$2, var$3, var$4, var$5, var$6, var$7) => {
    globalThis.mikiPlatform.bind({ tick: var$1, key: var$2, command: var$3, select: var$4, text: var$5, pause: var$6, state: var$7 });
},
ju_Comparator = $rt_classWithoutFields(0),
jl_String$_clinit_$lambda$_118_0 = $rt_classWithoutFields(),
jl_Character = $rt_classWithoutFields(),
jl_Character_TYPE = null,
jl_Character_characterCache = null,
jl_Character_$callClinit = () => {
    jl_Character_$callClinit = $rt_eraseClinit(jl_Character);
    jl_Character__clinit_();
},
jl_Character_forDigit = (var$1, var$2) => {
    jl_Character_$callClinit();
    if (var$2 >= 2 && var$2 <= 36 && var$1 >= 0 && var$1 < var$2)
        return var$1 < 10 ? (48 + var$1 | 0) & 65535 : ((97 + var$1 | 0) - 10 | 0) & 65535;
    return 0;
},
jl_Character__clinit_ = () => {
    jl_Character_TYPE = $rt_cls($rt_charcls);
    jl_Character_characterCache = $rt_createArray(jl_Character, 128);
},
jl_StringBuffer = $rt_classWithoutFields(jl_AbstractStringBuilder),
jl_StringBuffer__init_0 = $this => {
    jl_AbstractStringBuilder__init_($this);
},
jl_StringBuffer__init_ = () => {
    let var_0 = new jl_StringBuffer();
    jl_StringBuffer__init_0(var_0);
    return var_0;
},
jl_StringBuffer_append = ($this, $string) => {
    let var$2;
    var$2 = $this.$length0;
    jl_AbstractStringBuilder_insert($this, var$2, $string);
    return $this;
},
jl_StringBuffer_toString = $this => {
    return jl_AbstractStringBuilder_toString($this);
},
jl_StringBuffer_ensureCapacity = ($this, var$1) => {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
},
w_Resources = $rt_classWithoutFields(),
w_Resources_open = ($owner, $name) => {
    let $data, $bytes, var$5, $i, var$7;
    if (jl_String_startsWith($name, $rt_s(17)))
        $name = jl_String_substring0($name, 1);
    $data = $rt_str(globalThis.mikiPlatform.resource($rt_ustr($name)));
    if ($data !== null) {
        $bytes = $rt_createByteArray($data.$nativeString.length);
        var$5 = $bytes.data;
        $i = 0;
        var$7 = var$5.length;
        while ($i < var$7) {
            var$5[$i] = jl_String_charAt($data, $i) << 24 >> 24;
            $i = $i + 1 | 0;
        }
        return ji_ByteArrayInputStream__init_($bytes);
    }
    return null;
},
w_Resources_binary = $data => {
    let $result, var$3, var$4;
    $data = $data.data;
    $result = new jl_StringBuilder;
    var$3 = $data.length;
    jl_AbstractStringBuilder__init_0($result, var$3);
    var$4 = 0;
    while (var$4 < var$3) {
        jl_StringBuilder_append0($result, $data[var$4] & 255 & 65535);
        var$4 = var$4 + 1 | 0;
    }
    return jl_AbstractStringBuilder_toString($result);
},
jl_AutoCloseable = $rt_classWithoutFields(0),
ji_Closeable = $rt_classWithoutFields(0),
ji_InputStream = $rt_classWithoutFields();
function ji_FilterInputStream() {
    ji_InputStream.call(this);
    this.$in = null;
}
let ji_FilterInputStream_close = $this => {
    return;
},
ji_FilterInputStream_skip = ($this, $count) => {
    let var$2, var$3;
    var$2 = $this.$in;
    var$3 = Long_lo((jl_Math_min0($count, Long_fromInt(var$2.$count1 - var$2.$pos | 0))));
    var$2.$pos = var$2.$pos + var$3 | 0;
    return Long_fromInt(var$3);
},
ji_DataInput = $rt_classWithoutFields(0);
function ji_DataInputStream() {
    ji_FilterInputStream.call(this);
    this.$buff = null;
}
let ji_DataInputStream__init_0 = ($this, $in) => {
    $this.$in = $in;
    $this.$buff = $rt_createByteArray(8);
},
ji_DataInputStream__init_ = var_0 => {
    let var_1 = new ji_DataInputStream();
    ji_DataInputStream__init_0(var_1, var_0);
    return var_1;
},
ji_DataInputStream_readBoolean = $this => {
    let $temp, var$2;
    $temp = ji_ByteArrayInputStream_read0($this.$in);
    if ($temp >= 0)
        return !$temp ? 0 : 1;
    var$2 = new ji_EOFException;
    jl_Exception__init_0(var$2);
    $rt_throw(var$2);
},
ji_DataInputStream_readByte = $this => {
    let $temp, var$2;
    $temp = ji_ByteArrayInputStream_read0($this.$in);
    if ($temp < 0) {
        var$2 = new ji_EOFException;
        jl_Exception__init_0(var$2);
        $rt_throw(var$2);
    }
    return $temp << 24 >> 24;
},
ji_DataInputStream_readToBuff = ($this, $count) => {
    let $offset, var$3, var$4, var$5, $bytesRead;
    $offset = 0;
    while ($offset < $count) {
        var$3 = $this.$in;
        var$4 = $this.$buff;
        var$5 = $count - $offset | 0;
        $bytesRead = ji_ByteArrayInputStream_read(var$3, var$4, $offset, var$5);
        if ($bytesRead == (-1))
            return $bytesRead;
        $offset = $offset + $bytesRead | 0;
    }
    return $offset;
},
ji_DataInputStream_readInt = $this => {
    let var$1, var$2;
    if (ji_DataInputStream_readToBuff($this, 4) >= 0) {
        var$1 = $this.$buff.data;
        return (var$1[0] & 255) << 24 | (var$1[1] & 255) << 16 | (var$1[2] & 255) << 8 | var$1[3] & 255;
    }
    var$2 = new ji_EOFException;
    jl_Exception__init_0(var$2);
    $rt_throw(var$2);
},
ji_DataInputStream_readShort = $this => {
    let var$1, var$2;
    if (ji_DataInputStream_readToBuff($this, 2) >= 0) {
        var$1 = $this.$buff.data;
        return ((var$1[0] & 255) << 24 >> 16 | var$1[1] & 255) << 16 >> 16;
    }
    var$2 = new ji_EOFException;
    jl_Exception__init_0(var$2);
    $rt_throw(var$2);
},
ji_DataInputStream_readUTF = $this => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7;
    if (ji_DataInputStream_readToBuff($this, 2) >= 0) {
        var$1 = $this.$buff.data;
        var$2 = ((var$1[0] & 255) << 8 | var$1[1] & 255) & 65535;
        var$1 = $rt_createByteArray(var$2);
        var$3 = $rt_createCharArray(var$2);
        var$4 = 0;
        var$5 = $this;
        if (var$2 >= 0) {
            a: {
                if (var$2) {
                    if (var$5.$in !== null) {
                        if (var$4 <= (var$1.data.length - var$2 | 0)) {
                            var$6 = var$2;
                            while (var$6 > 0) {
                                var$7 = ji_ByteArrayInputStream_read(var$5.$in, var$1, var$4, var$6);
                                if (var$7 < 0) {
                                    var$5 = new ji_EOFException;
                                    jl_Exception__init_0(var$5);
                                    $rt_throw(var$5);
                                }
                                var$4 = var$4 + var$7 | 0;
                                var$6 = var$6 - var$7 | 0;
                            }
                            break a;
                        }
                        var$5 = new jl_IndexOutOfBoundsException;
                        jl_Exception__init_0(var$5);
                        $rt_throw(var$5);
                    }
                    var$5 = new jl_NullPointerException;
                    jl_Exception__init_0(var$5);
                    $rt_throw(var$5);
                }
            }
            return ji_DataInputStream_convertUTF8WithBuf(var$1, var$3, 0, var$2);
        }
        var$5 = new jl_IndexOutOfBoundsException;
        jl_Exception__init_0(var$5);
        $rt_throw(var$5);
    }
    var$5 = new ji_EOFException;
    jl_Exception__init_0(var$5);
    $rt_throw(var$5);
},
ji_DataInputStream_convertUTF8WithBuf = ($buf, $out, $offset, $utfSize) => {
    let $count, $s, var$7, var$8, $b, $ch, $a, var$12, $b_0, $c;
    $count = 0;
    $s = 0;
    a: {
        while ($count < $utfSize) {
            var$7 = $buf.data;
            var$8 = $out.data;
            $b = $count + 1 | 0;
            $ch = var$7[$offset + $count | 0] & 65535;
            var$8[$s] = $ch;
            $a = var$8[$s];
            if ($ch < 128)
                $s = $s + 1 | 0;
            else if (($a & 224) == 192) {
                if ($b >= $utfSize) {
                    var$12 = new ji_UTFDataFormatException;
                    jl_Exception__init_(var$12, $rt_s(31));
                    $rt_throw(var$12);
                }
                $ch = $b + 1 | 0;
                $b = var$7[$offset + $b | 0];
                if (($b & 192) != 128) {
                    var$12 = new ji_UTFDataFormatException;
                    jl_Exception__init_(var$12, $rt_s(32));
                    $rt_throw(var$12);
                }
                $b_0 = $s + 1 | 0;
                var$8[$s] = (($a & 31) << 6 | $b & 63) & 65535;
                $s = $b_0;
                $b = $ch;
            } else {
                if (($a & 240) != 224) {
                    var$12 = new ji_UTFDataFormatException;
                    jl_Exception__init_(var$12, $rt_s(32));
                    $rt_throw(var$12);
                }
                $count = $b + 1 | 0;
                if ($count >= $utfSize) {
                    var$12 = new ji_UTFDataFormatException;
                    jl_Exception__init_(var$12, $rt_s(32));
                    $rt_throw(var$12);
                }
                $b_0 = var$7[$offset + $b | 0];
                $b = $count + 1 | 0;
                $c = var$7[$offset + $count | 0];
                if (($b_0 & 192) != 128)
                    break a;
                if (($c & 192) != 128)
                    break a;
                $count = $s + 1 | 0;
                var$8[$s] = (($a & 15) << 12 | ($b_0 & 63) << 6 | $c & 63) & 65535;
                $s = $count;
            }
            $count = $b;
        }
        return jl_String__init_0($out, 0, $s);
    }
    var$12 = new ji_UTFDataFormatException;
    jl_Exception__init_(var$12, $rt_s(32));
    $rt_throw(var$12);
};
function jml_Displayable() {
    let a = this; jl_Object.call(a);
    a.$commands = null;
    a.$listener = null;
    a.$title = null;
}
let jml_Displayable__init_ = $this => {
    $this.$commands = ju_ArrayList__init_();
    $this.$title = $rt_s(33);
},
jml_Displayable_addCommand = ($this, $command) => {
    let var$2, var$3, var$4, var$5;
    var$2 = $this.$commands;
    var$3 = new ju_AbstractList$1;
    var$3.$this$0 = var$2;
    var$3.$modCount0 = var$2.$modCount;
    var$3.$size2 = var$2.$size0;
    var$3.$removeIndex = (-1);
    var$2 = var$3;
    a: {
        b: {
            while (true) {
                var$4 = var$2.$index;
                if (!(var$4 >= var$2.$size2 ? 0 : 1))
                    break b;
                var$5 = var$2.$modCount0;
                var$3 = var$2.$this$0;
                if (var$5 != var$3.$modCount)
                    break;
                var$2.$removeIndex = var$4;
                var$2.$index = var$4 + 1 | 0;
                if (ju_Objects_equals(ju_ArrayList_get(var$3, var$4), $command)) {
                    var$4 = 1;
                    break a;
                }
            }
            $command = new ju_ConcurrentModificationException;
            jl_Exception__init_0($command);
            $rt_throw($command);
        }
        var$4 = 0;
    }
    if (!var$4) {
        ju_ArrayList_add($this.$commands, $command);
        jml_Display_$callClinit();
        jml_Display_dirty = 1;
    }
},
jml_Displayable_removeCommand = ($this, $command) => {
    let var$2, var$3, var$4, var$5;
    var$2 = $this.$commands;
    var$3 = var$2;
    var$4 = var$3.$size0;
    var$5 = 0;
    a: {
        b: {
            while (true) {
                if (var$5 >= var$4)
                    break b;
                if (ju_Objects_equals($command, ju_ArrayList_get(var$3, var$5)))
                    break;
                var$5 = var$5 + 1 | 0;
            }
            break a;
        }
        var$5 = (-1);
    }
    if (var$5 >= 0)
        ju_ArrayList_remove(var$2, var$5);
    jml_Display_$callClinit();
    jml_Display_dirty = 1;
},
jml_Displayable_setCommandListener = ($this, $listener) => {
    $this.$listener = $listener;
},
jml_Displayable_render = $this => {
    let var$1, var$2, $i;
    var$1 = !($this instanceof jml_Canvas) ? $rt_s(34) : $rt_s(35);
    var$2 = $this.$title;
    globalThis.mikiPlatform.beginUI($rt_ustr(var$1), $rt_ustr(var$2));
    $i = 0;
    while (true) {
        var$1 = $this.$commands;
        if ($i >= var$1.$size0)
            break;
        var$1 = (ju_ArrayList_get(var$1, $i)).$label;
        globalThis.mikiPlatform.addCommand($i, $rt_ustr(var$1));
        $i = $i + 1 | 0;
    }
};
function jml_Canvas() {
    jml_Displayable.call(this);
    this.$pending = 0;
}
let jml_Canvas_getWidth = $this => {
    return 176;
},
jml_Canvas_getHeight = $this => {
    return 144;
},
jml_Canvas_isDoubleBuffered = $this => {
    return 1;
},
jml_Canvas_getGameAction = ($this, $key) => {
    a: {
        b: {
            c: {
                d: {
                    e: {
                        f: {
                            switch ($key) {
                                case 50:
                                    break;
                                case 51:
                                case 55:
                                    break f;
                                case 52:
                                    break e;
                                case 53:
                                    break d;
                                case 54:
                                    break c;
                                case 56:
                                    break b;
                                default:
                                    break f;
                            }
                            $key = 1;
                            break a;
                        }
                        $key = 0;
                        break a;
                    }
                    $key = 2;
                    break a;
                }
                $key = 8;
                break a;
            }
            $key = 5;
            break a;
        }
        $key = 6;
    }
    return $key;
},
jml_Canvas_repaint = $this => {
    $this.$pending = 1;
},
jml_Canvas_serviceRepaints = $this => {
    let var$1;
    if ($this.$pending && (jml_Display_getDisplay(null)).$current === $this) {
        $this.$pending = 0;
        var$1 = jml_Graphics__init_(0, 176, 144);
        j_paint($this, var$1);
    }
},
jml_CommandListener = $rt_classWithoutFields(0);
function j() {
    let a = this; jml_Canvas.call(a);
    a.$d = 0;
    a.$for8 = null;
    a.$goto1 = null;
    a.$byte4 = 0;
    a.$try5 = null;
    a.$m0 = 0;
    a.$long4 = 0;
    a.$c3 = 0;
    a.$b6 = 0;
    a.$void = 0;
    a.$h2 = 0;
    a.$a30 = 0;
    a.$if10 = Long_ZERO;
}
let j_g = null,
j_null = null,
j_j = null,
j_char = null,
j_case = null,
j_e = null,
j_l = null,
j_new = null,
j_f = null,
j_int = null,
j_k = null,
j_else = null,
j_i = null,
j_do = 0,
j_$callClinit = () => {
    j_$callClinit = $rt_eraseClinit(j);
    j__clinit_();
},
j__init_ = var$0 => {
    j_$callClinit();
    jml_Displayable__init_(var$0);
    var$0.$d = 1;
    var$0.$byte4 = 0;
    var$0.$try5 = $rt_createIntArray(5);
    var$0.$m0 = 20;
    var$0.$b6 = 500;
    var$0.$c3 = 20;
},
j__init_0 = () => {
    let var_0 = new j();
    j__init_(var_0);
    return var_0;
},
j_a1 = (var$0, var$1) => {
    var$0.$goto1 = var$1;
},
j_a0 = (var$0, var$1) => {
    let var$2, var$3, $$je;
    j_$callClinit();
    if (j_g === null) {
        a: {
            b: {
                try {
                    var$1 = jmr_RecordStore_openRecordStore($rt_s(36), 1);
                    if (jmr_RecordStore_getNumRecords(var$1))
                        j_i = jmr_RecordStore_getRecord(var$1, 1);
                    else {
                        var$2 = j_i;
                        jmr_RecordStore_addRecord(var$1, var$2, 0, var$2.data.length);
                    }
                    jmr_RecordStore_closeRecordStore(var$1);
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_Exception) {
                        var$1 = $$je;
                        break b;
                    } else {
                        throw $$e;
                    }
                }
            }
            jl_Throwable_printStackTrace(var$1);
        }
        h_a1(j_i.data[2] != 1 ? 0 : 1);
        var$2 = j_i.data;
        var$0.$a30 = var$2[2];
        c_a2(var$2[1] != 1 ? 0 : 1);
        var$0.$h2 = j_i.data[1];
        j_else = jml_Command__init_(GameMIDlet_if(var$0.$goto1, 4), 4, 1);
        j_case = jml_Command__init_(GameMIDlet_if(var$0.$goto1, 5), 2, 2);
        j_g = jml_Command__init_(GameMIDlet_if(var$0.$goto1, 10), 1, 2);
        j_null = jml_Command__init_(GameMIDlet_if(var$0.$goto1, 0), 1, 1);
        j_k = jml_Command__init_(GameMIDlet_if(var$0.$goto1, 2), 1, 3);
        j_j = jml_Command__init_(GameMIDlet_if(var$0.$goto1, 1), 1, 4);
        var$1 = new jml_Command;
        var$3 = new jl_StringBuffer;
        jl_AbstractStringBuilder__init_(var$3);
        jml_Command__init_0(var$1, jl_AbstractStringBuilder_toString(jl_StringBuffer_append(jl_StringBuffer_append(var$3, GameMIDlet_if(var$0.$goto1, 14)), GameMIDlet_if(var$0.$goto1, 12))), 1, 5);
        j_l = var$1;
        var$1 = new jml_Command;
        var$3 = new jl_StringBuffer;
        jl_AbstractStringBuilder__init_(var$3);
        jml_Command__init_0(var$1, jl_AbstractStringBuilder_toString(jl_StringBuffer_append(jl_StringBuffer_append(var$3, GameMIDlet_if(var$0.$goto1, 14)), GameMIDlet_if(var$0.$goto1, 13))), 1, 5);
        j_new = var$1;
        var$1 = new jml_Command;
        var$3 = new jl_StringBuffer;
        jl_AbstractStringBuilder__init_(var$3);
        jml_Command__init_0(var$1, jl_AbstractStringBuilder_toString(jl_StringBuffer_append(jl_StringBuffer_append(var$3, GameMIDlet_if(var$0.$goto1, 15)), GameMIDlet_if(var$0.$goto1, 12))), 1, 6);
        j_f = var$1;
        var$1 = new jml_Command;
        var$3 = new jl_StringBuffer;
        jl_AbstractStringBuilder__init_(var$3);
        jml_Command__init_0(var$1, jl_AbstractStringBuilder_toString(jl_StringBuffer_append(jl_StringBuffer_append(var$3, GameMIDlet_if(var$0.$goto1, 15)), GameMIDlet_if(var$0.$goto1, 13))), 1, 6);
        j_int = var$1;
        j_e = jml_Command__init_(GameMIDlet_if(var$0.$goto1, 11), 1, 7);
        j_char = jml_Command__init_(GameMIDlet_if(var$0.$goto1, 3), 7, 8);
    }
    jml_Displayable_addCommand(var$0, j_g);
    jml_Displayable_addCommand(var$0, j_j);
    jml_Displayable_addCommand(var$0, j_k);
    if (j_i.data[1] != 1)
        jml_Displayable_addCommand(var$0, j_new);
    else
        jml_Displayable_addCommand(var$0, j_l);
    var$2 = j_i.data;
    var$0.$h2 = var$2[1];
    if (var$2[2] != 1)
        jml_Displayable_addCommand(var$0, j_int);
    else
        jml_Displayable_addCommand(var$0, j_f);
    var$0.$a30 = j_i.data[2];
    var$1 = j_e;
    if (var$1 !== null)
        jml_Displayable_addCommand(var$0, var$1);
    jml_Displayable_addCommand(var$0, j_char);
},
j_if0 = (var$0, var$1, var$2) => {
    return;
},
j_long = var$0 => {
    let var$1, var$2, var$3;
    j_case0(var$0);
    var$0.$byte4 = 1;
    var$0.$d = 0;
    var$0.$void = 0;
    var$0.$long4 = 0;
    var$1 = var$0.$try5.data;
    var$2 = var$1.length - 1 | 0;
    while (var$2 >= 0) {
        var$3 = var$2;
        while (var$3 >= 0) {
            var$1[var$3] = var$1[var$3] + var$0.$c3 | 0;
            var$3 = var$3 + (-1) | 0;
        }
        var$2 = var$2 + (-1) | 0;
    }
    var$0.$m0 = var$0.$c3;
    var$0.$if10 = w_Browser_clock();
},
j_a2 = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5;
    var$2 = var$0.$b6;
    if (var$1 <= var$2)
        var$2 = var$1;
    var$0.$void = var$0.$void + var$2 | 0;
    var$1 = 0;
    while (true) {
        var$3 = var$0.$try5.data;
        var$4 = var$3.length;
        if (var$1 >= var$4)
            break;
        var$3[var$1] = var$3[var$1] + var$2 | 0;
        var$1 = var$1 + 1 | 0;
    }
    var$5 = var$0.$long4;
    var$1 = var$3[var$5] / var$4 | 0;
    var$3[var$5] = 0;
    var$2 = var$5 + 1 | 0;
    var$0.$long4 = var$2;
    var$0.$long4 = var$2 % var$4 | 0;
    var$0.$m0 = var$1;
},
j_if = var$0 => {
    if (!var$0.$d)
        var$0.$d = 1;
},
j_goto = var$0 => {
    if (var$0.$d) {
        var$0.$d = 0;
        j_case0(var$0);
        var$0.$if10 = w_Browser_clock();
    }
},
j_for = var$0 => {
    var$0.$byte4 = 0;
    var$0.$d = 0;
},
j_try = var$0 => {
    let var$1, var$2, $$je;
    a: {
        b: {
            try {
                var$1 = jmr_RecordStore_openRecordStore($rt_s(36), 0);
                j_$callClinit();
                var$2 = j_i;
                jmr_RecordStore_setRecord(var$1, 1, var$2, 0, var$2.data.length);
                jmr_RecordStore_closeRecordStore(var$1);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    var$1 = $$je;
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        jl_Throwable_printStackTrace(var$1);
    }
},
j_byte = var$0 => {
    return var$0.$d;
},
j_paint = (var$0, var$1) => {
    let var$2;
    if (var$0.$byte4) {
        var$2 = var$0.$for8;
        if (var$2 === null)
            var$0.$a7(var$1);
        else {
            var$0.$a7(jml_Image_getGraphics(var$2));
            jml_Graphics_drawImage(var$1, var$0.$for8, 0, 0, 20);
        }
    } else {
        jml_Display_getDisplay(var$0.$goto1);
        jml_Graphics_setColor(var$1, 0, 0, 0);
        jml_Graphics_fillRect(var$1, 0, 0, 176, 144);
    }
},
j_keyPressed = (var$0, var$1) => {
    var$0.$a8(var$1, jml_Canvas_getGameAction(var$0, var$1));
},
j_keyReleased = (var$0, var$1) => {
    var$0.$if1(var$1, jml_Canvas_getGameAction(var$0, var$1));
},
j_hideNotify = var$0 => {
    if (var$0.$byte4 && !var$0.$d)
        j_if(var$0);
},
j_showNotify = var$0 => {
    if (var$0.$byte4 && var$0.$d)
        var$0.$goto();
},
j_int0 = var$0 => {
    let var$1, var$2, $$je;
    a: {
        b: {
            try {
                if (!j_byte(var$0)) {
                    var$1 = w_Browser_clock();
                    j_a2(var$0, Long_lo(Long_sub(var$1, var$0.$if10)));
                    var$0.$if10 = var$1;
                    var$0.$do(var$0.$m0, var$0.$void);
                    if (jml_Display_getCurrent(jml_Display_getDisplay(var$0.$goto1)) === var$0) {
                        jml_Canvas_repaint(var$0);
                        jml_Canvas_serviceRepaints(var$0);
                    }
                }
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    var$2 = $$je;
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        jl_Throwable_printStackTrace(var$2);
    }
},
j_case0 = var$0 => {
    let var$1, var$2;
    var$1 = var$0.$h2;
    j_$callClinit();
    if (var$1 != j_i.data[1]) {
        if (var$1 != 1)
            jml_Displayable_removeCommand(var$0, j_new);
        else
            jml_Displayable_removeCommand(var$0, j_l);
        if (j_i.data[1] != 1)
            jml_Displayable_addCommand(var$0, j_new);
        else
            jml_Displayable_addCommand(var$0, j_l);
        var$0.$h2 = j_i.data[1];
    }
    var$2 = var$0.$a30;
    if (var$2 != j_i.data[2]) {
        if (var$2 != 1)
            jml_Displayable_removeCommand(var$0, j_int);
        else
            jml_Displayable_removeCommand(var$0, j_f);
        if (j_i.data[2] != 1)
            jml_Displayable_addCommand(var$0, j_int);
        else
            jml_Displayable_addCommand(var$0, j_f);
        var$0.$a30 = j_i.data[2];
    }
    jml_Displayable_removeCommand(var$0, j_null);
    if (j_do)
        jml_Displayable_addCommand(var$0, j_null);
},
j_a = var$1 => {
    j_$callClinit();
    j_do = var$1;
},
j_char0 = var$0 => {
    return;
},
j__clinit_ = () => {
    j_i = $rt_createByteArrayFromData([1, 1, 1]);
    j_do = 0;
};
function b() {
    let a = this; j.call(a);
    a.$dw = null;
    a.$dB = 0;
    a.$dv = null;
    a.$dr = null;
    a.$dE = null;
    a.$du = null;
    a.$dH = 0;
    a.$dx = 0;
    a.$dF = null;
    a.$dz = null;
    a.$dq = 0;
    a.$dG = 0;
    a.$dt = null;
    a.$dC = 0;
    a.$ds = 0;
    a.$dD = null;
    a.$dA = 0;
    a.$dy = 0;
}
let b__init_0 = var$0 => {
    j__init_(var$0);
    var$0.$dB = 1;
    var$0.$dq = 1;
    var$0.$ds = 0;
},
b__init_ = () => {
    let var_0 = new b();
    b__init_0(var_0);
    return var_0;
},
b_a4 = (var$0, var$1) => {
    var$0.$dz = var$1;
},
b_a5 = (var$0, var$1) => {
    var$0.$dF = var$1;
},
b_q = var$0 => {
    let var$1;
    var$1 = var$0.$goto1;
    var$1.$else2 = var$0.$dC != 1 ? 0 : 1;
    var$1.$byte3 = 1;
    var$0.$dG = 1;
    var$0.$dC = 0;
},
b_commandAction = (var$0, var$1, var$2) => {
    let var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, $$je;
    jl_Object_monitorEnterSync(var$0);
    try {
        a: {
            j_$callClinit();
            if (var$1 === j_char) {
                var$0.$goto1.$for7 = 1;
                break a;
            }
            var$3 = var$0.$dr;
            if (var$2 === var$3 && var$1 === j_case) {
                var$1 = jml_Display_getDisplay(var$0.$goto1);
                var$2 = var$0.$dt;
                if (var$2 === var$0)
                    var$0.$ds = 0;
                jml_Display_setCurrent(var$1, var$2);
                var$0.$dt = null;
                while (true) {
                    var$1 = var$0.$dr.$items0;
                    if (var$1.$size0 <= 0)
                        break;
                    ju_ArrayList_remove(var$1, 0);
                    jml_Display_dirty = 1;
                }
                break a;
            }
            if (var$1 === j_g) {
                var$0.$dC = 1;
                b_q(var$0);
                break a;
            }
            if (var$1 === j_null) {
                var$0.$dC = 2;
                b_q(var$0);
                break a;
            }
            if (var$1 === j_j) {
                jml_Screen_setTitle(var$3, GameMIDlet_if(var$0.$goto1, 1));
                jml_Form_append(var$0.$dr, var$0.$dz);
                var$1 = jml_Display_getDisplay(var$0.$goto1);
                var$0.$dt = var$1.$current;
                jml_Display_setCurrent(var$1, var$0.$dr);
                break a;
            }
            if (var$1 === j_k) {
                b_a(var$0, (jml_Display_getDisplay(var$0.$goto1)).$current);
                break a;
            }
            if (var$1 === j_e) {
                jml_Screen_setTitle(var$3, GameMIDlet_if(var$0.$goto1, 11));
                jml_Form_append(var$0.$dr, $rt_s(37));
                var$1 = jml_Display_getDisplay(var$0.$goto1);
                var$0.$dt = var$1.$current;
                jml_Display_setCurrent(var$1, var$0.$dr);
                break a;
            }
            if (!(var$1 !== j_l && var$1 !== j_new)) {
                var$4 = j_i.data;
                var$4[1] = (var$4[1] + 1 | 0) << 24 >> 24;
                var$4[1] = (var$4[1] % 2 | 0) << 24 >> 24;
                j_case0(var$0);
                j_case0(var$0.$dF);
                c_a2(j_i.data[1] != 1 ? 0 : 1);
                j_try(var$0);
                break a;
            }
            if (!(var$1 !== j_f && var$1 !== j_int)) {
                var$4 = j_i.data;
                var$4[2] = (var$4[2] + 1 | 0) << 24 >> 24;
                var$4[2] = (var$4[2] % 2 | 0) << 24 >> 24;
                j_case0(var$0);
                j_case0(var$0.$dF);
                h_a1(j_i.data[2] != 1 ? 0 : 1);
                j_try(var$0);
                break a;
            }
            if (var$1 !== j_else)
                break a;
            b: {
                var$1 = var$0.$dw;
                if (var$1 !== null) {
                    var$5 = var$0.$dx;
                    var$2 = var$0.$dE.$value;
                    var$6 = var$0.$dH;
                    if (!(var$2 !== null && !jl_String_equals(var$2, $rt_s(33))))
                        var$2 = $rt_s(38);
                    c: {
                        var$7 = var$1.$new2;
                        var$8 = var$7 - 1 | 0;
                        if (var$1.$int6)
                            d: {
                                while (var$8 >= 0) {
                                    if (var$6 <= var$1.$if8.data[var$5].data[var$8])
                                        break d;
                                    var$8 = var$8 + (-1) | 0;
                                }
                                break c;
                            }
                        else
                            e: {
                                while (var$8 >= 0) {
                                    if (var$6 >= var$1.$if8.data[var$5].data[var$8])
                                        break e;
                                    var$8 = var$8 + (-1) | 0;
                                }
                                break c;
                            }
                    }
                    var$9 = var$8 + 1 | 0;
                    var$10 = var$7 - 2 | 0;
                    while (var$10 >= var$9) {
                        var$4 = var$1.$do4.data;
                        var$11 = var$4[var$5].data;
                        var$8 = var$10 + 1 | 0;
                        var$11[var$8] = var$4[var$5].data[var$10];
                        var$11 = var$1.$if8.data;
                        var$11[var$5].data[var$8] = var$11[var$5].data[var$10];
                        var$10 = var$10 + (-1) | 0;
                    }
                    if (var$9 < var$7) {
                        var$1.$do4.data[var$5].data[var$9] = var$2;
                        var$1.$if8.data[var$5].data[var$9] = var$6;
                    }
                    f: {
                        try {
                            k_if(var$0.$dw);
                            break b;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof jl_Exception) {
                                break f;
                            } else {
                                throw $$e;
                            }
                        }
                    }
                }
            }
            b_a(var$0, var$0);
        }
    } finally {
        jl_Object_monitorExitSync(var$0);
    }
},
b_a = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6;
    jml_Screen_setTitle(var$0.$dr, GameMIDlet_if(var$0.$goto1, 2));
    var$2 = $rt_s(33);
    if (var$0.$dw !== null) {
        var$3 = 0;
        while (var$3 < var$0.$dw.$new2) {
            var$4 = new jl_StringBuffer;
            jl_AbstractStringBuilder__init_(var$4);
            var$2 = jl_StringBuffer_append(jl_StringBuffer_append(var$4, var$2), $rt_s(33));
            var$5 = var$3 + 1 | 0;
            jl_AbstractStringBuilder_append(var$2, var$5);
            var$4 = jl_AbstractStringBuilder_toString(jl_StringBuffer_append(var$2, $rt_s(39)));
            var$2 = new jl_StringBuffer;
            jl_AbstractStringBuilder__init_(var$2);
            var$4 = jl_AbstractStringBuilder_toString(jl_StringBuffer_append(jl_StringBuffer_append(var$2, var$4), var$0.$dw.$do4.data[0].data[var$3]));
            var$2 = new jl_StringBuffer;
            jl_AbstractStringBuilder__init_(var$2);
            var$4 = jl_AbstractStringBuilder_toString(jl_StringBuffer_append(jl_StringBuffer_append(var$2, var$4), $rt_s(40)));
            var$2 = new jl_StringBuffer;
            jl_AbstractStringBuilder__init_(var$2);
            var$2 = jl_StringBuffer_append(var$2, var$4);
            var$4 = var$0.$dF;
            var$3 = k_a(var$0.$dw, 0, var$3);
            var$4 = var$4;
            var$6 = new jl_StringBuffer;
            jl_AbstractStringBuilder__init_(var$6);
            var$6 = jl_StringBuffer_append(var$6, $rt_s(33));
            jl_AbstractStringBuilder_append(var$6, var$3);
            var$6 = jl_StringBuffer_append(var$6, $rt_s(17));
            jl_AbstractStringBuilder_append(var$6, var$4.$dk);
            var$4 = jl_AbstractStringBuilder_toString(jl_StringBuffer_append(var$2, jl_AbstractStringBuilder_toString(var$6)));
            var$2 = new jl_StringBuffer;
            jl_AbstractStringBuilder__init_(var$2);
            var$2 = jl_AbstractStringBuilder_toString(jl_StringBuffer_append(jl_StringBuffer_append(var$2, var$4), $rt_s(12)));
            var$3 = var$5;
        }
    }
    jml_Form_append(var$0.$dr, var$2);
    var$0.$dt = var$1;
    jml_Display_setCurrent(jml_Display_getDisplay(var$0.$goto1), var$0.$dr);
},
b_a3 = (var$0, var$1) => {
    let var$2, var$3, var$4, $$je;
    j_a0(var$0, var$1);
    a: {
        b: {
            try {
                var$0.$dD = jml_Image_createImage($rt_s(41));
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        var$0.$dD = null;
    }
    var$2 = jml_Form__init_($rt_s(33));
    var$0.$dr = var$2;
    jml_Displayable_addCommand(var$2, j_case);
    var$0.$dr.$listener = var$0;
    var$1 = new jml_TextField;
    var$1.$label0 = GameMIDlet_if(var$0.$goto1, 8);
    var$1.$max0 = 8;
    jml_TextField_setString(var$1, $rt_s(33));
    var$0.$dE = var$1;
    var$1.$max0 = 8;
    var$3 = var$1.$value.$nativeString.length;
    var$4 = var$1.$max0;
    if (var$3 > var$4)
        var$1.$value = jl_String_substring(var$1.$value, 0, var$4);
    jml_Display_$callClinit();
    jml_Display_dirty = 1;
    var$1 = jml_Form__init_(GameMIDlet_if(var$0.$goto1, 7));
    var$0.$du = var$1;
    jml_Displayable_addCommand(var$1, j_else);
    var$1 = var$0.$du;
    var$1.$listener = var$0;
    var$2 = var$0.$dE;
    ju_ArrayList_add(var$1.$items0, var$2);
    jml_Display_dirty = 1;
},
b_a2 = (var$0, var$1) => {
    var$0.$dw = var$1;
},
b_long = var$0 => {
    let $$je;
    a: {
        b: {
            try {
                var$0.$dv = jml_Image_createImage($rt_s(42));
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
    }
    var$0.$dC = 0;
    var$0.$dG = 0;
    var$0.$dB = 1;
    j_long(var$0);
},
b_do = (var$0, var$1, var$2) => {
    let $$je;
    a: {
        b: {
            try {
                var$2 = var$0.$dy + var$1 | 0;
                var$0.$dy = var$2;
                if (var$2 > 20) {
                    var$0.$dy = 0;
                    var$0.$dA = var$0.$dA + 1 | 0;
                }
                var$2 = var$0.$ds + var$1 | 0;
                var$0.$ds = var$2;
                if (var$0.$dD !== null) {
                    var$0.$dB = 1;
                    if (var$2 >= 4000) {
                        var$0.$dD = null;
                        var$0.$ds = 0;
                    } else
                        return;
                }
                var$2 = var$0.$ds;
                if ((var$2 + var$1 | 0) >= 5000 && var$2 <= 5000)
                    j_char0(var$0);
                if (var$0.$dq) {
                    var$0.$dq = 0;
                    c_case0();
                }
                c: {
                    d: {
                        switch (var$0.$dC) {
                            case 1:
                            case 2:
                                break;
                            default:
                                break d;
                        }
                        break c;
                    }
                }
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
    }
},
b_a1 = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, var$7;
    if (var$0.$dB) {
        jml_Display_getDisplay(var$0.$goto1);
        jml_Graphics_setColor(var$1, 0, 0, 0);
        jml_Graphics_fillRect(var$1, 0, 0, 176, 144);
    }
    if (var$0.$dB) {
        var$0.$dB = 0;
        var$2 = var$0.$dv;
        if (var$2 !== null) {
            var$3 = var$0.$dD;
            if (var$3 === null) {
                var$4 = 0 + ((176 - jml_Image_getWidth(var$2) | 0) / 2 | 0) | 0;
                var$5 = 0 + ((144 - jml_Image_getHeight(var$0.$dv) | 0) / 2 | 0) | 0;
                jml_Graphics_drawImage(var$1, var$0.$dv, var$4, var$5, 20);
            } else {
                var$6 = var$0.$ds;
                if (var$6 >= 3000) {
                    jml_Display_getDisplay(var$0.$goto1);
                    jml_Graphics_setColor(var$1, 0, 0, 0);
                    jml_Graphics_fillRect(var$1, 0, 0, 176, 144);
                } else if (var$6 >= 1000) {
                    var$7 = (176 - jml_Image_getWidth(var$3) | 0) / 2 | 0;
                    var$6 = (144 - jml_Image_getHeight(var$0.$dD) | 0) / 2 | 0;
                    jml_Graphics_drawImage(var$1, var$0.$dD, 0 + var$7 | 0, 0 + var$6 | 0, 20);
                }
            }
        }
    }
},
b_a0 = (var$0, var$1, var$2) => {
    return;
},
b_showNotify = var$0 => {
    j_showNotify(var$0);
    var$0.$dB = 1;
},
b_for = var$0 => {
    let var$1;
    j_for(var$0);
    c_$callClinit();
    var$1 = c_do;
    if (var$1 !== null)
        cnms_Sound_stop(var$1);
    var$0.$ds = 100000;
    var$0.$dv = null;
    var$0.$dD = null;
},
g = $rt_classWithoutFields(),
g__init_0 = var$0 => {
    return;
},
g__init_ = () => {
    let var_0 = new g();
    g__init_0(var_0);
    return var_0;
},
g_case = var$0 => {
    return 8;
},
g_h = var$0 => {
    return 14;
},
g_byte = var$0 => {
    return 40;
},
g_for = var$0 => {
    return 26;
},
g_int = var$0 => {
    return 14;
},
g_l = var$0 => {
    return 14;
},
g_new = var$0 => {
    return 12;
},
g_char = var$0 => {
    return 4;
},
g_null = var$0 => {
    return 131;
},
g_long = var$0 => {
    return 144;
},
g_b = var$0 => {
    return 2;
},
g_j = var$0 => {
    return 158;
},
g_do = var$0 => {
    return 130;
},
g_i = var$0 => {
    return 176;
},
g_k = var$0 => {
    return 144;
},
g_goto = var$0 => {
    return 11;
},
g_f = var$0 => {
    return 11;
},
g_c = var$0 => {
    return 25;
},
g_e = var$0 => {
    return 25;
},
g_try = var$0 => {
    return 10;
},
g_g = var$0 => {
    return 161;
},
i = $rt_classWithoutFields(j),
i_hideNotify = var$0 => {
    let var$1;
    var$1 = !(var$0.$byte4 && !var$0.$d) ? 0 : 1;
    j_hideNotify(var$0);
};
function d() {
    let a = this; i.call(a);
    a.$dg = null;
    a.$ch0 = null;
    a.$bl = null;
    a.$bH = 0;
    a.$F = 0;
    a.$a90 = 0;
    a.$b5 = 0;
    a.$av = 0;
    a.$bg = null;
    a.$J = null;
    a.$Y = null;
    a.$bW = null;
    a.$b8 = 0;
    a.$c9 = 0;
    a.$L = null;
    a.$cd = null;
    a.$aU = null;
    a.$aE = null;
    a.$z = null;
    a.$bJ = null;
    a.$W = null;
    a.$al = null;
    a.$b1 = 0;
    a.$cf = 0;
    a.$cV = 0;
    a.$ae = 0;
    a.$cS = 0;
    a.$df = 0;
    a.$a70 = 0;
    a.$aN = 0;
    a.$aM = 0;
    a.$aK = 0;
    a.$bP = 0;
    a.$bO = 0;
    a.$dp = 0;
    a.$cm = 0;
    a.$ck = 0;
    a.$au = 0;
    a.$as = 0;
    a.$bu = 0;
    a.$aS = 0;
    a.$a50 = 0;
    a.$ak = 0;
    a.$aR = 0;
    a.$aQ = 0;
    a.$aF = 0;
    a.$aC = 0;
    a.$x = 0;
    a.$w = 0;
    a.$C = 0;
    a.$A = 0;
    a.$bK = null;
    a.$bI = null;
    a.$T = null;
    a.$bs = 0;
    a.$cH = 0;
    a.$R = 0;
    a.$cD = 0;
    a.$bh = 0;
    a.$bV = 0;
    a.$aH = null;
    a.$b2 = 0;
    a.$cX = 0;
    a.$bd = 0;
    a.$v = 0;
    a.$V = 0;
    a.$bz = 0;
    a.$be = 0;
    a.$cg = 0;
    a.$am = 0;
    a.$c5 = 0;
    a.$B = 0;
    a.$at = 0;
    a.$cL = 0;
    a.$da = null;
    a.$n0 = 0;
    a.$cR = 0;
    a.$cG = 0;
    a.$bR = 0;
    a.$cN = 0;
    a.$dl = 0;
    a.$di = 0;
    a.$bk = 0;
    a.$aW = 0;
    a.$aV = 0;
    a.$b4 = 0;
    a.$bv = 0;
    a.$cZ = 0;
    a.$bM = 0;
    a.$Z = 0;
    a.$ag = 0;
    a.$ct = 0;
    a.$dn = 0;
    a.$a60 = 0;
    a.$dk = 0;
    a.$ac = null;
    a.$c4 = 0;
    a.$bc = 0;
    a.$bZ = 0;
    a.$bY = 0;
    a.$dc = 0;
    a.$cy = null;
    a.$cT = null;
    a.$I = 0;
    a.$aT = 0;
    a.$ca = 0;
    a.$bN = null;
    a.$ce = 0;
    a.$de = 0;
    a.$dm = null;
    a.$bC = null;
    a.$aD = 0;
    a.$D = 0;
    a.$az = 0;
    a.$aJ = 0;
    a.$cl = null;
    a.$cj = null;
    a.$bS = 0;
    a.$aw = 0;
    a.$aa = 0;
    a.$c30 = 0;
    a.$bp = 0;
    a.$c2 = 0;
    a.$ax = 0;
    a.$ar = 0;
    a.$aq = 0;
    a.$db = 0;
    a.$c8 = 0;
    a.$ai = 0;
    a.$ah = 0;
    a.$a31 = 0;
    a.$a210 = 0;
    a.$U = 0;
    a.$Q = 0;
    a.$ad = 0;
    a.$bQ = null;
    a.$bt = 0;
    a.$br = 0;
    a.$aI = 0;
    a.$ba = 0;
    a.$cx = 0;
    a.$cw = 0;
    a.$s = 0;
    a.$X = 0;
    a.$bi = 0;
    a.$cY = null;
    a.$bX = 0;
    a.$N = null;
    a.$aj = null;
    a.$a80 = 0;
    a.$c00 = 0;
    a.$bL = 0;
    a.$bB = 0;
    a.$b30 = 0;
    a.$bU = 0;
    a.$co = 0;
    a.$b7 = 0;
    a.$ap = 0;
    a.$an = 0;
    a.$cQ = 0;
    a.$cc = 0;
    a.$cM = 0;
    a.$bE = 0;
    a.$bx = 0;
    a.$r = 0;
    a.$aO = null;
    a.$c6 = 0;
    a.$cK = 0;
    a.$aL = null;
    a.$aP = null;
    a.$bD = 0;
    a.$bq = 0;
    a.$cz = 0;
    a.$b00 = 0;
    a.$bw = 0;
    a.$bT = 0;
    a.$a110 = 0;
    a.$aX = 0;
    a.$cJ = 0;
    a.$cs = 0;
    a.$cP = 0;
    a.$bm = 0;
    a.$by = 0;
    a.$G = null;
    a.$bb = 0;
    a.$cu = 0;
    a.$aB = null;
    a.$aA = null;
    a.$ab = null;
    a.$cv = null;
    a.$cr = null;
    a.$cO = null;
    a.$S = null;
    a.$af = 0;
    a.$u = 0;
    a.$aZ = 0;
    a.$aY = 0;
    a.$cW = 0;
    a.$cU = 0;
    a.$b60 = 0;
    a.$a00 = 0;
    a.$p = 0;
    a.$bA = 0;
    a.$ay = 0;
    a.$cC = 0;
    a.$P = 0;
    a.$O = 0;
    a.$bG = null;
    a.$bF = null;
    a.$dj = 0;
    a.$bj = 0;
    a.$cB = 0;
    a.$ao = 0;
    a.$aG = 0;
    a.$cq = 0;
    a.$cp = 0;
    a.$y = null;
    a.$t = 0;
}
let d__init_0 = var$0 => {
    let var$1, var$2;
    j__init_(var$0);
    var$0.$b5 = 0;
    var$0.$cV = 0;
    var$0.$ae = 1;
    var$0.$cS = 2;
    var$0.$aN = 35;
    var$0.$aM = 12;
    var$0.$aK = 21;
    var$0.$bP = 6;
    var$0.$bO = 20;
    var$0.$dp = 7;
    var$0.$cm = 15;
    var$0.$ck = 22;
    var$0.$au = 1;
    var$0.$as = 1;
    var$0.$aF = (-1);
    var$0.$aC = (-1);
    var$0.$T = $rt_createIntArrayFromData([67, 64, 58, 48, 36, 23, 7, (-7), (-23), (-36), (-48), (-58), (-64), (-67)]);
    var$0.$R = 21;
    var$0.$v = (-1);
    var$0.$V = 0;
    var$0.$bz = 3;
    var$0.$be = 4;
    var$0.$cg = 5;
    var$0.$am = 7;
    var$0.$c5 = 6;
    var$0.$B = 10;
    var$0.$at = 11;
    var$0.$cL = 12;
    var$0.$cR = 0;
    var$0.$cG = 1;
    var$0.$bR = 2;
    var$0.$cN = 3;
    var$0.$dl = 4;
    var$0.$di = 5;
    var$0.$bk = 6;
    var$0.$bM = 0;
    var$0.$Z = 1;
    var$0.$ag = 2;
    var$0.$ct = 3;
    var$0.$dn = 4;
    var$0.$dk = 78;
    var$0.$ce = 3;
    var$0.$bS = 4;
    var$0.$aI = 16;
    var$0.$ba = 8;
    var$0.$N = $rt_createByteArrayFromData([0, 0, 22, 22, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22]);
    var$0.$r = 20;
    var$0.$cz = 0;
    var$0.$b00 = 0;
    var$0.$bw = 21;
    var$0.$bT = 22;
    var$0.$a110 = 23;
    var$0.$aX = 24;
    var$0.$cJ = 25;
    var$0.$cs = 21;
    var$0.$cP = 25;
    var$0.$bm = 5;
    var$0.$by = 4;
    var$1 = $rt_createByteArray(1);
    var$1.data[0] = 0;
    var$0.$G = var$1;
    var$0.$ay = 10;
    var$0.$t = 0;
    var$2 = new ju_Random;
    var$2.$seed = Long_and(Long_xor(jl_System_currentTimeMillis(), Long_create(3740067437, 5)), Long_create(4294967295, 65535));
    var$0.$aH = var$2;
},
d__init_ = () => {
    let var_0 = new d();
    d__init_0(var_0);
    return var_0;
},
d_a10 = (var$0, var$1) => {
    let var$2, var$3, var$4, $$je;
    j_a0(var$0, var$1);
    var$0.$dg = var$1;
    var$0.$cX = (-1);
    a: {
        b: {
            try {
                var$1 = jmr_RecordStore_openRecordStore($rt_s(22), 1);
                if (jmr_RecordStore_getNumRecords(var$1))
                    var$0.$G = jmr_RecordStore_getRecord(var$1, 1);
                else {
                    var$2 = var$0.$G;
                    jmr_RecordStore_addRecord(var$1, var$2, 0, var$2.data.length);
                }
                jmr_RecordStore_closeRecordStore(var$1);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    var$1 = $$je;
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        jl_Throwable_printStackTrace(var$1);
    }
    var$2 = $rt_createIntArray(15);
    var$3 = var$2.data;
    var$0.$aL = var$2;
    var$3[14] = 55;
    var$3[13] = 55;
    var$3[12] = 55;
    var$3[11] = 55;
    var$3[10] = 51;
    var$3[9] = 51;
    var$3[8] = 50;
    var$3[7] = 50;
    var$3[6] = 50;
    var$3[5] = 55;
    var$3[4] = 55;
    var$3[3] = 55;
    var$3[2] = 51;
    var$3[1] = 51;
    var$3[0] = 56;
    var$0.$aP = $rt_createIntArray(var$3.length);
    var$0.$bD = 0;
    var$0.$ac = jml_Image_createImage0(176, 144);
    var$0.$W = jml_Image_createImage($rt_s(43));
    var$0.$al = jml_Image_createImage($rt_s(44));
    var$0.$aS = 16;
    var$0.$ak = 6;
    var$1 = new a;
    var$1.$int5 = 1;
    var$1.$case4 = 1;
    var$0.$bg = var$1;
    var$1 = new f;
    var$1.$a32 = 0;
    var$1.$long5 = (-1);
    var$1.$c1 = 0;
    var$1.$b3 = 0;
    var$0.$J = var$1;
    var$0.$bE = 1;
    var$0.$bx = 2;
    var$1 = new e;
    var$4 = var$0.$goto1;
    var$1.$void0 = jml_Font_getFont(64, 0, 8);
    var$1.$new3 = null;
    var$1.$goto4 = var$4;
    var$1.$long1 = var$0;
    var$0.$aO = var$1;
    var$1.$e1 = 176;
    var$1.$char3 = 144;
    var$1.$b9 = var$0.$cf;
},
d_a4 = (var$0, var$1, var$2) => {
    let var$3, var$4, var$5, var$6, var$7, var$8, var$9;
    var$3 = var$0.$cX;
    if (var$3 != 20) {
        if (var$3 == 12 && !(var$1 != 53 && var$2 != 8)) {
            if (var$0.$b2 < 7000)
                var$0.$b2 = 7000;
            else {
                var$0.$av = 0;
                var$0.$b5 = 1;
            }
            return;
        }
        var$4 = var$0.$aP.data;
        var$5 = var$0.$bD;
        var$4[var$5] = var$1;
        var$6 = var$0.$aL.data;
        var$7 = var$6.length - 1 | 0;
        var$8 = var$5;
        while (var$7 >= 0 && var$4[var$8] == var$6[var$7]) {
            var$9 = var$4.length;
            var$8 = ((var$8 + var$9 | 0) - 1 | 0) % var$9 | 0;
            var$7 = var$7 + (-1) | 0;
        }
        var$9 = var$5 + 1 | 0;
        var$0.$bD = var$9;
        var$0.$bD = var$9 % var$4.length | 0;
        if (var$7 == (-1)) {
            var$0.$G.data[0] = 1;
            var$0.$bq = 2000;
        }
        if (var$3 >= 21 && var$3 <= 25)
            d_int(var$0, var$1, var$2);
        if (var$1 == 51) {
            var$0.$bY = (-1);
            var$0.$bZ = 2;
        } else if (!(var$1 != 54 && var$2 != 5))
            var$0.$bZ = 2;
        else if (var$1 == 49) {
            var$0.$bY = (-1);
            var$0.$bZ = (-2);
        } else if (!(var$1 != 52 && var$2 != 2))
            var$0.$bZ = (-2);
        else if (!(var$1 != 50 && var$2 != 1))
            var$0.$bY = (-1);
        else if (!(var$1 != 56 && var$2 != 6) && var$0.$X != (-1))
            var$0.$s = 1;
        return;
    }
    if (!(var$1 != 53 && var$2 != 8))
        var$0.$c6 = 1;
},
d_if2 = (var$0, var$1, var$2) => {
    var$0.$bZ = 0;
    var$0.$bY = 0;
},
d_long = var$0 => {
    let var$1, var$2;
    var$0.$cX = (-1);
    var$0.$b5 = 0;
    var$0.$av = 1;
    var$0.$a60 = 0;
    var$0.$cK = 10000;
    if (var$0.$G.data[0] != 1) {
        d_e(var$0);
        var$0.$c6 = 0;
        e_a0(var$0.$aO, $rt_s(45));
        d_for(var$0, (-1));
    } else {
        var$1 = new jml_List;
        var$2 = GameMIDlet_a(15);
        jml_List_$callClinit();
        jml_Displayable__init_(var$1);
        var$1.$items = ju_ArrayList__init_();
        var$1.$selected = (-1);
        var$1.$title = var$2;
        var$0.$y = var$1;
        jml_List_append(var$1, GameMIDlet_a(13), null);
        jml_List_append(var$0.$y, GameMIDlet_a(14), null);
        var$1 = var$0.$y;
        j_$callClinit();
        jml_Displayable_addCommand(var$1, j_case);
        var$0.$y.$listener = var$0;
        var$0.$cX = 21;
    }
    j_long(var$0);
},
d_e = var$0 => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, $$je;
    var$0.$b2 = 0;
    var$0.$de = 0;
    var$0.$X = (-1);
    var$0.$bi = 0;
    var$0.$s = 0;
    var$0.$bc = 3;
    var$0.$aT = (-1);
    var$0.$c00 = 0;
    var$0.$dc = 0;
    var$0.$bN = $rt_createShortArray(6);
    var$0.$dm = $rt_createByteArray(3);
    var$0.$bC = $rt_createByteArray(3);
    var$0.$aD = (-1);
    var$0.$bl = $rt_createIntArray(80);
    a: {
        b: {
            try {
                if (var$0.$bJ === null)
                    var$0.$bJ = jml_Image_createImage($rt_s(46));
                var$0.$b1 = g_int(var$0.$dg);
                var$1 = g_l(var$0.$dg);
                var$0.$cf = var$1;
                var$2 = var$0.$cw ? 0 : 1;
                c: {
                    var$3 = (16 * var$0.$b1 | 0) / 8 | 0;
                    var$0.$cx = var$3;
                    var$1 = (16 * var$1 | 0) / 8 | 0;
                    var$0.$cw = var$1;
                    if (var$2) {
                        var$2 = 0;
                        while (true) {
                            var$4 = var$0.$T.data;
                            if (var$2 >= var$4.length)
                                break c;
                            var$4[var$2] = $rt_imul(var$4[var$2], var$1) >> 4;
                            var$2 = var$2 + 1 | 0;
                        }
                    }
                }
                var$0.$cD = ((1 * var$3 | 0) * 90 | 0) / 100 | 0;
                var$0.$bh = ((2 * var$3 | 0) * 90 | 0) / 100 | 0;
                var$0.$bV = 2 * var$1 | 0;
                var$0.$aJ = (var$1 * 240 | 0) / 100 | 0;
                var$0.$aE = jml_Image_createImage($rt_s(47));
                var$0.$z = jml_Image_createImage($rt_s(48));
                var$0.$bW = jml_Image_createImage($rt_s(49));
                var$0.$Y = jml_Image_createImage($rt_s(50));
                var$0.$cd = jml_Image_createImage($rt_s(51));
                var$0.$aU = jml_Image_createImage($rt_s(52));
                var$0.$L = jml_Image_createImage($rt_s(53));
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
    }
    var$0.$b8 = jml_Image_getWidth(var$0.$L) / 5 | 0;
    var$0.$c9 = jml_Image_getHeight(var$0.$L);
    var$0.$a50 = jml_Image_getHeight(var$0.$aU);
    var$0.$D = ((jml_Image_getWidth(var$0.$aU) / 6 | 0) - (jml_Image_getWidth(var$0.$bW) / 2 | 0) | 0) / 2 | 0;
    var$0.$az = ((jml_Image_getHeight(var$0.$aU) / 8 | 0) - (jml_Image_getHeight(var$0.$bW) / 2 | 0) | 0) / 2 | 0;
    var$0.$c2 = 0;
    var$0.$n0 = 0;
    var$0.$F = 0;
    var$0.$a90 = 0;
    var$0.$c4 = 60000;
    var$4 = $rt_createIntArray(4);
    var$5 = var$4.data;
    var$0.$cl = var$4;
    var$0.$cj = $rt_createIntArray(4);
    var$1 = 0;
    while (var$1 < 4) {
        var$5[var$1] = (-1);
        var$1 = var$1 + 1 | 0;
    }
    var$0.$bH = 0;
    var$1 = 0;
    while (true) {
        var$4 = var$0.$bl.data;
        if (var$1 >= var$4.length)
            break;
        var$4[var$1] = (-1);
        var$1 = var$1 + 1 | 0;
    }
    var$6 = null;
    d: {
        e: {
            f: {
                try {
                    var$7 = var$6;
                    var$8 = new ji_DataInputStream;
                    var$6 = var$8;
                    var$7 = var$8;
                    ji_DataInputStream__init_0(var$8, w_Resources_open(jl_Object_getClass(var$0), $rt_s(54)));
                    var$4 = $rt_createByteArray(ji_DataInputStream_readByte(var$8));
                    var$1 = 0;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_Exception) {
                        var$8 = $$je;
                        break f;
                    } else{
                        var$6 = $$je;
                        break e;
                    }
                }
                var$5 = var$4.data;
                var$2 = var$5.length;
                while (true) {
                    try {
                        var$7 = var$8;
                        var$6 = var$8;
                        if (var$1 >= var$2)
                            break;
                        var$7 = var$8;
                        var$6 = var$8;
                        var$5[var$1] = ji_DataInputStream_readByte(var$8);
                        var$1 = var$1 + 1 | 0;
                        continue;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_Exception) {
                            var$8 = $$je;
                            break f;
                        } else{
                            var$6 = $$je;
                            break e;
                        }
                    }
                }
                try {
                    var$7 = var$8;
                    var$6 = var$8;
                    var$0.$aw = ji_DataInputStream_readByte(var$8) << 16 >> 16;
                    var$1 = ji_DataInputStream_readByte(var$8);
                    var$2 = 0;
                    while (true) {
                        var$7 = var$8;
                        var$6 = var$8;
                        if (var$2 >= var$1)
                            break;
                        var$7 = var$8;
                        var$6 = var$8;
                        var$3 = var$0.$aa << 10;
                        var$0.$aa = var$3;
                        var$0.$aa = var$3 | ji_DataInputStream_readByte(var$8);
                        var$2 = var$2 + 1 | 0;
                    }
                    var$7 = var$8;
                    var$6 = var$8;
                    var$0.$db = ($rt_imul(ji_DataInputStream_readShort(var$8), var$0.$cx) / 16 | 0) << 16 >> 16;
                    var$0.$c8 = ($rt_imul(ji_DataInputStream_readShort(var$8), var$0.$cw) / 16 | 0) << 16 >> 16;
                    var$0.$c30 = ji_DataInputStream_readByte(var$8) << 16 >> 16;
                    var$1 = ji_DataInputStream_readByte(var$8);
                    var$2 = 0;
                    while (true) {
                        var$7 = var$8;
                        var$6 = var$8;
                        if (var$2 >= var$1)
                            break;
                        var$7 = var$8;
                        var$6 = var$8;
                        var$3 = var$0.$bp << 10;
                        var$0.$bp = var$3;
                        var$0.$bp = var$3 | ji_DataInputStream_readByte(var$8);
                        var$2 = var$2 + 1 | 0;
                    }
                    var$7 = var$8;
                    var$6 = var$8;
                    var$0.$ai = ($rt_imul(ji_DataInputStream_readShort(var$8), var$0.$cx) / 16 | 0) << 16 >> 16;
                    var$0.$ah = ($rt_imul(ji_DataInputStream_readShort(var$8), var$0.$cw) / 16 | 0) << 16 >> 16;
                    var$0.$x = $rt_imul(ji_DataInputStream_readShort(var$8), var$0.$cx) << 16 >> 16;
                    var$1 = $rt_imul(ji_DataInputStream_readShort(var$8), var$0.$cw) << 16 >> 16;
                    var$0.$w = var$1;
                    var$0.$aW = var$0.$x;
                    var$0.$aV = var$1 + ((10 * var$0.$cf | 0) * 16 | 0) | 0;
                    var$0.$b4 = 0;
                    var$0.$C = $rt_imul(ji_DataInputStream_readShort(var$8), var$0.$cx) << 16 >> 16;
                    var$0.$A = $rt_imul(ji_DataInputStream_readShort(var$8), var$0.$cw) << 16 >> 16;
                    var$1 = ji_DataInputStream_readByte(var$8);
                    var$0.$bK = $rt_createShortArray(var$1);
                    var$0.$bI = $rt_createShortArray(var$1);
                    var$2 = 0;
                    while (true) {
                        var$7 = var$8;
                        var$6 = var$8;
                        if (var$2 >= var$1)
                            break;
                        var$7 = var$8;
                        var$6 = var$8;
                        var$0.$bK.data[var$2] = $rt_imul(ji_DataInputStream_readShort(var$8), var$0.$cx) << 16 >> 16;
                        var$0.$bI.data[var$2] = $rt_imul(ji_DataInputStream_readShort(var$8), var$0.$cw) << 16 >> 16;
                        var$2 = var$2 + 1 | 0;
                    }
                    var$7 = var$8;
                    var$6 = var$8;
                    var$0.$Q = ji_DataInputStream_readShort(var$8);
                    var$0.$ad = ji_DataInputStream_readShort(var$8);
                    var$0.$bQ = $rt_createShortArray(var$1);
                    var$2 = 0;
                    while (true) {
                        var$7 = var$8;
                        var$6 = var$8;
                        if (var$2 >= var$1)
                            break;
                        var$7 = var$8;
                        var$6 = var$8;
                        var$0.$bQ.data[var$2] = ji_DataInputStream_readShort(var$8);
                        var$2 = var$2 + 1 | 0;
                    }
                    var$7 = var$8;
                    var$6 = var$8;
                    var$0.$ch0 = $rt_createShortArray(ji_DataInputStream_readByte(var$8));
                    var$1 = 0;
                    while (true) {
                        var$7 = var$8;
                        var$6 = var$8;
                        var$5 = var$0.$ch0.data;
                        if (var$1 >= var$5.length)
                            break;
                        var$7 = var$8;
                        var$6 = var$8;
                        var$5[var$1] = ji_DataInputStream_readShort(var$8);
                        var$1 = var$1 + 1 | 0;
                    }
                    var$7 = var$8;
                    var$6 = var$8;
                    var$0.$dk = ji_DataInputStream_readByte(var$8) << 16 >> 16;
                    var$0.$a31 = ($rt_imul(ji_DataInputStream_readShort(var$8), var$0.$cx) / 16 | 0) << 16 >> 16;
                    var$0.$a210 = ($rt_imul(ji_DataInputStream_readShort(var$8), var$0.$cw) / 16 | 0) << 16 >> 16;
                    d_a7(var$0, var$8);
                    d_if1(var$0, var$4);
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_Exception) {
                        var$8 = $$je;
                        break f;
                    } else{
                        var$6 = $$je;
                        break e;
                    }
                }
                g: {
                    h: {
                        try {
                            ji_FilterInputStream_close(var$8);
                            break g;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof jl_Exception) {
                                break h;
                            } else {
                                throw $$e;
                            }
                        }
                    }
                }
                try {
                    var$7 = var$8;
                    break d;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$6 = $$je;
                    break e;

                }
            }
            try {
                var$7 = var$6;
                jl_Throwable_printStackTrace(var$8);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$6 = $$je;
                break e;

            }
            i: {
                j: {
                    k: {
                        try {
                            if (var$6 === null)
                                break k;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            var$6 = $$je;
                            break e;

                        }
                        try {
                            ji_FilterInputStream_close(var$6);
                            break k;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof jl_Exception) {
                                break j;
                            } else {
                                throw $$e;
                            }
                        }
                    }
                    break i;
                }
            }
            try {
                var$7 = var$6;
                break d;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$6 = $$je;
                break e;

            }
        }
        l: {
            m: {
                try {
                    if (var$7 !== null)
                        ji_FilterInputStream_close(var$7);
                    break l;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_Exception) {
                        break m;
                    } else {
                        throw $$e;
                    }
                }
            }
        }
        $rt_throw(var$6);
    }
    var$0.$aF = (-1);
    var$0.$aC = (-1);
    d_for(var$0, 0);
    var$1 = (var$0.$an + g_k(var$0.$dg) | 0) + var$0.$cf | 0;
    d_new(var$0, var$0.$an, var$1);
    var$0.$bu = 40;
},
d_if1 = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14;
    var$2 = ju_Vector__init_();
    var$3 = ju_Vector__init_();
    var$4 = ju_Vector__init_();
    var$5 = var$0.$bg;
    var$6 = var$5.$long2;
    var$7 = var$5.$if7;
    var$8 = var$5.$char2;
    var$9 = 0;
    var$0.$dk = 0;
    var$10 = 0;
    while (var$10 < var$8) {
        var$11 = 0;
        while (var$11 < var$7) {
            var$12 = var$6.data;
            if (var$12[var$9] == 13) {
                ju_Vector_addElement(var$4, jl_Integer__init_(var$11));
                ju_Vector_addElement(var$4, jl_Integer__init_(var$10));
                var$13 = 0;
                while (true) {
                    var$14 = $rt_compare(var$11, var$7);
                    if (var$14 >= 0)
                        break;
                    if (var$12[var$9] != 13)
                        break;
                    var$12[var$9] = 0;
                    var$13 = var$13 + 1 | 0;
                    var$9 = var$9 + 1 | 0;
                    var$11 = var$11 + 1 | 0;
                }
                if (!var$14)
                    var$9 = var$9 + (-1) | 0;
                ju_Vector_addElement(var$4, jl_Integer__init_(var$13));
            } else if (var$12[var$9] == 16) {
                var$0.$bt = var$11 << 16 >> 16;
                var$0.$br = var$10 << 16 >> 16;
            } else if (var$12[var$9] == 15) {
                var$5 = jl_Integer__init_(var$9);
                ju_Vector_addElement(var$3, var$5);
                ju_Vector_addElement(var$2, var$5);
            } else if (var$12[var$9] == 6) {
                var$0.$dk = (var$0.$dk + 1 | 0) << 16 >> 16;
                ju_Vector_addElement(var$2, jl_Integer__init_(var$9));
            } else if (var$12[var$9] == 12)
                a_a(var$0.$bg, var$11 + 1 | 0, var$10, 21);
            var$11 = var$11 + 1 | 0;
            var$9 = var$9 + 1 | 0;
        }
        var$10 = var$10 + 1 | 0;
    }
    var$0.$cY = $rt_createShortArray(ju_Vector_size(var$3));
    var$8 = 0;
    while (var$8 < ju_Vector_size(var$3)) {
        var$0.$cY.data[var$8] = jl_Number_shortValue(ju_Vector_elementAt(var$3, var$8));
        var$8 = var$8 + 1 | 0;
    }
    var$0.$aj = $rt_createShortArray(ju_Vector_size(var$2) * 3 | 0);
    var$8 = 0;
    while (var$8 < ju_Vector_size(var$2)) {
        var$10 = (ju_Vector_elementAt(var$2, var$8)).$value1;
        var$6 = var$0.$aj.data;
        var$7 = var$8 * 3 | 0;
        var$9 = var$0.$bg.$if7;
        var$6[var$7] = (var$10 % var$9 | 0) << 16 >> 16;
        var$6[var$7 + 1 | 0] = (var$10 / var$9 | 0) << 16 >> 16;
        var$6[var$7 + 2 | 0] = (-1);
        var$8 = var$8 + 1 | 0;
    }
    var$1 = var$1.data;
    var$0.$a80 = 0;
    var$8 = var$1.length;
    var$0.$cy = $rt_createShortMultiArray([4, var$8]);
    var$0.$cT = $rt_createShortArray(var$8);
    var$7 = 0;
    while (var$7 < var$8) {
        var$13 = var$7 * 3 | 0;
        var$9 = jl_Number_shortValue(ju_Vector_elementAt(var$4, var$13));
        var$10 = jl_Number_shortValue(ju_Vector_elementAt(var$4, var$13 + 1 | 0));
        var$13 = jl_Number_shortValue(ju_Vector_elementAt(var$4, var$13 + 2 | 0));
        var$9 = (var$9 * 8 | 0) << 16 >> 16;
        var$10 = (var$10 * 8 | 0) << 16 >> 16;
        var$11 = (var$1[var$7] & 255) << 16 >> 16;
        var$9 = ($rt_imul(var$9, var$0.$cx) / 16 | 0) << 16 >> 16;
        var$14 = ($rt_imul(var$10, var$0.$cw) / 16 | 0) << 16 >> 16;
        if (!var$13)
            var$13 = var$0.$bg.$if7 << 16 >> 16;
        var$12 = var$0.$cy.data;
        var$12[var$7].data[0] = var$9;
        var$12[var$7].data[1] = var$14;
        var$12[var$7].data[2] = var$13;
        var$12[var$7].data[3] = var$11;
        var$0.$cT.data[var$7] = var$9;
        var$7 = var$7 + 1 | 0;
    }
},
d_new = (var$0, var$1, var$2) => {
    let var$3, var$4, var$5, var$6;
    a: {
        var$3 = var$0.$aj.data;
        var$4 = var$0.$a80 + 1 | 0;
        var$5 = var$3[var$4];
        var$6 = var$0.$cf;
        if ($rt_imul(var$5, var$6) < var$1)
            b: {
                while (true) {
                    var$5 = var$0.$a80;
                    if (var$5 >= (var$3.length - 3 | 0))
                        break;
                    if ($rt_imul(var$3[var$5 + 1 | 0], var$6) >= var$1)
                        break b;
                    var$0.$a80 = var$5 + 3 | 0;
                }
                break a;
            }
        else if ($rt_imul(var$3[var$4], var$6) > var$1)
            while (true) {
                var$4 = var$0.$a80;
                if (var$4 <= 0)
                    break a;
                if ($rt_imul(var$3[var$4 + 1 | 0], var$6) < var$1)
                    break;
                var$0.$a80 = var$4 - 3 | 0;
            }
    }
    var$3 = var$0.$cy.data;
    var$4 = var$0.$dc;
    if (var$1 > var$3[var$4].data[1]) {
        c: {
            while (true) {
                var$5 = var$3.length;
                if (var$4 >= var$5)
                    break c;
                if (var$3[var$4].data[1] >= var$1)
                    break;
                var$4 = var$4 + 1 | 0;
            }
            var$0.$dc = var$4;
        }
        var$4 = var$0.$dc;
        var$6 = var$4;
        d: {
            e: {
                while (true) {
                    if (var$6 >= var$5)
                        break e;
                    if (var$3[var$6].data[1] >= var$2)
                        break;
                    var$6 = var$6 + 1 | 0;
                }
                break d;
            }
            var$6 = (-1);
        }
        if (var$6 != (-1))
            var$5 = var$6;
        var$0.$I = var$5 - var$4 | 0;
    } else {
        var$5 = var$3.length;
        if (var$4 < var$5) {
            f: {
                while (true) {
                    if (var$4 < 0)
                        break f;
                    if (var$3[var$4].data[1] < var$1)
                        break;
                    if (!var$4)
                        break;
                    var$4 = var$4 + (-1) | 0;
                }
                var$0.$dc = var$4;
            }
            var$4 = var$0.$dc;
            var$6 = var$4;
            g: {
                h: {
                    while (true) {
                        if (var$6 >= var$5)
                            break h;
                        if (var$3[var$6].data[1] >= var$2)
                            break;
                        var$6 = var$6 + 1 | 0;
                    }
                    break g;
                }
                var$6 = (-1);
            }
            if (var$6 != (-1))
                var$5 = var$6;
            var$0.$I = var$5 - var$4 | 0;
        }
    }
},
d_goto = var$0 => {
    j_goto(var$0);
    var$0.$b00 = 1;
},
d_for1 = var$0 => {
    let var$1;
    j_for(var$0);
    var$0.$cX = (-1);
    var$0.$bb = 0;
    var$0.$cu = 0;
    var$0.$aB = null;
    var$0.$aA = null;
    var$0.$ab = null;
    var$0.$cr = null;
    var$0.$cv = null;
    var$0.$bF = null;
    var$0.$Y = null;
    var$0.$cd = null;
    var$0.$aU = null;
    var$0.$L = null;
    var$0.$cO = null;
    var$0.$J.$new5 = null;
    var$1 = var$0.$bg;
    var$1.$long2 = null;
    var$1.$for5 = null;
    e_a1(var$0.$aO);
    var$0.$bN = null;
    var$0.$dm = null;
    var$0.$bC = null;
    var$0.$bl = null;
    var$0.$cl = null;
    var$0.$cj = null;
    var$0.$da = null;
    var$0.$aE = null;
    var$0.$z = null;
    var$0.$bW = null;
    var$0.$Y = null;
    var$0.$cd = null;
    var$0.$aU = null;
    var$0.$L = null;
    var$0.$bK = null;
    var$0.$bI = null;
    var$0.$ch0 = null;
    var$0.$bQ = null;
    var$0.$cY = null;
    var$0.$cy = null;
    var$0.$cT = null;
    var$0.$aj = null;
},
d_byte = (var$0, var$1, var$2) => {
    let var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14, var$15, var$16, var$17, var$18;
    if (var$0.$s) {
        a: {
            var$0.$bi = 0;
            if (var$0.$df != 1) {
                var$3 = var$0.$X;
                if (var$3 == 65535) {
                    d_for0(var$0, jml_Image_getGraphics(var$0.$ac));
                    var$0.$ca = 0;
                    var$0.$bd = 6;
                    var$0.$cX = 11;
                    var$0.$a70 = 1;
                    var$0.$X = (-1);
                } else {
                    var$4 = 0;
                    while (true) {
                        var$5 = var$0.$cY.data;
                        if (var$4 >= var$5.length)
                            break a;
                        if (var$3 == var$5[var$4])
                            break;
                        var$4 = var$4 + 1 | 0;
                    }
                    d_for0(var$0, jml_Image_getGraphics(var$0.$ac));
                    var$0.$ca = 0;
                    var$0.$bd = var$0.$cX;
                    var$0.$cX = 11;
                    var$0.$a70 = (2 + var$4 | 0) << 24 >> 24;
                    var$0.$X = (-1);
                }
            } else {
                d_for0(var$0, jml_Image_getGraphics(var$0.$ac));
                var$0.$ca = 0;
                var$0.$bd = var$0.$cX;
                var$0.$cX = 11;
                var$0.$a70 = 0;
            }
        }
        var$0.$s = 0;
    }
    var$4 = var$0.$ca + 1 | 0;
    var$0.$ca = var$4;
    if (var$0.$c2 == 2 && !var$0.$df && !(var$4 % 35 | 0))
        d_try(var$0, (-1), var$0.$an);
    b: {
        var$6 = 0;
        var$7 = 0;
        var$4 = var$0.$cX;
        if (var$4 != 20 && var$4 != 12) {
            var$3 = var$0.$n0;
            if (!(var$3 && var$3 != 1 && var$3 != 2)) {
                var$3 = var$0.$bY;
                if (var$3 < 0 && var$0.$bZ < 0) {
                    var$0.$n0 = 3;
                    var$0.$bs = 0;
                    var$0.$cH = 1;
                    var$0.$cz = 1;
                } else if (var$3 < 0 && var$0.$bZ > 0) {
                    var$0.$n0 = 5;
                    var$0.$bs = 0;
                    var$0.$cH = 3;
                    var$0.$cz = 1;
                } else if (var$3 < 0) {
                    var$0.$n0 = 4;
                    var$0.$bs = 0;
                } else {
                    var$3 = var$0.$bZ;
                    if (var$3 < 0)
                        var$0.$n0 = 1;
                    else if (var$3 > 0)
                        var$0.$n0 = 2;
                }
            }
            var$3 = var$0.$bZ;
            if (!var$3) {
                var$4 = var$0.$n0;
                if (!(var$4 != 1 && var$4 != 2))
                    var$0.$n0 = 0;
            }
            c: {
                d: {
                    e: {
                        f: {
                            g: {
                                h: {
                                    i: {
                                        var$6 = 0;
                                        var$7 = 2;
                                        switch (var$0.$n0) {
                                            case 0:
                                                break i;
                                            case 1:
                                                break g;
                                            case 2:
                                                break f;
                                            case 3:
                                                break e;
                                            case 4:
                                                break c;
                                            case 5:
                                                break d;
                                            case 6:
                                                break;
                                            default:
                                                break h;
                                        }
                                        if (var$3 < 0) {
                                            var$0.$cH = 1;
                                            var$6 =  -var$0.$cD | 0;
                                        } else if (var$3 > 0) {
                                            var$0.$cH = 3;
                                            var$6 = var$0.$cD;
                                        }
                                        var$7 = var$7 + var$0.$bV | 0;
                                        break b;
                                    }
                                    if (var$0.$cH < 2) {
                                        var$0.$cH = 0;
                                        break b;
                                    }
                                    var$0.$cH = 2;
                                    break b;
                                }
                                break b;
                            }
                            var$0.$cH = (var$0.$ca / 3 | 0) % 2 | 0;
                            var$6 = var$6 - var$0.$bh | 0;
                            break b;
                        }
                        var$0.$cH = 2 + ((var$0.$ca / 3 | 0) % 2 | 0) | 0;
                        var$6 = var$6 + var$0.$bh | 0;
                        break b;
                    }
                    var$5 = var$0.$T.data;
                    var$4 = var$0.$bs;
                    var$7 =  -var$5[var$4] | 0;
                    if (!(var$3 < 0 && !var$0.$bY)) {
                        if (var$3 > 0 && !var$0.$bY) {
                            var$6 = var$0.$cD;
                            var$0.$cz = 0;
                            var$0.$cH = 3;
                        } else if (var$0.$cz)
                            var$6 = var$6 - var$0.$bh | 0;
                    } else {
                        var$6 =  -var$0.$cD | 0;
                        var$0.$cz = 0;
                        var$0.$cH = 1;
                    }
                    var$3 = var$4 + 1 | 0;
                    var$0.$bs = var$3;
                    if (var$3 != var$5.length)
                        break b;
                    var$0.$bs = 0;
                    var$0.$n0 = 0;
                    break b;
                }
                var$5 = var$0.$T.data;
                var$4 = var$0.$bs;
                var$7 =  -var$5[var$4] | 0;
                if (var$0.$cz)
                    var$6 = var$6 + var$0.$bh | 0;
                if (var$3 < 0 && !var$0.$bY) {
                    var$6 =  -var$0.$bh | 0;
                    var$0.$cz = 0;
                    var$0.$cH = 1;
                } else if (var$3 > 0 && !var$0.$bY) {
                    var$6 = var$0.$bh;
                    var$0.$cz = 0;
                    var$0.$cH = 3;
                }
                var$3 = var$4 + 1 | 0;
                var$0.$bs = var$3;
                if (var$3 != var$5.length)
                    break b;
                var$0.$bs = 0;
                var$0.$n0 = 0;
                break b;
            }
            if (var$3 < 0) {
                var$0.$cH = 1;
                var$6 =  -var$0.$bh | 0;
            } else if (var$3 > 0) {
                var$0.$cH = 3;
                var$6 = var$0.$bh;
            }
            var$5 = var$0.$T.data;
            var$3 = var$0.$bs;
            var$7 =  -var$5[var$3] | 0;
            var$3 = var$3 + 1 | 0;
            var$0.$bs = var$3;
            if (var$3 == var$5.length) {
                var$0.$bs = 0;
                var$0.$n0 = 0;
            }
        }
    }
    var$4 = 0;
    var$3 = var$0.$aT;
    if (var$3 != (-1))
        var$4 = var$0.$cT.data[var$3];
    d_n(var$0);
    var$3 = var$0.$aT;
    if (var$3 != (-1)) {
        if (var$7 > 0)
            var$7 = 0;
        var$6 = var$6 + ((var$0.$cT.data[var$3] - var$4 | 0) << 4) | 0;
    }
    var$4 = var$0.$cX;
    if (var$4 == 20 && var$4 == 12)
        return;
    var$8 = var$0.$aR;
    var$4 = var$8 >> 4;
    var$9 = var$0.$aQ;
    var$3 = var$9 >> 4;
    var$10 = var$0.$aS;
    var$11 = var$4 + (var$10 / 2 | 0) | 0;
    var$12 = var$0.$ak;
    var$13 = var$11 - var$12 | 0;
    var$11 = var$11 + var$12 | 0;
    var$12 = 0;
    var$14 = (70 * var$10 | 0) / 200 | 0;
    var$15 = var$0.$J;
    var$16 = var$8 + var$14 | 0;
    var$8 = var$0.$a50 << 4;
    if (f_a(var$15, var$16, var$9 - var$8 | 0, (var$10 - var$14 | 0) << 4, var$8, var$6, var$7)) {
        var$12 = 1;
        var$6 = f_int(var$0.$J);
        var$7 = f_if(var$0.$J);
    }
    j: {
        var$8 = var$0.$aT;
        var$9 = $rt_compare(var$8, (-1));
        if (!var$9 && var$7 > 0) {
            var$14 = var$3 + 1 | 0;
            var$8 = var$0.$dc;
            var$9 = var$13 << 4;
            var$10 = var$11 << 4;
            var$14 = var$14 << 4;
            k: {
                while (var$8 < (var$0.$dc + var$0.$I | 0)) {
                    if (var$12)
                        break k;
                    var$5 = var$0.$cy.data;
                    if (!(var$5[var$8].data[3] & 1)) {
                        var$3 = var$0.$cT.data[var$8];
                        var$13 = var$5[var$8].data[1];
                        var$3 = d_a3(var$0, var$9, var$10, var$14, var$7, var$3 << 4, (var$3 + $rt_imul(var$0.$b1, var$5[var$8].data[2]) | 0) << 4, var$13 << 4);
                        if (var$3 < var$7) {
                            var$12 = 1;
                            var$0.$aT = var$8;
                            var$13 = var$0.$c2;
                            if (!var$13 && var$8 == var$0.$aw) {
                                var$0.$c2 = var$13 + 1 | 0;
                                var$13 = var$0.$ca;
                                var$0.$ax = var$13;
                                var$0.$U = 0;
                                var$0.$bX = var$13;
                                var$0.$ar = var$0.$db;
                                var$0.$aq = var$0.$c8;
                                c_byte();
                                var$0.$cX = 4;
                                var$7 = var$3;
                            } else if (var$13 != 2)
                                var$7 = var$3;
                            else if (var$8 != var$0.$c30)
                                var$7 = var$3;
                            else {
                                var$0.$c2 = var$13 + 1 | 0;
                                var$13 = var$0.$ca;
                                var$0.$ax = var$13;
                                var$0.$U = 0;
                                var$0.$bX = var$13;
                                var$0.$ar = var$0.$ai;
                                var$0.$aq = var$0.$ah;
                                c_byte();
                                var$0.$cX = 5;
                                var$7 = var$3;
                            }
                        }
                    }
                    var$8 = var$8 + 1 | 0;
                }
                break j;
            }
        } else if (var$9) {
            l: {
                var$9 = var$0.$cT.data[var$8];
                var$5 = var$0.$cy.data;
                var$10 = var$5[var$8].data[1];
                var$14 = var$9 + $rt_imul(var$0.$b1, var$5[var$8].data[2]) | 0;
                var$16 = $rt_compare(var$13, var$9);
                if (!(var$16 >= 0 && var$13 <= var$14) && !(var$11 >= var$9 && var$11 <= var$14)) {
                    if (var$16 > 0)
                        break l;
                    if (var$11 < var$14)
                        break l;
                }
                if ((var$10 - var$3 | 0) == 1 && !(var$5[var$8].data[3] & 1))
                    break j;
            }
            var$0.$aT = (-1);
        }
    }
    if (!var$12 && var$0.$aT == (-1)) {
        var$3 = var$0.$n0;
        if (var$3 != 6 && var$7 >= 0 && var$3 != 3 && var$3 != 4 && var$3 != 5)
            var$0.$n0 = 6;
    }
    if (var$12) {
        var$3 = var$0.$n0;
        if (!(var$3 != 6 && var$3 != 3 && var$3 != 4 && var$3 != 5))
            var$0.$n0 = 0;
    }
    if (var$4 <= 2 && var$6 < 0) {
        var$0.$aR = 32;
        var$6 = 0;
    } else if (((var$4 + var$0.$aS | 0) + 2 | 0) >= $rt_imul(a_do(var$0.$bg), var$0.$b1) && var$6 > 0) {
        var$0.$aR = (($rt_imul(a_do(var$0.$bg), var$0.$b1) - var$0.$aS | 0) - 2 | 0) << 4;
        var$6 = 0;
    }
    var$3 = var$0.$aR + var$6 | 0;
    var$0.$aR = var$3;
    var$13 = var$0.$aQ + var$7 | 0;
    var$0.$aQ = var$13;
    var$4 = var$3 >> 4;
    var$13 = var$13 >> 4;
    var$6 = var$13 - (var$0.$a50 / 2 | 0) | 0;
    var$3 = var$0.$cf;
    var$6 = var$6 / var$3 | 0;
    var$11 = var$13 / var$3 | 0;
    var$3 = var$0.$aS;
    var$7 = var$3 / 3 | 0;
    var$12 = var$4 + var$7 | 0;
    var$8 = var$0.$b1;
    var$12 = var$12 / var$8 | 0;
    var$7 = ((var$4 + var$3 | 0) - var$7 | 0) / var$8 | 0;
    var$5 = a_for(var$0.$bg);
    if (var$0.$X == (-1))
        var$0.$bi = 2000;
    var$0.$X = (-1);
    var$17 = var$2 + 4000 | 0;
    while (var$6 <= var$11) {
        var$2 = $rt_imul(var$6, a_do(var$0.$bg)) + var$12 | 0;
        var$3 = var$12;
        while (var$3 <= var$7) {
            m: {
                n: {
                    o: {
                        p: {
                            q: {
                                var$18 = var$5.data;
                                switch (var$18[var$2]) {
                                    case 6:
                                    case 20:
                                        break o;
                                    case 7:
                                        break p;
                                    case 8:
                                    case 9:
                                    case 10:
                                    case 11:
                                        break q;
                                    case 12:
                                    case 21:
                                        break n;
                                    case 13:
                                    case 14:
                                    case 16:
                                    case 17:
                                    case 18:
                                    case 19:
                                        break m;
                                    case 15:
                                    case 22:
                                        break;
                                    default:
                                        break m;
                                }
                                var$0.$X = var$2;
                                break m;
                            }
                            var$0.$X = 65535;
                            break m;
                        }
                        a_a(var$0.$bg, var$3, var$6, 0);
                        a_a(var$0.$bg, var$0.$bt, var$0.$br, 8);
                        a_a(var$0.$bg, var$0.$bt + 1 | 0, var$0.$br, 9);
                        a_a(var$0.$bg, var$0.$bt, var$0.$br + 1 | 0, 10);
                        a_a(var$0.$bg, var$0.$bt + 1 | 0, var$0.$br + 1 | 0, 11);
                        var$0.$c00 = 1;
                        c_if0();
                        var$8 = var$0.$ca;
                        var$0.$bX = var$8;
                        var$0.$ax = var$8;
                        break m;
                    }
                    a_a(var$0.$bg, var$3, var$6, 0);
                    var$8 = var$0.$a60 + 1 | 0;
                    var$0.$a60 = var$8;
                    if (var$8 != var$0.$dk)
                        c_for0();
                    else {
                        var$0.$G.data[0] = 1;
                        var$0.$bq = 2000;
                        c_do0();
                    }
                    if (var$0.$a60 % 15 | 0)
                        break m;
                    var$8 = var$0.$bc;
                    if (var$8 >= 6)
                        break m;
                    var$0.$bc = var$8 + 1 | 0;
                    break m;
                }
                var$8 = var$18[var$2] != 21 ? var$3 : var$3 - 1 | 0;
                a_a(var$0.$bg, var$8, var$6, 0);
                a_a(var$0.$bg, var$8 + 1 | 0, var$6, 0);
                var$9 = 0;
                r: {
                    while (true) {
                        if (var$9 >= 4)
                            break r;
                        var$18 = var$0.$cl.data;
                        if (var$18[var$9] == (-1))
                            break;
                        var$9 = var$9 + 1 | 0;
                    }
                    var$10 = var$0.$b1;
                    var$18[var$9] = $rt_imul(var$8, var$10) + (var$10 >> 1) | 0;
                    var$0.$cj.data[var$9] = (($rt_imul(var$6 + 1 | 0, var$0.$cf) - (var$0.$c9 / 2 | 0) | 0) + 3 | 0) << 4;
                }
                c_int0();
                if (var$0.$df != 2)
                    var$0.$F = var$0.$F + 1 | 0;
                else {
                    var$9 = var$0.$a90;
                    if ((var$9 + 1 | 0) >= 10) {
                        c_a1();
                        var$0.$c6 = 0;
                        e_a0(var$0.$aO, $rt_s(55));
                        d_for(var$0, (-2));
                    } else {
                        var$9 = var$9 * 2 | 0;
                        var$18 = var$0.$bl.data;
                        var$9 = var$9 % var$18.length | 0;
                        var$18[var$9] = var$17;
                        var$18[var$9 + 1 | 0] = var$8 + $rt_imul(var$6, a_do(var$0.$bg)) | 0;
                        var$0.$a90 = var$0.$a90 + 1 | 0;
                    }
                }
            }
            var$3 = var$3 + 1 | 0;
            var$2 = var$2 + 1 | 0;
        }
        var$6 = var$6 + 1 | 0;
    }
    s: {
        d_i(var$0);
        d_m(var$0);
        var$2 = var$0.$cX;
        if (var$2 != 20 && var$2 != 12 && var$0.$df != 1) {
            if (!var$0.$cZ) {
                var$0.$b4 = (var$0.$ca / 16 | 0) & 1;
                var$1 = var$0.$bv - var$1 | 0;
                var$0.$bv = var$1;
                if (var$1 <= 0) {
                    var$1 = var$0.$aR - var$0.$aW | 0;
                    var$2 = var$0.$aQ - var$0.$aV | 0;
                    var$3 = var$1 < 0 ?  -var$1 | 0 : var$1;
                    var$6 = var$2 < 0 ?  -var$2 | 0 : var$2;
                    if (( -var$2 | 0) > (($rt_imul(var$0.$cf, g_new(var$0.$dg)) * 3 | 0) / 2 | 0) << 4) {
                        var$0.$aV = var$0.$aQ + ((($rt_imul(var$0.$cf, g_new(var$0.$dg)) * 3 | 0) / 2 | 0) << 4) | 0;
                        var$0.$aW = var$0.$aR;
                    } else {
                        if (!(var$3 < var$6 && var$3 >= var$0.$cx << 1)) {
                            var$6 = var$0.$cx << 1;
                            if (var$3 > var$6) {
                                var$0.$bv = (var$0.$b1 * 4 | 0) * 16 | 0;
                                if (var$1 < ( -var$6 | 0)) {
                                    var$0.$cZ = 1;
                                    break s;
                                }
                                if (var$1 <= var$6)
                                    break s;
                                var$0.$cZ = 2;
                                break s;
                            }
                        }
                        var$0.$bv = (var$0.$cf * 4 | 0) * 16 | 0;
                        var$1 = var$0.$cw << 1;
                        if (var$2 < ( -var$1 | 0))
                            var$0.$cZ = 3;
                        else if (var$2 > var$1)
                            var$0.$cZ = 4;
                    }
                }
            } else {
                var$11 = ((var$0.$aW >> 4) + (g_for(var$0.$dg) >> 1) | 0) - ((var$0.$aR >> 4) + (var$0.$aS >> 1) | 0) | 0;
                var$12 = ((var$0.$aQ >> 4) - (var$0.$a50 >> 1) | 0) - ((var$0.$aV >> 4) - (jml_Image_getHeight(var$0.$cd) >> 1) | 0) | 0;
                var$7 = var$0.$cw;
                var$8 = var$0.$cx;
                var$1 = 1000;
                if (var$0.$cX != 6) {
                    var$9 = var$7;
                    var$10 = var$8;
                } else {
                    var$6 = var$0.$a90;
                    var$1 = 200 + ((200 * var$6 | 0) / 10 | 0) | 0;
                    var$9 = $rt_imul(var$7, var$1) / 200 | 0;
                    var$10 = $rt_imul(var$8, var$1) / 200 | 0;
                    var$1 = (1000 * (100 - ((100 * var$6 | 0) / 10 | 0) | 0) | 0) / 140 | 0;
                }
                t: {
                    u: {
                        v: {
                            w: {
                                switch (var$0.$cZ) {
                                    case 1:
                                        break;
                                    case 2:
                                        break w;
                                    case 3:
                                        break v;
                                    case 4:
                                        break u;
                                    default:
                                        break t;
                                }
                                var$2 = var$0.$aW - var$10 | 0;
                                var$3 = var$0.$aR;
                                if (var$2 >= var$3)
                                    var$0.$aW = var$2;
                                var$0.$bv = var$0.$bv - var$8 | 0;
                                if (var$0.$aW >= var$3)
                                    break t;
                                var$0.$cZ = 2;
                                var$0.$bv = 0;
                                break t;
                            }
                            var$2 = var$0.$aW + var$10 | 0;
                            var$3 = var$0.$aR;
                            if (var$2 <= var$3)
                                var$0.$aW = var$2;
                            var$0.$bv = var$0.$bv - var$8 | 0;
                            if (var$0.$aW <= var$3)
                                break t;
                            var$0.$cZ = 1;
                            var$0.$bv = 0;
                            break t;
                        }
                        var$2 = var$0.$aV - var$9 | 0;
                        var$3 = var$0.$aQ;
                        if (var$2 >= var$3)
                            var$0.$aV = var$2;
                        var$0.$bv = var$0.$bv - var$7 | 0;
                        if (var$0.$aV >= var$3)
                            break t;
                        var$0.$cZ = 4;
                        var$0.$bv = 0;
                        break t;
                    }
                    var$2 = var$0.$aV + var$9 | 0;
                    var$3 = var$0.$aQ;
                    if (var$2 <= var$3)
                        var$0.$aV = var$2;
                    var$0.$bv = var$0.$bv - var$7 | 0;
                    if (var$0.$aV > var$3) {
                        var$0.$cZ = 3;
                        var$0.$bv = 0;
                    }
                }
                if (var$0.$bv <= 0) {
                    var$0.$cZ = 0;
                    var$0.$bv = var$1;
                }
                var$1 = g_for(var$0.$dg) >> 1;
                var$2 = jml_Image_getHeight(var$0.$cd) >> 1;
                if (var$11 >= ( -var$1 | 0) && var$11 <= var$1 && var$12 >= ( -var$2 | 0) && var$12 <= var$2) {
                    d_else(var$0, var$4, var$13);
                    var$0.$cZ = 0;
                    var$0.$bv = 7000;
                }
                var$0.$b4 = (var$0.$ca / 10 | 0) & 1;
            }
        }
    }
    var$1 = var$4 + (var$0.$aS / 2 | 0) | 0;
    var$2 = 0;
    while (var$2 < 3) {
        var$5 = var$0.$bC.data;
        if (var$5[var$2] != (-1)) {
            var$18 = var$0.$bN.data;
            var$3 = var$2 * 2 | 0;
            var$6 = var$1 - var$18[var$3] | 0;
            var$3 = var$13 - var$18[var$3 + 1 | 0] | 0;
            if (var$6 < 0)
                var$6 =  -var$6 | 0;
            if (var$6 < 4 && var$3 < 5 && var$3 > (-2)) {
                var$5[var$2] = (-1);
                d_else(var$0, var$4, var$13);
            }
        }
        var$2 = var$2 + 1 | 0;
    }
    var$0.$aD = var$0.$aD - 1 | 0;
},
d_else = (var$0, var$1, var$2) => {
    var$0.$bv = 4000;
    var$0.$bc = var$0.$bc - 1 | 0;
    c_long0();
    h_a0(100, 200);
    var$0.$aD = 21;
    if (var$0.$bc <= 0) {
        var$0.$bc = 0;
        var$0.$b2 = 0;
        var$0.$cX = 3;
    }
},
d_case = (var$0, var$1, var$2) => {
    var$0.$ca = var$0.$ca + 1 | 0;
    d_n(var$0);
    d_i(var$0);
    d_m(var$0);
    if (!var$0.$b2) {
        c_$callClinit();
        if (c_char) {
            cnms_Sound_play(c_byte0, 1);
            c_try = c_byte0;
        }
    }
    var$1 = var$0.$b2 + var$1 | 0;
    var$0.$b2 = var$1;
    if (var$1 > 3000) {
        var$0.$av = 0;
        var$0.$b5 = 1;
    }
},
d_a9 = (var$0, var$1, var$2, var$3, var$4, var$5, var$6) => {
    let var$7, var$8, var$9, var$10;
    if (!var$0.$bL) {
        var$7 = var$1 - var$3 | 0;
        var$8 = var$0.$b30;
        var$0.$bL = !(var$7 >= var$8 && ((var$3 + var$5 | 0) - var$1 | 0) >= (var$8 + var$0.$b1 | 0)) ? 1 : 0;
    }
    if (!var$0.$bB) {
        var$7 = var$2 - var$4 | 0;
        var$8 = var$0.$bU;
        var$0.$bB = !(var$7 >= var$8 && ((var$4 + var$6 | 0) - var$2 | 0) >= (var$8 + var$0.$cf | 0)) ? 1 : 0;
    }
    if (var$0.$bL) {
        var$8 = var$1 - var$3 | 0;
        var$7 = var$0.$co;
        var$9 = $rt_compare(var$8, var$7);
        if (var$9 >= 0 && ((var$3 + var$5 | 0) - var$1 | 0) >= var$7)
            var$0.$bL = 0;
        else {
            var$10 = var$7 / 3 | 0;
            if (var$8 < var$10)
                var$0.$ap = var$1 - var$10 | 0;
            else {
                var$3 = (var$3 + var$5 | 0) - var$1 | 0;
                if (var$3 < var$10)
                    var$0.$ap = (var$1 + var$10 | 0) - var$5 | 0;
                else if (var$9 < 0)
                    var$0.$ap = var$0.$ap - var$0.$bE | 0;
                else if (var$3 < var$7)
                    var$0.$ap = var$0.$ap + var$0.$bE | 0;
            }
        }
    }
    if (var$0.$bB) {
        var$3 = var$2 - var$4 | 0;
        var$5 = var$0.$b7;
        var$8 = $rt_compare(var$3, var$5);
        if (var$8 >= 0 && ((var$4 + var$6 | 0) - var$2 | 0) >= var$5)
            var$0.$bB = 0;
        else {
            var$1 = var$5 / 3 | 0;
            if (var$3 < var$1)
                var$0.$an = var$2 - var$1 | 0;
            else {
                var$3 = (var$4 + var$6 | 0) - var$2 | 0;
                if (var$3 < var$1)
                    var$0.$an = (var$2 + var$1 | 0) - var$6 | 0;
                else if (var$8 < 0)
                    var$0.$an = var$0.$an - var$0.$bx | 0;
                else if (var$3 < var$5)
                    var$0.$an = var$0.$an + var$0.$bx | 0;
            }
        }
    }
    var$1 = var$0.$ap;
    if (var$1 < 0) {
        var$0.$ap = 0;
        var$0.$bL = 0;
    } else {
        var$2 = var$0.$cQ;
        if (var$1 > var$2) {
            var$0.$ap = var$2;
            var$0.$bL = 0;
        }
    }
    var$1 = var$0.$an;
    var$2 = var$0.$cc;
    if (var$1 < var$2) {
        var$0.$an = var$2;
        var$0.$bB = 0;
    } else {
        var$2 = var$0.$cM;
        if (var$1 > var$2) {
            var$0.$an = var$2;
            var$0.$bB = 0;
        }
    }
},
d_do0 = (var$0, var$1, var$2) => {
    let var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14;
    a: {
        var$1 = var$0.$bu + var$1 | 0;
        var$0.$bu = var$1;
        if (var$1 >= 20) {
            var$0.$b00 = 1;
            var$0.$bu = 0;
            var$0.$bi = var$0.$bi - var$1 | 0;
            var$0.$bq = var$0.$bq - var$1 | 0;
            var$3 = var$0.$cX;
            if (var$3 >= 21 && var$3 <= 25) {
                d_char(var$0, var$1, var$2);
                return;
            }
            var$4 = 1;
            if (var$3 != 11) {
                if (var$3 != 10) {
                    var$5 = var$0.$an;
                    d_new(var$0, var$5 - var$0.$cf | 0, (var$5 + g_k(var$0.$dg) | 0) + var$0.$cf | 0);
                    var$6 = a_for(var$0.$bg);
                    a_do(var$0.$bg);
                    var$7 = var$0.$an + g_k(var$0.$dg) | 0;
                    var$8 = var$0.$a80;
                    while (true) {
                        var$9 = var$0.$aj.data;
                        if (var$8 >= var$9.length)
                            break;
                        var$5 = var$8 + 1 | 0;
                        if ($rt_imul(var$9[var$5], var$0.$cf) >= var$7)
                            break;
                        var$3 = var$9[var$8];
                        var$5 = var$9[var$5];
                        var$10 = var$3 + $rt_imul(a_do(var$0.$bg), var$5) | 0;
                        var$11 = ((((var$0.$ca / 10 | 0) + var$3 | 0) + var$5 | 0) / 1 | 0) % 3 | 0;
                        if (var$11 > 1)
                            var$11 = 1;
                        b: {
                            var$9 = var$0.$aj.data;
                            var$12 = var$8 + 2 | 0;
                            if (var$9[var$12] != var$11) {
                                c: {
                                    var$13 = var$6.data;
                                    var$9[var$12] = var$11 << 16 >> 16;
                                    switch (var$13[var$10]) {
                                        case 6:
                                        case 20:
                                            break;
                                        case 15:
                                        case 22:
                                            break c;
                                        default:
                                            break b;
                                    }
                                    if (var$11) {
                                        a_a(var$0.$bg, var$3, var$5, 20);
                                        break b;
                                    }
                                    a_a(var$0.$bg, var$3, var$5, 6);
                                    break b;
                                }
                                if (var$11)
                                    a_a(var$0.$bg, var$3, var$5, 22);
                                else
                                    a_a(var$0.$bg, var$3, var$5, 15);
                            }
                        }
                        var$8 = var$8 + 3 | 0;
                    }
                    d: {
                        e: {
                            f: {
                                g: {
                                    h: {
                                        i: {
                                            j: {
                                                k: {
                                                    l: {
                                                        switch (var$0.$cX) {
                                                            case 0:
                                                                break j;
                                                            case 3:
                                                                break l;
                                                            case 4:
                                                                break f;
                                                            case 5:
                                                                break g;
                                                            case 6:
                                                                break e;
                                                            case 7:
                                                                break k;
                                                            case 12:
                                                                break i;
                                                            case 20:
                                                                break h;
                                                            case 1:
                                                            case 2:
                                                            case 8:
                                                            case 9:
                                                            case 10:
                                                            case 11:
                                                            case 13:
                                                            case 14:
                                                            case 15:
                                                            case 16:
                                                            case 17:
                                                            case 18:
                                                            case 19:
                                                                break;
                                                            default:
                                                        }
                                                        break d;
                                                    }
                                                    d_case(var$0, var$1, var$2);
                                                    break d;
                                                }
                                                d_byte(var$0, var$1, var$2);
                                                break d;
                                            }
                                            var$0.$cK = var$0.$cK + var$1 | 0;
                                            d_byte(var$0, var$1, var$2);
                                            break d;
                                        }
                                        var$5 = var$0.$b2 + var$1 | 0;
                                        var$0.$b2 = var$5;
                                        if (var$5 <= 7000) {
                                            d_byte(var$0, var$1, var$2);
                                            break d;
                                        }
                                        var$0.$av = 0;
                                        var$0.$b5 = 1;
                                        break d;
                                    }
                                    d_byte(var$0, var$1, var$2);
                                    e_a4(var$0.$aO, var$1, var$2);
                                    if (!e_for(var$0.$aO) && !var$0.$c6)
                                        break d;
                                    var$0.$c6 = 0;
                                    var$0.$cK = 0;
                                    var$0.$cX = 0;
                                    if (var$0.$df != (-1)) {
                                        c_try0();
                                        var$0.$b2 = 0;
                                        var$0.$cX = 12;
                                        break d;
                                    }
                                    e_a1(var$0.$aO);
                                    d_for(var$0, 0);
                                    c_new0();
                                    break d;
                                }
                                var$5 = var$0.$bX;
                                var$3 = var$5 - var$0.$ax | 0;
                                var$0.$bX = var$5 + 1 | 0;
                                if (!var$0.$c00) {
                                    if (var$0.$bC.data[var$0.$de] == (-1)) {
                                        var$5 = $rt_compare(var$3 % 35 | 0, 23);
                                        if (var$5 < 0)
                                            var$0.$U = 1;
                                        else if (!var$5) {
                                            var$0.$U = 0;
                                            var$5 = (jml_Image_getHeight(var$0.$cd) - var$0.$c9 | 0) - 2 | 0;
                                            d_try(var$0, var$0.$ai, var$0.$ah - var$5 | 0);
                                        }
                                    }
                                } else if (var$3 > 0 && var$3 < 10) {
                                    var$0.$U = 0;
                                    if ((var$3 / 4 | 0) % 2 | 0)
                                        var$0.$aq = 0;
                                    else
                                        var$0.$aq = var$0.$ah;
                                } else if (var$3 == 10) {
                                    var$0.$aq = 0;
                                    var$5 = var$0.$bp & 1023;
                                    if (var$5) {
                                        var$9 = var$0.$cy.data[var$5].data;
                                        var$9[3] = (var$9[3] & 65534) << 16 >> 16;
                                    }
                                } else if (var$3 == 30) {
                                    var$5 = var$0.$bp >> 10 & 1023;
                                    if (var$5) {
                                        var$9 = var$0.$cy.data[var$5].data;
                                        var$9[3] = (var$9[3] & 65534) << 16 >> 16;
                                    }
                                } else if (var$3 == 40) {
                                    var$5 = var$0.$bp >> 20 & 1023;
                                    if (var$5) {
                                        var$9 = var$0.$cy.data[var$5].data;
                                        var$9[3] = (var$9[3] & 65534) << 16 >> 16;
                                    }
                                    var$0.$c2 = var$0.$c2 + 1 | 0;
                                    var$0.$cX = 0;
                                }
                                d_byte(var$0, var$1, var$2);
                                break d;
                            }
                            m: {
                                n: {
                                    var$5 = var$0.$bX;
                                    var$3 = var$5 - var$0.$ax | 0;
                                    var$0.$bX = var$5 + 1 | 0;
                                    if (!(var$3 >= 0 && var$3 < 10)) {
                                        var$10 = $rt_compare(var$3, 20);
                                        if (var$10 <= 0)
                                            break n;
                                        if (var$3 >= 30)
                                            break n;
                                    }
                                    if ((var$3 / 4 | 0) % 2 | 0) {
                                        var$0.$aq = 0;
                                        break m;
                                    }
                                    var$0.$aq = var$0.$c8;
                                    break m;
                                }
                                if (var$3 == 10) {
                                    var$0.$aq = var$0.$c8;
                                    var$0.$U = 1;
                                } else if (!var$10) {
                                    var$0.$U = 0;
                                    var$5 = (jml_Image_getHeight(var$0.$cd) - var$0.$c9 | 0) - 2 | 0;
                                    d_try(var$0, var$0.$db, var$0.$c8 - var$5 | 0);
                                } else if (var$3 == 30) {
                                    var$0.$aq = 0;
                                    var$5 = var$0.$aa & 1023;
                                    if (var$5) {
                                        var$9 = var$0.$cy.data[var$5].data;
                                        var$9[3] = (var$9[3] & 65534) << 16 >> 16;
                                    }
                                } else if (var$3 == 40) {
                                    var$5 = var$0.$aa >> 10 & 1023;
                                    if (var$5) {
                                        var$9 = var$0.$cy.data[var$5].data;
                                        var$9[3] = (var$9[3] & 65534) << 16 >> 16;
                                    }
                                } else if (var$3 == 50) {
                                    var$5 = var$0.$aa >> 20 & 1023;
                                    if (var$5) {
                                        var$9 = var$0.$cy.data[var$5].data;
                                        var$9[3] = (var$9[3] & 65534) << 16 >> 16;
                                    }
                                    var$0.$c2 = var$0.$c2 + 1 | 0;
                                    var$0.$cX = 0;
                                }
                            }
                            d_byte(var$0, var$1, var$2);
                            break d;
                        }
                        if (var$0.$df == 2) {
                            var$5 = var$0.$c4 - var$1 | 0;
                            var$0.$c4 = var$5;
                            if (var$5 < 0) {
                                if (var$5 < 0)
                                    var$0.$c4 = 0;
                                var$0.$b2 = 0;
                                var$0.$cX = 3;
                            }
                        }
                        while (true) {
                            var$9 = var$0.$bl.data;
                            var$5 = var$0.$bH;
                            if (var$9[var$5] == (-1))
                                break;
                            if (var$9[var$5] >= var$2)
                                break;
                            var$5 = var$9[var$5 + 1 | 0];
                            var$3 = var$5 % a_do(var$0.$bg) | 0;
                            var$5 = var$5 / a_do(var$0.$bg) | 0;
                            a_a(var$0.$bg, var$3, var$5, 12);
                            a_a(var$0.$bg, var$3 + 1 | 0, var$5, 21);
                            var$9 = var$0.$bl.data;
                            var$5 = var$0.$bH;
                            var$9[var$5] = (-1);
                            var$5 = var$5 + 2 | 0;
                            var$0.$bH = var$5;
                            var$0.$bH = var$5 % var$9.length | 0;
                        }
                        var$5 = var$0.$c4;
                        if (var$5 < 60000) {
                            if (var$0.$bC.data[var$0.$de] == (-1)) {
                                var$5 = $rt_compare(var$0.$ca % 35 | 0, 23);
                                if (var$5 < 0)
                                    var$0.$U = 1;
                                else if (!var$5) {
                                    var$0.$U = 0;
                                    var$5 = (jml_Image_getHeight(var$0.$cd) - var$0.$c9 | 0) - 2 | 0;
                                    d_try(var$0, var$0.$a31, var$0.$a210 - var$5 | 0);
                                }
                            }
                            d_byte(var$0, var$1, var$2);
                        } else {
                            var$0.$ap = ((var$0.$aR >> 4) + (var$0.$aS / 2 | 0) | 0) - var$0.$b30 | 0;
                            if (var$5 >= 65000)
                                var$0.$an = var$0.$cc;
                            else {
                                var$1 = var$0.$cc;
                                var$0.$an = var$1 + ($rt_imul((65000 - var$5 | 0) * 115 | 0, var$0.$cM - var$1 | 0) / 500000 | 0) | 0;
                            }
                            var$1 = var$0.$an;
                            var$2 = var$0.$cM;
                            if (var$1 >= var$2)
                                var$0.$an = var$2;
                            var$4 = 0;
                        }
                    }
                    if (var$4) {
                        var$1 = g_i(var$0.$dg);
                        var$2 = g_k(var$0.$dg);
                        d_a9(var$0, (var$0.$aR >> 4) + (var$0.$aS / 2 | 0) | 0, (var$0.$aQ >> 4) - (var$0.$a50 / 2 | 0) | 0, var$0.$ap, var$0.$an, var$1, var$2);
                    }
                    var$1 = var$0.$cX;
                    if (var$1 != 20 && var$1 != 12)
                        break a;
                    var$14 = var$0.$aO;
                    var$0.$ap = var$14.$do6;
                    var$0.$an = var$14.$if11;
                    break a;
                }
                var$1 = var$0.$ca + 1 | 0;
                var$0.$ca = var$1;
                if (var$1 == 35) {
                    var$0.$ca = 0;
                    var$0.$cX = var$0.$bd;
                }
                return;
            }
            if (var$0.$ca == 1)
                c_goto0();
            var$5 = var$0.$ca + 1 | 0;
            var$0.$ca = var$5;
            if (var$5 == 35) {
                d_for(var$0, var$0.$a70);
                var$0.$bu = 30;
                var$0.$ca = 0;
                d_do0(var$0, var$1, var$2);
                var$0.$bi = 0;
                d_for0(var$0, jml_Image_getGraphics(var$0.$ac));
                var$0.$cX = 10;
            }
            return;
        }
    }
},
d_a3 = (var$0, var$1, var$2, var$3, var$4, var$5, var$6, var$7) => {
    let var$8;
    a: {
        var$8 = $rt_compare(var$1, var$5);
        if (!(var$8 >= 0 && var$1 <= var$6) && !(var$2 >= var$5 && var$2 <= var$6)) {
            if (var$8 > 0)
                break a;
            if (var$2 < var$6)
                break a;
        }
        var$1 = var$3 + var$4 | 0;
        if (var$1 >= var$3) {
            var$2 = var$1;
            var$1 = var$3;
            var$3 = var$2;
        }
        if (var$7 >= var$1 && var$7 <= var$3) {
            if (var$4 > 0)
                return var$7 - var$1 | 0;
            return var$7 - var$3 | 0;
        }
    }
    return var$4;
},
d_n = var$0 => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10;
    var$1 = var$0.$dc;
    var$2 = var$1;
    while (var$2 < (var$1 + var$0.$I | 0)) {
        var$3 = var$0.$cy.data;
        var$4 = var$3[var$2].data[3];
        var$5 = var$4 & 6;
        var$6 = $rt_compare(var$5, 2);
        if (!(var$6 && var$5 != 4)) {
            var$7 = (var$4 & 56) >> 3;
            var$8 = var$0.$b1;
            var$7 = $rt_imul(var$7, var$8);
            var$9 = $rt_imul(((var$4 & 192) >> 6) + 1 | 0, var$0.$cx) >> 4;
            var$10 = 0;
            if (var$7) {
                var$4 = ($rt_imul(var$0.$ca, var$9) / 4 | 0) % (var$7 * 2 | 0) | 0;
                if (var$4 > var$7)
                    var$4 = var$7 - (var$4 - var$7 | 0) | 0;
                if (!var$6)
                    var$0.$cT.data[var$2] = (var$3[var$2].data[0] + var$4 | 0) << 16 >> 16;
                else if (var$5 == 4)
                    var$0.$cT.data[var$2] = (var$3[var$2].data[0] - var$4 | 0) << 16 >> 16;
            } else {
                var$7 = $rt_imul(var$0.$bg.$if7 + var$3[var$2].data[2] | 0, var$8);
                if (!var$6)
                    var$10 = ((($rt_imul(var$0.$ca, var$9) / 4 | 0) + var$3[var$2].data[0] | 0) + $rt_imul(var$3[var$2].data[2], var$8) | 0) % var$7 | 0;
                else if (var$5 == 4)
                    var$10 = ((var$3[var$2].data[0] + var$7 | 0) - (($rt_imul(var$0.$ca, var$9) / 4 | 0) % var$7 | 0) | 0) % var$7 | 0;
                var$0.$cT.data[var$2] = (var$10 - $rt_imul(var$3[var$2].data[2], var$8) | 0) << 16 >> 16;
            }
        }
        var$2 = var$2 + 1 | 0;
    }
},
d_i = var$0 => {
    let var$1, var$2, var$3;
    var$1 = 0;
    while (var$1 < 4) {
        var$2 = var$0.$cl.data;
        if (var$2[var$1] != (-1)) {
            var$3 = var$0.$cj.data;
            var$3[var$1] = var$3[var$1] - var$0.$aJ | 0;
            if (var$3[var$1] < var$0.$an << 4)
                var$2[var$1] = (-1);
        }
        var$1 = var$1 + 1 | 0;
    }
},
d_m = var$0 => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14, var$15, var$16, var$17, var$18, var$19;
    var$1 = var$0.$an + 216 | 0;
    var$2 = var$0.$b8;
    var$3 = var$0.$c9;
    var$4 = 0;
    var$5 = var$2 << 4;
    var$6 = var$3 << 4;
    while (var$4 < 3) {
        a: {
            var$7 = var$0.$bC.data;
            if (var$7[var$4] != (-1)) {
                var$8 = 0;
                var$9 = var$0.$bN.data;
                var$10 = var$4 * 2 | 0;
                var$11 = var$9[var$10];
                var$12 = var$11 + var$2 | 0;
                var$13 = var$10 + 1 | 0;
                var$14 = var$9[var$13];
                if (var$9[var$13] > var$1)
                    var$7[var$4] = (-1);
                else {
                    var$15 = 1;
                    var$16 = var$0.$dc;
                    b: {
                        c: {
                            while (var$16 < (var$0.$dc + var$0.$I | 0)) {
                                var$9 = var$0.$cy.data;
                                if (!(var$9[var$16].data[3] & 1)) {
                                    var$17 = var$0.$cT.data[var$16];
                                    var$18 = var$9[var$16].data[1];
                                    if (d_a3(var$0, var$11, var$12, var$14, 2, var$17, var$17 + $rt_imul(var$0.$b1, var$9[var$16].data[2]) | 0, var$18) < 2)
                                        break c;
                                }
                                var$16 = var$16 + 1 | 0;
                            }
                            break b;
                        }
                        var$8 = 1;
                    }
                    if (f_a(var$0.$J, var$11 << 4, (var$14 - var$3 | 0) << 4, var$5, var$6, 0, 16)) {
                        var$8 = 1;
                        var$15 = var$0.$J.$else0;
                    }
                    d: {
                        var$7 = var$0.$bC.data;
                        switch (var$7[var$4]) {
                            case 0:
                                break;
                            case 1:
                                break d;
                            default:
                                break a;
                        }
                        if (!var$8) {
                            var$7 = var$0.$bN.data;
                            var$7[var$13] = (var$7[var$13] + var$15 | 0) << 16 >> 16;
                            break a;
                        }
                        var$7[var$4] = 1;
                        if (ju_Random_nextInt(var$0.$aH) % 2 | 0) {
                            var$0.$dm.data[var$4] = (-1);
                            break a;
                        }
                        var$0.$dm.data[var$4] = 1;
                        break a;
                    }
                    if (!var$8) {
                        var$7[var$4] = 0;
                        var$7 = var$0.$bN.data;
                        var$7[var$13] = (var$7[var$13] + var$15 | 0) << 16 >> 16;
                    } else {
                        var$7 = var$0.$bN.data;
                        var$17 = var$7[var$10];
                        var$9 = var$0.$dm.data;
                        var$17 = var$17 + var$9[var$4] | 0;
                        if (var$17 <= 0) {
                            var$17 = 1;
                            var$9[var$4] = ( -var$9[var$4] | 0) << 24 >> 24;
                        } else {
                            var$18 = var$17 + var$2 | 0;
                            var$19 = $rt_imul(var$0.$bg.$if7, var$0.$b1);
                            if (var$18 >= var$19) {
                                var$17 = (var$19 - var$2 | 0) - 1 | 0;
                                var$9[var$4] = ( -var$9[var$4] | 0) << 24 >> 24;
                            }
                        }
                        var$7[var$10] = var$17 << 16 >> 16;
                    }
                }
            }
        }
        var$4 = var$4 + 1 | 0;
    }
},
d_try = (var$0, var$1, var$2) => {
    let var$3, var$4, var$5;
    var$3 = var$0.$bC.data;
    var$4 = var$0.$de;
    if (var$3[var$4] == (-1)) {
        if (var$1 != (-1))
            var$0.$bN.data[var$4 * 2 | 0] = var$1 << 16 >> 16;
        else {
            var$0.$bN.data[var$4 * 2 | 0] = (ju_Random_nextInt(var$0.$aH) % ((14 * var$0.$b1 | 0) - 8 | 0) | 0) << 16 >> 16;
            var$3 = var$0.$bN.data;
            var$1 = var$0.$de * 2 | 0;
            if (var$3[var$1] < 0)
                var$3[var$1] = ( -var$3[var$1] | 0) << 16 >> 16;
            var$3[var$1] = (var$3[var$1] + var$0.$ap | 0) << 16 >> 16;
        }
        var$3 = var$0.$bN.data;
        var$5 = var$0.$de;
        var$3[(var$5 * 2 | 0) + 1 | 0] = var$2 << 16 >> 16;
        var$0.$bC.data[var$5] = 0;
        var$1 = var$5 + 1 | 0;
        var$0.$de = var$1;
        var$0.$de = var$1 % 3 | 0;
    }
},
d_a5 = (var$0, var$1) => {
    let var$2;
    if (var$0.$cX != (-1)) {
        if (var$0.$b00) {
            var$0.$b00 = 0;
            jml_Graphics_translate(var$1, 0, 0);
            var$2 = var$0.$cX;
            if (var$2 >= 21 && var$2 <= 25)
                d_if0(var$0, var$1);
            else if (var$2 == 10) {
                jml_Graphics_setClip(var$1, 0, 0, 176, 144);
                var$2 = ((-176) * (35 - var$0.$ca | 0) | 0) / 35 | 0;
                jml_Graphics_setColor(var$1, 0, 0, 0);
                jml_Graphics_fillRect(var$1, var$2 + 176 | 0, 0,  -var$2 | 0, 144);
                jml_Graphics_drawImage(var$1, var$0.$ac, var$2, 0, 20);
            } else if (var$2 != 11)
                d_for0(var$0, var$1);
            else {
                jml_Graphics_setClip(var$1, 0, 0, 176, 144);
                var$2 = (176 * var$0.$ca | 0) / 35 | 0;
                jml_Graphics_setColor(var$1, 0, 0, 0);
                jml_Graphics_fillRect(var$1, 0, 0, var$2, 144);
                jml_Graphics_drawImage(var$1, var$0.$ac, var$2, 0, 20);
            }
            return;
        }
        return;
    }
    jml_Graphics_setColor(var$1, 0, 0, 0);
    jml_Graphics_fillRect(var$1, 0, 0, 176, 144);
},
d_do1 = (var$0, var$1) => {
    let var$2, var$3, var$4;
    var$2 = (176 / jml_Image_getWidth(var$0.$W) | 0) + 2 | 0;
    var$3 = ( -(var$0.$ca / 8 | 0) | 0) % jml_Image_getWidth(var$0.$W) | 0;
    var$4 = 0;
    while (var$4 < var$2) {
        jml_Graphics_drawImage(var$1, var$0.$W, var$3, 0, 20);
        var$3 = var$3 + jml_Image_getWidth(var$0.$W) | 0;
        var$4 = var$4 + 1 | 0;
    }
    var$2 = ( -((var$0.$ca / 4 | 0) + (var$0.$ap / 4 | 0) | 0) | 0) % 38 | 0;
    var$3 = 0;
    while (var$3 < 6) {
        jml_Graphics_setClip(var$1, 0, 0, 176, 144);
        jml_Graphics_clipRect(var$1, var$2, 99, 38, 27);
        jml_Graphics_drawImage(var$1, var$0.$al, var$2, 99, 20);
        var$2 = var$2 + 38 | 0;
        var$3 = var$3 + 1 | 0;
    }
    var$2 = ( -(var$0.$ca + (var$0.$ap / 2 | 0) | 0) | 0) % 45 | 0;
    var$3 = 0;
    while (var$3 < 5) {
        jml_Graphics_setClip(var$1, 0, 0, 176, 144);
        jml_Graphics_clipRect(var$1, var$2, 114, 45, 30);
        jml_Graphics_drawImage(var$1, var$0.$al, var$2, 87, 20);
        var$2 = var$2 + 45 | 0;
        var$3 = var$3 + 1 | 0;
    }
},
d_for0 = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14, var$15, var$16, $$je;
    jml_Graphics_translate(var$1, (jml_Canvas_getWidth(var$0) - g_i(var$0.$dg) | 0) / 2 | 0, (jml_Canvas_getHeight(var$0) - g_k(var$0.$dg) | 0) / 2 | 0);
    var$2 = g_i(var$0.$dg);
    var$3 = g_k(var$0.$dg);
    jml_Graphics_setClip(var$1, 0, 0, var$2, var$3);
    d_do1(var$0, var$1);
    jml_Graphics_setClip(var$1, 0, 0, var$2, var$3);
    a_a0(var$0.$bg, var$1, 0, 0, g_i(var$0.$dg), g_k(var$0.$dg), var$0.$ap, var$0.$an);
    d_int0(var$0, var$1);
    var$4 = var$0.$dc;
    while (var$4 < (var$0.$dc + var$0.$I | 0)) {
        a: {
            var$5 = var$0.$cT.data[var$4] - var$0.$ap | 0;
            var$6 = var$0.$cy.data;
            var$7 = var$6[var$4].data[1] - var$0.$an | 0;
            if (!(var$6[var$4].data[3] & 1)) {
                var$8 = var$7 + (-4) | 0;
                var$9 = ((var$0.$ca + (var$4 * 3 | 0) | 0) / 32 | 0) % 4 | 0;
                var$10 = jml_Image_getWidth(var$0.$bJ);
                var$11 = 0;
                while (true) {
                    if (var$11 >= var$0.$cy.data[var$4].data[2])
                        break a;
                    var$12 = 0;
                    if (var$0.$aT == var$4) {
                        var$7 = (((var$0.$aR >> 4) - var$0.$ap | 0) + (var$0.$aS / 2 | 0) | 0) - var$5 | 0;
                        if (var$7 <= var$0.$b1 && var$7 >= 0)
                            var$12 = 2;
                    }
                    jml_Graphics_setClip(var$1, 0, 0, var$2, var$3);
                    var$13 = var$8 + (var$9 / 2 | 0) | 0;
                    jml_Graphics_clipRect(var$1, var$5, var$13 + var$12 | 0, var$0.$b1, var$0.$cf);
                    var$7 = (-13) * var$0.$b1 | 0;
                    var$14 = var$7 % var$10 | 0;
                    var$7 = $rt_imul(var$7 / var$10 | 0, var$0.$cf);
                    jml_Graphics_drawImage(var$1, var$0.$bJ, var$5 + var$14 | 0, (var$13 + var$7 | 0) + var$12 | 0, 20);
                    var$9 = (var$9 + 1 | 0) % 4 | 0;
                    var$5 = var$5 + var$0.$b1 | 0;
                    var$11 = var$11 + 1 | 0;
                }
            }
        }
        jml_Graphics_setClip(var$1, 0, 0, var$2, var$3);
        var$4 = var$4 + 1 | 0;
    }
    var$15 = var$0.$bW;
    if (var$15 !== null) {
        var$16 = jml_Image_getWidth(var$15) / 2 | 0;
        var$4 = jml_Image_getHeight(var$0.$bW);
        if (var$0.$aD > 0) {
            var$5 = ((var$0.$aR >> 4) + var$0.$D | 0) - var$0.$ap | 0;
            var$7 = ((var$0.$aQ >> 4) + var$0.$az | 0) - var$0.$an | 0;
            jml_Graphics_setClip(var$1, 0, 0, var$2, var$3);
            jml_Graphics_clipRect(var$1, var$5, var$7 - var$4 | 0, var$16, var$4);
            var$16 = $rt_imul((var$0.$ca / 3 | 0) % 2 | 0, var$16);
            jml_Graphics_drawImage(var$1, var$0.$bW, var$5 - var$16 | 0, var$7, 36);
        }
    }
    if (var$0.$cX == 3 && var$0.$Y !== null) {
        var$16 = (g_i(var$0.$dg) - jml_Image_getWidth(var$0.$Y) | 0) / 2 | 0;
        var$4 = (g_k(var$0.$dg) - (jml_Image_getHeight(var$0.$Y) / 2 | 0) | 0) / 2 | 0;
        jml_Graphics_setClip(var$1, var$16, var$4, jml_Image_getWidth(var$0.$Y), jml_Image_getHeight(var$0.$Y) / 2 | 0);
        if (var$0.$bc)
            var$4 = var$4 - (jml_Image_getHeight(var$0.$Y) / 2 | 0) | 0;
        jml_Graphics_drawImage(var$1, var$0.$Y, var$16, var$4, 20);
    }
    if (var$0.$cX != 7 && var$0.$df >= 0) {
        jml_Graphics_setClip(var$1, 0, 0, var$2, var$3);
        var$16 = g_j(var$0.$dg);
        var$4 = g_do(var$0.$dg);
        var$5 = 0;
        while (var$5 < var$0.$bc) {
            jml_Graphics_setClip(var$1, var$16, var$4, var$0.$b1, var$0.$cf);
            var$15 = var$0.$bJ;
            jml_Graphics_drawImage(var$1, var$15, var$16 - ((24 * var$0.$b1 | 0) % jml_Image_getWidth(var$15) | 0) | 0, var$4 - $rt_imul((24 * var$0.$b1 | 0) / jml_Image_getWidth(var$0.$bJ) | 0, var$0.$cf) | 0, 20);
            var$16 = var$16 - var$0.$b1 | 0;
            var$5 = var$5 + 1 | 0;
        }
        if (var$0.$df != 2) {
            jml_Graphics_setClip(var$1, 0, 0, var$2, var$3);
            var$16 = g_char(var$0.$dg);
            var$4 = g_null(var$0.$dg);
            var$5 = var$0.$dk - var$0.$a60 | 0;
            if (var$5 < 0)
                var$5 = 0;
            d_a1(var$0, var$1, var$16, var$4, var$0.$aE, g_case(var$0.$dg), 4, var$5, 1);
        } else {
            var$16 = var$0.$c4;
            if (var$16 >= 60000) {
                var$4 = var$16 - 60000 | 0;
                if (var$4 > 3500 && var$4 < 5000)
                    e_a(var$0.$aO, var$1, GameMIDlet_a(3));
                else if (var$4 > 2000 && var$4 < 3400)
                    e_a(var$0.$aO, var$1, GameMIDlet_a(4));
                else if (var$4 > 0 && var$4 < 1900 && !((var$16 / 200 | 0) % 2 | 0))
                    e_a(var$0.$aO, var$1, GameMIDlet_a(5));
            }
            var$16 = var$0.$c4;
            if (!(var$16 >= 60000 && ((var$16 / 500 | 0) % 2 | 0))) {
                jml_Graphics_setClip(var$1, 0, 0, var$2, var$3);
                var$16 = g_char(var$0.$dg);
                var$4 = g_null(var$0.$dg) - 2 | 0;
                jml_Graphics_setClip(var$1, var$16, var$4, var$0.$b1, var$0.$cf);
                var$15 = var$0.$bJ;
                jml_Graphics_drawImage(var$1, var$15, var$16 - ((21 * var$0.$b1 | 0) % jml_Image_getWidth(var$15) | 0) | 0, var$4 - $rt_imul((12 * var$0.$b1 | 0) / jml_Image_getWidth(var$0.$bJ) | 0, var$0.$cf) | 0, 20);
                var$5 = var$0.$b1;
                jml_Graphics_setClip(var$1, var$16 + var$5 | 0, var$4, var$5, var$0.$cf);
                var$15 = var$0.$bJ;
                var$5 = var$16 - ((12 * var$0.$b1 | 0) % jml_Image_getWidth(var$15) | 0) | 0;
                var$7 = var$0.$b1;
                jml_Graphics_drawImage(var$1, var$15, var$5 + var$7 | 0, var$4 - $rt_imul((21 * var$7 | 0) / jml_Image_getWidth(var$0.$bJ) | 0, var$0.$cf) | 0, 20);
                d_a1(var$0, var$1, (var$16 + var$0.$b1 | 0) + 3 | 0, var$4 + ((var$0.$cf - jml_Image_getHeight(var$0.$aE) | 0) / 2 | 0) | 0, var$0.$aE, g_case(var$0.$dg), 2, 10 - var$0.$a90 | 0, 0);
            }
            var$16 = var$0.$c4;
            if (!(var$16 <= 10000 && ((var$0.$ca / 15 | 0) % 2 | 0))) {
                var$16 = var$16 / 1000 | 0;
                if (var$16 > 60)
                    var$16 = 60;
                jml_Graphics_setClip(var$1, 0, 0, var$2, var$3);
                d_a1(var$0, var$1, g_long(var$0.$dg), g_b(var$0.$dg), var$0.$z, g_h(var$0.$dg), 2, var$16, 0);
            }
        }
    }
    var$2 = var$0.$cX;
    if (!(var$2 != 20 && var$2 != 12)) {
        var$2 = (15 * g_k(var$0.$dg) | 0) / 100 | 0;
        jml_Graphics_setClip(var$1, 0, 0, g_i(var$0.$dg), g_k(var$0.$dg));
        jml_Graphics_setColor(var$1, 0, 0, 0);
        jml_Graphics_fillRect(var$1, 0, 0, g_i(var$0.$dg), var$2);
        jml_Graphics_fillRect(var$1, 0, g_k(var$0.$dg) - var$2 | 0, g_i(var$0.$dg), var$2);
        if (var$0.$cX == 12) {
            b: {
                c: {
                    try {
                        var$0.$bW = null;
                        var$0.$Y = null;
                        if (var$0.$da === null)
                            var$0.$da = jml_Image_createImage($rt_s(56));
                        break b;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_Exception) {
                            break c;
                        } else {
                            throw $$e;
                        }
                    }
                }
            }
            jml_Graphics_setClip(var$1, 0, 0, g_i(var$0.$dg), g_k(var$0.$dg));
            jml_Graphics_drawImage(var$1, var$0.$da, (g_i(var$0.$dg) - jml_Image_getWidth(var$0.$da) | 0) / 2 | 0, (g_k(var$0.$dg) - jml_Image_getHeight(var$0.$da) | 0) / 2 | 0, 20);
        }
    }
    if (var$0.$cX == 20)
        e_if0(var$0.$aO, var$1);
    var$2 = var$0.$cX;
    if (var$2 != 20 && var$2 != 12) {
        var$2 = var$0.$cK;
        if (var$2 < 6000) {
            if (var$2 < 3000)
                e_a(var$0.$aO, var$1, GameMIDlet_a(1));
            else if (((var$0.$ca / 4 | 0) % 3 | 0) > 0)
                e_a(var$0.$aO, var$1, GameMIDlet_a(2));
        }
    }
    if (var$0.$X != (-1)) {
        var$2 = var$0.$bi;
        if (var$2 > 0) {
            if (var$2 == 2000)
                e_if(var$0.$aO);
            e_a(var$0.$aO, var$1, GameMIDlet_a(0));
        }
    }
    if (var$0.$bq > 0)
        e_a(var$0.$aO, var$1, GameMIDlet_a(12));
},
d_int0 = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9;
    var$2 = var$0.$cX;
    if (!(var$2 != 4 && var$2 != 5 && var$2 != 6)) {
        var$3 = var$0.$ar - var$0.$ap | 0;
        var$4 = var$0.$aq - var$0.$an | 0;
        var$5 = jml_Image_getHeight(var$0.$cd);
        jml_Graphics_setClip(var$1, 0, 0, 176, 144);
        jml_Graphics_clipRect(var$1, var$3, (var$4 - var$5 | 0) + 1 | 0, 40, var$5);
        var$6 = var$3 - (40 * var$0.$U | 0) | 0;
        jml_Graphics_drawImage(var$1, var$0.$cd, var$6, var$4, 36);
    }
    var$6 = ((var$0.$aV >> 4) - (var$0.$cf * 12 | 0) | 0) - jml_Image_getHeight(var$0.$cd) | 0;
    var$2 = var$0.$an;
    if (var$6 < var$2) {
        var$6 = (var$0.$aW >> 4) - var$0.$ap | 0;
        var$2 = (var$0.$aV >> 4) - var$2 | 0;
        var$3 = jml_Image_getHeight(var$0.$cd);
        jml_Graphics_setClip(var$1, 0, 0, 176, 144);
        jml_Graphics_clipRect(var$1, var$6, (var$2 - var$3 | 0) + 1 | 0, 26, var$3);
        var$6 = var$6 - (80 + (26 * var$0.$b4 | 0) | 0) | 0;
        jml_Graphics_drawImage(var$1, var$0.$cd, var$6, var$2, 36);
    }
    var$6 = 0;
    while (var$6 < 4) {
        var$7 = var$0.$cl.data;
        if (var$7[var$6] != (-1)) {
            var$8 = var$7[var$6] - var$0.$ap | 0;
            var$9 = (var$0.$cj.data[var$6] >> 4) - var$0.$an | 0;
            var$2 = var$0.$b8;
            var$3 = var$0.$c9;
            jml_Graphics_setClip(var$1, 0, 0, 176, 144);
            jml_Graphics_clipRect(var$1, var$8, var$9 - var$3 | 0, var$2, var$3);
            var$2 = var$8 + $rt_imul( -var$2 | 0, 1 + ((var$0.$ca / 6 | 0) % 2 | 0) | 0) | 0;
            jml_Graphics_drawImage(var$1, var$0.$L, var$2, var$9, 36);
        }
        var$6 = var$6 + 1 | 0;
    }
    var$6 = var$0.$b8;
    var$2 = var$0.$c9;
    var$3 = 0;
    while (var$3 < 3) {
        if (var$0.$bC.data[var$3] != (-1)) {
            var$7 = var$0.$bN.data;
            var$4 = var$3 * 2 | 0;
            var$5 = var$7[var$4] - var$0.$ap | 0;
            var$4 = var$7[var$4 + 1 | 0] - var$0.$an | 0;
            jml_Graphics_setClip(var$1, 0, 0, 176, 144);
            jml_Graphics_clipRect(var$1, var$5, (var$4 - var$2 | 0) + 1 | 0, var$6, var$2);
            var$5 = var$5 - $rt_imul(var$6, 3 + ((var$0.$ca / 2 | 0) % 2 | 0) | 0) | 0;
            jml_Graphics_drawImage(var$1, var$0.$L, var$5, var$4, 36);
        }
        var$3 = var$3 + 1 | 0;
    }
    if (var$0.$cX != 3) {
        var$6 = (var$0.$aR >> 4) - var$0.$ap | 0;
        var$2 = (var$0.$aQ >> 4) - var$0.$an | 0;
        var$3 = jml_Image_getHeight(var$0.$aU);
        jml_Graphics_setClip(var$1, 0, 0, 176, 144);
        jml_Graphics_clipRect(var$1, var$6, (var$2 - var$3 | 0) + 1 | 0, var$0.$aS, var$3);
        var$6 = var$6 - $rt_imul(var$0.$aS, var$0.$cH) | 0;
        jml_Graphics_drawImage(var$1, var$0.$aU, var$6, var$2, 36);
    }
    if (var$0.$cX == 20)
        e_a3(var$0.$aO, var$1);
},
d_a1 = (var$0, var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8) => {
    let var$9, var$10, var$11, var$12;
    var$9 = var$6 - 1 | 0;
    var$10 = var$2 + $rt_imul(var$9, var$5) | 0;
    var$11 = 0;
    a: {
        while (true) {
            if (var$11 >= var$6)
                break a;
            var$12 = var$7 % 10 | 0;
            var$7 = var$7 / 10 | 0;
            if (var$11 == var$9 && var$8)
                var$12 = 10;
            jml_Graphics_setClip(var$1, 0, 0, 176, 144);
            jml_Graphics_clipRect(var$1, var$10, var$3, var$5, jml_Image_getHeight(var$4));
            jml_Graphics_drawImage(var$1, var$4, var$10 - $rt_imul(var$12, var$5) | 0, var$3, 20);
            var$10 = var$10 - var$5 | 0;
            if (!var$8 && !var$7)
                break;
            var$11 = var$11 + 1 | 0;
        }
    }
},
d_g = var$0 => {
    return var$0.$av;
},
d_a7 = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12;
    var$2 = var$0.$bg;
    var$3 = var$0.$bJ;
    var$4 = var$0.$b1;
    var$5 = var$0.$cf;
    var$2.$for5 = var$3;
    var$2.$try2 = var$4;
    var$2.$a28 = var$5;
    var$2.$byte5 = 14;
    var$2.$goto3 = 12;
    var$6 = Long_fromInt((ji_DataInputStream_readByte(var$1) - 1 | 0) * 2 | 0);
    ji_FilterInputStream_skip(var$1, var$6);
    var$2.$if7 = ji_DataInputStream_readShort(var$1);
    var$2.$char2 = ji_DataInputStream_readShort(var$1);
    var$7 = ji_DataInputStream_readByte(var$1);
    var$8 = var$2.$long2;
    if (!(var$8 !== null && var$8.data.length == $rt_imul(var$2.$if7, var$2.$char2)))
        var$2.$long2 = $rt_createByteArray($rt_imul(var$2.$if7, var$2.$char2));
    var$9 = 8;
    var$10 = 4;
    var$4 = 15;
    if (var$7 == 8) {
        var$9 = 4;
        var$10 = 8;
        var$4 = 255;
    }
    var$5 = 0;
    a: while (var$5 < $rt_imul(var$2.$if7, var$2.$char2)) {
        var$7 = ji_DataInputStream_readInt(var$1);
        var$11 = 0;
        b: {
            while (var$11 < var$9) {
                var$8 = var$2.$long2.data;
                if (var$5 >= var$8.length)
                    break b;
                var$11 = var$11 + 1 | 0;
                var$8[var$5] = (var$7 >> (32 - $rt_imul(var$11, var$10) | 0) & var$4) << 24 >> 24;
                var$5 = var$5 + 1 | 0;
            }
            continue a;
        }
    }
    var$1 = var$0.$J;
    var$2 = var$0.$bg;
    var$12 = var$2.$long2;
    var$5 = var$2.$if7;
    var$4 = var$2.$char2;
    var$9 = var$0.$b1;
    var$10 = var$0.$cf;
    var$8 = var$0.$N;
    var$1.$new5 = var$12;
    var$1.$if12 = var$5;
    var$1.$byte6 = var$4;
    var$1.$char4 = var$9;
    var$1.$void1 = var$10;
    var$1.$null1 = var$8;
    var$0.$bL = 0;
    var$0.$bB = 0;
    var$0.$b30 = 86;
    var$0.$bU = 86;
    var$0.$co = 86;
    var$0.$b7 = 70;
    var$9 = $rt_imul(var$5, var$9) - 176 | 0;
    var$0.$cQ = var$9;
    if (var$9 < 0)
        var$0.$cQ = 0;
    var$1.$a32 = 4;
    var$1.$long5 = (-16);
},
d_for = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, var$7;
    var$2 = 1;
    if (var$1 < 0) {
        var$2 = 0;
        var$0.$cc = 0;
        var$0.$cM = ($rt_imul(var$0.$bg.$char2, var$0.$cf) - 144 | 0) - 1 | 0;
        var$0.$df = var$1 << 24 >> 24;
        var$0.$cX = 20;
        if (var$1 == (-1))
            c_try0();
        else if (var$1 == (-2))
            c_a1();
    } else if (!var$1) {
        var$0.$cc = 0;
        var$0.$cM = ($rt_imul(var$0.$Q, var$0.$cf) - 144 | 0) - 1 | 0;
        var$0.$aR = var$0.$x;
        var$0.$aQ = var$0.$w;
        var$1 = var$0.$aF;
        if (var$1 != (-1)) {
            var$0.$aR = var$1;
            var$0.$aQ = var$0.$aC;
            var$0.$aF = (-1);
            var$0.$aC = (-1);
        }
        var$0.$df = 0;
    } else if (var$1 != 1) {
        if (var$1 == 2)
            var$0.$cc = $rt_imul(var$0.$ad, var$0.$cf);
        else
            var$0.$cc = $rt_imul(var$0.$bQ.data[var$1 - 3 | 0], var$0.$cf);
        var$3 = var$0.$bQ.data;
        var$1 = var$1 - 2 | 0;
        var$0.$cM = ($rt_imul(var$3[var$1], var$0.$cf) - 144 | 0) - 1 | 0;
        var$0.$aF = var$0.$aR;
        var$0.$aC = var$0.$aQ;
        var$0.$aR = var$0.$bK.data[var$1];
        var$0.$aQ = var$0.$bI.data[var$1];
        var$0.$df = 1;
    } else {
        var$1 = var$0.$Q;
        var$4 = var$0.$cf;
        var$0.$cc = $rt_imul(var$1, var$4);
        var$0.$cM = ($rt_imul(var$0.$ad, var$4) - 144 | 0) - 1 | 0;
        var$1 = var$0.$C;
        var$0.$aR = var$1;
        var$5 = var$0.$A;
        var$0.$aQ = var$5;
        var$0.$c4 = 67000;
        var$0.$ar = var$0.$a31;
        var$0.$aq = var$0.$a210;
        var$0.$aW = var$1;
        var$0.$aV = var$5 + ((5 * var$4 | 0) * 16 | 0) | 0;
        var$6 = var$0.$bg.$long2;
        var$1 = 0;
        while (var$1 < var$0.$F) {
            var$3 = var$0.$ch0.data;
            if (var$1 >= var$3.length)
                break;
            var$7 = var$6.data;
            var$4 = var$3[var$1];
            var$7[var$4] = 23;
            var$7[var$4 + 1 | 0] = 23;
            var$1 = var$1 + 1 | 0;
        }
        var$0.$a90 = 0;
        var$1 = 0;
        while (true) {
            var$3 = var$0.$bC.data;
            if (var$1 >= var$3.length)
                break;
            var$3[var$1] = (-1);
            var$1 = var$1 + 1 | 0;
        }
        var$0.$cX = 6;
        var$0.$df = 2;
        c_byte();
    }
    if (var$2) {
        var$0.$ap = ((var$0.$aR >> 4) + (var$0.$aS / 2 | 0) | 0) - var$0.$b30 | 0;
        var$0.$an = (var$0.$aQ >> 4) - 72 | 0;
    }
    if (var$0.$ap < 0)
        var$0.$ap = 0;
    var$1 = var$0.$ap;
    var$2 = var$0.$cQ;
    if (var$1 > var$2)
        var$0.$ap = var$2;
    var$1 = var$0.$an;
    var$2 = var$0.$cc;
    if (var$1 < var$2)
        var$0.$an = var$2;
    var$1 = var$0.$an;
    var$2 = var$0.$cM;
    if (var$1 > var$2)
        var$0.$an = var$2;
    var$1 = 0;
    while (true) {
        var$3 = var$0.$bN.data;
        if (var$1 >= var$3.length)
            break;
        var$3[var$1] = (-1);
        var$1 = var$1 + 1 | 0;
    }
    var$0.$aD = (-1);
    var$1 = 0;
    while (true) {
        var$3 = var$0.$dm.data;
        if (var$1 >= var$3.length)
            break;
        var$3[var$1] = 0;
        var$0.$bC.data[var$1] = (-1);
        var$1 = var$1 + 1 | 0;
    }
},
d_commandAction = (var$0, var$1, var$2) => {
    let var$3;
    a: {
        b: {
            jml_List_$callClinit();
            if (var$1 === jml_List_SELECT_COMMAND) {
                var$3 = var$0.$y;
                if (var$2 === var$3)
                    break b;
            }
            j_$callClinit();
            if (var$1 !== j_case)
                break a;
            while (jml_List_size(var$0.$y) > 0) {
                jml_List_delete(var$0.$y, 0);
            }
            jml_Displayable_removeCommand(var$0.$y, j_case);
            var$0.$y.$listener = null;
            var$0.$y = null;
            var$0.$b5 = 1;
            break a;
        }
        if (var$3.$selected)
            var$0.$cu = 2;
        else
            var$0.$cu = 1;
        jml_Display_setCurrent(jml_Display_getDisplay(var$0.$goto1), var$0);
        while (jml_List_size(var$0.$y) > 0) {
            jml_List_delete(var$0.$y, 0);
        }
        var$1 = var$0.$y;
        j_$callClinit();
        jml_Displayable_removeCommand(var$1, j_case);
        var$0.$y.$listener = null;
        var$0.$y = null;
    }
},
d_l = var$0 => {
    let var$1, var$2, var$3, var$4, var$5, var$6, $$je;
    var$0.$bb = 0;
    var$0.$cu = 0;
    var$0.$t = 0;
    a: {
        b: {
            try {
                var$0.$ab = jml_Image_createImage($rt_s(57));
                var$0.$cr = jml_Image_createImage($rt_s(58));
                var$0.$cv = jml_Image_createImage($rt_s(59));
                var$0.$Y = jml_Image_createImage($rt_s(50));
                var$0.$cd = jml_Image_createImage($rt_s(51));
                var$0.$aU = jml_Image_createImage($rt_s(52));
                var$0.$L = jml_Image_createImage($rt_s(53));
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    var$1 = $$je;
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        jl_Throwable_printStackTrace(var$1);
    }
    var$0.$b8 = jml_Image_getWidth(var$0.$L) / 5 | 0;
    var$0.$c9 = jml_Image_getHeight(var$0.$L);
    var$0.$aB = jml_Image_createImage0(5, 144);
    var$0.$aA = jml_Image_createImage0(5, 144);
    var$2 = 0;
    var$1 = jml_Image_getGraphics(var$0.$aB);
    while (var$2 < jml_Image_getHeight(var$0.$aB)) {
        jml_Graphics_setClip(var$1, 0, var$2, 5, 8);
        jml_Graphics_drawImage(var$1, var$0.$cr, (-22), var$2, 20);
        var$2 = var$2 + 8 | 0;
    }
    var$2 = 0;
    var$1 = jml_Image_getGraphics(var$0.$aA);
    while (var$2 < jml_Image_getHeight(var$0.$aA)) {
        jml_Graphics_setClip(var$1, 0, var$2, 5, 8);
        jml_Graphics_drawImage(var$1, var$0.$cr, (-27), var$2, 20);
        var$2 = var$2 + 8 | 0;
    }
    var$0.$b60 = 1;
    var$0.$cW = 0;
    var$0.$cU = 0;
    var$0.$cC = 1;
    var$0.$aZ = (-1);
    var$0.$aY = (-1);
    var$0.$aq = 0;
    var$0.$aQ = 0;
    var$0.$b2 = 0;
    var$0.$cH = 3;
    var$0.$cO = $rt_createByteArray(20);
    var$0.$bG = $rt_createByteArray(20);
    var$0.$S = $rt_createByteArray(40);
    var$0.$af = 0;
    var$0.$u = 0;
    var$0.$dj = 72;
    var$0.$bj = 72;
    var$0.$cB = 72;
    var$0.$ao = 72;
    var$0.$aG = 0;
    var$3 = $rt_createIntArray(28);
    var$4 = var$3.data;
    var$0.$bF = var$3;
    var$4[0] = 0;
    var$4[1] = 0;
    var$4[2] = 4;
    var$4[3] = 0;
    var$4[4] = 0;
    var$4[5] = 3;
    var$4[6] = 4;
    var$4[7] = 3;
    var$2 = 8;
    var$5 = 1;
    while (var$5 < 3) {
        var$6 = var$2 + (var$5 * 4 | 0) | 0;
        var$4[var$6] = var$5;
        var$4[var$6 + 1 | 0] = 0;
        var$4[var$6 + 2 | 0] = var$5;
        var$4[var$6 + 3 | 0] = 3;
        var$2 = var$2 + 4 | 0;
        var$5 = var$5 + 1 | 0;
    }
    var$5 = 1;
    while (var$5 < 2) {
        var$6 = var$2 + (var$5 * 4 | 0) | 0;
        var$4[var$6] = 0;
        var$4[var$6 + 1 | 0] = var$5;
        var$4[var$6 + 2 | 0] = 4;
        var$4[var$6 + 3 | 0] = var$5;
        var$2 = var$2 + 4 | 0;
        var$5 = var$5 + 1 | 0;
    }
},
d_int = (var$0, var$1, var$2) => {
    let var$3, var$4;
    a: {
        switch (var$0.$cX) {
            case 22:
                break;
            default:
                break a;
        }
        if (!var$0.$aG) {
            if (!(var$1 != 50 && var$2 != 1 && var$1 != 49 && var$1 != 51)) {
                var$3 = var$0.$cU;
                if (var$3 > 0)
                    var$0.$cU = var$3 - 1 | 0;
            }
            if (!(var$1 != 56 && var$2 != 6 && var$1 != 55 && var$1 != 57)) {
                var$4 = var$0.$cU;
                if (var$4 < 3)
                    var$0.$cU = var$4 + 1 | 0;
            }
            if (!(var$1 != 52 && var$2 != 2 && var$1 != 49 && var$1 != 55)) {
                var$4 = var$0.$cW;
                if (var$4 > 0)
                    var$0.$cW = var$4 - 1 | 0;
            }
            if (!(var$1 != 54 && var$2 != 5 && var$1 != 51 && var$1 != 57)) {
                var$4 = var$0.$cW;
                if (var$4 < 4)
                    var$0.$cW = var$4 + 1 | 0;
            }
            if (!(var$1 != 53 && var$2 != 8)) {
                d_o(var$0);
                if (var$0.$cC) {
                    var$0.$aZ = var$0.$cW;
                    var$0.$aY = var$0.$cU;
                }
            }
        } else
            return;
    }
},
d_o = var$0 => {
    let var$1, var$2, var$3;
    a: {
        b: {
            var$1 = var$0.$cW + (var$0.$cU * 5 | 0) | 0;
            var$2 = var$0.$cO.data;
            if (var$2[var$1]) {
                var$3 = var$0.$t;
                if (!(!var$3 && !(var$2[var$1] & 8))) {
                    if (var$3 != 1)
                        break b;
                    if (!(var$2[var$1] & 8))
                        break b;
                }
            }
            var$1 = 1;
            break a;
        }
        var$1 = 0;
    }
    var$0.$cC = var$1;
},
d_char = (var$0, var$1, var$2) => {
    let var$3, var$4, var$5, var$6, var$7, var$8, var$9, $$je;
    a: {
        var$3 = var$0.$cu;
        if (var$3 == 1) {
            jml_Display_setCurrent(jml_Display_getDisplay(var$0.$goto1), var$0);
            d_e(var$0);
            var$0.$c6 = 0;
            e_a0(var$0.$aO, $rt_s(45));
            d_for(var$0, (-1));
            var$0.$cu = 0;
        } else if (var$3 == 2) {
            jml_Display_setCurrent(jml_Display_getDisplay(var$0.$goto1), var$0);
            d_l(var$0);
            var$0.$cX = 22;
            var$0.$cu = 0;
        } else {
            var$3 = var$0.$cX;
            if (var$3 == 21) {
                var$4 = jml_Display_getDisplay(var$0.$goto1);
                var$5 = var$4.$current;
                var$6 = var$0.$y;
                if (var$5 !== var$6)
                    jml_Display_setCurrent(var$4, var$6);
                b: {
                    try {
                        break a;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_Exception) {
                            break b;
                        } else {
                            throw $$e;
                        }
                    }
                }
            } else {
                var$2 = var$0.$ca + 1 | 0;
                var$0.$ca = var$2;
                if (!(var$2 % 2 | 0)) {
                    var$7 = var$0.$dj;
                    var$8 = var$0.$bj;
                    var$9 = $rt_compare(var$7, var$8);
                    if (var$9 < 0) {
                        var$9 = var$7 + 1 | 0;
                        var$0.$dj = var$9;
                        if ((var$8 - var$9 | 0) > 10)
                            var$0.$dj = var$9 + 1 | 0;
                    } else if (var$9 > 0) {
                        var$9 = var$7 - 1 | 0;
                        var$0.$dj = var$9;
                        if ((var$9 - var$8 | 0) > 10)
                            var$0.$dj = var$9 - 1 | 0;
                    }
                    var$9 = var$0.$cB;
                    var$7 = var$0.$ao;
                    var$8 = $rt_compare(var$9, var$7);
                    if (var$8 < 0) {
                        var$9 = var$9 + 1 | 0;
                        var$0.$cB = var$9;
                        if ((var$7 - var$9 | 0) > 10)
                            var$0.$cB = var$9 + 1 | 0;
                    } else if (var$8 > 0) {
                        var$9 = var$9 - 1 | 0;
                        var$0.$cB = var$9;
                        if ((var$9 - var$7 | 0) > 10)
                            var$0.$cB = var$9 - 1 | 0;
                    }
                }
                var$9 = var$0.$aG;
                if (var$9) {
                    var$1 = var$0.$b2 + var$1 | 0;
                    var$0.$b2 = var$1;
                    if (var$1 > 5000) {
                        var$0.$av = 0;
                        var$0.$b5 = 1;
                    }
                }
                c: {
                    d: {
                        e: {
                            switch (var$3) {
                                case 22:
                                    break e;
                                case 23:
                                    break c;
                                case 24:
                                    break;
                                case 25:
                                    break d;
                                default:
                                    break a;
                            }
                            if (var$9)
                                break a;
                            d_b(var$0);
                            var$0.$p = 0;
                            var$0.$cX = 25;
                            break a;
                        }
                        d_o(var$0);
                        var$1 = var$0.$aZ;
                        if (var$1 == (-1))
                            break a;
                        d_a(var$0, var$0.$cO, var$1, var$0.$aY, var$0.$t);
                        if (!d_if(var$0, var$0.$cO, var$0.$aZ, var$0.$aY, var$0.$t))
                            d_j(var$0);
                        else {
                            var$0.$bA = var$0.$aZ + (var$0.$aY * 5 | 0) | 0;
                            var$0.$a00 = 0;
                            var$0.$p = var$0.$ca;
                            var$0.$cX = 23;
                        }
                        var$0.$aZ = (-1);
                        break a;
                    }
                    var$0.$U = 1;
                    var$1 = var$0.$p + 1 | 0;
                    var$0.$p = var$1;
                    if (var$1 != 20)
                        break a;
                    var$0.$U = 0;
                    d_a(var$0, var$0.$cO, var$0.$cq, var$0.$cp, var$0.$t);
                    if (!d_if(var$0, var$0.$cO, var$0.$cq, var$0.$cp, var$0.$t)) {
                        d_j(var$0);
                        break a;
                    }
                    var$0.$bA = var$0.$cq + (var$0.$cp * 5 | 0) | 0;
                    var$0.$a00 = 0;
                    var$0.$p = var$0.$ca;
                    var$0.$cX = 23;
                    break a;
                }
                var$1 = var$2 - var$0.$p | 0;
                if (!(var$1 > 0 && var$1 < 10))
                    var$1 = 10;
                var$0.$a00 = var$1;
                if (var$1 == 10) {
                    var$1 = var$0.$bA;
                    var$2 = var$1 % 5 | 0;
                    var$1 = var$1 / 5 | 0;
                    d_a2(var$0, var$0.$cO, var$2, var$1);
                    var$1 = d_do(var$0, var$0.$cO);
                    d_h(var$0);
                    if (!var$0.$aG) {
                        d_a0(var$0, var$0.$cO);
                        var$2 = var$0.$P;
                        if (!(var$2 && var$0.$O)) {
                            if (var$2) {
                                var$0.$ao = var$0.$ao + 20 | 0;
                                var$0.$aG = 1;
                                c_a1();
                            } else {
                                var$0.$bj = var$0.$bj + 20 | 0;
                                var$0.$aG = 2;
                                c_byte();
                            }
                        }
                    }
                    if (var$1 == (-1))
                        d_j(var$0);
                    else {
                        var$0.$bA = var$1;
                        var$0.$a00 = 0;
                        var$0.$p = var$0.$ca;
                    }
                }
            }
        }
    }
},
d_a2 = (var$0, var$1, var$2, var$3) => {
    if (var$2 > 0)
        d_a(var$0, var$1, var$2 - 1 | 0, var$3, var$0.$t);
    if (var$2 < 4)
        d_a(var$0, var$1, var$2 + 1 | 0, var$3, var$0.$t);
    if (var$3 > 0)
        d_a(var$0, var$1, var$2, var$3 - 1 | 0, var$0.$t);
    if (var$3 < 3)
        d_a(var$0, var$1, var$2, var$3 + 1 | 0, var$0.$t);
},
d_do = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5;
    var$2 = 0;
    var$3 = 0;
    while (!var$3) {
        var$4 = var$0.$af;
        var$5 = var$0.$u;
        if (var$4 == var$5)
            break;
        var$2 = var$0.$S.data[var$5];
        var$3 = d_if(var$0, var$1, var$2 % 5 | 0, var$2 / 5 | 0, var$0.$t);
        var$4 = var$0.$u + 1 | 0;
        var$0.$u = var$4;
        var$0.$u = var$4 % var$0.$S.data.length | 0;
    }
    if (!var$3)
        return (-1);
    return var$2;
},
d_b = var$0 => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13;
    ju_Random_nextInt(var$0.$aH);
    d_a0(var$0, var$0.$bG);
    var$1 = var$0.$O;
    var$2 = $rt_createIntArray(3).data;
    var$2[0] = 0;
    var$2[1] = 0;
    var$2[2] = 0;
    var$3 = $rt_createIntArray(3).data;
    var$3[0] = 0;
    var$3[1] = 0;
    var$3[2] = 0;
    var$4 = $rt_createIntArray(3).data;
    var$4[0] = 0;
    var$4[1] = 0;
    var$4[2] = 0;
    var$5 = 0;
    while (var$5 < 4) {
        var$6 = 0;
        while (var$6 < 5) {
            var$7 = var$0.$cO;
            var$8 = var$7.data;
            jl_System_fastArraycopy(var$7, 0, var$0.$bG, 0, var$8.length);
            var$9 = var$6 + (var$5 * 5 | 0) | 0;
            var$7 = var$0.$bG;
            var$10 = var$7.data;
            if (!(var$10[var$9] && !(var$10[var$9] & 8)) ? 1 : 0) {
                var$10[var$9] = (var$10[var$9] + 1 | 0) << 24 >> 24;
                var$10[var$9] = (var$10[var$9] | 8) << 24 >> 24;
                d_if(var$0, var$7, var$6, var$5, var$0.$t);
                var$11 = 0;
                a: {
                    while (true) {
                        if (var$0.$af == var$0.$u)
                            break a;
                        var$12 = var$9 % 5 | 0;
                        var$13 = var$9 / 5 | 0;
                        d_a2(var$0, var$0.$bG, var$12, var$13);
                        var$9 = d_do(var$0, var$0.$bG);
                        var$11 = var$11 + 1 | 0;
                        if (var$11 <= 5)
                            continue;
                        var$11 = 0;
                        d_a0(var$0, var$0.$bG);
                        if (!var$0.$P)
                            break a;
                        if (!var$0.$O)
                            break;
                    }
                }
                d_a0(var$0, var$0.$bG);
                var$11 = var$2[0];
                var$12 = var$0.$O;
                if (var$11 < var$12) {
                    var$11 = 0;
                    while (var$11 < var$2.length && var$12 > var$2[var$11]) {
                        var$11 = var$11 + 1 | 0;
                    }
                    var$11 = var$11 + (-1) | 0;
                    var$13 = var$11;
                    while (var$13 > 0) {
                        var$9 = var$13 - 1 | 0;
                        var$2[var$9] = var$2[var$13];
                        var$3[var$9] = var$3[var$13];
                        var$4[var$9] = var$4[var$13];
                        var$13 = var$13 + (-1) | 0;
                    }
                    var$2[var$11] = var$12;
                    var$3[var$11] = var$6;
                    var$4[var$11] = var$5;
                }
            }
            var$6 = var$6 + 1 | 0;
        }
        var$5 = var$5 + 1 | 0;
    }
    var$11 = var$2.length;
    if (var$2[var$11 - 1 | 0] != (var$1 + 1 | 0))
        var$1 = var$11;
    else {
        var$1 = 0;
        var$13 = 0;
        b: {
            c: {
                while (true) {
                    var$7 = var$0.$bF.data;
                    if (var$13 >= var$7.length)
                        break;
                    var$12 = var$7[var$13];
                    var$9 = var$13 + 1 | 0;
                    var$12 = var$12 + (var$7[var$9] * 5 | 0) | 0;
                    if (var$0.$cO.data[var$12] ? 0 : 1) {
                        var$3[var$1] = var$7[var$13];
                        var$4[var$1] = var$7[var$9];
                        var$1 = var$1 + 1 | 0;
                        if (var$1 == var$11)
                            break c;
                    }
                    var$13 = var$13 + 2 | 0;
                }
                break b;
            }
        }
        if (!var$1)
            var$1 = var$11;
    }
    var$11 = var$3.length - 1 | 0;
    var$12 = ju_Random_nextInt(var$0.$aH) % 100 | 0;
    if (var$12 < 40 && var$12 > (-40)) {
        var$11 = ju_Random_nextInt(var$0.$aH) % var$1 | 0;
        if (var$11 < 0)
            var$11 =  -var$11 | 0;
    }
    var$0.$cq = var$3[var$11];
    var$0.$cp = var$4[var$11];
},
d_h = var$0 => {
    let var$1, var$2, var$3;
    d_a0(var$0, var$0.$cO);
    var$1 = var$0.$P;
    var$2 = var$0.$O;
    var$3 = var$1 + var$2 | 0;
    if (var$3) {
        var$1 = 144 - (((10080 * var$1 | 0) / var$3 | 0) / 100 | 0) | 0;
        var$0.$bj = var$1;
        var$2 = 144 - (((10080 * var$2 | 0) / var$3 | 0) / 100 | 0) | 0;
        var$0.$ao = var$2;
        var$3 = var$0.$aG;
        if (var$3 == 2)
            var$0.$bj = var$1 + 30 | 0;
        else if (var$3 == 1)
            var$0.$ao = var$2 + 30 | 0;
    }
},
d_j = var$0 => {
    let var$1;
    var$1 = var$0.$t + 1 | 0;
    var$0.$t = var$1;
    var$1 = var$1 % 2 | 0;
    var$0.$t = var$1;
    if (var$1 != 1)
        var$0.$cX = 22;
    else
        var$0.$cX = 24;
},
d_if = (var$0, var$1, var$2, var$3, var$4) => {
    let var$5, var$6;
    var$5 = 4;
    if (!(var$2 && (var$2 + 1 | 0) != 5))
        var$5 = 3;
    if (!(var$3 && (var$3 + 1 | 0) != 4))
        var$5 = var$5 + (-1) | 0;
    var$1 = var$1.data;
    var$4 = var$3 * 5 | 0;
    var$6 = var$2 + var$4 | 0;
    if ((var$1[var$6] & 7) == var$5) {
        var$1[var$6] = 0;
        if (var$2 > 0) {
            var$1 = var$0.$S.data;
            var$6 = var$0.$af;
            var$1[var$6] = ((var$2 - 1 | 0) + var$4 | 0) << 24 >> 24;
            var$6 = var$6 + 1 | 0;
            var$0.$af = var$6;
            var$0.$af = var$6 % var$1.length | 0;
        }
        if (var$2 < 4) {
            var$1 = var$0.$S.data;
            var$6 = var$0.$af;
            var$1[var$6] = ((var$2 + 1 | 0) + var$4 | 0) << 24 >> 24;
            var$4 = var$6 + 1 | 0;
            var$0.$af = var$4;
            var$0.$af = var$4 % var$1.length | 0;
        }
        if (var$3 > 0) {
            var$1 = var$0.$S.data;
            var$4 = var$0.$af;
            var$1[var$4] = (var$2 + ((var$3 - 1 | 0) * 5 | 0) | 0) << 24 >> 24;
            var$4 = var$4 + 1 | 0;
            var$0.$af = var$4;
            var$0.$af = var$4 % var$1.length | 0;
        }
        if (var$3 < 3) {
            var$1 = var$0.$S.data;
            var$6 = var$0.$af;
            var$1[var$6] = (var$2 + ((var$3 + 1 | 0) * 5 | 0) | 0) << 24 >> 24;
            var$2 = var$6 + 1 | 0;
            var$0.$af = var$2;
            var$0.$af = var$2 % var$1.length | 0;
        }
        return 1;
    }
    return 0;
},
d_a = (var$0, var$1, var$2, var$3, var$4) => {
    let var$5, var$6;
    var$5 = var$2 + (var$3 * 5 | 0) | 0;
    var$6 = 4;
    if (!(var$2 && var$2 != 4))
        var$6 = 3;
    if (!(var$3 && var$3 != 3))
        var$6 = var$6 + (-1) | 0;
    var$1 = var$1.data;
    if ((var$1[var$5] & 7) < var$6)
        var$1[var$5] = (var$1[var$5] + 1 | 0) << 24 >> 24;
    if (!var$4)
        var$1[var$5] = (var$1[var$5] & 7) << 24 >> 24;
    else if (var$4 == 1)
        var$1[var$5] = (var$1[var$5] | 8) << 24 >> 24;
},
d_a0 = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5;
    var$0.$P = 0;
    var$0.$O = 0;
    var$2 = 0;
    var$3 = 0;
    while (var$3 < 4) {
        var$4 = 0;
        while (var$4 < 5) {
            var$5 = var$1.data;
            if (!(var$5[var$2] & 8))
                var$0.$P = var$0.$P + var$5[var$2] | 0;
            else
                var$0.$O = var$0.$O + (var$5[var$2] & 7) | 0;
            var$4 = var$4 + 1 | 0;
            var$2 = var$2 + 1 | 0;
        }
        var$3 = var$3 + 1 | 0;
    }
},
d_a8 = (var$0, var$1, var$2, var$3, var$4) => {
    let var$5, var$6;
    var$5 = var$2 + 2 | 0;
    var$2 = var$3 + 2 | 0;
    var$3 = 0;
    if (var$4 & 8) {
        var$4 = var$4 & 7;
        var$3 = 11;
    }
    if (var$4 > 0) {
        jml_Graphics_setClip(var$1, var$5, var$2, 11, 11);
        jml_Graphics_drawImage(var$1, var$0.$cr, var$5 - var$3 | 0, var$2, 20);
    }
    if (var$4 > 1) {
        var$6 = var$5 + 11 | 0;
        jml_Graphics_setClip(var$1, var$6, var$2, 11, 11);
        jml_Graphics_drawImage(var$1, var$0.$cr, var$6 - var$3 | 0, var$2, 20);
    }
    if (var$4 > 2) {
        var$6 = var$2 + 11 | 0;
        jml_Graphics_setClip(var$1, var$5, var$6, 11, 11);
        jml_Graphics_drawImage(var$1, var$0.$cr, var$5 - var$3 | 0, var$6, 20);
    }
    if (var$4 > 3) {
        var$4 = var$5 + 11 | 0;
        var$2 = var$2 + 11 | 0;
        jml_Graphics_setClip(var$1, var$4, var$2, 11, 11);
        jml_Graphics_drawImage(var$1, var$0.$cr, var$4 - var$3 | 0, var$2, 20);
    }
},
d_a6 = (var$0, var$1, var$2, var$3, var$4, var$5, var$6, var$7) => {
    let var$8, var$9, var$10;
    var$2 = var$2 + (var$4 * 25 | 0) | 0;
    var$3 = var$3 + (var$5 * 25 | 0) | 0;
    var$2 = var$2 + 2 | 0;
    var$8 = var$3 + 2 | 0;
    var$9 = 0;
    if (var$6 == 1)
        var$9 = 11;
    var$10 = (25 * var$0.$a00 | 0) / 10 | 0;
    if (var$4 > 0) {
        jml_Graphics_setClip(var$1, var$2 - var$10 | 0, var$8, 11, 11);
        jml_Graphics_drawImage(var$1, var$0.$cr, (var$2 - var$9 | 0) - var$10 | 0, var$8, 20);
    }
    if (var$4 < 4) {
        jml_Graphics_setClip(var$1, (var$2 + var$10 | 0) + 11 | 0, var$8, 11, 11);
        jml_Graphics_drawImage(var$1, var$0.$cr, ((var$2 - var$9 | 0) + var$10 | 0) + 11 | 0, var$8, 20);
    }
    if (var$5 > 0) {
        var$3 = var$2 + 11 | 0;
        var$4 = var$8 - var$10 | 0;
        jml_Graphics_setClip(var$1, var$3, var$4, 11, 11);
        jml_Graphics_drawImage(var$1, var$0.$cr, (var$2 - var$9 | 0) + 11 | 0, var$4, 20);
    }
    if (var$5 < 3) {
        var$3 = (var$8 + var$10 | 0) + 11 | 0;
        jml_Graphics_setClip(var$1, var$2, var$3, 11, 11);
        jml_Graphics_drawImage(var$1, var$0.$cr, var$2 - var$9 | 0, var$3, 20);
    }
},
d_if0 = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8;
    if (var$0.$cX == 21) {
        jml_Graphics_setColor(var$1, 255, 255, 255);
        jml_Graphics_fillRect(var$1, 0, 0, jml_Canvas_getWidth(var$0), jml_Canvas_getHeight(var$0));
    } else {
        var$2 = (g_i(var$0.$dg) - jml_Image_getWidth(var$0.$ab) | 0) / 2 | 0;
        var$3 = ((g_k(var$0.$dg) - jml_Image_getHeight(var$0.$ab) | 0) / 2 | 0) - 1 | 0;
        d_do1(var$0, var$1);
        jml_Graphics_setClip(var$1, 0, 0, jml_Canvas_getWidth(var$0), jml_Canvas_getHeight(var$0));
        jml_Graphics_drawImage(var$1, var$0.$ab, var$2, var$3, 20);
        var$2 = var$2 + 1 | 0;
        var$4 = var$3 + 1 | 0;
        var$5 = g_c(var$0.$dg);
        var$6 = g_e(var$0.$dg);
        g_goto(var$0.$dg);
        g_f(var$0.$dg);
        var$3 = 0;
        var$7 = 0;
        while (var$7 < 4) {
            var$8 = 0;
            while (var$8 < 5) {
                d_a8(var$0, var$1, var$2 + $rt_imul(var$8, var$5) | 0, var$4 + $rt_imul(var$7, var$6) | 0, var$0.$cO.data[var$3]);
                var$8 = var$8 + 1 | 0;
                var$3 = var$3 + 1 | 0;
            }
            var$7 = var$7 + 1 | 0;
        }
        if (var$0.$cX == 23) {
            var$3 = var$0.$bA;
            var$7 = var$3 % 5 | 0;
            var$3 = var$3 / 5 | 0;
            jml_Graphics_setClip(var$1, 0, 0, jml_Canvas_getWidth(var$0), jml_Canvas_getHeight(var$0));
            d_a6(var$0, var$1, var$2, var$4, var$7, var$3, var$0.$t, var$0.$a00);
        }
        if (var$0.$cX == 22 && !var$0.$aG) {
            var$3 = jml_Image_getWidth(var$0.$cv) / 2 | 0;
            var$7 = jml_Image_getHeight(var$0.$cv);
            var$2 = (var$2 + $rt_imul(var$0.$cW, var$5) | 0) - ((var$3 - var$5 | 0) / 2 | 0) | 0;
            var$4 = (var$4 + $rt_imul(var$0.$cU, var$6) | 0) - ((var$7 - var$6 | 0) / 2 | 0) | 0;
            jml_Graphics_setClip(var$1, var$2, var$4, var$3, var$7);
            if (var$0.$cC && !((var$0.$ca / 16 | 0) % 2 | 0))
                var$2 = var$2 - (jml_Image_getWidth(var$0.$cv) / 2 | 0) | 0;
            jml_Graphics_drawImage(var$1, var$0.$cv, var$2, var$4, 20);
        }
        jml_Graphics_setClip(var$1, 0, 0, g_i(var$0.$dg), g_k(var$0.$dg));
        var$2 = var$0.$dj;
        var$4 = var$0.$cB;
        jml_Graphics_drawImage(var$1, var$0.$aB, g_try(var$0.$dg), var$0.$dj, 20);
        jml_Graphics_drawImage(var$1, var$0.$aA, g_g(var$0.$dg), var$0.$cB, 20);
        var$2 = var$2 + var$0.$aQ | 0;
        var$5 = g_try(var$0.$dg) - ((var$0.$aS - jml_Image_getWidth(var$0.$aB) | 0) / 2 | 0) | 0;
        var$6 = jml_Image_getHeight(var$0.$aU);
        jml_Graphics_clipRect(var$1, var$5, var$2 - var$6 | 0, var$0.$aS, var$6);
        var$5 = var$5 - $rt_imul(var$0.$aS, var$0.$cH) | 0;
        jml_Graphics_drawImage(var$1, var$0.$aU, var$5, var$2, 36);
        var$2 = g_byte(var$0.$dg);
        var$4 = var$4 + var$0.$aq | 0;
        var$5 = (g_g(var$0.$dg) - ((var$2 - jml_Image_getWidth(var$0.$aA) | 0) / 2 | 0) | 0) - 1 | 0;
        var$6 = jml_Image_getHeight(var$0.$cd);
        jml_Graphics_setClip(var$1, 0, 0, g_i(var$0.$dg), g_k(var$0.$dg));
        jml_Graphics_clipRect(var$1, var$5, var$4 - var$6 | 0, var$2, var$6);
        var$2 = var$5 - $rt_imul(var$2, var$0.$U) | 0;
        jml_Graphics_drawImage(var$1, var$0.$cd, var$2, var$4, 36);
        if (var$0.$cX == 25) {
            var$2 = $rt_imul(var$0.$cq, g_c(var$0.$dg));
            var$4 = $rt_imul(var$0.$cp, g_e(var$0.$dg));
            var$2 = var$2 + ((g_i(var$0.$dg) - jml_Image_getWidth(var$0.$ab) | 0) / 2 | 0) | 0;
            var$4 = var$4 + (((g_k(var$0.$dg) - jml_Image_getHeight(var$0.$ab) | 0) / 2 | 0) - 1 | 0) | 0;
            var$2 = var$2 + ((g_c(var$0.$dg) - var$0.$b8 | 0) / 2 | 0) | 0;
            var$5 = g_e(var$0.$dg);
            var$6 = var$0.$c9;
            var$4 = var$4 + ((var$5 - var$6 | 0) / 2 | 0) | 0;
            var$5 = var$0.$b8;
            jml_Graphics_setClip(var$1, var$2, var$4, var$5, var$6);
            var$2 = var$2 - $rt_imul(var$5, 3 + ((var$0.$ca / 2 | 0) % 2 | 0) | 0) | 0;
            jml_Graphics_drawImage(var$1, var$0.$L, var$2, var$4, 20);
        }
        if (var$0.$b2 > 1500) {
            var$2 = (g_i(var$0.$dg) - jml_Image_getWidth(var$0.$Y) | 0) / 2 | 0;
            var$4 = (g_k(var$0.$dg) - (jml_Image_getHeight(var$0.$Y) / 2 | 0) | 0) / 2 | 0;
            jml_Graphics_setClip(var$1, var$2, var$4, jml_Image_getWidth(var$0.$Y), jml_Image_getHeight(var$0.$Y) / 2 | 0);
            jml_Graphics_drawImage(var$1, var$0.$Y, var$2, var$4, 20);
        }
    }
},
c = $rt_classWithoutFields(),
c_char = 0,
c_goto = null,
c_long = null,
c_null = null;
let c_case = null,
c_new = null,
c_a0 = null,
c_byte0 = null,
c_if = null,
c_for = null,
c_else = null,
c_do = null,
c_int = null,
c_try = null,
c_$callClinit = () => {
    c_$callClinit = $rt_eraseClinit(c);
    c__clinit_();
},
c_a = (var$1, var$2, var$3) => {
    let var$4, var$5, var$6;
    c_$callClinit();
    var$4 = var$3.data;
    var$5 = ji_DataInputStream__init_(w_Resources_open(jl_Object_getClass(var$1), var$2));
    var$1 = var$5.$in;
    var$6 = var$4.length;
    var$4 = $rt_createByteArray(ji_ByteArrayInputStream_read(var$1, var$3, 0, var$6));
    jl_System_fastArraycopy(var$3, 0, var$4, 0, var$4.data.length);
    var$1 = new cnms_Sound;
    var$1.$id0 = globalThis.mikiPlatform.sound($rt_ustr(w_Resources_binary(var$4)));
    ji_FilterInputStream_close(var$5);
    return var$1;
},
c_a4 = var$1 => {
    let var$2, $$je;
    c_$callClinit();
    a: {
        b: {
            try {
                var$2 = $rt_createByteArray(1000);
                c_goto = c_a(var$1, $rt_s(60), var$2);
                c_long = c_a(var$1, $rt_s(61), var$2);
                c_null = c_a(var$1, $rt_s(62), var$2);
                c_case = c_a(var$1, $rt_s(63), var$2);
                c_new = c_a(var$1, $rt_s(64), var$2);
                c_a0 = c_a(var$1, $rt_s(65), var$2);
                c_byte0 = c_a(var$1, $rt_s(66), var$2);
                c_if = c_a(var$1, $rt_s(67), var$2);
                c_for = c_a(var$1, $rt_s(68), var$2);
                c_else = c_a(var$1, $rt_s(69), var$2);
                c_do = c_a(var$1, $rt_s(70), var$2);
                c_int = c_a(var$1, $rt_s(71), var$2);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    var$1 = $$je;
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        jl_Throwable_printStackTrace(var$1);
    }
},
c_a2 = var$1 => {
    let var$2;
    c_$callClinit();
    c_char = var$1;
    if (!var$1) {
        var$2 = c_try;
        if (var$2 !== null)
            cnms_Sound_stop(var$2);
    }
},
c_a3 = var$1 => {
    c_$callClinit();
    a: {
        b: {
            c: {
                switch (var$1) {
                    case 0:
                        break;
                    case 1:
                        break c;
                    case 2:
                        break b;
                    default:
                        break a;
                }
                c_int0();
                break a;
            }
            c_byte();
            break a;
        }
        c_long0();
    }
},
c_case0 = () => {
    c_$callClinit();
    if (c_char) {
        cnms_Sound_play(c_do, 3);
        c_try = c_do;
    }
},
c_byte = () => {
    c_$callClinit();
    if (c_char) {
        cnms_Sound_play(c_else, 1);
        c_try = c_else;
    }
},
c_int0 = () => {
    c_$callClinit();
    if (c_char) {
        cnms_Sound_play(c_null, 1);
        c_try = c_null;
    }
},
c_for0 = () => {
    c_$callClinit();
    if (c_char) {
        cnms_Sound_play(c_case, 1);
        c_try = c_case;
    }
},
c_long0 = () => {
    c_$callClinit();
    if (c_char) {
        cnms_Sound_play(c_new, 1);
        c_try = c_new;
    }
},
c_try0 = () => {
    c_$callClinit();
    if (c_char) {
        cnms_Sound_play(c_goto, 1);
        c_try = c_goto;
    }
},
c_do0 = () => {
    c_$callClinit();
    if (c_char) {
        cnms_Sound_play(c_long, 1);
        c_try = c_long;
    }
},
c_new0 = () => {
    c_$callClinit();
    if (c_char) {
        cnms_Sound_play(c_if, 1);
        c_try = c_if;
    }
},
c_goto0 = () => {
    c_$callClinit();
    if (c_char) {
        cnms_Sound_play(c_int, 1);
        c_try = c_int;
    }
},
c_if0 = () => {
    c_$callClinit();
    if (c_char) {
        cnms_Sound_play(c_for, 1);
        c_try = c_for;
    }
},
c_a1 = () => {
    c_$callClinit();
    if (c_char) {
        cnms_Sound_play(c_a0, 1);
        c_try = c_a0;
    }
},
c__clinit_ = () => {
    c_char = 1;
    c_try = null;
},
jl_System = $rt_classWithoutFields(),
jl_System_errCache = null,
jl_System_properties = null,
jl_System_arraycopy = ($src, $srcPos, $dest, $destPos, $length) => {
    let $srcType, $targetType, $srcArray, $i, var$10, var$11, var$12, $elem;
    if ($src !== null && $dest !== null) {
        if ($srcPos >= 0 && $destPos >= 0 && $length >= 0 && ($srcPos + $length | 0) <= jlr_Array_getLength($src) && ($destPos + $length | 0) <= jlr_Array_getLength($dest)) {
            a: {
                b: {
                    if ($src !== $dest) {
                        $srcType = jl_Class_getComponentType(jl_Object_getClass($src));
                        $targetType = jl_Class_getComponentType(jl_Object_getClass($dest));
                        if ($srcType !== null && $targetType !== null) {
                            if ($srcType === $targetType)
                                break b;
                            if (!jl_Class_isPrimitive($srcType) && !jl_Class_isPrimitive($targetType)) {
                                $srcArray = $src;
                                $i = 0;
                                var$10 = $srcPos;
                                while ($i < $length) {
                                    c: {
                                        d: {
                                            var$11 = $srcArray.data;
                                            var$12 = var$10 + 1 | 0;
                                            $elem = var$11[var$10];
                                            if ($elem !== null) {
                                                $elem = jl_Object_getClass($elem);
                                                if ($rt_isAssignable($elem.$classInfo, $targetType.$classInfo))
                                                    break d;
                                            }
                                            var$10 = 0;
                                            break c;
                                        }
                                        var$10 = 1;
                                    }
                                    if (!var$10) {
                                        jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $i);
                                        $src = new jl_ArrayStoreException;
                                        jl_Exception__init_0($src);
                                        $rt_throw($src);
                                    }
                                    $i = $i + 1 | 0;
                                    var$10 = var$12;
                                }
                                jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                                return;
                            }
                            if (!jl_Class_isPrimitive($srcType))
                                break a;
                            if (jl_Class_isPrimitive($targetType))
                                break b;
                            else
                                break a;
                        }
                        $src = new jl_ArrayStoreException;
                        jl_Exception__init_0($src);
                        $rt_throw($src);
                    }
                }
                jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                return;
            }
            $src = new jl_ArrayStoreException;
            jl_Exception__init_0($src);
            $rt_throw($src);
        }
        $src = new jl_IndexOutOfBoundsException;
        jl_Exception__init_0($src);
        $rt_throw($src);
    }
    $dest = new jl_NullPointerException;
    jl_Exception__init_($dest, $rt_s(72));
    $rt_throw($dest);
},
jl_System_fastArraycopy = ($src, $srcPos, $dest, $destPos, $length) => {
    if ($srcPos >= 0 && $destPos >= 0 && $length >= 0 && ($srcPos + $length | 0) <= jl_System_fastArrayLength($src) && ($destPos + $length | 0) <= jl_System_fastArrayLength($dest)) {
        jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
        return;
    }
    $src = new jl_IndexOutOfBoundsException;
    jl_Exception__init_0($src);
    $rt_throw($src);
},
jl_System_fastArrayLength = $obj => {
    return $rt_arrayLength($obj);
},
jl_System_doArrayCopy = (var$1, var$2, var$3, var$4, var$5) => {
    if (var$5 !== 0) {
        if (typeof var$1.data.buffer !== 'undefined') {
            var$3.data.set(var$1.data.subarray(var$2, var$2 + var$5), var$4);
        } else if (var$1 !== var$3 || var$4 < var$2) {
            for (let i = 0;i < var$5;i = i + 1 | 0) {
                var$3.data[var$4++] = var$1.data[var$2++];
            }
        } else {
            var$2 = var$2 + var$5 | 0;
            var$4 = var$4 + var$5 | 0;
            for (let i = 0;i < var$5;i = i + 1 | 0) {
                var$3.data[ --var$4] = var$1.data[ --var$2];
            }
        }
    }
},
jl_System_currentTimeMillis = () => {
    return Long_fromNumber((new Date()).getTime());
},
jl_System_getProperty = var$1 => {
    let var$2, var$3, var$4;
    if (jl_System_properties === null) {
        var$2 = new ju_Properties;
        ju_Hashtable__init_(var$2);
        var$3 = var$2;
        ju_Hashtable_put(var$3, $rt_s(73), $rt_s(74));
        ju_Hashtable_put(var$3, $rt_s(75), $rt_s(76));
        otrf_VirtualFileSystemProvider_getInstance();
        ju_Hashtable_put(var$3, $rt_s(77), $rt_s(17));
        otrf_VirtualFileSystemProvider_getInstance();
        ju_Hashtable_put(var$3, $rt_s(78), $rt_s(79));
        ju_Hashtable_put(var$3, $rt_s(80), $rt_s(12));
        ju_Hashtable_put(var$3, $rt_s(81), $rt_s(82));
        ju_Hashtable_put(var$3, $rt_s(83), $rt_s(74));
        ju_Hashtable_put(var$3, $rt_s(84), $rt_s(17));
        var$4 = new ju_Properties;
        ju_Hashtable__init_(var$4);
        var$4.$defaults = var$2;
        jl_System_properties = var$4;
    }
    return ju_Properties_getProperty(jl_System_properties, var$1);
};
function k() {
    let a = this; jl_Object.call(a);
    a.$for6 = 0;
    a.$new2 = 0;
    a.$int6 = 0;
    a.$do4 = null;
    a.$if8 = null;
    a.$a34 = null;
}
let k__init_0 = (var$0, var$1, var$2, var$3, var$4, var$5, var$6) => {
    let var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14, var$15, var$16, var$17, var$18, var$19, $$je;
    var$0.$a34 = var$1;
    var$7 = 0;
    a: {
        b: {
            try {
                var$8 = jmr_RecordStore_openRecordStore(var$1, 1);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        jmr_RecordStore_deleteRecordStore(var$1);
        var$8 = jmr_RecordStore_openRecordStore(var$1, 1);
        var$7 = 1;
    }
    c: {
        if (jmr_RecordStore_getNumRecords(var$8)) {
            var$9 = jmr_RecordStore_getRecord(var$8, 1);
            var$10 = null;
            d: {
                e: {
                    try {
                        f: {
                            g: {
                                var$11 = var$10;
                                var$12 = var$8;
                                var$13 = new ji_DataInputStream;
                                var$10 = var$13;
                                var$11 = var$13;
                                ji_DataInputStream__init_0(var$13, ji_ByteArrayInputStream__init_(var$9));
                                var$14 = ji_DataInputStream_readByte(var$13);
                                var$15 = ji_DataInputStream_readByte(var$13);
                                var$16 = ji_DataInputStream_readBoolean(var$13);
                                if (var$14 == var$4) {
                                    var$11 = var$13;
                                    var$10 = var$13;
                                    var$12 = var$8;
                                    if (var$15 == var$5) {
                                        var$11 = var$13;
                                        var$10 = var$13;
                                        var$12 = var$8;
                                        if (var$6 == var$16)
                                            break g;
                                    }
                                }
                                var$11 = var$13;
                                var$10 = var$13;
                                var$12 = var$8;
                                ji_FilterInputStream_close(var$13);
                                var$17 = null;
                                var$10 = var$17;
                                var$11 = var$17;
                                jmr_RecordStore_closeRecordStore(var$8);
                                jmr_RecordStore_deleteRecordStore(var$1);
                                var$8 = jmr_RecordStore_openRecordStore(var$1, 1);
                                var$12 = var$8;
                                var$7 = 1;
                                break f;
                            }
                            var$11 = var$13;
                            var$10 = var$13;
                            var$12 = var$8;
                            var$0.$do4 = $rt_createArray($rt_arraycls(jl_String), var$4);
                            var$0.$if8 = $rt_createArray($rt_arraycls($rt_intcls), var$4);
                            var$15 = 0;
                            while (true) {
                                var$11 = var$13;
                                var$10 = var$13;
                                var$12 = var$8;
                                if (var$15 >= var$4)
                                    break;
                                var$11 = var$13;
                                var$10 = var$13;
                                var$12 = var$8;
                                var$0.$do4.data[var$15] = $rt_createArray(jl_String, var$5);
                                var$0.$if8.data[var$15] = $rt_createIntArray(var$5);
                                var$16 = 0;
                                while (true) {
                                    var$11 = var$13;
                                    var$10 = var$13;
                                    var$12 = var$8;
                                    if (var$16 >= var$5)
                                        break;
                                    var$11 = var$13;
                                    var$10 = var$13;
                                    var$12 = var$8;
                                    var$0.$do4.data[var$15].data[var$16] = ji_DataInputStream_readUTF(var$13);
                                    var$0.$if8.data[var$15].data[var$16] = ji_DataInputStream_readInt(var$13);
                                    var$16 = var$16 + 1 | 0;
                                }
                                var$11 = var$13;
                                var$10 = var$13;
                                var$12 = var$8;
                                var$15 = var$15 + 1 | 0;
                            }
                            var$11 = var$13;
                            var$10 = var$13;
                            var$12 = var$8;
                            ji_FilterInputStream_close(var$13);
                            var$17 = null;
                            var$10 = var$17;
                            var$11 = var$17;
                        }
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_Exception) {
                            break e;
                        } else{
                            var$1 = $$je;
                            break d;
                        }
                    }
                    var$11 = null;
                    try {
                        break c;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        var$1 = $$je;
                        break d;

                    }
                }
                try {
                    var$11 = var$10;
                    jmr_RecordStore_closeRecordStore(var$12);
                    jmr_RecordStore_deleteRecordStore(var$1);
                    var$8 = jmr_RecordStore_openRecordStore(var$1, 1);
                    var$7 = 1;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$1 = $$je;
                    break d;

                }
                h: {
                    try {
                        if (var$10 === null)
                            break h;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        var$1 = $$je;
                        break d;

                    }
                    ji_FilterInputStream_close(var$10);
                }
                var$11 = null;
                try {
                    break c;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$1 = $$je;
                    break d;

                }
            }
            if (var$11 !== null)
                ji_FilterInputStream_close(var$11);
            $rt_throw(var$1);
        }
    }
    if (!(jmr_RecordStore_getNumRecords(var$8) && !var$7)) {
        var$9 = $rt_createArray($rt_arraycls(jl_String), var$4);
        var$18 = var$9.data;
        var$0.$do4 = var$9;
        var$9 = $rt_createArray($rt_arraycls($rt_intcls), var$4);
        var$19 = var$9.data;
        var$0.$if8 = var$9;
        var$15 = 0;
        while (var$15 < var$4) {
            var$18[var$15] = $rt_createArray(jl_String, var$5);
            var$19[var$15] = $rt_createIntArray(var$5);
            var$16 = 0;
            while (var$16 < var$5) {
                var$18[var$15].data[var$16] = var$2;
                var$19[var$15].data[var$16] = var$3;
                var$16 = var$16 + 1 | 0;
            }
            var$15 = var$15 + 1 | 0;
        }
        var$9 = k_for(var$0);
        jmr_RecordStore_addRecord(var$8, var$9, 0, var$9.data.length);
    }
    jmr_RecordStore_closeRecordStore(var$8);
    var$0.$for6 = var$4;
    var$0.$new2 = var$5;
    var$0.$int6 = var$6;
},
k__init_ = (var_0, var_1, var_2, var_3, var_4, var_5) => {
    let var_6 = new k();
    k__init_0(var_6, var_0, var_1, var_2, var_3, var_4, var_5);
    return var_6;
},
k_if = var$0 => {
    let var$1, var$2;
    var$1 = jmr_RecordStore_openRecordStore(var$0.$a34, 1);
    var$2 = k_for(var$0);
    jmr_RecordStore_setRecord(var$1, 1, var$2, 0, var$2.data.length);
    jmr_RecordStore_closeRecordStore(var$1);
},
k_for = var$0 => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, $$je;
    var$1 = null;
    try {
        a: {
            b: {
                try {
                    var$2 = var$1;
                    var$3 = new ji_ByteArrayOutputStream;
                    var$1 = var$3;
                    var$2 = var$3;
                    ji_ByteArrayOutputStream__init_(var$3);
                    var$4 = ji_DataOutputStream__init_(var$3);
                    ji_DataOutputStream_writeByte(var$4, var$0.$for6);
                    ji_DataOutputStream_writeByte(var$4, var$0.$new2);
                    ji_DataOutputStream_writeBoolean(var$4, var$0.$int6);
                    var$5 = 0;
                    while (true) {
                        var$2 = var$3;
                        var$1 = var$3;
                        if (var$5 >= var$0.$for6)
                            break;
                        var$2 = var$3;
                        var$1 = var$3;
                        var$6 = 0;
                        while (true) {
                            var$2 = var$3;
                            var$1 = var$3;
                            if (var$6 >= var$0.$new2)
                                break;
                            var$2 = var$3;
                            var$1 = var$3;
                            ji_DataOutputStream_writeUTF(var$4, var$0.$do4.data[var$5].data[var$6]);
                            ji_DataOutputStream_writeInt(var$4, var$0.$if8.data[var$5].data[var$6]);
                            var$6 = var$6 + 1 | 0;
                        }
                        var$2 = var$3;
                        var$1 = var$3;
                        var$5 = var$5 + 1 | 0;
                    }
                    var$2 = var$3;
                    var$1 = var$3;
                    var$7 = ji_ByteArrayOutputStream_toByteArray(var$3);
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_Exception) {
                        var$3 = $$je;
                        break b;
                    } else {
                        throw $$e;
                    }
                }
            }
            var$2 = var$1;
            $rt_throw(var$3);
        }
    } catch ($$e) {
        $$je = $rt_wrapException($$e);
        var$1 = $$je;
        $rt_throw(var$1);

    }
    var$2 = null;
    return var$7;
},
k_a = (var$0, var$1, var$2) => {
    return var$0.$if8.data[var$1].data[var$2];
},
ju_Objects = $rt_classWithoutFields(),
ju_Objects_equals = ($a, $b) => {
    if ($a !== $b)
        return $a !== null ? $a.$equals0($b) : $b !== null ? 0 : 1;
    return 1;
},
jl_IndexOutOfBoundsException = $rt_classWithoutFields(jl_RuntimeException),
jl_StringIndexOutOfBoundsException = $rt_classWithoutFields(jl_IndexOutOfBoundsException);
function ji_ByteArrayInputStream() {
    let a = this; ji_InputStream.call(a);
    a.$buf0 = null;
    a.$pos = 0;
    a.$mark = 0;
    a.$count1 = 0;
}
let ji_ByteArrayInputStream__init_0 = ($this, $buf) => {
    let var$2;
    var$2 = $buf.data.length;
    $this.$buf0 = $buf;
    $this.$pos = 0;
    $this.$mark = 0;
    $this.$count1 = 0 + var$2 | 0;
},
ji_ByteArrayInputStream__init_ = var_0 => {
    let var_1 = new ji_ByteArrayInputStream();
    ji_ByteArrayInputStream__init_0(var_1, var_0);
    return var_1;
},
ji_ByteArrayInputStream_read0 = $this => {
    let var$1, var$2, var$3;
    var$1 = $this.$pos;
    if (var$1 >= $this.$count1)
        var$2 = (-1);
    else {
        var$3 = $this.$buf0.data;
        $this.$pos = var$1 + 1 | 0;
        var$2 = var$3[var$1] & 255;
    }
    return var$2;
},
ji_ByteArrayInputStream_read = ($this, $b, $off, $len) => {
    let $bytesToRead, $i, var$6, var$7, var$8;
    $bytesToRead = jl_Math_min($len, $this.$count1 - $this.$pos | 0);
    $i = 0;
    while ($i < $bytesToRead) {
        var$6 = $b.data;
        $len = $off + 1 | 0;
        var$7 = $this.$buf0.data;
        var$8 = $this.$pos;
        $this.$pos = var$8 + 1 | 0;
        var$6[$off] = var$7[var$8];
        $i = $i + 1 | 0;
        $off = $len;
    }
    if ($bytesToRead <= 0)
        $bytesToRead = (-1);
    return $bytesToRead;
},
ji_ByteArrayInputStream_close = $this => {
    return;
},
ji_IOException = $rt_classWithoutFields(jl_Exception),
ji_EOFException = $rt_classWithoutFields(ji_IOException),
jur_RandomGenerator = $rt_classWithoutFields(0);
function ju_Random() {
    jl_Object.call(this);
    this.$seed = Long_ZERO;
}
let ju_Random_nextInt = $this => {
    let var$1;
    var$1 = Long_and(Long_add(Long_mul($this.$seed, Long_create(3740067437, 5)), Long_fromInt(11)), Long_create(4294967295, 65535));
    $this.$seed = var$1;
    return Long_lo(Long_shr(var$1, 16));
};
function jmr_RecordStore() {
    let a = this; jl_Object.call(a);
    a.$name = null;
    a.$closed = 0;
}
let jmr_RecordStore_openRecordStore = ($name, $create) => {
    let var$3, $result;
    var$3 = !$create ? $rt_s(85) : $rt_s(86);
    if ($rt_str(globalThis.mikiPlatform.rms($rt_ustr($name), $rt_ustr(var$3), 0, $rt_ustr(null))) === null) {
        $result = new jmr_RecordStoreNotFoundException;
        jl_Exception__init_($result, $name);
        $rt_throw($result);
    }
    $result = new jmr_RecordStore;
    $result.$name = $name;
    return $result;
},
jmr_RecordStore_deleteRecordStore = $name => {
    let var$2;
    if ($rt_str(globalThis.mikiPlatform.rms($rt_ustr($name), "delete", 0, $rt_ustr(null))) === null) {
        var$2 = new jmr_RecordStoreNotFoundException;
        jl_Exception__init_(var$2, $name);
        $rt_throw(var$2);
    }
},
jmr_RecordStore_check = $this => {
    let var$1, var$2, var$3;
    if ($this.$closed) {
        var$1 = new jmr_RecordStoreException;
        var$2 = $this.$name;
        var$3 = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_(var$3);
        jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(87)), var$2);
        jl_Exception__init_(var$1, jl_AbstractStringBuilder_toString(var$3));
        $rt_throw(var$1);
    }
},
jmr_RecordStore_getNumRecords = $this => {
    jmr_RecordStore_check($this);
    return jl_Integer_parseInt($rt_str(globalThis.mikiPlatform.rms($rt_ustr($this.$name), "count", 0, $rt_ustr(null))));
},
jmr_RecordStore_getRecord = ($this, $id) => {
    let $data, $bytes, var$4, $i, var$6;
    jmr_RecordStore_check($this);
    $data = $rt_str(globalThis.mikiPlatform.rms($rt_ustr($this.$name), "get", $id, $rt_ustr(null)));
    if ($data !== null) {
        $bytes = $rt_createByteArray($data.$nativeString.length);
        var$4 = $bytes.data;
        $i = 0;
        $id = var$4.length;
        while ($i < $id) {
            var$4[$i] = jl_String_charAt($data, $i) << 24 >> 24;
            $i = $i + 1 | 0;
        }
        return $bytes;
    }
    $data = new jmr_RecordStoreException;
    var$6 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$6);
    jl_AbstractStringBuilder_append(jl_StringBuilder_append(var$6, $rt_s(88)), $id);
    jl_Exception__init_($data, jl_AbstractStringBuilder_toString(var$6));
    $rt_throw($data);
},
jmr_RecordStore_addRecord = ($this, $data, $offset, $count) => {
    jmr_RecordStore_check($this);
    return jl_Integer_parseInt($rt_str(globalThis.mikiPlatform.rms($rt_ustr($this.$name), "add", 0, $rt_ustr(w_Resources_binary(ju_Arrays_copyOfRange($data, $offset, $offset + $count | 0))))));
},
jmr_RecordStore_setRecord = ($this, $id, $data, $offset, $count) => {
    let var$5, var$6;
    jmr_RecordStore_check($this);
    if ($rt_str(globalThis.mikiPlatform.rms($rt_ustr($this.$name), "set", $id, $rt_ustr(w_Resources_binary(ju_Arrays_copyOfRange($data, $offset, $offset + $count | 0))))) === null) {
        var$5 = new jmr_RecordStoreException;
        var$6 = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_(var$6);
        jl_AbstractStringBuilder_append(jl_StringBuilder_append(var$6, $rt_s(88)), $id);
        jl_Exception__init_(var$5, jl_AbstractStringBuilder_toString(var$6));
        $rt_throw(var$5);
    }
},
jmr_RecordStore_closeRecordStore = $this => {
    jmr_RecordStore_check($this);
    $this.$closed = 1;
};
function jml_Image() {
    let a = this; jl_Object.call(a);
    a.$id = 0;
    a.$mutable = 0;
}
let jml_Image__init_0 = ($this, $id, $mutable) => {
    $this.$id = $id;
    $this.$mutable = $mutable;
},
jml_Image__init_ = (var_0, var_1) => {
    let var_2 = new jml_Image();
    jml_Image__init_0(var_2, var_0, var_1);
    return var_2;
},
jml_Image_createImage = $path => {
    let $id, var$3, var$4;
    $id = globalThis.mikiPlatform.image($rt_ustr(!jl_String_startsWith($path, $rt_s(17)) ? $path : jl_String_substring0($path, 1)));
    if ($id < 0) {
        var$3 = new ji_IOException;
        var$4 = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_(var$4);
        jl_StringBuilder_append(jl_StringBuilder_append(var$4, $rt_s(89)), $path);
        jl_Exception__init_(var$3, jl_AbstractStringBuilder_toString(var$4));
        $rt_throw(var$3);
    }
    return jml_Image__init_($id, 0);
},
jml_Image_createImage0 = ($width, $height) => {
    let var$3;
    if ($width > 0 && $height > 0)
        return jml_Image__init_(globalThis.mikiPlatform.surface($width, $height), 1);
    var$3 = new jl_IllegalArgumentException;
    jl_Exception__init_(var$3, $rt_s(90));
    $rt_throw(var$3);
},
jml_Image_getWidth = $this => {
    return globalThis.mikiPlatform.dimension($this.$id, 0);
},
jml_Image_getHeight = $this => {
    return globalThis.mikiPlatform.dimension($this.$id, 1);
},
jml_Image_getGraphics = $this => {
    let var$1;
    if (!$this.$mutable) {
        var$1 = new jl_IllegalStateException;
        jl_Exception__init_(var$1, $rt_s(91));
        $rt_throw(var$1);
    }
    return jml_Graphics__init_($this.$id, jml_Image_getWidth($this), jml_Image_getHeight($this));
};
function cnms_Sound() {
    jl_Object.call(this);
    this.$id0 = 0;
}
let cnms_Sound_play = ($this, $repeats) => {
    globalThis.mikiPlatform.playSound($this.$id0, $repeats);
},
cnms_Sound_stop = $this => {
    globalThis.mikiPlatform.stopSound($this.$id0);
},
ju_Dictionary = $rt_classWithoutFields(),
ju_Map = $rt_classWithoutFields(0),
jl_Cloneable = $rt_classWithoutFields(0);
function ju_Hashtable() {
    let a = this; ju_Dictionary.call(a);
    a.$elementCount0 = 0;
    a.$elementData = null;
    a.$loadFactor = 0.0;
    a.$threshold = 0;
    a.$firstSlot = 0;
    a.$lastSlot = 0;
    a.$modCount1 = 0;
}
let ju_Hashtable_EMPTY_ENUMERATION = null,
ju_Hashtable_EMPTY_ITERATOR = null,
ju_Hashtable_$callClinit = () => {
    ju_Hashtable_$callClinit = $rt_eraseClinit(ju_Hashtable);
    ju_Hashtable__clinit_();
},
ju_Hashtable__init_ = $this => {
    let var$1, var$2;
    ju_Hashtable_$callClinit();
    $this.$lastSlot = (-1);
    $this.$elementCount0 = 0;
    var$1 = $rt_createArray(ju_Hashtable$Entry, 11);
    var$2 = var$1.data;
    $this.$elementData = var$1;
    $this.$firstSlot = var$2.length;
    $this.$loadFactor = 0.75;
    ju_Hashtable_computeMaxSize($this);
},
ju_Hashtable__init_0 = () => {
    let var_0 = new ju_Hashtable();
    ju_Hashtable__init_(var_0);
    return var_0;
},
ju_Hashtable_computeMaxSize = $this => {
    $this.$threshold = $this.$elementData.data.length * $this.$loadFactor | 0;
},
ju_Hashtable_get = ($this, $key) => {
    let $hash, $index, var$4, $entry;
    jl_Object_monitorEnterSync($this);
    try {
        $hash = jl_String_hashCode($key);
        $index = $hash & 2147483647;
        var$4 = $this.$elementData.data;
        $entry = var$4[$index % var$4.length | 0];
        while ($entry !== null) {
            if (ju_Hashtable$Entry_equalsKey($entry, $key, $hash))
                return $entry.$value0;
            $entry = $entry.$next;
        }
        return null;
    } finally {
        jl_Object_monitorExitSync($this);
    }
},
ju_Hashtable_put = ($this, $key, $value) => {
    let $result, $hash, var$5, var$6, $index, $entry, var$9, var$10, var$11, var$12, var$13, var$14;
    jl_Object_monitorEnterSync($this);
    try {
        if ($key !== null && $value !== null) {
            $result = $key;
            $hash = jl_String_hashCode($result);
            var$5 = $hash & 2147483647;
            var$6 = $this.$elementData.data;
            $index = var$5 % var$6.length | 0;
            $entry = var$6[$index];
            while ($entry !== null && !ju_Hashtable$Entry_equalsKey($entry, $key, $hash)) {
                $entry = $entry.$next;
            }
            if ($entry === null) {
                $this.$modCount1 = $this.$modCount1 + 1 | 0;
                var$9 = $this.$elementCount0 + 1 | 0;
                $this.$elementCount0 = var$9;
                if (var$9 > $this.$threshold) {
                    var$9 = ($this.$elementData.data.length << 1) + 1 | 0;
                    if (!var$9)
                        var$9 = 1;
                    $hash = (-1);
                    var$10 = $rt_createArray(ju_Hashtable$Entry, var$9);
                    var$11 = var$10.data;
                    var$12 = $this.$lastSlot + 1 | 0;
                    var$13 = var$9;
                    while (true) {
                        var$12 = var$12 + (-1) | 0;
                        if (var$12 < $this.$firstSlot)
                            break;
                        $entry = $this.$elementData.data[var$12];
                        while ($entry !== null) {
                            $index = (jl_String_hashCode($entry.$key) & 2147483647) % var$9 | 0;
                            if ($index < var$13)
                                var$13 = $index;
                            if ($index > $hash)
                                $hash = $index;
                            var$14 = $entry.$next;
                            $entry.$next = var$11[$index];
                            var$11[$index] = $entry;
                            $entry = var$14;
                        }
                    }
                    $this.$firstSlot = var$13;
                    $this.$lastSlot = $hash;
                    $this.$elementData = var$10;
                    ju_Hashtable_computeMaxSize($this);
                    $index = var$5 % $this.$elementData.data.length | 0;
                }
                if ($index < $this.$firstSlot)
                    $this.$firstSlot = $index;
                if ($index > $this.$lastSlot)
                    $this.$lastSlot = $index;
                ju_Hashtable_$callClinit();
                $entry = new ju_Hashtable$Entry;
                $entry.$key = $key;
                $entry.$value0 = $value;
                $entry.$hashcode = jl_String_hashCode($result);
                var$6 = $this.$elementData.data;
                $entry.$next = var$6[$index];
                var$6[$index] = $entry;
                return null;
            }
            $result = $entry.$value0;
            $entry.$value0 = $value;
            return $result;
        }
        $key = new jl_NullPointerException;
        jl_Exception__init_0($key);
        $rt_throw($key);
    } finally {
        jl_Object_monitorExitSync($this);
    }
},
ju_Hashtable__clinit_ = () => {
    ju_Hashtable_EMPTY_ENUMERATION = new ju_Hashtable$1;
    ju_Hashtable_EMPTY_ITERATOR = new ju_Hashtable$2;
};
function ju_Properties() {
    ju_Hashtable.call(this);
    this.$defaults = null;
}
let ju_Properties_getProperty = ($this, $name) => {
    let $result, $property;
    $result = ju_Hashtable_get($this, $name);
    $property = !($result instanceof jl_String) ? null : $result;
    if ($property === null) {
        $result = $this.$defaults;
        if ($result !== null)
            $property = ju_Properties_getProperty($result, $name);
    }
    return $property;
},
otrf_VirtualFileSystemProvider = $rt_classWithoutFields(),
otrf_VirtualFileSystemProvider_instance = null,
otrf_VirtualFileSystemProvider_getInstance = () => {
    let var$1, var$2, var$3, var$4, var$5;
    if (otrf_VirtualFileSystemProvider_instance === null) {
        var$1 = new otrfm_InMemoryVirtualFileSystem;
        var$2 = new otrfm_InMemoryVirtualDirectory;
        var$2.$lastModified = jl_System_currentTimeMillis();
        var$2.$name2 = $rt_s(33);
        var$3 = new ju_LinkedHashMap;
        jl_Object__init_(var$3);
        var$3.$elementCount1 = 0;
        var$4 = $rt_createArray(ju_LinkedHashMap$LinkedHashMapEntry, 16);
        var$5 = var$4.data;
        var$3.$elementData1 = var$4;
        var$3.$loadFactor0 = 0.75;
        var$3.$threshold0 = var$5.length * 0.75 | 0;
        var$3.$accessOrder = 0;
        var$3.$head0 = null;
        var$2.$children = var$3;
        var$1.$root = var$2;
        var$1.$userDir = $rt_s(17);
        otrf_VirtualFileSystemProvider_instance = var$1;
    }
    return otrf_VirtualFileSystemProvider_instance;
},
jmr_RecordStoreException = $rt_classWithoutFields(jl_Exception),
jmr_RecordStoreNotFoundException = $rt_classWithoutFields(jmr_RecordStoreException),
ji_Flushable = $rt_classWithoutFields(0),
ji_OutputStream = $rt_classWithoutFields();
function ji_FilterOutputStream() {
    ji_OutputStream.call(this);
    this.$out = null;
}
let ji_FilterOutputStream__init_ = ($this, $out) => {
    $this.$out = $out;
},
ji_FilterOutputStream__init_0 = var_0 => {
    let var_1 = new ji_FilterOutputStream();
    ji_FilterOutputStream__init_(var_1, var_0);
    return var_1;
},
ji_DataOutput = $rt_classWithoutFields(0);
function ji_DataOutputStream() {
    let a = this; ji_FilterOutputStream.call(a);
    a.$written = 0;
    a.$buff0 = null;
}
let ji_DataOutputStream__init_0 = ($this, $out) => {
    ji_FilterOutputStream__init_($this, $out);
    $this.$buff0 = $rt_createByteArray(8);
},
ji_DataOutputStream__init_ = var_0 => {
    let var_1 = new ji_DataOutputStream();
    ji_DataOutputStream__init_0(var_1, var_0);
    return var_1;
},
ji_DataOutputStream_writeBoolean = ($this, $val) => {
    let var$2;
    var$2 = $this.$out;
    $val = !$val ? 0 : 1;
    ji_ByteArrayOutputStream_write(var$2, $val);
    $this.$written = $this.$written + 1 | 0;
},
ji_DataOutputStream_writeByte = ($this, $val) => {
    ji_ByteArrayOutputStream_write($this.$out, $val);
    $this.$written = $this.$written + 1 | 0;
},
ji_DataOutputStream_writeInt = ($this, $val) => {
    let var$2, var$3;
    var$2 = $this.$buff0;
    var$3 = var$2.data;
    var$3[0] = $val >> 24 << 24 >> 24;
    var$3[1] = $val >> 16 << 24 >> 24;
    var$3[2] = $val >> 8 << 24 >> 24;
    var$3[3] = $val << 24 >> 24;
    ji_ByteArrayOutputStream_write0($this.$out, var$2, 0, 4);
    $this.$written = $this.$written + 4 | 0;
},
ji_DataOutputStream_writeUTF = ($this, $str) => {
    let var$2, var$3, $offset, var$5, $utfCount, $buffer, var$8, var$9, var$10, var$11;
    var$2 = 0;
    var$3 = $str.$nativeString.length;
    $offset = 0;
    while ($offset < var$3) {
        var$5 = jl_String_charAt($str, $offset);
        var$2 = var$5 > 0 && var$5 <= 127 ? var$2 + 1 | 0 : var$5 > 2047 ? var$2 + 3 | 0 : var$2 + 2 | 0;
        $offset = $offset + 1 | 0;
    }
    $utfCount = Long_fromInt(var$2);
    if (Long_le($utfCount, Long_fromInt(65535))) {
        var$2 = Long_lo($utfCount);
        $buffer = $rt_createByteArray(var$2 + 2 | 0);
        var$8 = $buffer.data;
        var$8[0] = var$2 >> 8 << 24 >> 24;
        $offset = 2;
        var$8[1] = var$2 << 24 >> 24;
        var$3 = $str.$nativeString.length;
        var$2 = 0;
        while (var$2 < var$3) {
            var$5 = jl_String_charAt($str, var$2);
            if (var$5 > 0 && var$5 <= 127) {
                var$9 = $offset + 1 | 0;
                var$8[$offset] = var$5 << 24 >> 24;
            } else if (var$5 <= 2047) {
                var$10 = $offset + 1 | 0;
                var$8[$offset] = (192 | 31 & var$5 >> 6) << 24 >> 24;
                var$9 = var$10 + 1 | 0;
                var$8[var$10] = (128 | 63 & var$5) << 24 >> 24;
            } else {
                var$11 = $offset + 1 | 0;
                var$8[$offset] = (224 | 15 & var$5 >> 12) << 24 >> 24;
                $offset = var$11 + 1 | 0;
                var$8[var$11] = (128 | 63 & var$5 >> 6) << 24 >> 24;
                var$9 = $offset + 1 | 0;
                var$8[$offset] = (128 | 63 & var$5) << 24 >> 24;
            }
            var$2 = var$2 + 1 | 0;
            $offset = var$9;
        }
        ji_ByteArrayOutputStream_write0($this.$out, $buffer, 0, $offset);
        $this.$written = $this.$written + $offset | 0;
        return;
    }
    $str = new ji_IOException;
    jl_Exception__init_($str, $rt_s(92));
    $rt_throw($str);
};
function ji_ByteArrayOutputStream() {
    let a = this; ji_OutputStream.call(a);
    a.$buf = null;
    a.$count0 = 0;
}
let ji_ByteArrayOutputStream__init_ = $this => {
    $this.$buf = $rt_createByteArray(32);
},
ji_ByteArrayOutputStream__init_0 = () => {
    let var_0 = new ji_ByteArrayOutputStream();
    ji_ByteArrayOutputStream__init_(var_0);
    return var_0;
},
ji_ByteArrayOutputStream_write = ($this, $b) => {
    let var$2, var$3;
    ji_ByteArrayOutputStream_ensureCapacity($this, $this.$count0 + 1 | 0);
    var$2 = $this.$buf.data;
    var$3 = $this.$count0;
    $this.$count0 = var$3 + 1 | 0;
    var$2[var$3] = $b << 24 >> 24;
},
ji_ByteArrayOutputStream_write0 = ($this, $b, $off, $len) => {
    let $i, var$5, var$6, var$7, var$8;
    ji_ByteArrayOutputStream_ensureCapacity($this, $this.$count0 + $len | 0);
    $i = 0;
    while ($i < $len) {
        var$5 = $b.data;
        var$6 = $this.$buf.data;
        var$7 = $this.$count0;
        $this.$count0 = var$7 + 1 | 0;
        var$8 = $off + 1 | 0;
        var$6[var$7] = var$5[$off];
        $i = $i + 1 | 0;
        $off = var$8;
    }
},
ji_ByteArrayOutputStream_ensureCapacity = ($this, $capacity) => {
    let var$2;
    var$2 = $this.$buf.data.length;
    if (var$2 < $capacity) {
        $capacity = jl_Math_max($capacity, (var$2 * 3 | 0) / 2 | 0);
        $this.$buf = ju_Arrays_copyOf($this.$buf, $capacity);
    }
},
ji_ByteArrayOutputStream_toByteArray = $this => {
    return ju_Arrays_copyOf($this.$buf, $this.$count0);
},
ju_Arrays = $rt_classWithoutFields(),
ju_Arrays_copyOf = ($array, $length) => {
    let $result, var$4, $sz, $i;
    $array = $array.data;
    $result = $rt_createByteArray($length);
    var$4 = $result.data;
    $sz = jl_Math_min($length, $array.length);
    $i = 0;
    while ($i < $sz) {
        var$4[$i] = $array[$i];
        $i = $i + 1 | 0;
    }
    return $result;
},
ju_Arrays_copyOfRange = ($array, $from, $to) => {
    let $limit, $result, var$6, $i, var$8, var$9;
    $array = $array.data;
    $limit = $array.length;
    if ($from <= $to) {
        if ($from >= 0 && $from <= $limit) {
            $result = $rt_createByteArray($to - $from | 0);
            var$6 = $result.data;
            $limit = jl_Math_min($to, $limit);
            $i = $from;
            while ($i < $limit) {
                var$6[$i - $from | 0] = $array[$i];
                $i = $i + 1 | 0;
            }
            return $result;
        }
        var$8 = new jl_ArrayIndexOutOfBoundsException;
        jl_Exception__init_0(var$8);
        $rt_throw(var$8);
    }
    var$8 = new jl_IllegalArgumentException;
    var$9 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$9);
    jl_AbstractStringBuilder_append(var$9, $from);
    jl_AbstractStringBuilder_append(jl_StringBuilder_append(var$9, $rt_s(93)), $to);
    jl_Exception__init_(var$8, jl_AbstractStringBuilder_toString(var$9));
    $rt_throw(var$8);
},
jl_IllegalArgumentException = $rt_classWithoutFields(jl_RuntimeException),
jl_NullPointerException = $rt_classWithoutFields(jl_RuntimeException),
jlr_Array = $rt_classWithoutFields(),
jlr_Array_getLength = $array => {
    let $cls;
    $cls = (jl_Object_getClass($array)).$classInfo;
    if ($cls[$rt_meta].itemType === null) {
        $array = new jl_IllegalArgumentException;
        jl_Exception__init_0($array);
        $rt_throw($array);
    }
    return $rt_arrayLength($array);
},
jl_ArrayStoreException = $rt_classWithoutFields(jl_RuntimeException),
jl_Math = $rt_classWithoutFields(),
jl_Math_min = ($a, $b) => {
    if ($a < $b)
        $b = $a;
    return $b;
},
jl_Math_max = ($a, $b) => {
    if ($a > $b)
        $b = $a;
    return $b;
},
jl_Math_min0 = ($a, $b) => {
    if (Long_lt($a, $b))
        $b = $a;
    return $b;
},
jl_Iterable = $rt_classWithoutFields(0),
ju_Collection = $rt_classWithoutFields(0),
ju_AbstractCollection = $rt_classWithoutFields(),
ju_SequencedCollection = $rt_classWithoutFields(0),
ju_List = $rt_classWithoutFields(0);
function ju_AbstractList() {
    ju_AbstractCollection.call(this);
    this.$modCount = 0;
}
let ju_RandomAccess = $rt_classWithoutFields(0);
function ju_ArrayList() {
    let a = this; ju_AbstractList.call(a);
    a.$array0 = null;
    a.$size0 = 0;
}
let ju_ArrayList__init_0 = $this => {
    $this.$array0 = $rt_createArray(jl_Object, 10);
},
ju_ArrayList__init_ = () => {
    let var_0 = new ju_ArrayList();
    ju_ArrayList__init_0(var_0);
    return var_0;
},
ju_ArrayList_get = ($this, $index) => {
    ju_ArrayList_checkIndex($this, $index);
    return $this.$array0.data[$index];
},
ju_ArrayList_add = ($this, $element) => {
    let var$2, var$3, var$4, var$5, var$6, var$7;
    a: {
        var$2 = $this.$size0 + 1 | 0;
        var$3 = $this.$array0.data.length;
        if (var$3 < var$2) {
            var$2 = var$3 >= 1073741823 ? 2147483647 : jl_Math_max(var$2, jl_Math_max(var$3 * 2 | 0, 5));
            var$4 = $this.$array0;
            var$5 = jl_Class_getComponentType(jl_Object_getClass(var$4));
            if (var$5 !== null) {
                if (var$5 !== $rt_cls($rt_voidcls)) {
                    if (var$2 >= 0) {
                        var$6 = var$4.data;
                        var$4 = otrr_ClassInfo_newArrayInstance(var$5.$classInfo, var$2);
                        var$7 = jl_Math_min(var$2, var$6.length);
                        var$3 = 0;
                        while (var$3 < var$7) {
                            var$4.data[var$3] = var$6[var$3];
                            var$3 = var$3 + 1 | 0;
                        }
                        $this.$array0 = var$4;
                        break a;
                    }
                    $element = new jl_NegativeArraySizeException;
                    jl_Exception__init_0($element);
                    $rt_throw($element);
                }
                $element = new jl_IllegalArgumentException;
                jl_Exception__init_0($element);
                $rt_throw($element);
            }
            $element = new jl_NullPointerException;
            jl_Exception__init_0($element);
            $rt_throw($element);
        }
    }
    var$4 = $this.$array0.data;
    var$7 = $this.$size0;
    $this.$size0 = var$7 + 1 | 0;
    var$4[var$7] = $element;
    $this.$modCount = $this.$modCount + 1 | 0;
    return 1;
},
ju_ArrayList_remove = ($this, $i) => {
    let var$2, $old, var$4, $i_0;
    ju_ArrayList_checkIndex($this, $i);
    var$2 = $this.$array0.data;
    $old = var$2[$i];
    var$4 = $this.$size0 - 1 | 0;
    $this.$size0 = var$4;
    while ($i < var$4) {
        $i_0 = $i + 1 | 0;
        var$2[$i] = var$2[$i_0];
        $i = $i_0;
    }
    var$2[var$4] = null;
    $this.$modCount = $this.$modCount + 1 | 0;
    return $old;
},
ju_ArrayList_checkIndex = ($this, $index) => {
    let var$2;
    if ($index >= 0 && $index < $this.$size0)
        return;
    var$2 = new jl_IndexOutOfBoundsException;
    jl_Exception__init_0(var$2);
    $rt_throw(var$2);
},
otrf_VirtualFileSystem = $rt_classWithoutFields(0);
function otrfm_InMemoryVirtualFileSystem() {
    let a = this; jl_Object.call(a);
    a.$root = null;
    a.$userDir = null;
}
let jl_NumberFormatException = $rt_classWithoutFields(jl_IllegalArgumentException),
jl_ArrayIndexOutOfBoundsException = $rt_classWithoutFields(jl_IndexOutOfBoundsException),
ju_Enumeration = $rt_classWithoutFields(0),
ju_Hashtable$1 = $rt_classWithoutFields(),
ju_Iterator = $rt_classWithoutFields(0),
ju_Hashtable$2 = $rt_classWithoutFields();
function otrfm_AbstractInMemoryVirtualFile() {
    let a = this; jl_Object.call(a);
    a.$name2 = null;
    a.$lastModified = Long_ZERO;
}
function otrfm_InMemoryVirtualDirectory() {
    otrfm_AbstractInMemoryVirtualFile.call(this);
    this.$children = null;
}
let ju_Map$Entry = $rt_classWithoutFields(0);
function ju_MapEntry() {
    let a = this; jl_Object.call(a);
    a.$key = null;
    a.$value0 = null;
}
function ju_Hashtable$Entry() {
    let a = this; ju_MapEntry.call(a);
    a.$next = null;
    a.$hashcode = 0;
}
let ju_Hashtable$Entry_equalsKey = ($this, $aKey, $hash) => {
    return !($this.$hashcode == jl_String_hashCode($aKey) && jl_String_equals($this.$key, $aKey)) ? 0 : 1;
},
ju_AbstractMap = $rt_classWithoutFields();
function ju_HashMap() {
    let a = this; ju_AbstractMap.call(a);
    a.$elementCount1 = 0;
    a.$elementData1 = null;
    a.$loadFactor0 = 0.0;
    a.$threshold0 = 0;
}
let ju_SequencedMap = $rt_classWithoutFields(0);
function ju_LinkedHashMap() {
    let a = this; ju_HashMap.call(a);
    a.$accessOrder = 0;
    a.$head0 = null;
}
let h = $rt_classWithoutFields(),
h_a = 0,
h_$callClinit = () => {
    h_$callClinit = $rt_eraseClinit(h);
    h__clinit_();
},
h_if = () => {
    h_$callClinit();
},
h_a1 = var$1 => {
    h_$callClinit();
    h_a = var$1;
},
h_a0 = (var$1, var$2) => {
    let $$je;
    h_$callClinit();
    a: {
        b: {
            try {
                if (h_a)
                    cnmu_DeviceControl_startVibra(var$1, Long_fromInt(var$2));
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_IllegalStateException) {
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        h_a = 0;
    }
},
h__clinit_ = () => {
    h_a = 1;
},
jml_Screen = $rt_classWithoutFields(jml_Displayable),
jml_Screen_setTitle = ($this, $value) => {
    $this.$title = $value;
    jml_Display_$callClinit();
    jml_Display_dirty = 1;
};
function jml_Form() {
    jml_Screen.call(this);
    this.$items0 = null;
}
let jml_Form__init_0 = ($this, $title) => {
    jml_Displayable__init_($this);
    $this.$items0 = ju_ArrayList__init_();
    $this.$title = $title;
},
jml_Form__init_ = var_0 => {
    let var_1 = new jml_Form();
    jml_Form__init_0(var_1, var_0);
    return var_1;
},
jml_Form_append = ($this, $value) => {
    ju_ArrayList_add($this.$items0, $value);
    jml_Display_$callClinit();
    jml_Display_dirty = 1;
    return $this.$items0.$size0 - 1 | 0;
},
jml_Form_render = $this => {
    let $i, $item, $field;
    jml_Displayable_render($this);
    $i = 0;
    while (true) {
        $item = $this.$items0;
        if ($i >= $item.$size0)
            break;
        $item = ju_ArrayList_get($item, $i);
        if (!($item instanceof jml_TextField))
            globalThis.mikiPlatform.addText($rt_ustr($item));
        else {
            $field = $item;
            globalThis.mikiPlatform.addField($i, $rt_ustr($field.$label0), $rt_ustr($field.$value), $field.$max0);
        }
        $i = $i + 1 | 0;
    }
},
jml_Item = $rt_classWithoutFields();
function jml_TextField() {
    let a = this; jml_Item.call(a);
    a.$label0 = null;
    a.$value = null;
    a.$max0 = 0;
}
let jml_TextField_setString = ($this, $text) => {
    let var$2;
    if ($text.$nativeString.length > $this.$max0) {
        var$2 = new jl_IllegalArgumentException;
        jl_Exception__init_(var$2, $rt_s(94));
        $rt_throw(var$2);
    }
    $this.$value = $text;
};
function a() {
    let a = this; jl_Object.call(a);
    a.$long2 = null;
    a.$if7 = 0;
    a.$char2 = 0;
    a.$for5 = null;
    a.$try2 = 0;
    a.$a28 = 0;
    a.$byte5 = 0;
    a.$goto3 = 0;
    a.$int5 = 0;
    a.$case4 = 0;
}
let a_for = var$0 => {
    return var$0.$long2;
},
a_do = var$0 => {
    return var$0.$if7;
},
a_a = (var$0, var$1, var$2, var$3) => {
    var$0.$long2.data[var$1 + $rt_imul(var$2, var$0.$if7) | 0] = var$3;
},
a_a0 = (var$0, var$1, var$2, var$3, var$4, var$5, var$6, var$7) => {
    let var$8, var$9, var$10, var$11, var$12, var$13, var$14;
    if (!var$0.$int5) {
        if (var$6 >= 0)
            var$4 = var$6;
        else {
            var$4 = $rt_imul(var$0.$if7, var$0.$try2);
            var$4 = (var$6 % var$4 | 0) + var$4 | 0;
        }
    } else if (var$6 < 0)
        var$4 = 0;
    else {
        var$4 = $rt_imul(var$0.$if7, var$0.$try2) - var$4 | 0;
        if (var$6 < var$4)
            var$4 = var$6;
    }
    if (!var$0.$case4) {
        if (var$7 >= 0)
            var$5 = var$7;
        else {
            var$5 = $rt_imul(var$0.$char2, var$0.$a28);
            var$5 = (var$7 % var$5 | 0) + var$5 | 0;
        }
    } else if (var$7 < 0)
        var$5 = 0;
    else {
        var$5 = $rt_imul(var$0.$char2, var$0.$a28) - var$5 | 0;
        if (var$7 < var$5)
            var$5 = var$7;
    }
    var$6 = var$0.$try2;
    var$7 = var$4 / var$6 | 0;
    var$8 = var$0.$a28;
    var$9 = var$5 / var$8 | 0;
    var$6 = var$4 % var$6 | 0;
    var$4 = var$5 % var$8 | 0;
    var$10 = var$2 - var$6 | 0;
    var$11 = var$3 - var$4 | 0;
    var$3 = var$0.$goto3;
    var$12 = 0;
    var$2 = var$9 + var$3 | 0;
    var$4 = var$0.$char2;
    if (var$2 <= var$4)
        var$2 = var$3;
    else {
        var$2 = var$4 - var$9 | 0;
        var$12 = var$3 - var$2 | 0;
    }
    var$3 = var$0.$byte5;
    var$4 = 0;
    var$5 = var$7 + var$3 | 0;
    var$6 = var$0.$if7;
    if (var$5 <= var$6)
        var$5 = var$3;
    else {
        var$5 = var$6 - var$7 | 0;
        var$4 = var$3 - var$5 | 0;
    }
    var$3 = jml_Graphics_getClipX(var$1);
    var$6 = jml_Graphics_getClipY(var$1);
    var$13 = var$1.$cw0;
    var$14 = var$1.$ch;
    a_if(var$0, var$1, var$10, var$11, var$7, var$9, var$5, var$2);
    if (!var$0.$int5 && var$4 > 0) {
        jml_Graphics_setClip(var$1, var$3, var$6, var$13, var$14);
        a_if(var$0, var$1, var$10 + $rt_imul(var$5, var$0.$try2) | 0, var$11, 0, var$9, var$4, var$2);
    }
    if (!var$0.$case4 && var$12 > 0) {
        jml_Graphics_setClip(var$1, var$3, var$6, var$13, var$14);
        a_if(var$0, var$1, var$10, var$11 + $rt_imul(var$2, var$0.$a28) | 0, var$7, 0, var$5, var$12);
    }
    if (!var$0.$int5 && !var$0.$case4 && var$4 > 0 && var$12 > 0) {
        jml_Graphics_setClip(var$1, var$3, var$6, var$13, var$14);
        a_if(var$0, var$1, var$10 + $rt_imul(var$5, var$0.$try2) | 0, var$11 + $rt_imul(var$2, var$0.$a28) | 0, 0, 0, var$4, var$12);
    }
    jml_Graphics_setClip(var$1, var$3, var$6, var$13, var$14);
},
a_if = (var$0, var$1, var$2, var$3, var$4, var$5, var$6, var$7) => {
    let var$8, var$9, var$10, var$11, var$12, var$13, var$14, var$15, var$16, var$17, var$18;
    var$8 = jml_Graphics_getClipX(var$1);
    var$9 = jml_Graphics_getClipY(var$1);
    var$10 = var$1.$cw0;
    var$11 = var$1.$ch;
    var$12 = jml_Image_getWidth(var$0.$for5);
    var$13 = var$4 + $rt_imul(var$5, var$0.$if7) | 0;
    var$14 = 0;
    while (var$14 < var$7) {
        var$15 = 0;
        var$16 = var$2;
        var$4 = var$13;
        while (var$15 < var$6) {
            var$17 = var$0.$long2.data[var$4];
            if (var$17) {
                jml_Graphics_setClip(var$1, var$8, var$9, var$10, var$11);
                jml_Graphics_clipRect(var$1, var$16, var$3, var$0.$try2, var$0.$a28);
                var$5 = $rt_imul( -var$17 | 0, var$0.$try2);
                var$18 = var$5 % var$12 | 0;
                var$5 = $rt_imul(var$5 / var$12 | 0, var$0.$a28);
                jml_Graphics_drawImage(var$1, var$0.$for5, var$16 + var$18 | 0, var$3 + var$5 | 0, 20);
            }
            var$16 = var$16 + var$0.$try2 | 0;
            var$15 = var$15 + 1 | 0;
            var$4 = var$4 + 1 | 0;
        }
        var$3 = var$3 + var$0.$a28 | 0;
        var$13 = var$13 + var$0.$if7 | 0;
        var$14 = var$14 + 1 | 0;
    }
};
function f() {
    let a = this; jl_Object.call(a);
    a.$goto2 = 0;
    a.$else0 = 0;
    a.$new5 = null;
    a.$if12 = 0;
    a.$byte6 = 0;
    a.$char4 = 0;
    a.$void1 = 0;
    a.$null1 = null;
    a.$a32 = 0;
    a.$long5 = 0;
    a.$c1 = 0;
    a.$b3 = 0;
}
let f_int = var$0 => {
    return var$0.$goto2;
},
f_if = var$0 => {
    return var$0.$else0;
},
f_a = (var$0, var$1, var$2, var$3, var$4, var$5, var$6) => {
    return f_a0(var$0, var$1, var$2, var$3, var$4, var$5, var$6, var$0.$null1);
},
f_a0 = (var$0, var$1, var$2, var$3, var$4, var$5, var$6, var$7) => {
    let var$8, var$9, var$10, var$11, var$12, var$13, var$14, var$15, var$16, var$17, var$18, var$19;
    var$8 = var$0.$a32;
    var$9 = 1 << var$8;
    var$10 = var$3 - var$9 | 0;
    var$11 = var$4 - var$9 | 0;
    var$0.$goto2 = var$5;
    var$0.$else0 = var$6;
    var$0.$c1 = 0;
    var$0.$b3 = 0;
    var$12 = var$0.$if12;
    var$13 = var$0.$char4;
    var$3 = $rt_imul(var$12, var$13) << var$8;
    var$4 = var$0.$byte6;
    var$14 = var$0.$void1;
    var$4 = $rt_imul(var$4, var$14) << var$8;
    if (var$1 < 0)
        var$1 = (var$1 % var$3 | 0) + var$3 | 0;
    else if (var$1 >= var$3)
        var$1 = var$1 % var$3 | 0;
    if (var$2 < 0)
        var$2 = (var$2 % var$4 | 0) + var$4 | 0;
    else if (var$2 >= var$4)
        var$2 = var$2 % var$4 | 0;
    a: {
        if (var$5) {
            var$3 = var$1 + var$5 | 0;
            if (var$5 <= 0)
                var$4 = var$1;
            else {
                var$4 = var$1 + var$10 | 0;
                var$3 = var$3 + var$10 | 0;
            }
            var$4 = (var$4 / var$13 | 0) >> var$8;
            var$3 = (var$3 / var$13 | 0) >> var$8;
            if (var$4 != var$3) {
                var$4 = (var$2 / var$14 | 0) >> var$8;
                var$15 = ((var$2 + var$11 | 0) / var$14 | 0) >> var$8;
                var$16 = var$3 + $rt_imul(var$4, var$12) | 0;
                b: {
                    while (true) {
                        if (var$4 > var$15)
                            break a;
                        var$17 = var$7.data;
                        var$18 = var$0.$new5.data;
                        var$9 = var$17[var$18[var$16]];
                        if (var$9) {
                            if (var$5 > 0 && !(var$9 & 2))
                                break b;
                            if (var$5 < 0 && !(var$9 & 4))
                                break;
                        }
                        var$16 = var$16 + var$12 | 0;
                        var$9 = var$18.length;
                        if (var$16 >= var$9)
                            var$16 = var$16 % var$9 | 0;
                        var$4 = var$4 + 1 | 0;
                    }
                    var$0.$goto2 = ( -var$1 | 0) % (var$13 << var$8) | 0;
                    var$0.$c1 = 1;
                    break a;
                }
                var$0.$goto2 = ((($rt_imul(var$3, var$13) - (var$10 >> var$8) | 0) - (var$1 >> var$8) | 0) - 1 | 0) << var$8;
                var$0.$c1 = 1;
            }
        }
    }
    c: {
        if (var$6) {
            var$3 = var$2 + var$6 | 0;
            if (var$6 <= 0)
                var$4 = var$2;
            else {
                var$4 = var$2 + var$11 | 0;
                var$3 = var$3 + var$11 | 0;
            }
            var$4 = (var$4 / var$14 | 0) >> var$8;
            var$9 = (var$3 / var$14 | 0) >> var$8;
            if (var$4 != var$9) {
                var$1 = var$1 + var$0.$goto2 | 0;
                var$19 = (var$1 / var$13 | 0) >> var$8;
                var$15 = ((var$1 + var$10 | 0) / var$13 | 0) >> var$8;
                var$3 = var$19 + $rt_imul(var$9, var$12) | 0;
                var$4 = var$19;
                d: {
                    while (true) {
                        if (var$19 > var$15)
                            break c;
                        var$18 = var$0.$new5.data;
                        var$1 = var$18.length;
                        if (var$3 >= var$1)
                            var$3 = var$3 % var$1 | 0;
                        var$5 = var$7.data[var$18[var$3]];
                        if (var$5) {
                            if (var$6 > 0 && !(var$5 & 8))
                                break d;
                            if (var$6 < 0 && !(var$5 & 16))
                                break;
                        }
                        var$4 = var$4 + 1 | 0;
                        var$3 = var$3 + 1 | 0;
                        if (var$4 == var$12) {
                            var$4 = 0;
                            var$3 = var$3 - var$12 | 0;
                        }
                        var$19 = var$19 + 1 | 0;
                    }
                    var$0.$else0 = ( -var$2 | 0) % (var$14 << var$8) | 0;
                    var$0.$b3 = 1;
                    break c;
                }
                var$0.$else0 = ((($rt_imul(var$9, var$14) - (var$11 >> var$8) | 0) - (var$2 >> var$8) | 0) - 1 | 0) << var$8;
                var$0.$b3 = 1;
            }
        }
    }
    return !(!var$0.$c1 && !var$0.$b3) ? 1 : 0;
};
function e() {
    let a = this; jl_Object.call(a);
    a.$goto4 = null;
    a.$g1 = 0;
    a.$h1 = 0;
    a.$else1 = null;
    a.$a29 = null;
    a.$c0 = null;
    a.$case3 = null;
    a.$try3 = null;
    a.$i1 = null;
    a.$d0 = null;
    a.$void0 = null;
    a.$do6 = 0;
    a.$if11 = 0;
    a.$e1 = 0;
    a.$char3 = 0;
    a.$b9 = 0;
    a.$long1 = null;
    a.$null2 = 0;
    a.$f0 = 0;
    a.$for9 = 0;
    a.$new3 = null;
    a.$int4 = 0;
}
let e_a1 = var$0 => {
    let var$1, $$je;
    a: {
        b: {
            try {
                var$0.$new3 = null;
                var$0.$else1 = null;
                var$0.$a29 = null;
                var$0.$c0 = null;
                var$0.$case3 = null;
                var$0.$try3 = null;
                var$0.$d0 = null;
                var$1 = var$0.$i1;
                if (var$1 !== null)
                    ji_FilterInputStream_close(var$1);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
    }
    var$0.$i1 = null;
},
e_a0 = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, $$je;
    a: {
        b: {
            try {
                c: {
                    try {
                        var$0.$d0 = $rt_createBooleanArray(GameMIDlet_int());
                        var$2 = ji_DataInputStream__init_(w_Resources_open(jl_Object_getClass(var$0), jl_StringBuffer_toString(jl_StringBuffer_append(jl_StringBuffer_append(jl_StringBuffer__init_(), $rt_s(17)), var$1))));
                        var$0.$i1 = var$2;
                        var$3 = ji_DataInputStream_readByte(var$2);
                        var$0.$else1 = $rt_createBooleanArray(var$3);
                        var$0.$a29 = $rt_createByteArray(var$3);
                        var$0.$c0 = $rt_createByteArray(var$3);
                        var$0.$case3 = $rt_createShortArray(var$3);
                        var$0.$try3 = $rt_createShortArray(var$3);
                        var$4 = 0;
                        while (var$4 < var$3) {
                            var$0.$a29.data[var$4] = ji_DataInputStream_readByte(var$0.$i1);
                            var$4 = var$4 + 1 | 0;
                        }
                        var$0.$h1 = ji_DataInputStream_readByte(var$0.$i1);
                        break a;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_Exception) {
                            var$1 = $$je;
                            break c;
                        } else {
                            throw $$e;
                        }
                    }
                }
                d: {
                    e: {
                        try {
                            var$5 = var$0.$i1;
                            if (var$5 !== null)
                                ji_FilterInputStream_close(var$5);
                            break d;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof jl_Exception) {
                                break e;
                            } else {
                                throw $$e;
                            }
                        }
                    }
                }
                var$0.$i1 = null;
                jl_Throwable_printStackTrace(var$1);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$1 = $$je;
                break b;

            }
        }
        $rt_throw(var$1);
    }
    var$0.$new3 = null;
    var$0.$g1 = 0;
    var$0.$h1 = 0;
},
e_for = var$0 => {
    return var$0.$h1 != (-1) ? 0 : 1;
},
e_a4 = (var$0, var$1, var$2) => {
    let var$3, var$4, var$5, var$6, $$je;
    var$0.$g1 = var$0.$g1 + 1 | 0;
    a: {
        b: {
            try {
                while (true) {
                    var$1 = var$0.$h1;
                    if (var$1 == (-1))
                        break;
                    if (var$0.$g1 < var$1)
                        break;
                    c: {
                        d: {
                            e: {
                                f: {
                                    g: {
                                        h: {
                                            i: {
                                                j: {
                                                    k: {
                                                        l: {
                                                            switch (ji_DataInputStream_readByte(var$0.$i1)) {
                                                                case -1:
                                                                    break;
                                                                case 0:
                                                                    break i;
                                                                case 1:
                                                                    break k;
                                                                case 2:
                                                                    break h;
                                                                case 3:
                                                                    break e;
                                                                case 4:
                                                                    break d;
                                                                case 5:
                                                                    break l;
                                                                case 6:
                                                                    break g;
                                                                case 7:
                                                                    break j;
                                                                case 8:
                                                                    break f;
                                                                default:
                                                                    break c;
                                                            }
                                                            break c;
                                                        }
                                                        ji_DataInputStream_readByte(var$0.$i1);
                                                        break c;
                                                    }
                                                    var$1 = ji_DataInputStream_readByte(var$0.$i1);
                                                    var$0.$else1.data[var$1] = 0;
                                                    break c;
                                                }
                                                var$1 = ji_DataInputStream_readByte(var$0.$i1);
                                                var$0.$d0.data[var$1] = 0;
                                                break c;
                                            }
                                            var$1 = ji_DataInputStream_readByte(var$0.$i1);
                                            var$2 = ji_DataInputStream_readShort(var$0.$i1);
                                            var$3 = ji_DataInputStream_readShort(var$0.$i1);
                                            var$0.$case3.data[var$1] = var$2;
                                            var$0.$try3.data[var$1] = var$3;
                                            var$0.$else1.data[var$1] = 1;
                                            break c;
                                        }
                                        var$0.$do6 = $rt_imul(ji_DataInputStream_readShort(var$0.$i1), var$0.$long1.$cx) >> 4;
                                        var$0.$if11 = $rt_imul(ji_DataInputStream_readShort(var$0.$i1), var$0.$long1.$cw) >> 4;
                                        break c;
                                    }
                                    var$1 = ji_DataInputStream_readByte(var$0.$i1);
                                    var$2 = ji_DataInputStream_readInt(var$0.$i1);
                                    var$0.$null2 = var$2 >> 16 & 255;
                                    var$0.$f0 = var$2 >> 8 & 255;
                                    var$0.$for9 = var$2 & 255;
                                    var$0.$d0.data[var$1] = 1;
                                    break c;
                                }
                                var$1 = ji_DataInputStream_readShort(var$0.$i1);
                                var$2 = ji_DataInputStream_readShort(var$0.$i1);
                                a_a(var$0.$long1.$bg, var$1, var$2, 16);
                                var$4 = var$0.$long1.$bg;
                                var$3 = var$1 + 1 | 0;
                                a_a(var$4, var$3, var$2, 17);
                                var$4 = var$0.$long1.$bg;
                                var$2 = var$2 + 1 | 0;
                                a_a(var$4, var$1, var$2, 18);
                                a_a(var$0.$long1.$bg, var$3, var$2, 19);
                                break c;
                            }
                            var$1 = ji_DataInputStream_readByte(var$0.$i1);
                            var$2 = ji_DataInputStream_readByte(var$0.$i1);
                            var$3 = ji_DataInputStream_readByte(var$0.$i1);
                            var$5 = ji_DataInputStream_readByte(var$0.$i1);
                            var$6 = var$0.$case3.data;
                            var$6[var$1] = (var$6[var$1] + var$2 | 0) << 16 >> 16;
                            var$6 = var$0.$try3.data;
                            var$6[var$1] = (var$6[var$1] + var$3 | 0) << 16 >> 16;
                            var$0.$c0.data[var$1] = var$5;
                            break c;
                        }
                        var$1 = ji_DataInputStream_readByte(var$0.$i1);
                        var$2 = $rt_compare(var$1, 2);
                        if (!var$2)
                            c_a3(var$1);
                        if (!var$2)
                            h_a0(100, 200);
                    }
                    var$0.$g1 = var$0.$h1;
                    var$1 = ji_DataInputStream_readByte(var$0.$i1);
                    if (var$1 < 0) {
                        var$0.$h1 = (-1);
                        continue;
                    }
                    var$0.$h1 = var$0.$h1 + var$1 | 0;
                }
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    var$4 = $$je;
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        jl_Throwable_printStackTrace(var$4);
    }
},
e_a3 = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10;
    var$2 = 0;
    while (true) {
        var$3 = var$0.$a29.data;
        if (var$2 >= var$3.length)
            break;
        a: {
            if (var$0.$else1.data[var$2]) {
                b: {
                    c: {
                        d: {
                            e: {
                                f: {
                                    g: {
                                        h: {
                                            i: {
                                                var$4 = var$0.$case3.data[var$2];
                                                var$5 = var$0.$long1;
                                                var$4 = ($rt_imul(var$4, var$5.$cx) >> 4) - var$0.$do6 | 0;
                                                var$6 = ($rt_imul(var$0.$try3.data[var$2], var$5.$cw) >> 4) - var$0.$if11 | 0;
                                                switch (var$3[var$2]) {
                                                    case 7:
                                                    case 8:
                                                    case 9:
                                                    case 10:
                                                        break a;
                                                    case 0:
                                                        break i;
                                                    case 1:
                                                        break e;
                                                    case 2:
                                                        break;
                                                    case 3:
                                                        break h;
                                                    case 4:
                                                        break g;
                                                    case 5:
                                                        break f;
                                                    case 6:
                                                        break d;
                                                    case 11:
                                                        break c;
                                                    case 12:
                                                        break b;
                                                    default:
                                                        break a;
                                                }
                                                var$7 = jml_Image_getHeight(var$5.$cd);
                                                jml_Graphics_setClip(var$1, var$4, (var$6 - var$7 | 0) + 1 | 0, 40, var$7);
                                                var$4 = var$4 - (40 * var$0.$c0.data[var$2] | 0) | 0;
                                                jml_Graphics_drawImage(var$1, var$0.$long1.$cd, var$4, var$6, 36);
                                                break a;
                                            }
                                            var$7 = var$5.$a50;
                                            jml_Graphics_setClip(var$1, var$4, (var$6 - var$7 | 0) + 1 | 0, var$5.$aS, var$7);
                                            var$5 = var$0.$long1;
                                            jml_Graphics_drawImage(var$1, var$5.$aU, var$4 - $rt_imul(var$0.$c0.data[var$2], var$5.$aS) | 0, var$6, 36);
                                            break a;
                                        }
                                        var$7 = jml_Image_getHeight(var$5.$cd);
                                        jml_Graphics_setClip(var$1, var$4, (var$6 - var$7 | 0) + 1 | 0, 26, var$7);
                                        var$4 = var$4 - (80 + (26 * var$0.$c0.data[var$2] | 0) | 0) | 0;
                                        jml_Graphics_drawImage(var$1, var$0.$long1.$cd, var$4, var$6, 36);
                                        break a;
                                    }
                                    var$7 = var$5.$b8;
                                    var$8 = var$5.$c9;
                                    jml_Graphics_setClip(var$1, var$4, var$6 - var$8 | 0, var$7, var$8);
                                    var$4 = var$4 + $rt_imul( -var$7 | 0, 1 + var$0.$c0.data[var$2] | 0) | 0;
                                    jml_Graphics_drawImage(var$1, var$0.$long1.$L, var$4, var$6, 36);
                                    break a;
                                }
                                if (var$0.$c0.data[var$2])
                                    break a;
                                var$7 = var$5.$b8;
                                var$8 = var$5.$c9;
                                jml_Graphics_setClip(var$1, var$4, (var$6 - var$8 | 0) + 1 | 0, var$7, var$8);
                                jml_Graphics_drawImage(var$1, var$0.$long1.$L, var$4, var$6, 36);
                                break a;
                            }
                            var$7 = var$5.$a50;
                            jml_Graphics_setClip(var$1, var$4, (var$6 - var$7 | 0) + 1 | 0, var$5.$aS, var$7);
                            var$5 = var$0.$long1;
                            jml_Graphics_drawImage(var$1, var$5.$aU, var$4 - $rt_imul(4 + var$0.$c0.data[var$2] | 0, var$5.$aS) | 0, var$6, 36);
                            break a;
                        }
                        var$7 = jml_Image_getWidth(var$5.$bW) / 2 | 0;
                        var$8 = jml_Image_getHeight(var$0.$long1.$bW);
                        jml_Graphics_setClip(var$1, var$4, var$6 - var$8 | 0, var$7, var$8);
                        var$4 = var$4 - $rt_imul(var$7, var$0.$c0.data[var$2]) | 0;
                        jml_Graphics_drawImage(var$1, var$0.$long1.$bW, var$4, var$6, 36);
                        break a;
                    }
                    jml_Graphics_setClip(var$1, var$4, var$6, var$5.$b1, var$5.$cf);
                    var$7 = jml_Image_getWidth(var$0.$long1.$bJ);
                    var$5 = var$0.$long1;
                    var$8 = (-23) * var$5.$b1 | 0;
                    var$9 = var$8 % var$7 | 0;
                    var$7 = $rt_imul(var$8 / var$7 | 0, var$5.$cf);
                    var$5 = var$5.$bJ;
                    var$8 = var$4 + var$9 | 0;
                    var$7 = var$6 + var$7 | 0;
                    jml_Graphics_drawImage(var$1, var$5, var$8, var$7, 20);
                    var$5 = var$0.$long1;
                    var$8 = var$5.$b1;
                    var$4 = var$4 + var$8 | 0;
                    jml_Graphics_setClip(var$1, var$4, var$6, var$8, var$5.$cf);
                    jml_Graphics_drawImage(var$1, var$0.$long1.$bJ, var$4 + var$9 | 0, var$7, 20);
                    break a;
                }
                jml_Graphics_setClip(var$1, var$4, var$6, var$5.$b1, var$5.$cf);
                var$7 = jml_Image_getWidth(var$0.$long1.$bJ);
                var$5 = var$0.$long1;
                var$8 = (-13) * var$5.$b1 | 0;
                var$10 = var$8 % var$7 | 0;
                var$8 = $rt_imul(var$8 / var$7 | 0, var$5.$cf);
                var$5 = var$5.$bJ;
                var$7 = var$4 + var$10 | 0;
                var$8 = var$6 + var$8 | 0;
                jml_Graphics_drawImage(var$1, var$5, var$7, var$8, 20);
                var$5 = var$0.$long1;
                var$7 = var$5.$b1;
                var$9 = var$4 + var$7 | 0;
                jml_Graphics_setClip(var$1, var$9, var$6, var$7, var$5.$cf);
                jml_Graphics_drawImage(var$1, var$0.$long1.$bJ, var$9 + var$10 | 0, var$8, 20);
                var$5 = var$0.$long1;
                var$4 = var$5.$b1;
                var$7 = var$9 + var$4 | 0;
                jml_Graphics_setClip(var$1, var$7, var$6, var$4, var$5.$cf);
                jml_Graphics_drawImage(var$1, var$0.$long1.$bJ, var$7 + var$10 | 0, var$8, 20);
            }
        }
        var$2 = var$2 + 1 | 0;
    }
},
e_if0 = (var$0, var$1) => {
    let var$2, var$3;
    var$2 = 0;
    while (true) {
        var$3 = var$0.$d0.data;
        if (var$2 >= var$3.length)
            break;
        if (var$3[var$2])
            e_a2(var$0, var$1, GameMIDlet_a(var$2), var$0.$null2, var$0.$f0, var$0.$for9);
        var$2 = var$2 + 1 | 0;
    }
},
e_a = (var$0, var$1, var$2) => {
    e_a2(var$0, var$1, var$2, 99, 48, 0);
},
e_if = var$0 => {
    var$0.$new3 = null;
},
e_a2 = (var$0, var$1, var$2, var$3, var$4, var$5) => {
    let var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14, var$15, var$16;
    if (var$0.$new3 !== var$2) {
        var$0.$new3 = var$2;
        var$0.$int4 = 0;
    }
    var$6 = var$0.$int4 + 1 | 0;
    var$0.$int4 = var$6;
    var$0.$int4 = var$6 + 1 | 0;
    jml_Graphics_setClip(var$1, 0, 0, var$0.$e1, var$0.$char3 + 1 | 0);
    var$7 = var$0.$void0;
    var$1.$font = var$7;
    var$8 = var$0.$e1 / 2 | 0;
    var$9 = jml_Font_stringWidth(var$7, var$2) + 2 | 0;
    var$10 = jml_Font_getHeight(var$0.$void0) + 4 | 0;
    var$11 = var$0.$e1;
    if (var$9 > var$11) {
        var$6 = var$0.$int4;
        var$8 = var$6 < 7 ? var$8 + ((var$9 - var$11 | 0) / 2 | 0) | 0 : var$6 >= ((7 + var$9 | 0) - var$11 | 0) ? var$8 - ((var$9 - var$11 | 0) / 2 | 0) | 0 : var$8 + ((((var$9 - var$11 | 0) / 2 | 0) - var$6 | 0) + 7 | 0) | 0;
    }
    var$6 = var$0.$char3;
    var$12 = var$6 - ((8 * var$6 | 0) / 100 | 0) | 0;
    if (!((var$6 - var$12 | 0) >= 2 && ((100 * var$10 | 0) / var$6 | 0) < 19))
        var$12 = var$6 - 2 | 0;
    jml_Graphics_setColor(var$1, var$3, var$4, var$5);
    var$13 = (var$8 - (var$9 / 2 | 0) | 0) - 1 | 0;
    var$14 = (var$12 - var$10 | 0) + 2 | 0;
    jml_Graphics_fillRect(var$1, var$13, var$14, var$9, var$10);
    jml_Graphics_setColor(var$1, 254, 254, 254);
    var$15 = var$1.$target;
    var$3 = var$1.$color;
    var$4 = var$1.$cx0;
    var$5 = var$1.$cy0;
    var$6 = var$1.$cw0;
    var$16 = var$1.$ch;
    var$11 = var$13 + var$1.$tx | 0;
    var$13 = var$14 + var$1.$ty | 0;
    globalThis.mikiPlatform.rect(var$15, var$3, var$4, var$5, var$6, var$16, var$11, var$13, var$9, var$10, !!1);
    var$3 = var$8 - (jml_Font_stringWidth(var$1.$font, var$2) / 2 | 0) | 0;
    var$4 = var$12 - jml_Font_getHeight(var$1.$font) | 0;
    var$5 = var$1.$target;
    var$6 = var$1.$color;
    var$7 = var$1.$font;
    var$16 = var$7.$size1;
    var$11 = var$7.$bold;
    var$13 = var$1.$cx0;
    var$8 = var$1.$cy0;
    var$14 = var$1.$cw0;
    var$15 = var$1.$ch;
    var$3 = var$3 + var$1.$tx | 0;
    var$4 = var$4 + var$1.$ty | 0;
    globalThis.mikiPlatform.drawText(var$5, $rt_ustr(var$2), var$6, var$16, !!var$11, var$13, var$8, var$14, var$15, var$3, var$4);
},
ju_HashMap$HashEntry = $rt_classWithoutFields(ju_MapEntry),
ju_LinkedHashMap$LinkedHashMapEntry = $rt_classWithoutFields(ju_HashMap$HashEntry),
cnmu_DeviceControl = $rt_classWithoutFields(),
cnmu_DeviceControl_startVibra = ($intensity, $duration) => {
    globalThis.mikiPlatform.vibrate(Long_lo((jl_Math_min0($duration, Long_fromInt(10000)))));
};
function jml_Command() {
    let a = this; jl_Object.call(a);
    a.$label = null;
    a.$type = 0;
    a.$priority = 0;
}
let jml_Command__init_0 = ($this, $label, $type, $priority) => {
    $this.$label = $label;
    $this.$type = $type;
    $this.$priority = $priority;
},
jml_Command__init_ = (var_0, var_1, var_2) => {
    let var_3 = new jml_Command();
    jml_Command__init_0(var_3, var_0, var_1, var_2);
    return var_3;
};
function jml_Font() {
    let a = this; jl_Object.call(a);
    a.$size1 = 0;
    a.$bold = 0;
}
let jml_Font_getFont = ($face, $style, $size) => {
    let var$4;
    var$4 = new jml_Font;
    $size = $size == 8 ? 10 : $size != 16 ? 12 : 16;
    $face = !($style & 1) ? 0 : 1;
    var$4.$size1 = $size;
    var$4.$bold = $face;
    return var$4;
},
jml_Font_getHeight = $this => {
    return $this.$size1 + 2 | 0;
},
jml_Font_stringWidth = ($this, $text) => {
    return globalThis.mikiPlatform.measure($rt_ustr($text), $this.$size1, !!$this.$bold);
};
function ji_PrintStream() {
    let a = this; ji_FilterOutputStream.call(a);
    a.$autoFlush = 0;
    a.$sb = null;
    a.$buffer0 = null;
    a.$charset = null;
}
let otcic_JsConsolePrintStream = $rt_classWithoutFields(ji_PrintStream),
otcic_JSStderrPrintStream = $rt_classWithoutFields(otcic_JsConsolePrintStream),
otcic_JSStderrPrintStream_print = ($this, $s) => {
    if ($s === null)
        $s = $rt_s(2);
    $rt_putStderr($rt_ustr($s));
};
function jl_Thread() {
    let a = this; jl_Object.call(a);
    a.$id1 = Long_ZERO;
    a.$timeSliceStart = Long_ZERO;
    a.$finishedLock = null;
    a.$name1 = null;
    a.$alive = 0;
    a.$target0 = null;
}
let jl_Thread_mainThread = null,
jl_Thread_currentThread0 = null,
jl_Thread_nextId = 0,
jl_Thread_activeCount = 0,
jl_Thread_defaultUncaughtExceptionHandler = null,
jl_Thread_$callClinit = () => {
    jl_Thread_$callClinit = $rt_eraseClinit(jl_Thread);
    jl_Thread__clinit_();
},
jl_Thread_setCurrentThread = $thread_0 => {
    jl_Thread_$callClinit();
    if (jl_Thread_currentThread0 !== $thread_0)
        jl_Thread_currentThread0 = $thread_0;
    jl_Thread_currentThread0.$timeSliceStart = jl_System_currentTimeMillis();
},
jl_Thread_currentThread = () => {
    jl_Thread_$callClinit();
    return jl_Thread_currentThread0;
},
jl_Thread__clinit_ = () => {
    let var$1, var$2, var$3;
    var$1 = new jl_Thread;
    jl_Thread_$callClinit();
    var$2 = null;
    var$1.$finishedLock = new jl_Object;
    var$1.$alive = 1;
    var$1.$name1 = $rt_s(95);
    var$1.$target0 = var$2;
    var$3 = jl_Thread_nextId;
    jl_Thread_nextId = var$3 + 1 | 0;
    var$1.$id1 = Long_fromInt(var$3);
    jl_Thread_mainThread = var$1;
    jl_Thread_currentThread0 = var$1;
    jl_Thread_nextId = 1;
    jl_Thread_activeCount = 1;
    jl_Thread_defaultUncaughtExceptionHandler = new jl_DefaultUncaughtExceptionHandler;
};
function jl_Object$Monitor() {
    let a = this; jl_Object.call(a);
    a.$enteringThreads = null;
    a.$notifyListeners = null;
    a.$owner = null;
    a.$count = 0;
}
let jl_IllegalStateException = $rt_classWithoutFields(jl_RuntimeException),
jl_IllegalMonitorStateException = $rt_classWithoutFields(jl_RuntimeException);
function jml_List() {
    let a = this; jml_Screen.call(a);
    a.$items = null;
    a.$selected = 0;
}
let jml_List_SELECT_COMMAND = null,
jml_List_$callClinit = () => {
    jml_List_$callClinit = $rt_eraseClinit(jml_List);
    jml_List__clinit_();
},
jml_List_append = ($this, $value, $image) => {
    ju_ArrayList_add($this.$items, $value);
    if ($this.$selected < 0)
        $this.$selected = 0;
    jml_Display_$callClinit();
    jml_Display_dirty = 1;
    return $this.$items.$size0 - 1 | 0;
},
jml_List_delete = ($this, $index) => {
    ju_ArrayList_remove($this.$items, $index);
    $this.$selected = jl_Math_min($this.$selected, $this.$items.$size0 - 1 | 0);
    jml_Display_$callClinit();
    jml_Display_dirty = 1;
},
jml_List_size = $this => {
    return $this.$items.$size0;
},
jml_List_render = $this => {
    let $i, var$2, var$3;
    jml_Displayable_render($this);
    $i = 0;
    while (true) {
        var$2 = $this.$items;
        if ($i >= var$2.$size0)
            break;
        var$2 = ju_ArrayList_get(var$2, $i);
        var$3 = $i != $this.$selected ? 0 : 1;
        globalThis.mikiPlatform.addOption($i, $rt_ustr(var$2), !!var$3);
        $i = $i + 1 | 0;
    }
},
jml_List__clinit_ = () => {
    jml_List_SELECT_COMMAND = jml_Command__init_($rt_s(96), 8, 0);
},
ji_UTFDataFormatException = $rt_classWithoutFields(ji_IOException),
otp_PlatformRunnable = $rt_classWithoutFields(0);
function jl_Object$monitorExit$lambda$_8_1() {
    jl_Object.call(this);
    this.$_0 = null;
}
let jnc_Charset = $rt_classWithoutFields(),
jl_Thread$UncaughtExceptionHandler = $rt_classWithoutFields(0),
jl_DefaultUncaughtExceptionHandler = $rt_classWithoutFields(),
oti_AsyncCallback = $rt_classWithoutFields(0);
function otpp_AsyncCallbackWrapper() {
    jl_Object.call(this);
    this.$realAsyncCallback = null;
}
let otpp_AsyncCallbackWrapper_create = $realAsyncCallback => {
    let var$2;
    var$2 = new otpp_AsyncCallbackWrapper;
    var$2.$realAsyncCallback = $realAsyncCallback;
    return var$2;
},
otpp_AsyncCallbackWrapper_complete = ($this, $result) => {
    $this.$realAsyncCallback.$complete($result);
},
otpp_AsyncCallbackWrapper_error = ($this, $e) => {
    $this.$realAsyncCallback.$error($e);
};
function jl_Object$monitorEnterWait$lambda$_6_0() {
    let a = this; jl_Object.call(a);
    a.$_00 = null;
    a.$_1 = null;
    a.$_2 = 0;
    a.$_3 = null;
}
let ju_Queue = $rt_classWithoutFields(0),
ju_Deque = $rt_classWithoutFields(0);
function ju_ArrayDeque() {
    let a = this; ju_AbstractCollection.call(a);
    a.$version = 0;
    a.$array = null;
    a.$head = 0;
    a.$tail = 0;
}
let ju_ArrayDeque_isEmpty = $this => {
    return $this.$head != $this.$tail ? 0 : 1;
},
ju_ArrayDeque_modInc = ($i, $mod) => {
    $i = $i + 1 | 0;
    if ($i == $mod)
        $i = 0;
    return $i;
};
function jml_Graphics() {
    let a = this; jl_Object.call(a);
    a.$target = 0;
    a.$tx = 0;
    a.$ty = 0;
    a.$cx0 = 0;
    a.$cy0 = 0;
    a.$cw0 = 0;
    a.$ch = 0;
    a.$color = 0;
    a.$font = null;
}
let jml_Graphics__init_0 = ($this, $target, $width, $height) => {
    $this.$font = jml_Font_getFont(0, 0, 0);
    $this.$target = $target;
    $this.$cw0 = $width;
    $this.$ch = $height;
},
jml_Graphics__init_ = (var_0, var_1, var_2) => {
    let var_3 = new jml_Graphics();
    jml_Graphics__init_0(var_3, var_0, var_1, var_2);
    return var_3;
},
jml_Graphics_translate = ($this, $x, $y) => {
    $this.$tx = $this.$tx + $x | 0;
    $this.$ty = $this.$ty + $y | 0;
},
jml_Graphics_getClipX = $this => {
    return $this.$cx0 - $this.$tx | 0;
},
jml_Graphics_getClipY = $this => {
    return $this.$cy0 - $this.$ty | 0;
},
jml_Graphics_setClip = ($this, $x, $y, $w, $h) => {
    $this.$cx0 = $x + $this.$tx | 0;
    $this.$cy0 = $y + $this.$ty | 0;
    $this.$cw0 = jl_Math_max(0, $w);
    $this.$ch = jl_Math_max(0, $h);
},
jml_Graphics_clipRect = ($this, $x, $y, $w, $h) => {
    let $left, $top;
    $left = jl_Math_max($this.$cx0, $x + $this.$tx | 0);
    $top = jl_Math_max($this.$cy0, $y + $this.$ty | 0);
    $this.$cw0 = jl_Math_max(0, jl_Math_min($this.$cx0 + $this.$cw0 | 0, ($x + $this.$tx | 0) + jl_Math_max(0, $w) | 0) - $left | 0);
    $this.$ch = jl_Math_max(0, jl_Math_min($this.$cy0 + $this.$ch | 0, ($y + $this.$ty | 0) + jl_Math_max(0, $h) | 0) - $top | 0);
    $this.$cx0 = $left;
    $this.$cy0 = $top;
},
jml_Graphics_setColor = ($this, $r, $g, $b) => {
    $this.$color = $r << 16 | $g << 8 | $b;
},
jml_Graphics_fillRect = ($this, $x, $y, $w, $h) => {
    let var$5, var$6, var$7, var$8, var$9, var$10, var$11;
    var$5 = $this.$target;
    var$6 = $this.$color;
    var$7 = $this.$cx0;
    var$8 = $this.$cy0;
    var$9 = $this.$cw0;
    var$10 = $this.$ch;
    $x = $x + $this.$tx | 0;
    var$11 = $y + $this.$ty | 0;
    globalThis.mikiPlatform.rect(var$5, var$6, var$7, var$8, var$9, var$10, $x, var$11, $w, $h, !!0);
},
jml_Graphics_drawImage = ($this, $image, $x, $y, $anchor) => {
    let var$5, var$6, var$7, var$8, var$9;
    if ($anchor & 8)
        $x = $x - jml_Image_getWidth($image) | 0;
    else if ($anchor & 1)
        $x = $x - (jml_Image_getWidth($image) / 2 | 0) | 0;
    if ($anchor & 32)
        $y = $y - jml_Image_getHeight($image) | 0;
    else if ($anchor & 2)
        $y = $y - (jml_Image_getHeight($image) / 2 | 0) | 0;
    $anchor = $this.$target;
    var$5 = $image.$id;
    var$6 = $this.$cx0;
    var$7 = $this.$cy0;
    var$8 = $this.$cw0;
    var$9 = $this.$ch;
    $x = $x + $this.$tx | 0;
    $y = $y + $this.$ty | 0;
    globalThis.mikiPlatform.blit($anchor, var$5, var$6, var$7, var$8, var$9, $x, $y);
};
function ju_AbstractList$1() {
    let a = this; jl_Object.call(a);
    a.$index = 0;
    a.$modCount0 = 0;
    a.$size2 = 0;
    a.$removeIndex = 0;
    a.$this$0 = null;
}
let ju_NoSuchElementException = $rt_classWithoutFields(jl_RuntimeException);
function ju_Vector() {
    let a = this; ju_AbstractList.call(a);
    a.$elementCount = 0;
    a.$elementData0 = null;
    a.$capacityIncrement = 0;
}
let ju_Vector_$assertionsDisabled = 0,
ju_Vector_$callClinit = () => {
    ju_Vector_$callClinit = $rt_eraseClinit(ju_Vector);
    ju_Vector__clinit_();
},
ju_Vector__init_0 = $this => {
    ju_Vector_$callClinit();
    $this.$elementData0 = $rt_createArray(jl_Object, 10);
    $this.$elementCount = 0;
    $this.$capacityIncrement = 0;
},
ju_Vector__init_ = () => {
    let var_0 = new ju_Vector();
    ju_Vector__init_0(var_0);
    return var_0;
},
ju_Vector_addElement = ($this, $object) => {
    let var$2, var$3, var$4, var$5, var$6;
    jl_Object_monitorEnterSync($this);
    try {
        var$2 = $this.$elementCount;
        var$3 = $this.$elementData0;
        var$4 = var$3.data.length;
        if (var$2 == var$4) {
            var$5 = $this.$capacityIncrement;
            if (var$5 <= 0)
                var$5 = !var$4 ? 1 : var$4;
            var$6 = $rt_createArray(jl_Object, var$4 + var$5 | 0);
            jl_System_fastArraycopy(var$3, 0, var$6, 0, var$2);
            $this.$elementData0 = var$6;
        }
        var$6 = $this.$elementData0.data;
        var$4 = $this.$elementCount;
        $this.$elementCount = var$4 + 1 | 0;
        var$6[var$4] = $object;
        $this.$modCount = $this.$modCount + 1 | 0;
    } finally {
        jl_Object_monitorExitSync($this);
    }
},
ju_Vector_elementAt = ($this, $location) => {
    let var$2;
    jl_Object_monitorEnterSync($this);
    try {
        if ($location >= $this.$elementCount) {
            var$2 = new jl_ArrayIndexOutOfBoundsException;
            jl_Integer_$callClinit();
            jl_Exception__init_(var$2, (jl_AbstractStringBuilder_append0(jl_AbstractStringBuilder__init_1(20), $location, 10)).$toString());
            $rt_throw(var$2);
        }
        return $this.$elementData0.data[$location];
    } finally {
        jl_Object_monitorExitSync($this);
    }
},
ju_Vector_size = $this => {
    jl_Object_monitorEnterSync($this);
    try {
        return $this.$elementCount;
    } finally {
        jl_Object_monitorExitSync($this);
    }
},
ju_Vector__clinit_ = () => {
    ju_Vector_$assertionsDisabled = 0;
},
jl_NegativeArraySizeException = $rt_classWithoutFields(jl_RuntimeException),
ju_ConcurrentModificationException = $rt_classWithoutFields(jl_RuntimeException);
$rt_packages([-1, "java", 0, "util", 0, "io", 0, "lang", -1, "javax", 4, "microedition", 5, "rms"
]);
$rt_metadata([jl_Object, "Object", 3, 0, [], 1, 0, 0, ["$equals0", $rt_wrapFunction1(jl_Object_equals)],
ji_Serializable, 0, jl_Object, [], 1537, 0, 0, 0,
jl_Comparable, 0, jl_Object, [], 1537, 0, 0, 0,
jl_CharSequence, 0, jl_Object, [], 1537, 0, 0, 0,
jl_String, 0, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 17, 0, () => jl_String_$callClinit(), ["$equals0", $rt_wrapFunction1(jl_String_equals)],
jlr_AnnotatedElement, 0, jl_Object, [], 1537, 0, 0, 0,
jlr_GenericDeclaration, 0, jl_Object, [jlr_AnnotatedElement], 1537, 0, 0, 0,
jlr_Type, 0, jl_Object, [], 1537, 0, 0, 0,
jl_Class, 0, jl_Object, [jlr_GenericDeclaration, jlr_Type], 17, 0, 0, 0,
jl_Number, 0, jl_Object, [ji_Serializable], 1025, 0, 0, 0,
jl_Integer, 0, jl_Number, [jl_Comparable], 1, 0, () => jl_Integer_$callClinit(), 0,
jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, ["$ensureCapacity", $rt_wrapFunction1(jl_AbstractStringBuilder_ensureCapacity), "$toString", $rt_wrapFunction0(jl_AbstractStringBuilder_toString)],
jl_Appendable, 0, jl_Object, [], 1537, 0, 0, 0,
jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 1, 0, 0, ["$toString", $rt_wrapFunction0(jl_StringBuilder_toString), "$ensureCapacity", $rt_wrapFunction1(jl_StringBuilder_ensureCapacity)],
jl_Throwable, 0, jl_Object, [], 1, 0, 0, 0,
jl_Exception, 0, jl_Throwable, [], 1, 0, 0, 0,
jl_RuntimeException, 0, jl_Exception, [], 1, 0, 0, 0,
otrr_ReflectionInfo, 0, jl_Object, [], 1025, 0, 0, 0,
otrr_ClassInfo, 0, otrr_ReflectionInfo, [], 17, 0, 0, 0,
otr_StringInfo, 0, otrr_ReflectionInfo, [], 17, 0, 0, 0,
BrowserGame, 0, jl_Object, [], 17, 0, () => BrowserGame_$callClinit(), 0,
jl_ClassCastException, "ClassCastException", 3, jl_RuntimeException, [], 1, 0, 0, 0,
otp_Platform, 0, jl_Object, [], 17, 0, 0, 0,
otji_JS, 0, jl_Object, [], 17, 0, 0, 0,
otci_IntegerUtil, 0, jl_Object, [], 17, 0, 0, 0,
jmm_MIDlet, 0, jl_Object, [], 1025, 0, 0, 0,
jl_Runnable, 0, jl_Object, [], 1537, 0, 0, 0,
GameMIDlet, 0, jmm_MIDlet, [jl_Runnable], 1, 0, 0, 0,
jml_Display, 0, jl_Object, [], 17, 0, () => jml_Display_$callClinit(), 0,
otj_JSObject, 0, jl_Object, [], 1537, 0, 0, 0,
w_Browser$Tick, 0, jl_Object, [otj_JSObject], 1537, 0, 0, 0,
BrowserGame$main$lambda$_1_0, 0, jl_Object, [w_Browser$Tick], 1, 0, 0, 0,
w_Browser$Pair, 0, jl_Object, [otj_JSObject], 1537, 0, 0, 0,
BrowserGame$main$lambda$_1_1, 0, jl_Object, [w_Browser$Pair], 1, 0, 0, 0,
w_Browser$Number, 0, jl_Object, [otj_JSObject], 1537, 0, 0, 0,
BrowserGame$main$lambda$_1_2, 0, jl_Object, [w_Browser$Number], 1, 0, 0, 0,
BrowserGame$main$lambda$_1_3, 0, jl_Object, [w_Browser$Number], 1, 0, 0, 0,
w_Browser$Text, 0, jl_Object, [otj_JSObject], 1537, 0, 0, 0,
BrowserGame$main$lambda$_1_4, 0, jl_Object, [w_Browser$Text], 1, 0, 0, 0,
BrowserGame$main$lambda$_1_5, 0, jl_Object, [w_Browser$Number], 1, 0, 0, 0,
w_Browser$State, 0, jl_Object, [otj_JSObject], 1537, 0, 0, 0,
BrowserGame$main$lambda$_1_6, 0, jl_Object, [w_Browser$State], 1, 0, 0, 0,
otji_JSWrapper, 0, jl_Object, [], 17, 0, 0, 0,
w_Browser, 0, jl_Object, [], 17, 0, 0, 0,
ju_Comparator, 0, jl_Object, [], 1537, 0, 0, 0,
jl_String$_clinit_$lambda$_118_0, 0, jl_Object, [ju_Comparator], 1, 0, 0, 0,
jl_Character, 0, jl_Object, [jl_Comparable], 1, 0, () => jl_Character_$callClinit(), 0,
jl_StringBuffer, 0, jl_AbstractStringBuilder, [jl_Appendable], 1, 0, 0, ["$toString", $rt_wrapFunction0(jl_StringBuffer_toString), "$ensureCapacity", $rt_wrapFunction1(jl_StringBuffer_ensureCapacity)],
w_Resources, 0, jl_Object, [], 17, 0, 0, 0,
jl_AutoCloseable, 0, jl_Object, [], 1537, 0, 0, 0]);
$rt_metadata([ji_Closeable, 0, jl_Object, [jl_AutoCloseable], 1537, 0, 0, 0,
ji_InputStream, 0, jl_Object, [ji_Closeable], 1025, 0, 0, 0,
ji_FilterInputStream, 0, ji_InputStream, [], 1, 0, 0, 0,
ji_DataInput, 0, jl_Object, [], 1537, 0, 0, 0,
ji_DataInputStream, 0, ji_FilterInputStream, [ji_DataInput], 1, 0, 0, 0,
jml_Displayable, 0, jl_Object, [], 1025, 0, 0, ["$render", $rt_wrapFunction0(jml_Displayable_render)],
jml_Canvas, 0, jml_Displayable, [], 1025, 0, 0, 0,
jml_CommandListener, 0, jl_Object, [], 1537, 0, 0, 0,
j, 0, jml_Canvas, [jml_CommandListener], 1, 0, () => j_$callClinit(), ["$if1", $rt_wrapFunction2(j_if0), "$goto", $rt_wrapFunction0(j_goto), "$hideNotify", $rt_wrapFunction0(j_hideNotify), "$showNotify", $rt_wrapFunction0(j_showNotify)],
b, 0, j, [], 1, 0, 0, ["$commandAction", $rt_wrapFunction2(b_commandAction), "$do", $rt_wrapFunction2(b_do), "$a7", $rt_wrapFunction1(b_a1), "$a8", $rt_wrapFunction2(b_a0), "$showNotify", $rt_wrapFunction0(b_showNotify)],
g, 0, jl_Object, [], 1, 0, 0, 0,
i, 0, j, [], 1, 0, 0, ["$hideNotify", $rt_wrapFunction0(i_hideNotify)],
d, 0, i, [], 1, 0, 0, ["$a8", $rt_wrapFunction2(d_a4), "$if1", $rt_wrapFunction2(d_if2), "$goto", $rt_wrapFunction0(d_goto), "$do", $rt_wrapFunction2(d_do0), "$a7", $rt_wrapFunction1(d_a5), "$commandAction", $rt_wrapFunction2(d_commandAction)],
c, 0, jl_Object, [], 1, 0, () => c_$callClinit(), 0,
jl_System, 0, jl_Object, [], 17, 0, 0, 0,
k, 0, jl_Object, [], 1, 0, 0, 0,
ju_Objects, 0, jl_Object, [], 17, 0, 0, 0,
jl_IndexOutOfBoundsException, "IndexOutOfBoundsException", 3, jl_RuntimeException, [], 1, 0, 0, 0,
jl_StringIndexOutOfBoundsException, "StringIndexOutOfBoundsException", 3, jl_IndexOutOfBoundsException, [], 1, 0, 0, 0,
ji_ByteArrayInputStream, 0, ji_InputStream, [], 1, 0, 0, 0,
ji_IOException, "IOException", 2, jl_Exception, [], 1, 0, 0, 0,
ji_EOFException, "EOFException", 2, ji_IOException, [], 1, 0, 0, 0,
jur_RandomGenerator, 0, jl_Object, [], 1537, 0, 0, 0,
ju_Random, 0, jl_Object, [jur_RandomGenerator, ji_Serializable], 1, 0, 0, 0,
jmr_RecordStore, 0, jl_Object, [], 17, 0, 0, 0,
jml_Image, 0, jl_Object, [], 17, 0, 0, 0,
cnms_Sound, 0, jl_Object, [], 17, 0, 0, 0,
ju_Dictionary, 0, jl_Object, [], 1025, 0, 0, 0,
ju_Map, 0, jl_Object, [], 1537, 0, 0, 0,
jl_Cloneable, 0, jl_Object, [], 1537, 0, 0, 0,
ju_Hashtable, 0, ju_Dictionary, [ju_Map, jl_Cloneable, ji_Serializable], 1, 0, () => ju_Hashtable_$callClinit(), 0,
ju_Properties, 0, ju_Hashtable, [], 1, 0, 0, 0,
otrf_VirtualFileSystemProvider, 0, jl_Object, [], 17, 0, 0, 0,
jmr_RecordStoreException, "RecordStoreException", 6, jl_Exception, [], 1, 0, 0, 0,
jmr_RecordStoreNotFoundException, "RecordStoreNotFoundException", 6, jmr_RecordStoreException, [], 1, 0, 0, 0,
ji_Flushable, 0, jl_Object, [], 1537, 0, 0, 0,
ji_OutputStream, 0, jl_Object, [ji_Closeable, ji_Flushable], 1025, 0, 0, 0,
ji_FilterOutputStream, 0, ji_OutputStream, [], 1, 0, 0, 0,
ji_DataOutput, 0, jl_Object, [], 1537, 0, 0, 0,
ji_DataOutputStream, 0, ji_FilterOutputStream, [ji_DataOutput], 1, 0, 0, 0,
ji_ByteArrayOutputStream, 0, ji_OutputStream, [], 1, 0, 0, 0,
ju_Arrays, 0, jl_Object, [], 1, 0, 0, 0,
jl_IllegalArgumentException, "IllegalArgumentException", 3, jl_RuntimeException, [], 1, 0, 0, 0,
jl_NullPointerException, "NullPointerException", 3, jl_RuntimeException, [], 1, 0, 0, 0,
jlr_Array, 0, jl_Object, [], 17, 0, 0, 0,
jl_ArrayStoreException, "ArrayStoreException", 3, jl_RuntimeException, [], 1, 0, 0, 0,
jl_Math, 0, jl_Object, [], 17, 0, 0, 0,
jl_Iterable, 0, jl_Object, [], 1537, 0, 0, 0,
ju_Collection, 0, jl_Object, [jl_Iterable], 1537, 0, 0, 0,
ju_AbstractCollection, 0, jl_Object, [ju_Collection], 1025, 0, 0, 0]);
$rt_metadata([ju_SequencedCollection, 0, jl_Object, [ju_Collection], 1537, 0, 0, 0,
ju_List, 0, jl_Object, [ju_SequencedCollection], 1537, 0, 0, 0,
ju_AbstractList, 0, ju_AbstractCollection, [ju_List], 1025, 0, 0, 0,
ju_RandomAccess, 0, jl_Object, [], 1537, 0, 0, 0,
ju_ArrayList, 0, ju_AbstractList, [jl_Cloneable, ji_Serializable, ju_RandomAccess], 1, 0, 0, 0,
otrf_VirtualFileSystem, 0, jl_Object, [], 1537, 0, 0, 0,
otrfm_InMemoryVirtualFileSystem, 0, jl_Object, [otrf_VirtualFileSystem], 1, 0, 0, 0,
jl_NumberFormatException, "NumberFormatException", 3, jl_IllegalArgumentException, [], 1, 0, 0, 0,
jl_ArrayIndexOutOfBoundsException, "ArrayIndexOutOfBoundsException", 3, jl_IndexOutOfBoundsException, [], 1, 0, 0, 0,
ju_Enumeration, 0, jl_Object, [], 1537, 0, 0, 0,
ju_Hashtable$1, 0, jl_Object, [ju_Enumeration], 0, 0, 0, 0,
ju_Iterator, 0, jl_Object, [], 1537, 0, 0, 0,
ju_Hashtable$2, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0,
otrfm_AbstractInMemoryVirtualFile, 0, jl_Object, [], 1025, 0, 0, 0,
otrfm_InMemoryVirtualDirectory, 0, otrfm_AbstractInMemoryVirtualFile, [], 1, 0, 0, 0,
ju_Map$Entry, 0, jl_Object, [], 1537, 0, 0, 0,
ju_MapEntry, 0, jl_Object, [ju_Map$Entry, jl_Cloneable], 0, 0, 0, 0,
ju_Hashtable$Entry, 0, ju_MapEntry, [], 0, 0, 0, 0,
ju_AbstractMap, 0, jl_Object, [ju_Map], 1025, 0, 0, 0,
ju_HashMap, 0, ju_AbstractMap, [jl_Cloneable, ji_Serializable], 1, 0, 0, 0,
ju_SequencedMap, 0, jl_Object, [ju_Map], 1537, 0, 0, 0,
ju_LinkedHashMap, 0, ju_HashMap, [ju_SequencedMap], 1, 0, 0, 0,
h, 0, jl_Object, [], 1, 0, () => h_$callClinit(), 0,
jml_Screen, 0, jml_Displayable, [], 1025, 0, 0, 0,
jml_Form, 0, jml_Screen, [], 1, 0, 0, ["$render", $rt_wrapFunction0(jml_Form_render)],
jml_Item, 0, jl_Object, [], 1025, 0, 0, 0,
jml_TextField, 0, jml_Item, [], 1, 0, 0, 0,
a, 0, jl_Object, [], 1, 0, 0, 0,
f, 0, jl_Object, [], 1, 0, 0, 0,
e, 0, jl_Object, [], 1, 0, 0, 0,
ju_HashMap$HashEntry, 0, ju_MapEntry, [], 0, 0, 0, 0,
ju_LinkedHashMap$LinkedHashMapEntry, 0, ju_HashMap$HashEntry, [], 16, 0, 0, 0,
cnmu_DeviceControl, 0, jl_Object, [], 17, 0, 0, 0,
jml_Command, 0, jl_Object, [], 1, 0, 0, 0,
jml_Font, 0, jl_Object, [], 17, 0, 0, 0,
ji_PrintStream, 0, ji_FilterOutputStream, [jl_Appendable], 1, 0, 0, 0,
otcic_JsConsolePrintStream, 0, ji_PrintStream, [], 1025, 0, 0, 0,
otcic_JSStderrPrintStream, 0, otcic_JsConsolePrintStream, [], 1, 0, 0, 0,
jl_Thread, 0, jl_Object, [jl_Runnable], 1, 0, () => jl_Thread_$callClinit(), 0,
jl_Object$Monitor, 0, jl_Object, [], 0, 0, 0, 0,
jl_IllegalStateException, "IllegalStateException", 3, jl_RuntimeException, [], 1, 0, 0, 0,
jl_IllegalMonitorStateException, 0, jl_RuntimeException, [], 1, 0, 0, 0,
jml_List, 0, jml_Screen, [], 1, 0, () => jml_List_$callClinit(), ["$render", $rt_wrapFunction0(jml_List_render)],
ji_UTFDataFormatException, "UTFDataFormatException", 2, ji_IOException, [], 1, 0, 0, 0,
otp_PlatformRunnable, 0, jl_Object, [], 1537, 0, 0, 0,
jl_Object$monitorExit$lambda$_8_1, 0, jl_Object, [otp_PlatformRunnable], 1, 0, 0, 0,
jnc_Charset, 0, jl_Object, [jl_Comparable], 1025, 0, 0, 0,
jl_Thread$UncaughtExceptionHandler, 0, jl_Object, [], 1537, 0, 0, 0,
jl_DefaultUncaughtExceptionHandler, 0, jl_Object, [jl_Thread$UncaughtExceptionHandler], 1, 0, 0, 0,
oti_AsyncCallback, 0, jl_Object, [], 1537, 0, 0, 0]);
$rt_metadata([otpp_AsyncCallbackWrapper, 0, jl_Object, [oti_AsyncCallback], 0, 0, 0, ["$complete", $rt_wrapFunction1(otpp_AsyncCallbackWrapper_complete), "$error", $rt_wrapFunction1(otpp_AsyncCallbackWrapper_error)],
jl_Object$monitorEnterWait$lambda$_6_0, 0, jl_Object, [otp_PlatformRunnable], 1, 0, 0, 0,
ju_Queue, 0, jl_Object, [ju_Collection], 1537, 0, 0, 0,
ju_Deque, 0, jl_Object, [ju_Queue, ju_SequencedCollection], 1537, 0, 0, 0,
ju_ArrayDeque, 0, ju_AbstractCollection, [ju_Deque, jl_Cloneable, ji_Serializable], 1, 0, 0, 0,
jml_Graphics, 0, jl_Object, [], 17, 0, 0, 0,
ju_AbstractList$1, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0,
ju_NoSuchElementException, 0, jl_RuntimeException, [], 1, 0, 0, 0,
ju_Vector, 0, ju_AbstractList, [ju_List, ju_RandomAccess, jl_Cloneable, ji_Serializable], 1, 0, () => ju_Vector_$callClinit(), 0,
jl_NegativeArraySizeException, "NegativeArraySizeException", 3, jl_RuntimeException, [], 1, 0, 0, 0,
ju_ConcurrentModificationException, "ConcurrentModificationException", 1, jl_RuntimeException, [], 1, 0, 0, 0]);
let $rt_booleanArrayCls = $rt_arraycls($rt_booleancls),
$rt_charArrayCls = $rt_arraycls($rt_charcls),
$rt_byteArrayCls = $rt_arraycls($rt_bytecls),
$rt_shortArrayCls = $rt_arraycls($rt_shortcls),
$rt_intArrayCls = $rt_arraycls($rt_intcls);
$rt_stringPool(["Can\'t enter monitor from another thread synchronously", "0", "null", "[L", "String contains invalid digits: ", "String contains digits out of radix ", ": ", "The value is too big for integer type", "The value is too big for int type: ", "Illegal radix: ", "String is empty", "String is null", "\n", "\tat ", "Caused by: ", "microedition.locale", "/en", "/", ".hlp", "/en.hlp", "HallOfFame", "aaa", "GameData", "Command ID", "List selection", "Not a list", "Text field ID", "{\"mode\":", ",\"state\":",
",\"x\":", ",\"y\":", "End of stream reached", "Malformed UTF-8 sequence", "", "form", "canvas", "AppData", "Miki\'s World 2: The Storm Master v1.2.2\nCopyright 2002 Sumea\nwww.sumea.com", " ", ". ", " - ", "/splash.png", "/title.png", "/sky.png", "/clouds.png", "begin.bin", "/tiles.png", "/numbers.png", "/time.png", "/damage.png", "/gameover.png", "/lord.png", "/player.png", "/items.png", "/level.bin", "end.bin", "/end.png", "/grid.png", "/bonus.png", "/cursor.png", "/onceuponatime.ott", "/bonus.ott", "/cage.ott",
"/coin.ott", "/damage.ott", "/gameend.ott", "/gameover.ott", "/gamestart.ott", "/key.ott", "/lord.ott", "/title.ott", "/transportation.ott", "Either src or dest is null", "java.version", "21", "os.name", "TeaVM", "file.separator", "path.separator", ":", "line.separator", "java.io.tmpdir", "/tmp", "java.vm.version", "user.home", "open", "create", "Store closed: ", "Invalid record ID: ", "Missing image: ", "Image dimensions", "Immutable image", "UTF Error", " > ", "Text exceeds maximum size", "main", "Select"]);
jl_String.prototype.toString = function() {
    return $rt_ustr(this);
};
jl_String.prototype.valueOf = jl_String.prototype.toString;
jl_Object.prototype.toString = function() {
    return $rt_ustr(jl_Object_toString(this));
};
jl_Object.prototype.__teavm_class__ = function() {
    return $dbg_class(this);
};
let $rt_export_main = $rt_mainStarter(BrowserGame_main);
$rt_export_main.javaException = $rt_javaException;
let $rt_jso_marker = Symbol('jsoClass');
(() => {
    let c;
    c = BrowserGame$main$lambda$_1_0.prototype;
    c.run = $rt_callWithReceiver(BrowserGame$main$lambda$_1_0_run$exported$0);
    c = BrowserGame$main$lambda$_1_1.prototype;
    c.run = $rt_callWithReceiver(BrowserGame$main$lambda$_1_1_run$exported$0);
    c = BrowserGame$main$lambda$_1_2.prototype;
    c.run = $rt_callWithReceiver(BrowserGame$main$lambda$_1_2_run$exported$0);
    c = BrowserGame$main$lambda$_1_3.prototype;
    c.run = $rt_callWithReceiver(BrowserGame$main$lambda$_1_3_run$exported$0);
    c = BrowserGame$main$lambda$_1_4.prototype;
    c.run = $rt_callWithReceiver(BrowserGame$main$lambda$_1_4_run$exported$0);
    c = BrowserGame$main$lambda$_1_5.prototype;
    c.run = $rt_callWithReceiver(BrowserGame$main$lambda$_1_5_run$exported$0);
    c = BrowserGame$main$lambda$_1_6.prototype;
    c.get = $rt_callWithReceiver(BrowserGame$main$lambda$_1_6_get$exported$0);
})();
export { $rt_export_main as main };
