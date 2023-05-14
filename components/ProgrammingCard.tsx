interface Props {
  logo: string;
  heading: string;
  p1: string;
  p2?: string;
}

export function ProgrammingCard(props: Props) {
  return (
    <div className="card sm:card-side bg-slate-100">
      <figure>
        <img
          className="w-20 h-20 sm:w-40 sm:h-40"
          src={props.logo}
          alt={props.heading}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-black text-3xl">{props.heading}</h2>
        <p class="text-black">
          {props.p1}
        </p>
        <p class="text-black">{props.p2}</p>
      </div>
    </div>
  );
}
