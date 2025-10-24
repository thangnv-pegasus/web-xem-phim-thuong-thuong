import { Button, Grid, Menu } from "@chakra-ui/react";
import { Link } from "react-router";
import { v4 } from "uuid";

interface IProps {
  title: string;
  menuItems: {
    path: string;
    label: string;
  }[];
}
export default function MenuDropdown({
  title = "Menu Title",
  menuItems = [],
}: IProps) {
  return (
    <Menu.Root positioning={{ placement: "bottom-start" }}>
      <Menu.Trigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-15 block border-none leading-15 px-4 font-medium text-white hover:bg-transparent focus-within:outline-none"
        >
          {title}
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Grid templateColumns="repeat(3, 1fr)" gapX={4}>
            {menuItems.map((item) => {
              return (
                <Menu.Item
                  value={item.path}
                  key={v4()}
                  className="focus-within:outline-none focus:outline-none"
                  tabIndex={0}
                >
                  <Link to={item.path} className="block leading-8 w-full">{item.label}</Link>
                </Menu.Item>
              );
            })}
          </Grid>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}
