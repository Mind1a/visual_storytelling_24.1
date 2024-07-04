import {
  animalsData,
  birdsData,
  familyData,
  objectsData,
  plantsData,
  professionsData,
} from "./sentence";

export const categories = [
  {
    id: 1,
    title: "პროფესიები",
    name: "professions",
    img: "/images/category/professions.png",
    data: professionsData,
  },
  {
    id: 2,
    title: "ოჯახი",
    name: "family",
    img: "/images/category/family.png",
    data: familyData,
  },
  {
    id: 3,
    title: "ცხოველები",
    name: "animals",
    img: "/images/category/animals.png",
    data: animalsData,
  },
  {
    id: 4,
    title: "ფრინველები",
    name: "birds",
    img: "/images/category/birds.png",
    data: birdsData,
  },
  {
    id: 5,
    title: "მცენარეები",
    name: "plants",
    img: "/images/category/plants.png",
    data: plantsData,
  },
  {
    id: 6,
    title: "საგნები",
    name: "objects",
    img: "/images/category/objects.png",
    data: objectsData,
  },
];
