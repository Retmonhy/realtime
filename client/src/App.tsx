import { useContext, useEffect, useState } from "react";
import "./App.css";
import { Chat } from "./components/Chat";
import { MessageForm } from "./components/MessageForm";
import { IMessage } from "./shared/types";
import { MessageService } from "./shared/api/services/MessageService";
import { StoreContext } from ".";

function App() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { user } = useContext(StoreContext);
  useEffect(() => {
    user.initUser();
    subscribe();
  }, []);
  //тут подписывааемся на события, чтобы ссервер слал запрос, как только пользователь добавит новое сообщение
  const subscribe = async () => {
    try {
      const { data } = await MessageService.GetMessage();
      setMessages((prev) => [data, ...prev]);
      await subscribe();
    } catch (error) {
      console.log("Subscribe error");
      setTimeout(() => {
        subscribe();
      }, 500);
    }
  };
  return (
    <div className='container'>
      <MessageForm />
      <Chat messages={messages} />
    </div>
  );
}

export default App;

