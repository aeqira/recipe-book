/** @format */

import { useFormCanvasContext } from '@Contexts/Form'
import type { TextFieldProps } from '@Types/Form'

export const InputField = ({ title, type }: TextFieldProps) => {
	const { title: formTitle } = useFormCanvasContext()
	const inputId = [formTitle, title].filter(Boolean).join('-').replace(/\s+/g, '-').toLowerCase()

	return (
		<>
			<label htmlFor={inputId}>{title}</label>
			<br />
			<input
				type={type}
				id={inputId}
			/>
			<br />
		</>
	)
}

export default InputField
