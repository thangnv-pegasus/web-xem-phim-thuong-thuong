import { Box, Flex, Grid } from "@chakra-ui/react";
import { IFilm } from "../../types";
import { Link } from "react-router";
import { FaAngleRight } from "react-icons/fa6";
import Film from "./film-item";
import { v4 as uuid } from "uuid";

interface IProps {
  title: string;
  films: IFilm[];
  path: string;
}

export default function GridItems({ title, films = [], path = "#" }: IProps) {
  return (
    <Box className="w-full">
      <Flex
        justifyContent={"space-between"}
        className="py-5 items-center"
      >
        <h2 className="text-[#da966e] text-2xl uppercase font-semibold">
          {title}
        </h2>
        <Link
          to={path}
          className="flex items-center text-sm transition-all ease-linear hover:text-[#da966e]"
        >
          <span>xem tất cả</span>
          <span>
            <FaAngleRight />
          </span>
        </Link>
      </Flex>

      <Grid gridTemplateColumns={"repeat(5, 1fr)"} gap={5}>
        {films.map((item) => {
          return (
            <Film
              film={item}
              key={uuid()}
            />
          );
        })}
      </Grid>
    </Box>
  );
}
