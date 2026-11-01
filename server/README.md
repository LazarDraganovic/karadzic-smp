# Karadzic SMP — сервер

## Требования
- Java 21
- 8 ГБ RAM (минимум 6)

## Установка
1. Установи Java 21.
2. В этой папке выполни:
   ```
   java -jar neoforge-21.1.265-installer.jar --installServer
   ```
3. Запусти сервер:
   - Linux/macOS: `./start.sh`
   - Windows: `start.bat`

Порт: **25586**. IP: **5.9.235.227:25586**.

## Что внутри
- `mods/` — серверные моды (клиентские моды исключены)
- `config/`, `kubejs/` — конфиги и прогрессия
- `server.properties`, `eula.txt` — уже настроены

Клиентская сборка — на сайте (GitHub Pages).
