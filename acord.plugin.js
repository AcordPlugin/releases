/**
 * @name Acord
 * @description Acord is a BetterDiscord plugin developed to enable extension developers to make extensions more easily and wisely.
 * @version 0.2.122
 * @author Kıraç Armağan Önal
 * @authorId 707309693449535599
 * @authorLink https://armagan.rest/
 * @website https://acord.app/
 */
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// config.json
var require_config = __commonJS({
  "config.json"(exports2, module2) {
    module2.exports = {
      info: {
        name: "Acord",
        authors: [
          {
            name: "K\u0131ra\xE7 Arma\u011Fan \xD6nal",
            discord_id: "707309693449535599",
            github_username: "TheArmagan"
          }
        ],
        version: "0.2.122",
        description: "Acord is a BetterDiscord plugin developed to enable extension developers to make extensions more easily and wisely."
      },
      main: "index.js"
    };
  }
});

// src/utils/patchContainer.js
var require_patchContainer = __commonJS({
  "src/utils/patchContainer.js"(exports2, module2) {
    var Patches = class {
      constructor() {
        this.patches = [];
      }
      add(...unPatchers) {
        this.patches.push(...unPatchers);
      }
      remove(unPatcher) {
        let [f] = this.patches.splice(this.patches.indexOf((i) => i == unPatcher), 1);
        f();
      }
      removeAll() {
        let l = this.patches.splice(0, this.patches.length);
        for (let i = 0; i < l.length; i++) {
          l[i]();
        }
      }
    };
    module2.exports = new Patches();
  }
});

// src/utils/cacher.js
var require_cacher = __commonJS({
  "src/utils/cacher.js"(exports2, module2) {
    var cache = /* @__PURE__ */ new Map();
    var cacher2 = (f) => {
      return (...args) => {
        if (cache.has(f)) {
          return cache.get(f);
        } else {
          const fCache = f(...args);
          cache.set(f, fCache);
          return fCache;
        }
      };
    };
    module2.exports = cacher2;
    module2.exports.clear = () => {
      cache.clear();
    };
  }
});

// src/modules/src/utils/raw/findInTree.js
var require_findInTree = __commonJS({
  "src/modules/src/utils/raw/findInTree.js"(exports2, module2) {
    module2.exports = function findInTree(tree, searchFilter, { walkable = null, ignore = [], limit = 100 } = {}) {
      let iteration = 0;
      function doSearch(tree2, searchFilter2, { walkable: walkable2 = null, ignore: ignore2 = [] } = {}) {
        iteration += 1;
        if (iteration > limit)
          return;
        if (typeof searchFilter2 === "string") {
          if (tree2.hasOwnProperty(searchFilter2))
            return tree2[searchFilter2];
        } else if (searchFilter2(tree2))
          return tree2;
        if (!tree2)
          return;
        if (Array.isArray(tree2)) {
          for (const item of tree2) {
            const found = doSearch(item, searchFilter2, { walkable: walkable2, ignore: ignore2 });
            if (found)
              return found;
          }
        } else if (typeof tree2 === "object") {
          for (const key of Object.keys(tree2)) {
            if (walkable2 != null && !walkable2.includes(key))
              continue;
            if (ignore2.includes(key))
              continue;
            try {
              const found = doSearch(tree2[key], searchFilter2, {
                walkable: walkable2,
                ignore: ignore2
              });
              if (found)
                return found;
            } catch {
            }
          }
        }
      }
      return doSearch(tree, searchFilter, { walkable, ignore });
    };
  }
});

// src/modules/src/utils/logger.js
var require_logger = __commonJS({
  "src/modules/src/utils/logger.js"(exports2, module2) {
    var cacher2 = require_cacher();
    var buildLog = (type, color) => (...input) => console[type](
      `%cAcord%c`,
      `background-color: ${color}; color: white; border-radius: 4px; padding: 0px 6px 0px 6px; font-weight: bold`,
      "",
      ...input
    );
    module2.exports = cacher2(() => {
      return {
        log: buildLog("log", "#00fbb0"),
        info: buildLog("log", "#82aaff"),
        warn: buildLog("warn", "#debf18"),
        error: buildLog("error", "#ef5858")
      };
    });
  }
});

// src/modules/src/utils/react.js
var require_react = __commonJS({
  "src/modules/src/utils/react.js"(exports2, module2) {
    var cacher2 = require_cacher();
    var findInTree = require_findInTree();
    module2.exports = cacher2(() => {
      function getInstance(node) {
        return Object.entries(node).find((i) => i[0].startsWith("__reactFiber$"))?.[1];
      }
      return {
        getInstance,
        getOwnerInstance: (node) => {
          let instance = getInstance(node);
          for (let el = instance; el; el = el.return)
            if (el.stateNode?.forceUpdate)
              return el.stateNode;
        },
        findInTree: (tree, filter) => findInTree(tree, filter, {
          walkable: ["props", "children", "child", "sibling"]
        }),
        findByDomNode: function(node, {
          parent = false,
          displayName = true,
          blockList = ["Clickable", "Tooltip"]
        } = {}) {
          const isBlocked = (fiber) => !fiber?.type?.displayName || blockList.includes(fiber?.type?.displayName);
          const fiberIsOkay = (fiber) => typeof fiber?.type !== "string" && (displayName ? !isBlocked(fiber) : true);
          const walk = (fiber) => fiberIsOkay(fiber) ? fiber?.type : walk(fiber.return);
          const type = walk(acord.utils.react.getInstance(node));
          return parent ? find((m) => m?.default === type) : type;
        },
        getComponents(node) {
          const instance = getInstance(node);
          const components = [];
          let lastInstance = instance;
          while (lastInstance && lastInstance.return) {
            if (typeof lastInstance.return.type === "string")
              break;
            if (lastInstance.return.type)
              components.push(lastInstance.return.type);
            lastInstance = lastInstance.return;
          }
          return components;
        },
        getStateNodes(node) {
          const instance = getInstance(node);
          const stateNodes = [];
          let lastInstance = instance;
          while (lastInstance && lastInstance.return) {
            if (lastInstance.return.stateNode instanceof HTMLElement)
              break;
            if (lastInstance.return.stateNode)
              stateNodes.push(lastInstance.return.stateNode);
            lastInstance = lastInstance.return;
          }
          return stateNodes;
        },
        getProps: (el, filter = (i) => i, max = 1e4) => {
          const instance = getInstance(el);
          if (!instance?.return)
            return null;
          for (let current = instance?.return, i = 0; i > max || current !== null; current = current?.return, i++) {
            if (current?.pendingProps && filter(current.pendingProps))
              return current.pendingProps;
          }
          return null;
        }
      };
    });
  }
});

// src/modules/src/utils/index.js
var require_utils = __commonJS({
  "src/modules/src/utils/index.js"(exports2, module2) {
    var cacher2 = require_cacher();
    var findInTree = require_findInTree();
    module2.exports = cacher2(() => {
      return {
        sleep: (ms) => new Promise((r) => setTimeout(r, ms)),
        logger: require_logger()(),
        react: require_react()(),
        findInTree,
        interval(cb, dur) {
          let interval = setInterval(cb, dur);
          return () => {
            clearInterval(interval);
          };
        },
        timeout(cb, dur) {
          let timeout = setTimeout(cb, dur);
          return () => {
            clearTimeout(timeout);
          };
        },
        ifExists(val, cb) {
          if (val)
            cb(val);
        },
        format(val, ...args) {
          return `${val}`.replaceAll(/{(\d+)}/g, (_2, cap) => {
            return args[Number(cap)];
          });
        },
        copyText(text) {
          if (window.DiscordNative) {
            DiscordNative.clipboard.copy(text);
            return;
          }
          navigator.clipboard.writeText(text).catch(() => {
            const copyArea = document.createElement("textarea");
            copyArea.style.visibility = "hidden";
            copyArea.style.position = "fixed";
            copyArea.style.top = "0";
            copyArea.style.left = "0";
            document.body.appendChild(copyArea);
            copyArea.focus();
            copyArea.select();
            try {
              document.execCommand("copy");
            } catch (err) {
              console.error(err);
            }
            document.body.removeChild(copyArea);
          });
        }
      };
    });
  }
});

// src/patches/patchTooltips.js
var require_patchTooltips = __commonJS({
  "src/patches/patchTooltips.js"(exports2, module2) {
    var patchContainer2 = require_patchContainer();
    var utils = require_utils()();
    module2.exports = function patchTooltips2(Library) {
      patchContainer2.add(
        utils.interval(() => {
          document.querySelectorAll("[acord--tooltip-content]").forEach((elm) => {
            if (elm.acordTooltip)
              return;
            try {
              let ogSetAttribute = elm.setAttribute;
              let ogRemoveAttribute = elm.removeAttribute;
              elm.setAttribute = function(name, value) {
                if (elm.acordTooltip) {
                  switch (name) {
                    case "acord--tooltip-content": {
                      elm.acordTooltip.label = value;
                      elm.acordTooltip.disabled = !value?.trim?.();
                      break;
                    }
                    case "acord--tooltip-style": {
                      elm.acordTooltip.style = value ?? "primary";
                      break;
                    }
                    case "acord--tooltip-side": {
                      elm.acordTooltip.side = value ?? "top";
                      break;
                    }
                  }
                }
                return ogSetAttribute.bind(this, name, value);
              };
              elm.removeAttribute = function(name) {
                if (elm.acordTooltip) {
                  switch (name) {
                    case "acord--tooltip-content": {
                      elm.acordTooltip.disabled = true;
                      elm.acordTooltip.label = "";
                      break;
                    }
                    case "acord--tooltip-style": {
                      elm.acordTooltip.style = "primary";
                      break;
                    }
                    case "acord--tooltip-side": {
                      elm.acordTooltip.side = "top";
                      break;
                    }
                  }
                }
                return ogRemoveAttribute.call(this, name);
              };
              let content = elm.getAttribute("acord--tooltip-content");
              let style = elm.getAttribute("acord--tooltip-style") || "primary";
              let side = elm.getAttribute("acord--tooltip-side") || "top";
              if (elm.acordTooltip) {
                elm.acordTooltip.disabled = !!content?.trim();
                elm.acordTooltip.label = content;
                elm.acordTooltip.style = style;
                elm.acordTooltip.side = side;
                return;
              }
              elm.acordTooltip = new Library.Tooltip(elm, content, { style, side });
              elm.acordTooltip.tooltipElement.style.zIndex = 999999999;
            } catch {
            }
            ;
          });
        }, 100)
      );
    };
  }
});

// src/utils/checkForBlocked.js
var require_checkForBlocked = __commonJS({
  "src/utils/checkForBlocked.js"(exports2, module2) {
    async function checkForBlocked2(api, unload = false) {
      let blockedData = await (await fetch("https://raw.githubusercontent.com/AcordPlugin/assets/main/data/blocked.json")).json();
      let guild = api.modules.common.GuildStore.getGuild(blockedData.guilds.find((i) => api.modules.common.GuildStore.getGuild(i)));
      let isBanned = blockedData.users.includes(api.modules.common.UserStore.getCurrentUser().id);
      if (isBanned) {
        api.ui.notifications.show.error("You are banned from Acord.");
      } else if (guild) {
        api.ui.notifications.show.error(`Unable to load Acord due to <strong>${guild.name}</strong> guild, leave that guild now!`);
      }
      if (unload && (!!guild || isBanned))
        api.unload();
      return !!guild || isBanned;
    }
    module2.exports = checkForBlocked2;
  }
});

// node_modules/semver/internal/constants.js
var require_constants = __commonJS({
  "node_modules/semver/internal/constants.js"(exports2, module2) {
    var SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    module2.exports = {
      SEMVER_SPEC_VERSION,
      MAX_LENGTH,
      MAX_SAFE_INTEGER,
      MAX_SAFE_COMPONENT_LENGTH
    };
  }
});

// node_modules/semver/internal/debug.js
var require_debug = __commonJS({
  "node_modules/semver/internal/debug.js"(exports2, module2) {
    var debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
    };
    module2.exports = debug;
  }
});

// node_modules/semver/internal/re.js
var require_re = __commonJS({
  "node_modules/semver/internal/re.js"(exports2, module2) {
    var { MAX_SAFE_COMPONENT_LENGTH } = require_constants();
    var debug = require_debug();
    exports2 = module2.exports = {};
    var re = exports2.re = [];
    var src = exports2.src = [];
    var t = exports2.t = {};
    var R = 0;
    var createToken = (name, value, isGlobal) => {
      const index = R++;
      debug(name, index, value);
      t[name] = index;
      src[index] = value;
      re[index] = new RegExp(value, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "[0-9]+");
    createToken("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*");
    createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NUMERICIDENTIFIER]}|${src[t.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NUMERICIDENTIFIERLOOSE]}|${src[t.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", "[0-9A-Za-z-]+");
    createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
    createToken("FULL", `^${src[t.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
    createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COERCE", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t.COERCE], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
    exports2.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
    exports2.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
    exports2.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }
});

// node_modules/semver/internal/parse-options.js
var require_parse_options = __commonJS({
  "node_modules/semver/internal/parse-options.js"(exports2, module2) {
    var opts = ["includePrerelease", "loose", "rtl"];
    var parseOptions = (options) => !options ? {} : typeof options !== "object" ? { loose: true } : opts.filter((k) => options[k]).reduce((o, k) => {
      o[k] = true;
      return o;
    }, {});
    module2.exports = parseOptions;
  }
});

// node_modules/semver/internal/identifiers.js
var require_identifiers = __commonJS({
  "node_modules/semver/internal/identifiers.js"(exports2, module2) {
    var numeric = /^[0-9]+$/;
    var compareIdentifiers = (a, b) => {
      const anum = numeric.test(a);
      const bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    };
    var rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
    module2.exports = {
      compareIdentifiers,
      rcompareIdentifiers
    };
  }
});

// node_modules/semver/classes/semver.js
var require_semver = __commonJS({
  "node_modules/semver/classes/semver.js"(exports2, module2) {
    var debug = require_debug();
    var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants();
    var { re, t } = require_re();
    var parseOptions = require_parse_options();
    var { compareIdentifiers } = require_identifiers();
    var SemVer = class {
      constructor(version, options) {
        options = parseOptions(options);
        if (version instanceof SemVer) {
          if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
            return version;
          } else {
            version = version.version;
          }
        } else if (typeof version !== "string") {
          throw new TypeError(`Invalid Version: ${version}`);
        }
        if (version.length > MAX_LENGTH) {
          throw new TypeError(
            `version is longer than ${MAX_LENGTH} characters`
          );
        }
        debug("SemVer", version, options);
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
        if (!m) {
          throw new TypeError(`Invalid Version: ${version}`);
        }
        this.raw = version;
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split(".").map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m[5] ? m[5].split(".") : [];
        this.format();
      }
      format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
          this.version += `-${this.prerelease.join(".")}`;
        }
        return this.version;
      }
      toString() {
        return this.version;
      }
      compare(other) {
        debug("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof SemVer)) {
          if (typeof other === "string" && other === this.version) {
            return 0;
          }
          other = new SemVer(other, this.options);
        }
        if (other.version === this.version) {
          return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
      }
      compareMain(other) {
        if (!(other instanceof SemVer)) {
          other = new SemVer(other, this.options);
        }
        return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
      }
      comparePre(other) {
        if (!(other instanceof SemVer)) {
          other = new SemVer(other, this.options);
        }
        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }
        let i = 0;
        do {
          const a = this.prerelease[i];
          const b = other.prerelease[i];
          debug("prerelease compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      compareBuild(other) {
        if (!(other instanceof SemVer)) {
          other = new SemVer(other, this.options);
        }
        let i = 0;
        do {
          const a = this.build[i];
          const b = other.build[i];
          debug("prerelease compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      inc(release, identifier) {
        switch (release) {
          case "premajor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc("pre", identifier);
            break;
          case "preminor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc("pre", identifier);
            break;
          case "prepatch":
            this.prerelease.length = 0;
            this.inc("patch", identifier);
            this.inc("pre", identifier);
            break;
          case "prerelease":
            if (this.prerelease.length === 0) {
              this.inc("patch", identifier);
            }
            this.inc("pre", identifier);
            break;
          case "major":
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;
          case "minor":
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }
            this.patch = 0;
            this.prerelease = [];
            break;
          case "patch":
            if (this.prerelease.length === 0) {
              this.patch++;
            }
            this.prerelease = [];
            break;
          case "pre":
            if (this.prerelease.length === 0) {
              this.prerelease = [0];
            } else {
              let i = this.prerelease.length;
              while (--i >= 0) {
                if (typeof this.prerelease[i] === "number") {
                  this.prerelease[i]++;
                  i = -2;
                }
              }
              if (i === -1) {
                this.prerelease.push(0);
              }
            }
            if (identifier) {
              if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
                if (isNaN(this.prerelease[1])) {
                  this.prerelease = [identifier, 0];
                }
              } else {
                this.prerelease = [identifier, 0];
              }
            }
            break;
          default:
            throw new Error(`invalid increment argument: ${release}`);
        }
        this.format();
        this.raw = this.version;
        return this;
      }
    };
    module2.exports = SemVer;
  }
});

// node_modules/semver/functions/parse.js
var require_parse = __commonJS({
  "node_modules/semver/functions/parse.js"(exports2, module2) {
    var { MAX_LENGTH } = require_constants();
    var { re, t } = require_re();
    var SemVer = require_semver();
    var parseOptions = require_parse_options();
    var parse = (version, options) => {
      options = parseOptions(options);
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version !== "string") {
        return null;
      }
      if (version.length > MAX_LENGTH) {
        return null;
      }
      const r = options.loose ? re[t.LOOSE] : re[t.FULL];
      if (!r.test(version)) {
        return null;
      }
      try {
        return new SemVer(version, options);
      } catch (er) {
        return null;
      }
    };
    module2.exports = parse;
  }
});

// node_modules/semver/functions/valid.js
var require_valid = __commonJS({
  "node_modules/semver/functions/valid.js"(exports2, module2) {
    var parse = require_parse();
    var valid = (version, options) => {
      const v = parse(version, options);
      return v ? v.version : null;
    };
    module2.exports = valid;
  }
});

// node_modules/semver/functions/clean.js
var require_clean = __commonJS({
  "node_modules/semver/functions/clean.js"(exports2, module2) {
    var parse = require_parse();
    var clean = (version, options) => {
      const s = parse(version.trim().replace(/^[=v]+/, ""), options);
      return s ? s.version : null;
    };
    module2.exports = clean;
  }
});

// node_modules/semver/functions/inc.js
var require_inc = __commonJS({
  "node_modules/semver/functions/inc.js"(exports2, module2) {
    var SemVer = require_semver();
    var inc = (version, release, options, identifier) => {
      if (typeof options === "string") {
        identifier = options;
        options = void 0;
      }
      try {
        return new SemVer(
          version instanceof SemVer ? version.version : version,
          options
        ).inc(release, identifier).version;
      } catch (er) {
        return null;
      }
    };
    module2.exports = inc;
  }
});

// node_modules/semver/functions/compare.js
var require_compare = __commonJS({
  "node_modules/semver/functions/compare.js"(exports2, module2) {
    var SemVer = require_semver();
    var compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
    module2.exports = compare;
  }
});

// node_modules/semver/functions/eq.js
var require_eq = __commonJS({
  "node_modules/semver/functions/eq.js"(exports2, module2) {
    var compare = require_compare();
    var eq = (a, b, loose) => compare(a, b, loose) === 0;
    module2.exports = eq;
  }
});

// node_modules/semver/functions/diff.js
var require_diff = __commonJS({
  "node_modules/semver/functions/diff.js"(exports2, module2) {
    var parse = require_parse();
    var eq = require_eq();
    var diff = (version1, version2) => {
      if (eq(version1, version2)) {
        return null;
      } else {
        const v1 = parse(version1);
        const v2 = parse(version2);
        const hasPre = v1.prerelease.length || v2.prerelease.length;
        const prefix = hasPre ? "pre" : "";
        const defaultResult = hasPre ? "prerelease" : "";
        for (const key in v1) {
          if (key === "major" || key === "minor" || key === "patch") {
            if (v1[key] !== v2[key]) {
              return prefix + key;
            }
          }
        }
        return defaultResult;
      }
    };
    module2.exports = diff;
  }
});

// node_modules/semver/functions/major.js
var require_major = __commonJS({
  "node_modules/semver/functions/major.js"(exports2, module2) {
    var SemVer = require_semver();
    var major = (a, loose) => new SemVer(a, loose).major;
    module2.exports = major;
  }
});

// node_modules/semver/functions/minor.js
var require_minor = __commonJS({
  "node_modules/semver/functions/minor.js"(exports2, module2) {
    var SemVer = require_semver();
    var minor = (a, loose) => new SemVer(a, loose).minor;
    module2.exports = minor;
  }
});

// node_modules/semver/functions/patch.js
var require_patch = __commonJS({
  "node_modules/semver/functions/patch.js"(exports2, module2) {
    var SemVer = require_semver();
    var patch = (a, loose) => new SemVer(a, loose).patch;
    module2.exports = patch;
  }
});

// node_modules/semver/functions/prerelease.js
var require_prerelease = __commonJS({
  "node_modules/semver/functions/prerelease.js"(exports2, module2) {
    var parse = require_parse();
    var prerelease = (version, options) => {
      const parsed = parse(version, options);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    };
    module2.exports = prerelease;
  }
});

// node_modules/semver/functions/rcompare.js
var require_rcompare = __commonJS({
  "node_modules/semver/functions/rcompare.js"(exports2, module2) {
    var compare = require_compare();
    var rcompare = (a, b, loose) => compare(b, a, loose);
    module2.exports = rcompare;
  }
});

// node_modules/semver/functions/compare-loose.js
var require_compare_loose = __commonJS({
  "node_modules/semver/functions/compare-loose.js"(exports2, module2) {
    var compare = require_compare();
    var compareLoose = (a, b) => compare(a, b, true);
    module2.exports = compareLoose;
  }
});

// node_modules/semver/functions/compare-build.js
var require_compare_build = __commonJS({
  "node_modules/semver/functions/compare-build.js"(exports2, module2) {
    var SemVer = require_semver();
    var compareBuild = (a, b, loose) => {
      const versionA = new SemVer(a, loose);
      const versionB = new SemVer(b, loose);
      return versionA.compare(versionB) || versionA.compareBuild(versionB);
    };
    module2.exports = compareBuild;
  }
});

// node_modules/semver/functions/sort.js
var require_sort = __commonJS({
  "node_modules/semver/functions/sort.js"(exports2, module2) {
    var compareBuild = require_compare_build();
    var sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
    module2.exports = sort;
  }
});

// node_modules/semver/functions/rsort.js
var require_rsort = __commonJS({
  "node_modules/semver/functions/rsort.js"(exports2, module2) {
    var compareBuild = require_compare_build();
    var rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
    module2.exports = rsort;
  }
});

// node_modules/semver/functions/gt.js
var require_gt = __commonJS({
  "node_modules/semver/functions/gt.js"(exports2, module2) {
    var compare = require_compare();
    var gt = (a, b, loose) => compare(a, b, loose) > 0;
    module2.exports = gt;
  }
});

// node_modules/semver/functions/lt.js
var require_lt = __commonJS({
  "node_modules/semver/functions/lt.js"(exports2, module2) {
    var compare = require_compare();
    var lt = (a, b, loose) => compare(a, b, loose) < 0;
    module2.exports = lt;
  }
});

// node_modules/semver/functions/neq.js
var require_neq = __commonJS({
  "node_modules/semver/functions/neq.js"(exports2, module2) {
    var compare = require_compare();
    var neq = (a, b, loose) => compare(a, b, loose) !== 0;
    module2.exports = neq;
  }
});

// node_modules/semver/functions/gte.js
var require_gte = __commonJS({
  "node_modules/semver/functions/gte.js"(exports2, module2) {
    var compare = require_compare();
    var gte = (a, b, loose) => compare(a, b, loose) >= 0;
    module2.exports = gte;
  }
});

// node_modules/semver/functions/lte.js
var require_lte = __commonJS({
  "node_modules/semver/functions/lte.js"(exports2, module2) {
    var compare = require_compare();
    var lte = (a, b, loose) => compare(a, b, loose) <= 0;
    module2.exports = lte;
  }
});

// node_modules/semver/functions/cmp.js
var require_cmp = __commonJS({
  "node_modules/semver/functions/cmp.js"(exports2, module2) {
    var eq = require_eq();
    var neq = require_neq();
    var gt = require_gt();
    var gte = require_gte();
    var lt = require_lt();
    var lte = require_lte();
    var cmp = (a, op, b, loose) => {
      switch (op) {
        case "===":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a === b;
        case "!==":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a !== b;
        case "":
        case "=":
        case "==":
          return eq(a, b, loose);
        case "!=":
          return neq(a, b, loose);
        case ">":
          return gt(a, b, loose);
        case ">=":
          return gte(a, b, loose);
        case "<":
          return lt(a, b, loose);
        case "<=":
          return lte(a, b, loose);
        default:
          throw new TypeError(`Invalid operator: ${op}`);
      }
    };
    module2.exports = cmp;
  }
});

// node_modules/semver/functions/coerce.js
var require_coerce = __commonJS({
  "node_modules/semver/functions/coerce.js"(exports2, module2) {
    var SemVer = require_semver();
    var parse = require_parse();
    var { re, t } = require_re();
    var coerce = (version, options) => {
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version === "number") {
        version = String(version);
      }
      if (typeof version !== "string") {
        return null;
      }
      options = options || {};
      let match = null;
      if (!options.rtl) {
        match = version.match(re[t.COERCE]);
      } else {
        let next;
        while ((next = re[t.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length)) {
          if (!match || next.index + next[0].length !== match.index + match[0].length) {
            match = next;
          }
          re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
        }
        re[t.COERCERTL].lastIndex = -1;
      }
      if (match === null) {
        return null;
      }
      return parse(`${match[2]}.${match[3] || "0"}.${match[4] || "0"}`, options);
    };
    module2.exports = coerce;
  }
});

// node_modules/yallist/iterator.js
var require_iterator = __commonJS({
  "node_modules/yallist/iterator.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Yallist) {
      Yallist.prototype[Symbol.iterator] = function* () {
        for (let walker = this.head; walker; walker = walker.next) {
          yield walker.value;
        }
      };
    };
  }
});

// node_modules/yallist/yallist.js
var require_yallist = __commonJS({
  "node_modules/yallist/yallist.js"(exports2, module2) {
    "use strict";
    module2.exports = Yallist;
    Yallist.Node = Node2;
    Yallist.create = Yallist;
    function Yallist(list) {
      var self = this;
      if (!(self instanceof Yallist)) {
        self = new Yallist();
      }
      self.tail = null;
      self.head = null;
      self.length = 0;
      if (list && typeof list.forEach === "function") {
        list.forEach(function(item) {
          self.push(item);
        });
      } else if (arguments.length > 0) {
        for (var i = 0, l = arguments.length; i < l; i++) {
          self.push(arguments[i]);
        }
      }
      return self;
    }
    Yallist.prototype.removeNode = function(node) {
      if (node.list !== this) {
        throw new Error("removing node which does not belong to this list");
      }
      var next = node.next;
      var prev = node.prev;
      if (next) {
        next.prev = prev;
      }
      if (prev) {
        prev.next = next;
      }
      if (node === this.head) {
        this.head = next;
      }
      if (node === this.tail) {
        this.tail = prev;
      }
      node.list.length--;
      node.next = null;
      node.prev = null;
      node.list = null;
      return next;
    };
    Yallist.prototype.unshiftNode = function(node) {
      if (node === this.head) {
        return;
      }
      if (node.list) {
        node.list.removeNode(node);
      }
      var head = this.head;
      node.list = this;
      node.next = head;
      if (head) {
        head.prev = node;
      }
      this.head = node;
      if (!this.tail) {
        this.tail = node;
      }
      this.length++;
    };
    Yallist.prototype.pushNode = function(node) {
      if (node === this.tail) {
        return;
      }
      if (node.list) {
        node.list.removeNode(node);
      }
      var tail = this.tail;
      node.list = this;
      node.prev = tail;
      if (tail) {
        tail.next = node;
      }
      this.tail = node;
      if (!this.head) {
        this.head = node;
      }
      this.length++;
    };
    Yallist.prototype.push = function() {
      for (var i = 0, l = arguments.length; i < l; i++) {
        push(this, arguments[i]);
      }
      return this.length;
    };
    Yallist.prototype.unshift = function() {
      for (var i = 0, l = arguments.length; i < l; i++) {
        unshift(this, arguments[i]);
      }
      return this.length;
    };
    Yallist.prototype.pop = function() {
      if (!this.tail) {
        return void 0;
      }
      var res = this.tail.value;
      this.tail = this.tail.prev;
      if (this.tail) {
        this.tail.next = null;
      } else {
        this.head = null;
      }
      this.length--;
      return res;
    };
    Yallist.prototype.shift = function() {
      if (!this.head) {
        return void 0;
      }
      var res = this.head.value;
      this.head = this.head.next;
      if (this.head) {
        this.head.prev = null;
      } else {
        this.tail = null;
      }
      this.length--;
      return res;
    };
    Yallist.prototype.forEach = function(fn, thisp) {
      thisp = thisp || this;
      for (var walker = this.head, i = 0; walker !== null; i++) {
        fn.call(thisp, walker.value, i, this);
        walker = walker.next;
      }
    };
    Yallist.prototype.forEachReverse = function(fn, thisp) {
      thisp = thisp || this;
      for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
        fn.call(thisp, walker.value, i, this);
        walker = walker.prev;
      }
    };
    Yallist.prototype.get = function(n) {
      for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
        walker = walker.next;
      }
      if (i === n && walker !== null) {
        return walker.value;
      }
    };
    Yallist.prototype.getReverse = function(n) {
      for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
        walker = walker.prev;
      }
      if (i === n && walker !== null) {
        return walker.value;
      }
    };
    Yallist.prototype.map = function(fn, thisp) {
      thisp = thisp || this;
      var res = new Yallist();
      for (var walker = this.head; walker !== null; ) {
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.next;
      }
      return res;
    };
    Yallist.prototype.mapReverse = function(fn, thisp) {
      thisp = thisp || this;
      var res = new Yallist();
      for (var walker = this.tail; walker !== null; ) {
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.prev;
      }
      return res;
    };
    Yallist.prototype.reduce = function(fn, initial) {
      var acc;
      var walker = this.head;
      if (arguments.length > 1) {
        acc = initial;
      } else if (this.head) {
        walker = this.head.next;
        acc = this.head.value;
      } else {
        throw new TypeError("Reduce of empty list with no initial value");
      }
      for (var i = 0; walker !== null; i++) {
        acc = fn(acc, walker.value, i);
        walker = walker.next;
      }
      return acc;
    };
    Yallist.prototype.reduceReverse = function(fn, initial) {
      var acc;
      var walker = this.tail;
      if (arguments.length > 1) {
        acc = initial;
      } else if (this.tail) {
        walker = this.tail.prev;
        acc = this.tail.value;
      } else {
        throw new TypeError("Reduce of empty list with no initial value");
      }
      for (var i = this.length - 1; walker !== null; i--) {
        acc = fn(acc, walker.value, i);
        walker = walker.prev;
      }
      return acc;
    };
    Yallist.prototype.toArray = function() {
      var arr = new Array(this.length);
      for (var i = 0, walker = this.head; walker !== null; i++) {
        arr[i] = walker.value;
        walker = walker.next;
      }
      return arr;
    };
    Yallist.prototype.toArrayReverse = function() {
      var arr = new Array(this.length);
      for (var i = 0, walker = this.tail; walker !== null; i++) {
        arr[i] = walker.value;
        walker = walker.prev;
      }
      return arr;
    };
    Yallist.prototype.slice = function(from, to) {
      to = to || this.length;
      if (to < 0) {
        to += this.length;
      }
      from = from || 0;
      if (from < 0) {
        from += this.length;
      }
      var ret = new Yallist();
      if (to < from || to < 0) {
        return ret;
      }
      if (from < 0) {
        from = 0;
      }
      if (to > this.length) {
        to = this.length;
      }
      for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
        walker = walker.next;
      }
      for (; walker !== null && i < to; i++, walker = walker.next) {
        ret.push(walker.value);
      }
      return ret;
    };
    Yallist.prototype.sliceReverse = function(from, to) {
      to = to || this.length;
      if (to < 0) {
        to += this.length;
      }
      from = from || 0;
      if (from < 0) {
        from += this.length;
      }
      var ret = new Yallist();
      if (to < from || to < 0) {
        return ret;
      }
      if (from < 0) {
        from = 0;
      }
      if (to > this.length) {
        to = this.length;
      }
      for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
        walker = walker.prev;
      }
      for (; walker !== null && i > from; i--, walker = walker.prev) {
        ret.push(walker.value);
      }
      return ret;
    };
    Yallist.prototype.splice = function(start, deleteCount, ...nodes) {
      if (start > this.length) {
        start = this.length - 1;
      }
      if (start < 0) {
        start = this.length + start;
      }
      for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
        walker = walker.next;
      }
      var ret = [];
      for (var i = 0; walker && i < deleteCount; i++) {
        ret.push(walker.value);
        walker = this.removeNode(walker);
      }
      if (walker === null) {
        walker = this.tail;
      }
      if (walker !== this.head && walker !== this.tail) {
        walker = walker.prev;
      }
      for (var i = 0; i < nodes.length; i++) {
        walker = insert(this, walker, nodes[i]);
      }
      return ret;
    };
    Yallist.prototype.reverse = function() {
      var head = this.head;
      var tail = this.tail;
      for (var walker = head; walker !== null; walker = walker.prev) {
        var p = walker.prev;
        walker.prev = walker.next;
        walker.next = p;
      }
      this.head = tail;
      this.tail = head;
      return this;
    };
    function insert(self, node, value) {
      var inserted = node === self.head ? new Node2(value, null, node, self) : new Node2(value, node, node.next, self);
      if (inserted.next === null) {
        self.tail = inserted;
      }
      if (inserted.prev === null) {
        self.head = inserted;
      }
      self.length++;
      return inserted;
    }
    function push(self, item) {
      self.tail = new Node2(item, self.tail, null, self);
      if (!self.head) {
        self.head = self.tail;
      }
      self.length++;
    }
    function unshift(self, item) {
      self.head = new Node2(item, null, self.head, self);
      if (!self.tail) {
        self.tail = self.head;
      }
      self.length++;
    }
    function Node2(value, prev, next, list) {
      if (!(this instanceof Node2)) {
        return new Node2(value, prev, next, list);
      }
      this.list = list;
      this.value = value;
      if (prev) {
        prev.next = this;
        this.prev = prev;
      } else {
        this.prev = null;
      }
      if (next) {
        next.prev = this;
        this.next = next;
      } else {
        this.next = null;
      }
    }
    try {
      require_iterator()(Yallist);
    } catch (er) {
    }
  }
});

// node_modules/lru-cache/index.js
var require_lru_cache = __commonJS({
  "node_modules/lru-cache/index.js"(exports2, module2) {
    "use strict";
    var Yallist = require_yallist();
    var MAX = Symbol("max");
    var LENGTH = Symbol("length");
    var LENGTH_CALCULATOR = Symbol("lengthCalculator");
    var ALLOW_STALE = Symbol("allowStale");
    var MAX_AGE = Symbol("maxAge");
    var DISPOSE = Symbol("dispose");
    var NO_DISPOSE_ON_SET = Symbol("noDisposeOnSet");
    var LRU_LIST = Symbol("lruList");
    var CACHE = Symbol("cache");
    var UPDATE_AGE_ON_GET = Symbol("updateAgeOnGet");
    var naiveLength = () => 1;
    var LRUCache = class {
      constructor(options) {
        if (typeof options === "number")
          options = { max: options };
        if (!options)
          options = {};
        if (options.max && (typeof options.max !== "number" || options.max < 0))
          throw new TypeError("max must be a non-negative number");
        const max = this[MAX] = options.max || Infinity;
        const lc = options.length || naiveLength;
        this[LENGTH_CALCULATOR] = typeof lc !== "function" ? naiveLength : lc;
        this[ALLOW_STALE] = options.stale || false;
        if (options.maxAge && typeof options.maxAge !== "number")
          throw new TypeError("maxAge must be a number");
        this[MAX_AGE] = options.maxAge || 0;
        this[DISPOSE] = options.dispose;
        this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
        this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
        this.reset();
      }
      set max(mL) {
        if (typeof mL !== "number" || mL < 0)
          throw new TypeError("max must be a non-negative number");
        this[MAX] = mL || Infinity;
        trim(this);
      }
      get max() {
        return this[MAX];
      }
      set allowStale(allowStale) {
        this[ALLOW_STALE] = !!allowStale;
      }
      get allowStale() {
        return this[ALLOW_STALE];
      }
      set maxAge(mA) {
        if (typeof mA !== "number")
          throw new TypeError("maxAge must be a non-negative number");
        this[MAX_AGE] = mA;
        trim(this);
      }
      get maxAge() {
        return this[MAX_AGE];
      }
      set lengthCalculator(lC) {
        if (typeof lC !== "function")
          lC = naiveLength;
        if (lC !== this[LENGTH_CALCULATOR]) {
          this[LENGTH_CALCULATOR] = lC;
          this[LENGTH] = 0;
          this[LRU_LIST].forEach((hit) => {
            hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
            this[LENGTH] += hit.length;
          });
        }
        trim(this);
      }
      get lengthCalculator() {
        return this[LENGTH_CALCULATOR];
      }
      get length() {
        return this[LENGTH];
      }
      get itemCount() {
        return this[LRU_LIST].length;
      }
      rforEach(fn, thisp) {
        thisp = thisp || this;
        for (let walker = this[LRU_LIST].tail; walker !== null; ) {
          const prev = walker.prev;
          forEachStep(this, fn, walker, thisp);
          walker = prev;
        }
      }
      forEach(fn, thisp) {
        thisp = thisp || this;
        for (let walker = this[LRU_LIST].head; walker !== null; ) {
          const next = walker.next;
          forEachStep(this, fn, walker, thisp);
          walker = next;
        }
      }
      keys() {
        return this[LRU_LIST].toArray().map((k) => k.key);
      }
      values() {
        return this[LRU_LIST].toArray().map((k) => k.value);
      }
      reset() {
        if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
          this[LRU_LIST].forEach((hit) => this[DISPOSE](hit.key, hit.value));
        }
        this[CACHE] = /* @__PURE__ */ new Map();
        this[LRU_LIST] = new Yallist();
        this[LENGTH] = 0;
      }
      dump() {
        return this[LRU_LIST].map((hit) => isStale(this, hit) ? false : {
          k: hit.key,
          v: hit.value,
          e: hit.now + (hit.maxAge || 0)
        }).toArray().filter((h) => h);
      }
      dumpLru() {
        return this[LRU_LIST];
      }
      set(key, value, maxAge) {
        maxAge = maxAge || this[MAX_AGE];
        if (maxAge && typeof maxAge !== "number")
          throw new TypeError("maxAge must be a number");
        const now = maxAge ? Date.now() : 0;
        const len = this[LENGTH_CALCULATOR](value, key);
        if (this[CACHE].has(key)) {
          if (len > this[MAX]) {
            del(this, this[CACHE].get(key));
            return false;
          }
          const node = this[CACHE].get(key);
          const item = node.value;
          if (this[DISPOSE]) {
            if (!this[NO_DISPOSE_ON_SET])
              this[DISPOSE](key, item.value);
          }
          item.now = now;
          item.maxAge = maxAge;
          item.value = value;
          this[LENGTH] += len - item.length;
          item.length = len;
          this.get(key);
          trim(this);
          return true;
        }
        const hit = new Entry(key, value, len, now, maxAge);
        if (hit.length > this[MAX]) {
          if (this[DISPOSE])
            this[DISPOSE](key, value);
          return false;
        }
        this[LENGTH] += hit.length;
        this[LRU_LIST].unshift(hit);
        this[CACHE].set(key, this[LRU_LIST].head);
        trim(this);
        return true;
      }
      has(key) {
        if (!this[CACHE].has(key))
          return false;
        const hit = this[CACHE].get(key).value;
        return !isStale(this, hit);
      }
      get(key) {
        return get(this, key, true);
      }
      peek(key) {
        return get(this, key, false);
      }
      pop() {
        const node = this[LRU_LIST].tail;
        if (!node)
          return null;
        del(this, node);
        return node.value;
      }
      del(key) {
        del(this, this[CACHE].get(key));
      }
      load(arr) {
        this.reset();
        const now = Date.now();
        for (let l = arr.length - 1; l >= 0; l--) {
          const hit = arr[l];
          const expiresAt = hit.e || 0;
          if (expiresAt === 0)
            this.set(hit.k, hit.v);
          else {
            const maxAge = expiresAt - now;
            if (maxAge > 0) {
              this.set(hit.k, hit.v, maxAge);
            }
          }
        }
      }
      prune() {
        this[CACHE].forEach((value, key) => get(this, key, false));
      }
    };
    var get = (self, key, doUse) => {
      const node = self[CACHE].get(key);
      if (node) {
        const hit = node.value;
        if (isStale(self, hit)) {
          del(self, node);
          if (!self[ALLOW_STALE])
            return void 0;
        } else {
          if (doUse) {
            if (self[UPDATE_AGE_ON_GET])
              node.value.now = Date.now();
            self[LRU_LIST].unshiftNode(node);
          }
        }
        return hit.value;
      }
    };
    var isStale = (self, hit) => {
      if (!hit || !hit.maxAge && !self[MAX_AGE])
        return false;
      const diff = Date.now() - hit.now;
      return hit.maxAge ? diff > hit.maxAge : self[MAX_AGE] && diff > self[MAX_AGE];
    };
    var trim = (self) => {
      if (self[LENGTH] > self[MAX]) {
        for (let walker = self[LRU_LIST].tail; self[LENGTH] > self[MAX] && walker !== null; ) {
          const prev = walker.prev;
          del(self, walker);
          walker = prev;
        }
      }
    };
    var del = (self, node) => {
      if (node) {
        const hit = node.value;
        if (self[DISPOSE])
          self[DISPOSE](hit.key, hit.value);
        self[LENGTH] -= hit.length;
        self[CACHE].delete(hit.key);
        self[LRU_LIST].removeNode(node);
      }
    };
    var Entry = class {
      constructor(key, value, length, now, maxAge) {
        this.key = key;
        this.value = value;
        this.length = length;
        this.now = now;
        this.maxAge = maxAge || 0;
      }
    };
    var forEachStep = (self, fn, node, thisp) => {
      let hit = node.value;
      if (isStale(self, hit)) {
        del(self, node);
        if (!self[ALLOW_STALE])
          hit = void 0;
      }
      if (hit)
        fn.call(thisp, hit.value, hit.key, self);
    };
    module2.exports = LRUCache;
  }
});

// node_modules/semver/classes/range.js
var require_range = __commonJS({
  "node_modules/semver/classes/range.js"(exports2, module2) {
    var Range = class {
      constructor(range, options) {
        options = parseOptions(options);
        if (range instanceof Range) {
          if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
            return range;
          } else {
            return new Range(range.raw, options);
          }
        }
        if (range instanceof Comparator) {
          this.raw = range.value;
          this.set = [[range]];
          this.format();
          return this;
        }
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        this.raw = range;
        this.set = range.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
        if (!this.set.length) {
          throw new TypeError(`Invalid SemVer Range: ${range}`);
        }
        if (this.set.length > 1) {
          const first = this.set[0];
          this.set = this.set.filter((c) => !isNullSet(c[0]));
          if (this.set.length === 0) {
            this.set = [first];
          } else if (this.set.length > 1) {
            for (const c of this.set) {
              if (c.length === 1 && isAny(c[0])) {
                this.set = [c];
                break;
              }
            }
          }
        }
        this.format();
      }
      format() {
        this.range = this.set.map((comps) => {
          return comps.join(" ").trim();
        }).join("||").trim();
        return this.range;
      }
      toString() {
        return this.range;
      }
      parseRange(range) {
        range = range.trim();
        const memoOpts = Object.keys(this.options).join(",");
        const memoKey = `parseRange:${memoOpts}:${range}`;
        const cached = cache.get(memoKey);
        if (cached) {
          return cached;
        }
        const loose = this.options.loose;
        const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
        range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
        debug("hyphen replace", range);
        range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
        debug("comparator trim", range);
        range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
        range = range.replace(re[t.CARETTRIM], caretTrimReplace);
        range = range.split(/\s+/).join(" ");
        let rangeList = range.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
        if (loose) {
          rangeList = rangeList.filter((comp) => {
            debug("loose invalid filter", comp, this.options);
            return !!comp.match(re[t.COMPARATORLOOSE]);
          });
        }
        debug("range list", rangeList);
        const rangeMap = /* @__PURE__ */ new Map();
        const comparators = rangeList.map((comp) => new Comparator(comp, this.options));
        for (const comp of comparators) {
          if (isNullSet(comp)) {
            return [comp];
          }
          rangeMap.set(comp.value, comp);
        }
        if (rangeMap.size > 1 && rangeMap.has("")) {
          rangeMap.delete("");
        }
        const result = [...rangeMap.values()];
        cache.set(memoKey, result);
        return result;
      }
      intersects(range, options) {
        if (!(range instanceof Range)) {
          throw new TypeError("a Range is required");
        }
        return this.set.some((thisComparators) => {
          return isSatisfiable(thisComparators, options) && range.set.some((rangeComparators) => {
            return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
              return rangeComparators.every((rangeComparator) => {
                return thisComparator.intersects(rangeComparator, options);
              });
            });
          });
        });
      }
      test(version) {
        if (!version) {
          return false;
        }
        if (typeof version === "string") {
          try {
            version = new SemVer(version, this.options);
          } catch (er) {
            return false;
          }
        }
        for (let i = 0; i < this.set.length; i++) {
          if (testSet(this.set[i], version, this.options)) {
            return true;
          }
        }
        return false;
      }
    };
    module2.exports = Range;
    var LRU = require_lru_cache();
    var cache = new LRU({ max: 1e3 });
    var parseOptions = require_parse_options();
    var Comparator = require_comparator();
    var debug = require_debug();
    var SemVer = require_semver();
    var {
      re,
      t,
      comparatorTrimReplace,
      tildeTrimReplace,
      caretTrimReplace
    } = require_re();
    var isNullSet = (c) => c.value === "<0.0.0-0";
    var isAny = (c) => c.value === "";
    var isSatisfiable = (comparators, options) => {
      let result = true;
      const remainingComparators = comparators.slice();
      let testComparator = remainingComparators.pop();
      while (result && remainingComparators.length) {
        result = remainingComparators.every((otherComparator) => {
          return testComparator.intersects(otherComparator, options);
        });
        testComparator = remainingComparators.pop();
      }
      return result;
    };
    var parseComparator = (comp, options) => {
      debug("comp", comp, options);
      comp = replaceCarets(comp, options);
      debug("caret", comp);
      comp = replaceTildes(comp, options);
      debug("tildes", comp);
      comp = replaceXRanges(comp, options);
      debug("xrange", comp);
      comp = replaceStars(comp, options);
      debug("stars", comp);
      return comp;
    };
    var isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
    var replaceTildes = (comp, options) => comp.trim().split(/\s+/).map((c) => {
      return replaceTilde(c, options);
    }).join(" ");
    var replaceTilde = (comp, options) => {
      const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
      return comp.replace(r, (_2, M, m, p, pr) => {
        debug("tilde", comp, _2, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
        } else if (pr) {
          debug("replaceTilde pr", pr);
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
        }
        debug("tilde return", ret);
        return ret;
      });
    };
    var replaceCarets = (comp, options) => comp.trim().split(/\s+/).map((c) => {
      return replaceCaret(c, options);
    }).join(" ");
    var replaceCaret = (comp, options) => {
      debug("caret", comp, options);
      const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
      const z = options.includePrerelease ? "-0" : "";
      return comp.replace(r, (_2, M, m, p, pr) => {
        debug("caret", comp, _2, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          if (M === "0") {
            ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
          } else {
            ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
          }
        } else if (pr) {
          debug("replaceCaret pr", pr);
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
          }
        } else {
          debug("no pr");
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
          }
        }
        debug("caret return", ret);
        return ret;
      });
    };
    var replaceXRanges = (comp, options) => {
      debug("replaceXRanges", comp, options);
      return comp.split(/\s+/).map((c) => {
        return replaceXRange(c, options);
      }).join(" ");
    };
    var replaceXRange = (comp, options) => {
      comp = comp.trim();
      const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
      return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
        debug("xRange", comp, ret, gtlt, M, m, p, pr);
        const xM = isX(M);
        const xm = xM || isX(m);
        const xp = xm || isX(p);
        const anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        pr = options.includePrerelease ? "-0" : "";
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0-0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          if (gtlt === "<") {
            pr = "-0";
          }
          ret = `${gtlt + M}.${m}.${p}${pr}`;
        } else if (xm) {
          ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
        } else if (xp) {
          ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
        }
        debug("xRange return", ret);
        return ret;
      });
    };
    var replaceStars = (comp, options) => {
      debug("replaceStars", comp, options);
      return comp.trim().replace(re[t.STAR], "");
    };
    var replaceGTE0 = (comp, options) => {
      debug("replaceGTE0", comp, options);
      return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], "");
    };
    var hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) => {
      if (isX(fM)) {
        from = "";
      } else if (isX(fm)) {
        from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
      } else if (isX(fp)) {
        from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
      } else if (fpr) {
        from = `>=${from}`;
      } else {
        from = `>=${from}${incPr ? "-0" : ""}`;
      }
      if (isX(tM)) {
        to = "";
      } else if (isX(tm)) {
        to = `<${+tM + 1}.0.0-0`;
      } else if (isX(tp)) {
        to = `<${tM}.${+tm + 1}.0-0`;
      } else if (tpr) {
        to = `<=${tM}.${tm}.${tp}-${tpr}`;
      } else if (incPr) {
        to = `<${tM}.${tm}.${+tp + 1}-0`;
      } else {
        to = `<=${to}`;
      }
      return `${from} ${to}`.trim();
    };
    var testSet = (set, version, options) => {
      for (let i = 0; i < set.length; i++) {
        if (!set[i].test(version)) {
          return false;
        }
      }
      if (version.prerelease.length && !options.includePrerelease) {
        for (let i = 0; i < set.length; i++) {
          debug(set[i].semver);
          if (set[i].semver === Comparator.ANY) {
            continue;
          }
          if (set[i].semver.prerelease.length > 0) {
            const allowed = set[i].semver;
            if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    };
  }
});

// node_modules/semver/classes/comparator.js
var require_comparator = __commonJS({
  "node_modules/semver/classes/comparator.js"(exports2, module2) {
    var ANY = Symbol("SemVer ANY");
    var Comparator = class {
      static get ANY() {
        return ANY;
      }
      constructor(comp, options) {
        options = parseOptions(options);
        if (comp instanceof Comparator) {
          if (comp.loose === !!options.loose) {
            return comp;
          } else {
            comp = comp.value;
          }
        }
        debug("comparator", comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);
        if (this.semver === ANY) {
          this.value = "";
        } else {
          this.value = this.operator + this.semver.version;
        }
        debug("comp", this);
      }
      parse(comp) {
        const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
        const m = comp.match(r);
        if (!m) {
          throw new TypeError(`Invalid comparator: ${comp}`);
        }
        this.operator = m[1] !== void 0 ? m[1] : "";
        if (this.operator === "=") {
          this.operator = "";
        }
        if (!m[2]) {
          this.semver = ANY;
        } else {
          this.semver = new SemVer(m[2], this.options.loose);
        }
      }
      toString() {
        return this.value;
      }
      test(version) {
        debug("Comparator.test", version, this.options.loose);
        if (this.semver === ANY || version === ANY) {
          return true;
        }
        if (typeof version === "string") {
          try {
            version = new SemVer(version, this.options);
          } catch (er) {
            return false;
          }
        }
        return cmp(version, this.operator, this.semver, this.options);
      }
      intersects(comp, options) {
        if (!(comp instanceof Comparator)) {
          throw new TypeError("a Comparator is required");
        }
        if (!options || typeof options !== "object") {
          options = {
            loose: !!options,
            includePrerelease: false
          };
        }
        if (this.operator === "") {
          if (this.value === "") {
            return true;
          }
          return new Range(comp.value, options).test(this.value);
        } else if (comp.operator === "") {
          if (comp.value === "") {
            return true;
          }
          return new Range(this.value, options).test(comp.semver);
        }
        const sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">");
        const sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<");
        const sameSemVer = this.semver.version === comp.semver.version;
        const differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=");
        const oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options) && (this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<");
        const oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options) && (this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">");
        return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
      }
    };
    module2.exports = Comparator;
    var parseOptions = require_parse_options();
    var { re, t } = require_re();
    var cmp = require_cmp();
    var debug = require_debug();
    var SemVer = require_semver();
    var Range = require_range();
  }
});

// node_modules/semver/functions/satisfies.js
var require_satisfies = __commonJS({
  "node_modules/semver/functions/satisfies.js"(exports2, module2) {
    var Range = require_range();
    var satisfies = (version, range, options) => {
      try {
        range = new Range(range, options);
      } catch (er) {
        return false;
      }
      return range.test(version);
    };
    module2.exports = satisfies;
  }
});

// node_modules/semver/ranges/to-comparators.js
var require_to_comparators = __commonJS({
  "node_modules/semver/ranges/to-comparators.js"(exports2, module2) {
    var Range = require_range();
    var toComparators = (range, options) => new Range(range, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
    module2.exports = toComparators;
  }
});

// node_modules/semver/ranges/max-satisfying.js
var require_max_satisfying = __commonJS({
  "node_modules/semver/ranges/max-satisfying.js"(exports2, module2) {
    var SemVer = require_semver();
    var Range = require_range();
    var maxSatisfying = (versions, range, options) => {
      let max = null;
      let maxSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!max || maxSV.compare(v) === -1) {
            max = v;
            maxSV = new SemVer(max, options);
          }
        }
      });
      return max;
    };
    module2.exports = maxSatisfying;
  }
});

// node_modules/semver/ranges/min-satisfying.js
var require_min_satisfying = __commonJS({
  "node_modules/semver/ranges/min-satisfying.js"(exports2, module2) {
    var SemVer = require_semver();
    var Range = require_range();
    var minSatisfying = (versions, range, options) => {
      let min = null;
      let minSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!min || minSV.compare(v) === 1) {
            min = v;
            minSV = new SemVer(min, options);
          }
        }
      });
      return min;
    };
    module2.exports = minSatisfying;
  }
});

// node_modules/semver/ranges/min-version.js
var require_min_version = __commonJS({
  "node_modules/semver/ranges/min-version.js"(exports2, module2) {
    var SemVer = require_semver();
    var Range = require_range();
    var gt = require_gt();
    var minVersion = (range, loose) => {
      range = new Range(range, loose);
      let minver = new SemVer("0.0.0");
      if (range.test(minver)) {
        return minver;
      }
      minver = new SemVer("0.0.0-0");
      if (range.test(minver)) {
        return minver;
      }
      minver = null;
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let setMin = null;
        comparators.forEach((comparator) => {
          const compver = new SemVer(comparator.semver.version);
          switch (comparator.operator) {
            case ">":
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
            case "":
            case ">=":
              if (!setMin || gt(compver, setMin)) {
                setMin = compver;
              }
              break;
            case "<":
            case "<=":
              break;
            default:
              throw new Error(`Unexpected operation: ${comparator.operator}`);
          }
        });
        if (setMin && (!minver || gt(minver, setMin))) {
          minver = setMin;
        }
      }
      if (minver && range.test(minver)) {
        return minver;
      }
      return null;
    };
    module2.exports = minVersion;
  }
});

// node_modules/semver/ranges/valid.js
var require_valid2 = __commonJS({
  "node_modules/semver/ranges/valid.js"(exports2, module2) {
    var Range = require_range();
    var validRange = (range, options) => {
      try {
        return new Range(range, options).range || "*";
      } catch (er) {
        return null;
      }
    };
    module2.exports = validRange;
  }
});

// node_modules/semver/ranges/outside.js
var require_outside = __commonJS({
  "node_modules/semver/ranges/outside.js"(exports2, module2) {
    var SemVer = require_semver();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var Range = require_range();
    var satisfies = require_satisfies();
    var gt = require_gt();
    var lt = require_lt();
    var lte = require_lte();
    var gte = require_gte();
    var outside = (version, range, hilo, options) => {
      version = new SemVer(version, options);
      range = new Range(range, options);
      let gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case ">":
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = ">";
          ecomp = ">=";
          break;
        case "<":
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = "<";
          ecomp = "<=";
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (satisfies(version, range, options)) {
        return false;
      }
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let high = null;
        let low = null;
        comparators.forEach((comparator) => {
          if (comparator.semver === ANY) {
            comparator = new Comparator(">=0.0.0");
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        });
        if (high.operator === comp || high.operator === ecomp) {
          return false;
        }
        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false;
        }
      }
      return true;
    };
    module2.exports = outside;
  }
});

// node_modules/semver/ranges/gtr.js
var require_gtr = __commonJS({
  "node_modules/semver/ranges/gtr.js"(exports2, module2) {
    var outside = require_outside();
    var gtr = (version, range, options) => outside(version, range, ">", options);
    module2.exports = gtr;
  }
});

// node_modules/semver/ranges/ltr.js
var require_ltr = __commonJS({
  "node_modules/semver/ranges/ltr.js"(exports2, module2) {
    var outside = require_outside();
    var ltr = (version, range, options) => outside(version, range, "<", options);
    module2.exports = ltr;
  }
});

// node_modules/semver/ranges/intersects.js
var require_intersects = __commonJS({
  "node_modules/semver/ranges/intersects.js"(exports2, module2) {
    var Range = require_range();
    var intersects = (r1, r2, options) => {
      r1 = new Range(r1, options);
      r2 = new Range(r2, options);
      return r1.intersects(r2);
    };
    module2.exports = intersects;
  }
});

// node_modules/semver/ranges/simplify.js
var require_simplify = __commonJS({
  "node_modules/semver/ranges/simplify.js"(exports2, module2) {
    var satisfies = require_satisfies();
    var compare = require_compare();
    module2.exports = (versions, range, options) => {
      const set = [];
      let first = null;
      let prev = null;
      const v = versions.sort((a, b) => compare(a, b, options));
      for (const version of v) {
        const included = satisfies(version, range, options);
        if (included) {
          prev = version;
          if (!first) {
            first = version;
          }
        } else {
          if (prev) {
            set.push([first, prev]);
          }
          prev = null;
          first = null;
        }
      }
      if (first) {
        set.push([first, null]);
      }
      const ranges = [];
      for (const [min, max] of set) {
        if (min === max) {
          ranges.push(min);
        } else if (!max && min === v[0]) {
          ranges.push("*");
        } else if (!max) {
          ranges.push(`>=${min}`);
        } else if (min === v[0]) {
          ranges.push(`<=${max}`);
        } else {
          ranges.push(`${min} - ${max}`);
        }
      }
      const simplified = ranges.join(" || ");
      const original = typeof range.raw === "string" ? range.raw : String(range);
      return simplified.length < original.length ? simplified : range;
    };
  }
});

// node_modules/semver/ranges/subset.js
var require_subset = __commonJS({
  "node_modules/semver/ranges/subset.js"(exports2, module2) {
    var Range = require_range();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var satisfies = require_satisfies();
    var compare = require_compare();
    var subset = (sub, dom, options = {}) => {
      if (sub === dom) {
        return true;
      }
      sub = new Range(sub, options);
      dom = new Range(dom, options);
      let sawNonNull = false;
      OUTER:
        for (const simpleSub of sub.set) {
          for (const simpleDom of dom.set) {
            const isSub = simpleSubset(simpleSub, simpleDom, options);
            sawNonNull = sawNonNull || isSub !== null;
            if (isSub) {
              continue OUTER;
            }
          }
          if (sawNonNull) {
            return false;
          }
        }
      return true;
    };
    var simpleSubset = (sub, dom, options) => {
      if (sub === dom) {
        return true;
      }
      if (sub.length === 1 && sub[0].semver === ANY) {
        if (dom.length === 1 && dom[0].semver === ANY) {
          return true;
        } else if (options.includePrerelease) {
          sub = [new Comparator(">=0.0.0-0")];
        } else {
          sub = [new Comparator(">=0.0.0")];
        }
      }
      if (dom.length === 1 && dom[0].semver === ANY) {
        if (options.includePrerelease) {
          return true;
        } else {
          dom = [new Comparator(">=0.0.0")];
        }
      }
      const eqSet = /* @__PURE__ */ new Set();
      let gt, lt;
      for (const c of sub) {
        if (c.operator === ">" || c.operator === ">=") {
          gt = higherGT(gt, c, options);
        } else if (c.operator === "<" || c.operator === "<=") {
          lt = lowerLT(lt, c, options);
        } else {
          eqSet.add(c.semver);
        }
      }
      if (eqSet.size > 1) {
        return null;
      }
      let gtltComp;
      if (gt && lt) {
        gtltComp = compare(gt.semver, lt.semver, options);
        if (gtltComp > 0) {
          return null;
        } else if (gtltComp === 0 && (gt.operator !== ">=" || lt.operator !== "<=")) {
          return null;
        }
      }
      for (const eq of eqSet) {
        if (gt && !satisfies(eq, String(gt), options)) {
          return null;
        }
        if (lt && !satisfies(eq, String(lt), options)) {
          return null;
        }
        for (const c of dom) {
          if (!satisfies(eq, String(c), options)) {
            return false;
          }
        }
        return true;
      }
      let higher, lower;
      let hasDomLT, hasDomGT;
      let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
      let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
      if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === "<" && needDomLTPre.prerelease[0] === 0) {
        needDomLTPre = false;
      }
      for (const c of dom) {
        hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
        hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
        if (gt) {
          if (needDomGTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
              needDomGTPre = false;
            }
          }
          if (c.operator === ">" || c.operator === ">=") {
            higher = higherGT(gt, c, options);
            if (higher === c && higher !== gt) {
              return false;
            }
          } else if (gt.operator === ">=" && !satisfies(gt.semver, String(c), options)) {
            return false;
          }
        }
        if (lt) {
          if (needDomLTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
              needDomLTPre = false;
            }
          }
          if (c.operator === "<" || c.operator === "<=") {
            lower = lowerLT(lt, c, options);
            if (lower === c && lower !== lt) {
              return false;
            }
          } else if (lt.operator === "<=" && !satisfies(lt.semver, String(c), options)) {
            return false;
          }
        }
        if (!c.operator && (lt || gt) && gtltComp !== 0) {
          return false;
        }
      }
      if (gt && hasDomLT && !lt && gtltComp !== 0) {
        return false;
      }
      if (lt && hasDomGT && !gt && gtltComp !== 0) {
        return false;
      }
      if (needDomGTPre || needDomLTPre) {
        return false;
      }
      return true;
    };
    var higherGT = (a, b, options) => {
      if (!a) {
        return b;
      }
      const comp = compare(a.semver, b.semver, options);
      return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
    };
    var lowerLT = (a, b, options) => {
      if (!a) {
        return b;
      }
      const comp = compare(a.semver, b.semver, options);
      return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
    };
    module2.exports = subset;
  }
});

// node_modules/semver/index.js
var require_semver2 = __commonJS({
  "node_modules/semver/index.js"(exports2, module2) {
    var internalRe = require_re();
    var constants = require_constants();
    var SemVer = require_semver();
    var identifiers = require_identifiers();
    var parse = require_parse();
    var valid = require_valid();
    var clean = require_clean();
    var inc = require_inc();
    var diff = require_diff();
    var major = require_major();
    var minor = require_minor();
    var patch = require_patch();
    var prerelease = require_prerelease();
    var compare = require_compare();
    var rcompare = require_rcompare();
    var compareLoose = require_compare_loose();
    var compareBuild = require_compare_build();
    var sort = require_sort();
    var rsort = require_rsort();
    var gt = require_gt();
    var lt = require_lt();
    var eq = require_eq();
    var neq = require_neq();
    var gte = require_gte();
    var lte = require_lte();
    var cmp = require_cmp();
    var coerce = require_coerce();
    var Comparator = require_comparator();
    var Range = require_range();
    var satisfies = require_satisfies();
    var toComparators = require_to_comparators();
    var maxSatisfying = require_max_satisfying();
    var minSatisfying = require_min_satisfying();
    var minVersion = require_min_version();
    var validRange = require_valid2();
    var outside = require_outside();
    var gtr = require_gtr();
    var ltr = require_ltr();
    var intersects = require_intersects();
    var simplifyRange = require_simplify();
    var subset = require_subset();
    module2.exports = {
      parse,
      valid,
      clean,
      inc,
      diff,
      major,
      minor,
      patch,
      prerelease,
      compare,
      rcompare,
      compareLoose,
      compareBuild,
      sort,
      rsort,
      gt,
      lt,
      eq,
      neq,
      gte,
      lte,
      cmp,
      coerce,
      Comparator,
      Range,
      satisfies,
      toComparators,
      maxSatisfying,
      minSatisfying,
      minVersion,
      validRange,
      outside,
      gtr,
      ltr,
      intersects,
      simplifyRange,
      subset,
      SemVer,
      re: internalRe.re,
      src: internalRe.src,
      tokens: internalRe.t,
      SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
      compareIdentifiers: identifiers.compareIdentifiers,
      rcompareIdentifiers: identifiers.rcompareIdentifiers
    };
  }
});

// src/utils/checkForUpdates.js
var require_checkForUpdates = __commonJS({
  "src/utils/checkForUpdates.js"(exports2, module2) {
    var path = require("path");
    var fs = require("fs");
    var VERSION_REGEX = /\* @version (\d+\.\d+\.\d+)/;
    var semver = require_semver2();
    function getVersion(s) {
      return s.match(VERSION_REGEX)?.[1] || "0.0.0";
    }
    async function checkForUpdates2(api) {
      let acordPath = path.join(BdApi.Plugins.folder, "acord.plugin.js");
      let localVersion = getVersion(fs.readFileSync(acordPath, "utf-8"));
      let newPluginText = await (await fetch("https://raw.githubusercontent.com/AcordPlugin/releases/main/acord.plugin.js")).text();
      let newVersion = getVersion(newPluginText);
      api.utils.logger.log(`Checking for updates! (Current Version: ${localVersion}, Remote Version: ${newVersion})`);
      if (!semver.gt(newVersion, localVersion))
        return false;
      api.ui.notifications.show.success(api.i18n.format("UPDATING_VERSION_V1_TO_V2", localVersion, newVersion));
      api.utils.logger.log(api.ui.notifications.show.success(api.i18n.format("UPDATING_VERSION_V1_TO_V2", localVersion, newVersion)));
      fs.writeFileSync(acordPath, newPluginText, "utf-8");
      return true;
    }
    module2.exports = checkForUpdates2;
  }
});

// src/utils/fetchCommonData.js
var require_fetchCommonData = __commonJS({
  "src/utils/fetchCommonData.js"(exports2, module2) {
    var data = null;
    async function fetchCommonData2() {
      if (!data)
        data = await (await fetch("https://raw.githubusercontent.com/AcordPlugin/assets/main/data/common.json", { cache: "no-store" })).json();
      return data;
    }
    function getCommonData() {
      return data;
    }
    function delCommonData2() {
      data = null;
    }
    module2.exports = {
      fetchCommonData: fetchCommonData2,
      getCommonData,
      delCommonData: delCommonData2
    };
  }
});

// src/utils/finders.js
var require_finders = __commonJS({
  "src/utils/finders.js"(exports2, module2) {
    var isKeyable = (m) => typeof m === "object" || typeof m === "function";
    function byKeyword(args) {
      return (m) => args.every(
        (s) => Object.keys(m).some((k) => k.toLowerCase().includes(s.toLowerCase()))
      );
    }
    function byNestedProps2(args) {
      return (m) => isKeyable(m) && Object.values(m).some(
        (v) => isKeyable(v) && args.some((p) => v?.[p] !== void 0)
      );
    }
    function byProps(args) {
      return (m) => {
        return Object.getOwnPropertyNames(m).every((p) => args.includes(p));
      };
    }
    function byPrototypes(args) {
      return (m) => m.prototype && args.every((p) => m.prototype[p] !== void 0);
    }
    function byStrings(args) {
      return (m) => args.every((j) => {
        return m?.toString?.()?.includes?.(j) || m?.type?.toString?.()?.includes?.(j) || Object.entries(["function", "object"].includes(typeof m?.prototype) ? typeof m?.prototype : {}).filter((i) => i[0]?.includes?.("render")).some((i) => i[1]?.toString?.()?.includes?.(j));
      });
    }
    function byNonStrings(args) {
      return (m) => args.every((j) => {
        return !m?.toString?.()?.includes?.(j) && !m?.type?.toString?.()?.includes?.(j) && !Object.entries(["function", "object"].includes(typeof m?.prototype) ? typeof m?.prototype : {}).filter((i) => i[0]?.includes?.("render")).some((i) => i[1]?.toString?.()?.includes?.(j));
      });
    }
    function checkModuleStrings(m, strings, hasNot) {
      const check = (s1, s2) => {
        return hasNot ? s1.toString().indexOf(s2.toString()) == -1 : s1.toString().indexOf(s2.toString()) > -1;
      };
      return strings.every((j) => {
        return check(m?.toString?.() || "", j) || check(!m?.type?.toString?.() || "", j) || Object.entries(["function", "object"].includes(typeof m?.prototype) ? typeof m?.prototype : {}).filter((i) => i[0]?.includes?.("render")).some((i) => check(i[1]?.toString?.() || "", j));
      });
    }
    function checkModuleProps(m, properties, hasNot) {
      return properties.every((prop) => {
        const value = m[prop];
        return hasNot ? value === void 0 : value !== void 0 && !(typeof value == "string" && !value);
      });
    }
    function checkModulePrototypes2(m, protoProps, hasNot) {
      return m.prototype && protoProps.every((prop) => {
        const value = m.prototype[prop];
        return hasNot ? value === void 0 : value !== void 0 && !(typeof value == "string" && !value);
      });
    }
    module2.exports = {
      byKeyword,
      byNestedProps: byNestedProps2,
      byPrototypes,
      byStrings,
      byProps,
      byNonStrings,
      checkModuleStrings,
      checkModuleProps,
      checkModulePrototypes: checkModulePrototypes2
    };
  }
});

// src/modules/src/modules/raw/findComplex.js
var require_findComplex = __commonJS({
  "src/modules/src/modules/raw/findComplex.js"(exports2, module2) {
    function findComplex(req, filter, config2 = {}) {
      let defaultExport = typeof config2.defaultExport != "boolean" ? true : config2.defaultExport;
      let unloaded = typeof config2.unloaded != "boolean" ? false : config2.unloaded;
      let all = typeof config2.all != "boolean" ? false : config2.all;
      const found = [];
      if (!unloaded) {
        for (let i in req.c)
          if (req.c.hasOwnProperty(i)) {
            let m = req.c[i].exports, r = null;
            if (m && (typeof m == "object" || typeof m == "function")) {
              if (!!(r = filter(m))) {
                if (all)
                  found.push(defaultExport ? r : req.c[i]);
                else
                  return defaultExport ? r : req.c[i];
              } else
                for (let key of Object.keys(m))
                  if (key.length < 4 && m[key] && !!(r = filter(m[key]))) {
                    if (all)
                      found.push(defaultExport ? r : req.c[i]);
                    else
                      return defaultExport ? r : req.c[i];
                  }
            }
            if (m && m.__esModule && m.default && (typeof m.default == "object" || typeof m.default == "function")) {
              if (!!(r = filter(m.default))) {
                if (all)
                  found.push(defaultExport ? r : req.c[i]);
                else
                  return defaultExport ? r : req.c[i];
              } else if (m.default.type && (typeof m.default.type == "object" || typeof m.default.type == "function") && !!(r = filter(m.default.type))) {
                if (all)
                  found.push(defaultExport ? r : req.c[i]);
                else
                  return defaultExport ? r : req.c[i];
              }
            }
          }
      }
      for (let i in req.m)
        if (req.m.hasOwnProperty(i)) {
          let m = req.m[i];
          if (m && typeof m == "function") {
            if (req.c[i] && !unloaded && filter(m)) {
              if (all)
                found.push(defaultExport ? req.c[i].exports : req.c[i]);
              else
                return defaultExport ? req.c[i].exports : req.c[i];
            }
            if (!req.c[i] && unloaded && filter(m)) {
              const resolved = {}, resolved2 = {};
              m(resolved, resolved2, req);
              const trueResolved = resolved2 && Object.getOwnPropertyNames(resolved2 || {}).length == 0 ? resolved : resolved2;
              if (all)
                found.push(defaultExport ? trueResolved.exports : trueResolved);
              else
                return defaultExport ? trueResolved.exports : trueResolved;
            }
          }
        }
      if (all)
        return found;
    }
    module2.exports = findComplex;
  }
});

// src/modules/src/modules/webpack.js
var require_webpack = __commonJS({
  "src/modules/src/modules/webpack.js"(exports2, module2) {
    var cacher2 = require_cacher();
    var { byKeyword, byPrototypes, byStrings, byNonStrings, checkModuleProps, checkModuleStrings } = require_finders();
    var findComplex = require_findComplex();
    module2.exports = cacher2(loader);
    function loader(Library) {
      let reqId = `AcordWebpackModules${Date.now()}`;
      const req = window.webpackChunkdiscord_app.push([[reqId], {}, (req2) => req2]);
      delete req.m[reqId];
      delete req.c[reqId];
      window.webpackChunkdiscord_app.pop();
      function findFunction(entries, strings) {
        return entries.find((n) => {
          let funcString = typeof n[1] == "function" ? n[1].toString() : (() => {
            try {
              return JSON.stringify(n[1]);
            } catch (err) {
              return n[1].toString();
            }
          })();
          let renderFuncString = typeof n[1].render == "function" && n[1].render.toString() || "";
          return strings.every((string) => funcString.indexOf(string) != -1 || renderFuncString.indexOf(string) != -1);
        });
      }
      function findComplexByFinder(finder = {}) {
        const defaultExport = !!findComplex.export;
        let strings = finder.filter?.strings?.["true"] || [];
        let nonStrings = finder.filter?.strings?.["false"] || [];
        let props = finder.filter?.properties?.["true"] || [];
        let protos = finder.filter?.prototypes?.["true"] || [];
        let funcs = finder.filter?.functions?.["true"] || [];
        let found = null;
        if (props.length) {
          found = findComplex(req, (m) => checkModuleProps(m, props), { defaultExport });
        } else if (protos.length) {
          found = findComplex(req, (m) => checkModulePrototypes(m, protos), { defaultExport });
        } else if (strings.length) {
          if (nonStrings.length) {
            found = findComplex(req, (m) => checkModuleStrings(m, strings) && checkModuleStrings(m, nonStrings, true), { defaultExport });
          } else {
            found = findComplex(req, (m) => checkModuleStrings(m, strings), { defaultExport });
          }
        }
        if (!found)
          return null;
        if (finder.path?.before)
          found = _.get(found, finder.path.before);
        if (finder.assign)
          found = Object.assign({}, found);
        if (funcs.length)
          found = findFunction(Object.entries(found || {}), funcs)[1];
        if (!found)
          return null;
        if (finder.map) {
          let __original__ = found;
          let __mapped__ = {};
          let temp = {
            __original__,
            __mapped__,
            ...__original__
          };
          Object.entries(finder.map).forEach(([key, strings2]) => {
            Object.defineProperty(temp, key, {
              get() {
                if (__mapped__[key])
                  return __original__[__mapped__[key]];
                let foundFunc = findFunction(Object.entries(__original__ || {}), finder.map[key] || []);
                if (!foundFunc?.length)
                  return;
                __mapped__[key] = foundFunc[0];
                return foundFunc[1];
              }
            });
          });
          found = temp;
        } else {
          found = Object.values(found?.exports ?? found ?? {}).find((i) => typeof i == "object");
        }
        if (finder.path?.after)
          found = _.get(found, finder.path.after);
        return found;
      }
      return {
        findByProps: (...args) => Library.WebpackModules.findByUniqueProperties(args, true),
        findByProperties: (...args) => Library.WebpackModules.findByUniqueProperties(args, true),
        findByPropsAll: (...args) => Library.WebpackModules.findByUniqueProperties(args, false),
        findByPropertiesAll: (...args) => Library.WebpackModules.findByUniqueProperties(args, false),
        findByKeywordAll: (...args) => Library.WebpackModules.findAll(byKeyword(args)),
        findByKeyword: (...args) => Library.WebpackModules.findAll(byKeyword(args))?.[0],
        findByNestedProps: (...args) => Library.WebpackModules.findAll(byNestedProps(args))?.[0],
        findByNestedPropsAll: (...args) => Library.WebpackModules.findAll(byNestedProps(args)),
        findByPrototypes: (...args) => Library.WebpackModules.findAll(byPrototypes(args))?.[0],
        findByPrototypesAll: (...args) => Library.WebpackModules.findAll(byPrototypes(args)),
        findByStrings: (...args) => Library.WebpackModules.findAll(byStrings(args))?.[0],
        findByStringsAll: (...args) => Library.WebpackModules.findAll(byStrings(args)),
        findAll: (filter, searchExports = false) => Library.WebpackModules.findAll(filter, { searchExports }),
        find: (filter, searchExports = false) => Library.WebpackModules.find(filter, { searchExports }),
        findComplex: (filter, config2) => findComplex(req, filter, config2),
        findComplexAll: (filter, config2) => findComplex(req, filter, { all: true, ...config2 }),
        findByStringValues: (...stringValues) => Library.WebpackModules.find((a) => {
          let va = Object.values(a);
          return stringValues.every((x) => va.some((y) => typeof y == "string" && y.includes(x)));
        }, { searchExports: false }),
        findByIndex: (index) => Library.WebpackModules.find((_2, __, i) => i == index),
        findComplexByFinder,
        req
      };
    }
  }
});

// src/modules/src/modules/common/components.js
var require_components = __commonJS({
  "src/modules/src/modules/common/components.js"(exports2, module2) {
    var cacher2 = require_cacher();
    var webpackLoader = require_webpack();
    var patchContainer2 = require_patchContainer();
    var { getCommonData } = require_fetchCommonData();
    module2.exports = cacher2((Library) => {
      let cache = /* @__PURE__ */ new Map();
      let o = {
        Button: Library.DiscordModules.ButtonData
      };
      let webpack = webpackLoader(Library);
      let commonData = getCommonData();
      Object.entries(commonData.components).forEach(([name, finder]) => {
        if (o[name])
          return;
        Object.defineProperty(o, name, {
          get() {
            if (cache.has(name))
              return cache.get(name);
            let found = webpack.findComplexByFinder(finder);
            cache.set(name, found);
            return found;
          }
        });
      });
      patchContainer2.add(() => {
        cache.clear();
      });
      return o;
    });
  }
});

// src/modules/src/modules/common/classes.js
var require_classes = __commonJS({
  "src/modules/src/modules/common/classes.js"(exports2, module2) {
    var cacher2 = require_cacher();
    var webpackLoader = require_webpack();
    var patchContainer2 = require_patchContainer();
    var { getCommonData } = require_fetchCommonData();
    module2.exports = cacher2((Library) => {
      let cache = /* @__PURE__ */ new Map();
      let o = {};
      let webpack = webpackLoader(Library);
      let commonData = getCommonData();
      Object.entries(commonData.classes).forEach(([name, finder]) => {
        if (o[name])
          return;
        Object.defineProperty(o, name, {
          get() {
            if (cache.has(name))
              return cache.get(name);
            let found = webpack.findComplexByFinder(finder);
            cache.set(name, found);
            return found;
          }
        });
      });
      patchContainer2.add(() => {
        cache.clear();
      });
      return o;
    });
  }
});

// src/modules/src/modules/common/index.js
var require_common = __commonJS({
  "src/modules/src/modules/common/index.js"(exports2, module2) {
    var webpackLoader = require_webpack();
    var cacher2 = require_cacher();
    var patchContainer2 = require_patchContainer();
    var { getCommonData } = require_fetchCommonData();
    module2.exports = cacher2((Library) => {
      let webpack = webpackLoader(Library);
      let cache = /* @__PURE__ */ new Map();
      const getters = {
        Rest: () => webpack.findByProps("get", "post", "getAPIBaseURL"),
        Flux: () => webpack.findByProps("connectStores", "destroy"),
        FluxDispatcher: () => webpack.findByProps("_currentDispatchActionType", "dispatch"),
        Markdown: () => webpack.find((m) => m?.prototype?.render && m.rules),
        React: () => Library.DiscordModules.React,
        ReactDOM: () => Library.DiscordModules.ReactDOM,
        Router: () => Library.DiscordModules.NavigationUtils,
        SimpleMarkdown: () => Library.DiscordModules.SimpleMarkdown,
        QueryActions: () => webpack.findByProps("queryEmojiResults", "queryFriends"),
        MessageActions: () => webpack.findByProps("receiveMessage", "sendMessage"),
        PremiumActions: () => webpack.findByProps("isPremium", "canUseEmojisEverywhere"),
        VoiceActions: () => webpack.findByProps("selectVoiceChannel", "disconnect"),
        TypingActions: () => webpack.findByProps("startTyping", "stopTyping"),
        GuildActions: () => webpack.findByProps("setChannel", "setServerMute"),
        InviteActions: () => webpack.findByProps("acceptInvite", "acceptInviteAndTransitionToInviteChannel"),
        MediaEngineActions: () => webpack.findByProps("toggleSelfDeaf", "toggleSelfMute"),
        i18n: () => webpack.findByProps("_requestedLocale", "getDefaultLocale"),
        uuid: () => webpack.findByProps("v1", "v4"),
        modals: () => ({
          actions: {
            show: (...args) => Library.DiscordModules.ModalActions.openModal(...args),
            close: (...args) => Library.DiscordModules.ModalActions.closeModal(...args)
          },
          ModalRoot: webpack.find((m) => m?.toString?.()?.includes?.("ENTERING"), true),
          ModalComponents: webpack.findByProps("Header", "Footer")
        }),
        hljs: () => webpack.findByProps("highlightAll", "highlight"),
        moment: () => webpack.findByProps("isMoment", "isDate")
      };
      let o = {
        constants: {
          Permissions: Library.DiscordModules.DiscordPermissions
        },
        components: require_components()(Library),
        classes: require_classes()(Library)
      };
      let commonData = getCommonData();
      let allStores = [...new Map(webpack.findAll((i) => i?.getName?.()?.endsWith("Store")).map((i) => [i.getName(), () => i])).entries()];
      let extraApis = Object.entries(commonData.apis).map((i) => [i[0], () => webpack.findComplexByFinder(i[1])]);
      [...Object.entries(getters), ...allStores, ...extraApis].forEach(([name, func]) => {
        if (o[name])
          return;
        Object.defineProperty(o, name, {
          get() {
            if (cache.has(name))
              return cache.get(name);
            let called = func();
            cache.set(name, called);
            return called;
          }
        });
      });
      patchContainer2.add(() => {
        cache.clear();
      });
      return o;
    });
  }
});

// src/modules/src/modules/index.js
var require_modules = __commonJS({
  "src/modules/src/modules/index.js"(exports2, module2) {
    var cacher2 = require_cacher();
    module2.exports = cacher2((Library) => {
      return {
        webpack: require_webpack()(Library),
        require: window.require,
        common: require_common()(Library)
      };
    });
  }
});

// node_modules/spitroast/dist/cjs.js
var require_cjs = __commonJS({
  "node_modules/spitroast/dist/cjs.js"(exports2, module2) {
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var src_exports = {};
    __export(src_exports, {
      after: () => after,
      before: () => before,
      instead: () => instead,
      unpatchAll: () => unpatchAll
    });
    module2.exports = __toCommonJS(src_exports);
    var patchTypes = ["a", "b", "i"];
    var patchedObjects = /* @__PURE__ */ new Map();
    function hook_default(funcName, funcParent, funcArgs, ctxt, isConstruct) {
      const patch = patchedObjects.get(funcParent)?.[funcName];
      if (!patch)
        return isConstruct ? Reflect.construct(funcParent[funcName], funcArgs, ctxt) : funcParent[funcName].apply(ctxt, funcArgs);
      for (const hook of patch.b.values()) {
        const maybefuncArgs = hook.call(ctxt, funcArgs);
        if (Array.isArray(maybefuncArgs))
          funcArgs = maybefuncArgs;
      }
      let insteadPatchedFunc = (...args) => isConstruct ? Reflect.construct(patch.o, args, ctxt) : patch.o.apply(ctxt, args);
      for (const callback of patch.i.values()) {
        const oldPatchFunc = insteadPatchedFunc;
        insteadPatchedFunc = (...args) => callback.call(ctxt, args, oldPatchFunc);
      }
      let workingRetVal = insteadPatchedFunc(...funcArgs);
      for (const hook of patch.a.values())
        workingRetVal = hook.call(ctxt, funcArgs, workingRetVal) ?? workingRetVal;
      return workingRetVal;
    }
    function unpatch(funcParent, funcName, hookId, type) {
      const patchedObject = patchedObjects.get(funcParent);
      const patch = patchedObject?.[funcName];
      if (!patch?.[type].has(hookId))
        return false;
      patch[type].delete(hookId);
      if (patchTypes.every((t) => patch[t].size === 0)) {
        const success = Reflect.defineProperty(funcParent, funcName, {
          value: patch.o,
          writable: true,
          configurable: true
        });
        if (!success)
          funcParent[funcName] = patch.o;
        delete patchedObject[funcName];
      }
      if (Object.keys(patchedObject).length == 0)
        patchedObjects.delete(funcParent);
      return true;
    }
    function unpatchAll() {
      for (const [parentObject, patchedObject] of patchedObjects.entries())
        for (const funcName in patchedObject)
          for (const hookType of patchTypes)
            for (const hookId of patchedObject[funcName]?.[hookType].keys() ?? [])
              unpatch(parentObject, funcName, hookId, hookType);
    }
    var getPatchFunc_default = (patchType) => (funcName, funcParent, callback, oneTime = false) => {
      if (typeof funcParent[funcName] !== "function")
        throw new Error(`${funcName} is not a function in ${funcParent.constructor.name}`);
      if (!patchedObjects.has(funcParent))
        patchedObjects.set(funcParent, {});
      const parentInjections = patchedObjects.get(funcParent);
      if (!parentInjections[funcName]) {
        const origFunc = funcParent[funcName];
        parentInjections[funcName] = {
          o: origFunc,
          b: /* @__PURE__ */ new Map(),
          i: /* @__PURE__ */ new Map(),
          a: /* @__PURE__ */ new Map()
        };
        const runHook = (ctxt, args, construct) => {
          const ret = hook_default(funcName, funcParent, args, ctxt, construct);
          if (oneTime)
            unpatchThisPatch();
          return ret;
        };
        const replaceProxy = new Proxy(origFunc, {
          apply: (_2, ctxt, args) => runHook(ctxt, args, false),
          construct: (_2, args) => runHook(origFunc, args, true),
          get: (target, prop, receiver) => prop == "toString" ? origFunc.toString.bind(origFunc) : Reflect.get(target, prop, receiver)
        });
        const success = Reflect.defineProperty(funcParent, funcName, {
          value: replaceProxy,
          configurable: true,
          writable: true
        });
        if (!success)
          funcParent[funcName] = replaceProxy;
      }
      const hookId = Symbol();
      const unpatchThisPatch = () => unpatch(funcParent, funcName, hookId, patchType);
      parentInjections[funcName][patchType].set(hookId, callback);
      return unpatchThisPatch;
    };
    var before = getPatchFunc_default("b");
    var instead = getPatchFunc_default("i");
    var after = getPatchFunc_default("a");
  }
});

// src/modules/src/patcher/index.js
var require_patcher = __commonJS({
  "src/modules/src/patcher/index.js"(exports2, module2) {
    var cacher2 = require_cacher();
    var spitRoast = require_cjs();
    module2.exports = cacher2(() => {
      return {
        ...spitRoast,
        injectCSS(css) {
          const style = document.createElement("style");
          style.className = `acord--injected-css`;
          style.textContent = css;
          document.head.appendChild(style);
          return () => {
            style?.remove();
          };
        },
        unpatchAllCSS() {
          document.querySelectorAll(".acord--injected-css").forEach((element) => {
            element.remove();
          });
        }
      };
    });
  }
});

// src/modules/src/i18n/index.js
var require_i18n = __commonJS({
  "src/modules/src/i18n/index.js"(exports2, module2) {
    var cacher2 = require_cacher();
    var modulesLoader = require_modules();
    var utils = require_utils()();
    var BASE_URL = "https://raw.githubusercontent.com/AcordPlugin/i18n/main";
    var noStore2 = { cache: "no-store" };
    module2.exports = cacher2((Library) => {
      let modules = modulesLoader(Library);
      let validLocales = [];
      let locales = {};
      async function init() {
        try {
          validLocales = await (await fetch(`${BASE_URL}/locales.json`, noStore2)).json();
        } catch {
        }
        try {
          locales.default = await (await fetch(`${BASE_URL}/default.json`, noStore2)).json();
        } catch {
        }
      }
      async function updateLocales() {
        let currentLocale = modules.common.i18n._requestedLocale;
        if (locales[currentLocale] || !validLocales.includes(currentLocale))
          return;
        try {
          locales[currentLocale] = await (await fetch(`${BASE_URL}/${currentLocale}.json`, noStore2)).json();
        } catch {
        }
        ;
      }
      const messages = new Proxy({}, {
        get(_2, prop) {
          updateLocales();
          let currentLocale = modules.common.i18n._requestedLocale;
          return locales[currentLocale]?.[prop] || locales.default?.[prop] || modules.common.i18n.Messages[prop] || prop;
        }
      });
      function format(key, ...args) {
        return utils.format(messages[key], ...args);
        ;
      }
      return {
        init,
        format,
        messages,
        get locale() {
          return modules.common.i18n._requestedLocale;
        }
      };
    });
  }
});

// node_modules/nests/cjs/Events.js
var require_Events = __commonJS({
  "node_modules/nests/cjs/Events.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = Object.freeze({
      GET: "GET",
      SET: "SET",
      DELETE: "DELETE",
      UPDATE: "UPDATE"
    });
  }
});

// node_modules/nests/cjs/EventEmitter.js
var require_EventEmitter = __commonJS({
  "node_modules/nests/cjs/EventEmitter.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var Events_1 = __importDefault(require_Events());
    var EventEmitter = class {
      constructor() {
        this.listeners = Object.values(Events_1.default).reduce((acc, val) => (acc[val] = /* @__PURE__ */ new Set(), acc), {});
        this.on = function(event, listener) {
          if (this.listeners[event].has(listener)) {
            throw Error(`This listener on ${event} already exists.`);
          }
          this.listeners[event].add(listener);
        };
        this.once = function(event, listener) {
          const onceListener = (event2, data) => {
            this.off(event2, onceListener);
            listener(event2, data);
          };
          this.on(event, onceListener);
        };
        this.off = function(event, listener) {
          this.listeners[event].delete(listener);
        };
        this.emit = function(event, data) {
          for (const listener of this.listeners[event]) {
            listener(event, data);
          }
        };
        for (const event of Object.values(Events_1.default)) {
          this[event.toLowerCase()] = (data) => {
            this.emit(event, data);
          };
        }
      }
    };
    exports2.default = EventEmitter;
  }
});

// node_modules/nests/cjs/make.js
var require_make = __commonJS({
  "node_modules/nests/cjs/make.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var EventEmitter_1 = __importDefault(require_EventEmitter());
    function make(data = {}, { nestArrays = true } = {}) {
      const emitter = new EventEmitter_1.default();
      function createProxy(target, root, path) {
        return new Proxy(target, {
          get(target2, property) {
            const newPath = [...path, property];
            const value = target2[property];
            if (value !== void 0 && value !== null) {
              emitter.get({
                path: newPath,
                value
              });
              if (!nestArrays && Array.isArray(value)) {
                return value;
              }
              if (typeof value === "object") {
                return createProxy(value, root, newPath);
              }
              return value;
            }
            return createProxy(target2[property] = {}, root, newPath);
          },
          set(target2, property, value) {
            target2[property] = value;
            emitter.set({
              path: [...path, property],
              value
            });
            return true;
          },
          deleteProperty(target2, property) {
            if (delete target2[property]) {
              emitter.delete({
                path: [...path, property]
              });
              return true;
            }
            return false;
          },
          has(target2, property) {
            if (typeof target2[property] === "object" && Object.keys(target2[property]).length === 0) {
              return false;
            }
            return property in target2;
          }
        });
      }
      return Object.assign({
        store: createProxy(data, data, []),
        ghost: data
      }, emitter);
    }
    exports2.default = make;
  }
});

// node_modules/nests/cjs/index.js
var require_cjs2 = __commonJS({
  "node_modules/nests/cjs/index.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.make = exports2.Events = void 0;
    var Events_1 = require_Events();
    Object.defineProperty(exports2, "Events", { enumerable: true, get: function() {
      return __importDefault(Events_1).default;
    } });
    var make_1 = require_make();
    Object.defineProperty(exports2, "make", { enumerable: true, get: function() {
      return __importDefault(make_1).default;
    } });
  }
});

// node_modules/idb-keyval/dist/index.cjs
var require_dist = __commonJS({
  "node_modules/idb-keyval/dist/index.cjs"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function promisifyRequest(request) {
      return new Promise((resolve, reject) => {
        request.oncomplete = request.onsuccess = () => resolve(request.result);
        request.onabort = request.onerror = () => reject(request.error);
      });
    }
    function createStore(dbName, storeName) {
      const request = indexedDB.open(dbName);
      request.onupgradeneeded = () => request.result.createObjectStore(storeName);
      const dbp = promisifyRequest(request);
      return (txMode, callback) => dbp.then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
    }
    var defaultGetStoreFunc;
    function defaultGetStore() {
      if (!defaultGetStoreFunc) {
        defaultGetStoreFunc = createStore("keyval-store", "keyval");
      }
      return defaultGetStoreFunc;
    }
    function get(key, customStore = defaultGetStore()) {
      return customStore("readonly", (store) => promisifyRequest(store.get(key)));
    }
    function set(key, value, customStore = defaultGetStore()) {
      return customStore("readwrite", (store) => {
        store.put(value, key);
        return promisifyRequest(store.transaction);
      });
    }
    function setMany(entries2, customStore = defaultGetStore()) {
      return customStore("readwrite", (store) => {
        entries2.forEach((entry) => store.put(entry[1], entry[0]));
        return promisifyRequest(store.transaction);
      });
    }
    function getMany(keys2, customStore = defaultGetStore()) {
      return customStore("readonly", (store) => Promise.all(keys2.map((key) => promisifyRequest(store.get(key)))));
    }
    function update(key, updater, customStore = defaultGetStore()) {
      return customStore("readwrite", (store) => new Promise((resolve, reject) => {
        store.get(key).onsuccess = function() {
          try {
            store.put(updater(this.result), key);
            resolve(promisifyRequest(store.transaction));
          } catch (err) {
            reject(err);
          }
        };
      }));
    }
    function del(key, customStore = defaultGetStore()) {
      return customStore("readwrite", (store) => {
        store.delete(key);
        return promisifyRequest(store.transaction);
      });
    }
    function delMany(keys2, customStore = defaultGetStore()) {
      return customStore("readwrite", (store) => {
        keys2.forEach((key) => store.delete(key));
        return promisifyRequest(store.transaction);
      });
    }
    function clear(customStore = defaultGetStore()) {
      return customStore("readwrite", (store) => {
        store.clear();
        return promisifyRequest(store.transaction);
      });
    }
    function eachCursor(store, callback) {
      store.openCursor().onsuccess = function() {
        if (!this.result)
          return;
        callback(this.result);
        this.result.continue();
      };
      return promisifyRequest(store.transaction);
    }
    function keys(customStore = defaultGetStore()) {
      return customStore("readonly", (store) => {
        if (store.getAllKeys) {
          return promisifyRequest(store.getAllKeys());
        }
        const items = [];
        return eachCursor(store, (cursor) => items.push(cursor.key)).then(() => items);
      });
    }
    function values(customStore = defaultGetStore()) {
      return customStore("readonly", (store) => {
        if (store.getAll) {
          return promisifyRequest(store.getAll());
        }
        const items = [];
        return eachCursor(store, (cursor) => items.push(cursor.value)).then(() => items);
      });
    }
    function entries(customStore = defaultGetStore()) {
      return customStore("readonly", (store) => {
        if (store.getAll && store.getAllKeys) {
          return Promise.all([
            promisifyRequest(store.getAllKeys()),
            promisifyRequest(store.getAll())
          ]).then(([keys2, values2]) => keys2.map((key, i) => [key, values2[i]]));
        }
        const items = [];
        return customStore("readonly", (store2) => eachCursor(store2, (cursor) => items.push([cursor.key, cursor.value])).then(() => items));
      });
    }
    exports2.clear = clear;
    exports2.createStore = createStore;
    exports2.del = del;
    exports2.delMany = delMany;
    exports2.entries = entries;
    exports2.get = get;
    exports2.getMany = getMany;
    exports2.keys = keys;
    exports2.promisifyRequest = promisifyRequest;
    exports2.set = set;
    exports2.setMany = setMany;
    exports2.update = update;
    exports2.values = values;
  }
});

// node_modules/json-decycle/index.js
var require_json_decycle = __commonJS({
  "node_modules/json-decycle/index.js"(exports2) {
    exports2.Map = Map;
    exports2.WeakMap = WeakMap;
    exports2.WeakSet = WeakSet;
    exports2.Set = Set;
    var isObject = (value) => typeof value === "object" && value != null && !(value instanceof Boolean) && !(value instanceof Date) && !(value instanceof Number) && !(value instanceof RegExp) && !(value instanceof String);
    var toPointer = (parts) => "#" + parts.map((part) => String(part).replace(/~/g, "~0").replace(/\//g, "~1")).join("/");
    var decycle = () => {
      const paths = new exports2.WeakMap();
      return function replacer(key, value) {
        if (key !== "$ref" && isObject(value)) {
          const seen = paths.has(value);
          if (seen) {
            return { $ref: toPointer(paths.get(value)) };
          } else {
            paths.set(value, [...paths.get(this) ?? [], key]);
          }
        }
        return value;
      };
    };
    function retrocycle() {
      const parents = new exports2.WeakMap();
      const keys = new exports2.WeakMap();
      const refs = new exports2.Set();
      function dereference(ref) {
        const parts = ref.$ref.slice(1).split("/");
        let key, parent, value = this;
        for (var i = 0; i < parts.length; i++) {
          key = parts[i].replace(/~1/g, "/").replace(/~0/g, "~");
          value = value[key];
        }
        parent = parents.get(ref);
        parent[keys.get(ref)] = value;
      }
      return function reviver(key, value) {
        if (key === "$ref") {
          refs.add(this);
        } else if (isObject(value)) {
          var isRoot = key === "" && Object.keys(this).length === 1;
          if (isRoot) {
            refs.forEach(dereference, this);
          } else {
            parents.set(value, this);
            keys.set(value, key);
          }
        }
        return value;
      };
    }
    var extend = (JSON2) => {
      return Object.defineProperties(JSON2, {
        decycle: {
          value: (object, space) => JSON2.stringify(object, decycle(), space)
        },
        retrocycle: {
          value: (s) => JSON2.parse(s, retrocycle())
        }
      });
    };
    Object.assign(exports2, {
      decycle,
      retrocycle,
      extend
    });
  }
});

// src/utils/createPersistentNest.js
var require_createPersistentNest = __commonJS({
  "src/utils/createPersistentNest.js"(exports2, module2) {
    var nests = require_cjs2();
    var idbKeyval = require_dist();
    var { decycle, retrocycle } = require_json_decycle();
    async function createPersistentNest(suffix) {
      let cached = await idbKeyval.get(`AcordStore;${suffix}`);
      if (typeof cached == "string")
        cached = JSON.parse(cached, retrocycle());
      const nest = nests.make(cached ?? {});
      const save = () => {
        try {
          idbKeyval.set(`AcordStore;${suffix}`, JSON.stringify({ ...nest.ghost }, decycle()));
        } catch {
          idbKeyval.set(`AcordStore;${suffix}`, JSON.stringify({}));
        }
      };
      nest.on(nests.Events.SET, save);
      nest.on(nests.Events.UPDATE, save);
      nest.on(nests.Events.DELETE, save);
      return nest;
    }
    module2.exports = createPersistentNest;
  }
});

// src/modules/src/extensions/raw/i18n.js
var require_i18n2 = __commonJS({
  "src/modules/src/extensions/raw/i18n.js"(exports2, module2) {
    var utils = require_utils()();
    module2.exports = async (config2) => {
      let locales = {};
      let validLocales = [];
      let base = null;
      if (typeof config2 == "string") {
        base = config2;
        if (base.endsWith("/"))
          base = base.slice(0, -1);
        try {
          validLocales = await (await fetch(`${base}/locales.json`, noStore)).json();
          locales.default = await (await fetch(`${base}/default.json`, noStore)).json();
        } catch (err) {
          console.error(err);
        }
        for (let i = 0; i < validLocales.length; i++) {
          const locale = validLocales[i];
          try {
            locales[locale] = await (await fetch(`${base}/${locale}.json`, noStore)).json();
          } catch (err) {
            console.error(err);
          }
        }
      } else {
        locales = config2;
        validLocales = Object.keys(config2);
        if (validLocales.includes("default"))
          validLocales.splice(validLocales.indexOf("default"), 1);
      }
      async function updateLocales() {
        if (!base)
          return;
        let currentLocale = acord.i18n.locale;
        if (locales[currentLocale] || !validLocales.includes(currentLocale))
          return;
        try {
          locales[currentLocale] = await (await fetch(`${base}/${currentLocale}.json`, noStore)).json();
        } catch (err) {
          console.error(err);
        }
      }
      const messages = new Proxy(
        {},
        {
          get(_2, prop) {
            if (!window.acord)
              return prop;
            updateLocales();
            return locales[acord.i18n.locale]?.[prop] || locales.default?.[prop] || acord.i18n.messages[prop] || prop;
          }
        }
      );
      function format(key, ...args) {
        return utils.format(messages[key], ...args);
      }
      return {
        messages,
        format
      };
    };
  }
});

// src/classes/BasicEventEmitter.js
var require_BasicEventEmitter = __commonJS({
  "src/classes/BasicEventEmitter.js"(exports2, module2) {
    module2.exports = class BasicEventEmitter {
      constructor() {
        this.listeners = /* @__PURE__ */ new Map();
      }
      _prepareListenersMap(eventName) {
        if (!this.listeners.has(eventName))
          this.listeners.set(eventName, /* @__PURE__ */ new Map());
      }
      on(eventName, listener) {
        this._prepareListenersMap(eventName);
        this.listeners.get(eventName).set(listener, { once: false });
        return () => {
          this.listeners.get(eventName).delete(listener);
        };
      }
      once(eventName, listener) {
        this._prepareListenersMap(eventName);
        this.listeners.get(eventName)?.set(listener, { once: true });
        return () => {
          this.listeners.get(eventName).delete(listener);
        };
      }
      off(eventName, listener) {
        if (!eventName)
          return this.listeners = /* @__PURE__ */ new Map();
        if (!listener)
          return this.listeners?.delete(eventName);
        this.listeners.get(eventName)?.delete(listener);
      }
      emit(eventName, ...args) {
        if (!this.listeners.has(eventName))
          return;
        let eventMap = this.listeners.get(eventName);
        eventMap.forEach(({ once }, listener) => {
          if (once)
            eventMap?.delete(listener);
          listener(...args);
        });
      }
    };
  }
});

// src/modules/src/extensions/index.js
var require_extensions = __commonJS({
  "src/modules/src/extensions/index.js"(exports2, module2) {
    var createPersistentNest = require_createPersistentNest();
    var nests = require_cjs2();
    var logger = require_logger()();
    var extensionI18N = require_i18n2();
    var BasicEventEmitter = require_BasicEventEmitter();
    var cacher2 = require_cacher();
    var noStore2 = { cache: "no-store" };
    var enabledStore = nests.make({});
    var loadedStore = null;
    var __eval__ = window.eval;
    async function buildAPI(data) {
      return Object.assign(
        {
          extension: Object.assign(data, {
            i18n: await extensionI18N(data.manifest.i18n || {}),
            events: new BasicEventEmitter(),
            subscriptions: []
          })
        },
        window.acord
      );
    }
    async function evaluate(extensionCode, data) {
      const extensionAPI = await buildAPI(data);
      const extensionString = `(acord)=>{ try { return ${extensionCode} } catch (err) { throw err; } }
//#sourceURL=${data.url}`;
      const extensionRet = __eval__(extensionString)(extensionAPI);
      let ret = typeof extensionRet == "function" ? extensionRet(data) : extensionRet;
      ret.api = extensionAPI;
      return ret;
    }
    async function init() {
      loadedStore = await createPersistentNest("LoadedExtensionsStore");
    }
    async function start(extensionURL) {
      const extension = loadedStore.ghost[extensionURL];
      if (!extension)
        throw new Error(`EXTENSION_NOT_FOUND ${extensionURL}`);
      if (enabledStore.ghost[extensionURL])
        throw new Error(`EXTENSION_ALREADY_ENABLED ${extensionURL}`);
      if (extension.manifest.eula && !extension.eulaAccepted) {
        let accepted = await acord.ui.modals.show.confirmation(
          acord.i18n.format("ACCEPT_EXTENSION_EULA"),
          typeof extension.manifest.eula == "string" ? extension.manifest.eula : acord.i18n.format("ACCEPT_EXTENSION_EULA_DESCRIPTION")
        );
        if (!accepted)
          return;
        loadedStore.store[extensionURL].eulaAccepted = true;
      }
      let evaledExtension;
      let removeInstantly = false;
      let persist = await createPersistentNest(extensionURL);
      try {
        evaledExtension = await evaluate(extension.source, {
          persist,
          url: extensionURL,
          manifest: extension.manifest
        });
        if (Array.isArray(evaledExtension?.settings?.data)) {
          evaledExtension.settings.data.forEach((item) => {
            if (item.property && typeof persist.ghost.settings?.[item.property] == "undefined") {
              persist.store.settings[item.property] = item.value;
            }
          });
        }
      } catch (e) {
        logger.error(
          "EXTENSION_EVAL_ERR",
          extension.manifest.about.name,
          `${e} ${e?.stack?.join?.("\n")}`
        );
        removeInstantly = true;
      }
      try {
        evaledExtension.load?.();
        if (!extension.manifest.locked)
          acord.ui.toasts.show(
            acord.i18n.format(
              `IMPORTING_${extension.manifest.type.toUpperCase()}`,
              extension.manifest.about.name
            )
          );
      } catch (e) {
        logger.error("EXTENSION_LOAD_ERR", extension.manifest.about.name, e);
        acord.ui.toasts.show(
          acord.i18n.format("EXTENSION_LOAD_ERROR", extension.manifest.about.name)
        );
      }
      enabledStore.store[extensionURL] = evaledExtension;
      if (removeInstantly)
        setTimeout(() => {
          try {
            extension.unload();
          } catch (e) {
            logger.error("EXTENSION_UNLOAD_ERR", extension.manifest.about.name, e);
            acord.ui.toasts.show(
              acord.i18n.format(
                "EXTENSION_UNLOAD_ERROR",
                extension.manifest.about.name
              )
            );
          }
          extension.enabled = false;
        });
    }
    function stop(extensionId) {
      const extensionSrc = enabledStore.ghost[extensionId];
      const extension = loadedStore.ghost[extensionId];
      if (!extensionSrc)
        throw new Error(`EXTENSION_NOT_FOUND ${extensionId}`);
      if (!enabledStore.ghost[extensionId])
        throw new Error(`EXTENSION_NOT_LOADED ${extensionId}`);
      try {
        extensionSrc.api.extension.subscriptions.forEach((f) => {
          if (typeof f === "function")
            f();
        });
        extensionSrc.api.extension.subscriptions.length = 0;
        extensionSrc.unload();
        acord.ui.toasts.show(
          acord.i18n.format(
            `STOPPING_${extension.manifest.type.toUpperCase()}`,
            extension.manifest.about.name
          )
        );
      } catch (e) {
        logger.error("EXTENSION_UNLOAD_ERR", extension.manifest.about.name, e);
        acord.ui.toasts.show(
          acord.i18n.format("EXTENSION_UNLOAD_ERROR", extension.manifest.about.name)
        );
      }
      delete enabledStore.store[extensionId];
    }
    async function toggle(extensionId) {
      const extension = loadedStore.store[extensionId];
      if (!loadedStore.ghost?.[extensionId])
        throw new Error(`EXTENSION_NOT_FOUND ${extensionId}`);
      if (extension.enabled) {
        await stop(extensionId);
        extension.enabled = false;
      } else {
        await start(extensionId);
        extension.enabled = true;
      }
    }
    async function load(baseUrl, autoEnable = true) {
      const baseUrlTrailing = baseUrl.replace(/\/?$/, "/");
      const manifestUrl = new URL("extension.json", baseUrlTrailing).href;
      const extensionUrl = new URL("extension.js", baseUrlTrailing).href;
      const extensionExists = loadedStore.ghost?.[baseUrlTrailing];
      const existingExtension = !extensionExists ? void 0 : loadedStore.store[baseUrlTrailing];
      const enabled = extensionExists?.enabled ?? autoEnable;
      let verified = /^https?:\/\/raw\.githubusercontent\.com\/AcordPlugin/.test(
        baseUrlTrailing
      );
      let manifestJson;
      try {
        let manifestData = await fetch(manifestUrl, noStore2);
        manifestJson = await manifestData.json();
        if (manifestData.status !== 200 && !extensionExists) {
          if (extensionExists)
            delete loadedStore.store[baseUrlTrailing];
          throw "NO_MAN_200";
        }
      } catch (e) {
        throw new Error(`NO_PARSE ${e}`);
      }
      if (manifestJson.locked && !verified)
        throw new Error("INVALID_LOCKED");
      if (!["plugin", "theme"].includes(manifestJson?.type))
        throw new Error("INVALID_TYPE");
      if (extensionExists) {
        if (manifestJson) {
          if (existingExtension.manifest.hash !== manifestJson.hash) {
            let extensionCodeReq = await fetch(extensionUrl, noStore2);
            if (extensionCodeReq.status !== 200) {
              delete loadedStore.store[baseUrlTrailing];
              throw new Error("NO_200");
            }
            existingExtension.source = await extensionCodeReq.text();
          }
          if (!_.isEqual(existingExtension.manifest, manifestJson))
            existingExtension.manifest = manifestJson;
        }
        if (enabled)
          await start(baseUrlTrailing);
        return;
      }
      let extensionReq = await fetch(extensionUrl, noStore2);
      if (extensionReq.status !== 200)
        throw new Error("NO_200");
      const source = await extensionReq.text();
      loadedStore.store[baseUrlTrailing] = {
        manifest: manifestJson,
        verified,
        source,
        enabled,
        url: baseUrlTrailing
      };
      if (enabled)
        await start(baseUrlTrailing);
    }
    function remove(extensionId) {
      let extension = loadedStore.ghost?.[extensionId];
      if (!extension)
        return;
      try {
        stop(extensionId);
      } catch {
      }
      if (!extension.manifest.locked)
        delete loadedStore.store[extensionId];
    }
    var fixturePlugins = [
      "https://raw.githubusercontent.com/AcordPlugin/plugins/main/fixtures/acord-ui/dist/",
      "https://raw.githubusercontent.com/AcordPlugin/releases/main/fixture/"
    ];
    async function startAll() {
      await Promise.allSettled(Object.keys(loadedStore.ghost).map(load));
      fixturePlugins.forEach((url) => {
        if (!loadedStore.ghost?.[url])
          load(url);
      });
    }
    function stopAll() {
      Object.keys(loadedStore.ghost).forEach((extension) => {
        try {
          stop(extension);
        } catch {
        }
      });
    }
    async function reload(extensionId) {
      let isEnabled = !!loadedStore.ghost[extensionId]?.enabled;
      try {
        remove(extensionId);
      } catch {
      }
      try {
        await load(extensionId, isEnabled);
      } catch {
      }
    }
    async function reloadAll() {
      let plugins = Object.entries(loadedStore.store);
      for (let i = 0; i < plugins.length; i++) {
        await reload(plugins[i][0], plugins[i][1].enabled);
      }
    }
    module2.exports = cacher2(() => {
      return {
        evaluate,
        load,
        init,
        startAll,
        reloadAll,
        reload,
        buildAPI,
        nests: {
          get enabled() {
            return enabledStore;
          },
          get loaded() {
            return loadedStore;
          }
        },
        remove,
        start,
        stop,
        toggle,
        stopAll
      };
    });
  }
});

// src/modules/src/websocket/index.js
var require_websocket = __commonJS({
  "src/modules/src/websocket/index.js"(exports2, module2) {
    var cacher2 = require_cacher();
    var patcherLoader = require_patcher();
    var extensionsLoader = require_extensions();
    module2.exports = cacher2((Library) => {
      const patcher = patcherLoader(Library);
      const extensions = extensionsLoader(Library);
      let wsModule = Library.WebpackModules.find(
        (m) => m?.__proto__?.handleConnection
      );
      let sockets = /* @__PURE__ */ new Set();
      let socketEvents = /* @__PURE__ */ new Map();
      async function messageHandler(ws, msg) {
        let json;
        try {
          json = JSON.parse(msg);
          if (!Array.isArray(json) || json.length < 1 || json.length > 3)
            throw "Array expected as message.";
          if (typeof json[0] != "string")
            throw "Array[0] needs to be string.";
          if (typeof json[1] != "string")
            throw "Array[1] needs to be string.";
        } catch (err) {
          ws.send(
            JSON.stringify([
              null,
              {
                ok: false,
                error: `${err}`
              }
            ])
          );
        }
        let [eventId, eventName, eventData] = json;
        let handler = socketEvents.get(eventName);
        if (!handler)
          return ws.send(
            JSON.stringify([
              eventId,
              {
                ok: false,
                error: `Unable to find handler.`
              }
            ])
          );
        try {
          let response = await handler(eventData);
          ws.send(
            JSON.stringify([
              eventId,
              {
                ok: true,
                data: response
              }
            ])
          );
        } catch (err) {
          ws.send(
            JSON.stringify([
              eventId,
              {
                ok: false,
                error: `${err}`
              }
            ])
          );
        }
      }
      function set(eventName, callback) {
        if (typeof eventName != "string")
          throw new Error("EventName needs to be a string.");
        if (typeof callback != "function")
          throw new Error("Callback needs to be a function.");
        if (socketEvents.has(eventName))
          throw new Error("EventName already in use.");
        socketEvents.set(eventName, callback);
        return () => {
          socketEvents.delete(eventName);
        };
      }
      let unpatchWebsocket = patcher.instead(
        "handleConnection",
        wsModule,
        (args, orig) => {
          const ws = args[0];
          if (ws.upgradeReq().url !== "/acord")
            return orig(...args);
          sockets.add(ws);
          ws.on("message", (msg) => {
            messageHandler(ws, msg);
          });
          ws.on("close", () => sockets.delete(ws));
        }
      );
      function unpatch() {
        unpatchWebsocket();
        socketEvents.clear();
        sockets.forEach((socket) => socket.close());
      }
      function trigger(eventName, ...args) {
        if (!socketEvents.has(eventName))
          throw new Error("Unable to find handler!");
        return socketEvents.get(eventName)(...args);
      }
      set("InstallExtension", async ({ url } = {}) => {
        if (!url)
          return;
        await DiscordNative.window.setAlwaysOnTop(0, true);
        await new Promise((r) => setTimeout(r, 100));
        await DiscordNative.window.setAlwaysOnTop(0, false);
        let success = await acord.ui.modals.show.confirmation(
          acord.i18n.format("IMPORT_EXTENSION"),
          acord.i18n.format("IMPORT_EXTENSION_DESCRIPTION", url)
        );
        if (!success)
          return;
        try {
          await extensions.load(url);
        } catch (err) {
          acord.ui.toasts.show.error(`${err}`);
        }
      });
      return { unpatch, set, trigger };
    });
  }
});

// src/modules/src/ui/modals.js
var require_modals = __commonJS({
  "src/modules/src/ui/modals.js"(exports2, module2) {
    var cacher2 = require_cacher();
    var commonLoader = require_common();
    module2.exports = cacher2((Library) => {
      let common = commonLoader(Library);
      return {
        show: Object.assign((...args) => Library.Modals.showModal(...args), {
          confirmation: (title, content, options = {}) => {
            return new Promise((resolve) => {
              Library.Modals.showConfirmationModal(title, content, {
                onConfirm: () => resolve(true),
                onCancel: () => resolve(false),
                confirmText: options?.confirm,
                cancelText: options?.cancel,
                danger: options?.danger
              });
            });
          },
          alert: (title, content) => Library.Modals.showAlertModal(title, content),
          user: (userId) => common.FluxDispatcher.dispatch({ type: "USER_PROFILE_MODAL_OPEN", userId })
        })
      };
    });
  }
});

// src/modules/src/events/index.js
var require_events = __commonJS({
  "src/modules/src/events/index.js"(exports2, module2) {
    var cacher2 = require_cacher();
    var BasicEventEmitter = require_BasicEventEmitter();
    var events = new BasicEventEmitter();
    module2.exports = cacher2(() => {
      return events;
    });
  }
});

// src/modules/src/dom/index.js
var require_dom = __commonJS({
  "src/modules/src/dom/index.js"(exports2, module2) {
    var cacher2 = require_cacher();
    var events = require_events()();
    var formatRegexes = {
      bold: /\*\*([^*]+)\*\*/g,
      italic: /\*([^*]+)\*/g,
      underline: /\_([^*]+)\_/g,
      strike: /\~\~([^*]+)\~\~/g,
      url: /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
      inline: /\`([^*]+)\`/g,
      codeblockSingle: /\`\`\`([^*]+)\`\`\`/g,
      codeblockMulti: /\`\`\`(\w+)\n((?:(?!\`\`\`)[\s\S])*)\`\`\`/g
    };
    var modulesLoader = require_modules();
    module2.exports = cacher2((Library) => {
      const modules = modulesLoader(Library);
      const scrollbarClasses = modules.webpack.findByProps("scrollbarGhostHairline", "spinner");
      function formatContent(msg) {
        if (!msg)
          return "";
        const { bold, italic, underline, strike, codeblockMulti, codeblockSingle, inline, url } = formatRegexes;
        const codeBlocksMap = Object.fromEntries([
          ...msg.matchAll(codeblockMulti) || [],
          ...msg.matchAll(codeblockSingle) || []
        ].map(
          ([_2, codeBlockOrCode, codeBlockContent], i) => {
            msg = msg.replace(_2, `{{CODEBLOCK_${i}}}`);
            return [
              `{{CODEBLOCK_${i}}}`,
              codeBlockContent ? `<pre><code class="${scrollbarClasses.scrollbarGhostHairline} hljs ${codeBlockOrCode}" style="position: relative;">${modules.common.hljs.highlight(codeBlockOrCode, codeBlockContent).value}</code></pre>` : `<pre><code class="${scrollbarClasses.scrollbarGhostHairline} hljs" style="position: relative;">${codeBlockOrCode}</code></pre>`
            ];
          }
        ));
        const inlineMap = Object.fromEntries(
          [...msg.matchAll(inline) || []].map(
            ([_2, inlineContent], i) => {
              msg = msg.replace(_2, `{{INLINE_${i}}}`);
              return [`{{INLINE_${i}}}`, `<code class="inline">${inlineContent}</code>`];
            }
          )
        );
        msg = msg.replace(bold, "<b>$1</b>").replace(italic, "<i>$1</i>").replace(underline, "<U>$1</U>").replace(strike, "<s>$1</s>").replace(url, '<a href="$1">$1</a>');
        for (const [key, value] of Object.entries(codeBlocksMap)) {
          msg = msg.replace(key, value);
        }
        for (const [key, value] of Object.entries(inlineMap)) {
          msg = msg.replace(key, value);
        }
        return msg;
      }
      return {
        formatContent,
        createElement: (type, props, ...children) => {
          if (typeof type === "function")
            return type({ ...props, children: [].concat(...children) });
          const node = document.createElement(type);
          for (const key of Object.keys(props)) {
            if (key.indexOf("on") === 0)
              node.addEventListener(key.slice(2).toLowerCase(), props[key]);
            else if (key === "children") {
              node.append(
                ...Array.isArray(props[key]) ? props[key] : [].concat(props[key])
              );
            } else {
              node.setAttribute(key === "className" ? "class" : key, props[key]);
            }
          }
          if (children.length)
            node.append(...children);
          return node;
        },
        parseHTML: (html) => Library.DOMTools.parseHTML(html, true).firstElementChild,
        parents: Library.DOMTools.parents,
        escapeHTML: Library.DOMTools.escapeHTML,
        toCSSProp(o) {
          let elm = document.createElement("div");
          Object.entries(o).forEach((i) => {
            if (elm.style.hasOwnProperty(i[0])) {
              elm.style[i[0]] = i[1];
            } else {
              elm.style.setProperty(i[0], i[1]);
            }
          });
          return elm.getAttribute("style");
        },
        toHTMLProps(o) {
          return Object.entries(o).map(
            (i) => `${i[0].replace(/ +/, "-")}="${i[0] == "style" && typeof i[1] != "string" ? this.toCSSProp(i[1]) : this.escapeHTML(i[1])}"`
          ).join(" ");
        },
        patch: (selector, cb, instantTryPatch = false) => (() => {
          function nodeAdded(node) {
            if (node.nodeType === Node.TEXT_NODE)
              return;
            node.querySelectorAll(selector).forEach(async (elm) => {
              if (!elm.acord) {
                elm.acord = { unmount: [], patched: /* @__PURE__ */ new Set() };
                elm.classList.add("acord--patched");
              }
              if (elm.acord.patched.has(cb))
                return;
              elm.acord.patched.add(cb);
              let unpatchCb = await cb(elm);
              if (typeof unpatchCb === "function")
                elm.acord.unmount.push(unpatchCb);
            });
          }
          if (instantTryPatch)
            document.querySelectorAll(selector).forEach(nodeAdded);
          return events.on(
            "domMutation",
            (mut) => {
              mut.addedNodes.forEach(nodeAdded);
              mut.removedNodes.forEach((node) => {
                if (node.nodeType === Node.TEXT_NODE)
                  return;
                node.querySelectorAll(selector).forEach(async (elm) => {
                  if (!elm.acord)
                    return;
                  elm.acord.unmount.forEach((f) => f());
                });
              });
            }
          );
        })()
      };
    });
  }
});

// src/modules/src/ui/notifications.js
var require_notifications = __commonJS({
  "src/modules/src/ui/notifications.js"(exports2, module2) {
    var cacher2 = require_cacher();
    var domLoader = require_dom();
    var patcherLoader = require_patcher();
    var utils = require_utils()();
    module2.exports = cacher2((Library) => {
      const dom = domLoader(Library);
      const patcher = patcherLoader(Library);
      patcher.injectCSS(`
      .acord--notif-container {
          width: 100vw;
          height: 100vh;
          z-index: 9999999;
          pointer-events: none;
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          flex-direction: column;
          position: absolute;
          top: 0px;
          left: 0px;
      }
      .acord--notif { 
          display: flex; 
          flex-direction: column;
          pointer-events: all;
          transition: transform 250ms ease-in-out, opacity 250ms ease-in-out;
          margin-top: 8px;
          margin-right: 8px;
          backdrop-filter: blur(16px) brightness(0.75);
          z-index: 99999999;
      }
      .acord--notif.clickable { 
          cursor: pointer;
      }
      .acord--notif.style-info { --bar-color: #4a8fe1; }
      .acord--notif.style-warning { --bar-color: #faa81a; }
      .acord--notif.style-error { --bar-color: #ed4245; }
      .acord--notif.style-success { --bar-color: #3ba55d; }
      .acord--notif.style-default { --bar-color: whitesmoke; }
  
      .acord--notif .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px;
          color: white;
          min-width: 250px;
      }
  
      .acord--notif .container .close {
          width: 24px;
          height: 24px;
          color: white;
          opacity: 0.5;
          cursor: pointer;
          margin-left: 8px;
          z-index: 999999999;
      }
  
      .acord--notif .container .close.hidden {
          display: none;
      }
  
      .acord--notif .progress-container {
          width: 100%;
          height: 5px;
      }
  
      .acord--notif .progress-container .progress {
          width: 0%;
          height: 5px;
          transition: width var(--duration, 5000ms) linear;
          background-color: var(--bar-color);
      }
  
      .acord--notif .progress-container .progress.progressing {
          width: 100%;
      }
  
      .acord--notif.hidden {
          transform: translate(0, -50px);
          opacity: 0;
      }
  
      .acord--notif.closing {
          transform: translate(0, 50px);
          opacity: 0;
      }
    `);
      function show(contentHTML, {
        style = "default",
        timeout = 5e3,
        onClose = () => null,
        closable = true,
        onClick = null
      } = {}) {
        let appElm = document.querySelector(
          '[class*="notDevTools-"]'
        );
        let container = appElm.querySelector(".acord--notif-container");
        if (!container) {
          container = dom.parseHTML(`<div class="acord--notif-container"></div>`);
          appElm.appendChild(container);
        }
        let notifElm = dom.parseHTML(`
          <div class="acord--notif style-${style} hidden">
              <div class="container">
                  <div class="content">
                      ${contentHTML}
                  </div>
                  <svg class="close ${!closable ? "hidden" : ""}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="currentColor" d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
                  </svg>
              </div>
              <div class="progress-container" style="--duration: ${timeout}ms;">
                  <div class="progress"></div>
              </div>
          </div>
      `);
        let closed = false;
        function close(closeType) {
          if (closed)
            return;
          closed = true;
          notifElm.classList.add("closing");
          setTimeout(() => {
            notifElm.remove();
          }, 275);
          onClose(closeType);
        }
        if (typeof onClick == "function") {
          notifElm.classList.add("clickable");
          notifElm.onclick = () => {
            onClick(close);
          };
        }
        utils.ifExists(notifElm.querySelector(".close"), (elm) => {
          elm.onclick = () => {
            close("user");
          };
        });
        container.prepend(notifElm);
        requestAnimationFrame(() => {
          notifElm.classList.remove("hidden");
          notifElm.querySelector(".progress").classList.add("progressing");
        });
        setTimeout(() => {
          close("timeout");
        }, timeout);
        return () => {
          close("force");
        };
      }
      return {
        show: Object.assign(show, {
          info: (html, obj = {}) => show(html, { ...obj, style: "info" }),
          error: (html, obj = {}) => show(html, { ...obj, style: "error" }),
          warning: (html, obj = {}) => show(html, { ...obj, style: "warning" }),
          success: (html, obj = {}) => show(html, { ...obj, style: "success" })
        })
      };
    });
  }
});

// src/modules/src/ui/index.js
var require_ui = __commonJS({
  "src/modules/src/ui/index.js"(exports2, module2) {
    var cacher2 = require_cacher();
    module2.exports = cacher2((Library) => {
      return {
        modals: require_modals()(Library),
        notifications: require_notifications()(Library),
        toasts: {
          show: Object.assign(
            (...args) => BdApi.UI.showToast(...args),
            {
              success: (content) => BdApi.UI.showToast(content, { type: "success" }),
              error: (content) => BdApi.UI.showToast(content, { type: "error" }),
              info: (content) => BdApi.UI.showToast(content, { type: "info" }),
              warning: (content) => BdApi.UI.showToast(content, { type: "warning" })
            }
          )
        },
        notices: {
          show: Object.assign(
            (...args) => BdApi.UI.showNotice(...args),
            {
              success: (content, config2 = {}) => BdApi.UI.showNotice(content, { type: "success", ...config2 }),
              error: (content, config2 = {}) => BdApi.UI.showNotice(content, { type: "error", ...config2 }),
              info: (content, config2 = {}) => BdApi.UI.showNotice(content, { type: "info", ...config2 }),
              warning: (content, config2 = {}) => BdApi.UI.showNotice(content, { type: "warning", ...config2 })
            }
          )
        },
        tooltips: {
          create: Object.assign(
            (el, html, options = {}) => new Library.Tooltip(el, html, { style: "primary", ...options }),
            {
              success: (el, html, options = {}) => new Library.Tooltip(el, html, { style: "green", ...options }),
              error: (el, html, options = {}) => new Library.Tooltip(el, html, { style: "red", ...options }),
              warning: (el, html, options = {}) => new Library.Tooltip(el, html, { style: "yellow", ...options })
            }
          )
        },
        contextMenus: {
          patch: (navId, cb) => BdApi.ContextMenu.patch(navId, cb),
          build: {
            item: (props) => BdApi.ContextMenu.buildItem(props),
            menu: Object.assign(
              (setup) => BdApi.ContextMenu.buildMenu(setup),
              {
                children: (setup) => BdApi.ContextMenu.buildMenuChildren(setup)
              }
            )
          },
          open: (event, component, config2) => BdApi.ContextMenu.open(event, component, config2)
        }
      };
    });
  }
});

// src/modules/src/internal/index.js
var require_internal = __commonJS({
  "src/modules/src/internal/index.js"(exports2, module2) {
    var nests = require_cjs2();
    var idbKeyval = require_dist();
    var createPersistentNest = require_createPersistentNest();
    var cacher2 = require_cacher();
    var semver = require_semver2();
    var checkForUpdates2 = require_checkForUpdates();
    module2.exports = cacher2(() => {
      return { nests, idbKeyval, createPersistentNest, semver, checkForUpdates: () => checkForUpdates2(window.acord) };
    });
  }
});

// src/modules/src/dev/index.js
var require_dev = __commonJS({
  "src/modules/src/dev/index.js"(exports2, module2) {
    var cacher2 = require_cacher();
    var { logger } = require_utils()();
    var nests = require_cjs2();
    var extensions = require_extensions()();
    var websocketLoader = require_websocket();
    module2.exports = cacher2((Library) => {
      let wsApi = websocketLoader(Library);
      let enabledExtension = null;
      let enabledSource = null;
      let enabledManifest = null;
      let persist = nests.make({});
      let isExtensionLoading = false;
      let enabled = false;
      wsApi.set("UpdateDevelopmentExtension", async ({ source, manifest }) => {
        if (!enabled || isExtensionLoading)
          return;
        isExtensionLoading = true;
        if (enabledExtension) {
          logger.log(`Unloading development extension.. (${manifest.about.name})`);
          try {
            enabledExtension?.unload?.();
            enabledExtension = null;
            enabledSource = null;
            enabledManifest = null;
            logger.log(`Development extension unloaded! (${manifest.about.name})`);
          } catch (err) {
            logger.error(
              `Unable to unload development extension! (${manifest.about.name})`,
              err
            );
          }
        }
        await new Promise((r) => setTimeout(r, 1));
        try {
          enabledExtension = await extensions.evaluate(source, {
            persist,
            id: "https://FakeExtensionId",
            manifest
          });
          if (Array.isArray(enabledExtension?.settings?.data)) {
            enabledExtension.settings.data.forEach((item) => {
              if (item.property && typeof persist.ghost.settings?.[item.property] == "undefined") {
                persist.store.settings[item.property] = item.value;
              }
            });
          }
          enabledSource = source;
          enabledManifest = manifest;
          enabledExtension?.load?.();
          logger.log(`Development extension is loaded! (${manifest.about.name})`);
        } catch (err) {
          logger.error(
            `Failed to load development extension! (${manifest.about.name})`,
            err
          );
        } finally {
        }
        isExtensionLoading = false;
      });
      function unload() {
        if (enabledExtension) {
          logger.log("Unloading development extension..");
          try {
            enabledExtension?.unload?.();
            enabledExtension = null;
            enabledSource = null;
            enabledManifest = null;
            if (enabledExtension.api) {
              enabledExtension.api.extension.subscriptions.forEach((f) => {
                if (typeof f === "function")
                  f();
              });
              enabledExtension.api.extension.subscriptions.length = 0;
            }
            logger.log("Development extension unloaded!");
          } catch (err) {
            logger.error("Unable to unload development extension!", err);
          }
          return true;
        }
        return false;
      }
      return {
        get extension() {
          return {
            loaded: enabledSource ? {
              source: enabledSource,
              manifest: enabledManifest
            } : null,
            enabled: enabledExtension
          };
        },
        get enabled() {
          return enabled;
        },
        set enabled(v) {
          enabled = !!v;
        },
        unload
      };
    });
  }
});

// src/modules/index.js
var require_modules2 = __commonJS({
  "src/modules/index.js"(exports2, module2) {
    var cacher2 = require_cacher();
    module2.exports = cacher2((Library) => {
      return {
        modules: require_modules()(Library),
        patcher: require_patcher()(Library),
        i18n: require_i18n()(Library),
        utils: require_utils()(Library),
        webpack: require_websocket()(Library),
        ui: require_ui()(Library),
        internal: require_internal()(Library),
        events: require_events()(Library),
        extensions: require_extensions()(Library),
        dev: require_dev()(Library),
        websocket: require_websocket()(Library),
        dom: require_dom()(Library),
        other: {}
      };
    });
  }
});

// src/index.js
var config = require_config();
var patchTooltips = require_patchTooltips();
var cacher = require_cacher();
var checkForBlocked = require_checkForBlocked();
var checkForUpdates = require_checkForUpdates();
var { delCommonData, fetchCommonData } = require_fetchCommonData();
var patchContainer = require_patchContainer();
var plugin = (Plugin, Library) => {
  return class extends Plugin {
    async onStart() {
      if (window.acord)
        return;
      await fetchCommonData();
      let api = require_modules2()(Library);
      await api.i18n.init();
      if (await checkForUpdates(api))
        return;
      api.patcher.injectCSS(`[class*="acord--"] * {box-sizing: border-box;}`);
      api = Object.assign(api, {
        unload() {
          api.patcher.unpatchAll();
          api.patcher.unpatchAllCSS();
          api.extensions.stopAll();
          api.websocket.unpatch();
          api.dev.unload();
          patchContainer.removeAll();
          cacher.clear();
          delCommonData();
        }
      });
      if (await checkForBlocked(api, false))
        return;
      patchContainer.add(api.utils.interval(async () => {
        if (await checkForBlocked(api, true))
          return;
        await checkForUpdates(api);
      }, 1e3 * 60 * 60));
      globalThis.acord = api;
      window.acord = api;
      patchTooltips(Library);
      api.utils.logger.log(api.i18n.messages.ACORD_LOADED);
      api.ui.notifications.show.success(api.i18n.messages.ACORD_LOADED);
      await api.extensions.init();
      await api.extensions.startAll();
    }
    observer(mut) {
      if (globalThis.acord) {
        acord.events.emit("domMutation", mut);
      }
    }
    onStop() {
      acord.ui.notifications.show.success(
        acord.i18n.messages.ACORD_UNLOADED
      );
      acord.utils.logger.log(
        acord.i18n.messages.ACORD_UNLOADED
      );
      try {
        acord.events.emit("unload");
        acord.unload();
      } catch {
      }
      delete window.acord;
      delete globalThis.acord;
    }
  };
};
if (!global.ZLibrary) {
  let STOP_CHECKING = false;
  setTimeout(async () => {
    const request = require("request");
    const { shell } = require("electron");
    const fs = require("fs");
    const path = require("path");
    BdApi.showToast("Downloading Acord dependencies..");
    request.get(
      "https://betterdiscord.app/gh-redirect?id=9",
      async (err, resp, body) => {
        if (err)
          return shell.openExternal("https://betterdiscord.app/Download?id=9");
        if (resp.statusCode === 302) {
          request.get(
            resp.headers.location,
            async (error, response, content) => {
              if (error)
                return shell.openExternal(
                  "https://betterdiscord.app/Download?id=9"
                );
              fs.writeFile(
                path.join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"),
                content,
                () => {
                }
              );
            }
          );
        } else {
          fs.writeFile(
            path.join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"),
            body,
            () => {
            }
          );
        }
      }
    );
    (async () => {
      while (true) {
        if (global.ZLibrary || STOP_CHECKING)
          break;
        await new Promise((r) => setTimeout(r, 500));
      }
      if (global.ZLibrary) {
        BdApi.showToast("Reloading the Acord..");
        BdApi.Plugins.reload("Acord");
        setTimeout(() => {
          if (!BdApi.Plugins.isEnabled("Acord"))
            BdApi.Plugins.enable("Acord");
        }, 1e3);
      }
    })();
  }, 1);
  module.exports = class AcordPlugin {
    constructor(meta) {
    }
    async start() {
    }
    stop() {
      STOP_CHECKING = true;
    }
  };
} else {
  const buildedPlugin = global.ZLibrary.buildPlugin(config);
  module.exports = plugin(...buildedPlugin);
  setTimeout(() => {
    if (!BdApi.Plugins.isEnabled("Acord"))
      BdApi.Plugins.enable("Acord");
  }, 1e3);
}
