import PropTypes from 'prop-types';

export default PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    workPosition: PropTypes.string,
    text: PropTypes.string,
    videoUrl: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    originalUrl: PropTypes.string,
});
