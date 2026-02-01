import PDFIcon from "../images/files/PDF_32.png";
import CSVIcon from "../images/files/csv-icon-32pixels.png";
import ExcelIcon from "../images/files/excel-icon-32pixels.png";
import FileIcon from "../images/files/file-icon-32pixels.png";
import ImageIcon from "../images/files/image-icon-32pixels.png";

const fileTypeIcons = {
  // PDF files
  "application/pdf": PDFIcon,

  // Excel/Spreadsheet files
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    ExcelIcon,
  "application/vnd.ms-excel": ExcelIcon,
  "application/vnd.oasis.opendocument.spreadsheet": ExcelIcon,
  "text/csv": CSVIcon,

  // Image files
  "image/png": ImageIcon,
  "image/jpeg": ImageIcon,
  "image/jpg": ImageIcon,
  "image/gif": ImageIcon,
  "image/webp": ImageIcon,
  "image/svg+xml": ImageIcon,
  "image/bmp": ImageIcon,
  "image/tiff": ImageIcon,
  "image/avif": ImageIcon,
  "image/apng": ImageIcon,
  "image/vnd.microsoft.icon": ImageIcon,
};

export const GetIconForFiletype = fileType => {
  return fileTypeIcons[fileType] || FileIcon;
};
