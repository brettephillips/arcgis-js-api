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

define(["require","exports","../../../../../core/tsSupport/declareExtendsHelper","../../../../../core/tsSupport/decorateHelper","../../../../../core/Handles","../../../../../core/screenUtils","../../../../../core/libs/gl-matrix-2/mat4","../../../../../core/libs/gl-matrix-2/mat4f64","../../../../../core/libs/gl-matrix-2/vec2","../../../../../core/libs/gl-matrix-2/vec3","../../../../../core/libs/gl-matrix-2/vec3f64","./LaserLineRenderer","../support/Label","../support/LabelSegment","../support/labelUtils","../support/PathSegmentInterpolator","../support/viewUtils","../../../support/mathUtils","../../../support/projectionUtils","../../../support/stack","../../../webgl-engine/lib/Geometry","../../../webgl-engine/lib/GeometryData","../../../webgl-engine/lib/GeometryUtil","../../../webgl-engine/lib/Intersector","../../../webgl-engine/lib/Layer","../../../webgl-engine/lib/Object3D","../../../webgl-engine/materials/ColorMaterial","../../../webgl-engine/materials/MeasurementArrowMaterial","../../../webgl-engine/materials/RibbonLineMaterial","../../../webgl-engine/parts/Model","../../../../interactive/manipulatorUtils"],function(e,t,i,r,n,o,s,a,l,c,d,h,_,u,p,g,m,v,b,L,w,P,f,y,j,C,O,S,A,G,T){var M=[1,.5,0,.75],V={laserLineGlowColor:[1,.5,0],laserLineGlowWidth:8,laserLineInnerColor:[1,1,1],laserLineInnerWidth:.75,laserLineGlobalAlpha:.75,laserLineEnabled:!0,handleColor:[1,.5,0],handleOpacity:.5,handleRadius:5,triangleColor:M,triangleLineWidth:3,triangleCornerSize:32,triangleSubdivisions:128,arrowWidth:16,arrowOutlineColor:[1,.5,0,1],arrowOutlineWidth:.2,arrowStripeEvenColor:[1,1,1,1],arrowStripeOddColor:[1,.5,0,1],arrowStripeLength:16,arrowSubdivisions:128,geodesicProjectionLineWidth:2,geodesicProjectionLineColor:M,guideLineWidth:2,guideLineColor:M,guideStippleLengthPixels:6,labelDistance:25},R=function(){function e(e,t){void 0===t&&(t={}),this._visible=!1,this._laserLineRenderer=null,this._directDistanceLabel=new _,this._horizontalDistanceLabel=new _,this._verticalDistanceLabel=new _,this._handles=new n,this._listenerHandles=null,this._cursorPosition=d.vec3f64.create(),this._startPosition=d.vec3f64.create(),this._endPosition=d.vec3f64.create(),this._centerPosition=d.vec3f64.create(),this._cornerPosition=d.vec3f64.create(),this._arrowLabelSegment=new u,this._horizontalLabelSegment=new u,this._verticalLabelSegment=new u,this._geodesicProjectionLabelSegment=new u,this._origin=d.vec3f64.create(),this._originTransform=a.mat4f64.create(),this._lastDraggedHandle=null,this._model=e,this._sceneView=e.sceneView,this._params=m.copyParameter(V,t),this._layer=new j("point-to-point-measurement",{isPickable:!1}),this._createMaterials(),this._createObjects(),this._intersector=new y(this._sceneView.viewingMode)}return e.prototype.destroy=function(){this.hide(),this._handles.destroy(),this._handles=null},Object.defineProperty(e.prototype,"requiresCursorPoint",{get:function(){return"initial"===this._model.state&&this._model.active},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"cameraAboveGround",{get:function(){return this._sceneView.state.camera.aboveGround},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"visible",{get:function(){return this._visible},set:function(e){e?this.show():this.hide()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"testData",{get:function(){return{labels:{direct:this._directDistanceLabel,horizontal:this._horizontalDistanceLabel,vertical:this._verticalDistanceLabel},laserLineRenderer:this._laserLineRenderer}},enumerable:!0,configurable:!0}),e.prototype.createManipulators=function(){var e=this,t=function(){var t=T.createSphereManipulator(e._sceneView,e._params.handleColor,e._params.handleOpacity);return t.visible=!1,t.hideOnGrab=!0,t.radius=e._params.handleRadius,t},i=t(),r=t();this._model.startPoint&&(i.mapPoint=this._model.startPoint,i.visible=!0),this._model.endPoint&&(r.mapPoint=this._model.endPoint,r.visible=!0);var n=function(){var t=e._lastDraggedHandle;i.grabbing&&!r.grabbing&&(t="start"),r.grabbing&&!i.grabbing&&(t="end"),i.grabbing||r.grabbing||(t=null);var n=t!==e._lastDraggedHandle;e._lastDraggedHandle=t,n&&e.visible&&e._updateLaserLine()};return this._handles.add([i.watch("grabbing",function(){n()}),r.watch("grabbing",function(){n()})]),{start:i,end:r}},e.prototype.show=function(){if(!this._visible){this._visible=!0;var e=this._sceneView._stage,t={glowColor:this._params.laserLineGlowColor,glowWidth:this._params.laserLineGlowWidth,innerColor:this._params.laserLineInnerColor,innerWidth:this._params.laserLineInnerWidth,globalAlpha:this._params.laserLineGlobalAlpha};this._laserLineRenderer=new h(this._sceneView.renderCoordsHelper,t),e.addRenderPlugin(this._laserLineRenderer.renderSlots,this._laserLineRenderer),this._addToStage(e),this._directDistanceLabel.addToView(this._sceneView),this._horizontalDistanceLabel.addToView(this._sceneView),this._verticalDistanceLabel.addToView(this._sceneView),this._initializeListeners(),this._updateCursorPosition(),this._updateStartPosition(),this._updateEndPosition(),this._updateLaserLine(),this._updateView()}},e.prototype.hide=function(){if(this._visible){this._visible=!1;var e=this._sceneView._stage;e.removeRenderPlugin(this._laserLineRenderer),this._laserLineRenderer=null,this._removeFromStage(e),this._directDistanceLabel.removeFromView(this._sceneView),this._horizontalDistanceLabel.removeFromView(this._sceneView),this._verticalDistanceLabel.removeFromView(this._sceneView),this._destroyListeners(),this._sceneView.cursor=null}},e.prototype.pick=function(t){var i=this._sceneView.spatialReference,r=o.screenPointObjectToArray(t.screenPoint),n=this._sceneView.sceneIntersectionHelper.intersectToolIntersectorScreen(r,this._intersector),s=n.results.min,a=d.vec3f64.create();if(!s.getIntersectionPoint(a))return new e.PickResult;var l=this._sceneView.renderCoordsHelper.fromRenderCoords(a,i),c="TerrainRenderer"===s.intersector?"ground":"feature";return new e.PickResult(c,a,l)},e.prototype.getElevation=function(e){return this._sceneView.basemapTerrain.ready?this._sceneView.basemapTerrain.getElevation(e)||0:0},e.prototype.overlappingHandles=function(e,t){return m.pointToPointScreenDistance(e,t,this._sceneView)<=this._params.handleRadius},e.prototype._createMaterials=function(){this._triangleLineMaterial=new A({width:this._params.triangleLineWidth,color:this._params.triangleColor,polygonOffset:!0},"triangle-line"),this._triangleLineMaterial.renderOccluded=4,this._triangleCornerMaterial=new O({color:this._params.triangleColor,transparent:!0,writeDepth:!1,polygonOffset:!0},"triangle-corner"),this._triangleCornerMaterial.renderOccluded=4,this._arrowMaterial=new S({outlineColor:this._params.arrowOutlineColor,stripeEvenColor:this._params.arrowStripeEvenColor,stripeOddColor:this._params.arrowStripeOddColor,polygonOffset:!0},"arrow"),this._arrowMaterial.renderOccluded=4,this._geodesicProjectionLineMaterial=new A({width:this._params.geodesicProjectionLineWidth,color:this._params.geodesicProjectionLineColor,polygonOffset:!0},"geodesic-line"),this._geodesicProjectionLineMaterial.renderOccluded=4,this._geodesicGuideLineMaterial=new A({width:this._params.guideLineWidth,color:this._params.geodesicProjectionLineColor,polygonOffset:!0,stippleLength:0},"geodesic-guide"),this._geodesicGuideLineMaterial.renderOccluded=4},e.prototype._createObjects=function(){this._triangleLineObject=new C,this._layer.addObject(this._triangleLineObject),this._triangleCornerObject=new C,this._layer.addObject(this._triangleCornerObject),this._arrowObject=new C,this._layer.addObject(this._arrowObject),this._geodesicProjectionLineObject=new C,this._layer.addObject(this._geodesicProjectionLineObject),this._geodesicProjectionStartGuideObject=new C,this._layer.addObject(this._geodesicProjectionStartGuideObject),this._geodesicProjectionEndGuideObject=new C,this._layer.addObject(this._geodesicProjectionEndGuideObject)},e.prototype._addToStage=function(e){e.add(G.ContentType.LAYER,this._layer),e.add(G.ContentType.MATERIAL,this._triangleLineMaterial),e.add(G.ContentType.MATERIAL,this._triangleCornerMaterial),e.add(G.ContentType.MATERIAL,this._arrowMaterial),e.add(G.ContentType.MATERIAL,this._geodesicProjectionLineMaterial),e.add(G.ContentType.MATERIAL,this._geodesicGuideLineMaterial),e.add(G.ContentType.OBJECT,this._triangleLineObject),e.add(G.ContentType.OBJECT,this._triangleCornerObject),e.add(G.ContentType.OBJECT,this._arrowObject),e.add(G.ContentType.OBJECT,this._geodesicProjectionLineObject),e.add(G.ContentType.OBJECT,this._geodesicProjectionStartGuideObject),e.add(G.ContentType.OBJECT,this._geodesicProjectionEndGuideObject),e.addToViewContent([this._layer.id])},e.prototype._removeFromStage=function(e){e.removeFromViewContent([this._layer.id]),e.remove(G.ContentType.LAYER,this._layer.id),e.remove(G.ContentType.MATERIAL,this._triangleLineMaterial.id),e.remove(G.ContentType.MATERIAL,this._triangleCornerMaterial.id),e.remove(G.ContentType.MATERIAL,this._arrowMaterial.id),e.remove(G.ContentType.MATERIAL,this._geodesicProjectionLineMaterial.id),e.remove(G.ContentType.MATERIAL,this._geodesicGuideLineMaterial.id),e.remove(G.ContentType.OBJECT,this._triangleLineObject.id),e.remove(G.ContentType.OBJECT,this._triangleCornerObject.id),e.remove(G.ContentType.OBJECT,this._arrowObject.id),e.remove(G.ContentType.OBJECT,this._geodesicProjectionLineObject.id),e.remove(G.ContentType.OBJECT,this._geodesicProjectionStartGuideObject.id),e.remove(G.ContentType.OBJECT,this._geodesicProjectionEndGuideObject.id)},e.prototype._getLabelPositions=function(e,t,i,r,n){var s=this._model.triangleView,a=s.collapsed,c=o.castRenderScreenPointArray3(L.sv3d.get()),d=o.castRenderScreenPointArray3(L.sv3d.get());n.projectPoint(i,c),n.projectPoint(t,d);var h={direct:a?"top":"bottom",horizontal:"top",vertical:c[0]<d[0]?"left":"right"};if(!a){var _=L.sv2d.get(),u=L.sv2d.get();if(m.screenSpaceTangent(e,i,_,n),m.screenSpaceTangent(e,t,u,n),l.vec2.dot(_,u)>=E)h.direct=v.sign(_[1])===v.sign(u[1])?p.mirrorPosition(h.vertical):h.vertical;else{var g=o.castRenderScreenPointArray(L.sv2d.get());m.screenSpaceTangent(i,t,g,n),l.vec2.dot(g,u)>=E&&(h.direct=v.sign(g[0])===v.sign(u[0])?p.mirrorPosition(h.horizontal):h.horizontal)}}if("below-the-surface"===r){var b=function(e){return"top"===e?"bottom":"top"};h.direct=b(h.direct),h.horizontal=b(h.horizontal),h.vertical=b(h.vertical)}return h},e.prototype._updateView=function(){var e;if(this._sceneView.ready){var t=this._sceneView._stage,i=t.getCamera(),r=this._sceneView.renderCoordsHelper,n=this._model.triangleView;if(!n.visible)return this._triangleLineObject.removeAllGeometries(),this._triangleCornerObject.removeAllGeometries(),this._arrowObject.removeAllGeometries(),this._geodesicProjectionLineObject.removeAllGeometries(),this._geodesicProjectionStartGuideObject.removeAllGeometries(),this._geodesicProjectionEndGuideObject.removeAllGeometries(),this._directDistanceLabel.visible=!1,this._horizontalDistanceLabel.visible=!1,void(this._verticalDistanceLabel.visible=!1);var o="camera-dependent"===this._model.measurementSurfaceLocation?this._sceneView.state.camera.aboveGround?"above-the-surface":"below-the-surface":this._model.measurementSurfaceLocation,a=this._startPosition,l=this._endPosition,d="above-the-surface"===o?1:-1,h=d*(r.getAltitude(l)-r.getAltitude(a));h<0&&(e=[l,a],a=e[0],l=e[1]);var _=this._cornerPosition;r.worldUpAtPosition(a,_),c.vec3.scale(_,_,d*Math.abs(h)),c.vec3.add(_,_,a);var u=this._centerPosition;m.midpoint([a,l,_],u),c.vec3.copy(this._origin,u),s.mat4.identity(this._originTransform),s.mat4.translate(this._originTransform,this._originTransform,this._origin),n.collapsed?(this._triangleLineObject.removeAllGeometries(),this._triangleCornerObject.removeAllGeometries()):this._updateTriangleObjects(this._triangleLineObject,this._triangleCornerObject,a,l,_,this._origin,this._originTransform,i,n.mode,this._horizontalLabelSegment,this._verticalLabelSegment),this._updateArrowObject(this._arrowObject,this._startPosition,this._endPosition,this._origin,this._originTransform,n.stripeLength,i,n.mode,this._arrowLabelSegment);var p=this._requiresGeodesicGuides(this._startPosition,this._endPosition,i,n.mode);this._updateGeodesicProjectionLineObject(this._geodesicProjectionLineObject,this._startPosition,this._endPosition,this._origin,this._originTransform,p,this._geodesicProjectionLabelSegment),this._updateGeodesicProjectionGuideObjects(i,p);var g=this._params.labelDistance,v=this._getLabelPositions(a,l,_,o,i);this._updateAuxiliaryMeasureLabels(n,i,v),"geodesic"!==n.mode?this._updateLabel(this._directDistanceLabel,this._arrowLabelSegment,g,v.direct,n.directLabel,n.visible,16,i):(this._updateLabel(this._horizontalDistanceLabel,p?this._geodesicProjectionLabelSegment:this._arrowLabelSegment,g,v.horizontal,n.horizontalLabel,n.visible,16,i),this._directDistanceLabel.visible=!1)}},e.prototype._updateAuxiliaryMeasureLabels=function(e,t,i){if(e.collapsed)return this._horizontalDistanceLabel.visible=!1,void(this._verticalDistanceLabel.visible=!1);var r=this._params.labelDistance;this._updateLabel(this._horizontalDistanceLabel,this._horizontalLabelSegment,r,i.horizontal,e.horizontalLabel,!0,12,t),this._updateLabel(this._verticalDistanceLabel,this._verticalLabelSegment,r,i.vertical,e.verticalLabel,!0,12,t)},e.prototype._updateTriangleObjects=function(e,t,i,r,n,o,s,a,l,d,h){var _=[c.vec3.subtract(L.sv3d.get(),i,o),c.vec3.subtract(L.sv3d.get(),n,o),c.vec3.subtract(L.sv3d.get(),r,o)];d.update(n,r),h.update(i,n);var u=new w(f.createPolylineGeometry(_),"triangle-line");e.removeAllGeometries(),e.addGeometry(u,this._triangleLineMaterial,s);var p=L.sv3d.get(),g=L.sv3d.get();c.vec3.subtract(p,n,i),c.vec3.normalize(p,p),c.vec3.subtract(g,r,n),c.vec3.normalize(g,g);var m=.33*Math.min(c.vec3.distance(n,i),c.vec3.distance(n,r)),v=this._params.triangleCornerSize*a.computeScreenPixelSizeAt(n),b=Math.min(m,v),P=new w(this._quadGeometryData(n,p,g,b,o),"triangle-corner");t.removeAllGeometries(),t.addGeometry(P,this._triangleCornerMaterial,s)},e.prototype._updateArrowObject=function(e,t,i,r,n,o,s,a,l){this._createInterpolatedLineGeometry(e,this._arrowMaterial,"arrow",t,i,r,n,a,this._arrowLabelSegment);var c=s.computeScreenPixelSizeAt(l.origin);this._arrowMaterial.setParameterValues({width:this._params.arrowWidth*c,stripeLength:o})},e.prototype._getSegmentInterpolator=function(e,t){var i=this._sceneView.spatialReference,r=this._sceneView.renderCoordsHelper,n=r.spatialReference;return b.canProject(i,b.SphericalECEFSpatialReference)?new g.Spherical(e,t,n,n):new g.Linear(e,t)},e.prototype._updateGeodesicProjectionLineObject=function(e,t,i,r,n,o,s){if(!o)return void e.removeAllGeometries();var a=this._sceneView.renderCoordsHelper,l=c.vec3.copy(L.sv3d.get(),t),d=c.vec3.copy(L.sv3d.get(),i);a.setAltitude(0,l),a.setAltitude(0,d),this._createInterpolatedLineGeometry(e,this._geodesicProjectionLineMaterial,"geodesicProjectionLine",l,d,r,n,"geodesic",s)},e.prototype._requiresGeodesicGuides=function(e,t,i,r){return!("geodesic"!==r||!this._model.geodesicDistanceExceeded)&&(this._requiresGeodesicGuideAt(e,i)||this._requiresGeodesicGuideAt(t,i))},e.prototype._requiresGeodesicGuideAt=function(e,t){var i=this._sceneView.renderCoordsHelper,r=t.computeScreenPixelSizeAt(e);return i.getAltitude(e)/r>=10},e.prototype._updateGeodesicProjectionGuideObjects=function(e,t){if(!t)return this._geodesicProjectionStartGuideObject.removeAllGeometries(),void this._geodesicProjectionEndGuideObject.removeAllGeometries();var i=this._sceneView.renderCoordsHelper,r=c.vec3.copy(L.sv3d.get(),this._startPosition),n=c.vec3.copy(L.sv3d.get(),this._endPosition);i.setAltitude(0,r),i.setAltitude(0,n),this._createInterpolatedLineGeometry(this._geodesicProjectionStartGuideObject,this._geodesicGuideLineMaterial,"geodesicGuideLine",r,this._startPosition,this._origin,this._originTransform,"euclidean"),this._createInterpolatedLineGeometry(this._geodesicProjectionEndGuideObject,this._geodesicGuideLineMaterial,"geodesicGuideLine",n,this._endPosition,this._origin,this._originTransform,"euclidean");var o=Math.min(e.computeScreenPixelSizeAt(this._startPosition),e.computeScreenPixelSizeAt(r),e.computeScreenPixelSizeAt(this._endPosition),e.computeScreenPixelSizeAt(n));this._geodesicGuideLineMaterial.setParameterValues({stippleLength:this._params.guideStippleLengthPixels*o})},e.prototype._createInterpolatedLineGeometry=function(e,t,i,r,n,o,s,a,l){var d=this._sceneView.renderCoordsHelper,h=[],_=[],u=function(e,t){var i=L.sv3d.get();c.vec3.subtract(i,e,o),h.push(i),_.push(t)};if("euclidean"===a){var p=L.sv3d.get();m.midpoint([r,n],p);var g=L.sv3d.get();d.worldUpAtPosition(p,g),u(r,g),u(n,g),l&&l.update(r,n)}else{for(var v=this._getSegmentInterpolator(r,n),b=this._params.arrowSubdivisions+1&-2,P=null,y=null,j=0;j<b;++j){var C=j/(b-1),O=L.sv3d.get(),g=L.sv3d.get();v.eval(C,O),d.worldUpAtPosition(O,g),j===b/2-1?P=O:j===b/2&&(y=O),u(O,g)}l&&l.update(P,y)}var S=new w(f.createPolylineGeometry(h,_),i);e.removeAllGeometries(),e.addGeometry(S,t,s)},e.prototype._quadGeometryData=function(e,t,i,r,n){var o=L.sv3d.get(),s=[],a=L.sv3d.get();c.vec3.scale(a,i,r);var l=L.sv3d.get();c.vec3.scale(l,t,-r);for(var d=0;d<4;++d)c.vec3.copy(o,e),c.vec3.subtract(o,o,n),1&d&&c.vec3.add(o,o,a),2&d&&c.vec3.add(o,o,l),s.push(o[0],o[1],o[2]);return new P({position:{size:3,data:s}},{position:new Uint32Array([0,1,2,1,2,3])})},e.prototype._updateLabel=function(e,t,i,r,n,s,a,l){var c=o.castScreenPointArray(L.sv2d.get()),d=o.castScreenPointArray(L.sv2d.get()),h=p.computeLabelPositionFromSegment(l,t,i,r,c,d);e.updatePosition(c,d),e.text=n,e.visible=h&&s,e.fontSize=a},e.prototype._updateCursorPosition=function(){this._model.cursorPoint&&this._sceneView.renderCoordsHelper.toRenderCoords(this._model.cursorPoint,this._cursorPosition),this._updateLaserLine()},e.prototype._updateStartPosition=function(){this._model.startPoint&&this._sceneView.renderCoordsHelper.toRenderCoords(this._model.startPoint,this._startPosition)},e.prototype._updateEndPosition=function(){this._model.endPoint&&this._sceneView.renderCoordsHelper.toRenderCoords(this._model.endPoint,this._endPosition)},e.prototype._getFocusPosition=function(){var e=this._model,t=e.triangleView.visible&&e.triangleView.collapsed&&"euclidean"===e.measurementMode;switch(e.state){case"drawing":return t?this._startPosition:e.endPoint?this._endPosition:this._startPosition;case"editing":return t?"start"===this._lastDraggedHandle?this._endPosition:this._startPosition:"start"===this._lastDraggedHandle?this._startPosition:this._endPosition;default:return e.cursorPoint?this._cursorPosition:null}},e.prototype._getFocusSpherePosition=function(){return"drawing"===this._model.state||"end"===this._lastDraggedHandle?this._startPosition:this._endPosition},e.prototype._updateLaserLine=function(){var e=this._model,t=this._getFocusPosition(),i=this._params.laserLineEnabled&&!!t&&"measured"!==e.state&&e.active;i?(this._laserLineRenderer.focusPlaneActive=i&&"euclidean"===e.measurementMode,this._laserLineRenderer.focusSphereActive=i&&!!e.startPoint&&"geodesic"===e.measurementMode,this._laserLineRenderer.focusPosition=t,this._laserLineRenderer.focusSpherePosition=this._getFocusSpherePosition(),this._laserLineRenderer.segmentActive=i&&e.triangleView.visible&&!e.triangleView.collapsed,this._laserLineRenderer.segmentStartPosition=this._startPosition,this._laserLineRenderer.segmentEndPosition=this._endPosition):(this._laserLineRenderer.focusPlaneActive=!1,this._laserLineRenderer.focusSphereActive=!1,this._laserLineRenderer.segmentActive=!1)},e.prototype._initializeListeners=function(){var e=this;this._listenerHandles=new n,this._listenerHandles.add([this._model.watch("state",function(){e._updateLaserLine()}),this._model.watch("measurementMode",function(){e._updateLaserLine()}),this._model.watch("hoveredHandle",function(){e._updateView()}),this._model.watch("cursorPoint",function(){e._updateCursorPosition()}),this._model.watch("startPoint",function(){e._updateStartPosition(),e._updateView(),e._updateLaserLine()}),this._model.watch("endPoint",function(){e._updateEndPosition(),e._updateView(),e._updateLaserLine()}),this._model.watch("unit",function(){e._updateView()}),this._model.watch("active",function(){e._updateLaserLine(),e._updateView()}),this._sceneView.state.watch("camera",function(){e._updateView()})])},e.prototype._destroyListeners=function(){this._listenerHandles.destroy(),this._listenerHandles=null},e}();!function(e){var t=function(){function e(){}return e}();e.PickRequest=t;var i=function(){function e(e,t,i){void 0===e&&(e=null),void 0===t&&(t=null),void 0===i&&(i=null),this.type=e,this.scenePoint=t,this.mapPoint=i}return e}();e.PickResult=i}(R||(R={}));var E=Math.cos(v.deg2rad(12));return R});