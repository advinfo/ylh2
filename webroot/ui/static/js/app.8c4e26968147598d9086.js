"use strict";

webpackJsonp([1], { 0: function _(t, e) {}, AmX3: function AmX3(t, e) {
    /**
     * jQuery MD5 hash algorithm function
     *
     * 	<code>
     * 		Calculate the md5 hash of a String
     * 		String $.md5 ( String str )
     * 	</code>
     *
     * Calculates the MD5 hash of str using the 禄 RSA Data Security, Inc. MD5 Message-Digest Algorithm, and returns that hash.
     * MD5 (Message-Digest algorithm 5) is a widely-used cryptographic hash function with a 128-bit hash value. MD5 has been employed in a wide variety of security applications, and is also commonly used to check the integrity of data. The generated hash is also non-reversable. Data cannot be retrieved from the message digest, the digest uniquely identifies the data.
     * MD5 was developed by Professor Ronald L. Rivest in 1994. Its 128 bit (16 byte) message digest makes it a faster implementation than SHA-1.
     * This script is used to process a variable length message into a fixed-length output of 128 bits using the MD5 algorithm. It is fully compatible with UTF-8 encoding. It is very useful when u want to transfer encrypted passwords over the internet. If you plan using UTF-8 encoding in your project don't forget to set the page encoding to UTF-8 (Content-Type meta tag).
     * This function orginally get from the WebToolkit and rewrite for using as the jQuery plugin.
     *
     * Example
     * 	Code
     * 		<code>
     * 			$.md5("I'm Persian.");
     * 		</code>
     * 	Result
     * 		<code>
     * 			"b8c901d0f02223f9761016cfff9d68df"
     * 		</code>
     *
     * @alias Muhammad Hussein Fattahizadeh < muhammad [AT] semnanweb [DOT] com >
     * @link http://www.semnanweb.com/jquery-plugin/md5.html
     * @see http://www.webtoolkit.info/
     * @license http://www.gnu.org/licenses/gpl.html [GNU General Public License]
     * @param {jQuery} {md5:function(string))
     * @return string
     */
    var n, i, r, o, s, a, c;n = function n(t, e) {
      return t << e | t >>> 32 - e;
    }, i = function i(t, e) {
      var n, i, r, o, s;return r = 2147483648 & t, o = 2147483648 & e, s = (1073741823 & t) + (1073741823 & e), (n = 1073741824 & t) & (i = 1073741824 & e) ? 2147483648 ^ s ^ r ^ o : n | i ? 1073741824 & s ? 3221225472 ^ s ^ r ^ o : 1073741824 ^ s ^ r ^ o : s ^ r ^ o;
    }, r = function r(t, e, _r, o, s, a, c) {
      return t = i(t, i(i(function (t, e, n) {
        return t & e | ~t & n;
      }(e, _r, o), s), c)), i(n(t, a), e);
    }, o = function o(t, e, r, _o, s, a, c) {
      return t = i(t, i(i(function (t, e, n) {
        return t & n | e & ~n;
      }(e, r, _o), s), c)), i(n(t, a), e);
    }, s = function s(t, e, r, o, _s, a, c) {
      return t = i(t, i(i(function (t, e, n) {
        return t ^ e ^ n;
      }(e, r, o), _s), c)), i(n(t, a), e);
    }, a = function a(t, e, r, o, s, _a, c) {
      return t = i(t, i(i(function (t, e, n) {
        return e ^ (t | ~n);
      }(e, r, o), s), c)), i(n(t, _a), e);
    }, c = function c(t) {
      var e,
          n = "",
          i = "";for (e = 0; e <= 3; e++) {
        n += (i = "0" + (t >>> 8 * e & 255).toString(16)).substr(i.length - 2, 2);
      }return n;
    }, jQuery.extend({ md5: function md5(t) {
        var e,
            n,
            l,
            u,
            f,
            d,
            p,
            h,
            m,
            v = Array();for (v = function (t) {
          for (var e, n = t.length, i = n + 8, r = 16 * ((i - i % 64) / 64 + 1), o = Array(r - 1), s = 0, a = 0; a < n;) {
            s = a % 4 * 8, o[e = (a - a % 4) / 4] = o[e] | t.charCodeAt(a) << s, a++;
          }return s = a % 4 * 8, o[e = (a - a % 4) / 4] = o[e] | 128 << s, o[r - 2] = n << 3, o[r - 1] = n >>> 29, o;
        }(t = function (t) {
          t = t.replace(/\x0d\x0a/g, "\n");for (var e = "", n = 0; n < t.length; n++) {
            var i = t.charCodeAt(n);i < 128 ? e += String.fromCharCode(i) : i > 127 && i < 2048 ? (e += String.fromCharCode(i >> 6 | 192), e += String.fromCharCode(63 & i | 128)) : (e += String.fromCharCode(i >> 12 | 224), e += String.fromCharCode(i >> 6 & 63 | 128), e += String.fromCharCode(63 & i | 128));
          }return e;
        }(t)), d = 1732584193, p = 4023233417, h = 2562383102, m = 271733878, e = 0; e < v.length; e += 16) {
          n = d, l = p, u = h, f = m, d = r(d, p, h, m, v[e + 0], 7, 3614090360), m = r(m, d, p, h, v[e + 1], 12, 3905402710), h = r(h, m, d, p, v[e + 2], 17, 606105819), p = r(p, h, m, d, v[e + 3], 22, 3250441966), d = r(d, p, h, m, v[e + 4], 7, 4118548399), m = r(m, d, p, h, v[e + 5], 12, 1200080426), h = r(h, m, d, p, v[e + 6], 17, 2821735955), p = r(p, h, m, d, v[e + 7], 22, 4249261313), d = r(d, p, h, m, v[e + 8], 7, 1770035416), m = r(m, d, p, h, v[e + 9], 12, 2336552879), h = r(h, m, d, p, v[e + 10], 17, 4294925233), p = r(p, h, m, d, v[e + 11], 22, 2304563134), d = r(d, p, h, m, v[e + 12], 7, 1804603682), m = r(m, d, p, h, v[e + 13], 12, 4254626195), h = r(h, m, d, p, v[e + 14], 17, 2792965006), p = r(p, h, m, d, v[e + 15], 22, 1236535329), d = o(d, p, h, m, v[e + 1], 5, 4129170786), m = o(m, d, p, h, v[e + 6], 9, 3225465664), h = o(h, m, d, p, v[e + 11], 14, 643717713), p = o(p, h, m, d, v[e + 0], 20, 3921069994), d = o(d, p, h, m, v[e + 5], 5, 3593408605), m = o(m, d, p, h, v[e + 10], 9, 38016083), h = o(h, m, d, p, v[e + 15], 14, 3634488961), p = o(p, h, m, d, v[e + 4], 20, 3889429448), d = o(d, p, h, m, v[e + 9], 5, 568446438), m = o(m, d, p, h, v[e + 14], 9, 3275163606), h = o(h, m, d, p, v[e + 3], 14, 4107603335), p = o(p, h, m, d, v[e + 8], 20, 1163531501), d = o(d, p, h, m, v[e + 13], 5, 2850285829), m = o(m, d, p, h, v[e + 2], 9, 4243563512), h = o(h, m, d, p, v[e + 7], 14, 1735328473), p = o(p, h, m, d, v[e + 12], 20, 2368359562), d = s(d, p, h, m, v[e + 5], 4, 4294588738), m = s(m, d, p, h, v[e + 8], 11, 2272392833), h = s(h, m, d, p, v[e + 11], 16, 1839030562), p = s(p, h, m, d, v[e + 14], 23, 4259657740), d = s(d, p, h, m, v[e + 1], 4, 2763975236), m = s(m, d, p, h, v[e + 4], 11, 1272893353), h = s(h, m, d, p, v[e + 7], 16, 4139469664), p = s(p, h, m, d, v[e + 10], 23, 3200236656), d = s(d, p, h, m, v[e + 13], 4, 681279174), m = s(m, d, p, h, v[e + 0], 11, 3936430074), h = s(h, m, d, p, v[e + 3], 16, 3572445317), p = s(p, h, m, d, v[e + 6], 23, 76029189), d = s(d, p, h, m, v[e + 9], 4, 3654602809), m = s(m, d, p, h, v[e + 12], 11, 3873151461), h = s(h, m, d, p, v[e + 15], 16, 530742520), p = s(p, h, m, d, v[e + 2], 23, 3299628645), d = a(d, p, h, m, v[e + 0], 6, 4096336452), m = a(m, d, p, h, v[e + 7], 10, 1126891415), h = a(h, m, d, p, v[e + 14], 15, 2878612391), p = a(p, h, m, d, v[e + 5], 21, 4237533241), d = a(d, p, h, m, v[e + 12], 6, 1700485571), m = a(m, d, p, h, v[e + 3], 10, 2399980690), h = a(h, m, d, p, v[e + 10], 15, 4293915773), p = a(p, h, m, d, v[e + 1], 21, 2240044497), d = a(d, p, h, m, v[e + 8], 6, 1873313359), m = a(m, d, p, h, v[e + 15], 10, 4264355552), h = a(h, m, d, p, v[e + 6], 15, 2734768916), p = a(p, h, m, d, v[e + 13], 21, 1309151649), d = a(d, p, h, m, v[e + 4], 6, 4149444226), m = a(m, d, p, h, v[e + 11], 10, 3174756917), h = a(h, m, d, p, v[e + 2], 15, 718787259), p = a(p, h, m, d, v[e + 9], 21, 3951481745), d = i(d, n), p = i(p, l), h = i(h, u), m = i(m, f);
        }return (c(d) + c(p) + c(h) + c(m)).toLowerCase();
      } });
  }, NHnr: function NHnr(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var i = n("7+uW"),
        r = n("8+8L"),
        o = n("Dd8w"),
        s = n.n(o),
        a = n("NYxO"),
        c = { render: function render() {
        this.$createElement;this._self._c;return this._m(0);
      }, staticRenderFns: [function () {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { staticClass: "win-loading", attrs: { id: "loading_login" } }, [e("img", { attrs: { src: "/static/img/loading.png", alt: "" } })]);
      }] },
        l = n("VU/8")({ name: "LoadingComponent" }, c, !1, null, null, null).exports,
        u = { computed: s()({}, Object(a.c)({ alert: function alert(t) {
          return t.NotifyService.alert;
        } })), mounted: function mounted() {
        var t = this;this.$nextTick(function () {
          setTimeout(function () {
            t.$store.commit("alert", {});
          }, t.alert.time);
        });
      } },
        f = { render: function render() {
        var t = this.$createElement;return (this._self._c || t)("div", { staticClass: "alert", domProps: { innerHTML: this._s(this.alert.text) } });
      }, staticRenderFns: [] },
        d = n("VU/8")(u, f, !1, null, null, null).exports,
        p = { name: "App", computed: s()({}, Object(a.c)({ loading: function loading(t) {
          return t.NotifyService.loading;
        }, alert: function alert(t) {
          return t.NotifyService.alert;
        } })), components: { LoadingComponent: l, AlertComponent: d }, mounted: function mounted() {
        window.onload = function () {
          var t = document.documentElement.clientWidth / 375 * 16;document.getElementsByTagName("html")[0].style.fontSize = t + "px", window.addEventListener("resize", function () {
            document.getElementsByTagName("html")[0].style.fontSize = t = document.documentElement.clientWidth / 375 * 16 + "px";
          });
        };
      } },
        h = { render: function render() {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { attrs: { id: "app" } }, [e("router-view"), this._v(" "), this.loading ? e("loading-component") : this._e(), this._v(" "), this.alert.text ? e("alert-component") : this._e()], 1);
      }, staticRenderFns: [] },
        m = n("VU/8")(p, h, !1, null, null, null).exports,
        v = n("/ocq"),
        g = n("DNVT"),
        y = { name: "BannerComponent", props: ["swiper"], mounted: function mounted() {
        this.$nextTick(function () {
          new g.a(".banner-container", { autoplay: { delay: this.ApiConfig.banner_delay }, loop: !0, pagination: { el: ".swiper-pagination", bulletClass: "my-bullet", bulletActiveClass: "my-bullet-active" }, observer: !0, observeParents: !0 });
        });
      } },
        b = { render: function render() {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { staticClass: "c-banner" }, [e("div", { staticClass: "banner-container" }, [e("div", { staticClass: "swiper-wrapper", attrs: { id: "banner" } }, this._l(this.swiper, function (t) {
          return e("div", { staticClass: "swiper-slide" }, [e("a", { attrs: { href: t.link || "javascript:;" } }, [e("img", { attrs: { src: "//push.av365.cn" + t.image, alt: "" } })])]);
        })), this._v(" "), e("div", { staticClass: "swiper-pagination" })])]);
      }, staticRenderFns: [] },
        x = n("VU/8")(y, b, !1, null, null, null).exports,
        w = { name: "LoginPage", data: function data() {
        return { swiper: null, thirdLinks: null, switch_on: !0 };
      }, methods: { doLogin: function doLogin() {
          var t = this;if (!this.switch_on) return !1;this.switch_on = !1, this.$store.commit("loading", !0), this.$refs.password.value = $.md5(this.$refs.password.value), this.$store.dispatch("doLogin", { account: this.$refs.account.value, password: this.$refs.password.value }).then(function (e) {
            var n = e.data;"true" == n.success ? t.$router.push({ path: "/" }) : $(".l-tips").text(n.msg).show(), t.$store.commit("loading", !1), t.switch_on = !0;
          });
        } }, mounted: function mounted() {
        var t = this;this.$store.dispatch("getBanner").then(function (e) {
          var n = e.data;t.swiper = n;
        }), this.$store.dispatch("getThirdUrl").then(function (e) {
          var n = e.data;t.thirdLinks = n.ThirdpartyLogin;
        });
      }, components: { BannerComponent: x } },
        A = { render: function render() {
        var t = this,
            e = t.$createElement,
            i = t._self._c || e;return i("div", { staticClass: "login-app app-container" }, [t.swiper ? i("banner-component", { attrs: { swiper: t.swiper } }) : t._e(), t._v(" "), i("div", { staticClass: "c-login" }, [i("img", { staticClass: "l-404", attrs: { src: n("NeAH"), alt: "" } }), t._v(" "), i("p", { staticStyle: { "padding-bottom": "10px" } }, [t._v("您尚未登录，无法浏览相关内容")]), t._v(" "), i("form", { attrs: { action: "", id: "login-form" } }, [i("input", { ref: "account", staticClass: "l-input l-username", attrs: { type: "text", name: "account", placeholder: "请输入您的账号/手机号" } }), t._v(" "), i("input", { ref: "password", staticClass: "l-input l-password", attrs: { type: "password", name: "password", onclick: "this.value = null", placeholder: "请输入您的密码" } }), t._v(" "), i("p", { staticClass: "l-tips" }), t._v(" "), i("div", { staticClass: "l-btn-group" }, [i("a", { staticClass: "l-register", attrs: { href: "#", target: "_blank" } }, [t._v("注册")]), t._v(" "), i("a", { staticClass: "l-btn", attrs: { href: "javascript:;" }, on: { click: function click(e) {
              t.doLogin();
            } } }, [t._v("登陆")])])]), t._v(" "), i("p", { staticClass: "l-line" }, [t._v("或")]), t._v(" "), i("div", { staticClass: "l-link", attrs: { id: "l-link" } }, t._l(t.thirdLinks, function (e) {
          return i("a", { attrs: { href: e.url || "javascript:;", target: "_blank" } }, [i("img", { attrs: { src: t.ApiConfig.domain + e.icon, alt: e.party } })]);
        }))])], 1);
      }, staticRenderFns: [] },
        C = n("VU/8")(w, A, !1, null, null, null).exports,
        _ = n("BO1k"),
        T = n.n(_),
        k = { data: function data() {
        return { roomType: null, title: "分类", loadData: { sort: "最热", categoryid: null, searchStr: "" } };
      }, methods: { list_change: function list_change(t) {
          if ("click" == t.type) {
            var e = !0,
                n = !1,
                i = void 0;try {
              for (var r, o = T()(this.$refs.lisBarItem.children); !(e = (r = o.next()).done); e = !0) {
                r.value.classList = "";
              }
            } catch (t) {
              n = !0, i = t;
            } finally {
              try {
                !e && o.return && o.return();
              } finally {
                if (n) throw i;
              }
            }t.target.classList = "active", this.loadData.sort = t.target.text;
          } else if ("change" == t.type) {
            var s = this.$refs.type_select.options[this.$refs.type_select.options.selectedIndex];this.title = s.innerHTML, this.loadData.categoryid = s.value;
          }this.loadData.searchStr = "", this.$store.commit("endList", !1), this.$emit("loadDataEmit", this.loadData);
        }, search_room: function search_room() {
          var t = this.$refs.keyword.value.trim();t && (this.loadData.searchStr = t, this.$store.commit("endList", !1), this.$emit("loadDataEmit", this.loadData));
        } }, mounted: function mounted() {
        var t = this;this.$store.dispatch("getRoomType").then(function (e) {
          var n = e.data;t.roomType = n;
        });
      } },
        S = { render: function render() {
        var t = this,
            e = t.$createElement,
            n = t._self._c || e;return n("div", { staticClass: "list-bar" }, [n("div", { ref: "lisBarItem", staticClass: "list-bar-item" }, [n("a", { staticClass: "active", attrs: { href: "javascript:;" }, on: { click: function click(e) {
              t.list_change(e);
            } } }, [t._v("最热")]), t._v(" "), n("a", { attrs: { href: "javascript:;" }, on: { click: function click(e) {
              t.list_change(e);
            } } }, [t._v("推荐")]), t._v(" "), n("a", { ref: "listSelect", attrs: { href: "javascript:;" } }, [n("div", { staticClass: "list-select-text" }, [t._v(t._s(t.title))]), t._v(" "), n("select", { ref: "type_select", attrs: { name: "", id: "list_select" }, on: { change: function change(e) {
              t.list_change(e);
            } } }, [n("option", { attrs: { value: "" } }, [t._v("全部")]), t._v(" "), t._l(t.roomType, function (e) {
          return n("option", { domProps: { value: e.id } }, [t._v(t._s(e.text))]);
        })], 2)])]), t._v(" "), n("form", { staticClass: "list-search", attrs: { action: "" }, on: { submit: function submit(e) {
              return e.preventDefault(), t.search_room(e);
            } } }, [n("input", { directives: [{ name: "model", rawName: "v-model", value: t.loadData.searchStr, expression: "loadData.searchStr" }], ref: "keyword", attrs: { type: "search", name: "search", placeholder: "请输入内容" }, domProps: { value: t.loadData.searchStr }, on: { input: function input(e) {
              e.target.composing || t.$set(t.loadData, "searchStr", e.target.value);
            } } }), t._v(" "), n("button", { attrs: { type: "submit" } })])]);
      }, staticRenderFns: [] },
        N = { render: function render() {
        var t = this,
            e = t.$createElement,
            n = t._self._c || e;return n("div", { ref: "list-container", staticClass: "list-container" }, t._l(t.listData, function (e) {
          return n("a", { key: e.id, staticClass: "list-item", attrs: { href: "/ui/#/show?chnid=" + e.id } }, [n("img", { attrs: { src: t.ApiConfig.domain + e.img, alt: "" } }), t._v(" "), n("div", { staticClass: "item-title" }, [t._v(t._s(e.name))]), t._v(" "), n("div", { staticClass: "item-description" }, [t._v(t._s(e.descript))])]);
        }));
      }, staticRenderFns: [] },
        E = { name: "ListComponent", components: { ListBarComponent: n("VU/8")(k, S, !1, null, null, null).exports, ListContainerComponent: n("VU/8")({ props: ["listData"] }, N, !1, null, null, null).exports }, data: function data() {
        return { swiper: null };
      }, computed: s()({}, Object(a.c)({ listData: function listData(t) {
          return t.ApiService.room.listData;
        }, listConfig: function listConfig(t) {
          return t.ApiService.room.listConfig;
        }, listLoading: function listLoading(t) {
          return t.ApiService.room.listLoading;
        } })), methods: { loadListData: function loadListData() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};this.$store.commit("initList", t), this.$store.dispatch("loadListData", t);
        } }, mounted: function mounted() {
        this.loadListData();
      } },
        D = { render: function render() {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { staticClass: "c-list" }, [e("list-bar-component", { on: { loadDataEmit: this.loadListData } }), this._v(" "), e("list-container-component", { attrs: { listData: this.listData } }), this._v(" "), e("div", { directives: [{ name: "show", rawName: "v-show", value: this.listLoading, expression: "listLoading" }], staticClass: "loading", attrs: { id: "loading" } }, [e("img", { attrs: { src: n("SnTU"), alt: "" } }), this._v("正在加载\n    ")])], 1);
      }, staticRenderFns: [] },
        I = n("VU/8")(E, D, !1, null, null, null).exports,
        j = { name: "IndexPage", data: function data() {
        return { swiper: null, toTopShow: !1 };
      }, mounted: function mounted() {
        var t = this;this.$store.dispatch("getUserInitialJson").then(function (e) {
          e.data.userinfo || t.$router.push({ path: "/login" });
        }), this.$store.dispatch("getBanner").then(function (e) {
          var n = e.data;t.swiper = n;
        });var e = this.$refs.scrollContainer,
            n = this;e && (e.onscroll = function () {
          var t,
              e,
              i = (e = 0, (t = this) && t.scrollTop ? e = t.scrollTop : document.body && (e = document.body.scrollTop), e);n.toTopShow = i > 300, i + function (t) {
            return document.body.clientHeight && t.clientHeight ? Math.min(document.body.clientHeight, t.clientHeight) : Math.max(document.body.clientHeight, t.clientHeight);
          }(this) + 60 > function (t) {
            return Math.max(document.body.scrollHeight, t.scrollHeight);
          }(this) && (n.listLoading || n.loadListData({ page: n.listConfig.page++, rows: n.listConfig.rows, sort: n.listConfig.sort, categoryid: n.listConfig.categoryid, searchStr: n.listConfig.searchStr }));
        });
      }, computed: s()({}, Object(a.c)({ listConfig: function listConfig(t) {
          return t.ApiService.room.listConfig;
        }, listLoading: function listLoading(t) {
          return t.ApiService.room.listLoading;
        } })), methods: { loadListData: function loadListData() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};this.$store.dispatch("loadListData", t);
        }, toTop: function toTop() {
          $(this.$refs.scrollContainer).animate({ scrollTop: 0 }, 500);
        } }, components: { BannerComponent: x, ListComponent: I } },
        L = { render: function render() {
        var t = this,
            e = t.$createElement,
            n = t._self._c || e;return n("div", [n("div", { ref: "scrollContainer", staticClass: "index-app app-container" }, [t.swiper ? n("banner-component", { attrs: { swiper: t.swiper } }) : t._e(), t._v(" "), n("router-link", { class: "user-center", attrs: { to: "/home" } }), t._v(" "), n("list-component")], 1), t._v(" "), n("a", { directives: [{ name: "show", rawName: "v-show", value: t.toTopShow, expression: "toTopShow" }], staticClass: "toTop", attrs: { href: "javascript:;" }, on: { click: t.toTop } })]);
      }, staticRenderFns: [] },
        O = n("VU/8")(j, L, !1, null, null, null).exports,
        H = { name: "VideoComponent", data: function data() {
        return { video: { src: "" }, playing: !1, hasInit: !1, controls_show: !0, fullScreen: !1, x5VideoOrientation: "portrait", dom: { videoPlayer: null } };
      }, watch: { video_model: function video_model(t) {
          var e = this;if (t) {
            var n = {};"live" == this.video_model ? (n.dispatch = "getLiveUriInfo", n.params = { chnid: this.$route.query.chnid }) : "vod" == this.video_model && (n.dispatch = "getVodeUriInfo", n.params = { vodid: this.$route.query.vod }), this.$store.dispatch(n.dispatch, n.params).then(function (t) {
              var n = t.data;if ("true" == n.success) e.video.src = n.uri;else {
                if (0 == e.baseInfo.streamActive && "live" == e.video_model) return e.$store.commit("alert", { text: "直播还没开始</br>敬请期待" }), !1;e.$store.commit("alert", { text: n.msg });
              }
            });
          }
        } }, computed: s()({}, Object(a.c)({ chnid: function chnid(t) {
          return t.BaseInfoService.chnid;
        }, baseInfo: function baseInfo(t) {
          return t.BaseInfoService.baseInfo;
        }, onlineIDs: function onlineIDs(t) {
          return t.HeartBeanService.onlineIds;
        } }), { poster: function poster() {
          return this.ApiConfig.domain + this.baseInfo.topimg;
        }, video_model: function video_model() {
          return this.baseInfo.playmode;
        } }), methods: { startPlay: function startPlay() {
          var t = this;this.$store.dispatch("startOnlineJson", { objType: this.video_model, objId: this.chnid }).then(function (e) {
            var n = e.data;"true" == n.success ? t.$store.commit("pushOnlineId", { name: t.video_model, value: n.onlineId }) : t.$store.commit("alert", { text: n.msg });
          });
        }, endPlay: function endPlay() {
          var t = this,
              e = this.getOnlineIdWithName(this.video_model);this.$store.dispatch("stopOnlineJson", { onlineId: e }).then(function (n) {
            var i = n.data;"true" == i.success ? t.$store.commit("removeOnlineId", e) : t.$store.commit("alert", { text: i.msg });
          });
        }, show_controls: function show_controls() {
          this.controls_show = !0, setTimeout(function () {
            this.controls_show = !1;
          }.bind(this), 5e3);
        }, viedo_switch: function viedo_switch() {
          this.playing ? this.video_pause() : this.video_play();
        }, video_play: function video_play() {
          if (0 == this.baseInfo.streamActive && "live" == this.video_model) return this.$store.commit("alert", { text: "直播还没开始</br>敬请期待" }), !1;this.hasInit ? (this.playing = !0, this.dom.videoPlayer.play()) : (this.hasInit = !0, this.playing = !0, this.dom.videoPlayer.play(), this.startPlay());
        }, video_pause: function video_pause() {
          this.playing = !1, this.dom.videoPlayer.pause();
        }, video_fullscreen: function video_fullscreen() {
          if (0 == this.baseInfo.streamActive && "live" == this.video_model) return this.$store.commit("alert", { text: "直播还没开始</br>敬请期待" }), !1;this.isAndroid && (this.fullScreen ? (this.x5VideoOrientation = "portrait", $("#c-tab").css("opacity", 1)) : (this.x5VideoOrientation = "landscape", $("#c-tab").css("opacity", 0)), this.fullScreen = !this.fullScreen), "function" == typeof this.dom.videoPlayer.webkitEnterFullscreen && this.dom.videoPlayer.webkitEnterFullscreen();
        }, vodEnd: function vodEnd() {
          this.endPlay();
        } }, mounted: function mounted() {
        var t = this;this.$nextTick(function () {
          var e = t;e.dom.videoPlayer = t.$refs.video, window.addEventListener("resize", function () {
            e.dom.videoPlayer.style.width = window.innerWidth + "px", e.dom.videoPlayer.style.height = window.innerHeight + "px";
          }), e.dom.videoPlayer.addEventListener("x5videoenterfullscreen", function () {
            e.video_play();
          }), e.dom.videoPlayer.addEventListener("x5videoexitfullscreen", function () {
            isAndroid && (e.x5VideoOrientation = "protrait", $("#c-tab").css("opacity", 1)), e.video_pause();
          }), $(document).on("webkitfullscreenchange", function (t) {
            document.webkitIsFullScreen ? e.video_play() : e.video_pause();
          }), $(e.dom.videoPlayer).on("webkitbeginfullscreen", function () {
            e.video_play();
          }).on("webkitendfullscreen", function () {
            e.video_pause();
          });
        });
      } },
        q = { render: function render() {
        var t = this,
            e = t.$createElement,
            n = t._self._c || e;return n("div", { staticClass: "c-video" }, [n("div", { staticClass: "v-player" }, [n("video", { ref: "video", staticClass: "v-play-source", attrs: { src: t.video.src, "x5-video-player-type": "h5", "x5-video-player-fullscreen": "true", "webkit-inline": "true", "x-webkit-airplay": "allow", playsinline: "true", "webkit-playsinline": "true", preload: "auto", autoplay: "true", "x5-video-orientation": t.x5VideoOrientation, poster: t.poster }, on: { ended: t.vodEnd } }), t._v(" "), t.hasInit ? t._e() : n("img", { staticClass: "v-poster", attrs: { src: t.poster, alt: "" } })]), t._v(" "), n("div", { ref: "video_controls", class: ["v-controls", t.controls_show ? "" : "opacity-hide"], on: { click: function click(e) {
              t.show_controls();
            } } }, [n("div", { ref: "video_play", class: ["v-play", t.playing ? "bg_video_pause" : "bg_video_play"], on: { click: function click(e) {
              return e.stopPropagation(), t.viedo_switch(e);
            } } }), t._v(" "), n("div", { ref: "video_fullscreen", staticClass: "v-fullscreen bg_video_fullscreen", on: { click: t.video_fullscreen } })])]);
      }, staticRenderFns: [] },
        P = n("VU/8")(H, q, !1, null, null, null).exports,
        B = { name: "NoticeComponent", props: ["words"], watch: { words: function words(t) {
          var e = '<span class="scroll">' + this.words + "</span>";$("#v-notice").html(e);var n = $("#v-notice").find("span").innerWidth() + parseInt($("#v-notice").width());$("#v-notice").find(".scroll").css({ transform: "translateX(-" + n + "px)" });
        } } },
        F = { render: function render() {
        var t = this.$createElement;return (this._self._c || t)("div", { staticClass: "scroll-notice", attrs: { id: "v-notice" } });
      }, staticRenderFns: [] },
        M = n("VU/8")(B, F, !1, null, null, null).exports,
        R = { name: "RichTextComponent", computed: s()({ data: function data() {
          return this.baseInfo.intr;
        } }, Object(a.c)({ chnid: function chnid(t) {
          return t.BaseInfoService.chnid;
        }, baseInfo: function baseInfo(t) {
          return t.BaseInfoService.baseInfo;
        } })) },
        J = { render: function render() {
        var t = this,
            e = t.$createElement,
            n = t._self._c || e;return n("div", { staticClass: "tab-rich-text", attrs: { id: "tab-rich-text" } }, t._l(JSON.parse(t.data), function (e) {
          return n("a", { staticStyle: { color: "#333" }, attrs: { href: "undefined" == e.link || "" == e.link ? "javascript:;" : e.link } }, [e.img ? n("img", { staticStyle: { display: "block" }, attrs: { src: t.ApiConfig.domain + e.img, width: "100%", alt: "" } }) : t._e(), t._v(" "), e.text ? n("p", { domProps: { textContent: t._s(e.text) } }) : t._e()]);
        }));
      }, staticRenderFns: [] },
        U = n("VU/8")(R, J, !1, null, null, null).exports,
        W = { data: function data() {
        return { dayHtml: "00", hourHtml: "00", minuteHtml: "00", secondHtml: "00", interval_timer: null };
      }, computed: s()({ airTimeFormat: function airTimeFormat() {
          return this.formatDateTime(this.baseInfo.airtime);
        } }, Object(a.c)({ baseInfo: function baseInfo(t) {
          return t.BaseInfoService.baseInfo;
        } })), methods: { formatDateTime: function formatDateTime(t) {
          var e = new Date(t),
              n = (e.getFullYear(), e.getMonth() + 1);n = n < 10 ? "0" + n : n;var i = e.getDate();i = i < 10 ? "0" + i : i;var r = e.getHours();r = r < 10 ? "0" + r : r;var o = e.getMinutes(),
              s = e.getSeconds();return o = o < 10 ? "0" + o : o, s = s < 10 ? "0" + s : s, n + "-" + i + " " + r + " : " + o;
        }, wait_count: function wait_count() {
          var t = this.baseInfo.airtime - parseInt(new Date().getTime() / 1e3),
              e = Math.floor(t / 86400);return e < 10 && (e = ("00" + e.toString()).slice(-2)), this.dayHtml = e, this.hourHtml = ("00" + Math.floor(t % 86400 / 3600).toString()).slice(-2), this.minuteHtml = ("00" + Math.floor(t % 3600 / 60).toString()).slice(-2), this.secondHtml = ("00" + Math.floor(t % 60).toString()).slice(-2), t;
        } }, components: { RichTextComponent: U }, mounted: function mounted() {
        var t = this;this.$nextTick(function () {
          var e = setInterval(function () {
            t.wait_count() || (clearInterval(e), window.location.reload());
          }, 1e3);
        });
      }, beforeDestroy: function beforeDestroy() {
        clearInterval(interval_timer);
      } },
        V = { render: function render() {
        var t = this,
            e = t.$createElement,
            n = t._self._c || e;return n("div", { staticClass: "c-wait", attrs: { id: "c-wait" } }, [n("div", { staticClass: "wait-title" }, [t._v("现场直播：《" + t._s(t.baseInfo.title) + "》")]), t._v(" "), n("div", { staticClass: "wait-plane" }, [n("span", { staticClass: "wait-plane-title" }, [t._v("本次直播将于 " + t._s(t.airTimeFormat) + " 开始")]), t._v(" "), n("p", { staticClass: "wait-text" }, [t._v("直播倒计时")]), t._v(" "), n("div", { staticClass: "wait-count" }, [n("span", [t._v(t._s(t.dayHtml))]), t._v(" 天\n            "), n("span", [t._v(t._s(t.hourHtml))]), t._v(" 时\n            "), n("span", [t._v(t._s(t.minuteHtml))]), t._v(" 分\n            "), n("span", [t._v(t._s(t.secondHtml))]), t._v(" 秒\n        ")])]), t._v(" "), n("a", { staticClass: "wait-subscribe", attrs: { href: "" } }, [t._v("点击此处订阅开播提醒》")]), t._v(" "), n("div", { staticClass: "wait-rich-text" }, [t.baseInfo.intr ? n("rich-text-component", { attrs: { data: t.baseInfo.intr } }) : t._e()], 1)]);
      }, staticRenderFns: [] },
        z = n("VU/8")(W, V, !1, null, null, null).exports,
        G = { props: ["data"], data: function data() {
        return { currentGift: {}, currentNum: 1 };
      }, computed: { gifts: function gifts() {
          var t = [],
              e = -1;return this.data.sort(function (t, e) {
            return e.order - t.order;
          }).forEach(function (n, i) {
            i % 8 == 0 && (t[++e] = []), t[e].push(n);
          }), t;
        } }, methods: { initSwiper: function initSwiper() {
          new g.a(".gifts-container", { pagination: { el: ".gifts-pagination", bulletClass: "gifts-bullet", bulletActiveClass: "gifts-bullet-active" }, observer: !0, observeParents: !0 });
        }, initGift: function initGift() {
          this.currentGift = {}, this.currentNum = 1;
        }, select_gift: function select_gift(t) {
          t.disableNote ? this.$store.commit("alert", { text: t.disableNote, time: 3e3 }) : this.currentGift = t;
        }, closeGiftWindow: function closeGiftWindow() {
          this.$emit("close-gift-window"), this.initGift();
        } }, mounted: function mounted() {
        this.$nextTick(function () {
          this.initSwiper();
        });
      } },
        Y = { render: function render() {
        var t = this,
            e = t.$createElement,
            n = t._self._c || e;return n("div", { staticClass: "gifts-window", on: { click: t.closeGiftWindow } }, [n("div", { staticClass: "chat-gifts", attrs: { onclick: "event.stopPropagation()" } }, [n("div", { staticClass: "gifts-container" }, [n("div", { staticClass: "swiper-wrapper" }, t._l(t.gifts, function (e, i) {
          return n("div", { staticClass: "swiper-slide gifts-rows" }, t._l(e, function (e, i) {
            return n("a", { class: ["gifts-item", t.currentGift.id == e.id ? "active" : ""], attrs: { href: "javascript:;" }, on: { click: function click(n) {
                  t.select_gift(e);
                } } }, [n("img", { class: ["gift-img", e.disableNote ? "ban" : ""], attrs: { src: t.ApiConfig.domain + e.picture, alt: e.name } }), t._v(" "), n("div", { staticClass: "gifts-value" }, [n("i", { staticClass: "gifts-icon" }), n("p", [t._v(t._s(e.price))])]), t._v(" "), n("span", [t._v(t._s(e.name))])]);
          }));
        })), t._v(" "), n("div", { staticClass: "gifts-pagination" })]), t._v(" "), n("div", { staticClass: "gifts-handle" }, [n("div", { ref: "gifts-text", staticClass: "gifts-text" }, [n("p", { directives: [{ name: "show", rawName: "v-show", value: t.currentGift.id, expression: "currentGift.id" }] }, [t._v("送出 "), n("span", [t._v(t._s(t.currentGift.name))]), t._v(" 总价："), n("span", { staticClass: "acColor" }, [t._v(t._s(t.currentGift.price * t.currentNum))])])]), t._v(" "), n("div", { staticClass: "gifts-num" }, [n("a", { attrs: { href: "javascript:;" }, on: { click: function click(e) {
              t.currentNum--;
            } } }, [t._v("-")]), t._v(" "), n("span", [t._v(t._s(t.currentNum))]), t._v(" "), n("a", { attrs: { href: "javascript:;" }, on: { click: function click(e) {
              t.currentNum++;
            } } }, [t._v("+")])]), t._v(" "), n("button", { staticClass: "gifts-send", attrs: { id: "gifts-send" } }, [t._v("发送")])])])]);
      }, staticRenderFns: [] },
        X = n("VU/8")(G, Y, !1, null, null, null).exports,
        K = { props: ["chat", "gifts"], computed: { Mixs: function Mixs() {
          return this.chat.concat(this.gifts).sort(function (t, e) {
            return t.stamp - e.stamp;
          });
        } }, watch: { Mixs: function Mixs(t) {
          $(".chat-msg").animate({ scrollTop: 1e5 });
        } } },
        Q = { render: function render() {
        var t = this,
            e = t.$createElement,
            n = t._self._c || e;return n("ul", { staticClass: "chat-msg" }, t._l(t.Mixs, function (e) {
          return e.content ? n("li", [e.viplevel ? n("span", { staticClass: "chat-vip" }, [t._v(t._s(e.viplevel))]) : t._e(), t._v(" "), e.userlever ? n("span", { staticClass: "chat-level" }, [t._v(t._s(e.userlever))]) : t._e(), t._v(" "), n("span", { staticClass: "chat-user" }, [t._v(t._s(e.sender))]), t._v(" "), n("span", [t._v("：" + t._s(e.content))])]) : e.gift ? n("li", [e.viplevel ? n("span", { staticClass: "chat-vip" }, [t._v(t._s(e.viplevel))]) : t._e(), t._v(" "), e.userlever ? n("span", { staticClass: "chat-level" }, [t._v(t._s(e.userlever))]) : t._e(), t._v(" "), n("span", { staticClass: "chat-user" }, [t._v(t._s(e.sender))]), t._v(" "), n("span", [t._v("送给")]), t._v(" "), n("span", { staticClass: "chat-user" }, [t._v(t._s(e.reciver))]), t._v(" "), n("span", { staticClass: "chat-gift-text" }, [t._v(" " + t._s(e.gift) + " × "), n("b", { staticStyle: { "font-weight": "600" } }, [t._v(t._s(e.quantity))])])]) : t._e();
        }));
      }, staticRenderFns: [] },
        Z = n("VU/8")(K, Q, !1, null, null, null).exports,
        tt = { data: function data() {
        return { now: Math.floor(new Date().getTime() / 1e3) };
      }, computed: s()({}, Object(a.b)(["boxes"])), filters: { format_time: function format_time(t, e, n, i, r) {
          if (n > e) return "准备";if (i > e) {
            var o = t - e;return ("00" + Math.floor(o / 60 % 60).toString()).slice(-2) + ":" + ("00" + Math.floor(o % 60).toString()).slice(-2);
          }return r > e ? "待开奖" : "已结束";
        } }, methods: { lotteryShowJson: function lotteryShowJson(t) {
          var e = this;this.$store.dispatch("lotteryShowJson", { lotteryid: t }).then(function (n) {
            var i = n.data;i.lotteryid = t, e.$emit("lotteryShowJson", i);
          });
        } }, mounted: function mounted() {
        var t = this;this.$nextTick(function () {
          setInterval(function () {
            t.now = Math.floor(new Date().getTime() / 1e3);
          }, 1e3);
        });
      } },
        et = { render: function render() {
        var t = this,
            e = t.$createElement,
            n = t._self._c || e;return n("div", { staticClass: "chat-box", attrs: { id: "chat-box" } }, t._l(t.boxes, function (e) {
          return "定时" == e.type ? n("a", { key: e.id, ref: "box-id-" + e.id, refInFor: !0, staticClass: "box-base box-1", attrs: { href: "javascript:;" }, on: { click: function click(n) {
                t.lotteryShowJson(e.id);
              } } }, [n("div", { staticClass: "box-count-icon" }), t._v(" "), n("div", { staticClass: "box-text" }, [t._v(t._s(t._f("format_time")(e.enroll_e, t.now, e.enroll_b, e.enroll_e, e.draw)))])]) : "即兴" == e.type ? n("a", { key: e.id, ref: "box-id-" + e.id, staticClass: "box-base box-2", attrs: { href: "javascript:;" }, on: { click: function click(n) {
                t.lotteryShowJson(e.id);
              } } }, [n("div", { staticClass: "box-text" }, [t._v(t._s(t._f("format_time")(e.enroll_e, t.now, e.enroll_b, e.enroll_e, e.draw)))])]) : "竞猜" == e.type ? n("a", { key: e.id, ref: "box-id-" + e.id, staticClass: "box-base box-3", attrs: { href: "javascript:;" }, on: { click: function click(n) {
                t.lotteryShowJson(e.id);
              } } }, [n("div", { staticClass: "box-text" }, [t._v(t._s(t._f("format_time")(e.enroll_e, t.now, e.enroll_b, e.enroll_e, e.draw)))])]) : t._e();
        }));
      }, staticRenderFns: [] },
        nt = n("VU/8")(tt, et, !1, null, null, null).exports,
        it = { render: function render() {
        var t = this,
            e = t.$createElement,
            n = t._self._c || e;return n("div", { staticClass: "chat-window" }, [1 == t.data.type || 2 == t.data.type ? n("div", { staticClass: "chat-code" }, [t.data.msg ? n("p", [t._v(t._s(t.data.msg))]) : t._e(), t._v(" "), 2 == t.data.type ? n("input", { directives: [{ name: "model", rawName: "v-model", value: t.keyword, expression: "keyword" }], staticClass: "chat-input", attrs: { type: "text", placeholder: "请输入抽奖口令" }, domProps: { value: t.keyword }, on: { input: function input(e) {
              e.target.composing || (t.keyword = e.target.value);
            } } }) : t._e(), t._v(" "), n("div", { staticClass: "chat-confirm" }, [n("button", { on: { click: t.confirm } }, [t._v("确认")])]), t._v(" "), n("span", { staticClass: "chat-window-close", on: { click: t.close } }, [t._v("×")])]) : 3 == t.data.type ? n("div", { staticClass: "chat-guess" }, [t.data.msg ? n("p", [t._v(t._s(t.data.msg))]) : t._e(), t._v(" "), n("div", { staticClass: "chat-guess-options" }, t._l(t.data.selects, function (e, i) {
          return n("a", { class: [t.selects.indexOf(i) >= 0 ? "active" : ""], attrs: { href: "javascript:;" }, on: { click: function click(e) {
                t.selects.indexOf(i) >= 0 ? t.selects.splice(t.selects.indexOf(i), 1) : t.selects.push(i);
              } } }, [t._v(t._s(e.text))]);
        })), t._v(" "), n("div", { staticClass: "chat-confirm" }, [n("button", { on: { click: t.confirm } }, [t._v("确认")])]), t._v(" "), n("span", { staticClass: "chat-window-close", on: { click: t.close } }, [t._v("×")])]) : t._e()]);
      }, staticRenderFns: [] },
        rt = n("VU/8")({ props: ["data"], data: function data() {
        return { keyword: null, selects: [] };
      }, methods: { close: function close() {
          this.$emit("close");
        }, confirm: function confirm() {
          var t = this,
              e = {};if (1 != this.data.type) {
            if (2 == this.data.type) e = this.keyword;else if (3 == this.data.type) {
              var n = [];this.data.selects.forEach(function (e, i) {
                t.selects.indexOf(i) >= 0 && n.push(e.text);
              }), e = n;
            }this.$emit("confirm", { lotteryid: this.data.lotteryid, type: this.data.type, data: e });
          } else this.$emit("close");
        } } }, it, !1, null, null, null).exports,
        ot = { computed: s()({}, Object(a.b)(["zoneNotifys"])) },
        st = { render: function render() {
        var t = this,
            e = t.$createElement,
            n = t._self._c || e;return n("div", { staticClass: "zone" }, [n("ul", t._l(t.zoneNotifys, function (e) {
          return n("li", [n("span", [t._v(t._s(e.content))])]);
        }))]);
      }, staticRenderFns: [] };var at = n("VU/8")(ot, st, !1, function (t) {
      n("wAUg");
    }, null, null).exports,
        ct = { data: function data() {
        return { gift: { active: !1, data: {} }, bar: { focus: !1, message: "" }, confirmObj: {} };
      }, computed: s()({}, Object(a.c)({ chnid: function chnid(t) {
          return t.BaseInfoService.chnid;
        }, baseInfo: function baseInfo(t) {
          return t.BaseInfoService.baseInfo;
        }, chat: function chat(t) {
          return t.HeartBeanService.chat;
        }, gifts: function gifts(t) {
          return t.HeartBeanService.gifts;
        } })), methods: { closeGiftWindow: function closeGiftWindow() {
          this.gift.active = !1;
        }, clickBar: function clickBar() {
          this.bar.focus = !0, this.isAndroid && ($(".chat-bar").css({ position: "fixed", bottom: "0", "z-index": "2" }), $(".chat-msg").css({ "padding-bottom": $(".chat-bar").height() + 10 }), $(".show-app").append($("#chat-bar")), $(this.$refs["chat-input"]).focus());
        }, blurBar: function blurBar() {
          this.$refs["chat-input"].value.trim() || (this.bar.focus = !1), this.isAndroid && $(".tab-chat").append($("#chat-bar"));
        }, lotteryShowJson: function lotteryShowJson(t) {
          "true" == t.success ? this.confirmObj = t : this.$store.commit("alert", { text: t.msg });
        }, confirm: function confirm(t) {
          var e = this;this.$store.dispatch("enrollJson", t).then(function (t) {
            var n = t.data;e.confirmObj = {}, e.$store.commit("alert", { text: n.msg });
          });
        }, sendText: function sendText() {
          var t = this;this.bar.message ? (this.$store.dispatch("newMsgJson", { chnid: this.chnid, message: this.bar.message }).then(function (e) {
            var n = e.data;"true" == n.success ? n.chat.forEach(function (e) {
              t.$store.commit("addChat", { sender: e.sendername, userlever: e.userlevel, viplevel: e.viplevel, content: e.message, stamp: Math.floor(new Date(e.sendtime).getTime() / 1e3) });
            }) : t.$store.commit("alert", { text: n.msg });
          }), this.bar.message = "") : this.$store.commit("alert", { text: "内容不能为空" });
        } }, components: { GiftComponent: X, ChatMsgComponent: Z, BoxComponent: nt, ConfirmComponent: rt, ZoneNoticeComponent: at }, mounted: function mounted() {
        this.$nextTick(function () {
          var t = this;this.$store.dispatch("getGiftListJson", { chnid: this.chnid }).then(function (e) {
            var n = e.data;t.gift.data = n;
          });
        });
      } },
        lt = { render: function render() {
        var t = this,
            e = t.$createElement,
            n = t._self._c || e;return n("div", { staticClass: "tab-chat" }, [n("chat-msg-component", { attrs: { chat: t.chat, gifts: t.gifts } }), t._v(" "), n("zone-notice-component"), t._v(" "), n("box-component", { on: { lotteryShowJson: t.lotteryShowJson } }), t._v(" "), n("div", { staticClass: "chat-bar", attrs: { id: "chat-bar" } }, [n("router-link", { class: "chat-back bg-tab_back", attrs: { to: "/" } }), t._v(" "), n("input", { directives: [{ name: "model", rawName: "v-model", value: t.bar.message, expression: "bar.message" }], ref: "chat-input", staticClass: "chat-input", attrs: { type: "text", id: "chat-input", placeholder: "吐个槽呗~" }, domProps: { value: t.bar.message }, on: { click: function click(e) {
              t.clickBar();
            }, blur: function blur(e) {
              t.blurBar();
            }, input: function input(e) {
              e.target.composing || t.$set(t.bar, "message", e.target.value);
            } } }), t._v(" "), n("div", { staticClass: "chat-send", attrs: { id: "chat-send" } }, [n("a", { directives: [{ name: "show", rawName: "v-show", value: !t.bar.focus, expression: "!bar.focus" }], staticClass: "chat-more bg-tab_more", attrs: { href: "" } }), t._v(" "), n("div", { directives: [{ name: "show", rawName: "v-show", value: t.bar.focus, expression: "bar.focus" }], staticClass: "chat-submit", on: { click: function click(e) {
              t.sendText();
            } } }, [t._v("发送")])]), t._v(" "), n("a", { staticClass: "bg-tab_gifts", attrs: { href: "javascript:;" }, on: { click: function click(e) {
              t.gift.active = !0;
            } } })], 1), t._v(" "), t.gift.data.length ? n("gift-component", { directives: [{ name: "show", rawName: "v-show", value: t.gift.active, expression: "gift.active" }], attrs: { data: t.gift.data }, on: { "close-gift-window": function closeGiftWindow(e) {
              t.gift.active = !1;
            } } }) : t._e(), t._v(" "), t.confirmObj.type ? n("confirm-component", { attrs: { data: t.confirmObj }, on: { close: function close(e) {
              t.confirmObj = {};
            }, confirm: t.confirm } }) : t._e()], 1);
      }, staticRenderFns: [] },
        ut = n("VU/8")(ct, lt, !1, null, null, null).exports,
        ft = { data: function data() {
        return { currentIndex: 0, rank: null };
      }, computed: s()({}, Object(a.c)({ chnid: function chnid(t) {
          return t.BaseInfoService.chnid;
        } })), methods: { chang_rank: function chang_rank(t) {
          this.currentIndex = t;
        } }, created: function created() {
        var t = this;this.$nextTick(function () {
          t.$store.dispatch("getRankingJson", { chnid: t.chnid }).then(function (e) {
            var n = e.data;t.rank = n;
          });
        });
      } },
        dt = { render: function render() {
        var t = this,
            e = t.$createElement,
            n = t._self._c || e;return n("div", { staticClass: "tab-rank" }, [n("div", { staticClass: "rank-nav" }, t._l(t.rank, function (e, i) {
          return n("div", { class: ["rank-nav-item", t.currentIndex == i ? "active" : ""], on: { click: function click(e) {
                t.chang_rank(i);
              } } }, [t._v(t._s(e.rank))]);
        })), t._v(" "), n("div", { staticClass: "rank-container" }, t._l(t.rank, function (e, i) {
          return n("div", { class: ["rank-list", t.currentIndex == i ? "active" : ""] }, t._l(e.list, function (e, i) {
            return n("div", { staticClass: "rank-list-item" }, [0 == i ? n("div", { staticClass: "bg-tab_rank1" }) : t._e(), t._v(" "), 1 == i ? n("div", { staticClass: "bg-tab_rank2" }) : t._e(), t._v(" "), 2 == i ? n("div", { staticClass: "bg-tab_rank3" }) : t._e(), t._v(" "), 3 == [0, 1, 2].filter(function (t) {
              return t !== i;
            }).length ? n("div", { staticClass: "rank-other" }, [t._v("NO." + t._s(i + 1))]) : t._e(), t._v(" "), n("div", { staticClass: "rank-info" }, [n("p", [n("span", { staticClass: "chat-vip-user" }, [t._v(t._s(e.name))])]), t._v(" "), n("p", { staticClass: "rank-build" }, [t._v(t._s(e.value))])])]);
          }));
        }))]);
      }, staticRenderFns: [] },
        pt = { name: "TabComponent", components: { ChatComponent: ut, RankComponent: n("VU/8")(ft, dt, !1, null, null, null).exports, RichTextComponent: U }, data: function data() {
        return { tab: { index: 0, tab_container: null }, apiTabs: this.ApiConfig.tabs };
      }, computed: s()({}, Object(a.c)({ chnid: function chnid(t) {
          return t.BaseInfoService.chnid;
        }, baseInfo: function baseInfo(t) {
          return t.BaseInfoService.baseInfo;
        } }), Object(a.b)(["tabs"])), methods: { tab_change: function tab_change(t) {
          this.tab.index = t;
        }, tab_click: function tab_click(t) {
          this.tab_change(t), this.tab.tab_container.slideTo(t, 500, !1);
        } }, filters: { humpStrToLinkStr: function humpStrToLinkStr(t) {
          return t.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^\-/, "");
        } }, mounted: function mounted() {
        var t = this;this.$nextTick(function () {
          var e = t;t.tab.tab_container = new g.a(".tab-container", { on: { slideChangeTransitionStart: function slideChangeTransitionStart() {
                e.isAndroid && $("#chat-input").blur(), e.tab_change(this.activeIndex);
              } }, observer: !0, observeParents: !0 }), t.tab_click(t.tabs.activeIndex);
        });
      } },
        ht = { render: function render() {
        var t = this,
            e = t.$createElement,
            n = t._self._c || e;return n("div", { staticClass: "c-tab", attrs: { id: "c-tab" } }, [n("div", { staticClass: "tab-nav" }, t._l(this.tabs.data, function (e, i) {
          return n("div", { class: ["tab-nav-item", t.tab.index == e.index ? "active" : ""], on: { click: function click(n) {
                t.tab_click(e.index);
              } } }, [n("span", [t._v(t._s(e.text))])]);
        })), t._v(" "), n("div", { staticClass: "tab-container" }, [n("div", { staticClass: "swiper-wrapper" }, t._l(this.tabs.data, function (e, i) {
          return n("div", { staticClass: "swiper-slide" }, [n(t._f("humpStrToLinkStr")(t.apiTabs[e.val].component), { tag: "component" })], 1);
        }))])]);
      }, staticRenderFns: [] },
        mt = n("VU/8")(pt, ht, !1, null, null, null).exports,
        vt = { name: "ShowPage", data: function data() {
        return { notice: null, zoneNotifyTemp: [], currentComponent: null, activeinterval: { original: null, now: 0 }, intervals: { heartInterval: null, noticeInterval: null, activeInterval: null, zoneNoticeInterval: null } };
      }, computed: s()({}, Object(a.c)({ chnid: function chnid(t) {
          return t.BaseInfoService.chnid;
        }, baseInfo: function baseInfo(t) {
          return t.BaseInfoService.baseInfo;
        }, onlineIDs: function onlineIDs(t) {
          return t.HeartBeanService.onlineIds;
        } }), Object(a.b)(["firstNotice", "onlinIDArr", "getOnlineIdWithName", "zoneNotifys"])), watch: { baseInfo: function baseInfo(t) {
          t.airtime && t.airtime > parseInt(new Date().getTime() / 1e3) ? this.currentComponent = "wait-component" : this.currentComponent = "tab-component";
        } }, methods: { pageDestory: function pageDestory() {
          var t = this;this.onlinIDArr.forEach(function (e) {
            t.$store.commit("removeOnlineId", e), t.$store.dispatch("stopOnlineJson", { onlineId: e });
          }), clearInterval(this.intervals.heartInterval), clearInterval(this.intervals.noticeInterval), clearInterval(this.intervals.activeInterval), this.$store.commit("clearService"), this.$store.commit("clearBaseInfo");
        } }, beforeDestroy: function beforeDestroy() {
        this.pageDestory();
      }, components: { VideoComponent: P, NoticeComponent: M, WaitComponent: z, TabComponent: mt }, created: function created() {
        var t = this;window.onbeforeunload = function () {
          return t.pageDestory();
        }, window.onunload = function () {
          return t.pageDestory();
        }, this.$nextTick(function () {
          t.$store.dispatch("getUserInitialJson").then(function (e) {
            e.data.userinfo || t.$router.push({ path: "/login" });
          }), t.$store.commit("setChnid", t.$route.query.chnid);var e = { chnid: t.$route.query.chnid };t.$route.query.vod && (e.vod = t.$route.query.vod), t.$route.query.rcm && (e.rcm = t.$route.query.rcm), t.$store.dispatch("getRoomInitialJson", e).then(function (e) {
            var n = e.data;if (n.noright) return alert(n.noright.msg), window.location.href = n.noright.link, !1;if (t.$store.commit("setBaseInfo", n), document.title = n.title, t.$store.commit("pushOnlineId", { name: "web", value: n.onlineid }), 0 != t.activeinterval.original) {
              t.activeinterval.original = n.activeinterval;t.intervals.activeInterval = setInterval(function () {
                t.activeinterval.now++;var e = t.activeinterval.original - t.activeinterval.now;e <= 30 && t.$store.commit("alert", { text: "您在当前页面非活动时间过长，页面将于" + e + "秒后退出", time: 3e4 }), t.activeinterval.now >= t.activeinterval.original && (window.location.href = "/ui");
              }, 1e3), window.addEventListener("touchstart", function () {
                t.activeinterval.now = 0, t.$store.commit("alert", {});
              });
            }var i = function i() {
              t.$store.dispatch("getHeartbeatJson", { onlineID: t.onlinIDArr }).then(function (e) {
                var n = e.data,
                    i = [],
                    o = 0,
                    s = function s() {
                  i[o] ? (t.$store.commit("addChat", i[o]), o++) : clearInterval(a);
                },
                    a = setInterval(function () {
                  s();
                }, Math.floor(1e3 * r / i.length));s();var c = [],
                    l = 0,
                    u = function u() {
                  c[l] ? (t.$store.commit("addGifts", c[l]), l++) : clearInterval(f);
                },
                    f = setInterval(function () {
                  u();
                }, Math.floor(1e3 * r / c.length));u();var d = [],
                    p = [];n.broadcast.forEach(function (t) {
                  1 == t.zone ? d.push(t) : 2 == t.zone && p.push(t);
                }), d && d.forEach(function (e) {
                  t.zoneNotifyTemp.push(e);
                }), p && t.$store.commit("addNotify", p), n.boxs && t.$store.commit("addBoxes", n.boxs);
              });
            },
                r = t.baseInfo.hbinterval || 10;t.intervals.heartInterval = setInterval(function () {
              i();
            }, 1e3 * r), i();
          }), t.intervals.noticeInterval = setInterval(function () {
            t.firstNotice && t.firstNotice.stamp <= new Date().getTime() / 1e3 ? (t.notice = t.firstNotice.content, t.$store.commit("removeNotify")) : t.notice = null;
          }, t.ApiConfig.notice_interval), t.intervals.zoneNoticeInterval = setInterval(function () {
            if (t.zoneNotifys.length < 4 && t.zoneNotifyTemp.length > 0) {
              t.$store.commit("addZoneNotify", t.zoneNotifyTemp.shift());var e = setTimeout(function () {
                t.$store.commit("removeZoneNotify"), clearTimeout(e);
              }, 1e3 * t.baseInfo.hbinterval + 1e3 * Math.random());
            }
          }, t.ApiConfig.zone_notice_interval);
        });
      } },
        gt = { render: function render() {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { staticClass: "show-app app-container" }, [e("video-component"), this._v(" "), e("notice-component", { directives: [{ name: "show", rawName: "v-show", value: !!this.notice, expression: "!!notice" }], attrs: { words: this.notice } }), this._v(" "), e(this.currentComponent, { tag: "component" })], 1);
      }, staticRenderFns: [] },
        yt = n("VU/8")(vt, gt, !1, null, null, null).exports,
        bt = { render: function render() {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { staticClass: "home-app app-container" }, [e("div", { staticClass: "h-header" }, [e("router-link", { attrs: { to: "/" } }, [this._v("我的")])], 1), this._v(" "), e("div", { staticClass: "h-body" }, [e("a", { staticClass: "h-logout", attrs: { href: "/home.php/Home/logout?url=" + encodeURI("/ui/") } }, [this._v("退出登陆 ")])])]);
      }, staticRenderFns: [] },
        xt = n("VU/8")(null, bt, !1, null, null, null).exports;i.a.use(v.a);var wt = new v.a({ routes: [{ path: "/login", name: "LoginPage", component: C }, { path: "/", name: "IndexPage", component: O }, { path: "/home", name: "HomePage", component: xt }, { path: "/show", name: "ShowPage", component: yt }] }),
        At = { domain: "//push.av365.cn", notice_interval: 1e4, zone_notice_interval: 200, banner_delay: 2500, tabs: { 101: { text: "频道介绍", component: "RichTextComponent" }, 102: { text: "互动聊天", component: "ChatComponent" }, 103: { text: "排行榜", component: "RankComponent" }, 104: { text: "点播资源", component: "" }, 105: { text: "图片直播", component: "" } } },
        Ct = { banner: { url: At.domain + "/home.php/Home/loginBanner" }, thirdLink: { url: At.domain + "/home.php/Home/loginIniJson" }, roomType: { url: At.domain + "/home.php/Channel/chnCategoryJson" }, listData: { url: At.domain + "/home.php/Home/channelListJson", params: function params(t) {
          return { type: 0, searchStr: t.searchStr, sort: t.sort, categoryid: t.categoryid, scrType: "h", page: t.page, rows: t.rows };
        } }, userInitialJson: { url: At.domain + "/home.php/Home/initialJson" }, roomInitialJson: { url: At.domain + "/home.php/Player/initialJson", params: function params(t) {
          return { chnid: t.chnid, vod: t.vod, rcm: t.rcm };
        } }, liveUriInfo: { url: At.domain + "/home.php/Player/getLiveUriJson", params: function params(t) {
          return { chnid: t.chnid };
        } }, vodUriInfo: { url: At.domain + "/home.php/Player/getVodUriJson", params: function params(t) {
          return { vodid: t.vodid };
        } }, rankingJson: { url: At.domain + "/home.php/User/rankingJson", params: function params(t) {
          return { chnId: t.chnid };
        } }, giftListJson: { url: At.domain + "/home.php/Channel/giftListJson", params: function params(t) {
          return { chnId: t.chnid };
        } }, startOnlineJson: { url: At.domain + "/home.php/Player/startOnlineJson", params: function params(t) {
          return { objType: t.objType, objId: t.objId };
        } }, stopOnlineJson: { url: At.domain + "/home.php/Player/stopOnlineJson", params: function params(t) {
          return { onlineId: t.onlineId };
        } }, heartbeatJson: { url: At.domain + "/home.php/Player/heartbeatJson", params: function params(t) {
          return { onlineID: t.onlineID };
        } }, lotteryShowJson: { url: At.domain + "/home.php/Lottery/showJson", params: function params(t) {
          return { lotteryid: t.lotteryid };
        } }, enrollJson: { url: At.domain + "/home.php/Lottery/enrollJson", params: function params(t) {
          return { lotteryid: t.lotteryid, type: t.type, data: t.data };
        } }, newMsgJson: { url: At.domain + "/home.php/WebChat/newMsgJson", params: function params(t) {
          return { chnid: t.chnid, message: t.message };
        } }, doLogin: { url: At.domain + "/home.php/Home/authenJson", params: function params(t) {
          return { account: t.account, password: t.password };
        } } };function _t(t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "GET";return function () {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;return "GET" === e ? i.a.http({ url: t.url, method: e, emulateJSON: !0, params: t.params ? t.params(n) : null }) : i.a.http({ url: t.url, method: e, emulateJSON: !0, body: t.params ? t.params(n) : null });
      };
    }var Tt = { state: { room: { isEnd: !1, listLoading: !1, listData: [], listConfig: { page: 1, rows: 10, sort: "最热", categoryid: null, searchStr: "" } } }, mutations: { initList: function initList(t, e) {
          t.room.listData = [], t.room.listConfig.page = 1, t.room.listConfig.sort = e.sort || t.room.listConfig.sort;
        }, updataListConfig: function updataListConfig(t, e) {
          t.room.listConfig = e;
        }, loadListData: function loadListData(t, e) {
          t.room.listData = t.room.listData.concat(e);
        }, loadingList: function loadingList(t, e) {
          t.room.listLoading = e;
        }, endList: function endList(t, e) {
          t.room.isEnd = e;
        } }, actions: { getBanner: function getBanner() {
          return _t(Ct.banner)();
        }, getThirdUrl: function getThirdUrl() {
          return _t(Ct.thirdLink)();
        }, getRoomType: function getRoomType() {
          return _t(Ct.roomType)();
        }, getUserInitialJson: function getUserInitialJson(t, e) {
          t.state;return _t(Ct.userInitialJson)();
        }, loadListData: function loadListData(t, e) {
          var n = t.state;if (!n.room.isEnd) return t.commit("loadingList", !0), t.commit("updataListConfig", { page: n.room.listConfig.page, rows: n.room.listConfig.rows, sort: e.sort || n.room.listConfig.sort, categoryid: void 0 != e.categoryid ? e.categoryid : null, searchStr: void 0 != e.searchStr ? e.searchStr : null }), _t(Ct.listData, "POST")(n.room.listConfig).then(function (e) {
            var n = e.data;n.length ? t.commit("loadListData", n) : t.commit("endList", !0), t.commit("loadingList", !1);
          });
        }, getRoomInitialJson: function getRoomInitialJson(t, e) {
          t.state;return _t(Ct.roomInitialJson)(e);
        }, getLiveUriInfo: function getLiveUriInfo(t, e) {
          t.state;return _t(Ct.liveUriInfo)(e);
        }, getVodeUriInfo: function getVodeUriInfo(t, e) {
          t.state;return _t(Ct.vodUriInfo)(e);
        }, getRankingJson: function getRankingJson(t, e) {
          t.state;return _t(Ct.rankingJson)(e);
        }, getGiftListJson: function getGiftListJson(t, e) {
          t.state;return _t(Ct.giftListJson)(e);
        }, startOnlineJson: function startOnlineJson(t, e) {
          t.state;return _t(Ct.startOnlineJson)(e);
        }, stopOnlineJson: function stopOnlineJson(t, e) {
          t.state;return _t(Ct.stopOnlineJson)(e);
        }, getHeartbeatJson: function getHeartbeatJson(t, e) {
          t.state;return _t(Ct.heartbeatJson, "POST")(e);
        }, lotteryShowJson: function lotteryShowJson(t, e) {
          t.state;return _t(Ct.lotteryShowJson)(e);
        }, enrollJson: function enrollJson(t, e) {
          t.state;return _t(Ct.enrollJson, "POST")(e);
        }, newMsgJson: function newMsgJson(t, e) {
          t.state;return _t(Ct.newMsgJson, "POST")(e);
        }, doLogin: function doLogin(t, e) {
          t.state;return _t(Ct.doLogin, "POST")(e);
        } } },
        kt = { state: { onlineIds: [], chat: [], gifts: [], notifys: [], zoneNotifys: [], boxes: [] }, getters: { firstNotice: function firstNotice(t) {
          return t.notifys[0] || null;
        }, onlinIDArr: function onlinIDArr(t) {
          var e = [];return t.onlineIds.map(function (t) {
            e.push(t.value);
          }), e;
        }, getOnlineIdWithName: function getOnlineIdWithName(t) {
          return function (e) {
            var n = null;return t.onlineIds.forEach(function (t) {
              t.name == e && (n = t.value);
            }), n;
          };
        }, boxes: function boxes(t) {
          return t.boxes.sort(function (t, e) {
            return t.enroll_b - e.enroll_b;
          });
        }, zoneNotifys: function zoneNotifys(t) {
          return t.zoneNotifys.slice(0, 4);
        } }, mutations: { pushOnlineId: function pushOnlineId(t, e) {
          t.onlineIds.push(e);
        }, removeOnlineId: function removeOnlineId(t, e) {
          t.onlineIds = t.onlineIds.filter(function (t) {
            return t.value != e;
          });
        }, addChat: function addChat(t, e) {
          t.chat.push(e), t.chat.length > 100 && t.chat.splice(0, 30);
        }, addGifts: function addGifts(t, e) {
          t.gifts.push(e), t.gifts.length > 100 && t.gifts.splice(0, 30);
        }, addNotify: function addNotify(t, e) {
          t.notifys = t.notifys.concat(e), t.notifys.sort(function (t, e) {
            return t.stamp - e.stamp;
          });
        }, removeNotify: function removeNotify(t) {
          t.notifys.shift();
        }, addZoneNotify: function addZoneNotify(t, e) {
          t.zoneNotifys.push(e), t.zoneNotifys.sort(function (t, e) {
            return t.stamp - e.stamp;
          });
        }, removeZoneNotify: function removeZoneNotify(t) {
          t.zoneNotifys.shift();
        }, clearBoxes: function clearBoxes(t) {
          var e = Math.floor(new Date().getTime() / 1e3),
              n = [];t.boxes.map(function (t) {
            t.draw > e && n.push(t);
          }), t.boxes = n;
        }, addBoxes: function addBoxes(t, e) {
          this.commit("clearBoxes"), e.forEach(function (e) {
            t.boxes.every(function (t) {
              return t.id != e.id;
            }) && t.boxes.push(e);
          });
        }, clearService: function clearService(t) {
          t.onlineIds = [], t.chat = [], t.gifts = [], t.notifys = [], t.zoneNotifys = [], t.boxes = [];
        } } };i.a.use(a.a);var St = new a.a.Store({ modules: { BaseInfoService: { state: { chnid: null, baseInfo: { tabs: [] } }, getters: { tabs: function tabs(t) {
              var e = [],
                  n = 0;return t.baseInfo.tabs.forEach(function (i, r) {
                i.val == t.baseInfo.activetab && (n = r), e.push({ index: r, text: i.text, val: i.val });
              }), { activeIndex: n, data: e };
            } }, mutations: { setChnid: function setChnid(t, e) {
              t.chnid = e;
            }, setBaseInfo: function setBaseInfo(t, e) {
              t.baseInfo = e;
            }, clearBaseInfo: function clearBaseInfo(t) {
              t.chnid = null, t.baseInfo = { tabs: [] };
            } } }, ApiService: Tt, NotifyService: { state: { loading: !1, alert: { text: null, time: 2e3 } }, mutations: { loading: function loading(t, e) {
              t.loading = e;
            }, alert: function alert(t, e) {
              t.alert.text = e.text, t.alert.time = e.time ? e.time : 2e3;
            } } }, HeartBeanService: kt } });n("pOKD"), n("OSyt"), n("AmX3");i.a.prototype.ApiConfig = At, i.a.use(r.a);var Nt = navigator.userAgent;i.a.prototype.isAndroid = Nt.indexOf("Android") > -1 || Nt.indexOf("Adr") > -1, i.a.prototype.isiOS = !!Nt.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), i.a.config.productionTip = !1, new i.a({ el: "#app", router: wt, store: St, components: { App: m }, render: function render(t) {
        return t(m);
      } });
  }, NeAH: function NeAH(t, e) {
    t.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABUCAMAAABKrcKxAAAAgVBMVEUAAACpqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqampqakESlFJAAAAKnRSTlMAuyyEX94DDqrkB1f6dfAbyJ019raQKCHp2kMVwc581Gw+r1KVZaNLikhA7fE8AAAFIUlEQVRYw+yW7bKaMBRFD5IIhAgIKHJB5eOi7X7/B6zitBiIbUZlpjP3rl/AkCzCPicTulJX9gxUNd1YWJgJa0EXYonZkDGR8ADPZjNgX2cWxABe0CwUHGB0AnyaCR84kQVsaSa2gEXlvIKSLGBBM7EArG/BlxcI9u8SzpjzvKCB7OjvsADp84IIgFvQY5w1gOh5QWgB2DF6hO8BKLNXQj7gQuQvdQH5JS7YL1ZR3M/CN21YDJZlkbUb3rvr18u04+gJ8ur3kzxAD+/e0geii9Aj6YZET1SJtzXaonIjnh/oxirnkVvF7+5kIe4u/8utQhwad0Tj+mSAY09Hns4TQYcpZsuzoSMcCz4kpvDMQOAnmLIvJhlkGyA6+39o18CBTDgCVTuMYxKJv9SFLJGPQmrIgDABH41L9VUUAbE68EgG1EAzymSlF2yAjgYcjl1hdoL7pDtS4EMvYKM3IyShgaAb7akekkIviIH0CQFTBYXEkfSCENjTHXtzwThjvcAJkC/VDByzDNY08BM4qQJ1cQOZxJ4MGP3Z+PEKzuqb9fXWgFAqfeBI7IRe8AlUNLACbNNO3tKA9bBMc8hMORahJRPWAFM/7IdWEELZKpwEQUEmMKBRQyhVwRC/qxZHSkY4EslduYkAntAJfjVmtVuKwjC0LkqhAqMI8o2gLGDe/wG3heOEbOuh98ecEdve5iZNQu1o9vQwcewhATjTjvBuIpiJlPy2nHhbjTy6tZ4QoK/eOKq0UQgPkO+ybTS+TASjJCax0DJbNKsoKMXZREA7jBQF24cHUJK9hbsESrCJ7QIHv3YI0DcopL0FT9wNRsuOk9t1GxTvL0bVVN0vTnYUMU3CFGUCUB9dpkHkEHFiDw1TLH0zjsoAHtryCkVYaQmbvkgVslARAjrMnPpiDyROD/U3SpeYJF5N2bYwPszZNCdLDhsn9E+QyFuXHS+g4PWkeBPvdVJcM8GVyF7+Vmg3BYmbs8o8rVKNYntvk7sbh+j1AGUHNMH1P99xAAjSH5TrGpC+uCUKdevGKAGaEBKN2vW/uUhpF5w5hSe2iSImek0GAmwIUCP7muzjJzeHyP1GEMtHtDd1LQhKgCeha5gdgXjY1cwzcUGmep8diVDNILPrTVtSMPOvBB3pW4R9Zzdo2zITDHLosW3DY8/XAY3d2+QqSjZ1cu75AlAiwXpvilv+IK/DbEZtTSAHpo/nBl/VrnhvmmxCuC9giwAg4rY1PwCCJ19D5skczA79uvPkcGiijx2lFUH72ZKanSyWFHw5to4yA5zKleC+lPIlmAK/H53LYrGXuTsQZbPs5dlO1Tq7UoQpd2CRf1bp9ySRy/UFOaChcsmtOO0AJJIXmfpW8n5uqwZUrmMUwgErPCZDGwO/IVJ6he/7p4icYvIDT3TxjSjWdWahZadIso49PuCcC/WwDv+YLiLyN+MGCDavX1KIMvUBRlOwKdRdxQjekjgyR5Na//DDCO6zCnbz22Prg4LvcGqvEuJsbudg+G/5MQCFxryjqkyLhWKiNitHvAzdnNY5OcEiQhizrxCvBPSJIwDEBufQ9wd+WDqOmO3g3egMcqovaJXRB9UqC/0wCwyAKRDT4JU8iDT9Q4DgbN+Nj1pKJpyOStEEPEJH7aK6YRnHhvZKDYi1ynxg1sgh0q61tl6YAGpTZbbFXV0OUNDSFOqJq0fOfYx66y4KgEzvdolq9j644mKbHubibn0+6M2FPQH/2+uyddsQn0LONAZDkP4DNeQGlgYH/1kAAAAASUVORK5CYII=";
  }, OSyt: function OSyt(t, e, n) {
    "use strict";
    (function (t) {
      var e,
          i,
          r = n("fZjL"),
          o = n.n(r),
          s = n("HSQo"),
          a = n.n(s),
          c = n("pFYg"),
          l = n.n(c);
      /*!
       * jQuery JavaScript Library v2.1.0
       * http://jquery.com/
       *
       * Includes Sizzle.js
       * http://sizzlejs.com/
       *
       * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
       * Released under the MIT license
       * http://jquery.org/license
       *
       * Date: 2014-01-23T21:10Z
       */
      e = "undefined" != typeof window ? window : this, i = function i(t, e) {
        var i = [],
            r = i.slice,
            s = i.concat,
            c = i.push,
            u = i.indexOf,
            f = {},
            d = f.toString,
            p = f.hasOwnProperty,
            h = "".trim,
            m = {},
            v = t.document,
            g = function t(e, n) {
          return new t.fn.init(e, n);
        },
            y = /^-ms-/,
            b = /-([\da-z])/gi,
            x = function x(t, e) {
          return e.toUpperCase();
        };function w(t) {
          var e = t.length,
              n = g.type(t);return "function" !== n && !g.isWindow(t) && (!(1 !== t.nodeType || !e) || "array" === n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t);
        }g.fn = g.prototype = { jquery: "2.1.0", constructor: g, selector: "", length: 0, toArray: function toArray() {
            return r.call(this);
          }, get: function get(t) {
            return null != t ? t < 0 ? this[t + this.length] : this[t] : r.call(this);
          }, pushStack: function pushStack(t) {
            var e = g.merge(this.constructor(), t);return e.prevObject = this, e.context = this.context, e;
          }, each: function each(t, e) {
            return g.each(this, t, e);
          }, map: function map(t) {
            return this.pushStack(g.map(this, function (e, n) {
              return t.call(e, n, e);
            }));
          }, slice: function slice() {
            return this.pushStack(r.apply(this, arguments));
          }, first: function first() {
            return this.eq(0);
          }, last: function last() {
            return this.eq(-1);
          }, eq: function eq(t) {
            var e = this.length,
                n = +t + (t < 0 ? e : 0);return this.pushStack(n >= 0 && n < e ? [this[n]] : []);
          }, end: function end() {
            return this.prevObject || this.constructor(null);
          }, push: c, sort: i.sort, splice: i.splice }, g.extend = g.fn.extend = function () {
          var t,
              e,
              n,
              i,
              r,
              o,
              s = arguments[0] || {},
              a = 1,
              c = arguments.length,
              u = !1;for ("boolean" == typeof s && (u = s, s = arguments[a] || {}, a++), "object" === (void 0 === s ? "undefined" : l()(s)) || g.isFunction(s) || (s = {}), a === c && (s = this, a--); a < c; a++) {
            if (null != (t = arguments[a])) for (e in t) {
              n = s[e], s !== (i = t[e]) && (u && i && (g.isPlainObject(i) || (r = g.isArray(i))) ? (r ? (r = !1, o = n && g.isArray(n) ? n : []) : o = n && g.isPlainObject(n) ? n : {}, s[e] = g.extend(u, o, i)) : void 0 !== i && (s[e] = i));
            }
          }return s;
        }, g.extend({ expando: "jQuery" + ("2.1.0" + Math.random()).replace(/\D/g, ""), isReady: !0, error: function error(t) {
            throw new Error(t);
          }, noop: function noop() {}, isFunction: function isFunction(t) {
            return "function" === g.type(t);
          }, isArray: Array.isArray, isWindow: function isWindow(t) {
            return null != t && t === t.window;
          }, isNumeric: function isNumeric(t) {
            return t - parseFloat(t) >= 0;
          }, isPlainObject: function isPlainObject(t) {
            if ("object" !== g.type(t) || t.nodeType || g.isWindow(t)) return !1;try {
              if (t.constructor && !p.call(t.constructor.prototype, "isPrototypeOf")) return !1;
            } catch (t) {
              return !1;
            }return !0;
          }, isEmptyObject: function isEmptyObject(t) {
            var e;for (e in t) {
              return !1;
            }return !0;
          }, type: function type(t) {
            return null == t ? t + "" : "object" === (void 0 === t ? "undefined" : l()(t)) || "function" == typeof t ? f[d.call(t)] || "object" : void 0 === t ? "undefined" : l()(t);
          }, globalEval: function globalEval(t) {
            var e,
                n = eval;(t = g.trim(t)) && (1 === t.indexOf("use strict") ? ((e = v.createElement("script")).text = t, v.head.appendChild(e).parentNode.removeChild(e)) : n(t));
          }, camelCase: function camelCase(t) {
            return t.replace(y, "ms-").replace(b, x);
          }, nodeName: function nodeName(t, e) {
            return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase();
          }, each: function each(t, e, n) {
            var i = 0,
                r = t.length,
                o = w(t);if (n) {
              if (o) for (; i < r && !1 !== e.apply(t[i], n); i++) {} else for (i in t) {
                if (!1 === e.apply(t[i], n)) break;
              }
            } else if (o) for (; i < r && !1 !== e.call(t[i], i, t[i]); i++) {} else for (i in t) {
              if (!1 === e.call(t[i], i, t[i])) break;
            }return t;
          }, trim: function trim(t) {
            return null == t ? "" : h.call(t);
          }, makeArray: function makeArray(t, e) {
            var n = e || [];return null != t && (w(Object(t)) ? g.merge(n, "string" == typeof t ? [t] : t) : c.call(n, t)), n;
          }, inArray: function inArray(t, e, n) {
            return null == e ? -1 : u.call(e, t, n);
          }, merge: function merge(t, e) {
            for (var n = +e.length, i = 0, r = t.length; i < n; i++) {
              t[r++] = e[i];
            }return t.length = r, t;
          }, grep: function grep(t, e, n) {
            for (var i = [], r = 0, o = t.length, s = !n; r < o; r++) {
              !e(t[r], r) !== s && i.push(t[r]);
            }return i;
          }, map: function map(t, e, n) {
            var i,
                r = 0,
                o = t.length,
                a = [];if (w(t)) for (; r < o; r++) {
              null != (i = e(t[r], r, n)) && a.push(i);
            } else for (r in t) {
              null != (i = e(t[r], r, n)) && a.push(i);
            }return s.apply([], a);
          }, guid: 1, proxy: function proxy(t, e) {
            var n, i, o;if ("string" == typeof e && (n = t[e], e = t, t = n), g.isFunction(t)) return i = r.call(arguments, 2), o = function o() {
              return t.apply(e || this, i.concat(r.call(arguments)));
            }, o.guid = t.guid = t.guid || g.guid++, o;
          }, now: Date.now, support: m }), g.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (t, e) {
          f["[object " + e + "]"] = e.toLowerCase();
        });var A =
        /*!
          * Sizzle CSS Selector Engine v1.10.16
          * http://sizzlejs.com/
          *
          * Copyright 2013 jQuery Foundation, Inc. and other contributors
          * Released under the MIT license
          * http://jquery.org/license
          *
          * Date: 2014-01-13
          */
        function (t) {
          var e,
              n,
              i,
              r,
              o,
              s,
              a,
              c,
              u,
              f,
              d,
              p,
              h,
              m,
              v,
              g,
              y,
              b = "sizzle" + -new Date(),
              x = t.document,
              w = 0,
              A = 0,
              C = rt(),
              _ = rt(),
              T = rt(),
              k = function k(t, e) {
            return t === e && (u = !0), 0;
          },
              S = "undefined",
              N = 1 << 31,
              E = {}.hasOwnProperty,
              D = [],
              I = D.pop,
              j = D.push,
              L = D.push,
              $ = D.slice,
              O = D.indexOf || function (t) {
            for (var e = 0, n = this.length; e < n; e++) {
              if (this[e] === t) return e;
            }return -1;
          },
              H = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
              q = "[\\x20\\t\\r\\n\\f]",
              P = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
              B = P.replace("w", "w#"),
              F = "\\[" + q + "*(" + P + ")" + q + "*(?:([*^$|!~]?=)" + q + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + B + ")|)|)" + q + "*\\]",
              M = ":(" + P + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + F.replace(3, 8) + ")*)|.*)\\)|)",
              R = new RegExp("^" + q + "+|((?:^|[^\\\\])(?:\\\\.)*)" + q + "+$", "g"),
              J = new RegExp("^" + q + "*," + q + "*"),
              U = new RegExp("^" + q + "*([>+~]|" + q + ")" + q + "*"),
              W = new RegExp("=" + q + "*([^\\]'\"]*?)" + q + "*\\]", "g"),
              V = new RegExp(M),
              z = new RegExp("^" + B + "$"),
              G = { ID: new RegExp("^#(" + P + ")"), CLASS: new RegExp("^\\.(" + P + ")"), TAG: new RegExp("^(" + P.replace("w", "w*") + ")"), ATTR: new RegExp("^" + F), PSEUDO: new RegExp("^" + M), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + q + "*(even|odd|(([+-]|)(\\d*)n|)" + q + "*(?:([+-]|)" + q + "*(\\d+)|))" + q + "*\\)|)", "i"), bool: new RegExp("^(?:" + H + ")$", "i"), needsContext: new RegExp("^" + q + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + q + "*((?:-\\d)?\\d*)" + q + "*\\)|)(?=[^-]|$)", "i") },
              Y = /^(?:input|select|textarea|button)$/i,
              X = /^h\d$/i,
              K = /^[^{]+\{\s*\[native \w/,
              Q = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
              Z = /[+~]/,
              tt = /'|\\/g,
              et = new RegExp("\\\\([\\da-f]{1,6}" + q + "?|(" + q + ")|.)", "ig"),
              nt = function nt(t, e, n) {
            var i = "0x" + e - 65536;return i != i || n ? e : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320);
          };try {
            L.apply(D = $.call(x.childNodes), x.childNodes), D[x.childNodes.length].nodeType;
          } catch (t) {
            L = { apply: D.length ? function (t, e) {
                j.apply(t, $.call(e));
              } : function (t, e) {
                for (var n = t.length, i = 0; t[n++] = e[i++];) {}t.length = n - 1;
              } };
          }function it(t, e, r, o) {
            var a, c, l, u, p, v, g, w, A, C;if ((e ? e.ownerDocument || e : x) !== d && f(e), e = e || d, r = r || [], !t || "string" != typeof t) return r;if (1 !== (u = e.nodeType) && 9 !== u) return [];if (h && !o) {
              if (a = Q.exec(t)) if (l = a[1]) {
                if (9 === u) {
                  if (!(c = e.getElementById(l)) || !c.parentNode) return r;if (c.id === l) return r.push(c), r;
                } else if (e.ownerDocument && (c = e.ownerDocument.getElementById(l)) && y(e, c) && c.id === l) return r.push(c), r;
              } else {
                if (a[2]) return L.apply(r, e.getElementsByTagName(t)), r;if ((l = a[3]) && n.getElementsByClassName && e.getElementsByClassName) return L.apply(r, e.getElementsByClassName(l)), r;
              }if (n.qsa && (!m || !m.test(t))) {
                if (w = g = b, A = e, C = 9 === u && t, 1 === u && "object" !== e.nodeName.toLowerCase()) {
                  for (v = ht(t), (g = e.getAttribute("id")) ? w = g.replace(tt, "\\$&") : e.setAttribute("id", w), w = "[id='" + w + "'] ", p = v.length; p--;) {
                    v[p] = w + mt(v[p]);
                  }A = Z.test(t) && dt(e.parentNode) || e, C = v.join(",");
                }if (C) try {
                  return L.apply(r, A.querySelectorAll(C)), r;
                } catch (t) {} finally {
                  g || e.removeAttribute("id");
                }
              }
            }return function (t, e, r, o) {
              var a,
                  c,
                  l,
                  u,
                  f,
                  d = ht(t);if (!o && 1 === d.length) {
                if ((c = d[0] = d[0].slice(0)).length > 2 && "ID" === (l = c[0]).type && n.getById && 9 === e.nodeType && h && i.relative[c[1].type]) {
                  if (!(e = (i.find.ID(l.matches[0].replace(et, nt), e) || [])[0])) return r;t = t.slice(c.shift().value.length);
                }for (a = G.needsContext.test(t) ? 0 : c.length; a-- && (l = c[a], !i.relative[u = l.type]);) {
                  if ((f = i.find[u]) && (o = f(l.matches[0].replace(et, nt), Z.test(c[0].type) && dt(e.parentNode) || e))) {
                    if (c.splice(a, 1), !(t = o.length && mt(c))) return L.apply(r, o), r;break;
                  }
                }
              }return s(t, d)(o, e, !h, r, Z.test(t) && dt(e.parentNode) || e), r;
            }(t.replace(R, "$1"), e, r, o);
          }function rt() {
            var t = [];return function e(n, r) {
              return t.push(n + " ") > i.cacheLength && delete e[t.shift()], e[n + " "] = r;
            };
          }function ot(t) {
            return t[b] = !0, t;
          }function st(t) {
            var e = d.createElement("div");try {
              return !!t(e);
            } catch (t) {
              return !1;
            } finally {
              e.parentNode && e.parentNode.removeChild(e), e = null;
            }
          }function at(t, e) {
            for (var n = t.split("|"), r = t.length; r--;) {
              i.attrHandle[n[r]] = e;
            }
          }function ct(t, e) {
            var n = e && t,
                i = n && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || N) - (~t.sourceIndex || N);if (i) return i;if (n) for (; n = n.nextSibling;) {
              if (n === e) return -1;
            }return t ? 1 : -1;
          }function lt(t) {
            return function (e) {
              return "input" === e.nodeName.toLowerCase() && e.type === t;
            };
          }function ut(t) {
            return function (e) {
              var n = e.nodeName.toLowerCase();return ("input" === n || "button" === n) && e.type === t;
            };
          }function ft(t) {
            return ot(function (e) {
              return e = +e, ot(function (n, i) {
                for (var r, o = t([], n.length, e), s = o.length; s--;) {
                  n[r = o[s]] && (n[r] = !(i[r] = n[r]));
                }
              });
            });
          }function dt(t) {
            return t && l()(t.getElementsByTagName) !== S && t;
          }for (e in n = it.support = {}, o = it.isXML = function (t) {
            var e = t && (t.ownerDocument || t).documentElement;return !!e && "HTML" !== e.nodeName;
          }, f = it.setDocument = function (t) {
            var e,
                r = t ? t.ownerDocument || t : x,
                s = r.defaultView;return r !== d && 9 === r.nodeType && r.documentElement ? (d = r, p = r.documentElement, h = !o(r), s && s !== s.top && (s.addEventListener ? s.addEventListener("unload", function () {
              f();
            }, !1) : s.attachEvent && s.attachEvent("onunload", function () {
              f();
            })), n.attributes = st(function (t) {
              return t.className = "i", !t.getAttribute("className");
            }), n.getElementsByTagName = st(function (t) {
              return t.appendChild(r.createComment("")), !t.getElementsByTagName("*").length;
            }), n.getElementsByClassName = K.test(r.getElementsByClassName) && st(function (t) {
              return t.innerHTML = "<div class='a'></div><div class='a i'></div>", t.firstChild.className = "i", 2 === t.getElementsByClassName("i").length;
            }), n.getById = st(function (t) {
              return p.appendChild(t).id = b, !r.getElementsByName || !r.getElementsByName(b).length;
            }), n.getById ? (i.find.ID = function (t, e) {
              if (l()(e.getElementById) !== S && h) {
                var n = e.getElementById(t);return n && n.parentNode ? [n] : [];
              }
            }, i.filter.ID = function (t) {
              var e = t.replace(et, nt);return function (t) {
                return t.getAttribute("id") === e;
              };
            }) : (delete i.find.ID, i.filter.ID = function (t) {
              var e = t.replace(et, nt);return function (t) {
                var n = l()(t.getAttributeNode) !== S && t.getAttributeNode("id");return n && n.value === e;
              };
            }), i.find.TAG = n.getElementsByTagName ? function (t, e) {
              if (l()(e.getElementsByTagName) !== S) return e.getElementsByTagName(t);
            } : function (t, e) {
              var n,
                  i = [],
                  r = 0,
                  o = e.getElementsByTagName(t);if ("*" === t) {
                for (; n = o[r++];) {
                  1 === n.nodeType && i.push(n);
                }return i;
              }return o;
            }, i.find.CLASS = n.getElementsByClassName && function (t, e) {
              if (l()(e.getElementsByClassName) !== S && h) return e.getElementsByClassName(t);
            }, v = [], m = [], (n.qsa = K.test(r.querySelectorAll)) && (st(function (t) {
              t.innerHTML = "<select t=''><option selected=''></option></select>", t.querySelectorAll("[t^='']").length && m.push("[*^$]=" + q + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || m.push("\\[" + q + "*(?:value|" + H + ")"), t.querySelectorAll(":checked").length || m.push(":checked");
            }), st(function (t) {
              var e = r.createElement("input");e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && m.push("name" + q + "*[*^$|!~]?="), t.querySelectorAll(":enabled").length || m.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), m.push(",.*:");
            })), (n.matchesSelector = K.test(g = p.webkitMatchesSelector || p.mozMatchesSelector || p.oMatchesSelector || p.msMatchesSelector)) && st(function (t) {
              n.disconnectedMatch = g.call(t, "div"), g.call(t, "[s!='']:x"), v.push("!=", M);
            }), m = m.length && new RegExp(m.join("|")), v = v.length && new RegExp(v.join("|")), e = K.test(p.compareDocumentPosition), y = e || K.test(p.contains) ? function (t, e) {
              var n = 9 === t.nodeType ? t.documentElement : t,
                  i = e && e.parentNode;return t === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(i)));
            } : function (t, e) {
              if (e) for (; e = e.parentNode;) {
                if (e === t) return !0;
              }return !1;
            }, k = e ? function (t, e) {
              if (t === e) return u = !0, 0;var i = !t.compareDocumentPosition - !e.compareDocumentPosition;return i || (1 & (i = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1) || !n.sortDetached && e.compareDocumentPosition(t) === i ? t === r || t.ownerDocument === x && y(x, t) ? -1 : e === r || e.ownerDocument === x && y(x, e) ? 1 : c ? O.call(c, t) - O.call(c, e) : 0 : 4 & i ? -1 : 1);
            } : function (t, e) {
              if (t === e) return u = !0, 0;var n,
                  i = 0,
                  o = t.parentNode,
                  s = e.parentNode,
                  a = [t],
                  l = [e];if (!o || !s) return t === r ? -1 : e === r ? 1 : o ? -1 : s ? 1 : c ? O.call(c, t) - O.call(c, e) : 0;if (o === s) return ct(t, e);for (n = t; n = n.parentNode;) {
                a.unshift(n);
              }for (n = e; n = n.parentNode;) {
                l.unshift(n);
              }for (; a[i] === l[i];) {
                i++;
              }return i ? ct(a[i], l[i]) : a[i] === x ? -1 : l[i] === x ? 1 : 0;
            }, r) : d;
          }, it.matches = function (t, e) {
            return it(t, null, null, e);
          }, it.matchesSelector = function (t, e) {
            if ((t.ownerDocument || t) !== d && f(t), e = e.replace(W, "='$1']"), n.matchesSelector && h && (!v || !v.test(e)) && (!m || !m.test(e))) try {
              var i = g.call(t, e);if (i || n.disconnectedMatch || t.document && 11 !== t.document.nodeType) return i;
            } catch (t) {}return it(e, d, null, [t]).length > 0;
          }, it.contains = function (t, e) {
            return (t.ownerDocument || t) !== d && f(t), y(t, e);
          }, it.attr = function (t, e) {
            (t.ownerDocument || t) !== d && f(t);var r = i.attrHandle[e.toLowerCase()],
                o = r && E.call(i.attrHandle, e.toLowerCase()) ? r(t, e, !h) : void 0;return void 0 !== o ? o : n.attributes || !h ? t.getAttribute(e) : (o = t.getAttributeNode(e)) && o.specified ? o.value : null;
          }, it.error = function (t) {
            throw new Error("Syntax error, unrecognized expression: " + t);
          }, it.uniqueSort = function (t) {
            var e,
                i = [],
                r = 0,
                o = 0;if (u = !n.detectDuplicates, c = !n.sortStable && t.slice(0), t.sort(k), u) {
              for (; e = t[o++];) {
                e === t[o] && (r = i.push(o));
              }for (; r--;) {
                t.splice(i[r], 1);
              }
            }return c = null, t;
          }, r = it.getText = function (t) {
            var e,
                n = "",
                i = 0,
                o = t.nodeType;if (o) {
              if (1 === o || 9 === o || 11 === o) {
                if ("string" == typeof t.textContent) return t.textContent;for (t = t.firstChild; t; t = t.nextSibling) {
                  n += r(t);
                }
              } else if (3 === o || 4 === o) return t.nodeValue;
            } else for (; e = t[i++];) {
              n += r(e);
            }return n;
          }, (i = it.selectors = { cacheLength: 50, createPseudo: ot, match: G, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function ATTR(t) {
                return t[1] = t[1].replace(et, nt), t[3] = (t[4] || t[5] || "").replace(et, nt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4);
              }, CHILD: function CHILD(t) {
                return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || it.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && it.error(t[0]), t;
              }, PSEUDO: function PSEUDO(t) {
                var e,
                    n = !t[5] && t[2];return G.CHILD.test(t[0]) ? null : (t[3] && void 0 !== t[4] ? t[2] = t[4] : n && V.test(n) && (e = ht(n, !0)) && (e = n.indexOf(")", n.length - e) - n.length) && (t[0] = t[0].slice(0, e), t[2] = n.slice(0, e)), t.slice(0, 3));
              } }, filter: { TAG: function TAG(t) {
                var e = t.replace(et, nt).toLowerCase();return "*" === t ? function () {
                  return !0;
                } : function (t) {
                  return t.nodeName && t.nodeName.toLowerCase() === e;
                };
              }, CLASS: function CLASS(t) {
                var e = C[t + " "];return e || (e = new RegExp("(^|" + q + ")" + t + "(" + q + "|$)")) && C(t, function (t) {
                  return e.test("string" == typeof t.className && t.className || l()(t.getAttribute) !== S && t.getAttribute("class") || "");
                });
              }, ATTR: function ATTR(t, e, n) {
                return function (i) {
                  var r = it.attr(i, t);return null == r ? "!=" === e : !e || (r += "", "=" === e ? r === n : "!=" === e ? r !== n : "^=" === e ? n && 0 === r.indexOf(n) : "*=" === e ? n && r.indexOf(n) > -1 : "$=" === e ? n && r.slice(-n.length) === n : "~=" === e ? (" " + r + " ").indexOf(n) > -1 : "|=" === e && (r === n || r.slice(0, n.length + 1) === n + "-"));
                };
              }, CHILD: function CHILD(t, e, n, i, r) {
                var o = "nth" !== t.slice(0, 3),
                    s = "last" !== t.slice(-4),
                    a = "of-type" === e;return 1 === i && 0 === r ? function (t) {
                  return !!t.parentNode;
                } : function (e, n, c) {
                  var l,
                      u,
                      f,
                      d,
                      p,
                      h,
                      m = o !== s ? "nextSibling" : "previousSibling",
                      v = e.parentNode,
                      g = a && e.nodeName.toLowerCase(),
                      y = !c && !a;if (v) {
                    if (o) {
                      for (; m;) {
                        for (f = e; f = f[m];) {
                          if (a ? f.nodeName.toLowerCase() === g : 1 === f.nodeType) return !1;
                        }h = m = "only" === t && !h && "nextSibling";
                      }return !0;
                    }if (h = [s ? v.firstChild : v.lastChild], s && y) {
                      for (p = (l = (u = v[b] || (v[b] = {}))[t] || [])[0] === w && l[1], d = l[0] === w && l[2], f = p && v.childNodes[p]; f = ++p && f && f[m] || (d = p = 0) || h.pop();) {
                        if (1 === f.nodeType && ++d && f === e) {
                          u[t] = [w, p, d];break;
                        }
                      }
                    } else if (y && (l = (e[b] || (e[b] = {}))[t]) && l[0] === w) d = l[1];else for (; (f = ++p && f && f[m] || (d = p = 0) || h.pop()) && ((a ? f.nodeName.toLowerCase() !== g : 1 !== f.nodeType) || !++d || (y && ((f[b] || (f[b] = {}))[t] = [w, d]), f !== e));) {}return (d -= r) === i || d % i == 0 && d / i >= 0;
                  }
                };
              }, PSEUDO: function PSEUDO(t, e) {
                var n,
                    r = i.pseudos[t] || i.setFilters[t.toLowerCase()] || it.error("unsupported pseudo: " + t);return r[b] ? r(e) : r.length > 1 ? (n = [t, t, "", e], i.setFilters.hasOwnProperty(t.toLowerCase()) ? ot(function (t, n) {
                  for (var i, o = r(t, e), s = o.length; s--;) {
                    t[i = O.call(t, o[s])] = !(n[i] = o[s]);
                  }
                }) : function (t) {
                  return r(t, 0, n);
                }) : r;
              } }, pseudos: { not: ot(function (t) {
                var e = [],
                    n = [],
                    i = s(t.replace(R, "$1"));return i[b] ? ot(function (t, e, n, r) {
                  for (var o, s = i(t, null, r, []), a = t.length; a--;) {
                    (o = s[a]) && (t[a] = !(e[a] = o));
                  }
                }) : function (t, r, o) {
                  return e[0] = t, i(e, null, o, n), !n.pop();
                };
              }), has: ot(function (t) {
                return function (e) {
                  return it(t, e).length > 0;
                };
              }), contains: ot(function (t) {
                return function (e) {
                  return (e.textContent || e.innerText || r(e)).indexOf(t) > -1;
                };
              }), lang: ot(function (t) {
                return z.test(t || "") || it.error("unsupported lang: " + t), t = t.replace(et, nt).toLowerCase(), function (e) {
                  var n;do {
                    if (n = h ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (n = n.toLowerCase()) === t || 0 === n.indexOf(t + "-");
                  } while ((e = e.parentNode) && 1 === e.nodeType);return !1;
                };
              }), target: function target(e) {
                var n = t.location && t.location.hash;return n && n.slice(1) === e.id;
              }, root: function root(t) {
                return t === p;
              }, focus: function focus(t) {
                return t === d.activeElement && (!d.hasFocus || d.hasFocus()) && !!(t.type || t.href || ~t.tabIndex);
              }, enabled: function enabled(t) {
                return !1 === t.disabled;
              }, disabled: function disabled(t) {
                return !0 === t.disabled;
              }, checked: function checked(t) {
                var e = t.nodeName.toLowerCase();return "input" === e && !!t.checked || "option" === e && !!t.selected;
              }, selected: function selected(t) {
                return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected;
              }, empty: function empty(t) {
                for (t = t.firstChild; t; t = t.nextSibling) {
                  if (t.nodeType < 6) return !1;
                }return !0;
              }, parent: function parent(t) {
                return !i.pseudos.empty(t);
              }, header: function header(t) {
                return X.test(t.nodeName);
              }, input: function input(t) {
                return Y.test(t.nodeName);
              }, button: function button(t) {
                var e = t.nodeName.toLowerCase();return "input" === e && "button" === t.type || "button" === e;
              }, text: function text(t) {
                var e;return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase());
              }, first: ft(function () {
                return [0];
              }), last: ft(function (t, e) {
                return [e - 1];
              }), eq: ft(function (t, e, n) {
                return [n < 0 ? n + e : n];
              }), even: ft(function (t, e) {
                for (var n = 0; n < e; n += 2) {
                  t.push(n);
                }return t;
              }), odd: ft(function (t, e) {
                for (var n = 1; n < e; n += 2) {
                  t.push(n);
                }return t;
              }), lt: ft(function (t, e, n) {
                for (var i = n < 0 ? n + e : n; --i >= 0;) {
                  t.push(i);
                }return t;
              }), gt: ft(function (t, e, n) {
                for (var i = n < 0 ? n + e : n; ++i < e;) {
                  t.push(i);
                }return t;
              }) } }).pseudos.nth = i.pseudos.eq, { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) {
            i.pseudos[e] = lt(e);
          }for (e in { submit: !0, reset: !0 }) {
            i.pseudos[e] = ut(e);
          }function pt() {}function ht(t, e) {
            var n,
                r,
                o,
                s,
                a,
                c,
                l,
                u = _[t + " "];if (u) return e ? 0 : u.slice(0);for (a = t, c = [], l = i.preFilter; a;) {
              for (s in n && !(r = J.exec(a)) || (r && (a = a.slice(r[0].length) || a), c.push(o = [])), n = !1, (r = U.exec(a)) && (n = r.shift(), o.push({ value: n, type: r[0].replace(R, " ") }), a = a.slice(n.length)), i.filter) {
                !(r = G[s].exec(a)) || l[s] && !(r = l[s](r)) || (n = r.shift(), o.push({ value: n, type: s, matches: r }), a = a.slice(n.length));
              }if (!n) break;
            }return e ? a.length : a ? it.error(t) : _(t, c).slice(0);
          }function mt(t) {
            for (var e = 0, n = t.length, i = ""; e < n; e++) {
              i += t[e].value;
            }return i;
          }function vt(t, e, n) {
            var i = e.dir,
                r = n && "parentNode" === i,
                o = A++;return e.first ? function (e, n, o) {
              for (; e = e[i];) {
                if (1 === e.nodeType || r) return t(e, n, o);
              }
            } : function (e, n, s) {
              var a,
                  c,
                  l = [w, o];if (s) {
                for (; e = e[i];) {
                  if ((1 === e.nodeType || r) && t(e, n, s)) return !0;
                }
              } else for (; e = e[i];) {
                if (1 === e.nodeType || r) {
                  if ((a = (c = e[b] || (e[b] = {}))[i]) && a[0] === w && a[1] === o) return l[2] = a[2];if (c[i] = l, l[2] = t(e, n, s)) return !0;
                }
              }
            };
          }function gt(t) {
            return t.length > 1 ? function (e, n, i) {
              for (var r = t.length; r--;) {
                if (!t[r](e, n, i)) return !1;
              }return !0;
            } : t[0];
          }function yt(t, e, n, i, r) {
            for (var o, s = [], a = 0, c = t.length, l = null != e; a < c; a++) {
              (o = t[a]) && (n && !n(o, i, r) || (s.push(o), l && e.push(a)));
            }return s;
          }function bt(t, e, n, i, r, o) {
            return i && !i[b] && (i = bt(i)), r && !r[b] && (r = bt(r, o)), ot(function (o, s, a, c) {
              var l,
                  u,
                  f,
                  d = [],
                  p = [],
                  h = s.length,
                  m = o || function (t, e, n) {
                for (var i = 0, r = e.length; i < r; i++) {
                  it(t, e[i], n);
                }return n;
              }(e || "*", a.nodeType ? [a] : a, []),
                  v = !t || !o && e ? m : yt(m, d, t, a, c),
                  g = n ? r || (o ? t : h || i) ? [] : s : v;if (n && n(v, g, a, c), i) for (l = yt(g, p), i(l, [], a, c), u = l.length; u--;) {
                (f = l[u]) && (g[p[u]] = !(v[p[u]] = f));
              }if (o) {
                if (r || t) {
                  if (r) {
                    for (l = [], u = g.length; u--;) {
                      (f = g[u]) && l.push(v[u] = f);
                    }r(null, g = [], l, c);
                  }for (u = g.length; u--;) {
                    (f = g[u]) && (l = r ? O.call(o, f) : d[u]) > -1 && (o[l] = !(s[l] = f));
                  }
                }
              } else g = yt(g === s ? g.splice(h, g.length) : g), r ? r(null, s, g, c) : L.apply(s, g);
            });
          }function xt(t) {
            for (var e, n, r, o = t.length, s = i.relative[t[0].type], c = s || i.relative[" "], l = s ? 1 : 0, u = vt(function (t) {
              return t === e;
            }, c, !0), f = vt(function (t) {
              return O.call(e, t) > -1;
            }, c, !0), d = [function (t, n, i) {
              return !s && (i || n !== a) || ((e = n).nodeType ? u(t, n, i) : f(t, n, i));
            }]; l < o; l++) {
              if (n = i.relative[t[l].type]) d = [vt(gt(d), n)];else {
                if ((n = i.filter[t[l].type].apply(null, t[l].matches))[b]) {
                  for (r = ++l; r < o && !i.relative[t[r].type]; r++) {}return bt(l > 1 && gt(d), l > 1 && mt(t.slice(0, l - 1).concat({ value: " " === t[l - 2].type ? "*" : "" })).replace(R, "$1"), n, l < r && xt(t.slice(l, r)), r < o && xt(t = t.slice(r)), r < o && mt(t));
                }d.push(n);
              }
            }return gt(d);
          }return pt.prototype = i.filters = i.pseudos, i.setFilters = new pt(), s = it.compile = function (t, e) {
            var n,
                r = [],
                o = [],
                s = T[t + " "];if (!s) {
              for (e || (e = ht(t)), n = e.length; n--;) {
                (s = xt(e[n]))[b] ? r.push(s) : o.push(s);
              }s = T(t, function (t, e) {
                var n = e.length > 0,
                    r = t.length > 0,
                    o = function o(_o2, s, c, l, u) {
                  var f,
                      p,
                      h,
                      m = 0,
                      v = "0",
                      g = _o2 && [],
                      y = [],
                      b = a,
                      x = _o2 || r && i.find.TAG("*", u),
                      A = w += null == b ? 1 : Math.random() || .1,
                      C = x.length;for (u && (a = s !== d && s); v !== C && null != (f = x[v]); v++) {
                    if (r && f) {
                      for (p = 0; h = t[p++];) {
                        if (h(f, s, c)) {
                          l.push(f);break;
                        }
                      }u && (w = A);
                    }n && ((f = !h && f) && m--, _o2 && g.push(f));
                  }if (m += v, n && v !== m) {
                    for (p = 0; h = e[p++];) {
                      h(g, y, s, c);
                    }if (_o2) {
                      if (m > 0) for (; v--;) {
                        g[v] || y[v] || (y[v] = I.call(l));
                      }y = yt(y);
                    }L.apply(l, y), u && !_o2 && y.length > 0 && m + e.length > 1 && it.uniqueSort(l);
                  }return u && (w = A, a = b), g;
                };return n ? ot(o) : o;
              }(o, r));
            }return s;
          }, n.sortStable = b.split("").sort(k).join("") === b, n.detectDuplicates = !!u, f(), n.sortDetached = st(function (t) {
            return 1 & t.compareDocumentPosition(d.createElement("div"));
          }), st(function (t) {
            return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href");
          }) || at("type|href|height|width", function (t, e, n) {
            if (!n) return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2);
          }), n.attributes && st(function (t) {
            return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value");
          }) || at("value", function (t, e, n) {
            if (!n && "input" === t.nodeName.toLowerCase()) return t.defaultValue;
          }), st(function (t) {
            return null == t.getAttribute("disabled");
          }) || at(H, function (t, e, n) {
            var i;if (!n) return !0 === t[e] ? e.toLowerCase() : (i = t.getAttributeNode(e)) && i.specified ? i.value : null;
          }), it;
        }(t);g.find = A, g.expr = A.selectors, g.expr[":"] = g.expr.pseudos, g.unique = A.uniqueSort, g.text = A.getText, g.isXMLDoc = A.isXML, g.contains = A.contains;var C = g.expr.match.needsContext,
            _ = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            T = /^.[^:#\[\.,]*$/;function k(t, e, n) {
          if (g.isFunction(e)) return g.grep(t, function (t, i) {
            return !!e.call(t, i, t) !== n;
          });if (e.nodeType) return g.grep(t, function (t) {
            return t === e !== n;
          });if ("string" == typeof e) {
            if (T.test(e)) return g.filter(e, t, n);e = g.filter(e, t);
          }return g.grep(t, function (t) {
            return u.call(e, t) >= 0 !== n;
          });
        }g.filter = function (t, e, n) {
          var i = e[0];return n && (t = ":not(" + t + ")"), 1 === e.length && 1 === i.nodeType ? g.find.matchesSelector(i, t) ? [i] : [] : g.find.matches(t, g.grep(e, function (t) {
            return 1 === t.nodeType;
          }));
        }, g.fn.extend({ find: function find(t) {
            var e,
                n = this.length,
                i = [],
                r = this;if ("string" != typeof t) return this.pushStack(g(t).filter(function () {
              for (e = 0; e < n; e++) {
                if (g.contains(r[e], this)) return !0;
              }
            }));for (e = 0; e < n; e++) {
              g.find(t, r[e], i);
            }return (i = this.pushStack(n > 1 ? g.unique(i) : i)).selector = this.selector ? this.selector + " " + t : t, i;
          }, filter: function filter(t) {
            return this.pushStack(k(this, t || [], !1));
          }, not: function not(t) {
            return this.pushStack(k(this, t || [], !0));
          }, is: function is(t) {
            return !!k(this, "string" == typeof t && C.test(t) ? g(t) : t || [], !1).length;
          } });var S,
            N = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;(g.fn.init = function (t, e) {
          var n, i;if (!t) return this;if ("string" == typeof t) {
            if (!(n = "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3 ? [null, t, null] : N.exec(t)) || !n[1] && e) return !e || e.jquery ? (e || S).find(t) : this.constructor(e).find(t);if (n[1]) {
              if (e = e instanceof g ? e[0] : e, g.merge(this, g.parseHTML(n[1], e && e.nodeType ? e.ownerDocument || e : v, !0)), _.test(n[1]) && g.isPlainObject(e)) for (n in e) {
                g.isFunction(this[n]) ? this[n](e[n]) : this.attr(n, e[n]);
              }return this;
            }return (i = v.getElementById(n[2])) && i.parentNode && (this.length = 1, this[0] = i), this.context = v, this.selector = t, this;
          }return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : g.isFunction(t) ? void 0 !== S.ready ? S.ready(t) : t(g) : (void 0 !== t.selector && (this.selector = t.selector, this.context = t.context), g.makeArray(t, this));
        }).prototype = g.fn, S = g(v);var E = /^(?:parents|prev(?:Until|All))/,
            D = { children: !0, contents: !0, next: !0, prev: !0 };function I(t, e) {
          for (; (t = t[e]) && 1 !== t.nodeType;) {}return t;
        }g.extend({ dir: function dir(t, e, n) {
            for (var i = [], r = void 0 !== n; (t = t[e]) && 9 !== t.nodeType;) {
              if (1 === t.nodeType) {
                if (r && g(t).is(n)) break;i.push(t);
              }
            }return i;
          }, sibling: function sibling(t, e) {
            for (var n = []; t; t = t.nextSibling) {
              1 === t.nodeType && t !== e && n.push(t);
            }return n;
          } }), g.fn.extend({ has: function has(t) {
            var e = g(t, this),
                n = e.length;return this.filter(function () {
              for (var t = 0; t < n; t++) {
                if (g.contains(this, e[t])) return !0;
              }
            });
          }, closest: function closest(t, e) {
            for (var n, i = 0, r = this.length, o = [], s = C.test(t) || "string" != typeof t ? g(t, e || this.context) : 0; i < r; i++) {
              for (n = this[i]; n && n !== e; n = n.parentNode) {
                if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && g.find.matchesSelector(n, t))) {
                  o.push(n);break;
                }
              }
            }return this.pushStack(o.length > 1 ? g.unique(o) : o);
          }, index: function index(t) {
            return t ? "string" == typeof t ? u.call(g(t), this[0]) : u.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
          }, add: function add(t, e) {
            return this.pushStack(g.unique(g.merge(this.get(), g(t, e))));
          }, addBack: function addBack(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t));
          } }), g.each({ parent: function parent(t) {
            var e = t.parentNode;return e && 11 !== e.nodeType ? e : null;
          }, parents: function parents(t) {
            return g.dir(t, "parentNode");
          }, parentsUntil: function parentsUntil(t, e, n) {
            return g.dir(t, "parentNode", n);
          }, next: function next(t) {
            return I(t, "nextSibling");
          }, prev: function prev(t) {
            return I(t, "previousSibling");
          }, nextAll: function nextAll(t) {
            return g.dir(t, "nextSibling");
          }, prevAll: function prevAll(t) {
            return g.dir(t, "previousSibling");
          }, nextUntil: function nextUntil(t, e, n) {
            return g.dir(t, "nextSibling", n);
          }, prevUntil: function prevUntil(t, e, n) {
            return g.dir(t, "previousSibling", n);
          }, siblings: function siblings(t) {
            return g.sibling((t.parentNode || {}).firstChild, t);
          }, children: function children(t) {
            return g.sibling(t.firstChild);
          }, contents: function contents(t) {
            return t.contentDocument || g.merge([], t.childNodes);
          } }, function (t, e) {
          g.fn[t] = function (n, i) {
            var r = g.map(this, e, n);return "Until" !== t.slice(-5) && (i = n), i && "string" == typeof i && (r = g.filter(i, r)), this.length > 1 && (D[t] || g.unique(r), E.test(t) && r.reverse()), this.pushStack(r);
          };
        });var j,
            L = /\S+/g,
            $ = {};function O() {
          v.removeEventListener("DOMContentLoaded", O, !1), t.removeEventListener("load", O, !1), g.ready();
        }g.Callbacks = function (t) {
          var e,
              n,
              i,
              r,
              o,
              s,
              a = [],
              c = !(t = "string" == typeof t ? $[t] || function (t) {
            var e = $[t] = {};return g.each(t.match(L) || [], function (t, n) {
              e[n] = !0;
            }), e;
          }(t) : g.extend({}, t)).once && [],
              l = function l(f) {
            for (e = t.memory && f, n = !0, s = r || 0, r = 0, o = a.length, i = !0; a && s < o; s++) {
              if (!1 === a[s].apply(f[0], f[1]) && t.stopOnFalse) {
                e = !1;break;
              }
            }i = !1, a && (c ? c.length && l(c.shift()) : e ? a = [] : u.disable());
          },
              u = { add: function add() {
              if (a) {
                var n = a.length;!function e(n) {
                  g.each(n, function (n, i) {
                    var r = g.type(i);"function" === r ? t.unique && u.has(i) || a.push(i) : i && i.length && "string" !== r && e(i);
                  });
                }(arguments), i ? o = a.length : e && (r = n, l(e));
              }return this;
            }, remove: function remove() {
              return a && g.each(arguments, function (t, e) {
                for (var n; (n = g.inArray(e, a, n)) > -1;) {
                  a.splice(n, 1), i && (n <= o && o--, n <= s && s--);
                }
              }), this;
            }, has: function has(t) {
              return t ? g.inArray(t, a) > -1 : !(!a || !a.length);
            }, empty: function empty() {
              return a = [], o = 0, this;
            }, disable: function disable() {
              return a = c = e = void 0, this;
            }, disabled: function disabled() {
              return !a;
            }, lock: function lock() {
              return c = void 0, e || u.disable(), this;
            }, locked: function locked() {
              return !c;
            }, fireWith: function fireWith(t, e) {
              return !a || n && !c || (e = [t, (e = e || []).slice ? e.slice() : e], i ? c.push(e) : l(e)), this;
            }, fire: function fire() {
              return u.fireWith(this, arguments), this;
            }, fired: function fired() {
              return !!n;
            } };return u;
        }, g.extend({ Deferred: function Deferred(t) {
            var e = [["resolve", "done", g.Callbacks("once memory"), "resolved"], ["reject", "fail", g.Callbacks("once memory"), "rejected"], ["notify", "progress", g.Callbacks("memory")]],
                n = "pending",
                i = { state: function state() {
                return n;
              }, always: function always() {
                return r.done(arguments).fail(arguments), this;
              }, then: function then() {
                var t = arguments;return g.Deferred(function (n) {
                  g.each(e, function (e, o) {
                    var s = g.isFunction(t[e]) && t[e];r[o[1]](function () {
                      var t = s && s.apply(this, arguments);t && g.isFunction(t.promise) ? t.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === i ? n.promise() : this, s ? [t] : arguments);
                    });
                  }), t = null;
                }).promise();
              }, promise: function promise(t) {
                return null != t ? g.extend(t, i) : i;
              } },
                r = {};return i.pipe = i.then, g.each(e, function (t, o) {
              var s = o[2],
                  a = o[3];i[o[1]] = s.add, a && s.add(function () {
                n = a;
              }, e[1 ^ t][2].disable, e[2][2].lock), r[o[0]] = function () {
                return r[o[0] + "With"](this === r ? i : this, arguments), this;
              }, r[o[0] + "With"] = s.fireWith;
            }), i.promise(r), t && t.call(r, r), r;
          }, when: function when(t) {
            var e,
                n,
                i,
                o = 0,
                s = r.call(arguments),
                a = s.length,
                c = 1 !== a || t && g.isFunction(t.promise) ? a : 0,
                l = 1 === c ? t : g.Deferred(),
                u = function u(t, n, i) {
              return function (o) {
                n[t] = this, i[t] = arguments.length > 1 ? r.call(arguments) : o, i === e ? l.notifyWith(n, i) : --c || l.resolveWith(n, i);
              };
            };if (a > 1) for (e = new Array(a), n = new Array(a), i = new Array(a); o < a; o++) {
              s[o] && g.isFunction(s[o].promise) ? s[o].promise().done(u(o, i, s)).fail(l.reject).progress(u(o, n, e)) : --c;
            }return c || l.resolveWith(i, s), l.promise();
          } }), g.fn.ready = function (t) {
          return g.ready.promise().done(t), this;
        }, g.extend({ isReady: !1, readyWait: 1, holdReady: function holdReady(t) {
            t ? g.readyWait++ : g.ready(!0);
          }, ready: function ready(t) {
            (!0 === t ? --g.readyWait : g.isReady) || (g.isReady = !0, !0 !== t && --g.readyWait > 0 || (j.resolveWith(v, [g]), g.fn.trigger && g(v).trigger("ready").off("ready")));
          } }), g.ready.promise = function (e) {
          return j || (j = g.Deferred(), "complete" === v.readyState ? setTimeout(g.ready) : (v.addEventListener("DOMContentLoaded", O, !1), t.addEventListener("load", O, !1))), j.promise(e);
        }, g.ready.promise();var H = g.access = function (t, e, n, i, r, o, s) {
          var a = 0,
              c = t.length,
              l = null == n;if ("object" === g.type(n)) for (a in r = !0, n) {
            g.access(t, e, a, n[a], !0, o, s);
          } else if (void 0 !== i && (r = !0, g.isFunction(i) || (s = !0), l && (s ? (e.call(t, i), e = null) : (l = e, e = function e(t, _e2, n) {
            return l.call(g(t), n);
          })), e)) for (; a < c; a++) {
            e(t[a], n, s ? i : i.call(t[a], a, e(t[a], n)));
          }return r ? t : l ? e.call(t) : c ? e(t[0], n) : o;
        };function q() {
          Object.defineProperty(this.cache = {}, 0, { get: function get() {
              return {};
            } }), this.expando = g.expando + Math.random();
        }g.acceptData = function (t) {
          return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType;
        }, q.uid = 1, q.accepts = g.acceptData, q.prototype = { key: function key(t) {
            if (!q.accepts(t)) return 0;var e = {},
                n = t[this.expando];if (!n) {
              n = q.uid++;try {
                e[this.expando] = { value: n }, a()(t, e);
              } catch (i) {
                e[this.expando] = n, g.extend(t, e);
              }
            }return this.cache[n] || (this.cache[n] = {}), n;
          }, set: function set(t, e, n) {
            var i,
                r = this.key(t),
                o = this.cache[r];if ("string" == typeof e) o[e] = n;else if (g.isEmptyObject(o)) g.extend(this.cache[r], e);else for (i in e) {
              o[i] = e[i];
            }return o;
          }, get: function get(t, e) {
            var n = this.cache[this.key(t)];return void 0 === e ? n : n[e];
          }, access: function access(t, e, n) {
            var i;return void 0 === e || e && "string" == typeof e && void 0 === n ? void 0 !== (i = this.get(t, e)) ? i : this.get(t, g.camelCase(e)) : (this.set(t, e, n), void 0 !== n ? n : e);
          }, remove: function remove(t, e) {
            var n,
                i,
                r,
                o = this.key(t),
                s = this.cache[o];if (void 0 === e) this.cache[o] = {};else {
              g.isArray(e) ? i = e.concat(e.map(g.camelCase)) : (r = g.camelCase(e), i = e in s ? [e, r] : (i = r) in s ? [i] : i.match(L) || []), n = i.length;for (; n--;) {
                delete s[i[n]];
              }
            }
          }, hasData: function hasData(t) {
            return !g.isEmptyObject(this.cache[t[this.expando]] || {});
          }, discard: function discard(t) {
            t[this.expando] && delete this.cache[t[this.expando]];
          } };var P = new q(),
            B = new q(),
            F = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            M = /([A-Z])/g;function R(t, e, n) {
          var i;if (void 0 === n && 1 === t.nodeType) if (i = "data-" + e.replace(M, "-$1").toLowerCase(), "string" == typeof (n = t.getAttribute(i))) {
            try {
              n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : F.test(n) ? g.parseJSON(n) : n);
            } catch (t) {}B.set(t, e, n);
          } else n = void 0;return n;
        }g.extend({ hasData: function hasData(t) {
            return B.hasData(t) || P.hasData(t);
          }, data: function data(t, e, n) {
            return B.access(t, e, n);
          }, removeData: function removeData(t, e) {
            B.remove(t, e);
          }, _data: function _data(t, e, n) {
            return P.access(t, e, n);
          }, _removeData: function _removeData(t, e) {
            P.remove(t, e);
          } }), g.fn.extend({ data: function data(t, e) {
            var n,
                i,
                r,
                o = this[0],
                s = o && o.attributes;if (void 0 === t) {
              if (this.length && (r = B.get(o), 1 === o.nodeType && !P.get(o, "hasDataAttrs"))) {
                for (n = s.length; n--;) {
                  0 === (i = s[n].name).indexOf("data-") && (i = g.camelCase(i.slice(5)), R(o, i, r[i]));
                }P.set(o, "hasDataAttrs", !0);
              }return r;
            }return "object" === (void 0 === t ? "undefined" : l()(t)) ? this.each(function () {
              B.set(this, t);
            }) : H(this, function (e) {
              var n,
                  i = g.camelCase(t);if (o && void 0 === e) return void 0 !== (n = B.get(o, t)) ? n : void 0 !== (n = B.get(o, i)) ? n : void 0 !== (n = R(o, i, void 0)) ? n : void 0;this.each(function () {
                var n = B.get(this, i);B.set(this, i, e), -1 !== t.indexOf("-") && void 0 !== n && B.set(this, t, e);
              });
            }, null, e, arguments.length > 1, null, !0);
          }, removeData: function removeData(t) {
            return this.each(function () {
              B.remove(this, t);
            });
          } }), g.extend({ queue: function queue(t, e, n) {
            var i;if (t) return e = (e || "fx") + "queue", i = P.get(t, e), n && (!i || g.isArray(n) ? i = P.access(t, e, g.makeArray(n)) : i.push(n)), i || [];
          }, dequeue: function dequeue(t, e) {
            e = e || "fx";var n = g.queue(t, e),
                i = n.length,
                r = n.shift(),
                o = g._queueHooks(t, e);"inprogress" === r && (r = n.shift(), i--), r && ("fx" === e && n.unshift("inprogress"), delete o.stop, r.call(t, function () {
              g.dequeue(t, e);
            }, o)), !i && o && o.empty.fire();
          }, _queueHooks: function _queueHooks(t, e) {
            var n = e + "queueHooks";return P.get(t, n) || P.access(t, n, { empty: g.Callbacks("once memory").add(function () {
                P.remove(t, [e + "queue", n]);
              }) });
          } }), g.fn.extend({ queue: function queue(t, e) {
            var n = 2;return "string" != typeof t && (e = t, t = "fx", n--), arguments.length < n ? g.queue(this[0], t) : void 0 === e ? this : this.each(function () {
              var n = g.queue(this, t, e);g._queueHooks(this, t), "fx" === t && "inprogress" !== n[0] && g.dequeue(this, t);
            });
          }, dequeue: function dequeue(t) {
            return this.each(function () {
              g.dequeue(this, t);
            });
          }, clearQueue: function clearQueue(t) {
            return this.queue(t || "fx", []);
          }, promise: function promise(t, e) {
            var n,
                i = 1,
                r = g.Deferred(),
                o = this,
                s = this.length,
                a = function a() {
              --i || r.resolveWith(o, [o]);
            };for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; s--;) {
              (n = P.get(o[s], t + "queueHooks")) && n.empty && (i++, n.empty.add(a));
            }return a(), r.promise(e);
          } });var J,
            U = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            W = ["Top", "Right", "Bottom", "Left"],
            V = function V(t, e) {
          return t = e || t, "none" === g.css(t, "display") || !g.contains(t.ownerDocument, t);
        },
            z = /^(?:checkbox|radio)$/i;(J = v.createDocumentFragment().appendChild(v.createElement("div"))).innerHTML = "<input type='radio' checked='checked' name='t'/>", m.checkClone = J.cloneNode(!0).cloneNode(!0).lastChild.checked, J.innerHTML = "<textarea>x</textarea>", m.noCloneChecked = !!J.cloneNode(!0).lastChild.defaultValue;m.focusinBubbles = "onfocusin" in t;var G = /^key/,
            Y = /^(?:mouse|contextmenu)|click/,
            X = /^(?:focusinfocus|focusoutblur)$/,
            K = /^([^.]*)(?:\.(.+)|)$/;function Q() {
          return !0;
        }function Z() {
          return !1;
        }function tt() {
          try {
            return v.activeElement;
          } catch (t) {}
        }g.event = { global: {}, add: function add(t, e, n, i, r) {
            var o,
                s,
                a,
                c,
                u,
                f,
                d,
                p,
                h,
                m,
                v,
                y = P.get(t);if (y) for (n.handler && (n = (o = n).handler, r = o.selector), n.guid || (n.guid = g.guid++), (c = y.events) || (c = y.events = {}), (s = y.handle) || (s = y.handle = function (e) {
              return "undefined" !== (void 0 === g ? "undefined" : l()(g)) && g.event.triggered !== e.type ? g.event.dispatch.apply(t, arguments) : void 0;
            }), u = (e = (e || "").match(L) || [""]).length; u--;) {
              h = v = (a = K.exec(e[u]) || [])[1], m = (a[2] || "").split(".").sort(), h && (d = g.event.special[h] || {}, h = (r ? d.delegateType : d.bindType) || h, d = g.event.special[h] || {}, f = g.extend({ type: h, origType: v, data: i, handler: n, guid: n.guid, selector: r, needsContext: r && g.expr.match.needsContext.test(r), namespace: m.join(".") }, o), (p = c[h]) || ((p = c[h] = []).delegateCount = 0, d.setup && !1 !== d.setup.call(t, i, m, s) || t.addEventListener && t.addEventListener(h, s, !1)), d.add && (d.add.call(t, f), f.handler.guid || (f.handler.guid = n.guid)), r ? p.splice(p.delegateCount++, 0, f) : p.push(f), g.event.global[h] = !0);
            }
          }, remove: function remove(t, e, n, i, r) {
            var o,
                s,
                a,
                c,
                l,
                u,
                f,
                d,
                p,
                h,
                m,
                v = P.hasData(t) && P.get(t);if (v && (c = v.events)) {
              for (l = (e = (e || "").match(L) || [""]).length; l--;) {
                if (p = m = (a = K.exec(e[l]) || [])[1], h = (a[2] || "").split(".").sort(), p) {
                  for (f = g.event.special[p] || {}, d = c[p = (i ? f.delegateType : f.bindType) || p] || [], a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = d.length; o--;) {
                    u = d[o], !r && m !== u.origType || n && n.guid !== u.guid || a && !a.test(u.namespace) || i && i !== u.selector && ("**" !== i || !u.selector) || (d.splice(o, 1), u.selector && d.delegateCount--, f.remove && f.remove.call(t, u));
                  }s && !d.length && (f.teardown && !1 !== f.teardown.call(t, h, v.handle) || g.removeEvent(t, p, v.handle), delete c[p]);
                } else for (p in c) {
                  g.event.remove(t, p + e[l], n, i, !0);
                }
              }g.isEmptyObject(c) && (delete v.handle, P.remove(t, "events"));
            }
          }, trigger: function trigger(e, n, i, r) {
            var o,
                s,
                a,
                c,
                u,
                f,
                d,
                h = [i || v],
                m = p.call(e, "type") ? e.type : e,
                y = p.call(e, "namespace") ? e.namespace.split(".") : [];if (s = a = i = i || v, 3 !== i.nodeType && 8 !== i.nodeType && !X.test(m + g.event.triggered) && (m.indexOf(".") >= 0 && (m = (y = m.split(".")).shift(), y.sort()), u = m.indexOf(":") < 0 && "on" + m, (e = e[g.expando] ? e : new g.Event(m, "object" === (void 0 === e ? "undefined" : l()(e)) && e)).isTrigger = r ? 2 : 3, e.namespace = y.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + y.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = i), n = null == n ? [e] : g.makeArray(n, [e]), d = g.event.special[m] || {}, r || !d.trigger || !1 !== d.trigger.apply(i, n))) {
              if (!r && !d.noBubble && !g.isWindow(i)) {
                for (c = d.delegateType || m, X.test(c + m) || (s = s.parentNode); s; s = s.parentNode) {
                  h.push(s), a = s;
                }a === (i.ownerDocument || v) && h.push(a.defaultView || a.parentWindow || t);
              }for (o = 0; (s = h[o++]) && !e.isPropagationStopped();) {
                e.type = o > 1 ? c : d.bindType || m, (f = (P.get(s, "events") || {})[e.type] && P.get(s, "handle")) && f.apply(s, n), (f = u && s[u]) && f.apply && g.acceptData(s) && (e.result = f.apply(s, n), !1 === e.result && e.preventDefault());
              }return e.type = m, r || e.isDefaultPrevented() || d._default && !1 !== d._default.apply(h.pop(), n) || !g.acceptData(i) || u && g.isFunction(i[m]) && !g.isWindow(i) && ((a = i[u]) && (i[u] = null), g.event.triggered = m, i[m](), g.event.triggered = void 0, a && (i[u] = a)), e.result;
            }
          }, dispatch: function dispatch(t) {
            t = g.event.fix(t);var e,
                n,
                i,
                o,
                s,
                a,
                c = r.call(arguments),
                l = (P.get(this, "events") || {})[t.type] || [],
                u = g.event.special[t.type] || {};if (c[0] = t, t.delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, t)) {
              for (a = g.event.handlers.call(this, t, l), e = 0; (o = a[e++]) && !t.isPropagationStopped();) {
                for (t.currentTarget = o.elem, n = 0; (s = o.handlers[n++]) && !t.isImmediatePropagationStopped();) {
                  t.namespace_re && !t.namespace_re.test(s.namespace) || (t.handleObj = s, t.data = s.data, void 0 !== (i = ((g.event.special[s.origType] || {}).handle || s.handler).apply(o.elem, c)) && !1 === (t.result = i) && (t.preventDefault(), t.stopPropagation()));
                }
              }return u.postDispatch && u.postDispatch.call(this, t), t.result;
            }
          }, handlers: function handlers(t, e) {
            var n,
                i,
                r,
                o,
                s = [],
                a = e.delegateCount,
                c = t.target;if (a && c.nodeType && (!t.button || "click" !== t.type)) for (; c !== this; c = c.parentNode || this) {
              if (!0 !== c.disabled || "click" !== t.type) {
                for (i = [], n = 0; n < a; n++) {
                  void 0 === i[r = (o = e[n]).selector + " "] && (i[r] = o.needsContext ? g(r, this).index(c) >= 0 : g.find(r, this, null, [c]).length), i[r] && i.push(o);
                }i.length && s.push({ elem: c, handlers: i });
              }
            }return a < e.length && s.push({ elem: this, handlers: e.slice(a) }), s;
          }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: { props: "char charCode key keyCode".split(" "), filter: function filter(t, e) {
              return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t;
            } }, mouseHooks: { props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function filter(t, e) {
              var n,
                  i,
                  r,
                  o = e.button;return null == t.pageX && null != e.clientX && (i = (n = t.target.ownerDocument || v).documentElement, r = n.body, t.pageX = e.clientX + (i && i.scrollLeft || r && r.scrollLeft || 0) - (i && i.clientLeft || r && r.clientLeft || 0), t.pageY = e.clientY + (i && i.scrollTop || r && r.scrollTop || 0) - (i && i.clientTop || r && r.clientTop || 0)), t.which || void 0 === o || (t.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), t;
            } }, fix: function fix(t) {
            if (t[g.expando]) return t;var e,
                n,
                i,
                r = t.type,
                o = t,
                s = this.fixHooks[r];for (s || (this.fixHooks[r] = s = Y.test(r) ? this.mouseHooks : G.test(r) ? this.keyHooks : {}), i = s.props ? this.props.concat(s.props) : this.props, t = new g.Event(o), e = i.length; e--;) {
              t[n = i[e]] = o[n];
            }return t.target || (t.target = v), 3 === t.target.nodeType && (t.target = t.target.parentNode), s.filter ? s.filter(t, o) : t;
          }, special: { load: { noBubble: !0 }, focus: { trigger: function trigger() {
                if (this !== tt() && this.focus) return this.focus(), !1;
              }, delegateType: "focusin" }, blur: { trigger: function trigger() {
                if (this === tt() && this.blur) return this.blur(), !1;
              }, delegateType: "focusout" }, click: { trigger: function trigger() {
                if ("checkbox" === this.type && this.click && g.nodeName(this, "input")) return this.click(), !1;
              }, _default: function _default(t) {
                return g.nodeName(t.target, "a");
              } }, beforeunload: { postDispatch: function postDispatch(t) {
                void 0 !== t.result && (t.originalEvent.returnValue = t.result);
              } } }, simulate: function simulate(t, e, n, i) {
            var r = g.extend(new g.Event(), n, { type: t, isSimulated: !0, originalEvent: {} });i ? g.event.trigger(r, null, e) : g.event.dispatch.call(e, r), r.isDefaultPrevented() && n.preventDefault();
          } }, g.removeEvent = function (t, e, n) {
          t.removeEventListener && t.removeEventListener(e, n, !1);
        }, g.Event = function (t, e) {
          if (!(this instanceof g.Event)) return new g.Event(t, e);t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && t.getPreventDefault && t.getPreventDefault() ? Q : Z) : this.type = t, e && g.extend(this, e), this.timeStamp = t && t.timeStamp || g.now(), this[g.expando] = !0;
        }, g.Event.prototype = { isDefaultPrevented: Z, isPropagationStopped: Z, isImmediatePropagationStopped: Z, preventDefault: function preventDefault() {
            var t = this.originalEvent;this.isDefaultPrevented = Q, t && t.preventDefault && t.preventDefault();
          }, stopPropagation: function stopPropagation() {
            var t = this.originalEvent;this.isPropagationStopped = Q, t && t.stopPropagation && t.stopPropagation();
          }, stopImmediatePropagation: function stopImmediatePropagation() {
            this.isImmediatePropagationStopped = Q, this.stopPropagation();
          } }, g.each({ mouseenter: "mouseover", mouseleave: "mouseout" }, function (t, e) {
          g.event.special[t] = { delegateType: e, bindType: e, handle: function handle(t) {
              var n,
                  i = t.relatedTarget,
                  r = t.handleObj;return i && (i === this || g.contains(this, i)) || (t.type = r.origType, n = r.handler.apply(this, arguments), t.type = e), n;
            } };
        }), m.focusinBubbles || g.each({ focus: "focusin", blur: "focusout" }, function (t, e) {
          var n = function n(t) {
            g.event.simulate(e, t.target, g.event.fix(t), !0);
          };g.event.special[e] = { setup: function setup() {
              var i = this.ownerDocument || this,
                  r = P.access(i, e);r || i.addEventListener(t, n, !0), P.access(i, e, (r || 0) + 1);
            }, teardown: function teardown() {
              var i = this.ownerDocument || this,
                  r = P.access(i, e) - 1;r ? P.access(i, e, r) : (i.removeEventListener(t, n, !0), P.remove(i, e));
            } };
        }), g.fn.extend({ on: function on(t, e, n, i, r) {
            var o, s;if ("object" === (void 0 === t ? "undefined" : l()(t))) {
              for (s in "string" != typeof e && (n = n || e, e = void 0), t) {
                this.on(s, e, n, t[s], r);
              }return this;
            }if (null == n && null == i ? (i = e, n = e = void 0) : null == i && ("string" == typeof e ? (i = n, n = void 0) : (i = n, n = e, e = void 0)), !1 === i) i = Z;else if (!i) return this;return 1 === r && (o = i, (i = function i(t) {
              return g().off(t), o.apply(this, arguments);
            }).guid = o.guid || (o.guid = g.guid++)), this.each(function () {
              g.event.add(this, t, i, n, e);
            });
          }, one: function one(t, e, n, i) {
            return this.on(t, e, n, i, 1);
          }, off: function off(t, e, n) {
            var i, r;if (t && t.preventDefault && t.handleObj) return i = t.handleObj, g(t.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;if ("object" === (void 0 === t ? "undefined" : l()(t))) {
              for (r in t) {
                this.off(r, e, t[r]);
              }return this;
            }return !1 !== e && "function" != typeof e || (n = e, e = void 0), !1 === n && (n = Z), this.each(function () {
              g.event.remove(this, t, n, e);
            });
          }, trigger: function trigger(t, e) {
            return this.each(function () {
              g.event.trigger(t, e, this);
            });
          }, triggerHandler: function triggerHandler(t, e) {
            var n = this[0];if (n) return g.event.trigger(t, e, n, !0);
          } });var et = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            nt = /<([\w:]+)/,
            it = /<|&#?\w+;/,
            rt = /<(?:script|style|link)/i,
            ot = /checked\s*(?:[^=]|=\s*.checked.)/i,
            st = /^$|\/(?:java|ecma)script/i,
            at = /^true\/(.*)/,
            ct = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            lt = { option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };function ut(t, e) {
          return g.nodeName(t, "table") && g.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t;
        }function ft(t) {
          return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t;
        }function dt(t) {
          var e = at.exec(t.type);return e ? t.type = e[1] : t.removeAttribute("type"), t;
        }function pt(t, e) {
          for (var n = 0, i = t.length; n < i; n++) {
            P.set(t[n], "globalEval", !e || P.get(e[n], "globalEval"));
          }
        }function ht(t, e) {
          var n, i, r, o, s, a, c, l;if (1 === e.nodeType) {
            if (P.hasData(t) && (o = P.access(t), s = P.set(e, o), l = o.events)) for (r in delete s.handle, s.events = {}, l) {
              for (n = 0, i = l[r].length; n < i; n++) {
                g.event.add(e, r, l[r][n]);
              }
            }B.hasData(t) && (a = B.access(t), c = g.extend({}, a), B.set(e, c));
          }
        }function mt(t, e) {
          var n = t.getElementsByTagName ? t.getElementsByTagName(e || "*") : t.querySelectorAll ? t.querySelectorAll(e || "*") : [];return void 0 === e || e && g.nodeName(t, e) ? g.merge([t], n) : n;
        }lt.optgroup = lt.option, lt.tbody = lt.tfoot = lt.colgroup = lt.caption = lt.thead, lt.th = lt.td, g.extend({ clone: function clone(t, e, n) {
            var i,
                r,
                o,
                s,
                a,
                c,
                l,
                u = t.cloneNode(!0),
                f = g.contains(t.ownerDocument, t);if (!(m.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || g.isXMLDoc(t))) for (s = mt(u), i = 0, r = (o = mt(t)).length; i < r; i++) {
              a = o[i], c = s[i], void 0, "input" === (l = c.nodeName.toLowerCase()) && z.test(a.type) ? c.checked = a.checked : "input" !== l && "textarea" !== l || (c.defaultValue = a.defaultValue);
            }if (e) if (n) for (o = o || mt(t), s = s || mt(u), i = 0, r = o.length; i < r; i++) {
              ht(o[i], s[i]);
            } else ht(t, u);return (s = mt(u, "script")).length > 0 && pt(s, !f && mt(t, "script")), u;
          }, buildFragment: function buildFragment(t, e, n, i) {
            for (var r, o, s, a, c, l, u = e.createDocumentFragment(), f = [], d = 0, p = t.length; d < p; d++) {
              if ((r = t[d]) || 0 === r) if ("object" === g.type(r)) g.merge(f, r.nodeType ? [r] : r);else if (it.test(r)) {
                for (o = o || u.appendChild(e.createElement("div")), s = (nt.exec(r) || ["", ""])[1].toLowerCase(), a = lt[s] || lt._default, o.innerHTML = a[1] + r.replace(et, "<$1></$2>") + a[2], l = a[0]; l--;) {
                  o = o.lastChild;
                }g.merge(f, o.childNodes), (o = u.firstChild).textContent = "";
              } else f.push(e.createTextNode(r));
            }for (u.textContent = "", d = 0; r = f[d++];) {
              if ((!i || -1 === g.inArray(r, i)) && (c = g.contains(r.ownerDocument, r), o = mt(u.appendChild(r), "script"), c && pt(o), n)) for (l = 0; r = o[l++];) {
                st.test(r.type || "") && n.push(r);
              }
            }return u;
          }, cleanData: function cleanData(t) {
            for (var e, n, i, r, s, a, c = g.event.special, l = 0; void 0 !== (n = t[l]); l++) {
              if (g.acceptData(n) && (s = n[P.expando]) && (e = P.cache[s])) {
                if ((i = o()(e.events || {})).length) for (a = 0; void 0 !== (r = i[a]); a++) {
                  c[r] ? g.event.remove(n, r) : g.removeEvent(n, r, e.handle);
                }P.cache[s] && delete P.cache[s];
              }delete B.cache[n[B.expando]];
            }
          } }), g.fn.extend({ text: function text(t) {
            return H(this, function (t) {
              return void 0 === t ? g.text(this) : this.empty().each(function () {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = t);
              });
            }, null, t, arguments.length);
          }, append: function append() {
            return this.domManip(arguments, function (t) {
              1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || ut(this, t).appendChild(t);
            });
          }, prepend: function prepend() {
            return this.domManip(arguments, function (t) {
              if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                var e = ut(this, t);e.insertBefore(t, e.firstChild);
              }
            });
          }, before: function before() {
            return this.domManip(arguments, function (t) {
              this.parentNode && this.parentNode.insertBefore(t, this);
            });
          }, after: function after() {
            return this.domManip(arguments, function (t) {
              this.parentNode && this.parentNode.insertBefore(t, this.nextSibling);
            });
          }, remove: function remove(t, e) {
            for (var n, i = t ? g.filter(t, this) : this, r = 0; null != (n = i[r]); r++) {
              e || 1 !== n.nodeType || g.cleanData(mt(n)), n.parentNode && (e && g.contains(n.ownerDocument, n) && pt(mt(n, "script")), n.parentNode.removeChild(n));
            }return this;
          }, empty: function empty() {
            for (var t, e = 0; null != (t = this[e]); e++) {
              1 === t.nodeType && (g.cleanData(mt(t, !1)), t.textContent = "");
            }return this;
          }, clone: function clone(t, e) {
            return t = null != t && t, e = null == e ? t : e, this.map(function () {
              return g.clone(this, t, e);
            });
          }, html: function html(t) {
            return H(this, function (t) {
              var e = this[0] || {},
                  n = 0,
                  i = this.length;if (void 0 === t && 1 === e.nodeType) return e.innerHTML;if ("string" == typeof t && !rt.test(t) && !lt[(nt.exec(t) || ["", ""])[1].toLowerCase()]) {
                t = t.replace(et, "<$1></$2>");try {
                  for (; n < i; n++) {
                    1 === (e = this[n] || {}).nodeType && (g.cleanData(mt(e, !1)), e.innerHTML = t);
                  }e = 0;
                } catch (t) {}
              }e && this.empty().append(t);
            }, null, t, arguments.length);
          }, replaceWith: function replaceWith() {
            var t = arguments[0];return this.domManip(arguments, function (e) {
              t = this.parentNode, g.cleanData(mt(this)), t && t.replaceChild(e, this);
            }), t && (t.length || t.nodeType) ? this : this.remove();
          }, detach: function detach(t) {
            return this.remove(t, !0);
          }, domManip: function domManip(t, e) {
            t = s.apply([], t);var n,
                i,
                r,
                o,
                a,
                c,
                l = 0,
                u = this.length,
                f = this,
                d = u - 1,
                p = t[0],
                h = g.isFunction(p);if (h || u > 1 && "string" == typeof p && !m.checkClone && ot.test(p)) return this.each(function (n) {
              var i = f.eq(n);h && (t[0] = p.call(this, n, i.html())), i.domManip(t, e);
            });if (u && (i = (n = g.buildFragment(t, this[0].ownerDocument, !1, this)).firstChild, 1 === n.childNodes.length && (n = i), i)) {
              for (o = (r = g.map(mt(n, "script"), ft)).length; l < u; l++) {
                a = n, l !== d && (a = g.clone(a, !0, !0), o && g.merge(r, mt(a, "script"))), e.call(this[l], a, l);
              }if (o) for (c = r[r.length - 1].ownerDocument, g.map(r, dt), l = 0; l < o; l++) {
                a = r[l], st.test(a.type || "") && !P.access(a, "globalEval") && g.contains(c, a) && (a.src ? g._evalUrl && g._evalUrl(a.src) : g.globalEval(a.textContent.replace(ct, "")));
              }
            }return this;
          } }), g.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (t, e) {
          g.fn[t] = function (t) {
            for (var n, i = [], r = g(t), o = r.length - 1, s = 0; s <= o; s++) {
              n = s === o ? this : this.clone(!0), g(r[s])[e](n), c.apply(i, n.get());
            }return this.pushStack(i);
          };
        });var vt,
            gt = {};function yt(e, n) {
          var i = g(n.createElement(e)).appendTo(n.body),
              r = t.getDefaultComputedStyle ? t.getDefaultComputedStyle(i[0]).display : g.css(i[0], "display");return i.detach(), r;
        }function bt(t) {
          var e = v,
              n = gt[t];return n || ("none" !== (n = yt(t, e)) && n || ((e = (vt = (vt || g("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement))[0].contentDocument).write(), e.close(), n = yt(t, e), vt.detach()), gt[t] = n), n;
        }var xt = /^margin/,
            wt = new RegExp("^(" + U + ")(?!px)[a-z%]+$", "i"),
            At = function At(t) {
          return t.ownerDocument.defaultView.getComputedStyle(t, null);
        };function Ct(t, e, n) {
          var i,
              r,
              o,
              s,
              a = t.style;return (n = n || At(t)) && (s = n.getPropertyValue(e) || n[e]), n && ("" !== s || g.contains(t.ownerDocument, t) || (s = g.style(t, e)), wt.test(s) && xt.test(e) && (i = a.width, r = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = i, a.minWidth = r, a.maxWidth = o)), void 0 !== s ? s + "" : s;
        }function _t(t, e) {
          return { get: function get() {
              if (!t()) return (this.get = e).apply(this, arguments);delete this.get;
            } };
        }!function () {
          var e,
              n,
              i = v.documentElement,
              r = v.createElement("div"),
              o = v.createElement("div");function s() {
            o.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", i.appendChild(r);var s = t.getComputedStyle(o, null);e = "1%" !== s.top, n = "4px" === s.width, i.removeChild(r);
          }o.style.backgroundClip = "content-box", o.cloneNode(!0).style.backgroundClip = "", m.clearCloneStyle = "content-box" === o.style.backgroundClip, r.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", r.appendChild(o), t.getComputedStyle && g.extend(m, { pixelPosition: function pixelPosition() {
              return s(), e;
            }, boxSizingReliable: function boxSizingReliable() {
              return null == n && s(), n;
            }, reliableMarginRight: function reliableMarginRight() {
              var e,
                  n = o.appendChild(v.createElement("div"));return n.style.cssText = o.style.cssText = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box", n.style.marginRight = n.style.width = "0", o.style.width = "1px", i.appendChild(r), e = !parseFloat(t.getComputedStyle(n, null).marginRight), i.removeChild(r), o.innerHTML = "", e;
            } });
        }(), g.swap = function (t, e, n, i) {
          var r,
              o,
              s = {};for (o in e) {
            s[o] = t.style[o], t.style[o] = e[o];
          }for (o in r = n.apply(t, i || []), e) {
            t.style[o] = s[o];
          }return r;
        };var Tt = /^(none|table(?!-c[ea]).+)/,
            kt = new RegExp("^(" + U + ")(.*)$", "i"),
            St = new RegExp("^([+-])=(" + U + ")", "i"),
            Nt = { position: "absolute", visibility: "hidden", display: "block" },
            Et = { letterSpacing: 0, fontWeight: 400 },
            Dt = ["Webkit", "O", "Moz", "ms"];function It(t, e) {
          if (e in t) return e;for (var n = e[0].toUpperCase() + e.slice(1), i = e, r = Dt.length; r--;) {
            if ((e = Dt[r] + n) in t) return e;
          }return i;
        }function jt(t, e, n) {
          var i = kt.exec(e);return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : e;
        }function Lt(t, e, n, i, r) {
          for (var o = n === (i ? "border" : "content") ? 4 : "width" === e ? 1 : 0, s = 0; o < 4; o += 2) {
            "margin" === n && (s += g.css(t, n + W[o], !0, r)), i ? ("content" === n && (s -= g.css(t, "padding" + W[o], !0, r)), "margin" !== n && (s -= g.css(t, "border" + W[o] + "Width", !0, r))) : (s += g.css(t, "padding" + W[o], !0, r), "padding" !== n && (s += g.css(t, "border" + W[o] + "Width", !0, r)));
          }return s;
        }function $t(t, e, n) {
          var i = !0,
              r = "width" === e ? t.offsetWidth : t.offsetHeight,
              o = At(t),
              s = "border-box" === g.css(t, "boxSizing", !1, o);if (r <= 0 || null == r) {
            if (((r = Ct(t, e, o)) < 0 || null == r) && (r = t.style[e]), wt.test(r)) return r;i = s && (m.boxSizingReliable() || r === t.style[e]), r = parseFloat(r) || 0;
          }return r + Lt(t, e, n || (s ? "border" : "content"), i, o) + "px";
        }function Ot(t, e) {
          for (var n, i, r, o = [], s = 0, a = t.length; s < a; s++) {
            (i = t[s]).style && (o[s] = P.get(i, "olddisplay"), n = i.style.display, e ? (o[s] || "none" !== n || (i.style.display = ""), "" === i.style.display && V(i) && (o[s] = P.access(i, "olddisplay", bt(i.nodeName)))) : o[s] || (r = V(i), (n && "none" !== n || !r) && P.set(i, "olddisplay", r ? n : g.css(i, "display"))));
          }for (s = 0; s < a; s++) {
            (i = t[s]).style && (e && "none" !== i.style.display && "" !== i.style.display || (i.style.display = e ? o[s] || "" : "none"));
          }return t;
        }function Ht(t, e, n, i, r) {
          return new Ht.prototype.init(t, e, n, i, r);
        }g.extend({ cssHooks: { opacity: { get: function get(t, e) {
                if (e) {
                  var n = Ct(t, "opacity");return "" === n ? "1" : n;
                }
              } } }, cssNumber: { columnCount: !0, fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { float: "cssFloat" }, style: function style(t, e, n, i) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
              var r,
                  o,
                  s,
                  a = g.camelCase(e),
                  c = t.style;if (e = g.cssProps[a] || (g.cssProps[a] = It(c, a)), s = g.cssHooks[e] || g.cssHooks[a], void 0 === n) return s && "get" in s && void 0 !== (r = s.get(t, !1, i)) ? r : c[e];"string" === (o = void 0 === n ? "undefined" : l()(n)) && (r = St.exec(n)) && (n = (r[1] + 1) * r[2] + parseFloat(g.css(t, e)), o = "number"), null != n && n == n && ("number" !== o || g.cssNumber[a] || (n += "px"), m.clearCloneStyle || "" !== n || 0 !== e.indexOf("background") || (c[e] = "inherit"), s && "set" in s && void 0 === (n = s.set(t, n, i)) || (c[e] = "", c[e] = n));
            }
          }, css: function css(t, e, n, i) {
            var r,
                o,
                s,
                a = g.camelCase(e);return e = g.cssProps[a] || (g.cssProps[a] = It(t.style, a)), (s = g.cssHooks[e] || g.cssHooks[a]) && "get" in s && (r = s.get(t, !0, n)), void 0 === r && (r = Ct(t, e, i)), "normal" === r && e in Et && (r = Et[e]), "" === n || n ? (o = parseFloat(r), !0 === n || g.isNumeric(o) ? o || 0 : r) : r;
          } }), g.each(["height", "width"], function (t, e) {
          g.cssHooks[e] = { get: function get(t, n, i) {
              if (n) return 0 === t.offsetWidth && Tt.test(g.css(t, "display")) ? g.swap(t, Nt, function () {
                return $t(t, e, i);
              }) : $t(t, e, i);
            }, set: function set(t, n, i) {
              var r = i && At(t);return jt(0, n, i ? Lt(t, e, i, "border-box" === g.css(t, "boxSizing", !1, r), r) : 0);
            } };
        }), g.cssHooks.marginRight = _t(m.reliableMarginRight, function (t, e) {
          if (e) return g.swap(t, { display: "inline-block" }, Ct, [t, "marginRight"]);
        }), g.each({ margin: "", padding: "", border: "Width" }, function (t, e) {
          g.cssHooks[t + e] = { expand: function expand(n) {
              for (var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++) {
                r[t + W[i] + e] = o[i] || o[i - 2] || o[0];
              }return r;
            } }, xt.test(t) || (g.cssHooks[t + e].set = jt);
        }), g.fn.extend({ css: function css(t, e) {
            return H(this, function (t, e, n) {
              var i,
                  r,
                  o = {},
                  s = 0;if (g.isArray(e)) {
                for (i = At(t), r = e.length; s < r; s++) {
                  o[e[s]] = g.css(t, e[s], !1, i);
                }return o;
              }return void 0 !== n ? g.style(t, e, n) : g.css(t, e);
            }, t, e, arguments.length > 1);
          }, show: function show() {
            return Ot(this, !0);
          }, hide: function hide() {
            return Ot(this);
          }, toggle: function toggle(t) {
            return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function () {
              V(this) ? g(this).show() : g(this).hide();
            });
          } }), g.Tween = Ht, Ht.prototype = { constructor: Ht, init: function init(t, e, n, i, r, o) {
            this.elem = t, this.prop = n, this.easing = r || "swing", this.options = e, this.start = this.now = this.cur(), this.end = i, this.unit = o || (g.cssNumber[n] ? "" : "px");
          }, cur: function cur() {
            var t = Ht.propHooks[this.prop];return t && t.get ? t.get(this) : Ht.propHooks._default.get(this);
          }, run: function run(t) {
            var e,
                n = Ht.propHooks[this.prop];return this.options.duration ? this.pos = e = g.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Ht.propHooks._default.set(this), this;
          } }, Ht.prototype.init.prototype = Ht.prototype, Ht.propHooks = { _default: { get: function get(t) {
              var e;return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = g.css(t.elem, t.prop, "")) && "auto" !== e ? e : 0 : t.elem[t.prop];
            }, set: function set(t) {
              g.fx.step[t.prop] ? g.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[g.cssProps[t.prop]] || g.cssHooks[t.prop]) ? g.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now;
            } } }, Ht.propHooks.scrollTop = Ht.propHooks.scrollLeft = { set: function set(t) {
            t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now);
          } }, g.easing = { linear: function linear(t) {
            return t;
          }, swing: function swing(t) {
            return .5 - Math.cos(t * Math.PI) / 2;
          } }, g.fx = Ht.prototype.init, g.fx.step = {};var qt,
            Pt,
            Bt,
            Ft,
            Mt,
            Rt = /^(?:toggle|show|hide)$/,
            Jt = new RegExp("^(?:([+-])=|)(" + U + ")([a-z%]*)$", "i"),
            Ut = /queueHooks$/,
            Wt = [function (t, e, n) {
          var i,
              r,
              o,
              s,
              a,
              c,
              l,
              u = this,
              f = {},
              d = t.style,
              p = t.nodeType && V(t),
              h = P.get(t, "fxshow");n.queue || (null == (a = g._queueHooks(t, "fx")).unqueued && (a.unqueued = 0, c = a.empty.fire, a.empty.fire = function () {
            a.unqueued || c();
          }), a.unqueued++, u.always(function () {
            u.always(function () {
              a.unqueued--, g.queue(t, "fx").length || a.empty.fire();
            });
          }));1 === t.nodeType && ("height" in e || "width" in e) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], "none" === (l = g.css(t, "display")) && (l = bt(t.nodeName)), "inline" === l && "none" === g.css(t, "float") && (d.display = "inline-block"));n.overflow && (d.overflow = "hidden", u.always(function () {
            d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2];
          }));for (i in e) {
            if (r = e[i], Rt.exec(r)) {
              if (delete e[i], o = o || "toggle" === r, r === (p ? "hide" : "show")) {
                if ("show" !== r || !h || void 0 === h[i]) continue;p = !0;
              }f[i] = h && h[i] || g.style(t, i);
            }
          }if (!g.isEmptyObject(f)) for (i in h ? "hidden" in h && (p = h.hidden) : h = P.access(t, "fxshow", {}), o && (h.hidden = !p), p ? g(t).show() : u.done(function () {
            g(t).hide();
          }), u.done(function () {
            var e;for (e in P.remove(t, "fxshow"), f) {
              g.style(t, e, f[e]);
            }
          }), f) {
            s = Yt(p ? h[i] : 0, i, u), i in h || (h[i] = s.start, p && (s.end = s.start, s.start = "width" === i || "height" === i ? 1 : 0));
          }
        }],
            Vt = { "*": [function (t, e) {
            var n = this.createTween(t, e),
                i = n.cur(),
                r = Jt.exec(e),
                o = r && r[3] || (g.cssNumber[t] ? "" : "px"),
                s = (g.cssNumber[t] || "px" !== o && +i) && Jt.exec(g.css(n.elem, t)),
                a = 1,
                c = 20;if (s && s[3] !== o) {
              o = o || s[3], r = r || [], s = +i || 1;do {
                s /= a = a || ".5", g.style(n.elem, t, s + o);
              } while (a !== (a = n.cur() / i) && 1 !== a && --c);
            }return r && (s = n.start = +s || +i || 0, n.unit = o, n.end = r[1] ? s + (r[1] + 1) * r[2] : +r[2]), n;
          }] };function zt() {
          return setTimeout(function () {
            qt = void 0;
          }), qt = g.now();
        }function Gt(t, e) {
          var n,
              i = 0,
              r = { height: t };for (e = e ? 1 : 0; i < 4; i += 2 - e) {
            r["margin" + (n = W[i])] = r["padding" + n] = t;
          }return e && (r.opacity = r.width = t), r;
        }function Yt(t, e, n) {
          for (var i, r = (Vt[e] || []).concat(Vt["*"]), o = 0, s = r.length; o < s; o++) {
            if (i = r[o].call(n, e, t)) return i;
          }
        }function Xt(t, e, n) {
          var i,
              r,
              o = 0,
              s = Wt.length,
              a = g.Deferred().always(function () {
            delete c.elem;
          }),
              c = function c() {
            if (r) return !1;for (var e = qt || zt(), n = Math.max(0, l.startTime + l.duration - e), i = 1 - (n / l.duration || 0), o = 0, s = l.tweens.length; o < s; o++) {
              l.tweens[o].run(i);
            }return a.notifyWith(t, [l, i, n]), i < 1 && s ? n : (a.resolveWith(t, [l]), !1);
          },
              l = a.promise({ elem: t, props: g.extend({}, e), opts: g.extend(!0, { specialEasing: {} }, n), originalProperties: e, originalOptions: n, startTime: qt || zt(), duration: n.duration, tweens: [], createTween: function createTween(e, n) {
              var i = g.Tween(t, l.opts, e, n, l.opts.specialEasing[e] || l.opts.easing);return l.tweens.push(i), i;
            }, stop: function stop(e) {
              var n = 0,
                  i = e ? l.tweens.length : 0;if (r) return this;for (r = !0; n < i; n++) {
                l.tweens[n].run(1);
              }return e ? a.resolveWith(t, [l, e]) : a.rejectWith(t, [l, e]), this;
            } }),
              u = l.props;for (!function (t, e) {
            var n, i, r, o, s;for (n in t) {
              if (r = e[i = g.camelCase(n)], o = t[n], g.isArray(o) && (r = o[1], o = t[n] = o[0]), n !== i && (t[i] = o, delete t[n]), (s = g.cssHooks[i]) && ("expand" in s)) for (n in o = s.expand(o), delete t[i], o) {
                (n in t) || (t[n] = o[n], e[n] = r);
              } else e[i] = r;
            }
          }(u, l.opts.specialEasing); o < s; o++) {
            if (i = Wt[o].call(l, t, u, l.opts)) return i;
          }return g.map(u, Yt, l), g.isFunction(l.opts.start) && l.opts.start.call(t, l), g.fx.timer(g.extend(c, { elem: t, anim: l, queue: l.opts.queue })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always);
        }g.Animation = g.extend(Xt, { tweener: function tweener(t, e) {
            g.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");for (var n, i = 0, r = t.length; i < r; i++) {
              n = t[i], Vt[n] = Vt[n] || [], Vt[n].unshift(e);
            }
          }, prefilter: function prefilter(t, e) {
            e ? Wt.unshift(t) : Wt.push(t);
          } }), g.speed = function (t, e, n) {
          var i = t && "object" === (void 0 === t ? "undefined" : l()(t)) ? g.extend({}, t) : { complete: n || !n && e || g.isFunction(t) && t, duration: t, easing: n && e || e && !g.isFunction(e) && e };return i.duration = g.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in g.fx.speeds ? g.fx.speeds[i.duration] : g.fx.speeds._default, null != i.queue && !0 !== i.queue || (i.queue = "fx"), i.old = i.complete, i.complete = function () {
            g.isFunction(i.old) && i.old.call(this), i.queue && g.dequeue(this, i.queue);
          }, i;
        }, g.fn.extend({ fadeTo: function fadeTo(t, e, n, i) {
            return this.filter(V).css("opacity", 0).show().end().animate({ opacity: e }, t, n, i);
          }, animate: function animate(t, e, n, i) {
            var r = g.isEmptyObject(t),
                o = g.speed(e, n, i),
                s = function s() {
              var e = Xt(this, g.extend({}, t), o);(r || P.get(this, "finish")) && e.stop(!0);
            };return s.finish = s, r || !1 === o.queue ? this.each(s) : this.queue(o.queue, s);
          }, stop: function stop(t, e, n) {
            var i = function i(t) {
              var e = t.stop;delete t.stop, e(n);
            };return "string" != typeof t && (n = e, e = t, t = void 0), e && !1 !== t && this.queue(t || "fx", []), this.each(function () {
              var e = !0,
                  r = null != t && t + "queueHooks",
                  o = g.timers,
                  s = P.get(this);if (r) s[r] && s[r].stop && i(s[r]);else for (r in s) {
                s[r] && s[r].stop && Ut.test(r) && i(s[r]);
              }for (r = o.length; r--;) {
                o[r].elem !== this || null != t && o[r].queue !== t || (o[r].anim.stop(n), e = !1, o.splice(r, 1));
              }!e && n || g.dequeue(this, t);
            });
          }, finish: function finish(t) {
            return !1 !== t && (t = t || "fx"), this.each(function () {
              var e,
                  n = P.get(this),
                  i = n[t + "queue"],
                  r = n[t + "queueHooks"],
                  o = g.timers,
                  s = i ? i.length : 0;for (n.finish = !0, g.queue(this, t, []), r && r.stop && r.stop.call(this, !0), e = o.length; e--;) {
                o[e].elem === this && o[e].queue === t && (o[e].anim.stop(!0), o.splice(e, 1));
              }for (e = 0; e < s; e++) {
                i[e] && i[e].finish && i[e].finish.call(this);
              }delete n.finish;
            });
          } }), g.each(["toggle", "show", "hide"], function (t, e) {
          var n = g.fn[e];g.fn[e] = function (t, i, r) {
            return null == t || "boolean" == typeof t ? n.apply(this, arguments) : this.animate(Gt(e, !0), t, i, r);
          };
        }), g.each({ slideDown: Gt("show"), slideUp: Gt("hide"), slideToggle: Gt("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (t, e) {
          g.fn[t] = function (t, n, i) {
            return this.animate(e, t, n, i);
          };
        }), g.timers = [], g.fx.tick = function () {
          var t,
              e = 0,
              n = g.timers;for (qt = g.now(); e < n.length; e++) {
            (t = n[e])() || n[e] !== t || n.splice(e--, 1);
          }n.length || g.fx.stop(), qt = void 0;
        }, g.fx.timer = function (t) {
          g.timers.push(t), t() ? g.fx.start() : g.timers.pop();
        }, g.fx.interval = 13, g.fx.start = function () {
          Pt || (Pt = setInterval(g.fx.tick, g.fx.interval));
        }, g.fx.stop = function () {
          clearInterval(Pt), Pt = null;
        }, g.fx.speeds = { slow: 600, fast: 200, _default: 400 }, g.fn.delay = function (t, e) {
          return t = g.fx && g.fx.speeds[t] || t, e = e || "fx", this.queue(e, function (e, n) {
            var i = setTimeout(e, t);n.stop = function () {
              clearTimeout(i);
            };
          });
        }, Bt = v.createElement("input"), Ft = v.createElement("select"), Mt = Ft.appendChild(v.createElement("option")), Bt.type = "checkbox", m.checkOn = "" !== Bt.value, m.optSelected = Mt.selected, Ft.disabled = !0, m.optDisabled = !Mt.disabled, (Bt = v.createElement("input")).value = "t", Bt.type = "radio", m.radioValue = "t" === Bt.value;var Kt,
            Qt = g.expr.attrHandle;g.fn.extend({ attr: function attr(t, e) {
            return H(this, g.attr, t, e, arguments.length > 1);
          }, removeAttr: function removeAttr(t) {
            return this.each(function () {
              g.removeAttr(this, t);
            });
          } }), g.extend({ attr: function attr(t, e, n) {
            var i,
                r,
                o = t.nodeType;if (t && 3 !== o && 8 !== o && 2 !== o) return "undefined" === l()(t.getAttribute) ? g.prop(t, e, n) : (1 === o && g.isXMLDoc(t) || (e = e.toLowerCase(), i = g.attrHooks[e] || (g.expr.match.bool.test(e) ? Kt : void 0)), void 0 === n ? i && "get" in i && null !== (r = i.get(t, e)) ? r : null == (r = g.find.attr(t, e)) ? void 0 : r : null !== n ? i && "set" in i && void 0 !== (r = i.set(t, n, e)) ? r : (t.setAttribute(e, n + ""), n) : void g.removeAttr(t, e));
          }, removeAttr: function removeAttr(t, e) {
            var n,
                i,
                r = 0,
                o = e && e.match(L);if (o && 1 === t.nodeType) for (; n = o[r++];) {
              i = g.propFix[n] || n, g.expr.match.bool.test(n) && (t[i] = !1), t.removeAttribute(n);
            }
          }, attrHooks: { type: { set: function set(t, e) {
                if (!m.radioValue && "radio" === e && g.nodeName(t, "input")) {
                  var n = t.value;return t.setAttribute("type", e), n && (t.value = n), e;
                }
              } } } }), Kt = { set: function set(t, e, n) {
            return !1 === e ? g.removeAttr(t, n) : t.setAttribute(n, n), n;
          } }, g.each(g.expr.match.bool.source.match(/\w+/g), function (t, e) {
          var n = Qt[e] || g.find.attr;Qt[e] = function (t, e, i) {
            var r, o;return i || (o = Qt[e], Qt[e] = r, r = null != n(t, e, i) ? e.toLowerCase() : null, Qt[e] = o), r;
          };
        });var Zt = /^(?:input|select|textarea|button)$/i;g.fn.extend({ prop: function prop(t, e) {
            return H(this, g.prop, t, e, arguments.length > 1);
          }, removeProp: function removeProp(t) {
            return this.each(function () {
              delete this[g.propFix[t] || t];
            });
          } }), g.extend({ propFix: { for: "htmlFor", class: "className" }, prop: function prop(t, e, n) {
            var i,
                r,
                o = t.nodeType;if (t && 3 !== o && 8 !== o && 2 !== o) return (1 !== o || !g.isXMLDoc(t)) && (e = g.propFix[e] || e, r = g.propHooks[e]), void 0 !== n ? r && "set" in r && void 0 !== (i = r.set(t, n, e)) ? i : t[e] = n : r && "get" in r && null !== (i = r.get(t, e)) ? i : t[e];
          }, propHooks: { tabIndex: { get: function get(t) {
                return t.hasAttribute("tabindex") || Zt.test(t.nodeName) || t.href ? t.tabIndex : -1;
              } } } }), m.optSelected || (g.propHooks.selected = { get: function get(t) {
            var e = t.parentNode;return e && e.parentNode && e.parentNode.selectedIndex, null;
          } }), g.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
          g.propFix[this.toLowerCase()] = this;
        });var te = /[\t\r\n\f]/g;g.fn.extend({ addClass: function addClass(t) {
            var e,
                n,
                i,
                r,
                o,
                s,
                a = "string" == typeof t && t,
                c = 0,
                l = this.length;if (g.isFunction(t)) return this.each(function (e) {
              g(this).addClass(t.call(this, e, this.className));
            });if (a) for (e = (t || "").match(L) || []; c < l; c++) {
              if (i = 1 === (n = this[c]).nodeType && (n.className ? (" " + n.className + " ").replace(te, " ") : " ")) {
                for (o = 0; r = e[o++];) {
                  i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                }s = g.trim(i), n.className !== s && (n.className = s);
              }
            }return this;
          }, removeClass: function removeClass(t) {
            var e,
                n,
                i,
                r,
                o,
                s,
                a = 0 === arguments.length || "string" == typeof t && t,
                c = 0,
                l = this.length;if (g.isFunction(t)) return this.each(function (e) {
              g(this).removeClass(t.call(this, e, this.className));
            });if (a) for (e = (t || "").match(L) || []; c < l; c++) {
              if (i = 1 === (n = this[c]).nodeType && (n.className ? (" " + n.className + " ").replace(te, " ") : "")) {
                for (o = 0; r = e[o++];) {
                  for (; i.indexOf(" " + r + " ") >= 0;) {
                    i = i.replace(" " + r + " ", " ");
                  }
                }s = t ? g.trim(i) : "", n.className !== s && (n.className = s);
              }
            }return this;
          }, toggleClass: function toggleClass(t, e) {
            var n = void 0 === t ? "undefined" : l()(t);return "boolean" == typeof e && "string" === n ? e ? this.addClass(t) : this.removeClass(t) : g.isFunction(t) ? this.each(function (n) {
              g(this).toggleClass(t.call(this, n, this.className, e), e);
            }) : this.each(function () {
              if ("string" === n) for (var e, i = 0, r = g(this), o = t.match(L) || []; e = o[i++];) {
                r.hasClass(e) ? r.removeClass(e) : r.addClass(e);
              } else "undefined" !== n && "boolean" !== n || (this.className && P.set(this, "__className__", this.className), this.className = this.className || !1 === t ? "" : P.get(this, "__className__") || "");
            });
          }, hasClass: function hasClass(t) {
            for (var e = " " + t + " ", n = 0, i = this.length; n < i; n++) {
              if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(te, " ").indexOf(e) >= 0) return !0;
            }return !1;
          } });var ee = /\r/g;g.fn.extend({ val: function val(t) {
            var e,
                n,
                i,
                r = this[0];return arguments.length ? (i = g.isFunction(t), this.each(function (n) {
              var r;1 === this.nodeType && (null == (r = i ? t.call(this, n, g(this).val()) : t) ? r = "" : "number" == typeof r ? r += "" : g.isArray(r) && (r = g.map(r, function (t) {
                return null == t ? "" : t + "";
              })), (e = g.valHooks[this.type] || g.valHooks[this.nodeName.toLowerCase()]) && "set" in e && void 0 !== e.set(this, r, "value") || (this.value = r));
            })) : r ? (e = g.valHooks[r.type] || g.valHooks[r.nodeName.toLowerCase()]) && "get" in e && void 0 !== (n = e.get(r, "value")) ? n : "string" == typeof (n = r.value) ? n.replace(ee, "") : null == n ? "" : n : void 0;
          } }), g.extend({ valHooks: { select: { get: function get(t) {
                for (var e, n, i = t.options, r = t.selectedIndex, o = "select-one" === t.type || r < 0, s = o ? null : [], a = o ? r + 1 : i.length, c = r < 0 ? a : o ? r : 0; c < a; c++) {
                  if (((n = i[c]).selected || c === r) && (m.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !g.nodeName(n.parentNode, "optgroup"))) {
                    if (e = g(n).val(), o) return e;s.push(e);
                  }
                }return s;
              }, set: function set(t, e) {
                for (var n, i, r = t.options, o = g.makeArray(e), s = r.length; s--;) {
                  ((i = r[s]).selected = g.inArray(g(i).val(), o) >= 0) && (n = !0);
                }return n || (t.selectedIndex = -1), o;
              } } } }), g.each(["radio", "checkbox"], function () {
          g.valHooks[this] = { set: function set(t, e) {
              if (g.isArray(e)) return t.checked = g.inArray(g(t).val(), e) >= 0;
            } }, m.checkOn || (g.valHooks[this].get = function (t) {
            return null === t.getAttribute("value") ? "on" : t.value;
          });
        }), g.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (t, e) {
          g.fn[e] = function (t, n) {
            return arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e);
          };
        }), g.fn.extend({ hover: function hover(t, e) {
            return this.mouseenter(t).mouseleave(e || t);
          }, bind: function bind(t, e, n) {
            return this.on(t, null, e, n);
          }, unbind: function unbind(t, e) {
            return this.off(t, null, e);
          }, delegate: function delegate(t, e, n, i) {
            return this.on(e, t, n, i);
          }, undelegate: function undelegate(t, e, n) {
            return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n);
          } });var ne = g.now(),
            ie = /\?/;g.parseJSON = function (t) {
          return JSON.parse(t + "");
        }, g.parseXML = function (t) {
          var e;if (!t || "string" != typeof t) return null;try {
            e = new DOMParser().parseFromString(t, "text/xml");
          } catch (t) {
            e = void 0;
          }return e && !e.getElementsByTagName("parsererror").length || g.error("Invalid XML: " + t), e;
        };var re,
            oe,
            se = /#.*$/,
            ae = /([?&])_=[^&]*/,
            ce = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            le = /^(?:GET|HEAD)$/,
            ue = /^\/\//,
            fe = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
            de = {},
            pe = {},
            he = "*/".concat("*");try {
          oe = location.href;
        } catch (t) {
          (oe = v.createElement("a")).href = "", oe = oe.href;
        }function me(t) {
          return function (e, n) {
            "string" != typeof e && (n = e, e = "*");var i,
                r = 0,
                o = e.toLowerCase().match(L) || [];if (g.isFunction(n)) for (; i = o[r++];) {
              "+" === i[0] ? (i = i.slice(1) || "*", (t[i] = t[i] || []).unshift(n)) : (t[i] = t[i] || []).push(n);
            }
          };
        }function ve(t, e, n, i) {
          var r = {},
              o = t === pe;function s(a) {
            var c;return r[a] = !0, g.each(t[a] || [], function (t, a) {
              var l = a(e, n, i);return "string" != typeof l || o || r[l] ? o ? !(c = l) : void 0 : (e.dataTypes.unshift(l), s(l), !1);
            }), c;
          }return s(e.dataTypes[0]) || !r["*"] && s("*");
        }function ge(t, e) {
          var n,
              i,
              r = g.ajaxSettings.flatOptions || {};for (n in e) {
            void 0 !== e[n] && ((r[n] ? t : i || (i = {}))[n] = e[n]);
          }return i && g.extend(!0, t, i), t;
        }re = fe.exec(oe.toLowerCase()) || [], g.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: oe, type: "GET", isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(re[1]), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": he, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": g.parseJSON, "text xml": g.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function ajaxSetup(t, e) {
            return e ? ge(ge(t, g.ajaxSettings), e) : ge(g.ajaxSettings, t);
          }, ajaxPrefilter: me(de), ajaxTransport: me(pe), ajax: function ajax(t, e) {
            "object" === (void 0 === t ? "undefined" : l()(t)) && (e = t, t = void 0), e = e || {};var n,
                i,
                r,
                o,
                s,
                a,
                c,
                u,
                f = g.ajaxSetup({}, e),
                d = f.context || f,
                p = f.context && (d.nodeType || d.jquery) ? g(d) : g.event,
                h = g.Deferred(),
                m = g.Callbacks("once memory"),
                v = f.statusCode || {},
                y = {},
                b = {},
                x = 0,
                w = "canceled",
                A = { readyState: 0, getResponseHeader: function getResponseHeader(t) {
                var e;if (2 === x) {
                  if (!o) for (o = {}; e = ce.exec(r);) {
                    o[e[1].toLowerCase()] = e[2];
                  }e = o[t.toLowerCase()];
                }return null == e ? null : e;
              }, getAllResponseHeaders: function getAllResponseHeaders() {
                return 2 === x ? r : null;
              }, setRequestHeader: function setRequestHeader(t, e) {
                var n = t.toLowerCase();return x || (t = b[n] = b[n] || t, y[t] = e), this;
              }, overrideMimeType: function overrideMimeType(t) {
                return x || (f.mimeType = t), this;
              }, statusCode: function statusCode(t) {
                var e;if (t) if (x < 2) for (e in t) {
                  v[e] = [v[e], t[e]];
                } else A.always(t[A.status]);return this;
              }, abort: function abort(t) {
                var e = t || w;return n && n.abort(e), C(0, e), this;
              } };if (h.promise(A).complete = m.add, A.success = A.done, A.error = A.fail, f.url = ((t || f.url || oe) + "").replace(se, "").replace(ue, re[1] + "//"), f.type = e.method || e.type || f.method || f.type, f.dataTypes = g.trim(f.dataType || "*").toLowerCase().match(L) || [""], null == f.crossDomain && (a = fe.exec(f.url.toLowerCase()), f.crossDomain = !(!a || a[1] === re[1] && a[2] === re[2] && (a[3] || ("http:" === a[1] ? "80" : "443")) === (re[3] || ("http:" === re[1] ? "80" : "443")))), f.data && f.processData && "string" != typeof f.data && (f.data = g.param(f.data, f.traditional)), ve(de, f, e, A), 2 === x) return A;for (u in (c = f.global) && 0 == g.active++ && g.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !le.test(f.type), i = f.url, f.hasContent || (f.data && (i = f.url += (ie.test(i) ? "&" : "?") + f.data, delete f.data), !1 === f.cache && (f.url = ae.test(i) ? i.replace(ae, "$1_=" + ne++) : i + (ie.test(i) ? "&" : "?") + "_=" + ne++)), f.ifModified && (g.lastModified[i] && A.setRequestHeader("If-Modified-Since", g.lastModified[i]), g.etag[i] && A.setRequestHeader("If-None-Match", g.etag[i])), (f.data && f.hasContent && !1 !== f.contentType || e.contentType) && A.setRequestHeader("Content-Type", f.contentType), A.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + he + "; q=0.01" : "") : f.accepts["*"]), f.headers) {
              A.setRequestHeader(u, f.headers[u]);
            }if (f.beforeSend && (!1 === f.beforeSend.call(d, A, f) || 2 === x)) return A.abort();for (u in w = "abort", { success: 1, error: 1, complete: 1 }) {
              A[u](f[u]);
            }if (n = ve(pe, f, e, A)) {
              A.readyState = 1, c && p.trigger("ajaxSend", [A, f]), f.async && f.timeout > 0 && (s = setTimeout(function () {
                A.abort("timeout");
              }, f.timeout));try {
                x = 1, n.send(y, C);
              } catch (t) {
                if (!(x < 2)) throw t;C(-1, t);
              }
            } else C(-1, "No Transport");function C(t, e, o, a) {
              var l,
                  u,
                  y,
                  b,
                  w,
                  C = e;2 !== x && (x = 2, s && clearTimeout(s), n = void 0, r = a || "", A.readyState = t > 0 ? 4 : 0, l = t >= 200 && t < 300 || 304 === t, o && (b = function (t, e, n) {
                for (var i, r, o, s, a = t.contents, c = t.dataTypes; "*" === c[0];) {
                  c.shift(), void 0 === i && (i = t.mimeType || e.getResponseHeader("Content-Type"));
                }if (i) for (r in a) {
                  if (a[r] && a[r].test(i)) {
                    c.unshift(r);break;
                  }
                }if (c[0] in n) o = c[0];else {
                  for (r in n) {
                    if (!c[0] || t.converters[r + " " + c[0]]) {
                      o = r;break;
                    }s || (s = r);
                  }o = o || s;
                }if (o) return o !== c[0] && c.unshift(o), n[o];
              }(f, A, o)), b = function (t, e, n, i) {
                var r,
                    o,
                    s,
                    a,
                    c,
                    l = {},
                    u = t.dataTypes.slice();if (u[1]) for (s in t.converters) {
                  l[s.toLowerCase()] = t.converters[s];
                }for (o = u.shift(); o;) {
                  if (t.responseFields[o] && (n[t.responseFields[o]] = e), !c && i && t.dataFilter && (e = t.dataFilter(e, t.dataType)), c = o, o = u.shift()) if ("*" === o) o = c;else if ("*" !== c && c !== o) {
                    if (!(s = l[c + " " + o] || l["* " + o])) for (r in l) {
                      if ((a = r.split(" "))[1] === o && (s = l[c + " " + a[0]] || l["* " + a[0]])) {
                        !0 === s ? s = l[r] : !0 !== l[r] && (o = a[0], u.unshift(a[1]));break;
                      }
                    }if (!0 !== s) if (s && t.throws) e = s(e);else try {
                      e = s(e);
                    } catch (t) {
                      return { state: "parsererror", error: s ? t : "No conversion from " + c + " to " + o };
                    }
                  }
                }return { state: "success", data: e };
              }(f, b, A, l), l ? (f.ifModified && ((w = A.getResponseHeader("Last-Modified")) && (g.lastModified[i] = w), (w = A.getResponseHeader("etag")) && (g.etag[i] = w)), 204 === t || "HEAD" === f.type ? C = "nocontent" : 304 === t ? C = "notmodified" : (C = b.state, u = b.data, l = !(y = b.error))) : (y = C, !t && C || (C = "error", t < 0 && (t = 0))), A.status = t, A.statusText = (e || C) + "", l ? h.resolveWith(d, [u, C, A]) : h.rejectWith(d, [A, C, y]), A.statusCode(v), v = void 0, c && p.trigger(l ? "ajaxSuccess" : "ajaxError", [A, f, l ? u : y]), m.fireWith(d, [A, C]), c && (p.trigger("ajaxComplete", [A, f]), --g.active || g.event.trigger("ajaxStop")));
            }return A;
          }, getJSON: function getJSON(t, e, n) {
            return g.get(t, e, n, "json");
          }, getScript: function getScript(t, e) {
            return g.get(t, void 0, e, "script");
          } }), g.each(["get", "post"], function (t, e) {
          g[e] = function (t, n, i, r) {
            return g.isFunction(n) && (r = r || i, i = n, n = void 0), g.ajax({ url: t, type: e, dataType: r, data: n, success: i });
          };
        }), g.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (t, e) {
          g.fn[e] = function (t) {
            return this.on(e, t);
          };
        }), g._evalUrl = function (t) {
          return g.ajax({ url: t, type: "GET", dataType: "script", async: !1, global: !1, throws: !0 });
        }, g.fn.extend({ wrapAll: function wrapAll(t) {
            var e;return g.isFunction(t) ? this.each(function (e) {
              g(this).wrapAll(t.call(this, e));
            }) : (this[0] && (e = g(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function () {
              for (var t = this; t.firstElementChild;) {
                t = t.firstElementChild;
              }return t;
            }).append(this)), this);
          }, wrapInner: function wrapInner(t) {
            return g.isFunction(t) ? this.each(function (e) {
              g(this).wrapInner(t.call(this, e));
            }) : this.each(function () {
              var e = g(this),
                  n = e.contents();n.length ? n.wrapAll(t) : e.append(t);
            });
          }, wrap: function wrap(t) {
            var e = g.isFunction(t);return this.each(function (n) {
              g(this).wrapAll(e ? t.call(this, n) : t);
            });
          }, unwrap: function unwrap() {
            return this.parent().each(function () {
              g.nodeName(this, "body") || g(this).replaceWith(this.childNodes);
            }).end();
          } }), g.expr.filters.hidden = function (t) {
          return t.offsetWidth <= 0 && t.offsetHeight <= 0;
        }, g.expr.filters.visible = function (t) {
          return !g.expr.filters.hidden(t);
        };var ye = /%20/g,
            be = /\[\]$/,
            xe = /\r?\n/g,
            we = /^(?:submit|button|image|reset|file)$/i,
            Ae = /^(?:input|select|textarea|keygen)/i;function Ce(t, e, n, i) {
          var r;if (g.isArray(e)) g.each(e, function (e, r) {
            n || be.test(t) ? i(t, r) : Ce(t + "[" + ("object" === (void 0 === r ? "undefined" : l()(r)) ? e : "") + "]", r, n, i);
          });else if (n || "object" !== g.type(e)) i(t, e);else for (r in e) {
            Ce(t + "[" + r + "]", e[r], n, i);
          }
        }g.param = function (t, e) {
          var n,
              i = [],
              r = function r(t, e) {
            e = g.isFunction(e) ? e() : null == e ? "" : e, i[i.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e);
          };if (void 0 === e && (e = g.ajaxSettings && g.ajaxSettings.traditional), g.isArray(t) || t.jquery && !g.isPlainObject(t)) g.each(t, function () {
            r(this.name, this.value);
          });else for (n in t) {
            Ce(n, t[n], e, r);
          }return i.join("&").replace(ye, "+");
        }, g.fn.extend({ serialize: function serialize() {
            return g.param(this.serializeArray());
          }, serializeArray: function serializeArray() {
            return this.map(function () {
              var t = g.prop(this, "elements");return t ? g.makeArray(t) : this;
            }).filter(function () {
              var t = this.type;return this.name && !g(this).is(":disabled") && Ae.test(this.nodeName) && !we.test(t) && (this.checked || !z.test(t));
            }).map(function (t, e) {
              var n = g(this).val();return null == n ? null : g.isArray(n) ? g.map(n, function (t) {
                return { name: e.name, value: t.replace(xe, "\r\n") };
              }) : { name: e.name, value: n.replace(xe, "\r\n") };
            }).get();
          } }), g.ajaxSettings.xhr = function () {
          try {
            return new XMLHttpRequest();
          } catch (t) {}
        };var _e = 0,
            Te = {},
            ke = { 0: 200, 1223: 204 },
            Se = g.ajaxSettings.xhr();t.ActiveXObject && g(t).on("unload", function () {
          for (var t in Te) {
            Te[t]();
          }
        }), m.cors = !!Se && "withCredentials" in Se, m.ajax = Se = !!Se, g.ajaxTransport(function (t) {
          var _e3;if (m.cors || Se && !t.crossDomain) return { send: function send(n, i) {
              var r,
                  o = t.xhr(),
                  s = ++_e;if (o.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields) for (r in t.xhrFields) {
                o[r] = t.xhrFields[r];
              }for (r in t.mimeType && o.overrideMimeType && o.overrideMimeType(t.mimeType), t.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest"), n) {
                o.setRequestHeader(r, n[r]);
              }_e3 = function e(t) {
                return function () {
                  _e3 && (delete Te[s], _e3 = o.onload = o.onerror = null, "abort" === t ? o.abort() : "error" === t ? i(o.status, o.statusText) : i(ke[o.status] || o.status, o.statusText, "string" == typeof o.responseText ? { text: o.responseText } : void 0, o.getAllResponseHeaders()));
                };
              }, o.onload = _e3(), o.onerror = _e3("error"), _e3 = Te[s] = _e3("abort"), o.send(t.hasContent && t.data || null);
            }, abort: function abort() {
              _e3 && _e3();
            } };
        }), g.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /(?:java|ecma)script/ }, converters: { "text script": function textScript(t) {
              return g.globalEval(t), t;
            } } }), g.ajaxPrefilter("script", function (t) {
          void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET");
        }), g.ajaxTransport("script", function (t) {
          var e, _n;if (t.crossDomain) return { send: function send(i, r) {
              e = g("<script>").prop({ async: !0, charset: t.scriptCharset, src: t.url }).on("load error", _n = function n(t) {
                e.remove(), _n = null, t && r("error" === t.type ? 404 : 200, t.type);
              }), v.head.appendChild(e[0]);
            }, abort: function abort() {
              _n && _n();
            } };
        });var Ne = [],
            Ee = /(=)\?(?=&|$)|\?\?/;g.ajaxSetup({ jsonp: "callback", jsonpCallback: function jsonpCallback() {
            var t = Ne.pop() || g.expando + "_" + ne++;return this[t] = !0, t;
          } }), g.ajaxPrefilter("json jsonp", function (e, n, i) {
          var r,
              o,
              s,
              a = !1 !== e.jsonp && (Ee.test(e.url) ? "url" : "string" == typeof e.data && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && Ee.test(e.data) && "data");if (a || "jsonp" === e.dataTypes[0]) return r = e.jsonpCallback = g.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(Ee, "$1" + r) : !1 !== e.jsonp && (e.url += (ie.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function () {
            return s || g.error(r + " was not called"), s[0];
          }, e.dataTypes[0] = "json", o = t[r], t[r] = function () {
            s = arguments;
          }, i.always(function () {
            t[r] = o, e[r] && (e.jsonpCallback = n.jsonpCallback, Ne.push(r)), s && g.isFunction(o) && o(s[0]), s = o = void 0;
          }), "script";
        }), g.parseHTML = function (t, e, n) {
          if (!t || "string" != typeof t) return null;"boolean" == typeof e && (n = e, e = !1), e = e || v;var i = _.exec(t),
              r = !n && [];return i ? [e.createElement(i[1])] : (i = g.buildFragment([t], e, r), r && r.length && g(r).remove(), g.merge([], i.childNodes));
        };var De = g.fn.load;g.fn.load = function (t, e, n) {
          if ("string" != typeof t && De) return De.apply(this, arguments);var i,
              r,
              o,
              s = this,
              a = t.indexOf(" ");return a >= 0 && (i = t.slice(a), t = t.slice(0, a)), g.isFunction(e) ? (n = e, e = void 0) : e && "object" === (void 0 === e ? "undefined" : l()(e)) && (r = "POST"), s.length > 0 && g.ajax({ url: t, type: r, dataType: "html", data: e }).done(function (t) {
            o = arguments, s.html(i ? g("<div>").append(g.parseHTML(t)).find(i) : t);
          }).complete(n && function (t, e) {
            s.each(n, o || [t.responseText, e, t]);
          }), this;
        }, g.expr.filters.animated = function (t) {
          return g.grep(g.timers, function (e) {
            return t === e.elem;
          }).length;
        };var Ie = t.document.documentElement;function je(t) {
          return g.isWindow(t) ? t : 9 === t.nodeType && t.defaultView;
        }g.offset = { setOffset: function setOffset(t, e, n) {
            var i,
                r,
                o,
                s,
                a,
                c,
                l = g.css(t, "position"),
                u = g(t),
                f = {};"static" === l && (t.style.position = "relative"), a = u.offset(), o = g.css(t, "top"), c = g.css(t, "left"), ("absolute" === l || "fixed" === l) && (o + c).indexOf("auto") > -1 ? (s = (i = u.position()).top, r = i.left) : (s = parseFloat(o) || 0, r = parseFloat(c) || 0), g.isFunction(e) && (e = e.call(t, n, a)), null != e.top && (f.top = e.top - a.top + s), null != e.left && (f.left = e.left - a.left + r), "using" in e ? e.using.call(t, f) : u.css(f);
          } }, g.fn.extend({ offset: function offset(t) {
            if (arguments.length) return void 0 === t ? this : this.each(function (e) {
              g.offset.setOffset(this, t, e);
            });var e,
                n,
                i = this[0],
                r = { top: 0, left: 0 },
                o = i && i.ownerDocument;return o ? (e = o.documentElement, g.contains(e, i) ? ("undefined" !== l()(i.getBoundingClientRect) && (r = i.getBoundingClientRect()), n = je(o), { top: r.top + n.pageYOffset - e.clientTop, left: r.left + n.pageXOffset - e.clientLeft }) : r) : void 0;
          }, position: function position() {
            if (this[0]) {
              var t,
                  e,
                  n = this[0],
                  i = { top: 0, left: 0 };return "fixed" === g.css(n, "position") ? e = n.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), g.nodeName(t[0], "html") || (i = t.offset()), i.top += g.css(t[0], "borderTopWidth", !0), i.left += g.css(t[0], "borderLeftWidth", !0)), { top: e.top - i.top - g.css(n, "marginTop", !0), left: e.left - i.left - g.css(n, "marginLeft", !0) };
            }
          }, offsetParent: function offsetParent() {
            return this.map(function () {
              for (var t = this.offsetParent || Ie; t && !g.nodeName(t, "html") && "static" === g.css(t, "position");) {
                t = t.offsetParent;
              }return t || Ie;
            });
          } }), g.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (e, n) {
          var i = "pageYOffset" === n;g.fn[e] = function (r) {
            return H(this, function (e, r, o) {
              var s = je(e);if (void 0 === o) return s ? s[n] : e[r];s ? s.scrollTo(i ? t.pageXOffset : o, i ? o : t.pageYOffset) : e[r] = o;
            }, e, r, arguments.length, null);
          };
        }), g.each(["top", "left"], function (t, e) {
          g.cssHooks[e] = _t(m.pixelPosition, function (t, n) {
            if (n) return n = Ct(t, e), wt.test(n) ? g(t).position()[e] + "px" : n;
          });
        }), g.each({ Height: "height", Width: "width" }, function (t, e) {
          g.each({ padding: "inner" + t, content: e, "": "outer" + t }, function (n, i) {
            g.fn[i] = function (i, r) {
              var o = arguments.length && (n || "boolean" != typeof i),
                  s = n || (!0 === i || !0 === r ? "margin" : "border");return H(this, function (e, n, i) {
                var r;return g.isWindow(e) ? e.document.documentElement["client" + t] : 9 === e.nodeType ? (r = e.documentElement, Math.max(e.body["scroll" + t], r["scroll" + t], e.body["offset" + t], r["offset" + t], r["client" + t])) : void 0 === i ? g.css(e, n, s) : g.style(e, n, i, s);
              }, e, o ? i : void 0, o, null);
            };
          });
        }), g.fn.size = function () {
          return this.length;
        }, g.fn.andSelf = g.fn.addBack, "function" == typeof define && n("nErl") && define("jquery", [], function () {
          return g;
        });var Le = t.jQuery,
            $e = t.$;return g.noConflict = function (e) {
          return t.$ === g && (t.$ = $e), e && t.jQuery === g && (t.jQuery = Le), g;
        }, "undefined" === (void 0 === e ? "undefined" : l()(e)) && (t.jQuery = t.$ = g), g;
      }, "object" === l()(t) && "object" === l()(t.exports) ? t.exports = e.document ? i(e, !0) : function (t) {
        if (!t.document) throw new Error("jQuery requires a window with a document");return i(t);
      } : i(e);
    }).call(e, n("f1Eh")(t));
  }, SnTU: function SnTU(t, e) {
    t.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAmVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjHWqVAAAAMnRSTlMA+OzOLxAEvyII5qYmDPry1rOgg354X1FIRDke4dvJxZmRjG1pWU5LNSkY0bqqcFSuPzv2THoAAAEySURBVDjLddHpcoIwFAXgCwGRfZVF3BEqamt73v/hGkYKpJDvFzP3THIuoZGeRkyFYhmXYkVzra1gYG1cErlnDwKrFuZOAI7Fdb59bcL3UZE5zjUV8E7lUKZSwRnDNWsLYA5N6BG4Z9/VfAC2SaINuMv7Owa+aeYLXEFcqYC5NPcJIOguOQMaLdC7pjVv4COi3rzGgagBnOWA7gNY8xsYSYQAKjoikQW6RWyy0MgCBYAHKdBkgRsAlTzcZYE1AIV2vKjESu32POJGMttj6JCNF0l1h19xkge6/iX20rneEvdEIQt89NsasgPyv4fnySXXVV/VV8ulefNDvQwHd2GDanIW2Ox/5xehrr/Lxb+cJGK+ZQi1cZwaGf2XBgjiTLs729TeJ+bi08TGTvH2ximbjn8BbLEkTLw27A4AAAAASUVORK5CYII=";
  }, pOKD: function pOKD(t, e) {}, wAUg: function wAUg(t, e) {} }, ["NHnr"]);
//# sourceMappingURL=app.8c4e26968147598d9086.js.map