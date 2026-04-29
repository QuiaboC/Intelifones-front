"use client";

import { User, Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

export default function Vendedor() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpfCnpj: "",
    senha: "",
    confirmarSenha: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const cadastrarVendedor = () => {
    if (form.senha !== form.confirmarSenha) {
      alert("As senhas não coincidem");
      return;
    }

    axios
      .post("coloque aqui", {
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        cpfCnpj: form.cpfCnpj,
        senha: form.senha,
      })
      .then((response) => {
        console.log(response.data);
        alert("Vendedor cadastrado com sucesso!");

        setForm({
          nome: "",
          email: "",
          telefone: "",
          cpfCnpj: "",
          senha: "",
          confirmarSenha: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-slate-100 min-h-screen flex justify-center items-center px-6">
      <div className="bg-white shadow-xl w-[1000px] rounded-2xl p-10 flex items-center gap-10">
        <img
          src="/vetor3.jpg"
          alt="Cadastro"
          className="w-[400px] h-auto object-contain hidden md:block"
        />

        <div className="flex flex-col gap-5 w-full">
          <h1 className="text-[30px] font-semibold text-center m-6">
            Seja um <span className="text-blue-400">vendedor</span>
          </h1>

          <p>
            Transforme seu estoque em vendas. Cadastre-se como vendedor e alcance
            novos clientes todos os dias.
          </p>

          <p className="flex flex-row gap-2 text-blue-400 text-[14px]">
            <User />
            Dados pessoais
          </p>

          <input
            type="text"
            name="nome"
            placeholder="Nome completo"
            value={form.nome}
            onChange={handleChange}
            className="shadow-sm rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            className="w-full shadow-sm rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="tel"
            name="telefone"
            placeholder="Telefone"
            value={form.telefone}
            onChange={handleChange}
            className="w-full shadow-sm rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="cpfCnpj"
            placeholder="CPF ou CNPJ"
            value={form.cpfCnpj}
            onChange={handleChange}
            className="w-full shadow-sm rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500"
          />

          <p className="flex flex-row gap-2 text-blue-400 text-[15px]">
            <Lock />
            Segurança
          </p>

          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            className="w-full shadow-sm rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="confirmarSenha"
            placeholder="Confirmar senha"
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
            onClick={cadastrarVendedor}
            className="w-full bg-blue-500 text-white p-3 rounded-sm hover:bg-blue-600 transition cursor-pointer mt-2"
          >
            Cadastrar
          </button>

          <p className="text-center text-sm">
            Já tem uma conta?{" "}
            <Link
              href="/"
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}