import { Avatar } from '@mui/material';
import { ReactNode, useRef } from 'react'
import style from './card.css'
interface PropsType {
    showHeader?: boolean,
    headerTitle?: string,
    showFooter?: boolean,
    footer?: any,
    children?: ReactNode,
    className?: string,
    avatar?: {
        title: string
        alt: string,
        src: string,

    },
    onChangeFile?: () => void,
    fileUpload?: boolean,
}
export default function Card(props: PropsType) {
    const {
        showHeader = true,
        headerTitle,
        showFooter = false,
        footer,
        children,
        className,
        avatar,
        onChangeFile,
        fileUpload = false,
    } = props

    const fileInputRef = useRef();
    const handleClickInputFile = () => {
        // fileInputRef.current
    };
    return (
        <div
            className={` relative  rounded   bg-white     ${className}  `}
            style={{
                boxShadow: "0px 1px 2px 0px rgb(21 27 38 / 15%)",
                border: "1px solid #E4E7EB",
            }}
        >
            <div>
                {showHeader && (
                    <>
                        <div
                            className={`p-2 text-right text-lg font-black  bg-blue-200 text-whites `}
                        >
                            <span className=" font-black text-black ">{headerTitle}</span>
                        </div>
                        <div className="border w-full  "></div>
                    </>
                )}
                <div
                    className="  w-full   absolute w-100 flex  items-center"
                    style={{ top: "-40px" }}
                >
                    {avatar && (
                        <div className="flex-col w-full text-center">
                            <span
                                className=" rounded-full cursor-pointer"
                                onClick={handleClickInputFile}
                            >
                                <Avatar
                                    alt={avatar?.alt}
                                    src={avatar?.src}
                                    sx={{ width: 70, height: 70 }}
                                    className="inline-block"
                                    style={{ border: "5px solid  white" }}
                                >
                                    {!avatar?.src && fileUpload && (
                                        <>
                                            {!avatar?.src && (
                                                <div
                                                    onClick={handleClickInputFile}
                                                    className="w-100 h-100 font-black flex items-center"
                                                >
                                                    {/* <CameraAltIcon className="w-100 h-75 mt-4 mr-4" /> */}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </Avatar>
                                {fileUpload && (
                                    <input
                                        type="file"
                                        name="myImage"
                                        onChange={onChangeFile}
                                    // className={style.file_input}
                                    // ref={fileInputRef}
                                    />
                                )}
                            </span>
                            {avatar?.title && (
                                <div className="text-center  text-gray-500  ">
                                    {avatar?.title}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className={`${avatar && " pt-14"}`}>
                    <div className=" text-right p-3  my-4  ">{children}</div>
                </div>
                {showFooter && (
                    <>
                        {/* <div className="border w-full mt-5"></div> */}
                        <div className="p-3 text-left flex justify-end">{footer()}</div>
                    </>
                )}
            </div>
        </div>
    )
}
