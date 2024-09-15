'use client'

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, TextField, Typography } from '@mui/material';
import { ICow } from "@/types/IType1";

export default function Home() {
  
  const [step, setStep] = useState(1);
  const [digitInput, setDigitInput] = useState('');
  const [cowData, setCowData] = useState<ICow | null>(null);
  const [numOfMilk, setNumOfMilk] = useState<number>(-1);

  const handleDigitInputChange = (e) => {
    const value = e.target.value;
    if (/^[1-9]\d{0,7}$/.test(value)) {
      setDigitInput(value);
    }
  };

  const handleDigitInputSubmit = () => {
    if (digitInput.length === 8) {
      fetchCowData();
    } else {
      alert('Input must be 8 digits long and not start with 0');
    }
  };

  const fetchCowData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/cow/${digitInput}`);
      if (response.data) {
        setCowData(response.data);
        if (response.data.isGoat) {
          setStep(3);
        } else {
          setStep(4);
        }
      } else {
        alert('not found');
        setStep(1);
      }
    } catch (error) {
      alert('Error fetching data');
      setStep(1);
    }
  };

  const fetchMilkData = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/milk/${cowData!!.id}`);
      setNumOfMilk(response.data);
      setStep(5);
    } catch (error) {
      alert('Error fetching milk data');
      setStep(1);
    }
  };

  // useEffect(() => {
  //   if (cowData && cowData.numOfTaonom === 3) {
  //     fetchMilkData();
  //   }
  // }, [cowData]);

  useEffect(() => {
    
  }, [numOfMilk, cowData]);

  return (
    <div className="p-4">
      {step === 1 && (
        <div>
          <TextField
            label="Enter 8-digit number"
            value={digitInput}
            onChange={handleDigitInputChange}
            variant="outlined"
          />
          <Button onClick={handleDigitInputSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </div>
      )}

      {step === 3 && (
        <div>
          <Typography variant="h4">Oh this is Goat not cow</Typography>
          <Button onClick={() => setStep(1)} variant="contained" color="primary">
            sends back to mountain
          </Button>
        </div>
      )}

      {step === 4 && (
        <div>
          <Typography variant="h4">this is a cow!</Typography>
          {cowData!!.numOfTaonom === 4 && (
            <div>
              <Typography variant="h6">4 taonoms able to get milk!</Typography>
              <Button onClick={fetchMilkData} variant="contained" color="primary">
                get milk
              </Button>
            </div>
          )}
          {cowData!!.numOfTaonom === 3 && 
          <section>
            <Typography variant="h6">3 taonoms, not able to get milk!</Typography>
            <Button onClick={fetchMilkData} variant="contained" color="primary">
                continue
              </Button>
            </section>}
        </div>
      )}

      {step === 5 && (
        <div>
          <Typography variant="h4">Num of milk from this cow is {numOfMilk} liters</Typography>
          <Button onClick={() => setStep(1)} variant="contained" color="primary">
            Back
          </Button>
        </div>
      )}
    </div>
  );
  
}
