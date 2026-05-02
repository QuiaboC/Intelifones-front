import { Cat } from "lucide-react";

export default function Footer() {
  return (
    <div className="w-full flex justify-around items-center p-10 flex-wrap">
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
          Você não gostou do que comprou? Devolva! No Mercado Livre não há nada
          que você não possa fazer, porque você está sempre protegido.
        </p>
      </div>
    </div>
  );
}
