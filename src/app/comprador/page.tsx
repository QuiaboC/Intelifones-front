"use client";

import { User, Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import HeaderCadastro from "@/components/Header/HeaderCadastro";
import api from "@/services/api";
import { toast } from "react-toastify";

export default function Comprador() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    senha: "",
    confirmarSenha: "",
    role: "COMPRADOR",
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
    if (name === "cpf") {
      value = value.replace(/\D/g, "");

    if (value.length <= 11) {
      value = value.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{0,2})$/,
        "$1.$2.$3-$4",
          );
        }
      }
    }
    setForm({
      ...form,
      [name]: value,
    });
  };

  const cadastrarComprador = async () => {
    if (form.senha !== form.confirmarSenha) {
      toast.warning("As senhas não coincidem!");
      return;
    }
    try {
      const response = await api.post("/auth/register", {
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        cpf: form.cpf,
        senha: form.senha,
        role: form.role,
      });
      toast.success("Cadastro realizado com sucesso!");
      router.push("/");
    } catch (error) {
      toast.error("Erro ao realizar cadastro!");
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col">
      <HeaderCadastro />
      <div className="flex justify-center items-center flex-1">
        <div className="bg-white shadow-xl max-w-[1000px] w-full rounded-2xl p-4 flex items-center gap-5">
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
            className=" flex flex-col gap-5 flex-1"
          >
            <h1 className="text-[22px] font-semibold text-center m-6">
              Crie sua <span className="text-blue-400">conta</span>
            </h1>
            <p className="text-sm">
              Cadastre-se e aproveite as melhores ofertas em peças e acessórios
              para celular.
            </p>
            <p className="flex flex-row gap-2 text-blue-400 text-[15px] items-center">
              <User className="w-4 h-4" />
              dados pessoais
            </p>
            <input
              type="text"
              placeholder="Nome completo"
              name="nome"
              required
              value={form.nome}
              maxLength={100}
              onChange={handleChange}
              className="w-full rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500 border border-gray-200 text-sm"
            />
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              required
              value={form.email}
              maxLength={150}
              onChange={handleChange}
              className="w-full rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500 border border-gray-200 text-sm"
            />
            <input
              type="text"
              placeholder="telefone"
              required
              name="telefone"
              value={form.telefone}
              maxLength={15}
              onChange={handleChange}
              className="w-full rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500 border border-gray-200 text-sm"
            />
            <input
              type="text"
              placeholder="CPF"
              required
              name="cpf"
              value={form.cpf}
              maxLength={14}
              onChange={handleChange}
              className="w-full rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500 border border-gray-200 text-sm"
            />
            <p className="flex flex-row gap-2 text-blue-400 text-[15px] items-center">
              <Lock className="w-4 h-4" />
              Segurança
            </p>
            <input
              type="password"
              required
              placeholder="Senha"
              name="senha"
              value={form.senha}
              minLength={6}
              maxLength={50}
              onChange={handleChange}
              className="w-full rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500 border border-gray-200 text-sm"
            />
            <input
              type="password"
              required
              placeholder="Confirmar senha"
              name="confirmarSenha"
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
              className=" w-full bg-blue-500 text-white p-3 rounded-sm hover:bg-blue-600 transition cursor-pointer mt-2"
            >
              Cadastrar
            </button>
            <p className="text-center text-sm text-gray-400">
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
