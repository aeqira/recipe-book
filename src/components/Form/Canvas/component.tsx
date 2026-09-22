/** @format */

import { FormCanvasContext } from '@Contexts/Form'
import type { FormCanvasProps } from '@Types/Form'

export const FormCanvas = ({ title, children, formData = {} }: FormCanvasProps) => {
	const value = { formData, title }

	return (
		<FormCanvasContext.Provider value={value}>
			<div>
				<h2>{title}</h2>
				<form
					id={['form', title]
						.filter(Boolean)
						.join('-')
						.replace(/\s+/g, '-')
						.toLowerCase()}
				>
					{children}
				</form>
			</div>
		</FormCanvasContext.Provider>
	)
}

export default FormCanvas
