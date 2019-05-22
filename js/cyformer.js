class cyformer{
	constructor(){
		var cft = this;
		cft.objects = new Array();

		cft.object = class{
			constructor(){
				var tobj = this;
				this.parent = null;
                                this.children = new Array();
                                this.width = 100;
                                this.height = 100;
                                this.position = {"x":0,"y":0};
                                this.renderPriority = 0;
				this.size = 1;
				this.rotation = 0;
				this.rotate = function(degree){
					tobj.rotation += degree;
					if(tobj.rotation < 0){
						tobj.rotation += 360;
					}else if(tobj.rotation > 359){
						tobj.rotation -= 360;
					}
					return tobj.rotation;
				}
				this.setRotation = function(degree){
					tobj.rotation = degree;
					if(tobj.rotation < 0){
						tobj.rotation += 360;
					}else if(tobj.rotation > 359){
						tobj.rotation -= 360;
					}
					return tobj.rotation;
				}
				this.getRotation = function(){
					if(tobj.parent != null){
						return tobj.rotation+tobj.parent.getRotation();
					}else{
						return tobj.rotation;
					}
				}
				cft.objects.push(this);
				this.getPosX = function(){
					if(tobj.parent != null){
						return tobj.position.x*tobj.getSize()+tobj.parent.getPosX();
					}else{
						return tobj.position.x*tobj.getSize();
					}
				};
				this.getPosY = function(){
					if(tobj.parent != null){
						return tobj.position.y*tobj.getSize()+tobj.parent.getPosY();
					}else{
						return tobj.position.y*tobj.getSize();
					}
				};
				this.getSize = function(){
					if(tobj.parent != null){
						return tobj.size*tobj.parent.getSize();
					}else{
						return tobj.size;
					}
				}
				this.getWidth = function(){
					return this.width*this.getSize();
				}
				this.getHeight = function(){
					return this.height*this.getSize();
				}
				var glide = false;
				var glideSpeed = 0.5;
				var glidePosition = {x:0,y:0};
				var glideSpeedX = 0;
				var glideSpeedY = 0;
				this.objRender = function(ctx){
					this.sortChildren();
					this.children.forEach(function(val,id){
						val.render(ctx);
					});
					if(glide){
						if(tobj.position.x >= glidePosition.x-Math.abs(glideSpeedX) && tobj.position.x <= glidePosition.x+Math.abs(glideSpeedX)){
							glideSpeedX = 0;
							tobj.position.x = glidePosition.x;
						}else{
							tobj.position.x += glideSpeedX;
						}
						if(tobj.position.y >= glidePosition.y-Math.abs(glideSpeedY) && tobj.position.y <= glidePosition.y+Math.abs(glideSpeedY)){
							glideSpeedY = 0;
							tobj.position.y = glidePosition.y;
						}else{
							tobj.position.y += glideSpeedY;
						}
						if(glideSpeedY == 0 && glideSpeedX == 0){
							glide = false;
						}
					}
				}
				this.render = function(ctx){
					this.objRender();
				};
				function clearParentAndChildren(obj){
					cft.objects.forEach(function(val,idx){
						if(val.parent == obj){
							val.parent = null;
						}
						val.children.forEach(function(cVal,cIdx){
							if(cVal == obj){
								val.children.splice(cIdx,1);
							}
						});
					});
				};
				this.sortChildren = function(){
					if(tobj.children.length > 1){
						function compare(a,b){
							if(a.renderPriority < b.renderPriority){
								return -1;
							}else if(a.renderPriority > b.renderPriority){
								return 1;
							}else{
								return 0;
							}
						}

						tobj.children.sort(compare);
					}
				};
				this.add = function(obj){
					clearParentAndChildren(obj);
					this.children.push(obj);
					obj.parent = this;
				};
				this.addTo = function(obj){
					clearParentAndChildren(obj);
					obj.children.push(this);
					this.parent = obj;
				}
				this.moveTo = function(x,y){
					this.position.x = x;
					this.position.y = y;
				}
				this.glideTo = function(x,y,speed = 0.5){
					var xA = 1;
					var yA = 1;
					glidePosition = {x:x,y:y};
					if(x != this.position.x || y != this.position.y){
						glideSpeed = speed;
						glide = true;
						var dX = glidePosition.x - tobj.position.x;
						var dY = glidePosition.y - tobj.position.y;

						if(dX < 0){
							xA = -1;
							dX = Math.abs(dX);
						}
						if(dY < 0){
							yA = -1;
							dY = Math.abs(dY);
						}

						glideSpeedX = dX/(dX+dY);
						glideSpeedY = dY/(dX+dY);

						glideSpeedX*=xA*glideSpeed;
						glideSpeedY*=yA*glideSpeed;

						//console.log("dX:"+dX+"; dY:"+dY+"; toX:"+x+"; toY:"+y+" pX:"+tobj.position.x+"; pY:"+tobj.position.y+"; gSX:"+glideSpeedX+"; gSY:"+glideSpeedY);
					}
				}
			}
		}

		cft.rectObject = class rectObject extends cft.object {
			constructor(){
				super();
				var tobj = this;
				tobj.visible = true;
				this.render = function(ctx){
					//ctx.save();
					ctx.translate(tobj.getPosX(),tobj.getPosY());
					ctx.rotate(Math.PI / 180 * (tobj.getRotation()));
					//ctx.translate(-tobj.getPosX(),-tobj.getPosY());
					//ctx.translate(tobj.getPosX(),tobj.getPosY());
					if(tobj.visible){
						ctx.globalAlpha = tobj.alpha;
						ctx.fillStyle = this.color;
						if(tobj.borderColor == ""){
							ctx.strokeStyle = this.color;
						}else{
							ctx.strokeStyle = this.borderColor;
						}

						if(tobj.filled){
							ctx.fillStyle = this.color;
							ctx.fillRect(0-(this.getWidth()/2),0-(this.getHeight()/2),this.getWidth(),this.getHeight());
						}
						if(tobj.borderVisible){
							ctx.strokeRect(0-(this.getWidth()/2),0-(this.getHeight()/2),this.getWidth(),this.getHeight());
							ctx.stroke();
						}
					}
					ctx.translate(-tobj.getPosX(),-tobj.getPosY());
					ctx.rotate(-(Math.PI / 180 * tobj.getRotation()));
					//ctx.restore();
					this.objRender(ctx);
				}
				this.filled = true;
				this.color = "#000000";
				tobj.borderVisible = true;
				tobj.borderColor = "";
				tobj.alpha = 1;
			}
		}

		cft.sceneObject = class sceneObject extends cft.object {
			constructor(ctx){
				super();
				this.render = function(ctx){
					ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
					this.objRender(ctx);
				}
			}
		};

		cft.scene = new cft.sceneObject(ctx);

		cft.render = function(){
			cft.scene.render(ctx);
		}
	}
}
