export interface NewsModel {
    id: string;
    created_at: string;
    modified_at: string;
    title: string;
    description: string;
    link: string;
    author: string;
    image: string;
}
export interface News {
    news: NewsModel[];
    meta: {
        per_page: 10
        total_pages: 1
        total_results: 0
    };
}
