(function() {
  var ECMWebDav = function() {}
// Declare ITHit core.
    if ("undefined" === typeof ITHit) {
        (function () {
            this.ITHit = {
                _oComponents: {}, _oNamespace: {}, Define: function (_1) {
                    this._oComponents[_1] = true;
                }, Defined: function (_2) {
                    return !!this._oComponents[_2];
                }, Add: function (_3, _4) {
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
                }, Temp: {}
            };
        })();
    }
    ITHit.Config = {Global: window, ShowOriginalException: true, PreventCaching: false};
    ITHit.Add("GetNamespace", function (_9, _a, _b) {
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
    ITHit.Add("Namespace", function (_11, _12) {
        return ITHit.GetNamespace(_11, false, _12);
    });
    ITHit.Add("Declare", function (_13, _14) {
        return ITHit.GetNamespace(_13, true, _14);
    });
    ITHit.Add("DetectOS", function () {
        var _15 = navigator.platform, _16 = {
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
    ITHit.Add("DetectBrowser", function () {
        var _17 = navigator.userAgent, _18 = {
            IE: false,
            FF: false,
            Chrome: false,
            Safari: false,
            Opera: false,
            Browser: null,
            Mac: false
        }, _19 = {
            IE: {Search: "MSIE", Browser: "IE"},
            IE11: {Search: "Trident/7", Version: "rv", Browser: "IE"},
            Edge: {Search: "Edge", Browser: "Edge"},
            FF: {Search: "Firefox", Browser: "FF"},
            Chrome: {Search: "Chrome", Browser: "Chrome"},
            Safari: {
                Search: "Safari",
                Version: "Version",
                Browser: "Safari",
                Mac: "Macintosh",
                iPad: "iPad",
                iPhone: "iPhone"
            },
            Opera: {Search: "Opera", Browser: "Opera"}
        };
        for (var _1a in _19) {
            var pos = _17.indexOf(_19[_1a].Search);
            if (-1 != pos) {
                _18.Browser = _19[_1a].Browser;
                _18.Mac = navigator.platform.indexOf("Mac") == 0;
                _18.iPad = (_19[_1a].iPad && _17.indexOf(_19[_1a].iPad) != -1);
                _18.iPhone = (_19[_1a].iPhone && _17.indexOf(_19[_1a].iPhone) != -1);
                var _1c = _19[_1a].Version || _19[_1a].Search, _1d = _17.indexOf(_1c);
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
    ITHit.Add("DetectDevice", function () {
        var _1e = navigator.userAgent;
        var _1f = {};
        var _20 = {
            Android: {Search: "Android"},
            BlackBerry: {Search: "BlackBerry"},
            iOS: {Search: "iPhone|iPad|iPod"},
            Opera: {Search: "Opera Mini"},
            Windows: {Search: "IEMobile"},
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
    ITHit.Add("HttpRequest", function (_24, _25, _26, _27, _28, _29) {
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
    ITHit.Add("HttpResponse", function () {
        var _2a = function (_2b, _2c, _2d, _2e) {
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
        _2a.prototype._SetBody = function (_2f, _30) {
            this.BodyXml = _2f || null;
            this.BodyText = _30 || "";
        };
        _2a.prototype.SetBodyText = function (_31) {
            this.BodyXml = null;
            this.BodyText = _31;
        };
        _2a.prototype.SetBodyXml = function (_32) {
            this.BodyXml = _32;
            this.BodyText = "";
        };
        _2a.prototype.ParseXml = function (_33) {
            if (!ITHit.Utils.IsString(_33)) {
                throw new ITHit.Exception("Expected XML string in ITHit.HttpResponse.ParseXml", "sXml");
            }
            var _34 = new ITHit.XMLDoc();
            _34.load(_33);
            this.BodyXml = _34._get();
            this.BodyText = _33;
        };
        _2a.prototype.GetResponseHeader = function (_35, _36) {
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
    ITHit.Add("XMLRequest", (function () {
        var _38;
        var _39 = function () {
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
                        } catch (e) {
                        }
                    }
                }
            } else {
                if ("undefined" != typeof XMLHttpRequest) {
                    return new XMLHttpRequest();
                }
            }
            throw new ITHit.Exception("XMLHttpRequest (AJAX) not supported");
        };
        var _3d = function (_3e) {
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
        var _44 = function (_45, _46) {
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
                    } catch (e) {
                    }
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
                } catch (e) {
                }
            }
            if (this.bAsync) {
                var _4c = this;
                this.oRequest.onreadystatechange = function () {
                    if (_4c.oRequest.readyState != 4) {
                        return;
                    }
                    var _4d = _4c.GetResponse();
                    if (typeof _4c.OnData === "function") {
                        _4c.OnData.call(_4c, _4d);
                    }
                };
                if ("onprogress" in this.oRequest) {
                    this.oRequest.onprogress = function (_4e) {
                        if (typeof _4c.OnProgress === "function") {
                            _4c.OnProgress.call(_4c, _4e);
                        }
                    };
                }
            }
        };
        _44.prototype.Send = function () {
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
        _44.prototype.Abort = function () {
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
        _44.prototype.GetResponse = function () {
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
        _44.prototype.FixResponseStatus = function (_55, _56) {
            var _57 = {Status: _55, StatusDescription: _56};
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
        IsString: function (_58) {
            return (("string" == typeof _58) || (_58 instanceof String));
        }, IsNumber: function (_59) {
            return ("number" == typeof _59);
        }, IsBoolean: function (_5a) {
            return (("boolean" == typeof _5a) || (_5a instanceof Boolean));
        }, IsInteger: function (_5b) {
            return this.IsNumber(_5b) && (-1 == String(_5b).indexOf("."));
        }, IsArray: function (_5c) {
            return (_5c instanceof Array || ("array" == typeof _5c));
        }, IsFunction: function (_5d) {
            return (_5d instanceof Function);
        }, IsObject: function (_5e) {
            return ("object" == typeof _5e);
        }, IsDate: function (_5f) {
            return (_5f instanceof Date);
        }, IsRegExp: function (_60) {
            return (_60 instanceof RegExp);
        }, IsObjectStrict: function (_61) {
            return this.IsObject(_61) && !this.IsArray(_61) && !this.IsString(_61) && !this.IsNull(_61) && !this.IsNumber(_61) && !this.IsDate(_61) && !this.IsRegExp(_61) && !this.IsBoolean(_61) && !this.IsFunction(_61) && !this.IsNull(_61);
        }, IsUndefined: function (_62) {
            return (undefined === _62);
        }, IsNull: function (_63) {
            return (null === _63);
        }, IsDOMObject: function (_64) {
            return _64 && this.IsObject(_64) && !this.IsUndefined(_64.nodeType);
        }, HtmlEscape: function (_65) {
            return String(_65).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }, IndexOf: function (_66, _67, _68) {
            var i = 0, _6a = _66 && _66.length;
            if (typeof _68 == "number") {
                i = _68 < 0 ? Math.max(0, _6a + _68) : _68;
            }
            for (; i < _6a; i++) {
                if (_66[i] === _67) {
                    return i;
                }
            }
            return -1;
        }, CreateDOMElement: function (_6b, _6c) {
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
        }, GetComputedStyle: function (_75) {
            ITHit.Utils.GetComputedStyle = ITHit.Components.dojo.getComputedStyle;
            return ITHit.Utils.GetComputedStyle(_75);
        }, MakeScopeClosure: function (_76, _77, _78) {
            if (this.IsUndefined(_78)) {
                return this._GetClosureFunction(_76, _77);
            } else {
                if (!this.IsArray(_78)) {
                    _78 = [_78];
                }
                return this._GetClosureParamsFunction(_76, _77, _78);
            }
        }, _GetClosureParamsFunction: function (_79, _7a, _7b) {
            return function () {
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
        }, _GetClosureFunction: function (_7f, _80) {
            return function () {
                return _7f[_80].apply(_7f, arguments);
            };
        }
    });
    ITHit.Add("Trim", function (_81, _82, _83) {
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
    ITHit.Add("Exception", (function () {
        var _84 = function (_85, _86) {
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
        _84.prototype.GetExceptionsStack = function (_88, _89) {
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
        _84.prototype.toString = function () {
            return this.GetExceptionsStack();
        };
        return _84;
    })());
    ITHit.Add("Extend", function (_8f, _90) {
        function inheritance() {
        }

        inheritance.prototype = _90.prototype;
        _8f.prototype = new inheritance();
        _8f.prototype.constructor = _8f;
        _8f.baseConstructor = _90;
        if (_90.base) {
            _90.prototype.base = _90.base;
        }
        _8f.base = _90.prototype;
    });
    ITHit.Add("Events", function () {
        var _91 = function () {
            this._Listeners = this._NewObject();
            this._DispatchEvents = {};
            this._DelayedDelete = {};
        };
        _91.prototype._NewObject = function () {
            var obj = {};
            for (var _93 in obj) {
                delete obj[_93];
            }
            return obj;
        };
        _91.prototype.AddListener = function (_94, _95, _96, _97) {
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
        _91.prototype.DispatchEvent = function (_a0, _a1, _a2) {
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
        _91.prototype.RemoveListener = function (_aa, _ab, _ac, _ad) {
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
        _91.prototype.RemoveAllListeners = function (_b2, _b3) {
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
        _91.prototype._CheckDelayedDelete = function (_b5, _b6) {
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
        _91.prototype.ListenersLength = function (_b8, _b9) {
            var _ba = _b8.__instanceName;
            if (!this._Listeners[_ba] || !this._Listeners[_ba][_b9]) {
                return 0;
            }
            return this._Listeners[_ba][_b9].length;
        };
        _91.prototype.Fix = function (e) {
            e = e || window.event;
            if (!e.target && e.srcElement) {
                e.target = e.srcElement;
            }
            if ((null == e.pageX) && (null != e.clientX)) {
                var _bc = document.documentElement, _bd = document.body;
                e.pageX = e.clientX + (_bc && _bc.scrollLeft || _bd && _bd.scrollLeft || 0) - (_bc.clientLeft || 0);
                e.pageY = e.clientY + (_bc && _bc.scrollTop || _bd && _bd.scrollTop || 0) - (_bc.clientTop || 0);
            }
            if (!e.which && e.button) {
                e.which = e.button & 1 ? 1 : (e.button & 2 ? 3 : (e.button & 4 ? 2 : 0));
            }
            return e;
        };
        _91.prototype.AttachEvent = function (_be, _bf, _c0) {
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
        _91.prototype.DettachEvent = function (_c1, _c2, _c3) {
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
        _91.prototype.Stop = function (e) {
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
    ITHit.Add("EventHandler", function () {
        var _c5 = function (_c6, _c7) {
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
        _c5.prototype.IsEqual = function (_c9, _ca) {
            if (_c9 instanceof ITHit.EventHandler) {
                return this.GetCredentials() === _c9.GetCredentials();
            } else {
                return ((_c9 || null) === this.Scope) && (_ca === this.Method);
            }
        };
        _c5.prototype.GetCredentials = function () {
            return this.Name + "::" + this.Method;
        };
        _c5.prototype.CallHandler = function (_cb, _cc, _cd) {
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
    ITHit.Add("HtmlEncode", function (_ce) {
        return _ce.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&amp;").replace(/"/g, "&quot;");
    });
    ITHit.Add("HtmlDecode", function (_cf) {
        return _cf.replace(/&quot;/, "\"").replace(/&amp;/g, "'").replace(/&gt;/g, ">").replace(/&lt;/g, "<");
    });
    ITHit.Add("Encode", function (_d0) {
        if (!_d0) {
            return _d0;
        }
        return ITHit.EncodeURI(_d0.replace(/%/g, "%25")).replace(/~/g, "%7E").replace(/!/g, "%21").replace(/@/g, "%40").replace(/#/g, "%23").replace(/\$/g, "%24").replace(/&/g, "%26").replace(/\*/g, "%2A").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\-/g, "%2D").replace(/_/g, "%5F").replace(/\+/g, "%2B").replace(/\=/g, "%3D").replace(/'/g, "%27").replace(/;/g, "%3B").replace(/\,/g, "%2C").replace(/\?/g, "%3F");
    });
    ITHit.Add("EncodeURI", function (_d1) {
        if (!_d1) {
            return _d1;
        }
        return encodeURI(_d1).replace(/%25/g, "%");
    });
    ITHit.Add("Decode", function (_d2) {
        if (!_d2) {
            return _d2;
        }
        var _d2 = _d2.replace(/%7E/gi, "~").replace(/%21/g, "!").replace(/%40/g, "@").replace(/%23/g, "#").replace(/%24/g, "$").replace(/%26/g, "&").replace(/%2A/gi, "*").replace(/%28/g, "(").replace(/%29/g, ")").replace(/%2D/gi, "-").replace(/%5F/gi, "_").replace(/%2B/gi, "+").replace(/%3D/gi, "=").replace(/%27/g, "'").replace(/%3B/gi, ";").replace(/%2E/gi, ".").replace(/%2C/gi, ",").replace(/%3F/gi, "?");
        return ITHit.DecodeURI(_d2);
    });
    ITHit.Add("DecodeURI", function (_d3) {
        if (!_d3) {
            return _d3;
        }
        return decodeURI(_d3.replace(/%([^0-9A-F]|.(?:[^0-9A-F]|$)|$)/gi, "%25$1"));
    });
    ITHit.Add("DecodeHost", function (_d4) {
        if (/^(http|https):\/\/[^:\/]*?%/.test(_d4)) {
            var _d5 = _d4.match(/^(?:http|https):\/\/[^\/:]+/);
            if (_d5 && _d5[0]) {
                var _d6 = _d5[0].replace(/^(http|https):\/\//, "");
                _d4 = _d4.replace(_d6, ITHit.Decode(_d6));
            }
        }
        return _d4;
    });
    (function () {
        var _d7 = function () {
        };
        var _d8 = function (_d9, _da) {
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
        var _dd = function (_de, _df) {
            return function () {
                var old = this._super;
                this._super = _df;
                var r = _de.apply(this, arguments);
                this._super = old;
                return r;
            };
        };
        var _e2 = 0;
        ITHit.Add("DefineClass", function (_e3, _e4, _e5, _e6) {
            _e4 = _e4 !== null ? _e4 : function () {
            };
            if (!_e4) {
                throw new Error("Not found extended class for " + _e3);
            }
            if (_e5.hasOwnProperty("__static")) {
                _e6 = _e5.__static;
                delete _e5.__static;
            }
            var _e7;
            if (_e5 && _e5.hasOwnProperty("constructor")) {
                _e7 = function () {
                    this.__instanceName = this.__className + _e2++;
                    return _dd(_e5.constructor, _e4).apply(this, arguments);
                };
            } else {
                _e7 = function () {
                    this.__instanceName = this.__className + _e2++;
                    return _e4.apply(this, arguments);
                };
            }
            for (var _e8 in _e4) {
                _e7[_e8] = _e4[_e8];
            }
            _d8(_e7, _e6);
            var _e9 = function () {
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
            var _ee = _e3.lastIndexOf("."), _ef = _e3.substr(_ee + 1);
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
    ITHit.oNS.LoggerException = function (_f0, _f1) {
        ITHit.Exceptions.LoggerException.baseConstructor.call(this, _f0, _f1);
    };
    ITHit.Extend(ITHit.oNS.LoggerException, ITHit.Exception);
    ITHit.oNS.LoggerException.prototype.Name = "LoggerException";
    ITHit.DefineClass("ITHit.LogLevel", null, {}, {All: 32, Debug: 16, Info: 8, Warn: 4, Error: 2, Fatal: 1, Off: 0});
    (function () {
        var _f2 = {};
        var _f3 = {};
        var _f4 = {};
        for (var _f5 in ITHit.LogLevel) {
            _f2[ITHit.LogLevel[_f5]] = [];
            _f4[ITHit.LogLevel[_f5]] = [];
        }
        var _f6 = function (_f7, _f8, iTo, _fa) {
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
        _f6.add = function (iTo, _fe) {
            _f6.increase(ITHit.LogLevel.Off, iTo, _fe);
        };
        _f6.del = function (iTo, _100) {
            _f6.decrease(ITHit.LogLevel.Off, iTo, _100);
        };
        _f6.increase = function (_101, iTo, _103) {
            _f6(true, _101, iTo, _103);
        };
        _f6.decrease = function (_104, iTo, _106) {
            _f6(false, _104, iTo, _106);
        };
        ITHit.DefineClass("ITHit.Logger", null, {}, {
            Level: ITHit.Config.LogLevel || ITHit.LogLevel.Debug,
            AddListener: function (_107, _108) {
                if (_108 == ITHit.LogLevel.Off) {
                    this.RemoveListener();
                }
                var _109 = 0;
                var _10a = 0;
                outer:for (var _10b in _f2) {
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
            RemoveListener: function (_10d) {
                outer:for (var _10e in _f2) {
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
            SetLogLevel: function (_110, _111) {
                return this.AddListener(_110, _111, true);
            },
            GetLogLevel: function (_112) {
                for (var _113 in _f2) {
                    for (var i = 0; i < _f2[_113].length; i++) {
                        if (_f2[_113][i] == _112) {
                            return _113;
                        }
                    }
                }
                return false;
            },
            GetListenersForLogLevel: function (_115) {
                return _f4[_115];
            },
            GetCount: function (_116) {
                return _f4[_116].length;
            },
            WriteResponse: function (_117) {
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
            WriteMessage: function (_11a, _11b) {
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
            StartLogging: function () {
            },
            FinishLogging: function () {
            },
            StartRequest: function () {
            },
            FinishRequest: function () {
            }
        });
    })();
    ITHit.oNS = ITHit.Declare("ITHit.Exceptions");
    ITHit.oNS.PhraseException = function (_11e, _11f) {
        ITHit.Exceptions.PhraseException.baseConstructor.call(this, _11e, _11f);
    };
    ITHit.Extend(ITHit.oNS.PhraseException, ITHit.Exception);
    ITHit.oNS.PhraseException.prototype.Name = "PhraseException";
    ITHit.Phrases = (function () {
        var _120 = {};
        var _121 = function (_122) {
            this._arguments = _122;
        };
        _121.prototype.Replace = function (_123) {
            var _124 = _123.substr(1, _123.length - 2);
            return ("undefined" != typeof this._arguments[_124]) ? this._arguments[_124] : _123;
        };
        var _125 = function (_126) {
            this._phrase = _126;
        };
        _125.prototype.toString = function () {
            return this._phrase;
        };
        _125.prototype.Paste = function () {
            var _127 = this._phrase;
            if (/\{\d+?\}/.test(_127)) {
                var _128 = new _121(arguments);
                _127 = _127.replace(/\{(\d+?)\}/g, function (args) {
                    return _128.Replace(args);
                });
            }
            return _127;
        };
        var _12a = function () {
        };
        _12a.prototype.LoadJSON = function (_12b, _12c) {
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
        _12a.prototype.LoadLocalizedJSON = function (_130, _131, _132) {
            var _133 = ITHit.Utils, _134 = _133.IsUndefined, _135 = _133.IsObject;
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
        _12a.prototype._MergePhrases = function (dest, _138) {
            var _139 = ITHit.Utils, _13a = _139.IsUndefined, _13b = _139.IsObject;
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
        _12a.prototype._AddPhrases = function (_13d, _13e) {
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
    ITHit.oNS.XPathException = function (_140, _141) {
        ITHit.Exceptions.XPathException.baseConstructor.call(this, _140, _141);
    };
    ITHit.Extend(ITHit.oNS.XPathException, ITHit.Exception);
    ITHit.oNS.XPathException.prototype.Name = "XPathException";
    ITHit.XPath = {_component: null, _version: null};
    ITHit.XPath.evaluate = function (_142, _143, _144, _145, _146) {
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
                } catch (e) {
                }
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
    ITHit.XPath.selectSingleNode = function (_158, _159, _15a) {
        return ITHit.XPath.evaluate(_158, _159, _15a, false, true);
    };
    ITHit.XPath.resolver = function () {
        this._ns = {};
        this._length = 0;
    };
    ITHit.XPath.resolver.prototype.add = function (_15b, sNs) {
        this._ns[_15b] = sNs;
        this._length++;
    };
    ITHit.XPath.resolver.prototype.remove = function (_15d) {
        delete this._ns[_15d];
        this._length--;
    };
    ITHit.XPath.resolver.prototype.get = function (_15e) {
        return this._ns[_15e] || null;
    };
    ITHit.XPath.resolver.prototype.lookupNamespaceURI = ITHit.XPath.resolver.prototype.get;
    ITHit.XPath.resolver.prototype.getAll = function () {
        var oOut = {};
        for (var _160 in this._ns) {
            oOut[_160] = this._ns[_160];
        }
        return oOut;
    };
    ITHit.XPath.resolver.prototype.length = function () {
        return this._length;
    };
    ITHit.XPath.result = function (_161) {
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
    ITHit.XPath.result.prototype.iterateNext = function (_162) {
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
    ITHit.XPath.result.prototype.type = function () {
        return this._res.resultType;
    };
    ITHit.XPath.result.prototype._get = function () {
        return this._res;
    };
    ITHit.oNS = ITHit.Declare("ITHit.Exceptions");
    ITHit.oNS.XMLDocException = function (_164, _165) {
        ITHit.Exceptions.XMLDocException.baseConstructor.call(this, _164, _165);
    };
    ITHit.Extend(ITHit.oNS.XMLDocException, ITHit.Exception);
    ITHit.oNS.XMLDocException.prototype.Name = "XMLDocException";
    ITHit.XMLDoc = (function () {
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
        var _173 = function (_174) {
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
        _173.prototype.contentEncoding = function (_178) {
            if (undefined !== _178) {
                this._encoding = _178;
            }
            return this._encoding;
        };
        _173.prototype.load = function (_179) {
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
        _173.prototype.appendChild = function (_17e) {
            if (!_17e instanceof ITHit.XMLDoc) {
                throw ITHit.Exceptions.XMLDocException("Instance of XMLDoc was expected in appendChild method.");
            }
            this._xml.appendChild(_17e._get());
        };
        _173.prototype.createElement = function (_17f) {
            return new _173(this._xml.createElement(_17f));
        };
        _173.prototype.createElementNS = function (sNS, _181) {
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
        _173.prototype.createTextNode = function (_183) {
            return new _173(this._xml.createTextNode(_183));
        };
        _173.prototype.getElementById = function (sId) {
            return new _173(this._xml.getElementById(sId));
        };
        _173.prototype.getElementsByTagName = function (_185) {
            return new _173(this._xml.getElementsByTagName(_185));
        };
        _173.prototype.childNodes = function () {
            var _186 = this._xml.childNodes;
            var _187 = [];
            for (var i = 0; i < _186.length; i++) {
                _187.push(new ITHit.XMLDoc(_186[i]));
            }
            return _187;
        };
        _173.prototype.getElementsByTagNameNS = function (_189, _18a) {
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
        _173.prototype.setAttribute = function (_193, _194) {
            this._xml.setAttribute(_193, _194);
        };
        _173.prototype.hasAttribute = function (_195) {
            return this._xml.hasAttribute(_195);
        };
        _173.prototype.getAttribute = function (_196) {
            return this._xml.getAttribute(_196);
        };
        _173.prototype.removeAttribute = function (_197) {
            this._xml.removeAttribute(_197);
        };
        _173.prototype.hasAttributeNS = function (_198) {
            return this._xml.hasAttribute(_198);
        };
        _173.prototype.getAttributeNS = function (_199) {
            return this._xml.getAttribute(_199);
        };
        _173.prototype.removeAttributeNS = function (_19a) {
            this._xml.removeAttribute(_19a);
        };
        _173.prototype.removeChild = function (_19b) {
            if (!_19b instanceof ITHit.XMLDoc) {
                throw ITHit.Exceptions.XMLDocException("Instance of XMLDoc was expected in ITHit.XMLDoc.removeChild() method.");
            }
            this._xml.removeChild(_19b);
            return new ITHit.XMLDoc(_19b);
        };
        _173.prototype.removeNode = function (_19c) {
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
        _173.prototype.cloneNode = function (_19d) {
            if (undefined === _19d) {
                _19d = true;
            }
            return new ITHit.XMLDoc(this._xml.cloneNode(_19d));
        };
        _173.prototype.getProperty = function (_19e) {
            return this._xml[_19e];
        };
        _173.prototype.setProperty = function (_19f, _1a0) {
            this._xml[_19f] = _1a0;
        };
        _173.prototype.nodeName = function () {
            return this._xml.nodeName;
        };
        _173.prototype.nextSibling = function () {
            return new ITHit.XMLDoc(this._xml.nextSibling);
        };
        _173.prototype.namespaceURI = function () {
            return this._xml.namespaceURI;
        };
        _173.prototype.hasChildNodes = function () {
            return (this._xml && this._xml.hasChildNodes());
        };
        _173.prototype.firstChild = function () {
            return new _173(this._xml.firstChild);
        };
        _173.prototype.localName = function () {
            return this._xml.localName || this._xml.baseName;
        };
        _173.prototype.nodeValue = function () {
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
        _173.prototype.nodeType = function () {
            return this._xml.nodeType;
        };
        _173.prototype._get = function () {
            return this._xml;
        };
        _173.prototype.toString = function (_1a2) {
            return _173.toString(this._xml, this._encoding, _1a2);
        };
        _173.toString = function (_1a3, _1a4, _1a5) {
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
    ITHit.oNS.ArgumentException = function (_1a9, _1aa) {
        _1a9 += " Variable name: \"" + _1aa + "\"";
        ITHit.Exceptions.ArgumentException.baseConstructor.call(this, _1a9);
    };
    ITHit.Extend(ITHit.oNS.ArgumentException, ITHit.Exception);
    ITHit.oNS.ArgumentException.prototype.Name = "ArgumentException";
    (function () {
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.Depth", null, {
            __static: {
                Zero: null,
                One: null,
                Infinity: null,
                Parse: function (_1ac) {
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
            }, constructor: function (_1ad) {
                this.Value = _1ad;
            }
        });
        self.Zero = new self(0);
        self.One = new self(1);
        self.Infinity = new self("Infinity");
    })();
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.HttpMethod", null, {
        __static: {
            Go: function (_1ae, _1af, _1b0) {
                var _1b1 = this._CreateRequest.apply(this, arguments);
                var _1b2 = _1b1.GetResponse();
                return this._ProcessResponse(_1b2, _1af);
            }, GoAsync: function (_1b3, _1b4, _1b5) {
                var _1b6 = arguments[arguments.length - 1];
                var _1b7 = this._CreateRequest.apply(this, arguments);
                var that = this;
                _1b7.GetResponse(function (_1b9) {
                    if (_1b9.IsSuccess) {
                        _1b9.Result = that._ProcessResponse(_1b9.Result, _1b4);
                    }
                    _1b6(_1b9);
                });
                return _1b7;
            }, _CreateRequest: function () {
            }, _ProcessResponse: function (_1ba, _1bb) {
                return new this(_1ba, _1bb);
            }
        }, Response: null, Href: null, constructor: function (_1bc, _1bd) {
            this.Response = _1bc;
            this.Href = _1bd;
            this._Init();
        }, _Init: function () {
        }
    });
    ITHit.oNS = ITHit.Declare("ITHit.Exceptions");
    ITHit.oNS.ArgumentNullException = function (_1be) {
        var _1bf = "Variable \"" + _1be + "\" nas null value.";
        ITHit.Exceptions.ArgumentNullException.baseConstructor.call(this, _1bf);
    };
    ITHit.Extend(ITHit.oNS.ArgumentNullException, ITHit.Exception);
    ITHit.oNS.ArgumentNullException.prototype.Name = "ArgumentNullException";
    ITHit.DefineClass("ITHit.WebDAV.Client.WebDavUtil", null, {
        __static: {
            VerifyArgumentNotNull: function (_1c0, _1c1) {
                if (_1c0 === null) {
                    throw new ITHit.Exceptions.ArgumentNullException(_1c1);
                }
            }, VerifyArgumentNotNullOrEmpty: function (_1c2, _1c3) {
                if (_1c2 === null || _1c2 === "") {
                    throw new ITHit.Exceptions.ArgumentNullException(_1c3);
                }
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.PropertyName", null, {
        Name: null,
        NamespaceUri: null,
        constructor: function (_1c4, _1c5) {
            ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNullOrEmpty(_1c4, "sName");
            this.Name = _1c4;
            this.NamespaceUri = _1c5;
        },
        Equals: function (oObj, _1c7) {
            _1c7 = _1c7 || false;
            if (this == oObj) {
                return true;
            }
            if (!oObj instanceof ITHit.WebDAV.Client.PropertyName) {
                return false;
            }
            return _1c7 ? this.Name.toLowerCase() === oObj.Name.toLowerCase() && this.NamespaceUri.toLowerCase() === oObj.NamespaceUri.toLowerCase() : this.Name === oObj.Name && this.NamespaceUri === oObj.NamespaceUri;
        },
        IsStandardProperty: function () {
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
        HasDavNamespace: function () {
            return this.NamespaceUri === ITHit.WebDAV.Client.DavConstants.NamespaceUri;
        },
        toString: function () {
            return this.NamespaceUri + ":" + this.Name;
        }
    });
    (function () {
        var _1c9 = "DAV:";
        ITHit.DefineClass("ITHit.WebDAV.Client.DavConstants", null, {
            __static: {
                NamespaceUri: _1c9,
                Comment: new ITHit.WebDAV.Client.PropertyName("comment", _1c9),
                CreationDate: new ITHit.WebDAV.Client.PropertyName("creationdate", _1c9),
                CreatorDisplayName: new ITHit.WebDAV.Client.PropertyName("creator-displayname", _1c9),
                DisplayName: new ITHit.WebDAV.Client.PropertyName("displayname", _1c9),
                GetContentLength: new ITHit.WebDAV.Client.PropertyName("getcontentlength", _1c9),
                GetContentType: new ITHit.WebDAV.Client.PropertyName("getcontenttype", _1c9),
                GetETag: new ITHit.WebDAV.Client.PropertyName("getetag", _1c9),
                GetLastModified: new ITHit.WebDAV.Client.PropertyName("getlastmodified", _1c9),
                IsCollection: new ITHit.WebDAV.Client.PropertyName("iscollection", _1c9),
                IsFolder: new ITHit.WebDAV.Client.PropertyName("isFolder", _1c9),
                IsHidden: new ITHit.WebDAV.Client.PropertyName("ishidden", _1c9),
                ResourceType: new ITHit.WebDAV.Client.PropertyName("resourcetype", _1c9),
                SupportedLock: new ITHit.WebDAV.Client.PropertyName("supportedlock", _1c9),
                LockDiscovery: new ITHit.WebDAV.Client.PropertyName("lockdiscovery", _1c9),
                GetContentLanguage: new ITHit.WebDAV.Client.PropertyName("getcontentlanguage", _1c9),
                Source: new ITHit.WebDAV.Client.PropertyName("source", _1c9),
                QuotaAvailableBytes: new ITHit.WebDAV.Client.PropertyName("quota-available-bytes", _1c9),
                QuotaUsedBytes: new ITHit.WebDAV.Client.PropertyName("quota-used-bytes", _1c9),
                VersionName: new ITHit.WebDAV.Client.PropertyName("version-name", _1c9),
                VersionHistory: new ITHit.WebDAV.Client.PropertyName("version-history", _1c9),
                CheckedIn: new ITHit.WebDAV.Client.PropertyName("checked-in", _1c9),
                CheckedOut: new ITHit.WebDAV.Client.PropertyName("checked-out", _1c9),
                Src: "src",
                Dst: "dst",
                Link: "link",
                Slash: "/",
                DepndencyFailedCode: 424,
                LockedCode: 423,
                OpaqueLockToken: "opaquelocktoken:",
                QuotaNotExceeded: new ITHit.WebDAV.Client.PropertyName("quota-not-exceeded", _1c9),
                SufficientDiskSpace: new ITHit.WebDAV.Client.PropertyName("sufficient-disk-space", _1c9)
            }
        });
    })();
    (function () {
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
                Parse: function (_1ca) {
                    var _1cb = _1ca.split(" ");
                    var _1cc = parseInt(_1cb[1]);
                    _1cb.splice(0, 2);
                    return new ITHit.WebDAV.Client.HttpStatus(_1cc, _1cb.join(" "));
                }
            }, Code: null, Description: null, constructor: function (_1cd, _1ce) {
                this.Code = _1cd;
                this.Description = _1ce;
            }, Equals: function (_1cf) {
                if (!_1cf || !(_1cf instanceof ITHit.WebDAV.Client.HttpStatus)) {
                    return false;
                }
                return this.Code === _1cf.Code;
            }, IsCreateOk: function () {
                return this.Equals(ITHit.WebDAV.Client.HttpStatus.Created);
            }, IsDeleteOk: function () {
                return this.Equals(ITHit.WebDAV.Client.HttpStatus.OK) || this.Equals(ITHit.WebDAV.Client.HttpStatus.NoContent);
            }, IsOk: function () {
                return this.Equals(ITHit.WebDAV.Client.HttpStatus.OK);
            }, IsCopyMoveOk: function () {
                return this.Equals(ITHit.WebDAV.Client.HttpStatus.NoContent) || this.Equals(ITHit.WebDAV.Client.HttpStatus.Created);
            }, IsGetOk: function () {
                return this.Equals(ITHit.WebDAV.Client.HttpStatus.OK) || this.Equals(ITHit.WebDAV.Client.HttpStatus.PartialContent);
            }, IsPutOk: function () {
                return this.Equals(ITHit.WebDAV.Client.HttpStatus.OK) || this.Equals(ITHit.WebDAV.Client.HttpStatus.Created) || this.Equals(ITHit.WebDAV.Client.HttpStatus.NoContent);
            }, IsUnlockOk: function () {
                return this.Equals(ITHit.WebDAV.Client.HttpStatus.OK) || this.Equals(ITHit.WebDAV.Client.HttpStatus.NoContent);
            }, IsHeadOk: function () {
                return this.Equals(ITHit.WebDAV.Client.HttpStatus.OK) || this.Equals(ITHit.WebDAV.Client.HttpStatus.NotFound);
            }, IsUpdateOk: function () {
                return this.Equals(ITHit.WebDAV.Client.HttpStatus.OK) || this.Equals(ITHit.WebDAV.Client.HttpStatus.None);
            }, IsSuccess: function () {
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
        constructor: function (_1d0, _1d1, _1d2) {
            switch (arguments.length) {
                case 1:
                    var _1d3 = _1d0;
                    ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNull(_1d3, "oElement");
                    this.Name = new ITHit.WebDAV.Client.PropertyName(_1d3.localName(), _1d3.namespaceURI());
                    this.Value = _1d3;
                    break;
                case 2:
                    var _1d4 = _1d0, _1d5 = _1d1;
                    ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNull(_1d4, "oName");
                    ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNull(_1d5, "sStringValue");
                    this.Name = _1d4;
                    var _1d6 = new ITHit.XMLDoc(), _1d7 = _1d6.createElementNS(_1d4.NamespaceUri, _1d4.Name);
                    _1d7.appendChild(_1d6.createTextNode(_1d5));
                    this.Value = _1d7;
                    break;
                case 3:
                    var _1d0 = _1d0, _1d1 = _1d1, _1d8 = _1d2;
                    ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNullOrEmpty(_1d0, "sName");
                    ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNull(_1d1, "sValue");
                    ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNullOrEmpty(_1d8, "sNameSpace");
                    this.Name = new ITHit.WebDAV.Client.PropertyName(_1d0, _1d8);
                    var _1d6 = new ITHit.XMLDoc(), _1d7 = _1d6.createElementNS(_1d8, _1d0);
                    _1d7.appendChild(_1d6.createTextNode(_1d1));
                    this.Value = _1d7;
                    break;
                default:
                    throw ITHit.Exception(ITHit.Phrases.Exceptions.WrongCountPropertyInputParameters.Paste(arguments.length));
            }
        },
        StringValue: function () {
            return this.Value.firstChild().nodeValue();
        },
        toString: function () {
            return this.Name.toString();
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Propstat", null, {
        PropertiesByNames: null,
        Properties: null,
        ResponseDescription: "",
        Status: "",
        constructor: function (_1d9) {
            this.PropertiesByNames = {};
            this.Properties = [];
            var _1da;
            var _1db = new ITHit.XPath.resolver();
            _1db.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
            if (_1da = ITHit.XPath.selectSingleNode("d:responsedescription", _1d9, _1db)) {
                this.ResponseDescription = _1da.firstChild().nodeValue();
            }
            _1da = ITHit.XPath.selectSingleNode("d:status", _1d9, _1db);
            this.Status = ITHit.WebDAV.Client.HttpStatus.Parse(_1da.firstChild().nodeValue());
            var oRes = ITHit.XPath.evaluate("d:prop/*", _1d9, _1db);
            while (_1da = oRes.iterateNext()) {
                var _1dd = new ITHit.WebDAV.Client.Property(_1da.cloneNode());
                var _1de = _1dd.Name;
                if ("undefined" == typeof this.PropertiesByNames[_1de]) {
                    this.PropertiesByNames[_1de] = _1dd;
                } else {
                    var _1df = _1da.childNodes();
                    for (var i = 0; i < _1df.length; i++) {
                        this.PropertiesByNames[_1de].Value.appendChild(_1df[i]);
                    }
                }
                this.Properties.push(_1dd);
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Response", null, {
        Href: "",
        ResponseDescription: "",
        Status: "",
        Propstats: null,
        constructor: function (_1e1, _1e2) {
            this.Propstats = [];
            var _1e3;
            var _1e4 = new ITHit.XPath.resolver();
            _1e4.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
            this.Href = ITHit.XPath.selectSingleNode("d:href", _1e1, _1e4).firstChild().nodeValue();
            if (_1e3 = ITHit.XPath.selectSingleNode("d:responsedescription", _1e1, _1e4)) {
                this.ResponseDescription = _1e3.firstChild().nodeValue();
            }
            if (_1e3 = ITHit.XPath.selectSingleNode("d:status", _1e1, _1e4)) {
                this.Status = ITHit.WebDAV.Client.HttpStatus.Parse(_1e3.firstChild().nodeValue());
            }
            var oRes = ITHit.XPath.evaluate("d:propstat", _1e1, _1e4);
            while (_1e3 = oRes.iterateNext()) {
                this.Propstats.push(new ITHit.WebDAV.Client.Methods.Propstat(_1e3.cloneNode()));
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.MultiResponse", null, {
        ResponseDescription: "",
        Responses: null,
        constructor: function (_1e6, _1e7) {
            this.ResponseDescription = "";
            this.Responses = [];
            var _1e8 = new ITHit.XPath.resolver();
            _1e8.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
            var oRes = ITHit.XPath.evaluate("/d:multistatus/d:response", _1e6, _1e8);
            var _1ea;
            while ((_1ea = oRes.iterateNext())) {
                this.Responses.push(new ITHit.WebDAV.Client.Methods.Response(_1ea.cloneNode(), _1e7));
            }
            ITHit.XPath.evaluate("/d:multistatus/d:responsedescription", _1e6, _1e8, oRes);
            if ((_1ea = oRes.iterateNext())) {
                this.ResponseDescription = _1ea.firstChild().nodeValue();
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.AsyncResult", null, {
        Result: null,
        IsSuccess: null,
        Error: null,
        constructor: function (_1eb, _1ec, _1ed) {
            this.Result = _1eb;
            this.IsSuccess = _1ec;
            this.Error = _1ed;
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Propfind", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            PropfindMode: {
                SelectedProperties: "SelectedProperties",
                PropertyNames: "PropertyNames"
            }, Go: function (_1ee, sUri, _1f0, _1f1, _1f2, _1f3) {
                return this.GoAsync(_1ee, sUri, _1f0, _1f1, _1f2, _1f3);
            }, GoAsync: function (_1f4, sUri, _1f6, _1f7, _1f8, _1f9, _1fa) {
                var _1fb = ITHit.WebDAV.Client.Methods.Propfind.createRequest(_1f4, sUri, _1f6, _1f7, _1f8, _1f9);
                var self = this;
                var _1fd = typeof _1fa === "function" ? function (_1fe) {
                    self._GoCallback(_1f4, sUri, _1fe, _1fa);
                } : null;
                var _1ff = _1fb.GetResponse(_1fd);
                if (typeof _1fa !== "function") {
                    var _200 = new ITHit.WebDAV.Client.AsyncResult(_1ff, _1ff != null, null);
                    return this._GoCallback(_1f4, sUri, _200, _1fa);
                } else {
                    return _1fb;
                }
            }, _GoCallback: function (_201, sUri, _203, _204) {
                var _205 = _203;
                var _206 = true;
                var _207 = null;
                if (_203 instanceof ITHit.WebDAV.Client.AsyncResult) {
                    _205 = _203.Result;
                    _206 = _203.IsSuccess;
                    _207 = _203.Error;
                }
                var _208 = null;
                if (_206) {
                    var _209 = _205.GetResponseStream();
                    var _20a = new ITHit.WebDAV.Client.Methods.MultiResponse(_209, sUri);
                    _208 = new ITHit.WebDAV.Client.Methods.Propfind(_20a);
                }
                if (typeof _204 === "function") {
                    var _20b = new ITHit.WebDAV.Client.AsyncResult(_208, _206, _207);
                    _204.call(this, _20b);
                } else {
                    return _208;
                }
            }, createRequest: function (_20c, sUri, _20e, _20f, _210, _211) {
                var _212 = _20c.CreateWebDavRequest(_211, sUri);
                _212.Method("PROPFIND");
                _212.Headers.Add("Depth", _210.Value);
                _212.Headers.Add("Content-Type", "text/xml; charset=\"utf-8\"");
                var _213 = new ITHit.XMLDoc();
                var _214 = _213.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "propfind");
                switch (_20e) {
                    case ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties:
                        if (!_20f || !_20f.length) {
                            var _215 = _213.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "allprop");
                        } else {
                            var _215 = _213.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "prop");
                            for (var i = 0; i < _20f.length; i++) {
                                var prop = _213.createElementNS(_20f[i].NamespaceUri, _20f[i].Name);
                                _215.appendChild(prop);
                            }
                        }
                        break;
                    case ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.PropertyNames:
                        var _215 = _213.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "propname");
                        break;
                }
                _214.appendChild(_215);
                _213.appendChild(_214);
                _212.Body(_213);
                return _212;
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.SingleResponse", null, {
        Status: null,
        ResponseDescription: null,
        constructor: function (_218) {
            this.Status = _218.Status;
            this.ResponseDescription = _218.Status.Description;
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.ResponseFactory", null, {
        __static: {
            GetResponse: function (_219, _21a) {
                var _21b = _219.GetResponseStream(_219);
                if (!_21b || !_219.Status.Equals(ITHit.WebDAV.Client.HttpStatus.MultiStatus)) {
                    return new ITHit.WebDAV.Client.Methods.SingleResponse(_219);
                } else {
                    return new ITHit.WebDAV.Client.Methods.MultiResponse(_21b, _21a);
                }
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.VersionControl", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_21c, _21d, _21e, _21f) {
                return this._super.apply(this, arguments);
            }, GoAsync: function (_220, _221, _222, _223, _224) {
                return this._super.apply(this, arguments);
            }, _CreateRequest: function (_225, _226, _227, _228) {
                var _229 = _225.CreateWebDavRequest(_228, _226, _227);
                _229.Method("VERSION-CONTROL");
                return _229;
            }, _ProcessResponse: function (_22a, _22b) {
                var _22c = ITHit.WebDAV.Client.Methods.ResponseFactory.GetResponse(_22a, _22b);
                return this._super(_22c);
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
    ITHit.DefineClass("ITHit.WebDAV.Client.PropertyList", Array, {
        constructor: function () {
        }, Has: function (_22d, _22e) {
            for (var i = 0, l = this.length; i < l; i++) {
                if (_22d.Equals(this[i].Name, _22e)) {
                    return true;
                }
            }
            return false;
        }, Find: function (_231, _232) {
            for (var i = 0, l = this.length; i < l; i++) {
                if (_231.Equals(this[i].Name, _232)) {
                    return this[i].Value.firstChild().nodeValue();
                }
            }
            return null;
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.WebDavException", ITHit.Exception, {
        Name: "WebDavException",
        constructor: function (_235, _236) {
            this._super(_235, _236);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Multistatus", null, {Description: null, Responses: null});
    ITHit.DefineClass("ITHit.WebDAV.Client.MultistatusResponse", null, {Href: null, Description: null, Status: null});
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.Info.MultistatusResponse", ITHit.WebDAV.Client.MultistatusResponse, {
        Href: null,
        Description: null,
        Status: null,
        constructor: function (_237) {
            this.Href = _237.Href;
            this.Description = _237.ResponseDescription;
            this.Status = _237.Status;
            for (var i = 0; i < _237.Propstats.length; i++) {
                if (_237.Propstats[i] != ITHit.WebDAV.Client.HttpStatus.OK) {
                    this.Status = _237.Propstats[i];
                    break;
                }
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.Info.Multistatus", ITHit.WebDAV.Client.Multistatus, {
        Description: "",
        Responses: null,
        constructor: function (_239) {
            this.Responses = [];
            if (_239) {
                this.Description = _239.ResponseDescription;
                for (var i = 0; i < _239.Responses.length; i++) {
                    this.Responses.push(new ITHit.WebDAV.Client.Exceptions.Info.MultistatusResponse(_239.Responses[i]));
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
        constructor: function (_23b, _23c, _23d, _23e, _23f, _240) {
            this._super(_23b, _23f);
            this.Multistatus = _23d || new ITHit.WebDAV.Client.Exceptions.Info.Multistatus();
            this.Status = _23e;
            this.Uri = _23c;
            this.Error = _240;
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.PropertyException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "PropertyException",
        PropertyName: null,
        constructor: function (_241, _242, _243, _244, _245, _246) {
            this.PropertyName = _243;
            this._super(_241, _242, _244, _245, _246);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException", ITHit.WebDAV.Client.Exceptions.PropertyException, {
        Name: "PropertyForbiddenException",
        constructor: function (_247, _248, _249, _24a, _24b) {
            this._super(_247, _248, _249, _24a, ITHit.WebDAV.Client.HttpStatus.NotFound, _24b);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.PropertyForbiddenException", ITHit.WebDAV.Client.Exceptions.PropertyException, {
        Name: "PropertyForbiddenException",
        constructor: function (_24c, _24d, _24e, _24f, _250) {
            this._super(_24c, _24d, _24e, _24f, ITHit.WebDAV.Client.HttpStatus.Forbidden, _250);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.PropertyMultistatusResponse", ITHit.WebDAV.Client.MultistatusResponse, {PropertyName: null});
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatusResponse", ITHit.WebDAV.Client.PropertyMultistatusResponse, {
        Href: null,
        Description: null,
        Status: null,
        PropertyName: null,
        constructor: function (_251, _252, _253, _254) {
            this._super();
            this.Href = _251;
            this.Description = _252;
            this.Status = _253;
            this.PropertyName = _254;
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatus", ITHit.WebDAV.Client.Multistatus, {
        Description: "",
        Responses: null,
        constructor: function (_255) {
            this.Responses = [];
            if (_255) {
                this.Description = _255.ResponseDescription;
                for (var i = 0; i < _255.Responses.length; i++) {
                    var _257 = _255.Responses[i];
                    for (var j = 0; j < _257.Propstats.length; j++) {
                        var _259 = _257.Propstats[j];
                        for (var k = 0; k < _259.Properties.length; k++) {
                            this.Responses.push(new ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatusResponse(_257.Href, _259.ResponseDescription, _259.Status, _259.Properties[k].Name));
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
            }, Go: function (_25b, _25c, _25d, _25e, _25f, _260, _261, _262, _263) {
                var _264 = this.createRequest(_25b, _25c, _25d, _25e, _25f, _260, _261, _262, _263);
                var _265 = _264.GetResponse();
                return this._ProcessResponse(_265, _25d);
            }, GoAsync: function (_266, _267, _268, _269, _26a, _26b, _26c, _26d, _26e, _26f) {
                var _270 = this.createRequest(_266, _267, _268, _269, _26a, _26b, _26c, _26d, _26e);
                var that = this;
                _270.GetResponse(function (_272) {
                    if (!_272.IsSuccess) {
                        _26f(new ITHit.WebDAV.Client.AsyncResult(null, false, _272.Error));
                        return;
                    }
                    var _273 = that._ProcessResponse(_272.Result, _268);
                    _26f(new ITHit.WebDAV.Client.AsyncResult(_273, true, null));
                });
                return _270;
            }, _ProcessResponse: function (_274, _275) {
                var _276 = ITHit.WebDAV.Client.Methods.ResponseFactory.GetResponse(_274, _275);
                return new ITHit.WebDAV.Client.Methods.CopyMove(_276);
            }, createRequest: function (_277, _278, _279, _27a, _27b, _27c, _27d, _27e, _27f) {
                var _280 = _277.CreateWebDavRequest(_27f, _279, _27e);
                _27a = ITHit.WebDAV.Client.Encoder.EncodeURI(_27a).replace(/#/g, "%23").replace(/'/g, "%27");
                if (/^\//.test(_27a)) {
                    _27a = _27f + _27a.substr(1);
                }
                _280.Method((_278 == ITHit.WebDAV.Client.Methods.CopyMove.Mode.Copy) ? "COPY" : "MOVE");
                _280.Headers.Add("Content-Type", "text/xml; charset=\"utf-8\"");
                _280.Headers.Add("Destination", ITHit.DecodeHost(_27a));
                _280.Headers.Add("Overwrite", _27d ? "T" : "F");
                if (_27b && (_278 == ITHit.WebDAV.Client.Methods.CopyMove.Mode.Copy)) {
                    if (!_27c) {
                        _280.Headers.Add("Depth", ITHit.WebDAV.Client.Depth.Zero.Value);
                    }
                }
                var _281 = new ITHit.XMLDoc();
                var _282 = _281.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "propertybehavior");
                var _283 = _281.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "keepalive");
                _283.appendChild(_281.createTextNode("*"));
                _282.appendChild(_283);
                _281.appendChild(_282);
                _280.Body(_281);
                return _280;
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Delete", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_284, _285, _286, _287) {
                return this._super.apply(this, arguments);
            }, GoAsync: function (_288, _289, _28a, _28b, _28c) {
                return this._super.apply(this, arguments);
            }, _CreateRequest: function (_28d, _28e, _28f, _290) {
                var _291 = _28d.CreateWebDavRequest(_290, _28e, _28f);
                _291.Method("DELETE");
                return _291;
            }, _ProcessResponse: function (_292, _293) {
                var _294 = ITHit.WebDAV.Client.Methods.ResponseFactory.GetResponse(_292, _293);
                return this._super(_294);
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Proppatch", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_295, _296, _297, _298, _299, _29a) {
                var _29b = ITHit.WebDAV.Client.Methods.Proppatch.createRequest(_295, _296, _297, _298, _299, _29a);
                var _29c = _29b.GetResponse();
                return this._ProcessResponse(_29c);
            }, GoAsync: function (_29d, _29e, _29f, _2a0, _2a1, _2a2, _2a3) {
                var _2a4 = ITHit.WebDAV.Client.Methods.Proppatch.createRequest(_29d, _29e, _29f, _2a0, _2a1, _2a2);
                var that = this;
                _2a4.GetResponse(function (_2a6) {
                    if (!_2a6.IsSuccess) {
                        _2a3(new ITHit.WebDAV.Client.AsyncResult(null, false, _2a6.Error));
                        return;
                    }
                    var _2a7 = that._ProcessResponse(_2a6.Result, _29e);
                    _2a3(new ITHit.WebDAV.Client.AsyncResult(_2a7, true, null));
                });
            }, _ProcessResponse: function (_2a8, _2a9) {
                var _2aa = _2a8.GetResponseStream();
                return new ITHit.WebDAV.Client.Methods.Proppatch(new ITHit.WebDAV.Client.Methods.MultiResponse(_2aa, _2a9));
            }, ItemExists: function (aArr) {
                if (aArr && aArr.length) {
                    for (var i = 0; i < aArr.length; i++) {
                        if (aArr[i]) {
                            return true;
                        }
                    }
                }
                return false;
            }, createRequest: function (_2ad, _2ae, _2af, _2b0, _2b1, _2b2) {
                _2b1 = _2b1 || null;
                var _2b3 = _2ad.CreateWebDavRequest(_2b2, _2ae, _2b1);
                _2b3.Method("PROPPATCH");
                _2b3.Headers.Add("Content-Type", "text/xml; charset=\"utf-8\"");
                var _2b4 = new ITHit.XMLDoc();
                var _2b5 = _2b4.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "propertyupdate");
                if (ITHit.WebDAV.Client.Methods.Proppatch.ItemExists(_2af)) {
                    var set = _2b4.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "set");
                    for (var i = 0; i < _2af.length; i++) {
                        if (_2af[i]) {
                            var prop = _2b4.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "prop");
                            prop.appendChild(_2af[i].Value);
                            set.appendChild(prop);
                        }
                    }
                    _2b5.appendChild(set);
                }
                if (ITHit.WebDAV.Client.Methods.Proppatch.ItemExists(_2b0)) {
                    var _2b9 = _2b4.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "remove");
                    var prop = _2b4.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "prop");
                    for (var i = 0; i < _2b0.length; i++) {
                        if (_2b0[i]) {
                            var elem = _2b4.createElementNS(_2b0[i].NamespaceUri, _2b0[i].Name);
                            prop.appendChild(elem);
                        }
                    }
                    _2b9.appendChild(prop);
                    _2b5.appendChild(_2b9);
                }
                _2b4.appendChild(_2b5);
                _2b3.Body(_2b4);
                return _2b3;
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.LockScope", null, {__static: {Exclusive: "Exclusive", Shared: "Shared"}});
    ITHit.DefineClass("ITHit.WebDAV.Client.LockUriTokenPair", null, {
        Href: null,
        LockToken: null,
        constructor: function (_2bb, _2bc) {
            ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNull(_2bb, "href");
            ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNullOrEmpty(_2bc, "lockToken");
            this.Href = _2bb;
            this.LockToken = _2bc;
        },
        toString: function () {
            return this.LockToken;
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.LockInfo", null, {
        __static: {
            ParseLockInfo: function (_2bd, _2be) {
                var _2bf = new ITHit.XPath.resolver();
                _2bf.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
                var _2c0;
                if (!(_2c0 = ITHit.XPath.selectSingleNode("d:lockscope", _2bd, _2bf))) {
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.Exceptions.ActiveLockDoesntContainLockscope);
                }
                var _2c1 = null;
                var _2c2 = _2c0.childNodes();
                for (var i = 0, l = _2c2.length; i < l; i++) {
                    if (_2c2[i].nodeType() === 1) {
                        _2c1 = _2c2[i].localName();
                        break;
                    }
                }
                switch (_2c1) {
                    case "shared":
                        _2c1 = ITHit.WebDAV.Client.LockScope.Shared;
                        break;
                    case "exclusive":
                        _2c1 = ITHit.WebDAV.Client.LockScope.Exclusive;
                        break;
                }
                if (!(_2c0 = ITHit.XPath.selectSingleNode("d:depth", _2bd, _2bf))) {
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.Exceptions.ActiveLockDoesntContainDepth);
                }
                var _2c5 = ITHit.WebDAV.Client.Depth.Parse(_2c0.firstChild().nodeValue());
                var _2c6 = (_2c5 == ITHit.WebDAV.Client.Depth.Infinity);
                var _2c7 = null;
                if (_2c0 = ITHit.XPath.selectSingleNode("d:owner", _2bd, _2bf)) {
                    _2c7 = _2c0.firstChild().nodeValue();
                }
                var _2c8 = -1;
                if (_2c0 = ITHit.XPath.selectSingleNode("d:timeout", _2bd, _2bf)) {
                    var _2c9 = _2c0.firstChild().nodeValue();
                    if ("infinite" != _2c9.toLowerCase()) {
                        if (-1 != _2c9.toLowerCase().indexOf("second-")) {
                            _2c9 = _2c9.substr(7);
                        }
                        var _2c8 = parseInt(_2c9);
                    }
                }
                var _2ca = null;
                if (_2c0 = ITHit.XPath.selectSingleNode("d:locktoken", _2bd, _2bf)) {
                    var _2cb = ITHit.XPath.selectSingleNode("d:href", _2c0, _2bf).firstChild().nodeValue();
                    _2cb = _2cb.replace(ITHit.WebDAV.Client.DavConstants.OpaqueLockToken, "");
                    _2ca = new ITHit.WebDAV.Client.LockUriTokenPair(_2be, _2cb);
                }
                return new ITHit.WebDAV.Client.LockInfo(_2c1, _2c6, _2c7, _2c8, _2ca);
            }, ParseLockDiscovery: function (_2cc, _2cd) {
                var _2ce = [];
                var _2cf = _2cc.getElementsByTagNameNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "activelock");
                for (var i = 0; i < _2cf.length; i++) {
                    _2ce.push(ITHit.WebDAV.Client.LockInfo.ParseLockInfo(_2cf[i], _2cd));
                }
                return _2ce;
            }
        },
        LockScope: null,
        Deep: null,
        TimeOut: null,
        Owner: null,
        LockToken: null,
        constructor: function (_2d1, _2d2, _2d3, _2d4, _2d5) {
            this.LockScope = _2d1;
            this.Deep = _2d2;
            this.TimeOut = _2d4;
            this.Owner = _2d3;
            this.LockToken = _2d5;
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Lock", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_2d6, _2d7, _2d8, _2d9, _2da, _2db, _2dc) {
                return this._super.apply(this, arguments);
            }, GoAsync: function (_2dd, _2de, _2df, _2e0, _2e1, _2e2, _2e3, _2e4) {
                return this._super.apply(this, arguments);
            }, _CreateRequest: function (_2e5, _2e6, _2e7, _2e8, _2e9, _2ea, _2eb) {
                var _2ec = _2e8;
                var _2ed = _2e5.CreateWebDavRequest(_2e9, _2e6);
                _2ed.Method("LOCK");
                _2ed.Headers.Add("Timeout", (-1 === _2e7) ? "Infinite" : "Second-" + parseInt(_2e7));
                _2ed.Headers.Add("Depth", _2ea ? ITHit.WebDAV.Client.Depth.Infinity.Value : ITHit.WebDAV.Client.Depth.Zero.Value);
                _2ed.Headers.Add("Content-Type", "text/xml; charset=\"utf-8\"");
                var _2ee = new ITHit.XMLDoc();
                var _2ef = ITHit.WebDAV.Client.DavConstants.NamespaceUri;
                var _2f0 = _2ee.createElementNS(_2ef, "lockinfo");
                var _2f1 = _2ee.createElementNS(_2ef, "lockscope");
                var _2f2 = _2ee.createElementNS(_2ef, _2ec.toLowerCase());
                _2f1.appendChild(_2f2);
                var _2f3 = _2ee.createElementNS(_2ef, "locktype");
                var _2f4 = _2ee.createElementNS(_2ef, "write");
                _2f3.appendChild(_2f4);
                var _2f5 = _2ee.createElementNS(_2ef, "owner");
                _2f5.appendChild(_2ee.createTextNode(_2eb));
                _2f0.appendChild(_2f1);
                _2f0.appendChild(_2f3);
                _2f0.appendChild(_2f5);
                _2ee.appendChild(_2f0);
                _2ed.Body(_2ee);
                return _2ed;
            }
        }, LockInfo: null, _Init: function () {
            var _2f6 = this.Response.GetResponseStream();
            var _2f7 = new ITHit.XPath.resolver();
            _2f7.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
            var _2f8 = new ITHit.WebDAV.Client.Property(ITHit.XPath.selectSingleNode("/d:prop", _2f6, _2f7));
            try {
                var _2f9 = new ITHit.WebDAV.Client.LockInfo.ParseLockDiscovery(_2f8.Value, this.Href);
                if (_2f9.length !== 1) {
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.UnableToParseLockInfoResponse);
                }
                this.LockInfo = _2f9[0];
            } catch (e) {
                throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.Exceptions.ParsingPropertiesException, this.Href, _2f8.Name, null, ITHit.WebDAV.Client.HttpStatus.OK, e);
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.LockRefresh", ITHit.WebDAV.Client.Methods.Lock, {
        __static: {
            Go: function (_2fa, _2fb, _2fc, _2fd, _2fe, _2ff, _300) {
                return this._super.apply(this, arguments);
            }, GoAsync: function (_301, _302, _303, _304, _305, _306, _307, _308) {
                return this._super.apply(this, arguments);
            }, _CreateRequest: function (_309, _30a, _30b, _30c, _30d, _30e, _30f) {
                var _310 = _30c;
                var _311 = _309.CreateWebDavRequest(_30d, _30a, _310);
                _311.Method("LOCK");
                _311.Headers.Add("Timeout", (-1 == _30b) ? "Infinite" : "Second-" + parseInt(_30b));
                _311.Body("");
                return _311;
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Unlock", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_312, _313, _314, _315) {
                return this._super.apply(this, arguments);
            }, GoAsync: function (_316, _317, _318, _319, _31a) {
                return this._super.apply(this, arguments);
            }, _ProcessResponse: function (_31b, _31c) {
                var _31d = new ITHit.WebDAV.Client.Methods.SingleResponse(_31b);
                return this._super(_31d);
            }, _CreateRequest: function (_31e, _31f, _320, _321) {
                var _322 = _31e.CreateWebDavRequest(_321, _31f);
                _322.Method("UNLOCK");
                _322.Headers.Add("Lock-Token", "<" + ITHit.WebDAV.Client.DavConstants.OpaqueLockToken + _320 + ">");
                return _322;
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.OptionsInfo", null, {
        Features: null,
        MsAuthorViaDav: null,
        VersionControl: null,
        Search: null,
        ServerVersion: "",
        constructor: function (_323, _324, _325, _326, _327) {
            this.Features = _323;
            this.MsAuthorViaDav = _324;
            this.VersionControl = _325;
            this.Search = _326;
            this.ServerVersion = _327;
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
            ResumableDownload: 256,
            Dasl: 512
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Options", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_328, _329, _32a) {
                return this.GoAsync(_328, _329, _32a);
            }, GoAsync: function (_32b, _32c, _32d, _32e) {
                var _32f = ITHit.WebDAV.Client.Methods.Options.createRequest(_32b, _32c, _32d);
                var self = this;
                var _331 = typeof _32e === "function" ? function (_332) {
                    self._GoCallback(_32b, _32c, _332, _32e);
                } : null;
                var _333 = _32f.GetResponse(_331);
                if (typeof _32e !== "function") {
                    var _334 = new ITHit.WebDAV.Client.AsyncResult(_333, _333 != null, null);
                    return this._GoCallback(_32b, _32c, _334, _32e);
                } else {
                    return _32f;
                }
            }, _GoCallback: function (_335, _336, _337, _338) {
                var _339 = _337;
                var _33a = true;
                var _33b = null;
                if (_337 instanceof ITHit.WebDAV.Client.AsyncResult) {
                    _339 = _337.Result;
                    _33a = _337.IsSuccess;
                    _33b = _337.Error;
                }
                var _33c = null;
                if (_33a) {
                    var _33c = new ITHit.WebDAV.Client.Methods.Options(_339);
                }
                if (typeof _338 === "function") {
                    var _33d = new ITHit.WebDAV.Client.AsyncResult(_33c, _33a, _33b);
                    _338.call(this, _33d);
                } else {
                    return _33c;
                }
            }, createRequest: function (_33e, _33f, _340) {
                var _341 = _33e.CreateWebDavRequest(_340, _33f);
                _341.Method("OPTIONS");
                return _341;
            }
        }, ItemOptions: null, constructor: function (_342) {
            this._super(_342);
            var sDav = _342._Response.GetResponseHeader("dav", true);
            var _344 = 0;
            var _345 = 0;
            if (sDav) {
                if (-1 != sDav.indexOf("2")) {
                    _344 = ITHit.WebDAV.Client.Features.Class1 + ITHit.WebDAV.Client.Features.Class2;
                } else {
                    if (-1 != sDav.indexOf("1")) {
                        _344 = ITHit.WebDAV.Client.Features.Class1;
                    }
                }
                if (-1 != sDav.indexOf("version-control")) {
                    _345 = ITHit.WebDAV.Client.Features.VersionControl;
                }
                if (-1 != sDav.indexOf("resumable-upload")) {
                    _344 += ITHit.WebDAV.Client.Features.ResumableUpload;
                }
            }
            var _346 = false;
            var _347 = _342._Response.GetResponseHeader("ms-author-via", true);
            if (_347 && (-1 != _347.toLowerCase().indexOf("dav"))) {
                _346 = true;
            }
            var _348 = false;
            var _349 = _342._Response.GetResponseHeader("allow", true) || "";
            var _34a = _349.toLowerCase().split(/[^a-z-_]+/);
            for (var i = 0, l = _34a.length; i < l; i++) {
                if (_34a[i] === "search") {
                    _348 = true;
                    _344 += ITHit.WebDAV.Client.Features.Dasl;
                    break;
                }
            }
            var _34d = _342._Response.GetResponseHeader("x-engine", true);
            this.ItemOptions = new ITHit.WebDAV.Client.OptionsInfo(_344, _346, _345, _348, _34d);
        }
    });
    ITHit.oNS = ITHit.Declare("ITHit.Exceptions");
    ITHit.oNS.ExpressionException = function (_34e) {
        ITHit.Exceptions.ExpressionException.baseConstructor.call(this, _34e);
    };
    ITHit.Extend(ITHit.oNS.ExpressionException, ITHit.Exception);
    ITHit.oNS.ExpressionException.prototype.Name = "ExpressionException";
    ITHit.DefineClass("ITHit.WebDAV.Client.UploadProgressInfo", null, {
        __static: {
            GetUploadProgress: function (_34f) {
                var _350 = [];
                if (!ITHit.WebDAV.Client.UploadProgressInfo.PropNames) {
                    ITHit.WebDAV.Client.UploadProgressInfo.PropNames = [new ITHit.WebDAV.Client.PropertyName("bytes-uploaded", "ithit"), new ITHit.WebDAV.Client.PropertyName("last-chunk-saved", "ithit"), new ITHit.WebDAV.Client.PropertyName("total-content-length", "ithit")];
                }
                for (var i = 0, _352; _352 = _34f.Responses[i]; i++) {
                    for (var j = 0, _354; _354 = _352.Propstats[j]; j++) {
                        var _355 = [];
                        for (var k = 0, _357; _357 = _354.Properties[k]; k++) {
                            if (_357.Name.Equals(ITHit.WebDAV.Client.UploadProgressInfo.PropNames[0])) {
                                _355[0] = _357.Value;
                            } else {
                                if (_357.Name.Equals(ITHit.WebDAV.Client.UploadProgressInfo.PropNames[1])) {
                                    _355[1] = _357.Value;
                                } else {
                                    if (_357.Name.Equals(ITHit.WebDAV.Client.UploadProgressInfo.PropNames[2])) {
                                        _355[2] = _357.Value;
                                    }
                                }
                            }
                        }
                        if (!_355[0] || !_355[1] || !_355[2]) {
                            throw new ITHit.Exception(ITHit.Phrases.Exceptions.NotAllPropertiesReceivedForUploadProgress.Paste(_352.Href));
                        }
                        _350.push(new ITHit.WebDAV.Client.UploadProgressInfo(_352.Href, parseInt(_355[0].firstChild().nodeValue()), parseInt(_355[2].firstChild().nodeValue()), ITHit.WebDAV.Client.HierarchyItem.GetDate(_355[1].firstChild().nodeValue())));
                    }
                }
                return _350;
            }
        },
        Href: null,
        BytesUploaded: null,
        TotalContentLength: null,
        LastChunkSaved: null,
        constructor: function (_358, _359, _35a, _35b) {
            if (!ITHit.Utils.IsString(_358) || !_358) {
                throw new ITHit.Exceptions.ArgumentException(ITHit.Phrases.Exceptions.WrongHref.Paste(), _358);
            }
            if (!ITHit.Utils.IsInteger(_359)) {
                throw new ITHit.Exceptions.ArgumentException(ITHit.Phrases.Exceptions.WrongUploadedBytesType, _359);
            }
            if (!ITHit.Utils.IsInteger(_35a)) {
                throw new ITHit.Exceptions.ArgumentException(ITHit.Phrases.Exceptions.WrongContentLengthType, _35a);
            }
            if (_359 > _35a) {
                throw new ITHit.Exceptions.ExpressionException(ITHit.Phrases.Exceptions.BytesUploadedIsMoreThanTotalFileContentLength);
            }
            this.Href = _358;
            this.BytesUploaded = _359;
            this.TotalContentLength = _35a;
            this.LastChunkSaved = _35b;
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Report", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            ReportType: {
                UploadProgress: "UploadProgress",
                VersionsTree: "VersionsTree"
            }, Go: function (_35c, _35d, _35e, _35f, _360) {
                return this.GoAsync(_35c, _35d, _35e, _35f, _360);
            }, GoAsync: function (_361, _362, _363, _364, _365, _366) {
                if (!_364) {
                    _364 = ITHit.WebDAV.Client.Methods.Report.ReportType.UploadProgress;
                }
                var _367 = ITHit.WebDAV.Client.Methods.Report.createRequest(_361, _362, _363, _364, _365);
                var self = this;
                var _369 = typeof _366 === "function" ? function (_36a) {
                    self._GoCallback(_362, _36a, _364, _366);
                } : null;
                var _36b = _367.GetResponse(_369);
                if (typeof _366 !== "function") {
                    var _36c = new ITHit.WebDAV.Client.AsyncResult(_36b, _36b != null, null);
                    return this._GoCallback(_362, _36c, _364, _366);
                } else {
                    return _367;
                }
            }, _GoCallback: function (_36d, _36e, _36f, _370) {
                var _371 = _36e;
                var _372 = true;
                var _373 = null;
                if (_36e instanceof ITHit.WebDAV.Client.AsyncResult) {
                    _371 = _36e.Result;
                    _372 = _36e.IsSuccess;
                    _373 = _36e.Error;
                }
                var _374 = null;
                if (_372) {
                    var _375 = _371.GetResponseStream();
                    _374 = new ITHit.WebDAV.Client.Methods.Report(new ITHit.WebDAV.Client.Methods.MultiResponse(_375, _36d), _36f);
                }
                if (typeof _370 === "function") {
                    var _376 = new ITHit.WebDAV.Client.AsyncResult(_374, _372, _373);
                    _370.call(this, _376);
                } else {
                    return _374;
                }
            }, createRequest: function (_377, _378, _379, _37a, _37b) {
                var _37c = _377.CreateWebDavRequest(_379, _378);
                _37c.Method("REPORT");
                _37c.Headers.Add("Content-Type", "text/xml; charset=\"utf-8\"");
                var _37d = new ITHit.XMLDoc();
                switch (_37a) {
                    case ITHit.WebDAV.Client.Methods.Report.ReportType.UploadProgress:
                        var _37e = _37d.createElementNS("ithit", "upload-progress");
                        _37d.appendChild(_37e);
                        break;
                    case ITHit.WebDAV.Client.Methods.Report.ReportType.VersionsTree:
                        var _37f = _37d.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "version-tree");
                        if (!_37b || !_37b.length) {
                            var _380 = _37d.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "allprop");
                        } else {
                            var _380 = _37d.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "prop");
                            for (var i = 0; i < _37b.length; i++) {
                                var prop = _37d.createElementNS(_37b[i].NamespaceUri, _37b[i].Name);
                                _380.appendChild(prop);
                            }
                        }
                        _37f.appendChild(_380);
                        _37d.appendChild(_37f);
                        break;
                }
                _37c.Body(_37d);
                return _37c;
            }
        }, constructor: function (_383, _384) {
            this._super(_383);
            switch (_384) {
                case ITHit.WebDAV.Client.Methods.Report.ReportType.UploadProgress:
                    return ITHit.WebDAV.Client.UploadProgressInfo.GetUploadProgress(_383);
            }
        }
    });
    (function () {
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.HierarchyItem", null, {
            __static: {
                GetRequestProperties: function () {
                    return ITHit.WebDAV.Client.File.GetRequestProperties();
                }, GetCustomRequestProperties: function (_386) {
                    var _387 = this.GetRequestProperties();
                    var _388 = [];
                    for (var i = 0, l = _386.length; i < l; i++) {
                        var _38b = _386[i];
                        var _38c = false;
                        for (var i2 = 0, l2 = _387.length; i2 < l2; i2++) {
                            if (_38b.Equals(_387[i2])) {
                                _38c = true;
                                break;
                            }
                        }
                        if (!_38c) {
                            _388.push(_38b);
                        }
                    }
                    return _388;
                }, ParseHref: function (_38f) {
                    return {Href: _38f, Host: ITHit.WebDAV.Client.HierarchyItem.GetHost(_38f)};
                }, OpenItem: function (_390, _391, _392) {
                    _392 = _392 || [];
                    _392 = this.GetCustomRequestProperties(_392);
                    var _393 = this.ParseHref(_391);
                    var _394 = ITHit.WebDAV.Client.Methods.Propfind.Go(_390, _393.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [].concat(this.GetRequestProperties()).concat(_392), ITHit.WebDAV.Client.Depth.Zero, _393.Host);
                    return this.GetItemFromMultiResponse(_394.Response, _390, _391, _392);
                }, OpenItemAsync: function (_395, _396, _397, _398) {
                    _397 = _397 || [];
                    _397 = this.GetCustomRequestProperties(_397);
                    var _399 = this.ParseHref(_396);
                    ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_395, _399.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [].concat(this.GetRequestProperties()).concat(_397), ITHit.WebDAV.Client.Depth.Zero, _399.Host, function (_39a) {
                        if (_39a.IsSuccess) {
                            try {
                                _39a.Result = self.GetItemFromMultiResponse(_39a.Result.Response, _395, _396, _397);
                            } catch (oError) {
                                _39a.Error = oError;
                                _39a.IsSuccess = false;
                            }
                        }
                        _398(_39a);
                    });
                    return _395;
                }, GetItemFromMultiResponse: function (_39b, _39c, _39d, _39e) {
                    _39e = _39e || [];
                    for (var i = 0; i < _39b.Responses.length; i++) {
                        var _3a0 = _39b.Responses[i];
                        if (!ITHit.WebDAV.Client.HierarchyItem.HrefEquals(_3a0.Href, _39d)) {
                            continue;
                        }
                        return this.GetItemFromResponse(_3a0, _39c, _39d, _39e);
                    }
                    throw new ITHit.WebDAV.Client.Exceptions.NotFoundException(ITHit.Phrases.FolderNotFound.Paste(_39d));
                }, GetItemsFromMultiResponse: function (_3a1, _3a2, _3a3, _3a4) {
                    _3a4 = _3a4 || [];
                    var _3a5 = [];
                    for (var i = 0; i < _3a1.Responses.length; i++) {
                        var _3a7 = _3a1.Responses[i];
                        if (ITHit.WebDAV.Client.HierarchyItem.HrefEquals(_3a7.Href, _3a3)) {
                            continue;
                        }
                        if (_3a7.Status && !_3a7.Status.IsOk()) {
                            continue;
                        }
                        _3a5.push(this.GetItemFromResponse(_3a7, _3a2, _3a3, _3a4));
                    }
                    return _3a5;
                }, GetItemFromResponse: function (_3a8, _3a9, _3aa, _3ab) {
                    var _3ac = this.ParseHref(_3aa);
                    var _3ad = ITHit.WebDAV.Client.HierarchyItem.GetPropertiesFromResponse(_3a8);
                    for (var i2 = 0, l2 = _3ab.length; i2 < l2; i2++) {
                        if (!ITHit.WebDAV.Client.HierarchyItem.HasProperty(_3a8, _3ab[i2])) {
                            _3ad.push(new ITHit.WebDAV.Client.Property(_3ab[i2], ""));
                        }
                    }
                    switch (ITHit.WebDAV.Client.HierarchyItem.GetResourceType(_3a8)) {
                        case ITHit.WebDAV.Client.ResourceType.File:
                            return new ITHit.WebDAV.Client.File(_3a9.Session, _3a8.Href, ITHit.WebDAV.Client.HierarchyItem.GetLastModified(_3a8), ITHit.WebDAV.Client.HierarchyItem.GetDisplayName(_3a8), ITHit.WebDAV.Client.HierarchyItem.GetCreationDate(_3a8), ITHit.WebDAV.Client.HierarchyItem.GetContentType(_3a8), ITHit.WebDAV.Client.HierarchyItem.GetContentLength(_3a8), ITHit.WebDAV.Client.HierarchyItem.GetSupportedLock(_3a8), ITHit.WebDAV.Client.HierarchyItem.GetActiveLocks(_3a8, _3aa), _3ac.Host, ITHit.WebDAV.Client.HierarchyItem.GetQuotaAvailableBytes(_3a8), ITHit.WebDAV.Client.HierarchyItem.GetQuotaUsedBytes(_3a8), ITHit.WebDAV.Client.HierarchyItem.GetCkeckedIn(_3a8), ITHit.WebDAV.Client.HierarchyItem.GetCheckedOut(_3a8), _3ad);
                            break;
                        case ITHit.WebDAV.Client.ResourceType.Folder:
                            return new ITHit.WebDAV.Client.Folder(_3a9.Session, _3a8.Href, ITHit.WebDAV.Client.HierarchyItem.GetLastModified(_3a8), ITHit.WebDAV.Client.HierarchyItem.GetDisplayName(_3a8), ITHit.WebDAV.Client.HierarchyItem.GetCreationDate(_3a8), ITHit.WebDAV.Client.HierarchyItem.GetSupportedLock(_3a8), ITHit.WebDAV.Client.HierarchyItem.GetActiveLocks(_3a8, _3aa), _3ac.Host, ITHit.WebDAV.Client.HierarchyItem.GetQuotaAvailableBytes(_3a8), ITHit.WebDAV.Client.HierarchyItem.GetQuotaUsedBytes(_3a8), ITHit.WebDAV.Client.HierarchyItem.GetCkeckedIn(_3a8), ITHit.WebDAV.Client.HierarchyItem.GetCheckedOut(_3a8), _3ad);
                        default:
                            throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.Exceptions.UnknownResourceType);
                    }
                }, AppendToUri: function (sUri, _3b1) {
                    return ITHit.WebDAV.Client.HierarchyItem.GetAbsoluteUriPath(sUri) + ITHit.WebDAV.Client.Encoder.EncodeURI(_3b1);
                }, GetActiveLocks: function (_3b2, _3b3) {
                    var _3b4 = ITHit.WebDAV.Client.DavConstants.LockDiscovery.toString();
                    for (var i = 0; i < _3b2.Propstats.length; i++) {
                        var _3b6 = _3b2.Propstats[i];
                        if (!_3b6.Status.IsOk()) {
                            break;
                        }
                        if ("undefined" != typeof _3b6.PropertiesByNames[_3b4]) {
                            var _3b7 = _3b6.PropertiesByNames[_3b4];
                            try {
                                return ITHit.WebDAV.Client.LockInfo.ParseLockDiscovery(_3b7.Value, _3b3);
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
                }, GetSupportedLock: function (_3b8) {
                    var _3b9 = ITHit.WebDAV.Client.DavConstants.SupportedLock;
                    for (var i = 0; i < _3b8.Propstats.length; i++) {
                        var _3bb = _3b8.Propstats[i];
                        if (!_3bb.Status.IsOk()) {
                            break;
                        }
                        var out = [];
                        for (var p in _3bb.PropertiesByNames) {
                            out.push(p);
                        }
                        if ("undefined" != typeof _3bb.PropertiesByNames[_3b9]) {
                            var _3be = _3bb.PropertiesByNames[_3b9];
                            try {
                                return ITHit.WebDAV.Client.HierarchyItem.ParseSupportedLock(_3be.Value);
                            } catch (e) {
                                break;
                            }
                        }
                    }
                    return [];
                }, ParseSupportedLock: function (_3bf) {
                    var _3c0 = [];
                    var _3c1 = new ITHit.XPath.resolver();
                    _3c1.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
                    var _3c2 = null;
                    var _3c3 = null;
                    var _3c4 = ITHit.XMLDoc.nodeTypes.NODE_ELEMENT;
                    var oRes = ITHit.XPath.evaluate("d:lockentry", _3bf, _3c1);
                    while (_3c2 = oRes.iterateNext()) {
                        var _3c6 = ITHit.XPath.evaluate("d:*", _3c2, _3c1);
                        while (_3c3 = _3c6.iterateNext()) {
                            if (_3c3.nodeType() == _3c4) {
                                var _3c7 = "";
                                if (_3c3.hasChildNodes()) {
                                    var _3c8 = _3c3.firstChild();
                                    while (_3c8) {
                                        if (_3c8.nodeType() == _3c4) {
                                            _3c7 = _3c8.localName();
                                            break;
                                        }
                                        _3c8 = _3c8.nextSibling();
                                    }
                                } else {
                                    _3c7 = _3c3.localName();
                                }
                                switch (_3c7.toLowerCase()) {
                                    case "shared":
                                        _3c0.push(ITHit.WebDAV.Client.LockScope.Shared);
                                        break;
                                    case "exclusive":
                                        _3c0.push(ITHit.WebDAV.Client.LockScope.Exclusive);
                                        break;
                                }
                            }
                        }
                    }
                    return _3c0;
                }, GetQuotaAvailableBytes: function (_3c9) {
                    var _3ca = ITHit.WebDAV.Client.DavConstants.QuotaAvailableBytes;
                    for (var i = 0; i < _3c9.Propstats.length; i++) {
                        var _3cc = _3c9.Propstats[i];
                        if (!_3cc.Status.IsOk()) {
                            break;
                        }
                        if ("undefined" != typeof _3cc.PropertiesByNames[_3ca]) {
                            var _3cd = _3cc.PropertiesByNames[_3ca];
                            try {
                                return parseInt(_3cd.Value.firstChild().nodeValue());
                            } catch (e) {
                                break;
                            }
                        }
                    }
                    return -1;
                }, GetQuotaUsedBytes: function (_3ce) {
                    var _3cf = ITHit.WebDAV.Client.DavConstants.QuotaUsedBytes;
                    for (var i = 0; i < _3ce.Propstats.length; i++) {
                        var _3d1 = _3ce.Propstats[i];
                        if (!_3d1.Status.IsOk()) {
                            break;
                        }
                        if ("undefined" != typeof _3d1.PropertiesByNames[_3cf]) {
                            var _3d2 = _3d1.PropertiesByNames[_3cf];
                            try {
                                return parseInt(_3d2.Value.firstChild().nodeValue());
                            } catch (e) {
                                break;
                            }
                        }
                    }
                    return -1;
                }, GetCkeckedIn: function (_3d3) {
                    var _3d4 = ITHit.WebDAV.Client.DavConstants.CheckedIn;
                    for (var i = 0; i < _3d3.Propstats.length; i++) {
                        var _3d6 = _3d3.Propstats[i];
                        if (!_3d6.Status.IsOk()) {
                            break;
                        }
                        if ("undefined" != typeof _3d6.PropertiesByNames[_3d4]) {
                            var _3d7 = _3d6.PropertiesByNames[_3d4];
                            try {
                                return ITHit.WebDAV.Client.HierarchyItem.ParseChecked(_3d7.Value);
                            } catch (e) {
                                break;
                            }
                        }
                    }
                    return false;
                }, GetCheckedOut: function (_3d8) {
                    var _3d9 = ITHit.WebDAV.Client.DavConstants.CheckedOut;
                    for (var i = 0; i < _3d8.Propstats.length; i++) {
                        var _3db = _3d8.Propstats[i];
                        if (!_3db.Status.IsOk()) {
                            break;
                        }
                        if ("undefined" != typeof _3db.PropertiesByNames[_3d9]) {
                            var _3dc = _3db.PropertiesByNames[_3d9];
                            try {
                                return ITHit.WebDAV.Client.HierarchyItem.ParseChecked(_3dc.Value);
                            } catch (e) {
                                break;
                            }
                        }
                    }
                    return false;
                }, ParseChecked: function (_3dd) {
                    var _3de = [];
                    var _3df = new ITHit.XPath.resolver();
                    _3df.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
                    var _3e0 = null;
                    var _3e1 = ITHit.XMLDoc.nodeTypes.NODE_ELEMENT;
                    var oRes = ITHit.XPath.evaluate("d:href", _3dd, _3df);
                    while (_3e0 = oRes.iterateNext()) {
                        if (_3e0.nodeType() == _3e1) {
                            _3de.push(_3e0.firstChild().nodeValue());
                        }
                    }
                    return _3de;
                }, GetResourceType: function (_3e3) {
                    var _3e4 = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_3e3, ITHit.WebDAV.Client.DavConstants.ResourceType);
                    var _3e5 = ITHit.WebDAV.Client.ResourceType.File;
                    if (_3e4.Value.getElementsByTagNameNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "collection").length > 0) {
                        _3e5 = ITHit.WebDAV.Client.ResourceType.Folder;
                    }
                    return _3e5;
                }, HasProperty: function (_3e6, _3e7) {
                    for (var i = 0; i < _3e6.Propstats.length; i++) {
                        var _3e9 = _3e6.Propstats[i];
                        for (var j = 0; j < _3e9.Properties.length; j++) {
                            var _3eb = _3e9.Properties[j];
                            if (_3eb.Name.Equals(_3e7)) {
                                return true;
                            }
                        }
                    }
                    return false;
                }, GetProperty: function (_3ec, _3ed) {
                    for (var i = 0; i < _3ec.Propstats.length; i++) {
                        var _3ef = _3ec.Propstats[i];
                        for (var j = 0; j < _3ef.Properties.length; j++) {
                            var _3f1 = _3ef.Properties[j];
                            if (_3f1.Name.Equals(_3ed)) {
                                return _3f1;
                            }
                        }
                    }
                    throw new ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException(ITHit.Phrases.Exceptions.PropertyNotFound, _3ec.Href, _3ed, null, null);
                }, GetPropertiesFromResponse: function (_3f2) {
                    var _3f3 = [];
                    for (var i = 0; i < _3f2.Propstats.length; i++) {
                        var _3f5 = _3f2.Propstats[i];
                        for (var i2 = 0; i2 < _3f5.Properties.length; i2++) {
                            _3f3.push(_3f5.Properties[i2]);
                        }
                    }
                    return _3f3;
                }, GetDisplayName: function (_3f7) {
                    var _3f8 = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_3f7, ITHit.WebDAV.Client.DavConstants.DisplayName).Value;
                    var _3f9;
                    if (_3f8.hasChildNodes()) {
                        _3f9 = _3f8.firstChild().nodeValue();
                    } else {
                        _3f9 = ITHit.WebDAV.Client.Encoder.Decode(ITHit.WebDAV.Client.HierarchyItem.GetLastName(_3f7.Href));
                    }
                    return _3f9;
                }, GetLastModified: function (_3fa) {
                    var _3fb;
                    try {
                        _3fb = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_3fa, ITHit.WebDAV.Client.DavConstants.GetLastModified);
                    } catch (e) {
                        if (!(e instanceof ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException)) {
                            throw e;
                        }
                        return null;
                    }
                    return ITHit.WebDAV.Client.HierarchyItem.GetDate(_3fb.Value.firstChild().nodeValue(), "rfc1123");
                }, GetContentType: function (_3fc) {
                    var _3fd = null;
                    var _3fe = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_3fc, ITHit.WebDAV.Client.DavConstants.GetContentType).Value;
                    if (_3fe.hasChildNodes()) {
                        _3fd = _3fe.firstChild().nodeValue();
                    }
                    return _3fd;
                }, GetContentLength: function (_3ff) {
                    var _400 = 0;
                    try {
                        var _401 = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_3ff, ITHit.WebDAV.Client.DavConstants.GetContentLength).Value;
                        if (_401.hasChildNodes()) {
                            _400 = parseInt(_401.firstChild().nodeValue());
                        }
                    } catch (e) {
                        if (!(e instanceof ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException)) {
                            throw e;
                        }
                        return null;
                    }
                    return _400;
                }, GetCreationDate: function (_402) {
                    var _403;
                    try {
                        _403 = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_402, ITHit.WebDAV.Client.DavConstants.CreationDate);
                    } catch (e) {
                        if (!(e instanceof ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException)) {
                            throw e;
                        }
                        return null;
                    }
                    return ITHit.WebDAV.Client.HierarchyItem.GetDate(_403.Value.firstChild().nodeValue(), "tz");
                }, GetDate: function (_404, _405) {
                    var _406;
                    var i = 0;
                    if ("tz" == _405) {
                        i++;
                    }
                    if (!_404) {
                        return new Date(0);
                    }
                    for (var e = i + 1; i <= e; i++) {
                        if (0 == i % 2) {
                            var _406 = new Date(_404);
                            if (!isNaN(_406)) {
                                break;
                            }
                        } else {
                            var _409 = _404.match(/([\d]{4})\-([\d]{2})\-([\d]{2})T([\d]{2}):([\d]{2}):([\d]{2})(\.[\d]+)?((?:Z)|(?:[\+\-][\d]{2}:[\d]{2}))/);
                            if (_409 && _409.length >= 7) {
                                _409.shift();
                                var _406 = new Date(_409[0], _409[1] - 1, _409[2], _409[3], _409[4], _409[5]);
                                var _40a = 6;
                                if (("undefined" != typeof _409[_40a]) && (-1 != _409[_40a].indexOf("."))) {
                                    _406.setMilliseconds(_409[_40a].replace(/[^\d]/g, ""));
                                }
                                _40a++;
                                if (("undefined" != typeof _409[_40a]) && ("-00:00" != _409[_40a]) && (-1 != _409[_40a].search(/(?:\+|-)/))) {
                                    var _40b = _409[_40a].slice(1).split(":");
                                    var _40c = parseInt(_40b[1]) + (60 * _40b[0]);
                                    if ("+" == _409[_40a][0]) {
                                        _406.setMinutes(_406.getMinutes() - _40c);
                                    } else {
                                        _406.setMinutes(_406.getMinutes() + _40c);
                                    }
                                    _40a++;
                                }
                                _406.setMinutes(_406.getMinutes() + (-1 * _406.getTimezoneOffset()));
                                break;
                            }
                        }
                    }
                    if (!_406 || isNaN(_406)) {
                        _406 = new Date(0);
                    }
                    return _406;
                }, GetAbsoluteUriPath: function (_40d) {
                    return _40d.replace(/\/?$/, "/");
                }, GetRelativePath: function (_40e) {
                    return _40e.replace(/^[a-z]+\:\/\/[^\/]+\//, "/");
                }, GetLastName: function (_40f) {
                    var _410 = ITHit.WebDAV.Client.HierarchyItem.GetRelativePath(_40f).replace(/\/$/, "");
                    return _410.match(/[^\/]*$/)[0];
                }, HrefEquals: function (_411, _412) {
                    var iPos = _412.search(/\?[^\/]+$/);
                    if (-1 != iPos) {
                        _412 = _412.substr(0, iPos);
                    }
                    var iPos = _412.search(/\?[^\/]+$/);
                    if (-1 != iPos) {
                        _412 = _412.substr(0, iPos);
                    }
                    return ITHit.WebDAV.Client.HierarchyItem.GetRelativePath(ITHit.WebDAV.Client.Encoder.Decode(_411)).replace(/\/$/, "") == ITHit.WebDAV.Client.HierarchyItem.GetRelativePath(ITHit.WebDAV.Client.Encoder.Decode(_412)).replace(/\/$/, "");
                }, GetFolderParentUri: function (_414) {
                    var _415 = /^https?\:\/\//.test(_414) ? _414.match(/^https?\:\/\/[^\/]+/)[0] + "/" : "/";
                    var _416 = ITHit.WebDAV.Client.HierarchyItem.GetRelativePath(_414);
                    _416 = _416.replace(/\/?$/, "");
                    if (_416 === "") {
                        return null;
                    }
                    _416 = _416.substr(0, _416.lastIndexOf("/") + 1);
                    _416 = _416.substr(1);
                    return _415 + _416;
                }, GetHost: function (_417) {
                    var _418;
                    if (/^https?\:\/\//.test(_417)) {
                        _418 = _417.match(/^https?\:\/\/[^\/]+/)[0] + "/";
                    } else {
                        _418 = location.protocol + "//" + location.host + "/";
                    }
                    return _418;
                }, GetPropertyValuesFromMultiResponse: function (_419, _41a) {
                    for (var i = 0; i < _419.Responses.length; i++) {
                        var _41c = _419.Responses[i];
                        if (!ITHit.WebDAV.Client.HierarchyItem.HrefEquals(_41c.Href, _41a)) {
                            continue;
                        }
                        var _41d = [];
                        for (var j = 0; j < _41c.Propstats.length; j++) {
                            var _41f = _41c.Propstats[j];
                            if (!_41f.Properties.length) {
                                continue;
                            }
                            if (_41f.Status.IsSuccess()) {
                                for (var k = 0; k < _41f.Properties.length; k++) {
                                    var _421 = _41f.Properties[k];
                                    if (!_421.Name.IsStandardProperty()) {
                                        _41d.push(_421);
                                    }
                                }
                                continue;
                            }
                            if (_41f.Status.Equals(ITHit.WebDAV.Client.HttpStatus.NotFound)) {
                                throw new ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException(ITHit.Phrases.Exceptions.PropertyNotFound, _41a, _41f.Properties[0].Name, new ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatus(_419), null);
                            }
                            if (_41f.Status.Equals(ITHit.WebDAV.Client.HttpStatus.Forbidden)) {
                                throw new ITHit.WebDAV.Client.Exceptions.PropertyForbiddenException(ITHit.Phrases.Exceptions.PropertyForbidden, _41a, _41f.Properties[0].Name, new ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatus(_419), null);
                            }
                            throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.Exceptions.PropertyFailed, _41a, _41f.Properties[0].Name, new ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatus(_419), _41f.Status, null);
                        }
                        return _41d;
                    }
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseItemNotFound.Paste(_41a));
                }, GetPropertyNamesFromMultiResponse: function (_422, _423) {
                    var _424 = [];
                    var _425 = this.GetPropertyValuesFromMultiResponse(_422, _423);
                    for (var i = 0, l = _425.length; i < l; i++) {
                        _424.push(_425[i].Name);
                    }
                    return _424;
                }, GetSourceFromMultiResponse: function (_428, _429) {
                    for (var i = 0; i < _428.length; i++) {
                        var _42b = _428[i];
                        if (!ITHit.WebDAV.Client.HierarchyItem.HrefEquals(_42b.Href, _429)) {
                            continue;
                        }
                        var _42c = [];
                        for (var j = 0; j < _42b.Propstats; j++) {
                            var _42e = _42b.Propstats[j];
                            if (!_42e.Status.IsOk()) {
                                if (_42e.Status.Equals(ITHit.WebDAV.Client.HttpStatus.NotFound)) {
                                    return null;
                                }
                                throw new ITHit.WebDAV.Client.Exceptions.PropertyForbiddenException(ITHit.Phrases.PropfindFailedWithStatus.Paste(_42e.Status.Description), _429, _42e.Properties[0].Name, new ITHit.WebDAV.Client.Exceptions.Info.Multistatus(_42b));
                            }
                            for (var k = 0; k < _42e.Properties.length; k++) {
                                var _430 = _42e.Properties[k];
                                if (_430.Name.Equals(ITHit.WebDAV.Client.DavConstants.Source)) {
                                    var _431 = _430.Value.GetElementsByTagNameNS(DavConstants.NamespaceUri, DavConstants.Link);
                                    for (var l = 0; l < _431.length; l++) {
                                        var _433 = _431[i];
                                        var _434 = new ITHit.WebDAV.Client.Source(_433.GetElementsByTagName(ITHit.WebDAV.Client.DavConstants.NamespaceUri, ITHit.WebDAV.Client.DavConstants.Src)[0].firstChild().nodeValue(), _433.GetElementsByTagName(ITHit.WebDAV.Client.DavConstants.NamespaceUri, ITHit.WebDAV.Client.DavConstants.Dst)[0].firstChild().nodeValue());
                                        _42c.push(_434);
                                    }
                                    return _42c;
                                }
                            }
                        }
                    }
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseItemNotFound.Paste(_429));
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
            constructor: function (_435, _436, _437, _438, _439, _43a, _43b, _43c, _43d, _43e, _43f, _440, _441, _442) {
                this.Session = _435;
                this.ServerVersion = _435.ServerEngine;
                this.Href = _436;
                this.LastModified = _437;
                this.DisplayName = _438;
                this.CreationDate = _439;
                this.ResourceType = _43a;
                this.SupportedLocks = _43b;
                this.ActiveLocks = _43c;
                this.Host = _43d;
                this.AvailableBytes = _43e;
                this.UsedBytes = _43f;
                this.CheckedIn = _440;
                this.CheckedOut = _441;
                this.Properties = new ITHit.WebDAV.Client.PropertyList();
                this.Properties.push.apply(this.Properties, _442 || []);
                this.VersionControlled = this.CheckedIn !== false || this.CheckedOut !== false;
                this._AbsoluteUrl = ITHit.Decode(this.Href);
                this._Url = this._AbsoluteUrl.replace(/^http[s]?:\/\/[^\/]+\/?/, "/");
            },
            IsFolder: function () {
                return false;
            },
            IsEqual: function (_443) {
                if (_443 instanceof ITHit.WebDAV.Client.HierarchyItem) {
                    return this.Href === _443.Href;
                }
                if (ITHit.Utils.IsString(_443)) {
                    if (_443.indexOf("://") !== -1 || _443.indexOf(":\\") !== -1) {
                        return this.GetAbsoluteUrl() === _443;
                    }
                    return this.GetUrl() === _443;
                }
                return false;
            },
            GetUrl: function () {
                return this._Url;
            },
            GetAbsoluteUrl: function () {
                return this._AbsoluteUrl;
            },
            HasProperty: function (_444) {
                for (var i = 0, l = this.Properties.length; i < l; i++) {
                    if (_444.Equals(this.Properties[i].Name)) {
                        return true;
                    }
                }
                return false;
            },
            GetProperty: function (_447) {
                for (var i = 0, l = this.Properties.length; i < l; i++) {
                    if (_447.Equals(this.Properties[i].Name)) {
                        return this.Properties[i].Value.firstChild().nodeValue();
                    }
                }
                throw new ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException("Not found property `" + _447.toString() + "` in resource `" + this.Href + "`.");
            },
            Refresh: function () {
                var _44a = this.Session.CreateRequest(this.__className + ".Refresh()");
                var _44b = [];
                for (var i = 0, l = this.Properties.length; i < l; i++) {
                    _44b.push(this.Properties[i].Name);
                }
                var _44e = self.OpenItem(_44a, this.Href, _44b);
                for (var key in _44e) {
                    if (_44e.hasOwnProperty(key)) {
                        this[key] = _44e[key];
                    }
                }
                _44a.MarkFinish();
            },
            RefreshAsync: function (_450) {
                var that = this;
                var _452 = this.Session.CreateRequest(this.__className + ".RefreshAsync()");
                var _453 = [];
                for (var i = 0, l = this.Properties.length; i < l; i++) {
                    _453.push(this.Properties[i].Name);
                }
                self.OpenItemAsync(_452, this.Href, _453, function (_456) {
                    if (_456.IsSuccess) {
                        for (var key in _456.Result) {
                            if (_456.Result.hasOwnProperty(key)) {
                                that[key] = _456.Result[key];
                            }
                        }
                        _456.Result = null;
                    }
                    _452.MarkFinish();
                    _450(_456);
                });
                return _452;
            },
            CopyTo: function (_458, _459, _45a, _45b, _45c) {
                _45c = _45c || null;
                var _45d = this.Session.CreateRequest(this.__className + ".CopyTo()");
                var _45e = ITHit.WebDAV.Client.Methods.CopyMove.Go(_45d, ITHit.WebDAV.Client.Methods.CopyMove.Mode.Copy, this.Href, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(_458.Href, _459), this.ResourceType === ITHit.WebDAV.Client.ResourceType.Folder, _45a, _45b, _45c, this.Host);
                var _45f = this._GetErrorFromCopyResponse(_45e.Response);
                if (_45f) {
                    _45d.MarkFinish();
                    throw _45f;
                }
                _45d.MarkFinish();
            },
            CopyToAsync: function (_460, _461, _462, _463, _464, _465) {
                _464 = _464 || null;
                var _466 = this.Session.CreateRequest(this.__className + ".CopyToAsync()");
                var that = this;
                ITHit.WebDAV.Client.Methods.CopyMove.GoAsync(_466, ITHit.WebDAV.Client.Methods.CopyMove.Mode.Copy, this.Href, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(_460.Href, _461), (this.ResourceType == ITHit.WebDAV.Client.ResourceType.Folder), _462, _463, _464, this.Host, function (_468) {
                    if (_468.IsSuccess) {
                        _468.Error = that._GetErrorFromCopyResponse(_468.Result.Response);
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
            Delete: function (_469) {
                _469 = _469 || null;
                var _46a = this.Session.CreateRequest(this.__className + ".Delete()");
                var _46b = ITHit.WebDAV.Client.Methods.Delete.Go(_46a, this.Href, _469, this.Host);
                var _46c = this._GetErrorFromDeleteResponse(_46b.Response);
                if (_46c) {
                    _46a.MarkFinish();
                    throw _46c;
                }
                _46a.MarkFinish();
            },
            DeleteAsync: function (_46d, _46e) {
                _46d = _46d || null;
                var _46f = this.Session.CreateRequest(this.__className + ".DeleteAsync()");
                var that = this;
                ITHit.WebDAV.Client.Methods.Delete.GoAsync(_46f, this.Href, _46d, this.Host, function (_471) {
                    if (_471.IsSuccess) {
                        _471.Error = that._GetErrorFromDeleteResponse(_471.Result.Response);
                        if (_471.Error !== null) {
                            _471.IsSuccess = false;
                            _471.Result = null;
                        }
                    }
                    _46f.MarkFinish();
                    _46e(_471);
                });
                return _46f;
            },
            GetPropertyNames: function () {
                var _472 = this.Session.CreateRequest(this.__className + ".GetPropertyNames()");
                var _473 = ITHit.WebDAV.Client.Methods.Propfind.Go(_472, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.PropertyNames, null, ITHit.WebDAV.Client.Depth.Zero, this.Host);
                var _474 = self.GetPropertyNamesFromMultiResponse(_473.Response, this.Href);
                _472.MarkFinish();
                return _474;
            },
            GetPropertyNamesAsync: function (_475) {
                var _476 = this.Session.CreateRequest(this.__className + ".GetPropertyNamesAsync()");
                var that = this;
                ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_476, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.PropertyNames, null, ITHit.WebDAV.Client.Depth.Zero, this.Host, function (_478) {
                    if (_478.IsSuccess) {
                        try {
                            _478.Result = self.GetPropertyNamesFromMultiResponse(_478.Result.Response, that.Href);
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
            GetPropertyValues: function (_479) {
                _479 = _479 || null;
                var _47a = this.Session.CreateRequest(this.__className + ".GetPropertyValues()");
                var _47b = ITHit.WebDAV.Client.Methods.Propfind.Go(_47a, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, _479, ITHit.WebDAV.Client.Depth.Zero, this.Host);
                var _47c = self.GetPropertyValuesFromMultiResponse(_47b.Response, this.Href);
                _47a.MarkFinish();
                return _47c;
            },
            GetPropertyValuesAsync: function (_47d, _47e) {
                _47d = _47d || null;
                var _47f = this.Session.CreateRequest(this.__className + ".GetPropertyValuesAsync()");
                var that = this;
                ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_47f, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, _47d, ITHit.WebDAV.Client.Depth.Zero, this.Host, function (_481) {
                    if (_481.IsSuccess) {
                        try {
                            _481.Result = self.GetPropertyValuesFromMultiResponse(_481.Result.Response, that.Href);
                        } catch (oError) {
                            _481.Error = oError;
                            _481.IsSuccess = false;
                        }
                    }
                    _47f.MarkFinish();
                    _47e(_481);
                });
                return _47f;
            },
            GetAllProperties: function () {
                return this.GetPropertyValues(null);
            },
            GetAllPropertiesAsync: function (_482) {
                return this.GetPropertyValuesAsync(null, _482);
            },
            GetParent: function (_483) {
                _483 = _483 || [];
                var _484 = this.Session.CreateRequest(this.__className + ".GetParent()");
                var _485 = ITHit.WebDAV.Client.HierarchyItem.GetFolderParentUri(ITHit.WebDAV.Client.Encoder.Decode(this.Href));
                if (_485 === null) {
                    _484.MarkFinish();
                    return null;
                }
                var _486 = ITHit.WebDAV.Client.Folder.OpenItem(_484, _485, _483);
                _484.MarkFinish();
                return _486;
            },
            GetParentAsync: function (_487, _488) {
                _487 = _487 || [];
                var _489 = this.Session.CreateRequest(this.__className + ".GetParentAsync()");
                var _48a = ITHit.WebDAV.Client.HierarchyItem.GetFolderParentUri(ITHit.WebDAV.Client.Encoder.Decode(this.Href));
                if (_48a === null) {
                    _488(new ITHit.WebDAV.Client.AsyncResult(null, true, null));
                    return null;
                }
                ITHit.WebDAV.Client.Folder.OpenItemAsync(_489, _48a, _487, _488);
                return _489;
            },
            GetSource: function () {
                var _48b = this.Session.CreateRequest(this.__className + ".GetSource()");
                var _48c = ITHit.WebDAV.Client.Methods.Propfind.Go(_48b, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.Source], ITHit.WebDAV.Client.Depth.Zero, this.Host);
                var _48d = self.GetSourceFromMultiResponse(_48c.Response.Responses, this.Href);
                _48b.MarkFinish();
                return _48d;
            },
            GetSourceAsync: function (_48e) {
                var _48f = this.Session.CreateRequest(this.__className + ".GetSourceAsync()");
                var that = this;
                ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_48f, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.Source], ITHit.WebDAV.Client.Depth.Zero, this.Host, function (_491) {
                    if (_491.IsSuccess) {
                        try {
                            _491.Result = self.GetSourceFromMultiResponse(_491.Result.Response.Responses, that.Href);
                        } catch (oError) {
                            _491.Error = oError;
                            _491.IsSuccess = false;
                        }
                    }
                    _48f.MarkFinish();
                    _48e(_491);
                });
                return _48f;
            },
            Lock: function (_492, _493, _494, _495) {
                var _496 = this.Session.CreateRequest(this.__className + ".Lock()");
                var _497 = ITHit.WebDAV.Client.Methods.Lock.Go(_496, this.Href, _495, _492, this.Host, _493, _494);
                _496.MarkFinish();
                return _497.LockInfo;
            },
            LockAsync: function (_498, _499, _49a, _49b, _49c) {
                var _49d = this.Session.CreateRequest(this.__className + ".LockAsync()");
                ITHit.WebDAV.Client.Methods.Lock.GoAsync(_49d, this.Href, _49b, _498, this.Host, _499, _49a, function (_49e) {
                    if (_49e.IsSuccess) {
                        _49e.Result = _49e.Result.LockInfo;
                    }
                    _49d.MarkFinish();
                    _49c(_49e);
                });
                return _49d;
            },
            MoveTo: function (_49f, _4a0, _4a1, _4a2) {
                _4a1 = _4a1 || false;
                _4a2 = _4a2 || null;
                var _4a3 = this.Session.CreateRequest(this.__className + ".MoveTo()");
                if (!(_49f instanceof ITHit.WebDAV.Client.Folder)) {
                    _4a3.MarkFinish();
                    throw new ITHit.Exception(ITHit.Phrases.Exceptions.FolderWasExpectedAsDestinationForMoving);
                }
                var _4a4 = ITHit.WebDAV.Client.Methods.CopyMove.Go(_4a3, ITHit.WebDAV.Client.Methods.CopyMove.Mode.Move, this.Href, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(_49f.Href, _4a0), this.ResourceType, true, _4a1, _4a2, this.Host);
                var _4a5 = this._GetErrorFromMoveResponse(_4a4.Response);
                if (_4a5 !== null) {
                    _4a3.MarkFinish();
                    throw _4a5;
                }
                _4a3.MarkFinish();
            },
            MoveToAsync: function (_4a6, _4a7, _4a8, _4a9, _4aa) {
                _4a8 = _4a8 || false;
                _4a9 = _4a9 || null;
                var _4ab = this.Session.CreateRequest(this.__className + ".MoveToAsync()");
                if (!(_4a6 instanceof ITHit.WebDAV.Client.Folder)) {
                    _4ab.MarkFinish();
                    throw new ITHit.Exception(ITHit.Phrases.Exceptions.FolderWasExpectedAsDestinationForMoving);
                }
                var that = this;
                ITHit.WebDAV.Client.Methods.CopyMove.GoAsync(_4ab, ITHit.WebDAV.Client.Methods.CopyMove.Mode.Move, this.Href, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(_4a6.Href, _4a7), this.ResourceType, true, _4a8, _4a9, this.Host, function (_4ad) {
                    if (_4ad.IsSuccess) {
                        _4ad.Error = that._GetErrorFromMoveResponse(_4ad.Result.Response);
                        if (_4ad.Error !== null) {
                            _4ad.IsSuccess = false;
                            _4ad.Result = null;
                        }
                    }
                    _4ab.MarkFinish();
                    _4aa(_4ad);
                });
                return _4ab;
            },
            RefreshLock: function (_4ae, _4af) {
                var _4b0 = this.Session.CreateRequest(this.__className + ".RefreshLock()");
                var _4b1 = ITHit.WebDAV.Client.Methods.LockRefresh.Go(_4b0, this.Href, _4af, _4ae, this.Host);
                _4b0.MarkFinish();
                return _4b1.LockInfo;
            },
            RefreshLockAsync: function (_4b2, _4b3, _4b4) {
                var _4b5 = this.Session.CreateRequest(this.__className + ".RefreshLockAsync()");
                ITHit.WebDAV.Client.Methods.LockRefresh.GoAsync(_4b5, this.Href, _4b3, _4b2, this.Host, function (_4b6) {
                    if (_4b6.IsSuccess) {
                        _4b6.Result = _4b6.Result.LockInfo;
                    }
                    _4b5.MarkFinish();
                    _4b4(_4b6);
                });
                return _4b5;
            },
            SupportedFeatures: function () {
                var _4b7 = this.Session.CreateRequest(this.__className + ".SupportedFeatures()");
                var _4b8 = ITHit.WebDAV.Client.Methods.Options.Go(_4b7, this.Href, this.Host).ItemOptions;
                _4b7.MarkFinish();
                return _4b8;
            },
            SupportedFeaturesAsync: function (_4b9) {
                return this.GetSupportedFeaturesAsync(_4b9);
            },
            GetSupportedFeaturesAsync: function (_4ba) {
                var _4bb = this.Session.CreateRequest(this.__className + ".GetSupportedFeaturesAsync()");
                ITHit.WebDAV.Client.Methods.Options.GoAsync(_4bb, this.Href, this.Host, function (_4bc) {
                    if (_4bc.IsSuccess) {
                        _4bc.Result = _4bc.Result.ItemOptions;
                    }
                    _4bb.MarkFinish();
                    _4ba(_4bc);
                });
                return _4bb;
            },
            Unlock: function (_4bd) {
                var _4be = this.Session.CreateRequest(this.__className + ".Unlock()");
                var _4bf = ITHit.WebDAV.Client.Methods.Unlock.Go(_4be, this.Href, _4bd, this.Host);
                var _4c0 = this._GetErrorFromUnlockResponse(_4bf.Response);
                if (_4c0) {
                    _4be.MarkFinish();
                    throw _4c0;
                }
                _4be.MarkFinish();
            },
            UnlockAsync: function (_4c1, _4c2) {
                var _4c3 = this.Session.CreateRequest(this.__className + ".UnlockAsync()");
                var that = this;
                ITHit.WebDAV.Client.Methods.Unlock.GoAsync(_4c3, this.Href, _4c1, this.Host, function (_4c5) {
                    if (_4c5.IsSuccess) {
                        _4c5.Error = that._GetErrorFromUnlockResponse(_4c5.Result.Response);
                        if (_4c5.Error !== null) {
                            _4c5.IsSuccess = false;
                            _4c5.Result = null;
                        }
                    }
                    _4c3.MarkFinish();
                    _4c2(_4c5);
                });
                return _4c3;
            },
            UpdateProperties: function (_4c6, _4c7, _4c8) {
                _4c8 = _4c8 || null;
                var _4c9 = this.Session.CreateRequest(this.__className + ".UpdateProperties()");
                var _4ca = this._GetPropertiesForUpdate(_4c6);
                var _4cb = this._GetPropertiesForDelete(_4c7);
                if (_4ca.length + _4cb.length === 0) {
                    ITHit.Logger.WriteMessage(ITHit.Phrases.Exceptions.NoPropertiesToManipulateWith);
                    _4c9.MarkFinish();
                    return;
                }
                var _4cc = ITHit.WebDAV.Client.Methods.Proppatch.Go(_4c9, this.Href, _4ca, _4cb, _4c8, this.Host);
                var _4cd = this._GetErrorFromUpdatePropertiesResponse(_4cc.Response);
                if (_4cd) {
                    _4c9.MarkFinish();
                    throw _4cd;
                }
                _4c9.MarkFinish();
            },
            UpdatePropertiesAsync: function (_4ce, _4cf, _4d0, _4d1) {
                _4d0 = _4d0 || null;
                var _4d2 = this.Session.CreateRequest(this.__className + ".UpdatePropertiesAsync()");
                var _4d3 = this._GetPropertiesForUpdate(_4ce);
                var _4d4 = this._GetPropertiesForDelete(_4cf);
                if (_4d3.length + _4d4.length === 0) {
                    _4d2.MarkFinish();
                    _4d1(new ITHit.WebDAV.Client.AsyncResult(true, true, null));
                    return null;
                }
                var that = this;
                ITHit.WebDAV.Client.Methods.Proppatch.GoAsync(_4d2, this.Href, _4d3, _4d4, _4d0, this.Host, function (_4d6) {
                    if (_4d6.IsSuccess) {
                        _4d6.Error = that._GetErrorFromUpdatePropertiesResponse(_4d6.Result.Response);
                        if (_4d6.Error !== null) {
                            _4d6.IsSuccess = false;
                            _4d6.Result = null;
                        }
                    }
                    _4d2.MarkFinish();
                    _4d1(_4d6);
                });
                return _4d2;
            },
            _GetPropertiesForUpdate: function (_4d7) {
                var _4d8 = [];
                if (_4d7) {
                    for (var i = 0; i < _4d7.length; i++) {
                        if ((_4d7[i] instanceof ITHit.WebDAV.Client.Property) && _4d7[i]) {
                            if (_4d7[i].Name.NamespaceUri != ITHit.WebDAV.Client.DavConstants.NamespaceUri) {
                                _4d8.push(_4d7[i]);
                            } else {
                                throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.Exceptions.AddOrUpdatePropertyDavProhibition.Paste(_4d7[i]), this.Href, _4d7[i]);
                            }
                        } else {
                            throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.Exceptions.PropertyUpdateTypeException);
                        }
                    }
                }
                return _4d8;
            },
            _GetPropertiesForDelete: function (_4da) {
                var _4db = [];
                if (_4da) {
                    for (var i = 0; i < _4da.length; i++) {
                        if ((_4da[i] instanceof ITHit.WebDAV.Client.PropertyName) && _4da[i]) {
                            if (_4da[i].NamespaceUri != ITHit.WebDAV.Client.DavConstants.NamespaceUri) {
                                _4db.push(_4da[i]);
                            } else {
                                throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.Exceptions.DeletePropertyDavProhibition.Paste(_4da[i]), this.Href, _4da[i]);
                            }
                        } else {
                            throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.Exceptions.PropertyDeleteTypeException);
                        }
                    }
                }
                return _4db;
            },
            _GetErrorFromDeleteResponse: function (_4dd) {
                if (_4dd instanceof ITHit.WebDAV.Client.Methods.MultiResponse) {
                    return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.FailedToDelete, this.Href, new ITHit.WebDAV.Client.Exceptions.Info.Multistatus(_4dd), ITHit.WebDAV.Client.HttpStatus.MultiStatus, null);
                }
                if (_4dd instanceof ITHit.WebDAV.Client.Methods.SingleResponse && !_4dd.Status.IsSuccess()) {
                    var _4de = ITHit.Phrases.DeleteFailedWithStatus.Paste(_4dd.Status.Code, _4dd.Status.Description);
                    return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(_4de, this.Href, null, _4dd.Status, null);
                }
                return null;
            },
            _GetErrorFromCopyResponse: function (_4df) {
                if (_4df instanceof ITHit.WebDAV.Client.Methods.MultiResponse) {
                    for (var i = 0, l = _4df.Responses.length; i < l; i++) {
                        if (_4df.Responses[i].Status.IsCopyMoveOk()) {
                            continue;
                        }
                        return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.FailedToCopy, this.Href, new ITHit.WebDAV.Client.Exceptions.Info.Multistatus(_4df), ITHit.WebDAV.Client.HttpStatus.MultiStatus, null);
                    }
                }
                if (_4df instanceof ITHit.WebDAV.Client.Methods.SingleResponse && !_4df.Status.IsCopyMoveOk()) {
                    return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.FailedToCopyWithStatus.Paste(_4df.Status.Code, _4df.Status.Description), this.Href, null, _4df.Status, null);
                }
                return null;
            },
            _GetErrorFromMoveResponse: function (_4e2) {
                if (_4e2 instanceof ITHit.WebDAV.Client.Methods.MultiResponse) {
                    for (var i = 0, l = _4e2.Responses.length; i < l; i++) {
                        if (_4e2.Responses[i].Status.IsCopyMoveOk()) {
                            continue;
                        }
                        return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.FailedToMove, this.Href, new ITHit.WebDAV.Client.Exceptions.Info.Multistatus(_4e2), ITHit.WebDAV.Client.HttpStatus.MultiStatus, null);
                    }
                }
                if (_4e2 instanceof ITHit.WebDAV.Client.Methods.SingleResponse && !_4e2.Status.IsCopyMoveOk()) {
                    return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.MoveFailedWithStatus.Paste(_4e2.Status.Code, _4e2.Status.Description), this.Href, null, _4e2.Status, null);
                }
                return null;
            },
            _GetErrorFromUnlockResponse: function (_4e5) {
                if (!_4e5.Status.IsUnlockOk()) {
                    return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.UnlockFailedWithStatus.Paste(_4e5.Status.Code, _4e5.Status.Description), this.Href, null, _4e5.Status, null);
                }
                return null;
            },
            _GetErrorFromUpdatePropertiesResponse: function (_4e6) {
                var _4e7 = new ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatus(_4e6);
                for (var i = 0; i < _4e7.Responses.length; i++) {
                    var _4e9 = _4e7.Responses[i];
                    if (_4e9.Status.IsSuccess()) {
                        continue;
                    }
                    return new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.FailedToUpdateProp, this.Href, _4e9.PropertyName, _4e7, ITHit.WebDAV.Client.HttpStatus.MultiStatus, null);
                }
                return null;
            }
        });
    })();
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Put", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_4ea, _4eb, _4ec, _4ed, _4ee, _4ef) {
                return this._super.apply(this, arguments);
            }, GoAsync: function (_4f0, _4f1, _4f2, _4f3, _4f4, _4f5, _4f6) {
                return this._super.apply(this, arguments);
            }, _CreateRequest: function (_4f7, _4f8, _4f9, _4fa, _4fb, _4fc) {
                var _4fd = _4f7.CreateWebDavRequest(_4fc, _4f8, _4fb);
                _4fd.Method("PUT");
                if (_4f9) {
                    _4fd.Headers.Add("Content-Type", _4f9);
                }
                _4fd.Body(_4fa);
                return _4fd;
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Get", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_4fe, _4ff, _500, _501, _502) {
                return this._super.apply(this, arguments);
            }, GoAsync: function (_503, _504, _505, _506, _507) {
                return this._super.apply(this, arguments);
            }, _CreateRequest: function (_508, _509, _50a, _50b, _50c) {
                var _50d = _508.CreateWebDavRequest(_50c, _509);
                _50d.Method("GET");
                _50d.Headers.Add("Translate", "f");
                if (_50a !== null) {
                    var _50e = _50a;
                    if (_50a >= 0) {
                        if (_50b !== null) {
                            _50e += "-" + parseInt(_50b);
                        } else {
                            _50e += "-";
                        }
                    } else {
                        _50e = String(_50e);
                    }
                    _50d.Headers.Add("Range", "bytes=" + _50e);
                }
                return _50d;
            }
        }, GetContent: function () {
            return this.Response._Response.BodyText;
        }
    });
    (function () {
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.DocManager", null, {
            __static: {
                ObsoleteMessage: function (_510) {
                    if (confirm(_510 + " function is deprecated.\n\nSee how to upgrade here:\nhttp://www.webdavsystem.com/ajax/programming/upgrade\n\nSelect OK to navigate to the above URL.\n")) {
                        window.open("http://www.webdavsystem.com/ajax/programming/upgrade", "_blank");
                    }
                },
                JavaEditDocument: function (_511, _512, _513, _514) {
                    self.ObsoleteMessage("DocManager.JavaEditDocument()");
                    var _515 = _513 != null ? self.GetFolder(_513) : null;
                    var _516 = self.GetDefaultCallback(_515);
                    this.DavProtocolEditDocument(_511, _512, _516);
                },
                JavaOpenFolderInOsFileManager: function (_517, _518, _519, _51a) {
                    self.ObsoleteMessage("DocManager.JavaOpenFolderInOsFileManager()");
                    var _51b = _519 != null ? self.GetFolder(_519) : null;
                    var _51c = self.GetDefaultCallback(_51b);
                    this.DavProtocolOpenFolderInOsFileManager(sDocumentUrl, _518, _51c);
                },
                IsMicrosoftOfficeAvailable: function () {
                    alert("The DocManager.IsMicrosoftOfficeAvailable() function is deprecated. See http://www.webdavsystem.com/ajax/programming/upgrade for more details.");
                    return true;
                },
                GetMsOfficeVersion: function () {
                    self.ObsoleteMessage("DocManager.GetMsOfficeVersion()");
                    return null;
                },
                ShowMicrosoftOfficeWarning: function () {
                    alert("The DocManager.ShowMicrosoftOfficeWarning() function is deprecated. See http://www.webdavsystem.com/ajax/programming/upgrade for more details.");
                },
                GetInstallFileName: function () {
                    var _51d = "ITHitEditDocumentOpener.";
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
                    return _51d + ext;
                },
                OpenFolderInOsFileManager: function (_51f, _520, _521, _522, _523) {
                    if (_523 == null) {
                        _523 = window.document.body;
                    }
                    if (ITHit.DetectBrowser.IE && (ITHit.DetectBrowser.IE < 11)) {
                        if (_523._httpFolder == null) {
                            var span = {
                                nodeName: "span",
                                style: {display: "none", behavior: "url(#default#httpFolder)"}
                            };
                            _523._httpFolder = ITHit.Utils.CreateDOMElement(span);
                            _523.appendChild(_523._httpFolder);
                        }
                        var res = _523._httpFolder.navigate(_51f);
                    } else {
                        var _526 = null;
                        if ((typeof (_521) == "string") && (self.GetExtension(_521) == "jar")) {
                            if (confirm("The DocManager.OpenFolderInOsFileManager() function signature changed.\n\nSee how to upgrade here:\nhttp://www.webdavsystem.com/ajax/programming/upgrade\n\nSelect OK to navigate to the above URL.\n")) {
                                window.open("http://www.webdavsystem.com/ajax/programming/upgrade", "_blank");
                            }
                            _526 = self.GetFolder(_521);
                            _521 = null;
                        }
                        if (_521 == null) {
                            _521 = self.GetDefaultCallback(_526);
                        }
                        _51f = _51f.replace(/\/?$/, "/");
                        this.OpenDavProtocol(_51f, _520, _521, _522);
                    }
                },
                GetExtension: function (_527) {
                    var _528 = _527.indexOf("?");
                    if (_528 > -1) {
                        _527 = _527.substr(0, _528);
                    }
                    var aExt = _527.split(".");
                    if (aExt.length === 1) {
                        return "";
                    }
                    return aExt.pop();
                },
                GetFolder: function (sUrl) {
                    var _52b = sUrl.indexOf("?");
                    if (_52b > -1) {
                        sUrl = sUrl.substr(0, _52b);
                    }
                    return sUrl.substring(0, sUrl.lastIndexOf("/")) + "/";
                },
                IsMicrosoftOfficeDocument: function (_52c) {
                    var ext = self.GetExtension(ITHit.Trim(_52c));
                    if (ext === "") {
                        return false;
                    }
                    return self.FileFormats.MsOfficeEditExtensions.join("|").indexOf(ext) !== -1;
                },
                GetMsOfficeSchemaByExtension: function (sExt) {
                    sExt = sExt.toLowerCase();
                    switch (sExt) {
                        case "docx":
                        case "doc":
                        case "docm":
                        case "dot":
                        case "dotm":
                        case "dotx":
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
                MicrosoftOfficeEditDocument: function (_52f, _530) {
                    _52f = ITHit.Trim(_52f);
                    var ext = self.GetExtension(_52f);
                    if (ext === "" && _530 != undefined) {
                        _530();
                    } else {
                        this.OpenProtocol(self.GetMsOfficeSchemaByExtension(ext) + ":" + encodeURIComponent("ofe|u|") + _52f, _530);
                    }
                },
                FileFormats: {
                    ProtectedExtentions: [],
                    MsOfficeEditExtensions: ["docx", "doc", "docm", "dot", "dotm", "dotx", "xltx", "xltm", "xlt", "xlsx", "xlsm", "xlsb", "xls", "xll", "xlam", "xla", "pptx", "pptm", "ppt", "ppsx", "ppsm", "pps", "ppam", "ppa", "potx", "potm", "pot", "accdb", "mdb", "xsn", "xsf", "pub", "vstx", "vstm", "vst", "vssx", "vssm", "vssm", "vss", "vsl", "vsdx", "vsdm", "vsd", "vdw", "mpp", "mpt"]
                },
                GetDefaultCallback: function (_532) {
                    if (_532 == null) {
                        var _532 = "/Plugins/";
                    }
                    var _533 = function () {
                        if (confirm("To open document you must install a custom protocol. Continue?")) {
                            window.open(_532 + self.GetInstallFileName());
                        }
                    };
                    return _533;
                },
                EditDocument: function (_534, _535, _536, _537) {
                    var _538 = null;
                    if ((typeof (_535) == "string") && (self.GetExtension(_535) == "jar")) {
                        if (confirm("The DocManager.EditDocument() function signature changed.\n\nSee how to upgrade here:\nhttp://www.webdavsystem.com/ajax/programming/upgrade\n\nSelect OK to navigate to the above URL.\n")) {
                            window.open("http://www.webdavsystem.com/ajax/programming/upgrade", "_blank");
                        }
                        _538 = self.GetFolder(_535);
                        _535 = null;
                    }
                    if (_536 == null) {
                        _536 = self.GetDefaultCallback(_538);
                    }
                    if (self.IsMicrosoftOfficeDocument(_534) && ((ITHit.DetectOS.OS == "Windows") || (ITHit.DetectOS.OS == "MacOS"))) {
                        self.MicrosoftOfficeEditDocument(_534, function () {
                            self.DavProtocolEditDocument(_534, _535, _536, _537);
                        });
                    } else {
                        this.DavProtocolEditDocument(_534, _535, _536, _537);
                    }
                },
                DavProtocolEditDocument: function (_539, _53a, _53b, _53c) {
                    this.OpenDavProtocol(_539, _53a, _53b, _53c);
                },
                DavProtocolOpenFolderInOsFileManager: function (_53d, _53e, _53f, _540) {
                    _53d = _53d.replace(/\/?$/, "/");
                    this.OpenDavProtocol(_53d, _53e, _53f, _540);
                },
                OpenDavProtocol: function (sUrl, _542, _543, _544) {
                    if (_542 == null) {
                        _542 = "";
                    }
                    sUrl = ITHit.Trim(sUrl);
                    _542 = ITHit.Trim(_542);
                    var uri = "dav3:" + _542 + encodeURIComponent("|") + sUrl;
                    if (_544 != null) {
                        uri += encodeURIComponent("|") + _544;
                    }
                    if (ITHit.DetectBrowser.Chrome && (ITHit.DetectOS.OS == "MacOS")) {
                        uri = uri.split(" ").join("%20");
                    }
                    this.OpenProtocol(uri, _543);
                },
                RegisterEvent: function (_546, _547, _548) {
                    if (_546.addEventListener) {
                        _546.addEventListener(_547, _548);
                        return {
                            remove: function () {
                                _546.removeEventListener(_547, _548);
                            }
                        };
                    } else {
                        _546.attachEvent(_547, _548);
                        return {
                            remove: function () {
                                _546.detachEvent(_547, _548);
                            }
                        };
                    }
                },
                CreateHiddenFrame: function (_549, uri) {
                    var _54b = document.createElement("iframe");
                    _54b.src = uri;
                    _54b.id = "hiddenIframe";
                    _54b.style.display = "none";
                    _549.appendChild(_54b);
                    return _54b;
                },
                OpenUriWithHiddenFrame: function (uri, _54d) {
                    var _54e = setTimeout(function () {
                        _54d();
                        _54f.remove();
                    }, 1000);
                    var _550 = document.querySelector("#hiddenIframe");
                    if (!_550) {
                        _550 = this.CreateHiddenFrame(document.body, "about:blank");
                    }
                    var _54f = this.RegisterEvent(window, "blur", onBlur);

                    function onBlur() {
                        clearTimeout(_54e);
                        _54f.remove();
                    }

                    _550.contentWindow.location.href = uri;
                },
                OpenUriWithTimeout: function (uri, _552) {
                    var _553 = setTimeout(function () {
                        _552();
                        _554.remove();
                    }, 1000);
                    var _554 = this.RegisterEvent(window, "blur", onBlur);

                    function onBlur() {
                        clearTimeout(_553);
                        _554.remove();
                    }

                    window.location = uri;
                },
                OpenUriUsingFirefox: function (uri, _556) {
                    var _557 = document.querySelector("#hiddenIframe");
                    if (!_557) {
                        _557 = this.CreateHiddenFrame(document.body, "about:blank");
                    }
                    try {
                        _557.contentWindow.location.href = uri;
                    } catch (e) {
                        if (e.name == "NS_ERROR_UNKNOWN_PROTOCOL") {
                            _556();
                        }
                    }
                },
                OpenUriUsingIE: function (uri, _559) {
                    if (navigator.msLaunchUri) {
                        navigator.msLaunchUri(uri, function () {
                        }, _559);
                    } else {
                        var ua = navigator.userAgent.toLowerCase();
                        var _55b = /windows nt 6.2/.test(ua) || /windows nt 6.3/.test(ua);
                        if (_55b) {
                            this.OpenUriUsingIEInWindows8(uri, _559);
                        } else {
                            if (ITHit.DetectBrowser.IE === 9 || ITHit.DetectBrowser.IE === 11) {
                                this.OpenUriWithHiddenFrame(uri, _559);
                            } else {
                                this.OpenUriInNewWindow(uri, _559);
                            }
                        }
                    }
                },
                OpenUriInNewWindow: function (uri, _55d) {
                    var _55e = window.open("", "", "width=0,height=0");
                    _55e.document.write("<iframe src='" + uri + "'></iframe>");
                    setTimeout(function () {
                        try {
                            _55e.location.href;
                            _55e.setTimeout("window.close()", 1000);
                        } catch (e) {
                            _55e.close();
                            _55d();
                        }
                    }, 1000);
                },
                OpenUriUsingIEInWindows8: function (uri, _560) {
                    window.location.href = uri;
                },
                OpenUriUsingEdgeInWindows10: function (uri, _562) {
                    if (navigator.msLaunchUri) {
                        navigator.msLaunchUri(uri);
                    }
                },
                OpenProtocol: function (uri, _564) {
                    function failCallback() {
                        _564 && _564();
                    }

                    if (ITHit.DetectBrowser.FF) {
                        this.OpenUriUsingFirefox(uri, failCallback);
                    } else {
                        if (ITHit.DetectBrowser.Chrome) {
                            this.OpenUriWithTimeout(uri, failCallback);
                        } else {
                            if (ITHit.DetectBrowser.IE) {
                                this.OpenUriUsingIE(uri, _564);
                            } else {
                                if (ITHit.DetectBrowser.Safari) {
                                    this.OpenUriWithHiddenFrame(uri, failCallback);
                                } else {
                                    if (ITHit.DetectBrowser.Edge) {
                                        this.OpenUriUsingEdgeInWindows10(uri, _564);
                                    } else {
                                        this.OpenUriWithTimeout(uri, failCallback);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    })();
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.CancelUpload", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_565, _566, _567, _568) {
                return this.GoAsync(_565, _566, _567, _568);
            }, GoAsync: function (_569, _56a, _56b, _56c, _56d) {
                var _56e = ITHit.WebDAV.Client.Methods.CancelUpload.createRequest(_569, _56a, _56b, _56c);
                var self = this;
                var _570 = typeof _56d === "function" ? function (_571) {
                    self._GoCallback(_56a, _571, _56d);
                } : null;
                var _572 = _56e.GetResponse(_570);
                if (typeof _56d !== "function") {
                    var _573 = new ITHit.WebDAV.Client.AsyncResult(_572, _572 != null, null);
                    return this._GoCallback(_56a, _573, _56d);
                } else {
                    return _56e;
                }
            }, _GoCallback: function (_574, _575, _576) {
                var _577 = _575;
                var _578 = true;
                var _579 = null;
                if (_575 instanceof ITHit.WebDAV.Client.AsyncResult) {
                    _577 = _575.Result;
                    _578 = _575.IsSuccess;
                    _579 = _575.Error;
                }
                var _57a = null;
                if (_578) {
                    _57a = new ITHit.WebDAV.Client.Methods.CancelUpload(new ITHit.WebDAV.Client.Methods.SingleResponse(_577));
                }
                if (typeof _576 === "function") {
                    var _57b = new ITHit.WebDAV.Client.AsyncResult(_57a, _578, _579);
                    _576.call(this, _57b);
                } else {
                    return _57a;
                }
            }, createRequest: function (_57c, _57d, _57e, _57f) {
                var _580 = _57c.CreateWebDavRequest(_57f, _57d, _57e);
                _580.Method("CANCELUPLOAD");
                return _580;
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.ResumableUpload", null, {
        Session: null,
        Href: null,
        Host: null,
        constructor: function (_581, _582, _583) {
            this.Session = _581;
            this.Href = _582;
            this.Host = _583;
        },
        GetBytesUploaded: function () {
            var _584 = this.Session.CreateRequest(this.__className + ".GetBytesUploaded()");
            var _585 = ITHit.WebDAV.Client.Methods.Report.Go(_584, this.Href, this.Host);
            var _586 = _585.length > 0 ? _585[0].BytesUploaded : null;
            _584.MarkFinish();
            return _586;
        },
        GetBytesUploadedAsync: function (_587) {
            var _588 = this.Session.CreateRequest(this.__className + ".GetBytesUploadedAsync()");
            ITHit.WebDAV.Client.Methods.Report.GoAsync(_588, this.Href, this.Host, null, null, function (_589) {
                _589.Result = _589.IsSuccess && _589.Result.length > 0 ? _589.Result[0].BytesUploaded : null;
                _588.MarkFinish();
                _587(_589);
            });
            return _588;
        },
        CancelUpload: function (_58a) {
            var _58b = this.Session.CreateRequest(this.__className + ".CancelUpload()");
            ITHit.WebDAV.Client.Methods.CancelUpload.Go(_58b, this.Href, _58a, this.Host);
            _58b.MarkFinish();
        },
        CancelUploadAsync: function (_58c, _58d) {
            var _58e = this.Session.CreateRequest(this.__className + ".CancelUploadAsync()");
            return ITHit.WebDAV.Client.Methods.CancelUpload.GoAsync(_58e, this.Href, this.Host, _58c, function (_58f) {
                _58e.MarkFinish();
                _58d(_58f);
            });
        }
    });
    (function () {
        var self = ITHit.WebDAV.Client.Resource = ITHit.DefineClass("ITHit.WebDAV.Client.File", ITHit.WebDAV.Client.HierarchyItem, {
            __static: {
                GetRequestProperties: function () {
                    return [ITHit.WebDAV.Client.DavConstants.ResourceType, ITHit.WebDAV.Client.DavConstants.DisplayName, ITHit.WebDAV.Client.DavConstants.CreationDate, ITHit.WebDAV.Client.DavConstants.GetLastModified, ITHit.WebDAV.Client.DavConstants.GetContentType, ITHit.WebDAV.Client.DavConstants.GetContentLength, ITHit.WebDAV.Client.DavConstants.SupportedLock, ITHit.WebDAV.Client.DavConstants.LockDiscovery, ITHit.WebDAV.Client.DavConstants.QuotaAvailableBytes, ITHit.WebDAV.Client.DavConstants.QuotaUsedBytes, ITHit.WebDAV.Client.DavConstants.CheckedIn, ITHit.WebDAV.Client.DavConstants.CheckedOut];
                }, ParseHref: function (_591, _592) {
                    var _593 = _591.split("?");
                    _593[0] = _593[0].replace(/\/?$/, "");
                    _591 = ITHit.WebDAV.Client.Encoder.EncodeURI(_593.join("?"));
                    return this._super(_591);
                }, OpenItem: function (_594, _595, _596) {
                    _596 = _596 || [];
                    var _597 = this._super(_594, _595, _596);
                    if (!(_597 instanceof self)) {
                        throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseFileWrongType.Paste(_595));
                    }
                    return _597;
                }, OpenItemAsync: function (_598, _599, _59a, _59b) {
                    _59a = _59a || [];
                    this._super(_598, _599, _59a, function (_59c) {
                        if (_59c.IsSuccess && !(_59c.Result instanceof self)) {
                            _59c.Error = new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseFileWrongType.Paste(_599));
                            _59c.IsSuccess = false;
                        }
                        _59b(_59c);
                    });
                    return _598;
                }
            },
            ContentLength: null,
            ContentType: null,
            ResumableUpload: null,
            constructor: function (_59d, _59e, _59f, _5a0, _5a1, _5a2, _5a3, _5a4, _5a5, _5a6, _5a7, _5a8, _5a9, _5aa, _5ab) {
                this._super(_59d, _59e, _59f, _5a0, _5a1, ITHit.WebDAV.Client.ResourceType.File, _5a4, _5a5, _5a6, _5a7, _5a8, _5a9, _5aa, _5ab);
                this.ContentLength = _5a3;
                this.ContentType = _5a2;
                this.ResumableUpload = new ITHit.WebDAV.Client.ResumableUpload(this.Session, this.Href);
            },
            ReadContent: function (_5ac, _5ad) {
                _5ac = _5ac || null;
                _5ad = _5ad || null;
                var _5ae = this.Session.CreateRequest(this.__className + ".ReadContent()");
                var _5af = _5ac && _5ad ? _5ac + _5ad - 1 : 0;
                var _5b0 = ITHit.WebDAV.Client.Methods.Get.Go(_5ae, this.Href, _5ac, _5af, this.Host);
                _5ae.MarkFinish();
                return _5b0.GetContent();
            },
            ReadContentAsync: function (_5b1, _5b2, _5b3) {
                _5b1 = _5b1 || null;
                _5b2 = _5b2 || null;
                var _5b4 = this.Session.CreateRequest(this.__className + ".ReadContentAsync()");
                var _5b5 = _5b1 && _5b2 ? _5b1 + _5b2 - 1 : null;
                ITHit.WebDAV.Client.Methods.Get.GoAsync(_5b4, this.Href, _5b1, _5b5, this.Host, function (_5b6) {
                    if (_5b6.IsSuccess) {
                        _5b6.Result = _5b6.Result.GetContent();
                    }
                    _5b4.MarkFinish();
                    _5b3(_5b6);
                });
                return _5b4;
            },
            WriteContent: function (_5b7, _5b8, _5b9) {
                _5b8 = _5b8 || null;
                _5b9 = _5b9 || "";
                var _5ba = this.Session.CreateRequest(this.__className + ".WriteContent()");
                var _5bb = ITHit.WebDAV.Client.Methods.Put.Go(_5ba, this.Href, _5b9, _5b7, _5b8, this.Host);
                var _5bc = this._GetErrorFromWriteContentResponse(_5bb.Response, this.Href);
                if (_5bc) {
                    _5ba.MarkFinish();
                    throw _5bc;
                }
                _5ba.MarkFinish();
            },
            WriteContentAsync: function (_5bd, _5be, _5bf, _5c0) {
                _5be = _5be || null;
                _5bf = _5bf || "";
                var _5c1 = this.Session.CreateRequest(this.__className + ".WriteContentAsync()");
                var that = this;
                ITHit.WebDAV.Client.Methods.Put.GoAsync(_5c1, this.Href, _5bf, _5bd, _5be, this.Host, function (_5c3) {
                    if (_5c3.IsSuccess) {
                        _5c3.Error = that._GetErrorFromWriteContentResponse(_5c3.Result.Response, that.Href);
                        if (_5c3.Error !== null) {
                            _5c3.IsSuccess = false;
                            _5c3.Result = null;
                        }
                    }
                    _5c1.MarkFinish();
                    _5c0(_5c3);
                });
                return _5c1;
            },
            EditDocument: function (_5c4) {
                ITHit.WebDAV.Client.DocManager.EditDocument(this.Href, _5c4);
            },
            GetVersions: function () {
                var _5c5 = this.Session.CreateRequest(this.__className + ".GetVersions()");
                var _5c6 = ITHit.WebDAV.Client.Methods.Report.Go(_5c5, this.Href, this.Host, ITHit.WebDAV.Client.Methods.Report.ReportType.VersionsTree, ITHit.WebDAV.Client.Version.GetRequestProperties());
                var _5c7 = ITHit.WebDAV.Client.Version.GetVersionsFromMultiResponse(_5c6.Response.Responses, this);
                _5c5.MarkFinish();
                return _5c7;
            },
            GetVersionsAsync: function (_5c8) {
                var _5c9 = this.Session.CreateRequest(this.__className + ".GetVersionsAsync()");
                var that = this;
                ITHit.WebDAV.Client.Methods.Report.GoAsync(_5c9, this.Href, this.Host, ITHit.WebDAV.Client.Methods.Report.ReportType.VersionsTree, ITHit.WebDAV.Client.Version.GetRequestProperties(), function (_5cb) {
                    if (_5cb.IsSuccess) {
                        _5cb.Result = ITHit.WebDAV.Client.Version.GetVersionsFromMultiResponse(_5cb.Result.Response.Responses, that);
                    }
                    _5c9.MarkFinish();
                    _5c8(_5cb);
                });
                return _5c9;
            },
            UpdateToVersion: function (_5cc) {
                var _5cd = _5cc instanceof ITHit.WebDAV.Client.Version ? _5cc.Href : _5cc;
                var _5ce = this.Session.CreateRequest(this.__className + ".UpdateToVersion()");
                var _5cf = ITHit.WebDAV.Client.Methods.UpdateToVersion.Go(_5ce, this.Href, this.Host, _5cd);
                var _5d0 = _5cf.Response;
                var _5d1 = _5d0.Responses[0].Status.IsSuccess();
                _5ce.MarkFinish();
                return _5d1;
            },
            UpdateToVersionAsync: function (_5d2, _5d3) {
                var _5d4 = _5d2 instanceof ITHit.WebDAV.Client.Version ? _5d2.Href : _5d2;
                var _5d5 = this.Session.CreateRequest(this.__className + ".UpdateToVersionAsync()");
                ITHit.WebDAV.Client.Methods.UpdateToVersion.GoAsync(_5d5, this.Href, this.Host, _5d4, function (_5d6) {
                    _5d6.Result = _5d6.IsSuccess && _5d6.Result.Response.Responses[0].Status.IsSuccess();
                    _5d5.MarkFinish();
                    _5d3(_5d6);
                });
                return _5d5;
            },
            PutUnderVersionControl: function (_5d7, _5d8) {
                _5d8 = _5d8 || null;
                var _5d9 = null;
                var _5da = null;
                if (_5d7) {
                    _5d9 = this.Session.CreateRequest(this.__className + ".PutUnderVersionControl()");
                    _5da = ITHit.WebDAV.Client.Methods.VersionControl.Go(_5d9, this.Href, _5d8, this.Host);
                    var _5db = this._GetErrorFromPutUnderVersionControlResponse(_5da.Response);
                    if (_5db) {
                        _5d9.MarkFinish();
                        throw _5db;
                    }
                    _5d9.MarkFinish();
                } else {
                    _5d9 = this.Session.CreateRequest(this.__className + ".PutUnderVersionControl()", 2);
                    _5da = ITHit.WebDAV.Client.Methods.Propfind.Go(_5d9, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.VersionHistory], ITHit.WebDAV.Client.Depth.Zero, this.Host);
                    var _5dc = self.GetPropertyValuesFromMultiResponse(_5da.Response, this.Href);
                    var _5dd = ITHit.WebDAV.Client.Version.ParseSetOfHrefs(_5dc);
                    if (_5dd.length !== 1) {
                        throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.ExceptionWhileParsingProperties, this.Href, ITHit.WebDAV.Client.DavConstants.VersionHistory, null, ITHit.WebDAV.Client.HttpStatus.None, null);
                    }
                    _5da = ITHit.WebDAV.Client.Methods.Delete.Go(_5d9, _5dd[0], _5d8, this.Host);
                    var _5db = this._GetErrorFromDeleteResponse(_5da.Response);
                    if (_5db) {
                        _5d9.MarkFinish();
                        throw _5db;
                    }
                    _5d9.MarkFinish();
                }
            },
            PutUnderVersionControlAsync: function (_5de, _5df, _5e0) {
                _5df = _5df || null;
                var that = this;
                var _5e2 = null;
                if (_5de) {
                    _5e2 = this.Session.CreateRequest(this.__className + ".PutUnderVersionControlAsync()");
                    ITHit.WebDAV.Client.Methods.VersionControl.GoAsync(_5e2, this.Href, _5df, this.Host, function (_5e3) {
                        if (_5e3.IsSuccess) {
                            _5e3.Error = that._GetErrorFromPutUnderVersionControlResponse(_5e3.Result.Response);
                            if (_5e3.Error !== null) {
                                _5e3.IsSuccess = false;
                                _5e3.Result = null;
                            }
                        }
                        _5e2.MarkFinish();
                        _5e0(_5e3);
                    });
                    return _5e2;
                } else {
                    _5e2 = this.Session.CreateRequest(this.__className + ".PutUnderVersionControlAsync()", 2);
                    ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_5e2, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.VersionHistory], ITHit.WebDAV.Client.Depth.Zero, this.Host, function (_5e4) {
                        if (_5e4.IsSuccess) {
                            try {
                                _5e4.Result = self.GetPropertyValuesFromMultiResponse(_5e4.Result.Response, that.Href);
                            } catch (oError) {
                                _5e4.Error = oError;
                                _5e4.IsSuccess = false;
                            }
                        }
                        if (_5e4.IsSuccess) {
                            var _5e5 = ITHit.WebDAV.Client.Version.ParseSetOfHrefs(_5e4.Result);
                            if (_5e5.length !== 1) {
                                throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.ExceptionWhileParsingProperties, that.Href, ITHit.WebDAV.Client.DavConstants.VersionHistory, null, ITHit.WebDAV.Client.HttpStatus.None, null);
                            }
                            ITHit.WebDAV.Client.Methods.Delete.GoAsync(_5e2, _5e5[0], _5df, that.Host, function (_5e6) {
                                if (_5e6.IsSuccess) {
                                    _5e6.Error = that._GetErrorFromDeleteResponse(_5e6.Result.Response);
                                    if (_5e6.Error !== null) {
                                        _5e6.IsSuccess = false;
                                        _5e6.Result = null;
                                    }
                                }
                                _5e2.MarkFinish();
                                _5e0(_5e6);
                            });
                        } else {
                            if (_5e4.Error instanceof ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException) {
                                _5e4.IsSuccess = true;
                                _5e4.Error = null;
                                _5e4.Result = null;
                                _5e2.MarkFinish();
                                _5e0(_5e4);
                            } else {
                                _5e2.MarkFinish();
                                _5e0(_5e4);
                            }
                        }
                    });
                }
            },
            _GetErrorFromPutUnderVersionControlResponse: function (_5e7) {
                if (!_5e7.Status.IsSuccess()) {
                    return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.PutUnderVersionControlFailed, this.Href, null, _5e7.Status, null);
                }
                return null;
            },
            _GetErrorFromWriteContentResponse: function (_5e8, _5e9) {
                if (!_5e8.Status.Equals(ITHit.WebDAV.Client.HttpStatus.OK) && !_5e8.Status.Equals(ITHit.WebDAV.Client.HttpStatus.NoContent)) {
                    return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.Exceptions.FailedToWriteContentToFile, _5e9, null, _5e8.Status, null);
                }
                return null;
            }
        });
    })();
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Mkcol", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_5ea, _5eb, _5ec, _5ed) {
                var _5ee = this.createRequest(_5ea, _5eb, _5ec, _5ed);
                var _5ef = _5ee.GetResponse();
                var _5f0 = new ITHit.WebDAV.Client.Methods.SingleResponse(_5ef);
                return new ITHit.WebDAV.Client.Methods.Mkcol(_5f0);
            }, GoAsync: function (_5f1, _5f2, _5f3, _5f4, _5f5) {
                var _5f6 = this.createRequest(_5f1, _5f2, _5f3, _5f4);
                _5f6.GetResponse(function (_5f7) {
                    if (!_5f7.IsSuccess) {
                        _5f5(new ITHit.WebDAV.Client.AsyncResult(null, false, _5f7.Error));
                        return;
                    }
                    var _5f8 = new ITHit.WebDAV.Client.Methods.SingleResponse(_5f7.Result);
                    var _5f9 = new ITHit.WebDAV.Client.Methods.Mkcol(_5f8);
                    _5f5(new ITHit.WebDAV.Client.AsyncResult(_5f9, true, null));
                });
                return _5f6;
            }, createRequest: function (_5fa, _5fb, _5fc, _5fd) {
                var _5fe = _5fa.CreateWebDavRequest(_5fd, _5fb, _5fc);
                _5fe.Method("MKCOL");
                return _5fe;
            }
        }
    });
    (function () {
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Head", ITHit.WebDAV.Client.Methods.HttpMethod, {
            __static: {
                Go: function (_600, _601, _602) {
                    try {
                        return this._super.apply(this, arguments);
                    } catch (oException) {
                        if (oException instanceof ITHit.WebDAV.Client.Exceptions.NotFoundException) {
                            var _603 = new self(null, _601);
                            _603.IsOK = false;
                            return _603;
                        }
                        throw oException;
                    }
                }, GoAsync: function (_604, _605, _606, _607) {
                    return this._super(_604, _605, _606, function (_608) {
                        if (_608.Error instanceof ITHit.WebDAV.Client.Exceptions.NotFoundException) {
                            _608.Result = new self(null, _605);
                            _608.Result.IsOK = false;
                            _608.IsSuccess = true;
                            _608.Error = null;
                        }
                        _607(_608);
                    });
                }, _ProcessResponse: function (_609, _60a) {
                    var _60b = this._super(_609, _60a);
                    _60b.IsOK = _609.Status.Equals(ITHit.WebDAV.Client.HttpStatus.OK);
                    return _60b;
                }, _CreateRequest: function (_60c, _60d, _60e) {
                    var _60f = _60c.CreateWebDavRequest(_60e, _60d);
                    _60f.Method("HEAD");
                    return _60f;
                }
            }, IsOK: null
        });
    })();
    ITHit.DefineClass("ITHit.WebDAV.Client.SearchQuery", null, {
        Phrase: null,
        SelectProperties: null,
        EnableLike: null,
        LikeProperties: null,
        EnableContains: null,
        constructor: function (_610) {
            this.Phrase = _610;
            this.SelectProperties = [];
            this.EnableLike = true;
            this.LikeProperties = [ITHit.WebDAV.Client.DavConstants.DisplayName];
            this.EnableContains = true;
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Search", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_611, _612, _613, _614) {
                var _615 = this._createRequest(_611, _612, _613, _614);
                var _616 = _615.GetResponse();
                return this._ProcessResponse(_616);
            }, GoAsync: function (_617, _618, _619, _61a, _61b) {
                var _61c = this._createRequest(_617, _618, _619, _61a);
                var that = this;
                _61c.GetResponse(function (_61e) {
                    if (!_61e.IsSuccess) {
                        _61b(new ITHit.WebDAV.Client.AsyncResult(null, false, _61e.Error));
                        return;
                    }
                    var _61f = that._ProcessResponse(_61e.Result, _618);
                    _61b(new ITHit.WebDAV.Client.AsyncResult(_61f, true, null));
                });
                return _61c;
            }, _ProcessResponse: function (_620, sUri) {
                var _622 = _620.GetResponseStream();
                var _623 = new ITHit.WebDAV.Client.Methods.MultiResponse(_622, sUri);
                return new ITHit.WebDAV.Client.Methods.Search(_623);
            }, _createRequest: function (_624, _625, _626, _627) {
                var _628 = _624.CreateWebDavRequest(_626, _625);
                _628.Method("SEARCH");
                var _629 = new ITHit.XMLDoc();
                var _62a = ITHit.WebDAV.Client.DavConstants;
                var _62b = _62a.NamespaceUri;
                var _62c = _629.createElementNS(_62b, "prop");
                if (_627.SelectProperties && _627.SelectProperties.length > 0) {
                    for (var i = 0; i < _627.SelectProperties.length; i++) {
                        _62c.appendChild(_629.createElementNS(_627.SelectProperties[i].NamespaceUri, _627.SelectProperties[i].Name));
                    }
                } else {
                    _62c.appendChild(_62b, "allprop");
                }
                var _62e = _629.createElementNS(_62b, "select");
                _62e.appendChild(_62c);
                var _62f = null;
                if (_627.EnableLike) {
                    var _630 = _629.createElementNS(_62b, "prop");
                    if (_627.LikeProperties && _627.LikeProperties.length > 0) {
                        for (var i = 0; i < _627.LikeProperties.length; i++) {
                            _630.appendChild(_629.createElementNS(_627.LikeProperties[i].NamespaceUri, _627.LikeProperties[i].Name));
                        }
                    }
                    var _631 = _629.createElementNS(_62b, "literal");
                    _631.appendChild(_629.createTextNode(_627.Phrase));
                    _62f = _629.createElementNS(_62b, "like");
                    _62f.appendChild(_630);
                    _62f.appendChild(_631);
                }
                var _632 = null;
                if (_627.EnableContains) {
                    _632 = _629.createElementNS(_62b, "contains");
                    _632.appendChild(_629.createTextNode(_627.Phrase));
                }
                var _633 = _629.createElementNS(_62b, "where");
                if (_62f && _632) {
                    var eOr = _629.createElementNS(_62b, "or");
                    eOr.appendChild(_62f);
                    eOr.appendChild(_632);
                    _633.appendChild(eOr);
                } else {
                    if (_62f) {
                        _633.appendChild(_62f);
                    } else {
                        if (_632) {
                            _633.appendChild(_632);
                        }
                    }
                }
                var _635 = _629.createElementNS(_62b, "basicsearch");
                _635.appendChild(_62e);
                _635.appendChild(_633);
                var _636 = _629.createElementNS(_62b, "searchrequest");
                _636.appendChild(_635);
                _629.appendChild(_636);
                _628.Body(_629);
                return _628;
            }
        }
    });
    (function () {
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.Folder", ITHit.WebDAV.Client.HierarchyItem, {
            __static: {
                GetRequestProperties: function () {
                    return [ITHit.WebDAV.Client.DavConstants.ResourceType, ITHit.WebDAV.Client.DavConstants.DisplayName, ITHit.WebDAV.Client.DavConstants.CreationDate, ITHit.WebDAV.Client.DavConstants.GetLastModified, ITHit.WebDAV.Client.DavConstants.SupportedLock, ITHit.WebDAV.Client.DavConstants.LockDiscovery, ITHit.WebDAV.Client.DavConstants.QuotaAvailableBytes, ITHit.WebDAV.Client.DavConstants.QuotaUsedBytes, ITHit.WebDAV.Client.DavConstants.CheckedIn, ITHit.WebDAV.Client.DavConstants.CheckedOut];
                }, ParseHref: function (_638) {
                    var _639 = _638.split("?");
                    _639[0] = _639[0].replace(/\/?$/, "/");
                    _638 = ITHit.WebDAV.Client.Encoder.EncodeURI(_639.join("?"));
                    return this._super(_638);
                }, OpenItem: function (_63a, _63b, _63c) {
                    _63c = _63c || [];
                    var _63d = this._super(_63a, _63b, _63c);
                    if (!(_63d instanceof self)) {
                        throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseFolderWrongType.Paste(_63b));
                    }
                    return _63d;
                }, OpenItemAsync: function (_63e, _63f, _640, _641) {
                    _640 = _640 || [];
                    return this._super(_63e, _63f, _640, function (_642) {
                        if (_642.IsSuccess && !(_642.Result instanceof self)) {
                            _642.Error = new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseFolderWrongType.Paste(_63f));
                            _642.IsSuccess = false;
                        }
                        _641(_642);
                    });
                }
            }, constructor: function (_643, _644, _645, _646, _647, _648, _649, _64a, _64b, _64c, _64d, _64e, _64f) {
                _644 = _644.replace(/\/?$/, "/");
                this._super(_643, _644, _645, _646, _647, ITHit.WebDAV.Client.ResourceType.Folder, _648, _649, _64a, _64b, _64c, _64d, _64e, _64f);
                this._Url = this._Url.replace(/\/?$/, "/");
                this._AbsoluteUrl = this._AbsoluteUrl.replace(/\/?$/, "/");
            }, IsFolder: function () {
                return true;
            }, CreateFolder: function (_650, _651, _652) {
                _652 = _652 || [];
                var _653 = this.Session.CreateRequest(this.__className + ".CreateFolder()", 2);
                _651 = _651 || null;
                var _654 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _650);
                var _655 = ITHit.WebDAV.Client.Methods.Mkcol.Go(_653, _654, _651, this.Host).Response;
                if (!_655.Status.Equals(ITHit.WebDAV.Client.HttpStatus.Created)) {
                    _653.MarkFinish();
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.Exceptions.FailedCreateFolder, _654, null, _655.Status, null);
                }
                var _656 = ITHit.WebDAV.Client.Folder.OpenItem(_653, ITHit.WebDAV.Client.Encoder.DecodeURI(_654), _652);
                _653.MarkFinish();
                return _656;
            }, CreateFolderAsync: function (_657, _658, _659, _65a) {
                _659 = _659 || [];
                var _65b = this.Session.CreateRequest(this.__className + ".CreateFolderAsync()", 2);
                var _65c = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _657);
                ITHit.WebDAV.Client.Methods.Mkcol.GoAsync(_65b, _65c, _658, this.Host, function (_65d) {
                    if (_65d.IsSuccess && !_65d.Result.Response.Status.Equals(ITHit.WebDAV.Client.HttpStatus.Created)) {
                        _65d.IsSuccess = false;
                        _65d.Error = new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.Exceptions.FailedCreateFolder, _65c, null, _65d.Result.Response.Status);
                    }
                    if (_65d.IsSuccess) {
                        self.OpenItemAsync(_65b, _65c, _659, function (_65e) {
                            _65b.MarkFinish();
                            _65a(_65e);
                        });
                    } else {
                        _65d.Result = null;
                        _65b.MarkFinish();
                        _65a(_65d);
                    }
                });
                return _65b;
            }, CreateFile: function (_65f, _660, _661, _662) {
                _660 = _660 || null;
                _661 = _661 || "";
                _662 = _662 || [];
                var _663 = this.Session.CreateRequest(this.__className + ".CreateFile()", 2);
                var _664 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _65f);
                var _665 = ITHit.WebDAV.Client.Methods.Put.Go(_663, _664, "", _661, _660, this.Host);
                var _666 = this._GetErrorFromCreateFileResponse(_665.Response, _664);
                if (_666) {
                    _663.MarkFinish();
                    throw _666;
                }
                var _667 = ITHit.WebDAV.Client.File.OpenItem(_663, _664, _662);
                _663.MarkFinish();
                return _667;
            }, CreateFileAsync: function (_668, _669, _66a, _66b, _66c) {
                _669 = _669 || null;
                _66a = _66a || "";
                _66b = _66b || [];
                var _66d = this.Session.CreateRequest(this.__className + ".CreateFileAsync()", 2);
                var _66e = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _668);
                var that = this;
                ITHit.WebDAV.Client.Methods.Put.GoAsync(_66d, _66e, "", _66a, _669, this.Host, function (_670) {
                    if (_670.IsSuccess) {
                        _670.Error = that._GetErrorFromCreateFileResponse(_670.Result.Response);
                        if (_670.Error !== null) {
                            _670.IsSuccess = false;
                            _670.Result = null;
                        }
                    }
                    if (_670.IsSuccess) {
                        ITHit.WebDAV.Client.File.OpenItemAsync(_66d, _66e, _66b, function (_671) {
                            _66d.MarkFinish();
                            _66c(_671);
                        });
                    } else {
                        _66d.MarkFinish();
                        _66c(_670);
                    }
                });
                return _66d;
            }, CreateResource: function (_672, _673, _674, _675) {
                return this.CreateFile(_672, _673, _674, _675);
            }, CreateResourceAsync: function (_676, _677, _678, _679, _67a) {
                return this.CreateFileAsync(_676, _677, _678, _679, _67a);
            }, CreateLockNull: function (_67b, _67c, _67d, _67e, _67f) {
                var _680 = this.Session.CreateRequest(this.__className + ".CreateLockNull()");
                var _681 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _67b);
                var _682 = ITHit.WebDAV.Client.Methods.Lock.Go(_680, _681, _67f, _67c, this.Host, _67d, _67e);
                _680.MarkFinish();
                return _682.LockInfo;
            }, GetChildren: function (_683, _684) {
                _683 = _683 || false;
                _684 = _684 || [];
                var _685 = this.Session.CreateRequest(this.__className + ".GetChildren()");
                var _686 = ITHit.WebDAV.Client.HierarchyItem.GetCustomRequestProperties(_684);
                var _687 = _686.concat(ITHit.WebDAV.Client.HierarchyItem.GetRequestProperties());
                var _688 = ITHit.WebDAV.Client.Methods.Propfind.Go(_685, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, _687, _683 ? ITHit.WebDAV.Client.Depth.Infinity : ITHit.WebDAV.Client.Depth.One, this.Host);
                var _689 = ITHit.WebDAV.Client.HierarchyItem.GetItemsFromMultiResponse(_688.Response, _685, this.Href, _686);
                _685.MarkFinish();
                return _689;
            }, GetChildrenAsync: function (_68a, _68b, _68c) {
                _68a = _68a || false;
                if (typeof _68b === "function") {
                    _68c = _68b;
                    _68b = [];
                } else {
                    _68b = _68b || [];
                    _68c = _68c || function () {
                        };
                }
                var _68d = this.Session.CreateRequest(this.__className + ".GetChildrenAsync()");
                var _68e = ITHit.WebDAV.Client.HierarchyItem.GetCustomRequestProperties(_68b);
                var _68f = _68e.concat(ITHit.WebDAV.Client.HierarchyItem.GetRequestProperties());
                var that = this;
                ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_68d, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, _68f, _68a ? ITHit.WebDAV.Client.Depth.Infinity : ITHit.WebDAV.Client.Depth.One, this.Host, function (_691) {
                    if (_691.IsSuccess) {
                        _691.Result = ITHit.WebDAV.Client.HierarchyItem.GetItemsFromMultiResponse(_691.Result.Response, _68d, that.Href, _68e);
                    }
                    _68d.MarkFinish();
                    _68c(_691);
                });
                return _68d;
            }, GetFolder: function (_692) {
                var _693 = this.Session.CreateRequest(this.__className + ".GetFolder()");
                var _694 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _692);
                var _695 = self.OpenItem(_693, _694);
                _693.MarkFinish();
                return _695;
            }, GetFolderAsync: function (_696, _697) {
                var _698 = this.Session.CreateRequest(this.__className + ".GetFolderAsync()");
                var _699 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _696);
                self.OpenItemAsync(_698, _699, null, function (_69a) {
                    _698.MarkFinish();
                    _697(_69a);
                });
                return _698;
            }, GetFile: function (_69b) {
                var _69c = this.Session.CreateRequest(this.__className + ".GetFile()");
                var _69d = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _69b);
                var _69e = ITHit.WebDAV.Client.File.OpenItem(_69c, _69d);
                _69c.MarkFinish();
                return _69e;
            }, GetFileAsync: function (_69f, _6a0) {
                var _6a1 = this.Session.CreateRequest(this.__className + ".GetFileAsync()");
                var _6a2 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _69f);
                ITHit.WebDAV.Client.File.OpenItemAsync(_6a1, _6a2, null, function (_6a3) {
                    _6a1.MarkFinish();
                    _6a0(_6a3);
                });
                return _6a1;
            }, GetResource: function (_6a4) {
                return this.GetFile(_6a4);
            }, GetResourceAsync: function (_6a5, _6a6) {
                return this.GetFileAsync(_6a5, _6a6);
            }, GetItem: function (_6a7) {
                var _6a8 = this.Session.CreateRequest(this.__className + ".GetItem()");
                var _6a9 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _6a7);
                var _6aa = ITHit.WebDAV.Client.HierarchyItem.OpenItem(_6a8, _6a9);
                _6a8.MarkFinish();
                return _6aa;
            }, GetItemAsync: function (_6ab, _6ac) {
                var _6ad = this.Session.CreateRequest(this.__className + ".GetItemAsync()");
                var _6ae = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _6ab);
                ITHit.WebDAV.Client.HierarchyItem.OpenItemAsync(_6ad, _6ae, null, function (_6af) {
                    _6ad.MarkFinish();
                    _6ac(_6af);
                });
                return _6ad;
            }, ItemExists: function (_6b0) {
                var _6b1 = this.Session.CreateRequest(this.__className + ".ItemExists()", 2);
                try {
                    var _6b2 = ITHit.WebDAV.Client.Methods.Head.Go(_6b1, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _6b0), this.Host);
                } catch (oError) {
                    if (oError instanceof ITHit.WebDAV.Client.Exceptions.MethodNotAllowedException) {
                        try {
                            ITHit.WebDAV.Client.Methods.Propfind.Go(_6b1, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _6b0), ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.DisplayName], ITHit.WebDAV.Client.Depth.Zero, this.Host);
                        } catch (oSubError) {
                            if (oSubError instanceof ITHit.WebDAV.Client.Exceptions.NotFoundException) {
                                _6b1.MarkFinish();
                                return false;
                            }
                            throw oSubError;
                        }
                        _6b1.MarkFinish();
                        return true;
                    }
                    throw oError;
                }
                _6b1.MarkFinish();
                return _6b2.IsOK;
            }, ItemExistsAsync: function (_6b3, _6b4) {
                var _6b5 = this.Session.CreateRequest(this.__className + ".ItemExistsAsync()", 2);
                var that = this;
                ITHit.WebDAV.Client.Methods.Head.GoAsync(_6b5, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _6b3), this.Host, function (_6b7) {
                    if (_6b7.Error instanceof ITHit.WebDAV.Client.Exceptions.MethodNotAllowedException) {
                        ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_6b5, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(that.Href, _6b3), ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.DisplayName], ITHit.WebDAV.Client.Depth.Zero, that.Host, function (_6b8) {
                            _6b8.Result = _6b8.IsSuccess;
                            if (_6b8.Error instanceof ITHit.WebDAV.Client.Exceptions.NotFoundException) {
                                _6b8.IsSuccess = true;
                                _6b8.Result = false;
                            }
                            _6b5.MarkFinish();
                            _6b4(_6b8);
                        });
                        return;
                    }
                    _6b7.Result = _6b7.Result.IsOK;
                    _6b5.MarkFinish();
                    _6b4(_6b7);
                });
                return _6b5;
            }, SearchByQuery: function (_6b9) {
                var _6ba = this.Session.CreateRequest(this.__className + ".SearchByQuery()");
                var _6bb = ITHit.WebDAV.Client.HierarchyItem.GetCustomRequestProperties(_6b9.SelectProperties);
                _6b9.SelectProperties = _6bb.concat(ITHit.WebDAV.Client.HierarchyItem.GetRequestProperties());
                var _6bc = ITHit.WebDAV.Client.Methods.Search.Go(_6ba, this.Href, this.Host, _6b9);
                var _6bd = ITHit.WebDAV.Client.HierarchyItem.GetItemsFromMultiResponse(_6bc.Response, _6ba, this.Href, _6bb);
                _6ba.MarkFinish();
                return _6bd;
            }, SearchByQueryAsync: function (_6be, _6bf) {
                var _6c0 = this.Session.CreateRequest(this.__className + ".SearchByQueryAsync()");
                var _6c1 = ITHit.WebDAV.Client.HierarchyItem.GetCustomRequestProperties(_6be.SelectProperties);
                _6be.SelectProperties = _6c1.concat(ITHit.WebDAV.Client.HierarchyItem.GetRequestProperties());
                var that = this;
                ITHit.WebDAV.Client.Methods.Search.GoAsync(_6c0, this.Href, this.Host, _6be, function (_6c3) {
                    if (_6c3.IsSuccess) {
                        _6c3.Result = ITHit.WebDAV.Client.HierarchyItem.GetItemsFromMultiResponse(_6c3.Result.Response, _6c0, that.Href, _6c1);
                    }
                    _6c0.MarkFinish();
                    _6bf(_6c3);
                });
                return _6c0;
            }, Search: function (_6c4, _6c5) {
                var _6c6 = new ITHit.WebDAV.Client.SearchQuery(_6c4);
                _6c6.SelectProperties = _6c5 || [];
                return this.SearchByQuery(_6c6);
            }, SearchAsync: function (_6c7, _6c8, _6c9) {
                var _6ca = new ITHit.WebDAV.Client.SearchQuery(_6c7);
                _6ca.SelectProperties = _6c8 || [];
                return this.SearchByQueryAsync(_6ca, _6c9);
            }, _GetErrorFromCreateFileResponse: function (_6cb, _6cc) {
                if (!_6cb.Status.Equals(ITHit.WebDAV.Client.HttpStatus.Created) && !_6cb.Status.Equals(ITHit.WebDAV.Client.HttpStatus.OK)) {
                    return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.Exceptions.FailedCreateFile, _6cc, null, _6cb.Status, null);
                }
                return null;
            }
        });
    })();
    (function () {
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.Methods.UpdateToVersion", ITHit.WebDAV.Client.Methods.HttpMethod, {
            __static: {
                Go: function (_6ce, _6cf, _6d0, _6d1) {
                    var _6d2 = this.createRequest(_6ce, _6cf, _6d0, _6d1);
                    var _6d3 = _6d2.GetResponse();
                    return this._ProcessResponse(_6d3, _6cf);
                }, GoAsync: function (_6d4, _6d5, _6d6, _6d7, _6d8) {
                    var _6d9 = this.createRequest(_6d4, _6d5, _6d6, _6d7);
                    var that = this;
                    _6d9.GetResponse(function (_6db) {
                        if (!_6db.IsSuccess) {
                            _6d8(new ITHit.WebDAV.Client.AsyncResult(null, false, _6db.Error));
                            return;
                        }
                        var _6dc = that._ProcessResponse(_6db.Result, _6d5);
                        _6d8(new ITHit.WebDAV.Client.AsyncResult(_6dc, true, null));
                    });
                    return _6d9;
                }, _ProcessResponse: function (_6dd, _6de) {
                    var _6df = _6dd.GetResponseStream();
                    return new self(new ITHit.WebDAV.Client.Methods.MultiResponse(_6df, _6de));
                }, createRequest: function (_6e0, _6e1, _6e2, _6e3) {
                    var _6e4 = _6e0.CreateWebDavRequest(_6e2, _6e1);
                    _6e4.Method("UPDATE");
                    _6e4.Headers.Add("Content-Type", "text/xml; charset=\"utf-8\"");
                    var _6e5 = new ITHit.XMLDoc();
                    var _6e6 = ITHit.WebDAV.Client.DavConstants.NamespaceUri;
                    var _6e7 = _6e5.createElementNS(_6e6, "update");
                    var _6e8 = _6e5.createElementNS(_6e6, "version");
                    var _6e9 = _6e5.createElementNS(_6e6, "href");
                    _6e9.appendChild(_6e5.createTextNode(_6e3));
                    _6e8.appendChild(_6e9);
                    _6e7.appendChild(_6e8);
                    _6e5.appendChild(_6e7);
                    _6e4.Body(_6e5);
                    return _6e4;
                }
            }
        });
    })();
    (function () {
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.Version", ITHit.WebDAV.Client.File, {
            __static: {
                GetRequestProperties: function () {
                    return [ITHit.WebDAV.Client.DavConstants.DisplayName, ITHit.WebDAV.Client.DavConstants.CreationDate, ITHit.WebDAV.Client.DavConstants.GetContentType, ITHit.WebDAV.Client.DavConstants.GetContentLength, ITHit.WebDAV.Client.DavConstants.VersionName, ITHit.WebDAV.Client.DavConstants.CreatorDisplayName, ITHit.WebDAV.Client.DavConstants.Comment];
                }, GetVersionName: function (_6eb) {
                    var _6ec = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_6eb, ITHit.WebDAV.Client.DavConstants.VersionName).Value;
                    if (_6ec.hasChildNodes()) {
                        return _6ec.firstChild().nodeValue();
                    }
                    return null;
                }, GetCreatorDisplayName: function (_6ed) {
                    var _6ee = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_6ed, ITHit.WebDAV.Client.DavConstants.CreatorDisplayName).Value;
                    if (_6ee.hasChildNodes()) {
                        return _6ee.firstChild().nodeValue();
                    }
                    return null;
                }, GetComment: function (_6ef) {
                    var _6f0 = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_6ef, ITHit.WebDAV.Client.DavConstants.Comment).Value;
                    if (_6f0.hasChildNodes()) {
                        return _6f0.firstChild().nodeValue();
                    }
                    return null;
                }, GetVersionsFromMultiResponse: function (_6f1, _6f2) {
                    var _6f3 = [];
                    for (var i = 0; i < _6f1.length; i++) {
                        var _6f5 = _6f1[i];
                        _6f3.push(new self(_6f2.Session, _6f5.Href, _6f2, this.GetDisplayName(_6f5), this.GetVersionName(_6f5), this.GetCreatorDisplayName(_6f5), this.GetComment(_6f5), this.GetCreationDate(_6f5), this.GetContentType(_6f5), this.GetContentLength(_6f5), _6f2.Host, this.GetPropertiesFromResponse(_6f5)));
                    }
                    _6f3.sort(function (a, b) {
                        var _6f8 = parseInt(a.VersionName.replace(/[^0-9]/g, ""));
                        var _6f9 = parseInt(b.VersionName.replace(/[^0-9]/g, ""));
                        if (_6f8 === _6f9) {
                            return 0;
                        }
                        return _6f8 > _6f9 ? 1 : -1;
                    });
                    return _6f3;
                }, ParseSetOfHrefs: function (_6fa) {
                    var _6fb = [];
                    for (var i = 0, l = _6fa.length; i < l; i++) {
                        var xml = _6fa[i].Value;
                        var _6ff = xml.getElementsByTagNameNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "href");
                        for (var i2 = 0, l2 = _6ff.length; i2 < l2; i2++) {
                            _6fb.push(_6ff[i2].firstChild().nodeValue());
                        }
                    }
                    return _6fb;
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
            constructor: function (_702, _703, _704, _705, _706, _707, _708, _709, _70a, _70b, _70c, _70d) {
                this._File = _704;
                this.VersionName = _706;
                this.CreatorDisplayName = _707 || "";
                this.Comment = _708 || "";
                this._super(_702, _703, _709, _706, _709, _70a, _70b, null, null, _70c, null, null, null, null, _70d);
            },
            UpdateToThis: function () {
                return this._File.UpdateToVersion(this);
            },
            UpdateToThisAsync: function (_70e) {
                return this._File.UpdateToVersionAsync(this, _70e);
            },
            Delete: function () {
                var _70f = this.Session.CreateRequest(this.__className + ".Delete()");
                ITHit.WebDAV.Client.Methods.Delete.Go(_70f, this.Href, null, this.Host);
                _70f.MarkFinish();
            },
            DeleteAsync: function (_710) {
                var _711 = this.Session.CreateRequest(this.__className + ".DeleteAsync()");
                ITHit.WebDAV.Client.Methods.Delete.GoAsync(_711, this.Href, null, this.Host, function (_712) {
                    _711.MarkFinish();
                    _710(_712);
                });
                return _711;
            },
            ReadContentAsync: function (_713, _714, _715) {
                return this._super.apply(this, arguments);
            },
            WriteContentAsync: function (_716, _717, _718, _719) {
                return this._super.apply(this, arguments);
            },
            RefreshAsync: function (_71a) {
                return this._super.apply(this, arguments);
            },
            GetSource: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            GetSourceAsync: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            GetSupportedLock: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            GetSupportedLockAsync: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            GetParent: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            GetParentAsync: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            UpdateProperties: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            UpdatePropertiesAsync: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            CopyTo: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            CopyToAsync: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            MoveTo: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            MoveToAsync: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            Lock: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            LockAsync: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            RefreshLock: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            RefreshLockAsync: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            Unlock: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            UnlockAsync: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            SupportedFeatures: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            SupportedFeaturesAsync: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            GetSupportedFeaturesAsync: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            GetAllProperties: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            GetAllPropertiesAsync: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            GetPropertyNames: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            GetPropertyNamesAsync: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            GetPropertyValues: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            GetPropertyValuesAsync: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            GetVersions: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            GetVersionsAsync: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            PutUnderVersionControl: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            PutUnderVersionControlAsync: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            UpdateToVersion: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            },
            UpdateToVersionAsync: function () {
                throw new ITHit.Exception("The method or operation is not implemented.");
            }
        });
    })();
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Undelete", null, {
        __static: {
            Go: function (_71b, _71c, _71d) {
                var _71e = ITHit.WebDAV.Client.Methods.Undelete.createRequest(_71b, _71c, _71d);
                var _71f = _71e.GetResponse();
                return new ITHit.WebDAV.Client.Methods.Report(_71f);
            }, createRequest: function (_720, _721, _722) {
                var _723 = _720.CreateWebDavRequest(_722, _721);
                _723.Method("UNDELETE");
                return _723;
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.WebDavResponse", null, {
        __static: {
            ignoreXmlByMethodAndStatus: {
                "DELETE": {200: true},
                "COPY": {201: true, 204: true},
                "MOVE": {201: true, 204: true}
            }
        }, _Response: null, RequestMethod: null, Status: null, constructor: function (_724, _725) {
            this._Response = _724;
            this.RequestMethod = _725;
            this.Status = new ITHit.WebDAV.Client.HttpStatus(_724.Status, _724.StatusDescription);
        }, Headers: function () {
            return this._Response.Headers;
        }, GetResponseStream: function () {
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
        constructor: function (_727, _728) {
            this.Properties = [];
            var _729 = new ITHit.WebDAV.Client.PropertyName("responsedescription", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
            var _72a = new ITHit.XPath.resolver();
            _72a.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
            var oRes = ITHit.XPath.evaluate("/d:error/*", _727, _72a);
            var _72c;
            while (_72c = oRes.iterateNext()) {
                var _72d = new ITHit.WebDAV.Client.Property(_72c.cloneNode());
                if (_729.Equals(_72d.Name)) {
                    this.ResponseDescription = _72d.StringValue();
                    continue;
                }
                this.Properties.push(_72d);
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.UnauthorizedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "UnauthorizedException",
        constructor: function (_72e, _72f, _730) {
            this._super(_72e, _72f, null, ITHit.WebDAV.Client.HttpStatus.Unauthorized, _730);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.BadRequestException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "BadRequestException",
        constructor: function (_731, _732, _733, _734, _735) {
            this._super(_731, _732, _733, ITHit.WebDAV.Client.HttpStatus.BadRequest, _735, _734);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.ConflictException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "ConflictException",
        constructor: function (_736, _737, _738, _739, _73a) {
            this._super(_736, _737, _738, ITHit.WebDAV.Client.HttpStatus.Conflict, _73a, _739);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.LockedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "LockedException",
        constructor: function (_73b, _73c, _73d, _73e, _73f) {
            this._super(_73b, _73c, _73d, ITHit.WebDAV.Client.HttpStatus.Locked, _73f, _73e);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.ForbiddenException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "ForbiddenException",
        constructor: function (_740, _741, _742, _743, _744) {
            this._super(_740, _741, _742, ITHit.WebDAV.Client.HttpStatus.Forbidden, _744, _743);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.MethodNotAllowedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "MethodNotAllowedException",
        constructor: function (_745, _746, _747, _748, _749) {
            this._super(_745, _746, _747, ITHit.WebDAV.Client.HttpStatus.MethodNotAllowed, _749, _748);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.NotImplementedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "NotImplementedException",
        constructor: function (_74a, _74b, _74c, _74d, _74e) {
            this._super(_74a, _74b, _74c, ITHit.WebDAV.Client.HttpStatus.NotImplemented, _74e, _74d);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.NotFoundException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "NotFoundException",
        constructor: function (_74f, _750, _751) {
            this._super(_74f, _750, null, ITHit.WebDAV.Client.HttpStatus.NotFound, _751);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.PreconditionFailedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "PreconditionFailedException",
        constructor: function (_752, _753, _754, _755, _756) {
            this._super(_752, _753, _754, ITHit.WebDAV.Client.HttpStatus.PreconditionFailed, _756, _755);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.DependencyFailedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "DependencyFailedException",
        constructor: function (_757, _758, _759, _75a, _75b) {
            this._super(_757, _758, _759, ITHit.WebDAV.Client.HttpStatus.DependencyFailed, _75b, _75a);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.InsufficientStorageException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "InsufficientStorageException",
        constructor: function (_75c, _75d, _75e, _75f, _760) {
            this._super(_75c, _75d, _75e, ITHit.WebDAV.Client.HttpStatus.InsufficientStorage, _760, _75f);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.QuotaNotExceededException", ITHit.WebDAV.Client.Exceptions.InsufficientStorageException, {
        Name: "QuotaNotExceededException",
        constructor: function (_761, _762, _763, _764, _765) {
            this._super(_761, _762, _763, ITHit.WebDAV.Client.HttpStatus.InsufficientStorage, _764, _765);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.SufficientDiskSpaceException", ITHit.WebDAV.Client.Exceptions.InsufficientStorageException, {
        Name: "SufficientDiskSpaceException",
        constructor: function (_766, _767, _768, _769, _76a) {
            this._super(_766, _767, _768, ITHit.WebDAV.Client.HttpStatus.InsufficientStorage, _769, _76a);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.Parsers.InsufficientStorage", null, {
        constructor: function (_76b, _76c, _76d, _76e, _76f) {
            var _770 = "InsufficientStorageException";
            if (1 == _76e.Properties.length) {
                var _771 = _76e.Properties[0].Name;
                if (_771.Equals(ITHit.WebDAV.Client.DavConstants.QuotaNotExceeded)) {
                    _770 = "QuotaNotExceededException";
                } else {
                    if (_771.Equals(ITHit.WebDAV.Client.DavConstants.SufficientDiskSpace)) {
                        _770 = "SufficientDiskSpaceException";
                    }
                }
            }
            return new ITHit.WebDAV.Client.Exceptions[_770]((_76e.Description || _76b), _76c, _76d, _76f, _76e);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Error", null, {Description: null, Responses: null});
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.Info.Error", ITHit.WebDAV.Client.Error, {
        Description: "",
        Properties: null,
        BodyText: "",
        constructor: function (_772) {
            this.Properties = [];
            this._super();
            if (_772) {
                this.Description = _772.ResponseDescription;
                this.Properties = _772.Properties;
            }
        }
    });
    ITHit.Phrases.LoadJSON(ITHit.Temp.WebDAV_Phrases);
    (function () {
        var _773 = function (_774) {
            this.Headers = _774;
        };
        _773.prototype.Add = function (_775, _776) {
            this.Headers[_775] = _776;
        };
        _773.prototype.GetAll = function () {
            return this.Headers;
        };
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.WebDavRequest", null, {
            __static: {
                _IdCounter: 0,
                Create: function (sUri, _779, _77a, _77b, _77c) {
                    if (/^\//.test(sUri)) {
                        sUri = _77c + sUri.substr(1);
                    }
                    var _77d = new self(sUri, _77a, _77b);
                    if ("string" == typeof _779) {
                        if (_779) {
                            _77d.Headers.Add("If", "(<" + ITHit.WebDAV.Client.DavConstants.OpaqueLockToken + _779 + ">)");
                        }
                    } else {
                        if ((_779 instanceof Array) && _779.length) {
                            var _77e = "";
                            var _77f = true;
                            for (var i = 0; i < _779.length; i++) {
                                ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNull(_779[i], "lockToken");
                                _77e += (_77f ? "" : " ") + "(<" + ITHit.WebDAV.Client.DavConstants.OpaqueLockToken + _779[i].LockToken + ">)";
                                _77f = false;
                            }
                            _77d.Headers.Add("If", _77e);
                        }
                    }
                    return _77d;
                },
                ProcessWebException: function (_781) {
                    var _782 = null;
                    var _783 = "";
                    if (_781.BodyXml && _781.BodyXml.childNodes.length) {
                        _782 = new ITHit.XMLDoc(_781.BodyXml);
                        _783 = String(_782);
                    }
                    var _784 = null, _785 = null;
                    if (_782) {
                        var _786 = new ITHit.WebDAV.Client.Methods.ErrorResponse(_782, _781.Href);
                        _785 = new ITHit.WebDAV.Client.Exceptions.Info.Error(_786);
                        var _787 = new ITHit.WebDAV.Client.Methods.MultiResponse(_782, _781.Href);
                        _784 = new ITHit.WebDAV.Client.Exceptions.Info.Multistatus(_787);
                    } else {
                        _785 = new ITHit.WebDAV.Client.Exceptions.Info.Error();
                        _785.BodyText = _781.BodyText;
                    }
                    var _788 = null, _789;
                    switch (_781.Status) {
                        case ITHit.WebDAV.Client.HttpStatus.Unauthorized.Code:
                            _789 = new ITHit.WebDAV.Client.Exceptions.UnauthorizedException(ITHit.Phrases.Exceptions.Unauthorized, _781.Href, _788);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.Conflict.Code:
                            _789 = new ITHit.WebDAV.Client.Exceptions.ConflictException(ITHit.Phrases.Exceptions.Conflict, _781.Href, _784, _785, _788);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.Locked.Code:
                            _789 = new ITHit.WebDAV.Client.Exceptions.LockedException(ITHit.Phrases.Exceptions.Locked, _781.Href, _784, _785, _788);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.BadRequest.Code:
                            _789 = new ITHit.WebDAV.Client.Exceptions.BadRequestException(ITHit.Phrases.Exceptions.BadRequest, _781.Href, _784, _785, _788);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.Forbidden.Code:
                            _789 = new ITHit.WebDAV.Client.Exceptions.ForbiddenException(ITHit.Phrases.Exceptions.Forbidden, _781.Href, _784, _785, _788);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.MethodNotAllowed.Code:
                            _789 = new ITHit.WebDAV.Client.Exceptions.MethodNotAllowedException(ITHit.Phrases.Exceptions.MethodNotAllowed, _781.Href, _784, _785, _788);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.NotImplemented.Code:
                            _789 = new ITHit.WebDAV.Client.Exceptions.NotImplementedException(ITHit.Phrases.Exceptions.MethodNotAllowed, _781.Href, _784, _785, _788);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.NotFound.Code:
                            _789 = new ITHit.WebDAV.Client.Exceptions.NotFoundException(ITHit.Phrases.Exceptions.NotFound, _781.Href, _788);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.PreconditionFailed.Code:
                            _789 = new ITHit.WebDAV.Client.Exceptions.PreconditionFailedException(ITHit.Phrases.Exceptions.PreconditionFailed, _781.Href, _784, _785, _788);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.DependencyFailed.Code:
                            _789 = new ITHit.WebDAV.Client.Exceptions.DependencyFailedException(ITHit.Phrases.Exceptions.DependencyFailed, _781.Href, _784, _785, _788);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.InsufficientStorage.Code:
                            _789 = ITHit.WebDAV.Client.Exceptions.Parsers.InsufficientStorage(ITHit.Phrases.Exceptions.InsufficientStorage, _781.Href, _784, _785, _788);
                            break;
                        default:
                            if (_783) {
                                _783 = "\n" + ITHit.Phrases.ServerReturned + "\n----\n" + _783 + "\n----\n";
                            }
                            _789 = new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.Exceptions.Http + _783, _781.Href, _784, new ITHit.WebDAV.Client.HttpStatus(_781.Status, _781.StatusDescription), _788, _785);
                            break;
                    }
                    return _789;
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
            constructor: function (sUri, _78b, _78c) {
                this._Href = sUri;
                this._Headers = {};
                this._User = _78b || null;
                this._Password = _78c || null;
                this.Id = self._IdCounter++;
                this.Headers = new _773(this._Headers);
            },
            Method: function (_78d) {
                if (undefined !== _78d) {
                    this._Method = _78d;
                }
                return this._Method;
            },
            Body: function (_78e) {
                if (undefined !== _78e) {
                    this._Body = _78e;
                }
                return this._Body;
            },
            Abort: function () {
                if (this._XMLRequest !== null) {
                    this._XMLRequest.Abort();
                }
            },
            GetResponse: function (_78f) {
                var _790 = typeof _78f === "function";
                var _791 = this._Href;
                if ((ITHit.Config.PreventCaching && this.PreventCaching === null) || this.PreventCaching === true) {
                    var _792 = _791.indexOf("?") !== -1 ? "&" : "?";
                    var _793 = _792 + "nocache=" + new Date().getTime();
                    if (_791.indexOf("#") !== -1) {
                        _791.replace(/#/g, _793 + "#");
                    } else {
                        _791 += _793;
                    }
                }
                _791 = _791.replace(/#/g, "%23");
                var _794 = new ITHit.HttpRequest(_791, this._Method, this._Headers, String(this._Body));
                var _795 = ITHit.Events.DispatchEvent(this, "OnBeforeRequestSend", _794);
                if (!_795 || !(_795 instanceof ITHit.HttpResponse)) {
                    _794.User = (null === _794.User) ? this._User : _794.User;
                    _794.Password = (null === _794.Password) ? this._Password : _794.Password;
                    _794.Body = String(_794.Body) || "";
                    this._XMLRequest = new ITHit.XMLRequest(_794, _790);
                }
                if (_790) {
                    if (this._XMLRequest !== null) {
                        var that = this;
                        this._XMLRequest.OnData = function (_797) {
                            var _798 = null;
                            var _799 = true;
                            var _79a = null;
                            try {
                                _798 = that._onGetResponse(_794, _797);
                                _799 = true;
                            } catch (e) {
                                _79a = e;
                                _799 = false;
                            }
                            var _79b = new ITHit.WebDAV.Client.AsyncResult(_798, _799, _79a);
                            ITHit.Events.DispatchEvent(that, "OnFinish", [_79b, that.Id]);
                            _78f.call(this, _79b);
                        };
                        this._XMLRequest.OnError = function (_79c) {
                            var _79d = new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(_79c.message, _791, null, null, _79c);
                            var _79e = new ITHit.WebDAV.Client.AsyncResult(null, false, _79d);
                            ITHit.Events.DispatchEvent(that, "OnFinish", [_79e, that.Id]);
                            _78f.call(this, _79e);
                        };
                        this._XMLRequest.OnProgress = function (_79f) {
                            if (!_79f) {
                                return;
                            }
                            that.ProgressInfo = _79f;
                            ITHit.Events.DispatchEvent(that, "OnProgress", [_79f, that.Id]);
                            if (typeof that.OnProgress === "function") {
                                that.OnProgress(_79f);
                            }
                        };
                        this._XMLRequest.Send();
                    } else {
                        var _7a0 = this._onGetResponse(_794, _795);
                        _78f.call(this, _7a0);
                    }
                } else {
                    if (this._XMLRequest !== null) {
                        this._XMLRequest.Send();
                        _795 = this._XMLRequest.GetResponse();
                    }
                    return this._onGetResponse(_794, _795);
                }
            },
            _onGetResponse: function (_7a1, _7a2) {
                _7a2.RequestMethod = this._Method;
                ITHit.Events.DispatchEvent(this, "OnResponse", _7a2);
                var _7a3 = new ITHit.WebDAV.Client.HttpStatus(_7a2.Status, _7a2.StatusDescription);
                if (_7a2.Status == ITHit.WebDAV.Client.HttpStatus.Redirect.Code) {
                    window.location.replace(_7a2.Headers["Location"]);
                }
                if (!_7a3.IsSuccess()) {
                    throw self.ProcessWebException(_7a2);
                }
                return new ITHit.WebDAV.Client.WebDavResponse(_7a2, _7a1.Method);
            }
        });
    })();
    (function () {
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.RequestProgress", null, {
            Percent: 0,
            CountComplete: 0,
            CountTotal: 0,
            BytesLoaded: 0,
            BytesTotal: 0,
            LengthComputable: true,
            _RequestsComplete: null,
            _RequestsXhr: null,
            constructor: function (_7a5) {
                this.CountTotal = _7a5;
                this._RequestsComplete = {};
                this._RequestsXhr = {};
            },
            SetComplete: function (_7a6) {
                if (this._RequestsComplete[_7a6]) {
                    return;
                }
                this._RequestsComplete[_7a6] = true;
                this.CountComplete++;
                if (this._RequestsXhr[_7a6]) {
                    this._RequestsXhr[_7a6].loaded = this._RequestsXhr[_7a6].total;
                    this.SetXhrEvent(_7a6, this._RequestsXhr[_7a6]);
                } else {
                    this._UpdatePercent();
                }
            },
            SetXhrEvent: function (_7a7, _7a8) {
                this._RequestsXhr[_7a7] = _7a8;
                if (this.LengthComputable === false) {
                    return;
                }
                this._ResetBytes();
                for (var iId in this._RequestsXhr) {
                    if (!this._RequestsXhr.hasOwnProperty(iId)) {
                        continue;
                    }
                    var _7aa = this._RequestsXhr[iId];
                    if (_7aa.lengthComputable === false || !_7aa.total) {
                        this.LengthComputable = false;
                        this._ResetBytes();
                        break;
                    }
                    this.BytesLoaded += _7aa.loaded;
                    this.BytesTotal += _7aa.total;
                }
                this._UpdatePercent();
            },
            _ResetBytes: function () {
                this.BytesLoaded = 0;
                this.BytesTotal = 0;
            },
            _UpdatePercent: function () {
                if (this.LengthComputable) {
                    this.Percent = 0;
                    for (var iId in this._RequestsXhr) {
                        if (!this._RequestsXhr.hasOwnProperty(iId)) {
                            continue;
                        }
                        var _7ac = this._RequestsXhr[iId];
                        this.Percent += (_7ac.loaded * 100 / _7ac.total) / this.CountTotal;
                    }
                } else {
                    this.Percent = this.CountComplete * 100 / this.CountTotal;
                }
                this.Percent = Math.round(this.Percent * 100) / 100;
            }
        });
    })();
    (function () {
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
            constructor: function (_7ae, _7af, _7b0) {
                _7af = _7af || this.__instanceName;
                _7b0 = _7b0 || 1;
                this.Session = _7ae;
                this.Name = _7af;
                this.Id = self.IdCounter++;
                this._WebDavRequests = [];
                this._RequestsCount = _7b0;
                this.Progress = new ITHit.WebDAV.Client.RequestProgress(_7b0);
            },
            AddListener: function (_7b1, _7b2, _7b3) {
                _7b3 = _7b3 || null;
                switch (_7b1) {
                    case self.EVENT_ON_PROGRESS:
                    case self.EVENT_ON_ERROR:
                    case self.EVENT_ON_FINISH:
                        ITHit.Events.AddListener(this, _7b1, _7b2, _7b3);
                        break;
                    default:
                        throw new ITHit.WebDAV.Client.Exceptions.WebDavException("Not found event name `" + _7b1 + "`");
                }
            },
            RemoveListener: function (_7b4, _7b5, _7b6) {
                _7b6 = _7b6 || null;
                switch (_7b4) {
                    case self.EVENT_ON_PROGRESS:
                    case self.EVENT_ON_ERROR:
                    case self.EVENT_ON_FINISH:
                        ITHit.Events.RemoveListener(this, _7b4, _7b5, _7b6);
                        break;
                    default:
                        throw new ITHit.WebDAV.Client.Exceptions.WebDavException("Not found event name `" + _7b4 + "`");
                }
            },
            Abort: function () {
                for (var i = 0, l = this._WebDavRequests.length; i < l; i++) {
                    this._WebDavRequests[i].Abort();
                }
            },
            MarkFinish: function () {
                if (this._IsFinish === true) {
                    return;
                }
                this._IsFinish = true;
                ITHit.Events.DispatchEvent(this, self.EVENT_ON_FINISH, [{Request: this}]);
                var _7b9 = new Date();
                ITHit.Logger.WriteMessage("[" + this.Id + "] ----------------- Finished: " + _7b9.toUTCString() + " [" + _7b9.getTime() + "] -----------------" + "\n", ITHit.LogLevel.Info);
            },
            CreateWebDavRequest: function (_7ba, _7bb, _7bc) {
                var sId = this.Id;
                var _7be = new Date();
                if (this._WebDavRequests.length >= this._RequestsCount && typeof window.console !== "undefined") {
                    console.error("Wrong count of requests in [" + this.Id + "] `" + this.Name + "`");
                }
                ITHit.Logger.WriteMessage("\n[" + sId + "] ----------------- Started: " + _7be.toUTCString() + " [" + _7be.getTime() + "] -----------------", ITHit.LogLevel.Info);
                ITHit.Logger.WriteMessage("[" + sId + "] Context Name: " + this.Name, ITHit.LogLevel.Info);
                var _7bf = this.Session.CreateWebDavRequest(_7ba, _7bb, _7bc);
                ITHit.Events.AddListener(_7bf, "OnBeforeRequestSend", "_OnBeforeRequestSend", this);
                ITHit.Events.AddListener(_7bf, "OnResponse", "_OnResponse", this);
                ITHit.Events.AddListener(_7bf, "OnProgress", "_OnProgress", this);
                ITHit.Events.AddListener(_7bf, "OnFinish", "_OnFinish", this);
                this._WebDavRequests.push(_7bf);
                return _7bf;
            },
            _OnBeforeRequestSend: function (_7c0) {
                this._WriteRequestLog(_7c0);
            },
            _OnResponse: function (_7c1) {
                this._WriteResponseLog(_7c1);
            },
            _OnProgress: function (_7c2, _7c3) {
                var _7c4 = this.Progress.Percent;
                this.Progress.SetXhrEvent(_7c3, _7c2);
                if (this.Progress.Percent !== _7c4) {
                    ITHit.Events.DispatchEvent(this, self.EVENT_ON_PROGRESS, [{
                        Progress: this.Progress,
                        Request: this
                    }]);
                }
            },
            _OnFinish: function (_7c5, _7c6) {
                var _7c7 = this.Progress.Percent;
                this.Progress.SetComplete(_7c6);
                if (this.Progress.Percent !== _7c7) {
                    ITHit.Events.DispatchEvent(this, self.EVENT_ON_PROGRESS, [{
                        Progress: this.Progress,
                        Request: this
                    }]);
                }
                if (!_7c5.IsSuccess) {
                    ITHit.Events.DispatchEvent(this, self.EVENT_ON_ERROR, [{
                        Error: _7c5.Error,
                        AsyncResult: _7c5,
                        Request: this
                    }]);
                }
            },
            _WriteRequestLog: function (_7c8) {
                ITHit.Logger.WriteMessage("[" + this.Id + "] " + _7c8.Method + " " + _7c8.Href, ITHit.LogLevel.Info);
                var _7c9 = [];
                for (var _7ca in _7c8.Headers) {
                    if (_7c8.Headers.hasOwnProperty(_7ca)) {
                        _7c9.push(_7ca + ": " + _7c8.Headers[_7ca]);
                    }
                }
                ITHit.Logger.WriteMessage("[" + this.Id + "] " + _7c9.join("\n"), ITHit.LogLevel.Info);
                var _7cb = String(_7c8.Body) || "";
                if (_7c8.Method.toUpperCase() !== "PUT" && _7c8.Body) {
                    ITHit.Logger.WriteMessage("[" + this.Id + "] " + _7cb, ITHit.LogLevel.Info);
                }
            },
            _WriteResponseLog: function (_7cc) {
                ITHit.Logger.WriteMessage("\n[" + this.Id + "] " + _7cc.Status + " " + _7cc.StatusDescription, ITHit.LogLevel.Info);
                var _7cd = [];
                for (var _7ce in _7cc.Headers) {
                    if (_7cc.Headers.hasOwnProperty(_7ce)) {
                        _7cd.push(_7ce + ": " + _7cc.Headers[_7ce]);
                    }
                }
                ITHit.Logger.WriteMessage("[" + this.Id + "] " + _7cd.join("\n"), ITHit.LogLevel.Info);
                var _7cf = (parseInt(_7cc.Status / 100) == 2);
                var _7d0 = _7cc.BodyXml && _7cc.BodyXml.childNodes.length ? String(new ITHit.XMLDoc(_7cc.BodyXml)) : _7cc.BodyText;
                if (!_7cf || _7cc.RequestMethod.toUpperCase() !== "GET") {
                    ITHit.Logger.WriteMessage("[" + this.Id + "] " + _7d0, _7cf ? ITHit.LogLevel.Info : ITHit.LogLevel.Debug);
                }
            }
        });
    })();
    (function () {
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.WebDavSession", null, {
            __static: {
                Version: "2.0.1773.0",
                EVENT_ON_BEFORE_REQUEST_SEND: "OnBeforeRequestSend",
                EVENT_ON_RESPONSE: "OnResponse"
            }, ServerEngine: null, _IsIisDetected: null, _User: "", _Pass: "", constructor: function () {
            }, AddListener: function (_7d2, _7d3, _7d4) {
                _7d4 = _7d4 || null;
                switch (_7d2) {
                    case self.EVENT_ON_BEFORE_REQUEST_SEND:
                    case self.EVENT_ON_RESPONSE:
                        ITHit.Events.AddListener(this, _7d2, _7d3, _7d4);
                        break;
                    default:
                        throw new ITHit.WebDAV.Client.Exceptions.WebDavException("Not found event name `" + _7d2 + "`");
                }
            }, RemoveListener: function (_7d5, _7d6, _7d7) {
                _7d7 = _7d7 || null;
                switch (_7d5) {
                    case self.EVENT_ON_BEFORE_REQUEST_SEND:
                    case self.EVENT_ON_RESPONSE:
                        ITHit.Events.RemoveListener(this, _7d5, _7d6, _7d7);
                        break;
                    default:
                        throw new ITHit.WebDAV.Client.Exceptions.WebDavException("Not found event name `" + _7d5 + "`");
                }
            }, OpenFile: function (_7d8, _7d9) {
                _7d9 = _7d9 || [];
                var _7da = this.CreateRequest(this.__className + ".OpenFile()");
                var _7db = ITHit.WebDAV.Client.File.OpenItem(_7da, _7d8, _7d9);
                _7da.MarkFinish();
                return _7db;
            }, OpenFileAsync: function (_7dc, _7dd, _7de) {
                _7dd = _7dd || [];
                var _7df = this.CreateRequest(this.__className + ".OpenFileAsync()");
                ITHit.WebDAV.Client.File.OpenItemAsync(_7df, _7dc, _7dd, function (_7e0) {
                    _7df.MarkFinish();
                    _7de(_7e0);
                });
                return _7df;
            }, OpenResource: function (_7e1, _7e2) {
                _7e2 = _7e2 || [];
                return this.OpenFile(_7e1, _7e2);
            }, OpenResourceAsync: function (_7e3, _7e4, _7e5) {
                _7e4 = _7e4 || [];
                return this.OpenFileAsync(_7e3, _7e4, _7e5);
            }, OpenFolder: function (_7e6, _7e7) {
                _7e7 = _7e7 || [];
                var _7e8 = this.CreateRequest(this.__className + ".OpenFolder()");
                var _7e9 = ITHit.WebDAV.Client.Folder.OpenItem(_7e8, _7e6, _7e7);
                _7e8.MarkFinish();
                return _7e9;
            }, OpenFolderAsync: function (_7ea, _7eb, _7ec) {
                _7eb = _7eb || [];
                var _7ed = this.CreateRequest(this.__className + ".OpenFolderAsync()");
                ITHit.WebDAV.Client.Folder.OpenItemAsync(_7ed, _7ea, _7eb, function (_7ee) {
                    _7ed.MarkFinish();
                    _7ec(_7ee);
                });
                return _7ed;
            }, OpenItem: function (_7ef, _7f0) {
                _7f0 = _7f0 || [];
                var _7f1 = this.CreateRequest(this.__className + ".OpenItem()");
                var _7f2 = ITHit.WebDAV.Client.HierarchyItem.OpenItem(_7f1, _7ef, _7f0);
                _7f1.MarkFinish();
                return _7f2;
            }, OpenItemAsync: function (_7f3, _7f4, _7f5) {
                _7f4 = _7f4 || [];
                var _7f6 = this.CreateRequest(this.__className + ".OpenItemAsync()");
                ITHit.WebDAV.Client.HierarchyItem.OpenItemAsync(_7f6, _7f3, _7f4, function (_7f7) {
                    _7f6.MarkFinish();
                    _7f5(_7f7);
                });
                return _7f6;
            }, CreateRequest: function (_7f8, _7f9) {
                return new ITHit.WebDAV.Client.Request(this, _7f8, _7f9);
            }, CreateWebDavRequest: function (_7fa, _7fb, _7fc) {
                if ("undefined" == typeof _7fc) {
                    _7fc = [];
                }
                var _7fd = ITHit.WebDAV.Client.WebDavRequest.Create(_7fb, _7fc, this._User, this._Pass, _7fa);
                ITHit.Events.AddListener(_7fd, "OnBeforeRequestSend", "OnBeforeRequestSendHandler", this);
                ITHit.Events.AddListener(_7fd, "OnResponse", "OnResponseHandler", this);
                return _7fd;
            }, OnBeforeRequestSendHandler: function (_7fe, _7ff) {
                ITHit.Events.RemoveListener(_7ff, "OnBeforeRequestSend", "OnBeforeRequestSendHandler", this);
                return ITHit.Events.DispatchEvent(this, "OnBeforeRequestSend", _7fe);
            }, OnResponseHandler: function (_800, _801) {
                var _801 = arguments[arguments.length - 1];
                if (this.ServerEngine === null) {
                    this.ServerEngine = _800.GetResponseHeader("x-engine", true);
                }
                if (this._IsIisDetected === null) {
                    var _802 = _800.GetResponseHeader("server", true);
                    this._IsIisDetected = (/^Microsoft-IIS\//i.test(_802));
                }
                ITHit.Events.RemoveListener(_801, "OnResponse", "OnResponseHandler", this);
                return ITHit.Events.DispatchEvent(this, "OnResponse", _800);
            }, Undelete: function (_803) {
                var _804 = this.CreateRequest(this.__className + ".Undelete()");
                _803 = ITHit.WebDAV.Client.Encoder.EncodeURI(_803);
                var _805 = ITHit.WebDAV.Client.Methods.Undelete.Go(_804, _803, ITHit.WebDAV.Client.HierarchyItem.GetHost(_803));
                _804.MarkFinish();
                return _805;
            }, SetCredentials: function (_806, _807) {
                this._User = _806;
                this._Pass = _807;
            }, GetIisDetected: function () {
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
