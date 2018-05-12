import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import glRequest from '../graphQLUtils';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `650px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: 4.636773, lng: -74.083626 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 4.638397, lng: -74.084639 }} onClick={props.onMarkerClick} /> }
    {props.isMarkerShown && <Marker position={{ lat: 4.635365, lng: -74.082960 }} onClick={props.onMarkerClick} />}
    {props.isMarkerShown && <Marker position={{ lat: 4.639648, lng: -74.089038 }} onClick={props.onMarkerClick} />}
    {props.isMarkerShown && <Marker position={{ lat: 4.633482, lng: -74.081822 }} onClick={props.onMarkerClick} />}
    {props.isMarkerShown && <Marker position={{ lat: 4.639379, lng: -74.086741 }} onClick={props.onMarkerClick} />}
    {props.isMarkerShown && <Marker position={{ lat: 4.634253, lng: -74.084782 }} onClick={props.onMarkerClick} />}

  </GoogleMap>
)

class PageMap extends Component {
  state = {
    isMarkerShown: true,
  }

  

  

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: true })
  }

  render() {
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
}

  export default PageMap;