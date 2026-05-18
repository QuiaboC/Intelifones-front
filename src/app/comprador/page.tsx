"use client";

import axios from "axios";
import { User, Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import HeaderCadastro from "@/components/Header/HeaderCadastro";

export default function Comprador() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    senha: "",
    confirmarSenha: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const cadastrarComprador = () => {
    if (form.senha != form.confirmarSenha) {
      alert("As senhas não são iguais");
      return;
    }

    axios
      .post("http://localhost:3001/compradores", {
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        endereco: form.endereco,
        senha: form.senha,
      })
      .then((response) => {
        console.log(response.data);

        setForm({
          nome: "",
          email: "",
          telefone: "",
          endereco: "",
          senha: "",
          confirmarSenha: "",
        });

        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col">
      <HeaderCadastro />
      <div className="flex justify-center items-center flex-1">
        <div className="bg-white shadow-xl w-[1000px] rounded-2xl p-5 flex items-center gap-5">
          <img
            src="/vetor.png"
            alt="Cadastro"
            className="w-[400px] h-auto object-contain hidden md:block"
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              cadastrarComprador();
            }}
            className=" flex flex-col gap-5"
          >
            <h1 className="text-[30px] font-semibold text-center m-6">
              Crie sua <span className="text-blue-400">conta</span>
            </h1>
            <p>
              Cadastre-se e aproveite as melhores ofertas em peças e acessórios
              para celular.
            </p>
            <p className="flex flex-row gap-2 text-blue-400 text-[14px]">
              <User />
              dados pessoais
            </p>
            <input
              type="text"
              placeholder="Nome completo"
              name="nome"
              required
              value={form.nome}
              onChange={handleChange}
              className="shadow-sm rounded-sm p-2  outline-0 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full shadow-sm rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="telefone"
              required
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              className="w-full shadow-sm rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Endereço"
              required
              name="endereco"
              value={form.endereco}
              onChange={handleChange}
              className="w-full shadow-sm rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500"
            />
            <p className="flex flex-row gap-2 text-blue-400 text-[15px]">
              <Lock />
              Segurança
            </p>
            <input
              type="password"
              required
              placeholder="Senha"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              className="w-full shadow-sm rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              required
              placeholder="Confirmar senha"
              name="confirmarSenha"
              value={form.confirmarSenha}
              onChange={handleChange}
              className="w-full shadow-sm rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex flex-row gap-3 justify-center">
              <input type="checkbox" required />
              <p className="text-[15px]">
                Aceito os termos de uso e a política de privacidade.
              </p>
            </div>
            <button
              type="submit"
              className=" w-full bg-blue-500 text-white p-3 rounded-sm hover:bg-blue-600 transition cursor-pointer mt-2"
            >
              Cadastrar
            </button>
            <p className="text-center text-sm">
              Já tem uma conta? <a></a>
              <Link
                href="/"
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Entrar
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
