import { RiOrganizationChart } from "react-icons/ri";

interface Props {
  href: string;
}

export default function StatelyVizLink({ href }: Props) {
  return (
    <a target="_blank" href={href}>
      <RiOrganizationChart /> Viz
    </a>
  );
}
