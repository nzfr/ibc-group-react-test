import React, {useCallback, useEffect, useMemo, useState} from "react";
import Topbar from "./Topbar";
import {Table} from "../../Components";
import {useDispatch, useSelector} from "react-redux";
import {getClients, getEmployeeClients} from "../../redux/action/user";
import {getUserReducer} from "../../redux/reducer/user";
import {Tooltip} from "@mui/material";
import {PiTrashLight} from "react-icons/pi";
import {CiEdit} from "react-icons/ci";
import Filter from "./Filter";
import User from "./User";
import DeleteClient from "./Delete";
import EditEmployee from "./Edit";

const blue = {
    100: "#DAECFF",
    200: "#99CCF3",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
};

const grey = {
    50: "#f6f8fa",
    100: "#eaeef2",
    200: "#d0d7de",
    300: "#afb8c1",
    400: "#8c959f",
    500: "#6e7781",
    600: "#57606a",
    700: "#424a53",
    800: "#32383f",
    900: "#24292f",
};


const Clients = () => {
    ////////////////////////////////////// VARIABLES /////////////////////////////////////
    const dispatch = useDispatch();
    const {clients, isFetching, error, loggedUser} = useSelector((state) => state.user);

    ////////////////////////////////////// FUNCTIONS (stable) //////////////////////////////////////////
    const handleOpenEditModal = useCallback((employee) => {
        dispatch(getUserReducer(employee));
        setOpenEditModal(true);
    }, [dispatch]);

    const handleOpenDeleteModal = useCallback((userId) => {
        setSelectedUserId(userId);
        setOpenDeleteModal(true);
    }, []);

    const columns = useMemo(() => [
        {
            field: "uid",
            headerName: "ID",
            width: 70,
            headerClassName: "super-app-theme--header",
            renderCell: (params) => (
                <Tooltip title={""}>
                    <span className="font-primary capitalize">{params.row.uid}</span>
                </Tooltip>
            ),
        },
        {
            headerClassName: "super-app-theme--header",
            field: "Client Name",
            headerName: "Client Name",
            width: "200",
            renderCell: (params) => (
                <div className="capitalize text-[#20aee3] font-primary hover:text-[#007bff] cursor-pointer font-light">
                    {params.row.firstName} {params.row.lastName}
                </div>
            ),
        },
        {
            field: "username",
            headerName: "Client Username",
            headerClassName: "super-app-theme--header",
            width: "200",
            renderCell: (params) => <div className="capitalize font-primary">{params.row.username}</div>,
        },
        {
            field: "phone",
            headerName: "Phone",
            headerClassName: "super-app-theme--header",
            width: "150",
            renderCell: (params) => <div className="font-primary">{params.row.phone}</div>,
        },
        {
            field: "email",
            headerName: "Email",
            headerClassName: "super-app-theme--header",
            width: "220",
            renderCell: (params) => <div className="font-primary">{params.row?.email}</div>,
        },
        {
            field: "action",
            headerName: "Action",
            width: 180,
            headerClassName: "super-app-theme--header",
            renderCell: (params) => (
                <div className="flex gap-[10px]">
                    {loggedUser?.role !== 'employee' && (
                        <>
                            <Tooltip placement="top" title="Edit" arrow>
                                <CiEdit
                                    onClick={() => handleOpenEditModal(params.row)}
                                    className="cursor-pointer text-green-500 text-[23px] hover:text-green-600"
                                />
                            </Tooltip>
                            <Tooltip placement="top" title="Delete" arrow>
                                <PiTrashLight
                                    onClick={() => handleOpenDeleteModal(params.row._id)}
                                    className="cursor-pointer text-red-500 text-[23px] hover:text-red-400"
                                />
                            </Tooltip>
                        </>
                    )}
                </div>
            ),
        },
    ], [loggedUser?.role, handleOpenEditModal, handleOpenDeleteModal]);

    ////////////////////////////////////// STATES ////////////////////////////////////////
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [openFilters, setOpenFilters] = useState("");
    const [openUser, setOpenUser] = useState(false);

    ////////////////////////////////////// USE EFFECTS ////////////////////////////////////
    useEffect(() => {
        loggedUser.role == 'employee'
            ?
            dispatch(getEmployeeClients())
            :
            dispatch(getClients());
    }, []);

    ////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
    const handleClickOpen = () => {
        setOpenUser(true);
    };


    return (
        <div className="w-full">

            <EditEmployee open={openEditModal} setOpen={setOpenEditModal}/>
            <DeleteClient open={openDeleteModal} setOpen={setOpenDeleteModal} userId={selectedUserId}/>
            <Filter open={openFilters} setOpen={setOpenFilters}/>
            <User open={openUser} setOpen={setOpenUser}/>

            <Topbar/>
            <Table
                rows={clients}
                columns={columns}
                isFetching={isFetching}
                error={error}
                rowsPerPage={10}
            />
        </div>
    );
};

export default React.memo(Clients);
