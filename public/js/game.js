function game(canvas){
	this._boardRect = null;
	this._canvas = canvas;
	this._ctx = canvas.getContext("2d");
	this._boardModel = new boardModel(7,11);
	this._boardRenderer  = new boardRenderer(this._ctx,this._boardModel);
	this.handleResize();
}
game.prototype.handleResize = function(){
	this._clearCanvas();
	this._boardRect = this._getBoardRect();
	this._boardRenderer.setSize(this._boardRect.x,this._boardRect.y,this._boardRect.cellSize);
	this._boardRenderer.repaint();
}

game.prototype._getBoardRect = function(){
	var cols = this._boardModel.getCols();
	var rows = this._boardModel.getRows();
	var cellSize = Math.floor(Math.min(this._canvas.width/cols,this._canvas.height/rows));
	var boardWidth = cellSize * cols;
	var boardHeight = cellSize * rows; 
	return{
		x:Math.floor((this._canvas.width - boardWidth)/2),
		y:Math.floor((this._canvas.height - boardHeight)/2),
		cellSize: cellSize
	}
}
game.prototype.handleClick = function(x,y){
	var column = Math.floor((x-this._boardRect.x)/this._boardRect.cellSize);
	var turn = this._boardModel.makeTurn(column);

	if(turn.status != boardModel.ILLEGAL_TURN){
		this._boardRenderer.drawToken(turn.x,turn.y);
	}
	if(turn.status == boardModel.WIN){
		alert((turn.piece == boardModel.RED ? "red":"green")+" won the game!");
		this._reset();
	}
	if(turn.status == boardModel.DRAW){
		alert("It is a draw");
		this._reset();
	}
}
game.prototype._reset = function(){
	this._clearCanvas();
	this._boardModel.reset();
	this._boardRenderer.repaint();
}
game.prototype._clearCanvas = function(){
	this._ctx.fillStyle = "white";
	this._ctx.fillRect(0,0,this._canvas.width,this._canvas.height);
}
