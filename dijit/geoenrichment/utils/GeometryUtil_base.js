// COPYRIGHT © 201 Esri
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
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.

!function(t){function i(t,i){var s=t.length;if(s<3)return 0;i||(i=t[0]);for(var n=i[0],e=i[1],h=t[s-1],r=h[0]-n,o=h[1]-e,a=0,l=0,c=t.length;l<c;l++){h=t[l];var u=h[0]-n,x=h[1]-e;a+=u*o-r*x,r=u,o=x}return a/2}function s(t,i){var s=t.length;if(!s)return null;i||(i=t[0]);var n=i[0],e=i[1],h=0,r=0,o=0;if(s>2)for(var a=t[s-1],l=a[0]-n,c=a[1]-e,u=0,x=t.length;u<x;u++){a=t[u];var g=a[0]-n,f=a[1]-e,d=g*c-l*f;h+=d,r+=(l+g)*d,o+=(c+f)*d,l=g,c=f}return 0==h?r=o=0:(r/=3*h,o/=3*h),[n+r,e+o]}var n={};n.calculateRingArea=i,n.calculateRingCentroid=s;n.INTERIOR=1,n.EXTERIOR=-1,n.BOUNDARY=0,n.createRingInfo=function(t,i){return new r(t,i)},n.createSegmentCoordinates=function(t){return new o(null,0,0,t)};var e=function(t){return function(){for(var i in t){var s=t[i];this[i]="function"==typeof s?s.bind(this):s}t.ctr.bind(this).apply(this,arguments)}},h=e({xmin:null,ymin:null,xmax:null,ymax:null,spatialReference:null,ctr:function(t,i,s,n,e){this.xmin=t,this.ymin=i,this.xmax=s,this.ymax=n,this.spatialReference=e},printOut:function(){console.log([this.xmin,this.xmax,this.ymin,this.ymax].join(" "))}}),r=e({ring:null,origin:null,area:0,clockwise:!1,extent:null,_coords:null,ctr:function(t,s){this.ring=t,this.origin=s;var n=this.ring.length-1;if(!(n<0)){n?this.ring[n][0]==this.ring[0][0]&&this.ring[n][1]==this.ring[0][1]||(n++,this.ring.push(this.ring[0].slice())):n++;var e=0,r=0,o=!s;this.extent=new h(this.ring[0][0],this.ring[0][1],this.ring[0][0],this.ring[0][1]);for(var a=0;a<n;a++){var l=this.ring[a],c=l[0];o&&(e+=c),c<this.extent.xmin?this.extent.xmin=c:c>this.extent.xmax&&(this.extent.xmax=c),c=l[1],o&&(r+=c),c<this.extent.ymin?this.extent.ymin=c:c>this.extent.ymax&&(this.extent.ymax=c)}o&&(this.origin=[e/n,r/n]),this.area=i(this.ring,this.origin),this.area<=0?this.area=-this.area:this.clockwise=!0}},setDirection:function(t){this.clockwise==!t&&(this.ring.reverse(),this.clockwise=!this.clockwise,this._coords=null)},testPoint:function(t,i){var s=this.getRingCoordinates(i),n=s.testPoint(t[0]-this.origin[0],t[1]-this.origin[1]);return this.clockwise?n:-n},generalize:function(t,s,n){s=s||.75;for(var e=this.getRingCoordinates(t),h=e.xs,r=e.ys,o=t,a=h[0],l=r[0],c=h.length-1,u=h[c],x=r[c],g=this,f=this.clockwise?function(t){g.ring.splice(t,1)}:function(t){g.ring.splice(-t-1,1)};c-- >0&&h.length>3;){var d=h[c],y=r[c];o*=s,e.setSegment(a,l,d,y)&&e.testPointOnTouch(u,x,o)?(h.splice(c+1,1),r.splice(c+1,1),f(c+1),u=d,x=y):(a=u,l=x,u=d,x=y,o=t)}this._coords=null,n&&(this.area=i(this.ring,this.origin),this.clockwise||(this.area=-this.area))},getRingCoordinates:function(t,i){return i?new o(this.ring,i[0],i[1],t,this.extent,this.clockwise):(this._coords&&this._coords.eps==t||(this._coords=new o(this.ring,this.origin[0],this.origin[1],t,this.extent,this.clockwise)),this._coords)}});n.RingInfo=r;var o=e({xs:null,ys:null,extent:null,eps:NaN,_sx:null,_dx:null,_sy:null,_dy:null,ctr:function(t,i,s,n,e,r){if(this.xs=[],this.ys=[],t||(t=[]),void 0===i&&(i=0),void 0===s&&(s=0),void 0===n&&(n=0),this.eps=Math.max(n,0),e){var o=this.eps/2;this.extent=new h(e.xmin-i-o,e.ymin-s-o,e.xmax-i+o,e.ymax-s+o)}var a=t.length-1;if(!(a<0))for(var l=a?t[a][0]==t[0][0]&&t[a][1]==t[0][1]?a:a+1:1,c=r?1:-1,u=r?0:a;l--;u+=c){var x=t[u];this.xs.push(x[0]-i),this.ys.push(x[1]-s)}},testPoint:function(t,i){if(!this._pointBelongsToExtent(t,i))return-1;var s=this.xs.length,n=!1;if(this._dy=this.ys[0]-this.ys[s-1],0==this._dy){for(var e=s;e-- >1&&(this._dy=this.ys[e]-this.ys[e-1],0==this._dy););if(0==this._dy)return 0}n=this._dy>0;for(var h,r,o=0,a=this.xs[0],l=this.ys[0],c=1;c<=s;c++,a=h,l=r){var u=c==s?0:c;if(h=this.xs[u],r=this.ys[u],this.setSegment(a,l,h,r)){var x=l-i,g=r-i,f=!1;if(x<0&&(x=-x,g=-g,f=!0),!(x>this.eps&&g>this.eps)){if(this.testPointOnTouch(t,i,this.eps))return 0;0==x?0!==g&&(g<0&&(n=!n),t<a&&n&&o++):0==g?n=f:g<0&&t<a+this._dx/this._dy*(i-l)&&o++}}}return o%2!=0?1:-1},testPointOnTouch:function(t,i,s){var n=this.findIntersectionDelta(t,i,t-this._dy,i+this._dx),e=this._sx+n*this._dx-t,h=this._sy+n*this._dy-i;return e*e+h*h<=s*s},_pointBelongsToExtent:function(t,i){return t>=this.extent.xmin&&t<=this.extent.xmax&&i>=this.extent.ymin&&i<=this.extent.ymax},setSegment:function(t,i,s,n){return this._sx=t,this._dx=s-t,this._sy=i,this._dy=n-i,0!=this._dx||0!=this._dy},findIntersectionDelta:function(t,i,s,n,e){void 0===e&&(e=!0),s-=t,n-=i;var h=this._dy*s-this._dx*n;if(0==h)return 0;var r=t-this._sx,o=i-this._sy,a=o*s-r*n,l=e?0:o*this._dx-r*this._dy;return h<0&&(h=-h,a=-a,l=-l),e||(l=l<0?0:l<h?l/h:1,this.testPointOnTouch(t+l*s,i+l*n,this.eps))?a<=0?0:a<h?a/h:1:-1},addPointOfSegmentAt:function(t){this.xs.push(this._sx+t*this._dx),this.ys.push(this._sy+t*this._dy)}});n.RingCoordinates=o,t.document?define([],function(){return n}):t.GeometryUtil_base=n}(this);