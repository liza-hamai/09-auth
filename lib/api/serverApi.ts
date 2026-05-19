import axios from "axios";
import { cookies } from "next/headers";
import type { Note } from "../../types/note";
import type { User } from "../../types/user";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

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
  const response = await axios.get<FetchNotesResponse>(`${baseURL}/notes`, {
    params: { page, perPage, ...(search && { search }), ...(tag && { tag }) },
    headers,
  });
  return response.data;
}

export async function fetchNoteById(id: string) {
  const headers = await getHeaders();
  const response = await axios.get<Note>(`${baseURL}/notes/${id}`, { headers });
  return response.data;
}

export async function getMe() {
  const headers = await getHeaders();
  const response = await axios.get<User>(`${baseURL}/users/me`, { headers });
  return response.data;
}

export async function checkSession() {
  const headers = await getHeaders();
  const response = await axios.get<User | null>(`${baseURL}/auth/session`, { headers });
  return response.data;
}