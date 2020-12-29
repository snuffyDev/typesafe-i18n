// internal -----------------------------------------------------------------------------------------------------------

export type Cache<T> = TranslationParts<T> | null

export type TranslationKey<T> = keyof T

export type TranslationObject = {
	[key: string]: string
}

export type Args = {
	[key in string]: unknown
}

export type TranslatorFn<T> = {
	[key in keyof T]: (...args: unknown[]) => string
}

export type TranslationParts<T> = {
	[key in keyof T]: Part[]
}

// config -------------------------------------------------------------------------------------------------------------

export type Config<T extends Formatters = Formatters> = {
	useCache?: boolean
	formatters?: T
}

// formatters ---------------------------------------------------------------------------------------------------------

export type FormatterFn<T> = (value: T) => string

export type Formatters = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[formatter: string]: FormatterFn<any>
}

// parts --------------------------------------------------------------------------------------------------------------

export type TextPart = string

export type InjectorPart = {
	k: string // key
	f?: string[] // formatterFunctionKey
}

export type SingularPluralPart = {
	k: string // key
	s: string // singular
	p: string // plural
}

export type Part = TextPart | InjectorPart | SingularPluralPart