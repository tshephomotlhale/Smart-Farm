import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { db, auth } from "../config/firebase"
import { Auth } from "../components/auth"
import Sidebar from "../components/Sidebar"
import {
  getDocs,
  collection,
  addDoc,
} from "firebase/firestore"
import Logo from "../assets/svg/logo.svg"

const AddInventory = () => {
  const navigate = useNavigate();

  const [machineList, setMachineList] = useState([]);

  const [newMachineType, setNewMachineType] = useState("");
  const [newMachineCost, setNewMachineCost] = useState("");
  const [newMachineQuantity, setNewMachineQuantity] = useState("");

  const [newLastMaintenanceDate, setNewLastMaintenanceDate] = useState("");

  const [newPurchaseDate, setNewPurchaseDate] = useState("");
  const [newMaintenanceSchedule, setNewMaintenanceSchedule] = useState("");
  const [newCondition, setNewCondition] = useState("");
  const [newWarrantyEndDate, setNewWarrantyEndDate] = useState("");

  const inventoryCollectionRef = collection(db, "inventory");

  const getMachineList = async () => {
    try {
      const data = await getDocs(inventoryCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData);
      setMachineList(filteredData);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getMachineList();
  }, []);

  const onSubmitMachine = async (e) => {
    e.preventDefault(); // Prevent the form from submitting and refreshing the page

    try {
      await addDoc(inventoryCollectionRef, {
        machineType: newMachineType,
        costPerMachine: newMachineCost,
        quantity: newMachineQuantity,
        lastMaintenanceDate: newLastMaintenanceDate, // Add lastMaintenanceDate
        purchaseDate: newPurchaseDate, // Add purchaseDate
        maintenanceSchedule: newMaintenanceSchedule, // Add maintenanceSchedule
        condition: newCondition, // Add condition
        warrantyEndDate: newWarrantyEndDate, // Add warrantyEndDate
        userId: auth?.currentUser?.uid,
      });
      // Clear input fields
      setNewMachineType("");
      setNewMachineCost("");
      setNewMachineQuantity("");
      setNewLastMaintenanceDate("");
      setNewPurchaseDate("");
      setNewMaintenanceSchedule("");
      setNewCondition("");
      setNewWarrantyEndDate("");

      getMachineList();
      navigate("/inventory");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="logo">
        <img src={Logo} alt="Your Logo" width="500px" />
      </div>
      <div className="flex">
        <Sidebar />
        <div>
          <div className="mb-2">
            <input
              className="p-2 border border-gray-300 rounded"
              placeholder="Machine type"
              value={newMachineType}
              onChange={(e) => setNewMachineType(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              className="p-2 border border-gray-300 rounded"
              placeholder="Cost per Machine"
              type="text"
              value={newMachineCost}
              onChange={(e) => setNewMachineCost(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              className="p-2 border border-gray-300 rounded"
              placeholder="Quantity"
              type="text"
              value={newMachineQuantity}
              onChange={(e) => setNewMachineQuantity(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              className="p-2 border border-gray-300 rounded"
              placeholder="Last Maintenance Date" // Add lastMaintenanceDate
              type="text"
              value={newLastMaintenanceDate}
              onChange={(e) => setNewLastMaintenanceDate(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              className="p-2 border border-gray-300 rounded"
              placeholder="Purchase Date" // Add purchaseDate
              type="text"
              value={newPurchaseDate}
              onChange={(e) => setNewPurchaseDate(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              className="p-2 border border-gray-300 rounded"
              placeholder="Maintenance Schedule" // Add maintenanceSchedule
              type="text"
              value={newMaintenanceSchedule}
              onChange={(e) => setNewMaintenanceSchedule(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              className="p-2 border border-gray-300 rounded"
              placeholder="Condition" // Add condition
              type="text"
              value={newCondition}
              onChange={(e) => setNewCondition(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              className="p-2 border border-gray-300 rounded"
              placeholder="Warranty End Date" // Add warrantyEndDate
              type="text"
              value={newWarrantyEndDate}
              onChange={(e) => setNewWarrantyEndDate(e.target.value)}
            />
          </div>
          <button
            className="p-2 bg-green-700 text-white rounded hover-bg-green-800"
            onClick={onSubmitMachine}
          >
            Add Machine
          </button>
        </div>
      </div>
    </>
  );
}

export default AddInventory;
