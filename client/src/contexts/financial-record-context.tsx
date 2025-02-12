import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

interface FinancialRecord {
    id?: string
    userId: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    paymentMethod: string;
}

interface FinancialRecordContextType {
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord) => void;
  updateRecord: (id: string, record: FinancialRecord) => void;
  deleteRecord: (id: string) => void;
}

export const FinancialRecordContext = createContext<FinancialRecordContextType | undefined>(undefined);

export const FinancialRecordProvider = ({ children }: { children: React.ReactNode }) => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const { user } = useUser();

  const fetchRecords = async () => {
    if (!user) return
    const response = await fetch(`http://localhost:3001/api/financial-records/getUsersById/${user?.id}`);
    try {  
      if (response.ok) {
        const records = await response.json();
        console.log(records);
        setRecords(records);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [user]);

  const addRecord = async (record: FinancialRecord) => {
    const response = await fetch('http://localhost:3001/api/financial-records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    });
    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords(prevRecords => [...prevRecords, newRecord]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateRecord = (id: string, record: FinancialRecord) => {
    const updatedRecords = records.map((r) => {
      if (r.id === id) {
        return record;
      }
      return r;
    });
    setRecords(updatedRecords);
  };

  const deleteRecord = (id: string) => {
    const updatedRecords = records.filter((r) => r.id !== id);
    setRecords(updatedRecords);
  };

  return (
    <FinancialRecordContext.Provider value={{ records, addRecord, updateRecord, deleteRecord }}>
      {children}
    </FinancialRecordContext.Provider>
  );
};

export const useFinancialRecord = () => {
  const context = useContext<FinancialRecordContextType | undefined>(FinancialRecordContext);
  if (!context) {
    throw new Error('useFinancialRecord must be used within a FinancialRecordProvider');
  }
  return context;
}