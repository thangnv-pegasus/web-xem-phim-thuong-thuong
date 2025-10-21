import { Box, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <footer className="py-10 border-t-1 border-solid border-[#ededed]">
      <Box className="w-320 mx-auto space-y-5 text-[#848484]">
        <Text>
          <strong>Xem phim online</strong> miễn phí chất lượng cao với phụ đề
          tiếng việt - thuyết minh - lồng tiếng. Mọt phim có nhiều thể loại phim
          phong phú, đặc sắc, nhiều bộ phim hay nhất - mới nhất.{" "}
        </Text>
        <Text>
          <strong>Website ThuongThuong</strong> với giao diện trực quan, thuận
          tiện, tốc độ tải nhanh, thường xuyên cập nhật các bộ phim mới hứa hẹn
          sẽ đem lại những trải nghiệm tốt cho người dùng.
        </Text>
      </Box>
    </footer>
  );
}
