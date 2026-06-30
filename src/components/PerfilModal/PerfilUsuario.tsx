import api from "@/services/api";
import {
  CreditCard,
  LockKeyhole,
  MapPin,
  MessageSquare,
  Pencil,
  Shield,
  UserRoundPen,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function PerfilUsuario({ setPaginaAtiva }) {
  const [usuario, setUsuario] = useState(null);
  const [imagem, setImagem] = useState(null);

  useEffect(() => {
    api
      .get("/usuarios/me")
      .then((response) => setUsuario(response.data))
      .catch((error) => console.log(error));
  }, []);

  const atualizarFoto = async (arquivo: File) => {
    const formData = new FormData();

    formData.append("arquivo", arquivo);

    try {
      const response = await api.put("/usuarios/me/imagem", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUsuario(response.data);
    } catch (error: any) {
      console.log(error.response?.data || error);
    }
  };

  const selecionarImagem = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0];

    if (!arquivo) return;

    setImagem(arquivo);

    await atualizarFoto(arquivo);
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-100 px-30 py-10">
      <div className="w-full max-w-[1100px]">
        {usuario && (
          <div className="w-full p-5 flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative w-20 h-20">
                <img
                  src={
                    usuario?.imagem
                      ? `http://localhost:8080/uploads/usuarios/${usuario.imagem}`
                      : "/vetor.png"
                  }
                  className="w-20 h-20 rounded-full object-cover border"
                />

                <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 cursor-pointer shadow">
                  <Pencil className="w-4 h-4" />

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={selecionarImagem}
                  />
                </label>
              </div>

              <div className="flex flex-col gap-1 ml-5">
                <h1 className="font-bold text-[22px]">{usuario.nome}</h1>
                <p className="text-gray-500 text-[15px]">{usuario.email}</p>
              </div>
            </div>

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                usuario.role === "VENDEDOR"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {usuario.role === "VENDEDOR" ? "Vendedor" : "Comprador"}
            </span>
          </div>
        )}

        <div className="flex flex-wrap gap-5 w-full mt-5">
          <div
            className="w-[350px] bg-white p-6 rounded-sm hover:bg-gray-100 hover:shadow-md transition cursor-pointer flex flex-col gap-2"
            onClick={(e) => setPaginaAtiva("Informacao")}
          >
            <UserRoundPen className="w-6 h-6 text-blue-500" />
            <h1 className="font-semibold text-[15px]">Informações da Conta</h1>
            <p className="text-gray-500 text-sm">Dados pessoais e da conta</p>
          </div>

          <div className="w-[350px] bg-white p-6 rounded-sm hover:bg-gray-100 hover:shadow-md transition cursor-pointer flex flex-col gap-2">
            <Shield className="w-6 h-6 text-blue-500" />
            <h1 className="font-semibold text-[15px]">Segurança</h1>
            <p className="text-gray-500 text-sm">
              Você configurou a segurança da sua conta
            </p>
          </div>

          <div className="w-[350px] bg-white p-6 rounded-sm hover:bg-gray-100 hover:shadow-md transition cursor-pointer flex flex-col gap-2">
            <MapPin className="w-6 h-6 text-blue-500" />
            <h1 className="font-semibold text-[15px]">Localização</h1>
            <p className="text-gray-500 text-sm">
              Gerencie onde você pode ser encontrado
            </p>
          </div>
          <div className="w-[350px] bg-white p-6 rounded-sm hover:bg-gray-100 hover:shadow-md transition cursor-pointer flex flex-col gap-2">
            <LockKeyhole className="w-6 h-6 text-blue-500" />
            <h1 className="font-semibold text-[15px]">Privacidade</h1>
            <p className="text-gray-500 text-sm">
              Gerencie suas preferências de privacidade
            </p>
          </div>
          <div className="w-[350px] bg-white p-6 rounded-sm hover:bg-gray-100 hover:shadow-md transition cursor-pointer flex flex-col gap-2">
            <CreditCard className="w-6 h-6 text-blue-500" />
            <h1 className="font-semibold text-[15px]">Cartões</h1>
            <p className="text-gray-500 text-sm">
              Gerencie seus cartões de pagamento
            </p>
          </div>
          <div className="w-[350px] bg-white p-6 rounded-sm hover:bg-gray-100 hover:shadow-md transition cursor-pointer flex flex-col gap-2">
            <MessageSquare className="w-6 h-6 text-blue-500" />
            <h1 className="font-semibold text-[15px]">Comunicação</h1>
            <p className="text-gray-500 text-sm">
              Gerencie suas preferências de comunicação
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
