(self.webpackChunkgm_mobile=self.webpackChunkgm_mobile||[]).push([[732],{71100:function(C,F,b){"use strict";var k=b(57162),T=b(67294),w=b(57971);function I(a,f){return x(a)||A(a,f)||_(a,f)||E()}function E(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function _(a,f){if(a){if(typeof a=="string")return v(a,f);var e=Object.prototype.toString.call(a).slice(8,-1);if(e==="Object"&&a.constructor&&(e=a.constructor.name),e==="Map"||e==="Set")return Array.from(a);if(e==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return v(a,f)}}function v(a,f){(f==null||f>a.length)&&(f=a.length);for(var e=0,n=new Array(f);e<f;e++)n[e]=a[e];return n}function A(a,f){var e=a==null?null:typeof Symbol!="undefined"&&a[Symbol.iterator]||a["@@iterator"];if(e!=null){var n=[],r=!0,o=!1,i,l;try{for(e=e.call(a);!(r=(i=e.next()).done)&&(n.push(i.value),!(f&&n.length===f));r=!0);}catch(m){o=!0,l=m}finally{try{!r&&e.return!=null&&e.return()}finally{if(o)throw l}}return n}}function x(a){if(Array.isArray(a))return a}var W=function(f){var e,n=useRouteMeta(),r=n.frontmatter,o=useAtomAssets(),i=o.components,l=f.id||r.atomId,m=useIntl();if(!l)throw new Error("`id` properties if required for API component!");var y=i==null?void 0:i[l];return React.createElement("div",{className:"markdown"},React.createElement(Table,null,React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",null,m.formatMessage({id:"api.component.name"})),React.createElement("th",null,m.formatMessage({id:"api.component.description"})),React.createElement("th",null,m.formatMessage({id:"api.component.type"})),React.createElement("th",null,m.formatMessage({id:"api.component.default"})))),React.createElement("tbody",null,y&&(e=y.propsConfig)!==null&&e!==void 0&&e.properties?Object.entries(y.propsConfig.properties).map(function(O){var t,u=I(O,2),c=u[0],p=u[1];return React.createElement("tr",{key:c},React.createElement("td",null,c),React.createElement("td",null,p.description||"--"),React.createElement("td",null,React.createElement("code",null,p.type)),React.createElement("td",null,React.createElement("code",null,(t=y.propsConfig.required)!==null&&t!==void 0&&t.includes(c)?m.formatMessage({id:"api.component.required"}):p.default||"--")))}):React.createElement("tr",null,React.createElement("td",{colSpan:4},m.formatMessage({id:"api.component.".concat(i?"not.found":"unavailable")},{id:l}))))))},B=null},71852:function(C,F,b){"use strict";var k=b(67294);function T(){return T=Object.assign?Object.assign.bind():function(E){for(var _=1;_<arguments.length;_++){var v=arguments[_];for(var A in v)Object.prototype.hasOwnProperty.call(v,A)&&(E[A]=v[A])}return E},T.apply(this,arguments)}var w=function(_){return React.createElement("span",T({className:"dumi-default-badge"},_))},I=null},57971:function(C,F,b){"use strict";var k=b(93096),T=b(67294),w=null;function I(e,n){return x(e)||A(e,n)||_(e,n)||E()}function E(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function _(e,n){if(e){if(typeof e=="string")return v(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);if(r==="Object"&&e.constructor&&(r=e.constructor.name),r==="Map"||r==="Set")return Array.from(e);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return v(e,n)}}function v(e,n){(n==null||n>e.length)&&(n=e.length);for(var r=0,o=new Array(n);r<n;r++)o[r]=e[r];return o}function A(e,n){var r=e==null?null:typeof Symbol!="undefined"&&e[Symbol.iterator]||e["@@iterator"];if(r!=null){var o=[],i=!0,l=!1,m,y;try{for(r=r.call(e);!(i=(m=r.next()).done)&&(o.push(m.value),!(n&&o.length===n));i=!0);}catch(O){l=!0,y=O}finally{try{!i&&r.return!=null&&r.return()}finally{if(l)throw y}}return o}}function x(e){if(Array.isArray(e))return e}function W(e,n){if(e==null)return{};var r=B(e,n),o,i;if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(i=0;i<l.length;i++)o=l[i],!(n.indexOf(o)>=0)&&Object.prototype.propertyIsEnumerable.call(e,o)&&(r[o]=e[o])}return r}function B(e,n){if(e==null)return{};var r={},o=Object.keys(e),i,l;for(l=0;l<o.length;l++)i=o[l],!(n.indexOf(i)>=0)&&(r[i]=e[i]);return r}var a=function(n){var r=n.children,o=W(n,w),i=useRef(null),l=useState(!1),m=I(l,2),y=m[0],O=m[1],t=useState(!1),u=I(t,2),c=u[0],p=u[1];return useEffect(function(){var d=i.current;if(d){var h=throttle(function(){O(d.scrollLeft>0),p(d.scrollLeft<d.scrollWidth-d.offsetWidth)},100);return h(),d.addEventListener("scroll",h),window.addEventListener("resize",h),function(){d.removeEventListener("scroll",h),window.removeEventListener("resize",h)}}},[]),React.createElement("div",{className:"dumi-default-table"},React.createElement("div",{className:"dumi-default-table-content",ref:i,"data-left-folded":y||void 0,"data-right-folded":c||void 0},React.createElement("table",o,r)))},f=null},93096:function(C,F,b){var k="Expected a function",T=NaN,w="[object Symbol]",I=/^\s+|\s+$/g,E=/^[-+]0x[0-9a-f]+$/i,_=/^0b[01]+$/i,v=/^0o[0-7]+$/i,A=parseInt,x=typeof b.g=="object"&&b.g&&b.g.Object===Object&&b.g,W=typeof self=="object"&&self&&self.Object===Object&&self,B=x||W||Function("return this")(),a=Object.prototype,f=a.toString,e=Math.max,n=Math.min,r=function(){return B.Date.now()};function o(t,u,c){var p,d,h,S,g,j,M=0,K=!1,L=!1,N=!0;if(typeof t!="function")throw new TypeError(k);u=O(u)||0,l(c)&&(K=!!c.leading,L="maxWait"in c,h=L?e(O(c.maxWait)||0,u):h,N="trailing"in c?!!c.trailing:N);function $(s){var R=p,P=d;return p=d=void 0,M=s,S=t.apply(P,R),S}function G(s){return M=s,g=setTimeout(D,u),K?$(s):S}function J(s){var R=s-j,P=s-M,X=u-R;return L?n(X,h-P):X}function H(s){var R=s-j,P=s-M;return j===void 0||R>=u||R<0||L&&P>=h}function D(){var s=r();if(H(s))return z(s);g=setTimeout(D,J(s))}function z(s){return g=void 0,N&&p?$(s):(p=d=void 0,S)}function Q(){g!==void 0&&clearTimeout(g),M=0,p=j=d=g=void 0}function V(){return g===void 0?S:z(r())}function U(){var s=r(),R=H(s);if(p=arguments,d=this,j=s,R){if(g===void 0)return G(j);if(L)return g=setTimeout(D,u),$(j)}return g===void 0&&(g=setTimeout(D,u)),S}return U.cancel=Q,U.flush=V,U}function i(t,u,c){var p=!0,d=!0;if(typeof t!="function")throw new TypeError(k);return l(c)&&(p="leading"in c?!!c.leading:p,d="trailing"in c?!!c.trailing:d),o(t,u,{leading:p,maxWait:u,trailing:d})}function l(t){var u=typeof t;return!!t&&(u=="object"||u=="function")}function m(t){return!!t&&typeof t=="object"}function y(t){return typeof t=="symbol"||m(t)&&f.call(t)==w}function O(t){if(typeof t=="number")return t;if(y(t))return T;if(l(t)){var u=typeof t.valueOf=="function"?t.valueOf():t;t=l(u)?u+"":u}if(typeof t!="string")return t===0?t:+t;t=t.replace(I,"");var c=_.test(t);return c||v.test(t)?A(t.slice(2),c?2:8):E.test(t)?T:+t}C.exports=i}}]);
