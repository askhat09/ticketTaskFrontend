export const formatTransfer = (stops: number): string => {
  switch (stops) {
    case 0:
      return "Без пересадок";
    case 1:
      return "1 пересадка";
    case 2:
    case 3:
      return `${stops} пересадки`;
    default:
      return `${stops} пересадок`;
  }
};
