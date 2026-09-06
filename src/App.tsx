/** @format */

import { StrictMode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CatalogView, HomeView, RecipeView, SubmitView } from '@Views'

import './App.css'

export const App = () => {
	return (
		<StrictMode>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={<HomeView />}
					/>
					<Route
						path='/submit'
						element={<SubmitView />}
					/>
					<Route
						path='/recipe'
						element={<CatalogView />}
					/>
					<Route
						path='/recipe/:id'
						element={<RecipeView />}
					/>
				</Routes>
			</BrowserRouter>
		</StrictMode>
	)
}

export default App
