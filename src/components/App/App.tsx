import { fetchNotes } from "../../services/noteService";
import { Modal } from "../Modal/Modal";
// import type { Note } from "../../types/note";
import { NoteList } from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import css from "./App.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import NoteForm from "../NoteForm/NoteForm";
import { SearchBox } from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import Loader from "../Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
// import { useState } from "react";
function App() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [title, setTitle] = useState<string>("");
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes({ page, search }),
    placeholderData: keepPreviousData,
    enabled: search != null,
  });

  const handleSearch = useDebouncedCallback((search: string) => {
    setPage(1);
    setSearch(search);
  }, 300);

  useEffect(() => {
    if (isSuccess && data?.notes.length === 0) {
      toast.error("No notes found for your request.", {
        duration: 4000,
        position: "top-right",
      });
    }
  }, [data, isSuccess]);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox search={search} onSearch={handleSearch} />

          {data?.totalPages != undefined && data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
          <button className={css.button} onClick={() => setIsModalOpen(true)}>
            Create note +
          </button>
        </header>

        <Toaster />
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}

        {isSuccess && (
          <>
            {data?.notes !== undefined && data.notes.length > 0 && (
              <NoteList notes={data.notes} />
            )}
          </>
        )}

        {isModalOpen && (
          <Modal
            children={
              <NoteForm
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => setIsModalOpen(false)}
              />
            }
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </>
  );
}

export default App;
