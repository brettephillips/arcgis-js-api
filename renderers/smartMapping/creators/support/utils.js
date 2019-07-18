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

define(["require","exports","../../../../core/tsSupport/assignHelper","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/awaiterHelper","../../../../Color","../../../../symbols","../../../../core/compilerUtils","../../../../core/Error","../../../../core/promiseUtils","../../heuristics/outline","../../statistics/classBreaks","../../statistics/summaryStatistics","../../../support/numberUtils","../../../support/pointCloud/PointSizeSplatAlgorithm"],function(e,i,t,n,r,l,o,a,s,u,c,m,d,y,f){function h(e,i){return new s(e,i)}function p(e,i,t){var n,r,l=v({statistics:e,isDate:i});return l.defaultValuesUsed?(n=l.min,r=l.max):!t||null!=e.avg&&e.stddev||(n=e.min,r=e.max),null!=n?[n,r]:null}function v(e){var i=e&&e.statistics;i||(i={});var t,n;if(null==i.min)if(e.isDate){var r=w();t=r[0],n=r[1]}else t=0,n=100;else if(i.min===i.max)if(e.isDate){var l=w(i.min);t=l[0],n=l[1]}else i.min<0?(t=2*i.min,n=0):i.min>0?(t=0,n=2*i.min):(t=0,n=100);return{min:null!=t?t:i.min,max:null!=n?n:i.max,defaultValuesUsed:null!=t||null!=n}}function w(e){var i="number"==typeof e?new Date(e):new Date,t=i.getUTCFullYear(),n=Date.UTC(t,0,1,12,0,0,0),r=Date.UTC(t,11,31,12,0,0,0);return"number"==typeof e&&(e<n&&(n=e),e>r&&(r=e)),[n,r]}function S(e,i){for(var t=[],n=e.length,r=0;r<i;r++)t.push(new l(e[r%n]));return t}function b(e,i){void 0===i&&(i=!0);var t=e.avg,n=t-e.stddev,r=t+e.stddev;n<e.min&&(n=e.min),r>e.max&&(r=e.max),i&&(t=n+(r-n)/2);var l=y.round([n,r],{strictBounds:!0});return n=l[0],r=l[1],l=[n,n+(t-n)/2,t,t+(r-t)/2,r],y.round(l,{strictBounds:!0})}function g(e,i,t){switch(i){case"point":case"multipoint":return t?"noDataSize"in e?e.noDataSize:null:"size"in e?e.size:null;case"polyline":return t?"noDataWidth"in e?e.noDataWidth:null:"width"in e?e.width:null;case"polygon":return"size"in e?e.size:null;case"mesh":return;default:a.neverReached(i)}}function D(e,i,t){switch(i){case"point":case"multipoint":case"polygon":if(!("outline"in e))return null;var n={color:e.outline.color,width:e.outline.width};if(null!=t&&n.color){var r=n.color.clone();r.a=t,n.color=r}return n;case"polyline":case"mesh":return;default:a.neverReached(i)}}function z(e,i){var t,n=i.type,r=i.size,l=i.color,a=i.outline;switch(e){case"point":case"multipoint":if("2d"===n)t=new o.SimpleMarkerSymbol({color:l,size:r,outline:{color:a.color,width:a.width}});else if("3d-flat"===n)t=new o.PointSymbol3D({symbolLayers:[new o.IconSymbol3DLayer({size:r,resource:{primitive:"circle"},material:{color:l},outline:{color:a.color,size:a.width}})]});else if(n.indexOf("3d-volumetric")>-1){var s="3d-volumetric-uniform"===n,u=s?"sphere":"cylinder",c=new o.ObjectSymbol3DLayer({height:r,resource:{primitive:u},material:{color:l}});s||(c.width=i.widthAndDepth,c.depth=i.widthAndDepth),t=new o.PointSymbol3D({symbolLayers:[c]})}break;case"polyline":"2d"===n?t=new o.SimpleLineSymbol({color:l,width:r}):"3d-flat"===n?t=new o.LineSymbol3D({symbolLayers:[new o.LineSymbol3DLayer({size:r,material:{color:l}})]}):"3d-volumetric"===n&&(t=new o.LineSymbol3D({symbolLayers:[new o.PathSymbol3DLayer({size:r,material:{color:l}})]}));break;case"polygon":"2d"===n?t=new o.SimpleFillSymbol({color:l,outline:{color:a.color,width:a.width}}):"3d-flat"===n?t=new o.PolygonSymbol3D({symbolLayers:[new o.FillSymbol3DLayer({material:{color:l},outline:{color:a.color,size:a.width}})]}):"3d-volumetric"===n&&(t=new o.PolygonSymbol3D({symbolLayers:[new o.ExtrudeSymbol3DLayer({size:r,material:{color:l}})]}));break;case"mesh":var m=i.meshInfo&&i.meshInfo.colorMixMode,d=i.meshInfo&&i.meshInfo.edgesType;t=new o.MeshSymbol3D({symbolLayers:[new o.FillSymbol3DLayer({material:{color:l,colorMixMode:m},edges:null==d||"none"===d?null:{type:d,color:I}})]})}return t}function x(e,i,t){var n=L({layer:e,fields:i});if(n.length)return h(t,"Unknown fields: "+n.join(", ")+". You can only use fields defined in the layer schema");var r=U({layer:e,fields:i});return r.length?h(t,"Unsupported fields: "+r.join(", ")+". You can only use fields that are accessible to the renderer i.e. FieldUsageInfo.supportsRenderer must be true"):void 0}function L(e){var i=e.layer;return e.fields.filter(function(e){return!i.getField(e)})}function U(e){var i=e.layer;return e.fields.filter(function(e){var t=i.getFieldUsageInfo(e);return!t||!t.supportsRenderer})}function F(e,i){return r(this,void 0,void 0,function(){var r,l,o,a,s,d,y;return n(this,function(n){switch(n.label){case 0:return r={layer:e.layer,view:e.view},[4,u.all([m(e),i?c(r):null])];case 1:return l=n.sent(),o=l[0],a=l[1],s=p({min:o.minValue,max:o.maxValue,avg:null,stddev:null},!1,!1),s?[4,m(t({},e,{classificationMethod:"equal-interval",numClasses:1,analyzeData:!1,minValue:s[0],maxValue:s[1],normalizationTotal:s[0]+s[1]}))]:[3,3];case 2:return y=n.sent(),[3,4];case 3:y=o,n.label=4;case 4:return d=y,[2,{result:d,defaultValuesUsed:!!s,outlineResult:a}]}})})}function V(e){return d(e)}function P(e,i){var t=e.minSize,n=e.maxSize;if("height"===i){t=((n-t)/2+t)/4.6,n*=2}return{minSize:t,maxSize:n}}function C(e){return k.test(e)}function M(e){var i=e.match(k),t=Number(i[1]);if("%"===i[3])return new f.default({scaleFactor:t/100})}Object.defineProperty(i,"__esModule",{value:!0});var k=/^(\d+(\.\d+)?)\s*(%)$/i,I=[0,0,0,.4];i.createError=h,i.getDefaultDataRange=p,i.createColors=S,i.createStopValues=b,i.getSymbolSizeFromScheme=g,i.getSymbolOutlineFromScheme=D,i.createSymbol=z,i.verifyBasicFieldValidity=x,i.getClassBreaks=F,i.getSummaryStatistics=V,i.getSizeRangeForAxis=P,i.isValidPointSize=C,i.getPointSizeAlgorithm=M});