/** @format */

import { createContext, useContext } from 'react'
import type { FormCanvasContextValue } from '@Types/Form'

export const FormCanvasContext = createContext<FormCanvasContextValue | null>(null)

export const useFormCanvasContext = () => {
	const ctx = useContext(FormCanvasContext)
	if (!ctx) throw new Error('useFormCanvasContext must be used inside FormCanvasContext.Provider')
	return ctx
}
