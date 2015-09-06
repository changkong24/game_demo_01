function boardModel(cols,rows){
	this._cols = cols || 7;
	this._rows = rows || 11;
	this._data = [];
	this._currentPlayer = boardModel.RED;
	this._totalTokens = 0;
	this.reset();
}

boardModel.EMPTY = 0;
boardModel.RED = 1;
boardModel.GREEN = 2;

boardModel.NONE = 0;//平局或者继续
boardModel.WIN = 1;//赢
boardModel.DRAW = 2;//输
boardModel.ILLEGAL_TURN = 3;//无效

boardModel.prototype.reset = function(){
	this._data = [];
	for(var i = 0;i < this._rows;i++){
		this._data[i] = [];
		for(var j = 0;j < this._cols;j++){
			this._data[i][j] = boardModel.EMPTY;
		}
	}
	this._currentPlayer = boardModel.RED;
	this._totalTokens = 0;
}
boardModel.prototype.getPiece = function(col,row){
	return this._data[row][col];
}
boardModel.prototype.getCols = function(){
	return this._cols;
}
boardModel.prototype.getRows = function(){
	return this._rows;
}

boardModel.prototype.makeTurn = function(column){
	var piece = this._currentPlayer;
	if(column < 0 || column >this._cols){
		return {
			status:boardModel.ILLEGAL_TURN
		}
	}
	var row = this._getEmptyRow(column);
	if(row == -1){
		return {
			status:boardModel.ILLEGAL_TURN
		}
	}
	this._totalTokens ++;
	this._data[row][column] = piece;

	this._toggleCurrentPlayer();
	return{
		status:this._getGameState(column,row),
		x:column,
		y:row,
		piece:piece
	}
}

boardModel.prototype._getEmptyRow = function(column){
	for(var i = this._rows -1 ;i>=0;i--){
		if(!this.getPiece(column,i)){
			return i;
		}
	}
	return -1;
}

boardModel.prototype._toggleCurrentPlayer = function(){
	if(this._currentPlayer == boardModel.RED){
		this._currentPlayer = boardModel.GREEN;
	}
	else{
		this._currentPlayer = boardModel.RED;
	}
}

boardModel.prototype._checkWinDirection = function(column,row,deltaX,deltaY){
	var pieceColor = this.getPiece(column,row);
	var tokenCounter = 0;
	var c = column  + deltaX;
	var r = row + deltaY;
	while(c>=0 && r >=0 && c<this._cols && r<this._rows && this.getPiece(c,r) == pieceColor){
		c += deltaX;
		r+=deltaY;
		tokenCounter ++;
	}
	return tokenCounter;
}
boardModel.prototype._getGameState = function(column,row){
	if(this._totalTokens == game.BOARD_WIDTH * game.BOARD_HEIGHT){
		return boardModel.DRAW;
	}
	for(var deltaX = -1;deltaX < 2;deltaX++){
		for(var deltaY = -1;deltaY <2;deltaY ++){
			if(deltaX == 0 && deltaY == 0){
				continue;
			}
			var count = this._checkWinDirection(column,row,deltaX,deltaY) + this._checkWinDirection(column,row,-deltaX,-deltaY) + 1;
			if(count>=4){
				return boardModel.WIN;
			}
		}
	}
	return boardModel.NONE;
}

