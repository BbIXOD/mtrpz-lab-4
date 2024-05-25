## Запуск проєкту і сервера

> **NOTE:** Потрібна [Node.js](https://nodejs.org/en/download) щоб запустити проєкт та [Python](https://www.python.org/downloads/) для запуску HTTP сервера

Для того, щоб запустити проєкт, потрібно:

1. Склонувати проект:
```
git clone https://github.com/BbIXOD/mtrpz-lab-4.git
```

2. Перейти в папку **mtrpz-lab-4.git**:
```
cd ./mtrpz-lab-4.git
```

3. Встановити всі залежності:
```
npm install
```

4. Встановити Typescript:
```
npm install -g typescript
```

5. Написату таку команду:
```
tsc
```

6. Запустити сервер:
```
python -m http.server
```

## Запуск тестів

Щоб запустисти тести:
```
npm test
```