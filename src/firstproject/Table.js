import React, { useEffect, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const Table = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [searchfilter, setSearchFilter] = useState([])



    const fetchData = async () => {
        await fetch("https://dummyjson.com/users", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
            },
        })
            .then(data => data.json())
            .then(data => setData(data.users))
    };



    useEffect(() => {
        fetchData();
    }, []);

    const handleSearchFilter = (e) => {
        const Sdata = e.target.value.toLowerCase();
        // console.log(Sdata);
        if (Sdata !== '') {
            const fData = data.filter((v) => {
                return v.firstName.toLowerCase().includes(Sdata)
            });
            setSearchFilter(fData);
            console.log(fData);
        } else {
            setSearchFilter(data);
            console.log(data);
        }
        setSearch(Sdata);
    }
    console.log(searchfilter)

    // const handleSearch = (val, kk) => {

    //     if (kk === 'fs') {

    //         let fData = data.filter((v) =>
    //             v.firstName.toLowerCase().includes(val.toLowerCase())
    //         )
    //         // {
    //         //     fData?setData(fData):setData(data)
    //         // }
    //         // console.log(fData);
    //         setData(fData)

    //     }else if(val===''){
    //         setData(data)


    //     }else if (kk === 'ls') {

    //         let fData = data.filter((v) =>

    //             v.lastName.toLowerCase().includes(val.toLowerCase())

    //         )
    //         var rn, i;
    //         rn = document.getElementById("myMenu");
    //         for (i = 0; i < kk.length; i++) {
    //             console.log(kk.length);

    //         }
    //         setData(fData)
    //     } else if (kk === 'mn') {
    //         let fData = data.filter((v) =>

    //             v.maidenName.toLowerCase().includes(val.toLowerCase())

    //         )
    //         setData(fData)
    //     } else if (kk === 'ag') {
    //         let fData = data.filter((v) =>

    //             v.age.toString().includes(val)
    //         )
    //         setData(fData)
    //     } else if (kk === 'id') {
    //         let fData = data.filter((v) =>

    //             v.id.toString().includes(val)
    //         )
    //         setData(fData)
    //     }
    // }
    const handleAsce = (val) => {


        if (val === 'idA') {
            const sortedData = [...data].sort((a, b) => a.id - b.id);
            setData(sortedData);
        } else if (val === 'fnA') {

            const sortedData = [...data].sort((a, b) => (a.firstName < b.firstName ? -1 : 1));
            // const sortedData = [...data].sort((a, b) => (a.firstName - b.firstName ));



            setData(sortedData);
            console.log(sortedData);

        } else if (val === 'lnA') {
            const sortedData = [...data].sort((a, b) => (a.lastName < b.lastName ? -1 : 1));

            setData(sortedData);
        } else if (val === 'mnA') {
            const sortedData = [...data].sort((a, b) => (a.maidenName < b.maidenName ? -1 : 1));

            setData(sortedData);
        } else if (val === 'agA') {
            const sortedData = [...data].sort((a, b) => a.age - b.age);
            setData(sortedData);
        }


    }
    const handleDesc = (val) => {
        if (val === 'idD') {
            const sortedData = [...data].sort((a, b) => b.id - a.id);
            setData(sortedData);
        } else if (val === 'fnD') {

            const sortedData = [...data].sort((a, b) => (a.firstName < b.firstName ? 1 : -1));


            setData(sortedData);
            console.log('lllllll');

        } else if (val === 'lnD') {
            const sortedData = [...data].sort((a, b) => (a.lastName < b.lastName ? 1 : -1));

            setData(sortedData);
        } else if (val === 'mnD') {
            const sortedData = [...data].sort((a, b) => (a.maidenName < b.maidenName ? 1 : -1));

            setData(sortedData);
        } else if (val === 'agD') {
            const sortedData = [...data].sort((a, b) => b.age - a.age);
            setData(sortedData);
        }

    }

    return (

        <>
            <table responsive border={1} style={{ width: '600px' }}>
                <thead>
                    <tr>
                        <th>
                            id
                            <ArrowDropUpIcon onClick={() => handleAsce('idA')} />
                            <ArrowDropDownIcon onClick={() => handleDesc('idD')} />
                        </th>
                        <th>
                            FirstName
                            <ArrowDropUpIcon onClick={() => handleAsce('fnA')} />
                            <ArrowDropDownIcon onClick={() =>  handleDesc('fnD')} />
                            <input onChange={handleSearchFilter} />
                        </th>
                        <th>
                            LastName
                            <ArrowDropUpIcon onClick={() => handleAsce('lnA')} />
                            <ArrowDropDownIcon onClick={() => handleDesc('lnD')} />
                        </th>
                        <th>
                            MaidenName
                            <ArrowDropUpIcon onClick={() => handleAsce('mnA')} />
                            <ArrowDropDownIcon onClick={() => handleDesc('mnD')} />
                        </th>
                        <th>
                            Age
                            <ArrowDropUpIcon onClick={() => handleAsce('ageA')} />
                            <ArrowDropDownIcon onClick={() => handleDesc('ageD')} />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {(setSearchFilter.length > 0 ? setSearchFilter : data).map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.maidenName}</td>
                            <td>{item.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* <table responsive border={1} style={{ width: '600px' }} >


                <thead>
                    <tr>

                        <th>
                            id
                            <ArrowDropUpIcon onClick={() => handleAsce('idA')} />
                            <ArrowDropDownIcon onClick={() => handleDesc('idD')} />
                            <input type='text' onChange={(e) => handleSearchI(e)} />
                        </th>
                        <th>
                            FirstName
                            <ArrowDropUpIcon onClick={() => handleAsce('fnA')} />
                            <ArrowDropDownIcon onClick={() => handleDesc('fnD')} />
                            <input onChange={(e) => handleSearchF(e)} />
                            <input
                                type='text'
                                placeholder='enter your item'
                                onChange={(e) => handleChange(e)} /> 
                        </th>
                        <th>
                            LastName
                            <ArrowDropUpIcon onClick={() => handleAsce('lnA')} />
                            <ArrowDropDownIcon onClick={() => handleDesc('lnD')} />
                            <input onChange={(e) => handleSearchL(e.target.value, 'ls')} id='myMenu' />
                        </th>
                        <th>
                            MaidenName
                            <ArrowDropUpIcon onClick={() => handleAsce('mnA')} />
                            <ArrowDropDownIcon onClick={() => handleDesc('mnD')} />
                            <input onChange={(e) => handleSearchM(e.target.value, 'mn')} />
                        </th>
                        <th>
                            Age
                            <ArrowDropUpIcon onClick={() => handleAsce('agA')} />
                            <ArrowDropDownIcon onClick={() => handleDesc('agD')} />
                            <input onChange={(e) => handleSearchA(e.target.value, 'ag')} />

                             <input
                                type='text'
                                placeholder='enter your item'
                                onChange={(e) => handleChange(e)} /> 
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {(searchfilter.length > 0 ? searchfilter : data).map((v) => (
                        <tr key={v.id}>
                            <td>{v.id}</td>
                            <td>{v.firstName}</td>
                            <td>{v.lastName}</td>
                            <td>{v.maidenName}</td>
                            <td>{v.age}</td>
                        </tr>
                    ))}
                </tbody>

                {
                    (searchfilter.length > 0 ? searchfilter : data).map((v) => {
                        return (
                            <>
                                <tbody >
                                    <tr>
                                        <th scope="row">
                                            {v.id}
                                        </th>

                                        <td>
                                            {v.firstName}
                                        </td>
                                        <td>
                                            {v.lastName}
                                        </td>
                                        <td>
                                            {v.maidenName}
                                        </td>
                                        <td>
                                            {v.age}
                                        </td>

                                    </tr>


                                </tbody>

                            </>
                        )
                    })
                } 
            </table> */}

        </>
    )
}

export default Table
