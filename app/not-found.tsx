import type { Metadata } from "next";
import Link from "next/link";
import css from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page Not Found | NoteHub",
  description: "This page does not exist",
  openGraph: {
    title: "Page Not Found | NoteHub",
    description: "This page does not exist",
    url: "https://your-app.vercel.app/not-found",
    images: [{ url : "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"}],
  },
};

export default function NotFound() {
  return (
    <div className={css.container}>
      <h2 className={css.title}>Page not found</h2>
      <p className={css.text}>The page you are looking for does not exist.</p>
      <Link href="/" className={css.link}>Go home</Link>
    </div>
  );
}