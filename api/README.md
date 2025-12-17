# 📧 API для обработки форм Propellini

## 🚀 Быстрая настройка

### 1. Настройте email в `contact.php`

Откройте файл `api/contact.php` и измените следующие константы:

```php
define('ADMIN_EMAIL', 'your-email@example.com'); // Ваш email
define('FROM_EMAIL', 'noreply@propellini.ru');   // Email отправителя
```

### 2. (Опционально) Настройте Telegram Bot

Для получения уведомлений в Telegram:

1. Создайте бота через [@BotFather](https://t.me/BotFather)
2. Получите токен бота
3. Получите ID чата (можно через [@userinfobot](https://t.me/userinfobot))
4. Добавьте в `contact.php`:

```php
define('TELEGRAM_BOT_TOKEN', 'YOUR_BOT_TOKEN');
define('TELEGRAM_CHAT_ID', 'YOUR_CHAT_ID');
```

### 3. Права доступа

Убедитесь, что PHP имеет права на выполнение:

```bash
chmod 644 contact.php
chmod 644 .htaccess
```

### 4. Проверка работы

Проверьте, что PHP mail() функция работает на вашем хостинге:

```php
<?php
mail('test@example.com', 'Test', 'Test message');
?>
```

## 📋 Возможности

- ✅ Валидация всех полей формы
- ✅ Защита от XSS и SQL инъекций
- ✅ Отправка на email (HTML шаблон)
- ✅ Отправка в Telegram (опционально)
- ✅ CORS headers
- ✅ Красивое оформление email
- ✅ Логирование IP и времени

## 🔒 Безопасность

- Разрешены только POST запросы
- Все данные очищаются и валидируются
- Защита .htaccess
- Защита от спама (можно добавить капчу)

## 📝 Формат данных

### Request (POST JSON):

```json
{
  "name": "Иван Иванов",
  "phone": "+7 (999) 123-45-67",
  "email": "user@example.com",
  "message": "Текст сообщения",
  "formType": "application"
}
```

### Response (Success):

```json
{
  "success": true,
  "message": "Заявка успешно отправлена",
  "email_sent": true,
  "telegram_sent": true
}
```

### Response (Error):

```json
{
  "success": false,
  "message": "Описание ошибки"
}
```

## 🛠️ Дополнительные настройки

### Добавить Google reCAPTCHA

1. Получите ключи на [Google reCAPTCHA](https://www.google.com/recaptcha/)
2. Добавьте проверку в `contact.php`:

```php
function verifyRecaptcha($token) {
    $secret = 'YOUR_SECRET_KEY';
    $response = file_get_contents(
        "https://www.google.com/recaptcha/api/siteverify?secret=$secret&response=$token"
    );
    $data = json_decode($response);
    return $data->success;
}
```

### Логирование в файл

Добавьте в начало `contact.php`:

```php
function logRequest($data) {
    $log = date('Y-m-d H:i:s') . ' | ' . json_encode($data) . "\n";
    file_put_contents(__DIR__ . '/logs/requests.log', $log, FILE_APPEND);
}
```

## 📞 Поддержка

Если возникли вопросы:
- Email: info@propellini.ru
- Telegram: @propellini_detailing

