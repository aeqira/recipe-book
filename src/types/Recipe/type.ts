/** @format */

import type { NullNumber, NullString } from '@Types/Base'

interface RecipeBase {
	title: string
	subtitle: NullString
	time: number
}

export interface RecipeSummary extends RecipeBase {
	id: number
	type: string
	difficulty: string
	spiciness: string
}

export interface Recipe extends RecipeSummary {
	tools: string
	ingredients: string
	temperature: NullNumber
	directions: string
}

export interface RecipeInput extends RecipeBase {
	typeId: number
	difficultyId: number
	spicinessId: number
	tools: string
	ingredients: string
	temperature: NullNumber
	directions: string
}
