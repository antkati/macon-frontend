import PropTypes from 'prop-types';
import ArticleTagSchema from './ArticleTagSchema';

export default PropTypes.shape({
    id: PropTypes.number,
    category: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    pdf: PropTypes.string,
    viewsCount: PropTypes.number,
    publishTime: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    originalUrl: PropTypes.string,
    tags: PropTypes.arrayOf(ArticleTagSchema),
});
