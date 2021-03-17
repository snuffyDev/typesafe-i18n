import { writeFileIfContainsChanges } from '../file-utils'
import { GeneratorConfigWithDefaultValues } from '../generator'

const getReactUtils = ({ utilFileName, typesFileName }: GeneratorConfigWithDefaultValues, importType: string) => {
	return `// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */

import { getReactHelpers } from 'typesafe-i18n/adapters/adapter-react';
${importType} { Locales, Translation, TranslationFunctions, Formatters } from './${typesFileName}'
import { baseLocale, getTranslationForLocale } from './${utilFileName}'
import { initFormatters } from './formatters'

const { component: TypesafeI18n, context: I18nContext } = getReactHelpers<
	Locales,
	Translation,
	TranslationFunctions,
	Formatters
>(baseLocale, getTranslationForLocale, initFormatters)

export { I18nContext }

export default TypesafeI18n
`
}

export const generateReactAdapter = async (
	config: GeneratorConfigWithDefaultValues,
	importType: string,
): Promise<void> => {
	const { outputPath } = config

	const reactUtils = getReactUtils(config, importType)

	const fileName = config.adapterFileName || 'i18n-react.tsx'
	await writeFileIfContainsChanges(outputPath, fileName, reactUtils)
}