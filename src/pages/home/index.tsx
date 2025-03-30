import { useEffect, useState } from "react";
import { getNewFilms } from "../../services";
import { IFilm } from "../../types";
import FilmSlider from "../../components/ui/fiilm-slider";

export default function HomePage() {
  const [newFilms, setNewFilms] = useState<IFilm[]>();

  const getNewFilmsData = async () => {
    const films = await getNewFilms(1);

    setNewFilms(films.items);
  };

  useEffect(() => {
    getNewFilmsData();
  }, []);

  return (
    <div className="w-320 mx-auto">
      <section className="py-4">
        <h2 className="text-[#da966e] text-2xl uppercase font-semibold pb-3">Phim đề cử</h2>
        {newFilms && <FilmSlider films={newFilms} perView={5}/>}
      </section>

      <section className="flex">
        <div>

        </div>
      </section>
    </div>
  );
}
