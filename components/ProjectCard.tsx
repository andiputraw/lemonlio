interface Props {
  logo: string;
  heading: string;
  p1: string;
  completed: boolean;
  link?: string;
  p2?: string;
}

export function ProjectCard(props: Props) {
  return (
    <div className="card bg-slate-100">
      <figure>
        <img
          className="w-20 h-20 sm:w-40 sm:h-40"
          src={props.logo}
          alt={props.heading}
          href={props.link}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-black text-3xl">
          <a href={props.link}>{props.heading}</a>
          <a href={props.link} class="badge badge-primary">Github</a>
        </h2>
        <p class="text-black">
          {props.p1}
        </p>

        <p class="text-black">{props.p2}</p>
        <div
          className={"badge badge-" + (props.completed ? "success" : "warning")}
        >
          {props.completed ? "Completed" : "On Progress"}
        </div>
      </div>
    </div>
  );
}
