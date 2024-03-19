import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { GeneralContext } from '../../App';
import "./CustomerMenagment.css";
import "./PopUpBtn.css";
import "./PopUpMediaQ.css";
import { useMediaQuery } from "@mui/material";
import '../../css/grid.css';
import { RoleTypes } from "../../utils/constants";

export default function CustomerMenagment() {
  const [allClients, setAllClients] = useState([]);
  const [refresh, setRefresh] = useState([]);
  const { setLoader, snackbar } = useContext(GeneralContext);
  const [isPopUp, setIsPopUp] = useState(true);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    setLoader(true);
    fetch(`http://localhost:5000/users`, {
      credentials: 'include',
      headers: {
        'Authorization': localStorage.token
      },
    }).then(res => res.json())
      .then((data) => {
        // Filter out clients with role types greater than 3 (admin, master)
        const filteredClients = data.filter(client => client.roleType <= RoleTypes.business);
        setAllClients(filteredClients);
      }).finally(() => setLoader(false))
  }, [refresh]);

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.7,
      justifyContent: 'center',
      valueGetter: (params) => `${params.row.firstName} ${params.row.lastName}`
    },

    { field: 'email', headerName: 'Email', flex: 0.7 },

    {
      field: 'business',
      headerName: 'Business',
      flex: 0.4, // Adjusted width
      renderCell: (params) => (
        <div>
          {params.row.roleType === RoleTypes.business ? (
            <CheckBoxIcon
              onClick={(e) => {
                e.stopPropagation();
                handleBusiness(params.row);
              }}
              style={{ cursor: 'pointer', color: 'green' }}
            />
          ) : (
            <DisabledByDefaultIcon
              onClick={(e) => {
                e.stopPropagation();
                handleBusiness(params.row);
              }}
              style={{ cursor: 'pointer', color: 'red' }}
            />
          )}
        </div>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      flex: 0.4, // Adjusted width
      renderCell: (params) => (
        <DeleteIcon onClick={() => handleDelete(params.row._id)} style={{ cursor: 'pointer' }} />
      ),
    }
  ];

  const handleBusiness = (client) => {
    setLoader(true);

    const updatedClient = { ...client }; // Create a copy of the client object
    updatedClient.roleType = client.roleType === RoleTypes.user ? RoleTypes.business : RoleTypes.user; // Toggle the roleType field

    const snackbarMessage = `${updatedClient.firstName} is now ${updatedClient.roleType === RoleTypes.business ? "business" : "non-business"} client`;

    fetch(`http://localhost:5000/users/${client._id}`, {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        'Authorization': localStorage.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedClient),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to update role type');
        }
        return res.json();
      })
      .then((data) => {
        // Update the state with the updated client data
        setAllClients(prevClients => prevClients.map(prevClient => prevClient._id === data._id ? data : prevClient));
        setRefresh([{}]);
        snackbar(snackbarMessage);
      })
      .catch((error) => {
        console.error('Error updating role type:', error);
        // Handle error, show error message, etc.
      })
      .finally(() => setLoader(false));
  };


  const handleDelete = (clientID) => {
    setLoader(true);
    const confirm = window.confirm(`are you sure you want to delte user ${clientID} ?`);
    if (!confirm) {
      setLoader(false);
      return;
    }
    fetch(`http://localhost:5000/users/${clientID}`, {
      credentials: 'include',
      headers: { 'Authorization': localStorage.token },
      method: 'DELETE',
    })
      .then(() => {
        setRefresh([{}]);
      }).finally(() => setLoader(false))
  };

  return (
    <>
      <header>
        <h1 className="main-title">Customer Management</h1>
      </header>

      {isPopUp && (
        <section className="pop-up-wrapper">
          <div className="pop-up">
            <h3 className="pop-up-title">Here you can manage your clients</h3>

            <ul className="pop-up-list">
              <li className="list-txt">
                You can upgrade or delete them by clicking on the CheckBox
              </li>
              <li className="list-txt">
                If the CheckBox color is <span className="green">green</span>, then the user is business.
              </li>
              <li className="list-txt">
                If it is <span className="red">red</span>, the user is not business.
              </li>
              <li className="list-txt">
                * In small size devices, some of the info will be hidden *
              </li>
            </ul>

            <button className="btn-pop-up" onClick={() => setIsPopUp(false)}>❌</button>
          </div>
        </section>
      )}

      <section style={{ height: 'auto', width: '90vw', padding: '25px 15px', margin: '0 auto', display: 'flex', justifyContent: "center", alignItems: 'center' }}>
        <DataGrid
          rows={allClients}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row._id} />

      </section>
    </>
  );
}
