import React from 'react';
import {CCard,CCardBody,CCardImage,CCardText,CCardTitle,CButton} from '@coreui/react';

//"https://imgd.aeplcdn.com/0x0/n/cw/ec/41375/x6-exterior-right-front-three-quarter.jpeg"
function ReactCard(props) {
  return (
    <CCard className = "m-3" style={{ width: '19rem', }}>
    <CCardImage style = {{height:"148px"}} orientation="top" src={props.img} />
    <CCardBody>
      <CCardTitle>  <span style = {{alignSelf : "center","fontWeight":"700", "fontSize" : "14px", "color" : "#90A3BF"}}>{props.name}</span></CCardTitle>
      <CCardText>
        <span style = {{"fontWeight":"700", "fontSize" : "20px", "color" : "#1A202C"}}>{props.price}$/</span><span style = {{marginRight:"3rem","fontWeight":"700", "fontSize" : "14px", "color" : "#90A3BF"}}>hr</span>
        <a style = {{height : "2rem"}} class="btn btn-sm btn-outline-primary" href="#" role="button">GO</a>
      </CCardText>
      
    </CCardBody>
  </CCard>
  )
}

export default ReactCard


//<span style = {{marginRight:"2rem" ,"fontWeight":"700", "fontSize" : "20px", "color" : "#1A202C"}}>Car-Model </span>