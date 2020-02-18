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
        ResponseDescription: "",
        Responses: null,
        TotalItems: null,
        constructor: function (_1fb, _1fc) {
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
            var oRes = ITHit.XPath.evaluate("/d:multistatus/d:response", _1fb, _1fd);
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
                var _218 = ITHit.WebDAV.Client.Methods.Propfind.createRequest(_20e, sUri, _210, _211, _212, _213, _215, _216, _217);
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
                var _235 = _234.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "propfind");
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
                var _243 = _241.GetResponseStream(_241);
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
                var _254 = ITHit.WebDAV.Client.Methods.ResponseFactory.GetResponse(_252, _253);
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
                _2a8.Headers.Add("Destination", ITHit.DecodeHost(_2a2));
                _2a8.Headers.Add("Overwrite", _2a5 ? "T" : "F");
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
                var _2bc = ITHit.WebDAV.Client.Methods.ResponseFactory.GetResponse(_2ba, _2bb);
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
                    var set = _2dc.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "set");
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
                var _2e7 = new ITHit.XPath.resolver();
                _2e7.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
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
                if (_2e8 = ITHit.XPath.selectSingleNode("d:locktoken", _2e5, _2e7)) {
                    var _2f3 = ITHit.XPath.selectSingleNode("d:href", _2e8, _2e7).firstChild().nodeValue();
                    _2f3 = _2f3.replace(ITHit.WebDAV.Client.DavConstants.OpaqueLockToken, "");
                    _2f2 = new ITHit.WebDAV.Client.LockUriTokenPair(_2e6, _2f3);
                }
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
                var _31b = _316.createElementNS(_317, "locktype");
                var _31c = _316.createElementNS(_317, "write");
                _31b.appendChild(_31c);
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
            var _31e = this.Response.GetResponseStream();
            var _31f = new ITHit.XPath.resolver();
            _31f.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
            var _320 = new ITHit.WebDAV.Client.Property(ITHit.XPath.selectSingleNode("/d:prop", _31e, _31f));
            try {
                var _321 = new ITHit.WebDAV.Client.LockInfo.ParseLockDiscovery(_320.Value, this.Href);
                if (_321.length !== 1) {
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.UnableToParseLockInfoResponse);
                }
                this.LockInfo = _321[0];
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
                var _339 = _331.CreateWebDavRequest(_335, _332, _338);
                _339.Method("LOCK");
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
                var _345 = new ITHit.WebDAV.Client.Methods.SingleResponse(_343);
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
                    var _364 = new ITHit.WebDAV.Client.Methods.Options(_361);
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
            var _36f = false;
            var _370 = _36a._Response.GetResponseHeader("ms-author-via", true);
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
                var _390 = ITHit.WebDAV.Client.Methods.Report.createRequest(_38a, _38b, _38c, _38d, _38e);
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
                    var _3dd = ITHit.WebDAV.Client.DavConstants.LockDiscovery.toString();
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
                    if (_40d.Value.getElementsByTagNameNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "collection").length > 0) {
                        _40e = ITHit.WebDAV.Client.ResourceType.Folder;
                    }
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
                var _494 = ITHit.WebDAV.Client.Methods.Delete.Go(_493, this.Href, _492, this.Host);
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
                var _4e8 = ITHit.WebDAV.Client.Methods.Unlock.Go(_4e7, this.Href, _4e6, this.Host);
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
                    self._GetExtensionPropertyAsync("", function (_549) {
                        if (!_549.IsSuccess) {
                            _548(_549);
                            return;
                        }
                        var _54a = _549.Result.split(",");
                        var _54b = ITHit.WebDAV.Client.MsOfficeEditExtensions.GetSchema(sExt);
                        _549.Result = ITHit.Utils.Contains(_54a, _54b);
                        _548(_549);
                    });
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
                    var _54d = "^data-" + this._ProtocolName + "-.*";
                    var _54e = new RegExp(_54d);
                    var _54f = document.documentElement.attributes;
                    var _550 = false;
                    for (var i = 0; i < _54f.length; i++) {
                        if (_54e.test(_54f[i].name)) {
                            _550 = true;
                            break;
                        }
                    }
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
                    var _55f = self._GetInstalledExtensionBiggestProtocolName();
                    var _560 = "data-" + _55f;
                    var _561 = _55d.length > 0 ? _560 + "-" + _55d : _560;
                    if (self._IsFailed()) {
                        var _562 = new ITHit.WebDAV.Client.AsyncResult(null, false, self._GetException());
                        _55e(_562);
                    } else {
                        if (self._IsPending()) {
                            setTimeout(function () {
                                if (self._IsPending()) {
                                    var _563 = new ITHit.WebDAV.Client.AsyncResult(null, false, self._GetTimeoutException());
                                    _55e(_563);
                                    return;
                                }
                                if (self._IsFailed()) {
                                    var _563 = new ITHit.WebDAV.Client.AsyncResult(null, false, self._GetException());
                                    _55e(_563);
                                    return;
                                }
                                var _563 = new ITHit.WebDAV.Client.AsyncResult(document.documentElement.getAttribute(_561), true, null);
                                _55e(_563);
                            }, self.TimeOut);
                        } else {
                            var _562 = new ITHit.WebDAV.Client.AsyncResult(document.documentElement.getAttribute(_561), true, null);
                            _55e(_562);
                        }
                    }
                },
                _IsPending: function () {
                    var _564 = "data-" + self._ProtocolName + "-pending";
                    var _565 = document.documentElement.hasAttribute(_564);
                    return _565;
                },
                _IsFailed: function () {
                    var _566 = "data-" + self._ProtocolName + "-error";
                    var _567 = document.documentElement.hasAttribute(_566);
                    return _567;
                },
                _GetTimeoutException: function () {
                    var _568 = new ITHit.WebDAV.Client.Exceptions.IntegrationException(ITHit.Phrases.Exceptions.IntegrationTimeoutException.Paste(self._Timeout));
                    return _568;
                },
                _GetException: function () {
                    var _569 = "data-" + self._ProtocolName + "-error";
                    var _56a = new ITHit.WebDAV.Client.Exceptions.IntegrationException(document.documentElement.getAttribute(_569));
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
                var _572 = new ITHit.WebDAV.Client.Methods.SingleResponse(_570);
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
            var _57e = this.Response.GetResponseStream();
            var _57f = new ITHit.XPath.resolver();
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
                    _5a7 = ITHit.Trim(_5a7);
                    var ext = self.GetExtension(_5a7);
                    if (ext === "" && _5a8 != undefined) {
                        self.CallErrorCallback(_5a8);
                    } else {
                        var _5aa = (ITHit.DetectOS.OS == "MacOS") ? encodeURIComponent("ofe|u|") : "ofe|u|";
                        this.OpenProtocol(self.GetMsOfficeSchemaByExtension(ext) + ":" + _5aa + _5a7, _5a8);
                    }
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
                        self.EditDocumentIntegrated(_5ae, _5af, _5b0);
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
                    if (this.IsExtensionInstalled()) {
                        if (self.IsMicrosoftOfficeDocument(_5cc)) {
                            var ext = self.GetExtension(_5cc);
                            self.IsProtocolAvailableAsync(ext, function (_5d0) {
                                if (_5d0.IsSuccess && _5d0.Result) {
                                    self.MicrosoftOfficeEditDocument(_5cc);
                                } else {
                                    self.DavProtocolEditDocument(_5cc, _5cd, _5ce);
                                }
                            });
                        } else {
                            self.DavProtocolEditDocument(_5cc, _5cd, _5ce);
                        }
                    } else {
                        if (self.IsMicrosoftOfficeDocument(_5cc)) {
                            self.MicrosoftOfficeEditDocument(_5cc, _5ce);
                        } else {
                            self.CallErrorCallback(_5ce);
                        }
                    }
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
                    var _5fe = document.createElement("iframe");
                    _5fe.src = uri;
                    _5fe.id = "hiddenIframe";
                    _5fe.style.display = "none";
                    _5fc.appendChild(_5fe);
                    return _5fe;
                },
                CreateHiddenLink: function (_5ff, uri) {
                    var link = document.createElement("a");
                    link.href = uri;
                    link.id = "hiddenLink";
                    link.style.display = "none";
                    _5ff.appendChild(link);
                    return link;
                },
                OpenUriWithHiddenFrame: function (uri, _603) {
                    var _604 = setTimeout(function () {
                        self.CallErrorCallback(_603);
                        _605.remove();
                    }, self.ProtocolTimeoutMs);
                    var _606 = document.querySelector("#hiddenIframe");
                    if (!_606) {
                        _606 = this.CreateHiddenFrame(document.body, "about:blank");
                    }
                    var _605 = this.RegisterEvent(window, "blur", onBlur);

                    function onBlur() {
                        clearTimeout(_604);
                        _605.remove();
                    }

                    _606.contentWindow.location.href = uri;
                },
                OpenUriWithHiddenLink: function (uri, _608) {
                    var _609 = setTimeout(function () {
                        self.CallErrorCallback(_608);
                        _60a.remove();
                    }, self.ProtocolTimeoutMs);
                    var link = document.querySelector("#hiddenLink");
                    if (!link) {
                        link = this.CreateHiddenLink(document.body, "about:blank");
                    }
                    var _60a = this.RegisterEvent(window, "blur", onBlur);

                    function onBlur() {
                        clearTimeout(_609);
                        _60a.remove();
                    }

                    link.href = uri;
                    link.click();
                },
                OpenUriWithTimeout: function (uri, _60d) {
                    var _60e = setTimeout(function () {
                        self.CallErrorCallback(_60d);
                        if (!_60f) {
                            _60f.remove();
                        }
                    }, self.ProtocolTimeoutMs);
                    if (!this.IsExtensionInstalled()) {
                        var _60f = this.RegisterEvent(window, "blur", onBlur);
                    }

                    function onBlur() {
                        clearTimeout(_60e);
                        _60f.remove();
                    }

                    window.location = uri;
                },
                OpenUriUsingFirefox: function (uri, _611) {
                    var _612 = document.querySelector("#hiddenIframe");
                    if (!_612) {
                        _612 = this.CreateHiddenFrame(document.body, "about:blank");
                    }
                    try {
                        _612.contentWindow.location.href = uri;
                    } catch (e) {
                        if (e.name == "NS_ERROR_UNKNOWN_PROTOCOL") {
                            self.CallErrorCallback(_611);
                        }
                    }
                },
                OpenUriUsingIE: function (uri, _614) {
                    if (navigator.msLaunchUri) {
                        navigator.msLaunchUri(uri, function () {
                        }, _614);
                    } else {
                        var ua = navigator.userAgent.toLowerCase();
                        var _616 = /windows nt 6.2/.test(ua) || /windows nt 6.3/.test(ua);
                        if (_616) {
                            this.OpenUriUsingIEInWindows8(uri, _614);
                        } else {
                            if (ITHit.DetectBrowser.IE === 9 || ITHit.DetectBrowser.IE === 11) {
                                this.OpenUriWithHiddenFrame(uri, _614);
                            } else {
                                this.OpenUriInNewWindow(uri, _614);
                            }
                        }
                    }
                },
                OpenUriInNewWindow: function (uri, _618) {
                    var _619 = window.open("", "", "width=0,height=0");
                    _619.document.write("<iframe src='" + uri + "'></iframe>");
                    setTimeout(function () {
                        try {
                            _619.setTimeout("window.close()", self.ProtocolTimeoutMs);
                        } catch (e) {
                            _619.close();
                            self.CallErrorCallback(_618);
                        }
                    }, self.ProtocolTimeoutMs);
                },
                OpenUriUsingIEInWindows8: function (uri, _61b) {
                    window.location.href = uri;
                },
                OpenUriUsingEdgeInWindows10: function (uri, _61d) {
                    if (navigator.msLaunchUri) {
                        if (ITHit.DetectBrowser.Edge < 15.15063) {
                            navigator.msLaunchUri(uri);
                        } else {
                            navigator.msLaunchUri(uri, function () {
                            }, _61d);
                        }
                    }
                },
                CallEdgeExtension: function (uri, _61f) {
                    var _620 = ITHit.WebDAV.Client.WebDavUtil.HashCode(location.href) + "_OpenUriUsingEdgeExtension_Response";
                    var _621 = function (evt) {
                        if (evt.detail.error) {
                            self.CallErrorCallback(_61f);
                        }
                    };
                    if (window.isEventListenerAdded === undefined || !window.isEventListenerAdded[_620]) {
                        if (window.isEventListenerAdded === undefined) {
                            window.isEventListenerAdded = {};
                        }
                        window.addEventListener(_620, _621, false);
                        window.isEventListenerAdded[_620] = true;
                    }
                    var _623 = new CustomEvent("OpenUriUsingEdgeExtension_Request", {detail: {uri: uri}});
                    window.dispatchEvent(_623);
                },
                CallChromeExtension: function (uri, _625) {
                    var _626 = new CustomEvent("OpenUriUsingChromeExtension_Request", {detail: {uri: uri}});
                    window.dispatchEvent(_626);
                },
                CallFirefoxExtension: function (uri, _628) {
                    var _629 = ITHit.WebDAV.Client.WebDavUtil.HashCode(location.href) + "_OpenUriUsingFirefoxExtension_Response";
                    var _62a = function (_62b) {
                        if (_62b.detail.error) {
                            self.CallErrorCallback(_628);
                        }
                    };
                    if (window.isEventListenerAdded === undefined || !window.isEventListenerAdded[_629]) {
                        if (window.isEventListenerAdded === undefined) {
                            window.isEventListenerAdded = {};
                        }
                        window.addEventListener(_629, _62a, false);
                        window.isEventListenerAdded[_629] = true;
                    }
                    var _62c = new CustomEvent("OpenUriUsingFirefoxExtension_Request", {detail: {uri: uri}});
                    window.dispatchEvent(_62c);
                },
                OpenProtocol: function (uri, _62e) {
                    if (ITHit.DetectBrowser.FF && !ITHit.DetectOS.IOS) {
                        this.OpenUriUsingFirefox(uri, _62e);
                    } else {
                        if (ITHit.DetectBrowser.FF && ITHit.DetectOS.IOS) {
                            this.OpenUriWithHiddenLink(uri, _62e);
                        } else {
                            if (ITHit.DetectBrowser.Chrome && this.IsExtensionInstalled()) {
                                if (uri.length > 2040 && ITHit.DetectOS.OS == "Windows") {
                                    this.CallChromeExtension(uri, _62e);
                                } else {
                                    window.location = uri;
                                }
                            } else {
                                if (ITHit.DetectBrowser.Chrome) {
                                    this.OpenUriWithTimeout(uri, _62e);
                                } else {
                                    if (ITHit.DetectBrowser.IE) {
                                        if (uri.length > 2080 && ITHit.DetectOS.OS == "Windows") {
                                            alert("URL is too long (" + uri.length + " characters). Internet Explorer does not support URLs longer than 2080 characters. Use Chrome, Firefox or Safari instead.");
                                        } else {
                                            this.OpenUriUsingIE(uri, _62e);
                                        }
                                    } else {
                                        if (ITHit.DetectBrowser.Safari && !ITHit.DetectOS.IOS) {
                                            this.OpenUriWithHiddenFrame(uri, _62e);
                                        } else {
                                            if (ITHit.DetectBrowser.Edge) {
                                                if (uri.length > 2080 && ITHit.DetectOS.OS == "Windows") {
                                                    this.CallEdgeExtension(uri, _62e);
                                                } else {
                                                    this.OpenUriUsingEdgeInWindows10(uri, _62e);
                                                }
                                            } else {
                                                this.OpenUriWithTimeout(uri, _62e);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                OpenProtocolWithCookies: function (uri, _630) {
                    if (ITHit.DetectBrowser.Chrome) {
                        this.CallChromeExtension(uri, _630);
                    } else {
                        if (ITHit.DetectBrowser.Edge && this.IsExtensionInstalled()) {
                            this.CallEdgeExtension(uri, _630);
                        } else {
                            if (ITHit.DetectBrowser.FF) {
                                this.CallFirefoxExtension(uri, _630);
                            } else {
                                this.OpenProtocol(uri, _630);
                            }
                        }
                    }
                }
            }
        });
    })();
    ITHit.DefineClass("ITHit.WebDAV.Client.Methods.CancelUpload", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_631, _632, _633, _634) {
                return this.GoAsync(_631, _632, _633, _634);
            }, GoAsync: function (_635, _636, _637, _638, _639) {
                var _63a = ITHit.WebDAV.Client.Methods.CancelUpload.createRequest(_635, _636, _637, _638);
                var self = this;
                var _63c = typeof _639 === "function" ? function (_63d) {
                    self._GoCallback(_636, _63d, _639);
                } : null;
                var _63e = _63a.GetResponse(_63c);
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
            var _677 = this.Response.GetResponseStream();
            var _678 = new ITHit.XPath.resolver();
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
                var _685 = new ITHit.WebDAV.Client.Methods.SingleResponse(_683);
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
                    var _692 = _690.split("?");
                    _692[0] = _692[0].replace(/\/?$/, "");
                    _690 = ITHit.WebDAV.Client.Encoder.EncodeURI(_692.join("?"));
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
                    var _6a9 = ITHit.WebDAV.Client.Methods.GUnlock.Go(_6a5, _6a6, _6a7, _6a8);
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
                this.ContentLength = _6b6;
                this.ContentType = _6b5;
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
                var _6ce = ITHit.WebDAV.Client.Methods.Put.Go(_6cd, this.Href, _6cc, _6ca, _6cb, this.Host);
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
                var _6e3 = _6e2.Response;
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
                    _6ed = ITHit.WebDAV.Client.Methods.VersionControl.Go(_6ec, this.Href, _6eb, this.Host);
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
                    _6ed = ITHit.WebDAV.Client.Methods.Delete.Go(_6ec, _6f0[0], _6eb, this.Host);
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
                var _709 = this.createRequest(_705, _706, _707, _708);
                var _70a = _709.GetResponse();
                var _70b = new ITHit.WebDAV.Client.Methods.SingleResponse(_70a);
                return new ITHit.WebDAV.Client.Methods.Mkcol(_70b);
            }, GoAsync: function (_70c, _70d, _70e, _70f, _710) {
                var _711 = this.createRequest(_70c, _70d, _70e, _70f);
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
                var _719 = _715.CreateWebDavRequest(_718, _716, _717);
                _719.Method("MKCOL");
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
                var _74b = _748.createElementNS(_74a, "prop");
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
                var _754 = _748.createElementNS(_74a, "basicsearch");
                _754.appendChild(_74d);
                _754.appendChild(_752);
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
                    var _75d = _75c.split("?");
                    _75d[0] = _75d[0].replace(/\/?$/, "/");
                    _75c = ITHit.WebDAV.Client.Encoder.EncodeURI(_75d.join("?"));
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
                var _778 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _774);
                var _779 = ITHit.WebDAV.Client.Methods.Mkcol.Go(_777, _778, _775, this.Host).Response;
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
                var _789 = ITHit.WebDAV.Client.Methods.Put.Go(_787, _788, "", _785, _784, this.Host);
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
                    var _80a = this.createRequest(_806, _807, _808, _809);
                    var _80b = _80a.GetResponse();
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
                var _85b = ITHit.WebDAV.Client.Methods.Undelete.createRequest(_858, _859, _85a);
                var _85c = _85b.GetResponse();
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
            this.RequestMethod = _862;
            this.Status = new ITHit.WebDAV.Client.HttpStatus(_861.Status, _861.StatusDescription);
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
            var oRes = ITHit.XPath.evaluate("/d:error/*", _864, _867);
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
                    var _8ba = new self(sUri, _8b7, _8b8);
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
                    if (_8bf) {
                        var _8c3 = new ITHit.WebDAV.Client.Methods.ErrorResponse(_8bf, _8be.Href);
                        _8c2 = new ITHit.WebDAV.Client.Exceptions.Info.Error(_8c3);
                        var _8c4 = new ITHit.WebDAV.Client.Methods.MultiResponse(_8bf, _8be.Href);
                        _8c1 = new ITHit.WebDAV.Client.Exceptions.Info.Multistatus(_8c4);
                    } else {
                        _8c2 = new ITHit.WebDAV.Client.Exceptions.Info.Error();
                        _8c2.BodyText = _8be.BodyText;
                    }
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
                var _8d7 = ITHit.Events.DispatchEvent(this, "OnBeforeRequestSend", _8d6);
                if (!_8d7 || !(_8d7 instanceof ITHit.HttpResponse)) {
                    _8d6.User = (null === _8d6.User) ? this._User : _8d6.User;
                    _8d6.Password = (null === _8d6.Password) ? this._Password : _8d6.Password;
                    _8d6.Body = _8d6.Body || "";
                    this._XMLRequest = new ITHit.XMLRequest(_8d6, _8d2);
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