import axios from "axios";
import {
  CreditCard,
  LockKeyhole,
  MapPin,
  MessageSquare,
  Shield,
  UserRoundPen,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function PerfilUsuario({ setPaginaAtiva }) {
  const [usuario, setUsuario] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/vendedores")
      .then((response) => setUsuario(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex flex-col flex-1 bg-gray-100 items-center py-10 px-30 flex-wrap">
      <div className="w-full p-5 flex flex-row items-center">
        <img
          src="vetor.png"
          className="w-20 h-20 rounded-full bg-amber-100 object-cover"
        />
        <div className="flex flex-col gap-2 ml-5">
          <h1 className="font-bold text-[22px]">Cleiton Souza Paixao</h1>
          <p className="text-gray-500 text-[15px]">email@example.com</p>
        </div>
      </div>
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
  );
}
