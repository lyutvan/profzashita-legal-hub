/**
 * Legal Images Library
 * 
 * High-quality thematic images for legal website
 * - Court columns, justice scales, courtroom, law books, etc.
 * - Horizontal and vertical variants
 * - No faces, no brands
 * - Proper alt text for accessibility
 */

export interface LegalImage {
  src: string;
  alt: string;
  orientation: "horizontal" | "vertical";
  category: "architecture" | "symbols" | "interior" | "documents";
}

export const legalImages: Record<string, LegalImage> = {
  courtColumns: {
    src: "/src/assets/legal/court-columns.jpg",
    alt: "Классическая архитектура зала суда с мраморными колоннами",
    orientation: "horizontal",
    category: "architecture"
  },
  justiceScalesVertical: {
    src: "/src/assets/legal/justice-scales-vertical.jpg",
    alt: "Золотые весы правосудия Фемиды на тёмном фоне",
    orientation: "vertical",
    category: "symbols"
  },
  courtroomInterior: {
    src: "/src/assets/legal/courtroom-interior.jpg",
    alt: "Интерьер зала судебных заседаний с деревянной отделкой",
    orientation: "horizontal",
    category: "interior"
  },
  lawBooksHorizontal: {
    src: "/src/assets/legal/law-books-horizontal.jpg",
    alt: "Коллекция юридических книг и кодексов в кожаном переплёте",
    orientation: "horizontal",
    category: "documents"
  },
  legalDocumentVertical: {
    src: "/src/assets/legal/legal-document-vertical.jpg",
    alt: "Открытый кодекс законов с золотой печатью",
    orientation: "vertical",
    category: "documents"
  },
  sealStamp: {
    src: "/src/assets/legal/seal-stamp.jpg",
    alt: "Золотая юридическая печать на тёмно-синем фоне",
    orientation: "horizontal",
    category: "symbols"
  },
  gavelHorizontal: {
    src: "/src/assets/legal/gavel-horizontal.jpg",
    alt: "Судейский молоток на юридических документах",
    orientation: "horizontal",
    category: "symbols"
  },
  libraryVertical: {
    src: "/src/assets/legal/library-vertical.jpg",
    alt: "Ряды юридических книг на полках в библиотеке права",
    orientation: "vertical",
    category: "interior"
  },
  constitutionPages: {
    src: "/src/assets/legal/constitution-pages.jpg",
    alt: "Страницы конституционного права с юридическим текстом",
    orientation: "horizontal",
    category: "documents"
  },
  columnsVertical: {
    src: "/src/assets/legal/columns-vertical.jpg",
    alt: "Мраморные колонны здания правосудия, классическая архитектура",
    orientation: "vertical",
    category: "architecture"
  },
  contractDocuments: {
    src: "/src/assets/legal/contract-documents.jpg",
    alt: "Юридические договоры с золотой ручкой и печатью",
    orientation: "horizontal",
    category: "documents"
  },
  scalesDesk: {
    src: "/src/assets/legal/scales-desk.jpg",
    alt: "Весы правосудия на рабочем столе с юридическими книгами",
    orientation: "horizontal",
    category: "symbols"
  }
};

// Helper functions
export const getImagesByOrientation = (orientation: "horizontal" | "vertical") => {
  return Object.values(legalImages).filter(img => img.orientation === orientation);
};

export const getImagesByCategory = (category: LegalImage["category"]) => {
  return Object.values(legalImages).filter(img => img.category === category);
};

export const getRandomImage = (orientation?: "horizontal" | "vertical") => {
  const images = orientation 
    ? getImagesByOrientation(orientation)
    : Object.values(legalImages);
  return images[Math.floor(Math.random() * images.length)];
};