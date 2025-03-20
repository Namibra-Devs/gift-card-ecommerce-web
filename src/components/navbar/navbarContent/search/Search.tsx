import SearchIcon from "../../../../../public/icons/search.png";

const Search = () => {
  return (
    <>
      {/* Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-auto">
        <div className="w-[566px] bg-greylight flex items-center gap-2 px-[24px] py-[10px] rounded-[8px]">
          <img src={SearchIcon} alt="Search icon" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent focus:outline-none placeholder-greynegative"
          />
        </div>
      </div>
    </>
  );
};

export default Search;
