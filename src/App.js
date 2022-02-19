/* eslint-disable */
import "./App.css";
import Layouts from "./layouts/routes";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Layouts />
    </Provider>
  );
}

export default App;
