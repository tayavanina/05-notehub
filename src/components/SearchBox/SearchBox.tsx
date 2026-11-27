import css from "./SearchBox.module.css";

interface SearchBoxProps {
  search: string;
  onSearch: (search: string) => void;
}
export function SearchBox({ search, onSearch }: SearchBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };
  return (
    <input
      className={css.input}
      value={search}
      type="text"
      placeholder="Search notes"
      onChange={handleChange}
    />
  );
}
