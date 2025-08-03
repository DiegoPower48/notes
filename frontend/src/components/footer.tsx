export default function Footer() {
  return (
    <div className="w-screen bg-sidebar  text-white h-20 flex justify-end items-center">
      <div className="p-4 flex gap-4">
        <p className="font-bold">Created by: </p>
        <a
          className="font-bold hover:scale-125 transition duration-300 "
          target="_blank"
          rel="noopener noreferrer"
          href="https://diegotorres-portfoliodev.vercel.app"
        >
          Diego Torres
        </a>
      </div>
    </div>
  );
}
