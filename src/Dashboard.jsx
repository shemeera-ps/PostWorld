import { useCallback, useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Posts from "./Posts";
import Pagination from "./Pagination";

export default function Dashboard() {
  const publishers = [
    { id: 1, name: "Blue Horizon Press" },

    { id: 2, name: "SilverLeaf Publications" },

    { id: 3, name: "Evergreen Media House" },

    { id: 4, name: "Golden Ink Publishers" },

    { id: 5, name: "Starline Books" },

    { id: 6, name: "Maplewood Press" },

    { id: 7, name: "Crescent Moon Publishing" },

    { id: 8, name: "SummitView Publications" },

    { id: 9, name: "BrightPath Media" },

    { id: 10, name: "OceanWave Books" },
  ];

  const [darkMode, setDarkMode] = useState(false);

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [publisher, setPublisher] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState("");
  const perPage = 10;

  function getPublisher(publisherId) {
    return (
      publishers.find((publisher) => publisher.id === publisherId)?.name ||
      "Unknown"
    );
  }

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);

      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error(res.statusText || "Failed to fetch posts");
      let data = await res.json();

      if (publisher) {
        data = data.filter((item) => item.userId === publisher);
      }
      if (sort) {
        data = data.sort((a, b) => {
          return sort === "latest" ? b.id - a.id : a.id - b.id;
        });
      }
      if (search) {
        const searchQuery = search.toLowerCase();
        data = data.filter(
          (item) =>
            item.title.toLowerCase().includes(searchQuery) ||
            item.body.toLowerCase().includes(searchQuery)
        );
      }
      console.log(data.length);
      setTotalPosts(data.length);

      const totalPages = Math.ceil(data.length / perPage);
      console.log(totalPages);
      if (page >= totalPages && totalPages > 0) {
        setPage(totalPages - 1);
        return;
      }

      const paginatedData = buildPaginatedData(data, perPage, page);
      console.log(paginatedData);
      setPosts(paginatedData);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [publisher, page, sort, search]);

  useEffect(
    function () {
      fetchPosts();
    },
    [fetchPosts]
  );

  useEffect(() => {
    setPage(0);
  }, [publisher, sort, search]);
  function buildPaginatedData(data, perPage, page) {
    const chunks = [];
    for (let i = 0; i < data.length; i += perPage) {
      const min = i;
      const max = i + perPage;
      const slice = data.slice(min, max);
      chunks.push(slice);
    }
    return chunks[page];
  }
  function changeMode() {
    setDarkMode((dm) => !dm);
  }
  function handleCurPublisher(pub) {
    setPublisher(pub);
  }
  function resetFilters() {
    setPublisher("");
    setSort("");
    setSearch("");
  }
  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-gray-50" : "bg-blue-50 text-blue-800"
      }overflow-x-hidden  md:p-8 mx-auto`}
    >
      <Header
        publishers={publishers}
        darkMode={darkMode}
        onClick={changeMode}
        search={search}
        setSearch={setSearch}
        setCurPublisher={handleCurPublisher}
        setSort={setSort}
        resetFilters={resetFilters}
      />
      {isLoading && (
        <p className="text-center my-2 font-semibold">
          Loading Please wait ...
        </p>
      )}
      {error && (
        <p className="text-center my-2 font-semibold text-red-600">{error}</p>
      )}
      {!isLoading && !error && (
        <Posts posts={posts} getPublisher={getPublisher} darkMode={darkMode} />
      )}
      <Pagination
        curPage={page}
        setCurPage={setPage}
        numberOfPost={totalPosts}
        perPage={perPage}
      />
      <Footer darkMode={darkMode} />
    </div>
  );
}
