<?php
/**
 * Propellini - Contact Form Handler
 * Обработка форм обратной связи
 */

// Настройки
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Настройки email
define('ADMIN_EMAIL', 'info@propellini.ru'); // Замените на ваш email
define('FROM_EMAIL', 'noreply@propellini.ru');
define('SITE_NAME', 'Propellini');

// Telegram Bot настройки (опционально)
define('TELEGRAM_BOT_TOKEN', ''); // Добавьте токен бота
define('TELEGRAM_CHAT_ID', ''); // Добавьте ID чата

/**
 * Функция отправки в Telegram
 */
function sendToTelegram($message) {
    if (empty(TELEGRAM_BOT_TOKEN) || empty(TELEGRAM_CHAT_ID)) {
        return false;
    }
    
    $url = "https://api.telegram.org/bot" . TELEGRAM_BOT_TOKEN . "/sendMessage";
    $data = [
        'chat_id' => TELEGRAM_CHAT_ID,
        'text' => $message,
        'parse_mode' => 'HTML'
    ];
    
    $options = [
        'http' => [
            'method' => 'POST',
            'header' => 'Content-Type: application/x-www-form-urlencoded',
            'content' => http_build_query($data)
        ]
    ];
    
    $context = stream_context_create($options);
    $result = @file_get_contents($url, false, $context);
    
    return $result !== false;
}

/**
 * Валидация данных
 */
function validateData($data) {
    $errors = [];
    
    // Проверка имени
    if (empty($data['name']) || strlen($data['name']) < 2) {
        $errors[] = 'Имя должно содержать минимум 2 символа';
    }
    
    // Проверка телефона
    if (empty($data['phone'])) {
        $errors[] = 'Телефон обязателен для заполнения';
    } else {
        $phone = preg_replace('/[^0-9]/', '', $data['phone']);
        if (strlen($phone) < 10) {
            $errors[] = 'Некорректный номер телефона';
        }
    }
    
    // Проверка email (если указан)
    if (!empty($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Некорректный email адрес';
    }
    
    return $errors;
}

/**
 * Очистка данных
 */
function sanitizeData($data) {
    return array_map(function($value) {
        return htmlspecialchars(strip_tags(trim($value)), ENT_QUOTES, 'UTF-8');
    }, $data);
}

/**
 * Основной обработчик
 */
try {
    // Проверка метода запроса
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Метод не поддерживается');
    }
    
    // Получение данных
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Ошибка парсинга JSON');
    }
    
    // Очистка данных
    $data = sanitizeData($data);
    
    // Валидация
    $errors = validateData($data);
    if (!empty($errors)) {
        throw new Exception(implode(', ', $errors));
    }
    
    // Определение типа формы
    $formType = $data['formType'] ?? 'contact';
    $formTitle = $formType === 'application' ? 'Заявка на запись' : 'Контактная форма';
    
    // Формирование сообщения для email
    $emailMessage = "
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #168491; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 4px; }
            .label { font-weight: bold; color: #168491; }
            .value { margin-top: 5px; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #168491; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>$formTitle - Propellini</h2>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='label'>Имя:</div>
                    <div class='value'>{$data['name']}</div>
                </div>
                <div class='field'>
                    <div class='label'>Телефон:</div>
                    <div class='value'>{$data['phone']}</div>
                </div>";
    
    if (!empty($data['email'])) {
        $emailMessage .= "
                <div class='field'>
                    <div class='label'>Email:</div>
                    <div class='value'>{$data['email']}</div>
                </div>";
    }
    
    if (!empty($data['message'])) {
        $emailMessage .= "
                <div class='field'>
                    <div class='label'>Сообщение:</div>
                    <div class='value'>" . nl2br($data['message']) . "</div>
                </div>";
    }
    
    $emailMessage .= "
                <div class='footer'>
                    <p>Дата: " . date('d.m.Y H:i:s') . "</p>
                    <p>IP: {$_SERVER['REMOTE_ADDR']}</p>
                </div>
            </div>
        </div>
    </body>
    </html>";
    
    // Заголовки email
    $headers = [
        'MIME-Version' => '1.0',
        'Content-Type' => 'text/html; charset=UTF-8',
        'From' => FROM_EMAIL,
        'Reply-To' => $data['email'] ?? FROM_EMAIL,
        'X-Mailer' => 'PHP/' . phpversion()
    ];
    
    $headerString = '';
    foreach ($headers as $key => $value) {
        $headerString .= "$key: $value\r\n";
    }
    
    // Отправка email
    $subject = "[$formTitle] Новая заявка от {$data['name']}";
    $emailSent = mail(ADMIN_EMAIL, $subject, $emailMessage, $headerString);
    
    // Формирование сообщения для Telegram
    $telegramMessage = "🔔 <b>$formTitle</b>\n\n";
    $telegramMessage .= "👤 <b>Имя:</b> {$data['name']}\n";
    $telegramMessage .= "📞 <b>Телефон:</b> {$data['phone']}\n";
    
    if (!empty($data['email'])) {
        $telegramMessage .= "📧 <b>Email:</b> {$data['email']}\n";
    }
    
    if (!empty($data['message'])) {
        $telegramMessage .= "💬 <b>Сообщение:</b>\n{$data['message']}\n";
    }
    
    $telegramMessage .= "\n⏰ " . date('d.m.Y H:i:s');
    $telegramMessage .= "\n🌐 IP: {$_SERVER['REMOTE_ADDR']}";
    
    // Отправка в Telegram
    $telegramSent = sendToTelegram($telegramMessage);
    
    // Ответ
    echo json_encode([
        'success' => true,
        'message' => 'Заявка успешно отправлена',
        'email_sent' => $emailSent,
        'telegram_sent' => $telegramSent
    ], JSON_UNESCAPED_UNICODE);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}

