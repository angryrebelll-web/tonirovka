# Landpadge - Propellini Site

Готовая структура для деплоя на GitHub Pages.

## Структура файлов

```
landpadge-deploy/
├── index.html              # Главная страница
├── calculator.html         # Калькулятор
├── calculator-style.css    # Стили калькулятора
├── style.css              # Основные стили
├── .nojekyll              # Для GitHub Pages
├── js/                    # JavaScript файлы
│   ├── calculator.js
│   ├── cars.js
│   └── prices.js
├── calculator/            # Старая папка (можно удалить)
└── *.svg                  # Логотипы брендов
```

## Как загрузить на GitHub

### Вариант 1: Через GitHub Desktop
1. Откройте GitHub Desktop
2. Добавьте репозиторий `landpadge`
3. Скопируйте все файлы из этой папки в корень репозитория
4. Закоммитьте и запушьте

### Вариант 2: Через Git командную строку
```bash
cd C:\Users\dmitry\Desktop\landpadge-deploy
git init
git remote add origin https://github.com/angryrebelll-web/landpadge.git
git add .
git commit -m "Initial commit: Propellini site"
git push -u origin master
```

### Вариант 3: Через веб-интерфейс GitHub
1. Откройте https://github.com/angryrebelll-web/landpadge
2. Нажмите "Add file" → "Upload files"
3. Перетащите все файлы из этой папки
4. Закоммитьте

## Настройка GitHub Pages

1. Перейдите в Settings → Pages
2. Source: Deploy from a branch
3. Branch: master
4. Folder: / (root)
5. Сохраните

## Проверка

После деплоя сайт будет доступен по адресу:
`https://angryrebelll-web.github.io/landpadge/`

## Важно

- Все пути в файлах уже исправлены для GitHub Pages
- Файл `.nojekyll` необходим для правильной работы
- Папка `calculator/` - старая, можно удалить после проверки

