import Piece from './pieces.js'
import Vector from './math.js'

class Board {
	constructor() {
		this.grid = []
		this.livePieces = {
			white: {
				rook: [],
				knight: [],
				bishop: [],
				queen: [],
				king: [],
				pawn: []
			},
			black: {
				rook: [],
				knight: [],
				bishop: [],
				queen: [],
				king: [],
				pawn: []
			}
			
		}
		this.capturedPieces = {
			white: {
				rook: [],
				knight: [],
				bishop: [],
				queen: [],
				king: [],
				pawn: []
			},
			black: {
				rook: [],
				knight: [],
				bishop: [],
				queen: [],
				king: [],
				pawn: []
			}
			
		}
	}

	init() {
		const whitePieces = this.livePieces.white
		whitePieces.rook.push(Piece.makePiece("rook", "white"))
		whitePieces.rook.push(Piece.makePiece("rook", "white"))
		whitePieces.knight.push(Piece.makePiece("knight", "white"))
		whitePieces.knight.push(Piece.makePiece("knight", "white"))
		whitePieces.bishop.push(Piece.makePiece("bishop", "white"))
		whitePieces.bishop.push(Piece.makePiece("bishop", "white"))
		whitePieces.queen.push(Piece.makePiece("queen", "white"))
		whitePieces.king.push(Piece.makePiece("king", "white"))
		
		for (var i=0; i<8; i++) {
			whitePieces.pawn.push(Piece.makePiece("pawn", "white"))
		}

		const blackPieces = this.livePieces.black
		blackPieces.rook.push(Piece.makePiece("rook", "black"))
		blackPieces.rook.push(Piece.makePiece("rook", "black"))
		blackPieces.knight.push(Piece.makePiece("knight", "black"))
		blackPieces.knight.push(Piece.makePiece("knight", "black"))
		blackPieces.bishop.push(Piece.makePiece("bishop", "black"))
		blackPieces.bishop.push(Piece.makePiece("bishop", "black"))
		blackPieces.queen.push(Piece.makePiece("queen", "black"))
		blackPieces.king.push(Piece.makePiece("king", "black"))
		
		for (var i=0; i<8; i++) {
			blackPieces.pawn.push(Piece.makePiece("pawn", "black"))
		}

		for (var i = 0; i<8; i++) {
			var row = [];
			if (i===0) {
				whitePieces.rook[0].pos = [0,0]
				row[0] = whitePieces.rook[0]
				whitePieces.knight[0].pos = [1,0]
				row[1] = whitePieces.knight[0]
				whitePieces.bishop[0].pos = [2,0]
				row[2] = whitePieces.bishop[0]
				whitePieces.queen[0].pos = [3,0]
				row[3] = whitePieces.queen[0]
				whitePieces.king[0].pos = [4,0]
				row[4] = whitePieces.king[0]
				whitePieces.bishop[1].pos = [5,0]
				row[5] = whitePieces.bishop[1]
				whitePieces.knight[1].pos = [6,0]
				row[6] = whitePieces.knight[1]
				whitePieces.rook[1].pos =[7,0]
				row[7] = whitePieces.rook[1]
			} else if (i===1) {
				for (var j = 0; j<8; j++) {
					whitePieces.pawn[j].pos = [j,1]
					row[j] = whitePieces.pawn[j]
				}
			} else if (i === 6) {
				for (var j = 0; j<8; j++) {
					blackPieces.pawn[j].pos = [j,6]
					row[j] = blackPieces.pawn[j]
				}
			} else if (i === 7) {
				blackPieces.rook[0].pos = [0,7]
				row[0] = blackPieces.rook[0]
				blackPieces.knight[0].pos = [1,7]
				row[1] = blackPieces.knight[0]
				blackPieces.bishop[0].pos = [2,7]
				row[2] = blackPieces.bishop[0]
				blackPieces.queen[0].pos = [3,7]
				row[3] = blackPieces.queen[0]
				blackPieces.king[0].pos = [4,7]
				row[4] = blackPieces.king[0]
				blackPieces.bishop[1].pos = [5,7]
				row[5] = blackPieces.bishop[1]
				blackPieces.knight[1].pos = [6,7]
				row[6] = blackPieces.knight[1]
				blackPieces.rook[1].pos =[7,7]
				row[7] = blackPieces.rook[1]
			} else {
				for (var j = 0; j<8; j++) {
					row[j] = null
				}
			}
			
			this.grid.push(row)
		}
	}

	copy() {
		//copy method for simulating moves
		const newGrid = [];
		const newLivePieces = {
						white: {
							rook: [],
							knight: [],
							bishop: [],
							queen: [],
							king: [],
							pawn: []
						},
						black: {
							rook: [],
							knight: [],
							bishop: [],
							queen: [],
							king: [],
							pawn: []
						}
						
					};
		for (var i = 0; i<8; i++) {
			let row = [];
			for (var j = 0; j<8; j++) {
				let piece = this.getPieceAtLocation(j,i)
				if (piece) {
					const pieceType = piece.type
					const color = piece.color
					const newPiece = Piece.makePiece(pieceType, color);
					newPiece.pos = piece.pos
					newLivePieces[color][pieceType].push(newPiece)
					row[j] = newPiece
				} else {
					row[j] = null
				}
			}
			newGrid.push(row)
		}
		const newBoard = new Board()
		newBoard.grid = newGrid
		newBoard.livePieces = newLivePieces
		return newBoard
	}

	getPieceAtLocation(x, y) {
		return this.grid[y] ? this.grid[y][x] : null
	}

	removePieceAtLocation(x, y) {
		this.grid[y][x] = null;		
	}

	addPieceAtLocation(piece, x, y) {
		this.grid[y][x] = piece;
		piece.pos[0] = x;
		piece.pos[1] = y;
	}

	movePieceToLocation(piece, x, y) {
		this.removePieceAtLocation(piece.pos[0], piece.pos[1]);
		this.addPieceAtLocation(piece, x, y)
	}

	move(piece, destination) {
		this.removePieceAtLocation(piece.pos[0], piece.pos[1]);
		this.getPieceAtLocation(destination.x, destination.y) ?
			this.capturePieceAtLocation(piece, destination.x, destination.y) :
			this.addPieceAtLocation(piece, destination.x, destination.y)
	}

	simulateMove(piece, destination) {
		this.removePieceAtLocation(piece.pos[0], piece.pos[1]);
		this.removeFromLivePieces(piece)
		let simulatedPiece = Piece.makePiece(piece.type, piece.color)
		this.addToLivePieces(simulatedPiece)
		if (this.getPieceAtLocation(destination.x, destination.y)) {
			this.capturePieceAtLocation(simulatedPiece, destination.x, destination.y)
		} else {
			this.addPieceAtLocation(simulatedPiece, destination.x, destination.y)
		}
	}

	capturePieceAtLocation(capturingPiece, x, y) {
		const capturedPiece = this.getPieceAtLocation(x, y)
		this.capturedPieces[capturedPiece.color][capturedPiece.type].push(capturedPiece)
		this.removeFromLivePieces(capturedPiece)
		this.removePieceAtLocation(x, y)
		this.addPieceAtLocation(capturingPiece, x, y)
	}

	addToLivePieces(piece) {
		piece.color === "black" ? 
		this.livePieces.black[piece.type].push(piece) : 
		this.livePieces.white[piece.type].push(piece)
	}

	removeFromLivePieces(piece) {
		if (piece.color === "black") {
			let indexOfEnemyPiece = this.livePieces.black[piece.type].indexOf(piece)
			this.livePieces.black[piece.type].splice(indexOfEnemyPiece, 1)
		} else {
			let indexOfEnemyPiece = this.livePieces.white[piece.type].indexOf(piece)
			this.livePieces.white[piece.type].splice(indexOfEnemyPiece, 1)
		}
	}

	static onBoard(square) {
		return square.pos.x < 8 && square.pos.x > -1 && square.pos.y < 8 && square.pos.y > -1
	}
}







export default Board