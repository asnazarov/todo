# Список задач, записная книжка 

---
https://todo.ru.com/

### О проекте
Список задач с разширенным функционалом. Нужен он для того чтобы контролировать и не забывать дела, которые нужно сделать за день/неделю/месяц.

#### Как это должно работать?
В меню sidebar пользователь нажимает "Добавить список", создаёт новую папку для следующих задач или списка. Называет папку и выбирает цветной маркер.


По нажатию на папку SPA выполняет следующие действия:
* отображает подзадачи папки;
* можно добавить новую задачу;
* пометить задачу как выполненную;
* удалить задачу.

### Описание SPA:
В этом проекте используется следующий стек технологий:

* Нативный React (create-react-app) без использования сторонних библиотек;
* Компонентная структура;
* Роутинг
* Асинхронность;
* Работа с API [Firebase.google](https://firebase.google.com/);
* Верстка BEM;
* Стили SCSS 
* nested структура стилей;

### Развёртывание проекта:
* Клонировать репозиторий в терминал командой: ```git clone (ссылка на репозиторий)```
* Установка зависмостей: ```npm i```
* Создание production-сборки: ```npm run build```
* Запуск тестовой сборки на локальном сервере: ```npm start```
* Публикация production-сборки на GitHub Pages: ```npm run deploy```
