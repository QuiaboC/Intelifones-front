"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import axios from "axios";
import { ChevronDown, ChevronsUpDown, List } from "lucide-react";
import { useEffect, useState } from "react";

export default function Produto() {
  const [produto, setProduto] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((reponse) => setProduto(reponse.data))
      .catch((error) => console.log(error));
  }, []);
  

  const categorias = [
    "Todos",
    "Eletrônicos",
    "Roupas",
    "Alimentos",
    "Casa",
    "Esportes",
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="bg-gray-200 min-h-screen flex flex-row p-5">
        <div className="w-[200px] h-auto p-2 flex flex-col gap-5">
          <span className="font-semibold text-[17px]">Categorias relacionadas</span>
          {[1, 2, 3, 5, 6].map((item, index) => (
            <div className="w-full h-[150px] bg-gray-700" key={index}></div>
          ))}
        </div>
        <div className="flex flex-col flex-1">
          <div className=" w-full h-[70px] flex flex-row justify-start gap-5 p-5 items-center">
            <span className="flex font-semibold">
              <ChevronsUpDown />
              Ordenar:
            </span>
            <button className="p-2 text-left w-[200px] bg-white rounded-sm cursor-pointer flex justify-between">
              <span>mais produtos</span>
              <ChevronDown />
            </button>
            <span className="font-semibold">Exibir</span>
            <button className="bg-white p-2 text-left w-[200px] rounded-sm cursor-pointer flex justify-between">
              <span>60 paginas</span>
              <ChevronDown />
            </button>
            <span className="m-10 "><span className="font-semibold">{produto.length}</span> Produtos</span>
          </div>
          <div className="w-full h-[100px] flex flex-col justify-center gap-3 p-5">
            <div className="flex items-center gap-2">
              <List className="w-5 h-5" />
              <span className="font-semibold text-lg">Categorias</span>
            </div>
            <div className="flex flex-row gap-5">
              {" "}
              {categorias.map((item, index) => (
                <button
                  key={index}
                  className="p-2.5 rounded-sm cursor-pointer bg-white border border-blue-400 font-semibold hover:bg-blue-500 hover:text-white"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-5 flex-wrap justify-between flex-1 p-5 ">
            {produto.map((item) => (
              <a
                key={item.id}
                className="bg-white w-[230px] h-[350px] p-5 flex flex-col justify-around gap-2 rounded-sm group hover:shadow-xl"
                href=""
              >
                <div className="w-full h-[180px] justify-center flex">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="truncate">
                    Notebook Lenovo Ideapad Slim 3 15irh10 Intel Core i7-13620h
                    16gb 512gb SSD WINDOWS 11 15.3" - 83ns0000br Luna Grey
                  </span>
                  <div className="flex justify-between">
                    <span className="font-semibold">R$ 4.557,14</span>
                    <span className="text-green-400">Usado</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
