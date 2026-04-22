"use client";

import { Cat } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [produto, setProduto] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProduto(response.data))
      .catch((error) => console.log(error));
  }, []);
  console.log(produto);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-around p-7 items-center shadow-xl flex-wrap">
        <img src="/next.svg" alt="" width={120} height={40} />
        <div className="flex p-1 gap-7 items-center m-3">
          <span className="cursor-pointer font-semibold">Home</span>
          <span className="cursor-pointer font-semibold">Inicio</span>
          <span className="cursor-pointer font-semibold">Produtos</span>
          <span className="cursor-pointer font-semibold">Contato</span>
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

      <div className="flex w-screen h-150 items-center justify-center gap-20 flex-wrap">
        <div className="m-2 flex flex-col gap-5">
          <h1 className="text-[30px]">Olá sou chrystian estou montando</h1>
          <p className="max-w-md text-[20px]">
            estou altumanete cursando o curso de ads e estou tentano
            asjdahsdhashdjhasdhjasdhhaj e nasodaosdasidiasdioaidioasdioaisd
          </p>
          <p className="cursor-pointer bg-black text-white p-2.5 rounded-2xl hover:bg-white hover:text-black transition shadow-xl w-fit">
            Clique aqui!
          </p>
        </div>
        <img src="/next.svg" alt="" width={420} height={120} />
      </div>

      <div className="flex flex-wrap justify-center shadow gap-8 p-10">
        {produto.map((item) => (
          <div
            key={item.id}
            className="w-[253px] h-[385px] flex flex-col justify-between p-8 rounded-2xl shadow-xl"
          >
            <img
              src={item.image}
              alt="Produto"
              className="w-full h-[120px] object-contain"
            />

            <h2 className="text-[19px] font-medium truncate">{item.title}</h2>

            <p className="text-[17px]">R$ {item.price}</p>

            <button className="bg-black text-white text-center py-2 rounded-lg hover:bg-white hover:text-black border transition cursor-pointer">
              Ver mais
            </button>
          </div>
        ))}
      </div>
      <div className="w-screen flex justify-around items-center p-10 flex-wrap">
        <div className="flex flex-col items-center m-2">
          <Cat />
          <h1 className="text-[20px]">Escolha como pagar</h1>
          <p className="max-w-md text-center text-[15px]">
            Com Mercado Pago, você paga com cartão, boleto ou Pix. Você também
            pode pagar em até 12x sem cartão com a Linha de Crédito.
          </p>
        </div>
        <div className="flex flex-col items-center m-2">
          <Cat />
          <h1 className="text-[20px]">
            Frete grátis por ser sua primeira compra
          </h1>
          <p className="max-w-md text-center text-[15px]">
            Aproveite este benefício em milhões de produtos.
          </p>
        </div>
        <div className="flex flex-col items-center m-2">
          <Cat />
          <h1 className="text-[20px]">Segurança, do início ao fim</h1>
          <p className="max-w-md text-center text-[15px]">
            Você não gostou do que comprou? Devolva! No Mercado Livre não há
            nada que você não possa fazer, porque você está sempre protegido.
          </p>
        </div>
      </div>
    </div>
  );
  /*data={posts.filter((post) => {
          const matchName = post.name?.common
            ?.toLowerCase()
            .includes(nome.toLowerCase());

          const matchRegion = region === "" || post.region === region;

          return matchName && matchRegion;
        })}*/
}
