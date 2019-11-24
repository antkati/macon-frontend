import PropTypes from 'prop-types';
import ArticleTagSchema from './ArticleTagSchema';
import ImagesGallerySchema from './ImagesGallerySchema';

export default PropTypes.shape({
    id: PropTypes.number,
    category: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    viewsCount: PropTypes.number,
    thumbnailUrl: PropTypes.string,
    publishTime: PropTypes.string,
    text: PropTypes.string,
    pdf: PropTypes.string,
    needAuth: PropTypes.bool,
    tags: PropTypes.arrayOf(ArticleTagSchema),
    imagesGallery: ImagesGallerySchema,
    imagesInline: ImagesGallerySchema,
});
