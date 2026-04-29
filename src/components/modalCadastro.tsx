export default function ModalCadastro({
  modal,
  setModal,
  form,
  setForm,
  cadastrarProduto,
}) {
  if (!modal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="flex flex-col bg-white w-[500px] p-10 rounded-3xl shadow-2xl border border-gray-100 gap-5">
        <div className="flex mb-5 justify-center">
          <h1 className="text-[25px] font-semibold text-center m-6">
            Cadastrar <span className="text-blue-400">produto</span>
          </h1>
        </div>
        <input
          type="text"
          value={form.nome}
          onChange={(e) =>
            setForm({
              ...form,
              nome: e.target.value,
            })
          }
          placeholder="Nome do Produto"
          className="w-full p-3 rounded-2xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition"
        />
        <input
          type="number"
          value={form.preco}
          onChange={(e) =>
            setForm({
              ...form,
              preco: e.target.value,
            })
          }
          placeholder="Preço"
          className="appearance-none w-full p-3 rounded-2xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition"
        />
        <input
          type="text"
          value={form.descricao}
          onChange={(e) =>
            setForm({
              ...form,
              descricao: e.target.value,
            })
          }
          placeholder="Descrição"
          className="w-full p-3 rounded-2xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition"
        />
        <input
          type="text"
          value={form.estadoConservacao}
          onChange={(e) =>
            setForm({
              ...form,
              estadoConservacao: e.target.value,
            })
          }
          placeholder="Novo, seminovo..."
          className="w-full p-3 rounded-2xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition"
        />

        <div className="flex items-center gap-3 mt-2">
          <input
            type="checkbox"
            checked={form.usado}
            onChange={(e) =>
              setForm({
                ...form,
                usado: e.target.checked,
              })
            }
          />
          <p className="text-gray-700 font-medium">Produto usado</p>
        </div>

        <div className="flex w-full justify-center gap-10 mt-5">
          <button
            onClick={cadastrarProduto}
            className="px-6 py-2 rounded-2xl bg-green-500 text-white font-medium hover:bg-green-600 transition cursor-pointer shadow-md"
          >
            Salvar
          </button>

          <button
            onClick={() => setModal(false)}
            className="px-6 py-2 rounded-2xl bg-red-500 text-white font-medium hover:bg-red-600 transition cursor-pointer shadow-md"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
