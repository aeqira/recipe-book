/** @format */

import { Navigation } from '@Components/Navigation'
import { NavigationMenu } from '@Constants/Navigation'
import type { LayoutProps } from '@Types/Layout'

import './layout.css'

export const SiteLayout = ({ children }: LayoutProps) => {
	return (
		<>
			<Navigation
				routes={NavigationMenu}
				title='Recipe Book'
			/>
			<main>{children}</main>
		</>
	)
}

export default SiteLayout
