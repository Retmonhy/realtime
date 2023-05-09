import { useContext, useEffect } from "react";
import "./App.css";
import { StoreContext } from ".";
import { LongPolling } from "./components/LongPolling";
import { EventSoursing } from "./components/EventSoursing";
import { WebSock } from "./components/WebSock";
import { observer } from "mobx-react-lite";

export const App = observer(() => {
  const { user } = useContext(StoreContext);
  useEffect(() => {
    user.initUser();
  }, []);
  return (
    <div className='container'>
      {/* {user.isLoading ? <h3>Создаем ваш анонимный профиль, пожалуйста, подождите</h3> : <LongPolling />} */}
      {/* {user.isLoading ? <h3>Создаем ваш анонимный профиль, пожалуйста, подождите</h3> : <EventSoursing />} */}
      {user.isLoading ? <h3>Создаем ваш анонимный профиль, пожалуйста, подождите</h3> : <WebSock />}
    </div>
  );
});

export default App;

