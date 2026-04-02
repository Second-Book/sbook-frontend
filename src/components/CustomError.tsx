interface CustomErrorProps {
    text: string,
    onClick: () => unknown
}

const CustomError = (props: CustomErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 pt-5 text-lg">
      <p>{props.text}</p>
      <button className="px-4 py-2 bg-rose-800 text-white rounded-lg cursor-pointer" onClick={props.onClick}>Pokušajte ponovo</button>
    </div>
  )
}

export default CustomError