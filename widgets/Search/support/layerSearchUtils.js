// COPYRIGHT © 2018 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.12/esri/copyright.txt for details.

define(["require","exports","dojo/date/locale","../../../intl","../../../core/Error","../../../core/lang","../../../core/Logger","../../../core/promiseUtils","../../../core/unitUtils","./geometryUtils"],function(e,r,t,i,n,u,a,o,l,s){function d(e){var r=e.exactMatch,t=void 0!==r&&r,i=e.location,u=e.maxResults,a=e.spatialReference,s=e.source,d=e.sourceIndex,f=e.suggestResult,m=e.view,x=s.layer,w=s.filter,j=s.zoomScale,R=m&&m.scale,S=c(s,m);return g(x).then(function(){return o.create(function(e,r){var t=x.popupTemplate;if(t)return t.getRequiredFields(x.fields).then(function(r){return e(r)},r);e(null)})}).then(function(e){var r=x.objectIdField,c=x.returnZ,g=y(s);if(!F(x,g))return L.error("invalid-field: displayField is invalid."),o.reject(new n("getResults():invalid-field","displayField is invalid."));var E=e&&e.length?e:[g],P=s.outFields||E,O=v(P);if(-1!==P.indexOf(r)||O||P.push(r),!(O||h(x,P)))return L.error("invalid-field: outField is invalid."),o.reject(new n("getResults():invalid-field","outField is invalid."));var D=x.createQuery(),U=s.searchQueryParams;if(U&&D.set(U),a){D.outSpatialReference=a;var T=1/l.getMetersPerUnitForSR(a);T&&(D.maxAllowableOffset=T)}var q=!!x.get("capabilities.data.supportsZ");if(D.returnZ=q&&!1!==c,D.returnGeometry=!0,P&&(D.outFields=P),i)D.geometry=i;else if(f.key)D.objectIds=[parseInt(f.key,10)];else{var k=s.searchFields||[g],A=h(x,k);if(!A)return L.error("invalid-field: search field is invalid."),o.reject(new n("getResults():invalid-field","search field is invalid."));p(x)&&(D.num=u),S&&(D.geometry=S);var C=f.text.trim();if(!C)return o.resolve();var Q=s.prefix,G=void 0===Q?"":Q,M=s.suffix,V=void 0===M?"":M,Z=b(""+G+C+V),_=I(Z,x,k,w,t);if(!_)return o.resolve();D.where=_}return x.queryFeatures(D).then(function(e){return N(e,m,s,d,g,R,j)})})}function f(e){var r=e.source,t=e.spatialReference,i=e.view,u=e.suggestTerm,a=e.maxSuggestions,l=e.sourceIndex,s=r.layer,d=r.filter,f=c(r,i);return g(s).then(function(){if(!p(s))return o.resolve();var e=y(r),i=r.searchFields||[e],c=[];r.suggestionTemplate?r.suggestionTemplate.replace(q,function(e,r){return c.push(r),e}):c.push(e);var g=v(c);-1!==c.indexOf(s.objectIdField)||g||c.push(s.objectIdField);var m=F(s,e),x=g||h(s,c),w=h(s,i);if(!m)return L.error("invalid-field: displayField is invalid."),o.reject(new n("getSuggestions():invalid-field","displayField is invalid."));if(!x)return L.error("invalid-field: outField is invalid."),o.reject(new n("getSuggestions():invalid-field","outField is invalid."));if(!w)return L.error("invalid-field: search field is invalid."),o.reject(new n("getSuggestions():invalid-field","search field is invalid."));var j=s.createQuery(),R=r.suggestQueryParams;R&&j.set(R),j.outSpatialReference=t,j.returnGeometry=!1,j.num=a,j.outFields=c,f&&(j.geometry=f);var S=u.trim();if(!S)return o.resolve();var E=r.prefix,P=void 0===E?"":E,O=r.suffix,U=void 0===O?"":O,N=b(""+P+S+U),T=I(N,s,i,d,!1);return T?(j.where=T,s.queryFeatures(j).then(function(t){return D(t,r,l,e)})):o.resolve()})}function c(e,r){var t=e.filter,i=e.searchExtent,n=e.withinViewEnabled,u=r&&r.extent,a=t&&t.geometry,o=n&&u?u:void 0;return a||i||o}function v(e){return e&&-1!==e.indexOf("*")}function g(e){return e?e.load().then(o.resolve).catch(o.reject):o.resolve()}function p(e){return e&&!!e.get("capabilities.query.supportsPagination")}function m(e){var r="";if(e){var t=e.fields;t&&t.some(function(e){if("string"===e.type)return r=e.name,!0})}return r}function y(e){return e.displayField||e.layer.displayField||m(e.layer)}function h(e,r){return!(!e||!r)&&r.every(function(r){return F(e,r)})}function F(e,r){return!!e.getField(r)}function x(e){for(var r=0;r<e.length;r++)if(e.charCodeAt(r)>255)return!0;return!1}function w(e,r,t){var i=null,n=e.codedValues;return n&&n.some(function(e){var n=e.name,u=t?n:n.toLowerCase();if((t?r:r.toLowerCase())===u)return i=e.code.toString(),!0}),i}function b(e){return e.replace(/\'/g,"''")}function j(e,r){var t=r&&r.where;return t?"("+e+") AND ("+t+")":e}function R(e,r,t,i,n){var u=r.type,a=r.name;if("string"===u||"date"===u){if(n)return j(a+" = "+t+"'"+e+"'",i);return j("UPPER("+a+") LIKE "+t+"'%"+e.toUpperCase()+"%'",i)}if("oid"===u||"small-integer"===u||"integer"===u||"single"===u||"double"===u){var o=Number(e);return isNaN(o)?null:j(a+" = "+o,i)}return j(a+" = "+e,i)}function S(e,r){return e?" OR ("+r+")":"("+r+")"}function I(e,r,t,i,n){var u=r.definitionExpression,a="";if(e){var o=T.test(r.url)&&x(e)?"N":"";t&&t.forEach(function(t){var u=r.getField(t),l="function"==typeof r.getFieldDomain&&r.getFieldDomain(t),s=l&&"coded-value"===l.type?w(l,e,n):null,d=s||e||null;if(null!==d){var f=R(d,u,o,i,n);f&&(a+=S(a,f))}})}return u?"("+u+") AND ("+a+")":a}function E(e,r){var t=null,i=e.codedValues;return i&&i.length&&i.some(function(e){if(e.code===r)return t=e.name,!0}),t}function P(e,r,n){var u=e.layer,a=e.attributes,o="function"==typeof u.getFieldDomain&&u.getFieldDomain(n);if(r)return i.substitute(r,a);if(n&&e.hasOwnProperty("attributes")&&a.hasOwnProperty(n)){var l=a[n],s=u.getField(n);return o&&"coded-value"===o.type?E(o,l):s&&"date"===s.type?t.format(new Date(l)):"number"==typeof l?l.toString():"string"!=typeof l?"":l.trim()}return""}function O(e,r,t,i){var n=e.layer,u=e.attributes,a=n.objectIdField,o=u[a];return{text:P(e,r.suggestionTemplate,i),key:o,sourceIndex:t}}function D(e,r,t,i){return e.features.map(function(e){return O(e,r,t,i)})}function U(e,r,t,i,n,a,o){var l=e.clone(),d=e.layer,f=d&&d.objectIdField,c=f&&e.attributes[f],v=P(e,t.searchTemplate,n),g=s.createExtentFromGeometry(l.geometry,r,a);return{extent:o?s.scaleExtent(u.clone(g),r,o):g,feature:l,key:c,name:v,sourceIndex:i}}function N(e,r,t,i,n,u,a){return e.features.map(function(e){return U(e,r,t,i,n,u,a)})}Object.defineProperty(r,"__esModule",{value:!0});var T=/https?:\/\/services.*\.arcgis\.com/i,q=/(?:\{([^}]+)\})/g,L=a.getLogger("esri.widgets.Search.support.layerSearchUtils");r.getResults=d,r.getSuggestions=f});