import "../styles/app.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "../store/index";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
}

export default MyApp;
