import { convertObjectToArrayNavLink } from ".";

const FILM_GENRES = {
  ACTION: {
    title: 'Hành động',
    slug: "hanh-dong"
  },
  ADVENTURE: {
    title: 'Phiêu lưu',
    slug: "phieu-luu"
  },
  ANIME: {
    title: 'Hoạt hình',
    slug: "hoat-hinh"
  },
  COMEDY: {
    title: 'Hài',
    slug: "hai"
  },
  THRILLER: {
    title: 'Hình sự',
    slug: "hinh-su"
  },
  DOCUMENTARY: {
    title: 'Tài liệu',
    slug: 'tai-lieu'
  },
  DRAMA: {
    title: 'Chính kịch',
    slug: 'chinh-kich'
  },
  FAMILY: {
    title: 'Gia đình',
    slug: 'gia-dinh'
  },
  FANTASY: {
    title: 'Giả tưởng',
    slug: 'gia-tuong'
  },
  HISTORICAL: {
    title: 'Lịch sử',
    slug: 'lich-su'
  },
  HORROR: {
    title: 'Kinh dị',
    slug: 'kinh-di'
  },
  MUSIC: {
    title: 'Phim nhạc',
    slug: 'phim-nhac'
  },
  MYSTERIOUS: {
    title: 'Bí ẩn',
    slug: 'bi-an'
  },
  ROMANTIC: {
    title: 'Lãng mạn',
    slug: 'lang-man'
  },
  SCIENCE_FICTION: {
    title: 'Khoa học viễn tưởng',
    slug: 'khoa-hoc-vien-tuong'
  },
  SHY: {
    title: 'Gay cấn',
    slug: 'gay-can'
  },
  WAR: {
    title: 'Chiến tranh',
    slug: 'chien-tranh'
  },
  MENTALITY: {
    title: 'Tâm lý',
    slug: 'tam-ly'
  },
  AFFECTION: {
    title: 'Tình cảm',
    slug: 'tinh-cam'
  },
  ANTIQUE: {
    title: 'Cổ trang',
    slug: 'co-trang'
  },
  WESTERN: {
    title: 'Miền Tây',
    slug: 'mien-tay'
  },
  MOVIE_18: {
    title: 'Phim 18+',
    slug: 'phim-18'
  }
};

const NAV_LINK = {
  NEW_FILMS: {
    title: "Phim mới",
    slug: "phim-moi"
  },
  DRAMA_FILMS: {
    title: 'Phim bộ',
    slug: "phim-bo"
  },
  FEATURE_FILMS: {
    title: 'Phim lẻ',
    slug: 'phim-le'
  },
  CINEMA_FILMS: {
    title: 'Phim đang chiếu',
    slug: 'phim-dang-chieu'
  },
  TV_SHOWS: {
    title: 'TV Shows',
    slug: 'tv-shows'
  },
  GENRES: {
    title: 'Thể loại',
    slug: 'the-loai',
    child: convertObjectToArrayNavLink(FILM_GENRES)
  }
};

const COUNTRIES = {
  AMERICA: "au-my",
  UNITED_KINGDOM: "anh",
  CHINA: "trung-quoc",
  INDONESIA: "indonesia",
  VIETNAM: "viet-nam",
  FRANCE: "phap",
  HONG_KONG: "hong-kong",
  SOUTH_KOREA: "han-quoc",
  JAPAN: "nhat-ban",
  THAILAND: "thai-lan",
  TAIWAN: "dai-loan",
  RUSSIA: "nga",
  NETHERLANDS: "ha-lan",
  PHILIPPINES: "philippines",
  INDIA: "an-do",
  OTHER_COUNTRIES: "quoc-gia-khac",
};

export { NAV_LINK, FILM_GENRES, COUNTRIES };
