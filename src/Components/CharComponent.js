import React from 'react'

function CharComponent(props) {

	const localClick = () => {
		props.selectCharacter(props.char.id)
	} 

	return (
		<div>
			<img src={props.char.img} alt={props.char.name} onClick={props.selectCharacter ? localClick : null} />
			<p><strong>Name: </strong>{props.char.name}</p>
			<p><strong>Occupation: </strong>{props.char.occupation}</p>
			<p><strong>Hobbies: </strong>{props.char.hobbies.join(', ')}</p>
		</div>
	)
}

export default CharComponent