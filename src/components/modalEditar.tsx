export default function modalEditar({
  editar,
  setEditar,
  form,
  setForm,
  atualizarProduto,
  idEditando,
}) {
  if (!editar) return null;

  return (
    <div className="fixed inset-0 bg-black/5 flex justify-center items-center z-50">
      <div className="flex flex-col bg-white w-[500px] p-8 rounded-2xl gap-3">
        <div className="flex mb-5 justify-center">
          <h1 className=" text-[20px]">Editar produto</h1>
        </div>

        <p className="font-semibold">Nome do produto</p>
        <input
          type="text"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
          placeholder="Nome"
          className="shadow p-2 rounded-2xl outline-none w-full"
        />
        <p className="font-semibold">Preço</p>
        <input
          type="number"
          value={form.price}
          onChange={(e) =>
            setForm({
              ...form,
              price: e.target.value,
            })
          }
          placeholder="Preço"
          className="shadow p-2 rounded-2xl outline-none w-full"
        />
        <p className="font-semibold">Descrição</p>
        <input
          type="text"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          placeholder="Descrição"
          className="shadow p-2 rounded-2xl outline-none w-full"
        />
        <p className="font-semibold">category</p>
        <input
          type="text"
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value,
            })
          }
          placeholder="Categoria"
          className="shadow p-2 rounded-2xl outline-none w-full"
        />

        <p className="font-semibold">Imagem</p>
        <input
          type="text"
          value={form.image}
          onChange={(e) =>
            setForm({
              ...form,
              image: e.target.value,
            })
          }
          placeholder="Descrição"
          className="shadow p-2 rounded-2xl outline-none w-full"
        />
        <div className="flex w-full justify-center gap-10 mt-5">
          <button
            onClick={() => atualizarProduto(idEditando)}
            className="shadow p-2 px-4 rounded-2xl bg-green-400 text-white cursor-pointer hover:bg-white hover:text-green-400 border border-green-400"
          >
            Editar
          </button>
          <button
            onClick={() => setEditar(false)}
            className="shadow p-2 px-4 rounded-2xl bg-red-400 text-white cursor-pointer hover:bg-white hover:text-red-400 border border-red-400"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
