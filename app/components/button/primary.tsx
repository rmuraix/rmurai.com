type Button = {
  name: string;
};

export default function PrimaryButton({ name }: Button) {
  return (
    <>
      <button className="rounded border border-neutral-100 border-opacity-50 bg-black px-10 py-2 font-bold text-white hover:bg-slate-950">
        {name}
      </button>
    </>
  );
}
