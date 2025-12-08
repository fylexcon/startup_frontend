import React from "react";
import { CardLeader, NameSubitle, NameTitle } from "./styles";

interface LeaderCardProps {
  src: string;
  title: string;
  subtitle: string;
}

export default function LeaderCard({ src, title, subtitle }: LeaderCardProps) {
  return (
    <CardLeader>
      <img
        src={src}
        alt={title}
        style={{
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          objectFit: "cover",
          margin: "0 auto",
          display: "block",
        }}
      />
      <NameTitle>{title}</NameTitle>
      <NameSubitle>{subtitle}</NameSubitle>
    </CardLeader>
  );
}
