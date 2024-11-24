import { CSSProperties, useState, useRef } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';

import './styles/index.scss';
import styles from './styles/index.module.scss';

import { useOutsideClickClose } from './ui/select/hooks/useOutsideClickClose';

import { defaultArticleState } from 'src/constants/articleProps';

export const App = () => {
	// Ссылка на обёртку формы
	const rootFormRef = useRef(null);

	// Состояние параметров статьи
	const [paramsForArticleState, setParamsForArticle] =
		useState(defaultArticleState);

	// Состояние стрелки
	const [arrowState, setArrowState] = useState(false);

	// Закрытие вне стрелки
	useOutsideClickClose({
		isOpen: arrowState,
		rootRef: rootFormRef,
		onClose: () => {
			setArrowState(false);
		},
		onChange: () => {
			arrowState;
		},
	});

	// Функиця изменения состояния стрелки
	const handleArrowState = () => setArrowState(!arrowState);

	// Функция применения параметров к статье
	const handleParamsForArticle = (params: any) => {
		setParamsForArticle(params);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': paramsForArticleState.fontFamilyOption.value,
					'--font-size': paramsForArticleState.fontSizeOption.value,
					'--font-color': paramsForArticleState.fontColor.value,
					'--container-width': paramsForArticleState.contentWidth.value,
					'--bg-color': paramsForArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<div ref={rootFormRef}>
				<ArticleParamsForm
					isOpen={arrowState}
					onClick={handleArrowState}
					onSubmit={handleParamsForArticle}
				/>
			</div>
			<div>
				<Article />
			</div>
		</main>
	);
};
