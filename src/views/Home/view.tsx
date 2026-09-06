/** @format */

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDailyFeaturedRecipe } from '../../api'
import { SiteLayout } from '../../layouts/Site'
import type { Recipe } from '@Types/Recipe'

import './view.css'

export const HomeView = () => {
	const [featuredRecipe, setFeaturedRecipe] = useState<Recipe | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		void getDailyFeaturedRecipe()
			.then(setFeaturedRecipe)
			.catch((cause: unknown) => setError(cause instanceof Error ? cause.message : 'Today’s recipe could not be loaded.'))
			.finally(() => setLoading(false))
	}, [])

	return (
		<SiteLayout>
			<section className='page-heading home-heading'>
				<p className='eyebrow'>Cook. Save. Share.</p>
				<h1>Your recipes, all in one place.</h1>
				<p>Keep the meals you love organized and ready for the next time inspiration strikes.</p>
				<Link className='primary-link' to='/recipe'>Browse recipes</Link>
			</section>

			<section className='daily-feature' aria-labelledby='daily-feature-title'>
				<div className='daily-feature-heading'>
					<div><p className='eyebrow'>Suggested for you</p><h2 id='daily-feature-title'>Recipe of the day</h2></div>
					<span>{new Intl.DateTimeFormat(undefined, { month: 'long', day: 'numeric' }).format(new Date())}</span>
				</div>
				{loading && <p>Choosing today’s recipe…</p>}
				{error && <p className='status-error' role='alert'>{error}</p>}
				{!loading && !error && !featuredRecipe && (
					<div className='daily-feature-empty'><p>Add a recipe to your archive and it could be featured here tomorrow.</p><Link to='/submit'>Add your first recipe</Link></div>
				)}
				{featuredRecipe && (
					<Link className='featured-recipe-card' to={`/recipe/${featuredRecipe.id}`}>
						<div><span className='recipe-type'>{featuredRecipe.type}</span><h3>{featuredRecipe.title}</h3>{featuredRecipe.subtitle && <p>{featuredRecipe.subtitle}</p>}</div>
					<div className='featured-recipe-meta'><span>{featuredRecipe.time} min</span><span>{featuredRecipe.difficulty}</span><span>{featuredRecipe.spiciness} spice</span><strong>View recipe →</strong></div>
					</Link>
				)}
			</section>
		</SiteLayout>
	)
}

export default HomeView
