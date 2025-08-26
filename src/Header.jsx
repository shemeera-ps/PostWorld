export default function Header({
  publishers,
  darkMode,
  onClick,
  setCurPublisher,
  setSort,
  search,
  setSearch,
  resetFilters,
}) {
  return (
    <header className="flex flex-col gap-3 md:grid md:grid-cols-2 md:items-center md:gap-4 p-2">
      {/* Title */}
      <h1 className="text-2xl italic font-semibold">Post World</h1>

      {/* Dark/Light toggle (aligned right on md+) */}
      <button
        className={`${
          darkMode
            ? "bg-gray-900 text-gray-50 border border-gray-50"
            : "bg-blue-100"
        } p-2 rounded shadow self-end md:justify-self-end`}
        onClick={onClick}
      >
        {darkMode ? (
          <i className="ri-moon-line"></i>
        ) : (
          <i className="ri-sun-line"></i>
        )}
      </button>

      {/* Form - full width in small, left side in md+ */}
      <form
        action=""
        className="flex flex-col sm:flex-row flex-wrap gap-2 md:col-span-2 md:w-3/4 md:mx-auto"
      >
        {/* Search */}
        <div className="border border-gray-400 rounded px-2 py-1 flex-1">
          <input
            type="text"
            className="border-none outline-none w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Publisher filter */}
        <select
          className="border border-gray-400 rounded px-2 py-1"
          onChange={(e) => setCurPublisher(Number(e.target.value))}
        >
          <option
            value=""
            className={`${darkMode ? "text-gray-700" : "text-blue-500"}`}
          >
            Filter By Publisher
          </option>
          {publishers.map((publisher) => (
            <option
              value={publisher.id}
              className={`${darkMode ? "text-gray-700" : "text-blue-500"}`}
              key={publisher.id}
            >
              {publisher.name}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          name="sort"
          className="border border-gray-400 rounded px-2 py-1"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>

        {/* Reset button */}
        <button
          type="button"
          onClick={resetFilters}
          className="bg-blue-900 rounded text-blue-50 py-1 px-3"
        >
          Reset
        </button>
      </form>
    </header>
  );
}
