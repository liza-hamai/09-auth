import type { Metadata } from "next";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "../../../../lib/api";
import NotesClient from "./Notes.client";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === "all" ? "All" : slug[0];

  return {
    title: `${tag} Notes | NoteHub`,
    description: `Browse notes filtered by tag: ${tag}`,
    openGraph: {
      title: `${tag} Notes | NoteHub`,
      description: `Browse notes filtered by tag: ${tag}`,
      url: `https://your-app.vercel.app/notes/filter/${slug.join("/")}`,
      images: [{ url : "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"}],
    },
  };
}

export default async function FilterPage({ params }: Props) {
  const { slug } = await params;
  const tagValue = slug[0] === "all" ? undefined : slug[0];

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", { tag: tagValue, page: 1, search: "" }],
    queryFn: () => fetchNotes({ tag: tagValue, page: 1, perPage: 12 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tagValue={tagValue} />
    </HydrationBoundary>
  );
}