// @ts-nocheck
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { IFilm } from "../../types";
import Film from "./film-item-card";
import { Suspense } from "react";
import SkeletonFilm from "../base/film-skeleton";

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
            <Suspense fallback={<SkeletonFilm />}>
              <Film film={item} />
            </Suspense>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
