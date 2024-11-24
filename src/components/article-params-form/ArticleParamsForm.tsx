import { useState } from 'react';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import cn from 'classnames';

import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import styles from 'src/components/article-params-form/ArticleParamsForm.module.scss';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

type TArticleParamsForm = {
	isOpen: boolean;
	onClick: () => void;
	onSubmit: (params?: any) => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onClick,
	onSubmit,
}: TArticleParamsForm) => {
	//Состояние формы
	const [formState, setFormState] = useState(defaultArticleState);

	// Универсальная функция изменения полей формы
	const handleSetFormState = <
		K extends keyof ArticleStateType,
		V = ArticleStateType[K]
	>(
		inputName: K,
		value: V
	) => {
		setFormState((prev) => {
			return {
				...prev,
				[inputName]: value,
			};
		});
	};

	// Применение настроек к статье
	const handleSubmit = () => {
		onSubmit(formState);
	};

	// Сброс настроек
	const handleCleare = () => {
		onSubmit(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onClick} />
			<aside
				className={cn(styles.container, isOpen ? styles.container_open : null)}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit();
					}}>
					{/* Заголовок формы */}
					<Text as='h2' size={31} weight={800} uppercase={true}>
						задайте параметры
					</Text>
					{/* Дропдаун "шрифт" */}
					<Select
						title={'шрифт'}
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selected) => {
							handleSetFormState('fontFamilyOption', selected);
						}}
					/>
					{/* Радиогруппа "размер шрифта" */}
					<RadioGroup
						title={'размер шрифта'}
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						name={'radio'}
						onChange={(value) => {
							handleSetFormState('fontSizeOption', value);
						}}
					/>
					{/* Дропдаун "цвет шрифта" */}
					<Select
						title={'цвет шрифта'}
						selected={formState.fontColor}
						options={fontColors}
						onChange={(selected) => {
							handleSetFormState('fontColor', selected);
						}}
					/>
					{/* Сепаратор */}
					<Separator />
					{/* Дропдаун "цвет фона" */}
					<Select
						title={'цвет фона'}
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(selected) => {
							handleSetFormState('backgroundColor', selected);
						}}
					/>
					{/* Дропдаун "ширина контента" */}
					<Select
						title={'ширина контента'}
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(selected) => {
							handleSetFormState('contentWidth', selected);
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								setFormState(defaultArticleState);
								handleCleare();
							}}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
