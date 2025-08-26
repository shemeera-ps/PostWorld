export default function Pagination({
  curPage,
  setCurPage,
  numberOfPost,
  perPage,
}) {
  const totalPages = Math.ceil(numberOfPost / perPage);

  return (
    <ul className="flex gap-2 justify-center my-2 items-center">
      {[...Array(totalPages)].map((_, index) => (
        <li
          key={index}
          onClick={() => setCurPage(index)}
          className={`px-3 py-1 border rounded cursor-pointer ${
            curPage === index ? "bg-blue-500 text-white" : "bg-white text-black"
          }`}
        >
          {index + 1}
        </li>
      ))}
    </ul>
  );
}
