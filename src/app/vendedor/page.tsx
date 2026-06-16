"use client";

import { User, Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import HeaderCadastro from "@/components/Header/HeaderCadastro";

export default function Vendedor() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    senha: "",
    confirmarSenha: "",
    role: "VENDEDOR",
  });
  const router = useRouter();

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "nome") {
      value = value.replace(/[0-9]/g, "");
    }

    if (name === "telefone") {
      value = value.replace(/\D/g, "");

      if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3");
      }
    }
    setForm({
      ...form,
      [name]: value,
    });
  };
  const cadastrarVendedor = async () => {
    if (form.senha !== form.confirmarSenha) {
      alert("As senhas não coincidem");
      return;
    }
    try {
      const response = await api.post("/auth/register", {
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        endereco: form.endereco,
        senha: form.senha,
        role: form.role,
        ativo: true,
      });
      console.log(response.data);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col">
      <HeaderCadastro />
      <div className="flex justify-center items-center flex-1">
        <div className="bg-white shadow-xl w-[1000px] rounded-2xl p-3 flex items-center gap-5">
          <img
            src="/vetor3.jpg"
            alt="Cadastro"
            className="w-[380px] h-auto object-contain hidden md:block"
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              cadastrarVendedor();
            }}
            className="flex flex-col gap-5 flex-1"
          >
            <h1 className="text-[22px] font-semibold text-center m-6">
              Seja um <span className="text-blue-400">vendedor</span>
            </h1>
            <p className="text-[15px] text-center">
              Transforme seu estoque em vendas. Cadastre-se como vendedor e
              alcance novos clientes todos os dias.
            </p>

            <p className="flex flex-row gap-2 text-blue-400 text-[15px] items-center">
              <User className="w-4 h-4" />
              Dados pessoais
            </p>
            <input
              type="text"
              name="nome"
              required
              placeholder="Nome completo"
              value={form.nome}
              maxLength={100}
              onChange={handleChange}
              className="w-full rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500 border border-gray-200 text-sm"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="E-mail"
              value={form.email}
              maxLength={150}
              onChange={handleChange}
              className="w-full rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500 border border-gray-200 text-sm"
            />
            <input
              type="tel"
              name="telefone"
              required
              placeholder="Telefone"
              value={form.telefone}
              maxLength={15}
              onChange={handleChange}
              className="w-full rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500 border border-gray-200 text-sm"
            />
            <input
              type="text"
              name="endereco"
              required
              placeholder="Ex: Santo aleixo"
              value={form.endereco}
              maxLength={255}
              onChange={handleChange}
              className="w-full rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500 border border-gray-200 text-sm"
            />
            <p className="flex flex-row gap-2 text-blue-400 text-[15px] items-center">
              <Lock className="w-4 h-4" />
              Segurança
            </p>
            <input
              type="password"
              name="senha"
              required
              placeholder="Senha"
              value={form.senha}
              minLength={6}
              maxLength={50}
              onChange={handleChange}
              className="w-full rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500 border border-gray-200 text-sm"
            />
            <input
              type="password"
              required
              name="confirmarSenha"
              placeholder="Confirmar senha"
              value={form.confirmarSenha}
              onChange={handleChange}
              className="w-full rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500 border border-gray-200 text-sm"
            />
            <div className="flex flex-row gap-3 justify-center">
              <input type="checkbox" required />
              <p className="text-sm text-gray-400">
                Aceito os termos de uso e a política de privacidade.
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-sm hover:bg-blue-600 transition cursor-pointer mt-2"
            >
              Cadastrar
            </button>
            <p className="text-center text-sm text-gray-400">
              Já tem uma conta?{" "}
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
