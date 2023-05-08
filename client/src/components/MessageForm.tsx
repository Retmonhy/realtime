import React, { ChangeEvent, FC, useState, MouseEvent, KeyboardEvent, useContext } from "react";
import { MessageService } from "../shared/api/services";
import { observer } from "mobx-react-lite";
import { StoreContext } from "..";
interface IMessageFormProps {}

export const MessageForm: FC<IMessageFormProps> = observer(() => {
  const { user } = useContext(StoreContext);
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
    await MessageService.SendMessage({
      id: Date.now(),
      text: value,
      user: { nickname: user.nickname, picture: user.picture, id: user.id },
    });
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
