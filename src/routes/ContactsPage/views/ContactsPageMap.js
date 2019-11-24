import React from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import token from './token';
import MapStyles from './MapStyles';
import Icon from 'shared/Icon';

export default class ContactsPageMap extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 45.028648074577866,
            longitude: 38.97160299999997,
            zoom: 16
        }
    }


    render() {
        return (
            <ReactMapGL
                width={'100%'}
                height={'100%'}
                {...this.state}
                mapStyle={MapStyles}
                mapboxApiAccessToken={token}
                onViewportChange={(viewport) => {
                    const {latitude, longitude, zoom} = viewport;
                    this.setState({latitude, longitude, zoom});
                }}
            >
                <Marker latitude={45.028648074577866} longitude={38.97160299999997} >
                    <Icon name={'marker'}/>
                </Marker>
            </ReactMapGL>
        );
    }
}
