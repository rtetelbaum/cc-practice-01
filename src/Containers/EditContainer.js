import React from 'react'
import CharComponent from '../Components/CharComponent'
import EditCharForm from '../Components/EditCharForm'

function EditContainer(props) {
	
	const localDeleteClick = () => {
		props.deleteCharacter(props.char.id)
	}
	
	return (
		<div>
			<h3>Edit this Character</h3>
			<CharComponent char={props.char} />
			<button onClick={localDeleteClick}>Delete Character</button>
			<EditCharForm char={props.char} updateHobbies={props.updateHobbies} />
		</div>
	)
}

export default EditContainer