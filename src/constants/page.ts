import { convertObjectToArrayNavLink } from ".";

const FILM_GENRES = {
  ACTION: {
    title: "Hành động",
    slug: "hanh-dong",
  },
  ADVENTURE: {
    title: "Phiêu lưu",
    slug: "phieu-luu",
  },
  ANIME: {
    title: "Hoạt hình",
    slug: "hoat-hinh",
  },
  COMEDY: {
    title: "Hài",
    slug: "hai",
  },
  THRILLER: {
    title: "Hình sự",
    slug: "hinh-su",
  },
  DOCUMENTARY: {
    title: "Tài liệu",
    slug: "tai-lieu",
  },
  DRAMA: {
    title: "Chính kịch",
    slug: "chinh-kich",
  },
  FAMILY: {
    title: "Gia đình",
    slug: "gia-dinh",
  },
  FANTASY: {
    title: "Giả tưởng",
    slug: "gia-tuong",
  },
  HISTORICAL: {
    title: "Lịch sử",
    slug: "lich-su",
  },
  HORROR: {
    title: "Kinh dị",
    slug: "kinh-di",
  },
  MUSIC: {
    title: "Phim nhạc",
    slug: "phim-nhac",
  },
  MYSTERIOUS: {
    title: "Bí ẩn",
    slug: "bi-an",
  },
  ROMANTIC: {
    title: "Lãng mạn",
    slug: "lang-man",
  },
  SCIENCE_FICTION: {
    title: "Khoa học viễn tưởng",
    slug: "khoa-hoc-vien-tuong",
  },
  SHY: {
    title: "Gay cấn",
    slug: "gay-can",
  },
  WAR: {
    title: "Chiến tranh",
    slug: "chien-tranh",
  },
  MENTALITY: {
    title: "Tâm lý",
    slug: "tam-ly",
  },
  AFFECTION: {
    title: "Tình cảm",
    slug: "tinh-cam",
  },
  ANTIQUE: {
    title: "Cổ trang",
    slug: "co-trang",
  },
  WESTERN: {
    title: "Miền Tây",
    slug: "mien-tay",
  },
  MOVIE_18: {
    title: "Phim 18+",
    slug: "phim-18",
  },
};

const COUNTRIES = {
  AMERICA: {
    title: "Mỹ",
    slug: "au-my",
  },
  UNITED_KINGDOM: {
    title: "Anh",
    slug: "anh",
  },
  CHINA: {
    title: "Trung Quốc",
    slug: "trung-quoc",
  },
  INDONESIA: {
    title: "Indonesia",
    slug: "indonesia",
  },
  VIETNAM: {
    title: "Việt Nam",
    slug: "viet-nam",
  },
  FRANCE: {
    title: "Pháp",
    slug: "phap",
  },
  HONG_KONG: {
    title: "Hồng Kông",
    slug: "hong-kong",
  },
  SOUTH_KOREA: {
    title: "Hàn Quốc",
    slug: "han-quoc",
  },
  JAPAN: {
    title: "Nhật Bản",
    slug: "nhat-ban",
  },
  THAILAND: {
    title: "Thái Lan",
    slug: "thai-lan",
  },
  TAIWAN: {
    title: "Đài Loan",
    slug: "dai-loan",
  },
  RUSSIA: {
    title: "Nga",
    slug: "nga",
  },
  NETHERLANDS: {
    title: "Hà Lan",
    slug: "ha-lan",
  },
  PHILIPPINES: {
    title: "Philippines",
    slug: "philippines",
  },
  INDIA: {
    title: "Ấn Độ",
    slug: "an-do",
  },
  OTHER_COUNTRIES: {
    title: "Quốc gia khác",
    slug: "quoc-gia-khac",
  },
};

interface INavLinkItem {
  title?: string;
  label?: string;
  slug: string;
  child?: {
    path: string;
    label: string;
    slug: string;
  }[];
}
interface INavLink {
  [key: string]: INavLinkItem;
}
const NAV_LINK: INavLink = {
  NEW_FILMS: {
    title: "Phim mới",
    slug: "phim-moi",
  },
  DRAMA_FILMS: {
    title: "Phim bộ",
    slug: "phim-bo",
  },
  FEATURE_FILMS: {
    title: "Phim lẻ",
    slug: "phim-le",
  },
  GENRES: {
    title: "Thể loại",
    slug: "the-loai",
    child: convertObjectToArrayNavLink(FILM_GENRES),
  },
  COUNTRIES: {
    title: "Quốc gia",
    slug: "quoc-gia",
    child: convertObjectToArrayNavLink(COUNTRIES),
  },
};

export { NAV_LINK, FILM_GENRES, COUNTRIES };
