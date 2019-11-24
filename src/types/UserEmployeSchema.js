import PropTypes from 'prop-types';

export default PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    workPosition: PropTypes.string,
    thumbnailUrl: PropTypes.string,
});
