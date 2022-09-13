import { Stepper } from "@mui/material";
import { Container } from "@mui/system";
import About from "../components/about";
import Banner from "../components/banner";

import Choose from "../components/choose";
import Header from "../components/header";
import Homepage from "../components/home";
import Services from "../components/services/services";
import Slick from "../components/portfolio/portfolio";
import Slider from "react-slick";
import Member from "../components/member";
import Sliderbg from "../components/sliderbg";
import Outpanner from "../components/outpanner";
import Footer from "../components/footer";
import BasicTabs from "../components/portfolio";
import Portfolio from "../components/portfolio/portfolio";
import Technologi from "../components/features/features";
import BackToTop from "../components/backToTop";

export default function Home(props) {
  return (
    <>
      {/* <Homepage /> */}
      <div className="home">
        {" "}
        <Sliderbg />
      </div>{" "}
      <Header />
      <div className="web"></div>
      <Services />
      <Container>
        <Technologi />
        {/* <About /> */}
      </Container>
      <Portfolio />
      {/* <Choose /> */}
      <Banner />
      <Container></Container>
      <Member />
      {/* <Outpanner /> */}
      <Footer />
      <BackToTop />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </>
  );
}
