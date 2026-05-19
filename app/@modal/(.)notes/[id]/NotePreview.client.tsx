"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "../../../../lib/api/clientApi";
import Modal from "../../../../components/Modal/Modal";
import NotePreview from "../../../../components/NotePreview/NotePreview";

interface Props {
  id: string;
}

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={() => router.back()}>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong.</p>}
      {note && <NotePreview note={note} />}
    </Modal>
  );
}