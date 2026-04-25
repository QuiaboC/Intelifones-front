"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import ModalCadastro from "@/components/modalCadastro";
import ModalEditar from "@/components/modalEditar";

export default function Inventario() {
  const [produto, setProduto] = useState([]);
  const [modal, setModal] = useState(false);
  const [editar, setEditar] = useState(false);
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((reponse) => setProduto(reponse.data))
      .catch((error) => console.log(error));
  }, []);

  const deletarItem = (id) => {
    axios
      .delete(`https://fakestoreapi.com/carts/${id}`)
      .then(() => {
        setProduto(produto.filter((item) => item.id !== id));
      })
      .catch((error) => console.log(error));
  };

  const cadastrarProduto = () => {
    axios
      .post("https://fakestoreapi.com/products", {
        title: form.title,
        price: Number(form.price),
        description: form.description,
        category: form.category,
        image: form.image,
      })
      .then((response) => {
        console.log(response.data);

        setProduto([...produto, response.data]);

        setForm({
          title: "",
          price: "",
          description: "",
          category: "",
          image: "",
        });

        setModal(false);
      })
      .catch((error) => console.log(error));
  };

  const atualizarProduto = (id) => {
    axios
      .put(`https://fakestoreapi.com/products/${id}`, {
        title: form.title,
        price: Number(form.price),
        description: form.description,
        category: form.category,
        image: form.image,
      })
      .then((response) => {
        setProduto(
          produto.map((item) => (item.id === id ? response.data : item)),
        );

        setEditar(false);

        setForm({
          title: "",
          price: "",
          description: "",
          category: "",
          image: "",
        });
      })
      .catch((error) => console.log(error));
  };

  const abrirEditar = (item) => {
    setEditar(true);
    setIdEditando(item.id);

    setForm({
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category,
      image: item.image,
    });
  };

  console.log(produto);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex p-10 items-center">
        <div className="flex gap-3">
          <input
            type="text"
            name=""
            placeholder="Procurar produto"
            className="shadow p-2 rounded-2xl outline-none"
          />
          <button className="shadow p-2 px-4 rounded-2xl outline-none">
            Filtrar
          </button>
          <button
            onClick={() => setModal(true)}
            className="shadow p-2 px-4 rounded-2xl bg-green-400 text-white"
          >
            cadastra
          </button>
          <ModalCadastro
            modal={modal}
            setModal={setModal}
            form={form}
            setForm={setForm}
            cadastrarProduto={cadastrarProduto}
          />
        </div>
      </div>

      <div className="flex flex-col ">
        {produto.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center shadow p-5 gap-4 rounded-2xl m-5 flex-wrap"
          >
            <div className="flex gap-7 items-center">
              <img
                src={item.image}
                className="h-[100px] w-[100px] object-contain"
              />
              <div>
                <p className="font-semibold">{item.title}</p>
                <p>R$ {item.price}</p>
              </div>
              <div>
                <p className="text-[15px] max-w-md line-clamp-2">
                  {item.description}
                </p>
                <p>Categoria: {item.category}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => abrirEditar(item)}
                className="p-2 px-4 rounded-2xl bg-blue-400 text-white"
              >
                Editar
              </button>
              <ModalEditar
                editar={editar}
                setEditar={setEditar}
                form={form}
                setForm={setForm}
                atualizarProduto={atualizarProduto}
                idEditando={idEditando}
              />
              <button
                onClick={() => deletarItem(item.id)}
                className="p-2 px-4 rounded-2xl bg-red-400 text-white"
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}