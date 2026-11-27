import axios from "axios";
import type { CreateNoteType, Note } from "../types/note";

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
interface fetchNotesProps {
  // search?: string;
  page: number;
  search: string;
}

export const fetchNotes = async ({
  page,
  search,
}: fetchNotesProps): Promise<FetchNotesResponse> => {
  const request = await axios.get<FetchNotesResponse>(
    "https://notehub-public.goit.study/api/notes",
    {
      params: {
        page: page,
        perPage: 12,
        search: search,
      },
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    },
  );
  console.log("Відповідь сервера:", request.data);
  return request.data;
};

export const createNote = async (payload: CreateNoteType): Promise<Note> => {
  const { data } = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes",
    payload,
    {
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    },
  );
  return data;
};

export const deleteNote = async (noteId: Note["id"]): Promise<void> => {
  await axios.delete(`https://notehub-public.goit.study/api/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
};
