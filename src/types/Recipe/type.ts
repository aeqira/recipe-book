/** @format */

export interface RecipeSummary {
	id: number
	title: string
	subtitle: string | null
	type: string
	difficulty: string
	spiciness: string
	time: number
}

export interface Recipe extends RecipeSummary {
	tools: string
	ingredients: string
	temperature: number | null
	directions: string
}

export interface RecipeInput {
	title: string
	subtitle: string
	typeId: number
	difficultyId: number
	spicinessId: number
	time: number
	tools: string
	ingredients: string
	temperature: number | null
	directions: string
}
