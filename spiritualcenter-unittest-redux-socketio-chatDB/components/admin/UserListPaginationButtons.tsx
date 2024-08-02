const UserListPaginationButtons = ({
  totalPages,
  currentPage,
  handlePageChange,
}: {
  totalPages: number;
  currentPage: number;
  handlePageChange: any;
}) => {
  return (
    <div className="mt-2 flex justify-center gap-2">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          disabled={currentPage - 1 === index}
          className="px-5 py-1 sm:px-8 sm:py-2 border rounded-lg border-black disabled:bg-gray-500 disabled:cursor-not-allowed disabled:text-red-300 bg-stone-200 hover:bg-stone-400 hover:transition"
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};
export default UserListPaginationButtons;
