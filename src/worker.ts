/** @format */

interface StaticAssetsBinding {
	fetch: (Request: Request) => Promise<Response>
}

interface D1Result {
	meta: { last_row_id?: number }
}

interface D1PreparedStatement {
	bind: (...values: Array<string | number | null>) => D1PreparedStatement
	all: <T>() => Promise<{ results: T[] }>
	first: <T>() => Promise<T | null>
	run: () => Promise<D1Result>
}

interface D1DatabaseBinding {
	prepare: (query: string) => D1PreparedStatement
}

interface Env {
	ASSETS?: StaticAssetsBinding
	__STATIC_CONTENT__?: StaticAssetsBinding
	DB: D1DatabaseBinding
}

interface RecipeInput {
	title?: unknown
	subtitle?: unknown
	typeId?: unknown
	difficultyId?: unknown
	spicinessId?: unknown
	time?: unknown
	tools?: unknown
	ingredients?: unknown
	temperature?: unknown
	directions?: unknown
}

const recipeSelect = `
	SELECT
		r."Id" AS id,
		r."Title" AS title,
		r."Subtitle" AS subtitle,
		t."Title" AS type,
		d."Title" AS difficulty,
		s."Title" AS spiciness,
		r."Time" AS time,
		r."Tools" AS tools,
		r."Ingredients" AS ingredients,
		r."Temperature" AS temperature,
		r."Directions" AS directions
	FROM "Recipes" r
	JOIN "Types" t ON t."Id" = r."TypeId"
	JOIN "Difficulties" d ON d."Id" = r."DifficultyId"
	JOIN "Spiciness" s ON s."Id" = r."SpicinessId"`

const jsonError = (error: string, status: number) => Response.json({ error }, { status })

const readRecipe = (id: number, db: D1DatabaseBinding) =>
	db.prepare(`${recipeSelect} WHERE r."Id" = ?`).bind(id).first<Record<string, unknown>>()

const hashDate = (date: string) => {
	let hash = 0
	for (const character of date) hash = (hash * 31 + character.charCodeAt(0)) >>> 0
	return hash
}

const handleApiRequest = async (request: Request, env: Env, url: URL): Promise<Response> => {
	if (request.method === 'GET' && url.pathname === '/api/recipes/featured') {
		const requestedDate = url.searchParams.get('date') ?? new Date().toISOString().slice(0, 10)
		const date =
			/^\d{4}-\d{2}-\d{2}$/.test(requestedDate) ? requestedDate : (
				new Date().toISOString().slice(0, 10)
			)
		const { results } = await env.DB.prepare(
			'SELECT "Id" AS id FROM "Recipes" ORDER BY "Id" ASC'
		).all<{ id: number }>()
		if (results.length === 0) return Response.json(null)

		const featuredId = results[hashDate(date) % results.length].id
		return Response.json(await readRecipe(featuredId, env.DB))
	}

	if (request.method === 'GET' && url.pathname === '/api/recipes') {
		const result = await env.DB.prepare(
			`${recipeSelect} ORDER BY r."Title" COLLATE NOCASE ASC`
		).all<Record<string, unknown>>()
		return Response.json(result.results)
	}

	const detailMatch = url.pathname.match(/^\/api\/recipes\/(\d+)$/)
	if (request.method === 'GET' && detailMatch) {
		const recipe = await readRecipe(Number(detailMatch[1]), env.DB)
		return recipe ? Response.json(recipe) : jsonError('Recipe not found.', 404)
	}

	if (request.method === 'POST' && url.pathname === '/api/recipes') {
		let input: RecipeInput
		try {
			input = (await request.json()) as RecipeInput
		} catch {
			return jsonError('The request must contain valid JSON.', 400)
		}

		const title = typeof input.title === 'string' ? input.title.trim() : ''
		const subtitle = typeof input.subtitle === 'string' ? input.subtitle.trim() : ''
		const tools = typeof input.tools === 'string' ? input.tools.trim() : ''
		const ingredients = typeof input.ingredients === 'string' ? input.ingredients.trim() : ''
		const directions = typeof input.directions === 'string' ? input.directions.trim() : ''
		const typeId = Number(input.typeId)
		const difficultyId = Number(input.difficultyId)
		const spicinessId = Number(input.spicinessId)
		const time = Number(input.time)
		const temperature =
			input.temperature === null || input.temperature === '' ?
				null
			:	Number(input.temperature)

		if (!title || !tools || !ingredients || !directions) {
			return jsonError('Title, tools, ingredients, and directions are required.', 400)
		}
		if (![typeId, difficultyId, spicinessId, time].every(Number.isInteger) || time <= 0) {
			return jsonError('Recipe selections and total time must be valid.', 400)
		}
		if (temperature !== null && (!Number.isInteger(temperature) || temperature < 0)) {
			return jsonError('Temperature must be a positive whole number.', 400)
		}

		try {
			const result = await env.DB.prepare(
				`INSERT INTO "Recipes"
				("Title", "Subtitle", "TypeId", "DifficultyId", "SpicinessId", "Time", "Tools", "Ingredients", "Temperature", "Directions")
				VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
			)
				.bind(
					title,
					subtitle || null,
					typeId,
					difficultyId,
					spicinessId,
					time,
					tools,
					ingredients,
					temperature,
					directions
				)
				.run()
			const recipe = await readRecipe(Number(result.meta.last_row_id), env.DB)
			return Response.json(recipe, { status: 201 })
		} catch (error) {
			console.error('Unable to save recipe', error)
			return jsonError(
				'The recipe could not be saved. Check your selections and try again.',
				400
			)
		}
	}

	return jsonError('API route not found.', 404)
}

export default {
	async fetch(request: Request, env: Env, _ctx: unknown): Promise<Response> {
		const url = new URL(request.url)
		if (url.pathname.startsWith('/api/')) {
			try {
				return await handleApiRequest(request, env, url)
			} catch (error) {
				console.error('Recipe API failed', error)
				return jsonError('The recipe service is temporarily unavailable.', 500)
			}
		}

		const assets = env.ASSETS ?? env.__STATIC_CONTENT__
		if (!assets) {
			return new Response('Static assets binding not found in env', { status: 500 })
		}

		// Only rewrite browser navigations (HTML requests)
		const accept = request.headers.get('accept') ?? ''
		const isHTML = accept.includes('text/html') || accept.includes('application/xhtml+xml')

		if (request.method === 'GET' && isHTML) {
			// Don’t rewrite requests for real files (favicon, JS bundles, etc.)
			if (url.pathname.includes('.')) {
				return assets.fetch(request)
			}

			// SPA fallback for /submit and /recipe/:id
			url.pathname = '/index.html'
			return assets.fetch(new Request(url.toString(), request))
		}
		return assets.fetch(request)
	},
}
