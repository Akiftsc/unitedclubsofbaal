import ScrollArea from './components/ScrollArea';
import ClubModal from './components/ClubModal';
import './App.css';
import { useState, useEffect } from "react";



function App() {


  const [pickedClub, setPickedClub] = useState();
  const [register, setRegister] = useState(false);

  useEffect(() => {
    setRegister(false)
  }, [pickedClub])


  return (
    <>
      <div className='container mx-auto mt-4 rounded p-5 flex align-center justify-center'>
        <ScrollArea setPickedClub={setPickedClub} />
        {pickedClub && <ClubModal pickedClub={pickedClub} register={register} setRegister={setRegister} />}
      </div>

    </>

  );

}

export default App;
