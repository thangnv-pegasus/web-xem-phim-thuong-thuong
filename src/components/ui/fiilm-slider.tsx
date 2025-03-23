import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { IFilm } from "../../types";
import Film from "./film-item";

interface IProps {
  films: IFilm[];
  perView?: number;
  spaceBetween?: number;
}

export default function FilmSlider({
  films,
  perView = 2,
  spaceBetween = 30,
}: IProps) {
  return (
    <>
      <Swiper
        slidesPerView={perView}
        spaceBetween={spaceBetween}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {films.map((item, index) => (
          <SwiperSlide key={`film-slide-${index}`}>
            <Film film={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
