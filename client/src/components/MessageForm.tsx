import React, { ChangeEvent, FC, useState, MouseEvent, KeyboardEvent } from "react";
import { observer } from "mobx-react-lite";
interface IMessageFormProps {
  onSend: (text: string) => void;
}

export const MessageForm: FC<IMessageFormProps> = observer(({ onSend }) => {
  const [value, setValue] = useState<string>("");
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("change");
    setValue(event.target.value);
  };
  const sendMessageOnEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };
  const sendMessageHandler = async (event: MouseEvent<HTMLButtonElement>) => sendMessage();
  const sendMessage = async () => {
    if (!value.length) return;
    onSend(value);
    setValue("");
  };
  return (
    <div className='mform wrapper'>
      <input type='text' className='mform__input' placeholder='Введите сообщение' value={value} onChange={changeHandler} onKeyUp={sendMessageOnEnterPress} />
      <button className='mform__button' onClick={sendMessageHandler}>
        Отправить
      </button>
    </div>
  );
});
