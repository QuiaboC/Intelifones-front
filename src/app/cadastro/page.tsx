export default function Cadastro() {
  return (
    <div className="bg-slate-100 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-xl w-100 h-100 rounded-sm">
        <h1 className="text-[20px] font-semibold text-center m-6">Cadastro</h1>
        <div className=" flex flex-col gap-5 m-5 mt-10">
          <input
            type="text"
            placeholder="Nome"
            className="w-full shadow-sm rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full shadow-sm rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full shadow-sm rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Confirmar senha"
            className="w-full shadow-sm rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
