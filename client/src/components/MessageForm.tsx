import React, { ChangeEvent, FC, useState, MouseEvent, useContext } from "react";
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
  const sendMessage = async (event: MouseEvent<HTMLButtonElement>) => {
    await MessageService.SendMessage({
      id: Date.now(),
      text: value,
      user: { nickname: user.nickname, picture: user.picture, id: user.id },
    });
  };
  return (
    <div className='mform wrapper'>
      <input type='text' className='mform__input' placeholder='Введите сообщение' value={value} onChange={changeHandler} />
      <button className='mform__button' onClick={sendMessage}>
        Отправить
      </button>
    </div>
  );
});
