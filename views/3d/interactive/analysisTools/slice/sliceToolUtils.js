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

define(["require","exports","../../../../../core/tsSupport/decorateHelper","../../../../../core/compilerUtils","../../../../../core/maybe","../../../../../core/screenUtils","../../../../../core/libs/gl-matrix-2/mat4","../../../../../core/libs/gl-matrix-2/mat4f64","../../../../../core/libs/gl-matrix-2/quat","../../../../../core/libs/gl-matrix-2/vec3","../../../../../core/libs/gl-matrix-2/vec3f64","./sliceToolConfig","../../../support/geometryUtils","../../../support/stack","../../../webgl-engine/lib/Geometry","../../../webgl-engine/lib/GeometryUtil","../../../webgl-engine/materials/ColorMaterial","../../../webgl-engine/materials/NativeLineMaterial","../../../webgl-engine/materials/RibbonLineMaterial","../../../webgl-engine/materials/SlicePlaneMaterial","../../../../interactive/Manipulator3D","../../../../interactive/manipulatorUtils"],function(e,t,a,r,i,n,o,c,s,l,d,v,u,g,m,R,_,T,p,f,E,I){function b(e,t,a,r,i,n,o,c,s){return A(t,c.worldUpAtPosition(e,g.sv3d.get()),n,o,s.basis1,s.basis2),l.vec3.scale(s.basis1,s.basis1,r),l.vec3.scale(s.basis2,s.basis2,i),l.vec3.copy(s.origin,t),l.vec3.scale(s.origin,s.origin,-a),l.vec3.add(s.origin,s.origin,e),u.boundedPlane.fromValues(s.origin,s.basis1,s.basis2,s)}function A(e,t,a,n,o,c){var s=t,d=l.vec3.dot(e,s),u=Math.abs(d)>v.VERTICAL_DOT_THRESHOLD?"vertical":"horizontal",m=g.sv3d.get(),R=g.sv3d.get(),_=function(){l.vec3.cross(m,s,a.viewUp),l.vec3.cross(R,s,m)},T=function(e){l.vec3.cross(R,e,s),l.vec3.copy(m,s)};if(i.isSome(n)&&n!==u)switch(n){case"vertical":_();break;case"horizontal":T(a.viewUp);break;default:r.neverReached(n)}else switch(u){case"vertical":_();break;case"horizontal":T(e);break;default:r.neverReached(u)}var p=l.vec3.cross(g.sv3d.get(),m,R);l.vec3.dot(p,a.viewForward)>0&&l.vec3.scale(R,R,-1),l.vec3.normalize(o,m),l.vec3.normalize(c,R)}function S(e,t,a,r,i,n){var o=l.vec3.copy(g.sv3d.get(),n.origin),c=l.vec3.copy(g.sv3d.get(),n.basis1),s=l.vec3.copy(g.sv3d.get(),n.basis2),d=l.vec3.copy(g.sv3d.get(),i.origin);l.vec3.add(d,d,l.vec3.scale(g.sv3d.get(),i.basis1,e.direction[0]<0?1:-1)),l.vec3.add(d,d,l.vec3.scale(g.sv3d.get(),i.basis2,e.direction[1]<0?1:-1));var m=l.vec3.length(i.basis1),R=l.vec3.length(i.basis2),_=l.vec3.subtract(g.sv3d.get(),a,d),T=l.vec3.subtract(g.sv3d.get(),t,d),p=0,f=0;if(G(e)){var E=C(i),I=C(n);p=m-.5*e.direction[0]*l.vec3.dot(i.basis1,T)/m,f=R-.5*e.direction[1]*l.vec3.dot(i.basis2,T)/R;var b=I/E;p*=b,f*=b}var A=.5*e.direction[0]*l.vec3.dot(i.basis1,_)/m,S=.5*e.direction[1]*l.vec3.dot(i.basis2,_)/R,y=p+A,h=f+S,O=l.vec3.scale(g.sv3d.get(),i.basis1,y/m),P=l.vec3.scale(g.sv3d.get(),i.basis2,h/R);return y>0&&F(n.origin,O,r)>v.PLANE_MIN_BASIS_SCREEN_LEN2&&l.vec3.copy(c,O),h>0&&F(n.origin,P,r)>v.PLANE_MIN_BASIS_SCREEN_LEN2&&l.vec3.copy(s,P),l.vec3.copy(o,d),l.vec3.add(o,o,l.vec3.scale(g.sv3d.get(),c,e.direction[0]<0?-1:1)),l.vec3.add(o,o,l.vec3.scale(g.sv3d.get(),s,e.direction[1]<0?-1:1)),u.boundedPlane.fromValues(o,c,s,n)}function y(e,t){return v.INITIAL_PLANE_HALF_SIZE_VIEW_PROPORTION*Math.min(t.width,t.height)*t.computeRenderPixelSizeAt(e)}function h(e,t,a,r){var i=l.vec3.cross(g.sv3d.get(),t,a);return l.vec3.cross(i,i,t),u.plane.fromPositionAndNormal(e,i,r)}function O(e,t){return I.calculateTranslateRotateFromBases(e.basis1,e.basis2,e.origin,t)}function P(e,t,a){var r=t.worldUpAtPosition(e.origin,g.sv3d.get()),i=q(e,r),n=N(r,e),o=l.vec3.copy(g.sv3d.get(),i?1===n?e.basis1:e.basis2:e.plane);return u.plane.fromPositionAndNormal(e.origin,o,a)}function D(e,t,a,r,i){var c=r.worldUpAtPosition(a.origin,g.sv3d.get()),s=q(a,c),m=N(c,a),R=H(a),_=s&&2!==m?R.basis2Positive:R.basis1Positive,T=g.sm4d.get();o.mat4.rotateZ(T,t,_.rotationIdx*Math.PI/2);var p=l.vec3.subtract(g.sv3d.get(),_.position,a.origin);l.vec3.normalize(p,p);var f=l.vec3.scale(g.sv3d.get(),p,i.computeScreenPixelSizeAt(_.position)*v.SHIFT_RESTART_OFFSET_DISTANCE);l.vec3.add(f,f,_.position);var E=i.projectPoint(f,n.castRenderScreenPointArray3(g.sv3d.get())),I=M(i,E);u.ray.fromRender(i,E,X),l.vec3.normalize(X.direction,X.direction);var b=g.sv3d.get();!I&&u.boundedPlane.intersectRay(a,X,b)&&(f=b),T[12]=0,T[13]=0,T[14]=0,e.modelTransform=T,e.position=d.vec3f64.clone(f),I?e.state|=K:e.state&=~K}function M(e,t){var a=e.viewport,r=a[0],i=a[1],n=a[2],o=a[3],c=Math.min(n,o)/16,s=!0;return t[0]<r+c?(t[0]=r+c,s=!1):t[0]>r+n-c&&(t[0]=r+n-c,s=!1),t[1]<i+c?(t[1]=i+c,s=!1):t[1]>i+o-c&&(t[1]=i+o-c,s=!1),s}function w(e,t,a,r){var i=l.vec3.length(r.basis1),n=l.vec3.length(r.basis2),c=U(r),s=C(r),d=l.vec3.set(g.sv3d.get(),0,0,0);l.vec3.add(d,l.vec3.scale(g.sv3d.get(),r.basis1,t.direction[0]),l.vec3.scale(g.sv3d.get(),r.basis2,t.direction[1])),l.vec3.add(d,r.origin,d);var v=0,u=1;if(G(t))1===t.direction[0]&&-1===t.direction[1]?v=Math.PI/2:1===t.direction[0]&&1===t.direction[1]?v=Math.PI:-1===t.direction[0]&&1===t.direction[1]&&(v=3*Math.PI/2),u=s;else{var m=0!==t.direction[0]?1:2,R=1===m?n:i;v=1===m?Math.PI/2:0,u=R-c}var _=o.mat4.identity(g.sm4d.get());o.mat4.rotateZ(_,_,v),o.mat4.scale(_,_,l.vec3.set(g.sv3d.get(),u,u,u)),o.mat4.multiply(_,a,_),_[12]=0,_[13]=0,_[14]=0,e.modelTransform=_,e.position=d}function L(e,t,a,r){var i=r.worldUpAtPosition(a.origin,g.sv3d.get()),n=q(a,i),c=N(i,a),s=H(a),l=n&&2!==c?s.basis2Negative:s.basis1Negative,d=o.mat4.identity(g.sm4d.get());o.mat4.rotateZ(d,d,l.rotationIdx*Math.PI/2),n&&o.mat4.rotateX(d,d,Math.PI/2),o.mat4.multiply(d,t,d),d[12]=0,d[13]=0,d[14]=0,e.modelTransform=d,e.position=l.position}function N(e,t){return Math.abs(l.vec3.dot(t.basis1,e))>Math.abs(l.vec3.dot(t.basis2,e))?1:2}function H(e){return{basis1Positive:{position:l.vec3.add(g.sv3d.get(),e.origin,e.basis1),rotationIdx:0},basis2Positive:{position:l.vec3.add(g.sv3d.get(),e.origin,e.basis2),rotationIdx:1},basis1Negative:{position:l.vec3.subtract(g.sv3d.get(),e.origin,e.basis1),rotationIdx:2},basis2Negative:{position:l.vec3.subtract(g.sv3d.get(),e.origin,e.basis2),rotationIdx:3}}}function F(e,t,a){var r=a.projectPoint(l.vec3.add(g.sv3d.get(),e,t),n.castRenderScreenPointArray3(g.sv3d.get())),i=a.projectPoint(l.vec3.subtract(g.sv3d.get(),e,t),n.castRenderScreenPointArray3(g.sv3d.get()));return l.vec3.squaredLength(l.vec3.subtract(r,r,i))}function U(e){var t=l.vec3.length(e.basis1),a=l.vec3.length(e.basis2);return v.RESIZE_HANDLE_EDGE_PADDING_FRAC*Math.min(t,a)}function C(e){return U(e)}function G(e){return 0!==e.direction[0]&&0!==e.direction[1]}function k(e){var a=[d.vec3f64.fromValues(0,0,-v.SHIFT_RESTART_ARROW_LENGTH/2),d.vec3f64.fromValues(0,0,v.SHIFT_RESTART_ARROW_LENGTH/2)],r=Z(a,!0),i=function(e,t){return W(a,a,{tubeRadius:v.SHIFT_RESTART_TUBE_RADIUS,tipRadius:v.SHIFT_RESTART_TIP_RADIUS,tipLength:v.SHIFT_RESTART_TIP_LENGTH,tubeFocusMultiplier:v.SHIFT_RESTART_TUBE_FOCUS_MULTIPLIER,tipFocusMultiplier:v.SHIFT_RESTART_TIP_FOCUS_MULTIPLIER,padding:e,bothEnds:!0,flat:null,focusTipLength:!0,addCap:t})},n=i(0,!1),o=i(v.SHIFT_RESTART_ARROW_OUTLINE_WIDTH,!0),c=new _({color:v.SHIFT_RESTART_ARROW_TIP_COLOR,cullFace:"back"},"slice-shift");c.renderOccluded=8;var s=new _({color:v.SHIFT_RESTART_ARROW_CAP_COLOR,cullFace:"back"},"slice-shift");s.renderOccluded=8;var l=new _({color:v.SHIFT_RESTART_TUBE_COLOR,cullFace:"back"},"slice-shift");l.renderOccluded=8;var u=new _({color:v.SHIFT_RESTART_OUTLINE_COLOR,transparent:!0,writeDepth:!1,cullFace:"front"},"slice-shift");u.renderOccluded=2;var g=new m(R.createPolylineGeometry([[0,0,0],[-v.SHIFT_RESTART_OFFSET_DISTANCE,0,0]]),"slice-rotate-heading"),p=new m(R.createPolylineGeometry([[0,0,0],[-v.SHIFT_RESTART_OFFSET_DISTANCE,0,0]]),"slice-rotate-heading"),f=new T({color:v.SHIFT_RESTART_CALLOUT_COLOR},"slice-rotate-heading");return f.renderOccluded=4,new E.Manipulator3D({view:e,renderObjects:n.normal.map(function(e){var a=e.part,r=e.geometry,i=e.transform;return{geometry:r,material:"tip"===a?c:"cap"===a?s:l,transform:i,stateMask:1|t.DidPointerMoveRecentlyFlag}}).concat(o.normal.map(function(e){var a=e.geometry,r=e.transform;return{geometry:a,material:u,transform:r,stateMask:1|t.DidPointerMoveRecentlyFlag}}),[{geometry:g,material:f,stateMask:1|t.DidPointerMoveRecentlyFlag|K}],n.focused.map(function(e){var a=e.part,r=e.geometry,i=e.transform;return{geometry:r,material:"tip"===a?c:"cap"===a?s:l,transform:i,stateMask:2|t.DidPointerMoveRecentlyFlag}}),o.focused.map(function(e){var a=e.geometry,r=e.transform;return{geometry:a,material:u,transform:r,stateMask:2|t.DidPointerMoveRecentlyFlag}}),[{geometry:p,material:f,stateMask:2|t.DidPointerMoveRecentlyFlag|K}]),autoScaleRenderObjects:!1,collisionType:{type:"line",paths:[r]},collisionPriority:1,radius:v.SHIFT_RESTART_TIP_RADIUS,snapToPointer:!1,moveOnDrag:!1,state:t.DidPointerMoveRecentlyFlag})}function z(e){var a=.1*Math.PI,r=1.7*Math.PI,i=v.ROTATE_HEADING_DISC_RADIUS,n=i*v.ROTATE_HEADING_DISC_RADIUS_FOCUS_MULTIPLIER,o=v.ROTATE_HEADING_DISC_ARROW_RADIUS,c=v.ROTATE_HEADING_DISC_ARROW_RADIUS*v.ROTATE_HEADING_DISC_RADIUS_FOCUS_MULTIPLIER,s=v.ROTATE_HEADING_OFFSET_DISTANCE,l=function(e){for(var t=[],i=0;i<32;i++){var n=Math.PI+a+(r-a)*i/31;t.push(d.vec3f64.fromValues(s+e*Math.cos(n),e*Math.sin(n),0))}return t},u=l(o),g=l(c),p=Z(u,!1),f=W(u,g,{tubeRadius:v.ROTATE_HEADING_TUBE_RADIUS,tipRadius:v.ROTATE_HEADING_TIP_RADIUS,tipLength:v.ROTATE_HEADING_TIP_LENGTH,tubeFocusMultiplier:v.ROTATE_HEADING_TUBE_FOCUS_MULTIPLIER,tipFocusMultiplier:v.ROTATE_HEADING_TIP_FOCUS_MULTIPLIER,padding:0,bothEnds:!1,flat:{thickness:2},focusTipLength:!0,addCap:!0}),I=new _({color:v.ROTATE_HEADING_ARROW_COLOR,cullFace:"back"},"slice-rotate-heading");I.renderOccluded=8;var b=new m(R.createPolylineGeometry([[0,0,0],[s-i,0,0]]),"slice-rotate-heading"),A=new m(R.createPolylineGeometry([[0,0,0],[s-n,0,0]]),"slice-rotate-heading"),S=new T({color:v.ROTATE_HEADING_CALLOUT_COLOR},"slice-rotate-heading");S.renderOccluded=4;var y=d.vec3f64.fromValues(0,0,1),h=d.vec3f64.fromValues(s,0,0),O=new m(R.createCylinderGeometry(1,i,32,y,h),"slice-rotate-heading"),P=new m(R.createCylinderGeometry(1,n,32,y,h),"slice-rotate-heading"),D=new _({color:v.ROTATE_HEADING_DISC_COLOR,transparent:!0,writeDepth:!1,cullFace:"back"},"slice-rotate-heading");return D.renderOccluded=8,new E.Manipulator3D({view:e,renderObjects:f.normal.map(function(e){var a=e.geometry,r=e.transform;return{geometry:a,material:I,transform:r,stateMask:1|t.DidPointerMoveRecentlyFlag}}).concat([{geometry:O,material:D,stateMask:1|t.DidPointerMoveRecentlyFlag},{geometry:b,material:S,stateMask:1|t.DidPointerMoveRecentlyFlag}],f.focused.map(function(e){var a=e.geometry,r=e.transform;return{geometry:a,material:I,transform:r,stateMask:2|t.DidPointerMoveRecentlyFlag}}),[{geometry:P,material:D,stateMask:2|t.DidPointerMoveRecentlyFlag},{geometry:A,material:S,stateMask:2|t.DidPointerMoveRecentlyFlag}]),autoScaleRenderObjects:!1,collisionType:{type:"line",paths:[p]},collisionPriority:1,radius:v.ROTATE_HEADING_TIP_RADIUS,snapToPointer:!1,moveOnDrag:!1,state:t.DidPointerMoveRecentlyFlag})}function x(e){var t=[[-1,-1,0],[1,-1,0],[1,1,0],[-1,1,0],[-1,-1,0]],a=new m(R.createPolylineGeometry(t),"slice-outline"),r=v.PLANE_OUTLINE_COLOR.slice(),i=new p({color:r,writeDepth:!1,width:v.PLANE_OUTLINE_WIDTH},"slice-outline");return i.renderOccluded=4,{manipulator:new E.Manipulator3D({view:e,renderObjects:[{geometry:a,material:i}],interactive:!1,autoScaleRenderObjects:!1,worldSized:!0}),material:i}}function j(e){var t=new m(R.createSquareGeometry(),"slice-grid"),a=v.PLANE_BACKGROUND_COLOR.slice(),r=new f({backgroundColor:a,gridColor:v.GRID_COLOR,gridWidth:4},"slice-grid");return r.renderOccluded=4,{manipulator:new E.Manipulator3D({view:e,renderObjects:[{geometry:t,material:r}],interactive:!1,autoScaleRenderObjects:!1,worldSized:!0}),material:r}}function V(e,t){var a=G(t),r=a?[d.vec3f64.fromValues(1,0,0),d.vec3f64.fromValues(0,0,0),d.vec3f64.fromValues(0,1,0)]:[d.vec3f64.fromValues(1,0,0),d.vec3f64.fromValues(-1,0,0)],i=new m(R.createPolylineGeometry(r),"slice-resize"),n=v.HANDLE_COLOR.concat([1]),o=function(e){var t=new p({color:n,width:e},"slice-resize");return t.renderOccluded=4,t},c=function(){var e=new T({color:n},"slice-resize");return e.renderOccluded=4,e},s=a?v.RESIZE_HANDLE_CORNER_WIDTH:v.RESIZE_HANDLE_EDGE_WIDTH,l=s*v.DISPLAY_FOCUS_MULTIPLIER,u=function(e){return e>1?o(e):c()};return new E.Manipulator3D({view:e,renderObjects:[{geometry:i,material:u(s),stateMask:1},{geometry:i,material:u(l),stateMask:2}],collisionType:{type:"line",paths:[r]},autoScaleRenderObjects:!1,worldSized:!0,radius:a?v.RESIZE_HANDLE_CORNER_INPUT_RADIUS:v.RESIZE_HANDLE_EDGE_INPUT_RADIUS,snapToPointer:!1,moveOnDrag:!1})}function W(e,t,a){var r=function(r){var n=(r?t:e).slice(0),v=l.vec3.subtract(g.sv3d.get(),n[0],n[1]);l.vec3.normalize(v,v);var u=l.vec3.subtract(g.sv3d.get(),n[n.length-1],n[n.length-2]);if(l.vec3.normalize(u,u),a.padding>0){var _=l.vec3.scale(d.vec3f64.create(),u,-a.padding);if(n[n.length-1]=l.vec3.add(_,_,n[n.length-1]),a.bothEnds){var T=l.vec3.scale(d.vec3f64.create(),v,-a.padding);n[0]=l.vec3.add(T,T,n[0])}}var p=r?a.tipFocusMultiplier:1,f=a.tipLength*(a.focusTipLength?p:1),E=a.tipRadius*p,I=o.mat4.identity(g.sm4d.get());if(a.padding>0){var b=f/4,A=l.vec3.set(g.sv3d.get(),0,b,0),S=1+a.padding/b;o.mat4.translate(I,I,A),o.mat4.scale(I,I,l.vec3.set(g.sv3d.get(),S,S,S)),o.mat4.translate(I,I,l.vec3.scale(A,A,-1/S))}var y=o.mat4.identity(c.mat4f64.create()),h=d.vec3f64.fromValues(0,1,0),O=o.mat4.fromQuat(c.mat4f64.create(),s.quat.rotationTo(g.sq4d.get(),h,u));O[12]=n[n.length-1][0],O[13]=n[n.length-1][1],O[14]=n[n.length-1][2],o.mat4.multiply(O,O,I);var P,D,M=new m(B(a.tubeRadius*(r?a.tubeFocusMultiplier:1)+a.padding,a.flat,n),"arrow-tube"),w=[{part:"tube",geometry:M,transform:y}];if(i.isSome(a.flat)?P=new m(R.createExtrudedTriangle(f,E,E,a.flat.thickness),"arrow-tip"):(P=new m(R.createConeGeometry(f,E,24,!1,!1,!0),"arrow-tip"),D=new m(R.createConeGeometry(f,E,24,!1,!0,!1),"arrow-cap")),w.push({part:"tip",geometry:P,transform:O}),D&&w.push({part:"cap",geometry:D,transform:O}),a.bothEnds){var L=o.mat4.fromQuat(c.mat4f64.create(),s.quat.rotationTo(g.sq4d.get(),h,v));L[12]=n[0][0],L[13]=n[0][1],L[14]=n[0][2],o.mat4.multiply(L,L,I),w.push({part:"tip",geometry:P,transform:L}),D&&w.push({part:"cap",geometry:D,transform:L})}return w};return{normal:r(!1),focused:r(!0)}}function B(e,t,a){var r=[];if(i.isSome(t))r.push([e,t.thickness/2],[-e,t.thickness/2],[-e,-t.thickness/2],[e,-t.thickness/2]);else for(var n=0;n<12;n++){var o=n/12*2*Math.PI;r.push([Math.cos(o)*e,Math.sin(o)*e])}return R.createPathExtrusionGeometry(r,a,[],[],!1)}function Z(e,t){var a=l.vec3.subtract(d.vec3f64.create(),e[e.length-1],e[e.length-2]);if(l.vec3.normalize(a,a),l.vec3.scale(a,a,v.ROTATE_HEADING_TIP_LENGTH),l.vec3.add(a,a,e[e.length-1]),t){var r=l.vec3.subtract(d.vec3f64.create(),e[0],e[1]);return l.vec3.normalize(r,r),l.vec3.scale(r,r,v.ROTATE_HEADING_TIP_LENGTH),l.vec3.add(r,r,e[0]),[r].concat(e,[a])}return e.concat([a])}function q(e,t){return Math.abs(l.vec3.dot(e.plane,t))<=v.PERPENDICULAR_GROUND_DOT_THRESHOLD}function Q(e){switch(e.type){case"building-scene":case"csv":case"feature":case"geo-rss":case"geojson":case"graphics":case"group":case"integrated-mesh":case"kml":case"map-notes":case"point-cloud":case"scene":case"stream":case"unknown":case"unsupported":case null:return!1;case"base-dynamic":case"base-elevation":case"base-tile":case"bing-maps":case"elevation":case"imagery":case"map-image":case"open-street-map":case"tile":case"vector-tile":case"web-tile":case"wms":case"wmts":return!0;default:return r.neverReached(e.type),!1}}Object.defineProperty(t,"__esModule",{value:!0}),t.createPlane=b,t.normalToBases=A,t.resizePlane=S,t.calculatePlaneHalfSize=y,t.createShiftPlane=h,t.calculateBoundedPlaneTranslateRotate=O,t.createRotatePlane=P,t.updateShiftRestartHandle=D,t.updateResizeHandle=w,t.updateRotateHeadingHandle=L,t.calculateScreenSpaceBasisLength2=F,t.calculateResizeHandlePadding=U,t.calculateDiagonalResizeHandleScale=C,t.isDiagonalResizeHandle=G,t.createShiftManipulator=k,t.createRotateManipulator=z,t.createOutlineManipulator=x,t.createGridManipulator=j,t.createResizeManipulator=V,t.createArrowGeometry=W,t.addArrowTips=Z,t.isAlwaysDrapedLayer=Q,t.DidPointerMoveRecentlyFlag=16;var K=32,X=u.ray.create()});