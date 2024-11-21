import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import cn from 'classnames';

import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import stylesParamForm from 'src/components/article-params-form/ArticleParamsForm.module.scss';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [arrowState, setArrowState] = useState(false);

	const handleArrowState = () => setArrowState(!arrowState);

	// Состояние дропдауна "шрифт"
	const [fontFamilyOptionState, setFamilyOptionState] = useState(
		fontFamilyOptions[0]
	);
	// Состояние радиогруппы "размер шрифта"
	const [fontSizeOptionState, setFontSizeOptionState] = useState(
		fontSizeOptions[0]
	);
	// Состояние дропдауна "размер шрифта"
	const [fontColorState, setFontColorState] = useState(fontColors[0]);
	// Состояние дропдауна "цвет шрифта"
	const [backgroundColorState, setBackgroundColorState] = useState(
		backgroundColors[0]
	);
	// Состояние дропдауна "ширина контента"
	const [contentWidthArrState, setContentWidthArrState] = useState(
		contentWidthArr[0]
	);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': defaultArticleState.fontFamilyOption.value,
					'--font-size': defaultArticleState.fontSizeOption.value,
					'--font-color': defaultArticleState.fontColor.value,
					'--container-width': defaultArticleState.contentWidth.value,
					'--bg-color': defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm>
				<>
					<ArrowButton isOpen={arrowState} onClick={handleArrowState} />
					<aside
						className={cn(
							stylesParamForm.container,
							arrowState ? stylesParamForm.container_open : null
						)}>
						<form className={stylesParamForm.form}>
							{/* Заголовок формы */}
							<Text as='h1' size={31} weight={800} uppercase={true}>
								задайте параметры
							</Text>
							{/* Дропдаун "шрифт" */}
							<Select
								title={'шрифт'}
								selected={fontFamilyOptionState}
								options={fontFamilyOptions}
								onChange={(selected) => {
									setFamilyOptionState(selected);
								}}
							/>
							{/* Радиогруппа "размер шрифта" */}
							<RadioGroup
								title={'размер шрифта'}
								selected={fontSizeOptionState}
								options={fontSizeOptions}
								name={'radio'}
								onChange={(value) => {
									setFontSizeOptionState(value);
								}}
							/>
							{/* Дропдаун "цвет шрифта" */}
							<Select
								title={'цвет шрифта'}
								selected={fontColorState}
								options={fontColors}
								onChange={(selected) => {
									setFontColorState(selected);
								}}
							/>
							{/* Сепаратор */}
							<Separator />
							{/* Дропдаун "цвет фона" */}
							<Select
								title={'цвет фона'}
								selected={backgroundColorState}
								options={backgroundColors}
								onChange={(selected) => {
									setBackgroundColorState(selected);
								}}
							/>
							{/* Дропдаун "ширина контента" */}
							<Select
								title={'ширина контента'}
								selected={contentWidthArrState}
								options={contentWidthArr}
								onChange={(selected) => {
									setContentWidthArrState(selected);
								}}
							/>
							<div className={stylesParamForm.bottomContainer}>
								<Button title='Сбросить' htmlType='reset' type='clear' />
								<Button title='Применить' htmlType='submit' type='apply' />
							</div>
						</form>
					</aside>
				</>
			</ArticleParamsForm>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
