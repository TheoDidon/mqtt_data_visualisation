interface Props {
  name: string;
}

function Captor({ name }: Props) {
  return (
    <div className="captor-item flex justify-center items-center bg-white p-4 max-h-20 hover:border border-gray-600">
      {name}
    </div>
  );
}

export default Captor;
