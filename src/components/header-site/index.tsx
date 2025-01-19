import { Box, Link, Popover } from "@mui/material";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
interface PropsType {
    onToggle: () => void
}
export default function HeaderSite(props: PropsType) {
    const { onToggle } = props
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [hideDropDown, setHideDropDown] = useState(true);

    const user = { name: "علی", lastName: "محمدی" }; // نمونه داده
    const onShowDropDown = () => setHideDropDown(!hideDropDown);
    const onPopoverClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(!open);
    };
    const onClosePopover = () => {
        setAnchorEl(null);
        setOpen(false);
    };
    const onEdit = () => alert("ویرایش اطلاعات");
    const onLogout = () => alert("خروج از حساب کاربری");

    return (
        <Box>
            <Box
                sx={{ p: 2 }}
                className=" rounded flex justify-between bg-white font-black items-center h-16"
                style={{ boxShadow: "0px 1px 2px 0px rgb(21 27 38 / 15%)" }}
            >
                <Icon onClick={onToggle} icon="material-symbols:menu-rounded" width="24" height="24" />
                <div className=" hidden">سایت تستی</div>
                <div className=" hidden">فروشگاه دوربین</div>
                <div>
                    <div
                        id="dropdownDefault"
                        onClick={onShowDropDown}
                        data-dropdown-toggle="dropdown"
                        className="px-4 cursor-pointer"
                    >
                        <span
                            className="font-black"
                            aria-describedby={open ? "simple-popover" : undefined}
                            onClick={onPopoverClick}
                        >
                            <span>
                                <Icon
                                    icon="mdi:chevron-down"
                                    className="inline-block"
                                    style={{ fontSize: "20px" }}
                                />
                                <span className="font-black"> {user.name}</span>
                                <span> {user.lastName} </span>
                            </span>
                        </span>

                        <Popover
                            id={open ? "simple-popover" : undefined}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={onClosePopover}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                        >
                            <div className="py-4">
                                <div
                                    className="text-right cursor-pointer pb-4 px-3"
                                    onClick={onEdit}
                                >
                                    <Link>
                                        <span className="font-black">ویرایش</span>
                                        <span className="px-2">
                                            <Icon
                                                icon="mdi:pencil-outline"
                                                style={{ fontSize: "20px" }}
                                            />
                                        </span>
                                    </Link>
                                </div>
                                <div
                                    className="text-center cursor-pointer"
                                    onClick={onLogout}
                                >
                                    <span className="px-2">خروج</span>
                                    <span>
                                        <Icon
                                            icon="mdi:logout"
                                            style={{ fontSize: "20px" }}
                                        />
                                    </span>
                                </div>
                            </div>
                        </Popover>
                    </div>
                    <div
                        className={`${hideDropDown ? "hidden" : ""}`}
                    >
                        {/* <DropDown items={items} setting={setting} /> */}
                    </div>
                </div>
            </Box>
        </Box>
    );
}
