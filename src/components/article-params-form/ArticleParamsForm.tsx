import { ReactNode } from 'react';

type TArticleParamsForm = {
	children: ReactNode;
};

export const ArticleParamsForm = ({ children }: TArticleParamsForm) => {
	return <>{children}</>;
};
