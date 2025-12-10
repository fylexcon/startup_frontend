import React from "react";
import {
  PartnerSection,
  PartnerTitle,
  PartnerGrid,
  PartnerLogo,
} from "./styles";

// --- TÜM PARTNER RESİMLERİ ---
import Aha1 from "../../../assets/aha1.jpg";
import Aha2 from "../../../assets/aha2.jpg";
import Aha3 from "../../../assets/aha3.jpg";
import Aha4 from "../../../assets/aha4.png"; // PNG olduğuna dikkat
import Aha5 from "../../../assets/aha5.jpg";
import Aha6 from "../../../assets/aha6.png"; // PNG

const PartnerData = [
  { image: Aha1, name: "Partner 1" },
  { image: Aha2, name: "Partner 2" },
  { image: Aha3, name: "Partner 3" },
  { image: Aha4, name: "Partner 4" },
  { image: Aha5, name: "Partner 5" },
  { image: Aha6, name: "Partner 6" },
];

export default function Partners() {
  return (
    <PartnerSection>
      <PartnerTitle>Партнеры (Partnerlerimiz)</PartnerTitle>
      <PartnerGrid>
        {PartnerData.map((item, index) => (
          <PartnerLogo
            key={index}
            src={item.image}
            alt={item.name}
            loading="lazy"
          />
        ))}
      </PartnerGrid>
    </PartnerSection>
  );
}
