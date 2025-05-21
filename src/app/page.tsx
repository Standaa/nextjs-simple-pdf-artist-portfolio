"use client";

const Menu = () => (
  <div className="text-center">
    <h1 className="text-7xl text-black mb-4">Iseult Perrault</h1>
    <nav>
      <ul className="flex space-x-4 justify-around">
        <li>
          <a
            href="portfolio"
            className="text-black hover:text-gray-600 text-3xl"
          >
            Portfolio
          </a>
        </li>
        <li>
          <a href="cv" className="text-black hover:text-gray-600 text-3xl">
            CV
          </a>
        </li>
        <li>
          <a
            href="catalogue"
            className="text-black hover:text-gray-600 text-3xl"
          >
            Catalogue
          </a>
        </li>
        <li>
          <a href="contact" className="text-black hover:text-gray-600 text-3xl">
            Contact
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/i.perrault"
            className="text-black hover:text-gray-600 text-3xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </li>
      </ul>
    </nav>
  </div>
);

export default function Home() {
  return (
    <div
      className="bg-fixed bg-center bg-cover h-screen"
      style={{ backgroundImage: "url('/landing_page.png')" }}
    >
      <div
        className="bg-fixed bg-center bg-cover h-screen flex justify-center pt-[20rem]"
        style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}
      >
        <Menu />
      </div>
    </div>
  );
}
