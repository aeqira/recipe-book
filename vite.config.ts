/** @format */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from '@cloudflare/vite-plugin'
import path from 'path'

function ResolvedPath(dir: string) {
	return path.resolve(import.meta.dirname, `./src/${dir}`)
}

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), cloudflare()],
	resolve: {
		alias: {
			'@Api': ResolvedPath('api'),
			'@Components': ResolvedPath('components'),
			'@Constants': ResolvedPath('constants'),
			'@Contexts': ResolvedPath('contexts'),
			'@Layouts': ResolvedPath('layouts'),
			'@Types': ResolvedPath('types'),
			'@Views': ResolvedPath('views'),
		},
	},
})
