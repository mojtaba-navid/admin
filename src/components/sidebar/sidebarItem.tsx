import React, { useState } from "react";
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, List } from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

interface SidebarItemProps {
    item: any;
    isOpen: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, isOpen }) => {
    const router = useNavigate()
    const [isExpanded, setIsExpanded] = useState(false);
    const hasChildren = item.children && item.children.length > 0;

    const handleExpand = () => {
        router({ pathname: item.path })
        if (hasChildren) {
            setIsExpanded(!isExpanded);
        }
    };
    return (
        <>
            <ListItem disablePadding>
                <ListItemButton onClick={handleExpand}>
                    <ListItemIcon>
                        {/* تغییر اندازه آیکون‌ها بر اساس وضعیت Sidebar */}

                        <Icon
                            icon={item.icon}
                            style={{
                                fontSize: isOpen ? "24px" : "40px", // افزایش اندازه آیکون هنگام بسته بودن Sidebar
                                transition: "font-size 0.3s ease-in-out",
                            }}
                        />
                    </ListItemIcon>
                    {isOpen && <ListItemText primary={item.label} />}
                    {hasChildren && isOpen && (isExpanded ? <Icon icon="mdi:expand-less" /> : <Icon icon="mdi:expand-more" />)}
                </ListItemButton>
            </ListItem>
            {hasChildren && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {item.children.map((child: any, index: number) => (
                            <SidebarItem key={index} item={child} isOpen={isOpen} />
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
};

export default SidebarItem;
