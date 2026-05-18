export default function CardDefault() {
  return (
    <div className="w-full flex justify-center mb-10">
      <div className="w-290 h-70 flex flex-row items-center gap-5">
          <div className="flex h-full shadow border border-gray-200 w-1/2 flex-row justify-between hover:shadow-xl cursor-pointer transition-transform duration-300 hover:scale-105">
          <div className="flex h-full flex-col justify-center p-5 gap-2 max-w-70 ">
            <span className="text-gray-400">Melhores produtos</span>
            <h1 className="font-medium text-2xl">Parcele e tenha descontos</h1>
            <a className="bg-blue-400 w-30 p-2 rounded-sm text-white hover:bg-blue-500 cursor-pointer text-center">
              Ver produtos
            </a>
          </div>
          <div className="h-full flex bg-blue-500 w-70 items-center justify-center">
            <img src="vetorProduto.png" alt="" className="w-50 h-50" />
          </div>
        </div>
        <div className="flex h-full shadow border border-gray-200 w-1/2 flex-row justify-between hover:shadow-xl cursor-pointer transition-transform duration-300 hover:scale-105">
          <div className="flex h-full flex-col justify-center p-5 gap-2 max-w-70">
            <span className="text-gray-400">Cadastre-se</span>
            <h1 className="font-medium text-2xl">Para aproveitar descontos</h1>
            <a className="bg-blue-400 w-30 p-2 rounded-sm text-white hover:bg-blue-500 cursor-pointer text-center">
              Cadastrar
            </a>
          </div>
          <div className="h-full flex bg-blue-500 w-70 items-center justify-center">
            <img src="vetorCadastro.png" alt="" className="w-50 h-50" />
          </div>
        </div>
      </div>
    </div>
  );
}
