import { cookies } from "next/headers";
import type { Note } from "../../types/note";
import type { User } from "../../types/user";
import { AxiosResponse } from "axios";
import api from "./api";

interface FetchNotesParams {
  search?: string;
  tag?: string;
  page: number;
  perPage: number;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

async function getHeaders() {
  const cookieStore = await cookies();
  return { Cookie: cookieStore.toString() };
}

export async function fetchNotes({ search, tag, page, perPage }: FetchNotesParams) {
  const headers = await getHeaders();
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, ...(search && { search }), ...(tag && { tag }) },
    headers,
  });
  return response.data;
}

export async function fetchNoteById(id: string) {
  const headers = await getHeaders();
  const response = await api.get<Note>(`/notes/${id}`, { headers });
  return response.data;
}

export async function getMe() {
  const headers = await getHeaders();
  const response = await api.get<User>("/users/me", { headers });
  return response.data;
}

export async function checkSession(): Promise<AxiosResponse<User | null>> {
  const headers = await getHeaders();
  const response = await api.get<User | null>("/auth/session", { headers });
  return response;
}