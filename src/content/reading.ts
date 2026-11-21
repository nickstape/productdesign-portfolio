import { images, type Img } from "./images";

/** The "Currently reading" strip and card on the home page. Update these when you start a new book. */
export type Reading = {
  title: string;
  author: string;
  /** Page you're on */
  page: number;
  totalPages: number;
  /** One line on why you picked it up */
  why: string;
  /** Earlier books, shown as "Previously: A · B" */
  previously: string[];
  cover: Img;
};

export const reading: Reading = {
  title: "The List",
  author: "Yomi Adegoke",
  page: 142,
  totalPages: 320,
  why: "Brilliantly written, intricately plotted and incredibly clever.",
  previously: ["The List of Suspicious Things"],
  cover: images.bookTheList,
};
