export default function Footer() {
  return (
    <footer className="bg-gray-50 border-gray-100 border-t">
      <div className="container">
        <div className="flex flex-col items-center py-28 lg:flex-row lg:justify-between">
          <h3 className="text-center text-4xl font-bold leading-tight tracking-tighter mb-10 lg:text-left lg:w-1/2 lg:mb-0 lg:text-5xl">
            {/* Footer heading placeholder */}
            Footer Section
          </h3>
          <div className="flex flex-col items-center gap-3 lg:flex-row lg:w-1/2 lg:pl-4">
            <a
              href="#"
              className="rounded-full flex gap-2 items-center bg-gray-400 hover:bg-gray-500 focus:bg-gray-600 py-3 px-6 text-white transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Link placeholder */}
              Placeholder Link
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
