import { db } from "../firebase"; // Import the Firestore instance
import { collection, doc, addDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

// Create a new candidate
export const createCandidate = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "BDProfiles"), data);
    console.log("Candidate added with ID:", docRef.id);
  } catch (error) {
    console.error("Error creating candidate:", error);
  }
};

// Read all candidates
export const fetchCandidates = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "internshipRegistrations"));
    const candidates = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Fetched Candidates:", candidates);
    return candidates;
  } catch (error) {
    console.error("Error fetching candidates:", error);
  }
};


// Inserting Data into the Form

export const updateCandidate = async (id, data) => {
    try {
      await updateDoc(doc(db, "BDProfiles", id), data);
      console.log("Candidate updated successfully");
    } catch (error) {
      console.error("Error updating candidate:", error);
    }
  };


// Update a candidate by ID
// export const updateCandidate = async (id, data) => {
//   try {
//     await updateDoc(doc(db, "BDProfiles", id), data);
//     console.log("Candidate updated successfully");
//   } catch (error) {
//     console.error("Error updating candidate:", error);
//   }
// };

// Delete a candidate by ID
export const deleteCandidate = async (id) => {
  try {
    await deleteDoc(doc(db, "BDProfiles", id));
    console.log("Candidate deleted successfully");
  } catch (error) {
    console.error("Error deleting candidate:", error);
  }
};
