/** @format */

import type { ReactNode } from 'react'

type FieldContent =
	| 'button'
	| 'checkbox'
	| 'color'
	| 'date'
	| 'datetime-local'
	| 'email'
	| 'file'
	| 'hidden'
	| 'image'
	| 'month'
	| 'number'
	| 'password'
	| 'radio'
	| 'range'
	| 'reset'
	| 'search'
	| 'tel'
	| 'text'
	| 'time'
	| 'url'
	| 'week'

type FormData = Record<string, string | number | boolean | null | unknown>

interface FormSharedProps {
	title: string
}

export interface FormCanvasProps extends FormSharedProps {
	children: ReactNode
	formData?: FormData
}

export interface FormCanvasContextValue extends FormSharedProps {
	formData: FormData
}

export interface TextFieldProps extends FormSharedProps {
	type: FieldContent
}
