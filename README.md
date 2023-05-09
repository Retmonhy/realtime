В рамках этого проета было реализовано real-time взаимодействие клиент - сервер различными подходами.

# 1) Long polling
# 2) Event sourcing
# 3) Websockets

Во всех случах был реализован онлайн чат для обмена сообщениями.
Для вебсокета была добавлена возможность наблюдать количество пользователей в онлайне.

### Запуск

Сервер

Перейти в папку сервер командой cd server
В .env файле выбрать желаемую реализацию real-time взаимодействия
В терминале выполнить yarn start

Клиент
    
Перейти в папку сервер командой cd client
В App.tsx файле выбрать желаемую реализацию real-time взаимодействия (раскомментировать соответствующий компонент)
В терминале выполнить yarn start
