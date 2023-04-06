/*HTML містить розмітку форми. Напиши скрипт, який буде зберігати значення полів у локальне сховище, коли користувач щось друкує.

<form class="feedback-form" autocomplete="off">
  <label>
    Email
    <input type="email" name="email" autofocus />
  </label>
  <label>
    Message
    <textarea name="message" rows="8"></textarea>
  </label>
  <button type="submit">Submit</button>
</form>

Виконуй це завдання у файлах 03-feedback.html і 03-feedback.js. Розбий його на декілька підзавдань:

Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle. */

import throttle from 'lodash.throttle';

const data = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('textarea'),
  input: document.querySelector('input')
};

const STORAGE_KEY = 'feedback-form-state';
const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

if (storedData) {
  data.input.value = storedData.email;
  data.textarea.value = storedData.message;
}


data.form.addEventListener('submit', onSubmit);
data.form.addEventListener('input', throttle(getUserData, 500));

const userData = { email: '', message: '' };

function onSubmit(event) {
  event.preventDefault();

  const {
    elements: { email, message },
  } = event.currentTarget;

  if (email.value === '' || message.value === '') {
    return alert('Please fill all fields');
  }

  const inputData = {
    email: email.value,
    message: message.value,
  };
  console.log('inputData', inputData);

  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function getUserData(event) {
  userData.email = data.form.elements.email.value;
  userData.message = data.form.elements.message.value;

  saveData();
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
}

