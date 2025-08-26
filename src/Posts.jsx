export default function Posts({ posts, getPublisher, darkMode }) {
  return (
    <div
      className={`${
        darkMode ? "" : ""
      }relative grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 w-full p-4 mx-auto my-2 min-h-[380px]`}
    >
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div
            className={`shadow p-2 rounded-xl ${
              darkMode ? "bg-gray-100 text-gray-700" : "bg-white"
            }`}
            key={post.id}
          >
            <h2
              className={`${
                darkMode ? "text-gray-900 " : ""
              }font-semibold italic my-2`}
            >
              {post.title}
            </h2>
            <p className={`p-1`}>{post.body}</p>
            <p>
              <span className="">Published By :</span>
              <span className={`text-red-700 font-medium `}>
                {getPublisher(post.userId)}
              </span>
            </p>
          </div>
        ))
      ) : (
        <p className="italic font-semibold text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          No Posts available
        </p>
      )}
    </div>
  );
}
