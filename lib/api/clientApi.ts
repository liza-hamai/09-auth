import api from "./api";
import type { Note, NoteTag } from "../../types/note";
import type { User } from "../../types/user";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  search?: string;
  tag?: string;
  page: number;
  perPage: number;
}

export interface RegisterCredentials {
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export async function fetchNotes({ search, tag, page, perPage }: FetchNotesParams) {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, ...(search && { search }), ...(tag && { tag }) },
  });
  return response.data;
}

export async function fetchNoteById(id: string) {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote({ title, content, tag }: { title: string; content: string; tag: NoteTag }) {
  const response = await api.post<Note>("/notes", { title, content, tag });
  return response.data;
}

export async function deleteNote({ id }: { id: string }) {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
}

export async function register(credentials: RegisterCredentials) {
  const response = await api.post<User>("/auth/register", credentials);
  return response.data;
}

export async function login(credentials: LoginCredentials) {
  const response = await api.post<User>("/auth/login", credentials);
  return response.data;
}

export async function logout() {
  await api.post("/auth/logout");
}

export async function checkSession() {
  const response = await api.get<User | null>("/auth/session");
  return response.data;
}

export async function getMe() {
  const response = await api.get<User>("/users/me");
  return response.data;
}

export async function updateMe(data: Partial<User>) {
  const response = await api.patch<User>("/users/me", data);
  return response.data;
}