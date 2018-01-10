// COPYRIGHT © 2017 Esri
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
// See http://js.arcgis.com/4.6/esri/copyright.txt for details.

define(["require","exports","../../../webgl/Program","../../../webgl/VertexArrayObject","../../../webgl/BufferObject","../../../webgl/Texture","../../../webgl/FramebufferObject","../../support/imageUtils","../../../webgl/enums"],function(e,t,r,i,s,a,h,o,n){var d=null,l=function(){function t(e){this.isEnabled=!1,this.vertexAttributeLocations={vPosition:0},this.vertexBufferLayout=[{name:"vPosition",count:2,type:5126,offset:0,stride:8,normalized:!1}],this.rctx=e}return t.prototype.ensureEnabled=function(){if(this.isEnabled)return!0;if(!d)return e(["./SmaaRenderPassData"],function(e){d=e}),!1;var t=this.rctx;this.programEdgeDetect=new r(t,d.edgeDetectShader.vertex,d.edgeDetectShader.fragment,this.vertexAttributeLocations),this.programBlendWeights=new r(t,d.blendWeightShader.vertex,d.blendWeightShader.fragment,this.vertexAttributeLocations),this.programBlur=new r(t,d.blurShader.vertex,d.blurShader.fragment,this.vertexAttributeLocations);var a=new Float32Array([-1,-1,3,-1,-1,3]);return this.vao=new i(t,this.vertexAttributeLocations,{geometry:this.vertexBufferLayout},{geometry:new s(t,34962,35044,a)}),this.tmpFramebufferEdges=h.createWithAttachments(this.rctx,{target:3553,pixelFormat:6407,dataType:5121,samplingMode:9729,wrapMode:33071,width:4,height:4},{colorTarget:0,depthStencilTarget:0}),this.tmpFramebufferBlend=h.createWithAttachments(this.rctx,{target:3553,pixelFormat:6408,dataType:5121,samplingMode:9729,wrapMode:33071,width:4,height:4},{colorTarget:0,depthStencilTarget:0}),this.textureArea=this.loadTextureFromBase64(d.areaTexture,9729,6407),this.textureSearch=this.loadTextureFromBase64(d.searchTexure,9728,6409),this.isEnabled=!0,!0},t.prototype.disable=function(){this.isEnabled&&(this.programEdgeDetect.dispose(),this.programEdgeDetect=null,this.programBlendWeights.dispose(),this.programBlendWeights=null,this.programBlur.dispose(),this.programBlur=null,this.vao.dispose(),this.vao=null,this.textureArea.dispose(),this.textureArea=null,this.textureSearch.dispose(),this.textureSearch=null,this.tmpFramebufferBlend.dispose(),this.tmpFramebufferBlend=null,this.tmpFramebufferEdges.dispose(),this.tmpFramebufferEdges=null,this.isEnabled=!1)},t.prototype.render=function(e,t){this.ensureEnabled();var r=this.rctx,i={x:0,y:0,width:0,height:0};null!=t?(i.width=t.descriptor.width,i.height=t.descriptor.height):(i.width=r.gl.canvas.width,i.height=r.gl.canvas.height),r.bindVAO(this.vao),r.setFaceCullingEnabled(!0),r.setCullFace(1029),r.setFrontFace(2305),r.setBlendingEnabled(!1),r.setDepthTestEnabled(!1),r.setViewport(i.x,i.y,i.width,i.height),this.tmpFramebufferEdges.resize(i.width,i.height),r.bindFramebuffer(this.tmpFramebufferEdges),r.setClearColor(0,0,0,1),r.clear(r.gl.COLOR_BUFFER_BIT),r.bindProgram(this.programEdgeDetect),r.bindTexture(e.colorTexture,0),this.programEdgeDetect.setUniform1i("tColor",0),this.programEdgeDetect.setUniform4f("uResolution",1/i.width,1/i.height,i.width,i.height),r.drawArrays(4,0,3),this.tmpFramebufferBlend.resize(i.width,i.height),r.bindFramebuffer(this.tmpFramebufferBlend),r.setClearColor(0,0,1,1),r.clear(r.gl.COLOR_BUFFER_BIT),r.bindProgram(this.programBlendWeights),this.programBlendWeights.setUniform4f("uResolution",1/i.width,1/i.height,i.width,i.height),r.bindTexture(this.textureSearch,1),this.programBlendWeights.setUniform1i("tSearch",1),r.bindTexture(this.textureArea,2),this.programBlendWeights.setUniform1i("tArea",2),r.bindTexture(this.tmpFramebufferEdges.colorTexture,3),this.programBlendWeights.setUniform1i("tEdges",3),r.drawArrays(4,0,3),r.bindFramebuffer(t),r.setClearColor(0,1,0,1),r.clear(r.gl.COLOR_BUFFER_BIT),r.bindProgram(this.programBlur),this.programBlur.setUniform4f("uResolution",1/i.width,1/i.height,i.width,i.height),r.bindTexture(e.colorTexture,0),this.programBlur.setUniform1i("tColor",0),r.bindTexture(this.tmpFramebufferBlend.colorTexture,1),this.programBlur.setUniform1i("tBlendWeights",1),r.drawArrays(4,0,3),r.setDepthTestEnabled(!0)},t.prototype.loadTextureFromBase64=function(e,t,r){var i=new a(this.rctx,{pixelFormat:r,dataType:5121,wrapMode:33071,samplingMode:t},null);return o.dataUriToImage(e).then(function(e){i.resize(e.width,e.height),i.setData(e)}),i},t}();return l});