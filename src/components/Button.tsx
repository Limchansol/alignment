type Props = {
  text: string;
  onClick: () => void;
};

export default function Button({ text, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-full border-2 border-neutral-300 hover:bg-neutral-200 active:bg-neutral-300 cursor-pointer text-3xl rounded-sm py-5 px-16"
    >
      {text}
    </button>
  );
}
