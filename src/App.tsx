import { Provider } from "react-redux";
import { store } from "./store";
import EventsList from "./features/events/EventsList";

function App() {
  return (
    <Provider store={store}>
      <div
        style={{
          width: "100vw",
          // height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1>See Tickets </h1>
        <EventsList />
      </div>
    </Provider>
  );
}

export default App;
