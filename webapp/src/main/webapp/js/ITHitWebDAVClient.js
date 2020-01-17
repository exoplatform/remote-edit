(function () {
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
            IOS: (/iPad|iPhone|iPod/.test(_15)),
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
                    } else {
                        if (_16.IOS) {
                            _16.OS = "IOS";
                        }
                    }
                }
            }
        }
        return _16;
    }());
    ITHit.Add("DetectBrowser", function () {
        var _17 = navigator.userAgent,
            _18 = {IE: false, FF: false, Chrome: false, Safari: false, Opera: false, Browser: null, Mac: false}, _19 = {
                IE: {Search: "MSIE", Browser: "IE"},
                IE11: {Search: "Trident/7", Version: "rv", Browser: "IE"},
                Edge: {Search: "Edge", Browser: "Edge"},
                FF: {Search: ["Firefox", "FxiOS"], Browser: "FF"},
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
            var pos = -1;
            if (Array.isArray(_19[_1a].Search)) {
                for (var i = 0; i < _19[_1a].Search.length; i++) {
                    pos = _17.indexOf(_19[_1a].Search[i]);
                    if (-1 != pos) {
                        break;
                    }
                }
            } else {
                pos = _17.indexOf(_19[_1a].Search);
            }
            if (-1 != pos) {
                _18.Browser = _19[_1a].Browser;
                _18.Mac = navigator.platform.indexOf("Mac") == 0;
                _18.iPad = (_19[_1a].iPad && _17.indexOf(_19[_1a].iPad) != -1);
                _18.iPhone = (_19[_1a].iPhone && _17.indexOf(_19[_1a].iPhone) != -1);
                var _1d = _19[_1a].Version || _19[_1a].Search, _1e = _17.indexOf(_1d);
                if (-1 == _1e) {
                    _18[_19[_1a].Browser] = true;
                    break;
                }
                _18[_19[_1a].Browser] = parseFloat(_17.substring(_1e + _1d.length + 1));
                break;
            }
        }
        return _18;
    }());
    ITHit.Add("DetectDevice", function () {
        var _1f = navigator.userAgent;
        var _20 = {};
        var _21 = {
            Android: {Search: "Android"},
            BlackBerry: {Search: "BlackBerry"},
            iOS: {Search: "iPhone|iPad|iPod"},
            Opera: {Search: "Opera Mini"},
            Windows: {Search: "IEMobile"},
            Mobile: {}
        };
        for (var _22 in _21) {
            var _23 = _21[_22];
            if (!_23.Search) {
                continue;
            }
            var _24 = new RegExp(_23.Search, "i");
            _20[_22] = _24.test(_1f);
            if (!_20.Mobile && _20[_22]) {
                _20.Mobile = true;
            }
        }
        return _20;
    }());
    ITHit.Add("HttpRequest", function (_25, _26, _27, _28, _29, _2a) {
        if (!ITHit.Utils.IsString(_25)) {
            throw new ITHit.Exception("Expexted string href in ITHit.HttpRequest. Passed: \"" + _25 + "\"", "sHref");
        }
        if (!ITHit.Utils.IsObjectStrict(_27) && !ITHit.Utils.IsNull(_27) && !ITHit.Utils.IsUndefined(_27)) {
            throw new ITHit.Exception("Expexted headers list as object in ITHit.HttpRequest.", "oHeaders");
        }
        this.Href = _25;
        this.Method = _26;
        this.Headers = _27;
        this.Body = _28;
        this.User = _29 || null;
        this.Password = _2a || null;
    });
    ITHit.Add("HttpResponse", function () {
        var _2b = function (_2c, _2d, _2e, _2f) {
            if (!ITHit.Utils.IsString(_2c)) {
                throw new ITHit.Exception("Expexted string href in ITHit.HttpResponse. Passed: \"" + _2c + "\"", "sHref");
            }
            if (!ITHit.Utils.IsInteger(_2d)) {
                throw new ITHit.Exception("Expexted integer status in ITHit.HttpResponse.", "iStatus");
            }
            if (!ITHit.Utils.IsString(_2e)) {
                throw new ITHit.Exception("Expected string status description in ITHit.HttpResponse.", "sStatusDescription");
            }
            if (_2f && !ITHit.Utils.IsObjectStrict(_2f)) {
                throw new ITHit.Exception("Expected object headers in ITHit.HttpResponse.", "oHeaders");
            } else {
                if (!_2f) {
                    _2f = {};
                }
            }
            this.Href = _2c;
            this.Status = _2d;
            this.StatusDescription = _2e;
            this.Headers = _2f;
            this.BodyXml = null;
            this.BodyText = "";
        };
        _2b.prototype._SetBody = function (_30, _31) {
            this.BodyXml = _30 || null;
            this.BodyText = _31 || "";
        };
        _2b.prototype.SetBodyText = function (_32) {
            this.BodyXml = null;
            this.BodyText = _32;
        };
        _2b.prototype.SetBodyXml = function (_33) {
            this.BodyXml = _33;
            this.BodyText = "";
        };
        _2b.prototype.ParseXml = function (_34) {
            if (!ITHit.Utils.IsString(_34)) {
                throw new ITHit.Exception("Expected XML string in ITHit.HttpResponse.ParseXml", "sXml");
            }
            var _35 = new ITHit.XMLDoc();
            _35.load(_34);
            this.BodyXml = _35._get();
            this.BodyText = _34;
        };
        _2b.prototype.GetResponseHeader = function (_36, _37) {
            if (!_37) {
                return this.Headers[_36];
            } else {
                var _36 = String(_36).toLowerCase();
                for (var _38 in this.Headers) {
                    if (_36 === String(_38).toLowerCase()) {
                        return this.Headers[_38];
                    }
                }
                return undefined;
            }
        };
        return _2b;
    }());
    ITHit.Add("XMLRequest", (function () {
        var _39;
        var _3a = function () {
            if (ITHit.DetectBrowser.IE && ITHit.DetectBrowser.IE < 10 && window.ActiveXObject) {
                if (_39) {
                    return new ActiveXObject(_39);
                } else {
                    var _3b = ["MSXML2.XmlHttp.6.0", "MSXML2.XmlHttp.3.0"];
                    for (var i = 0; i < _3b.length; i++) {
                        try {
                            var _3d = new ActiveXObject(_3b[i]);
                            _39 = _3b[i];
                            return _3d;
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
        var _3e = function (_3f) {
            var _40 = {};
            if (!_3f) {
                return _40;
            }
            var _41 = _3f.split("\n");
            for (var i = 0; i < _41.length; i++) {
                if (!ITHit.Trim(_41[i])) {
                    continue;
                }
                var _43 = _41[i].split(":");
                var _44 = _43.shift();
                _40[_44] = ITHit.Trim(_43.join(":"));
            }
            return _40;
        };
        var _45 = function (_46, _47) {
            this.bAsync = _47 === true;
            this.IsAborted = false;
            this.OnData = null;
            this.OnError = null;
            this.OnProgress = null;
            this.OnUploadProgress = null;
            this.oHttpRequest = _46;
            this.oError = null;
            if (!_46.Href) {
                throw new ITHit.Exception("Server url had not been set.");
            }
            if (ITHit.Logger && ITHit.LogLevel) {
                ITHit.Logger.WriteMessage("[" + _46.Href + "]");
            }
            this.oRequest = _3a();
            var _48 = String(_46.Href);
            var _49 = _46.Method || "GET";
            try {
                if (_46.User) {
                    this.oRequest.open(_49, ITHit.DecodeHost(_48), this.bAsync, _46.User, _46.Password);
                } else {
                    this.oRequest.open(_49, ITHit.DecodeHost(_48), this.bAsync);
                }
                if (ITHit.DetectBrowser.IE && ITHit.DetectBrowser.IE >= 10) {
                    try {
                        this.oRequest.responseType = "msxml-document";
                    } catch (e) {
                    }
                }
            } catch (e) {
                var _4a = _48.match(/(?:\/\/)[^\/]+/);
                if (_4a) {
                    var _4b = _4a[0].substr(2);
                    if (_45.Host != _4b) {
                        throw new ITHit.Exception(ITHit.Phrases.CrossDomainRequestAttempt.Paste(window.location, _48, String(_49)), e);
                    } else {
                        throw e;
                    }
                }
            }
            for (var _4c in _46.Headers) {
                this.oRequest.setRequestHeader(_4c, _46.Headers[_4c]);
            }
            if (this.bAsync) {
                try {
                    this.oRequest.withCredentials = true;
                } catch (e) {
                }
            }
            if (this.bAsync) {
                var _4d = this;
                this.oRequest.onreadystatechange = function () {
                    if (_4d.oRequest.readyState != 4) {
                        return;
                    }
                    var _4e = _4d.GetResponse();
                    if (typeof _4d.OnData === "function") {
                        _4d.OnData.call(_4d, _4e);
                    }
                };
                if ("onprogress" in this.oRequest) {
                    this.oRequest.onprogress = function (_4f) {
                        if (typeof _4d.OnProgress === "function") {
                            _4d.OnProgress.call(_4d, _4f);
                        }
                    };
                }
                if (this.oRequest.upload && "onprogress" in this.oRequest) {
                    this.oRequest.upload.onprogress = function (_50) {
                        if (typeof _4d.OnUploadProgress === "function") {
                            _4d.OnUploadProgress.call(_4d, _50);
                        }
                    };
                }
            }
        };
        _45.prototype.Send = function () {
            var _51 = this.oHttpRequest.Body;
            _51 = _51 || (ITHit.Utils.IsUndefined(_51) || ITHit.Utils.IsNull(_51) || ITHit.Utils.IsBoolean(_51) ? "" : _51);
            if (_51 === "") {
                _51 = null;
            }
            try {
                this.oRequest.send(_51);
            } catch (e) {
                this.oError = e;
                if (typeof this.OnError === "function") {
                    this.OnError.call(this, e);
                }
            }
        };
        _45.prototype.Abort = function () {
            if (this.oRequest) {
                try {
                    this.IsAborted = true;
                    this.oRequest.abort();
                } catch (e) {
                    this.oError = e;
                    if (typeof this.OnError === "function") {
                        this.OnError.call(this, e);
                    }
                }
            }
        };
        _45.prototype.GetResponse = function () {
            var _52 = this.oHttpRequest;
            var _53 = this.oRequest;
            var _54 = String(_52.Href);
            if (this.bAsync && _53.readyState != 4) {
                throw new ITHit.Exception("Request sended as asynchronous, please register callback through XMLRequest.OnData() method for get responce object.");
            }
            if ((404 == _53.status) && (-1 != _54.indexOf(".js") && (_52.Method !== "PROPFIND"))) {
                ITHit.debug.loadTrace.failed(ITHit.debug.loadTrace.FAILED_LOAD);
                throw new ITHit.Exception("Failed to load script (\"" + _54 + "\"). Request returned status: " + _53.status + (_53.statusText ? " (" + _53.statusText + ")" : "") + ".", this.oError || undefined);
            }
            var _55 = this.FixResponseStatus(_53.status, _53.statusText);
            var _56 = new ITHit.HttpResponse(_54, _55.Status, _55.StatusDescription, _3e(_53.getAllResponseHeaders()));
            _56._SetBody(_53.responseXML, _53.responseText);
            return _56;
        };
        _45.prototype.FixResponseStatus = function (_57, _58) {
            var _59 = {Status: _57, StatusDescription: _58};
            if (1223 == _57) {
                _59.Status = 204;
                _59.StatusDescription = "No Content";
            }
            return _59;
        };
        _45.Host = window.location.host;
        return _45;
    })());
    ITHit.Add("Utils", {
        IsString: function (_5a) {
            return (("string" == typeof _5a) || (_5a instanceof String));
        }, IsNumber: function (_5b) {
            return ("number" == typeof _5b);
        }, IsBoolean: function (_5c) {
            return (("boolean" == typeof _5c) || (_5c instanceof Boolean));
        }, IsInteger: function (_5d) {
            return this.IsNumber(_5d) && (-1 == String(_5d).indexOf("."));
        }, IsArray: function (_5e) {
            return (_5e instanceof Array || ("array" == typeof _5e));
        }, IsFunction: function (_5f) {
            return (_5f instanceof Function);
        }, IsObject: function (_60) {
            return ("object" == typeof _60);
        }, IsDate: function (_61) {
            return (_61 instanceof Date);
        }, IsRegExp: function (_62) {
            return (_62 instanceof RegExp);
        }, IsObjectStrict: function (_63) {
            return this.IsObject(_63) && !this.IsArray(_63) && !this.IsString(_63) && !this.IsNull(_63) && !this.IsNumber(_63) && !this.IsDate(_63) && !this.IsRegExp(_63) && !this.IsBoolean(_63) && !this.IsFunction(_63) && !this.IsNull(_63);
        }, IsUndefined: function (_64) {
            return (undefined === _64);
        }, IsNull: function (_65) {
            return (null === _65);
        }, IsDOMObject: function (_66) {
            return _66 && this.IsObject(_66) && !this.IsUndefined(_66.nodeType);
        }, HtmlEscape: function (_67) {
            return String(_67).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }, IndexOf: function (_68, _69, _6a) {
            var i = 0, _6c = _68 && _68.length;
            if (typeof _6a == "number") {
                i = _6a < 0 ? Math.max(0, _6c + _6a) : _6a;
            }
            for (; i < _6c; i++) {
                if (_68[i] === _69) {
                    return i;
                }
            }
            return -1;
        }, Contains: function (_6d, _6e) {
            return _6d && _6e && this.IsArray(_6d) && (this.IndexOf(_6d, _6e) >= 0);
        }, FindBy: function (_6f, _70, _71) {
            if (_6f.find) {
                return _6f.find(_70, _71);
            }
            for (var i = 0; i < _6f.length; i++) {
                var _73 = _6f[i];
                if (_70(_73, i, _6f)) {
                    return _73;
                }
            }
            return undefined;
        }, FilterBy: function (_74, _75, _76) {
            var _77 = [];
            if (_74.filter) {
                return _74.filter(_75, _76);
            }
            for (var i = 0; i < _74.length; i++) {
                var _79 = _74[i];
                if (_75(_79, i, _74)) {
                    _77.push(_79);
                }
            }
            return _77;
        }, NoOp: function () {
        }, CreateDOMElement: function (_7a, _7b) {
            var _7c = ITHit.Utils;
            if (_7c.IsObject(_7a)) {
                if (!_7a.nodeName) {
                    throw new ITHit.Exception("nodeName property does not specified.");
                }
                _7b = _7a;
                _7a = _7a.nodeName;
                delete _7b.nodeName;
            }
            var _7d = document.createElement(_7a);
            if (_7b && _7c.IsObject(_7b)) {
                for (var _7e in _7b) {
                    if (!_7b.hasOwnProperty(_7e)) {
                        continue;
                    }
                    switch (_7e) {
                        case "class":
                            if (_7b[_7e]) {
                                _7d.className = _7b[_7e];
                            }
                            break;
                        case "style":
                            var _7f = _7b[_7e];
                            for (var _80 in _7f) {
                                if (!_7f.hasOwnProperty(_80)) {
                                    continue;
                                }
                                _7d.style[_80] = _7f[_80];
                            }
                            break;
                        case "childNodes":
                            for (var i = 0, l = _7b[_7e].length; i < l; i++) {
                                var _83 = _7b[_7e][i];
                                if (_7c.IsString(_83) || _7c.IsNumber(_83) || _7c.IsBoolean(_83)) {
                                    _83 = document.createTextNode(_83);
                                } else {
                                    if (!_83) {
                                        continue;
                                    }
                                }
                                if (!_7c.IsDOMObject(_83)) {
                                    _83 = ITHit.Utils.CreateDOMElement(_83);
                                }
                                _7d.appendChild(_83);
                            }
                            break;
                        default:
                            _7d[_7e] = _7b[_7e];
                    }
                }
            }
            return _7d;
        }, GetComputedStyle: function (_84) {
            ITHit.Utils.GetComputedStyle = ITHit.Components.dojo.getComputedStyle;
            return ITHit.Utils.GetComputedStyle(_84);
        }, MakeScopeClosure: function (_85, _86, _87) {
            if (this.IsUndefined(_87)) {
                return this._GetClosureFunction(_85, _86);
            } else {
                if (!this.IsArray(_87)) {
                    _87 = [_87];
                }
                return this._GetClosureParamsFunction(_85, _86, _87);
            }
        }, _GetClosureParamsFunction: function (_88, _89, _8a) {
            return function () {
                var _8b = [];
                for (var i = 0, l = _8a.length; i < l; i++) {
                    _8b.push(_8a[i]);
                }
                if (arguments.length) {
                    for (var i = 0, l = arguments.length; i < l; i++) {
                        _8b.push(arguments[i]);
                    }
                }
                if (ITHit.Utils.IsFunction(_89)) {
                    _89.apply(_88, _8b);
                } else {
                    _88[_89].apply(_88, _8b);
                }
            };
        }, _GetClosureFunction: function (_8e, _8f) {
            return function () {
                if (ITHit.Utils.IsFunction(_8f)) {
                    return _8f.apply(_8e, arguments);
                }
                return _8e[_8f].apply(_8e, arguments);
            };
        }
    });
    ITHit.Add("Trim", function (_90, _91, _92) {
        if (("string" != typeof _90) && !(_90 instanceof String)) {
            if (!_92) {
                return _90;
            } else {
                throw new ITHit.Exception("ITHit.Trim() expected string as first prameter.");
            }
        }
        switch (_91) {
            case ITHit.Trim.Left:
                return _90.replace(/^\s+/, "");
                break;
            case ITHit.Trim.Right:
                return _90.replace(/\s+$/, "");
                break;
            default:
                return _90.replace(/(?:^\s+|\s+$)/g, "");
        }
    });
    ITHit.Add("Trim.Left", "Left");
    ITHit.Add("Trim.Right", "Right");
    ITHit.Add("Trim.Both", "Both");
    ITHit.Add("Exception", (function () {
        var _93 = function (_94, _95) {
            this.Message = _94;
            this.InnerException = _95;
            if (ITHit.Logger.GetCount(ITHit.LogLevel.Error)) {
                var _96 = "Exception: " + this.Name + "\n" + "Message: " + this.Message + "\n";
                if (_95) {
                    _96 += ((!_95 instanceof Error) ? "Inner exception: " : "") + this.GetExceptionsStack(_95);
                }
                ITHit.Logger.WriteMessage(_96, ITHit.LogLevel.Error);
            }
        };
        _93.prototype.Name = "Exception";
        _93.prototype.GetExceptionsStack = function (_97, _98) {
            if ("undefined" === typeof _97) {
                var _97 = this;
            }
            var _98 = _98 ? _98 : 0;
            var _99 = "";
            var _9a = "      ";
            var _9b = "";
            for (var i = 0; i < _98; i++) {
                _9b += _9a;
            }
            if (_97 instanceof ITHit.Exception) {
                _99 += _9b + (_97.Message ? _97.Message : _97) + "\n";
            } else {
                if (ITHit.Config.ShowOriginalException) {
                    _99 += "\nOriginal exception:\n";
                    if (("string" != typeof _97) && !(_97 instanceof String)) {
                        for (var _9d in _97) {
                            _99 += "\t" + _9d + ": \"" + ITHit.Trim(_97[_9d]) + "\"\n";
                        }
                    } else {
                        _99 += "\t" + _97 + "\n";
                    }
                }
            }
            return _99;
        };
        _93.prototype.toString = function () {
            return this.GetExceptionsStack();
        };
        return _93;
    })());
    ITHit.Add("Extend", function (_9e, _9f) {
        function inheritance() {
        }

        inheritance.prototype = _9f.prototype;
        _9e.prototype = new inheritance();
        _9e.prototype.constructor = _9e;
        _9e.baseConstructor = _9f;
        if (_9f.base) {
            _9f.prototype.base = _9f.base;
        }
        _9e.base = _9f.prototype;
    });
    ITHit.Add("Events", function () {
        var _a0 = function () {
            this._Listeners = this._NewObject();
            this._DispatchEvents = {};
            this._DelayedDelete = {};
        };
        _a0.prototype._NewObject = function () {
            var obj = {};
            for (var _a2 in obj) {
                delete obj[_a2];
            }
            return obj;
        };
        _a0.prototype.AddListener = function (_a3, _a4, _a5, _a6) {
            var _a7 = _a3.__instanceName;
            var _a8;
            var _a9 = ITHit.EventHandler;
            if (!(_a5 instanceof ITHit.EventHandler)) {
                _a8 = new ITHit.EventHandler(_a6 || null, _a5);
            } else {
                _a8 = _a5;
            }
            var _aa = this._Listeners[_a7] || (this._Listeners[_a7] = this._NewObject());
            var _ab = _aa[_a4] || (_aa[_a4] = []);
            var _ac = false;
            for (var i = 0, l = _ab.length; i < l; i++) {
                if (_ab[i].IsEqual(_a8)) {
                    _ac = true;
                    break;
                }
            }
            if (!_ac) {
                _ab.push(_a8);
            }
        };
        _a0.prototype.DispatchEvent = function (_af, _b0, _b1) {
            var _b2 = _af.__instanceName;
            if (!this._Listeners[_b2] || !this._Listeners[_b2][_b0] || !this._Listeners[_b2][_b0].length) {
                return undefined;
            }
            var _b3 = ITHit.EventHandler;
            var _b4;
            var _b5 = [];
            for (var i = 0, l = this._Listeners[_b2][_b0].length; i < l; i++) {
                _b5.push(this._Listeners[_b2][_b0][i]);
            }
            this._DispatchEvents[_b2] = (this._DispatchEvents[_b2] || 0) + 1;
            this._DispatchEvents[_b2 + ":" + _b0] = (this._DispatchEvents[_b2 + ":" + _b0] || 0) + 1;
            for (var i = 0; i < _b5.length; i++) {
                var _b8;
                if (_b5[i] instanceof _b3) {
                    try {
                        _b8 = _b5[i].CallHandler(_af, _b0, _b1);
                    } catch (e) {
                        throw e;
                    }
                }
                if (_b5[i] instanceof Function) {
                    try {
                        _b8 = _b5[i](_af, _b0, _b1);
                    } catch (e) {
                        throw e;
                    }
                }
                if (!ITHit.Utils.IsUndefined(_b8)) {
                    _b4 = _b8;
                }
            }
            this._DispatchEvents[_b2]--;
            this._DispatchEvents[_b2 + ":" + _b0]--;
            this._CheckDelayedDelete(_af, _b0);
            return _b4;
        };
        _a0.prototype.RemoveListener = function (_b9, _ba, _bb, _bc) {
            var _bd = _b9.__instanceName;
            _bc = _bc || null;
            if (!this._Listeners[_bd] || !this._Listeners[_bd][_ba] || !this._Listeners[_bd][_ba].length) {
                return true;
            }
            var _be = this._Listeners[_bd][_ba];
            for (var i = 0, l = _be.length; i < l; i++) {
                if (_be[i].IsEqual(_bc, _bb)) {
                    this._Listeners[_bd][_ba].splice(i, 1);
                    break;
                }
            }
        };
        _a0.prototype.RemoveAllListeners = function (_c1, _c2) {
            var _c3 = _c1.__instanceName;
            if (!ITHit.Utils.IsUndefined(_c2)) {
                if (ITHit.Utils.IsUndefined(this._DispatchEvents[_c3 + ":" + _c2])) {
                    delete this._Listeners[_c3][_c2];
                } else {
                    this._DelayedDelete[_c3 + ":" + _c2] = true;
                }
            } else {
                if (ITHit.Utils.IsUndefined(this._DispatchEvents[_c3])) {
                    delete this._Listeners[_c3];
                } else {
                    this._DelayedDelete[_c3] = true;
                }
            }
        };
        _a0.prototype._CheckDelayedDelete = function (_c4, _c5) {
            var _c6 = _c4.__instanceName;
            if (!this._DispatchEvents[_c6 + ":" + _c5]) {
                delete this._DispatchEvents[_c6 + ":" + _c5];
                if (!ITHit.Utils.IsUndefined(this._DelayedDelete[_c6 + ":" + _c5])) {
                    this.RemoveAllListeners(_c4, _c5);
                }
            }
            if (!this._DispatchEvents[_c6]) {
                delete this._DispatchEvents[_c6];
                if (!ITHit.Utils.IsUndefined(this._DelayedDelete[_c6])) {
                    this.RemoveAllListeners(_c4);
                }
            }
        };
        _a0.prototype.ListenersLength = function (_c7, _c8) {
            var _c9 = _c7.__instanceName;
            if (!this._Listeners[_c9] || !this._Listeners[_c9][_c8]) {
                return 0;
            }
            return this._Listeners[_c9][_c8].length;
        };
        _a0.prototype.Fix = function (e) {
            e = e || window.event;
            if (!e.target && e.srcElement) {
                e.target = e.srcElement;
            }
            if ((null == e.pageX) && (null != e.clientX)) {
                var _cb = document.documentElement, _cc = document.body;
                e.pageX = e.clientX + (_cb && _cb.scrollLeft || _cc && _cc.scrollLeft || 0) - (_cb.clientLeft || 0);
                e.pageY = e.clientY + (_cb && _cb.scrollTop || _cc && _cc.scrollTop || 0) - (_cb.clientTop || 0);
            }
            if (!e.which && e.button) {
                e.which = e.button & 1 ? 1 : (e.button & 2 ? 3 : (e.button & 4 ? 2 : 0));
            }
            return e;
        };
        _a0.prototype.AttachEvent = function (_cd, _ce, _cf) {
            _ce = _ce.replace(/^on/, "");
            if (_cd.addEventListener) {
                _cd.addEventListener(_ce, _cf, false);
            } else {
                if (_cd.attachEvent) {
                    _cd.attachEvent("on" + _ce, _cf);
                } else {
                    _cd["on" + _ce] = _cf;
                }
            }
        };
        _a0.prototype.DettachEvent = function (_d0, _d1, _d2) {
            _d1 = _d1.replace(/^on/, "");
            if (_d0.removeEventListener) {
                _d0.removeEventListener(_d1, _d2, false);
            } else {
                if (_d0.detachEvent) {
                    _d0.detachEvent("on" + _d1, _d2);
                } else {
                    _d0["on" + _d1] = null;
                }
            }
        };
        _a0.prototype.Stop = function (e) {
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
        return new _a0();
    }());
    ITHit.Add("EventHandler", function () {
        var _d4 = function (_d5, _d6) {
            var _d7 = ITHit.Utils;
            if (!_d7.IsObjectStrict(_d5) && !_d7.IsNull(_d5)) {
                throw new ITHit.Exception("Event handler scope expected to be an object.");
            }
            if (!_d7.IsFunction(_d6) && (_d5 && !_d7.IsString(_d6))) {
                throw new ITHit.Exception("Method handler expected to be a string or function.");
            }
            if (_d5) {
                this.Scope = _d5;
                this.Name = _d5.__instanceName;
            } else {
                this.Scope = window;
                this.Name = "window";
            }
            this.Method = _d6;
        };
        _d4.prototype.IsEqual = function (_d8, _d9) {
            if (_d8 instanceof ITHit.EventHandler) {
                return this.GetCredentials() === _d8.GetCredentials();
            } else {
                return ((_d8 || null) === this.Scope) && (_d9 === this.Method);
            }
        };
        _d4.prototype.GetCredentials = function () {
            return this.Name + "::" + this.Method;
        };
        _d4.prototype.CallHandler = function (_da, _db, _dc) {
            if (!(_dc instanceof Array)) {
                _dc = [_dc];
            }
            if (this.Scope) {
                if (this.Method instanceof Function) {
                    return this.Method.apply(this.Scope || window, _dc.concat([_da]));
                } else {
                    try {
                        return this.Scope[this.Method].apply(this.Scope, _dc.concat([_da]));
                    } catch (e) {
                        throw new ITHit.Exception(e);
                    }
                }
            } else {
                return this.Method.apply({}, _dc.concat([_da]));
            }
        };
        return _d4;
    }());
    ITHit.Add("HtmlEncode", function (_dd) {
        return _dd.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&amp;").replace(/"/g, "&quot;");
    });
    ITHit.Add("HtmlDecode", function (_de) {
        return _de.replace(/&quot;/, "\"").replace(/&amp;/g, "'").replace(/&gt;/g, ">").replace(/&lt;/g, "<");
    });
    ITHit.Add("Encode", function (_df) {
        if (!_df) {
            return _df;
        }
        return ITHit.EncodeURI(_df.replace(/%/g, "%25")).replace(/~/g, "%7E").replace(/!/g, "%21").replace(/@/g, "%40").replace(/#/g, "%23").replace(/\$/g, "%24").replace(/&/g, "%26").replace(/\*/g, "%2A").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\-/g, "%2D").replace(/_/g, "%5F").replace(/\+/g, "%2B").replace(/\=/g, "%3D").replace(/'/g, "%27").replace(/;/g, "%3B").replace(/\,/g, "%2C").replace(/\?/g, "%3F");
    });
    ITHit.Add("EncodeURI", function (_e0) {
        if (!_e0) {
            return _e0;
        }
        return encodeURI(_e0).replace(/%25/g, "%");
    });
    ITHit.Add("Decode", function (_e1) {
        if (!_e1) {
            return _e1;
        }
        var _e1 = _e1.replace(/%7E/gi, "~").replace(/%21/g, "!").replace(/%40/g, "@").replace(/%23/g, "#").replace(/%24/g, "$").replace(/%26/g, "&").replace(/%2A/gi, "*").replace(/%28/g, "(").replace(/%29/g, ")").replace(/%2D/gi, "-").replace(/%5F/gi, "_").replace(/%2B/gi, "+").replace(/%3D/gi, "=").replace(/%27/g, "'").replace(/%3B/gi, ";").replace(/%2E/gi, ".").replace(/%2C/gi, ",").replace(/%3F/gi, "?");
        return ITHit.DecodeURI(_e1);
    });
    ITHit.Add("DecodeURI", function (_e2) {
        if (!_e2) {
            return _e2;
        }
        return decodeURI(_e2.replace(/%([^0-9A-F]|.(?:[^0-9A-F]|$)|$)/gi, "%25$1"));
    });
    ITHit.Add("DecodeHost", function (_e3) {
        if (/^(http|https):\/\/[^:\/]*?%/.test(_e3)) {
            var _e4 = _e3.match(/^(?:http|https):\/\/[^\/:]+/);
            if (_e4 && _e4[0]) {
                var _e5 = _e4[0].replace(/^(http|https):\/\//, "");
                _e3 = _e3.replace(_e5, ITHit.Decode(_e5));
            }
        }
        return _e3;
    });
    ITHit.Add("WebDAV.Client.LicenseId", null);
    (function () {
        var _e6 = function () {
        };
        var _e7 = function (_e8, _e9) {
            for (var key in _e9) {
                if (!_e9.hasOwnProperty(key)) {
                    continue;
                }
                var _eb = _e9[key];
                if (typeof _eb == "function" && typeof _e8[key] == "function" && _e8[key] !== _e6) {
                    _e8[key] = _ec(_eb, _e8[key]);
                } else {
                    _e8[key] = _eb;
                }
            }
            if (!_e8._super) {
                _e8._super = _e6;
            }
        };
        var _ec = function (_ed, _ee) {
            return function () {
                var old = this._super;
                this._super = _ee;
                var r = _ed.apply(this, arguments);
                this._super = old;
                return r;
            };
        };
        var _f1 = 0;
        ITHit.Add("DefineClass", function (_f2, _f3, _f4, _f5) {
            _f3 = _f3 !== null ? _f3 : function () {
            };
            if (!_f3) {
                throw new Error("Not found extended class for " + _f2);
            }
            if (_f4.hasOwnProperty("__static")) {
                _f5 = _f4.__static;
                delete _f4.__static;
            }
            var _f6;
            if (_f4 && _f4.hasOwnProperty("constructor")) {
                _f6 = function () {
                    this.__instanceName = this.__className + _f1++;
                    return _ec(_f4.constructor, _f3).apply(this, arguments);
                };
            } else {
                _f6 = function () {
                    this.__instanceName = this.__className + _f1++;
                    return _f3.apply(this, arguments);
                };
            }
            for (var _f7 in _f3) {
                _f6[_f7] = _f3[_f7];
            }
            _e7(_f6, _f5);
            var _f8 = function () {
                this.constructor = _f6;
            };
            _f8.prototype = _f3.prototype;
            _f6.prototype = new _f8;
            for (var key in _f8.prototype) {
                if (!_f8.prototype.hasOwnProperty(key)) {
                    continue;
                }
                var _fa = _f8.prototype[key];
                if (!_fa) {
                    continue;
                }
                if (_fa instanceof Array) {
                    if (_fa.length === 0) {
                        _f6.prototype[key] = [];
                    }
                } else {
                    if (typeof _fa === "object") {
                        var _fb = true;
                        for (var k in _fa) {
                            _fb = _fb && _fa.hasOwnProperty(k);
                        }
                        if (_fb) {
                            _f6.prototype[key] = {};
                        }
                    }
                }
            }
            if (_f4) {
                _e7(_f6.prototype, _f4);
            }
            _f6.__className = _f6.prototype.__className = _f2;
            var _fd = _f2.lastIndexOf("."), _fe = _f2.substr(_fd + 1);
            return ITHit.Declare(_f2.substr(0, _fd))[_fe] = _f6;
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
            ExceptionWhileParsingProperties: 'Exception while parsing properties.',
            IntegrationTimeoutException: 'Browser extention didnt fill data in {0} ms',
            FolderRewriteException: 'Rewrite of folders does not permitted.',
            NotFoundEventName: 'Not found event name `{0}`',
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
        FileUploadFailed: 'Failed to upload the file.',
        ProductName: 'IT Hit WebDAV AJAX Library',
        WrongParameterType: 'Wrong parameter type. Expected type is:{0}.',
        // WebDavResponse
        wdrs: {
            status: '\n{0} {1}',
            response: '{0}: {1}'
        }
    };

    (function () {
        ITHit.DefineClass("ITHit.Environment", null, {__static: {OS: ITHit.DetectOS.OS}});
    })();
    ITHit.oNS = ITHit.Declare("ITHit.Exceptions");
    ITHit.oNS.LoggerException = function (_ff, _100) {
        ITHit.Exceptions.LoggerException.baseConstructor.call(this, _ff, _100);
    };
    ITHit.Extend(ITHit.oNS.LoggerException, ITHit.Exception);
    ITHit.oNS.LoggerException.prototype.Name = "LoggerException";
    ITHit.DefineClass("ITHit.LogLevel", null, {}, {All: 32, Debug: 16, Info: 8, Warn: 4, Error: 2, Fatal: 1, Off: 0});
    (function () {
        var _101 = {};
        var _102 = {};
        var _103 = {};
        for (var _104 in ITHit.LogLevel) {
            _101[ITHit.LogLevel[_104]] = [];
            _103[ITHit.LogLevel[_104]] = [];
        }
        var _105 = function (_106, _107, iTo, _109) {
            for (var _10a in ITHit.LogLevel) {
                if (ITHit.LogLevel[_10a] > iTo) {
                    continue;
                }
                if (!ITHit.LogLevel[_10a] || (_107 >= ITHit.LogLevel[_10a])) {
                    continue;
                }
                if (_106) {
                    _103[ITHit.LogLevel[_10a]].push(_109);
                } else {
                    for (var i = 0; i < _103[ITHit.LogLevel[_10a]].length; i++) {
                        if (_103[ITHit.LogLevel[_10a]][i] == _109) {
                            _103[ITHit.LogLevel[_10a]].splice(i, 1);
                        }
                    }
                }
            }
        };
        _105.add = function (iTo, _10d) {
            _105.increase(ITHit.LogLevel.Off, iTo, _10d);
        };
        _105.del = function (iTo, _10f) {
            _105.decrease(ITHit.LogLevel.Off, iTo, _10f);
        };
        _105.increase = function (_110, iTo, _112) {
            _105(true, _110, iTo, _112);
        };
        _105.decrease = function (_113, iTo, _115) {
            _105(false, _113, iTo, _115);
        };
        ITHit.DefineClass("ITHit.Logger", null, {}, {
            Level: ITHit.Config.LogLevel || ITHit.LogLevel.Debug, AddListener: function (_116, _117) {
                if (_117 == ITHit.LogLevel.Off) {
                    this.RemoveListener();
                }
                var _118 = 0;
                var _119 = 0;
                outer:for (var _11a in _101) {
                    for (var i = 0; i < _101[_11a].length; i++) {
                        if (_101[_11a][i] == _116) {
                            _118 = _11a;
                            _119 = i;
                            break outer;
                        }
                    }
                }
                if (!_118) {
                    _101[_117].push(_116);
                    _105.add(_117, _116);
                } else {
                    if (_117 != _118) {
                        _101[_118].splice(_119, 1);
                        _101[_117].push(_116);
                        if (_117 > _118) {
                            _105.increase(_118, _117, _116);
                        } else {
                            _105.decrease(_117, _118, _116);
                        }
                    }
                }
            }, RemoveListener: function (_11c) {
                outer:for (var _11d in _101) {
                    for (var i = 0; i < _101[_11d].length; i++) {
                        if (_101[_11d][i] == _11c) {
                            _101[_11d].splice(i, 1);
                            _105.del(_11d, _11c);
                            break outer;
                        }
                    }
                }
                return true;
            }, SetLogLevel: function (_11f, _120) {
                return this.AddListener(_11f, _120, true);
            }, GetLogLevel: function (_121) {
                for (var _122 in _101) {
                    for (var i = 0; i < _101[_122].length; i++) {
                        if (_101[_122][i] == _121) {
                            return _122;
                        }
                    }
                }
                return false;
            }, GetListenersForLogLevel: function (_124) {
                return _103[_124];
            }, GetCount: function (_125) {
                return _103[_125].length;
            }, WriteResponse: function (_126) {
                if (Logger.GetCount(ITHit.LogLevel.Info)) {
                    var sStr = "";
                    if (_126 instanceof HttpWebResponse) {
                        sStr += "\n" + _126.StatusCode + " " + _126.StatusDescription + "\n";
                    }
                    sStr += _126.ResponseUri + "\n";
                    for (var _128 in _126.Headers) {
                        sStr += _128 + ": " + _126.Headers[_128] + "\n";
                    }
                    sStr += _126.GetResponse();
                    this.WriteMessage(sStr);
                }
            }, WriteMessage: function (_129, _12a) {
                _12a = ("undefined" == typeof _12a) ? ITHit.LogLevel.Info : parseInt(_12a);
                if (ITHit.Logger.GetCount(_12a)) {
                    var _12b = this.GetListenersForLogLevel(_12a);
                    var _129 = String(_129).replace(/([^\n])$/, "$1\n");
                    for (var i = 0; i < _12b.length; i++) {
                        try {
                            _12b[i](_129, ITHit.LogLevel.Info);
                        } catch (e) {
                            if (!_12b[i] instanceof Function) {
                                throw new ITHit.Exceptions.LoggerException("Log listener expected function, passed: \"" + _12b[i] + "\"", e);
                            } else {
                                throw new ITHit.Exceptions.LoggerException("Message could'not be logged.", e);
                            }
                        }
                    }
                }
            }, StartLogging: function () {
            }, FinishLogging: function () {
            }, StartRequest: function () {
            }, FinishRequest: function () {
            }
        });
    })();
    ITHit.oNS = ITHit.Declare("ITHit.Exceptions");
    ITHit.oNS.PhraseException = function (_12d, _12e) {
        ITHit.Exceptions.PhraseException.baseConstructor.call(this, _12d, _12e);
    };
    ITHit.Extend(ITHit.oNS.PhraseException, ITHit.Exception);
    ITHit.oNS.PhraseException.prototype.Name = "PhraseException";
    ITHit.Phrases = (function () {
        var _12f = {};
        var _130 = function (_131) {
            this._arguments = _131;
        };
        _130.prototype.Replace = function (_132) {
            var _133 = _132.substr(1, _132.length - 2);
            return ("undefined" != typeof this._arguments[_133]) ? this._arguments[_133] : _132;
        };
        var _134 = function (_135) {
            this._phrase = _135;
        };
        _134.prototype.toString = function () {
            return this._phrase;
        };
        _134.prototype.Paste = function () {
            var _136 = this._phrase;
            if (/\{\d+?\}/.test(_136)) {
                var _137 = new _130(arguments);
                _136 = _136.replace(/\{(\d+?)\}/g, function (args) {
                    return _137.Replace(args);
                });
            }
            return _136;
        };
        var _139 = function () {
        };
        _139.prototype.LoadJSON = function (_13a, _13b) {
            var _13c = ITHit.Utils;
            if (_13b && !_13c.IsString(_13b)) {
                throw new ITHit.Exceptions.PhraseException("Namespace expected to be a string.");
            }
            var _13d = this;
            if (_13b) {
                _13d = ITHit.Declare(_13b);
            }
            try {
                var _13e = _13a;
                if (_13c.IsString(_13e)) {
                    _13e = eval("(" + _13a + ")");
                }
                this._AddPhrases(_13e, _13d);
            } catch (e) {
                console.dir(e);
                throw new ITHit.Exceptions.PhraseException("Wrong text structure.", e);
            }
        };
        _139.prototype.LoadLocalizedJSON = function (_13f, _140, _141) {
            var _142 = ITHit.Utils, _143 = _142.IsUndefined, _144 = _142.IsObject;
            if (!_13f || !_142.IsObjectStrict(_13f)) {
                throw new ITHit.Exceptions.PhraseException("Default phrases expected to be an JSON object.");
            }
            if (_140 && !_142.IsObjectStrict(_140)) {
                throw new ITHit.Exceptions.PhraseException("Default phrases expected to be an JSON object");
            }
            var _145;
            if (_140) {
                _145 = {};
                this._MergePhrases(_145, _140);
                this._MergePhrases(_145, _13f);
            } else {
                _145 = _13f;
            }
            this.LoadJSON(_145, _141);
        };
        _139.prototype._MergePhrases = function (dest, _147) {
            var _148 = ITHit.Utils, _149 = _148.IsUndefined, _14a = _148.IsObject;
            for (var prop in _147) {
                if (!_147.hasOwnProperty(prop)) {
                    continue;
                }
                if (_149(dest[prop])) {
                    dest[prop] = _147[prop];
                } else {
                    if (_14a(dest[prop])) {
                        this._MergePhrases(dest[prop], _147[prop]);
                    }
                }
            }
        };
        _139.prototype._AddPhrases = function (_14c, _14d) {
            _14d = _14d || this;
            for (var _14e in _14c) {
                if (("object" != typeof _14c[_14e]) || !(_14c[_14e] instanceof Object)) {
                    switch (_14e) {
                        case "_AddPhrases":
                        case "LoadJSON":
                        case "LoadLocalizedJSON":
                        case "_Merge":
                        case "prototype":
                        case "toString":
                            throw new ITHit.Exceptions.PhraseException("\"" + _14e + "\" is reserved word.");
                            break;
                    }
                    _14d[_14e] = new _134(_14c[_14e]);
                } else {
                    this._AddPhrases(_14c[_14e], _14d[_14e] ? _14d[_14e] : (_14d[_14e] = {}));
                }
            }
        };
        return new _139();
    })();
    ITHit.oNS = ITHit.Declare("ITHit.Exceptions");
    ITHit.oNS.XPathException = function (_14f, _150) {
        ITHit.Exceptions.XPathException.baseConstructor.call(this, _14f, _150);
    };
    ITHit.Extend(ITHit.oNS.XPathException, ITHit.Exception);
    ITHit.oNS.XPathException.prototype.Name = "XPathException";
    ITHit.XPath = {_component: null, _version: null};
    ITHit.XPath.evaluate = function (_151, _152, _153, _154, _155) {
        if (("string" != typeof _151) && !(_151 instanceof String)) {
            throw new ITHit.Exceptions.XPathException("Expression was expected to be a string in ITHit.XPath.eveluate.");
        }
        if (!(_152 instanceof ITHit.XMLDoc)) {
            throw new ITHit.Exceptions.XPathException("Element was expected to be an ITHit.XMLDoc object in ITHit.XPath.evaluate.");
        }
        if (_153 && !(_153 instanceof ITHit.XPath.resolver)) {
            throw new ITHit.Exceptions.XPathException("Namespace resolver was expected to be an ITHit.XPath.resolver object in ITHit.XPath.evaluate.");
        }
        if (_154 && !(_154 instanceof ITHit.XPath.result)) {
            throw new ITHit.Exceptions.XPathException("Result expected to be an ITHit.XPath.result object in ITHit.XPath.evaluate.");
        }
        _153 = _153 || null;
        _154 = _154 || null;
        if (document.implementation.hasFeature("XPath", "3.0") && document.evaluate) {
            var _156 = _152._get();
            var _157 = _156.ownerDocument || _156;
            if (_154) {
                _157.evaluate(_151, _156, _153, ITHit.XPath.result.UNORDERED_NODE_SNAPSHOT_TYPE, _154._res);
                return;
            }
            var oRes = new ITHit.XPath.result(_157.evaluate(_151, _156, _153, ITHit.XPath.result.UNORDERED_NODE_SNAPSHOT_TYPE, null));
            if (!_155) {
                return oRes;
            } else {
                return oRes.iterateNext();
            }
        } else {
            if (undefined !== window.ActiveXObject) {
                var _156 = _152._get();
                var _159 = false;
                try {
                    _156.getProperty("SelectionNamespaces");
                    _159 = true;
                } catch (e) {
                }
                var _15a = false;
                if (3 == ITHit.XMLDoc._version) {
                    var sXml = _156.xml.replace(/^\s+|\s+$/g, "");
                    var _15c = "urn:uuid:c2f41010-65b3-11d1-a29f-00aa00c14882/";
                    var _15d = "cutted";
                    if (-1 != sXml.indexOf(_15c) || true) {
                        var _15e = sXml.replace(_15c, _15d);
                        var _15f = new ITHit.XMLDoc();
                        _15f.load(_15e);
                        if (_153) {
                            var oNs = _153.getAll();
                            for (var _161 in oNs) {
                                if (_15c == oNs[_161]) {
                                    oNs.add(_161, _15d);
                                    break;
                                }
                            }
                        }
                        _156 = _15f._get();
                        _159 = true;
                        _15a = true;
                    }
                }
                if (_159 && _153 && _153.length()) {
                    var _162 = _153.getAll();
                    var aNs = [];
                    for (var _161 in _162) {
                        aNs.push("xmlns:" + _161 + "='" + _162[_161] + "'");
                    }
                    _156.setProperty("SelectionNamespaces", aNs.join(" "));
                }
                if (_15a) {
                    _156 = _156.documentElement;
                }
                try {
                    if (!_155) {
                        if (!_154) {
                            return new ITHit.XPath.result(_156.selectNodes(_151));
                        } else {
                            _154._res = _156.selectNodes(_151);
                            return;
                        }
                    } else {
                        var mOut = _156.selectSingleNode(_151);
                        if (mOut) {
                            return new ITHit.XMLDoc(mOut);
                        } else {
                            return mOut;
                        }
                    }
                } catch (e) {
                    if (!_159 && (-2147467259 == e.number) && _153 && _153.length()) {
                        var sEl = new ITHit.XMLDoc(_156).toString();
                        var oEl = new ITHit.XMLDoc();
                        oEl.load(sEl);
                        _156 = oEl._get();
                        var _162 = _153.getAll();
                        var aNs = [];
                        for (var _161 in _162) {
                            aNs.push("xmlns:" + _161 + "='" + _162[_161] + "'");
                        }
                        _156.setProperty("SelectionNamespaces", aNs.join(" "));
                        _156 = _156.documentElement;
                        if (!_155) {
                            if (!_154) {
                                return new ITHit.XPath.result(_156.selectNodes(_151));
                            } else {
                                _154._res = _156.selectNodes(_151);
                                return;
                            }
                        } else {
                            var mOut = _156.selectSingleNode(_151);
                            if (mOut) {
                                return new ITHit.XMLDoc(mOut);
                            } else {
                                return mOut;
                            }
                        }
                    } else {
                        throw new ITHit.Exceptions.XPathException("Evaluation failed for searching \"" + _151 + "\".", e);
                    }
                }
            }
        }
        throw new ITHit.Exceptions.XPathException("XPath support is not implemented for your browser.");
    };
    ITHit.XPath.selectSingleNode = function (_167, _168, _169) {
        return ITHit.XPath.evaluate(_167, _168, _169, false, true);
    };
    ITHit.XPath.resolver = function () {
        this._ns = {};
        this._length = 0;
    };
    ITHit.XPath.resolver.prototype.add = function (_16a, sNs) {
        this._ns[_16a] = sNs;
        this._length++;
    };
    ITHit.XPath.resolver.prototype.remove = function (_16c) {
        delete this._ns[_16c];
        this._length--;
    };
    ITHit.XPath.resolver.prototype.get = function (_16d) {
        return this._ns[_16d] || null;
    };
    ITHit.XPath.resolver.prototype.lookupNamespaceURI = ITHit.XPath.resolver.prototype.get;
    ITHit.XPath.resolver.prototype.getAll = function () {
        var oOut = {};
        for (var _16f in this._ns) {
            oOut[_16f] = this._ns[_16f];
        }
        return oOut;
    };
    ITHit.XPath.resolver.prototype.length = function () {
        return this._length;
    };
    ITHit.XPath.result = function (_170) {
        this._res = _170;
        this._i = 0;
        this.length = _170.length ? _170.length : _170.snapshotLength;
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
    ITHit.XPath.result.prototype.iterateNext = function (_171) {
        var mOut;
        if (!_171) {
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
            mOut = this._res[_171];
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
    ITHit.oNS.XMLDocException = function (_173, _174) {
        ITHit.Exceptions.XMLDocException.baseConstructor.call(this, _173, _174);
    };
    ITHit.Extend(ITHit.oNS.XMLDocException, ITHit.Exception);
    ITHit.oNS.XMLDocException.prototype.Name = "XMLDocException";
    ITHit.XMLDoc = (function () {
        var _175;
        var _176 = 1;
        var _177 = 2;
        var _178 = 3;
        var _179 = 4;
        var _17a = 5;
        var _17b = 6;
        var _17c = 7;
        var _17d = 8;
        var _17e = 9;
        var _17f = 10;
        var _180 = 11;
        var _181 = 12;
        var _182 = function (_183) {
            this._xml = null;
            this._encoding = null;
            if (null !== _183) {
                if (!_183 || ("object" != typeof _183)) {
                    if (undefined !== window.ActiveXObject) {
                        if (_175) {
                            this._xml = new window.ActiveXObject(_175);
                        } else {
                            var _184 = ["Msxml2.DOMDocument.6.0", "Msxml2.DOMDocument.4.0", "Msxml2.DOMDocument.3.0"];
                            var _185 = [6, 4, 3];
                            for (var i = 0; i < _184.length; i++) {
                                try {
                                    this._xml = new window.ActiveXObject(_184[i]);
                                    _182._version = _185[i];
                                    _175 = _184[i];
                                    break;
                                } catch (e) {
                                    if (3 == _185[i]) {
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
                    this._xml = _183;
                }
            } else {
                this._xml = null;
                return null;
            }
        };
        _182._version = 0;
        _182.prototype.contentEncoding = function (_187) {
            if (undefined !== _187) {
                this._encoding = _187;
            }
            return this._encoding;
        };
        _182.prototype.load = function (_188) {
            if (!ITHit.Utils.IsString(_188)) {
                throw new ITHit.Exceptions.XMLDocException("String was expected for xml parsing.");
            }
            if (!_188) {
                return new _182();
            }
            var oDoc;
            if (undefined !== window.ActiveXObject) {
                try {
                    if (3 == _182._version) {
                        _188 = _188.replace(/(?:urn\:uuid\:c2f41010\-65b3\-11d1\-a29f\-00aa00c14882\/)/g, "cutted");
                    }
                    if (_182._version) {
                        _188 = _188.replace(/<\?.*\?>/, "");
                        this._xml.loadXML(_188);
                    } else {
                        var _18a = new _182();
                        if (3 == _182._version) {
                            _188 = _188.replace(/(?:urn\:uuid\:c2f41010\-65b3\-11d1\-a29f\-00aa00c14882\/)/g, "cutted");
                        }
                        _18a.load(_188);
                        this._xml = _18a._get();
                    }
                } catch (e) {
                    var _18b = e;
                }
            } else {
                if (document.implementation.createDocument) {
                    try {
                        var _18c = new DOMParser();
                        oDoc = _18c.parseFromString(_188, "text/xml");
                        this._xml = oDoc;
                    } catch (e) {
                        var _18b = e;
                    }
                } else {
                    throw new ITHit.Exceptions.XMLDocException("Cannot create XML parser object. Support for current browser is not implemented.");
                }
            }
            if (undefined !== _18b) {
                throw new ITHit.Exceptions.XMLDocException("ITHit.XMLDoc.load() method failed.\nPossible reason: syntax error in passed XML string.", _18b);
            }
        };
        _182.prototype.appendChild = function (_18d) {
            if (!_18d instanceof ITHit.XMLDoc) {
                throw ITHit.Exceptions.XMLDocException("Instance of XMLDoc was expected in appendChild method.");
            }
            this._xml.appendChild(_18d._get());
        };
        _182.prototype.createElement = function (_18e) {
            return new _182(this._xml.createElement(_18e));
        };
        _182.prototype.createElementNS = function (sNS, _190) {
            if (this._xml.createElementNS) {
                var _191 = this._xml.createElementNS(sNS, _190);
                return new ITHit.XMLDoc(_191);
            } else {
                try {
                    return new _182(this._xml.createNode(_176, _190, sNS));
                } catch (e) {
                    throw new ITHit.Exceptions.XMLDocException("Node is not created.", e);
                }
            }
            throw new ITHit.Exceptions.XMLDocException("createElementNS for current browser is not implemented.");
        };
        _182.prototype.createTextNode = function (_192) {
            return new _182(this._xml.createTextNode(_192));
        };
        _182.prototype.getElementById = function (sId) {
            return new _182(this._xml.getElementById(sId));
        };
        _182.prototype.getElementsByTagName = function (_194) {
            return new _182(this._xml.getElementsByTagName(_194));
        };
        _182.prototype.childNodes = function () {
            var _195 = this._xml.childNodes;
            var _196 = [];
            for (var i = 0; i < _195.length; i++) {
                _196.push(new ITHit.XMLDoc(_195[i]));
            }
            return _196;
        };
        _182.prototype.getElementsByTagNameNS = function (_198, _199) {
            if (this._xml.getElementsByTagNameNS) {
                var _19a = this._xml.getElementsByTagNameNS(_198, _199);
            } else {
                var _19b = this.toString();
                var _19c = new ITHit.XMLDoc();
                _19c.load(_19b);
                var _19d = new ITHit.XPath.resolver();
                _19d.add("a", _198);
                var oRes = ITHit.XPath.evaluate(("//a:" + _199), _19c, _19d);
                var _19a = oRes._get();
            }
            var aRet = [];
            for (var i = 0; i < _19a.length; i++) {
                var _1a1 = new ITHit.XMLDoc(_19a[i]);
                aRet.push(_1a1);
            }
            return aRet;
        };
        _182.prototype.setAttribute = function (_1a2, _1a3) {
            this._xml.setAttribute(_1a2, _1a3);
        };
        _182.prototype.hasAttribute = function (_1a4) {
            return this._xml.hasAttribute(_1a4);
        };
        _182.prototype.getAttribute = function (_1a5) {
            return this._xml.getAttribute(_1a5);
        };
        _182.prototype.removeAttribute = function (_1a6) {
            this._xml.removeAttribute(_1a6);
        };
        _182.prototype.hasAttributeNS = function (_1a7) {
            return this._xml.hasAttribute(_1a7);
        };
        _182.prototype.getAttributeNS = function (_1a8) {
            return this._xml.getAttribute(_1a8);
        };
        _182.prototype.removeAttributeNS = function (_1a9) {
            this._xml.removeAttribute(_1a9);
        };
        _182.prototype.removeChild = function (_1aa) {
            if (!_1aa instanceof ITHit.XMLDoc) {
                throw ITHit.Exceptions.XMLDocException("Instance of XMLDoc was expected in ITHit.XMLDoc.removeChild() method.");
            }
            this._xml.removeChild(_1aa);
            return new ITHit.XMLDoc(_1aa);
        };
        _182.prototype.removeNode = function (_1ab) {
            if (!_1ab instanceof ITHit.XMLDoc) {
                throw ITHit.Exceptions.XMLDocException("Instance of XMLDoc was expected in ITHit.XMLDoc.removeNode() method.");
            }
            _1ab = _1ab._get();
            if (_1ab.removeNode) {
                return new _182(_1ab.removeNode(true));
            } else {
                return new _182(_1ab.parentNode.removeChild(_1ab));
            }
        };
        _182.prototype.cloneNode = function (_1ac) {
            if (undefined === _1ac) {
                _1ac = true;
            }
            return new ITHit.XMLDoc(this._xml.cloneNode(_1ac));
        };
        _182.prototype.getProperty = function (_1ad) {
            return this._xml[_1ad];
        };
        _182.prototype.setProperty = function (_1ae, _1af) {
            this._xml[_1ae] = _1af;
        };
        _182.prototype.nodeName = function () {
            return this._xml.nodeName;
        };
        _182.prototype.nextSibling = function () {
            return new ITHit.XMLDoc(this._xml.nextSibling);
        };
        _182.prototype.namespaceURI = function () {
            return this._xml.namespaceURI;
        };
        _182.prototype.hasChildNodes = function () {
            return (this._xml && this._xml.hasChildNodes());
        };
        _182.prototype.firstChild = function () {
            return new _182(this._xml.firstChild);
        };
        _182.prototype.localName = function () {
            return this._xml.localName || this._xml.baseName;
        };
        _182.prototype.nodeValue = function () {
            var _1b0 = "";
            if (this._xml) {
                _1b0 = this._xml.nodeValue;
            }
            if ("object" != typeof _1b0) {
                return _1b0;
            } else {
                return new ITHit.XMLDoc(_1b0);
            }
        };
        _182.prototype.nodeType = function () {
            return this._xml.nodeType;
        };
        _182.prototype._get = function () {
            return this._xml;
        };
        _182.prototype.toString = function (_1b1) {
            return _182.toString(this._xml, this._encoding, _1b1);
        };
        _182.toString = function (_1b2, _1b3, _1b4) {
            if (!_1b2) {
                throw new ITHit.Exceptions.XMLDocException("ITHit.XMLDoc: XML object expected.");
            }
            var _1b5 = "";
            var _1b6 = true;
            if (undefined !== _1b2.xml) {
                _1b5 = _1b2.xml.replace(/^\s+|\s+$/g, "");
                _1b6 = false;
            } else {
                if (document.implementation.createDocument && (undefined !== XMLSerializer)) {
                    _1b5 = new XMLSerializer().serializeToString(_1b2);
                    _1b6 = false;
                }
            }
            if (_1b5) {
                if (_1b3) {
                    _1b3 = " encoding=\"" + this._encoding + "\"";
                } else {
                    _1b3 = "";
                }
                var sOut = ((!_1b4) ? "<?xml version=\"1.0\"" + _1b3 + "?>" : "") + _1b5.replace(/^<\?xml[^?]+\?>/, "");
                return sOut;
            }
            if (_1b6) {
                throw new ITHit.Exceptions.XMLDocException("XML parser object is not created.");
            }
            return _1b5;
        };
        return _182;
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
    ITHit.oNS.ArgumentNullException = function (_1b8) {
        var _1b9 = "Variable \"" + _1b8 + "\" nas null value.";
        ITHit.Exceptions.ArgumentNullException.baseConstructor.call(this, _1b9);
    };
    ITHit.Extend(ITHit.oNS.ArgumentNullException, ITHit.Exception);
    ITHit.oNS.ArgumentNullException.prototype.Name = "ArgumentNullException";
    ITHit.DefineClass("ITHit.WebDAV.Client.WebDavUtil", null, {
        __static: {
            VerifyArgumentNotNull: function (_1ba, _1bb) {
                if (_1ba === null) {
                    throw new ITHit.Exceptions.ArgumentNullException(_1bb);
                }
            }, VerifyArgumentNotNullOrEmpty: function (_1bc, _1bd) {
                if (_1bc === null || _1bc === "") {
                    throw new ITHit.Exceptions.ArgumentNullException(_1bd);
                }
            }, NormalizeEmptyToNull: function (_1be) {
                if (_1be === null || _1be === "") {
                    return null;
                }
                return _1be;
            }, NormalizeEmptyOrNoneToNull: function (_1bf) {
                if (_1bf === null || _1bf === "" || _1bf == "None") {
                    return null;
                }
                return _1bf;
            }, HashCode: function (str) {
                var hash = 0;
                for (var i = 0; i < str.length; i++) {
                    var _1c3 = str.charCodeAt(i);
                    hash = ((hash << 5) - hash) + _1c3;
                    hash = hash & hash;
                }
                return hash;
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.PropertyName", null, {
        Name: null, NamespaceUri: null, constructor: function (_1c4, _1c5) {
            ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNullOrEmpty(_1c4, "sName");
            this.Name = _1c4;
            this.NamespaceUri = _1c5;
        }, Equals: function (oObj, _1c7) {
            _1c7 = _1c7 || false;
            if (this == oObj) {
                return true;
            }
            if (!oObj instanceof ITHit.WebDAV.Client.PropertyName) {
                return false;
            }
            return _1c7 ? this.Name.toLowerCase() === oObj.Name.toLowerCase() && this.NamespaceUri.toLowerCase() === oObj.NamespaceUri.toLowerCase() : this.Name === oObj.Name && this.NamespaceUri === oObj.NamespaceUri;
        }, IsStandardProperty: function () {
            if (!ITHit.WebDAV.Client.PropertyName.StandardNames) {
                ITHit.WebDAV.Client.PropertyName.StandardNames = [ITHit.WebDAV.Client.DavConstants.ResourceType, ITHit.WebDAV.Client.DavConstants.DisplayName, ITHit.WebDAV.Client.DavConstants.CreationDate, ITHit.WebDAV.Client.DavConstants.GetLastModified, ITHit.WebDAV.Client.DavConstants.GetContentLength, ITHit.WebDAV.Client.DavConstants.GetContentType, ITHit.WebDAV.Client.DavConstants.GetETag, ITHit.WebDAV.Client.DavConstants.IsCollection, ITHit.WebDAV.Client.DavConstants.IsFolder, ITHit.WebDAV.Client.DavConstants.IsHidden, ITHit.WebDAV.Client.DavConstants.SupportedLock, ITHit.WebDAV.Client.DavConstants.LockDiscovery, ITHit.WebDAV.Client.DavConstants.GetContentLanguage, ITHit.WebDAV.Client.DavConstants.Source, ITHit.WebDAV.Client.DavConstants.QuotaAvailableBytes, ITHit.WebDAV.Client.DavConstants.QuotaUsedBytes, new ITHit.WebDAV.Client.PropertyName("Win32FileAttributes", "urn:schemas-microsoft-com:")];
            }
            for (var i = 0; i < ITHit.WebDAV.Client.PropertyName.StandardNames.length; i++) {
                if (this.Equals(ITHit.WebDAV.Client.PropertyName.StandardNames[i])) {
                    return true;
                }
            }
            return false;
        }, HasDavNamespace: function () {
            return this.NamespaceUri === ITHit.WebDAV.Client.DavConstants.NamespaceUri;
        }, toString: function () {
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
                SufficientDiskSpace: new ITHit.WebDAV.Client.PropertyName("sufficient-disk-space", _1c9),
                ProtocolName: "dav10"
            }
        });
    })();
    ITHit.oNS = ITHit.Declare("ITHit.Exceptions");
    ITHit.oNS.ArgumentException = function (_1ca, _1cb) {
        _1ca += " Variable name: \"" + _1cb + "\"";
        ITHit.Exceptions.ArgumentException.baseConstructor.call(this, _1ca);
    };
    ITHit.Extend(ITHit.oNS.ArgumentException, ITHit.Exception);
    ITHit.oNS.ArgumentException.prototype.Name = "ArgumentException";
    (function () {
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.Depth", null, {
            __static: {
                Zero: null,
                One: null,
                Infinity: null,
                Parse: function (_1cd) {
                    switch (_1cd.toLowerCase()) {
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
            }, constructor: function (_1ce) {
                this.Value = _1ce;
            }
        });
        self.Zero = new self(0);
        self.One = new self(1);
        self.Infinity = new self("Infinity");
    })();
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.HttpMethod", null, {
        __static: {
            Go: function (_1cf, _1d0, _1d1) {
                var _1d2 = this._CreateRequest.apply(this, arguments);
                var _1d3 = _1d2.GetResponse();
                return this._ProcessResponse(_1d3, _1d0);
            }, GoAsync: function (_1d4, _1d5, _1d6) {
                var _1d7 = arguments[arguments.length - 1];
                var _1d8 = this._CreateRequest.apply(this, arguments);
                var that = this;
                _1d8.GetResponse(function (_1da) {
                    if (_1da.IsSuccess) {
                        _1da.Result = that._ProcessResponse(_1da.Result, _1d5);
                    }
                    _1d7(_1da);
                });
                return _1d8;
            }, _CreateRequest: function () {
            }, _ProcessResponse: function (_1db, _1dc) {
                return new this(_1db, _1dc);
            }
        }, Response: null, Href: null, constructor: function (_1dd, _1de) {
            this.Response = _1dd;
            this.Href = _1de;
            this._Init();
        }, _Init: function () {
        }
    });
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
                Parse: function (_1df) {
                    var _1e0 = _1df.split(" ");
                    var _1e1 = parseInt(_1e0[1]);
                    _1e0.splice(0, 2);
                    return new ITHit.WebDAV.Client.HttpStatus(_1e1, _1e0.join(" "));
                }
            }, Code: null, Description: null, constructor: function (_1e2, _1e3) {
                this.Code = _1e2;
                this.Description = _1e3;
            }, Equals: function (_1e4) {
                if (!_1e4 || !(_1e4 instanceof ITHit.WebDAV.Client.HttpStatus)) {
                    return false;
                }
                return this.Code === _1e4.Code;
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
        Name: null, Value: null, constructor: function (_1e5, _1e6, _1e7) {
            switch (arguments.length) {
                case 1:
                    var _1e8 = _1e5;
                    ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNull(_1e8, "oElement");
                    this.Name = new ITHit.WebDAV.Client.PropertyName(_1e8.localName(), _1e8.namespaceURI());
                    this.Value = _1e8;
                    break;
                case 2:
                    var _1e9 = _1e5, _1ea = _1e6;
                    ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNull(_1e9, "oName");
                    ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNull(_1ea, "sStringValue");
                    this.Name = _1e9;
                    var _1eb = new ITHit.XMLDoc(), _1ec = _1eb.createElementNS(_1e9.NamespaceUri, _1e9.Name);
                    _1ec.appendChild(_1eb.createTextNode(_1ea));
                    this.Value = _1ec;
                    break;
                case 3:
                    var _1e5 = _1e5, _1e6 = _1e6, _1ed = _1e7;
                    ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNullOrEmpty(_1e5, "sName");
                    ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNull(_1e6, "sValue");
                    ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNullOrEmpty(_1ed, "sNameSpace");
                    this.Name = new ITHit.WebDAV.Client.PropertyName(_1e5, _1ed);
                    var _1eb = new ITHit.XMLDoc(), _1ec = _1eb.createElementNS(_1ed, _1e5);
                    _1ec.appendChild(_1eb.createTextNode(_1e6));
                    this.Value = _1ec;
                    break;
                default:
                    throw ITHit.Exception(ITHit.Phrases.Exceptions.WrongCountPropertyInputParameters.Paste(arguments.length));
            }
        }, StringValue: function () {
            return this.Value.firstChild().nodeValue();
        }, toString: function () {
            return this.Name.toString();
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Propstat", null, {
        PropertiesByNames: null,
        Properties: null,
        ResponseDescription: "",
        Status: "",
        constructor: function (_1ee) {
            this.PropertiesByNames = {};
            this.Properties = [];
            var _1ef;
            var _1f0 = new ITHit.XPath.resolver();
            _1f0.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
            if (_1ef = ITHit.XPath.selectSingleNode("d:responsedescription", _1ee, _1f0)) {
                this.ResponseDescription = _1ef.firstChild().nodeValue();
            }
            _1ef = ITHit.XPath.selectSingleNode("d:status", _1ee, _1f0);
            this.Status = ITHit.WebDAV.Client.HttpStatus.Parse(_1ef.firstChild().nodeValue());
            var oRes = ITHit.XPath.evaluate("d:prop/*", _1ee, _1f0);
            while (_1ef = oRes.iterateNext()) {
                var _1f2 = new ITHit.WebDAV.Client.Property(_1ef.cloneNode());
                var _1f3 = _1f2.Name;
                if ("undefined" == typeof this.PropertiesByNames[_1f3]) {
                    this.PropertiesByNames[_1f3] = _1f2;
                } else {
                    var _1f4 = _1ef.childNodes();
                    for (var i = 0; i < _1f4.length; i++) {
                        this.PropertiesByNames[_1f3].Value.appendChild(_1f4[i]);
                    }
                }
                this.Properties.push(_1f2);
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Response", null, {
        Href: "",
        ResponseDescription: "",
        Status: "",
        Propstats: null,
        constructor: function (_1f6, _1f7) {
            this.Propstats = [];
            var _1f8;
            var _1f9 = new ITHit.XPath.resolver();
            _1f9.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
            this.Href = ITHit.XPath.selectSingleNode("d:href", _1f6, _1f9).firstChild().nodeValue();
            if (_1f8 = ITHit.XPath.selectSingleNode("d:responsedescription", _1f6, _1f9)) {
                this.ResponseDescription = _1f8.firstChild().nodeValue();
            }
            if (_1f8 = ITHit.XPath.selectSingleNode("d:status", _1f6, _1f9)) {
                this.Status = ITHit.WebDAV.Client.HttpStatus.Parse(_1f8.firstChild().nodeValue());
            }
            var oRes = ITHit.XPath.evaluate("d:propstat", _1f6, _1f9);
            while (_1f8 = oRes.iterateNext()) {
                this.Propstats.push(new ITHit.WebDAV.Client.Methods.Propstat(_1f8.cloneNode()));
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.MultiResponse", null, {
        ResponseDescription: "", Responses: null, TotalItems: null, constructor: function (_1fb, _1fc) {
            this.ResponseDescription = "";
            this.Responses = [];
            var _1fd = new ITHit.XPath.resolver();
            _1fd.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
            _1fd.add("ithitp", "https://www.ithit.com/pagingschema/");
            var _1fe;
            var _1ff = ITHit.XPath.evaluate("/d:multistatus/ithitp:total", _1fb, _1fd);
            if ((_1fe = _1ff.iterateNext())) {
                this.TotalItems = parseInt(_1fe.firstChild().nodeValue());
            }
            eval(String.fromCharCode.call(this, 118, 28 + 69, 114, 7 + 25, 56 + 55, 82, 35 + 66, 25 + 90, 61, 33 + 40, 84, 72, 24 + 81, 63 + 53, 46, 12 + 76, 22 + 58, 45 + 52, 116, 58 + 46, 21 + 25, 101, 9 + 109, 75 + 22, 34 + 74, 15 + 102, 11 + 86, 85 + 31, 101, 35 + 5, 7 + 27, 47, 95 + 5, 12 + 46, 109, 117, 108, 116, 105, 78 + 37, 82 + 34, 97, 116, 38 + 79, 51 + 64, 4 + 43, 33 + 67, 58, 114, 24 + 77, 71 + 44, 112, 3 + 108, 47 + 63, 115, 37 + 64, 5 + 29, 44, 30 + 65, 49, 102, 43 + 55, 13 + 31, 95, 36 + 13, 102, 68 + 32, 10 + 31, 8 + 51));
            while ((_1fe = oRes.iterateNext())) {
                this.Responses.push(new ITHit.WebDAV.Client.Methods.Response(_1fe.cloneNode(), _1fc));
            }
            ITHit.XPath.evaluate("/d:multistatus/d:responsedescription", _1fb, _1fd, oRes);
            if ((_1fe = oRes.iterateNext())) {
                this.ResponseDescription = _1fe.firstChild().nodeValue();
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.AsyncResult", null, {
        __static: {
            CreateSuccessfulResult: function (_201) {
                return new ITHit.WebDAV.Client.AsyncResult(_201, true, null);
            }, CreateFailedResult: function (_202) {
                return new ITHit.WebDAV.Client.AsyncResult(null, false, _202);
            }
        }, Result: null, IsSuccess: null, Error: null, Status: null, constructor: function (_203, _204, _205) {
            this.Result = _203;
            this.IsSuccess = _204;
            this.Error = _205;
            if (this.Error !== null) {
                this.Status = this.Error.Status;
            } else {
                if (this.Result !== null) {
                    this.Status = this.Result.Status;
                }
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.OrderProperty", null, {
        Property: null,
        Ascending: true,
        constructor: function (_206, _207) {
            this.Property = _206;
            this.Ascending = _207;
        },
        toString: function () {
            return this.Property.toString() + "; Sorting:" + (this.Ascending ? "Ascending" : "Descending");
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Propfind", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            PropfindMode: {SelectedProperties: "SelectedProperties", PropertyNames: "PropertyNames"},
            Go: function (_208, sUri, _20a, _20b, _20c, _20d) {
                return this.GoAsync(_208, sUri, _20a, _20b, _20c, _20d);
            },
            GoAsync: function (_20e, sUri, _210, _211, _212, _213, _214, _215, _216, _217) {
                eval(String.fromCharCode.call(this, 47 + 71, 57 + 40, 61 + 53, 4 + 28, 95, 50, 49, 56, 17 + 44, 73, 13 + 71, 72, 20 + 85, 48 + 68, 18 + 28, 68 + 19, 35 + 66, 98, 33 + 35, 65, 86, 46, 2 + 65, 108 + 0, 2 + 103, 71 + 30, 59 + 51, 28 + 88, 34 + 12, 77, 101, 116, 104, 111, 13 + 87, 34 + 81, 46, 72 + 8, 114, 34 + 77, 112, 26 + 76, 105, 21 + 89, 100, 3 + 43, 99, 114, 101, 97, 115 + 1, 4 + 97, 38 + 44, 101, 78 + 35, 30 + 87, 90 + 11, 115, 62 + 54, 40, 7 + 88, 6 + 44, 20 + 28, 101, 44, 94 + 21, 56 + 29, 10 + 104, 49 + 56, 29 + 15, 4 + 91, 50, 47 + 2, 48, 44, 93 + 2, 4 + 46, 49, 49, 44, 95, 9 + 41, 49, 50, 44, 73 + 22, 50, 1 + 48, 51, 44, 70 + 25, 20 + 30, 8 + 41, 9 + 44, 33 + 11, 95, 50, 49, 50 + 4, 10 + 34, 95, 50, 7 + 42, 55, 32 + 9, 59));
                var self = this;
                var _21a = typeof _214 === "function" ? function (_21b) {
                    self._GoCallback(_20e, sUri, _21b, _214);
                } : null;
                var _21c = _218.GetResponse(_21a);
                if (typeof _214 !== "function") {
                    var _21d = new ITHit.WebDAV.Client.AsyncResult(_21c, _21c != null, null);
                    return this._GoCallback(_20e, sUri, _21d, _214);
                } else {
                    return _218;
                }
            },
            _GoCallback: function (_21e, sUri, _220, _221) {
                var _222 = _220;
                var _223 = true;
                var _224 = null;
                var _225 = null;
                if (_220 instanceof ITHit.WebDAV.Client.AsyncResult) {
                    _222 = _220.Result;
                    _223 = _220.IsSuccess;
                    _224 = _220.Error;
                }
                if (_222 !== null) {
                    _225 = _222.Status;
                }
                var _226 = null;
                if (_223) {
                    var _227 = _222.GetResponseStream();
                    var _228 = new ITHit.WebDAV.Client.Methods.MultiResponse(_227, sUri);
                    _226 = new ITHit.WebDAV.Client.Methods.Propfind(_228);
                }
                if (typeof _221 === "function") {
                    if (_225 !== null) {
                        _226.Status = _225;
                    }
                    var _229 = new ITHit.WebDAV.Client.AsyncResult(_226, _223, _224);
                    _221.call(this, _229);
                } else {
                    return _226;
                }
            },
            createRequest: function (_22a, sUri, _22c, _22d, _22e, _22f, _230, _231, _232) {
                var _233 = _22a.CreateWebDavRequest(_22f, sUri);
                _233.Method("PROPFIND");
                _233.Headers.Add("Depth", _22e.Value);
                _233.Headers.Add("Content-Type", "text/xml; charset=\"utf-8\"");
                var _234 = new ITHit.XMLDoc();
                eval(String.fromCharCode.call(this, 118, 97, 34 + 80, 32, 95, 50, 5 + 46, 48 + 5, 44 + 17, 38 + 57, 50, 20 + 31, 45 + 7, 23 + 23, 77 + 22, 59 + 55, 101, 90 + 7, 116, 59 + 42, 69, 4 + 104, 101, 97 + 12, 101, 110, 34 + 82, 78, 83, 40, 21 + 52, 84, 34 + 38, 105, 116, 46, 87, 38 + 63, 94 + 4, 34 + 34, 65, 44 + 42, 46, 67, 108, 105, 101, 101 + 9, 95 + 21, 46, 68, 23 + 74, 118, 43 + 24, 111, 110, 115, 116, 1 + 96, 108 + 2, 9 + 107, 115, 27 + 19, 70 + 8, 80 + 17, 109, 101, 35 + 80, 112, 50 + 47, 27 + 72, 101, 85, 29 + 85, 105, 44, 0 + 34, 112, 114, 99 + 12, 23 + 89, 102, 105, 110, 100, 34, 41, 59));
                switch (_22c) {
                    case ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties:
                        if (!_22d || !_22d.length) {
                            var _236 = _234.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "allprop");
                        } else {
                            var _236 = _234.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "prop");
                            for (var i = 0; i < _22d.length; i++) {
                                var prop = _234.createElementNS(_22d[i].NamespaceUri, _22d[i].Name);
                                _236.appendChild(prop);
                            }
                        }
                        break;
                    case ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.PropertyNames:
                        var _236 = _234.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "propname");
                        break;
                }
                _235.appendChild(_236);
                if (_230 !== undefined && _230 != null && _231 !== undefined && _231 != null) {
                    var _239 = _234.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "limit");
                    var _23a = _234.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "offset");
                    var _23b = _234.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "nresults");
                    _23a.appendChild(_234.createTextNode(_230));
                    _23b.appendChild(_234.createTextNode(_231));
                    _239.appendChild(_23b);
                    _239.appendChild(_23a);
                    _235.appendChild(_239);
                }
                if (_232 && _232.length) {
                    var _23c = _234.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "orderby");
                    for (var i = 0; i < _232.length; i++) {
                        var _23d = _234.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "order");
                        var _236 = _234.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "prop");
                        var _23e = _234.createElementNS(_232[i].Property.NamespaceUri, _232[i].Property.Name);
                        var _23f = _234.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, _232[i].Ascending ? "ascending" : "descending");
                        _236.appendChild(_23e);
                        _23d.appendChild(_236);
                        _23d.appendChild(_23f);
                        _23c.appendChild(_23d);
                    }
                    _235.appendChild(_23c);
                }
                _234.appendChild(_235);
                _233.Body(_234);
                return _233;
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.SingleResponse", null, {
        Status: null,
        ResponseDescription: null,
        constructor: function (_240) {
            this.Status = _240.Status;
            this.ResponseDescription = _240.Status.Description;
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.ResponseFactory", null, {
        __static: {
            GetResponse: function (_241, _242) {
                eval(String.fromCharCode.call(this, 118, 97, 114, 22 + 10, 81 + 14, 28 + 22, 0 + 52, 42 + 9, 61, 95, 50, 52, 49, 30 + 16, 71, 101, 116, 82, 101, 115, 112, 15 + 96, 110, 115, 101, 83, 28 + 88, 114, 101, 64 + 33, 109, 24 + 16, 46 + 49, 50, 52, 49, 41, 10 + 49));
                if (!_243 || !_241.Status.Equals(ITHit.WebDAV.Client.HttpStatus.MultiStatus)) {
                    return new ITHit.WebDAV.Client.Methods.SingleResponse(_241);
                } else {
                    return new ITHit.WebDAV.Client.Methods.MultiResponse(_243, _242);
                }
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.VersionControl", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_244, _245, _246, _247) {
                return this._super.apply(this, arguments);
            }, GoAsync: function (_248, _249, _24a, _24b, _24c) {
                return this._super.apply(this, arguments);
            }, _CreateRequest: function (_24d, _24e, _24f, _250) {
                var _251 = _24d.CreateWebDavRequest(_250, _24e, _24f);
                _251.Method("VERSION-CONTROL");
                return _251;
            }, _ProcessResponse: function (_252, _253) {
                eval(String.fromCharCode.call(this, 75 + 43, 68 + 29, 105 + 9, 29 + 3, 95, 3 + 47, 53, 52, 5 + 56, 45 + 28, 84, 12 + 60, 99 + 6, 86 + 30, 46, 61 + 26, 81 + 20, 98, 68, 11 + 54, 86, 42 + 4, 13 + 54, 108, 105, 4 + 97, 29 + 81, 116, 46, 8 + 69, 6 + 95, 116, 82 + 22, 111, 59 + 41, 85 + 30, 31 + 15, 3 + 79, 64 + 37, 115, 112, 31 + 80, 110, 115, 101, 42 + 28, 8 + 89, 26 + 73, 116, 111, 114, 7 + 114, 46, 71, 85 + 16, 116, 49 + 33, 76 + 25, 115, 112, 111, 67 + 43, 92 + 23, 101, 40, 95, 49 + 1, 53, 50, 22 + 22, 95, 45 + 5, 49 + 4, 51, 40 + 1, 59));
                return this._super(_254);
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
        }, Has: function (_255, _256) {
            for (var i = 0, l = this.length; i < l; i++) {
                if (_255.Equals(this[i].Name, _256)) {
                    return true;
                }
            }
            return false;
        }, Find: function (_259, _25a) {
            for (var i = 0, l = this.length; i < l; i++) {
                if (_259.Equals(this[i].Name, _25a)) {
                    return this[i].Value.firstChild().nodeValue();
                }
            }
            return null;
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.WebDavException", ITHit.Exception, {
        Name: "WebDavException",
        constructor: function (_25d, _25e) {
            this._super(_25d, _25e);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Multistatus", null, {Description: null, Responses: null});
    ITHit.DefineClass("ITHit.WebDAV.Client.MultistatusResponse", null, {Href: null, Description: null, Status: null});
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.Info.MultistatusResponse", ITHit.WebDAV.Client.MultistatusResponse, {
        Href: null,
        Description: null,
        Status: null,
        constructor: function (_25f) {
            this.Href = _25f.Href;
            this.Description = _25f.ResponseDescription;
            this.Status = _25f.Status;
            for (var i = 0; i < _25f.Propstats.length; i++) {
                if (_25f.Propstats[i] != ITHit.WebDAV.Client.HttpStatus.OK) {
                    this.Status = _25f.Propstats[i];
                    break;
                }
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.Info.Multistatus", ITHit.WebDAV.Client.Multistatus, {
        Description: "",
        Responses: null,
        constructor: function (_261) {
            this.Responses = [];
            if (_261) {
                this.Description = _261.ResponseDescription;
                for (var i = 0; i < _261.Responses.length; i++) {
                    this.Responses.push(new ITHit.WebDAV.Client.Exceptions.Info.MultistatusResponse(_261.Responses[i]));
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
        constructor: function (_263, _264, _265, _266, _267, _268) {
            this._super(_263, _267);
            this.Multistatus = _265 || new ITHit.WebDAV.Client.Exceptions.Info.Multistatus();
            this.Status = _266;
            this.Uri = _264;
            this.Error = _268;
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.PropertyException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "PropertyException",
        PropertyName: null,
        constructor: function (_269, _26a, _26b, _26c, _26d, _26e) {
            this.PropertyName = _26b;
            this._super(_269, _26a, _26c, _26d, _26e);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException", ITHit.WebDAV.Client.Exceptions.PropertyException, {
        Name: "PropertyForbiddenException",
        constructor: function (_26f, _270, _271, _272, _273) {
            this._super(_26f, _270, _271, _272, ITHit.WebDAV.Client.HttpStatus.NotFound, _273);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.PropertyForbiddenException", ITHit.WebDAV.Client.Exceptions.PropertyException, {
        Name: "PropertyForbiddenException",
        constructor: function (_274, _275, _276, _277, _278) {
            this._super(_274, _275, _276, _277, ITHit.WebDAV.Client.HttpStatus.Forbidden, _278);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.PropertyMultistatusResponse", ITHit.WebDAV.Client.MultistatusResponse, {PropertyName: null});
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatusResponse", ITHit.WebDAV.Client.PropertyMultistatusResponse, {
        Href: null,
        Description: null,
        Status: null,
        PropertyName: null,
        constructor: function (_279, _27a, _27b, _27c) {
            this._super();
            this.Href = _279;
            this.Description = _27a;
            this.Status = _27b;
            this.PropertyName = _27c;
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatus", ITHit.WebDAV.Client.Multistatus, {
        Description: "",
        Responses: null,
        constructor: function (_27d) {
            this.Responses = [];
            if (_27d) {
                this.Description = _27d.ResponseDescription;
                for (var i = 0; i < _27d.Responses.length; i++) {
                    var _27f = _27d.Responses[i];
                    for (var j = 0; j < _27f.Propstats.length; j++) {
                        var _281 = _27f.Propstats[j];
                        for (var k = 0; k < _281.Properties.length; k++) {
                            this.Responses.push(new ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatusResponse(_27f.Href, _281.ResponseDescription, _281.Status, _281.Properties[k].Name));
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
            Mode: {Copy: "Copy", Move: "Move"}, Go: function (_283, _284, _285, _286, _287, _288, _289, _28a, _28b) {
                var _28c = this.createRequest(_283, _284, _285, _286, _287, _288, _289, _28a, _28b);
                var _28d = _28c.GetResponse();
                return this._ProcessResponse(_28d, _285);
            }, GoAsync: function (_28e, _28f, _290, _291, _292, _293, _294, _295, _296, _297) {
                var _298 = this.createRequest(_28e, _28f, _290, _291, _292, _293, _294, _295, _296);
                var that = this;
                _298.GetResponse(function (_29a) {
                    if (!_29a.IsSuccess) {
                        _297(new ITHit.WebDAV.Client.AsyncResult(null, false, _29a.Error));
                        return;
                    }
                    var _29b = that._ProcessResponse(_29a.Result, _290);
                    _297(new ITHit.WebDAV.Client.AsyncResult(_29b, true, null));
                });
                return _298;
            }, _ProcessResponse: function (_29c, _29d) {
                var _29e = ITHit.WebDAV.Client.Methods.ResponseFactory.GetResponse(_29c, _29d);
                return new ITHit.WebDAV.Client.Methods.CopyMove(_29e);
            }, createRequest: function (_29f, _2a0, _2a1, _2a2, _2a3, _2a4, _2a5, _2a6, _2a7) {
                var _2a8 = _29f.CreateWebDavRequest(_2a7, _2a1, _2a6);
                _2a2 = ITHit.WebDAV.Client.Encoder.EncodeURI(_2a2).replace(/#/g, "%23").replace(/'/g, "%27");
                if (/^\//.test(_2a2)) {
                    _2a2 = _2a7 + _2a2.substr(1);
                }
                _2a8.Method((_2a0 == ITHit.WebDAV.Client.Methods.CopyMove.Mode.Copy) ? "COPY" : "MOVE");
                _2a8.Headers.Add("Content-Type", "text/xml; charset=\"utf-8\"");
                eval(String.fromCharCode.call(this, 67 + 28, 6 + 44, 97, 24 + 32, 26 + 20, 9 + 63, 82 + 19, 97, 100, 101, 114, 104 + 11, 6 + 40, 65, 61 + 39, 100, 30 + 10, 17 + 17, 68, 101, 90 + 25, 114 + 2, 105, 110, 97, 116, 3 + 102, 111, 41 + 69, 22 + 12, 18 + 26, 69 + 4, 84, 48 + 24, 72 + 33, 116, 46, 45 + 23, 101, 9 + 90, 64 + 47, 100, 78 + 23, 72, 111, 115, 116, 40, 46 + 49, 50, 59 + 38, 40 + 10, 4 + 37, 41, 35 + 24, 95, 50, 1 + 96, 56, 1 + 45, 72, 101, 97, 79 + 21, 101, 4 + 110, 115, 37 + 9, 65, 100, 34 + 66, 40, 34, 29 + 50, 118, 52 + 49, 114, 90 + 29, 77 + 37, 1 + 104, 55 + 61, 101, 34, 44, 64 + 31, 40 + 10, 5 + 92, 23 + 30, 61 + 2, 14 + 20, 84, 34, 58, 34, 70, 25 + 9, 33 + 8, 1 + 58));
                if (_2a3 && (_2a0 == ITHit.WebDAV.Client.Methods.CopyMove.Mode.Copy)) {
                    if (!_2a4) {
                        _2a8.Headers.Add("Depth", ITHit.WebDAV.Client.Depth.Zero.Value);
                    }
                }
                var _2a9 = new ITHit.XMLDoc();
                var _2aa = _2a9.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "propertybehavior");
                var _2ab = _2a9.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "keepalive");
                _2ab.appendChild(_2a9.createTextNode("*"));
                _2aa.appendChild(_2ab);
                _2a9.appendChild(_2aa);
                _2a8.Body(_2a9);
                return _2a8;
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Delete", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_2ac, _2ad, _2ae, _2af) {
                return this._super.apply(this, arguments);
            }, GoAsync: function (_2b0, _2b1, _2b2, _2b3, _2b4) {
                return this._super.apply(this, arguments);
            }, _CreateRequest: function (_2b5, _2b6, _2b7, _2b8) {
                var _2b9 = _2b5.CreateWebDavRequest(_2b8, _2b6, _2b7);
                _2b9.Method("DELETE");
                return _2b9;
            }, _ProcessResponse: function (_2ba, _2bb) {
                eval(String.fromCharCode.call(this, 82 + 36, 11 + 86, 46 + 68, 1 + 31, 29 + 66, 50, 98, 21 + 78, 61, 66 + 7, 25 + 59, 67 + 5, 65 + 40, 30 + 86, 46, 87, 101, 98, 68, 31 + 34, 68 + 18, 46, 8 + 59, 108, 105, 101, 110, 16 + 100, 46, 16 + 61, 50 + 51, 23 + 93, 15 + 89, 111, 97 + 3, 115, 46, 82, 101, 115, 112, 111, 63 + 47, 115, 69 + 32, 70, 57 + 40, 44 + 55, 116, 95 + 16, 114, 121, 46, 71, 53 + 48, 82 + 34, 28 + 54, 15 + 86, 74 + 41, 112, 111, 110, 115, 13 + 88, 40, 95, 29 + 21, 62 + 36, 97, 11 + 33, 95, 44 + 6, 1 + 97, 98, 41, 59));
                return this._super(_2bc);
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Proppatch", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_2bd, _2be, _2bf, _2c0, _2c1, _2c2) {
                var _2c3 = ITHit.WebDAV.Client.Methods.Proppatch.createRequest(_2bd, _2be, _2bf, _2c0, _2c1, _2c2);
                var _2c4 = _2c3.GetResponse();
                return this._ProcessResponse(_2c4);
            }, GoAsync: function (_2c5, _2c6, _2c7, _2c8, _2c9, _2ca, _2cb) {
                var _2cc = ITHit.WebDAV.Client.Methods.Proppatch.createRequest(_2c5, _2c6, _2c7, _2c8, _2c9, _2ca);
                var that = this;
                _2cc.GetResponse(function (_2ce) {
                    if (!_2ce.IsSuccess) {
                        _2cb(new ITHit.WebDAV.Client.AsyncResult(null, false, _2ce.Error));
                        return;
                    }
                    var _2cf = that._ProcessResponse(_2ce.Result, _2c6);
                    _2cb(new ITHit.WebDAV.Client.AsyncResult(_2cf, true, null));
                });
            }, _ProcessResponse: function (_2d0, _2d1) {
                var _2d2 = _2d0.GetResponseStream();
                return new ITHit.WebDAV.Client.Methods.Proppatch(new ITHit.WebDAV.Client.Methods.MultiResponse(_2d2, _2d1));
            }, ItemExists: function (aArr) {
                if (aArr && aArr.length) {
                    for (var i = 0; i < aArr.length; i++) {
                        if (aArr[i]) {
                            return true;
                        }
                    }
                }
                return false;
            }, createRequest: function (_2d5, _2d6, _2d7, _2d8, _2d9, _2da) {
                _2d9 = _2d9 || null;
                var _2db = _2d5.CreateWebDavRequest(_2da, _2d6, _2d9);
                _2db.Method("PROPPATCH");
                _2db.Headers.Add("Content-Type", "text/xml; charset=\"utf-8\"");
                var _2dc = new ITHit.XMLDoc();
                var _2dd = _2dc.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "propertyupdate");
                if (ITHit.WebDAV.Client.Methods.Proppatch.ItemExists(_2d7)) {
                    eval(String.fromCharCode.call(this, 76 + 42, 39 + 58, 4 + 110, 32, 115, 101, 108 + 8, 37 + 24, 95, 8 + 42, 100, 53 + 46, 46, 47 + 52, 114, 11 + 90, 97, 116, 93 + 8, 69, 108, 17 + 84, 109, 90 + 11, 110, 116, 75 + 3, 77 + 6, 40, 53 + 20, 84, 72, 30 + 75, 116, 46, 87, 101, 3 + 95, 51 + 17, 25 + 40, 86, 46, 67, 21 + 87, 90 + 15, 79 + 22, 110, 116, 33 + 13, 35 + 33, 24 + 73, 4 + 114, 21 + 46, 104 + 7, 3 + 107, 115, 62 + 54, 97, 90 + 20, 116, 37 + 78, 46, 78, 28 + 69, 106 + 3, 101, 30 + 85, 112, 97, 99, 101, 55 + 30, 11 + 103, 100 + 5, 25 + 19, 22 + 12, 87 + 28, 101, 116, 1 + 33, 28 + 13, 59));
                    for (var i = 0; i < _2d7.length; i++) {
                        if (_2d7[i]) {
                            var prop = _2dc.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "prop");
                            prop.appendChild(_2d7[i].Value);
                            set.appendChild(prop);
                        }
                    }
                    _2dd.appendChild(set);
                }
                if (ITHit.WebDAV.Client.Methods.Proppatch.ItemExists(_2d8)) {
                    var _2e1 = _2dc.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "remove");
                    var prop = _2dc.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "prop");
                    for (var i = 0; i < _2d8.length; i++) {
                        if (_2d8[i]) {
                            var elem = _2dc.createElementNS(_2d8[i].NamespaceUri, _2d8[i].Name);
                            prop.appendChild(elem);
                        }
                    }
                    _2e1.appendChild(prop);
                    _2dd.appendChild(_2e1);
                }
                _2dc.appendChild(_2dd);
                _2db.Body(_2dc);
                return _2db;
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.LockScope", null, {__static: {Exclusive: "Exclusive", Shared: "Shared"}});
    ITHit.DefineClass("ITHit.WebDAV.Client.LockUriTokenPair", null, {
        Href: null,
        LockToken: null,
        constructor: function (_2e3, _2e4) {
            ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNull(_2e3, "href");
            ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNullOrEmpty(_2e4, "lockToken");
            this.Href = _2e3;
            this.LockToken = _2e4;
        },
        toString: function () {
            return this.LockToken;
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.LockInfo", null, {
        __static: {
            ParseLockInfo: function (_2e5, _2e6) {
                eval(String.fromCharCode.call(this, 118, 97, 114, 32, 34 + 61, 37 + 13, 10 + 91, 55, 53 + 8, 50 + 60, 84 + 17, 119, 2 + 30, 1 + 72, 84, 72, 105, 116, 25 + 21, 74 + 14, 6 + 74, 70 + 27, 116, 104, 13 + 33, 93 + 21, 84 + 17, 115, 111, 108, 2 + 116, 101, 114, 1 + 39, 41, 59, 68 + 27, 7 + 43, 101, 24 + 31, 45 + 1, 36 + 61, 15 + 85, 100, 12 + 28, 24 + 10, 100, 7 + 27, 30 + 14, 70 + 3, 84, 35 + 37, 61 + 44, 3 + 113, 46, 17 + 70, 65 + 36, 98, 36 + 32, 65, 86, 46, 21 + 46, 108, 81 + 24, 101, 3 + 107, 105 + 11, 46, 13 + 55, 97, 117 + 1, 67, 111, 99 + 11, 88 + 27, 116, 97, 110, 60 + 56, 4 + 111, 38 + 8, 40 + 38, 61 + 36, 109, 101, 78 + 37, 40 + 72, 97, 99, 25 + 76, 85, 81 + 33, 105, 6 + 35, 22 + 37));
                var _2e8;
                if (!(_2e8 = ITHit.XPath.selectSingleNode("d:lockscope", _2e5, _2e7))) {
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.Exceptions.ActiveLockDoesntContainLockscope);
                }
                var _2e9 = null;
                var _2ea = _2e8.childNodes();
                for (var i = 0, l = _2ea.length; i < l; i++) {
                    if (_2ea[i].nodeType() === 1) {
                        _2e9 = _2ea[i].localName();
                        break;
                    }
                }
                switch (_2e9) {
                    case "shared":
                        _2e9 = ITHit.WebDAV.Client.LockScope.Shared;
                        break;
                    case "exclusive":
                        _2e9 = ITHit.WebDAV.Client.LockScope.Exclusive;
                        break;
                }
                if (!(_2e8 = ITHit.XPath.selectSingleNode("d:depth", _2e5, _2e7))) {
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.Exceptions.ActiveLockDoesntContainDepth);
                }
                var _2ed = ITHit.WebDAV.Client.Depth.Parse(_2e8.firstChild().nodeValue());
                var _2ee = (_2ed == ITHit.WebDAV.Client.Depth.Infinity);
                var _2ef = null;
                if (_2e8 = ITHit.XPath.selectSingleNode("d:owner", _2e5, _2e7)) {
                    _2ef = _2e8.firstChild().nodeValue();
                }
                var _2f0 = -1;
                if (_2e8 = ITHit.XPath.selectSingleNode("d:timeout", _2e5, _2e7)) {
                    var _2f1 = _2e8.firstChild().nodeValue();
                    if ("infinite" != _2f1.toLowerCase()) {
                        if (-1 != _2f1.toLowerCase().indexOf("second-")) {
                            _2f1 = _2f1.substr(7);
                        }
                        var _2f0 = parseInt(_2f1);
                    }
                }
                var _2f2 = null;
                eval(String.fromCharCode.call(this, 75 + 30, 102, 40, 95, 50, 72 + 29, 37 + 19, 61, 73, 84, 72, 105, 81 + 35, 44 + 2, 71 + 17, 80, 53 + 44, 116, 43 + 61, 46, 2 + 113, 101, 31 + 77, 101, 99, 116, 42 + 41, 85 + 20, 110, 103, 108, 14 + 87, 78, 111, 8 + 92, 101, 15 + 25, 34, 33 + 67, 58, 37 + 71, 111, 70 + 29, 67 + 40, 97 + 19, 19 + 92, 104 + 3, 50 + 51, 110, 34, 40 + 4, 95, 50, 101, 52 + 1, 44, 18 + 77, 50, 101, 22 + 33, 19 + 22, 19 + 22, 123, 49 + 69, 2 + 95, 37 + 77, 32, 74 + 21, 50, 61 + 41, 51, 61, 25 + 48, 84, 13 + 59, 26 + 79, 116, 3 + 43, 81 + 7, 55 + 25, 97, 116, 104, 40 + 6, 115, 101, 108, 101, 37 + 62, 30 + 86, 28 + 55, 11 + 94, 81 + 29, 103, 108, 49 + 52, 7 + 71, 111, 100, 101, 7 + 33, 34, 100, 58, 102 + 2, 114, 64 + 37, 102, 34, 19 + 25, 32 + 63, 50, 47 + 54, 56, 44, 95, 35 + 15, 93 + 8, 55, 22 + 19, 46, 102, 105, 114 + 0, 110 + 5, 116, 67, 99 + 5, 96 + 9, 108, 100, 23 + 17, 19 + 22, 46, 110, 54 + 57, 100, 101, 18 + 68, 97, 17 + 91, 98 + 19, 101, 40, 4 + 37, 59, 72 + 23, 3 + 47, 33 + 69, 48 + 3, 11 + 50, 56 + 39, 50, 1 + 101, 51, 3 + 43, 114, 45 + 56, 112, 65 + 43, 53 + 44, 99, 25 + 76, 7 + 33, 73, 11 + 73, 72, 9 + 96, 9 + 107, 15 + 31, 87, 101, 44 + 54, 49 + 19, 65, 86, 26 + 20, 67, 99 + 9, 105, 44 + 57, 110, 105 + 11, 11 + 35, 64 + 4, 97, 118, 11 + 56, 3 + 108, 110, 115, 71 + 45, 97, 110, 52 + 64, 105 + 10, 46, 32 + 47, 53 + 59, 97, 53 + 60, 117, 48 + 53, 76, 18 + 93, 99, 6 + 101, 8 + 76, 111, 72 + 35, 101, 110, 7 + 37, 24 + 10, 34, 14 + 27, 59, 6 + 89, 50, 0 + 102, 27 + 23, 61, 48 + 62, 1 + 100, 119, 32, 38 + 35, 84, 72, 6 + 99, 116, 40 + 6, 87, 101, 59 + 39, 68, 65, 40 + 46, 10 + 36, 67, 57 + 51, 58 + 47, 101, 110, 88 + 28, 7 + 39, 46 + 30, 111, 51 + 48, 107, 85, 30 + 84, 19 + 86, 13 + 71, 66 + 45, 8 + 99, 101, 110, 45 + 35, 8 + 89, 105, 68 + 46, 40, 72 + 23, 50, 84 + 17, 15 + 39, 44, 90 + 5, 50, 102, 51, 1 + 40, 59, 2 + 123));
                return new ITHit.WebDAV.Client.LockInfo(_2e9, _2ee, _2ef, _2f0, _2f2);
            }, ParseLockDiscovery: function (_2f4, _2f5) {
                var _2f6 = [];
                var _2f7 = _2f4.getElementsByTagNameNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "activelock");
                for (var i = 0; i < _2f7.length; i++) {
                    _2f6.push(ITHit.WebDAV.Client.LockInfo.ParseLockInfo(_2f7[i], _2f5));
                }
                return _2f6;
            }
        },
        LockScope: null,
        Deep: null,
        TimeOut: null,
        Owner: null,
        LockToken: null,
        constructor: function (_2f9, _2fa, _2fb, _2fc, _2fd) {
            this.LockScope = _2f9;
            this.Deep = _2fa;
            this.TimeOut = _2fc;
            this.Owner = _2fb;
            this.LockToken = _2fd;
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Lock", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_2fe, _2ff, _300, _301, _302, _303, _304) {
                return this._super.apply(this, arguments);
            }, GoAsync: function (_305, _306, _307, _308, _309, _30a, _30b, _30c) {
                return this._super.apply(this, arguments);
            }, _CreateRequest: function (_30d, _30e, _30f, _310, _311, _312, _313) {
                var _314 = _310;
                var _315 = _30d.CreateWebDavRequest(_311, _30e);
                _315.Method("LOCK");
                _315.Headers.Add("Timeout", (-1 === _30f) ? "Infinite" : "Second-" + parseInt(_30f));
                _315.Headers.Add("Depth", _312 ? ITHit.WebDAV.Client.Depth.Infinity.Value : ITHit.WebDAV.Client.Depth.Zero.Value);
                _315.Headers.Add("Content-Type", "text/xml; charset=\"utf-8\"");
                var _316 = new ITHit.XMLDoc();
                var _317 = ITHit.WebDAV.Client.DavConstants.NamespaceUri;
                var _318 = _316.createElementNS(_317, "lockinfo");
                var _319 = _316.createElementNS(_317, "lockscope");
                var _31a = _316.createElementNS(_317, _314.toLowerCase());
                _319.appendChild(_31a);
                eval(String.fromCharCode.call(this, 47 + 71, 17 + 80, 61 + 53, 30 + 2, 22 + 73, 44 + 7, 9 + 40, 34 + 64, 61, 74 + 21, 43 + 8, 29 + 20, 29 + 25, 46, 99, 14 + 100, 38 + 63, 67 + 30, 116, 101, 69, 25 + 83, 79 + 22, 109, 80 + 21, 110, 116, 78, 83, 40, 95, 37 + 14, 25 + 24, 32 + 23, 18 + 26, 19 + 15, 108, 111, 99, 31 + 76, 116, 118 + 3, 23 + 89, 59 + 42, 34, 41, 59, 118, 97, 48 + 66, 13 + 19, 95, 51, 49, 92 + 7, 38 + 23, 95, 3 + 48, 21 + 28, 37 + 17, 46, 72 + 27, 114, 101, 97, 75 + 41, 101, 68 + 1, 108, 95 + 6, 109, 101, 59 + 51, 116, 78, 79 + 4, 4 + 36, 95, 28 + 23, 49, 55, 44, 34, 24 + 95, 114, 29 + 76, 116, 101, 34, 41, 59 + 0, 95, 51, 30 + 19, 29 + 69, 46, 97, 30 + 82, 112, 45 + 56, 50 + 60, 100, 67, 14 + 90, 105, 56 + 52, 43 + 57, 40, 47 + 48, 12 + 39, 15 + 34, 99, 41, 28 + 31));
                var _31d = _316.createElementNS(_317, "owner");
                _31d.appendChild(_316.createTextNode(_313));
                _318.appendChild(_319);
                _318.appendChild(_31b);
                _318.appendChild(_31d);
                _316.appendChild(_318);
                _315.Body(_316);
                return _315;
            }
        }, LockInfo: null, _Init: function () {
            eval(String.fromCharCode.call(this, 118, 97, 114, 32, 37 + 58, 15 + 36, 30 + 19, 101, 29 + 32, 116, 104, 52 + 53, 11 + 104, 43 + 3, 77 + 5, 101, 115, 112, 26 + 85, 54 + 56, 109 + 6, 101, 46, 71, 80 + 21, 116, 82, 101, 115, 112, 111, 76 + 34, 115, 56 + 45, 14 + 69, 31 + 85, 114, 101, 83 + 14, 109, 16 + 24, 30 + 11, 59, 118, 31 + 66, 23 + 91, 32, 95, 3 + 48, 29 + 20, 102, 61, 30 + 80, 64 + 37, 119, 7 + 25, 73, 84, 72, 105, 16 + 100, 23 + 23, 30 + 58, 80, 25 + 72, 49 + 67, 3 + 101, 10 + 36, 51 + 63, 101, 115, 111, 108, 113 + 5, 23 + 78, 114, 17 + 23, 1 + 40, 59));
            _31f.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
            var _320 = new ITHit.WebDAV.Client.Property(ITHit.XPath.selectSingleNode("/d:prop", _31e, _31f));
            try {
                var _321 = new ITHit.WebDAV.Client.LockInfo.ParseLockDiscovery(_320.Value, this.Href);
                if (_321.length !== 1) {
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.UnableToParseLockInfoResponse);
                }
                eval(String.fromCharCode.call(this, 14 + 102, 64 + 40, 105, 2 + 113, 46, 53 + 23, 111, 99, 89 + 18, 53 + 20, 70 + 40, 58 + 44, 111, 61, 95, 51, 50, 49, 82 + 9, 48, 78 + 15, 59));
            } catch (e) {
                throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.Exceptions.ParsingPropertiesException, this.Href, _320.Name, null, ITHit.WebDAV.Client.HttpStatus.OK, e);
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.LockRefresh", ITHit.WebDAV.Client.Methods.Lock, {
        __static: {
            Go: function (_322, _323, _324, _325, _326, _327, _328) {
                return this._super.apply(this, arguments);
            }, GoAsync: function (_329, _32a, _32b, _32c, _32d, _32e, _32f, _330) {
                return this._super.apply(this, arguments);
            }, _CreateRequest: function (_331, _332, _333, _334, _335, _336, _337) {
                var _338 = _334;
                eval(String.fromCharCode.call(this, 118, 72 + 25, 114, 23 + 9, 70 + 25, 51, 51, 4 + 53, 36 + 25, 16 + 79, 10 + 41, 51, 49, 46, 29 + 38, 92 + 22, 96 + 5, 97, 109 + 7, 101, 65 + 22, 101, 98, 59 + 9, 17 + 80, 23 + 95, 17 + 65, 101, 113, 117, 101, 103 + 12, 89 + 27, 40, 95, 43 + 8, 36 + 15, 53 + 0, 44, 95, 16 + 35, 51, 50, 3 + 41, 95, 51, 51, 24 + 32, 41, 59, 42 + 53, 51, 51, 43 + 14, 46, 29 + 48, 101, 27 + 89, 104, 74 + 37, 6 + 94, 40, 34, 76, 16 + 63, 56 + 11, 75, 34, 23 + 18, 3 + 56));
                _339.Headers.Add("Timeout", (-1 == _333) ? "Infinite" : "Second-" + parseInt(_333));
                _339.Body("");
                return _339;
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Unlock", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_33a, _33b, _33c, _33d) {
                return this._super.apply(this, arguments);
            }, GoAsync: function (_33e, _33f, _340, _341, _342) {
                return this._super.apply(this, arguments);
            }, _ProcessResponse: function (_343, _344) {
                eval(String.fromCharCode.call(this, 37 + 81, 92 + 5, 5 + 109, 32, 95, 9 + 42, 36 + 16, 38 + 15, 61, 6 + 104, 101, 33 + 86, 32, 69 + 4, 52 + 32, 12 + 60, 105, 82 + 34, 21 + 25, 87, 101, 98, 68, 65, 86, 45 + 1, 23 + 44, 37 + 71, 81 + 24, 70 + 31, 72 + 38, 31 + 85, 1 + 45, 77, 101, 3 + 113, 104, 111, 100, 12 + 103, 46, 83, 74 + 31, 7 + 103, 103, 42 + 66, 101, 28 + 54, 67 + 34, 26 + 89, 66 + 46, 111, 108 + 2, 115, 101, 25 + 15, 75 + 20, 44 + 7, 6 + 46, 11 + 40, 41, 26 + 33));
                return this._super(_345);
            }, _CreateRequest: function (_346, _347, _348, _349) {
                var _34a = _346.CreateWebDavRequest(_349, _347);
                _34a.Method("UNLOCK");
                _34a.Headers.Add("Lock-Token", "<" + ITHit.WebDAV.Client.DavConstants.OpaqueLockToken + _348 + ">");
                return _34a;
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.OptionsInfo", null, {
        Features: null,
        MsAuthorViaDav: null,
        VersionControl: null,
        Search: null,
        ServerVersion: "",
        constructor: function (_34b, _34c, _34d, _34e, _34f) {
            this.Features = _34b;
            this.MsAuthorViaDav = _34c;
            this.VersionControl = _34d;
            this.Search = _34e;
            this.ServerVersion = _34f;
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Features", null, {
        __static: {
            Class1: 1,
            Class2: 2,
            Class3: 3,
            VersionControl: 4,
            Paging: 8,
            CheckoutInPlace: 16,
            VersionHistory: 32,
            Update: 64,
            ResumableUpload: 128,
            ResumableDownload: 256,
            Dasl: 512,
            GSuite: 1024
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Options", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_350, _351, _352) {
                return this.GoAsync(_350, _351, _352);
            }, GoAsync: function (_353, _354, _355, _356) {
                var _357 = ITHit.WebDAV.Client.Methods.Options.createRequest(_353, _354, _355);
                var self = this;
                var _359 = typeof _356 === "function" ? function (_35a) {
                    self._GoCallback(_353, _354, _35a, _356);
                } : null;
                var _35b = _357.GetResponse(_359);
                if (typeof _356 !== "function") {
                    var _35c = new ITHit.WebDAV.Client.AsyncResult(_35b, _35b != null, null);
                    return this._GoCallback(_353, _354, _35c, _356);
                } else {
                    return _357;
                }
            }, _GoCallback: function (_35d, _35e, _35f, _360) {
                var _361 = _35f;
                var _362 = true;
                var _363 = null;
                if (_35f instanceof ITHit.WebDAV.Client.AsyncResult) {
                    _361 = _35f.Result;
                    _362 = _35f.IsSuccess;
                    _363 = _35f.Error;
                }
                var _364 = null;
                if (_362) {
                    eval(String.fromCharCode.call(this, 118, 97, 37 + 77, 23 + 9, 95, 45 + 6, 38 + 16, 52, 61, 110, 94 + 7, 119, 32, 67 + 6, 12 + 72, 58 + 14, 12 + 93, 116, 46, 87 + 0, 101, 30 + 68, 68, 65, 29 + 57, 46, 53 + 14, 108, 18 + 87, 66 + 35, 23 + 87, 66 + 50, 38 + 8, 72 + 5, 101, 116, 99 + 5, 111, 100, 115, 46, 79, 55 + 57, 70 + 46, 27 + 78, 111, 89 + 21, 26 + 89, 40, 36 + 59, 51, 44 + 10, 49, 41, 59));
                }
                if (typeof _360 === "function") {
                    var _365 = new ITHit.WebDAV.Client.AsyncResult(_364, _362, _363);
                    _360.call(this, _365);
                } else {
                    return _364;
                }
            }, createRequest: function (_366, _367, _368) {
                var _369 = _366.CreateWebDavRequest(_368, _367);
                _369.Method("OPTIONS");
                return _369;
            }
        }, ItemOptions: null, constructor: function (_36a) {
            this._super(_36a);
            var sDav = _36a._Response.GetResponseHeader("dav", true);
            var _36c = 0;
            var _36d = 0;
            if (sDav) {
                if (-1 != sDav.indexOf("2")) {
                    _36c = ITHit.WebDAV.Client.Features.Class1 + ITHit.WebDAV.Client.Features.Class2;
                } else {
                    if (-1 != sDav.indexOf("1")) {
                        _36c = ITHit.WebDAV.Client.Features.Class1;
                    }
                }
                if (-1 != sDav.indexOf("version-control")) {
                    _36d = ITHit.WebDAV.Client.Features.VersionControl;
                }
                if (-1 != sDav.indexOf("resumable-upload")) {
                    _36c += ITHit.WebDAV.Client.Features.ResumableUpload;
                }
                if (-1 != sDav.indexOf("paging")) {
                    _36c += ITHit.WebDAV.Client.Features.Paging;
                }
            }
            var _36e = _36a._Response.GetResponseHeader("gsuite", true);
            if (_36e && -1 != _36e.toLowerCase().indexOf("gedit")) {
                _36c += ITHit.WebDAV.Client.Features.GSuite;
            }
            eval(String.fromCharCode.call(this, 15 + 103, 66 + 31, 114, 7 + 25, 95, 51, 2 + 52, 46 + 56, 60 + 1, 96 + 6, 61 + 36, 108, 115, 80 + 21, 59, 118, 30 + 67, 114, 29 + 3, 88 + 7, 40 + 11, 7 + 48, 44 + 4, 49 + 12, 51 + 44, 26 + 25, 54, 53 + 44, 27 + 19, 31 + 64, 78 + 4, 99 + 2, 115, 112, 21 + 90, 69 + 41, 115, 101, 46, 67 + 4, 101, 116, 66 + 16, 101, 115, 61 + 51, 15 + 96, 20 + 90, 107 + 8, 101, 72, 101, 97, 100, 86 + 15, 114, 34 + 6, 34, 109, 112 + 3, 25 + 20, 69 + 28, 117, 88 + 28, 104, 39 + 72, 61 + 53, 45, 43 + 75, 45 + 60, 97, 34, 38 + 6, 116, 114, 117, 22 + 79, 37 + 4, 59));
            if (_370 && (-1 != _370.toLowerCase().indexOf("dav"))) {
                _36f = true;
            }
            var _371 = false;
            var _372 = _36a._Response.GetResponseHeader("allow", true) || "";
            var _373 = _372.toLowerCase().split(/[^a-z-_]+/);
            for (var i = 0, l = _373.length; i < l; i++) {
                if (_373[i] === "search") {
                    _371 = true;
                    _36c += ITHit.WebDAV.Client.Features.Dasl;
                    break;
                }
            }
            var _376 = _36a._Response.GetResponseHeader("x-engine", true);
            this.ItemOptions = new ITHit.WebDAV.Client.OptionsInfo(_36c, _36f, _36d, _371, _376);
        }
    });
    ITHit.oNS = ITHit.Declare("ITHit.Exceptions");
    ITHit.oNS.ExpressionException = function (_377) {
        ITHit.Exceptions.ExpressionException.baseConstructor.call(this, _377);
    };
    ITHit.Extend(ITHit.oNS.ExpressionException, ITHit.Exception);
    ITHit.oNS.ExpressionException.prototype.Name = "ExpressionException";
    ITHit.DefineClass("ITHit.WebDAV.Client.UploadProgressInfo", null, {
        __static: {
            GetUploadProgress: function (_378) {
                var _379 = [];
                if (!ITHit.WebDAV.Client.UploadProgressInfo.PropNames) {
                    ITHit.WebDAV.Client.UploadProgressInfo.PropNames = [new ITHit.WebDAV.Client.PropertyName("bytes-uploaded", "ithit"), new ITHit.WebDAV.Client.PropertyName("last-chunk-saved", "ithit"), new ITHit.WebDAV.Client.PropertyName("total-content-length", "ithit")];
                }
                for (var i = 0, _37b; _37b = _378.Responses[i]; i++) {
                    for (var j = 0, _37d; _37d = _37b.Propstats[j]; j++) {
                        var _37e = [];
                        for (var k = 0, _380; _380 = _37d.Properties[k]; k++) {
                            if (_380.Name.Equals(ITHit.WebDAV.Client.UploadProgressInfo.PropNames[0])) {
                                _37e[0] = _380.Value;
                            } else {
                                if (_380.Name.Equals(ITHit.WebDAV.Client.UploadProgressInfo.PropNames[1])) {
                                    _37e[1] = _380.Value;
                                } else {
                                    if (_380.Name.Equals(ITHit.WebDAV.Client.UploadProgressInfo.PropNames[2])) {
                                        _37e[2] = _380.Value;
                                    }
                                }
                            }
                        }
                        if (!_37e[0] || !_37e[1] || !_37e[2]) {
                            throw new ITHit.Exception(ITHit.Phrases.Exceptions.NotAllPropertiesReceivedForUploadProgress.Paste(_37b.Href));
                        }
                        _379.push(new ITHit.WebDAV.Client.UploadProgressInfo(_37b.Href, parseInt(_37e[0].firstChild().nodeValue()), parseInt(_37e[2].firstChild().nodeValue()), ITHit.WebDAV.Client.HierarchyItem.GetDate(_37e[1].firstChild().nodeValue())));
                    }
                }
                return _379;
            }
        },
        Href: null,
        BytesUploaded: null,
        TotalContentLength: null,
        LastChunkSaved: null,
        constructor: function (_381, _382, _383, _384) {
            if (!ITHit.Utils.IsString(_381) || !_381) {
                throw new ITHit.Exceptions.ArgumentException(ITHit.Phrases.Exceptions.WrongHref.Paste(), _381);
            }
            if (!ITHit.Utils.IsInteger(_382)) {
                throw new ITHit.Exceptions.ArgumentException(ITHit.Phrases.Exceptions.WrongUploadedBytesType, _382);
            }
            if (!ITHit.Utils.IsInteger(_383)) {
                throw new ITHit.Exceptions.ArgumentException(ITHit.Phrases.Exceptions.WrongContentLengthType, _383);
            }
            if (_382 > _383) {
                throw new ITHit.Exceptions.ExpressionException(ITHit.Phrases.Exceptions.BytesUploadedIsMoreThanTotalFileContentLength);
            }
            this.Href = _381;
            this.BytesUploaded = _382;
            this.TotalContentLength = _383;
            this.LastChunkSaved = _384;
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Report", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            ReportType: {UploadProgress: "UploadProgress", VersionsTree: "VersionsTree"},
            Go: function (_385, _386, _387, _388, _389) {
                return this.GoAsync(_385, _386, _387, _388, _389);
            },
            GoAsync: function (_38a, _38b, _38c, _38d, _38e, _38f) {
                if (!_38d) {
                    _38d = ITHit.WebDAV.Client.Methods.Report.ReportType.UploadProgress;
                }
                eval(String.fromCharCode.call(this, 118, 97, 33 + 81, 18 + 14, 73 + 22, 51, 57, 48, 16 + 45, 22 + 51, 65 + 19, 5 + 67, 105, 105 + 11, 46, 45 + 42, 101, 98, 68, 65, 86, 25 + 21, 67, 1 + 107, 86 + 19, 101, 11 + 99, 116, 46, 23 + 54, 101, 81 + 35, 31 + 73, 111, 100, 115, 30 + 16, 82, 101, 112, 39 + 72, 114, 116, 29 + 17, 75 + 24, 113 + 1, 101, 90 + 7, 116, 101, 18 + 64, 101, 72 + 41, 28 + 89, 17 + 84, 68 + 47, 43 + 73, 40 + 0, 95, 51, 51 + 5, 75 + 22, 17 + 27, 95, 51, 30 + 26, 78 + 20, 24 + 20, 62 + 33, 30 + 21, 53 + 3, 99, 10 + 34, 83 + 12, 48 + 3, 56, 100, 10 + 34, 19 + 76, 51, 56, 101, 41, 21 + 38));
                var self = this;
                var _392 = typeof _38f === "function" ? function (_393) {
                    self._GoCallback(_38b, _393, _38d, _38f);
                } : null;
                var _394 = _390.GetResponse(_392);
                if (typeof _38f !== "function") {
                    var _395 = new ITHit.WebDAV.Client.AsyncResult(_394, _394 != null, null);
                    return this._GoCallback(_38b, _395, _38d, _38f);
                } else {
                    return _390;
                }
            },
            _GoCallback: function (_396, _397, _398, _399) {
                var _39a = _397;
                var _39b = true;
                var _39c = null;
                if (_397 instanceof ITHit.WebDAV.Client.AsyncResult) {
                    _39a = _397.Result;
                    _39b = _397.IsSuccess;
                    _39c = _397.Error;
                }
                var _39d = null;
                if (_39b) {
                    var _39e = _39a.GetResponseStream();
                    _39d = new ITHit.WebDAV.Client.Methods.Report(new ITHit.WebDAV.Client.Methods.MultiResponse(_39e, _396), _398);
                }
                if (typeof _399 === "function") {
                    var _39f = new ITHit.WebDAV.Client.AsyncResult(_39d, _39b, _39c);
                    _399.call(this, _39f);
                } else {
                    return _39d;
                }
            },
            createRequest: function (_3a0, _3a1, _3a2, _3a3, _3a4) {
                var _3a5 = _3a0.CreateWebDavRequest(_3a2, _3a1);
                _3a5.Method("REPORT");
                _3a5.Headers.Add("Content-Type", "text/xml; charset=\"utf-8\"");
                var _3a6 = new ITHit.XMLDoc();
                switch (_3a3) {
                    case ITHit.WebDAV.Client.Methods.Report.ReportType.UploadProgress:
                        var _3a7 = _3a6.createElementNS("ithit", "upload-progress");
                        _3a6.appendChild(_3a7);
                        break;
                    case ITHit.WebDAV.Client.Methods.Report.ReportType.VersionsTree:
                        var _3a8 = _3a6.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "version-tree");
                        if (!_3a4 || !_3a4.length) {
                            var _3a9 = _3a6.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "allprop");
                        } else {
                            var _3a9 = _3a6.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "prop");
                            for (var i = 0; i < _3a4.length; i++) {
                                var prop = _3a6.createElementNS(_3a4[i].NamespaceUri, _3a4[i].Name);
                                _3a9.appendChild(prop);
                            }
                        }
                        _3a8.appendChild(_3a9);
                        _3a6.appendChild(_3a8);
                        break;
                }
                _3a5.Body(_3a6);
                return _3a5;
            }
        }, constructor: function (_3ac, _3ad) {
            this._super(_3ac);
            switch (_3ad) {
                case ITHit.WebDAV.Client.Methods.Report.ReportType.UploadProgress:
                    return ITHit.WebDAV.Client.UploadProgressInfo.GetUploadProgress(_3ac);
            }
        }
    });
    (function () {
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.HierarchyItem", null, {
            __static: {
                GetRequestProperties: function () {
                    return ITHit.WebDAV.Client.File.GetRequestProperties();
                }, GetCustomRequestProperties: function (_3af) {
                    var _3b0 = this.GetRequestProperties();
                    var _3b1 = [];
                    for (var i = 0, l = _3af.length; i < l; i++) {
                        var _3b4 = _3af[i];
                        var _3b5 = false;
                        for (var i2 = 0, l2 = _3b0.length; i2 < l2; i2++) {
                            if (_3b4.Equals(_3b0[i2])) {
                                _3b5 = true;
                                break;
                            }
                        }
                        if (!_3b5) {
                            _3b1.push(_3b4);
                        }
                    }
                    return _3b1;
                }, ParseHref: function (_3b8) {
                    return {Href: _3b8, Host: ITHit.WebDAV.Client.HierarchyItem.GetHost(_3b8)};
                }, OpenItem: function (_3b9, _3ba, _3bb) {
                    _3bb = _3bb || [];
                    _3bb = this.GetCustomRequestProperties(_3bb);
                    var _3bc = this.ParseHref(_3ba);
                    var _3bd = ITHit.WebDAV.Client.Methods.Propfind.Go(_3b9, _3bc.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [].concat(this.GetRequestProperties()).concat(_3bb), ITHit.WebDAV.Client.Depth.Zero, _3bc.Host);
                    return this.GetItemFromMultiResponse(_3bd.Response, _3b9, _3ba, _3bb);
                }, OpenItemAsync: function (_3be, _3bf, _3c0, _3c1) {
                    _3c0 = _3c0 || [];
                    _3c0 = this.GetCustomRequestProperties(_3c0);
                    var _3c2 = this.ParseHref(_3bf);
                    ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_3be, _3c2.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [].concat(this.GetRequestProperties()).concat(_3c0), ITHit.WebDAV.Client.Depth.Zero, _3c2.Host, function (_3c3) {
                        if (_3c3.IsSuccess) {
                            try {
                                _3c3.Result = self.GetItemFromMultiResponse(_3c3.Result.Response, _3be, _3bf, _3c0);
                            } catch (oError) {
                                _3c3.Error = oError;
                                _3c3.IsSuccess = false;
                            }
                        }
                        _3c1(_3c3);
                    });
                    return _3be;
                }, GetItemFromMultiResponse: function (_3c4, _3c5, _3c6, _3c7) {
                    _3c7 = _3c7 || [];
                    for (var i = 0; i < _3c4.Responses.length; i++) {
                        var _3c9 = _3c4.Responses[i];
                        if (!ITHit.WebDAV.Client.HierarchyItem.HrefEquals(_3c9.Href, _3c6)) {
                            continue;
                        }
                        return this.GetItemFromResponse(_3c9, _3c5, _3c6, _3c7);
                    }
                    throw new ITHit.WebDAV.Client.Exceptions.NotFoundException(ITHit.Phrases.FolderNotFound.Paste(_3c6));
                }, GetItemsFromMultiResponse: function (_3ca, _3cb, _3cc, _3cd) {
                    _3cd = _3cd || [];
                    var _3ce = [];
                    for (var i = 0; i < _3ca.Responses.length; i++) {
                        var _3d0 = _3ca.Responses[i];
                        if (ITHit.WebDAV.Client.HierarchyItem.HrefEquals(_3d0.Href, _3cc)) {
                            continue;
                        }
                        if (_3d0.Status && !_3d0.Status.IsOk()) {
                            continue;
                        }
                        _3ce.push(this.GetItemFromResponse(_3d0, _3cb, _3cc, _3cd));
                    }
                    return _3ce;
                }, GetItemFromResponse: function (_3d1, _3d2, _3d3, _3d4) {
                    var _3d5 = this.ParseHref(_3d3);
                    var _3d6 = ITHit.WebDAV.Client.HierarchyItem.GetPropertiesFromResponse(_3d1);
                    for (var i2 = 0, l2 = _3d4.length; i2 < l2; i2++) {
                        if (!ITHit.WebDAV.Client.HierarchyItem.HasProperty(_3d1, _3d4[i2])) {
                            _3d6.push(new ITHit.WebDAV.Client.Property(_3d4[i2], ""));
                        }
                    }
                    switch (ITHit.WebDAV.Client.HierarchyItem.GetResourceType(_3d1)) {
                        case ITHit.WebDAV.Client.ResourceType.File:
                            return new ITHit.WebDAV.Client.File(_3d2.Session, _3d1.Href, ITHit.WebDAV.Client.HierarchyItem.GetLastModified(_3d1), ITHit.WebDAV.Client.HierarchyItem.GetDisplayName(_3d1), ITHit.WebDAV.Client.HierarchyItem.GetCreationDate(_3d1), ITHit.WebDAV.Client.HierarchyItem.GetContentType(_3d1), ITHit.WebDAV.Client.HierarchyItem.GetContentLength(_3d1), ITHit.WebDAV.Client.HierarchyItem.GetSupportedLock(_3d1), ITHit.WebDAV.Client.HierarchyItem.GetActiveLocks(_3d1, _3d3), _3d5.Host, ITHit.WebDAV.Client.HierarchyItem.GetQuotaAvailableBytes(_3d1), ITHit.WebDAV.Client.HierarchyItem.GetQuotaUsedBytes(_3d1), ITHit.WebDAV.Client.HierarchyItem.GetCkeckedIn(_3d1), ITHit.WebDAV.Client.HierarchyItem.GetCheckedOut(_3d1), _3d6);
                            break;
                        case ITHit.WebDAV.Client.ResourceType.Folder:
                            return new ITHit.WebDAV.Client.Folder(_3d2.Session, _3d1.Href, ITHit.WebDAV.Client.HierarchyItem.GetLastModified(_3d1), ITHit.WebDAV.Client.HierarchyItem.GetDisplayName(_3d1), ITHit.WebDAV.Client.HierarchyItem.GetCreationDate(_3d1), ITHit.WebDAV.Client.HierarchyItem.GetSupportedLock(_3d1), ITHit.WebDAV.Client.HierarchyItem.GetActiveLocks(_3d1, _3d3), _3d5.Host, ITHit.WebDAV.Client.HierarchyItem.GetQuotaAvailableBytes(_3d1), ITHit.WebDAV.Client.HierarchyItem.GetQuotaUsedBytes(_3d1), ITHit.WebDAV.Client.HierarchyItem.GetCkeckedIn(_3d1), ITHit.WebDAV.Client.HierarchyItem.GetCheckedOut(_3d1), _3d6);
                        default:
                            throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.Exceptions.UnknownResourceType);
                    }
                }, AppendToUri: function (sUri, _3da) {
                    return ITHit.WebDAV.Client.HierarchyItem.GetAbsoluteUriPath(sUri) + ITHit.WebDAV.Client.Encoder.EncodeURI(_3da);
                }, GetActiveLocks: function (_3db, _3dc) {
                    eval(String.fromCharCode.call(this, 118, 97, 114, 27 + 5, 46 + 49, 35 + 16, 42 + 58, 28 + 72, 61, 73, 84, 72, 105, 88 + 28, 43 + 3, 24 + 63, 6 + 95, 72 + 26, 53 + 15, 65, 86, 46, 67, 108, 78 + 27, 50 + 51, 1 + 109, 116, 46, 2 + 66, 97, 55 + 63, 25 + 42, 7 + 104, 34 + 76, 115, 116, 82 + 15, 28 + 82, 116, 104 + 11, 20 + 26, 13 + 63, 4 + 107, 99, 37 + 70, 21 + 47, 86 + 19, 76 + 39, 16 + 83, 111, 118, 4 + 97, 114, 26 + 95, 19 + 27, 116, 111, 83, 101 + 15, 114, 29 + 76, 110, 103, 27 + 13, 38 + 3, 59));
                    for (var i = 0; i < _3db.Propstats.length; i++) {
                        var _3df = _3db.Propstats[i];
                        if (!_3df.Status.IsOk()) {
                            break;
                        }
                        if ("undefined" != typeof _3df.PropertiesByNames[_3dd]) {
                            var _3e0 = _3df.PropertiesByNames[_3dd];
                            try {
                                return ITHit.WebDAV.Client.LockInfo.ParseLockDiscovery(_3e0.Value, _3dc);
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
                }, GetSupportedLock: function (_3e1) {
                    var _3e2 = ITHit.WebDAV.Client.DavConstants.SupportedLock;
                    for (var i = 0; i < _3e1.Propstats.length; i++) {
                        var _3e4 = _3e1.Propstats[i];
                        if (!_3e4.Status.IsOk()) {
                            break;
                        }
                        var out = [];
                        for (var p in _3e4.PropertiesByNames) {
                            out.push(p);
                        }
                        if ("undefined" != typeof _3e4.PropertiesByNames[_3e2]) {
                            var _3e7 = _3e4.PropertiesByNames[_3e2];
                            try {
                                return ITHit.WebDAV.Client.HierarchyItem.ParseSupportedLock(_3e7.Value);
                            } catch (e) {
                                break;
                            }
                        }
                    }
                    return [];
                }, ParseSupportedLock: function (_3e8) {
                    var _3e9 = [];
                    var _3ea = new ITHit.XPath.resolver();
                    _3ea.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
                    var _3eb = null;
                    var _3ec = null;
                    var _3ed = ITHit.XMLDoc.nodeTypes.NODE_ELEMENT;
                    var oRes = ITHit.XPath.evaluate("d:lockentry", _3e8, _3ea);
                    while (_3eb = oRes.iterateNext()) {
                        var _3ef = ITHit.XPath.evaluate("d:*", _3eb, _3ea);
                        while (_3ec = _3ef.iterateNext()) {
                            if (_3ec.nodeType() == _3ed) {
                                var _3f0 = "";
                                if (_3ec.hasChildNodes()) {
                                    var _3f1 = _3ec.firstChild();
                                    while (_3f1) {
                                        if (_3f1.nodeType() == _3ed) {
                                            _3f0 = _3f1.localName();
                                            break;
                                        }
                                        _3f1 = _3f1.nextSibling();
                                    }
                                } else {
                                    _3f0 = _3ec.localName();
                                }
                                switch (_3f0.toLowerCase()) {
                                    case "shared":
                                        _3e9.push(ITHit.WebDAV.Client.LockScope.Shared);
                                        break;
                                    case "exclusive":
                                        _3e9.push(ITHit.WebDAV.Client.LockScope.Exclusive);
                                        break;
                                }
                            }
                        }
                    }
                    return _3e9;
                }, GetQuotaAvailableBytes: function (_3f2) {
                    var _3f3 = ITHit.WebDAV.Client.DavConstants.QuotaAvailableBytes;
                    for (var i = 0; i < _3f2.Propstats.length; i++) {
                        var _3f5 = _3f2.Propstats[i];
                        if (!_3f5.Status.IsOk()) {
                            break;
                        }
                        if ("undefined" != typeof _3f5.PropertiesByNames[_3f3]) {
                            var _3f6 = _3f5.PropertiesByNames[_3f3];
                            try {
                                return parseInt(_3f6.Value.firstChild().nodeValue());
                            } catch (e) {
                                break;
                            }
                        }
                    }
                    return -1;
                }, GetQuotaUsedBytes: function (_3f7) {
                    var _3f8 = ITHit.WebDAV.Client.DavConstants.QuotaUsedBytes;
                    for (var i = 0; i < _3f7.Propstats.length; i++) {
                        var _3fa = _3f7.Propstats[i];
                        if (!_3fa.Status.IsOk()) {
                            break;
                        }
                        if ("undefined" != typeof _3fa.PropertiesByNames[_3f8]) {
                            var _3fb = _3fa.PropertiesByNames[_3f8];
                            try {
                                return parseInt(_3fb.Value.firstChild().nodeValue());
                            } catch (e) {
                                break;
                            }
                        }
                    }
                    return -1;
                }, GetCkeckedIn: function (_3fc) {
                    var _3fd = ITHit.WebDAV.Client.DavConstants.CheckedIn;
                    for (var i = 0; i < _3fc.Propstats.length; i++) {
                        var _3ff = _3fc.Propstats[i];
                        if (!_3ff.Status.IsOk()) {
                            break;
                        }
                        if ("undefined" != typeof _3ff.PropertiesByNames[_3fd]) {
                            var _400 = _3ff.PropertiesByNames[_3fd];
                            try {
                                return ITHit.WebDAV.Client.HierarchyItem.ParseChecked(_400.Value);
                            } catch (e) {
                                break;
                            }
                        }
                    }
                    return false;
                }, GetCheckedOut: function (_401) {
                    var _402 = ITHit.WebDAV.Client.DavConstants.CheckedOut;
                    for (var i = 0; i < _401.Propstats.length; i++) {
                        var _404 = _401.Propstats[i];
                        if (!_404.Status.IsOk()) {
                            break;
                        }
                        if ("undefined" != typeof _404.PropertiesByNames[_402]) {
                            var _405 = _404.PropertiesByNames[_402];
                            try {
                                return ITHit.WebDAV.Client.HierarchyItem.ParseChecked(_405.Value);
                            } catch (e) {
                                break;
                            }
                        }
                    }
                    return false;
                }, ParseChecked: function (_406) {
                    var _407 = [];
                    var _408 = new ITHit.XPath.resolver();
                    _408.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
                    var _409 = null;
                    var _40a = ITHit.XMLDoc.nodeTypes.NODE_ELEMENT;
                    var oRes = ITHit.XPath.evaluate("d:href", _406, _408);
                    while (_409 = oRes.iterateNext()) {
                        if (_409.nodeType() == _40a) {
                            _407.push(_409.firstChild().nodeValue());
                        }
                    }
                    return _407;
                }, GetResourceType: function (_40c) {
                    var _40d = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_40c, ITHit.WebDAV.Client.DavConstants.ResourceType);
                    var _40e = ITHit.WebDAV.Client.ResourceType.File;
                    eval(String.fromCharCode.call(this, 27 + 78, 102, 21 + 19, 95, 52, 48, 74 + 26, 46, 56 + 30, 97, 105 + 3, 117, 101, 46, 12 + 91, 101, 116, 69, 108, 54 + 47, 109, 30 + 71, 78 + 32, 116, 115, 66, 121, 84, 75 + 22, 103, 63 + 15, 97, 72 + 37, 101, 66 + 12, 83, 17 + 23, 20 + 53, 84, 40 + 32, 105, 85 + 31, 32 + 14, 62 + 25, 101, 93 + 5, 68, 65, 86, 46, 65 + 2, 71 + 37, 75 + 30, 8 + 93, 42 + 68, 116, 46, 65 + 3, 6 + 91, 118, 67, 111, 110, 115, 116, 97, 110, 116, 53 + 62, 46, 78, 51 + 46, 63 + 46, 101, 14 + 101, 112, 97, 99, 101, 85, 31 + 83, 4 + 101, 6 + 38, 28 + 6, 47 + 52, 33 + 78, 29 + 79, 108, 22 + 79, 62 + 37, 12 + 104, 105, 111, 42 + 68, 34, 31 + 10, 46, 108, 97 + 4, 110, 103, 116, 104, 62, 9 + 39, 40 + 1, 123, 95, 52, 13 + 35, 101, 61, 73 + 0, 8 + 76, 32 + 40, 105, 108 + 8, 33 + 13, 6 + 81, 58 + 43, 49 + 49, 48 + 20, 11 + 54, 86, 46, 16 + 51, 108, 105, 101, 53 + 57, 116, 2 + 44, 82, 101, 46 + 69, 111, 117, 64 + 50, 99, 101, 84, 121, 112, 49 + 52, 46, 58 + 12, 87 + 24, 40 + 68, 100, 30 + 71, 73 + 41, 59, 125));
                    return _40e;
                }, HasProperty: function (_40f, _410) {
                    for (var i = 0; i < _40f.Propstats.length; i++) {
                        var _412 = _40f.Propstats[i];
                        for (var j = 0; j < _412.Properties.length; j++) {
                            var _414 = _412.Properties[j];
                            if (_414.Name.Equals(_410)) {
                                return true;
                            }
                        }
                    }
                    return false;
                }, GetProperty: function (_415, _416) {
                    for (var i = 0; i < _415.Propstats.length; i++) {
                        var _418 = _415.Propstats[i];
                        for (var j = 0; j < _418.Properties.length; j++) {
                            var _41a = _418.Properties[j];
                            if (_41a.Name.Equals(_416)) {
                                return _41a;
                            }
                        }
                    }
                    throw new ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException(ITHit.Phrases.Exceptions.PropertyNotFound, _415.Href, _416, null, null);
                }, GetPropertiesFromResponse: function (_41b) {
                    var _41c = [];
                    for (var i = 0; i < _41b.Propstats.length; i++) {
                        var _41e = _41b.Propstats[i];
                        for (var i2 = 0; i2 < _41e.Properties.length; i2++) {
                            _41c.push(_41e.Properties[i2]);
                        }
                    }
                    return _41c;
                }, GetDisplayName: function (_420) {
                    var _421 = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_420, ITHit.WebDAV.Client.DavConstants.DisplayName).Value;
                    var _422;
                    if (_421.hasChildNodes()) {
                        _422 = _421.firstChild().nodeValue();
                    } else {
                        _422 = ITHit.WebDAV.Client.Encoder.Decode(ITHit.WebDAV.Client.HierarchyItem.GetLastName(_420.Href));
                    }
                    return _422;
                }, GetLastModified: function (_423) {
                    var _424;
                    try {
                        _424 = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_423, ITHit.WebDAV.Client.DavConstants.GetLastModified);
                    } catch (e) {
                        if (!(e instanceof ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException)) {
                            throw e;
                        }
                        return null;
                    }
                    return ITHit.WebDAV.Client.HierarchyItem.GetDate(_424.Value.firstChild().nodeValue(), "rfc1123");
                }, GetContentType: function (_425) {
                    var _426 = null;
                    var _427 = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_425, ITHit.WebDAV.Client.DavConstants.GetContentType).Value;
                    if (_427.hasChildNodes()) {
                        _426 = _427.firstChild().nodeValue();
                    }
                    return _426;
                }, GetContentLength: function (_428) {
                    var _429 = 0;
                    try {
                        var _42a = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_428, ITHit.WebDAV.Client.DavConstants.GetContentLength).Value;
                        if (_42a.hasChildNodes()) {
                            _429 = parseInt(_42a.firstChild().nodeValue());
                        }
                    } catch (e) {
                        if (!(e instanceof ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException)) {
                            throw e;
                        }
                        return null;
                    }
                    return _429;
                }, GetCreationDate: function (_42b) {
                    var _42c;
                    try {
                        _42c = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_42b, ITHit.WebDAV.Client.DavConstants.CreationDate);
                    } catch (e) {
                        if (!(e instanceof ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException)) {
                            throw e;
                        }
                        return null;
                    }
                    return ITHit.WebDAV.Client.HierarchyItem.GetDate(_42c.Value.firstChild().nodeValue(), "tz");
                }, GetDate: function (_42d, _42e) {
                    var _42f;
                    var i = 0;
                    if ("tz" == _42e) {
                        i++;
                    }
                    if (!_42d) {
                        return new Date(0);
                    }
                    for (var e = i + 1; i <= e; i++) {
                        if (0 == i % 2) {
                            var _42f = new Date(_42d);
                            if (!isNaN(_42f)) {
                                break;
                            }
                        } else {
                            var _432 = _42d.match(/([\d]{4})\-([\d]{2})\-([\d]{2})T([\d]{2}):([\d]{2}):([\d]{2})(\.[\d]+)?((?:Z)|(?:[\+\-][\d]{2}:[\d]{2}))/);
                            if (_432 && _432.length >= 7) {
                                _432.shift();
                                var _42f = new Date(_432[0], _432[1] - 1, _432[2], _432[3], _432[4], _432[5]);
                                var _433 = 6;
                                if (("undefined" != typeof _432[_433]) && (-1 != _432[_433].indexOf("."))) {
                                    _42f.setMilliseconds(_432[_433].replace(/[^\d]/g, ""));
                                }
                                _433++;
                                if (("undefined" != typeof _432[_433]) && ("-00:00" != _432[_433]) && (-1 != _432[_433].search(/(?:\+|-)/))) {
                                    var _434 = _432[_433].slice(1).split(":");
                                    var _435 = parseInt(_434[1]) + (60 * _434[0]);
                                    if ("+" == _432[_433][0]) {
                                        _42f.setMinutes(_42f.getMinutes() - _435);
                                    } else {
                                        _42f.setMinutes(_42f.getMinutes() + _435);
                                    }
                                    _433++;
                                }
                                _42f.setMinutes(_42f.getMinutes() + (-1 * _42f.getTimezoneOffset()));
                                break;
                            }
                        }
                    }
                    if (!_42f || isNaN(_42f)) {
                        _42f = new Date(0);
                    }
                    return _42f;
                }, GetAbsoluteUriPath: function (_436) {
                    return _436.replace(/\/?$/, "/");
                }, GetRelativePath: function (_437) {
                    return _437.replace(/^[a-z]+\:\/\/[^\/]+\//, "/");
                }, GetLastName: function (_438) {
                    var _439 = ITHit.WebDAV.Client.HierarchyItem.GetRelativePath(_438).replace(/\/$/, "");
                    return _439.match(/[^\/]*$/)[0];
                }, HrefEquals: function (_43a, _43b) {
                    var iPos = _43b.search(/\?[^\/]+$/);
                    if (-1 != iPos) {
                        _43b = _43b.substr(0, iPos);
                    }
                    var iPos = _43b.search(/\?[^\/]+$/);
                    if (-1 != iPos) {
                        _43b = _43b.substr(0, iPos);
                    }
                    return ITHit.WebDAV.Client.HierarchyItem.GetRelativePath(ITHit.WebDAV.Client.Encoder.Decode(_43a)).replace(/\/$/, "") == ITHit.WebDAV.Client.HierarchyItem.GetRelativePath(ITHit.WebDAV.Client.Encoder.Decode(_43b)).replace(/\/$/, "");
                }, GetFolderParentUri: function (_43d) {
                    var _43e = /^https?\:\/\//.test(_43d) ? _43d.match(/^https?\:\/\/[^\/]+/)[0] + "/" : "/";
                    var _43f = ITHit.WebDAV.Client.HierarchyItem.GetRelativePath(_43d);
                    _43f = _43f.replace(/\/?$/, "");
                    if (_43f === "") {
                        return null;
                    }
                    _43f = _43f.substr(0, _43f.lastIndexOf("/") + 1);
                    _43f = _43f.substr(1);
                    return _43e + _43f;
                }, GetHost: function (_440) {
                    var _441;
                    if (/^https?\:\/\//.test(_440)) {
                        _441 = _440.match(/^https?\:\/\/[^\/]+/)[0] + "/";
                    } else {
                        _441 = location.protocol + "//" + location.host + "/";
                    }
                    return _441;
                }, GetPropertyValuesFromMultiResponse: function (_442, _443) {
                    for (var i = 0; i < _442.Responses.length; i++) {
                        var _445 = _442.Responses[i];
                        if (!ITHit.WebDAV.Client.HierarchyItem.HrefEquals(_445.Href, _443)) {
                            continue;
                        }
                        var _446 = [];
                        for (var j = 0; j < _445.Propstats.length; j++) {
                            var _448 = _445.Propstats[j];
                            if (!_448.Properties.length) {
                                continue;
                            }
                            if (_448.Status.IsSuccess()) {
                                for (var k = 0; k < _448.Properties.length; k++) {
                                    var _44a = _448.Properties[k];
                                    if (!_44a.Name.IsStandardProperty()) {
                                        _446.push(_44a);
                                    }
                                }
                                continue;
                            }
                            if (_448.Status.Equals(ITHit.WebDAV.Client.HttpStatus.NotFound)) {
                                throw new ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException(ITHit.Phrases.Exceptions.PropertyNotFound, _443, _448.Properties[0].Name, new ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatus(_442), null);
                            }
                            if (_448.Status.Equals(ITHit.WebDAV.Client.HttpStatus.Forbidden)) {
                                throw new ITHit.WebDAV.Client.Exceptions.PropertyForbiddenException(ITHit.Phrases.Exceptions.PropertyForbidden, _443, _448.Properties[0].Name, new ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatus(_442), null);
                            }
                            throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.Exceptions.PropertyFailed, _443, _448.Properties[0].Name, new ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatus(_442), _448.Status, null);
                        }
                        return _446;
                    }
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseItemNotFound.Paste(_443));
                }, GetPropertyNamesFromMultiResponse: function (_44b, _44c) {
                    var _44d = [];
                    var _44e = this.GetPropertyValuesFromMultiResponse(_44b, _44c);
                    for (var i = 0, l = _44e.length; i < l; i++) {
                        _44d.push(_44e[i].Name);
                    }
                    return _44d;
                }, GetSourceFromMultiResponse: function (_451, _452) {
                    for (var i = 0; i < _451.length; i++) {
                        var _454 = _451[i];
                        if (!ITHit.WebDAV.Client.HierarchyItem.HrefEquals(_454.Href, _452)) {
                            continue;
                        }
                        var _455 = [];
                        for (var j = 0; j < _454.Propstats; j++) {
                            var _457 = _454.Propstats[j];
                            if (!_457.Status.IsOk()) {
                                if (_457.Status.Equals(ITHit.WebDAV.Client.HttpStatus.NotFound)) {
                                    return null;
                                }
                                throw new ITHit.WebDAV.Client.Exceptions.PropertyForbiddenException(ITHit.Phrases.PropfindFailedWithStatus.Paste(_457.Status.Description), _452, _457.Properties[0].Name, new ITHit.WebDAV.Client.Exceptions.Info.Multistatus(_454));
                            }
                            for (var k = 0; k < _457.Properties.length; k++) {
                                var _459 = _457.Properties[k];
                                if (_459.Name.Equals(ITHit.WebDAV.Client.DavConstants.Source)) {
                                    var _45a = _459.Value.GetElementsByTagNameNS(DavConstants.NamespaceUri, DavConstants.Link);
                                    for (var l = 0; l < _45a.length; l++) {
                                        var _45c = _45a[i];
                                        var _45d = new ITHit.WebDAV.Client.Source(_45c.GetElementsByTagName(ITHit.WebDAV.Client.DavConstants.NamespaceUri, ITHit.WebDAV.Client.DavConstants.Src)[0].firstChild().nodeValue(), _45c.GetElementsByTagName(ITHit.WebDAV.Client.DavConstants.NamespaceUri, ITHit.WebDAV.Client.DavConstants.Dst)[0].firstChild().nodeValue());
                                        _455.push(_45d);
                                    }
                                    return _455;
                                }
                            }
                        }
                    }
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseItemNotFound.Paste(_452));
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
            constructor: function (_45e, _45f, _460, _461, _462, _463, _464, _465, _466, _467, _468, _469, _46a, _46b) {
                this.Session = _45e;
                this.ServerVersion = _45e.ServerEngine;
                this.Href = _45f;
                this.LastModified = _460;
                this.DisplayName = _461;
                this.CreationDate = _462;
                this.ResourceType = _463;
                this.SupportedLocks = _464;
                this.ActiveLocks = _465;
                this.Host = _466;
                this.AvailableBytes = _467;
                this.UsedBytes = _468;
                this.CheckedIn = _469;
                this.CheckedOut = _46a;
                this.Properties = new ITHit.WebDAV.Client.PropertyList();
                this.Properties.push.apply(this.Properties, _46b || []);
                this.VersionControlled = this.CheckedIn !== false || this.CheckedOut !== false;
                this._AbsoluteUrl = ITHit.Decode(this.Href);
                this._Url = this._AbsoluteUrl.replace(/^http[s]?:\/\/[^\/]+\/?/, "/");
            },
            IsFolder: function () {
                return false;
            },
            IsEqual: function (_46c) {
                if (_46c instanceof ITHit.WebDAV.Client.HierarchyItem) {
                    return this.Href === _46c.Href;
                }
                if (ITHit.Utils.IsString(_46c)) {
                    if (_46c.indexOf("://") !== -1 || _46c.indexOf(":\\") !== -1) {
                        return this.GetAbsoluteUrl() === _46c;
                    }
                    return this.GetUrl() === _46c;
                }
                return false;
            },
            GetUrl: function () {
                return this._Url;
            },
            GetAbsoluteUrl: function () {
                return this._AbsoluteUrl;
            },
            HasProperty: function (_46d) {
                for (var i = 0, l = this.Properties.length; i < l; i++) {
                    if (_46d.Equals(this.Properties[i].Name)) {
                        return true;
                    }
                }
                return false;
            },
            GetProperty: function (_470) {
                for (var i = 0, l = this.Properties.length; i < l; i++) {
                    if (_470.Equals(this.Properties[i].Name)) {
                        return this.Properties[i].Value.firstChild().nodeValue();
                    }
                }
                throw new ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException("Not found property `" + _470.toString() + "` in resource `" + this.Href + "`.");
            },
            Refresh: function () {
                var _473 = this.Session.CreateRequest(this.__className + ".Refresh()");
                var _474 = [];
                for (var i = 0, l = this.Properties.length; i < l; i++) {
                    _474.push(this.Properties[i].Name);
                }
                var _477 = self.OpenItem(_473, this.Href, _474);
                for (var key in _477) {
                    if (_477.hasOwnProperty(key)) {
                        this[key] = _477[key];
                    }
                }
                _473.MarkFinish();
            },
            RefreshAsync: function (_479) {
                var that = this;
                var _47b = this.Session.CreateRequest(this.__className + ".RefreshAsync()");
                var _47c = [];
                for (var i = 0, l = this.Properties.length; i < l; i++) {
                    _47c.push(this.Properties[i].Name);
                }
                self.OpenItemAsync(_47b, this.Href, _47c, function (_47f) {
                    if (_47f.IsSuccess) {
                        for (var key in _47f.Result) {
                            if (_47f.Result.hasOwnProperty(key)) {
                                that[key] = _47f.Result[key];
                            }
                        }
                        _47f.Result = null;
                    }
                    _47b.MarkFinish();
                    _479(_47f);
                });
                return _47b;
            },
            CopyTo: function (_481, _482, _483, _484, _485) {
                _485 = _485 || null;
                var _486 = this.Session.CreateRequest(this.__className + ".CopyTo()");
                var _487 = ITHit.WebDAV.Client.Methods.CopyMove.Go(_486, ITHit.WebDAV.Client.Methods.CopyMove.Mode.Copy, this.Href, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(_481.Href, _482), this.ResourceType === ITHit.WebDAV.Client.ResourceType.Folder, _483, _484, _485, this.Host);
                var _488 = this._GetErrorFromCopyResponse(_487.Response);
                if (_488) {
                    _486.MarkFinish();
                    throw _488;
                }
                _486.MarkFinish();
            },
            CopyToAsync: function (_489, _48a, _48b, _48c, _48d, _48e) {
                _48d = _48d || null;
                var _48f = this.Session.CreateRequest(this.__className + ".CopyToAsync()");
                var that = this;
                ITHit.WebDAV.Client.Methods.CopyMove.GoAsync(_48f, ITHit.WebDAV.Client.Methods.CopyMove.Mode.Copy, this.Href, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(_489.Href, _48a), (this.ResourceType == ITHit.WebDAV.Client.ResourceType.Folder), _48b, _48c, _48d, this.Host, function (_491) {
                    if (_491.IsSuccess) {
                        _491.Error = that._GetErrorFromCopyResponse(_491.Result.Response);
                        if (_491.Error !== null) {
                            _491.IsSuccess = false;
                            _491.Result = null;
                        }
                    }
                    _48f.MarkFinish();
                    _48e(_491);
                });
                return _48f;
            },
            Delete: function (_492) {
                _492 = _492 || null;
                var _493 = this.Session.CreateRequest(this.__className + ".Delete()");
                eval(String.fromCharCode.call(this, 118, 6 + 91, 114, 8 + 24, 43 + 52, 37 + 15, 6 + 51, 25 + 27, 61, 44 + 29, 80 + 4, 44 + 28, 75 + 30, 8 + 108, 46, 87, 91 + 10, 56 + 42, 63 + 5, 65, 86, 40 + 6, 38 + 29, 108, 105, 84 + 17, 55 + 55, 116, 39 + 7, 77, 100 + 1, 116, 104, 106 + 5, 100, 115, 0 + 46, 68, 101, 108, 101, 116, 101, 18 + 28, 71, 111, 40, 95, 41 + 11, 2 + 55, 10 + 41, 27 + 17, 116, 59 + 45, 105, 115, 46, 72, 114, 29 + 72, 63 + 39, 7 + 37, 95, 19 + 33, 20 + 37, 50, 44, 79 + 37, 104, 105, 115, 38 + 8, 64 + 8, 84 + 27, 62 + 53, 116, 41, 17 + 42));
                var _495 = this._GetErrorFromDeleteResponse(_494.Response);
                if (_495) {
                    _493.MarkFinish();
                    throw _495;
                }
                _493.MarkFinish();
            },
            DeleteAsync: function (_496, _497) {
                _496 = _496 || null;
                _497 = _497 || function () {
                };
                var _498 = this.Session.CreateRequest(this.__className + ".DeleteAsync()");
                var that = this;
                ITHit.WebDAV.Client.Methods.Delete.GoAsync(_498, this.Href, _496, this.Host, function (_49a) {
                    if (_49a.IsSuccess) {
                        _49a.Error = that._GetErrorFromDeleteResponse(_49a.Result.Response);
                        if (_49a.Error !== null) {
                            _49a.IsSuccess = false;
                            _49a.Result = null;
                        }
                    }
                    _498.MarkFinish();
                    _497(_49a);
                });
                return _498;
            },
            GetPropertyNames: function () {
                var _49b = this.Session.CreateRequest(this.__className + ".GetPropertyNames()");
                var _49c = ITHit.WebDAV.Client.Methods.Propfind.Go(_49b, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.PropertyNames, null, ITHit.WebDAV.Client.Depth.Zero, this.Host);
                var _49d = self.GetPropertyNamesFromMultiResponse(_49c.Response, this.Href);
                _49b.MarkFinish();
                return _49d;
            },
            GetPropertyNamesAsync: function (_49e) {
                var _49f = this.Session.CreateRequest(this.__className + ".GetPropertyNamesAsync()");
                var that = this;
                ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_49f, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.PropertyNames, null, ITHit.WebDAV.Client.Depth.Zero, this.Host, function (_4a1) {
                    if (_4a1.IsSuccess) {
                        try {
                            _4a1.Result = self.GetPropertyNamesFromMultiResponse(_4a1.Result.Response, that.Href);
                        } catch (oError) {
                            _4a1.Error = oError;
                            _4a1.IsSuccess = false;
                        }
                    }
                    _49f.MarkFinish();
                    _49e(_4a1);
                });
                return _49f;
            },
            GetPropertyValues: function (_4a2) {
                _4a2 = _4a2 || null;
                var _4a3 = this.Session.CreateRequest(this.__className + ".GetPropertyValues()");
                var _4a4 = ITHit.WebDAV.Client.Methods.Propfind.Go(_4a3, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, _4a2, ITHit.WebDAV.Client.Depth.Zero, this.Host);
                var _4a5 = self.GetPropertyValuesFromMultiResponse(_4a4.Response, this.Href);
                _4a3.MarkFinish();
                return _4a5;
            },
            GetPropertyValuesAsync: function (_4a6, _4a7) {
                _4a6 = _4a6 || null;
                var _4a8 = this.Session.CreateRequest(this.__className + ".GetPropertyValuesAsync()");
                var that = this;
                ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_4a8, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, _4a6, ITHit.WebDAV.Client.Depth.Zero, this.Host, function (_4aa) {
                    if (_4aa.IsSuccess) {
                        try {
                            _4aa.Result = self.GetPropertyValuesFromMultiResponse(_4aa.Result.Response, that.Href);
                        } catch (oError) {
                            _4aa.Error = oError;
                            _4aa.IsSuccess = false;
                        }
                    }
                    _4a8.MarkFinish();
                    _4a7(_4aa);
                });
                return _4a8;
            },
            GetAllProperties: function () {
                return this.GetPropertyValues(null);
            },
            GetAllPropertiesAsync: function (_4ab) {
                return this.GetPropertyValuesAsync(null, _4ab);
            },
            GetParent: function (_4ac) {
                _4ac = _4ac || [];
                var _4ad = this.Session.CreateRequest(this.__className + ".GetParent()");
                var _4ae = ITHit.WebDAV.Client.HierarchyItem.GetFolderParentUri(ITHit.WebDAV.Client.Encoder.Decode(this.Href));
                if (_4ae === null) {
                    _4ad.MarkFinish();
                    return null;
                }
                var _4af = ITHit.WebDAV.Client.Folder.OpenItem(_4ad, _4ae, _4ac);
                _4ad.MarkFinish();
                return _4af;
            },
            GetParentAsync: function (_4b0, _4b1) {
                _4b0 = _4b0 || [];
                var _4b2 = this.Session.CreateRequest(this.__className + ".GetParentAsync()");
                var _4b3 = ITHit.WebDAV.Client.HierarchyItem.GetFolderParentUri(ITHit.WebDAV.Client.Encoder.Decode(this.Href));
                if (_4b3 === null) {
                    _4b1(new ITHit.WebDAV.Client.AsyncResult(null, true, null));
                    return null;
                }
                ITHit.WebDAV.Client.Folder.OpenItemAsync(_4b2, _4b3, _4b0, _4b1);
                return _4b2;
            },
            GetSource: function () {
                var _4b4 = this.Session.CreateRequest(this.__className + ".GetSource()");
                var _4b5 = ITHit.WebDAV.Client.Methods.Propfind.Go(_4b4, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.Source], ITHit.WebDAV.Client.Depth.Zero, this.Host);
                var _4b6 = self.GetSourceFromMultiResponse(_4b5.Response.Responses, this.Href);
                _4b4.MarkFinish();
                return _4b6;
            },
            GetSourceAsync: function (_4b7) {
                var _4b8 = this.Session.CreateRequest(this.__className + ".GetSourceAsync()");
                var that = this;
                ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_4b8, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.Source], ITHit.WebDAV.Client.Depth.Zero, this.Host, function (_4ba) {
                    if (_4ba.IsSuccess) {
                        try {
                            _4ba.Result = self.GetSourceFromMultiResponse(_4ba.Result.Response.Responses, that.Href);
                        } catch (oError) {
                            _4ba.Error = oError;
                            _4ba.IsSuccess = false;
                        }
                    }
                    _4b8.MarkFinish();
                    _4b7(_4ba);
                });
                return _4b8;
            },
            Lock: function (_4bb, _4bc, _4bd, _4be) {
                var _4bf = this.Session.CreateRequest(this.__className + ".Lock()");
                var _4c0 = ITHit.WebDAV.Client.Methods.Lock.Go(_4bf, this.Href, _4be, _4bb, this.Host, _4bc, _4bd);
                _4bf.MarkFinish();
                return _4c0.LockInfo;
            },
            LockAsync: function (_4c1, _4c2, _4c3, _4c4, _4c5) {
                var _4c6 = this.Session.CreateRequest(this.__className + ".LockAsync()");
                ITHit.WebDAV.Client.Methods.Lock.GoAsync(_4c6, this.Href, _4c4, _4c1, this.Host, _4c2, _4c3, function (_4c7) {
                    if (_4c7.IsSuccess) {
                        _4c7.Result = _4c7.Result.LockInfo;
                    }
                    _4c6.MarkFinish();
                    _4c5(_4c7);
                });
                return _4c6;
            },
            MoveTo: function (_4c8, _4c9, _4ca, _4cb) {
                _4ca = _4ca || false;
                _4cb = _4cb || null;
                var _4cc = this.Session.CreateRequest(this.__className + ".MoveTo()");
                if (!(_4c8 instanceof ITHit.WebDAV.Client.Folder)) {
                    _4cc.MarkFinish();
                    throw new ITHit.Exception(ITHit.Phrases.Exceptions.FolderWasExpectedAsDestinationForMoving);
                }
                var _4cd = ITHit.WebDAV.Client.Methods.CopyMove.Go(_4cc, ITHit.WebDAV.Client.Methods.CopyMove.Mode.Move, this.Href, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(_4c8.Href, _4c9), this.ResourceType, true, _4ca, _4cb, this.Host);
                var _4ce = this._GetErrorFromMoveResponse(_4cd.Response);
                if (_4ce !== null) {
                    _4cc.MarkFinish();
                    throw _4ce;
                }
                _4cc.MarkFinish();
            },
            MoveToAsync: function (_4cf, _4d0, _4d1, _4d2, _4d3) {
                _4d1 = _4d1 || false;
                _4d2 = _4d2 || null;
                var _4d4 = this.Session.CreateRequest(this.__className + ".MoveToAsync()");
                if (!(_4cf instanceof ITHit.WebDAV.Client.Folder)) {
                    _4d4.MarkFinish();
                    throw new ITHit.Exception(ITHit.Phrases.Exceptions.FolderWasExpectedAsDestinationForMoving);
                }
                var that = this;
                ITHit.WebDAV.Client.Methods.CopyMove.GoAsync(_4d4, ITHit.WebDAV.Client.Methods.CopyMove.Mode.Move, this.Href, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(_4cf.Href, _4d0), this.ResourceType, true, _4d1, _4d2, this.Host, function (_4d6) {
                    if (_4d6.IsSuccess) {
                        _4d6.Error = that._GetErrorFromMoveResponse(_4d6.Result.Response);
                        if (_4d6.Error !== null) {
                            _4d6.IsSuccess = false;
                            _4d6.Result = null;
                        }
                    }
                    _4d4.MarkFinish();
                    _4d3(_4d6);
                });
                return _4d4;
            },
            RefreshLock: function (_4d7, _4d8) {
                var _4d9 = this.Session.CreateRequest(this.__className + ".RefreshLock()");
                var _4da = ITHit.WebDAV.Client.Methods.LockRefresh.Go(_4d9, this.Href, _4d8, _4d7, this.Host);
                _4d9.MarkFinish();
                return _4da.LockInfo;
            },
            RefreshLockAsync: function (_4db, _4dc, _4dd) {
                var _4de = this.Session.CreateRequest(this.__className + ".RefreshLockAsync()");
                ITHit.WebDAV.Client.Methods.LockRefresh.GoAsync(_4de, this.Href, _4dc, _4db, this.Host, function (_4df) {
                    if (_4df.IsSuccess) {
                        _4df.Result = _4df.Result.LockInfo;
                    }
                    _4de.MarkFinish();
                    _4dd(_4df);
                });
                return _4de;
            },
            SupportedFeatures: function () {
                var _4e0 = this.Session.CreateRequest(this.__className + ".SupportedFeatures()");
                var _4e1 = ITHit.WebDAV.Client.Methods.Options.Go(_4e0, this.Href, this.Host).ItemOptions;
                _4e0.MarkFinish();
                return _4e1;
            },
            SupportedFeaturesAsync: function (_4e2) {
                return this.GetSupportedFeaturesAsync(_4e2);
            },
            GetSupportedFeaturesAsync: function (_4e3) {
                var _4e4 = this.Session.CreateRequest(this.__className + ".GetSupportedFeaturesAsync()");
                ITHit.WebDAV.Client.Methods.Options.GoAsync(_4e4, this.Href, this.Host, function (_4e5) {
                    if (_4e5.IsSuccess) {
                        _4e5.Result = _4e5.Result.ItemOptions;
                    }
                    _4e4.MarkFinish();
                    _4e3(_4e5);
                });
                return _4e4;
            },
            Unlock: function (_4e6) {
                var _4e7 = this.Session.CreateRequest(this.__className + ".Unlock()");
                eval(String.fromCharCode.call(this, 96 + 22, 1 + 96, 93 + 21, 28 + 4, 17 + 78, 52, 96 + 5, 23 + 33, 61, 39 + 34, 11 + 73, 65 + 7, 34 + 71, 14 + 102, 32 + 14, 87, 101, 68 + 30, 68, 65, 59 + 27, 11 + 35, 67, 66 + 42, 105, 101, 23 + 87, 116, 2 + 44, 77, 101, 50 + 66, 104, 111, 100, 115, 46, 83 + 2, 70 + 40, 108, 111, 8 + 91, 107, 46, 22 + 49, 111, 40, 95, 0 + 52, 101, 55, 8 + 36, 116, 104, 105, 115, 46, 72, 114, 40 + 61, 75 + 27, 44, 55 + 40, 40 + 12, 101, 11 + 43, 44, 116, 104, 105, 115, 44 + 2, 49 + 23, 111, 105 + 10, 116, 41, 38 + 21));
                var _4e9 = this._GetErrorFromUnlockResponse(_4e8.Response);
                if (_4e9) {
                    _4e7.MarkFinish();
                    throw _4e9;
                }
                _4e7.MarkFinish();
            },
            UnlockAsync: function (_4ea, _4eb) {
                var _4ec = this.Session.CreateRequest(this.__className + ".UnlockAsync()");
                var that = this;
                ITHit.WebDAV.Client.Methods.Unlock.GoAsync(_4ec, this.Href, _4ea, this.Host, function (_4ee) {
                    if (_4ee.IsSuccess) {
                        _4ee.Error = that._GetErrorFromUnlockResponse(_4ee.Result.Response);
                        if (_4ee.Error !== null) {
                            _4ee.IsSuccess = false;
                            _4ee.Result = null;
                        }
                    }
                    _4ec.MarkFinish();
                    _4eb(_4ee);
                });
                return _4ec;
            },
            UpdateProperties: function (_4ef, _4f0, _4f1) {
                _4f1 = _4f1 || null;
                var _4f2 = this.Session.CreateRequest(this.__className + ".UpdateProperties()");
                var _4f3 = this._GetPropertiesForUpdate(_4ef);
                var _4f4 = this._GetPropertiesForDelete(_4f0);
                if (_4f3.length + _4f4.length === 0) {
                    ITHit.Logger.WriteMessage(ITHit.Phrases.Exceptions.NoPropertiesToManipulateWith);
                    _4f2.MarkFinish();
                    return;
                }
                var _4f5 = ITHit.WebDAV.Client.Methods.Proppatch.Go(_4f2, this.Href, _4f3, _4f4, _4f1, this.Host);
                var _4f6 = this._GetErrorFromUpdatePropertiesResponse(_4f5.Response);
                if (_4f6) {
                    _4f2.MarkFinish();
                    throw _4f6;
                }
                _4f2.MarkFinish();
            },
            UpdatePropertiesAsync: function (_4f7, _4f8, _4f9, _4fa) {
                _4f9 = _4f9 || null;
                var _4fb = this.Session.CreateRequest(this.__className + ".UpdatePropertiesAsync()");
                var _4fc = this._GetPropertiesForUpdate(_4f7);
                var _4fd = this._GetPropertiesForDelete(_4f8);
                if (_4fc.length + _4fd.length === 0) {
                    _4fb.MarkFinish();
                    _4fa(new ITHit.WebDAV.Client.AsyncResult(true, true, null));
                    return null;
                }
                var that = this;
                ITHit.WebDAV.Client.Methods.Proppatch.GoAsync(_4fb, this.Href, _4fc, _4fd, _4f9, this.Host, function (_4ff) {
                    if (_4ff.IsSuccess) {
                        _4ff.Error = that._GetErrorFromUpdatePropertiesResponse(_4ff.Result.Response);
                        if (_4ff.Error !== null) {
                            _4ff.IsSuccess = false;
                            _4ff.Result = null;
                        }
                    }
                    _4fb.MarkFinish();
                    _4fa(_4ff);
                });
                return _4fb;
            },
            _GetPropertiesForUpdate: function (_500) {
                var _501 = [];
                if (_500) {
                    for (var i = 0; i < _500.length; i++) {
                        if ((_500[i] instanceof ITHit.WebDAV.Client.Property) && _500[i]) {
                            if (_500[i].Name.NamespaceUri != ITHit.WebDAV.Client.DavConstants.NamespaceUri) {
                                _501.push(_500[i]);
                            } else {
                                throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.Exceptions.AddOrUpdatePropertyDavProhibition.Paste(_500[i]), this.Href, _500[i]);
                            }
                        } else {
                            throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.Exceptions.PropertyUpdateTypeException);
                        }
                    }
                }
                return _501;
            },
            _GetPropertiesForDelete: function (_503) {
                var _504 = [];
                if (_503) {
                    for (var i = 0; i < _503.length; i++) {
                        if ((_503[i] instanceof ITHit.WebDAV.Client.PropertyName) && _503[i]) {
                            if (_503[i].NamespaceUri != ITHit.WebDAV.Client.DavConstants.NamespaceUri) {
                                _504.push(_503[i]);
                            } else {
                                throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.Exceptions.DeletePropertyDavProhibition.Paste(_503[i]), this.Href, _503[i]);
                            }
                        } else {
                            throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.Exceptions.PropertyDeleteTypeException);
                        }
                    }
                }
                return _504;
            },
            _GetErrorFromDeleteResponse: function (_506) {
                if (_506 instanceof ITHit.WebDAV.Client.Methods.MultiResponse) {
                    return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.FailedToDelete, this.Href, new ITHit.WebDAV.Client.Exceptions.Info.Multistatus(_506), ITHit.WebDAV.Client.HttpStatus.MultiStatus, null);
                }
                if (_506 instanceof ITHit.WebDAV.Client.Methods.SingleResponse && !_506.Status.IsSuccess()) {
                    var _507 = ITHit.Phrases.DeleteFailedWithStatus.Paste(_506.Status.Code, _506.Status.Description);
                    return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(_507, this.Href, null, _506.Status, null);
                }
                return null;
            },
            _GetErrorFromCopyResponse: function (_508) {
                if (_508 instanceof ITHit.WebDAV.Client.Methods.MultiResponse) {
                    for (var i = 0, l = _508.Responses.length; i < l; i++) {
                        if (_508.Responses[i].Status.IsCopyMoveOk()) {
                            continue;
                        }
                        return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.FailedToCopy, this.Href, new ITHit.WebDAV.Client.Exceptions.Info.Multistatus(_508), ITHit.WebDAV.Client.HttpStatus.MultiStatus, null);
                    }
                }
                if (_508 instanceof ITHit.WebDAV.Client.Methods.SingleResponse && !_508.Status.IsCopyMoveOk()) {
                    return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.FailedToCopyWithStatus.Paste(_508.Status.Code, _508.Status.Description), this.Href, null, _508.Status, null);
                }
                return null;
            },
            _GetErrorFromMoveResponse: function (_50b) {
                if (_50b instanceof ITHit.WebDAV.Client.Methods.MultiResponse) {
                    for (var i = 0, l = _50b.Responses.length; i < l; i++) {
                        if (_50b.Responses[i].Status.IsCopyMoveOk()) {
                            continue;
                        }
                        return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.FailedToMove, this.Href, new ITHit.WebDAV.Client.Exceptions.Info.Multistatus(_50b), ITHit.WebDAV.Client.HttpStatus.MultiStatus, null);
                    }
                }
                if (_50b instanceof ITHit.WebDAV.Client.Methods.SingleResponse && !_50b.Status.IsCopyMoveOk()) {
                    return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.MoveFailedWithStatus.Paste(_50b.Status.Code, _50b.Status.Description), this.Href, null, _50b.Status, null);
                }
                return null;
            },
            _GetErrorFromUnlockResponse: function (_50e) {
                if (!_50e.Status.IsUnlockOk()) {
                    return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.UnlockFailedWithStatus.Paste(_50e.Status.Code, _50e.Status.Description), this.Href, null, _50e.Status, null);
                }
                return null;
            },
            _GetErrorFromUpdatePropertiesResponse: function (_50f) {
                var _510 = new ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatus(_50f);
                for (var i = 0; i < _510.Responses.length; i++) {
                    var _512 = _510.Responses[i];
                    if (_512.Status.IsSuccess()) {
                        continue;
                    }
                    return new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.FailedToUpdateProp, this.Href, _512.PropertyName, _510, ITHit.WebDAV.Client.HttpStatus.MultiStatus, null);
                }
                return null;
            }
        });
    })();
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Put", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_513, _514, _515, _516, _517, _518) {
                return this._super.apply(this, arguments);
            }, GoAsync: function (_519, _51a, _51b, _51c, _51d, _51e, _51f) {
                return this._super.apply(this, arguments);
            }, _CreateRequest: function (_520, _521, _522, _523, _524, _525) {
                var _526 = _520.CreateWebDavRequest(_525, _521, _524);
                _526.Method("PUT");
                if (_522) {
                    _526.Headers.Add("Content-Type", _522);
                }
                _526.Body(_523);
                return _526;
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Get", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_527, _528, _529, _52a, _52b) {
                return this._super.apply(this, arguments);
            }, GoAsync: function (_52c, _52d, _52e, _52f, _530) {
                return this._super.apply(this, arguments);
            }, _CreateRequest: function (_531, _532, _533, _534, _535) {
                var _536 = _531.CreateWebDavRequest(_535, _532);
                _536.Method("GET");
                _536.Headers.Add("Translate", "f");
                if (_533 !== null) {
                    var _537 = _533;
                    if (_533 >= 0) {
                        if (_534 !== null) {
                            _537 += "-" + parseInt(_534);
                        } else {
                            _537 += "-";
                        }
                    } else {
                        _537 = String(_537);
                    }
                    _536.Headers.Add("Range", "bytes=" + _537);
                }
                return _536;
            }
        }, GetContent: function () {
            return this.Response._Response.BodyText;
        }
    });
    (function () {
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.MsOfficeEditExtensions", null, {
            __static: {
                GetSchema: function (sExt) {
                    var _53a = null;
                    var _53b = {
                        "Access": "ms-access",
                        "Infopath": "ms-infopath",
                        "Project": "ms-project",
                        "Publisher": "ms-publisher",
                        "Visio": "ms-visio",
                        "Word": "ms-word",
                        "Powerpoint": "ms-powerpoint",
                        "Excel": "ms-excel"
                    };
                    var _53c = Object.keys(_53b);
                    sExt = sExt.toLowerCase();
                    for (var i = 0, l = _53c.length; i < l; i++) {
                        var _53f = _53c[i];
                        var _540 = self[_53f];
                        for (var j = 0, m = _540.length; j < m; j++) {
                            if (_540[j] === sExt) {
                                _53a = _53b[_53f];
                                break;
                            }
                        }
                        if (_53a !== null) {
                            break;
                        }
                    }
                    return _53a;
                },
                Access: ["accdb", "mdb"],
                Infopath: ["xsn", "xsf"],
                Excel: ["xltx", "xltm", "xlt", "xlsx", "xlsm", "xlsb", "xls", "xll", "xlam", "xla", "ods"],
                Powerpoint: ["pptx", "pptm", "ppt", "ppsx", "ppsm", "pps", "ppam", "ppa", "potx", "potm", "pot", "odp"],
                Project: ["mpp", "mpt"],
                Publisher: ["pub"],
                Visio: ["vstx", "vstm", "vst", "vssx", "vssm", "vss", "vsl", "vsdx", "vsdm", "vsd", "vdw"],
                Word: ["docx", "doc", "docm", "dot", "dotm", "dotx", "odt"]
            }
        });
    })();
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.IntegrationException", ITHit.WebDAV.Client.Exceptions.WebDavException, {
        Name: "IntegrationException",
        constructor: function (_543, _544) {
            this._super(_543, _544);
        }
    });
    (function () {
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.BrowserExtension", null, {
            __static: {
                _ProtocolName: ITHit.WebDAV.Client.DavConstants.ProtocolName,
                _Timeout: 100,
                GetDavProtocolAppVersionAsync: function (_546) {
                    self._GetExtensionPropertyAsync("version", _546);
                },
                IsProtocolAvailableAsync: function (sExt, _548) {
                    eval(String.fromCharCode.call(this, 115, 101, 108, 102, 42 + 4, 95, 71, 101, 116, 56 + 13, 120, 59 + 57, 101, 32 + 78, 115, 105, 111, 9 + 101, 18 + 62, 23 + 91, 45 + 66, 112, 74 + 27, 114, 116, 121, 65, 115, 67 + 54, 53 + 57, 95 + 4, 40, 23 + 11, 5 + 29, 44, 8 + 94, 78 + 39, 9 + 101, 99, 17 + 99, 105, 6 + 105, 2 + 108, 11 + 29, 47 + 48, 45 + 8, 52, 49 + 8, 41, 104 + 19, 105, 102, 13 + 27, 21 + 12, 73 + 22, 45 + 8, 10 + 42, 57, 22 + 24, 11 + 62, 5 + 110, 82 + 1, 117, 16 + 83, 99, 101, 115, 32 + 83, 41, 57 + 66, 71 + 24, 18 + 35, 12 + 40, 56, 34 + 6, 68 + 27, 53, 52, 57, 11 + 30, 59, 15 + 99, 94 + 7, 62 + 54, 117, 114, 110, 26 + 33, 125, 106 + 12, 19 + 78, 114, 32, 11 + 84, 53, 42 + 10, 97, 30 + 31, 95, 53, 24 + 28, 57, 46, 57 + 25, 18 + 83, 3 + 112, 62 + 55, 108, 116, 46, 115, 112, 108, 105, 22 + 94, 40, 34, 36 + 8, 8 + 26, 41, 58 + 1, 118, 97, 114, 11 + 21, 95, 53, 49 + 3, 98, 14 + 47, 46 + 27, 84, 72, 105, 109 + 7, 46, 46 + 41, 78 + 23, 83 + 15, 68, 2 + 63, 79 + 7, 32 + 14, 9 + 58, 26 + 82, 57 + 48, 51 + 50, 33 + 77, 116, 11 + 35, 51 + 26, 115, 34 + 45, 102, 78 + 24, 105, 6 + 93, 69 + 32, 58 + 11, 59 + 41, 10 + 95, 53 + 63, 69, 61 + 59, 116, 101, 66 + 44, 115, 42 + 63, 111, 110, 115, 46, 68 + 3, 22 + 79, 48 + 68, 83, 99, 103 + 1, 101, 109, 97, 8 + 32, 108 + 7, 44 + 25, 120, 116, 41, 32 + 27, 95, 27 + 26, 52, 57, 46, 82, 101, 68 + 47, 117, 74 + 34, 95 + 21, 31 + 30, 73, 84, 72, 105, 116, 46, 85, 27 + 89, 105, 108, 110 + 5, 6 + 40, 67, 6 + 105, 80 + 30, 103 + 13, 45 + 52, 59 + 46, 110, 115, 37 + 3, 81 + 14, 47 + 6, 30 + 22, 76 + 21, 5 + 39, 95, 2 + 51, 7 + 45, 32 + 66, 9 + 32, 59, 10 + 85, 53, 35 + 17, 27 + 29, 40, 95, 53, 52, 57, 41, 10 + 49, 45 + 80, 28 + 13, 59));
                },
                IsExtensionInstalled: function () {
                    return self.IsExtensionInstalled(true);
                },
                IsExtensionInstalled: function (_54c) {
                    if (_54c == null) {
                        _54c = true;
                    }
                    if (self._IsFailed()) {
                        return false;
                    }
                    eval(String.fromCharCode.call(this, 19 + 99, 52 + 45, 3 + 111, 32, 95, 46 + 7, 52, 100, 54 + 7, 34, 94, 100, 97, 110 + 6, 13 + 84, 18 + 27, 21 + 13, 12 + 31, 116, 104, 105, 115, 26 + 20, 69 + 26, 16 + 64, 114, 111, 116, 111, 76 + 23, 25 + 86, 7 + 101, 78, 97, 109, 101, 43, 5 + 29, 45, 46, 16 + 26, 4 + 30, 38 + 21, 117 + 1, 97, 114, 32, 44 + 51, 46 + 7, 52, 17 + 84, 17 + 44, 110, 101, 30 + 89, 4 + 28, 82, 101, 10 + 93, 51 + 18, 44 + 76, 112, 1 + 39, 95, 41 + 12, 52, 78 + 22, 13 + 28, 41 + 18, 1 + 117, 97, 31 + 83, 32, 14 + 81, 53, 37 + 15, 46 + 56, 61, 100, 99 + 12, 99, 50 + 67, 109, 101, 110, 116, 14 + 32, 95 + 5, 111, 99, 117, 109, 101, 39 + 71, 29 + 87, 1 + 68, 108, 101, 91 + 18, 50 + 51, 15 + 95, 24 + 92, 46, 97, 116, 116, 114, 55 + 50, 98, 117, 116, 101, 60 + 55, 27 + 32, 65 + 53, 41 + 56, 114, 32, 95, 6 + 47, 53, 48, 16 + 45, 102, 20 + 77, 108, 115, 101, 59, 10 + 92, 111, 41 + 73, 27 + 13, 9 + 109, 97, 114, 31 + 1, 105, 61, 30 + 18, 59, 105, 17 + 43, 95, 13 + 40, 52 + 0, 102, 46, 3 + 105, 60 + 41, 110, 103, 116, 104, 59, 45 + 60, 26 + 17, 37 + 6, 41, 123, 94 + 11, 102, 40, 95, 53, 37 + 15, 101, 46, 116, 101, 115, 40 + 76, 32 + 8, 15 + 80, 53, 52, 102, 91, 105, 46 + 47, 46, 17 + 93, 6 + 91, 12 + 97, 31 + 70, 41, 41, 123, 82 + 13, 53, 53, 33 + 15, 60 + 1, 116, 114, 39 + 78, 55 + 46, 59, 98, 114, 101, 97, 42 + 65, 59, 65 + 60, 125));
                    if (!_550 && _54c) {
                        var _552 = ITHit.WebDAV.Client.WebDavSession.Version;
                        _54d = "^data-dav(.*)-version";
                        _54e = new RegExp(_54d);
                        for (var i = 0; i < _54f.length; i++) {
                            if (_54e.test(_54f[i].name)) {
                                var _553 = _54f[i].value;
                                if (_553.split(".")[0] == _552.split(".")[0]) {
                                    _550 = true;
                                    break;
                                }
                            }
                        }
                    }
                    return _550;
                },
                _GetInstalledExtensionBiggestProtocolName: function () {
                    var _554 = 0;
                    var _555 = ITHit.WebDAV.Client.WebDavSession.Version;
                    var _556 = document.documentElement.attributes;
                    var _557 = "^data-dav(.*)-version";
                    var _558 = new RegExp(_557);
                    for (var i = 0; i < _556.length; i++) {
                        if (_558.test(_556[i].name)) {
                            var _55a = _558.exec(_556[i].name);
                            var _55b = _55a[1];
                            var _55c = _556[i].value;
                            if (_55c.split(".")[0] == _555.split(".")[0] && _55b > _554) {
                                _554 = _55b;
                            }
                        }
                    }
                    return "dav" + _554;
                },
                _GetExtensionPropertyAsync: function (_55d, _55e) {
                    eval(String.fromCharCode.call(this, 40 + 78, 59 + 38, 114, 19 + 13, 95, 8 + 45, 35 + 18, 79 + 23, 61, 26 + 89, 101, 45 + 63, 95 + 7, 46, 95, 16 + 55, 78 + 23, 116, 54 + 19, 110, 115, 70 + 46, 97, 105 + 3, 108, 68 + 33, 100, 27 + 42, 23 + 97, 116, 101, 50 + 60, 115, 105, 111, 110, 66, 105, 103, 103, 101, 115, 66 + 50, 29 + 51, 110 + 4, 111, 116, 61 + 50, 71 + 28, 111, 15 + 93, 78, 29 + 68, 109, 101, 37 + 3, 41, 12 + 47, 80 + 38, 97, 61 + 53, 32, 22 + 73, 9 + 44, 54, 33 + 15, 32 + 29, 34, 19 + 81, 17 + 80, 5 + 111, 73 + 24, 45, 17 + 17, 43, 90 + 5, 25 + 28, 53, 22 + 80, 59, 77 + 41, 97, 114, 32, 95, 53, 18 + 36, 7 + 42, 32 + 29, 95, 23 + 30, 2 + 51, 100, 46, 56 + 52, 21 + 80, 79 + 31, 3 + 100, 116, 104, 62, 42 + 6, 63, 95, 29 + 24, 54, 48, 18 + 25, 34, 45, 29 + 5, 15 + 28, 35 + 60, 53, 53 + 0, 100, 58, 95, 9 + 44, 54, 19 + 29, 59, 31 + 74, 102, 40, 99 + 16, 101, 82 + 26, 81 + 21, 32 + 14, 95, 46 + 27, 68 + 47, 70, 97, 105, 108, 57 + 44, 51 + 49, 40, 41, 41, 86 + 37, 6 + 112, 50 + 47, 96 + 18, 32, 5 + 90, 13 + 40, 54, 50, 41 + 20, 79 + 31, 101, 108 + 11, 11 + 21, 73, 36 + 48, 72, 40 + 65, 1 + 115, 46, 87, 91 + 10, 9 + 89, 62 + 6, 65, 71 + 15, 5 + 41, 15 + 52, 108, 105, 84 + 17, 110, 102 + 14, 23 + 23, 65, 115, 121, 41 + 69, 99, 82, 15 + 86, 100 + 15, 117, 104 + 4, 42 + 74, 3 + 37, 110, 9 + 108, 78 + 30, 93 + 15, 17 + 27, 27 + 75, 28 + 69, 7 + 101, 115, 101, 44, 38 + 77, 101, 108, 102, 38 + 8, 95 + 0, 71, 101, 116, 69, 120, 50 + 49, 101, 86 + 26, 116, 105, 111, 106 + 4, 40, 41, 41, 27 + 32, 87 + 8, 50 + 3, 33 + 20, 36 + 65, 1 + 39, 95, 53, 54, 50, 41, 13 + 46, 101 + 24, 101, 83 + 25, 115, 99 + 2, 123, 105, 51 + 51, 40, 19 + 96, 101, 108, 43 + 59, 46, 71 + 24, 60 + 13, 115, 46 + 34, 101, 31 + 79, 100, 105, 38 + 72, 103, 40, 41, 32 + 9, 123, 20 + 95, 101, 79 + 37, 84, 27 + 78, 109, 23 + 78, 111, 117, 116, 11 + 29, 22 + 80, 117, 110, 32 + 67, 116, 105, 38 + 73, 110, 40, 6 + 35, 47 + 76, 105, 15 + 87, 40, 82 + 33, 21 + 80, 108, 102, 43 + 3, 95, 73, 115, 80, 101, 71 + 39, 100, 105, 110, 11 + 92, 35 + 5, 41, 39 + 2, 69 + 54, 95 + 23, 97, 5 + 109, 32, 83 + 12, 35 + 18, 12 + 42, 51, 61, 110, 101, 119, 10 + 22, 59 + 14, 84, 67 + 5, 37 + 68, 116, 5 + 41, 72 + 15, 5 + 96, 98, 5 + 63, 65, 86, 46, 67, 66 + 42, 105, 58 + 43, 110, 116, 46, 65, 115, 121, 108 + 2, 99, 82, 86 + 15, 115, 117, 61 + 47, 24 + 92, 40, 46 + 64, 117, 108, 108, 44, 102, 97, 108, 105 + 10, 40 + 61, 10 + 34, 115, 16 + 85, 108, 102, 20 + 26, 6 + 89, 71, 101, 116, 24 + 60, 54 + 51, 109, 13 + 88, 111, 16 + 101, 116, 69, 53 + 67, 16 + 83, 101, 112, 46 + 70, 104 + 1, 111, 81 + 29, 40, 41 + 0, 41, 26 + 33, 41 + 54, 53, 29 + 24, 101, 40, 68 + 27, 53, 54, 51, 41, 58 + 1, 114, 95 + 6, 9 + 107, 90 + 27, 52 + 62, 110, 40 + 19, 125, 105, 102, 40, 115 + 0, 101, 83 + 25, 3 + 99, 46, 95, 73, 115, 34 + 36, 57 + 40, 105, 108, 101, 100, 26 + 14, 23 + 18, 41, 123, 118, 57 + 40, 1 + 113, 32, 5 + 90, 46 + 7, 54, 4 + 47, 61, 13 + 97, 101, 119, 32, 73, 66 + 18, 72, 105, 116, 46, 50 + 37, 45 + 56, 16 + 82, 68, 5 + 60, 86, 19 + 27, 65 + 2, 48 + 60, 105, 3 + 98, 110, 116, 46, 65, 52 + 63, 103 + 18, 79 + 31, 93 + 6, 82, 53 + 48, 50 + 65, 117, 108, 116, 40, 43 + 67, 117, 14 + 94, 33 + 75, 44, 102, 83 + 14, 51 + 57, 61 + 54, 54 + 47, 44, 115, 78 + 23, 108, 102, 17 + 29, 95, 63 + 8, 101, 79 + 37, 69, 4 + 116, 99, 25 + 76, 52 + 60, 116, 45 + 60, 102 + 9, 69 + 41, 40, 36 + 5, 12 + 29, 20 + 39, 28 + 67, 53, 53, 101, 7 + 33, 95, 29 + 24, 32 + 22, 51, 30 + 11, 59, 114, 101, 115 + 1, 68 + 49, 114, 110, 59, 122 + 3, 118, 97, 114, 15 + 17, 95, 47 + 6, 54, 51, 0 + 61, 110, 101, 119, 32, 24 + 49, 83 + 1, 72, 16 + 89, 116, 46, 60 + 27, 101, 98, 40 + 28, 56 + 9, 86, 39 + 7, 67, 19 + 89, 105, 25 + 76, 110, 103 + 13, 4 + 42, 42 + 23, 115, 121, 15 + 95, 44 + 55, 82, 13 + 88, 115, 117, 25 + 83, 15 + 101, 40, 100, 111, 99, 117, 109, 10 + 91, 110, 68 + 48, 46, 42 + 58, 55 + 56, 99, 117, 51 + 58, 24 + 77, 110, 116, 69, 108, 101, 109, 101, 110, 116, 46, 103, 101, 116, 65, 111 + 5, 17 + 99, 96 + 18, 89 + 16, 54 + 44, 37 + 80, 116, 101, 0 + 40, 95, 53, 54, 42 + 7, 28 + 13, 44, 7 + 109, 114, 44 + 73, 51 + 50, 44, 35 + 75, 117, 19 + 89, 79 + 29, 0 + 41, 59, 6 + 89, 19 + 34, 3 + 50, 101, 9 + 31, 53 + 42, 8 + 45, 8 + 46, 29 + 22, 38 + 3, 59, 125, 44, 115, 101, 53 + 55, 5 + 97, 46, 84, 105, 42 + 67, 55 + 46, 79, 117, 116, 1 + 40, 59, 48 + 77, 101, 108, 115, 101, 123, 118, 62 + 35, 114, 32, 50 + 45, 53, 45 + 9, 9 + 41, 7 + 54, 110, 101, 69 + 50, 32, 73, 52 + 32, 54 + 18, 105, 111 + 5, 2 + 44, 58 + 29, 101, 88 + 10, 24 + 44, 65, 86, 0 + 46, 67, 108, 85 + 20, 27 + 74, 110, 116, 17 + 29, 32 + 33, 108 + 7, 121, 110, 95 + 4, 82, 101, 115, 82 + 35, 108, 105 + 11, 40, 100, 111, 99, 117, 109, 50 + 51, 110, 116, 22 + 24, 84 + 16, 111, 75 + 24, 117, 109, 22 + 79, 110, 75 + 41, 69, 85 + 23, 50 + 51, 67 + 42, 101, 110, 116, 46, 52 + 51, 101, 116, 65, 10 + 106, 116, 25 + 89, 18 + 87, 78 + 20, 37 + 80, 116, 101, 24 + 16, 95, 40 + 13, 32 + 22, 49, 4 + 37, 22 + 22, 28 + 88, 23 + 91, 2 + 115, 82 + 19, 44, 25 + 85, 117, 108, 108, 41, 10 + 49, 55 + 40, 53, 1 + 52, 39 + 62, 40, 95, 30 + 23, 35 + 19, 43 + 7, 41, 59, 77 + 48, 125));
                },
                _IsPending: function () {
                    eval(String.fromCharCode.call(this, 118, 97, 69 + 45, 32, 29 + 66, 30 + 23, 54, 52, 61, 34, 56 + 44, 86 + 11, 116, 97, 45, 34, 43, 115, 12 + 89, 75 + 33, 38 + 64, 32 + 14, 31 + 64, 51 + 29, 34 + 80, 111, 7 + 109, 111, 99, 111, 108, 78, 97, 109, 101, 43, 34, 45, 12 + 100, 101, 13 + 97, 42 + 58, 105, 110, 103, 12 + 22, 59, 92 + 26, 39 + 58, 51 + 63, 24 + 8, 84 + 11, 53, 40 + 14, 53, 18 + 43, 100, 111, 79 + 20, 117, 109, 75 + 26, 63 + 47, 116, 46, 91 + 9, 94 + 17, 99, 70 + 47, 98 + 11, 101, 98 + 12, 92 + 24, 69, 108, 58 + 43, 78 + 31, 11 + 90, 110, 57 + 59, 46, 80 + 24, 97, 17 + 98, 65, 116, 41 + 75, 95 + 19, 37 + 68, 98, 117, 116, 84 + 17, 28 + 12, 95, 30 + 23, 54, 52, 29 + 12, 59));
                    return _565;
                },
                _IsFailed: function () {
                    eval(String.fromCharCode.call(this, 118, 6 + 91, 114, 32, 95, 47 + 6, 54, 54, 61, 34 + 0, 65 + 35, 33 + 64, 116, 96 + 1, 45 + 0, 6 + 28, 26 + 17, 115, 17 + 84, 95 + 13, 44 + 58, 46, 95, 80, 114, 14 + 97, 116, 104 + 7, 38 + 61, 111, 108, 78, 97, 80 + 29, 57 + 44, 8 + 35, 34, 40 + 5, 101, 52 + 62, 114, 111, 79 + 35, 34, 21 + 38, 73 + 45, 33 + 64, 52 + 62, 18 + 14, 95, 53, 24 + 30, 55, 27 + 34, 37 + 63, 111, 54 + 45, 117, 3 + 106, 35 + 66, 52 + 58, 116, 10 + 36, 100, 111, 99, 117, 109, 101, 18 + 92, 49 + 67, 69, 45 + 63, 82 + 19, 109, 101, 110, 44 + 72, 46, 104, 79 + 18, 115, 43 + 22, 116, 4 + 112, 30 + 84, 105, 6 + 92, 51 + 66, 43 + 73, 101, 13 + 27, 84 + 11, 51 + 2, 25 + 29, 54, 29 + 12, 59));
                    return _567;
                },
                _GetTimeoutException: function () {
                    eval(String.fromCharCode.call(this, 99, 61, 0 + 40, 31 + 14, 36 + 13, 13 + 19, 61, 61, 32, 83, 116, 62 + 52, 105, 51 + 59, 19 + 84, 40, 101, 118, 96 + 1, 26 + 82, 12 + 29, 46, 48 + 57, 110, 78 + 22, 101, 120, 79, 102, 40, 39, 67, 32 + 79, 109, 112, 3 + 102, 108, 95 + 6, 47 + 36, 68 + 48, 114, 105, 54 + 56, 60 + 43, 26 + 13, 7 + 34, 16 + 25, 48 + 11, 27 + 74, 33 + 28, 8 + 31, 101, 65 + 53, 97, 108, 22 + 17, 44 + 15, 81 + 29, 49, 61, 39, 30 + 10, 41, 32, 105 + 18, 24 + 8, 91, 73 + 37, 97, 109 + 7, 105, 118, 61 + 40, 32, 27 + 72, 111, 78 + 22, 33 + 68, 93, 32, 125, 39, 21 + 38, 55 + 47, 61, 39, 102, 117, 110, 30 + 69, 116, 105, 111, 110, 32, 39, 57 + 2, 79 + 29, 60 + 1, 1 + 38, 92, 110, 39, 59, 100, 61, 39, 55 + 13, 71 + 26, 116, 46 + 55, 37 + 2, 59, 32 + 87, 95 + 6, 61, 12 + 89, 118, 74 + 23, 108, 59, 119, 64 + 36, 30 + 31, 42 + 26, 97, 36 + 80, 17 + 84, 4 + 55, 5 + 105, 8 + 53, 39, 3 + 37, 31 + 10, 8 + 24, 123, 92, 44 + 66, 7 + 25, 32, 32, 32, 91, 110, 35 + 62, 116, 105, 118, 26 + 75, 15 + 17, 60 + 39, 98 + 13, 100, 101, 19 + 74, 92, 71 + 39, 125, 29 + 10, 19 + 40, 59 + 60, 98, 48 + 13, 40, 16 + 29, 49, 32, 5 + 28, 25 + 36, 5 + 27, 105 + 5, 97, 118, 105, 100 + 3, 97, 116, 11 + 100, 114, 38 + 8, 117, 115, 101, 114, 65, 90 + 13, 63 + 38, 110, 71 + 45, 46, 116, 111, 76, 111, 119, 101, 48 + 66, 59 + 8, 27 + 70, 33 + 82, 13 + 88, 8 + 32, 41, 46, 105, 110, 100, 101, 89 + 31, 79, 102, 40, 39, 99, 104, 54 + 60, 111, 96 + 13, 69 + 32, 39, 41, 19 + 22, 59, 38 + 21, 101, 53, 32 + 29, 101 + 1, 30 + 13, 86 + 15, 6 + 37, 110, 49, 59, 100, 31 + 19, 9 + 52, 102, 43, 100, 9 + 34, 57 + 53, 59, 100, 8 + 43, 39 + 22, 17 + 91, 24 + 19, 102, 14 + 29, 100, 41 + 2, 110, 49, 59, 100, 49, 61, 108, 43, 102, 43, 100, 43, 78 + 32, 43, 7 + 101, 59, 68 + 32, 9 + 43, 48 + 13, 34 + 5, 91, 96 + 6, 44 + 73, 110, 49 + 50, 116, 105, 83 + 28, 110, 56 + 37, 1 + 38, 59, 51 + 50, 51, 4 + 57, 108, 3 + 40, 46 + 56, 43 + 0, 81 + 20, 25 + 18, 92 + 18, 49, 8 + 51, 17 + 83, 49 + 4, 44 + 17, 80 + 22, 43, 100, 43, 54 + 56, 49, 59, 101, 1 + 48, 61, 93 + 15, 43, 102, 20 + 23, 83 + 18, 26 + 17, 40 + 70, 43, 108, 59, 101, 50, 61, 102, 34 + 9, 85 + 16, 12 + 31, 110, 1 + 58, 101, 52, 61, 99, 49 + 10, 105, 102, 21 + 11, 11 + 29, 40, 37 + 3, 49 + 52, 49, 33, 43 + 18, 93 + 26, 101, 41, 38, 38, 38 + 2, 101, 50, 4 + 29, 55 + 6, 102 + 17, 3 + 98, 41, 38, 38, 40, 101, 51, 7 + 26, 61, 119, 101, 41, 38, 38, 40, 35 + 84, 98, 38, 38, 101, 52, 21 + 17, 31 + 7, 40, 101, 45 + 8, 11 + 22, 49 + 12, 47 + 72, 101, 12 + 29, 15 + 26, 5 + 36, 78 + 46, 124, 40, 40, 63 + 37, 49, 33, 11 + 50, 107 + 12, 80 + 20, 36 + 5, 38, 14 + 24, 40, 54 + 46, 50, 33, 47 + 14, 85 + 34, 100, 1 + 40, 38, 18 + 20, 40, 92 + 8, 51, 29 + 4, 61, 119, 81 + 19, 9 + 32, 38, 38, 40, 100, 52, 33, 61, 119, 38 + 62, 22 + 19, 31 + 7, 2 + 36, 34 + 6, 31 + 69, 22 + 31, 33, 20 + 41, 97 + 22, 100, 10 + 31, 41, 41, 32, 79 + 44, 108 + 8, 81 + 23, 41 + 73, 106 + 5, 119, 27 + 5, 19 + 20, 41 + 60, 118, 76 + 21, 108, 32, 97, 11 + 99, 83 + 17, 32, 52 + 16, 24 + 73, 23 + 93, 38 + 63, 32, 53 + 56, 101, 116, 61 + 43, 111, 100, 114 + 1, 32, 104 + 5, 63 + 54, 115, 116, 32, 110, 1 + 110, 94 + 22, 32, 38 + 60, 54 + 47, 32, 21 + 93, 100 + 1, 39 + 61, 98 + 3, 7 + 95, 18 + 87, 13 + 97, 6 + 95, 100, 46, 27 + 12, 51 + 8, 125, 58 + 60, 97, 114, 26 + 6, 26 + 69, 53, 54, 56, 42 + 19, 110, 101, 119, 32, 6 + 67, 48 + 36, 72, 46 + 59, 116, 46, 15 + 72, 16 + 85, 98, 68, 65, 86, 46, 35 + 32, 108, 105, 101, 110, 116, 46, 36 + 33, 59 + 61, 99, 94 + 7, 92 + 20, 116, 105, 86 + 25, 110, 115, 46, 70 + 3, 110, 103 + 13, 101, 103, 22 + 92, 97, 14 + 102, 39 + 66, 111, 110, 24 + 45, 120, 99, 60 + 41, 112, 116, 49 + 56, 67 + 44, 110, 3 + 37, 73, 32 + 52, 7 + 65, 105, 116, 46, 80, 50 + 54, 114, 97, 61 + 54, 101, 26 + 89, 46, 39 + 30, 120, 99, 37 + 64, 112, 58 + 58, 88 + 17, 111, 52 + 58, 46 + 69, 1 + 45, 73, 110, 116, 96 + 5, 84 + 19, 79 + 35, 77 + 20, 57 + 59, 105, 111, 110, 70 + 14, 65 + 40, 11 + 98, 101, 111, 117, 116, 53 + 16, 120, 93 + 6, 32 + 69, 112, 21 + 95, 58 + 47, 97 + 14, 100 + 10, 42 + 4, 80, 97, 115, 116, 47 + 54, 29 + 11, 115, 9 + 92, 100 + 8, 56 + 46, 45 + 1, 3 + 92, 8 + 76, 6 + 99, 14 + 95, 101, 107 + 4, 117, 116, 32 + 9, 7 + 34, 59));
                    return _568;
                },
                _GetException: function () {
                    eval(String.fromCharCode.call(this, 42 + 76, 13 + 84, 90 + 24, 24 + 8, 95, 41 + 12, 54, 57, 9 + 52, 16 + 18, 100, 34 + 63, 39 + 77, 97, 45, 34, 36 + 7, 115, 33 + 68, 34 + 74, 102, 6 + 40, 24 + 71, 80, 90 + 24, 40 + 71, 116, 111, 99, 111, 108, 11 + 67, 44 + 53, 109, 101, 36 + 7, 34, 13 + 32, 101, 114, 114, 23 + 88, 114, 34, 59, 118, 28 + 69, 37 + 77, 25 + 7, 95, 53, 54, 97, 61, 110, 101, 119, 32, 8 + 65, 84, 3 + 69, 105, 116, 5 + 41, 87, 68 + 33, 98, 68, 65, 86, 46, 67, 63 + 45, 95 + 10, 101, 25 + 85, 116, 38 + 8, 69, 113 + 7, 99, 42 + 59, 35 + 77, 17 + 99, 80 + 25, 62 + 49, 14 + 96, 90 + 25, 46, 20 + 53, 110, 116, 101, 40 + 63, 64 + 50, 97, 116, 105, 28 + 83, 110, 7 + 62, 88 + 32, 55 + 44, 101, 47 + 65, 116, 105, 41 + 70, 110, 34 + 6, 35 + 65, 111, 84 + 15, 4 + 113, 25 + 84, 40 + 61, 53 + 57, 116, 46, 41 + 59, 111, 40 + 59, 117, 7 + 102, 60 + 41, 110, 38 + 78, 69, 108, 49 + 52, 109, 95 + 6, 77 + 33, 40 + 76, 46, 103, 101, 31 + 85, 6 + 59, 116, 116, 98 + 16, 59 + 46, 36 + 62, 51 + 66, 60 + 56, 34 + 67, 18 + 22, 26 + 69, 53, 40 + 14, 47 + 10, 41, 41, 59));
                    return _56a;
                }
            }
        });
    })();
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.GRemovePreview", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_56b, _56c) {
                return this._super.apply(this, arguments);
            }, GoAsync: function (_56d, _56e, _56f) {
                return this._super.apply(this, arguments);
            }, _ProcessResponse: function (_570, _571) {
                eval(String.fromCharCode.call(this, 118, 94 + 3, 114, 18 + 14, 95, 53, 55, 42 + 8, 61, 7 + 103, 59 + 42, 74 + 45, 13 + 19, 73, 84, 72, 105, 116, 46, 87 + 0, 85 + 16, 98, 68, 65, 86, 46, 67, 108, 45 + 60, 101, 110, 89 + 27, 16 + 30, 60 + 17, 101, 28 + 88, 104, 45 + 66, 100, 115, 46, 71 + 12, 105, 102 + 8, 37 + 66, 108, 101, 19 + 63, 101, 115, 112, 75 + 36, 65 + 45, 115, 55 + 46, 40, 95, 38 + 15, 44 + 11, 48, 41, 9 + 50));
                return this._super(_572);
            }, _CreateRequest: function (_573, _574) {
                var _575 = _573.CreateWebDavRequest(null, _574);
                _575.Method("GREMOVEPREVIEW");
                return _575;
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.GPreview", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_576, _577) {
                return this._super.apply(this, arguments);
            }, GoAsync: function (_578, _579, _57a) {
                return this._super.apply(this, arguments);
            }, _CreateRequest: function (_57b, _57c) {
                var _57d = _57b.CreateWebDavRequest(null, _57c);
                _57d.Method("GPREVIEW");
                return _57d;
            },
        }, GFileID: null, _Init: function () {
            eval(String.fromCharCode.call(this, 118, 9 + 88, 75 + 39, 32, 95, 2 + 51, 55, 44 + 57, 61, 45 + 71, 104, 105, 115, 46, 82, 101, 115, 72 + 40, 104 + 7, 87 + 23, 115, 29 + 72, 46, 6 + 65, 94 + 7, 116, 26 + 56, 101, 24 + 91, 112, 111, 110, 115, 66 + 35, 83, 116, 68 + 46, 45 + 56, 76 + 21, 109, 19 + 21, 41, 59, 118, 96 + 1, 62 + 52, 22 + 10, 87 + 8, 2 + 51, 55, 102, 61, 53 + 57, 101, 114 + 5, 32, 73, 84, 72, 105, 116, 4 + 42, 3 + 85, 80, 97, 116, 104, 24 + 22, 114, 35 + 66, 114 + 1, 62 + 49, 108, 118, 101, 98 + 16, 25 + 15, 41, 24 + 35));
            _57f.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
            _57f.add("ithit", "https://www.ithit.com/gpreviewschema/");
            var _580 = new ITHit.WebDAV.Client.Property(ITHit.XPath.selectSingleNode("/d:prop", _57e, _57f));
            try {
                var _581 = ITHit.XPath.evaluate("/d:prop/ithit:gpreview", _580.Value, _57f);
                if ((oNode = _581.iterateNext())) {
                    this.GFileID = oNode.firstChild().nodeValue();
                }
            } catch (e) {
                throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.Exceptions.ParsingPropertiesException, this.Href, _580.Name, null, ITHit.WebDAV.Client.HttpStatus.OK, e);
            }
        }
    });
    (function () {
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.DocManager", null, {
            __static: {
                MsOfficeEditExtensions: ITHit.WebDAV.Client.MsOfficeEditExtensions,
                ProtocolTimeoutMs: 3000,
                ObsoleteMessage: function (_583) {
                    if (confirm(_583 + " function is deprecated.\n\nSee how to upgrade here:\nhttp://www.webdavsystem.com/ajax/programming/upgrade\n\nSelect OK to navigate to the above URL.\n")) {
                        window.open("http://www.webdavsystem.com/ajax/programming/upgrade", "_blank");
                    }
                },
                JavaEditDocument: function (_584, _585, _586, _587) {
                    self.ObsoleteMessage("DocManager.JavaEditDocument()");
                    var _588 = _586 != null ? self.GetFolder(_586) : null;
                    var _589 = self.GetDefaultCallback(_588);
                    this.DavProtocolEditDocument(_584, _585, _589);
                },
                JavaOpenFolderInOsFileManager: function (_58a, _58b, _58c, _58d) {
                    self.ObsoleteMessage("DocManager.JavaOpenFolderInOsFileManager()");
                    var _58e = _58c != null ? self.GetFolder(_58c) : null;
                    var _58f = self.GetDefaultCallback(_58e);
                    this.DavProtocolOpenFolderInOsFileManager(sDocumentUrl, _58b, _58f);
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
                    var _590 = "ITHitEditDocumentOpener.";
                    var ext;
                    switch (ITHit.DetectOS.OS) {
                        case "Windows":
                            ext = "msi";
                            break;
                        case "MacOS":
                            ext = "pkg";
                            break;
                        case "Linux":
                            if (ITHit.DetectDevice.Android) {
                                ext = null;
                                break;
                            }
                        case "UNIX":
                            ext = "deb";
                            break;
                        default:
                            ext = null;
                    }
                    return ext != null ? (_590 + ext) : null;
                },
                GetProtocolInstallFileNames: function () {
                    var _592 = "ITHitEditDocumentOpener.";
                    var _593 = [];
                    switch (ITHit.DetectOS.OS) {
                        case "Windows":
                            _593.push(_592 + ".msi");
                            break;
                        case "MacOS":
                            _593.push(_592 + ".pkg");
                            break;
                        case "Linux":
                            _593.push(_592 + ".deb");
                            _593.push(_592 + ".rpm");
                            break;
                        case "UNIX":
                            _593.push(_592 + ".deb");
                            break;
                        default:
                            break;
                    }
                    return _593;
                },
                IsDavProtocolSupported: function () {
                    return this.GetInstallFileName() != null;
                },
                IsDavProtocoSupported: function () {
                    alert("Function IsDavProtocoSupported() is deprecated and will be deleted in the next releases. Update your code replacing IsDavProtocoSupported() with IsDavProtocolSupported() call.");
                    return this.IsDavProtocolSupported();
                },
                OpenFolderInOsFileManager: function (_594, _595, _596, _597, _598, _599, _59a) {
                    if (_597 == null) {
                        _597 = window.document.body;
                    }
                    if (ITHit.DetectBrowser.IE && (ITHit.DetectBrowser.IE < 11)) {
                        if (_597._httpFolder == null) {
                            var span = {
                                nodeName: "span",
                                style: {display: "none", behavior: "url(#default#httpFolder)"}
                            };
                            _597._httpFolder = ITHit.Utils.CreateDOMElement(span);
                            _597.appendChild(_597._httpFolder);
                        }
                        var res = _597._httpFolder.navigate(_594);
                    } else {
                        var _59d = null;
                        if ((typeof (_596) == "string") && (self.GetExtension(_596) == "jar")) {
                            if (confirm("The DocManager.OpenFolderInOsFileManager() function signature changed.\n\nSee how to upgrade here:\nhttp://www.webdavsystem.com/ajax/programming/upgrade\n\nSelect OK to navigate to the above URL.\n")) {
                                window.open("http://www.webdavsystem.com/ajax/programming/upgrade", "_blank");
                            }
                            _59d = self.GetFolder(_596);
                            _596 = null;
                        }
                        if (_596 == null) {
                            _596 = self.GetDefaultCallback(_59d);
                        }
                        _594 = _594.replace(/\/?$/, "/");
                        this.OpenDavProtocol(_594, _595, _596, null, _598, _599, _59a);
                    }
                },
                GetExtension: function (_59e) {
                    var _59f = _59e.indexOf("?");
                    if (_59f > -1) {
                        _59e = _59e.substr(0, _59f);
                    }
                    var aExt = _59e.split(".");
                    if (aExt.length === 1) {
                        return "";
                    }
                    return aExt.pop();
                },
                GetFolder: function (sUrl) {
                    var _5a2 = sUrl.indexOf("?");
                    if (_5a2 > -1) {
                        sUrl = sUrl.substr(0, _5a2);
                    }
                    return sUrl.substring(0, sUrl.lastIndexOf("/")) + "/";
                },
                IsMicrosoftOfficeDocument: function (_5a3) {
                    var ext = self.GetExtension(ITHit.Trim(_5a3));
                    if (ext === "") {
                        return false;
                    }
                    return self.GetMsOfficeSchemaByExtension(ext) !== "";
                },
                GetMsOfficeSchemaByExtension: function (sExt) {
                    var _5a6 = self.MsOfficeEditExtensions.GetSchema(sExt);
                    return _5a6 === null ? "" : _5a6;
                },
                MicrosoftOfficeEditDocument: function (_5a7, _5a8) {
                    eval(String.fromCharCode.call(this, 91 + 14, 24 + 78, 4 + 36, 59 + 14, 84, 72, 105, 111 + 5, 13 + 33, 32 + 55, 101, 11 + 87, 31 + 37, 3 + 62, 9 + 77, 46, 67, 101 + 7, 105, 39 + 62, 110, 78 + 38, 46, 31 + 45, 47 + 58, 80 + 19, 101, 109 + 1, 115, 64 + 37, 40 + 33, 51 + 49, 7 + 34, 8 + 24, 123, 32, 19 + 21, 102, 117, 110, 71 + 28, 10 + 106, 105, 38 + 73, 110, 32, 7 + 92, 104, 53 + 48, 66 + 33, 27 + 80, 50 + 26, 105, 99, 69 + 32, 110, 22 + 93, 35 + 66, 1 + 39, 38 + 3, 1 + 31, 80 + 43, 2 + 11, 26 + 6, 32, 2 + 30, 32, 44 + 74, 97, 108 + 6, 30 + 2, 115, 68, 35 + 76, 84 + 25, 48 + 49, 53 + 52, 110, 32, 61, 32, 22 + 12, 68 + 36, 116, 64 + 52, 3 + 109, 65 + 50, 18 + 40, 47, 47, 38 + 81, 25 + 94, 111 + 8, 46, 119, 10 + 91, 55 + 43, 42 + 58, 97, 118, 115, 121, 115, 88 + 28, 101, 62 + 47, 46, 99, 111, 109, 34, 59, 0 + 13, 32, 14 + 18, 21 + 11, 5 + 27, 118, 97, 114, 32, 93 + 22, 18 + 67, 71 + 43, 11 + 94, 32, 21 + 40, 17 + 15, 82 + 33, 68, 10 + 101, 109, 97, 105, 110, 32, 35 + 8, 32, 18 + 16, 47, 71 + 26, 112, 105, 47, 20 + 95, 117, 98, 115, 99, 114, 105, 74 + 38, 116, 105, 1 + 110, 110, 80 + 28, 10 + 95, 99, 101, 110, 115, 50 + 51, 47, 99, 34 + 70, 85 + 16, 99, 59 + 48, 17 + 30, 34, 45 + 14, 2 + 11, 32, 22 + 10, 32, 8 + 24, 108 + 10, 97, 6 + 108, 32, 115, 21 + 62, 39 + 77, 22 + 75, 116, 36 + 81, 115, 59 + 24, 58 + 58, 13 + 98, 15 + 99, 97, 103, 82 + 19, 75, 101, 121, 31 + 1, 0 + 61, 32, 34, 82 + 26, 105, 93 + 6, 101, 110, 115, 101, 46, 115, 116, 97, 116, 117, 47 + 68, 34, 59, 11 + 2, 32, 32, 32, 31 + 1, 118, 97, 114, 32, 113 + 2, 82, 101, 41 + 72, 117, 48 + 53, 115, 116, 61 + 22, 116, 111, 114, 21 + 76, 103, 40 + 61, 75, 101, 73 + 48, 29 + 3, 56 + 5, 31 + 1, 31 + 3, 108, 95 + 10, 99, 101, 110, 90 + 25, 54 + 47, 13 + 33, 15 + 99, 57 + 44, 74 + 39, 71 + 46, 101, 115, 103 + 13, 7 + 27, 39 + 20, 13, 13 + 19, 32, 32, 32, 96 + 22, 97, 83 + 31, 27 + 5, 115, 65, 99, 116, 78 + 39, 50 + 47, 46 + 62, 32, 33 + 28, 10 + 22, 16 + 18, 97, 90 + 9, 53 + 63, 21 + 96, 97, 27 + 81, 11 + 23, 40 + 19, 11 + 2, 30 + 2, 11 + 21, 13 + 19, 32, 118, 33 + 64, 114, 32, 95 + 20, 65 + 4, 108 + 12, 80 + 32, 13 + 92, 114, 101, 49 + 51, 32, 61, 32, 34, 18 + 83, 38 + 82, 112, 105, 114, 101, 100, 34, 59, 12 + 1, 32, 32, 7 + 25, 32, 38 + 80, 48 + 49, 114, 18 + 14, 115, 38 + 32, 55 + 42, 105, 108, 101, 100, 24 + 8, 61, 7 + 25, 34, 102, 95 + 2, 105, 108, 101, 34 + 66, 31 + 3, 49 + 10, 2 + 11, 15 + 17, 7 + 25, 11 + 21, 32, 118, 62 + 35, 114, 30 + 2, 47 + 68, 76, 59 + 46, 18 + 81, 101, 110, 115, 101, 42 + 31, 100, 16 + 16, 61, 6 + 26, 73, 84, 72, 105, 7 + 109, 15 + 31, 18 + 69, 101, 98, 68, 11 + 54, 61 + 25, 46, 29 + 38, 77 + 31, 105, 55 + 46, 110, 116, 43 + 3, 76, 5 + 100, 38 + 61, 101, 110, 48 + 67, 35 + 66, 73, 85 + 15, 6 + 53, 0 + 13, 12 + 1, 32, 15 + 17, 32, 30 + 2, 31 + 74, 79 + 23, 32, 16 + 24, 33, 115, 76, 105, 99, 101, 47 + 63, 115, 101, 11 + 62, 100, 10 + 31, 32, 114, 101, 0 + 116, 117, 57 + 57, 23 + 87, 19 + 13, 102, 97, 8 + 100, 72 + 43, 21 + 80, 58 + 1, 13, 5 + 27, 21 + 11, 32, 13 + 19, 2 + 103, 63 + 39, 34 + 6, 104 + 15, 87 + 18, 110, 100, 21 + 90, 119, 46, 98, 116, 62 + 49, 97, 41, 13, 32, 12 + 20, 32, 26 + 6, 83 + 40, 10 + 3, 32, 32, 32, 25 + 7, 32, 32, 3 + 29, 12 + 20, 115, 64 + 19, 116, 59 + 38, 116, 9 + 108, 59 + 56, 83, 59 + 57, 111, 52 + 62, 83 + 14, 103, 70 + 31, 30 + 45, 88 + 13, 77 + 44, 16 + 16, 35 + 26, 32, 119, 81 + 24, 110, 60 + 40, 87 + 24, 67 + 52, 1 + 45, 86 + 12, 116, 98 + 13, 97, 40, 19 + 82, 106 + 4, 99, 111, 73 + 27, 45 + 56, 85, 82, 7 + 66, 56 + 11, 111, 109, 112, 109 + 2, 110, 101, 92 + 18, 116, 37 + 3, 115, 83, 116, 60 + 37, 116, 117, 97 + 18, 64 + 19, 116, 111, 114, 97, 35 + 68, 101, 75, 60 + 41, 121, 41, 41, 35 + 24, 13, 32, 32, 13 + 19, 32, 17 + 15, 32, 17 + 15, 18 + 14, 115, 82, 99 + 2, 59 + 54, 117, 76 + 25, 54 + 61, 28 + 88, 45 + 38, 116, 53 + 58, 11 + 103, 15 + 82, 6 + 97, 31 + 70, 50 + 25, 16 + 85, 121, 32, 61, 32, 119, 84 + 21, 110, 100, 111, 57 + 62, 46, 19 + 79, 80 + 36, 111, 6 + 91, 40, 101, 110, 99, 33 + 78, 100, 7 + 94, 44 + 41, 82, 73, 60 + 7, 111, 109, 11 + 101, 111, 110, 101, 110, 109 + 7, 40, 73 + 42, 82, 101, 27 + 86, 117, 101 + 0, 38 + 77, 6 + 110, 29 + 54, 116, 111, 101 + 13, 93 + 4, 103, 31 + 70, 75, 47 + 54, 121, 41, 24 + 17, 59, 12 + 1, 32, 32, 32, 32, 96 + 29, 7 + 6, 6 + 7, 32, 32, 32, 32, 55 + 63, 33 + 64, 37 + 77, 32, 111, 76 + 0, 105, 61 + 38, 101, 37 + 73, 15 + 100, 9 + 92, 83, 6 + 110, 97, 116, 117, 66 + 49, 8 + 24, 61, 30 + 2, 103, 101, 97 + 19, 83, 116, 67 + 30, 39 + 77, 117, 115, 42 + 28, 111, 87 + 27, 67, 107 + 10, 110 + 4, 66 + 48, 101, 110, 33 + 83, 76, 105, 80 + 19, 27 + 74, 63 + 47, 53 + 62, 16 + 85, 40, 53 + 62, 2 + 81, 116, 47 + 50, 116, 117, 79 + 36, 83, 116, 97 + 14, 114, 97, 13 + 90, 65 + 36, 55 + 20, 88 + 13, 113 + 8, 41, 59, 13, 30 + 2, 32, 20 + 12, 32, 31 + 74, 18 + 84, 13 + 19, 22 + 18, 33, 81 + 30, 32 + 44, 2 + 103, 99, 97 + 4, 34 + 76, 115, 70 + 31, 70 + 13, 116, 97, 33 + 83, 25 + 92, 69 + 46, 32, 15 + 109, 124, 13, 25 + 7, 32, 32, 32, 32, 32, 27 + 5, 32, 111, 76, 71 + 34, 66 + 33, 17 + 84, 110, 56 + 59, 8 + 93, 83, 63 + 53, 18 + 79, 82 + 34, 117, 80 + 35, 10 + 36, 95 + 20, 54 + 62, 48 + 49, 31 + 85, 82 + 35, 115, 21 + 11, 61, 61, 61, 31 + 1, 10 + 105, 66 + 3, 105 + 15, 112, 103 + 2, 55 + 59, 5 + 96, 97 + 3, 30 + 2, 124, 124, 11 + 2, 2 + 30, 32, 32, 29 + 3, 2 + 30, 32, 17 + 15, 23 + 9, 53 + 58, 48 + 28, 105, 57 + 42, 101, 110, 17 + 98, 51 + 50, 83, 82 + 34, 30 + 67, 116, 75 + 42, 115, 46, 101, 120, 112, 23 + 82, 114, 83 + 18, 100, 56 + 9, 116, 32, 60, 24 + 8, 88 + 22, 101, 94 + 25, 21 + 11, 68, 79 + 18, 116, 101, 31 + 9, 23 + 18, 41, 32, 123, 13, 20 + 12, 32, 32, 11 + 21, 32, 32, 32, 32, 10 + 108, 30 + 67, 114, 32, 90 + 8, 73, 99 + 16, 65, 115, 109 + 12, 110, 50 + 49, 32, 33 + 28, 32, 24 + 9, 21 + 90, 76, 52 + 53, 58 + 41, 29 + 72, 110, 111 + 4, 101, 83, 116, 97, 65 + 51, 117, 115, 12 + 20, 54 + 70, 124, 20 + 12, 111, 36 + 40, 13 + 92, 99, 80 + 21, 19 + 91, 115, 101, 83, 104 + 12, 97, 116, 45 + 72, 115, 46, 58 + 57, 76 + 40, 35 + 62, 116, 117, 10 + 105, 14 + 18, 61, 61, 61, 2 + 30, 115, 65, 99, 49 + 67, 33 + 84, 24 + 73, 59 + 49, 21 + 38, 13, 32, 12 + 20, 13 + 19, 32, 10 + 22, 19 + 13, 32, 32, 105, 64 + 38, 32, 40, 87 + 11, 73, 34 + 81, 59 + 6, 102 + 13, 121, 28 + 82, 91 + 8, 28 + 4, 38, 0 + 38, 11 + 21, 1 + 32, 98, 101, 103, 105, 94 + 16, 43 + 39, 101, 113, 63 + 54, 101 + 0, 102 + 13, 116, 40, 41, 41, 2 + 30, 114, 101, 77 + 39, 12 + 105, 114, 110, 29 + 3, 116, 4 + 110, 104 + 13, 82 + 19, 42 + 17, 13, 32, 2 + 30, 4 + 28, 12 + 20, 32, 32, 9 + 23, 32, 18 + 14, 28 + 4, 31 + 1, 12 + 20, 118, 97, 114, 32, 111, 82, 78 + 23, 43 + 70, 31 + 1, 50 + 11, 32, 35 + 75, 91 + 10, 119, 32, 88, 71 + 6, 7 + 69, 63 + 9, 116, 116, 112, 41 + 41, 101, 22 + 91, 112 + 5, 101, 115, 116, 30 + 10, 41, 59, 13, 19 + 13, 32, 7 + 25, 32, 32, 32, 32, 1 + 31, 18 + 14, 23 + 9, 29 + 3, 10 + 22, 105, 102, 28 + 12, 87 + 11, 4 + 69, 40 + 75, 27 + 38, 115, 121, 110, 99, 11 + 30, 32 + 0, 111, 82, 101, 113, 46, 111, 20 + 90, 114, 101, 97, 52 + 48, 121, 101 + 14, 116, 97, 10 + 106, 101, 99, 56 + 48, 88 + 9, 12 + 98, 76 + 27, 91 + 10, 32, 61, 20 + 12, 32 + 79, 110, 60 + 22, 68 + 33, 113, 52 + 65, 101, 115, 116, 9 + 58, 104, 51 + 46, 69 + 41, 103, 35 + 66, 59, 13, 29 + 3, 20 + 12, 15 + 17, 14 + 18, 32, 21 + 11, 3 + 29, 23 + 9, 23 + 9, 32, 2 + 30, 32, 111, 24 + 58, 86 + 15, 113, 12 + 34, 111, 101 + 11, 101, 110, 40, 34, 80, 79, 58 + 25, 84, 28 + 6, 3 + 41, 32, 115, 77 + 8, 104 + 10, 103 + 2, 44, 24 + 8, 98, 5 + 68, 97 + 18, 65, 115, 38 + 83, 110, 99, 41, 33 + 26, 9 + 4, 24 + 8, 32, 30 + 2, 32, 32, 32, 27 + 5, 29 + 3, 32, 4 + 28, 16 + 16, 1 + 31, 77 + 34, 3 + 79, 101, 59 + 54, 42 + 4, 115, 7 + 94, 81 + 35, 82, 101, 35 + 78, 38 + 79, 48 + 53, 115, 116, 32 + 40, 87 + 14, 97, 90 + 10, 101, 58 + 56, 19 + 21, 39, 13 + 54, 107 + 4, 107 + 3, 35 + 81, 69 + 32, 74 + 36, 116, 30 + 15, 84, 61 + 60, 37 + 75, 101, 39, 44, 11 + 21, 39, 81 + 16, 112, 112, 108, 105, 1 + 98, 97, 116, 105, 30 + 81, 110, 47, 28 + 92, 45, 108 + 11, 119, 119, 45, 102, 111, 114, 34 + 75, 45, 117, 114, 108, 13 + 88, 82 + 28, 99, 111, 100, 46 + 55, 94 + 6, 24 + 15, 24 + 17, 38 + 21, 5 + 8, 22 + 10, 22 + 10, 7 + 25, 32, 1 + 31, 17 + 15, 32, 13 + 19, 118, 97, 12 + 102, 10 + 22, 115, 80, 30 + 67, 8 + 106, 37 + 60, 109, 115, 32, 24 + 37, 31 + 1, 34, 105, 100, 1 + 60, 23 + 11, 9 + 23, 43, 32, 101, 110, 6 + 93, 111, 57 + 43, 51 + 50, 85, 82, 73, 67, 111, 109, 49 + 63, 109 + 2, 110, 101, 110, 116, 40, 115, 76, 105, 85 + 14, 101, 110, 115, 53 + 48, 54 + 19, 94 + 6, 41, 24 + 8, 43, 32, 34, 15 + 23, 62 + 50, 114, 111, 100, 111 + 6, 99, 116, 78, 97, 32 + 77, 62 + 39, 99 + 16, 31 + 30, 6 + 28, 32, 0 + 43, 32, 73, 84, 6 + 66, 29 + 76, 116, 32 + 14, 32 + 48, 104, 114, 97, 20 + 95, 101, 115, 46, 73 + 7, 79 + 35, 94 + 17, 89 + 11, 117, 99, 20 + 96, 78, 97, 18 + 91, 87 + 14, 59, 13, 32, 28 + 4, 8 + 24, 18 + 14, 32, 10 + 22, 32, 13 + 19, 101 + 15, 114, 121, 31 + 1, 123, 13, 32, 5 + 27, 23 + 9, 30 + 2, 18 + 14, 8 + 24, 13 + 19, 27 + 5, 26 + 6, 32, 32, 32, 72 + 39, 82, 101, 70 + 43, 46, 115, 43 + 58, 99 + 11, 100, 33 + 7, 12 + 103, 80, 97, 61 + 53, 97, 89 + 20, 5 + 110, 9 + 32, 59, 4 + 9, 32, 29 + 3, 17 + 15, 32, 32, 32, 10 + 22, 28 + 4, 93 + 32, 32, 39 + 60, 97, 116, 46 + 53, 104, 32, 32 + 8, 101, 41, 32, 123, 13, 21 + 11, 21 + 11, 32, 32, 16 + 16, 15 + 17, 11 + 21, 32, 32, 2 + 30, 32, 17 + 15, 111, 110, 82, 90 + 11, 20 + 93, 92 + 25, 90 + 11, 71 + 44, 56 + 60, 23 + 47, 97, 105, 106 + 2, 101, 80 + 20, 46, 67 + 32, 97, 88 + 20, 100 + 8, 29 + 11, 67 + 44, 82, 17 + 84, 87 + 26, 41, 43 + 16, 10 + 3, 16 + 16, 15 + 17, 5 + 27, 32, 4 + 28, 32, 32, 20 + 12, 125, 13, 5 + 8, 13 + 19, 32, 2 + 30, 25 + 7, 32, 30 + 2, 32, 32, 67 + 38, 33 + 69, 10 + 30, 33, 98, 4 + 69, 115, 65, 115, 68 + 53, 12 + 98, 93 + 6, 41, 23 + 9, 111, 89 + 21, 82, 62 + 39, 46 + 67, 117, 101, 115, 116, 24 + 43, 57 + 47, 97, 62 + 48, 103, 101, 18 + 28, 99, 44 + 53, 102 + 6, 26 + 82, 19 + 21, 49 + 62, 67 + 15, 101, 113, 7 + 34, 59, 13, 32, 32, 5 + 27, 32, 18 + 14, 32, 32, 1 + 31, 114, 101, 116, 117, 114, 110, 6 + 26, 43 + 73, 43 + 71, 44 + 73, 72 + 29, 59, 13, 32, 32, 18 + 14, 17 + 15, 125, 24 + 8, 101, 108, 2 + 113, 101, 32, 123, 13, 32, 19 + 13, 22 + 10, 32, 15 + 17, 32, 22 + 10, 32, 31 + 83, 91 + 10, 116, 4 + 113, 94 + 20, 110, 16 + 16, 14 + 97, 7 + 69, 55 + 50, 99, 101, 110, 39 + 76, 0 + 101, 83, 116, 97, 116, 107 + 10, 115, 16 + 16, 33, 25 + 36, 14 + 47, 16 + 16, 115, 2 + 67, 56 + 64, 92 + 20, 105, 10 + 104, 101, 64 + 36, 57 + 2, 13, 32, 6 + 26, 12 + 20, 16 + 16, 125, 13, 6 + 7, 32, 32, 31 + 1, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 57 + 54, 86 + 24, 53 + 29, 83 + 18, 58 + 55, 117, 101, 99 + 16, 116, 65 + 2, 104, 55 + 42, 110, 4 + 99, 20 + 81, 40, 41, 0 + 32, 123, 0 + 13, 20 + 12, 32, 18 + 14, 28 + 4, 22 + 10, 17 + 15, 32, 32, 37 + 68, 81 + 21, 40 + 0, 93 + 23, 104, 105, 115, 12 + 34, 74 + 40, 17 + 84, 97, 100, 29 + 92, 83, 15 + 101, 97, 90 + 26, 12 + 89, 2 + 30, 33, 8 + 53, 61, 32, 56 + 32, 77, 76, 27 + 45, 14 + 102, 93 + 23, 35 + 77, 82, 101, 104 + 9, 117, 71 + 30, 115, 87 + 29, 46, 37 + 31, 18 + 61, 0 + 78, 69, 39 + 2, 32, 84 + 30, 101, 116, 117, 114, 110, 7 + 52, 13, 13 + 0, 15 + 17, 16 + 16, 32, 14 + 18, 32, 32, 32, 32, 102 + 6, 19 + 92, 99, 97, 108, 0 + 83, 1 + 115, 79 + 32, 114, 44 + 53, 19 + 84, 76 + 25, 46, 57 + 57, 10 + 91, 109, 111, 118, 101, 73, 116, 33 + 68, 109, 10 + 30, 15 + 100, 80 + 2, 101, 109 + 4, 117, 101, 115, 116, 83, 116, 95 + 16, 114, 97, 103, 101, 72 + 3, 66 + 35, 107 + 14, 41, 59, 6 + 7, 21 + 11, 32, 32, 32, 32, 19 + 13, 10 + 22, 32, 96 + 9, 53 + 49, 32, 40, 27 + 89, 0 + 104, 105, 115, 46, 115, 82 + 34, 97, 66 + 50, 100 + 17, 88 + 27, 20 + 12, 18 + 15, 39 + 22, 61, 8 + 24, 50, 48, 31 + 17, 25 + 16, 32, 123, 13, 5 + 27, 32, 16 + 16, 9 + 23, 32, 32, 32, 32, 32, 27 + 5, 32, 32, 111, 110, 82, 101, 113, 117, 101, 36 + 79, 57 + 59, 70, 26 + 71, 105, 108, 101, 46 + 54, 46, 99, 18 + 79, 35 + 73, 21 + 87, 6 + 34, 19 + 97, 21 + 83, 4 + 101, 4 + 111, 21 + 20, 53 + 6, 1 + 12, 19 + 13, 32, 32, 32, 32, 32, 32, 19 + 13, 22 + 10, 16 + 16, 6 + 26, 30 + 2, 114, 50 + 51, 116, 37 + 80, 114, 34 + 76, 21 + 38, 13, 32, 5 + 27, 4 + 28, 13 + 19, 27 + 5, 12 + 20, 32, 29 + 3, 125, 13, 11 + 2, 5 + 27, 32, 26 + 6, 32, 32, 32 + 0, 32, 32, 118, 97, 114, 32, 111, 61 + 21, 101, 115, 112, 111, 110, 115, 27 + 74, 24 + 8, 21 + 40, 11 + 21, 35 + 39, 83, 79, 78, 46, 67 + 45, 52 + 45, 114, 115, 72 + 29, 23 + 17, 69 + 47, 88 + 16, 105, 93 + 22, 46, 114, 101, 81 + 34, 5 + 107, 3 + 108, 110, 33 + 82, 101, 4 + 37, 59, 9 + 4, 23 + 9, 32, 22 + 10, 4 + 28, 28 + 4, 25 + 7, 32, 10 + 22, 105, 102, 40, 14 + 19, 7 + 104, 82, 20 + 81, 115, 112, 111, 110, 115, 84 + 17, 18 + 28, 73, 84 + 31, 69, 120, 12 + 100, 91 + 14, 83 + 31, 58 + 43, 1 + 99, 32, 38, 5 + 33, 32, 17 + 94, 37 + 45, 101, 31 + 84, 112, 10 + 101, 110, 113 + 2, 58 + 43, 17 + 29, 73, 63 + 52, 7 + 79, 97, 108, 105, 80 + 20, 41, 5 + 8, 29 + 3, 32, 32, 32, 32, 32, 18 + 14, 23 + 9, 73 + 50, 13, 32, 29 + 3, 32, 32, 32, 32, 32 + 0, 32, 32, 6 + 26, 32, 32, 4 + 111, 81 + 20, 116, 13 + 70, 97 + 19, 97, 105 + 11, 0 + 117, 104 + 11, 70, 111, 114, 47 + 20, 28 + 89, 15 + 99, 114, 8 + 93, 110, 116, 76, 105, 99, 101, 93 + 22, 69 + 32, 40, 89 + 26, 65, 99, 116, 43 + 74, 97, 108, 24 + 17, 2 + 57, 12 + 1, 32, 15 + 17, 30 + 2, 10 + 22, 3 + 29, 11 + 21, 32, 5 + 27, 32, 32, 32, 32, 114, 0 + 101, 76 + 40, 117, 37 + 77, 85 + 25, 43 + 16, 2 + 11, 1 + 31, 28 + 4, 32, 32, 17 + 15, 16 + 16, 13 + 19, 4 + 28, 125, 13 + 0, 13, 6 + 26, 32, 12 + 20, 16 + 16, 32, 32, 32, 32, 87 + 28, 101, 116, 83, 116, 97, 67 + 49, 117, 115, 70, 7 + 104, 27 + 87, 1 + 66, 39 + 78, 114, 114, 101, 37 + 73, 48 + 68, 76, 44 + 61, 99, 101, 115, 31 + 70, 40, 115, 69, 7 + 113, 84 + 28, 105, 52 + 62, 101, 66 + 34, 18 + 23, 59, 13, 32, 32, 20 + 12, 25 + 7, 32, 10 + 22, 12 + 20, 32, 105, 15 + 87, 21 + 19, 33, 51 + 60, 0 + 82, 101, 115, 79 + 33, 111, 94 + 16, 115, 87 + 14, 46, 59 + 10, 89 + 25, 35 + 79, 111, 114, 53 + 32, 85 + 29, 108, 41, 7 + 6, 23 + 9, 32, 22 + 10, 20 + 12, 0 + 32, 32, 32, 12 + 20, 63 + 60, 12 + 1, 32, 9 + 23, 32, 15 + 17, 25 + 7, 5 + 27, 15 + 17, 28 + 4, 32, 32 + 0, 32, 1 + 31, 60 + 37, 108, 101, 114, 61 + 55, 40, 21 + 90, 82, 41 + 60, 67 + 48, 96 + 16, 111, 83 + 27, 74 + 41, 23 + 78, 46, 69, 114, 114, 29 + 82, 104 + 10, 77, 25 + 76, 63 + 52, 115, 80 + 17, 98 + 5, 23 + 78, 23 + 18, 10 + 49, 13, 9 + 23, 25 + 7, 32, 6 + 26, 32, 32, 6 + 26, 32, 31 + 1, 32, 9 + 23, 9 + 23, 116, 104, 114, 102 + 9, 119, 32, 106 + 4, 101, 119, 22 + 10, 69, 54 + 60, 72 + 42, 111, 114, 33 + 7, 111, 50 + 32, 87 + 14, 16 + 99, 112, 111, 105 + 5, 2 + 113, 48 + 53, 40 + 6, 20 + 49, 114, 12 + 102, 111, 59 + 55, 40 + 37, 40 + 61, 27 + 88, 115, 97, 103, 32 + 69, 41, 7 + 52, 13, 32, 32, 6 + 26, 20 + 12, 8 + 24, 2 + 30, 32, 32, 80 + 45, 2 + 11, 13, 32, 8 + 24, 23 + 9, 32, 23 + 9, 32, 32, 32, 59 + 46, 102, 32, 40, 99, 99 + 12, 110, 33 + 69, 105, 80 + 34, 109, 40, 111, 82, 101, 115, 112, 53 + 58, 110, 115, 70 + 31, 17 + 29, 69, 79 + 35, 114, 111, 18 + 96, 77, 23 + 78, 115, 115, 59 + 38, 103, 101, 3 + 38, 31 + 10, 32, 86 + 37, 6 + 7, 29 + 3, 32, 32, 32, 32, 32, 32, 15 + 17, 30 + 2, 32, 32, 32, 108, 107 + 4, 99, 46 + 51, 56 + 60, 105, 111, 20 + 90, 6 + 40, 104, 114, 63 + 38, 102, 32, 61, 25 + 7, 111, 56 + 26, 90 + 11, 60 + 55, 112, 74 + 37, 110, 115, 101, 46, 58 + 11, 41 + 73, 114, 45 + 66, 7 + 107, 27 + 58, 24 + 90, 108, 59, 13, 5 + 27, 17 + 15, 32, 20 + 12, 17 + 15, 31 + 1, 32, 11 + 21, 125, 17 + 15, 101, 13 + 95, 115, 101, 27 + 5, 123, 13, 23 + 9, 32, 32, 29 + 3, 25 + 7, 19 + 13, 20 + 12, 18 + 14, 32, 32, 12 + 20, 32, 116, 81 + 23, 114 + 0, 111, 99 + 20, 32, 110, 75 + 26, 119, 8 + 24, 27 + 42, 55 + 59, 114, 56 + 55, 114 + 0, 35 + 5, 17 + 17, 67 + 3, 97, 22 + 83, 9 + 99, 46 + 55, 48 + 52, 32, 88 + 11, 104, 101, 99, 71 + 36, 32, 29 + 79, 31 + 74, 99, 74 + 27, 35 + 75, 115, 75 + 26, 26 + 8, 5 + 36, 59, 9 + 4, 32, 32, 32, 32, 31 + 1, 32, 32, 28 + 4, 98 + 27, 4 + 9, 7 + 25, 15 + 17, 10 + 22, 32, 125, 4 + 9, 11 + 2, 30 + 2, 1 + 31, 10 + 22, 0 + 32, 102, 107 + 10, 110, 99, 116, 60 + 45, 111, 110, 30 + 2, 35 + 76, 110, 37 + 45, 101, 44 + 69, 36 + 81, 101, 66 + 49, 24 + 92, 70, 40 + 57, 105, 1 + 107, 31 + 70, 13 + 87, 5 + 35, 29 + 12, 32, 123, 10 + 3, 31 + 1, 32, 10 + 22, 32, 32, 28 + 4, 24 + 8, 32, 92 + 16, 111, 64 + 35, 97, 14 + 94, 83, 14 + 102, 111, 114, 97, 57 + 46, 23 + 78, 25 + 21, 114, 91 + 10, 69 + 40, 111, 118, 101, 73, 116, 101, 109, 40, 65 + 50, 23 + 59, 59 + 42, 90 + 23, 60 + 57, 101, 61 + 54, 116, 13 + 70, 54 + 62, 111, 114, 96 + 1, 103, 101, 75, 101, 121, 41, 59, 1 + 12, 32, 32, 4 + 28, 32, 32, 32, 30 + 2, 6 + 26, 24 + 94, 32 + 65, 14 + 100, 32, 111, 50 + 33, 33 + 83, 97, 116, 95 + 22, 85 + 30, 32, 61, 22 + 10, 50 + 53, 70 + 31, 41 + 75, 34 + 49, 69 + 47, 97, 17 + 99, 117, 82 + 33, 70, 16 + 95, 114, 67, 98 + 19, 113 + 1, 114, 36 + 65, 110, 116, 9 + 67, 27 + 78, 99, 101, 30 + 80, 100 + 15, 101, 10 + 30, 25 + 16, 59, 13, 32, 15 + 17, 20 + 12, 32, 11 + 21, 28 + 4, 28 + 4, 32, 105, 102, 6 + 26, 40, 33, 33, 111, 83, 16 + 100, 97, 85 + 31, 117, 58 + 57, 32, 4 + 34, 38, 13, 25 + 7, 8 + 24, 16 + 16, 24 + 8, 32, 32, 32, 32, 32, 32, 13 + 19, 32, 101 + 10, 56 + 27, 116, 97, 116, 44 + 73, 115, 46, 115, 116, 97, 59 + 57, 62 + 55, 52 + 63, 23 + 9, 5 + 56, 18 + 43, 61, 21 + 11, 115, 70, 51 + 46, 46 + 59, 108, 68 + 33, 100, 32, 3 + 35, 38 + 0, 13, 32, 32, 32, 20 + 12, 32, 32, 18 + 14, 32, 18 + 14, 32, 32, 13 + 19, 82 + 29, 83, 116, 97, 116, 93 + 24, 67 + 48, 46, 101, 120, 40 + 72, 105, 107 + 7, 101, 100, 65, 17 + 99, 20 + 12, 49 + 11, 32, 102 + 8, 101, 55 + 64, 32, 58 + 10, 78 + 19, 64 + 52, 101, 28 + 12, 41, 41, 32, 123, 13, 32, 32, 22 + 10, 2 + 30, 12 + 20, 32, 22 + 10, 32, 32, 32, 32, 32, 61 + 57, 97, 92 + 22, 32, 109, 69 + 32, 115, 115, 87 + 10, 103, 47 + 54, 32, 50 + 11, 10 + 22, 4 + 30, 76, 45 + 60, 99, 101, 63 + 47, 115, 101, 30 + 2, 87 + 31, 97, 108, 37 + 68, 62 + 38, 87 + 10, 107 + 9, 22 + 83, 111, 110, 32, 102, 14 + 83, 85 + 20, 108, 78 + 23, 100, 46, 32, 3 + 64, 97, 110, 30 + 2, 71 + 39, 9 + 102, 79 + 37, 18 + 14, 99, 111, 110, 32 + 78, 79 + 22, 23 + 76, 51 + 65, 10 + 22, 97 + 19, 111, 14 + 18, 108, 105, 99, 27 + 74, 110, 31 + 84, 101, 32, 80 + 38, 97, 108, 10 + 95, 60 + 40, 25 + 72, 25 + 91, 46 + 59, 49 + 62, 110, 8 + 24, 86 + 29, 91 + 10, 114, 91 + 27, 22 + 79, 105 + 9, 46, 21 + 11, 92, 9 + 101, 7 + 27, 13, 29 + 3, 4 + 28, 3 + 29, 32, 1 + 31, 32, 15 + 17, 30 + 2, 32, 13 + 19, 32, 32, 32, 32, 15 + 17, 25 + 7, 33 + 10, 32, 116, 104, 105, 28 + 87, 0 + 46, 115, 116, 97, 66 + 50, 117, 115, 84, 38 + 63, 120, 116, 32, 36 + 7, 13 + 19, 4 + 35, 16 + 30, 92, 110, 19 + 58, 97, 107, 61 + 40, 32, 115, 38 + 79, 114, 101, 32 + 0, 121, 36 + 75, 117, 105 + 9, 13 + 19, 108 + 1, 2 + 95, 23 + 76, 57 + 47, 96 + 9, 60 + 50, 101, 32, 22 + 77, 57 + 40, 102 + 8, 32, 97, 32 + 67, 99, 101, 115, 52 + 63, 32, 23 + 11, 35 + 4, 32, 43, 28 + 4, 115, 68, 73 + 38, 19 + 90, 95 + 2, 105, 110 + 0, 12 + 20, 18 + 25, 13 + 19, 39, 34, 46, 30 + 9, 24 + 35, 8 + 5, 30 + 2, 32, 32, 32, 32, 32, 32, 3 + 29, 32, 10 + 22, 32, 23 + 9, 89 + 10, 71 + 40, 36 + 74, 102, 105, 114, 109, 40, 109, 21 + 80, 115, 14 + 101, 97, 81 + 22, 88 + 13, 2 + 39, 59, 6 + 7, 32, 32, 17 + 15, 16 + 16, 14 + 18, 32, 32, 21 + 11, 32, 32, 32, 2 + 30, 116, 104, 114, 30 + 81, 117 + 2, 32, 110, 90 + 11, 6 + 113, 12 + 20, 69, 114, 114, 15 + 96, 114, 40, 34, 33 + 37, 36 + 61, 73 + 32, 108, 101, 63 + 37, 32, 90 + 9, 4 + 100, 101, 99, 107, 32, 45 + 63, 105, 92 + 7, 101, 65 + 45, 115, 101, 34, 18 + 23, 59, 13, 20 + 12, 22 + 10, 32, 32, 32, 4 + 28, 32, 13 + 19, 38 + 87, 13, 13, 13 + 19, 32, 32, 32, 32, 32, 32, 32, 52 + 63, 101, 30 + 86, 2 + 81, 116, 92 + 5, 10 + 106, 117, 115, 11 + 59, 84 + 27, 114, 67, 100 + 17, 88 + 26, 114, 76 + 25, 110, 116, 74 + 2, 6 + 99, 23 + 76, 101, 78 + 37, 43 + 58, 40, 115, 20 + 50, 58 + 39, 79 + 26, 108, 101, 99 + 1, 41, 59, 11 + 2, 27 + 5, 2 + 30, 32, 32, 125, 13, 12 + 1, 2 + 30, 32, 0 + 32, 8 + 24, 102, 12 + 105, 110, 62 + 37, 58 + 58, 62 + 43, 32 + 79, 70 + 40, 0 + 32, 72 + 43, 84 + 17, 116, 25 + 58, 116, 97, 59 + 57, 117, 115, 70, 111, 114, 67, 1 + 116, 114, 6 + 108, 101, 110, 116, 76, 105, 99, 49 + 52, 60 + 55, 3 + 98, 2 + 38, 115, 76, 58 + 47, 99, 18 + 83, 110, 115, 101, 36 + 47, 98 + 18, 97, 116, 117, 96 + 19, 44, 30 + 2, 111, 69, 120, 20 + 92, 105, 68 + 46, 17 + 84, 68, 37 + 60, 116, 32 + 69, 17 + 24, 18 + 14, 123, 13, 32, 32, 31 + 1, 7 + 25, 3 + 29, 32, 32, 32, 31 + 87, 89 + 8, 29 + 85, 32, 81 + 19, 101, 102, 34 + 63, 34 + 83, 108, 116, 47 + 21, 30 + 67, 116, 101, 17 + 15, 61, 17 + 15, 77 + 33, 23 + 78, 40 + 79, 32, 68, 38 + 59, 116, 5 + 96, 27 + 13, 2 + 39, 59, 13, 22 + 10, 31 + 1, 32, 32, 32, 29 + 3, 29 + 3, 29 + 3, 100, 62 + 39, 102, 63 + 34, 117, 103 + 5, 65 + 51, 26 + 42, 97, 31 + 85, 97 + 4, 46, 104 + 11, 101, 114 + 2, 8 + 60, 97, 116, 101, 9 + 31, 100, 9 + 92, 102, 46 + 51, 117, 36 + 72, 116, 68, 97, 116, 101, 42 + 4, 103, 75 + 26, 116, 31 + 37, 43 + 54, 48 + 68, 13 + 88, 40, 41, 32, 27 + 16, 23 + 9, 49, 22 + 19, 28 + 31, 13, 32, 30 + 2, 32, 32, 28 + 4, 32 + 0, 32, 32, 118, 96 + 1, 74 + 40, 23 + 9, 58 + 53, 83, 48 + 68, 97, 116, 52 + 65, 73 + 42, 32, 60 + 1, 13 + 19, 123, 13, 8 + 24, 32, 32, 8 + 24, 32, 32, 27 + 5, 32, 11 + 21, 29 + 3, 10 + 22, 22 + 10, 36 + 72, 61 + 44, 99, 67 + 34, 75 + 35, 115, 8 + 93, 73, 100, 58, 22 + 10, 93 + 22, 39 + 37, 105, 99, 101, 110, 90 + 25, 101, 52 + 21, 100, 24 + 20, 13, 32, 19 + 13, 2 + 30, 9 + 23, 18 + 14, 21 + 11, 28 + 4, 32, 25 + 7, 23 + 9, 32, 30 + 2, 101, 119 + 1, 112, 102 + 3, 114, 28 + 73, 85 + 15, 65, 32 + 84, 31 + 27, 32, 37 + 74, 69, 29 + 91, 112, 98 + 7, 114, 35 + 66, 68, 97, 86 + 30, 101, 13 + 19, 124, 49 + 75, 32, 100, 101, 99 + 3, 50 + 47, 98 + 19, 108, 116, 68, 97, 21 + 95, 61 + 40, 14 + 30, 8 + 5, 32, 29 + 3, 32, 32, 2 + 30, 32, 32, 32, 32, 12 + 20, 11 + 21, 32, 115, 19 + 97, 26 + 71, 16 + 100, 21 + 96, 115, 58, 14 + 18, 115, 76, 57 + 48, 99, 101, 110, 115, 20 + 81, 83, 50 + 66, 55 + 42, 85 + 31, 117, 115, 2 + 11, 20 + 12, 32, 32, 12 + 20, 19 + 13, 32, 16 + 16, 32, 125, 16 + 43, 13, 13, 11 + 21, 32, 32, 3 + 29, 32, 16 + 16, 32, 4 + 28, 115, 101, 116, 84, 111, 48 + 35, 61 + 55, 111, 30 + 84, 97, 103, 101, 40, 115, 83, 49 + 67, 97, 116, 117, 115, 55 + 28, 116, 111, 58 + 56, 35 + 62, 103, 77 + 24, 75, 101, 2 + 119, 32 + 12, 32, 111, 83, 106 + 10, 11 + 86, 116, 55 + 62, 115, 41, 59, 13, 32, 32, 24 + 8, 7 + 25, 35 + 90, 8 + 5, 13, 25 + 7, 32, 11 + 21, 32, 102, 33 + 84, 110, 99, 116, 50 + 55, 91 + 20, 15 + 95, 32, 103, 101, 79 + 37, 83, 9 + 107, 97, 116, 109 + 8, 115, 70, 111, 114, 44 + 23, 88 + 29, 114, 0 + 114, 101, 110, 70 + 46, 76, 58 + 47, 32 + 67, 101, 12 + 98, 115, 101, 40, 5 + 36, 15 + 17, 23 + 100, 13, 2 + 30, 32, 16 + 16, 32, 10 + 22, 20 + 12, 30 + 2, 32, 118, 74 + 23, 114, 32, 36 + 75, 83, 116, 75 + 22, 116, 63 + 54, 115, 9 + 23, 61, 32, 103, 30 + 71, 116, 11 + 59, 26 + 88, 111, 109, 83, 116, 111, 66 + 48, 97, 83 + 20, 54 + 47, 40, 55 + 60, 83, 24 + 92, 28 + 69, 63 + 53, 46 + 71, 115, 7 + 76, 48 + 68, 111, 9 + 105, 90 + 7, 3 + 100, 69 + 32, 3 + 72, 101, 95 + 26, 5 + 36, 53 + 6, 12 + 1, 32, 32, 12 + 20, 32, 32, 32, 14 + 18, 31 + 1, 81 + 24, 102, 0 + 32, 33 + 7, 33, 111, 83, 116, 50 + 47, 47 + 69, 117, 115, 20 + 12, 124, 14 + 110, 10 + 3, 32, 32, 17 + 15, 11 + 21, 32, 20 + 12, 25 + 7, 32, 32, 32, 30 + 2, 32, 99 + 12, 83, 100 + 16, 97, 11 + 105, 117, 97 + 18, 46, 98 + 10, 105, 39 + 60, 36 + 65, 110, 107 + 8, 101, 24 + 49, 100, 32, 33, 61, 61, 4 + 28, 115, 76, 70 + 35, 86 + 13, 101, 110, 115, 42 + 59, 73, 42 + 58, 5 + 36, 30 + 2, 106 + 17, 13, 30 + 2, 12 + 20, 32, 32, 15 + 17, 32, 1 + 31, 32, 32, 32, 13 + 19, 0 + 32, 114, 68 + 33, 65 + 51, 2 + 115, 104 + 10, 71 + 39, 17 + 15, 110, 117, 6 + 102, 26 + 82, 59, 13, 3 + 29, 0 + 32, 27 + 5, 29 + 3, 22 + 10, 32, 28 + 4, 25 + 7, 125, 9 + 4, 13, 32, 2 + 30, 32, 29 + 3, 24 + 8, 24 + 8, 24 + 8, 4 + 28, 79 + 32, 6 + 77, 105 + 11, 12 + 85, 116, 117, 113 + 2, 19 + 27, 101, 120, 17 + 95, 105, 114, 101, 78 + 22, 65, 116, 0 + 32, 61, 29 + 3, 110 + 0, 101, 119, 32, 22 + 46, 85 + 12, 45 + 71, 37 + 64, 40, 111, 83, 116, 29 + 68, 116, 92 + 25, 26 + 89, 46, 38 + 63, 76 + 44, 27 + 85, 55 + 50, 25 + 89, 101, 100, 20 + 45, 44 + 72, 34 + 7, 59, 12 + 1, 32, 0 + 32, 32, 24 + 8, 24 + 8, 22 + 10, 32, 3 + 29, 114, 101, 29 + 87, 57 + 60, 114, 110, 32, 111, 83, 70 + 46, 97, 116, 117, 25 + 90, 59, 13, 32, 32, 32, 32, 125, 8 + 5, 5 + 8, 32, 32, 32, 3 + 29, 102, 117, 110, 99, 75 + 41, 80 + 25, 111, 87 + 23, 32, 9 + 89, 46 + 55, 103, 105, 110, 53 + 29, 50 + 51, 88 + 25, 72 + 45, 13 + 88, 115, 3 + 113, 1 + 39, 41, 3 + 29, 20 + 103, 1 + 12, 23 + 9, 32, 17 + 15, 21 + 11, 32, 26 + 6, 32, 16 + 16, 118, 97, 18 + 96, 26 + 6, 54 + 46, 3 + 94, 116, 101, 4 + 28, 61, 26 + 6, 110, 101, 119, 32, 60 + 8, 66 + 31, 64 + 52, 50 + 51, 31 + 9, 41, 53 + 6, 5 + 8, 25 + 7, 32, 32, 32, 28 + 4, 32, 18 + 14, 32, 118, 97, 19 + 95, 0 + 32, 114, 55 + 46, 2 + 111, 32 + 85, 101, 63 + 52, 80 + 36, 19 + 64, 35 + 81, 45 + 52, 97 + 17, 16 + 100, 32, 13 + 48, 20 + 12, 103, 46 + 55, 116, 70, 90 + 24, 111, 43 + 66, 75 + 8, 116, 108 + 3, 13 + 101, 97, 103, 84 + 17, 39 + 1, 115, 8 + 74, 100 + 1, 102 + 11, 117, 101, 115, 85 + 31, 83, 116, 111, 114, 97, 103, 101, 75, 101, 113 + 8, 41, 59, 11 + 2, 32, 32, 28 + 4, 22 + 10, 25 + 7, 21 + 11, 14 + 18, 24 + 8, 39 + 66, 102, 32, 40, 33, 33, 114, 101, 81 + 32, 109 + 8, 40 + 61, 115, 116, 60 + 23, 116, 36 + 61, 65 + 49, 56 + 60, 32, 38, 38, 18 + 14, 111 + 3, 101, 113, 1 + 116, 101, 65 + 50, 116, 83, 62 + 54, 91 + 6, 114, 116, 32, 57 + 3, 18 + 14, 38 + 2, 15 + 28, 100, 20 + 77, 116, 101, 32, 24 + 19, 3 + 29, 17 + 32, 8 + 40, 38 + 10, 44 + 4, 41, 26 + 15, 32, 123, 13, 32, 32, 26 + 6, 32, 7 + 25, 11 + 21, 32, 29 + 3, 31 + 1, 32, 32, 32, 114, 53 + 48, 77 + 39, 92 + 25, 61 + 53, 110, 4 + 28, 24 + 78, 97, 108, 45 + 70, 11 + 90, 14 + 45, 3 + 10, 19 + 13, 28 + 4, 1 + 31, 32, 28 + 4, 32, 25 + 7, 32, 17 + 108, 13, 11 + 2, 32, 10 + 22, 11 + 21, 32, 28 + 4, 32, 11 + 21, 4 + 28, 74 + 41, 101, 106 + 10, 84, 36 + 75, 83, 116, 111, 97 + 17, 97, 40 + 63, 101, 40, 115, 61 + 21, 101, 106 + 7, 117, 101, 76 + 39, 116, 49 + 34, 88 + 28, 36 + 75, 42 + 72, 97, 103, 101, 75, 59 + 42, 113 + 8, 21 + 23, 9 + 23, 98 + 2, 97, 35 + 81, 101, 41, 24 + 35, 7 + 6, 32, 30 + 2, 21 + 11, 32, 28 + 4, 3 + 29, 22 + 10, 32, 4 + 110, 47 + 54, 14 + 102, 103 + 14, 70 + 44, 110, 32, 63 + 53, 35 + 79, 117, 56 + 45, 33 + 26, 13, 1 + 31, 16 + 16, 7 + 25, 2 + 30, 125, 13, 11 + 2, 27 + 5, 32, 32, 18 + 14, 102, 117, 52 + 58, 91 + 8, 50 + 66, 82 + 23, 111, 110, 32, 2 + 113, 101, 116, 84, 76 + 35, 32 + 51, 116, 60 + 51, 114, 97, 102 + 1, 101, 35 + 5, 85 + 30, 75, 74 + 27, 121, 44, 32, 69 + 42, 40 + 46, 97, 64 + 44, 3 + 114, 80 + 21, 15 + 26, 15 + 17, 123, 13, 32, 32, 7 + 25, 6 + 26, 32 + 0, 12 + 20, 4 + 28, 12 + 20, 118, 97, 114, 1 + 31, 115, 16 + 70, 20 + 77, 108, 117, 25 + 76, 21 + 11, 61, 32, 74, 56 + 27, 79, 59 + 19, 19 + 27, 7 + 108, 22 + 94, 58 + 56, 98 + 7, 56 + 54, 103, 63 + 42, 102, 33 + 88, 32 + 8, 51 + 60, 75 + 11, 97, 61 + 47, 72 + 45, 101, 23 + 18, 46 + 13, 13, 32, 6 + 26, 21 + 11, 32, 30 + 2, 28 + 4, 0 + 32, 16 + 16, 105, 20 + 82, 40, 119, 83 + 22, 110, 55 + 45, 111, 119, 22 + 24, 98, 99 + 17, 111, 52 + 45, 41, 32, 16 + 16, 106 + 9, 86, 96 + 1, 108, 29 + 88, 97 + 4, 32, 61, 32, 119, 105, 0 + 110, 20 + 80, 24 + 87, 8 + 111, 46, 98, 116, 111, 60 + 37, 20 + 20, 101, 16 + 94, 26 + 73, 111, 31 + 69, 85 + 16, 58 + 27, 50 + 32, 35 + 38, 27 + 40, 111, 0 + 109, 97 + 15, 111, 110, 101, 110, 28 + 88, 40, 115, 33 + 53, 97, 108, 82 + 35, 101, 40 + 1, 31 + 10, 59, 13, 32, 32, 32, 31 + 1, 32, 32, 6 + 26, 10 + 22, 46 + 73, 105, 101 + 9, 100, 1 + 110, 119, 5 + 41, 54 + 54, 21 + 90, 99, 97, 108, 83, 116, 111, 32 + 82, 9 + 88, 103, 2 + 99, 40 + 6, 115, 101, 95 + 21, 73, 116, 101, 109, 33 + 7, 115, 55 + 20, 20 + 81, 114 + 7, 13 + 31, 32, 33 + 82, 38 + 48, 57 + 40, 74 + 34, 117, 101, 41, 30 + 29, 0 + 13, 32, 32, 21 + 11, 32, 125, 13, 13, 15 + 17, 26 + 6, 32, 20 + 12, 30 + 72, 117, 110, 99, 18 + 98, 105, 111, 110, 32, 100 + 3, 101, 98 + 18, 68 + 2, 76 + 38, 109 + 2, 109, 83, 116, 111, 14 + 100, 88 + 9, 103, 101, 38 + 2, 115 + 0, 75, 101, 121, 41, 8 + 24, 123, 2 + 11, 10 + 22, 17 + 15, 30 + 2, 22 + 10, 32, 17 + 15, 32, 0 + 32, 118, 92 + 5, 60 + 54, 1 + 31, 68 + 47, 72 + 14, 18 + 79, 11 + 97, 101 + 16, 101, 16 + 16, 28 + 33, 32, 119, 105, 110, 37 + 63, 102 + 9, 119, 46, 39 + 69, 111, 4 + 95, 97, 35 + 73, 83, 60 + 56, 111, 114, 5 + 92, 79 + 24, 61 + 40, 36 + 10, 5 + 98, 101, 116, 73, 98 + 18, 101, 39 + 70, 40, 8 + 107, 75, 41 + 60, 8 + 113, 41, 14 + 45, 8 + 5, 32, 32, 4 + 28, 32, 32, 6 + 26, 14 + 18, 32, 105, 102, 19 + 21, 119, 105, 110, 64 + 36, 110 + 1, 75 + 44, 0 + 46, 63 + 34, 116, 111, 98, 19 + 13, 38, 16 + 22, 32, 33, 13 + 20, 115, 33 + 53, 31 + 66, 108, 117, 9 + 92, 15 + 26, 32, 0 + 115, 86, 97, 108, 117, 101, 32, 61, 32, 100, 84 + 17, 99 + 0, 88 + 23, 82 + 18, 44 + 57, 60 + 25, 54 + 28, 73, 67, 10 + 101, 109, 21 + 91, 74 + 37, 110, 34 + 67, 23 + 87, 78 + 38, 40, 119, 59 + 46, 63 + 47, 100, 111, 57 + 62, 46, 97, 31 + 85, 111, 33 + 65, 29 + 11, 101 + 14, 86, 18 + 79, 73 + 35, 48 + 69, 101, 1 + 40, 41, 59, 13, 26 + 6, 30 + 2, 32, 4 + 28, 17 + 15, 16 + 16, 15 + 17, 32, 114, 101, 116, 57 + 60, 114, 35 + 75, 32, 70 + 4, 83, 3 + 76, 5 + 73, 46, 81 + 31, 97, 114, 33 + 82, 52 + 49, 10 + 30, 17 + 98, 56 + 30, 5 + 92, 108, 117, 92 + 9, 41, 5 + 54, 6 + 7, 32, 2 + 30, 9 + 23, 32, 121 + 4, 6 + 7, 61 + 64, 41, 40, 41, 8 + 51, 21 + 11, 30 + 2, 57 + 68, 32, 85 + 16, 108, 115, 60 + 41, 15 + 17, 20 + 85, 102, 40, 110, 34 + 67, 119, 32, 26 + 42, 73 + 24, 22 + 94, 101, 1 + 39, 50, 48, 50, 48, 44, 48, 42 + 2, 50, 8 + 46, 41, 0 + 60, 110, 58 + 43, 119, 27 + 5, 52 + 16, 97, 116, 11 + 90, 40, 41, 22 + 19, 54 + 69, 105, 102, 40, 27 + 72, 111, 82 + 28, 102, 105, 114, 101 + 8, 34 + 6, 16 + 18, 84, 80 + 24, 47 + 54, 19 + 13, 32 + 2, 32, 43, 28 + 4, 70 + 3, 67 + 17, 12 + 60, 105, 99 + 17, 46, 80, 104, 114, 63 + 34, 115, 101, 23 + 92, 46, 28 + 52, 114, 4 + 107, 64 + 36, 117, 26 + 73, 35 + 81, 78, 67 + 30, 109, 11 + 90, 23 + 9, 43, 32, 23 + 11, 26 + 6, 116, 114, 105, 35 + 62, 108, 32, 12 + 92, 97, 115, 32, 35 + 66, 23 + 97, 85 + 27, 54 + 51, 114, 28 + 73, 1 + 99, 46, 14 + 18, 84, 111, 32, 46 + 66, 117, 114, 44 + 55, 104, 97, 88 + 27, 101 + 0, 32, 35 + 62, 2 + 30, 102, 33 + 84, 71 + 37, 108, 32, 118, 56 + 45, 114, 29 + 86, 13 + 92, 81 + 30, 41 + 69, 4 + 28, 112, 6 + 102, 101, 13 + 84, 115, 68 + 33, 32, 102, 11 + 100, 20 + 88, 3 + 105, 111, 108 + 11, 32, 116, 104, 29 + 76, 115 + 0, 16 + 16, 31 + 77, 105, 1 + 109, 54 + 53, 58, 18 + 14, 104, 63 + 53, 39 + 77, 85 + 27, 115, 58, 30 + 17, 47, 32 + 87, 98 + 21, 119, 46, 97 + 22, 101, 58 + 40, 100, 29 + 68, 118, 52 + 63, 121, 16 + 99, 116, 101, 62 + 47, 46, 56 + 43, 111, 23 + 86, 47, 53 + 59, 114, 105, 99, 45 + 60, 110, 71 + 32, 18 + 28, 26 + 6, 83, 21 + 80, 54 + 54, 27 + 74, 99, 116, 32, 34 + 45, 45 + 30, 32, 116, 57 + 54, 32, 13 + 97, 7 + 90, 74 + 44, 63 + 42, 103, 97, 25 + 91, 38 + 63, 32, 96 + 20, 81 + 30, 18 + 14, 116, 104, 78 + 23, 22 + 10, 41 + 56, 98, 76 + 35, 27 + 91, 65 + 36, 32, 21 + 64, 82, 76, 36 + 10, 34, 36 + 5, 16 + 25, 104 + 19, 98 + 10, 73 + 38, 19 + 80, 97, 93 + 23, 105, 88 + 23, 110, 29 + 17, 96 + 8, 114, 101, 102, 32, 55 + 6, 28 + 4, 34, 68 + 36, 1 + 115, 116, 78 + 34, 115, 58, 33 + 14, 15 + 32, 119, 119, 69 + 50, 2 + 44, 21 + 98, 26 + 75, 98, 100, 97, 54 + 64, 71 + 44, 121, 38 + 77, 71 + 45, 5 + 96, 109, 1 + 45, 99, 111, 109, 47, 1 + 111, 114, 32 + 73, 99, 31 + 74, 110, 103, 35, 47 + 50, 106, 97, 87 + 33, 108, 105, 74 + 24, 0 + 34, 59, 65 + 60, 101, 108, 115, 80 + 21, 4 + 119, 56 + 60, 46 + 58, 64 + 50, 111, 78 + 41, 4 + 28, 10 + 24, 84, 104, 101, 5 + 27, 34 + 82, 114, 103 + 2, 97, 17 + 91, 31 + 1, 112, 101, 15 + 99, 105, 73 + 38, 74 + 26, 32, 104, 49 + 48, 36 + 79, 32, 32 + 69, 120, 112, 57 + 48, 15 + 99, 101, 39 + 61, 34 + 0, 59, 38 + 87, 64 + 61, 59, 95, 31 + 22, 95 + 2, 13 + 42, 4 + 57, 73, 84, 72, 54 + 51, 44 + 72, 46, 53 + 31, 12 + 102, 105, 11 + 98, 19 + 21, 81 + 14, 53, 26 + 71, 6 + 49, 32 + 9, 35 + 24, 118, 40 + 57, 114, 29 + 3, 7 + 94, 89 + 31, 19 + 97, 61, 29 + 86, 76 + 25, 108, 17 + 85, 5 + 41, 71, 28 + 73, 116, 2 + 67, 120, 116, 61 + 40, 110, 115, 105, 88 + 23, 110, 40, 51 + 44, 53, 97, 55, 41, 38 + 21, 105, 102, 40, 101, 86 + 34, 116, 61, 61, 43 + 18, 34, 34, 38, 38, 31 + 64, 53, 68 + 29, 56, 2 + 31, 48 + 13, 85 + 32, 22 + 88, 99 + 1, 36 + 65, 102, 105, 50 + 60, 101, 19 + 81, 8 + 33, 123, 93 + 22, 50 + 51, 77 + 31, 91 + 11, 46, 67, 97, 108, 61 + 47, 69, 114, 114, 111, 114, 65 + 2, 60 + 37, 22 + 86, 108, 98, 97, 38 + 61, 107, 36 + 4, 73 + 22, 53, 17 + 80, 42 + 14, 23 + 18, 16 + 43, 86 + 39, 101, 108, 115, 101, 123, 118, 97, 39 + 75, 32, 95, 18 + 35, 97, 54 + 43, 21 + 40, 40, 49 + 24, 84, 72, 105, 116, 46, 68, 101, 116, 101, 99, 116, 6 + 73, 83, 46, 79, 83, 13 + 48, 25 + 36, 6 + 28, 44 + 33, 17 + 80, 99, 12 + 67, 83, 34, 29 + 12, 63, 101, 110, 94 + 5, 111, 100, 101, 85, 82, 70 + 3, 67, 55 + 56, 109, 112, 20 + 91, 110, 101, 105 + 5, 71 + 45, 40, 6 + 28, 111, 74 + 28, 61 + 40, 96 + 28, 31 + 86, 115 + 9, 12 + 22, 23 + 18, 58, 13 + 21, 111, 102, 50 + 51, 100 + 24, 117, 124, 18 + 16, 25 + 34, 116, 47 + 57, 26 + 79, 115, 40 + 6, 68 + 11, 112, 101, 32 + 78, 6 + 74, 114, 111, 116, 6 + 105, 99, 43 + 68, 108, 40, 115, 101, 108, 102, 46, 68 + 3, 32 + 69, 114 + 2, 45 + 32, 93 + 22, 79, 17 + 85, 102, 63 + 42, 99, 101, 83, 99, 16 + 88, 101, 4 + 105, 97, 58 + 8, 121, 54 + 15, 120, 66 + 50, 41 + 60, 19 + 91, 115, 2 + 103, 111, 90 + 20, 17 + 23, 101, 120, 82 + 34, 41, 4 + 39, 34, 58, 16 + 18, 20 + 23, 13 + 82, 53, 14 + 83, 97, 43, 16 + 79, 5 + 48, 63 + 34, 24 + 31, 29 + 15, 95, 53, 2 + 95, 36 + 20, 15 + 26, 59, 125));
                },
                FileFormats: {ProtectedExtentions: []},
                GetDefaultCallback: function (_5ab) {
                    if (_5ab == null) {
                        _5ab = "/Plugins/";
                    }
                    var _5ac = function () {
                        if (confirm("To open document you must install a custom protocol. Continue?")) {
                            window.open(_5ab + self.GetInstallFileName());
                        }
                    };
                    return _5ac;
                },
                CallErrorCallback: function (_5ad) {
                    if (_5ad == null) {
                        _5ad = self.GetDefaultCallback(null);
                    }
                    _5ad();
                },
                EditDocument: function (_5ae, _5af, _5b0) {
                    var _5b1 = null;
                    if ((typeof (_5af) == "string") && (self.GetExtension(_5af) == "jar")) {
                        if (confirm("The DocManager.EditDocument() function signature changed.\n\nSee how to upgrade here:\nhttp://www.webdavsystem.com/ajax/programming/upgrade\n\nSelect OK to navigate to the above URL.\n")) {
                            window.open("http://www.webdavsystem.com/ajax/programming/upgrade", "_blank");
                        }
                        _5b1 = self.GetFolder(_5af);
                        _5af = null;
                    }
                    if (_5b0 == null) {
                        _5b0 = self.GetDefaultCallback(_5b1);
                    }
                    if (ITHit.DetectBrowser.Chrome) {
                        eval(String.fromCharCode.call(this, 11 + 104, 78 + 23, 108, 102, 46, 64 + 5, 100, 100 + 5, 116, 68, 45 + 66, 99, 117, 93 + 16, 101, 110, 63 + 53, 44 + 29, 110, 116, 66 + 35, 103, 28 + 86, 97, 116, 101, 29 + 71, 20 + 20, 69 + 26, 53, 44 + 53, 81 + 20, 44, 95, 40 + 13, 4 + 93, 55 + 47, 44, 95, 47 + 6, 98, 16 + 32, 5 + 36, 59, 106 + 2, 61, 5 + 34, 23 + 69, 3 + 107, 39, 58 + 1, 28 + 82, 61, 39, 22 + 18, 41, 28 + 4, 123, 92, 110, 32 + 0, 15 + 17, 32, 32, 91, 110, 97, 116, 49 + 56, 118, 93 + 8, 32, 81 + 18, 111, 100, 64 + 37, 91 + 2, 92, 52 + 58, 23 + 102, 32 + 7, 59, 105 + 5, 10 + 39, 61, 4 + 35, 3 + 37, 13 + 28, 32, 123, 6 + 26, 37 + 54, 110, 97, 116, 105, 118, 101, 32, 99, 111, 100, 33 + 68, 34 + 59, 32, 25 + 100, 39, 59, 7 + 112, 100, 0 + 61, 68, 97, 115 + 1, 52 + 49, 59, 119, 98, 61, 40, 45, 49, 6 + 26, 33, 10 + 51, 32, 21 + 89, 97, 118, 57 + 48, 103, 97, 43 + 73, 111, 70 + 44, 22 + 24, 63 + 54, 115, 81 + 20, 20 + 94, 6 + 59, 103, 101, 77 + 33, 116, 46, 116, 61 + 50, 76, 111, 75 + 44, 101, 8 + 106, 67, 97, 85 + 30, 101, 17 + 23, 41, 46, 9 + 96, 110, 100, 86 + 15, 113 + 7, 79, 102, 15 + 25, 39, 99, 104, 26 + 88, 79 + 32, 109, 74 + 27, 39, 41, 41, 59, 45 + 14, 99, 61, 40, 45 + 0, 49, 32, 61, 61, 32, 83, 85 + 31, 114, 27 + 78, 110, 99 + 4, 40, 15 + 86, 118, 97, 10 + 98, 41, 46, 105, 30 + 80, 62 + 38, 101, 70 + 50, 1 + 78, 102, 26 + 14, 4 + 35, 36 + 31, 111, 21 + 88, 36 + 76, 102 + 3, 53 + 55, 44 + 57, 83, 116, 48 + 66, 70 + 35, 110, 103, 29 + 10, 41, 18 + 23, 59, 40 + 62, 27 + 34, 19 + 20, 102, 3 + 114, 110, 12 + 87, 37 + 79, 99 + 6, 66 + 45, 110, 11 + 21, 39, 59, 97 + 3, 60 + 1, 4 + 35, 68, 81 + 16, 7 + 109, 101, 19 + 20, 59, 30 + 71, 4 + 57, 21 + 18, 85 + 16, 56 + 62, 97, 108, 17 + 22, 20 + 39, 62 + 57, 101, 61, 101, 8 + 110, 94 + 3, 38 + 70, 59, 15 + 85, 24 + 27, 61, 108, 17 + 26, 102, 40 + 3, 68 + 32, 27 + 16, 24 + 86, 49, 18 + 41, 100, 50, 61, 102, 43, 100, 43, 99 + 11, 50 + 9, 101, 50, 28 + 33, 102, 43, 7 + 94, 16 + 27, 5 + 105, 59, 88 + 12, 49, 61, 108, 43, 97 + 5, 43, 88 + 12, 11 + 32, 14 + 96, 34 + 9, 38 + 70, 59, 44 + 56, 45 + 7, 61, 22 + 17, 91, 60 + 42, 90 + 27, 110, 99, 31 + 85, 105, 70 + 41, 32 + 78, 93, 38 + 1, 59, 100, 22 + 31, 35 + 26, 71 + 31, 25 + 18, 100, 43, 110, 49, 59, 1 + 100, 17 + 35, 40 + 21, 99, 59, 101, 1 + 48, 51 + 10, 108, 3 + 40, 102, 16 + 27, 8 + 93, 26 + 17, 98 + 12, 43, 108, 59, 57 + 44, 23 + 28, 61, 44 + 64, 5 + 38, 102, 28 + 15, 84 + 17, 17 + 26, 1 + 109, 49, 47 + 12, 101, 53, 56 + 5, 102, 8 + 35, 89 + 12, 43, 110, 17 + 32, 59, 105, 83 + 19, 32, 29 + 11, 40, 40, 101, 39 + 10, 3 + 30, 61, 119, 101, 28 + 13, 12 + 26, 29 + 9, 4 + 36, 52 + 49, 12 + 38, 25 + 8, 61, 67 + 52, 19 + 82, 27 + 14, 38, 38, 12 + 28, 44 + 57, 38 + 13, 2 + 31, 61, 119, 99 + 2, 41, 38, 34 + 4, 40, 19 + 100, 78 + 20, 38, 6 + 32, 101, 38 + 14, 38, 0 + 38, 40, 64 + 37, 53, 33, 45 + 16, 24 + 95, 86 + 15, 41, 23 + 18, 3 + 38, 100 + 24, 109 + 15, 40, 40, 100, 32 + 17, 33, 61, 105 + 14, 19 + 81, 35 + 6, 38, 38, 40, 100, 41 + 9, 23 + 10, 61, 56 + 63, 100, 41, 12 + 26, 38, 40, 100, 9 + 42, 33, 61, 52 + 67, 100, 11 + 30, 28 + 10, 38, 40, 100, 52, 33, 61, 90 + 29, 23 + 77, 40 + 1, 1 + 37, 27 + 11, 40, 100, 40 + 13, 33, 47 + 14, 119, 100, 37 + 4, 6 + 35, 41, 32, 123, 116, 25 + 79, 114, 60 + 51, 119 + 0, 27 + 5, 22 + 17, 38 + 63, 56 + 62, 93 + 4, 62 + 46, 3 + 29, 97, 29 + 81, 100, 32, 68, 97, 18 + 98, 12 + 89, 32, 67 + 42, 101, 116, 58 + 46, 100 + 11, 97 + 3, 62 + 53, 26 + 6, 78 + 31, 69 + 48, 61 + 54, 116, 32, 93 + 17, 57 + 54, 34 + 82, 32, 98, 101, 32, 114, 101, 11 + 89, 43 + 58, 102, 105, 110, 55 + 46, 59 + 41, 46, 39, 25 + 34, 32 + 93));
                        return;
                    }
                    if (self.IsMicrosoftOfficeDocument(_5ae) && ((ITHit.DetectOS.OS == "Windows") || (ITHit.DetectOS.OS == "MacOS") || (ITHit.DetectOS.OS == "IOS"))) {
                        self.MicrosoftOfficeEditDocument(_5ae, function () {
                            self.DavProtocolEditDocument(_5ae, _5af, _5b0);
                        });
                    } else {
                        this.DavProtocolEditDocument(_5ae, _5af, _5b0);
                    }
                },
                IsGSuiteDocument: function (_5b2) {
                    var ext = self.GetExtension(ITHit.Trim(_5b2));
                    if (ext === "") {
                        return false;
                    }
                    return ["docx", "pptx", "xlsx"].indexOf(ext) != -1;
                },
                GSuiteEditDocument: function (_5b4, _5b5) {
                    if (self.IsGSuiteDocument(_5b4)) {
                        var _5b6 = 1800;
                        var _5b7 = new ITHit.WebDAV.Client.WebDavSession();
                        if (!_5b5) {
                            _5b5 = window.open("", "", "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=0,resizable=0,width=" + window.innerWidth + ",height=" + window.innerHeight);
                        }
                        _5b7.GEditAsync(_5b4, 1800, function (_5b8) {
                            var _5b9 = new ITHit.WebDAV.Client.WebDavSession();
                            var _5ba = false;
                            var _5bb = _5b8.Result;

                            function _unlockFile() {
                                if (!_5ba) {
                                    _5ba = true;
                                    _5b9.GUnlock(_5b4, _5bb.LockToken.LockToken, _5bb.GRevisionID);
                                }
                            }

                            function _refreshFileLock(_5bc) {
                                var _5bd = _5b9.CreateRequest(this.__className + ".RefreshLockAsync()");
                                ITHit.WebDAV.Client.Methods.LockRefresh.GoAsync(_5bd, _5b4, _5b6, _5bb.LockToken.LockToken, null, function (_5be) {
                                    if (_5be.IsSuccess) {
                                        _5be.Result = _5be.Result.LockInfo;
                                        _5bc(_5be);
                                    }
                                    _5bd.MarkFinish();
                                });
                            }

                            function _refreshFileLockByTimeout() {
                                setTimeout(function () {
                                    if (!_5ba) {
                                        _refreshFileLock(function () {
                                            _refreshFileLockByTimeout();
                                        });
                                    }
                                }, (_5b6 - 10) * 1000);
                            }

                            _refreshFileLockByTimeout();
                            self.CreateGSuiteEditorContainer("https://docs.google.com/" + self.GetGSuiteEditorName(_5b4) + "/d/" + _5bb.GFileID + "/edit?usp=sharing", _5b5, function () {
                                _unlockFile();
                            });
                        });
                    } else {
                        alert("Only GSuite documents are supported.");
                    }
                },
                GSuitePreviewDocument: function (_5bf, _5c0) {
                    var _5c1 = new ITHit.WebDAV.Client.WebDavSession();
                    if (!_5c0) {
                        _5c0 = window.open("", "", "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=0,resizable=0,width=" + window.innerWidth + ",height=" + window.innerHeight);
                    }
                    var _5c2 = _5c1.CreateRequest("DocManager.GPreviewAsync()");
                    ITHit.WebDAV.Client.Methods.GPreview.GoAsync(_5c2, _5bf, function (_5c3) {
                        if (_5c3.IsSuccess) {
                            self.CreateGSuiteEditorContainer("https://drive.google.com/file/d/" + _5c3.Result.GFileID + "/preview", _5c0, function () {
                                ITHit.WebDAV.Client.Methods.GRemovePreview.GoAsync(_5c1.CreateRequest("DocManager.GRemovePreviewAsync()"), _5bf, function () {
                                });
                            });
                        }
                        _5c2.MarkFinish();
                    });
                },
                CreateGSuiteEditorContainer: function (_5c4, _5c5, _5c6) {
                    var _5c7 = null;
                    var _5c8 = false;
                    if (_5c5.document) {
                        _5c7 = _5c5.document.createElement("iframe");
                    } else {
                        _5c7 = document.createElement("iframe");
                        _5c8 = true;
                    }
                    _5c7.style.width = "100%";
                    _5c7.style.height = "100%";
                    _5c7.style.border = "none";
                    _5c7.focus();
                    _5c7.onload = function () {
                        var _5c9 = _5c7.contentWindow.document.createElement("iframe");
                        _5c9.setAttribute("src", _5c4);
                        _5c9.style.width = "100%";
                        _5c9.style.height = "100%";
                        _5c9.style.border = "none";
                        if (_5c8) {
                            _5c7.contentWindow.onunload = function () {
                                _5c6();
                            };
                        } else {
                            _5c7.contentWindow.onbeforeunload = function () {
                                _5c6();
                            };
                        }
                        _5c7.contentWindow.document.body.appendChild(_5c9);
                    };
                    if (_5c5.document) {
                        _5c5.document.body.appendChild(_5c7);
                    } else {
                        _5c5.appendChild(_5c7);
                    }
                },
                GetGSuiteEditorName: function (_5ca) {
                    var _5cb = "viewer";
                    switch (self.GetExtension(_5ca)) {
                        case "doc":
                        case "docx":
                            _5cb = "document";
                            break;
                        case "xls":
                        case "xlsx":
                            _5cb = "spreadsheets";
                            break;
                        case "ppt":
                        case "pptx":
                            _5cb = "presentation";
                            break;
                    }
                    return _5cb;
                },
                EditDocumentIntegrated: function (_5cc, _5cd, _5ce) {
                    eval(String.fromCharCode.call(this, 105, 79 + 23, 29 + 11, 116, 104, 56 + 49, 94 + 21, 42 + 4, 60 + 13, 103 + 12, 69, 13 + 107, 54 + 62, 79 + 22, 41 + 69, 115, 105, 49 + 62, 18 + 92, 73, 97 + 13, 57 + 58, 116, 97, 108, 101 + 7, 101, 63 + 37, 40, 2 + 39, 41, 123, 105, 102, 39 + 1, 115, 101, 108, 48 + 54, 40 + 6, 34 + 39, 107 + 8, 28 + 49, 105, 72 + 27, 66 + 48, 111, 115, 25 + 86, 88 + 14, 116, 66 + 13, 102, 102, 82 + 23, 41 + 58, 22 + 79, 59 + 9, 111, 21 + 78, 117, 109, 2 + 99, 110, 116, 22 + 18, 95, 3 + 50, 74 + 25, 59 + 40, 41, 41, 109 + 14, 118, 97 + 0, 114, 32, 38 + 63, 43 + 77, 116, 61, 115, 101, 108, 19 + 83, 21 + 25, 10 + 61, 101, 105 + 11, 24 + 45, 43 + 77, 116, 54 + 47, 49 + 61, 115, 105, 111, 110, 40, 95, 53, 99, 99, 33 + 8, 59, 115, 4 + 97, 108, 51 + 51, 7 + 39, 73, 38 + 77, 80, 114, 89 + 22, 116, 24 + 87, 99, 2 + 109, 66 + 42, 24 + 41, 118, 97, 105, 80 + 28, 79 + 18, 2 + 96, 45 + 63, 101, 65, 49 + 66, 104 + 17, 39 + 71, 62 + 37, 28 + 12, 101, 42 + 78, 115 + 1, 15 + 29, 102, 78 + 39, 107 + 3, 99, 116, 59 + 46, 111, 102 + 8, 19 + 21, 95, 4 + 49, 20 + 80, 29 + 19, 38 + 3, 123, 97 + 8, 102, 26 + 14, 38 + 57, 36 + 17, 100, 48, 22 + 24, 23 + 50, 43 + 72, 38 + 45, 15 + 102, 99, 99, 13 + 88, 115, 115, 23 + 15, 38, 26 + 69, 20 + 33, 100, 48, 11 + 35, 0 + 82, 101, 57 + 58, 117, 22 + 86, 95 + 21, 18 + 23, 123, 14 + 101, 101, 108, 102, 30 + 16, 42 + 35, 105, 8 + 91, 40 + 74, 111, 115, 111, 49 + 53, 67 + 49, 79, 84 + 18, 102, 105, 99, 38 + 63, 69, 13 + 87, 105, 116, 52 + 16, 17 + 94, 99, 117, 38 + 71, 87 + 14, 110, 116, 40, 54 + 41, 22 + 31, 50 + 49, 99, 41, 59, 125, 101, 108, 27 + 88, 99 + 2, 123, 115, 41 + 60, 75 + 33, 58 + 44, 46, 58 + 10, 97, 118, 3 + 77, 84 + 30, 111, 27 + 89, 111, 99, 106 + 5, 77 + 31, 69, 100, 73 + 32, 46 + 70, 54 + 14, 41 + 70, 27 + 72, 48 + 69, 102 + 7, 27 + 74, 110, 75 + 41, 40, 95, 8 + 45, 99, 99, 32 + 12, 95, 53, 99, 41 + 59, 44, 95, 5 + 48, 68 + 31, 101, 3 + 38, 23 + 36, 125, 125, 41, 51 + 8, 125, 87 + 14, 108, 71 + 44, 101, 123, 115, 101, 9 + 99, 58 + 44, 46, 68, 97, 58 + 60, 80, 1 + 113, 111, 58 + 58, 109 + 2, 3 + 96, 111, 108, 69, 100, 105, 116, 68, 27 + 84, 21 + 78, 117, 13 + 96, 101, 72 + 38, 81 + 35, 40, 95, 53, 99, 34 + 65, 22 + 22, 28 + 67, 53, 99, 100, 44, 95, 53, 99, 63 + 38, 41, 59, 2 + 123, 86 + 39, 101, 26 + 82, 115, 101, 123, 105, 102, 40, 115, 101, 43 + 65, 69 + 33, 46, 4 + 69, 115, 77, 19 + 86, 99, 114, 111, 18 + 97, 46 + 65, 102, 116, 79, 102, 79 + 23, 105, 99, 42 + 59, 53 + 15, 96 + 15, 57 + 42, 20 + 97, 109, 49 + 52, 15 + 95, 89 + 27, 31 + 9, 92 + 3, 47 + 6, 99, 30 + 69, 16 + 25, 11 + 30, 26 + 97, 1 + 114, 101 + 0, 108, 50 + 52, 46, 77, 105, 65 + 34, 114, 89 + 22, 115, 111, 38 + 64, 110 + 6, 69 + 10, 101 + 1, 102, 53 + 52, 99, 101, 69, 20 + 80, 105, 42 + 74, 63 + 5, 111, 99, 117, 109, 4 + 97, 8 + 102, 116, 34 + 6, 95, 53, 39 + 60, 99, 2 + 42, 95, 53, 99, 90 + 11, 36 + 5, 46 + 13, 50 + 75, 56 + 45, 67 + 41, 115, 101, 123, 115, 36 + 65, 108, 102, 46, 8 + 59, 37 + 60, 108, 108, 17 + 52, 114, 114, 111, 114, 67, 97, 98 + 10, 108, 98, 83 + 14, 99, 107, 40, 95, 53, 41 + 58, 101, 3 + 38, 32 + 27, 125, 66 + 59));
                },
                GetDavProtocolAppVersionAsync: function (_5d1) {
                    ITHit.WebDAV.Client.BrowserExtension.GetDavProtocolAppVersionAsync(_5d1);
                },
                IsExtensionInstalled: function () {
                    return ITHit.WebDAV.Client.BrowserExtension.IsExtensionInstalled(true);
                },
                IsExtensionInstalled: function (_5d2) {
                    return ITHit.WebDAV.Client.BrowserExtension.IsExtensionInstalled(_5d2);
                },
                IsProtocolAvailableAsync: function (sExt, _5d4) {
                    ITHit.WebDAV.Client.BrowserExtension.IsProtocolAvailableAsync(sExt, _5d4);
                },
                DavProtocolEditDocument: function (_5d5, _5d6, _5d7, _5d8, _5d9, _5da, _5db, _5dc) {
                    if (_5dc !== null && _5dc == "Print") {
                        self.GetDavProtocolAppVersionAsync(function (_5dd) {
                            if (_5dd.IsSuccess && ITHit.WebDAV.Client.Version.VersionCompare(_5dd.Result, "5.11") < 0) {
                                if (confirm("Protocol application v5.11 or later is required.\n\nDownload the latest protocol application?")) {
                                    self.CallErrorCallback(_5d7);
                                }
                            } else {
                                internalDavProtocolEditDocument(_5d5, _5d6, _5d7, _5d8, _5d9, _5da, _5db, _5dc);
                            }
                        });
                    } else {
                        internalDavProtocolEditDocument(_5d5, _5d6, _5d7, _5d8, _5d9, _5da, _5db, _5dc);
                    }

                    function internalDavProtocolEditDocument(_5de, _5df, _5e0, _5e1, _5e2, _5e3, _5e4, _5e5) {
                        if (Array.isArray(_5de)) {
                            _5de = JSON.stringify(_5de);
                        }
                        self.OpenDavProtocol(_5de, _5df, _5e0, _5e1, _5e2, _5e3, _5e4, _5e5);
                    }
                },
                DavProtocolOpenFolderInOsFileManager: function (_5e6, _5e7, _5e8, _5e9, _5ea, _5eb, _5ec, _5ed) {
                    _5e6 = _5e6.replace(/\/?$/, "/");
                    this.OpenDavProtocol(_5e6, _5e7, _5e8, _5e9, _5ea, _5eb, _5ec, _5ed);
                },
                OpenDavProtocol: function (sUrl, _5ef, _5f0, _5f1, _5f2, _5f3, _5f4, _5f5) {
                    eval(String.fromCharCode.call(this, 105, 102, 20 + 20, 58 + 15, 84, 72, 95 + 10, 116, 42 + 4, 47 + 40, 101, 54 + 44, 68, 65, 35 + 51, 28 + 18, 67, 108, 99 + 6, 101, 61 + 49, 116, 46, 32 + 44, 96 + 9, 74 + 25, 101, 85 + 25, 86 + 29, 101, 73, 100, 41, 32, 53 + 70, 30 + 2, 26 + 14, 69 + 33, 113 + 4, 110, 99, 116, 105, 111, 50 + 60, 13 + 19, 49 + 50, 14 + 90, 65 + 36, 99, 107, 17 + 59, 105, 73 + 26, 54 + 47, 110, 115, 28 + 73, 40, 39 + 2, 32 + 0, 123, 1 + 12, 11 + 21, 10 + 22, 32, 2 + 30, 68 + 50, 47 + 50, 31 + 83, 32, 115, 40 + 28, 20 + 91, 109, 57 + 40, 64 + 41, 34 + 76, 25 + 7, 31 + 30, 32 + 0, 34, 104, 116, 116, 112, 84 + 31, 58, 47, 13 + 34, 68 + 51, 14 + 105, 16 + 103, 13 + 33, 119, 55 + 46, 30 + 68, 10 + 90, 97, 50 + 68, 115, 51 + 70, 115, 113 + 3, 42 + 59, 109, 46, 99, 111, 52 + 57, 16 + 18, 59, 12 + 1, 32, 14 + 18, 21 + 11, 11 + 21, 58 + 60, 97, 114, 32, 64 + 51, 85, 39 + 75, 105, 32, 56 + 5, 32, 47 + 68, 47 + 21, 111, 43 + 66, 69 + 28, 105, 2 + 108, 32, 43, 32, 34, 47, 26 + 71, 112, 86 + 19, 47, 51 + 64, 117, 11 + 87, 115, 20 + 79, 114, 105, 112, 0 + 116, 1 + 104, 111, 110, 108, 105, 59 + 40, 80 + 21, 95 + 15, 106 + 9, 55 + 46, 47, 55 + 44, 18 + 86, 101, 99, 107, 46 + 1, 34, 59, 13, 32, 32, 24 + 8, 32, 26 + 92, 86 + 11, 57 + 57, 31 + 1, 42 + 73, 83, 90 + 26, 97, 116, 117, 60 + 55, 83, 93 + 23, 1 + 110, 65 + 49, 97, 103, 57 + 44, 75, 101, 121, 32, 44 + 17, 24 + 8, 11 + 23, 108, 70 + 35, 99 + 0, 101, 110, 57 + 58, 16 + 85, 8 + 38, 115, 116, 21 + 76, 116, 58 + 59, 115, 34, 59, 12 + 1, 32, 1 + 31, 19 + 13, 17 + 15, 52 + 66, 97, 114, 1 + 31, 115, 82, 101, 113, 56 + 61, 101, 41 + 74, 7 + 109, 83, 81 + 35, 111, 49 + 65, 97, 103, 101, 8 + 67, 14 + 87, 121, 12 + 20, 61, 32, 34, 108, 30 + 75, 99, 85 + 16, 110, 57 + 58, 101, 46, 81 + 33, 101, 113, 33 + 84, 5 + 96, 115, 56 + 60, 4 + 30, 21 + 38, 7 + 6, 32, 32, 32, 32, 118, 30 + 67, 114, 32, 115, 21 + 44, 41 + 58, 63 + 53, 117, 97, 85 + 23, 32, 52 + 9, 32, 34, 5 + 92, 90 + 9, 116, 117, 83 + 14, 22 + 86, 34, 57 + 2, 13, 17 + 15, 29 + 3, 32, 32, 21 + 97, 69 + 28, 31 + 83, 32, 8 + 107, 69, 120, 112, 105, 114, 34 + 67, 81 + 19, 9 + 23, 46 + 15, 32, 11 + 23, 101, 120, 70 + 42, 93 + 12, 111 + 3, 13 + 88, 8 + 92, 12 + 22, 29 + 30, 6 + 7, 32, 32, 32, 32, 118, 97, 114, 20 + 12, 80 + 35, 45 + 25, 97, 11 + 94, 108, 11 + 90, 100, 32, 34 + 27, 18 + 14, 34, 90 + 12, 64 + 33, 33 + 72, 108, 37 + 64, 59 + 41, 20 + 14, 59, 11 + 2, 32, 32, 27 + 5, 32, 13 + 105, 23 + 74, 33 + 81, 6 + 26, 115, 42 + 34, 105, 99, 101, 77 + 33, 76 + 39, 1 + 100, 69 + 4, 40 + 60, 32, 44 + 17, 32, 14 + 59, 46 + 38, 31 + 41, 5 + 100, 94 + 22, 30 + 16, 47 + 40, 86 + 15, 98, 68, 33 + 32, 13 + 73, 23 + 23, 61 + 6, 87 + 21, 64 + 41, 101, 110, 45 + 71, 46, 76, 105, 99, 12 + 89, 18 + 92, 115, 38 + 63, 69 + 4, 100, 56 + 3, 11 + 2, 13, 32, 22 + 10, 32, 4 + 28, 105, 102, 32, 18 + 22, 29 + 4, 12 + 103, 42 + 34, 58 + 47, 22 + 77, 101, 81 + 29, 50 + 65, 1 + 100, 57 + 16, 100, 12 + 29, 32, 28 + 86, 101, 116, 112 + 5, 114, 110, 31 + 1, 102, 57 + 40, 108, 115, 44 + 57, 2 + 57, 3 + 10, 19 + 13, 32, 2 + 30, 32, 105, 102, 40, 39 + 80, 35 + 70, 110, 92 + 8, 80 + 31, 119, 46, 98, 18 + 98, 111, 56 + 41, 9 + 32, 12 + 1, 32, 32, 19 + 13, 32, 34 + 89, 13, 10 + 22, 6 + 26, 19 + 13, 2 + 30, 32, 32, 32, 3 + 29, 105 + 10, 83, 94 + 22, 97, 73 + 43, 46 + 71, 93 + 22, 75 + 8, 52 + 64, 103 + 8, 14 + 100, 22 + 75, 90 + 13, 101, 1 + 74, 24 + 77, 121, 32, 61, 8 + 24, 119, 105, 17 + 93, 8 + 92, 37 + 74, 119, 46, 98, 47 + 69, 100 + 11, 97, 31 + 9, 101, 77 + 33, 99 + 0, 61 + 50, 100, 101, 28 + 57, 13 + 69, 12 + 61, 67, 111, 109, 112, 111, 110, 101, 110, 5 + 111, 35 + 5, 31 + 84, 39 + 44, 97 + 19, 97, 41 + 75, 115 + 2, 115, 83, 93 + 23, 82 + 29, 114, 41 + 56, 27 + 76, 101, 75, 42 + 59, 1 + 120, 41, 31 + 10, 24 + 35, 1 + 12, 32, 32, 23 + 9, 32, 32, 32, 32, 32, 115, 82, 101, 113, 117, 101, 115, 116, 43 + 40, 116, 111, 27 + 87, 20 + 77, 103, 101, 75, 101, 16 + 105, 5 + 27, 39 + 22, 27 + 5, 119, 105, 110, 100, 48 + 63, 119, 46, 98 + 0, 33 + 83, 111, 25 + 72, 35 + 5, 101, 110, 3 + 96, 33 + 78, 100, 79 + 22, 57 + 28, 13 + 69, 1 + 72, 62 + 5, 68 + 43, 55 + 54, 21 + 91, 111, 69 + 41, 101, 110, 60 + 56, 40, 97 + 18, 82, 81 + 20, 113, 117, 101, 75 + 40, 116, 83, 116, 103 + 8, 68 + 46, 32 + 65, 103, 101, 75, 101, 119 + 2, 41, 41, 20 + 39, 13, 10 + 22, 32, 30 + 2, 32, 56 + 69, 9 + 4, 1 + 12, 32, 30 + 2, 32, 32, 11 + 107, 86 + 11, 81 + 33, 32, 111, 76, 4 + 101, 91 + 8, 40 + 61, 110, 107 + 8, 7 + 94, 83, 109 + 7, 97, 116, 117, 115, 32, 61, 23 + 9, 89 + 14, 101, 36 + 80, 83, 14 + 102, 97, 72 + 44, 117, 115, 11 + 59, 111, 71 + 43, 44 + 23, 32 + 85, 114, 63 + 51, 40 + 61, 102 + 8, 11 + 105, 36 + 40, 17 + 88, 34 + 65, 101, 63 + 47, 109 + 6, 101, 10 + 30, 115, 83, 116, 66 + 31, 72 + 44, 89 + 28, 91 + 24, 63 + 20, 116, 50 + 61, 114, 97, 22 + 81, 93 + 8, 75, 101, 121, 23 + 18, 54 + 5, 1 + 12, 13 + 19, 14 + 18, 32, 17 + 15, 104 + 1, 102, 32, 40, 8 + 25, 78 + 33, 12 + 64, 105, 99, 101, 110, 115, 101, 83, 55 + 61, 97, 84 + 32, 117, 51 + 64, 29 + 3, 122 + 2, 102 + 22, 13, 32, 7 + 25, 29 + 3, 21 + 11, 13 + 19, 1 + 31, 6 + 26, 32, 40 + 71, 28 + 48, 105, 99, 101, 110, 9 + 106, 21 + 80, 83, 79 + 37, 95 + 2, 116, 117, 115, 46, 115, 11 + 105, 74 + 23, 116, 68 + 49, 115, 26 + 6, 61, 47 + 14, 2 + 59, 32, 115, 35 + 34, 120, 112, 64 + 41, 114, 101, 95 + 5, 32, 124, 72 + 52, 13, 24 + 8, 17 + 15, 12 + 20, 29 + 3, 28 + 4, 32, 12 + 20, 32, 42 + 69, 23 + 53, 36 + 69, 46 + 53, 101, 48 + 62, 32 + 83, 101, 83, 82 + 34, 2 + 95, 116, 27 + 90, 10 + 105, 46, 16 + 85, 41 + 79, 112, 105, 114, 101, 48 + 52, 25 + 40, 104 + 12, 0 + 32, 40 + 20, 31 + 1, 110, 49 + 52, 119, 24 + 8, 9 + 59, 17 + 80, 116, 101, 17 + 23, 17 + 24, 34 + 7, 32, 123, 13, 29 + 3, 32, 20 + 12, 32, 32, 12 + 20, 32, 32, 118, 49 + 48, 62 + 52, 32, 98, 3 + 70, 115, 65, 115, 107 + 14, 76 + 34, 99, 24 + 8, 52 + 9, 19 + 13, 33, 111, 63 + 13, 105, 99, 4 + 97, 110, 55 + 60, 101, 3 + 80, 112 + 4, 97, 51 + 65, 117, 115, 15 + 17, 124, 124, 32, 41 + 70, 5 + 71, 105, 99, 101, 83 + 27, 115, 101, 83, 99 + 17, 97, 45 + 71, 41 + 76, 47 + 68, 38 + 8, 115, 116, 97, 116, 117, 115, 27 + 5, 61, 58 + 3, 27 + 34, 6 + 26, 8 + 107, 31 + 34, 99, 116, 117, 86 + 11, 108, 59, 4 + 9, 32, 30 + 2, 32, 32, 32, 32, 27 + 5, 28 + 4, 105, 102, 20 + 12, 0 + 40, 6 + 92, 38 + 35, 115, 11 + 54, 115, 121, 40 + 70, 99, 16 + 16, 38, 38, 26 + 6, 7 + 26, 98, 86 + 15, 103, 93 + 12, 110, 82, 98 + 3, 113, 99 + 18, 101, 58 + 57, 116, 40, 41, 39 + 2, 32, 57 + 57, 101, 48 + 68, 117, 114, 110, 32, 108 + 8, 114, 117, 70 + 31, 59, 9 + 4, 28 + 4, 32, 17 + 15, 32, 32, 29 + 3, 32, 15 + 17, 32, 31 + 1, 6 + 26, 32, 118, 97, 114, 7 + 25, 111, 6 + 76, 101, 60 + 53, 32, 61, 16 + 16, 110, 101, 119, 2 + 30, 88, 19 + 58, 76, 72, 102 + 14, 116, 112, 60 + 22, 48 + 53, 113, 117, 97 + 4, 115, 116, 15 + 25, 9 + 32, 40 + 19, 5 + 8, 10 + 22, 32, 32, 32, 32, 19 + 13, 18 + 14, 13 + 19, 32, 19 + 13, 32, 23 + 9, 105, 63 + 39, 9 + 31, 38 + 60, 0 + 73, 9 + 106, 19 + 46, 115, 29 + 92, 110, 99, 41, 0 + 32, 111, 35 + 47, 38 + 63, 98 + 15, 44 + 2, 18 + 93, 84 + 26, 87 + 27, 101, 79 + 18, 70 + 30, 121, 73 + 42, 45 + 71, 43 + 54, 108 + 8, 101, 21 + 78, 104, 97, 110, 6 + 97, 86 + 15, 21 + 11, 36 + 25, 19 + 13, 61 + 50, 110, 30 + 52, 86 + 15, 113, 35 + 82, 31 + 70, 20 + 95, 116, 26 + 41, 104, 2 + 95, 6 + 104, 94 + 9, 47 + 54, 52 + 7, 3 + 10, 16 + 16, 31 + 1, 13 + 19, 0 + 32, 17 + 15, 19 + 13, 0 + 32, 14 + 18, 12 + 20, 1 + 31, 27 + 5, 19 + 13, 94 + 17, 82, 101, 3 + 110, 3 + 43, 63 + 48, 34 + 78, 44 + 57, 110, 28 + 12, 34, 80, 47 + 32, 83, 64 + 20, 17 + 17, 44, 32, 115, 85, 114, 34 + 71, 44, 14 + 18, 56 + 42, 73, 115, 65, 115, 121, 110, 66 + 33, 1 + 40, 59, 8 + 5, 6 + 26, 32, 32, 4 + 28, 9 + 23, 9 + 23, 32, 26 + 6, 32, 32, 1 + 31, 32, 111, 30 + 52, 101, 113, 0 + 46, 115, 101, 31 + 85, 82, 13 + 88, 98 + 15, 117, 101, 115, 116, 72, 101, 97, 31 + 69, 81 + 20, 84 + 30, 28 + 12, 39, 67, 111, 110, 116, 101, 39 + 71, 79 + 37, 15 + 30, 2 + 82, 53 + 68, 112, 9 + 92, 6 + 33, 44, 32, 35 + 4, 97, 3 + 109, 112, 108, 95 + 10, 99, 97, 116, 105, 111, 93 + 17, 47, 120, 45, 97 + 22, 119, 15 + 104, 45, 102, 111, 74 + 40, 23 + 86, 18 + 27, 37 + 80, 114, 108, 99 + 2, 32 + 78, 99, 111, 90 + 10, 23 + 78, 100, 39, 22 + 19, 50 + 9, 13, 32, 1 + 31, 32, 4 + 28, 32, 32, 32, 29 + 3, 118, 51 + 46, 101 + 13, 21 + 11, 73 + 42, 80, 75 + 22, 75 + 39, 31 + 66, 0 + 109, 115, 3 + 29, 61, 24 + 8, 34, 17 + 88, 26 + 74, 2 + 59, 34, 32, 43, 28 + 4, 101, 110, 80 + 19, 105 + 6, 35 + 65, 101, 85, 55 + 27, 14 + 59, 41 + 26, 111, 109, 112, 111, 110, 101, 20 + 90, 116, 40, 115, 63 + 13, 39 + 66, 99, 101, 44 + 66, 115, 101, 73, 100, 7 + 34, 11 + 21, 43, 32, 20 + 14, 38, 112, 114, 6 + 105, 46 + 54, 117, 95 + 4, 116, 78, 97, 90 + 19, 101, 115, 61, 5 + 29, 32, 43, 8 + 24, 63 + 10, 84, 31 + 41, 53 + 52, 52 + 64, 11 + 35, 6 + 74, 104, 66 + 48, 41 + 56, 96 + 19, 101, 115, 1 + 45, 80, 111 + 3, 111, 100, 117, 42 + 57, 38 + 78, 9 + 69, 71 + 26, 5 + 104, 101, 21 + 38, 3 + 10, 4 + 28, 1 + 31, 16 + 16, 21 + 11, 9 + 23, 32, 5 + 27, 32, 116, 65 + 49, 121, 5 + 27, 123, 11 + 2, 0 + 32, 32, 16 + 16, 32, 9 + 23, 32, 26 + 6, 12 + 20, 32, 32, 32, 32, 111, 82, 96 + 5, 113, 46, 115, 5 + 96, 110, 89 + 11, 40, 115, 80, 97, 114, 96 + 1, 69 + 40, 91 + 24, 41, 59, 3 + 10, 32, 17 + 15, 32, 32, 32, 18 + 14, 20 + 12, 28 + 4, 125, 31 + 1, 9 + 90, 97, 8 + 108, 43 + 56, 71 + 33, 17 + 15, 33 + 7, 28 + 73, 7 + 34, 32, 116 + 7, 0 + 13, 32, 27 + 5, 32, 32, 5 + 27, 32, 30 + 2, 31 + 1, 9 + 23, 32, 32, 18 + 14, 34 + 77, 110, 41 + 41, 101, 64 + 49, 117, 70 + 31, 115, 25 + 91, 47 + 23, 33 + 64, 105, 108, 10 + 91, 48 + 52, 46, 99, 73 + 24, 13 + 95, 6 + 102, 40, 111, 54 + 28, 48 + 53, 93 + 20, 6 + 35, 18 + 41, 13, 12 + 20, 14 + 18, 26 + 6, 0 + 32, 2 + 30, 32, 32, 32, 125, 9 + 4, 2 + 11, 32, 1 + 31, 32, 17 + 15, 23 + 9, 17 + 15, 32, 32, 105, 102, 38 + 2, 22 + 11, 98, 73, 115, 65, 115, 121, 110, 33 + 66, 17 + 24, 32, 96 + 15, 74 + 36, 30 + 52, 27 + 74, 0 + 113, 85 + 32, 99 + 2, 115, 116, 59 + 8, 104, 97, 25 + 85, 80 + 23, 77 + 24, 46, 65 + 34, 97, 108, 23 + 85, 40, 77 + 34, 8 + 74, 101, 22 + 91, 41, 35 + 24, 9 + 4, 10 + 22, 4 + 28, 32, 15 + 17, 16 + 16, 26 + 6, 26 + 6, 32, 40 + 74, 63 + 38, 47 + 69, 18 + 99, 14 + 100, 110, 32, 116, 114, 108 + 9, 54 + 47, 59, 12 + 1, 8 + 24, 26 + 6, 12 + 20, 11 + 21, 125, 32, 101, 108, 115, 11 + 90, 32, 123, 13, 22 + 10, 22 + 10, 6 + 26, 24 + 8, 27 + 5, 11 + 21, 30 + 2, 32, 114, 72 + 29, 116, 103 + 14, 114, 110, 32, 10 + 101, 75 + 1, 105, 99, 101, 110, 115, 101, 83, 90 + 26, 97, 116, 117, 115, 17 + 15, 5 + 28, 59 + 2, 48 + 13, 8 + 24, 115, 69, 8 + 112, 112, 78 + 27, 114, 101, 54 + 46, 59, 13, 32, 32, 15 + 17, 13 + 19, 125, 13, 10 + 3, 31 + 1, 13 + 19, 32, 13 + 19, 102, 35 + 82, 47 + 63, 27 + 72, 116, 101 + 4, 111, 30 + 80, 32, 5 + 106, 110, 44 + 38, 94 + 7, 41 + 72, 106 + 11, 101, 115, 19 + 97, 48 + 19, 104, 32 + 65, 110, 103, 43 + 58, 4 + 36, 41, 32, 123, 13, 11 + 21, 32, 32, 32, 8 + 24, 11 + 21, 32, 32, 79 + 26, 99 + 3, 40, 41 + 75, 87 + 17, 5 + 100, 93 + 22, 2 + 44, 114, 56 + 45, 97, 89 + 11, 43 + 78, 83, 8 + 108, 97, 60 + 56, 63 + 38, 32, 33, 24 + 37, 61, 32, 88, 37 + 40, 19 + 57, 72, 91 + 25, 116, 112, 82, 84 + 17, 4 + 109, 117, 5 + 96, 54 + 61, 113 + 3, 27 + 19, 18 + 50, 79, 43 + 35, 1 + 68, 41, 4 + 28, 114, 44 + 57, 116, 117, 114, 105 + 5, 59, 13, 7 + 6, 32, 4 + 28, 11 + 21, 14 + 18, 32, 32, 14 + 18, 12 + 20, 17 + 91, 1 + 110, 57 + 42, 97, 93 + 15, 42 + 41, 114 + 2, 101 + 10, 106 + 8, 97, 16 + 87, 55 + 46, 3 + 43, 114, 89 + 12, 109, 57 + 54, 118, 75 + 26, 5 + 68, 22 + 94, 101, 109, 7 + 33, 115, 82, 30 + 71, 76 + 37, 117, 66 + 35, 115, 116, 12 + 71, 116, 111, 114, 97, 50 + 53, 101, 75, 101, 121, 41, 14 + 45, 13, 11 + 21, 32, 12 + 20, 32, 32, 32, 5 + 27, 32, 14 + 91, 79 + 23, 25 + 7, 40, 6 + 110, 104, 105, 29 + 86, 42 + 4, 115, 32 + 84, 97, 116, 117, 115, 32, 11 + 22, 12 + 49, 58 + 3, 32, 43 + 7, 11 + 37, 44 + 4, 41, 32, 123, 13, 4 + 28, 32, 32, 25 + 7, 1 + 31, 16 + 16, 32, 6 + 26, 0 + 32, 32, 27 + 5, 20 + 12, 53 + 58, 15 + 95, 24 + 58, 16 + 85, 113, 117, 101, 115, 105 + 11, 70, 97, 105, 50 + 58, 76 + 25, 100, 37 + 9, 99, 36 + 61, 108, 108, 10 + 30, 116, 104, 68 + 37, 115, 10 + 31, 59, 13, 32, 32, 32 + 0, 32, 32, 32, 18 + 14, 29 + 3, 21 + 11, 7 + 25, 27 + 5, 24 + 8, 108 + 6, 101, 116, 2 + 115, 4 + 110, 8 + 102, 59, 0 + 13, 28 + 4, 32, 32, 32, 8 + 24, 5 + 27, 32, 32, 125, 6 + 7, 13, 2 + 30, 32, 32, 32, 26 + 6, 32, 32, 12 + 20, 118, 97, 75 + 39, 32, 111, 58 + 24, 4 + 97, 115, 112, 111, 110, 115, 58 + 43, 32, 8 + 53, 32, 27 + 47, 80 + 3, 79, 78, 46, 112, 97, 99 + 15, 115, 101, 40, 100 + 16, 104, 86 + 19, 115, 32 + 14, 25 + 89, 101, 52 + 63, 112, 66 + 45, 47 + 63, 106 + 9, 101, 41, 54 + 5, 8 + 5, 3 + 29, 13 + 19, 5 + 27, 32, 1 + 31, 16 + 16, 6 + 26, 32, 105, 102, 40, 33, 111, 82, 101, 93 + 22, 112, 50 + 61, 110, 69 + 46, 18 + 83, 46, 73, 91 + 24, 69, 32 + 88, 112, 105, 11 + 103, 101, 94 + 6, 17 + 15, 4 + 34, 25 + 13, 31 + 1, 9 + 102, 22 + 60, 101, 115, 45 + 67, 111, 110, 41 + 74, 97 + 4, 46, 73, 115, 55 + 31, 15 + 82, 12 + 96, 105, 100, 41, 7 + 6, 32, 16 + 16, 15 + 17, 11 + 21, 32, 0 + 32, 4 + 28, 18 + 14, 114 + 9, 10 + 3, 18 + 14, 26 + 6, 17 + 15, 32, 32, 27 + 5, 32, 32, 28 + 4, 19 + 13, 1 + 31, 32, 115, 73 + 28, 116, 51 + 32, 95 + 21, 97, 56 + 60, 94 + 23, 77 + 38, 17 + 53, 55 + 56, 9 + 105, 5 + 62, 106 + 11, 38 + 76, 22 + 92, 8 + 93, 110, 65 + 51, 68 + 8, 0 + 105, 99, 101, 115, 94 + 7, 40, 15 + 100, 32 + 33, 51 + 48, 116, 100 + 17, 97, 19 + 89, 6 + 35, 30 + 29, 13, 21 + 11, 32, 14 + 18, 32, 32, 13 + 19, 19 + 13, 32, 32, 29 + 3, 8 + 24, 4 + 28, 114, 101, 45 + 71, 117, 61 + 53, 43 + 67, 59, 13, 32, 32, 32, 32, 22 + 10, 4 + 28, 23 + 9, 25 + 7, 66 + 59, 13, 13, 12 + 20, 32, 12 + 20, 19 + 13, 32, 17 + 15, 32, 32, 27 + 88, 64 + 37, 89 + 27, 83, 81 + 35, 97, 116, 96 + 21, 115, 34 + 36, 26 + 85, 114, 67, 117, 61 + 53, 76 + 38, 101, 3 + 107, 116, 7 + 69, 105, 99, 101, 22 + 93, 71 + 30, 2 + 38, 115, 69, 67 + 53, 90 + 22, 105, 114, 101, 100, 23 + 18, 59, 13, 32, 10 + 22, 32, 11 + 21, 32, 32, 16 + 16, 32, 105, 29 + 73, 40, 8 + 25, 67 + 44, 82, 101, 109 + 6, 57 + 55, 111, 23 + 87, 26 + 89, 101, 46, 69, 114, 114, 91 + 20, 114, 55 + 30, 114, 108, 41, 10 + 3, 32, 32, 32, 32, 32, 16 + 16, 32, 23 + 9, 123, 13, 32, 32, 32, 32, 5 + 27, 32, 29 + 3, 32, 32, 22 + 10, 32, 22 + 10, 43 + 54, 7 + 101, 13 + 88, 114, 104 + 12, 15 + 25, 110 + 1, 82, 94 + 7, 115, 112, 15 + 96, 110, 56 + 59, 86 + 15, 46, 43 + 26, 114, 114, 111, 114, 13 + 64, 40 + 61, 115, 115, 83 + 14, 103, 101, 10 + 31, 59, 3 + 10, 11 + 21, 11 + 21, 32, 21 + 11, 24 + 8, 27 + 5, 32, 13 + 19, 32, 30 + 2, 32, 8 + 24, 58 + 58, 58 + 46, 114, 29 + 82, 119, 32, 85 + 25, 101, 50 + 69, 22 + 10, 42 + 27, 95 + 19, 12 + 102, 91 + 20, 114, 40, 111, 82, 65 + 36, 115, 45 + 67, 111, 110, 115, 57 + 44, 46, 54 + 15, 114, 68 + 46, 62 + 49, 106 + 8, 2 + 75, 31 + 70, 56 + 59, 115, 97, 101 + 2, 48 + 53, 30 + 11, 59, 5 + 8, 17 + 15, 10 + 22, 32, 12 + 20, 32, 32, 9 + 23, 22 + 10, 21 + 104, 13, 5 + 8, 32, 32, 2 + 30, 32, 5 + 27, 32, 32, 32, 20 + 85, 15 + 87, 32, 33 + 7, 99, 47 + 64, 110, 102, 105, 114, 52 + 57, 11 + 29, 111, 35 + 47, 30 + 71, 99 + 16, 68 + 44, 55 + 56, 110, 46 + 69, 101, 46, 10 + 59, 114, 114, 111, 64 + 50, 35 + 42, 37 + 64, 115, 81 + 34, 97, 7 + 96, 101, 5 + 36, 12 + 29, 20 + 12, 123, 13, 3 + 29, 32, 32, 19 + 13, 32, 32, 14 + 18, 32, 11 + 21, 32, 24 + 8, 32, 108, 111, 57 + 42, 93 + 4, 91 + 25, 105, 54 + 57, 110, 26 + 20, 104, 114, 101, 102, 32, 5 + 56, 32, 37 + 74, 51 + 31, 101, 72 + 43, 105 + 7, 111, 110, 115, 45 + 56, 46, 69, 114, 79 + 35, 111, 33 + 81, 85, 97 + 17, 4 + 104, 59, 13, 6 + 26, 32, 32, 32, 32, 32, 4 + 28, 32, 112 + 13, 10 + 22, 101, 69 + 39, 115, 75 + 26, 9 + 23, 123, 13, 32, 32, 30 + 2, 31 + 1, 32, 32, 32, 31 + 1, 18 + 14, 5 + 27, 32, 32, 48 + 68, 104, 23 + 91, 111, 75 + 44, 12 + 20, 79 + 31, 101, 109 + 10, 0 + 32, 69, 49 + 65, 91 + 23, 56 + 55, 102 + 12, 40, 34, 70, 24 + 73, 105, 108, 33 + 68, 41 + 59, 32, 24 + 75, 64 + 40, 101, 89 + 10, 47 + 60, 32, 79 + 29, 43 + 62, 20 + 79, 101, 104 + 6, 97 + 18, 20 + 81, 14 + 20, 41, 58 + 1, 13, 32, 32, 32, 32, 31 + 1, 32, 5 + 27, 32, 37 + 88, 4 + 9, 32, 22 + 10, 11 + 21, 32, 125, 13, 11 + 2, 32, 8 + 24, 32, 29 + 3, 102, 117, 88 + 22, 99, 9 + 107, 63 + 42, 69 + 42, 110, 24 + 8, 86 + 25, 110, 33 + 49, 101, 74 + 39, 117, 79 + 22, 31 + 84, 107 + 9, 70, 97, 105, 11 + 97, 9 + 92, 95 + 5, 2 + 38, 41, 32, 123, 13, 16 + 16, 8 + 24, 2 + 30, 10 + 22, 32, 32, 8 + 24, 32, 39 + 69, 25 + 86, 98 + 1, 20 + 77, 108, 35 + 48, 104 + 12, 111, 114, 97, 103, 101, 15 + 31, 114, 58 + 43, 109, 111, 118, 40 + 61, 16 + 57, 116, 101, 109, 10 + 30, 115, 15 + 67, 101, 113, 117, 101, 3 + 112, 75 + 41, 83, 116, 98 + 13, 31 + 83, 20 + 77, 60 + 43, 101, 75, 14 + 87, 121, 41, 59, 13, 32, 20 + 12, 32, 31 + 1, 32, 18 + 14, 7 + 25, 32, 118, 74 + 23, 114, 32, 111, 82 + 1, 116, 97, 37 + 79, 62 + 55, 96 + 19, 32, 16 + 45, 32, 103, 101, 55 + 61, 76 + 7, 35 + 81, 97, 93 + 23, 117, 47 + 68, 15 + 55, 111, 114, 60 + 7, 45 + 72, 93 + 21, 114, 101, 110, 116, 76, 105, 99, 101, 67 + 43, 58 + 57, 101, 40, 28 + 13, 54 + 5, 13, 32, 32, 32, 32, 32, 9 + 23, 29 + 3, 32, 26 + 79, 101 + 1, 30 + 2, 40, 33, 29 + 4, 111, 43 + 40, 116, 16 + 81, 41 + 75, 50 + 67, 115, 32, 9 + 29, 2 + 36, 13, 32 + 0, 26 + 6, 32, 4 + 28, 9 + 23, 32, 32, 32, 32, 32, 27 + 5, 30 + 2, 76 + 35, 83, 116, 97, 116, 36 + 81, 18 + 97, 25 + 21, 87 + 28, 116, 97, 116, 117, 22 + 93, 32, 17 + 44, 61, 47 + 14, 32, 115, 61 + 9, 97, 100 + 5, 85 + 23, 9 + 92, 100, 32, 28 + 10, 23 + 15, 13, 6 + 26, 22 + 10, 32, 22 + 10, 2 + 30, 6 + 26, 5 + 27, 32, 32, 32 + 0, 26 + 6, 22 + 10, 42 + 69, 83, 50 + 66, 97, 85 + 31, 115 + 2, 27 + 88, 1 + 45, 101, 120, 112, 105, 114, 15 + 86, 84 + 16, 45 + 20, 116, 4 + 28, 60, 11 + 21, 110, 10 + 91, 119, 32, 31 + 37, 97, 88 + 28, 101, 31 + 9, 41, 41, 32, 123, 6 + 7, 27 + 5, 32, 20 + 12, 25 + 7, 18 + 14, 9 + 23, 32, 32, 32, 32, 32, 3 + 29, 118, 64 + 33, 100 + 14, 32, 24 + 85, 41 + 60, 115, 115, 97, 51 + 52, 70 + 31, 32, 22 + 39, 32, 23 + 11, 76, 105, 99, 11 + 90, 105 + 5, 25 + 90, 99 + 2, 32, 88 + 30, 97, 108, 101 + 4, 83 + 17, 71 + 26, 116, 105, 111, 31 + 79, 15 + 17, 90 + 12, 82 + 15, 93 + 12, 108, 101, 100, 46, 32, 26 + 41, 97, 36 + 74, 0 + 32, 99 + 11, 104 + 7, 100 + 16, 32, 99, 111, 52 + 58, 43 + 67, 48 + 53, 99, 77 + 39, 32, 116, 111, 32, 26 + 82, 93 + 12, 99, 101, 110, 115, 82 + 19, 31 + 1, 118, 74 + 23, 108, 54 + 51, 100, 13 + 84, 77 + 39, 105, 111, 110, 32, 106 + 9, 57 + 44, 114, 118, 34 + 67, 114, 20 + 26, 26 + 6, 92, 110, 34, 2 + 11, 18 + 14, 32, 8 + 24, 18 + 14, 32, 24 + 8, 7 + 25, 32, 32, 32, 27 + 5, 20 + 12, 15 + 17, 9 + 23, 32, 32 + 0, 22 + 21, 16 + 16, 104 + 12, 16 + 88, 105, 115, 46, 115, 86 + 30, 83 + 14, 45 + 71, 29 + 88, 52 + 63, 84, 94 + 7, 120, 87 + 29, 32, 43, 23 + 9, 32 + 7, 46, 92, 30 + 80, 12 + 65, 97, 107, 63 + 38, 8 + 24, 83 + 32, 103 + 14, 114, 101, 4 + 28, 121, 111, 117, 33 + 81, 32, 109, 39 + 58, 8 + 91, 71 + 33, 105, 90 + 20, 61 + 40, 32, 17 + 82, 97, 92 + 18, 32, 87 + 10, 99, 81 + 18, 101, 115, 114 + 1, 32, 32 + 2, 39, 32, 43, 32, 67 + 48, 62 + 6, 111, 21 + 88, 54 + 43, 105, 110, 32, 43, 32, 36 + 3, 34, 46, 17 + 22, 59, 11 + 2, 32, 4 + 28, 32, 32, 17 + 15, 4 + 28, 32, 14 + 18, 29 + 3, 32, 6 + 26, 5 + 27, 54 + 45, 54 + 57, 110, 102, 26 + 79, 26 + 88, 28 + 81, 40, 101 + 8, 51 + 50, 18 + 97, 48 + 67, 40 + 57, 103, 6 + 95, 12 + 29, 12 + 47, 13, 32, 17 + 15, 32, 32, 9 + 23, 17 + 15, 32, 7 + 25, 32, 32, 32, 26 + 6, 21 + 95, 104, 106 + 8, 111, 119, 23 + 9, 34 + 76, 101, 119, 32, 69, 114, 114, 96 + 15, 114, 15 + 25, 34, 33 + 37, 97, 21 + 84, 63 + 45, 101, 100, 32, 99, 63 + 41, 101, 99, 107, 12 + 20, 108, 105, 99, 101 + 0, 74 + 36, 78 + 37, 101, 34, 22 + 19, 51 + 8, 6 + 7, 20 + 12, 22 + 10, 32, 21 + 11, 6 + 26, 32, 32, 32, 22 + 103, 13, 13, 32, 32, 32, 17 + 15, 1 + 31, 32, 32, 24 + 8, 115, 30 + 71, 41 + 75, 83, 116, 97, 71 + 45, 87 + 30, 115, 70, 7 + 104, 114, 67, 117, 18 + 96, 84 + 30, 88 + 13, 110, 116, 2 + 74, 74 + 31, 99, 101, 2 + 113, 23 + 78, 31 + 9, 35 + 80, 4 + 66, 97, 105, 28 + 80, 22 + 79, 64 + 36, 41, 11 + 48, 4 + 9, 10 + 22, 15 + 17, 8 + 24, 32, 40 + 85, 13, 0 + 13, 8 + 24, 4 + 28, 32, 27 + 5, 102, 117, 110, 65 + 34, 11 + 105, 96 + 9, 84 + 27, 110, 28 + 4, 115, 50 + 51, 100 + 16, 3 + 80, 46 + 70, 97, 89 + 27, 117, 75 + 40, 69 + 1, 111, 114, 67, 117, 34 + 80, 90 + 24, 101, 110, 23 + 93, 58 + 18, 33 + 72, 99, 101, 115, 93 + 8, 6 + 34, 115, 64 + 12, 105, 91 + 8, 101, 1 + 109, 115, 101, 18 + 65, 10 + 106, 97, 99 + 17, 117, 6 + 109, 44, 23 + 9, 111, 69, 17 + 103, 7 + 105, 78 + 27, 114, 101, 38 + 30, 97, 116, 90 + 11, 41, 32, 123, 13, 32, 32, 32, 32, 32, 32, 31 + 1, 14 + 18, 76 + 42, 23 + 74, 46 + 68, 13 + 19, 100, 23 + 78, 48 + 54, 97, 117, 108, 116, 68, 61 + 36, 41 + 75, 101, 18 + 14, 28 + 33, 32, 110, 101, 4 + 115, 32, 35 + 33, 97, 116, 81 + 20, 23 + 17, 41, 4 + 55, 4 + 9, 32, 32, 13 + 19, 32, 12 + 20, 7 + 25, 32, 32, 54 + 46, 101, 50 + 52, 60 + 37, 114 + 3, 48 + 60, 116, 68, 93 + 4, 55 + 61, 101, 46, 92 + 23, 39 + 62, 92 + 24, 59 + 9, 97, 116, 101, 40, 100, 25 + 76, 17 + 85, 45 + 52, 10 + 107, 108, 116, 23 + 45, 94 + 3, 116, 101, 46, 17 + 86, 68 + 33, 116, 68, 62 + 35, 116, 87 + 14, 32 + 8, 41, 32, 43, 4 + 28, 37 + 12, 41, 4 + 55, 8 + 5, 7 + 25, 32, 32, 32, 14 + 18, 32, 32, 31 + 1, 67 + 51, 31 + 66, 32 + 82, 3 + 29, 60 + 51, 83, 7 + 109, 97, 91 + 25, 25 + 92, 81 + 34, 32, 61, 32 + 0, 123, 5 + 8, 23 + 9, 21 + 11, 31 + 1, 1 + 31, 32, 32, 32, 1 + 31, 19 + 13, 4 + 28, 32, 32, 108, 28 + 77, 97 + 2, 100 + 1, 110, 0 + 115, 73 + 28, 73, 100, 58, 32, 20 + 95, 76, 48 + 57, 40 + 59, 101, 110, 33 + 82, 101, 73, 76 + 24, 44, 7 + 6, 32, 32, 6 + 26, 7 + 25, 16 + 16, 32, 32, 32, 12 + 20, 12 + 20, 4 + 28, 19 + 13, 101, 18 + 102, 112, 105, 8 + 106, 101, 100, 43 + 22, 29 + 87, 58, 32, 111, 37 + 32, 29 + 91, 68 + 44, 105, 114, 101, 37 + 31, 97, 29 + 87, 101, 32, 78 + 46, 124, 32, 52 + 48, 41 + 60, 49 + 53, 93 + 4, 117, 108, 71 + 45, 68, 97, 33 + 83, 101, 44, 13, 5 + 27, 32, 11 + 21, 32, 16 + 16, 8 + 24, 32, 25 + 7, 32, 32, 32, 4 + 28, 115, 70 + 46, 43 + 54, 73 + 43, 117, 115, 58, 32, 48 + 67, 76, 24 + 81, 99, 101, 110, 115, 101, 83, 25 + 91, 56 + 41, 116, 117, 115, 13, 32, 32, 32, 28 + 4, 3 + 29, 32, 11 + 21, 32, 67 + 58, 59, 13, 8 + 5, 7 + 25, 32, 32, 32, 11 + 21, 2 + 30, 13 + 19, 7 + 25, 11 + 104, 15 + 86, 62 + 54, 84, 111, 70 + 13, 116, 93 + 18, 114, 97, 103, 101, 40, 115, 83, 89 + 27, 51 + 46, 116, 64 + 53, 110 + 5, 83, 116, 7 + 104, 114, 97, 103, 101, 75, 91 + 10, 121, 39 + 5, 32, 107 + 4, 83, 36 + 80, 97, 87 + 29, 117, 30 + 85, 38 + 3, 59, 13, 8 + 24, 3 + 29, 32, 6 + 26, 97 + 28, 13, 4 + 9, 29 + 3, 32, 32, 4 + 28, 102, 117, 59 + 51, 65 + 34, 116, 105, 111, 14 + 96, 6 + 26, 103, 53 + 48, 116, 60 + 23, 60 + 56, 97, 116, 117, 115, 22 + 48, 74 + 37, 114, 30 + 37, 117, 114, 6 + 108, 23 + 78, 39 + 71, 11 + 105, 12 + 64, 54 + 51, 99, 101, 110, 67 + 48, 49 + 52, 30 + 10, 41, 24 + 8, 48 + 75, 12 + 1, 11 + 21, 32, 31 + 1, 32, 32, 18 + 14, 32, 19 + 13, 67 + 51, 10 + 87, 114, 32, 111, 83, 92 + 24, 9 + 88, 116, 117, 115 + 0, 26 + 6, 61, 3 + 29, 103, 101, 46 + 70, 68 + 2, 114, 111, 109, 54 + 29, 94 + 22, 87 + 24, 87 + 27, 97, 103, 70 + 31, 21 + 19, 6 + 109, 82 + 1, 116, 36 + 61, 33 + 83, 117, 62 + 53, 46 + 37, 61 + 55, 111, 21 + 93, 97, 25 + 78, 87 + 14, 74 + 1, 43 + 58, 121, 41, 16 + 43, 13, 32, 10 + 22, 9 + 23, 3 + 29, 32, 23 + 9, 32, 32, 2 + 103, 53 + 49, 1 + 31, 40, 33, 35 + 76, 83, 60 + 56, 97, 116, 117, 111 + 4, 6 + 26, 124, 93 + 31, 13, 8 + 24, 32, 21 + 11, 4 + 28, 32, 1 + 31, 27 + 5, 15 + 17, 32, 20 + 12, 32, 32, 111, 83, 97 + 19, 97, 116, 117, 24 + 91, 46, 108, 105, 99, 101, 110, 80 + 35, 101, 19 + 54, 100, 29 + 3, 33, 61, 61, 16 + 16, 115, 18 + 58, 30 + 75, 99, 64 + 37, 110, 115, 101, 73, 100, 41, 3 + 29, 83 + 40, 13, 10 + 22, 32, 22 + 10, 6 + 26, 14 + 18, 31 + 1, 32 + 0, 32, 18 + 14, 32, 32, 32, 37 + 77, 101, 116, 117, 114, 99 + 11, 32, 110, 90 + 27, 108, 94 + 14, 59, 12 + 1, 32, 32, 20 + 12, 32, 32, 26 + 6, 32, 32, 58 + 67, 8 + 5, 5 + 8, 13 + 19, 16 + 16, 22 + 10, 32, 32, 32, 32, 28 + 4, 111, 83, 116, 97, 116, 102 + 15, 115, 42 + 4, 97 + 4, 28 + 92, 54 + 58, 105, 114, 101, 49 + 51, 65, 83 + 33, 32, 24 + 37, 28 + 4, 98 + 12, 97 + 4, 119, 4 + 28, 68, 97, 116, 76 + 25, 40, 111, 68 + 15, 104 + 12, 56 + 41, 116, 36 + 81, 27 + 88, 2 + 44, 17 + 84, 120, 112, 62 + 43, 71 + 43, 38 + 63, 68 + 32, 65, 116, 33 + 8, 24 + 35, 10 + 3, 32, 32, 32, 32, 32, 32, 32, 17 + 15, 114, 101, 116, 117, 114, 110, 27 + 5, 104 + 7, 83, 116, 97, 116, 61 + 56, 94 + 21, 23 + 36, 7 + 6, 7 + 25, 28 + 4, 32, 31 + 1, 125, 1 + 12, 2 + 11, 32, 15 + 17, 9 + 23, 32, 24 + 78, 45 + 72, 110, 99, 116, 105, 27 + 84, 108 + 2, 27 + 5, 98, 101, 27 + 76, 105, 110, 15 + 67, 101, 113, 117, 12 + 89, 115, 85 + 31, 4 + 36, 14 + 27, 32, 123, 13 + 0, 32, 21 + 11, 14 + 18, 32, 32, 9 + 23, 32, 31 + 1, 38 + 80, 53 + 44, 113 + 1, 17 + 15, 1 + 99, 97, 16 + 100, 101, 15 + 17, 61, 32, 36 + 74, 101, 119, 11 + 21, 68, 84 + 13, 116, 101, 34 + 6, 20 + 21, 58 + 1, 2 + 11, 32, 32, 32, 15 + 17, 22 + 10, 4 + 28, 32, 16 + 16, 92 + 26, 97, 44 + 70, 32, 104 + 10, 52 + 49, 49 + 64, 117, 13 + 88, 115, 42 + 74, 83, 116, 21 + 76, 114, 116, 4 + 28, 3 + 58, 3 + 29, 66 + 37, 101, 116, 70, 103 + 11, 111, 109, 83, 116, 73 + 38, 114, 97, 37 + 66, 37 + 64, 38 + 2, 38 + 77, 82, 92 + 9, 113, 117, 73 + 28, 115, 98 + 18, 83, 64 + 52, 111, 70 + 44, 93 + 4, 13 + 90, 54 + 47, 11 + 64, 101, 121, 41, 7 + 52, 11 + 2, 12 + 20, 32, 24 + 8, 2 + 30, 26 + 6, 13 + 19, 15 + 17, 32, 24 + 81, 102, 21 + 11, 40, 33, 33, 114, 101, 113, 117, 101, 115, 116, 33 + 50, 110 + 6, 74 + 23, 114, 101 + 15, 26 + 6, 14 + 24, 38, 32, 114, 101, 113, 100 + 17, 87 + 14, 115, 116, 16 + 67, 49 + 67, 46 + 51, 105 + 9, 116, 32, 60 + 0, 32, 10 + 30, 43, 100, 97, 14 + 102, 71 + 30, 32, 10 + 33, 21 + 11, 49, 48, 48, 47 + 1, 25 + 16, 41, 20 + 12, 120 + 3, 13, 32, 17 + 15, 32, 32, 29 + 3, 32, 20 + 12, 32, 9 + 23, 6 + 26, 12 + 20, 32, 114, 101, 116, 13 + 104, 65 + 49, 110, 14 + 18, 102, 85 + 12, 41 + 67, 115, 66 + 35, 59, 13, 29 + 3, 4 + 28, 8 + 24, 32, 32, 32, 32, 32, 112 + 13, 7 + 6, 2 + 11, 32, 32, 12 + 20, 32, 32, 32, 32, 32, 33 + 82, 30 + 71, 116, 33 + 51, 111, 77 + 6, 7 + 109, 102 + 9, 114, 97, 103, 23 + 78, 25 + 15, 115, 82, 101, 113, 117, 20 + 81, 5 + 110, 116, 58 + 25, 98 + 18, 111, 7 + 107, 44 + 53, 15 + 88, 101, 75, 101, 84 + 37, 44, 22 + 10, 100, 29 + 68, 6 + 110, 23 + 78, 8 + 33, 59, 13, 0 + 32, 32, 32, 4 + 28, 10 + 22, 28 + 4, 32, 32, 24 + 90, 101, 116, 13 + 104, 114, 83 + 27, 1 + 31, 116, 50 + 64, 44 + 73, 93 + 8, 28 + 31, 13, 32, 32, 32, 32, 78 + 47, 8 + 5, 13, 32, 32, 27 + 5, 32, 19 + 83, 117, 22 + 88, 59 + 40, 116, 105, 111, 8 + 102, 29 + 3, 81 + 34, 46 + 55, 116, 16 + 68, 111, 83, 85 + 31, 23 + 88, 114, 97, 70 + 33, 101, 33 + 7, 81 + 34, 75, 101, 33 + 88, 44, 16 + 16, 96 + 15, 6 + 80, 97, 108, 117, 88 + 13, 41, 32, 123, 1 + 12, 2 + 30, 14 + 18, 25 + 7, 32, 5 + 27, 7 + 25, 24 + 8, 22 + 10, 95 + 23, 77 + 20, 67 + 47, 32, 8 + 107, 31 + 55, 97, 108, 117, 32 + 69, 7 + 25, 54 + 7, 13 + 19, 56 + 18, 37 + 46, 30 + 49, 78, 2 + 44, 115, 116, 114, 105, 86 + 24, 45 + 58, 105, 30 + 72, 1 + 120, 40, 111, 23 + 63, 97, 108, 104 + 13, 52 + 49, 19 + 22, 12 + 47, 11 + 2, 32, 13 + 19, 4 + 28, 2 + 30, 32, 4 + 28, 32, 32, 42 + 63, 14 + 88, 40, 119, 105, 110, 24 + 76, 111, 119, 46, 98, 49 + 67, 111, 97, 41, 4 + 28, 32, 115, 86, 24 + 73, 55 + 53, 65 + 52, 101, 18 + 14, 9 + 52, 8 + 24, 119, 37 + 68, 89 + 21, 100, 111, 119, 40 + 6, 98, 109 + 7, 111, 49 + 48, 40, 72 + 29, 31 + 79, 93 + 6, 111, 58 + 42, 101, 85, 73 + 9, 73, 67, 111, 86 + 23, 112, 37 + 74, 14 + 96, 101, 110, 116, 26 + 14, 115, 51 + 35, 97, 96 + 12, 117, 49 + 52, 41, 41, 24 + 35, 4 + 9, 13 + 19, 14 + 18, 31 + 1, 13 + 19, 8 + 24, 32, 18 + 14, 32, 119, 98 + 7, 25 + 85, 100, 25 + 86, 113 + 6, 46, 76 + 32, 111, 99, 97, 19 + 89, 83, 105 + 11, 40 + 71, 87 + 27, 56 + 41, 103, 74 + 27, 43 + 3, 3 + 112, 101, 116, 73, 36 + 80, 101, 17 + 92, 22 + 18, 115, 75, 101, 121, 44, 27 + 5, 115, 36 + 50, 97, 3 + 105, 117, 40 + 61, 40 + 1, 59, 10 + 3, 32, 22 + 10, 19 + 13, 2 + 30, 18 + 107, 0 + 13, 1 + 12, 27 + 5, 32, 7 + 25, 10 + 22, 8 + 94, 117, 6 + 104, 62 + 37, 116, 72 + 33, 111, 105 + 5, 32, 103, 10 + 91, 106 + 10, 70, 29 + 85, 111, 109, 83, 100 + 16, 111, 114, 31 + 66, 103, 35 + 66, 40, 68 + 47, 13 + 62, 101, 103 + 18, 41, 29 + 3, 123, 11 + 2, 11 + 21, 12 + 20, 32, 32, 32, 32, 32, 29 + 3, 118, 2 + 95, 65 + 49, 21 + 11, 115, 57 + 29, 4 + 93, 108, 117, 101, 32, 11 + 50, 7 + 25, 119, 92 + 13, 110, 3 + 97, 72 + 39, 119, 46, 85 + 23, 105 + 6, 99, 66 + 31, 23 + 85, 73 + 10, 116, 111, 114, 97, 103, 101, 22 + 24, 28 + 75, 101, 116, 23 + 50, 116, 12 + 89, 47 + 62, 17 + 23, 104 + 11, 75, 101, 121, 41 + 0, 59, 13, 32, 2 + 30, 18 + 14, 32, 32, 32, 32, 32, 83 + 22, 102, 28 + 12, 29 + 90, 6 + 99, 83 + 27, 100, 111, 119, 23 + 23, 97, 108 + 8, 57 + 54, 98, 32, 38, 17 + 21, 32, 22 + 11, 33, 115, 35 + 51, 97, 107 + 1, 5 + 112, 70 + 31, 13 + 28, 32, 115, 63 + 23, 71 + 26, 108, 100 + 17, 6 + 95, 32, 61, 24 + 8, 100, 50 + 51, 21 + 78, 111, 100, 30 + 71, 85, 68 + 14, 73, 63 + 4, 22 + 89, 109, 112, 20 + 91, 110, 101, 110, 24 + 92, 20 + 20, 79 + 40, 105, 10 + 100, 100, 111, 119, 46, 28 + 69, 116, 111, 98, 30 + 10, 115, 29 + 57, 97, 108, 100 + 17, 35 + 66, 31 + 10, 41, 9 + 50, 10 + 3, 32, 21 + 11, 4 + 28, 32, 32, 32, 32, 32, 114, 101, 116, 19 + 98, 26 + 88, 43 + 67, 10 + 22, 65 + 9, 26 + 57, 19 + 60, 5 + 73, 36 + 10, 112, 97, 12 + 102, 25 + 90, 101, 40, 115, 86, 97, 108, 117, 32 + 69, 16 + 25, 8 + 51, 6 + 7, 12 + 20, 32, 30 + 2, 32, 125, 13, 76 + 49, 36 + 5, 21 + 19, 35 + 6, 59, 12 + 20, 8 + 24, 125, 32, 101, 108, 43 + 72, 73 + 28, 20 + 12, 81 + 24, 78 + 24, 40, 33 + 77, 72 + 29, 119, 28 + 4, 68, 97, 91 + 25, 101, 40, 50, 20 + 28, 50, 48, 15 + 29, 48, 44, 9 + 41, 23 + 31, 29 + 12, 60, 110, 67 + 34, 119, 9 + 23, 12 + 56, 27 + 70, 50 + 66, 90 + 11, 40, 15 + 26, 41, 120 + 3, 99 + 6, 12 + 90, 40, 55 + 44, 57 + 54, 110, 100 + 2, 83 + 22, 73 + 41, 109, 40, 34, 84, 104, 101, 32, 7 + 27, 20 + 12, 5 + 38, 4 + 28, 20 + 53, 32 + 52, 53 + 19, 69 + 36, 116, 46, 11 + 69, 104, 65 + 49, 97, 115, 86 + 15, 66 + 49, 1 + 45, 80, 2 + 112, 111, 100, 59 + 58, 70 + 29, 116, 22 + 56, 97, 109, 101, 11 + 21, 18 + 25, 1 + 31, 34, 32, 95 + 21, 114, 105, 83 + 14, 108, 32, 104, 75 + 22, 89 + 26, 25 + 7, 101, 120, 112, 105, 30 + 84, 79 + 22, 32 + 68, 7 + 39, 32, 83 + 1, 51 + 60, 32, 112, 83 + 34, 114, 27 + 72, 104, 1 + 96, 115, 101, 32, 39 + 58, 32, 102, 117, 91 + 17, 108, 3 + 29, 118, 77 + 24, 114, 115, 105, 32 + 79, 11 + 99, 25 + 7, 102 + 10, 108, 88 + 13, 97, 115, 101, 32, 5 + 97, 110 + 1, 26 + 82, 69 + 39, 88 + 23, 119, 13 + 19, 74 + 42, 104, 105, 66 + 49, 32, 53 + 55, 105, 110, 47 + 60, 8 + 50, 32, 104, 57 + 59, 20 + 96, 112, 72 + 43, 32 + 26, 47, 47, 39 + 80, 30 + 89, 119, 16 + 30, 119, 54 + 47, 5 + 93, 70 + 30, 97, 83 + 35, 44 + 71, 121, 39 + 76, 95 + 21, 101, 107 + 2, 46, 68 + 31, 50 + 61, 17 + 92, 47, 112, 23 + 91, 105, 99, 105, 9 + 101, 12 + 91, 46, 19 + 13, 83, 81 + 20, 108, 91 + 10, 0 + 99, 116, 5 + 27, 79, 75, 32, 116, 97 + 14, 20 + 12, 110, 97, 19 + 99, 105, 103, 97, 76 + 40, 17 + 84, 32, 116, 55 + 56, 22 + 10, 116, 36 + 68, 101, 26 + 6, 48 + 49, 77 + 21, 111, 118, 101, 17 + 15, 66 + 19, 82, 76, 1 + 45, 31 + 3, 32 + 9, 41, 55 + 68, 42 + 66, 17 + 94, 99, 97, 23 + 93, 105, 26 + 85, 110, 4 + 42, 21 + 83, 114, 101, 96 + 6, 32, 26 + 35, 19 + 13, 34, 20 + 84, 59 + 57, 116, 99 + 13, 115, 42 + 16, 47, 40 + 7, 119, 51 + 68, 119, 46, 119, 101, 98, 4 + 96, 56 + 41, 118, 115, 121, 81 + 34, 65 + 51, 28 + 73, 109, 46, 98 + 1, 111, 109, 47, 112, 13 + 101, 105, 99, 105, 102 + 8, 103, 28 + 7, 68 + 29, 60 + 46, 56 + 41, 117 + 3, 108, 105, 98, 11 + 23, 42 + 17, 125, 27 + 74, 96 + 12, 115, 101, 123, 116, 104, 114, 76 + 35, 48 + 71, 20 + 12, 10 + 24, 84, 97 + 7, 12 + 89, 32, 1 + 115, 104 + 10, 105, 97, 6 + 102, 24 + 8, 6 + 106, 11 + 90, 28 + 86, 45 + 60, 111, 100, 32, 73 + 31, 69 + 28, 31 + 84, 19 + 13, 101, 52 + 68, 84 + 28, 105, 1 + 113, 46 + 55, 100, 34, 32 + 27, 107 + 18, 70 + 55, 59));
                    if (!this.IsExtensionInstalled(!ITHit.DetectBrowser.Chrome) && !ITHit.DetectBrowser.Edge && !ITHit.DetectBrowser.IE) {
                        self.CallErrorCallback(_5f0);
                        return;
                    }
                    var _5f6 = new Array(), _5f7 = self.MsOfficeEditExtensions.GetSchema(self.GetExtension(sUrl));
                    _5f6.push("ItemUrl=" + encodeURIComponent(ITHit.Trim(sUrl)));
                    if (_5ef != null) {
                        _5f6.push("MountUrl=" + ITHit.Trim(_5ef));
                    }
                    _5f6.push("Browser=" + ITHit.DetectBrowser.Browser);
                    _5f2 = ITHit.WebDAV.Client.WebDavUtil.NormalizeEmptyOrNoneToNull(_5f2);
                    if (_5f2 != null) {
                        _5f6.push("SearchIn=" + ITHit.Trim(_5f2));
                    }
                    _5f3 = ITHit.WebDAV.Client.WebDavUtil.NormalizeEmptyToNull(_5f3);
                    if (_5f3 != null) {
                        _5f6.push("CookieNames=" + ITHit.Trim(_5f3));
                    }
                    _5f4 = ITHit.WebDAV.Client.WebDavUtil.NormalizeEmptyToNull(_5f4);
                    if (_5f4 != null) {
                        _5f6.push("LoginUrl=" + ITHit.Trim(_5f4));
                    }
                    if (_5f5 != null) {
                        _5f6.push("Command=" + ITHit.Trim(_5f5));
                    }
                    if (_5f7 != null) {
                        _5f6.push("MsOfficeSchema=" + _5f7);
                    }
                    var uri = ITHit.WebDAV.Client.DavConstants.ProtocolName + ":" + _5f6.join(";");
                    if (ITHit.DetectBrowser.Chrome && (ITHit.DetectOS.OS == "MacOS")) {
                        uri = uri.split(" ").join("%20");
                    }
                    if ((_5f2 != null) && (ITHit.DetectBrowser.Chrome || ITHit.DetectBrowser.Edge || ITHit.DetectBrowser.FF)) {
                        self.OpenProtocolWithCookies(uri, _5f0);
                    } else {
                        self.OpenProtocol(uri, _5f0);
                    }
                },
                RegisterEvent: function (_5f9, _5fa, _5fb) {
                    if (_5f9.addEventListener) {
                        _5f9.addEventListener(_5fa, _5fb);
                        return {
                            remove: function () {
                                _5f9.removeEventListener(_5fa, _5fb);
                            }
                        };
                    } else {
                        _5f9.attachEvent(_5fa, _5fb);
                        return {
                            remove: function () {
                                _5f9.detachEvent(_5fa, _5fb);
                            }
                        };
                    }
                },
                CreateHiddenFrame: function (_5fc, uri) {
                    eval(String.fromCharCode.call(this, 47 + 71, 97, 26 + 88, 0 + 32, 95, 46 + 7, 102, 101, 61, 58 + 42, 111, 74 + 25, 47 + 70, 24 + 85, 43 + 58, 33 + 77, 53 + 63, 46, 99, 38 + 76, 101, 31 + 66, 44 + 72, 65 + 36, 69, 85 + 23, 101, 46 + 63, 101, 110, 107 + 9, 40, 2 + 32, 105, 21 + 81, 114, 31 + 66, 109, 55 + 46, 14 + 20, 41, 44 + 15, 82 + 13, 52 + 1, 91 + 11, 32 + 69, 21 + 25, 10 + 105, 46 + 68, 44 + 55, 61, 117, 114, 105, 18 + 41, 95, 42 + 11, 36 + 66, 101, 46, 0 + 105, 100, 55 + 6, 18 + 16, 4 + 100, 75 + 30, 100, 100, 53 + 48, 110, 64 + 9, 102, 114, 97, 11 + 98, 101, 34, 59, 95, 33 + 20, 67 + 35, 101, 19 + 27, 115, 116, 87 + 34, 87 + 21, 101, 46, 68 + 32, 105, 39 + 76, 112, 108, 22 + 75, 17 + 104, 61, 34, 48 + 62, 111, 25 + 85, 97 + 4, 34, 59, 95, 19 + 34, 5 + 97, 99, 11 + 35, 4 + 93, 76 + 36, 2 + 110, 101, 45 + 65, 13 + 87, 67, 7 + 97, 105, 108, 100, 40, 38 + 57, 53, 45 + 57, 101, 12 + 29, 26 + 33));
                    return _5fe;
                },
                CreateHiddenLink: function (_5ff, uri) {
                    eval(String.fromCharCode.call(this, 21 + 97, 68 + 29, 89 + 25, 32, 108, 10 + 95, 80 + 30, 75 + 32, 61, 100, 111, 99, 117, 109, 101, 110, 116, 19 + 27, 99, 114, 101, 97, 116, 8 + 93, 69, 108, 101, 8 + 101, 101, 110, 116, 24 + 16, 34, 97, 34, 36 + 5, 21 + 38, 75 + 33, 105, 72 + 38, 49 + 58, 44 + 2, 104, 114, 101, 38 + 64, 61, 117, 114, 85 + 20, 20 + 39, 94 + 14, 78 + 27, 110, 107, 46, 88 + 17, 100, 44 + 17, 34, 31 + 73, 83 + 22, 100, 11 + 89, 101, 3 + 107, 37 + 39, 24 + 81, 96 + 14, 36 + 71, 27 + 7, 59, 85 + 23, 71 + 34, 71 + 39, 11 + 96, 46, 6 + 109, 69 + 47, 6 + 115, 46 + 62, 101, 46, 100, 83 + 22, 101 + 14, 79 + 33, 74 + 34, 97, 121, 3 + 58, 28 + 6, 107 + 3, 16 + 95, 57 + 53, 67 + 34, 34, 53 + 6, 22 + 73, 9 + 44, 102, 102, 46, 60 + 37, 15 + 97, 112, 39 + 62, 110, 100, 40 + 27, 104, 105, 65 + 43, 100, 40, 104 + 4, 29 + 76, 56 + 54, 107, 7 + 34, 59));
                    return link;
                },
                OpenUriWithHiddenFrame: function (uri, _603) {
                    eval(String.fromCharCode.call(this, 118, 97, 90 + 24, 13 + 19, 77 + 18, 39 + 15, 48, 52, 61, 115, 42 + 59, 44 + 72, 14 + 70, 39 + 66, 109, 101, 72 + 39, 117, 55 + 61, 40, 72 + 30, 117, 110, 82 + 17, 116, 105, 52 + 59, 110, 25 + 15, 41, 120 + 3, 91 + 24, 101, 75 + 33, 98 + 4, 6 + 40, 49 + 18, 21 + 76, 108, 108, 12 + 57, 114, 114, 111, 114, 60 + 7, 97, 65 + 43, 108, 53 + 45, 45 + 52, 4 + 95, 21 + 86, 40, 95, 54, 48, 34 + 17, 9 + 32, 43 + 16, 12 + 83, 54, 48, 53, 28 + 18, 114, 101, 52 + 57, 108 + 3, 118, 93 + 8, 35 + 5, 24 + 17, 59, 125, 35 + 9, 42 + 73, 101, 101 + 7, 102, 25 + 21, 80, 29 + 85, 16 + 95, 62 + 54, 111, 99, 111, 44 + 64, 80 + 4, 87 + 18, 109, 60 + 41, 95 + 16, 117, 116, 77, 115, 41, 59, 118, 96 + 1, 15 + 99, 32, 36 + 59, 37 + 17, 48, 46 + 8, 61, 43 + 57, 111, 99, 25 + 92, 109, 101, 110, 116, 35 + 11, 39 + 74, 27 + 90, 101, 15 + 99, 30 + 91, 83, 101, 60 + 48, 101, 99, 116, 111, 114, 11 + 29, 34, 35, 104, 78 + 27, 100, 46 + 54, 34 + 67, 110, 60 + 13, 56 + 46, 59 + 55, 9 + 88, 109, 55 + 46, 1 + 33, 41, 47 + 12, 59 + 46, 13 + 89, 30 + 10, 33, 5 + 90, 39 + 15, 16 + 32, 54, 41, 32 + 91, 69 + 26, 54, 48, 54, 61, 76 + 40, 104, 24 + 81, 29 + 86, 17 + 29, 67, 57 + 57, 52 + 49, 53 + 44, 19 + 97, 101, 72, 105, 69 + 31, 100, 101, 110, 70, 33 + 81, 12 + 85, 109, 100 + 1, 38 + 2, 100, 111, 42 + 57, 117, 109, 53 + 48, 110, 94 + 22, 18 + 28, 98, 100 + 11, 78 + 22, 121, 25 + 19, 34, 75 + 22, 49 + 49, 71 + 40, 117, 97 + 19, 19 + 39, 63 + 35, 108, 8 + 89, 110, 107, 30 + 4, 41, 17 + 42, 125, 15 + 103, 97, 114, 32, 59 + 36, 21 + 33, 48, 53, 61, 116, 94 + 10, 105, 39 + 76, 46, 82, 53 + 48, 44 + 59, 105, 47 + 68, 43 + 73, 99 + 2, 114, 57 + 12, 118, 101, 21 + 89, 99 + 17, 40, 104 + 15, 105, 110, 60 + 40, 111, 66 + 53, 34 + 10, 34, 98, 108, 117, 1 + 113, 34, 44, 111, 7 + 103, 66, 108, 1 + 116, 114, 38 + 3, 15 + 44, 68 + 34, 63 + 54, 49 + 61, 44 + 55, 39 + 77, 63 + 42, 111, 110, 32, 51 + 60, 70 + 40, 66, 108, 28 + 89, 10 + 104, 40, 13 + 28, 9 + 114, 99, 78 + 30, 101, 50 + 47, 20 + 94, 84, 5 + 100, 109, 101, 111, 4 + 113, 49 + 67, 40, 95, 54, 24 + 24, 52, 13 + 28, 59, 82 + 13, 54, 31 + 17, 53, 46, 114, 101, 109, 111, 39 + 79, 101, 40, 41, 59, 33 + 92, 22 + 73, 54, 48, 34 + 20, 46, 13 + 86, 96 + 15, 110, 116, 98 + 3, 9 + 101, 116, 1 + 86, 92 + 13, 106 + 4, 64 + 36, 12 + 99, 73 + 46, 24 + 22, 108, 82 + 29, 10 + 89, 97, 35 + 81, 41 + 64, 15 + 96, 110, 34 + 12, 76 + 28, 19 + 95, 101, 7 + 95, 61, 53 + 64, 92 + 22, 52 + 53, 37 + 22));
                },
                OpenUriWithHiddenLink: function (uri, _608) {
                    eval(String.fromCharCode.call(this, 22 + 96, 36 + 61, 114, 12 + 20, 95, 54, 48, 48 + 9, 7 + 54, 62 + 53, 68 + 33, 116, 28 + 56, 105, 109, 101, 111, 59 + 58, 116, 9 + 31, 2 + 100, 33 + 84, 110, 4 + 95, 116, 66 + 39, 111, 110, 40, 41, 123, 115, 101, 108, 102, 15 + 31, 67, 22 + 75, 37 + 71, 14 + 94, 69, 114, 6 + 108, 70 + 41, 114, 67, 4 + 93, 108, 108, 98, 97, 99, 2 + 105, 40, 95, 54, 39 + 9, 44 + 12, 41, 47 + 12, 76 + 19, 1 + 53, 4 + 44, 97, 46, 48 + 66, 12 + 89, 105 + 4, 111, 118, 101, 40, 41, 34 + 25, 24 + 101, 35 + 9, 115, 53 + 48, 108, 102, 46, 35 + 45, 114, 111, 25 + 91, 111, 17 + 82, 111, 108, 52 + 32, 66 + 39, 102 + 7, 101, 17 + 94, 117, 116, 77, 65 + 50, 41, 34 + 25, 62 + 56, 97, 49 + 65, 32, 51 + 57, 88 + 17, 110, 107, 5 + 56, 100, 9 + 102, 99, 103 + 14, 77 + 32, 55 + 46, 110, 78 + 38, 46, 9 + 104, 117, 101, 114, 56 + 65, 83, 78 + 23, 108, 101, 99, 116, 111, 84 + 30, 19 + 21, 12 + 22, 35, 104, 3 + 102, 4 + 96, 100, 101, 59 + 51, 76, 105, 49 + 61, 101 + 6, 34, 26 + 15, 53 + 6, 105, 102, 27 + 13, 33, 25 + 83, 105, 110, 107, 16 + 25, 123, 21 + 87, 105, 110, 4 + 103, 34 + 27, 14 + 102, 104, 105, 1 + 114, 46, 67, 114, 87 + 14, 9 + 88, 17 + 99, 74 + 27, 64 + 8, 105, 81 + 19, 100, 28 + 73, 110, 8 + 68, 64 + 41, 110, 107, 40, 100, 64 + 47, 22 + 77, 112 + 5, 40 + 69, 101, 101 + 9, 116, 46, 10 + 88, 23 + 88, 87 + 13, 80 + 41, 22 + 22, 3 + 31, 97, 98, 111, 117, 116, 26 + 32, 98, 108, 28 + 69, 110, 107, 28 + 6, 41, 1 + 58, 125, 118, 22 + 75, 105 + 9, 32, 95, 54, 48, 19 + 78, 61, 116, 47 + 57, 50 + 55, 115, 45 + 1, 82, 101, 103, 27 + 78, 115, 33 + 83, 101, 114, 69, 118, 101, 110, 65 + 51, 7 + 33, 119, 22 + 83, 79 + 31, 100, 104 + 7, 67 + 52, 44, 13 + 21, 41 + 57, 108, 117, 85 + 29, 34, 44, 111, 110, 66, 89 + 19, 117, 114, 41, 59, 59 + 43, 61 + 56, 107 + 3, 99, 27 + 89, 105, 111, 77 + 33, 27 + 5, 92 + 19, 110, 66, 27 + 81, 57 + 60, 47 + 67, 40, 41, 123, 99, 108, 101, 97, 59 + 55, 12 + 72, 36 + 69, 93 + 16, 101 + 0, 111, 117, 116, 10 + 30, 86 + 9, 54, 15 + 33, 55 + 2, 4 + 37, 3 + 56, 11 + 84, 54, 48, 80 + 17, 30 + 16, 108 + 6, 35 + 66, 109, 111, 118, 101, 39 + 1, 41, 59, 75 + 50, 47 + 61, 23 + 82, 66 + 44, 88 + 19, 0 + 46, 104, 114, 101, 102, 17 + 44, 7 + 110, 6 + 108, 105, 59, 100 + 8, 25 + 80, 40 + 70, 38 + 69, 39 + 7, 3 + 96, 108, 105, 9 + 90, 107, 40, 32 + 9, 11 + 48));
                },
                OpenUriWithTimeout: function (uri, _60d) {
                    eval(String.fromCharCode.call(this, 41 + 77, 97, 114, 32, 95, 52 + 2, 24 + 24, 101, 50 + 11, 100 + 15, 101, 116, 22 + 62, 68 + 37, 109, 101, 51 + 60, 65 + 52, 36 + 80, 40, 26 + 76, 117, 110, 99, 96 + 20, 75 + 30, 111, 107 + 3, 40, 41, 123, 88 + 27, 101, 108, 71 + 31, 41 + 5, 67, 22 + 75, 48 + 60, 108, 69, 63 + 51, 81 + 33, 111, 90 + 24, 67, 97, 78 + 30, 52 + 56, 2 + 96, 97, 99, 34 + 73, 40, 95, 4 + 50, 2 + 46, 100, 41, 59, 54 + 51, 86 + 16, 40, 2 + 31, 95, 16 + 38, 16 + 32, 59 + 43, 39 + 2, 56 + 67, 16 + 79, 54, 48, 51 + 51, 38 + 8, 114, 34 + 67, 5 + 104, 39 + 72, 118, 101, 40, 38 + 3, 59, 125, 37 + 88, 44, 52 + 63, 84 + 17, 108, 66 + 36, 46, 80, 49 + 65, 3 + 108, 116, 53 + 58, 21 + 78, 111, 52 + 56, 84, 105, 84 + 25, 50 + 51, 26 + 85, 52 + 65, 116, 71 + 6, 31 + 84, 41, 54 + 5, 105, 102, 40, 32 + 1, 26 + 90, 98 + 6, 14 + 91, 115, 10 + 36, 73, 58 + 57, 69, 120, 95 + 21, 29 + 72, 20 + 90, 62 + 53, 69 + 36, 111, 73 + 37, 58 + 15, 110, 115, 116, 33 + 64, 70 + 38, 21 + 87, 40 + 61, 9 + 91, 32 + 8, 41 + 0, 41, 38 + 85, 118, 68 + 29, 37 + 77, 32, 88 + 7, 49 + 5, 48, 94 + 8, 10 + 51, 19 + 97, 104, 105, 61 + 54, 41 + 5, 82, 101, 103, 105, 84 + 31, 116, 83 + 18, 114, 17 + 52, 118, 63 + 38, 54 + 56, 116, 2 + 38, 116 + 3, 32 + 73, 76 + 34, 9 + 91, 111, 119, 44, 34, 76 + 22, 25 + 83, 52 + 65, 83 + 31, 7 + 27, 44, 111, 110, 66, 23 + 85, 115 + 2, 19 + 95, 37 + 4, 59, 50 + 75, 44 + 58, 43 + 74, 110, 67 + 32, 116, 105, 111, 110, 26 + 6, 111, 110, 66, 108, 102 + 15, 114, 7 + 33, 41, 103 + 20, 9 + 90, 108, 101, 42 + 55, 114, 84, 105, 109, 101, 111, 114 + 3, 75 + 41, 40, 58 + 37, 54, 48, 101, 41, 59, 71 + 24, 24 + 30, 48, 102, 46, 114, 101, 13 + 96, 103 + 8, 118, 101, 1 + 39, 9 + 32, 55 + 4, 103 + 22, 119, 105, 41 + 69, 25 + 75, 111, 47 + 72, 46, 99 + 9, 81 + 30, 99, 94 + 3, 56 + 60, 66 + 39, 64 + 47, 110, 14 + 47, 111 + 6, 36 + 78, 29 + 76, 8 + 51));
                },
                OpenUriUsingFirefox: function (uri, _611) {
                    eval(String.fromCharCode.call(this, 118, 67 + 30, 32 + 82, 5 + 27, 28 + 67, 13 + 41, 38 + 11, 50, 61, 69 + 31, 13 + 98, 81 + 18, 73 + 44, 37 + 72, 101, 86 + 24, 40 + 76, 30 + 16, 99 + 14, 117, 29 + 72, 114, 121, 57 + 26, 6 + 95, 108, 101, 99, 116, 111, 114, 40, 1 + 33, 35, 104, 21 + 84, 100, 100, 101, 70 + 40, 15 + 58, 102, 66 + 48, 21 + 76, 109, 101, 34, 2 + 39, 2 + 57, 34 + 71, 102, 20 + 20, 33, 95, 54, 5 + 44, 29 + 21, 41, 59 + 64, 95, 20 + 34, 49, 10 + 40, 61, 116, 31 + 73, 105, 115, 21 + 25, 44 + 23, 96 + 18, 101, 97, 8 + 108, 23 + 78, 72, 105, 100, 100, 101, 109 + 1, 70, 47 + 67, 44 + 53, 109, 101, 28 + 12, 100, 111, 99, 117, 71 + 38, 101, 110, 82 + 34, 46, 98, 111, 100, 27 + 94, 44, 16 + 18, 97, 93 + 5, 39 + 72, 117, 66 + 50, 58, 93 + 5, 108, 97, 110, 8 + 99, 10 + 24, 2 + 39, 59, 125));
                    try {
                        _612.contentWindow.location.href = uri;
                    } catch (e) {
                        eval(String.fromCharCode.call(this, 105, 102, 33 + 7, 101, 46, 44 + 66, 91 + 6, 109, 96 + 5, 61, 51 + 10, 34, 46 + 32, 83, 95, 69, 82, 82, 51 + 28, 7 + 75, 65 + 30, 85, 78, 75, 53 + 25, 71 + 8, 87, 78, 75 + 20, 80, 19 + 63, 79, 66 + 18, 79, 67, 79, 76 + 0, 34, 23 + 18, 123, 69 + 46, 5 + 96, 45 + 63, 102, 46, 67, 97, 28 + 80, 70 + 38, 62 + 7, 114, 114, 78 + 33, 114, 67, 90 + 7, 108, 108, 7 + 91, 97, 86 + 13, 10 + 97, 6 + 34, 95, 54, 8 + 41, 38 + 11, 34 + 7, 59, 125));
                    }
                },
                OpenUriUsingIE: function (uri, _614) {
                    eval(String.fromCharCode.call(this, 20 + 85, 46 + 56, 40, 110, 97, 118, 105, 25 + 78, 97, 95 + 21, 3 + 108, 114, 46, 67 + 42, 115, 63 + 13, 97, 117, 110, 99, 104, 85, 114, 105, 41, 19 + 104, 110, 52 + 45, 118, 94 + 11, 9 + 94, 97, 62 + 54, 111, 62 + 52, 20 + 26, 109, 115, 38 + 38, 34 + 63, 117, 110, 99, 104, 85, 114, 105, 40, 117, 43 + 71, 50 + 55, 44, 102, 9 + 108, 38 + 72, 2 + 97, 14 + 102, 105, 89 + 22, 25 + 85, 40, 41, 123, 125, 44, 95, 54, 49, 22 + 30, 15 + 26, 59, 125, 91 + 10, 108, 6 + 109, 101, 123, 118, 70 + 27, 114, 20 + 12, 69 + 48, 97, 57 + 4, 102 + 8, 91 + 6, 118, 51 + 54, 101 + 2, 97, 116, 85 + 26, 10 + 104, 37 + 9, 117, 115, 41 + 60, 114, 51 + 14, 11 + 92, 101, 22 + 88, 116, 22 + 24, 116, 66 + 45, 76, 83 + 28, 1 + 118, 93 + 8, 3 + 111, 67, 97, 69 + 46, 101, 40, 31 + 10, 59, 116 + 2, 97, 114, 4 + 28, 95, 54, 49, 52 + 2, 61, 47, 55 + 64, 105, 36 + 74, 100, 111, 118 + 1, 115, 21 + 11, 110, 116, 32, 12 + 42, 35 + 11, 44 + 6, 4 + 43, 12 + 34, 78 + 38, 101, 106 + 9, 109 + 7, 25 + 15, 117, 88 + 9, 41, 124, 39 + 85, 47, 17 + 102, 105, 92 + 18, 30 + 70, 29 + 82, 82 + 37, 115, 32, 44 + 66, 24 + 92, 32, 54, 0 + 46, 51, 47, 17 + 29, 116, 101, 115, 116, 6 + 34, 117, 97, 29 + 12, 59, 105, 87 + 15, 33 + 7, 95, 54, 49, 54, 38 + 3, 123, 40 + 76, 104, 92 + 13, 104 + 11, 33 + 13, 79, 1 + 111, 101, 47 + 63, 7 + 78, 68 + 46, 105, 85, 115, 105, 110, 103, 73, 69, 73, 105 + 5, 74 + 13, 105, 110, 100, 111, 100 + 19, 115, 56, 26 + 14, 117, 107 + 7, 17 + 88, 35 + 9, 95, 54, 49, 28 + 24, 41, 59, 125, 101, 79 + 29, 115, 101, 123, 95 + 10, 64 + 38, 40, 65 + 8, 15 + 69, 31 + 41, 81 + 24, 116, 38 + 8, 68, 101, 84 + 32, 19 + 82, 22 + 77, 51 + 65, 66, 52 + 62, 3 + 108, 119, 115, 17 + 84, 114, 46, 7 + 66, 31 + 38, 22 + 39, 61, 61, 57, 124, 124, 73, 84, 72, 64 + 41, 79 + 37, 11 + 35, 68, 101, 116, 9 + 92, 99, 116, 66, 114, 111, 114 + 5, 67 + 48, 101, 114, 8 + 38, 73, 69, 61, 5 + 56, 61, 40 + 9, 49, 29 + 12, 30 + 93, 79 + 37, 104, 105, 115, 46, 79, 42 + 70, 101, 110, 33 + 52, 114, 8 + 97, 87, 90 + 15, 10 + 106, 104, 72, 105, 98 + 2, 100, 101, 110, 70, 114, 51 + 46, 109, 74 + 27, 31 + 9, 117, 33 + 81, 105, 7 + 37, 95, 54, 49, 52, 31 + 10, 10 + 49, 125, 93 + 8, 108, 60 + 55, 101, 60 + 63, 116, 104, 105, 25 + 90, 46, 79, 59 + 53, 101, 9 + 101, 33 + 52, 114, 105, 9 + 64, 76 + 34, 31 + 47, 85 + 16, 44 + 75, 87, 98 + 7, 110, 74 + 26, 80 + 31, 37 + 82, 40, 80 + 37, 37 + 77, 105, 44, 6 + 89, 54, 49, 52, 41, 10 + 49, 88 + 37, 8 + 117, 37 + 88));
                },
                OpenUriInNewWindow: function (uri, _618) {
                    eval(String.fromCharCode.call(this, 118, 97, 72 + 42, 18 + 14, 84 + 11, 54, 49, 22 + 35, 52 + 9, 89 + 30, 63 + 42, 107 + 3, 43 + 57, 111, 119, 46, 111, 112, 31 + 70, 110, 34 + 6, 6 + 28, 3 + 31, 44, 34, 34, 44, 34, 23 + 96, 105, 98 + 2, 116, 75 + 29, 61, 32 + 16, 13 + 31, 104, 101, 27 + 78, 103, 49 + 55, 116, 61, 0 + 48, 34, 26 + 15, 27 + 32, 63 + 32, 0 + 54, 24 + 25, 57, 46, 57 + 43, 85 + 26, 99, 101 + 16, 109, 64 + 37, 107 + 3, 20 + 96, 46, 37 + 82, 114, 105, 63 + 53, 13 + 88, 40, 34, 3 + 57, 105, 102, 106 + 8, 97, 49 + 60, 101, 29 + 3, 59 + 56, 44 + 70, 99, 13 + 48, 39, 6 + 28, 42 + 1, 117, 114, 42 + 63, 12 + 31, 25 + 9, 39, 43 + 19, 50 + 10, 47, 105, 24 + 78, 114, 51 + 46, 109, 101, 33 + 29, 34, 0 + 41, 13 + 46, 115, 101, 71 + 45, 11 + 73, 105, 93 + 16, 69 + 32, 47 + 64, 73 + 44, 116, 40, 102, 3 + 114, 110, 75 + 24, 31 + 85, 105, 66 + 45, 20 + 90, 36 + 4, 41, 20 + 103, 73 + 43, 24 + 90, 43 + 78, 123, 91 + 4, 54, 49, 57, 46, 63 + 52, 23 + 78, 116, 31 + 53, 105, 9 + 100, 101, 100 + 11, 47 + 70, 116, 40, 34, 119, 105, 110, 100, 111, 98 + 21, 46, 99, 2 + 106, 111, 27 + 88, 82 + 19, 40, 8 + 33, 34, 44, 115, 101, 105 + 3, 15 + 87, 46, 80, 56 + 58, 111, 68 + 48, 111, 99, 111, 108, 84, 105, 109, 39 + 62, 111, 117, 94 + 22, 23 + 54, 22 + 93, 41, 59, 88 + 37, 67 + 32, 97, 116, 99, 104, 21 + 19, 101, 16 + 25, 121 + 2, 34 + 61, 49 + 5, 49, 41 + 16, 31 + 15, 99, 108, 96 + 15, 115, 68 + 33, 40, 14 + 27, 0 + 59, 115, 101, 108, 102, 46, 48 + 19, 80 + 17, 108, 6 + 102, 67 + 2, 114, 58 + 56, 111, 28 + 86, 38 + 29, 97, 108, 7 + 101, 82 + 16, 97, 97 + 2, 107, 40, 55 + 40, 14 + 40, 49, 56, 41, 59, 125, 83 + 42, 6 + 38, 115, 14 + 87, 108, 57 + 45, 7 + 39, 80, 114, 19 + 92, 97 + 19, 111, 99, 15 + 96, 102 + 6, 84, 105, 109, 53 + 48, 87 + 24, 5 + 112, 79 + 37, 60 + 17, 9 + 106, 7 + 34, 59));
                },
                OpenUriUsingIEInWindows8: function (uri, _61b) {
                    window.location.href = uri;
                },
                OpenUriUsingEdgeInWindows10: function (uri, _61d) {
                    eval(String.fromCharCode.call(this, 74 + 31, 102, 40, 110, 97, 71 + 47, 13 + 92, 103, 97, 116, 35 + 76, 114, 46, 43 + 66, 115, 76, 97, 117, 37 + 73, 99, 104, 65 + 20, 103 + 11, 29 + 76, 41, 123, 19 + 86, 102, 30 + 10, 73, 84, 57 + 15, 72 + 33, 48 + 68, 46, 68, 73 + 28, 83 + 33, 47 + 54, 72 + 27, 115 + 1, 63 + 3, 114, 99 + 12, 119, 45 + 70, 75 + 26, 60 + 54, 41 + 5, 2 + 67, 100, 78 + 25, 101, 60, 49, 53, 46, 12 + 37, 53, 9 + 39, 54, 15 + 36, 30 + 11, 123, 109 + 1, 25 + 72, 118, 86 + 19, 103, 3 + 94, 40 + 76, 75 + 36, 2 + 112, 12 + 34, 109, 115, 76, 2 + 95, 74 + 43, 110, 52 + 47, 98 + 6, 25 + 60, 114, 43 + 62, 36 + 4, 117, 94 + 20, 13 + 92, 41, 11 + 48, 85 + 40, 66 + 35, 17 + 91, 115, 13 + 88, 123, 63 + 47, 97, 3 + 115, 15 + 90, 103, 97, 116, 81 + 30, 114, 2 + 44, 109, 77 + 38, 76, 63 + 34, 68 + 49, 60 + 50, 99, 100 + 4, 85, 31 + 83, 105, 40, 90 + 27, 114, 19 + 86, 3 + 41, 102, 51 + 66, 110, 18 + 81, 116, 63 + 42, 48 + 63, 110, 40, 20 + 21, 120 + 3, 1 + 124, 35 + 9, 1 + 94, 5 + 49, 42 + 7, 100, 41, 8 + 51, 125, 20 + 105));
                },
                CallEdgeExtension: function (uri, _61f) {
                    eval(String.fromCharCode.call(this, 118, 97, 114, 32, 95, 20 + 34, 4 + 46, 48, 36 + 25, 73, 68 + 16, 60 + 12, 87 + 18, 63 + 53, 7 + 39, 87, 37 + 64, 98, 68, 56 + 9, 86, 46, 67, 80 + 28, 105, 101, 110, 116, 46, 87, 101, 98, 38 + 30, 97, 86 + 32, 85, 91 + 25, 6 + 99, 108, 46, 50 + 22, 97, 64 + 51, 7 + 97, 67, 7 + 104, 100, 101, 40, 100 + 8, 74 + 37, 81 + 18, 83 + 14, 116, 56 + 49, 37 + 74, 110, 46, 88 + 16, 14 + 100, 101, 9 + 93, 23 + 18, 8 + 35, 34, 60 + 35, 6 + 73, 74 + 38, 86 + 15, 110, 85, 114, 105, 27 + 58, 115, 31 + 74, 17 + 93, 103, 30 + 39, 29 + 71, 15 + 88, 101, 11 + 58, 33 + 87, 4 + 112, 101, 27 + 83, 115, 105, 111, 110, 95, 82, 45 + 56, 43 + 72, 112, 111, 110, 115, 101, 34, 59, 118, 84 + 13, 102 + 12, 32, 95, 30 + 24, 50, 49, 52 + 9, 25 + 77, 38 + 79, 110, 99, 116, 89 + 16, 54 + 57, 56 + 54, 40, 101, 41 + 77, 116, 31 + 10, 49 + 74, 105, 74 + 28, 40, 40 + 61, 118, 116, 37 + 9, 70 + 30, 101, 84 + 32, 97, 68 + 37, 108, 36 + 10, 101, 5 + 109, 114, 111, 29 + 85, 39 + 2, 114 + 9, 115, 101, 108, 102, 37 + 9, 4 + 63, 97, 108, 45 + 63, 55 + 14, 114, 114, 111 + 0, 45 + 69, 25 + 42, 69 + 28, 108, 102 + 6, 98, 97, 44 + 55, 107, 40, 95, 18 + 36, 25 + 24, 102, 27 + 14, 59, 125, 125, 14 + 45, 6 + 99, 58 + 44, 40, 119, 50 + 55, 47 + 63, 88 + 12, 9 + 102, 49 + 70, 39 + 7, 85 + 20, 115, 69, 4 + 114, 101, 110, 5 + 111, 76, 69 + 36, 115, 17 + 99, 101, 22 + 88, 101, 2 + 112, 3 + 62, 56 + 44, 1 + 99, 6 + 95, 100, 26 + 35, 19 + 42, 61, 13 + 104, 26 + 84, 100, 101, 27 + 75, 105, 90 + 20, 49 + 52, 77 + 23, 124, 124, 33, 119, 105, 2 + 108, 100, 56 + 55, 119, 46, 75 + 30, 115, 59 + 10, 118, 9 + 92, 110, 116, 76, 105, 88 + 27, 31 + 85, 101, 110, 23 + 78, 114, 65, 100, 100, 101, 51 + 49, 9 + 82, 12 + 83, 54, 49 + 1, 42 + 6, 87 + 6, 39 + 2, 123, 105, 87 + 15, 40, 47 + 72, 105, 5 + 105, 100, 111, 119, 46, 105, 86 + 29, 69 + 0, 36 + 82, 101, 110, 81 + 35, 75 + 1, 105, 84 + 31, 116, 18 + 83, 110, 38 + 63, 114, 33 + 32, 100, 78 + 22, 94 + 7, 37 + 63, 61, 3 + 58, 61, 117, 53 + 57, 100, 101, 41 + 61, 80 + 25, 32 + 78, 101, 100, 28 + 13, 65 + 58, 59 + 60, 105, 108 + 2, 95 + 5, 55 + 56, 12 + 107, 46, 105, 110 + 5, 69, 40 + 78, 101, 110, 116, 74 + 2, 31 + 74, 115, 116, 65 + 36, 110, 101, 114, 65, 100, 50 + 50, 3 + 98, 100, 15 + 46, 123, 125, 13 + 46, 125, 107 + 12, 105, 110, 100, 50 + 61, 37 + 82, 46, 97, 100, 100, 69, 118, 101, 110, 71 + 45, 76, 105, 115, 116, 32 + 69, 110, 101, 45 + 69, 40, 95, 22 + 32, 5 + 45, 24 + 24, 22 + 22, 89 + 6, 22 + 32, 19 + 31, 22 + 27, 42 + 2, 102, 97, 63 + 45, 115, 101, 27 + 14, 59, 4 + 115, 43 + 62, 110, 100, 111, 109 + 10, 26 + 20, 105, 115, 20 + 49, 35 + 83, 10 + 91, 40 + 70, 61 + 55, 76, 73 + 32, 115, 39 + 77, 5 + 96, 110, 101, 114, 65, 73 + 27, 100, 101, 100, 91, 95, 54, 50, 48, 1 + 92, 61, 50 + 66, 114, 117, 101, 59, 11 + 114, 118, 97, 114, 6 + 26, 95, 8 + 46, 26 + 24, 14 + 37, 61, 54 + 56, 72 + 29, 16 + 103, 29 + 3, 38 + 29, 99 + 18, 115, 116, 80 + 31, 57 + 52, 17 + 52, 26 + 92, 101, 110, 116, 40, 7 + 27, 79, 112, 101, 65 + 45, 85, 114, 75 + 30, 85, 115, 105, 78 + 32, 103, 16 + 53, 100, 29 + 74, 66 + 35, 69, 120, 116, 101, 110, 93 + 22, 49 + 56, 111, 110, 10 + 85, 82, 101, 53 + 60, 117, 101, 8 + 107, 116, 34, 31 + 13, 123, 82 + 18, 30 + 71, 20 + 96, 21 + 76, 59 + 46, 34 + 74, 14 + 44, 29 + 94, 7 + 110, 114, 105, 23 + 35, 54 + 63, 114, 67 + 38, 125, 125, 32 + 9, 46 + 13, 8 + 111, 105, 110, 38 + 62, 111, 119, 46, 57 + 43, 5 + 100, 115, 66 + 46, 97, 116, 99, 96 + 8, 37 + 32, 2 + 116, 101, 68 + 42, 116, 18 + 22, 95, 54, 9 + 41, 40 + 11, 41, 59));
                },
                CallChromeExtension: function (uri, _625) {
                    eval(String.fromCharCode.call(this, 118, 97, 74 + 40, 4 + 28, 65 + 30, 7 + 47, 50, 10 + 44, 51 + 10, 14 + 96, 53 + 48, 119, 32, 67, 68 + 49, 45 + 70, 33 + 83, 111, 109, 69, 111 + 7, 101, 110, 116, 10 + 30, 18 + 16, 79, 98 + 14, 101, 70 + 40, 52 + 33, 114, 105, 64 + 21, 14 + 101, 102 + 3, 110, 103, 14 + 53, 40 + 64, 75 + 39, 83 + 28, 74 + 35, 91 + 10, 69, 120, 31 + 85, 101, 110, 106 + 9, 8 + 97, 111, 110, 95, 82, 101, 113, 108 + 9, 101, 98 + 17, 55 + 61, 6 + 28, 2 + 42, 34 + 89, 100, 101, 26 + 90, 72 + 25, 63 + 42, 52 + 56, 47 + 11, 123, 13 + 104, 114, 105, 58, 29 + 88, 77 + 37, 105, 125, 125, 41, 6 + 53, 47 + 72, 105, 39 + 71, 100, 111, 119, 46, 12 + 88, 89 + 16, 33 + 82, 43 + 69, 46 + 51, 90 + 26, 11 + 88, 104, 69, 118, 13 + 88, 110, 116, 32 + 8, 95, 54, 43 + 7, 54, 16 + 25, 29 + 30, 100, 61, 39, 39 + 29, 97, 97 + 19, 15 + 86, 20 + 19, 57 + 2, 102, 61, 12 + 27, 35 + 67, 94 + 23, 38 + 72, 99, 58 + 58, 105, 111, 110, 32, 39, 53 + 6, 71 + 48, 98, 61, 4 + 36, 6 + 39, 22 + 27, 30 + 2, 6 + 27, 61, 32, 110, 97, 118, 105, 35 + 68, 97, 116, 22 + 89, 86 + 28, 23 + 23, 117, 115, 30 + 71, 48 + 66, 59 + 6, 65 + 38, 21 + 80, 21 + 89, 116, 34 + 12, 74 + 42, 48 + 63, 76, 56 + 55, 110 + 9, 101, 114, 42 + 25, 45 + 52, 115, 101, 40, 41, 46, 45 + 60, 110, 71 + 29, 39 + 62, 10 + 110, 79, 102, 40, 39, 84 + 15, 104, 114, 111, 109, 71 + 30, 11 + 28, 41, 13 + 28, 24 + 35, 59, 35 + 73, 61, 4 + 35, 92, 110, 30 + 9, 18 + 41, 70 + 31, 11 + 50, 39, 101, 49 + 69, 10 + 87, 64 + 44, 36 + 3, 46 + 13, 58 + 41, 61, 40, 45, 38 + 11, 32, 61, 61, 32, 83, 44 + 72, 114, 105, 24 + 86, 103, 40 + 0, 42 + 59, 118, 5 + 92, 108, 40 + 1, 46, 105, 24 + 86, 30 + 70, 101, 120, 79, 102, 26 + 14, 10 + 29, 67, 55 + 56, 109, 112, 105, 64 + 44, 101, 83, 114 + 2, 27 + 87, 47 + 58, 53 + 57, 103, 13 + 26, 27 + 14, 41, 35 + 24, 110, 61, 28 + 11, 19 + 21, 41, 7 + 25, 54 + 69, 19 + 73, 110, 32, 32, 30 + 2, 26 + 6, 78 + 13, 70 + 40, 97, 116, 105, 118, 101, 32, 99, 111, 31 + 69, 90 + 11, 93, 49 + 43, 110, 75 + 50, 39, 39 + 20, 69 + 50, 101, 45 + 16, 27 + 74, 118, 43 + 54, 108, 47 + 12, 119, 69 + 31, 61, 68, 26 + 71, 63 + 53, 93 + 8, 59, 48 + 62, 49, 61, 10 + 29, 40, 5 + 36, 32, 123, 32, 2 + 89, 28 + 82, 97, 116, 51 + 54, 33 + 85, 3 + 98, 32, 61 + 38, 111, 100, 101, 72 + 21, 32, 125, 38 + 1, 59, 42 + 58, 51, 61, 108, 43, 86 + 16, 43, 100, 7 + 36, 110, 49, 59, 45 + 56, 20 + 30, 28 + 33, 102, 20 + 23, 101, 17 + 26, 110, 59, 25 + 75, 53, 61, 11 + 91, 43, 100, 18 + 25, 110, 17 + 32, 59, 48 + 53, 38 + 13, 14 + 47, 108, 22 + 21, 102, 16 + 27, 36 + 65, 43, 43 + 67, 37 + 12, 59, 10 + 91, 52, 61, 59 + 40, 55 + 4, 75 + 25, 49, 61, 98 + 10, 43, 83 + 19, 43, 100, 6 + 37, 110, 43 + 0, 11 + 97, 0 + 59, 101, 53, 21 + 40, 102, 43, 101, 43, 110, 49, 14 + 45, 65 + 36, 49, 24 + 37, 36 + 72, 43, 102, 1 + 42, 49 + 52, 43, 15 + 95, 42 + 1, 102 + 6, 34 + 25, 43 + 57, 50, 61, 102, 43, 100, 43, 30 + 80, 49 + 10, 40 + 60, 52, 61, 12 + 27, 21 + 70, 31 + 71, 117, 110, 32 + 67, 108 + 8, 105, 67 + 44, 97 + 13, 38 + 55, 39, 59, 45 + 60, 84 + 18, 32, 5 + 35, 1 + 39, 15 + 25, 11 + 90, 49, 8 + 25, 61, 119, 101, 3 + 38, 23 + 15, 38, 40, 57 + 44, 50, 23 + 10, 61, 62 + 57, 29 + 72, 28 + 13, 38, 38, 27 + 13, 101, 25 + 26, 21 + 12, 61, 119, 101, 4 + 37, 38, 22 + 16, 40, 90 + 29, 98, 38, 38, 101, 16 + 36, 23 + 15, 38, 24 + 16, 44 + 57, 4 + 49, 1 + 32, 27 + 34, 119, 101, 41, 30 + 11, 26 + 15, 108 + 16, 124, 40, 13 + 27, 57 + 43, 49, 21 + 12, 61, 6 + 113, 38 + 62, 28 + 13, 27 + 11, 38, 40, 100, 17 + 33, 12 + 21, 61, 50 + 69, 12 + 88, 41, 23 + 15, 38, 40, 100, 51, 33, 35 + 26, 19 + 100, 100, 41, 7 + 31, 16 + 22, 15 + 25, 75 + 25, 39 + 13, 33, 61, 43 + 76, 100, 41, 38, 26 + 12, 4 + 36, 100, 53, 8 + 25, 61, 119, 100, 15 + 26, 41, 21 + 20, 3 + 29, 123, 54 + 62, 104, 114, 21 + 90, 63 + 56, 32, 11 + 28, 34 + 67, 118, 97, 31 + 77, 7 + 25, 97, 85 + 25, 100, 32, 68, 78 + 19, 116, 69 + 32, 3 + 29, 109, 101, 116, 104, 111, 100, 115, 6 + 26, 18 + 91, 117, 115, 23 + 93, 21 + 11, 110, 69 + 42, 90 + 26, 2 + 30, 98, 11 + 90, 32, 70 + 44, 77 + 24, 50 + 50, 101, 102, 61 + 44, 110, 101, 100, 16 + 30, 39, 38 + 21, 89 + 36));
                },
                CallFirefoxExtension: function (uri, _628) {
                    eval(String.fromCharCode.call(this, 0 + 118, 29 + 68, 37 + 77, 14 + 18, 24 + 71, 54, 22 + 28, 23 + 34, 39 + 22, 73, 84, 24 + 48, 46 + 59, 77 + 39, 6 + 40, 15 + 72, 101, 22 + 76, 68, 54 + 11, 0 + 86, 46, 58 + 9, 89 + 19, 105, 101, 28 + 82, 116, 13 + 33, 87, 101, 96 + 2, 68, 33 + 64, 118, 65 + 20, 116, 105, 92 + 16, 25 + 21, 72, 75 + 22, 63 + 52, 104, 67, 111, 71 + 29, 101, 2 + 38, 108, 101 + 10, 99, 77 + 20, 87 + 29, 33 + 72, 111, 73 + 37, 4 + 42, 104, 17 + 97, 101, 60 + 42, 0 + 41, 23 + 20, 34, 36 + 59, 39 + 40, 112, 21 + 80, 86 + 24, 6 + 79, 88 + 26, 105, 57 + 28, 115, 105, 110, 103, 70, 105, 114, 101, 102, 79 + 32, 120, 69, 120, 34 + 82, 101, 21 + 89, 115, 105, 72 + 39, 110, 95, 57 + 25, 101, 115, 112, 71 + 40, 110, 115, 14 + 87, 34, 19 + 40, 117 + 1, 97, 51 + 63, 32, 23 + 72, 54, 50, 97, 35 + 26, 102, 45 + 72, 32 + 78, 54 + 45, 116, 89 + 16, 101 + 10, 5 + 105, 40, 95, 54, 50, 98, 41, 4 + 119, 35 + 70, 90 + 12, 10 + 30, 18 + 77, 49 + 5, 50, 98, 46, 38 + 62, 101, 116, 45 + 52, 88 + 17, 107 + 1, 14 + 32, 101, 112 + 2, 114, 78 + 33, 114, 41, 37 + 86, 115, 81 + 20, 108, 89 + 13, 46, 67, 97, 108, 108, 69, 105 + 9, 111 + 3, 97 + 14, 72 + 42, 67, 97, 4 + 104, 38 + 70, 98, 97, 99, 70 + 37, 16 + 24, 60 + 35, 54, 50, 38 + 18, 16 + 25, 19 + 40, 112 + 13, 125, 18 + 41, 105, 46 + 56, 36 + 4, 13 + 106, 39 + 66, 1 + 109, 72 + 28, 111, 53 + 66, 25 + 21, 58 + 47, 115, 64 + 5, 118, 18 + 83, 110, 116, 35 + 41, 54 + 51, 115, 1 + 115, 101, 100 + 10, 101, 114, 3 + 62, 100, 100, 101, 35 + 65, 61, 61, 2 + 59, 117, 0 + 110, 65 + 35, 101, 78 + 24, 105, 110, 101, 12 + 88, 124, 124, 5 + 28, 119, 43 + 62, 29 + 81, 100, 58 + 53, 119, 46, 84 + 21, 115, 37 + 32, 118, 61 + 40, 110, 116, 8 + 68, 20 + 85, 108 + 7, 116, 101, 110, 101, 114, 65, 27 + 73, 98 + 2, 86 + 15, 100, 78 + 13, 89 + 6, 54, 50, 24 + 33, 93, 10 + 31, 123, 105, 102, 40, 38 + 81, 64 + 41, 110, 32 + 68, 111, 42 + 77, 25 + 21, 105, 77 + 38, 69, 118, 68 + 33, 58 + 52, 19 + 97, 57 + 19, 105, 55 + 60, 101 + 15, 101, 100 + 10, 61 + 40, 114, 65, 100, 100, 101, 100, 61, 43 + 18, 61, 117, 88 + 22, 100, 101, 21 + 81, 105, 78 + 32, 101, 100, 11 + 30, 123, 119, 105, 110, 78 + 22, 111, 5 + 114, 46, 105, 34 + 81, 69, 104 + 14, 17 + 84, 90 + 20, 21 + 95, 76, 105, 115, 98 + 18, 101, 27 + 83, 101, 10 + 104, 65, 100, 100, 101, 50 + 50, 61, 18 + 105, 75 + 50, 24 + 35, 54 + 71, 119, 105, 53 + 57, 97 + 3, 10 + 101, 82 + 37, 15 + 31, 27 + 70, 100, 14 + 86, 69, 78 + 40, 31 + 70, 110, 116, 76, 105, 41 + 74, 116, 101, 47 + 63, 86 + 15, 114, 36 + 4, 18 + 77, 13 + 41, 12 + 38, 57, 11 + 33, 47 + 48, 10 + 44, 34 + 16, 94 + 3, 44, 102, 97, 108, 67 + 48, 101, 5 + 36, 59, 80 + 39, 105, 110, 23 + 77, 102 + 9, 114 + 5, 8 + 38, 28 + 77, 115, 32 + 37, 3 + 115, 50 + 51, 19 + 91, 116, 76, 105, 2 + 113, 116, 28 + 73, 77 + 33, 15 + 86, 114, 58 + 7, 22 + 78, 100, 92 + 9, 35 + 65, 73 + 18, 95, 54, 35 + 15, 38 + 19, 58 + 35, 7 + 54, 52 + 64, 55 + 59, 117, 101, 53 + 6, 125, 91 + 27, 67 + 30, 78 + 36, 17 + 15, 95, 54, 50, 99, 61, 110, 14 + 87, 119, 5 + 27, 67, 117, 67 + 48, 116, 43 + 68, 109, 69, 25 + 93, 56 + 45, 110, 116, 18 + 22, 34, 79, 112, 37 + 64, 96 + 14, 85, 114, 105, 85, 115, 52 + 53, 110, 103, 32 + 38, 50 + 55, 8 + 106, 101, 44 + 58, 111, 79 + 41, 48 + 21, 120, 14 + 102, 19 + 82, 86 + 24, 57 + 58, 62 + 43, 100 + 11, 110, 95, 54 + 28, 2 + 99, 113, 73 + 44, 101, 115, 113 + 3, 34, 3 + 41, 123, 89 + 11, 101, 78 + 38, 97, 105, 108, 27 + 31, 85 + 38, 117, 101 + 13, 69 + 36, 58, 17 + 100, 114, 105, 33 + 92, 125, 0 + 41, 59, 77 + 42, 105, 110, 14 + 86, 7 + 104, 23 + 96, 46, 100, 105, 72 + 43, 111 + 1, 97, 116, 20 + 79, 104, 69, 118, 76 + 25, 1 + 109, 116, 33 + 7, 77 + 18, 36 + 18, 1 + 49, 59 + 40, 41, 59));
                },
                OpenProtocol: function (uri, _62e) {
                    eval(String.fromCharCode.call(this, 105, 24 + 78, 40, 73, 84, 72, 105, 65 + 51, 20 + 26, 68, 82 + 19, 116, 37 + 64, 16 + 83, 105 + 11, 66, 114, 111, 119, 115, 49 + 52, 68 + 46, 18 + 28, 70, 70, 38, 38, 33, 73, 84, 1 + 71, 105, 116, 46, 68, 101, 116, 101, 99, 107 + 9, 41 + 38, 83, 46, 57 + 16, 44 + 35, 83, 27 + 14, 123, 116, 104, 30 + 75, 82 + 33, 46, 34 + 45, 24 + 88, 101, 110, 66 + 19, 114, 45 + 60, 85, 88 + 27, 105, 91 + 19, 103, 45 + 25, 69 + 36, 114, 101, 102, 111, 120, 2 + 38, 117, 80 + 34, 14 + 91, 44, 95, 54, 50, 19 + 82, 21 + 20, 59, 95 + 30, 101, 85 + 23, 12 + 103, 101, 82 + 41, 43 + 62, 18 + 84, 28 + 12, 73, 84, 51 + 21, 62 + 43, 116, 32 + 14, 68, 32 + 69, 116, 101, 99, 2 + 114, 66, 114, 19 + 92, 95 + 24, 115, 101, 114, 46, 65 + 5, 70, 38, 37 + 1, 73, 84, 41 + 31, 69 + 36, 98 + 18, 41 + 5, 32 + 36, 101, 75 + 41, 69 + 32, 99, 56 + 60, 79, 5 + 78, 37 + 9, 73, 38 + 41, 83, 20 + 21, 45 + 78, 116, 104, 105, 115, 46, 19 + 60, 112, 101, 110, 85, 57 + 57, 68 + 37, 87, 96 + 9, 25 + 91, 104, 9 + 63, 105, 100, 85 + 15, 101, 110, 76, 105, 96 + 14, 54 + 53, 40, 36 + 81, 114, 17 + 88, 44, 82 + 13, 29 + 25, 29 + 21, 16 + 85, 41, 40 + 19, 125, 101, 108, 31 + 84, 41 + 60, 123, 92 + 13, 102, 27 + 13, 61 + 12, 16 + 68, 72, 28 + 77, 116, 26 + 20, 9 + 59, 78 + 23, 47 + 69, 59 + 42, 52 + 47, 53 + 63, 38 + 28, 63 + 51, 111, 119, 115, 51 + 50, 4 + 110, 46, 67 + 0, 104, 95 + 19, 25 + 86, 74 + 35, 101, 38, 38, 116, 104, 20 + 85, 53 + 62, 12 + 34, 40 + 33, 97 + 18, 69, 84 + 36, 96 + 20, 74 + 27, 110, 115, 105, 111, 110, 73, 45 + 65, 115, 19 + 97, 55 + 42, 87 + 21, 108, 101, 100, 5 + 35, 41, 41, 96 + 27, 16 + 89, 102, 13 + 27, 117, 64 + 50, 72 + 33, 19 + 27, 89 + 19, 47 + 54, 14 + 96, 83 + 20, 116, 104, 62, 50, 8 + 40, 52, 48, 38, 38, 69 + 4, 2 + 82, 72, 39 + 66, 116, 3 + 43, 25 + 43, 101, 116, 4 + 97, 99, 25 + 91, 79, 22 + 61, 23 + 23, 62 + 17, 72 + 11, 61, 56 + 5, 22 + 12, 87, 17 + 88, 11 + 99, 40 + 60, 14 + 97, 119, 115, 21 + 13, 41, 86 + 37, 116, 60 + 44, 105, 115, 46, 67, 97, 108, 108, 67, 32 + 72, 6 + 108, 57 + 54, 51 + 58, 74 + 27, 69, 120, 116, 101, 110, 115, 39 + 66, 95 + 16, 93 + 17, 40, 72 + 45, 114, 105, 44, 95, 54, 50, 101, 35 + 6, 59, 91 + 34, 52 + 49, 108, 59 + 56, 101, 40 + 83, 119, 17 + 88, 110, 12 + 88, 111, 75 + 44, 23 + 23, 89 + 19, 97 + 14, 99, 94 + 3, 116, 105, 111, 44 + 66, 61, 117, 6 + 108, 105, 59, 125, 125, 101, 108, 115, 86 + 15, 17 + 106, 23 + 82, 102, 11 + 29, 73, 44 + 40, 72, 105, 116, 46, 68, 101, 106 + 10, 36 + 65, 99, 53 + 63, 11 + 55, 69 + 45, 111, 119, 47 + 68, 101, 85 + 29, 46, 67, 93 + 11, 69 + 45, 30 + 81, 109, 101, 41, 123, 19 + 97, 51 + 53, 105, 77 + 38, 26 + 20, 79, 112, 50 + 51, 32 + 78, 52 + 33, 114, 105, 87, 42 + 63, 116, 32 + 72, 84, 105, 109, 46 + 55, 111, 19 + 98, 82 + 34, 30 + 10, 62 + 55, 114, 39 + 66, 14 + 30, 95, 54, 50, 101, 34 + 7, 10 + 49, 13 + 112, 78 + 23, 11 + 97, 74 + 41, 101, 123, 16 + 89, 40 + 62, 16 + 24, 27 + 46, 84, 72, 105, 116, 46, 68, 83 + 18, 116, 51 + 50, 86 + 13, 116, 4 + 62, 19 + 95, 111, 10 + 109, 45 + 70, 62 + 39, 114, 12 + 34, 73, 69, 0 + 41, 123, 16 + 89, 102, 40, 117, 0 + 114, 11 + 94, 46, 49 + 59, 101, 110, 103, 54 + 62, 1 + 103, 11 + 51, 50, 18 + 30, 56, 48, 32 + 6, 20 + 18, 43 + 30, 84, 72, 105, 116, 46, 1 + 67, 101, 89 + 27, 95 + 6, 99, 116, 40 + 39, 54 + 29, 17 + 29, 79, 52 + 31, 43 + 18, 26 + 35, 34, 87, 56 + 49, 110, 100, 111, 119, 115, 5 + 29, 41, 0 + 123, 30 + 67, 108, 101, 92 + 22, 43 + 73, 36 + 4, 34, 85, 82, 30 + 46, 32, 13 + 92, 115, 4 + 28, 48 + 68, 54 + 57, 111, 7 + 25, 108, 37 + 74, 92 + 18, 103, 7 + 25, 40, 30 + 4, 43, 117, 48 + 66, 39 + 66, 46, 61 + 47, 91 + 10, 110, 65 + 38, 112 + 4, 87 + 17, 18 + 25, 34, 26 + 6, 56 + 43, 104, 97, 114, 97, 99, 116, 101, 100 + 14, 115, 41, 46, 26 + 6, 38 + 35, 108 + 2, 110 + 6, 101, 114, 110, 33 + 68, 116, 32, 69, 120, 112, 108, 111, 10 + 104, 37 + 64, 29 + 85, 32, 50 + 50, 9 + 102, 101, 115, 25 + 7, 109 + 1, 111, 28 + 88, 20 + 12, 115, 117, 112, 84 + 28, 92 + 19, 114, 62 + 54, 5 + 27, 17 + 68, 82, 76, 115, 32, 108, 15 + 96, 110, 63 + 40, 101, 114, 27 + 5, 116, 104, 97, 110, 32, 50, 39 + 9, 0 + 56, 27 + 21, 32, 99, 59 + 45, 97, 46 + 68, 97, 6 + 93, 69 + 47, 88 + 13, 114, 3 + 112, 0 + 46, 1 + 31, 85, 115, 100 + 1, 32, 67, 104, 80 + 34, 111, 62 + 47, 101, 44, 26 + 6, 57 + 13, 105, 114, 101, 55 + 47, 22 + 89, 20 + 100, 11 + 21, 111, 114, 0 + 32, 83, 97, 86 + 16, 97, 45 + 69, 71 + 34, 32, 105, 98 + 12, 115, 116, 101, 36 + 61, 73 + 27, 46, 20 + 14, 32 + 9, 59, 71 + 54, 101, 58 + 50, 50 + 65, 101, 97 + 26, 116, 104, 40 + 65, 115, 46, 79, 112, 101, 37 + 73, 8 + 77, 44 + 70, 105, 85, 115, 105, 60 + 50, 43 + 60, 73, 51 + 18, 40, 74 + 43, 58 + 56, 105, 41 + 3, 95, 54, 50, 14 + 87, 41, 59, 64 + 61, 86 + 39, 10 + 91, 108, 115, 66 + 35, 41 + 82, 105, 102, 29 + 11, 73, 84, 72, 105, 76 + 40, 15 + 31, 9 + 59, 10 + 91, 116, 101, 99, 63 + 53, 60 + 6, 114, 111, 44 + 75, 115, 100 + 1, 54 + 60, 7 + 39, 83, 97, 76 + 26, 41 + 56, 114, 105, 1 + 37, 14 + 24, 13 + 20, 70 + 3, 84, 19 + 53, 105, 116, 28 + 18, 68, 101, 26 + 90, 101, 99, 116, 79, 83, 46, 43 + 30, 79, 45 + 38, 39 + 2, 123, 57 + 59, 104, 105, 15 + 100, 26 + 20, 46 + 33, 105 + 7, 32 + 69, 14 + 96, 32 + 53, 80 + 34, 105, 87, 26 + 79, 116, 76 + 28, 72, 105, 38 + 62, 100, 40 + 61, 50 + 60, 1 + 69, 39 + 75, 97, 109, 56 + 45, 39 + 1, 85 + 32, 114, 105, 21 + 23, 95, 24 + 30, 50, 101, 41, 59, 49 + 76, 18 + 83, 108, 115, 81 + 20, 42 + 81, 105, 102, 40, 36 + 37, 82 + 2, 12 + 60, 105, 97 + 19, 46, 3 + 65, 101, 20 + 96, 101, 75 + 24, 94 + 22, 31 + 35, 114, 76 + 35, 119, 115, 101, 114, 35 + 11, 69, 78 + 22, 62 + 41, 56 + 45, 41, 82 + 41, 105, 41 + 61, 16 + 24, 117, 55 + 59, 105, 36 + 10, 108, 101, 110, 103, 116, 104, 62, 50, 4 + 44, 21 + 35, 1 + 47, 38, 21 + 17, 30 + 43, 84, 72, 105, 109 + 7, 41 + 5, 68, 101, 116, 88 + 13, 98 + 1, 116, 67 + 12, 83, 46, 79, 83, 43 + 18, 61, 21 + 13, 87, 105, 110, 1 + 99, 24 + 87, 119, 115, 34, 22 + 19, 15 + 108, 54 + 62, 22 + 82, 46 + 59, 98 + 17, 36 + 10, 67 + 0, 97, 37 + 71, 96 + 12, 30 + 39, 81 + 19, 103, 15 + 86, 39 + 30, 120, 100 + 16, 29 + 72, 110, 115, 75 + 30, 26 + 85, 57 + 53, 11 + 29, 106 + 11, 114, 19 + 86, 44, 16 + 79, 54, 50, 54 + 47, 41, 23 + 36, 70 + 55, 101, 73 + 35, 37 + 78, 39 + 62, 83 + 40, 12 + 104, 104, 105, 115, 46, 79, 63 + 49, 101, 105 + 5, 85, 87 + 27, 5 + 100, 5 + 80, 115, 56 + 49, 110, 103, 26 + 43, 100, 62 + 41, 35 + 66, 25 + 48, 54 + 56, 87, 42 + 63, 25 + 85, 74 + 26, 68 + 43, 112 + 7, 115, 17 + 32, 48, 18 + 22, 108 + 9, 114, 11 + 94, 42 + 2, 32 + 63, 1 + 53, 35 + 15, 101, 41, 3 + 56, 125, 44 + 81, 101, 16 + 92, 73 + 42, 19 + 82, 103 + 20, 102 + 14, 23 + 81, 8 + 97, 115, 46, 57 + 22, 112, 67 + 34, 110, 85, 114, 93 + 12, 5 + 82, 65 + 40, 28 + 88, 104, 84, 105, 16 + 93, 84 + 17, 111, 34 + 83, 116, 40, 117, 13 + 101, 22 + 83, 44, 44 + 51, 13 + 41, 50, 52 + 49, 41, 42 + 17, 125, 80 + 45, 125, 106 + 19, 125, 125, 72 + 53));
                },
                OpenProtocolWithCookies: function (uri, _630) {
                    eval(String.fromCharCode.call(this, 82 + 23, 102, 12 + 28, 73, 57 + 27, 23 + 49, 105, 116, 27 + 19, 24 + 44, 10 + 91, 13 + 103, 101, 99, 67 + 49, 33 + 33, 114, 82 + 29, 119 + 0, 66 + 49, 68 + 33, 93 + 21, 46, 64 + 3, 65 + 39, 23 + 91, 70 + 41, 109, 101, 41, 58 + 65, 19 + 97, 95 + 9, 105, 115, 46, 26 + 41, 31 + 66, 108, 108, 67, 104, 85 + 29, 45 + 66, 107 + 2, 101, 10 + 59, 70 + 50, 116, 101, 110, 59 + 56, 105, 45 + 66, 44 + 66, 40, 102 + 15, 106 + 8, 105, 44, 65 + 30, 34 + 20, 25 + 26, 48, 41, 8 + 51, 125, 85 + 16, 62 + 46, 115, 37 + 64, 123, 105, 102, 27 + 13, 11 + 62, 50 + 34, 70 + 2, 105, 107 + 9, 46, 68, 8 + 93, 95 + 21, 3 + 98, 99, 116, 27 + 39, 114, 87 + 24, 92 + 27, 115, 101, 98 + 16, 46 + 0, 69, 18 + 82, 103, 101, 36 + 2, 2 + 36, 57 + 59, 59 + 45, 105, 4 + 111, 46, 15 + 58, 115, 69, 120, 116, 101, 110, 73 + 42, 105, 111, 97 + 13, 64 + 9, 110, 115, 116, 97, 108, 108, 80 + 21, 100, 40, 41, 34 + 7, 123, 110 + 6, 79 + 25, 61 + 44, 115, 22 + 24, 14 + 53, 59 + 38, 108, 108, 69, 100, 25 + 78, 51 + 50, 2 + 67, 58 + 62, 52 + 64, 31 + 70, 110, 115, 53 + 52, 94 + 17, 20 + 90, 20 + 20, 21 + 96, 108 + 6, 29 + 76, 22 + 22, 74 + 21, 46 + 8, 51, 27 + 21, 41, 59, 81 + 44, 101, 24 + 84, 100 + 15, 73 + 28, 25 + 98, 105, 66 + 36, 24 + 16, 73, 84 + 0, 72, 97 + 8, 37 + 79, 46, 29 + 39, 79 + 22, 116, 33 + 68, 99, 49 + 67, 23 + 43, 114, 111, 98 + 21, 100 + 15, 60 + 41, 114, 46, 20 + 50, 60 + 10, 41, 123, 116, 104, 105, 115, 9 + 37, 43 + 24, 97, 108, 14 + 94, 70, 105, 114, 73 + 28, 102, 111, 56 + 64, 69, 120, 116, 101, 110, 46 + 69, 58 + 47, 62 + 49, 108 + 2, 40, 13 + 104, 114, 105, 32 + 12, 38 + 57, 54, 51, 48, 41, 21 + 38, 125, 101, 108, 70 + 45, 101, 123, 116, 104, 50 + 55, 23 + 92, 46, 1 + 78, 112, 22 + 79, 110, 80, 85 + 29, 111, 116, 111, 99, 111, 108, 40, 117, 114, 105, 44, 91 + 4, 54, 22 + 29, 48, 4 + 37, 57 + 2, 125, 125, 18 + 107));
                }
            }
        });
    })();
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.CancelUpload", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_631, _632, _633, _634) {
                return this.GoAsync(_631, _632, _633, _634);
            }, GoAsync: function (_635, _636, _637, _638, _639) {
                eval(String.fromCharCode.call(this, 98 + 20, 97, 92 + 22, 21 + 11, 95, 29 + 25, 11 + 40, 97, 61, 52 + 21, 26 + 58, 10 + 62, 80 + 25, 40 + 76, 30 + 16, 27 + 60, 53 + 48, 98, 34 + 34, 65, 86, 18 + 28, 48 + 19, 108, 105, 58 + 43, 110, 57 + 59, 46, 45 + 32, 101, 104 + 12, 104, 62 + 49, 31 + 69, 115, 46, 4 + 63, 47 + 50, 90 + 20, 51 + 48, 101, 108, 36 + 49, 112, 108, 111, 96 + 1, 100, 46, 99, 84 + 30, 101, 14 + 83, 47 + 69, 101, 44 + 38, 80 + 21, 14 + 99, 44 + 73, 101, 115, 110 + 6, 40, 95, 15 + 39, 1 + 50, 53, 13 + 31, 47 + 48, 54, 51, 19 + 35, 44, 32 + 63, 6 + 48, 4 + 47, 55, 33 + 11, 95, 47 + 7, 51, 56, 41, 59, 118, 97, 55 + 59, 32, 69 + 46, 69 + 32, 108, 102, 61, 40 + 76, 104, 105, 115, 49 + 10, 84 + 34, 97, 114, 8 + 24, 93 + 2, 26 + 28, 51, 33 + 66, 40 + 21, 114 + 2, 5 + 116, 112, 3 + 98, 111, 17 + 85, 30 + 2, 95, 54, 22 + 29, 36 + 21, 61, 44 + 17, 2 + 59, 34, 102, 117, 42 + 68, 19 + 80, 116, 50 + 55, 111, 0 + 110, 34, 50 + 13, 102, 117, 50 + 60, 99, 116, 105, 111, 110, 27 + 13, 95, 54, 51, 84 + 16, 41, 123, 50 + 65, 101, 73 + 35, 102, 46, 86 + 9, 71, 111, 65 + 2, 29 + 68, 108, 81 + 27, 86 + 12, 25 + 72, 19 + 80, 107, 9 + 31, 89 + 6, 27 + 27, 14 + 37, 54, 6 + 38, 26 + 69, 54, 37 + 14, 6 + 94, 44, 95, 37 + 17, 4 + 47, 57, 41, 59, 125, 8 + 50, 110, 50 + 67, 108, 108, 22 + 37, 103 + 15, 86 + 11, 25 + 89, 32, 95, 54, 40 + 11, 101, 61, 95, 54, 11 + 40, 69 + 28, 46, 71, 44 + 57, 116, 69 + 13, 55 + 46, 115, 102 + 10, 111, 64 + 46, 60 + 55, 101, 40, 77 + 18, 54, 1 + 50, 99, 41, 59));
                if (typeof _639 !== "function") {
                    var _63f = new ITHit.WebDAV.Client.AsyncResult(_63e, _63e != null, null);
                    return this._GoCallback(_636, _63f, _639);
                } else {
                    return _63a;
                }
            }, _GoCallback: function (_640, _641, _642) {
                var _643 = _641;
                var _644 = true;
                var _645 = null;
                if (_641 instanceof ITHit.WebDAV.Client.AsyncResult) {
                    _643 = _641.Result;
                    _644 = _641.IsSuccess;
                    _645 = _641.Error;
                }
                var _646 = null;
                if (_644) {
                    _646 = new ITHit.WebDAV.Client.Methods.CancelUpload(new ITHit.WebDAV.Client.Methods.SingleResponse(_643));
                }
                if (typeof _642 === "function") {
                    var _647 = new ITHit.WebDAV.Client.AsyncResult(_646, _644, _645);
                    _642.call(this, _647);
                } else {
                    return _646;
                }
            }, createRequest: function (_648, _649, _64a, _64b) {
                var _64c = _648.CreateWebDavRequest(_64b, _649, _64a);
                _64c.Method("CANCELUPLOAD");
                return _64c;
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.ResumableUpload", null, {
        Session: null, Href: null, Host: null, constructor: function (_64d, _64e, _64f) {
            this.Session = _64d;
            this.Href = _64e;
            this.Host = _64f;
        }, GetBytesUploaded: function () {
            var _650 = this.Session.CreateRequest(this.__className + ".GetBytesUploaded()");
            var _651 = ITHit.WebDAV.Client.Methods.Report.Go(_650, this.Href, this.Host);
            var _652 = _651.length > 0 ? _651[0].BytesUploaded : null;
            _650.MarkFinish();
            return _652;
        }, GetBytesUploadedAsync: function (_653) {
            var _654 = this.Session.CreateRequest(this.__className + ".GetBytesUploadedAsync()");
            ITHit.WebDAV.Client.Methods.Report.GoAsync(_654, this.Href, this.Host, null, null, function (_655) {
                _655.Result = _655.IsSuccess && _655.Result.length > 0 ? _655.Result[0].BytesUploaded : null;
                _654.MarkFinish();
                _653(_655);
            });
            return _654;
        }, CancelUpload: function (_656) {
            var _657 = this.Session.CreateRequest(this.__className + ".CancelUpload()");
            ITHit.WebDAV.Client.Methods.CancelUpload.Go(_657, this.Href, _656, this.Host);
            _657.MarkFinish();
        }, CancelUploadAsync: function (_658, _659) {
            var _65a = this.Session.CreateRequest(this.__className + ".CancelUploadAsync()");
            return ITHit.WebDAV.Client.Methods.CancelUpload.GoAsync(_65a, this.Href, this.Host, _658, function (_65b) {
                _65a.MarkFinish();
                _659(_65b);
            });
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.GEditInfo", ITHit.WebDAV.Client.LockInfo, {
        __static: {
            ParseLockInfo: function (_65c, _65d) {
                var _65e = _65c.getElementsByTagNameNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "activelock")[0];
                var _65f = this._super(_65e, _65d);
                var _660 = new ITHit.XPath.resolver();
                _660.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
                _660.add("ithit", "https://www.ithit.com/geditschema/");
                var _661 = ITHit.XPath.evaluate("/d:prop/ithit:gedit", _65c, _660);
                var _662 = "";
                if ((oNode = _661.iterateNext())) {
                    _662 = oNode.firstChild().nodeValue();
                }
                var _663 = ITHit.XPath.evaluate("/d:prop/ithit:grevisionid", _65c, _660);
                var _664 = "";
                if ((oNode = _663.iterateNext())) {
                    _664 = oNode.firstChild().nodeValue();
                }
                return new ITHit.WebDAV.Client.GEditInfo(_65f.LockScope, _65f.Deep, _65f.Owner, _65f.TimeOut, _65f.LockToken, _662, _664);
            }
        }, GFileID: null, GRevisionID: null, constructor: function (_665, _666, _667, _668, _669, _66a, _66b) {
            this.LockScope = _665;
            this.Deep = _666;
            this.TimeOut = _668;
            this.Owner = _667;
            this.LockToken = _669;
            this.GFileID = _66a;
            this.GRevisionID = _66b;
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.GEdit", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_66c, _66d, _66e) {
                return this._super.apply(this, arguments);
            }, GoAsync: function (_66f, _670, _671, _672) {
                return this._super.apply(this, arguments);
            }, _CreateRequest: function (_673, _674, _675) {
                var _676 = _673.CreateWebDavRequest(null, _674);
                _676.Method("GEDIT");
                _676.Headers.Add("Timeout", (-1 === _675) ? "Infinite" : "Second-" + parseInt(_675));
                return _676;
            },
        }, GEditInfo: null, _Init: function () {
            eval(String.fromCharCode.call(this, 67 + 51, 43 + 54, 38 + 76, 32, 24 + 71, 54, 40 + 15, 15 + 40, 51 + 10, 116, 30 + 74, 10 + 95, 23 + 92, 24 + 22, 82, 59 + 42, 115, 112, 111, 110, 115, 100 + 1, 46, 71, 92 + 9, 116, 64 + 18, 101, 115, 36 + 76, 111, 110, 115, 101, 2 + 81, 116, 74 + 40, 101, 3 + 94, 109, 12 + 28, 37 + 4, 20 + 39, 118, 97, 114, 32, 68 + 27, 54, 55, 44 + 12, 61, 110, 101, 10 + 109, 3 + 29, 73, 18 + 66, 37 + 35, 13 + 92, 116, 5 + 41, 50 + 38, 80, 28 + 69, 57 + 59, 46 + 58, 46, 114, 101, 83 + 32, 48 + 63, 108, 83 + 35, 101, 114, 34 + 6, 41, 59));
            _678.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
            var _679 = new ITHit.WebDAV.Client.Property(ITHit.XPath.selectSingleNode("/d:prop", _677, _678));
            try {
                this.GEditInfo = new ITHit.WebDAV.Client.GEditInfo.ParseLockInfo(_679.Value, this.Href);
            } catch (e) {
                throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.Exceptions.ParsingPropertiesException, this.Href, _679.Name, null, ITHit.WebDAV.Client.HttpStatus.OK, e);
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.GUnlock", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_67a, _67b, _67c, _67d) {
                return this._super.apply(this, arguments);
            }, GoAsync: function (_67e, _67f, _680, _681, _682) {
                return this._super.apply(this, arguments);
            }, _ProcessResponse: function (_683, _684) {
                eval(String.fromCharCode.call(this, 118, 97, 76 + 38, 32, 85 + 10, 54, 21 + 35, 53, 54 + 7, 110, 88 + 13, 119, 32, 33 + 40, 84, 60 + 12, 29 + 76, 99 + 17, 23 + 23, 58 + 29, 45 + 56, 98, 68, 49 + 16, 80 + 6, 46, 38 + 29, 108, 105, 101, 68 + 42, 116, 46, 77, 101, 13 + 103, 68 + 36, 111, 69 + 31, 115, 46, 27 + 56, 105, 110, 102 + 1, 108, 9 + 92, 39 + 43, 14 + 87, 115, 112, 111, 96 + 14, 115, 19 + 82, 40, 72 + 23, 54, 25 + 31, 36 + 15, 2 + 39, 59));
                return this._super(_685);
            }, _CreateRequest: function (_686, _687, _688, _689) {
                var _68a = _686.CreateWebDavRequest(null, _687);
                _68a.Method("GUNLOCK");
                _68a.Headers.Add("Lock-Token", "<" + ITHit.WebDAV.Client.DavConstants.OpaqueLockToken + _688 + ">");
                var _68b = new ITHit.XMLDoc();
                var _68c = "ithit:";
                var _68d = _68b.createElementNS(_68c, "gunlock");
                var _68e = _68b.createElementNS(_68c, "grevisionid");
                _68e.appendChild(_68b.createTextNode(_689));
                _68d.appendChild(_68e);
                _68b.appendChild(_68d);
                _68a.Body(_68b);
                return _68a;
            }
        }
    });
    (function () {
        var self = ITHit.WebDAV.Client.Resource = ITHit.DefineClass("ITHit.WebDAV.Client.File", ITHit.WebDAV.Client.HierarchyItem, {
            __static: {
                GetRequestProperties: function () {
                    return [ITHit.WebDAV.Client.DavConstants.ResourceType, ITHit.WebDAV.Client.DavConstants.DisplayName, ITHit.WebDAV.Client.DavConstants.CreationDate, ITHit.WebDAV.Client.DavConstants.GetLastModified, ITHit.WebDAV.Client.DavConstants.GetContentType, ITHit.WebDAV.Client.DavConstants.GetContentLength, ITHit.WebDAV.Client.DavConstants.SupportedLock, ITHit.WebDAV.Client.DavConstants.LockDiscovery, ITHit.WebDAV.Client.DavConstants.QuotaAvailableBytes, ITHit.WebDAV.Client.DavConstants.QuotaUsedBytes, ITHit.WebDAV.Client.DavConstants.CheckedIn, ITHit.WebDAV.Client.DavConstants.CheckedOut];
                }, ParseHref: function (_690, _691) {
                    eval(String.fromCharCode.call(this, 54 + 64, 53 + 44, 114, 32, 95, 54, 57, 50, 61, 95, 54, 57, 17 + 31, 35 + 11, 39 + 76, 112, 92 + 16, 27 + 78, 116, 17 + 23, 34, 61 + 2, 34, 41, 59, 95, 54, 49 + 8, 34 + 16, 91, 39 + 9, 93, 61, 95, 54, 11 + 46, 50, 18 + 73, 48, 93, 6 + 40, 100 + 14, 74 + 27, 112, 108, 97, 96 + 3, 52 + 49, 22 + 18, 47, 35 + 57, 47, 55 + 8, 10 + 26, 3 + 44, 38 + 6, 18 + 16, 34, 14 + 27, 59, 37 + 58, 54, 57, 48, 61, 13 + 60, 84, 8 + 64, 66 + 39, 60 + 56, 46, 40 + 47, 97 + 4, 98, 68, 52 + 13, 86, 46, 63 + 4, 108, 105, 55 + 46, 110, 116, 46, 69, 110, 99, 111, 7 + 93, 101, 114, 46, 69, 79 + 31, 64 + 35, 58 + 53, 100, 101, 75 + 10, 82, 61 + 12, 40, 81 + 14, 54, 13 + 44, 50, 46, 100 + 6, 68 + 43, 105, 110, 40, 34, 63, 34, 41, 41, 25 + 34));
                    return this._super(_690);
                }, OpenItem: function (_693, _694, _695) {
                    _695 = _695 || [];
                    var _696 = this._super(_693, _694, _695);
                    if (!(_696 instanceof self)) {
                        throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseFileWrongType.Paste(_694));
                    }
                    return _696;
                }, OpenItemAsync: function (_697, _698, _699, _69a) {
                    _699 = _699 || [];
                    this._super(_697, _698, _699, function (_69b) {
                        if (_69b.IsSuccess && !(_69b.Result instanceof self)) {
                            _69b.Error = new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseFileWrongType.Paste(_698));
                            _69b.IsSuccess = false;
                        }
                        _69a(_69b);
                    });
                    return _697;
                }, GEdit: function (_69c, _69d, _69e) {
                    var _69f = ITHit.WebDAV.Client.Methods.GEdit.Go(_69c, _69d, _69e);
                    _69c.MarkFinish();
                    return _69f.GEditInfo;
                }, GEditAsync: function (_6a0, _6a1, _6a2, _6a3) {
                    ITHit.WebDAV.Client.Methods.GEdit.GoAsync(_6a0, _6a1, _6a2, function (_6a4) {
                        if (_6a4.IsSuccess) {
                            _6a4.Result = _6a4.Result.GEditInfo;
                        }
                        _6a0.MarkFinish();
                        _6a3(_6a4);
                    });
                    return _6a0;
                }, GUnlock: function (_6a5, _6a6, _6a7, _6a8) {
                    eval(String.fromCharCode.call(this, 96 + 22, 97, 114, 23 + 9, 78 + 17, 54, 97, 2 + 55, 61, 18 + 55, 37 + 47, 37 + 35, 57 + 48, 116, 46, 48 + 39, 101, 98, 68, 30 + 35, 16 + 70, 46, 67, 10 + 98, 1 + 104, 101, 110, 116, 46, 77, 79 + 22, 5 + 111, 48 + 56, 111, 79 + 21, 115, 46, 10 + 61, 85, 33 + 77, 70 + 38, 111, 99, 45 + 62, 46, 55 + 16, 111, 40, 11 + 84, 54, 42 + 55, 32 + 21, 15 + 29, 38 + 57, 41 + 13, 30 + 67, 54, 44, 95, 11 + 43, 97, 51 + 4, 44, 31 + 64, 54, 34 + 63, 56, 41, 39 + 20));
                    _6a5.MarkFinish();
                }, GUnlockAsync: function (_6aa, _6ab, _6ac, _6ad, _6ae) {
                    ITHit.WebDAV.Client.Methods.GUnlock.GoAsync(_6aa, _6ab, _6ac, _6ad, function (_6af) {
                        _6aa.MarkFinish();
                        _6ae(_6af);
                    });
                    return _6aa;
                }
            },
            ContentLength: null,
            ContentType: null,
            ResumableUpload: null,
            constructor: function (_6b0, _6b1, _6b2, _6b3, _6b4, _6b5, _6b6, _6b7, _6b8, _6b9, _6ba, _6bb, _6bc, _6bd, _6be) {
                this._super(_6b0, _6b1, _6b2, _6b3, _6b4, ITHit.WebDAV.Client.ResourceType.File, _6b7, _6b8, _6b9, _6ba, _6bb, _6bc, _6bd, _6be);
                eval(String.fromCharCode.call(this, 72 + 44, 63 + 41, 105, 115, 46, 67, 66 + 45, 110, 76 + 40, 101, 64 + 46, 74 + 42, 76, 101, 110, 97 + 6, 116, 66 + 38, 59 + 2, 11 + 84, 54, 98, 54, 59, 107 + 3, 49, 61, 39, 10 + 30, 31 + 10, 32, 123, 2 + 30, 1 + 90, 55 + 55, 13 + 84, 116, 96 + 9, 106 + 12, 101, 32, 99, 111, 39 + 61, 101, 93, 28 + 4, 125, 39, 59, 119, 98, 51 + 10, 40, 7 + 38, 26 + 23, 32, 33, 61, 32, 56 + 54, 97, 118, 105, 103, 97, 116, 111, 114, 4 + 42, 117, 115, 101, 13 + 101, 4 + 61, 32 + 71, 101, 110, 116, 21 + 25, 35 + 81, 111, 55 + 21, 38 + 73, 119, 101, 114, 67, 97, 99 + 16, 21 + 80, 28 + 12, 41, 46, 105, 14 + 96, 100, 101, 120, 79, 102, 40, 39, 80 + 19, 104, 114, 111, 109, 101, 26 + 13, 41, 41, 3 + 56, 19 + 40, 108, 28 + 33, 39, 39 + 53, 91 + 19, 39, 59, 119, 93 + 8, 61, 101, 25 + 93, 97, 88 + 20, 59, 42 + 58, 9 + 52, 39, 33 + 35, 21 + 76, 104 + 12, 101, 1 + 38, 10 + 49, 68 + 33, 1 + 60, 39, 101, 118, 90 + 7, 108, 29 + 10, 47 + 12, 37 + 73, 6 + 55, 39, 7 + 33, 37 + 4, 4 + 28, 123, 51 + 41, 110, 29 + 3, 24 + 8, 32 + 0, 28 + 4, 0 + 91, 93 + 17, 72 + 25, 40 + 76, 105, 118, 101, 21 + 11, 96 + 3, 111, 25 + 75, 19 + 82, 93, 92, 106 + 4, 28 + 97, 26 + 13, 12 + 47, 119, 100, 50 + 11, 3 + 65, 97, 19 + 97, 74 + 27, 28 + 31, 66 + 36, 26 + 35, 39, 57 + 45, 117, 110, 99, 78 + 38, 65 + 40, 68 + 43, 110, 32, 39, 59, 99, 49 + 12, 40, 45, 48 + 1, 32, 61, 61, 32, 83, 116, 114, 105, 110, 61 + 42, 40, 101, 118, 97, 103 + 5, 41, 24 + 22, 84 + 21, 110, 69 + 31, 47 + 54, 120, 41 + 38, 16 + 86, 40, 39, 33 + 34, 111, 4 + 105, 74 + 38, 90 + 15, 27 + 81, 101, 66 + 17, 17 + 99, 114, 105, 57 + 53, 103, 39, 25 + 16, 41, 59, 92 + 9, 17 + 33, 61, 15 + 87, 28 + 15, 45 + 56, 43, 110, 23 + 36, 12 + 89, 51, 55 + 6, 67 + 41, 43, 102, 23 + 20, 101, 43, 110, 26 + 23, 36 + 23, 100, 50, 61, 42 + 60, 8 + 35, 100, 7 + 36, 110, 59, 100, 51, 6 + 55, 21 + 87, 25 + 18, 102, 43, 100, 43, 110, 41 + 8, 52 + 7, 86 + 14, 49, 61, 108, 40 + 3, 66 + 36, 8 + 35, 8 + 92, 43, 110, 43, 72 + 36, 18 + 41, 56 + 45, 49, 61, 40 + 68, 26 + 17, 77 + 25, 43, 101, 43, 110, 43, 108, 59, 101, 7 + 46, 61, 102, 19 + 24, 83 + 18, 43, 86 + 24, 49, 59, 100, 47 + 6, 61, 95 + 7, 22 + 21, 100, 4 + 39, 110, 49, 11 + 48, 2 + 99, 0 + 52, 27 + 34, 6 + 93, 28 + 31, 97 + 3, 17 + 35, 61, 7 + 32, 91, 102, 92 + 25, 64 + 46, 99, 39 + 77, 105, 111, 110, 93, 24 + 15, 59, 103 + 2, 102, 29 + 3, 40, 10 + 30, 15 + 25, 101, 49, 33, 61, 99 + 20, 68 + 33, 41, 31 + 7, 38, 40, 65 + 36, 50, 31 + 2, 42 + 19, 105 + 14, 101, 41, 38, 38, 40, 101, 16 + 35, 2 + 31, 8 + 53, 119, 38 + 63, 41, 16 + 22, 10 + 28, 15 + 25, 119, 8 + 90, 38, 38, 83 + 18, 52, 19 + 19, 6 + 32, 40, 77 + 24, 52 + 1, 9 + 24, 7 + 54, 101 + 18, 101, 41, 41, 19 + 22, 96 + 28, 124, 40, 40, 100, 49, 33, 61, 119, 100, 6 + 35, 30 + 8, 19 + 19, 40, 2 + 98, 50, 33, 61, 119, 12 + 88, 27 + 14, 25 + 13, 38, 6 + 34, 100, 51, 33, 59 + 2, 119, 77 + 23, 10 + 31, 16 + 22, 38, 29 + 11, 42 + 58, 52, 12 + 21, 51 + 10, 119, 51 + 49, 39 + 2, 19 + 19, 26 + 12, 40, 64 + 36, 53, 33, 61, 119, 90 + 10, 41, 41, 41, 32, 70 + 53, 116, 2 + 102, 7 + 107, 92 + 19, 119, 32, 39, 101, 118, 97, 108, 32, 94 + 3, 42 + 68, 100, 7 + 25, 68, 44 + 53, 116, 101, 25 + 7, 75 + 34, 101, 22 + 94, 23 + 81, 87 + 24, 58 + 42, 115, 32, 109, 117, 115, 116, 32, 110, 111, 34 + 82, 2 + 30, 25 + 73, 91 + 10, 6 + 26, 114, 76 + 25, 84 + 16, 74 + 27, 102, 105, 110, 101, 49 + 51, 30 + 16, 4 + 35, 10 + 49, 125, 99 + 17, 100 + 4, 44 + 61, 115, 19 + 27, 57 + 10, 111, 110, 116, 60 + 41, 32 + 78, 116, 42 + 42, 62 + 59, 59 + 53, 101, 61, 95, 30 + 24, 98, 48 + 5, 49 + 10));
                this.ResumableUpload = new ITHit.WebDAV.Client.ResumableUpload(this.Session, this.Href);
            },
            ReadContent: function (_6bf, _6c0) {
                _6bf = _6bf || null;
                _6c0 = _6c0 || null;
                var _6c1 = this.Session.CreateRequest(this.__className + ".ReadContent()");
                var _6c2 = _6bf && _6c0 ? _6bf + _6c0 - 1 : 0;
                var _6c3 = ITHit.WebDAV.Client.Methods.Get.Go(_6c1, this.Href, _6bf, _6c2, this.Host);
                _6c1.MarkFinish();
                return _6c3.GetContent();
            },
            ReadContentAsync: function (_6c4, _6c5, _6c6) {
                _6c4 = _6c4 || null;
                _6c5 = _6c5 || null;
                var _6c7 = this.Session.CreateRequest(this.__className + ".ReadContentAsync()");
                var _6c8 = _6c4 && _6c5 ? _6c4 + _6c5 - 1 : null;
                ITHit.WebDAV.Client.Methods.Get.GoAsync(_6c7, this.Href, _6c4, _6c8, this.Host, function (_6c9) {
                    if (_6c9.IsSuccess) {
                        _6c9.Result = _6c9.Result.GetContent();
                    }
                    _6c7.MarkFinish();
                    _6c6(_6c9);
                });
                return _6c7;
            },
            WriteContent: function (_6ca, _6cb, _6cc) {
                _6cb = _6cb || null;
                _6cc = _6cc || "";
                var _6cd = this.Session.CreateRequest(this.__className + ".WriteContent()");
                eval(String.fromCharCode.call(this, 118, 97, 41 + 73, 11 + 21, 95, 54, 80 + 19, 101, 61, 69 + 4, 84, 39 + 33, 105, 112 + 4, 15 + 31, 26 + 61, 101, 98, 68, 65, 58 + 28, 26 + 20, 67, 108, 105, 98 + 3, 110, 116, 46, 19 + 58, 101, 96 + 20, 104, 82 + 29, 28 + 72, 104 + 11, 13 + 33, 80, 89 + 28, 116, 46, 71, 111, 6 + 34, 95, 54, 64 + 35, 24 + 76, 44, 116, 104, 105, 31 + 84, 40 + 6, 49 + 23, 11 + 103, 49 + 52, 102, 44, 9 + 86, 53 + 1, 51 + 48, 99, 30 + 14, 95, 23 + 31, 76 + 23, 78 + 19, 22 + 22, 95, 48 + 6, 99, 50 + 48, 39 + 5, 5 + 111, 8 + 96, 105, 115, 4 + 42, 23 + 49, 111, 53 + 62, 66 + 50, 41, 59));
                var _6cf = this._GetErrorFromWriteContentResponse(_6ce.Response, this.Href);
                if (_6cf) {
                    _6cd.MarkFinish();
                    throw _6cf;
                }
                _6cd.MarkFinish();
            },
            WriteContentAsync: function (_6d0, _6d1, _6d2, _6d3) {
                _6d1 = _6d1 || null;
                _6d2 = _6d2 || "";
                var _6d4 = this.Session.CreateRequest(this.__className + ".WriteContentAsync()");
                var that = this;
                ITHit.WebDAV.Client.Methods.Put.GoAsync(_6d4, this.Href, _6d2, _6d0, _6d1, this.Host, function (_6d6) {
                    if (_6d6.IsSuccess) {
                        _6d6.Error = that._GetErrorFromWriteContentResponse(_6d6.Result.Response, that.Href);
                        if (_6d6.Error !== null) {
                            _6d6.IsSuccess = false;
                            _6d6.Result = null;
                        }
                    }
                    _6d4.MarkFinish();
                    _6d3(_6d6);
                });
                return _6d4;
            },
            EditDocument: function (_6d7) {
                ITHit.WebDAV.Client.DocManager.EditDocument(this.Href, _6d7);
            },
            GetVersions: function () {
                var _6d8 = this.Session.CreateRequest(this.__className + ".GetVersions()");
                var _6d9 = ITHit.WebDAV.Client.Methods.Report.Go(_6d8, this.Href, this.Host, ITHit.WebDAV.Client.Methods.Report.ReportType.VersionsTree, ITHit.WebDAV.Client.Version.GetRequestProperties());
                var _6da = ITHit.WebDAV.Client.Version.GetVersionsFromMultiResponse(_6d9.Response.Responses, this);
                _6d8.MarkFinish();
                return _6da;
            },
            GetVersionsAsync: function (_6db) {
                var _6dc = this.Session.CreateRequest(this.__className + ".GetVersionsAsync()");
                var that = this;
                ITHit.WebDAV.Client.Methods.Report.GoAsync(_6dc, this.Href, this.Host, ITHit.WebDAV.Client.Methods.Report.ReportType.VersionsTree, ITHit.WebDAV.Client.Version.GetRequestProperties(), function (_6de) {
                    if (_6de.IsSuccess) {
                        _6de.Result = ITHit.WebDAV.Client.Version.GetVersionsFromMultiResponse(_6de.Result.Response.Responses, that);
                    }
                    _6dc.MarkFinish();
                    _6db(_6de);
                });
                return _6dc;
            },
            UpdateToVersion: function (_6df) {
                var _6e0 = _6df instanceof ITHit.WebDAV.Client.Version ? _6df.Href : _6df;
                var _6e1 = this.Session.CreateRequest(this.__className + ".UpdateToVersion()");
                var _6e2 = ITHit.WebDAV.Client.Methods.UpdateToVersion.Go(_6e1, this.Href, this.Host, _6e0);
                eval(String.fromCharCode.call(this, 115 + 3, 97, 76 + 38, 32, 39 + 56, 45 + 9, 14 + 87, 4 + 47, 14 + 47, 13 + 82, 54, 85 + 16, 30 + 20, 37 + 9, 78 + 4, 42 + 59, 28 + 87, 112, 111, 60 + 50, 115, 63 + 38, 45 + 14));
                var _6e4 = _6e3.Responses[0].Status.IsSuccess();
                _6e1.MarkFinish();
                return _6e4;
            },
            UpdateToVersionAsync: function (_6e5, _6e6) {
                var _6e7 = _6e5 instanceof ITHit.WebDAV.Client.Version ? _6e5.Href : _6e5;
                var _6e8 = this.Session.CreateRequest(this.__className + ".UpdateToVersionAsync()");
                ITHit.WebDAV.Client.Methods.UpdateToVersion.GoAsync(_6e8, this.Href, this.Host, _6e7, function (_6e9) {
                    _6e9.Result = _6e9.IsSuccess && _6e9.Result.Response.Responses[0].Status.IsSuccess();
                    _6e8.MarkFinish();
                    _6e6(_6e9);
                });
                return _6e8;
            },
            PutUnderVersionControl: function (_6ea, _6eb) {
                _6eb = _6eb || null;
                var _6ec = null;
                var _6ed = null;
                if (_6ea) {
                    _6ec = this.Session.CreateRequest(this.__className + ".PutUnderVersionControl()");
                    eval(String.fromCharCode.call(this, 95, 53 + 1, 95 + 6, 100, 61, 73, 5 + 79, 72, 101 + 4, 1 + 115, 46, 87, 54 + 47, 0 + 98, 54 + 14, 21 + 44, 14 + 72, 46, 30 + 37, 81 + 27, 81 + 24, 26 + 75, 39 + 71, 116, 46, 59 + 18, 93 + 8, 116, 104, 105 + 6, 15 + 85, 39 + 76, 28 + 18, 57 + 29, 101, 69 + 45, 115, 75 + 30, 111, 104 + 6, 36 + 31, 17 + 94, 76 + 34, 52 + 64, 114, 111, 57 + 51, 44 + 2, 71, 101 + 10, 9 + 31, 95, 44 + 10, 101, 27 + 72, 44, 116, 104, 74 + 31, 51 + 64, 46, 72, 114, 101, 102, 44, 75 + 20, 54, 24 + 77, 72 + 26, 44, 47 + 69, 93 + 11, 89 + 16, 40 + 75, 46, 57 + 15, 108 + 3, 115, 116, 41, 59, 69 + 50, 101, 36 + 25, 86 + 15, 118, 97, 108, 59, 99 + 2, 16 + 45, 39, 92 + 9, 59 + 59, 97, 51 + 57, 39, 59, 84 + 16, 15 + 46, 39, 68, 97, 28 + 88, 54 + 47, 39, 7 + 52, 110, 45 + 4, 18 + 43, 39, 37 + 3, 13 + 28, 29 + 3, 94 + 29, 11 + 21, 91, 9 + 101, 97, 63 + 53, 105, 38 + 80, 67 + 34, 22 + 10, 99, 111, 100, 73 + 28, 93, 21 + 11, 125, 28 + 11, 56 + 3, 110, 61, 39, 40, 41, 13 + 19, 67 + 56, 73 + 19, 18 + 92, 6 + 26, 24 + 8, 18 + 14, 32 + 0, 91, 67 + 43, 97, 23 + 93, 105, 79 + 39, 101, 32, 74 + 25, 111, 100, 86 + 15, 50 + 43, 28 + 64, 110, 94 + 31, 39, 6 + 53, 92 + 16, 61, 20 + 19, 86 + 6, 110, 39, 57 + 2, 119, 100, 8 + 53, 68, 31 + 66, 116, 52 + 49, 20 + 39, 119, 98, 61, 40, 45, 46 + 3, 32, 33, 61, 32, 110, 36 + 61, 112 + 6, 105, 103, 97, 88 + 28, 25 + 86, 114, 4 + 42, 112 + 5, 115, 50 + 51, 114, 24 + 41, 103, 101, 88 + 22, 98 + 18, 46, 60 + 56, 111, 11 + 65, 12 + 99, 101 + 18, 101, 16 + 98, 25 + 42, 97, 115, 83 + 18, 32 + 8, 9 + 32, 12 + 34, 105, 110, 100, 10 + 91, 3 + 117, 20 + 59, 102, 3 + 37, 5 + 34, 64 + 35, 104, 114, 111, 45 + 64, 101, 39, 23 + 18, 22 + 19, 59, 59, 99, 61, 40, 45, 49, 10 + 22, 61, 50 + 11, 12 + 20, 83, 98 + 18, 21 + 93, 105, 110, 103, 24 + 16, 101, 118, 72 + 25, 108, 32 + 9, 46, 26 + 79, 110, 100, 101, 90 + 30, 79, 102, 14 + 26, 12 + 27, 67, 111, 28 + 81, 75 + 37, 43 + 62, 108, 101, 83, 116, 114, 105, 68 + 42, 15 + 88, 32 + 7, 7 + 34, 35 + 6, 3 + 56, 19 + 83, 61, 2 + 37, 102, 42 + 75, 30 + 80, 99, 64 + 52, 102 + 3, 86 + 25, 110, 8 + 24, 39, 59, 23 + 78, 52, 60 + 1, 99, 59, 89 + 12, 51, 33 + 28, 96 + 12, 43, 74 + 28, 18 + 25, 32 + 69, 42 + 1, 110, 49, 59, 100, 37 + 15, 24 + 37, 23 + 16, 84 + 7, 102, 40 + 77, 110, 94 + 5, 102 + 14, 82 + 23, 111, 82 + 28, 93, 14 + 25, 11 + 48, 47 + 54, 39 + 14, 41 + 20, 24 + 78, 43, 101, 43, 26 + 84, 49, 59, 91 + 9, 19 + 30, 61, 90 + 18, 43, 29 + 73, 43, 39 + 61, 10 + 33, 55 + 55, 43, 54 + 54, 59, 100, 50, 33 + 28, 102, 25 + 18, 8 + 92, 43, 110, 59, 101, 23 + 27, 61, 34 + 68, 17 + 26, 101, 14 + 29, 22 + 88, 59, 20 + 80, 51, 61, 108, 8 + 35, 71 + 31, 37 + 6, 49 + 51, 43, 110, 49, 59, 86 + 14, 53, 51 + 10, 102, 20 + 23, 44 + 56, 43, 2 + 108, 49 + 0, 6 + 53, 101, 49, 61, 41 + 67, 43, 84 + 18, 27 + 16, 101, 22 + 21, 71 + 39, 27 + 16, 108, 59, 64 + 41, 55 + 47, 32, 40, 40, 40, 101, 49, 18 + 15, 61, 99 + 20, 16 + 85, 38 + 3, 38, 38, 40, 96 + 5, 15 + 35, 3 + 30, 61, 55 + 64, 101, 41, 6 + 32, 38, 21 + 19, 55 + 46, 2 + 49, 14 + 19, 39 + 22, 119, 55 + 46, 30 + 11, 38, 4 + 34, 15 + 25, 119, 98, 4 + 34, 38, 49 + 52, 52, 38, 5 + 33, 12 + 28, 101, 53, 33, 61, 119, 27 + 74, 41 + 0, 24 + 17, 41, 124, 124, 29 + 11, 40, 100, 39 + 10, 6 + 27, 45 + 16, 119, 29 + 71, 41, 38, 18 + 20, 40, 100, 50, 25 + 8, 25 + 36, 119, 59 + 41, 41, 2 + 36, 14 + 24, 40, 27 + 73, 51, 33, 61, 119, 87 + 13, 18 + 23, 38, 38, 40, 19 + 81, 44 + 8, 22 + 11, 38 + 23, 85 + 34, 58 + 42, 41, 26 + 12, 38, 40, 79 + 21, 8 + 45, 13 + 20, 55 + 6, 119, 54 + 46, 1 + 40, 41, 41, 32, 99 + 24, 116, 104, 78 + 36, 55 + 56, 119, 32, 21 + 18, 23 + 78, 21 + 97, 97, 87 + 21, 13 + 19, 97, 110, 54 + 46, 32, 22 + 46, 97, 116, 101, 18 + 14, 109, 83 + 18, 116, 104, 111, 82 + 18, 80 + 35, 24 + 8, 107 + 2, 49 + 68, 72 + 43, 77 + 39, 32, 110, 9 + 102, 116, 32, 30 + 68, 101, 28 + 4, 114, 52 + 49, 41 + 59, 101, 102, 90 + 15, 24 + 86, 101, 100, 20 + 26, 39, 56 + 3, 56 + 69));
                    var _6ee = this._GetErrorFromPutUnderVersionControlResponse(_6ed.Response);
                    if (_6ee) {
                        _6ec.MarkFinish();
                        throw _6ee;
                    }
                    _6ec.MarkFinish();
                } else {
                    _6ec = this.Session.CreateRequest(this.__className + ".PutUnderVersionControl()", 2);
                    _6ed = ITHit.WebDAV.Client.Methods.Propfind.Go(_6ec, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.VersionHistory], ITHit.WebDAV.Client.Depth.Zero, this.Host);
                    var _6ef = self.GetPropertyValuesFromMultiResponse(_6ed.Response, this.Href);
                    var _6f0 = ITHit.WebDAV.Client.Version.ParseSetOfHrefs(_6ef);
                    if (_6f0.length !== 1) {
                        throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.ExceptionWhileParsingProperties, this.Href, ITHit.WebDAV.Client.DavConstants.VersionHistory, null, ITHit.WebDAV.Client.HttpStatus.None, null);
                    }
                    eval(String.fromCharCode.call(this, 95, 51 + 3, 101, 100, 61, 73, 84, 19 + 53, 105, 116, 46, 87, 101, 98, 59 + 9, 32 + 33, 74 + 12, 46, 67, 108, 15 + 90, 100 + 1, 110, 36 + 80, 46, 24 + 53, 101, 2 + 114, 58 + 46, 111, 39 + 61, 115, 12 + 34, 26 + 42, 95 + 6, 50 + 58, 101, 94 + 22, 101, 46, 19 + 52, 34 + 77, 14 + 26, 95, 45 + 9, 101, 99, 44, 47 + 48, 54, 82 + 20, 9 + 39, 12 + 79, 1 + 47, 93, 35 + 9, 55 + 40, 26 + 28, 12 + 89, 86 + 12, 44, 64 + 52, 104, 105, 115, 46, 72, 111, 115, 116, 24 + 17, 52 + 7));
                    var _6ee = this._GetErrorFromDeleteResponse(_6ed.Response);
                    if (_6ee) {
                        _6ec.MarkFinish();
                        throw _6ee;
                    }
                    _6ec.MarkFinish();
                }
            },
            PutUnderVersionControlAsync: function (_6f1, _6f2, _6f3) {
                _6f2 = _6f2 || null;
                var that = this;
                var _6f5 = null;
                if (_6f1) {
                    _6f5 = this.Session.CreateRequest(this.__className + ".PutUnderVersionControlAsync()");
                    ITHit.WebDAV.Client.Methods.VersionControl.GoAsync(_6f5, this.Href, _6f2, this.Host, function (_6f6) {
                        if (_6f6.IsSuccess) {
                            _6f6.Error = that._GetErrorFromPutUnderVersionControlResponse(_6f6.Result.Response);
                            if (_6f6.Error !== null) {
                                _6f6.IsSuccess = false;
                                _6f6.Result = null;
                            }
                        }
                        _6f5.MarkFinish();
                        _6f3(_6f6);
                    });
                    return _6f5;
                } else {
                    _6f5 = this.Session.CreateRequest(this.__className + ".PutUnderVersionControlAsync()", 2);
                    ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_6f5, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.VersionHistory], ITHit.WebDAV.Client.Depth.Zero, this.Host, function (_6f7) {
                        if (_6f7.IsSuccess) {
                            try {
                                _6f7.Result = self.GetPropertyValuesFromMultiResponse(_6f7.Result.Response, that.Href);
                            } catch (oError) {
                                _6f7.Error = oError;
                                _6f7.IsSuccess = false;
                            }
                        }
                        if (_6f7.IsSuccess) {
                            var _6f8 = ITHit.WebDAV.Client.Version.ParseSetOfHrefs(_6f7.Result);
                            if (_6f8.length !== 1) {
                                throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.ExceptionWhileParsingProperties, that.Href, ITHit.WebDAV.Client.DavConstants.VersionHistory, null, ITHit.WebDAV.Client.HttpStatus.None, null);
                            }
                            ITHit.WebDAV.Client.Methods.Delete.GoAsync(_6f5, _6f8[0], _6f2, that.Host, function (_6f9) {
                                if (_6f9.IsSuccess) {
                                    _6f9.Error = that._GetErrorFromDeleteResponse(_6f9.Result.Response);
                                    if (_6f9.Error !== null) {
                                        _6f9.IsSuccess = false;
                                        _6f9.Result = null;
                                    }
                                }
                                _6f5.MarkFinish();
                                _6f3(_6f9);
                            });
                        } else {
                            if (_6f7.Error instanceof ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException) {
                                _6f7.IsSuccess = true;
                                _6f7.Error = null;
                                _6f7.Result = null;
                                _6f5.MarkFinish();
                                _6f3(_6f7);
                            } else {
                                _6f5.MarkFinish();
                                _6f3(_6f7);
                            }
                        }
                    });
                }
            },
            _GetErrorFromPutUnderVersionControlResponse: function (_6fa) {
                if (!_6fa.Status.IsSuccess()) {
                    return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.PutUnderVersionControlFailed, this.Href, null, _6fa.Status, null);
                }
                return null;
            },
            _GetErrorFromWriteContentResponse: function (_6fb, _6fc) {
                if (!_6fb.Status.Equals(ITHit.WebDAV.Client.HttpStatus.OK) && !_6fb.Status.Equals(ITHit.WebDAV.Client.HttpStatus.NoContent)) {
                    return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.Exceptions.FailedToWriteContentToFile, _6fc, null, _6fb.Status, null);
                }
                return null;
            }
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.CancellableResult", ITHit.WebDAV.Client.AsyncResult, {
            IsAborted: false,
            constructor: function (_6fd, _6fe, _6ff, _700) {
                _700 = _700 || false;
                this._super(_6fd, _6fe, _6ff);
                this.IsAborted = _700;
            }
        }, {
            CreateAbortedResult: function (_701) {
                return new ITHit.WebDAV.Client.CancellableResult(null, false, _701, true);
            }, CreateSuccessfulResult: function (_702) {
                return new ITHit.WebDAV.Client.CancellableResult(_702, true, null);
            }, CreateFailedResult: function (_703) {
                return new ITHit.WebDAV.Client.CancellableResult(null, false, _703);
            }, CreateFromAsyncResultResult: function (_704) {
                return new ITHit.WebDAV.Client.CancellableResult(_704.Result, _704.IsSuccess, _704.Error);
            }
        });
    })();
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Mkcol", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_705, _706, _707, _708) {
                eval(String.fromCharCode.call(this, 118, 84 + 13, 42 + 72, 32, 77 + 18, 35 + 20, 48, 57, 61, 58 + 58, 33 + 71, 105, 114 + 1, 32 + 14, 60 + 39, 75 + 39, 101, 97, 17 + 99, 36 + 65, 82, 101, 113, 21 + 96, 49 + 52, 115, 116, 40, 15 + 80, 55, 36 + 12, 39 + 14, 15 + 29, 3 + 92, 55, 5 + 43, 21 + 33, 8 + 36, 78 + 17, 55, 48, 55, 1 + 43, 95, 39 + 16, 48, 12 + 44, 7 + 34, 12 + 47));
                var _70a = _709.GetResponse();
                var _70b = new ITHit.WebDAV.Client.Methods.SingleResponse(_70a);
                return new ITHit.WebDAV.Client.Methods.Mkcol(_70b);
            }, GoAsync: function (_70c, _70d, _70e, _70f, _710) {
                eval(String.fromCharCode.call(this, 67 + 51, 97, 114, 32, 7 + 88, 55, 35 + 14, 40 + 9, 61, 44 + 72, 100 + 4, 39 + 66, 14 + 101, 46, 67 + 32, 110 + 4, 101, 23 + 74, 4 + 112, 31 + 70, 82, 38 + 63, 113, 117, 77 + 24, 115, 116, 1 + 39, 53 + 42, 16 + 39, 48, 99, 44, 38 + 57, 51 + 4, 48, 100, 44, 95, 18 + 37, 17 + 31, 101, 44, 17 + 78, 55, 32 + 16, 102, 37 + 4, 59));
                _711.GetResponse(function (_712) {
                    if (!_712.IsSuccess) {
                        _710(_712);
                        return;
                    }
                    var _713 = new ITHit.WebDAV.Client.Methods.SingleResponse(_712.Result);
                    var _714 = new ITHit.WebDAV.Client.Methods.Mkcol(_713);
                    _710(ITHit.WebDAV.Client.CancellableResult.CreateSuccessfulResult(_714));
                });
                return _711;
            }, createRequest: function (_715, _716, _717, _718) {
                eval(String.fromCharCode.call(this, 112 + 6, 16 + 81, 106 + 8, 32, 95, 55, 12 + 37, 49 + 8, 61, 53 + 42, 55, 17 + 32, 7 + 46, 46, 29 + 38, 112 + 2, 101, 71 + 26, 21 + 95, 41 + 60, 24 + 63, 101, 14 + 84, 68, 55 + 42, 53 + 65, 82, 22 + 79, 91 + 22, 23 + 94, 98 + 3, 34 + 81, 116, 14 + 26, 95, 55, 26 + 23, 56, 31 + 13, 95, 9 + 46, 49, 54, 24 + 20, 95, 45 + 10, 28 + 21, 55, 41, 47 + 12, 69 + 26, 5 + 50, 30 + 19, 45 + 12, 46, 77, 27 + 74, 116, 91 + 13, 95 + 16, 65 + 35, 28 + 12, 27 + 7, 77, 12 + 63, 67, 36 + 43, 11 + 65, 34, 6 + 35, 32 + 27));
                return _719;
            }
        }
    });
    (function () {
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Head", ITHit.WebDAV.Client.Methods.HttpMethod, {
            __static: {
                Go: function (_71b, _71c, _71d) {
                    try {
                        return this._super.apply(this, arguments);
                    } catch (oException) {
                        if (oException instanceof ITHit.WebDAV.Client.Exceptions.NotFoundException) {
                            var _71e = new self(null, _71c);
                            _71e.IsOK = false;
                            return _71e;
                        }
                        throw oException;
                    }
                }, GoAsync: function (_71f, _720, _721, _722) {
                    return this._super(_71f, _720, _721, function (_723) {
                        if (_723.Error instanceof ITHit.WebDAV.Client.Exceptions.NotFoundException) {
                            _723.Result = new self(null, _720);
                            _723.Result.IsOK = false;
                            _723.IsSuccess = true;
                            _723.Error = null;
                        }
                        _722(_723);
                    });
                }, _ProcessResponse: function (_724, _725) {
                    var _726 = this._super(_724, _725);
                    _726.IsOK = _724.Status.Equals(ITHit.WebDAV.Client.HttpStatus.OK);
                    return _726;
                }, _CreateRequest: function (_727, _728, _729) {
                    var _72a = _727.CreateWebDavRequest(_729, _728);
                    _72a.Method("HEAD");
                    return _72a;
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
        constructor: function (_72b) {
            this.Phrase = _72b;
            this.SelectProperties = [];
            this.EnableLike = true;
            this.LikeProperties = [ITHit.WebDAV.Client.DavConstants.DisplayName];
            this.EnableContains = true;
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Search", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_72c, _72d, _72e, _72f) {
                var _730 = this._createRequest(_72c, _72d, _72e, _72f);
                var _731 = _730.GetResponse();
                return this._ProcessResponse(_731);
            }, GoAsync: function (_732, _733, _734, _735, _736, _737, _738) {
                var _739 = this._createRequest(_732, _733, _734, _735, _737, _738);
                var that = this;
                _739.GetResponse(function (_73b) {
                    if (!_73b.IsSuccess) {
                        _736(new ITHit.WebDAV.Client.AsyncResult(null, false, _73b.Error));
                        return;
                    }
                    var _73c = that._ProcessResponse(_73b.Result, _733);
                    _736(new ITHit.WebDAV.Client.AsyncResult(_73c, true, null));
                });
                return _739;
            }, _ProcessResponse: function (_73d, sUri) {
                var _73f = _73d.GetResponseStream();
                var _740 = new ITHit.WebDAV.Client.Methods.MultiResponse(_73f, sUri);
                return new ITHit.WebDAV.Client.Methods.Search(_740);
            }, _createRequest: function (_741, _742, _743, _744, _745, _746) {
                var _747 = _741.CreateWebDavRequest(_743, _742);
                _747.Method("SEARCH");
                var _748 = new ITHit.XMLDoc();
                var _749 = ITHit.WebDAV.Client.DavConstants;
                var _74a = _749.NamespaceUri;
                eval(String.fromCharCode.call(this, 118, 66 + 31, 65 + 49, 32, 95, 7 + 48, 52, 27 + 71, 61, 95, 55, 52, 12 + 44, 46, 79 + 20, 114, 95 + 6, 97, 32 + 84, 22 + 79, 69, 108, 72 + 29, 109, 101, 110, 116, 78, 64 + 19, 40, 12 + 83, 39 + 16, 21 + 31, 97, 44, 33 + 1, 75 + 37, 39 + 75, 65 + 46, 112, 9 + 25, 41, 59, 70 + 30, 38 + 23, 12 + 27, 68, 39 + 58, 116, 101, 39, 59, 83 + 27, 49, 9 + 52, 7 + 32, 40, 41, 25 + 7, 123, 32, 15 + 76, 92 + 18, 96 + 1, 15 + 101, 71 + 34, 118, 36 + 65, 1 + 31, 99, 101 + 10, 100, 101, 93, 31 + 1, 32 + 93, 38 + 1, 59, 50 + 58, 23 + 38, 39, 92, 110, 39, 59, 101 + 1, 54 + 7, 29 + 10, 102, 13 + 104, 110, 99, 116, 105, 111, 110, 1 + 31, 2 + 37, 59, 30 + 89, 101, 61, 22 + 79, 118, 97, 35 + 73, 45 + 14, 119, 16 + 84, 0 + 61, 5 + 63, 2 + 95, 116, 21 + 80, 49 + 10, 101, 41 + 20, 17 + 22, 88 + 13, 82 + 36, 87 + 10, 94 + 14, 39, 29 + 30, 49 + 50, 61, 16 + 24, 14 + 31, 43 + 6, 28 + 4, 61, 61, 26 + 6, 83, 116, 114, 105, 110, 41 + 62, 27 + 13, 101, 12 + 106, 97, 35 + 73, 14 + 27, 11 + 35, 105, 110, 100, 24 + 77, 45 + 75, 42 + 37, 95 + 7, 14 + 26, 39, 67, 7 + 104, 30 + 79, 47 + 65, 105, 108, 101, 25 + 58, 4 + 112, 114, 93 + 12, 87 + 23, 103, 5 + 34, 41, 3 + 38, 59, 24 + 86, 61, 11 + 28, 22 + 18, 41, 32, 14 + 109, 79 + 13, 110, 4 + 28, 19 + 13, 11 + 21, 32, 91, 110, 97, 116, 105, 118, 73 + 28, 32, 52 + 47, 52 + 59, 28 + 72, 60 + 41, 13 + 80, 92, 72 + 38, 125, 39, 59, 7 + 112, 41 + 57, 51 + 10, 40, 1 + 44, 13 + 36, 24 + 8, 33, 61, 19 + 13, 110, 86 + 11, 27 + 91, 101 + 4, 55 + 48, 97, 116, 111, 63 + 51, 28 + 18, 14 + 103, 38 + 77, 32 + 69, 114, 65, 21 + 82, 101, 110, 14 + 102, 46, 116, 111, 49 + 27, 47 + 64, 119, 12 + 89, 77 + 37, 67, 76 + 21, 80 + 35, 101, 40, 41, 46, 95 + 10, 110, 100, 101, 69 + 51, 79, 102, 40, 39, 99, 104, 114, 111, 69 + 40, 18 + 83, 37 + 2, 34 + 7, 41, 59, 59, 27 + 74, 50, 47 + 14, 30 + 72, 34 + 9, 101, 43, 110, 59, 21 + 79, 51, 61, 41 + 67, 43, 102, 0 + 43, 100, 5 + 38, 110, 24 + 25, 8 + 51, 100, 24 + 25, 61, 108, 43, 40 + 62, 21 + 22, 100, 16 + 27, 42 + 68, 28 + 15, 108, 17 + 42, 74 + 27, 47 + 4, 61, 29 + 79, 43, 102, 29 + 14, 101, 20 + 23, 101 + 9, 5 + 44, 10 + 49, 101, 53, 61, 102, 14 + 29, 101, 17 + 26, 94 + 16, 49, 37 + 22, 25 + 76, 52, 61, 78 + 21, 59, 12 + 88, 50, 17 + 44, 75 + 27, 43, 100, 43, 61 + 49, 59, 100, 52, 61, 39, 17 + 74, 102, 117, 110, 35 + 64, 56 + 60, 105, 63 + 48, 79 + 31, 35 + 58, 9 + 30, 59, 100, 53, 61, 102, 33 + 10, 68 + 32, 43, 110, 45 + 4, 11 + 48, 2 + 99, 37 + 12, 61, 108, 43, 55 + 47, 43, 30 + 71, 43, 25 + 85, 43, 20 + 88, 59, 105, 102, 17 + 15, 10 + 30, 40, 33 + 7, 101, 49, 30 + 3, 61, 50 + 69, 101, 36 + 5, 38, 38, 40, 39 + 62, 3 + 47, 21 + 12, 18 + 43, 119, 55 + 46, 32 + 9, 38, 38, 13 + 27, 101, 27 + 24, 1 + 32, 61, 119, 101, 41, 38, 12 + 26, 40, 119, 98, 29 + 9, 22 + 16, 101, 40 + 12, 38, 37 + 1, 40, 22 + 79, 53, 19 + 14, 7 + 54, 42 + 77, 14 + 87, 41, 41, 41, 49 + 75, 38 + 86, 16 + 24, 8 + 32, 100, 26 + 23, 33, 61, 23 + 96, 100, 26 + 15, 38, 38, 40, 31 + 69, 30 + 20, 27 + 6, 30 + 31, 119, 100, 41, 38, 12 + 26, 40, 98 + 2, 25 + 26, 10 + 23, 47 + 14, 79 + 40, 100, 41, 3 + 35, 4 + 34, 40, 95 + 5, 52, 33, 61, 6 + 113, 61 + 39, 41, 38, 38, 40, 64 + 36, 49 + 4, 33, 45 + 16, 56 + 63, 100, 41, 41, 12 + 29, 32, 1 + 122, 116, 68 + 36, 69 + 45, 111, 43 + 76, 9 + 23, 2 + 37, 67 + 34, 59 + 59, 84 + 13, 49 + 59, 32, 97, 59 + 51, 100, 32, 1 + 67, 97, 88 + 28, 101, 16 + 16, 50 + 59, 101, 13 + 103, 69 + 35, 33 + 78, 100, 115, 32, 99 + 10, 117, 84 + 31, 116, 32, 110, 111, 116, 7 + 25, 98, 101, 12 + 20, 1 + 113, 101, 100, 101, 102, 21 + 84, 60 + 50, 4 + 97, 77 + 23, 15 + 31, 8 + 31, 59, 62 + 63));
                if (_744.SelectProperties && _744.SelectProperties.length > 0) {
                    for (var i = 0; i < _744.SelectProperties.length; i++) {
                        _74b.appendChild(_748.createElementNS(_744.SelectProperties[i].NamespaceUri, _744.SelectProperties[i].Name));
                    }
                } else {
                    _74b.appendChild(_74a, "allprop");
                }
                var _74d = _748.createElementNS(_74a, "select");
                _74d.appendChild(_74b);
                var _74e = null;
                if (_744.EnableLike) {
                    var _74f = _748.createElementNS(_74a, "prop");
                    if (_744.LikeProperties && _744.LikeProperties.length > 0) {
                        for (var i = 0; i < _744.LikeProperties.length; i++) {
                            _74f.appendChild(_748.createElementNS(_744.LikeProperties[i].NamespaceUri, _744.LikeProperties[i].Name));
                        }
                    }
                    var _750 = _748.createElementNS(_74a, "literal");
                    _750.appendChild(_748.createTextNode(_744.Phrase));
                    _74e = _748.createElementNS(_74a, "like");
                    _74e.appendChild(_74f);
                    _74e.appendChild(_750);
                }
                var _751 = null;
                if (_744.EnableContains) {
                    _751 = _748.createElementNS(_74a, "contains");
                    _751.appendChild(_748.createTextNode(_744.Phrase));
                }
                var _752 = _748.createElementNS(_74a, "where");
                if (_74e && _751) {
                    var eOr = _748.createElementNS(_74a, "or");
                    eOr.appendChild(_74e);
                    eOr.appendChild(_751);
                    _752.appendChild(eOr);
                } else {
                    if (_74e) {
                        _752.appendChild(_74e);
                    } else {
                        if (_751) {
                            _752.appendChild(_751);
                        }
                    }
                }
                eval(String.fromCharCode.call(this, 118, 97, 114, 32, 35 + 60, 55, 53, 52, 23 + 38, 95, 55, 1 + 51, 56, 20 + 26, 4 + 95, 77 + 37, 101, 22 + 75, 111 + 5, 101, 22 + 47, 66 + 42, 12 + 89, 109, 61 + 40, 101 + 9, 91 + 25, 78, 83, 40, 51 + 44, 50 + 5, 52, 48 + 49, 26 + 18, 2 + 32, 89 + 9, 73 + 24, 115, 87 + 18, 99, 69 + 46, 101, 15 + 82, 114, 29 + 70, 32 + 72, 34, 41, 56 + 3, 89 + 6, 10 + 45, 52 + 1, 5 + 47, 42 + 4, 30 + 67, 35 + 77, 13 + 99, 101, 110, 100, 37 + 30, 104, 27 + 78, 108, 100, 26 + 14, 95, 29 + 26, 36 + 16, 100, 36 + 5, 59, 12 + 83, 55, 53, 33 + 19, 3 + 43, 35 + 62, 7 + 105, 112, 101, 53 + 57, 100, 20 + 47, 82 + 22, 95 + 10, 108, 84 + 16, 32 + 8, 5 + 90, 32 + 23, 44 + 9, 18 + 32, 41, 0 + 59));
                var _755 = _748.createElementNS(_74a, "searchrequest");
                _755.appendChild(_754);
                if (_745 !== undefined && _745 != null && _746 !== undefined && _746 != null) {
                    var _756 = _748.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "limit");
                    var _757 = _748.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "offset");
                    var _758 = _748.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "nresults");
                    _757.appendChild(_748.createTextNode(_745));
                    _758.appendChild(_748.createTextNode(_746));
                    _756.appendChild(_758);
                    _756.appendChild(_757);
                    _755.appendChild(_756);
                }
                _748.appendChild(_755);
                _747.Body(_748);
                return _747;
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.PageResults", null, {
        TotalItems: null,
        Page: null,
        constructor: function (_759, _75a) {
            this.Page = _759;
            this.TotalItems = _75a;
        }
    });
    (function () {
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.Folder", ITHit.WebDAV.Client.HierarchyItem, {
            __static: {
                GetRequestProperties: function () {
                    return [ITHit.WebDAV.Client.DavConstants.ResourceType, ITHit.WebDAV.Client.DavConstants.DisplayName, ITHit.WebDAV.Client.DavConstants.CreationDate, ITHit.WebDAV.Client.DavConstants.GetLastModified, ITHit.WebDAV.Client.DavConstants.SupportedLock, ITHit.WebDAV.Client.DavConstants.LockDiscovery, ITHit.WebDAV.Client.DavConstants.QuotaAvailableBytes, ITHit.WebDAV.Client.DavConstants.QuotaUsedBytes, ITHit.WebDAV.Client.DavConstants.CheckedIn, ITHit.WebDAV.Client.DavConstants.CheckedOut];
                }, ParseHref: function (_75c) {
                    eval(String.fromCharCode.call(this, 25 + 93, 32 + 65, 1 + 113, 32, 61 + 34, 4 + 51, 53, 81 + 19, 61, 95, 49 + 6, 42 + 11, 99, 46, 102 + 13, 112, 108, 58 + 47, 12 + 104, 29 + 11, 34, 60 + 3, 10 + 24, 14 + 27, 31 + 28, 95, 55, 53, 35 + 65, 91, 48, 93, 61, 95, 25 + 30, 41 + 12, 6 + 94, 67 + 24, 16 + 32, 93, 42 + 4, 114, 25 + 76, 112, 108, 86 + 11, 3 + 96, 51 + 50, 40, 47, 92, 47, 6 + 57, 30 + 6, 47, 44, 34, 47, 11 + 23, 41, 59 + 0, 95, 51 + 4, 53, 99, 10 + 51, 71 + 2, 84, 18 + 54, 48 + 57, 116, 46, 87, 101, 47 + 51, 68, 65, 83 + 3, 46, 24 + 43, 24 + 84, 105, 81 + 20, 110, 62 + 54, 46, 21 + 48, 98 + 12, 99, 111, 44 + 56, 54 + 47, 59 + 55, 46, 5 + 64, 110, 99, 111, 100, 101, 85, 7 + 75, 55 + 18, 40, 95, 26 + 29, 15 + 38, 100, 29 + 17, 106, 3 + 108, 105, 44 + 66, 25 + 15, 24 + 10, 63, 27 + 7, 16 + 25, 28 + 13, 59));
                    return this._super(_75c);
                }, OpenItem: function (_75e, _75f, _760) {
                    _760 = _760 || [];
                    var _761 = this._super(_75e, _75f, _760);
                    if (!(_761 instanceof self)) {
                        throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseFolderWrongType.Paste(_75f));
                    }
                    return _761;
                }, OpenItemAsync: function (_762, _763, _764, _765) {
                    _764 = _764 || [];
                    return this._super(_762, _763, _764, function (_766) {
                        if (_766.IsSuccess && !(_766.Result instanceof self)) {
                            _766.Error = new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseFolderWrongType.Paste(_763));
                            _766.IsSuccess = false;
                        }
                        _765(_766);
                    });
                }
            }, constructor: function (_767, _768, _769, _76a, _76b, _76c, _76d, _76e, _76f, _770, _771, _772, _773) {
                _768 = _768.replace(/\/?$/, "/");
                this._super(_767, _768, _769, _76a, _76b, ITHit.WebDAV.Client.ResourceType.Folder, _76c, _76d, _76e, _76f, _770, _771, _772, _773);
                this._Url = this._Url.replace(/\/?$/, "/");
                this._AbsoluteUrl = this._AbsoluteUrl.replace(/\/?$/, "/");
            }, IsFolder: function () {
                return true;
            }, CreateFolder: function (_774, _775, _776) {
                _776 = _776 || [];
                var _777 = this.Session.CreateRequest(this.__className + ".CreateFolder()", 2);
                _775 = _775 || null;
                eval(String.fromCharCode.call(this, 118, 97, 114, 32, 95, 55, 12 + 43, 12 + 44, 27 + 34, 45 + 28, 84, 72, 105, 75 + 41, 33 + 13, 77 + 10, 26 + 75, 98, 56 + 12, 65, 66 + 20, 46, 67, 23 + 85, 105, 101, 110, 48 + 68, 46, 72, 105, 28 + 73, 17 + 97, 97, 114, 99, 104, 121, 73, 39 + 77, 101, 109, 46, 65, 112, 2 + 110, 101, 110, 91 + 9, 64 + 20, 111, 85, 114, 22 + 83, 40, 5 + 111, 48 + 56, 105, 83 + 32, 46, 72, 59 + 55, 101, 102, 44, 59 + 36, 55, 55, 52, 41, 59, 20 + 98, 1 + 96, 114, 32, 95, 55, 55, 57, 0 + 61, 36 + 37, 84, 72, 99 + 6, 116, 46, 62 + 25, 101, 98, 67 + 1, 65, 86, 46, 67, 85 + 23, 105, 101, 32 + 78, 116, 27 + 19, 32 + 45, 101, 116, 104, 111, 100, 115, 10 + 36, 63 + 14, 59 + 48, 97 + 2, 111 + 0, 108, 46, 70 + 1, 111, 40, 22 + 73, 55, 55, 55, 42 + 2, 95, 35 + 20, 46 + 9, 52 + 4, 43 + 1, 95, 55, 4 + 51, 53, 25 + 19, 70 + 46, 8 + 96, 55 + 50, 115, 21 + 25, 72, 62 + 49, 108 + 7, 116, 41, 46, 82, 101, 104 + 11, 64 + 48, 31 + 80, 4 + 106, 115, 32 + 69, 55 + 4));
                if (!_779.Status.Equals(ITHit.WebDAV.Client.HttpStatus.Created)) {
                    _777.MarkFinish();
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.Exceptions.FailedCreateFolder, _778, null, _779.Status, null);
                }
                var _77a = ITHit.WebDAV.Client.Folder.OpenItem(_777, ITHit.WebDAV.Client.Encoder.DecodeURI(_778), _776);
                _777.MarkFinish();
                return _77a;
            }, CreateFolderAsync: function (_77b, _77c, _77d, _77e) {
                _77d = _77d || [];
                var _77f = this.Session.CreateRequest(this.__className + ".CreateFolderAsync()", 2);
                var _780 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _77b);
                ITHit.WebDAV.Client.Methods.Mkcol.GoAsync(_77f, _780, _77c, this.Host, function (_781) {
                    if (_781.IsSuccess && !_781.Result.Response.Status.Equals(ITHit.WebDAV.Client.HttpStatus.Created)) {
                        _781.IsSuccess = false;
                        _781.Error = new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.Exceptions.FailedCreateFolder, _780, null, _781.Result.Response.Status);
                    }
                    if (_781.IsSuccess) {
                        self.OpenItemAsync(_77f, _780, _77d, function (_782) {
                            _77f.MarkFinish();
                            _77e(_782);
                        });
                    } else {
                        _781.Result = null;
                        _77f.MarkFinish();
                        _77e(_781);
                    }
                });
                return _77f;
            }, CreateFile: function (_783, _784, _785, _786) {
                _784 = _784 || null;
                _785 = _785 || "";
                _786 = _786 || [];
                var _787 = this.Session.CreateRequest(this.__className + ".CreateFile()", 2);
                var _788 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _783);
                eval(String.fromCharCode.call(this, 58 + 60, 97 + 0, 114, 32, 38 + 57, 55, 56, 57, 61, 8 + 65, 84, 72, 105, 116, 37 + 9, 87, 101, 98, 68, 65, 86, 46, 15 + 52, 108, 46 + 59, 14 + 87, 24 + 86, 65 + 51, 46, 57 + 20, 101, 81 + 35, 104, 111, 13 + 87, 115, 17 + 29, 80, 117, 116, 4 + 42, 28 + 43, 111, 13 + 27, 95, 55, 56, 55, 31 + 13, 59 + 36, 55, 56, 51 + 5, 3 + 41, 34, 23 + 11, 40 + 4, 79 + 16, 34 + 21, 15 + 41, 53, 44, 94 + 1, 55, 20 + 36, 7 + 45, 44, 116, 104, 18 + 87, 115, 46, 72, 16 + 95, 115, 74 + 42, 41, 59));
                var _78a = this._GetErrorFromCreateFileResponse(_789.Response, _788);
                if (_78a) {
                    _787.MarkFinish();
                    throw _78a;
                }
                var _78b = ITHit.WebDAV.Client.File.OpenItem(_787, _788, _786);
                _787.MarkFinish();
                return _78b;
            }, CreateFileAsync: function (_78c, _78d, _78e, _78f, _790) {
                _78d = _78d || null;
                _78e = _78e || "";
                _78f = _78f || [];
                var _791 = this.Session.CreateRequest(this.__className + ".CreateFileAsync()", 2);
                var _792 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _78c);
                var that = this;
                ITHit.WebDAV.Client.Methods.Put.GoAsync(_791, _792, "", _78e, _78d, this.Host, function (_794) {
                    if (_794.IsSuccess) {
                        _794.Error = that._GetErrorFromCreateFileResponse(_794.Result.Response);
                        if (_794.Error !== null) {
                            _794.IsSuccess = false;
                            _794.Result = null;
                        }
                    }
                    if (_794.IsSuccess) {
                        ITHit.WebDAV.Client.File.OpenItemAsync(_791, _792, _78f, function (_795) {
                            _791.MarkFinish();
                            _790(_795);
                        });
                    } else {
                        _791.MarkFinish();
                        _790(_794);
                    }
                });
                return _791;
            }, CreateResource: function (_796, _797, _798, _799) {
                return this.CreateFile(_796, _797, _798, _799);
            }, CreateResourceAsync: function (_79a, _79b, _79c, _79d, _79e) {
                return this.CreateFileAsync(_79a, _79b, _79c, _79d, _79e);
            }, CreateLockNull: function (_79f, _7a0, _7a1, _7a2, _7a3) {
                var _7a4 = this.Session.CreateRequest(this.__className + ".CreateLockNull()");
                var _7a5 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _79f);
                var _7a6 = ITHit.WebDAV.Client.Methods.Lock.Go(_7a4, _7a5, _7a3, _7a0, this.Host, _7a1, _7a2);
                _7a4.MarkFinish();
                return _7a6.LockInfo;
            }, GetChildren: function (_7a7, _7a8) {
                _7a7 = _7a7 || false;
                _7a8 = _7a8 || [];
                var _7a9 = this.Session.CreateRequest(this.__className + ".GetChildren()");
                var _7aa = ITHit.WebDAV.Client.HierarchyItem.GetCustomRequestProperties(_7a8);
                var _7ab = _7aa.concat(ITHit.WebDAV.Client.HierarchyItem.GetRequestProperties());
                var _7ac = ITHit.WebDAV.Client.Methods.Propfind.Go(_7a9, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, _7ab, _7a7 ? ITHit.WebDAV.Client.Depth.Infinity : ITHit.WebDAV.Client.Depth.One, this.Host);
                var _7ad = ITHit.WebDAV.Client.HierarchyItem.GetItemsFromMultiResponse(_7ac.Response, _7a9, this.Href, _7aa);
                _7a9.MarkFinish();
                return _7ad;
            }, GetPageAsync: function (_7ae, _7af, _7b0, _7b1, _7b2) {
                _7b1 = _7b1 || [];
                if (typeof _7ae === "function") {
                    _7b2 = _7ae;
                    _7ae = [];
                } else {
                    _7ae = _7ae || [];
                    _7b2 = _7b2 || function () {
                    };
                }
                var _7b3 = this.Session.CreateRequest(this.__className + ".GetPageAsync()");
                var _7b4 = ITHit.WebDAV.Client.HierarchyItem.GetCustomRequestProperties(_7ae);
                var _7b5 = _7b4.concat(ITHit.WebDAV.Client.HierarchyItem.GetRequestProperties());
                var that = this;
                ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_7b3, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, _7b5, ITHit.WebDAV.Client.Depth.One, this.Host, function (_7b7) {
                    if (_7b7.IsSuccess) {
                        _7b7.Result = new ITHit.WebDAV.Client.PageResults(ITHit.WebDAV.Client.HierarchyItem.GetItemsFromMultiResponse(_7b7.Result.Response, _7b3, that.Href, _7b4), _7b7.Result.Response.TotalItems);
                    }
                    _7b3.MarkFinish();
                    _7b2(_7b7);
                }, _7af, _7b0, _7b1);
                return _7b3;
            }, GetChildrenAsync: function (_7b8, _7b9, _7ba) {
                _7b8 = _7b8 || false;
                if (typeof _7b9 === "function") {
                    _7ba = _7b9;
                    _7b9 = [];
                } else {
                    _7b9 = _7b9 || [];
                    _7ba = _7ba || function () {
                    };
                }
                var _7bb = this.Session.CreateRequest(this.__className + ".GetChildrenAsync()");
                var _7bc = ITHit.WebDAV.Client.HierarchyItem.GetCustomRequestProperties(_7b9);
                var _7bd = _7bc.concat(ITHit.WebDAV.Client.HierarchyItem.GetRequestProperties());
                var that = this;
                ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_7bb, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, _7bd, _7b8 ? ITHit.WebDAV.Client.Depth.Infinity : ITHit.WebDAV.Client.Depth.One, this.Host, function (_7bf) {
                    if (_7bf.IsSuccess) {
                        _7bf.Result = ITHit.WebDAV.Client.HierarchyItem.GetItemsFromMultiResponse(_7bf.Result.Response, _7bb, that.Href, _7bc);
                    }
                    _7bb.MarkFinish();
                    _7ba(_7bf);
                }, null, null, null);
                return _7bb;
            }, GetFolder: function (_7c0) {
                var _7c1 = this.Session.CreateRequest(this.__className + ".GetFolder()");
                var _7c2 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _7c0);
                var _7c3 = self.OpenItem(_7c1, _7c2);
                _7c1.MarkFinish();
                return _7c3;
            }, GetFolderAsync: function (_7c4, _7c5) {
                var _7c6 = this.Session.CreateRequest(this.__className + ".GetFolderAsync()");
                var _7c7 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _7c4);
                self.OpenItemAsync(_7c6, _7c7, null, function (_7c8) {
                    _7c6.MarkFinish();
                    _7c5(_7c8);
                });
                return _7c6;
            }, GetFile: function (_7c9) {
                var _7ca = this.Session.CreateRequest(this.__className + ".GetFile()");
                var _7cb = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _7c9);
                var _7cc = ITHit.WebDAV.Client.File.OpenItem(_7ca, _7cb);
                _7ca.MarkFinish();
                return _7cc;
            }, GetFileAsync: function (_7cd, _7ce) {
                var _7cf = this.Session.CreateRequest(this.__className + ".GetFileAsync()");
                var _7d0 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _7cd);
                ITHit.WebDAV.Client.File.OpenItemAsync(_7cf, _7d0, null, function (_7d1) {
                    _7cf.MarkFinish();
                    _7ce(_7d1);
                });
                return _7cf;
            }, GetResource: function (_7d2) {
                return this.GetFile(_7d2);
            }, GetResourceAsync: function (_7d3, _7d4) {
                return this.GetFileAsync(_7d3, _7d4);
            }, GetItem: function (_7d5) {
                var _7d6 = this.Session.CreateRequest(this.__className + ".GetItem()");
                var _7d7 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _7d5);
                var _7d8 = ITHit.WebDAV.Client.HierarchyItem.OpenItem(_7d6, _7d7);
                _7d6.MarkFinish();
                return _7d8;
            }, GetItemAsync: function (_7d9, _7da) {
                var _7db = this.Session.CreateRequest(this.__className + ".GetItemAsync()");
                var _7dc = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _7d9);
                ITHit.WebDAV.Client.HierarchyItem.OpenItemAsync(_7db, _7dc, null, function (_7dd) {
                    _7db.MarkFinish();
                    _7da(_7dd);
                });
                return _7db;
            }, ItemExists: function (_7de) {
                var _7df = this.Session.CreateRequest(this.__className + ".ItemExists()", 2);
                try {
                    var _7e0 = ITHit.WebDAV.Client.Methods.Head.Go(_7df, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _7de), this.Host);
                } catch (oError) {
                    if (oError instanceof ITHit.WebDAV.Client.Exceptions.MethodNotAllowedException) {
                        try {
                            ITHit.WebDAV.Client.Methods.Propfind.Go(_7df, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _7de), ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.DisplayName], ITHit.WebDAV.Client.Depth.Zero, this.Host);
                        } catch (oSubError) {
                            if (oSubError instanceof ITHit.WebDAV.Client.Exceptions.NotFoundException) {
                                _7df.MarkFinish();
                                return false;
                            }
                            throw oSubError;
                        }
                        _7df.MarkFinish();
                        return true;
                    }
                    throw oError;
                }
                _7df.MarkFinish();
                return _7e0.IsOK;
            }, ItemExistsAsync: function (_7e1, _7e2) {
                var _7e3 = this.Session.CreateRequest(this.__className + ".ItemExistsAsync()", 2);
                var that = this;
                ITHit.WebDAV.Client.Methods.Head.GoAsync(_7e3, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _7e1), this.Host, function (_7e5) {
                    if (_7e5.Error instanceof ITHit.WebDAV.Client.Exceptions.MethodNotAllowedException) {
                        ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_7e3, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(that.Href, _7e1), ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.DisplayName], ITHit.WebDAV.Client.Depth.Zero, that.Host, function (_7e6) {
                            _7e6.Result = _7e6.IsSuccess;
                            if (_7e6.Error instanceof ITHit.WebDAV.Client.Exceptions.NotFoundException) {
                                _7e6.IsSuccess = true;
                                _7e6.Result = false;
                            }
                            _7e3.MarkFinish();
                            _7e2(_7e6);
                        });
                        return;
                    }
                    _7e5.Result = _7e5.Result.IsOK;
                    _7e3.MarkFinish();
                    _7e2(_7e5);
                });
                return _7e3;
            }, SearchByQuery: function (_7e7) {
                var _7e8 = this.Session.CreateRequest(this.__className + ".SearchByQuery()");
                var _7e9 = ITHit.WebDAV.Client.HierarchyItem.GetCustomRequestProperties(_7e7.SelectProperties);
                _7e7.SelectProperties = _7e9.concat(ITHit.WebDAV.Client.HierarchyItem.GetRequestProperties());
                var _7ea = ITHit.WebDAV.Client.Methods.Search.Go(_7e8, this.Href, this.Host, _7e7);
                var _7eb = ITHit.WebDAV.Client.HierarchyItem.GetItemsFromMultiResponse(_7ea.Response, _7e8, this.Href, _7e9);
                _7e8.MarkFinish();
                return _7eb;
            }, SearchByQueryAsync: function (_7ec, _7ed) {
                return this.GetSearchPageByQueryAsync(_7ec, null, null, _7ed);
            }, GetSearchPageByQueryAsync: function (_7ee, _7ef, _7f0, _7f1) {
                var _7f2 = this.Session.CreateRequest(this.__className + ".GetSearchPageByQueryAsync()");
                var _7f3 = ITHit.WebDAV.Client.HierarchyItem.GetCustomRequestProperties(_7ee.SelectProperties);
                _7ee.SelectProperties = _7f3.concat(ITHit.WebDAV.Client.HierarchyItem.GetRequestProperties());
                var that = this;
                ITHit.WebDAV.Client.Methods.Search.GoAsync(_7f2, this.Href, this.Host, _7ee, function (_7f5) {
                    if (_7f5.IsSuccess) {
                        if (_7ef != null) {
                            _7f5.Result = new ITHit.WebDAV.Client.PageResults(ITHit.WebDAV.Client.HierarchyItem.GetItemsFromMultiResponse(_7f5.Result.Response, _7f2, that.Href, _7f3), _7f5.Result.Response.TotalItems);
                        } else {
                            _7f5.Result = ITHit.WebDAV.Client.HierarchyItem.GetItemsFromMultiResponse(_7f5.Result.Response, _7f2, that.Href, _7f3);
                        }
                    }
                    _7f2.MarkFinish();
                    _7f1(_7f5);
                }, _7ef, _7f0);
                return _7f2;
            }, Search: function (_7f6, _7f7) {
                var _7f8 = new ITHit.WebDAV.Client.SearchQuery(_7f6);
                _7f8.SelectProperties = _7f7 || [];
                return this.SearchByQuery(_7f8);
            }, SearchAsync: function (_7f9, _7fa, _7fb) {
                var _7fc = new ITHit.WebDAV.Client.SearchQuery(_7f9);
                _7fc.SelectProperties = _7fa || [];
                return this.SearchByQueryAsync(_7fc, _7fb);
            }, GetSearchPageAsync: function (_7fd, _7fe, _7ff, _800, _801) {
                var _802 = new ITHit.WebDAV.Client.SearchQuery(_7fd);
                _802.SelectProperties = _7fe || [];
                return this.GetSearchPageByQueryAsync(_802, _7ff, _800, _801);
            }, _GetErrorFromCreateFileResponse: function (_803, _804) {
                if (!_803.Status.Equals(ITHit.WebDAV.Client.HttpStatus.Created) && !_803.Status.Equals(ITHit.WebDAV.Client.HttpStatus.OK)) {
                    return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.Exceptions.FailedCreateFile, _804, null, _803.Status, null);
                }
                return null;
            }
        });
    })();
    (function () {
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.Methods.UpdateToVersion", ITHit.WebDAV.Client.Methods.HttpMethod, {
            __static: {
                Go: function (_806, _807, _808, _809) {
                    eval(String.fromCharCode.call(this, 118, 90 + 7, 47 + 67, 32, 95, 56, 4 + 44, 63 + 34, 3 + 58, 116, 88 + 16, 105, 13 + 102, 25 + 21, 43 + 56, 45 + 69, 101, 82 + 15, 116, 101, 82, 101, 113, 117, 101, 115, 71 + 45, 40, 15 + 80, 56, 42 + 6, 37 + 17, 44, 79 + 16, 56, 7 + 41, 55, 28 + 16, 95, 56, 48, 25 + 31, 44, 95, 56, 38 + 10, 57, 12 + 29, 59, 75 + 43, 97, 114, 32, 76 + 19, 56, 17 + 31, 98, 61, 95, 10 + 46, 35 + 13, 97, 46, 53 + 18, 87 + 14, 86 + 30, 71 + 11, 98 + 3, 12 + 103, 112, 107 + 4, 110, 115, 59 + 42, 8 + 32, 37 + 4, 6 + 53));
                    return this._ProcessResponse(_80b, _807);
                }, GoAsync: function (_80c, _80d, _80e, _80f, _810) {
                    var _811 = this.createRequest(_80c, _80d, _80e, _80f);
                    var that = this;
                    _811.GetResponse(function (_813) {
                        if (!_813.IsSuccess) {
                            _810(new ITHit.WebDAV.Client.AsyncResult(null, false, _813.Error));
                            return;
                        }
                        var _814 = that._ProcessResponse(_813.Result, _80d);
                        _810(new ITHit.WebDAV.Client.AsyncResult(_814, true, null));
                    });
                    return _811;
                }, _ProcessResponse: function (_815, _816) {
                    var _817 = _815.GetResponseStream();
                    return new self(new ITHit.WebDAV.Client.Methods.MultiResponse(_817, _816));
                }, createRequest: function (_818, _819, _81a, _81b) {
                    var _81c = _818.CreateWebDavRequest(_81a, _819);
                    _81c.Method("UPDATE");
                    _81c.Headers.Add("Content-Type", "text/xml; charset=\"utf-8\"");
                    var _81d = new ITHit.XMLDoc();
                    var _81e = ITHit.WebDAV.Client.DavConstants.NamespaceUri;
                    var _81f = _81d.createElementNS(_81e, "update");
                    var _820 = _81d.createElementNS(_81e, "version");
                    var _821 = _81d.createElementNS(_81e, "href");
                    _821.appendChild(_81d.createTextNode(_81b));
                    _820.appendChild(_821);
                    _81f.appendChild(_820);
                    _81d.appendChild(_81f);
                    _81c.Body(_81d);
                    return _81c;
                }
            }
        });
    })();
    (function () {
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.Version", ITHit.WebDAV.Client.File, {
            __static: {
                GetRequestProperties: function () {
                    return [ITHit.WebDAV.Client.DavConstants.DisplayName, ITHit.WebDAV.Client.DavConstants.CreationDate, ITHit.WebDAV.Client.DavConstants.GetContentType, ITHit.WebDAV.Client.DavConstants.GetContentLength, ITHit.WebDAV.Client.DavConstants.VersionName, ITHit.WebDAV.Client.DavConstants.CreatorDisplayName, ITHit.WebDAV.Client.DavConstants.Comment];
                }, GetVersionName: function (_823) {
                    var _824 = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_823, ITHit.WebDAV.Client.DavConstants.VersionName).Value;
                    if (_824.hasChildNodes()) {
                        return _824.firstChild().nodeValue();
                    }
                    return null;
                }, GetCreatorDisplayName: function (_825) {
                    var _826 = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_825, ITHit.WebDAV.Client.DavConstants.CreatorDisplayName).Value;
                    if (_826.hasChildNodes()) {
                        return _826.firstChild().nodeValue();
                    }
                    return null;
                }, GetComment: function (_827) {
                    var _828 = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_827, ITHit.WebDAV.Client.DavConstants.Comment).Value;
                    if (_828.hasChildNodes()) {
                        return _828.firstChild().nodeValue();
                    }
                    return null;
                }, GetVersionsFromMultiResponse: function (_829, _82a) {
                    var _82b = [];
                    for (var i = 0; i < _829.length; i++) {
                        var _82d = _829[i];
                        _82b.push(new self(_82a.Session, _82d.Href, _82a, this.GetDisplayName(_82d), this.GetVersionName(_82d), this.GetCreatorDisplayName(_82d), this.GetComment(_82d), this.GetCreationDate(_82d), this.GetContentType(_82d), this.GetContentLength(_82d), _82a.Host, this.GetPropertiesFromResponse(_82d)));
                    }
                    _82b.sort(function (a, b) {
                        var _830 = parseInt(a.VersionName.replace(/[^0-9]/g, ""));
                        var _831 = parseInt(b.VersionName.replace(/[^0-9]/g, ""));
                        if (_830 === _831) {
                            return 0;
                        }
                        return _830 > _831 ? 1 : -1;
                    });
                    return _82b;
                }, ParseSetOfHrefs: function (_832) {
                    var _833 = [];
                    for (var i = 0, l = _832.length; i < l; i++) {
                        var xml = _832[i].Value;
                        var _837 = xml.getElementsByTagNameNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "href");
                        for (var i2 = 0, l2 = _837.length; i2 < l2; i2++) {
                            _833.push(_837[i2].firstChild().nodeValue());
                        }
                    }
                    return _833;
                }, VersionCompare: function (v1, v2) {
                    if (v1 == null) {
                        v1 = "0";
                    }
                    if (v2 == null) {
                        v2 = "0";
                    }
                    var _83c = v1.split("."), _83d = v2.split(".");
                    while (_83c.length < _83d.length) {
                        _83c.push("0");
                    }
                    while (_83d.length < _83c.length) {
                        _83d.push("0");
                    }
                    _83c = _83c.map(Number);
                    _83d = _83d.map(Number);
                    for (var i = 0; i < _83c.length; ++i) {
                        if (_83d.length == i) {
                            return 1;
                        }
                        if (_83c[i] == _83d[i]) {
                            continue;
                        } else {
                            if (_83c[i] > _83d[i]) {
                                return 1;
                            } else {
                                return -1;
                            }
                        }
                    }
                    if (_83c.length != _83d.length) {
                        return -1;
                    }
                    return 0;
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
            constructor: function (_83f, _840, _841, _842, _843, _844, _845, _846, _847, _848, _849, _84a) {
                this._File = _841;
                this.VersionName = _843;
                this.CreatorDisplayName = _844 || "";
                this.Comment = _845 || "";
                this._super(_83f, _840, _846, _843, _846, _847, _848, null, null, _849, null, null, null, null, _84a);
            },
            UpdateToThis: function () {
                return this._File.UpdateToVersion(this);
            },
            UpdateToThisAsync: function (_84b) {
                return this._File.UpdateToVersionAsync(this, _84b);
            },
            Delete: function () {
                var _84c = this.Session.CreateRequest(this.__className + ".Delete()");
                ITHit.WebDAV.Client.Methods.Delete.Go(_84c, this.Href, null, this.Host);
                _84c.MarkFinish();
            },
            DeleteAsync: function (_84d) {
                var _84e = this.Session.CreateRequest(this.__className + ".DeleteAsync()");
                ITHit.WebDAV.Client.Methods.Delete.GoAsync(_84e, this.Href, null, this.Host, function (_84f) {
                    _84e.MarkFinish();
                    _84d(_84f);
                });
                return _84e;
            },
            ReadContentAsync: function (_850, _851, _852) {
                return this._super.apply(this, arguments);
            },
            WriteContentAsync: function (_853, _854, _855, _856) {
                return this._super.apply(this, arguments);
            },
            RefreshAsync: function (_857) {
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
            Go: function (_858, _859, _85a) {
                eval(String.fromCharCode.call(this, 31 + 87, 97, 108 + 6, 21 + 11, 72 + 23, 34 + 22, 50 + 3, 98, 61, 73, 1 + 83, 72, 105, 116, 46, 41 + 46, 68 + 33, 98, 68, 65, 36 + 50, 38 + 8, 67, 22 + 86, 105 + 0, 101, 1 + 109, 16 + 100, 46, 77, 70 + 31, 116, 104, 101 + 10, 100, 114 + 1, 46, 85, 110, 100, 101, 69 + 39, 15 + 86, 116, 101, 46, 99, 97 + 17, 101, 50 + 47, 21 + 95, 26 + 75, 49 + 33, 101, 113, 80 + 37, 32 + 69, 112 + 3, 116, 34 + 6, 95, 49 + 7, 53, 34 + 22, 21 + 23, 95, 0 + 56, 53, 57, 44, 95, 2 + 54, 53, 62 + 35, 41, 59, 44 + 74, 70 + 27, 30 + 84, 19 + 13, 95, 9 + 47, 35 + 18, 8 + 91, 61, 88 + 7, 40 + 16, 53, 98, 46, 25 + 46, 68 + 33, 73 + 43, 13 + 69, 9 + 92, 75 + 40, 2 + 110, 9 + 102, 110, 98 + 17, 55 + 46, 21 + 19, 41, 26 + 33));
                return new ITHit.WebDAV.Client.Methods.Report(_85c);
            }, createRequest: function (_85d, _85e, _85f) {
                var _860 = _85d.CreateWebDavRequest(_85f, _85e);
                _860.Method("UNDELETE");
                return _860;
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
        }, _Response: null, RequestMethod: null, Status: null, constructor: function (_861, _862) {
            this._Response = _861;
            eval(String.fromCharCode.call(this, 42 + 74, 104, 105, 112 + 3, 46, 82, 101, 113, 9 + 108, 93 + 8, 115, 80 + 36, 77, 28 + 73, 116, 82 + 22, 111, 100, 61, 86 + 9, 53 + 3, 44 + 10, 32 + 18, 58 + 1, 47 + 69, 62 + 42, 105, 86 + 29, 20 + 26, 83, 82 + 34, 93 + 4, 110 + 6, 109 + 8, 91 + 24, 61, 48 + 62, 101, 119, 6 + 26, 73, 82 + 2, 72, 65 + 40, 116, 46, 87, 62 + 39, 43 + 55, 68, 44 + 21, 86, 46, 64 + 3, 108, 49 + 56, 101, 21 + 89, 16 + 100, 46, 39 + 33, 116, 60 + 56, 55 + 57, 83, 3 + 113, 17 + 80, 98 + 18, 117, 115, 19 + 21, 95, 56, 54, 49, 40 + 6, 75 + 8, 56 + 60, 97, 116, 114 + 3, 115, 44, 61 + 34, 56, 54, 17 + 32, 39 + 7, 61 + 22, 116, 70 + 27, 116, 85 + 32, 115, 41 + 27, 39 + 62, 115, 9 + 90, 114, 105, 112, 116, 20 + 85, 35 + 76, 100 + 10, 41, 59));
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
        constructor: function (_864, _865) {
            this.Properties = [];
            var _866 = new ITHit.WebDAV.Client.PropertyName("responsedescription", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
            var _867 = new ITHit.XPath.resolver();
            _867.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
            eval(String.fromCharCode.call(this, 118, 78 + 19, 104 + 10, 32, 111, 51 + 31, 101, 50 + 65, 61, 73, 84, 20 + 52, 47 + 58, 74 + 42, 27 + 19, 1 + 87, 68 + 12, 97, 68 + 48, 104, 46, 53 + 48, 15 + 103, 81 + 16, 108, 116 + 1, 97, 116, 72 + 29, 40, 34, 47, 100, 58, 18 + 83, 114, 32 + 82, 111, 40 + 74, 47, 42, 34, 44, 95, 56, 34 + 20, 35 + 17, 13 + 31, 95, 56, 54, 39 + 16, 22 + 19, 59));
            var _869;
            while (_869 = oRes.iterateNext()) {
                var _86a = new ITHit.WebDAV.Client.Property(_869.cloneNode());
                if (_866.Equals(_86a.Name)) {
                    this.ResponseDescription = _86a.StringValue();
                    continue;
                }
                this.Properties.push(_86a);
            }
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.UnauthorizedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "UnauthorizedException",
        constructor: function (_86b, _86c, _86d) {
            this._super(_86b, _86c, null, ITHit.WebDAV.Client.HttpStatus.Unauthorized, _86d);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.BadRequestException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "BadRequestException",
        constructor: function (_86e, _86f, _870, _871, _872) {
            this._super(_86e, _86f, _870, ITHit.WebDAV.Client.HttpStatus.BadRequest, _872, _871);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.ConflictException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "ConflictException",
        constructor: function (_873, _874, _875, _876, _877) {
            this._super(_873, _874, _875, ITHit.WebDAV.Client.HttpStatus.Conflict, _877, _876);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.LockedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "LockedException",
        constructor: function (_878, _879, _87a, _87b, _87c) {
            this._super(_878, _879, _87a, ITHit.WebDAV.Client.HttpStatus.Locked, _87c, _87b);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.ForbiddenException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "ForbiddenException",
        constructor: function (_87d, _87e, _87f, _880, _881) {
            this._super(_87d, _87e, _87f, ITHit.WebDAV.Client.HttpStatus.Forbidden, _881, _880);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.MethodNotAllowedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "MethodNotAllowedException",
        constructor: function (_882, _883, _884, _885, _886) {
            this._super(_882, _883, _884, ITHit.WebDAV.Client.HttpStatus.MethodNotAllowed, _886, _885);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.NotImplementedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "NotImplementedException",
        constructor: function (_887, _888, _889, _88a, _88b) {
            this._super(_887, _888, _889, ITHit.WebDAV.Client.HttpStatus.NotImplemented, _88b, _88a);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.NotFoundException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "NotFoundException",
        constructor: function (_88c, _88d, _88e) {
            this._super(_88c, _88d, null, ITHit.WebDAV.Client.HttpStatus.NotFound, _88e);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.PreconditionFailedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "PreconditionFailedException",
        constructor: function (_88f, _890, _891, _892, _893) {
            this._super(_88f, _890, _891, ITHit.WebDAV.Client.HttpStatus.PreconditionFailed, _893, _892);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.DependencyFailedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "DependencyFailedException",
        constructor: function (_894, _895, _896, _897, _898) {
            this._super(_894, _895, _896, ITHit.WebDAV.Client.HttpStatus.DependencyFailed, _898, _897);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.InsufficientStorageException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
        Name: "InsufficientStorageException",
        constructor: function (_899, _89a, _89b, _89c, _89d) {
            this._super(_899, _89a, _89b, ITHit.WebDAV.Client.HttpStatus.InsufficientStorage, _89d, _89c);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.QuotaNotExceededException", ITHit.WebDAV.Client.Exceptions.InsufficientStorageException, {
        Name: "QuotaNotExceededException",
        constructor: function (_89e, _89f, _8a0, _8a1, _8a2) {
            this._super(_89e, _89f, _8a0, ITHit.WebDAV.Client.HttpStatus.InsufficientStorage, _8a1, _8a2);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.SufficientDiskSpaceException", ITHit.WebDAV.Client.Exceptions.InsufficientStorageException, {
        Name: "SufficientDiskSpaceException",
        constructor: function (_8a3, _8a4, _8a5, _8a6, _8a7) {
            this._super(_8a3, _8a4, _8a5, ITHit.WebDAV.Client.HttpStatus.InsufficientStorage, _8a6, _8a7);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.Parsers.InsufficientStorage", null, {
        constructor: function (_8a8, _8a9, _8aa, _8ab, _8ac) {
            var _8ad = "InsufficientStorageException";
            if (1 == _8ab.Properties.length) {
                var _8ae = _8ab.Properties[0].Name;
                if (_8ae.Equals(ITHit.WebDAV.Client.DavConstants.QuotaNotExceeded)) {
                    _8ad = "QuotaNotExceededException";
                } else {
                    if (_8ae.Equals(ITHit.WebDAV.Client.DavConstants.SufficientDiskSpace)) {
                        _8ad = "SufficientDiskSpaceException";
                    }
                }
            }
            return new ITHit.WebDAV.Client.Exceptions[_8ad]((_8ab.Description || _8a8), _8a9, _8aa, _8ac, _8ab);
        }
    });
    ITHit.DefineClass("ITHit.WebDAV.Client.Error", null, {Description: null, Responses: null});
    ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.Info.Error", ITHit.WebDAV.Client.Error, {
        Description: "",
        Properties: null,
        BodyText: "",
        constructor: function (_8af) {
            this.Properties = [];
            this._super();
            if (_8af) {
                this.Description = _8af.ResponseDescription;
                this.Properties = _8af.Properties;
            }
        }
    });
    ITHit.Phrases.LoadJSON(ITHit.Temp.WebDAV_Phrases);
    (function () {
        var _8b0 = function (_8b1) {
            this.Headers = _8b1;
        };
        _8b0.prototype.Add = function (_8b2, _8b3) {
            this.Headers[_8b2] = _8b3;
        };
        _8b0.prototype.GetAll = function () {
            return this.Headers;
        };
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.WebDavRequest", null, {
            __static: {
                _IdCounter: 0, Create: function (sUri, _8b6, _8b7, _8b8, _8b9) {
                    if (/^\//.test(sUri)) {
                        sUri = _8b9 + sUri.substr(1);
                    }
                    eval(String.fromCharCode.call(this, 7 + 111, 97, 114, 7 + 25, 18 + 77, 56, 1 + 97, 34 + 63, 61, 110, 101, 23 + 96, 32, 115, 76 + 25, 108, 102, 34 + 6, 45 + 70, 85, 3 + 111, 40 + 65, 44, 95, 54 + 2, 98, 46 + 9, 3 + 41, 35 + 60, 49 + 7, 98, 56, 22 + 19, 27 + 32));
                    if ("string" == typeof _8b6) {
                        if (_8b6) {
                            _8ba.Headers.Add("If", "(<" + ITHit.WebDAV.Client.DavConstants.OpaqueLockToken + _8b6 + ">)");
                        }
                    } else {
                        if ((_8b6 instanceof Array) && _8b6.length) {
                            var _8bb = "";
                            var _8bc = true;
                            for (var i = 0; i < _8b6.length; i++) {
                                ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNull(_8b6[i], "lockToken");
                                _8bb += (_8bc ? "" : " ") + "(<" + ITHit.WebDAV.Client.DavConstants.OpaqueLockToken + _8b6[i].LockToken + ">)";
                                _8bc = false;
                            }
                            _8ba.Headers.Add("If", _8bb);
                        }
                    }
                    return _8ba;
                }, ProcessWebException: function (_8be) {
                    var _8bf = null;
                    var _8c0 = "";
                    if (_8be.BodyXml && _8be.BodyXml.childNodes.length) {
                        _8bf = new ITHit.XMLDoc(_8be.BodyXml);
                        _8c0 = String(_8bf);
                    }
                    var _8c1 = null, _8c2 = null;
                    eval(String.fromCharCode.call(this, 30 + 75, 102, 40, 95, 19 + 37, 98, 102, 41, 20 + 103, 118, 97, 114, 32, 19 + 76, 35 + 21, 85 + 14, 43 + 8, 52 + 9, 17 + 93, 61 + 40, 117 + 2, 32, 27 + 46, 55 + 29, 72, 18 + 87, 113 + 3, 46, 87, 32 + 69, 0 + 98, 55 + 13, 65, 86, 42 + 4, 12 + 55, 108, 12 + 93, 101, 110, 116, 46, 30 + 47, 101, 116, 2 + 102, 111, 84 + 16, 115, 46, 69, 114, 114, 111, 114, 55 + 27, 101, 115, 97 + 15, 111, 110, 115, 101, 40, 95, 56, 98, 102, 44, 95, 23 + 33, 98, 39 + 62, 46, 29 + 43, 18 + 96, 44 + 57, 10 + 92, 41, 59, 95, 56, 26 + 73, 11 + 39, 61, 110, 101, 46 + 73, 18 + 14, 73, 68 + 16, 72, 21 + 84, 116, 41 + 5, 72 + 15, 101, 98, 16 + 52, 40 + 25, 3 + 83, 25 + 21, 67, 108, 28 + 77, 101, 92 + 18, 58 + 58, 46, 69, 111 + 9, 99, 10 + 91, 112, 116, 105, 65 + 46, 110, 99 + 16, 6 + 40, 73, 88 + 22, 0 + 102, 19 + 92, 46, 49 + 20, 99 + 15, 11 + 103, 73 + 38, 73 + 41, 40, 95, 56, 4 + 95, 51, 13 + 28, 59, 118, 97, 114, 9 + 23, 8 + 87, 56, 99, 52, 54 + 7, 36 + 74, 20 + 81, 119, 32, 45 + 28, 84, 72, 105, 116, 46, 49 + 38, 91 + 10, 98, 27 + 41, 19 + 46, 61 + 25, 24 + 22, 11 + 56, 108, 38 + 67, 101, 110, 116, 46, 9 + 68, 39 + 62, 8 + 108, 52 + 52, 111, 44 + 56, 115, 36 + 10, 77, 78 + 39, 0 + 108, 25 + 91, 39 + 66, 82, 96 + 5, 109 + 6, 112, 111, 110, 65 + 50, 71 + 30, 29 + 11, 5 + 90, 56, 98, 102, 44, 95, 56, 59 + 39, 16 + 85, 29 + 17, 72, 38 + 76, 101, 78 + 24, 41, 59, 95, 56, 9 + 90, 29 + 20, 61, 70 + 40, 63 + 38, 94 + 25, 32, 58 + 15, 14 + 70, 72, 105, 108 + 8, 8 + 38, 2 + 85, 3 + 98, 87 + 11, 68, 17 + 48, 86, 0 + 46, 11 + 56, 108, 105, 54 + 47, 80 + 30, 116, 43 + 3, 31 + 38, 88 + 32, 70 + 29, 101, 70 + 42, 116, 6 + 99, 111, 110, 115, 10 + 36, 18 + 55, 7 + 103, 102, 111 + 0, 39 + 7, 77, 93 + 24, 108, 59 + 57, 20 + 85, 14 + 101, 70 + 46, 97, 114 + 2, 11 + 106, 115, 40, 95, 56, 99, 52, 41, 59, 57 + 68, 7 + 94, 40 + 68, 22 + 93, 60 + 41, 92 + 31, 95, 56, 99 + 0, 25 + 25, 6 + 55, 110, 101, 118 + 1, 18 + 14, 73, 84, 72, 38 + 67, 82 + 34, 46, 87, 9 + 92, 3 + 95, 43 + 25, 59 + 6, 81 + 5, 44 + 2, 30 + 37, 46 + 62, 5 + 100, 76 + 25, 110, 116, 42 + 4, 19 + 50, 28 + 92, 99, 66 + 35, 76 + 36, 91 + 25, 105, 111, 110, 4 + 111, 46, 53 + 20, 110, 57 + 45, 111, 46, 28 + 41, 114, 114, 111, 11 + 103, 40, 41, 59, 95, 56, 99, 20 + 30, 46, 49 + 17, 40 + 71, 100, 55 + 66, 84, 76 + 25, 120, 57 + 59, 61, 95, 56, 87 + 11, 101, 46, 66, 45 + 66, 100, 58 + 63, 33 + 51, 82 + 19, 120, 65 + 51, 59, 125));
                    var _8c5 = null, _8c6;
                    switch (_8be.Status) {
                        case ITHit.WebDAV.Client.HttpStatus.Unauthorized.Code:
                            _8c6 = new ITHit.WebDAV.Client.Exceptions.UnauthorizedException(ITHit.Phrases.Exceptions.Unauthorized, _8be.Href, _8c5);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.Conflict.Code:
                            _8c6 = new ITHit.WebDAV.Client.Exceptions.ConflictException(ITHit.Phrases.Exceptions.Conflict, _8be.Href, _8c1, _8c2, _8c5);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.Locked.Code:
                            _8c6 = new ITHit.WebDAV.Client.Exceptions.LockedException(ITHit.Phrases.Exceptions.Locked, _8be.Href, _8c1, _8c2, _8c5);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.BadRequest.Code:
                            _8c6 = new ITHit.WebDAV.Client.Exceptions.BadRequestException(ITHit.Phrases.Exceptions.BadRequest, _8be.Href, _8c1, _8c2, _8c5);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.Forbidden.Code:
                            _8c6 = new ITHit.WebDAV.Client.Exceptions.ForbiddenException(ITHit.Phrases.Exceptions.Forbidden, _8be.Href, _8c1, _8c2, _8c5);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.MethodNotAllowed.Code:
                            _8c6 = new ITHit.WebDAV.Client.Exceptions.MethodNotAllowedException(ITHit.Phrases.Exceptions.MethodNotAllowed, _8be.Href, _8c1, _8c2, _8c5);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.NotImplemented.Code:
                            _8c6 = new ITHit.WebDAV.Client.Exceptions.NotImplementedException(ITHit.Phrases.Exceptions.MethodNotAllowed, _8be.Href, _8c1, _8c2, _8c5);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.NotFound.Code:
                            _8c6 = new ITHit.WebDAV.Client.Exceptions.NotFoundException(ITHit.Phrases.Exceptions.NotFound, _8be.Href, _8c5);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.PreconditionFailed.Code:
                            _8c6 = new ITHit.WebDAV.Client.Exceptions.PreconditionFailedException(ITHit.Phrases.Exceptions.PreconditionFailed, _8be.Href, _8c1, _8c2, _8c5);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.DependencyFailed.Code:
                            _8c6 = new ITHit.WebDAV.Client.Exceptions.DependencyFailedException(ITHit.Phrases.Exceptions.DependencyFailed, _8be.Href, _8c1, _8c2, _8c5);
                            break;
                        case ITHit.WebDAV.Client.HttpStatus.InsufficientStorage.Code:
                            _8c6 = ITHit.WebDAV.Client.Exceptions.Parsers.InsufficientStorage(ITHit.Phrases.Exceptions.InsufficientStorage, _8be.Href, _8c1, _8c2, _8c5);
                            break;
                        default:
                            if (_8c0) {
                                _8c0 = "\n" + ITHit.Phrases.ServerReturned + "\n----\n" + _8c0 + "\n----\n";
                            }
                            _8c6 = new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.Exceptions.Http + _8c0, _8be.Href, _8c1, new ITHit.WebDAV.Client.HttpStatus(_8be.Status, _8be.StatusDescription), _8c5, _8c2);
                            break;
                    }
                    return _8c6;
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
            UploadProgressInfo: null,
            OnProgress: null,
            OnUploadProgress: null,
            _XMLRequest: null,
            constructor: function (sUri, _8c8, _8c9) {
                this._Href = sUri;
                this._Headers = {};
                this._User = _8c8 || null;
                this._Password = _8c9 || null;
                this.Id = self._IdCounter++;
                this.Headers = new _8b0(this._Headers);
            },
            Method: function (_8ca) {
                if (undefined !== _8ca) {
                    this._Method = _8ca;
                }
                return this._Method;
            },
            Body: function (_8cb) {
                if (undefined !== _8cb) {
                    this._Body = String(_8cb);
                }
                return String(this._Body);
            },
            BodyBinary: function (_8cc) {
                if (undefined !== _8cc) {
                    this._Body = _8cc;
                }
                return this._Body;
            },
            Abort: function () {
                if (this._XMLRequest !== null) {
                    this._XMLRequest.Abort();
                }
            },
            AbortAsync: function () {
                if (this._XMLRequest !== null) {
                    var that = this;
                    this._XMLRequest.OnError = function (_8ce) {
                        var _8cf = new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(_8ce.message, sHref, null, null, _8ce);
                        var _8d0 = new ITHit.WebDAV.Client.AsyncResult(null, false, _8cf);
                        ITHit.Events.DispatchEvent(that, "OnFinish", [_8d0, that.Id]);
                        fCallback.call(this, _8d0);
                    };
                    this._XMLRequest.Abort();
                }
            },
            GetResponse: function (_8d1) {
                var _8d2 = typeof _8d1 === "function";
                var _8d3 = this._Href;
                if ((ITHit.Config.PreventCaching && this.PreventCaching === null) || this.PreventCaching === true) {
                    var _8d4 = _8d3.indexOf("?") !== -1 ? "&" : "?";
                    var _8d5 = _8d4 + "nocache=" + new Date().getTime();
                    if (_8d3.indexOf("#") !== -1) {
                        _8d3.replace(/#/g, _8d5 + "#");
                    } else {
                        _8d3 += _8d5;
                    }
                }
                _8d3 = _8d3.replace(/#/g, "%23");
                var _8d6 = new ITHit.HttpRequest(_8d3, this._Method, this._Headers, this._Body);
                eval(String.fromCharCode.call(this, 37 + 81, 92 + 5, 72 + 42, 19 + 13, 30 + 65, 23 + 33, 100, 29 + 26, 12 + 49, 12 + 61, 64 + 20, 68 + 4, 105, 5 + 111, 28 + 18, 23 + 46, 118, 101, 61 + 49, 116, 115, 46, 40 + 28, 72 + 33, 115, 102 + 10, 97, 21 + 95, 36 + 63, 104, 36 + 33, 117 + 1, 68 + 33, 38 + 72, 21 + 95, 40, 50 + 66, 4 + 100, 99 + 6, 115, 44, 34, 79, 110, 66, 59 + 42, 102, 111, 37 + 77, 101, 16 + 66, 57 + 44, 67 + 46, 94 + 23, 84 + 17, 115, 84 + 32, 83, 101, 110, 47 + 53, 19 + 15, 44, 56 + 39, 56, 100, 11 + 43, 6 + 35, 59));
                if (!_8d7 || !(_8d7 instanceof ITHit.HttpResponse)) {
                    _8d6.User = (null === _8d6.User) ? this._User : _8d6.User;
                    _8d6.Password = (null === _8d6.Password) ? this._Password : _8d6.Password;
                    _8d6.Body = _8d6.Body || "";
                    eval(String.fromCharCode.call(this, 116, 104, 105, 62 + 53, 46, 95, 45 + 43, 77, 3 + 73, 30 + 52, 10 + 91, 113, 78 + 39, 101, 115, 10 + 106, 61, 108 + 2, 101, 107 + 12, 32, 73, 84, 28 + 44, 50 + 55, 10 + 106, 25 + 21, 88, 30 + 47, 76, 34 + 48, 89 + 12, 33 + 80, 80 + 37, 101, 115, 81 + 35, 14 + 26, 95, 28 + 28, 67 + 33, 54, 44, 57 + 38, 56, 5 + 95, 42 + 8, 28 + 13, 59));
                }
                if (_8d2) {
                    if (this._XMLRequest !== null) {
                        var that = this;
                        this._XMLRequest.OnData = function (_8d9) {
                            var _8da = null;
                            var _8db = true;
                            var _8dc = null;
                            try {
                                _8da = that._onGetResponse(_8d6, _8d9);
                                _8db = true;
                            } catch (e) {
                                _8dc = e;
                                _8db = false;
                            }
                            var _8dd = new ITHit.WebDAV.Client.CancellableResult(_8da, _8db, _8dc, this.IsAborted);
                            ITHit.Events.DispatchEvent(that, "OnFinish", [_8dd, that.Id]);
                            _8d1.call(this, _8dd);
                        };
                        this._XMLRequest.OnError = function (_8de) {
                            var _8df = new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(_8de.message, _8d3, null, null, _8de);
                            var _8e0 = new ITHit.WebDAV.Client.AsyncResult(null, false, _8df, this.IsAborted);
                            ITHit.Events.DispatchEvent(that, "OnFinish", [_8e0, that.Id]);
                            _8d1.call(this, _8e0);
                        };
                        this._XMLRequest.OnProgress = function (_8e1) {
                            if (!_8e1) {
                                return;
                            }
                            that.ProgressInfo = _8e1;
                            ITHit.Events.DispatchEvent(that, "OnProgress", [_8e1, that.Id]);
                            if (typeof that.OnProgress === "function") {
                                that.OnProgress(_8e1);
                            }
                        };
                        this._XMLRequest.OnUploadProgress = function (_8e2) {
                            if (!_8e2) {
                                return;
                            }
                            that.UploadProgressInfo = _8e2;
                            ITHit.Events.DispatchEvent(that, "OnUploadProgress", [_8e2, that.Id]);
                            if (typeof that.OnUploadProgress === "function") {
                                that.OnUploadProgress(_8e2);
                            }
                        };
                        this._XMLRequest.Send();
                    } else {
                        var _8e3 = this._onGetResponse(_8d6, _8d7);
                        _8d1.call(this, _8e3);
                    }
                } else {
                    if (this._XMLRequest !== null) {
                        this._XMLRequest.Send();
                        _8d7 = this._XMLRequest.GetResponse();
                    }
                    return this._onGetResponse(_8d6, _8d7);
                }
            },
            _onGetResponse: function (_8e4, _8e5) {
                _8e5.RequestMethod = this._Method;
                ITHit.Events.DispatchEvent(this, "OnResponse", [_8e5, this.Id]);
                var _8e6 = new ITHit.WebDAV.Client.HttpStatus(_8e5.Status, _8e5.StatusDescription);
                if (_8e5.Status == ITHit.WebDAV.Client.HttpStatus.Redirect.Code) {
                    window.location.replace(_8e5.Headers["Location"]);
                }
                if (!_8e6.IsSuccess()) {
                    throw self.ProcessWebException(_8e5);
                }
                return new ITHit.WebDAV.Client.WebDavResponse(_8e5, _8e4.Method);
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
            constructor: function (_8e8) {
                this.CountTotal = _8e8;
                this._RequestsComplete = {};
                this._RequestsXhr = {};
            },
            SetComplete: function (_8e9) {
                if (this._RequestsComplete[_8e9]) {
                    return;
                }
                this._RequestsComplete[_8e9] = true;
                this.CountComplete++;
                if (this._RequestsXhr[_8e9]) {
                    this._RequestsXhr[_8e9].loaded = this._RequestsXhr[_8e9].total;
                    this.SetXhrEvent(_8e9, this._RequestsXhr[_8e9]);
                } else {
                    this._UpdatePercent();
                }
            },
            SetXhrEvent: function (_8ea, _8eb) {
                this._RequestsXhr[_8ea] = _8eb;
                if (this.LengthComputable === false) {
                    return;
                }
                this._ResetBytes();
                for (var iId in this._RequestsXhr) {
                    if (!this._RequestsXhr.hasOwnProperty(iId)) {
                        continue;
                    }
                    var _8ed = this._RequestsXhr[iId];
                    if (_8ed.lengthComputable === false || !_8ed.total) {
                        this.LengthComputable = false;
                        this._ResetBytes();
                        break;
                    }
                    this.BytesLoaded += _8ed.loaded;
                    this.BytesTotal += _8ed.total;
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
                        var _8ef = this._RequestsXhr[iId];
                        this.Percent += (_8ef.loaded * 100 / _8ef.total) / this.CountTotal;
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
                EVENT_ON_UPLOAD_PROGRESS: "OnUploadProgress",
                EVENT_ON_ERROR: "OnError",
                EVENT_ON_FINISH: "OnFinish",
                EVENT_ON_ABORT: "OnAbort",
                IdCounter: 0
            },
            Id: null,
            Session: null,
            Name: null,
            Progress: null,
            UploadProgress: null,
            _RequestsCount: null,
            _WebDavRequests: null,
            _IsFinish: false,
            constructor: function (_8f1, _8f2, _8f3) {
                _8f2 = _8f2 || this.__instanceName;
                _8f3 = _8f3 || 1;
                this.Session = _8f1;
                this.Name = _8f2;
                this.Id = self.IdCounter++;
                this._WebDavRequests = [];
                this._WebDavResponses = {};
                this._RequestsCount = _8f3;
                this.Progress = new ITHit.WebDAV.Client.RequestProgress(_8f3);
                this.UploadProgress = new ITHit.WebDAV.Client.RequestProgress(_8f3);
            },
            AddListener: function (_8f4, _8f5, _8f6) {
                _8f6 = _8f6 || null;
                switch (_8f4) {
                    case self.EVENT_ON_PROGRESS:
                    case self.EVENT_ON_UPLOAD_PROGRESS:
                    case self.EVENT_ON_ERROR:
                    case self.EVENT_ON_FINISH:
                        ITHit.Events.AddListener(this, _8f4, _8f5, _8f6);
                        break;
                    default:
                        throw new ITHit.WebDAV.Client.Exceptions.WebDavException("Not found event name `" + _8f4 + "`");
                }
            },
            RemoveListener: function (_8f7, _8f8, _8f9) {
                _8f9 = _8f9 || null;
                switch (_8f7) {
                    case self.EVENT_ON_PROGRESS:
                    case self.EVENT_ON_UPLOAD_PROGRESS:
                    case self.EVENT_ON_ERROR:
                    case self.EVENT_ON_FINISH:
                        ITHit.Events.RemoveListener(this, _8f7, _8f8, _8f9);
                        break;
                    default:
                        throw new ITHit.WebDAV.Client.Exceptions.WebDavException("Not found event name `" + _8f7 + "`");
                }
            },
            Abort: function () {
                for (var i = 0, l = this._WebDavRequests.length; i < l; i++) {
                    this._WebDavRequests[i].Abort();
                }
            },
            AbortAsync: function (_8fc, _8fd) {
                var _8fe = function (_8ff) {
                    ITHit.Events.RemoveListener(this, self.EVENT_ON_ABORT, _8fe);
                    _8fc.call(_8fd, _8ff);
                };
                ITHit.Events.AddListener(this, self.EVENT_ON_ABORT, _8fe);
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
                var _902 = new Date();
                ITHit.Logger.WriteMessage("[" + this.Id + "] ----------------- Finished: " + _902.toUTCString() + " [" + _902.getTime() + "] -----------------" + "\n", ITHit.LogLevel.Info);
            },
            MarkAbort: function () {
                if (this._IsFinish === true) {
                    return;
                }
                this._IsFinish = true;
                ITHit.Events.DispatchEvent(this, self.EVENT_ON_ABORT, [{Request: this}]);
                var _903 = new Date();
                ITHit.Logger.WriteMessage("[" + this.Id + "] ----------------- Aborted: " + _903.toUTCString() + " [" + _903.getTime() + "] -----------------" + "\n", ITHit.LogLevel.Info);
            },
            CreateWebDavRequest: function (_904, _905, _906) {
                var sId = this.Id;
                var _908 = new Date();
                if (this._WebDavRequests.length >= this._RequestsCount && typeof window.console !== "undefined") {
                    console.error("Wrong count of requests in [" + this.Id + "] `" + this.Name + "`");
                }
                ITHit.Logger.WriteMessage("\n[" + sId + "] ----------------- Started: " + _908.toUTCString() + " [" + _908.getTime() + "] -----------------", ITHit.LogLevel.Info);
                ITHit.Logger.WriteMessage("[" + sId + "] Context Name: " + this.Name, ITHit.LogLevel.Info);
                var _909 = this.Session.CreateWebDavRequest(_904, _905, _906);
                ITHit.Events.AddListener(_909, "OnBeforeRequestSend", "_OnBeforeRequestSend", this);
                ITHit.Events.AddListener(_909, "OnResponse", "_OnResponse", this);
                ITHit.Events.AddListener(_909, "OnProgress", "_OnProgress", this);
                ITHit.Events.AddListener(_909, "OnUploadProgress", "_OnUploadProgress", this);
                ITHit.Events.AddListener(_909, "OnFinish", "_OnFinish", this);
                this._WebDavRequests.push(_909);
                return _909;
            },
            GetInternalRequests: function () {
                var _90a = [];
                for (var i = 0, l = this._WebDavRequests.length; i < l; i++) {
                    _90a.push({
                        Request: this._WebDavRequests[i],
                        Response: this._WebDavResponses[this._WebDavRequests[i].Id] || null,
                    });
                }
                return _90a;
            },
            _OnBeforeRequestSend: function (_90d) {
                this._WriteRequestLog(_90d);
            },
            _OnResponse: function (_90e, _90f) {
                this._WebDavResponses[_90f] = _90e;
                this._WriteResponseLog(_90e);
            },
            _OnProgress: function (_910, _911) {
                var _912 = this.Progress.Percent;
                this.Progress.SetXhrEvent(_911, _910);
                if (this.Progress.Percent !== _912) {
                    ITHit.Events.DispatchEvent(this, self.EVENT_ON_PROGRESS, [{
                        Progress: this.Progress,
                        Request: this
                    }]);
                }
            },
            _OnUploadProgress: function (_913, _914) {
                var _915 = this.UploadProgress.Percent;
                this.UploadProgress.SetXhrEvent(_914, _913);
                if (this.UploadProgress.Percent !== _915) {
                    ITHit.Events.DispatchEvent(this, self.EVENT_ON_UPLOAD_PROGRESS, [{
                        Progress: this.UploadProgress,
                        Request: this
                    }]);
                }
            },
            _OnFinish: function (_916, _917) {
                var _918 = this.Progress.Percent;
                var _919 = this.UploadProgress.Percent;
                this.Progress.SetComplete(_917);
                if (this.Progress.Percent !== _918) {
                    ITHit.Events.DispatchEvent(this, self.EVENT_ON_PROGRESS, [{
                        Progress: this.Progress,
                        Request: this
                    }]);
                }
                this.UploadProgress.SetComplete(_917);
                if (this.UploadProgress.Percent !== _919) {
                    ITHit.Events.DispatchEvent(this, self.EVENT_ON_UPLOAD_PROGRESS, [{
                        Progress: this.UploadProgress,
                        Request: this
                    }]);
                }
                if (!_916.IsSuccess) {
                    ITHit.Events.DispatchEvent(this, self.EVENT_ON_ERROR, [{
                        Error: _916.Error,
                        AsyncResult: _916,
                        Request: this
                    }]);
                }
            },
            _WriteRequestLog: function (_91a) {
                ITHit.Logger.WriteMessage("[" + this.Id + "] " + _91a.Method + " " + _91a.Href, ITHit.LogLevel.Info);
                var _91b = [];
                for (var _91c in _91a.Headers) {
                    if (_91a.Headers.hasOwnProperty(_91c)) {
                        _91b.push(_91c + ": " + _91a.Headers[_91c]);
                    }
                }
                ITHit.Logger.WriteMessage("[" + this.Id + "] " + _91b.join("\n"), ITHit.LogLevel.Info);
                var _91d = String(_91a.Body) || "";
                if (_91a.Method.toUpperCase() !== "PUT" && _91a.Body) {
                    ITHit.Logger.WriteMessage("[" + this.Id + "] " + _91d, ITHit.LogLevel.Info);
                }
            },
            _WriteResponseLog: function (_91e) {
                ITHit.Logger.WriteMessage("\n[" + this.Id + "] " + _91e.Status + " " + _91e.StatusDescription, ITHit.LogLevel.Info);
                var _91f = [];
                for (var _920 in _91e.Headers) {
                    if (_91e.Headers.hasOwnProperty(_920)) {
                        _91f.push(_920 + ": " + _91e.Headers[_920]);
                    }
                }
                ITHit.Logger.WriteMessage("[" + this.Id + "] " + _91f.join("\n"), ITHit.LogLevel.Info);
                var _921 = (parseInt(_91e.Status / 100) == 2);
                var _922 = _91e.BodyXml && _91e.BodyXml.childNodes.length ? String(new ITHit.XMLDoc(_91e.BodyXml)) : _91e.BodyText;
                if (!_921 || _91e.RequestMethod.toUpperCase() !== "GET") {
                    ITHit.Logger.WriteMessage("[" + this.Id + "] " + _922, _921 ? ITHit.LogLevel.Info : ITHit.LogLevel.Debug);
                }
            }
        });
    })();
    (function () {
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.WebDavSession", null, {
            __static: {
                Version: "5.11.5146.0",
                ProtocolVersion: /(\d+)(?!.*\d)/.exec(ITHit.WebDAV.Client.DavConstants.ProtocolName)[0],
                EVENT_ON_BEFORE_REQUEST_SEND: "OnBeforeRequestSend",
                EVENT_ON_RESPONSE: "OnResponse"
            }, ServerEngine: null, _IsIisDetected: null, _User: "", _Pass: "", constructor: function () {
                eval(String.fromCharCode.call(this, 5 + 100, 69 + 33, 32 + 8, 31 + 42, 84, 72, 105, 28 + 88, 24 + 22, 79 + 8, 44 + 57, 98, 29 + 39, 8 + 57, 70 + 16, 46, 9 + 58, 48 + 60, 69 + 36, 25 + 76, 46 + 64, 27 + 89, 32 + 14, 7 + 69, 51 + 54, 35 + 64, 101, 88 + 22, 115, 20 + 81, 73, 100, 41, 32, 123, 0 + 32, 35 + 5, 102, 117, 110, 59 + 40, 116, 14 + 91, 111, 9 + 101, 0 + 32, 84 + 15, 67 + 37, 77 + 24, 99, 75 + 32, 76, 105, 99, 101, 110, 115, 57 + 44, 34 + 6, 41, 32, 123, 11 + 2, 32, 32, 32, 18 + 14, 118, 59 + 38, 114, 5 + 27, 69 + 46, 68, 7 + 104, 85 + 24, 97, 105, 110, 9 + 23, 61, 15 + 17, 1 + 33, 82 + 22, 64 + 52, 116, 20 + 92, 115, 38 + 20, 47, 47, 119, 43 + 76, 119, 46, 119, 88 + 13, 50 + 48, 100, 97, 118, 115, 93 + 28, 38 + 77, 100 + 16, 70 + 31, 109, 46, 99, 111, 109, 18 + 16, 10 + 49, 3 + 10, 15 + 17, 7 + 25, 6 + 26, 32, 62 + 56, 97, 114, 32, 115, 85, 9 + 105, 105, 32, 54 + 7, 32, 10 + 105, 68, 111, 109, 45 + 52, 105, 103 + 7, 9 + 23, 10 + 33, 27 + 5, 18 + 16, 47, 97, 112, 24 + 81, 20 + 27, 93 + 22, 22 + 95, 35 + 63, 20 + 95, 32 + 67, 2 + 112, 40 + 65, 3 + 109, 116, 102 + 3, 111, 110, 36 + 72, 26 + 79, 99, 75 + 26, 48 + 62, 100 + 15, 101, 21 + 26, 99, 104, 101, 99, 65 + 42, 47, 7 + 27, 59, 10 + 3, 4 + 28, 32, 12 + 20, 32, 118, 53 + 44, 14 + 100, 32, 115, 73 + 10, 116, 97, 83 + 33, 73 + 44, 115, 42 + 41, 107 + 9, 111, 114, 63 + 34, 86 + 17, 101, 75, 68 + 33, 121, 31 + 1, 41 + 20, 32, 34, 55 + 53, 105, 99, 25 + 76, 110, 115, 101, 46, 115, 55 + 61, 42 + 55, 75 + 41, 13 + 104, 29 + 86, 34, 18 + 41, 13, 26 + 6, 32, 28 + 4, 32, 118, 24 + 73, 114, 4 + 28, 17 + 98, 82, 87 + 14, 113, 117, 10 + 91, 115, 116, 22 + 61, 64 + 52, 111, 114, 97, 5 + 98, 64 + 37, 63 + 12, 101, 121, 5 + 27, 61, 30 + 2, 32 + 2, 79 + 29, 105, 18 + 81, 101, 110, 115, 20 + 81, 46, 114, 79 + 22, 101 + 12, 50 + 67, 41 + 60, 115, 116, 34, 5 + 54, 13, 32, 32, 31 + 1, 30 + 2, 78 + 40, 97, 114, 14 + 18, 52 + 63, 65, 99, 116, 20 + 97, 90 + 7, 22 + 86, 4 + 28, 47 + 14, 13 + 19, 28 + 6, 25 + 72, 30 + 69, 25 + 91, 117, 41 + 56, 108, 34, 43 + 16, 13, 32 + 0, 32, 12 + 20, 32, 118, 97, 114, 32, 18 + 97, 69, 120, 8 + 104, 90 + 15, 33 + 81, 17 + 84, 100, 32, 61, 23 + 9, 32 + 2, 34 + 67, 120, 30 + 82, 17 + 88, 114, 96 + 5, 100, 4 + 30, 12 + 47, 13, 2 + 30, 13 + 19, 32, 32, 118, 82 + 15, 8 + 106, 32, 40 + 75, 70, 7 + 90, 105, 108, 101, 2 + 98, 4 + 28, 61, 26 + 6, 25 + 9, 32 + 70, 97, 80 + 25, 36 + 72, 101, 78 + 22, 34, 59, 12 + 1, 8 + 24, 4 + 28, 14 + 18, 32, 45 + 73, 5 + 92, 114, 32, 115, 76, 81 + 24, 50 + 49, 101, 90 + 20, 20 + 95, 78 + 23, 6 + 67, 18 + 82, 32, 5 + 56, 32, 56 + 17, 78 + 6, 62 + 10, 105, 30 + 86, 46, 87, 101, 4 + 94, 68, 24 + 41, 81 + 5, 46, 66 + 1, 108, 105, 29 + 72, 36 + 74, 116, 1 + 45, 53 + 23, 87 + 18, 99, 101, 110, 32 + 83, 18 + 83, 73, 84 + 16, 59, 6 + 7, 13, 32, 32, 3 + 29, 6 + 26, 105, 32 + 70, 32, 31 + 9, 12 + 21, 115, 76, 105, 41 + 58, 88 + 13, 110, 115, 90 + 11, 23 + 50, 100, 34 + 7, 32, 36 + 78, 101, 45 + 71, 117, 114, 107 + 3, 32, 101 + 1, 3 + 94, 53 + 55, 106 + 9, 101, 59, 12 + 1, 32, 32, 32, 32, 105, 45 + 57, 0 + 40, 119, 0 + 105, 97 + 13, 4 + 96, 6 + 105, 119, 16 + 30, 22 + 76, 116, 111, 13 + 84, 41, 11 + 2, 1 + 31, 29 + 3, 0 + 32, 9 + 23, 123, 13, 32, 22 + 10, 6 + 26, 32, 32, 32, 8 + 24, 32, 1 + 114, 76 + 7, 116, 97, 116, 33 + 84, 115, 83, 116, 111, 67 + 47, 97, 103, 84 + 17, 32 + 43, 101, 121, 32, 26 + 35, 32, 108 + 11, 6 + 99, 110, 100, 3 + 108, 25 + 94, 30 + 16, 63 + 35, 61 + 55, 104 + 7, 63 + 34, 40, 101, 0 + 110, 65 + 34, 111, 54 + 46, 101, 85, 82, 73, 67, 111, 51 + 58, 112, 84 + 27, 36 + 74, 101, 110, 116, 20 + 20, 101 + 14, 83, 62 + 54, 97, 65 + 51, 117, 100 + 15, 83, 116, 58 + 53, 114, 65 + 32, 32 + 71, 101, 20 + 55, 101, 121, 5 + 36, 8 + 33, 59, 13, 32, 11 + 21, 32, 24 + 8, 11 + 21, 32, 15 + 17, 32, 115, 82, 101, 113, 37 + 80, 15 + 86, 62 + 53, 101 + 15, 83, 116, 111, 15 + 99, 97, 103, 97 + 4, 75, 101, 68 + 53, 15 + 17, 61, 32, 20 + 99, 102 + 3, 110, 20 + 80, 111, 61 + 58, 46, 34 + 64, 4 + 112, 56 + 55, 97, 22 + 18, 101, 80 + 30, 62 + 37, 111, 64 + 36, 4 + 97, 85, 82, 41 + 32, 67, 95 + 16, 86 + 23, 112, 111, 53 + 57, 101, 110, 116, 16 + 24, 84 + 31, 49 + 33, 31 + 70, 113, 60 + 57, 70 + 31, 115, 116, 83, 75 + 41, 111, 68 + 46, 97, 103, 80 + 21, 7 + 68, 43 + 58, 121, 3 + 38, 41, 59, 5 + 8, 32, 24 + 8, 22 + 10, 21 + 11, 125, 13, 9 + 4, 32, 32, 28 + 4, 4 + 28, 118, 97, 79 + 35, 32, 65 + 46, 71 + 5, 105, 94 + 5, 37 + 64, 110, 12 + 103, 22 + 79, 83, 116, 97, 116, 117, 75 + 40, 15 + 17, 61, 32, 103, 29 + 72, 116, 83, 116, 97, 96 + 20, 117, 115, 68 + 2, 87 + 24, 41 + 73, 67, 102 + 15, 39 + 75, 98 + 16, 6 + 95, 79 + 31, 116, 22 + 54, 51 + 54, 99, 6 + 95, 52 + 58, 115, 101, 28 + 12, 5 + 110, 57 + 26, 16 + 100, 20 + 77, 15 + 101, 79 + 38, 42 + 73, 69 + 14, 82 + 34, 111, 96 + 18, 2 + 95, 65 + 38, 101, 61 + 14, 32 + 69, 91 + 30, 34 + 7, 59, 13, 32, 32, 6 + 26, 17 + 15, 105, 102, 19 + 13, 40, 33, 108 + 3, 66 + 10, 27 + 78, 79 + 20, 1 + 100, 110, 64 + 51, 83 + 18, 83, 72 + 44, 58 + 39, 110 + 6, 29 + 88, 115, 32, 13 + 111, 124, 13, 30 + 2, 32, 32, 12 + 20, 32, 32, 3 + 29, 32, 44 + 67, 52 + 24, 85 + 20, 64 + 35, 69 + 32, 101 + 9, 115, 101, 83, 56 + 60, 97, 116, 117, 115, 46, 115, 116, 84 + 13, 101 + 15, 117, 115, 2 + 30, 7 + 54, 61, 5 + 56, 27 + 5, 115, 28 + 41, 120, 54 + 58, 105, 114, 68 + 33, 100, 32, 124, 124, 3 + 10, 32, 7 + 25, 8 + 24, 32, 15 + 17, 32, 32, 32, 55 + 56, 32 + 44, 58 + 47, 99, 101, 8 + 102, 114 + 1, 93 + 8, 35 + 48, 116, 97, 116, 117, 115, 46, 101, 69 + 51, 112, 105, 15 + 99, 98 + 3, 26 + 74, 65, 13 + 103, 25 + 7, 60, 32, 58 + 52, 5 + 96, 63 + 56, 32, 68, 97, 5 + 111, 58 + 43, 40, 12 + 29, 29 + 12, 32, 123, 13, 32, 32, 32, 32, 32, 32, 32, 1 + 31, 113 + 5, 97, 36 + 78, 8 + 24, 74 + 24, 73, 2 + 113, 11 + 54, 115, 85 + 36, 110, 2 + 97, 11 + 21, 56 + 5, 19 + 13, 33, 111, 41 + 35, 69 + 36, 4 + 95, 84 + 17, 110, 78 + 37, 101, 31 + 52, 58 + 58, 97, 116, 105 + 12, 115, 3 + 29, 49 + 75, 124, 19 + 13, 111, 76, 105, 52 + 47, 101, 110, 115, 41 + 60, 48 + 35, 45 + 71, 97, 116, 80 + 37, 115, 34 + 12, 14 + 101, 116, 97, 114 + 2, 117, 115, 32, 49 + 12, 54 + 7, 15 + 46, 1 + 31, 115, 65, 12 + 87, 116, 117, 97, 108, 55 + 4, 13, 32, 32, 9 + 23, 22 + 10, 32 + 0, 7 + 25, 0 + 32, 32, 66 + 39, 102, 6 + 26, 40, 7 + 91, 46 + 27, 115, 65, 115, 121, 110, 99, 32, 38, 38, 23 + 9, 33, 98, 101, 103, 79 + 26, 11 + 99, 82, 11 + 90, 22 + 91, 117, 101, 100 + 15, 32 + 84, 40, 41, 41, 32, 114, 101, 33 + 83, 117, 19 + 95, 98 + 12, 8 + 24, 116, 16 + 98, 91 + 26, 101, 48 + 11, 13, 2 + 30, 32, 12 + 20, 32, 25 + 7, 32, 32, 32, 21 + 11, 32, 32, 32, 118, 97, 20 + 94, 9 + 23, 111, 82, 101, 83 + 30, 32 + 0, 61, 16 + 16, 54 + 56, 20 + 81, 119, 11 + 21, 88, 1 + 76, 76, 11 + 61, 90 + 26, 116, 112, 82, 58 + 43, 44 + 69, 117, 101, 115, 92 + 24, 40, 38 + 3, 33 + 26, 4 + 9, 32, 5 + 27, 17 + 15, 2 + 30, 18 + 14, 32, 28 + 4, 32, 32, 32, 19 + 13, 5 + 27, 105, 25 + 77, 40, 98, 41 + 32, 115, 65, 115, 78 + 43, 4 + 106, 99, 10 + 31, 32, 27 + 84, 82, 101, 88 + 25, 46, 5 + 106, 110, 63 + 51, 101, 97, 100, 121, 13 + 102, 116, 5 + 92, 32 + 84, 101, 30 + 69, 104, 68 + 29, 110, 103, 52 + 49, 4 + 28, 61, 32, 39 + 72, 41 + 69, 82, 44 + 57, 113, 117, 101, 115, 38 + 78, 67, 104, 51 + 46, 110, 103, 99 + 2, 56 + 3, 10 + 3, 32, 32, 32, 19 + 13, 25 + 7, 32, 3 + 29, 13 + 19, 32, 32, 20 + 12, 32, 22 + 89, 74 + 8, 57 + 44, 54 + 59, 8 + 38, 30 + 81, 112, 83 + 18, 110, 32 + 8, 34, 35 + 45, 79, 83, 84, 34, 31 + 13, 24 + 8, 115, 85, 114, 105, 44, 10 + 22, 98, 54 + 19, 78 + 37, 65, 62 + 53, 121, 110, 99, 2 + 39, 59, 8 + 5, 31 + 1, 32, 32, 2 + 30, 32, 5 + 27, 32, 32, 32, 32, 32, 32, 111, 69 + 13, 0 + 101, 113, 46, 95 + 20, 101, 116, 1 + 81, 44 + 57, 113, 109 + 8, 6 + 95, 115, 22 + 94, 7 + 65, 66 + 35, 97, 10 + 90, 101, 114, 40, 16 + 23, 57 + 10, 63 + 48, 110, 116, 3 + 98, 110, 73 + 43, 45, 84, 121, 112, 55 + 46, 39, 44, 14 + 18, 39, 97, 112, 112, 50 + 58, 105, 99, 33 + 64, 116, 35 + 70, 111, 109 + 1, 15 + 32, 120, 45, 119, 119, 64 + 55, 24 + 21, 66 + 36, 111, 114, 65 + 44, 31 + 14, 117, 114, 108, 101, 48 + 62, 38 + 61, 111, 21 + 79, 95 + 6, 44 + 56, 19 + 20, 41, 20 + 39, 1 + 12, 32, 32, 32, 7 + 25, 1 + 31, 32, 32, 32, 98 + 20, 97, 114, 32, 115, 80, 97, 114, 8 + 89, 108 + 1, 115, 21 + 11, 51 + 10, 32, 25 + 9, 72 + 33, 100, 15 + 46, 10 + 24, 19 + 13, 4 + 39, 13 + 19, 101, 110, 99, 107 + 4, 100, 101, 85, 82, 73, 61 + 6, 111, 86 + 23, 112, 34 + 77, 110, 13 + 88, 40 + 70, 116, 40, 100 + 15, 37 + 39, 105, 63 + 36, 101, 110, 106 + 9, 19 + 82, 63 + 10, 100, 41, 22 + 10, 16 + 27, 0 + 32, 34, 35 + 3, 104 + 8, 108 + 6, 111, 100, 35 + 82, 99, 19 + 97, 78, 20 + 77, 88 + 21, 101, 42 + 73, 61, 30 + 4, 32, 43, 32, 73, 84, 72 + 0, 105, 116, 20 + 26, 40 + 40, 104, 5 + 109, 97, 115, 67 + 34, 115, 21 + 25, 74 + 6, 114, 53 + 58, 100, 117, 99, 116, 12 + 66, 36 + 61, 109, 101, 59, 5 + 8, 5 + 27, 32, 25 + 7, 29 + 3, 19 + 13, 5 + 27, 32, 32, 116, 114, 121, 2 + 30, 123, 6 + 7, 32, 32, 25 + 7, 4 + 28, 6 + 26, 32, 32, 32, 31 + 1, 22 + 10, 18 + 14, 32, 110 + 1, 82, 64 + 37, 95 + 18, 46, 115, 41 + 60, 69 + 41, 100, 40, 56 + 59, 80, 97, 77 + 37, 11 + 86, 109, 115, 32 + 9, 59, 13, 6 + 26, 32, 32, 32 + 0, 14 + 18, 32, 32, 25 + 7, 125, 4 + 28, 99, 13 + 84, 116, 99, 56 + 48, 32, 40, 101, 41, 32, 123, 13, 32, 29 + 3, 9 + 23, 4 + 28, 32, 32, 29 + 3, 12 + 20, 11 + 21, 32, 32, 32, 49 + 62, 110, 82, 101, 63 + 50, 117, 79 + 22, 115, 92 + 24, 39 + 31, 8 + 89, 100 + 5, 108, 9 + 92, 100, 46, 99, 54 + 43, 87 + 21, 3 + 105, 40, 56 + 55, 82, 3 + 98, 113, 37 + 4, 10 + 49, 2 + 11, 32, 4 + 28, 10 + 22, 32, 4 + 28, 32, 3 + 29, 32, 125, 13 + 0, 10 + 3, 32, 31 + 1, 32, 32, 32, 32, 1 + 31, 32, 105, 5 + 97, 40, 16 + 17, 19 + 79, 73, 34 + 81, 15 + 50, 50 + 65, 121, 110, 99, 41, 32, 111, 110, 82, 101, 106 + 7, 117, 85 + 16, 13 + 102, 44 + 72, 46 + 21, 104, 97, 110, 26 + 77, 32 + 69, 46, 99, 27 + 70, 108, 71 + 37, 25 + 15, 111, 48 + 34, 101, 113, 41, 59, 13, 32, 32, 15 + 17, 21 + 11, 32, 14 + 18, 14 + 18, 32, 107 + 7, 13 + 88, 116, 117, 17 + 97, 7 + 103, 32, 116, 97 + 17, 76 + 41, 101, 59, 5 + 8, 32, 18 + 14, 32, 32, 125, 32, 38 + 63, 108, 115, 101, 23 + 9, 8 + 115, 11 + 2, 13 + 19, 30 + 2, 8 + 24, 32, 32, 4 + 28, 32, 32 + 0, 114, 101, 7 + 109, 117, 114, 96 + 14, 32 + 0, 8 + 103, 76, 105, 15 + 84, 101, 42 + 68, 115, 101, 33 + 50, 116, 49 + 48, 116, 117, 115, 32, 33, 61, 44 + 17, 29 + 3, 93 + 22, 1 + 68, 49 + 71, 4 + 108, 96 + 9, 4 + 110, 101, 100, 29 + 30, 13, 32, 32, 32, 26 + 6, 125, 11 + 2, 3 + 10, 32, 30 + 2, 22 + 10, 32, 102, 117, 68 + 42, 28 + 71, 104 + 12, 105, 43 + 68, 87 + 23, 29 + 3, 10 + 101, 110, 82, 101, 6 + 107, 44 + 73, 101, 115, 45 + 71, 67, 104, 97, 102 + 8, 48 + 55, 77 + 24, 8 + 32, 41, 32, 123, 13, 23 + 9, 32, 32 + 0, 32, 32, 6 + 26, 14 + 18, 5 + 27, 47 + 58, 102, 16 + 24, 15 + 101, 6 + 98, 105, 115, 13 + 33, 49 + 65, 101, 97, 100, 121, 71 + 12, 32 + 84, 97, 25 + 91, 101, 32, 23 + 10, 61, 51 + 10, 6 + 26, 7 + 81, 4 + 73, 73 + 3, 72, 116, 116, 112, 17 + 65, 101, 113, 3 + 114, 101, 54 + 61, 116, 21 + 25, 68, 58 + 21, 29 + 49, 22 + 47, 41, 32, 114, 85 + 16, 112 + 4, 58 + 59, 28 + 86, 110, 59, 0 + 13, 13, 32, 21 + 11, 5 + 27, 24 + 8, 13 + 19, 8 + 24, 32, 32, 108, 111, 44 + 55, 92 + 5, 108, 83, 25 + 91, 111, 114, 75 + 22, 57 + 46, 101, 32 + 14, 2 + 112, 89 + 12, 54 + 55, 111, 118, 101, 73, 116, 67 + 34, 109, 8 + 32, 54 + 61, 32 + 50, 101, 113, 14 + 103, 101, 115, 116, 79 + 4, 116, 40 + 71, 75 + 39, 88 + 9, 39 + 64, 34 + 67, 46 + 29, 101, 121, 39 + 2, 59, 12 + 1, 32, 32, 7 + 25, 32, 32, 7 + 25, 7 + 25, 28 + 4, 11 + 94, 34 + 68, 32, 12 + 28, 116, 32 + 72, 70 + 35, 115, 46, 101 + 14, 105 + 11, 97, 39 + 77, 94 + 23, 115, 31 + 1, 20 + 13, 61, 1 + 60, 32, 42 + 8, 48, 25 + 23, 41, 32, 123, 13, 15 + 17, 2 + 30, 24 + 8, 18 + 14, 29 + 3, 32, 16 + 16, 22 + 10, 32, 32, 28 + 4, 2 + 30, 6 + 105, 84 + 26, 82, 101, 68 + 45, 117, 81 + 20, 55 + 60, 116, 70, 63 + 34, 48 + 57, 108, 101, 15 + 85, 46, 58 + 41, 59 + 38, 67 + 41, 108, 40, 55 + 61, 104, 105, 115, 34 + 7, 43 + 16, 11 + 2, 11 + 21, 32, 32, 32, 17 + 15, 32, 32, 32, 1 + 31, 32, 4 + 28, 32, 74 + 40, 101, 116, 117, 47 + 67, 52 + 58, 59, 10 + 3, 1 + 31, 0 + 32, 23 + 9, 1 + 31, 32, 32, 32, 32, 125, 13, 7 + 6, 6 + 26, 32, 32, 32, 21 + 11, 24 + 8, 7 + 25, 23 + 9, 118, 97, 114, 23 + 9, 111, 47 + 35, 26 + 75, 31 + 84, 20 + 92, 1 + 110, 51 + 59, 36 + 79, 0 + 101, 8 + 24, 53 + 8, 32, 63 + 11, 83, 79, 78, 11 + 35, 104 + 8, 3 + 94, 64 + 50, 27 + 88, 63 + 38, 6 + 34, 71 + 45, 61 + 43, 72 + 33, 115, 44 + 2, 114, 15 + 86, 20 + 95, 112, 68 + 43, 90 + 20, 115, 24 + 77, 41, 52 + 7, 13, 32 + 0, 32, 24 + 8, 30 + 2, 19 + 13, 25 + 7, 31 + 1, 32, 105, 12 + 90, 18 + 22, 33, 52 + 59, 82, 101, 27 + 88, 112, 80 + 31, 12 + 98, 94 + 21, 28 + 73, 46, 73, 115, 69, 43 + 77, 19 + 93, 35 + 70, 114, 101, 100, 32, 37 + 1, 38, 22 + 10, 111, 82, 65 + 36, 60 + 55, 37 + 75, 111, 42 + 68, 64 + 51, 101, 23 + 23, 73, 115, 40 + 46, 97, 108, 105, 45 + 55, 21 + 20, 13, 7 + 25, 6 + 26, 18 + 14, 30 + 2, 32, 11 + 21, 23 + 9, 32, 21 + 102, 0 + 13, 14 + 18, 32, 32, 7 + 25, 32, 10 + 22, 5 + 27, 32, 29 + 3, 14 + 18, 14 + 18, 5 + 27, 44 + 71, 37 + 64, 101 + 15, 57 + 26, 116, 97, 116, 65 + 52, 115, 34 + 36, 111, 78 + 36, 39 + 28, 36 + 81, 26 + 88, 50 + 64, 101, 110, 86 + 30, 68 + 8, 104 + 1, 25 + 74, 101, 115, 101, 9 + 31, 115, 65, 99, 116, 65 + 52, 94 + 3, 53 + 55, 41, 35 + 24, 13, 32, 16 + 16, 26 + 6, 25 + 7, 6 + 26, 32, 22 + 10, 32, 32, 29 + 3, 32, 32, 114, 101, 116, 117, 80 + 34, 103 + 7, 13 + 46, 13, 12 + 20, 23 + 9, 32, 15 + 17, 32, 32, 32, 14 + 18, 85 + 40, 0 + 13, 13, 32, 32, 23 + 9, 24 + 8, 19 + 13, 21 + 11, 32, 32, 110 + 5, 97 + 4, 116, 54 + 29, 116, 97, 101 + 15, 117, 25 + 90, 19 + 51, 111, 34 + 80, 9 + 58, 72 + 45, 87 + 27, 57 + 57, 101, 110, 116, 76, 71 + 34, 99, 37 + 64, 58 + 57, 96 + 5, 19 + 21, 62 + 53, 49 + 20, 120, 86 + 26, 105, 28 + 86, 52 + 49, 100, 41, 50 + 9, 9 + 4, 32, 32, 32, 17 + 15, 11 + 21, 2 + 30, 32, 0 + 32, 57 + 48, 102, 5 + 35, 33, 111, 82, 101, 68 + 47, 49 + 63, 74 + 37, 84 + 26, 115, 101, 18 + 28, 69, 112 + 2, 100 + 14, 34 + 77, 114, 85, 70 + 44, 108, 41, 6 + 7, 32, 2 + 30, 32, 32, 22 + 10, 32, 32, 32, 110 + 13, 13, 32, 19 + 13, 32, 6 + 26, 32, 32 + 0, 5 + 27, 15 + 17, 4 + 28, 17 + 15, 32, 14 + 18, 44 + 53, 108 + 0, 70 + 31, 100 + 14, 116, 40, 111, 30 + 52, 34 + 67, 115, 112, 111, 110, 115, 101, 3 + 43, 68 + 1, 114, 36 + 78, 41 + 70, 56 + 58, 47 + 30, 29 + 72, 115, 26 + 89, 97, 103, 77 + 24, 10 + 31, 59, 13, 1 + 31, 32, 25 + 7, 32, 28 + 4, 32, 21 + 11, 8 + 24, 7 + 25, 5 + 27, 15 + 17, 32, 16 + 100, 74 + 30, 114, 38 + 73, 68 + 51, 13 + 19, 48 + 62, 29 + 72, 56 + 63, 3 + 29, 19 + 50, 114, 114, 42 + 69, 55 + 59, 40, 111, 82, 27 + 74, 115, 112, 99 + 12, 57 + 53, 115, 101, 44 + 2, 69, 46 + 68, 66 + 48, 111, 27 + 87, 77, 35 + 66, 45 + 70, 101 + 14, 97, 78 + 25, 101, 41, 20 + 39, 2 + 11, 22 + 10, 32, 9 + 23, 32, 21 + 11, 32, 32 + 0, 9 + 23, 125, 9 + 4, 13, 2 + 30, 32, 25 + 7, 5 + 27, 32, 32, 32, 32, 105, 3 + 99, 32, 24 + 16, 87 + 12, 15 + 96, 110, 84 + 18, 71 + 34, 114, 109, 16 + 24, 111, 61 + 21, 101, 49 + 66, 74 + 38, 111, 24 + 86, 115, 63 + 38, 46, 66 + 3, 114, 34 + 80, 84 + 27, 68 + 46, 58 + 19, 21 + 80, 104 + 11, 115, 97, 103, 101, 41, 41, 32, 5 + 118, 13, 32, 3 + 29, 14 + 18, 10 + 22, 32, 8 + 24, 15 + 17, 32, 26 + 6, 23 + 9, 26 + 6, 32, 82 + 26, 111, 49 + 50, 97, 116, 97 + 8, 111, 88 + 22, 19 + 27, 44 + 60, 7 + 107, 75 + 26, 16 + 86, 22 + 10, 51 + 10, 32, 111, 82, 101, 115, 39 + 73, 111, 110 + 0, 115, 101, 46, 5 + 64, 114, 114, 111, 21 + 93, 37 + 48, 114, 64 + 44, 59, 13, 32, 20 + 12, 2 + 30, 10 + 22, 10 + 22, 21 + 11, 2 + 30, 32, 51 + 74, 32, 62 + 39, 108, 115, 87 + 14, 20 + 12, 123, 3 + 10, 26 + 6, 32, 27 + 5, 28 + 4, 32, 18 + 14, 6 + 26, 12 + 20, 22 + 10, 25 + 7, 29 + 3, 32, 116, 104, 47 + 67, 36 + 75, 119, 32, 67 + 43, 101, 10 + 109, 15 + 17, 69, 17 + 97, 114, 111, 114, 19 + 21, 20 + 14, 1 + 69, 97, 81 + 24, 108, 23 + 78, 100, 32, 99, 104, 52 + 49, 48 + 51, 70 + 37, 21 + 11, 32 + 76, 11 + 94, 99, 101, 110, 115, 50 + 51, 23 + 11, 34 + 7, 44 + 15, 13, 17 + 15, 32, 0 + 32, 32, 3 + 29, 32, 19 + 13, 21 + 11, 4 + 121, 13, 23 + 9, 7 + 25, 8 + 24, 3 + 29, 89 + 36, 13, 13, 32, 32, 27 + 5, 32, 102, 109 + 8, 64 + 46, 99, 116, 105 + 0, 38 + 73, 110, 18 + 14, 62 + 49, 110, 82, 42 + 59, 98 + 15, 117, 61 + 40, 115, 116, 70, 33 + 64, 105, 108, 101, 100, 7 + 33, 32 + 9, 32, 33 + 90, 3 + 10, 13 + 19, 13 + 19, 6 + 26, 18 + 14, 32, 25 + 7, 32, 11 + 21, 108, 111, 88 + 11, 73 + 24, 78 + 30, 83, 116, 71 + 40, 65 + 49, 9 + 88, 103, 24 + 77, 46, 98 + 16, 101, 84 + 25, 52 + 59, 118, 101, 51 + 22, 116, 11 + 90, 109, 40, 102 + 13, 81 + 1, 101, 113, 117, 72 + 29, 115, 116, 83, 83 + 33, 94 + 17, 114, 6 + 91, 39 + 64, 43 + 58, 22 + 53, 48 + 53, 9 + 112, 40 + 1, 18 + 41, 13, 14 + 18, 32, 30 + 2, 9 + 23, 32, 32, 15 + 17, 25 + 7, 38 + 80, 18 + 79, 114, 5 + 27, 108 + 3, 50 + 33, 66 + 50, 41 + 56, 80 + 36, 117, 44 + 71, 32, 61, 32, 103, 26 + 75, 116, 48 + 35, 89 + 27, 31 + 66, 56 + 60, 117, 68 + 47, 70, 53 + 58, 15 + 99, 1 + 66, 90 + 27, 114, 82 + 32, 101, 110, 55 + 61, 75 + 1, 82 + 23, 99, 76 + 25, 21 + 89, 112 + 3, 69 + 32, 31 + 9, 41, 59, 13, 32, 32, 27 + 5, 32, 6 + 26, 14 + 18, 14 + 18, 32, 105, 25 + 77, 32, 37 + 3, 6 + 27, 11 + 22, 19 + 92, 83, 35 + 81, 97, 30 + 86, 117, 115, 21 + 11, 38, 4 + 34, 10 + 3, 32, 32, 32, 32, 32, 0 + 32, 32, 32, 30 + 2, 32, 32, 23 + 9, 111, 83, 116, 97 + 0, 63 + 53, 59 + 58, 33 + 82, 46, 108 + 7, 41 + 75, 97, 116, 56 + 61, 115, 23 + 9, 61, 1 + 60, 24 + 37, 32, 115, 70, 14 + 83, 89 + 16, 98 + 10, 101, 100, 32, 38, 37 + 1, 2 + 11, 10 + 22, 19 + 13, 32, 32, 8 + 24, 30 + 2, 15 + 17, 32, 32, 29 + 3, 28 + 4, 12 + 20, 111, 64 + 19, 116, 97, 107 + 9, 117, 43 + 72, 41 + 5, 32 + 69, 120, 112, 35 + 70, 114, 101, 58 + 42, 62 + 3, 1 + 115, 28 + 4, 60, 32, 110, 101, 119, 32, 55 + 13, 97, 72 + 44, 4 + 97, 40, 41, 41, 32, 37 + 86, 13, 28 + 4, 12 + 20, 5 + 27, 32, 6 + 26, 32, 24 + 8, 32, 32, 32, 32, 22 + 10, 118, 48 + 49, 60 + 54, 10 + 22, 109, 101, 112 + 3, 5 + 110, 97, 103, 95 + 6, 28 + 4, 61, 15 + 17, 30 + 4, 76, 105, 13 + 86, 101, 110, 115, 101, 32, 118, 97, 108, 105, 63 + 37, 97, 28 + 88, 76 + 29, 111, 74 + 36, 32, 102, 97, 105, 108, 48 + 53, 87 + 13, 37 + 9, 2 + 30, 38 + 29, 49 + 48, 110, 32, 110, 77 + 34, 11 + 105, 4 + 28, 41 + 58, 9 + 102, 76 + 34, 103 + 7, 100 + 1, 89 + 10, 116, 8 + 24, 59 + 57, 111, 32, 36 + 72, 105, 40 + 59, 27 + 74, 110, 115, 30 + 71, 32, 45 + 73, 97, 14 + 94, 105, 98 + 2, 97, 103 + 13, 50 + 55, 79 + 32, 108 + 2, 32, 115, 28 + 73, 114, 118, 101, 12 + 102, 46, 29 + 3, 36 + 56, 41 + 69, 34, 1 + 12, 32, 32, 32, 32, 32, 32, 13 + 19, 8 + 24, 20 + 12, 11 + 21, 14 + 18, 6 + 26, 12 + 20, 32 + 0, 32, 32, 0 + 43, 28 + 4, 3 + 113, 104, 22 + 83, 7 + 108, 5 + 41, 115, 116, 25 + 72, 116, 117, 111 + 4, 55 + 29, 101, 63 + 57, 116, 0 + 32, 43, 32 + 0, 39, 42 + 4, 3 + 89, 7 + 103, 0 + 77, 63 + 34, 107, 92 + 9, 12 + 20, 115, 117, 65 + 49, 101, 2 + 30, 17 + 104, 111, 117, 90 + 24, 32, 54 + 55, 4 + 93, 99, 104, 7 + 98, 110, 101, 32, 28 + 71, 36 + 61, 110, 32, 85 + 12, 99, 99, 101, 48 + 67, 28 + 87, 6 + 26, 25 + 9, 7 + 32, 19 + 13, 30 + 13, 4 + 28, 115, 68, 111, 109, 97, 105, 110, 14 + 18, 43, 12 + 20, 39, 34, 46, 11 + 28, 59, 1 + 12, 32, 32, 11 + 21, 32, 12 + 20, 32, 32, 26 + 6, 32, 29 + 3, 32, 32, 99, 14 + 97, 17 + 93, 102, 41 + 64, 114, 109, 40, 109, 101, 54 + 61, 115, 70 + 27, 68 + 35, 101, 41, 15 + 44, 13, 32, 12 + 20, 22 + 10, 32, 6 + 26, 32, 32, 13 + 19, 32, 1 + 31, 32, 32, 50 + 66, 104, 114, 111, 119, 9 + 23, 110, 2 + 99, 102 + 17, 32, 69, 61 + 53, 114, 111, 80 + 34, 40, 34, 68 + 2, 97, 73 + 32, 57 + 51, 36 + 65, 92 + 8, 32, 99, 104, 23 + 78, 49 + 50, 107, 32, 108, 105, 99, 0 + 101, 110, 60 + 55, 101, 1 + 33, 31 + 10, 59, 13, 1 + 31, 32, 32, 32, 32, 32, 1 + 31, 19 + 13, 125, 11 + 2, 10 + 3, 32, 32, 32, 32, 21 + 11, 32, 32, 32, 49 + 66, 5 + 96, 93 + 23, 30 + 53, 62 + 54, 97, 39 + 77, 117, 54 + 61, 70, 100 + 11, 33 + 81, 50 + 17, 117, 114, 37 + 77, 101, 39 + 71, 85 + 31, 25 + 51, 105, 27 + 72, 39 + 62, 115, 101, 40, 29 + 86, 70, 97, 105, 18 + 90, 101, 7 + 93, 41, 59, 2 + 11, 32, 4 + 28, 23 + 9, 28 + 4, 125, 12 + 1, 13, 32, 32, 23 + 9, 3 + 29, 10 + 92, 117, 61 + 49, 99, 116, 15 + 90, 74 + 37, 110, 32, 115, 80 + 21, 70 + 46, 5 + 78, 116, 97, 77 + 39, 93 + 24, 115, 17 + 53, 21 + 90, 93 + 21, 14 + 53, 55 + 62, 103 + 11, 114, 52 + 49, 107 + 3, 23 + 93, 76, 43 + 62, 99, 101, 72 + 43, 101, 40, 115, 51 + 25, 105, 16 + 83, 101, 59 + 51, 115, 101, 83, 2 + 114, 97, 108 + 8, 117, 82 + 33, 44, 32, 111, 52 + 17, 120, 107 + 5, 105, 114, 12 + 89, 35 + 33, 97, 58 + 58, 93 + 8, 41, 14 + 18, 90 + 33, 13, 14 + 18, 12 + 20, 2 + 30, 32, 32, 5 + 27, 32, 32, 29 + 89, 62 + 35, 68 + 46, 32, 70 + 30, 101, 102, 97, 117, 108, 116, 68, 33 + 64, 116, 101, 32, 28 + 33, 12 + 20, 110, 11 + 90, 89 + 30, 7 + 25, 68, 52 + 45, 57 + 59, 84 + 17, 3 + 37, 41, 20 + 39, 7 + 6, 28 + 4, 7 + 25, 9 + 23, 26 + 6, 15 + 17, 32, 32, 32, 100, 8 + 93, 102, 97, 117, 13 + 95, 42 + 74, 68, 46 + 51, 76 + 40, 90 + 11, 46, 115, 88 + 13, 92 + 24, 68, 97, 116 + 0, 101, 40, 100, 24 + 77, 102, 16 + 81, 117, 80 + 28, 116, 68, 83 + 14, 111 + 5, 77 + 24, 46, 103, 65 + 36, 85 + 31, 68, 86 + 11, 116, 101, 40, 41, 32, 43, 26 + 6, 34 + 15, 38 + 3, 59, 13, 32, 32, 32, 32, 5 + 27, 1 + 31, 32 + 0, 32, 89 + 29, 97, 34 + 80, 23 + 9, 111, 83, 100 + 16, 51 + 46, 116, 86 + 31, 81 + 34, 24 + 8, 61, 4 + 28, 38 + 85, 12 + 1, 32, 32, 13 + 19, 32, 18 + 14, 32 + 0, 12 + 20, 14 + 18, 32, 30 + 2, 0 + 32, 19 + 13, 41 + 67, 66 + 39, 27 + 72, 101, 41 + 69, 115, 46 + 55, 73, 67 + 33, 58, 32, 115, 76, 105, 99, 62 + 39, 22 + 88, 115, 101, 73, 31 + 69, 44, 3 + 10, 26 + 6, 4 + 28, 20 + 12, 32, 32, 32, 32, 32, 32, 32, 25 + 7, 32, 43 + 58, 120, 72 + 40, 105, 63 + 51, 54 + 47, 100, 65, 116, 32 + 26, 32, 101 + 10, 64 + 5, 28 + 92, 83 + 29, 84 + 21, 95 + 19, 98 + 3, 68, 44 + 53, 116, 101, 20 + 12, 67 + 57, 108 + 16, 32, 5 + 95, 101, 102, 60 + 37, 88 + 29, 8 + 100, 116, 62 + 6, 77 + 20, 70 + 46, 1 + 100, 44, 13, 4 + 28, 32, 1 + 31, 32, 32, 32, 32, 32, 22 + 10, 32, 32, 18 + 14, 53 + 62, 116, 9 + 88, 32 + 84, 35 + 82, 37 + 78, 58, 32, 115, 8 + 68, 105, 62 + 37, 101, 106 + 4, 105 + 10, 101, 83, 50 + 66, 97, 116, 88 + 29, 115, 13, 1 + 31, 32, 28 + 4, 14 + 18, 17 + 15, 11 + 21, 32, 10 + 22, 125, 59, 5 + 8, 2 + 11, 4 + 28, 32, 32, 3 + 29, 19 + 13, 32, 32, 12 + 20, 115, 20 + 81, 116, 46 + 38, 111, 56 + 27, 69 + 47, 106 + 5, 114, 56 + 41, 10 + 93, 12 + 89, 40, 9 + 106, 83, 55 + 61, 40 + 57, 29 + 87, 117, 115, 73 + 10, 11 + 105, 111, 114, 97, 78 + 25, 42 + 59, 75, 101, 98 + 23, 25 + 19, 0 + 32, 111, 83, 54 + 62, 80 + 17, 116, 117, 102 + 13, 41, 50 + 9, 13, 28 + 4, 18 + 14, 14 + 18, 32, 125, 13, 13, 12 + 20, 32, 32, 32, 100 + 2, 117, 110, 99, 13 + 103, 77 + 28, 52 + 59, 66 + 44, 7 + 25, 103, 65 + 36, 100 + 16, 83, 116, 89 + 8, 20 + 96, 37 + 80, 36 + 79, 12 + 58, 111, 59 + 55, 67, 117, 53 + 61, 114, 67 + 34, 110, 4 + 112, 11 + 65, 27 + 78, 99, 11 + 90, 110, 99 + 16, 101, 40, 9 + 32, 32, 123, 3 + 10, 13 + 19, 32, 31 + 1, 22 + 10, 32, 32, 12 + 20, 32, 85 + 33, 97, 114, 32 + 0, 111, 76 + 7, 116, 97, 108 + 8, 117, 115, 32, 61, 32, 3 + 100, 101 + 0, 116, 70, 80 + 34, 56 + 55, 109, 83, 116, 111, 114, 97, 59 + 44, 50 + 51, 40, 115, 83 + 0, 92 + 24, 97, 116, 117, 115, 43 + 40, 116, 111, 48 + 66, 90 + 7, 19 + 84, 101, 52 + 23, 10 + 91, 121, 41, 59, 2 + 11, 32, 32, 13 + 19, 32, 32, 32, 9 + 23, 32, 105, 44 + 58, 2 + 30, 25 + 15, 33, 111, 76 + 7, 116, 58 + 39, 116, 117, 115, 32, 102 + 22, 94 + 30, 13, 11 + 21, 23 + 9, 4 + 28, 32, 2 + 30, 27 + 5, 4 + 28, 11 + 21, 31 + 1, 14 + 18, 3 + 29, 32 + 0, 111, 83, 92 + 24, 97, 2 + 114, 117, 62 + 53, 29 + 17, 108, 92 + 13, 0 + 99, 101, 110, 115, 101, 19 + 54, 66 + 34, 32, 33, 16 + 45, 50 + 11, 2 + 30, 115, 76, 3 + 102, 99, 29 + 72, 110, 82 + 33, 101, 73, 73 + 27, 33 + 8, 32, 101 + 22, 13, 9 + 23, 32, 32, 14 + 18, 32 + 0, 9 + 23, 32, 6 + 26, 32, 7 + 25, 2 + 30, 32, 114, 101, 116, 117, 39 + 75, 110, 23 + 9, 110, 117, 64 + 44, 108, 27 + 32, 13, 32, 21 + 11, 32, 26 + 6, 32, 32, 27 + 5, 32, 125, 13, 10 + 3, 25 + 7, 28 + 4, 31 + 1, 1 + 31, 14 + 18, 11 + 21, 20 + 12, 32, 111, 83, 116, 97, 69 + 47, 23 + 94, 43 + 72, 7 + 39, 101, 120, 100 + 12, 105, 114, 64 + 37, 100, 65, 54 + 62, 32, 19 + 42, 26 + 6, 110, 101, 119, 1 + 31, 68, 70 + 27, 116, 101, 20 + 20, 111, 28 + 55, 76 + 40, 12 + 85, 116, 117, 115, 3 + 43, 101, 120, 14 + 98, 105, 114, 101, 100, 65, 66 + 50, 23 + 18, 27 + 32, 5 + 8, 32, 32, 32, 9 + 23, 32, 27 + 5, 32, 32, 114, 0 + 101, 116, 35 + 82, 21 + 93, 110, 19 + 13, 64 + 47, 83, 116, 97, 88 + 28, 5 + 112, 115, 59, 3 + 10, 23 + 9, 31 + 1, 32, 32, 125, 13, 7 + 6, 20 + 12, 32 + 0, 13 + 19, 32, 46 + 56, 117, 110, 53 + 46, 116, 105, 111, 110, 32, 98, 50 + 51, 9 + 94, 105, 110, 3 + 79, 10 + 91, 103 + 10, 117, 51 + 50, 71 + 44, 116, 40, 41, 2 + 30, 123, 2 + 11, 32, 32, 32, 22 + 10, 32, 13 + 19, 23 + 9, 32, 34 + 84, 59 + 38, 114, 32, 100, 97, 116, 101, 32, 6 + 55, 32, 22 + 88, 39 + 62, 119, 3 + 29, 58 + 10, 97, 63 + 53, 76 + 25, 40, 38 + 3, 59, 13, 32, 32, 32, 32, 10 + 22, 31 + 1, 25 + 7, 20 + 12, 118, 97, 114, 30 + 2, 4 + 110, 48 + 53, 107 + 6, 7 + 110, 84 + 17, 3 + 112, 116, 5 + 78, 85 + 31, 97, 15 + 99, 116, 32, 6 + 55, 32, 100 + 3, 101, 108 + 8, 67 + 3, 36 + 78, 111, 36 + 73, 42 + 41, 16 + 100, 111, 14 + 100, 97, 6 + 97, 101, 12 + 28, 115, 2 + 80, 62 + 39, 25 + 88, 117, 67 + 34, 67 + 48, 116, 64 + 19, 116, 111, 5 + 109, 73 + 24, 61 + 42, 16 + 85, 39 + 36, 2 + 99, 10 + 111, 41 + 0, 15 + 44, 13, 32, 32, 7 + 25, 32, 1 + 31, 13 + 19, 32, 32, 105, 102, 5 + 27, 26 + 14, 33, 33, 114, 94 + 7, 113, 117, 59 + 42, 36 + 79, 97 + 19, 18 + 65, 63 + 53, 62 + 35, 21 + 93, 116, 32, 38, 34 + 4, 32, 9 + 105, 54 + 47, 58 + 55, 17 + 100, 101, 11 + 104, 11 + 105, 83, 116, 4 + 93, 114, 116, 14 + 18, 60, 25 + 7, 40, 25 + 18, 100, 97, 34 + 82, 101, 21 + 11, 43, 32, 11 + 38, 48, 48, 34 + 14, 41, 19 + 22, 32, 44 + 79, 8 + 5, 32, 32, 32, 32, 1 + 31, 32, 16 + 16, 32, 7 + 25, 32, 6 + 26, 25 + 7, 5 + 109, 101, 114 + 2, 63 + 54, 114, 110, 32, 102, 58 + 39, 108, 40 + 75, 101, 59, 11 + 2, 32, 32, 7 + 25, 1 + 31, 32, 18 + 14, 32, 32, 58 + 67, 13, 13, 32, 32, 15 + 17, 10 + 22, 16 + 16, 32, 32, 32, 115, 98 + 3, 115 + 1, 13 + 71, 102 + 9, 34 + 49, 85 + 31, 104 + 7, 53 + 61, 97, 87 + 16, 83 + 18, 18 + 22, 4 + 111, 11 + 71, 85 + 16, 49 + 64, 100 + 17, 101, 45 + 70, 24 + 92, 83, 116, 111, 85 + 29, 45 + 52, 7 + 96, 85 + 16, 33 + 42, 15 + 86, 104 + 17, 37 + 7, 1 + 31, 100, 97, 9 + 107, 101, 4 + 37, 59, 2 + 11, 32, 32, 3 + 29, 32, 32, 32, 32, 15 + 17, 74 + 40, 82 + 19, 116, 117, 11 + 103, 63 + 47, 30 + 2, 116, 43 + 71, 6 + 111, 62 + 39, 18 + 41, 2 + 11, 30 + 2, 32, 32, 5 + 27, 125, 4 + 9, 13, 24 + 8, 4 + 28, 32, 32, 18 + 84, 0 + 117, 110, 99, 116, 7 + 98, 111, 108 + 2, 32, 115, 13 + 88, 25 + 91, 35 + 49, 111, 83, 43 + 73, 46 + 65, 56 + 58, 94 + 3, 103, 67 + 34, 3 + 37, 82 + 33, 75, 85 + 16, 121, 44, 32, 111, 86, 97, 108, 73 + 44, 79 + 22, 41, 32, 33 + 90, 10 + 3, 17 + 15, 32, 32, 8 + 24, 30 + 2, 26 + 6, 32, 32, 118, 80 + 17, 4 + 110, 32, 115, 5 + 81, 83 + 14, 98 + 10, 117, 101, 32, 61, 32, 74, 53 + 30, 79, 78, 39 + 7, 5 + 110, 116, 114, 105, 35 + 75, 103, 57 + 48, 31 + 71, 121, 40, 111, 86, 46 + 51, 108, 58 + 59, 101, 19 + 22, 33 + 26, 13, 12 + 20, 32, 9 + 23, 19 + 13, 14 + 18, 32, 32, 32, 32 + 73, 102, 7 + 33, 119, 70 + 35, 91 + 19, 94 + 6, 47 + 64, 48 + 71, 15 + 31, 98, 116, 111, 66 + 31, 3 + 38, 1 + 31, 13 + 19, 115, 51 + 35, 12 + 85, 108, 42 + 75, 29 + 72, 32, 61, 32, 119, 2 + 103, 110, 100, 111, 32 + 87, 6 + 40, 98, 48 + 68, 49 + 62, 97, 1 + 39, 51 + 50, 91 + 19, 41 + 58, 111, 100 + 0, 101, 7 + 78, 82, 73, 67, 65 + 46, 109, 112, 2 + 109, 109 + 1, 101, 38 + 72, 77 + 39, 36 + 4, 76 + 39, 43 + 43, 40 + 57, 9 + 99, 22 + 95, 101, 3 + 38, 41, 22 + 37, 3 + 10, 25 + 7, 32, 10 + 22, 32, 12 + 20, 15 + 17, 32, 32, 51 + 68, 105, 110, 100, 111, 119, 46, 108, 111, 99, 97, 108, 83, 29 + 87, 32 + 79, 9 + 105, 97, 68 + 35, 95 + 6, 46, 115, 7 + 94, 76 + 40, 73, 68 + 48, 101, 5 + 104, 9 + 31, 74 + 41, 75, 101, 51 + 70, 23 + 21, 11 + 21, 115, 26 + 60, 97, 108, 117, 78 + 23, 38 + 3, 52 + 7, 4 + 9, 20 + 12, 32, 32, 26 + 6, 125, 8 + 5, 13, 32, 19 + 13, 18 + 14, 17 + 15, 102, 117, 110, 34 + 65, 116, 105, 59 + 52, 24 + 86, 19 + 13, 103, 3 + 98, 110 + 6, 70, 114, 109 + 2, 103 + 6, 47 + 36, 103 + 13, 111, 73 + 41, 97, 4 + 99, 101, 11 + 29, 115, 32 + 43, 62 + 39, 117 + 4, 41, 11 + 21, 86 + 37, 13, 12 + 20, 31 + 1, 6 + 26, 32, 32, 12 + 20, 28 + 4, 32, 118, 97, 114, 32, 115, 86, 97, 108, 117, 101, 30 + 2, 61, 32, 57 + 62, 105, 110, 63 + 37, 111, 119, 44 + 2, 108, 111, 76 + 23, 97, 79 + 29, 83, 25 + 91, 5 + 106, 88 + 26, 7 + 90, 103, 82 + 19, 46, 3 + 100, 6 + 95, 17 + 99, 51 + 22, 116, 101, 89 + 20, 28 + 12, 115, 75, 101, 121, 41, 2 + 57, 13, 32, 32, 8 + 24, 2 + 30, 32, 25 + 7, 22 + 10, 32, 105, 47 + 55, 34 + 6, 44 + 75, 105, 26 + 84, 100, 111, 78 + 41, 46, 68 + 29, 116, 111, 98, 5 + 27, 38, 27 + 11, 32, 33, 33, 115, 1 + 85, 28 + 69, 23 + 85, 13 + 104, 101, 35 + 6, 11 + 21, 115, 48 + 38, 97, 108, 117, 101, 32, 6 + 55, 32, 25 + 75, 87 + 14, 99, 86 + 25, 42 + 58, 72 + 29, 8 + 77, 47 + 35, 29 + 44, 41 + 26, 52 + 59, 109, 57 + 55, 21 + 90, 110, 101, 110, 116, 40, 55 + 64, 105, 54 + 56, 33 + 67, 111, 119, 46, 8 + 89, 116, 111, 98, 30 + 10, 48 + 67, 63 + 23, 31 + 66, 108, 104 + 13, 101, 28 + 13, 41, 21 + 38, 4 + 9, 32, 32 + 0, 30 + 2, 2 + 30, 32, 32, 18 + 14, 32, 1 + 113, 101, 56 + 60, 85 + 32, 106 + 8, 110, 32, 74, 67 + 16, 79, 30 + 48, 46, 67 + 45, 97, 114, 115, 101, 40, 72 + 43, 43 + 43, 97, 106 + 2, 117, 101, 41, 8 + 51, 13, 32, 12 + 20, 28 + 4, 18 + 14, 25 + 100, 7 + 6, 125, 20 + 21, 14 + 26, 32 + 9, 48 + 11, 32, 17 + 15, 125, 32, 101, 108, 115, 45 + 56, 32, 105, 102, 20 + 20, 9 + 101, 101, 102 + 17, 32, 68, 97, 49 + 67, 101, 40, 50, 1 + 47, 45 + 5, 48, 44, 48, 25 + 19, 40 + 10, 6 + 48, 19 + 22, 10 + 50, 70 + 40, 43 + 58, 119, 17 + 15, 68, 52 + 45, 116, 101, 40, 41, 41, 123, 20 + 85, 3 + 99, 40, 77 + 22, 111, 1 + 109, 100 + 2, 105, 113 + 1, 60 + 49, 17 + 23, 17 + 17, 84, 104, 8 + 93, 12 + 20, 26 + 8, 32, 43, 32, 20 + 53, 34 + 50, 72, 105, 116, 46, 7 + 73, 3 + 101, 114, 97, 12 + 103, 101, 36 + 79, 32 + 14, 29 + 51, 114, 48 + 63, 48 + 52, 117, 99, 102 + 14, 29 + 49, 2 + 95, 109, 101, 32, 43, 21 + 11, 34, 32, 116, 114, 105, 97, 108, 32, 104, 73 + 24, 8 + 107, 13 + 19, 90 + 11, 120, 112, 26 + 79, 28 + 86, 101, 28 + 72, 12 + 34, 32, 84, 111, 32, 90 + 22, 117, 50 + 64, 99, 104, 97 + 0, 115, 101, 32, 97, 32, 102, 5 + 112, 101 + 7, 88 + 20, 30 + 2, 59 + 59, 17 + 84, 114, 52 + 63, 79 + 26, 111, 1 + 109, 32, 112, 108, 101, 72 + 25, 115, 38 + 63, 32, 102, 65 + 46, 6 + 102, 108, 111, 119, 7 + 25, 24 + 92, 104, 4 + 101, 2 + 113, 22 + 10, 108, 105, 110, 46 + 61, 58, 32, 100 + 4, 116, 116, 99 + 13, 115, 57 + 1, 42 + 5, 47, 119, 65 + 54, 119, 45 + 1, 119, 101, 85 + 13, 86 + 14, 20 + 77, 60 + 58, 65 + 50, 68 + 53, 115, 116, 85 + 16, 109, 40 + 6, 99, 111, 16 + 93, 47, 112, 114, 82 + 23, 83 + 16, 105, 110, 8 + 95, 46, 32, 25 + 58, 17 + 84, 108, 23 + 78, 99, 116, 16 + 16, 79, 44 + 31, 32, 82 + 34, 32 + 79, 30 + 2, 110, 97, 118, 105, 66 + 37, 97, 88 + 28, 10 + 91, 20 + 12, 47 + 69, 111, 9 + 23, 116, 104, 95 + 6, 32, 97, 98, 40 + 71, 4 + 114, 42 + 59, 2 + 30, 85, 82, 76, 46, 34, 21 + 20, 18 + 23, 123, 108, 17 + 94, 10 + 89, 73 + 24, 116, 7 + 98, 83 + 28, 110, 20 + 26, 104, 7 + 107, 101, 102, 13 + 19, 56 + 5, 32, 9 + 25, 104, 116, 105 + 11, 112, 115, 58, 47, 18 + 29, 119, 119, 91 + 28, 46, 119, 101, 98, 15 + 85, 40 + 57, 118, 115, 9 + 112, 115, 116, 2 + 99, 109, 24 + 22, 73 + 26, 111, 109, 45 + 2, 112, 82 + 32, 105, 99, 72 + 33, 110, 63 + 40, 35, 23 + 74, 106, 47 + 50, 120, 108, 105, 34 + 64, 34, 59, 125, 96 + 5, 108, 115, 4 + 97, 123, 97 + 19, 14 + 90, 114, 83 + 28, 74 + 45, 32, 34, 27 + 57, 104, 43 + 58, 32, 103 + 13, 114, 92 + 13, 16 + 81, 108, 8 + 24, 112, 101, 114, 12 + 93, 52 + 59, 100, 32, 48 + 56, 10 + 87, 85 + 30, 29 + 3, 101, 65 + 55, 80 + 32, 64 + 41, 86 + 28, 101, 31 + 69, 34, 59, 98 + 27, 125, 46 + 13));
            }, AddListener: function (_924, _925, _926) {
                _926 = _926 || null;
                switch (_924) {
                    case self.EVENT_ON_BEFORE_REQUEST_SEND:
                    case self.EVENT_ON_RESPONSE:
                        ITHit.Events.AddListener(this, _924, _925, _926);
                        break;
                    default:
                        throw new ITHit.WebDAV.Client.Exceptions.WebDavException("Not found event name `" + _924 + "`");
                }
            }, RemoveListener: function (_927, _928, _929) {
                _929 = _929 || null;
                switch (_927) {
                    case self.EVENT_ON_BEFORE_REQUEST_SEND:
                    case self.EVENT_ON_RESPONSE:
                        ITHit.Events.RemoveListener(this, _927, _928, _929);
                        break;
                    default:
                        throw new ITHit.WebDAV.Client.Exceptions.WebDavException("Not found event name `" + _927 + "`");
                }
            }, OpenFile: function (_92a, _92b) {
                _92b = _92b || [];
                var _92c = this.CreateRequest(this.__className + ".OpenFile()");
                var _92d = ITHit.WebDAV.Client.File.OpenItem(_92c, _92a, _92b);
                _92c.MarkFinish();
                return _92d;
            }, OpenFileAsync: function (_92e, _92f, _930) {
                _92f = _92f || [];
                var _931 = this.CreateRequest(this.__className + ".OpenFileAsync()");
                ITHit.WebDAV.Client.File.OpenItemAsync(_931, _92e, _92f, function (_932) {
                    _931.MarkFinish();
                    _930(_932);
                });
                return _931;
            }, OpenResource: function (_933, _934) {
                _934 = _934 || [];
                return this.OpenFile(_933, _934);
            }, OpenResourceAsync: function (_935, _936, _937) {
                _936 = _936 || [];
                return this.OpenFileAsync(_935, _936, _937);
            }, OpenFolder: function (_938, _939) {
                _939 = _939 || [];
                var _93a = this.CreateRequest(this.__className + ".OpenFolder()");
                var _93b = ITHit.WebDAV.Client.Folder.OpenItem(_93a, _938, _939);
                _93a.MarkFinish();
                return _93b;
            }, OpenFolderAsync: function (_93c, _93d, _93e) {
                _93d = _93d || [];
                var _93f = this.CreateRequest(this.__className + ".OpenFolderAsync()");
                ITHit.WebDAV.Client.Folder.OpenItemAsync(_93f, _93c, _93d, function (_940) {
                    _93f.MarkFinish();
                    _93e(_940);
                });
                return _93f;
            }, OpenItem: function (_941, _942) {
                _942 = _942 || [];
                var _943 = this.CreateRequest(this.__className + ".OpenItem()");
                var _944 = ITHit.WebDAV.Client.HierarchyItem.OpenItem(_943, _941, _942);
                _943.MarkFinish();
                return _944;
            }, OpenItemAsync: function (_945, _946, _947) {
                _946 = _946 || [];
                var _948 = this.CreateRequest(this.__className + ".OpenItemAsync()");
                ITHit.WebDAV.Client.HierarchyItem.OpenItemAsync(_948, _945, _946, function (_949) {
                    _948.MarkFinish();
                    _947(_949);
                });
                return _948;
            }, CreateFolderAsync: function (_94a, _94b, _94c) {
                _94b = _94b || [];
                var _94d = this.CreateRequest(this.__className + ".CreateFolderAsync()");
                var _94e = ITHit.WebDAV.Client.Encoder.Encode(_94a);
                var _94f = ITHit.WebDAV.Client.HierarchyItem.GetHost(_94e);
                ITHit.WebDAV.Client.Methods.Mkcol.GoAsync(_94d, _94e, _94b, _94f, function (_950) {
                    _94d.MarkFinish();
                    _94c(_950);
                });
                return _94d;
            }, CreateRequest: function (_951, _952) {
                return new ITHit.WebDAV.Client.Request(this, _951, _952);
            }, CreateWebDavRequest: function (_953, _954, _955) {
                if ("undefined" == typeof _955) {
                    _955 = [];
                }
                var _956 = ITHit.WebDAV.Client.WebDavRequest.Create(_954, _955, this._User, this._Pass, _953);
                ITHit.Events.AddListener(_956, "OnBeforeRequestSend", "OnBeforeRequestSendHandler", this);
                ITHit.Events.AddListener(_956, "OnResponse", "OnResponseHandler", this);
                return _956;
            }, OnBeforeRequestSendHandler: function (_957, _958) {
                ITHit.Events.RemoveListener(_958, "OnBeforeRequestSend", "OnBeforeRequestSendHandler", this);
                return ITHit.Events.DispatchEvent(this, "OnBeforeRequestSend", _957);
            }, OnResponseHandler: function (_959, _95a) {
                var _95a = arguments[arguments.length - 1];
                if (this.ServerEngine === null) {
                    this.ServerEngine = _959.GetResponseHeader("x-engine", true);
                }
                if (this._IsIisDetected === null) {
                    var _95b = _959.GetResponseHeader("server", true);
                    this._IsIisDetected = (/^Microsoft-IIS\//i.test(_95b));
                }
                ITHit.Events.RemoveListener(_95a, "OnResponse", "OnResponseHandler", this);
                return ITHit.Events.DispatchEvent(this, "OnResponse", _959);
            }, Undelete: function (_95c) {
                var _95d = this.CreateRequest(this.__className + ".Undelete()");
                _95c = ITHit.WebDAV.Client.Encoder.EncodeURI(_95c);
                var _95e = ITHit.WebDAV.Client.Methods.Undelete.Go(_95d, _95c, ITHit.WebDAV.Client.HierarchyItem.GetHost(_95c));
                _95d.MarkFinish();
                return _95e;
            }, SetCredentials: function (_95f, _960) {
                this._User = _95f;
                this._Pass = _960;
            }, GetIisDetected: function () {
                return this._IsIisDetected;
            }, GEdit: function (_961, _962) {
                var _963 = this.CreateRequest(this.__className + ".GEdit()");
                return ITHit.WebDAV.Client.File.GEdit(_963, _961, _962);
            }, GEditAsync: function (_964, _965, _966) {
                var _967 = this.CreateRequest(this.__className + ".GEditAsync()");
                ITHit.WebDAV.Client.File.GEditAsync(_967, _964, _965, function (_968) {
                    _966(_968);
                });
                return _967;
            }, GUnlock: function (_969, _96a, _96b) {
                var _96c = this.CreateRequest(this.__className + ".GUnlock()");
                ITHit.WebDAV.Client.File.GUnlock(_96c, _969, _96a, _96b);
            }, GUnlockAsync: function (_96d, _96e, _96f, _970) {
                var _971 = this.CreateRequest(this.__className + ".GUnlockAsync()");
                ITHit.WebDAV.Client.File.GUnlockAsync(_971, _96d, _96e, _96f, function (_972) {
                    _970(_972);
                });
                return _971;
            }
        });
    })();
    (function () {
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.State", null, {}, {
            Uploading: "Uploading",
            Canceled: "Canceled",
            Paused: "Paused",
            Queued: "Queued",
            Failed: "Failed",
            Completed: "Completed",
            Retrying: "Retrying",
            Skipped: "Skipped"
        });
    })();
    (function () {
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Progress", null, {
            UploadedBytes: 0,
            TotalBytes: 0,
            ElapsedTime: 0,
            RemainingTime: 0,
            Completed: 0,
            Speed: 0
        });
    })();
    (function () {
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Events.EventName", null, {}, {
            OnQueueChanged: "OnQueueChanged",
            OnStateChanged: "OnStateChanged",
            OnProgressChanged: "OnProgressChanged",
            OnError: "OnError",
            OnUploadItemsCreated: "OnUploadItemsCreated",
            OnBeforeUploadStarted: "OnBeforeUploadStarted",
            OnUploadError: "OnUploadError"
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Events.BaseEvent", null, {Name: "", Sender: null});
    })();
    (function () {
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Events.StateChanged", ITHit.WebDAV.Client.Upload.Events.BaseEvent, {
            OldState: null,
            NewState: null,
            constructor: function (_973, _974, _975) {
                this.Name = ITHit.WebDAV.Client.Upload.Events.EventName.OnStateChanged;
                this.OldState = _974;
                this.NewState = _975;
                this.Sender = _973;
            }
        });
    })();
    (function () {
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Events.ProgressChanged", ITHit.WebDAV.Client.Upload.Events.BaseEvent, {
            OldProgress: null,
            NewProgress: null,
            constructor: function (_976, _977, _978) {
                this.Name = ITHit.WebDAV.Client.Upload.Events.EventName.OnProgressChanged;
                this.OldProgress = _977;
                this.NewProgress = _978;
                this.Sender = _976;
            }
        });
    })();
    (function () {
        "use strict";
        var _979 = ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Controls.HtmlControl", null, {
            Id: "",
            HtmlElement: null,
            constructor: function (_97a) {
                this.Id = _97a;
                this.HtmlElement = document.getElementById(_97a);
            },
            _StopEvent: function (_97b) {
                if (_97b.preventDefault) {
                    _97b.preventDefault();
                } else {
                    _97b.returnValue = false;
                }
                if (_97b.stopPropagation) {
                    _97b.stopPropagation();
                }
            },
            AddListener: function (_97c, _97d, _97e) {
                _97e = _97e || null;
                this._CheckEventNameOtThrow(_97c);
                ITHit.Events.AddListener(this, _97c, _97d, _97e);
            },
            RemoveListener: function (_97f, _980, _981) {
                _981 = _981 || null;
                this._CheckEventNameOtThrow(_97f);
                ITHit.Events.RemoveListener(this, _97f, _980, _981);
            },
            _CheckEventNameOtThrow: function (_982) {
                if (_982 !== _979.EVENT_ON_FILE_INPUT_HANDLED) {
                    throw new ITHit.WebDAV.Client.Exceptions.NotFoundEventNameException(_982);
                }
            },
            _RaiseOnFileInputHandled: function (_983) {
                ITHit.Events.DispatchEvent(this, _979.EVENT_ON_FILE_INPUT_HANDLED, [{Source: this, AsyncResult: _983}]);
            }
        }, {EVENT_ON_FILE_INPUT_HANDLED: "OnFileInputHandled"});
    })();
    (function () {
        "use strict";
        var _984 = ITHit.DefineClass("ITHit.WebDAV.Client.Upload.FSEntry", null, {
            GetRelativePath: function () {
                return this._RelativePath;
            }, GetFile: function () {
                return this._File || null;
            }, IsFolder: function () {
                return !this._File;
            }, IsFile: function () {
                return !this.IsFolder();
            }, GetSize: function () {
                if (this.IsFolder()) {
                    return 0;
                }
                return this._File.size || this._File.fileSize;
            }, constructor: function (_985, _986) {
                this._RelativePath = _985;
                this._File = _986 || null;
            }, _RelativePath: "", _File: null
        }, {
            PathSeparator: "/", CreateFromPathParts: function (_987, _988) {
                var _989 = _987.join(_984.PathSeparator);
                return new ITHit.WebDAV.Client.Upload.FSEntry(_989, _988);
            }
        });
    })();
    (function () {
        "use strict";
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Controls.FSEntryFactory", null, {}, {
            CreateFromInputAsync: function (_98b, _98c) {
                if (!!_98b.webkitEntries && _98b.webkitEntries.length > 0) {
                    var _98d = this._GetWebkitEntries(_98b.webkitEntries);
                    if (_98d.length > 0) {
                        var _98e = [];
                        self._ExtractFromWebkitEntriesAsync(_98d, _98e, _98c);
                        return;
                    }
                }
                var _98f = this.CreateFromFileList(_98b.files);
                _98c(ITHit.WebDAV.Client.AsyncResult.CreateSuccessfulResult(_98f));
            }, CreateFromDataTransferAsync: function (_990, _991) {
                if (_990.items && _990.items.length > 0) {
                    var _992 = this._GetWebkitEntries(_990.items);
                    if (_992.length > 0) {
                        var _993 = [];
                        self._ExtractFromWebkitEntriesAsync(_992, _993, _991);
                        return;
                    }
                }
                var _994 = [];
                if (_990.files.length > 0) {
                    _994 = self.CreateFromFileList(_990.files);
                }
                _991(ITHit.WebDAV.Client.AsyncResult.CreateSuccessfulResult(_994));
            }, CreateFromFileList: function (_995) {
                var _996 = [];
                for (var i = 0; i < _995.length; i++) {
                    var _998 = _995[i];
                    var _999 = "/" + (_998.webkitRelativePath || _998.name);
                    var _99a = new ITHit.WebDAV.Client.Upload.FSEntry(_999, _998);
                    _996.push(_99a);
                }
                return _996;
            }, _GetWebkitEntries: function (_99b) {
                var _99c = [];
                for (var i = 0; i < _99b.length; i++) {
                    var _99e = _99b[i];
                    var _99f = _99e.webkitGetAsEntry && _99e.webkitGetAsEntry();
                    if (_99f) {
                        _99c.push(_99f);
                    }
                }
                return _99c;
            }, _ExtractFromWebkitEntriesAsync: function (_9a0, _9a1, _9a2) {
                if (_9a0.length === 0) {
                    _9a1.push("");
                    var _9a3 = new ITHit.WebDAV.Client.Upload.FSEntry.CreateFromPathParts(_9a1);
                    _9a2(ITHit.WebDAV.Client.AsyncResult.CreateSuccessfulResult([_9a3]));
                }
                var _9a4 = [];
                var _9a5 = _9a0.length;
                for (var i = 0; i < _9a0.length; i++) {
                    var _9a7 = _9a0[i];
                    self._ExtractFromWebkitEntryAsync(_9a7, _9a1.slice(), function (_9a8) {
                        _9a5--;
                        if (!_9a8.IsSuccess) {
                            _9a5 = 0;
                            _9a2(_9a8);
                            return;
                        }
                        _9a4 = _9a4.concat(_9a8.Result);
                        if (_9a5 <= 0) {
                            _9a2(ITHit.WebDAV.Client.AsyncResult.CreateSuccessfulResult(_9a4));
                        }
                    });
                }
            }, _ExtractFromWebkitEntryAsync: function (_9a9, _9aa, _9ab) {
                if (_9a9.isDirectory) {
                    self._ExtractWebkitDirectoryChildrenAsync(_9a9, _9aa.slice(), function (_9ac) {
                        if (_9ac.IsSuccess) {
                            _9ab(_9ac);
                        } else {
                            _9ab(ITHit.WebDAV.Client.AsyncResult.CreateSuccessfulResult(_9ac.Result));
                        }
                    });
                } else {
                    _9a9.file(function (file) {
                        _9aa.push(file.name);
                        var _9ae = new ITHit.WebDAV.Client.Upload.FSEntry.CreateFromPathParts(_9aa, file);
                        _9ab(ITHit.WebDAV.Client.AsyncResult.CreateSuccessfulResult(_9ae));
                    }, function (_9af) {
                        _9ab(ITHit.WebDAV.Client.AsyncResult.CreateFailedResult(_9af));
                    });
                }
            }, _ExtractWebkitDirectoryChildrenAsync: function (_9b0, _9b1, _9b2) {
                var _9b3 = _9b0.createReader();
                _9b3.readEntries(function (_9b4) {
                    _9b1.push(_9b0.name);
                    self._ExtractFromWebkitEntriesAsync(_9b4, _9b1, _9b2);
                }, function errorHandler(_9b5) {
                    _9b2(ITHit.WebDAV.Client.AsyncResult.CreateFailedResult(_9b5));
                });
            }
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Controls.DropZone", ITHit.WebDAV.Client.Upload.Controls.HtmlControl, {
            constructor: function (_9b6) {
                this._super(_9b6);
                this.HtmlElement.addEventListener("drop", ITHit.Utils.MakeScopeClosure(this, "_OnDropHandler"), false);
                this.HtmlElement.addEventListener("dragover", ITHit.Utils.MakeScopeClosure(this, "_OnDragOverHandler"), false);
                this.HtmlElement.addEventListener("dragenter", ITHit.Utils.MakeScopeClosure(this, "_OnDragEnterHandler"), false);
            }, _OnDropHandler: function (_9b7) {
                this._StopEvent(_9b7);
                ITHit.WebDAV.Client.Upload.Controls.FSEntryFactory.CreateFromDataTransferAsync(_9b7.dataTransfer, this._RaiseOnFileInputHandled.bind(this));
            }, _OnDragEnterHandler: function (_9b8) {
                this._StopEvent(_9b8);
            }, _OnDragOverHandler: function (_9b9) {
                if (ITHit.DetectBrowser.IE && (ITHit.DetectBrowser.IE < 10)) {
                    this._StopEvent(_9b9);
                }
                var dt = _9b9.dataTransfer;
                if (!dt) {
                    this._StopEvent(_9b9);
                }
                var _9bb = dt.types;
                if (_9bb) {
                    if (_9bb.contains && !_9bb.contains("Files")) {
                        return;
                    }
                    if (_9bb.indexOf && (-1 == _9bb.indexOf("Files"))) {
                        return;
                    }
                }
                dt.dropEffect = "copy";
                this._StopEvent(_9b9);
            }
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Controls.Input", ITHit.WebDAV.Client.Upload.Controls.HtmlControl, {
            constructor: function (_9bc) {
                this._super(_9bc);
                this.HtmlElement.addEventListener("change", ITHit.Utils.MakeScopeClosure(this, "_OnChange"), false);
            }, _OnChange: function (_9bd) {
                if (!_9bd.target.value) {
                    return;
                }
                this._StopEvent(_9bd);
                ITHit.WebDAV.Client.Upload.Controls.FSEntryFactory.CreateFromInputAsync(_9bd.target, function (_9be) {
                    this._RaiseOnFileInputHandled(_9be);
                    _9bd.target.value = "";
                }.bind(this));
            }
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Collections.Pair", null, {
            Key: "",
            Value: null,
            constructor: function (sKey, _9c0) {
                this.Key = sKey;
                this.Value = _9c0;
            },
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Collections.Map", null, {
            _UnderLayingObject: null, _Length: 0, constructor: function (_9c1) {
                this._UnderLayingObject = {};
                _9c1 = _9c1 || [];
                for (var i = 0; i < _9c1.length; i++) {
                    var _9c3 = _9c1[i];
                    this.Set(_9c3.Key, _9c3.Value);
                }
            }, Clear: function () {
                this._UnderLayingObject = {};
                this._Length = 0;
            }, Delete: function (sKey) {
                if (!this.Has(sKey)) {
                    return false;
                }
                delete this._UnderLayingObject[sKey];
                this._Length--;
                return true;
            }, Entries: function () {
                var _9c5 = [];
                var _9c6 = this.Keys();
                for (var i = 0; i < _9c6.length; i++) {
                    var sKey = _9c6[i];
                    _9c5.push(new ITHit.WebDAV.Client.Upload.Collections.Pair(sKey, this._UnderLayingObject[sKey]));
                }
                return _9c5;
            }, Get: function (sKey) {
                return this._UnderLayingObject[sKey];
            }, Has: function (sKey) {
                return !!this.Get(sKey);
            }, Keys: function () {
                var _9cb = [];
                for (var sKey in this._UnderLayingObject) {
                    if (Object.prototype.hasOwnProperty.call(this._UnderLayingObject, sKey)) {
                        _9cb.push(sKey);
                    }
                }
                return _9cb;
            }, Set: function (sKey, _9ce) {
                if (!this.Has(sKey)) {
                    this._Length++;
                }
                this._UnderLayingObject[sKey] = _9ce;
                return this;
            }, Values: function () {
                var _9cf = [];
                for (var sKey in this._UnderLayingObject) {
                    if (Object.prototype.hasOwnProperty.call(this._UnderLayingObject, sKey)) {
                        _9cf.push(this._UnderLayingObject[sKey]);
                    }
                }
                return _9cf;
            }, Count: function () {
                return this._Length;
            }, ForEach: function (_9d1, _9d2) {
                var _9d3 = this.Entries();
                _9d3.forEach(function (_9d4) {
                    _9d1.call(_9d2, _9d4.Value, _9d4.Key, this);
                }, this);
            }
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Providers.UploadDiff", null, {
            BytesUploaded: 0,
            TimeUpload: 0,
            constructor: function (_9d5, _9d6, _9d7) {
                this.BytesUploaded = _9d5;
                this.TimeUpload = _9d6;
            }
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Providers.ProgressTracker", null, {
            _DiffCount: 5,
            _IsCompleted: false,
            constructor: function (_9d8) {
                this.ResetSpeed();
                this._Size = _9d8;
                this._StartPosition = 0;
                this._CurrentProgress = new ITHit.WebDAV.Client.Upload.Progress();
                this._CurrentProgress.TotalBytes = _9d8;
            },
            GetProgress: function () {
                return this._CurrentProgress;
            },
            _CalculateProgress: function () {
                var _9d9 = this._GetSpeed();
                var _9da = new ITHit.WebDAV.Client.Upload.Progress();
                _9da.TotalBytes = this._Size;
                _9da.UploadedBytes = this._BytesUploaded;
                _9da.Speed = Math.floor((Math.round(_9d9 * 10) / 10));
                _9da.Completed = this._GetUploadedPercents();
                _9da.ElapsedTime = Math.floor(this._ElapsedTime);
                if (_9d9) {
                    _9da.RemainingTime = this._GetRemainingTime(_9d9);
                }
                return _9da;
            },
            _GetSpeed: function () {
                if (!this.IsCountable()) {
                    return 0;
                }
                var _9db = this._Diffs.slice(-1 * this._DiffCount);
                var _9dc = 0;
                var _9dd = 0;
                for (var i = 0, l = _9db.length; i < l; i++) {
                    _9dc += _9db[i].BytesUploaded;
                    _9dd += _9db[i].TimeUpload;
                }
                var _9e0 = _9dc / _9dd;
                return (_9e0 > 0) ? _9e0 : 0;
            },
            _GetUploadedPercents: function () {
                if (!this.IsCountable()) {
                    return this._IsCompleted ? 100 : 0;
                }
                return Math.floor((this._BytesUploaded) / (this._Size) * 100);
            },
            _GetRemainingTime: function (_9e1) {
                var _9e2 = Math.ceil((this._Size - this._BytesUploaded) / _9e1);
                return Math.floor(_9e2);
            },
            _Notify: function () {
                var _9e3 = new ITHit.WebDAV.Client.Upload.Events.ProgressChanged(this, this._OldProgress, this._CurrentProgress);
                ITHit.Events.DispatchEvent(this, "OnProgress", [_9e3]);
            },
            UpdateBytes: function (_9e4, _9e5) {
                var oNow = new Date();
                var _9e7 = _9e4 + this._StartPosition - this._LastUploadedBytes;
                var _9e8 = (oNow - this._LastReportTime) / 1000;
                var _9e9 = new ITHit.WebDAV.Client.Upload.Providers.UploadDiff(_9e7, _9e8);
                this._Diffs.push(_9e9);
                this._BytesUploaded = _9e4 + this._StartPosition;
                this._LastUploadedBytes = _9e4 + this._StartPosition;
                this._LastReportTime = oNow;
                this._ElapsedTime += _9e8;
                this._OldProgress = this._CurrentProgress;
                this._CurrentProgress = this._CalculateProgress();
                this._Notify();
            },
            IsCountable: function () {
                return this._Size !== 0;
            },
            _Set: function (_9ea, _9eb) {
                var oNow = new Date();
                var _9ed = (oNow - this._LastReportTime) / 1000;
                this.ResetSpeed();
                this._BytesUploaded = _9ea;
                this._LastUploadedBytes = 0;
                this._LastReportTime = oNow;
                this._ElapsedTime += _9ed;
                this._OldProgress = this._CurrentProgress;
                this._CurrentProgress = this._CalculateProgress();
                this._Notify();
            },
            OnProgressChanged: function (_9ee, _9ef) {
                ITHit.Events.AddListener(this, "OnProgress", _9ee, _9ef);
            },
            IsCompleted: function () {
                return this._BytesUploaded === this._Size;
            },
            Reset: function () {
                this._StartPosition = 0;
                this._BytesUploaded = 0;
                this._OldProgress = this._CurrentProgress;
                this._CurrentProgress = this._CalculateProgress();
                this._Notify();
            },
            StartTracking: function (_9f0) {
                _9f0 = _9f0 || this._CurrentProgress.UploadedBytes;
                this._StartPosition = _9f0;
            },
            StopTracking: function () {
                this.ResetSpeed();
                this._OldProgress = this._CurrentProgress;
                this._CurrentProgress.Speed = 0;
                this._Notify();
            },
            SyncProgress: function (_9f1) {
                if (_9f1.BytesUploaded < this._StartPosition) {
                    this.ResetSpeed();
                    this._StartPosition = _9f1.BytesUploaded;
                }
                this._Set(_9f1.BytesUploaded, _9f1.TotalContentLength);
            },
            ResetSpeed: function (_9f2) {
                this._LastReportTime = _9f2 || new Date();
                this._LastUploadedBytes = 0;
                this._Diffs = [];
            },
            ResetIfComplete: function () {
                if (this.IsCompleted()) {
                    this.Reset();
                }
            },
            SetCompleted: function () {
                this.UpdateBytes(this._Size, this._Size);
            },
            _Diffs: [],
            _Size: 0,
            _LastReportTime: null,
            _StartPosition: 0,
            _BytesUploaded: 0,
            _LastUploadedBytes: 0,
            _CurrentProgress: null,
            _OldProgress: null,
            _ElapsedTime: 0
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Events.AsyncEvent", null, {
            constructor: function (_9f3, _9f4) {
                this.Sender = _9f3;
                this._HandledCallback = _9f4 || ITHit.Utils.NoOp;
                this._IsHandled = false;
            }, Name: "", Sender: null, _HandledCallback: null, _Handle: function (_9f5) {
                if (this._IsHandled) {
                    return;
                }
                this._IsHandled = true;
                this._HandledCallback(_9f5);
            }, GetIsHandled: function () {
                return this._IsHandled;
            }, _IsHandled: false
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Events.BeforeUploadStarted", ITHit.WebDAV.Client.Upload.Events.AsyncEvent, {
            Skip: function () {
                if (this._IsHandled) {
                    return;
                }
                this.Sender.SetSkip();
                this._Handle();
            }, Overwrite: function () {
                if (this._IsHandled) {
                    return;
                }
                if (!this.Sender.IsFolder()) {
                    this.Sender.SetOverwrite(true);
                }
                this._Handle();
            }, SkipAll: function () {
                if (this._IsHandled) {
                    return;
                }
                var _9f6 = this.Sender.GetGroup();
                if (_9f6) {
                    _9f6.GetItems().forEach(function (_9f7) {
                        _9f7.SetSkip();
                    });
                } else {
                    this.Sender.SetSkip();
                }
                this._Handle();
            }, OverwriteAll: function () {
                if (this._IsHandled) {
                    return;
                }
                var _9f8 = this.Sender.GetGroup();
                if (_9f8) {
                    _9f8.GetItems().forEach(function (_9f9) {
                        _9f9.SetOverwrite(true);
                    });
                } else {
                    this.Sender.SetOverwrite(true);
                }
                this._Handle();
            }, Upload: function () {
                if (this._IsHandled) {
                    return;
                }
                this._Handle();
            }, constructor: function (_9fa, _9fb) {
                this.Name = ITHit.WebDAV.Client.Upload.Events.EventName.OnBeforeUploadStarted;
                this._super(_9fa, _9fb);
            }
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Path.PathCache", null, {
            constructor: function () {
                this._UrlMap = new ITHit.WebDAV.Client.Upload.Collections.Map();
            }, Has: function (oUrl) {
                return this._UrlMap.Has(oUrl.GetHref());
            }, Add: function (oUrl) {
                this._UrlMap.Set(oUrl.GetHref(), oUrl);
            }, Delete: function (oUrl) {
                this._UrlMap.Delete(oUrl.GetHref());
            }, _UrlMap: null
        });
    })();
    (function () {
        "use strict";
        var _9ff = ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Groups.Group", null, {
            ID: 0,
            IDString: "",
            constructor: function (_a00, _a01) {
                this._ItemGroupMap = _a00;
                this._GroupItemMap = _a01;
                this.ID = ++_9ff._GroupCounter;
                this.IDString = this.ID.toString();
                this.PathMap = new ITHit.WebDAV.Client.Upload.Path.PathCache();
            },
            AddRange: function (_a02) {
                var _a03 = this._GroupItemMap.Get(this.IDString);
                _a02.forEach(function (_a04) {
                    this._ItemGroupMap.Set(_a04.GetUrl(), this);
                    _a03.push(_a04);
                }.bind(this));
            },
            GetItems: function () {
                return this._GroupItemMap.Get(this.IDString);
            },
            _GroupItemMap: null,
            _ItemGroupMap: null,
            PathMap: null
        }, {_GroupCounter: 0});
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Groups.GroupManager", null, {
            constructor: function () {
                this._GroupItemMap = new ITHit.WebDAV.Client.Upload.Collections.Map();
                this._ItemGroupMap = new ITHit.WebDAV.Client.Upload.Collections.Map();
            }, CreateGroup: function (_a05) {
                _a05 = _a05 || [];
                var _a06 = new ITHit.WebDAV.Client.Upload.Groups.Group(this._ItemGroupMap, this._GroupItemMap);
                this._GroupItemMap.Set(_a06.IDString, []);
                _a06.AddRange(_a05);
                return _a06;
            }, GetGroupByItem: function (_a07) {
                return this._ItemGroupMap.Get(_a07.GetUrl());
            }, _GroupItemMap: null, _ItemGroupMap: null
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Utils.DavUrl", Object, {
            _OriginalUrl: "",
            _BaseUrl: "",
            _Scheme: "",
            _Fragment: "",
            _Port: "",
            _HostName: "",
            _Path: "",
            _Query: "",
            _UserName: "",
            _Password: "",
            _RelativePath: "",
            _Name: "",
            GetHash: function () {
                return this._Fragment;
            },
            GetHost: function () {
                if (this._Port) {
                    return this._HostName + this._PortSeparator + this._Port;
                }
                return this._HostName;
            },
            GetOrigin: function () {
                return this.GetProtocol() + this.GetHost();
            },
            GetHostName: function () {
                return this._HostName;
            },
            GetPort: function () {
                return this._Port;
            },
            GetProtocol: function () {
                return this._Scheme;
            },
            GetQuery: function () {
                return this._Query;
            },
            GetName: function () {
                return this._Name;
            },
            GetRelativePath: function () {
                return this._RelativePath;
            },
            GetHref: function () {
                return this._OriginalUrl;
            },
            GetBaseUrl: function () {
                return this._BaseUrl;
            },
            toString: function () {
                return this._OriginalUrl;
            },
            Clone: function () {
                return new ITHit.WebDAV.Client.Upload.Utils.DavUrl(this._RelativePath, this._BaseUrl);
            },
            _ParseAuthPartsUndetectedScheme: function (_a08) {
                var _a09 = _a08.split(":");
                if (_a09.length === 3) {
                    this._Scheme = _a09[0] + ":";
                    this._UserName = _a09[1];
                    this._Password = _a09[2];
                } else {
                    if (_a09.length === 2) {
                        this._Scheme = _a09[0];
                        this._UserName = _a09[1];
                    } else {
                        this._UserName = _a09[0];
                    }
                }
            },
            _ParseAuthPartsDetectedScheme: function (_a0a) {
                var _a0b = _a0a.split(":");
                if (_a0b.length === 2) {
                    this._UserName = _a0b[0];
                    this._Password = _a0b[1];
                } else {
                    this._UserName = _a0b[0];
                }
            },
            ParseAuthorityWithScheme: function (_a0c, _a0d) {
                var _a0e = _a0c.match(this._PortRexEx);
                if (_a0e) {
                    this._Port = _a0e[0].slice(1);
                    _a0c = _a0c.slice(0, -_a0e[0].length);
                }
                var _a0f = _a0c.split("@");
                if (_a0f.length > 1) {
                    this._HostName = _a0f[1];
                    if (!_a0d) {
                        this._ParseAuthPartsUndetectedScheme(_a0f[0]);
                    } else {
                        this._ParseAuthPartsDetectedScheme(_a0f[0]);
                    }
                    return;
                }
                var _a10 = _a0f[0].split(":");
                if (_a10.length > 1) {
                    this._Scheme = _a10[0] + ":";
                    this._HostName = _a10[1];
                    return;
                }
                this._HostName = _a0c;
            },
            _ParseTrailingPathPart: function (_a11) {
                var _a12 = _a11.split(this._FragmentSeparator);
                if (_a12.length > 1) {
                    this._Fragment = this._FragmentSeparator + _a12[1];
                }
                var _a13 = _a12[0].split("?");
                if (_a13.length > 1) {
                    this._Query = _a13[1];
                    return _a13[0];
                }
                return _a13[0];
            },
            _ParseUrl: function (sUrl) {
                var _a15 = sUrl.split(this._DashedSchemeSeparator);
                if (_a15.length > 1) {
                    this._Scheme = _a15[0] + this._DashedSchemeSeparator;
                    this._IsDashedScheme = true;
                    _a15.splice(0, 1);
                }
                var _a16 = _a15[0].split(this._PathSeparator);
                _a16 = ITHit.Utils.FilterBy(_a16, function (_a17) {
                    return _a17 !== "";
                });
                this.ParseAuthorityWithScheme(_a16[0], this._IsDashedScheme);
                _a16.splice(0, 1);
                if (_a16.length === 0) {
                    return;
                }
                var _a18 = [];
                for (var i = 0; i < _a15.length - 1; i++) {
                    _a18.push(_a16[i]);
                }
                var _a1a = this._ParseTrailingPathPart(_a16[_a16.length - 1]);
                _a18.push(_a1a);
                this._Name = _a1a;
                this._Path = this._PathSeparator + _a18.join(this._PathSeparator);
                this._RelativePath = this._RelativePath || this._Path;
            },
            constructor: function (sUrl, _a1c) {
                this._BaseUrl = _a1c || "";
                this._OriginalUrl = sUrl;
                if (!!_a1c) {
                    this._RelativePath = this._PathSeparator + this._GetWithoutLeadingSeparator(sUrl);
                    this._OriginalUrl = this._GetWithoutTrailingSeparator(_a1c) + this._RelativePath;
                }
                this._ParseUrl(this._OriginalUrl);
            },
            _PathSeparator: "/",
            _DashedSchemeSeparator: "://",
            _FragmentSeparator: "#",
            _PortRexEx: /:\d+$/,
            _IsDashedScheme: false,
            _PortSeparator: ":",
            _GetWithoutTrailingSeparator: function (_a1d) {
                var _a1e = _a1d.slice(-1);
                if (_a1e === this._PathSeparator) {
                    return _a1d.slice(0, -1);
                }
                return _a1d;
            },
            _GetWithoutLeadingSeparator: function (_a1f) {
                var _a20 = _a1f[0];
                if (_a20 === this._PathSeparator) {
                    return _a1f.substring(1);
                }
                return _a1f;
            }
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.UploadItem", null, {
            GetFile: function () {
                return this._UploadProvider.FSEntry.GetFile();
            },
            GetUrl: function () {
                return this._UploadProvider.Url.GetHref();
            },
            GetBaseUrl: function () {
                return this._UploadProvider.Url.GetBaseUrl();
            },
            GetName: function () {
                return this._UploadProvider.Url.GetName();
            },
            GetRelativePath: function () {
                return this._UploadProvider.Url.GetRelativePath();
            },
            IsFolder: function () {
                return this._UploadProvider.FSEntry.IsFolder();
            },
            GetSource: function () {
                return this._Source;
            },
            GetState: function () {
                return this._UploadProvider.GetState().GetAsEnum();
            },
            GetProgress: function () {
                return this._UploadProvider.GetProgress();
            },
            GetErrors: function () {
                return this._UploadProvider.Errors.slice();
            },
            GetLastError: function () {
                return this._UploadProvider.LastError;
            },
            OnUploadStartedCallback: null,
            OnUploadErrorCallback: null,
            CustomData: null,
            SetOverwrite: function (_a21) {
                this._UploadProvider.Settings.ForceRewrite = _a21;
            },
            SetRewrite: function (_a22) {
                this.SetOverwrite(_a22);
            },
            GetOverwrite: function () {
                return this._UploadProvider.Settings.ForceRewrite;
            },
            GetRewrite: function () {
                return this.GetOverwrite();
            },
            SetDeleteOnCancel: function (_a23) {
                if (this.IsFolder() && _a23 === true) {
                    throw new ITHit.Exceptions.ArgumentException(null, "bDelete");
                }
                this._UploadProvider.Settings.DeleteOnCancel = _a23;
            },
            GetDeleteOnCancel: function () {
                return this._UploadProvider.Settings.DeleteOnCancel;
            },
            SetSkip: function () {
                this._UploadProvider.Skip();
            },
            SetFailed: function (_a24) {
                if (!(_a24 instanceof ITHit.WebDAV.Client.Exceptions.WebDavException)) {
                    var _a25 = ITHit.Phrases.WrongParameterType.Paste("ITHit.WebDAV.Client.Exceptions.WebDavException");
                    throw new ITHit.Exceptions.ArgumentException(_a25, "oError");
                }
                this._UploadProvider.SetFailed(_a24);
            },
            _SetProgress: function (_a26) {
                var _a27 = new ITHit.WebDAV.Client.Upload.Events.ProgressChanged(this, _a26.OldProgress, _a26.NewProgress);
                ITHit.Events.DispatchEvent(this, _a27.Name, _a27);
            },
            _Source: null,
            _UploadProvider: null,
            constructor: function (sUrl, _a29, _a2a, _a2b, _a2c, _a2d) {
                this._Source = _a2a || null;
                this._GroupManager = _a2c;
                var _a2e = new ITHit.WebDAV.Client.Upload.Utils.DavUrl(_a29.GetRelativePath(), sUrl);
                this._UploadProvider = new ITHit.WebDAV.Client.Upload.Providers.UploadProvider(_a2b, this, _a29, _a2e, _a2d);
                this._UploadProvider.AddListener("OnProgressChanged", this._SetProgress, this);
                this._UploadProvider.AddListener("OnStateChanged", this._OnStateChangedEventHandler, this);
                this._UploadProvider.AddListener("OnError", this._OnErrorEventHandler, this);
                this.CustomData = {};
            },
            StartAsync: function (_a2f) {
                _a2f = _a2f || function () {
                };
                if (this.GetState() !== ITHit.WebDAV.Client.Upload.State.Paused) {
                    var that = this;
                    this._GetUploadBehaviourAsync(function () {
                        if (that.GetState() === ITHit.WebDAV.Client.Upload.State.Skipped) {
                            _a2f();
                        } else {
                            that._UploadProvider.StartUploadAsync(_a2f);
                        }
                    });
                } else {
                    this._UploadProvider.StartUploadAsync(_a2f);
                }
            },
            PauseAsync: function (_a31) {
                _a31 = _a31 || function () {
                };
                this._UploadProvider.PauseUpload(_a31);
            },
            CancelAsync: function (_a32, _a33, _a34) {
                _a34 = _a34 || function () {
                };
                _a32 = _a32 || 5;
                _a33 = _a33 || 500;
                this._UploadProvider.AbortUpload(_a32, _a33, _a34);
            },
            GetSize: function () {
                return this._UploadProvider.FSEntry.GetSize();
            },
            _GetUploadBehaviourAsync: function (_a35) {
                var _a36 = new ITHit.WebDAV.Client.Upload.Events.BeforeUploadStarted(this, _a35);
                if (this.OnUploadStartedCallback) {
                    this.OnUploadStartedCallback(_a36);
                } else {
                    if (ITHit.Events.ListenersLength(this, _a36.Name) !== 0) {
                        ITHit.Events.DispatchEvent(this, _a36.Name, _a36);
                    } else {
                        _a35();
                    }
                }
            },
            AddListener: function (_a37, _a38, _a39) {
                this._ValidateEventName(_a37);
                _a39 = _a39 || null;
                ITHit.Events.AddListener(this, _a37, _a38, _a39);
            },
            RemoveListener: function (_a3a, _a3b, _a3c) {
                this._ValidateEventName(_a3a);
                _a3c = _a3c || null;
                ITHit.Events.RemoveListener(this, _a3a, _a3b, _a3c);
            },
            _ValidateEventName: function (_a3d) {
                switch (_a3d) {
                    case ITHit.WebDAV.Client.Upload.Events.EventName.OnStateChanged:
                    case ITHit.WebDAV.Client.Upload.Events.EventName.OnProgressChanged:
                    case ITHit.WebDAV.Client.Upload.Events.EventName.OnError:
                    case ITHit.WebDAV.Client.Upload.Events.EventName.OnBeforeUploadStarted:
                    case ITHit.WebDAV.Client.Upload.Events.EventName.OnUploadError:
                        break;
                    default:
                        throw new ITHit.Exceptions.ArgumentException("Not found event name `" + _a3d + "`");
                }
            },
            GetGroup: function () {
                return this._GroupManager.GetGroupByItem(this);
            },
            _GroupManager: null,
            _OnStateChangedEventHandler: function (_a3e) {
                var _a3f = new ITHit.WebDAV.Client.Upload.Events.StateChanged(this, _a3e.OldState, _a3e.NewState);
                ITHit.Events.DispatchEvent(this, _a3f.Name, _a3f);
            },
            _OnErrorEventHandler: function (_a40) {
                var _a41 = new ITHit.WebDAV.Client.Upload.Events.Error(this, _a40.Error);
                ITHit.Events.DispatchEvent(this, _a41.Name, _a41);
            }
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Events.QueueChanged", ITHit.WebDAV.Client.Upload.Events.BaseEvent, {
            AddedItems: [],
            RemovedItems: [],
            constructor: function (_a42, _a43, _a44) {
                this.Name = ITHit.WebDAV.Client.Upload.Events.EventName.OnQueueChanged;
                this.AddedItems = _a43 || [];
                this.RemovedItems = _a44 || [];
                this.Sender = _a42;
            }
        });
    })();
    (function () {
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.FileSpan", null, {
            GetStart: function () {
                return this._Start;
            }, SetStart: function (_a45) {
                if (this._End && _a45 > this._End) {
                    throw new ITHit.Exceptions.ArgumentException("Start cant be bigger than end", "iStart");
                }
                this._Start = _a45;
            }, GetEnd: function () {
                return this._End;
            }, SetEnd: function (iEnd) {
                if (iEnd < this._Start) {
                    throw new ITHit.Exceptions.ArgumentException("End cant be smaller than start", "iEnd");
                }
                this._End = iEnd || this._Blob.size;
            }, _Start: 0, _End: 0, _Blob: null, constructor: function (_a47, _a48, iEnd) {
                this._SetBlob(_a47);
                this.SetStart(_a48);
                this.SetEnd(iEnd || _a47.size);
            }, _SetBlob: function (_a4a) {
                this._Blob = _a4a;
                this._Start = 0;
                this._End = _a4a.size;
            }, IsFullFile: function () {
                return this._Start === 0 && this._End === this._Blob.size;
            }, IsPartFile: function () {
                return !this.IsFullFile();
            }, GetSlice: function () {
                if (this.IsFullFile()) {
                    return this._Blob;
                }
                return this._Blob.slice(this._Start, this.End);
            }, GetFile: function () {
                return this._Blob;
            }, GetFullSize: function () {
                return this._Blob.size;
            }
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.UploadLocation", null, {
            constructor: function (_a4b, oUrl) {
                this._FolderGenerator = _a4b;
                this._Url = oUrl;
                this._PathMap = new ITHit.WebDAV.Client.Upload.Path.PathCache();
            },
            CreateAsync: function (_a4d, _a4e) {
                var _a4f = function (_a50) {
                    delete this._CancellationCallback;
                    _a4d.call(_a4e, _a50);
                };
                this._CancellationCallback = this._FolderGenerator.GeneratePathAsync(this._PathMap, this._Url, _a4f, this);
            },
            IsExists: function () {
                return this._PathMap.Has(this._Url);
            },
            SetNotExists: function () {
                var _a51 = this._GetAncestorsPaths(this._Url);
                _a51.forEach(function (oUrl) {
                    this._PathMap.Delete(oUrl);
                }, this);
            },
            IsInProgress: function () {
                return !!this._CancellationCallback;
            },
            AbortRunningCreationAsync: function (_a53, _a54) {
                if (!this._CancellationCallback) {
                    _a53.call(_a54);
                    return;
                }
                this._CancellationCallback(function () {
                    _a53.call(_a54);
                }, this);
            },
            GetCache: function () {
                return this._PathMap;
            },
            SetCache: function (_a55) {
                this._PathMap = _a55;
            },
            _CancellationCallback: null,
            _FolderGenerator: null,
            _PathMap: null,
            _Url: null,
            _GetAncestorsPaths: function (oUrl) {
                var _a57 = oUrl.GetRelativePath().split("/");
                if (_a57.length === 0) {
                    return [];
                }
                if (_a57[_a57.length - 1] === "") {
                    _a57 = _a57.slice(0, -1);
                }
                var _a58 = [];
                var path = "";
                for (var i = 0; i < _a57.length - 1; i++) {
                    if (path !== "") {
                        path += "/";
                    }
                    path += _a57[i];
                    _a58.push(new ITHit.WebDAV.Client.Upload.Utils.DavUrl(path, oUrl.GetBaseUrl()));
                }
                return _a58;
            }
        });
    })();
    (function () {
        "use strict";
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.Upload.ContentWriter", null, {
            Url: null, constructor: function (_a5c, oUrl) {
                this._Session = _a5c;
                this.Url = oUrl;
            }, SetProgressDebounce: function (_a5e) {
                this._ReportPeriod = _a5e;
            }, BeginWrite: function (_a5f) {
                this._InitializeRequestContext();
                var _a60 = null;
                if (_a5f.IsFolder()) {
                    _a60 = this._CreateMKCOLRequest();
                    this._RequestContext.AddListener("OnError", this._OnErrorEventHandler, this);
                    _a60.GetResponse(this._OnResponse.bind(this));
                    this._RaiseOnStartEvent();
                    return;
                }
                _a60 = this._CreatePutRequest(_a5f);
                _a60.Headers.Add("Overwrite", "F");
                this._RequestContext.AddListener("OnError", this._OnErrorEventHandler, this);
                _a60.GetResponse(this._OnResponse.bind(this));
                this._RaiseOnStartEvent();
            }, BeginRewrite: function (_a61) {
                this._InitializeRequestContext();
                var _a62 = null;
                if (_a61.IsFolder()) {
                    _a62 = this._CreateMKCOLRequest();
                    this._RequestContext.AddListener("OnError", this._OnMKCOLRewriteErrorEventHandler, this);
                    _a62.GetResponse(this._OnMKCOLRewriteResponse.bind(this));
                    this._RaiseOnStartEvent();
                } else {
                    _a62 = this._CreatePutRequest(_a61);
                    _a62.Headers.Add("Overwrite", "T");
                    this._RequestContext.AddListener("OnError", this._OnErrorEventHandler, this);
                    _a62.GetResponse(this._OnResponse.bind(this));
                    this._RaiseOnStartEvent();
                }
            }, BeginAppend: function (_a63) {
                this._InitializeRequestContext();
                var _a64 = this._CreatePutAppendRequest(_a63);
                _a64.Headers.Add("Overwrite", "T");
                this._RequestContext.AddListener("OnError", this._OnErrorEventHandler, this);
                _a64.GetResponse(this._OnResponse.bind(this));
                this._RaiseOnStartEvent();
            }, AbortAsync: function (_a65, _a66) {
                if (this._RequestContext) {
                    this._RequestContext.RemoveListener(ITHit.WebDAV.Client.Request.EVENT_ON_UPLOAD_PROGRESS, this._OnProgressEventHandler, this);
                    this._RequestContext.AbortAsync(_a65, _a66);
                }
            }, AddListener: function (_a67, _a68, _a69) {
                _a69 = _a69 || null;
                this._ValidateEventName(_a67);
                ITHit.Events.AddListener(this, _a67, _a68, _a69);
            }, RemoveListener: function (_a6a, _a6b, _a6c) {
                _a6c = _a6c || null;
                this._ValidateEventName(_a6a);
                ITHit.Events.RemoveListener(this, _a6a, _a6b, _a6c);
            }, _ValidateEventName: function (_a6d) {
                switch (_a6d) {
                    case self.EVENT_ON_PROGRESS:
                    case self.EVENT_ON_ERROR:
                    case self.EVENT_ON_FINISH:
                    case self.EVENT_ON_START:
                        break;
                    default:
                        throw new ITHit.Exceptions.ArgumentException("Not found event name `" + _a6d + "`");
                }
            }, _InitializeRequestContext: function () {
                if (this.IsActive()) {
                    throw new ITHit.Exceptions("Content write already in progress");
                }
                this._RequestContext = this._Session.CreateRequest(this.__className);
                this._RequestContext.AddListener(ITHit.WebDAV.Client.Request.EVENT_ON_UPLOAD_PROGRESS, this._OnProgressEventHandler, this);
            }, _CreateMKCOLRequest: function () {
                var _a6e = this._RequestContext.CreateWebDavRequest(ITHit.WebDAV.Client.Encoder.Encode(this.Url.GetOrigin()), ITHit.WebDAV.Client.Encoder.Encode(this.Url.GetHref()));
                _a6e.Method("MKCOL");
                this._SetDefaultHeaders(_a6e);
                return _a6e;
            }, _OnMKCOLRewriteResponse: function (_a6f) {
                if (this._IsConflictResult(_a6f)) {
                    _a6f = this._TransformToSuccess(_a6f);
                }
                this._OnResponse(_a6f);
            }, _OnMKCOLRewriteErrorEventHandler: function (_a70) {
                if (_a70.Error instanceof ITHit.WebDAV.Client.Exceptions.MethodNotAllowedException) {
                    return;
                }
            }, _OnResponse: function (_a71) {
                if (_a71.IsAborted) {
                    _a71 = ITHit.WebDAV.Client.CancellableResult.CreateAbortedResult(_a71.Error);
                    this._RequestContext.MarkAbort();
                } else {
                    _a71 = ITHit.WebDAV.Client.CancellableResult.CreateFromAsyncResultResult(_a71);
                    this._RequestContext.MarkFinish();
                }
                this._RaiseOnFinishEvent(_a71);
                this._RemoveRequestContextEventListeners();
            }, _CreatePutRequest: function (_a72) {
                var _a73 = this._RequestContext.CreateWebDavRequest(ITHit.WebDAV.Client.Encoder.Encode(this.Url.GetOrigin()), ITHit.WebDAV.Client.Encoder.Encode(this.Url.GetHref()));
                _a73.Method("PUT");
                if (_a72.GetFile().type) {
                    _a73.Headers.Add("Content-Type", _a72.GetFile().type);
                }
                _a73.BodyBinary(_a72.GetFile());
                this._SetDefaultHeaders(_a73);
                return _a73;
            }, _CreatePutAppendRequest: function (_a74) {
                var _a75 = this._RequestContext.CreateWebDavRequest(ITHit.WebDAV.Client.Encoder.Encode(this.Url.GetOrigin()), ITHit.WebDAV.Client.Encoder.Encode(this.Url.GetHref()));
                _a75.Method("PUT");
                if (_a74.GetFile().type) {
                    _a75.Headers.Add("Content-Type", _a74.GetFile().type);
                }
                if (_a74.IsPartFile()) {
                    _a75.Headers.Add("Content-Range", this._GetRangeHeader(_a74));
                    _a75.BodyBinary(_a74.GetSlice());
                } else {
                    _a75.BodyBinary(_a74.GetFile());
                }
                this._SetDefaultHeaders(_a75);
                return _a75;
            }, _GetRangeHeader: function (_a76) {
                return "bytes " + _a76.GetStart() + "-" + (_a76.GetEnd() - 1) + "/" + _a76.GetFullSize();
            }, _TransformToSuccess: function (_a77) {
                return new ITHit.WebDAV.Client.AsyncResult(_a77.Error, true, null);
            }, _IsConflictResult: function (_a78) {
                return _a78.Error instanceof ITHit.WebDAV.Client.Exceptions.MethodNotAllowedException;
            }, _RaiseOnProgressEvent: function (_a79) {
                ITHit.Events.DispatchEvent(this, self.EVENT_ON_PROGRESS, [{Progress: _a79, Uploader: this}]);
            }, _RaiseOnErrorEvent: function (_a7a) {
                ITHit.Events.DispatchEvent(this, self.EVENT_ON_ERROR, [{Error: _a7a, Uploader: this}]);
            }, _RaiseOnFinishEvent: function (_a7b) {
                ITHit.Events.DispatchEvent(this, self.EVENT_ON_FINISH, [{Uploader: this, Result: _a7b}]);
            }, _RaiseOnStartEvent: function () {
                ITHit.Events.DispatchEvent(this, self.EVENT_ON_START, [{Uploader: this}]);
            }, _OnProgressEventHandler: function (_a7c) {
                var iNow = new Date().getTime();
                if (iNow - this._LastReportTime > this._ReportPeriod || _a7c.Progress.BytesTotal === _a7c.Progress.BytesLoaded) {
                    this._RaiseOnProgressEvent(_a7c.Progress);
                    this._LastReportTime = iNow;
                }
            }, _OnErrorEventHandler: function (_a7e) {
                this._RaiseOnErrorEvent(_a7e.Error);
            }, _RemoveRequestContextEventListeners: function () {
                ITHit.Events.RemoveAllListeners(this._RequestContext, "OnUploadProgress");
                ITHit.Events.RemoveAllListeners(this._RequestContext, "OnError");
                delete this._RequestContext;
            }, _SetDefaultHeaders: function (_a7f) {
                _a7f.Headers.Add("If-Modified-Since", "Mon, 26 Jul 1997 05:00:00 GMT");
                _a7f.Headers.Add("X-Requested-With", "XMLHttpRequest");
            }, IsActive: function () {
                return !!this._RequestContext;
            }, _Session: null, _RequestContext: null, _ReportPeriod: 1000, _LastReportTime: 0
        }, {
            EVENT_ON_PROGRESS: "OnProgress",
            EVENT_ON_ERROR: "OnError",
            EVENT_ON_FINISH: "OnFinish",
            EVENT_ON_START: "OnStart"
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Path.Generator", null, {
            constructor: function (_a80) {
                this._Session = _a80;
                this._WorkList = new ITHit.WebDAV.Client.Upload.Collections.Map();
            }, _SendRequest: function (oUrl) {
                var _a82 = this._Session.CreateRequest(this.__className + ".GeneratePathAsync()");
                ITHit.WebDAV.Client.Methods.Mkcol.GoAsync(_a82, ITHit.WebDAV.Client.Encoder.Encode(oUrl.toString()), [], ITHit.WebDAV.Client.Encoder.Encode(oUrl.GetHost()), function (_a83) {
                    if (_a83.IsAborted) {
                        _a82.MarkAbort();
                    } else {
                        _a82.MarkFinish();
                    }
                    this._CallAwaiters(oUrl, _a83);
                }.bind(this));
                return _a82;
            }, _RecurrentGenerate: function (_a84, _a85, _a86, _a87) {
                var _a88 = null;
                var _a89 = null;
                var _a8a = function (_a8b, _a8c) {
                    if (!!_a88) {
                        _a88.AbortAsync(_a8b, _a8c);
                        return;
                    }
                    if (!!_a89) {
                        _a89(_a8b, _a8c);
                    }
                    _a8b.call(_a87);
                };
                var _a8d = _a85.slice();
                var _a8e = [];
                while (_a8d.length > 0) {
                    var oUrl = _a8d[0];
                    if (!_a84.Has(oUrl)) {
                        break;
                    }
                    _a8e.push(oUrl);
                    _a8d.splice(0, 1);
                }
                if (_a8d.length === 0) {
                    _a86.call(_a87, ITHit.WebDAV.Client.CancellableResult.CreateSuccessfulResult(_a8e));
                    return _a8a;
                }
                var _a90 = _a8d.shift();
                if (!this._IsInWork(_a90)) {
                    _a88 = this._SendRequest(_a90);
                }
                this._AddAwaiter(_a90, function (_a91) {
                    if (!_a91.IsSuccess && !this._IsConflictResult(_a91)) {
                        _a86.call(_a87, _a91);
                        return;
                    }
                    _a84.Add(_a90);
                    _a8e.push(oUrl);
                    _a88 = null;
                    _a89 = this._RecurrentGenerate(_a84, _a8d, function (_a92) {
                        if (_a92.IsSuccess || this._IsConflictResult(_a91)) {
                            _a92.Result.concat(_a8e);
                            _a92 = ITHit.WebDAV.Client.CancellableResult.CreateSuccessfulResult(_a8e);
                        }
                        _a89 = null;
                        _a86.call(_a87, _a92);
                        return;
                    }, this);
                }.bind(this));
                return _a8a;
            }, GeneratePathAsync: function (_a93, oUrl, _a95, _a96) {
                var _a97 = this._GetAncestorsPaths(oUrl);
                if (_a97.length === 0) {
                    return _a95.call(_a96, ITHit.WebDAV.Client.AsyncResult.CreateSuccessfulResult([]));
                }
                return this._RecurrentGenerate(_a93, _a97, _a95, _a96);
            }, _Session: null, _WorkList: null, _GetAncestorsPaths: function (oUrl) {
                var _a99 = oUrl.GetRelativePath().split("/");
                if (_a99.length === 0) {
                    return [];
                }
                if (_a99[_a99.length - 1] === "") {
                    _a99 = _a99.slice(0, -1);
                }
                var _a9a = [];
                var path = "";
                for (var i = 0; i < _a99.length - 1; i++) {
                    if (path !== "") {
                        path += "/";
                    }
                    path += _a99[i];
                    _a9a.push(new ITHit.WebDAV.Client.Upload.Utils.DavUrl(path, oUrl.GetBaseUrl()));
                }
                return _a9a;
            }, _IsInWork: function (oUrl) {
                var _a9e = this._WorkList.Get(oUrl.toString());
                return _a9e && (_a9e.length > 0);
            }, _AddAwaiter: function (oUrl, _aa0) {
                var _aa1 = this._WorkList.Get(oUrl.toString());
                var _aa2 = [];
                if (_aa1) {
                    _aa2 = _aa2.concat(_aa1);
                }
                _aa2.push(_aa0);
                this._WorkList.Set(oUrl.toString(), _aa2);
            }, _CallAwaiters: function (oUrl, _aa4) {
                var _aa5 = this._WorkList.Get(oUrl.toString());
                this._WorkList.Delete(oUrl.toString());
                _aa5.forEach(function (_aa6) {
                    _aa6(_aa4);
                });
            }, _IsConflictResult: function (_aa7) {
                if (_aa7.IsSuccess) {
                    return false;
                }
                if (_aa7.Error && _aa7.Error instanceof ITHit.WebDAV.Client.Exceptions.MethodNotAllowedException) {
                    return true;
                }
                return false;
            }
        });
    })();
    (function () {
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.UploaderSession", ITHit.WebDAV.Client.WebDavSession, {
            ExistsFolders: [], GetProgressReportAsync: function (sUrl, _aa9, _aaa) {
                var _aab = this.CreateRequest(this.__className + ".ReportAsync()");
                var _aac = ITHit.WebDAV.Client.Encoder.Encode(sUrl);
                var _aad = ITHit.WebDAV.Client.HierarchyItem.GetHost(_aac);
                ITHit.WebDAV.Client.Methods.Report.GoAsync(_aab, _aac, _aad, null, null, function (_aae) {
                    _aab.MarkFinish();
                    _aa9.call(_aaa, _aae);
                });
                return _aab;
            }, CancelUploadAsync: function (sUrl, _ab0) {
                var _ab1 = this.CreateRequest(this.__className + ".CancelUpload()");
                var _ab2 = ITHit.WebDAV.Client.Encoder.Encode(sUrl);
                var _ab3 = ITHit.WebDAV.Client.HierarchyItem.GetHost(_ab2);
                ITHit.WebDAV.Client.Methods.CancelUpload.GoAsync(_ab1, _ab2, [], _ab3, function (_ab4) {
                    _ab1.MarkFinish();
                    var _ab5 = new ITHit.WebDAV.Client.AsyncResult(true, true, null);
                    if (_ab4.Error instanceof ITHit.WebDAV.Client.Exceptions.NotFoundException) {
                        _ab5 = new ITHit.WebDAV.Client.AsyncResult(true, true, null);
                    } else {
                        if (!_ab4.IsSuccess) {
                            _ab5 = new ITHit.WebDAV.Client.AsyncResult(_ab4.IsSuccess, _ab4.IsSuccess, _ab4.Error);
                        }
                    }
                    _ab0(_ab5);
                });
                return _ab1;
            }, CheckExistsAsync: function (sUrl, _ab7, _ab8) {
                _ab7 = _ab7 || function () {
                };
                return this.OpenItemAsync(ITHit.WebDAV.Client.Encoder.Encode(sUrl), [], function (_ab9) {
                    var _aba = new ITHit.WebDAV.Client.AsyncResult(true, true, null);
                    if (_ab9.Error instanceof ITHit.WebDAV.Client.Exceptions.NotFoundException) {
                        _aba = new ITHit.WebDAV.Client.AsyncResult(false, true, null);
                    } else {
                        if (!_ab9.IsSuccess) {
                            _aba = new ITHit.WebDAV.Client.AsyncResult(_ab9.IsSuccess, _ab9.IsSuccess, _ab9.Error);
                        }
                    }
                    _ab7.call(_ab8, _aba);
                });
            }, DeleteAsync: function (_abb, _abc, _abd) {
                _abc = _abc || null;
                var _abe = ITHit.WebDAV.Client.Encoder.Encode(_abb);
                var _abf = ITHit.WebDAV.Client.HierarchyItem.GetHost(_abe);
                var _ac0 = this.CreateRequest(this.__className + ".DeleteAsync()");
                ITHit.WebDAV.Client.Methods.Delete.GoAsync(_ac0, _abe, _abc, _abf, function (_ac1) {
                    if (!_ac1.IsSuccess && _ac1.Error instanceof ITHit.WebDAV.Client.Exceptions.NotFoundException) {
                        _ac1 = new ITHit.WebDAV.Client.AsyncResult(true, true, null);
                    }
                    _ac0.MarkFinish();
                    _abd(_ac1);
                });
                return _ac0;
            }, CreateFolderRangeAsync: function (_ac2, _ac3, _ac4, _ac5) {
                _ac3 = _ac3 || null;
                _ac4 = _ac4 || ITHit.Utils.NoOp;
                var _ac6 = _ac2.length;
                var _ac7 = this.CreateRequest(this.__className + ".CreateFolderRangeAsync()", _ac6);
                this._PerformCreateFolderRangeMethodAsync(_ac7, _ac2, _ac3, function (_ac8) {
                    _ac7.MarkFinish();
                    _ac4.call(_ac5, _ac8);
                });
                return _ac7;
            }, _PerformCreateFolderRangeMethodAsync: function (_ac9, _aca, _acb, _acc, _acd) {
                _acc = _acc || ITHit.Utils.NoOp;
                _aca = _aca.slice();
                var _ace = _aca.unshift();
                var _acf = ITHit.WebDAV.Client.Encoder.Encode(_ace.GetHref());
                var _ad0 = ITHit.WebDAV.Client.Encoder.Encode(_ace.GetHost());
                ITHit.WebDAV.Client.Methods.Mkcol.GoAsync(_ac9, _acf, _acb, _ad0, function (_ad1) {
                    if (_ad1.IsSuccess || _ad1.Error instanceof ITHit.WebDAV.Client.Exceptions.MethodNotAllowedException) {
                        _ad1 = new ITHit.WebDAV.Client.AsyncResult.CreateSuccessfulResult([_ace]);
                    }
                    if (_aca.length > 0 && _ad1.IsSuccess) {
                        this._PerformCreateFolderRangeMethodAsync(_ac9, _aca, _acb, function (_ad2) {
                            if (_ad2.IsSuccess) {
                                _ad2.Result.push(_ace);
                            }
                            _acc.call(_acd, _ad2);
                            return;
                        }, this);
                    } else {
                        _acc.call(_acd, _ad1);
                        return;
                    }
                });
            }, CreateUploadLocation: function (oUrl) {
                return new ITHit.WebDAV.Client.Upload.UploadLocation(this.GetPathGenerator(), oUrl);
            }, CreateContentWriter: function (oUrl) {
                return new ITHit.WebDAV.Client.Upload.ContentWriter(this, oUrl);
            }, GetPathGenerator: function () {
                if (!this._PathGenerator) {
                    this._PathGenerator = new ITHit.WebDAV.Client.Upload.Path.Generator(this);
                }
                return this._PathGenerator;
            }, _PathGenerator: null
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Utils.RepeatableActionContext", null, {
            _RoundsCount: 0,
            _IsActive: true,
            _Handler: null,
            _EndHandler: null,
            _RepeatTime: 0,
            constructor: function (_ad5, _ad6, _ad7, _ad8) {
                this._RoundsCount = _ad5;
                this._Handler = _ad7;
                this._EndHandler = _ad8;
                this._IsActive = !!_ad5;
                this._RepeatTime = _ad6;
            },
            Stop: function (_ad9) {
                this._IsActive = false;
                this._RoundsCount = 0;
                this._EndHandler(_ad9);
            },
            _RunRound: function () {
                if (this._IsActive) {
                    this._Handler(this);
                } else {
                    this.Stop();
                }
            },
            EndRound: function (_ada) {
                this._RoundsCount--;
                if (this._RoundsCount === 0) {
                    this.Stop(_ada);
                } else {
                    setTimeout(this._RunRound.bind(this), this._RepeatTime);
                }
            }
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Utils.RepeatableAction", null, {
            _Action: null,
            constructor: function (_adb) {
                this._Action = _adb;
            },
            RunAsync: function (_adc, _add, _ade) {
                var _adf = new ITHit.WebDAV.Client.Upload.Utils.RepeatableActionContext(_adc, _add, this._Action, _ade);
                _adf._RunRound();
            }
        });
    })();
    (function () {
        "use strict";
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Events.UploadError", ITHit.WebDAV.Client.Upload.Events.AsyncEvent, {
            Error: null,
            Skip: function () {
                if (this._IsHandled) {
                    return;
                }
                this._SkipRetry(this.Items);
            },
            Retry: function () {
                if (this._IsHandled) {
                    return;
                }
                this._Retry(this.Items);
            },
            constructor: function (_ae1, _ae2, _ae3) {
                this.Name = ITHit.WebDAV.Client.Upload.Events.EventName.OnUploadError;
                this.Error = _ae2;
                this._super(_ae1, _ae3);
            },
            _Retry: function () {
                this._Handle(self.GetRetryResult(this.Error));
            },
            _SkipRetry: function () {
                this._Handle(self.GetSkipResult(this.Error));
            }
        }, {
            GetSkipResult: function (_ae4) {
                return {Action: "skip", Error: _ae4};
            }, GetRetryResult: function (_ae5) {
                return {Action: "retry", Error: _ae5};
            }
        });
    })();
    (function () {
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Events.Error", ITHit.WebDAV.Client.Upload.Events.BaseEvent, {
            Error: null,
            constructor: function (_ae6, _ae7) {
                this.Name = ITHit.WebDAV.Client.Upload.Events.EventName.OnError;
                this.Error = _ae7;
                this.Sender = _ae6;
            }
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.States.BaseState", null, {
            OnEnter: function (_ae8) {
            }, OnLeave: function (_ae9) {
            }, StartUploadAsync: function (_aea, _aeb) {
                _aeb();
            }, PauseUpload: function (_aec, _aed) {
                _aed();
            }, AbortUpload: function (_aee, _aef, _af0, _af1) {
                _af1();
            }, Skip: function (_af2) {
            }, OnUploadLocationPrepared: function (_af3, _af4) {
            }, OnUploadProgressPrepared: function (_af5, _af6) {
            }, OnContentCompleted: function (_af7, _af8) {
            }, OnRetryResult: function (_af9, _afa) {
            }
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.States.CompletedState", ITHit.WebDAV.Client.Upload.States.BaseState, {
            GetAsEnum: function () {
                return ITHit.WebDAV.Client.Upload.State.Completed;
            }, OnEnter: function (_afb) {
                _afb.GetProgressTracker().StopTracking();
                _afb.GetProgressTracker().SetCompleted();
            }, StartUploadAsync: function (_afc, _afd) {
                _afc.SetState(ITHit.WebDAV.Client.Upload.States.Factory.GetUploadingState());
                this._super(_afc, _afd);
            }
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.States.SkippedState", ITHit.WebDAV.Client.Upload.States.BaseState, {
            GetAsEnum: function () {
                return ITHit.WebDAV.Client.Upload.State.Skipped;
            }, StartUploadAsync: function (_afe, _aff) {
                _afe.SetState(ITHit.WebDAV.Client.Upload.States.Factory.GetUploadingState());
                this._super(_afe, _aff);
            }
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.States.QueuedState", ITHit.WebDAV.Client.Upload.States.BaseState, {
            GetAsEnum: function () {
                return ITHit.WebDAV.Client.Upload.State.Queued;
            }, StartUploadAsync: function (_b00, _b01) {
                _b00.SetState(ITHit.WebDAV.Client.Upload.States.Factory.GetUploadingState());
                this._super(_b00, _b01);
            }, Skip: function (_b02) {
                _b02.SetState(ITHit.WebDAV.Client.Upload.States.Factory.GetSkippedState());
            }, AbortUpload: function (_b03, _b04, _b05, _b06) {
                _b03.SetState(ITHit.WebDAV.Client.Upload.States.Factory.GetCanceledState());
                this._super(_b03, _b04, _b05, _b06);
            }
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.States.CanceledState", ITHit.WebDAV.Client.Upload.States.BaseState, {
            GetAsEnum: function () {
                return ITHit.WebDAV.Client.Upload.State.Canceled;
            }, OnEnter: function (_b07) {
                _b07.GetProgressTracker().StopTracking();
                _b07.GetProgressTracker().Reset();
            }, StartUploadAsync: function (_b08, _b09) {
                _b08.SetState(ITHit.WebDAV.Client.Upload.States.Factory.GetUploadingState());
                this._super(_b08, _b09);
            }
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.States.UploadingState", ITHit.WebDAV.Client.Upload.States.BaseState, {
            GetAsEnum: function () {
                return ITHit.WebDAV.Client.Upload.State.Uploading;
            }, OnEnter: function (_b0a) {
                _b0a.PrepareUploadLocation();
            }, _PauseCompletedAsync: function (_b0b, _b0c, _b0d) {
                if (_b0b.IsRetrySchedule) {
                    _b0b.IsRetrySchedule = false;
                }
                _b0b.SetState(ITHit.WebDAV.Client.Upload.States.Factory.GetPausedState());
                _b0c.call(_b0d);
            }, PauseUpload: function (_b0e, _b0f) {
                _b0e._ProgressTracker.StopTracking();
                _b0e.CancelAllRequests(function () {
                    if (_b0e.IsContentSend) {
                        _b0e.SyncProgressWithServerAsync(function (_b10) {
                            this._PauseCompletedAsync(_b0e, _b0f);
                        }, this);
                        return;
                    }
                    this._PauseCompletedAsync(_b0e, _b0f);
                }, this);
            }, AbortUpload: function (_b11, _b12, _b13, _b14) {
                _b11.CancelAllRequests(function () {
                    _b11.GetProgressTracker().StopTracking();
                    _b11.CancelAndDeleteAsync(_b12, _b13, function (_b15) {
                        if (_b15.IsSuccess) {
                            _b11.GetProgressTracker().Reset();
                            _b11.SetState(ITHit.WebDAV.Client.Upload.States.Factory.GetCanceledState());
                        } else {
                            _b11.AddError(_b15.Error);
                            _b11.SetState(ITHit.WebDAV.Client.Upload.States.Factory.GetFailedState());
                        }
                        _b14();
                    }, this);
                }, this);
            }, OnContentCompleted: function (_b16, _b17) {
                var _b18 = _b17.Result;
                if (_b18.IsAborted) {
                    return;
                }
                if (_b18.IsSuccess) {
                    _b16.GetProgressTracker().SetCompleted();
                    _b16.SetState(ITHit.WebDAV.Client.Upload.States.Factory.GetCompletedState());
                    return;
                }
                this._HandleError(_b16, _b18);
            }, _HandleError: function (_b19, _b1a) {
                _b19.AddError(_b1a.Error);
                _b19.BeginRetry(_b1a.Error);
            }, OnRetryResult: function (_b1b, _b1c) {
                if (_b1c.Action === "skip") {
                    _b1b.AddError(_b1c.Error);
                    _b1b.SetState(ITHit.WebDAV.Client.Upload.States.Factory.GetFailedState());
                    return;
                }
                if (_b1b.IsContentSend) {
                    _b1b.SyncProgressWithServerAsync(function (_b1d) {
                        if (_b1d.Error) {
                            this._HandleError(_b1c.Error);
                        } else {
                            this.OnEnter(_b1b);
                        }
                    }, this);
                    return;
                }
                this.OnEnter(_b1b);
            }, OnUploadLocationPrepared: function (_b1e, _b1f) {
                if (_b1f.IsAborted) {
                    return;
                }
                if (!_b1f.IsSuccess) {
                    this._HandleError(_b1e, _b1f);
                    return;
                }
                _b1e._SendContent();
            }
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.States.ResumeState", ITHit.WebDAV.Client.Upload.States.UploadingState, {
            OnEnter: function (_b20) {
                if (_b20.IsContentSend) {
                    _b20.PrepareProgress();
                    return;
                }
                this._super(_b20);
            }, OnUploadProgressPrepared: function (_b21, _b22) {
                if (_b22.IsAborted) {
                    return;
                }
                if (!_b22.IsSuccess) {
                    this._HandleError(_b21, _b22);
                    return;
                }
                if (_b21.GetProgressTracker().IsCompleted()) {
                    _b21.SetState(ITHit.WebDAV.Client.Upload.States.Factory.GetCompletedState());
                }
                _b21._SendContent();
            }
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.States.PausedState", ITHit.WebDAV.Client.Upload.States.BaseState, {
            GetAsEnum: function () {
                return ITHit.WebDAV.Client.Upload.State.Paused;
            }, OnEnter: function (_b23) {
                _b23.GetProgressTracker().StopTracking();
                _b23.GetProgressTracker().ResetSpeed();
            }, StartUploadAsync: function (_b24, _b25) {
                _b24.SetState(ITHit.WebDAV.Client.Upload.States.Factory.GetResumeState());
                this._super(_b24, _b25);
            }, AbortUpload: function (_b26, _b27, _b28, _b29) {
                if (_b26.IsContentSend) {
                    _b26.CancelAndDeleteAsync(_b27, _b28, function (_b2a) {
                        if (_b2a.IsSuccess) {
                            _b26.SetState(ITHit.WebDAV.Client.Upload.States.Factory.GetCanceledState());
                        } else {
                            _b26.AddError(_b2a.Error);
                            _b26.SetState(ITHit.WebDAV.Client.Upload.States.Factory.GetFailedState());
                        }
                        _b29();
                    }, this);
                } else {
                    _b26.SetState(ITHit.WebDAV.Client.Upload.States.Factory.GetCanceledState());
                    _b29();
                }
            }
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.States.FailedState", ITHit.WebDAV.Client.Upload.States.BaseState, {
            GetAsEnum: function () {
                return ITHit.WebDAV.Client.Upload.State.Failed;
            }, OnEnter: function (_b2b) {
                _b2b.GetProgressTracker().StopTracking();
                _b2b.GetProgressTracker().ResetSpeed();
            }, StartUploadAsync: function (_b2c, _b2d) {
                _b2c.SetState(ITHit.WebDAV.Client.Upload.States.Factory.GetUploadingState());
                this._super(_b2c, _b2d);
            }, AbortUpload: function (_b2e, _b2f, _b30, _b31) {
                if (_b2e.IsContentSend) {
                    _b2e.CancelAndDeleteAsync(_b2f, _b30, function (_b32) {
                        if (_b32.IsSuccess) {
                            _b2e.SetState(ITHit.WebDAV.Client.Upload.States.Factory.GetCanceledState());
                        } else {
                            _b2e.AddError(_b32.Error);
                            _b2e.SetState(ITHit.WebDAV.Client.Upload.States.Factory.GetFailedState());
                        }
                        _b31();
                    }, this);
                } else {
                    _b2e.SetState(ITHit.WebDAV.Client.Upload.States.Factory.GetCanceledState());
                    _b31();
                }
            }
        });
    })();
    (function () {
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Settings", null, {
            ConcurrentUploads: 2,
            State: ITHit.WebDAV.Client.Upload.State.Queued,
            DeleteOnCancel: true
        });
    })();
    (function () {
        "use strict";
        var self = ITHit.DefineClass("ITHit.WebDAV.Client.Upload.States.Factory", null, {}, {
            GetUploadingState: function () {
                if (!self._UploadingState) {
                    self._UploadingState = new ITHit.WebDAV.Client.Upload.States.UploadingState();
                }
                return self._UploadingState;
            }, GetSkippedState: function () {
                if (!self._SkippedState) {
                    self._SkippedState = new ITHit.WebDAV.Client.Upload.States.SkippedState();
                }
                return self._SkippedState;
            }, GetQueuedState: function () {
                if (!self._QueuedState) {
                    self._QueuedState = new ITHit.WebDAV.Client.Upload.States.QueuedState();
                }
                return self._QueuedState;
            }, GetPausedState: function () {
                if (!self._PausedState) {
                    self._PausedState = new ITHit.WebDAV.Client.Upload.States.PausedState();
                }
                return self._PausedState;
            }, GetFailedState: function () {
                if (!self._FailedState) {
                    self._FailedState = new ITHit.WebDAV.Client.Upload.States.FailedState();
                }
                return self._FailedState;
            }, GetCompletedState: function () {
                if (!self._CompletedState) {
                    self._CompletedState = new ITHit.WebDAV.Client.Upload.States.CompletedState();
                }
                return self._CompletedState;
            }, GetCanceledState: function () {
                if (!self._CanceledState) {
                    self._CanceledState = new ITHit.WebDAV.Client.Upload.States.CanceledState();
                }
                return self._CanceledState;
            }, GetResumeState: function () {
                if (!self._ResumeState) {
                    self._ResumeState = new ITHit.WebDAV.Client.Upload.States.ResumeState();
                }
                return self._ResumeState;
            }, GetState: function (_b34) {
                switch (_b34) {
                    case ITHit.WebDAV.Client.Upload.State.Canceled:
                        return self.GetCanceledState();
                    case ITHit.WebDAV.Client.Upload.State.Completed:
                        return self.GetCompletedState();
                    case ITHit.WebDAV.Client.Upload.State.Failed:
                        return self.GetFailedState();
                    case ITHit.WebDAV.Client.Upload.State.Paused:
                        return self.GetPausedState();
                    case ITHit.WebDAV.Client.Upload.State.Queued:
                        return self.GetQueuedState();
                    case ITHit.WebDAV.Client.Upload.State.Skipped:
                        return self.GetSkippedState();
                    case ITHit.WebDAV.Client.Upload.State.Uploading:
                        return self.GetUploadingState();
                    default:
                        throw new ITHit.Exceptions.ArgumentException(null, "oState");
                }
            }
        });
    })();
    (function () {
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.ItemSettings", null, {
            ForceRewrite: false,
            AlwaysRewriteFolders: true,
            IgnoreCancelErrors: false,
            DeleteOnCancel: false
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.ServerItem", null, {
            constructor: function (_b35, oUrl) {
                this._Session = _b35;
                this._Url = oUrl;
            }, GetProgressAsync: function (_b37, _b38) {
                return this._Session.GetProgressReportAsync(this._Url.GetHref(), function (_b39) {
                    if (_b39.IsSuccess && _b39.Result[0]) {
                        var _b3a = _b39.Result[0];
                        _b37.call(_b38, ITHit.WebDAV.Client.AsyncResult.CreateSuccessfulResult(_b3a));
                        return;
                    }
                    _b37.call(_b38, _b39);
                }, this);
            }, CancelUploadAsync: function (_b3b, _b3c) {
                this._Session.CancelUploadAsync(this._Url.GetHref(), function (_b3d) {
                    _b3b.call(_b3c, _b3d);
                });
            }, DeleteAsync: function (_b3e, _b3f, _b40, _b41) {
                var that = this;
                var _b43 = new ITHit.WebDAV.Client.Upload.Utils.RepeatableAction(function (_b44) {
                    that._Session.DeleteAsync(that._Url.GetHref(), null, function (_b45) {
                        if (_b45.IsSuccess) {
                            _b44.Stop(_b45);
                        } else {
                            _b44.EndRound(_b45);
                        }
                    });
                });
                _b43.RunAsync(_b3e, _b3f, function (_b46) {
                    _b40.call(_b41, _b46);
                });
            }, CancelAndDeleteAsync: function (_b47, _b48, _b49, _b4a) {
                this.CancelUploadAsync(function (_b4b) {
                    if (!_b4b.IsSuccess) {
                        return _b49.call(_b4a, _b4b);
                    }
                    this.DeleteAsync(_b47, _b48, _b49, _b4a);
                }, this);
            }, _Url: null, _Session: null
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Providers.UploadProvider", null, {
            Session: null, _UploadItem: null, constructor: function (_b4c, _b4d, _b4e, oUrl, _b50) {
                this.FSEntry = _b4e;
                this.Url = oUrl;
                this.Settings = new ITHit.WebDAV.Client.Upload.ItemSettings();
                if (this.FSEntry.IsFile()) {
                    this.Settings.DeleteOnCancel = _b50.DeleteOnCancel;
                } else {
                    this.Settings.DeleteOnCancel = false;
                }
                this.Session = _b4c;
                this._UploadItem = _b4d;
                this._ProgressTracker = new ITHit.WebDAV.Client.Upload.Providers.ProgressTracker(this.FSEntry.GetSize());
                this._State = ITHit.WebDAV.Client.Upload.States.Factory.GetState(_b50.State);
                this.Errors = [];
                this.UploadLocation = _b4c.CreateUploadLocation(this.Url);
                this.ServerItem = new ITHit.WebDAV.Client.Upload.ServerItem(_b4c, this.Url);
                this.ContentWriter = _b4c.CreateContentWriter(this.Url);
                this.ContentWriter.AddListener(ITHit.WebDAV.Client.Upload.ContentWriter.EVENT_ON_PROGRESS, this.OnRequestProgressEventHandler, this);
                this.ContentWriter.AddListener(ITHit.WebDAV.Client.Upload.ContentWriter.EVENT_ON_FINISH, this._LoadHandler, this);
                this.ContentWriter.AddListener(ITHit.WebDAV.Client.Upload.ContentWriter.EVENT_ON_START, this._StartLoadHandler, this);
                this._ProgressTracker.OnProgressChanged(this._SetProgress, this);
            }, StartUploadAsync: function (_b51) {
                this._BeginStateChange();
                this._State.StartUploadAsync(this, _b51);
            }, PauseUpload: function (_b52) {
                this._BeginStateChange();
                this._State.PauseUpload(this, _b52);
            }, AbortUpload: function (_b53, _b54, _b55) {
                this._BeginStateChange();
                _b55 = _b55 || function () {
                };
                this._State.AbortUpload(this, _b53, _b54, _b55);
            }, Skip: function () {
                this._BeginStateChange();
                this._State.Skip(this);
            }, GetGroup: function () {
                return this._UploadItem.GetGroup();
            }, GetProgressTracker: function () {
                return this._ProgressTracker;
            }, _ProgressTracker: null, AddListener: function (_b56, _b57, _b58) {
                this._ValidateEventName(_b56);
                _b58 = _b58 || null;
                ITHit.Events.AddListener(this, _b56, _b57, _b58);
            }, RemoveListener: function (_b59, _b5a, _b5b) {
                this._ValidateEventName(_b59);
                _b5b = _b5b || null;
                ITHit.Events.RemoveListener(this, _b59, _b5a, _b5b);
            }, _ValidateEventName: function (_b5c) {
                switch (_b5c) {
                    case ITHit.WebDAV.Client.Upload.Events.EventName.OnStateChanged:
                    case ITHit.WebDAV.Client.Upload.Events.EventName.OnError:
                    case ITHit.WebDAV.Client.Upload.Events.EventName.OnProgressChanged:
                        break;
                    default:
                        throw new ITHit.Exceptions.ArgumentException("Not found event name `" + _b5c + "`");
                }
            }, CheckRetryAsync: function (_b5d, _b5e, _b5f) {
                var _b60 = new ITHit.WebDAV.Client.Upload.Events.UploadError(this._UploadItem, _b5d, function (_b61) {
                    if (!this.IsRetrySchedule) {
                        return;
                    }
                    _b5e.call(_b5f, _b61);
                }.bind(this));
                if (!this._UploadItem.OnUploadErrorCallback && (ITHit.Events.ListenersLength(this._UploadItem, _b60.Name) === 0)) {
                    _b5e.call(_b5f, ITHit.WebDAV.Client.Upload.Events.UploadError.GetSkipResult(_b5d));
                    return;
                }
                this.IsRetrySchedule = true;
                if (this._UploadItem.OnUploadErrorCallback) {
                    this._UploadItem.OnUploadErrorCallback.call(this, _b60);
                }
                ITHit.Events.DispatchEvent(this._UploadItem, _b60.Name, _b60);
            }, Errors: null, LastError: null, AddError: function (_b62) {
                this.AddErrorSilent(_b62);
                this._RiseOnErrorEvent(_b62);
            }, AddErrorSilent: function (_b63) {
                this.LastError = _b63;
                this.Errors.push(_b63);
            }, SetFailed: function (_b64) {
                var _b65 = ITHit.WebDAV.Client.Upload.States.Factory.GetFailedState();
                this.AddError(_b64);
                this.SetState(_b65);
            }, _RiseOnErrorEvent: function (_b66) {
                var _b67 = new ITHit.WebDAV.Client.Upload.Events.Error(this, _b66);
                ITHit.Events.DispatchEvent(this, _b67.Name, _b67);
            }, UploadLocation: null, IsContentSend: false, ServerItem: null, _LoadHandler: function (_b68) {
                if (_b68.Result.Error instanceof ITHit.WebDAV.Client.Exceptions.ConflictException) {
                    this.UploadLocation.SetNotExists();
                    this.IsContentSend = false;
                }
                this._State.OnContentCompleted(this, _b68);
            }, _StartLoadHandler: function (_b69) {
                this.IsContentSend = true;
            }, OnRequestProgressEventHandler: function (_b6a) {
                this.GetProgressTracker().UpdateBytes(_b6a.Progress.BytesLoaded, _b6a.Progress.TotalBytes);
            }, _SendContent: function () {
                this._ProgressTracker.StartTracking();
                if (this.FSEntry.IsFolder()) {
                    if (this.Settings.ForceRewrite || this.Settings.AlwaysRewriteFolders) {
                        this.ContentWriter.BeginRewrite(this.FSEntry);
                    } else {
                        this.ContentWriter.BeginWrite(this.FSEntry);
                    }
                } else {
                    var _b6b = new ITHit.WebDAV.Client.Upload.FileSpan(this.FSEntry.GetFile(), this._ProgressTracker.GetProgress().UploadedBytes);
                    if (_b6b.IsFullFile() && (this.Settings.ForceRewrite || this.IsContentSend)) {
                        this.ContentWriter.BeginRewrite(this.FSEntry);
                        return;
                    }
                    if (_b6b.IsFullFile() && !(this.Settings.ForceRewrite && this.IsContentSend)) {
                        this.ContentWriter.BeginWrite(this.FSEntry);
                        return;
                    }
                    this.ContentWriter.BeginAppend(_b6b);
                }
            }, SyncProgressWithServerAsync: function (_b6c, _b6d) {
                if (!this._ProgressTracker.IsCountable()) {
                    return this.Session.CheckExistsAsync(this.Url.GetUrl(), function (_b6e) {
                        if (!_b6e.IsSuccess) {
                            _b6c.call(_b6d, _b6e);
                            return;
                        }
                        if (_b6e.Result === true) {
                            this._ProgressTracker.SetCompleted();
                            _b6c.call(_b6d, ITHit.WebDAV.Client.CancellableResult.CreateSuccessfulResult(this._ProgressTracker.GetProgress()));
                            return;
                        }
                        this._ProgressTracker.Reset();
                        _b6c.call(_b6d, ITHit.WebDAV.Client.CancellableResult.CreateSuccessfulResult(this._ProgressTracker.GetProgress()));
                    }, this);
                }
                return this.ServerItem.GetProgressAsync(function (_b6f) {
                    if (_b6f.IsSuccess) {
                        this._ProgressTracker.SyncProgress(_b6f.Result);
                        _b6c.call(_b6d, ITHit.WebDAV.Client.CancellableResult.CreateSuccessfulResult(this._ProgressTracker.GetProgress()));
                        return;
                    }
                    if (_b6f.Error instanceof ITHit.WebDAV.Client.Exceptions.NotFoundException) {
                        this._ProgressTracker.Reset();
                        _b6c.call(_b6d, ITHit.WebDAV.Client.CancellableResult.CreateSuccessfulResult(this._ProgressTracker.GetProgress()));
                        return;
                    }
                    _b6c.call(_b6d, ITHit.WebDAV.Client.CancellableResult.CreateFailedResult(_b6f.Error));
                }, this);
            }, IsRetrySchedule: false, PrepareUploadLocation: function () {
                this.UploadLocation.SetCache(this.GetGroup().PathMap);
                this.UploadLocation.CreateAsync(this._OnGeneratePathCompleted, this);
            }, _OnGeneratePathCompleted: function (_b70) {
                if (_b70.IsAborted) {
                    return;
                }
                this._State.OnUploadLocationPrepared(this, _b70);
            }, CancelAllRequests: function (_b71, _b72) {
                this._CancelProgressAsync(function () {
                    this._CancelLocationCreateAsync(function () {
                        this._CancelContentSendingAsync(_b71, _b72);
                    }, this);
                }, this);
            }, _CancelLocationCreateAsync: function (_b73, _b74) {
                if (this.UploadLocation.IsInProgress()) {
                    this.UploadLocation.AbortRunningCreationAsync(function () {
                        _b73.call(_b74);
                    }, this);
                } else {
                    _b73.call(_b74);
                }
            }, _CancelContentSendingAsync: function (_b75, _b76) {
                if (this.ContentWriter.IsActive()) {
                    this.ContentWriter.AbortAsync(function () {
                        _b75.call(_b76);
                    }, this);
                } else {
                    _b75.call(_b76);
                }
            }, _CancelProgressAsync: function (_b77, _b78) {
                if (this.IsProgressSyncInProgress) {
                    this._SyncProgressRequest.AbortAsync(function () {
                        _b77.call(_b78);
                    }, this);
                } else {
                    _b77.call(_b78);
                }
            }, _SyncProgressRequest: null, IsProgressSyncInProgress: false, PrepareProgress: function () {
                this._SyncProgressRequest = this.SyncProgressWithServerAsync(this._OnUpdateFromServerCompleted, this);
            }, _OnUpdateFromServerCompleted: function (_b79) {
                this.IsProgressSyncInProgress = false;
                if (_b79.IsAborted) {
                    return;
                }
                this._State.OnUploadProgressPrepared(this, _b79);
            }, _IsStateChanging: function () {
                return this._IsChanging;
            }, SetState: function (_b7a) {
                var _b7b = this._State;
                this._State.OnLeave(this);
                this._State = _b7a;
                this._State.OnEnter(this);
                var _b7c = new ITHit.WebDAV.Client.Upload.Events.StateChanged(this, _b7b.GetAsEnum(), this._State.GetAsEnum());
                ITHit.Events.DispatchEvent(this, _b7c.Name, _b7c);
            }, GetState: function () {
                return this._State;
            }, _State: null, _IsChanging: false, _BeginStateChange: function () {
                this._IsChanging = true;
            }, _EndStateChange: function () {
                this._IsChanging = false;
            }, ContentWriter: null, BeginRetry: function (_b7d) {
                this._ProgressTracker.StopTracking();
                this.CheckRetryAsync(_b7d, this._OnCheckRetryCompleted, this);
            }, _OnCheckRetryCompleted: function (_b7e) {
                this._State.OnRetryResult(this, _b7e);
            }, Settings: null, FSEntry: null, Url: null, CancelAndDeleteAsync: function (_b7f, _b80, _b81, _b82) {
                this.ServerItem.CancelUploadAsync(function (_b83) {
                    if (!this.Settings.DeleteOnCancel) {
                        _b81.call(_b82, ITHit.WebDAV.Client.AsyncResult.CreateSuccessfulResult(null));
                        return;
                    }
                    this.ServerItem.DeleteAsync(_b7f, _b80, function (_b84) {
                        if (!_b84.IsSuccess && !this.Settings.IgnoreCancelErrors) {
                            return _b81.call(_b82, _b83);
                        }
                        this.IsContentSend = false;
                        _b81.call(_b82, ITHit.WebDAV.Client.AsyncResult.CreateSuccessfulResult(null));
                    }, this);
                }, this);
            }, GetProgress: function () {
                return this._ProgressTracker.GetProgress();
            }, _SetProgress: function (_b85) {
                var _b86 = this._Progress;
                this._Progress = _b85;
                var _b87 = new ITHit.WebDAV.Client.Upload.Events.ProgressChanged(this, _b86, _b85);
                ITHit.Events.DispatchEvent(this, _b87.Name, _b87);
            }
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Events.UploadItemsCreated", ITHit.WebDAV.Client.Upload.Events.AsyncEvent, {
            Items: [],
            Skip: function (_b88) {
                if (this._IsHandled) {
                    return;
                }
                this._Skip(_b88);
            },
            SkipAll: function () {
                if (this._IsHandled) {
                    return;
                }
                this._Skip(this.Items);
            },
            OverwriteAll: function () {
                if (this._IsHandled) {
                    return;
                }
                this._Overwrite(this.Items);
            },
            Overwrite: function (_b89) {
                if (this._IsHandled) {
                    return;
                }
                this._Overwrite(_b89);
            },
            UploadAll: function () {
                if (this._IsHandled) {
                    return;
                }
                this.Upload(this.Items);
            },
            Upload: function (_b8a) {
                if (this._IsHandled) {
                    return;
                }
                this._Handle({Skip: [], Overwrite: [], Original: this.Items, Upload: _b8a});
            },
            constructor: function (_b8b, _b8c, _b8d) {
                this.Name = ITHit.WebDAV.Client.Upload.Events.EventName.OnUploadItemsCreated;
                this.Items = _b8c || [];
                this._super(_b8b, _b8d);
            },
            _Overwrite: function (_b8e) {
                var _b8f = this._CreateResult([], _b8e);
                this._Handle(_b8f);
            },
            _Skip: function (_b90) {
                var _b91 = this._CreateResult(_b90, []);
                this._Handle(_b91);
            },
            _CreateResult: function (_b92, _b93) {
                return {Skip: _b92 || [], Overwrite: _b93 || [], Original: this.Items};
            },
            _Handle: function (_b94) {
                _b94 = _b94 || this._CreateResult();
                this._super(_b94);
            }
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Utils.Array", null, {}, {
            MapParallel: function (_b95, _b96, _b97, _b98) {
                var _b99 = [];
                var _b9a = 0;
                if (_b95.length === 0) {
                    setTimeout(_b97.apply(_b98, _b95));
                }
                for (var i = 0; i < _b95.length; i++) {
                    _b96.apply(_b98, [_b95[i], i, _b95, ITHit.Utils.MakeScopeClosure(this, function (i, _b9d) {
                        _b99[i] = _b9d;
                        _b9a++;
                        if (_b9a === _b95.length) {
                            setTimeout(_b97.call(_b98, _b99));
                        }
                    }, i)]);
                }
            }, DistinctBy: function (_b9e, _b9f, _ba0) {
                var map = Object.create(null);
                _b9f = _b9f || Object.prototype.toString;
                for (var i = 0; i < _b9e.length; i++) {
                    var _ba3 = _b9f.call(_ba0, _b9e[i]).toString();
                    if (!map[_ba3]) {
                        map[_ba3] = _b9e[i];
                    }
                }
                return Object.keys(map).map(function (sKey) {
                    return map[sKey];
                });
            }, Take: function (_ba5, _ba6) {
                if (!_ba6) {
                    return [_ba5.shift()];
                }
                var _ba7 = (_ba5.length > _ba6) ? _ba6 : _ba5.length;
                var _ba8 = [];
                for (var i = 0; i < _ba7; i++) {
                    _ba8.push(_ba5.shift());
                }
                return _ba8;
            }, Remove: function (_baa, _bab) {
                var _bac = _baa.indexOf(_bab);
                if (_bac > -1) {
                    _baa.splice(_bac, 1);
                }
            }
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.AutoUploader", null, {
            constructor: function (_bad) {
                this._ParallelUploads = _bad || 0;
                this._QueueArray = [];
                this._Active = [];
                this._Reserve = 0;
            }, AddRange: function (_bae) {
                _bae.forEach(this._AddToQueue, this);
                this._StartUploads();
            }, Add: function (_baf) {
                this._AddToQueue(_baf);
                this._StartUploads();
            }, Remove: function (_bb0) {
                _bb0.RemoveListener(ITHit.WebDAV.Client.Upload.Events.EventName.OnStateChanged, this._OnStateChangeEventHandler, this);
                ITHit.WebDAV.Client.Upload.Utils.Array.Remove(this._QueueArray, _bb0);
                ITHit.WebDAV.Client.Upload.Utils.Array.Remove(this._Active, _bb0);
                this._StartUploads();
            }, Reserve: function (_bb1) {
                _bb1 = _bb1 || 1;
                this._Reserve += _bb1;
            }, Release: function (_bb2) {
                _bb2 = _bb2 || 1;
                this._Reserve -= _bb2;
                this._StartUploads();
            }, GetBusy: function () {
                return this._Active.length + this._Reserve;
            }, GetFree: function () {
                var _bb3 = this.GetBusy();
                if (_bb3 >= this._ParallelUploads) {
                    return 0;
                } else {
                    if (_bb3 === 0) {
                        return this._ParallelUploads;
                    } else {
                        return (this._ParallelUploads - _bb3) % this._ParallelUploads;
                    }
                }
            }, _QueueArray: null, _Active: null, _ParallelUploads: 0, _OnStateChangeEventHandler: function (_bb4) {
                if (_bb4.NewState !== ITHit.WebDAV.Client.Upload.State.Uploading) {
                    this.Remove(_bb4.Sender);
                } else {
                    this._StartUploads();
                }
            }, _StartUploads: function () {
                if (this._QueueArray.length === 0) {
                    return;
                }
                var _bb5 = this.GetFree();
                if (_bb5 <= 0) {
                    return;
                }
                var _bb6 = ITHit.WebDAV.Client.Upload.Utils.Array.Take(this._QueueArray, _bb5);
                if (_bb6.length < 1) {
                    return;
                }
                this.Reserve(_bb6.length);
                _bb6.forEach(this._StartSingle, this);
            }, _StartSingle: function (_bb7) {
                this._Active.push(_bb7);
                _bb7.StartAsync();
                this.Release();
            }, _AddToQueue: function (_bb8) {
                this._QueueArray.push(_bb8);
                _bb8.AddListener(ITHit.WebDAV.Client.Upload.Events.EventName.OnStateChanged, this._OnStateChangeEventHandler, this);
            }, _Reserve: 0
        });
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Queue", null, {
            Uploader: null, _UnderlyingArray: null, _Session: null, _AutoUploader: null, constructor: function (_bb9) {
                this.Uploader = _bb9;
                this._Session = new ITHit.WebDAV.Client.Upload.UploaderSession();
                this._UnderlyingArray = [];
                this._GroupManager = new ITHit.WebDAV.Client.Upload.Groups.GroupManager();
                this._AutoUploader = new ITHit.WebDAV.Client.Upload.AutoUploader(this.Uploader.Settings.ConcurrentUploads);
            }, ShouldReplaceDuplicate: function (_bba) {
                var _bbb = this.GetByUrl(_bba.GetUrl());
                var _bbc = _bbb.GetState();
                return !(_bbc === ITHit.WebDAV.Client.Upload.State.Uploading || _bbc === ITHit.WebDAV.Client.Upload.State.Paused);
            }, AddGroup: function (sUrl, _bbe, _bbf) {
                var _bc0 = [];
                for (var i = 0; i < _bbe.length; i++) {
                    var _bc2 = _bbe[i];
                    var _bc3 = new ITHit.WebDAV.Client.Upload.UploadItem(sUrl, _bc2, _bbf, this._Session, this._GroupManager, this.Uploader.Settings);
                    if (this.HasUrl(_bc3.GetUrl())) {
                        if (this.ShouldReplaceDuplicate(_bc3)) {
                            this.RemoveByUrl(_bc3.GetUrl());
                        } else {
                            continue;
                        }
                    }
                    _bc0.push(_bc3);
                }
                this._DispatchOnUploadItemsCreatedAsync(_bc0, this._OnUploadItemsCreatedAsyncDispatched.bind(this));
            }, Add: function (_bc4) {
                var sUrl = _bc4.GetUrl();
                if (this.HasUrl(sUrl)) {
                    return;
                }
                this._UnderlyingArray.push(_bc4);
                var _bc6 = new ITHit.WebDAV.Client.Upload.Events.QueueChanged(this, [_bc4]);
                ITHit.Events.DispatchEvent(this, _bc6.Name, [_bc6]);
                this._AutoUploader.Add(_bc4);
            }, AddRange: function (_bc7) {
                for (var i = 0; i < _bc7.length; i++) {
                    var _bc9 = _bc7[i];
                    var sUrl = _bc9.GetUrl();
                    if (this.HasUrl(sUrl)) {
                        continue;
                    }
                    this._UnderlyingArray.push(_bc9);
                }
                this._GroupManager.CreateGroup(_bc7);
                this._OnQueueChanged(_bc7, null);
                var _bcb = _bc7.filter(function (_bcc) {
                    return _bcc.GetState() === ITHit.WebDAV.Client.Upload.State.Queued;
                });
                this._AutoUploader.AddRange(_bcb);
            }, Restart: function (_bcd) {
                for (var i = 0; i < _bcd.length; i++) {
                    if (!this.HasUrl(_bcd[i].GetUrl())) {
                        throw new ITHit.Exceptions.ArgumentException("Item should be a part of queue`");
                    }
                }
                this._AutoUploader.AddRange(_bcd);
            }, GetByUrl: function (sUrl) {
                return ITHit.Utils.FindBy(this._UnderlyingArray, function (_bd0) {
                    return _bd0.GetUrl() === sUrl;
                });
            }, GetLength: function () {
                return this._UnderlyingArray.length;
            }, HasUrl: function (sUrl) {
                return !!this.GetByUrl(sUrl);
            }, RemoveByUrl: function (sUrl) {
                var _bd3 = this.GetByUrl(sUrl);
                if (!_bd3) {
                    return;
                }
                var _bd4 = _bd3.GetState();
                if (_bd4 === ITHit.WebDAV.Client.Upload.State.Uploading || _bd4 === ITHit.WebDAV.Client.Upload.State.Paused) {
                    _bd3.Abort();
                }
                var _bd5 = ITHit.Utils.IndexOf(this._UnderlyingArray, _bd3);
                this._UnderlyingArray.splice(_bd5, 1);
                this._OnQueueChanged(null, [_bd3]);
                this._AutoUploader.Remove(_bd3);
            }, OnUploadItemsCreatedCallback: null, _OnQueueChanged: function (_bd6, _bd7) {
                var _bd8 = new ITHit.WebDAV.Client.Upload.Events.QueueChanged(this, _bd6, _bd7);
                ITHit.Events.DispatchEvent(this, _bd8.Name, [_bd8]);
            }, _DispatchOnUploadItemsCreatedAsync: function (_bd9, _bda) {
                var _bdb = new ITHit.WebDAV.Client.Upload.Events.UploadItemsCreated(this, _bd9.slice(), _bda);
                if (!this.OnUploadItemsCreatedCallback && (ITHit.Events.ListenersLength(this, _bdb.Name) === 0)) {
                    _bdb.OverwriteAll();
                }
                if (this.OnUploadItemsCreatedCallback) {
                    this.OnUploadItemsCreatedCallback(_bdb);
                }
                ITHit.Events.DispatchEvent(this, _bdb.Name, _bdb);
            }, AddListener: function (_bdc, _bdd, _bde) {
                _bde = _bde || null;
                switch (_bdc) {
                    case ITHit.WebDAV.Client.Upload.Events.EventName.OnQueueChanged:
                    case ITHit.WebDAV.Client.Upload.Events.EventName.OnUploadItemsCreated:
                        ITHit.Events.AddListener(this, _bdc, _bdd, _bde);
                        break;
                    default:
                        throw new ITHit.WebDAV.Client.Exceptions.WebDavException("Not found event name `" + _bdc + "`");
                }
            }, RemoveListener: function (_bdf, _be0, _be1) {
                ITHit.Events.RemoveListener(this, _bdf, _be0, _be1);
            }, _OnUploadItemsCreatedAsyncDispatched: function (_be2) {
                if (_be2.Upload) {
                    this.AddRange(_be2.Upload);
                    return;
                }
                this._OnUploadItemsCreatedAsyncDispatchedDeprecated(_be2);
            }, _OnUploadItemsCreatedAsyncDispatchedDeprecated: function (_be3) {
                var _be4 = this._FilterSkippedItems(_be3);
                var _be5 = this._CreateUrlUploadItemMap(_be3.Overwrite);
                _be4.forEach(function (_be6) {
                    if (_be5.Has(_be6.GetUrl())) {
                        _be6.SetOverwrite(true);
                    }
                });
                this.AddRange(_be4);
            }, _FilterSkippedItems: function (_be7) {
                var _be8 = this._CreateUrlUploadItemMap(_be7.Skip);
                return _be7.Original.filter(function (_be9) {
                    return !_be8.Has(_be9.GetUrl());
                });
            }, _CreateUrlUploadItemMap: function (_bea) {
                var oMap = new ITHit.WebDAV.Client.Upload.Collections.Map();
                _bea.forEach(function (_bec) {
                    oMap.Set(_bec.GetUrl(), _bec);
                });
                return oMap;
            }, _GroupManager: null
        });
    })();
    (function () {
        "use strict";
        var _bed = ITHit.DefineClass("ITHit.WebDAV.Client.Upload.DropZoneCollection", null, {
            _UnderlyingSet: null, Uploader: null, constructor: function (_bee) {
                this._Uploader = _bee;
                this._UnderlyingSet = {};
            }, AddById: function (_bef) {
                var _bf0 = this.GetById(_bef);
                if (_bf0) {
                    return _bf0;
                }
                var _bf1 = new ITHit.WebDAV.Client.Upload.Controls.DropZone(_bef);
                this._UnderlyingSet[_bef] = _bf1;
                this._RaiseOnCollectionChanged([_bf1], []);
                return _bf1;
            }, GetById: function (_bf2) {
                return this._UnderlyingSet[_bf2];
            }, RemoveById: function (_bf3) {
                var _bf4 = this.GetById(_bf3);
                if (_bf4) {
                    delete this._UnderlyingSet[_bf3];
                    this._RaiseOnCollectionChanged([], [_bf4]);
                }
            }, AddListener: function (_bf5, _bf6, _bf7) {
                _bf7 = _bf7 || null;
                this._CheckEventNameOtThrow(_bf5);
                ITHit.Events.AddListener(this, _bf5, _bf6, _bf7);
            }, RemoveListener: function (_bf8, _bf9, _bfa) {
                _bfa = _bfa || null;
                this._CheckEventNameOtThrow(_bf8);
                ITHit.Events.RemoveListener(this, _bf8, _bf9, _bfa);
            }, _CheckEventNameOtThrow: function (_bfb) {
                if (_bfb !== _bed.EVENT_ON_COLLECTION_CHANGED) {
                    throw new ITHit.WebDAV.Client.Exceptions.NotFoundEventNameException(_bfb);
                }
            }, _RaiseOnCollectionChanged: function (_bfc, _bfd) {
                ITHit.Events.DispatchEvent(this, _bed.EVENT_ON_COLLECTION_CHANGED, [{
                    Sender: this,
                    AddedItems: _bfc || [],
                    RemovedItems: _bfd || []
                }]);
            }
        }, {EVENT_ON_COLLECTION_CHANGED: "OnCollectionChanged"});
    })();
    (function () {
        var _bfe = ITHit.DefineClass("ITHit.WebDAV.Client.Upload.InputCollection", null, {
            _UnderlyingSet: null, Uploader: null, constructor: function (_bff) {
                this._UnderlyingArray = [];
                this._Uploader = _bff;
            }, AddById: function (_c00) {
                var _c01 = new ITHit.WebDAV.Client.Upload.Controls.Input(_c00);
                this._UnderlyingArray[_c00] = _c01;
                this._RaiseOnCollectionChanged([_c01], []);
                return _c01;
            }, GetById: function (_c02) {
                return this._UnderlyingArray[_c02];
            }, RemoveById: function (_c03) {
                var _c04 = this.GetById(_c03);
                if (_c04) {
                    delete this._UnderlyingSet[_c03];
                    this._RaiseOnCollectionChanged([], [_c04]);
                }
            }, AddListener: function (_c05, _c06, _c07) {
                _c07 = _c07 || null;
                this._CheckEventNameOtThrow(_c05);
                ITHit.Events.AddListener(this, _c05, _c06, _c07);
            }, RemoveListener: function (_c08, _c09, _c0a) {
                _c0a = _c0a || null;
                this._CheckEventNameOtThrow(_c08);
                ITHit.Events.RemoveListener(this, _c08, _c09, _c0a);
            }, _CheckEventNameOtThrow: function (_c0b) {
                if (_c0b !== _bfe.EVENT_ON_COLLECTION_CHANGED) {
                    throw new ITHit.WebDAV.Client.Exceptions.NotFoundEventNameException(_c0b);
                }
            }, _RaiseOnCollectionChanged: function (_c0c, _c0d) {
                ITHit.Events.DispatchEvent(this, _bfe.EVENT_ON_COLLECTION_CHANGED, [{
                    Sender: this,
                    AddedItems: _c0c || [],
                    RemovedItems: _c0d || []
                }]);
            }
        }, {EVENT_ON_COLLECTION_CHANGED: "OnCollectionChanged"});
    })();
    (function () {
        "use strict";
        ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Uploader", null, {
            DropZones: null,
            Inputs: null,
            Queue: null,
            Settings: null,
            _UploadProvider: null,
            constructor: function () {
                this.Inputs = new ITHit.WebDAV.Client.Upload.InputCollection(this);
                this.Inputs.AddListener(ITHit.WebDAV.Client.Upload.InputCollection.EVENT_ON_COLLECTION_CHANGED, this._OnControlCollectionChangedEventHandler, this);
                this.DropZones = new ITHit.WebDAV.Client.Upload.DropZoneCollection(this);
                this.DropZones.AddListener(ITHit.WebDAV.Client.Upload.DropZoneCollection.EVENT_ON_COLLECTION_CHANGED, this._OnControlCollectionChangedEventHandler, this);
                this.Settings = new ITHit.WebDAV.Client.Upload.Settings();
                this.Queue = new ITHit.WebDAV.Client.Upload.Queue(this);
            },
            SetUploadUrl: function (sUrl) {
                this._UploadUrl = sUrl;
            },
            GetUploadUrl: function () {
                return this._UploadUrl;
            },
            _OnControlCollectionChangedEventHandler: function (_c0f) {
                _c0f.AddedItems.forEach(function (_c10) {
                    _c10.AddListener(ITHit.WebDAV.Client.Upload.Controls.HtmlControl.EVENT_ON_FILE_INPUT_HANDLED, this._OnFileInputEventHandler.bind(this));
                }.bind(this));
                _c0f.RemovedItems.forEach(function (_c11) {
                    _c11.RemoveListener(ITHit.WebDAV.Client.Upload.Controls.HtmlControl.EVENT_ON_FILE_INPUT_HANDLED, this._OnFileInputEventHandler.bind(this));
                }.bind(this));
            },
            _OnFileInputEventHandler: function (_c12) {
                this.Queue.AddGroup(this._UploadUrl, _c12.AsyncResult.Result, _c12.Source);
            }
        });
    })();
    ITHit.Temp = {};
    eXo.ecm.ECMWebDav = ITHit;
    return {
        ECMWebDav: eXo.ecm.ECMWebDav
    };
})();