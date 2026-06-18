#  BookShelf - Personal Library Dashboard

A modern, responsive, and sleek web application designed to help book lovers manage, filter, and track their reading collections. It provides real-time search, interactive ratings, reading statistics, and local state persistence.

## Preview

### Main Dashboard
![Main Dashboard](screenshots/dashboard_main.png)

### Add / Edit Book Modal
![Add / Edit Book Modal](screenshots/add_book.png)

### Real-Time Search & Filtering
![Real-Time Search & Filtering](screenshots/search_filtering.png)

---

## Features

- **Library Dashboard:** Instantly view statistics of your library, including total books, books read, and books unread.
- **Real-Time Search & Filtering:** Filter your library instantly by book title or author.
- **Add & Edit Books:** Add new books or edit existing details (title, author, genre, rating, status, notes/description) via an elegant modal form.
- **Custom Categories / Genres:** Select predefined genres (Self Help, Fiction, Science, Biography, Technology) or type a custom one.
- **Interactive Rating System:** Rate books from 1 to 5 stars using an interactive UI.
- **LocalStorage Sync:** Your personal library collection automatically syncs with the browser's local storage so no data is lost on reload.
- **Premium Modern Design:** Sleek typography (Inter), responsive grid layouts, custom pastel tags, and subtle hover animations.

---

##  Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 8](https://vite.dev/)
- **Styles:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [React Icons (FontAwesome)](https://react-icons.github.io/react-icons/)

---

##  Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### Installation

1. Clone or download the repository.
2. Open your terminal in the project directory.
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

To launch the local development server:
```bash
npm run dev
```
The site will run at [http://localhost:5173](http://localhost:5173).

### Building for Production

To compile the application into static files:
```bash
npm run build
```
This generates a production-ready build in the `dist/` directory.

---

##  License

This project is open-source and available under the [MIT License](LICENSE).
