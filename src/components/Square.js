import React, { Component } from 'react';
import images from '../assets/images.js';
import './Square.css'

class Square extends Component {

	isEqualTo(square) {
		return square.props.pos.x === this.props.pos.x && square.props.pos.y === this.props.pos.y
	}

	render() { 
		var classes = "square " + (this.props.piece ? this.props.piece.color : "");

 		if (this.props.activeSquare) {
			if (this.props.activeSquare.isEqualTo(this)) {
				classes = "square active " + (this.props.piece ? this.props.piece.color : "")
			}
		}
		
		return (
			<div className={classes} onClick={() => this.props.toggle(this)}>
				{this.props.piece &&
					<img src={images[this.props.piece.color + this.props.piece.type]} height="50" width="50"/>
				}
			</div>
		)
	}
}

export default Square