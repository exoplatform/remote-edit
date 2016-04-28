(function() {
  var ECMWebDav = function() {}
// Declare ITHit core.
if ("undefined" === typeof ITHit) {
    (function() {
        this.ITHit = {
            _oComponents: {},
            _oNamespace: {},
            Define: function(_1) {
                this._oComponents[_1] = true;
            },
            Defined: function(_2) {
                return !!this._oComponents[_2];
            },
            Add: function(_3, _4) {
                var _5 = _3.split(".");
                var _6 = this;
                var _7 = _5.length;
                for (var i = 0; i < _7; i++) {
                    if ("undefined" === typeof _6[_5[i]]) {
                        if (i < (_7 - 1)) {
                            _6[_5[i]] = {};
                        } else {
                            _6[_5[i]] = _4;
                        }
                    } else {
                        if (!(_6[_5[i]] instanceof Object)) {
                            return;
                        }
                    }
                    _6 = _6[_5[i]];
                }
            },
            Temp: {}
        };
    })();
}
ITHit.Config = {
    Global: window,
    ShowOriginalException: true,
    PreventCaching: false
};
ITHit.Add("GetNamespace", function(_9, _a, _b) {
    var _c = ITHit.Utils;
    if (!_c.IsString(_9) && !_c.IsArray(_9)) {
        throw new ITHit.Exception("ITHit.GetNamespace() expected string as first parameter of method.");
    }
    var _d = _c.IsArray(_9) ? _9 : _9.split(".");
    var _e = _b || ITHit.Config.Global;
    for (var i = 0, _10 = ""; _e && (_10 = _d[i]); i++) {
        if (_10 in _e) {
            _e = _e[_10];
        } else {
            if (_a) {
                _e[_10] = {};
                _e = _e[_10];
            } else {
                _e = undefined;
            }
        }
    }
    return _e;
});
ITHit.Add("Namespace", function(_11, _12) {
    return ITHit.GetNamespace(_11, false, _12);
});
ITHit.Add("Declare", function(_13, _14) {
    return ITHit.GetNamespace(_13, true, _14);
});
ITHit.Add("DetectOS", function() {
    var _15 = navigator.platform,
        _16 = {
            Windows: (-1 != _15.indexOf("Win")),
            MacOS: (-1 != _15.indexOf("Mac")),
            Linux: (-1 != _15.indexOf("Linux")),
            UNIX: (-1 != _15.indexOf("X11")),
            OS: null
        };
    if (_16.Windows) {
        _16.OS = "Windows";
    } else {
        if (_16.Linux) {
            _16.OS = "Linux";
        } else {
            if (_16.MacOS) {
                _16.OS = "MacOS";
            } else {
                if (_16.UNIX) {
                    _16.OS = "UNIX";
                }
            }
        }
    }
    return _16;
}());
ITHit.Add("DetectBrowser", function() {
    var _17 = navigator.userAgent,
        _18 = {
            IE: false,
            FF: false,
            Chrome: false,
            Safari: false,
            Opera: false,
            Browser: null,
            Mac: false
        },
        _19 = {
            IE: {
                Search: "MSIE",
                Browser: "IE"
            },
            IE11: {
                Search: "Trident/7",
                Version: "rv",
                Browser: "IE"
            },
            Edge: {
                Search: "Edge",
                Browser: "Edge"
            },
            FF: {
                Search: "Firefox",
                Browser: "FF"
            },
            Chrome: {
                Search: "Chrome",
                Browser: "Chrome"
            },
            Safari: {
                Search: "Safari",
                Version: "Version",
                Browser: "Safari",
                Mac: "Macintosh",
                iPad: "iPad",
                iPhone: "iPhone"
            },
            Opera: {
                Search: "Opera",
                Browser: "Opera"
            }
        };
    for (var _1a in _19) {
        var pos = _17.indexOf(_19[_1a].Search);
        if (-1 != pos) {
            _18.Browser = _19[_1a].Browser;
            _18.Mac = navigator.platform.indexOf("Mac") == 0;
            _18.iPad = (_19[_1a].iPad && _17.indexOf(_19[_1a].iPad) != -1);
            _18.iPhone = (_19[_1a].iPhone && _17.indexOf(_19[_1a].iPhone) != -1);
            var _1c = _19[_1a].Version || _19[_1a].Search,
                _1d = _17.indexOf(_1c);
            if (-1 == _1d) {
                _18[_19[_1a].Browser] = true;
                break;
            }
            _18[_19[_1a].Browser] = parseFloat(_17.substring(_1d + _1c.length + 1));
            break;
        }
    }
    return _18;
}());
ITHit.Add("DetectDevice", function() {
    var _1e = navigator.userAgent;
    var _1f = {};
    var _20 = {
        Android: {
            Search: "Android"
        },
        BlackBerry: {
            Search: "BlackBerry"
        },
        iOS: {
            Search: "iPhone|iPad|iPod"
        },
        Opera: {
            Search: "Opera Mini"
        },
        Windows: {
            Search: "IEMobile"
        },
        Mobile: {}
    };
    for (var _21 in _20) {
        var _22 = _20[_21];
        if (!_22.Search) {
            continue;
        }
        var _23 = new RegExp(_22.Search, "i");
        _1f[_21] = _23.test(_1e);
        if (!_1f.Mobile && _1f[_21]) {
            _1f.Mobile = true;
        }
    }
    return _1f;
}());
ITHit.Add("HttpRequest", function(_24, _25, _26, _27, _28, _29) {
    if (!ITHit.Utils.IsString(_24)) {
        throw new ITHit.Exception("Expexted string href in ITHit.HttpRequest. Passed: \"" + _24 + "\"", "sHref");
    }
    if (!ITHit.Utils.IsObjectStrict(_26) && !ITHit.Utils.IsNull(_26) && !ITHit.Utils.IsUndefined(_26)) {
        throw new ITHit.Exception("Expexted headers list as object in ITHit.HttpRequest.", "oHeaders");
    }
    this.Href = _24;
    this.Method = _25;
    this.Headers = _26;
    this.Body = _27;
    this.User = _28 || null;
    this.Password = _29 || null;
});
ITHit.Add("HttpResponse", function() {
    var _2a = function(_2b, _2c, _2d, _2e) {
        if (!ITHit.Utils.IsString(_2b)) {
            throw new ITHit.Exception("Expexted string href in ITHit.HttpResponse. Passed: \"" + _2b + "\"", "sHref");
        }
        if (!ITHit.Utils.IsInteger(_2c)) {
            throw new ITHit.Exception("Expexted integer status in ITHit.HttpResponse.", "iStatus");
        }
        if (!ITHit.Utils.IsString(_2d)) {
            throw new ITHit.Exception("Expected string status description in ITHit.HttpResponse.", "sStatusDescription");
        }
        if (_2e && !ITHit.Utils.IsObjectStrict(_2e)) {
            throw new ITHit.Exception("Expected object headers in ITHit.HttpResponse.", "oHeaders");
        } else {
            if (!_2e) {
                _2e = {};
            }
        }
        this.Href = _2b;
        this.Status = _2c;
        this.StatusDescription = _2d;
        this.Headers = _2e;
        this.BodyXml = null;
        this.BodyText = "";
    };
    _2a.prototype._SetBody = function(_2f, _30) {
        this.BodyXml = _2f || null;
        this.BodyText = _30 || "";
    };
    _2a.prototype.SetBodyText = function(_31) {
        this.BodyXml = null;
        this.BodyText = _31;
    };
    _2a.prototype.SetBodyXml = function(_32) {
        this.BodyXml = _32;
        this.BodyText = "";
    };
    _2a.prototype.ParseXml = function(_33) {
        if (!ITHit.Utils.IsString(_33)) {
            throw new ITHit.Exception("Expected XML string in ITHit.HttpResponse.ParseXml", "sXml");
        }
        var _34 = new ITHit.XMLDoc();
        _34.load(_33);
        this.BodyXml = _34._get();
        this.BodyText = _33;
    };
    _2a.prototype.GetResponseHeader = function(_35, _36) {
        if (!_36) {
            return this.Headers[_35];
        } else {
            var _35 = String(_35).toLowerCase();
            for (var _37 in this.Headers) {
                if (_35 === String(_37).toLowerCase()) {
                    return this.Headers[_37];
                }
            }
            return undefined;
        }
    };
    return _2a;
}());
ITHit.Add("XMLRequest", (function() {
    var _38;
    var _39 = function() {
        if (ITHit.DetectBrowser.IE && ITHit.DetectBrowser.IE < 10 && window.ActiveXObject) {
            if (_38) {
                return new ActiveXObject(_38);
            } else {
                var _3a = ["MSXML2.XmlHttp.6.0", "MSXML2.XmlHttp.3.0"];
                for (var i = 0; i < _3a.length; i++) {
                    try {
                        var _3c = new ActiveXObject(_3a[i]);
                        _38 = _3a[i];
                        return _3c;
                    } catch (e) {}
                }
            }
        } else {
            if ("undefined" != typeof XMLHttpRequest) {
                return new XMLHttpRequest();
            }
        }
        throw new ITHit.Exception("XMLHttpRequest (AJAX) not supported");
    };
    var _3d = function(_3e) {
        var _3f = {};
        if (!_3e) {
            return _3f;
        }
        var _40 = _3e.split("\n");
        for (var i = 0; i < _40.length; i++) {
            if (!ITHit.Trim(_40[i])) {
                continue;
            }
            var _42 = _40[i].split(":");
            var _43 = _42.shift();
            _3f[_43] = ITHit.Trim(_42.join(":"));
        }
        return _3f;
    };
    var _44 = function(_45, _46) {
        this.bAsync = _46 === true;
        this.OnData = null;
        this.OnError = null;
        this.OnProgress = null;
        this.oHttpRequest = _45;
        this.oError = null;
        if (!_45.Href) {
            throw new ITHit.Exception("Server url had not been set.");
        }
        if (ITHit.Logger && ITHit.LogLevel) {
            ITHit.Logger.WriteMessage("[" + _45.Href + "]");
        }
        this.oRequest = _39();
        var _47 = String(_45.Href);
        var _48 = _45.Method || "GET";
        try {
            this.oRequest.open(_48, ITHit.DecodeHost(_47), this.bAsync, _45.User || null, _45.Password || null);
            if (ITHit.DetectBrowser.IE && ITHit.DetectBrowser.IE >= 10) {
                try {
                    this.oRequest.responseType = "msxml-document";
                } catch (e) {}
            }
        } catch (e) {
            var _49 = _47.match(/(?:\/\/)[^\/]+/);
            if (_49) {
                var _4a = _49[0].substr(2);
                if (_44.Host != _4a) {
                    throw new ITHit.Exception(ITHit.Phrases.CrossDomainRequestAttempt.Paste(window.location, _47, String(_48)), e);
                } else {
                    throw e;
                }
            }
        }
        for (var _4b in _45.Headers) {
            this.oRequest.setRequestHeader(_4b, _45.Headers[_4b]);
        }
        if (this.bAsync) {
            try {
                this.oRequest.withCredentials = true;
            } catch (e) {}
        }
        if (this.bAsync) {
            var _4c = this;
            this.oRequest.onreadystatechange = function() {
                if (_4c.oRequest.readyState != 4) {
                    return;
                }
                var _4d = _4c.GetResponse();
                if (typeof _4c.OnData === "function") {
                    _4c.OnData.call(_4c, _4d);
                }
            };
            if ("onprogress" in this.oRequest) {
                this.oRequest.onprogress = function(_4e) {
                    if (typeof _4c.OnProgress === "function") {
                        _4c.OnProgress.call(_4c, _4e);
                    }
                };
            }
        }
    };
    _44.prototype.Send = function() {
        var _4f = this.oHttpRequest.Body;
        _4f = _4f || (ITHit.Utils.IsUndefined(_4f) || ITHit.Utils.IsNull(_4f) || ITHit.Utils.IsBoolean(_4f) ? "" : _4f);
        _4f = String(_4f);
        if (_4f === "") {
            _4f = null;
        }
        try {
            this.oRequest.send(_4f);
        } catch (e) {
            this.oError = e;
            if (typeof this.OnError === "function") {
                this.OnError.call(this, e);
            }
        }
    };
    _44.prototype.Abort = function() {
        if (this.oRequest) {
            try {
                this.oRequest.abort();
            } catch (e) {
                this.oError = e;
                if (typeof this.OnError === "function") {
                    this.OnError.call(this, e);
                }
            }
        }
    };
    _44.prototype.GetResponse = function() {
        var _50 = this.oHttpRequest;
        var _51 = this.oRequest;
        var _52 = String(_50.Href);
        if (this.bAsync && _51.readyState != 4) {
            throw new ITHit.Exception("Request sended as asynchronous, please register callback through XMLRequest.OnData() method for get responce object.");
        }
        if ((404 == _51.status) && (-1 != _52.indexOf(".js") && (_50.Method !== "PROPFIND"))) {
            ITHit.debug.loadTrace.failed(ITHit.debug.loadTrace.FAILED_LOAD);
            throw new ITHit.Exception("Failed to load script (\"" + _52 + "\"). Request returned status: " + _51.status + (_51.statusText ? " (" + _51.statusText + ")" : "") + ".", this.oError || undefined);
        }
        var _53 = this.FixResponseStatus(_51.status, _51.statusText);
        var _54 = new ITHit.HttpResponse(_52, _53.Status, _53.StatusDescription, _3d(_51.getAllResponseHeaders()));
        _54._SetBody(_51.responseXML, _51.responseText);
        return _54;
    };
    _44.prototype.FixResponseStatus = function(_55, _56) {
        var _57 = {
            Status: _55,
            StatusDescription: _56
        };
        if (1223 == _55) {
            _57.Status = 204;
            _57.StatusDescription = "No Content";
        }
        return _57;
    };
    _44.Host = window.location.host;
    return _44;
})());
ITHit.Add("Utils", {
    IsString: function(_58) {
        return (("string" == typeof _58) || (_58 instanceof String));
    },
    IsNumber: function(_59) {
        return ("number" == typeof _59);
    },
    IsBoolean: function(_5a) {
        return (("boolean" == typeof _5a) || (_5a instanceof Boolean));
    },
    IsInteger: function(_5b) {
        return this.IsNumber(_5b) && (-1 == String(_5b).indexOf("."));
    },
    IsArray: function(_5c) {
        return (_5c instanceof Array || ("array" == typeof _5c));
    },
    IsFunction: function(_5d) {
        return (_5d instanceof Function);
    },
    IsObject: function(_5e) {
        return ("object" == typeof _5e);
    },
    IsDate: function(_5f) {
        return (_5f instanceof Date);
    },
    IsRegExp: function(_60) {
        return (_60 instanceof RegExp);
    },
    IsObjectStrict: function(_61) {
        return this.IsObject(_61) && !this.IsArray(_61) && !this.IsString(_61) && !this.IsNull(_61) && !this.IsNumber(_61) && !this.IsDate(_61) && !this.IsRegExp(_61) && !this.IsBoolean(_61) && !this.IsFunction(_61) && !this.IsNull(_61);
    },
    IsUndefined: function(_62) {
        return (undefined === _62);
    },
    IsNull: function(_63) {
        return (null === _63);
    },
    IsDOMObject: function(_64) {
        return _64 && this.IsObject(_64) && !this.IsUndefined(_64.nodeType);
    },
    HtmlEscape: function(_65) {
        return String(_65).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    },
    IndexOf: function(_66, _67, _68) {
        var i = 0,
            _6a = _66 && _66.length;
        if (typeof _68 == "number") {
            i = _68 < 0 ? Math.max(0, _6a + _68) : _68;
        }
        for (; i < _6a; i++) {
            if (_66[i] === _67) {
                return i;
            }
        }
        return -1;
    },
    CreateDOMElement: function(_6b, _6c) {
        var _6d = ITHit.Utils;
        if (_6d.IsObject(_6b)) {
            if (!_6b.nodeName) {
                throw new ITHit.Exception("nodeName property does not specified.");
            }
            _6c = _6b;
            _6b = _6b.nodeName;
            delete _6c.nodeName;
        }
        var _6e = document.createElement(_6b);
        if (_6c && _6d.IsObject(_6c)) {
            for (var _6f in _6c) {
                if (!_6c.hasOwnProperty(_6f)) {
                    continue;
                }
                switch (_6f) {
                    case "class":
                        if (_6c[_6f]) {
                            _6e.className = _6c[_6f];
                        }
                        break;
                    case "style":
                        var _70 = _6c[_6f];
                        for (var _71 in _70) {
                            if (!_70.hasOwnProperty(_71)) {
                                continue;
                            }
                            _6e.style[_71] = _70[_71];
                        }
                        break;
                    case "childNodes":
                        for (var i = 0, l = _6c[_6f].length; i < l; i++) {
                            var _74 = _6c[_6f][i];
                            if (_6d.IsString(_74) || _6d.IsNumber(_74) || _6d.IsBoolean(_74)) {
                                _74 = document.createTextNode(_74);
                            } else {
                                if (!_74) {
                                    continue;
                                }
                            }
                            if (!_6d.IsDOMObject(_74)) {
                                _74 = ITHit.Utils.CreateDOMElement(_74);
                            }
                            _6e.appendChild(_74);
                        }
                        break;
                    default:
                        _6e[_6f] = _6c[_6f];
                }
            }
        }
        return _6e;
    },
    GetComputedStyle: function(_75) {
        ITHit.Utils.GetComputedStyle = ITHit.Components.dojo.getComputedStyle;
        return ITHit.Utils.GetComputedStyle(_75);
    },
    MakeScopeClosure: function(_76, _77, _78) {
        if (this.IsUndefined(_78)) {
            return this._GetClosureFunction(_76, _77);
        } else {
            if (!this.IsArray(_78)) {
                _78 = [_78];
            }
            return this._GetClosureParamsFunction(_76, _77, _78);
        }
    },
    _GetClosureParamsFunction: function(_79, _7a, _7b) {
        return function() {
            var _7c = [];
            for (var i = 0, l = _7b.length; i < l; i++) {
                _7c.push(_7b[i]);
            }
            if (arguments.length) {
                for (var i = 0, l = arguments.length; i < l; i++) {
                    _7c.push(arguments[i]);
                }
            }
            _79[_7a].apply(_79, _7c);
        };
    },
    _GetClosureFunction: function(_7f, _80) {
        return function() {
            return _7f[_80].apply(_7f, arguments);
        };
    }
});
ITHit.Add("Trim", function(_81, _82, _83) {
    if (("string" != typeof _81) && !(_81 instanceof String)) {
        if (!_83) {
            return _81;
        } else {
            throw new ITHit.Exception("ITHit.Trim() expected string as first prametr.");
        }
    }
    switch (_82) {
        case ITHit.Trim.Left:
            return _81.replace(/^\s+/, "");
            break;
        case ITHit.Trim.Right:
            return _81.replace(/\s+$/, "");
            break;
        default:
            return _81.replace(/(?:^\s+|\s+$)/g, "");
    }
});
ITHit.Add("Trim.Left", "Left");
ITHit.Add("Trim.Right", "Right");
ITHit.Add("Trim.Both", "Both");
ITHit.Add("Exception", (function() {
    var _84 = function(_85, _86) {
        this.Message = _85;
        this.InnerException = _86;
        if (ITHit.Logger.GetCount(ITHit.LogLevel.Error)) {
            var _87 = "Exception: " + this.Name + "\n" + "Message: " + this.Message + "\n";
            if (_86) {
                _87 += ((!_86 instanceof Error) ? "Inner exception: " : "") + this.GetExceptionsStack(_86);
            }
            ITHit.Logger.WriteMessage(_87, ITHit.LogLevel.Error);
        }
    };
    _84.prototype.Name = "Exception";
    _84.prototype.GetExceptionsStack = function(_88, _89) {
        if ("undefined" === typeof _88) {
            var _88 = this;
        }
        var _89 = _89 ? _89 : 0;
        var _8a = "";
        var _8b = "      ";
        var _8c = "";
        for (var i = 0; i < _89; i++) {
            _8c += _8b;
        }
        if (_88 instanceof ITHit.Exception) {
            _8a += _8c + (_88.Message ? _88.Message : _88) + "\n";
        } else {
            if (ITHit.Config.ShowOriginalException) {
                _8a += "\nOriginal exception:\n";
                if (("string" != typeof _88) && !(_88 instanceof String)) {
                    for (var _8e in _88) {
                        _8a += "\t" + _8e + ": \"" + ITHit.Trim(_88[_8e]) + "\"\n";
                    }
                } else {
                    _8a += "\t" + _88 + "\n";
                }
            }
        }
        return _8a;
    };
    _84.prototype.toString = function() {
        return this.GetExceptionsStack();
    };
    return _84;
})());
ITHit.Add("Extend", function(_8f, _90) {
    function inheritance() {}
    inheritance.prototype = _90.prototype;
    _8f.prototype = new inheritance();
    _8f.prototype.constructor = _8f;
    _8f.baseConstructor = _90;
    if (_90.base) {
        _90.prototype.base = _90.base;
    }
    _8f.base = _90.prototype;
});
ITHit.Add("Events", function() {
    var _91 = function() {
        this._Listeners = this._NewObject();
        this._DispatchEvents = {};
        this._DelayedDelete = {};
    };
    _91.prototype._NewObject = function() {
        var obj = {};
        for (var _93 in obj) {
            delete obj[_93];
        }
        return obj;
    };
    _91.prototype.AddListener = function(_94, _95, _96, _97) {
        var _98 = _94.__instanceName;
        var _99;
        var _9a = ITHit.EventHandler;
        if (!(_96 instanceof ITHit.EventHandler)) {
            _99 = new ITHit.EventHandler(_97 || null, _96);
        } else {
            _99 = _96;
        }
        var _9b = this._Listeners[_98] || (this._Listeners[_98] = this._NewObject());
        var _9c = _9b[_95] || (_9b[_95] = []);
        var _9d = false;
        for (var i = 0, l = _9c.length; i < l; i++) {
            if (_9c[i].IsEqual(_99)) {
                _9d = true;
                break;
            }
        }
        if (!_9d) {
            _9c.push(_99);
        }
    };
    _91.prototype.DispatchEvent = function(_a0, _a1, _a2) {
        var _a3 = _a0.__instanceName;
        if (!this._Listeners[_a3] || !this._Listeners[_a3][_a1] || !this._Listeners[_a3][_a1].length) {
            return undefined;
        }
        var _a4 = ITHit.EventHandler;
        var _a5;
        var _a6 = [];
        for (var i = 0, l = this._Listeners[_a3][_a1].length; i < l; i++) {
            _a6.push(this._Listeners[_a3][_a1][i]);
        }
        this._DispatchEvents[_a3] = (this._DispatchEvents[_a3] || 0) + 1;
        this._DispatchEvents[_a3 + ":" + _a1] = (this._DispatchEvents[_a3 + ":" + _a1] || 0) + 1;
        for (var i = 0; i < _a6.length; i++) {
            var _a9;
            if (_a6[i] instanceof _a4) {
                try {
                    _a9 = _a6[i].CallHandler(_a0, _a1, _a2);
                } catch (e) {
                    throw e;
                }
            }
            if (_a6[i] instanceof Function) {
                try {
                    _a9 = _a6[i](_a0, _a1, _a2);
                } catch (e) {
                    throw e;
                }
            }
            if (!ITHit.Utils.IsUndefined(_a9)) {
                _a5 = _a9;
            }
        }
        this._DispatchEvents[_a3]--;
        this._DispatchEvents[_a3 + ":" + _a1]--;
        this._CheckDelayedDelete(_a0, _a1);
        return _a5;
    };
    _91.prototype.RemoveListener = function(_aa, _ab, _ac, _ad) {
        var _ae = _aa.__instanceName;
        _ad = _ad || null;
        if (!this._Listeners[_ae] || !this._Listeners[_ae][_ab] || !this._Listeners[_ae][_ab].length) {
            return true;
        }
        var _af = this._Listeners[_ae][_ab];
        for (var i = 0, l = _af.length; i < l; i++) {
            if (_af[i].IsEqual(_ad, _ac)) {
                this._Listeners[_ae][_ab].splice(i, 1);
                break;
            }
        }
    };
    _91.prototype.RemoveAllListeners = function(_b2, _b3) {
        var _b4 = _b2.__instanceName;
        if (!ITHit.Utils.IsUndefined(_b3)) {
            if (ITHit.Utils.IsUndefined(this._DispatchEvents[_b4 + ":" + _b3])) {
                delete this._Listeners[_b4][_b3];
            } else {
                this._DelayedDelete[_b4 + ":" + _b3] = true;
            }
        } else {
            if (ITHit.Utils.IsUndefined(this._DispatchEvents[_b4])) {
                delete this._Listeners[_b4];
            } else {
                this._DelayedDelete[_b4] = true;
            }
        }
    };
    _91.prototype._CheckDelayedDelete = function(_b5, _b6) {
        var _b7 = _b5.__instanceName;
        if (!this._DispatchEvents[_b7 + ":" + _b6]) {
            delete this._DispatchEvents[_b7 + ":" + _b6];
            if (!ITHit.Utils.IsUndefined(this._DelayedDelete[_b7 + ":" + _b6])) {
                this.RemoveAllListeners(_b5, _b6);
            }
        }
        if (!this._DispatchEvents[_b7]) {
            delete this._DispatchEvents[_b7];
            if (!ITHit.Utils.IsUndefined(this._DelayedDelete[_b7])) {
                this.RemoveAllListeners(_b5);
            }
        }
    };
    _91.prototype.ListenersLength = function(_b8, _b9) {
        var _ba = _b8.__instanceName;
        if (!this._Listeners[_ba] || !this._Listeners[_ba][_b9]) {
            return 0;
        }
        return this._Listeners[_ba][_b9].length;
    };
    _91.prototype.Fix = function(e) {
        e = e || window.event;
        if (!e.target && e.srcElement) {
            e.target = e.srcElement;
        }
        if ((null == e.pageX) && (null != e.clientX)) {
            var _bc = document.documentElement,
                _bd = document.body;
            e.pageX = e.clientX + (_bc && _bc.scrollLeft || _bd && _bd.scrollLeft || 0) - (_bc.clientLeft || 0);
            e.pageY = e.clientY + (_bc && _bc.scrollTop || _bd && _bd.scrollTop || 0) - (_bc.clientTop || 0);
        }
        if (!e.which && e.button) {
            e.which = e.button & 1 ? 1 : (e.button & 2 ? 3 : (e.button & 4 ? 2 : 0));
        }
        return e;
    };
    _91.prototype.AttachEvent = function(_be, _bf, _c0) {
        _bf = _bf.replace(/^on/, "");
        if (_be.addEventListener) {
            _be.addEventListener(_bf, _c0, false);
        } else {
            if (_be.attachEvent) {
                _be.attachEvent("on" + _bf, _c0);
            } else {
                _be["on" + _bf] = _c0;
            }
        }
    };
    _91.prototype.DettachEvent = function(_c1, _c2, _c3) {
        _c2 = _c2.replace(/^on/, "");
        if (_c1.removeEventListener) {
            _c1.removeEventListener(_c2, _c3, false);
        } else {
            if (_c1.detachEvent) {
                _c1.detachEvent("on" + _c2, _c3);
            } else {
                _c1["on" + _c2] = null;
            }
        }
    };
    _91.prototype.Stop = function(e) {
        e = e || window.event;
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
        e.cancelBubble = true;
        return false;
    };
    return new _91();
}());
ITHit.Add("EventHandler", function() {
    var _c5 = function(_c6, _c7) {
        var _c8 = ITHit.Utils;
        if (!_c8.IsObjectStrict(_c6) && !_c8.IsNull(_c6)) {
            throw new ITHit.Exception("Event handler scope expected to be an object.");
        }
        if (!_c8.IsFunction(_c7) && (_c6 && !_c8.IsString(_c7))) {
            throw new ITHit.Exception("Method handler expected to be a string or function.");
        }
        if (_c6) {
            this.Scope = _c6;
            this.Name = _c6.__instanceName;
        } else {
            this.Scope = window;
            this.Name = "window";
        }
        this.Method = _c7;
    };
    _c5.prototype.IsEqual = function(_c9, _ca) {
        if (_c9 instanceof ITHit.EventHandler) {
            return this.GetCredentials() === _c9.GetCredentials();
        } else {
            return ((_c9 || null) === this.Scope) && (_ca === this.Method);
        }
    };
    _c5.prototype.GetCredentials = function() {
        return this.Name + "::" + this.Method;
    };
    _c5.prototype.CallHandler = function(_cb, _cc, _cd) {
        if (!(_cd instanceof Array)) {
            _cd = [_cd];
        }
        if (this.Scope) {
            if (this.Method instanceof Function) {
                return this.Method.apply(this.Scope || window, _cd.concat([_cb]));
            } else {
                try {
                    return this.Scope[this.Method].apply(this.Scope, _cd.concat([_cb]));
                } catch (e) {
                    throw new ITHit.Exception(e);
                }
            }
        } else {
            return this.Method.apply({}, _cd.concat([_cb]));
        }
    };
    return _c5;
}());
ITHit.Add("HtmlEncode", function(_ce) {
    return _ce.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&amp;").replace(/"/g, "&quot;");
});
ITHit.Add("HtmlDecode", function(_cf) {
    return _cf.replace(/&quot;/, "\"").replace(/&amp;/g, "'").replace(/&gt;/g, ">").replace(/&lt;/g, "<");
});
ITHit.Add("Encode", function(_d0) {
    if (!_d0) {
        return _d0;
    }
    return ITHit.EncodeURI(_d0.replace(/%/g, "%25")).replace(/~/g, "%7E").replace(/!/g, "%21").replace(/@/g, "%40").replace(/#/g, "%23").replace(/\$/g, "%24").replace(/&/g, "%26").replace(/\*/g, "%2A").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\-/g, "%2D").replace(/_/g, "%5F").replace(/\+/g, "%2B").replace(/\=/g, "%3D").replace(/'/g, "%27").replace(/;/g, "%3B").replace(/\,/g, "%2C").replace(/\?/g, "%3F");
});
ITHit.Add("EncodeURI", function(_d1) {
    if (!_d1) {
        return _d1;
    }
    return encodeURI(_d1).replace(/%25/g, "%");
});
ITHit.Add("Decode", function(_d2) {
    if (!_d2) {
        return _d2;
    }
    var _d2 = _d2.replace(/%7E/gi, "~").replace(/%21/g, "!").replace(/%40/g, "@").replace(/%23/g, "#").replace(/%24/g, "$").replace(/%26/g, "&").replace(/%2A/gi, "*").replace(/%28/g, "(").replace(/%29/g, ")").replace(/%2D/gi, "-").replace(/%5F/gi, "_").replace(/%2B/gi, "+").replace(/%3D/gi, "=").replace(/%27/g, "'").replace(/%3B/gi, ";").replace(/%2E/gi, ".").replace(/%2C/gi, ",").replace(/%3F/gi, "?");
    return ITHit.DecodeURI(_d2);
});
ITHit.Add("DecodeURI", function(_d3) {
    if (!_d3) {
        return _d3;
    }
    return decodeURI(_d3.replace(/%([^0-9A-F]|.(?:[^0-9A-F]|$)|$)/gi, "%25$1"));
});
ITHit.Add("DecodeHost", function(_d4) {
    if (/^(http|https):\/\/[^:\/]*?%/.test(_d4)) {
        var _d5 = _d4.match(/^(?:http|https):\/\/[^\/:]+/);
        if (_d5 && _d5[0]) {
            var _d6 = _d5[0].replace(/^(http|https):\/\//, "");
            _d4 = _d4.replace(_d6, ITHit.Decode(_d6));
        }
    }
    return _d4;
});
(function() {
    var _d7 = function() {};
    var _d8 = function(_d9, _da) {
        for (var key in _da) {
            if (!_da.hasOwnProperty(key)) {
                continue;
            }
            var _dc = _da[key];
            if (typeof _dc == "function" && typeof _d9[key] == "function" && _d9[key] !== _d7) {
                _d9[key] = _dd(_dc, _d9[key]);
            } else {
                _d9[key] = _dc;
            }
        }
        if (!_d9._super) {
            _d9._super = _d7;
        }
    };
    var _dd = function(_de, _df) {
        return function() {
            var old = this._super;
            this._super = _df;
            var r = _de.apply(this, arguments);
            this._super = old;
            return r;
        };
    };
    var _e2 = 0;
    ITHit.Add("DefineClass", function(_e3, _e4, _e5, _e6) {
        _e4 = _e4 !== null ? _e4 : function() {};
        if (!_e4) {
            throw new Error("Not found extended class for " + _e3);
        }
        if (_e5.hasOwnProperty("__static")) {
            _e6 = _e5.__static;
            delete _e5.__static;
        }
        var _e7;
        if (_e5 && _e5.hasOwnProperty("constructor")) {
            _e7 = function() {
                this.__instanceName = this.__className + _e2++;
                return _dd(_e5.constructor, _e4).apply(this, arguments);
            };
        } else {
            _e7 = function() {
                this.__instanceName = this.__className + _e2++;
                return _e4.apply(this, arguments);
            };
        }
        for (var _e8 in _e4) {
            _e7[_e8] = _e4[_e8];
        }
        _d8(_e7, _e6);
        var _e9 = function() {
            this.constructor = _e7;
        };
        _e9.prototype = _e4.prototype;
        _e7.prototype = new _e9;
        for (var key in _e9.prototype) {
            if (!_e9.prototype.hasOwnProperty(key)) {
                continue;
            }
            var _eb = _e9.prototype[key];
            if (!_eb) {
                continue;
            }
            if (_eb instanceof Array) {
                if (_eb.length === 0) {
                    _e7.prototype[key] = [];
                }
            } else {
                if (typeof _eb === "object") {
                    var _ec = true;
                    for (var k in _eb) {
                        _ec = _ec && _eb.hasOwnProperty(k);
                    }
                    if (_ec) {
                        _e7.prototype[key] = {};
                    }
                }
            }
        }
        if (_e5) {
            _d8(_e7.prototype, _e5);
        }
        _e7.__className = _e7.prototype.__className = _e3;
        var _ee = _e3.lastIndexOf("."),
            _ef = _e3.substr(_ee + 1);
        return ITHit.Declare(_e3.substr(0, _ee))[_ef] = _e7;
    });
})();
ITHit.Temp.WebDAV_Phrases = {
    CrossDomainRequestAttempt: 'Attempting to make cross-domain request.\nRoot URL: {0}\nDestination URL: {1}\nMethod: {2}',

    // WebDavRequest
    Exceptions: {
        BadRequest: 'The request could not be understood by the server due to malformed syntax.',
        Conflict: 'The request could not be carried because of conflict on server.',
        DependencyFailed: 'The method could not be performed on the resource because the requested action depended on another action and that action failed.',
        InsufficientStorage: 'The request could not be carried because of insufficient storage.',
        Forbidden: 'The server refused to fulfill the request.',
        Http: 'Exception during the request occurred.',
        Locked: 'The item is locked.',
        MethodNotAllowed: 'The method is not allowed.',
        NotFound: 'The item doesn\'t exist on the server.',
        PreconditionFailed: 'Precondition failed.',
        PropertyFailed: 'Failed to get one or more properties.',
        PropertyForbidden: 'Not enough rights to obtain one of requested properties.',
        PropertyNotFound: 'One or more properties not found.',
        Unauthorized: 'Incorrect credentials provided or insufficient permissions to access the requested item.',
        LockWrongCountParametersPassed: 'Lock.{0}: Wrong count of parameters passed. (Passed {1})',
        UnableToParseLockInfoResponse: 'Unable to parse response: quantity of LockInfo elements isn\'t equal to 1.',
        ParsingPropertiesException: 'Exception while parsing properties.',
        InvalidDepthValue: 'Invalid Depth value.',
        FailedCreateFolder: 'Failed creating folder.',
        FailedCreateFile: 'Failed creating file.',
        FolderWasExpectedAsDestinationForMoving: 'Folder was expected as destination for moving folder.',
        AddOrUpdatePropertyDavProhibition: 'Add or update of property {0} ignored: properties from "DAV:" namespace could not be updated/added.',
        DeletePropertyDavProhibition: 'Delete of property {0} ignored: properties from "DAV:" namespace could not be deleted.',
        NoPropertiesToManipulateWith: 'Calling UpdateProperties ignored: no properties to update/add/delete.',
        ActiveLockDoesntContainLockscope: 'Activelock node doesn\'t contain lockscope node.',
        ActiveLockDoesntContainDepth: 'Activelock node doedn\'t contain depth node.',
        WrongCountPropertyInputParameters: 'Wrong count of input parameters passed for Property constructor. Expected 1-3, passed: {1}.',
        FailedToWriteContentToFile: 'Failed to write content to file.',
        PropertyUpdateTypeException: 'Property expected to be an Property class instance.',
        PropertyDeleteTypeException: 'Property name expected to be an PropertyName class instance.',
        UnknownResourceType: 'Unknown resource type.',
        NotAllPropertiesReceivedForUploadProgress: 'Not all properties received for upload progress. {0}',
        ReportOnResourceItemWithParameterCalled: 'For files the method should be called without parametres.',
        WrongHref: 'Href expected to be a string.',
        WrongUploadedBytesType: 'Count of uploaded bytes expected to be a integer.',
        WrongContentLengthType: 'File content length expected to be a integer.',
        BytesUploadedIsMoreThanTotalFileContentLength: 'Bytes uploaded is more than total file content length.',
        ExceptionWhileParsingProperties: 'Exception while parsing properties.'
    },
    ResourceNotFound: 'Resource not found. {0}',
    ResponseItemNotFound: 'The response doesn\'t have required item. {0}',
    ResponseFileWrongType: 'Server returned folder while file is expected. {0}',
    FolderNotFound: 'Folder not found. {0}',
    ResponseFolderWrongType: 'Server returned file while folder is expected. {0}',
    ItemIsMovedOrDeleted: 'Cannot perform operation because item "{0}" is moved or deleted.',
    FailedToCopy: 'Failed to copy item.',
    FailedToCopyWithStatus: 'Copy failed with status {0}: {1}.',
    FailedToDelete: 'Failed to delete item.',
    DeleteFailedWithStatus: 'Delete failed with status {0}: {1}.',
    PutUnderVersionControlFailed: 'Put under version control failed.',
    FailedToMove: 'Failed to move item.',
    MoveFailedWithStatus: 'Move failed with status {0}: {1}.',
    UnlockFailedWithStatus: 'Unlock failed with status {0}: {1}.',
    PropfindFailedWithStatus: 'PROPFIND method failed with status {0}.',
    FailedToUpdateProp: 'Failed to update or delete one or more properties.',
    FromTo: 'The From parameter cannot be less than To.',
    NotToken: 'The supplied string is not a valid HTTP token.',
    RangeTooSmall: 'The From or To parameter cannot be less than 0.',
    RangeType: 'A different range specifier has already been added to this request.',
    ServerReturned: 'Server returned:',
    UserAgent: 'IT Hit WebDAV AJAX Library v{0}',

    // WebDavResponse
    wdrs: {
        status: '\n{0} {1}',
        response: '{0}: {1}'
    }
};

ITHit.oNS = ITHit.Declare("ITHit.Exceptions");
ITHit.oNS.LoggerException = function(_f0, _f1) {
    ITHit.Exceptions.LoggerException.baseConstructor.call(this, _f0, _f1);
};
ITHit.Extend(ITHit.oNS.LoggerException, ITHit.Exception);
ITHit.oNS.LoggerException.prototype.Name = "LoggerException";
ITHit.DefineClass("ITHit.LogLevel", null, {}, {
    All: 32,
    Debug: 16,
    Info: 8,
    Warn: 4,
    Error: 2,
    Fatal: 1,
    Off: 0
});
(function() {
    var _f2 = {};
    var _f3 = {};
    var _f4 = {};
    for (var _f5 in ITHit.LogLevel) {
        _f2[ITHit.LogLevel[_f5]] = [];
        _f4[ITHit.LogLevel[_f5]] = [];
    }
    var _f6 = function(_f7, _f8, iTo, _fa) {
        for (var _fb in ITHit.LogLevel) {
            if (ITHit.LogLevel[_fb] > iTo) {
                continue;
            }
            if (!ITHit.LogLevel[_fb] || (_f8 >= ITHit.LogLevel[_fb])) {
                continue;
            }
            if (_f7) {
                _f4[ITHit.LogLevel[_fb]].push(_fa);
            } else {
                for (var i = 0; i < _f4[ITHit.LogLevel[_fb]].length; i++) {
                    if (_f4[ITHit.LogLevel[_fb]][i] == _fa) {
                        _f4[ITHit.LogLevel[_fb]].splice(i, 1);
                    }
                }
            }
        }
    };
    _f6.add = function(iTo, _fe) {
        _f6.increase(ITHit.LogLevel.Off, iTo, _fe);
    };
    _f6.del = function(iTo, _100) {
        _f6.decrease(ITHit.LogLevel.Off, iTo, _100);
    };
    _f6.increase = function(_101, iTo, _103) {
        _f6(true, _101, iTo, _103);
    };
    _f6.decrease = function(_104, iTo, _106) {
        _f6(false, _104, iTo, _106);
    };
    ITHit.DefineClass("ITHit.Logger", null, {}, {
        Level: ITHit.Config.LogLevel || ITHit.LogLevel.Debug,
        AddListener: function(_107, _108) {
            if (_108 == ITHit.LogLevel.Off) {
                this.RemoveListener();
            }
            var _109 = 0;
            var _10a = 0;
            outer: for (var _10b in _f2) {
                for (var i = 0; i < _f2[_10b].length; i++) {
                    if (_f2[_10b][i] == _107) {
                        _109 = _10b;
                        _10a = i;
                        break outer;
                    }
                }
            }
            if (!_109) {
                _f2[_108].push(_107);
                _f6.add(_108, _107);
            } else {
                if (_108 != _109) {
                    _f2[_109].splice(_10a, 1);
                    _f2[_108].push(_107);
                    if (_108 > _109) {
                        _f6.increase(_109, _108, _107);
                    } else {
                        _f6.decrease(_108, _109, _107);
                    }
                }
            }
        },
        RemoveListener: function(_10d) {
            outer: for (var _10e in _f2) {
                for (var i = 0; i < _f2[_10e].length; i++) {
                    if (_f2[_10e][i] == _10d) {
                        _f2[_10e].splice(i, 1);
                        _f6.del(_10e, _10d);
                        break outer;
                    }
                }
            }
            return true;
        },
        SetLogLevel: function(_110, _111) {
            return this.AddListener(_110, _111, true);
        },
        GetLogLevel: function(_112) {
            for (var _113 in _f2) {
                for (var i = 0; i < _f2[_113].length; i++) {
                    if (_f2[_113][i] == _112) {
                        return _113;
                    }
                }
            }
            return false;
        },
        GetListenersForLogLevel: function(_115) {
            return _f4[_115];
        },
        GetCount: function(_116) {
            return _f4[_116].length;
        },
        WriteResponse: function(_117) {
            if (Logger.GetCount(ITHit.LogLevel.Info)) {
                var sStr = "";
                if (_117 instanceof HttpWebResponse) {
                    sStr += "\n" + _117.StatusCode + " " + _117.StatusDescription + "\n";
                }
                sStr += _117.ResponseUri + "\n";
                for (var _119 in _117.Headers) {
                    sStr += _119 + ": " + _117.Headers[_119] + "\n";
                }
                sStr += _117.GetResponse();
                this.WriteMessage(sStr);
            }
        },
        WriteMessage: function(_11a, _11b) {
            _11b = ("undefined" == typeof _11b) ? ITHit.LogLevel.Info : parseInt(_11b);
            if (ITHit.Logger.GetCount(_11b)) {
                var _11c = this.GetListenersForLogLevel(_11b);
                var _11a = String(_11a).replace(/([^\n])$/, "$1\n");
                for (var i = 0; i < _11c.length; i++) {
                    try {
                        _11c[i](_11a, ITHit.LogLevel.Info);
                    } catch (e) {
                        if (!_11c[i] instanceof Function) {
                            throw new ITHit.Exceptions.LoggerException("Log listener expected function, passed: \"" + _11c[i] + "\"", e);
                        } else {
                            throw new ITHit.Exceptions.LoggerException("Message could'not be logged.", e);
                        }
                    }
                }
            }
        },
        StartLogging: function() {},
        FinishLogging: function() {},
        StartRequest: function() {},
        FinishRequest: function() {}
    });
})();
ITHit.oNS = ITHit.Declare("ITHit.Exceptions");
ITHit.oNS.PhraseException = function(_11e, _11f) {
    ITHit.Exceptions.PhraseException.baseConstructor.call(this, _11e, _11f);
};
ITHit.Extend(ITHit.oNS.PhraseException, ITHit.Exception);
ITHit.oNS.PhraseException.prototype.Name = "PhraseException";
ITHit.Phrases = (function() {
    var _120 = {};
    var _121 = function(_122) {
        this._arguments = _122;
    };
    _121.prototype.Replace = function(_123) {
        var _124 = _123.substr(1, _123.length - 2);
        return ("undefined" != typeof this._arguments[_124]) ? this._arguments[_124] : _123;
    };
    var _125 = function(_126) {
        this._phrase = _126;
    };
    _125.prototype.toString = function() {
        return this._phrase;
    };
    _125.prototype.Paste = function() {
        var _127 = this._phrase;
        if (/\{\d+?\}/.test(_127)) {
            var _128 = new _121(arguments);
            _127 = _127.replace(/\{(\d+?)\}/g, function(args) {
                return _128.Replace(args);
            });
        }
        return _127;
    };
    var _12a = function() {};
    _12a.prototype.LoadJSON = function(_12b, _12c) {
        var _12d = ITHit.Utils;
        if (_12c && !_12d.IsString(_12c)) {
            throw new ITHit.Exceptions.PhraseException("Namespace expected to be a string.");
        }
        var _12e = this;
        if (_12c) {
            _12e = ITHit.Declare(_12c);
        }
        try {
            var _12f = _12b;
            if (_12d.IsString(_12f)) {
                _12f = eval("(" + _12b + ")");
            }
            this._AddPhrases(_12f, _12e);
        } catch (e) {
            console.dir(e);
            throw new ITHit.Exceptions.PhraseException("Wrong text structure.", e);
        }
    };
    _12a.prototype.LoadLocalizedJSON = function(_130, _131, _132) {
        var _133 = ITHit.Utils,
            _134 = _133.IsUndefined,
            _135 = _133.IsObject;
        if (!_130 || !_133.IsObjectStrict(_130)) {
            throw new ITHit.Exceptions.PhraseException("Default phrases expected to be an JSON object.");
        }
        if (_131 && !_133.IsObjectStrict(_131)) {
            throw new ITHit.Exceptions.PhraseException("Default phrases expected to be an JSON object");
        }
        var _136;
        if (_131) {
            _136 = {};
            this._MergePhrases(_136, _131);
            this._MergePhrases(_136, _130);
        } else {
            _136 = _130;
        }
        this.LoadJSON(_136, _132);
    };
    _12a.prototype._MergePhrases = function(dest, _138) {
        var _139 = ITHit.Utils,
            _13a = _139.IsUndefined,
            _13b = _139.IsObject;
        for (var prop in _138) {
            if (!_138.hasOwnProperty(prop)) {
                continue;
            }
            if (_13a(dest[prop])) {
                dest[prop] = _138[prop];
            } else {
                if (_13b(dest[prop])) {
                    this._MergePhrases(dest[prop], _138[prop]);
                }
            }
        }
    };
    _12a.prototype._AddPhrases = function(_13d, _13e) {
        _13e = _13e || this;
        for (var _13f in _13d) {
            if (("object" != typeof _13d[_13f]) || !(_13d[_13f] instanceof Object)) {
                switch (_13f) {
                    case "_AddPhrases":
                    case "LoadJSON":
                    case "LoadLocalizedJSON":
                    case "_Merge":
                    case "prototype":
                    case "toString":
                        throw new ITHit.Exceptions.PhraseException("\"" + _13f + "\" is reserved word.");
                        break;
                }
                _13e[_13f] = new _125(_13d[_13f]);
            } else {
                this._AddPhrases(_13d[_13f], _13e[_13f] ? _13e[_13f] : (_13e[_13f] = {}));
            }
        }
    };
    return new _12a();
})();
ITHit.oNS = ITHit.Declare("ITHit.Exceptions");
ITHit.oNS.XPathException = function(_140, _141) {
    ITHit.Exceptions.XPathException.baseConstructor.call(this, _140, _141);
};
ITHit.Extend(ITHit.oNS.XPathException, ITHit.Exception);
ITHit.oNS.XPathException.prototype.Name = "XPathException";
ITHit.XPath = {
    _component: null,
    _version: null
};
ITHit.XPath.evaluate = function(_142, _143, _144, _145, _146) {
    if (("string" != typeof _142) && !(_142 instanceof String)) {
        throw new ITHit.Exceptions.XPathException("Expression was expected to be a string in ITHit.XPath.eveluate.");
    }
    if (!(_143 instanceof ITHit.XMLDoc)) {
        throw new ITHit.Exceptions.XPathException("Element was expected to be an ITHit.XMLDoc object in ITHit.XPath.evaluate.");
    }
    if (_144 && !(_144 instanceof ITHit.XPath.resolver)) {
        throw new ITHit.Exceptions.XPathException("Namespace resolver was expected to be an ITHit.XPath.resolver object in ITHit.XPath.evaluate.");
    }
    if (_145 && !(_145 instanceof ITHit.XPath.result)) {
        throw new ITHit.Exceptions.XPathException("Result expected to be an ITHit.XPath.result object in ITHit.XPath.evaluate.");
    }
    _144 = _144 || null;
    _145 = _145 || null;
    if (document.implementation.hasFeature("XPath", "3.0") && document.evaluate) {
        var _147 = _143._get();
        var _148 = _147.ownerDocument || _147;
        if (_145) {
            _148.evaluate(_142, _147, _144, ITHit.XPath.result.UNORDERED_NODE_SNAPSHOT_TYPE, _145._res);
            return;
        }
        var oRes = new ITHit.XPath.result(_148.evaluate(_142, _147, _144, ITHit.XPath.result.UNORDERED_NODE_SNAPSHOT_TYPE, null));
        if (!_146) {
            return oRes;
        } else {
            return oRes.iterateNext();
        }
    } else {
        if (undefined !== window.ActiveXObject) {
            var _147 = _143._get();
            var _14a = false;
            try {
                _147.getProperty("SelectionNamespaces");
                _14a = true;
            } catch (e) {}
            var _14b = false;
            if (3 == ITHit.XMLDoc._version) {
                var sXml = _147.xml.replace(/^\s+|\s+$/g, "");
                var _14d = "urn:uuid:c2f41010-65b3-11d1-a29f-00aa00c14882/";
                var _14e = "cutted";
                if (-1 != sXml.indexOf(_14d) || true) {
                    var _14f = sXml.replace(_14d, _14e);
                    var _150 = new ITHit.XMLDoc();
                    _150.load(_14f);
                    if (_144) {
                        var oNs = _144.getAll();
                        for (var _152 in oNs) {
                            if (_14d == oNs[_152]) {
                                oNs.add(_152, _14e);
                                break;
                            }
                        }
                    }
                    _147 = _150._get();
                    _14a = true;
                    _14b = true;
                }
            }
            if (_14a && _144 && _144.length()) {
                var _153 = _144.getAll();
                var aNs = [];
                for (var _152 in _153) {
                    aNs.push("xmlns:" + _152 + "='" + _153[_152] + "'");
                }
                _147.setProperty("SelectionNamespaces", aNs.join(" "));
            }
            if (_14b) {
                _147 = _147.documentElement;
            }
            try {
                if (!_146) {
                    if (!_145) {
                        return new ITHit.XPath.result(_147.selectNodes(_142));
                    } else {
                        _145._res = _147.selectNodes(_142);
                        return;
                    }
                } else {
                    var mOut = _147.selectSingleNode(_142);
                    if (mOut) {
                        return new ITHit.XMLDoc(mOut);
                    } else {
                        return mOut;
                    }
                }
            } catch (e) {
                if (!_14a && (-1 != e.message.indexOf("Reference to undeclared namespace prefix")) && _144 && _144.length()) {
                    var sEl = new ITHit.XMLDoc(_147).toString();
                    var oEl = new ITHit.XMLDoc();
                    oEl.load(sEl);
                    _147 = oEl._get();
                    var _153 = _144.getAll();
                    var aNs = [];
                    for (var _152 in _153) {
                        aNs.push("xmlns:" + _152 + "='" + _153[_152] + "'");
                    }
                    _147.setProperty("SelectionNamespaces", aNs.join(" "));
                    _147 = _147.documentElement;
                    if (!_146) {
                        if (!_145) {
                            return new ITHit.XPath.result(_147.selectNodes(_142));
                        } else {
                            _145._res = _147.selectNodes(_142);
                            return;
                        }
                    } else {
                        var mOut = _147.selectSingleNode(_142);
                        if (mOut) {
                            return new ITHit.XMLDoc(mOut);
                        } else {
                            return mOut;
                        }
                    }
                } else {
                    throw new ITHit.Exceptions.XPathException("Evaluation failed for searching \"" + _142 + "\".", e);
                }
            }
        }
    }
    throw new ITHit.Exceptions.XPathException("XPath support is not implemented for your browser.");
};
ITHit.XPath.selectSingleNode = function(_158, _159, _15a) {
    return ITHit.XPath.evaluate(_158, _159, _15a, false, true);
};
ITHit.XPath.resolver = function() {
    this._ns = {};
    this._length = 0;
};
ITHit.XPath.resolver.prototype.add = function(_15b, sNs) {
    this._ns[_15b] = sNs;
    this._length++;
};
ITHit.XPath.resolver.prototype.remove = function(_15d) {
    delete this._ns[_15d];
    this._length--;
};
ITHit.XPath.resolver.prototype.get = function(_15e) {
    return this._ns[_15e] || null;
};
ITHit.XPath.resolver.prototype.lookupNamespaceURI = ITHit.XPath.resolver.prototype.get;
ITHit.XPath.resolver.prototype.getAll = function() {
    var oOut = {};
    for (var _160 in this._ns) {
        oOut[_160] = this._ns[_160];
    }
    return oOut;
};
ITHit.XPath.resolver.prototype.length = function() {
    return this._length;
};
ITHit.XPath.result = function(_161) {
    this._res = _161;
    this._i = 0;
    this.length = _161.length ? _161.length : _161.snapshotLength;
};
ITHit.XPath.result.ANY_TYPE = 0;
ITHit.XPath.result.NUMBER_TYPE = 1;
ITHit.XPath.result.STRING_TYPE = 2;
ITHit.XPath.result.BOOLEAN_TYPE = 3;
ITHit.XPath.result.UNORDERED_NODE_ITERATOR_TYPE = 4;
ITHit.XPath.result.ORDERED_NODE_ITERATOR_TYPE = 5;
ITHit.XPath.result.UNORDERED_NODE_SNAPSHOT_TYPE = 6;
ITHit.XPath.result.ORDERED_NODE_SNAPSHOT_TYPE = 7;
ITHit.XPath.result.ANY_UNORDERED_NODE_TYPE = 8;
ITHit.XPath.result.FIRST_ORDERED_NODE_TYPE = 9;
ITHit.XPath.result.prototype.iterateNext = function(_162) {
    var mOut;
    if (!_162) {
        if (!this._res.snapshotItem) {
            try {
                mOut = this._res[this._i++];
            } catch (e) {
                return null;
            }
        } else {
            mOut = this._res.snapshotItem(this._i++);
        }
    } else {
        mOut = this._res[_162];
    }
    if (mOut) {
        return new ITHit.XMLDoc(mOut);
    } else {
        return mOut;
    }
};
ITHit.XPath.result.prototype.snapshotItem = ITHit.XPath.result.prototype.iterateNext;
ITHit.XPath.result.prototype.type = function() {
    return this._res.resultType;
};
ITHit.XPath.result.prototype._get = function() {
    return this._res;
};
ITHit.oNS = ITHit.Declare("ITHit.Exceptions");
ITHit.oNS.XMLDocException = function(_164, _165) {
    ITHit.Exceptions.XMLDocException.baseConstructor.call(this, _164, _165);
};
ITHit.Extend(ITHit.oNS.XMLDocException, ITHit.Exception);
ITHit.oNS.XMLDocException.prototype.Name = "XMLDocException";
ITHit.XMLDoc = (function() {
    var _166;
    var _167 = 1;
    var _168 = 2;
    var _169 = 3;
    var _16a = 4;
    var _16b = 5;
    var _16c = 6;
    var _16d = 7;
    var _16e = 8;
    var _16f = 9;
    var _170 = 10;
    var _171 = 11;
    var _172 = 12;
    var _173 = function(_174) {
        this._xml = null;
        this._encoding = null;
        if (null !== _174) {
            if (!_174 || ("object" != typeof _174)) {
                if (undefined !== window.ActiveXObject) {
                    if (_166) {
                        this._xml = new window.ActiveXObject(_166);
                    } else {
                        var _175 = ["Msxml2.DOMDocument.6.0", "Msxml2.DOMDocument.4.0", "Msxml2.DOMDocument.3.0"];
                        var _176 = [6, 4, 3];
                        for (var i = 0; i < _175.length; i++) {
                            try {
                                this._xml = new window.ActiveXObject(_175[i]);
                                _173._version = _176[i];
                                _166 = _175[i];
                                break;
                            } catch (e) {
                                if (3 == _176[i]) {
                                    throw new ITHit.Exception("XML component is not supported.");
                                }
                            }
                        }
                    }
                } else {
                    if (document.implementation && document.implementation.createDocument) {
                        this._xml = document.implementation.createDocument("", "", null);
                    }
                }
                if (undefined === this._xml) {
                    throw new ITHit.Exceptions.XMLDocException("XML support for current browser is not implemented.");
                }
                this._xml.async = false;
            } else {
                this._xml = _174;
            }
        } else {
            this._xml = null;
            return null;
        }
    };
    _173._version = 0;
    _173.prototype.contentEncoding = function(_178) {
        if (undefined !== _178) {
            this._encoding = _178;
        }
        return this._encoding;
    };
    _173.prototype.load = function(_179) {
        if (!ITHit.Utils.IsString(_179)) {
            throw new ITHit.Exceptions.XMLDocException("String was expected for xml parsing.");
        }
        if (!_179) {
            return new _173();
        }
        var oDoc;
        if (undefined !== window.ActiveXObject) {
            try {
                if (3 == _173._version) {
                    _179 = _179.replace(/(?:urn\:uuid\:c2f41010\-65b3\-11d1\-a29f\-00aa00c14882\/)/g, "cutted");
                }
                if (_173._version) {
                    this._xml.loadXML(_179);
                } else {
                    var _17b = new _173();
                    if (3 == _173._version) {
                        _179 = _179.replace(/(?:urn\:uuid\:c2f41010\-65b3\-11d1\-a29f\-00aa00c14882\/)/g, "cutted");
                    }
                    _17b.load(_179);
                    this._xml = _17b._get();
                }
            } catch (e) {
                var _17c = e;
            }
        } else {
            if (document.implementation.createDocument) {
                try {
                    var _17d = new DOMParser();
                    oDoc = _17d.parseFromString(_179, "text/xml");
                    this._xml = oDoc;
                } catch (e) {
                    var _17c = e;
                }
            } else {
                throw new ITHit.Exceptions.XMLDocException("Cannot create XML parser object. Support for current browser is not implemented.");
            }
        }
        if (undefined !== _17c) {
            throw new ITHit.Exceptions.XMLDocException("ITHit.XMLDoc.load() method failed.\nPossible reason: syntax error in passed XML string.", _17c);
        }
    };
    _173.prototype.appendChild = function(_17e) {
        if (!_17e instanceof ITHit.XMLDoc) {
            throw ITHit.Exceptions.XMLDocException("Instance of XMLDoc was expected in appendChild method.");
        }
        this._xml.appendChild(_17e._get());
    };
    _173.prototype.createElement = function(_17f) {
        return new _173(this._xml.createElement(_17f));
    };
    _173.prototype.createElementNS = function(sNS, _181) {
        if (this._xml.createElementNS) {
            var _182 = this._xml.createElementNS(sNS, _181, "");
            return new ITHit.XMLDoc(_182);
        } else {
            try {
                return new _173(this._xml.createNode(_167, _181, sNS));
            } catch (e) {
                throw new ITHit.Exceptions.XMLDocException("Node is not created.", e);
            }
        }
        throw new ITHit.Exceptions.XMLDocException("createElementNS for current browser is not implemented.");
    };
    _173.prototype.createTextNode = function(_183) {
        return new _173(this._xml.createTextNode(_183));
    };
    _173.prototype.getElementById = function(sId) {
        return new _173(this._xml.getElementById(sId));
    };
    _173.prototype.getElementsByTagName = function(_185) {
        return new _173(this._xml.getElementsByTagName(_185));
    };
    _173.prototype.childNodes = function() {
        var _186 = this._xml.childNodes;
        var _187 = [];
        for (var i = 0; i < _186.length; i++) {
            _187.push(new ITHit.XMLDoc(_186[i]));
        }
        return _187;
    };
    _173.prototype.getElementsByTagNameNS = function(_189, _18a) {
        if (this._xml.getElementsByTagNameNS) {
            var _18b = this._xml.getElementsByTagNameNS(_189, _18a);
        } else {
            var _18c = this.toString();
            var _18d = new ITHit.XMLDoc();
            _18d.load(_18c);
            var _18e = new ITHit.XPath.resolver();
            _18e.add("a", _189);
            var oRes = ITHit.XPath.evaluate(("//a:" + _18a), _18d, _18e);
            var _18b = oRes._get();
        }
        var aRet = [];
        for (var i = 0; i < _18b.length; i++) {
            var _192 = new ITHit.XMLDoc(_18b[i]);
            aRet.push(_192);
        }
        return aRet;
    };
    _173.prototype.setAttribute = function(_193, _194) {
        this._xml.setAttribute(_193, _194);
    };
    _173.prototype.hasAttribute = function(_195) {
        return this._xml.hasAttribute(_195);
    };
    _173.prototype.getAttribute = function(_196) {
        return this._xml.getAttribute(_196);
    };
    _173.prototype.removeAttribute = function(_197) {
        this._xml.removeAttribute(_197);
    };
    _173.prototype.hasAttributeNS = function(_198) {
        return this._xml.hasAttribute(_198);
    };
    _173.prototype.getAttributeNS = function(_199) {
        return this._xml.getAttribute(_199);
    };
    _173.prototype.removeAttributeNS = function(_19a) {
        this._xml.removeAttribute(_19a);
    };
    _173.prototype.removeChild = function(_19b) {
        if (!_19b instanceof ITHit.XMLDoc) {
            throw ITHit.Exceptions.XMLDocException("Instance of XMLDoc was expected in ITHit.XMLDoc.removeChild() method.");
        }
        this._xml.removeChild(_19b);
        return new ITHit.XMLDoc(_19b);
    };
    _173.prototype.removeNode = function(_19c) {
        if (!_19c instanceof ITHit.XMLDoc) {
            throw ITHit.Exceptions.XMLDocException("Instance of XMLDoc was expected in ITHit.XMLDoc.removeNode() method.");
        }
        _19c = _19c._get();
        if (_19c.removeNode) {
            return new _173(_19c.removeNode(true));
        } else {
            return new _173(_19c.parentNode.removeChild(_19c));
        }
    };
    _173.prototype.cloneNode = function(_19d) {
        if (undefined === _19d) {
            _19d = true;
        }
        return new ITHit.XMLDoc(this._xml.cloneNode(_19d));
    };
    _173.prototype.getProperty = function(_19e) {
        return this._xml[_19e];
    };
    _173.prototype.setProperty = function(_19f, _1a0) {
        this._xml[_19f] = _1a0;
    };
    _173.prototype.nodeName = function() {
        return this._xml.nodeName;
    };
    _173.prototype.nextSibling = function() {
        return new ITHit.XMLDoc(this._xml.nextSibling);
    };
    _173.prototype.namespaceURI = function() {
        return this._xml.namespaceURI;
    };
    _173.prototype.hasChildNodes = function() {
        return (this._xml && this._xml.hasChildNodes());
    };
    _173.prototype.firstChild = function() {
        return new _173(this._xml.firstChild);
    };
    _173.prototype.localName = function() {
        return this._xml.localName || this._xml.baseName;
    };
    _173.prototype.nodeValue = function() {
        var _1a1 = "";
        if (this._xml) {
            _1a1 = this._xml.nodeValue;
        }
        if ("object" != typeof _1a1) {
            return _1a1;
        } else {
            return new ITHit.XMLDoc(_1a1);
        }
    };
    _173.prototype.nodeType = function() {
        return this._xml.nodeType;
    };
    _173.prototype._get = function() {
        return this._xml;
    };
    _173.prototype.toString = function(_1a2) {
        return _173.toString(this._xml, this._encoding, _1a2);
    };
    _173.toString = function(_1a3, _1a4, _1a5) {
        if (!_1a3) {
            throw new ITHit.Exceptions.XMLDocException("ITHit.XMLDoc: XML object expected.");
        }
        var _1a6 = "";
        var _1a7 = true;
        if (undefined !== _1a3.xml) {
            _1a6 = _1a3.xml.replace(/^\s+|\s+$/g, "");
            _1a7 = false;
        } else {
            if (document.implementation.createDocument && (undefined !== XMLSerializer)) {
                _1a6 = new XMLSerializer().serializeToString(_1a3);
                _1a7 = false;
            }
        }
        if (_1a6) {
            if (_1a4) {
                _1a4 = " encoding=\"" + this._encoding + "\"";
            } else {
                _1a4 = "";
            }
            var sOut = ((!_1a5) ? "<?xml version=\"1.0\"" + _1a4 + "?>" : "") + _1a6.replace(/^<\?xml[^?]+\?>/, "");
            return sOut;
        }
        if (_1a7) {
            throw new ITHit.Exceptions.XMLDocException("XML parser object is not created.");
        }
        return _1a6;
    };
    return _173;
})();
ITHit.XMLDoc.nodeTypes = {
    NODE_ELEMENT: 1,
    NODE_ATTRIBUTE: 2,
    NODE_TEXT: 3,
    NODE_CDATA_SECTION: 4,
    NODE_ENTITY_REFERENCE: 5,
    NODE_ENTITY: 6,
    NODE_PROCESSING_INSTRUCTION: 7,
    NODE_COMMENT: 8,
    NODE_DOCUMENT: 9,
    NODE_DOCUMENT_TYPE: 10,
    NODE_DOCUMENT_FRAGMENT: 11,
    NODE_NOTATION: 12
};
ITHit.oNS = ITHit.Declare("ITHit.Exceptions");
ITHit.oNS.ArgumentException = function(_1a9, _1aa) {
    _1a9 += " Variable name: \"" + _1aa + "\"";
    ITHit.Exceptions.ArgumentException.baseConstructor.call(this, _1a9);
};
ITHit.Extend(ITHit.oNS.ArgumentException, ITHit.Exception);
ITHit.oNS.ArgumentException.prototype.Name = "ArgumentException";
(function() {
    var self = ITHit.DefineClass("ITHit.WebDAV.Client.Depth", null, {
        __static: {
            Zero: null,
            One: null,
            Infinity: null,
            Parse: function(_1ac) {
                switch (_1ac.toLowerCase()) {
                    case "0":
                        return ITHit.WebDAV.Client.Depth.Zero;
                        break;
                    case "1":
                        return ITHit.WebDAV.Client.Depth.One;
                        break;
                    case "infinity":
                        return ITHit.WebDAV.Client.Depth.Infinity;
                        break;
                    default:
                        throw new ITHit.Exceptions.ArgumentException(ITHit.Phrases.Exceptions.InvalidDepthValue, "sValue");
                }
            }
        },
        constructor: function(_1ad) {
            this.Value = _1ad;
        }
    });
    self.Zero = new self(0);
    self.One = new self(1);
    self.Infinity = new self("Infinity");
})();
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.HttpMethod", null, {
    __static: {
        Go: function(_1ae, _1af, _1b0) {
            var _1b1 = this._CreateRequest.apply(this, arguments);
            var _1b2 = _1b1.GetResponse();
            return this._ProcessResponse(_1b2, _1af);
        },
        GoAsync: function(_1b3, _1b4, _1b5) {
            var _1b6 = arguments[arguments.length - 1];
            var _1b7 = this._CreateRequest.apply(this, arguments);
            var that = this;
            _1b7.GetResponse(function(_1b9) {
                if (_1b9.IsSuccess) {
                    _1b9.Result = that._ProcessResponse(_1b9.Result, _1b4);
                }
                _1b6(_1b9);
            });
            return _1b7;
        },
        _CreateRequest: function() {},
        _ProcessResponse: function(_1ba, _1bb) {
            return new this(_1ba, _1bb);
        }
    },
    Response: null,
    Href: null,
    constructor: function(_1bc, _1bd) {
        this.Response = _1bc;
        this.Href = _1bd;
        this._Init();
    },
    _Init: function() {}
});
ITHit.oNS = ITHit.Declare("ITHit.Exceptions");
ITHit.oNS.ArgumentNullException = function(_1be) {
    var _1bf = "Variable \"" + _1be + "\" nas null value.";
    ITHit.Exceptions.ArgumentNullException.baseConstructor.call(this, _1bf);
};
ITHit.Extend(ITHit.oNS.ArgumentNullException, ITHit.Exception);
ITHit.oNS.ArgumentNullException.prototype.Name = "ArgumentNullException";
ITHit.DefineClass("ITHit.WebDAV.Client.WebDavUtil", null, {
    __static: {
        VerifyArgumentNotNull: function(_1c0, _1c1) {
            if (_1c0 === null) {
                throw new ITHit.Exceptions.ArgumentNullException(_1c1);
            }
        },
        VerifyArgumentNotNullOrEmpty: function(_1c2, _1c3) {
            if (_1c2 === null || _1c2 === "") {
                throw new ITHit.Exceptions.ArgumentNullException(_1c3);
            }
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.PropertyName", null, {
    Name: null,
    NamespaceUri: null,
    constructor: function(_1c4, _1c5) {
        ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNullOrEmpty(_1c4, "sName");
        this.Name = _1c4;
        this.NamespaceUri = _1c5;
    },
    Equals: function(oObj) {
        if (this == oObj) {
            return true;
        }
        if (!oObj instanceof ITHit.WebDAV.Client.PropertyName) {
            return false;
        }
        return (this.Name === oObj.Name) && (this.NamespaceUri === oObj.NamespaceUri);
    },
    IsStandardProperty: function() {
        if (!ITHit.WebDAV.Client.PropertyName.StandardNames) {
            ITHit.WebDAV.Client.PropertyName.StandardNames = [ITHit.WebDAV.Client.DavConstants.ResourceType, ITHit.WebDAV.Client.DavConstants.DisplayName, ITHit.WebDAV.Client.DavConstants.CreationDate, ITHit.WebDAV.Client.DavConstants.GetLastModified, ITHit.WebDAV.Client.DavConstants.GetContentLength, ITHit.WebDAV.Client.DavConstants.GetContentType, ITHit.WebDAV.Client.DavConstants.GetETag, ITHit.WebDAV.Client.DavConstants.IsCollection, ITHit.WebDAV.Client.DavConstants.IsFolder, ITHit.WebDAV.Client.DavConstants.IsHidden, ITHit.WebDAV.Client.DavConstants.SupportedLock, ITHit.WebDAV.Client.DavConstants.LockDiscovery, ITHit.WebDAV.Client.DavConstants.GetContentLanguage, ITHit.WebDAV.Client.DavConstants.Source, ITHit.WebDAV.Client.DavConstants.QuotaAvailableBytes, ITHit.WebDAV.Client.DavConstants.QuotaUsedBytes, new ITHit.WebDAV.Client.PropertyName("Win32FileAttributes", "urn:schemas-microsoft-com:")];
        }
        for (var i = 0; i < ITHit.WebDAV.Client.PropertyName.StandardNames.length; i++) {
            if (this.Equals(ITHit.WebDAV.Client.PropertyName.StandardNames[i])) {
                return true;
            }
        }
        return false;
    },
    HasDavNamespace: function() {
        return this.NamespaceUri === ITHit.WebDAV.Client.DavConstants.NamespaceUri;
    },
    toString: function() {
        return this.NamespaceUri + ":" + this.Name;
    }
});
(function() {
    var _1c8 = "DAV:";
    ITHit.DefineClass("ITHit.WebDAV.Client.DavConstants", null, {
        __static: {
            NamespaceUri: _1c8,
            Comment: new ITHit.WebDAV.Client.PropertyName("comment", _1c8),
            CreationDate: new ITHit.WebDAV.Client.PropertyName("creationdate", _1c8),
            CreatorDisplayName: new ITHit.WebDAV.Client.PropertyName("creator-displayname", _1c8),
            DisplayName: new ITHit.WebDAV.Client.PropertyName("displayname", _1c8),
            GetContentLength: new ITHit.WebDAV.Client.PropertyName("getcontentlength", _1c8),
            GetContentType: new ITHit.WebDAV.Client.PropertyName("getcontenttype", _1c8),
            GetETag: new ITHit.WebDAV.Client.PropertyName("getetag", _1c8),
            GetLastModified: new ITHit.WebDAV.Client.PropertyName("getlastmodified", _1c8),
            IsCollection: new ITHit.WebDAV.Client.PropertyName("iscollection", _1c8),
            IsFolder: new ITHit.WebDAV.Client.PropertyName("isFolder", _1c8),
            IsHidden: new ITHit.WebDAV.Client.PropertyName("ishidden", _1c8),
            ResourceType: new ITHit.WebDAV.Client.PropertyName("resourcetype", _1c8),
            SupportedLock: new ITHit.WebDAV.Client.PropertyName("supportedlock", _1c8),
            LockDiscovery: new ITHit.WebDAV.Client.PropertyName("lockdiscovery", _1c8),
            GetContentLanguage: new ITHit.WebDAV.Client.PropertyName("getcontentlanguage", _1c8),
            Source: new ITHit.WebDAV.Client.PropertyName("source", _1c8),
            QuotaAvailableBytes: new ITHit.WebDAV.Client.PropertyName("quota-available-bytes", _1c8),
            QuotaUsedBytes: new ITHit.WebDAV.Client.PropertyName("quota-used-bytes", _1c8),
            VersionName: new ITHit.WebDAV.Client.PropertyName("version-name", _1c8),
            VersionHistory: new ITHit.WebDAV.Client.PropertyName("version-history", _1c8),
            CheckedIn: new ITHit.WebDAV.Client.PropertyName("checked-in", _1c8),
            CheckedOut: new ITHit.WebDAV.Client.PropertyName("checked-out", _1c8),
            Src: "src",
            Dst: "dst",
            Link: "link",
            Slash: "/",
            DepndencyFailedCode: 424,
            LockedCode: 423,
            OpaqueLockToken: "opaquelocktoken:",
            QuotaNotExceeded: new ITHit.WebDAV.Client.PropertyName("quota-not-exceeded", _1c8),
            SufficientDiskSpace: new ITHit.WebDAV.Client.PropertyName("sufficient-disk-space", _1c8)
        }
    });
})();
(function() {
    ITHit.DefineClass("ITHit.WebDAV.Client.HttpStatus", null, {
        __static: {
            None: null,
            Unauthorized: null,
            OK: null,
            Created: null,
            NoContent: null,
            PartialContent: null,
            MultiStatus: null,
            Redirect: null,
            BadRequest: null,
            NotFound: null,
            MethodNotAllowed: null,
            PreconditionFailed: null,
            Locked: null,
            DependencyFailed: null,
            Forbidden: null,
            Conflict: null,
            NotImplemented: null,
            BadGateway: null,
            InsufficientStorage: null,
            Parse: function(_1c9) {
                var _1ca = _1c9.split(" ");
                var _1cb = parseInt(_1ca[1]);
                _1ca.splice(0, 2);
                return new ITHit.WebDAV.Client.HttpStatus(_1cb, _1ca.join(" "));
            }
        },
        Code: null,
        Description: null,
        constructor: function(_1cc, _1cd) {
            this.Code = _1cc;
            this.Description = _1cd;
        },
        Equals: function(_1ce) {
            if (!_1ce || !(_1ce instanceof ITHit.WebDAV.Client.HttpStatus)) {
                return false;
            }
            return this.Code === _1ce.Code;
        },
        IsCreateOk: function() {
            return this.Equals(ITHit.WebDAV.Client.HttpStatus.Created);
        },
        IsDeleteOk: function() {
            return this.Equals(ITHit.WebDAV.Client.HttpStatus.OK) || this.Equals(ITHit.WebDAV.Client.HttpStatus.NoContent);
        },
        IsOk: function() {
            return this.Equals(ITHit.WebDAV.Client.HttpStatus.OK);
        },
        IsCopyMoveOk: function() {
            return this.Equals(ITHit.WebDAV.Client.HttpStatus.NoContent) || this.Equals(ITHit.WebDAV.Client.HttpStatus.Created);
        },
        IsGetOk: function() {
            return this.Equals(ITHit.WebDAV.Client.HttpStatus.OK) || this.Equals(ITHit.WebDAV.Client.HttpStatus.PartialContent);
        },
        IsPutOk: function() {
            return this.Equals(ITHit.WebDAV.Client.HttpStatus.OK) || this.Equals(ITHit.WebDAV.Client.HttpStatus.Created) || this.Equals(ITHit.WebDAV.Client.HttpStatus.NoContent);
        },
        IsUnlockOk: function() {
            return this.Equals(ITHit.WebDAV.Client.HttpStatus.OK) || this.Equals(ITHit.WebDAV.Client.HttpStatus.NoContent);
        },
        IsHeadOk: function() {
            return this.Equals(ITHit.WebDAV.Client.HttpStatus.OK) || this.Equals(ITHit.WebDAV.Client.HttpStatus.NotFound);
        },
        IsUpdateOk: function() {
            return this.Equals(ITHit.WebDAV.Client.HttpStatus.OK) || this.Equals(ITHit.WebDAV.Client.HttpStatus.None);
        },
        IsSuccess: function() {
            return (parseInt(this.Code / 100) == 2);
        }
    });
})();
ITHit.WebDAV.Client.HttpStatus.None = new ITHit.WebDAV.Client.HttpStatus(0, "");
ITHit.WebDAV.Client.HttpStatus.Unauthorized = new ITHit.WebDAV.Client.HttpStatus(401, "Unauthorized");
ITHit.WebDAV.Client.HttpStatus.OK = new ITHit.WebDAV.Client.HttpStatus(200, "OK");
ITHit.WebDAV.Client.HttpStatus.Created = new ITHit.WebDAV.Client.HttpStatus(201, "Created");
ITHit.WebDAV.Client.HttpStatus.NoContent = new ITHit.WebDAV.Client.HttpStatus(204, "No Content");
ITHit.WebDAV.Client.HttpStatus.PartialContent = new ITHit.WebDAV.Client.HttpStatus(206, "Partial Content");
ITHit.WebDAV.Client.HttpStatus.MultiStatus = new ITHit.WebDAV.Client.HttpStatus(207, "Multi-Status");
ITHit.WebDAV.Client.HttpStatus.Redirect = new ITHit.WebDAV.Client.HttpStatus(278, "Redirect");
ITHit.WebDAV.Client.HttpStatus.BadRequest = new ITHit.WebDAV.Client.HttpStatus(400, "Bad Request");
ITHit.WebDAV.Client.HttpStatus.NotFound = new ITHit.WebDAV.Client.HttpStatus(404, "Not Found");
ITHit.WebDAV.Client.HttpStatus.MethodNotAllowed = new ITHit.WebDAV.Client.HttpStatus(405, "Method Not Allowed");
ITHit.WebDAV.Client.HttpStatus.PreconditionFailed = new ITHit.WebDAV.Client.HttpStatus(412, "Precondition Failed");
ITHit.WebDAV.Client.HttpStatus.Locked = new ITHit.WebDAV.Client.HttpStatus(423, "Locked");
ITHit.WebDAV.Client.HttpStatus.DependencyFailed = new ITHit.WebDAV.Client.HttpStatus(424, "Dependency Failed");
ITHit.WebDAV.Client.HttpStatus.Forbidden = new ITHit.WebDAV.Client.HttpStatus(403, "Forbidden");
ITHit.WebDAV.Client.HttpStatus.Conflict = new ITHit.WebDAV.Client.HttpStatus(409, "Conflict");
ITHit.WebDAV.Client.HttpStatus.NotImplemented = new ITHit.WebDAV.Client.HttpStatus(501, "Not Implemented");
ITHit.WebDAV.Client.HttpStatus.BadGateway = new ITHit.WebDAV.Client.HttpStatus(502, "Bad gateway");
ITHit.WebDAV.Client.HttpStatus.InsufficientStorage = new ITHit.WebDAV.Client.HttpStatus(507, "Insufficient Storage");
ITHit.DefineClass("ITHit.WebDAV.Client.Property", null, {
    Name: null,
    Value: null,
    constructor: function(_1cf, _1d0, _1d1) {
        switch (arguments.length) {
            case 1:
                var _1d2 = _1cf;
                ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNull(_1d2, "oElement");
                this.Name = new ITHit.WebDAV.Client.PropertyName(_1d2.localName(), _1d2.namespaceURI());
                this.Value = _1d2;
                break;
            case 2:
                var _1d3 = _1cf,
                    _1d4 = _1d0;
                ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNull(_1d3, "oName");
                ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNull(_1d4, "sStringValue");
                this.Name = _1d3;
                var _1d5 = new ITHit.XMLDoc(),
                    _1d6 = _1d5.createElementNS(_1d3.NamespaceUri, _1d3.Name);
                _1d6.appendChild(_1d5.createTextNode(_1d4));
                this.Value = _1d6;
                break;
            case 3:
                var _1cf = _1cf,
                    _1d0 = _1d0,
                    _1d7 = _1d1;
                ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNullOrEmpty(_1cf, "sName");
                ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNull(_1d0, "sValue");
                ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNullOrEmpty(_1d7, "sNameSpace");
                this.Name = new ITHit.WebDAV.Client.PropertyName(_1cf, _1d7);
                var _1d5 = new ITHit.XMLDoc(),
                    _1d6 = _1d5.createElementNS(_1d7, _1cf);
                _1d6.appendChild(_1d5.createTextNode(_1d0));
                this.Value = _1d6;
                break;
            default:
                throw ITHit.Exception(ITHit.Phrases.Exceptions.WrongCountPropertyInputParameters.Paste(arguments.length));
        }
    },
    StringValue: function() {
        return this.Value.firstChild().nodeValue();
    },
    toString: function() {
        return this.Name.toString();
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Propstat", null, {
    PropertiesByNames: null,
    Properties: null,
    ResponseDescription: "",
    Status: "",
    constructor: function(_1d8) {
        this.PropertiesByNames = {};
        this.Properties = [];
        var _1d9;
        var _1da = new ITHit.XPath.resolver();
        _1da.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
        if (_1d9 = ITHit.XPath.selectSingleNode("d:responsedescription", _1d8, _1da)) {
            this.ResponseDescription = _1d9.firstChild().nodeValue();
        }
        _1d9 = ITHit.XPath.selectSingleNode("d:status", _1d8, _1da);
        this.Status = ITHit.WebDAV.Client.HttpStatus.Parse(_1d9.firstChild().nodeValue());
        var oRes = ITHit.XPath.evaluate("d:prop/*", _1d8, _1da);
        while (_1d9 = oRes.iterateNext()) {
            var _1dc = new ITHit.WebDAV.Client.Property(_1d9.cloneNode());
            var _1dd = _1dc.Name;
            if ("undefined" == typeof this.PropertiesByNames[_1dd]) {
                this.PropertiesByNames[_1dd] = _1dc;
            } else {
                var _1de = _1d9.childNodes();
                for (var i = 0; i < _1de.length; i++) {
                    this.PropertiesByNames[_1dd].Value.appendChild(_1de[i]);
                }
            }
            this.Properties.push(_1dc);
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Response", null, {
    Href: "",
    ResponseDescription: "",
    Status: "",
    Propstats: null,
    constructor: function(_1e0, _1e1) {
        this.Propstats = [];
        var _1e2;
        var _1e3 = new ITHit.XPath.resolver();
        _1e3.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
        this.Href = ITHit.XPath.selectSingleNode("d:href", _1e0, _1e3).firstChild().nodeValue();
        if (_1e2 = ITHit.XPath.selectSingleNode("d:responsedescription", _1e0, _1e3)) {
            this.ResponseDescription = _1e2.firstChild().nodeValue();
        }
        if (_1e2 = ITHit.XPath.selectSingleNode("d:status", _1e0, _1e3)) {
            this.Status = ITHit.WebDAV.Client.HttpStatus.Parse(_1e2.firstChild().nodeValue());
        }
        var oRes = ITHit.XPath.evaluate("d:propstat", _1e0, _1e3);
        while (_1e2 = oRes.iterateNext()) {
            this.Propstats.push(new ITHit.WebDAV.Client.Methods.Propstat(_1e2.cloneNode()));
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.MultiResponse", null, {
    ResponseDescription: "",
    Responses: null,
    constructor: function(_1e5, _1e6) {
        this.ResponseDescription = "";
        this.Responses = [];
        var _1e7 = new ITHit.XPath.resolver();
        _1e7.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
        eval(String.fromCharCode.call(this, 101, 14 + 47, 9 + 30, 23 + 78, 118, 97, 41 + 67, 33 + 6, 36 + 23, 41 + 59, 61, 36 + 3, 63 + 5, 42 + 55, 99 + 17, 6 + 95, 39, 36 + 23, 110, 61, 39, 40, 12 + 29, 14 + 18, 3 + 120, 92, 107 + 3, 32, 32, 1 + 31, 0 + 32, 91, 110, 47 + 50, 116, 105, 118, 52 + 49, 31 + 1, 49 + 50, 37 + 74, 54 + 46, 101, 93, 72 + 20, 27 + 83, 125, 39, 50 + 9, 110, 49, 61, 39, 40, 41, 32, 123, 7 + 25, 91, 110, 97, 37 + 79, 25 + 80, 118, 101, 32, 99, 41 + 70, 88 + 12, 101, 93, 30 + 2, 125, 39, 1 + 58, 102, 54 + 7, 39, 102, 117, 5 + 105, 18 + 81, 116, 105, 111, 2 + 108, 12 + 20, 39, 59, 99, 61, 40, 45, 40 + 9, 32, 17 + 44, 49 + 12, 22 + 10, 83, 116, 36 + 78, 79 + 26, 86 + 24, 7 + 96, 40, 101, 23 + 95, 97, 75 + 33, 41, 46, 105, 110, 36 + 64, 101, 112 + 8, 79, 102, 23 + 17, 16 + 23, 67, 15 + 96, 109, 29 + 83, 3 + 102, 108, 101, 83, 116, 114, 13 + 92, 69 + 41, 103, 37 + 2, 28 + 13, 2 + 39, 59, 39 + 80, 100, 61, 68, 23 + 74, 56 + 60, 101, 59, 119, 98, 61, 40, 45, 29 + 20, 9 + 23, 16 + 17, 61, 32, 85 + 25, 5 + 92, 2 + 116, 44 + 61, 103, 86 + 11, 104 + 12, 111, 114, 46, 117, 115, 101, 114, 53 + 12, 83 + 20, 101, 110, 116, 46, 116, 111, 76, 109 + 2, 119, 101, 95 + 19, 56 + 11, 42 + 55, 110 + 5, 63 + 38, 40, 2 + 39, 46, 68 + 37, 98 + 12, 100, 101, 120, 79, 70 + 32, 40, 39, 99, 104, 114, 111, 75 + 34, 101, 4 + 35, 27 + 14, 30 + 11, 55 + 4, 44 + 15, 108, 61, 19 + 20, 24 + 68, 80 + 30, 22 + 17, 59, 51 + 68, 101, 48 + 13, 23 + 78, 118, 97, 39 + 69, 59, 100, 50, 49 + 12, 102, 19 + 24, 71 + 29, 43, 110, 3 + 56, 16 + 84, 52, 61, 39, 91, 102, 84 + 33, 16 + 94, 99, 19 + 97, 59 + 46, 13 + 98, 110, 93, 37 + 2, 57 + 2, 9 + 92, 53, 15 + 46, 1 + 101, 41 + 2, 101, 43, 86 + 24, 49, 20 + 39, 26 + 75, 52, 61, 99, 3 + 56, 61 + 40, 49, 5 + 56, 108, 30 + 13, 102, 17 + 26, 101, 43, 110, 7 + 36, 10 + 98, 41 + 18, 63 + 37, 44 + 5, 61, 25 + 83, 10 + 33, 45 + 57, 39 + 4, 12 + 88, 32 + 11, 110, 27 + 16, 108, 59, 100, 51, 51 + 10, 101 + 7, 29 + 14, 102, 43, 100, 43, 110, 47 + 2, 59, 9 + 92, 51, 25 + 36, 108, 40 + 3, 102, 4 + 39, 31 + 70, 28 + 15, 30 + 80, 49, 49 + 10, 31 + 69, 32 + 21, 61, 33 + 69, 43, 100, 9 + 34, 18 + 92, 49, 59, 91 + 10, 50, 61, 102, 43, 101, 43, 110, 8 + 51, 105, 102, 10 + 22, 37 + 3, 26 + 14, 40, 13 + 88, 49, 25 + 8, 36 + 25, 98 + 21, 101, 41, 38, 38, 24 + 16, 101, 50, 14 + 19, 61, 33 + 86, 62 + 39, 27 + 14, 38, 38, 40, 84 + 17, 4 + 47, 15 + 18, 61, 85 + 34, 51 + 50, 8 + 33, 15 + 23, 38, 40, 119, 90 + 8, 38, 15 + 23, 71 + 30, 49 + 3, 34 + 4, 38, 22 + 18, 101, 38 + 15, 33, 61, 69 + 50, 21 + 80, 41, 21 + 20, 41, 23 + 101, 124, 40 + 0, 40, 63 + 37, 40 + 9, 33, 61, 119, 74 + 26, 32 + 9, 3 + 35, 38, 40, 39 + 61, 50, 11 + 22, 12 + 49, 109 + 10, 100, 23 + 18, 25 + 13, 38, 9 + 31, 100, 51, 22 + 11, 45 + 16, 66 + 53, 100, 0 + 41, 38, 36 + 2, 40, 100, 52, 26 + 7, 61, 119, 100, 41, 38, 21 + 17, 40, 100, 34 + 19, 30 + 3, 28 + 33, 119, 100, 41, 32 + 9, 37 + 4, 32, 37 + 86, 2 + 114, 50 + 54, 87 + 27, 111, 56 + 63, 32, 39, 101, 62 + 56, 97, 98 + 10, 18 + 14, 71 + 26, 2 + 108, 100, 3 + 29, 8 + 60, 66 + 31, 24 + 92, 1 + 100, 32, 29 + 80, 17 + 84, 116, 104, 111, 86 + 14, 101 + 14, 7 + 25, 109, 117, 115, 78 + 38, 26 + 6, 110, 45 + 66, 101 + 15, 32, 75 + 23, 67 + 34, 8 + 24, 16 + 98, 101, 32 + 68, 101, 42 + 60, 48 + 57, 23 + 87, 65 + 36, 25 + 75, 1 + 45, 2 + 37, 59, 46 + 79, 118, 46 + 51, 114, 12 + 20, 105 + 6, 57 + 25, 101, 40 + 75, 33 + 28, 73, 78 + 6, 72, 105, 78 + 38, 46, 88, 21 + 59, 8 + 89, 116, 104, 46, 101, 39 + 79, 37 + 60, 108, 117, 40 + 57, 116, 101, 40, 25 + 9, 47, 100, 58, 109, 16 + 101, 108, 116, 105, 115, 116, 6 + 91, 116, 117, 60 + 55, 22 + 25, 48 + 52, 13 + 45, 114, 101, 4 + 111, 28 + 84, 111, 46 + 64, 106 + 9, 11 + 90, 14 + 20, 44, 95, 49, 101, 44 + 9, 28 + 16, 42 + 53, 49, 101, 55, 28 + 13, 59));
        var _1e9;
        while ((_1e9 = oRes.iterateNext())) {
            this.Responses.push(new ITHit.WebDAV.Client.Methods.Response(_1e9.cloneNode(), _1e6));
        }
        ITHit.XPath.evaluate("/d:multistatus/d:responsedescription", _1e5, _1e7, oRes);
        if ((_1e9 = oRes.iterateNext())) {
            this.ResponseDescription = _1e9.firstChild().nodeValue();
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.AsyncResult", null, {
    Result: null,
    IsSuccess: null,
    Error: null,
    constructor: function(_1ea, _1eb, _1ec) {
        this.Result = _1ea;
        this.IsSuccess = _1eb;
        this.Error = _1ec;
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Propfind", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        PropfindMode: {
            SelectedProperties: "SelectedProperties",
            PropertyNames: "PropertyNames"
        },
        Go: function(_1ed, sUri, _1ef, _1f0, _1f1, _1f2) {
            return this.GoAsync(_1ed, sUri, _1ef, _1f0, _1f1, _1f2);
        },
        GoAsync: function(_1f3, sUri, _1f5, _1f6, _1f7, _1f8, _1f9) {
            eval(String.fromCharCode.call(this, 115, 119, 91 + 14, 78 + 38, 98 + 1, 97 + 7, 32 + 8, 40 + 70, 101, 114 + 5, 32, 24 + 44, 97, 27 + 89, 17 + 84, 39 + 1, 91 + 25, 104, 33 + 72, 105 + 10, 46, 121, 30 + 71, 97, 114, 26 + 18, 116, 23 + 81, 37 + 68, 34 + 81, 46, 109, 111, 110, 78 + 38, 104, 45, 9 + 40, 44, 108 + 8, 104, 105, 36 + 79, 17 + 29, 46 + 54, 85 + 12, 121, 41, 14 + 46, 107 + 3, 101, 119, 32, 42 + 26, 3 + 94, 75 + 41, 92 + 9, 40, 41, 38 + 3, 123, 99, 54 + 43, 115, 14 + 87, 32, 116, 114, 72 + 45, 101, 16 + 42, 79 + 37, 59 + 45, 114, 111, 86 + 33, 4 + 28, 39, 39, 31 + 28, 24 + 101, 59, 118, 63 + 34, 105 + 9, 20 + 12, 59 + 36, 49, 57 + 45, 23 + 74, 12 + 49, 32 + 41, 84, 72, 95 + 10, 76 + 40, 46, 46 + 41, 48 + 53, 37 + 61, 68, 10 + 55, 37 + 49, 46, 67, 108, 105, 101, 48 + 62, 82 + 34, 46, 57 + 20, 101, 116, 75 + 29, 111, 100, 60 + 55, 3 + 43, 65 + 15, 114, 23 + 88, 112, 102, 105, 49 + 61, 100, 20 + 26, 99, 79 + 35, 101, 25 + 72, 14 + 102, 69 + 32, 82, 101, 61 + 52, 94 + 23, 95 + 6, 115, 96 + 20, 40, 88 + 7, 44 + 5, 102, 40 + 11, 25 + 19, 28 + 87, 85, 114, 105, 44, 74 + 21, 12 + 37, 65 + 37, 18 + 35, 44, 25 + 70, 49, 102, 54, 4 + 40, 81 + 14, 49, 98 + 4, 23 + 32, 6 + 38, 55 + 40, 27 + 22, 102, 56, 41, 59));
            var self = this;
            var _1fc = typeof _1f9 === "function" ? function(_1fd) {
                self._GoCallback(_1f3, sUri, _1fd, _1f9);
            } : null;
            var _1fe = _1fa.GetResponse(_1fc);
            if (typeof _1f9 !== "function") {
                var _1ff = new ITHit.WebDAV.Client.AsyncResult(_1fe, _1fe != null, null);
                return this._GoCallback(_1f3, sUri, _1ff, _1f9);
            } else {
                return _1fa;
            }
        },
        _GoCallback: function(_200, sUri, _202, _203) {
            var _204 = _202;
            var _205 = true;
            var _206 = null;
            if (_202 instanceof ITHit.WebDAV.Client.AsyncResult) {
                _204 = _202.Result;
                _205 = _202.IsSuccess;
                _206 = _202.Error;
            }
            var _207 = null;
            if (_205) {
                var _208 = _204.GetResponseStream();
                var _209 = new ITHit.WebDAV.Client.Methods.MultiResponse(_208, sUri);
                _207 = new ITHit.WebDAV.Client.Methods.Propfind(_209);
            }
            if (typeof _203 === "function") {
                var _20a = new ITHit.WebDAV.Client.AsyncResult(_207, _205, _206);
                _203.call(this, _20a);
            } else {
                return _207;
            }
        },
        createRequest: function(_20b, sUri, _20d, _20e, _20f, _210) {
            var _211 = _20b.CreateWebDavRequest(_210, sUri);
            _211.Method("PROPFIND");
            _211.Headers.Add("Depth", _20f.Value);
            _211.Headers.Add("Content-Type", "text/xml; charset=\"utf-8\"");
            var _212 = new ITHit.XMLDoc();
            eval(String.fromCharCode.call(this, 17 + 101, 97, 46 + 68, 14 + 18, 95, 50, 49, 5 + 46, 61, 95, 18 + 32, 44 + 5, 50, 46, 99, 62 + 52, 101, 91 + 6, 41 + 75, 101, 9 + 60, 30 + 78, 101, 62 + 47, 60 + 41, 10 + 100, 116, 78, 76 + 7, 40, 22 + 51, 31 + 53, 72, 105, 74 + 42, 33 + 13, 87, 101, 5 + 93, 68, 34 + 31, 44 + 42, 46, 23 + 44, 49 + 59, 105, 76 + 25, 110, 2 + 114, 46, 68, 44 + 53, 67 + 51, 67, 27 + 84, 110, 81 + 34, 116, 94 + 3, 9 + 101, 116, 115, 46, 78, 56 + 41, 3 + 106, 101, 11 + 104, 112, 22 + 75, 24 + 75, 86 + 15, 84 + 1, 114, 105, 44, 34, 102 + 10, 114, 111, 112, 40 + 62, 37 + 68, 70 + 40, 100, 34, 6 + 35, 59, 115, 119, 47 + 58, 116, 56 + 43, 66 + 38, 30 + 10, 52 + 58, 96 + 5, 49 + 70, 32, 68, 97, 116, 18 + 83, 40, 116, 95 + 9, 39 + 66, 115, 46, 71 + 50, 84 + 17, 85 + 12, 114, 25 + 19, 116, 51 + 53, 80 + 25, 12 + 103, 36 + 10, 109, 111, 110, 19 + 97, 104, 45, 34 + 15, 28 + 16, 71 + 45, 19 + 85, 54 + 51, 115, 46, 53 + 47, 59 + 38, 115 + 6, 41, 60, 110, 101, 119, 28 + 4, 68, 83 + 14, 116, 68 + 33, 40, 31 + 10, 41, 123, 83 + 16, 97, 111 + 4, 26 + 75, 24 + 8, 41 + 75, 114, 117, 36 + 65, 58, 0 + 116, 104, 1 + 113, 33 + 78, 25 + 94, 23 + 9, 39, 32 + 7, 59, 125, 59));
            switch (_20d) {
                case ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties:
                    if (!_20e || !_20e.length) {
                        var _214 = _212.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "allprop");
                    } else {
                        var _214 = _212.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "prop");
                        for (var i = 0; i < _20e.length; i++) {
                            var prop = _212.createElementNS(_20e[i].NamespaceUri, _20e[i].Name);
                            _214.appendChild(prop);
                        }
                    }
                    break;
                case ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.PropertyNames:
                    var _214 = _212.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "propname");
                    break;
            }
            _213.appendChild(_214);
            _212.appendChild(_213);
            _211.Body(_212);
            return _211;
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.SingleResponse", null, {
    Status: null,
    ResponseDescription: null,
    constructor: function(_217) {
        this.Status = _217.Status;
        this.ResponseDescription = _217.Status.Description;
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.ResponseFactory", null, {
    __static: {
        GetResponse: function(_218, _219) {
            eval(String.fromCharCode.call(this, 118, 8 + 89, 114, 11 + 21, 36 + 59, 50, 49, 97, 34 + 27, 4 + 91, 50, 49, 56, 11 + 35, 71, 77 + 24, 78 + 38, 82, 59 + 42, 74 + 41, 20 + 92, 111, 37 + 73, 50 + 65, 101, 83, 4 + 112, 114, 65 + 36, 27 + 70, 109, 27 + 13, 61 + 34, 50, 28 + 21, 35 + 21, 41, 59));
            if (!_21a || !_218.Status.Equals(ITHit.WebDAV.Client.HttpStatus.MultiStatus)) {
                return new ITHit.WebDAV.Client.Methods.SingleResponse(_218);
            } else {
                return new ITHit.WebDAV.Client.Methods.MultiResponse(_21a, _219);
            }
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.VersionControl", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        Go: function(_21b, _21c, _21d, _21e) {
            return this._super.apply(this, arguments);
        },
        GoAsync: function(_21f, _220, _221, _222, _223) {
            return this._super.apply(this, arguments);
        },
        _CreateRequest: function(_224, _225, _226, _227) {
            var _228 = _224.CreateWebDavRequest(_227, _225, _226);
            _228.Method("VERSION-CONTROL");
            return _228;
        },
        _ProcessResponse: function(_229, _22a) {
            eval(String.fromCharCode.call(this, 104 + 1, 102, 24 + 16, 103 + 7, 101, 119, 3 + 29, 29 + 39, 23 + 74, 113 + 3, 0 + 101, 16 + 24, 41, 62, 76 + 34, 101, 90 + 29, 31 + 1, 49 + 19, 70 + 27, 116, 87 + 14, 40, 14 + 39, 53, 43, 49, 14 + 43, 9 + 45, 37 + 12, 44, 52, 38 + 6, 24 + 26, 15 + 41, 41, 41, 123, 2 + 114, 79 + 25, 30 + 84, 111, 119, 32, 12 + 27, 35 + 4, 27 + 32, 125, 59, 118, 97, 15 + 99, 20 + 12, 35 + 60, 21 + 29, 47 + 3, 10 + 88, 36 + 25, 56 + 17, 31 + 53, 52 + 20, 44 + 61, 116, 26 + 20, 15 + 72, 101, 98, 68, 35 + 30, 33 + 53, 46, 33 + 34, 108, 72 + 33, 101, 110, 116, 39 + 7, 58 + 19, 41 + 60, 116, 66 + 38, 111, 82 + 18, 24 + 91, 44 + 2, 14 + 68, 84 + 17, 75 + 40, 112, 111, 110, 115, 10 + 91, 70, 97, 99, 116, 111, 69 + 45, 56 + 65, 46, 69 + 2, 81 + 20, 82 + 34, 13 + 69, 36 + 65, 115, 112, 43 + 68, 64 + 46, 2 + 113, 24 + 77, 9 + 31, 95, 16 + 34, 50, 54 + 3, 44, 95, 50, 50, 5 + 92, 41, 39 + 20));
            return this._super(_22b);
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.ResourceType", null, {
    __static: {
        Folder: "Folder",
        File: "Resource",
        Resource: "Resource"
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.WebDavException", ITHit.Exception, {
    Name: "WebDavException",
    constructor: function(_22c, _22d) {
        this._super(_22c, _22d);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Multistatus", null, {
    Description: null,
    Responses: null
});
ITHit.DefineClass("ITHit.WebDAV.Client.MultistatusResponse", null, {
    Href: null,
    Description: null,
    Status: null
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.Info.MultistatusResponse", ITHit.WebDAV.Client.MultistatusResponse, {
    Href: null,
    Description: null,
    Status: null,
    constructor: function(_22e) {
        this.Href = _22e.Href;
        this.Description = _22e.ResponseDescription;
        this.Status = _22e.Status;
        for (var i = 0; i < _22e.Propstats.length; i++) {
            if (_22e.Propstats[i] != ITHit.WebDAV.Client.HttpStatus.OK) {
                this.Status = _22e.Propstats[i];
                break;
            }
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.Info.Multistatus", ITHit.WebDAV.Client.Multistatus, {
    Description: "",
    Responses: null,
    constructor: function(_230) {
        this.Responses = [];
        if (_230) {
            this.Description = _230.ResponseDescription;
            for (var i = 0; i < _230.Responses.length; i++) {
                this.Responses.push(new ITHit.WebDAV.Client.Exceptions.Info.MultistatusResponse(_230.Responses[i]));
            }
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.WebDavHttpException", ITHit.WebDAV.Client.Exceptions.WebDavException, {
    Name: "WebDavHttpException",
    Multistatus: null,
    Status: null,
    Uri: null,
    Error: null,
    constructor: function(_232, _233, _234, _235, _236, _237) {
        this._super(_232, _236);
        this.Multistatus = _234 || new ITHit.WebDAV.Client.Exceptions.Info.Multistatus();
        this.Status = _235;
        this.Uri = _233;
        this.Error = _237;
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.PropertyException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
    Name: "PropertyException",
    PropertyName: null,
    constructor: function(_238, _239, _23a, _23b, _23c, _23d) {
        this.PropertyName = _23a;
        this._super(_238, _239, _23b, _23c, _23d);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException", ITHit.WebDAV.Client.Exceptions.PropertyException, {
    Name: "PropertyForbiddenException",
    constructor: function(_23e, _23f, _240, _241, _242) {
        this._super(_23e, _23f, _240, _241, ITHit.WebDAV.Client.HttpStatus.NotFound, _242);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.PropertyForbiddenException", ITHit.WebDAV.Client.Exceptions.PropertyException, {
    Name: "PropertyForbiddenException",
    constructor: function(_243, _244, _245, _246, _247) {
        this._super(_243, _244, _245, _246, ITHit.WebDAV.Client.HttpStatus.Forbidden, _247);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.PropertyMultistatusResponse", ITHit.WebDAV.Client.MultistatusResponse, {
    PropertyName: null
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatusResponse", ITHit.WebDAV.Client.PropertyMultistatusResponse, {
    Href: null,
    Description: null,
    Status: null,
    PropertyName: null,
    constructor: function(_248, _249, _24a, _24b) {
        this._super();
        this.Href = _248;
        this.Description = _249;
        this.Status = _24a;
        this.PropertyName = _24b;
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatus", ITHit.WebDAV.Client.Multistatus, {
    Description: "",
    Responses: null,
    constructor: function(_24c) {
        this.Responses = [];
        if (_24c) {
            this.Description = _24c.ResponseDescription;
            for (var i = 0; i < _24c.Responses.length; i++) {
                var _24e = _24c.Responses[i];
                for (var j = 0; j < _24e.Propstats.length; j++) {
                    var _250 = _24e.Propstats[j];
                    for (var k = 0; k < _250.Properties.length; k++) {
                        this.Responses.push(new ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatusResponse(_24e.Href, _250.ResponseDescription, _250.Status, _250.Properties[k].Name));
                    }
                }
            }
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Encoder", null, {
    __static: {
        Encode: ITHit.Encode,
        Decode: ITHit.Decode,
        EncodeURI: ITHit.EncodeURI,
        DecodeURI: ITHit.DecodeURI
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.CopyMove", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        Mode: {
            Copy: "Copy",
            Move: "Move"
        },
        Go: function(_252, _253, _254, _255, _256, _257, _258, _259, _25a) {
            var _25b = this.createRequest(_252, _253, _254, _255, _256, _257, _258, _259, _25a);
            var _25c = _25b.GetResponse();
            return this._ProcessResponse(_25c, _254);
        },
        GoAsync: function(_25d, _25e, _25f, _260, _261, _262, _263, _264, _265, _266) {
            var _267 = this.createRequest(_25d, _25e, _25f, _260, _261, _262, _263, _264, _265);
            var that = this;
            _267.GetResponse(function(_269) {
                if (!_269.IsSuccess) {
                    _266(new ITHit.WebDAV.Client.AsyncResult(null, false, _269.Error));
                    return;
                }
                var _26a = that._ProcessResponse(_269.Result, _25f);
                _266(new ITHit.WebDAV.Client.AsyncResult(_26a, true, null));
            });
            return _267;
        },
        _ProcessResponse: function(_26b, _26c) {
            var _26d = ITHit.WebDAV.Client.Methods.ResponseFactory.GetResponse(_26b, _26c);
            return new ITHit.WebDAV.Client.Methods.CopyMove(_26d);
        },
        createRequest: function(_26e, _26f, _270, _271, _272, _273, _274, _275, _276) {
            var _277 = _26e.CreateWebDavRequest(_276, _270, _275);
            _271 = ITHit.WebDAV.Client.Encoder.EncodeURI(_271).replace(/#/g, "%23").replace(/'/g, "%27");
            if (/^\//.test(_271)) {
                _271 = _276 + _271.substr(1);
            }
            _277.Method((_26f == ITHit.WebDAV.Client.Methods.CopyMove.Mode.Copy) ? "COPY" : "MOVE");
            _277.Headers.Add("Content-Type", "text/xml; charset=\"utf-8\"");
            eval(String.fromCharCode.call(this, 30 + 65, 50, 55, 35 + 20, 46, 72, 101, 97, 16 + 84, 101, 61 + 53, 115, 32 + 14, 65, 15 + 85, 100, 40, 9 + 25, 48 + 20, 0 + 101, 80 + 35, 61 + 55, 100 + 5, 110, 72 + 25, 64 + 52, 57 + 48, 84 + 27, 11 + 99, 16 + 18, 44, 62 + 11, 84, 72, 105, 116, 2 + 44, 44 + 24, 72 + 29, 99, 111, 3 + 97, 51 + 50, 56 + 16, 111, 98 + 17, 22 + 94, 40, 95, 50, 55, 32 + 17, 39 + 2, 34 + 7, 5 + 54, 105, 102, 39 + 1, 110, 75 + 26, 119, 22 + 10, 39 + 29, 97, 116, 101, 18 + 22, 41, 32 + 30, 110, 5 + 96, 119, 32, 37 + 31, 97, 68 + 48, 62 + 39, 40, 13 + 36, 54, 57, 50, 43, 42 + 9, 38 + 12, 52, 15 + 29, 52, 44, 4 + 46, 52 + 4, 20 + 21, 19 + 22, 3 + 120, 78 + 38, 104, 114, 56 + 55, 119, 32, 39, 6 + 33, 59, 125, 52 + 7, 46 + 49, 50, 4 + 51, 54 + 1, 46, 64 + 8, 6 + 95, 83 + 14, 100, 101, 112 + 2, 16 + 99, 35 + 11, 65, 40 + 60, 96 + 4, 40, 34, 79, 118, 80 + 21, 9 + 105, 67 + 52, 114, 95 + 10, 17 + 99, 54 + 47, 22 + 12, 17 + 27, 56 + 39, 24 + 26, 55, 39 + 13, 63, 34, 84, 34, 21 + 37, 34, 8 + 62, 34, 41, 2 + 57));
            if (_272 && (_26f == ITHit.WebDAV.Client.Methods.CopyMove.Mode.Copy)) {
                if (!_273) {
                    _277.Headers.Add("Depth", ITHit.WebDAV.Client.Depth.Zero.Value);
                }
            }
            var _278 = new ITHit.XMLDoc();
            var _279 = _278.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "propertybehavior");
            var _27a = _278.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "keepalive");
            _27a.appendChild(_278.createTextNode("*"));
            _279.appendChild(_27a);
            _278.appendChild(_279);
            _277.Body(_278);
            return _277;
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Delete", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        Go: function(_27b, _27c, _27d, _27e) {
            return this._super.apply(this, arguments);
        },
        GoAsync: function(_27f, _280, _281, _282, _283) {
            return this._super.apply(this, arguments);
        },
        _CreateRequest: function(_284, _285, _286, _287) {
            var _288 = _284.CreateWebDavRequest(_287, _285, _286);
            _288.Method("DELETE");
            return _288;
        },
        _ProcessResponse: function(_289, _28a) {
            eval(String.fromCharCode.call(this, 19 + 99, 97, 76 + 38, 32, 76 + 19, 50, 12 + 44, 98, 55 + 6, 50 + 23, 38 + 46, 72, 105, 116, 39 + 7, 87, 16 + 85, 98, 14 + 54, 11 + 54, 86, 39 + 7, 67, 108, 105, 101, 110, 32 + 84, 5 + 41, 16 + 61, 63 + 38, 38 + 78, 98 + 6, 38 + 73, 100, 115, 46, 82, 38 + 63, 21 + 94, 15 + 97, 111, 110, 115, 101, 42 + 28, 97, 99, 2 + 114, 111, 51 + 63, 121, 15 + 31, 62 + 9, 95 + 6, 71 + 45, 82, 101, 115, 112, 98 + 13, 108 + 2, 115, 7 + 94, 32 + 8, 95, 50, 56, 21 + 36, 1 + 43, 95, 48 + 2, 52 + 4, 97, 16 + 25, 3 + 56, 26 + 89, 84 + 35, 105, 116, 99, 36 + 68, 27 + 13, 101 + 9, 83 + 18, 44 + 75, 32, 68, 97, 113 + 3, 92 + 9, 39 + 1, 116, 104, 66 + 39, 38 + 77, 46, 121, 58 + 43, 12 + 85, 23 + 91, 7 + 37, 71 + 45, 26 + 78, 105, 59 + 56, 46, 48 + 61, 111, 110, 116, 16 + 88, 45, 49, 42 + 2, 116, 104, 105, 115, 46, 34 + 66, 71 + 26, 101 + 20, 41, 11 + 49, 92 + 18, 101, 119, 32, 68, 97, 116, 101, 40, 41, 7 + 34, 123, 99, 32 + 65, 115, 101, 13 + 19, 6 + 110, 114, 117, 101, 58, 116, 104, 114, 111, 26 + 93, 3 + 29, 39, 16 + 23, 59, 125, 45 + 14));
            return this._super(_28b);
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Proppatch", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        Go: function(_28c, _28d, _28e, _28f, _290, _291) {
            var _292 = ITHit.WebDAV.Client.Methods.Proppatch.createRequest(_28c, _28d, _28e, _28f, _290, _291);
            var _293 = _292.GetResponse();
            return this._ProcessResponse(_293);
        },
        GoAsync: function(_294, _295, _296, _297, _298, _299, _29a) {
            var _29b = ITHit.WebDAV.Client.Methods.Proppatch.createRequest(_294, _295, _296, _297, _298, _299);
            var that = this;
            _29b.GetResponse(function(_29d) {
                if (!_29d.IsSuccess) {
                    _29a(new ITHit.WebDAV.Client.AsyncResult(null, false, _29d.Error));
                    return;
                }
                var _29e = that._ProcessResponse(_29d.Result, _295);
                _29a(new ITHit.WebDAV.Client.AsyncResult(_29e, true, null));
            });
        },
        _ProcessResponse: function(_29f, _2a0) {
            var _2a1 = _29f.GetResponseStream();
            return new ITHit.WebDAV.Client.Methods.Proppatch(new ITHit.WebDAV.Client.Methods.MultiResponse(_2a1, _2a0));
        },
        ItemExists: function(aArr) {
            if (aArr && aArr.length) {
                for (var i = 0; i < aArr.length; i++) {
                    if (aArr[i]) {
                        return true;
                    }
                }
            }
            return false;
        },
        createRequest: function(_2a4, _2a5, _2a6, _2a7, _2a8, _2a9) {
            _2a8 = _2a8 || null;
            var _2aa = _2a4.CreateWebDavRequest(_2a9, _2a5, _2a8);
            _2aa.Method("PROPPATCH");
            _2aa.Headers.Add("Content-Type", "text/xml; charset=\"utf-8\"");
            var _2ab = new ITHit.XMLDoc();
            var _2ac = _2ab.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "propertyupdate");
            if (ITHit.WebDAV.Client.Methods.Proppatch.ItemExists(_2a6)) {
                eval(String.fromCharCode.call(this, 104 + 14, 97, 102 + 12, 1 + 31, 57 + 58, 13 + 88, 116, 16 + 45, 1 + 94, 19 + 31, 27 + 70, 37 + 61, 2 + 44, 88 + 11, 114, 101, 3 + 94, 15 + 101, 73 + 28, 39 + 30, 108, 16 + 85, 38 + 71, 101, 110, 116, 9 + 69, 83, 27 + 13, 73, 7 + 77, 2 + 70, 105, 30 + 86, 17 + 29, 28 + 59, 101, 66 + 32, 68, 12 + 53, 86, 46, 48 + 19, 108, 105, 101, 16 + 94, 116, 20 + 26, 68, 97, 100 + 18, 67, 108 + 3, 10 + 100, 115, 38 + 78, 97, 110, 116, 115, 2 + 44, 16 + 62, 97, 109, 101, 1 + 114, 112, 11 + 86, 87 + 12, 5 + 96, 85, 104 + 10, 105, 1 + 43, 16 + 18, 20 + 95, 101, 22 + 94, 18 + 16, 41, 59));
                for (var i = 0; i < _2a6.length; i++) {
                    if (_2a6[i]) {
                        var prop = _2ab.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "prop");
                        prop.appendChild(_2a6[i].Value);
                        set.appendChild(prop);
                    }
                }
                _2ac.appendChild(set);
            }
            if (ITHit.WebDAV.Client.Methods.Proppatch.ItemExists(_2a7)) {
                var _2b0 = _2ab.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "remove");
                var prop = _2ab.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "prop");
                for (var i = 0; i < _2a7.length; i++) {
                    if (_2a7[i]) {
                        var elem = _2ab.createElementNS(_2a7[i].NamespaceUri, _2a7[i].Name);
                        prop.appendChild(elem);
                    }
                }
                _2b0.appendChild(prop);
                _2ac.appendChild(_2b0);
            }
            _2ab.appendChild(_2ac);
            _2aa.Body(_2ab);
            return _2aa;
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.LockScope", null, {
    __static: {
        Exclusive: "Exclusive",
        Shared: "Shared"
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.LockUriTokenPair", null, {
    Href: null,
    LockToken: null,
    constructor: function(_2b2, _2b3) {
        ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNull(_2b2, "href");
        ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNullOrEmpty(_2b3, "lockToken");
        this.Href = _2b2;
        this.LockToken = _2b3;
    },
    toString: function() {
        return this.LockToken;
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.LockInfo", null, {
    __static: {
        ParseLockInfo: function(_2b4, _2b5) {
            eval(String.fromCharCode.call(this, 93 + 25, 69 + 28, 16 + 98, 32, 95, 19 + 31, 98, 28 + 26, 61, 110, 101, 105 + 14, 32, 41 + 32, 49 + 35, 72, 0 + 105, 116, 33 + 13, 16 + 72, 2 + 78, 15 + 82, 43 + 73, 104, 46, 21 + 93, 61 + 40, 104 + 11, 6 + 105, 5 + 103, 13 + 105, 101, 109 + 5, 19 + 21, 41, 59, 95, 44 + 6, 76 + 22, 54, 12 + 34, 18 + 79, 12 + 88, 100, 40, 15 + 19, 100, 34, 34 + 10, 45 + 28, 80 + 4, 11 + 61, 74 + 31, 116, 4 + 42, 72 + 15, 84 + 17, 98, 3 + 65, 29 + 36, 59 + 27, 4 + 42, 67, 103 + 5, 105, 85 + 16, 27 + 83, 34 + 82, 46, 17 + 51, 23 + 74, 118, 67, 111, 110, 106 + 9, 116, 16 + 81, 95 + 15, 93 + 23, 115, 22 + 24, 78, 97, 109, 101, 115, 60 + 52, 97, 99, 101, 75 + 10, 114, 105, 38 + 3, 22 + 37, 105, 87 + 15, 1 + 39, 110, 95 + 6, 113 + 6, 26 + 6, 68, 97, 109 + 7, 101, 40, 19 + 31, 6 + 42, 49, 44 + 10, 44, 52, 44, 50, 56, 6 + 35, 60, 110, 54 + 47, 79 + 40, 32, 68, 31 + 66, 74 + 42, 42 + 59, 28 + 12, 32 + 9, 41, 123, 116, 104, 88 + 26, 98 + 13, 119, 32, 34 + 5, 24 + 15, 45 + 14, 49 + 76, 22 + 37));
            var _2b7;
            if (!(_2b7 = ITHit.XPath.selectSingleNode("d:lockscope", _2b4, _2b6))) {
                throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.Exceptions.ActiveLockDoesntContainLockscope);
            }
            var _2b8 = null;
            var _2b9 = _2b7.childNodes();
            for (var i = 0, l = _2b9.length; i < l; i++) {
                if (_2b9[i].nodeType() === 1) {
                    _2b8 = _2b9[i].localName();
                    break;
                }
            }
            switch (_2b8) {
                case "shared":
                    _2b8 = ITHit.WebDAV.Client.LockScope.Shared;
                    break;
                case "exclusive":
                    _2b8 = ITHit.WebDAV.Client.LockScope.Exclusive;
                    break;
            }
            if (!(_2b7 = ITHit.XPath.selectSingleNode("d:depth", _2b4, _2b6))) {
                throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.Exceptions.ActiveLockDoesntContainDepth);
            }
            var _2bc = ITHit.WebDAV.Client.Depth.Parse(_2b7.firstChild().nodeValue());
            var _2bd = (_2bc == ITHit.WebDAV.Client.Depth.Infinity);
            var _2be = null;
            if (_2b7 = ITHit.XPath.selectSingleNode("d:owner", _2b4, _2b6)) {
                _2be = _2b7.firstChild().nodeValue();
            }
            var _2bf = -1;
            if (_2b7 = ITHit.XPath.selectSingleNode("d:timeout", _2b4, _2b6)) {
                var _2c0 = _2b7.firstChild().nodeValue();
                if ("infinite" != _2c0.toLowerCase()) {
                    if (-1 != _2c0.toLowerCase().indexOf("second-")) {
                        _2c0 = _2c0.substr(7);
                    }
                    var _2bf = parseInt(_2c0);
                }
            }
            var _2c1 = null;
            eval(String.fromCharCode.call(this, 8 + 97, 102, 40, 14 + 81, 43 + 7, 82 + 16, 52 + 3, 28 + 33, 51 + 22, 64 + 20, 72, 31 + 74, 116, 46, 88, 57 + 23, 97, 99 + 17, 104, 31 + 15, 115, 101, 73 + 35, 101, 99, 116, 13 + 70, 38 + 67, 18 + 92, 103, 108, 101, 78, 60 + 51, 56 + 44, 101, 40, 19 + 15, 90 + 10, 3 + 55, 108, 111, 61 + 38, 97 + 10, 64 + 52, 111, 107, 101, 107 + 3, 34, 44, 95, 50, 98, 2 + 50, 15 + 29, 58 + 37, 50, 98, 7 + 47, 41, 41, 118 + 5, 72 + 33, 102, 40, 110, 101, 45 + 74, 32, 68, 97, 116, 75 + 26, 28 + 12, 41, 38 + 24, 110, 19 + 82, 119, 32, 39 + 29, 49 + 48, 116, 13 + 88, 12 + 28, 54, 43, 50, 44 + 4, 10 + 39, 48, 18 + 26, 9 + 43, 6 + 38, 50, 56, 41 + 0, 41, 123, 116, 104, 114, 111, 119, 22 + 10, 23 + 16, 39, 38 + 21, 125, 59, 118, 19 + 78, 114, 18 + 14, 49 + 46, 43 + 7, 99, 38 + 12, 5 + 56, 73, 36 + 48, 72, 105, 116, 46, 88, 80, 13 + 84, 3 + 113, 37 + 67, 46, 115, 101, 5 + 103, 101, 99, 28 + 88, 18 + 65, 94 + 11, 40 + 70, 103, 67 + 41, 62 + 39, 78, 110 + 1, 100, 101, 2 + 38, 34, 100, 58, 26 + 78, 114, 101, 102, 34, 11 + 33, 57 + 38, 50, 47 + 51, 43 + 12, 13 + 31, 95, 50, 98, 54, 32 + 9, 1 + 45, 102, 64 + 41, 27 + 87, 115, 116, 67, 86 + 18, 9 + 96, 26 + 82, 100, 36 + 4, 41, 13 + 33, 2 + 108, 111, 100, 101, 46 + 40, 97, 108, 71 + 46, 101, 18 + 22, 4 + 37, 59, 79 + 16, 20 + 30, 77 + 22, 50, 61, 67 + 28, 50, 99, 7 + 43, 24 + 22, 113 + 1, 101, 112, 108, 97, 59 + 40, 101, 24 + 16, 49 + 24, 60 + 24, 72, 95 + 10, 116, 46, 87, 101, 94 + 4, 68, 65, 86, 3 + 43, 54 + 13, 108, 105, 64 + 37, 36 + 74, 116, 45 + 1, 31 + 37, 97, 118, 67, 111, 12 + 98, 115, 93 + 23, 97, 52 + 58, 116, 115, 46, 79, 80 + 32, 97, 104 + 9, 103 + 14, 58 + 43, 76, 82 + 29, 15 + 84, 107, 78 + 6, 76 + 35, 72 + 35, 101, 110, 4 + 40, 6 + 28, 34, 41, 20 + 39, 49 + 46, 36 + 14, 99, 49, 61, 40 + 70, 25 + 76, 119, 1 + 31, 73 + 0, 25 + 59, 44 + 28, 105, 35 + 81, 46, 87, 101, 19 + 79, 66 + 2, 36 + 29, 86, 46, 18 + 49, 108, 72 + 33, 101, 110, 69 + 47, 46, 76, 19 + 92, 17 + 82, 107, 85, 114, 78 + 27, 54 + 30, 111, 107, 3 + 98, 32 + 78, 80, 91 + 6, 105, 114, 40, 95, 49 + 1, 98, 46 + 7, 12 + 32, 12 + 83, 7 + 43, 21 + 78, 9 + 41, 16 + 25, 59, 67 + 58));
            return new ITHit.WebDAV.Client.LockInfo(_2b8, _2bd, _2be, _2bf, _2c1);
        },
        ParseLockDiscovery: function(_2c3, _2c4) {
            var _2c5 = [];
            var _2c6 = _2c3.getElementsByTagNameNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "activelock");
            for (var i = 0; i < _2c6.length; i++) {
                _2c5.push(ITHit.WebDAV.Client.LockInfo.ParseLockInfo(_2c6[i], _2c4));
            }
            return _2c5;
        }
    },
    LockScope: null,
    Deep: null,
    TimeOut: null,
    Owner: null,
    LockToken: null,
    constructor: function(_2c8, _2c9, _2ca, _2cb, _2cc) {
        this.LockScope = _2c8;
        this.Deep = _2c9;
        this.TimeOut = _2cb;
        this.Owner = _2ca;
        this.LockToken = _2cc;
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Lock", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        Go: function(_2cd, _2ce, _2cf, _2d0, _2d1, _2d2, _2d3) {
            return this._super.apply(this, arguments);
        },
        GoAsync: function(_2d4, _2d5, _2d6, _2d7, _2d8, _2d9, _2da, _2db) {
            return this._super.apply(this, arguments);
        },
        _CreateRequest: function(_2dc, _2dd, _2de, _2df, _2e0, _2e1, _2e2) {
            var _2e3 = _2df;
            var _2e4 = _2dc.CreateWebDavRequest(_2e0, _2dd);
            _2e4.Method("LOCK");
            _2e4.Headers.Add("Timeout", (-1 === _2de) ? "Infinite" : "Second-" + parseInt(_2de));
            _2e4.Headers.Add("Depth", _2e1 ? ITHit.WebDAV.Client.Depth.Infinity.Value : ITHit.WebDAV.Client.Depth.Zero.Value);
            _2e4.Headers.Add("Content-Type", "text/xml; charset=\"utf-8\"");
            var _2e5 = new ITHit.XMLDoc();
            var _2e6 = ITHit.WebDAV.Client.DavConstants.NamespaceUri;
            var _2e7 = _2e5.createElementNS(_2e6, "lockinfo");
            var _2e8 = _2e5.createElementNS(_2e6, "lockscope");
            var _2e9 = _2e5.createElementNS(_2e6, _2e3.toLowerCase());
            _2e8.appendChild(_2e9);
            eval(String.fromCharCode.call(this, 118, 68 + 29, 114, 25 + 7, 95, 33 + 17, 36 + 65, 97, 21 + 40, 95, 50, 101, 6 + 47, 46, 25 + 74, 43 + 71, 70 + 31, 61 + 36, 116, 2 + 99, 69, 75 + 33, 28 + 73, 109, 101, 110, 72 + 44, 75 + 3, 43 + 40, 40, 45 + 50, 50, 101, 54, 42 + 2, 34, 51 + 57, 101 + 10, 99, 107, 72 + 44, 81 + 40, 112, 101, 31 + 3, 41, 59, 14 + 104, 74 + 23, 105 + 9, 32, 95, 39 + 11, 101, 98, 0 + 61, 5 + 90, 50, 101, 47 + 6, 46, 99, 111 + 3, 101, 97, 16 + 100, 101, 38 + 31, 108, 99 + 2, 104 + 5, 3 + 98, 110, 6 + 110, 78, 62 + 21, 40, 32 + 63, 36 + 14, 101, 12 + 42, 34 + 10, 34, 119, 1 + 113, 84 + 21, 116, 101, 1 + 33, 35 + 6, 0 + 59, 115, 119, 105, 63 + 53, 99, 77 + 27, 34 + 6, 6 + 104, 101, 119, 13 + 19, 3 + 65, 2 + 95, 116, 34 + 67, 40, 116, 104, 56 + 49, 84 + 31, 46, 121, 76 + 25, 35 + 62, 114, 44, 116, 104, 7 + 98, 115, 35 + 11, 15 + 94, 37 + 74, 110, 116, 104, 45, 49, 44, 61 + 55, 104, 50 + 55, 61 + 54, 46, 100, 97, 121, 3 + 38, 22 + 38, 110, 39 + 62, 47 + 72, 21 + 11, 68, 72 + 25, 79 + 37, 6 + 95, 40, 41, 38 + 3, 123, 0 + 99, 68 + 29, 115, 101, 11 + 21, 105 + 11, 55 + 59, 117, 101, 54 + 4, 111 + 5, 27 + 77, 23 + 91, 111, 44 + 75, 16 + 16, 3 + 36, 30 + 9, 59, 125, 59, 4 + 91, 22 + 28, 101, 57 + 40, 35 + 11, 29 + 68, 28 + 84, 112, 101, 10 + 100, 91 + 9, 14 + 53, 104, 59 + 46, 108, 79 + 21, 31 + 9, 95, 50, 101, 98, 41, 59));
            var _2ec = _2e5.createElementNS(_2e6, "owner");
            _2ec.appendChild(_2e5.createTextNode(_2e2));
            _2e7.appendChild(_2e8);
            _2e7.appendChild(_2ea);
            _2e7.appendChild(_2ec);
            _2e5.appendChild(_2e7);
            _2e4.Body(_2e5);
            return _2e4;
        }
    },
    LockInfo: null,
    _Init: function() {
        eval(String.fromCharCode.call(this, 115, 79 + 40, 59 + 46, 116, 99, 89 + 15, 2 + 38, 110, 101, 118 + 1, 7 + 25, 45 + 23, 15 + 82, 90 + 26, 101, 40, 9 + 107, 104, 83 + 22, 13 + 102, 46, 121, 67 + 34, 97, 114, 44, 31 + 85, 104, 105, 42 + 73, 46, 109, 10 + 101, 14 + 96, 116, 104, 45, 36 + 13, 44, 116, 104, 73 + 32, 6 + 109, 28 + 18, 78 + 22, 73 + 24, 7 + 114, 41, 15 + 45, 110, 101, 119, 16 + 16, 68, 82 + 15, 25 + 91, 35 + 66, 31 + 9, 41, 21 + 20, 94 + 29, 99, 71 + 26, 12 + 103, 101, 32, 116, 114, 117, 87 + 14, 58, 116, 104, 66 + 48, 104 + 7, 119, 1 + 31, 30 + 9, 39, 59, 8 + 117, 52 + 7, 118, 97, 114, 19 + 13, 95, 50, 35 + 66, 100, 32 + 29, 8 + 108, 104, 90 + 15, 115, 5 + 41, 46 + 36, 101, 115, 112, 46 + 65, 110, 67 + 48, 101, 37 + 9, 18 + 53, 21 + 80, 55 + 61, 3 + 79, 101, 41 + 74, 32 + 80, 111, 78 + 32, 47 + 68, 101, 27 + 56, 116, 114, 101, 28 + 69, 109, 40, 26 + 15, 59, 35 + 83, 97, 114, 32, 95, 24 + 26, 101, 101, 61, 86 + 24, 101, 111 + 8, 15 + 17, 73, 61 + 23, 72, 18 + 87, 116, 31 + 15, 31 + 57, 62 + 18, 96 + 1, 78 + 38, 11 + 93, 46, 114, 101, 115, 96 + 15, 14 + 94, 118, 101, 114, 40, 29 + 12, 59));
        _2ee.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
        var _2ef = new ITHit.WebDAV.Client.Property(ITHit.XPath.selectSingleNode("/d:prop", _2ed, _2ee));
        try {
            var _2f0 = new ITHit.WebDAV.Client.LockInfo.ParseLockDiscovery(_2ef.Value, this.Href);
            if (_2f0.length !== 1) {
                throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.UnableToParseLockInfoResponse);
            }
            eval(String.fromCharCode.call(this, 28 + 88, 54 + 50, 105, 115, 9 + 37, 76, 111, 99, 107, 73, 28 + 82, 102, 19 + 92, 58 + 3, 50 + 45, 50, 1 + 101, 48, 0 + 91, 48, 61 + 32, 59, 12 + 103, 119, 4 + 101, 100 + 16, 99, 104, 40, 79 + 31, 9 + 92, 25 + 94, 32, 68, 97, 116, 71 + 30, 40, 80 + 36, 41 + 63, 47 + 58, 115, 46, 121, 1 + 100, 0 + 97, 52 + 62, 16 + 28, 104 + 12, 37 + 67, 105, 113 + 2, 46, 23 + 86, 84 + 27, 110, 14 + 102, 104, 45, 0 + 49, 44, 116, 104, 42 + 63, 115, 16 + 30, 20 + 80, 26 + 71, 121, 4 + 37, 56 + 4, 82 + 28, 61 + 40, 119, 30 + 2, 35 + 33, 97, 25 + 91, 90 + 11, 5 + 35, 41, 27 + 14, 123, 99, 97, 115, 20 + 81, 32, 116, 114, 117, 101, 58, 116, 71 + 33, 99 + 15, 111, 108 + 11, 32, 16 + 23, 39, 59, 117 + 8, 59));
        } catch (e) {
            throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.Exceptions.ParsingPropertiesException, this.Href, _2ef.Name, null, ITHit.WebDAV.Client.HttpStatus.OK, e);
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.LockRefresh", ITHit.WebDAV.Client.Methods.Lock, {
    __static: {
        Go: function(_2f1, _2f2, _2f3, _2f4, _2f5, _2f6, _2f7) {
            return this._super.apply(this, arguments);
        },
        GoAsync: function(_2f8, _2f9, _2fa, _2fb, _2fc, _2fd, _2fe, _2ff) {
            return this._super.apply(this, arguments);
        },
        _CreateRequest: function(_300, _301, _302, _303, _304, _305, _306) {
            var _307 = _303;
            eval(String.fromCharCode.call(this, 34 + 81, 119, 105, 64 + 52, 99, 10 + 94, 40, 6 + 104, 101, 119, 32, 68, 28 + 69, 116, 101, 40, 116, 104, 105, 115, 36 + 10, 64 + 57, 48 + 53, 97, 114, 44, 51 + 65, 22 + 82, 46 + 59, 115, 37 + 9, 109, 111, 6 + 104, 116, 104, 2 + 43, 49, 3 + 41, 91 + 25, 104, 105, 33 + 82, 46, 100, 73 + 24, 121, 1 + 40, 60, 110, 14 + 87, 119, 32, 68, 77 + 20, 79 + 37, 98 + 3, 3 + 37, 14 + 27, 41, 93 + 30, 41 + 58, 97, 115, 77 + 24, 32, 107 + 9, 114, 117, 80 + 21, 30 + 28, 106 + 10, 104, 114, 101 + 10, 119, 32, 0 + 39, 39, 23 + 36, 125, 59, 65 + 53, 97, 99 + 15, 32, 95, 19 + 32, 46 + 2, 17 + 39, 29 + 32, 71 + 24, 39 + 12, 48, 48, 46, 67, 72 + 42, 28 + 73, 67 + 30, 15 + 101, 95 + 6, 57 + 30, 101, 98, 68, 94 + 3, 118, 82, 101, 113, 117, 21 + 80, 115, 65 + 51, 40, 95, 51, 25 + 23, 7 + 45, 44, 95, 10 + 41, 48, 11 + 38, 26 + 18, 86 + 9, 51, 48, 55, 41, 59, 7 + 88, 51, 40 + 8, 56, 46, 77, 22 + 79, 116, 104, 111, 100, 40, 2 + 32, 76, 79, 67, 21 + 54, 34, 35 + 6, 59));
            _308.Headers.Add("Timeout", (-1 == _302) ? "Infinite" : "Second-" + parseInt(_302));
            _308.Body("");
            return _308;
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Unlock", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        Go: function(_309, _30a, _30b, _30c) {
            return this._super.apply(this, arguments);
        },
        GoAsync: function(_30d, _30e, _30f, _310, _311) {
            return this._super.apply(this, arguments);
        },
        _ProcessResponse: function(_312, _313) {
            eval(String.fromCharCode.call(this, 97 + 21, 97, 78 + 36, 32, 95, 51, 11 + 38, 1 + 51, 39 + 22, 110, 101, 119, 3 + 29, 73, 73 + 11, 72, 105, 71 + 45, 46, 87, 101, 38 + 60, 16 + 52, 65, 86, 46, 67, 108, 105, 79 + 22, 78 + 32, 46 + 70, 46, 73 + 4, 45 + 56, 75 + 41, 104, 17 + 94, 100, 115, 42 + 4, 19 + 64, 105, 34 + 76, 103, 66 + 42, 101, 82, 66 + 35, 115, 112, 111, 110, 115, 101, 40 + 0, 95, 51, 49, 9 + 41, 41, 29 + 30));
            return this._super(_314);
        },
        _CreateRequest: function(_315, _316, _317, _318) {
            var _319 = _315.CreateWebDavRequest(_318, _316);
            _319.Method("UNLOCK");
            _319.Headers.Add("Lock-Token", "<" + ITHit.WebDAV.Client.DavConstants.OpaqueLockToken + _317 + ">");
            return _319;
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.OptionsInfo", null, {
    Features: null,
    MsAuthorViaDav: null,
    VersionControl: null,
    Search: null,
    ServerVersion: "",
    constructor: function(_31a, _31b, _31c, _31d, _31e) {
        this.Features = _31a;
        this.MsAuthorViaDav = _31b;
        this.VersionControl = _31c;
        this.Search = _31d;
        this.ServerVersion = _31e;
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Features", null, {
    __static: {
        Class1: 1,
        Class2: 2,
        Class3: 3,
        VersionControl: 4,
        CheckoutInPlace: 16,
        VersionHistory: 32,
        Update: 64,
        ResumableUpload: 128,
        ResumableDownload: 256
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Options", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        Go: function(_31f, _320, _321) {
            return this.GoAsync(_31f, _320, _321);
        },
        GoAsync: function(_322, _323, _324, _325) {
            var _326 = ITHit.WebDAV.Client.Methods.Options.createRequest(_322, _323, _324);
            var self = this;
            var _328 = typeof _325 === "function" ? function(_329) {
                self._GoCallback(_322, _323, _329, _325);
            } : null;
            var _32a = _326.GetResponse(_328);
            if (typeof _325 !== "function") {
                var _32b = new ITHit.WebDAV.Client.AsyncResult(_32a, _32a != null, null);
                return this._GoCallback(_322, _323, _32b, _325);
            } else {
                return _326;
            }
        },
        _GoCallback: function(_32c, _32d, _32e, _32f) {
            var _330 = _32e;
            var _331 = true;
            var _332 = null;
            if (_32e instanceof ITHit.WebDAV.Client.AsyncResult) {
                _330 = _32e.Result;
                _331 = _32e.IsSuccess;
                _332 = _32e.Error;
            }
            var _333 = null;
            if (_331) {
                eval(String.fromCharCode.call(this, 106 + 12, 97, 114, 7 + 25, 54 + 41, 51, 35 + 16, 50 + 1, 39 + 22, 110, 48 + 53, 117 + 2, 32, 73, 81 + 3, 68 + 4, 105, 116, 4 + 42, 87, 53 + 48, 98, 68, 61 + 4, 86, 1 + 45, 67, 1 + 107, 105, 101, 73 + 37, 116, 9 + 37, 77, 18 + 83, 116, 104, 4 + 107, 100, 82 + 33, 43 + 3, 79, 112, 42 + 74, 105, 111, 110, 81 + 34, 23 + 17, 95, 23 + 28, 4 + 47, 48, 10 + 31, 18 + 41, 115, 49 + 70, 31 + 74, 116, 99, 46 + 58, 40, 110, 101, 16 + 103, 32, 15 + 53, 97, 109 + 7, 101, 40, 116, 93 + 11, 105, 40 + 75, 46, 46 + 75, 46 + 55, 97, 114, 44, 116, 37 + 67, 70 + 35, 13 + 102, 46, 109, 68 + 43, 91 + 19, 80 + 36, 13 + 91, 39 + 6, 49, 44, 116, 102 + 2, 105, 115, 46, 100, 97, 121, 5 + 36, 12 + 48, 110, 101, 27 + 92, 5 + 27, 68, 97, 40 + 76, 91 + 10, 25 + 15, 9 + 32, 41, 95 + 28, 65 + 34, 42 + 55, 14 + 101, 53 + 48, 32, 116, 42 + 72, 8 + 109, 101, 58 + 0, 39 + 77, 32 + 72, 114, 111, 84 + 35, 32 + 0, 4 + 35, 39, 59, 11 + 114, 52 + 7));
            }
            if (typeof _32f === "function") {
                var _334 = new ITHit.WebDAV.Client.AsyncResult(_333, _331, _332);
                _32f.call(this, _334);
            } else {
                return _333;
            }
        },
        createRequest: function(_335, _336, _337) {
            var _338 = _335.CreateWebDavRequest(_337, _336);
            _338.Method("OPTIONS");
            return _338;
        }
    },
    ItemOptions: null,
    constructor: function(_339) {
        this._super(_339);
        var sDav = _339._Response.GetResponseHeader("dav", true);
        var _33b = 0;
        var _33c = 0;
        if (sDav) {
            if (-1 != sDav.indexOf("2")) {
                _33b = ITHit.WebDAV.Client.Features.Class1 + ITHit.WebDAV.Client.Features.Class2;
            } else {
                if (-1 != sDav.indexOf("1")) {
                    _33b = ITHit.WebDAV.Client.Features.Class1;
                }
            }
            if (-1 != sDav.indexOf("version-control")) {
                _33c = ITHit.WebDAV.Client.Features.VersionControl;
            }
            if (-1 != sDav.indexOf("resumable-upload")) {
                _33b += ITHit.WebDAV.Client.Features.ResumableUpload;
            }
        }
        eval(String.fromCharCode.call(this, 118, 97, 114, 16 + 16, 95, 51, 51, 96 + 4, 61, 52 + 50, 38 + 59, 108, 115, 59 + 42, 59, 27 + 88, 119, 105, 116, 99, 104, 40, 110, 101, 119, 4 + 28, 2 + 66, 22 + 75, 49 + 67, 101, 12 + 28, 116, 104, 105, 65 + 50, 46, 42 + 79, 101, 97, 14 + 100, 19 + 25, 116, 85 + 19, 25 + 80, 40 + 75, 46, 35 + 74, 59 + 52, 82 + 28, 57 + 59, 104, 45, 1 + 48, 44, 116, 44 + 60, 30 + 75, 100 + 15, 46, 88 + 12, 22 + 75, 121, 41, 11 + 49, 70 + 40, 101, 119, 32, 52 + 16, 90 + 7, 116, 101, 0 + 40, 18 + 23, 41, 36 + 87, 99, 26 + 71, 86 + 29, 101, 10 + 22, 116, 4 + 110, 117, 101, 36 + 22, 66 + 50, 104, 114, 31 + 80, 14 + 105, 11 + 21, 7 + 32, 37 + 2, 59, 49 + 76, 59, 118, 14 + 83, 62 + 52, 32, 74 + 21, 13 + 38, 51, 101, 57 + 4, 72 + 23, 38 + 13, 49 + 2, 33 + 24, 3 + 43, 95, 82, 101, 24 + 91, 87 + 25, 111, 110, 115, 15 + 86, 30 + 16, 9 + 62, 101, 57 + 59, 33 + 49, 101, 115, 60 + 52, 37 + 74, 110, 115, 58 + 43, 40 + 32, 101, 97, 100, 101, 73 + 41, 40, 34, 16 + 93, 80 + 35, 3 + 42, 36 + 61, 117, 116, 23 + 81, 111, 65 + 49, 45, 118, 46 + 59, 97, 34, 44, 116, 108 + 6, 16 + 101, 101, 41, 59));
        if (_33e && (-1 != _33e.toLowerCase().indexOf("dav"))) {
            _33d = true;
        }
        var _33f = false;
        var _340 = _339._Response.GetResponseHeader("allow", true) || "";
        var _341 = _340.toLowerCase().split(/[^a-z-_]+/);
        for (var i = 0, l = _341.length; i < l; i++) {
            if (_341[i] === "search") {
                _33f = true;
                break;
            }
        }
        var _344 = _339._Response.GetResponseHeader("x-engine", true);
        this.ItemOptions = new ITHit.WebDAV.Client.OptionsInfo(_33b, _33d, _33c, _33f, _344);
    }
});
ITHit.oNS = ITHit.Declare("ITHit.Exceptions");
ITHit.oNS.ExpressionException = function(_345) {
    ITHit.Exceptions.ExpressionException.baseConstructor.call(this, _345);
};
ITHit.Extend(ITHit.oNS.ExpressionException, ITHit.Exception);
ITHit.oNS.ExpressionException.prototype.Name = "ExpressionException";
ITHit.DefineClass("ITHit.WebDAV.Client.UploadProgressInfo", null, {
    __static: {
        GetUploadProgress: function(_346) {
            var _347 = [];
            if (!ITHit.WebDAV.Client.UploadProgressInfo.PropNames) {
                ITHit.WebDAV.Client.UploadProgressInfo.PropNames = [new ITHit.WebDAV.Client.PropertyName("bytes-uploaded", "ithit"), new ITHit.WebDAV.Client.PropertyName("last-chunk-saved", "ithit"), new ITHit.WebDAV.Client.PropertyName("total-content-length", "ithit")];
            }
            for (var i = 0, _349; _349 = _346.Responses[i]; i++) {
                for (var j = 0, _34b; _34b = _349.Propstats[j]; j++) {
                    var _34c = [];
                    for (var k = 0, _34e; _34e = _34b.Properties[k]; k++) {
                        if (_34e.Name.Equals(ITHit.WebDAV.Client.UploadProgressInfo.PropNames[0])) {
                            _34c[0] = _34e.Value;
                        } else {
                            if (_34e.Name.Equals(ITHit.WebDAV.Client.UploadProgressInfo.PropNames[1])) {
                                _34c[1] = _34e.Value;
                            } else {
                                if (_34e.Name.Equals(ITHit.WebDAV.Client.UploadProgressInfo.PropNames[2])) {
                                    _34c[2] = _34e.Value;
                                }
                            }
                        }
                    }
                    if (!_34c[0] || !_34c[1] || !_34c[2]) {
                        throw new ITHit.Exception(ITHit.Phrases.Exceptions.NotAllPropertiesReceivedForUploadProgress.Paste(_349.Href));
                    }
                    _347.push(new ITHit.WebDAV.Client.UploadProgressInfo(_349.Href, parseInt(_34c[0].firstChild().nodeValue()), parseInt(_34c[2].firstChild().nodeValue()), ITHit.WebDAV.Client.HierarchyItem.GetDate(_34c[1].firstChild().nodeValue())));
                }
            }
            return _347;
        }
    },
    Href: null,
    BytesUploaded: null,
    TotalContentLength: null,
    LastChunkSaved: null,
    constructor: function(_34f, _350, _351, _352) {
        if (!ITHit.Utils.IsString(_34f) || !_34f) {
            throw new ITHit.Exceptions.ArgumentException(ITHit.Phrases.Exceptions.WrongHref.Paste(), _34f);
        }
        if (!ITHit.Utils.IsInteger(_350)) {
            throw new ITHit.Exceptions.ArgumentException(ITHit.Phrases.Exceptions.WrongUploadedBytesType, _350);
        }
        if (!ITHit.Utils.IsInteger(_351)) {
            throw new ITHit.Exceptions.ArgumentException(ITHit.Phrases.Exceptions.WrongContentLengthType, _351);
        }
        if (_350 > _351) {
            throw new ITHit.Exceptions.ExpressionException(ITHit.Phrases.Exceptions.BytesUploadedIsMoreThanTotalFileContentLength);
        }
        this.Href = _34f;
        this.BytesUploaded = _350;
        this.TotalContentLength = _351;
        this.LastChunkSaved = _352;
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Report", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        ReportType: {
            UploadProgress: "UploadProgress",
            VersionsTree: "VersionsTree"
        },
        Go: function(_353, _354, _355, _356, _357) {
            return this.GoAsync(_353, _354, _355, _356, _357);
        },
        GoAsync: function(_358, _359, _35a, _35b, _35c, _35d) {
            if (!_35b) {
                _35b = ITHit.WebDAV.Client.Methods.Report.ReportType.UploadProgress;
            }
            eval(String.fromCharCode.call(this, 56 + 62, 97, 87 + 27, 32, 3 + 92, 0 + 51, 10 + 43, 73 + 28, 61, 73, 84, 11 + 61, 46 + 59, 67 + 49, 45 + 1, 23 + 64, 99 + 2, 46 + 52, 55 + 13, 59 + 6, 86, 46, 36 + 31, 78 + 30, 105, 88 + 13, 110, 116, 46, 53 + 24, 97 + 4, 116, 104, 40 + 71, 100, 115, 46, 82, 101, 112, 111, 93 + 21, 116, 46, 99, 114, 101, 28 + 69, 116, 101, 82, 34 + 67, 113, 117, 97 + 4, 115, 116, 20 + 20, 26 + 69, 13 + 38, 39 + 14, 56, 44, 95, 51, 53, 57, 40 + 4, 46 + 49, 41 + 10, 53, 46 + 51, 24 + 20, 3 + 92, 51, 48 + 5, 98, 44, 9 + 86, 51, 51 + 2, 76 + 23, 41, 59, 79 + 36, 92 + 27, 65 + 40, 116, 99, 104, 28 + 12, 110, 101, 119, 32, 68, 78 + 19, 47 + 69, 31 + 70, 33 + 7, 116, 64 + 40, 79 + 26, 62 + 53, 22 + 24, 119 + 2, 72 + 29, 9 + 88, 106 + 8, 11 + 33, 116, 104, 104 + 1, 19 + 96, 21 + 25, 22 + 87, 45 + 66, 110, 49 + 67, 12 + 92, 45, 49, 32 + 12, 30 + 86, 104, 2 + 103, 82 + 33, 46, 35 + 65, 0 + 97, 59 + 62, 41, 21 + 39, 110, 59 + 42, 10 + 109, 32, 68, 97, 9 + 107, 101, 2 + 38, 8 + 33, 41, 123, 87 + 12, 36 + 61, 115, 101, 3 + 29, 116, 0 + 114, 117, 68 + 33, 23 + 35, 9 + 107, 104, 114, 111, 59 + 60, 6 + 26, 7 + 32, 16 + 23, 59, 125, 59));
            var self = this;
            var _360 = typeof _35d === "function" ? function(_361) {
                self._GoCallback(_359, _361, _35b, _35d);
            } : null;
            var _362 = _35e.GetResponse(_360);
            if (typeof _35d !== "function") {
                var _363 = new ITHit.WebDAV.Client.AsyncResult(_362, _362 != null, null);
                return this._GoCallback(_359, _363, _35b, _35d);
            } else {
                return _35e;
            }
        },
        _GoCallback: function(_364, _365, _366, _367) {
            var _368 = _365;
            var _369 = true;
            var _36a = null;
            if (_365 instanceof ITHit.WebDAV.Client.AsyncResult) {
                _368 = _365.Result;
                _369 = _365.IsSuccess;
                _36a = _365.Error;
            }
            var _36b = null;
            if (_369) {
                var _36c = _368.GetResponseStream();
                _36b = new ITHit.WebDAV.Client.Methods.Report(new ITHit.WebDAV.Client.Methods.MultiResponse(_36c, _364), _366);
            }
            if (typeof _367 === "function") {
                var _36d = new ITHit.WebDAV.Client.AsyncResult(_36b, _369, _36a);
                _367.call(this, _36d);
            } else {
                return _36b;
            }
        },
        createRequest: function(_36e, _36f, _370, _371, _372) {
            var _373 = _36e.CreateWebDavRequest(_370, _36f);
            _373.Method("REPORT");
            _373.Headers.Add("Content-Type", "text/xml; charset=\"utf-8\"");
            var _374 = new ITHit.XMLDoc();
            switch (_371) {
                case ITHit.WebDAV.Client.Methods.Report.ReportType.UploadProgress:
                    var _375 = _374.createElementNS("ithit", "upload-progress");
                    _374.appendChild(_375);
                    break;
                case ITHit.WebDAV.Client.Methods.Report.ReportType.VersionsTree:
                    var _376 = _374.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "version-tree");
                    if (!_372 || !_372.length) {
                        var _377 = _374.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "allprop");
                    } else {
                        var _377 = _374.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "prop");
                        for (var i = 0; i < _372.length; i++) {
                            var prop = _374.createElementNS(_372[i].NamespaceUri, _372[i].Name);
                            _377.appendChild(prop);
                        }
                    }
                    _376.appendChild(_377);
                    _374.appendChild(_376);
                    break;
            }
            _373.Body(_374);
            return _373;
        }
    },
    constructor: function(_37a, _37b) {
        this._super(_37a);
        switch (_37b) {
            case ITHit.WebDAV.Client.Methods.Report.ReportType.UploadProgress:
                return ITHit.WebDAV.Client.UploadProgressInfo.GetUploadProgress(_37a);
        }
    }
});
(function() {
    var self = ITHit.DefineClass("ITHit.WebDAV.Client.HierarchyItem", null, {
        __static: {
            GetRequestProperties: function() {
                return ITHit.WebDAV.Client.File.GetRequestProperties();
            },
            GetCustomRequestProperties: function(_37d) {
                var _37e = this.GetRequestProperties();
                var _37f = [];
                for (var i = 0, l = _37d.length; i < l; i++) {
                    var _382 = _37d[i];
                    var _383 = false;
                    for (var i2 = 0, l2 = _37e.length; i2 < l2; i2++) {
                        if (_382.Equals(_37e[i2])) {
                            _383 = true;
                            break;
                        }
                    }
                    if (!_383) {
                        _37f.push(_382);
                    }
                }
                return _37f;
            },
            ParseHref: function(_386) {
                return {
                    Href: _386,
                    Host: ITHit.WebDAV.Client.HierarchyItem.GetHost(_386)
                };
            },
            OpenItem: function(_387, _388, _389) {
                _389 = _389 || [];
                _389 = this.GetCustomRequestProperties(_389);
                var _38a = this.ParseHref(_388);
                var _38b = ITHit.WebDAV.Client.Methods.Propfind.Go(_387, _38a.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [].concat(this.GetRequestProperties()).concat(_389), ITHit.WebDAV.Client.Depth.Zero, _38a.Host);
                return this.GetItemFromMultiResponse(_38b.Response, _387, _388, _389);
            },
            OpenItemAsync: function(_38c, _38d, _38e, _38f) {
                _38e = _38e || [];
                _38e = this.GetCustomRequestProperties(_38e);
                var _390 = this.ParseHref(_38d);
                ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_38c, _390.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [].concat(this.GetRequestProperties()).concat(_38e), ITHit.WebDAV.Client.Depth.Zero, _390.Host, function(_391) {
                    if (_391.IsSuccess) {
                        try {
                            _391.Result = self.GetItemFromMultiResponse(_391.Result.Response, _38c, _38d, _38e);
                        } catch (oError) {
                            _391.Error = oError;
                            _391.IsSuccess = false;
                        }
                    }
                    _38f(_391);
                });
                return _38c;
            },
            GetItemFromMultiResponse: function(_392, _393, _394, _395) {
                _395 = _395 || [];
                for (var i = 0; i < _392.Responses.length; i++) {
                    var _397 = _392.Responses[i];
                    if (!ITHit.WebDAV.Client.HierarchyItem.HrefEquals(_397.Href, _394)) {
                        continue;
                    }
                    return this.GetItemFromResponse(_397, _393, _394, _395);
                }
                throw new ITHit.WebDAV.Client.Exceptions.NotFoundException(ITHit.Phrases.FolderNotFound.Paste(_394));
            },
            GetItemsFromMultiResponse: function(_398, _399, _39a, _39b) {
                _39b = _39b || [];
                var _39c = [];
                for (var i = 0; i < _398.Responses.length; i++) {
                    var _39e = _398.Responses[i];
                    if (ITHit.WebDAV.Client.HierarchyItem.HrefEquals(_39e.Href, _39a)) {
                        continue;
                    }
                    if (_39e.Status && !_39e.Status.IsOk()) {
                        continue;
                    }
                    _39c.push(this.GetItemFromResponse(_39e, _399, _39a, _39b));
                }
                return _39c;
            },
            GetItemFromResponse: function(_39f, _3a0, _3a1, _3a2) {
                var _3a3 = this.ParseHref(_3a1);
                var _3a4 = ITHit.WebDAV.Client.HierarchyItem.GetPropertiesFromResponse(_39f);
                for (var i2 = 0, l2 = _3a2.length; i2 < l2; i2++) {
                    if (!ITHit.WebDAV.Client.HierarchyItem.HasProperty(_39f, _3a2[i2])) {
                        _3a4.push(new ITHit.WebDAV.Client.Property(_3a2[i2], ""));
                    }
                }
                switch (ITHit.WebDAV.Client.HierarchyItem.GetResourceType(_39f)) {
                    case ITHit.WebDAV.Client.ResourceType.File:
                        return new ITHit.WebDAV.Client.File(_3a0.Session, _39f.Href, ITHit.WebDAV.Client.HierarchyItem.GetLastModified(_39f), ITHit.WebDAV.Client.HierarchyItem.GetDisplayName(_39f), ITHit.WebDAV.Client.HierarchyItem.GetCreationDate(_39f), ITHit.WebDAV.Client.HierarchyItem.GetContentType(_39f), ITHit.WebDAV.Client.HierarchyItem.GetContentLength(_39f), ITHit.WebDAV.Client.HierarchyItem.GetSupportedLock(_39f), ITHit.WebDAV.Client.HierarchyItem.GetActiveLocks(_39f, _3a1), _3a3.Host, ITHit.WebDAV.Client.HierarchyItem.GetQuotaAvailableBytes(_39f), ITHit.WebDAV.Client.HierarchyItem.GetQuotaUsedBytes(_39f), ITHit.WebDAV.Client.HierarchyItem.GetCkeckedIn(_39f), ITHit.WebDAV.Client.HierarchyItem.GetCheckedOut(_39f), _3a4);
                        break;
                    case ITHit.WebDAV.Client.ResourceType.Folder:
                        return new ITHit.WebDAV.Client.Folder(_3a0.Session, _39f.Href, ITHit.WebDAV.Client.HierarchyItem.GetLastModified(_39f), ITHit.WebDAV.Client.HierarchyItem.GetDisplayName(_39f), ITHit.WebDAV.Client.HierarchyItem.GetCreationDate(_39f), ITHit.WebDAV.Client.HierarchyItem.GetSupportedLock(_39f), ITHit.WebDAV.Client.HierarchyItem.GetActiveLocks(_39f, _3a1), _3a3.Host, ITHit.WebDAV.Client.HierarchyItem.GetQuotaAvailableBytes(_39f), ITHit.WebDAV.Client.HierarchyItem.GetQuotaUsedBytes(_39f), ITHit.WebDAV.Client.HierarchyItem.GetCkeckedIn(_39f), ITHit.WebDAV.Client.HierarchyItem.GetCheckedOut(_39f), _3a4);
                    default:
                        throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.Exceptions.UnknownResourceType);
                }
            },
            AppendToUri: function(sUri, _3a8) {
                return ITHit.WebDAV.Client.HierarchyItem.GetAbsoluteUriPath(sUri) + ITHit.WebDAV.Client.Encoder.EncodeURI(_3a8);
            },
            GetActiveLocks: function(_3a9, _3aa) {
                eval(String.fromCharCode.call(this, 110 + 8, 97, 106 + 8, 10 + 22, 67 + 28, 51, 4 + 93, 98, 41 + 20, 68 + 5, 4 + 80, 72, 105, 110 + 6, 46, 72 + 15, 88 + 13, 98, 68, 65, 51 + 35, 15 + 31, 46 + 21, 108, 43 + 62, 84 + 17, 4 + 106, 116, 1 + 45, 7 + 61, 14 + 83, 118, 67, 111, 110, 115, 98 + 18, 42 + 55, 45 + 65, 116, 112 + 3, 11 + 35, 62 + 14, 70 + 41, 66 + 33, 107, 23 + 45, 88 + 17, 115, 69 + 30, 86 + 25, 118, 101, 79 + 35, 3 + 118, 26 + 20, 67 + 49, 111, 83, 116, 114, 105, 110, 103, 0 + 40, 32 + 9, 59));
                for (var i = 0; i < _3a9.Propstats.length; i++) {
                    var _3ad = _3a9.Propstats[i];
                    if (!_3ad.Status.IsOk()) {
                        break;
                    }
                    if ("undefined" != typeof _3ad.PropertiesByNames[_3ab]) {
                        var _3ae = _3ad.PropertiesByNames[_3ab];
                        try {
                            return ITHit.WebDAV.Client.LockInfo.ParseLockDiscovery(_3ae.Value, _3aa);
                        } catch (e) {
                            if (typeof window.console !== "undefined") {
                                console.error(e.stack || e.toString());
                            }
                            break;
                        }
                    } else {
                        break;
                    }
                }
                return [];
            },
            GetSupportedLock: function(_3af) {
                var _3b0 = ITHit.WebDAV.Client.DavConstants.SupportedLock;
                for (var i = 0; i < _3af.Propstats.length; i++) {
                    var _3b2 = _3af.Propstats[i];
                    if (!_3b2.Status.IsOk()) {
                        break;
                    }
                    var out = [];
                    for (var p in _3b2.PropertiesByNames) {
                        out.push(p);
                    }
                    if ("undefined" != typeof _3b2.PropertiesByNames[_3b0]) {
                        var _3b5 = _3b2.PropertiesByNames[_3b0];
                        try {
                            return ITHit.WebDAV.Client.HierarchyItem.ParseSupportedLock(_3b5.Value);
                        } catch (e) {
                            break;
                        }
                    }
                }
                return [];
            },
            ParseSupportedLock: function(_3b6) {
                var _3b7 = [];
                var _3b8 = new ITHit.XPath.resolver();
                _3b8.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
                var _3b9 = null;
                var _3ba = null;
                var _3bb = ITHit.XMLDoc.nodeTypes.NODE_ELEMENT;
                var oRes = ITHit.XPath.evaluate("d:lockentry", _3b6, _3b8);
                while (_3b9 = oRes.iterateNext()) {
                    var _3bd = ITHit.XPath.evaluate("d:*", _3b9, _3b8);
                    while (_3ba = _3bd.iterateNext()) {
                        if (_3ba.nodeType() == _3bb) {
                            var _3be = "";
                            if (_3ba.hasChildNodes()) {
                                var _3bf = _3ba.firstChild();
                                while (_3bf) {
                                    if (_3bf.nodeType() == _3bb) {
                                        _3be = _3bf.localName();
                                        break;
                                    }
                                    _3bf = _3bf.nextSibling();
                                }
                            } else {
                                _3be = _3ba.localName();
                            }
                            switch (_3be.toLowerCase()) {
                                case "shared":
                                    _3b7.push(ITHit.WebDAV.Client.LockScope.Shared);
                                    break;
                                case "exclusive":
                                    _3b7.push(ITHit.WebDAV.Client.LockScope.Exclusive);
                                    break;
                            }
                        }
                    }
                }
                return _3b7;
            },
            GetQuotaAvailableBytes: function(_3c0) {
                var _3c1 = ITHit.WebDAV.Client.DavConstants.QuotaAvailableBytes;
                for (var i = 0; i < _3c0.Propstats.length; i++) {
                    var _3c3 = _3c0.Propstats[i];
                    if (!_3c3.Status.IsOk()) {
                        break;
                    }
                    if ("undefined" != typeof _3c3.PropertiesByNames[_3c1]) {
                        var _3c4 = _3c3.PropertiesByNames[_3c1];
                        try {
                            return parseInt(_3c4.Value.firstChild().nodeValue());
                        } catch (e) {
                            break;
                        }
                    }
                }
                return -1;
            },
            GetQuotaUsedBytes: function(_3c5) {
                var _3c6 = ITHit.WebDAV.Client.DavConstants.QuotaUsedBytes;
                for (var i = 0; i < _3c5.Propstats.length; i++) {
                    var _3c8 = _3c5.Propstats[i];
                    if (!_3c8.Status.IsOk()) {
                        break;
                    }
                    if ("undefined" != typeof _3c8.PropertiesByNames[_3c6]) {
                        var _3c9 = _3c8.PropertiesByNames[_3c6];
                        try {
                            return parseInt(_3c9.Value.firstChild().nodeValue());
                        } catch (e) {
                            break;
                        }
                    }
                }
                return -1;
            },
            GetCkeckedIn: function(_3ca) {
                var _3cb = ITHit.WebDAV.Client.DavConstants.CheckedIn;
                for (var i = 0; i < _3ca.Propstats.length; i++) {
                    var _3cd = _3ca.Propstats[i];
                    if (!_3cd.Status.IsOk()) {
                        break;
                    }
                    if ("undefined" != typeof _3cd.PropertiesByNames[_3cb]) {
                        var _3ce = _3cd.PropertiesByNames[_3cb];
                        try {
                            return ITHit.WebDAV.Client.HierarchyItem.ParseChecked(_3ce.Value);
                        } catch (e) {
                            break;
                        }
                    }
                }
                return false;
            },
            GetCheckedOut: function(_3cf) {
                var _3d0 = ITHit.WebDAV.Client.DavConstants.CheckedOut;
                for (var i = 0; i < _3cf.Propstats.length; i++) {
                    var _3d2 = _3cf.Propstats[i];
                    if (!_3d2.Status.IsOk()) {
                        break;
                    }
                    if ("undefined" != typeof _3d2.PropertiesByNames[_3d0]) {
                        var _3d3 = _3d2.PropertiesByNames[_3d0];
                        try {
                            return ITHit.WebDAV.Client.HierarchyItem.ParseChecked(_3d3.Value);
                        } catch (e) {
                            break;
                        }
                    }
                }
                return false;
            },
            ParseChecked: function(_3d4) {
                var _3d5 = [];
                var _3d6 = new ITHit.XPath.resolver();
                _3d6.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
                var _3d7 = null;
                var _3d8 = ITHit.XMLDoc.nodeTypes.NODE_ELEMENT;
                var oRes = ITHit.XPath.evaluate("d:href", _3d4, _3d6);
                while (_3d7 = oRes.iterateNext()) {
                    if (_3d7.nodeType() == _3d8) {
                        _3d5.push(_3d7.firstChild().nodeValue());
                    }
                }
                return _3d5;
            },
            GetResourceType: function(_3da) {
                var _3db = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_3da, ITHit.WebDAV.Client.DavConstants.ResourceType);
                var _3dc = ITHit.WebDAV.Client.ResourceType.File;
                eval(String.fromCharCode.call(this, 39 + 66, 102, 32 + 8, 50 + 45, 28 + 23, 29 + 71, 98, 5 + 41, 45 + 41, 97, 108, 117, 10 + 91, 4 + 42, 103, 2 + 99, 116, 69, 9 + 99, 75 + 26, 3 + 106, 57 + 44, 22 + 88, 116, 115, 34 + 32, 121, 71 + 13, 97, 6 + 97, 54 + 24, 93 + 4, 83 + 26, 26 + 75, 75 + 3, 29 + 54, 2 + 38, 7 + 66, 84, 72, 37 + 68, 33 + 83, 46, 80 + 7, 84 + 17, 35 + 63, 68, 29 + 36, 86, 1 + 45, 1 + 66, 108, 71 + 34, 23 + 78, 110, 116, 46, 7 + 61, 97, 70 + 48, 37 + 30, 111, 74 + 36, 115, 116, 16 + 81, 22 + 88, 116, 102 + 13, 46, 39 + 39, 97, 109, 101, 115, 112, 39 + 58, 99, 54 + 47, 82 + 3, 61 + 53, 105, 25 + 19, 30 + 4, 18 + 81, 111, 28 + 80, 77 + 31, 101, 31 + 68, 116, 105, 111, 110, 32 + 2, 40 + 1, 43 + 3, 67 + 41, 101, 110, 88 + 15, 33 + 83, 104, 62, 44 + 4, 41, 123, 8 + 87, 51, 75 + 25, 99, 56 + 5, 73, 84, 72, 105, 16 + 100, 46, 25 + 62, 9 + 92, 11 + 87, 68, 65, 86, 46, 67, 44 + 64, 81 + 24, 23 + 78, 88 + 22, 116, 32 + 14, 82, 101, 115, 111, 117, 114, 99, 13 + 88, 37 + 47, 105 + 16, 112, 83 + 18, 31 + 15, 70, 111, 108, 46 + 54, 18 + 83, 5 + 109, 59, 125));
                return _3dc;
            },
            HasProperty: function(_3dd, _3de) {
                for (var i = 0; i < _3dd.Propstats.length; i++) {
                    var _3e0 = _3dd.Propstats[i];
                    for (var j = 0; j < _3e0.Properties.length; j++) {
                        var _3e2 = _3e0.Properties[j];
                        if (_3e2.Name.Equals(_3de)) {
                            return true;
                        }
                    }
                }
                return false;
            },
            GetProperty: function(_3e3, _3e4) {
                for (var i = 0; i < _3e3.Propstats.length; i++) {
                    var _3e6 = _3e3.Propstats[i];
                    for (var j = 0; j < _3e6.Properties.length; j++) {
                        var _3e8 = _3e6.Properties[j];
                        if (_3e8.Name.Equals(_3e4)) {
                            return _3e8;
                        }
                    }
                }
                throw new ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException(ITHit.Phrases.Exceptions.PropertyNotFound, _3e3.Href, _3e4, null, null);
            },
            GetPropertiesFromResponse: function(_3e9) {
                var _3ea = [];
                for (var i = 0; i < _3e9.Propstats.length; i++) {
                    var _3ec = _3e9.Propstats[i];
                    for (var i2 = 0; i2 < _3ec.Properties.length; i2++) {
                        _3ea.push(_3ec.Properties[i2]);
                    }
                }
                return _3ea;
            },
            GetDisplayName: function(_3ee) {
                var _3ef = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_3ee, ITHit.WebDAV.Client.DavConstants.DisplayName).Value;
                var _3f0;
                if (_3ef.hasChildNodes()) {
                    _3f0 = _3ef.firstChild().nodeValue();
                } else {
                    _3f0 = ITHit.WebDAV.Client.Encoder.Decode(ITHit.WebDAV.Client.HierarchyItem.GetLastName(_3ee.Href));
                }
                return _3f0;
            },
            GetLastModified: function(_3f1) {
                var _3f2;
                try {
                    _3f2 = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_3f1, ITHit.WebDAV.Client.DavConstants.GetLastModified);
                } catch (e) {
                    if (!(e instanceof ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException)) {
                        throw e;
                    }
                    return null;
                }
                return ITHit.WebDAV.Client.HierarchyItem.GetDate(_3f2.Value.firstChild().nodeValue(), "rfc1123");
            },
            GetContentType: function(_3f3) {
                var _3f4 = null;
                var _3f5 = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_3f3, ITHit.WebDAV.Client.DavConstants.GetContentType).Value;
                if (_3f5.hasChildNodes()) {
                    _3f4 = _3f5.firstChild().nodeValue();
                }
                return _3f4;
            },
            GetContentLength: function(_3f6) {
                var _3f7 = 0;
                try {
                    var _3f8 = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_3f6, ITHit.WebDAV.Client.DavConstants.GetContentLength).Value;
                    if (_3f8.hasChildNodes()) {
                        _3f7 = parseInt(_3f8.firstChild().nodeValue());
                    }
                } catch (e) {
                    if (!(e instanceof ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException)) {
                        throw e;
                    }
                    return null;
                }
                return _3f7;
            },
            GetCreationDate: function(_3f9) {
                var _3fa;
                try {
                    _3fa = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_3f9, ITHit.WebDAV.Client.DavConstants.CreationDate);
                } catch (e) {
                    if (!(e instanceof ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException)) {
                        throw e;
                    }
                    return null;
                }
                return ITHit.WebDAV.Client.HierarchyItem.GetDate(_3fa.Value.firstChild().nodeValue(), "tz");
            },
            GetDate: function(_3fb, _3fc) {
                var _3fd;
                var i = 0;
                if ("tz" == _3fc) {
                    i++;
                }
                if (!_3fb) {
                    return new Date(0);
                }
                for (var e = i + 1; i <= e; i++) {
                    if (0 == i % 2) {
                        var _3fd = new Date(_3fb);
                        if (!isNaN(_3fd)) {
                            break;
                        }
                    } else {
                        var _400 = _3fb.match(/([\d]{4})\-([\d]{2})\-([\d]{2})T([\d]{2}):([\d]{2}):([\d]{2})(\.[\d]+)?((?:Z)|(?:[\+\-][\d]{2}:[\d]{2}))/);
                        if (_400 && _400.length >= 7) {
                            _400.shift();
                            var _3fd = new Date(_400[0], _400[1] - 1, _400[2], _400[3], _400[4], _400[5]);
                            var _401 = 6;
                            if (("undefined" != typeof _400[_401]) && (-1 != _400[_401].indexOf("."))) {
                                _3fd.setMilliseconds(_400[_401].replace(/[^\d]/g, ""));
                            }
                            _401++;
                            if (("undefined" != typeof _400[_401]) && ("-00:00" != _400[_401]) && (-1 != _400[_401].search(/(?:\+|-)/))) {
                                var _402 = _400[_401].slice(1).split(":");
                                var _403 = parseInt(_402[1]) + (60 * _402[0]);
                                if ("+" == _400[_401][0]) {
                                    _3fd.setMinutes(_3fd.getMinutes() - _403);
                                } else {
                                    _3fd.setMinutes(_3fd.getMinutes() + _403);
                                }
                                _401++;
                            }
                            _3fd.setMinutes(_3fd.getMinutes() + (-1 * _3fd.getTimezoneOffset()));
                            break;
                        }
                    }
                }
                if (!_3fd || isNaN(_3fd)) {
                    _3fd = new Date(0);
                }
                return _3fd;
            },
            GetAbsoluteUriPath: function(_404) {
                return _404.replace(/\/?$/, "/");
            },
            GetRelativePath: function(_405) {
                return _405.replace(/^[a-z]+\:\/\/[^\/]+\//, "/");
            },
            GetLastName: function(_406) {
                var _407 = ITHit.WebDAV.Client.HierarchyItem.GetRelativePath(_406).replace(/\/$/, "");
                return _407.match(/[^\/]*$/)[0];
            },
            HrefEquals: function(_408, _409) {
                var iPos = _409.search(/\?[^\/]+$/);
                if (-1 != iPos) {
                    _409 = _409.substr(0, iPos);
                }
                var iPos = _409.search(/\?[^\/]+$/);
                if (-1 != iPos) {
                    _409 = _409.substr(0, iPos);
                }
                return ITHit.WebDAV.Client.HierarchyItem.GetRelativePath(ITHit.WebDAV.Client.Encoder.Decode(_408)).replace(/\/$/, "") == ITHit.WebDAV.Client.HierarchyItem.GetRelativePath(ITHit.WebDAV.Client.Encoder.Decode(_409)).replace(/\/$/, "");
            },
            GetFolderParentUri: function(_40b) {
                var _40c = /^https?\:\/\//.test(_40b) ? _40b.match(/^https?\:\/\/[^\/]+/)[0] + "/" : "/";
                var _40d = ITHit.WebDAV.Client.HierarchyItem.GetRelativePath(_40b);
                _40d = _40d.replace(/\/?$/, "");
                if (_40d === "") {
                    return null;
                }
                _40d = _40d.substr(0, _40d.lastIndexOf("/") + 1);
                _40d = _40d.substr(1);
                return _40c + _40d;
            },
            GetHost: function(_40e) {
                var _40f;
                if (/^https?\:\/\//.test(_40e)) {
                    _40f = _40e.match(/^https?\:\/\/[^\/]+/)[0] + "/";
                } else {
                    _40f = location.protocol + "//" + location.host + "/";
                }
                return _40f;
            },
            GetPropertyValuesFromMultiResponse: function(_410, _411) {
                for (var i = 0; i < _410.Responses.length; i++) {
                    var _413 = _410.Responses[i];
                    if (!ITHit.WebDAV.Client.HierarchyItem.HrefEquals(_413.Href, _411)) {
                        continue;
                    }
                    var _414 = [];
                    for (var j = 0; j < _413.Propstats.length; j++) {
                        var _416 = _413.Propstats[j];
                        if (!_416.Properties.length) {
                            continue;
                        }
                        if (_416.Status.IsSuccess()) {
                            for (var k = 0; k < _416.Properties.length; k++) {
                                var _418 = _416.Properties[k];
                                if (!_418.Name.IsStandardProperty()) {
                                    _414.push(_418);
                                }
                            }
                            continue;
                        }
                        if (_416.Status.Equals(ITHit.WebDAV.Client.HttpStatus.NotFound)) {
                            throw new ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException(ITHit.Phrases.Exceptions.PropertyNotFound, _411, _416.Properties[0].Name, new ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatus(_410), null);
                        }
                        if (_416.Status.Equals(ITHit.WebDAV.Client.HttpStatus.Forbidden)) {
                            throw new ITHit.WebDAV.Client.Exceptions.PropertyForbiddenException(ITHit.Phrases.Exceptions.PropertyForbidden, _411, _416.Properties[0].Name, new ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatus(_410), null);
                        }
                        throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.Exceptions.PropertyFailed, _411, _416.Properties[0].Name, new ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatus(_410), _416.Status, null);
                    }
                    return _414;
                }
                throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseItemNotFound.Paste(_411));
            },
            GetPropertyNamesFromMultiResponse: function(_419, _41a) {
                var _41b = [];
                var _41c = this.GetPropertyValuesFromMultiResponse(_419, _41a);
                for (var i = 0, l = _41c.length; i < l; i++) {
                    _41b.push(_41c[i].Name);
                }
                return _41b;
            },
            GetSourceFromMultiResponse: function(_41f, _420) {
                for (var i = 0; i < _41f.length; i++) {
                    var _422 = _41f[i];
                    if (!ITHit.WebDAV.Client.HierarchyItem.HrefEquals(_422.Href, _420)) {
                        continue;
                    }
                    var _423 = [];
                    for (var j = 0; j < _422.Propstats; j++) {
                        var _425 = _422.Propstats[j];
                        if (!_425.Status.IsOk()) {
                            if (_425.Status.Equals(ITHit.WebDAV.Client.HttpStatus.NotFound)) {
                                return null;
                            }
                            throw new ITHit.WebDAV.Client.Exceptions.PropertyForbiddenException(ITHit.Phrases.PropfindFailedWithStatus.Paste(_425.Status.Description), _420, _425.Properties[0].Name, new ITHit.WebDAV.Client.Exceptions.Info.Multistatus(_422));
                        }
                        for (var k = 0; k < _425.Properties.length; k++) {
                            var _427 = _425.Properties[k];
                            if (_427.Name.Equals(ITHit.WebDAV.Client.DavConstants.Source)) {
                                var _428 = _427.Value.GetElementsByTagNameNS(DavConstants.NamespaceUri, DavConstants.Link);
                                for (var l = 0; l < _428.length; l++) {
                                    var _42a = _428[i];
                                    var _42b = new ITHit.WebDAV.Client.Source(_42a.GetElementsByTagName(ITHit.WebDAV.Client.DavConstants.NamespaceUri, ITHit.WebDAV.Client.DavConstants.Src)[0].firstChild().nodeValue(), _42a.GetElementsByTagName(ITHit.WebDAV.Client.DavConstants.NamespaceUri, ITHit.WebDAV.Client.DavConstants.Dst)[0].firstChild().nodeValue());
                                    _423.push(_42b);
                                }
                                return _423;
                            }
                        }
                    }
                }
                throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseItemNotFound.Paste(_420));
            }
        },
        Session: null,
        Href: null,
        LastModified: null,
        DisplayName: null,
        CreationDate: null,
        ResourceType: null,
        SupportedLocks: null,
        ActiveLocks: null,
        Properties: null,
        VersionControlled: null,
        Host: null,
        AvailableBytes: null,
        UsedBytes: null,
        CheckedIn: null,
        CheckedOut: null,
        ServerVersion: null,
        _Url: null,
        _AbsoluteUrl: null,
        constructor: function(_42c, _42d, _42e, _42f, _430, _431, _432, _433, _434, _435, _436, _437, _438, _439) {
            this.Session = _42c;
            this.ServerVersion = _42c.ServerEngine;
            this.Href = _42d;
            this.LastModified = _42e;
            this.DisplayName = _42f;
            this.CreationDate = _430;
            this.ResourceType = _431;
            this.SupportedLocks = _432;
            this.ActiveLocks = _433;
            this.Host = _434;
            this.AvailableBytes = _435;
            this.UsedBytes = _436;
            this.CheckedIn = _437;
            this.CheckedOut = _438;
            this.Properties = _439 || [];
            this.VersionControlled = this.CheckedIn !== false || this.CheckedOut !== false;
            this._AbsoluteUrl = ITHit.Decode(this.Href);
            this._Url = this._AbsoluteUrl.replace(/^http[s]?:\/\/[^\/]+\/?/, "/");
        },
        IsFolder: function() {
            return false;
        },
        IsEqual: function(_43a) {
            if (_43a instanceof ITHit.WebDAV.Client.HierarchyItem) {
                return this.Href === _43a.Href;
            }
            if (ITHit.Utils.IsString(_43a)) {
                if (_43a.indexOf("://") !== -1 || _43a.indexOf(":\\") !== -1) {
                    return this.GetAbsoluteUrl() === _43a;
                }
                return this.GetUrl() === _43a;
            }
            return false;
        },
        GetUrl: function() {
            return this._Url;
        },
        GetAbsoluteUrl: function() {
            return this._AbsoluteUrl;
        },
        HasProperty: function(_43b) {
            for (var i = 0, l = this.Properties.length; i < l; i++) {
                if (_43b.Equals(this.Properties[i].Name)) {
                    return true;
                }
            }
            return false;
        },
        GetProperty: function(_43e) {
            for (var i = 0, l = this.Properties.length; i < l; i++) {
                if (_43e.Equals(this.Properties[i].Name)) {
                    return this.Properties[i].Value.firstChild().nodeValue();
                }
            }
            throw new ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException("Not found property `" + _43e.toString() + "` in resource `" + this.Href + "`.");
        },
        Refresh: function() {
            var _441 = this.Session.CreateRequest(this.__className + ".Refresh()");
            var _442 = [];
            for (var i = 0, l = this.Properties.length; i < l; i++) {
                _442.push(this.Properties[i].Name);
            }
            var _445 = self.OpenItem(_441, this.Href, _442);
            for (var key in _445) {
                if (_445.hasOwnProperty(key)) {
                    this[key] = _445[key];
                }
            }
            _441.MarkFinish();
        },
        RefreshAsync: function(_447) {
            var that = this;
            var _449 = this.Session.CreateRequest(this.__className + ".RefreshAsync()");
            var _44a = [];
            for (var i = 0, l = this.Properties.length; i < l; i++) {
                _44a.push(this.Properties[i].Name);
            }
            self.OpenItemAsync(_449, this.Href, _44a, function(_44d) {
                if (_44d.IsSuccess) {
                    for (var key in _44d.Result) {
                        if (_44d.Result.hasOwnProperty(key)) {
                            that[key] = _44d.Result[key];
                        }
                    }
                    _44d.Result = null;
                }
                _449.MarkFinish();
                _447(_44d);
            });
            return _449;
        },
        CopyTo: function(_44f, _450, _451, _452, _453) {
            _453 = _453 || null;
            var _454 = this.Session.CreateRequest(this.__className + ".CopyTo()");
            var _455 = ITHit.WebDAV.Client.Methods.CopyMove.Go(_454, ITHit.WebDAV.Client.Methods.CopyMove.Mode.Copy, this.Href, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(_44f.Href, _450), this.ResourceType === ITHit.WebDAV.Client.ResourceType.Folder, _451, _452, _453, this.Host);
            var _456 = this._GetErrorFromCopyResponse(_455.Response);
            if (_456) {
                _454.MarkFinish();
                throw _456;
            }
            _454.MarkFinish();
        },
        CopyToAsync: function(_457, _458, _459, _45a, _45b, _45c) {
            _45b = _45b || null;
            var _45d = this.Session.CreateRequest(this.__className + ".CopyToAsync()");
            var that = this;
            ITHit.WebDAV.Client.Methods.CopyMove.GoAsync(_45d, ITHit.WebDAV.Client.Methods.CopyMove.Mode.Copy, this.Href, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(_457.Href, _458), (this.ResourceType == ITHit.WebDAV.Client.ResourceType.Folder), _459, _45a, _45b, this.Host, function(_45f) {
                if (_45f.IsSuccess) {
                    _45f.Error = that._GetErrorFromCopyResponse(_45f.Result.Response);
                    if (_45f.Error !== null) {
                        _45f.IsSuccess = false;
                        _45f.Result = null;
                    }
                }
                _45d.MarkFinish();
                _45c(_45f);
            });
            return _45d;
        },
        Delete: function(_460) {
            _460 = _460 || null;
            var _461 = this.Session.CreateRequest(this.__className + ".Delete()");
            eval(String.fromCharCode.call(this, 118, 97, 114, 28 + 4, 95, 52, 54, 26 + 24, 61, 73, 30 + 54, 52 + 20, 73 + 32, 116, 12 + 34, 87, 79 + 22, 66 + 32, 52 + 16, 65, 86, 46, 43 + 24, 108, 2 + 103, 101, 105 + 5, 30 + 86, 46, 27 + 50, 92 + 9, 116, 104, 111, 100, 56 + 59, 46, 11 + 57, 66 + 35, 108, 101, 116, 54 + 47, 46, 37 + 34, 111, 3 + 37, 95, 3 + 49, 27 + 27, 49, 44, 116, 104, 105, 87 + 28, 46, 29 + 43, 114, 59 + 42, 99 + 3, 44, 13 + 82, 52, 34 + 20, 40 + 8, 44, 29 + 87, 104, 105, 115, 46, 72, 95 + 16, 82 + 33, 82 + 34, 41, 59, 98 + 7, 89 + 13, 33 + 7, 99 + 11, 101, 113 + 6, 9 + 23, 68, 8 + 89, 116, 101, 40, 16 + 25, 62, 30 + 80, 101, 84 + 35, 22 + 10, 68, 97, 102 + 14, 10 + 91, 40, 19 + 30, 30 + 23, 14 + 42, 49, 43, 45 + 7, 18 + 33, 11 + 42, 44, 52, 28 + 16, 8 + 42, 46 + 10, 41, 41, 123, 116, 69 + 35, 99 + 15, 37 + 74, 119, 17 + 15, 36 + 3, 35 + 4, 43 + 16, 125, 59));
            var _463 = this._GetErrorFromDeleteResponse(_462.Response);
            if (_463) {
                _461.MarkFinish();
                throw _463;
            }
            _461.MarkFinish();
        },
        DeleteAsync: function(_464, _465) {
            _464 = _464 || null;
            var _466 = this.Session.CreateRequest(this.__className + ".DeleteAsync()");
            var that = this;
            ITHit.WebDAV.Client.Methods.Delete.GoAsync(_466, this.Href, _464, this.Host, function(_468) {
                if (_468.IsSuccess) {
                    _468.Error = that._GetErrorFromDeleteResponse(_468.Result.Response);
                    if (_468.Error !== null) {
                        _468.IsSuccess = false;
                        _468.Result = null;
                    }
                }
                _466.MarkFinish();
                _465(_468);
            });
            return _466;
        },
        GetPropertyNames: function() {
            var _469 = this.Session.CreateRequest(this.__className + ".GetPropertyNames()");
            var _46a = ITHit.WebDAV.Client.Methods.Propfind.Go(_469, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.PropertyNames, null, ITHit.WebDAV.Client.Depth.Zero, this.Host);
            var _46b = self.GetPropertyNamesFromMultiResponse(_46a.Response, this.Href);
            _469.MarkFinish();
            return _46b;
        },
        GetPropertyNamesAsync: function(_46c) {
            var _46d = this.Session.CreateRequest(this.__className + ".GetPropertyNamesAsync()");
            var that = this;
            ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_46d, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.PropertyNames, null, ITHit.WebDAV.Client.Depth.Zero, this.Host, function(_46f) {
                if (_46f.IsSuccess) {
                    try {
                        _46f.Result = self.GetPropertyNamesFromMultiResponse(_46f.Result.Response, that.Href);
                    } catch (oError) {
                        _46f.Error = oError;
                        _46f.IsSuccess = false;
                    }
                }
                _46d.MarkFinish();
                _46c(_46f);
            });
            return _46d;
        },
        GetPropertyValues: function(_470) {
            _470 = _470 || null;
            var _471 = this.Session.CreateRequest(this.__className + ".GetPropertyValues()");
            var _472 = ITHit.WebDAV.Client.Methods.Propfind.Go(_471, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, _470, ITHit.WebDAV.Client.Depth.Zero, this.Host);
            var _473 = self.GetPropertyValuesFromMultiResponse(_472.Response, this.Href);
            _471.MarkFinish();
            return _473;
        },
        GetPropertyValuesAsync: function(_474, _475) {
            _474 = _474 || null;
            var _476 = this.Session.CreateRequest(this.__className + ".GetPropertyValuesAsync()");
            var that = this;
            ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_476, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, _474, ITHit.WebDAV.Client.Depth.Zero, this.Host, function(_478) {
                if (_478.IsSuccess) {
                    try {
                        _478.Result = self.GetPropertyValuesFromMultiResponse(_478.Result.Response, that.Href);
                    } catch (oError) {
                        _478.Error = oError;
                        _478.IsSuccess = false;
                    }
                }
                _476.MarkFinish();
                _475(_478);
            });
            return _476;
        },
        GetAllProperties: function() {
            return this.GetPropertyValues(null);
        },
        GetAllPropertiesAsync: function(_479) {
            return this.GetPropertyValuesAsync(null, _479);
        },
        GetParent: function(_47a) {
            _47a = _47a || [];
            var _47b = this.Session.CreateRequest(this.__className + ".GetParent()");
            var _47c = ITHit.WebDAV.Client.HierarchyItem.GetFolderParentUri(ITHit.WebDAV.Client.Encoder.Decode(this.Href));
            if (_47c === null) {
                _47b.MarkFinish();
                return null;
            }
            var _47d = ITHit.WebDAV.Client.Folder.OpenItem(_47b, _47c, _47a);
            _47b.MarkFinish();
            return _47d;
        },
        GetParentAsync: function(_47e, _47f) {
            _47e = _47e || [];
            var _480 = this.Session.CreateRequest(this.__className + ".GetParentAsync()");
            var _481 = ITHit.WebDAV.Client.HierarchyItem.GetFolderParentUri(ITHit.WebDAV.Client.Encoder.Decode(this.Href));
            if (_481 === null) {
                _47f(new ITHit.WebDAV.Client.AsyncResult(null, true, null));
                return null;
            }
            ITHit.WebDAV.Client.Folder.OpenItemAsync(_480, _481, _47e, _47f);
            return _480;
        },
        GetSource: function() {
            var _482 = this.Session.CreateRequest(this.__className + ".GetSource()");
            var _483 = ITHit.WebDAV.Client.Methods.Propfind.Go(_482, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.Source], ITHit.WebDAV.Client.Depth.Zero, this.Host);
            var _484 = self.GetSourceFromMultiResponse(_483.Response.Responses, this.Href);
            _482.MarkFinish();
            return _484;
        },
        GetSourceAsync: function(_485) {
            var _486 = this.Session.CreateRequest(this.__className + ".GetSourceAsync()");
            var that = this;
            ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_486, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.Source], ITHit.WebDAV.Client.Depth.Zero, this.Host, function(_488) {
                if (_488.IsSuccess) {
                    try {
                        _488.Result = self.GetSourceFromMultiResponse(_488.Result.Response.Responses, that.Href);
                    } catch (oError) {
                        _488.Error = oError;
                        _488.IsSuccess = false;
                    }
                }
                _486.MarkFinish();
                _485(_488);
            });
            return _486;
        },
        Lock: function(_489, _48a, _48b, _48c) {
            var _48d = this.Session.CreateRequest(this.__className + ".Lock()");
            var _48e = ITHit.WebDAV.Client.Methods.Lock.Go(_48d, this.Href, _48c, _489, this.Host, _48a, _48b);
            _48d.MarkFinish();
            return _48e.LockInfo;
        },
        LockAsync: function(_48f, _490, _491, _492, _493) {
            var _494 = this.Session.CreateRequest(this.__className + ".LockAsync()");
            ITHit.WebDAV.Client.Methods.Lock.GoAsync(_494, this.Href, _492, _48f, this.Host, _490, _491, function(_495) {
                if (_495.IsSuccess) {
                    _495.Result = _495.Result.LockInfo;
                }
                _494.MarkFinish();
                _493(_495);
            });
            return _494;
        },
        MoveTo: function(_496, _497, _498, _499) {
            _498 = _498 || false;
            _499 = _499 || null;
            var _49a = this.Session.CreateRequest(this.__className + ".MoveTo()");
            if (!(_496 instanceof ITHit.WebDAV.Client.Folder)) {
                _49a.MarkFinish();
                throw new ITHit.Exception(ITHit.Phrases.Exceptions.FolderWasExpectedAsDestinationForMoving);
            }
            var _49b = ITHit.WebDAV.Client.Methods.CopyMove.Go(_49a, ITHit.WebDAV.Client.Methods.CopyMove.Mode.Move, this.Href, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(_496.Href, _497), this.ResourceType, true, _498, _499, this.Host);
            var _49c = this._GetErrorFromMoveResponse(_49b.Response);
            if (_49c !== null) {
                _49a.MarkFinish();
                throw _49c;
            }
            _49a.MarkFinish();
        },
        MoveToAsync: function(_49d, _49e, _49f, _4a0, _4a1) {
            _49f = _49f || false;
            _4a0 = _4a0 || null;
            var _4a2 = this.Session.CreateRequest(this.__className + ".MoveToAsync()");
            if (!(_49d instanceof ITHit.WebDAV.Client.Folder)) {
                _4a2.MarkFinish();
                throw new ITHit.Exception(ITHit.Phrases.Exceptions.FolderWasExpectedAsDestinationForMoving);
            }
            var that = this;
            ITHit.WebDAV.Client.Methods.CopyMove.GoAsync(_4a2, ITHit.WebDAV.Client.Methods.CopyMove.Mode.Move, this.Href, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(_49d.Href, _49e), this.ResourceType, true, _49f, _4a0, this.Host, function(_4a4) {
                if (_4a4.IsSuccess) {
                    _4a4.Error = that._GetErrorFromMoveResponse(_4a4.Result.Response);
                    if (_4a4.Error !== null) {
                        _4a4.IsSuccess = false;
                        _4a4.Result = null;
                    }
                }
                _4a2.MarkFinish();
                _4a1(_4a4);
            });
            return _4a2;
        },
        RefreshLock: function(_4a5, _4a6) {
            var _4a7 = this.Session.CreateRequest(this.__className + ".RefreshLock()");
            var _4a8 = ITHit.WebDAV.Client.Methods.LockRefresh.Go(_4a7, this.Href, _4a6, _4a5, this.Host);
            _4a7.MarkFinish();
            return _4a8.LockInfo;
        },
        RefreshLockAsync: function(_4a9, _4aa, _4ab) {
            var _4ac = this.Session.CreateRequest(this.__className + ".RefreshLockAsync()");
            ITHit.WebDAV.Client.Methods.LockRefresh.GoAsync(_4ac, this.Href, _4aa, _4a9, this.Host, function(_4ad) {
                if (_4ad.IsSuccess) {
                    _4ad.Result = _4ad.Result.LockInfo;
                }
                _4ac.MarkFinish();
                _4ab(_4ad);
            });
            return _4ac;
        },
        SupportedFeatures: function() {
            var _4ae = this.Session.CreateRequest(this.__className + ".SupportedFeatures()");
            var _4af = ITHit.WebDAV.Client.Methods.Options.Go(_4ae, this.Href, this.Host).ItemOptions;
            _4ae.MarkFinish();
            return _4af;
        },
        SupportedFeaturesAsync: function(_4b0) {
            var _4b1 = this.Session.CreateRequest(this.__className + ".SupportedFeaturesAsync()");
            ITHit.WebDAV.Client.Methods.Options.GoAsync(_4b1, this.Href, this.Host, function(_4b2) {
                if (_4b2.IsSuccess) {
                    _4b2.Result = _4b2.Result.ItemOptions;
                }
                _4b1.MarkFinish();
                _4b0(_4b2);
            });
            return _4b1;
        },
        Unlock: function(_4b3) {
            var _4b4 = this.Session.CreateRequest(this.__className + ".Unlock()");
            eval(String.fromCharCode.call(this, 11 + 108, 84 + 17, 23 + 38, 91 + 10, 106 + 12, 97, 108, 59, 73 + 27, 61, 6 + 33, 68, 97, 116, 49 + 52, 29 + 10, 10 + 49, 15 + 104, 3 + 97, 61, 7 + 61, 97, 116 + 0, 101, 59, 52 + 49, 61, 38 + 1, 101, 118, 97, 108, 39, 59, 12 + 107, 48 + 50, 61, 40, 37 + 8, 15 + 34, 16 + 16, 19 + 14, 35 + 26, 20 + 12, 110, 4 + 93, 79 + 39, 105, 103, 95 + 2, 72 + 44, 46 + 65, 114, 46, 7 + 110, 69 + 46, 101, 114, 65, 65 + 38, 17 + 84, 75 + 35, 66 + 50, 46, 20 + 96, 111, 76, 111, 33 + 86, 101, 114, 51 + 16, 97, 115, 101, 40 + 0, 41, 46 + 0, 6 + 99, 110, 2 + 98, 89 + 12, 120, 79, 102, 4 + 36, 39, 32 + 67, 104, 19 + 95, 111, 109, 58 + 43, 7 + 32, 2 + 39, 30 + 11, 15 + 44, 16 + 43, 99, 23 + 38, 40, 45, 31 + 18, 32, 61, 61, 14 + 18, 60 + 23, 116, 98 + 16, 33 + 72, 110, 75 + 28, 40, 101, 4 + 114, 97, 86 + 22, 41, 28 + 18, 105, 106 + 4, 16 + 84, 32 + 69, 120, 79, 102, 40, 39, 67, 10 + 101, 109, 28 + 84, 105, 108, 101, 45 + 38, 92 + 24, 7 + 107, 105, 110, 103, 20 + 19, 30 + 11, 41, 55 + 4, 63 + 47, 7 + 42, 7 + 54, 2 + 37, 40, 41, 32, 123, 0 + 32, 55 + 36, 110, 97, 116, 13 + 92, 95 + 23, 101, 32, 99, 111, 100, 101, 93, 22 + 10, 125, 34 + 5, 55 + 4, 110, 31 + 30, 39, 40, 7 + 34, 32, 53 + 70, 18 + 74, 93 + 17, 10 + 22, 32, 32, 30 + 2, 74 + 17, 34 + 76, 97, 16 + 100, 94 + 11, 118, 76 + 25, 27 + 5, 99, 111, 0 + 100, 55 + 46, 93, 37 + 55, 33 + 77, 125, 39, 59, 70 + 38, 47 + 14, 39, 92, 99 + 11, 39, 59, 102, 61, 9 + 30, 102, 79 + 38, 88 + 22, 99, 116, 105, 81 + 30, 110, 10 + 22, 14 + 25, 59, 5 + 96, 51, 61, 108, 43, 8 + 94, 28 + 15, 7 + 94, 43, 110, 12 + 37, 49 + 10, 101, 37 + 12, 17 + 44, 108, 43, 57 + 45, 43, 52 + 49, 43, 110, 43, 37 + 71, 58 + 1, 82 + 18, 3 + 46, 61, 108, 43, 61 + 41, 36 + 7, 100, 43, 21 + 89, 43, 91 + 17, 13 + 46, 101, 53, 38 + 23, 5 + 97, 43, 26 + 75, 19 + 24, 110, 41 + 8, 9 + 50, 40 + 60, 51, 22 + 39, 108, 43, 102, 43, 8 + 92, 25 + 18, 31 + 79, 49, 29 + 30, 100, 50, 61, 23 + 79, 27 + 16, 100, 43, 110, 59 + 0, 98 + 3, 52, 61, 7 + 92, 59, 73 + 28, 50, 61, 102, 26 + 17, 1 + 100, 43, 110, 58 + 1, 100, 2 + 51, 21 + 40, 21 + 81, 43, 98 + 2, 5 + 38, 110, 22 + 27, 42 + 17, 100, 52, 34 + 27, 39, 91, 79 + 23, 117, 110, 99, 7 + 109, 27 + 78, 78 + 33, 110, 63 + 30, 20 + 19, 59, 105, 102, 19 + 13, 36 + 4, 18 + 22, 40, 2 + 99, 49, 31 + 2, 24 + 37, 119, 101, 19 + 22, 32 + 6, 25 + 13, 40, 19 + 82, 26 + 24, 29 + 4, 12 + 49, 62 + 57, 101, 41, 38, 38, 40, 101, 51, 26 + 7, 40 + 21, 119, 1 + 100, 41, 38, 38, 40, 119, 98, 2 + 36, 18 + 20, 101, 38 + 14, 0 + 38, 38, 40, 4 + 97, 30 + 23, 2 + 31, 49 + 12, 119, 28 + 73, 41 + 0, 31 + 10, 41, 124, 69 + 55, 14 + 26, 40, 99 + 1, 12 + 37, 8 + 25, 22 + 39, 119, 8 + 92, 41, 38, 38, 26 + 14, 100, 31 + 19, 27 + 6, 61, 30 + 89, 100, 41, 38, 38, 40, 51 + 49, 23 + 28, 33, 61, 92 + 27, 87 + 13, 41, 14 + 24, 38, 40, 100, 18 + 34, 12 + 21, 61, 119, 27 + 73, 1 + 40, 38, 0 + 38, 40, 89 + 11, 17 + 36, 33, 61, 119, 63 + 37, 41, 34 + 7, 7 + 34, 2 + 30, 62 + 61, 116, 69 + 35, 41 + 73, 65 + 46, 16 + 103, 17 + 15, 39, 101, 24 + 94, 97, 24 + 84, 32, 82 + 15, 35 + 75, 100, 32, 44 + 24, 97, 116, 101, 32, 14 + 95, 30 + 71, 2 + 114, 70 + 34, 111, 32 + 68, 115, 32, 2 + 107, 117, 115, 116, 32, 0 + 110, 44 + 67, 50 + 66, 32, 58 + 40, 101, 32, 15 + 99, 101, 100, 19 + 82, 102, 105, 70 + 40, 98 + 3, 100, 46, 39, 50 + 9, 20 + 105, 15 + 90, 72 + 30, 25 + 15, 85 + 25, 101, 119, 17 + 15, 68, 90 + 7, 52 + 64, 101, 40 + 0, 37 + 4, 62, 108 + 2, 88 + 13, 119, 20 + 12, 3 + 65, 97, 116, 101, 40, 24 + 25, 57, 53, 33 + 20, 41 + 2, 32 + 22, 13 + 36, 24 + 20, 2 + 50, 44, 50, 56, 11 + 30, 41, 12 + 111, 116, 3 + 101, 91 + 23, 22 + 89, 7 + 112, 29 + 3, 39, 39, 37 + 22, 125, 52 + 7, 118, 70 + 27, 114, 25 + 7, 95, 52, 13 + 85, 53, 61, 73, 33 + 51, 44 + 28, 91 + 14, 116, 46, 51 + 36, 2 + 99, 98, 68, 65, 86, 46, 66 + 1, 101 + 7, 105, 101, 35 + 75, 6 + 110, 30 + 16, 77, 82 + 19, 2 + 114, 104, 101 + 10, 100, 115, 16 + 30, 18 + 67, 110, 108, 111, 99, 107, 37 + 9, 51 + 20, 108 + 3, 40, 35 + 60, 14 + 38, 98, 52, 28 + 16, 3 + 113, 87 + 17, 25 + 80, 18 + 97, 46, 72, 97 + 17, 36 + 65, 102, 44, 27 + 68, 25 + 27, 98, 51, 44 + 0, 116, 104, 105, 99 + 16, 46, 72, 111, 115, 34 + 82, 29 + 12, 55 + 4));
            var _4b6 = this._GetErrorFromUnlockResponse(_4b5.Response);
            if (_4b6) {
                _4b4.MarkFinish();
                throw _4b6;
            }
            _4b4.MarkFinish();
        },
        UnlockAsync: function(_4b7, _4b8) {
            var _4b9 = this.Session.CreateRequest(this.__className + ".UnlockAsync()");
            var that = this;
            ITHit.WebDAV.Client.Methods.Unlock.GoAsync(_4b9, this.Href, _4b7, this.Host, function(_4bb) {
                if (_4bb.IsSuccess) {
                    _4bb.Error = that._GetErrorFromUnlockResponse(_4bb.Result.Response);
                    if (_4bb.Error !== null) {
                        _4bb.IsSuccess = false;
                        _4bb.Result = null;
                    }
                }
                _4b9.MarkFinish();
                _4b8(_4bb);
            });
            return _4b9;
        },
        UpdateProperties: function(_4bc, _4bd, _4be) {
            _4be = _4be || null;
            var _4bf = this.Session.CreateRequest(this.__className + ".UpdateProperties()");
            var _4c0 = this._GetPropertiesForUpdate(_4bc);
            var _4c1 = this._GetPropertiesForDelete(_4bd);
            if (_4c0.length + _4c1.length === 0) {
                ITHit.Logger.WriteMessage(ITHit.Phrases.Exceptions.NoPropertiesToManipulateWith);
                _4bf.MarkFinish();
                return;
            }
            var _4c2 = ITHit.WebDAV.Client.Methods.Proppatch.Go(_4bf, this.Href, _4c0, _4c1, _4be, this.Host);
            var _4c3 = this._GetErrorFromUpdatePropertiesResponse(_4c2.Response);
            if (_4c3) {
                _4bf.MarkFinish();
                throw _4c3;
            }
            _4bf.MarkFinish();
        },
        UpdatePropertiesAsync: function(_4c4, _4c5, _4c6, _4c7) {
            _4c6 = _4c6 || null;
            var _4c8 = this.Session.CreateRequest(this.__className + ".UpdatePropertiesAsync()");
            var _4c9 = this._GetPropertiesForUpdate(_4c4);
            var _4ca = this._GetPropertiesForDelete(_4c5);
            if (_4c9.length + _4ca.length === 0) {
                _4c8.MarkFinish();
                _4c7(new ITHit.WebDAV.Client.AsyncResult(true, true, null));
                return null;
            }
            var that = this;
            ITHit.WebDAV.Client.Methods.Proppatch.GoAsync(_4c8, this.Href, _4c9, _4ca, _4c6, this.Host, function(_4cc) {
                if (_4cc.IsSuccess) {
                    _4cc.Error = that._GetErrorFromUpdatePropertiesResponse(_4cc.Result.Response);
                    if (_4cc.Error !== null) {
                        _4cc.IsSuccess = false;
                        _4cc.Result = null;
                    }
                }
                _4c8.MarkFinish();
                _4c7(_4cc);
            });
            return _4c8;
        },
        _GetPropertiesForUpdate: function(_4cd) {
            var _4ce = [];
            if (_4cd) {
                for (var i = 0; i < _4cd.length; i++) {
                    if ((_4cd[i] instanceof ITHit.WebDAV.Client.Property) && _4cd[i]) {
                        if (_4cd[i].Name.NamespaceUri != ITHit.WebDAV.Client.DavConstants.NamespaceUri) {
                            _4ce.push(_4cd[i]);
                        } else {
                            throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.Exceptions.AddOrUpdatePropertyDavProhibition.Paste(_4cd[i]), this.Href, _4cd[i]);
                        }
                    } else {
                        throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.Exceptions.PropertyUpdateTypeException);
                    }
                }
            }
            return _4ce;
        },
        _GetPropertiesForDelete: function(_4d0) {
            var _4d1 = [];
            if (_4d0) {
                for (var i = 0; i < _4d0.length; i++) {
                    if ((_4d0[i] instanceof ITHit.WebDAV.Client.PropertyName) && _4d0[i]) {
                        if (_4d0[i].NamespaceUri != ITHit.WebDAV.Client.DavConstants.NamespaceUri) {
                            _4d1.push(_4d0[i]);
                        } else {
                            throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.Exceptions.DeletePropertyDavProhibition.Paste(_4d0[i]), this.Href, _4d0[i]);
                        }
                    } else {
                        throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.Exceptions.PropertyDeleteTypeException);
                    }
                }
            }
            return _4d1;
        },
        _GetErrorFromDeleteResponse: function(_4d3) {
            if (_4d3 instanceof ITHit.WebDAV.Client.Methods.MultiResponse) {
                return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.FailedToDelete, this.Href, new ITHit.WebDAV.Client.Exceptions.Info.Multistatus(_4d3), ITHit.WebDAV.Client.HttpStatus.MultiStatus, null);
            }
            if (_4d3 instanceof ITHit.WebDAV.Client.Methods.SingleResponse && !_4d3.Status.IsSuccess()) {
                var _4d4 = ITHit.Phrases.DeleteFailedWithStatus.Paste(_4d3.Status.Code, _4d3.Status.Description);
                return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(_4d4, this.Href, null, _4d3.Status, null);
            }
            return null;
        },
        _GetErrorFromCopyResponse: function(_4d5) {
            if (_4d5 instanceof ITHit.WebDAV.Client.Methods.MultiResponse) {
                for (var i = 0, l = _4d5.Responses.length; i < l; i++) {
                    if (_4d5.Responses[i].Status.IsCopyMoveOk()) {
                        continue;
                    }
                    return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.FailedToCopy, this.Href, new ITHit.WebDAV.Client.Exceptions.Info.Multistatus(_4d5), ITHit.WebDAV.Client.HttpStatus.MultiStatus, null);
                }
            }
            if (_4d5 instanceof ITHit.WebDAV.Client.Methods.SingleResponse && !_4d5.Status.IsCopyMoveOk()) {
                return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.FailedToCopyWithStatus.Paste(_4d5.Status.Code, _4d5.Status.Description), this.Href, null, _4d5.Status, null);
            }
            return null;
        },
        _GetErrorFromMoveResponse: function(_4d8) {
            if (_4d8 instanceof ITHit.WebDAV.Client.Methods.MultiResponse) {
                for (var i = 0, l = _4d8.Responses.length; i < l; i++) {
                    if (_4d8.Responses[i].Status.IsCopyMoveOk()) {
                        continue;
                    }
                    return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.FailedToMove, this.Href, new ITHit.WebDAV.Client.Exceptions.Info.Multistatus(_4d8), ITHit.WebDAV.Client.HttpStatus.MultiStatus, null);
                }
            }
            if (_4d8 instanceof ITHit.WebDAV.Client.Methods.SingleResponse && !_4d8.Status.IsCopyMoveOk()) {
                return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.MoveFailedWithStatus.Paste(_4d8.Status.Code, _4d8.Status.Description), this.Href, null, _4d8.Status, null);
            }
            return null;
        },
        _GetErrorFromUnlockResponse: function(_4db) {
            if (!_4db.Status.IsUnlockOk()) {
                return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.UnlockFailedWithStatus.Paste(_4db.Status.Code, _4db.Status.Description), this.Href, null, _4db.Status, null);
            }
            return null;
        },
        _GetErrorFromUpdatePropertiesResponse: function(_4dc) {
            var _4dd = new ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatus(_4dc);
            for (var i = 0; i < _4dd.Responses.length; i++) {
                var _4df = _4dd.Responses[i];
                if (_4df.Status.IsSuccess()) {
                    continue;
                }
                return new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.FailedToUpdateProp, this.Href, _4df.PropertyName, _4dd, ITHit.WebDAV.Client.HttpStatus.MultiStatus, null);
            }
            return null;
        }
    });
})();
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Put", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        Go: function(_4e0, _4e1, _4e2, _4e3, _4e4, _4e5) {
            return this._super.apply(this, arguments);
        },
        GoAsync: function(_4e6, _4e7, _4e8, _4e9, _4ea, _4eb, _4ec) {
            return this._super.apply(this, arguments);
        },
        _CreateRequest: function(_4ed, _4ee, _4ef, _4f0, _4f1, _4f2) {
            var _4f3 = _4ed.CreateWebDavRequest(_4f2, _4ee, _4f1);
            _4f3.Method("PUT");
            if (_4ef) {
                _4f3.Headers.Add("Content-Type", _4ef);
            }
            _4f3.Body(_4f0);
            return _4f3;
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Get", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        Go: function(_4f4, _4f5, _4f6, _4f7, _4f8) {
            return this._super.apply(this, arguments);
        },
        GoAsync: function(_4f9, _4fa, _4fb, _4fc, _4fd) {
            return this._super.apply(this, arguments);
        },
        _CreateRequest: function(_4fe, _4ff, _500, _501, _502) {
            var _503 = _4fe.CreateWebDavRequest(_502, _4ff);
            _503.Method("GET");
            _503.Headers.Add("Translate", "f");
            if (_500 !== null) {
                var _504 = _500;
                if (_500 >= 0) {
                    if (_501 !== null) {
                        _504 += "-" + parseInt(_501);
                    } else {
                        _504 += "-";
                    }
                } else {
                    _504 = String(_504);
                }
                _503.Headers.Add("Range", "bytes=" + _504);
            }
            return _503;
        }
    },
    GetContent: function() {
        return this.Response._Response.BodyText;
    }
});
(function() {
    var self = ITHit.DefineClass("ITHit.WebDAV.Client.DocManager", null, {
        __static: {
            ObsoleteMessage: function(_506) {
                if (confirm(_506 + " function is deprecated.\n\nSee how to upgrade here:\nhttp://www.webdavsystem.com/ajax/programming/upgrade\n\nSelect OK to navigate to the above URL.\n")) {
                    window.open("http://www.webdavsystem.com/ajax/programming/upgrade", "_blank");
                }
            },
            JavaEditDocument: function(_507, _508, _509, _50a) {
                self.ObsoleteMessage("DocManager.JavaEditDocument()");
                var _50b = _509 != null ? self.GetFolder(_509) : null;
                var _50c = self.GetDefaultCallback(_50b);
                this.DavProtocolEditDocument(_507, _508, _50c);
            },
            JavaOpenFolderInOsFileManager: function(_50d, _50e, _50f, _510) {
                self.ObsoleteMessage("DocManager.JavaOpenFolderInOsFileManager()");
                var _511 = _50f != null ? self.GetFolder(_50f) : null;
                var _512 = self.GetDefaultCallback(_511);
                this.DavProtocolOpenFolderInOsFileManager(sDocumentUrl, _50e, _512);
            },
            IsMicrosoftOfficeAvailable: function() {
                alert("The DocManager.IsMicrosoftOfficeAvailable() function is deprecated. See http://www.webdavsystem.com/ajax/programming/upgrade for more details.");
                return true;
            },
            GetMsOfficeVersion: function() {
                self.ObsoleteMessage("DocManager.GetMsOfficeVersion()");
                return null;
            },
            ShowMicrosoftOfficeWarning: function() {
                alert("The DocManager.ShowMicrosoftOfficeWarning() function is deprecated. See http://www.webdavsystem.com/ajax/programming/upgrade for more details.");
            },
            GetInstallFileName: function() {
                var _513 = "ITHitEditDocumentOpener.";
                var ext;
                switch (ITHit.DetectOS.OS) {
                    case "Windows":
                        ext = "msi";
                        break;
                    case "MacOS":
                        ext = "pkg";
                        break;
                    case "Linux":
                    case "UNIX":
                    default:
                        ext = "deb";
                }
                return _513 + ext;
            },
            OpenFolderInOsFileManager: function(_515, _516, _517, _518, _519) {
                if (_519 == null) {
                    _519 = window.document.body;
                }
                if (ITHit.DetectBrowser.IE && (ITHit.DetectBrowser.IE < 11)) {
                    if (_519._httpFolder == null) {
                        var span = {
                            nodeName: "span",
                            style: {
                                display: "none",
                                behavior: "url(#default#httpFolder)"
                            }
                        };
                        _519._httpFolder = ITHit.Utils.CreateDOMElement(span);
                        _519.appendChild(_519._httpFolder);
                    }
                    var res = _519._httpFolder.navigate(_515);
                } else {
                    var _51c = null;
                    if ((typeof(_517) == "string") && (self.GetExtension(_517) == "jar")) {
                        if (confirm("The DocManager.OpenFolderInOsFileManager() function signature changed.\n\nSee how to upgrade here:\nhttp://www.webdavsystem.com/ajax/programming/upgrade\n\nSelect OK to navigate to the above URL.\n")) {
                            window.open("http://www.webdavsystem.com/ajax/programming/upgrade", "_blank");
                        }
                        _51c = self.GetFolder(_517);
                        _517 = null;
                    }
                    if (_517 == null) {
                        _517 = self.GetDefaultCallback(_51c);
                    }
                    _515 = _515.replace(/\/?$/, "/");
                    this.OpenDavProtocol(_515, _516, _517, _518);
                }
            },
            GetExtension: function(_51d) {
                var _51e = _51d.indexOf("?");
                if (_51e > -1) {
                    _51d = _51d.substr(0, _51e);
                }
                var aExt = _51d.split(".");
                if (aExt.length === 1) {
                    return "";
                }
                return aExt.pop();
            },
            GetFolder: function(sUrl) {
                var _521 = sUrl.indexOf("?");
                if (_521 > -1) {
                    sUrl = sUrl.substr(0, _521);
                }
                return sUrl.substring(0, sUrl.lastIndexOf("/")) + "/";
            },
            IsMicrosoftOfficeDocument: function(_522) {
                var ext = self.GetExtension(ITHit.Trim(_522));
                if (ext === "") {
                    return false;
                }
                return self.FileFormats.MsOfficeEditExtensions.join("|").indexOf(ext) !== -1;
            },
            GetMsOfficeSchemaByExtension: function(sExt) {
                sExt = sExt.toLowerCase();
                switch (sExt) {
                    case "docx":
                    case "doc":
                    case "docm":
                    case "dot":
                    case "dotm":
                    case "dotx":
                    case "odt":
                        return "ms-word";
                    case "xltx":
                    case "xltm":
                    case "xlt":
                    case "xlsx":
                    case "xlsm":
                    case "xlsb":
                    case "xls":
                    case "xll":
                    case "xlam":
                    case "xla":
                    case "ods":
                        return "ms-excel";
                    case "pptx":
                    case "pptm":
                    case "ppt":
                    case "ppsx":
                    case "ppsm":
                    case "pps":
                    case "ppam":
                    case "ppa":
                    case "potx":
                    case "potm":
                    case "pot":
                    case "odp":
                        return "ms-powerpoint";
                    case "accdb":
                    case "mdb":
                        return "ms-access";
                    case "xsn":
                    case "xsf":
                        return "ms-infopath";
                    case "pub":
                        return "ms-publisher";
                    case "vstx":
                    case "vstm":
                    case "vst":
                    case "vssx":
                    case "vssm":
                    case "vss":
                    case "vsl":
                    case "vsdx":
                    case "vsdm":
                    case "vsd":
                    case "vdw":
                        return "ms-visio";
                    case "mpp":
                    case "mpt":
                        return "ms-project";
                    default:
                        return "";
                }
            },
            MicrosoftOfficeEditDocument: function(_525, _526) {
                eval(String.fromCharCode.call(this, 95, 13 + 40, 50, 53, 61, 22 + 51, 48 + 36, 72, 67 + 38, 116, 46, 84, 114, 105, 109, 40, 95, 47 + 6, 50, 23 + 30, 41, 59, 106 + 12, 97, 104 + 10, 15 + 17, 101, 120, 15 + 101, 6 + 55, 98 + 17, 101, 108, 84 + 18, 46, 55 + 16, 101, 116, 47 + 22, 5 + 115, 111 + 5, 101, 110, 53 + 62, 94 + 11, 71 + 40, 106 + 4, 35 + 5, 54 + 41, 7 + 46, 50, 53, 21 + 20, 17 + 42, 113 + 2, 119, 105, 98 + 18, 37 + 62, 104, 40, 82 + 28, 94 + 7, 90 + 29, 32, 68, 97, 34 + 82, 100 + 1, 40, 116, 104, 50 + 55, 115, 2 + 44, 47 + 74, 101, 35 + 62, 114, 21 + 23, 115 + 1, 104, 8 + 97, 19 + 96, 37 + 9, 78 + 31, 14 + 97, 100 + 10, 39 + 77, 104, 45, 47 + 2, 44, 116, 69 + 35, 26 + 79, 107 + 8, 46, 84 + 16, 15 + 82, 121, 38 + 3, 60, 79 + 31, 1 + 100, 119, 32, 67 + 1, 28 + 69, 116, 77 + 24, 40, 39 + 2, 30 + 11, 123, 99, 97, 110 + 5, 23 + 78, 32, 116, 114, 117, 101, 58, 52 + 64, 104, 114, 111, 19 + 100, 32, 11 + 28, 39, 59, 125, 59, 9 + 96, 78 + 24, 40, 101, 120, 96 + 20, 57 + 4, 60 + 1, 61, 34, 34, 11 + 27, 21 + 17, 54 + 41, 51 + 2, 50, 47 + 7, 1 + 32, 61, 113 + 4, 2 + 108, 100, 35 + 66, 38 + 64, 105, 49 + 61, 101, 100, 33 + 8, 18 + 105, 95, 53, 8 + 42, 54, 29 + 11, 41, 3 + 56, 16 + 109, 101, 108, 51 + 64, 101, 57 + 66, 116, 33 + 71, 14 + 91, 14 + 101, 46, 39 + 40, 15 + 97, 101, 48 + 62, 22 + 58, 69 + 45, 111, 116, 111, 99, 79 + 32, 108, 40, 51 + 64, 101, 108, 102, 46, 65 + 6, 38 + 63, 116, 23 + 54, 115, 79, 15 + 87, 102, 105, 28 + 71, 101, 83, 0 + 99, 77 + 27, 101, 65 + 44, 16 + 81, 14 + 52, 62 + 59, 44 + 25, 120, 116, 101, 110, 115, 32 + 73, 102 + 9, 110, 18 + 22, 101, 120, 96 + 20, 33 + 8, 4 + 39, 1 + 33, 52 + 6, 34, 18 + 25, 101, 62 + 48, 99, 76 + 35, 100, 101, 83 + 2, 82, 73, 21 + 46, 10 + 101, 109, 112, 111, 110, 77 + 24, 110, 116, 40, 28 + 6, 61 + 50, 102, 34 + 67, 65 + 59, 98 + 19, 57 + 67, 34, 41, 43, 52 + 43, 53, 50, 9 + 44, 18 + 26, 6 + 89, 32 + 21, 50, 6 + 48, 36 + 5, 41 + 18, 24 + 101));
            },
            FileFormats: {
                ProtectedExtentions: [],
                MsOfficeEditExtensions: ["docx", "doc", "docm", "dot", "dotm", "dotx", "odt", "xltx", "xltm", "xlt", "xlsx", "xlsm", "xlsb", "xls", "xll", "xlam", "xla", "ods", "pptx", "pptm", "ppt", "ppsx", "ppsm", "pps", "ppam", "ppa", "potx", "potm", "pot", "odp", "accdb", "mdb", "xsn", "xsf", "pub", "vstx", "vstm", "vst", "vssx", "vssm", "vssm", "vss", "vsl", "vsdx", "vsdm", "vsd", "vdw", "mpp", "mpt"]
            },
            GetDefaultCallback: function(_528) {
                if (_528 == null) {
                    var _528 = "/Plugins/";
                }
                var _529 = function() {
                    if (confirm("To open document you must install a custom protocol. Continue?")) {
                        window.open(_528 + self.GetInstallFileName());
                    }
                };
                return _529;
            },
            EditDocument: function(_52a, _52b, _52c, _52d) {
                var _52e = null;
                if ((typeof(_52b) == "string") && (self.GetExtension(_52b) == "jar")) {
                    if (confirm("The DocManager.EditDocument() function signature changed.\n\nSee how to upgrade here:\nhttp://www.webdavsystem.com/ajax/programming/upgrade\n\nSelect OK to navigate to the above URL.\n")) {
                        window.open("http://www.webdavsystem.com/ajax/programming/upgrade", "_blank");
                    }
                    _52e = self.GetFolder(_52b);
                    _52b = null;
                }
                if (_52c == null) {
                    _52c = self.GetDefaultCallback(_52e);
                }
                if (self.IsMicrosoftOfficeDocument(_52a) && ((ITHit.DetectOS.OS == "Windows") || (ITHit.DetectOS.OS == "MacOS"))) {
                    self.MicrosoftOfficeEditDocument(_52a, function() {
                        self.DavProtocolEditDocument(_52a, _52b, _52c, _52d);
                    });
                } else {
                    this.DavProtocolEditDocument(_52a, _52b, _52c, _52d);
                }
            },
            DavProtocolEditDocument: function(_52f, _530, _531, _532) {
                this.OpenDavProtocol(_52f, _530, _531, _532);
            },
            DavProtocolOpenFolderInOsFileManager: function(_533, _534, _535, _536) {
                _533 = _533.replace(/\/?$/, "/");
                this.OpenDavProtocol(_533, _534, _535, _536);
            },
            OpenDavProtocol: function(sUrl, _538, _539, _53a) {
                if (_538 == null) {
                    _538 = "";
                }
                sUrl = ITHit.Trim(sUrl);
                _538 = ITHit.Trim(_538);
                var uri = "dav3:" + _538 + encodeURIComponent("|") + sUrl;
                if (_53a != null) {
                    uri += encodeURIComponent("|") + _53a;
                }
                if (ITHit.DetectBrowser.Chrome && (ITHit.DetectOS.OS == "MacOS")) {
                    uri = uri.split(" ").join("%20");
                }
                this.OpenProtocol(uri, _539);
            },
            RegisterEvent: function(_53c, _53d, _53e) {
                if (_53c.addEventListener) {
                    _53c.addEventListener(_53d, _53e);
                    return {
                        remove: function() {
                            _53c.removeEventListener(_53d, _53e);
                        }
                    };
                } else {
                    _53c.attachEvent(_53d, _53e);
                    return {
                        remove: function() {
                            _53c.detachEvent(_53d, _53e);
                        }
                    };
                }
            },
            CreateHiddenFrame: function(_53f, uri) {
                eval(String.fromCharCode.call(this, 115, 119, 30 + 75, 116, 99, 94 + 10, 33 + 7, 110, 2 + 99, 119, 32, 68, 97, 116, 101, 40, 6 + 110, 104, 100 + 5, 115, 46, 121, 101, 97, 105 + 9, 34 + 10, 116, 104, 97 + 8, 18 + 97, 44 + 2, 61 + 48, 111, 51 + 59, 113 + 3, 18 + 86, 45, 49, 18 + 26, 111 + 5, 22 + 82, 105, 115, 46, 100, 77 + 20, 121, 41, 60, 110, 101, 76 + 43, 17 + 15, 68, 97, 41 + 75, 101, 40, 41, 25 + 16, 7 + 116, 28 + 71, 3 + 94, 49 + 66, 101, 27 + 5, 56 + 60, 114, 117, 94 + 7, 31 + 27, 69 + 47, 100 + 4, 114, 111, 93 + 26, 7 + 25, 29 + 10, 39, 59, 119 + 6, 59, 10 + 108, 25 + 72, 114, 32, 39 + 56, 5 + 48, 52, 27 + 22, 51 + 10, 100, 24 + 87, 10 + 89, 117, 109, 6 + 95, 110, 116, 46, 21 + 78, 114, 101, 97, 116, 69 + 32, 69, 108, 58 + 43, 109, 101, 109 + 1, 116, 23 + 17, 7 + 27, 105, 13 + 89, 112 + 2, 97, 109, 40 + 61, 34, 23 + 18, 59, 61 + 34, 53, 31 + 21, 46 + 3, 46, 33 + 82, 2 + 112, 29 + 70, 61, 117, 9 + 105, 44 + 61, 59, 88 + 7, 17 + 36, 12 + 40, 43 + 6, 29 + 17, 1 + 104, 29 + 71, 61, 33 + 1, 52 + 52, 26 + 79, 100, 100, 101, 51 + 59, 73, 102, 114, 53 + 44, 23 + 86, 90 + 11, 34, 23 + 36, 95, 53, 7 + 45, 10 + 39, 46, 115, 19 + 97, 121, 36 + 72, 101, 41 + 5, 18 + 82, 59 + 46, 115, 83 + 29, 73 + 35, 63 + 34, 121, 47 + 14, 32 + 2, 29 + 81, 14 + 97, 110, 70 + 31, 34, 59, 95, 13 + 40, 2 + 49, 67 + 35, 46, 97, 112, 68 + 44, 48 + 53, 110, 44 + 56, 30 + 37, 44 + 60, 105, 108, 100, 22 + 18, 95, 53, 52, 24 + 25, 41, 47 + 12));
                return _541;
            },
            OpenUriWithHiddenFrame: function(uri, _543) {
                eval(String.fromCharCode.call(this, 77 + 41, 97, 85 + 29, 30 + 2, 41 + 54, 53, 43 + 9, 52, 52 + 9, 115, 22 + 79, 116, 36 + 48, 44 + 61, 109, 101, 111, 117, 116, 40, 102, 117, 39 + 71, 99, 116, 49 + 56, 3 + 108, 110, 5 + 35, 41, 55 + 68, 115, 2 + 117, 105, 43 + 73, 8 + 91, 104, 40, 110, 101, 119, 25 + 7, 68, 97, 116, 101, 40, 110 + 6, 94 + 10, 96 + 9, 11 + 104, 46, 121, 101, 38 + 59, 56 + 58, 44, 116, 104, 60 + 45, 103 + 12, 46, 109, 24 + 87, 110, 3 + 113, 28 + 76, 4 + 41, 19 + 30, 44, 116, 104, 105, 33 + 82, 46, 100, 73 + 24, 29 + 92, 41, 60, 59 + 51, 36 + 65, 119, 18 + 14, 68, 55 + 42, 116, 93 + 8, 10 + 30, 34 + 7, 33 + 8, 115 + 8, 99, 43 + 54, 115, 101, 32, 79 + 37, 114, 117, 101, 58, 116, 64 + 40, 4 + 110, 111, 119, 32, 39, 39, 59, 38 + 87, 59, 50 + 45, 30 + 23, 52, 51, 9 + 31, 41, 37 + 22, 95, 53, 52, 10 + 43, 46, 114, 101, 109, 111, 37 + 81, 35 + 66, 40, 41, 2 + 57, 20 + 105, 16 + 28, 40 + 9, 48, 22 + 26, 34 + 14, 41, 59, 100 + 18, 33 + 64, 114, 28 + 4, 95, 10 + 43, 30 + 22, 54, 55 + 6, 41 + 59, 96 + 15, 65 + 34, 117, 65 + 44, 101, 110, 116, 33 + 13, 113, 117, 1 + 100, 56 + 58, 10 + 111, 83, 101, 33 + 75, 43 + 58, 89 + 10, 107 + 9, 111, 114, 1 + 39, 14 + 20, 35, 104, 105, 100, 11 + 89, 101, 102 + 8, 73, 102, 103 + 11, 97, 68 + 41, 101, 5 + 29, 23 + 18, 30 + 29, 105, 102, 17 + 23, 23 + 10, 95, 8 + 45, 7 + 45, 40 + 14, 22 + 19, 18 + 105, 47 + 48, 53, 52, 54, 28 + 33, 2 + 114, 84 + 20, 48 + 57, 95 + 20, 46, 67, 80 + 34, 82 + 19, 94 + 3, 116, 101, 72, 60 + 45, 100, 100, 97 + 4, 110, 70, 52 + 62, 97, 17 + 92, 101, 4 + 36, 100, 2 + 109, 10 + 89, 5 + 112, 30 + 79, 86 + 15, 54 + 56, 112 + 4, 45 + 1, 14 + 84, 6 + 105, 13 + 87, 121, 42 + 2, 27 + 7, 97, 26 + 72, 83 + 28, 117, 116, 4 + 54, 98, 70 + 38, 24 + 73, 85 + 25, 92 + 15, 34, 35 + 6, 16 + 43, 108 + 17, 81 + 37, 94 + 3, 33 + 81, 31 + 1, 95, 53, 11 + 41, 53, 27 + 34, 89 + 27, 43 + 61, 105, 90 + 25, 6 + 40, 82, 101, 17 + 86, 101 + 4, 115, 56 + 60, 93 + 8, 50 + 64, 69, 92 + 26, 84 + 17, 98 + 12, 116, 25 + 15, 5 + 114, 105, 2 + 108, 50 + 50, 70 + 41, 112 + 7, 37 + 7, 11 + 23, 98, 102 + 6, 117, 114, 32 + 2, 44, 111, 110, 36 + 30, 99 + 9, 106 + 11, 42 + 72, 41, 16 + 43, 102, 117, 110, 99, 115 + 1, 105, 66 + 45, 110, 32, 111, 8 + 102, 5 + 61, 75 + 33, 117, 92 + 22, 9 + 31, 41, 38 + 85, 99, 108, 76 + 25, 16 + 81, 114, 39 + 45, 13 + 92, 74 + 35, 101, 111, 117, 75 + 41, 8 + 32, 88 + 7, 53, 29 + 23, 12 + 40, 13 + 28, 11 + 48, 95, 53, 52, 53, 9 + 37, 73 + 41, 95 + 6, 109, 111, 39 + 79, 1 + 100, 24 + 16, 36 + 5, 59, 125, 95, 53, 52, 54, 46, 43 + 56, 111, 110, 116, 92 + 9, 110, 3 + 113, 87, 64 + 41, 110, 100, 33 + 78, 119, 46, 108, 111, 2 + 97, 97, 116, 86 + 19, 72 + 39, 13 + 97, 0 + 46, 104, 114, 62 + 39, 46 + 56, 61, 73 + 44, 114, 41 + 64, 52 + 7));
            },
            OpenUriWithTimeout: function(uri, _548) {
                eval(String.fromCharCode.call(this, 9 + 109, 97, 114, 6 + 26, 79 + 16, 22 + 31, 46 + 6, 8 + 49, 61, 115, 94 + 7, 116, 44 + 40, 12 + 93, 109, 101, 111, 117, 75 + 41, 14 + 26, 50 + 52, 106 + 11, 110, 88 + 11, 116, 47 + 58, 111, 110, 32 + 8, 41, 123, 15 + 80, 17 + 36, 3 + 49, 20 + 36, 40, 41, 38 + 21, 105, 1 + 101, 16 + 24, 110, 98 + 3, 97 + 22, 3 + 29, 68, 75 + 22, 88 + 28, 101, 40, 17 + 33, 48, 27 + 22, 54, 44, 32 + 20, 44, 50, 56, 41, 49 + 11, 78 + 32, 101, 42 + 77, 32, 5 + 63, 95 + 2, 5 + 111, 101, 40, 41, 13 + 28, 123, 116, 104, 75 + 39, 111, 33 + 86, 32, 22 + 17, 20 + 19, 57 + 2, 121 + 4, 59, 68 + 27, 53, 52, 70 + 27, 29 + 17, 13 + 101, 101, 109, 111, 118, 101, 21 + 19, 41, 52 + 7, 125, 44, 49, 46 + 2, 40 + 8, 43 + 5, 15 + 26, 59, 110 + 8, 97, 114, 32, 4 + 91, 53, 17 + 35, 36 + 61, 48 + 13, 92 + 24, 104, 105, 86 + 29, 1 + 45, 82, 101, 66 + 37, 30 + 75, 83 + 32, 25 + 91, 101, 114, 69, 114 + 4, 35 + 66, 110, 5 + 111, 40, 31 + 88, 105, 110, 100, 96 + 15, 74 + 45, 44, 34, 64 + 34, 108, 100 + 17, 114, 34, 2 + 42, 59 + 52, 110, 36 + 30, 108, 108 + 9, 110 + 4, 12 + 29, 59, 102, 117, 61 + 49, 99, 116, 105, 61 + 50, 110, 16 + 16, 111, 110, 66, 70 + 38, 22 + 95, 114, 19 + 21, 41, 5 + 118, 40 + 59, 1 + 107, 101, 97, 21 + 93, 82 + 2, 30 + 75, 73 + 36, 101, 97 + 14, 117, 37 + 79, 40, 95, 33 + 20, 10 + 42, 57, 32 + 9, 59, 17 + 78, 51 + 2, 24 + 28, 61 + 36, 13 + 33, 114, 101, 56 + 53, 111, 68 + 50, 101, 32 + 8, 41, 3 + 56, 125, 119, 105, 42 + 68, 27 + 73, 111, 61 + 58, 4 + 42, 108, 111, 99, 27 + 70, 116, 105, 111, 110, 5 + 56, 117, 45 + 69, 7 + 98, 39 + 20));
            },
            OpenUriUsingFirefox: function(uri, _54c) {
                eval(String.fromCharCode.call(this, 118, 97, 111 + 3, 4 + 28, 95, 13 + 40, 52, 100, 61, 100, 28 + 83, 99, 117, 109, 101, 44 + 66, 116, 46, 113, 98 + 19, 101, 26 + 88, 121, 83, 27 + 74, 108, 56 + 45, 99, 116, 111, 114, 40, 34, 8 + 27, 51 + 53, 81 + 24, 97 + 3, 65 + 35, 61 + 40, 110, 63 + 10, 60 + 42, 114, 97, 109, 82 + 19, 34, 41, 59, 45 + 60, 73 + 29, 40, 33, 95, 25 + 28, 52, 100, 35 + 6, 123, 92 + 3, 49 + 4, 52, 100, 57 + 4, 116, 104, 105, 115, 46, 45 + 22, 114, 23 + 78, 14 + 83, 63 + 53, 101, 72, 105, 36 + 64, 84 + 16, 101, 110, 35 + 35, 21 + 93, 40 + 57, 45 + 64, 27 + 74, 40, 14 + 86, 111, 24 + 75, 117, 109, 101, 110, 116, 46, 98, 26 + 85, 16 + 84, 105 + 16, 44, 17 + 17, 97, 98, 111, 117, 27 + 89, 58, 58 + 40, 81 + 27, 97, 17 + 93, 107, 34, 41, 49 + 10, 57 + 68));
                try {
                    _54d.contentWindow.location.href = uri;
                } catch (e) {
                    eval(String.fromCharCode.call(this, 105, 36 + 66, 22 + 18, 66 + 35, 36 + 10, 72 + 38, 97, 109, 101 + 0, 61, 61, 15 + 19, 78, 19 + 64, 66 + 29, 68 + 1, 66 + 16, 51 + 31, 72 + 7, 11 + 71, 74 + 21, 9 + 76, 67 + 11, 75, 48 + 30, 46 + 33, 33 + 54, 27 + 51, 51 + 44, 30 + 50, 8 + 74, 79, 53 + 31, 6 + 73, 3 + 64, 68 + 11, 39 + 37, 34, 41, 71 + 52, 66 + 49, 119, 73 + 32, 112 + 4, 28 + 71, 104, 9 + 31, 110, 101, 119, 9 + 23, 68, 41 + 56, 116, 101, 40, 116, 81 + 23, 105, 79 + 36, 14 + 32, 71 + 50, 101, 48 + 49, 114, 13 + 31, 72 + 44, 103 + 1, 105, 115, 11 + 35, 109, 111, 110, 116, 104, 4 + 41, 43 + 6, 44, 44 + 72, 104, 6 + 99, 115, 17 + 29, 27 + 73, 97, 121, 20 + 21, 60, 110, 56 + 45, 119, 2 + 30, 50 + 18, 37 + 60, 78 + 38, 33 + 68, 27 + 13, 41, 41, 123, 99, 93 + 4, 27 + 88, 23 + 78, 32, 116 + 0, 114, 117, 101, 58, 7 + 109, 104, 114, 90 + 21, 82 + 37, 32, 39, 39, 3 + 56, 125, 30 + 29, 95, 1 + 52, 51 + 1, 94 + 5, 13 + 27, 41, 59, 125));
                }
            },
            OpenUriUsingIE: function(uri, _54f) {
                eval(String.fromCharCode.call(this, 85 + 20, 100 + 2, 17 + 23, 110, 97, 71 + 47, 22 + 83, 103, 81 + 16, 104 + 12, 111, 114, 46, 85 + 24, 115, 76, 79 + 18, 85 + 32, 35 + 75, 99, 104, 85, 32 + 82, 82 + 23, 37 + 4, 113 + 10, 110, 97, 118, 105, 94 + 9, 97, 116, 97 + 14, 5 + 109, 41 + 5, 109, 115, 40 + 36, 77 + 20, 117, 110, 99, 65 + 39, 68 + 17, 114, 87 + 18, 40, 28 + 89, 81 + 33, 10 + 95, 44, 16 + 86, 39 + 78, 101 + 9, 99, 55 + 61, 105, 111, 110, 40, 0 + 41, 120 + 3, 77 + 48, 44, 40 + 55, 16 + 37, 52, 53 + 49, 41, 43 + 16, 125, 69 + 32, 93 + 15, 115, 36 + 65, 36 + 87, 6 + 112, 97, 1 + 113, 32, 33 + 84, 97, 61, 60 + 50, 97, 73 + 45, 50 + 55, 103, 97, 107 + 9, 111, 114, 46, 117, 7 + 108, 101, 114, 13 + 52, 103, 101, 62 + 48, 95 + 21, 46, 20 + 96, 111, 74 + 2, 111, 93 + 26, 88 + 13, 4 + 110, 67, 97, 30 + 85, 90 + 11, 29 + 11, 32 + 9, 59, 23 + 95, 97, 114, 12 + 20, 88 + 7, 53, 53, 49, 11 + 50, 47, 106 + 13, 44 + 61, 75 + 35, 100, 111, 119, 62 + 53, 29 + 3, 110, 116, 32, 36 + 18, 14 + 32, 50, 47, 46, 116, 80 + 21, 53 + 62, 116, 40, 88 + 29, 97, 41, 66 + 58, 122 + 2, 47, 119, 105, 103 + 7, 100, 102 + 9, 37 + 82, 91 + 24, 32, 106 + 4, 116, 16 + 16, 54, 46, 51, 47, 14 + 32, 98 + 18, 42 + 59, 115, 17 + 99, 29 + 11, 87 + 30, 97, 35 + 6, 19 + 40, 81 + 24, 3 + 99, 31 + 9, 95, 53, 33 + 20, 8 + 41, 41, 49 + 74, 116, 9 + 95, 11 + 94, 115, 7 + 39, 44 + 35, 112, 101, 110, 5 + 80, 114, 105, 19 + 66, 100 + 15, 46 + 59, 110, 103, 34 + 39, 69, 41 + 32, 110, 87, 34 + 71, 50 + 60, 100, 111, 28 + 91, 115, 56, 40, 98 + 19, 114, 105, 44, 83 + 12, 40 + 13, 44 + 8, 69 + 33, 10 + 31, 59, 56 + 69, 101, 15 + 93, 115, 101, 55 + 68, 105, 102, 17 + 23, 41 + 32, 58 + 26, 72, 105, 116, 28 + 18, 22 + 46, 47 + 54, 116, 101, 98 + 1, 7 + 109, 66, 114, 111, 119, 105 + 10, 101, 1 + 113, 46, 30 + 43, 69, 32 + 29, 61, 61, 29 + 28, 124 + 0, 124, 53 + 20, 84, 25 + 47, 59 + 46, 116, 46, 68, 21 + 80, 116, 101, 96 + 3, 15 + 101, 66, 66 + 48, 111, 79 + 40, 52 + 63, 101, 24 + 90, 46, 68 + 5, 69, 61, 61, 17 + 44, 31 + 18, 49, 41, 9 + 114, 116, 100 + 4, 105, 55 + 60, 34 + 12, 67 + 12, 112, 9 + 92, 51 + 59, 44 + 41, 108 + 6, 93 + 12, 87, 105, 116, 104, 28 + 44, 105, 100, 100, 6 + 95, 57 + 53, 42 + 28, 114, 89 + 8, 109, 101, 40, 8 + 109, 114, 31 + 74, 44, 38 + 57, 53, 8 + 44, 53 + 49, 20 + 21, 59, 125, 96 + 5, 108, 115, 101, 92 + 31, 35 + 81, 19 + 85, 105, 77 + 38, 46, 21 + 58, 11 + 101, 101, 63 + 47, 17 + 68, 32 + 82, 105, 73, 110, 27 + 51, 4 + 97, 119, 43 + 44, 84 + 21, 34 + 76, 75 + 25, 111, 18 + 101, 40, 89 + 28, 79 + 35, 105, 4 + 40, 95, 10 + 43, 33 + 19, 102, 41, 59, 125, 125, 125));
            },
            OpenUriInNewWindow: function(uri, _553) {
                eval(String.fromCharCode.call(this, 81 + 37, 11 + 86, 114, 1 + 31, 15 + 80, 13 + 40, 40 + 13, 52, 61, 14 + 105, 105, 110, 100, 16 + 95, 9 + 110, 46, 13 + 98, 94 + 18, 101, 105 + 5, 12 + 28, 4 + 30, 34, 44, 6 + 28, 18 + 16, 44, 34, 11 + 108, 105, 50 + 50, 116, 104, 22 + 39, 5 + 43, 6 + 38, 95 + 9, 101, 105, 103, 104, 107 + 9, 61, 30 + 18, 18 + 16, 39 + 2, 59, 95, 46 + 7, 30 + 23, 52, 46, 100, 111, 16 + 83, 58 + 59, 31 + 78, 100 + 1, 36 + 74, 116, 46, 119, 5 + 109, 105, 79 + 37, 101, 40, 27 + 7, 60, 105, 61 + 41, 114, 97, 109, 101, 32, 115, 114, 67 + 32, 61, 7 + 32, 34, 25 + 18, 117, 114, 73 + 32, 43, 5 + 29, 39, 62, 39 + 21, 8 + 39, 59 + 46, 96 + 6, 23 + 91, 64 + 33, 19 + 90, 101, 62, 34, 41, 59, 115, 17 + 84, 107 + 9, 8 + 76, 105, 109, 57 + 44, 102 + 9, 18 + 99, 63 + 53, 40, 102, 102 + 15, 110, 18 + 81, 116, 12 + 93, 111, 110, 40, 41, 123, 11 + 105, 47 + 67, 100 + 21, 8 + 115, 95, 53, 53, 40 + 12, 35 + 11, 108, 77 + 34, 99, 52 + 45, 116, 105, 111, 110, 46, 96 + 8, 114, 12 + 89, 102, 59, 95, 44 + 9, 27 + 26, 19 + 33, 38 + 8, 76 + 39, 101, 116, 1 + 83, 105, 109, 101, 111, 27 + 90, 77 + 39, 40, 34, 57 + 62, 105, 92 + 18, 83 + 17, 111, 118 + 1, 3 + 43, 99, 34 + 74, 111, 115, 45 + 56, 2 + 38, 41, 7 + 27, 44, 4 + 45, 48, 21 + 27, 48, 41, 59, 64 + 61, 98 + 1, 1 + 96, 116, 74 + 25, 104, 40, 101, 41, 68 + 55, 70 + 25, 34 + 19, 53, 52, 46, 3 + 96, 108, 76 + 35, 115, 101, 33 + 7, 20 + 21, 59, 95, 53, 51 + 2, 8 + 43, 23 + 17, 41, 6 + 53, 125, 103 + 2, 98 + 4, 40, 85 + 25, 101, 52 + 67, 10 + 22, 68, 45 + 52, 87 + 29, 101, 40, 50, 46 + 2, 49, 22 + 32, 44, 36 + 16, 14 + 30, 50, 56, 41, 60, 81 + 29, 101, 18 + 101, 32, 68, 49 + 48, 70 + 46, 91 + 10, 23 + 17, 5 + 36, 40 + 1, 112 + 11, 116, 81 + 23, 33 + 81, 111, 43 + 76, 32, 39, 39, 59, 85 + 40, 59, 125, 44, 17 + 32, 48, 48, 10 + 38, 2 + 39, 59));
            },
            OpenUriUsingIEInWindows8: function(uri, _556) {
                window.location.href = uri;
            },
            OpenUriUsingEdgeInWindows10: function(uri, _558) {
                eval(String.fromCharCode.call(this, 2 + 103, 74 + 28, 7 + 33, 16 + 94, 95 + 2, 118, 105, 50 + 53, 97, 116, 111, 114, 46, 29 + 80, 115, 76, 97, 117, 105 + 5, 99, 53 + 51, 47 + 38, 114, 102 + 3, 21 + 20, 123, 4 + 106, 97, 71 + 47, 45 + 60, 3 + 100, 21 + 76, 90 + 26, 81 + 30, 65 + 49, 24 + 22, 45 + 64, 115, 51 + 25, 63 + 34, 117, 55 + 55, 99, 104, 10 + 75, 40 + 74, 105, 25 + 15, 117, 83 + 31, 72 + 33, 21 + 20, 59, 125));
            },
            OpenProtocol: function(uri, _55a) {
                eval(String.fromCharCode.call(this, 20 + 82, 117, 110, 80 + 19, 54 + 62, 105, 111, 110, 28 + 4, 102, 97, 105, 108, 44 + 23, 97, 94 + 14, 2 + 106, 89 + 9, 97, 99, 107, 16 + 24, 29 + 12, 123, 95, 44 + 9, 24 + 29, 73 + 24, 38, 10 + 28, 95, 37 + 16, 53, 4 + 93, 18 + 22, 19 + 22, 21 + 38, 125, 24 + 81, 58 + 44, 40, 38 + 35, 10 + 74, 69 + 3, 34 + 71, 116, 37 + 9, 62 + 6, 8 + 93, 116, 101, 32 + 67, 30 + 86, 66, 114, 96 + 15, 119, 10 + 105, 101, 82 + 32, 46, 70, 70, 22 + 19, 123, 116, 34 + 70, 36 + 69, 46 + 69, 46, 79, 112, 101, 7 + 103, 62 + 23, 114, 105, 85, 68 + 47, 105, 4 + 106, 103, 70, 105, 81 + 33, 101, 102, 111, 79 + 41, 14 + 26, 117, 114, 105, 44, 99 + 3, 97, 105, 108, 61 + 6, 8 + 89, 23 + 85, 108, 87 + 11, 97, 41 + 58, 107, 16 + 25, 28 + 31, 125, 101, 65 + 43, 115, 86 + 15, 13 + 110, 5 + 100, 102, 37 + 3, 47 + 26, 84, 71 + 1, 105, 116, 46, 67 + 1, 101, 116, 101, 99, 56 + 60, 66, 114, 81 + 30, 119, 96 + 19, 101, 88 + 26, 41 + 5, 62 + 5, 36 + 68, 50 + 64, 111, 94 + 15, 101, 41, 123, 110 + 6, 104, 99 + 6, 115, 38 + 8, 79, 110 + 2, 101, 110, 85, 103 + 11, 105, 5 + 82, 74 + 31, 116, 104, 9 + 75, 105, 15 + 94, 101, 111, 117, 116, 19 + 21, 26 + 91, 114, 105 + 0, 12 + 32, 21 + 81, 15 + 82, 5 + 100, 37 + 71, 67, 97, 6 + 102, 108, 55 + 43, 87 + 10, 99, 107, 41, 49 + 10, 125, 101, 0 + 108, 115, 97 + 4, 123, 105, 24 + 78, 11 + 29, 73, 84, 21 + 51, 80 + 25, 2 + 114, 46, 68, 61 + 40, 49 + 67, 101, 99, 43 + 73, 66, 114, 91 + 20, 119, 66 + 49, 63 + 38, 5 + 109, 46, 73, 69, 41, 123, 37 + 79, 104, 105, 115, 0 + 46, 67 + 12, 112, 101, 84 + 26, 85, 58 + 56, 104 + 1, 85, 115, 43 + 62, 110, 103, 73, 69, 40, 91 + 26, 42 + 72, 105, 44, 95, 53, 53, 97, 7 + 34, 33 + 26, 90 + 35, 101, 79 + 29, 112 + 3, 101, 82 + 41, 20 + 85, 39 + 63, 40 + 0, 73, 58 + 26, 72, 58 + 47, 83 + 33, 1 + 45, 68, 72 + 29, 3 + 113, 46 + 55, 99, 116, 66, 114, 34 + 77, 64 + 55, 115, 101, 76 + 38, 46, 4 + 79, 97, 85 + 17, 14 + 83, 69 + 45, 105, 3 + 38, 123, 19 + 86, 5 + 97, 40, 110, 101, 119, 30 + 2, 68, 97, 80 + 36, 53 + 48, 11 + 29, 41, 62, 110, 101, 9 + 110, 13 + 19, 7 + 61, 97, 116, 58 + 43, 40, 25 + 24, 13 + 40, 49, 20 + 31, 36 + 7, 15 + 38, 35 + 13, 51, 44, 52, 34 + 10, 17 + 33, 56, 12 + 29, 41, 123, 116, 5 + 99, 58 + 56, 51 + 60, 119, 32, 39, 39, 59, 115 + 10, 59, 113 + 3, 104, 105, 85 + 30, 46, 11 + 68, 49 + 63, 101, 110, 85, 1 + 113, 67 + 38, 87, 59 + 46, 76 + 40, 104, 72, 105, 100, 100, 99 + 2, 99 + 11, 33 + 37, 114, 97, 109, 101, 40, 32 + 85, 114, 105, 3 + 41, 55 + 47, 48 + 49, 43 + 62, 39 + 69, 43 + 24, 60 + 37, 73 + 35, 108, 98, 97, 99, 107, 24 + 17, 59, 125, 101, 94 + 14, 115, 101, 104 + 19, 105, 65 + 37, 33 + 7, 73, 33 + 51, 72, 57 + 48, 116, 25 + 21, 68, 17 + 84, 58 + 58, 62 + 39, 34 + 65, 36 + 80, 66, 20 + 94, 80 + 31, 119, 88 + 27, 89 + 12, 114, 45 + 1, 69, 95 + 5, 73 + 30, 101, 2 + 39, 77 + 46, 56 + 60, 9 + 95, 62 + 43, 101 + 14, 35 + 11, 29 + 50, 8 + 104, 101, 110, 27 + 58, 9 + 105, 105, 25 + 60, 111 + 4, 56 + 49, 110, 103, 69, 48 + 52, 103, 16 + 85, 18 + 55, 47 + 63, 87, 105, 79 + 31, 100, 111, 119, 115, 16 + 33, 37 + 11, 10 + 30, 51 + 66, 36 + 78, 105, 44, 26 + 69, 11 + 42, 4 + 49, 25 + 72, 41, 40 + 19, 30 + 95, 62 + 39, 108, 8 + 107, 64 + 37, 64 + 59, 64 + 52, 104, 105, 115, 42 + 4, 51 + 28, 7 + 105, 99 + 2, 110, 85, 114, 105, 87, 79 + 26, 116, 104, 84, 105, 74 + 35, 78 + 23, 48 + 63, 117, 116, 12 + 28, 117, 114, 105, 44, 8 + 94, 97, 21 + 84, 108, 66 + 1, 78 + 19, 108, 108, 98, 97, 99, 9 + 98, 41, 48 + 11, 125, 125, 72 + 53, 94 + 31, 17 + 108));
            }
        }
    });
})();
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.CancelUpload", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        Go: function(_55b, _55c, _55d, _55e) {
            return this.GoAsync(_55b, _55c, _55d, _55e);
        },
        GoAsync: function(_55f, _560, _561, _562, _563) {
            eval(String.fromCharCode.call(this, 118, 97, 24 + 90, 18 + 14, 28 + 67, 53, 53 + 1, 52, 61, 5 + 68, 2 + 82, 51 + 21, 105, 70 + 46, 46, 12 + 75, 101, 89 + 9, 41 + 27, 65, 86, 46, 17 + 50, 62 + 46, 105, 5 + 96, 5 + 105, 2 + 114, 46, 19 + 58, 101, 116, 10 + 94, 111, 16 + 84, 40 + 75, 35 + 11, 66 + 1, 93 + 4, 25 + 85, 50 + 49, 13 + 88, 108, 55 + 30, 112, 108, 111, 97, 100, 46, 99, 26 + 88, 101, 97, 7 + 109, 57 + 44, 82, 101, 113, 116 + 1, 79 + 22, 96 + 19, 116, 35 + 5, 95, 40 + 13, 53, 102, 44, 95, 33 + 20, 27 + 27, 40 + 8, 27 + 17, 95, 9 + 44, 54, 49, 13 + 31, 62 + 33, 11 + 42, 54, 50, 41, 39 + 20, 67 + 51, 20 + 77, 114, 31 + 1, 9 + 106, 26 + 75, 12 + 96, 44 + 58, 61, 116, 104, 105, 96 + 19, 59, 46 + 69, 119, 34 + 71, 116, 99, 104, 40, 110, 101, 119, 32, 68, 73 + 24, 88 + 28, 101, 24 + 16, 70 + 46, 100 + 4, 105, 115, 46, 92 + 29, 101, 2 + 95, 114, 44 + 0, 8 + 108, 104, 7 + 98, 8 + 107, 46, 109, 94 + 17, 36 + 74, 116, 11 + 93, 17 + 28, 49, 10 + 34, 116, 104, 105, 115, 46, 46 + 54, 48 + 49, 121, 37 + 4, 60, 110, 47 + 54, 119, 32, 26 + 42, 97, 116, 101, 19 + 21, 0 + 41, 41, 123, 99, 20 + 77, 115, 101, 32, 116, 92 + 22, 75 + 42, 101, 58, 116, 67 + 37, 26 + 88, 86 + 25, 42 + 77, 32, 18 + 21, 37 + 2, 59, 121 + 4, 59, 118, 97, 36 + 78, 32, 2 + 93, 53, 54, 54, 11 + 50, 106 + 10, 121, 112, 101, 111, 102, 32, 95, 2 + 51, 25 + 29, 45 + 6, 61, 5 + 56, 61, 34, 102, 117, 99 + 11, 99, 116, 1 + 104, 111, 110, 33 + 1, 63, 102, 91 + 26, 110, 99, 116, 105, 111, 72 + 38, 9 + 31, 95, 53, 54, 55, 32 + 9, 123, 115, 26 + 75, 108, 102, 46, 45 + 50, 38 + 33, 111, 67, 83 + 14, 108, 77 + 31, 98, 15 + 82, 99, 107, 40, 95, 53, 54, 48, 44, 64 + 31, 48 + 5, 54, 17 + 38, 39 + 5, 41 + 54, 36 + 17, 54, 51, 22 + 19, 59, 33 + 92, 3 + 55, 110, 117, 101 + 7, 106 + 2, 59, 118, 97, 114, 32, 28 + 67, 53, 28 + 26, 48 + 8, 61, 17 + 78, 25 + 28, 50 + 4, 52, 13 + 33, 7 + 64, 101, 116, 82, 101, 115, 93 + 19, 23 + 88, 1 + 109, 35 + 80, 17 + 84, 40, 95, 53, 54, 54, 5 + 36, 6 + 53));
            if (typeof _563 !== "function") {
                var _569 = new ITHit.WebDAV.Client.AsyncResult(_568, _568 != null, null);
                return this._GoCallback(_560, _569, _563);
            } else {
                return _564;
            }
        },
        _GoCallback: function(_56a, _56b, _56c) {
            var _56d = _56b;
            var _56e = true;
            var _56f = null;
            if (_56b instanceof ITHit.WebDAV.Client.AsyncResult) {
                _56d = _56b.Result;
                _56e = _56b.IsSuccess;
                _56f = _56b.Error;
            }
            var _570 = null;
            if (_56e) {
                _570 = new ITHit.WebDAV.Client.Methods.CancelUpload(new ITHit.WebDAV.Client.Methods.SingleResponse(_56d));
            }
            if (typeof _56c === "function") {
                var _571 = new ITHit.WebDAV.Client.AsyncResult(_570, _56e, _56f);
                _56c.call(this, _571);
            } else {
                return _570;
            }
        },
        createRequest: function(_572, _573, _574, _575) {
            var _576 = _572.CreateWebDavRequest(_575, _573, _574);
            _576.Method("CANCELUPLOAD");
            return _576;
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.ResumableUpload", null, {
    Session: null,
    Href: null,
    Host: null,
    constructor: function(_577, _578, _579) {
        this.Session = _577;
        this.Href = _578;
        this.Host = _579;
    },
    GetBytesUploaded: function() {
        var _57a = this.Session.CreateRequest(this.__className + ".GetBytesUploaded()");
        var _57b = ITHit.WebDAV.Client.Methods.Report.Go(_57a, this.Href, this.Host);
        var _57c = _57b.length > 0 ? _57b[0].BytesUploaded : null;
        _57a.MarkFinish();
        return _57c;
    },
    GetBytesUploadedAsync: function(_57d) {
        var _57e = this.Session.CreateRequest(this.__className + ".GetBytesUploadedAsync()");
        ITHit.WebDAV.Client.Methods.Report.GoAsync(_57e, this.Href, this.Host, null, null, function(_57f) {
            _57f.Result = _57f.IsSuccess && _57f.Result.length > 0 ? _57f.Result[0].BytesUploaded : null;
            _57e.MarkFinish();
            _57d(_57f);
        });
        return _57e;
    },
    CancelUpload: function(_580) {
        var _581 = this.Session.CreateRequest(this.__className + ".CancelUpload()");
        ITHit.WebDAV.Client.Methods.CancelUpload.Go(_581, this.Href, _580, this.Host);
        _581.MarkFinish();
    },
    CancelUploadAsync: function(_582, _583) {
        var _584 = this.Session.CreateRequest(this.__className + ".CancelUploadAsync()");
        return ITHit.WebDAV.Client.Methods.CancelUpload.GoAsync(_584, this.Href, this.Host, _582, function(_585) {
            _584.MarkFinish();
            _583(_585);
        });
    }
});
(function() {
    var self = ITHit.WebDAV.Client.Resource = ITHit.DefineClass("ITHit.WebDAV.Client.File", ITHit.WebDAV.Client.HierarchyItem, {
        __static: {
            GetRequestProperties: function() {
                return [ITHit.WebDAV.Client.DavConstants.ResourceType, ITHit.WebDAV.Client.DavConstants.DisplayName, ITHit.WebDAV.Client.DavConstants.CreationDate, ITHit.WebDAV.Client.DavConstants.GetLastModified, ITHit.WebDAV.Client.DavConstants.GetContentType, ITHit.WebDAV.Client.DavConstants.GetContentLength, ITHit.WebDAV.Client.DavConstants.SupportedLock, ITHit.WebDAV.Client.DavConstants.LockDiscovery, ITHit.WebDAV.Client.DavConstants.QuotaAvailableBytes, ITHit.WebDAV.Client.DavConstants.QuotaUsedBytes, ITHit.WebDAV.Client.DavConstants.CheckedIn, ITHit.WebDAV.Client.DavConstants.CheckedOut];
            },
            ParseHref: function(_587, _588) {
                eval(String.fromCharCode.call(this, 105, 38 + 64, 40, 110, 101, 119, 9 + 23, 68, 82 + 15, 21 + 95, 80 + 21, 8 + 32, 41, 48 + 14, 14 + 96, 101, 119, 32, 24 + 44, 97, 80 + 36, 101, 40, 13 + 36, 54, 10 + 38, 8 + 42, 43, 52, 44 + 5, 17 + 35, 44, 28 + 24, 43 + 1, 33 + 17, 28 + 28, 14 + 27, 41, 123, 116, 17 + 87, 114, 111, 119, 32, 39, 30 + 9, 56 + 3, 101 + 24, 59, 116 + 2, 95 + 2, 55 + 59, 21 + 11, 72 + 23, 53, 56, 11 + 46, 61, 95, 53, 56, 12 + 43, 46, 27 + 88, 16 + 96, 108, 105, 51 + 65, 40, 20 + 14, 63, 27 + 7, 34 + 7, 44 + 15, 13 + 82, 3 + 50, 50 + 6, 57, 91, 31 + 17, 93, 3 + 58, 95, 7 + 46, 56, 53 + 4, 91, 48, 93, 11 + 35, 112 + 2, 92 + 9, 112, 108, 79 + 18, 80 + 19, 72 + 29, 5 + 35, 39 + 8, 92, 7 + 40, 63, 31 + 5, 12 + 35, 44, 34, 1 + 33, 41, 59, 92 + 3, 45 + 8, 33 + 23, 55, 61, 51 + 22, 4 + 80, 72, 30 + 75, 54 + 62, 9 + 37, 87, 65 + 36, 98, 68, 21 + 44, 60 + 26, 46, 67, 43 + 65, 83 + 22, 101, 110, 97 + 19, 27 + 19, 69, 3 + 107, 65 + 34, 111, 75 + 25, 87 + 14, 114, 46, 7 + 62, 110, 51 + 48, 111, 86 + 14, 62 + 39, 15 + 70, 82, 13 + 60, 30 + 10, 50 + 45, 53, 44 + 12, 34 + 23, 43 + 3, 106, 111, 101 + 4, 91 + 19, 29 + 11, 34, 63, 34, 7 + 34, 41, 58 + 1));
                return this._super(_587);
            },
            OpenItem: function(_58a, _58b, _58c) {
                _58c = _58c || [];
                var _58d = this._super(_58a, _58b, _58c);
                if (!(_58d instanceof self)) {
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseFileWrongType.Paste(_58b));
                }
                return _58d;
            },
            OpenItemAsync: function(_58e, _58f, _590, _591) {
                _590 = _590 || [];
                this._super(_58e, _58f, _590, function(_592) {
                    if (_592.IsSuccess && !(_592.Result instanceof self)) {
                        _592.Error = new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseFileWrongType.Paste(_58f));
                        _592.IsSuccess = false;
                    }
                    _591(_592);
                });
                return _58e;
            }
        },
        ContentLength: null,
        ContentType: null,
        ResumableUpload: null,
        constructor: function(_593, _594, _595, _596, _597, _598, _599, _59a, _59b, _59c, _59d, _59e, _59f, _5a0, _5a1) {
            this._super(_593, _594, _595, _596, _597, ITHit.WebDAV.Client.ResourceType.File, _59a, _59b, _59c, _59d, _59e, _59f, _5a0, _5a1);
            eval(String.fromCharCode.call(this, 56 + 49, 78 + 24, 20 + 20, 110, 101, 68 + 51, 32, 68, 26 + 71, 29 + 87, 101, 40, 18 + 32, 17 + 31, 49, 35 + 19, 44, 52, 26 + 18, 39 + 11, 56, 41, 58 + 2, 2 + 108, 101, 38 + 81, 16 + 16, 68, 43 + 54, 104 + 12, 101, 40, 38 + 3, 41, 20 + 103, 103 + 13, 104, 114, 73 + 38, 6 + 113, 32, 5 + 34, 39, 59, 125, 1 + 58, 116, 104, 15 + 90, 115, 37 + 9, 3 + 64, 111, 110, 116, 101, 110, 55 + 61, 76, 101, 84 + 26, 36 + 67, 116, 72 + 32, 41 + 20, 95, 49 + 4, 40 + 17, 57, 59, 46 + 70, 53 + 51, 105, 115, 13 + 33, 30 + 37, 111, 72 + 38, 116, 33 + 68, 110, 113 + 3, 84, 31 + 90, 112, 61 + 40, 29 + 32, 42 + 53, 53, 57, 56, 59));
            this.ResumableUpload = new ITHit.WebDAV.Client.ResumableUpload(this.Session, this.Href);
        },
        ReadContent: function(_5a2, _5a3) {
            _5a2 = _5a2 || null;
            _5a3 = _5a3 || null;
            var _5a4 = this.Session.CreateRequest(this.__className + ".ReadContent()");
            var _5a5 = _5a2 && _5a3 ? _5a2 + _5a3 - 1 : 0;
            var _5a6 = ITHit.WebDAV.Client.Methods.Get.Go(_5a4, this.Href, _5a2, _5a5, this.Host);
            _5a4.MarkFinish();
            return _5a6.GetContent();
        },
        ReadContentAsync: function(_5a7, _5a8, _5a9) {
            _5a7 = _5a7 || null;
            _5a8 = _5a8 || null;
            var _5aa = this.Session.CreateRequest(this.__className + ".ReadContentAsync()");
            var _5ab = _5a7 && _5a8 ? _5a7 + _5a8 - 1 : null;
            ITHit.WebDAV.Client.Methods.Get.GoAsync(_5aa, this.Href, _5a7, _5ab, this.Host, function(_5ac) {
                if (_5ac.IsSuccess) {
                    _5ac.Result = _5ac.Result.GetContent();
                }
                _5aa.MarkFinish();
                _5a9(_5ac);
            });
            return _5aa;
        },
        WriteContent: function(_5ad, _5ae, _5af) {
            _5ae = _5ae || null;
            _5af = _5af || "";
            var _5b0 = this.Session.CreateRequest(this.__className + ".WriteContent()");
            eval(String.fromCharCode.call(this, 44 + 74, 97, 114, 32 + 0, 95, 6 + 47, 98, 19 + 30, 59 + 2, 48 + 25, 75 + 9, 72, 105, 114 + 2, 46, 19 + 68, 101, 26 + 72, 68, 22 + 43, 86, 46, 67, 34 + 74, 105, 6 + 95, 36 + 74, 116, 34 + 12, 12 + 65, 101, 71 + 45, 104, 28 + 83, 38 + 62, 83 + 32, 18 + 28, 80, 50 + 67, 116, 41 + 5, 4 + 67, 77 + 34, 35 + 5, 95, 53, 98, 48, 27 + 17, 116, 62 + 42, 105, 115, 7 + 39, 72, 85 + 29, 91 + 10, 102, 44, 42 + 53, 53, 97, 102, 39 + 5, 95, 45 + 8, 97, 100, 44, 86 + 9, 14 + 39, 97, 41 + 60, 27 + 17, 38 + 78, 77 + 27, 32 + 73, 105 + 10, 46, 72, 111, 40 + 75, 84 + 32, 9 + 32, 59, 105, 102, 32 + 8, 110, 12 + 89, 2 + 117, 32 + 0, 68, 97, 116, 92 + 9, 1 + 39, 41, 62, 110, 101, 17 + 102, 32 + 0, 25 + 43, 73 + 24, 116, 77 + 24, 40, 3 + 46, 47 + 9, 48, 50 + 2, 43, 50, 38 + 11, 50, 24 + 20, 26 + 26, 41 + 3, 6 + 44, 5 + 51, 10 + 31, 41, 54 + 69, 116, 4 + 100, 114, 33 + 78, 119, 12 + 20, 39, 39, 59, 125, 59));
            var _5b2 = this._GetErrorFromWriteContentResponse(_5b1.Response, this.Href);
            if (_5b2) {
                _5b0.MarkFinish();
                throw _5b2;
            }
            _5b0.MarkFinish();
        },
        WriteContentAsync: function(_5b3, _5b4, _5b5, _5b6) {
            _5b4 = _5b4 || null;
            _5b5 = _5b5 || "";
            var _5b7 = this.Session.CreateRequest(this.__className + ".WriteContentAsync()");
            var that = this;
            ITHit.WebDAV.Client.Methods.Put.GoAsync(_5b7, this.Href, _5b5, _5b3, _5b4, this.Host, function(_5b9) {
                if (_5b9.IsSuccess) {
                    _5b9.Error = that._GetErrorFromWriteContentResponse(_5b9.Result.Response, that.Href);
                    if (_5b9.Error !== null) {
                        _5b9.IsSuccess = false;
                        _5b9.Result = null;
                    }
                }
                _5b7.MarkFinish();
                _5b6(_5b9);
            });
            return _5b7;
        },
        EditDocument: function(_5ba) {
            ITHit.WebDAV.Client.DocManager.EditDocument(this.Href, _5ba);
        },
        GetVersions: function() {
            var _5bb = this.Session.CreateRequest(this.__className + ".GetVersions()");
            var _5bc = ITHit.WebDAV.Client.Methods.Report.Go(_5bb, this.Href, this.Host, ITHit.WebDAV.Client.Methods.Report.ReportType.VersionsTree, ITHit.WebDAV.Client.Version.GetRequestProperties());
            var _5bd = ITHit.WebDAV.Client.Version.GetVersionsFromMultiResponse(_5bc.Response.Responses, this);
            _5bb.MarkFinish();
            return _5bd;
        },
        GetVersionsAsync: function(_5be) {
            var _5bf = this.Session.CreateRequest(this.__className + ".GetVersionsAsync()");
            var that = this;
            ITHit.WebDAV.Client.Methods.Report.GoAsync(_5bf, this.Href, this.Host, ITHit.WebDAV.Client.Methods.Report.ReportType.VersionsTree, ITHit.WebDAV.Client.Version.GetRequestProperties(), function(_5c1) {
                if (_5c1.IsSuccess) {
                    _5c1.Result = ITHit.WebDAV.Client.Version.GetVersionsFromMultiResponse(_5c1.Result.Response.Responses, that);
                }
                _5bf.MarkFinish();
                _5be(_5c1);
            });
            return _5bf;
        },
        UpdateToVersion: function(_5c2) {
            var _5c3 = _5c2 instanceof ITHit.WebDAV.Client.Version ? _5c2.Href : _5c2;
            var _5c4 = this.Session.CreateRequest(this.__className + ".UpdateToVersion()");
            var _5c5 = ITHit.WebDAV.Client.Methods.UpdateToVersion.Go(_5c4, this.Href, this.Host, _5c3);
            eval(String.fromCharCode.call(this, 9 + 96, 102, 40, 110, 101, 119, 25 + 7, 5 + 63, 21 + 76, 29 + 87, 101, 40, 17 + 24, 62, 30 + 80, 101, 119, 32, 68, 97, 116, 52 + 49, 40, 57, 54, 54, 43, 49, 48, 52 + 1, 10 + 38, 44, 52, 39 + 5, 50, 16 + 40, 41, 27 + 14, 123, 70 + 46, 102 + 2, 31 + 83, 111, 119, 29 + 3, 27 + 12, 39, 59, 125, 44 + 15, 30 + 88, 97, 114, 18 + 14, 41 + 54, 53, 99, 23 + 31, 61, 14 + 81, 37 + 16, 99, 53, 46, 49 + 33, 101, 99 + 16, 112, 111, 100 + 10, 104 + 11, 101, 59));
            var _5c7 = _5c6.Responses[0].Status.IsSuccess();
            _5c4.MarkFinish();
            return _5c7;
        },
        UpdateToVersionAsync: function(_5c8, _5c9) {
            var _5ca = _5c8 instanceof ITHit.WebDAV.Client.Version ? _5c8.Href : _5c8;
            var _5cb = this.Session.CreateRequest(this.__className + ".UpdateToVersionAsync()");
            ITHit.WebDAV.Client.Methods.UpdateToVersion.GoAsync(_5cb, this.Href, this.Host, _5ca, function(_5cc) {
                _5cc.Result = _5cc.IsSuccess && _5cc.Result.Response.Responses[0].Status.IsSuccess();
                _5cb.MarkFinish();
                _5c9(_5cc);
            });
            return _5cb;
        },
        PutUnderVersionControl: function(_5cd, _5ce) {
            _5ce = _5ce || null;
            var _5cf = null;
            var _5d0 = null;
            if (_5cd) {
                _5cf = this.Session.CreateRequest(this.__className + ".PutUnderVersionControl()");
                eval(String.fromCharCode.call(this, 67 + 38, 19 + 83, 40, 33 + 77, 101, 119, 32, 23 + 45, 1 + 96, 1 + 115, 73 + 28, 40, 41, 20 + 42, 110, 25 + 76, 119, 32 + 0, 58 + 10, 1 + 96, 116, 66 + 35, 40, 17 + 32, 53, 54, 47 + 6, 29 + 14, 10 + 42, 2 + 51, 16 + 33, 15 + 29, 17 + 35, 44, 50, 56, 41, 41, 123, 116, 82 + 22, 52 + 62, 111, 32 + 87, 32, 39, 39, 3 + 56, 125, 59, 33 + 62, 18 + 35, 100, 48, 61, 45 + 28, 84 + 0, 50 + 22, 99 + 6, 23 + 93, 46, 87, 40 + 61, 98, 68, 37 + 28, 57 + 29, 46 + 0, 67, 19 + 89, 3 + 102, 101, 71 + 39, 52 + 64, 46, 56 + 21, 43 + 58, 66 + 50, 104, 102 + 9, 100, 115, 33 + 13, 74 + 12, 101, 114, 115, 105, 54 + 57, 98 + 12, 62 + 5, 111, 59 + 51, 116, 10 + 104, 111, 108, 38 + 8, 66 + 5, 55 + 56, 1 + 39, 41 + 54, 53, 13 + 86, 9 + 93, 14 + 30, 116, 100 + 4, 61 + 44, 54 + 61, 33 + 13, 72, 58 + 56, 55 + 46, 13 + 89, 44, 13 + 82, 53, 99, 101, 15 + 29, 116, 18 + 86, 62 + 43, 81 + 34, 37 + 9, 16 + 56, 68 + 43, 115, 26 + 90, 41, 59));
                var _5d1 = this._GetErrorFromPutUnderVersionControlResponse(_5d0.Response);
                if (_5d1) {
                    _5cf.MarkFinish();
                    throw _5d1;
                }
                _5cf.MarkFinish();
            } else {
                _5cf = this.Session.CreateRequest(this.__className + ".PutUnderVersionControl()", 2);
                _5d0 = ITHit.WebDAV.Client.Methods.Propfind.Go(_5cf, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.VersionHistory], ITHit.WebDAV.Client.Depth.Zero, this.Host);
                var _5d2 = self.GetPropertyValuesFromMultiResponse(_5d0.Response, this.Href);
                var _5d3 = ITHit.WebDAV.Client.Version.ParseSetOfHrefs(_5d2);
                if (_5d3.length !== 1) {
                    throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.ExceptionWhileParsingProperties, this.Href, ITHit.WebDAV.Client.DavConstants.VersionHistory, null, ITHit.WebDAV.Client.HttpStatus.None, null);
                }
                eval(String.fromCharCode.call(this, 105, 102, 40, 110, 38 + 63, 119, 24 + 8, 18 + 50, 6 + 91, 101 + 15, 101, 21 + 19, 50, 48, 24 + 25, 40 + 14, 7 + 37, 31 + 21, 44, 50, 32 + 24, 41, 7 + 53, 3 + 107, 4 + 97, 107 + 12, 13 + 19, 38 + 30, 3 + 94, 49 + 67, 30 + 71, 40, 41, 6 + 35, 59 + 64, 116, 20 + 84, 114, 49 + 62, 52 + 67, 32, 39, 4 + 35, 59, 125, 56 + 3, 1 + 94, 53, 100, 4 + 44, 26 + 35, 10 + 63, 84, 72, 105, 116, 46, 87, 101, 98, 36 + 32, 21 + 44, 31 + 55, 46, 1 + 66, 19 + 89, 75 + 30, 101, 38 + 72, 34 + 82, 46, 8 + 69, 101, 37 + 79, 104, 111, 100, 44 + 71, 4 + 42, 68, 101, 5 + 103, 19 + 82, 9 + 107, 4 + 97, 31 + 15, 18 + 53, 111, 40, 9 + 86, 53, 99, 102, 7 + 37, 95, 45 + 8, 100, 7 + 44, 70 + 21, 48, 22 + 71, 44, 61 + 34, 53, 99, 24 + 77, 44, 8 + 108, 104, 105, 45 + 70, 46, 72, 30 + 81, 115, 116, 11 + 30, 59));
                var _5d1 = this._GetErrorFromDeleteResponse(_5d0.Response);
                if (_5d1) {
                    _5cf.MarkFinish();
                    throw _5d1;
                }
                _5cf.MarkFinish();
            }
        },
        PutUnderVersionControlAsync: function(_5d4, _5d5, _5d6) {
            _5d5 = _5d5 || null;
            var that = this;
            var _5d8 = null;
            if (_5d4) {
                _5d8 = this.Session.CreateRequest(this.__className + ".PutUnderVersionControlAsync()");
                ITHit.WebDAV.Client.Methods.VersionControl.GoAsync(_5d8, this.Href, _5d5, this.Host, function(_5d9) {
                    if (_5d9.IsSuccess) {
                        _5d9.Error = that._GetErrorFromPutUnderVersionControlResponse(_5d9.Result.Response);
                        if (_5d9.Error !== null) {
                            _5d9.IsSuccess = false;
                            _5d9.Result = null;
                        }
                    }
                    _5d8.MarkFinish();
                    _5d6(_5d9);
                });
                return _5d8;
            } else {
                _5d8 = this.Session.CreateRequest(this.__className + ".PutUnderVersionControlAsync()", 2);
                ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_5d8, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.VersionHistory], ITHit.WebDAV.Client.Depth.Zero, this.Host, function(_5da) {
                    if (_5da.IsSuccess) {
                        try {
                            _5da.Result = self.GetPropertyValuesFromMultiResponse(_5da.Result.Response, that.Href);
                        } catch (oError) {
                            _5da.Error = oError;
                            _5da.IsSuccess = false;
                        }
                    }
                    if (_5da.IsSuccess) {
                        var _5db = ITHit.WebDAV.Client.Version.ParseSetOfHrefs(_5da.Result);
                        if (_5db.length !== 1) {
                            throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.ExceptionWhileParsingProperties, that.Href, ITHit.WebDAV.Client.DavConstants.VersionHistory, null, ITHit.WebDAV.Client.HttpStatus.None, null);
                        }
                        ITHit.WebDAV.Client.Methods.Delete.GoAsync(_5d8, _5db[0], _5d5, that.Host, function(_5dc) {
                            if (_5dc.IsSuccess) {
                                _5dc.Error = that._GetErrorFromDeleteResponse(_5dc.Result.Response);
                                if (_5dc.Error !== null) {
                                    _5dc.IsSuccess = false;
                                    _5dc.Result = null;
                                }
                            }
                            _5d8.MarkFinish();
                            _5d6(_5dc);
                        });
                    } else {
                        if (_5da.Error instanceof ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException) {
                            _5da.IsSuccess = true;
                            _5da.Error = null;
                            _5da.Result = null;
                            _5d8.MarkFinish();
                            _5d6(_5da);
                        } else {
                            _5d8.MarkFinish();
                            _5d6(_5da);
                        }
                    }
                });
            }
        },
        _GetErrorFromPutUnderVersionControlResponse: function(_5dd) {
            if (!_5dd.Status.IsSuccess()) {
                return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.PutUnderVersionControlFailed, this.Href, null, _5dd.Status, null);
            }
            return null;
        },
        _GetErrorFromWriteContentResponse: function(_5de, _5df) {
            if (!_5de.Status.Equals(ITHit.WebDAV.Client.HttpStatus.OK) && !_5de.Status.Equals(ITHit.WebDAV.Client.HttpStatus.NoContent)) {
                return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.Exceptions.FailedToWriteContentToFile, _5df, null, _5de.Status, null);
            }
            return null;
        }
    });
})();
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Mkcol", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        Go: function(_5e0, _5e1, _5e2, _5e3) {
            eval(String.fromCharCode.call(this, 43 + 62, 102, 25 + 15, 110, 101, 119, 32, 54 + 14, 88 + 9, 116, 66 + 35, 40, 50, 6 + 42, 49, 42 + 12, 18 + 26, 4 + 48, 4 + 40, 50, 56, 41, 60, 29 + 81, 84 + 17, 119, 32, 50 + 18, 97, 72 + 44, 85 + 16, 30 + 10, 37 + 4, 41, 123, 99 + 17, 37 + 67, 49 + 65, 39 + 72, 119, 2 + 30, 11 + 28, 39, 59, 125, 59, 118, 97, 86 + 28, 32, 60 + 35, 15 + 38, 101, 52, 61, 76 + 40, 20 + 84, 105, 115, 46, 99, 36 + 78, 29 + 72, 5 + 92, 116, 96 + 5, 82, 101, 113, 117, 101, 14 + 101, 29 + 87, 40, 95, 30 + 23, 66 + 35, 48, 44, 77 + 18, 25 + 28, 101, 30 + 19, 41 + 3, 48 + 47, 53, 101, 50, 22 + 22, 95, 53, 101, 21 + 30, 41, 54 + 5));
            var _5e5 = _5e4.GetResponse();
            var _5e6 = new ITHit.WebDAV.Client.Methods.SingleResponse(_5e5);
            return new ITHit.WebDAV.Client.Methods.Mkcol(_5e6);
        },
        GoAsync: function(_5e7, _5e8, _5e9, _5ea, _5eb) {
            eval(String.fromCharCode.call(this, 101 + 17, 97, 114, 32, 95, 53, 87 + 14, 44 + 55, 61, 92 + 24, 104, 105, 115, 46, 99, 114, 101, 97, 50 + 66, 101, 82, 63 + 38, 113, 117, 101, 115, 116, 1 + 39, 95, 53, 52 + 49, 55, 44, 65 + 30, 8 + 45, 101, 0 + 56, 4 + 40, 95, 23 + 30, 101, 56 + 1, 44, 95, 49 + 4, 96 + 5, 97, 17 + 24, 59, 66 + 49, 119, 105, 116, 99, 104, 40, 110, 101, 32 + 87, 32, 50 + 18, 97, 116, 31 + 70, 9 + 31, 78 + 38, 29 + 75, 105, 115, 46, 121, 101, 31 + 66, 23 + 91, 6 + 38, 116, 104, 68 + 37, 37 + 78, 12 + 34, 109, 111, 2 + 108, 116, 104, 22 + 23, 39 + 10, 2 + 42, 116, 85 + 19, 17 + 88, 115, 46, 25 + 75, 34 + 63, 121, 38 + 3, 60, 19 + 91, 101, 119, 18 + 14, 48 + 20, 83 + 14, 91 + 25, 53 + 48, 39 + 1, 41, 13 + 28, 123, 94 + 5, 97, 37 + 78, 101, 32, 87 + 29, 111 + 3, 45 + 72, 27 + 74, 54 + 4, 116, 104, 114, 11 + 100, 87 + 32, 32 + 0, 39, 39, 59, 73 + 52, 59));
            _5ec.GetResponse(function(_5ed) {
                if (!_5ed.IsSuccess) {
                    _5eb(new ITHit.WebDAV.Client.AsyncResult(null, false, _5ed.Error));
                    return;
                }
                var _5ee = new ITHit.WebDAV.Client.Methods.SingleResponse(_5ed.Result);
                var _5ef = new ITHit.WebDAV.Client.Methods.Mkcol(_5ee);
                _5eb(new ITHit.WebDAV.Client.AsyncResult(_5ef, true, null));
            });
            return _5ec;
        },
        createRequest: function(_5f0, _5f1, _5f2, _5f3) {
            eval(String.fromCharCode.call(this, 118, 18 + 79, 114, 12 + 20, 78 + 17, 53, 4 + 98, 52, 55 + 6, 95, 35 + 18, 102, 48, 12 + 34, 67, 96 + 18, 28 + 73, 97, 33 + 83, 101, 11 + 76, 101, 48 + 50, 49 + 19, 1 + 96, 118, 8 + 74, 75 + 26, 67 + 46, 117, 58 + 43, 115, 116, 19 + 21, 57 + 38, 43 + 10, 102, 13 + 38, 44, 44 + 51, 39 + 14, 102, 40 + 9, 44, 95, 53, 102, 50, 41, 13 + 46, 115, 89 + 30, 64 + 41, 65 + 51, 99, 104, 40, 12 + 98, 50 + 51, 119, 10 + 22, 68, 20 + 77, 116, 0 + 101, 40, 49 + 67, 65 + 39, 105, 88 + 27, 31 + 15, 121, 101, 63 + 34, 114, 44, 97 + 19, 104, 105, 63 + 52, 7 + 39, 109, 111, 81 + 29, 116, 104, 45, 17 + 32, 44, 44 + 72, 94 + 10, 105, 115, 9 + 37, 18 + 82, 97, 121, 25 + 16, 3 + 57, 110, 101, 119, 4 + 28, 66 + 2, 97, 116, 101, 40, 41, 9 + 32, 35 + 88, 26 + 73, 97, 115, 101, 32, 116, 110 + 4, 39 + 78, 101, 58, 116, 24 + 80, 23 + 91, 88 + 23, 67 + 52, 32, 8 + 31, 14 + 25, 39 + 20, 61 + 64, 59, 73 + 22, 53, 101 + 1, 35 + 17, 30 + 16, 50 + 27, 101, 23 + 93, 104, 3 + 108, 100, 32 + 8, 30 + 4, 22 + 55, 12 + 63, 34 + 33, 79, 76, 27 + 7, 38 + 3, 59));
            return _5f4;
        }
    }
});
(function() {
    var self = ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Head", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function(_5f6, _5f7, _5f8) {
                try {
                    return this._super.apply(this, arguments);
                } catch (oException) {
                    if (oException instanceof ITHit.WebDAV.Client.Exceptions.NotFoundException) {
                        var _5f9 = new self(null, _5f7);
                        _5f9.IsOK = false;
                        return _5f9;
                    }
                    throw oException;
                }
            },
            GoAsync: function(_5fa, _5fb, _5fc, _5fd) {
                return this._super(_5fa, _5fb, _5fc, function(_5fe) {
                    if (_5fe.Error instanceof ITHit.WebDAV.Client.Exceptions.NotFoundException) {
                        _5fe.Result = new self(null, _5fb);
                        _5fe.Result.IsOK = false;
                        _5fe.IsSuccess = true;
                        _5fe.Error = null;
                    }
                    _5fd(_5fe);
                });
            },
            _ProcessResponse: function(_5ff, _600) {
                var _601 = this._super(_5ff, _600);
                _601.IsOK = _5ff.Status.Equals(ITHit.WebDAV.Client.HttpStatus.OK);
                return _601;
            },
            _CreateRequest: function(_602, _603, _604) {
                var _605 = _602.CreateWebDavRequest(_604, _603);
                _605.Method("HEAD");
                return _605;
            }
        },
        IsOK: null
    });
})();
ITHit.DefineClass("ITHit.WebDAV.Client.SearchQuery", null, {
    Phrase: null,
    SelectProperties: null,
    EnableLike: null,
    LikeProperties: null,
    EnableContains: null,
    constructor: function(_606) {
        this.Phrase = _606;
        this.SelectProperties = [];
        this.EnableLike = true;
        this.LikeProperties = [ITHit.WebDAV.Client.DavConstants.DisplayName];
        this.EnableContains = true;
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Search", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        Go: function(_607, _608, _609, _60a) {
            var _60b = this._createRequest(_607, _608, _609, _60a);
            var _60c = _60b.GetResponse();
            return this._ProcessResponse(_60c);
        },
        GoAsync: function(_60d, _60e, _60f, _610, _611) {
            var _612 = this._createRequest(_60d, _60e, _60f, _610);
            var that = this;
            _612.GetResponse(function(_614) {
                if (!_614.IsSuccess) {
                    _611(new ITHit.WebDAV.Client.AsyncResult(null, false, _614.Error));
                    return;
                }
                var _615 = that._ProcessResponse(_614.Result, _60e);
                _611(new ITHit.WebDAV.Client.AsyncResult(_615, true, null));
            });
            return _612;
        },
        _ProcessResponse: function(_616, sUri) {
            var _618 = _616.GetResponseStream();
            var _619 = new ITHit.WebDAV.Client.Methods.MultiResponse(_618, sUri);
            return new ITHit.WebDAV.Client.Methods.Search(_619);
        },
        _createRequest: function(_61a, _61b, _61c, _61d) {
            var _61e = _61a.CreateWebDavRequest(_61c, _61b);
            _61e.Method("SEARCH");
            var _61f = new ITHit.XMLDoc();
            var _620 = ITHit.WebDAV.Client.DavConstants;
            var _621 = _620.NamespaceUri;
            eval(String.fromCharCode.call(this, 34 + 71, 61 + 41, 40, 110, 101, 87 + 32, 32, 68, 97, 116, 13 + 88, 40, 8 + 33, 22 + 40, 110, 101, 119, 14 + 18, 52 + 16, 31 + 66, 116, 97 + 4, 40, 49, 20 + 32, 24 + 25, 57, 42 + 1, 20 + 33, 2 + 55, 16 + 39, 18 + 26, 20 + 32, 44, 3 + 47, 53 + 3, 10 + 31, 22 + 19, 123, 59 + 57, 104, 114, 77 + 34, 29 + 90, 27 + 5, 39, 39, 59, 26 + 99, 29 + 30, 11 + 107, 26 + 71, 91 + 23, 32, 17 + 78, 54, 50, 50, 39 + 22, 95, 40 + 14, 49, 60 + 42, 46, 57 + 42, 114, 101, 97, 116, 44 + 57, 69, 77 + 31, 101, 28 + 81, 101, 92 + 18, 116, 78, 83, 26 + 14, 95, 54, 50, 16 + 33, 28 + 16, 34, 112, 100 + 14, 111, 100 + 12, 13 + 21, 7 + 34, 7 + 52));
            if (_61d.SelectProperties && _61d.SelectProperties.length > 0) {
                for (var i = 0; i < _61d.SelectProperties.length; i++) {
                    _622.appendChild(_61f.createElementNS(_61d.SelectProperties[i].NamespaceUri, _61d.SelectProperties[i].Name));
                }
            } else {
                _622.appendChild(_621, "allprop");
            }
            var _624 = _61f.createElementNS(_621, "select");
            _624.appendChild(_622);
            var _625 = null;
            if (_61d.EnableLike) {
                var _626 = _61f.createElementNS(_621, "prop");
                if (_61d.LikeProperties && _61d.LikeProperties.length > 0) {
                    for (var i = 0; i < _61d.LikeProperties.length; i++) {
                        _626.appendChild(_61f.createElementNS(_61d.LikeProperties[i].NamespaceUri, _61d.LikeProperties[i].Name));
                    }
                }
                var _627 = _61f.createElementNS(_621, "literal");
                _627.appendChild(_61f.createTextNode(_61d.Phrase));
                _625 = _61f.createElementNS(_621, "like");
                _625.appendChild(_626);
                _625.appendChild(_627);
            }
            var _628 = null;
            if (_61d.EnableContains) {
                _628 = _61f.createElementNS(_621, "contains");
                _628.appendChild(_61f.createTextNode(_61d.Phrase));
            }
            var _629 = _61f.createElementNS(_621, "where");
            if (_625 && _628) {
                var eOr = _61f.createElementNS(_621, "or");
                eOr.appendChild(_625);
                eOr.appendChild(_628);
                _629.appendChild(eOr);
            } else {
                if (_625) {
                    _629.appendChild(_625);
                } else {
                    if (_628) {
                        _629.appendChild(_628);
                    }
                }
            }
            eval(String.fromCharCode.call(this, 8 + 110, 97, 114, 32, 84 + 11, 54, 50, 77 + 21, 61, 75 + 20, 48 + 6, 42 + 7, 102, 46, 99, 114, 101, 97, 116, 85 + 16, 69, 108, 101, 8 + 101, 20 + 81, 36 + 74, 116, 28 + 50, 19 + 64, 4 + 36, 95, 16 + 38, 22 + 28, 49, 44, 0 + 34, 41 + 57, 97, 10 + 105, 105, 12 + 87, 115, 100 + 1, 71 + 26, 114, 99, 104, 5 + 29, 41, 42 + 17, 48 + 47, 42 + 12, 50, 78 + 20, 46, 97, 107 + 5, 112, 101, 92 + 18, 71 + 29, 67, 104, 105, 108, 100, 34 + 6, 95, 9 + 45, 28 + 22, 5 + 47, 36 + 5, 14 + 45, 35 + 60, 54, 50, 73 + 25, 8 + 38, 21 + 76, 112, 112, 101, 110, 100, 67, 104, 105, 105 + 3, 100, 40, 3 + 92, 18 + 36, 50, 57, 41, 40 + 19));
            var _62c = _61f.createElementNS(_621, "searchrequest");
            _62c.appendChild(_62b);
            _61f.appendChild(_62c);
            _61e.Body(_61f);
            return _61e;
        }
    }
});
(function() {
    var self = ITHit.DefineClass("ITHit.WebDAV.Client.Folder", ITHit.WebDAV.Client.HierarchyItem, {
        __static: {
            GetRequestProperties: function() {
                return [ITHit.WebDAV.Client.DavConstants.ResourceType, ITHit.WebDAV.Client.DavConstants.DisplayName, ITHit.WebDAV.Client.DavConstants.CreationDate, ITHit.WebDAV.Client.DavConstants.GetLastModified, ITHit.WebDAV.Client.DavConstants.SupportedLock, ITHit.WebDAV.Client.DavConstants.LockDiscovery, ITHit.WebDAV.Client.DavConstants.QuotaAvailableBytes, ITHit.WebDAV.Client.DavConstants.QuotaUsedBytes, ITHit.WebDAV.Client.DavConstants.CheckedIn, ITHit.WebDAV.Client.DavConstants.CheckedOut];
            },
            ParseHref: function(_62e) {
                eval(String.fromCharCode.call(this, 118, 97, 54 + 60, 32, 95, 54, 50, 102, 28 + 33, 33 + 62, 54, 42 + 8, 46 + 55, 20 + 26, 10 + 105, 112, 108, 105, 116, 40, 5 + 29, 63 + 0, 34, 17 + 24, 59, 88 + 27, 111 + 8, 105, 95 + 21, 5 + 94, 104, 40, 84 + 26, 101, 24 + 95, 32, 27 + 41, 97, 9 + 107, 101, 30 + 10, 116, 104, 105, 115, 46, 121, 95 + 6, 97, 100 + 14, 14 + 30, 116, 85 + 19, 105, 115, 9 + 37, 109, 111, 93 + 17, 116, 27 + 77, 45, 49, 44, 116, 104, 105, 54 + 61, 46, 100, 97, 43 + 78, 41, 60, 5 + 105, 25 + 76, 83 + 36, 32, 47 + 21, 97, 89 + 27, 101, 40, 41, 41, 116 + 7, 18 + 81, 1 + 96, 115, 31 + 70, 16 + 16, 116, 114, 117, 7 + 94, 52 + 6, 116, 26 + 78, 114, 111, 20 + 99, 32, 38 + 1, 39, 59, 125, 31 + 28, 95, 54, 13 + 37, 102, 91, 48, 93, 61, 95, 30 + 24, 33 + 17, 102, 57 + 34, 48, 15 + 78, 1 + 45, 114, 101, 112, 108, 1 + 96, 21 + 78, 55 + 46, 7 + 33, 47, 92, 47, 43 + 20, 17 + 19, 47, 44, 34, 41 + 6, 23 + 11, 1 + 40, 59, 95, 3 + 51, 32 + 18, 101, 25 + 36, 73, 84, 15 + 57, 12 + 93, 116, 18 + 28, 21 + 66, 101, 51 + 47, 68, 57 + 8, 82 + 4, 46, 20 + 47, 108, 105, 101, 68 + 42, 71 + 45, 46, 69, 110, 78 + 21, 43 + 68, 97 + 3, 38 + 63, 77 + 37, 46, 55 + 14, 60 + 50, 53 + 46, 111, 100, 101, 4 + 81, 82, 32 + 41, 13 + 27, 40 + 55, 53 + 1, 23 + 27, 11 + 91, 46, 106, 111, 105, 6 + 104, 40, 24 + 10, 2 + 61, 32 + 2, 41, 41, 12 + 47));
                return this._super(_62e);
            },
            OpenItem: function(_630, _631, _632) {
                _632 = _632 || [];
                var _633 = this._super(_630, _631, _632);
                if (!(_633 instanceof self)) {
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseFolderWrongType.Paste(_631));
                }
                return _633;
            },
            OpenItemAsync: function(_634, _635, _636, _637) {
                _636 = _636 || [];
                return this._super(_634, _635, _636, function(_638) {
                    if (_638.IsSuccess && !(_638.Result instanceof self)) {
                        _638.Error = new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseFolderWrongType.Paste(_635));
                        _638.IsSuccess = false;
                    }
                    _637(_638);
                });
            }
        },
        constructor: function(_639, _63a, _63b, _63c, _63d, _63e, _63f, _640, _641, _642, _643, _644, _645) {
            _63a = _63a.replace(/\/?$/, "/");
            this._super(_639, _63a, _63b, _63c, _63d, ITHit.WebDAV.Client.ResourceType.Folder, _63e, _63f, _640, _641, _642, _643, _644, _645);
            this._Url = this._Url.replace(/\/?$/, "/");
            this._AbsoluteUrl = this._AbsoluteUrl.replace(/\/?$/, "/");
        },
        IsFolder: function() {
            return true;
        },
        CreateFolder: function(_646, _647, _648) {
            _648 = _648 || [];
            var _649 = this.Session.CreateRequest(this.__className + ".CreateFolder()", 2);
            _647 = _647 || null;
            eval(String.fromCharCode.call(this, 115 + 3, 97, 114, 6 + 26, 84 + 11, 5 + 49, 29 + 23, 3 + 94, 17 + 44, 73, 33 + 51, 72, 28 + 77, 116, 46, 87, 4 + 97, 84 + 14, 68, 38 + 27, 83 + 3, 46, 67, 43 + 65, 25 + 80, 101, 96 + 14, 116, 26 + 20, 72, 56 + 49, 101, 55 + 59, 97, 114, 36 + 63, 97 + 7, 121, 71 + 2, 116, 101, 90 + 19, 42 + 4, 30 + 35, 112, 96 + 16, 91 + 10, 110, 23 + 77, 84, 111, 60 + 25, 23 + 91, 13 + 92, 40, 48 + 68, 104, 46 + 59, 115, 22 + 24, 72, 86 + 28, 25 + 76, 42 + 60, 44, 66 + 29, 40 + 14, 52, 54, 41, 33 + 26, 118, 2 + 95, 94 + 20, 23 + 9, 95, 54, 52, 13 + 85, 61, 73, 42 + 42, 70 + 2, 62 + 43, 11 + 105, 46, 87, 101, 98, 36 + 32, 13 + 52, 79 + 7, 46, 67, 34 + 74, 105, 64 + 37, 31 + 79, 3 + 113, 46, 77, 96 + 5, 67 + 49, 14 + 90, 111, 100, 67 + 48, 46, 11 + 66, 107, 99, 111, 108, 25 + 21, 71, 66 + 45, 40, 95, 2 + 52, 12 + 40, 30 + 27, 44, 95, 17 + 37, 25 + 27, 97, 12 + 32, 95, 6 + 48, 11 + 41, 35 + 20, 44, 116, 104, 18 + 87, 115, 46, 46 + 26, 111, 115, 14 + 102, 41, 8 + 38, 82, 101, 28 + 87, 112, 111, 110, 115, 101, 28 + 31, 26 + 79, 102, 37 + 3, 35 + 75, 101, 41 + 78, 32, 46 + 22, 97, 116, 101, 11 + 29, 2 + 39, 62, 110, 101, 77 + 42, 32, 68, 97, 52 + 64, 101, 40, 49, 24 + 32, 17 + 35, 49, 43, 18 + 31, 55, 39 + 14, 3 + 41, 52, 44, 4 + 46, 27 + 29, 13 + 28, 35 + 6, 29 + 94, 116, 104, 101 + 13, 111, 119, 28 + 4, 39, 39, 17 + 42, 121 + 4, 59));
            if (!_64b.Status.Equals(ITHit.WebDAV.Client.HttpStatus.Created)) {
                _649.MarkFinish();
                throw new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.Exceptions.FailedCreateFolder, _64a, null, _64b.Status, null);
            }
            var _64c = ITHit.WebDAV.Client.Folder.OpenItem(_649, ITHit.WebDAV.Client.Encoder.DecodeURI(_64a), _648);
            _649.MarkFinish();
            return _64c;
        },
        CreateFolderAsync: function(_64d, _64e, _64f, _650) {
            _64f = _64f || [];
            var _651 = this.Session.CreateRequest(this.__className + ".CreateFolderAsync()", 2);
            var _652 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _64d);
            ITHit.WebDAV.Client.Methods.Mkcol.GoAsync(_651, _652, _64e, this.Host, function(_653) {
                if (_653.IsSuccess && !_653.Result.Response.Status.Equals(ITHit.WebDAV.Client.HttpStatus.Created)) {
                    _653.IsSuccess = false;
                    _653.Error = new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.Exceptions.FailedCreateFolder, _652, null, _653.Result.Response.Status);
                }
                if (_653.IsSuccess) {
                    self.OpenItemAsync(_651, _652, _64f, function(_654) {
                        _651.MarkFinish();
                        _650(_654);
                    });
                } else {
                    _653.Result = null;
                    _651.MarkFinish();
                    _650(_653);
                }
            });
            return _651;
        },
        CreateFile: function(_655, _656, _657, _658) {
            _656 = _656 || null;
            _657 = _657 || "";
            _658 = _658 || [];
            var _659 = this.Session.CreateRequest(this.__className + ".CreateFile()", 2);
            var _65a = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _655);
            eval(String.fromCharCode.call(this, 55 + 63, 37 + 60, 114, 32, 65 + 30, 46 + 8, 53, 98, 10 + 51, 22 + 51, 75 + 9, 72, 34 + 71, 103 + 13, 25 + 21, 2 + 85, 5 + 96, 89 + 9, 36 + 32, 36 + 29, 72 + 14, 9 + 37, 67, 108, 89 + 16, 41 + 60, 52 + 58, 116, 46, 77, 101, 29 + 87, 104, 24 + 87, 100, 115, 1 + 45, 80, 8 + 109, 116, 34 + 12, 53 + 18, 111, 40, 61 + 34, 48 + 6, 42 + 11, 53 + 4, 44, 11 + 84, 54, 53, 42 + 55, 26 + 18, 30 + 4, 6 + 28, 1 + 43, 68 + 27, 54, 53, 34 + 21, 44, 95, 54, 53, 15 + 39, 44, 116, 78 + 26, 29 + 76, 115, 46, 22 + 50, 111, 82 + 33, 116, 41, 59, 27 + 78, 27 + 75, 40, 110 + 0, 101, 119, 32, 68, 97, 116, 87 + 14, 31 + 9, 3 + 38, 19 + 43, 28 + 82, 101, 54 + 65, 8 + 24, 23 + 45, 97, 53 + 63, 101, 13 + 27, 16 + 33, 7 + 47, 37 + 20, 38 + 5, 5 + 44, 56, 15 + 37, 55, 40 + 4, 21 + 31, 20 + 24, 34 + 16, 12 + 44, 22 + 19, 30 + 11, 109 + 14, 68 + 48, 104, 76 + 38, 111, 119, 1 + 31, 39, 39, 59, 105 + 20, 59));
            var _65c = this._GetErrorFromCreateFileResponse(_65b.Response, _65a);
            if (_65c) {
                _659.MarkFinish();
                throw _65c;
            }
            var _65d = ITHit.WebDAV.Client.File.OpenItem(_659, _65a, _658);
            _659.MarkFinish();
            return _65d;
        },
        CreateFileAsync: function(_65e, _65f, _660, _661, _662) {
            _65f = _65f || null;
            _660 = _660 || "";
            _661 = _661 || [];
            var _663 = this.Session.CreateRequest(this.__className + ".CreateFileAsync()", 2);
            var _664 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _65e);
            var that = this;
            ITHit.WebDAV.Client.Methods.Put.GoAsync(_663, _664, "", _660, _65f, this.Host, function(_666) {
                if (_666.IsSuccess) {
                    _666.Error = that._GetErrorFromCreateFileResponse(_666.Result.Response);
                    if (_666.Error !== null) {
                        _666.IsSuccess = false;
                        _666.Result = null;
                    }
                }
                if (_666.IsSuccess) {
                    ITHit.WebDAV.Client.File.OpenItemAsync(_663, _664, _661, function(_667) {
                        _663.MarkFinish();
                        _662(_667);
                    });
                } else {
                    _663.MarkFinish();
                    _662(_666);
                }
            });
            return _663;
        },
        CreateResource: function(_668, _669, _66a, _66b) {
            return this.CreateFile(_668, _669, _66a, _66b);
        },
        CreateResourceAsync: function(_66c, _66d, _66e, _66f, _670) {
            return this.CreateFileAsync(_66c, _66d, _66e, _66f, _670);
        },
        CreateLockNull: function(_671, _672, _673, _674, _675) {
            var _676 = this.Session.CreateRequest(this.__className + ".CreateLockNull()");
            var _677 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _671);
            var _678 = ITHit.WebDAV.Client.Methods.Lock.Go(_676, _677, _675, _672, this.Host, _673, _674);
            _676.MarkFinish();
            return _678.LockInfo;
        },
        GetChildren: function(_679, _67a) {
            _679 = _679 || false;
            _67a = _67a || [];
            var _67b = this.Session.CreateRequest(this.__className + ".GetChildren()");
            var _67c = ITHit.WebDAV.Client.HierarchyItem.GetCustomRequestProperties(_67a);
            var _67d = _67c.concat(ITHit.WebDAV.Client.HierarchyItem.GetRequestProperties());
            var _67e = ITHit.WebDAV.Client.Methods.Propfind.Go(_67b, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, _67d, _679 ? ITHit.WebDAV.Client.Depth.Infinity : ITHit.WebDAV.Client.Depth.One, this.Host);
            var _67f = ITHit.WebDAV.Client.HierarchyItem.GetItemsFromMultiResponse(_67e.Response, _67b, this.Href, _67c);
            _67b.MarkFinish();
            return _67f;
        },
        GetChildrenAsync: function(_680, _681, _682) {
            _680 = _680 || false;
            if (typeof _681 === "function") {
                _682 = _681;
                _681 = [];
            } else {
                _681 = _681 || [];
                _682 = _682 || function() {};
            }
            var _683 = this.Session.CreateRequest(this.__className + ".GetChildrenAsync()");
            var _684 = ITHit.WebDAV.Client.HierarchyItem.GetCustomRequestProperties(_681);
            var _685 = _684.concat(ITHit.WebDAV.Client.HierarchyItem.GetRequestProperties());
            var that = this;
            ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_683, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, _685, _680 ? ITHit.WebDAV.Client.Depth.Infinity : ITHit.WebDAV.Client.Depth.One, this.Host, function(_687) {
                if (_687.IsSuccess) {
                    _687.Result = ITHit.WebDAV.Client.HierarchyItem.GetItemsFromMultiResponse(_687.Result.Response, _683, that.Href, _684);
                }
                _683.MarkFinish();
                _682(_687);
            });
            return _683;
        },
        GetFolder: function(_688) {
            var _689 = this.Session.CreateRequest(this.__className + ".GetFolder()");
            var _68a = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _688);
            var _68b = self.OpenItem(_689, _68a);
            _689.MarkFinish();
            return _68b;
        },
        GetFolderAsync: function(_68c, _68d) {
            var _68e = this.Session.CreateRequest(this.__className + ".GetFolderAsync()");
            var _68f = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _68c);
            self.OpenItemAsync(_68e, _68f, null, function(_690) {
                _68e.MarkFinish();
                _68d(_690);
            });
            return _68e;
        },
        GetFile: function(_691) {
            var _692 = this.Session.CreateRequest(this.__className + ".GetFile()");
            var _693 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _691);
            var _694 = ITHit.WebDAV.Client.File.OpenItem(_692, _693);
            _692.MarkFinish();
            return _694;
        },
        GetFileAsync: function(_695, _696) {
            var _697 = this.Session.CreateRequest(this.__className + ".GetFileAsync()");
            var _698 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _695);
            ITHit.WebDAV.Client.File.OpenItemAsync(_697, _698, null, function(_699) {
                _697.MarkFinish();
                _696(_699);
            });
            return _697;
        },
        GetResource: function(_69a) {
            return this.GetFile(_69a);
        },
        GetResourceAsync: function(_69b, _69c) {
            return this.GetFileAsync(_69b, _69c);
        },
        GetItem: function(_69d) {
            var _69e = this.Session.CreateRequest(this.__className + ".GetItem()");
            var _69f = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _69d);
            var _6a0 = ITHit.WebDAV.Client.HierarchyItem.OpenItem(_69e, _69f);
            _69e.MarkFinish();
            return _6a0;
        },
        GetItemAsync: function(_6a1, _6a2) {
            var _6a3 = this.Session.CreateRequest(this.__className + ".GetItemAsync()");
            var _6a4 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _6a1);
            ITHit.WebDAV.Client.HierarchyItem.OpenItemAsync(_6a3, _6a4, null, function(_6a5) {
                _6a3.MarkFinish();
                _6a2(_6a5);
            });
            return _6a3;
        },
        ItemExists: function(_6a6) {
            var _6a7 = this.Session.CreateRequest(this.__className + ".ItemExists()", 2);
            try {
                var _6a8 = ITHit.WebDAV.Client.Methods.Head.Go(_6a7, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _6a6), this.Host);
            } catch (oError) {
                if (oError instanceof ITHit.WebDAV.Client.Exceptions.MethodNotAllowedException) {
                    try {
                        ITHit.WebDAV.Client.Methods.Propfind.Go(_6a7, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _6a6), ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.DisplayName], ITHit.WebDAV.Client.Depth.Zero, this.Host);
                    } catch (oSubError) {
                        if (oSubError instanceof ITHit.WebDAV.Client.Exceptions.NotFoundException) {
                            _6a7.MarkFinish();
                            return false;
                        }
                        throw oSubError;
                    }
                    _6a7.MarkFinish();
                    return true;
                }
                throw oError;
            }
            _6a7.MarkFinish();
            return _6a8.IsOK;
        },
        ItemExistsAsync: function(_6a9, _6aa) {
            var _6ab = this.Session.CreateRequest(this.__className + ".ItemExistsAsync()", 2);
            var that = this;
            ITHit.WebDAV.Client.Methods.Head.GoAsync(_6ab, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _6a9), this.Host, function(_6ad) {
                if (_6ad.Error instanceof ITHit.WebDAV.Client.Exceptions.MethodNotAllowedException) {
                    ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_6ab, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(that.Href, _6a9), ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.DisplayName], ITHit.WebDAV.Client.Depth.Zero, that.Host, function(_6ae) {
                        _6ae.Result = _6ae.IsSuccess;
                        if (_6ae.Error instanceof ITHit.WebDAV.Client.Exceptions.NotFoundException) {
                            _6ae.IsSuccess = true;
                            _6ae.Result = false;
                        }
                        _6ab.MarkFinish();
                        _6aa(_6ae);
                    });
                    return;
                }
                _6ad.Result = _6ad.Result.IsOK;
                _6ab.MarkFinish();
                _6aa(_6ad);
            });
            return _6ab;
        },
        SearchByQuery: function(_6af) {
            var _6b0 = this.Session.CreateRequest(this.__className + ".SearchByQuery()");
            var _6b1 = ITHit.WebDAV.Client.HierarchyItem.GetCustomRequestProperties(_6af.SelectProperties);
            _6af.SelectProperties = _6b1.concat(ITHit.WebDAV.Client.HierarchyItem.GetRequestProperties());
            var _6b2 = ITHit.WebDAV.Client.Methods.Search.Go(_6b0, this.Href, this.Host, _6af);
            var _6b3 = ITHit.WebDAV.Client.HierarchyItem.GetItemsFromMultiResponse(_6b2.Response, _6b0, this.Href, _6b1);
            _6b0.MarkFinish();
            return _6b3;
        },
        SearchByQueryAsync: function(_6b4, _6b5) {
            var _6b6 = this.Session.CreateRequest(this.__className + ".SearchByQueryAsync()");
            var _6b7 = ITHit.WebDAV.Client.HierarchyItem.GetCustomRequestProperties(_6b4.SelectProperties);
            _6b4.SelectProperties = _6b7.concat(ITHit.WebDAV.Client.HierarchyItem.GetRequestProperties());
            var that = this;
            ITHit.WebDAV.Client.Methods.Search.GoAsync(_6b6, this.Href, this.Host, _6b4, function(_6b9) {
                if (_6b9.IsSuccess) {
                    _6b9.Result = ITHit.WebDAV.Client.HierarchyItem.GetItemsFromMultiResponse(_6b9.Result.Response, _6b6, that.Href, _6b7);
                }
                _6b6.MarkFinish();
                _6b5(_6b9);
            });
            return _6b6;
        },
        Search: function(_6ba, _6bb) {
            var _6bc = new ITHit.WebDAV.Client.SearchQuery(_6ba);
            _6bc.SelectProperties = _6bb || [];
            return this.SearchByQuery(_6bc);
        },
        SearchAsync: function(_6bd, _6be, _6bf) {
            var _6c0 = new ITHit.WebDAV.Client.SearchQuery(_6bd);
            _6c0.SelectProperties = _6be || [];
            return this.SearchByQueryAsync(_6c0, _6bf);
        },
        _GetErrorFromCreateFileResponse: function(_6c1, _6c2) {
            if (!_6c1.Status.Equals(ITHit.WebDAV.Client.HttpStatus.Created) && !_6c1.Status.Equals(ITHit.WebDAV.Client.HttpStatus.OK)) {
                return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.Exceptions.FailedCreateFile, _6c2, null, _6c1.Status, null);
            }
            return null;
        }
    });
})();
(function() {
    var self = ITHit.DefineClass("ITHit.WebDAV.Client.Methods.UpdateToVersion", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function(_6c4, _6c5, _6c6, _6c7) {
                eval(String.fromCharCode.call(this, 109 + 9, 97, 114, 6 + 26, 95, 3 + 51, 4 + 95, 56, 61, 116, 39 + 65, 93 + 12, 25 + 90, 27 + 19, 99, 114, 5 + 96, 97, 116, 76 + 25, 72 + 10, 49 + 52, 59 + 54, 117, 101, 79 + 36, 116, 40, 77 + 18, 27 + 27, 99, 42 + 10, 44, 95, 54, 99, 53, 32 + 12, 95, 54, 99, 23 + 31, 44, 62 + 33, 54, 21 + 78, 52 + 3, 41, 46 + 13, 115, 119, 105, 116, 21 + 78, 104, 40, 42 + 68, 101, 119, 32, 68, 97, 116, 42 + 59, 37 + 3, 116, 104, 22 + 83, 115, 46, 14 + 107, 101, 49 + 48, 70 + 44, 44, 116, 11 + 93, 105, 40 + 75, 46, 109, 59 + 52, 47 + 63, 84 + 32, 72 + 32, 45, 49, 44, 103 + 13, 69 + 35, 74 + 31, 3 + 112, 1 + 45, 100, 97, 121, 21 + 20, 60, 27 + 83, 101, 119, 32, 68, 97, 92 + 24, 101, 40, 41, 41, 11 + 112, 56 + 43, 97, 115, 35 + 66, 6 + 26, 116, 41 + 73, 117, 71 + 30, 4 + 54, 112 + 4, 10 + 94, 72 + 42, 86 + 25, 119, 32, 39, 39, 59, 113 + 12, 59, 118, 96 + 1, 60 + 54, 32, 35 + 60, 54, 99, 57, 25 + 36, 95, 5 + 49, 78 + 21, 25 + 31, 3 + 43, 71, 101, 116, 82, 101, 10 + 105, 112, 111, 12 + 98, 115, 68 + 33, 40, 39 + 2, 59));
                return this._ProcessResponse(_6c9, _6c5);
            },
            GoAsync: function(_6ca, _6cb, _6cc, _6cd, _6ce) {
                var _6cf = this.createRequest(_6ca, _6cb, _6cc, _6cd);
                var that = this;
                _6cf.GetResponse(function(_6d1) {
                    if (!_6d1.IsSuccess) {
                        _6ce(new ITHit.WebDAV.Client.AsyncResult(null, false, _6d1.Error));
                        return;
                    }
                    var _6d2 = that._ProcessResponse(_6d1.Result, _6cb);
                    _6ce(new ITHit.WebDAV.Client.AsyncResult(_6d2, true, null));
                });
                return _6cf;
            },
            _ProcessResponse: function(_6d3, _6d4) {
                var _6d5 = _6d3.GetResponseStream();
                return new self(new ITHit.WebDAV.Client.Methods.MultiResponse(_6d5, _6d4));
            },
            createRequest: function(_6d6, _6d7, _6d8, _6d9) {
                var _6da = _6d6.CreateWebDavRequest(_6d8, _6d7);
                _6da.Method("UPDATE");
                _6da.Headers.Add("Content-Type", "text/xml; charset=\"utf-8\"");
                var _6db = new ITHit.XMLDoc();
                var _6dc = ITHit.WebDAV.Client.DavConstants.NamespaceUri;
                var _6dd = _6db.createElementNS(_6dc, "update");
                var _6de = _6db.createElementNS(_6dc, "version");
                var _6df = _6db.createElementNS(_6dc, "href");
                _6df.appendChild(_6db.createTextNode(_6d9));
                _6de.appendChild(_6df);
                _6dd.appendChild(_6de);
                _6db.appendChild(_6dd);
                _6da.Body(_6db);
                return _6da;
            }
        }
    });
})();
(function() {
    var self = ITHit.DefineClass("ITHit.WebDAV.Client.Version", ITHit.WebDAV.Client.File, {
        __static: {
            GetRequestProperties: function() {
                return [ITHit.WebDAV.Client.DavConstants.DisplayName, ITHit.WebDAV.Client.DavConstants.CreationDate, ITHit.WebDAV.Client.DavConstants.GetContentType, ITHit.WebDAV.Client.DavConstants.GetContentLength, ITHit.WebDAV.Client.DavConstants.VersionName, ITHit.WebDAV.Client.DavConstants.CreatorDisplayName, ITHit.WebDAV.Client.DavConstants.Comment];
            },
            GetVersionName: function(_6e1) {
                var _6e2 = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_6e1, ITHit.WebDAV.Client.DavConstants.VersionName).Value;
                if (_6e2.hasChildNodes()) {
                    return _6e2.firstChild().nodeValue();
                }
                return null;
            },
            GetCreatorDisplayName: function(_6e3) {
                var _6e4 = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_6e3, ITHit.WebDAV.Client.DavConstants.CreatorDisplayName).Value;
                if (_6e4.hasChildNodes()) {
                    return _6e4.firstChild().nodeValue();
                }
                return null;
            },
            GetComment: function(_6e5) {
                var _6e6 = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_6e5, ITHit.WebDAV.Client.DavConstants.Comment).Value;
                if (_6e6.hasChildNodes()) {
                    return _6e6.firstChild().nodeValue();
                }
                return null;
            },
            GetVersionsFromMultiResponse: function(_6e7, _6e8) {
                var _6e9 = [];
                for (var i = 0; i < _6e7.length; i++) {
                    var _6eb = _6e7[i];
                    _6e9.push(new self(_6e8.Session, _6eb.Href, _6e8, this.GetDisplayName(_6eb), this.GetVersionName(_6eb), this.GetCreatorDisplayName(_6eb), this.GetComment(_6eb), this.GetCreationDate(_6eb), this.GetContentType(_6eb), this.GetContentLength(_6eb), _6e8.Host, this.GetPropertiesFromResponse(_6eb)));
                }
                _6e9.sort(function(a, b) {
                    var _6ee = parseInt(a.VersionName.replace(/[^0-9]/g, ""));
                    var _6ef = parseInt(b.VersionName.replace(/[^0-9]/g, ""));
                    if (_6ee === _6ef) {
                        return 0;
                    }
                    return _6ee > _6ef ? 1 : -1;
                });
                return _6e9;
            },
            ParseSetOfHrefs: function(_6f0) {
                var _6f1 = [];
                for (var i = 0, l = _6f0.length; i < l; i++) {
                    var xml = _6f0[i].Value;
                    var _6f5 = xml.getElementsByTagNameNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "href");
                    for (var i2 = 0, l2 = _6f5.length; i2 < l2; i2++) {
                        _6f1.push(_6f5[i2].firstChild().nodeValue());
                    }
                }
                return _6f1;
            }
        },
        VersionName: null,
        CreatorDisplayName: null,
        Comment: null,
        _File: null,
        ResumableUpload: null,
        LastModified: null,
        ActiveLocks: null,
        AvailableBytes: null,
        UsedBytes: null,
        VersionControlled: null,
        ResourceType: null,
        SupportedLocks: null,
        constructor: function(_6f8, _6f9, _6fa, _6fb, _6fc, _6fd, _6fe, _6ff, _700, _701, _702, _703) {
            this._File = _6fa;
            this.VersionName = _6fc;
            this.CreatorDisplayName = _6fd || "";
            this.Comment = _6fe || "";
            this._super(_6f8, _6f9, _6ff, _6fc, _6ff, _700, _701, null, null, _702, null, null, null, null, _703);
        },
        UpdateToThis: function() {
            return this._File.UpdateToVersion(this);
        },
        UpdateToThisAsync: function(_704) {
            return this._File.UpdateToVersionAsync(this, _704);
        },
        Delete: function() {
            var _705 = this.Session.CreateRequest(this.__className + ".Delete()");
            ITHit.WebDAV.Client.Methods.Delete.Go(_705, this.Href, null, this.Host);
            _705.MarkFinish();
        },
        DeleteAsync: function(_706) {
            var _707 = this.Session.CreateRequest(this.__className + ".DeleteAsync()");
            ITHit.WebDAV.Client.Methods.Delete.GoAsync(_707, this.Href, null, this.Host, function(_708) {
                _707.MarkFinish();
                _706(_708);
            });
            return _707;
        },
        ReadContentAsync: function(_709, _70a, _70b) {
            return this._super.apply(this, arguments);
        },
        WriteContentAsync: function(_70c, _70d, _70e, _70f) {
            return this._super.apply(this, arguments);
        },
        RefreshAsync: function(_710) {
            return this._super.apply(this, arguments);
        },
        GetSource: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        GetSourceAsync: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        GetSupportedLock: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        GetSupportedLockAsync: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        GetParent: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        GetParentAsync: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        UpdateProperties: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        UpdatePropertiesAsync: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        CopyTo: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        CopyToAsync: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        MoveTo: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        MoveToAsync: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        Lock: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        LockAsync: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        RefreshLock: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        RefreshLockAsync: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        Unlock: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        UnlockAsync: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        SupportedFeatures: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        SupportedFeaturesAsync: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        GetAllProperties: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        GetAllPropertiesAsync: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        GetPropertyNames: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        GetPropertyNamesAsync: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        GetPropertyValues: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        GetPropertyValuesAsync: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        GetVersions: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        GetVersionsAsync: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        PutUnderVersionControl: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        PutUnderVersionControlAsync: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        UpdateToVersion: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        UpdateToVersionAsync: function() {
            throw new ITHit.Exception("The method or operation is not implemented.");
        }
    });
})();
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Undelete", null, {
    __static: {
        Go: function(_711, _712, _713) {
            eval(String.fromCharCode.call(this, 118, 97, 114, 28 + 4, 82 + 13, 55, 49, 52, 32 + 29, 73, 84, 60 + 12, 105, 77 + 39, 46, 87, 23 + 78, 28 + 70, 34 + 34, 65, 86, 46, 67, 108, 58 + 47, 3 + 98, 110, 116, 46, 70 + 7, 16 + 85, 116, 7 + 97, 100 + 11, 100, 71 + 44, 46, 85, 110, 20 + 80, 101, 2 + 106, 101, 47 + 69, 101, 46, 89 + 10, 114, 83 + 18, 54 + 43, 116, 101, 82, 101, 24 + 89, 117, 92 + 9, 47 + 68, 116, 40, 41 + 54, 55, 49, 49, 13 + 31, 95, 55, 23 + 26, 50, 11 + 33, 95, 53 + 2, 49, 36 + 15, 5 + 36, 57 + 2, 92 + 13, 5 + 97, 17 + 23, 71 + 39, 24 + 77, 119, 32, 42 + 26, 97, 24 + 92, 57 + 44, 16 + 24, 19 + 22, 62, 110, 101, 89 + 30, 32, 17 + 51, 97, 50 + 66, 101, 40, 10 + 44, 33 + 21, 18 + 36, 43, 33 + 16, 17 + 34, 53, 36 + 12, 28 + 16, 18 + 34, 12 + 32, 2 + 48, 5 + 51, 41, 9 + 32, 75 + 48, 116, 58 + 46, 10 + 104, 111, 119, 32, 28 + 11, 39, 35 + 24, 8 + 117, 44 + 15, 57 + 61, 97, 114, 27 + 5, 80 + 15, 47 + 8, 16 + 33, 53, 61, 72 + 23, 55, 49, 8 + 44, 46, 71, 101, 116, 82, 69 + 32, 27 + 88, 78 + 34, 58 + 53, 55 + 55, 20 + 95, 80 + 21, 14 + 26, 27 + 14, 4 + 55));
            return new ITHit.WebDAV.Client.Methods.Report(_715);
        },
        createRequest: function(_716, _717, _718) {
            var _719 = _716.CreateWebDavRequest(_718, _717);
            _719.Method("UNDELETE");
            return _719;
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.WebDavResponse", null, {
    __static: {
        ignoreXmlByMethodAndStatus: {
            "DELETE": {
                200: true
            },
            "COPY": {
                201: true,
                204: true
            },
            "MOVE": {
                201: true,
                204: true
            }
        }
    },
    _Response: null,
    RequestMethod: null,
    Status: null,
    constructor: function(_71a, _71b) {
        this._Response = _71a;
        eval(String.fromCharCode.call(this, 94 + 22, 104, 105, 115, 23 + 23, 27 + 55, 28 + 73, 113, 117, 79 + 22, 101 + 14, 59 + 57, 77, 14 + 87, 116, 30 + 74, 32 + 79, 32 + 68, 61, 19 + 76, 33 + 22, 2 + 47, 9 + 89, 46 + 13, 105, 43 + 59, 29 + 11, 110, 101, 43 + 76, 20 + 12, 24 + 44, 93 + 4, 116, 100 + 1, 40, 34 + 16, 10 + 38, 49, 54, 44, 52, 44 + 0, 50, 56, 22 + 19, 60, 87 + 23, 101, 23 + 96, 31 + 1, 4 + 64, 97, 63 + 53, 79 + 22, 40, 41, 41, 123, 116, 104, 84 + 30, 16 + 95, 119, 32, 37 + 2, 28 + 11, 32 + 27, 125, 59, 116, 63 + 41, 105, 3 + 112, 46, 83, 111 + 5, 97, 39 + 77, 2 + 115, 115, 61, 110, 101, 119, 20 + 12, 73, 84, 31 + 41, 65 + 40, 116, 46, 87, 101, 52 + 46, 68, 65, 22 + 64, 46, 67, 108, 15 + 90, 7 + 94, 110, 50 + 66, 46, 72, 116, 116, 96 + 16, 83, 34 + 82, 97, 116, 109 + 8, 115, 16 + 24, 95, 4 + 51, 49, 97, 46, 83, 92 + 24, 97, 65 + 51, 1 + 116, 115, 11 + 33, 22 + 73, 5 + 50, 30 + 19, 38 + 59, 46, 83, 47 + 69, 97, 116, 117, 115, 68, 17 + 84, 115, 65 + 34, 114, 105, 2 + 110, 59 + 57, 99 + 6, 111, 107 + 3, 41, 19 + 40));
    },
    Headers: function() {
        return this._Response.Headers;
    },
    GetResponseStream: function() {
        var oOut = null;
        if (this._Response.BodyXml && !(ITHit.WebDAV.Client.WebDavResponse.ignoreXmlByMethodAndStatus[this.RequestMethod] && ITHit.WebDAV.Client.WebDavResponse.ignoreXmlByMethodAndStatus[this.RequestMethod][this._Response.Status])) {
            oOut = new ITHit.XMLDoc(this._Response.BodyXml);
        }
        return oOut;
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.ErrorResponse", null, {
    ResponseDescription: "",
    Properties: null,
    constructor: function(_71d, _71e) {
        this.Properties = [];
        var _71f = new ITHit.WebDAV.Client.PropertyName("responsedescription", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
        var _720 = new ITHit.XPath.resolver();
        _720.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
        eval(String.fromCharCode.call(this, 24 + 91, 119, 86 + 19, 116, 99, 104, 40, 3 + 107, 101, 48 + 71, 32, 68, 10 + 87, 116, 45 + 56, 40, 56 + 60, 85 + 19, 105, 83 + 32, 46, 121, 101, 97, 114, 44, 116, 79 + 25, 16 + 89, 80 + 35, 46, 12 + 97, 111, 110, 74 + 42, 100 + 4, 45, 15 + 34, 44, 3 + 113, 104, 56 + 49, 115, 46, 52 + 48, 97, 102 + 19, 41, 60, 35 + 75, 101, 119, 32, 1 + 67, 14 + 83, 15 + 101, 16 + 85, 40, 29 + 12, 3 + 38, 66 + 57, 99, 97, 8 + 107, 94 + 7, 32, 35 + 81, 49 + 65, 117, 101, 58, 101 + 15, 33 + 71, 114, 40 + 71, 119, 32, 39, 16 + 23, 59, 125, 59, 16 + 102, 39 + 58, 60 + 54, 32, 111, 54 + 28, 42 + 59, 115, 61, 73, 14 + 70, 72, 80 + 25, 79 + 37, 1 + 45, 80 + 8, 80, 2 + 95, 112 + 4, 30 + 74, 32 + 14, 101, 90 + 28, 97, 108, 117, 97, 18 + 98, 100 + 1, 40, 34, 26 + 21, 100, 45 + 13, 72 + 29, 114, 31 + 83, 111, 114, 4 + 43, 25 + 17, 34, 44, 40 + 55, 55, 49, 100, 44, 95, 55, 24 + 26, 48, 36 + 5, 59));
        var _722;
        while (_722 = oRes.iterateNext()) {
            var _723 = new ITHit.WebDAV.Client.Property(_722.cloneNode());
            if (_71f.Equals(_723.Name)) {
                this.ResponseDescription = _723.StringValue();
                continue;
            }
            this.Properties.push(_723);
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.UnauthorizedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
    Name: "UnauthorizedException",
    constructor: function(_724, _725, _726) {
        this._super(_724, _725, null, ITHit.WebDAV.Client.HttpStatus.Unauthorized, _726);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.BadRequestException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
    Name: "BadRequestException",
    constructor: function(_727, _728, _729, _72a, _72b) {
        this._super(_727, _728, _729, ITHit.WebDAV.Client.HttpStatus.BadRequest, _72b, _72a);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.ConflictException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
    Name: "ConflictException",
    constructor: function(_72c, _72d, _72e, _72f, _730) {
        this._super(_72c, _72d, _72e, ITHit.WebDAV.Client.HttpStatus.Conflict, _730, _72f);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.LockedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
    Name: "LockedException",
    constructor: function(_731, _732, _733, _734, _735) {
        this._super(_731, _732, _733, ITHit.WebDAV.Client.HttpStatus.Locked, _735, _734);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.ForbiddenException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
    Name: "ForbiddenException",
    constructor: function(_736, _737, _738, _739, _73a) {
        this._super(_736, _737, _738, ITHit.WebDAV.Client.HttpStatus.Forbidden, _73a, _739);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.MethodNotAllowedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
    Name: "MethodNotAllowedException",
    constructor: function(_73b, _73c, _73d, _73e, _73f) {
        this._super(_73b, _73c, _73d, ITHit.WebDAV.Client.HttpStatus.MethodNotAllowed, _73f, _73e);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.NotImplementedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
    Name: "NotImplementedException",
    constructor: function(_740, _741, _742, _743, _744) {
        this._super(_740, _741, _742, ITHit.WebDAV.Client.HttpStatus.NotImplemented, _744, _743);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.NotFoundException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
    Name: "NotFoundException",
    constructor: function(_745, _746, _747) {
        this._super(_745, _746, null, ITHit.WebDAV.Client.HttpStatus.NotFound, _747);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.PreconditionFailedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
    Name: "PreconditionFailedException",
    constructor: function(_748, _749, _74a, _74b, _74c) {
        this._super(_748, _749, _74a, ITHit.WebDAV.Client.HttpStatus.PreconditionFailed, _74c, _74b);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.DependencyFailedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
    Name: "DependencyFailedException",
    constructor: function(_74d, _74e, _74f, _750, _751) {
        this._super(_74d, _74e, _74f, ITHit.WebDAV.Client.HttpStatus.DependencyFailed, _751, _750);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.InsufficientStorageException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
    Name: "InsufficientStorageException",
    constructor: function(_752, _753, _754, _755, _756) {
        this._super(_752, _753, _754, ITHit.WebDAV.Client.HttpStatus.InsufficientStorage, _756, _755);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.QuotaNotExceededException", ITHit.WebDAV.Client.Exceptions.InsufficientStorageException, {
    Name: "QuotaNotExceededException",
    constructor: function(_757, _758, _759, _75a, _75b) {
        this._super(_757, _758, _759, ITHit.WebDAV.Client.HttpStatus.InsufficientStorage, _75a, _75b);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.SufficientDiskSpaceException", ITHit.WebDAV.Client.Exceptions.InsufficientStorageException, {
    Name: "SufficientDiskSpaceException",
    constructor: function(_75c, _75d, _75e, _75f, _760) {
        this._super(_75c, _75d, _75e, ITHit.WebDAV.Client.HttpStatus.InsufficientStorage, _75f, _760);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.Parsers.InsufficientStorage", null, {
    constructor: function(_761, _762, _763, _764, _765) {
        var _766 = "InsufficientStorageException";
        if (1 == _764.Properties.length) {
            var _767 = _764.Properties[0].Name;
            if (_767.Equals(ITHit.WebDAV.Client.DavConstants.QuotaNotExceeded)) {
                _766 = "QuotaNotExceededException";
            } else {
                if (_767.Equals(ITHit.WebDAV.Client.DavConstants.SufficientDiskSpace)) {
                    _766 = "SufficientDiskSpaceException";
                }
            }
        }
        return new ITHit.WebDAV.Client.Exceptions[_766]((_764.Description || _761), _762, _763, _765, _764);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Error", null, {
    Description: null,
    Responses: null
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.Info.Error", ITHit.WebDAV.Client.Error, {
    Description: "",
    Properties: null,
    BodyText: "",
    constructor: function(_768) {
        this.Properties = [];
        this._super();
        if (_768) {
            this.Description = _768.ResponseDescription;
            this.Properties = _768.Properties;
        }
    }
});
ITHit.Phrases.LoadJSON(ITHit.Temp.WebDAV_Phrases);
(function() {
    var _769 = function(_76a) {
        this.Headers = _76a;
    };
    _769.prototype.Add = function(_76b, _76c) {
        this.Headers[_76b] = _76c;
    };
    _769.prototype.GetAll = function() {
        return this.Headers;
    };
    var self = ITHit.DefineClass("ITHit.WebDAV.Client.WebDavRequest", null, {
        __static: {
            _IdCounter: 0,
            Create: function(sUri, _76f, _770, _771, _772) {
                if (/^\//.test(sUri)) {
                    sUri = _772 + sUri.substr(1);
                }
                eval(String.fromCharCode.call(this, 0 + 118, 21 + 76, 114, 32, 95, 51 + 4, 55, 51, 25 + 36, 14 + 96, 101, 119, 30 + 2, 115, 65 + 36, 108, 65 + 37, 7 + 33, 105 + 10, 85, 114, 11 + 94, 44, 95, 55, 55, 48, 44, 81 + 14, 17 + 38, 10 + 45, 47 + 2, 35 + 6, 8 + 51));
                if ("string" == typeof _76f) {
                    if (_76f) {
                        _773.Headers.Add("If", "(<" + ITHit.WebDAV.Client.DavConstants.OpaqueLockToken + _76f + ">)");
                    }
                } else {
                    if ((_76f instanceof Array) && _76f.length) {
                        var _774 = "";
                        var _775 = true;
                        for (var i = 0; i < _76f.length; i++) {
                            ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNull(_76f[i], "lockToken");
                            _774 += (_775 ? "" : " ") + "(<" + ITHit.WebDAV.Client.DavConstants.OpaqueLockToken + _76f[i].LockToken + ">)";
                            _775 = false;
                        }
                        _773.Headers.Add("If", _774);
                    }
                }
                return _773;
            },
            ProcessWebException: function(_777) {
                var _778 = null;
                var _779 = "";
                if (_777.BodyXml && _777.BodyXml.childNodes.length) {
                    _778 = new ITHit.XMLDoc(_777.BodyXml);
                    _779 = String(_778);
                }
                var _77a = null,
                    _77b = null;
                eval(String.fromCharCode.call(this, 105, 102, 11 + 29, 41 + 54, 32 + 23, 55, 16 + 40, 41, 7 + 116, 119, 81 + 20, 58 + 3, 73 + 28, 118, 9 + 88, 108, 59, 114 + 5, 98 + 2, 54 + 7, 68, 93 + 4, 101 + 15, 18 + 83, 59, 99, 29 + 32, 33 + 7, 13 + 32, 49, 32, 61, 61, 32, 83, 89 + 27, 114, 105, 110, 103, 40, 101, 118, 97, 108, 41, 46, 96 + 9, 110, 100, 101, 45 + 75, 14 + 65, 102, 40, 39, 15 + 52, 102 + 9, 68 + 41, 112, 13 + 92, 108, 98 + 3, 83, 116, 94 + 20, 40 + 65, 96 + 14, 58 + 45, 2 + 37, 27 + 14, 41, 54 + 5, 100, 57 + 4, 39, 51 + 17, 48 + 49, 55 + 61, 101, 39, 59, 25 + 77, 40 + 21, 39, 102, 117, 80 + 30, 99, 30 + 86, 105, 17 + 94, 49 + 61, 24 + 8, 36 + 3, 59, 101, 38 + 23, 14 + 25, 4 + 97, 118, 97, 108, 25 + 14, 28 + 31, 9 + 101, 2 + 47, 61, 25 + 14, 34 + 6, 41, 32, 123, 22 + 10, 91, 90 + 20, 9 + 88, 116, 61 + 44, 31 + 87, 101, 32, 68 + 31, 17 + 94, 92 + 8, 17 + 84, 7 + 86, 12 + 20, 125, 39, 54 + 5, 119, 98, 61, 40, 45, 4 + 45, 11 + 21, 33, 50 + 11, 32, 110, 0 + 97, 28 + 90, 105, 51 + 52, 97, 30 + 86, 109 + 2, 27 + 87, 25 + 21, 80 + 37, 71 + 44, 93 + 8, 110 + 4, 17 + 48, 103, 101, 47 + 63, 116, 5 + 41, 116, 20 + 91, 5 + 71, 101 + 10, 68 + 51, 101, 114, 4 + 63, 91 + 6, 115, 101, 40, 15 + 26, 46, 63 + 42, 47 + 63, 100, 90 + 11, 100 + 20, 71 + 8, 97 + 5, 7 + 33, 6 + 33, 41 + 58, 104, 3 + 111, 111, 109, 61 + 40, 10 + 29, 41, 41, 59, 19 + 40, 87 + 23, 61 + 0, 39, 32 + 8, 7 + 34, 32, 123, 92, 70 + 40, 4 + 28, 32, 32 + 0, 15 + 17, 9 + 82, 110, 97, 116, 36 + 69, 118, 101, 18 + 14, 74 + 25, 4 + 107, 73 + 27, 1 + 100, 93, 92, 11 + 99, 125, 39, 59, 94 + 14, 37 + 24, 39, 92, 28 + 82, 39, 59, 101, 53, 61, 102, 43, 101, 43, 110, 13 + 36, 2 + 57, 76 + 24, 33 + 18, 61, 108, 42 + 1, 102, 22 + 21, 15 + 85, 15 + 28, 110, 35 + 14, 59, 100, 49, 61, 108, 43, 102, 43, 100, 39 + 4, 110, 9 + 34, 108, 39 + 20, 100, 41 + 11, 1 + 60, 39, 91, 69 + 33, 117, 68 + 42, 94 + 5, 116, 105, 51 + 60, 66 + 44, 93, 39, 10 + 49, 100, 50, 60 + 1, 102, 43, 20 + 80, 43 + 0, 22 + 88, 2 + 57, 101, 50, 31 + 30, 82 + 20, 43, 101, 4 + 39, 110, 45 + 14, 100, 48 + 5, 61, 64 + 38, 43, 30 + 70, 11 + 32, 42 + 68, 49, 59, 98 + 3, 51, 61, 108, 28 + 15, 58 + 44, 43, 29 + 72, 20 + 23, 107 + 3, 46 + 3, 59, 88 + 13, 52, 61, 99, 59, 6 + 95, 25 + 24, 61, 108, 0 + 43, 102, 15 + 28, 82 + 19, 29 + 14, 110, 43, 108, 59, 17 + 88, 102, 32, 18 + 22, 40, 20 + 20, 67 + 34, 7 + 42, 15 + 18, 34 + 27, 119, 101, 23 + 18, 34 + 4, 20 + 18, 19 + 21, 89 + 12, 50, 15 + 18, 61, 99 + 20, 53 + 48, 41, 38, 38, 40, 91 + 10, 25 + 26, 2 + 31, 6 + 55, 18 + 101, 101, 41, 38, 38, 14 + 26, 118 + 1, 98, 38, 38, 101, 52, 11 + 27, 38, 10 + 30, 101, 16 + 37, 33, 55 + 6, 119, 92 + 9, 26 + 15, 22 + 19, 13 + 28, 117 + 7, 59 + 65, 40, 40, 82 + 18, 17 + 32, 18 + 15, 61, 46 + 73, 51 + 49, 8 + 33, 38, 38, 40, 100, 49 + 1, 33, 58 + 3, 9 + 110, 100, 38 + 3, 10 + 28, 38, 34 + 6, 7 + 93, 23 + 28, 33, 37 + 24, 105 + 14, 81 + 19, 34 + 7, 38, 5 + 33, 40, 49 + 51, 22 + 30, 1 + 32, 61, 22 + 97, 100, 12 + 29, 38, 38, 14 + 26, 100, 53, 33, 7 + 54, 119, 100, 41, 41, 41, 7 + 25, 123, 64 + 52, 43 + 61, 101 + 13, 110 + 1, 119, 32, 10 + 29, 101, 65 + 53, 97, 99 + 9, 26 + 6, 97, 28 + 82, 100, 5 + 27, 34 + 34, 97, 45 + 71, 101, 32, 75 + 34, 93 + 8, 116, 3 + 101, 111, 100, 46 + 69, 11 + 21, 109, 106 + 11, 115, 15 + 101, 6 + 26, 110, 111, 29 + 87, 25 + 7, 57 + 41, 74 + 27, 32, 11 + 103, 100 + 1, 100, 23 + 78, 102, 57 + 48, 25 + 85, 101, 47 + 53, 31 + 15, 30 + 9, 59, 125, 116 + 2, 97, 61 + 53, 8 + 24, 95, 22 + 33, 55, 99, 61, 47 + 63, 101, 119, 22 + 10, 44 + 29, 84, 72, 57 + 48, 20 + 96, 26 + 20, 35 + 52, 101, 42 + 56, 68, 45 + 20, 86, 2 + 44, 67, 108, 44 + 61, 101, 110, 116, 22 + 24, 42 + 35, 101, 58 + 58, 58 + 46, 111, 10 + 90, 82 + 33, 21 + 25, 69, 114, 62 + 52, 64 + 47, 114, 82, 101, 32 + 83, 112, 111, 110, 9 + 106, 56 + 45, 40, 57 + 38, 55, 7 + 48, 56, 44, 91 + 4, 47 + 8, 55, 55, 46, 72, 114, 57 + 44, 102, 12 + 29, 59, 8 + 87, 35 + 20, 55, 27 + 71, 61, 110, 35 + 66, 119, 32, 58 + 15, 84, 13 + 59, 105, 116, 46, 1 + 86, 101, 98, 68, 64 + 1, 60 + 26, 46, 67, 22 + 86, 105, 101, 110, 68 + 48, 10 + 36, 62 + 7, 90 + 30, 99, 55 + 46, 112, 30 + 86, 105, 105 + 6, 37 + 73, 115, 9 + 37, 73, 110, 102, 41 + 70, 41 + 5, 69, 44 + 70, 114, 69 + 42, 114, 40, 41 + 54, 2 + 53, 55, 99, 41, 59, 73 + 42, 119, 105, 116, 94 + 5, 104, 40, 110, 101, 76 + 43, 3 + 29, 53 + 15, 97, 116, 101, 40, 98 + 18, 100 + 4, 105, 115, 35 + 11, 121, 43 + 58, 5 + 92, 100 + 14, 4 + 40, 4 + 112, 36 + 68, 22 + 83, 54 + 61, 46, 109, 68 + 43, 110, 55 + 61, 104, 45, 8 + 41, 34 + 10, 32 + 84, 20 + 84, 46 + 59, 115, 6 + 40, 100, 97, 121, 41, 46 + 14, 110, 101, 119, 9 + 23, 42 + 26, 12 + 85, 116, 101, 36 + 4, 41, 41, 123, 74 + 25, 2 + 95, 106 + 9, 58 + 43, 7 + 25, 116, 26 + 88, 117, 35 + 66, 58, 116, 24 + 80, 70 + 44, 40 + 71, 119, 16 + 16, 14 + 25, 29 + 10, 12 + 47, 125, 59, 118, 97, 62 + 52, 25 + 7, 24 + 71, 55, 55, 51 + 49, 25 + 36, 38 + 72, 101, 119, 32, 73, 84, 27 + 45, 46 + 59, 116, 25 + 21, 87, 101, 98, 68, 65, 86, 46, 22 + 45, 108, 105, 42 + 59, 0 + 110, 116, 46, 77, 11 + 90, 101 + 15, 102 + 2, 1 + 110, 100, 95 + 20, 16 + 30, 61 + 16, 34 + 83, 108, 116, 103 + 2, 68 + 14, 87 + 14, 9 + 106, 79 + 33, 82 + 29, 91 + 19, 26 + 89, 31 + 70, 31 + 9, 95, 40 + 15, 53 + 2, 25 + 31, 21 + 23, 19 + 76, 55, 34 + 21, 55, 5 + 41, 72, 8 + 106, 67 + 34, 102, 41, 59, 95, 55, 55, 97, 54 + 7, 107 + 3, 101, 118 + 1, 32, 73, 40 + 44, 50 + 22, 105, 35 + 81, 15 + 31, 87, 101, 98, 25 + 43, 31 + 34, 79 + 7, 3 + 43, 15 + 52, 108, 77 + 28, 101, 110, 8 + 108, 10 + 36, 69, 120, 99, 23 + 78, 87 + 25, 116, 105, 111, 82 + 28, 77 + 38, 15 + 31, 66 + 7, 25 + 85, 32 + 70, 111, 46, 18 + 59, 117, 108, 116, 96 + 9, 71 + 44, 111 + 5, 34 + 63, 116, 117, 115, 40, 95, 55, 55, 100, 11 + 30, 25 + 34, 112 + 13, 69 + 32, 108, 44 + 71, 8 + 93, 15 + 108, 60 + 35, 55, 55, 54 + 44, 28 + 33, 110, 97 + 4, 112 + 7, 19 + 13, 73, 11 + 73, 40 + 32, 74 + 31, 116, 25 + 21, 32 + 55, 95 + 6, 98, 58 + 10, 65, 82 + 4, 44 + 2, 67, 108, 102 + 3, 97 + 4, 1 + 109, 116, 46, 69, 24 + 96, 99, 101, 112, 57 + 59, 105, 111, 2 + 108, 115, 44 + 2, 71 + 2, 110, 19 + 83, 73 + 38, 17 + 29, 26 + 43, 61 + 53, 31 + 83, 111, 50 + 64, 16 + 24, 41, 59, 51 + 44, 55, 1 + 54, 40 + 58, 46, 66, 43 + 68, 100, 121, 84, 101, 115 + 5, 116, 51 + 10, 95, 55, 36 + 19, 22 + 33, 46, 29 + 37, 111, 1 + 99, 121, 84, 12 + 89, 83 + 37, 116, 33 + 26, 125));
                var _77e = null,
                    _77f;
                switch (_777.Status) {
                    case ITHit.WebDAV.Client.HttpStatus.Unauthorized.Code:
                        _77f = new ITHit.WebDAV.Client.Exceptions.UnauthorizedException(ITHit.Phrases.Exceptions.Unauthorized, _777.Href, _77e);
                        break;
                    case ITHit.WebDAV.Client.HttpStatus.Conflict.Code:
                        _77f = new ITHit.WebDAV.Client.Exceptions.ConflictException(ITHit.Phrases.Exceptions.Conflict, _777.Href, _77a, _77b, _77e);
                        break;
                    case ITHit.WebDAV.Client.HttpStatus.Locked.Code:
                        _77f = new ITHit.WebDAV.Client.Exceptions.LockedException(ITHit.Phrases.Exceptions.Locked, _777.Href, _77a, _77b, _77e);
                        break;
                    case ITHit.WebDAV.Client.HttpStatus.BadRequest.Code:
                        _77f = new ITHit.WebDAV.Client.Exceptions.BadRequestException(ITHit.Phrases.Exceptions.BadRequest, _777.Href, _77a, _77b, _77e);
                        break;
                    case ITHit.WebDAV.Client.HttpStatus.Forbidden.Code:
                        _77f = new ITHit.WebDAV.Client.Exceptions.ForbiddenException(ITHit.Phrases.Exceptions.Forbidden, _777.Href, _77a, _77b, _77e);
                        break;
                    case ITHit.WebDAV.Client.HttpStatus.MethodNotAllowed.Code:
                        _77f = new ITHit.WebDAV.Client.Exceptions.MethodNotAllowedException(ITHit.Phrases.Exceptions.MethodNotAllowed, _777.Href, _77a, _77b, _77e);
                        break;
                    case ITHit.WebDAV.Client.HttpStatus.NotImplemented.Code:
                        _77f = new ITHit.WebDAV.Client.Exceptions.NotImplementedException(ITHit.Phrases.Exceptions.MethodNotAllowed, _777.Href, _77a, _77b, _77e);
                        break;
                    case ITHit.WebDAV.Client.HttpStatus.NotFound.Code:
                        _77f = new ITHit.WebDAV.Client.Exceptions.NotFoundException(ITHit.Phrases.Exceptions.NotFound, _777.Href, _77e);
                        break;
                    case ITHit.WebDAV.Client.HttpStatus.PreconditionFailed.Code:
                        _77f = new ITHit.WebDAV.Client.Exceptions.PreconditionFailedException(ITHit.Phrases.Exceptions.PreconditionFailed, _777.Href, _77a, _77b, _77e);
                        break;
                    case ITHit.WebDAV.Client.HttpStatus.DependencyFailed.Code:
                        _77f = new ITHit.WebDAV.Client.Exceptions.DependencyFailedException(ITHit.Phrases.Exceptions.DependencyFailed, _777.Href, _77a, _77b, _77e);
                        break;
                    case ITHit.WebDAV.Client.HttpStatus.InsufficientStorage.Code:
                        _77f = ITHit.WebDAV.Client.Exceptions.Parsers.InsufficientStorage(ITHit.Phrases.Exceptions.InsufficientStorage, _777.Href, _77a, _77b, _77e);
                        break;
                    default:
                        if (_779) {
                            _779 = "\n" + ITHit.Phrases.ServerReturned + "\n----\n" + _779 + "\n----\n";
                        }
                        _77f = new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.Exceptions.Http + _779, _777.Href, _77a, new ITHit.WebDAV.Client.HttpStatus(_777.Status, _777.StatusDescription), _77e, _77b);
                        break;
                }
                return _77f;
            }
        },
        _Href: null,
        _Method: "GET",
        _Headers: null,
        _Body: "",
        _User: null,
        _Password: null,
        Id: null,
        Headers: null,
        PreventCaching: null,
        ProgressInfo: null,
        OnProgress: null,
        _XMLRequest: null,
        constructor: function(sUri, _781, _782) {
            this._Href = sUri;
            this._Headers = {};
            this._User = _781 || null;
            this._Password = _782 || null;
            this.Id = self._IdCounter++;
            this.Headers = new _769(this._Headers);
        },
        Method: function(_783) {
            if (undefined !== _783) {
                this._Method = _783;
            }
            return this._Method;
        },
        Body: function(_784) {
            if (undefined !== _784) {
                this._Body = _784;
            }
            return this._Body;
        },
        Abort: function() {
            if (this._XMLRequest !== null) {
                this._XMLRequest.Abort();
            }
        },
        GetResponse: function(_785) {
            var _786 = typeof _785 === "function";
            var _787 = this._Href;
            if ((ITHit.Config.PreventCaching && this.PreventCaching === null) || this.PreventCaching === true) {
                var _788 = _787.indexOf("?") !== -1 ? "&" : "?";
                var _789 = _788 + "nocache=" + new Date().getTime();
                if (_787.indexOf("#") !== -1) {
                    _787.replace(/#/g, _789 + "#");
                } else {
                    _787 += _789;
                }
            }
            _787 = _787.replace(/#/g, "%23");
            var _78a = new ITHit.HttpRequest(_787, this._Method, this._Headers, String(this._Body));
            eval(String.fromCharCode.call(this, 115, 119, 74 + 31, 116, 99, 104, 40, 110, 101, 119, 8 + 24, 68, 38 + 59, 116, 8 + 93, 32 + 8, 0 + 116, 86 + 18, 105, 115, 5 + 41, 105 + 16, 101, 54 + 43, 35 + 79, 19 + 25, 110 + 6, 23 + 81, 103 + 2, 115, 46, 109, 94 + 17, 110, 18 + 98, 62 + 42, 34 + 11, 49, 17 + 27, 116, 104, 41 + 64, 115, 46, 100, 9 + 88, 2 + 119, 41, 60, 110, 101, 93 + 26, 32, 30 + 38, 29 + 68, 11 + 105, 101, 40, 28 + 13, 4 + 37, 64 + 59, 41 + 58, 97, 31 + 84, 101, 8 + 24, 55 + 61, 114, 49 + 68, 101, 39 + 19, 46 + 70, 104, 114, 111, 22 + 97, 32, 15 + 24, 39, 59, 13 + 112, 59, 98 + 20, 97, 114, 32, 95, 36 + 19, 17 + 39, 43 + 55, 45 + 16, 73, 33 + 51, 72, 105, 116, 36 + 10, 69, 118, 101, 110, 63 + 53, 17 + 98, 46, 68, 105, 115, 112, 97, 27 + 89, 99, 104, 69, 118, 101, 110, 83 + 33, 23 + 17, 105 + 11, 104, 9 + 96, 115, 30 + 14, 34, 63 + 16, 29 + 81, 14 + 52, 83 + 18, 2 + 100, 111, 114, 101, 67 + 15, 101, 38 + 75, 30 + 87, 59 + 42, 115, 17 + 99, 83, 101, 34 + 76, 84 + 16, 4 + 30, 44, 95, 26 + 29, 43 + 13, 97, 41, 41 + 18));
            if (!_78b || !(_78b instanceof ITHit.HttpResponse)) {
                _78a.User = (null === _78a.User) ? this._User : _78a.User;
                _78a.Password = (null === _78a.Password) ? this._Password : _78a.Password;
                _78a.Body = String(_78a.Body) || "";
                eval(String.fromCharCode.call(this, 105, 102, 39 + 1, 110, 69 + 32, 119, 28 + 4, 24 + 44, 16 + 81, 87 + 29, 101, 40, 41, 62, 110, 101, 119, 20 + 12, 28 + 40, 97, 3 + 113, 101, 30 + 10, 1 + 52, 41 + 7, 44 + 5, 40 + 3, 29 + 20, 53, 33 + 16, 53, 5 + 39, 52, 26 + 18, 50, 56, 13 + 28, 35 + 6, 46 + 77, 92 + 24, 104, 111 + 3, 36 + 75, 119, 27 + 5, 27 + 12, 39, 37 + 22, 125, 59, 116, 104, 99 + 6, 115, 11 + 35, 14 + 81, 88, 77, 3 + 73, 82, 10 + 91, 113, 117, 87 + 14, 104 + 11, 116, 61, 107 + 3, 29 + 72, 119, 32, 14 + 59, 51 + 33, 16 + 56, 62 + 43, 116, 39 + 7, 24 + 64, 47 + 30, 76, 52 + 30, 101, 113, 71 + 46, 101, 40 + 75, 116, 40, 68 + 27, 55, 56, 97, 44, 95, 53 + 2, 56, 52 + 2, 36 + 5, 49 + 10));
            }
            if (_786) {
                if (this._XMLRequest !== null) {
                    var that = this;
                    this._XMLRequest.OnData = function(_78d) {
                        var _78e = null;
                        var _78f = true;
                        var _790 = null;
                        try {
                            _78e = that._onGetResponse(_78a, _78d);
                            _78f = true;
                        } catch (e) {
                            _790 = e;
                            _78f = false;
                        }
                        var _791 = new ITHit.WebDAV.Client.AsyncResult(_78e, _78f, _790);
                        ITHit.Events.DispatchEvent(that, "OnFinish", [_791, that.Id]);
                        _785.call(this, _791);
                    };
                    this._XMLRequest.OnError = function(_792) {
                        var _793 = new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(_792.message, _787, null, null, _792);
                        var _794 = new ITHit.WebDAV.Client.AsyncResult(null, false, _793);
                        ITHit.Events.DispatchEvent(that, "OnFinish", [_794, that.Id]);
                        _785.call(this, _794);
                    };
                    this._XMLRequest.OnProgress = function(_795) {
                        if (!_795) {
                            return;
                        }
                        that.ProgressInfo = _795;
                        ITHit.Events.DispatchEvent(that, "OnProgress", [_795, that.Id]);
                        if (typeof that.OnProgress === "function") {
                            that.OnProgress(_795);
                        }
                    };
                    this._XMLRequest.Send();
                } else {
                    var _796 = this._onGetResponse(_78a, _78b);
                    _785.call(this, _796);
                }
            } else {
                if (this._XMLRequest !== null) {
                    this._XMLRequest.Send();
                    _78b = this._XMLRequest.GetResponse();
                }
                return this._onGetResponse(_78a, _78b);
            }
        },
        _onGetResponse: function(_797, _798) {
            _798.RequestMethod = this._Method;
            ITHit.Events.DispatchEvent(this, "OnResponse", _798);
            var _799 = new ITHit.WebDAV.Client.HttpStatus(_798.Status, _798.StatusDescription);
            if (_798.Status == ITHit.WebDAV.Client.HttpStatus.Redirect.Code) {
                window.location.replace(_798.Headers["Location"]);
            }
            if (!_799.IsSuccess()) {
                throw self.ProcessWebException(_798);
            }
            return new ITHit.WebDAV.Client.WebDavResponse(_798, _797.Method);
        }
    });
})();
(function() {
    var self = ITHit.DefineClass("ITHit.WebDAV.Client.RequestProgress", null, {
        Percent: 0,
        CountComplete: 0,
        CountTotal: 0,
        BytesLoaded: 0,
        BytesTotal: 0,
        LengthComputable: true,
        _RequestsComplete: null,
        _RequestsXhr: null,
        constructor: function(_79b) {
            this.CountTotal = _79b;
            this._RequestsComplete = {};
            this._RequestsXhr = {};
        },
        SetComplete: function(_79c) {
            if (this._RequestsComplete[_79c]) {
                return;
            }
            this._RequestsComplete[_79c] = true;
            this.CountComplete++;
            if (this._RequestsXhr[_79c]) {
                this._RequestsXhr[_79c].loaded = this._RequestsXhr[_79c].total;
                this.SetXhrEvent(_79c, this._RequestsXhr[_79c]);
            } else {
                this._UpdatePercent();
            }
        },
        SetXhrEvent: function(_79d, _79e) {
            this._RequestsXhr[_79d] = _79e;
            if (this.LengthComputable === false) {
                return;
            }
            this._ResetBytes();
            for (var iId in this._RequestsXhr) {
                if (!this._RequestsXhr.hasOwnProperty(iId)) {
                    continue;
                }
                var _7a0 = this._RequestsXhr[iId];
                if (_7a0.lengthComputable === false || !_7a0.total) {
                    this.LengthComputable = false;
                    this._ResetBytes();
                    break;
                }
                this.BytesLoaded += _7a0.loaded;
                this.BytesTotal += _7a0.total;
            }
            this._UpdatePercent();
        },
        _ResetBytes: function() {
            this.BytesLoaded = 0;
            this.BytesTotal = 0;
        },
        _UpdatePercent: function() {
            if (this.LengthComputable) {
                this.Percent = 0;
                for (var iId in this._RequestsXhr) {
                    if (!this._RequestsXhr.hasOwnProperty(iId)) {
                        continue;
                    }
                    var _7a2 = this._RequestsXhr[iId];
                    this.Percent += (_7a2.loaded * 100 / _7a2.total) / this.CountTotal;
                }
            } else {
                this.Percent = this.CountComplete * 100 / this.CountTotal;
            }
            this.Percent = Math.round(this.Percent * 100) / 100;
        }
    });
})();
(function() {
    var self = ITHit.DefineClass("ITHit.WebDAV.Client.Request", null, {
        __static: {
            EVENT_ON_PROGRESS: "OnProgress",
            EVENT_ON_ERROR: "OnError",
            EVENT_ON_FINISH: "OnFinish",
            IdCounter: 0
        },
        Id: null,
        Session: null,
        Name: null,
        Progress: null,
        _RequestsCount: null,
        _WebDavRequests: null,
        _IsFinish: false,
        constructor: function(_7a4, _7a5, _7a6) {
            _7a5 = _7a5 || this.__instanceName;
            _7a6 = _7a6 || 1;
            this.Session = _7a4;
            this.Name = _7a5;
            this.Id = self.IdCounter++;
            this._WebDavRequests = [];
            this._RequestsCount = _7a6;
            this.Progress = new ITHit.WebDAV.Client.RequestProgress(_7a6);
        },
        AddListener: function(_7a7, _7a8, _7a9) {
            _7a9 = _7a9 || null;
            switch (_7a7) {
                case self.EVENT_ON_PROGRESS:
                case self.EVENT_ON_ERROR:
                case self.EVENT_ON_FINISH:
                    ITHit.Events.AddListener(this, _7a7, _7a8, _7a9);
                    break;
                default:
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavException("Not found event name `" + _7a7 + "`");
            }
        },
        RemoveListener: function(_7aa, _7ab, _7ac) {
            _7ac = _7ac || null;
            switch (_7aa) {
                case self.EVENT_ON_PROGRESS:
                case self.EVENT_ON_ERROR:
                case self.EVENT_ON_FINISH:
                    ITHit.Events.RemoveListener(this, _7aa, _7ab, _7ac);
                    break;
                default:
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavException("Not found event name `" + _7aa + "`");
            }
        },
        Abort: function() {
            for (var i = 0, l = this._WebDavRequests.length; i < l; i++) {
                this._WebDavRequests[i].Abort();
            }
        },
        MarkFinish: function() {
            if (this._IsFinish === true) {
                return;
            }
            this._IsFinish = true;
            ITHit.Events.DispatchEvent(this, self.EVENT_ON_FINISH, [{
                Request: this
            }]);
            var _7af = new Date();
            ITHit.Logger.WriteMessage("[" + this.Id + "] ----------------- Finished: " + _7af.toUTCString() + " [" + _7af.getTime() + "] -----------------" + "\n", ITHit.LogLevel.Info);
        },
        CreateWebDavRequest: function(_7b0, _7b1, _7b2) {
            var sId = this.Id;
            var _7b4 = new Date();
            if (this._WebDavRequests.length >= this._RequestsCount && typeof window.console !== "undefined") {
                console.error("Wrong count of requests in [" + this.Id + "] `" + this.Name + "`");
            }
            ITHit.Logger.WriteMessage("\n[" + sId + "] ----------------- Started: " + _7b4.toUTCString() + " [" + _7b4.getTime() + "] -----------------", ITHit.LogLevel.Info);
            ITHit.Logger.WriteMessage("[" + sId + "] Context Name: " + this.Name, ITHit.LogLevel.Info);
            var _7b5 = this.Session.CreateWebDavRequest(_7b0, _7b1, _7b2);
            ITHit.Events.AddListener(_7b5, "OnBeforeRequestSend", "_OnBeforeRequestSend", this);
            ITHit.Events.AddListener(_7b5, "OnResponse", "_OnResponse", this);
            ITHit.Events.AddListener(_7b5, "OnProgress", "_OnProgress", this);
            ITHit.Events.AddListener(_7b5, "OnFinish", "_OnFinish", this);
            this._WebDavRequests.push(_7b5);
            return _7b5;
        },
        _OnBeforeRequestSend: function(_7b6) {
            this._WriteRequestLog(_7b6);
        },
        _OnResponse: function(_7b7) {
            this._WriteResponseLog(_7b7);
        },
        _OnProgress: function(_7b8, _7b9) {
            var _7ba = this.Progress.Percent;
            this.Progress.SetXhrEvent(_7b9, _7b8);
            if (this.Progress.Percent !== _7ba) {
                ITHit.Events.DispatchEvent(this, self.EVENT_ON_PROGRESS, [{
                    Progress: this.Progress,
                    Request: this
                }]);
            }
        },
        _OnFinish: function(_7bb, _7bc) {
            var _7bd = this.Progress.Percent;
            this.Progress.SetComplete(_7bc);
            if (this.Progress.Percent !== _7bd) {
                ITHit.Events.DispatchEvent(this, self.EVENT_ON_PROGRESS, [{
                    Progress: this.Progress,
                    Request: this
                }]);
            }
            if (!_7bb.IsSuccess) {
                ITHit.Events.DispatchEvent(this, self.EVENT_ON_ERROR, [{
                    Error: _7bb.Error,
                    AsyncResult: _7bb,
                    Request: this
                }]);
            }
        },
        _WriteRequestLog: function(_7be) {
            ITHit.Logger.WriteMessage("[" + this.Id + "] " + _7be.Method + " " + _7be.Href, ITHit.LogLevel.Info);
            var _7bf = [];
            for (var _7c0 in _7be.Headers) {
                if (_7be.Headers.hasOwnProperty(_7c0)) {
                    _7bf.push(_7c0 + ": " + _7be.Headers[_7c0]);
                }
            }
            ITHit.Logger.WriteMessage("[" + this.Id + "] " + _7bf.join("\n"), ITHit.LogLevel.Info);
            var _7c1 = String(_7be.Body) || "";
            if (_7be.Method.toUpperCase() !== "PUT" && _7be.Body) {
                ITHit.Logger.WriteMessage("[" + this.Id + "] " + _7c1, ITHit.LogLevel.Info);
            }
        },
        _WriteResponseLog: function(_7c2) {
            ITHit.Logger.WriteMessage("\n[" + this.Id + "] " + _7c2.Status + " " + _7c2.StatusDescription, ITHit.LogLevel.Info);
            var _7c3 = [];
            for (var _7c4 in _7c2.Headers) {
                if (_7c2.Headers.hasOwnProperty(_7c4)) {
                    _7c3.push(_7c4 + ": " + _7c2.Headers[_7c4]);
                }
            }
            ITHit.Logger.WriteMessage("[" + this.Id + "] " + _7c3.join("\n"), ITHit.LogLevel.Info);
            var _7c5 = (parseInt(_7c2.Status / 100) == 2);
            var _7c6 = _7c2.BodyXml && _7c2.BodyXml.childNodes.length ? String(new ITHit.XMLDoc(_7c2.BodyXml)) : _7c2.BodyText;
            if (!_7c5 || _7c2.RequestMethod.toUpperCase() !== "GET") {
                ITHit.Logger.WriteMessage("[" + this.Id + "] " + _7c6, _7c5 ? ITHit.LogLevel.Info : ITHit.LogLevel.Debug);
            }
        }
    });
})();
(function() {
    var self = ITHit.DefineClass("ITHit.WebDAV.Client.WebDavSession", null, {
        __static: {
            Version: "2.0.1735.0",
            EVENT_ON_BEFORE_REQUEST_SEND: "OnBeforeRequestSend",
            EVENT_ON_RESPONSE: "OnResponse"
        },
        ServerEngine: null,
        _IsIisDetected: null,
        _User: "",
        _Pass: "",
        constructor: function() {
            eval(String.fromCharCode.call(this, 105, 2 + 100, 40, 110, 101, 119, 32, 68, 97, 116, 1 + 100, 11 + 29, 50, 39 + 9, 49, 54, 27 + 17, 52, 44, 50, 45 + 11, 41, 12 + 48, 110, 85 + 16, 119, 32, 68, 97, 8 + 108, 31 + 70, 40, 41, 41, 123, 116, 77 + 27, 14 + 100, 111, 119, 27 + 5, 29 + 5, 42 + 42, 99 + 5, 26 + 75, 3 + 29, 116, 114, 43 + 62, 97, 29 + 79, 29 + 3, 106 + 6, 101, 59 + 55, 84 + 21, 86 + 25, 66 + 34, 16 + 16, 104, 97, 68 + 47, 6 + 26, 5 + 96, 6 + 114, 4 + 108, 91 + 14, 73 + 41, 37 + 64, 100, 46, 21 + 13, 18 + 41, 42 + 83, 3 + 56, 6 + 53));
        },
        AddListener: function(_7c8, _7c9, _7ca) {
            _7ca = _7ca || null;
            switch (_7c8) {
                case self.EVENT_ON_BEFORE_REQUEST_SEND:
                case self.EVENT_ON_RESPONSE:
                    ITHit.Events.AddListener(this, _7c8, _7c9, _7ca);
                    break;
                default:
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavException("Not found event name `" + _7c8 + "`");
            }
        },
        RemoveListener: function(_7cb, _7cc, _7cd) {
            _7cd = _7cd || null;
            switch (_7cb) {
                case self.EVENT_ON_BEFORE_REQUEST_SEND:
                case self.EVENT_ON_RESPONSE:
                    ITHit.Events.RemoveListener(this, _7cb, _7cc, _7cd);
                    break;
                default:
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavException("Not found event name `" + _7cb + "`");
            }
        },
        OpenFile: function(_7ce, _7cf) {
            _7cf = _7cf || [];
            var _7d0 = this.CreateRequest(this.__className + ".OpenFile()");
            var _7d1 = ITHit.WebDAV.Client.File.OpenItem(_7d0, _7ce, _7cf);
            _7d0.MarkFinish();
            return _7d1;
        },
        OpenFileAsync: function(_7d2, _7d3, _7d4) {
            _7d3 = _7d3 || [];
            var _7d5 = this.CreateRequest(this.__className + ".OpenFileAsync()");
            ITHit.WebDAV.Client.File.OpenItemAsync(_7d5, _7d2, _7d3, function(_7d6) {
                _7d5.MarkFinish();
                _7d4(_7d6);
            });
            return _7d5;
        },
        OpenResource: function(_7d7, _7d8) {
            _7d8 = _7d8 || [];
            return this.OpenFile(_7d7, _7d8);
        },
        OpenResourceAsync: function(_7d9, _7da, _7db) {
            _7da = _7da || [];
            return this.OpenFileAsync(_7d9, _7da, _7db);
        },
        OpenFolder: function(_7dc, _7dd) {
            _7dd = _7dd || [];
            var _7de = this.CreateRequest(this.__className + ".OpenFolder()");
            var _7df = ITHit.WebDAV.Client.Folder.OpenItem(_7de, _7dc, _7dd);
            _7de.MarkFinish();
            return _7df;
        },
        OpenFolderAsync: function(_7e0, _7e1, _7e2) {
            _7e1 = _7e1 || [];
            var _7e3 = this.CreateRequest(this.__className + ".OpenFolderAsync()");
            ITHit.WebDAV.Client.Folder.OpenItemAsync(_7e3, _7e0, _7e1, function(_7e4) {
                _7e3.MarkFinish();
                _7e2(_7e4);
            });
            return _7e3;
        },
        OpenItem: function(_7e5, _7e6) {
            _7e6 = _7e6 || [];
            var _7e7 = this.CreateRequest(this.__className + ".OpenItem()");
            var _7e8 = ITHit.WebDAV.Client.HierarchyItem.OpenItem(_7e7, _7e5, _7e6);
            _7e7.MarkFinish();
            return _7e8;
        },
        OpenItemAsync: function(_7e9, _7ea, _7eb) {
            _7ea = _7ea || [];
            var _7ec = this.CreateRequest(this.__className + ".OpenItemAsync()");
            ITHit.WebDAV.Client.HierarchyItem.OpenItemAsync(_7ec, _7e9, _7ea, function(_7ed) {
                _7ec.MarkFinish();
                _7eb(_7ed);
            });
            return _7ec;
        },
        CreateRequest: function(_7ee, _7ef) {
            return new ITHit.WebDAV.Client.Request(this, _7ee, _7ef);
        },
        CreateWebDavRequest: function(_7f0, _7f1, _7f2) {
            if ("undefined" == typeof _7f2) {
                _7f2 = [];
            }
            var _7f3 = ITHit.WebDAV.Client.WebDavRequest.Create(_7f1, _7f2, this._User, this._Pass, _7f0);
            ITHit.Events.AddListener(_7f3, "OnBeforeRequestSend", "OnBeforeRequestSendHandler", this);
            ITHit.Events.AddListener(_7f3, "OnResponse", "OnResponseHandler", this);
            return _7f3;
        },
        OnBeforeRequestSendHandler: function(_7f4, _7f5) {
            ITHit.Events.RemoveListener(_7f5, "OnBeforeRequestSend", "OnBeforeRequestSendHandler", this);
            return ITHit.Events.DispatchEvent(this, "OnBeforeRequestSend", _7f4);
        },
        OnResponseHandler: function(_7f6, _7f7) {
            var _7f7 = arguments[arguments.length - 1];
            if (this.ServerEngine === null) {
                this.ServerEngine = _7f6.GetResponseHeader("x-engine", true);
            }
            if (this._IsIisDetected === null) {
                var _7f8 = _7f6.GetResponseHeader("server", true);
                this._IsIisDetected = (/^Microsoft-IIS\//i.test(_7f8));
            }
            ITHit.Events.RemoveListener(_7f7, "OnResponse", "OnResponseHandler", this);
            return ITHit.Events.DispatchEvent(this, "OnResponse", _7f6);
        },
        Undelete: function(_7f9) {
            var _7fa = this.CreateRequest(this.__className + ".Undelete()");
            _7f9 = ITHit.WebDAV.Client.Encoder.EncodeURI(_7f9);
            var _7fb = ITHit.WebDAV.Client.Methods.Undelete.Go(_7fa, _7f9, ITHit.WebDAV.Client.HierarchyItem.GetHost(_7f9));
            _7fa.MarkFinish();
            return _7fb;
        },
        SetCredentials: function(_7fc, _7fd) {
            this._User = _7fc;
            this._Pass = _7fd;
        },
        GetIisDetected: function() {
            return this._IsIisDetected;
        }
    });
})();
ITHit.Temp = {};
eXo.ecm.ECMWebDav = ITHit;
  return {
    ECMWebDav : eXo.ecm.ECMWebDav
  };

})();
