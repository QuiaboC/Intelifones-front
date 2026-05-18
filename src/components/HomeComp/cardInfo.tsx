import { ShoppingBag, Tag, Sparkles, Package, UserPlus } from "lucide-react";

export default function CardInfo() {
  const categorias = [
    {
      label: "Mais vendidos",
      descricao: "Explore produtos que são tendência",
      href: "/produtos",
      icone: ShoppingBag,
    },
    {
      label: "Ofertas",
      descricao: "Aproveite os melhores preços",
      href: "/produtos",
      icone: Tag,
    },
    {
      label: "Novidades",
      descricao: "Confira os lançamentos da semana",
      href: "/produtos",
      icone: Sparkles,
    },
    {
      label: "Semi novos",
      descricao: "Produtos usados com qualidade",
      href: "/produtos",
      icone: Package,
    },
    {
      label: "Cadastre-se",
      descricao: "Encontre os melhores produtos com qualidade",
      href: "/produtos",
      icone: UserPlus,
    },
  ];

  return (
    <div className="w-full h-100 flex gap-10 items-center justify-center bg-white flex-wrap">
      {categorias.map((item, index) => {
        const Icone = item.icone;
        return (
          <div
            key={index}
            className="w-50 h-75 flex flex-col items-center p-3 justify-between rounded-xl bg-white shadow-blue-100 shadow border border-gray-200 hover:shadow-xl cursor-pointer transition-transform duration-300 hover:scale-110"
          >
            <label className="font-medium text-[18px]">{item.label}</label>
            <div className="bg-gray-100 rounded-full p-4 flex items-center justify-center">
              <Icone className="w-10 h-10 text-blue-400" />
            </div>
            <span className="text-sm text-gray-500 text-center">
              {item.descricao}
            </span>
            <a
              href={item.href}
              className="bg-blue-100 text-sm w-full text-center p-1 cursor-pointer rounded-sm text-blue-500"
            >
              {item.label}
            </a>
          </div>
        );
      })}
    </div>
  );
}
