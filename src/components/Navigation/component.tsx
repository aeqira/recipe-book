/** @format */

import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import type { NavigationProps } from '@Types/Navigation'

import './component.css'

export const Navigation = ({ routes, title }: NavigationProps) => {
	const { pathname } = useLocation()
	const [menuOpen, setMenuOpen] = useState(false)

	return (
		<nav>
			<h1>
				<Link to={routes[0].href.toString()}>{title}</Link>
			</h1>

			<button
				type='button'
				className='menu-button'
				aria-expanded={menuOpen}
				aria-controls='main-navigation'
				aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
				onClick={() => setMenuOpen((isOpen) => !isOpen)}
			>
				<span aria-hidden='true'>{menuOpen ? '✕' : '☰'}</span>
			</button>

			<ul
				id='main-navigation'
				className={menuOpen ? 'open' : ''}
			>
				{routes.map((route) => {
					const routePath = route.href.toString()

					const isActive =
						routePath === '/' ?
							pathname === '/'
						:	pathname === routePath || pathname.startsWith(`${routePath}/`)

					return (
						<li
							key={routePath}
							className={isActive ? 'active' : ''}
						>
							<Link
								to={routePath}
								onClick={() => setMenuOpen(false)}
							>
								{route.title}
							</Link>
						</li>
					)
				})}
			</ul>
		</nav>
	)
}

export default Navigation
