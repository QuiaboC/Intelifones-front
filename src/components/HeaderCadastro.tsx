import Link from "next/dist/client/link";

export default function HeaderCadastro() {
  return (
    <div className="sticky top-0 z-50 bg-blue-500 flex justify-items-start px-10 py-3 items-center shadow-md">
      <Link href="/home" className="ml-20 cursor-pointer">
        <h1 className="text-white text-[30px] font-semibold ">Intelifones</h1>
      </Link>
    </div>
  );
}
