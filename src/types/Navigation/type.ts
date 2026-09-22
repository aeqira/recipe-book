/** @format */

export interface NavigationRoute {
	title: string
	href: string
}

export interface NavigationProps {
	title: string
	routes: NavigationRoute[]
}
