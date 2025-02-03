type Button = {
  name: string;
};

export default function PrimaryButton({ name }: Button) {
  return (
    <>
      <button className="border-opacity-50 rounded border border-neutral-100 bg-black px-10 py-2 font-bold text-white hover:bg-slate-950">
        {name}
      </button>
    </>
  );
}
