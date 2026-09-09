/** @format */

import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createRecipe } from '@Api'
import { ListField } from '@Components/Form'
import { SiteLayout } from '@Layouts/Site'

import './view.css'
import { PageHeading } from '@Components/PageHeading'

export const SubmitView = () => {
	const navigate = useNavigate()
	const [error, setError] = useState('')
	const [saving, setSaving] = useState(false)

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setError('')
		setSaving(true)

		const data = new FormData(event.currentTarget)
		const temperature = data.get('temperature')?.toString().trim() ?? ''

		try {
			const recipe = await createRecipe({
				title: data.get('title')?.toString() ?? '',
				subtitle: data.get('subtitle')?.toString() ?? '',
				typeId: Number(data.get('typeId')),
				difficultyId: Number(data.get('difficultyId')),
				spicinessId: Number(data.get('spicinessId')),
				time: Number(data.get('time')),
				tools: data.getAll('tools').join('\n'),
				ingredients: data.getAll('ingredients').join('\n'),
				temperature: temperature ? Number(temperature) : null,
				directions: data.getAll('directions').join('\n'),
			})
			navigate(`/recipe/${recipe.id}`)
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : 'The recipe could not be saved.')
			setSaving(false)
		}
	}

	return (
		<SiteLayout>
			<PageHeading
				eyebrow='Add to your collection'
				title='Submit a Recipe'
				subtitle='Capture the details now so your favorite dish is always easy to find.'
			/>

			<form
				className='recipe-form'
				onSubmit={handleSubmit}
			>
				<div className='form-grid'>
					<label className='wide'>
						Title
						<input
							name='title'
							required
						/>
					</label>
					<label className='wide'>
						Subtitle
						<input name='subtitle' />
					</label>
					<label>
						Type
						<select
							name='typeId'
							defaultValue='3'
						>
							<option value='1'>Breakfast</option>
							<option value='2'>Lunch</option>
							<option value='3'>Dinner</option>
							<option value='4'>Dessert</option>
							<option value='5'>Snack</option>
						</select>
					</label>
					<label>
						Difficulty
						<select
							name='difficultyId'
							defaultValue='1'
						>
							<option value='1'>Easy</option>
							<option value='2'>Medium</option>
							<option value='3'>Hard</option>
						</select>
					</label>
					<label>
						Spice level
						<select
							name='spicinessId'
							defaultValue='0'
						>
							<option value='0'>None</option>
							<option value='1'>Mild</option>
							<option value='2'>Medium</option>
							<option value='3'>Hot</option>
						</select>
					</label>
					<label>
						Total time (minutes)
						<input
							name='time'
							type='number'
							min='1'
							required
						/>
					</label>
					<label>
						Temperature (°F)
						<input
							name='temperature'
							type='number'
							min='0'
						/>
					</label>
					<ListField
						label='Tools'
						name='tools'
						placeholder='Example: Large skillet'
					/>
					<ListField
						label='Ingredients'
						name='ingredients'
						placeholder='Example: 2 cups flour'
					/>
					<ListField
						label='Directions'
						name='directions'
						placeholder='Describe the next step'
						ordered
					/>
				</div>
				{error && (
					<p
						className='form-error'
						role='alert'
					>
						{error}
					</p>
				)}
				<button
					className='primary-button'
					type='submit'
					disabled={saving}
				>
					{saving ? 'Saving…' : 'Save recipe'}
				</button>
			</form>
		</SiteLayout>
	)
}
