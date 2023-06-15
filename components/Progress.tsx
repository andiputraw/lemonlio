interface Props {
  highlight: string[];
  logo: string;
}

export function Progress(props: Props) {
  return (
    <div class="flex justify-center">
      <img class="h-20 w-20  mr-6" src={props.logo} alt="nodejs icon"></img>
      <div class="grid grid-cols-2 gap-1 w-48">
        {props.highlight.map((s) => (
          <p class="text-slate-700 font-sans badge bg-cyan-300 outline-none ">
            {s}
          </p>
        ))}
      </div>
    </div>
  );
}
