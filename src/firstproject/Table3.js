import React, { useEffect, useState } from 'react';
import { TfiSplitH } from "react-icons/tfi";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import * as XLSX from "xlsx/xlsx.mjs";
import { CSVLink } from 'react-csv';
const Table3 = () => {
    const [dataOfKey, setDataOfKey] = useState([]);
    const [dataOfValue, setDataOfValue] = useState([]);

    const [colNumber, setColNumber] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [sorting, setSorting] = useState({ column: null, order: "asc" });

    const [search, setSearch] = useState("");
    const [searchFilter, setSearchFilter] = useState([]);

    const [MenuVisible, setMenuVisible] = useState(false);
    const [ListExportMenuVisible, setListExportMenuVisible] = useState(false);

    const [styleColumnAutoWidth, setStyleColumnAutoWidth] = useState(false);

    const [dragging, setDragging] = useState(false);
    const [draggingColumn, setDraggingColumn] = useState(null);
    const [initialWidth, setInitialWidth] = useState(0);
    const [columnWidths, setColumnWidths] = useState([150]);
    // const [columnWidths, setColumnWidths] = useState(Array(dataOfKey.length).fill(150));
    const [columnAutoWidth, setColumnAutoWidth] = useState(false);
    
    const filteredDataToRender = search !== '' ? searchFilter : dataOfValue;
    const fetchData = async () => {
        try {
            const res = await fetch("https://dummyjson.com/users", {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', }
            });
            const data1 = await res.json();
            const data2 = data1.users;

            const keys = Object.keys(data2[0]);
            setDataOfKey(keys);

            setDataOfValue(data2);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSortAscending = (column) => (a, b) => {
        const aValue = a[dataOfKey[column]];
        const bValue = b[dataOfKey[column]];

        if (aValue === undefined || aValue === null) return -1;
        if (bValue === undefined || bValue === null) return 1;

        if (typeof aValue === 'string') {
            return aValue.localeCompare(bValue);
        }

        return aValue - bValue;
    };

    const handleSortDescending = (column) => (a, b) => {
        const aValue = a[dataOfKey[column]];
        const bValue = b[dataOfKey[column]];

        if (aValue === undefined || aValue === null) return 1;
        if (bValue === undefined || bValue === null) return -1;

        if (typeof aValue === 'string') {
            return bValue.localeCompare(aValue);
        }

        return bValue - aValue;
    };

    const handleSort = (column) => {
        const isAsc = colNumber === column && sortOrder === 'asc';
        const sortFunction = isAsc ? handleSortAscending(column) : handleSortDescending(column);

        const sortedData = [...dataOfValue].sort(sortFunction);

        setDataOfValue(sortedData);

        const newSortOrder = isAsc ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        setColNumber(column);


    };

    const SortIcon = ({ sortOrder }) => {
        if (sortOrder === 'asc') {
            return <ArrowDropDownIcon />;
        } else if (sortOrder === 'desc') {
            return <ArrowDropUpIcon />;
        } else {
            return <ArrowDropDownIcon />;
        }
    };

    const handleSearchFilter = (index, e) => {
        const searchValue = e.target.value;
        setSearch(searchValue);

        if (searchValue !== '') {
            const filteredData = dataOfValue.filter((item) => {
                const cellValue = item[dataOfKey[index]]?.toString().toLowerCase() || '';
                return cellValue.includes(searchValue.toLowerCase());
            });
            console.log(filteredData);
            setSearchFilter(filteredData);
        } else {
            setSearchFilter([]);
        }

    };

    const click = (event) => {
        console.log(event);
        setListExportMenuVisible(!ListExportMenuVisible);
    };

    const handleMouseDown = (event) => {

        if (event.button === 2) {
            setMenuVisible(true)
            console.log(event.button);
        } else if (event.button === 0) {
            setMenuVisible(false)
        }

    };
    const handleExExport = () => {
        const sheetData = searchFilter.length > 0 ? searchFilter : dataOfValue;

        const headers = dataOfKey.map((key) => ({
            label: key,
            key: key,
        }));

        const exportData = sheetData.map((item) =>
            dataOfKey.reduce((acc, key) => {
                acc[key] = item[key] !== undefined ? item[key].toString() : '';
                return acc;
            }, {})
        );

        const worksheet = XLSX.utils.json_to_sheet(exportData, {
            header: headers.map((h) => h.label), // Specify the headers to be used in the sheet
        });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        const fileName = 'my_exported_data.xlsx';

        XLSX.writeFile(workbook, fileName);
    };


    const convertDataForCSV = () => {
        return dataOfValue.map((row) => ({
            ...dataOfKey.reduce((acc, key) => {
                acc[key] = row[key] !== undefined ? row[key].toString() : '';
                return acc;
            }, {}),
        }));
    };
    const handleColumnResizeStart = (index) => (event) => {
        setDragging(true);
        setDraggingColumn(index);
        setInitialWidth(event.clientX);
        // event.preventDefault();
    };

    const handleColumnResize = (event , index) => {
            console.log(index);
        // if (dragging && event.button === 0 && draggingColumn !== null) {

        //     const newWidth = event.clientX - initialWidth;

        //     const newColumnWidths = [...columnWidths];
        //     console.log(newColumnWidths);
        //     newColumnWidths[draggingColumn] += newWidth;
        //     newColumnWidths[draggingColumn] = Math.max(newColumnWidths[draggingColumn], 80);

        //     setColumnWidths(newColumnWidths);
        //     setInitialWidth(event.clientX);
        // }
    };

    const handleColumnResizeEnd = () => {
        setDragging(false);
    };


    // const HandleAutoWidthOfColumn = () => {

    //     const columnsToCalculate = ['id', 'firstName', 'lastName', 'maidenName', 'age'];

    //     const newColumnWidths = dataOfValue.reduce((widths, item) => {
    //         columnsToCalculate.forEach((key, index) => {

    //             const cellContent = item[key].toString();
    //             const cellWidth = cellContent.length * 10;
    //             if (!widths[index] || cellWidth > widths[index]) {
    //                 widths[index] = cellWidth;
    //             }

    //         });

    //         return widths;

    //     }, []);

    //     setColumnWidths(newColumnWidths);
    //     setStyleColumnAutoWidth(true);
    // };


    return (
        <>
            <table className="light-border-table"
                onMouseMove={handleColumnResize}
                onMouseUp={handleColumnResizeEnd}
                onMouseDown={handleMouseDown}>
                <colgroup>
                    {dataOfKey.map((key, index) => (
                        <col key={index} style={{ width: columnWidths[index] }} />
                    ))}
                </colgroup>
                <thead>
                    <tr>
                        {
                            dataOfKey.map((value, index) => (
                                <th key={index} style={{ position: 'relative', width: columnWidths[index] }}>
                                    <div>
                                        <span className='fn' onClick={() => handleSort(index)}>
                                            {value}
                                            <SortIcon sortOrder={colNumber === index ? sortOrder : ''} />
                                        </span>
                                        <TfiSplitH className='iconstyle' onMouseDown={handleColumnResizeStart(index)} onMouseMove={handleColumnResize(index)} />
                                    </div>
                                    <div>
                                        <input type="text"
                                            onChange={(e) => handleSearchFilter(index, e)}
                                            style={{ width: columnAutoWidth }}
                                        />

                                    </div>
                                </th>
                            ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredDataToRender.map((row, index) => (
                            <tr key={index} style={{ position: 'relative', width: columnWidths[index] }}>
                                {dataOfKey.map((key, innerIndex) => (
                                    <td key={innerIndex}>{row[key].toString()}</td>
                                ))}
                            </tr>
                        ))}

                </tbody>
            </table>

            {
                MenuVisible && (

                    <div className="wrapper">
                        <div className="content">
                            <ul className="menu">
                                <li className="item"   >
                                    <ContentPasteIcon />
                                    <span>AutoWidth</span>
                                </li>
                                <li className="item">
                                    <ContentCopyIcon />
                                    <span>Copy</span>
                                </li>
                                <li className="item">
                                    <ContentCopyIcon />
                                    <span>Copy With Headers</span>
                                </li>
                                <li className="item">
                                    <ContentPasteIcon />
                                    <span>Get Link</span>
                                </li>
                                <li className="item">
                                    <FileDownloadOutlinedIcon />
                                    <span>Export To Excel<ArrowDropDownIcon onClick={click} className='iconright' />

                                    </span>
                                </li>


                                {
                                    ListExportMenuVisible && (
                                        <div className='ExcelDropDownList'>
                                            <li className="item">
                                                <li className="itemlist" onClick={handleExExport}>
                                                    <span>Excel Export</span>
                                                </li>
                                            </li>
                                            <li className="item">
                                                <li className="itemlist1">
                                                    <CSVLink data={convertDataForCSV()}
                                                        headers={dataOfKey.map((key) => ({ label: key, key: key }))}
                                                        filename={'exported_data.csv'}
                                                        style={{ color: 'black', textDecoration: 'none' }}
                                                    >
                                                        <span>CSV Export</span>
                                                    </CSVLink>
                                                </li>
                                            </li>
                                        </div>
                                    )}

                            </ul>
                        </div>
                    </div>


                )}
        </>
    );
};

export default Table3;