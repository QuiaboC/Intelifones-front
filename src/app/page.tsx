import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-slate-100 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-xl w-100 h-100 rounded-sm">
        <h1 className="text-[30px] font-semibold text-center m-6">welcome</h1>
        <div className=" flex flex-col gap-5 m-5 mt-10">
          <input
            type="email"
            placeholder="email"
            className="w-full shadow-sm rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="senha"
            className="w-full shadow-sm rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className=" flex flex-col gap-5 m-5 mt-10 items-center">
          <button className=" w-full bg-blue-500 text-white p-3 rounded-sm hover:bg-blue-600 transition cursor-pointer">
            <Link 
            href="/home">
              Entrar 
            </Link>
          </button>
          <p className="text-center text-sm mt-4">
            cadastra-se{" "}
            <Link
              href="/cadastro"
              className="text-blue-500 cursor-pointer hover:underline"
            >
              aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
