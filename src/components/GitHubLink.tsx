import { AiFillGithub } from "react-icons/ai";

interface Props {
  href: string;
}

export default function GitHubLink({ href }: Props) {
  return (
    <a target="_blank" href={href}>
      <AiFillGithub /> Code
    </a>
  );
}
