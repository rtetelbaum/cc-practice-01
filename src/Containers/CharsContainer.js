import React from 'react'
import CharComponent from '../Components/CharComponent'
import EditContainer from '../Containers/EditContainer'

class CharsContainer extends React.Component {

	state = {
		characters: [],
		selectedCharacter: null,
		name: "",
		occupation: "",
		img: "",
		hobby: ""
	}

	componentDidMount() {
		fetch('http://localhost:4000/characters')
			.then(response => response.json())
			.then(data => this.setState({characters: data}))
	}

	renderCharComp = () => {
		return this.state.characters.map(char => <CharComponent selectCharacter={this.selectCharacter} char={char} key={char.id} />)
	}

	changeHandler = (event) => {
		this.setState({[event.target.name]: event.target.value})
	}

	formSubmit = (e) => {
		e.preventDefault()
		const newData = {
			"name": this.state.name,
			"occupation": this.state.occupation,
			"img": this.state.img,
			"hobbies": [this.state.hobby]
		}
		fetch('http://localhost:4000/characters', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newData),
		})
			.then(response => response.json())
			.then(data => {
				this.setState(prevState => ({characters: [...prevState.characters, data]}))
				this.setState({name: "", occupation: "", img: "", hobby: ""})
			})
	}

	selectCharacter = (id) => {
		const clickedCharacter = this.state.characters.find(char => char.id === id)
		this.setState({selectedCharacter: clickedCharacter})
	}

	deleteCharacter = (id) => {
		fetch(`http://localhost:4000/characters/${id}`, {
			method: 'DELETE'
		})
			.then(response => response.json())
			.then(data => {
				this.setState(prevState => ({characters: [...prevState.characters.filter(char => char.id !== id)]}))
				this.setState({selectedCharacter: null})
			})
	}

	updateHobbies = (id, hobbies) => {
		let hobbiesArray = hobbies.split(',')
		let data = {hobbies: hobbiesArray}
		console.log(data)
		fetch(`http://localhost:4000/characters/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(data => {
				console.log('Success:', data);
			})
	}

	render() {
		return (
			<div className="char-container">
				<h3>Characters List</h3>
				<form onSubmit={this.formSubmit}>
					<label htmlFor="Name"><strong>Name: </strong></label>
					<input type="text" name="name" placeholder="Enter character name" value={this.state.name} onChange={this.changeHandler} /><br />

					<label htmlFor="Occupation"><strong>Occupation: </strong></label>
					<input type="text" name="occupation" placeholder="Enter character occupation" value={this.state.occupation} onChange={this.changeHandler} /><br />

					<label htmlFor="Image Link"><strong>Image Link: </strong></label>
					<input type="url" name="img" placeholder="Enter image URL" value={this.state.img} onChange={this.changeHandler} /><br />

					<label htmlFor="Hobby"><strong>Hobby: </strong></label>
					<input type="text" name="hobby" placeholder="Enter character hobby" value={this.state.hobby} onChange={this.changeHandler} /><br />

					<button>Create Character</button>
				</form><br />
				{this.renderCharComp()}
				{this.state.selectedCharacter ? <EditContainer char={this.state.selectedCharacter} updateHobbies={this.updateHobbies} deleteCharacter={this.deleteCharacter} />: null}
			</div>
		)
	}
}

export default CharsContainer