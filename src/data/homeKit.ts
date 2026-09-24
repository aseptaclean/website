// Homepage kit v1.2: exact copy from 01-APPROVED-COPY.md; URLs/values from existing data.
import { launchServiceLinks } from "./launchArchitecture";
import { assessment, campaignSituations } from "./assessment";
import homeHoarding from "../assets/aseptaclean/public-pages/home/04-home-service-hoarding.webp";
import homeDetailed from "../assets/aseptaclean/public-pages/home/06-home-service-detailed-cleaning.webp";
import homeTrauma from "../assets/aseptaclean/public-pages/home/07-home-service-trauma.webp";
import homeRodent from "../assets/aseptaclean/public-pages/home/08-home-service-rodent.webp";
import homeEstate from "../assets/aseptaclean/public-pages/home/09-home-service-estate.webp";
const descriptions = [
  "Sorting, clearing, and cleanup for rooms filled with accumulated belongings.",
  "Cleaning for heavy dirt, grease, and buildup in neglected properties.",
  "Detailed cleaning of kitchens, bathrooms, and other living spaces.",
  "Cleanup of blood and bodily fluids after a death, injury, or traumatic event.",
  "Removal of droppings and waste, with cleanup of affected areas.",
  "Sorting and clearing belongings after a loss, with agreed inventory and documentation.",
];
const assignedImages = [
  homeHoarding,
  undefined,
  homeDetailed,
  homeTrauma,
  homeRodent,
  homeEstate,
];
const assignedAlts = [
  "Living room heavily filled with accumulated household belongings.",
  undefined,
  "Black-gloved hand cleaning the edge of a kitchen counter.",
  "Technician in protective clothing working on an interior floor.",
  "Gnawed storage carton and rodent droppings on shelving.",
  "Black-gloved hands handling family keepsakes and albums.",
];
export const homeKitServices = launchServiceLinks.map((service, index) => ({
  ...service,
  label: index === 4 ? "Rodent & Animal Waste Cleanup" : service.label,
  description: descriptions[index],
  photo: `p${index + 3}`,
  image: assignedImages[index],
  imageAlt: assignedAlts[index],
  value:
    index === 5
      ? campaignSituations[0].value
      : assessment.situations[index]!.value,
}));
