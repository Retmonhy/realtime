import { useContext, useEffect } from "react";
import "./App.css";
import { StoreContext } from ".";
import { LongPolling } from "./components/LongPolling";
import { EventSoursing } from "./components/EventSoursing";
import { WebSock } from "./components/WebSock";

function App() {
  const { user } = useContext(StoreContext);
  useEffect(() => {
    user.initUser();
  }, []);
  return (
    <div className='container'>
      {/* <LongPolling /> */}
      {/* <EventSoursing /> */}
      <WebSock />
    </div>
  );
}

export default App;

