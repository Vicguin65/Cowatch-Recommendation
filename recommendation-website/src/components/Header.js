const Header = () => {
  return (
    <nav className="bg-gray-800 w-screen p-5 space-x-12 flex items-center">
      <a href="/" className="text-white text-lg font-bold">
        Cowatch
      </a>
      <a
        href="/panel"
        class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
      >
        Videos
      </a>
      <div className="flex flex-1 absolute right-12">
        <a
          href="/"
          class="rounded-md px-3 py-2 text-sm font-medium bg-gray-700 hover:bg-gray-500 text-white"
        >
          Sign In
        </a>
      </div>
    </nav>
  );
};

export default Header;
