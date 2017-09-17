import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Paper } from 'material-ui/Paper';

class SingleContainer extends Component {
	constructor(props) {
	  super(props)
	  this.state = {
	  	white: "Harry",
	  	black: "Draco",
	  	redirect: false
	  }
	  //bind functions
	  this.handleChange = this.handleChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e, color) {
		console.log(e, color)
		switch (color) {
			case "black":
				this.setState({
					black: e.target.value
				})
				break;
			case "white":
				this.setState({
					white: e.target.value
				})
			default:
				break;
		}	
	}

	handleSubmit() {
		let names = {
        white: this.state.white,
        black: this.state.black
      };
		this.props.updatePlayerNames(names);
		this.setState({
			redirect: true
		})
	}

	render(){
	  return(
	  	<div>
		  	<div className="App-header">
		  	  <h2>Wizards Chess</h2>
		  	</div>
		  	<form onSubmit={this.handleSubmit} >
		  	  <h2>Player 1: 
		    	  <input className="inputName" value={this.state.white} onChange={(e) => {this.handleChange(e, "white")}} />
	    	  </h2>
	    	  <h2> Player 2:
				  	<input className="inputName" value={this.state.black} onChange={(e) => {this.handleChange(e, "black")}} /> 
			  	</h2>
			  	<h2>
				  	<input className="submit" type="submit" value="Start Game"/> 
				  </h2>
				      <Paper style={style} zDepth={5} rounded={false} />

	   	  </form>
	    
		    {this.state.redirect &&
		    	<Redirect to="/game" />
		    }
	   </div>
	  )
	}
}

export default SingleContainer;