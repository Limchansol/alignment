type Props = {
  title: string;
  value?: string;
};

export default function Text({ title, value }: Props) {
  return (
    <div className="font-bold text-2xl">
      {title}: {value}
    </div>
  );
}
