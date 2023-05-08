import { useContext, useEffect } from "react";
import "./App.css";
import { StoreContext } from ".";
import { LongPolling } from "./components/LongPolling";
import { EventSoursing } from "./components/EventSoursing";

function App() {
  const { user } = useContext(StoreContext);
  useEffect(() => {
    user.initUser();
  }, []);
  return (
    <div className='container'>
      {/* <LongPolling /> */}
      <EventSoursing />
    </div>
  );
}

export default App;

