# Dentia Next.js Project

This project has been converted from a static HTML template to a Next.js application.

## Getting Started

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Run the development server:
    ```bash
    npm run dev
    ```

3.  Build for production (static export):
    ```bash
    npm run build
    ```
    The output will be in the `out` directory.

## Project Structure

-   `app/`: Contains the application routes (pages).
    -   `page.tsx`: Home page (converted from `index.html`).
    -   `contact/page.tsx`: Contact page (converted from `contact.html`).
    -   `services/page.tsx`: Services page (converted from `services.html`).
    -   `layout.tsx`: Main layout including Header, Footer, and global scripts.
-   `components/`: Reusable components.
    -   `Header.tsx`: Navigation header.
    -   `Footer.tsx`: Page footer.
    -   `HeaderWrapper.tsx`: Client component to handle header styling based on route.
-   `public/`: Static assets (images, css, fonts, js).

## Next Steps

To fully complete the conversion:
1.  Convert the remaining HTML files (e.g., `about.html`, `blog.html`, `dentists.html`, individual service pages) to Next.js pages in the `app/` directory.
2.  Review the form handling in `contact/page.tsx` and implement a proper backend or API route (since `contact.php` won't work in a static export).
3.  Check if any JavaScript functionality (like sliders or animations) requires adjustments for React/Next.js (e.g., using `useEffect` for initialization if the current script loading strategy isn't sufficient).
