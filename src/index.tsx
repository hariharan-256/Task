import { createRoot } from "react-dom/client";
import { createStore, applyMiddleware, Store } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./redux/reducers/reducers";
import App from "./App";
import "./styles/global.scss";

const store: Store = createStore(reducer, applyMiddleware(thunk));

const container: any = document.getElementById("root");
const root: any = createRoot(container);
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
