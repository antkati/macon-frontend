import PropTypes from 'prop-types';

export default PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    src: PropTypes.string,
    default: PropTypes.string,
    thumbnail: PropTypes.string,
    thumbnailHeight: PropTypes.number,
    thumbnailWidth: PropTypes.number,
}));
