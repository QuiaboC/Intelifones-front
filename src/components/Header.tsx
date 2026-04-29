import Link from "next/link";

export default function Header() {
  return (
    <div className="sticky top-0 z-50 bg-white flex justify-between px-10 py-4 items-center shadow-md border-b border-gray-100 flex-wrap">
      <Link href="/home">
        <span className="text-blue-400 text-[30px] font-semibold cursor-pointer">
          Intelifones
        </span>
      </Link>

      <div className="flex gap-7 items-center m-3">
        <span className="cursor-pointer text-[18px] hover:text-blue-400 transition">
          <Link href="/home">Home</Link>
        </span>

        <span className="cursor-pointer text-[18px] hover:text-blue-400 transition">
          Início
        </span>

        <span className="cursor-pointer text-[18px] hover:text-blue-400 transition">
          Produtos
        </span>

        <span className="cursor-pointer text-[18px] hover:text-blue-400 transition">
          Contato
        </span>

        <span className="cursor-pointer text-[18px] hover:text-blue-400 transition">
          <Link href="/Inventario">Inventário</Link>
        </span>
      </div>

      <div className="flex gap-6 items-center">
        <input
          type="text"
          placeholder="Digite aqui"
          className="border border-gray-200 p-2 rounded-xl outline-none focus:border-blue-400 transition"
        />

        <Link href="/">
          <button className="cursor-pointer bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition shadow-md">
            Entrar
          </button>
        </Link>
      </div>
    </div>
  );
}
