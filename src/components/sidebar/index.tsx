import { useState } from "react";
import {
    Drawer,
    Box,
    IconButton,
    Typography,
    List,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { items } from "../../config/sibar-menu.config";
import SidebarItem from "./sidebarItem";

const Sidebar = () => {
    ;
    const [width] = useState<number>(240)

    const [isOpen, setIsOpen] = useState(true);


    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }
    return (

        <Drawer
            sx={{

                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
            open={isOpen}
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
                    <Icon
                        icon={isOpen ? "mdi:chevron-right" : "mdi:chevron-left"} // اصلاح جهت آیکون
                    />
                </IconButton>
            </Box>

            <List >
                {items.map((item, index) => (
                    <SidebarItem key={index} item={item} isOpen={true} />
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
