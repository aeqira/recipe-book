/** @format */

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getRecipe } from '../../api'
import { SiteLayout } from '../../layouts/Site'
import type { Recipe } from '@Types/Recipe'

import './view.css'

export const RecipeView = () => {
	const { id } = useParams()
	const [recipe, setRecipe] = useState<Recipe | null>(null)
	const [error, setError] = useState('')

	useEffect(() => {
		if (!id) return
		void getRecipe(id).then(setRecipe).catch((cause: unknown) => setError(cause instanceof Error ? cause.message : 'Recipe could not be loaded.'))
	}, [id])

	return (
		<SiteLayout>
			<Link className='back-link' to='/recipe'>← All recipes</Link>
			{!recipe && !error && <p>Loading recipe…</p>}
			{error && <div className='empty-state'><h1>Recipe unavailable</h1><p>{error}</p></div>}
			{recipe && (
				<article className='recipe-detail'>
					<header><p className='eyebrow'>{recipe.type}</p><h1>{recipe.title}</h1>{recipe.subtitle && <p className='subtitle'>{recipe.subtitle}</p>}</header>
					<div className='detail-meta'><div><strong>{recipe.time}</strong><span>minutes</span></div><div><strong>{recipe.difficulty}</strong><span>difficulty</span></div><div><strong>{recipe.spiciness}</strong><span>spice level</span></div>{recipe.temperature !== null && <div><strong>{recipe.temperature}°F</strong><span>temperature</span></div>}</div>
					<div className='detail-columns'>
						<section><h2>Ingredients</h2><p className='preserve-lines'>{recipe.ingredients}</p><h2>Tools</h2><p className='preserve-lines'>{recipe.tools}</p></section>
						<section><h2>Directions</h2><p className='preserve-lines directions'>{recipe.directions}</p></section>
					</div>
				</article>
			)}
		</SiteLayout>
	)
}
