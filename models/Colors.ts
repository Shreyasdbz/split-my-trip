/** @format */

interface IColorTheme {
  id: string;
  title?: string;
  current?: boolean;
  bgColor: string;
  bgImage: string;
}

const ColorPalette: IColorTheme[] = [
  {
    id: "init-1",
    current: true,
    bgColor: "#f00f22",
    bgImage: "linear-gradient(to right, #f00f22, #ff009d",
  },
  {
    id: "init-2",
    current: true,
    bgColor: "#ff512f",
    bgImage: "linear-gradient(to right, #ff512f, #f09819)",
  },
  {
    id: "init-3",
    current: true,
    bgColor: "#fbb034",
    bgImage: "linear-gradient(to right, #fbb034 10%, #ffdd00 100%)",
  },
  {
    id: "init-4",
    current: true,
    bgColor: "#0bab64",
    bgImage: "linear-gradient(to right, #0bab64 10%, #3bb78f 100%)",
  },
  {
    id: "init-5",
    current: true,
    bgColor: "#028090",
    bgImage: "linear-gradient(to right, #028090 10%, #00bfb2 100%)",
  },
  {
    id: "init-6",
    current: true,
    bgColor: "#0083b0",
    bgImage: "linear-gradient(to right, #0083b0, #00b4db)",
  },
  {
    id: "init-7",
    current: true,
    bgColor: "#ff009d",
    bgImage: "linear-gradient(to right,#ff009d,#fc5296 50%)",
  },
  {
    id: "init-8",
    current: true,
    bgColor: "#4a00e0",
    bgImage: "linear-gradient(to right, #4a00e0, #8e2de2)",
  },
];

function getColorById(colorId: string) {
  let targetColor = ColorPalette[0];

  for (let i of ColorPalette) {
    if (i.id === colorId) {
      targetColor = i;
    }
  }
  return targetColor;
}

function getColorOptions(): IColorTheme[] {
  let colorOptions = [];
  for (let i of ColorPalette) {
    if (i.current) {
      colorOptions.push(i);
    }
  }
  return colorOptions;
}

export { getColorById, getColorOptions };
