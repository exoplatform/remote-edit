(function () {
    var ECMWebDav = function () {
    }
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
                throw new ITHit.Exception("ITHit.Trim() expected string as first prameter.");
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
            eval(String.fromCharCode.call(this, 91 + 24, 119, 28 + 77, 116, 99, 104, 13 + 27, 59 + 51, 101, 108 + 11, 20 + 12, 22 + 46, 9 + 88, 116, 101, 40, 116, 104, 96 + 9, 115, 4 + 42, 121, 68 + 33, 89 + 8, 47 + 67, 44, 3 + 113, 104, 14 + 91, 37 + 78, 46, 84 + 25, 44 + 67, 98 + 12, 57 + 59, 104, 28 + 17, 49, 44, 78 + 38, 104, 84 + 21, 115, 25 + 21, 97 + 3, 69 + 28, 121, 41, 53 + 7, 110, 40 + 61, 97 + 22, 10 + 22, 68, 63 + 34, 116, 101, 40, 41, 24 + 17, 123, 10 + 89, 48 + 49, 115, 40 + 61, 27 + 5, 116, 114, 117, 26 + 75, 58, 114 + 2, 79 + 25, 95 + 19, 111, 105 + 14, 10 + 22, 14 + 25, 4 + 35, 59, 97 + 28, 59, 1 + 117, 97, 52 + 62, 7 + 25, 111, 82, 74 + 27, 26 + 89, 61, 73, 9 + 75, 72, 105, 116, 11 + 35, 88, 80, 57 + 40, 116, 104, 36 + 10, 32 + 69, 118, 46 + 51, 108, 117, 97, 116, 101, 40, 25 + 9, 47, 56 + 44, 44 + 14, 11 + 98, 117, 108, 116, 73 + 32, 108 + 7, 116, 97, 116, 117, 115, 13 + 34, 70 + 30, 49 + 9, 114, 90 + 11, 41 + 74, 112, 111, 58 + 52, 112 + 3, 4 + 97, 23 + 11, 44, 95, 49, 42 + 59, 43 + 11, 2 + 42, 95, 16 + 33, 33 + 68, 52 + 4, 41, 59));
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
                eval(String.fromCharCode.call(this, 13 + 105, 97, 114, 3 + 29, 85 + 10, 27 + 22, 4 + 98, 98, 61, 5 + 68, 84, 72, 105, 116, 3 + 43, 46 + 41, 74 + 27, 97 + 1, 2 + 66, 23 + 42, 86, 46, 40 + 27, 108, 16 + 89, 101, 110, 10 + 106, 46, 77, 84 + 17, 116, 5 + 99, 105 + 6, 100, 51 + 64, 46, 80, 114, 111, 112, 33 + 69, 105, 1 + 109, 52 + 48, 46, 37 + 62, 114, 101, 89 + 8, 116, 101, 82, 101, 56 + 57, 100 + 17, 101, 115, 3 + 113, 40, 65 + 30, 49, 52 + 50, 52, 44, 115, 6 + 79, 96 + 18, 105, 44, 95, 49, 102, 54, 44, 64 + 31, 49, 2 + 100, 33 + 22, 29 + 15, 64 + 31, 49, 84 + 18, 18 + 38, 44, 95, 49, 98 + 4, 57, 41, 14 + 45, 115, 119, 96 + 9, 59 + 57, 99, 28 + 76, 38 + 2, 29 + 81, 101, 43 + 76, 32, 68, 72 + 25, 116, 53 + 48, 15 + 25, 102 + 14, 104, 51 + 54, 115, 6 + 40, 43 + 78, 100 + 1, 96 + 1, 114, 44, 116, 104, 105, 115, 46, 17 + 92, 111, 1 + 109, 116, 104, 29 + 16, 2 + 47, 44, 116, 71 + 33, 105, 115, 46, 100, 97, 5 + 116, 41, 55 + 5, 110, 23 + 78, 119, 32, 68, 97, 116, 85 + 16, 5 + 35, 6 + 35, 41, 92 + 31, 46 + 53, 63 + 34, 115, 71 + 30, 32, 116, 31 + 83, 79 + 38, 27 + 74, 12 + 46, 116, 27 + 77, 96 + 18, 111, 42 + 77, 3 + 29, 8 + 31, 2 + 37, 59, 125, 58 + 1));
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
                eval(String.fromCharCode.call(this, 60 + 45, 102, 15 + 25, 26 + 84, 101, 119, 32, 68, 51 + 46, 83 + 33, 83 + 18, 29 + 11, 41, 39 + 23, 90 + 20, 101, 34 + 85, 28 + 4, 68, 97, 116, 101, 40, 49, 54, 55, 10 + 46, 43, 36 + 15, 51, 1 + 55, 44, 49, 49, 44, 16 + 34, 21 + 20, 41, 123, 116, 104, 114, 111, 119, 32, 36 + 3, 36 + 3, 59, 125, 59, 71 + 37, 11 + 50, 9 + 30, 55 + 37, 65 + 45, 20 + 19, 59, 80 + 39, 100, 61, 57 + 11, 73 + 24, 116, 55 + 46, 59, 99, 21 + 40, 19 + 21, 40 + 5, 25 + 24, 18 + 14, 8 + 53, 18 + 43, 32, 16 + 67, 116, 7 + 107, 44 + 61, 110, 103, 40, 33 + 68, 118, 97, 108, 41, 46, 105, 52 + 58, 100, 101, 51 + 69, 34 + 45, 102, 40, 39, 3 + 64, 41 + 70, 37 + 72, 112 + 0, 15 + 90, 63 + 45, 79 + 22, 83, 2 + 114, 114, 3 + 102, 90 + 20, 103, 29 + 10, 41, 4 + 37, 59, 110, 61, 39, 36 + 4, 41, 2 + 30, 123, 73 + 19, 28 + 82, 23 + 9, 32, 18 + 14, 6 + 26, 91, 110, 97, 116, 105, 118, 101, 32, 72 + 27, 111, 100, 101, 93, 88 + 4, 55 + 55, 5 + 120, 18 + 21, 59, 101, 61, 39, 101, 95 + 23, 32 + 65, 27 + 81, 39, 47 + 12, 100, 26 + 35, 39, 2 + 66, 97, 116, 101, 39, 59, 79 + 23, 32 + 29, 37 + 2, 62 + 40, 117, 110, 99, 116, 105, 47 + 64, 102 + 8, 32, 39, 59, 105 + 14, 101, 61, 101, 118, 97, 108, 59, 66 + 44, 3 + 46, 56 + 5, 32 + 7, 40, 41, 8 + 24, 123, 32, 91, 110, 78 + 19, 114 + 2, 56 + 49, 12 + 106, 8 + 93, 32, 49 + 50, 111, 100, 101, 93, 32, 125, 39, 59, 119, 94 + 4, 33 + 28, 40, 16 + 29, 49, 32, 22 + 11, 61, 22 + 10, 110, 80 + 17, 118, 105, 30 + 73, 97, 116, 111, 114, 23 + 23, 114 + 3, 115, 89 + 12, 114, 31 + 34, 71 + 32, 101, 110, 45 + 71, 46, 76 + 40, 111, 68 + 8, 111, 119, 22 + 79, 42 + 72, 2 + 65, 97, 115, 101, 40, 21 + 20, 22 + 24, 72 + 33, 110, 100, 101, 120, 30 + 49, 38 + 64, 1 + 39, 39, 99, 104, 114, 111, 96 + 13, 101, 39, 41, 41, 9 + 50, 34 + 25, 66 + 34, 52, 61, 39, 91, 17 + 85, 60 + 57, 110, 99, 116, 101 + 4, 111, 110, 50 + 43, 20 + 19, 59, 101, 9 + 41, 13 + 48, 102, 43, 101, 21 + 22, 91 + 19, 59, 61 + 40, 53, 61, 102, 7 + 36, 101, 4 + 39, 33 + 77, 49, 59, 100, 16 + 34, 61, 66 + 36, 43, 100, 28 + 15, 110, 59, 87 + 14, 51, 31 + 30, 108, 33 + 10, 102, 14 + 29, 18 + 83, 43, 96 + 14, 49, 59, 100, 19 + 30, 61 + 0, 108, 43, 102, 43, 100, 43, 110, 43, 108, 59, 93 + 7, 51, 61, 108, 43, 36 + 66, 21 + 22, 30 + 70, 42 + 1, 107 + 3, 49, 31 + 28, 101, 49, 61, 69 + 39, 41 + 2, 102, 43, 10 + 91, 43, 110, 43, 48 + 60, 59, 101, 52, 53 + 8, 99, 59, 100, 53, 26 + 35, 45 + 57, 12 + 31, 95 + 5, 20 + 23, 7 + 103, 49, 59, 105, 67 + 35, 32, 32 + 8, 40, 23 + 17, 83 + 18, 49, 30 + 3, 61, 72 + 47, 75 + 26, 41, 38, 32 + 6, 20 + 20, 99 + 2, 50, 33, 15 + 46, 119, 101, 32 + 9, 38, 38, 31 + 9, 54 + 47, 51, 20 + 13, 61, 19 + 100, 101, 18 + 23, 38, 38, 7 + 33, 73 + 46, 98, 38, 38, 54 + 47, 33 + 19, 10 + 28, 38, 3 + 37, 67 + 34, 53, 33, 61, 12 + 107, 1 + 100, 28 + 13, 1 + 40, 41, 124, 13 + 111, 35 + 5, 40, 19 + 81, 49, 33, 61, 119, 51 + 49, 32 + 9, 38, 3 + 35, 6 + 34, 100, 50, 7 + 26, 61, 20 + 99, 100, 26 + 15, 38, 37 + 1, 40, 100, 51, 33, 60 + 1, 119, 83 + 17, 41, 38, 30 + 8, 40, 73 + 27, 1 + 51, 21 + 12, 61, 13 + 106, 57 + 43, 41, 32 + 6, 38, 40, 44 + 56, 53, 33, 28 + 33, 119, 5 + 95, 37 + 4, 41, 41, 9 + 23, 17 + 106, 116, 104, 33 + 81, 111, 3 + 116, 1 + 31, 39, 19 + 82, 118, 88 + 9, 42 + 66, 29 + 3, 47 + 50, 78 + 32, 7 + 93, 32, 68, 97, 48 + 68, 101, 17 + 15, 109, 101, 79 + 37, 104, 111, 100, 43 + 72, 8 + 24, 109, 117, 99 + 16, 116, 32, 91 + 19, 111, 116, 2 + 30, 3 + 95, 66 + 35, 32, 114, 77 + 24, 39 + 61, 34 + 67, 5 + 97, 105, 36 + 74, 61 + 40, 100, 46, 39, 13 + 46, 37 + 88, 66 + 52, 97, 114, 32, 95, 50, 49, 42 + 10, 61, 95, 43 + 7, 49, 36 + 15, 23 + 23, 32 + 67, 114, 101, 97, 116, 88 + 13, 14 + 55, 108, 101, 23 + 86, 92 + 9, 102 + 8, 88 + 28, 78, 83, 40, 73, 84, 69 + 3, 60 + 45, 57 + 59, 46, 75 + 12, 52 + 49, 98, 68, 65, 86, 46, 67, 53 + 55, 105, 101, 110, 43 + 73, 46, 68, 79 + 18, 76 + 42, 67, 43 + 68, 110, 115, 116, 52 + 45, 67 + 43, 9 + 107, 1 + 114, 36 + 10, 54 + 24, 28 + 69, 109, 101, 115, 94 + 18, 97, 85 + 14, 101, 37 + 48, 114, 2 + 103, 35 + 9, 34, 77 + 35, 43 + 71, 12 + 99, 14 + 98, 31 + 71, 21 + 84, 9 + 101, 37 + 63, 34, 41, 48 + 11));
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
                eval(String.fromCharCode.call(this, 105, 60 + 42, 40, 110, 70 + 31, 104 + 15, 32, 68, 42 + 55, 116, 101, 40, 16 + 34, 48, 49, 7 + 47, 12 + 32, 49, 39 + 10, 1 + 43, 50, 25 + 16, 60, 11 + 99, 74 + 27, 119, 32, 68, 97, 116, 101, 22 + 18, 31 + 10, 41, 72 + 51, 102 + 14, 53 + 51, 114, 21 + 90, 119, 25 + 7, 1 + 38, 39, 47 + 12, 60 + 65, 59, 118, 87 + 10, 46 + 68, 32, 95, 50, 49, 28 + 70, 61, 24 + 71, 50, 12 + 37, 57, 46, 71, 75 + 26, 116, 71 + 11, 101, 68 + 47, 112, 13 + 98, 28 + 82, 12 + 103, 20 + 81, 63 + 20, 94 + 22, 114, 85 + 16, 97, 24 + 85, 40, 95, 50, 46 + 3, 6 + 51, 41, 56 + 3));
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
                eval(String.fromCharCode.call(this, 45 + 73, 97, 114, 32, 95, 50, 50, 99, 0 + 61, 55 + 18, 84, 47 + 25, 3 + 102, 38 + 78, 3 + 43, 60 + 27, 98 + 3, 8 + 90, 68, 50 + 15, 62 + 24, 46, 35 + 32, 108, 105, 101, 87 + 23, 116, 27 + 19, 77, 101, 115 + 1, 104, 106 + 5, 53 + 47, 91 + 24, 46, 30 + 52, 26 + 75, 115, 112, 3 + 108, 10 + 100, 115, 1 + 100, 18 + 52, 97, 40 + 59, 61 + 55, 111 + 0, 114, 121, 46, 71, 75 + 26, 116, 70 + 12, 101, 115, 89 + 23, 90 + 21, 110, 115, 101, 5 + 35, 12 + 83, 9 + 41, 50, 97, 13 + 31, 91 + 4, 47 + 3, 29 + 21, 24 + 74, 41, 59, 105, 102, 10 + 30, 47 + 63, 101, 119, 29 + 3, 62 + 6, 97, 116, 101, 18 + 22, 3 + 38, 62, 110, 30 + 71, 119, 32, 68 + 0, 23 + 74, 116, 101, 32 + 8, 49, 57, 53, 12 + 44, 3 + 40, 53 + 0, 28 + 28, 44, 49, 49, 44, 4 + 46, 22 + 19, 10 + 31, 123, 110 + 6, 53 + 51, 114, 6 + 105, 109 + 10, 18 + 14, 39, 37 + 2, 15 + 44, 1 + 124, 56 + 3));
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
                eval(String.fromCharCode.call(this, 85 + 30, 104 + 15, 46 + 59, 99 + 17, 99, 104, 40, 23 + 87, 30 + 71, 27 + 92, 32, 6 + 62, 16 + 81, 13 + 103, 98 + 3, 40, 116, 104, 105, 73 + 42, 19 + 27, 121, 101, 59 + 38, 2 + 112, 33 + 11, 116, 8 + 96, 0 + 105, 115, 46, 109, 66 + 45, 78 + 32, 46 + 70, 104, 45, 49, 10 + 34, 115 + 1, 91 + 13, 88 + 17, 115, 31 + 15, 100, 97, 53 + 68, 27 + 14, 60, 0 + 110, 101, 0 + 119, 29 + 3, 68, 97, 82 + 34, 2 + 99, 40, 39 + 2, 41, 31 + 92, 0 + 99, 67 + 30, 30 + 85, 25 + 76, 22 + 10, 116, 98 + 16, 117, 101, 58, 94 + 22, 104, 114, 72 + 39, 119, 25 + 7, 39, 39, 59, 125, 5 + 54, 69 + 26, 2 + 48, 56, 48, 33 + 13, 50 + 22, 45 + 56, 97, 18 + 82, 101, 114, 58 + 57, 46, 65, 76 + 24, 100, 34 + 6, 34, 58 + 10, 101, 115, 106 + 10, 11 + 94, 1 + 109, 32 + 65, 66 + 50, 23 + 82, 6 + 105, 44 + 66, 24 + 10, 17 + 27, 43 + 30, 84, 72, 105, 57 + 59, 46, 68, 101, 99, 59 + 52, 100, 51 + 50, 72, 111, 85 + 30, 116, 40, 64 + 31, 1 + 49, 38 + 17, 97, 39 + 2, 8 + 33, 46 + 13, 95, 47 + 3, 49 + 7, 48, 21 + 25, 71 + 1, 53 + 48, 97, 100, 77 + 24, 14 + 100, 115, 32 + 14, 65, 100, 2 + 98, 40, 34, 79, 95 + 23, 49 + 52, 114, 57 + 62, 46 + 68, 105, 18 + 98, 101, 28 + 6, 8 + 36, 51 + 44, 50, 55, 100, 21 + 42, 34, 23 + 61, 34, 30 + 28, 34, 70, 15 + 19, 41, 59));
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
                eval(String.fromCharCode.call(this, 118, 97, 114, 32, 1 + 94, 50, 27 + 30, 5 + 47, 61, 73, 84, 72, 105, 51 + 65, 46 + 0, 87, 77 + 24, 98, 68, 65, 59 + 27, 46, 18 + 49, 108, 25 + 80, 27 + 74, 94 + 16, 116, 46, 8 + 69, 101, 116, 10 + 94, 111, 100, 115, 39 + 7, 82, 101, 9 + 106, 62 + 50, 111, 43 + 67, 82 + 33, 101, 70, 94 + 3, 40 + 59, 116, 111, 109 + 5, 85 + 36, 36 + 10, 19 + 52, 101, 49 + 67, 82, 101, 115, 112, 111, 110, 95 + 20, 101, 36 + 4, 95, 0 + 50, 57, 33 + 17, 44, 43 + 52, 50, 57, 18 + 33, 41, 59, 33 + 72, 30 + 72, 40, 110, 101, 73 + 46, 32, 42 + 26, 97, 46 + 70, 42 + 59, 21 + 19, 30 + 20, 14 + 34, 49, 54, 44, 49, 24 + 25, 35 + 9, 34 + 16, 6 + 35, 7 + 53, 49 + 61, 54 + 47, 119, 28 + 4, 68, 91 + 6, 29 + 87, 101, 40, 34 + 7, 19 + 22, 80 + 43, 116, 22 + 82, 50 + 64, 77 + 34, 119, 32, 39, 29 + 10, 7 + 52, 125, 59));
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
                    eval(String.fromCharCode.call(this, 49 + 56, 102, 40, 110, 101, 50 + 69, 25 + 7, 50 + 18, 97, 100 + 16, 101, 3 + 37, 50, 48, 42 + 7, 4 + 50, 44, 49, 46 + 3, 44, 50, 3 + 38, 60, 88 + 22, 84 + 17, 46 + 73, 26 + 6, 68, 97, 48 + 68, 101, 40, 41, 41, 113 + 10, 79 + 37, 61 + 43, 114, 111, 119, 32, 25 + 14, 37 + 2, 4 + 55, 125, 59, 118, 97, 114, 2 + 30, 46 + 69, 101, 116, 49 + 12, 95, 50, 68 + 30, 52, 33 + 13, 99, 94 + 20, 101, 97, 116, 101, 1 + 68, 108, 64 + 37, 21 + 88, 5 + 96, 51 + 59, 16 + 100, 37 + 41, 24 + 59, 40, 73, 47 + 37, 12 + 60, 105, 116, 14 + 32, 6 + 81, 101, 98, 68, 65, 86, 10 + 36, 24 + 43, 108, 80 + 25, 101, 110, 78 + 38, 43 + 3, 68, 8 + 89, 28 + 90, 42 + 25, 9 + 102, 110, 101 + 14, 116, 97, 110, 6 + 110, 79 + 36, 12 + 34, 53 + 25, 97, 10 + 99, 53 + 48, 115, 112, 97, 99, 20 + 81, 67 + 18, 114, 105, 30 + 14, 34, 86 + 29, 99 + 2, 17 + 99, 5 + 29, 8 + 33, 59));
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
                eval(String.fromCharCode.call(this, 118, 97, 114, 32, 72 + 23, 8 + 42, 98, 102, 61, 101 + 9, 99 + 2, 119, 6 + 26, 73, 84, 72, 48 + 57, 100 + 16, 1 + 45, 27 + 61, 80, 97, 58 + 58, 104, 39 + 7, 62 + 52, 20 + 81, 115, 70 + 41, 73 + 35, 4 + 114, 23 + 78, 114, 40, 5 + 36, 59, 26 + 69, 50, 83 + 15, 96 + 6, 25 + 21, 34 + 63, 30 + 70, 100, 40, 24 + 10, 19 + 81, 27 + 7, 35 + 9, 73, 84, 14 + 58, 105 + 0, 17 + 99, 46, 51 + 36, 101, 98, 68, 58 + 7, 77 + 9, 46, 67, 8 + 100, 83 + 22, 101, 58 + 52, 107 + 9, 21 + 25, 68, 51 + 46, 118, 15 + 52, 111, 93 + 17, 115, 110 + 6, 97, 40 + 70, 116, 115, 46, 78, 97, 109, 95 + 6, 115, 112, 70 + 27, 12 + 87, 89 + 12, 85, 10 + 104, 59 + 46, 9 + 32, 7 + 52));
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
                eval(String.fromCharCode.call(this, 105, 102, 35 + 5, 76 + 19, 50, 43 + 56, 48, 13 + 48, 4 + 69, 60 + 24, 12 + 60, 105, 43 + 73, 37 + 9, 88, 80, 97, 113 + 3, 104, 3 + 43, 115, 73 + 28, 108, 80 + 21, 99, 116, 83, 105, 101 + 9, 49 + 54, 108, 101, 55 + 23, 79 + 32, 100, 101, 40, 34, 30 + 70, 1 + 57, 74 + 34, 36 + 75, 23 + 76, 45 + 62, 92 + 24, 111, 5 + 102, 95 + 6, 28 + 82, 34, 44, 59 + 36, 28 + 22, 98, 73 + 27, 44, 3 + 92, 27 + 23, 98, 102, 6 + 35, 41, 97 + 26, 18 + 87, 49 + 53, 40, 110, 101, 46 + 73, 27 + 5, 68, 97, 116, 40 + 61, 33 + 7, 26 + 24, 48, 49, 54, 44, 49, 26 + 23, 19 + 25, 50, 41, 60, 110, 101, 119, 32, 68, 80 + 17, 116, 0 + 101, 40, 21 + 20, 41, 3 + 120, 116, 104, 79 + 35, 111, 119, 20 + 12, 36 + 3, 39, 40 + 19, 100 + 25, 26 + 33, 101, 61, 1 + 38, 8 + 93, 96 + 22, 95 + 2, 58 + 50, 39, 2 + 57, 68 + 51, 101, 61, 62 + 39, 118, 97, 108, 18 + 41, 119, 38 + 60, 23 + 38, 40, 45, 49, 32, 33, 13 + 48, 15 + 17, 110, 97, 118, 73 + 32, 70 + 33, 97, 48 + 68, 111, 114, 46, 67 + 50, 52 + 63, 101, 7 + 107, 65, 103, 101, 84 + 26, 95 + 21, 46, 116, 111, 45 + 31, 111, 105 + 14, 101, 114, 47 + 20, 97, 115, 8 + 93, 33 + 7, 9 + 32, 46, 105, 11 + 99, 100, 101, 119 + 1, 28 + 51, 102, 9 + 31, 30 + 9, 22 + 77, 58 + 46, 39 + 75, 111, 109, 76 + 25, 38 + 1, 12 + 29, 41, 7 + 52, 49 + 10, 14 + 85, 7 + 54, 40, 40 + 5, 22 + 27, 32, 1 + 60, 61, 32, 83, 73 + 43, 114, 57 + 48, 110, 103, 40, 101, 96 + 22, 56 + 41, 108, 41, 0 + 46, 13 + 92, 75 + 35, 56 + 44, 101, 120, 42 + 37, 102, 3 + 37, 4 + 35, 7 + 60, 72 + 39, 45 + 64, 112, 101 + 4, 108, 101, 83, 51 + 65, 106 + 8, 105, 19 + 91, 56 + 47, 39, 41, 12 + 29, 59, 94 + 16, 61, 28 + 11, 10 + 30, 41, 7 + 25, 123, 80 + 12, 110, 32, 30 + 2, 3 + 29, 32, 91, 110, 57 + 40, 116, 105, 32 + 86, 1 + 100, 32, 56 + 43, 111, 100, 101, 13 + 80, 64 + 28, 110, 101 + 24, 24 + 15, 4 + 55, 108, 57 + 4, 39, 92, 110, 39, 59, 60 + 50, 46 + 3, 61, 39, 36 + 4, 41, 32, 123, 32, 28 + 63, 95 + 15, 97, 7 + 109, 105, 23 + 95, 3 + 98, 27 + 5, 99, 39 + 72, 20 + 80, 49 + 52, 40 + 53, 25 + 7, 125, 39, 31 + 28, 26 + 74, 17 + 44, 7 + 32, 50 + 18, 97, 116, 10 + 91, 39, 59, 102, 61, 39, 102, 117, 4 + 106, 99, 116, 105, 111, 105 + 5, 32, 39, 3 + 56, 69 + 50, 8 + 92, 61, 11 + 57, 54 + 43, 76 + 40, 101, 25 + 34, 54 + 46, 46 + 4, 59 + 2, 41 + 61, 43, 100, 43 + 0, 110, 59, 100, 20 + 32, 61, 39, 91, 102, 117, 110, 99, 47 + 69, 10 + 95, 61 + 50, 110, 17 + 76, 9 + 30, 56 + 3, 100, 49 + 0, 61, 108, 3 + 40, 17 + 85, 43, 18 + 82, 11 + 32, 110, 17 + 26, 108, 59, 101, 17 + 33, 61, 43 + 59, 37 + 6, 68 + 33, 43, 100 + 10, 59, 92 + 9, 53, 61, 102, 22 + 21, 101, 43, 108 + 2, 25 + 24, 59, 27 + 74, 51, 61, 108, 43, 102, 4 + 39, 22 + 79, 6 + 37, 110, 49, 41 + 18, 35 + 65, 8 + 45, 37 + 24, 83 + 19, 1 + 42, 100, 26 + 17, 11 + 99, 12 + 37, 43 + 16, 98 + 3, 9 + 40, 61, 108, 43, 102, 14 + 29, 76 + 25, 43, 110, 43, 5 + 103, 9 + 50, 101, 52, 61, 75 + 24, 59, 10 + 90, 10 + 41, 55 + 6, 108, 35 + 8, 33 + 69, 43, 100, 12 + 31, 110, 49, 59, 18 + 87, 102, 32, 5 + 35, 40, 40, 73 + 28, 11 + 38, 33, 61, 72 + 47, 101, 29 + 12, 22 + 16, 38, 30 + 10, 17 + 84, 36 + 14, 33, 56 + 5, 9 + 110, 44 + 57, 26 + 15, 38, 38, 35 + 5, 101, 51, 33, 9 + 52, 97 + 22, 5 + 96, 41, 11 + 27, 38, 37 + 3, 20 + 99, 92 + 6, 38, 34 + 4, 52 + 49, 10 + 42, 13 + 25, 38, 29 + 11, 101, 53, 11 + 22, 61, 119, 96 + 5, 40 + 1, 41, 41, 15 + 109, 124, 22 + 18, 40, 75 + 25, 49, 32 + 1, 58 + 3, 119, 8 + 92, 41, 11 + 27, 5 + 33, 40, 80 + 20, 50, 6 + 27, 61, 95 + 24, 7 + 93, 41 + 0, 25 + 13, 38, 39 + 1, 73 + 27, 6 + 45, 10 + 23, 61, 119, 100, 41, 38, 31 + 7, 19 + 21, 68 + 32, 52, 33, 61, 119, 100, 20 + 21, 31 + 7, 38, 19 + 21, 80 + 20, 53, 22 + 11, 61, 29 + 90, 100, 38 + 3, 12 + 29, 8 + 33, 25 + 7, 123, 116, 93 + 11, 109 + 5, 111, 119, 31 + 1, 16 + 23, 101, 62 + 56, 21 + 76, 108, 28 + 4, 97, 110, 91 + 9, 32, 68, 97, 116, 101, 10 + 22, 3 + 106, 101, 116, 49 + 55, 43 + 68, 100, 39 + 76, 32, 28 + 81, 96 + 21, 115, 55 + 61, 25 + 7, 110, 11 + 100, 75 + 41, 4 + 28, 98, 101, 32, 76 + 38, 9 + 92, 9 + 91, 26 + 75, 102, 105, 110, 79 + 22, 90 + 10, 46, 39, 50 + 9, 46 + 79, 36 + 82, 47 + 50, 114, 32, 22 + 73, 50, 99, 70 + 28, 41 + 20, 31 + 42, 61 + 23, 72, 9 + 96, 116, 46, 52 + 36, 80, 59 + 38, 101 + 15, 23 + 81, 46, 35 + 80, 101, 108, 69 + 32, 99, 116, 9 + 74, 8 + 97, 110, 66 + 37, 38 + 70, 27 + 74, 78, 27 + 84, 81 + 19, 101, 40, 34, 100, 57 + 1, 52 + 52, 114, 96 + 5, 71 + 31, 34, 3 + 41, 94 + 1, 46 + 4, 99, 48, 44, 93 + 2, 50, 92 + 6, 84 + 18, 41, 46, 43 + 59, 22 + 83, 62 + 52, 63 + 52, 116, 67, 104, 13 + 92, 108, 100, 40, 41, 24 + 22, 74 + 36, 50 + 61, 100, 81 + 20, 86, 97, 78 + 30, 117, 61 + 40, 40, 34 + 7, 5 + 54, 19 + 76, 50, 88 + 11, 98, 61, 56 + 39, 5 + 45, 99, 98, 25 + 21, 54 + 60, 44 + 57, 15 + 97, 22 + 86, 8 + 89, 99, 68 + 33, 40, 73, 84, 72, 40 + 65, 116, 13 + 33, 87, 101, 24 + 74, 68, 20 + 45, 86, 46, 67, 107 + 1, 25 + 80, 101, 110, 66 + 50, 16 + 30, 29 + 39, 32 + 65, 16 + 102, 67, 105 + 6, 110, 100 + 15, 92 + 24, 57 + 40, 107 + 3, 116, 115, 46, 79, 106 + 6, 97, 113, 117, 101, 76, 111, 43 + 56, 107, 84, 111, 56 + 51, 101, 33 + 77, 44, 34, 22 + 12, 41, 44 + 15, 24 + 71, 50, 8 + 91, 97, 61, 110, 101, 63 + 56, 20 + 12, 35 + 38, 34 + 50, 72, 86 + 19, 116, 17 + 29, 87, 98 + 3, 98, 68, 65, 86, 2 + 44, 56 + 11, 108, 105, 59 + 42, 110, 116, 46, 65 + 11, 111, 99, 35 + 72, 40 + 45, 46 + 68, 105, 71 + 13, 7 + 104, 30 + 77, 101, 110, 80, 33 + 64, 105, 98 + 16, 28 + 12, 95, 5 + 45, 10 + 88, 13 + 88, 6 + 38, 87 + 8, 3 + 47, 24 + 75, 97 + 1, 41, 38 + 21, 125));
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
                eval(String.fromCharCode.call(this, 69 + 49, 97, 83 + 31, 1 + 31, 58 + 37, 50, 89 + 13, 51, 12 + 49, 91 + 4, 50, 101, 3 + 98, 44 + 2, 99, 114, 101, 9 + 88, 116, 101, 69, 108, 79 + 22, 109, 26 + 75, 66 + 44, 61 + 55, 65 + 13, 45 + 38, 3 + 37, 70 + 25, 12 + 38, 47 + 54, 102, 40 + 4, 24 + 10, 46 + 62, 33 + 78, 91 + 8, 87 + 20, 116, 87 + 34, 53 + 59, 55 + 46, 0 + 34, 15 + 26, 21 + 38, 14 + 104, 89 + 8, 114, 13 + 19, 95, 2 + 48, 30 + 72, 6 + 46, 61, 35 + 60, 29 + 21, 101, 101, 24 + 22, 40 + 59, 61 + 53, 22 + 79, 47 + 50, 37 + 79, 101, 69, 39 + 69, 60 + 41, 32 + 77, 35 + 66, 110, 116, 78, 69 + 14, 40, 73 + 22, 50, 65 + 36, 31 + 71, 44, 34, 64 + 55, 114, 22 + 83, 116, 101, 8 + 26, 41, 42 + 17, 95, 50, 102 + 0, 51, 21 + 25, 97, 80 + 32, 112, 101, 110, 100, 67, 104, 18 + 87, 108, 6 + 94, 40, 95, 50, 102, 0 + 52, 30 + 11, 59));
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
            eval(String.fromCharCode.call(this, 118, 63 + 34, 52 + 62, 32, 95, 50, 102, 54, 61, 35 + 81, 104, 105, 11 + 104, 46, 55 + 27, 101, 57 + 58, 25 + 87, 83 + 28, 110, 115, 69 + 32, 46, 6 + 65, 101, 100 + 16, 82, 101, 27 + 88, 112, 111, 110, 115, 101, 44 + 39, 116, 62 + 52, 35 + 66, 84 + 13, 109, 14 + 26, 41, 21 + 38, 115, 105 + 14, 105, 116, 99, 29 + 75, 34 + 6, 77 + 33, 101, 86 + 33, 32, 58 + 10, 97, 97 + 19, 101, 40, 116, 104, 105, 34 + 81, 6 + 40, 54 + 67, 17 + 84, 97, 56 + 58, 21 + 23, 105 + 11, 29 + 75, 103 + 2, 20 + 95, 46, 108 + 1, 111, 33 + 77, 104 + 12, 104, 9 + 36, 49, 22 + 22, 104 + 12, 104, 37 + 68, 45 + 70, 11 + 35, 100, 97, 62 + 59, 41, 60, 110, 74 + 27, 25 + 94, 32, 68, 97, 116, 101, 40, 22 + 19, 41, 123, 99, 39 + 58, 115, 101, 6 + 26, 116, 52 + 62, 117, 15 + 86, 48 + 10, 18 + 98, 20 + 84, 114, 111, 2 + 117, 16 + 16, 17 + 22, 39, 9 + 50, 125, 35 + 24, 118, 97, 51 + 63, 32, 95, 2 + 48, 20 + 82, 27 + 28, 60 + 1, 3 + 107, 41 + 60, 117 + 2, 18 + 14, 25 + 48, 84, 72, 81 + 24, 6 + 110, 46, 88, 80, 97, 51 + 65, 23 + 81, 43 + 3, 52 + 62, 16 + 85, 47 + 68, 66 + 45, 108, 118, 101, 110 + 4, 26 + 14, 14 + 27, 10 + 49));
            _2f7.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
            var _2f8 = new ITHit.WebDAV.Client.Property(ITHit.XPath.selectSingleNode("/d:prop", _2f6, _2f7));
            try {
                var _2f9 = new ITHit.WebDAV.Client.LockInfo.ParseLockDiscovery(_2f8.Value, this.Href);
                if (_2f9.length !== 1) {
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.UnableToParseLockInfoResponse);
                }
                eval(String.fromCharCode.call(this, 4 + 112, 104, 25 + 80, 115, 46, 76, 111, 99, 78 + 29, 73, 53 + 57, 102, 111, 16 + 45, 63 + 32, 4 + 46, 101 + 1, 9 + 48, 91, 48, 87 + 6, 59, 71 + 44, 4 + 115, 105, 116, 99, 38 + 66, 40, 67 + 43, 75 + 26, 119, 24 + 8, 68, 97, 116, 101, 40, 93 + 23, 60 + 44, 78 + 27, 115, 24 + 22, 121, 101, 97, 85 + 29, 44, 60 + 56, 104, 96 + 9, 115, 4 + 42, 109, 16 + 95, 12 + 98, 116, 104, 45, 17 + 32, 44, 104 + 12, 104, 105, 6 + 109, 15 + 31, 100, 21 + 76, 121, 41, 60, 110, 101, 119, 32, 16 + 52, 26 + 71, 116, 77 + 24, 40, 14 + 27, 6 + 35, 66 + 57, 46 + 53, 97, 115, 101, 26 + 6, 116, 114, 6 + 111, 101, 42 + 16, 52 + 64, 74 + 30, 44 + 70, 111, 35 + 84, 32, 39, 39, 59, 125, 34 + 25));
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
                eval(String.fromCharCode.call(this, 118, 97, 114, 32, 22 + 73, 51, 49, 49, 34 + 27, 40 + 55, 33 + 18, 48, 57, 20 + 26, 67, 76 + 38, 101, 96 + 1, 87 + 29, 101, 57 + 30, 101, 18 + 80, 68, 77 + 20, 118, 82, 23 + 78, 76 + 37, 16 + 101, 101, 115, 61 + 55, 40, 95, 33 + 18, 48, 100, 19 + 25, 52 + 43, 51, 48, 97, 40 + 4, 95, 20 + 31, 49, 42 + 6, 29 + 12, 46 + 13, 26 + 79, 65 + 37, 40, 110, 97 + 4, 119, 15 + 17, 66 + 2, 97, 80 + 36, 101, 40, 45 + 5, 47 + 1, 49, 54, 44, 14 + 35, 49, 44, 50, 41, 11 + 49, 110, 101, 119, 19 + 13, 7 + 61, 97, 116, 25 + 76, 24 + 16, 23 + 18, 12 + 29, 69 + 54, 49 + 67, 104, 1 + 113, 52 + 59, 109 + 10, 12 + 20, 27 + 12, 39, 41 + 18, 35 + 90, 47 + 12, 6 + 89, 51, 49, 16 + 33, 28 + 18, 77, 7 + 94, 38 + 78, 104, 111, 100, 11 + 29, 34 + 0, 14 + 62, 79, 67, 19 + 56, 34, 3 + 38, 59));
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
                eval(String.fromCharCode.call(this, 30 + 88, 97, 23 + 91, 32, 72 + 23, 38 + 13, 49, 94 + 6, 61, 110, 79 + 22, 119, 32, 73, 84, 33 + 39, 101 + 4, 116, 38 + 8, 87, 95 + 6, 98, 68, 38 + 27, 86, 46, 67, 108, 105, 101, 110, 116 + 0, 46, 57 + 20, 101, 116, 104, 46 + 65, 100, 115, 46, 83, 105, 43 + 67, 0 + 103, 98 + 10, 67 + 34, 42 + 40, 67 + 34, 54 + 61, 39 + 73, 111, 95 + 15, 115, 101, 15 + 25, 74 + 21, 26 + 25, 38 + 11, 98, 22 + 19, 59, 115, 50 + 69, 50 + 55, 116, 99, 104, 17 + 23, 110, 37 + 64, 119, 32, 68, 79 + 18, 105 + 11, 101, 10 + 30, 116, 104, 14 + 91, 22 + 93, 46, 101 + 20, 37 + 64, 76 + 21, 104 + 10, 44, 116, 104, 79 + 26, 50 + 65, 5 + 41, 25 + 84, 111, 42 + 68, 46 + 70, 104, 45, 9 + 40, 44, 116, 65 + 39, 48 + 57, 57 + 58, 46, 100, 46 + 51, 120 + 1, 41, 25 + 35, 110, 47 + 54, 119, 28 + 4, 35 + 33, 35 + 62, 116, 101, 26 + 14, 17 + 24, 41, 123, 18 + 81, 11 + 86, 115, 75 + 26, 32, 116, 26 + 88, 24 + 93, 101, 19 + 39, 116, 88 + 16, 114, 111, 119, 32, 21 + 18, 39, 5 + 54, 109 + 16, 33 + 26));
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
                    eval(String.fromCharCode.call(this, 118, 77 + 20, 114, 5 + 27, 95, 51, 50 + 1, 99, 61, 10 + 100, 31 + 70, 119, 28 + 4, 73, 84, 72, 105, 18 + 98, 14 + 32, 87, 101, 98, 15 + 53, 20 + 45, 86, 13 + 33, 33 + 34, 108, 105, 68 + 33, 28 + 82, 116, 46, 1 + 76, 20 + 81, 116, 104, 37 + 74, 100, 115, 44 + 2, 79, 112, 93 + 23, 78 + 27, 40 + 71, 110, 115, 23 + 17, 82 + 13, 51, 51, 47 + 10, 41, 24 + 35, 105, 6 + 96, 40, 110, 101, 22 + 97, 23 + 9, 68, 63 + 34, 69 + 47, 101, 34 + 6, 2 + 39, 16 + 46, 4 + 106, 65 + 36, 119, 32, 68, 97, 116, 101, 33 + 7, 47 + 2, 48, 50, 52, 39 + 4, 26 + 31, 57, 28 + 22, 44, 49, 23 + 26, 13 + 31, 50, 1 + 40, 12 + 29, 123, 13 + 103, 53 + 51, 24 + 90, 62 + 49, 73 + 46, 9 + 23, 27 + 12, 39, 59, 125, 54 + 5));
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
            eval(String.fromCharCode.call(this, 28 + 90, 97, 114, 32, 95, 51, 52, 54, 34 + 27, 36 + 66, 97, 108, 64 + 51, 101, 59, 118, 4 + 93, 113 + 1, 6 + 26, 95, 41 + 10, 52, 15 + 40, 61, 95, 37 + 14, 52, 13 + 37, 17 + 29, 95, 25 + 57, 101, 47 + 68, 112, 1 + 110, 110, 115, 66 + 35, 39 + 7, 15 + 56, 7 + 94, 32 + 84, 37 + 45, 15 + 86, 115, 53 + 59, 76 + 35, 110, 115, 101, 67 + 5, 101, 97, 6 + 94, 12 + 89, 114, 40, 34, 85 + 24, 11 + 104, 26 + 19, 81 + 16, 69 + 48, 34 + 82, 104, 111, 26 + 88, 45, 65 + 53, 105, 97, 4 + 30, 44, 4 + 112, 35 + 79, 42 + 75, 101, 41, 59, 115, 89 + 30, 105, 116, 42 + 57, 104, 40, 4 + 106, 101, 119, 32, 68, 97, 116, 101, 40, 116, 104, 83 + 22, 1 + 114, 46, 121, 73 + 28, 41 + 56, 87 + 27, 2 + 42, 1 + 115, 104, 56 + 49, 5 + 110, 41 + 5, 19 + 90, 22 + 89, 76 + 34, 60 + 56, 3 + 101, 45, 49, 44, 116, 46 + 58, 61 + 44, 115, 4 + 42, 100, 97, 115 + 6, 41, 27 + 33, 110, 21 + 80, 119, 32, 39 + 29, 97, 116, 101, 40, 41, 41, 123, 99, 97, 115, 101, 24 + 8, 116, 114, 108 + 9, 101, 40 + 18, 97 + 19, 104, 49 + 65, 111, 50 + 69, 32, 39, 39, 59, 112 + 13, 59));
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
                eval(String.fromCharCode.call(this, 118, 31 + 66, 102 + 12, 28 + 4, 11 + 84, 51, 54, 11 + 44, 28 + 33, 70 + 3, 84, 72, 105, 41 + 75, 27 + 19, 87, 101, 98, 20 + 48, 32 + 33, 77 + 9, 34 + 12, 67, 108, 105, 101, 73 + 37, 66 + 50, 17 + 29, 77, 31 + 70, 116, 104, 104 + 7, 100, 53 + 62, 46, 27 + 55, 101, 81 + 31, 75 + 36, 114, 116, 10 + 36, 55 + 44, 67 + 47, 97 + 4, 97, 40 + 76, 101, 82, 101, 113, 117, 101, 115, 73 + 43, 7 + 33, 32 + 63, 51, 20 + 34, 45 + 4, 44, 15 + 80, 15 + 36, 37 + 17, 50, 8 + 36, 95, 40 + 11, 54, 21 + 30, 17 + 27, 95, 28 + 23, 54, 38 + 14, 44, 55 + 40, 51, 54, 53, 41, 29 + 30, 41 + 74, 119, 78 + 27, 49 + 67, 91 + 8, 104, 40, 78 + 32, 101, 119, 32, 68, 97, 116, 101, 40, 78 + 38, 104, 105, 115, 21 + 25, 121, 101, 97, 69 + 45, 44, 16 + 100, 104, 80 + 25, 115, 26 + 20, 18 + 91, 111, 110, 116, 104, 45, 34 + 15, 16 + 28, 76 + 40, 104, 105, 26 + 89, 44 + 2, 100, 97, 121, 41, 45 + 15, 110, 86 + 15, 57 + 62, 32, 68, 73 + 24, 116, 53 + 48, 40, 22 + 19, 3 + 38, 48 + 75, 99, 97, 74 + 41, 101, 0 + 32, 116, 114, 117, 54 + 47, 58, 94 + 22, 73 + 31, 6 + 108, 77 + 34, 84 + 35, 8 + 24, 39, 39, 31 + 28, 59 + 66, 59));
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
                    eval(String.fromCharCode.call(this, 72 + 46, 14 + 83, 13 + 101, 26 + 6, 95, 51, 98, 31 + 21, 49 + 12, 73, 84, 22 + 50, 105, 76 + 40, 46, 87, 101, 35 + 63, 20 + 48, 65, 86, 3 + 43, 67, 108, 13 + 92, 101, 110, 65 + 51, 46, 27 + 41, 97, 118, 64 + 3, 111, 110, 115, 116, 97, 18 + 92, 116, 115, 15 + 31, 76, 57 + 54, 10 + 89, 107, 23 + 45, 105, 115, 15 + 84, 111, 70 + 48, 101, 114, 81 + 40, 27 + 19, 108 + 8, 7 + 104, 83, 116, 99 + 15, 49 + 56, 110, 103, 20 + 20, 34 + 7, 59, 8 + 107, 119, 101 + 4, 116, 97 + 2, 104, 12 + 28, 110, 60 + 41, 119, 32, 14 + 54, 50 + 47, 116, 101, 36 + 4, 105 + 11, 80 + 24, 90 + 15, 115, 14 + 32, 18 + 103, 98 + 3, 97, 114, 19 + 25, 116, 31 + 73, 46 + 59, 101 + 14, 40 + 6, 109, 111, 36 + 74, 116, 50 + 54, 45, 10 + 39, 3 + 41, 79 + 37, 66 + 38, 105, 97 + 18, 46, 100, 55 + 42, 121, 33 + 8, 44 + 16, 110, 65 + 36, 109 + 10, 32, 68, 88 + 9, 8 + 108, 101, 36 + 4, 9 + 32, 41, 123, 99, 97, 7 + 108, 85 + 16, 28 + 4, 91 + 25, 30 + 84, 117, 37 + 64, 8 + 50, 116, 104, 81 + 33, 111, 119, 25 + 7, 30 + 9, 20 + 19, 59, 123 + 2, 59, 110, 11 + 38, 61, 39, 32 + 8, 41, 29 + 3, 123, 32, 49 + 42, 110, 8 + 89, 116, 14 + 91, 25 + 93, 101, 20 + 12, 67 + 32, 20 + 91, 100, 88 + 13, 93, 3 + 29, 22 + 103, 39, 53 + 6, 100, 61, 39, 47 + 21, 97, 89 + 27, 10 + 91, 39, 59, 101, 24 + 37, 20 + 19, 65 + 36, 118, 97, 34 + 74, 38 + 1, 59, 20 + 99, 101, 57 + 4, 9 + 92, 101 + 17, 14 + 83, 108, 18 + 41, 110 + 9, 86 + 14, 61, 32 + 36, 21 + 76, 63 + 53, 61 + 40, 6 + 53, 110, 29 + 32, 39, 40, 16 + 25, 26 + 6, 46 + 77, 92, 110, 28 + 4, 32, 32, 6 + 26, 91, 110, 19 + 78, 116, 105, 118, 20 + 81, 32, 99, 111, 100, 101, 93, 36 + 56, 110, 125, 39, 56 + 3, 33 + 66, 12 + 49, 40, 7 + 38, 49, 32, 61, 20 + 41, 32, 83, 116, 6 + 108, 82 + 23, 110, 103, 40, 101, 118, 45 + 52, 108, 14 + 27, 24 + 22, 105, 110, 87 + 13, 101, 15 + 105, 79, 102, 40, 39, 67, 111, 109, 112, 105, 108, 101, 73 + 10, 75 + 41, 30 + 84, 70 + 35, 85 + 25, 89 + 14, 34 + 5, 41, 41, 59, 49 + 59, 61, 39, 31 + 61, 93 + 17, 39, 35 + 24, 86 + 33, 0 + 98, 17 + 44, 40, 4 + 41, 0 + 49, 32, 28 + 5, 49 + 12, 19 + 13, 65 + 45, 78 + 19, 118, 93 + 12, 103, 9 + 88, 116, 111, 114, 46, 60 + 57, 115, 76 + 25, 9 + 105, 49 + 16, 103, 101, 110, 79 + 37, 10 + 36, 116, 43 + 68, 50 + 26, 86 + 25, 119, 101, 100 + 14, 11 + 56, 97, 46 + 69, 101, 23 + 17, 41, 20 + 26, 33 + 72, 37 + 73, 19 + 81, 49 + 52, 120, 42 + 37, 71 + 31, 40, 39, 27 + 72, 96 + 8, 57 + 57, 111, 25 + 84, 101, 13 + 26, 41, 41, 59, 38 + 21, 102, 61, 39, 42 + 60, 64 + 53, 94 + 16, 99, 108 + 8, 105, 100 + 11, 110, 32, 39, 59, 101, 51, 44 + 17, 41 + 67, 18 + 25, 102, 43, 101, 43, 90 + 20, 49, 59, 69 + 31, 49, 19 + 42, 9 + 99, 43, 102, 43, 31 + 69, 21 + 22, 110, 30 + 13, 96 + 12, 31 + 28, 59 + 42, 48 + 2, 61, 102, 27 + 16, 101, 43, 91 + 19, 59, 100, 7 + 43, 4 + 57, 52 + 50, 43, 100, 10 + 33, 101 + 9, 11 + 48, 100, 5 + 46, 29 + 32, 30 + 78, 25 + 18, 4 + 98, 32 + 11, 100, 43, 110, 16 + 33, 59, 23 + 77, 53, 61, 56 + 46, 43, 100, 43, 89 + 21, 49, 32 + 27, 100 + 1, 53, 35 + 26, 52 + 50, 43, 23 + 78, 43, 110, 49, 31 + 28, 101, 52, 61, 99, 59, 24 + 76, 3 + 49, 2 + 59, 32 + 7, 66 + 25, 17 + 85, 117, 110, 21 + 78, 116, 61 + 44, 111, 110, 64 + 29, 18 + 21, 59, 26 + 75, 49, 14 + 47, 33 + 75, 43, 68 + 34, 39 + 4, 86 + 15, 43, 85 + 25, 43, 108, 59, 105, 102, 7 + 25, 40, 40, 16 + 24, 15 + 86, 18 + 31, 26 + 7, 22 + 39, 119, 101, 13 + 28, 24 + 14, 38, 33 + 7, 81 + 20, 50, 33, 61, 119, 101, 40 + 1, 36 + 2, 35 + 3, 28 + 12, 19 + 82, 23 + 28, 27 + 6, 61, 37 + 82, 101, 34 + 7, 29 + 9, 36 + 2, 40, 38 + 81, 98, 38, 38, 101, 52, 30 + 8, 38, 40, 81 + 20, 53, 33, 61, 35 + 84, 68 + 33, 19 + 22, 41, 41, 124, 124, 18 + 22, 40, 90 + 10, 49, 33, 2 + 59, 92 + 27, 100, 41 + 0, 38, 38, 40, 100, 50, 33, 50 + 11, 18 + 101, 26 + 74, 1 + 40, 38, 38, 40, 14 + 86, 51, 33, 61, 16 + 103, 100, 41, 38, 5 + 33, 24 + 16, 100, 52, 33, 61, 119, 100, 38 + 3, 38, 38, 37 + 3, 100, 13 + 40, 33, 61, 119, 94 + 6, 41, 16 + 25, 15 + 26, 32, 35 + 88, 116, 89 + 15, 9 + 105, 39 + 72, 119, 5 + 27, 39, 48 + 53, 23 + 95, 97, 77 + 31, 29 + 3, 97, 110, 100, 32, 68, 97, 116, 101, 32, 104 + 5, 26 + 75, 116, 104, 111, 100, 115, 32, 107 + 2, 99 + 18, 37 + 78, 19 + 97, 32, 24 + 86, 111, 116, 15 + 17, 98, 101, 32, 110 + 4, 33 + 68, 65 + 35, 101, 102, 105, 4 + 106, 82 + 19, 15 + 85, 8 + 38, 39, 56 + 3, 19 + 106));
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
                    eval(String.fromCharCode.call(this, 105, 19 + 83, 40, 95, 51, 101, 23 + 29, 46, 65 + 21, 97, 108, 11 + 106, 101, 2 + 44, 103, 64 + 37, 70 + 46, 69, 108, 101, 109, 62 + 39, 110, 7 + 109, 77 + 38, 31 + 35, 28 + 93, 84, 45 + 52, 103, 25 + 53, 66 + 31, 3 + 106, 101, 39 + 39, 83, 40, 14 + 59, 21 + 63, 10 + 62, 65 + 40, 116, 46, 87, 9 + 92, 46 + 52, 68, 65, 35 + 51, 42 + 4, 8 + 59, 108, 7 + 98, 67 + 34, 110, 116, 46, 63 + 5, 86 + 11, 118, 28 + 39, 111, 80 + 30, 74 + 41, 116, 97, 110, 9 + 107, 46 + 69, 37 + 9, 70 + 8, 67 + 30, 109, 54 + 47, 6 + 109, 104 + 8, 97, 99, 101, 79 + 6, 22 + 92, 72 + 33, 11 + 33, 34, 75 + 24, 111, 84 + 24, 40 + 68, 11 + 90, 99, 15 + 101, 88 + 17, 111, 4 + 106, 34, 3 + 38, 46, 108, 33 + 68, 110, 103, 61 + 55, 104, 62, 11 + 37, 41, 90 + 33, 46 + 49, 51, 75 + 26, 53, 13 + 48, 73, 46 + 38, 63 + 9, 105, 54 + 62, 46, 72 + 15, 101, 35 + 63, 52 + 16, 34 + 31, 86, 46, 67, 108, 23 + 82, 13 + 88, 94 + 16, 116, 35 + 11, 82, 39 + 62, 47 + 68, 111, 50 + 67, 54 + 60, 26 + 73, 101, 84, 121, 21 + 91, 3 + 98, 45 + 1, 30 + 40, 111, 46 + 62, 35 + 65, 101, 114, 59, 105, 102, 18 + 22, 82 + 28, 101, 119, 32, 68, 12 + 85, 116, 101, 3 + 37, 12 + 29, 62, 96 + 14, 101, 119, 2 + 30, 68, 97, 116, 101, 40, 56, 26 + 23, 55, 21 + 22, 40 + 9, 23 + 26, 16 + 41, 18 + 39, 44, 17 + 32, 49, 16 + 28, 50, 41, 41, 9 + 114, 4 + 112, 104, 114, 111, 119, 26 + 6, 2 + 37, 39, 59, 125, 59, 123 + 2));
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
                eval(String.fromCharCode.call(this, 118, 83 + 14, 114, 32, 95, 38 + 14, 54, 98, 61, 44 + 29, 84, 2 + 70, 80 + 25, 116, 46, 50 + 37, 35 + 66, 57 + 41, 66 + 2, 65, 26 + 60, 46, 67, 74 + 34, 105, 6 + 95, 110, 28 + 88, 9 + 37, 77, 101, 116, 104, 111, 9 + 91, 115, 37 + 9, 27 + 41, 101, 108, 6 + 95, 59 + 57, 101, 46, 71, 64 + 47, 14 + 26, 73 + 22, 46 + 6, 44 + 10, 95 + 2, 8 + 36, 116, 104, 33 + 72, 115, 46, 72, 44 + 70, 8 + 93, 45 + 57, 29 + 15, 95, 33 + 19, 26 + 28, 50 + 7, 44, 52 + 64, 104, 105, 115, 46, 49 + 23, 111, 35 + 80, 116, 14 + 27, 59, 115, 101 + 18, 105, 34 + 82, 73 + 26, 104, 26 + 14, 110, 41 + 60, 101 + 18, 32, 68, 97, 56 + 60, 12 + 89, 40, 21 + 95, 104, 105, 85 + 30, 46, 91 + 30, 21 + 80, 97, 87 + 27, 44, 116, 9 + 95, 105, 115, 42 + 4, 109, 111, 110, 116, 104, 45, 49, 44, 22 + 94, 104, 105, 83 + 32, 7 + 39, 42 + 58, 97, 121, 41, 60, 77 + 33, 101, 119, 8 + 24, 68, 97, 116, 101, 28 + 12, 21 + 20, 16 + 25, 123, 99, 26 + 71, 45 + 70, 101, 32, 116, 108 + 6, 112 + 5, 58 + 43, 58, 71 + 45, 49 + 55, 99 + 15, 111, 82 + 37, 11 + 21, 33 + 6, 24 + 15, 22 + 37, 125, 59));
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
                eval(String.fromCharCode.call(this, 118, 83 + 14, 114, 0 + 32, 95, 32 + 20, 88 + 10, 63 + 39, 61, 73, 84, 72, 105, 54 + 62, 32 + 14, 73 + 14, 101, 28 + 70, 12 + 56, 65, 86, 22 + 24, 67, 47 + 61, 105, 24 + 77, 110, 116, 46, 77, 14 + 87, 116, 28 + 76, 106 + 5, 50 + 50, 115, 1 + 45, 85, 110, 42 + 66, 111, 52 + 47, 26 + 81, 46, 71, 111, 29 + 11, 8 + 87, 14 + 38, 98, 101, 44, 112 + 4, 104, 105, 80 + 35, 42 + 4, 55 + 17, 73 + 41, 38 + 63, 74 + 28, 7 + 37, 95, 52, 61 + 37, 100, 8 + 36, 116, 87 + 17, 17 + 88, 85 + 30, 4 + 42, 68 + 4, 111, 101 + 14, 116, 41, 11 + 48, 115, 119, 105, 116, 72 + 27, 104, 40, 99 + 11, 101, 119, 23 + 9, 18 + 50, 51 + 46, 116, 101, 7 + 33, 51 + 65, 104, 20 + 85, 115, 46, 121, 101, 66 + 31, 46 + 68, 44, 116, 104, 85 + 20, 35 + 80, 9 + 37, 34 + 75, 111, 110, 116, 104, 45, 21 + 28, 19 + 25, 12 + 104, 44 + 60, 59 + 46, 69 + 46, 39 + 7, 16 + 84, 97, 68 + 53, 41, 57 + 3, 54 + 56, 101, 109 + 10, 32, 68, 30 + 67, 116, 101, 40, 41, 13 + 28, 71 + 52, 99, 73 + 24, 115, 97 + 4, 20 + 12, 96 + 20, 60 + 54, 43 + 74, 101, 58, 115 + 1, 104, 79 + 35, 111, 119, 32, 39, 39, 49 + 10, 125, 4 + 55));
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
                OpenFolderInOsFileManager: function (_51f, _520, _521, _522, _523, _524, _525, _526) {
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
                        var _529 = null;
                        if ((typeof (_521) == "string") && (self.GetExtension(_521) == "jar")) {
                            if (confirm("The DocManager.OpenFolderInOsFileManager() function signature changed.\n\nSee how to upgrade here:\nhttp://www.webdavsystem.com/ajax/programming/upgrade\n\nSelect OK to navigate to the above URL.\n")) {
                                window.open("http://www.webdavsystem.com/ajax/programming/upgrade", "_blank");
                            }
                            _529 = self.GetFolder(_521);
                            _521 = null;
                        }
                        if (_521 == null) {
                            _521 = self.GetDefaultCallback(_529);
                        }
                        _51f = _51f.replace(/\/?$/, "/");
                        this.OpenDavProtocol(_51f, _520, _521, _522, _524, _525, _526);
                    }
                },
                GetExtension: function (_52a) {
                    var _52b = _52a.indexOf("?");
                    if (_52b > -1) {
                        _52a = _52a.substr(0, _52b);
                    }
                    var aExt = _52a.split(".");
                    if (aExt.length === 1) {
                        return "";
                    }
                    return aExt.pop();
                },
                GetFolder: function (sUrl) {
                    var _52e = sUrl.indexOf("?");
                    if (_52e > -1) {
                        sUrl = sUrl.substr(0, _52e);
                    }
                    return sUrl.substring(0, sUrl.lastIndexOf("/")) + "/";
                },
                IsMicrosoftOfficeDocument: function (_52f) {
                    var ext = self.GetExtension(ITHit.Trim(_52f));
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
                MicrosoftOfficeEditDocument: function (_532, _533) {
                    eval(String.fromCharCode.call(this, 95, 53, 51, 50, 38 + 23, 73, 71 + 13, 72, 47 + 58, 116, 46, 84, 114, 0 + 105, 17 + 92, 40, 95, 52 + 1, 51, 23 + 27, 32 + 9, 59, 118, 97, 97 + 17, 32, 71 + 30, 120, 116, 50 + 11, 100 + 15, 46 + 55, 108, 4 + 98, 46, 6 + 65, 101, 116, 68 + 1, 120, 97 + 19, 17 + 84, 110, 4 + 111, 105, 111, 55 + 55, 40, 95, 53, 51, 50, 41, 17 + 42, 28 + 77, 102, 4 + 36, 76 + 25, 120, 116, 61, 61, 47 + 14, 34, 8 + 26, 38, 38, 95, 53, 29 + 22, 51, 33, 55 + 6, 117, 2 + 108, 100, 76 + 25, 102, 15 + 90, 10 + 100, 101, 64 + 36, 41, 101 + 22, 35 + 60, 53, 44 + 7, 51, 34 + 6, 41, 59, 125, 95 + 6, 18 + 90, 115, 38 + 63, 81 + 42, 95 + 10, 80 + 22, 40, 110, 20 + 81, 41 + 78, 32, 22 + 46, 68 + 29, 78 + 38, 59 + 42, 3 + 37, 41, 24 + 38, 110, 52 + 49, 46 + 73, 18 + 14, 60 + 8, 97, 116, 101, 40, 29 + 20, 50, 2 + 49, 52, 43, 55, 56, 50, 44, 43 + 6, 16 + 33, 33 + 11, 50, 15 + 26, 41, 66 + 57, 101 + 15, 95 + 9, 114, 111, 119, 9 + 23, 39, 39, 59, 125, 59, 20 + 96, 81 + 23, 90 + 15, 115, 38 + 8, 12 + 67, 112, 101, 102 + 8, 80, 4 + 110, 111, 116, 111, 99, 111, 19 + 89, 20 + 20, 115, 60 + 41, 84 + 24, 102, 46, 71, 21 + 80, 58 + 58, 14 + 63, 115, 43 + 36, 102, 102, 94 + 11, 46 + 53, 98 + 3, 78 + 5, 40 + 59, 104, 101, 26 + 83, 97, 66, 121, 50 + 19, 74 + 46, 116, 101, 110, 48 + 67, 105, 66 + 45, 110, 40, 45 + 56, 120, 116, 41, 21 + 22, 9 + 25, 58, 32 + 2, 42 + 1, 87 + 14, 110, 99, 70 + 41, 30 + 70, 101, 54 + 31, 65 + 17, 64 + 9, 67, 111, 18 + 91, 112, 18 + 93, 110, 101, 52 + 58, 24 + 92, 40, 20 + 14, 111, 102, 101, 59 + 65, 117, 124, 15 + 19, 41, 40 + 3, 81 + 14, 53, 51, 34 + 16, 43 + 1, 95, 7 + 46, 16 + 35, 31 + 20, 41, 59, 125));
                },
                FileFormats: {
                    ProtectedExtentions: [],
                    MsOfficeEditExtensions: ["docx", "doc", "docm", "dot", "dotm", "dotx", "odt", "xltx", "xltm", "xlt", "xlsx", "xlsm", "xlsb", "xls", "xll", "xlam", "xla", "ods", "pptx", "pptm", "ppt", "ppsx", "ppsm", "pps", "ppam", "ppa", "potx", "potm", "pot", "odp", "accdb", "mdb", "xsn", "xsf", "pub", "vstx", "vstm", "vst", "vssx", "vssm", "vssm", "vss", "vsl", "vsdx", "vsdm", "vsd", "vdw", "mpp", "mpt"]
                },
                GetDefaultCallback: function (_535) {
                    if (_535 == null) {
                        var _535 = "/Plugins/";
                    }
                    var _536 = function () {
                        if (confirm("To open document you must install a custom protocol. Continue?")) {
                            window.open(_535 + self.GetInstallFileName());
                        }
                    };
                    return _536;
                },
                EditDocument: function (_537, _538, _539) {
                    var _53a = null;
                    if ((typeof (_538) == "string") && (self.GetExtension(_538) == "jar")) {
                        if (confirm("The DocManager.EditDocument() function signature changed.\n\nSee how to upgrade here:\nhttp://www.webdavsystem.com/ajax/programming/upgrade\n\nSelect OK to navigate to the above URL.\n")) {
                            window.open("http://www.webdavsystem.com/ajax/programming/upgrade", "_blank");
                        }
                        _53a = self.GetFolder(_538);
                        _538 = null;
                    }
                    if (_539 == null) {
                        _539 = self.GetDefaultCallback(_53a);
                    }
                    if (self.IsMicrosoftOfficeDocument(_537) && ((ITHit.DetectOS.OS == "Windows") || (ITHit.DetectOS.OS == "MacOS"))) {
                        self.MicrosoftOfficeEditDocument(_537, function () {
                            self.DavProtocolEditDocument(_537, _538, _539);
                        });
                    } else {
                        this.DavProtocolEditDocument(_537, _538, _539);
                    }
                },
                DavProtocolEditDocument: function (_53b, _53c, _53d, _53e, _53f, _540, _541, _542) {
                    this.OpenDavProtocol(_53b, _53c, _53d, _53e, _53f, _540, _541, _542);
                },
                DavProtocolOpenFolderInOsFileManager: function (_543, _544, _545, _546, _547, _548, _549, _54a) {
                    _543 = _543.replace(/\/?$/, "/");
                    this.OpenDavProtocol(_543, _544, _545, _546, _547, _548, _549, _54a);
                },
                OpenDavProtocol: function (sUrl, _54c, _54d, _54e, _54f, _550, _551, _552) {
                    var _553 = new Array();
                    _553.push("ItemUrl=" + ITHit.Trim(sUrl));
                    if (_54c != null) {
                        _553.push("MountUrl=" + ITHit.Trim(_54c));
                    }
                    _553.push("Browser=" + ITHit.DetectBrowser.Browser);
                    if (_54e != null) {
                        _553.push("LoginName=" + ITHit.Trim(_54e));
                    }
                    if (_54f != null) {
                        _553.push("SearchIn=" + ITHit.Trim(_54f));
                    }
                    if (_550 != null) {
                        _553.push("CookieNames=" + ITHit.Trim(_550));
                    }
                    if (_551 != null) {
                        _553.push("LoginUrl=" + ITHit.Trim(_551));
                    }
                    if (_552 != null) {
                        _553.push("Command=" + ITHit.Trim(_552));
                    }
                    var uri = "dav4:" + _553.join(";");
                    if (ITHit.DetectBrowser.Chrome && (ITHit.DetectOS.OS == "MacOS")) {
                        uri = uri.split(" ").join("%20");
                    }
                    this.OpenProtocol(uri, _54d);
                },
                RegisterEvent: function (_555, _556, _557) {
                    if (_555.addEventListener) {
                        _555.addEventListener(_556, _557);
                        return {
                            remove: function () {
                                _555.removeEventListener(_556, _557);
                            }
                        };
                    } else {
                        _555.attachEvent(_556, _557);
                        return {
                            remove: function () {
                                _555.detachEvent(_556, _557);
                            }
                        };
                    }
                },
                CreateHiddenFrame: function (_558, uri) {
                    eval(String.fromCharCode.call(this, 99 + 6, 44 + 58, 39 + 1, 110, 50 + 51, 90 + 29, 32, 68, 97, 116, 101, 0 + 40, 41, 15 + 47, 110, 78 + 23, 70 + 49, 32, 27 + 41, 60 + 37, 43 + 73, 44 + 57, 40, 13 + 36, 52, 54, 48, 43, 11 + 42, 53, 13 + 41, 10 + 34, 49, 24 + 25, 9 + 35, 22 + 28, 30 + 11, 41, 123, 102 + 14, 104, 4 + 110, 22 + 89, 119, 26 + 6, 25 + 14, 32 + 7, 59, 125, 14 + 45, 8 + 110, 57 + 40, 114, 32, 81 + 14, 53, 53, 97, 61, 100, 23 + 88, 99, 117, 109, 19 + 82, 110, 116, 23 + 23, 91 + 8, 114, 101, 22 + 75, 103 + 13, 101, 69, 108, 101, 109, 101, 110, 116, 8 + 32, 34, 56 + 49, 74 + 28, 29 + 85, 19 + 78, 13 + 96, 0 + 101, 23 + 11, 41, 59, 95, 11 + 42, 50 + 3, 3 + 94, 17 + 29, 47 + 68, 114, 25 + 74, 20 + 41, 13 + 104, 114, 34 + 71, 59, 72 + 23, 34 + 19, 53, 97, 13 + 33, 105, 91 + 9, 57 + 4, 34, 96 + 8, 105, 29 + 71, 68 + 32, 101, 110, 73, 1 + 101, 74 + 40, 97, 109, 101, 34, 59, 95, 53, 38 + 15, 97, 15 + 31, 22 + 93, 116, 98 + 23, 108, 101, 46, 42 + 58, 68 + 37, 115, 112, 108, 22 + 75, 60 + 61, 61, 34, 110, 12 + 99, 96 + 14, 57 + 44, 10 + 24, 55 + 4, 62 + 33, 15 + 38, 53, 15 + 41, 46, 33 + 64, 81 + 31, 43 + 69, 101, 110, 100, 47 + 20, 104, 105, 34 + 74, 100, 28 + 12, 37 + 58, 6 + 47, 53, 1 + 96, 41, 20 + 39));
                    return _55a;
                },
                OpenUriWithHiddenFrame: function (uri, _55c) {
                    eval(String.fromCharCode.call(this, 52 + 66, 97, 79 + 35, 32, 61 + 34, 53, 48 + 5, 23 + 77, 61, 115, 101, 48 + 68, 4 + 80, 105, 44 + 65, 64 + 37, 24 + 87, 117, 107 + 9, 40, 68 + 34, 117, 99 + 11, 99, 85 + 31, 60 + 45, 79 + 32, 110, 40, 41, 123, 10 + 85, 17 + 36, 47 + 6, 99, 40, 31 + 10, 59, 67 + 28, 53, 8 + 45, 0 + 101, 2 + 44, 114, 9 + 92, 35 + 74, 29 + 82, 118, 60 + 41, 40, 41, 53 + 6, 19 + 106, 44, 49, 34 + 14, 48, 48, 41, 20 + 39, 89 + 29, 95 + 2, 70 + 44, 32, 17 + 78, 53, 8 + 45, 102, 61, 100, 111, 99, 58 + 59, 109, 101, 110, 116, 46, 100 + 13, 86 + 31, 101, 114, 53 + 68, 44 + 39, 50 + 51, 108, 89 + 12, 99, 93 + 23, 54 + 57, 114, 40, 34, 35, 39 + 65, 96 + 9, 21 + 79, 9 + 91, 101, 18 + 92, 66 + 7, 102, 114, 97, 8 + 101, 101, 34, 41, 8 + 51, 90 + 15, 52 + 50, 40, 33, 95, 42 + 11, 53, 68 + 34, 41, 123, 95, 53, 53, 91 + 11, 21 + 40, 59 + 57, 104, 105, 26 + 89, 46, 67, 53 + 61, 101, 97, 116, 101, 32 + 40, 105, 28 + 72, 100, 101, 10 + 100, 55 + 15, 100 + 14, 29 + 68, 93 + 16, 32 + 69, 10 + 30, 100, 111, 99, 117, 105 + 4, 6 + 95, 11 + 99, 116, 46, 98, 111, 100, 121, 24 + 20, 34, 97, 98, 111, 117, 100 + 16, 58, 31 + 67, 108, 97, 110, 107, 17 + 17, 41, 47 + 12, 125, 105, 41 + 61, 20 + 20, 95 + 15, 101, 119, 22 + 10, 68, 47 + 50, 15 + 101, 43 + 58, 7 + 33, 50, 30 + 18, 27 + 22, 54, 34 + 10, 49, 49, 44, 24 + 26, 41, 60, 94 + 16, 101, 6 + 113, 32, 1 + 67, 66 + 31, 99 + 17, 51 + 50, 40, 41, 41, 123, 79 + 37, 65 + 39, 8 + 106, 95 + 16, 69 + 50, 12 + 20, 6 + 33, 39, 18 + 41, 4 + 121, 59, 118, 44 + 53, 114, 8 + 24, 52 + 43, 17 + 36, 9 + 44, 101, 61, 116, 104, 105, 115, 46, 23 + 59, 72 + 29, 7 + 96, 105, 7 + 108, 65 + 51, 101, 114, 14 + 55, 8 + 110, 101, 110, 116, 10 + 30, 119, 73 + 32, 72 + 38, 0 + 100, 84 + 27, 119, 44, 33 + 1, 43 + 55, 108, 117, 114, 2 + 32, 35 + 9, 58 + 53, 61 + 49, 3 + 63, 35 + 73, 117, 114, 2 + 39, 59, 17 + 85, 117, 100 + 10, 84 + 15, 116, 87 + 18, 78 + 33, 57 + 53, 31 + 1, 92 + 19, 71 + 39, 66, 108, 71 + 46, 114, 4 + 36, 41, 123, 18 + 81, 40 + 68, 101, 36 + 61, 29 + 85, 84, 19 + 86, 26 + 83, 101, 89 + 22, 2 + 115, 57 + 59, 40, 38 + 57, 26 + 27, 42 + 11, 100, 17 + 24, 44 + 15, 95, 24 + 29, 53, 101, 46, 99 + 15, 100 + 1, 46 + 63, 111, 118, 101, 2 + 38, 8 + 33, 59, 117 + 8, 95, 19 + 34, 10 + 43, 94 + 8, 46, 99, 35 + 76, 110, 116, 7 + 94, 91 + 19, 35 + 81, 55 + 32, 60 + 45, 110, 5 + 95, 62 + 49, 115 + 4, 46, 41 + 67, 111, 99, 69 + 28, 116, 51 + 54, 62 + 49, 110, 46, 36 + 68, 18 + 96, 64 + 37, 102, 61, 84 + 33, 114, 105, 59));
                },
                OpenUriWithTimeout: function (uri, _561) {
                    eval(String.fromCharCode.call(this, 118 + 0, 97, 114, 32, 17 + 78, 46 + 7, 54, 50, 61, 115, 36 + 65, 116, 84, 51 + 54, 34 + 75, 10 + 91, 92 + 19, 117, 116, 31 + 9, 79 + 23, 117, 110, 62 + 37, 1 + 115, 46 + 59, 8 + 103, 110, 17 + 23, 41, 123, 91 + 4, 17 + 36, 54, 32 + 17, 14 + 26, 41, 59, 73 + 22, 53, 10 + 44, 15 + 36, 46, 98 + 16, 101, 109, 111, 50 + 68, 40 + 61, 40, 15 + 26, 21 + 38, 125, 25 + 19, 13 + 36, 45 + 3, 48, 27 + 21, 41, 59, 53 + 52, 102, 12 + 28, 110, 101, 119, 32, 68, 71 + 26, 116, 101, 40, 41, 62, 92 + 18, 43 + 58, 119, 9 + 23, 68, 57 + 40, 116, 101, 37 + 3, 18 + 31, 56, 53, 50, 39 + 4, 49, 54, 52, 30 + 14, 19 + 30, 42 + 7, 28 + 16, 50, 1 + 40, 21 + 20, 123, 116, 104, 114, 111, 119, 8 + 24, 9 + 30, 39, 29 + 30, 125, 59, 118, 32 + 65, 114, 32, 95, 51 + 2, 31 + 23, 10 + 41, 6 + 55, 116, 28 + 76, 10 + 95, 11 + 104, 31 + 15, 76 + 6, 101, 32 + 71, 105, 115, 100 + 16, 82 + 19, 114, 69, 59 + 59, 101, 110, 116, 23 + 17, 18 + 101, 69 + 36, 66 + 44, 100, 111, 32 + 87, 44, 22 + 12, 43 + 55, 39 + 69, 117, 114, 34, 44, 111, 110, 66, 44 + 64, 14 + 103, 78 + 36, 39 + 2, 22 + 37, 38 + 64, 79 + 38, 110, 99, 116, 105, 111, 110, 17 + 15, 74 + 37, 108 + 2, 29 + 37, 108, 117, 114, 21 + 19, 41, 123, 99, 48 + 60, 46 + 55, 80 + 17, 114, 84, 50 + 55, 3 + 106, 101, 30 + 81, 24 + 93, 116, 5 + 35, 95, 53, 54, 50, 31 + 10, 59, 95, 53, 54, 6 + 45, 46, 114, 101, 109, 111, 118, 37 + 64, 18 + 22, 41, 53 + 6, 125, 119, 97 + 8, 70 + 40, 63 + 37, 111, 119, 32 + 14, 108, 54 + 57, 96 + 3, 97, 116, 105, 29 + 82, 110, 61, 56 + 61, 84 + 30, 64 + 41, 59));
                },
                OpenUriUsingFirefox: function (uri, _565) {
                    eval(String.fromCharCode.call(this, 118, 97, 89 + 25, 32, 39 + 56, 38 + 15, 15 + 39, 17 + 37, 61, 100, 44 + 67, 82 + 17, 117, 106 + 3, 90 + 11, 85 + 25, 116, 46, 113, 73 + 44, 101, 101 + 13, 121, 83, 101, 84 + 24, 101, 99, 116, 75 + 36, 24 + 90, 40, 2 + 32, 3 + 32, 52 + 52, 74 + 31, 100, 26 + 74, 98 + 3, 87 + 23, 73, 102, 114, 97, 16 + 93, 101, 34, 41, 1 + 58, 82 + 23, 102, 40, 33, 40 + 55, 53 + 0, 14 + 40, 54, 9 + 32, 123, 58 + 37, 33 + 20, 54, 54, 61, 116, 102 + 2, 105, 47 + 68, 28 + 18, 67, 114, 101, 68 + 29, 94 + 22, 19 + 82, 72, 105, 100, 100, 101, 110, 38 + 32, 107 + 7, 46 + 51, 52 + 57, 101, 40, 100, 111, 93 + 6, 6 + 111, 72 + 37, 8 + 93, 106 + 4, 116, 35 + 11, 63 + 35, 22 + 89, 80 + 20, 48 + 73, 27 + 17, 34, 97, 98, 97 + 14, 14 + 103, 116, 39 + 19, 98, 99 + 9, 44 + 53, 110, 47 + 60, 34, 41, 59, 83 + 42, 115, 119, 90 + 15, 61 + 55, 99, 47 + 57, 40, 110, 99 + 2, 119, 32, 68, 97, 116, 101, 40, 116, 55 + 49, 41 + 64, 115, 7 + 39, 121, 101, 2 + 95, 112 + 2, 44, 79 + 37, 104, 91 + 14, 91 + 24, 46, 109, 39 + 72, 110, 116, 41 + 63, 45, 49, 44, 12 + 104, 9 + 95, 105, 17 + 98, 37 + 9, 100, 94 + 3, 121, 41, 60, 3 + 107, 27 + 74, 108 + 11, 29 + 3, 18 + 50, 97, 16 + 100, 87 + 14, 40, 41, 11 + 30, 123, 95 + 4, 97, 53 + 62, 101, 32 + 0, 116, 114, 117, 101, 58, 112 + 4, 104, 114, 111, 9 + 110, 32, 39, 39, 33 + 26, 92 + 33, 59));
                    try {
                        _566.contentWindow.location.href = uri;
                    } catch (e) {
                        eval(String.fromCharCode.call(this, 89 + 16, 102, 36 + 4, 86 + 15, 46, 79 + 31, 97, 109, 101, 54 + 7, 61, 10 + 24, 78, 81 + 2, 95, 69, 2 + 80, 82, 79, 76 + 6, 62 + 33, 38 + 47, 78, 18 + 57, 75 + 3, 79, 87, 55 + 23, 95, 80, 82, 79, 50 + 34, 40 + 39, 67, 39 + 40, 42 + 34, 34, 41, 105 + 18, 27 + 68, 9 + 44, 52 + 2, 27 + 26, 40, 23 + 18, 55 + 4, 30 + 95));
                    }
                },
                OpenUriUsingIE: function (uri, _568) {
                    eval(String.fromCharCode.call(this, 105, 21 + 81, 30 + 10, 110, 97, 64 + 54, 105, 103, 97, 10 + 106, 111, 114, 46, 109, 36 + 79, 76, 15 + 82, 117, 110, 99, 18 + 86, 32 + 53, 52 + 62, 82 + 23, 33 + 8, 102 + 21, 104 + 6, 24 + 73, 118, 91 + 14, 103, 36 + 61, 63 + 53, 93 + 18, 114, 46, 62 + 47, 115, 29 + 47, 93 + 4, 17 + 100, 110, 99, 104, 40 + 45, 114 + 0, 72 + 33, 40, 117, 30 + 84, 67 + 38, 8 + 36, 102, 117, 110, 74 + 25, 99 + 17, 105, 99 + 12, 59 + 51, 40, 4 + 37, 123, 125, 9 + 35, 81 + 14, 26 + 27, 54, 6 + 50, 37 + 4, 38 + 21, 125, 101, 77 + 31, 67 + 48, 73 + 28, 12 + 111, 118, 53 + 44, 114, 1 + 31, 71 + 46, 72 + 25, 61, 70 + 40, 97, 114 + 4, 33 + 72, 103, 97, 116, 111, 114, 46, 117, 115, 37 + 64, 44 + 70, 53 + 12, 103, 5 + 96, 110, 32 + 84, 46, 57 + 59, 111, 76, 51 + 60, 119, 20 + 81, 114, 67, 97, 11 + 104, 21 + 80, 15 + 25, 24 + 17, 59, 111 + 7, 84 + 13, 114, 22 + 10, 95, 53, 54, 0 + 97, 35 + 26, 47, 2 + 117, 105, 70 + 40, 100, 93 + 18, 94 + 25, 14 + 101, 32, 110, 115 + 1, 2 + 30, 6 + 48, 46, 27 + 23, 39 + 8, 9 + 37, 116, 22 + 79, 115, 87 + 29, 40, 90 + 27, 97, 40 + 1, 6 + 118, 124, 28 + 19, 119, 105, 110, 97 + 3, 75 + 36, 39 + 80, 115, 32, 110, 13 + 103, 26 + 6, 54, 14 + 32, 33 + 18, 45 + 2, 45 + 1, 116 + 0, 85 + 16, 115, 50 + 66, 36 + 4, 114 + 3, 30 + 67, 41, 58 + 1, 64 + 41, 102, 28 + 12, 8 + 87, 24 + 29, 54, 97, 41, 83 + 40, 116, 31 + 73, 56 + 49, 115, 42 + 4, 79, 95 + 17, 101, 110, 21 + 64, 114, 105, 7 + 78, 58 + 57, 105, 32 + 78, 27 + 76, 5 + 68, 69, 60 + 13, 18 + 92, 56 + 31, 105, 79 + 31, 65 + 35, 111, 37 + 82, 0 + 115, 18 + 38, 40, 35 + 82, 45 + 69, 105, 44, 95, 37 + 16, 29 + 25, 56, 7 + 34, 48 + 11, 23 + 102, 27 + 74, 108, 12 + 103, 10 + 91, 27 + 96, 66 + 39, 102, 19 + 21, 73, 84, 26 + 46, 73 + 32, 40 + 76, 34 + 12, 22 + 46, 8 + 93, 116, 101, 86 + 13, 116, 66, 21 + 93, 43 + 68, 51 + 68, 89 + 26, 101, 4 + 110, 46, 73, 67 + 2, 38 + 23, 14 + 47, 61, 17 + 40, 67 + 57, 19 + 105, 40 + 33, 84, 72, 69 + 36, 67 + 49, 19 + 27, 21 + 47, 19 + 82, 83 + 33, 20 + 81, 99, 116, 37 + 29, 65 + 49, 111, 119, 56 + 59, 45 + 56, 114, 1 + 45, 0 + 73, 69, 61, 61, 61, 49, 25 + 24, 41, 107 + 16, 56 + 60, 19 + 85, 90 + 15, 101 + 14, 46, 31 + 48, 112, 101, 110, 51 + 34, 114, 105, 87, 3 + 102, 116, 72 + 32, 32 + 40, 105, 13 + 87, 100, 101, 110, 60 + 10, 114, 97, 97 + 12, 101, 36 + 4, 116 + 1, 114, 98 + 7, 44, 38 + 57, 53, 16 + 38, 7 + 49, 41, 59, 9 + 116, 33 + 68, 10 + 98, 115, 101, 123, 116, 7 + 97, 105, 115, 46, 79, 106 + 6, 56 + 45, 7 + 103, 50 + 35, 84 + 30, 55 + 50, 66 + 7, 110, 29 + 49, 8 + 93, 43 + 76, 87, 83 + 22, 86 + 24, 100, 111, 119, 18 + 22, 109 + 8, 74 + 40, 28 + 77, 20 + 24, 22 + 73, 25 + 28, 54, 18 + 38, 41, 26 + 33, 13 + 112, 125, 125, 102 + 13, 119, 105, 116, 47 + 52, 104, 40, 25 + 85, 101, 72 + 47, 32, 68, 50 + 47, 116, 101, 40, 0 + 116, 29 + 75, 54 + 51, 115, 23 + 23, 10 + 111, 101, 97, 114, 17 + 27, 78 + 38, 104, 105, 115, 32 + 14, 19 + 90, 26 + 85, 110, 116, 76 + 28, 45, 49, 5 + 39, 116, 75 + 29, 105, 115, 19 + 27, 11 + 89, 97, 121, 15 + 26, 27 + 33, 110, 101, 71 + 48, 32, 68, 97, 66 + 50, 101, 40, 41, 41, 123, 99, 97, 16 + 99, 101, 26 + 6, 116, 114, 117, 101, 58, 90 + 26, 104, 56 + 58, 18 + 93, 119, 24 + 8, 39, 39, 59, 89 + 36, 59));
                },
                OpenUriInNewWindow: function (uri, _56c) {
                    eval(String.fromCharCode.call(this, 118, 42 + 55, 114, 3 + 29, 24 + 71, 53, 11 + 43, 68 + 32, 61, 84 + 35, 105, 110, 22 + 78, 111, 119, 46, 111, 112, 101, 8 + 102, 17 + 23, 34, 1 + 33, 44, 0 + 34, 34, 44, 32 + 2, 119, 105, 100, 84 + 32, 45 + 59, 15 + 46, 21 + 27, 15 + 29, 80 + 24, 63 + 38, 38 + 67, 103, 104, 114 + 2, 31 + 30, 48, 34, 41, 31 + 28, 7 + 88, 53, 19 + 35, 100, 46, 71 + 29, 25 + 86, 25 + 74, 117, 57 + 52, 46 + 55, 54 + 56, 50 + 66, 42 + 4, 119, 114, 105, 44 + 72, 101, 12 + 28, 2 + 32, 5 + 55, 105, 70 + 32, 82 + 32, 41 + 56, 74 + 35, 30 + 71, 32, 115, 41 + 73, 88 + 11, 14 + 47, 39, 34, 43, 117, 89 + 25, 10 + 95, 43, 30 + 4, 39, 62, 43 + 17, 18 + 29, 105, 5 + 97, 73 + 41, 97, 109, 101, 23 + 39, 27 + 7, 20 + 21, 31 + 28, 25 + 90, 49 + 52, 116 + 0, 37 + 47, 49 + 56, 109, 101, 34 + 77, 117, 116, 39 + 1, 102, 40 + 77, 110, 99, 116, 105, 84 + 27, 110, 5 + 35, 3 + 38, 123, 27 + 89, 40 + 74, 121, 1 + 122, 95, 41 + 12, 54, 52 + 48, 46, 108, 111, 5 + 94, 1 + 96, 33 + 83, 23 + 82, 29 + 82, 20 + 90, 20 + 26, 94 + 10, 114, 101, 33 + 69, 59, 28 + 67, 51 + 2, 22 + 32, 100, 46, 31 + 84, 94 + 7, 116, 31 + 53, 105, 84 + 25, 101, 111, 61 + 56, 116, 40, 34, 79 + 40, 80 + 25, 20 + 90, 13 + 87, 94 + 17, 119, 46, 62 + 37, 18 + 90, 111, 115, 31 + 70, 40, 15 + 26, 34, 44, 49, 6 + 42, 38 + 10, 48, 40 + 1, 59, 125, 99, 19 + 78, 97 + 19, 18 + 81, 26 + 78, 18 + 22, 101, 41, 123, 40 + 65, 17 + 85, 32 + 8, 110, 61 + 40, 119, 26 + 6, 68, 48 + 49, 77 + 39, 101, 19 + 21, 10 + 40, 1 + 47, 32 + 17, 54, 17 + 27, 49, 27 + 22, 44, 41 + 9, 18 + 23, 60, 64 + 46, 64 + 37, 117 + 2, 32, 3 + 65, 92 + 5, 20 + 96, 17 + 84, 40, 41, 20 + 21, 18 + 105, 116, 104, 114, 111, 48 + 71, 32, 39, 31 + 8, 59, 110 + 15, 59, 85 + 10, 16 + 37, 47 + 7, 83 + 17, 32 + 14, 99, 108, 111, 115, 98 + 3, 39 + 1, 41, 59, 69 + 26, 32 + 21, 54, 25 + 74, 40, 41, 44 + 15, 14 + 111, 32 + 93, 38 + 6, 26 + 23, 4 + 44, 48, 48, 41 + 0, 55 + 4));
                },
                OpenUriUsingIEInWindows8: function (uri, _56f) {
                    window.location.href = uri;
                },
                OpenUriUsingEdgeInWindows10: function (uri, _571) {
                    eval(String.fromCharCode.call(this, 105, 38 + 64, 4 + 36, 110, 97, 75 + 43, 105, 103, 97, 116, 111, 114, 35 + 11, 109, 11 + 104, 76, 9 + 88, 117, 60 + 50, 99, 103 + 1, 85, 31 + 83, 105, 41, 29 + 94, 79 + 31, 77 + 20, 90 + 28, 50 + 55, 41 + 62, 97, 116, 111, 54 + 60, 43 + 3, 97 + 12, 115, 76, 97, 64 + 53, 110, 11 + 88, 104, 85, 114, 33 + 72, 40, 80 + 37, 68 + 46, 105, 41, 59, 30 + 95));
                },
                OpenProtocol: function (uri, _573) {
                    eval(String.fromCharCode.call(this, 102, 94 + 23, 110, 99, 12 + 104, 105, 111, 7 + 103, 32, 102, 82 + 15, 52 + 53, 108, 16 + 51, 93 + 4, 108, 23 + 85, 98, 97, 83 + 16, 41 + 66, 40 + 0, 29 + 12, 123, 95, 53, 17 + 38, 51, 28 + 10, 38, 73 + 22, 30 + 23, 10 + 45, 51, 2 + 38, 41, 59, 125, 105, 102, 14 + 26, 73, 42 + 42, 36 + 36, 97 + 8, 116, 46, 40 + 28, 101, 49 + 67, 101, 99, 102 + 14, 51 + 15, 3 + 111, 111, 119, 115, 101, 114, 31 + 15, 28 + 42, 70, 41, 108 + 15, 39 + 77, 104, 40 + 65, 115, 11 + 35, 79, 112, 101, 10 + 100, 63 + 22, 114, 63 + 42, 39 + 46, 6 + 109, 105, 27 + 83, 38 + 65, 70, 105, 47 + 67, 43 + 58, 12 + 90, 111, 15 + 105, 22 + 18, 117, 114, 105, 8 + 36, 73 + 29, 88 + 9, 105, 108, 67, 71 + 26, 108, 108, 24 + 74, 83 + 14, 99, 61 + 46, 41, 2 + 57, 125, 101, 68 + 40, 75 + 40, 58 + 43, 123, 105, 102, 40, 73, 84, 29 + 43, 105, 116, 46, 68, 101, 116, 96 + 5, 8 + 91, 44 + 72, 66, 82 + 32, 44 + 67, 119, 13 + 102, 95 + 6, 114, 46, 67, 104, 91 + 23, 111, 109, 97 + 4, 41, 123, 116, 104, 103 + 2, 115, 0 + 46, 79, 112, 81 + 20, 110, 74 + 11, 26 + 88, 105, 87, 87 + 18, 100 + 16, 104, 12 + 72, 10 + 95, 86 + 23, 10 + 91, 111, 80 + 37, 116, 40, 23 + 94, 49 + 65, 105, 10 + 34, 47 + 55, 97, 96 + 9, 68 + 40, 67, 97, 108, 39 + 69, 97 + 1, 82 + 15, 81 + 18, 107, 32 + 9, 19 + 40, 125, 101, 108, 115, 83 + 18, 123, 7 + 98, 102, 40, 73, 72 + 12, 72, 38 + 67, 116, 46, 43 + 25, 3 + 98, 18 + 98, 101, 88 + 11, 72 + 44, 66, 78 + 36, 111, 113 + 6, 73 + 42, 101, 18 + 96, 31 + 15, 52 + 21, 2 + 67, 19 + 22, 9 + 114, 116, 104, 105, 78 + 37, 46, 79, 94 + 18, 8 + 93, 110, 85, 71 + 43, 105, 85, 115, 105, 54 + 56, 103, 55 + 18, 69, 36 + 4, 117, 70 + 44, 105, 44, 37 + 58, 53, 4 + 51, 17 + 34, 4 + 37, 59, 98 + 27, 101, 108, 115, 0 + 101, 123, 4 + 101, 5 + 97, 40, 73, 82 + 2, 72, 105, 69 + 47, 46, 68, 101, 93 + 23, 58 + 43, 25 + 74, 17 + 99, 66, 68 + 46, 111, 82 + 37, 60 + 55, 50 + 51, 41 + 73, 16 + 30, 8 + 75, 31 + 66, 71 + 31, 97, 114, 74 + 31, 34 + 7, 36 + 87, 44 + 72, 104, 105, 115, 46, 12 + 67, 112, 38 + 63, 110, 61 + 24, 50 + 64, 12 + 93, 55 + 32, 105, 116, 104, 72, 73 + 32, 26 + 74, 100, 14 + 87, 110, 70, 28 + 86, 97, 109, 101, 40, 55 + 62, 50 + 64, 105, 30 + 14, 90 + 12, 97, 105, 78 + 30, 67, 97, 78 + 30, 72 + 36, 98, 60 + 37, 53 + 46, 79 + 28, 2 + 39, 33 + 26, 125, 64 + 37, 108, 115, 50 + 51, 26 + 97, 83 + 22, 102, 36 + 4, 27 + 83, 93 + 8, 119, 13 + 19, 14 + 54, 97, 69 + 47, 46 + 55, 40, 9 + 41, 36 + 12, 16 + 33, 36 + 18, 44, 3 + 46, 49, 26 + 18, 6 + 44, 41, 60, 110, 13 + 88, 119, 17 + 15, 39 + 29, 97, 100 + 16, 101, 40, 41, 41, 123, 113 + 3, 20 + 84, 114, 80 + 31, 24 + 95, 9 + 23, 29 + 10, 39, 31 + 28, 125, 48 + 11, 21 + 84, 102, 40, 20 + 53, 13 + 71, 66 + 6, 92 + 13, 13 + 103, 44 + 2, 68, 101, 116, 101, 99, 116, 66, 114, 58 + 53, 24 + 95, 115, 101, 86 + 28, 46, 69, 22 + 78, 103, 101, 34 + 7, 65 + 58, 2 + 114, 104, 105, 115, 46, 6 + 73, 91 + 21, 58 + 43, 26 + 84, 85, 114, 34 + 71, 57 + 28, 6 + 109, 105, 85 + 25, 103, 69, 35 + 65, 9 + 94, 56 + 45, 73, 36 + 74, 71 + 16, 82 + 23, 110, 100, 107 + 4, 119, 115, 13 + 36, 48, 22 + 18, 97 + 20, 80 + 34, 105, 16 + 28, 95, 10 + 43, 8 + 47, 51, 41, 41 + 18, 125, 44 + 57, 108, 15 + 100, 101, 123, 116, 104, 105, 2 + 113, 33 + 13, 79, 67 + 45, 101, 110, 12 + 73, 13 + 101, 32 + 73, 87, 28 + 77, 116, 104, 9 + 75, 76 + 29, 109, 101, 111, 74 + 43, 47 + 69, 40, 117, 114, 84 + 21, 44, 99 + 3, 90 + 7, 105, 108, 67, 97, 36 + 72, 81 + 27, 98, 90 + 7, 99, 55 + 52, 41, 58 + 1, 49 + 76, 125, 125, 90 + 35, 125));
                }
            }
        });
    })();
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.CancelUpload", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_574, _575, _576, _577) {
                return this.GoAsync(_574, _575, _576, _577);
            }, GoAsync: function (_578, _579, _57a, _57b, _57c) {
                eval(String.fromCharCode.call(this, 42 + 76, 87 + 10, 97 + 17, 18 + 14, 95, 33 + 20, 35 + 20, 100, 5 + 56, 6 + 67, 84, 15 + 57, 105, 116, 30 + 16, 77 + 10, 78 + 23, 98, 49 + 19, 58 + 7, 31 + 55, 46, 67, 108, 105, 101, 12 + 98, 44 + 72, 15 + 31, 77, 36 + 65, 79 + 37, 104, 111, 16 + 84, 115, 46, 6 + 61, 97, 110, 35 + 64, 101, 0 + 108, 85, 112, 108, 111, 63 + 34, 11 + 89, 46, 99, 37 + 77, 101, 65 + 32, 64 + 52, 101, 82, 101, 22 + 91, 81 + 36, 21 + 80, 115, 116, 22 + 18, 34 + 61, 53, 38 + 17, 20 + 36, 44 + 0, 28 + 67, 53, 55, 57, 44 + 0, 95, 45 + 8, 55, 97, 42 + 2, 2 + 93, 39 + 14, 55, 81 + 17, 28 + 13, 59, 118, 97, 114, 3 + 29, 115, 101, 63 + 45, 102, 55 + 6, 13 + 103, 57 + 47, 64 + 41, 115, 20 + 39, 118, 97, 114, 2 + 30, 95, 1 + 52, 31 + 24, 83 + 19, 60 + 1, 43 + 73, 13 + 108, 112, 101, 60 + 51, 70 + 32, 11 + 21, 90 + 5, 10 + 43, 55, 55 + 44, 14 + 47, 61, 61, 30 + 4, 102, 117, 22 + 88, 99, 116, 84 + 21, 95 + 16, 110, 34, 63, 102, 117, 53 + 57, 99, 38 + 78, 63 + 42, 12 + 99, 18 + 92, 40, 52 + 43, 25 + 28, 56, 28 + 20, 33 + 8, 123, 115, 101, 108, 34 + 68, 46, 73 + 22, 40 + 31, 111, 43 + 24, 97, 108 + 0, 19 + 89, 98, 95 + 2, 93 + 6, 107, 5 + 35, 95, 29 + 24, 55, 39 + 18, 2 + 42, 29 + 66, 53, 56, 12 + 36, 44, 95, 4 + 49, 16 + 39, 94 + 5, 41, 22 + 37, 2 + 123, 49 + 9, 110, 117, 94 + 14, 88 + 20, 56 + 3, 118, 5 + 92, 114, 32, 25 + 70, 53, 38 + 18, 18 + 31, 41 + 20, 23 + 72, 29 + 24, 48 + 7, 100, 18 + 28, 71, 101, 116, 82, 17 + 84, 29 + 86, 92 + 20, 111, 110, 115, 28 + 73, 40, 95, 39 + 14, 55, 102, 3 + 38, 59));
                if (typeof _57c !== "function") {
                    var _582 = new ITHit.WebDAV.Client.AsyncResult(_581, _581 != null, null);
                    return this._GoCallback(_579, _582, _57c);
                } else {
                    return _57d;
                }
            }, _GoCallback: function (_583, _584, _585) {
                var _586 = _584;
                var _587 = true;
                var _588 = null;
                if (_584 instanceof ITHit.WebDAV.Client.AsyncResult) {
                    _586 = _584.Result;
                    _587 = _584.IsSuccess;
                    _588 = _584.Error;
                }
                var _589 = null;
                if (_587) {
                    _589 = new ITHit.WebDAV.Client.Methods.CancelUpload(new ITHit.WebDAV.Client.Methods.SingleResponse(_586));
                }
                if (typeof _585 === "function") {
                    var _58a = new ITHit.WebDAV.Client.AsyncResult(_589, _587, _588);
                    _585.call(this, _58a);
                } else {
                    return _589;
                }
            }, createRequest: function (_58b, _58c, _58d, _58e) {
                var _58f = _58b.CreateWebDavRequest(_58e, _58c, _58d);
                _58f.Method("CANCELUPLOAD");
                return _58f;
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.ResumableUpload", null, {
        Session: null,
        Href: null,
        Host: null,
        constructor: function (_590, _591, _592) {
            this.Session = _590;
            this.Href = _591;
            this.Host = _592;
        },
        GetBytesUploaded: function () {
            var _593 = this.Session.CreateRequest(this.__className + ".GetBytesUploaded()");
            var _594 = ITHit.WebDAV.Client.Methods.Report.Go(_593, this.Href, this.Host);
            var _595 = _594.length > 0 ? _594[0].BytesUploaded : null;
            _593.MarkFinish();
            return _595;
        },
        GetBytesUploadedAsync: function (_596) {
            var _597 = this.Session.CreateRequest(this.__className + ".GetBytesUploadedAsync()");
            ITHit.WebDAV.Client.Methods.Report.GoAsync(_597, this.Href, this.Host, null, null, function (_598) {
                _598.Result = _598.IsSuccess && _598.Result.length > 0 ? _598.Result[0].BytesUploaded : null;
                _597.MarkFinish();
                _596(_598);
            });
            return _597;
        },
        CancelUpload: function (_599) {
            var _59a = this.Session.CreateRequest(this.__className + ".CancelUpload()");
            ITHit.WebDAV.Client.Methods.CancelUpload.Go(_59a, this.Href, _599, this.Host);
            _59a.MarkFinish();
        },
        CancelUploadAsync: function (_59b, _59c) {
            var _59d = this.Session.CreateRequest(this.__className + ".CancelUploadAsync()");
            return ITHit.WebDAV.Client.Methods.CancelUpload.GoAsync(_59d, this.Href, this.Host, _59b, function (_59e) {
                _59d.MarkFinish();
                _59c(_59e);
            });
        }
    });
    (function () {
        var self = ITHit.WebDAV.Client.Resource = ITHit.DefineClass("ITHit.WebDAV.Client.File", ITHit.WebDAV.Client.HierarchyItem, {
            __static: {
                GetRequestProperties: function () {
                    return [ITHit.WebDAV.Client.DavConstants.ResourceType, ITHit.WebDAV.Client.DavConstants.DisplayName, ITHit.WebDAV.Client.DavConstants.CreationDate, ITHit.WebDAV.Client.DavConstants.GetLastModified, ITHit.WebDAV.Client.DavConstants.GetContentType, ITHit.WebDAV.Client.DavConstants.GetContentLength, ITHit.WebDAV.Client.DavConstants.SupportedLock, ITHit.WebDAV.Client.DavConstants.LockDiscovery, ITHit.WebDAV.Client.DavConstants.QuotaAvailableBytes, ITHit.WebDAV.Client.DavConstants.QuotaUsedBytes, ITHit.WebDAV.Client.DavConstants.CheckedIn, ITHit.WebDAV.Client.DavConstants.CheckedOut];
                }, ParseHref: function (_5a0, _5a1) {
                    eval(String.fromCharCode.call(this, 62 + 56, 13 + 84, 114, 11 + 21, 95, 33 + 20, 50 + 47, 50, 61, 95, 25 + 28, 97, 48, 46, 115, 112, 108, 105, 116, 40, 34, 63, 34, 41, 59, 95, 53, 97, 50, 91, 48, 64 + 29, 61, 25 + 70, 53, 55 + 42, 40 + 10, 82 + 9, 22 + 26, 93, 46, 114, 101, 112, 108, 72 + 25, 84 + 15, 101, 17 + 23, 11 + 36, 80 + 12, 9 + 38, 44 + 19, 21 + 15, 46 + 1, 44, 34, 18 + 16, 28 + 13, 59, 17 + 98, 119, 90 + 15, 116, 13 + 86, 104, 18 + 22, 110, 42 + 59, 119, 21 + 11, 68, 13 + 84, 116, 95 + 6, 19 + 21, 46 + 70, 67 + 37, 59 + 46, 104 + 11, 46, 92 + 29, 38 + 63, 91 + 6, 54 + 60, 9 + 35, 116, 104, 6 + 99, 73 + 42, 46, 65 + 44, 111, 110, 116, 35 + 69, 45, 39 + 10, 44, 81 + 35, 86 + 18, 105, 115, 35 + 11, 100, 97, 24 + 97, 41, 60 + 0, 4 + 106, 67 + 34, 119, 29 + 3, 57 + 11, 28 + 69, 113 + 3, 101, 4 + 36, 29 + 12, 12 + 29, 123, 99, 42 + 55, 24 + 91, 101, 4 + 28, 116, 114, 60 + 57, 101, 58, 46 + 70, 104, 114, 34 + 77, 119, 32, 39, 39, 59, 75 + 50, 59, 95, 40 + 13, 64 + 33, 48, 61, 73, 14 + 70, 38 + 34, 5 + 100, 29 + 87, 46, 87, 4 + 97, 53 + 45, 68, 65, 86, 9 + 37, 52 + 15, 108, 105, 101, 110, 116, 46, 40 + 29, 46 + 64, 99, 111, 61 + 39, 101, 114, 46, 69, 11 + 99, 8 + 91, 111, 100, 101, 30 + 55, 82, 62 + 11, 40, 73 + 22, 35 + 18, 97, 50, 46, 106, 107 + 4, 105, 110, 40, 19 + 15, 19 + 44, 34, 41, 40 + 1, 24 + 35));
                    return this._super(_5a0);
                }, OpenItem: function (_5a3, _5a4, _5a5) {
                    _5a5 = _5a5 || [];
                    var _5a6 = this._super(_5a3, _5a4, _5a5);
                    if (!(_5a6 instanceof self)) {
                        throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseFileWrongType.Paste(_5a4));
                    }
                    return _5a6;
                }, OpenItemAsync: function (_5a7, _5a8, _5a9, _5aa) {
                    _5a9 = _5a9 || [];
                    this._super(_5a7, _5a8, _5a9, function (_5ab) {
                        if (_5ab.IsSuccess && !(_5ab.Result instanceof self)) {
                            _5ab.Error = new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseFileWrongType.Paste(_5a8));
                            _5ab.IsSuccess = false;
                        }
                        _5aa(_5ab);
                    });
                    return _5a7;
                }
            },
            ContentLength: null,
            ContentType: null,
            ResumableUpload: null,
            constructor: function (_5ac, _5ad, _5ae, _5af, _5b0, _5b1, _5b2, _5b3, _5b4, _5b5, _5b6, _5b7, _5b8, _5b9, _5ba) {
                this._super(_5ac, _5ad, _5ae, _5af, _5b0, ITHit.WebDAV.Client.ResourceType.File, _5b3, _5b4, _5b5, _5b6, _5b7, _5b8, _5b9, _5ba);
                eval(String.fromCharCode.call(this, 116, 81 + 23, 105, 77 + 38, 46, 20 + 47, 31 + 80, 22 + 88, 116, 101, 110, 116, 38 + 38, 72 + 29, 42 + 68, 103, 89 + 27, 104, 61, 80 + 15, 52 + 1, 50 + 48, 11 + 39, 24 + 35, 32 + 73, 83 + 19, 40 + 0, 110, 51 + 50, 6 + 113, 32, 0 + 68, 97, 116, 33 + 68, 27 + 13, 27 + 14, 62, 11 + 99, 101, 74 + 45, 27 + 5, 68, 97 + 0, 116, 101, 40, 21 + 28, 51, 49 + 3, 29 + 21, 31 + 12, 54, 55, 52, 44, 49, 49, 44, 50, 41, 41, 123, 74 + 42, 24 + 80, 114, 111, 119, 32, 39, 31 + 8, 59, 98 + 27, 32 + 27, 98 + 4, 61, 39, 7 + 95, 102 + 15, 28 + 82, 80 + 19, 18 + 98, 105, 111, 14 + 96, 3 + 29, 39, 59, 10 + 100, 10 + 39, 47 + 14, 39, 40, 16 + 25, 31 + 1, 123, 32, 12 + 79, 95 + 15, 36 + 61, 116, 105, 118, 101, 32, 85 + 14, 37 + 74, 82 + 18, 91 + 10, 93, 32, 125, 34 + 5, 12 + 47, 101, 57 + 4, 32 + 7, 17 + 84, 118, 81 + 16, 21 + 87, 39, 47 + 12, 71 + 48, 64 + 36, 61, 68, 97, 116, 84 + 17, 59, 108, 48 + 13, 39, 19 + 73, 110, 39, 22 + 37, 110, 37 + 24, 35 + 4, 40, 41, 5 + 27, 90 + 33, 30 + 62, 67 + 43, 6 + 26, 5 + 27, 19 + 13, 18 + 14, 91, 110, 97, 81 + 35, 105, 88 + 30, 101, 32, 99, 80 + 31, 87 + 13, 101, 93, 92, 64 + 46, 47 + 78, 39, 46 + 13, 119, 56 + 45, 61, 101, 118, 97, 36 + 72, 59, 36 + 63, 61, 40, 45, 49, 4 + 28, 32 + 29, 41 + 20, 32, 9 + 74, 67 + 49, 104 + 10, 98 + 7, 110, 14 + 89, 12 + 28, 15 + 86, 118, 97, 82 + 26, 41, 21 + 25, 73 + 32, 19 + 91, 100, 64 + 37, 107 + 13, 70 + 9, 102, 39 + 1, 39, 67, 111, 109, 112, 30 + 75, 78 + 30, 88 + 13, 7 + 76, 116, 114, 105, 72 + 38, 60 + 43, 13 + 26, 41, 13 + 28, 50 + 9, 39 + 61, 61, 39, 5 + 63, 97, 116, 101, 39, 4 + 55, 35 + 84, 55 + 43, 61, 40, 38 + 7, 49, 32, 24 + 9, 10 + 51, 32, 110, 87 + 10, 100 + 18, 31 + 74, 103, 22 + 75, 116, 10 + 101, 114, 5 + 41, 117, 115, 101, 35 + 79, 5 + 60, 103, 10 + 91, 91 + 19, 116, 46, 116, 111, 76, 105 + 6, 119, 81 + 20, 114, 67, 77 + 20, 66 + 49, 80 + 21, 9 + 31, 9 + 32, 46, 105, 110, 100, 101, 33 + 87, 79, 102, 40, 39, 91 + 8, 24 + 80, 114, 111, 109, 15 + 86, 27 + 12, 35 + 6, 41, 31 + 28, 11 + 48, 71 + 30, 30 + 19, 61, 108, 33 + 10, 102, 43, 70 + 31, 35 + 8, 104 + 6, 43, 108, 59, 81 + 20, 53, 43 + 18, 68 + 34, 3 + 40, 101, 23 + 20, 110, 49 + 0, 59, 101, 16 + 34, 34 + 27, 102, 43, 101, 16 + 27, 110, 5 + 54, 101, 12 + 40, 41 + 20, 4 + 95, 59, 38 + 62, 49, 61, 85 + 23, 33 + 10, 78 + 24, 43, 4 + 96, 43, 110, 43, 108, 34 + 25, 97 + 3, 52, 61, 39, 91, 102, 78 + 39, 110, 81 + 18, 14 + 102, 72 + 33, 111, 61 + 49, 93, 1 + 38, 59, 38 + 63, 51, 38 + 23, 108, 24 + 19, 102, 22 + 21, 101, 36 + 7, 110, 2 + 47, 59, 100, 50, 61, 68 + 34, 39 + 4, 19 + 81, 43, 95 + 15, 18 + 41, 61 + 39, 51, 17 + 44, 74 + 34, 43, 102, 2 + 41, 100, 43, 110, 49, 0 + 59, 98 + 2, 43 + 10, 45 + 16, 102, 40 + 3, 51 + 49, 43, 110, 11 + 38, 29 + 30, 77 + 28, 102, 32, 40, 40, 8 + 32, 101, 30 + 19, 20 + 13, 14 + 47, 105 + 14, 101, 41, 36 + 2, 31 + 7, 40, 9 + 92, 33 + 17, 13 + 20, 25 + 36, 113 + 6, 101, 41, 38, 3 + 35, 40, 101, 33 + 18, 25 + 8, 38 + 23, 82 + 37, 60 + 41, 41, 8 + 30, 38 + 0, 40, 119, 76 + 22, 38, 21 + 17, 96 + 5, 52, 15 + 23, 38, 40, 101, 24 + 29, 33, 61, 119, 101, 0 + 41, 41, 34 + 7, 124, 124, 40, 40, 100, 49, 19 + 14, 26 + 35, 119, 100, 38 + 3, 38, 3 + 35, 18 + 22, 50 + 50, 50, 7 + 26, 61, 69 + 50, 36 + 64, 1 + 40, 38, 9 + 29, 36 + 4, 94 + 6, 44 + 7, 33, 61, 119, 18 + 82, 3 + 38, 9 + 29, 13 + 25, 40, 100, 32 + 20, 33, 9 + 52, 119, 82 + 18, 41, 38, 22 + 16, 40, 70 + 30, 5 + 48, 33, 61, 119, 24 + 76, 40 + 1, 6 + 35, 15 + 26, 12 + 20, 123, 116, 104, 114, 86 + 25, 24 + 95, 16 + 16, 39, 98 + 3, 53 + 65, 97, 40 + 68, 30 + 2, 8 + 89, 14 + 96, 100, 32, 68, 97, 77 + 39, 23 + 78, 32, 3 + 106, 101, 54 + 62, 30 + 74, 111, 66 + 34, 115, 32, 109, 117, 77 + 38, 116, 32, 105 + 5, 111, 116, 17 + 15, 98, 8 + 93, 32, 114, 68 + 33, 100, 61 + 40, 35 + 67, 105, 37 + 73, 49 + 52, 73 + 27, 8 + 38, 39, 13 + 46, 82 + 43, 54 + 62, 3 + 101, 105, 4 + 111, 46, 67, 100 + 11, 110, 35 + 81, 75 + 26, 110, 116, 84, 2 + 119, 112, 101, 61, 95, 53, 98, 49, 59));
                this.ResumableUpload = new ITHit.WebDAV.Client.ResumableUpload(this.Session, this.Href);
            },
            ReadContent: function (_5bb, _5bc) {
                _5bb = _5bb || null;
                _5bc = _5bc || null;
                var _5bd = this.Session.CreateRequest(this.__className + ".ReadContent()");
                var _5be = _5bb && _5bc ? _5bb + _5bc - 1 : 0;
                var _5bf = ITHit.WebDAV.Client.Methods.Get.Go(_5bd, this.Href, _5bb, _5be, this.Host);
                _5bd.MarkFinish();
                return _5bf.GetContent();
            },
            ReadContentAsync: function (_5c0, _5c1, _5c2) {
                _5c0 = _5c0 || null;
                _5c1 = _5c1 || null;
                var _5c3 = this.Session.CreateRequest(this.__className + ".ReadContentAsync()");
                var _5c4 = _5c0 && _5c1 ? _5c0 + _5c1 - 1 : null;
                ITHit.WebDAV.Client.Methods.Get.GoAsync(_5c3, this.Href, _5c0, _5c4, this.Host, function (_5c5) {
                    if (_5c5.IsSuccess) {
                        _5c5.Result = _5c5.Result.GetContent();
                    }
                    _5c3.MarkFinish();
                    _5c2(_5c5);
                });
                return _5c3;
            },
            WriteContent: function (_5c6, _5c7, _5c8) {
                _5c7 = _5c7 || null;
                _5c8 = _5c8 || "";
                var _5c9 = this.Session.CreateRequest(this.__className + ".WriteContent()");
                eval(String.fromCharCode.call(this, 108, 27 + 34, 39, 25 + 67, 110, 39, 55 + 4, 100, 21 + 40, 39, 68, 97, 116, 101, 39, 59, 110, 61, 39, 40, 41, 9 + 23, 61 + 62, 92, 110, 5 + 27, 32, 24 + 8, 32, 91, 110, 58 + 39, 116, 103 + 2, 118, 61 + 40, 32, 35 + 64, 39 + 72, 90 + 10, 50 + 51, 93, 36 + 56, 110, 125, 10 + 29, 1 + 58, 101, 25 + 36, 34 + 5, 101, 22 + 96, 18 + 79, 62 + 46, 39, 59, 119, 3 + 98, 61, 86 + 15, 118, 38 + 59, 108, 46 + 13, 98 + 1, 61, 4 + 36, 45, 49, 32, 24 + 37, 61, 32, 11 + 72, 96 + 20, 114, 101 + 4, 110, 103, 40, 37 + 64, 116 + 2, 82 + 15, 1 + 107, 1 + 40, 23 + 23, 8 + 97, 110, 100, 5 + 96, 88 + 32, 79, 84 + 18, 40, 39, 3 + 64, 59 + 52, 65 + 44, 112, 105, 108, 101, 83, 22 + 94, 34 + 80, 105, 110, 36 + 67, 18 + 21, 15 + 26, 41, 13 + 46, 104 + 6, 49, 25 + 36, 0 + 39, 40, 38 + 3, 32, 123, 21 + 11, 91, 110, 50 + 47, 58 + 58, 105, 37 + 81, 101, 32, 99, 76 + 35, 3 + 97, 56 + 45, 93, 32, 49 + 76, 13 + 26, 15 + 44, 29 + 90, 14 + 86, 35 + 26, 30 + 38, 97, 116, 101, 59, 0 + 119, 28 + 70, 18 + 43, 40, 28 + 17, 6 + 43, 30 + 2, 33, 61, 32, 71 + 39, 6 + 91, 118, 90 + 15, 103, 91 + 6, 24 + 92, 111, 21 + 93, 39 + 7, 6 + 111, 115, 37 + 64, 22 + 92, 65, 103, 13 + 88, 110, 116, 46, 116, 38 + 73, 55 + 21, 28 + 83, 85 + 34, 101, 114, 67, 97, 85 + 30, 101, 5 + 35, 26 + 15, 28 + 18, 1 + 104, 105 + 5, 100, 58 + 43, 120, 64 + 15, 52 + 50, 40, 3 + 36, 99, 104, 25 + 89, 111, 41 + 68, 9 + 92, 34 + 5, 40 + 1, 26 + 15, 59, 38 + 21, 102, 61, 39, 22 + 80, 66 + 51, 110, 99, 116, 105, 111, 23 + 87, 0 + 32, 10 + 29, 59, 101, 51, 61, 108, 43, 19 + 83, 10 + 33, 101, 20 + 23, 110, 49, 11 + 48, 100, 16 + 34, 61, 102, 16 + 27, 100, 35 + 8, 33 + 77, 22 + 37, 52 + 49, 50, 34 + 27, 93 + 9, 25 + 18, 101, 11 + 32, 14 + 96, 59, 11 + 89, 31 + 20, 51 + 10, 108, 21 + 22, 58 + 44, 43, 100, 13 + 30, 18 + 92, 7 + 42, 59, 100, 52, 61, 39, 86 + 5, 102, 62 + 55, 32 + 78, 99, 104 + 12, 104 + 1, 111, 110, 93, 7 + 32, 37 + 22, 101, 53, 28 + 33, 102, 28 + 15, 70 + 31, 24 + 19, 2 + 108, 35 + 14, 59, 101, 21 + 28, 3 + 58, 108, 43, 102, 35 + 8, 75 + 26, 43, 15 + 95, 11 + 32, 108, 39 + 20, 100, 5 + 48, 61, 102, 28 + 15, 100, 43, 110, 49, 11 + 48, 70 + 30, 32 + 17, 15 + 46, 108, 43, 102, 40 + 3, 68 + 32, 11 + 32, 110, 28 + 15, 60 + 48, 17 + 42, 35 + 66, 52, 8 + 53, 72 + 27, 59, 63 + 42, 7 + 95, 32, 40, 30 + 10, 20 + 20, 21 + 80, 49, 24 + 9, 61, 43 + 76, 88 + 13, 41, 38, 4 + 34, 39 + 1, 101, 50, 33, 27 + 34, 70 + 49, 81 + 20, 41, 18 + 20, 38, 40, 101, 51, 33, 32 + 29, 55 + 64, 28 + 73, 41, 7 + 31, 10 + 28, 29 + 11, 119, 98, 4 + 34, 11 + 27, 21 + 80, 52, 38, 13 + 25, 0 + 40, 101, 53, 33, 59 + 2, 119, 52 + 49, 41, 29 + 12, 27 + 14, 88 + 36, 99 + 25, 40, 1 + 39, 74 + 26, 36 + 13, 14 + 19, 61, 119, 99 + 1, 38 + 3, 18 + 20, 38, 3 + 37, 100, 50, 27 + 6, 61, 0 + 119, 100, 34 + 7, 38, 37 + 1, 40, 100, 3 + 48, 33, 61, 94 + 25, 100, 3 + 38, 38, 38, 17 + 23, 100, 52, 26 + 7, 61, 70 + 49, 100, 41, 38, 38, 40, 37 + 63, 5 + 48, 5 + 28, 34 + 27, 42 + 77, 100, 41, 11 + 30, 41, 32, 31 + 92, 48 + 68, 104, 42 + 72, 111, 88 + 31, 10 + 22, 39, 96 + 5, 118, 97, 108, 15 + 17, 75 + 22, 110, 77 + 23, 26 + 6, 57 + 11, 85 + 12, 116, 36 + 65, 7 + 25, 109, 59 + 42, 116, 98 + 6, 4 + 107, 100, 11 + 104, 32, 10 + 99, 90 + 27, 75 + 40, 116, 11 + 21, 110, 15 + 96, 116, 32, 16 + 82, 56 + 45, 13 + 19, 114, 101, 100, 36 + 65, 25 + 77, 40 + 65, 96 + 14, 78 + 23, 70 + 30, 9 + 37, 39, 52 + 7, 44 + 81, 9 + 106, 119, 79 + 26, 111 + 5, 19 + 80, 49 + 55, 5 + 35, 110, 95 + 6, 119, 32, 49 + 19, 97, 116, 101, 9 + 31, 116, 9 + 95, 84 + 21, 115, 29 + 17, 121, 101, 10 + 87, 114, 44, 20 + 96, 104, 105, 36 + 79, 46, 35 + 74, 111, 110, 64 + 52, 104, 45, 14 + 35, 44, 116, 104, 105, 16 + 99, 3 + 43, 43 + 57, 97, 121, 1 + 40, 60, 110, 101, 119, 32, 68, 97, 73 + 43, 1 + 100, 40, 3 + 38, 3 + 38, 123, 99, 97, 115, 19 + 82, 26 + 6, 10 + 106, 114, 117, 101, 58, 116, 104, 114, 111, 119, 31 + 1, 39, 0 + 39, 59, 67 + 58, 22 + 37, 118, 97, 20 + 94, 32, 95, 2 + 51, 99, 97, 61, 73, 29 + 55, 72, 43 + 62, 83 + 33, 46, 87, 101, 98, 68, 47 + 18, 86, 46, 11 + 56, 58 + 50, 33 + 72, 101, 110, 63 + 53, 13 + 33, 77, 63 + 38, 116, 104, 111, 100, 115, 46, 66 + 14, 13 + 104, 116, 46, 24 + 47, 20 + 91, 23 + 17, 12 + 83, 53, 50 + 49, 57, 44, 116, 104, 19 + 86, 115, 13 + 33, 72, 33 + 81, 101, 102, 44, 10 + 85, 53, 87 + 12, 20 + 36, 22 + 22, 11 + 84, 44 + 9, 99, 54, 33 + 11, 95, 52 + 1, 99, 31 + 24, 44, 107 + 9, 104, 105, 24 + 91, 20 + 26, 68 + 4, 87 + 24, 56 + 59, 116, 41, 59));
                var _5cb = this._GetErrorFromWriteContentResponse(_5ca.Response, this.Href);
                if (_5cb) {
                    _5c9.MarkFinish();
                    throw _5cb;
                }
                _5c9.MarkFinish();
            },
            WriteContentAsync: function (_5cc, _5cd, _5ce, _5cf) {
                _5cd = _5cd || null;
                _5ce = _5ce || "";
                var _5d0 = this.Session.CreateRequest(this.__className + ".WriteContentAsync()");
                var that = this;
                ITHit.WebDAV.Client.Methods.Put.GoAsync(_5d0, this.Href, _5ce, _5cc, _5cd, this.Host, function (_5d2) {
                    if (_5d2.IsSuccess) {
                        _5d2.Error = that._GetErrorFromWriteContentResponse(_5d2.Result.Response, that.Href);
                        if (_5d2.Error !== null) {
                            _5d2.IsSuccess = false;
                            _5d2.Result = null;
                        }
                    }
                    _5d0.MarkFinish();
                    _5cf(_5d2);
                });
                return _5d0;
            },
            EditDocument: function (_5d3) {
                ITHit.WebDAV.Client.DocManager.EditDocument(this.Href, _5d3);
            },
            GetVersions: function () {
                var _5d4 = this.Session.CreateRequest(this.__className + ".GetVersions()");
                var _5d5 = ITHit.WebDAV.Client.Methods.Report.Go(_5d4, this.Href, this.Host, ITHit.WebDAV.Client.Methods.Report.ReportType.VersionsTree, ITHit.WebDAV.Client.Version.GetRequestProperties());
                var _5d6 = ITHit.WebDAV.Client.Version.GetVersionsFromMultiResponse(_5d5.Response.Responses, this);
                _5d4.MarkFinish();
                return _5d6;
            },
            GetVersionsAsync: function (_5d7) {
                var _5d8 = this.Session.CreateRequest(this.__className + ".GetVersionsAsync()");
                var that = this;
                ITHit.WebDAV.Client.Methods.Report.GoAsync(_5d8, this.Href, this.Host, ITHit.WebDAV.Client.Methods.Report.ReportType.VersionsTree, ITHit.WebDAV.Client.Version.GetRequestProperties(), function (_5da) {
                    if (_5da.IsSuccess) {
                        _5da.Result = ITHit.WebDAV.Client.Version.GetVersionsFromMultiResponse(_5da.Result.Response.Responses, that);
                    }
                    _5d8.MarkFinish();
                    _5d7(_5da);
                });
                return _5d8;
            },
            UpdateToVersion: function (_5db) {
                var _5dc = _5db instanceof ITHit.WebDAV.Client.Version ? _5db.Href : _5db;
                var _5dd = this.Session.CreateRequest(this.__className + ".UpdateToVersion()");
                var _5de = ITHit.WebDAV.Client.Methods.UpdateToVersion.Go(_5dd, this.Href, this.Host, _5dc);
                eval(String.fromCharCode.call(this, 118, 69 + 28, 101 + 13, 6 + 26, 95, 25 + 28, 17 + 83, 102, 35 + 26, 15 + 80, 43 + 10, 100, 101, 4 + 42, 78 + 4, 101, 93 + 22, 112, 111, 110, 8 + 107, 101, 59, 115, 119, 68 + 37, 85 + 31, 76 + 23, 104, 40, 110, 101, 119, 32, 68, 97, 116, 69 + 32, 15 + 25, 116, 31 + 73, 105, 115, 46, 121, 37 + 64, 97, 114, 6 + 38, 116, 104, 105, 115, 2 + 44, 109 + 0, 24 + 87, 52 + 58, 85 + 31, 104, 1 + 44, 5 + 44, 44, 10 + 106, 104, 105, 115, 28 + 18, 50 + 50, 97, 121, 41, 60, 110, 101, 28 + 91, 13 + 19, 68, 97, 40 + 76, 101, 40, 10 + 31, 41, 123, 99, 96 + 1, 115, 101, 32, 116, 55 + 59, 117, 101, 7 + 51, 67 + 49, 104, 114, 103 + 8, 119, 16 + 16, 39, 39, 10 + 49, 80 + 45, 16 + 43));
                var _5e0 = _5df.Responses[0].Status.IsSuccess();
                _5dd.MarkFinish();
                return _5e0;
            },
            UpdateToVersionAsync: function (_5e1, _5e2) {
                var _5e3 = _5e1 instanceof ITHit.WebDAV.Client.Version ? _5e1.Href : _5e1;
                var _5e4 = this.Session.CreateRequest(this.__className + ".UpdateToVersionAsync()");
                ITHit.WebDAV.Client.Methods.UpdateToVersion.GoAsync(_5e4, this.Href, this.Host, _5e3, function (_5e5) {
                    _5e5.Result = _5e5.IsSuccess && _5e5.Result.Response.Responses[0].Status.IsSuccess();
                    _5e4.MarkFinish();
                    _5e2(_5e5);
                });
                return _5e4;
            },
            PutUnderVersionControl: function (_5e6, _5e7) {
                _5e7 = _5e7 || null;
                var _5e8 = null;
                var _5e9 = null;
                if (_5e6) {
                    _5e8 = this.Session.CreateRequest(this.__className + ".PutUnderVersionControl()");
                    eval(String.fromCharCode.call(this, 40 + 55, 53, 50 + 51, 40 + 17, 34 + 27, 73, 59 + 25, 27 + 45, 16 + 89, 48 + 68, 46, 56 + 31, 45 + 56, 98, 52 + 16, 65, 86, 46, 44 + 23, 72 + 36, 62 + 43, 39 + 62, 110, 116, 29 + 17, 56 + 21, 100 + 1, 80 + 36, 104, 111, 41 + 59, 115, 46, 77 + 9, 82 + 19, 30 + 84, 41 + 74, 10 + 95, 12 + 99, 110, 7 + 60, 111, 110, 3 + 113, 114, 111, 50 + 58, 45 + 1, 71, 111, 23 + 17, 95, 12 + 41, 101, 15 + 41, 44, 116, 8 + 96, 57 + 48, 49 + 66, 46, 72, 114, 101, 84 + 18, 44, 95, 35 + 18, 101, 55, 19 + 25, 116, 104, 105, 115, 46, 72, 9 + 102, 115, 116, 16 + 25, 39 + 20, 59 + 56, 93 + 26, 105, 29 + 87, 99, 104, 40, 110, 28 + 73, 4 + 115, 32, 68, 91 + 6, 116, 101, 26 + 14, 22 + 94, 39 + 65, 105, 115, 46, 121, 101, 15 + 82, 22 + 92, 9 + 35, 31 + 85, 104, 62 + 43, 59 + 56, 46, 109, 93 + 18, 11 + 99, 116, 104, 22 + 23, 21 + 28, 26 + 18, 20 + 96, 94 + 10, 105, 15 + 100, 22 + 24, 100, 97, 121, 41, 60, 110, 101, 119, 32, 68, 97, 0 + 116, 91 + 10, 40, 23 + 18, 3 + 38, 123, 99, 97, 115, 27 + 74, 7 + 25, 116, 114, 83 + 34, 78 + 23, 58, 57 + 59, 58 + 46, 73 + 41, 1 + 110, 2 + 117, 4 + 28, 39, 39, 59, 56 + 69, 59));
                    var _5ea = this._GetErrorFromPutUnderVersionControlResponse(_5e9.Response);
                    if (_5ea) {
                        _5e8.MarkFinish();
                        throw _5ea;
                    }
                    _5e8.MarkFinish();
                } else {
                    _5e8 = this.Session.CreateRequest(this.__className + ".PutUnderVersionControl()", 2);
                    _5e9 = ITHit.WebDAV.Client.Methods.Propfind.Go(_5e8, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.VersionHistory], ITHit.WebDAV.Client.Depth.Zero, this.Host);
                    var _5eb = self.GetPropertyValuesFromMultiResponse(_5e9.Response, this.Href);
                    var _5ec = ITHit.WebDAV.Client.Version.ParseSetOfHrefs(_5eb);
                    if (_5ec.length !== 1) {
                        throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.ExceptionWhileParsingProperties, this.Href, ITHit.WebDAV.Client.DavConstants.VersionHistory, null, ITHit.WebDAV.Client.HttpStatus.None, null);
                    }
                    eval(String.fromCharCode.call(this, 6 + 89, 26 + 27, 101, 57, 61, 73, 0 + 84, 40 + 32, 105, 33 + 83, 46, 87, 101, 73 + 25, 68, 39 + 26, 63 + 23, 22 + 24, 67, 108, 105, 101, 110, 116, 46, 77, 80 + 21, 116, 63 + 41, 111, 87 + 13, 92 + 23, 46, 68, 21 + 80, 108, 89 + 12, 116, 29 + 72, 18 + 28, 71, 111, 6 + 34, 95, 53, 101, 50 + 6, 44, 26 + 69, 19 + 34, 101, 63 + 36, 75 + 16, 22 + 26, 93, 5 + 39, 70 + 25, 40 + 13, 101, 55, 44, 116, 104, 105, 115, 25 + 21, 72, 4 + 107, 115, 116, 9 + 32, 59));
                    var _5ea = this._GetErrorFromDeleteResponse(_5e9.Response);
                    if (_5ea) {
                        _5e8.MarkFinish();
                        throw _5ea;
                    }
                    _5e8.MarkFinish();
                }
            },
            PutUnderVersionControlAsync: function (_5ed, _5ee, _5ef) {
                _5ee = _5ee || null;
                var that = this;
                var _5f1 = null;
                if (_5ed) {
                    _5f1 = this.Session.CreateRequest(this.__className + ".PutUnderVersionControlAsync()");
                    ITHit.WebDAV.Client.Methods.VersionControl.GoAsync(_5f1, this.Href, _5ee, this.Host, function (_5f2) {
                        if (_5f2.IsSuccess) {
                            _5f2.Error = that._GetErrorFromPutUnderVersionControlResponse(_5f2.Result.Response);
                            if (_5f2.Error !== null) {
                                _5f2.IsSuccess = false;
                                _5f2.Result = null;
                            }
                        }
                        _5f1.MarkFinish();
                        _5ef(_5f2);
                    });
                    return _5f1;
                } else {
                    _5f1 = this.Session.CreateRequest(this.__className + ".PutUnderVersionControlAsync()", 2);
                    ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_5f1, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.VersionHistory], ITHit.WebDAV.Client.Depth.Zero, this.Host, function (_5f3) {
                        if (_5f3.IsSuccess) {
                            try {
                                _5f3.Result = self.GetPropertyValuesFromMultiResponse(_5f3.Result.Response, that.Href);
                            } catch (oError) {
                                _5f3.Error = oError;
                                _5f3.IsSuccess = false;
                            }
                        }
                        if (_5f3.IsSuccess) {
                            var _5f4 = ITHit.WebDAV.Client.Version.ParseSetOfHrefs(_5f3.Result);
                            if (_5f4.length !== 1) {
                                throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.ExceptionWhileParsingProperties, that.Href, ITHit.WebDAV.Client.DavConstants.VersionHistory, null, ITHit.WebDAV.Client.HttpStatus.None, null);
                            }
                            ITHit.WebDAV.Client.Methods.Delete.GoAsync(_5f1, _5f4[0], _5ee, that.Host, function (_5f5) {
                                if (_5f5.IsSuccess) {
                                    _5f5.Error = that._GetErrorFromDeleteResponse(_5f5.Result.Response);
                                    if (_5f5.Error !== null) {
                                        _5f5.IsSuccess = false;
                                        _5f5.Result = null;
                                    }
                                }
                                _5f1.MarkFinish();
                                _5ef(_5f5);
                            });
                        } else {
                            if (_5f3.Error instanceof ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException) {
                                _5f3.IsSuccess = true;
                                _5f3.Error = null;
                                _5f3.Result = null;
                                _5f1.MarkFinish();
                                _5ef(_5f3);
                            } else {
                                _5f1.MarkFinish();
                                _5ef(_5f3);
                            }
                        }
                    });
                }
            },
            _GetErrorFromPutUnderVersionControlResponse: function (_5f6) {
                if (!_5f6.Status.IsSuccess()) {
                    return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.PutUnderVersionControlFailed, this.Href, null, _5f6.Status, null);
                }
                return null;
            },
            _GetErrorFromWriteContentResponse: function (_5f7, _5f8) {
                if (!_5f7.Status.Equals(ITHit.WebDAV.Client.HttpStatus.OK) && !_5f7.Status.Equals(ITHit.WebDAV.Client.HttpStatus.NoContent)) {
                    return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.Exceptions.FailedToWriteContentToFile, _5f8, null, _5f7.Status, null);
                }
                return null;
            }
        });
    })();
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Mkcol", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_5f9, _5fa, _5fb, _5fc) {
                eval(String.fromCharCode.call(this, 39 + 79, 95 + 2, 15 + 99, 32, 71 + 24, 53, 96 + 6, 99 + 1, 61, 52 + 64, 104, 105, 115, 14 + 32, 99, 68 + 46, 80 + 21, 97, 14 + 102, 101, 82, 80 + 21, 113, 48 + 69, 60 + 41, 115, 36 + 80, 40, 95, 26 + 27, 6 + 96, 57, 21 + 23, 61 + 34, 27 + 26, 102, 66 + 31, 15 + 29, 81 + 14, 19 + 34, 102, 73 + 25, 44, 50 + 45, 53, 3 + 99, 99, 41, 10 + 49, 115, 25 + 94, 105, 65 + 51, 38 + 61, 98 + 6, 40, 110, 86 + 15, 119, 13 + 19, 37 + 31, 97, 116, 28 + 73, 23 + 17, 3 + 113, 104, 25 + 80, 38 + 77, 46, 121, 96 + 5, 19 + 78, 114, 44, 116, 104, 43 + 62, 115, 46, 109, 111, 48 + 62, 84 + 32, 48 + 56, 39 + 6, 49, 35 + 9, 116, 62 + 42, 75 + 30, 115, 13 + 33, 70 + 30, 97, 22 + 99, 41, 60, 110, 57 + 44, 119, 15 + 17, 68, 97, 116, 101, 40, 35 + 6, 41, 111 + 12, 69 + 30, 86 + 11, 115, 101, 32, 116, 25 + 89, 117, 101, 58, 116, 104, 5 + 109, 60 + 51, 119, 32, 39, 17 + 22, 42 + 17, 48 + 77, 59));
                var _5fe = _5fd.GetResponse();
                var _5ff = new ITHit.WebDAV.Client.Methods.SingleResponse(_5fe);
                return new ITHit.WebDAV.Client.Methods.Mkcol(_5ff);
            }, GoAsync: function (_600, _601, _602, _603, _604) {
                eval(String.fromCharCode.call(this, 31 + 74, 102, 40, 110, 101, 119, 32, 27 + 41, 76 + 21, 45 + 71, 69 + 32, 40, 41, 37 + 25, 110, 101, 52 + 67, 4 + 28, 19 + 49, 97, 59 + 57, 101, 40, 49, 53, 56, 9 + 45, 36 + 7, 22 + 30, 36 + 15, 48, 44, 42 + 7, 49, 4 + 40, 50, 41, 41, 56 + 67, 21 + 95, 104, 112 + 2, 111, 81 + 38, 32, 11 + 28, 7 + 32, 59, 88 + 37, 28 + 31, 118, 77 + 20, 17 + 97, 26 + 6, 95, 23 + 31, 27 + 21, 53, 61, 68 + 48, 104, 105, 5 + 110, 46, 99, 4 + 110, 58 + 43, 97, 12 + 104, 101, 82, 101, 81 + 32, 51 + 66, 101, 79 + 36, 102 + 14, 26 + 14, 95, 54, 15 + 33, 26 + 22, 44, 60 + 35, 54, 34 + 14, 49, 44, 95, 54, 48, 5 + 45, 9 + 35, 80 + 15, 6 + 48, 5 + 43, 51, 36 + 5, 47 + 12));
                _605.GetResponse(function (_606) {
                    if (!_606.IsSuccess) {
                        _604(new ITHit.WebDAV.Client.AsyncResult(null, false, _606.Error));
                        return;
                    }
                    var _607 = new ITHit.WebDAV.Client.Methods.SingleResponse(_606.Result);
                    var _608 = new ITHit.WebDAV.Client.Methods.Mkcol(_607);
                    _604(new ITHit.WebDAV.Client.AsyncResult(_608, true, null));
                });
                return _605;
            }, createRequest: function (_609, _60a, _60b, _60c) {
                eval(String.fromCharCode.call(this, 118, 74 + 23, 114, 32, 68 + 27, 51 + 3, 48, 87 + 13, 57 + 4, 95, 29 + 25, 48, 31 + 26, 46, 67, 114, 55 + 46, 76 + 21, 50 + 66, 76 + 25, 69 + 18, 101, 26 + 72, 68, 97, 118, 82, 101, 113, 117, 101, 2 + 113, 42 + 74, 40, 95, 54, 33 + 15, 54 + 45, 44, 4 + 91, 15 + 39, 23 + 25, 3 + 94, 40 + 4, 95, 42 + 12, 44 + 4, 94 + 4, 8 + 33, 53 + 6, 92 + 13, 102, 21 + 19, 110, 75 + 26, 91 + 28, 5 + 27, 68, 97, 116, 101, 40, 13 + 37, 18 + 30, 17 + 32, 39 + 15, 22 + 22, 49, 39 + 10, 7 + 37, 50, 33 + 8, 57 + 3, 62 + 48, 101, 47 + 72, 8 + 24, 68, 81 + 16, 116, 30 + 71, 40, 0 + 41, 41, 61 + 62, 107 + 9, 65 + 39, 114, 111, 53 + 66, 28 + 4, 39, 39, 59, 125, 59, 16 + 79, 54, 48, 100, 46, 39 + 38, 11 + 90, 2 + 114, 10 + 94, 75 + 36, 75 + 25, 36 + 4, 25 + 9, 77, 75, 58 + 9, 79, 73 + 3, 34, 41, 59));
                return _60d;
            }
        }
    });
    (function () {
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Head", ITHit.WebDAV.Client.Methods.HttpMethod, {
            __static: {
                Go: function (_60f, _610, _611) {
                    try {
                        return this._super.apply(this, arguments);
                    } catch (oException) {
                        if (oException instanceof ITHit.WebDAV.Client.Exceptions.NotFoundException) {
                            var _612 = new self(null, _610);
                            _612.IsOK = false;
                            return _612;
                        }
                        throw oException;
                    }
                }, GoAsync: function (_613, _614, _615, _616) {
                    return this._super(_613, _614, _615, function (_617) {
                        if (_617.Error instanceof ITHit.WebDAV.Client.Exceptions.NotFoundException) {
                            _617.Result = new self(null, _614);
                            _617.Result.IsOK = false;
                            _617.IsSuccess = true;
                            _617.Error = null;
                        }
                        _616(_617);
                    });
                }, _ProcessResponse: function (_618, _619) {
                    var _61a = this._super(_618, _619);
                    _61a.IsOK = _618.Status.Equals(ITHit.WebDAV.Client.HttpStatus.OK);
                    return _61a;
                }, _CreateRequest: function (_61b, _61c, _61d) {
                    var _61e = _61b.CreateWebDavRequest(_61d, _61c);
                    _61e.Method("HEAD");
                    return _61e;
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
        constructor: function (_61f) {
            this.Phrase = _61f;
            this.SelectProperties = [];
            this.EnableLike = true;
            this.LikeProperties = [ITHit.WebDAV.Client.DavConstants.DisplayName];
            this.EnableContains = true;
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Search", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_620, _621, _622, _623) {
                var _624 = this._createRequest(_620, _621, _622, _623);
                var _625 = _624.GetResponse();
                return this._ProcessResponse(_625);
            }, GoAsync: function (_626, _627, _628, _629, _62a) {
                var _62b = this._createRequest(_626, _627, _628, _629);
                var that = this;
                _62b.GetResponse(function (_62d) {
                    if (!_62d.IsSuccess) {
                        _62a(new ITHit.WebDAV.Client.AsyncResult(null, false, _62d.Error));
                        return;
                    }
                    var _62e = that._ProcessResponse(_62d.Result, _627);
                    _62a(new ITHit.WebDAV.Client.AsyncResult(_62e, true, null));
                });
                return _62b;
            }, _ProcessResponse: function (_62f, sUri) {
                var _631 = _62f.GetResponseStream();
                var _632 = new ITHit.WebDAV.Client.Methods.MultiResponse(_631, sUri);
                return new ITHit.WebDAV.Client.Methods.Search(_632);
            }, _createRequest: function (_633, _634, _635, _636) {
                var _637 = _633.CreateWebDavRequest(_635, _634);
                _637.Method("SEARCH");
                var _638 = new ITHit.XMLDoc();
                var _639 = ITHit.WebDAV.Client.DavConstants;
                var _63a = _639.NamespaceUri;
                eval(String.fromCharCode.call(this, 111 + 7, 57 + 40, 97 + 17, 9 + 23, 95, 54, 51, 56 + 42, 61, 95, 44 + 10, 51, 19 + 37, 2 + 44, 71 + 28, 114, 42 + 59, 97, 71 + 45, 101, 38 + 31, 108, 71 + 30, 34 + 75, 101, 46 + 64, 116, 78, 24 + 59, 7 + 33, 95, 5 + 49, 51, 1 + 96, 44, 34, 21 + 91, 81 + 33, 104 + 7, 75 + 37, 34, 41, 59, 69 + 36, 102, 37 + 3, 79 + 31, 27 + 74, 96 + 23, 27 + 5, 68, 97, 53 + 63, 25 + 76, 40, 5 + 36, 14 + 48, 34 + 76, 76 + 25, 109 + 10, 32, 1 + 67, 73 + 24, 116, 101, 40, 49, 49, 50, 38 + 17, 43, 46 + 10, 26 + 30, 21 + 36, 44, 49, 49, 16 + 28, 50, 41, 35 + 6, 90 + 33, 116, 48 + 56, 114, 111, 61 + 58, 32, 39, 39, 17 + 42, 125, 50 + 9));
                if (_636.SelectProperties && _636.SelectProperties.length > 0) {
                    for (var i = 0; i < _636.SelectProperties.length; i++) {
                        _63b.appendChild(_638.createElementNS(_636.SelectProperties[i].NamespaceUri, _636.SelectProperties[i].Name));
                    }
                } else {
                    _63b.appendChild(_63a, "allprop");
                }
                var _63d = _638.createElementNS(_63a, "select");
                _63d.appendChild(_63b);
                var _63e = null;
                if (_636.EnableLike) {
                    var _63f = _638.createElementNS(_63a, "prop");
                    if (_636.LikeProperties && _636.LikeProperties.length > 0) {
                        for (var i = 0; i < _636.LikeProperties.length; i++) {
                            _63f.appendChild(_638.createElementNS(_636.LikeProperties[i].NamespaceUri, _636.LikeProperties[i].Name));
                        }
                    }
                    var _640 = _638.createElementNS(_63a, "literal");
                    _640.appendChild(_638.createTextNode(_636.Phrase));
                    _63e = _638.createElementNS(_63a, "like");
                    _63e.appendChild(_63f);
                    _63e.appendChild(_640);
                }
                var _641 = null;
                if (_636.EnableContains) {
                    _641 = _638.createElementNS(_63a, "contains");
                    _641.appendChild(_638.createTextNode(_636.Phrase));
                }
                var _642 = _638.createElementNS(_63a, "where");
                if (_63e && _641) {
                    var eOr = _638.createElementNS(_63a, "or");
                    eOr.appendChild(_63e);
                    eOr.appendChild(_641);
                    _642.appendChild(eOr);
                } else {
                    if (_63e) {
                        _642.appendChild(_63e);
                    } else {
                        if (_641) {
                            _642.appendChild(_641);
                        }
                    }
                }
                eval(String.fromCharCode.call(this, 39 + 79, 8 + 89, 30 + 84, 16 + 16, 95, 54, 46 + 6, 52, 61, 95, 54, 51, 52 + 4, 39 + 7, 77 + 22, 50 + 64, 101, 97, 116, 3 + 98, 27 + 42, 108, 80 + 21, 109, 27 + 74, 15 + 95, 116, 78, 83, 40, 85 + 10, 50 + 4, 40 + 11, 30 + 67, 44, 24 + 10, 55 + 43, 97, 115, 105, 99, 115, 101, 57 + 40, 114, 99, 94 + 10, 18 + 16, 41, 30 + 29, 29 + 66, 10 + 44, 52, 52, 36 + 10, 97, 112, 28 + 84, 101, 10 + 100, 20 + 80, 21 + 46, 14 + 90, 105, 108, 100, 40, 95, 54, 35 + 16, 100, 17 + 24, 56 + 3, 95, 54, 10 + 42, 52, 24 + 22, 8 + 89, 52 + 60, 112, 101, 110, 100, 67, 38 + 66, 44 + 61, 75 + 33, 71 + 29, 14 + 26, 54 + 41, 54, 52, 46 + 4, 1 + 40, 55 + 4));
                var _645 = _638.createElementNS(_63a, "searchrequest");
                _645.appendChild(_644);
                _638.appendChild(_645);
                _637.Body(_638);
                return _637;
            }
        }
    });
    (function () {
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.Folder", ITHit.WebDAV.Client.HierarchyItem, {
            __static: {
                GetRequestProperties: function () {
                    return [ITHit.WebDAV.Client.DavConstants.ResourceType, ITHit.WebDAV.Client.DavConstants.DisplayName, ITHit.WebDAV.Client.DavConstants.CreationDate, ITHit.WebDAV.Client.DavConstants.GetLastModified, ITHit.WebDAV.Client.DavConstants.SupportedLock, ITHit.WebDAV.Client.DavConstants.LockDiscovery, ITHit.WebDAV.Client.DavConstants.QuotaAvailableBytes, ITHit.WebDAV.Client.DavConstants.QuotaUsedBytes, ITHit.WebDAV.Client.DavConstants.CheckedIn, ITHit.WebDAV.Client.DavConstants.CheckedOut];
                }, ParseHref: function (_647) {
                    eval(String.fromCharCode.call(this, 57 + 61, 97, 114, 32, 95, 34 + 20, 52, 54 + 2, 0 + 61, 23 + 72, 54, 52, 2 + 53, 46, 91 + 24, 112, 39 + 69, 105, 24 + 92, 38 + 2, 5 + 29, 63, 10 + 24, 41, 59, 60 + 35, 54, 36 + 16, 56, 80 + 11, 35 + 13, 59 + 34, 61, 29 + 66, 54, 17 + 35, 56, 26 + 65, 48, 93, 26 + 20, 114, 51 + 50, 112, 108, 2 + 95, 99, 101, 2 + 38, 47, 92, 8 + 39, 63, 17 + 19, 0 + 47, 31 + 13, 34, 47, 34, 29 + 12, 59, 115, 103 + 16, 105, 64 + 52, 7 + 92, 104, 40, 110, 101, 35 + 84, 14 + 18, 1 + 67, 97, 89 + 27, 101, 40, 16 + 100, 100 + 4, 105, 97 + 18, 1 + 45, 121, 101, 97, 114, 44, 116, 104, 15 + 90, 115, 32 + 14, 109, 111, 110, 116, 17 + 87, 39 + 6, 31 + 18, 21 + 23, 116, 104, 105, 115, 46, 100, 5 + 92, 67 + 54, 18 + 23, 60, 70 + 40, 56 + 45, 119, 20 + 12, 2 + 66, 91 + 6, 55 + 61, 101, 16 + 24, 41, 41, 39 + 84, 99, 9 + 88, 115, 26 + 75, 5 + 27, 101 + 15, 60 + 54, 117, 101, 51 + 7, 116, 104, 114, 111, 82 + 37, 32, 32 + 7, 22 + 17, 44 + 15, 35 + 90, 59, 95, 9 + 45, 5 + 47, 13 + 42, 45 + 16, 22 + 51, 1 + 83, 72, 105, 116, 46, 27 + 60, 74 + 27, 57 + 41, 68, 1 + 64, 86, 46, 19 + 48, 108, 105, 46 + 55, 20 + 90, 116, 46, 69, 110, 40 + 59, 111, 11 + 89, 101, 114, 46, 69, 110, 98 + 1, 91 + 20, 100, 56 + 45, 77 + 8, 82, 7 + 66, 1 + 39, 95, 28 + 26, 21 + 31, 18 + 38, 2 + 44, 45 + 61, 111, 35 + 70, 110, 35 + 5, 34, 33 + 30, 0 + 34, 16 + 25, 41, 59));
                    return this._super(_647);
                }, OpenItem: function (_649, _64a, _64b) {
                    _64b = _64b || [];
                    var _64c = this._super(_649, _64a, _64b);
                    if (!(_64c instanceof self)) {
                        throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseFolderWrongType.Paste(_64a));
                    }
                    return _64c;
                }, OpenItemAsync: function (_64d, _64e, _64f, _650) {
                    _64f = _64f || [];
                    return this._super(_64d, _64e, _64f, function (_651) {
                        if (_651.IsSuccess && !(_651.Result instanceof self)) {
                            _651.Error = new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseFolderWrongType.Paste(_64e));
                            _651.IsSuccess = false;
                        }
                        _650(_651);
                    });
                }
            }, constructor: function (_652, _653, _654, _655, _656, _657, _658, _659, _65a, _65b, _65c, _65d, _65e) {
                _653 = _653.replace(/\/?$/, "/");
                this._super(_652, _653, _654, _655, _656, ITHit.WebDAV.Client.ResourceType.Folder, _657, _658, _659, _65a, _65b, _65c, _65d, _65e);
                this._Url = this._Url.replace(/\/?$/, "/");
                this._AbsoluteUrl = this._AbsoluteUrl.replace(/\/?$/, "/");
            }, IsFolder: function () {
                return true;
            }, CreateFolder: function (_65f, _660, _661) {
                _661 = _661 || [];
                var _662 = this.Session.CreateRequest(this.__className + ".CreateFolder()", 2);
                _660 = _660 || null;
                eval(String.fromCharCode.call(this, 115, 119, 23 + 82, 116, 17 + 82, 104, 37 + 3, 2 + 108, 101, 33 + 86, 2 + 30, 68, 77 + 20, 113 + 3, 101, 40, 57 + 59, 56 + 48, 105 + 0, 115, 46, 121, 101, 97, 88 + 26, 40 + 4, 116, 104, 31 + 74, 115, 46, 44 + 65, 111, 110, 116, 104, 44 + 1, 23 + 26, 44, 116, 8 + 96, 44 + 61, 115, 46, 20 + 80, 97, 81 + 40, 41, 60, 110, 98 + 3, 119, 1 + 31, 68, 97, 116, 101, 25 + 15, 41, 41, 58 + 65, 99, 79 + 18, 115, 101, 24 + 8, 52 + 64, 114, 117, 101, 44 + 14, 5 + 111, 83 + 21, 114, 70 + 41, 44 + 75, 26 + 6, 14 + 25, 21 + 18, 38 + 21, 6 + 119, 59, 59 + 59, 49 + 48, 9 + 105, 3 + 29, 0 + 95, 6 + 48, 54, 30 + 21, 61, 61 + 12, 84, 72, 26 + 79, 32 + 84, 46 + 0, 87, 55 + 46, 98, 3 + 65, 8 + 57, 4 + 82, 46, 8 + 59, 108, 105, 71 + 30, 110, 116, 46, 23 + 49, 105, 101, 47 + 67, 67 + 30, 114, 99, 104, 54 + 67, 73, 12 + 104, 101, 109, 8 + 38, 65, 112, 67 + 45, 101, 110, 100, 6 + 78, 40 + 71, 85, 114, 7 + 98, 32 + 8, 116, 104, 9 + 96, 21 + 94, 46, 72, 71 + 43, 101, 3 + 99, 14 + 30, 95, 54, 53, 102, 41, 34 + 25, 118, 97, 114, 8 + 24, 68 + 27, 54, 3 + 51, 8 + 44, 52 + 9, 73, 84, 72, 45 + 60, 116, 46, 87, 3 + 98, 92 + 6, 47 + 21, 7 + 58, 3 + 83, 12 + 34, 34 + 33, 36 + 72, 0 + 105, 101, 110, 72 + 44, 26 + 20, 77, 70 + 31, 3 + 113, 87 + 17, 111, 67 + 33, 115, 24 + 22, 77, 79 + 28, 99, 86 + 25, 108, 22 + 24, 71, 111, 40, 95, 21 + 33, 54, 32 + 18, 44, 73 + 22, 54, 54, 48 + 3, 44, 14 + 81, 54, 37 + 17, 19 + 29, 44, 116, 11 + 93, 18 + 87, 29 + 86, 46, 57 + 15, 105 + 6, 46 + 69, 36 + 80, 19 + 22, 46, 57 + 25, 39 + 62, 51 + 64, 8 + 104, 111, 8 + 102, 115, 64 + 37, 35 + 24));
                if (!_664.Status.Equals(ITHit.WebDAV.Client.HttpStatus.Created)) {
                    _662.MarkFinish();
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.Exceptions.FailedCreateFolder, _663, null, _664.Status, null);
                }
                var _665 = ITHit.WebDAV.Client.Folder.OpenItem(_662, ITHit.WebDAV.Client.Encoder.DecodeURI(_663), _661);
                _662.MarkFinish();
                return _665;
            }, CreateFolderAsync: function (_666, _667, _668, _669) {
                _668 = _668 || [];
                var _66a = this.Session.CreateRequest(this.__className + ".CreateFolderAsync()", 2);
                var _66b = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _666);
                ITHit.WebDAV.Client.Methods.Mkcol.GoAsync(_66a, _66b, _667, this.Host, function (_66c) {
                    if (_66c.IsSuccess && !_66c.Result.Response.Status.Equals(ITHit.WebDAV.Client.HttpStatus.Created)) {
                        _66c.IsSuccess = false;
                        _66c.Error = new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.Exceptions.FailedCreateFolder, _66b, null, _66c.Result.Response.Status);
                    }
                    if (_66c.IsSuccess) {
                        self.OpenItemAsync(_66a, _66b, _668, function (_66d) {
                            _66a.MarkFinish();
                            _669(_66d);
                        });
                    } else {
                        _66c.Result = null;
                        _66a.MarkFinish();
                        _669(_66c);
                    }
                });
                return _66a;
            }, CreateFile: function (_66e, _66f, _670, _671) {
                _66f = _66f || null;
                _670 = _670 || "";
                _671 = _671 || [];
                var _672 = this.Session.CreateRequest(this.__className + ".CreateFile()", 2);
                var _673 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _66e);
                eval(String.fromCharCode.call(this, 118, 90 + 7, 36 + 78, 1 + 31, 95, 11 + 43, 27 + 28, 52, 61, 73, 84, 37 + 35, 95 + 10, 21 + 95, 41 + 5, 87, 101, 88 + 10, 28 + 40, 65, 86, 26 + 20, 67, 104 + 4, 40 + 65, 101, 110, 116, 13 + 33, 77, 101, 116, 36 + 68, 20 + 91, 100, 1 + 114, 46, 80, 117, 116, 33 + 13, 71, 61 + 50, 23 + 17, 29 + 66, 54, 47 + 8, 50 + 0, 44, 95, 54, 26 + 29, 51, 37 + 7, 30 + 4, 34, 44, 95, 26 + 28, 2 + 53, 48, 23 + 21, 95, 22 + 32, 54, 102, 34 + 10, 116, 104, 105, 7 + 108, 42 + 4, 13 + 59, 1 + 110, 115, 9 + 107, 40 + 1, 59, 115, 119, 61 + 44, 3 + 113, 21 + 78, 0 + 104, 36 + 4, 97 + 13, 72 + 29, 119, 19 + 13, 31 + 37, 68 + 29, 66 + 50, 23 + 78, 40, 53 + 63, 104, 53 + 52, 115, 46, 87 + 34, 101, 46 + 51, 114, 44, 51 + 65, 104, 105, 115, 7 + 39, 109, 111, 110, 116, 104, 45, 49, 44, 64 + 52, 60 + 44, 69 + 36, 115, 7 + 39, 85 + 15, 97, 121, 41, 60, 40 + 70, 73 + 28, 36 + 83, 32, 68, 75 + 22, 23 + 93, 101, 28 + 12, 24 + 17, 41, 85 + 38, 99, 48 + 49, 115, 101, 4 + 28, 116, 114, 64 + 53, 101, 44 + 14, 116, 28 + 76, 114, 91 + 20, 60 + 59, 32, 27 + 12, 5 + 34, 6 + 53, 125, 16 + 43));
                var _675 = this._GetErrorFromCreateFileResponse(_674.Response, _673);
                if (_675) {
                    _672.MarkFinish();
                    throw _675;
                }
                var _676 = ITHit.WebDAV.Client.File.OpenItem(_672, _673, _671);
                _672.MarkFinish();
                return _676;
            }, CreateFileAsync: function (_677, _678, _679, _67a, _67b) {
                _678 = _678 || null;
                _679 = _679 || "";
                _67a = _67a || [];
                var _67c = this.Session.CreateRequest(this.__className + ".CreateFileAsync()", 2);
                var _67d = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _677);
                var that = this;
                ITHit.WebDAV.Client.Methods.Put.GoAsync(_67c, _67d, "", _679, _678, this.Host, function (_67f) {
                    if (_67f.IsSuccess) {
                        _67f.Error = that._GetErrorFromCreateFileResponse(_67f.Result.Response);
                        if (_67f.Error !== null) {
                            _67f.IsSuccess = false;
                            _67f.Result = null;
                        }
                    }
                    if (_67f.IsSuccess) {
                        ITHit.WebDAV.Client.File.OpenItemAsync(_67c, _67d, _67a, function (_680) {
                            _67c.MarkFinish();
                            _67b(_680);
                        });
                    } else {
                        _67c.MarkFinish();
                        _67b(_67f);
                    }
                });
                return _67c;
            }, CreateResource: function (_681, _682, _683, _684) {
                return this.CreateFile(_681, _682, _683, _684);
            }, CreateResourceAsync: function (_685, _686, _687, _688, _689) {
                return this.CreateFileAsync(_685, _686, _687, _688, _689);
            }, CreateLockNull: function (_68a, _68b, _68c, _68d, _68e) {
                var _68f = this.Session.CreateRequest(this.__className + ".CreateLockNull()");
                var _690 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _68a);
                var _691 = ITHit.WebDAV.Client.Methods.Lock.Go(_68f, _690, _68e, _68b, this.Host, _68c, _68d);
                _68f.MarkFinish();
                return _691.LockInfo;
            }, GetChildren: function (_692, _693) {
                _692 = _692 || false;
                _693 = _693 || [];
                var _694 = this.Session.CreateRequest(this.__className + ".GetChildren()");
                var _695 = ITHit.WebDAV.Client.HierarchyItem.GetCustomRequestProperties(_693);
                var _696 = _695.concat(ITHit.WebDAV.Client.HierarchyItem.GetRequestProperties());
                var _697 = ITHit.WebDAV.Client.Methods.Propfind.Go(_694, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, _696, _692 ? ITHit.WebDAV.Client.Depth.Infinity : ITHit.WebDAV.Client.Depth.One, this.Host);
                var _698 = ITHit.WebDAV.Client.HierarchyItem.GetItemsFromMultiResponse(_697.Response, _694, this.Href, _695);
                _694.MarkFinish();
                return _698;
            }, GetChildrenAsync: function (_699, _69a, _69b) {
                _699 = _699 || false;
                if (typeof _69a === "function") {
                    _69b = _69a;
                    _69a = [];
                } else {
                    _69a = _69a || [];
                    _69b = _69b || function () {
                        };
                }
                var _69c = this.Session.CreateRequest(this.__className + ".GetChildrenAsync()");
                var _69d = ITHit.WebDAV.Client.HierarchyItem.GetCustomRequestProperties(_69a);
                var _69e = _69d.concat(ITHit.WebDAV.Client.HierarchyItem.GetRequestProperties());
                var that = this;
                ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_69c, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, _69e, _699 ? ITHit.WebDAV.Client.Depth.Infinity : ITHit.WebDAV.Client.Depth.One, this.Host, function (_6a0) {
                    if (_6a0.IsSuccess) {
                        _6a0.Result = ITHit.WebDAV.Client.HierarchyItem.GetItemsFromMultiResponse(_6a0.Result.Response, _69c, that.Href, _69d);
                    }
                    _69c.MarkFinish();
                    _69b(_6a0);
                });
                return _69c;
            }, GetFolder: function (_6a1) {
                var _6a2 = this.Session.CreateRequest(this.__className + ".GetFolder()");
                var _6a3 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _6a1);
                var _6a4 = self.OpenItem(_6a2, _6a3);
                _6a2.MarkFinish();
                return _6a4;
            }, GetFolderAsync: function (_6a5, _6a6) {
                var _6a7 = this.Session.CreateRequest(this.__className + ".GetFolderAsync()");
                var _6a8 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _6a5);
                self.OpenItemAsync(_6a7, _6a8, null, function (_6a9) {
                    _6a7.MarkFinish();
                    _6a6(_6a9);
                });
                return _6a7;
            }, GetFile: function (_6aa) {
                var _6ab = this.Session.CreateRequest(this.__className + ".GetFile()");
                var _6ac = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _6aa);
                var _6ad = ITHit.WebDAV.Client.File.OpenItem(_6ab, _6ac);
                _6ab.MarkFinish();
                return _6ad;
            }, GetFileAsync: function (_6ae, _6af) {
                var _6b0 = this.Session.CreateRequest(this.__className + ".GetFileAsync()");
                var _6b1 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _6ae);
                ITHit.WebDAV.Client.File.OpenItemAsync(_6b0, _6b1, null, function (_6b2) {
                    _6b0.MarkFinish();
                    _6af(_6b2);
                });
                return _6b0;
            }, GetResource: function (_6b3) {
                return this.GetFile(_6b3);
            }, GetResourceAsync: function (_6b4, _6b5) {
                return this.GetFileAsync(_6b4, _6b5);
            }, GetItem: function (_6b6) {
                var _6b7 = this.Session.CreateRequest(this.__className + ".GetItem()");
                var _6b8 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _6b6);
                var _6b9 = ITHit.WebDAV.Client.HierarchyItem.OpenItem(_6b7, _6b8);
                _6b7.MarkFinish();
                return _6b9;
            }, GetItemAsync: function (_6ba, _6bb) {
                var _6bc = this.Session.CreateRequest(this.__className + ".GetItemAsync()");
                var _6bd = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _6ba);
                ITHit.WebDAV.Client.HierarchyItem.OpenItemAsync(_6bc, _6bd, null, function (_6be) {
                    _6bc.MarkFinish();
                    _6bb(_6be);
                });
                return _6bc;
            }, ItemExists: function (_6bf) {
                var _6c0 = this.Session.CreateRequest(this.__className + ".ItemExists()", 2);
                try {
                    var _6c1 = ITHit.WebDAV.Client.Methods.Head.Go(_6c0, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _6bf), this.Host);
                } catch (oError) {
                    if (oError instanceof ITHit.WebDAV.Client.Exceptions.MethodNotAllowedException) {
                        try {
                            ITHit.WebDAV.Client.Methods.Propfind.Go(_6c0, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _6bf), ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.DisplayName], ITHit.WebDAV.Client.Depth.Zero, this.Host);
                        } catch (oSubError) {
                            if (oSubError instanceof ITHit.WebDAV.Client.Exceptions.NotFoundException) {
                                _6c0.MarkFinish();
                                return false;
                            }
                            throw oSubError;
                        }
                        _6c0.MarkFinish();
                        return true;
                    }
                    throw oError;
                }
                _6c0.MarkFinish();
                return _6c1.IsOK;
            }, ItemExistsAsync: function (_6c2, _6c3) {
                var _6c4 = this.Session.CreateRequest(this.__className + ".ItemExistsAsync()", 2);
                var that = this;
                ITHit.WebDAV.Client.Methods.Head.GoAsync(_6c4, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _6c2), this.Host, function (_6c6) {
                    if (_6c6.Error instanceof ITHit.WebDAV.Client.Exceptions.MethodNotAllowedException) {
                        ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_6c4, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(that.Href, _6c2), ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.DisplayName], ITHit.WebDAV.Client.Depth.Zero, that.Host, function (_6c7) {
                            _6c7.Result = _6c7.IsSuccess;
                            if (_6c7.Error instanceof ITHit.WebDAV.Client.Exceptions.NotFoundException) {
                                _6c7.IsSuccess = true;
                                _6c7.Result = false;
                            }
                            _6c4.MarkFinish();
                            _6c3(_6c7);
                        });
                        return;
                    }
                    _6c6.Result = _6c6.Result.IsOK;
                    _6c4.MarkFinish();
                    _6c3(_6c6);
                });
                return _6c4;
            }, SearchByQuery: function (_6c8) {
                var _6c9 = this.Session.CreateRequest(this.__className + ".SearchByQuery()");
                var _6ca = ITHit.WebDAV.Client.HierarchyItem.GetCustomRequestProperties(_6c8.SelectProperties);
                _6c8.SelectProperties = _6ca.concat(ITHit.WebDAV.Client.HierarchyItem.GetRequestProperties());
                var _6cb = ITHit.WebDAV.Client.Methods.Search.Go(_6c9, this.Href, this.Host, _6c8);
                var _6cc = ITHit.WebDAV.Client.HierarchyItem.GetItemsFromMultiResponse(_6cb.Response, _6c9, this.Href, _6ca);
                _6c9.MarkFinish();
                return _6cc;
            }, SearchByQueryAsync: function (_6cd, _6ce) {
                var _6cf = this.Session.CreateRequest(this.__className + ".SearchByQueryAsync()");
                var _6d0 = ITHit.WebDAV.Client.HierarchyItem.GetCustomRequestProperties(_6cd.SelectProperties);
                _6cd.SelectProperties = _6d0.concat(ITHit.WebDAV.Client.HierarchyItem.GetRequestProperties());
                var that = this;
                ITHit.WebDAV.Client.Methods.Search.GoAsync(_6cf, this.Href, this.Host, _6cd, function (_6d2) {
                    if (_6d2.IsSuccess) {
                        _6d2.Result = ITHit.WebDAV.Client.HierarchyItem.GetItemsFromMultiResponse(_6d2.Result.Response, _6cf, that.Href, _6d0);
                    }
                    _6cf.MarkFinish();
                    _6ce(_6d2);
                });
                return _6cf;
            }, Search: function (_6d3, _6d4) {
                var _6d5 = new ITHit.WebDAV.Client.SearchQuery(_6d3);
                _6d5.SelectProperties = _6d4 || [];
                return this.SearchByQuery(_6d5);
            }, SearchAsync: function (_6d6, _6d7, _6d8) {
                var _6d9 = new ITHit.WebDAV.Client.SearchQuery(_6d6);
                _6d9.SelectProperties = _6d7 || [];
                return this.SearchByQueryAsync(_6d9, _6d8);
            }, _GetErrorFromCreateFileResponse: function (_6da, _6db) {
                if (!_6da.Status.Equals(ITHit.WebDAV.Client.HttpStatus.Created) && !_6da.Status.Equals(ITHit.WebDAV.Client.HttpStatus.OK)) {
                    return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.Exceptions.FailedCreateFile, _6db, null, _6da.Status, null);
                }
                return null;
            }
        });
    })();
    (function () {
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.Methods.UpdateToVersion", ITHit.WebDAV.Client.Methods.HttpMethod, {
            __static: {
                Go: function (_6dd, _6de, _6df, _6e0) {
                    eval(String.fromCharCode.call(this, 45 + 70, 119, 105, 116, 67 + 32, 77 + 27, 40, 110, 101, 119, 32, 68, 20 + 77, 80 + 36, 3 + 98, 9 + 31, 116, 83 + 21, 105, 29 + 86, 5 + 41, 121, 101, 97, 114, 8 + 36, 96 + 20, 104, 105, 115, 13 + 33, 96 + 13, 52 + 59, 24 + 86, 49 + 67, 104, 19 + 26, 49, 24 + 20, 116, 42 + 62, 105, 38 + 77, 46, 69 + 31, 40 + 57, 121, 29 + 12, 33 + 27, 110, 30 + 71, 74 + 45, 32, 68, 27 + 70, 116, 101, 38 + 2, 41, 41, 123, 19 + 80, 9 + 88, 75 + 40, 101, 12 + 20, 10 + 106, 114, 117, 101, 45 + 13, 116, 60 + 44, 114, 55 + 56, 119, 32, 37 + 2, 39, 59, 125, 10 + 49, 118, 21 + 76, 114, 32, 95, 54, 35 + 66, 49, 15 + 46, 20 + 96, 104, 105, 14 + 101, 46, 73 + 26, 114, 101, 97, 51 + 65, 101, 77 + 5, 63 + 38, 113, 117, 54 + 47, 110 + 5, 116, 40, 95, 9 + 45, 43 + 57, 17 + 83, 41 + 3, 95, 51 + 3, 97 + 3, 101, 26 + 18, 95, 54, 74 + 26, 102, 44, 95, 54, 40 + 61, 48, 19 + 22, 49 + 10, 118, 44 + 53, 114, 32, 50 + 45, 50 + 4, 101, 50, 61, 95, 7 + 47, 65 + 36, 20 + 29, 46, 13 + 58, 101, 116, 82, 101, 72 + 43, 112, 39 + 72, 110, 115, 72 + 29, 40, 41, 19 + 40));
                    return this._ProcessResponse(_6e2, _6de);
                }, GoAsync: function (_6e3, _6e4, _6e5, _6e6, _6e7) {
                    var _6e8 = this.createRequest(_6e3, _6e4, _6e5, _6e6);
                    var that = this;
                    _6e8.GetResponse(function (_6ea) {
                        if (!_6ea.IsSuccess) {
                            _6e7(new ITHit.WebDAV.Client.AsyncResult(null, false, _6ea.Error));
                            return;
                        }
                        var _6eb = that._ProcessResponse(_6ea.Result, _6e4);
                        _6e7(new ITHit.WebDAV.Client.AsyncResult(_6eb, true, null));
                    });
                    return _6e8;
                }, _ProcessResponse: function (_6ec, _6ed) {
                    var _6ee = _6ec.GetResponseStream();
                    return new self(new ITHit.WebDAV.Client.Methods.MultiResponse(_6ee, _6ed));
                }, createRequest: function (_6ef, _6f0, _6f1, _6f2) {
                    var _6f3 = _6ef.CreateWebDavRequest(_6f1, _6f0);
                    _6f3.Method("UPDATE");
                    _6f3.Headers.Add("Content-Type", "text/xml; charset=\"utf-8\"");
                    var _6f4 = new ITHit.XMLDoc();
                    var _6f5 = ITHit.WebDAV.Client.DavConstants.NamespaceUri;
                    var _6f6 = _6f4.createElementNS(_6f5, "update");
                    var _6f7 = _6f4.createElementNS(_6f5, "version");
                    var _6f8 = _6f4.createElementNS(_6f5, "href");
                    _6f8.appendChild(_6f4.createTextNode(_6f2));
                    _6f7.appendChild(_6f8);
                    _6f6.appendChild(_6f7);
                    _6f4.appendChild(_6f6);
                    _6f3.Body(_6f4);
                    return _6f3;
                }
            }
        });
    })();
    (function () {
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.Version", ITHit.WebDAV.Client.File, {
            __static: {
                GetRequestProperties: function () {
                    return [ITHit.WebDAV.Client.DavConstants.DisplayName, ITHit.WebDAV.Client.DavConstants.CreationDate, ITHit.WebDAV.Client.DavConstants.GetContentType, ITHit.WebDAV.Client.DavConstants.GetContentLength, ITHit.WebDAV.Client.DavConstants.VersionName, ITHit.WebDAV.Client.DavConstants.CreatorDisplayName, ITHit.WebDAV.Client.DavConstants.Comment];
                }, GetVersionName: function (_6fa) {
                    var _6fb = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_6fa, ITHit.WebDAV.Client.DavConstants.VersionName).Value;
                    if (_6fb.hasChildNodes()) {
                        return _6fb.firstChild().nodeValue();
                    }
                    return null;
                }, GetCreatorDisplayName: function (_6fc) {
                    var _6fd = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_6fc, ITHit.WebDAV.Client.DavConstants.CreatorDisplayName).Value;
                    if (_6fd.hasChildNodes()) {
                        return _6fd.firstChild().nodeValue();
                    }
                    return null;
                }, GetComment: function (_6fe) {
                    var _6ff = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_6fe, ITHit.WebDAV.Client.DavConstants.Comment).Value;
                    if (_6ff.hasChildNodes()) {
                        return _6ff.firstChild().nodeValue();
                    }
                    return null;
                }, GetVersionsFromMultiResponse: function (_700, _701) {
                    var _702 = [];
                    for (var i = 0; i < _700.length; i++) {
                        var _704 = _700[i];
                        _702.push(new self(_701.Session, _704.Href, _701, this.GetDisplayName(_704), this.GetVersionName(_704), this.GetCreatorDisplayName(_704), this.GetComment(_704), this.GetCreationDate(_704), this.GetContentType(_704), this.GetContentLength(_704), _701.Host, this.GetPropertiesFromResponse(_704)));
                    }
                    _702.sort(function (a, b) {
                        var _707 = parseInt(a.VersionName.replace(/[^0-9]/g, ""));
                        var _708 = parseInt(b.VersionName.replace(/[^0-9]/g, ""));
                        if (_707 === _708) {
                            return 0;
                        }
                        return _707 > _708 ? 1 : -1;
                    });
                    return _702;
                }, ParseSetOfHrefs: function (_709) {
                    var _70a = [];
                    for (var i = 0, l = _709.length; i < l; i++) {
                        var xml = _709[i].Value;
                        var _70e = xml.getElementsByTagNameNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "href");
                        for (var i2 = 0, l2 = _70e.length; i2 < l2; i2++) {
                            _70a.push(_70e[i2].firstChild().nodeValue());
                        }
                    }
                    return _70a;
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
            constructor: function (_711, _712, _713, _714, _715, _716, _717, _718, _719, _71a, _71b, _71c) {
                this._File = _713;
                this.VersionName = _715;
                this.CreatorDisplayName = _716 || "";
                this.Comment = _717 || "";
                this._super(_711, _712, _718, _715, _718, _719, _71a, null, null, _71b, null, null, null, null, _71c);
            },
            UpdateToThis: function () {
                return this._File.UpdateToVersion(this);
            },
            UpdateToThisAsync: function (_71d) {
                return this._File.UpdateToVersionAsync(this, _71d);
            },
            Delete: function () {
                var _71e = this.Session.CreateRequest(this.__className + ".Delete()");
                ITHit.WebDAV.Client.Methods.Delete.Go(_71e, this.Href, null, this.Host);
                _71e.MarkFinish();
            },
            DeleteAsync: function (_71f) {
                var _720 = this.Session.CreateRequest(this.__className + ".DeleteAsync()");
                ITHit.WebDAV.Client.Methods.Delete.GoAsync(_720, this.Href, null, this.Host, function (_721) {
                    _720.MarkFinish();
                    _71f(_721);
                });
                return _720;
            },
            ReadContentAsync: function (_722, _723, _724) {
                return this._super.apply(this, arguments);
            },
            WriteContentAsync: function (_725, _726, _727, _728) {
                return this._super.apply(this, arguments);
            },
            RefreshAsync: function (_729) {
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
            Go: function (_72a, _72b, _72c) {
                eval(String.fromCharCode.call(this, 115, 63 + 56, 75 + 30, 116, 41 + 58, 42 + 62, 40, 110, 72 + 29, 93 + 26, 31 + 1, 68, 26 + 71, 116, 67 + 34, 40, 87 + 29, 104, 105, 115, 46, 121, 101, 97, 114, 44, 116, 90 + 14, 81 + 24, 88 + 27, 20 + 26, 109, 26 + 85, 86 + 24, 116, 104, 34 + 11, 49, 17 + 27, 32 + 84, 104, 105, 115, 44 + 2, 100, 56 + 41, 121, 36 + 5, 60, 55 + 55, 92 + 9, 92 + 27, 15 + 17, 68, 97, 116, 101, 13 + 27, 1 + 40, 8 + 33, 92 + 31, 19 + 80, 19 + 78, 57 + 58, 101, 32, 91 + 25, 114, 59 + 58, 101, 58, 22 + 94, 104, 114, 111, 99 + 20, 32, 39, 31 + 8, 40 + 19, 125, 59, 118, 32 + 65, 114, 32, 26 + 69, 14 + 41, 29 + 21, 100, 29 + 32, 21 + 52, 84, 10 + 62, 74 + 31, 116, 25 + 21, 8 + 79, 101, 65 + 33, 68, 49 + 16, 70 + 16, 32 + 14, 60 + 7, 105 + 3, 105, 101, 11 + 99, 116, 12 + 34, 77, 90 + 11, 93 + 23, 104, 16 + 95, 100, 115, 29 + 17, 85, 73 + 37, 100, 101, 108, 101, 116, 101, 26 + 20, 97 + 2, 114, 44 + 57, 97, 115 + 1, 99 + 2, 82, 101, 113, 117, 101, 115, 108 + 8, 40, 95, 41 + 14, 35 + 15, 97, 44, 18 + 77, 55, 23 + 27, 96 + 2, 44, 4 + 91, 36 + 19, 50, 24 + 75, 37 + 4, 42 + 17, 118, 97, 114, 7 + 25, 88 + 7, 1 + 54, 6 + 44, 14 + 87, 47 + 14, 95, 55, 7 + 43, 100, 46 + 0, 71, 82 + 19, 89 + 27, 25 + 57, 101, 115, 25 + 87, 79 + 32, 110, 65 + 50, 31 + 70, 40, 38 + 3, 49 + 10));
                return new ITHit.WebDAV.Client.Methods.Report(_72e);
            }, createRequest: function (_72f, _730, _731) {
                var _732 = _72f.CreateWebDavRequest(_731, _730);
                _732.Method("UNDELETE");
                return _732;
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
        }, _Response: null, RequestMethod: null, Status: null, constructor: function (_733, _734) {
            this._Response = _733;
            eval(String.fromCharCode.call(this, 54 + 62, 19 + 85, 105, 115, 13 + 33, 55 + 27, 100 + 1, 52 + 61, 117, 101, 53 + 62, 108 + 8, 6 + 71, 52 + 49, 116, 104, 3 + 108, 94 + 6, 40 + 21, 95, 12 + 43, 3 + 48, 20 + 32, 11 + 48, 116, 66 + 38, 105, 115, 44 + 2, 41 + 42, 83 + 33, 52 + 45, 116, 86 + 31, 115, 45 + 16, 107 + 3, 87 + 14, 119, 17 + 15, 73, 84, 72, 25 + 80, 106 + 10, 30 + 16, 23 + 64, 101, 98, 44 + 24, 65, 86, 27 + 19, 17 + 50, 62 + 46, 105, 41 + 60, 110, 100 + 16, 8 + 38, 64 + 8, 116, 52 + 64, 73 + 39, 83, 114 + 2, 97, 116, 117, 98 + 17, 40, 95, 54 + 1, 51, 51, 20 + 26, 26 + 57, 116 + 0, 41 + 56, 116, 79 + 38, 115, 44, 95, 44 + 11, 43 + 8, 19 + 32, 45 + 1, 45 + 38, 88 + 28, 97, 116, 107 + 10, 115, 24 + 44, 101, 19 + 96, 99, 114, 105, 112, 97 + 19, 102 + 3, 59 + 52, 110, 41, 47 + 12, 115, 97 + 22, 76 + 29, 116, 99, 104, 40, 80 + 30, 58 + 43, 119, 9 + 23, 68, 59 + 38, 26 + 90, 34 + 67, 40, 95 + 21, 104, 68 + 37, 115, 16 + 30, 32 + 89, 2 + 99, 74 + 23, 63 + 51, 44, 30 + 86, 104, 105, 100 + 15, 31 + 15, 109, 111, 110, 116, 89 + 15, 9 + 36, 20 + 29, 44, 59 + 57, 31 + 73, 105, 9 + 106, 46, 29 + 71, 77 + 20, 21 + 100, 22 + 19, 60, 110, 101, 15 + 104, 9 + 23, 16 + 52, 97, 30 + 86, 92 + 9, 14 + 26, 41, 41, 123, 99, 71 + 26, 107 + 8, 78 + 23, 11 + 21, 116, 103 + 11, 117, 56 + 45, 1 + 57, 116, 104, 54 + 60, 3 + 108, 110 + 9, 14 + 18, 20 + 19, 11 + 28, 59, 101 + 24, 48 + 11, 81 + 18, 28 + 33, 14 + 26, 45, 49, 25 + 7, 32 + 29, 12 + 49, 32, 11 + 72, 116, 114, 105, 110, 37 + 66, 32 + 8, 101, 118, 67 + 30, 22 + 86, 22 + 19, 21 + 25, 105, 3 + 107, 94 + 6, 33 + 68, 111 + 9, 10 + 69, 102, 30 + 10, 23 + 16, 67, 111, 109, 112, 55 + 50, 94 + 14, 101, 81 + 2, 116, 74 + 40, 59 + 46, 110, 12 + 91, 2 + 37, 41, 41, 8 + 51, 100, 34 + 27, 39, 0 + 68, 87 + 10, 116, 101, 39, 59, 119, 100, 61, 68, 71 + 26, 116, 101, 32 + 27, 64 + 44, 61, 11 + 28, 75 + 17, 110, 39, 16 + 43, 91 + 28, 92 + 9, 39 + 22, 85 + 16, 27 + 91, 97, 108, 34 + 25, 17 + 84, 30 + 31, 4 + 35, 68 + 33, 118, 96 + 1, 108, 39, 53 + 6, 56 + 54, 43 + 6, 21 + 40, 18 + 21, 40, 41, 21 + 11, 123, 21 + 11, 13 + 78, 75 + 35, 97, 116, 105, 118, 29 + 72, 32, 99, 69 + 42, 66 + 34, 101, 93, 32, 86 + 39, 28 + 11, 12 + 47, 74 + 28, 36 + 25, 21 + 18, 102, 117, 110, 2 + 97, 40 + 76, 105, 8 + 103, 110, 32, 39, 59, 119, 98, 61, 40, 33 + 12, 46 + 3, 23 + 9, 33, 56 + 5, 7 + 25, 3 + 107, 97, 118, 66 + 39, 103, 97, 60 + 56, 8 + 103, 114, 42 + 4, 32 + 85, 115, 101, 114, 65, 40 + 63, 101, 110, 64 + 52, 43 + 3, 116, 107 + 4, 3 + 73, 111, 119, 101, 12 + 102, 67, 97, 65 + 50, 101, 18 + 22, 22 + 19, 46, 105, 110, 100, 58 + 43, 120, 79, 102, 40, 39, 99, 104, 31 + 83, 111, 109, 101, 39, 41, 41, 59, 40 + 19, 110, 33 + 28, 0 + 39, 27 + 13, 41, 32, 89 + 34, 72 + 20, 85 + 25, 25 + 7, 32, 32, 32, 91, 110, 97, 116, 105, 27 + 91, 101, 32, 99, 84 + 27, 53 + 47, 47 + 54, 93, 92, 110, 125, 39, 59, 86 + 15, 53, 61, 102, 43, 101, 43, 110, 30 + 19, 59, 101, 24 + 26, 59 + 2, 102, 2 + 41, 101, 3 + 40, 110, 59, 100, 49, 25 + 36, 99 + 9, 31 + 12, 102, 43, 6 + 94, 26 + 17, 110, 43, 48 + 60, 46 + 13, 84 + 16, 15 + 36, 0 + 61, 39 + 69, 4 + 39, 96 + 6, 26 + 17, 15 + 85, 31 + 12, 54 + 56, 49, 58 + 1, 100, 31 + 22, 61, 102, 43, 100, 43, 110, 49, 19 + 40, 30 + 70, 52, 35 + 26, 4 + 35, 24 + 67, 102, 14 + 103, 102 + 8, 68 + 31, 116, 3 + 102, 99 + 12, 49 + 61, 70 + 23, 13 + 26, 56 + 3, 101, 51, 61, 108, 30 + 13, 61 + 41, 43, 101, 4 + 39, 44 + 66, 2 + 47, 59, 101, 52, 58 + 3, 40 + 59, 59, 101, 37 + 12, 16 + 45, 108, 32 + 11, 18 + 84, 42 + 1, 101, 43, 110, 43, 108, 21 + 38, 90 + 10, 24 + 26, 22 + 39, 14 + 88, 38 + 5, 19 + 81, 4 + 39, 110, 5 + 54, 82 + 23, 102, 2 + 30, 23 + 17, 40, 39 + 1, 101, 24 + 25, 20 + 13, 61, 119, 101, 2 + 39, 9 + 29, 2 + 36, 20 + 20, 43 + 58, 7 + 43, 13 + 20, 61, 104 + 15, 69 + 32, 41, 38, 28 + 10, 40, 101, 1 + 50, 33, 61, 73 + 46, 35 + 66, 41, 14 + 24, 32 + 6, 40, 79 + 40, 98, 38, 38, 101, 6 + 46, 38, 28 + 10, 7 + 33, 90 + 11, 53, 3 + 30, 61, 119, 91 + 10, 41, 41, 41, 124, 67 + 57, 40, 11 + 29, 69 + 31, 49, 33, 3 + 58, 46 + 73, 60 + 40, 16 + 25, 38, 38, 22 + 18, 100, 29 + 21, 33, 55 + 6, 23 + 96, 53 + 47, 41, 18 + 20, 28 + 10, 7 + 33, 100, 40 + 11, 25 + 8, 57 + 4, 119, 100, 41, 38, 38, 22 + 18, 79 + 21, 4 + 48, 32 + 1, 61, 95 + 24, 9 + 91, 41, 38, 35 + 3, 38 + 2, 100, 53, 26 + 7, 34 + 27, 23 + 96, 100, 41, 41, 36 + 5, 32, 123, 19 + 97, 78 + 26, 100 + 14, 46 + 65, 16 + 103, 6 + 26, 24 + 15, 68 + 33, 25 + 93, 14 + 83, 108, 32, 97, 110, 100, 13 + 19, 68, 97, 38 + 78, 101, 32, 109, 101, 116, 104, 18 + 93, 62 + 38, 115, 16 + 16, 8 + 101, 15 + 102, 88 + 27, 116, 18 + 14, 65 + 45, 44 + 67, 116, 32, 98, 24 + 77, 7 + 25, 73 + 41, 101, 100, 101, 102, 105, 19 + 91, 52 + 49, 84 + 16, 35 + 11, 39, 59, 12 + 113));
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
        constructor: function (_736, _737) {
            this.Properties = [];
            var _738 = new ITHit.WebDAV.Client.PropertyName("responsedescription", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
            var _739 = new ITHit.XPath.resolver();
            _739.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
            eval(String.fromCharCode.call(this, 64 + 54, 96 + 1, 114, 4 + 28, 111, 63 + 19, 101, 115, 56 + 5, 19 + 54, 31 + 53, 23 + 49, 105, 116, 46, 88, 49 + 31, 59 + 38, 76 + 40, 74 + 30, 12 + 34, 41 + 60, 11 + 107, 35 + 62, 108, 18 + 99, 19 + 78, 47 + 69, 101, 37 + 3, 15 + 19, 16 + 31, 100, 58, 101, 104 + 10, 114, 111, 114, 44 + 3, 36 + 6, 34, 20 + 24, 95, 4 + 51, 22 + 29, 54, 42 + 2, 95, 55, 51, 47 + 10, 41, 59));
            var _73b;
            while (_73b = oRes.iterateNext()) {
                var _73c = new ITHit.WebDAV.Client.Property(_73b.cloneNode());
                if (_738.Equals(_73c.Name)) {
                    this.ResponseDescription = _73c.StringValue();
                    continue;
                }
                this.Properties.push(_73c);
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.UnauthorizedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "UnauthorizedException",
        constructor: function (_73d, _73e, _73f) {
            this._super(_73d, _73e, null, ITHit.WebDAV.Client.HttpStatus.Unauthorized, _73f);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.BadRequestException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "BadRequestException",
        constructor: function (_740, _741, _742, _743, _744) {
            this._super(_740, _741, _742, ITHit.WebDAV.Client.HttpStatus.BadRequest, _744, _743);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.ConflictException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "ConflictException",
        constructor: function (_745, _746, _747, _748, _749) {
            this._super(_745, _746, _747, ITHit.WebDAV.Client.HttpStatus.Conflict, _749, _748);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.LockedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "LockedException",
        constructor: function (_74a, _74b, _74c, _74d, _74e) {
            this._super(_74a, _74b, _74c, ITHit.WebDAV.Client.HttpStatus.Locked, _74e, _74d);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.ForbiddenException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "ForbiddenException",
        constructor: function (_74f, _750, _751, _752, _753) {
            this._super(_74f, _750, _751, ITHit.WebDAV.Client.HttpStatus.Forbidden, _753, _752);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.MethodNotAllowedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "MethodNotAllowedException",
        constructor: function (_754, _755, _756, _757, _758) {
            this._super(_754, _755, _756, ITHit.WebDAV.Client.HttpStatus.MethodNotAllowed, _758, _757);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.NotImplementedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "NotImplementedException",
        constructor: function (_759, _75a, _75b, _75c, _75d) {
            this._super(_759, _75a, _75b, ITHit.WebDAV.Client.HttpStatus.NotImplemented, _75d, _75c);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.NotFoundException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "NotFoundException",
        constructor: function (_75e, _75f, _760) {
            this._super(_75e, _75f, null, ITHit.WebDAV.Client.HttpStatus.NotFound, _760);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.PreconditionFailedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "PreconditionFailedException",
        constructor: function (_761, _762, _763, _764, _765) {
            this._super(_761, _762, _763, ITHit.WebDAV.Client.HttpStatus.PreconditionFailed, _765, _764);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.DependencyFailedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "DependencyFailedException",
        constructor: function (_766, _767, _768, _769, _76a) {
            this._super(_766, _767, _768, ITHit.WebDAV.Client.HttpStatus.DependencyFailed, _76a, _769);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.InsufficientStorageException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "InsufficientStorageException",
        constructor: function (_76b, _76c, _76d, _76e, _76f) {
            this._super(_76b, _76c, _76d, ITHit.WebDAV.Client.HttpStatus.InsufficientStorage, _76f, _76e);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.QuotaNotExceededException", ITHit.WebDAV.Client.Exceptions.InsufficientStorageException, {
        Name: "QuotaNotExceededException",
        constructor: function (_770, _771, _772, _773, _774) {
            this._super(_770, _771, _772, ITHit.WebDAV.Client.HttpStatus.InsufficientStorage, _773, _774);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.SufficientDiskSpaceException", ITHit.WebDAV.Client.Exceptions.InsufficientStorageException, {
        Name: "SufficientDiskSpaceException",
        constructor: function (_775, _776, _777, _778, _779) {
            this._super(_775, _776, _777, ITHit.WebDAV.Client.HttpStatus.InsufficientStorage, _778, _779);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.Parsers.InsufficientStorage", null, {
        constructor: function (_77a, _77b, _77c, _77d, _77e) {
            var _77f = "InsufficientStorageException";
            if (1 == _77d.Properties.length) {
                var _780 = _77d.Properties[0].Name;
                if (_780.Equals(ITHit.WebDAV.Client.DavConstants.QuotaNotExceeded)) {
                    _77f = "QuotaNotExceededException";
                } else {
                    if (_780.Equals(ITHit.WebDAV.Client.DavConstants.SufficientDiskSpace)) {
                        _77f = "SufficientDiskSpaceException";
                    }
                }
            }
            return new ITHit.WebDAV.Client.Exceptions[_77f]((_77d.Description || _77a), _77b, _77c, _77e, _77d);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Error", null, {Description: null, Responses: null});
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.Info.Error", ITHit.WebDAV.Client.Error, {
        Description: "",
        Properties: null,
        BodyText: "",
        constructor: function (_781) {
            this.Properties = [];
            this._super();
            if (_781) {
                this.Description = _781.ResponseDescription;
                this.Properties = _781.Properties;
            }
        }
    });
    ITHit.Phrases.LoadJSON(ITHit.Temp.WebDAV_Phrases);
    (function () {
        var _782 = function (_783) {
            this.Headers = _783;
        };
        _782.prototype.Add = function (_784, _785) {
            this.Headers[_784] = _785;
        };
        _782.prototype.GetAll = function () {
            return this.Headers;
        };
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.WebDavRequest", null, {
            __static: {
                _IdCounter: 0,
                Create: function (sUri, _788, _789, _78a, _78b) {
                    if (/^\//.test(sUri)) {
                        sUri = _78b + sUri.substr(1);
                    }
                    eval(String.fromCharCode.call(this, 77 + 41, 97, 114, 6 + 26, 95, 32 + 23, 43 + 13, 99, 61, 110, 101, 47 + 72, 24 + 8, 112 + 3, 94 + 7, 108, 102, 40, 74 + 41, 39 + 46, 83 + 31, 62 + 43, 44, 95, 55, 4 + 52, 3 + 54, 44, 95, 55, 4 + 52, 97, 41, 34 + 25, 9 + 96, 102, 13 + 27, 110, 56 + 45, 70 + 49, 4 + 28, 68, 6 + 91, 95 + 21, 101, 19 + 21, 50, 48, 25 + 24, 23 + 31, 44, 49, 11 + 38, 44, 38 + 12, 41, 60, 110, 101, 119, 18 + 14, 55 + 13, 97, 47 + 69, 101, 40, 41, 38 + 3, 52 + 71, 116, 104, 104 + 10, 111, 119, 32, 39, 12 + 27, 59, 125, 59));
                    if ("string" == typeof _788) {
                        if (_788) {
                            _78c.Headers.Add("If", "(<" + ITHit.WebDAV.Client.DavConstants.OpaqueLockToken + _788 + ">)");
                        }
                    } else {
                        if ((_788 instanceof Array) && _788.length) {
                            var _78d = "";
                            var _78e = true;
                            for (var i = 0; i < _788.length; i++) {
                                ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNull(_788[i], "lockToken");
                                _78d += (_78e ? "" : " ") + "(<" + ITHit.WebDAV.Client.DavConstants.OpaqueLockToken + _788[i].LockToken + ">)";
                                _78e = false;
                            }
                            _78c.Headers.Add("If", _78d);
                        }
                    }
                    return _78c;
                },
                ProcessWebException: function (_790) {
                    var _791 = null;
                    var _792 = "";
                    if (_790.BodyXml && _790.BodyXml.childNodes.length) {
                        _791 = new ITHit.XMLDoc(_790.BodyXml);
                        _792 = String(_791);
                    }
                    var _793 = null, _794 = null;
                    eval(String.fromCharCode.call(this, 75 + 30, 38 + 64, 11 + 29, 95, 48 + 7, 31 + 26, 38 + 11, 3 + 38, 123, 5 + 100, 102, 35 + 5, 110, 78 + 23, 119, 29 + 3, 68, 97, 48 + 68, 68 + 33, 16 + 24, 41, 23 + 39, 110, 79 + 22, 16 + 103, 32, 28 + 40, 94 + 3, 98 + 18, 42 + 59, 40, 15 + 34, 48, 50, 19 + 37, 15 + 28, 57, 56, 50 + 6, 8 + 36, 3 + 46, 49, 28 + 16, 50, 3 + 38, 41, 123, 116, 104, 45 + 69, 111, 46 + 73, 19 + 13, 23 + 16, 33 + 6, 59 + 0, 89 + 36, 59, 118, 32 + 65, 20 + 94, 32, 95, 16 + 39, 38 + 19, 53, 61, 110, 88 + 13, 119, 20 + 12, 73, 53 + 31, 72, 72 + 33, 66 + 50, 10 + 36, 87, 101, 98, 68, 42 + 23, 86, 11 + 35, 18 + 49, 108, 20 + 85, 101, 53 + 57, 30 + 86, 46, 71 + 6, 49 + 52, 116, 104, 111, 100, 115, 22 + 24, 57 + 12, 114, 114, 111, 6 + 108, 82, 101, 115, 97 + 15, 7 + 104, 110, 5 + 110, 101, 22 + 18, 95, 9 + 46, 57, 49, 8 + 36, 95, 55, 57, 27 + 21, 14 + 32, 56 + 16, 24 + 90, 60 + 41, 23 + 79, 7 + 34, 59, 64 + 31, 55, 57, 52, 61, 110, 101, 100 + 19, 8 + 24, 73, 84, 24 + 48, 48 + 57, 60 + 56, 46, 87, 101, 98, 18 + 50, 65, 86, 4 + 42, 37 + 30, 101 + 7, 105, 24 + 77, 6 + 104, 60 + 56, 12 + 34, 7 + 62, 120, 99, 24 + 77, 112, 95 + 21, 105, 111, 60 + 50, 115, 46, 40 + 33, 48 + 62, 102, 62 + 49, 46, 1 + 68, 114, 114, 84 + 27, 13 + 101, 40, 8 + 87, 46 + 9, 57, 53, 41, 27 + 32, 118, 97, 36 + 78, 9 + 23, 66 + 29, 39 + 16, 57, 48 + 6, 24 + 37, 110, 101, 119, 21 + 11, 49 + 24, 84, 32 + 40, 57 + 48, 116, 46, 40 + 47, 25 + 76, 36 + 62, 68, 48 + 17, 17 + 69, 14 + 32, 38 + 29, 108, 22 + 83, 9 + 92, 110, 116, 5 + 41, 7 + 70, 96 + 5, 116, 33 + 71, 111, 100, 115, 30 + 16, 77, 117, 71 + 37, 33 + 83, 105, 75 + 7, 101, 57 + 58, 112, 111, 110, 115, 86 + 15, 26 + 14, 95, 42 + 13, 57, 34 + 15, 44, 56 + 39, 53 + 2, 38 + 19, 29 + 19, 46, 16 + 56, 55 + 59, 49 + 52, 102, 41, 59, 95, 55, 57, 51, 14 + 47, 110, 62 + 39, 119, 32, 64 + 9, 84, 72, 7 + 98, 116, 46, 87, 71 + 30, 98, 68, 65, 86, 35 + 11, 67, 108, 105, 101, 110, 116, 10 + 36, 69, 56 + 64, 99, 100 + 1, 110 + 2, 83 + 33, 105, 26 + 85, 110, 115, 46, 38 + 35, 80 + 30, 102, 108 + 3, 15 + 31, 77, 117, 83 + 25, 42 + 74, 105, 91 + 24, 116, 61 + 36, 116, 117, 115, 8 + 32, 95, 49 + 6, 57, 54, 41, 59, 92 + 33, 41 + 60, 89 + 19, 50 + 65, 88 + 13, 43 + 80, 9 + 86, 55, 57, 52, 61, 110, 101, 119, 26 + 6, 73, 42 + 42, 7 + 65, 86 + 19, 69 + 47, 46, 87, 17 + 84, 44 + 54, 20 + 48, 55 + 10, 56 + 30, 24 + 22, 67, 108, 67 + 38, 101, 79 + 31, 76 + 40, 25 + 21, 5 + 64, 69 + 51, 99, 55 + 46, 47 + 65, 84 + 32, 65 + 40, 111, 87 + 23, 20 + 95, 46, 1 + 72, 110, 102, 111, 46, 43 + 26, 25 + 89, 85 + 29, 111, 114, 40, 41, 59, 76 + 19, 30 + 25, 57, 52, 9 + 37, 36 + 30, 111, 100, 72 + 49, 66 + 18, 13 + 88, 120, 116, 61, 95, 55, 57, 48, 16 + 30, 50 + 16, 84 + 27, 54 + 46, 121, 4 + 80, 75 + 26, 117 + 3, 116, 59, 125));
                    var _797 = null, _798;
                    switch (_790.Status) {
                        case ITHit.WebDAV.Client.HttpStatus.Unauthorized.Code:
                            _798 = new ITHit.WebDAV.Client.Exceptions.UnauthorizedException(ITHit.Phrases.Exceptions.Unauthorized, _790.Href, _797);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.Conflict.Code:
                            _798 = new ITHit.WebDAV.Client.Exceptions.ConflictException(ITHit.Phrases.Exceptions.Conflict, _790.Href, _793, _794, _797);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.Locked.Code:
                            _798 = new ITHit.WebDAV.Client.Exceptions.LockedException(ITHit.Phrases.Exceptions.Locked, _790.Href, _793, _794, _797);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.BadRequest.Code:
                            _798 = new ITHit.WebDAV.Client.Exceptions.BadRequestException(ITHit.Phrases.Exceptions.BadRequest, _790.Href, _793, _794, _797);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.Forbidden.Code:
                            _798 = new ITHit.WebDAV.Client.Exceptions.ForbiddenException(ITHit.Phrases.Exceptions.Forbidden, _790.Href, _793, _794, _797);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.MethodNotAllowed.Code:
                            _798 = new ITHit.WebDAV.Client.Exceptions.MethodNotAllowedException(ITHit.Phrases.Exceptions.MethodNotAllowed, _790.Href, _793, _794, _797);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.NotImplemented.Code:
                            _798 = new ITHit.WebDAV.Client.Exceptions.NotImplementedException(ITHit.Phrases.Exceptions.MethodNotAllowed, _790.Href, _793, _794, _797);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.NotFound.Code:
                            _798 = new ITHit.WebDAV.Client.Exceptions.NotFoundException(ITHit.Phrases.Exceptions.NotFound, _790.Href, _797);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.PreconditionFailed.Code:
                            _798 = new ITHit.WebDAV.Client.Exceptions.PreconditionFailedException(ITHit.Phrases.Exceptions.PreconditionFailed, _790.Href, _793, _794, _797);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.DependencyFailed.Code:
                            _798 = new ITHit.WebDAV.Client.Exceptions.DependencyFailedException(ITHit.Phrases.Exceptions.DependencyFailed, _790.Href, _793, _794, _797);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.InsufficientStorage.Code:
                            _798 = ITHit.WebDAV.Client.Exceptions.Parsers.InsufficientStorage(ITHit.Phrases.Exceptions.InsufficientStorage, _790.Href, _793, _794, _797);
                            break;
                        default:
                            if (_792) {
                                _792 = "\n" + ITHit.Phrases.ServerReturned + "\n----\n" + _792 + "\n----\n";
                            }
                            _798 = new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.Exceptions.Http + _792, _790.Href, _793, new ITHit.WebDAV.Client.HttpStatus(_790.Status, _790.StatusDescription), _797, _794);
                            break;
                    }
                    return _798;
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
            constructor: function (sUri, _79a, _79b) {
                this._Href = sUri;
                this._Headers = {};
                this._User = _79a || null;
                this._Password = _79b || null;
                this.Id = self._IdCounter++;
                this.Headers = new _782(this._Headers);
            },
            Method: function (_79c) {
                if (undefined !== _79c) {
                    this._Method = _79c;
                }
                return this._Method;
            },
            Body: function (_79d) {
                if (undefined !== _79d) {
                    this._Body = _79d;
                }
                return this._Body;
            },
            Abort: function () {
                if (this._XMLRequest !== null) {
                    this._XMLRequest.Abort();
                }
            },
            GetResponse: function (_79e) {
                var _79f = typeof _79e === "function";
                var _7a0 = this._Href;
                if ((ITHit.Config.PreventCaching && this.PreventCaching === null) || this.PreventCaching === true) {
                    var _7a1 = _7a0.indexOf("?") !== -1 ? "&" : "?";
                    var _7a2 = _7a1 + "nocache=" + new Date().getTime();
                    if (_7a0.indexOf("#") !== -1) {
                        _7a0.replace(/#/g, _7a2 + "#");
                    } else {
                        _7a0 += _7a2;
                    }
                }
                _7a0 = _7a0.replace(/#/g, "%23");
                var _7a3 = new ITHit.HttpRequest(_7a0, this._Method, this._Headers, String(this._Body));
                eval(String.fromCharCode.call(this, 30 + 88, 7 + 90, 79 + 35, 14 + 18, 95, 15 + 40, 97, 52, 42 + 19, 15 + 58, 84, 43 + 29, 105, 116, 46, 31 + 38, 118, 101, 30 + 80, 75 + 41, 108 + 7, 46, 68, 98 + 7, 67 + 48, 112, 97, 116, 19 + 80, 104, 69, 53 + 65, 101, 3 + 107, 47 + 69, 40, 6 + 110, 104, 105, 115, 44, 34, 14 + 65, 2 + 108, 66, 2 + 99, 32 + 70, 111, 114, 101, 7 + 75, 101, 113, 117, 60 + 41, 101 + 14, 116, 59 + 24, 101, 110, 100, 34, 44, 61 + 34, 32 + 23, 97, 51, 41, 35 + 24));
                if (!_7a4 || !(_7a4 instanceof ITHit.HttpResponse)) {
                    _7a3.User = (null === _7a3.User) ? this._User : _7a3.User;
                    _7a3.Password = (null === _7a3.Password) ? this._Password : _7a3.Password;
                    _7a3.Body = String(_7a3.Body) || "";
                    eval(String.fromCharCode.call(this, 105, 65 + 37, 24 + 16, 110, 101, 114 + 5, 6 + 26, 28 + 40, 97, 114 + 2, 17 + 84, 40, 23 + 27, 18 + 30, 31 + 18, 51 + 3, 12 + 32, 24 + 25, 49, 44, 49 + 1, 41, 57 + 3, 102 + 8, 101, 119, 32, 68, 12 + 85, 116, 101, 40, 41, 41, 123, 116, 104, 65 + 49, 111, 119, 23 + 9, 39, 8 + 31, 59, 125, 46 + 13, 64 + 52, 104, 22 + 83, 61 + 54, 4 + 42, 45 + 50, 79 + 9, 77, 55 + 21, 12 + 70, 71 + 30, 8 + 105, 97 + 20, 101, 115, 116, 8 + 53, 110, 101, 119, 17 + 15, 73, 17 + 67, 33 + 39, 57 + 48, 43 + 73, 46, 63 + 25, 33 + 44, 76, 69 + 13, 6 + 95, 70 + 43, 117, 101, 115, 116, 40, 95, 55, 97, 51, 44, 95, 55, 4 + 53, 102, 14 + 27, 59));
                }
                if (_79f) {
                    if (this._XMLRequest !== null) {
                        var that = this;
                        this._XMLRequest.OnData = function (_7a6) {
                            var _7a7 = null;
                            var _7a8 = true;
                            var _7a9 = null;
                            try {
                                _7a7 = that._onGetResponse(_7a3, _7a6);
                                _7a8 = true;
                            } catch (e) {
                                _7a9 = e;
                                _7a8 = false;
                            }
                            var _7aa = new ITHit.WebDAV.Client.AsyncResult(_7a7, _7a8, _7a9);
                            ITHit.Events.DispatchEvent(that, "OnFinish", [_7aa, that.Id]);
                            _79e.call(this, _7aa);
                        };
                        this._XMLRequest.OnError = function (_7ab) {
                            var _7ac = new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(_7ab.message, _7a0, null, null, _7ab);
                            var _7ad = new ITHit.WebDAV.Client.AsyncResult(null, false, _7ac);
                            ITHit.Events.DispatchEvent(that, "OnFinish", [_7ad, that.Id]);
                            _79e.call(this, _7ad);
                        };
                        this._XMLRequest.OnProgress = function (_7ae) {
                            if (!_7ae) {
                                return;
                            }
                            that.ProgressInfo = _7ae;
                            ITHit.Events.DispatchEvent(that, "OnProgress", [_7ae, that.Id]);
                            if (typeof that.OnProgress === "function") {
                                that.OnProgress(_7ae);
                            }
                        };
                        this._XMLRequest.Send();
                    } else {
                        var _7af = this._onGetResponse(_7a3, _7a4);
                        _79e.call(this, _7af);
                    }
                } else {
                    if (this._XMLRequest !== null) {
                        this._XMLRequest.Send();
                        _7a4 = this._XMLRequest.GetResponse();
                    }
                    return this._onGetResponse(_7a3, _7a4);
                }
            },
            _onGetResponse: function (_7b0, _7b1) {
                _7b1.RequestMethod = this._Method;
                ITHit.Events.DispatchEvent(this, "OnResponse", _7b1);
                var _7b2 = new ITHit.WebDAV.Client.HttpStatus(_7b1.Status, _7b1.StatusDescription);
                if (_7b1.Status == ITHit.WebDAV.Client.HttpStatus.Redirect.Code) {
                    window.location.replace(_7b1.Headers["Location"]);
                }
                if (!_7b2.IsSuccess()) {
                    throw self.ProcessWebException(_7b1);
                }
                return new ITHit.WebDAV.Client.WebDavResponse(_7b1, _7b0.Method);
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
            constructor: function (_7b4) {
                this.CountTotal = _7b4;
                this._RequestsComplete = {};
                this._RequestsXhr = {};
            },
            SetComplete: function (_7b5) {
                if (this._RequestsComplete[_7b5]) {
                    return;
                }
                this._RequestsComplete[_7b5] = true;
                this.CountComplete++;
                if (this._RequestsXhr[_7b5]) {
                    this._RequestsXhr[_7b5].loaded = this._RequestsXhr[_7b5].total;
                    this.SetXhrEvent(_7b5, this._RequestsXhr[_7b5]);
                } else {
                    this._UpdatePercent();
                }
            },
            SetXhrEvent: function (_7b6, _7b7) {
                this._RequestsXhr[_7b6] = _7b7;
                if (this.LengthComputable === false) {
                    return;
                }
                this._ResetBytes();
                for (var iId in this._RequestsXhr) {
                    if (!this._RequestsXhr.hasOwnProperty(iId)) {
                        continue;
                    }
                    var _7b9 = this._RequestsXhr[iId];
                    if (_7b9.lengthComputable === false || !_7b9.total) {
                        this.LengthComputable = false;
                        this._ResetBytes();
                        break;
                    }
                    this.BytesLoaded += _7b9.loaded;
                    this.BytesTotal += _7b9.total;
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
                        var _7bb = this._RequestsXhr[iId];
                        this.Percent += (_7bb.loaded * 100 / _7bb.total) / this.CountTotal;
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
            constructor: function (_7bd, _7be, _7bf) {
                _7be = _7be || this.__instanceName;
                _7bf = _7bf || 1;
                this.Session = _7bd;
                this.Name = _7be;
                this.Id = self.IdCounter++;
                this._WebDavRequests = [];
                this._RequestsCount = _7bf;
                this.Progress = new ITHit.WebDAV.Client.RequestProgress(_7bf);
            },
            AddListener: function (_7c0, _7c1, _7c2) {
                _7c2 = _7c2 || null;
                switch (_7c0) {
                    case self.EVENT_ON_PROGRESS:
                    case self.EVENT_ON_ERROR:
                    case self.EVENT_ON_FINISH:
                        ITHit.Events.AddListener(this, _7c0, _7c1, _7c2);
                        break;
                    default:
                        throw new ITHit.WebDAV.Client.Exceptions.WebDavException("Not found event name `" + _7c0 + "`");
                }
            },
            RemoveListener: function (_7c3, _7c4, _7c5) {
                _7c5 = _7c5 || null;
                switch (_7c3) {
                    case self.EVENT_ON_PROGRESS:
                    case self.EVENT_ON_ERROR:
                    case self.EVENT_ON_FINISH:
                        ITHit.Events.RemoveListener(this, _7c3, _7c4, _7c5);
                        break;
                    default:
                        throw new ITHit.WebDAV.Client.Exceptions.WebDavException("Not found event name `" + _7c3 + "`");
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
                var _7c8 = new Date();
                ITHit.Logger.WriteMessage("[" + this.Id + "] ----------------- Finished: " + _7c8.toUTCString() + " [" + _7c8.getTime() + "] -----------------" + "\n", ITHit.LogLevel.Info);
            },
            CreateWebDavRequest: function (_7c9, _7ca, _7cb) {
                var sId = this.Id;
                var _7cd = new Date();
                if (this._WebDavRequests.length >= this._RequestsCount && typeof window.console !== "undefined") {
                    console.error("Wrong count of requests in [" + this.Id + "] `" + this.Name + "`");
                }
                ITHit.Logger.WriteMessage("\n[" + sId + "] ----------------- Started: " + _7cd.toUTCString() + " [" + _7cd.getTime() + "] -----------------", ITHit.LogLevel.Info);
                ITHit.Logger.WriteMessage("[" + sId + "] Context Name: " + this.Name, ITHit.LogLevel.Info);
                var _7ce = this.Session.CreateWebDavRequest(_7c9, _7ca, _7cb);
                ITHit.Events.AddListener(_7ce, "OnBeforeRequestSend", "_OnBeforeRequestSend", this);
                ITHit.Events.AddListener(_7ce, "OnResponse", "_OnResponse", this);
                ITHit.Events.AddListener(_7ce, "OnProgress", "_OnProgress", this);
                ITHit.Events.AddListener(_7ce, "OnFinish", "_OnFinish", this);
                this._WebDavRequests.push(_7ce);
                return _7ce;
            },
            _OnBeforeRequestSend: function (_7cf) {
                this._WriteRequestLog(_7cf);
            },
            _OnResponse: function (_7d0) {
                this._WriteResponseLog(_7d0);
            },
            _OnProgress: function (_7d1, _7d2) {
                var _7d3 = this.Progress.Percent;
                this.Progress.SetXhrEvent(_7d2, _7d1);
                if (this.Progress.Percent !== _7d3) {
                    ITHit.Events.DispatchEvent(this, self.EVENT_ON_PROGRESS, [{
                        Progress: this.Progress,
                        Request: this
                    }]);
                }
            },
            _OnFinish: function (_7d4, _7d5) {
                var _7d6 = this.Progress.Percent;
                this.Progress.SetComplete(_7d5);
                if (this.Progress.Percent !== _7d6) {
                    ITHit.Events.DispatchEvent(this, self.EVENT_ON_PROGRESS, [{
                        Progress: this.Progress,
                        Request: this
                    }]);
                }
                if (!_7d4.IsSuccess) {
                    ITHit.Events.DispatchEvent(this, self.EVENT_ON_ERROR, [{
                        Error: _7d4.Error,
                        AsyncResult: _7d4,
                        Request: this
                    }]);
                }
            },
            _WriteRequestLog: function (_7d7) {
                ITHit.Logger.WriteMessage("[" + this.Id + "] " + _7d7.Method + " " + _7d7.Href, ITHit.LogLevel.Info);
                var _7d8 = [];
                for (var _7d9 in _7d7.Headers) {
                    if (_7d7.Headers.hasOwnProperty(_7d9)) {
                        _7d8.push(_7d9 + ": " + _7d7.Headers[_7d9]);
                    }
                }
                ITHit.Logger.WriteMessage("[" + this.Id + "] " + _7d8.join("\n"), ITHit.LogLevel.Info);
                var _7da = String(_7d7.Body) || "";
                if (_7d7.Method.toUpperCase() !== "PUT" && _7d7.Body) {
                    ITHit.Logger.WriteMessage("[" + this.Id + "] " + _7da, ITHit.LogLevel.Info);
                }
            },
            _WriteResponseLog: function (_7db) {
                ITHit.Logger.WriteMessage("\n[" + this.Id + "] " + _7db.Status + " " + _7db.StatusDescription, ITHit.LogLevel.Info);
                var _7dc = [];
                for (var _7dd in _7db.Headers) {
                    if (_7db.Headers.hasOwnProperty(_7dd)) {
                        _7dc.push(_7dd + ": " + _7db.Headers[_7dd]);
                    }
                }
                ITHit.Logger.WriteMessage("[" + this.Id + "] " + _7dc.join("\n"), ITHit.LogLevel.Info);
                var _7de = (parseInt(_7db.Status / 100) == 2);
                var _7df = _7db.BodyXml && _7db.BodyXml.childNodes.length ? String(new ITHit.XMLDoc(_7db.BodyXml)) : _7db.BodyText;
                if (!_7de || _7db.RequestMethod.toUpperCase() !== "GET") {
                    ITHit.Logger.WriteMessage("[" + this.Id + "] " + _7df, _7de ? ITHit.LogLevel.Info : ITHit.LogLevel.Debug);
                }
            }
        });
    })();
    (function () {
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.WebDavSession", null, {
            __static: {
                Version: "2.5.1824.0",
                EVENT_ON_BEFORE_REQUEST_SEND: "OnBeforeRequestSend",
                EVENT_ON_RESPONSE: "OnResponse"
            }, ServerEngine: null, _IsIisDetected: null, _User: "", _Pass: "", constructor: function () {
                eval(String.fromCharCode.call(this, 104 + 1, 102, 40, 35 + 75, 1 + 100, 119, 32, 68, 54 + 43, 54 + 62, 101, 17 + 23, 50, 22 + 26, 49, 54, 27 + 17, 49, 43 + 6, 36 + 8, 50, 33 + 8, 38 + 22, 110, 43 + 58, 119, 32, 68, 31 + 66, 116, 19 + 82, 38 + 2, 10 + 31, 27 + 14, 68 + 55, 99, 93 + 18, 110, 73 + 29, 105, 8 + 106, 94 + 15, 33 + 7, 10 + 24, 84, 104, 101, 32, 49 + 67, 105 + 9, 105, 97, 108, 5 + 27, 51 + 53, 78 + 19, 115, 32, 3 + 98, 63 + 57, 112, 5 + 100, 114, 101, 100, 46, 32, 43 + 41, 111, 32, 112, 107 + 10, 85 + 29, 99, 104, 97, 115, 80 + 21, 4 + 28, 97, 32, 9 + 93, 117, 80 + 28, 53 + 55, 32, 17 + 101, 101, 49 + 65, 69 + 46, 85 + 20, 6 + 105, 42 + 68, 23 + 9, 112, 108, 101, 88 + 9, 115, 101, 32, 102, 35 + 76, 10 + 98, 101 + 7, 111, 119, 15 + 17, 14 + 102, 104, 93 + 12, 115, 11 + 21, 108, 99 + 6, 110, 64 + 43, 58, 32, 104, 116, 116, 24 + 88, 115, 22 + 36, 45 + 2, 20 + 27, 102 + 17, 23 + 96, 109 + 10, 46, 112 + 7, 3 + 98, 18 + 80, 100, 97, 118, 115, 121, 67 + 48, 116, 101, 109, 46, 99, 111, 109, 0 + 47, 112, 114, 103 + 2, 99, 82 + 23, 18 + 92, 103, 12 + 34, 32, 24 + 59, 101, 108, 3 + 98, 99, 116, 23 + 9, 27 + 52, 75, 32, 116, 25 + 86, 9 + 23, 84 + 26, 97, 118 + 0, 105, 37 + 66, 66 + 31, 116, 35 + 66, 22 + 10, 81 + 35, 111, 32, 72 + 44, 104, 47 + 54, 32, 97, 98, 111, 118, 101, 32, 26 + 59, 29 + 53, 76, 40 + 6, 34, 41, 38, 38, 32, 108, 13 + 98, 99, 97, 116, 50 + 55, 33 + 78, 110, 46, 104, 93 + 21, 101, 88 + 14, 1 + 31, 61, 32, 34, 104, 6 + 110, 116, 112, 115, 58, 13 + 34, 47, 29 + 90, 18 + 101, 119 + 0, 46, 21 + 98, 17 + 84, 86 + 12, 49 + 51, 97, 118, 115, 114 + 7, 115, 116, 101, 109, 31 + 15, 61 + 38, 75 + 36, 109, 47, 112, 13 + 101, 42 + 63, 99, 72 + 33, 105 + 5, 103, 1 + 34, 97, 106, 97, 120, 108, 105, 98, 1 + 33, 59, 43 + 73, 70 + 34, 62 + 52, 111, 119, 32, 34, 71 + 13, 88 + 16, 51 + 50, 32, 72 + 44, 37 + 77, 83 + 22, 19 + 78, 108, 28 + 4, 26 + 86, 101, 76 + 38, 66 + 39, 111, 100, 32, 104, 5 + 92, 19 + 96, 32, 101, 120, 44 + 68, 11 + 94, 19 + 95, 33 + 68, 41 + 59, 34, 59, 125, 59, 59));
            }, AddListener: function (_7e1, _7e2, _7e3) {
                _7e3 = _7e3 || null;
                switch (_7e1) {
                    case self.EVENT_ON_BEFORE_REQUEST_SEND:
                    case self.EVENT_ON_RESPONSE:
                        ITHit.Events.AddListener(this, _7e1, _7e2, _7e3);
                        break;
                    default:
                        throw new ITHit.WebDAV.Client.Exceptions.WebDavException("Not found event name `" + _7e1 + "`");
                }
            }, RemoveListener: function (_7e4, _7e5, _7e6) {
                _7e6 = _7e6 || null;
                switch (_7e4) {
                    case self.EVENT_ON_BEFORE_REQUEST_SEND:
                    case self.EVENT_ON_RESPONSE:
                        ITHit.Events.RemoveListener(this, _7e4, _7e5, _7e6);
                        break;
                    default:
                        throw new ITHit.WebDAV.Client.Exceptions.WebDavException("Not found event name `" + _7e4 + "`");
                }
            }, OpenFile: function (_7e7, _7e8) {
                _7e8 = _7e8 || [];
                var _7e9 = this.CreateRequest(this.__className + ".OpenFile()");
                var _7ea = ITHit.WebDAV.Client.File.OpenItem(_7e9, _7e7, _7e8);
                _7e9.MarkFinish();
                return _7ea;
            }, OpenFileAsync: function (_7eb, _7ec, _7ed) {
                _7ec = _7ec || [];
                var _7ee = this.CreateRequest(this.__className + ".OpenFileAsync()");
                ITHit.WebDAV.Client.File.OpenItemAsync(_7ee, _7eb, _7ec, function (_7ef) {
                    _7ee.MarkFinish();
                    _7ed(_7ef);
                });
                return _7ee;
            }, OpenResource: function (_7f0, _7f1) {
                _7f1 = _7f1 || [];
                return this.OpenFile(_7f0, _7f1);
            }, OpenResourceAsync: function (_7f2, _7f3, _7f4) {
                _7f3 = _7f3 || [];
                return this.OpenFileAsync(_7f2, _7f3, _7f4);
            }, OpenFolder: function (_7f5, _7f6) {
                _7f6 = _7f6 || [];
                var _7f7 = this.CreateRequest(this.__className + ".OpenFolder()");
                var _7f8 = ITHit.WebDAV.Client.Folder.OpenItem(_7f7, _7f5, _7f6);
                _7f7.MarkFinish();
                return _7f8;
            }, OpenFolderAsync: function (_7f9, _7fa, _7fb) {
                _7fa = _7fa || [];
                var _7fc = this.CreateRequest(this.__className + ".OpenFolderAsync()");
                ITHit.WebDAV.Client.Folder.OpenItemAsync(_7fc, _7f9, _7fa, function (_7fd) {
                    _7fc.MarkFinish();
                    _7fb(_7fd);
                });
                return _7fc;
            }, OpenItem: function (_7fe, _7ff) {
                _7ff = _7ff || [];
                var _800 = this.CreateRequest(this.__className + ".OpenItem()");
                var _801 = ITHit.WebDAV.Client.HierarchyItem.OpenItem(_800, _7fe, _7ff);
                _800.MarkFinish();
                return _801;
            }, OpenItemAsync: function (_802, _803, _804) {
                _803 = _803 || [];
                var _805 = this.CreateRequest(this.__className + ".OpenItemAsync()");
                ITHit.WebDAV.Client.HierarchyItem.OpenItemAsync(_805, _802, _803, function (_806) {
                    _805.MarkFinish();
                    _804(_806);
                });
                return _805;
            }, CreateRequest: function (_807, _808) {
                return new ITHit.WebDAV.Client.Request(this, _807, _808);
            }, CreateWebDavRequest: function (_809, _80a, _80b) {
                if ("undefined" == typeof _80b) {
                    _80b = [];
                }
                var _80c = ITHit.WebDAV.Client.WebDavRequest.Create(_80a, _80b, this._User, this._Pass, _809);
                ITHit.Events.AddListener(_80c, "OnBeforeRequestSend", "OnBeforeRequestSendHandler", this);
                ITHit.Events.AddListener(_80c, "OnResponse", "OnResponseHandler", this);
                return _80c;
            }, OnBeforeRequestSendHandler: function (_80d, _80e) {
                ITHit.Events.RemoveListener(_80e, "OnBeforeRequestSend", "OnBeforeRequestSendHandler", this);
                return ITHit.Events.DispatchEvent(this, "OnBeforeRequestSend", _80d);
            }, OnResponseHandler: function (_80f, _810) {
                var _810 = arguments[arguments.length - 1];
                if (this.ServerEngine === null) {
                    this.ServerEngine = _80f.GetResponseHeader("x-engine", true);
                }
                if (this._IsIisDetected === null) {
                    var _811 = _80f.GetResponseHeader("server", true);
                    this._IsIisDetected = (/^Microsoft-IIS\//i.test(_811));
                }
                ITHit.Events.RemoveListener(_810, "OnResponse", "OnResponseHandler", this);
                return ITHit.Events.DispatchEvent(this, "OnResponse", _80f);
            }, Undelete: function (_812) {
                var _813 = this.CreateRequest(this.__className + ".Undelete()");
                _812 = ITHit.WebDAV.Client.Encoder.EncodeURI(_812);
                var _814 = ITHit.WebDAV.Client.Methods.Undelete.Go(_813, _812, ITHit.WebDAV.Client.HierarchyItem.GetHost(_812));
                _813.MarkFinish();
                return _814;
            }, SetCredentials: function (_815, _816) {
                this._User = _815;
                this._Pass = _816;
            }, GetIisDetected: function () {
                return this._IsIisDetected;
            }
        });
    })();
    ITHit.Temp = {};
    eXo.ecm.ECMWebDav = ITHit;
    return {
        ECMWebDav: eXo.ecm.ECMWebDav
    };

})();
