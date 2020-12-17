import React from 'react'

class EditCharForm extends React.Component {

	state = {hobbies: this.props.char.hobbies}

	localUpdateHobbies = (e) => {
		this.setState({hobbies: e.target.value})
	}

	localSubmit = (e) => {
		e.preventDefault()
		this.props.updateHobbies(this.props.char.id, this.state.hobbies)
	}

	render() {
		return (
			<form onSubmit={this.localSubmit}>
				<label htmlFor="Hobbies"><strong>Hobbies: </strong></label>
				<input type="text" name="hobbies" value={this.state.hobbies} onChange={this.localUpdateHobbies} /><br />
				<button>Update Hobbies</button>
			</form>
		)
	}
}

export default EditCharForm