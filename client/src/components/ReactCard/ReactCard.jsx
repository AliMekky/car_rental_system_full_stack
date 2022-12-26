import React from "react";
import {
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CButton,
} from "@coreui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

//"https://imgd.aeplcdn.com/0x0/n/cw/ec/41375/x6-exterior-right-front-three-quarter.jpeg"
function ReactCard(props) {
  return (
    <CCard className="m-3" style={{ width: "19rem" }}>
      <CCardImage
        style={{ height: "148px" }}
        orientation="top"
        src={props.carData.IMAGE}
      />
      <CCardBody>
        <CCardTitle>
          {" "}
          <span
            style={{
              alignSelf: "center",
              fontWeight: "700",
              fontSize: "14px",
              color: "#90A3BF",
            }}
          >
            {props.carData.MANUFACTURER + "-" + props.carData.MODEL}
          </span>
        </CCardTitle>
        <CCardText>
          <span
            style={{ fontWeight: "700", fontSize: "20px", color: "#1A202C" }}
          >
            {props.carData.PRICE}$/
          </span>
          <span
            style={{
              marginRight: "3rem",
              fontWeight: "700",
              fontSize: "14px",
              color: "#90A3BF",
            }}
          >
            hr
          </span>
          <Link
            to="/CarDetail"
            state={{
              car: props.carData,
              name: props.name,
              isLogged: props.isLogged,
              email: props.email,
              tripData: props.tripData
            }}
          >
            <button
              style={{ height: "2rem" }}
              class="btn btn-sm btn-outline-primary"
            >
              GO
            </button>
          </Link>
        </CCardText>
      </CCardBody>
    </CCard>
  );
}

export default ReactCard;

//<span style = {{marginRight:"2rem" ,"fontWeight":"700", "fontSize" : "20px", "color" : "#1A202C"}}>Car-Model </span>
