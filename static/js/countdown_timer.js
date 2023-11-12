    const dateString = document.querySelector('.timer-value').textContent;
    console.log('dateString', dateString);
    const date = new Date(Date.parse(dateString));
    const formatter = new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
});

    console.log('date', date);
    console.log('formatted', formatter.format(date));
    console.log('dateString', dateString);

const settings = {
    timerName: "Deadline",
    endDate: formatter.format(date), //'10/27/2023'
    endTime: "24:00",
    timeZone: null,
    timeZoneCode: "00:00",
    lang: "EN",
    frameColor: "#ffffff",
    textColor: "#3f51b5",
    smallCircleFillColor: "#3f51b5",
    smallCircleFillColor2: "#0f8eee",
    smallLineFillColor: "#3f51b5",
    smallLineFillColor2: "#0f8eee",
    timeFontSize: "50",
    timeFontFamily: "Arial",
    timeFontStyle: "0",
    registerLetter: "0",
    widthFrame: "10",
    heightFrame: "10",
    labelFontStyle: "100",
    labelDay: "DAYS",
    labelHour: "HOURS",
    labelMin: "MINUTES",
    labelSec: "SECONDS",
    disableDays: false,
    disableMilliseconds: false,
    disableHours: false,
    disableMinutes: false,
    disableSeconds: false,
    reverseLable: false,
    removeDZero: true,
    removeHZero: true,
    removeMZero: true,
    removeSZero: true,
    centeredImage: true,
    uid: "timer_js",
};
window.timer_config = settings;

;(function () {
    ;(function (window, document, undefined) {
        function aa(a, b, c) {
            return a.call.apply(a.bind, arguments)
        }

        function ba(a, b, c) {
            if (!a) throw Error();
            if (2 < arguments.length) {
                var d = Array.prototype.slice.call(arguments, 2);
                return function () {
                    var c = Array.prototype.slice.call(arguments);
                    Array.prototype.unshift.apply(c, d);
                    return a.apply(b, c)
                }
            }
            return function () {
                return a.apply(b, arguments)
            }
        }

        function k(a, b, c) {
            k = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? aa : ba;
            return k.apply(null, arguments)
        }

        var n = Date.now || function () {
            return +new Date
        };

        function q(a, b) {
            this.K = a;
            this.w = b || a;
            this.G = this.w.document
        }

        q.prototype.createElement = function (a, b, c) {
            a = this.G.createElement(a);
            if (b) for (var d in b) b.hasOwnProperty(d) && ("style" == d ? a.style.cssText = b[d] : a.setAttribute(d, b[d]));
            c && a.appendChild(this.G.createTextNode(c));
            return a
        };

        function r(a, b, c) {
            a = a.G.getElementsByTagName(b)[0];
            a || (a = document.documentElement);
            a && a.lastChild && a.insertBefore(c, a.lastChild)
        }

        function ca(a, b) {
            function c() {
                a.G.body ? b() : setTimeout(c, 0)
            }

            c()
        }

        function s(a, b, c) {
            b = b || [];
            c = c || [];
            for (var d = a.className.split(/\s+/), e = 0; e < b.length; e += 1) {
                for (var f = !1, g = 0; g < d.length; g += 1) if (b[e] === d[g]) {
                    f = !0;
                    break
                }
                f || d.push(b[e])
            }
            b = [];
            for (e = 0; e < d.length; e += 1) {
                f = !1;
                for (g = 0; g < c.length; g += 1) if (d[e] === c[g]) {
                    f = !0;
                    break
                }
                f || b.push(d[e])
            }
            a.className = b.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "")
        }

        function t(a, b) {
            for (var c = a.className.split(/\s+/), d = 0, e = c.length; d < e; d++) if (c[d] == b) return !0;
            return !1
        }

        function u(a) {
            if ("string" === typeof a.na) return a.na;
            var b = a.w.location.protocol;
            "about:" == b && (b = a.K.location.protocol);
            return "https:" == b ? "https:" : "http:"
        }

        function v(a, b) {
            var c = a.createElement("link", { rel: "stylesheet", href: b, media: "all" }), d = !1;
            c.onload = function () {
                d || (d = !0)
            };
            c.onerror = function () {
                d || (d = !0)
            };
            r(a, "head", c)
        }

        function w(a, b, c, d) {
            var e = a.G.getElementsByTagName("head")[0];
            if (e) {
                var f = a.createElement("script", { src: b }), g = !1;
                f.onload = f.onreadystatechange = function () {
                    g || this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (g = !0, c && c(null), f.onload = f.onreadystatechange = null, "HEAD" == f.parentNode.tagName && e.removeChild(f))
                };
                e.appendChild(f);
                window.setTimeout(function () {
                    g || (g = !0, c && c(Error("Script load timeout")))
                }, d || 5E3);
                return f
            }
            return null
        };

        function x(a, b) {
            this.Y = a;
            this.ga = b
        };

        function y(a, b, c, d) {
            this.c = null != a ? a : null;
            this.g = null != b ? b : null;
            this.D = null != c ? c : null;
            this.e = null != d ? d : null
        }

        var da = /^([0-9]+)(?:[\._-]([0-9]+))?(?:[\._-]([0-9]+))?(?:[\._+-]?(.*))?$/;
        y.prototype.compare = function (a) {
            return this.c > a.c || this.c === a.c && this.g > a.g || this.c === a.c && this.g === a.g && this.D > a.D ? 1 : this.c < a.c || this.c === a.c && this.g < a.g || this.c === a.c && this.g === a.g && this.D < a.D ? -1 : 0
        };
        y.prototype.toString = function () {
            return [this.c, this.g || "", this.D || "", this.e || ""].join("")
        };

        function z(a) {
            a = da.exec(a);
            var b = null, c = null, d = null, e = null;
            a && (null !== a[1] && a[1] && (b = parseInt(a[1], 10)), null !== a[2] && a[2] && (c = parseInt(a[2], 10)), null !== a[3] && a[3] && (d = parseInt(a[3], 10)), null !== a[4] && a[4] && (e = /^[0-9]+$/.test(a[4]) ? parseInt(a[4], 10) : a[4]));
            return new y(b, c, d, e)
        };

        function A(a, b, c, d, e, f, g, h) {
            this.N = a;
            this.k = h
        }

        A.prototype.getName = function () {
            return this.N
        };

        function B(a) {
            this.a = a
        }

        var ea = new A("Unknown", 0, 0, 0, 0, 0, 0, new x(!1, !1));
        B.prototype.parse = function () {
            var a;
            if (-1 != this.a.indexOf("MSIE") || -1 != this.a.indexOf("Trident/")) {
                a = C(this);
                var b = z(D(this)), c = null, d = E(this.a, /Trident\/([\d\w\.]+)/, 1),
                    c = -1 != this.a.indexOf("MSIE") ? z(E(this.a, /MSIE ([\d\w\.]+)/, 1)) : z(E(this.a, /rv:([\d\w\.]+)/, 1));
                "" != d && z(d);
                a = new A("MSIE", 0, 0, 0, 0, 0, 0, new x("Windows" == a && 6 <= c.c || "Windows Phone" == a && 8 <= b.c, !1))
            } else if (-1 != this.a.indexOf("Opera")) a:if (a = z(E(this.a, /Presto\/([\d\w\.]+)/, 1)), z(D(this)), null !== a.c || z(E(this.a, /rv:([^\)]+)/, 1)), -1 != this.a.indexOf("Opera Mini/")) a =
                z(E(this.a, /Opera Mini\/([\d\.]+)/, 1)), a = new A("OperaMini", 0, 0, 0, C(this), 0, 0, new x(!1, !1)); else {
                if (-1 != this.a.indexOf("Version/") && (a = z(E(this.a, /Version\/([\d\.]+)/, 1)), null !== a.c)) {
                    a = new A("Opera", 0, 0, 0, C(this), 0, 0, new x(10 <= a.c, !1));
                    break a
                }
                a = z(E(this.a, /Opera[\/ ]([\d\.]+)/, 1));
                a = null !== a.c ? new A("Opera", 0, 0, 0, C(this), 0, 0, new x(10 <= a.c, !1)) : new A("Opera", 0, 0, 0, C(this), 0, 0, new x(!1, !1))
            } else /OPR\/[\d.]+/.test(this.a) ? a = F(this) : /AppleWeb(K|k)it/.test(this.a) ? a = F(this) : -1 != this.a.indexOf("Gecko") ?
                (a = "Unknown", b = new y, z(D(this)), b = !1, -1 != this.a.indexOf("Firefox") ? (a = "Firefox", b = z(E(this.a, /Firefox\/([\d\w\.]+)/, 1)), b = 3 <= b.c && 5 <= b.g) : -1 != this.a.indexOf("Mozilla") && (a = "Mozilla"), c = z(E(this.a, /rv:([^\)]+)/, 1)), b || (b = 1 < c.c || 1 == c.c && 9 < c.g || 1 == c.c && 9 == c.g && 2 <= c.D), a = new A(a, 0, 0, 0, C(this), 0, 0, new x(b, !1))) : a = ea;
            return a
        };

        function C(a) {
            var b = E(a.a, /(iPod|iPad|iPhone|Android|Windows Phone|BB\d{2}|BlackBerry)/, 1);
            if ("" != b) return /BB\d{2}/.test(b) && (b = "BlackBerry"), b;
            a = E(a.a, /(Linux|Mac_PowerPC|Macintosh|Windows|CrOS|PlayStation|CrKey)/, 1);
            return "" != a ? ("Mac_PowerPC" == a ? a = "Macintosh" : "PlayStation" == a && (a = "Linux"), a) : "Unknown"
        }

        function D(a) {
            var b = E(a.a, /(OS X|Windows NT|Android) ([^;)]+)/, 2);
            if (b || (b = E(a.a, /Windows Phone( OS)? ([^;)]+)/, 2)) || (b = E(a.a, /(iPhone )?OS ([\d_]+)/, 2))) return b;
            if (b = E(a.a, /(?:Linux|CrOS|CrKey) ([^;)]+)/, 1)) for (var b = b.split(/\s/), c = 0; c < b.length; c += 1) if (/^[\d\._]+$/.test(b[c])) return b[c];
            return (a = E(a.a, /(BB\d{2}|BlackBerry).*?Version\/([^\s]*)/, 2)) ? a : "Unknown"
        }

        function F(a) {
            var b = C(a), c = z(D(a)), d = z(E(a.a, /AppleWeb(?:K|k)it\/([\d\.\+]+)/, 1)), e = "Unknown", f = new y,
                f = "Unknown", g = !1;
            /OPR\/[\d.]+/.test(a.a) ? e = "Opera" : -1 != a.a.indexOf("Chrome") || -1 != a.a.indexOf("CrMo") || -1 != a.a.indexOf("CriOS") ? e = "Chrome" : /Silk\/\d/.test(a.a) ? e = "Silk" : "BlackBerry" == b || "Android" == b ? e = "BuiltinBrowser" : -1 != a.a.indexOf("PhantomJS") ? e = "PhantomJS" : -1 != a.a.indexOf("Safari") ? e = "Safari" : -1 != a.a.indexOf("AdobeAIR") ? e = "AdobeAIR" : -1 != a.a.indexOf("PlayStation") && (e = "BuiltinBrowser");
            "BuiltinBrowser" ==
            e ? f = "Unknown" : "Silk" == e ? f = E(a.a, /Silk\/([\d\._]+)/, 1) : "Chrome" == e ? f = E(a.a, /(Chrome|CrMo|CriOS)\/([\d\.]+)/, 2) : -1 != a.a.indexOf("Version/") ? f = E(a.a, /Version\/([\d\.\w]+)/, 1) : "AdobeAIR" == e ? f = E(a.a, /AdobeAIR\/([\d\.]+)/, 1) : "Opera" == e ? f = E(a.a, /OPR\/([\d.]+)/, 1) : "PhantomJS" == e && (f = E(a.a, /PhantomJS\/([\d.]+)/, 1));
            f = z(f);
            g = "AdobeAIR" == e ? 2 < f.c || 2 == f.c && 5 <= f.g : "BlackBerry" == b ? 10 <= c.c : "Android" == b ? 2 < c.c || 2 == c.c && 1 < c.g : 526 <= d.c || 525 <= d.c && 13 <= d.g;
            return new A(e, 0, 0, 0, 0, 0, 0, new x(g, 536 > d.c || 536 == d.c && 11 > d.g))
        }

        function E(a, b, c) {
            return (a = a.match(b)) && a[c] ? a[c] : ""
        };

        function G(a) {
            this.ma = a || "-"
        }

        G.prototype.e = function (a) {
            for (var b = [], c = 0; c < arguments.length; c++) b.push(arguments[c].replace(/[\W_]+/g, "").toLowerCase());
            return b.join(this.ma)
        };

        function H(a, b) {
            this.N = a;
            this.Z = 4;
            this.O = "n";
            var c = (b || "n4").match(/^([nio])([1-9])$/i);
            c && (this.O = c[1], this.Z = parseInt(c[2], 10))
        }

        H.prototype.getName = function () {
            return this.N
        };

        function I(a) {
            return a.O + a.Z
        }

        function ga(a) {
            var b = 4, c = "n", d = null;
            a && ((d = a.match(/(normal|oblique|italic)/i)) && d[1] && (c = d[1].substr(0, 1).toLowerCase()), (d = a.match(/([1-9]00|normal|bold)/i)) && d[1] && (/bold/i.test(d[1]) ? b = 7 : /[1-9]00/.test(d[1]) && (b = parseInt(d[1].substr(0, 1), 10))));
            return c + b
        };

        function ha(a, b) {
            this.d = a;
            this.q = a.w.document.documentElement;
            this.Q = b;
            this.j = "wf";
            this.h = new G("-");
            this.ha = !1 !== b.events;
            this.F = !1 !== b.classes
        }

        function J(a) {
            if (a.F) {
                var b = t(a.q, a.h.e(a.j, "active")), c = [], d = [a.h.e(a.j, "loading")];
                b || c.push(a.h.e(a.j, "inactive"));
                s(a.q, c, d)
            }
            K(a, "inactive")
        }

        function K(a, b, c) {
            if (a.ha && a.Q[b]) if (c) a.Q[b](c.getName(), I(c)); else a.Q[b]()
        };

        function ia() {
            this.C = {}
        };

        function L(a, b) {
            this.d = a;
            this.I = b;
            this.o = this.d.createElement("span", { "aria-hidden": "true" }, this.I)
        }

        function M(a, b) {
            var c = a.o, d;
            d = [];
            for (var e = b.N.split(/,\s*/), f = 0; f < e.length; f++) {
                var g = e[f].replace(/['"]/g, "");
                -1 == g.indexOf(" ") ? d.push(g) : d.push("'" + g + "'")
            }
            d = d.join(",");
            e = "normal";
            "o" === b.O ? e = "oblique" : "i" === b.O && (e = "italic");
            c.style.cssText = "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + d + ";" + ("font-style:" + e + ";font-weight:" + (b.Z + "00") + ";")
        }

        function N(a) {
            r(a.d, "body", a.o)
        }

        L.prototype.remove = function () {
            var a = this.o;
            a.parentNode && a.parentNode.removeChild(a)
        };

        function O(a, b, c, d, e, f, g, h) {
            this.$ = a;
            this.ka = b;
            this.d = c;
            this.m = d;
            this.k = e;
            this.I = h || "BESbswy";
            this.v = {};
            this.X = f || 3E3;
            this.ca = g || null;
            this.H = this.u = this.t = null;
            this.t = new L(this.d, this.I);
            this.u = new L(this.d, this.I);
            this.H = new L(this.d, this.I);
            M(this.t, new H("serif", I(this.m)));
            M(this.u, new H("sans-serif", I(this.m)));
            M(this.H, new H("monospace", I(this.m)));
            N(this.t);
            N(this.u);
            N(this.H);
            this.v.serif = this.t.o.offsetWidth;
            this.v["sans-serif"] = this.u.o.offsetWidth;
            this.v.monospace = this.H.o.offsetWidth
        }

        var P = { sa: "serif", ra: "sans-serif", qa: "monospace" };
        O.prototype.start = function () {
            this.oa = n();
            M(this.t, new H(this.m.getName() + ",serif", I(this.m)));
            M(this.u, new H(this.m.getName() + ",sans-serif", I(this.m)));
            Q(this)
        };

        function R(a, b, c) {
            for (var d in P) if (P.hasOwnProperty(d) && b === a.v[P[d]] && c === a.v[P[d]]) return !0;
            return !1
        }

        function Q(a) {
            var b = a.t.o.offsetWidth, c = a.u.o.offsetWidth;
            b === a.v.serif && c === a.v["sans-serif"] || a.k.ga && R(a, b, c) ? n() - a.oa >= a.X ? a.k.ga && R(a, b, c) && (null === a.ca || a.ca.hasOwnProperty(a.m.getName())) ? S(a, a.$) : S(a, a.ka) : ja(a) : S(a, a.$)
        }

        function ja(a) {
            setTimeout(k(function () {
                Q(this)
            }, a), 50)
        }

        function S(a, b) {
            a.t.remove();
            a.u.remove();
            a.H.remove();
            b(a.m)
        };

        function T(a, b, c, d) {
            this.d = b;
            this.A = c;
            this.S = 0;
            this.ea = this.ba = !1;
            this.X = d;
            this.k = a.k
        }

        function ka(a, b, c, d, e) {
            c = c || {};
            if (0 === b.length && e) J(a.A); else for (a.S += b.length, e && (a.ba = e), e = 0; e < b.length; e++) {
                var f = b[e], g = c[f.getName()], h = a.A, m = f;
                h.F && s(h.q, [h.h.e(h.j, m.getName(), I(m).toString(), "loading")]);
                K(h, "fontloading", m);
                h = null;
                h = new O(k(a.ia, a), k(a.ja, a), a.d, f, a.k, a.X, d, g);
                h.start()
            }
        }

        T.prototype.ia = function (a) {
            var b = this.A;
            b.F && s(b.q, [b.h.e(b.j, a.getName(), I(a).toString(), "active")], [b.h.e(b.j, a.getName(), I(a).toString(), "loading"), b.h.e(b.j, a.getName(), I(a).toString(), "inactive")]);
            K(b, "fontactive", a);
            this.ea = !0;
            la(this)
        };
        T.prototype.ja = function (a) {
            var b = this.A;
            if (b.F) {
                var c = t(b.q, b.h.e(b.j, a.getName(), I(a).toString(), "active")), d = [],
                    e = [b.h.e(b.j, a.getName(), I(a).toString(), "loading")];
                c || d.push(b.h.e(b.j, a.getName(), I(a).toString(), "inactive"));
                s(b.q, d, e)
            }
            K(b, "fontinactive", a);
            la(this)
        };

        function la(a) {
            0 == --a.S && a.ba && (a.ea ? (a = a.A, a.F && s(a.q, [a.h.e(a.j, "active")], [a.h.e(a.j, "loading"), a.h.e(a.j, "inactive")]), K(a, "active")) : J(a.A))
        };

        function U(a) {
            this.K = a;
            this.B = new ia;
            this.pa = new B(a.navigator.userAgent);
            this.a = this.pa.parse();
            this.U = this.V = 0;
            this.R = this.T = !0
        }

        U.prototype.load = function (a) {
            this.d = new q(this.K, a.context || this.K);
            this.T = !1 !== a.events;
            this.R = !1 !== a.classes;
            var b = new ha(this.d, a), c = [], d = a.timeout;
            b.F && s(b.q, [b.h.e(b.j, "loading")]);
            K(b, "loading");
            var c = this.B, e = this.d, f = [], g;
            for (g in a) if (a.hasOwnProperty(g)) {
                var h = c.C[g];
                h && f.push(h(a[g], e))
            }
            c = f;
            this.U = this.V = c.length;
            a = new T(this.a, this.d, b, d);
            d = 0;
            for (g = c.length; d < g; d++) e = c[d], e.L(this.a, k(this.la, this, e, b, a))
        };
        U.prototype.la = function (a, b, c, d) {
            var e = this;
            d ? a.load(function (a, b, d) {
                ma(e, c, a, b, d)
            }) : (a = 0 == --this.V, this.U--, a && 0 == this.U ? J(b) : (this.R || this.T) && ka(c, [], {}, null, a))
        };

        function ma(a, b, c, d, e) {
            var f = 0 == --a.V;
            (a.R || a.T) && setTimeout(function () {
                ka(b, c, d || null, e || null, f)
            }, 0)
        };

        function na(a, b, c) {
            this.P = a ? a : b + oa;
            this.s = [];
            this.W = [];
            this.fa = c || ""
        }

        var oa = "//fonts.googleapis.com/css";
        na.prototype.e = function () {
            if (0 == this.s.length) throw Error("No fonts to load!");
            if (-1 != this.P.indexOf("kit=")) return this.P;
            for (var a = this.s.length, b = [], c = 0; c < a; c++) b.push(this.s[c].replace(/ /g, "+"));
            a = this.P + "?family=" + b.join("%7C");
            0 < this.W.length && (a += "&subset=" + this.W.join(","));
            0 < this.fa.length && (a += "&text=" + encodeURIComponent(this.fa));
            return a
        };

        function pa(a) {
            this.s = a;
            this.da = [];
            this.M = {}
        }

        var qa = {
                latin: "BESbswy",
                cyrillic: "&#1081;&#1103;&#1046;",
                greek: "&#945;&#946;&#931;",
                khmer: "&#x1780;&#x1781;&#x1782;",
                Hanuman: "&#x1780;&#x1781;&#x1782;"
            }, ra = {
                thin: "1",
                extralight: "2",
                "extra-light": "2",
                ultralight: "2",
                "ultra-light": "2",
                light: "3",
                regular: "4",
                book: "4",
                medium: "5",
                "semi-bold": "6",
                semibold: "6",
                "demi-bold": "6",
                demibold: "6",
                bold: "7",
                "extra-bold": "8",
                extrabold: "8",
                "ultra-bold": "8",
                ultrabold: "8",
                black: "9",
                heavy: "9",
                l: "3",
                r: "4",
                b: "7"
            }, sa = { i: "i", italic: "i", n: "n", normal: "n" },
            ta = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
        pa.prototype.parse = function () {
            for (var a = this.s.length, b = 0; b < a; b++) {
                var c = this.s[b].split(":"), d = c[0].replace(/\+/g, " "), e = ["n4"];
                if (2 <= c.length) {
                    var f;
                    var g = c[1];
                    f = [];
                    if (g) for (var g = g.split(","), h = g.length, m = 0; m < h; m++) {
                        var l;
                        l = g[m];
                        if (l.match(/^[\w-]+$/)) {
                            l = ta.exec(l.toLowerCase());
                            var p = void 0;
                            if (null == l) p = ""; else {
                                p = void 0;
                                p = l[1];
                                if (null == p || "" == p) p = "4"; else var fa = ra[p],
                                    p = fa ? fa : isNaN(p) ? "4" : p.substr(0, 1);
                                l = l[2];
                                p = [null == l || "" == l ? "n" : sa[l], p].join("")
                            }
                            l = p
                        } else l = "";
                        l && f.push(l)
                    }
                    0 < f.length && (e = f);
                    3 == c.length && (c = c[2], f = [], c = c ? c.split(",") : f, 0 < c.length && (c = qa[c[0]]) && (this.M[d] = c))
                }
                this.M[d] || (c = qa[d]) && (this.M[d] = c);
                for (c = 0; c < e.length; c += 1) this.da.push(new H(d, e[c]))
            }
        };

        function V(a, b) {
            this.a = (new B(navigator.userAgent)).parse();
            this.d = a;
            this.f = b
        }

        var ua = { Arimo: !0, Cousine: !0, Tinos: !0 };
        V.prototype.L = function (a, b) {
            b(a.k.Y)
        };
        V.prototype.load = function (a) {
            var b = this.d;
            "MSIE" == this.a.getName() && 1 != this.f.blocking ? ca(b, k(this.aa, this, a)) : this.aa(a)
        };
        V.prototype.aa = function (a) {
            for (var b = this.d, c = new na(this.f.api, u(b), this.f.text), d = this.f.families, e = d.length, f = 0; f < e; f++) {
                var g = d[f].split(":");
                3 == g.length && c.W.push(g.pop());
                var h = "";
                2 == g.length && "" != g[1] && (h = ":");
                c.s.push(g.join(h))
            }
            d = new pa(d);
            d.parse();
            v(b, c.e());
            a(d.da, d.M, ua)
        };

        function W(a, b) {
            this.d = a;
            this.f = b;
            this.p = []
        }

        W.prototype.J = function (a) {
            var b = this.d;
            return u(this.d) + (this.f.api || "//f.fontdeck.com/s/css/js/") + (b.w.location.hostname || b.K.location.hostname) + "/" + a + ".js"
        };
        W.prototype.L = function (a, b) {
            var c = this.f.id, d = this.d.w, e = this;
            c ? (d.__webfontfontdeckmodule__ || (d.__webfontfontdeckmodule__ = {}), d.__webfontfontdeckmodule__[c] = function (a, c) {
                for (var d = 0, m = c.fonts.length; d < m; ++d) {
                    var l = c.fonts[d];
                    e.p.push(new H(l.name, ga("font-weight:" + l.weight + ";font-style:" + l.style)))
                }
                b(a)
            }, w(this.d, this.J(c), function (a) {
                a && b(!1)
            })) : b(!1)
        };
        W.prototype.load = function (a) {
            a(this.p)
        };

        function X(a, b) {
            this.d = a;
            this.f = b;
            this.p = []
        }

        X.prototype.J = function (a) {
            var b = u(this.d);
            return (this.f.api || b + "//use.typekit.net") + "/" + a + ".js"
        };
        X.prototype.L = function (a, b) {
            var c = this.f.id, d = this.d.w, e = this;
            c ? w(this.d, this.J(c), function (a) {
                if (a) b(!1); else {
                    if (d.Typekit && d.Typekit.config && d.Typekit.config.fn) {
                        a = d.Typekit.config.fn;
                        for (var c = 0; c < a.length; c += 2) for (var h = a[c], m = a[c + 1], l = 0; l < m.length; l++) e.p.push(new H(h, m[l]));
                        try {
                            d.Typekit.load({ events: !1, classes: !1 })
                        } catch (p) {
                        }
                    }
                    b(!0)
                }
            }, 2E3) : b(!1)
        };
        X.prototype.load = function (a) {
            a(this.p)
        };

        function Y(a, b) {
            this.d = a;
            this.f = b;
            this.p = []
        }

        Y.prototype.L = function (a, b) {
            var c = this, d = c.f.projectId, e = c.f.version;
            if (d) {
                var f = c.d.w;
                w(this.d, c.J(d, e), function (e) {
                    if (e) b(!1); else {
                        if (f["__mti_fntLst" + d] && (e = f["__mti_fntLst" + d]())) for (var h = 0; h < e.length; h++) c.p.push(new H(e[h].fontfamily));
                        b(a.k.Y)
                    }
                }).id = "__MonotypeAPIScript__" + d
            } else b(!1)
        };
        Y.prototype.J = function (a, b) {
            var c = u(this.d), d = (this.f.api || "fast.fonts.net/jsapi").replace(/^.*http(s?):(\/\/)?/, "");
            return c + "//" + d + "/" + a + ".js" + (b ? "?v=" + b : "")
        };
        Y.prototype.load = function (a) {
            a(this.p)
        };

        function Z(a, b) {
            this.d = a;
            this.f = b
        }

        Z.prototype.load = function (a) {
            var b, c, d = this.f.urls || [], e = this.f.families || [], f = this.f.testStrings || {};
            b = 0;
            for (c = d.length; b < c; b++) v(this.d, d[b]);
            d = [];
            b = 0;
            for (c = e.length; b < c; b++) {
                var g = e[b].split(":");
                if (g[1]) for (var h = g[1].split(","), m = 0; m < h.length; m += 1) d.push(new H(g[0], h[m])); else d.push(new H(g[0]))
            }
            a(d, f)
        };
        Z.prototype.L = function (a, b) {
            return b(a.k.Y)
        };
        var $ = new U(this);
        $.B.C.custom = function (a, b) {
            return new Z(b, a)
        };
        $.B.C.fontdeck = function (a, b) {
            return new W(b, a)
        };
        $.B.C.monotype = function (a, b) {
            return new Y(b, a)
        };
        $.B.C.typekit = function (a, b) {
            return new X(b, a)
        };
        $.B.C.google = function (a, b) {
            return new V(b, a)
        };
        this.WebFont || (this.WebFont = {}, this.WebFont.load = k($.load, $), this.WebFontConfig && $.load(this.WebFontConfig));
    })(this, document);
    "use strict";
    var countDownTimer = void 0;

    function typingMarkup(e) {
        return e.parentCubeBorderWidth = toInt(e.parentCubeBorderWidth), e.circleBorderWidth = toInt(e.circleBorderWidth), e.smallCircleRadius = toInt(e.smallCircleRadius), e.countSmallCircles = toInt(e.countSmallCircles), e.smallLinesHeight = toInt(e.smallLinesHeight), e.countSmallLines = toInt(e.countSmallLines), e.timeFontSize = toInt(e.timeFontSize), e.widthFrame = toInt(e.widthFrame), e.heightFrame = toInt(e.heightFrame), e.timeFontTopPadding = toInt(e.timeFontTopPadding), e.timeFontRightPadding = toInt(e.timeFontRightPadding), e.timeFontBottomPadding = toInt(e.timeFontBottomPadding), e.timeFontLeftPadding = toInt(e.timeFontLeftPadding), e.timeSpace = toInt(e.timeSpace), e.labelFontSize = toInt(e.labelFontSize), e.labelFontTopPadding = toInt(e.labelFontTopPadding), e.labelFontRightPadding = toInt(e.labelFontRightPadding), e.labelFontBottomPadding = toInt(e.labelFontBottomPadding), e.labelFontLeftPadding = toInt(e.labelFontLeftPadding), e.spaceFontSize = toInt(e.spaceFontSize), e.spaceFontTopPadding = toInt(e.spaceFontTopPadding), e.spaceFontRightPadding = toInt(e.spaceFontRightPadding), e.spaceFontLeftPadding = toInt(e.spaceFontLeftPadding), e.spaceFontBottomPadding = toInt(e.spaceFontBottomPadding), e.smallCubeBorderWidth = toInt(e.smallCubeBorderWidth), e.cubeTopPadding = toInt(e.cubeTopPadding), e.cubeRightPadding = toInt(e.cubeRightPadding), e.cubeBottomPadding = toInt(e.cubeBottomPadding), e.cubeLeftPadding = toInt(e.cubeLeftPadding), e.parentCubeTopPadding = toInt(e.parentCubeTopPadding), e.parentCubeRightPadding = toInt(e.parentCubeRightPadding), e.parentCubeBottomPadding = toInt(e.parentCubeBottomPadding), e.parentCubeLeftPadding = toInt(e.parentCubeLeftPadding), e.circleBorderWidth = toInt(e.circleBorderWidth), e.circleRadius = toInt(e.circleRadius), e.smallCircleRadius = toInt(e.smallCircleRadius), e.countSmallCircles = toInt(e.countSmallCircles), e.smallLinesWidth = toInt(e.smallLinesWidth), e
    }

    function toInt(e) {
        return "" != e && null != e && "auto" != e && (e = parseInt(e)), e
    }

    function counterRing(e, t) {
        void 0 !== t && (countDownTimer = t.id);
        var i = Object.assign({}, e);

        function n(e, t) {
            e = e.toLowerCase(), t = t.toLowerCase();
            var i = {
                en: {
                    d: "d",
                    h: "h",
                    m: "m",
                    s: "s",
                    days: "days",
                    hours: "hours",
                    minutes: "minutes",
                    seconds: "seconds"
                },
                ru: {
                    d: "Рґ",
                    h: "С‡",
                    m: "Рј",
                    s: "СЃ",
                    days: "РґРЅРё",
                    hours: "С‡Р°СЃС‹",
                    minutes: "РјРёРЅСѓС‚С‹",
                    seconds: "СЃРµРєСѓРЅРґС‹"
                },
                af: { days: "dae", hours: "ure", minutes: "minute", seconds: "sekondes" },
                ar: { days: "ШЈЩЉШ§Щ…", hours: "ШіШ§Ш№Ш§ШЄ", minutes: "Ш§Щ„ШЇЩ‚Ш§Ш¦Щ‚", seconds: "Ш«Щ€Ш§Щ†ЩЉ" },
                bg: {
                    d: "Рґ",
                    h: "С‡",
                    m: "Рј",
                    s: "СЃ",
                    days: "РґРЅРё",
                    hours: "С‡Р°СЃР°",
                    minutes: "РјРёРЅСѓС‚Рё",
                    seconds: "СЃРµРєСѓРЅРґРё"
                },
                bn: {
                    d: "а¦",
                    h: "а¦њ",
                    m: "а¦®а¦ї",
                    s: "а¦—а§Ѓа¦Іа¦ї",
                    days: "а¦¦а¦їа¦Ё",
                    hours: "а¦а¦Ёа§Ќа¦џа¦ѕа¦°",
                    minutes: "а¦®а¦їа¦Ёа¦їа¦џ",
                    seconds: "а¦ёа§‡а¦•а§‡а¦Ёа§Ќа¦Ў"
                },
                ca: { days: "dies", hours: "hores", minutes: "minuts", seconds: "segons" },
                cs: { days: "dnЕЇ", hours: "hodin", minutes: "minut", seconds: "sekundy" },
                cy: { days: "dyddiau", hours: "oriau", minutes: "cofnodion", seconds: "eiliad" },
                da: { days: "dage", hours: "timer", minutes: "minutter", seconds: "sekunder" },
                de: { days: "tage", hours: "Stunden", minutes: "Minuten", seconds: "Sekunden" },
                el: {
                    days: "О·ОјО­ПЃОµП‚",
                    hours: "ПЋПЃОµП‚",
                    minutes: "О»ОµПЂП„О¬",
                    seconds: "ОґОµП…П„ОµПЃОїО»О­ПЂП„П‰ОЅ"
                },
                es: { days: "dias", hours: "horas", minutes: "minutos", seconds: "segundos" },
                et: { days: "pГ¤eva", hours: "tundi", minutes: "minutit", seconds: "sekundit" },
                eu: { days: "egun", hours: "ordu", minutes: "minutu", seconds: "segundutan" },
                fa: { days: "Ш±Щ€ШІЩ‡Ш§", hours: "ШіШ§Ш№ШЄ Щ‡Ш§", minutes: "ШЇЩ‚Ш§ЫЊЩ‚", seconds: "Ш«Ш§Щ†ЫЊЩ‡" },
                fi: { days: "pГ¤ivГ¤Г¤", hours: "tuntia", minutes: "minuutit", seconds: "sekuntia" },
                fr: { days: "journГ©es", hours: "heures", minutes: "minutes", seconds: "secondes" },
                ga: { days: "lГЎ", hours: "uaireanta", minutes: "nГіimГ©ad", seconds: "soicind" },
                gu: {
                    days: "аЄ¦аЄїаЄµаЄё",
                    hours: "аЄ•аЄІаЄѕаЄ•",
                    minutes: "аЄ®аЄїаЄЁаЄїаЄџ",
                    seconds: "аЄёа«‡аЄ•аЄ‚аЄЎ"
                },
                he: { days: "Ч™ЧћЧ™Чќ", hours: "Ч©ЧўЧ•ЧЄ", minutes: "Ч“Ч§Ч•ЧЄ", seconds: "Ч©Ч Ч™Ч•ЧЄ" },
                hi: { days: "а¤¦а¤їа¤Ё", hours: "а¤а¤‚а¤џаҐ‡", minutes: "а¤®а¤їа¤Ёа¤џ", seconds: "а¤ёаҐ‡а¤•а¤‚а¤Ў" },
                hr: { days: "dana", hours: "sati", minutes: "minuta", seconds: "sekundi" },
                hu: { days: "napok", hours: "ГіrГЎk", minutes: "percek", seconds: "mГЎsodperc" },
                hy: {
                    d: "Х¤",
                    h: "h",
                    m: "Хґ",
                    s: "Хў",
                    days: "Ц…ЦЂХҐЦЂ",
                    hours: "ХЄХЎХґХҐЦЂ",
                    minutes: "ЦЂХёХєХҐ",
                    seconds: "ХѕХЎХµЦЂХЇХµХЎХ¶"
                },
                id: { days: "hari", hours: "jam", minutes: "menit", seconds: "detik" },
                is: { days: "daga", hours: "stundir", minutes: "mГ­nГєtur", seconds: "sekГєndur" },
                it: { days: "giorni", hours: "ore", minutes: "minuti", seconds: "secondi" },
                ja: { days: "ж—ҐгЂ…", hours: "ж™‚й–“", minutes: "е€†", seconds: "з§’" },
                km: {
                    days: "бћђбџ’бћ„бџѓ",
                    hours: "бћбџ‰бџ„бћ„",
                    minutes: "бћ“бћ¶бћ‘бћё",
                    seconds: "бћњбћ·бћ“бћ¶бћ‘бћё"
                },
                ko: { days: "мќј", hours: "м‹њк°„", minutes: "мќм‚¬лЎќ", seconds: "мґ€" },
                la: { days: "diebus", hours: "horis", minutes: "minutes", seconds: "seconds" },
                lt: { days: "dienos", hours: "valandos", minutes: "minutД—s", seconds: "sekundes" },
                lv: { days: "dienas", hours: "stundas", minutes: "minЕ«tes", seconds: "sekundes" },
                mi: { days: "ra", hours: "haora", minutes: "meneti", seconds: "hД“kona" },
                mk: { days: "РґРµРЅР°", hours: "С‡Р°СЃР°", minutes: "РјРёРЅСѓС‚Рё", seconds: "СЃРµРєСѓРЅРґРё" },
                ml: {
                    days: "аґ¦аґїаґµаґёаґ™аµЌаґ™аґіаґїаµЅ",
                    hours: "аґ®аґЈаґїаґ•аµЌаґ•аµ‚аґ±аµЃаґ•аµѕ",
                    minutes: "аґ®аґїаґЁаґїаґ±аµЌаґ±аµЌ",
                    seconds: "аґёаµ†аґ•аµЌаґ•аµ»аґЎаµЌ"
                },
                mn: { days: "У©РґУ©СЂ", hours: "С†Р°Рі", minutes: "РјРёРЅСѓС‚", seconds: "СЃРµРєСѓРЅРґ" },
                mr: {
                    days: "а¤¦а¤їа¤µа¤ё",
                    hours: "а¤¤а¤ѕа¤ё",
                    minutes: "а¤®а¤їа¤Ёа¤їа¤џаҐ‡",
                    seconds: "а¤ёаҐ‡а¤•а¤‚а¤¦"
                },
                ms: { days: "hari", hours: "jam", minutes: "minit", seconds: "detik" },
                mt: { days: "jiem", hours: "sigД§at", minutes: "minuti", seconds: "sekondi" },
                ne: {
                    days: "а¤¦а¤їа¤Ё",
                    hours: "а¤а¤ЈаҐЌа¤џа¤ѕ",
                    minutes: "а¤®а¤їа¤ЁаҐ‡а¤џ",
                    seconds: "а¤ёаҐ‡а¤•аҐ‡а¤ЁаҐЌа¤Ў"
                },
                nl: { days: "dagen", hours: "uren", minutes: "minuten", seconds: "seconden" },
                no: { days: "dager", hours: "timer", minutes: "minutter", seconds: "sekunder" },
                pa: { days: "аЁ¦аЁїаЁЁ", hours: "аЁа©°аЁџа©‡", minutes: "аЁ®аЁїа©°аЁџ", seconds: "аЁёаЁ•аЁїа©°аЁџ" },
                pl: { days: "dni", hours: "godziny", minutes: "minuty", seconds: "sekundy" },
                pt: { days: "dias", hours: "horas", minutes: "minutos", seconds: "segundos" },
                ro: { days: "zi", hours: "ore", minutes: "minute", seconds: "secunde" },
                sk: { days: "dni", hours: "hodiny", minutes: "minГєty", seconds: "sekundy" },
                sl: { days: "dnevi", hours: "ure", minutes: "minut", seconds: "sekund" },
                sm: { days: "aso", hours: "itula", minutes: "minute", seconds: "sekone" },
                sq: { days: "ditГ«", hours: "orГ«", minutes: "minuta", seconds: "sekonda" },
                sr: { days: "РґР°РЅР°", hours: "СЃР°С‚Рё", minutes: "РјРёРЅСѓС‚Р°", seconds: "СЃРµРєСѓРЅРґРµ" },
                sv: { days: "dagar", hours: "timmar", minutes: "minuter", seconds: "sekunder" },
                sw: { days: "siku", hours: "masaa", minutes: "dakika", seconds: "sekunde" },
                ta: {
                    days: "а®Ёа®ѕа®џаЇЌа®•а®іа®їа®ІаЇЌ",
                    hours: "а®®а®Ја®ї",
                    minutes: "а®Ёа®їа®®а®їа®џа®™аЇЌа®•а®іаЇЌ",
                    seconds: "а®µа®їа®Ёа®ѕа®џа®їа®•а®іаЇЌ"
                },
                th: {
                    days: "аё§аё±аё™",
                    hours: "аёЉаё±а№€аё§а№‚аёЎаё‡",
                    minutes: "аё™аёІаё—аёµ",
                    seconds: "аё§аёґаё™аёІаё—аёµ"
                },
                tr: { days: "gГјnler", hours: "saatler", minutes: "dakika", seconds: "saniye" },
                uk: {
                    d: "д",
                    h: "ч",
                    m: "м",
                    s: "х",
                    days: "дні",
                    hours: "годин",
                    minutes: "хвилин",
                    seconds: "секунд"
                },

                ur: { days: "ШЇЩ†", hours: "ЪЇЪѕЩ†Щ№Ы’", minutes: "Щ…Щ†Щ№", seconds: "ШіЫЊЪ©Щ†Ъ€" },
                uz: { days: "kunlar", hours: "soat", minutes: "daqiqa", seconds: "soniya" },
                vi: { days: "ngГ y", hours: "giб»ќ", minutes: "phГєt", seconds: "giГўy" },
                xh: { days: "iintsuku", hours: "iiyure", minutes: "imizuzu", seconds: "imizuzwana" },
                zh: { days: "е¤©", hours: "е°Џж—¶", minutes: "е€†й’џ", seconds: "з§’" },
                jw: { days: "dina", hours: "jam", minutes: "menit", seconds: "detik" }
            };
            if (i[e]) {
                if (i[e][t]) return i[e][t];
                if (i.en[t]) return i.en[t]
            }
            return t
        }

        if ((i = typingMarkup(i)).labelSec = n(e.lang, e.labelSec), i.labelDay = n(e.lang, e.labelDay), i.labelMin = n(e.lang, e.labelMin), i.labelHour = n(e.lang, e.labelHour), function () {
            null === i.timeFontSize && (i.timeFontSize = 0);
            null === i.labelFontSize && (10 == i.typeTimer ? i.labelFontSize = Math.round(i.timeFontSize / 3) : i.labelFontSize = Math.round(i.timeFontSize / 2.5));
            null === i.spaceFontSize && (i.spaceFontSize = 0);
            null === i.textColor && (i.textColor = "#000000");
            null === i.parentCubeBorderColor && (i.parentCubeBorderColor = "#000000");
            null === i.timeFontColor && (i.timeFontColor = i.textColor);
            null === i.lableFontColor && (i.lableFontColor = i.textColor);
            null === i.spaceFontColor && (i.spaceFontColor = i.textColor);
            null !== i.labelFontStyle && 100 != i.labelFontStyle || (i.labelFontStyle = i.timeFontStyle);
            8 != i.typeTimer && 9 != i.typeTimer && 10 != i.typeTimer || null !== i.circleBorderWidth || (i.circleBorderWidth = 0);
            9 != i.typeTimer || null != i.smallCircleRadius && !isNaN(parseInt(i.smallCircleRadius)) || (i.smallCircleRadius = ht(i.timeFontSize / 12));
            10 == i.typeTimer && ((null == i.smallLinesWidth || isNaN(parseInt(i.smallLinesWidth))) && (i.smallLinesWidth = Math.floor(i.timeFontSize / 7)), (null == i.smallLinesHeight || isNaN(parseInt(i.smallLinesHeight))) && (i.smallLinesHeight = Math.floor(i.timeFontSize / 3.3)));
            null === i.circleBorderWidth && (i.timeFontSize > 45 ? i.circleBorderWidth = 6 : i.timeFontSize > 20 ? i.circleBorderWidth = 4 : i.circleBorderWidth = 2);
            null === i.smallCubeBorderColor && (i.smallCubeBorderColor = "#000000");
            null == i.circleFillColor && (i.circleFillColor = i.figureColor);
            if (null === i.circleBorderColorBottom || "" == i.circleBorderColorBottom) {
                var e = function (e) {
                    var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
                    return t ? { r: parseInt(t[1], 16), g: parseInt(t[2], 16), b: parseInt(t[3], 16) } : null
                }(i.circleBorderColorTop);
                null === e && (e = {
                    r: 0,
                    g: 0,
                    b: 0
                }), e.r ? i.circleBorderColorBottom = "rgba(" + e.r + "," + e.g + "," + e.b + ",0.7)" : i.circleBorderColorBottom = "rgba(63, 81, 181,0.7)"
            }
            (null == i.labelFontTopPadding || isNaN(i.labelFontTopPadding)) && (i.labelFontTopPadding = Math.round(i.timeFontSize / 6.2));
            (null === i.labelFontBottomPadding || isNaN(i.labelFontBottomPadding)) && (i.labelFontBottomPadding = Math.round(i.timeFontSize / 16.6));
            null === i.spaceFontLeftPadding && (i.spaceFontLeftPadding = Math.round(i.timeFontSize / 10));
            null === i.spaceFontRightPadding && (i.spaceFontRightPadding = Math.round(i.timeFontSize / 10));
            var t = mt(ht(i.timeFontStyle));
            "Arial" != i.timeFontFamily && "italic " == t && (i.cubeRightPadding = ht(i.cubeRightPadding) + ht(i.timeFontSize / 6))
        }(), e.reverse) {
            var o = i.circleBorderColorBottom;
            i.circleBorderColorBottom = i.circleBorderColorTop, i.circleBorderColorTop = o
        }
        Object.size = function (e) {
            var t, i = 0;
            for (t in e) e.hasOwnProperty(t) && i++;
            return i
        }, clearInterval(countDownTimer), function () {
            null == i.timeFontSize && (i.timeFontSize = 0);
            null == i.textColor && (i.textColor = "#000000")
        }();
        var a = t;
        void 0 === t && (a = document.getElementById("countDownTimer"));
        var r = a.nextElementSibling || a.nextSibling;
        if (r && void 0 !== r.getAttribute) {
            var d = r.getAttribute("data-stop-redraw");
            d && "true" == d && (i.stopRedraw = !0)
        }
        "undefined" != typeof stopGlobalRedraw && stopGlobalRedraw && (i.stopRedraw = !0), a.width = 100;
        var l = (1.5 * Math.max(ht(i.timeFontSize), ht(i.labelFontSize), ht(i.spaceFontSize))).toFixed(0);
        a.height = l, a.style.opacity = 0;
        var s = a.getContext("2d"), u = new Date, c = 0;
        Ft(i).getTime() > u.getTime() && (c = Math.abs(Ft(i).getTime() - u.getTime()));
        var m = Math.ceil(c / 1e3), h = 0, g = 0, b = 0, p = 0, F = dt(), f = 0, C = 0, y = 0, P = 0, S = 0,
            B = ht(i.widthFrame), v = ht(i.heightFrame), R = {}, W = 0, L = 0, I = 0, T = 0, z = 0, k = 0, w = 0, M = 0,
            x = 0, D = 0, N = 0, j = 0, O = 0, H = 0, A = 0, Z = 0, q = 0, U = 0, E = {}, G = {}, $ = 0, J = 0, K = 0,
            Q = 0, V = 0, X = 0, Y = 0, _ = 0, ee = 0, te = 0, ie = 0, ne = 0, oe = 0, ae = 0, re = 0, de = 0, le = 0,
            se = 0, ue = 0, ce = 0, me = 0, he = 0, ge = 0, be = 0, pe = 0, Fe = 0, fe = 0, Ce = 0, ye = 0, Pe = 0,
            Se = 0, Be = 0, ve = 0, Re = 0, We = 0, Le = 0, Ie = 0, Te = 0, ze = 0, ke = 0, we = void 0, Me = void 0,
            xe = void 0, De = 10, Ne = "", je = 0, Oe = 0, He = !1;
        i.disableWM && (He = !1);
        var Ae = 0;
        if (i.transparent ? (a.style.backgroundColor = "", a.style.background = "") : i.frameColor && (i.frameColor2 ? (a.style.backgroundColor = "", a.style.background = "linear-gradient(to right, " + i.frameColor + "," + i.frameColor2 + ")") : (a.style.background = "", a.style.backgroundColor = i.frameColor)), Ze(), Ue(), i.stopRedraw) return !0;

        function Ze() {
            We = .02 * h + 1.5, Re = .02 * g + 1.5, ve = .02 * b + 1.5, Be = .02 * p + 1.5, e.reverse && (We = 3 - We, Re = 3 - Re, ve = 3 - ve, Be = 3 - Be), lt("days"), st("days", i.labelDay), ut(i.spaceType), O = bt(Math.max(k + ht(i.timeSpace) * (j - 1), M) + ht(i.parentCubeBorderWidth) + ht(i.smallCubeBorderWidth) * j + ht(i.parentCubeLeftPadding) + ht(i.parentCubeRightPadding)), q += bt(R.space.width + ht(i.spaceFontLeftPadding) + ht(i.spaceFontRightPadding)), k = 0, M = 0, lt("hours"), st("hours", i.labelHour), ut(i.spaceType), H = bt(Math.max(k + ht(i.timeSpace), M) + ht(i.parentCubeBorderWidth) + 2 * ht(i.smallCubeBorderWidth) + ht(i.parentCubeLeftPadding) + ht(i.parentCubeRightPadding)), q += bt(R.space.width + ht(i.spaceFontLeftPadding) + ht(i.spaceFontRightPadding)), k = 0, M = 0, lt("minutes"), st("minutes", i.labelMin), ut(i.spaceType), A = bt(Math.max(k + ht(i.timeSpace), M) + ht(i.parentCubeBorderWidth) + 2 * ht(i.smallCubeBorderWidth) + ht(i.parentCubeLeftPadding) + ht(i.parentCubeRightPadding)), q += bt(R.space.width + ht(i.spaceFontLeftPadding) + ht(i.spaceFontRightPadding)), k = 0, M = 0, lt("seconds"), st("seconds", i.labelSec), Z = bt(Math.max(k + ht(i.timeSpace), M) + ht(i.parentCubeBorderWidth) + 2 * ht(i.smallCubeBorderWidth) + ht(i.parentCubeLeftPadding) + ht(i.parentCubeRightPadding)), C = bt(z + w + ht(i.parentCubeBorderWidth) + ht(i.smallCubeBorderWidth) + ht(i.parentCubeTopPadding) + ht(i.parentCubeBottomPadding) + ht(i.timeFontBottomPadding) + ht(i.timeFontTopPadding) + ht(e.labelFontTopPadding) + ht(e.labelFontBottomPadding)), i.fixedCube && (O = qe(), H = qe(), A = qe(), Z = qe()), f = bt(O + H + A + Z + q), i.disableDays && (f -= O + q / 3), W = Math.max(W, f), Le = C > qe() ? C : qe(), i.parentCubeBorderWidth > 0 && (Le += ht(i.parentCubeBorderWidth / 2)), Te = bt(Le / Math.sqrt(2)), i.writeCircle && (Te = bt(Le / 2)), null != i.circleRadius && !isNaN(parseInt(i.circleRadius)) && parseInt(i.circleRadius) > 0 && (Te = parseInt(i.circleRadius)), Te += ht(i.smallLinesHeight), C = bt(2 * Te + ht(2 * i.circleBorderWidth) + ht(2 * i.smallCircleRadius)), f = bt(2 * Te * 4 + q + 4 * ht(i.circleBorderWidth) + 3) + ht(8 * i.smallCircleRadius), i.disableDays && (f -= 2 * Te + ht(2 * i.circleBorderWidth) + ht(2 * i.smallCircleRadius)), function () {
                I = B > 10 ? B : f;
                v > 10 && v > C ? (T = v, !0) : T = C + 2;
                T < 10 && (T = 10);
                I < 10 && (I = 10);
                I += ht(i.parentCubeBorderWidth) + ht(4 * i.circleBorderWidth), T += ht(i.parentCubeBorderWidth), function () {
                    if (!He) return;
                    je = i.timeFontSize / 10;
                    var e = i.timeFontFamily, t = i.timeFontSize / 4, n = parseInt(i.timeFontStyle), o = ct(n),
                        r = mt(n);
                    De = r + o + function () {
                        var e = 0;
                        return (e = i.timeFontSize < 25 ? Math.round(i.timeFontSize / 2.5) : i.timeFontSize < 40 ? i.timeFontSize / 3 : i.timeFontSize / 4) < 6 && (e = 6), e > 15 && (e = 15), e
                    }() + "px " + e, s.font = De, 0 == Ae && t > 0 && (Ae = gt(a, De, Ne));
                    T += t + je + ht(i.circleBorderWidth) / 2
                }(), a.width = bt(I), a.height = bt(T)
            }(), a.style.opacity = 1, Ie = bt((T - C) / 2 + ht(i.circleBorderWidth)) + ht(i.smallCircleRadius), He && (Ie = Ie - Ae + ht(i.circleBorderWidth) / 2), Ce = bt(Ie + (Te - Le / 2)), ye = bt(Ce + Le / 2 - (N + w - x + ht(i.labelFontTopPadding)) / 2 - ht(i.labelFontBottomPadding) + ht(i.timeFontTopPadding));
            var t = 0;
            i.reverseLable && (t = w + i.labelFontTopPadding, ye += t), Pe = bt(ye + y + ht(i.cubeTopPadding) + ht(i.smallCubeBorderWidth) / 2), Se = bt(ye + z + w - x + ht(i.labelFontTopPadding) + ht(i.smallCubeBorderWidth) / 2 + ht(i.timeFontBottomPadding)), i.reverseLable && (Se -= t + z + ht(i.smallCubeBorderWidth) + i.labelFontTopPadding), U = bt(Ie + S / 2 + Te + ht(i.spaceFontTopPadding) - ht(i.spaceFontBottomPadding)), function () {
                if (ke = bt(Te - Le / 2), i.disableDays) return void (_ = bt((I - f) / 2 + (ht(i.spaceFontLeftPadding) + ht(i.spaceFontRightPadding) / 2) + ke + ht(.4 * i.smallCircleRadius) + ht(i.smallCircleRadius / 1.5) - ht(i.circleBorderWidth)));
                var e = 2;
                i.circleBorderWidth % 2 == 0 && (e = 3);
                J = bt((I - f) / 2 + ke + ht(i.circleBorderWidth) / 2) + ht(.4 * i.smallCircleRadius) + ht(i.smallCircleRadius / 2) + e - ht(1.5 * i.circleBorderWidth), ze = bt(J + Le / 2 - Te), Oe = ze;
                var t = 0, n = Object.size(R.days.digit);
                for (var o in R.days.digit) 0 === t ? (K = bt(J + Le / 2 + ht(i.smallCubeBorderWidth) / 2 - (D * n + ht(i.smallCubeBorderWidth) * n + ht(i.timeSpace) * (n - 1)) / 2) + ht(i.parentCubeLeftPadding) / 2 - ht(i.parentCubeRightPadding) / 2, Q = K, Q += bt(ht(i.timeFontLeftPadding) - ht(i.timeFontRightPadding))) : Q = bt(Q + D + ht(i.smallCubeBorderWidth) + ht(i.timeSpace)), E[t] = {}, E[t] = {
                    digit: R.days.digit[o].type,
                    x: Q
                }, t++;
                for (var a in t = 0, E) 0 == t ? (V = bt(K + ht(i.cubeLeftPadding) + ht(i.smallCubeBorderWidth) / 2), X = V, X += bt(ht(i.timeFontLeftPadding) - ht(i.timeFontRightPadding))) : X = bt(E[a].x + ht(i.cubeLeftPadding) + ht(i.smallCubeBorderWidth) / 2), G[t] = {}, G[t] = {
                    digit: R.days.digit[a].type,
                    x: X
                }, t++;
                Y = bt(J + Le / 2 - R.days.label.width / 2 + ht(i.labelFontLeftPadding) - ht(i.labelFontRightPadding)), $ = bt(J + Le + ht(i.spaceFontLeftPadding) + ke + ht(i.circleBorderWidth) / 2) + ht(1.5 * i.smallCircleRadius), _ = bt($ + R.space.width + ht(i.spaceFontRightPadding) + ke + ht(1.5 * i.circleBorderWidth)) + ht(i.smallCircleRadius / 2)
            }(), ee = bt(_ + Le / 2 - (2 * D + ht(i.smallCubeBorderWidth) + ht(i.timeSpace)) / 2 + ht(i.parentCubeLeftPadding) / 2 - ht(i.parentCubeRightPadding) / 2 + ht(i.timeFontLeftPadding) - ht(i.timeFontRightPadding)), te = bt(ee + D + ht(i.smallCubeBorderWidth) + ht(i.timeSpace)), ie = bt(ee + ht(i.cubeLeftPadding) + ht(i.smallCubeBorderWidth) / 2), ne = bt(te + ht(i.cubeLeftPadding) + ht(i.smallCubeBorderWidth) / 2), oe = bt(_ + Le / 2 - R.hours.label.width / 2 + ht(i.labelFontLeftPadding) - ht(i.labelFontRightPadding)), ae = bt(_ + Le + ht(i.spaceFontLeftPadding) + ke + ht(i.circleBorderWidth / 2) + ht(1.5 * i.smallCircleRadius)), we = bt(_ + Le / 2 - Te), i.disableDays && (Oe = we), re = bt(ae + R.space.width + ht(i.spaceFontRightPadding) + ke + ht(1.5 * i.circleBorderWidth)) + ht(i.smallCircleRadius / 2), de = bt(re + Le / 2 - (2 * D + ht(i.smallCubeBorderWidth) + ht(i.timeSpace)) / 2 + ht(i.parentCubeLeftPadding) / 2 - ht(i.parentCubeRightPadding) / 2 + ht(i.timeFontLeftPadding) - ht(i.timeFontRightPadding)), le = bt(de + D + ht(i.smallCubeBorderWidth) + ht(i.timeSpace)), se = bt(de + ht(i.cubeLeftPadding) + ht(i.smallCubeBorderWidth) / 2), ue = bt(le + ht(i.cubeLeftPadding) + ht(i.smallCubeBorderWidth) / 2), ce = bt(re + Le / 2 - R.minutes.label.width / 2 + ht(i.labelFontLeftPadding) - ht(i.labelFontRightPadding)), me = bt(re + Le + ht(i.spaceFontLeftPadding) + ke + ht(i.circleBorderWidth / 2) + ht(1.5 * i.smallCircleRadius)), Me = bt(re + Le / 2 - Te), he = bt(me + R.space.width + ht(i.spaceFontRightPadding) + ke + ht(1.5 * i.circleBorderWidth)) + ht(i.smallCircleRadius / 2), ge = bt(he + Le / 2 - (2 * D + ht(i.smallCubeBorderWidth) + ht(i.timeSpace)) / 2 + ht(i.parentCubeLeftPadding) / 2 - ht(i.parentCubeRightPadding) / 2 + ht(i.timeFontLeftPadding) - ht(i.timeFontRightPadding)), be = bt(ge + D + ht(i.smallCubeBorderWidth) + ht(i.timeSpace)), pe = bt(ge + ht(i.cubeLeftPadding) + ht(i.smallCubeBorderWidth) / 2), Fe = bt(be + ht(i.cubeLeftPadding) + ht(i.smallCubeBorderWidth) / 2), fe = bt(he + Le / 2 - R.seconds.label.width / 2 + ht(i.labelFontLeftPadding) - ht(i.labelFontRightPadding)), xe = bt(he + Le / 2 - Te)
        }

        function qe() {
            return ht(i.disableDays) && (O = 0), Math.max(Z, Math.max(A, Math.max(O, H)))
        }

        function Ue() {
            if (!0, s.clearRect(0, 0, W, L), !i.disableDays) {
                if (Ve(ze, Ie, Te, null, 90, -360), $e(ze, Ie, Te, null, 1.5, Be, 0), tt(J, Ce, Le, Le), _e(J, Ce, Le, Le), null != i.smallCubeColor) for (var e in s.fillStyle = i.smallCubeColor, E) s.fillRect(E[e].x, ye, D, N);
                if (i.smallCubeBorderWidth > 0) for (var t in s.lineWidth = i.smallCubeBorderWidth, s.strokeStyle = i.smallCubeBorderColor, E) s.strokeRect(E[t].x, ye, D, N);
                for (var n in G) at(i.timeFontSize, i.timeFontFamily, i.timeFontColor, i.timeFontStyle), Ee(G[n].digit, G[n].x, Pe, R.days.digit[n].width, "days", n);
                nt(i.labelFontSize, i.labelFontFamily, i.lableFontColor, i.labelFontStyle), it(i.labelDay, Y, Se), ot(i.spaceFontSize, i.spaceFontFamily, i.spaceFontColor, 0), s.fillText(i.spaceType, $, U), Ge(ze, Ie, Te, i.circleBorderColorBottom, 1.5, Be, !1), Ge(ze, Ie, Te, i.circleBorderColorTop, 1.5, Be, !0), Je(ze, Ie, Te, p), Qe(ze, Ie, Te, p)
            }
            if (Ve(we, Ie, Te, null, 90, -360), $e(we, Ie, Te, null, 1.5, ve, 0), tt(_, Ce, Le, Le), _e(_, Ce, Le, Le), void 0 === R.hours.digit[1] ? (ee = _ + ht(i.parentCubeLeftPadding) / 2 - ht(i.parentCubeRightPadding) / 2 + ht(i.timeFontLeftPadding) - ht(i.timeFontRightPadding), ee += bt(Le / 2 - D / 2), ie = bt(ee + ht(i.cubeLeftPadding) + ht(i.smallCubeBorderWidth) / 2), Ye(ee, null, ye), Xe(ee, null, ye), et(R.hours.digit[0].type, null, ie, ne, Pe, R.hours.digit[0].width, null, "hours")) : (Ye(ee, te, ye), Xe(ee, te, ye), et(R.hours.digit[0].type, R.hours.digit[1].type, ie, ne, Pe, R.hours.digit[0].width, R.hours.digit[1].width, "hours")), nt(i.labelFontSize, i.labelFontFamily, i.lableFontColor, i.labelFontStyle), it(i.labelHour, oe, Se), ot(i.spaceFontSize, i.spaceFontFamily, i.spaceFontColor, 0), s.fillText(i.spaceType, ae, U), Ge(we, Ie, Te, i.circleBorderColorBottom, 1.5, ve, !1), Ge(we, Ie, Te, i.circleBorderColorTop, 1.5, ve, !0), Je(we, Ie, Te, b), Qe(we, Ie, Te, b), Ve(Me, Ie, Te, null, 90, -360), $e(Me, Ie, Te, null, 1.5, Re, 0), tt(re, Ce, Le, Le), _e(re, Ce, Le, Le), void 0 === R.minutes.digit[1] ? (de = re + ht(i.parentCubeLeftPadding) / 2 - ht(i.parentCubeRightPadding) / 2 + ht(i.timeFontLeftPadding) - ht(i.timeFontRightPadding), de += bt(Le / 2 - D / 2), se = bt(de + ht(i.cubeLeftPadding) + ht(i.smallCubeBorderWidth) / 2), Ye(de, null, ye), Xe(de, null, ye), et(R.minutes.digit[0].type, null, se, ue, Pe, R.minutes.digit[0].width, null, "minutes")) : (Ye(de, le, ye), Xe(de, le, ye), et(R.minutes.digit[0].type, R.minutes.digit[1].type, se, ue, Pe, R.minutes.digit[0].width, R.minutes.digit[1].width, "minutes")), nt(i.labelFontSize, i.labelFontFamily, i.lableFontColor, i.labelFontStyle), it(i.labelMin, ce, Se), ot(i.spaceFontSize, i.spaceFontFamily, i.spaceFontColor, 0), s.fillText(i.spaceType, me, U), Ge(Me, Ie, Te, i.circleBorderColorBottom, 1.5, Re, !1), Ge(Me, Ie, Te, i.circleBorderColorTop, 1.5, Re, !0), Je(Me, Ie, Te, g), Qe(Me, Ie, Te, g), Ve(xe, Ie, Te, null, 90, -360), $e(xe, Ie, Te, null, 1.5, We, 0), tt(he, Ce, Le, Le), _e(he, Ce, Le, Le), void 0 === R.seconds.digit[1] ? (ge = he + ht(i.parentCubeLeftPadding) / 2 - ht(i.parentCubeRightPadding) / 2 + ht(i.timeFontLeftPadding) - ht(i.timeFontRightPadding), ge += bt(Le / 2 - D / 2), pe = bt(ge + ht(i.cubeLeftPadding) + ht(i.smallCubeBorderWidth) / 2), Ye(ge, null, ye), Xe(ge, null, ye), et(R.seconds.digit[0].type, null, pe, 0, Pe, R.seconds.digit[0].width, null, "seconds")) : (Ye(ge, be, ye), Xe(ge, be, ye), et(R.seconds.digit[0].type, R.seconds.digit[1].type, pe, Fe, Pe, R.seconds.digit[0].width, R.seconds.digit[1].width, "seconds")), nt(i.labelFontSize, i.labelFontFamily, i.lableFontColor, i.labelFontStyle), it(i.labelSec, fe, Se), Ge(xe, Ie, Te, i.circleBorderColorBottom, 1.5, We, !1), Ge(xe, Ie, Te, i.circleBorderColorTop, 1.5, We, !0), Je(xe, Ie, Te, h), Qe(xe, Ie, Te, h), He) {
                s.font = De, s.fillStyle = i.figureColor, i.figureColor === i.frameColor && (s.fillStyle = i.timeFontColor), i.timeFontColor !== i.frameColor && (s.fillStyle = i.timeFontColor);
                var o = Ie + C + Ae + je - ht(i.circleBorderWidth) / 2;
                o > T && (o = T - 3), s.fillText(Ne, Oe, o)
            }
        }

        function Ee(e, t, n, o, a, r) {
            var d = 0, l = F[a].split(""), u = mt(parseInt(i.timeFontStyle)), c = ct(parseInt(i.timeFontStyle)),
                m = parseInt(r);
            "Montserrat" === i.timeFontFamily && "function" == typeof dStringRMontserrat && (d = dStringRMontserrat(e, o, l, u, m, i, c)), "Roboto" === i.timeFontFamily && "function" == typeof dStringRoboto && (d = dStringRRoboto(e, o, l, u, m, i, c)), "Roboto Condensed" === i.timeFontFamily && "function" == typeof dStringRobotoCondensed && (d = dStringRRobotoCondensed(e, o, l, u, m, i, c)), "Open Sans" === i.timeFontFamily && "function" == typeof dStringROpenSans && (d = dStringROpenSans(e, o, l, u, m, i, c)), "Lato" === i.timeFontFamily && "function" == typeof dStringRLato && (d = dStringRLato(e, o, l, u, m, i, c)), "PT Sans" === i.timeFontFamily && "function" == typeof dStringRPTSans && (d = dStringRPTSans(e, o, l, u, m, i, c)), "Source Sans Pro" === i.timeFontFamily && "function" == typeof dStringRSourceSansPro && (d = dStringRSourceSansPro(e, o, l, u, m, i, c)), s.fillText(e, t + d, n)
        }

        function Ge(e, t, n, o, a, r, d) {
            if (void 0 === d && (d = !0), i.circleBorderWidth > 0) {
                var l = e + n, u = t + n, c = n + i.circleBorderWidth / 2 - .5;
                s.beginPath(), s.arc(l, u, c, a * Math.PI, r * Math.PI, d), s.lineWidth = i.circleBorderWidth, s.strokeStyle = o, s.stroke()
            }
        }

        function $e(e, t, n, o, a, r, d) {
            if (void 0 !== i.circleFillColor3 && null != i.circleFillColor3) {
                o = i.circleFillColor3;
                var l = e + n, u = t + n, c = n;
                s.beginPath(), s.fillStyle = o, s.arc(l, u, c, a * Math.PI, r * Math.PI, d), s.lineTo(l, u), s.closePath(), s.fill()
            }
        }

        function Je(e, t, n, o) {
            if (!isNaN(parseInt(i.smallLinesWidth)) && "undefined" !== i.smallLinesWidth && 0 !== i.smallLinesWidth && null !== i.smallLinesWidth) {
                1 === i.reverse && (o *= -1);
                var a = 2 * Math.PI, r = a - Math.PI / 2, d = o;
                i.reverse && (d = 100 - o);
                var l = i.smallLinesWidth, u = i.countSmallLines;
                if (null == u) {
                    var c = 2 * Math.PI * n;
                    u = Math.round(c / l)
                }
                var m = e + (n - (l += i.smallLinesWidth / 2) / 2), h = t + (n - l / 2), g = a / u, b = l / 2,
                    p = i.smallLinesHeight;
                s.save();
                for (var F = 1; F <= u; F++) {
                    var f = 100 * r / a - 74;
                    s.fillStyle = d > f ? i.smallLineFillColor2 : i.smallLineFillColor;
                    var C = m + n * Math.cos(r), y = h + n * Math.sin(r), P = 360 * (F - 1) / u;
                    s.setTransform(1, 0, 0, 1, 0, 0), s.translate(C + b, y + b), s.rotate(P * (Math.PI / 180)), s.translate(-(C + b), -(y + b)), s.beginPath(), Ke(C + b / 2, y + b, b, p, n), r += g
                }
                s.restore()
            }
        }

        function Ke(e, t, i, n, o) {
            var a = e, r = t, d = i, l = n, u = o / 111;
            s.moveTo(a, r), s.lineTo(a + d, r), s.lineTo(a + d - u, r + l), s.lineTo(a + u, r + l), s.fill()
        }

        function Qe(e, t, n, o) {
            if (void 0 !== i.smallCircleRadius && 0 != i.smallCircleRadius && null != i.smallCircleRadius) {
                var a = 2 * Math.PI, r = a - Math.PI / 2, d = o;
                i.reverse && (d = 100 - o);
                var l = parseInt(i.smallCircleRadius), u = parseInt(i.countSmallCircles);
                if (isNaN(u) || 0 === u) {
                    var c = 2 * Math.PI * n / 2;
                    u = parseInt(c / l)
                }
                for (var m = e + (n - l), h = t + (n - l), g = a / u, b = 1; b <= u; b++) {
                    s.beginPath();
                    var p = 100 * r / a - 75;
                    s.fillStyle = d > p ? i.smallCircleFillColor2 : i.smallCircleFillColor;
                    var F = m + n * Math.cos(r) + l, f = h + n * Math.sin(r) + l;
                    s.arc(F, f, l, 0 * Math.PI, 360 * Math.PI), s.closePath(), s.fill(), r += g
                }
            }
        }

        function Ve(e, t, n, o, a, r) {
            if (null == o && (o = i.circleFillColor), null != i.circleFillColor) if (s.lineWidth = i.circleBorderWidth, null != i.circleFillColor2) ; else {
                var d = e + n, l = t + n, u = n;
                s.beginPath(), s.fillStyle = o, s.arc(d, l, u, a, r, !0), s.closePath(), s.fill()
            }
        }

        function Xe(e, t, n) {
            i.smallCubeBorderWidth > 0 && (s.lineWidth = i.smallCubeBorderWidth, s.strokeStyle = i.smallCubeBorderColor, s.strokeRect(e, n, D, N), null != t && s.strokeRect(t, n, D, N))
        }

        function Ye(e, t, n) {
            null != i.smallCubeColor && (s.fillStyle = i.smallCubeColor, s.fillRect(e, n, D, N), null != t && s.fillRect(t, n, D, N))
        }

        function _e(e, t, n, o) {
            i.parentCubeBorderWidth > 0 && (s.lineWidth = i.parentCubeBorderWidth, s.strokeStyle = i.parentCubeBorderColor, s.strokeRect(e, t, n, o))
        }

        function et(e, t, n, o, a, r, d, l) {
            at(i.timeFontSize, i.timeFontFamily, i.timeFontColor, i.timeFontStyle), null != t ? (Ee(e, n, a, r, l, 0), Ee(t, o, a, d, l, 1)) : Ee(e, n, a, r, l, 0)
        }

        function tt(e, t, n, o) {
            null != i.parentCubeColor && (i.parentCubeColor2, s.fillStyle = i.parentCubeColor, s.fillRect(e, t, n, o))
        }

        function it(e, t, n) {
            i.registerLetter && "0" != i.registerLetter ? "1" === i.registerLetter ? e = e.toLowerCase() : "2" === i.registerLetter && (e = pt(e)) : e = e.toUpperCase(), s.fillText(e, t, n)
        }

        function nt(e, t, i, n) {
            rt(e, t, i, n, 1)
        }

        function ot(e, t, i, n) {
            rt(e, t, i, n, 2)
        }

        function at(e, t, i, n) {
            rt(e, t, i, n, 0)
        }

        function rt(e, t, n, o, a) {
            o = parseInt(o), (isNaN(o) || 100 === o) && (o = ht(i.timeFontStyle)), t && "0" !== t || (t = i.timeFontFamily), 1 === a ? null == e && (e = (i.timeFontSize / 2).toFixed()) : 2 === a && null == e && (e = (i.timeFontSize / 1.1).toFixed());
            var r = ct(o), d = mt(o);
            s.font = d + r + e + "px " + t, n || (n = i.textColor), s.fillStyle = n
        }

        function dt() {
            var e = {};
            return m < 0 && (m = 0), e.days = Math.floor(m / 60 / 60 / 24).toString(), e.hours = (Math.floor(m / 60 / 60) % 24).toString(), e.minutes = (Math.floor(m / 60) % 60).toString(), e.seconds = (Math.floor(m) % 60).toString(), e.days = 1 != e.days.length || i.removeDZero ? e.days : "0" + e.days, e.hours = 1 != e.hours.length || i.removeHZero ? e.hours : "0" + e.hours, e.minutes = 1 != e.minutes.length || i.removeMZero ? e.minutes : "0" + e.minutes, e.seconds = 1 != e.seconds.length || i.removeSZero ? e.seconds : "0" + e.seconds, m -= 1, h = 100 - 100 * parseInt(e.seconds) / 60, g = 100 - 100 * parseInt(e.minutes) / 60, b = 100 - 100 * parseInt(e.hours) / 24, p = 100 - 100 * parseInt(e.days) / 366, e
        }

        function lt(e) {
            if ("days" !== e || !i.disableDays) {
                var t = F[e].toString().split(""), n = i.timeFontStyle, o = ct(n),
                    r = mt(n) + o + i.timeFontSize + "px " + i.timeFontFamily;
                s.font = r, R[e] = {};
                var d = 0;
                for (var l in t) if (!isNaN(parseInt(l))) {
                    var u = t[l];
                    void 0 === R[e].digit && (R[e].digit = {}), R[e].digit[d] = {};
                    var c = u.toString();
                    "Montserrat" === i.timeFontFamily && (c = "0");
                    var m = s.measureText(c).width;
                    R[e].digit[d].width = s.measureText(u.toString()).width, R[e].digit[d].type = u, 0 == y && i.timeFontSize > 0 && (y = gt(a, r, u)), D = Math.max(D, ht(i.cubeRightPadding) + m + ht(i.cubeLeftPadding) + ht(i.smallCubeBorderWidth)), k += ht(i.timeFontLeftPadding) + D + ht(i.timeFontRightPadding), z = Math.max(z, ht(i.cubeTopPadding) + y + ht(i.cubeBottomPadding) + ht(i.smallCubeBorderWidth)), 0, N = z, d++
                }
                return j = d, R
            }
        }

        function st(e, t) {
            if ("days" !== e || !i.disableDays) {
                i.registerLetter && "0" !== i.registerLetter ? "1" === i.registerLetter ? t = t.toLowerCase() : "2" === i.registerLetter && (t = pt(t)) : t = t.toUpperCase();
                var n = i.labelFontFamily, o = i.labelFontSize;
                n && "0" !== n || (n = i.timeFontFamily), null == o && (o = (ht(i.timeFontSize) / 2).toFixed());
                var r = parseInt(i.labelFontStyle);
                (isNaN(r) || 100 === r) && (r = ht(i.timeFontStyle));
                var d = ct(r), l = mt(r) + d + o + "px " + n;
                s.font = l, R[e].label = {};
                var u = s.measureText(t).width;
                return R[e].label.width = u, 0 == P && o > 0 && "" != t && null != t && (P = gt(a, l, t)), w = Math.max(w, P), x = 0, M += u, R
            }
        }

        function ut(e) {
            var t = i.spaceFontFamily, n = i.spaceFontSize;
            t && "0" !== t || (t = i.timeFontFamily), null == n && (n = (ht(i.timeFontSize) / 1.1).toFixed());
            var o = "normal normal " + n + "px " + t;
            s.font = o, R.space = {};
            var r = s.measureText(e).width;
            return R.space.width = r, 0 == S && n > 0 && (S = gt(a, o, e)), R
        }

        function ct(e) {
            var t = "normal ";
            return 1 !== e && 3 !== e && 8 !== e && 9 !== e || (t = "bold "), t
        }

        function mt(e) {
            var t = "normal ";
            return 2 !== e && 3 !== e && 5 !== e && 7 !== e && 9 !== e || (t = "italic "), t
        }

        function ht(e) {
            return e = parseInt(e), isNaN(e) && (e = 0), e
        }

        function gt(e, t, i) {
            var n = e.getContext("2d"), o = e.width, a = e.height;
            n.font = t, n.textAlign = "left", n.textBaseline = "top", n.fillText(i, 25, 5);
            var r = n.getImageData(0, 0, o, a).data;
            n.clearRect(0, 0, o, a);
            for (var d = -1, l = -1, s = 0; s < a; s++) {
                for (var u = 0; u < o; u++) {
                    if (r[4 * (o * s + u) + 3] > 0) {
                        d = s;
                        break
                    }
                }
                if (d >= 0) break
            }
            for (s = a; s > 0; s--) {
                for (u = 0; u < o; u++) {
                    if (r[4 * (o * s + u) + 3] > 0) {
                        l = s;
                        break
                    }
                }
                if (l >= 0) break
            }
            return l - d
        }

        function bt(e) {
            return Math.floor(e)
        }

        function pt(e) {
            return e.charAt(0).toUpperCase() + e.slice(1)
        }

        function Ft(e) {
            var t = void 0, i = void 0, n = void 0, o = void 0, a = void 0, r = void 0, d = void 0;
            try {
                var l = e.endDate.split("/");
                t = l[2], i = l[0] - 1, n = l[1]
            } catch (e) {
                t = 0, i = 0, n = 0
            }
            try {
                var s = e.endTime.split(":");
                o = ht(s[0]), a = ht(s[1])
            } catch (e) {
                o = 0, a = 0
            }
            try {
                var u = e.timeZoneCode.split(":");
                r = ht(u[0]), d = ht(u[1])
            } catch (e) {
                r = 0, d = 0
            }
            return new Date(Date.UTC(t, i, n, o - r, a - d, 0))
        }

        countDownTimer = setInterval(function () {
            F = dt(), f = 0, E = {}, G = {}, k = 0, M = 0, D = 0, q = 0, Ze(), Ue()
        }, 1e3)
    }

    Object.assign || Object.defineProperty(Object, "assign", {
        enumerable: !1,
        configurable: !0,
        writable: !0,
        value: function (e, t) {
            if (null == e) throw new TypeError("Cannot convert first argument to object");
            for (var i = Object(e), n = 1; n < arguments.length; n++) {
                var o = arguments[n];
                if (null != o) for (var a = Object.keys(Object(o)), r = 0, d = a.length; r < d; r++) {
                    var l = a[r], s = Object.getOwnPropertyDescriptor(o, l);
                    void 0 !== s && s.enumerable && (i[l] = o[l])
                }
            }
            return i
        }
    });
    for (var h = "timer_js", e = document.getElementsByClassName(h), i = 0; i < e.length; i++) {
        var n = e[i], id = h + "_" + i;
        if (!document.querySelector("script.timer_js")) return;
        if (null === document.getElementById(id)) {
            var s = document.createElement("canvas");
            var settings = {
                typeTimer: 9,
                fontUrl: null,
                frameColor: "#ffffff",
                textColor: "#3f51b5",
                figureColor: "transparent",
                parentCubeBorderColor: null,
                parentCubeBorderWidth: null,
                circleFillColor3: null,
                circleBorderColorTop: null,
                circleBorderColorBottom: null,
                circleBorderWidth: null,
                smallCircleRadius: null,
                smallCircleFillColor: "#3f51b5",
                smallCircleFillColor2: "#0f8eee",
                countSmallCircles: null,
                smallLinesHeight: null,
                smallLineFillColor: "#3f51b5",
                smallLineFillColor2: "#0f8eee",
                countSmallLines: null,
                timeFontSize: "50",
                timeFontFamily: "Arial",
                timeFontStyle: "0",
                registerLetter: "0",
                timerName: "Deadline",
                endDate: "03\/07\/2024",
                endTime: "14:15",
                timeZone: "USA",
                timeZoneCode: "-05:00",
                lang: "EN",
                widthFrame: "10",
                heightFrame: "10",
                frameColor2: null,
                timeFontColor: null,
                timeFontTopPadding: null,
                timeFontRightPadding: null,
                timeFontBottomPadding: null,
                timeFontLeftPadding: null,
                timeSpace: null,
                labelFontSize: null,
                labelFontFamily: "0",
                lableFontColor: null,
                labelFontTopPadding: null,
                labelFontRightPadding: null,
                labelFontBottomPadding: null,
                labelFontLeftPadding: null,
                labelFontStyle: "100",
                labelDay: "DAYS",
                labelHour: "HOURS",
                labelMin: "MINUTES",
                labelSec: "SECONDS",
                spaceFontSize: null,
                spaceFontFamily: "0",
                spaceFontColor: null,
                spaceFontTopPadding: null,
                spaceFontRightPadding: null,
                spaceFontBottomPadding: null,
                spaceFontLeftPadding: null,
                spaceType: ":",
                smallCubeBorderWidth: "0",
                smallCubeBorderColor: null,
                smallCubeColor: null,
                cubeTopPadding: null,
                cubeRightPadding: null,
                cubeBottomPadding: null,
                cubeLeftPadding: null,
                parentCubeColor: null,
                parentCubeColor2: null,
                parentCubeTopPadding: null,
                parentCubeRightPadding: null,
                parentCubeBottomPadding: null,
                parentCubeLeftPadding: null,
                circleRadius: null,
                circleFillColor: null,
                circleFillColor2: null,
                smallLinesWidth: null,
                transparent: "true",
                fixedCube: "true",
                wmr: 0,
                disableDays: false,
                disableMilliseconds: false,
                disableHours: false,
                disableMinutes: false,
                disableSeconds: false,
                reverseLable: false,
                removeDZero: false,
                removeHZero: false,
                removeMZero: false,
                removeSZero: false,
                centeredImage: false,
                fixedBar: false,
                uid: "timer_js",
                disableWM: false,
                ...window.timer_config,
            };
            s.id = id, s.style.opacity = 0, s.width = 0, s.height = 0, n.parentNode.insertBefore(s, n), counterRing(settings, s)
        }
    }
})();