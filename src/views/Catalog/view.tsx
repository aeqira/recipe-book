/** @format */

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRecipes } from '@Api'
import { SiteLayout } from '@Layouts/Site'
import type { RecipeSummary } from '@Types/Recipe'

import './view.css'
import { PageHeading } from '@Components/PageHeading'

export const CatalogView = () => {
	const [recipes, setRecipes] = useState<RecipeSummary[]>([])
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		void getRecipes()
			.then(setRecipes)
			.catch((cause: unknown) =>
				setError(cause instanceof Error ? cause.message : 'Recipes could not be loaded.')
			)
			.finally(() => setLoading(false))
	}, [])

	return (
		<SiteLayout>
			<PageHeading
				eyebrow='Your collection'
				title='Recipe Book'
				linkText='Add a recipe'
				href='/submit'
				style='catalog-heading'
			/>
			{loading && <p>Loading recipes…</p>}
			{error && (
				<p
					className='status-error'
					role='alert'
				>
					{error}
				</p>
			)}
			{!loading && !error && recipes.length === 0 && (
				<div className='empty-state'>
					<h2>No recipes yet</h2>
					<p>Add your first recipe to start your collection.</p>
					<Link to='/submit'>Create a recipe</Link>
				</div>
			)}
			<div className='recipe-grid'>
				{recipes.map((recipe) => (
					<Link
						className='recipe-card'
						to={`/recipe/${recipe.id}`}
						key={recipe.id}
					>
						<span className='recipe-type'>{recipe.type}</span>
						<h2>{recipe.title}</h2>
						{recipe.subtitle && <p>{recipe.subtitle}</p>}
						<div className='recipe-meta'>
							<span>{recipe.time} min</span>
							<span>{recipe.difficulty}</span>
							<span>{recipe.spiciness}</span>
						</div>
					</Link>
				))}
			</div>
		</SiteLayout>
	)
}

export default CatalogView
