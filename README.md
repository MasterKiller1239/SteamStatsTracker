# 🎮 SteamStatsTracker

**SteamStatsTracker** is a web application for tracking and analyzing Steam account statistics over time. Just enter a Steam username (vanity URL) or SteamID64, and the app will fetch data like number of games, total playtime, level, badges, and more.

---

## 📸 Demo

Coming soon...

---

## 🚀 Features

- 🔍 Search Steam users by nickname or SteamID64
- 📊 Fetch and store statistics from the Steam Web API:
  - Total games, total playtime
  - Steam level, badge count
  - (Coming soon) Total achievements
- 🕒 Track changes over time
- 📈 Display data in beautiful charts (using Chart.js)
- 🔁 Compare multiple users (coming soon)

---

## 🧰 Technologies

### Backend (.NET Core / C#)
- ASP.NET Core Web API
- Clean Architecture (layers: Application, Domain, Infrastructure, Api)
- RESTful API endpoints
- `HttpClient` for calling Steam API
- Entity Framework Core with PostgreSQL or SQLite

### Frontend (React)
- React + TypeScript (in progress)
- Axios for API communication
- Chart.js for data visualization
- TailwindCSS or Bootstrap for styling

---

