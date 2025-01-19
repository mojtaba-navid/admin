import { ReactNode, useState } from "react";
import {
  Drawer,
  Box,
  IconButton,
  Typography,
  List,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { items } from "../../../config/sibar-menu.config";
import SidebarItem from "../../../components/sidebar/sidebarItem";

interface PropsType {
  children: ReactNode;
}

const Sidebar = (props: PropsType) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // تشخیص صفحه نمایش موبایل
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* هدر برای موبایل */}
      {isMobile && (
        <AppBar position="sticky" sx={{ backgroundColor: "primary.main" }}>
          <Toolbar>
            <IconButton onClick={toggleSidebar} >
              <Icon className="text-white" icon={isOpen ? "mdi:close" : "mdi:menu"} width={30} height={30} />
            </IconButton>
            <Typography variant="h6" sx={{ color: "white", flexGrow: 1 }}>
              منو
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* محتوا اصلی */}
      <Box
        sx={{
          transform: isMobile ? "none" : isOpen ? "translateX(240px)" : "translateX(80px)", // در حالت دسکتاپ حرکت به سمت راست 240px
          width: isMobile ? "100%" : isOpen ? "calc(100% - 240px)" : "calc(100% - 80px)", // در حالت دسکتاپ عرض کاهش می‌یابد
          transition: "transform 0.3s ease, width 0.3s ease", // انیمیشن برای حرکت و کاهش عرض در دسکتاپ
          padding: 2,
          overflow: "hidden", // جلوگیری از بیرون زدن محتوا
          marginTop: isMobile ? "56px" : "0", // برای موبایل هدر به محتوا فشار نیاورد
        }}
      >
        {props.children}
      </Box>

      <Drawer
        variant={isMobile ? "temporary" : "permanent"} // در موبایل temporary و در صفحات بزرگ permanent باشد
        anchor="left" // اطمینان از اینکه Drawer از سمت چپ باز می‌شود
        open={isOpen}
        onClose={isMobile ? () => setIsOpen(false) : undefined} // بستن Drawer در موبایل غیر فعال می‌شود
        sx={{
          position: "absolute", //imp
          left: "0 !important",
          top: 0,
          zIndex: 1200, // برای جلوگیری از همپوشانی با دیگر المان‌ها
          width: 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: !isOpen ? 80 : 240, // تغییر عرض Drawer بر اساس باز یا بسته بودن
            boxSizing: "border-box",
            transition: "width 0.3s ease", // انیمیشن برای باز شدن و بسته شدن
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: isOpen ? "space-between" : "center",
            alignItems: "center",
            p: 2,
            backgroundColor: "primary.main",
            color: "white",
          }}
        >
          {isOpen && <Typography variant="h6">منو</Typography>}
          <IconButton onClick={toggleSidebar} color="inherit">
            <Icon icon={isOpen ? "mdi:chevron-left" : "mdi:chevron-right"} />
          </IconButton>
        </Box>

        <List>
          {items.map((item, index) => (
            <SidebarItem key={index} item={item} isOpen={isOpen} />
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;
