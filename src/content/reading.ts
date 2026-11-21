import { images, type Img } from "./images";

/** The "Currently reading" strip on the home page. Update these when you start a new book. */
export type Reading = {
  title: string;
  author: string;
  /** Page you're on */
  page: number;
  /** Total pages */
  pages: number;
  cover: Img;
};

export const reading: Reading = {
  title: "The List",
  author: "Yomi Adegoke",
  page: 142,
  pages: 320,
  cover: images.bookTheList,
};
