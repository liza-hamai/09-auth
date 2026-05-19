"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "../../../../lib/api/clientApi";
import NoteList from "../../../../components/NoteList/NoteList";
import Pagination from "../../../../components/Pagination/Pagination";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import css from "./NotesPage.module.css";

interface Props {
  tagValue?: string;
}

export default function NotesClient({ tagValue }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", { tag: tagValue, page, search }],
    queryFn: () => fetchNotes({ search, tag: tagValue, page, perPage: 12 }),
    placeholderData: keepPreviousData,
  });

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={updateSearchQuery} />
        {(data?.totalPages ?? 0) > 1 && (
          <Pagination
            totalPages={data?.totalPages ?? 0}
            page={page}
            setPage={setPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {isLoading && <p>Loading, please wait...</p>}
      {isError && <p>Could not fetch the list of notes.</p>}
      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}