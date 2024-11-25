import { CSSProperties, useState } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';

import './styles/index.scss';
import styles from './styles/index.module.scss';

import { defaultArticleState } from 'src/constants/articleProps';

export const App = () => {
	// Состояние параметров статьи
	const [paramsForArticleState, setParamsForArticle] =
		useState(defaultArticleState);

	// Функция применения параметров к статье
	const handleParamsForArticle = (params: any) => {
		setParamsForArticle(params);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': paramsForArticleState.fontFamilyOption.value,
					'--font-size': paramsForArticleState.fontSizeOption.value,
					'--font-color': paramsForArticleState.fontColor.value,
					'--container-width': paramsForArticleState.contentWidth.value,
					'--bg-color': paramsForArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onSubmit={handleParamsForArticle} />
			<div>
				<Article />
			</div>
		</main>
	);
};
