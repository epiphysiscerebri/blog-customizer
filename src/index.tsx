import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';

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
	defaultArticleState,
} from 'src/constants/articleProps';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

// Объект параметров для статьи
let paramsForArticle = structuredClone(defaultArticleState);

const App = () => {
	// Состояние тригера кнопок
	const [btnClickState, setBtnClickState] = useState(false);

	// Состояние стрелки
	const [arrowState, setArrowState] = useState(false);

	// Функиця изменения состояния стрелки
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

	// Применение настроек к статье
	useEffect(() => {
		setFamilyOptionState(paramsForArticle.fontFamilyOption);
		setFontSizeOptionState(paramsForArticle.fontSizeOption);
		setFontColorState(paramsForArticle.fontColor);
		setBackgroundColorState(paramsForArticle.backgroundColor);
		setContentWidthArrState(paramsForArticle.contentWidth);
	}, [btnClickState]);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': paramsForArticle.fontFamilyOption.value,
					'--font-size': paramsForArticle.fontSizeOption.value,
					'--font-color': paramsForArticle.fontColor.value,
					'--container-width': paramsForArticle.contentWidth.value,
					'--bg-color': paramsForArticle.backgroundColor.value,
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
								<Button
									title='Сбросить'
									htmlType='reset'
									type='clear'
									onClick={() => {
										paramsForArticle = structuredClone(defaultArticleState);
										setBtnClickState(!btnClickState);
									}}
								/>
								<Button
									title='Применить'
									htmlType='submit'
									type='apply'
									onClick={(e) => {
										e.preventDefault();
										paramsForArticle.fontFamilyOption = fontFamilyOptionState;
										paramsForArticle.fontSizeOption = fontSizeOptionState;
										paramsForArticle.fontColor = fontColorState;
										paramsForArticle.backgroundColor = backgroundColorState;
										paramsForArticle.contentWidth = contentWidthArrState;
										setBtnClickState(!btnClickState);
									}}
								/>
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
