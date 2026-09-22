/** @format */

import type { Recipe, RecipeInput, RecipeSummary } from '@Types/Recipe'

const readJson = async <T>(response: Response): Promise<T> => {
	if (!response.ok) {
		const body = (await response.json().catch(() => null)) as { error?: string } | null
		throw new Error(body?.error ?? 'Something went wrong. Please try again.')
	}

	return response.json() as Promise<T>
}

export const getRecipes = async () => readJson<RecipeSummary[]>(await fetch('/api/recipes'))

export const getRecipe = async (id: string) => readJson<Recipe>(await fetch(`/api/recipes/${id}`))

export const getDailyFeaturedRecipe = async () => {
	const today = new Date()
	const localDate = [
		today.getFullYear(),
		String(today.getMonth() + 1).padStart(2, '0'),
		String(today.getDate()).padStart(2, '0'),
	].join('-')
	return readJson<Recipe | null>(await fetch(`/api/recipes/featured?date=${localDate}`))
}

export const createRecipe = async (recipe: RecipeInput) =>
	readJson<Recipe>(
		await fetch('/api/recipes', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(recipe),
		})
	)
