/** @format */

import { useId, useState } from 'react'
import type { ListFieldProps } from '@Types/Form/ListField'
import type { KeyboardEvent } from 'react'

import './component.css'

export const ListField = ({ label, name, placeholder, ordered = false }: ListFieldProps) => {
	const inputId = useId()
	const [draft, setDraft] = useState('')
	const [items, setItems] = useState<string[]>([])

	const addItem = () => {
		const item = draft.trim()
		if (!item) return
		setItems((currentItems) => [...currentItems, item])
		setDraft('')
	}

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== 'Enter') return
		event.preventDefault()
		addItem()
	}

	const listItems = items.map((item, index) => (
		<li key={`${item}-${index}`}>
			<span>{item}</span>
			<button
				type='button'
				className='remove-list-item'
				aria-label={`Remove ${item}`}
				onClick={() =>
					setItems((currentItems) =>
						currentItems.filter((_, itemIndex) => itemIndex !== index)
					)
				}
			>
				×
			</button>
			<input
				type='hidden'
				name={name}
				value={item}
			/>
		</li>
	))

	return (
		<fieldset className='list-field wide'>
			<legend>{label}</legend>
			<div className='list-field-entry'>
				<input
					id={inputId}
					value={draft}
					placeholder={placeholder}
					onChange={(event) => setDraft(event.target.value)}
					onKeyDown={handleKeyDown}
				/>
				<button
					type='button'
					className='add-list-item'
					aria-label={`Add ${label.toLowerCase()} item`}
					onClick={addItem}
				>
					+
				</button>
			</div>
			{items.length === 0 ?
				<p className='list-field-hint'>Add at least one item</p>
			: ordered ?
				<ol>{listItems}</ol>
			:	<ul>{listItems}</ul>}
		</fieldset>
	)
}

export default ListField
