function boardRenderer(context,model){
	this._ctx = context;
	this._model = model;
	this._cols = model.getCols();
	this._rows = model.getRows();
	this._x = 0;
	this._y = 0;
	this._width = 0;
	this._height = 0;
	this._cellSize = 0;
}
//重绘
boardRenderer.prototype.repaint = function (){
	this._ctx.save();
	this._ctx.translate(this._x,this._y);
	this._drawBackground();
	this._drawGrid();
	this._ctx.restore();
	for (var i = 0;i<this._cols;i++){
		for(var j =0;j<this._rows;j++){
			this.drawToken(i,j);
		}
	}
}
//设置旋转角度
function reorient(ctx){
	var angle = window.orientation;
	if(angle){
		var rot = -Math.PI*(angle/180);
		ctx.translate(angle==-90?canvas.width :0,
		angle == 90? canvas.height : 0);
		ctx.rotate(rot);
	}
}
/**
 * 设置棋盘大小
 * @param {[type]}
 * @param {[type]}
 * @param {[type]}
 */
boardRenderer.prototype.setSize = function(x,y,cellSize){
	this._x = x;
	this._y = y;
	this._cellSize = cellSize;
	this._width = this._cellSize * this._cols;
	this._height = this._cellSize * this._rows;
}
/**
 * 绘制背景
 * @return {[type]}
 */
boardRenderer.prototype._drawBackground = function(){
	var ctx = this._ctx;
	//背景
	var gradient = ctx.createLinearGradient(0,0,0,this._height);
	gradient.addColorStop(0,"#fffbb3");
	gradient.addColorStop(1,"#f6f6b2");
	ctx.fillStyle = gradient;
	ctx.fillRect(0,0,this._width,this._height);

	//绘制曲线
	var co = this._width/6;
	ctx.strokeStyle = "#dad7ac";
	ctx.fillStyle = "#f6f6b2";

	//第一条线
	ctx.beginPath();
	ctx.moveTo(co,this._height);
	ctx.bezierCurveTo(this._width+co*3,-co,-co*3,-co,this._width- co,this._height);
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(this._width+co*3,this._height+co,-co*3,this._height+co,this._width -co, 0);
	ctx.fill();
}

/**
 * 绘制格子
 * @return {[type]}
 */
boardRenderer.prototype._drawGrid = function (){
	var ctx = this._ctx;
	ctx.beginPath();
	//垂直线
	for (var i = 0;i <= this._cols;i++) {
		ctx.moveTo(i*this._cellSize+0.5,0.5);
		ctx.lineTo(i*this._cellSize+0.5,this._height+0.5);
	};
	//水平线
	for(var j = 0;j <=this._rows;j++){
		ctx.moveTo(0.5,j*this._cellSize+0.5);
		ctx.lineTo(this._width+0.5,j*this._cellSize+0.5);
	}
	ctx.strokeStyle = "#cccccc";
	ctx.stroke();
}

boardRenderer.prototype.drawToken = function(cellX,cellY){
	var ctx = this._ctx;
	var cellSize = this._cellSize;
	var tokenType = this._model.getPiece(cellX,cellY);
	if(!tokenType){
		return;
	}

	var colorCode = "black";
	switch(tokenType){
		case boardModel.RED:
			colorCode = "red";
			break;
		case boardModel.GREEN:
			colorCode = "green";
			break;
	}

	//标记圆心
	var x = this._x +(cellX+0.5)*cellSize;
	var y = this._y + (cellY+0.5)*cellSize;
	ctx.save();
	ctx.translate(x,y);

	var radius = cellSize * 0.4;
	var gradientX = cellSize*0.1;
	var gradientY = -cellSize *0.1;
	var gradient = ctx.createLinearGradient(gradientX,gradientY,cellSize*0.1,gradientX,gradientY,radius*1.2);
	gradient.addColorStop(0,"yellow");
	gradient.addColorStop(1,colorCode);
	ctx.fillStyle = gradient;

	ctx.beginPath();
	ctx.arc(0,0,radius,0,2*Math.PI,true);
	ctx.fill();
	ctx.restore();

}


