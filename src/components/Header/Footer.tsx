import { CreditCard, Truck, ShieldCheck } from "lucide-react";

export default function Footer() {
  const itens = [
    {
      icone: CreditCard,
      titulo: "Escolha como pagar",
      descricao:
        "Pague com cartão, boleto ou Pix. Parcele em até 12x sem cartão com a Linha de Crédito.",
    },
    {
      icone: Truck,
      titulo: "Frete grátis na primeira compra",
      descricao: "Aproveite este benefício em milhões de produtos.",
    },
    {
      icone: ShieldCheck,
      titulo: "Segurança, do início ao fim",
      descricao:
        "Não gostou do que comprou? Devolva! Você está sempre protegido.",
    },
  ];

  return (
    <footer className="w-full border-t border-gray-200 bg-white" id="contato">
      <div className="flex justify-around items-start flex-wrap gap-5 px-10 py-10">
        {itens.map((item, index) => {
          const Icone = item.icone;
          return (
            <div key={index} className="flex flex-col items-center gap-3 max-w-xs text-center">
              <div className="bg-blue-50 p-4 rounded-full">
                <Icone className="w-7 h-7 text-blue-500" />
              </div>
              <h2 className="text-[16px] font-semibold">{item.titulo}</h2>
              <p className="text-gray-500 text-[14px]">{item.descricao}</p>
            </div>
          );
        })}
      </div>
      <div className="border-t bg-blue-500 py-5 text-center text-sm text-white font-bold">
        © {new Date().getFullYear()} Intelifones. Todos os direitos reservados.
      </div>
    </footer>
  );
}
