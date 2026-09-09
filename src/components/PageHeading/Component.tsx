/** @format */

import { Link } from 'react-router-dom'
import type { PageHeadingProps } from '@Types/PageHeading'

import './Component.css'

export const PageHeading = ({
	eyebrow,
	title,
	linkText,
	href,
	style,
	subtitle,
}: PageHeadingProps) => {
	const styles = Array.isArray(style) ? style.filter(Boolean).join(' ') : style
	const className = ['page-heading', styles].filter(Boolean).join(' ')

	return (
		<section className={className}>
			<div>
				{eyebrow && <p className='eyebrow'>{eyebrow}</p>}
				<h1>{title}</h1>
				{subtitle && <p>{subtitle}</p>}
			</div>
			{linkText && href && (
				<Link
					className='primary-link'
					to={href}
				>
					{linkText}
				</Link>
			)}
		</section>
	)
}

export default PageHeading
