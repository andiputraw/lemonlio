interface Props {
  value: number;
  logo: string;
}

export function Progress(props: Props) {
  const [color, text] = props.value < 40
    ? ["danger", "Not Good"]
    : props.value < 70
    ? ["warning", "Decent"]
    : ["success", "Good"];

  const progress = `progress w-40 mt-5 progress-${color}`;

  return (
    <div class="flex justify-center">
      <img class="h-20 w-20  mr-6" src={props.logo} alt="nodejs icon"></img>
      <div>
        <progress
          className={progress}
          value={props.value}
          max="100"
        >
        </progress>
        <p class="text-black text-2xl font-sans font-semibold">
          {text}
        </p>
      </div>
    </div>
  );
}
