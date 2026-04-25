import Link from "next/link";
export default function Header() {
  return (
    <div className="flex justify-around p-7 items-center shadow-xl flex-wrap">
      <Link href="/home">
        <img src="/next.svg" alt="" width={120} height={40} />
      </Link>
      <div className="flex p-1 gap-7 items-center m-3">
        <span className="cursor-pointer font-semibold">
          <Link href="/home">Home</Link>
        </span>
        <span className="cursor-pointer font-semibold">Inicio</span>
        <span className="cursor-pointer font-semibold">Produtos</span>
        <span className="cursor-pointer font-semibold">Contato</span>
        <span className="cursor-pointer font-semibold">
          <Link href="/Inventario">Inventario</Link>
        </span>
      </div>
      <div className="flex gap-6 items-center">
        <input
          type="text"
          placeholder="Digite aqui"
          className="shadow p-2 rounded-2xl outline-none"
        ></input>
        <span className="cursor-pointer bg-black text-white p-2 px-5 rounded-2xl hover:bg-white hover:text-black transition shadow-xl">
          Entrar
        </span>
      </div>
    </div>
  );
}
